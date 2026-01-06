import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wrench, Package, Zap, FileText, Copy, TrendingUp, Search } from "lucide-react";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { JobTemplates } from "../JobTemplates";
import { cn } from "@/lib/utils";
import {
  workerTypes,
  materialCategories,
  commonMaterials,
  equipmentCategories,
  commonEquipment
} from "@/data/electrician/presetData";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "@/hooks/use-toast";

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

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
    setShowTemplates(false);
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
    { id: 'labour', label: 'Labour', icon: Wrench },
    { id: 'materials', label: 'Materials', icon: Package },
    { id: 'equipment', label: 'Equipment', icon: Zap },
    { id: 'manual', label: 'Custom', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header with Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold">Quote Items</h2>
        </div>
        {items.length > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-elec-yellow">£{total.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Category Pills - Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all active:scale-[0.98]",
              newItem.category === cat.id
                ? "bg-elec-yellow text-elec-dark border-elec-yellow font-semibold"
                : "bg-transparent border-border hover:border-elec-yellow/50"
            )}
          >
            <cat.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Add Item Form - Dashed border container */}
      <div className="space-y-4 p-4 bg-elec-gray/30 rounded-lg border-2 border-dashed border-border">
        {/* Labour Fields */}
        {newItem.category === "labour" && (
          <div className="space-y-4">
            <MobileSelectWrapper
              label="Worker Type"
              value={newItem.workerType}
              onValueChange={handleWorkerTypeChange}
              options={workerTypes.map(w => ({
                value: w.id,
                label: `${w.name} - £${w.defaultHourlyRate}/hr`
              }))}
              placeholder="Select worker type"
            />
            <MobileSelectWrapper
              label="Hours"
              value={newItem.hours > 0 ? newItem.hours.toString() : ""}
              onValueChange={(v) => handleHoursChange(parseFloat(v))}
              options={[
                { value: "1", label: "1 hour" },
                { value: "2", label: "2 hours" },
                { value: "4", label: "4 hours" },
                { value: "8", label: "8 hours (1 day)" },
                { value: "16", label: "16 hours (2 days)" },
                { value: "24", label: "24 hours (3 days)" },
                { value: "40", label: "40 hours (5 days)" },
              ]}
              placeholder="Select hours"
            />
          </div>
        )}

        {/* Materials Fields */}
        {newItem.category === "materials" && (
          <div className="space-y-4">
            {setPriceAdjustment && (
              <MobileSelectWrapper
                label="Material Markup"
                value={priceAdjustment.toString()}
                onValueChange={(v) => setPriceAdjustment(Number(v))}
                options={[
                  { value: "0", label: "No markup (0%)" },
                  { value: "10", label: "10% markup" },
                  { value: "15", label: "15% markup" },
                  { value: "20", label: "20% markup" },
                ]}
                placeholder="Select markup"
                icon={<TrendingUp className="h-4 w-4" />}
              />
            )}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Materials
              </Label>
              <Input
                placeholder="Search by name or code..."
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                className="h-14"
              />
              {materialSearch.length >= 2 && (
                <p className="text-xs text-muted-foreground">
                  {filteredMaterials.length} found {isSearchingRAG && "• Searching..."}
                </p>
              )}
            </div>

            {/* Material Results */}
            {materialSearch.length >= 2 && (filteredMaterials.length > 0 || ragResults.length > 0) && (
              <div className="max-h-[300px] overflow-y-auto space-y-2 rounded-lg border border-border p-2 bg-background">
                {filteredMaterials.slice(0, 5).map(material => {
                  const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice;
                  return (
                    <button
                      key={material.id}
                      type="button"
                      onClick={() => handleMaterialSelect(material.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border-l-4 text-left transition-all",
                        newItem.materialCode === material.id
                          ? "bg-elec-yellow/20 border-l-elec-yellow"
                          : "bg-elec-gray/30 border-l-green-500 hover:bg-elec-gray/50"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{material.name}</p>
                        <p className="font-bold text-elec-yellow">£{adjustedPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{material.category}</p>
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
                      className="w-full p-3 rounded-lg border-l-4 border-l-green-500/50 bg-elec-gray/20 text-left hover:bg-elec-gray/40"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{material.name}</p>
                        <p className="font-bold">£{adjustedPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{material.supplier}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Equipment Fields */}
        {newItem.category === "equipment" && (
          <div className="space-y-4">
            <MobileSelectWrapper
              label="Equipment Category"
              value={newItem.subcategory}
              onValueChange={(v) => setNewItem(prev => ({ ...prev, subcategory: v }))}
              options={equipmentCategories.map(c => ({ value: c.id, label: c.name }))}
              placeholder="Select category"
            />
            <MobileSelectWrapper
              label="Equipment"
              value={newItem.equipmentCode}
              onValueChange={handleEquipmentSelect}
              options={commonEquipment
                .filter(e => !newItem.subcategory || e.category === newItem.subcategory)
                .map(e => ({ value: e.id, label: `${e.name} - £${e.dailyRate}/${e.unit}` }))}
              placeholder="Select equipment"
            />
          </div>
        )}

        {/* Manual Entry Fields */}
        {newItem.category === "manual" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description *</Label>
              <Textarea
                placeholder="e.g., Site visit fee, Call-out charge"
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px] text-base border-2 border-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantity</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={newItem.quantity || ""}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 1 }))}
                  className="h-14"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Unit Price (£)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={newItem.unitPrice || ""}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                  className="h-14"
                />
              </div>
            </div>
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="p-3 bg-elec-yellow/10 rounded-lg text-right">
                <span className="text-sm text-muted-foreground">Total: </span>
                <span className="text-lg font-bold text-elec-yellow">
                  £{(newItem.quantity * newItem.unitPrice).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleAddItem}
          disabled={!newItem.description || newItem.unitPrice <= 0}
          className="w-full h-14 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add to Quote
        </Button>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <>
          <div className="border-t border-border/50" />
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {items.length} item{items.length !== 1 && 's'} added
            </p>
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 bg-elec-gray/50 rounded-lg border-l-4",
                  getCategoryColor(item.category)
                )}
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <p className="font-medium text-sm flex-1">{item.description}</p>
                  <p className="text-lg font-bold text-elec-yellow shrink-0">
                    £{item.totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 1 })}
                      className="w-16 h-10 text-center text-sm bg-background border rounded"
                    />
                    <span className="text-xs text-muted-foreground">{item.unit}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">x</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">£</span>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                      className="w-20 h-10 text-center text-sm bg-background border rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => duplicateItem(item)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Job Templates Link */}
      {!showTemplates ? (
        <button
          type="button"
          onClick={() => setShowTemplates(true)}
          className="w-full p-4 border-2 border-dashed border-border rounded-lg text-center hover:border-elec-yellow/50 transition-colors"
        >
          <FileText className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Use Job Template</p>
          <p className="text-xs text-muted-foreground">Pre-built item sets for common jobs</p>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Job Templates</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowTemplates(false)}>
              Close
            </Button>
          </div>
          <JobTemplates onSelectTemplate={handleTemplateSelect} />
        </div>
      )}
    </div>
  );
};
