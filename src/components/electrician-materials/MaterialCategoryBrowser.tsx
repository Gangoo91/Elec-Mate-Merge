
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Cable, Zap, Shield, Package, Building, TrendingUp, Star, ArrowRight, Users, Award, Loader2, RefreshCw, Search, Filter, ChevronDown } from "lucide-react";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import { useCategoryMaterials } from "@/hooks/useCategoryMaterials";
import MaterialCard from "./MaterialCard";

const MaterialCategoryBrowser = () => {
  const { data: categories, isLoading, error, refetch, isRefetching } = useMaterialsData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [supplierFilter, setSupplierFilter] = useState("all");

  // Get materials for the selected category
  const { materials: categoryMaterials, isLoading: categoryLoading } = useCategoryMaterials(selectedCategory || "");

  const categoryIcons = {
    cables: Cable,
    components: Zap,
    protection: Shield,
    accessories: Package,
    lighting: Building,
    fixings: Package,
    'cable-management': Cable,
    'smart-home': Zap,
    'data-networking': Cable,
    'heating-controls': Building,
    'ev-charging': Zap,
    'fire-security': Shield
  };

  // Filter and sort materials for selected category
  const filteredMaterials = categoryMaterials
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
  const suppliers = [...new Set(categoryMaterials?.map(m => m.supplier))].sort();

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      setSearchTerm("");
      setSortBy("name");
      setSupplierFilter("all");
    }
  };

  const categoryDescriptions = {
    cables: "Twin & Earth, SWA, armoured and data cables",
    components: "Consumer units, MCBs, RCDs and distribution boards",
    protection: "Earth rods, surge protectors and safety devices",
    accessories: "Junction boxes, cable glands and fixing accessories",
    lighting: "LED downlights, emergency lighting and battens",
    fixings: "Cable ties, screws, plugs and electrical consumables",
    'cable-management': "Conduit, trunking and cable management systems",
    'smart-home': "Smart switches, sensors and home automation",
    'data-networking': "Cat6 cables, data sockets and network equipment",
    'heating-controls': "Thermostats, timers and heating control systems",
    'ev-charging': "Electric vehicle chargers and charging equipment",
    'fire-security': "Smoke detectors, alarms and security systems"
  };

  if (error) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-red-400">
          <p>Failed to load materials data</p>
          <Button 
            variant="outline" 
            onClick={() => refetch()} 
            className="mt-4"
            disabled={isRefetching}
          >
            {isRefetching ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
          {!isLoading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="text-elec-yellow hover:text-elec-yellow/80"
            >
              {isRefetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive range of electrical materials organised by category. 
          Find everything you need for professional electrical installations.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-elec-yellow/20 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted-foreground/20 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted-foreground/20 rounded animate-pulse" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-3 w-full bg-muted-foreground/20 rounded animate-pulse" />
                <div className="h-8 w-full bg-muted-foreground/20 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => {
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
            const description = categoryDescriptions[category.id as keyof typeof categoryDescriptions];
            
            return (
              <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-elec-yellow/20 rounded-lg">
                        <IconComponent className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                      </div>
                    </div>
                    {category.trending && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{description}</p>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price Range:</span>
                    <span className="text-elec-yellow font-medium">{category.priceRange}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Top Brands:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {category.topBrands.slice(0, 3).map((brand) => (
                        <Badge key={brand} variant="outline" className="text-xs border-elec-yellow/30 text-white">
                          {brand}
                        </Badge>
                      ))}
                      {category.topBrands.length > 3 && (
                        <Badge variant="outline" className="text-xs border-elec-yellow/30 text-white">
                          +{category.topBrands.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {category.popularItems.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Best Sellers:
                      </h4>
                      <div className="space-y-2">
                        {category.popularItems.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-xs bg-elec-dark/30 p-2 rounded">
                            <div className="flex-1 min-w-0">
                              <p className="text-white truncate">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                                  <span className="text-muted-foreground">{item.rating.toFixed(1)}</span>
                                </div>
                                {item.sales && (
                                  <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-muted-foreground">{item.sales} sold</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className="text-elec-yellow font-medium ml-2">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Collapsible 
                    open={selectedCategory === category.id} 
                    onOpenChange={() => handleCategoryClick(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors">
                        Browse {category.title}
                        <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${selectedCategory === category.id ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      {selectedCategory === category.id && (
                        <div className="space-y-4 border-t border-elec-yellow/20 pt-4">
                          {/* Filters for category products */}
                          <Card className="border-elec-yellow/20 bg-elec-dark">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-sm">
                                <Filter className="h-4 w-4" />
                                Filter Products
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-medium text-white mb-1 block">Search</label>
                                <div className="relative">
                                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                  <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-7 h-8 text-xs bg-elec-gray border-elec-yellow/30"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-medium text-white mb-1 block">Sort</label>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                  <SelectTrigger className="h-8 text-xs bg-elec-gray border-elec-yellow/30">
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
                                <label className="text-xs font-medium text-white mb-1 block">Supplier</label>
                                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                                  <SelectTrigger className="h-8 text-xs bg-elec-gray border-elec-yellow/30">
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
                            </CardContent>
                          </Card>

                          {/* Products Grid */}
                          {categoryLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Array.from({ length: 6 }).map((_, i) => (
                                <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                                  <CardHeader>
                                    <div className="space-y-2">
                                      <div className="h-3 w-3/4 bg-muted-foreground/20 rounded animate-pulse" />
                                      <div className="h-2 w-1/2 bg-muted-foreground/20 rounded animate-pulse" />
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="h-24 w-full bg-muted-foreground/20 rounded animate-pulse" />
                                    <div className="h-6 w-full bg-muted-foreground/20 rounded animate-pulse" />
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : filteredMaterials && filteredMaterials.length > 0 ? (
                            <>
                              <div className="text-sm text-muted-foreground mb-2">
                                Showing {filteredMaterials.length} of {categoryMaterials?.length || 0} products
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                                {filteredMaterials.slice(0, 12).map((material) => (
                                  <MaterialCard key={material.id} item={material} />
                                ))}
                              </div>
                              {filteredMaterials.length > 12 && (
                                <div className="text-center py-2">
                                  <p className="text-sm text-muted-foreground">
                                    Showing first 12 products. Use filters to find specific items.
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                              <p className="text-sm text-muted-foreground">
                                {searchTerm || supplierFilter !== "all" 
                                  ? "No products match your filters"
                                  : "No products available for this category"
                                }
                              </p>
                              {(searchTerm || supplierFilter !== "all") && (
                                <Button 
                                  onClick={() => {
                                    setSearchTerm("");
                                    setSupplierFilter("all");
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                >
                                  Clear Filters
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaterialCategoryBrowser;
