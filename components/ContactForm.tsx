
import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, User, MessageSquare, ChevronRight, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbGs6Rpnc0SbIW3mCmylENvcrjX_4AAKKfIWYNFXJDJyNtlzYxtOPcXwM7VN59zqvg/exec';

export const ContactForm: React.FC = () => {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'sala pesi',
    message: ''
  });

  useEffect(() => {
    // Se l'utente arriva da un link con stato (es. un Corso specifico), pre-impostiamo il corso nel form
    if (location.state && (location.state as any).selectedCourse) {
      setFormData(prev => ({
        ...prev,
        course: (location.state as any).selectedCourse.toLowerCase()
      }));
    }
  }, [location.state]);

  const services = [
    "sala pesi", "boxe", "kickboxing", "mma", "karate", "kung fu", 
    "pilates", "brazilian ju jitsu", "ju jitsu", "ninjutsu", 
    "kobudo", "aikido", "zumba"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('it-IT'),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: formData.message,
      status: 'NUOVA',
      notes: ''
    };

    try {
      const targetUrl = `${GOOGLE_SCRIPT_URL}?action=add`;
      
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', course: 'sala pesi', message: '' });
      
      const existing = JSON.parse(localStorage.getItem('nicotra_requests') || '[]');
      localStorage.setItem('nicotra_requests', JSON.stringify([payload, ...existing]));

    } catch (error) {
      console.error("Errore invio modulo:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contatti" className="py-24 md:py-32 lg:py-48 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading leading-tight tracking-tighter lowercase mb-6">
              Entra nel <br /><span className="text-red-600 italic">Team Nicotra</span>
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-medium lowercase">
              Prenota oggi la tua prima sessione e inizia il percorso verso la tua versione migliore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {[
                  { icon: <Phone />, label: 'chiamaci', value: '+39 347 590 7497', href: 'tel:+393475907497' },
                  { icon: <Mail />, label: 'email', value: 'palestre.salvonicotra@gmail.com', href: 'mailto:palestre.salvonicotra@gmail.com' },
                  { icon: <MapPin />, label: 'vienici a trovare', value: 'Viale Vittorio Veneto, 313', href: '#' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-600 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-red-600/20">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black mb-1 lowercase">{item.label}</p>
                      <a href={item.href} className="text-lg md:text-xl font-bold hover:text-red-500 transition-colors lowercase">{item.value}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-zinc-900/50 rounded-2xl md:rounded-[3rem] blur-2xl opacity-50"></div>
              <div className="relative bg-[#0d0d0d] backdrop-blur-3xl p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-[3rem] border border-zinc-800/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                {submitted ? (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 lowercase">grazie!</h3>
                    <p className="text-zinc-500 font-medium lowercase">la tua richiesta è stata ricevuta correttamente.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:border-red-600/50 outline-none transition-all text-white placeholder:text-zinc-700 font-medium lowercase" 
                        placeholder="il tuo nome completo"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:border-red-600/50 outline-none transition-all text-white placeholder:text-zinc-700 font-medium lowercase" 
                        placeholder="indirizzo email"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-black border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:border-red-600/50 outline-none transition-all text-white placeholder:text-zinc-700 font-medium lowercase" 
                          placeholder="telefono"
                        />
                      </div>
                      <div className="relative group">
                        <ChevronRight className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors pointer-events-none" />
                        <select 
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          className="w-full bg-black border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:border-red-600/50 outline-none transition-all text-white appearance-none cursor-pointer font-medium lowercase"
                        >
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="relative group">
                      <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                      <textarea 
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:border-red-600/50 outline-none transition-all text-white placeholder:text-zinc-700 font-medium resize-none lowercase" 
                        placeholder="scrivi il tuo messaggio qui..."
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full group relative bg-red-600 hover:bg-red-700 py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-3 transition-all duration-500 active:scale-[0.98] overflow-hidden shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] lowercase disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {loading ? 'invio in corso...' : 'invia richiesta'} 
                        {!loading && <Send className="w-4 h-4" />}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};