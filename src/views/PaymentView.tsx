'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Copy, Check, Clock, ShieldCheck, 
  Smartphone, Upload, Image as ImageIcon, 
  X, AlertTriangle, ChevronRight, Download, Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQAccordion } from '@/components/FAQAccordion';
import { QRZoomModal } from '@/components/QRZoomModal';

export const PaymentView: React.FC = () => {
  const {
    selectedGames,
    details,
    updateDetails,
    pricing,
    timer,
    timerActive,
    setTimerActive,
    resetTimer,
    utr,
    setUtr,
    screenshot,
    setScreenshot,
    termsAccepted,
    setTermsAccepted,
    paymentStatus,
    setPaymentStatus,
    addToast,
    setStep
  } = useApp();

  const [copied, setCopied] = useState<boolean>(false);
  const [isQRZoomOpen, setIsQRZoomOpen] = useState<boolean>(false);

  const receiverName = "Lorem Ipsum";
  const upiId = "0000000000@testbank";
  
  // Format standard UPI URL
  // upi://pay?pa=9054377338@ptsbi&pn=Fernandez%20Allen&am=<TOTAL>&cu=INR&tn=<ORDER_ID>
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${pricing.final}&cu=INR&tn=${encodeURIComponent(details.orderId)}`;

  // Handle Copy UPI
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    addToast("Lorem ipsum dolor sit amet.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // Launch UPI App Deep Link
  const handleUpiAppClick = (appName: string) => {
    addToast("Lorem ipsum dolor sit amet.", "info");
    
    // Attempt to open the deep link
    window.open(upiUrl, '_blank');
    
    setTimeout(() => {
      addToast("Lorem ipsum dolor sit amet.", "info");
    }, 1500);
  };

  // Screenshot Upload Simulator
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast("Lorem ipsum dolor sit amet", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot(reader.result as string);
      addToast("Lorem ipsum dolor sit amet.", "success");
    };
    reader.readAsDataURL(file);
  };

  // Delete Screenshot
  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    addToast("Lorem ipsum dolor sit amet", "info");
  };

  // Format Timer output (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate New Payment (Timer Reset)
  const handleGenerateNewPayment = () => {
    // Re-trigger details creation to generate a brand new Order ID
    updateDetails(details);
    resetTimer();
    setTimerActive(true);
    setPaymentStatus('pending');
    setUtr('');
    setScreenshot(null);
    setTermsAccepted(false);
    addToast("Lorem ipsum dolor sit amet.", "success");
  };

  // Handle Form Submission
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr || utr.length !== 12 || !screenshot || !termsAccepted) return;

    setTimerActive(false);
    setPaymentStatus('success');
    setStep('success');
  };

  // Validate UTR input
  const handleUtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 12) {
      setUtr(value);
    }
  };

  const isFormValid = utr.length === 12 && screenshot !== null && termsAccepted;

  return (
    <div className="select-none py-4 text-left">
      <AnimatePresence>
        {paymentStatus === 'expired' ? (
          /* Session Expired Screen Overlay */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center glass-panel border-rose-500/30 rounded-3xl p-8 space-y-6 my-10"
          >
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-500">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black font-orbitron text-rose-400 uppercase tracking-wide">
                Lorem ipsum dolor sit amet
              </h2>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <button
              onClick={handleGenerateNewPayment}
              className="w-full py-3.5 bg-gradient-to-r from-cyber-purple to-cyber-pink border border-purple-400/20 text-white rounded-xl font-bold font-orbitron text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-purple-950/20 hover:scale-[1.02] transition-transform duration-200"
            >
              Lorem Ipsum
            </button>
          </motion.div>
        ) : (
          /* Checkout Portal View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
            
            {/* Left Column: QR and Wallets */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Dynamic Timer Component */}
              <div className={`glass-panel rounded-2xl p-4 flex items-center justify-between border ${
                timer < 180 
                  ? 'border-rose-500/30 bg-rose-950/20 text-rose-400 glow-border-purple' 
                  : 'border-cyber-cyan/20 bg-white/2 text-gray-300'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${timer < 180 ? 'text-rose-400 animate-spin' : 'text-cyber-cyan'}`} />
                  <span className="text-xs font-bold font-orbitron uppercase tracking-wider">
                    {timer < 180 ? "Lorem ipsum dolor" : "Lorem ipsum"}
                  </span>
                </div>
                <span className="text-xl font-black font-orbitron tracking-widest">
                  {formatTime(timer)}
                </span>
              </div>

              {/* QR Code Container */}
              <div className="glass-panel border-cyber-purple/15 rounded-2xl p-6 flex flex-col items-center gap-5 text-center relative overflow-hidden shadow-xl">
                
                {/* Embedded subtle grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-orbitron text-gray-300 uppercase tracking-widest">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="text-[10px] text-gray-500 font-sans">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                {/* QR Screen wrapper */}
                <div className="relative group p-4 bg-white rounded-2xl border-2 border-cyber-cyan glow-border-cyan flex items-center justify-center cursor-zoom-in" onClick={() => setIsQRZoomOpen(true)}>
                  <QRCodeSVG
                    value={upiUrl}
                    size={170}
                    level="H"
                    includeMargin={false}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-2 text-white">
                    <Maximize2 className="w-5 h-5 text-cyber-cyan" />
                    <span className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-cyber-cyan">Lorem Ipsum</span>
                  </div>
                </div>

                {/* Amount display */}
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold font-orbitron text-gray-500 tracking-wider">Lorem ipsum</span>
                  <div className="text-3xl font-black font-rajdhani text-cyber-cyan glow-text-cyan">
                    ₹{pricing.final}
                  </div>
                </div>

                {/* Accepted by all UPI Apps banner */}
                <div className="w-full border-t border-white/5 pt-4 space-y-3">
                  <span className="text-[9px] uppercase font-bold font-orbitron text-gray-400 tracking-widest block">
                    Lorem ipsum dolor sit amet
                  </span>
                  
                  {/* Wallets grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {['App A', 'App B', 'App C', 'App D'].map((wallet) => (
                      <button
                        key={wallet}
                        onClick={() => handleUpiAppClick(wallet)}
                        className="py-2 px-1 rounded-xl bg-black/40 border border-white/5 text-[10px] font-bold font-orbitron text-gray-300 hover:border-cyber-cyan hover:text-white transition-all duration-200 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                      >
                        <Smartphone className="w-4 h-4 text-cyber-purple group-hover:text-cyber-cyan transition-colors" />
                        <span className="truncate w-full text-center">{wallet}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Order Info Panel */}
              <div className="glass-panel border-cyber-purple/15 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-bold font-orbitron text-white tracking-widest uppercase border-b border-white/5 pb-2.5">
                  Lorem ipsum dolor
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-400 font-sans">Lorem ipsum</span>
                    <span className="font-bold font-orbitron text-cyber-cyan tracking-wider">{details.orderId}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400 font-sans">Lorem ipsum</span>
                    <span className="font-bold text-gray-200 font-sans">{receiverName}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400 font-sans">Lorem ipsum</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-200 font-sans">{upiId}</span>
                      <button
                        onClick={handleCopyUpi}
                        className="text-gray-500 hover:text-cyber-cyan p-1 hover:bg-white/5 rounded transition-all cursor-pointer"
                        title="Copy UPI ID"
                        aria-label="Copy UPI ID"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-cyber-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400 font-sans">Lorem ipsum</span>
                    <span className="font-bold text-gray-200 font-orbitron">
                      {selectedGames.map((g) => g.name).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Form */}
              <form onSubmit={handleSubmitPayment} className="glass-panel border-cyber-purple/15 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-bold font-orbitron text-white tracking-widest uppercase border-b border-white/5 pb-2.5">
                  Lorem ipsum dolor
                </h3>

                {/* UTR Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                    Lorem ipsum dolor
                  </label>
                  <input
                    type="text"
                    value={utr}
                    onChange={handleUtrChange}
                    placeholder="Lorem ipsum dolor sit amet"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-cyber-purple/15 font-mono text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200"
                  />
                  <p className="text-[9px] text-gray-500 font-sans pl-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                {/* Screenshot Upload Box */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                    Lorem ipsum dolor
                  </label>

                  {screenshot ? (
                    /* Thumbnail Preview */
                    <div className="relative w-full h-32 rounded-xl border border-cyber-cyan/35 overflow-hidden group">
                      <img
                        src={screenshot}
                        alt="Lorem ipsum preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="p-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition-colors duration-150 cursor-pointer shadow-md"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Drag & Drop simulated field */
                    <label className="w-full h-32 rounded-xl border border-dashed border-cyber-purple/30 bg-black/35 hover:border-cyber-cyan/50 hover:bg-black/55 transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-7 h-7 text-cyber-purple animate-bounce" />
                      <span className="text-xs text-gray-400 font-semibold font-sans">
                        Lorem ipsum dolor sit amet
                      </span>
                      <span className="text-[9px] text-gray-600 font-sans">
                        JPG up to 5MB
                      </span>
                    </label>
                  )}
                </div>

                {/* Checkbox Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer mt-2 text-left">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 rounded bg-black border-cyber-purple/30 text-cyber-cyan focus:ring-cyber-cyan cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 font-sans leading-normal">
                    Lorem ipsum <span className="font-bold text-cyber-cyan font-rajdhani text-xs">₹{pricing.final}</span> dolor sit amet.
                  </span>
                </label>

                {/* Checkout Submit CTA */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3.5 rounded-xl font-bold font-orbitron text-xs uppercase tracking-widest flex items-center justify-center gap-2 border cursor-pointer transition-all duration-300 ${
                    isFormValid
                      ? 'bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink hover:bg-gradient-to-l border-transparent text-white shadow-lg shadow-cyan-950/20 hover:scale-[1.01]'
                      : 'bg-gray-800/40 border-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Lorem Ipsum
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Accordion Component and trust badges */}
      <FAQAccordion />

      {/* QR ZOOM PORTAL MODAL */}
      <QRZoomModal
        isOpen={isQRZoomOpen}
        onClose={() => setIsQRZoomOpen(false)}
        value={upiUrl}
        amount={pricing.final}
        orderId={details.orderId}
      />
    </div>
  );
};
