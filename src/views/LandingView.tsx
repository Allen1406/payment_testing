'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Zap, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const LandingView: React.FC = () => {
  const { setStep } = useApp();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-10 px-4 select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyber-purple-glow rounded-full blur-[140px] opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-cyber-cyan-glow rounded-full blur-[140px] opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        
        {/* Left: Text & Pitch */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-xs font-bold font-orbitron uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-cyber-purple" />
              Lorem Ipsum 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-orbitron tracking-tight leading-tight uppercase">
            Lorem Ipsum <br />
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent glow-text-cyan">
                Lorem Ipsum
              </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
          </p>

          {/* Quick tournament features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold font-orbitron uppercase tracking-wider text-gray-200">Lorem Ipsum</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Lorem ipsum, dolor, sit, amet & more</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-cyber-purple shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold font-orbitron uppercase tracking-wider text-gray-200">Lorem 19-25, 2026</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6,182,212,0.6)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('selection')}
              className="px-8 py-4 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink hover:bg-gradient-to-l text-white rounded-xl font-bold font-orbitron uppercase tracking-widest text-sm flex items-center gap-3 border border-cyan-400/40 shadow-xl cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5" />
              Lorem Ipsum
              <ArrowRight className="w-4 h-4 text-white animate-pulse" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Premium Graphic Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 relative w-full aspect-video lg:aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-panel border-cyber-cyan/30 p-2 shadow-2xl"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent z-10 opacity-70" />
            
            
            {/* Embedded glowing tag */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase font-bold font-orbitron text-cyber-cyan tracking-widest">Prize Pool</span>
                <div className="text-3xl font-black font-rajdhani text-white glow-text-purple tracking-wider leading-none">
                  ₹3,500+
                </div>
              </div>
              <span className="text-[9px] uppercase font-bold font-orbitron px-2.5 py-1 rounded bg-black/60 text-gray-300 border border-white/10 backdrop-blur-sm">
                ENTRY FEE: ₹60/GAME
              </span>
            </div>

            {/* Sci-fi scanning line overlay */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none z-10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
