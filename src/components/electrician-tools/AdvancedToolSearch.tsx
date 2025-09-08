import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ToolItem } from "@/hooks/useToolsData";

const TOOL_SUPPLIERS = [
  { slug: "screwfix", name: "Screwfix" },
  { slug: "toolstation", name: "Toolstation" },
  { slug: "electricaldirect", name: "ElectricalDirect" },
  { slug: "rscatalog", name: "RS Components" },
] as const;

type ToolSupplierSlug = typeof TOOL_SUPPLIERS[number]["slug"];

interface AdvancedToolSearchProps {
  supplierSlug?: ToolSupplierSlug | string;
  onResults?: (items: ToolItem[], supplierName: string) => void;
}

const AdvancedToolSearch = ({ supplierSlug, onResults }: AdvancedToolSearchProps) => {
  const initialSupplier = (supplierSlug?.toLowerCase() as ToolSupplierSlug) || "screwfix";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<ToolSupplierSlug>(initialSupplier);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);

  const supplierName = useMemo(() => TOOL_SUPPLIERS.find(s => s.slug === selectedSupplier)?.name || "Supplier", [selectedSupplier]);

  const runSearch = async (term: string) => {
    if (!term || term.trim().length < 2) return;

    const cacheKey = `tool-search:${selectedSupplier}:${term.toLowerCase()}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      onResults?.(parsed.tools || [], parsed.supplier || supplierName);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-supplier-tools', {
        body: { supplierSlug: selectedSupplier, searchTerm: term }
      });
      if (error) throw new Error(error.message);

      const items = Array.isArray(data?.tools) ? data.tools as ToolItem[] : [];
      onResults?.(items, data?.supplier || supplierName);
      sessionStorage.setItem(cacheKey, JSON.stringify(data ?? {}));
    } catch (e) {
      console.error("Tool search failed", e);
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
            placeholder={`Search ${supplierName} tools…`} 
            className="pl-8 bg-elec-dark/50 border-elec-yellow/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tools"
          />
        </div>
        <select
          aria-label="Select tool supplier"
          className="bg-elec-dark border-elec-yellow/30 rounded-md px-2 py-2 text-sm text-white z-40 relative"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value as ToolSupplierSlug)}
        >
          {TOOL_SUPPLIERS.map(s => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button className="flex-1" variant="default" onClick={() => runSearch(searchQuery)} disabled={isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </Button>
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={() => window.location.href = `/electrician/tools/compare?q=${encodeURIComponent(searchQuery)}`}
          disabled={!searchQuery.trim()}
        >
          Compare Tools
        </Button>
      </div>
    </div>
  );
};

export default AdvancedToolSearch;