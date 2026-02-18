import PropTypes from 'prop-types';

// Button — base interactive element used across all sections.
//
// Variants map to the brand color tokens defined in src/index.css @theme:
//   primary  → green (main CTAs: "Get a Quote", "Send Message")
//   secondary→ orange (secondary actions)
//   outline  → bordered green (paired with primary in hero, e.g. "View Products")
//   ghost    → text-only green (nav links, subtle actions)
//
// The ...props spread passes through any native <button> attribute the caller needs
// (onClick, type, aria-label, form, etc.) without Button needing to declare each one.
//
// focus-visible:ring is used instead of focus:ring so keyboard users see the ring
// but mouse clicks do not trigger it (better UX without losing accessibility).

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-green-700 focus-visible:ring-primary disabled:bg-gray-400',
    secondary: 'bg-secondary text-white hover:bg-orange-600 focus-visible:ring-secondary disabled:bg-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary disabled:border-gray-400 disabled:text-gray-400',
    ghost: 'text-primary hover:bg-green-50 focus-visible:ring-primary disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
