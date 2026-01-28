import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', label: 'home' },
    { path: '/chi-siamo', label: 'chi è salvo nicotra' },
    { path: '/corsi', label: 'i nostri corsi' },
    { path: '/sala-pesi', label: 'sala pesi' },
    { path: '/contatti', label: 'contatti' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-xl py-4' : 'bg-transparent py-6'
      } ${isScrolled ? 'border-b border-zinc-900/50' : 'border-b border-transparent'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 relative z-50 shrink-0">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
            <span className="text-red-600">Salvo</span> <span className="text-white">Nicotra</span>
          </Link>
        </div>

        {/* Desktop & Tablet Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-colors hover:text-red-500 whitespace-nowrap ${
                isActive(item.path) ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all pl-4 border-l border-zinc-800 ml-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> <span className="hidden xl:inline">dashboard</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4 relative z-50">
          <Link 
            to="/contatti"
            className="hidden sm:inline-block bg-red-600 hover:bg-red-700 text-white px-5 xl:px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 whitespace-nowrap"
          >
            prova adesso
          </Link>

          <button 
            className="lg:hidden p-2 text-white hover:text-red-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out border-b border-zinc-800 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100 py-12' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <nav className="container mx-auto px-6 flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl md:text-4xl font-heading tracking-tighter lowercase transition-colors ${
                isActive(item.path) ? 'text-red-600' : 'text-zinc-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-8 border-t border-zinc-900 flex flex-col gap-6">
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-xl font-heading tracking-tight lowercase text-zinc-500 hover:text-red-500 transition-colors"
            >
              <LayoutDashboard className="w-6 h-6" /> dashboard admin
            </Link>
            <div className="sm:hidden">
              <Link 
                to="/contatti"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-600/20"
              >
                prova adesso
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};