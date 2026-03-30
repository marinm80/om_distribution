import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Contact — green card with inset rounded corners containing a contact form
// and company contact details.
//
// Form fields use transparent-white styling to sit on the dark green background.
// A honeypot hidden field ("website") catches bots.
// Basic client-side validation is applied; server-side validation is required
// before any data reaches the backend (see CLAUDE.md security rules).

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const initialFormState = {
  name: '',
  email: '',
  message: '',
  website: '', // honeypot
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (/[<>"';]/.test(form.name)) {
      newErrors.name = 'Name contains invalid characters.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 254) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (form.message.length > 1000) {
      newErrors.message = 'Message must be under 1000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields
    if (form.website) return;

    if (!validate()) return;

    setStatus('loading');

    try {
      // Placeholder: replace with Formspree or backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setForm(initialFormState);
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-colors duration-200 focus:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

  return (
    <section id="contact" className="mx-6 py-24">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-3xl rounded-3xl bg-[#006b2c] p-8 md:p-12"
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-light tracking-tight text-white">
            Ready to start?
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          {/* Honeypot — hidden from real users, caught by bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Leave blank</label>
            <input
              type="text"
              id="website"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
              className={inputClasses}
              aria-label="Your Name"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-300">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
              maxLength={254}
              className={inputClasses}
              aria-label="Business Email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-300">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Tell us what you need..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              maxLength={1000}
              className={`${inputClasses} resize-none`}
              aria-label="Tell us what you need"
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-300">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-full bg-white py-4 text-base font-semibold text-[#006b2c] transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#006b2c] disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status messages */}
          {status === 'success' && (
            <p className="text-center text-sm text-green-200">
              Message sent successfully. We will get back to you shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-300">
              Something went wrong. Please try again later.
            </p>
          )}
        </motion.form>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <hr className="my-8 border-white/20" />
        </motion.div>

        {/* Contact details */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:gap-8"
        >
          {/* Phone */}
          <a
            href="tel:+1XXXXXXXXXX"
            className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +1 (XXX) XXX-XXXX
          </a>

          {/* Email */}
          <a
            href="mailto:info@omdistribution.com"
            className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            info@omdistribution.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
