import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateWarningLabelsPdf, type LabelForPdf } from '@/utils/generate-warning-labels-pdf';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-[12px] font-medium text-white mb-1 block">{label}</Label>
    {children}
  </div>
);

export default function WarningLabelsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<SelectedLabel[]>([]);
  const [activeCategory, setActiveCategory] = useState<'warning' | 'testing' | 'cable' | 'custom'>('warning');

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

  const activeCat = labelCategories.find((c) => c.key === activeCategory);
  const filteredLabels = allLabels.filter((l) => l.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 pt-3 pb-1 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-[1600px]">
          <button
            onClick={() => navigate(-1)}
            className="h-11 pr-2 text-[13px] font-semibold text-white/90 transition-colors hover:text-white touch-manipulation"
          >
            Back
          </button>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">Warning Labels</h1>
              <p className="mt-1 text-[13px] text-white/50">
                <span className="font-semibold text-elec-yellow">Printable BS 7671 labels.</span> Select labels and quantities — generates an A4 sheet with cut lines for self-adhesive label paper (Avery L7163) or plain A4.
              </p>
            </div>
            {totalLabels > 0 && (
              <span className="pb-0.5 text-[13px] font-semibold text-elec-yellow whitespace-nowrap">{totalLabels} selected</span>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-4 pb-40 space-y-5 lg:max-w-[1600px] lg:px-8">
        {/* Category toggles */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {labelCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'h-11 rounded-xl px-2 text-[12px] transition-all touch-manipulation active:scale-[0.98]',
                activeCategory === cat.key
                  ? 'bg-elec-yellow border border-elec-yellow font-semibold text-black'
                  : 'bg-white/[0.06] border border-white/[0.1] font-medium text-white'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active category */}
        <div className="space-y-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-white">{activeCat?.title}</h2>
            <p className="mt-1 text-[12.5px] text-white/90">{activeCat?.description}</p>
          </div>

          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
            {filteredLabels.map((label) => {
              const sel = getSelectedForLabel(label.id);
              const isSelected = !!sel;
              const style = colourStyles[label.colour] || colourStyles.warning;

              return (
                <div
                  key={label.id}
                  className={cn(
                    'rounded-xl border overflow-hidden transition-all',
                    isSelected ? 'border-elec-yellow bg-white/[0.05]' : 'border-white/[0.1] bg-white/[0.03]'
                  )}
                >
                  <button
                    onClick={() => toggleLabel(label.id)}
                    className="w-full flex items-center gap-3.5 p-3.5 text-left touch-manipulation active:bg-white/[0.04] transition-colors"
                  >
                    <div className={cn('flex-shrink-0 w-14 h-9 rounded-lg flex items-center justify-center border-2', style.bg, style.border)}>
                      <span className={cn('text-[6px] font-black text-center leading-tight px-1', style.text)}>{label.text || 'CUSTOM'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{label.title}</p>
                      {label.regulation && <p className="text-[12px] text-white/85 mt-0.5">{label.regulation}</p>}
                    </div>
                    <span
                      className={cn(
                        'text-[12px] font-semibold px-3.5 py-2 rounded-lg flex-shrink-0 transition-all',
                        isSelected ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] border border-white/[0.1] text-white'
                      )}
                    >
                      {isSelected ? 'Added' : 'Add'}
                    </span>
                  </button>
                  {isSelected && (
                    <div className="px-3.5 pb-3.5 space-y-3 border-t border-white/[0.1] pt-3">
                      <div className="flex items-center gap-3">
                        <Label className="text-[13px] font-medium text-white flex-1">Quantity</Label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(label.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-lg font-semibold text-white touch-manipulation active:scale-[0.95]"
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-white">{sel?.quantity}</span>
                          <button
                            onClick={() => updateQuantity(label.id, 1)}
                            aria-label="Increase quantity"
                            className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-lg font-semibold text-white touch-manipulation active:scale-[0.95]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {label.hasDateField && (
                        <Field label="Date"><Input type="date" value={sel?.nextTestDate || ''} onChange={(e) => updateField(label.id, 'nextTestDate', e.target.value)} className={inputCn} /></Field>
                      )}
                      {label.hasTestedByField && (
                        <Field label="Tested By"><Input value={sel?.testedBy || ''} onChange={(e) => updateField(label.id, 'testedBy', e.target.value)} className={inputCn} placeholder="Name" /></Field>
                      )}
                      {label.hasCustomText && (
                        <Field label="Label Text"><Input value={sel?.customText || ''} onChange={(e) => updateField(label.id, 'customText', e.target.value)} className={inputCn} placeholder="Enter label text..." /></Field>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Fixed generate button */}
      {totalLabels > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-white/[0.12] px-4 py-3 lg:px-8">
          <div className="mx-auto max-w-3xl lg:max-w-[1600px] lg:flex lg:justify-end">
            <button
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation lg:w-auto lg:px-10"
              onClick={handleGenerate}
            >
              Generate PDF — {totalLabels} label{totalLabels !== 1 ? 's' : ''} selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
