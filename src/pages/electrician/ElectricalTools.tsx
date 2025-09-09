import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Search,
  ArrowLeft,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useToolCategories } from "@/hooks/useToolCategories";
import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ElectricalTools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { categories: toolCategories, isLoading, refetch } = useToolCategories();
  const { toast } = useToast();
  
  const selectedCategory = searchParams.get('category');
  
  // If a category is selected, show the enhanced category display
  if (selectedCategory) {
    return <EnhancedToolCategoryDisplay categoryName={selectedCategory} />;
  }

  const filteredCategories = toolCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToolsRefresh = async () => {
    setIsRefreshing(true);
    try {
      toast({
        title: "Refreshing Tools",
        description: "Fetching latest data from all suppliers using Firecrawl...",
        duration: 3000,
      });

      // Trigger the comprehensive firecrawl scraper
      const { data, error } = await supabase.functions.invoke('comprehensive-firecrawl-scraper', {
        body: { forceRefresh: true }
      });
      
      if (error) {
        console.error('❌ Tools refresh error:', error);
        toast({
          title: "Refresh Failed",
          description: "Could not refresh tools data. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        console.log('✅ Tools refreshed:', data);
        
        // Call refetch to update local state with fresh data
        refetch();
        
        toast({
          title: "Tools Updated",
          description: data?.message || "Successfully refreshed tools data from all suppliers!",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('❌ Tools refresh error:', error);
      toast({
        title: "Refresh Failed",
        description: "An error occurred while refreshing.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-0">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground text-sm md:text-base">Browse electrical tools for your projects</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleToolsRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {isRefreshing ? "Updating..." : "Update Tools Data"}
          </Button>
          <Link to="/electrician/business">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Business Hub
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-elec-gray border-elec-yellow/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name}
              className="border-elec-yellow/20 bg-elec-gray/50 backdrop-blur cursor-pointer hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-lg group"
              onClick={() => navigate(`/electrician/tools?category=${encodeURIComponent(category.name)}`)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-center gap-3 text-lg text-center text-white group-hover:text-white/90 transition-colors">
                  <IconComponent className="h-6 w-6 text-elec-yellow group-hover:text-elec-yellow/90 transition-colors" />
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm text-center leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-elec-yellow/80 flex items-center justify-center gap-2 font-medium">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Loading...
                    </>
                  ) : category.count > 0 ? (
                    <>
                      <Wrench className="h-3 w-3" />
                      {category.count} tools available
                    </>
                  ) : (
                    <span className="text-muted-foreground italic">
                      Data being collected
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available categories.
          </p>
        </div>
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Tool sourcing and pricing features coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalTools;