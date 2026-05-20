import { useReducer } from 'react';
import DOMPurify from 'dompurify';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  honeypot: string;
}

interface ContactFormState {
  formData: ContactFormData;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

type Action =
  | { type: 'UPDATE_FIELD'; field: keyof ContactFormData; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET' };

const initialState: ContactFormState = {
  formData: {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
    honeypot: '',
  },
  status: 'idle',
  error: null,
};

function formReducer(state: ContactFormState, action: Action): ContactFormState {
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

  const updateField = (field: keyof ContactFormData, value: string) =>
    dispatch({ type: 'UPDATE_FIELD', field, value });

  const resetForm = () => dispatch({ type: 'RESET' });

  const submitForm = async () => {
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
    } catch (error: unknown) {
      const err = error as Error;
      dispatch({
        type: 'SUBMIT_ERROR',
        error: err.message || 'Network error. Please try again.',
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
