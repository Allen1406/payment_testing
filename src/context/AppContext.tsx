'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Game {
  id: string;
  name: string;
  bannerGradient: string;
  iconColor: string;
  fee: number;
  description: string;
  genre: string;
}

export interface ParticipantDetails {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  orderId: string;
}

export type CheckoutStep = 'landing' | 'selection' | 'cart' | 'details' | 'payment' | 'success';

interface Pricing {
  original: number;
  discount: number;
  final: number;
  savings: number;
}

interface AppContextType {
  games: Game[];
  selectedGames: Game[];
  currentStep: CheckoutStep;
  details: ParticipantDetails;
  timer: number;
  timerActive: boolean;
  utr: string;
  screenshot: string | null;
  termsAccepted: boolean;
  paymentStatus: 'pending' | 'success' | 'expired';
  pricing: Pricing;
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  
  selectGame: (game: Game) => void;
  deselectGame: (gameId: string) => void;
  clearCart: () => void;
  setStep: (step: CheckoutStep) => void;
  updateDetails: (details: Omit<ParticipantDetails, 'orderId'>) => string; // returns generated order ID
  setTimerActive: (active: boolean) => void;
  resetTimer: () => void;
  setUtr: (utr: string) => void;
  setScreenshot: (url: string | null) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setPaymentStatus: (status: 'pending' | 'success' | 'expired') => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resetPortal: () => void;
}

const GAMES_DATA: Game[] = [
  {
    id: 'bgmi',
    name: 'BGMI',
    bannerGradient: 'from-amber-600 to-red-900',
    iconColor: 'text-amber-400',
    fee: 60,
    genre: 'Battle Royale',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    bannerGradient: 'from-emerald-600 to-teal-900',
    iconColor: 'text-emerald-400',
    fee: 60,
    genre: 'Sandbox / Creative',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'fallguys',
    name: 'Fall Guys',
    bannerGradient: 'from-pink-600 to-purple-900',
    iconColor: 'text-pink-400',
    fee: 60,
    genre: 'Arcade / Party',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'deadshot',
    name: 'Deadshot.io',
    bannerGradient: 'from-rose-600 to-indigo-950',
    iconColor: 'text-rose-400',
    fee: 60,
    genre: 'First-Person Shooter',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'chess',
    name: 'Chess',
    bannerGradient: 'from-cyan-600 to-slate-900',
    iconColor: 'text-cyan-400',
    fee: 60,
    genre: 'Strategy / Mind',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'uno',
    name: 'UNO',
    bannerGradient: 'from-red-600 to-orange-950',
    iconColor: 'text-red-500',
    fee: 60,
    genre: 'Card Game',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 'minimilitia',
    name: 'Mini Militia',
    bannerGradient: 'from-lime-600 to-emerald-950',
    iconColor: 'text-lime-400',
    fee: 60,
    genre: '2D Shooter',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
];

const INITIAL_DETAILS: ParticipantDetails = {
  name: '',
  email: '',
  phone: '',
  college: '',
  department: '',
  year: '',
  orderId: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('landing');
  const [details, setDetails] = useState<ParticipantDetails>(INITIAL_DETAILS);
  const [timer, setTimer] = useState<number>(15 * 60); // 15 mins
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [utr, setUtr] = useState<string>('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'expired'>('pending');
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Pricing calculation
  const [pricing, setPricing] = useState<Pricing>({ original: 0, discount: 0, final: 0, savings: 0 });

  useEffect(() => {
    const count = selectedGames.length;
    const original = count * 60;
    let final = original;
    
    if (count === 4) final = 200;
    else if (count === 5) final = 250;
    else if (count === 6) final = 300;
    else if (count === 7) final = 350;

    const discount = original - final;
    setPricing({
      original,
      discount,
      final,
      savings: discount
    });
  }, [selectedGames]);

  // Timer interval handling
  useEffect(() => {
    if (timerActive && timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            setPaymentStatus('expired');
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerActive, timer]);

  const selectGame = (game: Game) => {
    if (selectedGames.find((g) => g.id === game.id)) return;
    setSelectedGames((prev) => [...prev, game]);
    addToast(`${game.name} — Lorem ipsum dolor sit amet.`, 'success');
  };

  const deselectGame = (gameId: string) => {
    const game = selectedGames.find((g) => g.id === gameId);
    setSelectedGames((prev) => prev.filter((g) => g.id !== gameId));
    if (game) {
      addToast(`${game.name} — Lorem ipsum.`, 'info');
    }
  };

  const clearCart = () => {
    setSelectedGames([]);
    addToast('Lorem ipsum dolor sit amet', 'info');
  };

  const setStep = (step: CheckoutStep) => {
    setCurrentStep(step);
    
    // Automatically trigger timer logic when reaching the payment screen
    if (step === 'payment') {
      resetTimer();
      setTimerActive(true);
      setPaymentStatus('pending');
    } else if (step !== 'success') {
      setTimerActive(false);
    }
  };

  const updateDetails = (formData: Omit<ParticipantDetails, 'orderId'>) => {
    // Generate a unique random esports UTR-like Order ID
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString();
    const orderId = `ARCX-2026-${randomHex}`;
    
    setDetails({
      ...formData,
      orderId
    });
    return orderId;
  };

  const resetTimer = () => {
    setTimer(15 * 60);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetPortal = () => {
    setSelectedGames([]);
    setDetails(INITIAL_DETAILS);
    setTimer(15 * 60);
    setTimerActive(false);
    setUtr('');
    setScreenshot(null);
    setTermsAccepted(false);
    setPaymentStatus('pending');
    setCurrentStep('landing');
    addToast('Lorem ipsum dolor sit amet', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        games: GAMES_DATA,
        selectedGames,
        currentStep,
        details,
        timer,
        timerActive,
        utr,
        screenshot,
        termsAccepted,
        paymentStatus,
        pricing,
        toasts,
        selectGame,
        deselectGame,
        clearCart,
        setStep,
        updateDetails,
        setTimerActive,
        resetTimer,
        setUtr,
        setScreenshot,
        setTermsAccepted,
        setPaymentStatus,
        addToast,
        removeToast,
        resetPortal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
