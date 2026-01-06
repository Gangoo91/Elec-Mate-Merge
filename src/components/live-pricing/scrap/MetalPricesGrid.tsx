import { useState } from "react";
import { RefreshCw, Calculator, Clock, AlertCircle, TrendingUp, TrendingDown, Minus, Zap, ChevronDown, Wifi, WifiOff, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BottomSheet from "../ui/BottomSheet";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import { MetalPricesGridSkeleton } from "../ui/PricingSkeleton";

interface MetalPrice {
  name: string;
  pricePerKg: number;
  trend24h: number;
  icon: string;
  gradient: string;
  grades?: { name: string; multiplier: number }[];
}

const MetalPricesGrid = ({ className }: { className?: string }) => {
  const { data, isLoading, refreshPrices } = useLiveMetalPrices();
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcMetal, setCalcMetal] = useState<string | null>(null);
  const [calcGrade, setCalcGrade] = useState<string | null>(null);
  const [calcWeight, setCalcWeight] = useState("");
  const [expandedMetal, setExpandedMetal] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Map API data to our format with grades
  const metals: MetalPrice[] = data?.metalPrices?.map((metal: any) => ({
    name: metal.name?.replace(' (kg)', '') || metal.name,
    pricePerKg: parseFloat(metal.value?.replace(/[£,]/g, '') || '0') || metal.pricePerKg || metal.price || 0,
    trend24h: parseFloat(metal.change?.replace(/[%+]/g, '') || '0') * (metal.trend === 'down' ? -1 : 1) || 0,
    icon: getMetalIcon(metal.name?.replace(' (kg)', '') || metal.name),
    gradient: getMetalGradient(metal.name?.replace(' (kg)', '') || metal.name),
    grades: getMetalGrades(metal.name?.replace(' (kg)', '') || metal.name),
  })) || getDefaultMetals();

  function getMetalIcon(name: string): string {
    const icons: Record<string, string> = {
      "Copper": "Cu",
      "Aluminium": "Al",
      "Brass": "Br",
      "Lead": "Pb",
      "Steel": "Fe",
      "Zinc": "Zn",
    };
    return icons[name] || name.slice(0, 2);
  }

  function getMetalGradient(name: string): string {
    const gradients: Record<string, string> = {
      "Copper": "from-orange-600 to-amber-700",
      "Aluminium": "from-slate-500 to-slate-600",
      "Brass": "from-yellow-500 to-amber-600",
      "Lead": "from-gray-600 to-gray-700",
      "Steel": "from-blue-600 to-blue-700",
      "Zinc": "from-cyan-600 to-teal-700",
    };
    return gradients[name] || "from-gray-600 to-gray-700";
  }

  function getMetalGrades(name: string): { name: string; multiplier: number }[] {
    const grades: Record<string, { name: string; multiplier: number }[]> = {
      "Copper": [
        { name: "Bright Wire (Grade 1)", multiplier: 1.15 },
        { name: "Mixed Cable", multiplier: 0.85 },
        { name: "Dirty/Greasy", multiplier: 0.65 },
      ],
      "Aluminium": [
        { name: "Clean Wire", multiplier: 1.12 },
        { name: "Cable (ACSR)", multiplier: 0.75 },
        { name: "Mixed Scrap", multiplier: 0.60 },
      ],
      "Brass": [
        { name: "Clean Fittings", multiplier: 1.08 },
        { name: "Mixed Brass", multiplier: 0.90 },
        { name: "Turnings", multiplier: 0.75 },
      ],
      "Lead": [
        { name: "Clean Lead", multiplier: 1.05 },
        { name: "Cable Sheathing", multiplier: 0.80 },
        { name: "Mixed Scrap", multiplier: 0.70 },
      ],
      "Steel": [
        { name: "Clean Steel", multiplier: 1.10 },
        { name: "Galvanized", multiplier: 0.85 },
        { name: "Mixed Scrap", multiplier: 0.70 },
      ],
      "Zinc": [
        { name: "Clean Zinc", multiplier: 1.05 },
        { name: "Mixed Zinc", multiplier: 0.85 },
      ],
    };
    return grades[name] || [];
  }

  function getDefaultMetals(): MetalPrice[] {
    return [
      { name: "Copper", pricePerKg: 5.20, trend24h: 1.2, icon: "Cu", gradient: "from-orange-600 to-amber-700", grades: getMetalGrades("Copper") },
      { name: "Aluminium", pricePerKg: 1.80, trend24h: -0.5, icon: "Al", gradient: "from-slate-500 to-slate-600", grades: getMetalGrades("Aluminium") },
      { name: "Brass", pricePerKg: 3.50, trend24h: 0.8, icon: "Br", gradient: "from-yellow-500 to-amber-600", grades: getMetalGrades("Brass") },
      { name: "Lead", pricePerKg: 1.20, trend24h: -0.2, icon: "Pb", gradient: "from-gray-600 to-gray-700", grades: getMetalGrades("Lead") },
      { name: "Steel", pricePerKg: 0.25, trend24h: 0, icon: "Fe", gradient: "from-blue-600 to-blue-700", grades: getMetalGrades("Steel") },
      { name: "Zinc", pricePerKg: 2.10, trend24h: 0.3, icon: "Zn", gradient: "from-cyan-600 to-teal-700", grades: getMetalGrades("Zinc") },
    ];
  }

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const calculateValue = () => {
    if (!calcMetal || !calcWeight) return null;
    const metal = metals.find(m => m.name === calcMetal);
    if (!metal) return null;

    let price = metal.pricePerKg;
    if (calcGrade && metal.grades) {
      const grade = metal.grades.find(g => g.name === calcGrade);
      if (grade) {
        price = metal.pricePerKg * grade.multiplier;
      }
    }
    return (price * parseFloat(calcWeight)).toFixed(2);
  };

  const getSelectedPrice = () => {
    if (!calcMetal) return 0;
    const metal = metals.find(m => m.name === calcMetal);
    if (!metal) return 0;

    if (calcGrade && metal.grades) {
      const grade = metal.grades.find(g => g.name === calcGrade);
      if (grade) return metal.pricePerKg * grade.multiplier;
    }
    return metal.pricePerKg;
  };

  // Show skeleton while loading and no data yet
  if (isLoading && !data) {
    return <MetalPricesGridSkeleton />;
  }

  const TrendIndicator = ({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) => {
    const isUp = value > 0;
    const isDown = value < 0;
    const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

    return (
      <div className={cn(
        "flex items-center gap-0.5 font-semibold",
        size === "sm" ? "text-xs" : "text-sm",
        isUp && "text-emerald-400",
        isDown && "text-rose-400",
        !isUp && !isDown && "text-white/50"
      )}>
        {isUp && <TrendingUp className={iconSize} />}
        {isDown && <TrendingDown className={iconSize} />}
        {!isUp && !isDown && <Minus className={iconSize} />}
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

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
          title: "Scrap Metal Calculation",
          text: shareText,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (err) {
      // User cancelled or error - silently fail
      console.log("Share cancelled or failed");
    }
  };

  return (
    <div className={cn("space-y-5", className)}>
      {/* Header with API Status */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Scrap Metal Prices</h2>
            {data?.isLive ? (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Live
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Cached
              </span>
            )}
          </div>
          <p className="text-sm text-white/60 flex items-center gap-1.5 mt-1">
            <Clock className="h-3.5 w-3.5" />
            {data?.lastUpdated || "Loading..."}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => refreshPrices(true)}
          disabled={isLoading}
          className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl h-10 w-10"
        >
          <RefreshCw className={cn("h-4 w-4 text-white", isLoading && "animate-spin")} />
        </Button>
      </div>

      {/* Data Source Info */}
      {data?.dataSource && data?.dataSource !== 'live_api' && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            {data.dataSource === 'mock_realistic' || data.dataSource === 'static_fallback'
              ? "Showing estimated prices. Set METAL_PRICE_API_KEY in Supabase secrets for live data."
              : `Data source: ${data.dataSource}`}
          </span>
        </div>
      )}

      {/* Big Calculator Button */}
      <button
        onClick={() => openCalculator()}
        className={cn(
          "w-full p-5 rounded-2xl",
          "bg-gradient-to-r from-yellow-400 to-amber-500",
          "flex items-center justify-between",
          "transition-all duration-200",
          "hover:from-yellow-300 hover:to-amber-400",
          "active:scale-[0.98] touch-manipulation"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center">
            <Calculator className="h-7 w-7 text-black" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-black">Scrap Calculator</p>
            <p className="text-sm text-black/70">Calculate value by weight</p>
          </div>
        </div>
        <ChevronDown className="h-6 w-6 text-black/60 rotate-[-90deg]" />
      </button>

      {/* Metal Cards with Expandable Grades */}
      <div className="space-y-3">
        {metals.map((metal) => (
          <div key={metal.name} className="space-y-2">
            {/* Main Metal Card */}
            <button
              className={cn(
                "w-full relative overflow-hidden rounded-2xl p-4",
                "bg-gradient-to-br",
                metal.gradient,
                "border border-white/10",
                "transition-all duration-300",
                "hover:scale-[1.01] active:scale-[0.99] touch-manipulation text-left"
              )}
              onClick={() => setExpandedMetal(expandedMetal === metal.name ? null : metal.name)}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />

              {/* Content */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                    {metal.icon}
                  </div>
                  <div>
                    <span className="font-bold text-white text-lg">{metal.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendIndicator value={metal.trend24h} size="sm" />
                      <span className="text-xs text-white/50">24h</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="text-2xl font-black text-white tracking-tight">
                      {formatPrice(metal.pricePerKg)}
                    </div>
                    <div className="text-xs text-white/60 font-medium">per kg</div>
                  </div>
                  <ChevronDown className={cn(
                    "h-5 w-5 text-white/60 transition-transform",
                    expandedMetal === metal.name && "rotate-180"
                  )} />
                </div>
              </div>
            </button>

            {/* Expanded Grades */}
            {expandedMetal === metal.name && metal.grades && metal.grades.length > 0 && (
              <div className="ml-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {metal.grades.map((grade) => {
                  const gradePrice = metal.pricePerKg * grade.multiplier;
                  return (
                    <button
                      key={grade.name}
                      onClick={() => openCalculator(metal.name, grade.name)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl",
                        "bg-white/5 border border-white/10",
                        "hover:bg-white/10 active:scale-[0.99] touch-manipulation transition-all"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-white/70">{metal.icon}</span>
                        </div>
                        <span className="text-white font-medium">{grade.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white">{formatPrice(gradePrice)}</span>
                        <span className="text-xs text-white/50">/kg</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick tip */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
        <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
          <Zap className="h-5 w-5 text-yellow-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Tap a metal to see grades</p>
          <p className="text-xs text-white/60">Different grades have different prices</p>
        </div>
      </div>

      {/* Calculator Bottom Sheet */}
      <BottomSheet
        isOpen={showCalculator}
        onClose={() => {
          setShowCalculator(false);
          setCalcWeight("");
          setCalcGrade(null);
        }}
        title="Scrap Calculator"
      >
        <div className="space-y-6">
          {/* Metal Selection */}
          <div>
            <label className="text-sm text-white/70 font-semibold mb-3 block">Select Metal</label>
            <div className="grid grid-cols-3 gap-2">
              {metals.map((metal) => (
                <button
                  key={metal.name}
                  onClick={() => {
                    setCalcMetal(metal.name);
                    setCalcGrade(null);
                  }}
                  className={cn(
                    "p-3 rounded-xl border-2 text-center transition-all touch-manipulation",
                    calcMetal === metal.name
                      ? "bg-gradient-to-br border-yellow-400 text-white " + metal.gradient
                      : "bg-white/5 border-white/10 text-white hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg mx-auto mb-1 flex items-center justify-center text-xs font-bold",
                    calcMetal === metal.name ? "bg-white/20" : "bg-white/10"
                  )}>
                    {metal.icon}
                  </div>
                  <span className="text-xs font-medium">{metal.name}</span>
                  <span className="block text-[10px] text-white/50 mt-0.5">
                    {formatPrice(metal.pricePerKg)}/kg
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grade Selection (if metal selected and has grades) */}
          {calcMetal && metals.find(m => m.name === calcMetal)?.grades?.length && (
            <div>
              <label className="text-sm text-white/70 font-semibold mb-3 block">Select Grade</label>
              <div className="space-y-2">
                {metals.find(m => m.name === calcMetal)?.grades?.map((grade) => {
                  const basePrice = metals.find(m => m.name === calcMetal)?.pricePerKg || 0;
                  const gradePrice = basePrice * grade.multiplier;
                  return (
                    <button
                      key={grade.name}
                      onClick={() => setCalcGrade(grade.name)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all touch-manipulation",
                        calcGrade === grade.name
                          ? "bg-yellow-400/20 border-yellow-400 text-white"
                          : "bg-white/5 border-white/10 text-white hover:border-white/20"
                      )}
                    >
                      <span className="font-medium">{grade.name}</span>
                      <span className="font-bold">{formatPrice(gradePrice)}/kg</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weight Input */}
          <div>
            <label className="text-sm text-white/70 font-semibold mb-3 block">Weight (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={calcWeight}
              onChange={(e) => setCalcWeight(e.target.value)}
              placeholder="0"
              className={cn(
                "w-full h-20 text-4xl text-center font-black rounded-2xl",
                "bg-neutral-800 border-2 border-white/10 text-white",
                "placeholder:text-white/20",
                "focus:outline-none focus:border-yellow-400/50"
              )}
            />
          </div>

          {/* Result */}
          {calcMetal && calcWeight && parseFloat(calcWeight) > 0 && (
            <div className={cn(
              "p-6 rounded-2xl text-center",
              "bg-gradient-to-br from-yellow-400/20 to-amber-500/20",
              "border-2 border-yellow-400/40"
            )}>
              <p className="text-sm text-white/70 font-medium mb-2">Estimated Scrap Value</p>
              <p className="text-5xl font-black text-yellow-400 mb-2">
                £{calculateValue()}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/60 flex-wrap mb-4">
                <span className="font-semibold">{calcWeight} kg</span>
                <span>of</span>
                <span className="font-semibold">{calcGrade || calcMetal}</span>
                <span>@</span>
                <span className="font-semibold">{formatPrice(getSelectedPrice())}/kg</span>
              </div>
              {/* Share Button */}
              <button
                onClick={handleShare}
                className={cn(
                  "flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl",
                  "font-semibold text-sm transition-all duration-200",
                  "touch-manipulation active:scale-[0.97]",
                  shareSuccess
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/15"
                )}
              >
                {shareSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share Calculation
                  </>
                )}
              </button>
            </div>
          )}

          {/* Common weights quick select */}
          <div>
            <label className="text-xs text-white/50 font-medium mb-2 block">Quick weights</label>
            <div className="flex gap-2 flex-wrap">
              {[1, 5, 10, 25, 50, 100].map((weight) => (
                <button
                  key={weight}
                  onClick={() => setCalcWeight(weight.toString())}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                    calcWeight === weight.toString()
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {weight}kg
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40 text-center">
            Prices vary by merchant and metal quality. Always confirm before selling.
          </p>
        </div>
      </BottomSheet>
    </div>
  );
};

export default MetalPricesGrid;
