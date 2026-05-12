import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Products from './components/sections/Products';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

function App() {
  return (
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
}

export default App;
