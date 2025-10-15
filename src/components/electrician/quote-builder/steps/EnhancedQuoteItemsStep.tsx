import { useState, useMemo } from "react";
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
    category: "labour" as 'labour' | 'materials' | 'equipment',
    subcategory: "",
    workerType: "",
    hours: 0,
    hourlyRate: 0,
    materialCode: "",
    equipmentCode: "",
    notes: ""
  });

  const [materialSearch, setMaterialSearch] = useState("");


  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
  };


  const handleCategoryChange = (category: string) => {
    setNewItem(prev => ({
      ...prev,
      category: category as 'labour' | 'materials' | 'equipment',
      subcategory: "",
      workerType: "",
      hours: 0,
      hourlyRate: 0,
      materialCode: "",
      equipmentCode: "",
      unitPrice: 0,
      unit: category === "labour" ? "hour" : "each"
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
        unit: prev.category === "labour" ? "hour" : "each",
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

  // Filter materials based on search and category
  const filteredMaterials = useMemo(() => {
    let filtered = commonMaterials;

    // Filter by category if selected
    if (newItem.subcategory) {
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
            <CardContent className="pt-6">
              <div className="space-y-4">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                    <Select value={newItem.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="h-12 w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background border shadow-lg">
                        <SelectItem value="labour">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4" />
                            Labour
                          </div>
                        </SelectItem>
                        <SelectItem value="materials">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Materials
                          </div>
                        </SelectItem>
                        <SelectItem value="equipment">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Equipment
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Labour specific fields */}
                  {newItem.category === "labour" && (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="workerType" className="text-sm font-medium">Worker Type</Label>
                        <Select value={newItem.workerType} onValueChange={handleWorkerTypeChange}>
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue placeholder="Select worker type" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            {workerTypes.map(worker => (
                              <SelectItem key={worker.id} value={worker.id} className="py-3">
                                <div className="flex justify-between items-center w-full gap-4">
                                  <span className="font-medium">{worker.name}</span>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">£{worker.defaultHourlyRate}/hour</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hours" className="text-sm font-medium">Hours</Label>
                         <Select value={newItem.hours > 0 ? newItem.hours.toString() : ""} onValueChange={(value) => handleHoursChange(parseFloat(value))}>
                           <SelectTrigger className="h-12 w-full">
                             <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            <SelectItem value="0.5">0.5 hours</SelectItem>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="1.5">1.5 hours</SelectItem>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="2.5">2.5 hours</SelectItem>
                            <SelectItem value="3">3 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="5">5 hours</SelectItem>
                            <SelectItem value="6">6 hours</SelectItem>
                            <SelectItem value="7">7 hours</SelectItem>
                            <SelectItem value="8">8 hours (1 day)</SelectItem>
                            <SelectItem value="10">10 hours</SelectItem>
                            <SelectItem value="12">12 hours</SelectItem>
                            <SelectItem value="16">16 hours (2 days)</SelectItem>
                            <SelectItem value="24">24 hours (3 days)</SelectItem>
                            <SelectItem value="32">32 hours (4 days)</SelectItem>
                            <SelectItem value="40">40 hours (5 days)</SelectItem>
                            <SelectItem value="48">48 hours (6 days)</SelectItem>
                            <SelectItem value="56">56 hours (7 days)</SelectItem>
                            <SelectItem value="80">80 hours (10 days)</SelectItem>
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
                      
                      {/* Search Materials */}
                      <div className="space-y-2">
                        <Label htmlFor="materialSearch" className="text-sm font-medium flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Search Materials
                        </Label>
                        <Input
                          id="materialSearch"
                          placeholder="Search by name, category, or code..."
                          value={materialSearch}
                          onChange={(e) => setMaterialSearch(e.target.value)}
                          className="h-12"
                        />
                        {materialSearch.length >= 2 && (
                          <p className="text-xs text-muted-foreground">
                            Found {filteredMaterials.length} material{filteredMaterials.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="materialCategory" className="text-sm font-medium">Material Category</Label>
                          <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value, materialCode: "" }))}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-background border shadow-lg">
                              <SelectItem value="all-categories">All Categories</SelectItem>
                              {materialCategories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                      <div className="space-y-2">
                        <Label htmlFor="material" className="text-sm font-medium">Material</Label>
                        <Select value={newItem.materialCode} onValueChange={handleMaterialSelect}>
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue 
                              placeholder={filteredMaterials.length > 0 ? "Select material" : "No materials found"}
                              className="truncate"
                            />
                          </SelectTrigger>
                           <SelectContent className="z-50 bg-background border shadow-lg max-h-[400px] overflow-y-auto">
                             {filteredMaterials.length > 0 ? (
                               filteredMaterials.map(material => {
                                 const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice;
                                 return (
                                   <SelectItem key={material.id} value={material.id} className="cursor-pointer w-full">
                                     <div className="flex flex-col py-1 w-full">
                                       <span className="font-medium text-sm truncate">{material.name}</span>
                                       <span className="text-xs text-muted-foreground truncate">
                                         {material.code && `${material.code} | `}
                                         {priceAdjustment > 0 ? (
                                           <>Base: £{material.defaultPrice.toFixed(2)} | Adjusted: £{adjustedPrice.toFixed(2)} (+{priceAdjustment}%)</>
                                         ) : (
                                           <>£{material.defaultPrice.toFixed(2)}/{material.unit}</>
                                         )}
                                       </span>
                                     </div>
                                   </SelectItem>
                                 );
                               })
                              ) : (
                                <SelectItem value="no-materials" disabled>
                                  No materials found
                                </SelectItem>
                              )}
                           </SelectContent>
                        </Select>
                      </div>
                      </div>
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

                <Button onClick={handleAddItem} className="w-full">
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
        <Card className="bg-card border border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-base sm:text-lg">Quote Items ({items.length})</CardTitle>
              <div className="flex flex-col sm:items-end">
                <span className="text-xs text-muted-foreground">Total:</span>
                <span className="text-lg sm:text-xl font-bold text-primary truncate">
                  £{total.toFixed(2)}
                </span>
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
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-muted">
                    <TableHead className="w-[40px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center w-[100px]">Quantity</TableHead>
                    <TableHead className="text-center w-[80px]">Unit</TableHead>
                    <TableHead className="text-right w-[120px]">Unit Price</TableHead>
                    <TableHead className="text-right w-[100px]">Total</TableHead>
                    <TableHead className="text-center w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} className="border-muted">
                      <TableCell className="py-3">
                        <div className="flex items-center justify-center">
                          {getCategoryIcon(item.category)}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div>
                          <p className="font-medium">{item.description}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3">
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
                          className="w-20 text-center h-10"
                          min="0.1"
                          step="0.1"
                          aria-label="Quantity"
                        />
                      </TableCell>
                      <TableCell className="text-center py-3 text-sm">{item.unit}</TableCell>
                      <TableCell className="text-right py-3">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-sm text-muted-foreground">£</span>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={item.unitPrice === 0 ? "" : item.unitPrice}
                            onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                            className="w-24 text-left h-10"
                            min="0"
                            step="0.01"
                            aria-label="Unit price"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3 font-semibold">
                        £{item.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <div className="flex items-center justify-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => duplicateItem(item)}
                                  className="h-8 w-8 p-0"
                                  aria-label="Duplicate item"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Duplicate item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onRemove(item.id)}
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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