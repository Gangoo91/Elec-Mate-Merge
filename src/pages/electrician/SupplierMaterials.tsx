
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, AlertTriangle, ExternalLink, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";
import SupplierDealOfDay from "@/components/electrician-materials/SupplierDealOfDay";
import SupplierProductGrid from "@/components/electrician-materials/SupplierProductGrid";
import { supplierData, SupplierInfo } from "@/data/electrician/supplierData";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";
import { Card, CardContent } from "@/components/ui/card";

const SupplierMaterials = () => {
  const { supplierSlug } = useParams<{ supplierSlug: string }>();
  const [supplier, setSupplier] = useState<string>("");
  const [products, setProducts] = useState<MaterialItem[]>([]);
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (supplierSlug) {
      // In a real application, this would be an API call
      const supplierKey = supplierSlug.toLowerCase();
      setSupplier(supplierData[supplierKey as keyof typeof supplierData]?.name || "Unknown Supplier");
      setProducts(productsBySupplier[supplierKey as keyof typeof productsBySupplier] || []);
      setSupplierInfo(supplierData[supplierKey as keyof typeof supplierData] || null);
      setSelectedCategory("all"); // Reset category filter when changing supplier
    }
  }, [supplierSlug]);

  // Get unique categories for this supplier's products
  const categories = ["all", ...new Set(products.map(item => item.category))];

  // Filter products by selected category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  // Create an external URL for the supplier's website
  const getSupplierWebsiteUrl = () => {
    if (!supplierSlug) return "#";
    
    switch (supplierSlug.toLowerCase()) {
      case "screwfix":
        return "https://www.screwfix.com";
      case "city-electrical-factors":
        return "https://www.cef.co.uk";
      case "electricaldirect":
        return "https://www.electricaldirect.co.uk";
      case "toolstation":
        return "https://www.toolstation.com";
      default:
        return "#";
    }
  };

  if (!supplierInfo) {
    return <div className="py-10 text-center">Loading supplier information...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            {supplier} Products
          </h1>
          <p className="text-muted-foreground mt-1">
            {supplierInfo.description}
          </p>
        </div>
        <Link to="/electrician/materials">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Materials
          </Button>
        </Link>
      </div>

      {/* Disclaimer */}
      <Alert className="bg-elec-gray border-elec-yellow/30">
        <AlertTriangle className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-sm">
          ElecMate is not affiliated with or endorsed by the suppliers listed. Prices and product availability may vary.
        </AlertDescription>
      </Alert>

      {/* Search bar */}
      <MaterialSearch />

      {/* External catalog link */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Need the full catalog?</h3>
              <p className="text-sm text-muted-foreground">
                This is a curated selection of popular products. Visit the official website for the complete range.
              </p>
            </div>
            <a href={getSupplierWebsiteUrl()} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2">
                Visit {supplier} Website
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-elec-yellow text-black" : ""}
          >
            {category === "all" ? "All Products" : category}
          </Button>
        ))}
      </div>

      {/* Deal of the Day */}
      <SupplierDealOfDay supplierInfo={supplierInfo} />

      {/* Featured Deals Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-elec-yellow" />
          Featured Deals
        </h2>
        <p className="text-sm text-muted-foreground">
          These are today's best deals from {supplier}. Updated daily.
        </p>
      </div>

      {/* Product Grid */}
      <SupplierProductGrid products={filteredProducts} supplierName={supplier} />
    </div>
  );
};

export default SupplierMaterials;
