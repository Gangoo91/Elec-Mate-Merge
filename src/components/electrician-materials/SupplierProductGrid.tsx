
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import { MaterialItem } from "@/data/electrician/productData";
import { Folder } from "lucide-react";

interface SupplierProductGridProps {
  products: MaterialItem[];
  supplierName: string;
}

const SupplierProductGrid = ({ products, supplierName }: SupplierProductGridProps) => {
  // Group products by category for better organization
  const productsByCategory: Record<string, MaterialItem[]> = {};
  
  products.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  // If filtering is active, don't show category headers
  const showCategoryHeaders = Object.keys(productsByCategory).length > 1;

  return (
    <div className="space-y-8">
      {products.length > 0 ? (
        showCategoryHeaders ? (
          // Show products grouped by category
          Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Folder className="h-5 w-5 text-elec-yellow" />
                {category}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map(item => (
                  <MaterialCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show all products without category headers (when filtering)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(item => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        )
      ) : (
        <div className="py-10 text-center border border-dashed border-elec-yellow/20 rounded-lg">
          <p className="text-muted-foreground">No products found for this supplier</p>
        </div>
      )}
    </div>
  );
};

export default SupplierProductGrid;
