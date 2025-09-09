import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, ExternalLink, Star, Package, Loader2, Users, Bot, BarChart3 } from "lucide-react";
import { useCategoryMaterials } from "@/hooks/useCategoryMaterials";
import { useMaterialsComparison } from "@/hooks/useMaterialsComparison";
import MaterialCard from "./MaterialCard";

const MaterialsCategoryProductList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [supplierFilter, setSupplierFilter] = useState("all");

  const { materials, categoryData, isLoading, error, refetch } = useCategoryMaterials(categoryId || "");
  const { 
    addToComparison, 
    removeFromComparison, 
    isInComparison, 
    selectedCount, 
    selectedMaterialData,
    clearComparison 
  } = useMaterialsComparison();

  // Filter and sort materials
  const filteredMaterials = materials
    ?.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSupplier = supplierFilter === "all" || material.supplier === supplierFilter;
      return matchesSearch && matchesSupplier;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          const priceA = parseFloat(a.price.replace(/[£,]/g, ''));
          const priceB = parseFloat(b.price.replace(/[£,]/g, ''));
          return priceA - priceB;
        case "supplier":
          return a.supplier.localeCompare(b.supplier);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Get unique suppliers for filter
  const suppliers = [...new Set(materials?.map(m => m.supplier))].sort();

  if (error) {
    return (
      <div className="min-h-screen bg-elec-dark text-white p-6">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/materials">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
          
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Failed to Load Products</h2>
            <p className="text-muted-foreground mb-4">There was an error loading the materials for this category.</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to="/materials">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {categoryData?.title || categoryId?.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-muted-foreground">
                {isLoading ? 'Loading...' : `${filteredMaterials?.length || 0} products found`}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Comparison Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" disabled={selectedCount === 0}>
                <Users className="h-4 w-4 mr-2" />
                Compare ({selectedCount}/3)
              </Button>
              <Button variant="outline" size="sm" disabled={selectedCount === 0}>
                <Bot className="h-4 w-4 mr-2" />
                AI Compare
              </Button>
              <Button variant="outline" size="sm" disabled={selectedCount === 0}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Bulk Compare
              </Button>
              {selectedCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearComparison}>
                  Clear ({selectedCount})
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-elec-dark border-elec-yellow/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Supplier</label>
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted-foreground/20 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-muted-foreground/20 rounded animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-32 w-full bg-muted-foreground/20 rounded animate-pulse" />
                  <div className="h-8 w-full bg-muted-foreground/20 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredMaterials && filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard 
                key={material.id} 
                item={material}
                onAddToCompare={(item) => addToComparison(item.id, item)}
                onRemoveFromCompare={(itemId) => removeFromComparison(itemId)}
                isSelected={isInComparison(material.id)}
                isCompareDisabled={selectedCount >= 3 && !isInComparison(material.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-muted-foreground mb-4">
              {searchTerm || supplierFilter !== "all" 
                ? "Try adjusting your search or filters"
                : "No products available for this category yet"
              }
            </p>
            {(searchTerm || supplierFilter !== "all") && (
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSupplierFilter("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Summary */}
        {!isLoading && filteredMaterials && filteredMaterials.length > 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-elec-yellow">
                    {filteredMaterials.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-elec-yellow">
                    {suppliers.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Suppliers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-elec-yellow">
                    £{Math.min(...filteredMaterials.map(m => parseFloat(m.price.replace(/[£,]/g, '')))).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Lowest Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-elec-yellow">
                    £{Math.max(...filteredMaterials.map(m => parseFloat(m.price.replace(/[£,]/g, '')))).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Highest Price</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MaterialsCategoryProductList;