import React from 'react';
import { Dumbbell, ScrollText, Timer, ShieldCheck } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const points = [
    { icon: <Dumbbell className="text-red-600" />, title: 'attrezzature premium', desc: 'macchine professionali e pesi liberi per ogni esigenza' },
    { icon: <ScrollText className="text-red-600" />, title: 'programmi personalizzati', desc: 'schede di allenamento create su misura per te' },
    { icon: <Timer className="text-red-600" />, title: 'orari flessibili', desc: 'ampia disponibilità per adattarsi ai tuoi impegni' },
    { icon: <ShieldCheck className="text-red-600" />, title: 'assistenza continua', desc: 'supervisione e correzione tecnica costante' },
  ];

  const carouselImages = [
    "https://i.im.ge/2026/01/08/Guc1YP.IMG-1639.jpeg",
    "https://i.im.ge/2026/01/08/GugdcK.Generated-Image-January-08-2026-2-51PM.jpeg",
    "https://i.im.ge/2026/01/08/Gu8y4X.Generated-Image-January-08-2026-2-46PM.jpeg",
    "https://i.im.ge/2026/01/08/Gu8Cq8.tempImageJ5fuWt.jpeg",
    "https://i.im.ge/2026/01/08/Gu8Eth.tempImageuwoFCn.jpeg",
    "https://i.im.ge/2026/01/08/Gu8xzM.tempImageVtf9gJ.jpeg",
    "https://i.im.ge/2026/01/08/Gu8YFY.tempImageyo86nd.jpeg",
    "https://i.im.ge/2026/01/08/Gu8bjD.tempImage4WHXxd.jpeg",
    "https://i.im.ge/2026/01/08/Gu8cR4.tempImage9qHwne.jpeg"
  ];

  return (
    <section id="sala-pesi" className="py-24 md:py-32 lg:py-48 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-6xl md:text-8xl font-heading mb-8 lowercase tracking-tighter">
              sala <span className="text-red-600 italic">pesi</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium lowercase">
              costruisci forza, massa muscolare e definizione con il supporto di un professionista con oltre 40 anni di esperienza nel bodybuilding.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {points.map((point, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="p-4 rounded-2xl border border-red-600/30 bg-red-600/5 transition-all group-hover:bg-red-600/20 shrink-0 h-fit">
                    {React.cloneElement(point.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 tracking-tight lowercase text-white">{point.title}</h4>
                    <p className="text-gray-500 text-sm font-medium lowercase">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mask-gradient-top-bottom overflow-hidden group">
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 animate-marquee-up py-4">
              {[...carouselImages, ...carouselImages].map((img, idx) => (
                <div key={idx} className="min-w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl md:rounded-[3rem] overflow-hidden border border-zinc-900 shrink-0 shadow-2xl transition-all duration-700 group-hover:border-red-600/40">
                  <img 
                    src={img} 
                    alt={`Sala Pesi ${idx}`} 
                    className="w-full h-full object-cover transition-all duration-1000 scale-100 hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-24 md:pt-32 lg:pt-48">
          <h2 className="text-5xl md:text-7xl font-heading mb-4 tracking-tighter lowercase">la nostra <span className="text-red-600 italic">filosofia</span></h2>
          <p className="text-gray-400 max-w-3xl mx-auto italic text-xl font-light lowercase">
            "un approccio integrato che trasforma il tuo modo di allenarti e vivere"
          </p>
          <div className="w-32 h-1.5 bg-red-600 mx-auto mt-10 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
        </div>
      </div>
    </section>
  );
};