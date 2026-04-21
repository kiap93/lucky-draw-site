import React from 'react';
import { motion } from 'motion/react';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      {/* Base Radial Glow */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)`
        }} 
      />
      
      {/* Spotlight Effect from theme */}
      <div 
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[1200px] opacity-100"
        style={{
          background: `radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`
        }}
      />

      {/* Floating Sparkles (Preserved functionality but toned down for the mood) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-[2px] h-[2px] bg-[#d4af37] rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: Math.random() }}
          animate={{ 
            opacity: [0.1, 0.5, 0.1],
            y: [-10, -50],
          }}
          transition={{ 
            duration: 8 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* LED Decorative Dots from theme */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 opacity-30">
        <div className="led-dot" />
        <div className="led-dot" />
        <div className="led-dot" />
      </div>
      <div className="absolute top-8 right-8 flex flex-col gap-2 opacity-30">
        <div className="led-dot" />
        <div className="led-dot" />
        <div className="led-dot" />
      </div>

      {/* Subtle stage beams */}
      <div className="absolute inset-x-0 bottom-0 flex justify-around opacity-5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px h-[100vh] bg-gradient-to-t from-[#d4af37] to-transparent blur-xl"
            initial={{ rotate: -15 + i * 10 }}
            animate={{ 
              rotate: [-15 + i * 10 - 2, -15 + i * 10 + 2],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          />
        ))}
      </div>
    </div>
  );
}

