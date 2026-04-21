import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Users, Trophy, History, X, Download, Upload, RotateCcw } from 'lucide-react';
import { Attendee, PrizeTier, Winner } from '../types';

interface ControlPanelProps {
  attendees: Attendee[];
  winners: Winner[];
  onSetAttendees: (attendees: Attendee[]) => void;
  onClearWinners: () => void;
  prizeTiers: PrizeTier[];
  selectedPrize: PrizeTier;
  onSelectPrize: (prize: PrizeTier) => void;
}

export default function ControlPanel({ 
  attendees, 
  winners, 
  onSetAttendees, 
  onClearWinners,
  prizeTiers,
  selectedPrize,
  onSelectPrize
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'prizes' | 'attendees' | 'history'>('prizes');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const newAttendees: Attendee[] = lines.slice(1).map((line, idx) => {
        const [name, number, table] = line.split(',');
        return {
          id: String(idx + 1),
          name: name?.trim() || 'Unknown',
          number: number?.trim() || `EMP-${idx}`,
          table: table?.trim() || 'General'
        };
      }).filter(a => a.name !== 'Unknown');
      
      onSetAttendees(newAttendees);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Number,Table\nJohn Doe,EMP001,Table 01\nJane Smith,EMP002,Table 02";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendee_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-[#d4af37] rounded-full shadow-2xl hover:bg-[#c4a030] transition-colors group"
      >
        <Settings className="w-6 h-6 text-black group-hover:rotate-90 transition-transform duration-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center md:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl h-[80vh] bg-[#111] border border-[#d4af37]/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-800/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#d4af37]" />
                  Gala Control Panel
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/5 bg-neutral-800/30">
                <button 
                  onClick={() => setActiveTab('prizes')}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'prizes' ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#d4af37]/5' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Trophy className="w-4 h-4" /> PRIZES
                </button>
                <button 
                  onClick={() => setActiveTab('attendees')}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'attendees' ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#d4af37]/5' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Users className="w-4 h-4" /> ATTENDEES
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'history' ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#d4af37]/5' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <History className="w-4 h-4" /> HISTORY
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'prizes' && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Select Active Prize Category</p>
                    {prizeTiers.map(prize => (
                      <button
                        key={prize.id}
                        onClick={() => { onSelectPrize(prize); setIsOpen(false); }}
                        className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group ${selectedPrize.id === prize.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/5 bg-neutral-800/50 hover:border-white/20'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${prize.gradient}`} />
                          <span className={`font-bold ${selectedPrize.id === prize.id ? 'text-white' : 'text-gray-400'}`}>
                            {prize.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-gray-500">{prize.count} Total</span>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'attendees' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-2xl border border-white/5">
                      <div>
                        <h4 className="font-bold text-white mb-1">Attendee List ({attendees.length})</h4>
                        <p className="text-xs text-gray-500">Winners are automatically removed from drawing</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={downloadTemplate}
                          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors flex items-center gap-2 text-xs font-bold"
                          title="Download CSV Template"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <label className="p-2 bg-[#d4af37] hover:bg-[#c4a030] rounded-lg text-black transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold">
                          <Upload className="w-4 h-4" />
                          <span>UPLOAD CSV</span>
                          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Employee Registry</p>
                      <div className="bg-black/20 rounded-xl overflow-hidden divide-y divide-white/5 border border-white/5">
                        {attendees.slice(0, 50).map(person => (
                          <div key={person.number} className="p-3 flex items-center justify-between text-sm">
                            <span className="text-gray-300 font-medium">{person.name}</span>
                            <span className="text-gray-600 font-mono text-xs">{person.number} — {person.table}</span>
                          </div>
                        ))}
                        {attendees.length > 50 && (
                          <div className="p-3 text-center text-xs text-gray-600">... and {attendees.length - 50} more</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Winner Log</p>
                      <button 
                        onClick={() => { if(confirm('Clear all winners?')) onClearWinners(); }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-400 flex items-center gap-1 uppercase transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset History
                      </button>
                    </div>
                    
                    {winners.length === 0 ? (
                      <div className="text-center py-20 bg-black/10 rounded-3xl border border-dashed border-white/5">
                        <Trophy className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">No draws recorded yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {[...winners].reverse().map((winner, idx) => (
                          <div key={idx} className="p-4 bg-neutral-800/80 border border-white/5 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${winner.prize.gradient}`} />
                              <div>
                                <h5 className="font-bold text-white leading-none mb-1">{winner.attendee.name}</h5>
                                <p className="text-[10px] font-bold text-[#d4af37]/60 uppercase tracking-widest">{winner.prize.name}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-gray-600 bg-black/20 px-2 py-1 rounded italic">
                              {new Date(winner.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
