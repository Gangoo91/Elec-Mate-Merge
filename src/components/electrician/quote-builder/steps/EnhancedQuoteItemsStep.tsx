import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wrench, Package, Zap, Clock, Users, FileText, Copy } from "lucide-react";
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

  return (
    <Tabs defaultValue="quick" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="quick" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Quick Add
        </TabsTrigger>
        <TabsTrigger value="manual" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Manual Entry
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Job Templates
        </TabsTrigger>
        <TabsTrigger value="presets" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Labour Presets
        </TabsTrigger>
      </TabsList>

      <TabsContent value="templates">
        <JobTemplates onSelectTemplate={handleTemplateSelect} />
      </TabsContent>

      <TabsContent value="presets" className="space-y-4">
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
                <Card key={index} className="bg-muted/30 border-muted cursor-pointer hover:border-primary/40 transition-colors" 
                      onClick={() => handleLabourPresetSelect(preset)}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{preset.description}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {workerTypes.find(w => w.id === preset.workerType)?.name} • {preset.hours} hours
                    </p>
                    {preset.notes && (
                      <p className="text-xs text-muted-foreground mt-2">{preset.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="quick" className="space-y-6">
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Add Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select value={newItem.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
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

              {/* Labour specific fields */}
              {newItem.category === "labour" && (
                <>
                  <Select value={newItem.workerType} onValueChange={handleWorkerTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select worker type" />
                    </SelectTrigger>
                    <SelectContent>
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

                  <div>
                    <Label>Hours</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={newItem.hours || ""}
                      onChange={(e) => handleHoursChange(parseFloat(e.target.value) || 0)}
                      placeholder="Hours"
                    />
                  </div>
                </>
              )}

              {/* Materials specific fields */}
              {newItem.category === "materials" && (
                <>
                  <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newItem.materialCode} onValueChange={handleMaterialSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
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
                </>
              )}

              {/* Equipment specific fields */}
              {newItem.category === "equipment" && (
                <>
                  <Select value={newItem.subcategory} onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newItem.equipmentCode} onValueChange={handleEquipmentSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
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
                </>
              )}
            </div>

            {/* Common fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Input
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Item description"
                />
              </div>

              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={newItem.category === "labour" ? newItem.hours : newItem.quantity}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 1;
                    if (newItem.category === "labour") {
                      handleHoursChange(value);
                    } else {
                      setNewItem(prev => ({ ...prev, quantity: value }));
                    }
                  }}
                  placeholder="Qty"
                />
              </div>

              <div>
                <Label>Unit Price (£)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newItem.unitPrice || ""}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="Price"
                />
              </div>
            </div>

            <Button 
              onClick={handleAddItem}
              className="w-full"
              disabled={!newItem.description || newItem.unitPrice <= 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manual" className="space-y-6">
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Manual Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <Select value={newItem.category} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="labour">Labour</SelectItem>
                    <SelectItem value="materials">Materials</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Input
                  type="number"
                  placeholder="Qty"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                />
              </div>
              
              <div>
                <Input
                  placeholder="£ Price"
                  type="number"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div>
                <Button 
                  onClick={handleAddItem}
                  className="w-full"
                  disabled={!newItem.description || newItem.unitPrice <= 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Items List */}
      {items.length > 0 ? (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle>Quote Items ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>
                        {item.description}
                        {item.notes && (
                          <div className="text-xs text-muted-foreground mt-1">{item.notes}</div>
                        )}
                        {item.workerType && (
                          <div className="text-xs text-muted-foreground">
                            {workerTypes.find(w => w.id === item.workerType)?.name}
                            {item.hours && ` • ${item.hours} hours`}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdate(item.id, { quantity: parseInt(e.target.value) || 1 })}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      £{item.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateItem(item)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-semibold">
                  <TableCell colSpan={4}>Subtotal</TableCell>
                  <TableCell>£{total.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-primary/20">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No items added yet. Add your first quote item above.</p>
          </CardContent>
        </Card>
      )}
    </Tabs>
  );
};