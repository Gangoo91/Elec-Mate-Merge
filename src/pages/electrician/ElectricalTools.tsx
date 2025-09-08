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
import { testToolsRefresh } from "@/utils/testToolsRefresh";
import { useToast } from "@/hooks/use-toast";

const ElectricalTools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { categories: toolCategories, isLoading } = useToolCategories();
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
        title: "Updating Tools Data",
        description: "Fetching latest tools from suppliers... This may take 1-2 minutes.",
      });

      const result = await testToolsRefresh();
      
      if (result.success) {
        toast({
          title: "Tools Updated Successfully",
          description: "Tool categories and products have been refreshed.",
          variant: "success",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to refresh tools data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Update Error",
        description: "An error occurred while updating tools data.",
        variant: "destructive",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name}
              className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:border-elec-yellow/50 transition-colors"
              onClick={() => navigate(`/electrician/tools?category=${encodeURIComponent(category.name)}`)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-center gap-3 text-lg text-center">
                  <IconComponent className="h-6 w-6 text-elec-yellow" />
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm">
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