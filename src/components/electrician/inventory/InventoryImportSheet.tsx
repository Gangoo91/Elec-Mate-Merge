import { useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Package,
  Loader2,
  Check,
  Download,
  ClipboardPaste,
  Pencil,
  Trash2,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useMaterialsLists } from '@/hooks/useMaterialsLists';
import {
  InventoryItem,
  CreateInventoryInput,
  InventoryCategory,
  InventoryLocation,
  INVENTORY_CATEGORIES,
  INVENTORY_LOCATIONS,
  INVENTORY_UNITS,
  InventoryUnit,
} from '@/types/inventory';

type ImportTab = 'paste' | 'pricebook' | 'export';

interface InventoryImportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportItems: (items: CreateInventoryInput[]) => Promise<void>;
  items: InventoryItem[];
}

function guessCategory(name: string): InventoryCategory {
  const n = name.toLowerCase();
  if (
    n.includes('cable') ||
    n.includes('t&e') ||
    n.includes('swa') ||
    n.includes('flex') ||
    n.includes('twin') ||
    n.includes('mm ')
  )
    return 'cable';
  if (
    n.includes('mcb') ||
    n.includes('rcb') ||
    n.includes('rcd') ||
    n.includes('rcbo') ||
    n.includes('breaker')
  )
    return 'mcbs_rcds';
  if (n.includes('consumer unit') || n.includes('board') || n.includes('enclosure'))
    return 'consumer_units';
  if (
    n.includes('socket') ||
    n.includes('switch') ||
    n.includes('dimmer') ||
    n.includes('outlet') ||
    n.includes('spur') ||
    n.includes('plate') ||
    n.includes('fcu')
  )
    return 'accessories';
  if (
    n.includes('screw') ||
    n.includes('plug') ||
    n.includes('clip') ||
    n.includes('saddle') ||
    n.includes('bracket') ||
    n.includes('gland') ||
    n.includes('fixing')
  )
    return 'fixings';
  if (
    n.includes('drill') ||
    n.includes('driver') ||
    n.includes('plier') ||
    n.includes('cutter') ||
    n.includes('crimp') ||
    n.includes('meter') ||
    n.includes('tester')
  )
    return 'tools';
  if (
    n.includes('glove') ||
    n.includes('goggle') ||
    n.includes('helmet') ||
    n.includes('boot') ||
    n.includes('hi-vis') ||
    n.includes('ppe')
  )
    return 'ppe';
  return 'other';
}

/** Editable row for a single import item */
function ImportItemRow({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: CreateInventoryInput;
  index: number;
  onUpdate: (index: number, updates: Partial<CreateInventoryInput>) => void;
  onRemove: (index: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cat = INVENTORY_CATEGORIES.find((c) => c.id === item.category);
  const loc = INVENTORY_LOCATIONS.find((l) => l.id === item.location);

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      {/* Summary row — tap to expand */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 text-left touch-manipulation"
      >
        <div className={cn('w-2 h-2 rounded-full flex-shrink-0', cat?.dotClass || 'bg-gray-500')} />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-white truncate">{item.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-white">
              {item.quantity} {item.unit}
            </span>
            <span className="text-[11px] text-white">·</span>
            <span className="text-[11px] text-white flex items-center gap-0.5">
              <MapPin className="h-2.5 w-2.5" />
              {loc?.label}
            </span>
            <span className="text-[11px] text-white">·</span>
            <span className="text-[11px] text-white">{cat?.label}</span>
          </div>
        </div>
        <Pencil className="h-3.5 w-3.5 text-white flex-shrink-0" />
      </button>

      {/* Expanded edit area */}
      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-white/[0.06] pt-3">
          {/* Name */}
          <Input
            value={item.name}
            onChange={(e) => onUpdate(index, { name: e.target.value })}
            className="h-10 text-sm touch-manipulation border-white/20 focus:border-yellow-500"
          />

          {/* Quantity + Unit row */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => onUpdate(index, { quantity: parseFloat(e.target.value) || 0 })}
              className="h-10 text-sm touch-manipulation border-white/20 focus:border-yellow-500"
              min={0}
              placeholder="Qty"
            />
            <select
              value={item.unit || 'each'}
              onChange={(e) => onUpdate(index, { unit: e.target.value as InventoryUnit })}
              className="h-10 rounded-md bg-white/[0.05] border border-white/20 text-sm text-white px-2 touch-manipulation"
            >
              {INVENTORY_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.pluralLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Location pills */}
          <div className="flex flex-wrap gap-1.5">
            {INVENTORY_LOCATIONS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onUpdate(index, { location: l.id })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] font-medium touch-manipulation transition-all',
                  item.location === l.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-white/[0.04] text-white border border-transparent'
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {INVENTORY_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onUpdate(index, { category: c.id })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] font-medium touch-manipulation transition-all',
                  item.category === c.id
                    ? c.pillActiveClass
                    : 'bg-white/[0.04] text-white border border-transparent'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex items-center gap-1.5 text-[12px] text-red-400 touch-manipulation"
          >
            <Trash2 className="h-3 w-3" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export function InventoryImportSheet({
  open,
  onOpenChange,
  onImportItems,
  items,
}: InventoryImportSheetProps) {
  const haptic = useHaptic();
  const [tab, setTab] = useState<ImportTab>('paste');
  const [pasteText, setPasteText] = useState('');
  const [parsedItems, setParsedItems] = useState<CreateInventoryInput[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedPBItems, setSelectedPBItems] = useState<Set<string>>(new Set());
  const [defaultLocation, setDefaultLocation] = useState<InventoryLocation>('van');

  const { lists: materialsLists } = useMaterialsLists();

  const priceBookItems = materialsLists.flatMap((list) =>
    list.items.filter((i) => i.name).map((i) => ({ ...i, listName: list.name }))
  );

  // Update a single parsed item
  const updateParsedItem = useCallback((index: number, updates: Partial<CreateInventoryInput>) => {
    setParsedItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  }, []);

  // Remove a parsed item
  const removeParsedItem = useCallback((index: number) => {
    setParsedItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Set location for all parsed items
  const setAllLocations = useCallback((loc: InventoryLocation) => {
    setDefaultLocation(loc);
    setParsedItems((prev) => prev.map((item) => ({ ...item, location: loc })));
  }, []);

  // Parse pasted text via AI
  const handleParse = useCallback(async () => {
    if (!pasteText.trim()) return;
    setIsParsing(true);

    try {
      const { data, error } = await supabase.functions.invoke('parse-materials-list', {
        body: { text: pasteText },
      });

      if (error) throw error;

      const raw = (data?.items || []) as Array<{
        name: string;
        quantity?: number;
        unit?: string;
        estimated_price?: number;
      }>;

      const mapped: CreateInventoryInput[] = raw.map((r) => ({
        name: r.name,
        category: guessCategory(r.name),
        quantity: r.quantity || 1,
        unit: (r.unit as InventoryUnit) || 'each',
        location: defaultLocation,
        unit_cost: r.estimated_price || null,
      }));

      setParsedItems(mapped);
      haptic.success();
      toast({
        title: `Parsed ${mapped.length} items`,
        description: 'Tap any item to edit before importing',
      });
    } catch (err) {
      console.error('Parse error:', err);
      toast({
        title: 'Could not parse text',
        description: 'Try one item per line',
        variant: 'destructive',
      });
    } finally {
      setIsParsing(false);
    }
  }, [pasteText, haptic, defaultLocation]);

  // Import parsed items
  const handleImportParsed = useCallback(async () => {
    if (parsedItems.length === 0) return;
    setIsImporting(true);
    await onImportItems(parsedItems);
    haptic.success();
    toast({ title: `Imported ${parsedItems.length} items` });
    setParsedItems([]);
    setPasteText('');
    setIsImporting(false);
    onOpenChange(false);
  }, [parsedItems, onImportItems, haptic, onOpenChange]);

  // Import selected price book items
  const handleImportPriceBook = useCallback(async () => {
    const selected = priceBookItems.filter((i) => selectedPBItems.has(i.id));
    if (selected.length === 0) return;

    const mapped: CreateInventoryInput[] = selected.map((i) => ({
      name: i.name,
      category: guessCategory(i.name),
      quantity: i.quantity || 0,
      unit: (i.unit as InventoryUnit) || 'each',
      location: defaultLocation,
      unit_cost: i.estimated_price || i.cost_price || null,
      supplier: i.supplier || null,
    }));

    setIsImporting(true);
    await onImportItems(mapped);
    haptic.success();
    toast({ title: `Imported ${mapped.length} items from Price Book` });
    setSelectedPBItems(new Set());
    setIsImporting(false);
    onOpenChange(false);
  }, [priceBookItems, selectedPBItems, onImportItems, haptic, onOpenChange, defaultLocation]);

  // CSV export
  const handleExport = useCallback(() => {
    if (items.length === 0) {
      toast({ title: 'No items to export' });
      return;
    }

    const header =
      'Name,Category,Quantity,Unit,Location,Low Stock Threshold,Unit Cost,Supplier,Notes';
    const rows = items.map((i) =>
      [
        `"${i.name.replace(/"/g, '""')}"`,
        i.category,
        i.quantity,
        i.unit,
        i.location,
        i.low_stock_threshold ?? '',
        i.unit_cost ?? '',
        `"${(i.supplier || '').replace(/"/g, '""')}"`,
        `"${(i.notes || '').replace(/"/g, '""')}"`,
      ].join(',')
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elecmate-stock-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    haptic.success();
    toast({ title: 'CSV downloaded', description: `${items.length} items exported` });
  }, [items, haptic]);

  const handleCopyText = useCallback(() => {
    if (items.length === 0) return;
    const lines = items.map(
      (i) =>
        `${i.name} — ${i.quantity} ${i.unit} (${i.location})${i.supplier ? ` [${i.supplier}]` : ''}`
    );
    const text = `Stock List — ${new Date().toLocaleDateString('en-GB')}\n\n${lines.join('\n')}`;
    navigator.clipboard.writeText(text);
    haptic.success();
    toast({ title: 'Copied to clipboard' });
  }, [items, haptic]);

  const togglePBItem = (id: string) => {
    setSelectedPBItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /** Location selector bar — reused in paste + pricebook tabs */
  const LocationBar = () => (
    <div className="space-y-1.5">
      <p className="text-[11px] text-white uppercase tracking-wider">Default location</p>
      <div className="flex gap-1.5">
        {INVENTORY_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => setAllLocations(loc.id)}
            className={cn(
              'flex-1 py-2 rounded-xl text-[12px] font-medium touch-manipulation transition-all text-center',
              defaultLocation === loc.id
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'bg-white/[0.04] text-white border border-transparent'
            )}
          >
            {loc.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 pt-6 pb-3">
            <h2 className="text-lg font-semibold text-white">Import / Export</h2>
            <p className="text-[12px] text-white mt-0.5">Bring in lists or back up your stock</p>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-white/[0.06]">
            {[
              { id: 'paste' as ImportTab, label: 'Paste Text', icon: ClipboardPaste },
              { id: 'pricebook' as ImportTab, label: 'Price Book', icon: Package },
              { id: 'export' as ImportTab, label: 'Export', icon: Download },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-medium touch-manipulation transition-colors',
                  tab === t.id ? 'text-elec-yellow border-b-2 border-elec-yellow' : 'text-white'
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {tab === 'paste' && (
              <div className="space-y-4">
                {parsedItems.length === 0 ? (
                  <>
                    <p className="text-[13px] text-white/60">
                      Paste a materials list from Word, Notes, WhatsApp, or a delivery note. One
                      item per line works best.
                    </p>
                    <LocationBar />
                    <Textarea
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      placeholder={`e.g.\n50m 2.5mm T&E\n20m 6mm T&E\n10x 32A MCB Type B\nBox of red plugs\n2x double socket outlets`}
                      className="touch-manipulation text-base min-h-[140px] border-white/30 focus:border-yellow-500 placeholder:text-white"
                    />
                    <Button
                      onClick={handleParse}
                      disabled={isParsing || !pasteText.trim()}
                      className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation"
                    >
                      {isParsing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Parsing with AI...
                        </>
                      ) : (
                        'Parse List'
                      )}
                    </Button>
                  </>
                ) : (
                  /* Editable parsed results */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-white font-medium">
                        {parsedItems.length} items — tap to edit
                      </p>
                      <button
                        type="button"
                        className="text-[12px] text-white touch-manipulation"
                        onClick={() => setParsedItems([])}
                      >
                        Start over
                      </button>
                    </div>

                    <LocationBar />

                    <div className="space-y-2">
                      {parsedItems.map((item, idx) => (
                        <ImportItemRow
                          key={idx}
                          item={item}
                          index={idx}
                          onUpdate={updateParsedItem}
                          onRemove={removeParsedItem}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'pricebook' && (
              <div className="space-y-4">
                <p className="text-[13px] text-white/60">
                  Import items from your existing materials lists.
                </p>

                <LocationBar />

                {priceBookItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-10 w-10 text-white mx-auto mb-2" />
                    <p className="text-sm text-white">No materials in your Price Book yet</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-white">{selectedPBItems.size} selected</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-elec-yellow text-[12px]"
                        onClick={() => {
                          if (selectedPBItems.size === priceBookItems.length) {
                            setSelectedPBItems(new Set());
                          } else {
                            setSelectedPBItems(new Set(priceBookItems.map((i) => i.id)));
                          }
                        }}
                      >
                        {selectedPBItems.size === priceBookItems.length
                          ? 'Deselect All'
                          : 'Select All'}
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {priceBookItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => togglePBItem(item.id)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation transition-all',
                            selectedPBItems.has(item.id)
                              ? 'bg-elec-yellow/10 border-elec-yellow/30'
                              : 'bg-white/[0.02] border-white/[0.06]'
                          )}
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                              selectedPBItems.has(item.id)
                                ? 'bg-elec-yellow border-elec-yellow'
                                : 'border-white/30'
                            )}
                          >
                            {selectedPBItems.has(item.id) && (
                              <Check className="h-3 w-3 text-black" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] text-white truncate">{item.name}</p>
                            <p className="text-[11px] text-white">
                              {item.quantity || 0} {item.unit}
                              {item.estimated_price ? ` · £${item.estimated_price.toFixed(2)}` : ''}
                              {item.supplier ? ` · ${item.supplier}` : ''}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === 'export' && (
              <div className="space-y-4">
                <p className="text-[13px] text-white/60">
                  Export your stock list to share or back up.
                </p>
                <button
                  type="button"
                  onClick={handleExport}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Download className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] text-white font-medium">Download CSV</p>
                    <p className="text-[12px] text-white">
                      {items.length} items · Opens in Excel, Google Sheets
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] text-white font-medium">Copy as Text</p>
                    <p className="text-[12px] text-white">
                      Paste into WhatsApp, email, or Notes
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Bottom action bar (import buttons) */}
          {tab === 'paste' && parsedItems.length > 0 && (
            <div className="p-4 border-t border-white/[0.06]">
              <Button
                onClick={handleImportParsed}
                disabled={isImporting}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl touch-manipulation text-base"
              >
                {isImporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Import {parsedItems.length} Items
              </Button>
            </div>
          )}
          {tab === 'pricebook' && selectedPBItems.size > 0 && (
            <div className="p-4 border-t border-white/[0.06]">
              <Button
                onClick={handleImportPriceBook}
                disabled={isImporting}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl touch-manipulation text-base"
              >
                {isImporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Import {selectedPBItems.size} Items to{' '}
                {INVENTORY_LOCATIONS.find((l) => l.id === defaultLocation)?.label}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
