import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Attendee } from '../types';

interface SlotMachineProps {
  attendees: Attendee[];
  isSpinning: boolean;
  winner: Attendee | null;
}

const Reel = ({ 
  items, 
  isSpinning, 
  targetItem, 
  stopDelay = 0,
  label
}: { 
  items: string[], 
  isSpinning: boolean, 
  targetItem: string | null,
  stopDelay?: number,
  label: string
}) => {
  const [displayItems, setDisplayItems] = useState(items.slice(0, 5));
  const [isActuallySpinning, setIsActuallySpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setIsActuallySpinning(true);
    } else {
      const timeout = setTimeout(() => {
        setIsActuallySpinning(false);
      }, stopDelay);
      return () => clearTimeout(timeout);
    }
  }, [isSpinning, stopDelay]);

  useEffect(() => {
    if (isActuallySpinning) {
      const interval = setInterval(() => {
        setDisplayItems(prev => {
          const nextIndex = Math.floor(Math.random() * items.length);
          return [items[nextIndex], ...prev.slice(0, 4)];
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActuallySpinning, items]);

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <span className="mb-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</span>
      <div className="relative w-full aspect-square max-w-[280px] overflow-hidden bg-[rgba(20,20,20,0.8)] border-2 border-[#d4af37] rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
        {/* Theme Overlays */}
        <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none bg-gradient-to-b from-[rgba(5,5,5,0.9)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none bg-gradient-to-t from-[rgba(5,5,5,0.9)] to-transparent" />
        
        {/* Central Selection Line (Subtle) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 z-10 border-y border-[rgba(212,175,55,0.2)] pointer-events-none" />

        <div className="relative flex flex-col items-center h-full justify-center">
          <AnimatePresence mode="popLayout">
            {!isActuallySpinning && targetItem ? (
              <motion.div
                key="winner"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className={`text-center px-4 ${label.includes('ID') ? 'text-4xl gold-text font-black tracking-tighter' : label.includes('Name') ? 'text-2xl font-bold tracking-tight text-white' : 'text-5xl font-serif italic text-white'}`}
              >
                {targetItem}
              </motion.div>
            ) : (
              displayItems.map((item, idx) => (
                <motion.div
                  key={`${item}-${idx}`}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: (idx - 2) * 45, opacity: 1 - Math.abs(idx - 2) * 0.3 }}
                  exit={{ y: 200, opacity: 0 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                  className="absolute text-xl font-medium text-amber-100/20 whitespace-nowrap"
                >
                  {item}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function SlotMachine({ attendees, isSpinning, winner }: SlotMachineProps) {
  const allNames = attendees.map(a => a.name);
  const allNumbers = attendees.map(a => a.number);
  const allTables = [...new Set(attendees.map(a => a.table))];

  return (
    <div className="w-full max-w-6xl mx-auto p-12 bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] border border-white/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col gap-12 md:flex-row">
        <Reel label="Employee Number" items={allNumbers} isSpinning={isSpinning} targetItem={winner?.number || null} stopDelay={500} />
        <Reel label="Attendee Name" items={allNames} isSpinning={isSpinning} targetItem={winner?.name || null} stopDelay={1500} />
        <Reel label="Table Assignment" items={allTables} isSpinning={isSpinning} targetItem={winner?.table || null} stopDelay={2500} />
      </div>

      
      {/* Footer Branding */}
      <div className="flex items-center justify-center mt-12 space-x-8 opacity-40">
        <div className="h-px bg-gradient-to-r from-transparent to-amber-500 flex-1" />
        <span className="px-4 py-2 border border-amber-500/30 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500">
          Official Corporate Gala System
        </span>
        <div className="h-px bg-gradient-to-l from-transparent to-amber-500 flex-1" />
      </div>
    </div>
  );
}
