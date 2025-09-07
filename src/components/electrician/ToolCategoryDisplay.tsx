import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  ExternalLink, 
  Star,
  Package,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToolsData, type ToolItem } from "@/hooks/useToolsData";

interface ToolCategoryDisplayProps {
  categoryName: string;
}

const ToolCategoryDisplay = ({ categoryName }: ToolCategoryDisplayProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allTools, isLoading, error } = useToolsData();

  // Debug: Log available categories and tools
  useEffect(() => {
    if (allTools) {
      const availableCategories = [...new Set(allTools.map(tool => tool.category))];
      console.log('🔧 Available categories:', availableCategories);
      console.log('🔧 Looking for category:', categoryName);
      console.log('🔧 Total tools:', allTools.length);
    }
  }, [allTools, categoryName]);

  // Comprehensive category mapping function
  const getCategoryMappings = (frontendCategory: string): string[] => {
    const mappings: Record<string, string[]> = {
      'Test Equipment': ['Test Equipment', 'Testing Equipment', 'Test & Measurement', 'Testers'],
      'Safety Tools': ['Safety Tools', 'Safety Equipment', 'PPE', 'Personal Protective Equipment'],
      'Power Tools': ['Power Tools', 'Electric Tools', 'Cordless Tools', 'Battery Tools'],
      'Hand Tools': ['Hand Tools', 'Manual Tools', 'Basic Tools'],
      'Access Tools & Equipment': ['Access Tools & Equipment', 'Access Equipment', 'Ladders & Steps', 'Access'],
      'Tool Storage': ['Tool Storage', 'Storage', 'Tool Bags', 'Cases & Bags'],
      'Specialist Tools': ['Specialist Tools', 'Electrical Tools', 'Cable Tools', 'Wiring Tools']
    };
    
    return mappings[frontendCategory] || [frontendCategory];
  };

  // Filter tools by category and search term with comprehensive mapping
  const categoryTools = allTools?.filter(tool => {
    const toolCategory = tool.category;
    const possibleMatches = getCategoryMappings(categoryName);
    const matchesCategory = possibleMatches.some(match => 
      toolCategory === match || 
      toolCategory?.toLowerCase().includes(match.toLowerCase()) ||
      match.toLowerCase().includes(toolCategory?.toLowerCase() || '')
    );
    
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  }) || [];

  // Debug: Log sample tool images
  if (categoryTools.length > 0) {
    console.log("Sample tool images:", categoryTools.slice(0, 3).map(t => ({ name: t.name, image: t.image })));
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in p-0">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/electrician/tools')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>
        </div>
        
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Tools</h3>
          <p className="text-muted-foreground">
            Unable to load tool data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-0">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/electrician/tools')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {isLoading ? 'Loading tools...' : `${categoryTools.length} tools available`}
          </p>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${categoryName.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-elec-gray border-elec-yellow/20"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : categoryTools.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {searchTerm ? 'No matching tools found' : 'No tools available yet'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? 'Try adjusting your search terms or browse all available tools.'
              : 'Tool data for this category is being populated. The system is now fetching tools from multiple suppliers.'
            }
          </p>
          {!searchTerm && allTools && allTools.length > 0 && (
            <div className="mt-4 p-4 bg-elec-gray/50 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">
                Available categories in database:
              </p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(allTools.map(tool => tool.category))].map(category => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categoryTools.map((tool, index) => (
            <Card key={tool.id || index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2 flex-1">
                    {tool.name}
                  </CardTitle>
                  {tool.isOnSale && (
                    <Badge variant="destructive" className="text-xs">
                      Sale
                    </Badge>
                  )}
                </div>
                {tool.supplier && (
                  <Badge variant="outline" className="w-fit text-xs">
                    {tool.supplier}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                {tool.image && (
                  <div className="aspect-square overflow-hidden rounded-md bg-muted">
                    <img 
                      src={(() => {
                        const src = tool.image;
                        console.log("Original URL:", src);
                        if (!src) return "/placeholder.svg";
                        
                        let finalSrc = src;
                        
                        // Update image size parameters from 136x136 to 236x236
                        if (finalSrc.includes("wid=136") && finalSrc.includes("hei=136")) {
                          finalSrc = finalSrc.replace(/wid=136/g, "wid=236").replace(/hei=136/g, "hei=236");
                          console.log("Updated URL:", finalSrc);
                        } else {
                          console.log("No wid=136/hei=136 found in URL");
                        }
                        
                        return finalSrc;
                      })()} 
                      alt={tool.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {tool.description && (
                  <CardDescription className="text-sm line-clamp-3">
                    {tool.description}
                  </CardDescription>
                )}
                
                {tool.highlights && tool.highlights.length > 0 && (
                  <div className="space-y-1">
                    {tool.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {highlight}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <div className="font-semibold text-elec-yellow">
                      {tool.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span>{tool.salePrice}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            {tool.price}
                          </span>
                        </div>
                      ) : (
                        tool.price
                      )}
                    </div>
                    {tool.reviews && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {tool.reviews}
                      </div>
                    )}
                  </div>
                  
                  {tool.stockStatus && (
                    <Badge 
                      variant={tool.stockStatus === 'In Stock' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {tool.stockStatus}
                    </Badge>
                  )}
                </div>
                
                {(tool.productUrl || tool.view_product_url) && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                  >
                    <a 
                      href={tool.productUrl || tool.view_product_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Product
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolCategoryDisplay;