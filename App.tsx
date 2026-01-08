import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { Philosophy } from './components/Philosophy';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Map } from './components/Map';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('admin_auth') === 'Nicotra123';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Courses />
    <Philosophy />
    <Testimonials />
    <ContactForm />
    <Map />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        <ScrollToTop />
        <Routes>
          {/* Main Website Layout */}
          <Route path="/" element={
            <>
              <AnimatedBackground />
              <Header />
              <main><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/chi-siamo" element={
            <>
              <AnimatedBackground />
              <Header />
              <main className="pt-24"><About /></main>
              <Footer />
            </>
          } />
          <Route path="/corsi" element={
            <>
              <AnimatedBackground />
              <Header />
              <main className="pt-24"><Courses /></main>
              <Footer />
            </>
          } />
          <Route path="/sala-pesi" element={
            <>
              <AnimatedBackground />
              <Header />
              <main className="pt-24"><Philosophy /></main>
              <Footer />
            </>
          } />
          <Route path="/contatti" element={
            <>
              <AnimatedBackground />
              <Header />
              <main className="pt-24"><ContactForm /><Map /></main>
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;