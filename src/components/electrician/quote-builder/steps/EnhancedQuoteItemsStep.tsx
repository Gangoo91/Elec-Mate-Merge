import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash2, Wrench, Package, Zap, Clock, FileText, Copy, TrendingUp, Tag, Hash, DollarSign, Ruler, MessageSquare, RotateCcw, Search } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileQuoteItemCard } from "../MobileQuoteItemCard";
import { Switch } from "@/components/ui/switch";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { JobTemplates } from "../JobTemplates";
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
  const debouncedSearch = useDebounce(materialSearch, 500);


  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
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
      
      // Reset form while preserving category
      setNewItem(prev => ({
        description: "",
        quantity: 1,
        unit: prev.category === "labour" ? "hour" : prev.category === "manual" ? "item" : "each",
        unitPrice: 0,
        category: prev.category, // Preserve the selected category
        subcategory: "", // Reset subcategory for flexibility
        workerType: "",
        hours: 0,
        hourlyRate: 0,
        materialCode: "",
        equipmentCode: "",
        notes: ""
      }));
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-4 w-4" />;
      case 'materials': return <Package className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      case 'manual': return <FileText className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
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

  const getSubcategories = () => {
    if (newItem.category === "materials") {
      const category = materialCategories.find(c => c.id === newItem.subcategory);
      return category ? category.subcategories : [];
    }
    if (newItem.category === "equipment") {
      const category = equipmentCategories.find(c => c.id === newItem.subcategory);
      return category ? category.items : [];
    }
    return [];
  };

  // Filter materials based on search and category (instant client-side search)
  const filteredMaterials = useMemo(() => {
    let filtered = commonMaterials;

    // Filter by category if selected
    if (newItem.subcategory && newItem.subcategory !== 'all-categories') {
      filtered = filtered.filter(m => m.category === newItem.subcategory);
    }

    // Filter by search term
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

  // RAG search effect (searches 43k materials)
  useEffect(() => {
    const performRAGSearch = async () => {
      if (debouncedSearch.trim().length >= 3) {
        setIsSearchingRAG(true);
        try {
          const { data, error } = await supabase.functions.invoke('search-pricing-rag', {
            body: {
              query: debouncedSearch,
              categoryFilter: newItem.subcategory && newItem.subcategory !== 'all-categories' ? newItem.subcategory : null,
              supplierFilter: 'all',
              matchThreshold: 0.6,
              matchCount: 30
            }
          });

          if (error) throw error;

          if (data?.materials) {
            setRagResults(data.materials);
          }
        } catch (err) {
          console.warn('RAG search failed, using instant results only:', err);
          // Silent fallback - just show instant results without error message
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


  return (
    <div className="space-y-4">
      <Tabs defaultValue="labour" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="labour" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Labour
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Job Templates</span>
            <span className="sm:hidden">Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="labour">
          <Card className="bg-card/50 border border-primary/20">
            <CardContent className="pt-6 pb-6 px-4 sm:px-6">
              <div className="space-y-5 sm:space-y-6">
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-base font-semibold text-foreground">Category</Label>
                    <Select value={newItem.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="h-14 sm:h-12 w-full text-base sm:text-sm border-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background border-2 shadow-lg">
                        <SelectItem value="labour" className="py-3 text-base sm:text-sm">
                          <div className="flex items-center gap-3">
                            <Wrench className="h-5 w-5 sm:h-4 sm:w-4" />
                            <span className="font-medium">Labour</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="materials" className="py-3 text-base sm:text-sm">
                          <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 sm:h-4 sm:w-4" />
                            <span className="font-medium">Materials</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="equipment" className="py-3 text-base sm:text-sm">
                          <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 sm:h-4 sm:w-4" />
                            <span className="font-medium">Equipment</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="manual" className="py-3 text-base sm:text-sm">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 sm:h-4 sm:w-4" />
                            <span className="font-medium">Manual Entry</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Labour specific fields */}
                  {newItem.category === "labour" && (
                    <div className="grid grid-cols-1 gap-5 sm:gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="workerType" className="text-base font-semibold text-foreground">Worker Type</Label>
                        <Select value={newItem.workerType} onValueChange={handleWorkerTypeChange}>
                          <SelectTrigger className="h-14 sm:h-12 w-full text-base sm:text-sm border-2">
                            <SelectValue placeholder="Select worker type" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border-2 shadow-lg">
                            {workerTypes.map(worker => (
                              <SelectItem key={worker.id} value={worker.id} className="py-4 sm:py-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-1 sm:gap-4">
                                  <span className="font-semibold text-base sm:text-sm">{worker.name}</span>
                                  <span className="text-sm sm:text-xs text-muted-foreground whitespace-nowrap font-medium">£{worker.defaultHourlyRate}/hour</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="hours" className="text-base font-semibold text-foreground">Hours</Label>
                         <Select value={newItem.hours > 0 ? newItem.hours.toString() : ""} onValueChange={(value) => handleHoursChange(parseFloat(value))}>
                           <SelectTrigger className="h-14 sm:h-12 w-full text-base sm:text-sm border-2">
                             <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border-2 shadow-lg max-h-[60vh] overflow-y-auto">
                            <SelectItem value="0.5" className="py-3 text-base sm:text-sm">0.5 hours</SelectItem>
                            <SelectItem value="1" className="py-3 text-base sm:text-sm">1 hour</SelectItem>
                            <SelectItem value="1.5" className="py-3 text-base sm:text-sm">1.5 hours</SelectItem>
                            <SelectItem value="2" className="py-3 text-base sm:text-sm">2 hours</SelectItem>
                            <SelectItem value="2.5" className="py-3 text-base sm:text-sm">2.5 hours</SelectItem>
                            <SelectItem value="3" className="py-3 text-base sm:text-sm">3 hours</SelectItem>
                            <SelectItem value="4" className="py-3 text-base sm:text-sm">4 hours</SelectItem>
                            <SelectItem value="5" className="py-3 text-base sm:text-sm">5 hours</SelectItem>
                            <SelectItem value="6" className="py-3 text-base sm:text-sm">6 hours</SelectItem>
                            <SelectItem value="7" className="py-3 text-base sm:text-sm">7 hours</SelectItem>
                            <SelectItem value="8" className="py-3 text-base sm:text-sm font-medium">8 hours (1 day)</SelectItem>
                            <SelectItem value="10" className="py-3 text-base sm:text-sm">10 hours</SelectItem>
                            <SelectItem value="12" className="py-3 text-base sm:text-sm">12 hours</SelectItem>
                            <SelectItem value="16" className="py-3 text-base sm:text-sm font-medium">16 hours (2 days)</SelectItem>
                            <SelectItem value="24" className="py-3 text-base sm:text-sm font-medium">24 hours (3 days)</SelectItem>
                            <SelectItem value="32" className="py-3 text-base sm:text-sm font-medium">32 hours (4 days)</SelectItem>
                            <SelectItem value="40" className="py-3 text-base sm:text-sm font-medium">40 hours (5 days)</SelectItem>
                            <SelectItem value="48" className="py-3 text-base sm:text-sm font-medium">48 hours (6 days)</SelectItem>
                            <SelectItem value="56" className="py-3 text-base sm:text-sm font-medium">56 hours (7 days)</SelectItem>
                            <SelectItem value="80" className="py-3 text-base sm:text-sm font-medium">80 hours (10 days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Materials specific fields */}
                  {newItem.category === "materials" && (
                    <div className="space-y-4">
                      {/* Material Markup Selection */}
                      {setPriceAdjustment && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Material Markup
                          </Label>
                          <Select value={priceAdjustment.toString()} onValueChange={(value) => setPriceAdjustment(Number(value))}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select markup" />
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-background border shadow-lg">
                              <SelectItem value="0">No markup (0%)</SelectItem>
                              <SelectItem value="5">5% markup</SelectItem>
                              <SelectItem value="10">10% markup</SelectItem>
                              <SelectItem value="15">15% markup</SelectItem>
                              <SelectItem value="20">20% markup</SelectItem>
                            </SelectContent>
                          </Select>
                          {priceAdjustment > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Applied to all material prices below
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Search Materials - Hybrid Instant + RAG Search */}
                      <div className="space-y-2">
                        <Label htmlFor="materialSearch" className="text-sm font-medium flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Search 43k Materials
                        </Label>
                        <Input
                          id="materialSearch"
                          placeholder="Search by name, category, or code..."
                          value={materialSearch}
                          onChange={(e) => setMaterialSearch(e.target.value)}
                          className="h-12"
                        />
                        {materialSearch.length >= 2 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Instant: {filteredMaterials.length} found</span>
                            {isSearchingRAG && <span className="animate-pulse">• Searching 43k materials...</span>}
                            {!isSearchingRAG && ragResults.length > 0 && <span>• RAG: {ragResults.length} found</span>}
                          </div>
                        )}
                      </div>

                      {/* Material Category Filter */}
                      <div className="space-y-2">
                        <Label htmlFor="materialCategory" className="text-sm font-medium">Material Category</Label>
                        <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value, materialCode: "" }))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            <SelectItem value="all-categories">All Categories</SelectItem>
                            {materialCategories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Material Search Results */}
                      {materialSearch.trim().length >= 2 && (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto border rounded-lg p-3 bg-card/50">
                          {/* Instant Results (from ~50 materials) */}
                          {filteredMaterials.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quick Results</h4>
                              {filteredMaterials.slice(0, 5).map(material => {
                                const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice;
                                return (
                                  <Card 
                                    key={material.id} 
                                    className="p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-primary/50"
                                    onClick={() => handleMaterialSelect(material.id)}
                                  >
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{material.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {material.code && `${material.code} • `}{material.category}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold text-sm">
                                          {priceAdjustment > 0 ? (
                                            <span className="text-primary">£{adjustedPrice.toFixed(2)}</span>
                                          ) : (
                                            `£${material.defaultPrice.toFixed(2)}`
                                          )}
                                        </p>
                                        <p className="text-xs text-muted-foreground">/{material.unit}</p>
                                      </div>
                                    </div>
                                  </Card>
                                );
                              })}
                            </div>
                          )}

                          {/* RAG Results (from 43k materials) */}
                          {ragResults.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                <Zap className="h-3 w-3" />
                                All Materials ({ragResults.length} found)
                              </h4>
                              {ragResults.map((material, idx) => {
                                const priceMatch = material.price?.match(/£?(\d+\.?\d*)/);
                                const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                                const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(basePrice) : basePrice;
                                
                                return (
                                  <Card 
                                    key={`rag-${material.id}-${idx}`} 
                                    className="p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={() => {
                                      setNewItem(prev => ({
                                        ...prev,
                                        description: material.name,
                                        unitPrice: adjustedPrice,
                                        unit: "each",
                                        materialCode: `rag-${material.id}`,
                                        notes: `Supplier: ${material.supplier} | Stock: ${material.stockStatus}${material.productUrl ? ` | URL: ${material.productUrl}` : ''}`
                                      }));
                                      toast({
                                        title: "Material Selected",
                                        description: `${material.name} - £${adjustedPrice.toFixed(2)}`,
                                      });
                                    }}
                                  >
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{material.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {material.supplier} • {material.stockStatus}
                                          {material.similarity && ` • ${Math.round(material.similarity * 100)}% match`}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold text-sm">
                                          {priceAdjustment > 0 ? (
                                            <span className="text-primary">£{adjustedPrice.toFixed(2)}</span>
                                          ) : (
                                            material.price
                                          )}
                                        </p>
                                        {priceAdjustment > 0 && (
                                          <p className="text-xs text-muted-foreground line-through">{material.price}</p>
                                        )}
                                      </div>
                                    </div>
                                  </Card>
                                );
                              })}
                            </div>
                          )}

                          {/* Loading State */}
                          {isSearchingRAG && ragResults.length === 0 && filteredMaterials.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Search className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                              <p className="text-sm">Searching 43,371 materials...</p>
                            </div>
                          )}

                          {/* No Results */}
                          {!isSearchingRAG && ragResults.length === 0 && filteredMaterials.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Package className="h-8 w-8 mx-auto mb-2" />
                              <p className="text-sm">No materials found</p>
                              <p className="text-xs">Try a different search term</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Equipment specific fields */}
                  {newItem.category === "equipment" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="equipmentCategory" className="text-sm font-medium">Equipment Category</Label>
                        <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value }))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            {equipmentCategories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="equipment" className="text-sm font-medium">Equipment</Label>
                        <Select value={newItem.equipmentCode} onValueChange={handleEquipmentSelect}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select equipment" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            {commonEquipment
                              .filter(e => !newItem.subcategory || e.category === newItem.subcategory)
                              .map(equipment => (
                              <SelectItem key={equipment.id} value={equipment.id}>
                                <div className="flex flex-col">
                                  <span>{equipment.name}</span>
                                  <span className="text-xs text-muted-foreground">£{equipment.dailyRate}/{equipment.unit}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Manual Entry specific fields */}
                  {newItem.category === "manual" && (
                    <div className="space-y-5">
                      {/* Description - textarea for flexibility */}
                      <div className="space-y-3">
                        <Label htmlFor="manualDescription" className="text-base font-semibold text-foreground">
                          Description *
                        </Label>
                        <Textarea
                          id="manualDescription"
                          placeholder="e.g., Site visit fee, Call-out charge, Disposal fee, Parking permit"
                          value={newItem.description}
                          onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                          className="min-h-[100px] text-base sm:text-sm border-2"
                        />
                      </div>

                      {/* Quantity and Unit in a grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor="manualQuantity" className="text-base font-semibold text-foreground">
                            Quantity *
                          </Label>
                          <Input
                            id="manualQuantity"
                            type="number"
                            inputMode="decimal"
                            placeholder="1"
                            value={newItem.quantity || ""}
                            onChange={(e) => setNewItem(prev => ({ 
                              ...prev, 
                              quantity: parseFloat(e.target.value) || 1 
                            }))}
                            className="h-14 sm:h-12 text-base sm:text-sm border-2"
                            min="0.1"
                            step="0.1"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="manualUnit" className="text-base font-semibold text-foreground">
                            Unit *
                          </Label>
                          <Select 
                            value={newItem.unit} 
                            onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}
                          >
                            <SelectTrigger className="h-14 sm:h-12 w-full text-base sm:text-sm border-2">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-background border-2 shadow-lg">
                              <SelectItem value="item">item</SelectItem>
                              <SelectItem value="each">each</SelectItem>
                              <SelectItem value="hour">hour</SelectItem>
                              <SelectItem value="day">day</SelectItem>
                              <SelectItem value="week">week</SelectItem>
                              <SelectItem value="visit">visit</SelectItem>
                              <SelectItem value="trip">trip</SelectItem>
                              <SelectItem value="set">set</SelectItem>
                              <SelectItem value="metre">metre</SelectItem>
                              <SelectItem value="sq metre">sq metre</SelectItem>
                              <SelectItem value="panel">panel</SelectItem>
                              <SelectItem value="circuit">circuit</SelectItem>
                              <SelectItem value="point">point</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="space-y-3">
                        <Label htmlFor="manualUnitPrice" className="text-base font-semibold text-foreground">
                          Unit Price *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base sm:text-sm font-semibold text-muted-foreground">
                            £
                          </span>
                          <Input
                            id="manualUnitPrice"
                            type="number"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={newItem.unitPrice || ""}
                            onChange={(e) => setNewItem(prev => ({ 
                              ...prev, 
                              unitPrice: parseFloat(e.target.value) || 0 
                            }))}
                            className="h-14 sm:h-12 pl-8 text-base sm:text-sm border-2"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>

                      {/* Total Price Display */}
                      {newItem.quantity > 0 && newItem.unitPrice > 0 && (
                        <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Total Price:</span>
                            <span className="text-2xl font-bold text-primary">
                              £{(newItem.quantity * newItem.unitPrice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Optional Notes */}
                      <div className="space-y-3">
                        <Label htmlFor="manualNotes" className="text-base font-semibold text-foreground">
                          Notes (optional)
                        </Label>
                        <Textarea
                          id="manualNotes"
                          placeholder="Any additional details or notes..."
                          value={newItem.notes || ""}
                          onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                          className="min-h-[80px] text-base sm:text-sm border-2"
                        />
                      </div>
                    </div>
                  )}

                <Button onClick={handleAddItem} className="w-full h-14 sm:h-11 text-base sm:text-sm font-semibold mt-2">
                  Add Item to Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <JobTemplates onSelectTemplate={handleTemplateSelect} />
        </TabsContent>
      </Tabs>

      {/* Items List */}
      {items.length > 0 && (
        <Card className="bg-gradient-to-br from-elec-card/80 to-elec-dark/30 border-2 border-primary/30 shadow-lg">
          <CardHeader className="border-b border-primary/30 bg-elec-card/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Quote Items ({items.length})
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="text-2xl font-bold text-primary">£{total.toFixed(2)}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {items.map((item) => (
                <MobileQuoteItemCard
                  key={item.id}
                  item={item}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                  onDuplicate={duplicateItem}
                />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-primary/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-primary/30 bg-elec-card/50">
                    <TableHead className="w-[60px] text-muted-foreground font-semibold">Type</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Description</TableHead>
                    <TableHead className="text-center w-[120px] text-muted-foreground font-semibold">Quantity</TableHead>
                    <TableHead className="text-center w-[100px] text-muted-foreground font-semibold">Unit</TableHead>
                    <TableHead className="text-right w-[140px] text-muted-foreground font-semibold">Unit Price</TableHead>
                    <TableHead className="text-right w-[140px] text-muted-foreground font-semibold">Total</TableHead>
                    <TableHead className="text-center w-[120px] text-muted-foreground font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`border-b border-primary/10 transition-all hover:bg-elec-card/40 hover:scale-[1.01] ${
                        index % 2 === 0 ? 'bg-elec-card/20' : 'bg-transparent'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center justify-center">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            {getCategoryIcon(item.category)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-base text-foreground">{item.description}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Input
                          type="number"
                          inputMode="decimal"
                          value={item.quantity === 0 ? "" : item.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                              onUpdate(item.id, { quantity: 0 });
                            } else {
                              const parsed = parseFloat(value);
                              if (!isNaN(parsed) && parsed >= 0) {
                                onUpdate(item.id, { quantity: parsed });
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (isNaN(value) || value <= 0) {
                              onUpdate(item.id, { quantity: 1 });
                            }
                          }}
                          className="w-24 text-center h-11 font-semibold bg-background border-2 border-primary/20 focus:border-primary/40 shadow-sm"
                          min="0.1"
                          step="0.1"
                          aria-label="Quantity"
                        />
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <span className="text-sm font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                          {item.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-sm text-muted-foreground font-semibold">£</span>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={item.unitPrice === 0 ? "" : item.unitPrice.toFixed(2)}
                            onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                            className="w-28 text-right h-11 font-semibold bg-background border-2 border-primary/20 focus:border-primary/40 shadow-sm"
                            min="0"
                            step="0.01"
                            aria-label="Unit price"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <span className="text-lg font-bold text-primary">
                          £{item.totalPrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => duplicateItem(item)}
                            className="h-9 w-9 p-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                            aria-label="Duplicate item"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onRemove(item.id)}
                            className="h-9 w-9 p-0 bg-red-500/10 border border-red-500/30 text-red-600 hover:bg-red-500/20 hover:border-red-500/50"
                            aria-label="Delete item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};