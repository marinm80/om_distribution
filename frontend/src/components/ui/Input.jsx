import PropTypes from 'prop-types';

// Input — labeled text input with validation states for the contact form.
//
// The ...props spread exposes the full native <input> API to the caller:
// type, name, value, onChange, onBlur, maxLength, placeholder, required, etc.
// This avoids re-declaring every HTML attribute while keeping the component thin.
//
// Error state (red border + message) and normal state share the same layout so
// the form doesn't shift when validation messages appear or disappear.
//
// Used in: Contact section (Full Name, Email, Phone, Company Name)
// Security: raw user input must be sanitized with DOMPurify in contactSlice
//           before submission — never render input values with dangerouslySetInnerHTML.

export const Input = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          ${error
            ? 'border-red-500 focus:border-red-500 focus-visible:ring-red-500'
            : 'border-gray-200 focus:border-primary hover:border-gray-300'
          }
        `}
        {...props}
      />
      {/* Error takes priority over helperText — both share the same space */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};
