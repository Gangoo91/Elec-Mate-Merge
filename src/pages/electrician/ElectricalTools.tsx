import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Search,
  ArrowLeft,
  Loader2,
  Package
} from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useToolCategories } from "@/hooks/useToolCategories";
import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import BatchToolsRefreshButton from "@/components/electrician-tools/BatchToolsRefreshButton";
import { queryClient } from "@/lib/queryClient";

const ElectricalTools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories: toolCategories, isLoading } = useToolCategories();
  
  const selectedCategory = searchParams.get('category');
  
  // If a category is selected, show the enhanced category display
  if (selectedCategory) {
    return <EnhancedToolCategoryDisplay categoryName={selectedCategory} />;
  }

  const filteredCategories = toolCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in p-0">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground text-sm md:text-base">Browse electrical tools for your projects</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <BatchToolsRefreshButton
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['toolCategories'] });
              queryClient.invalidateQueries({ queryKey: ['toolsData'] });
            }}
          />
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
          const isPopular = category.count > 20;
          const hasDeals = category.count > 0;
          
          return (
            <Card 
              key={category.name}
              className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-card backdrop-blur cursor-pointer hover:border-elec-yellow/60 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] group overflow-hidden"
              onClick={() => navigate(`/electrician/tools?category=${encodeURIComponent(category.name)}`)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex items-center justify-center gap-3 text-lg text-center text-white group-hover:text-elec-yellow transition-colors">
                  <IconComponent className="h-6 w-6 text-elec-yellow group-hover:scale-110 transition-transform duration-300" />
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm text-center leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative space-y-3">
                {/* Tool Count & Status */}
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-xs text-elec-yellow/80">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : category.count > 0 ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 gap-1.5"
                        >
                          <Package className="h-3 w-3" />
                          {category.count} available
                        </Badge>
                      </div>
                      
                      {/* Price Range */}
                      {category.priceRange && (
                        <div className="text-xs text-muted-foreground">
                          {category.priceRange}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Data being collected
                    </span>
                  )}
                </div>
                
                {/* View All Indicator */}
                {category.count > 0 && (
                  <div className="text-center">
                    <span className="text-xs text-elec-yellow/60 group-hover:text-elec-yellow transition-colors">
                      Browse tools →
                    </span>
                  </div>
                )}
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