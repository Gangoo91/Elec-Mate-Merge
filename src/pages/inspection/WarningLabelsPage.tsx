import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateWarningLabelsPdf, type LabelForPdf } from '@/utils/generate-warning-labels-pdf';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

interface LabelDef {
  id: string;
  title: string;
  text: string;
  colour: string;
  regulation?: string;
  hasDateField?: boolean;
  hasCustomText?: boolean;
  hasTestedByField?: boolean;
  category: 'warning' | 'testing' | 'cable' | 'custom';
}

const allLabels: LabelDef[] = [
  { id: 'safety-connection', title: 'Safety Electrical Connection', text: 'SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE', colour: 'safe', regulation: 'Reg. 514.13', category: 'warning' },
  { id: 'dual-supply', title: 'Dual Supply Warning', text: 'CAUTION — DUAL SUPPLY', colour: 'warning', regulation: 'Reg. 514.15', category: 'warning' },
  { id: 'danger-400v', title: 'Danger — 400 Volts', text: 'DANGER — 400 VOLTS', colour: 'danger', regulation: 'Reg. 514.10', category: 'warning' },
  { id: 'danger-230v', title: 'Danger — 230 Volts', text: 'DANGER — 230 VOLTS', colour: 'danger', regulation: 'Reg. 514.10', category: 'warning' },
  { id: 'isolate-before-opening', title: 'Isolate Before Opening', text: 'WARNING — ISOLATE SUPPLY BEFORE OPENING', colour: 'warning', regulation: 'Reg. 514.12', category: 'warning' },
  { id: 'rcd-test', title: 'RCD Test Quarterly', text: 'RCD PROTECTION — TEST QUARTERLY', colour: 'mandatory', regulation: 'Reg. 514.12', category: 'warning' },
  { id: 'solar-supply', title: 'Solar PV / Dual Supply', text: 'CAUTION — SOLAR PV SUPPLY — DUAL SUPPLY', colour: 'warning', regulation: 'Reg. 514.15', category: 'warning' },
  { id: 'battery-supply', title: 'Battery / UPS Supply', text: 'CAUTION — BATTERY / UPS SUPPLY', colour: 'warning', regulation: 'Reg. 514.15', category: 'warning' },
  { id: 'generator-supply', title: 'Generator Supply', text: 'CAUTION — ALTERNATIVE SUPPLY (GENERATOR)', colour: 'warning', regulation: 'Reg. 514.15', category: 'warning' },
  { id: 'periodic-inspection', title: 'Periodic Inspection Due', text: 'PERIODIC INSPECTION DUE', colour: 'mandatory', regulation: 'Reg. 514.12', hasDateField: true, category: 'testing' },
  { id: 'pat-tested', title: 'PAT Tested', text: 'PAT TESTED', colour: 'safe', hasDateField: true, hasTestedByField: true, category: 'testing' },
  { id: 'pat-failed', title: 'PAT Failed — Do Not Use', text: 'FAILED — DO NOT USE', colour: 'danger', hasDateField: true, category: 'testing' },
  { id: 'equipment-tested', title: 'Equipment Tested', text: 'TESTED', colour: 'safe', hasDateField: true, hasTestedByField: true, category: 'testing' },
  { id: 'out-of-service', title: 'Out of Service', text: 'OUT OF SERVICE — DO NOT USE', colour: 'danger', category: 'testing' },
  { id: 'emergency-lighting-tested', title: 'Emergency Lighting Tested', text: 'EMERGENCY LIGHTING TESTED', colour: 'safe', hasDateField: true, category: 'testing' },
  { id: 'cable-l1', title: 'L1 (Brown)', text: 'L1', colour: 'cable-brown', category: 'cable' },
  { id: 'cable-l2', title: 'L2 (Black)', text: 'L2', colour: 'cable-black', category: 'cable' },
  { id: 'cable-l3', title: 'L3 (Grey)', text: 'L3', colour: 'cable-grey', category: 'cable' },
  { id: 'cable-n', title: 'Neutral (Blue)', text: 'N', colour: 'mandatory', category: 'cable' },
  { id: 'cable-e', title: 'Earth (Green/Yellow)', text: 'E', colour: 'cable-green', category: 'cable' },
  { id: 'cable-circuit', title: 'Circuit Number', text: '', colour: 'mandatory', hasCustomText: true, category: 'cable' },
  { id: 'custom', title: 'Custom Warning Label', text: '', colour: 'warning', hasCustomText: true, category: 'custom' },
  { id: 'custom-danger', title: 'Custom Danger Label', text: '', colour: 'danger', hasCustomText: true, category: 'custom' },
  { id: 'custom-mandatory', title: 'Custom Mandatory Label', text: '', colour: 'mandatory', hasCustomText: true, category: 'custom' },
];

const colourStyles: Record<string, { bg: string; text: string; border: string }> = {
  danger: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-500' },
  warning: { bg: 'bg-yellow-400', text: 'text-black', border: 'border-yellow-500' },
  mandatory: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-500' },
  safe: { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-500' },
  'cable-brown': { bg: 'bg-amber-800', text: 'text-white', border: 'border-amber-900' },
  'cable-black': { bg: 'bg-neutral-900', text: 'text-white', border: 'border-neutral-800' },
  'cable-grey': { bg: 'bg-neutral-500', text: 'text-white', border: 'border-neutral-600' },
  'cable-green': { bg: 'bg-lime-600', text: 'text-black', border: 'border-yellow-500' },
};

const labelCategories = [
  { key: 'warning' as const, title: 'BS 7671 Warning Labels', description: 'Mandatory warning and safety labels' },
  { key: 'testing' as const, title: 'Testing & Inspection', description: 'Test due dates, PAT labels, inspection stickers' },
  { key: 'cable' as const, title: 'Cable & Circuit ID', description: 'Phase identification and circuit marking' },
  { key: 'custom' as const, title: 'Custom Labels', description: 'Create your own labels in any colour' },
];

interface SelectedLabel {
  labelId: string;
  quantity: number;
  customText?: string;
  nextTestDate?: string;
  testedBy?: string;
}

export default function WarningLabelsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<SelectedLabel[]>([]);

  const getSelectedForLabel = (id: string) => selected.find((s) => s.labelId === id);
  const toggleLabel = (id: string) => {
    setSelected((prev) => prev.find((s) => s.labelId === id) ? prev.filter((s) => s.labelId !== id) : [...prev, { labelId: id, quantity: 1 }]);
  };
  const updateQuantity = (id: string, delta: number) => {
    setSelected((prev) => prev.map((s) => s.labelId === id ? { ...s, quantity: Math.max(1, Math.min(20, s.quantity + delta)) } : s));
  };
  const updateField = (id: string, field: 'customText' | 'nextTestDate' | 'testedBy', value: string) => {
    setSelected((prev) => prev.map((s) => s.labelId === id ? { ...s, [field]: value } : s));
  };

  const totalLabels = selected.reduce((sum, s) => sum + s.quantity, 0);

  const handleGenerate = async () => {
    if (totalLabels === 0) { toast.error('Select at least one label'); return; }
    const labelsForPdf: LabelForPdf[] = selected.map((sel) => {
      const def = allLabels.find((l) => l.id === sel.labelId)!;
      return { text: def.text, colour: def.colour, regulation: def.regulation, quantity: sel.quantity, customText: sel.customText, nextTestDate: sel.nextTestDate };
    });
    try {
      const blob = generateWarningLabelsPdf(labelsForPdf);
      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      const url = URL.createObjectURL(blob);
      await openOrDownloadPdf(url, `Warning-Labels-${Date.now()}.pdf`);
      URL.revokeObjectURL(url);
      toast.success(`${totalLabels} label${totalLabels !== 1 ? 's' : ''} generated`);
    } catch (err) {
      console.error('Label PDF error:', err);
      toast.error('Failed to generate labels');
    }
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
              <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-elec-yellow/15 text-elec-yellow">{totalLabels} selected</span>
            )}
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-4 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="border-b border-white/[0.06] pb-3">
          <p className="text-sm font-semibold text-white">Printable Labels</p>
          <p className="text-xs text-white mt-1">Select labels and quantities. Generates a printable A4 sheet with cut lines. Use on self-adhesive label paper (Avery L7163) or print on plain A4 and cut to size.</p>
        </motion.div>

        {labelCategories.map((cat) => {
          const catLabels = allLabels.filter((l) => l.category === cat.key);
          return (
            <motion.div key={cat.key} variants={itemVariants} className="space-y-3">
              <div className="border-b border-white/[0.06] pb-1">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">{cat.title}</h3>
                <p className="text-[11px] text-white mt-0.5">{cat.description}</p>
              </div>
              {catLabels.map((label) => {
                const sel = getSelectedForLabel(label.id);
                const isSelected = !!sel;
                const style = colourStyles[label.colour] || colourStyles.warning;

                return (
                  <div key={label.id} className={cn('rounded-2xl border overflow-hidden transition-all', isSelected ? 'border-elec-yellow/30 bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.02]')}>
                    <button onClick={() => toggleLabel(label.id)} className="w-full flex items-center gap-3.5 p-4 text-left touch-manipulation active:bg-white/[0.04] transition-colors">
                      <div className={cn('flex-shrink-0 w-14 h-9 rounded-lg flex items-center justify-center border-2', style.bg, style.border)}>
                        <span className={cn('text-[6px] font-black text-center leading-tight px-1', style.text)}>{label.text || 'CUSTOM'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{label.title}</p>
                        {label.regulation && <p className="text-[11px] text-white mt-0.5">{label.regulation}</p>}
                      </div>
                      <span className={cn('text-[11px] font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all touch-manipulation', isSelected ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] border border-white/[0.08] text-white')}>
                        {isSelected ? 'Added' : 'Add'}
                      </span>
                    </button>
                    {isSelected && (
                      <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-3">
                        <div className="flex items-center gap-3">
                          <Label className="text-white text-xs flex-1">Quantity</Label>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(label.id, -1)} className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"><Minus className="w-3.5 h-3.5 text-white" /></button>
                            <span className="w-8 text-center text-sm font-semibold text-white">{sel?.quantity}</span>
                            <button onClick={() => updateQuantity(label.id, 1)} className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"><Plus className="w-3.5 h-3.5 text-white" /></button>
                          </div>
                        </div>
                        {label.hasDateField && (
                          <div><Label className="text-white text-xs">Date</Label><Input type="date" value={sel?.nextTestDate || ''} onChange={(e) => updateField(label.id, 'nextTestDate', e.target.value)} className={cn(inputCn, '[color-scheme:dark]')} /></div>
                        )}
                        {label.hasTestedByField && (
                          <div><Label className="text-white text-xs">Tested By</Label><Input value={sel?.testedBy || ''} onChange={(e) => updateField(label.id, 'testedBy', e.target.value)} className={inputCn} placeholder="Name" /></div>
                        )}
                        {label.hasCustomText && (
                          <div><Label className="text-white text-xs">Label Text</Label><Input value={sel?.customText || ''} onChange={(e) => updateField(label.id, 'customText', e.target.value)} className={inputCn} placeholder="Enter label text..." /></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {totalLabels > 0 && <div className="h-20" />}
      </motion.main>

      {/* Sticky generate button */}
      {totalLabels > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <Button className="w-full h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90 shadow-lg shadow-elec-yellow/20" onClick={handleGenerate}>
              Generate PDF — {totalLabels} label{totalLabels !== 1 ? 's' : ''} selected
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
