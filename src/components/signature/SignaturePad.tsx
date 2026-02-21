import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download, Upload } from 'lucide-react';

interface SignaturePadProps {
  width?: number;
  height?: number;
  onSignatureChange?: (signature: string | null) => void;
  initialSignature?: string;
  disabled?: boolean;
}

export interface SignaturePadRef {
  clear: () => void;
  getSignature: () => string | null;
  setSignature: (signature: string) => void;
  isEmpty: () => boolean;
}

const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ width = 320, height = 160, onSignatureChange, initialSignature, disabled = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawingRef = useRef(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const getSignatureData = useCallback((): string | null => {
      const canvas = canvasRef.current;
      if (canvas && !isEmpty) {
        return canvas.toDataURL('image/png');
      }
      return null;
    }, [isEmpty]);

    const loadSignature = useCallback((signature: string) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            setIsEmpty(false);
            onSignatureChange?.(signature);
          }
        };
        img.src = signature;
      }
    }, [width, height, onSignatureChange]);

    const handleClear = useCallback(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          setIsEmpty(true);
          onSignatureChange?.(null);
        }
      }
    }, [width, height, onSignatureChange]);

    useImperativeHandle(ref, () => ({
      clear: handleClear,
      getSignature: getSignatureData,
      setSignature: loadSignature,
      isEmpty: () => isEmpty,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }
      }

      if (initialSignature) {
        loadSignature(initialSignature);
      }
    }, [width, height, initialSignature, loadSignature]);

    // Native touch/mouse event listeners registered with { passive: false }
    // to allow preventDefault() which stops page scrolling while drawing
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const getCoords = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;

        if ('touches' in e) {
          const touch = e.touches[0];
          return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      };

      const onStart = (e: MouseEvent | TouchEvent) => {
        if (disabled) return;
        e.preventDefault();

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const { x, y } = getCoords(e);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          isDrawingRef.current = true;
        }
      };

      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!isDrawingRef.current || disabled) return;
        e.preventDefault();

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const { x, y } = getCoords(e);
          ctx.lineTo(x, y);
          ctx.stroke();
          setIsEmpty(false);
        }
      };

      const onEnd = () => {
        if (isDrawingRef.current) {
          isDrawingRef.current = false;
          // Read signature data directly from canvas
          const data = canvas.toDataURL('image/png');
          onSignatureChange?.(data);
        }
      };

      // Register with { passive: false } so preventDefault() works on touch events
      canvas.addEventListener('mousedown', onStart);
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseup', onEnd);
      canvas.addEventListener('mouseleave', onEnd);
      canvas.addEventListener('touchstart', onStart, { passive: false });
      canvas.addEventListener('touchmove', onMove, { passive: false });
      canvas.addEventListener('touchend', onEnd);

      return () => {
        canvas.removeEventListener('mousedown', onStart);
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseup', onEnd);
        canvas.removeEventListener('mouseleave', onEnd);
        canvas.removeEventListener('touchstart', onStart);
        canvas.removeEventListener('touchmove', onMove);
        canvas.removeEventListener('touchend', onEnd);
      };
    }, [width, height, disabled, onSignatureChange]);

    const handleDownload = () => {
      const signature = getSignatureData();
      if (signature) {
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = signature;
        link.click();
      }
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            loadSignature(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Card className="p-2 sm:p-3 space-y-2 sm:space-y-3">
        <div className="w-full max-w-sm mx-auto">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg"
            style={{ width: '100%', maxWidth: width || 320, height: height || 160 }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className={`w-full h-full border rounded-lg cursor-crosshair touch-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={disabled || isEmpty}
            className="gap-1 text-sm px-2 h-9 min-h-[36px]"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isEmpty}
            className="gap-1 text-sm px-2 h-9 min-h-[36px]"
          >
            <Download className="h-3 w-3" />
            Download
          </Button>

          <label className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="gap-1 text-sm px-2 h-9 min-h-[36px]"
              asChild
            >
              <span>
                <Upload className="h-3 w-3" />
                Upload
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={disabled}
            />
          </label>
        </div>

        {!isEmpty && (
          <p className="text-xs text-green-600 text-center">Signature captured successfully</p>
        )}
      </Card>
    );
  }
);

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
