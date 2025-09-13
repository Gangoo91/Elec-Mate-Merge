import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wrench, Package, Zap, Clock, FileText, Copy, TrendingUp, Tag, Hash, DollarSign, Ruler, MessageSquare, RotateCcw } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
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

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);


  return (
    <div className="space-y-4">
      <DropdownTabs
        tabs={[
          {
            value: "quick",
            label: "Quick Add",
            icon: Clock,
            content: (
              <div className="w-full bg-card/50 border border-primary/20 rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Quick Add Items
                  </h3>
                </div>
                
                
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
                               .map(material => {
                                 const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(material.defaultPrice) : material.defaultPrice;
                                 return (
                                   <SelectItem key={material.id} value={material.id}>
                                     <div className="flex flex-col">
                                       <span>{material.name}</span>
                                       <span className="text-xs text-muted-foreground">
                                         {priceAdjustment > 0 ? (
                                           <>Base: £{material.defaultPrice.toFixed(2)} | Adjusted: £{adjustedPrice.toFixed(2)} (+{priceAdjustment}%)</>
                                         ) : (
                                           <>£{material.defaultPrice.toFixed(2)}/{material.unit}</>
                                         )}
                                       </span>
                                     </div>
                                   </SelectItem>
                                 );
                               })}
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
                <CardContent className="space-y-6">
                  {/* Category Selection */}
                  <MobileSelectWrapper
                    label="Category"
                    value={newItem.category}
                    onValueChange={handleCategoryChange}
                    options={[
                      { value: "labour", label: "Labour", description: "Work time and services" },
                      { value: "materials", label: "Materials", description: "Parts and components" },
                      { value: "equipment", label: "Equipment", description: "Tools and machinery hire" }
                    ]}
                    placeholder="Select item category"
                    icon={<Tag className="h-4 w-4" />}
                  />

                  {/* Smart Description Input */}
                  <MobileSelectWrapper
                    label="Description"
                    value={newItem.description}
                    onValueChange={(value) => {
                      setNewItem(prev => ({ ...prev, description: value }));
                      
                      // Auto-populate based on category and description
                      if (newItem.category === "labour") {
                        const workerType = workerTypes.find(w => value.toLowerCase().includes(w.name.toLowerCase()));
                        if (workerType) {
                          setNewItem(prev => ({ 
                            ...prev, 
                            unitPrice: workerType.defaultHourlyRate,
                            hourlyRate: workerType.defaultHourlyRate,
                            unit: "hour"
                          }));
                        }
                      } else if (newItem.category === "materials") {
                        const material = commonMaterials.find(m => 
                          value.toLowerCase().includes(m.name.toLowerCase())
                        );
                        if (material) {
                          setNewItem(prev => ({ 
                            ...prev, 
                            unitPrice: material.defaultPrice,
                            unit: material.unit
                          }));
                        }
                      }
                    }}
                    options={(() => {
                      const suggestions = [];
                      
                      if (newItem.category === "labour") {
                        suggestions.push(
                          { value: "Install new consumer unit", label: "Install new consumer unit", description: "Electrical installation work" },
                          { value: "Replace socket outlet", label: "Replace socket outlet", description: "Socket replacement" },
                          { value: "Install light fitting", label: "Install light fitting", description: "Lighting installation" },
                          { value: "Test electrical circuit", label: "Test electrical circuit", description: "Testing and inspection" },
                          { value: "Install outdoor lighting", label: "Install outdoor lighting", description: "External lighting work" },
                          { value: "Rewire room", label: "Rewire room", description: "Complete rewiring" }
                        );
                      } else if (newItem.category === "materials") {
                        commonMaterials.forEach(material => {
                          suggestions.push({
                            value: material.name,
                            label: material.name,
                            description: `£${material.defaultPrice.toFixed(2)}/${material.unit} - ${material.category}`
                          });
                        });
                      } else if (newItem.category === "equipment") {
                        commonEquipment.forEach(equipment => {
                          suggestions.push({
                            value: equipment.name,
                            label: equipment.name,
                            description: `£${equipment.dailyRate}/${equipment.unit} - ${equipment.category}`
                          });
                        });
                      }
                      
                      // Always allow custom input
                      if (newItem.description && !suggestions.find(s => s.value === newItem.description)) {
                        suggestions.unshift({
                          value: newItem.description,
                          label: newItem.description,
                          description: "Custom description"
                        });
                      }
                      
                      return suggestions;
                    })()}
                    placeholder="Enter or select description"
                    icon={<FileText className="h-4 w-4" />}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quantity with Quick Select */}
                    <div className="space-y-3">
                      <MobileInputWrapper
                        label="Quantity"
                        value={newItem.quantity === 0 ? "" : newItem.quantity.toString()}
                        onChange={(value) => {
                          if (value === '') {
                            setNewItem(prev => ({ ...prev, quantity: 0 }));
                          } else {
                            const parsed = parseFloat(value);
                            if (!isNaN(parsed) && parsed >= 0) {
                              setNewItem(prev => ({ ...prev, quantity: parsed }));
                            }
                          }
                        }}
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        min="0.1"
                        placeholder="Enter quantity"
                        icon={<Hash className="h-4 w-4" />}
                        hint="Use decimal values for partial quantities"
                      />
                      
                      {/* Quick Quantity Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Label className="text-xs text-elec-light/70 w-full mb-1">Quick select:</Label>
                        {[1, 2, 5, 10, 20, 50, 100].map(qty => (
                          <Button
                            key={qty}
                            variant="outline"
                            size="sm"
                            onClick={() => setNewItem(prev => ({ ...prev, quantity: qty }))}
                            className="h-8 px-3 text-xs"
                          >
                            {qty}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Unit Price */}
                    <MobileInputWrapper
                      label="Unit Price"
                      value={newItem.unitPrice === 0 ? "" : newItem.unitPrice.toString()}
                      onChange={(value) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(value) || 0 }))}
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      icon={<DollarSign className="h-4 w-4" />}
                      unit="£"
                      hint="Price per unit excluding VAT"
                    />
                  </div>

                  {/* Enhanced Unit Selection */}
                  <MobileSelectWrapper
                    label="Unit"
                    value={newItem.unit}
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}
                    options={[
                      // Common units
                      { value: "each", label: "Each", description: "Individual items" },
                      { value: "hour", label: "Hour", description: "Time-based pricing" },
                      { value: "day", label: "Day", description: "Daily rate" },
                      { value: "week", label: "Week", description: "Weekly rate" },
                      
                      // Length measurements
                      { value: "metre", label: "Metre", description: "Linear measurement" },
                      { value: "linear metre", label: "Linear Metre", description: "Cable runs, conduit" },
                      
                      // Area measurements
                      { value: "m²", label: "Square Metre", description: "Area coverage" },
                      
                      // Electrical specific
                      { value: "point", label: "Point", description: "Socket/switch points" },
                      { value: "circuit", label: "Circuit", description: "Complete circuits" },
                      { value: "way", label: "Way", description: "Distribution board ways" },
                      { value: "core", label: "Core", description: "Cable cores" },
                      
                      // Packaging units
                      { value: "pack", label: "Pack", description: "Packaged items" },
                      { value: "roll", label: "Roll", description: "Cable/tape rolls" },
                      { value: "box", label: "Box", description: "Boxed quantities" },
                      
                      // Installation units
                      { value: "installation", label: "Installation", description: "Complete installation" },
                      { value: "system", label: "System", description: "Complete system" },
                      { value: "panel", label: "Panel", description: "Panel installation" }
                    ]}
                    placeholder="Select unit type"
                    icon={<Ruler className="h-4 w-4" />}
                  />

                  {/* Notes */}
                  <MobileInputWrapper
                    label="Notes (Optional)"
                    value={newItem.notes}
                    onChange={(value) => setNewItem(prev => ({ ...prev, notes: value }))}
                    placeholder="Additional details, specifications..."
                    icon={<MessageSquare className="h-4 w-4" />}
                    hint="Add any special requirements or notes"
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewItem({
                          description: "",
                          quantity: 1,
                          unit: "each",
                          unitPrice: 0,
                          category: "labour",
                          subcategory: "",
                          workerType: "",
                          hours: 0,
                          hourlyRate: 0,
                          materialCode: "",
                          equipmentCode: "",
                          notes: ""
                        });
                      }}
                      className="flex-1"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear Form
                    </Button>
                    <Button 
                      onClick={handleAddItem} 
                      className="flex-1"
                      disabled={!newItem.description || newItem.quantity <= 0 || newItem.unitPrice <= 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item to Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          },
          {
            value: "templates",
            label: "Job Templates",
            icon: FileText,
            content: <JobTemplates onSelectTemplate={handleTemplateSelect} />
          }
        ]}
        defaultValue="quick"
        placeholder="Select option"
        className="mb-6"
      />

      {/* Items List */}
      {items.length > 0 && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quote Items ({items.length})</span>
              <span className="text-xl font-bold text-primary">
                Total: £{total.toFixed(2)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                            // Allow empty string for deletion, otherwise parse the value
                            if (value === '') {
                              onUpdate(item.id, { quantity: 0 }); // Temporarily set to 0 to allow clearing
                            } else {
                              const parsed = parseFloat(value);
                              if (!isNaN(parsed) && parsed >= 0) {
                                onUpdate(item.id, { quantity: parsed });
                              }
                            }
                          }}
                          onBlur={(e) => {
                            // Ensure minimum value on blur
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