'use client';

import React from 'react';
import { Game, useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { 
  Sword, Hammer, Smile, Crosshair, 
  Crown, Layers, Bomb, Check, Plus 
} from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const getGameIcon = (id: string, className: string) => {
  switch (id) {
    case 'bgmi':
      return <Sword className={className} />;
    case 'minecraft':
      return <Hammer className={className} />;
    case 'fallguys':
      return <Smile className={className} />;
    case 'deadshot':
      return <Crosshair className={className} />;
    case 'chess':
      return <Crown className={className} />;
    case 'uno':
      return <Layers className={className} />;
    case 'minimilitia':
      return <Bomb className={className} />;
    default:
      return <Sword className={className} />;
  }
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { selectedGames, selectGame, deselectGame } = useApp();
  const isSelected = selectedGames.some((g) => g.id === game.id);

  const handleToggle = () => {
    if (isSelected) {
      deselectGame(game.id);
    } else {
      selectGame(game);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative w-full rounded-2xl overflow-hidden glass-panel flex flex-col group select-none transition-all duration-300 ${
        isSelected 
          ? 'border-cyber-cyan glow-border-cyan' 
          : 'border-cyber-purple/30 hover:border-cyber-cyan/40'
      }`}
    >
      {/* Banner Area */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${game.bannerGradient} flex items-center justify-center p-6 border-b border-white/5 overflow-hidden`}>
        {/* Esports background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        {/* Animated ambient light bubble */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl opacity-60 group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-60 group-hover:scale-125 transition-transform duration-700" />

        {/* Large back icon for graphic flavor */}
        <div className="absolute opacity-10 scale-[3.2] transform rotate-12 transition-transform duration-500 group-hover:rotate-45 pointer-events-none text-white">
          {getGameIcon(game.id, 'w-16 h-16')}
        </div>

        {/* Real centered esports badge */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={`p-4 rounded-full bg-black/40 border border-white/10 ${game.iconColor} shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300`}>
            {getGameIcon(game.id, 'w-10 h-10')}
          </div>
          <span className="mt-3 px-3 py-0.5 rounded-full bg-black/50 text-[10px] uppercase tracking-wider font-orbitron font-semibold text-gray-300 border border-white/5">
            Lorem ipsum
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold font-orbitron text-white tracking-wide group-hover:text-cyber-cyan transition-colors duration-300">
              {game.name}
            </h3>
            <span className="text-lg font-black font-rajdhani text-cyber-cyan glow-text-cyan">
              ₹{game.fee}
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
            {game.description}
          </p>
        </div>

        {/* Card Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`w-full py-2.5 px-4 rounded-xl font-bold font-orbitron text-xs uppercase tracking-wider flex items-center justify-center gap-2 border cursor-pointer transition-all duration-300 ${
            isSelected
              ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan glow-border-cyan hover:bg-cyber-cyan/20'
              : 'bg-gradient-to-r from-cyber-purple/80 to-cyber-pink/80 hover:from-cyber-purple hover:to-cyber-pink border-transparent text-white shadow-lg shadow-purple-950/20'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 stroke-[3px]" />
              Lorem
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ipsum
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
