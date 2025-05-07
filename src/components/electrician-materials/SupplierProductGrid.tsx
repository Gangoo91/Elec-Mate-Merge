
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import { MaterialItem } from "@/data/electrician/productData";

interface SupplierProductGridProps {
  products: MaterialItem[];
  supplierName: string;
}

const SupplierProductGrid = ({ products, supplierName }: SupplierProductGridProps) => {
  return (
    <div className="space-y-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(item => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center border border-dashed border-elec-yellow/20 rounded-lg">
          <p className="text-muted-foreground">No products found for this supplier</p>
        </div>
      )}
    </div>
  );
};

export default SupplierProductGrid;
