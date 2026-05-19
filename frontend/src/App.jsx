import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Landing Page Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Products from './components/sections/Products';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

// Admin Pages (lazy-loaded: keeps jsPDF/xlsx out of the landing page bundle)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const CategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'));
const TestimonialsPage = lazy(() => import('./pages/admin/TestimonialsPage'));
const ContactsPage = lazy(() => import('./pages/admin/ContactsPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));

const AdminSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" />
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

// Admin-only route (blocks sellers)
const AdminOnly = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/admin" replace />;
  return children;
};

// Landing Page
const LandingPage = () => (
  <LanguageProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  </LanguageProvider>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<AdminSpinner />}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Dashboard (Protected) */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="testimonials" element={<AdminOnly><TestimonialsPage /></AdminOnly>} />
              <Route path="contacts" element={<AdminOnly><ContactsPage /></AdminOnly>} />
              <Route path="users" element={<AdminOnly><UsersPage /></AdminOnly>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
