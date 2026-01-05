import { useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Upload, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  PoundSterling,
  ChevronRight,
  X
} from "lucide-react";
import { useSearchPriceBook, usePriceBookStats, useCreatePriceBookItem } from "@/hooks/useFinance";
import { ImportPriceBookDialog } from "../dialogs/ImportPriceBookDialog";
import { toast } from "sonner";

const CATEGORIES = ['All', 'Cable', 'Accessories', 'Fixings', 'Lighting', 'Switches & Sockets', 'Consumer Units', 'Tools', 'Testing', 'Safety', 'Other'];

export function PriceBookSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Quick add form state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemBuyPrice, setNewItemBuyPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Cable");

  // Fetch stats for header
  const { data: stats, isLoading: statsLoading } = usePriceBookStats();
  
  // Search with pagination
  const {
    data: searchResults,
    isLoading: searchLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchPriceBook(search, category === 'All' ? undefined : category);

  const createItem = useCreatePriceBookItem();

  const items = searchResults?.pages.flatMap(p => p.items) || [];
  const totalFound = searchResults?.pages[0]?.total || 0;

  const handleQuickAdd = async () => {
    if (!newItemName.trim()) {
      toast.error("Please enter a material name");
      return;
    }
    
    const buyPrice = parseFloat(newItemBuyPrice) || 0;
    const sellPrice = buyPrice * 1.3; // 30% markup default

    try {
      await createItem.mutateAsync({
        name: newItemName.trim(),
        buy_price: buyPrice,
        sell_price: sellPrice,
        category: newItemCategory,
        unit: 'each',
        supplier_id: null,
        stock_level: 0,
        reorder_level: 0,
        sku: null,
      });
      
      toast.success("Material added to price book");
      setNewItemName("");
      setNewItemBuyPrice("");
      setShowQuickAdd(false);
    } catch (error) {
      toast.error("Failed to add material");
    }
  };

  return (
    <div className="space-y-4 pb-24">
      <SectionHeader
        title="Price Book"
        description="Search materials and prices"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowImportDialog(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button onClick={() => setShowQuickAdd(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        }
      />

      {/* Quick Add Form */}
      {showQuickAdd && (
        <Card className="p-4 space-y-4 border-elec-yellow">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Quick Add Material</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowQuickAdd(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Input 
            placeholder="Material name" 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            autoFocus
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input 
                type="number" 
                placeholder="Buy price" 
                value={newItemBuyPrice}
                onChange={(e) => setNewItemBuyPrice(e.target.value)}
                className="pl-7"
                step="0.01"
              />
            </div>
            <Select value={newItemCategory} onValueChange={setNewItemCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {newItemBuyPrice && (
            <p className="text-sm text-muted-foreground">
              Sell price: £{(parseFloat(newItemBuyPrice) * 1.3).toFixed(2)} (30% markup)
            </p>
          )}
          
          <Button 
            className="w-full" 
            onClick={handleQuickAdd}
            disabled={createItem.isPending || !newItemName.trim()}
          >
            {createItem.isPending ? 'Adding...' : 'Add to Price Book'}
          </Button>
        </Card>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Package className="h-4 w-4 text-elec-yellow" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-lg font-semibold">
                {statsLoading ? <Skeleton className="h-6 w-12" /> : stats?.totalItems.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Markup</p>
              <p className="text-lg font-semibold">
                {statsLoading ? <Skeleton className="h-6 w-12" /> : `${stats?.avgMarkup}%`}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-lg font-semibold">
                {statsLoading ? <Skeleton className="h-6 w-12" /> : stats?.lowStock}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <PoundSterling className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Stock Value</p>
              <p className="text-lg font-semibold">
                {statsLoading ? <Skeleton className="h-6 w-12" /> : `£${stats?.stockValue.toLocaleString()}`}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search materials, SKUs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Category Pills */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap px-3 py-1.5"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Results */}
      {search.length < 2 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            Type at least 2 characters to search
          </p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Or ask your voice assistant for a price lookup
          </p>
        </div>
      ) : searchLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No items found</p>
          <Button 
            variant="link" 
            onClick={() => setShowQuickAdd(true)}
            className="mt-2"
          >
            Add new item
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {totalFound.toLocaleString()} results
          </p>
          
          {items.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="p-3 flex items-center gap-3 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.category} {item.sku && `• ${item.sku}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-elec-yellow">£{item.sell_price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    Cost: £{item.buy_price.toFixed(2)}
                  </p>
                </div>
                <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
              </div>
              
              {expandedId === item.id && (
                <div className="px-3 pb-3 pt-0 border-t border-border mt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                    <div>
                      <p className="text-muted-foreground">Markup</p>
                      <p className="font-medium">{item.markup ? `${item.markup.toFixed(0)}%` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unit</p>
                      <p className="font-medium">{item.unit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <p className={`font-medium ${item.stock_level <= item.reorder_level ? 'text-amber-500' : ''}`}>
                        {item.stock_level}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supplier</p>
                      <p className="font-medium">{item.suppliers?.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      Add to Quote
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}

          {/* Load More */}
          {hasNextPage && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </Button>
          )}
        </div>
      )}

      {/* FAB */}
      <FloatingActionButton
        icon={<Plus className="h-6 w-6" />}
        onClick={() => setShowQuickAdd(true)}
        label="Add Material"
      />

      {/* Import Dialog */}
      <ImportPriceBookDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
      />
    </div>
  );
}
