import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Plus, Wrench, Package, Zap, Hash, Clock, DollarSign } from "lucide-react";
import { QuoteItem } from "@/types/quote";
import { 
  workerTypes, 
  materialCategories, 
  commonMaterials, 
  equipmentCategories, 
  commonEquipment
} from "@/data/electrician/presetData";

interface ManualEntryFormProps {
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  priceAdjustment?: number;
  calculateAdjustedPrice?: (basePrice: number) => number;
}

const commonUnits = [
  { value: "each", label: "Each" },
  { value: "metre", label: "Metre" },
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
  { value: "pack", label: "Pack" },
  { value: "roll", label: "Roll" },
  { value: "box", label: "Box" },
  { value: "linear metre", label: "Linear Metre" },
  { value: "m²", label: "Square Metre" },
  { value: "week", label: "Week" }
];

const commonQuantities = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" }
];

const commonHours = [
  { value: "0.5", label: "0.5 hours" },
  { value: "1", label: "1 hour" },
  { value: "1.5", label: "1.5 hours" },
  { value: "2", label: "2 hours" },
  { value: "4", label: "4 hours" },
  { value: "8", label: "8 hours (1 day)" },
  { value: "16", label: "16 hours (2 days)" },
  { value: "40", label: "40 hours (1 week)" }
];

export const ManualEntryForm = ({ onAdd, priceAdjustment = 0, calculateAdjustedPrice }: ManualEntryFormProps) => {
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryOptions = [
    { value: "labour", label: "Labour", description: "Work hours and services" },
    { value: "materials", label: "Materials", description: "Components and supplies" },
    { value: "equipment", label: "Equipment", description: "Tools and machinery hire" }
  ];

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
      unit: category === "labour" ? "hour" : "each",
      description: ""
    }));
    setErrors({});
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
      const basePrice = material.defaultPrice;
      const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(basePrice) : basePrice;
      
      setNewItem(prev => ({
        ...prev,
        materialCode: materialId,
        description: material.name,
        unitPrice: adjustedPrice,
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

  const handleHoursChange = (hours: string) => {
    const hoursNum = parseFloat(hours);
    setNewItem(prev => ({
      ...prev,
      hours: hoursNum,
      quantity: hoursNum,
      unitPrice: prev.hourlyRate
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newItem.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (newItem.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (newItem.unitPrice <= 0) {
      newErrors.unitPrice = "Price must be greater than 0";
    }

    if (newItem.category === "labour" && !newItem.workerType) {
      newErrors.workerType = "Please select a worker type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItem = () => {
    if (validateForm()) {
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
        category: prev.category,
        subcategory: "",
        workerType: "",
        hours: 0,
        hourlyRate: 0,
        materialCode: "",
        equipmentCode: "",
        notes: ""
      }));
      setErrors({});
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-5 w-5" />;
      case 'materials': return <Package className="h-5 w-5" />;
      case 'equipment': return <Zap className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5 text-primary" />
          Add Quote Item
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <MobileSelectWrapper
          label="Category"
          value={newItem.category}
          onValueChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="Select category"
          icon={getCategoryIcon(newItem.category)}
          error={errors.category}
        />

        {/* Labour Category Fields */}
        {newItem.category === "labour" && (
          <div className="space-y-6">
            <MobileSelectWrapper
              label="Worker Type"
              value={newItem.workerType}
              onValueChange={handleWorkerTypeChange}
              options={workerTypes.map(worker => ({
                value: worker.id,
                label: worker.name,
                description: `£${worker.defaultHourlyRate}/hour`
              }))}
              placeholder="Select worker type"
              icon={<Wrench className="h-5 w-5" />}
              error={errors.workerType}
              hint="Choose the type of worker for this task"
            />

            <MobileSelectWrapper
              label="Hours"
              value={newItem.hours > 0 ? newItem.hours.toString() : ""}
              onValueChange={handleHoursChange}
              options={commonHours}
              placeholder="Select hours"
              icon={<Clock className="h-5 w-5" />}
              hint="Time required for this task"
            />

            {newItem.hourlyRate > 0 && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Rate:</span> £{newItem.hourlyRate}/hour
                  {newItem.hours > 0 && (
                    <>
                      <br />
                      <span className="font-medium">Total:</span> £{(newItem.hourlyRate * newItem.hours).toFixed(2)}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Materials Category Fields */}
        {newItem.category === "materials" && (
          <div className="space-y-6">
            <MobileSelectWrapper
              label="Material Category"
              value={newItem.subcategory}
              onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value, materialCode: "", description: "", unitPrice: 0 }))}
              options={materialCategories.map(cat => ({
                value: cat.id,
                label: cat.name
              }))}
              placeholder="Select category"
              icon={<Package className="h-5 w-5" />}
              hint="Choose material category first"
            />

            {newItem.subcategory && (
              <MobileSelectWrapper
                label="Material"
                value={newItem.materialCode}
                onValueChange={handleMaterialSelect}
                options={commonMaterials
                  .filter(m => m.category === newItem.subcategory)
                  .map(material => {
                    const basePrice = material.defaultPrice;
                    const adjustedPrice = calculateAdjustedPrice ? calculateAdjustedPrice(basePrice) : basePrice;
                    return {
                      value: material.id,
                      label: material.name,
                      description: priceAdjustment > 0 
                        ? `£${adjustedPrice.toFixed(2)}/${material.unit} (+${priceAdjustment}% markup)`
                        : `£${basePrice.toFixed(2)}/${material.unit}`
                    };
                  })}
                placeholder="Select material"
                icon={<Package className="h-5 w-5" />}
                hint="Material will auto-populate price"
              />
            )}
          </div>
        )}

        {/* Equipment Category Fields */}
        {newItem.category === "equipment" && (
          <div className="space-y-6">
            <MobileSelectWrapper
              label="Equipment Category"
              value={newItem.subcategory}
              onValueChange={(value) => setNewItem(prev => ({ ...prev, subcategory: value, equipmentCode: "", description: "", unitPrice: 0 }))}
              options={equipmentCategories.map(cat => ({
                value: cat.id,
                label: cat.name
              }))}
              placeholder="Select category"
              icon={<Zap className="h-5 w-5" />}
              hint="Choose equipment category first"
            />

            {newItem.subcategory && (
              <MobileSelectWrapper
                label="Equipment"
                value={newItem.equipmentCode}
                onValueChange={handleEquipmentSelect}
                options={commonEquipment
                  .filter(e => e.category === newItem.subcategory)
                  .map(equipment => ({
                    value: equipment.id,
                    label: equipment.name,
                    description: `£${equipment.dailyRate.toFixed(2)}/${equipment.unit}`
                  }))}
                placeholder="Select equipment"
                icon={<Zap className="h-5 w-5" />}
                hint="Equipment will auto-populate price"
              />
            )}
          </div>
        )}

        {/* Common Fields */}
        <MobileInputWrapper
          label="Description"
          placeholder="Enter item description"
          value={newItem.description}
          onChange={(value) => setNewItem(prev => ({ ...prev, description: value }))}
          error={errors.description}
          hint="Brief description of the work or item"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileSelectWrapper
            label="Quantity"
            value={newItem.quantity.toString()}
            onValueChange={(value) => setNewItem(prev => ({ ...prev, quantity: parseFloat(value) || 1 }))}
            options={commonQuantities}
            placeholder="Select quantity"
            icon={<Hash className="h-5 w-5" />}
            error={errors.quantity}
          />

          <MobileSelectWrapper
            label="Unit"
            value={newItem.unit}
            onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}
            options={commonUnits}
            placeholder="Select unit"
            hint="Unit of measurement"
          />
        </div>

        <MobileInputWrapper
          label="Unit Price"
          placeholder="0.00"
          value={newItem.unitPrice.toString()}
          onChange={(value) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(value) || 0 }))}
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          icon={<DollarSign className="h-4 w-4" />}
          unit="£"
          error={errors.unitPrice}
          hint="Price per unit"
        />

        {newItem.quantity > 0 && newItem.unitPrice > 0 && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-foreground">
              Total: £{(newItem.quantity * newItem.unitPrice).toFixed(2)}
            </p>
          </div>
        )}

        <Button 
          onClick={handleAddItem}
          className="w-full h-12 text-base font-medium"
          disabled={!newItem.description || newItem.unitPrice <= 0}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item to Quote
        </Button>
      </CardContent>
    </Card>
  );
};