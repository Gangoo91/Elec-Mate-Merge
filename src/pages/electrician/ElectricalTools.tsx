
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, Search, MapPin, BookOpen, Calculator, FileText, Zap, Loader2, Package, TrendingUp, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useToolCategories } from "@/hooks/useToolCategories";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";

// ToolCategory interface is now imported from useToolCategories hook

const ElectricalTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories: toolCategories, isLoading, error, refetch } = useToolCategories();

  // All category analysis logic is now in the useToolCategories hook

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to materials page with search term
      window.location.href = `/electrician/materials/Tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/business">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Business Hub
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <Wrench className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                Electrical Workshop
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your comprehensive toolkit for electrical work - find tools, suppliers, and buying guides.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-elec-gray/50 border border-elec-yellow/20">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Tools
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              UK Suppliers
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Buying Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Tool Categories */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
                <span className="ml-2 text-muted-foreground">Loading live tool data...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <p className="text-muted-foreground">Failed to load tool data</p>
                <Button 
                  onClick={() => refetch()} 
                  variant="outline"
                  className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.name} className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors relative">
                      {category.trending && (
                        <div className="absolute top-2 right-2">
                          <TrendingUp className="h-4 w-4 text-elec-yellow" />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconComponent className="h-5 w-5 text-elec-yellow" />
                          {category.name}
                          {category.count > 0 && (
                            <span className="ml-auto text-sm bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                              {category.count}
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {category.description}
                        </p>
                        {category.priceRange && (
                          <p className="text-xs text-elec-yellow mb-3">
                            {category.priceRange}
                          </p>
                        )}
                        <Link to={`/electrician/materials/Tools?category=${encodeURIComponent(category.name)}`}>
                          <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                            Browse {category.name}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Search */}
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search for tools..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-3 py-2 rounded border border-elec-yellow/20 bg-elec-dark text-white placeholder:text-gray-400"
                  />
                  <Button 
                    onClick={handleSearch}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Screwfix</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Trade electrical supplies and tools
                  </p>
                  <a href="https://www.screwfix.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      Visit Screwfix
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>RS Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional electrical equipment
                  </p>
                  <a href="https://in.rsdelivers.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      Visit RS Components
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Toolstation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tools and electrical supplies
                  </p>
                  <a href="https://www.toolstation.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      Visit Toolstation
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>City Electrical Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Electrical wholesaler nationwide
                  </p>
                  <a href="https://www.cef.co.uk/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      Visit CEF
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <ToolBuyingGuides />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElectricalTools;
