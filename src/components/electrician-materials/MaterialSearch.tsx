
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MaterialItem } from "@/data/electrician/productData";

const SUPPLIERS = [
  { slug: "screwfix", name: "Screwfix" },
  { slug: "city-electrical-factors", name: "City Electrical Factors" },
  { slug: "electricaldirect", name: "ElectricalDirect" },
  { slug: "toolstation", name: "Toolstation" },
] as const;

type SupplierSlug = typeof SUPPLIERS[number]["slug"];

interface MaterialSearchProps {
  supplierSlug?: SupplierSlug | string;
  onResults?: (items: MaterialItem[], supplierName: string) => void;
}

const MaterialSearch = ({ supplierSlug, onResults }: MaterialSearchProps) => {
  const initialSupplier = (supplierSlug?.toLowerCase() as SupplierSlug) || "electricaldirect";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierSlug>(initialSupplier);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);

  const supplierName = useMemo(() => SUPPLIERS.find(s => s.slug === selectedSupplier)?.name || "Supplier", [selectedSupplier]);

  const runSearch = async (term: string) => {
    if (!term || term.trim().length < 2) return;

    const cacheKey = `mat-search:${selectedSupplier}:${term.toLowerCase()}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      onResults?.(parsed.products || [], parsed.supplier || supplierName);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-supplier-products', {
        body: { supplierSlug: selectedSupplier, searchTerm: term }
      });
      if (error) throw new Error(error.message);

      const items = Array.isArray(data?.products) ? data.products as MaterialItem[] : [];
      onResults?.(items, data?.supplier || supplierName);
      sessionStorage.setItem(cacheKey, JSON.stringify(data ?? {}));
    } catch (e) {
      console.error("Live search failed", e);
      toast({ title: "Search failed", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!searchQuery) return;

    debounceRef.current = window.setTimeout(() => runSearch(searchQuery), 450);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [searchQuery, selectedSupplier]);

  return (
    <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`Search ${supplierName}…`} 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search materials"
          />
        </div>
        <select
          aria-label="Select supplier"
          className="bg-elec-card border-elec-yellow/30 rounded-md px-2 py-2 text-sm"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value as SupplierSlug)}
        >
          {SUPPLIERS.map(s => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button className="flex-1" variant="default" onClick={() => runSearch(searchQuery)} disabled={isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </Button>
        <Button className="flex-1" variant="outline">Advanced</Button>
      </div>
    </div>
  );
};

export default MaterialSearch;
