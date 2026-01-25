import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, PenLine, ChevronLeft, X, Receipt } from 'lucide-react';
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
  ExpenseCategory,
  CreateExpenseInput,
  EXPENSE_CATEGORIES,
  DEFAULT_MILEAGE_RATE,
} from '@/types/expense';
import { ExpenseReceiptScanner } from './ExpenseReceiptScanner';
import { ExpenseMileageForm } from './ExpenseMileageForm';
import { cn } from '@/lib/utils';
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

type AddStep = 'choose' | 'scan' | 'category' | 'form' | 'mileage';

interface ExpenseAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (expense: CreateExpenseInput) => Promise<void>;
}

export function ExpenseAddSheet({ open, onOpenChange, onSave }: ExpenseAddSheetProps) {
  const [step, setStep] = useState<AddStep>('choose');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [formData, setFormData] = useState<Partial<CreateExpenseInput>>({
    date: new Date().toISOString().split('T')[0],
    tax_deductible: true,
    mileage_rate: DEFAULT_MILEAGE_RATE,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('choose');
      setSelectedCategory(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        tax_deductible: true,
        mileage_rate: DEFAULT_MILEAGE_RATE,
      });
    }, 300);
  };

  const handleCategorySelect = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setFormData(prev => ({ ...prev, category }));

    if (category === 'mileage') {
      setStep('mileage');
    } else {
      setStep('form');
    }
  };

  const handleScanComplete = (extractedData: Partial<CreateExpenseInput>) => {
    setFormData(prev => ({
      ...prev,
      ...extractedData,
      ai_extracted: true,
    }));
    if (extractedData.category) {
      setSelectedCategory(extractedData.category);
    }
    setStep('form');
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !formData.amount) return;

    setIsSubmitting(true);
    try {
      await onSave({
        category: selectedCategory,
        amount: formData.amount,
        date: formData.date || new Date().toISOString().split('T')[0],
        vendor: formData.vendor,
        description: formData.description,
        receipt_url: formData.receipt_url,
        mileage_miles: formData.mileage_miles,
        mileage_rate: formData.mileage_rate,
        mileage_from: formData.mileage_from,
        mileage_to: formData.mileage_to,
        tax_deductible: formData.tax_deductible,
        vat_amount: formData.vat_amount,
        ai_extracted: formData.ai_extracted,
      });
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMileageSave = async (mileageData: {
    miles: number;
    from: string;
    to: string;
    date: string;
    description?: string;
  }) => {
    const amount = mileageData.miles * (formData.mileage_rate || DEFAULT_MILEAGE_RATE);
    setIsSubmitting(true);
    try {
      await onSave({
        category: 'mileage',
        amount: Math.round(amount * 100) / 100,
        date: mileageData.date,
        vendor: null,
        description: mileageData.description || `${mileageData.from} to ${mileageData.to}`,
        mileage_miles: mileageData.miles,
        mileage_rate: formData.mileage_rate,
        mileage_from: mileageData.from,
        mileage_to: mileageData.to,
        tax_deductible: true,
      });
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'choose':
        return 'Add Expense';
      case 'scan':
        return 'Scan Receipt';
      case 'category':
        return 'Select Category';
      case 'form':
        return selectedCategory
          ? EXPENSE_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Add Details'
          : 'Add Details';
      case 'mileage':
        return 'Log Mileage';
      default:
        return 'Add Expense';
    }
  };

  const canGoBack = step !== 'choose';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (step === 'form') {
                      setStep('category');
                    } else if (step === 'mileage') {
                      setStep('category');
                    } else {
                      setStep('choose');
                    }
                  }}
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
              <SheetDescription className="sr-only">Add a new expense by scanning a receipt or entering details manually</SheetDescription>
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
              {/* Step: Choose Method */}
              {step === 'choose' && (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-6"
                >
                  {/* Hero section */}
                  <div className="text-center pt-4 pb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-elec-yellow/20">
                      <Receipt className="h-8 w-8 text-elec-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Add New Expense</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scan a receipt or enter details manually
                    </p>
                  </div>

                  {/* Main action buttons */}
                  <div className="space-y-3">
                    {/* Scan Receipt - Primary action */}
                    <button
                      onClick={() => setStep('scan')}
                      className="w-full p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/15 to-amber-500/10 border border-elec-yellow/30 hover:border-elec-yellow/50 hover:from-elec-yellow/20 hover:to-amber-500/15 transition-all touch-manipulation active:scale-[0.98] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow/30 transition-colors">
                          <Camera className="h-7 w-7 text-elec-yellow" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">Scan Receipt</p>
                          <p className="text-sm text-muted-foreground">
                            AI extracts vendor, amount & date
                          </p>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-elec-yellow/20 text-[11px] font-semibold text-elec-yellow uppercase tracking-wide">
                          Quick
                        </div>
                      </div>
                    </button>

                    {/* Manual Entry */}
                    <button
                      onClick={() => setStep('category')}
                      className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all touch-manipulation active:scale-[0.98] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                          <PenLine className="h-7 w-7 text-white/80" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">Manual Entry</p>
                          <p className="text-sm text-muted-foreground">
                            Choose category and enter details
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Quick category access */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">
                      Quick Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {EXPENSE_CATEGORIES.slice(0, 8).map((category) => {
                        const Icon = CATEGORY_ICONS[category.id] || MoreHorizontal;
                        const colours = COLOUR_CLASSES[category.colour] || COLOUR_CLASSES['gray-500'];
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-2 rounded-full border touch-manipulation active:scale-[0.97] transition-all",
                              colours.bg,
                              colours.border
                            )}
                          >
                            <Icon className={cn("h-4 w-4 flex-shrink-0", colours.text)} />
                            <span className="text-sm font-medium text-foreground/90">
                              {category.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step: Scan Receipt */}
              {step === 'scan' && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <ExpenseReceiptScanner
                    onComplete={handleScanComplete}
                    onCancel={() => setStep('choose')}
                  />
                </motion.div>
              )}

              {/* Step: Select Category */}
              {step === 'category' && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 sm:p-6"
                >
                  <p className="text-base text-muted-foreground mb-6 text-center">
                    What type of expense is this?
                  </p>
                  <div className="space-y-2">
                    {EXPENSE_CATEGORIES.map((category) => {
                      const Icon = CATEGORY_ICONS[category.id] || MoreHorizontal;
                      const colours = COLOUR_CLASSES[category.colour] || COLOUR_CLASSES['gray-500'];

                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={cn(
                            "w-full flex items-center gap-4 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all",
                            "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]",
                            selectedCategory === category.id && "ring-2 ring-elec-yellow bg-elec-yellow/5"
                          )}
                        >
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                            colours.bg
                          )}>
                            <Icon className={cn("h-5 w-5", colours.text)} />
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
                            selectedCategory === category.id
                              ? "border-elec-yellow bg-elec-yellow"
                              : "border-white/20"
                          )}>
                            {selectedCategory === category.id && (
                              <div className="w-2 h-2 rounded-full bg-black" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step: Form */}
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
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
                        className="h-14 text-2xl font-semibold pl-8 touch-manipulation"
                        autoFocus
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
                      className="h-11 touch-manipulation"
                    />
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

                  {/* VAT Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="vat">VAT Amount (optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                        className="h-11 pl-8 touch-manipulation"
                      />
                    </div>
                  </div>

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

                  {/* AI Extracted Badge */}
                  {formData.ai_extracted && (
                    <div className="text-xs text-muted-foreground bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
                      <span className="text-blue-400">AI extracted</span> - Review the details above
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step: Mileage */}
              {step === 'mileage' && (
                <motion.div
                  key="mileage"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4"
                >
                  <ExpenseMileageForm
                    onSave={handleMileageSave}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {step === 'form' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
              <Button
                onClick={handleSubmit}
                disabled={!formData.amount || isSubmitting}
                className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
              >
                {isSubmitting ? 'Saving...' : 'Save Expense'}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
