import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Attendee, PrizeTier } from '../types';

interface WinnerCelebrationProps {
  winner: Attendee;
  prize: PrizeTier;
  onClose: () => void;
}

export default function WinnerCelebration({ winner, prize, onClose }: WinnerCelebrationProps) {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#FFD700', '#FFFFFF', '#CFB53B']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#FFD700', '#FFFFFF', '#CFB53B']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(5,5,5,0.95)] backdrop-blur-3xl"
    >
      <div className="relative w-full max-w-4xl px-4 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold tracking-[.4em] uppercase mb-4 gold-text italic">
            🎉 Congratulations 🎉
          </h3>
          <p className="text-gray-500 font-medium tracking-[.5em] uppercase text-[10px] mb-12">
            Aurum Excellence Award Winner
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: 'spring', 
            damping: 15, 
            stiffness: 100, 
            delay: 0.4 
          }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tight text-white leading-none drop-shadow-2xl">
            {winner.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="prize-pill gold-text font-black text-xl md:text-2xl tracking-[.1em]">
             {prize.name.toUpperCase()}
          </div>
          
          <div className="flex gap-16 mt-4">
            <div className="text-center">
              <p className="text-gray-600 text-[10px] tracking-widest uppercase mb-1">Employee ID</p>
              <p className="text-white gold-text font-bold text-2xl">{winner.number}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-[10px] tracking-widest uppercase mb-1">Table</p>
              <p className="text-white font-serif italic text-2xl">{winner.table}</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onClose}
          className="mt-20 px-12 py-3 border border-[#d4af37]/30 text-[#d4af37]/60 hover:text-[#d4af37] hover:border-[#d4af37] transition-all uppercase text-[10px] tracking-[.3em] font-bold rounded-sm"
        >
          Return To Stage
        </motion.button>
      </div>


      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute left-1/4 top-1/4 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full" 
        />
      </div>
    </motion.div>
  );
}
