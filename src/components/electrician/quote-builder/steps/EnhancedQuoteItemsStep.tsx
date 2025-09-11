import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wrench, Package, Zap, Clock, Users, FileText, Copy, Calculator, Search } from "lucide-react";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { JobTemplates } from "../JobTemplates";
import { 
  workerTypes, 
  materialCategories, 
  commonMaterials, 
  equipmentCategories, 
  commonEquipment,
  labourPresets
} from "@/data/electrician/presetData";
import { enhancedMaterials, EnhancedMaterialItem } from "@/data/electrician/enhancedPricingData";
import MaterialSearchEnhanced from "../MaterialSearchEnhanced";
import { LiveMaterialPricing } from "./LiveMaterialPricing";
import { useQuoteMaterialIntegration } from "@/hooks/useQuoteMaterialIntegration";

interface EnhancedQuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
}

export const EnhancedQuoteItemsStep = ({ items, onAdd, onUpdate, onRemove }: EnhancedQuoteItemsStepProps) => {
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

  // Material integration hook
  const { addMaterialToQuote, addMultipleMaterialsToQuote } = useQuoteMaterialIntegration(onAdd);

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
        unitPrice: material.defaultPrice,
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

  const handleLabourPresetSelect = (preset: any) => {
    const worker = workerTypes.find(w => w.id === preset.workerType);
    if (worker) {
      setNewItem(prev => ({
        ...prev,
        description: preset.description,
        workerType: preset.workerType,
        hours: preset.hours,
        hourlyRate: worker.defaultHourlyRate,
        unitPrice: worker.defaultHourlyRate,
        quantity: preset.hours,
        unit: "hour",
        notes: preset.notes
      }));
      
      // Show feedback that preset was selected
      console.log('Labour preset selected:', preset.description);
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
      
      // Reset form
      setNewItem({
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

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // Handler for enhanced materials
  const handleEnhancedMaterialAdd = (material: EnhancedMaterialItem, quantity: number, pricing: any) => {
    const itemToAdd = {
      description: material.name,
      quantity,
      unit: material.unit,
      unitPrice: pricing.unitPrice,
      category: "materials" as const,
      subcategory: material.subcategory,
      materialCode: material.code || material.id,
      notes: `${material.brand} - ${material.priceSource}`
    };
    onAdd(itemToAdd);
  };

  return (
    <div className="mobile-section-spacing">
      <DropdownTabs
        tabs={[
          {
            value: "enhanced",
            label: "Smart Pricing",
            icon: Calculator,
            content: (
              <div className="w-full bg-card/50 border border-primary/20 rounded-lg p-3 sm:p-4">
                <div className="mb-3 sm:mb-4">
                  <h3 className="mobile-subheading flex items-center gap-2">
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                    Enhanced Materials Pricing
                  </h3>
                  <p className="mobile-small-text text-muted-foreground mt-1 leading-relaxed">
                    Smart pricing with quantity discounts, waste factors, and regional adjustments
                  </p>
                </div>
                <MaterialSearchEnhanced onAddMaterial={handleEnhancedMaterialAdd} currentQuoteItems={items} />
              </div>
            )
          },
          {
            value: "live",
            label: "Live Pricing",
            icon: Search,
            content: (
              <div className="w-full bg-card/50 border border-primary/20 rounded-lg p-3 sm:p-4">
                <LiveMaterialPricing 
                  onAddToQuote={addMaterialToQuote}
                  onAddMultipleToQuote={addMultipleMaterialsToQuote}
                />
              </div>
            )
          },
          {
            value: "quick",
            label: "Quick Add",
            icon: Clock,
            content: (
              <div className="w-full bg-card/50 border border-primary/20 rounded-lg p-3 sm:p-4">
                <div className="mb-3 sm:mb-4">
                  <h3 className="mobile-subheading flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                    Quick Add Items
                  </h3>
                </div>
                <div className="mobile-input-spacing">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="mobile-small-text font-medium">Category</Label>
                    <Select value={newItem.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="touch-target w-full mobile-focus">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background border shadow-lg select-scrollbar-none">
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
                              <SelectItem key={worker.id} value={worker.id}>
                                <div className="flex flex-col">
                                  <span>{worker.name}</span>
                                  <span className="text-xs text-muted-foreground">£{worker.defaultHourlyRate}/hour</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hours" className="text-sm font-medium">Hours</Label>
                        <Select value={newItem.hours.toString()} onValueChange={(value) => handleHoursChange(parseFloat(value))}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="materialCategory" className="text-sm font-medium">Material Category</Label>
                        <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value }))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            {materialCategories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="material" className="text-sm font-medium">Material</Label>
                        <Select value={newItem.materialCode} onValueChange={handleMaterialSelect}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-background border shadow-lg">
                            {commonMaterials
                              .filter(m => !newItem.subcategory || m.category === newItem.subcategory)
                              .map(material => (
                              <SelectItem key={material.id} value={material.id}>
                                <div className="flex flex-col">
                                  <span>{material.name}</span>
                                  <span className="text-xs text-muted-foreground">£{material.defaultPrice}/{material.unit}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    Add Item
                  </Button>
                </div>
              </div>
            )
          },
          {
            value: "manual",
            label: "Manual Entry",
            icon: Plus,
            content: (
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Manual Item Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                      <Input
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Item description"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category-manual" className="text-sm font-medium">Category</Label>
                      <Select value={newItem.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-background border shadow-lg">
                          <SelectItem value="labour">Labour</SelectItem>
                          <SelectItem value="materials">Materials</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                      <Input
                        type="number"
                        value={newItem.quantity === 0 ? "" : newItem.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            setNewItem(prev => ({ ...prev, quantity: 0 }));
                          } else {
                            const parsed = parseFloat(value);
                            if (!isNaN(parsed) && parsed >= 0) {
                              setNewItem(prev => ({ ...prev, quantity: parsed }));
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (isNaN(value) || value <= 0) {
                            setNewItem(prev => ({ ...prev, quantity: 1 }));
                          }
                        }}
                        min="0.1"
                        step="0.1"
                        className="h-12"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit-price" className="text-sm font-medium">Unit Price (£)</Label>
                      <Input
                        type="number"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                        min="0"
                        step="0.01"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
                      <Select value={newItem.unit} onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-background border shadow-lg">
                          <SelectItem value="each">Each</SelectItem>
                          <SelectItem value="hour">Hour</SelectItem>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="metre">Metre</SelectItem>
                          <SelectItem value="m²">Square Metre</SelectItem>
                          <SelectItem value="point">Point</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
                      <Textarea
                        value={newItem.notes}
                        onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Additional notes"
                        rows={2}
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    Add Item to Quote
                  </Button>
                </CardContent>
              </Card>
            )
          },
          {
            value: "templates",
            label: "Job Templates",
            icon: FileText,
            content: <JobTemplates onSelectTemplate={handleTemplateSelect} />
          },
          {
            value: "presets",
            label: "Labour Presets",
            icon: Users,
            content: (
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Common Labour Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {labourPresets.map((preset, index) => (
                      <Card key={index} className="bg-muted/30 border-muted cursor-pointer hover:border-primary/40 hover:bg-muted/50 transition-all duration-200 active:scale-95" 
                            onClick={() => handleLabourPresetSelect(preset)}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{preset.description}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workerTypes.find(w => w.id === preset.workerType)?.name} • {preset.hours} hours
                          </p>
                          {preset.notes && (
                            <p className="text-xs text-muted-foreground mt-2">{preset.notes}</p>
                          )}
                          <div className="mt-2 text-xs text-primary font-medium">
                            Click to apply to form
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          }
        ]}
        defaultValue="enhanced"
        placeholder="Select option"
        className="mb-6"
      />

      {/* Items List - Mobile Responsive */}
      {items.length > 0 && (
        <Card className="mobile-card bg-card border-primary/20">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="mobile-text">Quote Items ({items.length})</span>
              <span className="text-lg sm:text-xl font-bold text-primary mobile-text">
                Total: £{total.toFixed(2)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="bg-background border border-border mobile-interactive">
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium mobile-small-text leading-relaxed">{item.description}</p>
                            {item.notes && (
                              <p className="mobile-small-text text-muted-foreground mt-1 leading-relaxed">{item.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-primary mobile-small-text">£{item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="mobile-small-text text-muted-foreground">Qty</label>
                          <Input
                            type="number"
                            value={item.quantity}
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
                            className="touch-target text-center mobile-focus"
                            min="0.1"
                            step="0.1"
                            inputMode="decimal"
                          />
                        </div>
                        <div>
                          <label className="mobile-small-text text-muted-foreground">Unit</label>
                          <div className="touch-target flex items-center justify-center border rounded-md bg-muted/30 mobile-small-text">
                            {item.unit}
                          </div>
                        </div>
                        <div>
                          <label className="mobile-small-text text-muted-foreground">Price</label>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                            className="touch-target text-right mobile-focus"
                            min="0"
                            step="0.01"
                            inputMode="decimal"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 pt-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateItem(item)}
                          className="touch-target mobile-focus"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(item.id)}
                          className="touch-target mobile-focus text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-muted">
                    <TableHead className="w-[40px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center w-[80px]">Qty</TableHead>
                    <TableHead className="text-center w-[80px]">Unit</TableHead>
                    <TableHead className="text-right w-[100px]">Unit Price</TableHead>
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
                          value={item.quantity}
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
                          className="w-16 text-center h-8"
                          min="0.1"
                          step="0.1"
                        />
                      </TableCell>
                      <TableCell className="text-center py-3 text-sm">{item.unit}</TableCell>
                      <TableCell className="text-right py-3">
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                          className="w-20 text-right h-8"
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell className="text-right py-3 font-semibold">
                        £{item.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateItem(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
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