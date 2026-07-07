'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, ChevronRight, Home, UserPlus, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const SuccessView: React.FC = () => {
  const { details, selectedGames, pricing, resetPortal, setStep } = useApp();

  // Run Confetti blast on mount
  useEffect(() => {
    // Fire a big burst immediately
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#06b6d4', '#ec4899', '#10b981']
    });

    // Fire smaller bursts from left/right sides
    const end = Date.now() + 2 * 1000;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a855f7', '#06b6d4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(frame);
    }, 300);
  }, []);

  const handleReturnHome = () => {
    resetPortal();
  };

  const handleRegisterAnother = () => {
    resetPortal();
    setTimeout(() => {
      setStep('selection');
    }, 100);
  };

  return (
    <div className="select-none py-6 text-center max-w-xl mx-auto space-y-6">
      
      {/* Animated Success Checkmark Ring */}
      <div className="relative flex items-center justify-center h-28">
        {/* Pulsing ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-20 h-20 rounded-full border-2 border-emerald-400 pointer-events-none"
        />
        
        {/* Rotating dash ring */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full border border-dashed border-cyber-cyan/30 pointer-events-none"
        />

        {/* Green Core Check Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5px]" />
        </motion.div>
      </div>

      {/* Main Headlines */}
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-black font-orbitron text-white uppercase tracking-wide leading-snug"
        >
          Lorem ipsum dolor sit amet
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-gray-400 font-sans max-w-sm mx-auto"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </motion.p>
      </div>

      {/* Order Details Receipt Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel border-cyber-purple/20 rounded-2xl p-6 text-left space-y-4 shadow-2xl relative overflow-hidden"
      >
        {/* Scanning grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="flex justify-between items-center pb-3 border-b border-white/5">
          <span className="text-[10px] font-bold font-orbitron uppercase text-gray-500 tracking-wider">
            Lorem ipsum
          </span>
          <span className="text-xs font-bold font-orbitron text-cyber-cyan tracking-wider">
            {details.orderId}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">Lorem ipsum</span>
            <span className="font-semibold text-gray-200 font-sans">{details.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">Lorem ipsum</span>
            <span className="font-semibold text-gray-200 font-sans">{details.college}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">Lorem ipsum</span>
            <span className="font-bold text-cyber-purple font-orbitron">
              {selectedGames.map((g) => g.name).join(', ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">Lorem ipsum</span>
            <span className="font-black font-rajdhani text-base text-cyber-cyan glow-text-cyan">
              ₹{pricing.final}
            </span>
          </div>
        </div>

        {/* Verification Alert Badge */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-amber-400">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-[10px] font-bold font-orbitron uppercase tracking-wider">
              Lorem ipsum
            </h4>
            <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 pt-2"
      >
        <button
          onClick={handleReturnHome}
          className="flex-1 py-3 px-4 bg-black/40 hover:bg-black/60 border border-cyber-purple/20 hover:border-cyber-cyan/40 text-gray-300 hover:text-white rounded-xl font-bold font-orbitron text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
        >
          <Home className="w-4.5 h-4.5" />
          Lorem Ipsum
        </button>

        <button
          onClick={handleRegisterAnother}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan hover:to-cyber-purple text-white border border-cyan-400/20 rounded-xl font-bold font-orbitron text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/20 hover:scale-[1.02] transition-transform duration-200"
        >
          <UserPlus className="w-4.5 h-4.5" />
          Lorem Ipsum
        </button>
      </motion.div>
    </div>
  );
};
