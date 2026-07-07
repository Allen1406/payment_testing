'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { GameCard } from '@/components/GameCard';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight, ShoppingCart } from 'lucide-react';

export const GameSelectionView: React.FC = () => {
  const { games, selectedGames, pricing, setStep } = useApp();

  const count = selectedGames.length;

  return (
    <div className="space-y-8 select-none py-4">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold font-orbitron tracking-wider text-white uppercase"
        >
          Select Your Arena
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs md:text-sm text-gray-400 font-sans max-w-xl mx-auto"
        >
          Build your ultimate tournament bundle. Choose more games to unlock massive discounts automatically at checkout.
        </motion.p>
      </div>

      {/* Game Cards Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </motion.div>

      {/* Spacing for bottom floating bar */}
      <div className="h-28" />

      {/* Sticky Bottom Summary Bar */}
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#030014]/90 border-t border-cyber-cyan/30 backdrop-blur-xl glow-border-cyan flex justify-center"
        >
          <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Summary Details */}
            <div className="flex items-center gap-4">
              <div className="relative p-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl text-cyber-cyan">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyber-purple text-[10px] font-black font-orbitron text-white flex items-center justify-center border border-cyber-bg shadow-md">
                  {count}
                </span>
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold font-orbitron text-gray-500 tracking-wider">
                  Selected Bundle
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black font-rajdhani text-white">
                    ₹{pricing.final}
                  </span>
                  {pricing.discount > 0 && (
                    <span className="text-xs text-gray-500 font-sans line-through">
                      ₹{pricing.original}
                    </span>
                  )}
                  {pricing.savings > 0 && (
                    <span className="text-xs text-emerald-400 font-bold font-orbitron uppercase tracking-wide">
                      (Saved ₹{pricing.savings})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setStep('cart')}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan hover:to-cyber-purple text-white rounded-xl font-bold font-orbitron uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-cyan-400/30 cursor-pointer shadow-lg shadow-cyan-950/20 transition-all duration-300"
              >
                Continue to Cart
                <ArrowRight className="w-4.5 h-4.5 animate-pulse" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
