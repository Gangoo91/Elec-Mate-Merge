import { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Printer, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EquipmentQRCodeProps {
  equipmentId: string;
  equipmentName: string;
  serialNumber?: string | null;
  currentQrValue?: string | null;
  onSaveQrCode?: (id: string, qrValue: string) => void;
  size?: number;
}

function buildQRValue(equipmentId: string): string {
  return `https://elecmate.app/e/${equipmentId}`;
}

export function EquipmentQRCode({
  equipmentId,
  equipmentName,
  serialNumber,
  currentQrValue,
  onSaveQrCode,
  size = 48,
}: EquipmentQRCodeProps) {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const qrValue = buildQRValue(equipmentId);

  // Auto-save QR value to DB if not already stored (once only)
  const hasSavedRef = useRef(false);
  useEffect(() => {
    if (onSaveQrCode && !currentQrValue && !hasSavedRef.current) {
      hasSavedRef.current = true;
      onSaveQrCode(equipmentId, qrValue);
    }
  }, [equipmentId, qrValue, currentQrValue, onSaveQrCode]);

  /** Convert the QR SVG to a PNG blob */
  const getQrBlob = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!qrRef.current) return resolve(null);
      const svgEl = qrRef.current.querySelector('svg');
      if (!svgEl) return resolve(null);

      const svgData = new XMLSerializer().serializeToString(svgEl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.onload = () => {
        canvas.width = 512;
        canvas.height = 512;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(img, 0, 0, 512, 512);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => resolve(blob), 'image/png');
      };
      img.src = url;
    });
  }, []);

  const fileName = `equipment-qr-${serialNumber || equipmentId.slice(0, 8)}.png`;

  const handleSave = useCallback(async () => {
    const blob = await getQrBlob();
    if (!blob) return;

    const pngUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = pngUrl;
    link.click();
    URL.revokeObjectURL(pngUrl);
    toast.success('QR image saved');
  }, [getQrBlob, fileName]);

  const handleShare = useCallback(async () => {
    const blob = await getQrBlob();
    if (!blob) return;

    const file = new File([blob], fileName, { type: 'image/png' });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: `QR Label — ${equipmentName}`,
          text: `QR code label for ${equipmentName}${serialNumber ? ` (S/N: ${serialNumber})` : ''}. Print and stick on equipment.`,
          files: [file],
        });
      } catch (err) {
        // User cancelled share — not an error
        if (err instanceof Error && err.name !== 'AbortError') {
          toast.error('Could not share. Try saving instead.');
        }
      }
    } else {
      // Fallback: save the image directly
      handleSave();
    }
  }, [getQrBlob, fileName, equipmentName, serialNumber, handleSave]);

  return (
    <>
      {/* Inline QR thumbnail */}
      <button
        onClick={() => setShowFullScreen(true)}
        className={cn(
          'flex items-center gap-2.5 p-2.5 rounded-lg min-h-[44px] w-full',
          'bg-white/5 border border-white/[0.08]',
          'touch-manipulation active:scale-[0.98] transition-all'
        )}
        title="View QR Label"
      >
        <div className="bg-white rounded-md p-1 flex-shrink-0">
          <QRCodeSVG value={qrValue} size={size} bgColor="#FFFFFF" fgColor="#000000" level="M" />
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-xs font-medium text-white flex items-center gap-1">
            <Printer className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            Print QR Label
          </p>
          <p className="text-[10px] text-white mt-0.5">
            Save or share to print a sticker for this equipment
          </p>
        </div>
      </button>

      {/* Full-screen QR view */}
      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Equipment QR Label"
          >
            {/* Close button */}
            <div className="absolute top-0 left-0 right-0 p-3 safe-area-top">
              <button
                onClick={() => setShowFullScreen(false)}
                className="flex items-center gap-2 text-white min-h-[44px] touch-manipulation"
              >
                <X className="h-5 w-5" />
                <span className="text-sm font-medium">Close</span>
              </button>
            </div>

            {/* QR Code */}
            <div className="text-center space-y-4 px-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <QrCode className="h-5 w-5 text-elec-yellow" />
                <h2 className="text-lg font-semibold text-white">QR Label</h2>
              </div>

              <div ref={qrRef} className="bg-white rounded-2xl p-6 mx-auto inline-block">
                <QRCodeSVG
                  value={qrValue}
                  size={220}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-0.5">
                <p className="text-sm font-medium text-white">{equipmentName}</p>
                {serialNumber && <p className="text-xs text-white">S/N: {serialNumber}</p>}
              </div>

              {/* How it works steps */}
              <div className="bg-white/5 border border-white/[0.08] rounded-xl p-3 max-w-[280px] mx-auto text-left space-y-2">
                <p className="text-[10px] font-semibold text-elec-yellow uppercase tracking-wider">
                  How it works
                </p>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/20 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-[11px] text-white">
                    Save or share this QR code and print it as a sticker
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/20 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-[11px] text-white">
                    Stick the label on the physical equipment
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/20 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-[11px] text-white">
                    Scan the sticker with the app to instantly find and log tests
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleShare}
                  className={cn(
                    'flex items-center gap-2 px-5 h-11',
                    'bg-elec-yellow text-black font-medium rounded-xl',
                    'touch-manipulation active:scale-[0.98] transition-all'
                  )}
                >
                  <Share2 className="h-4 w-4" />
                  Share / Print
                </button>
                <button
                  onClick={handleSave}
                  className={cn(
                    'flex items-center gap-2 px-5 h-11',
                    'bg-white/10 text-white font-medium rounded-xl border border-white/[0.08]',
                    'touch-manipulation active:scale-[0.98] transition-all'
                  )}
                >
                  <Download className="h-4 w-4" />
                  Save Image
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { buildQRValue };
