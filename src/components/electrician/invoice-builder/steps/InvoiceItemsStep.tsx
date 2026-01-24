import { useState, useMemo } from 'react';
import { InvoiceItem } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Calculator, Wrench, Package, Zap, Clock, FileText, Copy, Search, ChevronDown, ChevronUp, Check, User, HardHat, Hammer, Lightbulb, Camera, Scan } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { JobTemplates } from '@/components/electrician/quote-builder/JobTemplates';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInvoiceScanner } from '@/hooks/useInvoiceScanner';
import { InvoiceScannerSheet } from '../InvoiceScannerSheet';
import { InvoiceScanResults } from '../InvoiceScanResults';

import { JobTemplate } from '@/types/quote';

import {
  workerTypes as defaultWorkerTypes,
  materialCategories,
  commonMaterials,
  equipmentCategories,
  commonEquipment
} from '@/data/electrician/presetData';

interface InvoiceItemsStepProps {
  originalItems: InvoiceItem[];
  additionalItems: InvoiceItem[];
  onAddItem: (item: Omit<InvoiceItem, 'id' | 'totalPrice'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<InvoiceItem>) => void;
  onRemoveItem: (itemId: string) => void;
}

type AddMethod = 'quick' | 'manual' | 'templates' | 'scan';
type Category = 'labour' | 'materials' | 'equipment';

// Worker type icons
const getWorkerIcon = (id: string) => {
  switch (id) {
    case 'electrician': return Lightbulb;
    case 'apprentice': return HardHat;
    case 'labourer': return Hammer;
    case 'designer': return User;
    default: return Wrench;
  }
};

export const InvoiceItemsStep = ({
  originalItems,
  additionalItems,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: InvoiceItemsStepProps) => {
  const [activeAddMethod, setActiveAddMethod] = useState<AddMethod>('quick');
  const [showOriginalItems, setShowOriginalItems] = useState(true);
  const [workerSheetOpen, setWorkerSheetOpen] = useState(false);
  const [hoursSheetOpen, setHoursSheetOpen] = useState(false);
  const [materialSheetOpen, setMaterialSheetOpen] = useState(false);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const [equipmentSheetOpen, setEquipmentSheetOpen] = useState(false);
  const [equipmentCategorySheetOpen, setEquipmentCategorySheetOpen] = useState(false);

  // Invoice Scanner State
  const [scannerSheetOpen, setScannerSheetOpen] = useState(false);
  const [scanResultsOpen, setScanResultsOpen] = useState(false);
  const scanner = useInvoiceScanner();

  // Get user's hourly rate from their company profile (Business Settings)
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
    description: '',
    quantity: 1,
    unit: 'each',
    unitPrice: 0,
    category: 'labour' as Category,
    subcategory: '',
    workerType: '',
    hours: 0,
    hourlyRate: 0,
    materialCode: '',
    equipmentCode: '',
    notes: '',
  });

  const [materialSearch, setMaterialSearch] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState(0);

  const calculateAdjustedPrice = (basePrice: number) => {
    return basePrice * (1 + priceAdjustment / 100);
  };

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAddItem(item);
    });
    toast({
      title: 'Template Applied',
      description: `Template "${template.name}" added to invoice`,
    });
  };

  const handleCategoryChange = (category: Category) => {
    setNewItem(prev => ({
      ...prev,
      category,
      subcategory: '',
      workerType: '',
      hours: 0,
      hourlyRate: 0,
      materialCode: '',
      equipmentCode: '',
      unitPrice: 0,
      unit: category === 'labour' ? 'hour' : 'each'
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
    setWorkerSheetOpen(false);
  };

  const handleMaterialSelect = (materialId: string) => {
    const material = commonMaterials.find(m => m.id === materialId);
    if (material) {
      setNewItem(prev => ({
        ...prev,
        materialCode: materialId,
        description: material.name,
        unitPrice: calculateAdjustedPrice(material.defaultPrice),
        unit: material.unit
      }));
    }
    setMaterialSheetOpen(false);
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
    setEquipmentSheetOpen(false);
  };

  const handleHoursChange = (hours: number) => {
    setNewItem(prev => ({
      ...prev,
      hours,
      quantity: hours,
      unitPrice: prev.hourlyRate
    }));
    setHoursSheetOpen(false);
  };

  // Scanner handlers
  const handleScanCapture = async (imageData: string, file: File) => {
    setScannerSheetOpen(false);
    const result = await scanner.handleCapture(imageData, file);
    if (result.success && result.items.length > 0) {
      setScanResultsOpen(true);
    }
  };

  const handleScanUpload = async (file: File) => {
    setScannerSheetOpen(false);
    const result = await scanner.handleUpload(file);
    if (result.success && result.items.length > 0) {
      setScanResultsOpen(true);
    }
  };

  const handleConfirmScannedItems = () => {
    const items = scanner.getSelectedItems();
    items.forEach(item => {
      onAddItem(item);
    });

    toast({
      title: 'Items Added',
      description: `${items.length} item${items.length === 1 ? '' : 's'} added from scanned invoice`,
    });

    // Close sheets and switch to Quick tab to show the added items
    setScanResultsOpen(false);
    setScannerSheetOpen(false);
    setActiveAddMethod('quick');
    scanner.reset();
  };

  const handleAddItem = () => {
    if (!newItem.description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please enter a description for the item',
        variant: 'destructive',
      });
      return;
    }

    if (newItem.unitPrice <= 0) {
      toast({
        title: 'Invalid price',
        description: 'Unit price must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    const itemToAdd = {
      ...newItem,
      quantity: newItem.category === 'labour' && newItem.hours > 0 ? newItem.hours : newItem.quantity
    };
    onAddItem(itemToAdd);

    setNewItem(prev => ({
      description: '',
      quantity: 1,
      unit: prev.category === 'labour' ? 'hour' : 'each',
      unitPrice: 0,
      category: prev.category,
      subcategory: '',
      workerType: '',
      hours: 0,
      hourlyRate: 0,
      materialCode: '',
      equipmentCode: '',
      notes: ''
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-4 w-4" />;
      case 'materials': return <Package className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const duplicateItem = (item: InvoiceItem) => {
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
    onAddItem(duplicate);
  };

  const filteredMaterials = useMemo(() => {
    let filtered = commonMaterials;
    if (newItem.subcategory && newItem.subcategory !== 'all-categories') {
      filtered = filtered.filter(m => m.category === newItem.subcategory);
    }
    if (materialSearch.trim().length >= 2) {
      const searchTerm = materialSearch.toLowerCase();
      filtered = filtered.filter(material =>
        material.name.toLowerCase().includes(searchTerm) ||
        material.category.toLowerCase().includes(searchTerm)
      );
    }
    return filtered;
  }, [materialSearch, newItem.subcategory]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  // Always calculate from quantity * unitPrice to ensure consistency with PDF generation
  const originalTotal = originalItems.reduce((sum, item) => {
    const price = (item.quantity || 0) * (item.unitPrice || 0);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  const additionalTotal = additionalItems.reduce((sum, item) => {
    const price = (item.quantity || 0) * (item.unitPrice || 0);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  const grandTotal = originalTotal + additionalTotal;

  const selectedWorker = workerTypes.find(w => w.id === newItem.workerType);
  const selectedMaterial = commonMaterials.find(m => m.id === newItem.materialCode);
  const selectedEquipment = commonEquipment.find(e => e.id === newItem.equipmentCode);
  const selectedCategory = materialCategories.find(c => c.id === newItem.subcategory);
  const selectedEquipmentCategory = equipmentCategories.find(c => c.id === newItem.subcategory);

  const hourOptions = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 40];

  return (
    <div className="space-y-4 text-left pb-24">
      {/* Compact Running Total */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <span className="text-[13px] text-white">Total</span>
        </div>
        <span className="text-lg font-bold text-elec-yellow">{formatCurrency(grandTotal)}</span>
      </div>

      {/* Original Quote Items */}
      {originalItems.length > 0 && (
        <div>
          <button
            onClick={() => setShowOriginalItems(!showOriginalItems)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="text-[12px] font-semibold text-white/60 uppercase tracking-wider">
              Quote Items ({originalItems.length})
            </span>
            {showOriginalItems ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
          </button>
          {showOriginalItems && (
            <div className="space-y-2">
              {originalItems.map((item) => (
                <div key={item.id} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[13px] font-medium text-white truncate flex-1 mr-2">{item.description}</p>
                    <p className="text-[13px] font-bold text-elec-yellow">{formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.quantity === 0 ? '' : item.quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        const quantity = val === '' ? 0 : parseFloat(val);
                        if (!isNaN(quantity)) {
                          onUpdateItem(item.id, { quantity, totalPrice: quantity * item.unitPrice });
                        }
                      }}
                      className="h-8 w-16 text-[13px] bg-white/[0.05] border-white/[0.06]"
                    />
                    <span className="text-[12px] text-white/50">×</span>
                    <Input
                      type="number"
                      value={item.unitPrice === 0 ? '' : item.unitPrice}
                      onChange={(e) => {
                        const val = e.target.value;
                        const unitPrice = val === '' ? 0 : parseFloat(val);
                        if (!isNaN(unitPrice)) {
                          onUpdateItem(item.id, { unitPrice, totalPrice: item.quantity * unitPrice });
                        }
                      }}
                      className="h-8 w-20 text-[13px] bg-white/[0.05] border-white/[0.06]"
                    />
                    <span className="text-[12px] text-white/50 flex-1">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Method Tabs */}
      <div className="flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1 gap-1">
        {[
          { id: 'quick' as AddMethod, label: 'Quick', icon: Clock },
          { id: 'manual' as AddMethod, label: 'Manual', icon: Plus },
          { id: 'templates' as AddMethod, label: 'Jobs', icon: FileText },
          { id: 'scan' as AddMethod, label: 'Scan', icon: Camera },
        ].map((method) => {
          const Icon = method.icon;
          const isActive = activeAddMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setActiveAddMethod(method.id)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-[11px] font-medium transition-all touch-manipulation min-w-0',
                isActive ? 'bg-elec-yellow text-black' : 'text-white/70'
              )}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              {method.label}
            </button>
          );
        })}
      </div>

      {/* Quick Add */}
      {activeAddMethod === 'quick' && (
        <div className="space-y-3">
          {/* Category Tabs */}
          <div className="flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
            {[
              { id: 'labour' as Category, label: 'Labour', icon: Wrench },
              { id: 'materials' as Category, label: 'Materials', icon: Package },
              { id: 'equipment' as Category, label: 'Equipment', icon: Zap },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = newItem.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-all touch-manipulation',
                    isActive ? 'bg-elec-yellow text-black' : 'text-white/70'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Labour */}
          {newItem.category === 'labour' && (
            <div className="space-y-2">
              {/* Worker Type Selector */}
              <button
                onClick={() => setWorkerSheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Worker Type</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedWorker ? selectedWorker.name : 'Select worker type'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedWorker && (
                    <span className="text-[14px] font-semibold text-elec-yellow">£{selectedWorker.defaultHourlyRate}/hr</span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white/40" />
                </div>
              </button>

              {/* Hours Selector */}
              <button
                onClick={() => setHoursSheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Hours</p>
                    <p className="text-[15px] font-medium text-white">
                      {newItem.hours > 0 ? `${newItem.hours} ${newItem.hours === 1 ? 'hour' : 'hours'}` : 'Select hours'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white/40" />
              </button>

              {/* Subtotal */}
              {selectedWorker && newItem.hours > 0 && (
                <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-white">Subtotal</span>
                    <span className="text-[18px] font-bold text-elec-yellow">
                      {formatCurrency(newItem.hours * newItem.hourlyRate)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Materials */}
          {newItem.category === 'materials' && (
            <div className="space-y-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  placeholder="Search materials..."
                  value={materialSearch}
                  onChange={(e) => setMaterialSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.06] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow"
                />
              </div>

              {/* Category Selector */}
              <button
                onClick={() => setCategorySheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
                    <Package className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Category</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedCategory ? selectedCategory.name : 'All categories'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white/40" />
              </button>

              {/* Material Selector */}
              <button
                onClick={() => setMaterialSheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Package className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Material</p>
                    <p className="text-[15px] font-medium text-white truncate max-w-[180px]">
                      {selectedMaterial ? selectedMaterial.name : 'Select material'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMaterial && (
                    <span className="text-[14px] font-semibold text-elec-yellow">
                      £{calculateAdjustedPrice(selectedMaterial.defaultPrice).toFixed(2)}
                    </span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white/40" />
                </div>
              </button>

              {/* Markup Quick Select */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[12px] text-white/60 uppercase tracking-wide">Markup</span>
                <div className="flex gap-1">
                  {[0, 10, 15, 20].map(markup => (
                    <button
                      key={markup}
                      onClick={() => setPriceAdjustment(markup)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all touch-manipulation',
                        priceAdjustment === markup
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.05] text-white/70'
                      )}
                    >
                      {markup}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Equipment */}
          {newItem.category === 'equipment' && (
            <div className="space-y-2">
              <button
                onClick={() => setEquipmentCategorySheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
                    <Zap className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Category</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedEquipmentCategory ? selectedEquipmentCategory.name : 'Select category'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white/40" />
              </button>

              <button
                onClick={() => setEquipmentSheetOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 uppercase tracking-wide">Equipment</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedEquipment ? selectedEquipment.name : 'Select equipment'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedEquipment && (
                    <span className="text-[14px] font-semibold text-elec-yellow">£{selectedEquipment.dailyRate}/day</span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white/40" />
                </div>
              </button>
            </div>
          )}

          {/* Add Button */}
          <Button
            onClick={handleAddItem}
            className="w-full h-12 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Manual Entry */}
      {activeAddMethod === 'manual' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <label className="text-[11px] text-white/60 uppercase tracking-wide block mb-2">Description *</label>
              <input
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                className="w-full h-11 px-3 rounded-lg bg-white/[0.05] border-0 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-elec-yellow"
              />
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
              <div className="p-4">
                <label className="text-[11px] text-white/60 uppercase tracking-wide block mb-2">Quantity</label>
                <input
                  type="number"
                  value={newItem.quantity === 0 ? '' : newItem.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    const quantity = val === '' ? 0 : parseFloat(val);
                    if (!isNaN(quantity)) {
                      setNewItem(prev => ({ ...prev, quantity }));
                    }
                  }}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.05] border-0 text-[15px] text-white focus:outline-none focus:ring-1 focus:ring-elec-yellow"
                  placeholder="1"
                />
              </div>
              <div className="p-4">
                <label className="text-[11px] text-white/60 uppercase tracking-wide block mb-2">Unit Price (£)</label>
                <input
                  type="number"
                  value={newItem.unitPrice === 0 ? '' : newItem.unitPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    const unitPrice = val === '' ? 0 : parseFloat(val);
                    if (!isNaN(unitPrice)) {
                      setNewItem(prev => ({ ...prev, unitPrice }));
                    }
                  }}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.05] border-0 text-[15px] text-white focus:outline-none focus:ring-1 focus:ring-elec-yellow"
                  placeholder="0.00"
                />
              </div>
            </div>
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="p-4 bg-elec-yellow/10 border-t border-elec-yellow/20">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-white">Line Total</span>
                  <span className="text-[18px] font-bold text-elec-yellow">
                    {formatCurrency(newItem.quantity * newItem.unitPrice)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleAddItem}
            className="w-full h-12 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Templates */}
      {activeAddMethod === 'templates' && (
        <JobTemplates onSelectTemplate={handleTemplateSelect} />
      )}

      {/* Scan Invoice */}
      {activeAddMethod === 'scan' && (
        <div className="space-y-3">
          {/* Info Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Scan className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">Scan Supplier Invoice</p>
                <p className="text-[12px] text-white/60">Take a photo or upload an invoice to auto-import materials</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Button
            onClick={() => setScannerSheetOpen(true)}
            className="w-full h-14 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            <Camera className="h-5 w-5 mr-2" />
            Scan Invoice
          </Button>

          {/* Tips */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-[11px] text-white/40 uppercase tracking-wide mb-3">Supported Suppliers</p>
            <div className="flex flex-wrap gap-2">
              {['Screwfix', 'Toolstation', 'CEF', 'Edmundson', 'Rexel', 'Others'].map((supplier) => (
                <span
                  key={supplier}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-[12px] text-white/60"
                >
                  {supplier}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Additional Items */}
      {additionalItems.length > 0 && (
        <div>
          <p className="text-[12px] font-semibold text-white/60 uppercase tracking-wider py-2">
            Added Items ({additionalItems.length})
          </p>
          <div className="space-y-2">
            {additionalItems.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <p className="text-[13px] font-medium text-white truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => duplicateItem(item)}
                      className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center touch-manipulation active:scale-95"
                    >
                      <Copy className="h-3.5 w-3.5 text-white/70" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:scale-95"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={item.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      const quantity = val === '' ? 0 : parseFloat(val);
                      if (!isNaN(quantity)) {
                        onUpdateItem(item.id, { quantity });
                      }
                    }}
                    className="h-8 w-16 text-[13px] bg-white/[0.05] border-white/[0.06]"
                  />
                  <span className="text-[12px] text-white/50">×</span>
                  <Input
                    type="number"
                    value={item.unitPrice === 0 ? '' : item.unitPrice}
                    onChange={(e) => {
                      const val = e.target.value;
                      const unitPrice = val === '' ? 0 : parseFloat(val);
                      if (!isNaN(unitPrice)) {
                        onUpdateItem(item.id, { unitPrice });
                      }
                    }}
                    className="h-8 w-20 text-[13px] bg-white/[0.05] border-white/[0.06]"
                  />
                  <span className="text-[12px] text-white/50 flex-1">{item.unit}</span>
                  <span className="text-[13px] font-bold text-elec-yellow">{formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worker Type Sheet */}
      <Sheet open={workerSheetOpen} onOpenChange={setWorkerSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Worker Type</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(70vh-60px)]">
            {workerTypes.map(worker => {
              const WorkerIcon = getWorkerIcon(worker.id);
              const isSelected = newItem.workerType === worker.id;
              return (
                <button
                  key={worker.id}
                  onClick={() => handleWorkerTypeChange(worker.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.05]',
                    isSelected && 'bg-elec-yellow/10'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    isSelected ? 'bg-elec-yellow' : 'bg-white/[0.05]'
                  )}>
                    <WorkerIcon className={cn('h-6 w-6', isSelected ? 'text-black' : 'text-white/70')} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] font-medium text-white">{worker.name}</p>
                    <p className="text-[13px] text-white/50">{worker.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] font-bold text-elec-yellow">£{worker.defaultHourlyRate}/hr</span>
                    {isSelected && <Check className="h-5 w-5 text-elec-yellow" />}
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Hours Sheet */}
      <Sheet open={hoursSheetOpen} onOpenChange={setHoursSheetOpen}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Hours</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-2 p-4">
            {hourOptions.map(h => {
              const isSelected = newItem.hours === h;
              return (
                <button
                  key={h}
                  onClick={() => handleHoursChange(h)}
                  className={cn(
                    'p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.98]',
                    isSelected
                      ? 'bg-elec-yellow text-black border-elec-yellow font-bold'
                      : 'bg-white/[0.03] border-white/[0.06] text-white'
                  )}
                >
                  <p className="text-[18px] font-semibold">{h}</p>
                  <p className="text-[11px] opacity-70">{h === 1 ? 'hour' : 'hours'}</p>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Material Category Sheet */}
      <Sheet open={categorySheetOpen} onOpenChange={setCategorySheetOpen}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Category</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(60vh-60px)]">
            <button
              onClick={() => { setNewItem(prev => ({ ...prev, subcategory: '', materialCode: '' })); setCategorySheetOpen(false); }}
              className={cn(
                'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation',
                !newItem.subcategory && 'bg-elec-yellow/10'
              )}
            >
              <span className="text-[16px] font-medium text-white">All Categories</span>
              {!newItem.subcategory && <Check className="h-5 w-5 text-elec-yellow" />}
            </button>
            {materialCategories.map(cat => {
              const isSelected = newItem.subcategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setNewItem(prev => ({ ...prev, subcategory: cat.id, materialCode: '' })); setCategorySheetOpen(false); }}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation',
                    isSelected && 'bg-elec-yellow/10'
                  )}
                >
                  <span className="text-[16px] font-medium text-white">{cat.name}</span>
                  {isSelected && <Check className="h-5 w-5 text-elec-yellow" />}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Material Sheet */}
      <Sheet open={materialSheetOpen} onOpenChange={setMaterialSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Material</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(80vh-60px)]">
            {filteredMaterials.map(material => {
              const isSelected = newItem.materialCode === material.id;
              const price = calculateAdjustedPrice(material.defaultPrice);
              return (
                <button
                  key={material.id}
                  onClick={() => handleMaterialSelect(material.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.05]',
                    isSelected && 'bg-elec-yellow/10'
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">{material.name}</p>
                    <p className="text-[12px] text-white/50">{material.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-elec-yellow">£{price.toFixed(2)}</span>
                    {isSelected && <Check className="h-5 w-5 text-elec-yellow" />}
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Equipment Category Sheet */}
      <Sheet open={equipmentCategorySheetOpen} onOpenChange={setEquipmentCategorySheetOpen}>
        <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Category</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(50vh-60px)]">
            {equipmentCategories.map(cat => {
              const isSelected = newItem.subcategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setNewItem(prev => ({ ...prev, subcategory: cat.id })); setEquipmentCategorySheetOpen(false); }}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation',
                    isSelected && 'bg-elec-yellow/10'
                  )}
                >
                  <span className="text-[16px] font-medium text-white">{cat.name}</span>
                  {isSelected && <Check className="h-5 w-5 text-elec-yellow" />}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Equipment Sheet */}
      <Sheet open={equipmentSheetOpen} onOpenChange={setEquipmentSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-left">Select Equipment</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(70vh-60px)]">
            {commonEquipment
              .filter(e => !newItem.subcategory || e.category === newItem.subcategory)
              .map(equipment => {
                const isSelected = newItem.equipmentCode === equipment.id;
                return (
                  <button
                    key={equipment.id}
                    onClick={() => handleEquipmentSelect(equipment.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.05]',
                      isSelected && 'bg-elec-yellow/10'
                    )}
                  >
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-medium text-white">{equipment.name}</p>
                      <p className="text-[12px] text-white/50">{equipment.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-bold text-elec-yellow">£{equipment.dailyRate}/{equipment.unit}</span>
                      {isSelected && <Check className="h-5 w-5 text-elec-yellow" />}
                    </div>
                  </button>
                );
              })}
          </div>
        </SheetContent>
      </Sheet>

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
