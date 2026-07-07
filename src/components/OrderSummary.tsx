'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Flame, Gift, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderSummary: React.FC = () => {
  const { selectedGames, pricing, deselectGame, currentStep } = useApp();

  if (selectedGames.length === 0) {
    return (
      <div className="glass-panel border-cyber-purple/20 rounded-2xl p-6 text-center select-none">
        <ShoppingCart className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold font-orbitron text-gray-300 mb-2">Lorem ipsum</h3>
        <p className="text-xs text-gray-500 leading-relaxed font-sans">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel border-cyber-purple/20 rounded-2xl p-5 select-none sticky top-28 shadow-xl">
      <div className="border-b border-white/5 pb-4 mb-4">
        <h3 className="text-lg font-bold font-orbitron text-white tracking-wider uppercase flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-cyber-cyan" />
          Lorem Ipsum
        </h3>
      </div>

      {/* Selected Games Mini List */}
      <div className="max-h-48 overflow-y-auto mb-5 pr-1 space-y-2.5 custom-scrollbar">
        <AnimatePresence initial={false}>
          {selectedGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/45 border border-white/5 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${game.bannerGradient}`} />
                    <span className="text-xs font-semibold text-gray-300 font-orbitron truncate">
                      {game.name}
                    </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-cyber-cyan font-rajdhani">
                  ₹{game.fee}
                </span>
                {currentStep !== 'payment' && currentStep !== 'success' && (
                  <button
                    onClick={() => deselectGame(game.id)}
                    className="text-gray-500 hover:text-rose-400 p-0.5 rounded transition-colors duration-150 cursor-pointer"
                    aria-label={`Remove ${game.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pricing Rules */}
      <div className="border-t border-white/5 pt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-400 font-sans">
          <span>Lorem ipsum</span>
          <span className="font-semibold text-gray-200">₹{pricing.original}</span>
        </div>

        {pricing.discount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex justify-between text-emerald-400 font-sans items-center"
          >
              <span className="flex items-center gap-1">
              <Gift className="w-3.5 h-3.5" />
              Lorem ipsum
            </span>
            <span className="font-bold">-₹{pricing.discount}</span>
          </motion.div>
        )}

        <div className="border-t border-white/5 pt-3 flex justify-between items-end">
          <span className="font-bold text-gray-300 font-orbitron uppercase text-xs">Lorem ipsum</span>
          <div className="text-right">
            <span className="text-xl font-black font-rajdhani text-cyber-cyan glow-text-cyan">
              ₹{pricing.final}
            </span>
          </div>
        </div>
      </div>

      {/* Savings Toast banner */}
      {pricing.savings > 0 && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs font-bold font-orbitron uppercase tracking-wider flex items-center justify-center gap-1.5 animate-pulse"
        >
          <Flame className="w-4 h-4 text-emerald-400" />
          Lorem ipsum ₹{pricing.savings}!
        </motion.div>
      )}

      {/* Trust Badges */}
      <div className="mt-5 border-t border-white/5 pt-4 space-y-2.5">
        <div className="flex items-center gap-2.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-orbitron">
          <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
          <span>LOREM IPSUM</span>
        </div>
        <div className="text-[10px] text-gray-500 font-sans leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
    </div>
  );
};
