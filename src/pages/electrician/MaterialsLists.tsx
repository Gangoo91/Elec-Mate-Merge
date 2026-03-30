import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  ListChecks,
  Trash2,
  Minus,
  Search,
  ClipboardPaste,
  Package,
  Loader2,
  BarChart3,
  FileText,
  BookOpen,
  Receipt,
  ChevronRight,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMaterialsLists, MaterialsList } from '@/hooks/useMaterialsLists';
import { cn } from '@/lib/utils';

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function MaterialsLists() {
  const {
    lists,
    isLoading,
    createList,
    deleteList,
    removeItem,
    updateItemQuantity,
    updateItemPrice,
    parseTextToItems,
    addItem,
  } = useMaterialsLists();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromSiteVisit = searchParams.get('from') === 'site-visit';
  const siteVisitId = searchParams.get('visitId');
  const [selectedList, setSelectedList] = useState<MaterialsList | null>(null);
  const [newListSheetOpen, setNewListSheetOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [pasteSheetOpen, setPasteSheetOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState('');

  const activeList = selectedList ? lists.find((l) => l.id === selectedList.id) || null : null;

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    await createList(newListName.trim());
    setNewListName('');
    setNewListSheetOpen(false);
  };

  const handleDeleteList = async (listId: string) => {
    await deleteList(listId);
    if (selectedList?.id === listId) setSelectedList(null);
  };

  const handleDuplicateList = async (list: MaterialsList) => {
    const newList = await createList(`${list.name} (copy)`);
    if (newList) {
      for (const item of list.items) {
        await addItem(newList.id, {
          name: item.name,
          current_price: item.estimated_price,
          supplier: item.supplier,
          product_url: item.product_url,
        });
      }
    }
  };

  const handleParseMaterials = async () => {
    if (!pasteText.trim() || !activeList || parsing) return;
    setParsing(true);
    const items = await parseTextToItems(pasteText.trim());
    for (const item of items) {
      await addItem(activeList.id, {
        name: item.name,
        current_price: item.estimated_price,
        supplier: item.supplier,
        product_url: item.product_url,
      });
    }
    setPasteText('');
    setPasteSheetOpen(false);
    setParsing(false);
  };

  const getEstimatedTotal = (list: MaterialsList): number =>
    list.items.reduce((sum, item) => sum + (item.estimated_price || 0) * item.quantity, 0);

  const handleSendToQuote = (list: MaterialsList) => {
    const materialsSessionId = `materials_${crypto.randomUUID()}`;
    const materialsData = {
      source: 'materials_list',
      sourceLabel: list.name,
      materials: list.items.map((item) => ({
        id: crypto.randomUUID(),
        description: item.name,
        category: 'materials' as const,
        quantity: item.quantity,
        unitPrice: item.estimated_price || 0,
        totalPrice: (item.estimated_price || 0) * item.quantity,
        unit: item.unit || 'each',
        notes: [
          item.supplier && `Supplier: ${item.supplier}`,
          item.product_url && `URL: ${item.product_url}`,
        ]
          .filter(Boolean)
          .join(' | '),
      })),
    };
    localStorage.setItem(materialsSessionId, JSON.stringify({ materialsData }));
    navigate(`/electrician/quote-builder/create?materialsSessionId=${materialsSessionId}`);
  };

  // Totals across all lists
  const totalItems = lists.reduce((sum, l) => sum + l.items.length, 0);
  const totalValue = lists.reduce((sum, l) => sum + getEstimatedTotal(l), 0);

  // ─── Detail view ────────────────────────────────────────────────────────────
  if (activeList) {
    const total = getEstimatedTotal(activeList);

    return (
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background min-h-screen flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedList(null)}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <ListChecks className="h-4 w-4 text-elec-yellow" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base font-semibold text-white truncate">{activeList.name}</h1>
                </div>
              </div>
              {activeList.items.length > 0 && (
                <button
                  onClick={() => setPasteSheetOpen(true)}
                  className="h-11 w-11 rounded-xl flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
                >
                  <ClipboardPaste className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-36 sm:pb-28">
          {/* Stats + actions */}
          {activeList.items.length > 0 && (
            <div className="px-4 py-3 space-y-3">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="card-surface p-2.5 flex flex-col items-center">
                  <span className="text-base font-bold text-white">{activeList.items.length}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Items</span>
                </div>
                <div className="card-surface p-2.5 flex flex-col items-center">
                  <span className="text-base font-bold text-elec-yellow">£{total.toFixed(2)}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Total</span>
                </div>
                <div className="card-surface p-2.5 flex flex-col items-center">
                  <span className="text-base font-bold text-white">{formatRelativeTime(activeList.updated_at)}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Updated</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPasteSheetOpen(true)}
                  className="group card-surface-interactive p-3 flex items-center gap-2.5 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <ClipboardPaste className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  <span className="text-xs font-medium text-white group-hover:text-elec-yellow transition-colors">Paste Materials</span>
                </button>
                <button
                  onClick={() =>
                    navigate('/electrician/materials/procurement', {
                      state: {
                        items: activeList.items.map((item) => ({
                          name: item.name,
                          quantity: item.quantity,
                          unit: 'each',
                          original_text: item.name,
                        })),
                      },
                    })
                  }
                  className="group card-surface-interactive p-3 flex items-center gap-2.5 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-white group-hover:text-blue-300 transition-colors">Compare Prices</span>
                </button>
              </div>
            </div>
          )}

          <div className="px-4 py-2 space-y-2">
            {/* Empty state */}
            {activeList.items.length === 0 && (
              <div className="text-center py-14">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                  <Package className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Add Your First Items</h3>
                <p className="text-white text-xs mb-5 max-w-xs mx-auto">
                  Browse the marketplace to save products, or paste a materials list.
                </p>
                <div className="flex flex-col gap-2 max-w-xs mx-auto">
                  <Link to="/electrician/materials">
                    <Button className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Marketplace
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setPasteSheetOpen(true)}
                    className="w-full h-11 touch-manipulation border-white/15 text-white"
                  >
                    <ClipboardPaste className="h-4 w-4 mr-2" />
                    Paste Materials
                  </Button>
                </div>
              </div>
            )}

            {/* Items */}
            {activeList.items.map((item) => (
              <div key={item.id} className="card-surface p-3.5">
                <div className="flex items-start gap-3">
                  {/* Image */}
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-14 w-14 object-contain rounded-lg bg-white p-1 flex-shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-[hsl(0,0%,12%)] flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white line-clamp-2 leading-tight">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {editingPriceId === item.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-elec-yellow">£</span>
                          <input
                            type="text"
                            inputMode="decimal"
                            autoFocus
                            value={priceInput}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '' || /^\d*\.?\d*$/.test(val)) setPriceInput(val);
                            }}
                            onBlur={() => {
                              const parsed = parseFloat(priceInput);
                              if (activeList) {
                                updateItemPrice(
                                  activeList.id,
                                  item.id,
                                  isNaN(parsed) || parsed <= 0 ? undefined : parsed
                                );
                              }
                              setEditingPriceId(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                              if (e.key === 'Escape') setEditingPriceId(null);
                            }}
                            className="w-20 h-7 text-xs bg-[hsl(0,0%,12%)] border border-elec-yellow/40 rounded px-1.5 text-elec-yellow font-semibold touch-manipulation focus:outline-none focus:ring-1 focus:ring-elec-yellow/50"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingPriceId(item.id);
                            setPriceInput(item.estimated_price ? item.estimated_price.toFixed(2) : '');
                          }}
                          className="text-xs font-semibold touch-manipulation"
                        >
                          {item.estimated_price ? (
                            <span className="text-elec-yellow">
                              £{(item.estimated_price * item.quantity).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-white underline underline-offset-2">Set price</span>
                          )}
                        </button>
                      )}
                      {item.supplier && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                          {item.supplier}
                        </span>
                      )}
                      {!item.matched && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          Unmatched
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom row — quantity + delete */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItemQuantity(activeList.id, item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center touch-manipulation disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(activeList.id, item.id, item.quantity + 1)}
                      className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center touch-manipulation"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(activeList.id, item.id)}
                    className="h-9 px-3 rounded-full flex items-center gap-1.5 touch-manipulation text-red-400 active:bg-red-500/10 text-xs font-medium"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky footer */}
        {activeList.items.length > 0 && (
          <div className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Estimated Total</p>
                <p className="text-[11px] text-white">
                  {activeList.items.length} {activeList.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <span className="text-2xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
            </div>
            <Button
              onClick={() => handleSendToQuote(activeList)}
              className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Send to Quote
            </Button>
          </div>
        )}

        {/* Paste Sheet */}
        <Sheet open={pasteSheetOpen} onOpenChange={setPasteSheetOpen}>
          <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ClipboardPaste className="h-5 w-5" />
                Paste Materials
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4 pb-6">
              <p className="text-sm text-white">
                Paste your materials list and we'll match items to products automatically.
              </p>
              <Textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={'10x 2.5mm T&E 100m\n5x double sockets\nMCB 32A Type B\nLED downlights x 6'}
                className="min-h-[160px] text-base touch-manipulation"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleParseMaterials}
                  disabled={!pasteText.trim() || parsing}
                  className="flex-1 h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                >
                  {parsing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Matching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Match Products
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setPasteSheetOpen(false);
                    navigate('/electrician/materials/procurement', {
                      state: { preloadText: pasteText.trim() },
                    });
                  }}
                  disabled={!pasteText.trim() || parsing}
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation border-elec-yellow/30 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // ─── Lists overview ──────────────────────────────────────────────────────────
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  fromSiteVisit && siteVisitId
                    ? navigate(`/electrician/site-visit/${siteVisitId}`)
                    : navigate('/electrician/materials')
                }
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <ListChecks className="h-4 w-4 text-elec-yellow" />
                </div>
                <h1 className="text-base font-semibold text-white">My Lists</h1>
              </div>
              <Button
                onClick={() => setNewListSheetOpen(true)}
                size="sm"
                className="h-9 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-3"
              >
                <Plus className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">New List</span>
              </Button>
            </div>
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-5"
        >
          {/* KPI Strip */}
          {lists.length > 0 && (
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
              <div className="card-surface p-3 flex flex-col items-center">
                <span className="text-lg font-bold text-white">{lists.length}</span>
                <span className="text-[10px] text-white uppercase tracking-wider">Lists</span>
              </div>
              <div className="card-surface p-3 flex flex-col items-center">
                <span className="text-lg font-bold text-white">{totalItems}</span>
                <span className="text-[10px] text-white uppercase tracking-wider">Items</span>
              </div>
              <div className="card-surface p-3 flex flex-col items-center">
                <span className="text-lg font-bold text-elec-yellow">£{totalValue.toFixed(0)}</span>
                <span className="text-[10px] text-white uppercase tracking-wider">Value</span>
              </div>
            </motion.div>
          )}

          {/* Quick links */}
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Rate Card */}
              <Link to="/electrician/rate-card" className="block">
                <div className="group card-surface-interactive overflow-hidden touch-manipulation active:scale-[0.98] transition-all">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity" />
                  <div className="relative z-10 p-4 flex flex-col min-h-[130px]">
                    <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 w-fit mb-2.5 group-hover:scale-110 transition-transform">
                      <Receipt className="h-4.5 w-4.5 text-elec-yellow" />
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-elec-yellow transition-colors">Rate Card</h3>
                    <p className="text-[11px] text-white mt-0.5">Labour & call-out prices</p>
                    <div className="flex-grow" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                        <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Price Book */}
              <Link to="/electrician/price-book" className="block">
                <div className="group card-surface-interactive overflow-hidden touch-manipulation active:scale-[0.98] transition-all">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30 group-hover:opacity-80 transition-opacity" />
                  <div className="relative z-10 p-4 flex flex-col min-h-[130px]">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit mb-2.5 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-4.5 w-4.5 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Price Book</h3>
                    <p className="text-[11px] text-white mt-0.5">Materials cost tracking</p>
                    <div className="flex-grow" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                        <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
            </div>
          )}

          {/* Empty state */}
          {!isLoading && lists.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                <ListChecks className="h-8 w-8 text-elec-yellow" />
              </div>
              <h2 className="text-base font-semibold text-white mb-1">No Lists Yet</h2>
              <p className="text-white text-xs mb-5 max-w-xs mx-auto">
                Create a list to collect materials for a job, compare prices, and send to quotes.
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setNewListSheetOpen(true)}
                  className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create List
                </Button>
                <Link to="/electrician/materials">
                  <Button variant="outline" className="h-11 touch-manipulation border-white/15 text-white">
                    <Search className="h-4 w-4 mr-1.5" />
                    Marketplace
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* List cards */}
          {!isLoading && lists.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                Your Lists
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {lists.map((list) => {
                    const total = getEstimatedTotal(list);
                    const previewItems = list.items.slice(0, 3).map((i) => i.name);
                    return (
                      <motion.div
                        key={list.id}
                        layout
                        variants={itemVariants}
                        exit={{ opacity: 0, x: -60, transition: { duration: 0.2 } }}
                        onClick={() => setSelectedList(list)}
                        role="button"
                        tabIndex={0}
                        className="group card-surface-interactive overflow-hidden touch-manipulation cursor-pointer active:scale-[0.98] transition-all"
                      >
                        {/* Accent line */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-20 group-hover:opacity-70 transition-opacity" />

                        <div className="relative z-10 p-4">
                          {/* Top row */}
                          <div className="flex items-start gap-3 mb-2">
                            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                              <ListChecks className="h-5 w-5 text-elec-yellow" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-semibold text-white group-hover:text-elec-yellow transition-colors">
                                {list.name}
                              </h3>
                              <p className="text-[11px] text-white mt-0.5">
                                Updated {formatRelativeTime(list.updated_at)}
                              </p>
                            </div>
                            {/* Actions */}
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDuplicateList(list); }}
                                aria-label="Duplicate"
                                className="h-9 w-9 rounded-full flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}
                                aria-label="Delete"
                                className="h-9 w-9 rounded-full flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Preview items */}
                          {previewItems.length > 0 && (
                            <div className="mb-3 pl-[52px]">
                              <p className="text-xs text-white line-clamp-2 leading-relaxed">
                                {previewItems.join(' · ')}
                                {list.items.length > 3 && ` +${list.items.length - 3} more`}
                              </p>
                            </div>
                          )}

                          {/* Bottom row — stats + open */}
                          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06]">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                                {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                              </span>
                              {total > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20">
                                  £{total.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                              <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                                <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </motion.main>
      </div>

      {/* New List Sheet */}
      <Sheet open={newListSheetOpen} onOpenChange={setNewListSheetOpen}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New List
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="e.g. Kitchen rewire, First fix materials..."
              className="h-11 text-base touch-manipulation"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateList();
              }}
            />
            <Button
              onClick={handleCreateList}
              disabled={!newListName.trim()}
              className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            >
              Create List
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
