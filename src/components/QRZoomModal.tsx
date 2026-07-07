'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QRZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  amount: number;
  orderId: string;
}

export const QRZoomModal: React.FC<QRZoomModalProps> = ({
  isOpen,
  onClose,
  value,
  amount,
  orderId
}) => {
  const downloadQR = () => {
    const svgElement = document.getElementById('zoomed-qr-svg');
    if (!svgElement) return;

    // Convert SVG to XML String
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = URL.createObjectURL(svgBlob);
    
    // Trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = blobURL;
    downloadLink.download = `arcadex-pay-qr-${orderId}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="relative w-full max-w-sm glass-panel border-cyber-cyan/30 rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col items-center gap-4 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors duration-150 cursor-pointer"
              aria-label="Close zoom modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Description */}
            <div className="text-center mt-2">
              <h4 className="text-base font-bold font-orbitron text-white tracking-wider uppercase">
                Lorem Ipsum
              </h4>
              <p className="text-[10px] text-cyber-cyan font-semibold tracking-wider font-orbitron uppercase mt-1">
                {orderId}
              </p>
            </div>

            {/* QR SVG Frame */}
            <div className="p-4 bg-white rounded-2xl border-2 border-cyber-cyan glow-border-cyan flex items-center justify-center">
              <QRCodeSVG
                id="zoomed-qr-svg"
                value={value}
                size={220}
                level="Q"
                includeMargin={false}
              />
            </div>

            {/* Info badge */}
            <div className="text-center font-rajdhani text-2xl font-black text-cyber-cyan tracking-wider">
              ₹{amount}
            </div>

            {/* Actions */}
            <div className="w-full flex gap-3 mt-1">
              <button
                onClick={downloadQR}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold font-orbitron text-xs uppercase tracking-wider bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Lorem Ipsum
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-sans mt-1">
              <Shield className="w-3.5 h-3.5 text-cyber-purple" />
              <span>Lorem ipsum dolor sit amet</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
