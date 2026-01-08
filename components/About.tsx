import React from 'react';
import { Award, Users, Target } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { icon: <Award className="w-10 h-10" />, value: '40+', label: 'anni esperienza' },
    { icon: <Users className="w-10 h-10" />, value: '500+', label: 'atleti seguiti' },
    { icon: <Target className="w-10 h-10" />, value: '100%', label: 'obiettivi' },
  ];

  return (
    <section id="chi-siamo" className="py-24 md:py-32 lg:py-48 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-6xl md:text-8xl font-heading mb-6 tracking-tighter">
            chi è <span className="text-red-600 italic">salvo nicotra</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <div className="relative group rounded-2xl md:rounded-[3rem] overflow-hidden">
             <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src="https://i.im.ge/2026/01/08/Gu88TC.Generated-Image-January-08-2026-2-48PM.jpeg"
              alt="Salvo Nicotra Palestra"
              className="relative rounded-2xl md:rounded-[3rem] w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] object-cover transition duration-1000 scale-100 group-hover:scale-105 shadow-2xl"
            />
          </div>

          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <p className="text-zinc-300 text-2xl leading-relaxed font-medium">
              con oltre <span className="text-red-500 font-black italic">50 anni di esperienza</span> nel mondo del fitness, salvo nicotra è il punto di riferimento a catania.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              la nostra filosofia unisce <span className="text-red-600 font-bold italic underline decoration-red-600/30 decoration-4 underline-offset-8">tecnica, disciplina e benessere mentale</span>, creando programmi personalizzati che trasformano non solo il corpo, ma anche lo stile di vita.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              dalle arti marziali al pilates, fino alla sala pesi d'avanguardia - salvo guida ogni atleta con la stessa passione di quando ha iniziato, decenni fa.
            </p>

            <div className="pt-6 md:pt-8 lg:pt-10 border-l-[8px] md:border-l-[12px] border-red-600 pl-6 md:pl-8 lg:pl-10">
              <span className="italic text-3xl md:text-4xl text-white font-black tracking-tight leading-tight block mb-4 lowercase">
                "il vero successo è superare i propri limiti ogni giorno"
              </span>
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs">- salvo nicotra</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-16 md:mt-24 lg:mt-32 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 md:p-10 lg:p-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl md:rounded-[3rem] text-center hover:border-red-600/40 transition-all duration-700 hover:-translate-y-4 group shadow-2xl"
            >
              <div className="text-red-600 mb-8 flex justify-center group-hover:scale-125 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">{stat.icon}</div>
              <div className="text-6xl font-black mb-4 font-heading tracking-tighter text-white">{stat.value}</div>
              <div className="text-[11px] uppercase tracking-[0.4em] font-black text-zinc-500 group-hover:text-zinc-300 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};