// App.jsx — top-level composition root.
//
// Currently a placeholder. Will be assembled in Phase 3–4 with:
//   <Navbar />
//   <main>
//     <Hero />       <About />     <Stats />    <TrustedBy />
//     <Categories /> <Products />  <WhyUs />    <Testimonials />
//     <FAQ />        <Contact />
//   </main>
//   <Footer />
//
// See docs/PLAN.md (Fase 3 & 4) and docs/prompt.md for the full section spec.

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          OM Distribution
        </h1>
        <p className="text-text-secondary text-lg">
          Quality Food Distribution You Can Trust
        </p>
        <p className="mt-8 text-sm text-text-secondary">
          Landing page under construction...
        </p>
      </div>
    </div>
  )
}

export default App
