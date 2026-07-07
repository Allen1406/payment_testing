'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartView: React.FC = () => {
  const { selectedGames, deselectGame, pricing, setStep } = useApp();

  const isEmpty = selectedGames.length === 0;

  return (
    <div className="select-none py-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold font-orbitron tracking-wider text-white uppercase flex items-center justify-center gap-2">
          <ShoppingBag className="w-7 h-7 text-cyber-cyan" />
          Lorem Ipsum
        </h2>
        <p className="text-xs text-gray-400 font-sans mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center glass-panel border-cyber-purple/20 rounded-2xl p-8 space-y-5"
        >
          <div className="w-16 h-16 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center mx-auto text-cyber-purple">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-orbitron text-gray-200">Lorem ipsum</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <button
            onClick={() => setStep('selection')}
            className="w-full py-3 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded-xl font-bold font-orbitron text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer"
          >
            Lorem Ipsum
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel border-cyber-purple/15 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-white/5 bg-white/2 flex justify-between items-center text-xs font-bold font-orbitron uppercase text-gray-400 tracking-wider">
                <span>Lorem ipsum</span>
                <span>Lorem ipsum</span>
              </div>

              <div className="divide-y divide-white/5">
                <AnimatePresence initial={false}>
                  {selectedGames.map((game) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 py-4 flex items-center justify-between gap-4 group hover:bg-white/2 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${game.bannerGradient} shrink-0`} />
                        <div className="min-w-0 text-left">
                          <h4 className="font-bold font-orbitron text-sm text-white truncate">
                            {game.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold font-orbitron">
                            Lorem ipsum
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-black font-rajdhani text-lg text-cyber-cyan glow-text-cyan">
                          ₹{game.fee}
                        </span>
                        <button
                          onClick={() => deselectGame(game.id)}
                          className="text-gray-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                          title={`Remove ${game.name}`}
                          aria-label={`Remove ${game.name}`}
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Back action */}
            <button
              onClick={() => setStep('selection')}
              className="flex items-center gap-2 text-xs font-bold font-orbitron uppercase tracking-wider text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer pl-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>

          {/* Right Column: Checkout Breakdown */}
          <div className="lg:col-span-5 space-y-6">
                <div className="glass-panel border-cyber-purple/20 rounded-2xl p-6 shadow-xl space-y-5 text-left">
              <h3 className="text-base font-bold font-orbitron text-white tracking-widest uppercase border-b border-white/5 pb-3">
                Lorem Ipsum
              </h3>

              {/* Price Details */}
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between text-gray-400 font-sans">
                  <span>Lorem Ipsum ({selectedGames.length})</span>
                  <span className="font-semibold text-gray-200">₹{pricing.original}</span>
                </div>

                {pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-sans font-bold">
                    <span>Lorem ipsum</span>
                    <span>-₹{pricing.discount}</span>
                  </div>
                )}

                <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                  <span className="font-bold text-gray-300 font-orbitron uppercase text-xs">Lorem ipsum</span>
                  <span className="text-2xl font-black font-rajdhani text-cyber-cyan glow-text-cyan">
                    ₹{pricing.final}
                  </span>
                </div>
              </div>

              {/* Bundle discount pitch */}
              {selectedGames.length < 7 && (
                <div className="p-3 bg-cyber-purple/10 border border-cyber-purple/20 rounded-xl text-[11px] text-gray-300 leading-relaxed font-sans">
                  💡 Lorem ipsum dolor sit amet, <span className="font-bold text-cyber-cyan">₹350</span> lorem ipsum.
                </div>
              )}

              {/* Savings Banner */}
              {pricing.savings > 0 && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs font-bold font-orbitron uppercase tracking-wider rounded-xl">
                  🔥 Lorem ipsum ₹{pricing.savings} lorem ipsum!
                </div>
              )}

              {/* Check out action */}
              <button
                onClick={() => setStep('details')}
                className="w-full py-3.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan hover:to-cyber-purple text-white rounded-xl font-bold font-orbitron text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-cyan-400/20 cursor-pointer shadow-lg shadow-cyan-950/20 hover:shadow-cyan-950/40 hover:scale-[1.01] transition-all duration-300"
              >
                Lorem Ipsum
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
