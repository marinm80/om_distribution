import { useReducer } from 'react';
import DOMPurify from 'dompurify';

// useContactForm — manages all state and submission logic for the Contact section.
//
// Uses useReducer instead of multiple useState calls because the form has
// several interdependent state fields (formData, status, error) that always
// transition together.
//
// Usage in the Contact component:
//   const { formData, status, error, updateField, submitForm, resetForm } = useContactForm();
//
// Submission flow:
//   1. Call submitForm() on form submit
//   2. Honeypot check → DOMPurify sanitize → POST to Formspree
//   3. status transitions: 'idle' → 'loading' → 'success' | 'error'
//   4. On success, show confirmation and call resetForm() if needed
//
// Formspree setup (one-time):
//   1. Create account at https://formspree.io
//   2. Create a Form, copy the endpoint URL
//   3. Set VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/{ID} in .env
//
// Security (see docs/SECURITY.md):
//   - Honeypot: populated field → silently returns success (bots don't learn they failed)
//   - DOMPurify: strips HTML/script injection from all fields before sending
//   - Validation (max lengths, regex) should be applied by the Contact component
//     before calling submitForm()

const initialState = {
  formData: {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
    honeypot: '', // Hidden field — never show to real users (CSS: display:none / visibility:hidden)
  },
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      };
    case 'SUBMIT_START':
      return { ...state, status: 'loading', error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success' };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Call on every input change: updateField('email', e.target.value)
  const updateField = (field, value) =>
    dispatch({ type: 'UPDATE_FIELD', field, value });

  const resetForm = () => dispatch({ type: 'RESET' });

  const submitForm = async () => {
    // Honeypot check — discard silently without revealing rejection to bots
    if (state.formData.honeypot) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint || endpoint === 'your_formspree_endpoint_here') {
      dispatch({ type: 'SUBMIT_ERROR', error: 'Form service is not configured.' });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    try {
      // Sanitize all fields before sending — strips any injected HTML/scripts
      const sanitized = {
        fullName:    DOMPurify.sanitize(state.formData.fullName),
        email:       DOMPurify.sanitize(state.formData.email),
        phone:       DOMPurify.sanitize(state.formData.phone),
        companyName: DOMPurify.sanitize(state.formData.companyName),
        message:     DOMPurify.sanitize(state.formData.message),
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(sanitized),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        dispatch({
          type: 'SUBMIT_ERROR',
          error: data.error || 'Submission failed. Please try again.',
        });
        return;
      }

      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'SUBMIT_ERROR',
        error: error.message || 'Network error. Please try again.',
      });
    }
  };

  return {
    formData: state.formData,
    status: state.status,
    error: state.error,
    updateField,
    submitForm,
    resetForm,
  };
}
