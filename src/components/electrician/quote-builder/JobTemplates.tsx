import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Wrench, Package, Zap, Loader2, Search, X } from "lucide-react";
import { jobTemplates } from "@/data/jobTemplates";
import { JobTemplate } from "@/types/quote";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface JobTemplatesProps {
  onSelectTemplate: (template: JobTemplate) => void;
}

export const JobTemplates = ({ onSelectTemplate }: JobTemplatesProps) => {
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const categories = useMemo(() => {
    const cats = Array.from(new Set(jobTemplates.map(t => t.category)));
    return ["All", ...cats];
  }, []);

  const filteredTemplates = useMemo(() => {
    return jobTemplates.filter(template => {
      const matchesSearch = searchQuery === "" || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.items.some(item => 
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === "All" || 
        template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Installation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Upgrade': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Testing': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Rewire': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleTemplateSelect = async (template: JobTemplate) => {
    setLoadingTemplate(template.id);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief loading simulation
      onSelectTemplate(template);
      toast({
        title: "Template Applied",
        description: `Template "${template.name}" applied successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingTemplate(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold">Job Templates</h3>
          <span className="text-sm text-muted-foreground">({filteredTemplates.length} templates)</span>
        </div>
        <p className="text-sm text-muted-foreground">Quick start with common electrical work</p>
        
        {/* Search and Filter Section */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : 
                  "border-elec-yellow/20 hover:border-elec-yellow/40"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No templates match your search criteria</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-2"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-elec-gray/50 border-elec-yellow/20 hover:bg-elec-gray/80 transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                <Badge variant="secondary" className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{template.estimatedHours} hour{template.estimatedHours !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Includes:</p>
                  <div className="space-y-1">
                    {template.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {item.category === 'labour' && <Wrench className="h-3 w-3" />}
                        {item.category === 'materials' && <Package className="h-3 w-3" />}
                        {item.category === 'equipment' && <Zap className="h-3 w-3" />}
                        <span className="truncate">{item.description}</span>
                      </div>
                    ))}
                    {template.items.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{template.items.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleTemplateSelect(template)}
                  disabled={loadingTemplate === template.id}
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50"
                  size="sm"
                >
                  {loadingTemplate === template.id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {loadingTemplate === template.id ? 'Applying...' : 'Use Template'}
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
};