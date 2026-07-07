'use client';

import React from 'react';
import { useApp, CheckoutStep } from '@/context/AppContext';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepItem {
  id: CheckoutStep;
  label: string;
}

const STEPS: StepItem[] = [
  { id: 'selection', label: 'Lorem' },
  { id: 'cart', label: 'Ipsum' },
  { id: 'details', label: 'Dolor' },
  { id: 'payment', label: 'Sit' },
  { id: 'success', label: 'Amet' }
];

export const StepProgressBar: React.FC = () => {
  const { currentStep } = useApp();

  if (currentStep === 'landing') return null;

  const currentStepIndex = STEPS.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8 select-none">
      <div className="relative flex justify-between items-center w-full">
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 rounded-full z-0" />

        {/* Animated Progress Filled Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyber-purple to-cyber-cyan -translate-y-1/2 rounded-full z-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
          initial={{ width: '0%' }}
          animate={{
            width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Steps Bubbles */}
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  borderColor: isActive
                    ? '#06b6d4'
                    : isCompleted
                    ? '#a855f7'
                    : 'rgb(31, 41, 55)',
                  backgroundColor: isActive
                    ? 'rgba(6, 182, 212, 0.15)'
                    : isCompleted
                    ? '#a855f7'
                    : '#030014',
                  boxShadow: isActive
                    ? '0 0 15px rgba(6, 182, 212, 0.6)'
                    : isCompleted
                    ? '0 0 15px rgba(168, 85, 247, 0.4)'
                    : 'none'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center font-bold text-sm md:text-base cursor-default`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white stroke-[3px]" />
                ) : (
                  <span
                    className={`font-orbitron transition-colors duration-300 ${
                      isActive ? 'text-cyber-cyan' : 'text-gray-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
              </motion.div>

              {/* Step Labels */}
              <span
                className={`absolute top-11 md:top-14 text-[10px] md:text-xs font-semibold tracking-wider font-orbitron uppercase text-center whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? 'text-cyber-cyan glow-text-cyan'
                    : isCompleted
                    ? 'text-cyber-purple'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
