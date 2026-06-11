import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronDown, ChevronUp, Check, Pencil, Copy, Percent, Zap, PenLine, LayoutTemplate, ScanLine, Loader2, BookOpen, PoundSterling, Search, AlertTriangle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useMaterialsLists, type MaterialsListItem } from '@/hooks/useMaterialsLists';
import { usePriceList } from '@/hooks/usePriceList';
import { supabase } from '@/integrations/supabase/client';
import { PANEL } from '@/components/electrician/shared/surfaces';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ELE-889 — common UK trade units. Anything outside this list is treated as
// "custom" and rendered through a free-text input.
const UNIT_PRESETS = [
  'hour',
  'day',
  'half-day',
  'each',
  'item',
  'm',
  'm²',
  'kit',
  'callout',
  'visit',
] as const;

import { DecimalInput as InlineDecimalInput } from '@/components/ui/decimal-input';

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
  stockItems?: { id: string; name: string; quantity: number; low_stock_threshold?: number | null }[];
}

type AddMethod = 'quick' | 'manual' | 'pricebook' | 'ratecard' | 'templates' | 'scan';
type Category = 'labour' | 'materials' | 'equipment';

/** Tames ALL-CAPS supplier product names; preserves trade acronyms. */
const KEEP_CAPS = new Set(['LED', 'USB', 'RCD', 'RCBO', 'MCB', 'SPD', 'AFDD', 'PVC', 'XLPE', 'SWA', 'LSF', 'T&E', 'IP65', 'IP66', 'IP44', 'CU', 'DB', 'EV', 'AC', 'DC', 'UV', 'PIR']);
function titleCaseProduct(name: string): string {
  if (!name) return name;
  if (name !== name.toUpperCase()) return name;
  return name
    .split(' ')
    .map((w) => (KEEP_CAPS.has(w.replace(/[^A-Z0-9&]/g, '')) || /\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ');
}

export const InvoiceItemsStep = ({
  // Default to empty arrays so the component can never crash on
  // `.length` / `.map` if a parent or persisted draft passes undefined.
  // Sentry issues 76 / 72: `Cannot read properties of undefined (reading
  // 'length')` on /electrician/invoice-builder/create — both fired when
  // a stale draft restored from storage didn't have `additional_invoice_items`.
  originalItems = [],
  additionalItems = [],
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  settings,
  subtotal = 0,
  vatAmount = 0,
  total = 0,
  stockItems = [],
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

  // ELE-1021 — labour pricing mode (hourly vs day rate), remembered per session.
  const [labourRateMode, setLabourRateMode] = useState<'hour' | 'day'>(() => {
    try {
      return (sessionStorage.getItem('elecmate_labour_rate_mode') as 'hour' | 'day') || 'hour';
    } catch {
      return 'hour';
    }
  });
  const isDayMode = labourRateMode === 'day';
  const baseHourlyRate = companyProfile?.hourly_rate || 45;
  const baseDayRate = companyProfile?.day_rate ?? baseHourlyRate * 8;
  const workerRateForMode = (defaultHourlyRate: number) =>
    isDayMode ? Math.round(baseDayRate * (defaultHourlyRate / baseHourlyRate)) : defaultHourlyRate;

  const [materialSearch, setMaterialSearch] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  // ELE-888 — per-item adjustment editor toggle
  const [adjustingItemId, setAdjustingItemId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');

  // Price Book + Rate Card + live stock (parity with the quote wizard, ELE-1014).
  const { lists: materialsLists } = useMaterialsLists();
  const { items: rateCardItems } = usePriceList();
  const [priceBookSearch, setPriceBookSearch] = useState('');
  const [rateCardSearch, setRateCardSearch] = useState('');

  const stockById = useMemo(() => new Map(stockItems.map((st) => [st.id, st])), [stockItems]);

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
      return result.filter((pb) => pb.item.name.toLowerCase().includes(q));
    }
    return result;
  }, [materialsLists, priceBookSearch]);

  // Take-off check — saving this invoice decrements stock for every line
  // carrying inventoryItemId (apply_invoice_stock_decrement RPC), so warn
  // when AGGREGATE demand across quote + added lines exceeds what's on hand.
  const stockWarnings = useMemo(() => {
    const demand = new Map<string, number>();
    for (const it of [...originalItems, ...additionalItems]) {
      if (!it.inventoryItemId) continue;
      const qty = Number(it.actualQuantity ?? it.quantity) || 0;
      demand.set(it.inventoryItemId, (demand.get(it.inventoryItemId) || 0) + qty);
    }
    return Array.from(demand.entries()).flatMap(([id, need]) => {
      const stock = stockById.get(id);
      if (!stock || need <= stock.quantity) return [];
      return [{ name: stock.name, need, have: stock.quantity }];
    });
  }, [originalItems, additionalItems, stockById]);

  // Live supplier results (same marketplace_products pipeline as the quote
  // wizard — Screwfix/Toolstation/CEF scraped daily by elec-pipeline).
  const [liveResults, setLiveResults] = useState<any[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const debouncedMaterialSearch = useDebounce(materialSearch, 500);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (debouncedMaterialSearch.trim().length < 3) {
        setLiveResults([]);
        return;
      }
      setIsSearchingLive(true);
      try {
        const { data, error } = await supabase.functions.invoke('search-materials-fast', {
          body: { query: debouncedMaterialSearch, categoryFilter: null, supplierFilter: 'all', limit: 16 },
        });
        if (error) throw error;
        if (!cancelled && data?.materials) {
          const ms = [...data.materials].sort((a: any, b: any) =>
            (b.source === 'live' ? 1 : 0) - (a.source === 'live' ? 1 : 0)
          );
          setLiveResults(ms);
        }
      } catch {
        if (!cancelled) setLiveResults([]);
      } finally {
        if (!cancelled) setIsSearchingLive(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedMaterialSearch]);

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
      unit: category === 'labour' ? (isDayMode ? 'day' : 'hour') : 'each',
    }));
  };

  const handleWorkerTypeChange = (workerTypeId: string) => {
    const worker = workerTypes.find((w) => w.id === workerTypeId);
    if (worker) {
      const rate = workerRateForMode(worker.defaultHourlyRate);
      setNewItem((prev) => ({
        ...prev,
        workerType: workerTypeId,
        hourlyRate: rate,
        unitPrice: rate,
        unit: isDayMode ? 'day' : 'hour',
        description: prev.description || `${worker.name} - ${worker.description}`,
      }));
    }
    setWorkerSheetOpen(false);
  };

  // ELE-1021 — flip labour pricing between hourly and day rate; remember per session
  // and re-price the in-progress line to the new mode.
  const handleLabourRateModeChange = (mode: 'hour' | 'day') => {
    setLabourRateMode(mode);
    try {
      sessionStorage.setItem('elecmate_labour_rate_mode', mode);
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
    setNewItem((prev) => {
      if (prev.category !== 'labour') return prev;
      const worker = workerTypes.find((w) => w.id === prev.workerType);
      const dayNow = mode === 'day';
      const rate = worker
        ? dayNow
          ? Math.round(baseDayRate * (worker.defaultHourlyRate / baseHourlyRate))
          : worker.defaultHourlyRate
        : prev.hourlyRate;
      return {
        ...prev,
        hours: 0,
        quantity: 0,
        hourlyRate: rate,
        unitPrice: rate,
        unit: dayNow ? 'day' : 'hour',
      };
    });
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
      unit: isDayMode ? (hours === 1 ? 'day' : 'days') : 'hour',
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

    // ELE-887 — apply material markup to manually-entered items
    const shouldApplyMarkup =
      (newItem.category === 'materials' || newItem.category === 'equipment') &&
      priceAdjustment > 0;
    const finalUnitPrice = shouldApplyMarkup
      ? calculateAdjustedPrice(newItem.unitPrice)
      : newItem.unitPrice;
    const itemToAdd = {
      ...newItem,
      unitPrice: finalUnitPrice,
      quantity:
        newItem.category === 'labour' && newItem.hours > 0 ? newItem.hours : newItem.quantity,
    };
    onAddItem(itemToAdd);
    toast({ title: 'Item added', description: itemToAdd.description });

    setNewItem((prev) => ({
      description: '',
      quantity: 1,
      unit: prev.category === 'labour' ? (isDayMode ? 'day' : 'hour') : 'each',
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

  const hourOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7.5, 8, 10, 12, 16, 24, 40];
  // ELE-1021 — day-rate quick picks (used when labour is in day mode).
  const dayOptions = [0.5, 1, 1.5, 2, 3, 5, 10];

  return (
    <div className="space-y-4 text-left">
      {/* Running Total */}
      <div className={cn(PANEL, 'p-4 space-y-1.5')}>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 mb-1">Running total</p>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white">Subtotal</span>
          <span className="text-[14px] text-white tabular-nums">{formatCurrency(subtotal)}</span>
        </div>
        {settings?.discountEnabled && (settings?.discountValue || 0) > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-red-400">
              {settings?.discountLabel || 'Discount'}
            </span>
            <span className="text-[14px] text-red-400 tabular-nums">
              -
              {formatCurrency(
                (settings?.discountType || 'percentage') === 'percentage'
                  ? subtotal * ((settings?.discountValue || 0) / 100)
                  : settings?.discountValue || 0
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
          <span className="text-[20px] font-bold text-elec-yellow tabular-nums">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Take-off vs stock — aggregate demand exceeds on-hand */}
      {stockWarnings.length > 0 && (
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-3.5 py-3 space-y-1">
          <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Billing more than you have in stock
          </p>
          {stockWarnings.map((w) => (
            <p key={w.name} className="text-[12px] text-amber-200/90">
              {w.name} — billing {w.need}, only {w.have} in stock
            </p>
          ))}
          <p className="text-[11px] text-white/55 pt-0.5">
            Stock-linked lines deduct automatically when this invoice is saved.
          </p>
        </div>
      )}

      {/* Original Quote Items */}
      {originalItems.length > 0 && (
        <div>
          <button
            onClick={() => setShowOriginalItems(!showOriginalItems)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">01</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· From the quote ({originalItems.length})</span>
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
                <div key={item.id} className="py-3">
                  <div className="flex items-center justify-between mb-2">
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        onBlur={() => {
                          if (editingDescription.trim())
                            onUpdateItem(item.id, { description: editingDescription.trim() });
                          setEditingItemId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editingDescription.trim())
                              onUpdateItem(item.id, { description: editingDescription.trim() });
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
                      <p
                        className={cn(
                          'text-[13px] font-bold mr-1',
                          (item.quantity || 0) * (item.unitPrice || 0) === 0
                            ? 'text-red-400'
                            : 'text-white'
                        )}
                      >
                        {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
                      </p>
                      <button
                        onClick={() => {
                          if (editingItemId === item.id) {
                            if (editingDescription.trim())
                              onUpdateItem(item.id, { description: editingDescription.trim() });
                            setEditingItemId(null);
                          } else {
                            setEditingDescription(item.description);
                            setEditingItemId(item.id);
                          }
                        }}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 ${editingItemId === item.id ? 'bg-white/[0.12]' : 'bg-white/[0.08]'}`}
                        aria-label={editingItemId === item.id ? 'Confirm edit' : 'Edit description'}
                      >
                        {editingItemId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Pencil className="h-3.5 w-3.5 text-white" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAdjustingItemId(adjustingItemId === item.id ? null : item.id)
                        }
                        className={cn(
                          'w-9 h-9 rounded-lg flex items-center justify-center touch-manipulation active:scale-95',
                          adjustingItemId === item.id ||
                            (typeof item.itemAdjustmentPercent === 'number' &&
                              item.itemAdjustmentPercent !== 0)
                            ? 'bg-elec-yellow/20'
                            : 'bg-white/[0.08]'
                        )}
                        aria-label="Per-item adjustment"
                      >
                        <Percent
                          className={cn(
                            'h-3.5 w-3.5',
                            typeof item.itemAdjustmentPercent === 'number' &&
                              item.itemAdjustmentPercent !== 0
                              ? 'text-elec-yellow'
                              : 'text-white'
                          )}
                        />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:scale-95"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                  {/* ELE-888 — adjustment chip */}
                  {typeof item.itemAdjustmentPercent === 'number' &&
                    item.itemAdjustmentPercent !== 0 &&
                    adjustingItemId !== item.id && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                        <span
                          className={cn(
                            'px-1.5 py-0.5 rounded font-semibold tabular-nums',
                            item.itemAdjustmentPercent > 0
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-emerald-500/15 text-emerald-300'
                          )}
                        >
                          {item.itemAdjustmentPercent > 0 ? '+' : ''}
                          {item.itemAdjustmentPercent}%
                        </span>
                        {item.itemAdjustmentLabel && (
                          <span className="text-white/60">{item.itemAdjustmentLabel}</span>
                        )}
                      </div>
                    )}
                  {adjustingItemId === item.id && (
                    <div className="mt-2 mb-1 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        autoFocus
                        placeholder="± %"
                        value={item.itemAdjustmentPercent ?? ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          onUpdateItem(item.id, {
                            itemAdjustmentPercent: v === '' ? undefined : parseFloat(v),
                          });
                        }}
                        className="w-20 h-8 px-2 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                      />
                      <input
                        type="text"
                        placeholder="Reason"
                        value={item.itemAdjustmentLabel ?? ''}
                        onChange={(e) =>
                          onUpdateItem(item.id, {
                            itemAdjustmentLabel: e.target.value || undefined,
                          })
                        }
                        className="flex-1 h-8 px-2 text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation placeholder:text-white/40"
                      />
                      <button
                        type="button"
                        onClick={() => setAdjustingItemId(null)}
                        className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center"
                        aria-label="Done"
                      >
                        <Check className="h-3.5 w-3.5 text-elec-yellow" />
                      </button>
                    </div>
                  )}
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

      {/* === ADD FROM — sources === */}
      <div className="pt-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 mb-2">Add from</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'quick' as AddMethod, label: 'Quick add', sub: 'Labour, materials & kit', icon: Zap },
            { id: 'pricebook' as AddMethod, label: 'Price Book', sub: `${pricedBookItems.length} priced items`, icon: BookOpen },
            ...(rateCardItems.length > 0
              ? [{ id: 'ratecard' as AddMethod, label: 'Rate Card', sub: `${rateCardItems.length} rates`, icon: PoundSterling }]
              : []),
            { id: 'manual' as AddMethod, label: 'Manual', sub: 'Type your own line', icon: PenLine },
            { id: 'templates' as AddMethod, label: 'Job templates', sub: 'Saved job packages', icon: LayoutTemplate },
            { id: 'scan' as AddMethod, label: 'Scan invoice', sub: 'Import supplier costs', icon: ScanLine },
          ].map((method) => {
            const isActive = activeAddMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setActiveAddMethod(method.id)}
                className={cn(
                  'flex flex-col items-start gap-1.5 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all select-none',
                  isActive ? 'bg-elec-yellow/[0.08] border-elec-yellow/[0.25]' : 'bg-white/[0.04] border-white/[0.08]'
                )}
              >
                <method.icon className={cn('h-4 w-4', isActive ? 'text-elec-yellow' : 'text-white/70')} />
                <span>
                  <span className="block text-[12px] font-semibold text-white leading-tight">{method.label}</span>
                  <span className="block text-[10px] text-white/55 mt-0.5">{method.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Add */}
      {activeAddMethod === 'quick' && (
        <div className="space-y-3">
          {/* Category Tabs */}
          <div className="flex gap-1.5">
            {[
              { id: 'labour' as Category, label: 'Labour', dot: 'bg-blue-400' },
              { id: 'materials' as Category, label: 'Materials', dot: 'bg-emerald-400' },
              { id: 'equipment' as Category, label: 'Equipment', dot: 'bg-purple-400' },
            ].map((cat) => {
              const isActive = newItem.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-[13px] font-semibold transition-all touch-manipulation flex items-center justify-center gap-1.5 border',
                    isActive
                      ? 'bg-elec-yellow/[0.08] border-elec-yellow/[0.25] text-elec-yellow'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/80'
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', cat.dot)} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Labour */}
          {newItem.category === 'labour' && (
            <div className="space-y-2">
              {/* ELE-1021 — Hourly / Day rate toggle */}
              <div className="grid grid-cols-2 gap-1.5 pb-1">
                {(['hour', 'day'] as const).map((mode) => {
                  const active = labourRateMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleLabourRateModeChange(mode)}
                      className={cn(
                        'h-10 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                        active
                          ? 'bg-elec-yellow text-black font-semibold'
                          : 'bg-white/[0.04] text-white border border-white/[0.08]'
                      )}
                    >
                      {mode === 'hour' ? 'Hourly rate' : 'Day rate'}
                    </button>
                  );
                })}
              </div>

              {/* Worker Type Selector */}
              <button
                onClick={() => setWorkerSheetOpen(true)}
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
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
                      £{workerRateForMode(selectedWorker.defaultHourlyRate)}{isDayMode ? '/day' : '/hr'}
                    </span>
                  )}
                  <ChevronDown className="h-5 w-5 text-white" />
                </div>
              </button>

              {/* Hours Selector */}
              <button
                onClick={() => setHoursSheetOpen(true)}
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-[11px] text-white uppercase tracking-wide">{isDayMode ? 'Days' : 'Hours'}</p>
                    <p className="text-[15px] font-medium text-white">
                      {newItem.hours > 0
                        ? `${newItem.hours} ${isDayMode ? (newItem.hours === 1 ? 'day' : 'days') : newItem.hours === 1 ? 'hour' : 'hours'}`
                        : isDayMode
                          ? 'Select days'
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
                placeholder="Search live supplier prices…"
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                style={darkInputStyle}
                className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 transition-colors"
              />

              {/* ⚡ Live supplier prices — tap to fill the line */}
              {materialSearch.trim().length >= 3 && (isSearchingLive || liveResults.length > 0) && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 flex items-center gap-1.5 pt-1">
                    <Zap className="h-3 w-3" /> Live supplier prices
                    {isSearchingLive && <Loader2 className="h-3 w-3 animate-spin text-white/40" />}
                  </p>
                  {liveResults.slice(0, 8).map((m: any, idx: number) => {
                    const price = Number(m.price) || 0;
                    const days = m.scrapedAt
                      ? Math.max(0, Math.floor((Date.now() - new Date(m.scrapedAt).getTime()) / 86400000))
                      : null;
                    return (
                      <button
                        key={`${m.supplier || 's'}-${idx}`}
                        type="button"
                        onClick={() => {
                          setNewItem((prev) => ({
                            ...prev,
                            description: titleCaseProduct(m.name || m.description || ''),
                            unitPrice: calculateAdjustedPrice(price),
                            unit: 'each',
                            materialCode: '',
                          }));
                          setMaterialSearch('');
                        }}
                        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left touch-manipulation active:scale-[0.99] transition-all"
                      >
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium text-white truncate">
                            {titleCaseProduct(m.name || m.description || '')}
                          </span>
                          <span className="block text-[11px] text-white/55 capitalize truncate">
                            {m.source === 'live' && <Zap className="inline h-2.5 w-2.5 text-elec-yellow mr-0.5" />}
                            {m.supplier || 'Trade catalogue'}
                            {days !== null && ` · priced ${days === 0 ? 'today' : `${days}d ago`}`}
                            {m.isOnSale && m.discountPercentage ? ` · −${m.discountPercentage}%` : ''}
                          </span>
                        </span>
                        <span className="text-[14px] font-semibold text-white tabular-nums flex-shrink-0">
                          £{price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Category Selector */}
              <button
                onClick={() => setCategorySheetOpen(true)}
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
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
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
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
              <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10]">
                <span className="text-[11px] font-medium text-white/65 uppercase tracking-wider">Markup</span>
                <div className="flex gap-1">
                  {[0, 10, 15, 20].map((markup) => (
                    <button
                      key={markup}
                      onClick={() => setPriceAdjustment(markup)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all touch-manipulation',
                        priceAdjustment === markup
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] text-white/80'
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
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
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
                className="w-full flex items-center justify-between px-3.5 h-14 rounded-xl bg-white/[0.05] border border-white/[0.10] touch-manipulation active:scale-[0.99] transition-all"
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
            className="w-full h-12 bg-elec-yellow text-black text-[15px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Manual Entry */}
      {activeAddMethod === 'manual' && (
        <div className="space-y-3">
          <div>
            <div className="pb-3">
              <label className="text-[11px] font-medium text-white/65 uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <input
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                style={darkInputStyle}
                className="w-full h-12 px-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-elec-yellow/15 focus:border-elec-yellow transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 py-3">
              <div>
                <label className="text-[11px] font-medium text-white/65 uppercase tracking-wider block mb-1.5">
                  Quantity
                </label>
                <InlineDecimalInput
                  value={newItem.quantity}
                  onChange={(quantity) => setNewItem((prev) => ({ ...prev, quantity }))}
                  style={darkInputStyle}
                  className="w-full h-12 px-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] text-base text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/15 focus:border-elec-yellow transition-colors"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-white/65 uppercase tracking-wider block mb-1.5">
                  Unit price (£)
                </label>
                <InlineDecimalInput
                  value={newItem.unitPrice}
                  onChange={(unitPrice) => setNewItem((prev) => ({ ...prev, unitPrice }))}
                  style={darkInputStyle}
                  className="w-full h-12 px-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] text-base text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/15 focus:border-elec-yellow transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>
            {/* ELE-889 — Unit type selector. Common UK trade units + custom. */}
            <div className="pt-1">
              <label className="text-[11px] font-medium text-white/65 uppercase tracking-wider block mb-1.5">
                Unit
              </label>
              <Select
                value={
                  UNIT_PRESETS.includes(newItem.unit as (typeof UNIT_PRESETS)[number])
                    ? newItem.unit
                    : 'custom'
                }
                onValueChange={(val) => {
                  if (val === 'custom') {
                    setNewItem((prev) => ({
                      ...prev,
                      unit:
                        UNIT_PRESETS.includes(prev.unit as (typeof UNIT_PRESETS)[number]) || !prev.unit
                          ? ''
                          : prev.unit,
                    }));
                  } else {
                    setNewItem((prev) => ({ ...prev, unit: val }));
                  }
                }}
              >
                <SelectTrigger className="h-12 px-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] text-base text-white focus:ring-2 focus:ring-elec-yellow/15">
                  <SelectValue placeholder="Choose unit" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-white">
                  <SelectItem value="hour">per hour</SelectItem>
                  <SelectItem value="day">per day</SelectItem>
                  <SelectItem value="half-day">per half-day</SelectItem>
                  <SelectItem value="each">each</SelectItem>
                  <SelectItem value="item">per item</SelectItem>
                  <SelectItem value="m">per metre</SelectItem>
                  <SelectItem value="m²">per m²</SelectItem>
                  <SelectItem value="kit">per kit</SelectItem>
                  <SelectItem value="callout">per callout</SelectItem>
                  <SelectItem value="visit">per visit</SelectItem>
                  <SelectItem value="custom">Custom…</SelectItem>
                </SelectContent>
              </Select>
              {!UNIT_PRESETS.includes(newItem.unit as (typeof UNIT_PRESETS)[number]) && (
                <input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  placeholder="e.g. per circuit, per spur"
                  style={darkInputStyle}
                  className="w-full h-12 px-3.5 mt-2 rounded-xl bg-white/[0.05] border border-white/[0.10] text-base text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/15 focus:border-elec-yellow placeholder:text-white/40 transition-colors"
                />
              )}
            </div>
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="mt-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.10]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-white">Line Total</span>
                  <span className="text-[18px] font-bold text-elec-yellow tabular-nums">
                    {formatCurrency(newItem.quantity * newItem.unitPrice)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleAddItem}
            className="w-full h-12 bg-elec-yellow text-black text-[15px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            Add to Invoice
          </Button>
        </div>
      )}

      {/* Price Book — stock-aware, take-off-linked */}
      {activeAddMethod === 'pricebook' && (
        <div className="space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search your price book…"
              value={priceBookSearch}
              onChange={(e) => setPriceBookSearch(e.target.value)}
              style={darkInputStyle}
              className="w-full h-12 pl-10 pr-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 transition-colors"
            />
          </div>
          {pricedBookItems.length === 0 ? (
            <div className={cn(PANEL, 'text-center py-6 px-4')}>
              <p className="text-[13px] text-white/60">
                {priceBookSearch ? 'No matching items' : 'No priced items in your materials lists yet.'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] text-white/50">
                Stock-linked items show live levels and deduct automatically when the invoice is saved.
              </p>
              <div className="max-h-[420px] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {pricedBookItems.map((pb) => {
                  const stock = pb.item.personal_inventory_id
                    ? stockById.get(pb.item.personal_inventory_id)
                    : null;
                  const low =
                    stock &&
                    stock.low_stock_threshold != null &&
                    stock.quantity <= stock.low_stock_threshold;
                  return (
                    <button
                      key={`pb-${pb.item.id}`}
                      type="button"
                      onClick={() => {
                        // estimated_price is ALREADY the sell price (ELE-1010) — use directly.
                        const sellPrice = pb.item.estimated_price || 0;
                        onAddItem({
                          description: pb.item.name,
                          quantity: pb.item.quantity || 1,
                          unit: pb.item.unit || 'each',
                          unitPrice: Math.round(sellPrice * 100) / 100,
                          category: 'materials',
                          // Stock link — saving the invoice runs the take-off (ELE-1014).
                          inventoryItemId: pb.item.personal_inventory_id,
                          notes: pb.item.supplier ? `Supplier: ${pb.item.supplier}` : undefined,
                        } as any);
                        toast({ title: 'Added to invoice', description: pb.item.name });
                      }}
                      className="flex flex-col text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.08] transition-all touch-manipulation active:scale-[0.98] select-none"
                    >
                      <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                        {pb.item.name}
                      </p>
                      <p className="font-bold text-[16px] text-elec-yellow tabular-nums mt-1.5">
                        £{pb.item.estimated_price?.toFixed(2)}
                        <span className="text-[11px] font-medium text-white/55 ml-1">/{pb.item.unit || 'each'}</span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {stock && (
                          <span
                            className={cn(
                              'px-1.5 py-0.5 rounded text-[10px] font-medium border',
                              low
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            )}
                          >
                            {stock.quantity} in stock
                          </span>
                        )}
                        {pb.item.supplier && (
                          <span className="text-[10px] text-white/55 truncate">{pb.item.supplier}</span>
                        )}
                        <span className="text-[10px] text-white/40 ml-auto truncate">{pb.listName}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Rate Card — the user's charge-out rates */}
      {activeAddMethod === 'ratecard' && (
        <div className="space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search your rates…"
              value={rateCardSearch}
              onChange={(e) => setRateCardSearch(e.target.value)}
              style={darkInputStyle}
              className="w-full h-12 pl-10 pr-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 transition-colors"
            />
          </div>
          <div className="max-h-[420px] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {rateCardItems
              .filter(
                (item) =>
                  !rateCardSearch.trim() ||
                  item.name.toLowerCase().includes(rateCardSearch.toLowerCase())
              )
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    // Rate-card prices are charge-out rates — add as shown (ELE-1010).
                    onAddItem({
                      description: item.name,
                      quantity: 1,
                      unit: item.unit,
                      unitPrice: item.unit_price,
                      category:
                        item.category === 'labour' || item.category === 'call-out'
                          ? 'labour'
                          : item.category === 'materials'
                            ? 'materials'
                            : 'equipment',
                      notes: item.description || undefined,
                    } as any);
                    toast({ title: 'Added to invoice', description: item.name });
                  }}
                  className="flex flex-col text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.08] transition-all touch-manipulation active:scale-[0.98] select-none"
                >
                  <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                    {item.name}
                  </p>
                  <p className="font-bold text-[16px] text-elec-yellow tabular-nums mt-1.5">
                    £{Number(item.unit_price).toFixed(2)}
                    <span className="text-[11px] font-medium text-white/55 ml-1">/{item.unit}</span>
                  </p>
                  <span className="text-[10px] text-white/55 capitalize mt-2">{item.category}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Templates */}
      {activeAddMethod === 'templates' && <JobTemplates onSelectTemplate={handleTemplateSelect} />}

      {/* Scan Invoice */}
      {activeAddMethod === 'scan' && (
        <div className={cn(PANEL, 'p-4 space-y-3')}>
          <div>
            <p className="text-[14px] font-semibold text-white">Scan a supplier invoice</p>
            <p className="text-[12px] text-white/60 mt-0.5">
              Photograph or upload an invoice — materials and prices import automatically
            </p>
          </div>

          <Button
            onClick={() => setScannerSheetOpen(true)}
            className="w-full h-12 bg-elec-yellow text-black text-[15px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation rounded-xl"
          >
            <ScanLine className="h-4 w-4 mr-2" />
            Scan invoice
          </Button>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Screwfix', 'Toolstation', 'CEF', 'Edmundson', 'Rexel', 'Others'].map((supplier) => (
              <span
                key={supplier}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/70"
              >
                {supplier}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {originalItems.length === 0 && additionalItems.length === 0 && (
        <div className={cn(PANEL, 'text-center py-8 px-4')}>
          <p className="text-[15px] font-semibold text-white mb-1">No items yet</p>
          <p className="text-[13px] text-white/60 mb-4">
            Add labour, materials or equipment using the tiles above
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setActiveAddMethod('quick')}
              className="px-4 h-11 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black touch-manipulation active:scale-[0.97] transition-all"
            >
              Quick add
            </button>
            <button
              onClick={() => setActiveAddMethod('templates')}
              className="px-4 h-11 rounded-xl text-[13px] font-medium bg-white/[0.05] text-white border border-white/[0.10] touch-manipulation active:scale-[0.97] transition-all"
            >
              Use a template
            </button>
          </div>
        </div>
      )}

      {/* Additional Items */}
      {additionalItems.length > 0 && (
        <div>
          <p className="flex items-baseline gap-2 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">02</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· Added on site ({additionalItems.length})</span>
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
                      type="button"
                      onClick={() =>
                        setAdjustingItemId(adjustingItemId === item.id ? null : item.id)
                      }
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center touch-manipulation active:scale-95',
                        adjustingItemId === item.id ||
                          (typeof item.itemAdjustmentPercent === 'number' &&
                            item.itemAdjustmentPercent !== 0)
                          ? 'bg-elec-yellow/20'
                          : 'bg-white/[0.08]'
                      )}
                      aria-label="Per-item adjustment"
                    >
                      <Percent
                        className={cn(
                          'h-4 w-4',
                          typeof item.itemAdjustmentPercent === 'number' &&
                            item.itemAdjustmentPercent !== 0
                            ? 'text-elec-yellow'
                            : 'text-white'
                        )}
                      />
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
                {typeof item.itemAdjustmentPercent === 'number' &&
                  item.itemAdjustmentPercent !== 0 &&
                  adjustingItemId !== item.id && (
                    <div className="mb-2 flex items-center gap-1.5 text-[11px]">
                      <span
                        className={cn(
                          'px-1.5 py-0.5 rounded font-semibold tabular-nums',
                          item.itemAdjustmentPercent > 0
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-300'
                        )}
                      >
                        {item.itemAdjustmentPercent > 0 ? '+' : ''}
                        {item.itemAdjustmentPercent}%
                      </span>
                      {item.itemAdjustmentLabel && (
                        <span className="text-white/60">{item.itemAdjustmentLabel}</span>
                      )}
                    </div>
                  )}
                {adjustingItemId === item.id && (
                  <div className="mb-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      autoFocus
                      placeholder="± %"
                      value={item.itemAdjustmentPercent ?? ''}
                      onChange={(e) => {
                        const v = e.target.value;
                        onUpdateItem(item.id, {
                          itemAdjustmentPercent: v === '' ? undefined : parseFloat(v),
                        });
                      }}
                      className="w-20 h-8 px-2 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                    />
                    <input
                      type="text"
                      placeholder="Reason"
                      value={item.itemAdjustmentLabel ?? ''}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          itemAdjustmentLabel: e.target.value || undefined,
                        })
                      }
                      className="flex-1 h-8 px-2 text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation placeholder:text-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => setAdjustingItemId(null)}
                      className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center"
                      aria-label="Done"
                    >
                      <Check className="h-3.5 w-3.5 text-elec-yellow" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <InlineDecimalInput
                    value={item.quantity}
                    onChange={(quantity) => onUpdateItem(item.id, { quantity })}
                    style={darkInputStyle}
                    className="h-8 w-16 px-2 py-0 text-[13px] text-white bg-white/[0.06] border border-white/[0.12] rounded-lg caret-white focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                  />
                  <span className="text-[12px] text-white">×</span>
                  <InlineDecimalInput
                    value={item.unitPrice}
                    onChange={(unitPrice) => onUpdateItem(item.id, { unitPrice })}
                    style={darkInputStyle}
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">Worker type</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(70vh-60px)]">
            {workerTypes.map((worker) => {
              const isSelected = newItem.workerType === worker.id;
              return (
                <button
                  key={worker.id}
                  onClick={() => handleWorkerTypeChange(worker.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors',
                    isSelected && 'bg-elec-yellow/[0.06]'
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">{worker.name}</p>
                    <p className="text-[12px] text-white/60">{worker.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-white">
                      £{workerRateForMode(worker.defaultHourlyRate)}{isDayMode ? '/day' : '/hr'}
                    </span>
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">{isDayMode ? 'Days on site' : 'Hours on site'}</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-4">
            {/* Custom hours/days input */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-white block">
                {isDayMode ? 'Enter days (decimals allowed, e.g. 0.5)' : 'Enter hours (decimals allowed, e.g. 3.5)'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={isDayMode ? '0.5' : '3.5'}
                  style={darkInputStyle}
                  className="flex-1 h-12 px-4 rounded-xl bg-white/[0.08] border border-elec-yellow/40 text-[17px] font-medium text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/30 caret-elec-yellow"
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
                <span className="text-[13px] font-medium text-white">{isDayMode ? 'days' : 'hours'}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.12]" />
              <span className="text-[11px] text-white uppercase tracking-wide">
                or pick a common value
              </span>
              <div className="flex-1 h-px bg-white/[0.12]" />
            </div>

            {/* Preset hour buttons */}
            <div className="grid grid-cols-3 gap-2">
              {(isDayMode ? dayOptions : hourOptions).map((h) => {
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
                    <p className="text-[11px] opacity-70">{isDayMode ? (h === 1 ? 'day' : 'days') : h === 1 ? 'hour' : 'hours'}</p>
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">Category</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(60vh-60px)]">
            <button
              onClick={() => {
                setNewItem((prev) => ({ ...prev, subcategory: '', materialCode: '' }));
                setCategorySheetOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation transition-colors',
                !newItem.subcategory && 'bg-elec-yellow/[0.06]'
              )}
            >
              <span className="text-[16px] font-medium text-white">All Categories</span>
              {!newItem.subcategory && <Check className="h-5 w-5 text-elec-yellow" />}
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
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation transition-colors',
                    isSelected && 'bg-elec-yellow/[0.06]'
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">Material</SheetTitle>
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
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors',
                    isSelected && 'bg-elec-yellow/[0.06]'
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">{material.name}</p>
                    <p className="text-[12px] text-white/60">{material.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-white">£{price.toFixed(2)}</span>
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">Category</SheetTitle>
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
                    'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation transition-colors',
                    isSelected && 'bg-elec-yellow/[0.06]'
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
          <SheetHeader className="p-4 border-b border-white/[0.08]">
            <SheetTitle className="text-white text-left">Equipment</SheetTitle>
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
                      'w-full flex items-center justify-between p-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors',
                      isSelected && 'bg-elec-yellow/[0.06]'
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
