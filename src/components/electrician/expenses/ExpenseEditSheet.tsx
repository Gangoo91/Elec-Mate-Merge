import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  X,
  Camera,
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Check,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Expense,
  ExpenseCategory,
  UpdateExpenseInput,
  EXPENSE_CATEGORIES,
  DEFAULT_MILEAGE_RATE,
  getCategoryConfig,
} from '@/types/expense';
import { uploadReceipt, getSignedReceiptUrl, isValidReceiptUrl } from '@/services/expenseReceiptService';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Fuel,
  Wrench,
  HardHat,
  Package,
  Hotel,
  Car,
  GraduationCap,
  Truck,
  Shield,
  CreditCard,
  UtensilsCrossed,
  MoreHorizontal,
} from 'lucide-react';

// Icon mapping
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fuel: Fuel,
  tools: Wrench,
  ppe: HardHat,
  materials: Package,
  hotels: Hotel,
  mileage: Car,
  training: GraduationCap,
  vehicle: Truck,
  insurance: Shield,
  subscriptions: CreditCard,
  meals: UtensilsCrossed,
  other: MoreHorizontal,
};

// Colour classes for category buttons
const COLOUR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  'orange-500': { bg: 'bg-orange-500/15 hover:bg-orange-500/25', text: 'text-orange-400', border: 'border-orange-500/30' },
  'amber-500': { bg: 'bg-amber-500/15 hover:bg-amber-500/25', text: 'text-amber-400', border: 'border-amber-500/30' },
  'red-500': { bg: 'bg-red-500/15 hover:bg-red-500/25', text: 'text-red-400', border: 'border-red-500/30' },
  'cyan-500': { bg: 'bg-cyan-500/15 hover:bg-cyan-500/25', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'purple-500': { bg: 'bg-purple-500/15 hover:bg-purple-500/25', text: 'text-purple-400', border: 'border-purple-500/30' },
  'green-500': { bg: 'bg-green-500/15 hover:bg-green-500/25', text: 'text-green-400', border: 'border-green-500/30' },
  'teal-500': { bg: 'bg-teal-500/15 hover:bg-teal-500/25', text: 'text-teal-400', border: 'border-teal-500/30' },
  'slate-500': { bg: 'bg-slate-500/15 hover:bg-slate-500/25', text: 'text-slate-400', border: 'border-slate-500/30' },
  'indigo-500': { bg: 'bg-indigo-500/15 hover:bg-indigo-500/25', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  'pink-500': { bg: 'bg-pink-500/15 hover:bg-pink-500/25', text: 'text-pink-400', border: 'border-pink-500/30' },
  'rose-500': { bg: 'bg-rose-500/15 hover:bg-rose-500/25', text: 'text-rose-400', border: 'border-rose-500/30' },
  'gray-500': { bg: 'bg-gray-500/15 hover:bg-gray-500/25', text: 'text-gray-400', border: 'border-gray-500/30' },
};

type EditStep = 'form' | 'category' | 'receipt';

interface ExpenseEditSheetProps {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (expense: UpdateExpenseInput) => Promise<boolean>;
  onDelete: (id: string) => void;
}

export function ExpenseEditSheet({ expense, open, onOpenChange, onSave, onDelete }: ExpenseEditSheetProps) {
  const [step, setStep] = useState<EditStep>('form');
  const [formData, setFormData] = useState<Partial<UpdateExpenseInput>>({
    id: expense.id,
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
    vendor: expense.vendor,
    description: expense.description,
    receipt_url: expense.receipt_url,
    vat_amount: expense.vat_amount,
    tax_deductible: expense.tax_deductible,
    mileage_miles: expense.mileage_miles,
    mileage_rate: expense.mileage_rate || DEFAULT_MILEAGE_RATE,
    mileage_from: expense.mileage_from,
    mileage_to: expense.mileage_to,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [receiptImageError, setReceiptImageError] = useState(false);
  const [showReceiptFullscreen, setShowReceiptFullscreen] = useState(false);
  const [receiptDisplayUrl, setReceiptDisplayUrl] = useState<string | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load a signed URL for display when receipt_url changes
  useEffect(() => {
    setReceiptImageError(false);
    setReceiptDisplayUrl(null);

    const storedUrl = formData.receipt_url;
    if (!isValidReceiptUrl(storedUrl)) return;

    // First try the stored URL directly, then fall back to signed URL
    setLoadingReceipt(true);
    const img = new window.Image();
    img.onload = () => {
      // Public URL works fine
      setReceiptDisplayUrl(storedUrl);
      setLoadingReceipt(false);
    };
    img.onerror = () => {
      // Public URL broken — fetch a signed URL
      getSignedReceiptUrl(storedUrl).then((signedUrl) => {
        if (signedUrl) {
          setReceiptDisplayUrl(signedUrl);
        } else {
          setReceiptImageError(true);
        }
        setLoadingReceipt(false);
      });
    };
    img.src = storedUrl;
  }, [formData.receipt_url]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('form');
    }, 300);
  };

  const handleCategorySelect = (category: ExpenseCategory) => {
    setFormData(prev => ({ ...prev, category }));
    setStep('form');
  };

  const handleReceiptUpload = async (file: File) => {
    setIsUploadingReceipt(true);
    try {
      const result = await uploadReceipt(file, expense.id);
      if (result.error || !result.url) {
        throw new Error(result.error || 'Failed to upload receipt');
      }
      setFormData(prev => ({ ...prev, receipt_url: result.url }));
      toast({
        title: 'Receipt uploaded',
        description: 'Your receipt has been attached to this expense',
      });
      setStep('form');
    } catch (err) {
      toast({
        title: 'Upload failed',
        description: err instanceof Error ? err.message : 'Failed to upload receipt',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleReceiptUpload(file);
    }
  };

  const handleRemoveReceipt = () => {
    setFormData(prev => ({ ...prev, receipt_url: null }));
  };

  const handleSubmit = async () => {
    if (!formData.amount) return;

    setIsSubmitting(true);
    try {
      const success = await onSave({
        id: expense.id,
        category: formData.category,
        amount: formData.amount,
        date: formData.date,
        vendor: formData.vendor,
        description: formData.description,
        receipt_url: formData.receipt_url,
        vat_amount: formData.vat_amount,
        tax_deductible: formData.tax_deductible,
        mileage_miles: formData.mileage_miles,
        mileage_rate: formData.mileage_rate,
        mileage_from: formData.mileage_from,
        mileage_to: formData.mileage_to,
      });
      if (success) {
        handleClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryConfig = getCategoryConfig(formData.category || expense.category);
  const CategoryIcon = CATEGORY_ICONS[formData.category || expense.category] || MoreHorizontal;
  const colours = COLOUR_CLASSES[categoryConfig.colour] || COLOUR_CLASSES['gray-500'];

  const getStepTitle = () => {
    switch (step) {
      case 'category':
        return 'Change Category';
      case 'receipt':
        return 'Attach Receipt';
      default:
        return 'Edit Expense';
    }
  };

  const canGoBack = step !== 'form';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('form')}
                  className="h-10 w-10 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-10 w-10 touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              <SheetTitle className="text-lg font-semibold flex-1 text-center px-2">{getStepTitle()}</SheetTitle>
              <SheetDescription className="sr-only">Edit expense details, change category, or attach a receipt</SheetDescription>
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-10 w-10 touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </Button>
              ) : (
                <div className="w-10" />
              )}
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Form Step */}
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  {/* Category Selector */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <button
                      onClick={() => setStep('category')}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border touch-manipulation active:scale-[0.98] transition-all",
                        colours.bg,
                        colours.border
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colours.bg)}>
                        <CategoryIcon className={cn("h-5 w-5", colours.text)} />
                      </div>
                      <span className="font-medium text-foreground">{categoryConfig.label}</span>
                      <ChevronLeft className="h-4 w-4 text-muted-foreground ml-auto rotate-180" />
                    </button>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-muted-foreground">
                        £
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={formData.amount || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        className="h-14 text-2xl font-semibold touch-manipulation flex-1"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="h-12 touch-manipulation text-base"
                    />
                    {formData.date && (
                      <p className="text-sm text-elec-yellow font-medium">
                        {format(new Date(formData.date), 'EEEE, d MMMM yyyy')}
                      </p>
                    )}
                  </div>

                  {/* Vendor */}
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor / Store</Label>
                    <Input
                      id="vendor"
                      placeholder="e.g. Screwfix, Shell, Toolstation"
                      value={formData.vendor || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                      className="h-11 touch-manipulation"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="What was this expense for?"
                      value={formData.description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="touch-manipulation min-h-[80px]"
                    />
                  </div>

                  {/* Receipt Section */}
                  <div className="space-y-2">
                    <Label>Receipt / Photo</Label>
                    {formData.receipt_url ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
                        {loadingReceipt ? (
                          /* Loading state while resolving URL */
                          <div className="w-full h-40 flex flex-col items-center justify-center bg-white/[0.02]">
                            <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-2" />
                            <p className="text-sm text-muted-foreground">Loading receipt...</p>
                          </div>
                        ) : receiptImageError || !receiptDisplayUrl ? (
                          /* Error state - image failed to load */
                          <div className="w-full h-40 flex flex-col items-center justify-center bg-white/[0.02]">
                            <AlertCircle className="h-8 w-8 text-amber-400 mb-2" />
                            <p className="text-sm text-muted-foreground text-center px-4">
                              Receipt image unavailable
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              The image may have expired or been removed
                            </p>
                          </div>
                        ) : (
                          /* Receipt image with tap to view full */
                          <button
                            onClick={() => setShowReceiptFullscreen(true)}
                            className="w-full block relative touch-manipulation active:opacity-90 transition-opacity"
                          >
                            <img
                              src={receiptDisplayUrl}
                              alt="Receipt"
                              className="w-full h-40 object-cover"
                              onError={() => setReceiptImageError(true)}
                            />
                            <div className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 backdrop-blur-sm">
                              <Maximize2 className="h-4 w-4 text-white" />
                            </div>
                          </button>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-3 px-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white text-sm">
                              <Check className="h-4 w-4 text-green-400" />
                              <span>Receipt attached</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStep('receipt');
                                }}
                                className="h-8 border-white/20 bg-black/30 hover:bg-black/50 text-white"
                              >
                                Change
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveReceipt();
                                }}
                                className="h-8 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setStep('receipt')}
                        className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-white/20 hover:border-elec-yellow/30 hover:bg-elec-yellow/5 touch-manipulation active:scale-[0.98] transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">Add Receipt or Photo</p>
                          <p className="text-sm text-muted-foreground">
                            Attach an image of your receipt or invoice
                          </p>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* VAT Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="vat">VAT Amount (optional)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-muted-foreground">
                        £
                      </span>
                      <Input
                        id="vat"
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={formData.vat_amount || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, vat_amount: parseFloat(e.target.value) || undefined }))}
                        className="h-11 touch-manipulation flex-1"
                      />
                    </div>
                  </div>

                  {/* Mileage fields (if mileage category) */}
                  {formData.category === 'mileage' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="miles">Miles</Label>
                        <Input
                          id="miles"
                          type="number"
                          inputMode="decimal"
                          step="0.1"
                          min="0"
                          placeholder="0"
                          value={formData.mileage_miles || ''}
                          onChange={(e) => {
                            const miles = parseFloat(e.target.value) || 0;
                            const rate = formData.mileage_rate || DEFAULT_MILEAGE_RATE;
                            setFormData(prev => ({
                              ...prev,
                              mileage_miles: miles,
                              amount: Math.round(miles * rate * 100) / 100
                            }));
                          }}
                          className="h-11 touch-manipulation"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="from">From</Label>
                          <Input
                            id="from"
                            placeholder="Start location"
                            value={formData.mileage_from || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, mileage_from: e.target.value }))}
                            className="h-11 touch-manipulation"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="to">To</Label>
                          <Input
                            id="to"
                            placeholder="End location"
                            value={formData.mileage_to || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, mileage_to: e.target.value }))}
                            className="h-11 touch-manipulation"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Tax Deductible Toggle */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label>Tax Deductible</Label>
                      <p className="text-xs text-muted-foreground">
                        Include in tax deduction calculations
                      </p>
                    </div>
                    <Switch
                      checked={formData.tax_deductible ?? true}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, tax_deductible: checked }))}
                    />
                  </div>
                </motion.div>
              )}

              {/* Category Selection Step */}
              {step === 'category' && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 sm:p-6"
                >
                  <p className="text-base text-muted-foreground mb-6 text-center">
                    Select a new category
                  </p>
                  <div className="space-y-2">
                    {EXPENSE_CATEGORIES.map((category) => {
                      const Icon = CATEGORY_ICONS[category.id] || MoreHorizontal;
                      const catColours = COLOUR_CLASSES[category.colour] || COLOUR_CLASSES['gray-500'];
                      const isSelected = formData.category === category.id;

                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={cn(
                            "w-full flex items-center gap-4 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all",
                            "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]",
                            isSelected && "ring-2 ring-elec-yellow bg-elec-yellow/5"
                          )}
                        >
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                            catColours.bg
                          )}>
                            <Icon className={cn("h-5 w-5", catColours.text)} />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium text-foreground">
                              {category.label}
                            </span>
                            {category.taxNote && (
                              <span className="text-xs text-muted-foreground ml-2">
                                ({category.taxNote})
                              </span>
                            )}
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            isSelected
                              ? "border-elec-yellow bg-elec-yellow"
                              : "border-white/20"
                          )}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-black" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Receipt Upload Step */}
              {step === 'receipt' && (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  {/* Hidden file inputs */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {isUploadingReceipt ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mb-4">
                        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                      </div>
                      <p className="text-muted-foreground">Uploading receipt...</p>
                    </div>
                  ) : (
                    <>
                      {/* Camera capture button */}
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/15 to-amber-500/10 border border-elec-yellow/30 hover:border-elec-yellow/50 transition-all touch-manipulation active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                            <Camera className="h-7 w-7 text-elec-yellow" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-foreground">Take Photo</p>
                            <p className="text-sm text-muted-foreground">Use your camera</p>
                          </div>
                        </div>
                      </button>

                      {/* File upload button */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all touch-manipulation active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-white/[0.08] flex items-center justify-center">
                            <Upload className="h-7 w-7 text-white/80" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-foreground">Upload from Gallery</p>
                            <p className="text-sm text-muted-foreground">Choose an existing photo</p>
                          </div>
                        </div>
                      </button>

                      {/* Cancel button */}
                      <Button
                        variant="ghost"
                        onClick={() => setStep('form')}
                        className="w-full h-11 touch-manipulation"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {step === 'form' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0 space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={!formData.amount || isSubmitting}
                className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(expense.id)}
                className="w-full h-11 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Expense
              </Button>
            </div>
          )}
        </div>

        {/* Fullscreen Receipt Viewer */}
        <AnimatePresence>
          {showReceiptFullscreen && receiptDisplayUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
              onClick={() => setShowReceiptFullscreen(false)}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 flex-shrink-0">
                <h3 className="text-white font-medium">Receipt</h3>
                <button
                  onClick={() => setShowReceiptFullscreen(false)}
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center touch-manipulation active:bg-white/20"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Image */}
              <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
                <img
                  src={receiptDisplayUrl}
                  alt="Receipt full view"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Footer hint */}
              <div className="p-4 text-center flex-shrink-0">
                <p className="text-sm text-white/50">Tap anywhere to close</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
