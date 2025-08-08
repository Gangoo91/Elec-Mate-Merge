
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowLeft, Filter } from "lucide-react";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";
import MaterialCard from "@/components/electrician-materials/MaterialCard";

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

  const allProducts = useMemo(() => Object.values(productsBySupplier).flat(), []);
  const products = useMemo(() => allProducts.filter((p) => matchesCategory(p, categoryId)), [allProducts, categoryId]);

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
        <Link to="/electrician/materials">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Materials
          </Button>
        </Link>
      </header>

      <section aria-labelledby="filters" className="hidden">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Additional filters coming soon
        </div>
      </section>

      {products.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No products found in this category yet. Showing curated items soon.</p>
          </CardContent>
        </Card>
      ) : (
        <section aria-label={`${meta.title} products`} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryMaterials;
