import { useMaterialsFromCache } from "@/hooks/useToolsForMaterials";
import MaterialCard from "./MaterialCard";
import { Loader2 } from "lucide-react";

interface CategoryProductGridProps {
  categoryId: string;
  categoryTitle: string;
}

const CategoryProductGrid = ({ categoryId, categoryTitle }: CategoryProductGridProps) => {
  const { data: materials, isLoading, error } = useMaterialsFromCache(categoryId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading {categoryTitle} products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center border border-dashed border-red-500/20 rounded-lg bg-red-500/5">
        <p className="text-red-400">Failed to load {categoryTitle} products</p>
        <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="py-10 text-center border border-dashed border-elec-yellow/20 rounded-lg">
        <p className="text-muted-foreground">No {categoryTitle} products found</p>
        <p className="text-sm text-muted-foreground mt-2">Products will be updated weekly</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{categoryTitle}</h2>
        <span className="text-sm text-muted-foreground">
          {materials.length} products found
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((material) => (
          <MaterialCard key={material.id} item={{
            ...material,
            id: typeof material.id === 'string' ? parseInt(material.id) || 0 : material.id
          }} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductGrid;