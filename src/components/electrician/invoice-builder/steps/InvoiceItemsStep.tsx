import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  Pencil,
  Copy,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { JobTemplates } from '@/components/electrician/quote-builder/JobTemplates';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInvoiceScanner } from '@/hooks/useInvoiceScanner';
import { InvoiceScannerSheet } from '../InvoiceScannerSheet';
import { InvoiceScanResults } from '../InvoiceScanResults';

import { JobTemplate } from '@/types/quote';

import React from 'react';
import {
  workerTypes as defaultWorkerTypes,
  materialCategories,
  commonMaterials,
  equipmentCategories,
  commonEquipment,
} from '@/data/electrician/presetData';

// InlineDecimalInput: local string state prevents parseFloat stripping trailing dots (ELE-14)
function InlineDecimalInput({
  value,
  onChange,
  className,
  style,
  placeholder,
}: {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState(value === 0 ? '' : String(value));

  React.useEffect(() => {
    // Sync if parent value changes externally (e.g. item reset)
    setDraft(value === 0 ? '' : String(value));
  }, [value]);

  return (
    <input
      type="text"
      inputMode="decimal"
      style={style}
      value={draft}
      placeholder={placeholder}
      onChange={(e) => {
        const val = e.target.value;
        if (val === '' || /^\d*\.?\d*$/.test(val)) setDraft(val);
      }}
      onBlur={() => {
        const parsed = parseFloat(draft);
        const final = isNaN(parsed) ? 0 : parsed;
        onChange(final);
        setDraft(final === 0 ? '' : String(final));
      }}
      className={className}
    />
  );
}

interface InvoiceItemsStepProps {
  originalItems: InvoiceItem[];
  additionalItems: InvoiceItem[];
  onAddItem: (item: Omit<InvoiceItem, 'id' | 'totalPrice'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<InvoiceItem>) => void;
  onRemoveItem: (itemId: string) => void;
  settings?: InvoiceSettings;
  subtotal?: number;
  vatAmount?: number;
  total?: number;
}

type AddMethod = 'quick' | 'manual' | 'templates' | 'scan';
type Category = 'labour' | 'materials' | 'equipment';


export const InvoiceItemsStep = ({
  originalItems,
  additionalItems,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  settings,
  subtotal = 0,
  vatAmount = 0,
  total = 0,
}: InvoiceItemsStepProps) => {
  const darkInputStyle: React.CSSProperties = {
    colorScheme: 'dark',
  };

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
      return defaultWorkerTypes.map((worker) => {
        const savedRate = savedRates[worker.id as keyof typeof savedRates];
        return {
          ...worker,
          defaultHourlyRate: savedRate ?? worker.defaultHourlyRate,
        };
      });
    }

    // Fall back to percentage calculation if no saved rates
    const userRate = companyProfile?.hourly_rate || 45;
    return defaultWorkerTypes.map((worker) => {
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
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');

  const calculateAdjustedPrice = (basePrice: number) => {
    return basePrice * (1 + priceAdjustment / 100);
  };

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach((item) => {
      onAddItem(item);
    });
    toast({
      title: 'Template Applied',
      description: `Template "${template.name}" added to invoice`,
    });
  };

  const handleCategoryChange = (category: Category) => {
    setNewItem((prev) => ({
      ...prev,
      category,
      subcategory: '',
      workerType: '',
      hours: 0,
      hourlyRate: 0,
      materialCode: '',
      equipmentCode: '',
      unitPrice: 0,
      unit: category === 'labour' ? 'hour' : 'each',
    }));
  };

  const handleWorkerTypeChange = (workerTypeId: string) => {
    const worker = workerTypes.find((w) => w.id === workerTypeId);
    if (worker) {
      setNewItem((prev) => ({
        ...prev,
        workerType: workerTypeId,
        hourlyRate: worker.defaultHourlyRate,
        unitPrice: worker.defaultHourlyRate,
        description: prev.description || `${worker.name} - ${worker.description}`,
      }));
    }
    setWorkerSheetOpen(false);
  };

  const handleMaterialSelect = (materialId: string) => {
    const material = commonMaterials.find((m) => m.id === materialId);
    if (material) {
      setNewItem((prev) => ({
        ...prev,
        materialCode: materialId,
        description: material.name,
        unitPrice: calculateAdjustedPrice(material.defaultPrice),
        unit: material.unit,
      }));
    }
    setMaterialSheetOpen(false);
  };

  const handleEquipmentSelect = (equipmentId: string) => {
    const equipment = commonEquipment.find((e) => e.id === equipmentId);
    if (equipment) {
      setNewItem((prev) => ({
        ...prev,
        equipmentCode: equipmentId,
        description: equipment.name,
        unitPrice: equipment.dailyRate,
        unit: equipment.unit,
      }));
    }
    setEquipmentSheetOpen(false);
  };

  const handleHoursChange = (hours: number) => {
    setNewItem((prev) => ({
      ...prev,
      hours,
      quantity: hours,
      unitPrice: prev.hourlyRate,
    }));
    setHoursSheetOpen(false);
  };

  // Scanner handlers - keep sheet open during processing.
  // Any throw from scanner.handleCapture/Upload bubbled up as an
  // undefined-result crash (ELE-718) — guard with try/catch + optional chaining.
  const handleScanCapture = async (imageData: string, file: File) => {
    try {
      const result = await scanner.handleCapture(imageData, file);
      if (result?.success && (result.items?.length ?? 0) > 0) {
        setScannerSheetOpen(false);
        setScanResultsOpen(true);
      }
    } catch (err) {
      console.error('[InvoiceItemsStep] Scan capture error:', err);
      toast({
        title: 'Scan failed',
        description: 'We couldn\u2019t read that image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleScanUpload = async (files: File[]) => {
    try {
      const result = await scanner.handleUpload(files);
      if (result?.success && (result.items?.length ?? 0) > 0) {
        setScannerSheetOpen(false);
        setScanResultsOpen(true);
      }
    } catch (err) {
      console.error('[InvoiceItemsStep] Scan upload error:', err);
      toast({
        title: 'Scan failed',
        description: 'We couldn\u2019t read that upload. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmScannedItems = () => {
    const items = scanner.getSelectedItems();
    items.forEach((item) => {
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
      quantity:
        newItem.category === 'labour' && newItem.hours > 0 ? newItem.hours : newItem.quantity,
    };
    onAddItem(itemToAdd);
    toast({ title: 'Item added', description: itemToAdd.description });

    setNewItem((prev) => ({
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
      notes: '',
    }));
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
      notes: item.notes,
    };
    onAddItem(duplicate);
  };

  const filteredMaterials = useMemo(() => {
    let filtered = commonMaterials;
    if (newItem.subcategory && newItem.subcategory !== 'all-categories') {
      filtered = filtered.filter((m) => m.category === newItem.subcategory);
    }
    if (materialSearch.trim().length >= 2) {
      const searchTerm = materialSearch.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(searchTerm) ||
          material.category.toLowerCase().includes(searchTerm)
      );
    }
    return filtered;
  }, [materialSearch, newItem.subcategory]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const selectedWorker = workerTypes.find((w) => w.id === newItem.workerType);
  const selectedMaterial = commonMaterials.find((m) => m.id === newItem.materialCode);
  const selectedEquipment = commonEquipment.find((e) => e.id === newItem.equipmentCode);
  const selectedCategory = materialCategories.find((c) => c.id === newItem.subcategory);
  const selectedEquipmentCategory = equipmentCategories.find((c) => c.id === newItem.subcategory);

  const hourOptions = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 40];

  return (
    <div className="space-y-4 text-left">
      {/* Running Total */}
      <div className="pb-4 border-b border-white/[0.12] space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white">Subtotal</span>
          <span className="text-[14px] text-white tabular-nums">{formatCurrency(subtotal)}</span>
        </div>
        {settings?.discountEnabled && (settings?.discountValue || 0) > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-red-400">{settings?.discountLabel || 'Discount'}</span>
            <span className="text-[14px] text-red-400 tabular-nums">
              -{formatCurrency(
                (settings?.discountType || 'percentage') === 'percentage'
                  ? subtotal * ((settings?.discountValue || 0) / 100)
                  : (settings?.discountValue || 0)
              )}
            </span>
          </div>
        )}
        {settings?.vatRegistered && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-white">VAT ({settings?.vatRate || 20}%)</span>
            <span className="text-[14px] text-white tabular-nums">{formatCurrency(vatAmount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-1.5">
          <span className="text-[14px] font-semibold text-white">Total</span>
          <span className="text-[18px] font-bold text-white tabular-nums">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Original Quote Items */}
      {originalItems.length > 0 && (
        <div>
          <button
            onClick={() => setShowOriginalItems(!showOriginalItems)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="text-[12px] font-semibold text-white uppercase tracking-wider">
              Quote Items ({originalItems.length})
            </span>
            {showOriginalItems ? (
              <ChevronUp className="h-4 w-4 text-white" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white" />
            )}
          </button>
          {showOriginalItems && (
            <div className="divide-y divide-white/[0.06]">
              {originalItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        onBlur={() => {
                          if (editingDescription.trim()) onUpdateItem(item.id, { description: editingDescription.trim() });
                          setEditingItemId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editingDescription.trim()) onUpdateItem(item.id, { description: editingDescription.trim() });
                            setEditingItemId(null);
                          }
                          if (e.key === 'Escape') setEditingItemId(null);
                        }}
                        className="flex-1 mr-2 bg-white/[0.06] border border-white/[0.15] rounded-lg px-2 py-1 text-[13px] text-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    ) : (
                      <p className="text-[13px] font-medium text-white truncate flex-1 mr-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1 ml-2">
                      <p className={cn('text-[13px] font-bold mr-1', (item.quantity || 0) * (item.unitPrice || 0) === 0 ? 'text-red-400' : 'text-white')}>
                        {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
                      </p>
                      <button
                        onClick={() => {
                          if (editingItemId === item.id) {
                            if (editingDescription.trim()) onUpdateItem(item.id, { description: editingDescription.trim() });
                            setEditingItemId(null);
                          } else {
                            setEditingDescription(item.description);
                            setEditingItemId(item.id);
                          }
                        }}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 ${editingItemId === item.id ? 'bg-white/[0.12]' : 'bg-white/[0.08]'}`}
                        aria-label={editingItemId === item.id ? 'Confirm edit' : 'Edit description'}
                      >
                        {editingItemId === item.id
                          ? <Check className="h-3.5 w-3.5 text-white" />
                          : <Pencil className="h-3.5 w-3.5 text-white" />}
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:scale-95"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <InlineDecimalInput
                      value={item.quantity}
                      onChange={(quantity) =>
                        onUpdateItem(item.id, {
                          quantity,
                          totalPrice: quantity * item.unitPrice,
                        })
                      }
                      style={darkInputStyle}
                      className="h-8 w-16 px-2 py-0 text-[13px] text-white bg-white/[0.06] border border-white/[0.12] rounded-lg caret-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                    />
                    <span className="text-[12px] text-white">×</span>
                    <InlineDecimalInput
                      value={item.unitPrice}
                      onChange={(unitPrice) =>
                        onUpdateItem(item.id, {
                          unitPrice,
                          totalPrice: item.quantity * unitPrice,
                        })
                      }
                      style={darkInputStyle}
                      className="h-8 w-20 px-2 py-0 text-[13px] text-white bg-white/[0.06] border border-white/[0.12] rounded-lg caret-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                    />
                    <span className="text-[12px] text-white flex-1">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Method Tabs */}
      <div className="flex gap-1.5 pt-2">
        {[
          { id: 'quick' as AddMethod, label: 'Quick' },
          { id: 'manual' as AddMethod, label: 'Manual' },
          { id: 'templates' as AddMethod, label: 'Jobs' },
          { id: 'scan' as AddMethod, label: 'Scan' },
        ].map((method) => {
          const isActive = activeAddMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setActiveAddMethod(method.id)}
              className={cn(
                'flex-1 h-11 rounded-lg text-[13px] font-semibold transition-all touch-manipulation',
                isActive ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40' : 'text-white'
              )}
            >
              {method.label}
            </button>
          );
        })}
      </div>

      {/* Quick Add */}
      {activeAddMethod === 'quick' && (
        <div className="space-y-3">
          {/* Category Tabs */}
          <div className="flex gap-1.5">
            {[
              { id: 'labour' as Category, label: 'Labour' },
              { id: 'materials' as Category, label: 'Materials' },
              { id: 'equipment' as Category, label: 'Equipment' },
            ].map((cat) => {
              const isActive = newItem.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    'flex-1 h-11 rounded-lg text-[13px] font-semibold transition-all touch-manipulation',
                    isActive ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40' : 'text-white'
                  )}
                >
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
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Worker Type</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedWorker ? selectedWorker.name : 'Select worker type'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedWorker && (
                    <span className="text-[14px] font-semibold text-white">
                      £{selectedWorker.defaultHourlyRate}/hr
                    </span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white" />
                </div>
              </button>

              {/* Hours Selector */}
              <button
                onClick={() => setHoursSheetOpen(true)}
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Hours</p>
                    <p className="text-[15px] font-medium text-white">
                      {newItem.hours > 0
                        ? `${newItem.hours} ${newItem.hours === 1 ? 'hour' : 'hours'}`
                        : 'Select hours'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white" />
              </button>

              {/* Subtotal */}
              {selectedWorker && newItem.hours > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-white/[0.12]">
                  <span className="text-[14px] text-white">Subtotal</span>
                  <span className="text-[18px] font-bold text-white tabular-nums">
                    {formatCurrency(newItem.hours * newItem.hourlyRate)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Materials */}
          {newItem.category === 'materials' && (
            <div className="space-y-2">
              {/* Search */}
              <input
                placeholder="Search materials..."
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                style={darkInputStyle}
                className="w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[14px] text-white placeholder:text-white/60 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
              />

              {/* Category Selector */}
              <button
                onClick={() => setCategorySheetOpen(true)}
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Category</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedCategory ? selectedCategory.name : 'All categories'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white" />
              </button>

              {/* Material Selector */}
              <button
                onClick={() => setMaterialSheetOpen(true)}
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Material</p>
                    <p className="text-[15px] font-medium text-white truncate max-w-[180px]">
                      {selectedMaterial ? selectedMaterial.name : 'Select material'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMaterial && (
                    <span className="text-[14px] font-semibold text-white">
                      £{calculateAdjustedPrice(selectedMaterial.defaultPrice).toFixed(2)}
                    </span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white" />
                </div>
              </button>

              {/* Markup Quick Select */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
                <span className="text-[11px] text-white uppercase tracking-wider">Markup</span>
                <div className="flex gap-1">
                  {[0, 10, 15, 20].map((markup) => (
                    <button
                      key={markup}
                      onClick={() => setPriceAdjustment(markup)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all touch-manipulation',
                        priceAdjustment === markup
                          ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40'
                          : 'bg-white/[0.08] text-white'
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
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Category</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedEquipmentCategory
                        ? selectedEquipmentCategory.name
                        : 'Select category'}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={() => setEquipmentSheetOpen(true)}
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.12] touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">Equipment</p>
                    <p className="text-[15px] font-medium text-white">
                      {selectedEquipment ? selectedEquipment.name : 'Select equipment'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedEquipment && (
                    <span className="text-[14px] font-semibold text-white">
                      £{selectedEquipment.dailyRate}/day
                    </span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white" />
                </div>
              </button>
            </div>
          )}

          {/* Add Button */}
          <Button
            onClick={handleAddItem}
            className="w-full h-12 bg-elec-yellow/15 text-elec-yellow font-semibold hover:bg-elec-yellow/20 active:scale-[0.98] touch-manipulation rounded-xl border border-elec-yellow/20"
          >
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Manual Entry */}
      {activeAddMethod === 'manual' && (
        <div className="space-y-3">
          <div>
            <div className="pb-3 border-b border-white/[0.12]">
              <label className="text-[11px] text-white uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <input
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                style={darkInputStyle}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.06] border-0 text-[15px] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 py-3">
              <div>
                <label className="text-[11px] text-white uppercase tracking-wider block mb-1.5">
                  Quantity
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  style={darkInputStyle}
                  value={newItem.quantity === 0 ? '' : newItem.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) {
                      const quantity = val === '' ? 0 : parseFloat(val);
                      if (!isNaN(quantity)) {
                        setNewItem((prev) => ({ ...prev, quantity }));
                      }
                    }
                  }}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.06] border-0 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-[11px] text-white uppercase tracking-wider block mb-1.5">
                  Unit Price (£)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  style={darkInputStyle}
                  value={newItem.unitPrice === 0 ? '' : newItem.unitPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) {
                      const unitPrice = val === '' ? 0 : parseFloat(val);
                      if (!isNaN(unitPrice)) {
                        setNewItem((prev) => ({ ...prev, unitPrice }));
                      }
                    }
                  }}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.06] border-0 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow"
                  placeholder="0.00"
                />
              </div>
            </div>
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="p-4 bg-white/[0.06] border-t border-white/[0.12]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-white">Line Total</span>
                  <span className="text-[18px] font-bold text-white">
                    {formatCurrency(newItem.quantity * newItem.unitPrice)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleAddItem}
            className="w-full h-12 bg-elec-yellow/15 text-elec-yellow font-semibold hover:bg-elec-yellow/20 active:scale-[0.98] touch-manipulation rounded-xl border border-elec-yellow/20"
          >
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Templates */}
      {activeAddMethod === 'templates' && <JobTemplates onSelectTemplate={handleTemplateSelect} />}

      {/* Scan Invoice */}
      {activeAddMethod === 'scan' && (
        <div className="space-y-3">
          <div className="pb-3">
            <p className="text-[14px] font-medium text-white">Scan Supplier Invoice</p>
            <p className="text-[12px] text-white mt-0.5">
              Take a photo or upload an invoice to auto-import materials
            </p>
          </div>

          {/* Action Buttons */}
          <Button
            onClick={() => setScannerSheetOpen(true)}
            className="w-full h-14 bg-elec-yellow/15 text-elec-yellow font-semibold hover:bg-elec-yellow/20 active:scale-[0.98] touch-manipulation rounded-xl border border-elec-yellow/20"
          >
            Scan Invoice
          </Button>

          {/* Tips */}
          <div className="pt-3">
            <p className="text-[11px] text-white uppercase tracking-wider mb-2">
              Supported Suppliers
            </p>
            <div className="flex flex-wrap gap-2">
              {['Screwfix', 'Toolstation', 'CEF', 'Edmundson', 'Rexel', 'Others'].map(
                (supplier) => (
                  <span
                    key={supplier}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.08] text-[12px] text-white"
                  >
                    {supplier}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {originalItems.length === 0 && additionalItems.length === 0 && (
        <div className="text-center py-10 px-4">
          <p className="text-[15px] font-medium text-white mb-1">No items yet</p>
          <p className="text-[13px] text-white/60 mb-5">Add labour, materials, or equipment to your invoice</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setActiveAddMethod('quick')}
              className="px-4 h-11 rounded-lg text-[13px] font-medium bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40 touch-manipulation active:scale-[0.97]"
            >
              Quick Add
            </button>
            <button
              onClick={() => setActiveAddMethod('templates')}
              className="px-4 h-11 rounded-lg text-[13px] font-medium bg-white/[0.08] text-white border border-white/[0.12] touch-manipulation active:scale-[0.97]"
            >
              Use Template
            </button>
          </div>
        </div>
      )}

      {/* Additional Items */}
      {additionalItems.length > 0 && (
        <div>
          <p className="text-[12px] font-semibold text-white uppercase tracking-wider py-2">
            Added Items ({additionalItems.length})
          </p>
          <AnimatePresence mode="popLayout">
            {additionalItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="py-3 border-b border-white/[0.12]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      onClick={() => duplicateItem(item)}
                      className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center touch-manipulation active:scale-95"
                    >
                      <Copy className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => {
                        onRemoveItem(item.id);
                        toast({ title: 'Item removed' });
                      }}
                      className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    style={darkInputStyle}
                    value={item.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        const quantity = val === '' ? 0 : parseFloat(val);
                        if (!isNaN(quantity)) {
                          onUpdateItem(item.id, { quantity });
                        }
                      }
                    }}
                    className="h-8 w-16 px-2 py-0 text-[13px] text-white bg-white/[0.06] border border-white/[0.12] rounded-lg caret-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                  />
                  <span className="text-[12px] text-white">×</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    style={darkInputStyle}
                    value={item.unitPrice === 0 ? '' : item.unitPrice}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        const unitPrice = val === '' ? 0 : parseFloat(val);
                        if (!isNaN(unitPrice)) {
                          onUpdateItem(item.id, { unitPrice });
                        }
                      }
                    }}
                    className="h-8 w-20 px-2 py-0 text-[13px] text-white bg-white/[0.06] border border-white/[0.12] rounded-lg caret-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                  />
                  <span className="text-[12px] text-white flex-1">{item.unit}</span>
                  <span className="text-[13px] font-bold text-white">
                    {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Worker Type Sheet */}
      <Sheet open={workerSheetOpen} onOpenChange={setWorkerSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Worker Type</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(70vh-60px)]">
            {workerTypes.map((worker) => {
              const isSelected = newItem.workerType === worker.id;
              return (
                <button
                  key={worker.id}
                  onClick={() => handleWorkerTypeChange(worker.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation active:bg-white/[0.08]',
                    isSelected && 'bg-white/[0.06]'
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">{worker.name}</p>
                    <p className="text-[12px] text-white">{worker.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-white">
                      £{worker.defaultHourlyRate}/hr
                    </span>
                    {isSelected && <Check className="h-5 w-5 text-white" />}
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
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Hours</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-3">
            {/* Custom hours input */}
            <div className="flex items-center gap-3">
              <label className="text-[12px] text-white uppercase tracking-wide whitespace-nowrap">Custom</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 2.5"
                style={darkInputStyle}
                className="flex-1 h-11 px-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[15px] text-white placeholder:text-white/60 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 caret-elec-yellow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseFloat((e.target as HTMLInputElement).value);
                    if (!isNaN(val) && val > 0) handleHoursChange(val);
                  }
                }}
                onBlur={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) handleHoursChange(val);
                }}
              />
              <span className="text-[12px] text-white">hrs</span>
            </div>

            {/* Preset hour buttons */}
            <div className="grid grid-cols-3 gap-2">
              {hourOptions.map((h) => {
                const isSelected = newItem.hours === h;
                return (
                  <button
                    key={h}
                    onClick={() => handleHoursChange(h)}
                    className={cn(
                      'p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.98]',
                      isSelected
                        ? 'bg-elec-yellow/15 text-elec-yellow border-elec-yellow/20 font-bold'
                        : 'bg-white/[0.06] border-white/[0.12] text-white'
                    )}
                  >
                    <p className="text-[18px] font-semibold">{h}</p>
                    <p className="text-[11px] opacity-70">{h === 1 ? 'hour' : 'hours'}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Material Category Sheet */}
      <Sheet open={categorySheetOpen} onOpenChange={setCategorySheetOpen}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Category</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(60vh-60px)]">
            <button
              onClick={() => {
                setNewItem((prev) => ({ ...prev, subcategory: '', materialCode: '' }));
                setCategorySheetOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation',
                !newItem.subcategory && 'bg-elec-yellow/10'
              )}
            >
              <span className="text-[16px] font-medium text-white">All Categories</span>
              {!newItem.subcategory && <Check className="h-5 w-5 text-white" />}
            </button>
            {materialCategories.map((cat) => {
              const isSelected = newItem.subcategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setNewItem((prev) => ({ ...prev, subcategory: cat.id, materialCode: '' }));
                    setCategorySheetOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation',
                    isSelected && 'bg-white/[0.06]'
                  )}
                >
                  <span className="text-[16px] font-medium text-white">{cat.name}</span>
                  {isSelected && <Check className="h-5 w-5 text-white" />}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Material Sheet */}
      <Sheet open={materialSheetOpen} onOpenChange={setMaterialSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Material</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(80vh-60px)]">
            {filteredMaterials.map((material) => {
              const isSelected = newItem.materialCode === material.id;
              const price = calculateAdjustedPrice(material.defaultPrice);
              return (
                <button
                  key={material.id}
                  onClick={() => handleMaterialSelect(material.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation active:bg-white/[0.08]',
                    isSelected && 'bg-white/[0.06]'
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">{material.name}</p>
                    <p className="text-[12px] text-white">{material.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-white">
                      £{price.toFixed(2)}
                    </span>
                    {isSelected && <Check className="h-5 w-5 text-white" />}
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
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Category</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(50vh-60px)]">
            {equipmentCategories.map((cat) => {
              const isSelected = newItem.subcategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setNewItem((prev) => ({ ...prev, subcategory: cat.id }));
                    setEquipmentCategorySheetOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation',
                    isSelected && 'bg-white/[0.06]'
                  )}
                >
                  <span className="text-[16px] font-medium text-white">{cat.name}</span>
                  {isSelected && <Check className="h-5 w-5 text-white" />}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Equipment Sheet */}
      <Sheet open={equipmentSheetOpen} onOpenChange={setEquipmentSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
          <SheetHeader className="p-4 border-b border-white/[0.12]">
            <SheetTitle className="text-white text-left">Select Equipment</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(70vh-60px)]">
            {commonEquipment
              .filter((e) => !newItem.subcategory || e.category === newItem.subcategory)
              .map((equipment) => {
                const isSelected = newItem.equipmentCode === equipment.id;
                return (
                  <button
                    key={equipment.id}
                    onClick={() => handleEquipmentSelect(equipment.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 border-b border-white/[0.12] touch-manipulation active:bg-white/[0.08]',
                      isSelected && 'bg-white/[0.06]'
                    )}
                  >
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-medium text-white">{equipment.name}</p>
                      <p className="text-[12px] text-white">{equipment.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-bold text-white">
                        £{equipment.dailyRate}/{equipment.unit}
                      </span>
                      {isSelected && <Check className="h-5 w-5 text-white" />}
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
        isProcessing={
          scanner.state === 'processing' ||
          scanner.state === 'matching' ||
          scanner.state === 'uploading'
        }
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
