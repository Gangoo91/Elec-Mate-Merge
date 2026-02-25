import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ScanBarcode, Loader2, Camera, RotateCcw, CheckCircle } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { cn } from '@/lib/utils';

interface EquipmentBarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: { text: string; format: string }) => void;
  title?: string;
  description?: string;
}

const SUPPORTED_FORMATS = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.CODE_93,
  Html5QrcodeSupportedFormats.ITF,
  Html5QrcodeSupportedFormats.DATA_MATRIX,
];

export function EquipmentBarcodeScanner({
  open,
  onClose,
  onScan,
  title = 'Scan Equipment',
  description = 'Point the camera at a barcode or QR code',
}: EquipmentBarcodeScannerProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const lastScannedRef = useRef<string | null>(null);
  const processedRef = useRef(false);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  const stopScanner = useCallback(async () => {
    hasStartedRef.current = false;
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = null;
    }
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === 2) {
          await scannerRef.current.stop();
        }
      } catch {
        // Scanner may already be stopped
      }
      try {
        scannerRef.current.clear();
      } catch {
        // Ignore clear errors
      }
      scannerRef.current = null;
    }
    // Clean up manually created DOM element
    const el = document.getElementById('equipment-barcode-reader');
    if (el) el.remove();
  }, []);

  const startScanner = useCallback(async () => {
    if (hasStartedRef.current || !containerRef.current) return;
    hasStartedRef.current = true;
    processedRef.current = false;
    lastScannedRef.current = null;
    setIsStarting(true);
    setError(null);
    setScanSuccess(null);

    try {
      // Clean up any previous instance
      await stopScanner();
      hasStartedRef.current = true;

      const scannerId = 'equipment-barcode-reader';

      // Create a fresh container element
      const readerEl = document.createElement('div');
      readerEl.id = scannerId;
      containerRef.current.appendChild(readerEl);

      const scanner = new Html5Qrcode(scannerId, {
        formatsToSupport: SUPPORTED_FORMATS,
        verbose: false,
      });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
          disableFlip: false,
        },
        (decodedText, decodedResult) => {
          // Guard: empty string
          if (!decodedText || !decodedText.trim()) return;

          // Guard: already processed a scan this session
          if (processedRef.current) return;

          // Guard: duplicate rapid fire of the same code
          if (decodedText === lastScannedRef.current) return;
          lastScannedRef.current = decodedText;
          processedRef.current = true;

          // Haptic feedback
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }

          // Show success state briefly before closing
          setScanSuccess(decodedText);
          const format = decodedResult.result.format?.formatName || 'UNKNOWN';

          scanTimeoutRef.current = setTimeout(() => {
            onScanRef.current({ text: decodedText, format });
          }, 400);
        },
        () => {
          // Scan failure — ignore (continuous scanning)
        }
      );

      setIsStarting(false);
    } catch (err) {
      hasStartedRef.current = false;
      setIsStarting(false);
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('NotAllowedError') || message.includes('Permission')) {
        setError('Camera access denied. Please allow camera permissions in your browser settings.');
      } else if (message.includes('NotFoundError')) {
        setError('No camera found on this device.');
      } else {
        setError('Could not start camera. Please try again.');
      }
    }
  }, [stopScanner]);

  // Start/stop scanner when opened/closed
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => startScanner(), 300);
      return () => clearTimeout(timer);
    } else {
      stopScanner();
      setScanSuccess(null);
      setError(null);
    }
  }, [open, startScanner, stopScanner]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  const handleRetry = () => {
    setError(null);
    hasStartedRef.current = false;
    startScanner();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between p-3 safe-area-top">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white min-h-[44px] touch-manipulation"
            >
              <X className="h-5 w-5" />
              <span className="text-sm font-medium">Close</span>
            </button>
            <div className="text-center">
              <h2 className="text-sm font-semibold text-white">{title}</h2>
            </div>
            <div className="w-16" />
          </div>
        </div>

        {/* Camera View */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* Scanner container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[320px] aspect-square overflow-hidden rounded-2xl"
          >
            {/* Scanning overlay frame */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Corner brackets */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <path
                  d="M 40 10 L 10 10 L 10 40"
                  fill="none"
                  stroke={scanSuccess ? '#34D399' : '#FBBF24'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 280 10 L 310 10 L 310 40"
                  fill="none"
                  stroke={scanSuccess ? '#34D399' : '#FBBF24'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 280 L 10 310 L 40 310"
                  fill="none"
                  stroke={scanSuccess ? '#34D399' : '#FBBF24'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 310 280 L 310 310 L 280 310"
                  fill="none"
                  stroke={scanSuccess ? '#34D399' : '#FBBF24'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* Animated scan line — hidden on success */}
              {!scanSuccess && (
                <motion.div
                  className="absolute left-[10px] right-[10px] h-[2px] bg-elec-yellow/60"
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Success overlay */}
              {scanSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <div className="p-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400">
                    <CheckCircle className="h-12 w-12 text-emerald-400" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Status text */}
          <div className="mt-6 text-center px-6">
            {scanSuccess ? (
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Scanned</p>
                <p className="text-xs text-white">{scanSuccess}</p>
              </div>
            ) : isStarting ? (
              <div className="flex items-center gap-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                <p className="text-sm text-white">Starting camera...</p>
              </div>
            ) : error ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-center">
                  <Camera className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-white">{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 mx-auto px-4 h-11 bg-elec-yellow text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center">
                  <ScanBarcode className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm text-white">{description}</p>
                </div>
                <p className="text-xs text-white">Supports barcodes, QR codes, and data matrix</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
