import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Attendee, PrizeTier, Winner, PRIZE_TIERS, INITIAL_ATTENDEES } from './types';
import BackgroundEffects from './components/BackgroundEffects';
import SlotMachine from './components/SlotMachine';
import WinnerCelebration from './components/WinnerCelebration';
import ControlPanel from './components/ControlPanel';

type GameState = 'idle' | 'pre-draw' | 'drawing' | 'reveal';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [attendees, setAttendees] = useState<Attendee[]>(INITIAL_ATTENDEES);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [selectedPrize, setSelectedPrize] = useState<PrizeTier>(PRIZE_TIERS[0]);
  const [currentWinner, setCurrentWinner] = useState<Attendee | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Available pool: attendees who haven't won yet
  const availablePool = useMemo(() => {
    const winnerIds = new Set(winners.map(w => w.attendee.id));
    return attendees.filter(a => !winnerIds.has(a.id));
  }, [attendees, winners]);

  const handleStartDraw = useCallback(() => {
    if (availablePool.length === 0) {
      alert("No more eligible attendees in the pool!");
      return;
    }

    setGameState('pre-draw');
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          setCountdown(null);
          startSpinning();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  }, [availablePool]);

  const startSpinning = () => {
    setGameState('drawing');
    
    // Total spinning duration
    setTimeout(() => {
      // Pick winner
      const randomIndex = Math.floor(Math.random() * availablePool.length);
      const winner = availablePool[randomIndex];
      setCurrentWinner(winner);
      
      // Stop spinning (reels stop sequentially)
      // Note: we stay in 'drawing' state visually but we'll need to pass down isSpinning=false
      // I'll add a separate state for visual spinning
    }, 2000);
  };

  const [isVisualSpinning, setIsVisualSpinning] = useState(false);

  useEffect(() => {
    if (gameState === 'drawing') {
      setIsVisualSpinning(true);
      
      // Stay in visual spin for 2s
      const timer = setTimeout(() => {
        setIsVisualSpinning(false);
        
        // Wait for reels to stop sequentially (longest stop is 2.5s)
        setTimeout(() => {
           setGameState('reveal');
           if (currentWinner) {
              setWinners(prev => [...prev, {
                attendee: currentWinner,
                prize: selectedPrize,
                timestamp: Date.now()
              }]);
           }
        }, 3000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, currentWinner, selectedPrize]);

  const handleCloseReveal = () => {
    setGameState('idle');
    setCurrentWinner(null);
  };

  const handleSetAttendees = (newList: Attendee[]) => {
    setAttendees(newList);
    setWinners([]); // Reset winners if list changes
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black overflow-hidden font-sans">
      <BackgroundEffects />
      
      {/* Main Stage UI */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 pb-40">
        
        {/* Event Branding Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16 px-4"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-gray-400 font-bold uppercase">Aurum Financial Group</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <h1 className="text-3xl md:text-5xl gold-text font-bold italic tracking-wider mb-2 leading-tight">
            Annual Gala Excellence Awards 2024
          </h1>
          
          <div className="flex justify-center mt-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              key={selectedPrize.id}
              className="prize-pill gold-text font-bold flex items-center gap-2"
            >
              Current Prize: {selectedPrize.name}
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center w-full max-w-4xl"
            >
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartDraw}
                  className="px-12 py-4 bg-transparent border-2 border-[#d4af37] text-[#d4af37] text-lg font-bold tracking-[0.2em] rounded-sm hover:bg-[#d4af37] hover:text-black transition-all uppercase"
                >
                  Start Lucky Draw
                </motion.button>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
              </div>
              
              <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                SYSTEM STATUS: READY • {availablePool.length} DRAWABLE ENTRIES
              </div>
            </motion.div>
          )}

          {gameState === 'pre-draw' && countdown !== null && (
            <motion.div
              key="countdown"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-[12rem] md:text-[20rem] gold-text font-black italic shadow-gold"
            >
              {countdown}
            </motion.div>
          )}


          {(gameState === 'drawing' || gameState === 'reveal') && (
            <motion.div
              key="machine"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <SlotMachine 
                attendees={attendees} 
                isSpinning={isVisualSpinning} 
                winner={currentWinner}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal Overlay */}
        <AnimatePresence>
          {gameState === 'reveal' && currentWinner && (
            <WinnerCelebration 
              winner={currentWinner} 
              prize={selectedPrize} 
              onClose={handleCloseReveal} 
            />
          )}
        </AnimatePresence>

        {/* Global Footer Stats - Themed as Winner History & Status */}
        <div className="fixed bottom-12 left-16 right-16 z-20 flex justify-between items-end opacity-80">
           <div className="w-64">
              <div className="text-[10px] uppercase tracking-[.2em] text-gray-500 mb-3 border-b border-gray-800 pb-1">Winner History</div>
              <ul className="text-[11px] space-y-2">
                 {winners.length > 0 ? winners.slice(-3).reverse().map((w, idx) => (
                   <li key={idx} className="flex justify-between">
                     <span className="text-gray-400">{w.attendee.name}</span> 
                     <span className="gold-text font-bold">Table {w.attendee.table.replace(/\D/g, '')}</span>
                   </li>
                 )) : (
                   <li className="text-gray-600 italic">No winners yet</li>
                 )}
              </ul>
           </div>

           <div className="flex flex-col items-end gap-1 text-[10px] text-gray-600 font-mono tracking-tighter">
              <div>STATUS: {gameState.toUpperCase()}</div>
              <div>OPERATOR: GALA-ADMIN-01</div>
              <div>POOL: {availablePool.length}</div>
           </div>
        </div>
      </main>

      <ControlPanel 
        attendees={attendees}
        winners={winners}
        onSetAttendees={handleSetAttendees}
        onClearWinners={() => setWinners([])}
        prizeTiers={PRIZE_TIERS}
        selectedPrize={selectedPrize}
        onSelectPrize={setSelectedPrize}
      />
    </div>
  );
}
