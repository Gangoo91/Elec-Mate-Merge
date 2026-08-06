import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Loader2, AlertCircle, Check, X, FileImage, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  CreateExpenseInput,
  ExpenseCategory,
  ExpenseExtractionResult,
  EXPENSE_CATEGORIES,
} from '@/types/expense';
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
          image_base64: base64
            .replace(/^data:image\/\w+;base64,/, '')
            .replace(/^data:application\/octet-stream;base64,/, ''),
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
              <img
                src={previewUrl}
                alt="Receipt"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
          <div className="text-center">
            <p className="text-[15px] font-semibold tracking-tight text-white">
              {progress || 'Reading the receipt'}
            </p>
            <p className="mt-1 text-[13px] text-white">This takes a few seconds</p>
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
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-white">
              That receipt could not be read
            </p>
            <p className="mt-1 text-[13px] text-white">
              Try again with a clearer, flatter photo — or enter it yourself.
            </p>
          </div>
          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={() => {
                cleanupPreview();
                setState('idle');
              }}
              className="h-11 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98]"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
            >
              Cancel
            </button>
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
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Check these details
          </span>
          {/* Low confidence is the case worth flagging; a green "83%" badge on a
              good read is decoration. */}
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-semibold',
              (extractedData.confidence || 0) > 0.7
                ? 'bg-white/[0.08] text-white'
                : 'bg-orange-500/[0.15] text-orange-300'
            )}
          >
            {(extractedData.confidence || 0) > 0.7
              ? 'Read clearly'
              : 'Read may be wrong — check it'}
          </span>
        </div>

        {/* Preview and data side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Receipt preview */}
          {previewUrl && (
            <div className="sm:w-1/3 flex-shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <img
                  src={previewUrl}
                  alt="Receipt"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Extracted fields */}
          <div className="flex-1 space-y-3">
            {/* Vendor */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-white">Vendor</span>
              <span
                className={cn(
                  'font-medium text-right',
                  extractedData.vendor ? 'text-foreground' : 'text-white'
                )}
              >
                {extractedData.vendor || 'Not detected'}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-white">Amount</span>
              <span
                className={cn(
                  'font-bold text-lg',
                  extractedData.amount ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {extractedData.amount ? `£${extractedData.amount.toFixed(2)}` : 'Not detected'}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-white">Date</span>
              <span
                className={cn(
                  'font-medium',
                  extractedData.date ? 'text-foreground' : 'text-white'
                )}
              >
                {extractedData.date || 'Not detected'}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <span className="text-sm text-white">Category</span>
              <span
                className={cn(
                  'font-medium',
                  extractedData.category ? 'text-foreground' : 'text-white'
                )}
              >
                {extractedData.category
                  ? EXPENSE_CATEGORIES.find((c) => c.id === extractedData.category)?.label ||
                    extractedData.category
                  : 'Not detected'}
              </span>
            </div>

            {/* VAT */}
            {extractedData.vat_amount && (
              <div className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <span className="text-sm text-white">VAT</span>
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

        <p className="text-xs text-center text-white">
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

      {/* No hero tile, no gradients, no icon plates — type carries it, and the
          two ways in are told apart by which one is yellow. */}
      <div>
        <h3 className="text-[17px] font-semibold tracking-tight text-white">Scan a receipt</h3>
        <p className="mt-1 text-[13px] leading-snug text-white">
          The vendor, amount, VAT and date are read off the photo and filled in for you. Check them
          before saving.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="w-full rounded-2xl border border-elec-yellow/40 bg-elec-yellow/[0.10] p-4 text-left transition-colors hover:bg-elec-yellow/[0.14] touch-manipulation active:scale-[0.99]"
        >
          <p className="text-[15px] font-semibold tracking-tight text-white">Take a photo</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">
            Point the camera at the receipt
          </p>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 text-left transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.99]"
        >
          <p className="text-[15px] font-semibold tracking-tight text-white">Choose a file</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">
            A photo you already have, or a PDF
          </p>
        </button>
      </div>

      <p className="text-[12px] text-white">JPG, PNG, HEIC, WebP and PDF all work.</p>

      {/* Cancel button */}
      <button
        type="button"
        onClick={onCancel}
        className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
      >
        Cancel
      </button>
    </div>
  );
}
