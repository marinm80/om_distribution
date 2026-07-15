/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
// Static FAQ data for the FAQ section.
//
// Rendered by the Accordion component (src/components/ui/Accordion.jsx).
// Each item needs: id (unique), question (string), answer (string).
//
// Content is placeholder — delivery areas, minimums, and payment methods
// must be confirmed with the client before launch.
// See docs/prompt.md section 10 for the original FAQ spec.

export const faqData = [
  {
    id: 1,
    question: 'What areas do you deliver to?',
    answer: 'We currently serve the entire state of Florida and parts of Georgia and Alabama. For specific delivery areas, please contact us with your location.',
  },
  {
    id: 2,
    question: 'What is the minimum order quantity?',
    answer: 'Our minimum order varies by product category. Generally, we require a minimum order of $500 for wholesale accounts. Contact us for specific product minimums.',
  },
  {
    id: 3,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, bank transfers, and net-30 terms for approved business accounts. We also offer online payment through our secure portal.',
  },
  {
    id: 4,
    question: 'How do I request a custom quote?',
    answer: 'Simply fill out our contact form or call us directly. Our sales team will review your requirements and provide a customized quote within 24 hours.',
  },
  {
    id: 5,
    question: 'Do you offer same-day delivery?',
    answer: 'Same-day delivery is available for orders placed before 10:00 AM EST within our local delivery radius. Additional fees may apply.',
  },
  {
    id: 6,
    question: 'Are your products USDA certified?',
    answer: 'Yes, all our meat and poultry products are USDA certified. We also comply with FDA regulations for all food products we distribute.',
  },
];
