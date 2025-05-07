
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";
import SupplierDealOfDay from "@/components/electrician-materials/SupplierDealOfDay";
import SupplierProductGrid from "@/components/electrician-materials/SupplierProductGrid";
import { supplierData, SupplierInfo } from "@/data/electrician/supplierData";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";

const SupplierMaterials = () => {
  const { supplierSlug } = useParams<{ supplierSlug: string }>();
  const [supplier, setSupplier] = useState<string>("");
  const [products, setProducts] = useState<MaterialItem[]>([]);
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfo | null>(null);

  useEffect(() => {
    if (supplierSlug) {
      // In a real application, this would be an API call
      const supplierKey = supplierSlug.toLowerCase();
      setSupplier(supplierData[supplierKey as keyof typeof supplierData]?.name || "Unknown Supplier");
      setProducts(productsBySupplier[supplierKey as keyof typeof productsBySupplier] || []);
      setSupplierInfo(supplierData[supplierKey as keyof typeof supplierData] || null);
    }
  }, [supplierSlug]);

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
          ElecMate is not affiliated with or endorsed by the suppliers listed. Prices and product availability may vary. We may earn a commission from qualifying purchases through affiliated links.
        </AlertDescription>
      </Alert>

      {/* Search bar */}
      <MaterialSearch />

      {/* Deal of the Day */}
      <SupplierDealOfDay supplierInfo={supplierInfo} />

      {/* Product Grid */}
      <SupplierProductGrid products={products} supplierName={supplier} />
    </div>
  );
};

export default SupplierMaterials;
