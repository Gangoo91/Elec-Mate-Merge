import React, { useState, useRef } from 'react';
import { User, ChevronRight, Loader2, Check, PenTool, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile } from '@/types/company';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface InspectorDetailsCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const InspectorDetailsCard: React.FC<InspectorDetailsCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    inspector_name: companyProfile?.inspector_name || '',
  });

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleOpen = () => {
    setFormData({
      inspector_name: companyProfile?.inspector_name || '',
    });
    setHasDrawn(false);
    setIsEditing(true);

    // Load existing signature after canvas is mounted
    setTimeout(() => {
      if (companyProfile?.signature_data && canvasRef.current) {
        loadSignature(companyProfile.signature_data);
      }
    }, 100);
  };

  const loadSignature = (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = data;
  };

  const handleSave = async () => {
    setIsSaving(true);

    let signatureData: string | undefined;
    if (hasDrawn && canvasRef.current) {
      signatureData = canvasRef.current.toDataURL('image/png');
    }

    const dataToSave: Partial<CompanyProfile> = {
      inspector_name: formData.inspector_name || undefined,
    };

    if (signatureData) {
      dataToSave.signature_data = signatureData;
    }

    const success = await onSave(dataToSave);
    setIsSaving(false);

    if (success) {
      setShowSuccess(true);
      toast.success('Inspector details saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  // Canvas drawing functions
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(true);
  };

  // Initialize canvas when sheet opens
  React.useEffect(() => {
    if (isEditing && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isEditing]);

  return (
    <>
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="font-semibold text-[15px] text-white">Inspector Details</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {/* Inspector Name */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-teal-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Inspector Name</p>
              <p className="text-[15px] text-white">
                {companyProfile?.inspector_name || 'Not set'}
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
              <PenTool className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Signature</p>
              {companyProfile?.signature_data ? (
                <div className="mt-1.5 w-24 h-12 rounded-lg bg-white border border-white/20 overflow-hidden">
                  <img
                    src={companyProfile.signature_data}
                    alt="Signature"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <p className="text-[15px] text-white">Not added</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col">
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Inspector Details</h2>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-[17px] text-blue-400 font-semibold active:opacity-50 touch-manipulation disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : showSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <Check className="h-5 w-5 text-green-400" />
                </motion.div>
              ) : (
                'Save'
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <p className="text-[13px] text-white/50 px-1">
              These details auto-fill EICR, EIC, and Minor Works certificates.
            </p>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Inspector Name
              </Label>
              <Input
                placeholder="Full name for certificates"
                value={formData.inspector_name}
                onChange={(e) => setFormData({ ...formData, inspector_name: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            {/* Signature Pad */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide">
                  Signature for Certificates
                </Label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSignature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] text-[13px] text-white/50 active:bg-white/[0.1] touch-manipulation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </motion.button>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-xl bg-white overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={160}
                  className="w-full h-40 cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <p className="text-[13px] text-white/40 px-1">
                Sign above. This signature will appear on EICR, EIC, and Minor Works certificates.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default InspectorDetailsCard;
