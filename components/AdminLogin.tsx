import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Nicotra123') {
      localStorage.setItem('admin_auth', 'Nicotra123');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-3xl font-bold tracking-tighter">
            <span className="text-red-600">salvo</span> <span className="text-white">nicotra</span>
          </span>
          <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest font-bold">area riservata</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-8 lowercase">accedi al dashboard</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Lock className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? 'text-red-500' : 'text-zinc-600 group-focus-within:text-red-500'}`} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className={`w-full bg-black border ${error ? 'border-red-600' : 'border-zinc-800 focus:border-red-600'} rounded-2xl py-5 pl-14 pr-6 outline-none transition-all text-white font-medium`}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">Password Errata</p>
            )}

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)]"
            >
              entra <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-zinc-600 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors"
          >
            torna al sito
          </button>
        </div>
      </div>
    </div>
  );
};