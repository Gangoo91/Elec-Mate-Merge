import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  Brain,
  Sparkles,
  TrendingDown,
  Award,
  Scale,
  AlertCircle,
  CheckCircle2,
  Package,
  PoundSterling,
  Clock,
  Truck,
  ChevronRight,
  Copy
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";
import { motion, AnimatePresence } from "framer-motion";

interface SmartQuoteBuilderProps {
  onAddToQuote?: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote?: (materials: MaterialToQuoteItem[]) => void;
}

interface OptionResult {
  name: string;
  totalCost: number;
  items: any[];
  suppliers: string[];
  estimatedDelivery: string;
  withinBudget: boolean;
}

interface AnalysisResult {
  parsedItems: any[];
  options: {
    cheapest: OptionResult;
    bestQuality: OptionResult;
    balanced: OptionResult;
  };
  warnings: string[];
  summary: {
    totalItemsRequested: number;
    totalItemsFound: number;
    parseConfidence: number;
  };
}

type Preference = "cheapest" | "balanced" | "best-quality";
type OptionKey = "cheapest" | "balanced" | "bestQuality";

const preferenceOptions: { value: Preference; label: string; icon: typeof Scale; color: string }[] = [
  { value: "cheapest", label: "Cheapest", icon: TrendingDown, color: "green" },
  { value: "balanced", label: "Balanced", icon: Scale, color: "blue" },
  { value: "best-quality", label: "Quality", icon: Award, color: "amber" }
];

export const SmartQuoteBuilder = ({ onAddToQuote, onAddMultipleToQuote }: SmartQuoteBuilderProps) => {
  const [materialsText, setMaterialsText] = useState("");
  const [preference, setPreference] = useState<Preference>("balanced");
  const [maxBudget, setMaxBudget] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeOption, setActiveOption] = useState<OptionKey>("balanced");

  const exampleList = `100m 2.5mm twin and earth cable
20x RCD 30mA
10 LED downlights 6000K
Consumer unit 12 way
50m 1.5mm cable
5x Double sockets white`;

  const handlePasteExample = () => {
    setMaterialsText(exampleList);
    toast({
      title: "Example Added",
      description: "Sample materials list pasted"
    });
  };

  const handleAnalyze = async () => {
    if (!materialsText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a materials list to analyse",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-materials-agent', {
        body: {
          materialsListText: materialsText,
          preference,
          maxBudget: maxBudget ? parseFloat(maxBudget) : undefined,
          includeAlternatives: true
        }
      });

      if (error) throw error;

      setResult(data);
      setActiveOption(preference === "best-quality" ? "bestQuality" : preference);

      toast({
        title: "Analysis Complete",
        description: `Found ${data.summary.totalItemsFound} of ${data.summary.totalItemsRequested} items`,
      });

    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyse materials list",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddOption = (option: OptionResult) => {
    if (!onAddMultipleToQuote) {
      toast({
        title: "Not Available",
        description: "Quote integration not available in this view",
        variant: "destructive"
      });
      return;
    }

    const materials: MaterialToQuoteItem[] = option.items.map(item => ({
      id: Math.random(),
      name: item.selectedProduct.name,
      category: item.selectedProduct.category || 'Materials',
      price: item.selectedProduct.price,
      supplier: item.selectedProduct.supplier,
      stockStatus: item.selectedProduct.stockStatus || 'In Stock',
      productUrl: item.selectedProduct.productUrl,
      highlights: item.selectedProduct.highlights || []
    }));

    onAddMultipleToQuote(materials);

    toast({
      title: "Added to Quote",
      description: `${option.name} (${materials.length} items, £${option.totalCost.toFixed(2)})`,
    });
  };

  const currentOption = result?.options[activeOption];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-500/30">
          <Brain className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-ios-title-2 font-bold text-white">Smart Quote</h3>
          <p className="text-ios-caption-1 text-white/50">AI-powered materials analysis</p>
        </div>
      </div>

      {/* Materials Input */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide">Materials List</p>
          <button
            onClick={handlePasteExample}
            className="flex items-center gap-1 text-ios-caption-1 text-purple-400 touch-manipulation"
          >
            <Copy className="h-3 w-3" />
            Try Example
          </button>
        </div>
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <textarea
            value={materialsText}
            onChange={(e) => setMaterialsText(e.target.value)}
            placeholder={exampleList}
            className="w-full min-h-[160px] p-4 bg-transparent text-white placeholder:text-white/30
                       text-ios-body font-mono resize-none focus:outline-none"
          />
        </div>
        <p className="text-ios-caption-2 text-white/40 mt-2 px-1">
          One item per line. Include quantities, sizes, specifications.
        </p>
      </section>

      {/* Preference Selection */}
      <section>
        <p className="text-ios-footnote text-white/50 uppercase tracking-wide mb-2">Preference</p>
        <div className="grid grid-cols-3 gap-2">
          {preferenceOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = preference === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setPreference(opt.value)}
                className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] ${
                  isSelected
                    ? `bg-${opt.color}-500/20 border-${opt.color}-500/50`
                    : "bg-white/5 border-white/10"
                }`}
              >
                <Icon className={`h-5 w-5 mx-auto mb-1 ${isSelected ? `text-${opt.color}-400` : "text-white/50"}`} />
                <p className={`text-ios-caption-1 font-medium ${isSelected ? `text-${opt.color}-300` : "text-white/70"}`}>
                  {opt.label}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Budget Input */}
      <section>
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <IOSInput
            label="Max Budget"
            icon={<PoundSterling className="h-5 w-5" />}
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            hint="Optional limit"
          />
        </div>
      </section>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !materialsText.trim()}
        className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600
                   text-white font-semibold text-ios-body rounded-xl active:scale-[0.98] touch-manipulation
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
            Analysing...
          </>
        ) : (
          <>
            <Brain className="mr-2 h-5 w-5" />
            Analyse Materials
          </>
        )}
      </Button>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Summary Card */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-ios-subhead font-medium text-green-300">
                    Found {result.summary.totalItemsFound} of {result.summary.totalItemsRequested} items
                  </p>
                  <p className="text-ios-caption-1 text-green-200/70">
                    {Math.round(result.summary.parseConfidence * 100)}% confidence
                  </p>
                </div>
              </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-ios-subhead font-medium text-amber-300">Items not found:</p>
                    {result.warnings.map((warning, idx) => (
                      <p key={idx} className="text-ios-caption-1 text-amber-200/70">{warning}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Option Tabs */}
            <div className="bg-white/10 rounded-xl p-1 flex relative">
              <motion.div
                className="absolute top-1 bottom-1 bg-elec-yellow rounded-lg"
                initial={false}
                animate={{
                  left: activeOption === "cheapest" ? "4px" : activeOption === "balanced" ? "calc(33.33% + 2px)" : "calc(66.66% + 2px)",
                  width: "calc(33.33% - 4px)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              {([
                { key: "cheapest" as OptionKey, label: "Cheapest", icon: TrendingDown },
                { key: "balanced" as OptionKey, label: "Balanced", icon: Scale },
                { key: "bestQuality" as OptionKey, label: "Quality", icon: Award }
              ]).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveOption(tab.key)}
                    className={`relative z-10 flex-1 py-2.5 flex items-center justify-center gap-1.5
                               text-ios-caption-1 font-medium transition-colors touch-manipulation ${
                      activeOption === tab.key ? "text-black" : "text-white/70"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Option Details */}
            {currentOption && (
              <motion.div
                key={activeOption}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Price Hero */}
                <div className={`bg-gradient-to-br rounded-2xl p-5 border ${
                  currentOption.withinBudget
                    ? "from-green-500/20 to-emerald-500/10 border-green-500/30"
                    : "from-red-500/20 to-orange-500/10 border-red-500/30"
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">
                        {currentOption.name}
                      </p>
                      <p className="text-3xl font-bold text-white mt-1 tabular-nums">
                        £{currentOption.totalCost.toFixed(2)}
                      </p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-ios-caption-1 font-medium ${
                      currentOption.withinBudget
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}>
                      {currentOption.withinBudget ? "✓ Within Budget" : "Over Budget"}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-3 min-w-[100px]">
                    <div className="flex items-center gap-1 mb-1">
                      <Package className="h-3 w-3 text-white/50" />
                      <span className="text-ios-caption-2 text-white/50">Items</span>
                    </div>
                    <p className="text-ios-title-3 font-semibold text-white">{currentOption.items.length}</p>
                  </div>
                  <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-3 min-w-[100px]">
                    <div className="flex items-center gap-1 mb-1">
                      <Truck className="h-3 w-3 text-white/50" />
                      <span className="text-ios-caption-2 text-white/50">Delivery</span>
                    </div>
                    <p className="text-ios-subhead font-semibold text-white">{currentOption.estimatedDelivery}</p>
                  </div>
                  <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-3 min-w-[100px]">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-white/50" />
                      <span className="text-ios-caption-2 text-white/50">Suppliers</span>
                    </div>
                    <p className="text-ios-subhead font-semibold text-white">{currentOption.suppliers.length}</p>
                  </div>
                </div>

                {/* Items List */}
                <section>
                  <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-2">
                    Items ({currentOption.items.length})
                  </p>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                    {currentOption.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <p className="text-ios-body font-medium text-white truncate">
                            {item.selectedProduct.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-ios-caption-2 text-white/50">
                              {item.requestedItem.quantity} • {item.selectedProduct.supplier}
                            </span>
                            {item.selectedProduct.stockStatus !== 'In Stock' && (
                              <span className="text-ios-caption-2 text-amber-400">
                                {item.selectedProduct.stockStatus}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-ios-subhead font-semibold text-elec-yellow tabular-nums flex-shrink-0">
                          {item.selectedProduct.price}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Add to Quote Button */}
                <Button
                  onClick={() => handleAddOption(currentOption)}
                  disabled={!onAddMultipleToQuote}
                  className="w-full h-14 bg-elec-yellow hover:bg-elec-yellow/90 text-black
                             font-semibold text-ios-body rounded-xl active:scale-[0.98] touch-manipulation
                             disabled:opacity-50"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Add {currentOption.items.length} Items to Quote
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
