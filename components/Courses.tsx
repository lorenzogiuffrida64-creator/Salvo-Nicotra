import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  badge: string;
  badgeType?: 'default' | 'new';
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, features, image, badge, badgeType = 'default' }) => (
  <div className="group relative bg-[#121212] overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-zinc-800 transition-all duration-500 hover:border-red-600/40 hover:-translate-y-3 flex flex-col h-full shadow-2xl">
    <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
      <div className={`absolute top-6 right-6 ${badgeType === 'new' ? 'bg-red-600' : 'bg-red-600'} text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg border border-white/10`}>
        {badge.toLowerCase()}
      </div>
    </div>

    <div className="px-6 md:px-8 py-6 md:py-8 flex-grow">
      <h3 className="text-4xl font-heading mb-4 group-hover:text-red-500 transition-colors tracking-tighter lowercase">
        {title}
      </h3>
      <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium">
        {description}
      </p>
      <ul className="space-y-3 mb-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-[12px] font-bold text-zinc-200 tracking-tight lowercase">
            <span className="w-2 h-2 bg-red-600 rounded-sm shrink-0 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="px-8 pb-8">
      <Link 
        to="/contatti"
        state={{ selectedCourse: title }}
        className="w-full block text-center py-4 bg-[#dc2626] hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all rounded-xl shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] active:scale-[0.98]"
      >
        prova adesso
      </Link>
    </div>
  </div>
);

export const Courses: React.FC = () => {
  const allCourses: CourseCardProps[] = [
    {
      title: "boxe",
      badge: "disponibile",
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      description: "allenamento completo che combina tecnica pugilistica, resistenza cardiovascolare e forza esplosiva.",
      features: ["tecnica pugilistica", "conditioning", "sparring"]
    },
    {
      title: "kickboxing",
      badge: "popolare",
      image: "https://i.im.ge/2026/01/08/GuBLYa.sportive-blond-woman-has-boxing-training-with-her-experienced-trainer.jpeg",
      description: "arte marziale dinamica che integra pugni e calci, sviluppando coordinazione e potenza.",
      features: ["tecniche di calcio", "combinazioni", "fitness cardio"]
    },
    {
      title: "mma",
      badge: "nuovo",
      badgeType: 'new',
      image: "https://i.im.ge/2026/01/08/GupJSF.mma-fighters-professional-ring-fighting-championship.jpeg",
      description: "arti marziali miste: il sistema di combattimento totale che unisce lotta, striking e sottomissioni.",
      features: ["grappling", "striking", "ground and pound"]
    },
    {
      title: "karate",
      badge: "disponibile",
      image: "https://i.im.ge/2026/01/08/GuHrLY.female-doing-karate-pose-full-shot.jpeg",
      description: "l'arte della mano vuota. disciplina giapponese che focalizza su colpi percussivi, parate e katà per lo sviluppo del carattere.",
      features: ["kata e kumite", "disciplina", "autodifesa"]
    },
    {
      title: "bodybuilding",
      badge: "isotonico",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
      description: "ipertrofia e forza con il metodo nicotra. macchinari isotonici e pesi liberi di ultima generazione.",
      features: ["ipertrofia muscolare", "forza pura", "schede personalizzate"]
    },
    {
      title: "kung fu",
      badge: "tradizione",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop",
      description: "disciplina millenaria per l'equilibrio tra corpo e mente, attraverso forme e tecniche di difesa.",
      features: ["forme tradizionali", "autodifesa", "agilità mentale"]
    },
    {
      title: "pilates",
      badge: "benessere",
      image: "https://i.im.ge/2026/01/08/GuvgxY.pretty-girl-wearing-leggings-short-top-standing-side-plank-one-hand-gym-training-body-core-balance-strengthening-abs-muscles-attractive-female-doing-planking-bodyweight-exercise.jpeg",
      description: "sistema di esercizi che rafforza il core, migliora postura e flessibilità in modo controllato.",
      features: ["core strength", "postura corretta", "mindfulness"]
    },
    {
      title: "brazilian ju jitsu",
      badge: "bjj",
      image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1200&auto=format&fit=crop",
      description: "l'arte della leva e del controllo al suolo. impara a neutralizzare avversari più grandi.",
      features: ["lotta a terra", "sottomissioni", "strategia"]
    },
    {
      title: "ju jitsu",
      badge: "giapponese",
      image: "https://i.im.ge/2026/01/08/GuJDT8.bearded-karate-fighter-dressed-white-kimono-action.jpeg",
      description: "la dolce arte dell'autodifesa tradizionale giapponese. leve, proiezioni e immobilizzazioni.",
      features: ["difesa personale", "leve articolari", "tradizione samurai"]
    },
    {
      title: "ninjutsu",
      badge: "esclusivo",
      image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=1200&auto=format&fit=crop",
      description: "l'arte della sopravvivenza e dello stealth. studio di tecniche storiche dei ninja.",
      features: ["movimenti furtivi", "armi tradizionali", "tattica"]
    },
    {
      title: "kobudo",
      badge: "armi",
      image: "https://i.im.ge/2026/01/08/GunPKK.people-practicing-tai-chi-front-view.jpeg",
      description: "lo studio delle armi tradizionali di okinawa. padroneggia bo, sai, nunchaku e tonfa.",
      features: ["armi orientali", "coordinazione", "precisione"]
    },
    {
      title: "aikido",
      badge: "armonia",
      image: "https://i.im.ge/2026/01/08/Gu4yP0.two-judo-wrestlers-showing-their-technical-skills-fight-club.jpeg",
      description: "usa l'energia dell'avversario a tuo favore. un'arte marziale non violenta focalizzata sull'armonia.",
      features: ["flusso di energia", "proiezioni", "controllo articolare"]
    },
    {
      title: "zumba",
      badge: "energy",
      image: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1200&auto=format&fit=crop",
      description: "fitness e divertimento a ritmo di musica. brucia calorie migliorando l'umore.",
      features: ["ritmi latini", "brucia grassi", "coordinazione danza"]
    }
  ];

  return (
    <section id="corsi" className="py-24 md:py-32 lg:py-48 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-heading mb-6 tracking-tighter lowercase">
            i nostri <span className="text-red-600 italic">corsi</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[11px] mb-8">
            l'eccellenza nell'allenamento e nelle arti marziali a catania
          </p>
          <div className="w-32 h-1 bg-red-600 mx-auto rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {allCourses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
            />
          ))}
        </div>
      </div>
    </section>
  );
};