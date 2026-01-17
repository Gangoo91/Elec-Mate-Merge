import React, { useState, useRef } from 'react';
import { Palette, Image, PenTool, Upload, Loader2, RotateCcw, Building2, ChevronRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile } from '@/types/company';
import { InspectorProfile } from '@/hooks/useInspectorProfiles';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface BrandingCardProps {
  companyProfile: CompanyProfile | null;
  inspectorProfile: InspectorProfile | null;
  onSaveCompany: (data: Partial<CompanyProfile>) => Promise<boolean>;
  onSaveInspector: (id: string, updates: Partial<InspectorProfile>) => Promise<void>;
  onUploadLogo: (file: File) => Promise<{ url: string; dataUrl: string } | null>;
  isLoading: boolean;
}

const BrandingCard: React.FC<BrandingCardProps> = ({
  companyProfile,
  inspectorProfile,
  onSaveCompany,
  onSaveInspector,
  onUploadLogo,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    primary_color: companyProfile?.primary_color || '#1e40af',
    secondary_color: companyProfile?.secondary_color || '#3b82f6',
  });

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(inspectorProfile?.signatureData || null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleOpen = () => {
    setFormData({
      primary_color: companyProfile?.primary_color || '#1e40af',
      secondary_color: companyProfile?.secondary_color || '#3b82f6',
    });
    setLogoFile(null);
    setLogoPreview(companyProfile?.logo_url || null);
    setSignatureData(inspectorProfile?.signatureData || null);
    setHasDrawn(false);
    setIsEditing(true);

    // Load existing signature after canvas is mounted
    setTimeout(() => {
      if (inspectorProfile?.signatureData && canvasRef.current) {
        loadSignature(inspectorProfile.signatureData);
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Upload logo if changed
      let logoData = {};
      if (logoFile) {
        const result = await onUploadLogo(logoFile);
        if (result) {
          logoData = {
            logo_url: result.url,
            logo_data_url: result.dataUrl,
          };
        }
      }

      // Save company profile (colours + logo)
      await onSaveCompany({
        ...formData,
        ...logoData,
      });

      // Save signature to inspector profile if changed
      if (hasDrawn && inspectorProfile?.id && canvasRef.current) {
        const canvas = canvasRef.current;
        const newSignature = canvas.toDataURL('image/png');
        await onSaveInspector(inspectorProfile.id, { signatureData: newSignature });
      }

      setShowSuccess(true);
      toast.success('Branding saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    } finally {
      setIsSaving(false);
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
    setSignatureData(null);
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
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span className="font-semibold text-[15px] text-white">Branding</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center flex-shrink-0">
              <Image className="h-4 w-4 text-pink-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Company Logo</p>
              {companyProfile?.logo_url ? (
                <div className="mt-1.5 w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={companyProfile.logo_url}
                    alt="Company logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <p className="text-[15px] text-white">Not uploaded</p>
              )}
            </div>
          </div>

          {/* Colours */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
              <Palette className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Brand Colours</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-white/20"
                    style={{ backgroundColor: companyProfile?.primary_color || '#1e40af' }}
                  />
                  <span className="text-[13px] text-white/50">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-white/20"
                    style={{ backgroundColor: companyProfile?.secondary_color || '#3b82f6' }}
                  />
                  <span className="text-[13px] text-white/50">Secondary</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
              <PenTool className="h-4 w-4 text-teal-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Signature</p>
              {inspectorProfile?.signatureData ? (
                <div className="mt-1.5 w-24 h-12 rounded-lg bg-white border border-white/20 overflow-hidden">
                  <img
                    src={inspectorProfile.signatureData}
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

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e]">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Branding</h2>
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

          <div className="px-4 py-6 space-y-6 overflow-y-auto momentum-scroll-y pb-32">
            {/* Logo Upload */}
            <div className="space-y-3">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Company Logo
              </Label>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-8 w-8 text-white/30" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block">
                    <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/[0.06] border border-dashed border-white/20 cursor-pointer active:bg-white/[0.1] transition-colors touch-manipulation">
                      <Upload className="h-5 w-5 text-white/50" />
                      <span className="text-[15px] text-white/50">Upload Logo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[13px] text-white/40 mt-2 px-1">PNG or JPG, square format recommended</p>
                </div>
              </div>
            </div>

            {/* Colour Pickers */}
            <div className="space-y-4">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Brand Colours
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[13px] text-white/50 px-1">Primary</p>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border border-white/[0.08]"
                    />
                    <Input
                      value={formData.primary_color}
                      onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      className="flex-1 h-12 font-mono text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl px-3 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[13px] text-white/50 px-1">Secondary</p>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border border-white/[0.08]"
                    />
                    <Input
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      className="flex-1 h-12 font-mono text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl px-3 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                    />
                  </div>
                </div>
              </div>
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
                Sign above. This signature will appear on EICR and EIC certificates.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BrandingCard;
