import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, RefreshCw, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { useToolCategories } from "@/hooks/useToolCategories";
import { useToolsData } from "@/hooks/useToolsData";
import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import ToolsFeaturedCarousel from "@/components/electrician-tools/ToolsFeaturedCarousel";
import ToolsGrid from "@/components/electrician-tools/ToolsGrid";
import { Card, CardContent } from "@/components/ui/card";

const ElectricalTools = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    categories: toolCategories = [], 
    isLoading, 
    error, 
    refetch 
  } = useToolCategories();

  const { 
    data: tools = [], 
    isLoading: toolsLoading, 
    error: toolsError,
    refetch: refetchTools,
    deals,
    topDiscounts
  } = useToolsData();

  const category = searchParams.get('category');

  // If a category is selected, show the category display
  if (category) {
    return <EnhancedToolCategoryDisplay categoryName={category} />;
  }

  // Prepare carousel and grid data
  const carouselTools = topDiscounts ? topDiscounts.slice(0, 6) : [];
  const gridTools = tools.filter(tool => 
    !carouselTools.some(carouselTool => carouselTool.id === tool.id)
  );

  const filteredCategories = toolCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToolsRefresh = async () => {
      try {
        setIsRefreshing(true);
        const { error } = await supabase.functions.invoke('refresh-tools-data');
        
        if (error) {
          throw error;
        }
        
        await Promise.all([refetch(), refetchTools()]);
        
        toast({
          title: "Tools Updated",
          description: "Tool data has been refreshed with the latest information",
          duration: 3000,
        });
      } catch (error) {
        console.error('Error refreshing tools:', error);
        toast({
          title: "Refresh Failed",
          description: "Failed to refresh tool data. Please try again later.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsRefreshing(false);
      }
    };

  if (isLoading || toolsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/95 to-elec-dark/90 p-4 sm:p-6 lg:p-8">
        <Helmet>
          <title>Electrical Tools - Loading | ElecMate</title>
        </Helmet>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded w-1/3"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-xl border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/95 to-elec-dark/90">
      <Helmet>
        <title>Electrical Tools & Equipment | ElecMate</title>
        <meta name="description" content="Browse and compare electrical tools from top UK suppliers. Find the best deals on hand tools, power tools, testing equipment and more." />
        <meta name="keywords" content="electrical tools, power tools, hand tools, testing equipment, electrical supplies, UK electrician tools" />
      </Helmet>

      <div className="relative">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5"></div>
        
        <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Electrical Tools & Equipment
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl">
                Compare prices and find the best deals on electrical tools from top UK suppliers
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={handleToolsRefresh}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Updating...' : 'Refresh Deals'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/electrician')}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Hub
              </Button>
            </div>
          </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tool categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-elec-yellow/50"
                />
              </div>

              {/* Featured Tool Deals Carousel */}
              {carouselTools.length > 0 && (
                <div className="space-y-6">
                  <ToolsFeaturedCarousel tools={carouselTools} />
                </div>
              )}

              {/* More Tools Section */}
              {gridTools.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white px-4">
                      More Tools & Equipment
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  </div>
                  <ToolsGrid tools={gridTools} />
                </div>
              )}

              {/* Tool Categories Grid */}
              {filteredCategories.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white px-4">
                      Browse by Category
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category) => (
                      <Card 
                        key={category.name}
                        className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:border-elec-yellow/50"
                        onClick={() => navigate(`/electrician/tools?category=${encodeURIComponent(category.name)}`)}
                      >
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-elec-yellow/20 rounded-full flex items-center justify-center group-hover:bg-elec-yellow/30 transition-colors">
                            <category.icon className="h-8 w-8 text-elec-yellow" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {category.name}
                            </h3>
                            <p className="text-white/80 text-sm mb-3">
                              {category.description}
                            </p>
                            <p className="text-elec-yellow text-sm font-medium">
                              {category.count || 0} tools available
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results State */}
              {filteredCategories.length === 0 && tools.length === 0 && (
                <div className="text-center py-12">
                  <Wrench className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No tools found
                  </h3>
                  <p className="text-white/80">
                    Try adjusting your search terms or check back later.
                  </p>
                </div>
              )}

              {/* Coming Soon Section */}
              <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 rounded-xl border border-elec-yellow/20 p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  More Features Coming Soon
                </h3>
                <p className="text-white/80">
                  Price comparison, supplier ratings, and tool reviews are on the way!
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTools;