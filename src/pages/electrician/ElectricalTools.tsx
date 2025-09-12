import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowLeft, RefreshCw, Loader2, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import { useToolCategories, type ToolCategory } from "@/hooks/useToolCategories";
import { ToolsNavigationHeader } from "@/components/electrician-tools/enhanced/ToolsNavigationHeader";
import { EnhancedToolSearch } from "@/components/electrician-tools/enhanced/EnhancedToolSearch";
import { ToolDealsCarousel } from "@/components/electrician-tools/enhanced/ToolDealsCarousel";
import { ToolCategoryMegaMenu } from "@/components/electrician-tools/enhanced/ToolCategoryMegaMenu";

const ElectricalTools = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const { categories: toolCategories, isLoading, error, refetch } = useToolCategories();

  // If a specific category is selected, show the enhanced category display
  if (category) {
    return <EnhancedToolCategoryDisplay categoryName={category} />;
  }

  // Filter categories based on search term
  const filteredCategories = toolCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle tools refresh
  const handleToolsRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      toast({
        title: "Refreshing Tools Data",
        description: "Fetching the latest tool information...",
      });

      // Call the edge function to refresh tools data
      const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
        body: { forceRefresh: true }
      });

      if (error) {
        console.error('Error refreshing tools:', error);
        toast({
          title: "Refresh Failed",
          description: "There was an issue refreshing the tools data. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Tools refresh response:', data);
        toast({
          title: "Tools Data Refreshed",
          description: `Successfully updated tool information. Found ${data?.totalProducts || 0} products.`,
        });
        
        // Trigger a refetch of the tools data
        refetch();
      }
    } catch (error) {
      console.error('Unexpected error during tools refresh:', error);
      toast({
        title: "Refresh Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Electrical Tools & Equipment | Professional Tools for UK Electricians</title>
        <meta name="description" content="Professional electrical tools and equipment for UK electricians. Browse power tools, test equipment, safety gear and specialist tools from leading suppliers." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      {/* Enhanced Navigation Header */}
      <ToolsNavigationHeader onRefresh={handleToolsRefresh} isRefreshing={isRefreshing} />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Search */}
        <EnhancedToolSearch 
          searchQuery={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={filteredCategories.length}
        />

        {/* Deals Section */}
        <ToolDealsCarousel />

        {/* Category Mega Menu */}
        <ToolCategoryMegaMenu />

        {/* Legacy Category Grid - Shown when search is active */}
        {searchTerm && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Search Results</h3>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <div className="animate-pulse">
                      <div className="h-12 w-12 bg-muted rounded-lg mb-4"></div>
                      <div className="h-5 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No tool categories found</h3>
                <p className="text-muted-foreground">Try a different search term or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category) => (
                  <Link 
                    key={category.name}
                    to={`/electrician/tools?category=${encodeURIComponent(category.name)}`}
                    className="group block"
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <category.icon className="h-7 w-7 text-primary" />
                          </div>
                          {category.trending && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {category.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {category.count} tools
                              </Badge>
                              {category.priceRange && (
                                <span className="text-xs text-muted-foreground font-mono">
                                  {category.priceRange}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default ElectricalTools;