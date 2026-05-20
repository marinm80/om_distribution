// Static testimonial data for the Testimonials section.
//
// Images: Unsplash face photos (w=150&h=150&fit=crop&crop=face for consistent circular crop).
//         Replace with real client photos before go-live, or remove if clients
//         prefer anonymity.
//
// All 4 testimonials currently show 5 stars. Adjust ratings if real feedback differs.
// The Testimonials section should gracefully handle any rating 1–5.

export const testimonials = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    role: 'Restaurant Owner',
    company: 'La Cocina Restaurant',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    text: 'OM Distribution has been our trusted supplier for over 3 years. Their products are always fresh, and deliveries are consistently on time. Highly recommended!',
    rating: 5,
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Purchasing Manager',
    company: 'Fresh Market Chain',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    text: 'The quality of their products and competitive pricing has helped us reduce costs while maintaining high standards. Great partnership!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa Chen',
    role: 'Executive Chef',
    company: 'Gourmet Catering Co.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    text: 'As a chef, quality is everything. OM Distribution understands this and consistently delivers the freshest ingredients for our events.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Carlos Martinez',
    role: 'Store Manager',
    company: 'SuperMart Inc.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    text: 'Their wide product range and reliable service make them our go-to distributor. Customer service is outstanding!',
    rating: 5,
  },
];
