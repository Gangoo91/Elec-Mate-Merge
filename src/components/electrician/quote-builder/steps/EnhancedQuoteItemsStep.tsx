import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Trash2,
  Copy,
  Search,
  ChevronDown,
  ChevronUp,
  Pencil,
  Check,
} from 'lucide-react';
import { QuoteItem, JobTemplate } from '@/types/quote';
import { JobTemplates } from '../JobTemplates';
import { cn } from '@/lib/utils';
import {
  workerTypes as defaultWorkerTypes,
  materialCategories,
  commonMaterials,
  equipmentCategories,
  commonEquipment,
} from '@/data/electrician/presetData';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useMaterialsLists, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { usePriceBookBundles } from '@/hooks/usePriceBookBundles';
import { usePriceBookSettings } from '@/hooks/usePriceBookSettings';
import { usePriceList } from '@/hooks/usePriceList';
import { useInvoiceScanner } from '@/hooks/useInvoiceScanner';
import { InvoiceScannerSheet } from '@/components/electrician/invoice-builder/InvoiceScannerSheet';
import { InvoiceScanResults } from '@/components/electrician/invoice-builder/InvoiceScanResults';

interface EnhancedQuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  priceAdjustment?: number;
  setPriceAdjustment?: (adjustment: number) => void;
  calculateAdjustedPrice?: (basePrice: number) => number;
}

export const EnhancedQuoteItemsStep = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  priceAdjustment = 0,
  setPriceAdjustment,
  calculateAdjustedPrice,
}: EnhancedQuoteItemsStepProps) => {
  // Get user's company profile for custom worker rates
  const { companyProfile } = useCompanyProfile();

  // Price Book data
  const { lists: materialsLists } = useMaterialsLists();
  const [priceBookSearch, setPriceBookSearch] = useState('');
  const [showPriceBook, setShowPriceBook] = useState(false);

  // Bundles
  const { bundles, bundleTotal } = usePriceBookBundles();
  const [showBundles, setShowBundles] = useState(false);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  // Inline item description editing
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');

  // Global markup from Price Book settings
  const { calcSellPrice } = usePriceBookSettings();

  // Rate card
  const { items: rateCardItems } = usePriceList();
  const [showRateCard, setShowRateCard] = useState(false);
  const [rateCardSearch, setRateCardSearch] = useState('');

  const pricedBookItems = useMemo(() => {
    const result: { item: MaterialsListItem; listName: string }[] = [];
    for (const list of materialsLists) {
      for (const item of list.items) {
        if (item.estimated_price != null && item.estimated_price > 0) {
          result.push({ item, listName: list.name });
        }
      }
    }
    if (priceBookSearch.trim()) {
      const q = priceBookSearch.toLowerCase();
      return result.filter((p) => p.item.name.toLowerCase().includes(q));
    }
    return result;
  }, [materialsLists, priceBookSearch]);

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
    category: 'labour' as 'labour' | 'materials' | 'equipment' | 'manual',
    subcategory: '',
    workerType: '',
    hours: 0,
    hourlyRate: 0,
    materialCode: '',
    equipmentCode: '',
    notes: '',
  });

  const [customCategory, setCustomCategory] = useState<
    'manual' | 'materials' | 'labour' | 'equipment'
  >('manual');
  const [materialSearch, setMaterialSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ragResults, setRagResults] = useState<any[]>([]);
  const [isSearchingRAG, setIsSearchingRAG] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  // String states for decimal input — prevents parseFloat stripping trailing dot
  const [quantityInput, setQuantityInput] = useState('1');
  const [unitPriceInput, setUnitPriceInput] = useState('');
  const debouncedSearch = useDebounce(materialSearch, 500);

  // Invoice Scanner State
  const [scannerSheetOpen, setScannerSheetOpen] = useState(false);
  const [scanResultsOpen, setScanResultsOpen] = useState(false);
  const scanner = useInvoiceScanner();

  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach((item) => {
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
    items.forEach((item) => {
      const adjustedPrice = calculateAdjustedPrice
        ? calculateAdjustedPrice(item.unitPrice)
        : item.unitPrice;
      onAdd({
        ...item,
        unitPrice: adjustedPrice,
        notes: `Scanned from supplier invoice`,
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
    setNewItem((prev) => ({
      ...prev,
      category: category as 'labour' | 'materials' | 'equipment' | 'manual',
      subcategory: '',
      workerType: '',
      hours: 0,
      hourlyRate: 0,
      materialCode: '',
      equipmentCode: '',
      unitPrice: 0,
      unit: category === 'labour' ? 'hour' : category === 'manual' ? 'item' : 'each',
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
  };

  const handleMaterialSelect = (materialId: string) => {
    const material = commonMaterials.find((m) => m.id === materialId);
    if (material) {
      setNewItem((prev) => ({
        ...prev,
        materialCode: materialId,
        description: material.name,
        unitPrice: calculateAdjustedPrice
          ? calculateAdjustedPrice(material.defaultPrice)
          : material.defaultPrice,
        unit: material.unit,
      }));
    }
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
  };

  const handleHoursChange = (hours: number) => {
    setNewItem((prev) => ({
      ...prev,
      hours,
      quantity: hours,
      unitPrice: prev.hourlyRate,
    }));
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.unitPrice > 0) {
      const itemToAdd = {
        ...newItem,
        // When using Custom tab, override category with the user's chosen "Appears Under" value
        category: newItem.category === 'manual' ? customCategory : newItem.category,
        quantity:
          newItem.category === 'labour' && newItem.hours > 0 ? newItem.hours : newItem.quantity,
      };
      onAdd(itemToAdd);

      // Keep customCategory so next manual item defaults to same category

      setNewItem((prev) => ({
        description: '',
        quantity: 1,
        unit: prev.category === 'labour' ? 'hour' : prev.category === 'manual' ? 'item' : 'each',
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
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labour':
        return 'border-l-blue-500';
      case 'materials':
        return 'border-l-green-500';
      case 'equipment':
        return 'border-l-purple-500';
      default:
        return 'border-l-gray-500';
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
      notes: item.notes,
    };
    onAdd(duplicate);
  };

  // Filter materials based on search and category
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
              categoryFilter:
                newItem.subcategory && newItem.subcategory !== 'all-categories'
                  ? newItem.subcategory
                  : null,
              supplierFilter: 'all',
              limit: 30,
            },
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
    { id: 'labour', label: 'Labour', dotColor: 'bg-blue-500' },
    { id: 'materials', label: 'Materials', dotColor: 'bg-green-500' },
    { id: 'equipment', label: 'Equipment', dotColor: 'bg-purple-500' },
    { id: 'manual', label: 'Custom', dotColor: 'bg-white' },
  ];

  const hourOptions = [
    { value: '0.5', label: '0.5 hr' },
    { value: '1', label: '1 hr' },
    { value: '1.5', label: '1.5 hrs' },
    { value: '2', label: '2 hrs' },
    { value: '2.5', label: '2.5 hrs' },
    { value: '3', label: '3 hrs' },
    { value: '3.5', label: '3.5 hrs' },
    { value: '4', label: '4 hrs' },
    { value: '4.5', label: '4.5 hrs' },
    { value: '5', label: '5 hrs' },
    { value: '6', label: '6 hrs' },
    { value: '7.5', label: '7.5 hrs' },
    { value: '8', label: '1 day' },
    { value: '16', label: '2 days' },
    { value: '24', label: '3 days' },
    { value: '40', label: '5 days' },
  ];

  const markupOptions = [
    { value: '0', label: 'No markup (0%)' },
    { value: '10', label: '10% markup' },
    { value: '15', label: '15% markup' },
    { value: '20', label: '20% markup' },
  ];

  return (
    <div className="space-y-4">
      {/* Running Total */}
      {items.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-white">{items.length} item{items.length !== 1 && 's'}</p>
          <p className="text-[20px] font-bold text-elec-yellow">£{total.toFixed(2)}</p>
        </div>
      )}

      {/* Quick actions — prominent, own row */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setScannerSheetOpen(true)}
          className="h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all"
        >
          Scan Invoice
        </button>
        <button
          type="button"
          onClick={() => setShowTemplates(true)}
          className="h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all"
        >
          Templates
        </button>
      </div>

      {/* Material markup */}
      {setPriceAdjustment && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white">Material Markup</span>
          <div className="flex gap-1">
            {[0, 10, 15, 20].map((markup) => (
              <button
                key={markup}
                type="button"
                onClick={() => setPriceAdjustment(markup)}
                className={cn(
                  'h-9 px-3 rounded-lg text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.97]',
                  priceAdjustment === markup
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.04] text-white border border-white/[0.08]'
                )}
              >
                {markup}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-1.5">
        {categories.map((cat) => {
          const isActive = newItem.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                'flex-1 h-11 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                isActive
                  ? 'bg-elec-yellow text-black font-semibold'
                  : 'bg-white/[0.04] text-white border border-white/[0.08]'
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Add Item Form */}
      <div>
        {/* Labour Fields */}
        {newItem.category === 'labour' && (
          <div className="p-4 space-y-4">
            {/* Worker Type - Visual Pills */}
            <div>
              <label className="text-xs font-medium text-white mb-2 block">Worker Type</label>
              <div className="space-y-1.5">
                {workerTypes.map((w) => {
                  const isSelected = newItem.workerType === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => handleWorkerTypeChange(w.id)}
                      className={cn(
                        'w-full flex items-center justify-between h-11 px-3 rounded-xl transition-all touch-manipulation active:scale-[0.98]',
                        isSelected
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.04] text-white border border-white/[0.08]'
                      )}
                    >
                      <span className={cn('text-[13px] font-medium', isSelected ? 'text-black' : 'text-white')}>{w.name}</span>
                      <span className={cn('text-[12px] font-semibold', isSelected ? 'text-black/70' : 'text-white')}>£{w.defaultHourlyRate}/hr</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-white block">Hours (decimals allowed, e.g. 3.5)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="3.5"
                  value={newItem.hours > 0 ? newItem.hours : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) {
                      const num = val === '' ? 0 : parseFloat(val);
                      if (!isNaN(num)) handleHoursChange(num);
                    }
                  }}
                  className="flex-1 h-12 px-4 rounded-xl bg-white/[0.08] border border-elec-yellow/40 text-[17px] font-medium text-white placeholder:text-white touch-manipulation focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/30 caret-elec-yellow"
                />
                <span className="text-[13px] font-medium text-white">hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.12]" />
                <span className="text-[11px] text-white uppercase tracking-wide">or quick pick</span>
                <div className="flex-1 h-px bg-white/[0.12]" />
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {hourOptions.map((opt) => {
                  const isSelected = newItem.hours === parseFloat(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleHoursChange(parseFloat(opt.value))}
                      className={cn(
                        'h-11 rounded-xl text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                        isSelected
                          ? 'bg-elec-yellow text-black font-semibold'
                          : 'bg-white/[0.04] text-white border border-white/[0.08]'
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
        {newItem.category === 'materials' && (
          <div className="p-4 space-y-3">
            {/* Search Input - Full Width */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
              <Input
                placeholder="Search materials by name or code..."
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                className="h-12 pl-11 pr-4 bg-input border-white/[0.08] text-[15px] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow/20 rounded-xl"
              />
            </div>

            {/* Material Results */}
            {materialSearch.length >= 2 &&
              (filteredMaterials.length > 0 || ragResults.length > 0) && (
                <div>
                  <p className="text-[12px] text-white mb-2">
                    {filteredMaterials.length + ragResults.length} results{' '}
                    {isSearchingRAG && '• Searching...'}
                  </p>
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {filteredMaterials.slice(0, 5).map((material) => {
                      const adjustedPrice = calculateAdjustedPrice
                        ? calculateAdjustedPrice(material.defaultPrice)
                        : material.defaultPrice;
                      const isSelected = newItem.materialCode === material.id;
                      return (
                        <button
                          key={material.id}
                          type="button"
                          onClick={() => handleMaterialSelect(material.id)}
                          className={cn(
                            'w-full p-3 rounded-xl text-left transition-all touch-manipulation active:scale-[0.99]',
                            isSelected
                              ? 'bg-elec-yellow/20 border border-elec-yellow/40'
                              : 'bg-white/[0.03] border border-white/[0.06] active:bg-white/[0.06]'
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-[14px] text-white">{material.name}</p>
                            <p
                              className={cn(
                                'font-bold text-[15px]',
                                isSelected ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              £{adjustedPrice.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-[12px] text-white mt-0.5">{material.category}</p>
                        </button>
                      );
                    })}
                    {ragResults.slice(0, 10).map((material, idx) => {
                      const priceMatch = material.price?.match(/£?(\d+\.?\d*)/);
                      const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                      const adjustedPrice = calculateAdjustedPrice
                        ? calculateAdjustedPrice(basePrice)
                        : basePrice;
                      return (
                        <button
                          key={`rag-${idx}`}
                          type="button"
                          onClick={() => {
                            setNewItem((prev) => ({
                              ...prev,
                              description: material.name,
                              unitPrice: adjustedPrice,
                              unit: 'each',
                              materialCode: `rag-${material.id}`,
                            }));
                            toast({ title: 'Material Selected', description: material.name });
                          }}
                          className="w-full p-3 rounded-xl text-left bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.05] transition-all touch-manipulation"
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-[14px] text-white">{material.name}</p>
                            <p className="font-bold text-[15px] text-white">
                              £{adjustedPrice.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-[12px] text-white mt-0.5">{material.supplier}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Equipment Fields */}
        {newItem.category === 'equipment' && (
          <div className="space-y-3 p-0">
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Equipment Category</label>
              <Select value={newItem.subcategory || ''} onValueChange={(value) => setNewItem((prev) => ({ ...prev, subcategory: value }))}>
                <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.08] text-white touch-manipulation">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-white/10 text-foreground">
                  {equipmentCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-foreground focus:bg-white/10 cursor-pointer">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Equipment</label>
              <Select value={newItem.equipmentCode || ''} onValueChange={(value) => handleEquipmentSelect(value)}>
                <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.08] text-white touch-manipulation">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-white/10 text-foreground">
                  {commonEquipment.filter((e) => !newItem.subcategory || e.category === newItem.subcategory).map((e) => (
                    <SelectItem key={e.id} value={e.id} className="text-foreground focus:bg-white/10 cursor-pointer">{e.name} - £{e.dailyRate}/{e.unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Manual Entry Fields */}
        {newItem.category === 'manual' && (
          <div className="space-y-3 p-0">
            {/* Appears Under */}
            <div>
              <label className="text-xs font-medium text-white mb-2 block">Appears Under (on PDF)</label>
              <div className="flex gap-1.5">
                {[
                  { id: 'materials' as const, label: 'Materials' },
                  { id: 'labour' as const, label: 'Labour' },
                  { id: 'equipment' as const, label: 'Equipment' },
                  { id: 'manual' as const, label: 'Other' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCustomCategory(opt.id)}
                    className={cn(
                      'flex-1 h-11 rounded-xl text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                      customCategory === opt.id
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.04] text-white border border-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Description *</label>
              <Textarea
                placeholder="e.g., Site visit fee, Call-out charge"
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px] px-3 py-2.5 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white resize-none"
              />
            </div>
            {/* Quantity */}
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Quantity</label>
              <Input
                type="text"
                inputMode="decimal"
                value={quantityInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d*\.?\d*$/.test(val)) setQuantityInput(val);
                }}
                onBlur={() => {
                  const parsed = parseFloat(quantityInput);
                  const val = isNaN(parsed) || parsed <= 0 ? 1 : parsed;
                  setNewItem((prev) => ({ ...prev, quantity: val }));
                  setQuantityInput(String(val));
                }}
                placeholder="1"
                className="h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow placeholder:text-white"
              />
            </div>
            {/* Unit Price */}
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Unit Price (£)</label>
              <Input
                type="text"
                inputMode="decimal"
                value={unitPriceInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d*\.?\d*$/.test(val)) setUnitPriceInput(val);
                }}
                onBlur={() => {
                  const parsed = parseFloat(unitPriceInput);
                  const val = isNaN(parsed) ? 0 : parsed;
                  setNewItem((prev) => ({ ...prev, unitPrice: val }));
                  if (val > 0) setUnitPriceInput(val.toFixed(2));
                }}
                placeholder="0.00"
                className="h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow placeholder:text-white"
              />
            </div>
            {/* Total Preview */}
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="flex items-center justify-between p-3.5 bg-elec-yellow/5">
                <span className="text-[14px] text-white">Item Total</span>
                <span className="text-lg font-bold text-elec-yellow">
                  £{(newItem.quantity * newItem.unitPrice).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Add Button */}
        <div className="pt-2">
          <Button
            onClick={handleAddItem}
            disabled={!newItem.description || newItem.unitPrice <= 0}
            className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-40"
          >
            Add to Quote
          </Button>
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white uppercase tracking-wider px-1 mb-2">
            Added Items ({items.length})
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {items.map((item) => {
              const cat = categories.find((c) => c.id === item.category);
              return (
                <div key={item.id} className="p-3">
                  {/* Top row: Category dot + Description + Total */}
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                        item.category === 'labour'
                          ? 'bg-blue-500'
                          : item.category === 'materials'
                            ? 'bg-green-500'
                            : item.category === 'equipment'
                              ? 'bg-purple-500'
                              : 'bg-gray-500'
                      )}
                    />
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        onBlur={() => {
                          if (editingDescription.trim()) {
                            onUpdate(item.id, { description: editingDescription.trim() });
                          }
                          setEditingItemId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editingDescription.trim()) {
                              onUpdate(item.id, { description: editingDescription.trim() });
                            }
                            setEditingItemId(null);
                          }
                          if (e.key === 'Escape') setEditingItemId(null);
                        }}
                        className="flex-1 min-w-0 bg-[#1a1a1e] border border-elec-yellow/40 rounded-lg px-2 py-1 text-[14px] text-white focus:outline-none focus:border-elec-yellow"
                      />
                    ) : (
                      <p className="flex-1 min-w-0 font-medium text-[14px] text-white leading-tight line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-[15px] font-bold text-elec-yellow shrink-0 ml-2">
                      £{item.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Bottom row: Qty × Price | Actions */}
                  <div className="flex items-center justify-between">
                    {/* Quantity and Price inputs */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        inputMode="decimal"
                        style={{ colorScheme: 'dark' }}
                        value={item.quantity === 0 ? '' : item.quantity}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            onUpdate(item.id, {
                              quantity: val === '' ? 0 : parseFloat(val),
                            });
                          }
                        }}
                        className="w-12 h-8 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                      />
                      <span className="text-[11px] text-white w-8 truncate">{item.unit}</span>
                      <span className="text-[12px] text-white">×</span>
                      <span className="text-[11px] text-white">£</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        style={{ colorScheme: 'dark' }}
                        value={item.unitPrice === 0 ? '' : item.unitPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            onUpdate(item.id, {
                              unitPrice: val === '' ? 0 : parseFloat(val),
                            });
                          }
                        }}
                        className="w-14 h-8 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                      />
                    </div>

                    {/* Action buttons - always visible */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (editingItemId === item.id) {
                            if (editingDescription.trim()) {
                              onUpdate(item.id, { description: editingDescription.trim() });
                            }
                            setEditingItemId(null);
                          } else {
                            setEditingDescription(item.description);
                            setEditingItemId(item.id);
                          }
                        }}
                        className={cn(
                          'w-9 h-9 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                          editingItemId === item.id
                            ? 'bg-elec-yellow/20 active:bg-elec-yellow/30'
                            : 'bg-white/[0.05] active:bg-white/[0.1]'
                        )}
                        aria-label={editingItemId === item.id ? 'Confirm edit' : 'Edit description'}
                      >
                        {editingItemId === item.id
                          ? <Check className="h-4 w-4 text-elec-yellow" />
                          : <Pencil className="h-4 w-4 text-white" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateItem(item)}
                        className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center touch-manipulation active:bg-white/[0.1] active:scale-95 transition-transform"
                        aria-label="Duplicate item"
                      >
                        <Copy className="h-4 w-4 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:bg-red-500/20 active:scale-95 transition-transform"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Templates */}
      {!showTemplates ? (
        <button
          type="button"
          onClick={() => setShowTemplates(true)}
          className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] active:bg-white/[0.07] transition-all"
        >
          <span className="text-[13px] font-medium text-white">Job Templates</span>
          <span className="text-[11px] text-white">Pre-built item sets</span>
        </button>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Job Templates</h3>
            <button type="button" onClick={() => setShowTemplates(false)} className="text-[12px] text-elec-yellow font-medium touch-manipulation">
              Close
            </button>
          </div>
          <JobTemplates onSelectTemplate={handleTemplateSelect} />
        </div>
      )}

      {/* Price Book */}
      {!showPriceBook ? (
        <button
          type="button"
          onClick={() => setShowPriceBook(true)}
          className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] active:bg-white/[0.07] transition-all"
        >
          <span className="text-[13px] font-medium text-white">My Price Book</span>
          <span className="text-[11px] text-white">{pricedBookItems.length} items</span>
        </button>
      ) : (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
            <h3 className="font-semibold text-white">My Price Book</h3>
            <button
              type="button"
              onClick={() => setShowPriceBook(false)}
              className="text-[14px] text-elec-yellow font-medium touch-manipulation"
            >
              Close
            </button>
          </div>
          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <input
                type="text"
                placeholder="Search price book..."
                value={priceBookSearch}
                onChange={(e) => setPriceBookSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
              />
            </div>
            {pricedBookItems.length === 0 ? (
              <p className="text-sm text-white text-center py-6">
                {priceBookSearch ? 'No matching items' : 'No priced items in your lists yet.'}
              </p>
            ) : (
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {pricedBookItems.map((p) => (
                  <button
                    key={`pb-${p.item.id}`}
                    type="button"
                    onClick={() => {
                      const costPrice = p.item.estimated_price || 0;
                      onAdd({
                        description: p.item.name,
                        quantity: p.item.quantity || 1,
                        unit: p.item.unit || 'each',
                        unitPrice: Math.round(calcSellPrice(costPrice) * 100) / 100,
                        category: 'materials',
                        notes: p.item.supplier ? `Supplier: ${p.item.supplier}` : undefined,
                      });
                      toast({
                        title: 'Added to quote',
                        description: p.item.name,
                      });
                    }}
                    className="w-full p-3 rounded-xl text-left bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.06] transition-all touch-manipulation active:scale-[0.99]"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-[14px] text-white line-clamp-1 flex-1 mr-2">
                        {p.item.name}
                      </p>
                      <p className="font-bold text-[15px] text-elec-yellow whitespace-nowrap">
                        £{p.item.estimated_price?.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-white">
                        per {p.item.unit || 'each'}
                      </span>
                      {p.item.supplier && (
                        <span className="text-[12px] text-white">{p.item.supplier}</span>
                      )}
                      <span className="text-[10px] text-white ml-auto">{p.listName}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rate Card Section */}
      {rateCardItems.length > 0 && (
        !showRateCard ? (
          <button
            type="button"
            onClick={() => setShowRateCard(true)}
            className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] active:bg-white/[0.07] transition-all"
          >
            <span className="text-[13px] font-medium text-white">My Rate Card</span>
            <span className="text-[11px] text-white">{rateCardItems.length} rates</span>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">My Rate Card</h3>
              <button
                type="button"
                onClick={() => setShowRateCard(false)}
                className="text-[14px] text-elec-yellow font-medium touch-manipulation"
              >
                Close
              </button>
            </div>
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                <input
                  type="text"
                  placeholder="Search rates..."
                  value={rateCardSearch}
                  onChange={(e) => setRateCardSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {rateCardItems
                  .filter(item =>
                    !rateCardSearch.trim() ||
                    item.name.toLowerCase().includes(rateCardSearch.toLowerCase())
                  )
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        const isMaterial = item.category === 'materials';
                        onAdd({
                          description: item.name,
                          quantity: 1,
                          unit: item.unit,
                          unitPrice: isMaterial
                            ? Math.round(calcSellPrice(item.unit_price) * 100) / 100
                            : item.unit_price,
                          category: item.category === 'labour' || item.category === 'call-out'
                            ? 'labour'
                            : item.category === 'materials'
                              ? 'materials'
                              : 'manual',
                          notes: item.description || undefined,
                        });
                        toast({ title: 'Added to quote', description: item.name });
                      }}
                      className="w-full p-3 rounded-xl text-left bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.06] transition-all touch-manipulation active:scale-[0.99]"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 mr-2">
                          <p className="font-medium text-[14px] text-white line-clamp-1">{item.name}</p>
                          {item.description && (
                            <p className="text-[12px] text-white line-clamp-1 mt-0.5">{item.description}</p>
                          )}
                        </div>
                        <p className="font-bold text-[15px] text-elec-yellow whitespace-nowrap flex-shrink-0">
                          £{item.unit_price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-[12px] text-white mt-0.5">per {item.unit}</p>
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        )
      )}

      {/* Bundles Section */}
      {bundles.length > 0 && (
        !showBundles ? (
          <button
            type="button"
            onClick={() => setShowBundles(true)}
            className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] active:bg-white/[0.07] transition-all"
          >
            <span className="text-[13px] font-medium text-white">My Bundles</span>
            <span className="text-[11px] text-white">{bundles.length} assemblies</span>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">My Bundles</h3>
              <button
                type="button"
                onClick={() => setShowBundles(false)}
                className="text-[14px] text-elec-yellow font-medium touch-manipulation"
              >
                Close
              </button>
            </div>
            <div className="p-3 space-y-2">
              {bundles.map((bundle) => {
                const total = bundleTotal(bundle);
                const expanded = expandedBundle === bundle.id;
                return (
                  <div key={bundle.id} className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                    <button
                      type="button"
                      onClick={() => setExpandedBundle(expanded ? null : bundle.id)}
                      className="w-full p-3 text-left touch-manipulation"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-white line-clamp-1">{bundle.name}</p>
                          {bundle.description && (
                            <p className="text-[11px] text-white mt-0.5 line-clamp-1">{bundle.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <span className="text-[14px] font-bold text-elec-yellow">£{total.toFixed(2)}</span>
                          {expanded ? (
                            <ChevronUp className="h-4 w-4 text-white" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-white mt-0.5">{bundle.items.length} items</p>
                    </button>

                    {expanded && (
                      <div className="border-t border-white/[0.05] px-3 pb-3">
                        <div className="space-y-1 mt-2 mb-3">
                          {bundle.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-[12px]">
                              <span className="text-white flex-1 min-w-0 line-clamp-1">{item.name}</span>
                              <span className="text-white ml-2 flex-shrink-0">
                                {item.quantity} × £{item.unitPrice.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            let addedCount = 0;
                            bundle.items.forEach((item) => {
                              const isBundleMaterial = item.category !== 'labour' && item.category !== 'equipment';
                              onAdd({
                                description: item.name,
                                quantity: item.quantity,
                                unit: item.unit,
                                unitPrice: isBundleMaterial
                                  ? Math.round(calcSellPrice(item.unitPrice) * 100) / 100
                                  : item.unitPrice,
                                category: item.category === 'labour' ? 'labour' : item.category === 'equipment' ? 'equipment' : 'materials',
                              });
                              addedCount++;
                            });
                            toast({
                              title: `${bundle.name} added`,
                              description: `${addedCount} items added to quote`,
                            });
                            setExpandedBundle(null);
                          }}
                          className="w-full py-2.5 text-[13px] font-semibold text-black bg-elec-yellow rounded-lg touch-manipulation active:bg-elec-yellow/90"
                        >
                          Add all to quote
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

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
