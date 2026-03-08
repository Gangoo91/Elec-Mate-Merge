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
  ExternalLink,
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

/**
 * Materials Lists page — manage saved product lists.
 * Route: /electrician/materials/lists
 */
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
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [pasteSheetOpen, setPasteSheetOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState('');

  // Keep selectedList in sync with lists state
  const activeList = selectedList ? lists.find((l) => l.id === selectedList.id) || null : null;

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    await createList(newListName.trim());
    setNewListName('');
    setShowNewListInput(false);
  };

  const handleDeleteList = async (listId: string) => {
    await deleteList(listId);
    if (selectedList?.id === listId) {
      setSelectedList(null);
    }
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

  const getEstimatedTotal = (list: MaterialsList): number => {
    return list.items.reduce((sum, item) => {
      return sum + (item.estimated_price || 0) * item.quantity;
    }, 0);
  };

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
    sessionStorage.setItem(materialsSessionId, JSON.stringify({ materialsData }));
    navigate(`/electrician/quote-builder/create?materialsSessionId=${materialsSessionId}`);
  };

  // ─── Detail view for a selected list ─────────────────────────────────────────
  if (activeList) {
    const total = getEstimatedTotal(activeList);

    return (
      <div className="bg-background min-h-screen flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between gap-2">
            <button
              onClick={() => setSelectedList(null)}
              className="flex items-center gap-1.5 text-white active:opacity-70 transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="text-sm font-semibold text-white truncate">{activeList.name}</h1>
              <p className="text-xs text-white">
                {activeList.items.length} {activeList.items.length === 1 ? 'item' : 'items'}
                {activeList.items.length > 0 && ` · £${getEstimatedTotal(activeList).toFixed(2)}`}
              </p>
            </div>

            {/* Paste icon — only show when list has items (empty state has its own CTA) */}
            {activeList.items.length > 0 && (
              <button
                onClick={() => setPasteSheetOpen(true)}
                className="h-11 w-11 rounded-xl flex items-center justify-center text-white active:bg-white/10 touch-manipulation flex-shrink-0"
              >
                <ClipboardPaste className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-36 sm:pb-28">
          {/* Action buttons row — only when list has items */}
          {activeList.items.length > 0 && (
            <div className="px-4 py-3 flex gap-2 border-b border-white/[0.06]">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPasteSheetOpen(true)}
                className="flex-1 h-11 touch-manipulation border-white/20 text-white"
              >
                <ClipboardPaste className="h-4 w-4 mr-1.5" />
                Paste Materials
              </Button>
              <Button
                size="sm"
                variant="outline"
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
                className="flex-1 h-11 touch-manipulation border-elec-yellow/30 text-white"
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                Compare Prices
              </Button>
            </div>
          )}

          <div className="px-4 py-3 space-y-2">
            {/* Empty state */}
            {activeList.items.length === 0 && (
              <div className="text-center py-14">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <Package className="h-10 w-10 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">Add Your First Items</h3>
                <p className="text-white text-sm mb-6 max-w-xs mx-auto">
                  Browse the marketplace to save products, or paste a materials list to match items
                  automatically.
                </p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <Link to="/electrician/materials" className="w-full">
                    <Button className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Marketplace
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setPasteSheetOpen(true)}
                    className="w-full h-11 touch-manipulation border-white/20 text-white"
                  >
                    <ClipboardPaste className="h-4 w-4 mr-2" />
                    Paste Materials
                  </Button>
                </div>
              </div>
            )}

            {/* Items */}
            {activeList.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] active:bg-white/[0.05] transition-colors"
              >
                {/* Image */}
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-14 w-14 object-contain rounded-lg bg-white p-1 flex-shrink-0"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white line-clamp-2">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {editingPriceId === item.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-elec-yellow">£</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          step="0.01"
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
                          className="w-20 h-7 text-xs bg-[#1a1a1e] border border-elec-yellow/40 rounded px-1.5 text-elec-yellow font-semibold touch-manipulation focus:outline-none focus:ring-1 focus:ring-elec-yellow/50"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingPriceId(item.id);
                          setPriceInput(
                            item.estimated_price ? item.estimated_price.toFixed(2) : ''
                          );
                        }}
                        className="text-xs font-semibold touch-manipulation"
                      >
                        {item.estimated_price ? (
                          <span className="text-elec-yellow">
                            £{(item.estimated_price * item.quantity).toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-white">Set price</span>
                        )}
                      </button>
                    )}
                    {item.supplier && <span className="text-xs text-white">{item.supplier}</span>}
                    {!item.matched && <span className="text-xs text-orange-400">Unmatched</span>}
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => updateItemQuantity(activeList.id, item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center touch-manipulation disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-medium tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItemQuantity(activeList.id, item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center touch-manipulation"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(activeList.id, item.id)}
                  aria-label="Remove item"
                  className="h-9 w-9 rounded-full flex items-center justify-center touch-manipulation text-red-400 active:bg-red-500/10 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky total footer */}
        {activeList.items.length > 0 && (
          <div className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Estimated Total</p>
                <p className="text-xs text-white">
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

        {/* Paste Materials Sheet */}
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
                placeholder={
                  '10x 2.5mm T&E 100m\n5x double sockets\nMCB 32A Type B\nLED downlights x 6'
                }
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
                  Compare Prices
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
    <div className="bg-background pb-20 sm:pb-8 min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2.5 flex items-center justify-between gap-2">
          {fromSiteVisit && siteVisitId ? (
            <Link
              to={`/electrician/site-visit/${siteVisitId}`}
              className="flex items-center gap-1.5 text-white active:opacity-70 transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Site Visit</span>
            </Link>
          ) : (
            <Link
              to="/electrician/materials"
              className="flex items-center gap-1.5 text-white active:opacity-70 transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Marketplace</span>
            </Link>
          )}

          <div className="flex-1 min-w-0 text-center sm:hidden">
            <span className="text-sm font-semibold text-white">My Lists</span>
          </div>

          <Button
            onClick={() => setShowNewListInput(true)}
            size="sm"
            className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-3 flex-shrink-0"
          >
            <Plus className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">New List</span>
          </Button>
        </div>
      </div>

      {/* Hero + quick links */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <ListChecks className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">My Lists</h1>
            <p className="text-sm text-white">
              {lists.length} {lists.length === 1 ? 'list' : 'lists'}
            </p>
          </div>
        </div>

        {/* Quick links to Rate Card + Price Book */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/electrician/rate-card"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors"
          >
            <Receipt className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Rate Card</p>
              <p className="text-xs text-white">Labour prices</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
          </Link>
          <Link
            to="/electrician/price-book"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] transition-colors"
          >
            <BookOpen className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Price Book</p>
              <p className="text-xs text-white">Materials cost</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
          </Link>
        </div>
      </div>

      <div className="px-4 space-y-2">
        {/* New list input */}
        {showNewListInput && (
          <div className="flex gap-2 pb-2">
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="List name..."
              className="h-11 flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateList();
                if (e.key === 'Escape') {
                  setShowNewListInput(false);
                  setNewListName('');
                }
              }}
            />
            <Button
              onClick={handleCreateList}
              disabled={!newListName.trim()}
              className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            >
              Create
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && lists.length === 0 && !showNewListInput && (
          <div className="text-center py-14">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <ListChecks className="h-10 w-10 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Start Your First List</h2>
            <p className="text-white text-sm mb-6 max-w-xs mx-auto">
              Collect materials for jobs, compare prices across suppliers, and send straight to
              quotes.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setShowNewListInput(true)}
                className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create List
              </Button>
              <Link to="/electrician/materials">
                <Button
                  variant="outline"
                  className="h-11 touch-manipulation border-white/20 text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* List cards — staggered entrance */}
        {!isLoading && lists.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
            }}
            className="space-y-2"
          >
            <AnimatePresence>
              {lists.map((list) => {
                const total = getEstimatedTotal(list);

                return (
                  <motion.button
                    key={list.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.25, ease: 'easeOut' },
                      },
                    }}
                    exit={{ opacity: 0, x: -60, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedList(list)}
                    className={cn(
                      'w-full text-left p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] touch-manipulation',
                      'active:scale-[0.98] transition-all lg:hover:border-white/20 lg:hover:bg-white/[0.05]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon circle */}
                      <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <ListChecks className="h-5 w-5 text-yellow-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white line-clamp-2 leading-snug">
                          {list.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-white mt-0.5 flex-wrap">
                          <span>
                            {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                          </span>
                          {total > 0 && (
                            <>
                              <span>&middot;</span>
                              <span className="text-elec-yellow font-semibold">
                                £{total.toFixed(2)}
                              </span>
                            </>
                          )}
                          <span>&middot;</span>
                          <span>{formatRelativeTime(list.updated_at)}</span>
                        </div>
                      </div>

                      {/* Actions — just delete + chevron */}
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateList(list);
                          }}
                          aria-label="Duplicate list"
                          className="h-9 w-9 rounded-full flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list.id);
                          }}
                          aria-label="Delete list"
                          className="h-9 w-9 rounded-full flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
