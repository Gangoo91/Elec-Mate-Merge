import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface LabelDef {
  id: string;
  title: string;
  text: string;
  colour: 'danger' | 'warning' | 'mandatory' | 'safe';
  regulation?: string;
  hasDateField?: boolean;
  hasCustomText?: boolean;
}

const standardLabels: LabelDef[] = [
  {
    id: 'safety-connection',
    title: 'Safety Electrical Connection',
    text: 'SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE',
    colour: 'safe',
    regulation: 'Reg. 514.13',
  },
  {
    id: 'dual-supply',
    title: 'Dual Supply Warning',
    text: 'CAUTION — DUAL SUPPLY',
    colour: 'warning',
    regulation: 'Reg. 514.15',
  },
  {
    id: 'danger-400v',
    title: 'Danger — 400 Volts',
    text: 'DANGER — 400 VOLTS',
    colour: 'danger',
    regulation: 'Reg. 514.10',
  },
  {
    id: 'isolate-before-opening',
    title: 'Isolate Before Opening',
    text: 'WARNING — ISOLATE SUPPLY BEFORE OPENING',
    colour: 'warning',
    regulation: 'Reg. 514.12',
  },
  {
    id: 'rcd-test',
    title: 'RCD Test Quarterly',
    text: 'RCD PROTECTION — TEST QUARTERLY',
    colour: 'mandatory',
    regulation: 'Reg. 514.12',
  },
  {
    id: 'periodic-inspection',
    title: 'Periodic Inspection Due',
    text: 'PERIODIC INSPECTION DUE',
    colour: 'mandatory',
    regulation: 'Reg. 514.12',
    hasDateField: true,
  },
  {
    id: 'custom',
    title: 'Custom Label',
    text: '',
    colour: 'warning',
    hasCustomText: true,
  },
];

const colourStyles: Record<string, { bg: string; text: string; border: string }> = {
  danger: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-500' },
  warning: { bg: 'bg-yellow-400', text: 'text-black', border: 'border-yellow-500' },
  mandatory: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-500' },
  safe: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-500' },
};

interface SelectedLabel {
  labelId: string;
  quantity: number;
  customText?: string;
  nextTestDate?: string;
}

export default function WarningLabelsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<SelectedLabel[]>([]);

  const getSelectedForLabel = (id: string) => selected.find((s) => s.labelId === id);

  const toggleLabel = (id: string) => {
    setSelected((prev) => {
      const exists = prev.find((s) => s.labelId === id);
      if (exists) return prev.filter((s) => s.labelId !== id);
      return [...prev, { labelId: id, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((s) => s.labelId === id ? { ...s, quantity: Math.max(1, Math.min(20, s.quantity + delta)) } : s)
    );
  };

  const updateField = (id: string, field: 'customText' | 'nextTestDate', value: string) => {
    setSelected((prev) =>
      prev.map((s) => s.labelId === id ? { ...s, [field]: value } : s)
    );
  };

  const totalLabels = selected.reduce((sum, s) => sum + s.quantity, 0);

  const handleGenerate = () => {
    if (totalLabels === 0) { toast.error('Select at least one label'); return; }
    toast.success(`${totalLabels} label${totalLabels !== 1 ? 's' : ''} ready — PDF generation coming soon`);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Warning Labels</h1>
            </div>
            {totalLabels > 0 && (
              <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-elec-yellow/15 text-elec-yellow">
                {totalLabels} selected
              </span>
            )}
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-2xl mx-auto">
        <motion.div variants={itemVariants} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
          <p className="text-sm font-semibold text-white">BS 7671 Warning Labels</p>
          <p className="text-xs text-white mt-1">Select labels to generate a printable A4 sheet. Labels are sized for standard self-adhesive label paper.</p>
        </motion.div>

        {/* Label cards */}
        <motion.section variants={itemVariants} className="space-y-3">
          {standardLabels.map((label) => {
            const sel = getSelectedForLabel(label.id);
            const isSelected = !!sel;
            const style = colourStyles[label.colour];

            return (
              <motion.div key={label.id} variants={itemVariants}>
                <div className={cn(
                  'rounded-2xl border overflow-hidden transition-all',
                  isSelected ? 'border-elec-yellow/30 bg-white/[0.06]' : 'border-white/[0.06] bg-white/[0.04]'
                )}>
                  {/* Label preview + toggle */}
                  <button
                    onClick={() => toggleLabel(label.id)}
                    className="w-full flex items-center gap-3.5 p-4 text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                  >
                    {/* Mini label preview */}
                    <div className={cn(
                      'flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center border-2',
                      style.bg, style.border
                    )}>
                      <span className={cn('text-[7px] font-black text-center leading-tight px-1', style.text)}>
                        {label.text || 'CUSTOM'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{label.title}</p>
                      {label.regulation && (
                        <p className="text-[11px] text-white mt-0.5">{label.regulation}</p>
                      )}
                    </div>

                    <div className={cn(
                      'w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all',
                      isSelected
                        ? 'bg-elec-yellow border-elec-yellow'
                        : 'bg-white/[0.05] border-white/[0.15]'
                    )}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                  </button>

                  {/* Expanded controls */}
                  {isSelected && (
                    <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <Label className="text-white text-xs flex-1">Quantity</Label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(label.id, -1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]">
                            <Minus className="w-3.5 h-3.5 text-white" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-white">{sel?.quantity}</span>
                          <button onClick={() => updateQuantity(label.id, 1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]">
                            <Plus className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Date field for periodic inspection */}
                      {label.hasDateField && (
                        <div>
                          <Label className="text-white text-xs">Next Test Date</Label>
                          <Input
                            type="date"
                            value={sel?.nextTestDate || ''}
                            onChange={(e) => updateField(label.id, 'nextTestDate', e.target.value)}
                            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
                          />
                        </div>
                      )}

                      {/* Custom text */}
                      {label.hasCustomText && (
                        <div>
                          <Label className="text-white text-xs">Label Text</Label>
                          <Input
                            value={sel?.customText || ''}
                            onChange={(e) => updateField(label.id, 'customText', e.target.value)}
                            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
                            placeholder="Enter custom label text..."
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Generate */}
        {totalLabels > 0 && (
          <motion.div variants={itemVariants} className="pt-2">
            <Button
              className="w-full h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleGenerate}
            >
              Generate PDF — {totalLabels} label{totalLabels !== 1 ? 's' : ''}
            </Button>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
