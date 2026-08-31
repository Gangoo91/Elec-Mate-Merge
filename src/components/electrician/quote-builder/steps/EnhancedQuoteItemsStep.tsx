import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DecimalInput } from '@/components/ui/decimal-input';
import { Textarea } from '@/components/ui/textarea';
import { AutoGrowTextarea } from '@/components/ui/auto-grow-textarea';
import { materialQueryMatches, expandMaterialQuery, rankMaterialMatches } from '@/data/materialSynonyms';
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
  Percent,
  BookOpen,
  PoundSterling,
  Boxes,
  LayoutTemplate,
  ScanLine,
  Loader2,
  Zap,
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

// ELE-889 — common UK trade units. Anything outside this list is treated as
// a "custom" unit and rendered through a free-text input. Kept in declaration
// order so the Select dropdown matches.

// Supplier feeds arrive ALL-CAPS — title-case for readability, preserving
// trade acronyms and anything with digits (13A, 2.5mm², GU10, CAT6…).
const PRODUCT_ACRONYMS = new Set([
  'TV', 'FM', 'DAB', 'USB', 'LED', 'RCD', 'RCBO', 'MCB', 'MCCB', 'SPD', 'AFDD',
  'SP', 'DP', 'TP', 'TPN', 'AC', 'DC', 'PVC', 'XLPE', 'SWA', 'LSF', 'IP', 'UK',
  'CCTV', 'PIR', 'RJ45', 'HDMI', 'POE', 'EV', 'PME', 'BS', 'BG', 'MK', 'CEF',
]);
function titleCaseProduct(name: string): string {
  if (!name || name !== name.toUpperCase()) return name; // only fix all-caps feeds
  return name
    .split(/\s+/)
    .map((w) => {
      const bare = w.replace(/[^A-Za-z0-9]/g, '');
      if (/\d/.test(w)) return w; // sizes/ratings stay as-is (13A, 2G, GU10)
      if (PRODUCT_ACRONYMS.has(bare.toUpperCase())) return w.toUpperCase();
      if (w.length <= 2) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
}

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
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { labourLinesFor, labourAllocations, describeLabour, describeLines, shortGradeLabel, rateForGrade, DEFAULT_LABOUR_GRADE } from '@/utils/labourGrades';
import { useMaterialsLists, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { useSaveToPriceBook } from '@/hooks/useSaveToPriceBook';
import { usePriceBookBundles } from '@/hooks/usePriceBookBundles';
import { usePriceList } from '@/hooks/usePriceList';
import { useInvoiceScanner } from '@/hooks/useInvoiceScanner';
import { useMaterialsAutocomplete } from '@/hooks/useMaterialsAutocomplete';
import { InvoiceScannerSheet } from '@/components/electrician/invoice-builder/InvoiceScannerSheet';
import { InvoiceScanResults } from '@/components/electrician/invoice-builder/InvoiceScanResults';
import { chipBase, chipOn, chipOff, inputCn, labelCn, textareaCn, cardCn } from '@/components/forms/fieldStyles';

interface EnhancedQuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  /** ELE-1548 — reorder a line. Optional so any other host of this step keeps working. */
  onMove?: (itemId: string, direction: 'up' | 'down') => void;
  priceAdjustment?: number;
  setPriceAdjustment?: (adjustment: number) => void;
  calculateAdjustedPrice?: (basePrice: number) => number;
  /** Personal inventory, fetched once by the wizard — avoids a duplicate full fetch + realtime channel here. */
  stockItems?: { id: string; quantity: number; low_stock_threshold?: number | null }[];
}

export const EnhancedQuoteItemsStep = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
  priceAdjustment = 0,
  setPriceAdjustment,
  calculateAdjustedPrice,
  stockItems = [],
}: EnhancedQuoteItemsStepProps) => {
  // Get user's company profile for custom worker rates
  const { companyProfile } = useCompanyProfile();

  // Rate a price-book item's labour allowance is costed at (ELE-1470). Same
  // source as the preview shown in the Price Book, so the two always agree.
  // Kept for the display chip only. The actual cost now comes from the item's
  // own grade via rateForGrade (ELE-1445) — a 0.5h apprentice task must not be
  // costed at the electrician rate just because that is the headline one.
  const priceBookHourlyRate = companyProfile?.hourly_rate ?? 0;
  // Memoised: a fresh object each render re-ran every memo that depends on it,
  // which with 1,200+ items meant recomputing the whole book on every keystroke.
  const rateSources = useMemo(
    () => ({
      workerRates: companyProfile?.worker_rates,
      hourlyRate: companyProfile?.hourly_rate,
    }),
    [companyProfile?.worker_rates, companyProfile?.hourly_rate]
  );

  // Price Book data
  const { lists: materialsLists } = useMaterialsLists();
  // Live stock for price-book items linked to a `personal_inventory` row (ELE-1014).
  const stockById = useMemo(() => new Map(stockItems.map((s) => [s.id, s])), [stockItems]);
  const [priceBookSearch, setPriceBookSearch] = useState('');
  const [showPriceBook, setShowPriceBook] = useState(false);

  // Bundles
  const { bundles, bundleTotal } = usePriceBookBundles();
  const [showBundles, setShowBundles] = useState(false);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  // Inline item description editing
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');
  // ELE-888 — per-item adjustment editor toggle
  const [adjustingItemId, setAdjustingItemId] = useState<string | null>(null);

  // Rate card
  const { items: rateCardItems } = usePriceList();
  const [showRateCard, setShowRateCard] = useState(false);
  const [rateCardSearch, setRateCardSearch] = useState('');

  // Price book capture — shared with the invoice wizard so the two cannot
  // drift on what "already saved" means.
  const {
    save: saveToPriceBook,
    saving: savingToPriceBook,
    isInPriceBook,
    unsavedItems: unsavedPriceBookItems,
  } = useSaveToPriceBook(items);
  const [savingItemId, setSavingItemId] = useState<string | null>(null);

  const handleSaveToPriceBook = async (item: QuoteItem) => {
    setSavingItemId(item.id);
    try {
      await saveToPriceBook([item]);
    } finally {
      setSavingItemId(null);
    }
  };

  const pricedBookItems = useMemo(() => {
    const result: { item: MaterialsListItem; listName: string }[] = [];
    for (const list of materialsLists) {
      for (const item of list.items) {
        // Price OR labour: a labour-book item carries hours and no price, and
        // gating on price alone hid every one of them from the very wizard
        // where the times are meant to be used.
        if (
          (item.estimated_price != null && item.estimated_price > 0) ||
          labourAllocations(item).length > 0
        ) {
          result.push({ item, listName: list.name });
        }
      }
    }
    if (priceBookSearch.trim()) {
      // ELE-1393 — match trade phrases ("2 gang socket" → "double socket").
      return rankMaterialMatches(result, priceBookSearch, (p) => p.item.name);
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
  // Per-worker day rate keeps the same ratio to the electrician as the hourly rate does.
  const workerRateForMode = (defaultHourlyRate: number) =>
    isDayMode ? Math.round(baseDayRate * (defaultHourlyRate / baseHourlyRate)) : defaultHourlyRate;

  const [customCategory, setCustomCategory] = useState<
    'manual' | 'materials' | 'labour' | 'equipment'
  >('manual');
  const [materialSearch, setMaterialSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ragResults, setRagResults] = useState<any[]>([]);
  const [recentMaterials, setRecentMaterials] = useState<
    { description: string; unitPrice: number; unit: string }[]
  >([]);
  const [isSearchingRAG, setIsSearchingRAG] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  // String states for decimal input — prevents parseFloat stripping trailing dot
  const [quantityInput, setQuantityInput] = useState('1');
  const [unitPriceInput, setUnitPriceInput] = useState('');
  const debouncedSearch = useDebounce(materialSearch, 500);
  const { suggestions: typeahead, clearSuggestions } = useMaterialsAutocomplete(materialSearch, {
    minChars: 2,
    maxSuggestions: 6,
  });

  // Invoice Scanner State
  const [scannerSheetOpen, setScannerSheetOpen] = useState(false);
  const [scanResultsOpen, setScanResultsOpen] = useState(false);
  const scanner = useInvoiceScanner();

  /*
   * Templates carry a hardcoded labour price — £50/hr on most of them, with a
   * few at £55/£60/£65. That is somebody else's rate. Labour is costed per user
   * from `company_profiles.worker_rates` (ELE-1445), so applying a template used
   * to silently overwrite the electrician's own rate: anyone charging £75/hr
   * quoted a third under on every templated labour line.
   *
   * The template's HOURS are kept — that is the estimating knowledge it holds.
   * Only the rate is re-resolved. `rateForGrade` returns 0 when the user has
   * saved nothing rather than invent a number, and in that case the template's
   * own figure is a better answer than zero.
   *
   * Fixed-price labour lines (`unit: 'each'` — a call-out or a test fee) are
   * left alone: they are a price, not an hourly rate.
   */
  const handleTemplateSelect = (template: JobTemplate) => {
    const ownRate = rateForGrade(DEFAULT_LABOUR_GRADE, rateSources);
    template.items.forEach((item) => {
      const isHourlyLabour = item.category === 'labour' && item.unit === 'hours';
      if (isHourlyLabour && ownRate > 0) {
        onAdd({ ...item, unitPrice: ownRate, hourlyRate: ownRate, hours: item.quantity });
      } else {
        onAdd(item);
      }
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
      unit:
        category === 'labour'
          ? isDayMode
            ? 'day'
            : 'hour'
          : category === 'manual'
            ? 'item'
            : 'each',
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
  };

  // ELE-1021 — flip labour pricing between hourly and day rate; remember the
  // choice for the session and re-price the in-progress line to the new mode.
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
      unit: isDayMode ? (hours === 1 ? 'day' : 'days') : 'hour',
    }));
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.unitPrice > 0) {
      // ELE-887 — apply material markup to manually-entered items.
      // Markup is for materials and equipment only — labour uses its own hourlyRate
      // and manual/custom items shouldn't be silently uplifted by a materials-scoped markup.
      const shouldApplyMarkup =
        (newItem.category === 'materials' || newItem.category === 'equipment') &&
        !!calculateAdjustedPrice;
      const finalUnitPrice = shouldApplyMarkup
        ? calculateAdjustedPrice!(newItem.unitPrice)
        : newItem.unitPrice;
      const itemToAdd = {
        ...newItem,
        unitPrice: finalUnitPrice,
        // When using Custom tab, override category with the user's chosen "Appears Under" value
        category: newItem.category === 'manual' ? customCategory : newItem.category,
        quantity:
          newItem.category === 'labour' && newItem.hours > 0 ? newItem.hours : newItem.quantity,
        unit: newItem.unit,
      };
      onAdd(itemToAdd);

      // Keep customCategory so next manual item defaults to same category

      setNewItem((prev) => ({
        description: '',
        quantity: 1,
        unit:
          prev.category === 'labour'
            ? isDayMode
              ? 'day'
              : 'hour'
            : prev.category === 'manual'
              ? 'item'
              : 'each',
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
      // ELE-1393 — trade-phrase aware name match; keep category/code matches.
      filtered = filtered.filter(
        (material) =>
          materialQueryMatches(material.name, materialSearch) ||
          material.category.toLowerCase().includes(searchTerm) ||
          material.subcategory.toLowerCase().includes(searchTerm) ||
          (material.code && material.code.toLowerCase().includes(searchTerm))
      );
    }
    return filtered;
  }, [materialSearch, newItem.subcategory]);

  // Recently used materials — the user's last quotes, deduped.
  // Fetched lazily the first time the Materials tab opens (this step stays
  // mounted from wizard step 0, so an on-mount fetch would run on every
  // wizard open whether or not materials are ever touched).
  const recentsFetchedRef = useRef(false);
  useEffect(() => {
    if (newItem.category !== 'materials' || recentsFetchedRef.current) return;
    recentsFetchedRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) return;
        const { data } = await supabase
          .from('quotes')
          .select('items')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(20);
        if (cancelled || !data) return;
        const seen = new Set<string>();
        const recents: { description: string; unitPrice: number; unit: string }[] = [];
        for (const row of data) {
          const rowItems = typeof row.items === 'string' ? JSON.parse(row.items) : row.items;
          if (!Array.isArray(rowItems)) continue;
          for (const it of rowItems) {
            if (it?.category !== 'materials' || !it?.description) continue;
            const key = it.description.toLowerCase().trim();
            if (seen.has(key)) continue;
            seen.add(key);
            recents.push({
              description: it.description,
              unitPrice: it.unitPrice || 0,
              unit: it.unit || 'each',
            });
            if (recents.length >= 8) break;
          }
          if (recents.length >= 8) break;
        }
        setRecentMaterials(recents);
      } catch {
        /* non-fatal — recents are a convenience */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [newItem.category]);

  // RAG search effect
  useEffect(() => {
    const performRAGSearch = async () => {
      if (debouncedSearch.trim().length >= 3) {
        setIsSearchingRAG(true);
        try {
          const { data, error } = await supabase.functions.invoke('search-materials-fast', {
            body: {
              query: debouncedSearch,
              // ELE-1393 — trade-phrase synonyms ("2 gang socket" → "double socket").
              expansions: expandMaterialQuery(debouncedSearch),
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

  // ELE-1021 — day-rate quick picks (used when labour is in day mode).
  const dayOptions = [
    { value: '0.5', label: '½ day' },
    { value: '1', label: '1 day' },
    { value: '1.5', label: '1.5 days' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '5', label: '5 days' },
    { value: '10', label: '10 days' },
  ];

  const markupOptions = [
    { value: '0', label: 'No markup (0%)' },
    { value: '10', label: '10% markup' },
    { value: '15', label: '15% markup' },
    { value: '20', label: '20% markup' },
  ];

  return (
    <section className={cardCn}>
      {/* === ADD FROM — sources === */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">Add from</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <button
            type="button"
            onClick={() => { const v = !showPriceBook; setShowPriceBook(v); setShowRateCard(false); setShowBundles(false); setShowTemplates(false); }}
            className={cn(
              'flex min-h-[76px] flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all touch-manipulation active:scale-[0.98] select-none',
              showPriceBook ? 'bg-white/[0.08] border-elec-yellow/60' : 'bg-white/[0.04] border-white/[0.08]'
            )}
          >
            <BookOpen className={cn('h-4 w-4', showPriceBook ? 'text-elec-yellow' : 'text-white')} />
            <span>
              <span className="block text-[12px] font-semibold text-white leading-tight">Price book</span>
              <span className="block text-[10px] text-white mt-0.5">{pricedBookItems.length} priced items</span>
            </span>
          </button>

          {rateCardItems.length > 0 && (
            <button
              type="button"
              onClick={() => { const v = !showRateCard; setShowRateCard(v); setShowPriceBook(false); setShowBundles(false); setShowTemplates(false); }}
              className={cn(
                'flex min-h-[76px] flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all touch-manipulation active:scale-[0.98] select-none',
                showRateCard ? 'bg-white/[0.08] border-elec-yellow/60' : 'bg-white/[0.04] border-white/[0.08]'
              )}
            >
              <PoundSterling className={cn('h-4 w-4', showRateCard ? 'text-elec-yellow' : 'text-white')} />
              <span>
                <span className="block text-[12px] font-semibold text-white leading-tight">Rate card</span>
                <span className="block text-[10px] text-white mt-0.5">{rateCardItems.length} rates</span>
              </span>
            </button>
          )}

          {bundles.length > 0 && (
            <button
              type="button"
              onClick={() => { const v = !showBundles; setShowBundles(v); setShowPriceBook(false); setShowRateCard(false); setShowTemplates(false); }}
              className={cn(
                'flex min-h-[76px] flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all touch-manipulation active:scale-[0.98] select-none',
                showBundles ? 'bg-white/[0.08] border-elec-yellow/60' : 'bg-white/[0.04] border-white/[0.08]'
              )}
            >
              <Boxes className={cn('h-4 w-4', showBundles ? 'text-elec-yellow' : 'text-white')} />
              <span>
                <span className="block text-[12px] font-semibold text-white leading-tight">Bundles</span>
                <span className="block text-[10px] text-white mt-0.5">{bundles.length} assemblies</span>
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => { const v = !showTemplates; setShowTemplates(v); setShowPriceBook(false); setShowRateCard(false); setShowBundles(false); }}
            className={cn(
              'flex min-h-[76px] flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all touch-manipulation active:scale-[0.98] select-none',
              showTemplates ? 'bg-white/[0.08] border-elec-yellow/60' : 'bg-white/[0.04] border-white/[0.08]'
            )}
          >
            <LayoutTemplate className={cn('h-4 w-4', showTemplates ? 'text-elec-yellow' : 'text-white')} />
            <span>
              <span className="block text-[12px] font-semibold text-white leading-tight">Templates</span>
              <span className="block text-[10px] text-white mt-0.5">Pre-built item sets</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setScannerSheetOpen(true)}
            className="flex flex-col items-start gap-1.5 p-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-left touch-manipulation active:scale-[0.98] transition-all select-none"
          >
            <ScanLine className="h-4 w-4 text-white" />
            <span>
              <span className="block text-[12px] font-semibold text-white leading-tight">Scan invoice</span>
              <span className="block text-[10px] text-white mt-0.5">Pull items from a photo</span>
            </span>
          </button>
        </div>
      </div>

      {/* Job Templates */}
      {showTemplates && (
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
      {showPriceBook && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
            <h3 className="font-semibold text-white">My price book</h3>
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
                autoFocus
                placeholder="Search price book…"
                value={priceBookSearch}
                onChange={(e) => setPriceBookSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
              />
            </div>
            {pricedBookItems.length === 0 ? (
              <p className="text-sm text-white text-center py-6">
                {priceBookSearch ? 'No matching items' : 'No priced items in your lists yet.'}
              </p>
            ) : (
              <div className="max-h-[420px] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {pricedBookItems.map((p) => (
                  <button
                    key={`pb-${p.item.id}`}
                    type="button"
                    onClick={() => {
                      // estimated_price is ALREADY the sell price (PriceBook saves
                      // it as calcSellPrice(cost, markup) and shows it as the price
                      // here). Running calcSellPrice on it again applied markup a
                      // second time — the price-book item quoted higher than shown.
                      // Use it directly. (ELE-1010)
                      const sellPrice = p.item.estimated_price || 0;
                      const qty = p.item.quantity || 1;
                      onAdd({
                        description: p.item.name,
                        quantity: qty,
                        unit: p.item.unit || 'each',
                        unitPrice: Math.round(sellPrice * 100) / 100,
                        category: 'materials',
                        // Stamp the stock link so raising the invoice decrements it. (ELE-1014)
                        inventoryItemId: p.item.personal_inventory_id,
                        notes: p.item.supplier ? `Supplier: ${p.item.supplier}` : undefined,
                      });

                      // Spons-style time guide: the item's labour allowance becomes
                      // its own labour line, costed at the hourly rate (ELE-1470).
                      // A separate line rather than folding it into the material
                      // price so the quote still shows what is material and what is
                      // labour, and the labour category adjustment still applies.
                      // One line PER GRADE — a two-man task shows the
                      // electrician and the apprentice separately, which is
                      // what both the estimator and the customer need to see.
                      const labour = labourLinesFor(p.item, qty, rateSources);
                      const addedLabour = labour.lines.length > 0;
                      for (const line of labour.lines) {
                        onAdd({
                          description: `Labour — ${p.item.name} (${shortGradeLabel(line.grade)})`,
                          quantity: line.hours,
                          unit: 'hour',
                          unitPrice: line.rate,
                          category: 'labour',
                          hours: line.hours,
                          hourlyRate: line.rate,
                        });
                      }

                      toast({
                        title: 'Added to quote',
                        description: addedLabour
                          ? `${p.item.name} + ${describeLines(labour.lines)}`
                          : p.item.name,
                      });
                    }}
                    className="flex flex-col text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.08] transition-all touch-manipulation active:scale-[0.98] select-none"
                  >
                    <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                      {p.item.name}
                    </p>
                    <p className="font-bold text-[16px] text-elec-yellow tabular-nums mt-1.5">
                      £{p.item.estimated_price?.toFixed(2)}
                      <span className="text-[11px] font-medium text-white ml-1">/{p.item.unit || 'each'}</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {(() => {
                        const stock = p.item.personal_inventory_id ? stockById.get(p.item.personal_inventory_id) : null;
                        if (!stock) return null;
                        const low = stock.low_stock_threshold != null && stock.quantity <= stock.low_stock_threshold;
                        return (
                          <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium border', low ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')}>
                            {stock.quantity} in stock
                          </span>
                        );
                      })()}
                      {labourAllocations(p.item).length > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium border bg-blue-500/10 text-blue-300 border-blue-500/20">
                          +{describeLabour(labourAllocations(p.item))}
                        </span>
                      )}
                      {p.item.supplier && (
                        <span className="text-[10px] text-white truncate">{p.item.supplier}</span>
                      )}
                      <span className="text-[10px] text-white ml-auto truncate">{p.listName}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rate Card Section */}
      {rateCardItems.length > 0 && showRateCard && (
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
                  className="w-full h-11 pl-10 pr-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                />
              </div>
              <div className="max-h-[420px] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {rateCardItems
                  .filter(item =>
                    !rateCardSearch.trim() ||
                    materialQueryMatches(item.name, rateCardSearch)
                  )
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        // Rate-card prices are the user's charge-out rates — exactly
                        // what the picker shows (£{item.unit_price}). Don't re-apply
                        // global markup on add or materials quote higher than shown. (ELE-1010)
                        onAdd({
                          description: item.name,
                          quantity: 1,
                          unit: item.unit,
                          unitPrice: item.unit_price,
                          category: item.category === 'labour' || item.category === 'call-out'
                            ? 'labour'
                            : item.category === 'materials'
                              ? 'materials'
                              : 'manual',
                          notes: item.description || undefined,
                        });
                        toast({ title: 'Added to quote', description: item.name });
                      }}
                      className="flex flex-col text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.08] transition-all touch-manipulation active:scale-[0.98] select-none"
                    >
                      <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">{item.name}</p>
                      <p className="font-bold text-[16px] text-elec-yellow tabular-nums mt-1.5">
                        £{item.unit_price.toFixed(2)}
                        <span className="text-[11px] font-medium text-white ml-1">/{item.unit}</span>
                      </p>
                      {item.description && (
                        <p className="text-[10px] text-white line-clamp-1 mt-2">{item.description}</p>
                      )}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
      )}

      {/* Bundles Section */}
      {bundles.length > 0 && showBundles && (
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
                              // Bundle unitPrice is already the sell price — it's what
                              // the bundle total and expanded rows display. Re-applying
                              // markup quoted bundle materials above the shown total.
                              // Use it directly. (ELE-1010)
                              onAdd({
                                description: item.name,
                                quantity: item.quantity,
                                unit: item.unit,
                                unitPrice: item.unitPrice,
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
                          className="w-full py-2.5 text-[13px] font-semibold text-black bg-elec-yellow rounded-lg touch-manipulation active:brightness-110"
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
      )}


      {/* === OR BUILD MANUALLY === */}
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white pt-2">Add manually</p>

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
                  cn(chipBase, 'px-3.5'),
                  priceAdjustment === markup
                    ? chipOn
                    : chipOff
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
                cn(chipBase, 'flex-1'),
                isActive
                  ? chipOn
                  : chipOff
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
            {/* ELE-1021 — Hourly / Day rate mode toggle */}
            <div className="grid grid-cols-2 gap-1.5">
              {(['hour', 'day'] as const).map((mode) => {
                const active = labourRateMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleLabourRateModeChange(mode)}
                    className={cn(
                      chipBase,
                      active
                        ? chipOn
                        : chipOff
                    )}
                  >
                    {mode === 'hour' ? 'Hourly rate' : 'Day rate'}
                  </button>
                );
              })}
            </div>

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
                          ? chipOn
                          : chipOff
                      )}
                    >
                      <span className={cn('text-[13px] font-medium', isSelected ? 'text-black' : 'text-white')}>{w.name}</span>
                      <span className={cn('text-[12px] font-semibold', isSelected ? 'text-black/70' : 'text-white')}>£{workerRateForMode(w.defaultHourlyRate)}{isDayMode ? '/day' : '/hr'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-white block">{isDayMode ? 'Days (decimals allowed, e.g. 0.5)' : 'Hours (decimals allowed, e.g. 3.5)'}</label>
              <div className="flex items-center gap-2">
                <DecimalInput
                  placeholder={isDayMode ? '0.5' : '3.5'}
                  value={newItem.hours}
                  onChange={handleHoursChange}
                  className="flex-1 h-12 px-4 rounded-xl bg-white/[0.08] border border-elec-yellow/40 text-[17px] font-medium text-white placeholder:text-white/25 touch-manipulation focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/30 caret-elec-yellow"
                />
                <span className="text-[13px] font-medium text-white">{isDayMode ? 'days' : 'hours'}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.12]" />
                <span className="text-[11px] text-white uppercase tracking-wide">or quick pick</span>
                <div className="flex-1 h-px bg-white/[0.12]" />
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(isDayMode ? dayOptions : hourOptions).map((opt) => {
                  const isSelected = newItem.hours === parseFloat(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleHoursChange(parseFloat(opt.value))}
                      className={cn(
                        'h-11 rounded-xl text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                        isSelected
                          ? chipOn
                          : chipOff
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
                className="h-12 pl-11 pr-4 bg-input border-white/[0.08] text-[15px] text-white placeholder:text-white/25 focus:border-elec-yellow focus:ring-elec-yellow/20 rounded-xl"
              />
            </div>

            {/* Recently used — zero-typing path for the usual stuff */}
            {materialSearch.length < 2 && recentMaterials.length > 0 && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                  Recently used
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {recentMaterials.map((rm, i) => (
                    <button
                      key={`recent-${i}`}
                      type="button"
                      onClick={() => {
                        setNewItem((prev) => ({
                          ...prev,
                          description: rm.description,
                          unitPrice: rm.unitPrice,
                          unit: rm.unit,
                          materialCode: `recent-${i}`,
                        }));
                        toast({ title: 'Material Selected', description: rm.description });
                      }}
                      className="flex flex-col text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-all touch-manipulation active:scale-[0.98] select-none"
                    >
                      <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                        {titleCaseProduct(rm.description)}
                      </p>
                      <p className="font-bold text-[15px] text-white tabular-nums mt-1">
                        £{rm.unitPrice.toFixed(2)}
                        <span className="text-[11px] font-medium text-white ml-1">/{rm.unit}</span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Type-ahead suggestions */}
            {materialSearch.length >= 2 && typeahead.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {typeahead.map((sug) => (
                  <button
                    key={sug.name}
                    type="button"
                    onClick={() => {
                      setMaterialSearch(sug.name);
                      clearSuggestions();
                    }}
                    className="h-11 px-3 rounded-lg bg-white/[0.05] border border-white/[0.10] text-[12px] text-white touch-manipulation active:scale-[0.97] transition-all select-none"
                  >
                    {titleCaseProduct(sug.name)}
                  </button>
                ))}
              </div>
            )}

            {/* Material Results — live supplier prices first, standard list after */}
            {materialSearch.length >= 2 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] text-white tabular-nums">
                    {filteredMaterials.length + ragResults.length} result
                    {filteredMaterials.length + ragResults.length !== 1 ? 's' : ''}
                  </p>
                  {isSearchingRAG && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-elec-yellow/90">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Checking live supplier prices…
                    </span>
                  )}
                </div>

                <div className="max-h-[480px] overflow-y-auto overscroll-contain space-y-3 pr-1">
                  {/* Live priced results — elec-pipeline (Screwfix, Toolstation, CEF…) */}
                  {ragResults.filter((m) => m.source === 'live').length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/90 mb-2">
                        <Zap className="h-3 w-3" /> Live supplier prices
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {ragResults.filter((m) => m.source === 'live').map((material, idx) => {
                          const priceMatch = material.price?.replace(/,/g, '').match(/£?(\d+\.?\d*)/);
                          const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                          const adjustedPrice = calculateAdjustedPrice
                            ? calculateAdjustedPrice(basePrice)
                            : basePrice;
                          const isSelected = newItem.materialCode === `rag-${material.id}`;
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
                              className={cn(
                                'flex flex-col text-left p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] select-none',
                                isSelected
                                  ? 'bg-white/[0.08] border-elec-yellow/60'
                                  : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]',
                                /out of stock/i.test(material.stockStatus || '') && 'opacity-55'
                              )}
                            >
                              <div className="flex items-start justify-between gap-1.5 w-full">
                                <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px] flex-1">
                                  {titleCaseProduct(material.name)}
                                </p>
                                {material.isOnSale && material.discountPercentage > 0 && (
                                  <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/25">
                                    −{Math.round(material.discountPercentage)}%
                                  </span>
                                )}
                              </div>
                              <p className={cn('font-bold text-[16px] tabular-nums mt-1.5', isSelected ? 'text-elec-yellow' : 'text-elec-yellow/90')}>
                                £{adjustedPrice.toFixed(2)}
                              </p>
                              {adjustedPrice !== basePrice && (
                                <p className="text-[10px] text-white tabular-nums">
                                  cost £{basePrice.toFixed(2)} · your markup applied
                                </p>
                              )}
                              {/out of stock/i.test(material.stockStatus || '') && (
                                <p className="text-[10px] font-semibold text-red-400 mt-1">Out of stock</p>
                              )}
                              <p className="text-[10px] text-white mt-1.5 truncate">
                                {material.supplier}
                                {material.scrapedAt && (
                                  <span className="text-emerald-400/80">
                                    {' '}· {(() => {
                                      const d = Math.floor((Date.now() - new Date(material.scrapedAt).getTime()) / 86400000);
                                      return d <= 0 ? 'priced today' : `priced ${d}d ago`;
                                    })()}
                                  </span>
                                )}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Trade catalogue — static reference prices */}
                  {ragResults.filter((m) => m.source !== 'live').length > 0 && (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                        Trade catalogue
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {ragResults.filter((m) => m.source !== 'live').map((material, idx) => {
                          const priceMatch = material.price?.replace(/,/g, '').match(/£?(\d+\.?\d*)/);
                          const basePrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                          const adjustedPrice = calculateAdjustedPrice
                            ? calculateAdjustedPrice(basePrice)
                            : basePrice;
                          const isSelected = newItem.materialCode === `rag-${material.id}`;
                          return (
                            <button
                              key={`cat-${idx}`}
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
                              className={cn(
                                'flex flex-col text-left p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] select-none',
                                isSelected
                                  ? 'bg-white/[0.08] border-elec-yellow/60'
                                  : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]'
                              )}
                            >
                              <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                                {titleCaseProduct(material.name)}
                              </p>
                              <p className={cn('font-bold text-[16px] tabular-nums mt-1.5', isSelected ? 'text-elec-yellow' : 'text-white')}>
                                £{adjustedPrice.toFixed(2)}
                              </p>
                              {adjustedPrice !== basePrice && (
                                <p className="text-[10px] text-white tabular-nums">
                                  cost £{basePrice.toFixed(2)} · your markup applied
                                </p>
                              )}
                              <p className="text-[10px] text-white mt-1.5 truncate">{material.supplier}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Standard list */}
                  {filteredMaterials.length > 0 && (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                        Standard list
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {filteredMaterials.map((material) => {
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
                                'flex flex-col text-left p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.98] select-none',
                                isSelected
                                  ? 'bg-white/[0.08] border-elec-yellow/60'
                                  : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]'
                              )}
                            >
                              <p className="font-medium text-[13px] text-white leading-snug line-clamp-2 min-h-[34px]">
                                {titleCaseProduct(material.name)}
                              </p>
                              <p className={cn('font-bold text-[16px] tabular-nums mt-1.5', isSelected ? 'text-elec-yellow' : 'text-white')}>
                                £{adjustedPrice.toFixed(2)}
                              </p>
                              <p className="text-[10px] text-white mt-1.5 capitalize truncate">{material.category}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No matches */}
                  {!isSearchingRAG && filteredMaterials.length === 0 && ragResults.length === 0 && materialSearch.length >= 3 && (
                    <p className="text-[12px] text-white py-4 text-center">
                      No matches — fill in the fields below to add it manually.
                    </p>
                  )}
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
                  { id: 'manual' as const, label: 'Service / fee' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCustomCategory(opt.id)}
                    className={cn(
                      cn(chipBase, 'flex-1'),
                      customCategory === opt.id
                        ? chipOn
                        : chipOff
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
                className="min-h-[80px] px-3 py-2.5 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white/25 resize-none"
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
                  // ELE-974 — iOS UK keyboards surface comma on the decimal key
                  const val = e.target.value.replace(',', '.');
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    setQuantityInput(val);
                    // ELE-890 — also flush parseable values into newItem so the
                    // Add button enables before the user blurs the field.
                    const parsed = parseFloat(val);
                    if (!isNaN(parsed) && parsed > 0) {
                      setNewItem((prev) => ({ ...prev, quantity: parsed }));
                    }
                  }
                }}
                onBlur={() => {
                  const parsed = parseFloat(quantityInput);
                  const val = isNaN(parsed) || parsed <= 0 ? 1 : parsed;
                  setNewItem((prev) => ({ ...prev, quantity: val }));
                  setQuantityInput(String(val));
                }}
                placeholder="1"
                className="h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow placeholder:text-white/25"
              />
            </div>
            {/* ELE-889 — Unit type selector. Common UK trade units + custom. */}
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Unit</label>
              <Select
                value={
                  UNIT_PRESETS.includes(newItem.unit as (typeof UNIT_PRESETS)[number])
                    ? newItem.unit
                    : 'custom'
                }
                onValueChange={(val) => {
                  if (val === 'custom') {
                    // Switch to custom — preserve any existing custom value or default
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
                <SelectTrigger className="h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow">
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
                <Input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  placeholder="e.g. per circuit, per spur"
                  className="h-11 px-3 mt-2 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow placeholder:text-white/25"
                />
              )}
            </div>
            {/* Unit Price */}
            <div>
              <label className="text-xs font-medium text-white mb-1.5 block">Unit Price (£)</label>
              <Input
                type="text"
                inputMode="decimal"
                value={unitPriceInput}
                onChange={(e) => {
                  // ELE-974 — iOS UK keyboards surface comma on the decimal key
                  const val = e.target.value.replace(',', '.');
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    setUnitPriceInput(val);
                    // ELE-890 — flush parseable price to newItem live so the
                    // Add button enables without requiring a blur. Previously
                    // the user had to tap outside the field first, which
                    // looked like a glitch.
                    const parsed = parseFloat(val);
                    if (!isNaN(parsed) && parsed > 0) {
                      setNewItem((prev) => ({ ...prev, unitPrice: parsed }));
                    } else if (val === '') {
                      setNewItem((prev) => ({ ...prev, unitPrice: 0 }));
                    }
                  }
                }}
                onBlur={() => {
                  const parsed = parseFloat(unitPriceInput);
                  const val = isNaN(parsed) ? 0 : parsed;
                  setNewItem((prev) => ({ ...prev, unitPrice: val }));
                  if (val > 0) setUnitPriceInput(val.toFixed(2));
                }}
                placeholder="0.00"
                className="h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow placeholder:text-white/25"
              />
            </div>
            {/* Total Preview */}
            {newItem.quantity > 0 && newItem.unitPrice > 0 && (
              <div className="flex items-center justify-between p-3.5 bg-white/[0.04]">
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
            className="w-full h-12 bg-elec-yellow text-black hover:brightness-110 font-semibold rounded-xl touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
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
            {items.map((item, itemIndex) => {
              const cat = categories.find((c) => c.id === item.category);
              // ELE-1548 — hidden entirely on a single-item quote, matching
              // BoardSetupCard: a permanently-disabled control reads as broken.
              const canReorder = !!onMove && items.length > 1;
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
                      <AutoGrowTextarea
                        autoFocus
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        onFocus={(e) => {
                          const len = e.target.value.length;
                          e.target.setSelectionRange(len, len);
                        }}
                        onBlur={() => {
                          if (editingDescription.trim()) {
                            onUpdate(item.id, { description: editingDescription.trim() });
                          }
                          setEditingItemId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setEditingItemId(null);
                        }}
                        className="flex-1 min-w-0 rounded-lg border border-elec-yellow/40 bg-[#1a1a1e] px-2.5 py-2 text-[15px] leading-snug text-white focus:border-elec-yellow focus:outline-none focus:ring-2 focus:ring-elec-yellow/15"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDescription(item.description);
                          setEditingItemId(item.id);
                        }}
                        className="min-w-0 flex-1 whitespace-pre-wrap break-words text-left font-medium text-[14px] leading-snug text-white"
                      >
                        {item.description || (
                          <span className="font-normal text-white/25">Tap to add a description</span>
                        )}
                      </button>
                    )}
                    <p className="text-[15px] font-bold text-elec-yellow shrink-0 ml-2">
                      £{((item.totalPrice ?? item.quantity * item.unitPrice) || 0).toFixed(2)}
                    </p>
                  </div>

                  {/* Bottom row: Qty × Price | Actions.
                      Wraps: with reorder added there are up to seven 44px
                      targets beside the two numeric inputs, which is wider than
                      a phone. Wrapping keeps every target at full size rather
                      than shrinking them below the touch minimum. */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2">
                    {/* Quantity and Price inputs */}
                    <div className="flex items-center gap-1.5">
                      <DecimalInput
                        style={{ colorScheme: 'dark' }}
                        value={item.quantity}
                        onChange={(quantity) => onUpdate(item.id, { quantity })}
                        className="w-14 h-11 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                      />
                      <span className="text-[11px] text-white w-8 truncate">{item.unit}</span>
                      <span className="text-[12px] text-white">×</span>
                      <span className="text-[11px] text-white">£</span>
                      <DecimalInput
                        style={{ colorScheme: 'dark' }}
                        value={item.unitPrice}
                        onChange={(unitPrice) => onUpdate(item.id, { unitPrice })}
                        className="w-16 h-11 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                      />
                    </div>

                    {/* Action buttons - always visible */}
                    <div className="flex flex-wrap items-center justify-end gap-1.5 ml-auto">
                      {/* ELE-1548 — order is how the job reads to the client,
                          and the top line is what they judge the price against. */}
                      {canReorder && (
                        <>
                          <button
                            type="button"
                            onClick={() => onMove?.(item.id, 'up')}
                            disabled={itemIndex === 0}
                            aria-label={`Move ${item.description || 'item'} up`}
                            className={cn(
                              'w-11 h-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                              itemIndex === 0
                                ? 'bg-white/[0.02] opacity-25 cursor-not-allowed'
                                : 'bg-white/[0.05] active:bg-white/[0.1]'
                            )}
                          >
                            <ChevronUp className="h-4 w-4 text-white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onMove?.(item.id, 'down')}
                            disabled={itemIndex === items.length - 1}
                            aria-label={`Move ${item.description || 'item'} down`}
                            className={cn(
                              'w-11 h-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                              itemIndex === items.length - 1
                                ? 'bg-white/[0.02] opacity-25 cursor-not-allowed'
                                : 'bg-white/[0.05] active:bg-white/[0.1]'
                            )}
                          >
                            <ChevronDown className="h-4 w-4 text-white" />
                          </button>
                        </>
                      )}
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
                          'w-11 h-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                          editingItemId === item.id
                            ? 'bg-white/[0.08] border border-elec-yellow/40 active:brightness-125'
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
                        className="w-11 h-11 rounded-lg bg-white/[0.05] flex items-center justify-center touch-manipulation active:bg-white/[0.1] active:scale-95 transition-transform"
                        aria-label="Duplicate item"
                      >
                        <Copy className="h-4 w-4 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAdjustingItemId(adjustingItemId === item.id ? null : item.id)
                        }
                        className={cn(
                          'w-11 h-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                          adjustingItemId === item.id ||
                            (typeof item.itemAdjustmentPercent === 'number' &&
                              item.itemAdjustmentPercent !== 0)
                            ? 'bg-white/[0.08] border border-elec-yellow/40 active:brightness-125'
                            : 'bg-white/[0.05] active:bg-white/[0.1]'
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
                      {/* Save a typed line into the price book. Materials and
                          equipment only — a labour line belongs on the rate
                          card, not in a materials list. */}
                      {(item.category === 'materials' || item.category === 'equipment') &&
                        !!item.description?.trim() &&
                        (() => {
                          const inBook = isInPriceBook(item.description);
                          return (
                            <button
                              type="button"
                              onClick={() => handleSaveToPriceBook(item)}
                              disabled={savingItemId === item.id}
                              className={cn(
                                'w-11 h-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-95 transition-transform',
                                inBook ? 'bg-white/[0.04]' : 'bg-white/[0.06] border border-elec-yellow/30 active:brightness-125'
                              )}
                              aria-label={inBook ? 'Update price in price book' : 'Save to price book'}
                              title={inBook ? 'In your price book — tap to update the price' : 'Save to price book'}
                            >
                              {savingItemId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : inBook ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : (
                                <BookOpen className="h-4 w-4 text-elec-yellow" />
                              )}
                            </button>
                          );
                        })()}
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="w-11 h-11 rounded-lg bg-red-500/10 flex items-center justify-center touch-manipulation active:bg-red-500/20 active:scale-95 transition-transform"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* ELE-888 — adjustment chip (when set, not currently editing) */}
                  {typeof item.itemAdjustmentPercent === 'number' &&
                    item.itemAdjustmentPercent !== 0 &&
                    adjustingItemId !== item.id && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
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
                          <span className="text-white">{item.itemAdjustmentLabel}</span>
                        )}
                      </div>
                    )}

                  {/* ELE-888 — adjustment editor */}
                  {adjustingItemId === item.id && (
                    <div className="mt-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-2">
                      <div className="flex items-center gap-2">
                        <DecimalInput
                          allowNegative
                          nonNegative={false}
                          placeholder="± %"
                          value={item.itemAdjustmentPercent ?? 0}
                          onChange={(val) =>
                            onUpdate(item.id, {
                              itemAdjustmentPercent: val === 0 ? undefined : val,
                            })
                          }
                          className="w-20 h-11 px-2 text-center text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation"
                        />
                        <input
                          type="text"
                          placeholder="Reason (e.g. mates rate)"
                          value={item.itemAdjustmentLabel ?? ''}
                          onChange={(e) =>
                            onUpdate(item.id, {
                              itemAdjustmentLabel: e.target.value || undefined,
                            })
                          }
                          className="flex-1 h-11 px-2.5 text-[13px] bg-[#1a1a1e] border border-white/[0.1] rounded-lg text-white touch-manipulation placeholder:text-white/25"
                        />
                        <button
                          type="button"
                          onClick={() => setAdjustingItemId(null)}
                          className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.12] active:brightness-125 flex items-center justify-center"
                          aria-label="Done"
                        >
                          <Check className="h-4 w-4 text-elec-yellow" />
                        </button>
                      </div>
                      <p className="text-[10px] text-white">
                        Negative = discount (e.g. −20 for mates rate). Positive = markup.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* One press to bank the whole job. Saving line by line means a
              fifteen-item quote is fifteen taps, which is why almost nobody
              builds a price book. Only shown when there is something to save. */}
          {unsavedPriceBookItems.length > 0 && (
            <button
              type="button"
              onClick={() => saveToPriceBook(unsavedPriceBookItems)}
              disabled={savingToPriceBook}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-elec-yellow/30 bg-white/[0.06] text-[13px] font-semibold text-elec-yellow transition-colors hover:bg-white/[0.06] disabled:opacity-50 touch-manipulation active:scale-[0.99]"
            >
              {savingToPriceBook ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Save {unsavedPriceBookItems.length} new{' '}
                  {unsavedPriceBookItems.length === 1 ? 'item' : 'items'} to my price book
                </>
              )}
            </button>
          )}
        </div>
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
    </section>
  );
};
