/**
 * AnalyzedImageViewer — editorial photo viewer with zoom dialog.
 *
 * Drops Card chrome for editorial gradient surface, replaces gradient
 * overlay with a hover-revealed editorial action bar. Zoom dialog gets a
 * proper accessible title.
 */

import { useState } from 'react';
import { ZoomIn, X, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface AnalyzedImageViewerProps {
  imageUrl: string;
  timestamp?: string;
  onDownload?: () => void;
}

export const AnalyzedImageViewer = ({
  imageUrl,
  timestamp,
  onDownload,
}: AnalyzedImageViewerProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Analysed installation"
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain bg-black/40"
          />
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 rounded-full px-3 py-2 min-h-[36px] touch-manipulation transition-colors"
            >
              <ZoomIn className="h-3.5 w-3.5" />
              View full size
            </button>
            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                aria-label="Download"
                className="h-9 w-9 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 bg-[hsl(0_0%_8%)]/80 backdrop-blur touch-manipulation transition-colors shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        {timestamp && (
          <div className="px-4 py-2.5 border-t border-white/[0.06]">
            <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
              Analysed{' '}
              {new Date(timestamp).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
        )}
      </div>

      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-white/[0.10]">
          <VisuallyHidden>
            <DialogTitle>Analysed image, full size</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 bg-[hsl(0_0%_8%)]/80 backdrop-blur touch-manipulation transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={imageUrl}
              alt="Analysed installation, full size"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
