import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
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
