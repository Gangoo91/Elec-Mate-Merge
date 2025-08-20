import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";
import { toolCategories, tools } from "@/data/electrician/toolData";
import ToolCard from "@/components/electrician-tools/ToolCard";
import { useState } from "react";
import * as Icons from "lucide-react";

const ToolCategory = () => {
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  
  const category = toolCategories.find(c => c.id === categoryId);
  const categoryTools = tools.filter(t => t.category === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-elec-yellow mb-4">Category Not Found</h1>
          <Link to="/electrician/tools">
            <Button variant="outline" className="border-elec-yellow/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = (Icons as any)[category.icon] || Icons.Wrench;

  // Sort tools
  const sortedTools = [...categoryTools].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Math.min(...Object.values(a.suppliers).map(s => s.price)) - 
               Math.min(...Object.values(b.suppliers).map(s => s.price));
      case "price-high":
        return Math.min(...Object.values(b.suppliers).map(s => s.price)) - 
               Math.min(...Object.values(a.suppliers).map(s => s.price));
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "priority":
        const priorityOrder = { essential: 0, recommended: 1, optional: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const essentialTools = sortedTools.filter(t => t.priority === "essential");
  const recommendedTools = sortedTools.filter(t => t.priority === "recommended");
  const optionalTools = sortedTools.filter(t => t.priority === "optional");

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/tools">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <IconComponent className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                {category.name}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {category.description} - {categoryTools.length} tools available
            </p>
          </div>
        </div>

        {/* Category Overview */}
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{essentialTools.length}</div>
                <div className="text-sm text-muted-foreground">Essential Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{recommendedTools.length}</div>
                <div className="text-sm text-muted-foreground">Recommended</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">
                  £{category.priceRange.min}-{category.priceRange.max}
                </div>
                <div className="text-sm text-muted-foreground">Price Range</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{category.popularBrands.length}</div>
                <div className="text-sm text-muted-foreground">Top Brands</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-elec-yellow text-black" : "border-elec-yellow/30"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-elec-yellow text-black" : "border-elec-yellow/30"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select 
              className="text-sm bg-elec-dark border border-elec-yellow/30 rounded px-3 py-1 text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {/* Tools by Priority */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50 border border-elec-yellow/20">
            <TabsTrigger value="all">All Tools ({sortedTools.length})</TabsTrigger>
            <TabsTrigger value="essential">Essential ({essentialTools.length})</TabsTrigger>
            <TabsTrigger value="recommended">Recommended ({recommendedTools.length})</TabsTrigger>
            <TabsTrigger value="optional">Optional ({optionalTools.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {sortedTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  compact={viewMode === "list"}
                  showComparison={viewMode === "grid"}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="essential">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {essentialTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  compact={viewMode === "list"}
                  showComparison={viewMode === "grid"}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {recommendedTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  compact={viewMode === "list"}
                  showComparison={viewMode === "grid"}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="optional">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {optionalTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  compact={viewMode === "list"}
                  showComparison={viewMode === "grid"}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No tools message */}
        {categoryTools.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardContent className="p-8 text-center">
              <IconComponent className="h-12 w-12 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No tools found</h3>
              <p className="text-muted-foreground">
                We're working on adding tools to this category. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ToolCategory;