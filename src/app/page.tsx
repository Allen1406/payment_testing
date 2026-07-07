'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StepProgressBar } from '@/components/StepProgressBar';
import { LandingView } from '@/views/LandingView';
import { GameSelectionView } from '@/views/GameSelectionView';
import { CartView } from '@/views/CartView';
import { DetailsView } from '@/views/DetailsView';
import { PaymentView } from '@/views/PaymentView';
import { SuccessView } from '@/views/SuccessView';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, ShoppingCart, RefreshCw, LogIn } from 'lucide-react';

export default function Home() {
  const { currentStep, selectedGames, pricing, setStep, resetPortal } = useApp();

  const cartCount = selectedGames.length;

  const renderActiveView = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingView />;
      case 'selection':
        return <GameSelectionView />;
      case 'cart':
        return <CartView />;
      case 'details':
        return <DetailsView />;
      case 'payment':
        return <PaymentView />;
      case 'success':
        return <SuccessView />;
      default:
        return <LandingView />;
    }
  };

  const handleCartClick = () => {
    if (cartCount > 0 && currentStep !== 'success' && currentStep !== 'payment') {
      setStep('cart');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen cyber-grid relative">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#030014]/80 backdrop-blur-xl border-b border-cyber-purple/15 py-4 px-4 sm:px-6 md:px-8 select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={resetPortal}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple group-hover:text-cyber-cyan group-hover:border-cyber-cyan/35 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="font-orbitron font-extrabold text-lg sm:text-xl uppercase tracking-widest bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:from-cyber-cyan group-hover:to-cyber-purple transition-all duration-300">
              Arcade<span className="text-cyber-cyan">X</span>
            </span>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Reset State Action (removed for testing) */}

            {/* Live Cart Badge */}
            {currentStep !== 'landing' && (
              <div 
                onClick={handleCartClick}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 select-none ${
                  cartCount > 0 && currentStep !== 'success' && currentStep !== 'payment'
                    ? 'border-cyber-cyan/35 bg-cyber-cyan/5 text-cyber-cyan glow-border-cyan cursor-pointer hover:bg-cyber-cyan/10'
                    : 'border-white/5 bg-white/2 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <AnimatePresence mode="popLayout">
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      className="text-[10px] font-black font-orbitron bg-cyber-purple text-white px-2 py-0.5 rounded-full shrink-0 border border-cyber-bg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                {cartCount > 0 && (
                  <span className="hidden sm:inline text-xs font-black font-rajdhani">
                    ₹{pricing.final}
                  </span>
                )}
              </div>
            )}

            {/* Log in CTA (Mockup visual element for completeness) */}
            {currentStep === 'landing' && (
              <button
                onClick={() => setStep('selection')}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyber-purple/30 to-cyber-pink/30 hover:from-cyber-purple hover:to-cyber-pink border border-cyber-purple/20 text-white font-bold font-orbitron text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                <LogIn className="w-3.5 h-3.5" />
                Lorem Ipsum
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 z-10 relative">
        {/* Animated Progress Indicator */}
        <StepProgressBar />

        {/* Dynamic Step View transitions */}
        <div className="flex-1 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] text-gray-600 font-sans tracking-wide select-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </footer>
    </div>
  );
}
