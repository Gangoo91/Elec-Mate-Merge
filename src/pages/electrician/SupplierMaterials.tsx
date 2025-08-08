
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, AlertTriangle, ExternalLink, Star, BellDot, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";
import SupplierDealOfDay from "@/components/electrician-materials/SupplierDealOfDay";
import SupplierProductGrid from "@/components/electrician-materials/SupplierProductGrid";
import { supplierData, SupplierInfo } from "@/data/electrician/supplierData";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const SupplierMaterials = () => {
  const { supplierSlug } = useParams<{ supplierSlug: string }>();
  const [supplier, setSupplier] = useState<string>("");
  const [products, setProducts] = useState<MaterialItem[]>([]);
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfo | null>(null);
  const [isNotifying, setIsNotifying] = useState<boolean>(false);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);

  useEffect(() => {
    if (supplierSlug) {
      // In a real application, this would be an API call
      const supplierKey = supplierSlug.toLowerCase();
      setSupplier(supplierData[supplierKey as keyof typeof supplierData]?.name || "Unknown Supplier");
      setProducts(productsBySupplier[supplierKey as keyof typeof productsBySupplier] || []);
      setSupplierInfo(supplierData[supplierKey as keyof typeof supplierData] || null);
      
      // Check if user is already subscribed to notifications (would use localStorage or backend in production)
      const storedNotifyState = localStorage.getItem(`notify-${supplierKey}`);
      setIsNotifying(storedNotifyState === 'true');
    }
  }, [supplierSlug]);

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

  const toggleNotifications = () => {
    if (!supplierSlug) return;
    
    const newState = !isNotifying;
    setIsNotifying(newState);
    localStorage.setItem(`notify-${supplierSlug.toLowerCase()}`, String(newState));
    
    toast({
      title: newState ? "Notifications Enabled" : "Notifications Disabled",
      description: newState 
        ? `You'll be notified about new deals from ${supplier}.` 
        : `You won't receive notifications from ${supplier}.`,
      duration: 3000,
    });
  };

  const fetchLiveDeals = async () => {
    if (!supplierSlug) return;
    setIsFetchingLive(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-supplier-products', {
        body: { supplierSlug: supplierSlug.toLowerCase(), searchTerm: "electrical" }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.products && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
        toast({
          title: "Live deals loaded",
          description: `Showing latest products from ${data.supplier || supplier}.`,
        });
      } else {
        toast({
          title: "No live deals found",
          description: "Showing curated products for now.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error fetching live deals:", err);
      toast({
        title: "Failed to load live deals",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsFetchingLive(false);
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
            {supplier} Deals
          </h1>
          <p className="text-muted-foreground mt-1">
            {supplierInfo.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleNotifications}
            className={isNotifying ? "border-elec-yellow text-elec-yellow" : ""}
          >
            <BellDot className={`h-4 w-4 ${isNotifying ? "text-elec-yellow" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            onClick={fetchLiveDeals}
            disabled={isFetchingLive}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isFetchingLive ? "animate-spin" : ""}`} />
            {isFetchingLive ? "Fetching…" : "Fetch Live Deals"}
          </Button>
          <Link to="/electrician/materials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Materials
            </Button>
          </Link>
        </div>
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

      {/* Deal of the Day */}
      <SupplierDealOfDay supplierInfo={supplierInfo} />

      {/* Featured Deals Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-elec-yellow" />
          Today's Best Deals
        </h2>
        <p className="text-sm text-muted-foreground">
          These are today's best deals from {supplier}. Updated daily.
        </p>
      </div>

      {/* Product Grid */}
      <SupplierProductGrid products={products} supplierName={supplier} />
    </div>
  );
};

export default SupplierMaterials;
