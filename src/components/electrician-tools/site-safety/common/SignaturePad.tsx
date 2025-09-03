import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Trash2, PenTool } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  name: string;
  date: string;
  signatureDataUrl?: string;
  onSignatureChange: (signatureDataUrl: string) => void;
  onNameChange: (name: string) => void;
  onDateChange: (date: string) => void;
  className?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  name,
  date,
  signatureDataUrl,
  onSignatureChange,
  onNameChange,
  onDateChange,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;

    // Set drawing style
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Clear canvas with white background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load existing signature if available
    if (signatureDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = signatureDataUrl;
    }
  }, [signatureDataUrl]);

  const getEventPos = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in event) {
      return {
        x: (event.touches[0].clientX - rect.left) * scaleX,
        y: (event.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const pos = getEventPos(event);
    setIsDrawing(true);
    setLastPosition(pos);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const currentPos = getEventPos(event);

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    setLastPosition(currentPos);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Save signature as data URL
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onSignatureChange('');
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onDateChange(today);
  };

  return (
    <Card className={`border-elec-yellow/20 bg-elec-gray/50 ${className}`}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <PenTool className="h-4 w-4 text-elec-yellow" />
          <Label className="text-white font-medium">{label}</Label>
        </div>

        {/* Name and Date inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`name-${label}`} className="text-sm text-muted-foreground">
              Name
            </Label>
            <Input
              id={`name-${label}`}
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter full name"
              className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor={`date-${label}`} className="text-sm text-muted-foreground">
              Date
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id={`date-${label}`}
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
              <Button
                type="button"
                onClick={handleTodayClick}
                size="sm"
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 whitespace-nowrap"
              >
                Today
              </Button>
            </div>
          </div>
        </div>

        {/* Signature Canvas */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Signature
          </Label>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-elec-yellow/20 rounded-md bg-white cursor-crosshair touch-none w-full max-w-md"
              style={{ height: '120px' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <Button
              type="button"
              onClick={clearSignature}
              size="sm"
              variant="outline"
              className="absolute top-2 right-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Sign above using mouse or touch
          </p>
        </div>
      </CardContent>
    </Card>
  );
};