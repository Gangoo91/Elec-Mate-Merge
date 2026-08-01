import { copyToClipboard } from '@/utils/clipboard';
import { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronRight, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BottomSheet from '../ui/BottomSheet';
import { useLiveMetalPrices } from '@/hooks/useLiveMetalPrices';
import { MetalPricesGridSkeleton } from '../ui/PricingSkeleton';

interface MetalPrice {
  name: string;
  pricePerKg: number;
  trend24h: number;
  grades?: { name: string; multiplier: number }[];
}

const GRADES: Record<string, { name: string; multiplier: number }[]> = {
  Copper: [
    { name: 'Bright Wire (Grade 1)', multiplier: 1.15 },
    { name: 'Mixed Cable', multiplier: 0.85 },
    { name: 'Dirty/Greasy', multiplier: 0.65 },
  ],
  Aluminium: [
    { name: 'Clean Wire', multiplier: 1.12 },
    { name: 'Cable (ACSR)', multiplier: 0.75 },
    { name: 'Mixed Scrap', multiplier: 0.6 },
  ],
  Brass: [
    { name: 'Clean Fittings', multiplier: 1.08 },
    { name: 'Mixed Brass', multiplier: 0.9 },
    { name: 'Turnings', multiplier: 0.75 },
  ],
  Lead: [
    { name: 'Clean Lead', multiplier: 1.05 },
    { name: 'Cable Sheathing', multiplier: 0.8 },
    { name: 'Mixed Scrap', multiplier: 0.7 },
  ],
  Steel: [
    { name: 'Clean Steel', multiplier: 1.1 },
    { name: 'Galvanized', multiplier: 0.85 },
    { name: 'Mixed Scrap', multiplier: 0.7 },
  ],
  Zinc: [
    { name: 'Clean Zinc', multiplier: 1.05 },
    { name: 'Mixed Zinc', multiplier: 0.85 },
  ],
};

const FALLBACK_METALS: MetalPrice[] = [
  { name: 'Copper', pricePerKg: 5.2, trend24h: 1.2, grades: GRADES.Copper },
  { name: 'Aluminium', pricePerKg: 1.8, trend24h: -0.5, grades: GRADES.Aluminium },
  { name: 'Brass', pricePerKg: 3.5, trend24h: 0.8, grades: GRADES.Brass },
  { name: 'Lead', pricePerKg: 1.2, trend24h: -0.2, grades: GRADES.Lead },
  { name: 'Steel', pricePerKg: 0.25, trend24h: 0, grades: GRADES.Steel },
  { name: 'Zinc', pricePerKg: 2.1, trend24h: 0.3, grades: GRADES.Zinc },
];

const MetalPricesGrid = ({ className }: { className?: string }) => {
  const { data, isLoading, refreshPrices } = useLiveMetalPrices();
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcMetal, setCalcMetal] = useState<string | null>(null);
  const [calcGrade, setCalcGrade] = useState<string | null>(null);
  const [calcWeight, setCalcWeight] = useState('');
  const [expandedMetal, setExpandedMetal] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Map API data to our format with grades
  const metals: MetalPrice[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- edge fn payload shape varies
    data?.metalPrices?.map((metal: any) => {
      const name: string = metal.name?.replace(' (kg)', '') || metal.name;
      return {
        name,
        pricePerKg:
          parseFloat(metal.value?.replace(/[£,]/g, '') || '0') ||
          metal.pricePerKg ||
          metal.price ||
          0,
        trend24h:
          parseFloat(metal.change?.replace(/[%+]/g, '') || '0') *
            (metal.trend === 'down' ? -1 : 1) || 0,
        grades: GRADES[name] || [],
      };
    }) || FALLBACK_METALS;

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const calculateValue = () => {
    if (!calcMetal || !calcWeight) return null;
    const metal = metals.find((m) => m.name === calcMetal);
    if (!metal) return null;

    let price = metal.pricePerKg;
    if (calcGrade && metal.grades) {
      const grade = metal.grades.find((g) => g.name === calcGrade);
      if (grade) {
        price = metal.pricePerKg * grade.multiplier;
      }
    }
    return (price * parseFloat(calcWeight)).toFixed(2);
  };

  const getSelectedPrice = () => {
    if (!calcMetal) return 0;
    const metal = metals.find((m) => m.name === calcMetal);
    if (!metal) return 0;

    if (calcGrade && metal.grades) {
      const grade = metal.grades.find((g) => g.name === calcGrade);
      if (grade) return metal.pricePerKg * grade.multiplier;
    }
    return metal.pricePerKg;
  };

  // Show skeleton while loading and no data yet
  if (isLoading && !data) {
    return <MetalPricesGridSkeleton />;
  }

  const Trend = ({ value }: { value: number }) => (
    <span
      className={cn(
        'text-xs font-medium tabular-nums',
        value > 0 && 'text-emerald-400',
        value < 0 && 'text-rose-400',
        value === 0 && 'text-white/70'
      )}
    >
      {value > 0 ? '+' : value < 0 ? '−' : ''}
      {Math.abs(value).toFixed(1)}% · 24h
    </span>
  );

  const openCalculator = (metalName?: string, gradeName?: string) => {
    if (metalName) setCalcMetal(metalName);
    if (gradeName) setCalcGrade(gradeName);
    setShowCalculator(true);
    setShareSuccess(false);
  };

  const handleShare = async () => {
    const calculatedValue = calculateValue();
    if (!calculatedValue || !calcMetal || !calcWeight) return;

    const shareText = `Scrap Metal Calculation\n${calcWeight}kg of ${calcGrade || calcMetal}\nEstimated Value: £${calculatedValue}\nPrice: ${formatPrice(getSelectedPrice())}/kg\n\nCalculated with Elec-Mate`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Scrap Metal Calculation',
          text: shareText,
        });
      } else {
        const ok = await copyToClipboard(shareText);
        if (ok) {
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 2000);
        }
      }
    } catch {
      // User cancelled — nothing to do
    }
  };

  const usingFallback =
    !data?.metalPrices ||
    data.dataSource === 'mock_realistic' ||
    data.dataSource === 'static_fallback';

  return (
    <div className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              Scrap metal prices
            </p>
            <span
              className={cn(
                'px-1.5 py-px text-[9px] font-bold uppercase tracking-wider rounded',
                data?.isLive
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-amber-500/15 text-amber-400'
              )}
            >
              {data?.isLive ? 'Live' : 'Cached'}
            </span>
          </div>
          <p className="text-sm text-white/80 mt-1">{data?.lastUpdated || 'Loading…'}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => refreshPrices(true)}
          disabled={isLoading}
          className="border-white/15 bg-white/[0.04] hover:bg-white/10 rounded-xl h-11 w-11 flex-shrink-0 touch-manipulation"
        >
          <RefreshCw className={cn('h-4 w-4 text-white', isLoading && 'animate-spin')} />
        </Button>
      </div>

      {/* Data source notice */}
      {(usingFallback || (data?.dataSource && data?.dataSource !== 'live_api')) && (
        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10">
          <p className="text-sm text-amber-300">
            {usingFallback
              ? 'Indicative prices only — live feed unavailable. Merchant rates vary; always confirm before weighing in.'
              : `Data source: ${data?.dataSource}`}
          </p>
        </div>
      )}

      {/* Metal list */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.07]">
        {metals.map((metal) => (
          <div key={metal.name}>
            <button
              className="w-full flex items-center justify-between gap-3 p-4 text-left touch-manipulation active:bg-white/[0.06] transition-colors"
              onClick={() => setExpandedMetal(expandedMetal === metal.name ? null : metal.name)}
            >
              <div className="min-w-0">
                <p className="font-semibold text-white">{metal.name}</p>
                <Trend value={metal.trend24h} />
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xl font-black text-white tabular-nums leading-tight">
                    {formatPrice(metal.pricePerKg)}
                  </p>
                  <p className="text-[10px] text-white/70">per kg</p>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/40 transition-transform',
                    expandedMetal === metal.name && 'rotate-180'
                  )}
                />
              </div>
            </button>

            {expandedMetal === metal.name && metal.grades && metal.grades.length > 0 && (
              <div className="pb-2 animate-in slide-in-from-top-2 duration-200">
                {metal.grades.map((grade) => {
                  const gradePrice = metal.pricePerKg * grade.multiplier;
                  return (
                    <button
                      key={grade.name}
                      onClick={() => openCalculator(metal.name, grade.name)}
                      className="w-full flex items-center justify-between gap-3 pl-8 pr-4 py-2.5 text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-sm text-white/90">{grade.name}</span>
                      <span className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-semibold text-white tabular-nums">
                          {formatPrice(gradePrice)}/kg
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-white/70">
        Tap a metal for grade prices — clean, mixed and contaminated grades fetch different
        rates. Tap a grade to value a load.
      </p>

      {/* Calculator */}
      <Button
        onClick={() => openCalculator()}
        className="w-full h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold touch-manipulation"
      >
        Open scrap calculator
      </Button>

      {/* Calculator Bottom Sheet */}
      <BottomSheet
        isOpen={showCalculator}
        onClose={() => {
          setShowCalculator(false);
          setCalcWeight('');
          setCalcGrade(null);
        }}
        title="Scrap Calculator"
      >
        <div className="space-y-6">
          {/* Metal Selection */}
          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 mb-3 block">
              Metal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {metals.map((metal) => (
                <button
                  key={metal.name}
                  onClick={() => {
                    setCalcMetal(metal.name);
                    setCalcGrade(null);
                  }}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-all touch-manipulation',
                    calcMetal === metal.name
                      ? 'bg-elec-yellow/10 border-elec-yellow text-white'
                      : 'bg-white/[0.04] border-white/10 text-white active:bg-white/[0.08]'
                  )}
                >
                  <span className="text-sm font-semibold block">{metal.name}</span>
                  <span className="block text-[10px] text-white/70 mt-0.5 tabular-nums">
                    {formatPrice(metal.pricePerKg)}/kg
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grade Selection */}
          {calcMetal && metals.find((m) => m.name === calcMetal)?.grades?.length ? (
            <div>
              <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 mb-3 block">
                Grade
              </label>
              <div className="space-y-2">
                {metals
                  .find((m) => m.name === calcMetal)
                  ?.grades?.map((grade) => {
                    const basePrice = metals.find((m) => m.name === calcMetal)?.pricePerKg || 0;
                    const gradePrice = basePrice * grade.multiplier;
                    return (
                      <button
                        key={grade.name}
                        onClick={() => setCalcGrade(grade.name)}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded-xl border transition-all touch-manipulation',
                          calcGrade === grade.name
                            ? 'bg-elec-yellow/10 border-elec-yellow text-white'
                            : 'bg-white/[0.04] border-white/10 text-white active:bg-white/[0.08]'
                        )}
                      >
                        <span className="text-sm font-medium">{grade.name}</span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(gradePrice)}/kg
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ) : null}

          {/* Weight Input */}
          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 mb-3 block">
              Weight (kg)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={calcWeight}
              onChange={(e) => setCalcWeight(e.target.value)}
              placeholder="0"
              className={cn(
                'w-full h-16 text-3xl text-center font-black rounded-xl tabular-nums',
                'bg-white/[0.04] border border-white/10 text-white',
                'placeholder:text-white/40',
                'focus:outline-none focus:border-elec-yellow/50 touch-manipulation'
              )}
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {[1, 5, 10, 25, 50, 100].map((weight) => (
                <button
                  key={weight}
                  onClick={() => setCalcWeight(weight.toString())}
                  className={cn(
                    'px-4 h-11 rounded-xl text-sm font-semibold transition-all touch-manipulation tabular-nums',
                    calcWeight === weight.toString()
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white active:bg-white/[0.1]'
                  )}
                >
                  {weight}kg
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {calcMetal && calcWeight && parseFloat(calcWeight) > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-elec-yellow/30">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 mb-1">
                Estimated scrap value
              </p>
              <p className="text-4xl font-black text-white tabular-nums">£{calculateValue()}</p>
              <p className="text-sm text-white/80 mt-1 tabular-nums">
                {calcWeight} kg of {calcGrade || calcMetal} @ {formatPrice(getSelectedPrice())}/kg
              </p>
              <button
                onClick={handleShare}
                className={cn(
                  'flex items-center justify-center gap-2 w-full h-11 rounded-xl mt-4',
                  'font-semibold text-sm transition-all duration-200',
                  'touch-manipulation active:scale-[0.98]',
                  shareSuccess
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                    : 'bg-white/[0.06] border border-white/15 text-white active:bg-white/[0.1]'
                )}
              >
                {shareSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share calculation
                  </>
                )}
              </button>
            </div>
          )}

          <p className="text-xs text-white/70 text-center">
            Prices vary by merchant and metal quality. Always confirm before selling.
          </p>
        </div>
      </BottomSheet>
    </div>
  );
};

export default MetalPricesGrid;
