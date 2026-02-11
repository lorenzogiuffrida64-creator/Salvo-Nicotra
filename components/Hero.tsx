import React, { useState, useEffect } from 'react';
import { Dumbbell, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1695292007578-583aeda2729a?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Interior" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className={`inline-flex items-center justify-center p-6 mb-10 bg-red-600/10 rounded-full border border-red-600/30 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Dumbbell className="text-red-600 w-12 h-12" />
        </div>

        <h1 className={`font-heading text-5xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-[0.9] text-white transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Palestre <br />
          <span className="text-red-600 italic drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">Salvo Nicotra</span>
        </h1>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link 
            to="/contatti"
            className="group relative px-12 py-5 bg-red-600 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_15px_35px_-10px_rgba(220,38,38,0.7)] hover:shadow-red-600/40 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              prova adesso <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <Link 
            to="/corsi"
            className="px-12 py-5 border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-xl active:scale-95"
          >
            scopri i corsi
          </Link>
        </div>

        <div className={`mt-16 flex items-center justify-center gap-3 text-zinc-500 bg-zinc-900/40 backdrop-blur-md w-fit mx-auto px-6 py-3 rounded-full border border-zinc-800/50 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MapPin className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold tracking-widest uppercase">Viale Vittorio Veneto, 313, Catania</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
        <div className="w-[1px] h-16 bg-gradient-to-b from-red-600 to-transparent rounded-full" />
      </div>
    </section>
  );
};