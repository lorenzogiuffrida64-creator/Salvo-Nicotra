import React from 'react';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          <div className="space-y-4">
            <span className="text-2xl font-bold tracking-tighter">
              <span className="text-red-600">salvo</span> <span className="text-white">nicotra</span>
            </span>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed lowercase">
              il punto di riferimento per il fitness e le arti marziali a catania dal 1970. forza, tecnica e passione.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.facebook.com/salvo.nicotra.1671/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-red-600 hover:bg-zinc-800 transition-all shadow-lg"
                aria-label="Seguici su Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs lowercase">contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-500 text-sm lowercase">
                <Mail className="w-4 h-4 text-red-600" />
                <a href="mailto:palestre.salvonicotra@gmail.com" className="hover:text-white transition-colors">palestre.salvonicotra@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm lowercase">
                <Phone className="w-4 h-4 text-red-600" />
                <a href="tel:+393475907497" className="hover:text-white transition-colors">+39 347 590 7497</a>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 text-sm lowercase">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                <span>viale vittorio veneto, 313<br />95126 catania (ct)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
          <div>© 2026 SALVO NICOTRA</div>
          <div className="flex gap-6">
          </div>
        </div>
      </div>
    </footer>
  );
};