import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: "Giulia Patanè", role: "cliente", text: "Ben attrezzata, spogliatoi puliti, titolare e personale seri e disponibili. Hanno anche dei sacchi da boxe per scaricare un po di stress." },
  { name: "VV", role: "cliente", text: "ambiente professionale e stimolante. i corsi di kickboxing sono il top a catania." },
  { name: "Antonio Spina", role: "cliente", text: "ho raggiunto obiettivi che non credevo possibili. salvo ti segue con una passione unica." },
  { name: "Andrea Spina", role: "cliente", text: "Ottima palestra, struttura ben attrezzata, TOP." },
  { name: "Tiziana Bonaccorso", role: "cliente", text: "Ambiente super accogliente, consigliatissima." },
  { name: "Enrico DI Stefano", role: "cliente", text: "Ottimi gli spazi dedicati alle arti marziali" },
  { name: "Sonia Damigella", role: "cliente", text: "Palestra Pulita, Salvo è molto simpatico e professionale." },
  { name: "Enrico Spina", role: "cliente", text: "Ottima Palestra, consigliata a chi vuole finalemnte cambiare" },
  { name: "Salvo Di Bartolo", role: "cliente", text: "Ottimo il clima che si respira. La Palestra è Old School per chi vuole veramente allenarsi" },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 md:py-32 lg:py-48 bg-zinc-950 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 mb-16 md:mb-20 lg:mb-24 text-center relative z-20">
        <div className="inline-block px-5 py-2 border border-zinc-800 rounded-full text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 bg-zinc-900/50 backdrop-blur-md font-black">
          dicono di noi
        </div>
        <h2 className="text-6xl md:text-8xl font-heading mb-6 tracking-tighter lowercase">dicono di <span className="text-red-600 italic">noi</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium lowercase">storie di successo e trasformazione dei nostri clienti.</p>
      </div>

      <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] mask-gradient-top-bottom z-10">
        <div className="flex justify-center gap-4 md:gap-6 lg:gap-10 px-4 h-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 animate-marquee-up w-full max-w-[450px]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="p-6 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-between hover:border-red-600/30 transition-all duration-500 shadow-2xl relative group">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-red-600/10 group-hover:text-red-600/20 transition-colors" />
                <p className="text-zinc-300 text-xl mb-10 italic leading-relaxed font-medium lowercase relative z-10">
                  "{t.text}"
                </p>
                <div className="pt-6 border-t border-zinc-800/50">
                  <h4 className="font-black text-white text-base tracking-tight lowercase">{t.name}</h4>
                  <p className="text-red-600 text-[10px] uppercase tracking-widest font-black lowercase mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="hidden md:flex flex-col gap-4 md:gap-6 lg:gap-10 animate-marquee-up w-full max-w-[450px]" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
              <div key={i} className="p-6 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-between hover:border-red-600/30 transition-all duration-500 shadow-2xl relative group">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-red-600/10 group-hover:text-red-600/20 transition-colors" />
                <p className="text-zinc-300 text-xl mb-10 italic leading-relaxed font-medium lowercase relative z-10">
                  "{t.text}"
                </p>
                <div className="pt-6 border-t border-zinc-800/50">
                  <h4 className="font-black text-white text-base tracking-tight lowercase">{t.name}</h4>
                  <p className="text-red-600 text-[10px] uppercase tracking-widest font-black lowercase mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};