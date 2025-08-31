
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cable, Zap, Shield, Package, Building, TrendingUp, Star, ArrowRight, Users, Award, Loader2, RefreshCw } from "lucide-react";
import { useMaterialsData } from "@/hooks/useMaterialsData";

const MaterialCategoryBrowser = () => {
  const { data: categories, isLoading, error, refetch, isRefetching } = useMaterialsData();

  const categoryIcons = {
    cables: Cable,
    components: Zap,
    protection: Shield,
    accessories: Package,
    lighting: Building,
    tools: Package
  };

  const categoryDescriptions = {
    cables: "Twin & Earth, SWA, armoured and data cables",
    components: "Consumer units, MCBs, RCDs and distribution boards",
    protection: "Earth rods, surge protectors and safety devices",
    accessories: "Junction boxes, cable glands and fixing accessories",
    lighting: "LED downlights, emergency lighting and battens",
    tools: "Multifunction testers, tools and measurement equipment"
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

                  <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors">
                    Browse {category.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
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
