import { copyToClipboard } from '@/utils/clipboard';
import { useState } from 'react';
import { Plus, Trash2, Copy, Check, ChevronDown } from 'lucide-react';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInput,
  CalculatorInputGrid,
  CalculatorActions,
  CalculatorDivider,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'business' as const;
const config = CALCULATOR_CONFIG[CAT];

interface MaterialRow {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
}

interface TimeMaterialsResult {
  labourTotal: number;
  materialsTotal: number;
  markupAmount: number;
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
}

const TimeMaterialsCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [materials, setMaterials] = useState<MaterialRow[]>([
    { id: crypto.randomUUID(), name: '', quantity: 1, unitCost: 0 },
  ]);
  const [markupPercent, setMarkupPercent] = useState('15');
  const [vatRate, setVatRate] = useState('20');
  const [result, setResult] = useState<TimeMaterialsResult | null>(null);
  const [copied, setCopied] = useState(false);

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', quantity: 1, unitCost: 0 },
    ]);
  };

  const removeMaterial = (id: string) => {
    if (materials.length <= 1) return;
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMaterial = (id: string, updates: Partial<MaterialRow>) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const calculate = () => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursWorked) || 0;
    const markup = parseFloat(markupPercent) || 0;
    const vat = parseFloat(vatRate) || 0;

    const labourTotal = rate * hours;
    const materialsTotal = materials.reduce((sum, m) => sum + m.quantity * m.unitCost, 0);
    const markupAmount = materialsTotal * (markup / 100);
    const subtotal = labourTotal + materialsTotal + markupAmount;
    const vatAmount = subtotal * (vat / 100);
    const grandTotal = subtotal + vatAmount;

    setResult({ labourTotal, materialsTotal, markupAmount, subtotal, vatAmount, grandTotal });
  };

  const reset = () => {
    setHourlyRate('');
    setHoursWorked('');
    setMaterials([{ id: crypto.randomUUID(), name: '', quantity: 1, unitCost: 0 }]);
    setMarkupPercent('15');
    setVatRate('20');
    setResult(null);
    setCopied(false);
  };

  const fmt = (v: number) => `£${v.toFixed(2)}`;

  const copyToClipboard = () => {
    if (!result) return;
    const lines = [
      '--- Time & Materials Summary ---',
      `Labour: ${fmt(result.labourTotal)}`,
      `Materials: ${fmt(result.materialsTotal)}`,
      `Markup (${markupPercent}%): ${fmt(result.markupAmount)}`,
      `Subtotal: ${fmt(result.subtotal)}`,
      `VAT (${vatRate}%): ${fmt(result.vatAmount)}`,
      `TOTAL: ${fmt(result.grandTotal)}`,
      '',
      'Materials Breakdown:',
      ...materials
        .filter((m) => m.name)
        .map(
          (m) => `  ${m.name}: ${m.quantity} × ${fmt(m.unitCost)} = ${fmt(m.quantity * m.unitCost)}`
        ),
    ];
    copyToClipboard(lines.join('\n')).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Time & Materials Calculator"
      description="Calculate job costs including labour, materials, markup and VAT"
    >
      {/* Labour */}
      <CalculatorSection title="Labour">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Hourly Rate"
            unit="£"
            type="text"
            inputMode="decimal"
            value={hourlyRate}
            onChange={setHourlyRate}
            placeholder="0.00"
          />
          <CalculatorInput
            label="Hours Worked"
            unit="hrs"
            type="text"
            inputMode="decimal"
            value={hoursWorked}
            onChange={setHoursWorked}
            placeholder="0"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* Materials — flat rows, no boxes */}
      <CalculatorSection title="Materials">
        <div className="space-y-4">
          {materials.map((mat, idx) => (
            <div key={mat.id}>
              {idx > 0 && <div className="h-px w-full mb-4 bg-white/5" />}
              <div className="space-y-3">
                {/* Row 1: Name + delete */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <CalculatorInput
                      label={`Item ${idx + 1}`}
                      type="text"
                      value={mat.name}
                      onChange={(v) => updateMaterial(mat.id, { name: v })}
                      placeholder="e.g. 2.5mm T&E cable"
                    />
                  </div>
                  {materials.length > 1 && (
                    <button
                      onClick={() => removeMaterial(mat.id)}
                      className="h-12 w-12 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {/* Row 2: Qty + Unit Cost side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <CalculatorInput
                    label="Qty"
                    type="text"
                    inputMode="decimal"
                    value={mat.quantity?.toString() ?? ''}
                    onChange={(v) => updateMaterial(mat.id, { quantity: parseFloat(v) || 0 })}
                    placeholder="1"
                  />
                  <CalculatorInput
                    label="Unit Cost"
                    unit="£"
                    type="text"
                    inputMode="decimal"
                    value={mat.unitCost?.toString() ?? ''}
                    onChange={(v) => updateMaterial(mat.id, { unitCost: parseFloat(v) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addMaterial}
          className="mt-4 w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors touch-manipulation"
        >
          <Plus className="h-4 w-4" />
          Add Material
        </button>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* Charges */}
      <CalculatorSection title="Charges">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Markup"
            unit="%"
            type="text"
            inputMode="decimal"
            value={markupPercent}
            onChange={setMarkupPercent}
            placeholder="15"
          />
          <CalculatorInput
            label="VAT Rate"
            unit="%"
            type="text"
            inputMode="decimal"
            value={vatRate}
            onChange={setVatRate}
            placeholder="20"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="Calculate Total"
        showReset
      />

      {/* ─── Results ─── */}
      {result && (
        <div className="space-y-5 animate-fade-in">
          {/* Hero total with gradient background */}
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}08)`,
              border: `1px solid ${config.gradientFrom}25`,
            }}
          >
            <p className="text-sm text-white mb-2">Grand Total (inc. VAT)</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent tracking-tight"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {fmt(result.grandTotal)}
            </p>
            <button
              onClick={copyToClipboard}
              className="mt-3 h-11 px-5 inline-flex items-center gap-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors touch-manipulation"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied to clipboard' : 'Copy summary'}
            </button>
          </div>

          {/* Invoice-style line items */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="px-4 py-2.5 bg-white/5 text-xs font-semibold text-white flex justify-between">
              <span>Description</span>
              <span>Amount</span>
            </div>

            {/* Labour */}
            <div className="px-4 py-3 flex justify-between border-b border-white/5">
              <div>
                <p className="text-sm text-white font-medium">Labour</p>
                <p className="text-xs text-white mt-0.5">
                  {hourlyRate ? `${hourlyRate}/hr × ${hoursWorked || '0'} hrs` : '—'}
                </p>
              </div>
              <p className="text-sm text-white font-medium">{fmt(result.labourTotal)}</p>
            </div>

            {/* Materials */}
            <div className="px-4 py-3 flex justify-between border-b border-white/5">
              <div>
                <p className="text-sm text-white font-medium">Materials</p>
                <p className="text-xs text-white mt-0.5">
                  {materials.filter((m) => m.name).length > 0
                    ? materials
                        .filter((m) => m.name)
                        .map((m) => m.name)
                        .join(', ')
                    : `${materials.length} item${materials.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <p className="text-sm text-white font-medium">{fmt(result.materialsTotal)}</p>
            </div>

            {/* Markup */}
            <div className="px-4 py-3 flex justify-between border-b border-white/5">
              <p className="text-sm text-white font-medium">Markup ({markupPercent}%)</p>
              <p className="text-sm text-white font-medium">{fmt(result.markupAmount)}</p>
            </div>

            {/* Subtotal */}
            <div
              className="px-4 py-3 flex justify-between border-b"
              style={{ borderColor: `${config.gradientFrom}20` }}
            >
              <p className="text-sm text-white font-semibold">Subtotal</p>
              <p className="text-sm text-white font-semibold">{fmt(result.subtotal)}</p>
            </div>

            {/* VAT */}
            <div className="px-4 py-3 flex justify-between border-b border-white/5">
              <p className="text-sm text-white font-medium">VAT ({vatRate}%)</p>
              <p className="text-sm text-white font-medium">{fmt(result.vatAmount)}</p>
            </div>

            {/* Total */}
            <div
              className="px-4 py-3.5 flex justify-between"
              style={{ background: `${config.gradientFrom}10` }}
            >
              <p className="text-base text-white font-bold">Total</p>
              <p
                className="text-base font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {fmt(result.grandTotal)}
              </p>
            </div>
          </div>

          {/* Materials breakdown (if named items exist) */}
          {materials.filter((m) => m.name && m.unitCost > 0).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white">Materials Breakdown</p>
              {materials
                .filter((m) => m.name && m.unitCost > 0)
                .map((m) => (
                  <div key={m.id} className="flex justify-between text-sm">
                    <span className="text-white">
                      {m.name} × {m.quantity}
                    </span>
                    <span className="text-white font-medium">{fmt(m.quantity * m.unitCost)}</span>
                  </div>
                ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          <CalculatorFormula
            category={CAT}
            title="Cost Breakdown"
            defaultOpen={false}
            steps={[
              {
                label: 'Labour',
                formula: `${hourlyRate || '0'} × ${hoursWorked || '0'}`,
                result: fmt(result.labourTotal),
              },
              {
                label: 'Materials total',
                formula:
                  materials
                    .filter((m) => m.unitCost > 0)
                    .map((m) => `${m.quantity} × ${fmt(m.unitCost)}`)
                    .join(' + ') || '0',
                result: fmt(result.materialsTotal),
              },
              {
                label: `Markup (${markupPercent}%)`,
                formula: `${fmt(result.materialsTotal)} × ${markupPercent}%`,
                result: fmt(result.markupAmount),
              },
              {
                label: 'Subtotal',
                formula: `${fmt(result.labourTotal)} + ${fmt(result.materialsTotal)} + ${fmt(result.markupAmount)}`,
                result: fmt(result.subtotal),
              },
              {
                label: `VAT (${vatRate}%)`,
                formula: `${fmt(result.subtotal)} × ${vatRate}%`,
                result: fmt(result.vatAmount),
              },
              {
                label: 'Grand Total',
                formula: `${fmt(result.subtotal)} + ${fmt(result.vatAmount)}`,
                result: fmt(result.grandTotal),
              },
            ]}
          />

          {/* Pricing Tips */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
              <span>Pricing Tips</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-2"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <p className="text-sm text-white">
                  Always include travel time and expenses in your hourly rate or as a separate line
                  item.
                </p>
                <p className="text-sm text-white">
                  Account for waste — add 10–15% to material quantities for cables, trunking and
                  containment.
                </p>
                <p className="text-sm text-white">
                  Keep receipts for all materials — customers may ask for proof of cost.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Common Markup Rates */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
              <span>Common Markup Rates</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-2"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-white font-medium">10–15%</p>
                  <p className="text-white">Standard domestic</p>
                  <p className="text-white font-medium">15–25%</p>
                  <p className="text-white">Commercial / contract</p>
                  <p className="text-white font-medium">20–30%</p>
                  <p className="text-white">Emergency / call-out</p>
                  <p className="text-white font-medium">25–40%</p>
                  <p className="text-white">Specialist / hazardous</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      <FormulaReference
        category={CAT}
        formula="Total = (Labour + Materials + Markup) × (1 + VAT%)"
      />
    </CalculatorCard>
  );
};

export default TimeMaterialsCalculator;
