
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Cable, Zap, Shield, Package, Building, TrendingUp, Star, ArrowRight, Users, Award, Loader2, RefreshCw, Search, Filter, Eye, Clock } from "lucide-react";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const MaterialCategoryBrowser = () => {
  const { data: categories, isLoading, error, refetch, isRefetching } = useMaterialsData();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryIcons = {
    cables: Cable,
    components: Zap,
    protection: Shield,
    accessories: Package,
    lighting: Building,
    tools: Package
  };

  const categoryDescriptions = {
    cables: "Twin & Earth, SWA, armoured and data cables for all installations",
    components: "Consumer units, MCBs, RCDs and distribution boards - BS 7671 compliant",
    protection: "Earth rods, surge protectors and safety devices for electrical protection",
    accessories: "Junction boxes, cable glands and fixing accessories for secure installations",
    lighting: "LED downlights, emergency lighting and battens - energy efficient solutions",
    tools: "Multifunction testers, tools and measurement equipment for professionals"
  };

  const quickFilters = [
    { id: "all", label: "All Categories", count: categories?.length || 0 },
    { id: "trending", label: "Trending", count: categories?.filter(c => c.trending)?.length || 0 },
    { id: "new", label: "New Arrivals", count: 0 },
    { id: "bestsellers", label: "Best Sellers", count: 0 }
  ];

  const filteredCategories = categories?.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         categoryDescriptions[category.id as keyof typeof categoryDescriptions]?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedCategory === "all" || 
                         (selectedCategory === "trending" && category.trending);
    return matchesSearch && matchesFilter;
  }) || [];

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
    <div className="space-y-6 md:space-y-8">
      {/* Enhanced Header with Search and Filters */}
      <div className="space-y-4">
        <div className="text-center space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Electrical Materials Browser</h2>
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
          <p className="text-base sm:text-lg text-white max-w-3xl mx-auto">
            Professional electrical materials from leading UK suppliers. 
            Real-time pricing and availability for qualified electricians.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials, brands, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-gray/50 border-elec-yellow/30 focus:border-elec-yellow/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {quickFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedCategory === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(filter.id)}
                className={`whitespace-nowrap ${
                  selectedCategory === filter.id
                    ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    : "border-elec-yellow/30 text-white hover:bg-elec-yellow/20"
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filter.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        {!isLoading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <span>
                Showing {filteredCategories.length} of {categories?.length || 0} categories
              </span>
              {searchTerm && (
                <span className="text-elec-yellow">
                  for "{searchTerm}"
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>Live pricing</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updated hourly</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray/50 backdrop-blur-sm">
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
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-elec-yellow/20 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? `No categories match "${searchTerm}"` : "No categories available with the selected filter"}
          </p>
          {searchTerm && (
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
            const description = categoryDescriptions[category.id as keyof typeof categoryDescriptions];
            
            return (
              <Link to={`/materials/category/${category.id}`} key={category.id} className="group focus:outline-none">
                <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 backdrop-blur-sm h-full hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-elec-yellow/20 rounded-lg group-hover:bg-elec-yellow/30 transition-colors">
                          <IconComponent className="h-6 w-6 text-elec-yellow" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white group-hover:text-elec-yellow transition-colors">
                            {category.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {category.productCount} products
                          </p>
                        </div>
                      </div>
                      {category.trending && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    <p className="text-sm text-white leading-relaxed">{description}</p>
                    
                    <div className="flex justify-between text-sm bg-elec-dark/30 p-3 rounded-lg">
                      <span className="text-muted-foreground">Price Range:</span>
                      <span className="text-elec-yellow font-semibold">{category.priceRange}</span>
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

                    <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 text-center group-hover:bg-elec-yellow/20 transition-colors">
                      <div className="text-elec-yellow font-semibold text-sm group-hover:text-white transition-colors">
                        Browse {category.title} →
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {category.productCount} products available
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaterialCategoryBrowser;
