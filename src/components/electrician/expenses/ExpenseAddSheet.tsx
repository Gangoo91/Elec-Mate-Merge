import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, PenLine, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import {
  ExpenseCategory,
  CreateExpenseInput,
  EXPENSE_CATEGORIES,
  DEFAULT_MILEAGE_RATE,
} from '@/types/expense';
import { ExpenseReceiptScanner } from './ExpenseReceiptScanner';
import { ExpenseMileageForm } from './ExpenseMileageForm';
import { chipBase, chipOff, eyebrowCn } from '@/components/shared/surfaceStyles';
import { cardCn, inputCn, labelCn, selectTriggerCn, textareaCn } from '@/components/forms/fieldStyles';
import { EVSectionHeader as SectionHeader } from '@/components/inspection/ev-charging/EVSectionHeader';
import { calculateMileageClaim, taxYearStart } from '@/types/expense';
import { cn } from '@/lib/utils';
import { sanitizeMoneyInput, parseMoney, moneyToText } from '@/utils/money-input';
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
  'orange-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'amber-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'red-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'cyan-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'purple-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'green-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'teal-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'slate-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'indigo-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'pink-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'rose-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-elec-yellow',
    border: 'border-white/[0.08]',
  },
  'gray-500': {
    bg: 'bg-white/[0.05] hover:bg-white/[0.08]',
    text: 'text-white',
    border: 'border-white/[0.08]',
  },
};

type AddStep = 'choose' | 'scan' | 'category' | 'form' | 'mileage';

// Sentinel for the "No project" option — Radix Select can't use an empty value.
const NO_PROJECT = 'none';

interface ExpenseAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (expense: CreateExpenseInput) => Promise<void>;
  /** Pre-selects a project in the picker (e.g. when opened from a project page). */
  defaultProjectId?: string;
  /** When true, the project is fixed to defaultProjectId and the picker is hidden. */
  lockProject?: boolean;
  /**
   * Business miles already claimed in the current tax year. Passed in rather
   * than fetched here so the sheet stays presentational and there is only one
   * definition of "this tax year" (see `taxYearStart`).
   */
  milesClaimedThisTaxYear?: number;
}

export function ExpenseAddSheet({
  open,
  onOpenChange,
  milesClaimedThisTaxYear = 0,
  onSave,
  defaultProjectId,
  lockProject = false,
}: ExpenseAddSheetProps) {
  // Projects for the optional "Project" picker — own list, by title.
  const { projects } = useSparkProjects('all');
  const [projectId, setProjectId] = useState<string>(defaultProjectId ?? NO_PROJECT);

  // Keep the picker in sync if the caller's default changes (e.g. project page).
  useEffect(() => {
    setProjectId(defaultProjectId ?? NO_PROJECT);
  }, [defaultProjectId]);
  const [step, setStep] = useState<AddStep>('choose');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [formData, setFormData] = useState<Partial<CreateExpenseInput>>({
    date: new Date().toISOString().split('T')[0],
    tax_deductible: true,
    mileage_rate: DEFAULT_MILEAGE_RATE,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Raw text mirrors for the money fields so partial decimals (e.g. "19.")
  // survive editing — the bound numeric value alone can't hold them.
  const [amountText, setAmountText] = useState('');
  const [vatText, setVatText] = useState('');

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('choose');
      setSelectedCategory(null);
      setAmountText('');
      setVatText('');
      setProjectId(defaultProjectId ?? NO_PROJECT);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        tax_deductible: true,
        mileage_rate: DEFAULT_MILEAGE_RATE,
      });
    }, 300);
  };

  const handleCategorySelect = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setFormData((prev) => ({ ...prev, category }));

    if (category === 'mileage') {
      setStep('mileage');
    } else {
      setAmountText('');
      setVatText('');
      setStep('form');
    }
  };

  const handleScanComplete = (extractedData: Partial<CreateExpenseInput>) => {
    setFormData((prev) => ({
      ...prev,
      ...extractedData,
      ai_extracted: true,
    }));
    if (extractedData.category) {
      setSelectedCategory(extractedData.category);
    }
    // Seed the text mirrors from the scanned values so the form shows them.
    setAmountText(moneyToText(extractedData.amount));
    setVatText(moneyToText(extractedData.vat_amount));
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
        project_id: projectId === NO_PROJECT ? null : projectId,
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
    // Banded, exactly as the form quoted it — a flat 45p here would have
    // written a different number to the one the user just agreed to.
    const claim = calculateMileageClaim(mileageData.miles, milesClaimedThisTaxYear);
    const amount = claim.amount;
    setIsSubmitting(true);
    try {
      await onSave({
        category: 'mileage',
        amount: Math.round(amount * 100) / 100,
        date: mileageData.date,
        vendor: null,
        description: mileageData.description || `${mileageData.from} to ${mileageData.to}`,
        project_id: projectId === NO_PROJECT ? null : projectId,
        mileage_miles: mileageData.miles,
        // The effective rate for THIS journey. Stored rather than assumed, so a
        // claim that straddled the 10,000-mile threshold can still be explained.
        mileage_rate: mileageData.miles > 0 ? claim.amount / mileageData.miles : DEFAULT_MILEAGE_RATE,
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
          ? EXPENSE_CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Add Details'
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto [&>button]:hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header — back (left) · title (centre) · close (right) */}
          <SheetHeader className="px-2 py-2.5 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center gap-1">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep(step === 'form' || step === 'mileage' ? 'category' : 'choose')}
                  className="h-10 w-10 shrink-0 touch-manipulation text-white/70 hover:text-white"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="w-10 shrink-0" />
              )}
              <SheetTitle className="text-[17px] font-semibold flex-1 text-center px-1 tracking-tight">
                {getStepTitle()}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Add a new expense by scanning a receipt or entering details manually
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 shrink-0 touch-manipulation text-white/70 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
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
                  className="p-4 space-y-4"
                >
                  {/* Two ways in, told apart by type and by which one is yellow
                      — not by a coloured tile each. 125 of the 179 expenses on
                      record came from the scanner, so it leads. */}
                  <button
                    onClick={() => setStep('scan')}
                    className="w-full rounded-2xl border border-elec-yellow/40 bg-elec-yellow/[0.10] p-4 text-left transition-colors hover:bg-elec-yellow/[0.14] touch-manipulation active:scale-[0.99]"
                  >
                    <p className="text-[15px] font-semibold tracking-tight text-white">
                      Scan a receipt
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                      Vendor, amount, VAT and date filled in for you
                    </p>
                  </button>

                  <button
                    onClick={() => setStep('category')}
                    className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 text-left transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.99]"
                  >
                    <p className="text-[15px] font-semibold tracking-tight text-white">
                      Enter it yourself
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                      Pick a category and fill in the details
                    </p>
                  </button>

                  {/* Quick add — chips, not a grid of icon tiles. */}
                  <div className="border-t border-white/[0.10] pt-4">
                    <p className={cn(eyebrowCn, 'mb-3')}>Quick add</p>
                    <div className="flex flex-wrap gap-2">
                      {EXPENSE_CATEGORIES.slice(0, 8).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={cn(chipBase, chipOff)}
                        >
                          {category.label}
                        </button>
                      ))}
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
                  <p className="mb-4 text-[15px] font-semibold tracking-tight text-white">
                    What kind of expense is it?
                  </p>
                  {/* Twelve categories, each previously with its own coloured
                      tile — a paint chart to read one word off. Type only. */}
                  <div className="overflow-hidden rounded-2xl border border-white/[0.12] divide-y divide-white/[0.10]">
                    {EXPENSE_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={cn(
                          'flex h-14 w-full items-center gap-3 px-4 text-left transition-colors touch-manipulation',
                          selectedCategory === category.id
                            ? 'bg-elec-yellow/[0.12]'
                            : 'bg-white/[0.03] hover:bg-white/[0.06]'
                        )}
                      >
                        <span className="flex-1 text-[14px] font-medium text-white">
                          {category.label}
                          {category.taxNote && (
                            <span className="ml-2 text-[12px] text-white">
                              ({category.taxNote})
                            </span>
                          )}
                        </span>
                        {selectedCategory === category.id && (
                          <span className="text-[12px] font-semibold text-elec-yellow">
                            Selected
                          </span>
                        )}
                      </button>
                    ))}
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
                  className="p-4"
                >
                  {/* Fields sit inside the bright card surface, under a plain
                      type heading — the same composition as the EV charging
                      form, which is the reference implementation. */}
                  <div className={cardCn}>
                    <SectionHeader title="Expense details" />
                  <div>
                    <label className={labelCn} htmlFor="amount">
                      Amount (£)
                    </label>
                    <input
                      id="amount"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={amountText}
                      onChange={(e) => {
                        const v = sanitizeMoneyInput(e.target.value);
                        setAmountText(v);
                        setFormData((prev) => ({ ...prev, amount: parseMoney(v) }));
                      }}
                      className={cn(inputCn, 'text-[22px] font-bold')}
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className={labelCn} htmlFor="date">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className={inputCn}
                    />
                    {formData.date && (
                      <p className="mt-1 text-[12px] text-white">
                        {format(new Date(formData.date), 'EEEE d MMMM yyyy')}
                      </p>
                    )}
                  </div>

                  {!lockProject && (
                    <div>
                      <label className={labelCn} htmlFor="project">
                        Job
                      </label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger id="project" className={selectTriggerCn}>
                          <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] border-white/[0.12] bg-neutral-900 text-white">
                          <SelectItem value={NO_PROJECT}>None</SelectItem>
                          {projects.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className={labelCn} htmlFor="vendor">
                      Where from
                    </label>
                    <input
                      id="vendor"
                      placeholder="Screwfix, Shell, Toolstation"
                      value={formData.vendor || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vendor: e.target.value }))}
                      className={inputCn}
                    />
                  </div>

                  <div>
                    <label className={labelCn} htmlFor="description">
                      What it was for
                    </label>
                    <textarea
                      id="description"
                      placeholder="Optional"
                      value={formData.description || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className={textareaCn}
                    />
                  </div>

                  <div>
                    <label className={labelCn} htmlFor="vat">
                      VAT (£)
                    </label>
                    <input
                      id="vat"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={vatText}
                      onChange={(e) => {
                        const v = sanitizeMoneyInput(e.target.value);
                        setVatText(v);
                        setFormData((prev) => ({ ...prev, vat_amount: parseMoney(v) }));
                      }}
                      className={inputCn}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.10] pt-4">
                    <div className="min-w-0 pr-4">
                      <p className="text-[14px] font-medium text-white">Tax deductible</p>
                      <p className="mt-0.5 text-[12px] text-white">
                        Counts towards what comes off your tax bill
                      </p>
                    </div>
                    <Switch
                      checked={formData.tax_deductible ?? true}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, tax_deductible: checked }))
                      }
                    />
                  </div>

                  {formData.ai_extracted && (
                    <p className="text-[12px] leading-snug text-white">
                      Read off the receipt — check the figures before you save.
                    </p>
                  )}
                  </div>
                </motion.div>
              )}

              {/* Step: Mileage */}
              {step === 'mileage' && (
                <motion.div
                  key="mileage"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  {!lockProject && (
                    <div className="space-y-2">
                      <label className={labelCn} htmlFor="project-mileage">Job</label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger id="project-mileage" className={selectTriggerCn}>
                          <SelectValue placeholder="No project" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value={NO_PROJECT}>No project</SelectItem>
                          {projects.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <ExpenseMileageForm
                    onSave={handleMileageSave}
                    isSubmitting={isSubmitting}
                    milesClaimedThisTaxYear={milesClaimedThisTaxYear}
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
