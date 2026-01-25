import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2, AlertCircle, Check, X, FileImage, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CreateExpenseInput, ExpenseCategory, ExpenseExtractionResult, EXPENSE_CATEGORIES } from '@/types/expense';
import { uploadReceipt, fileToBase64 } from '@/services/expenseReceiptService';
import { cn } from '@/lib/utils';

type ScannerState = 'idle' | 'capturing' | 'processing' | 'review' | 'error';

interface ExpenseReceiptScannerProps {
  onComplete: (data: Partial<CreateExpenseInput>) => void;
  onCancel: () => void;
}

export function ExpenseReceiptScanner({ onComplete, onCancel }: ExpenseReceiptScannerProps) {
  const [state, setState] = useState<ScannerState>('idle');
  const [progress, setProgress] = useState('');
  const [extractedData, setExtractedData] = useState<ExpenseExtractionResult | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Process image and extract expense data
  const processImage = useCallback(async (file: File) => {
    setState('processing');
    setProgress('Analysing receipt...');

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      // Compress and upload the receipt
      setProgress('Uploading receipt...');
      const tempId = `temp-${Date.now()}`;
      const uploadResult = await uploadReceipt(file, tempId);

      if (uploadResult.error || !uploadResult.url) {
        throw new Error(uploadResult.error || 'Failed to upload receipt');
      }

      setReceiptUrl(uploadResult.url);

      // Convert to base64 for AI processing
      setProgress('Extracting details with AI...');
      const base64 = await fileToBase64(file);

      // Determine image type - default to jpeg for HEIC
      let imageType = file.type || 'image/jpeg';
      if (imageType === 'image/heic' || imageType === 'image/heif') {
        imageType = 'image/jpeg'; // Convert type for API compatibility
      }

      // Call the edge function for OCR extraction
      const { data, error } = await supabase.functions.invoke('parse-expense-receipt', {
        body: {
          image_base64: base64.replace(/^data:image\/\w+;base64,/, '').replace(/^data:application\/octet-stream;base64,/, ''),
          image_type: imageType,
        },
      });

      if (error) {
        console.error('AI extraction error:', error);
        // Continue with manual entry even if AI fails
        setExtractedData({
          vendor: null,
          amount: null,
          date: null,
          category: null,
          vat_amount: null,
          description: null,
          confidence: 0,
        });
        setState('review');
        setProgress('');
        toast({
          title: 'AI Extraction Failed',
          description: 'Please enter the details manually',
          variant: 'destructive',
        });
        return;
      }

      // Map the extracted data
      const extracted: ExpenseExtractionResult = {
        vendor: data?.vendor || null,
        amount: data?.amount ? parseFloat(data.amount) : null,
        date: data?.date || null,
        category: mapToExpenseCategory(data?.category),
        vat_amount: data?.vat_amount ? parseFloat(data.vat_amount) : null,
        description: data?.description || null,
        confidence: data?.confidence || 0.5,
        rawText: data?.raw_text,
      };

      setExtractedData(extracted);
      setState('review');
      setProgress('');

      if (extracted.confidence > 0.7) {
        toast({
          title: 'Receipt Scanned',
          description: 'Details extracted successfully',
        });
      } else {
        toast({
          title: 'Receipt Scanned',
          description: 'Please verify the extracted details',
        });
      }
    } catch (err) {
      console.error('Receipt processing error:', err);
      setState('error');
      setProgress('');
      toast({
        title: 'Scan Failed',
        description: err instanceof Error ? err.message : 'Failed to process receipt',
        variant: 'destructive',
      });
    }
  }, []);

  // Map AI-detected category to our expense categories
  const mapToExpenseCategory = (category: string | null): ExpenseCategory | null => {
    if (!category) return null;

    const categoryLower = category.toLowerCase();

    // Direct mappings
    const mappings: Record<string, ExpenseCategory> = {
      fuel: 'fuel',
      petrol: 'fuel',
      diesel: 'fuel',
      gas: 'fuel',
      tools: 'tools',
      hardware: 'tools',
      equipment: 'tools',
      ppe: 'ppe',
      safety: 'ppe',
      materials: 'materials',
      supplies: 'materials',
      hotel: 'hotels',
      accommodation: 'hotels',
      lodging: 'hotels',
      mileage: 'mileage',
      travel: 'mileage',
      training: 'training',
      course: 'training',
      education: 'training',
      vehicle: 'vehicle',
      car: 'vehicle',
      van: 'vehicle',
      insurance: 'insurance',
      subscription: 'subscriptions',
      software: 'subscriptions',
      meals: 'meals',
      food: 'meals',
      restaurant: 'meals',
    };

    for (const [key, value] of Object.entries(mappings)) {
      if (categoryLower.includes(key)) {
        return value;
      }
    }

    return 'other';
  };

  // Handle camera capture
  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setState('capturing');
      processImage(file);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  // Confirm extracted data
  const handleConfirm = () => {
    if (!extractedData) return;

    onComplete({
      vendor: extractedData.vendor || undefined,
      amount: extractedData.amount || undefined,
      date: extractedData.date || new Date().toISOString().split('T')[0],
      category: extractedData.category || undefined,
      vat_amount: extractedData.vat_amount || undefined,
      description: extractedData.description || undefined,
      receipt_url: receiptUrl || undefined,
      ai_extracted: true,
    });
  };

  // Cleanup preview URL on unmount
  const cleanupPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Render based on state
  if (state === 'processing' || state === 'capturing') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6 max-w-sm"
        >
          {/* Preview image while processing */}
          {previewUrl && (
            <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src={previewUrl} alt="Receipt" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground mb-1">{progress || 'Processing...'}</p>
            <p className="text-sm text-muted-foreground">This may take a few seconds</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6 max-w-sm text-center"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Failed to process receipt</p>
            <p className="text-sm text-muted-foreground">
              Please try again with a clearer photo
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => {
                cleanupPreview();
                setState('idle');
              }}
              className="flex-1 h-11 touch-manipulation"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-11 touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (state === 'review' && extractedData) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header with confidence */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-foreground">AI Extracted</span>
          </div>
          <div className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            (extractedData.confidence || 0) > 0.7
              ? "bg-green-500/15 text-green-400"
              : "bg-amber-500/15 text-amber-400"
          )}>
            {Math.round((extractedData.confidence || 0) * 100)}% confidence
          </div>
        </div>

        {/* Preview and data side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Receipt preview */}
          {previewUrl && (
            <div className="sm:w-1/3 flex-shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <img src={previewUrl} alt="Receipt" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          {/* Extracted fields */}
          <div className="flex-1 space-y-3">
            {/* Vendor */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Vendor</span>
              <span className={cn(
                "font-medium text-right",
                extractedData.vendor ? "text-foreground" : "text-muted-foreground/50"
              )}>
                {extractedData.vendor || 'Not detected'}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className={cn(
                "font-bold text-lg",
                extractedData.amount ? "text-elec-yellow" : "text-muted-foreground/50"
              )}>
                {extractedData.amount ? `£${extractedData.amount.toFixed(2)}` : 'Not detected'}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className={cn(
                "font-medium",
                extractedData.date ? "text-foreground" : "text-muted-foreground/50"
              )}>
                {extractedData.date || 'Not detected'}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className={cn(
                "font-medium",
                extractedData.category ? "text-foreground" : "text-muted-foreground/50"
              )}>
                {extractedData.category
                  ? EXPENSE_CATEGORIES.find(c => c.id === extractedData.category)?.label || extractedData.category
                  : 'Not detected'}
              </span>
            </div>

            {/* VAT */}
            {extractedData.vat_amount && (
              <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <span className="text-sm text-muted-foreground">VAT</span>
                <span className="font-medium text-foreground">
                  £{extractedData.vat_amount.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              cleanupPreview();
              setState('idle');
            }}
            className="flex-1 h-12 touch-manipulation"
          >
            <X className="h-4 w-4 mr-2" />
            Retake
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          >
            <Check className="h-4 w-4 mr-2" />
            Use This
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          You can edit the details on the next screen
        </p>
      </div>
    );
  }

  // Idle state - show camera/upload options
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Hidden file inputs - include HEIC support */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif,.pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hero section */}
      <div className="text-center py-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-elec-yellow/20">
          <FileImage className="h-10 w-10 text-elec-yellow" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Scan Your Receipt</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Our AI will automatically extract the vendor, amount, and date from your receipt
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        {/* Camera capture button - primary */}
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="w-full p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/15 to-amber-500/10 border border-elec-yellow/30 hover:border-elec-yellow/50 hover:from-elec-yellow/20 hover:to-amber-500/15 transition-all touch-manipulation active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
              <Camera className="h-7 w-7 text-elec-yellow" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">Take Photo</p>
              <p className="text-sm text-muted-foreground">Use your camera to capture a receipt</p>
            </div>
          </div>
        </button>

        {/* File upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all touch-manipulation active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/[0.08] flex items-center justify-center">
              <Upload className="h-7 w-7 text-white/80" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">Upload from Gallery</p>
              <p className="text-sm text-muted-foreground">Select an existing photo or PDF</p>
            </div>
          </div>
        </button>
      </div>

      {/* Supported formats */}
      <p className="text-xs text-center text-muted-foreground">
        Supports JPG, PNG, HEIC, WebP, and PDF
      </p>

      {/* Cancel button */}
      <Button
        variant="ghost"
        onClick={onCancel}
        className="w-full h-11 touch-manipulation"
      >
        Cancel
      </Button>
    </div>
  );
}
