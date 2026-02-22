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
} from 'lucide-react';
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

  // Detail view for a selected list
  if (activeList) {
    const total = getEstimatedTotal(activeList);

    return (
      <div className="bg-background pb-20 sm:pb-8 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 mb-3 -ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedList(null)}
                className="touch-manipulation h-10 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Lists
              </Button>
              {fromSiteVisit && siteVisitId && (
                <Link to={`/electrician/site-visit/${siteVisitId}`}>
                  <Button variant="ghost" size="sm" className="touch-manipulation h-10 text-white">
                    Back to Site Visit
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{activeList.name}</h1>
                <p className="text-white text-sm">
                  {activeList.items.length} {activeList.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {activeList.items.length > 0 && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleSendToQuote(activeList)}
                      className="h-10 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                    >
                      <FileText className="h-4 w-4 mr-1.5" />
                      Send to Quote
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
                      className="h-10 touch-manipulation border-elec-yellow/30 text-white"
                    >
                      <BarChart3 className="h-4 w-4 mr-1.5" />
                      Compare Prices
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPasteSheetOpen(true)}
                  className="h-10 touch-manipulation text-white"
                >
                  <ClipboardPaste className="h-4 w-4 mr-1.5" />
                  Paste Materials
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 space-y-3">
          {/* Items */}
          {activeList.items.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-white mx-auto mb-3" />
              <p className="text-white mb-4">
                No items yet. Save products from the marketplace or paste a materials list.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/electrician/materials">
                  <Button className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Materials
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setPasteSheetOpen(true)}
                  className="h-11 touch-manipulation"
                >
                  <ClipboardPaste className="h-4 w-4 mr-2" />
                  Paste List
                </Button>
              </div>
            </div>
          )}

          {activeList.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50"
            >
              {/* Image */}
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-14 w-14 object-contain rounded-lg bg-white p-1 flex-shrink-0"
                />
              ) : (
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-white" />
                </div>
              )}

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white line-clamp-2">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {item.estimated_price && (
                    <span className="text-xs text-elec-yellow font-semibold">
                      £{(item.estimated_price * item.quantity).toFixed(2)}
                    </span>
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
                  className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center touch-manipulation disabled:opacity-30"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(activeList.id, item.id, item.quantity + 1)}
                  className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center touch-manipulation"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                {item.product_url && (
                  <a
                    href={item.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center touch-manipulation hover:border-elec-yellow/50"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <button
                  onClick={() => removeItem(activeList.id, item.id)}
                  className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center touch-manipulation hover:border-red-500/50 text-red-400"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          {activeList.items.length > 0 && (
            <div className="p-4 bg-card rounded-xl border border-elec-yellow/30 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Estimated Total</span>
                <span className="text-xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-white mt-1">
                {activeList.items.length} {activeList.items.length === 1 ? 'item' : 'items'}{' '}
                &middot; prices may have changed
              </p>
            </div>
          )}
        </div>

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

  // Lists overview
  return (
    <div className="bg-background pb-20 sm:pb-8 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          {fromSiteVisit && siteVisitId ? (
            <Link to={`/electrician/site-visit/${siteVisitId}`}>
              <Button
                variant="ghost"
                size="sm"
                className="mb-3 -ml-2 touch-manipulation h-10 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Site Visit
              </Button>
            </Link>
          ) : (
            <Link to="/electrician/materials">
              <Button
                variant="ghost"
                size="sm"
                className="mb-3 -ml-2 touch-manipulation h-10 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Materials Marketplace
              </Button>
            </Link>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <ListChecks className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">My Lists</h1>
                <p className="text-white text-sm">
                  {lists.length} {lists.length === 1 ? 'list' : 'lists'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowNewListInput(true)}
              className="h-10 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              New List
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 space-y-3">
        {/* New list input */}
        {showNewListInput && (
          <div className="flex gap-2">
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
          <div className="text-center py-16">
            <ListChecks className="h-14 w-14 text-white mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No lists yet</h2>
            <p className="text-white mb-6 max-w-sm mx-auto">
              Create a list to start collecting materials for your jobs. You can also paste a text
              list to match products automatically.
            </p>
            <Button
              onClick={() => setShowNewListInput(true)}
              className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </Button>
          </div>
        )}

        {/* List cards */}
        {!isLoading &&
          lists.map((list) => {
            const total = getEstimatedTotal(list);

            return (
              <button
                key={list.id}
                onClick={() => setSelectedList(list)}
                className={cn(
                  'w-full text-left p-4 bg-card rounded-xl border border-border/50 touch-manipulation',
                  'hover:border-elec-yellow/50 active:scale-[0.98] transition-all'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{list.name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(list.id);
                    }}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-red-500/10 text-red-400 touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <span>
                    {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                  </span>
                  {total > 0 && (
                    <>
                      <span>&middot;</span>
                      <span className="text-elec-yellow font-semibold">£{total.toFixed(2)}</span>
                    </>
                  )}
                  <span>&middot;</span>
                  <span>{formatRelativeTime(list.updated_at)}</span>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
