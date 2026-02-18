import PropTypes from 'prop-types';

// Textarea — multiline input for the "Message / Order Details" field in Contact.
//
// Mirrors the Input component's API and behavior intentionally — same label/error/
// helperText pattern, same border states — so the contact form stays visually uniform.
//
// resize-none is set to prevent users from breaking the form layout by dragging
// the textarea beyond its container. Adjust rows prop for taller default height.
//
// Security: same sanitization requirement as Input — DOMPurify in contactSlice
//           must process this value before it's sent to Formspree.
//           Max length should be enforced via maxLength prop (spec: 1000 chars).

export const Textarea = ({
  label,
  error,
  helperText,
  rows = 4,
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
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none
          ${error
            ? 'border-red-500 focus:border-red-500 focus-visible:ring-red-500'
            : 'border-gray-200 focus:border-primary hover:border-gray-300'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
};
