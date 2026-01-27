import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Wrench, Package, Zap, FileText, Copy, TrendingUp, Search, ChevronRight, ChevronDown, Clock, PoundSterling, Hash, Scan } from "lucide-react";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { JobTemplates } from "../JobTemplates";
import { cn } from "@/lib/utils";
import {
  workerTypes as defaultWorkerTypes,
  materialCategories,
  commonMaterials,
  equipmentCategories,
  commonEquipment
} from "@/data/electrician/presetData";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useInvoiceScanner } from "@/hooks/useInvoiceScanner";
import { InvoiceScannerSheet } from "@/components/electrician/invoice-builder/InvoiceScannerSheet";
import { InvoiceScanResults } from "@/components/electrician/invoice-builder/InvoiceScanResults";

interface EnhancedQuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  priceAdjustment?: number;
  setPriceAdjustment?: (adjustment: number) => void;
  calculateAdjustedPrice?: (basePrice: number) => number;
}

export const EnhancedQuoteItemsStep = ({ items, onAdd, onUpdate, onRemove, priceAdjustment = 0, setPriceAdjustment, calculateAdjustedPrice }: EnhancedQuoteItemsStepProps) => {
  // Get user's company profile for custom worker rates
  const { companyProfile } = useCompanyProfile();

  // Calculate personalised worker rates based on user's saved worker_rates or fallback to hourly_rate
  const workerTypes = useMemo(() => {
    const savedRates = companyProfile?.worker_rates;

    // If user has saved custom worker rates, use them
    if (savedRates) {
      return defaultWorkerTypes.map(worker => {
        const savedRate = savedRates[worker.id as keyof typeof savedRates];
        return {
          ...worker,
          defaultHourlyRate: savedRate ?? worker.defaultHourlyRate
        };
      });
    }

    // Fall back to percentage calculation if no saved rates
    const userRate = companyProfile?.hourly_rate || 45;
    return defaultWorkerTypes.map(worker => {
      let rate = worker.defaultHourlyRate;
      switch (worker.id) {
        case 'electrician':
          rate = userRate;
          break;
        case 'apprentice':
          rate = Math.round(userRate * 0.55);
          break;
        case 'labourer':
          rate = Math.round(userRate * 0.44);
          break;
        case 'designer':
          rate = Math.round(userRate * 1.44);
          break;
        case 'owner':
          rate = Math.round(userRate * 1.11);
          break;
      }
      return { ...worker, defaultHourlyRate: rate };
    });
  }, [companyProfile?.worker_rates, companyProfile?.hourly_rate]);

  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unit: "each",
    unitPrice: 0,
    category: "labour" as 'labour' | 'materials' | 'equipment' | 'manual',
    subcategory: "",
    workerType: "",
    hours: 0,
    hourlyRate: 0,
    materialCode: "",
    equipmentCode: "",
    notes: ""
  });

  const [materialSearch, setMaterialSearch] = useState("");
  const [ragResults, setRagResults] = useState<any[]>([]);
  const [isSearchingRAG, setIsSearchingRAG] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const debouncedSearch = useDebounce(materialSearch, 500);

  // Invoice Scanner State
  const [scannerSheetOpen, setScannerSheetOpen] = useState(false);
  const [scanResultsOpen, setScanResultsOpen] = useState(false);
  const scanner = useInvoiceScanner();

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
    setShowTemplates(false);
  };

  // Scanner handlers - keep sheet open during processing
  const handleScanCapture = async (imageData: string, file: File) => {
    // Don't close sheet - let user see the processing state
    const result = await scanner.handleCapture(imageData, file);
    if (result.success && result.items.length > 0) {
      setScannerSheetOpen(false);
      setScanResultsOpen(true);
    }
  };

  const handleScanUpload = async (files: File[]) => {
    // Don't close sheet - let user see the processing state
    const result = await scanner.handleUpload(files);
    if (result.success && result.items.length > 0) {
      setScannerSheetOpen(false);
      setScanResultsOpen(true);
    }
  };

  const handleConfirmScannedItems = () => {
    const items = scanner.getSelectedItems();
    items.forEach(item => {
      const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(item.unitPrice) : item.unitPrice;
      onAdd({
        ...item,
        unitPrice: adjustedPrice,
        notes: `Scanned from supplier invoice`
      });
    });

    toast({
      title: 'Items Added',
      description: `${items.length} material${items.length === 1 ? '' : 's'} added from scanned invoice`,
    });

    setScanResultsOpen(false);
    setScannerSheetOpen(false);
    scanner.reset();
  };

  const handleCategoryChange = (category: string) => {
    setNewItem(prev => ({
      ...prev,
      category: category as 'labour' | 'materials' | 'equipment' | 'manual',
      subcategory: "",
      workerType: "",
      hours: 0,
      hourlyRate: 0,
      materialCode: "",
      equipmentCode: "",
      unitPrice: 0,
      unit: category === "labour" ? "hour" : category === "manual" ? "item" : "each"
    }));
  };

  const handleWorkerTypeChange = (workerTypeId: string) => {
    const worker = workerTypes.find(w => w.id === workerTypeId);
    if (worker) {
      setNewItem(prev => ({
        ...prev,
        workerType: workerTypeId,
        hourlyRate: worker.defaultHourlyRate,
        unitPrice: worker.defaultHourlyRate,
        description: prev.description || `${worker.name} - ${worker.description}`
      }));
    }
  };

  const handleMaterialSelect = (materialId: string) => {
    const material = commonMaterials.find(m => m.id === materialId);
    if (material) {
      setNewItem(prev => ({
        ...prev,
        materialCode: materialId,
        description: material.name,
        unitPrice: calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice,
        unit: material.unit
      }));
    }
  };

  const handleEquipmentSelect = (equipmentId: string) => {
    const equipment = commonEquipment.find(e => e.id === equipmentId);
    if (equipment) {
      setNewItem(prev => ({
        ...prev,
        equipmentCode: equipmentId,
        description: equipment.name,
        unitPrice: equipment.dailyRate,
        unit: equipment.unit
      }));
    }
  };

  const handleHoursChange = (hours: number) => {
    setNewItem(prev => ({
      ...prev,
      hours,
      quantity: hours,
      unitPrice: prev.hourlyRate
    }));
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.unitPrice > 0) {
      const itemToAdd = {
        ...newItem,
        quantity: newItem.category === "labour" && newItem.hours > 0 ? newItem.hours : newItem.quantity
      };
      onAdd(itemToAdd);

      setNewItem(prev => ({
        description: "",
        quantity: 1,
        unit: prev.category === "labour" ? "hour" : prev.category === "manual" ? "item" : "each",
        unitPrice: 0,
        category: prev.category,
        subcategory: "",
        workerType: "",
        hours: 0,
        hourlyRate: 0,
        materialCode: "",
        equipmentCode: "",
        notes: ""
      }));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labour': return 'border-l-blue-500';
      case 'materials': return 'border-l-green-500';
      case 'equipment': return 'border-l-purple-500';
      default: return 'border-l-gray-500';
    }
  };

  const duplicateItem = (item: QuoteItem) => {
    const duplicate = {
      description: `${item.description} (Copy)`,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      category: item.category,
      subcategory: item.subcategory,
      workerType: item.workerType,
      hours: item.hours,
      hourlyRate: item.hourlyRate,
      materialCode: item.materialCode,
      equipmentCode: item.equipmentCode,
      notes: item.notes
    };
    onAdd(duplicate);
  };

  // Filter materials based on search and category
  const filteredMaterials = useMemo(() => {
    let filtered = commonMaterials;
    if (newItem.subcategory && newItem.subcategory !== 'all-categories') {
      filtered = filtered.filter(m => m.category === newItem.subcategory);
    }
    if (materialSearch.trim().length >= 2) {
      const searchTerm = materialSearch.toLowerCase();
      filtered = filtered.filter(material =>
        material.name.toLowerCase().includes(searchTerm) ||
        material.category.toLowerCase().includes(searchTerm) ||
        material.subcategory.toLowerCase().includes(searchTerm) ||
        (material.code && material.code.toLowerCase().includes(searchTerm))
      );
    }
    return filtered;
  }, [materialSearch, newItem.subcategory]);

  // RAG search effect
  useEffect(() => {
    const performRAGSearch = async () => {
      if (debouncedSearch.trim().length >= 3) {
        setIsSearchingRAG(true);
        try {
          const { data, error } = await supabase.functions.invoke('search-materials-fast', {
            body: {
              query: debouncedSearch,
              categoryFilter: newItem.subcategory && newItem.subcategory !== 'all-categories' ? newItem.subcategory : null,
              supplierFilter: 'all',
              limit: 30
            }
          });
          if (error) throw error;
          if (data?.materials) setRagResults(data.materials);
        } catch (err) {
          console.warn('Material search failed:', err);
          setRagResults([]);
        } finally {
          setIsSearchingRAG(false);
        }
      } else {
        setRagResults([]);
      }
    };
    performRAGSearch();
  }, [debouncedSearch, newItem.subcategory]);

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const categories = [
    { id: 'labour', label: 'Labour', icon: Wrench, color: 'bg-elec-yellow' },
    { id: 'materials', label: 'Materials', icon: Package, color: 'bg-elec-yellow' },
    { id: 'equipment', label: 'Equipment', icon: Zap, color: 'bg-elec-yellow' },
    { id: 'manual', label: 'Custom', icon: FileText, color: 'bg-elec-yellow' },
  ];

  const hourOptions = [
    { value: "1", label: "1 hour" },
    { value: "2", label: "2 hours" },
    { value: "4", label: "4 hours" },
    { value: "8", label: "8 hours (1 day)" },
    { value: "16", label: "16 hours (2 days)" },
    { value: "24", label: "24 hours (3 days)" },
    { value: "40", label: "40 hours (5 days)" },
  ];

  const markupOptions = [
    { value: "0", label: "No markup (0%)" },
    { value: "10", label: "10% markup" },
    { value: "15", label: "15% markup" },
    { value: "20", label: "20% markup" },
  ];

  return (
    <div className="space-y-4">
      {/* Running Total Banner */}
      {items.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
              <PoundSterling className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="text-[12px] text-white/70">Quote Total</p>
              <p className="text-[13px] text-white/70">{items.length} item{items.length !== 1 && 's'}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-elec-yellow">£{total.toFixed(2)}</p>
        </div>
      )}

      {/* Quick Actions - Scanner & Templates */}
      <div className="grid grid-cols-2 gap-3">
        {/* Scan Invoice - Primary Action */}
        <button
          type="button"
          onClick={() => setScannerSheetOpen(true)}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 touch-manipulation active:scale-[0.98] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Scan className="h-6 w-6 text-white" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-white">Scan Invoice</p>
            <p className="text-[11px] text-white/50">Photo or upload</p>
          </div>
        </button>

        {/* Job Templates */}
        <button
          type="button"
          onClick={() => setShowTemplates(true)}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
            <Copy className="h-6 w-6 text-elec-yellow" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-white">Templates</p>
            <p className="text-[11px] text-white/50">Common jobs</p>
          </div>
        </button>
      </div>

      {/* Markup Quick Select - Always visible */}
      {setPriceAdjustment && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            <span className="text-[13px] text-white/70">Material Markup</span>
          </div>
          <div className="flex gap-1">
            {[0, 10, 15, 20].map(markup => (
              <button
                key={markup}
                type="button"
                onClick={() => setPriceAdjustment(markup)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.97]',
                  priceAdjustment === markup
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.05] text-white/60'
                )}
              >
                {markup}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center gap-2 pt-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-wider text-white/40 font-medium">Add Items</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Category Pills - iOS-style segmented control */}
      <div className="grid grid-cols-4 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = newItem.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all touch-manipulation active:scale-[0.97]",
                isActive
                  ? "bg-elec-yellow text-black shadow-lg shadow-elec-yellow/20"
                  : "bg-white/[0.03] text-white/60 border border-white/[0.06]"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-black" : "text-white/60")} />
              <span className={cn("text-[12px] font-medium", isActive ? "text-black" : "text-white/60")}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Add Item Form - iOS grouped style */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
        {/* Labour Fields */}
        {newItem.category === "labour" && (
          <div className="p-4 space-y-4">
            {/* Worker Type - Visual Pills */}
            <div>
              <label className="text-[12px] text-white/50 uppercase tracking-wide mb-2 block">Worker Type</label>
              <div className="grid grid-cols-2 gap-2">
                {workerTypes.map(w => {
                  const isSelected = newItem.workerType === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => handleWorkerTypeChange(w.id)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl transition-all touch-manipulation active:scale-[0.98]",
                        isSelected
                          ? "bg-elec-yellow text-black"
                          : "bg-white/[0.03] text-white border border-white/[0.08]"
                      )}
                    >
                      <span className={cn("text-[13px] font-medium", isSelected ? "text-black" : "text-white")}>{w.name}</span>
                      <span className={cn("text-[12px] font-semibold", isSelected ? "text-black/70" : "text-white/50")}>£{w.defaultHourlyRate}/hr</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours - Visual Pills */}
            <div>
              <label className="text-[12px] text-white/50 uppercase tracking-wide mb-2 block">Hours</label>
              <div className="flex flex-wrap gap-2">
                {hourOptions.map(opt => {
                  const isSelected = newItem.hours === parseFloat(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleHoursChange(parseFloat(opt.value))}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]",
                        isSelected
                          ? "bg-elec-yellow text-black"
                          : "bg-white/[0.03] text-white/70 border border-white/[0.08]"
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Materials Fields */}
        {newItem.category === "materials" && (
          <div className="p-4 space-y-3">
            {/* Search Input - Full Width */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                placeholder="Search materials by name or code..."
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                className="h-12 pl-11 pr-4 bg-white/[0.03] border-white/[0.08] text-[15px] text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow/20 rounded-xl"
              />
            </div>

            {/* Material Results */}
            {materialSearch.length >= 2 && (filteredMaterials.length > 0 || ragResults.length > 0) && (
              <div>
                <p className="text-[12px] text-white/40 mb-2">
                  {filteredMaterials.length + ragResults.length} results {isSearchingRAG && "• Searching..."}
                </p>
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {filteredMaterials.slice(0, 5).map(material => {
                    const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice;
                    const isSelected = newItem.materialCode === material.id;
                    return (
                      <button
                        key={material.id}
                        type="button"
                        onClick={() => handleMaterialSelect(material.id)}
                        className={cn(
                          "w-full p-3 rounded-xl text-left transition-all touch-manipulation active:scale-[0.99]",
                          isSelected
                            ? "bg-elec-yellow/20 border border-elec-yellow/40"
                            : "bg-white/[0.03] border border-white/[0.06] active:bg-white/[0.06]"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-[14px] text-white">{material.name}</p>
                          <p className={cn("font-bold text-[15px]", isSelected ? "text-elec-yellow" : "text-white")}>
                            £{adjustedPrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-[12px] text-white/70 mt-0.5">{material.category}</p>
                      </button>
                    );
                  })}
                  {ragResults.slice(0, 10).map((material, idx) => {
                    const priceMatch = material.price?.match(/£?(\d+\.?\d*)/);
                    const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                    const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(basePrice) : basePrice;
                    return (
                      <button
                        key={`rag-${idx}`}
                        type="button"
                        onClick={() => {
                          setNewItem(prev => ({
                            ...prev,
                            description: material.name,
                            unitPrice: adjustedPrice,
                            unit: "each",
                            materialCode: `rag-${material.id}`,
                          }));
                          toast({ title: "Material Selected", description: material.name });
                        }}
                        className="w-full p-3 rounded-xl text-left bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.05] transition-all touch-manipulation"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-[14px] text-white">{material.name}</p>
                          <p className="font-bold text-[15px] text-white">£{adjustedPrice.toFixed(2)}</p>
                        </div>
                        <p className="text-[12px] text-white/70 mt-0.5">{material.supplier}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Equipment Fields */}
        {newItem.category === "equipment" && (
          <div className="divide-y divide-white/[0.06]">
            {/* Category */}
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[12px] text-white/40 block">Equipment Category</label>
                <Select
                  value={newItem.subcategory || ""}
                  onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value }))}
                >
                  <SelectTrigger className="w-full h-9 bg-transparent border-0 px-0 text-[15px] font-medium text-white focus:ring-0 focus:ring-offset-0 [&>svg]:text-white/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-white/10 text-foreground">
                    {equipmentCategories.map(c => (
                      <SelectItem key={c.id} value={c.id} className="text-foreground focus:bg-white/10 focus:text-foreground cursor-pointer">
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Equipment */}
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[12px] text-white/40 block">Equipment</label>
                <Select
                  value={newItem.equipmentCode || ""}
                  onValueChange={(value) => handleEquipmentSelect(value)}
                >
                  <SelectTrigger className="w-full h-9 bg-transparent border-0 px-0 text-[15px] font-medium text-white focus:ring-0 focus:ring-offset-0 [&>svg]:text-white/30">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-white/10 text-foreground">
                    {commonEquipment
                      .filter(e => !newItem.subcategory || e.category === newItem.subcategory)
                      .map(e => (
                        <SelectItem key={e.id} value={e.id} className="text-foreground focus:bg-white/10 focus:text-foreground cursor-pointer">
                          {e.name} - £{e.dailyRate}/{e.unit}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Fields */}
        {newItem.category === "manual" && (
          <div className="divide-y divide-white/[0.06]">
            {/* Description */}
            <div className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[12px] text-white/40 block mb-1">Description *</label>
                  <Textarea
                    placeholder="e.g., Site visit fee, Call-out charge"
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[80px] px-0 border-0 bg-transparent text-[15px] text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                  />
                </div>
              </div>
            </div>
            {/* Quantity */}
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Hash className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[12px] text-white/40 block">Quantity</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={newItem.quantity === 0 ? "" : newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value === "" ? 0 : parseFloat(e.target.value) }))}
                  placeholder="1"
                  className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            {/* Unit Price */}
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <PoundSterling className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[12px] text-white/40 block">Unit Price (£)</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={newItem.unitPrice === 0 ? "" : newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: e.target.value === "" ? 0 : parseFloat(e.target.value) }))}
                  placeholder="0.00"
                  className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            {/* Total Preview */}
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="flex items-center justify-between p-3.5 bg-elec-yellow/5">
                <span className="text-[14px] text-white/60">Item Total</span>
                <span className="text-lg font-bold text-elec-yellow">
                  £{(newItem.quantity * newItem.unitPrice).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Add Button */}
        <div className="p-3.5 bg-white/[0.02]">
          <Button
            onClick={handleAddItem}
            disabled={!newItem.description || newItem.unitPrice <= 0}
            className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-40"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Quote
          </Button>
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2">
            Added Items
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {items.map((item) => {
              const cat = categories.find(c => c.id === item.category);
              const Icon = cat?.icon || FileText;
              const color = cat?.color || 'bg-gray-500';
              return (
                <div key={item.id} className="p-3.5">
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
                      <Icon className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-medium text-[14px] text-white leading-tight">{item.description}</p>
                        <p className="text-[15px] font-bold text-elec-yellow shrink-0">
                          £{item.totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={item.quantity === 0 ? "" : item.quantity}
                            onChange={(e) => onUpdate(item.id, { quantity: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                            className="w-14 h-8 text-center text-[13px] bg-white/[0.05] border border-white/[0.1] rounded-lg text-white"
                          />
                          <span className="text-[12px] text-white/70">{item.unit}</span>
                        </div>
                        <span className="text-[12px] text-white/30">×</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-white/70">£</span>
                          <input
                            type="number"
                            value={item.unitPrice === 0 ? "" : item.unitPrice}
                            onChange={(e) => onUpdate(item.id, { unitPrice: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                            className="w-16 h-8 text-center text-[13px] bg-white/[0.05] border border-white/[0.1] rounded-lg text-white"
                          />
                        </div>
                        <div className="flex-1" />
                        <button
                          type="button"
                          onClick={() => duplicateItem(item)}
                          className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center touch-manipulation active:bg-white/[0.1]"
                        >
                          <Copy className="h-4 w-4 text-white/70" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Templates Button */}
      {!showTemplates ? (
        <button
          type="button"
          onClick={() => setShowTemplates(true)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.1] touch-manipulation active:bg-white/[0.05] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
              <FileText className="h-5 w-5 text-white/40" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-medium text-white">Use Job Template</p>
              <p className="text-[12px] text-white/70">Pre-built item sets for common jobs</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>
      ) : (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
            <h3 className="font-semibold text-white">Job Templates</h3>
            <button
              type="button"
              onClick={() => setShowTemplates(false)}
              className="text-[14px] text-elec-yellow font-medium touch-manipulation"
            >
              Close
            </button>
          </div>
          <div className="p-4">
            <JobTemplates onSelectTemplate={handleTemplateSelect} />
          </div>
        </div>
      )}

      {/* Invoice Scanner Sheet */}
      <InvoiceScannerSheet
        open={scannerSheetOpen}
        onOpenChange={setScannerSheetOpen}
        onCapture={handleScanCapture}
        onUpload={handleScanUpload}
        isProcessing={scanner.state === 'processing' || scanner.state === 'matching' || scanner.state === 'uploading'}
        progress={scanner.progress}
      />

      {/* Invoice Scan Results Sheet */}
      <InvoiceScanResults
        open={scanResultsOpen}
        onOpenChange={setScanResultsOpen}
        result={scanner.result}
        onToggleItem={scanner.toggleItemSelection}
        onSelectMatch={scanner.selectMatch}
        onUpdateItem={scanner.updateItem}
        onSelectAll={scanner.selectAll}
        onDeselectAll={scanner.deselectAll}
        onConfirm={handleConfirmScannedItems}
      />
    </div>
  );
};
