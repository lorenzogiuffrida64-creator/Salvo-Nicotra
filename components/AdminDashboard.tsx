import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, LogOut, Trash2, CheckCircle, 
  MessageSquare, Search, Filter, Eye, RefreshCw, X, AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbGs6Rpnc0SbIW3mCmylENvcrjX_4AAKKfIWYNFXJDJyNtlzYxtOPcXwM7VN59zqvg/exec';

interface Request {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  status: 'NUOVA' | 'IN ATTESA' | 'GESTITA';
  notes?: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Tutti');
  
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usiamo una fetch GET pulita. Google Apps Script restituisce JSON correttamente via GET.
      const url = `${GOOGLE_SCRIPT_URL}?action=get&t=${Date.now()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const rawData = await response.json();
      console.log("Dashboard - Dati ricevuti:", rawData);
      
      let dataArray: any[] = [];
      if (Array.isArray(rawData)) {
        dataArray = rawData;
      } else if (rawData && typeof rawData === 'object') {
        dataArray = rawData.data || rawData.requests || rawData.values || [];
      }

      const mappedData = dataArray.map((item: any) => ({
        id: (item.id || item.ID || '').toString(),
        date: item.date || item.data || item.Data || '',
        name: item.name || item.nome || item.Nome || '',
        email: item.email || item.Email || '',
        phone: item.phone || item.telefono || item.Telefono || '',
        course: item.course || item.corso || item.Corso || '',
        message: item.message || item.messaggio || item.Messaggio || '',
        status: (item.status || item.stato || item.Stato || 'NUOVA').toUpperCase() as Request['status'],
        notes: item.notes || item.note || item.Note || ''
      }));

      setRequests(mappedData);
      localStorage.setItem('nicotra_requests', JSON.stringify(mappedData));
    } catch (err: any) {
      console.error("Dashboard - Errore fetch:", err);
      setError(err.message || "Errore di connessione al Cloud");
      
      const saved = localStorage.getItem('nicotra_requests');
      if (saved) setRequests(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const persistChange = async (action: string, payload: any) => {
    try {
      // Aggiungiamo l'azione nell'URL per sicurezza
      const url = `${GOOGLE_SCRIPT_URL}?action=${action}`;
      
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ ...payload, action }) // Includiamo l'azione anche nel body
      });
      return true;
    } catch (e) {
      console.warn("Persistenza Cloud (opaca):", e);
      return true;
    }
  };

  const deleteRequest = async (id: string) => {
    if (!window.confirm('Eliminare definitivamente questa richiesta dal foglio Google?')) return;
    
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('nicotra_requests', JSON.stringify(updated));
    
    setLoading(true);
    await persistChange('delete', { id });
    setTimeout(fetchRequests, 1500);
  };

  const toggleStatus = async (id: string) => {
    let newStatus: Request['status'] = 'NUOVA';
    const updated = requests.map(r => {
      if (r.id === id) {
        if (r.status === 'NUOVA') newStatus = 'IN ATTESA';
        else if (r.status === 'IN ATTESA') newStatus = 'GESTITA';
        else newStatus = 'NUOVA';
        return { ...r, status: newStatus };
      }
      return r;
    });
    
    setRequests(updated);
    await persistChange('update', { id, status: newStatus });
  };

  const saveNote = async () => {
    if (selectedRequest) {
      const updated = requests.map(r => 
        r.id === selectedRequest.id ? { ...r, notes: currentNote } : r
      );
      setRequests(updated);
      setIsNoteModalOpen(false);
      await persistChange('update', { id: selectedRequest.id, notes: currentNote });
      setSelectedRequest(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const filteredRequests = requests.filter(r => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (r.name || '').toLowerCase().includes(term) || (r.email || '').toLowerCase().includes(term);
    const matchesFilter = filterStatus === 'Tutti' || r.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'NUOVA').length,
    pending: requests.filter(r => r.status === 'IN ATTESA').length,
    handled: requests.filter(r => r.status === 'GESTITA').length,
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row">
      <aside className="w-full lg:w-72 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col p-6 z-30">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic shadow-lg shadow-red-600/20">SN</div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-sm uppercase">salvo nicotra</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">admin panel</p>
          </div>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-600 text-white shadow-lg">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-bold">Dashboard</span>
          </button>
          <button onClick={fetchRequests} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all group">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span className="text-sm font-bold">Sincronizza Cloud</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-4 text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-2xl transition-all">
          <LogOut className="w-5 h-5" /> Esci
        </button>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight lowercase">
              gestione <span className="text-red-600">richieste</span>
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${loading ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></span>
                {loading ? 'Sincronizzazione...' : 'Connesso'}
              </p>
              {error && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-tighter">
                  <AlertTriangle className="w-3 h-3" /> {error}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-2xl text-red-600 text-xs font-black uppercase tracking-widest flex items-center gap-3">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
               </span>
               {stats.new} nuove
             </div>
          </div>
        </header>

        {loading && requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40">
            <RefreshCw className="w-12 h-12 animate-spin text-red-600 mb-6" />
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest animate-pulse">Caricamento dati...</p>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Totali', value: stats.total, color: 'text-white' },
                { label: 'Nuove', value: stats.new, color: 'text-red-600' },
                { label: 'In Corso', value: stats.pending, color: 'text-orange-500' },
                { label: 'Gestite', value: stats.handled, color: 'text-green-500' },
              ].map((s, i) => (
                <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:border-zinc-700 transition-all group">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">{s.label}</p>
                  <p className={`text-5xl font-black ${s.color} transition-transform group-hover:scale-110 duration-500`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="text" 
                    placeholder="Cerca per nome o email..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="bg-black border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white w-full outline-none focus:border-red-600/50 transition-all"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black border border-zinc-800 rounded-xl py-3.5 px-6 text-sm text-zinc-400 outline-none cursor-pointer hover:bg-zinc-900 transition-all appearance-none"
                >
                  <option value="Tutti">Tutti gli stati</option>
                  <option value="NUOVA">Nuove</option>
                  <option value="IN ATTESA">In Attesa</option>
                  <option value="GESTITA">Gestite</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-950/50 border-b border-zinc-800">
                      <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Data</th>
                      <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Mittente</th>
                      <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Corso</th>
                      <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">Stato</th>
                      <th className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-zinc-900/40 group transition-colors">
                        <td className="px-8 py-8 text-sm font-bold text-zinc-400">{req.date}</td>
                        <td className="px-8 py-8">
                          <div className="flex flex-col">
                            <span className="text-white font-bold text-sm lowercase">{req.name}</span>
                            <span className="text-zinc-600 text-xs lowercase">{req.email}</span>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">{req.course}</span>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <button 
                            onClick={() => toggleStatus(req.id)}
                            className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-widest uppercase border transition-all ${
                              req.status === 'NUOVA' ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
                              req.status === 'GESTITA' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                              'bg-orange-500/10 text-orange-500 border-orange-500/20'
                            }`}
                          >
                            {req.status}
                          </button>
                        </td>
                        <td className="px-8 py-8 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setSelectedRequest(req); setIsPreviewOpen(true); }} className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all" title="Anteprima"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => { setSelectedRequest(req); setCurrentNote(req.notes || ''); setIsNoteModalOpen(true); }} className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 rounded-xl transition-all" title="Note"><MessageSquare className="w-4 h-4" /></button>
                            <button onClick={() => deleteRequest(req.id)} className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-600 rounded-xl transition-all" title="Elimina"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRequests.length === 0 && !loading && (
                      <tr>
                        <td colSpan={5} className="py-24 text-center">
                          <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs italic">Nessun dato trovato</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0d0d0d] border border-zinc-800 w-full max-w-lg rounded-[2.5rem] p-10 relative animate-in zoom-in duration-300">
            <button onClick={() => setIsNoteModalOpen(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-white mb-6 lowercase">nota per <span className="text-red-600 italic">{selectedRequest?.name}</span></h3>
            <textarea value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-2xl p-6 text-white text-sm outline-none min-h-[150px] mb-8 focus:border-red-600/50 transition-all resize-none" placeholder="Scrivi una nota..." />
            <div className="flex gap-4">
              <button onClick={() => setIsNoteModalOpen(false)} className="flex-1 py-4 bg-zinc-900 text-zinc-400 font-bold rounded-2xl border border-zinc-800">annulla</button>
              <button onClick={saveNote} className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-lg shadow-red-600/20">salva nota</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-zinc-800 w-full max-w-2xl rounded-[3rem] overflow-hidden relative animate-in zoom-in duration-300 shadow-[0_40px_100px_rgba(0,0,0,1)]">
            <div className="p-10 border-b border-zinc-800 flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black text-white lowercase tracking-tight">{selectedRequest.name}</h3>
                <p className="text-red-600 text-[10px] font-black uppercase mt-2 tracking-widest">{selectedRequest.course} • {selectedRequest.date}</p>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-all"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-10 space-y-8">
               <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8">
                <p className="text-zinc-300 text-lg italic lowercase leading-relaxed">"{selectedRequest.message}"</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-900/20 p-6 rounded-2xl">
                <div>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-bold text-white lowercase">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Telefono</p>
                  <p className="text-sm font-bold text-white">{selectedRequest.phone}</p>
                </div>
              </div>
              {selectedRequest.notes && (
                <div className="pt-4">
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-2">Note Interne</p>
                  <p className="text-zinc-400 text-sm bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};