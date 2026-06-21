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
import { Label } from '@/components/ui/label';
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
    bg: 'bg-orange-500/15 hover:bg-orange-500/25',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  'amber-500': {
    bg: 'bg-amber-500/15 hover:bg-amber-500/25',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  'red-500': {
    bg: 'bg-red-500/15 hover:bg-red-500/25',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  'cyan-500': {
    bg: 'bg-cyan-500/15 hover:bg-cyan-500/25',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'purple-500': {
    bg: 'bg-purple-500/15 hover:bg-purple-500/25',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  'green-500': {
    bg: 'bg-green-500/15 hover:bg-green-500/25',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  'teal-500': {
    bg: 'bg-teal-500/15 hover:bg-teal-500/25',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
  },
  'slate-500': {
    bg: 'bg-slate-500/15 hover:bg-slate-500/25',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
  },
  'indigo-500': {
    bg: 'bg-indigo-500/15 hover:bg-indigo-500/25',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
  },
  'pink-500': {
    bg: 'bg-pink-500/15 hover:bg-pink-500/25',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
  },
  'rose-500': {
    bg: 'bg-rose-500/15 hover:bg-rose-500/25',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
  },
  'gray-500': {
    bg: 'bg-gray-500/15 hover:bg-gray-500/25',
    text: 'text-white',
    border: 'border-gray-500/30',
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
}

export function ExpenseAddSheet({
  open,
  onOpenChange,
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
    const amount = mileageData.miles * (formData.mileage_rate || DEFAULT_MILEAGE_RATE);
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
                  <p className="text-[13px] text-white/55 leading-snug px-0.5">
                    Snap a receipt and let AI fill in the details, or log it yourself.
                  </p>

                  {/* Scan — AI hero (primary action) */}
                  <button
                    onClick={() => setStep('scan')}
                    className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/[0.16] to-amber-500/[0.05] border border-elec-yellow/30 hover:border-elec-yellow/50 transition-all touch-manipulation active:scale-[0.98] group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0 group-hover:bg-elec-yellow/30 transition-colors">
                        <Camera className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[15px] text-white">Scan a receipt</p>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/20 text-[10px] font-bold text-elec-yellow uppercase tracking-wide">
                            <Sparkles className="h-3 w-3" /> AI
                          </span>
                        </div>
                        <p className="text-[12.5px] text-white/60 mt-0.5 leading-snug">
                          Vendor, amount, VAT &amp; date — filled automatically
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-elec-yellow/60 shrink-0" />
                    </div>
                  </button>

                  {/* Manual entry (secondary) */}
                  <button
                    onClick={() => setStep('category')}
                    className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all touch-manipulation active:scale-[0.98] group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-white/[0.12] transition-colors">
                        <PenLine className="h-6 w-6 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[15px] text-white">Enter manually</p>
                        <p className="text-[12.5px] text-white/60 mt-0.5 leading-snug">
                          Pick a category and add the details
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/30 shrink-0" />
                    </div>
                  </button>

                  {/* Quick add — jump straight to a category */}
                  <div className="pt-3 mt-1 border-t border-white/[0.06]">
                    <p className="text-[11px] text-white/45 mb-3 uppercase tracking-[0.14em] font-semibold">
                      Quick add
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {EXPENSE_CATEGORIES.slice(0, 8).map((category) => {
                        const Icon = CATEGORY_ICONS[category.id] || MoreHorizontal;
                        const colours =
                          COLOUR_CLASSES[category.colour] || COLOUR_CLASSES['gray-500'];
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={cn(
                              'flex items-center gap-2.5 px-3 h-12 rounded-xl border bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.97] transition-all',
                              colours.border
                            )}
                          >
                            <span
                              className={cn(
                                'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                                colours.bg
                              )}
                            >
                              <Icon className={cn('h-4 w-4', colours.text)} />
                            </span>
                            <span className="text-[13.5px] font-medium text-white/90 truncate">
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
                  <p className="text-base text-white mb-6 text-center">
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
                            'w-full flex items-center gap-4 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                            'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15]',
                            selectedCategory === category.id &&
                              'ring-2 ring-elec-yellow bg-elec-yellow/5'
                          )}
                        >
                          <div
                            className={cn(
                              'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                              colours.bg
                            )}
                          >
                            <Icon className={cn('h-5 w-5', colours.text)} />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium text-foreground">{category.label}</span>
                            {category.taxNote && (
                              <span className="text-xs text-white ml-2">
                                ({category.taxNote})
                              </span>
                            )}
                          </div>
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                              selectedCategory === category.id
                                ? 'border-elec-yellow bg-elec-yellow'
                                : 'border-white/20'
                            )}
                          >
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
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-white">£</span>
                      <Input
                        id="amount"
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={amountText}
                        onChange={(e) => {
                          const s = sanitizeMoneyInput(e.target.value);
                          setAmountText(s);
                          setFormData((prev) => ({ ...prev, amount: parseMoney(s) }));
                        }}
                        className="h-14 text-2xl font-semibold touch-manipulation flex-1"
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className="h-12 touch-manipulation text-base"
                    />
                    {formData.date && (
                      <p className="text-sm text-elec-yellow font-medium">
                        {format(new Date(formData.date), 'EEEE, d MMMM yyyy')}
                      </p>
                    )}
                  </div>

                  {/* Project (optional) */}
                  {!lockProject && (
                    <div className="space-y-2">
                      <Label htmlFor="project">Project (optional)</Label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger
                          id="project"
                          className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2"
                        >
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

                  {/* Vendor */}
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor / Store</Label>
                    <Input
                      id="vendor"
                      placeholder="e.g. Screwfix, Shell, Toolstation"
                      value={formData.vendor || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vendor: e.target.value }))}
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
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="touch-manipulation min-h-[80px]"
                    />
                  </div>

                  {/* VAT Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="vat">VAT Amount (optional)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-white">£</span>
                      <Input
                        id="vat"
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={vatText}
                        onChange={(e) => {
                          const s = sanitizeMoneyInput(e.target.value);
                          setVatText(s);
                          setFormData((prev) => ({ ...prev, vat_amount: parseMoney(s) }));
                        }}
                        className="h-11 touch-manipulation flex-1"
                      />
                    </div>
                  </div>

                  {/* Tax Deductible Toggle */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label>Tax Deductible</Label>
                      <p className="text-xs text-white">
                        Include in tax deduction calculations
                      </p>
                    </div>
                    <Switch
                      checked={formData.tax_deductible ?? true}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, tax_deductible: checked }))
                      }
                    />
                  </div>

                  {/* AI Extracted Badge */}
                  {formData.ai_extracted && (
                    <div className="text-xs text-white bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
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
                  className="p-4 space-y-4"
                >
                  {!lockProject && (
                    <div className="space-y-2">
                      <Label htmlFor="project-mileage">Project (optional)</Label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger
                          id="project-mileage"
                          className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2"
                        >
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
                  <ExpenseMileageForm onSave={handleMileageSave} isSubmitting={isSubmitting} />
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
