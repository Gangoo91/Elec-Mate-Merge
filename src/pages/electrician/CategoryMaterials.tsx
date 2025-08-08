
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowLeft, Filter, RefreshCw } from "lucide-react";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CATEGORY_META: Record<string, { title: string; description: string } > = {
  cables: {
    title: "Cables & Wiring",
    description: "Twin & Earth, SWA, flex, data and control cabling"
  },
  components: {
    title: "Electrical Components",
    description: "Consumer units, MCBs, RCDs, isolators and accessories"
  },
  protection: {
    title: "Protection Equipment",
    description: "Earthing, surge protection and circuit protection"
  },
  accessories: {
    title: "Installation Accessories",
    description: "Junction boxes, glands, trunking and fixings"
  },
  lighting: {
    title: "Lighting Solutions",
    description: "LED downlights, battens, emergency and controls"
  },
  tools: {
    title: "Electrical Tools",
    description: "Testers, hand tools and power tools for electricians"
  }
};

function matchesCategory(item: MaterialItem, categoryId: string) {
  const hay = `${item.category} ${item.name}`.toLowerCase();
  switch (categoryId) {
    case "cables":
      return /cable|wire|swa|t&e|t\s*&\s*e|flex|cat\d|data/.test(hay);
    case "components":
      return /consumer|rcd|rcbo|mcb|isolator|breaker|protector|fuse/.test(hay);
    case "protection":
      return /surge|rcd|breaker|earthing|earth|protector|bond|sp\d?d?/.test(hay);
    case "accessories":
      return /junction|gland|trunk|tray|clip|box|plate|socket|switch|backbox/.test(hay);
    case "lighting":
      return /light|led|batten|downlight|lamp|bulb|emergency/.test(hay);
    case "tools":
      return /tester|test|tool|screwdriver|pliers|multimeter|drill/.test(hay);
    default:
      return false;
  }
}

const CategoryMaterials = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const meta = CATEGORY_META[categoryId] || { title: "Materials", description: "Browse curated products by category" };

  // Suppliers supported by the edge function
  const SUPPLIERS = [
    "screwfix",
    "city-electrical-factors",
    "electricaldirect",
    "toolstation",
  ] as const;

  // Quick search seeds per category to improve hit-rate
  const CATEGORY_QUERIES: Record<string, string[]> = {
    cables: ["2.5mm twin and earth 100m"],
    components: ["consumer unit"],
    protection: ["rcbo"],
    accessories: ["junction box"],
    lighting: ["led downlight"],
    tools: ["multimeter"],
  };

  const allProducts = useMemo(() => Object.values(productsBySupplier).flat(), []);
  const products = useMemo(() => allProducts.filter((p) => matchesCategory(p, categoryId)), [allProducts, categoryId]);

  type LiveItem = MaterialItem & { productUrl?: string };
  const [liveProducts, setLiveProducts] = useState<LiveItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const displayProducts = liveProducts.length > 0 ? liveProducts : products;

  const fetchLiveDeals = async () => {
    setIsFetching(true);
    try {
      const seeds = CATEGORY_QUERIES[categoryId] || [meta.title];
      const term = seeds[0] || meta.title;
      const tasks: Promise<any>[] = [];
      for (const supplier of SUPPLIERS) {
        tasks.push(
          supabase.functions.invoke('scrape-supplier-products', {
            body: { supplierSlug: supplier, searchTerm: term }
          })
        );
      }
      const responses = await Promise.allSettled(tasks);
      const collected: LiveItem[] = [];
      for (const r of responses) {
        if (r.status === 'fulfilled') {
          const d = r.value?.data;
          if (Array.isArray(d?.products)) {
            collected.push(...(d.products as LiveItem[]));
          }
        }
      }
      // Filter to category and dedupe by productUrl or name+supplier
      const inCat = collected.filter((p) => matchesCategory(p, categoryId));
      const deduped: LiveItem[] = [];
      const seen = new Set<string>();
      for (const item of inCat) {
        const key = item.productUrl || `${item.supplier}|${item.name}`;
        if (key && !seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      }
      setLiveProducts(deduped);
      toast({ title: 'Live deals loaded', description: `Fetched ${deduped.length} items` });
    } catch (e) {
      console.error(e);
      toast({ title: 'Failed to fetch', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setIsFetching(false);
    }
  };

  const pageTitle = `${meta.title} | ElecMate Electrical Materials`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant guidance.`.slice(0, 160);

  return (
    <main className="space-y-6 animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            {meta.title}
          </h1>
          <p className="text-muted-foreground mt-1">{meta.description}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/electrician/materials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <Link to="/electrician/trade-essentials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Trade Essentials
            </Button>
          </Link>
          <Button variant="outline" onClick={fetchLiveDeals} disabled={isFetching} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Fetching…' : 'Fetch Live Deals'}
          </Button>
        </div>
      </header>

      <section aria-labelledby="filters" className="hidden">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Additional filters coming soon
        </div>
      </section>

      {displayProducts.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No products found in this category yet. Showing curated items soon.</p>
          </CardContent>
        </Card>
      ) : (
        <section aria-label={`${meta.title} products`} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryMaterials;
