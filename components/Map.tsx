import React from 'react';
import { MapPin } from 'lucide-react';

export const Map: React.FC = () => {
  return (
    <section className="py-24 md:py-32 lg:py-48 bg-black relative border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] uppercase tracking-[0.3em] font-black mb-6 lowercase">
            <MapPin className="w-3 h-3" /> location
          </div>
          <h2 className="text-6xl md:text-8xl font-heading tracking-tighter lowercase">
            vieni a <span className="text-red-600 italic">trovarci</span>
          </h2>
          <div className="w-32 h-1 bg-red-600 mx-auto mt-10 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto group">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-zinc-800 rounded-2xl md:rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>

          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] w-full rounded-2xl md:rounded-[3rem] overflow-hidden border border-zinc-800/80 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] bg-zinc-900">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4078.86455763181!2d15.0953435!3d37.526544799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313fd19e042e7e7%3A0xb2c2c51f61c8e639!2sPalestre%20Salvo%20Nicotra%20-%20Boxe%2C%20Kick%20%26%20Pilates!5e1!3m2!1sit!2sit!4v1767805670449!5m2!1sit!2sit" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Salvo Nicotra Palestre Location"
              className="w-full h-full transition-all duration-1000 group-hover:scale-[1.03]"
            ></iframe>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] rounded-[3rem]" />
          </div>
        </div>
      </div>
    </section>
  );
};