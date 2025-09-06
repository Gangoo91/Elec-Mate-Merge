
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wrench, Search, MapPin, BookOpen, TrendingUp, RefreshCw, Filter, Grid3X3, List, Star, Clock, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { useToolCategories } from "@/hooks/useToolCategories";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";
import ToolCategoriesSkeleton from "@/components/electrician-tools/ToolCategoriesSkeleton";

// ToolCategory interface is now imported from useToolCategories hook

const ElectricalTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'count' | 'trending'>('name');
  const { categories: toolCategories, isLoading, error, refetch } = useToolCategories();

  // Show live data indicator when we have fresh data
  const hasLiveData = toolCategories.some(cat => cat.count > 0);
  const totalTools = toolCategories.reduce((sum, cat) => sum + cat.count, 0);

  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = toolCategories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort categories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'count':
          return b.count - a.count;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [toolCategories, searchTerm, sortBy]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to materials page with search term
      window.location.href = `/electrician/materials/Tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray/70 to-elec-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-elec-yellow/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-elec-yellow/3 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in relative z-10">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex justify-start">
            <Link to="/electrician/business">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Business Hub
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-4 bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 rounded-2xl backdrop-blur-sm border border-elec-yellow/20 shadow-lg">
                <Wrench className="h-8 w-8 text-elec-yellow" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-elec-yellow to-yellow-400 bg-clip-text text-transparent">
                Electrical Workshop
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Your comprehensive toolkit for electrical work - find tools, suppliers, and buying guides.
            </p>
            
            {/* Statistics Dashboard */}
            {hasLiveData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
                <Card className="bg-elec-gray/50 border-elec-yellow/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{toolCategories.length}</div>
                    <div className="text-xs text-muted-foreground">Categories</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-gray/50 border-elec-yellow/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{totalTools}</div>
                    <div className="text-xs text-muted-foreground">Total Tools</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-gray/50 border-elec-yellow/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{toolCategories.filter(c => c.trending).length}</div>
                    <div className="text-xs text-muted-foreground">Trending</div>
                  </CardContent>
                </Card>
                <Card className="bg-elec-gray/50 border-elec-yellow/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="text-xs text-green-400 font-medium">Live Data</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-elec-gray/50 border border-elec-yellow/20 backdrop-blur-sm h-12">
            <TabsTrigger value="browse" className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black transition-all duration-300">
              <Search className="h-4 w-4" />
              Browse Tools
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black transition-all duration-300">
              <MapPin className="h-4 w-4" />
              UK Suppliers
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black transition-all duration-300">
              <BookOpen className="h-4 w-4" />
              Buying Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Enhanced Search and Controls */}
            <Card className="bg-elec-gray/50 border-elec-yellow/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {hasLiveData && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Live data from {totalTools} tools across {toolCategories.length} categories
                      </div>
                      <Button 
                        onClick={() => refetch()}
                        variant="outline"
                        size="sm"
                        className="border-elec-yellow/30 hover:bg-elec-yellow/10 h-8"
                        title="Refresh live data"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search tools, categories, or descriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-10 bg-elec-dark/50 border-elec-yellow/20 text-white placeholder:text-gray-400 focus:border-elec-yellow/50"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSearch}
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 hover:scale-105"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search All Tools
                      </Button>
                      
                      <div className="flex border border-elec-yellow/20 rounded-lg overflow-hidden">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className={`h-10 ${viewMode === 'grid' ? 'bg-elec-yellow text-black' : 'hover:bg-elec-yellow/10'}`}
                        >
                          <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className={`h-10 ${viewMode === 'list' ? 'bg-elec-yellow text-black' : 'hover:bg-elec-yellow/10'}`}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Sort by:</span>
                    <div className="flex gap-2">
                      {[
                        { key: 'name', label: 'Name', icon: null },
                        { key: 'count', label: 'Tools Count', icon: null },
                        { key: 'trending', label: 'Trending', icon: TrendingUp }
                      ].map(({ key, label, icon: Icon }) => (
                        <Button
                          key={key}
                          variant={sortBy === key ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setSortBy(key as any)}
                          className={`h-8 text-xs ${sortBy === key ? 'bg-elec-yellow text-black' : 'hover:bg-elec-yellow/10'}`}
                        >
                          {Icon && <Icon className="h-3 w-3 mr-1" />}
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tool Categories */}
            {isLoading ? (
              <ToolCategoriesSkeleton count={6} />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-lg mb-2">Failed to load tool data</p>
                  <p className="text-sm text-muted-foreground/70">Please try refreshing the data</p>
                </div>
                <Button 
                  onClick={() => refetch()} 
                  variant="outline"
                  className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white transition-all duration-300 hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Loading
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredAndSortedCategories.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">No categories found matching "{searchTerm}"</p>
                    <Button 
                      onClick={() => setSearchTerm('')} 
                      variant="outline"
                      className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  filteredAndSortedCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card 
                        key={category.name} 
                        className={`group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/70 to-elec-gray/50 hover:from-elec-gray/80 hover:to-elec-gray/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/10 relative overflow-hidden ${
                          viewMode === 'list' ? 'flex flex-row' : ''
                        }`}
                      >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {category.trending && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg animate-pulse">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className={`relative z-10 ${viewMode === 'list' ? 'pb-3 pr-0' : 'pb-3'}`}>
                          <CardTitle className={`flex items-center gap-3 group-hover:text-elec-yellow transition-colors duration-300 ${
                            viewMode === 'list' ? 'text-lg' : 'text-xl'
                          }`}>
                            <div className="p-2 bg-elec-yellow/20 rounded-xl group-hover:bg-elec-yellow/30 transition-colors duration-300">
                              <IconComponent className="h-5 w-5 text-elec-yellow" />
                            </div>
                            <span className="flex-1">{category.name}</span>
                            {category.count > 0 && (
                              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/30 transition-colors">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mr-1"></div>
                                {category.count}
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className={`relative z-10 space-y-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {category.description}
                            </p>
                            {category.priceRange && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs border-elec-yellow/40 text-elec-yellow bg-elec-yellow/10">
                                  {category.priceRange}
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          <Link to={`/electrician/materials/Tools?category=${encodeURIComponent(category.name)}`} className="block">
                            <Button 
                              size="sm" 
                              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 group-hover:shadow-lg font-medium"
                            >
                              Browse {category.name}
                              <Search className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            )}

          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-elec-yellow mb-2">UK Electrical Suppliers</h2>
              <p className="text-muted-foreground">Trusted suppliers for professional electrical tools and equipment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/70 to-elec-gray/50 hover:from-elec-gray/80 hover:to-elec-gray/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 group-hover:text-elec-yellow transition-colors">
                    <div className="p-2 bg-orange-500/20 rounded-xl">
                      <Wrench className="h-5 w-5 text-orange-500" />
                    </div>
                    Screwfix
                    <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">Popular</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Trade electrical supplies and tools with click & collect from 800+ stores nationwide
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Trade Account</Badge>
                    <Badge variant="outline" className="text-xs">Click & Collect</Badge>
                    <Badge variant="outline" className="text-xs">Next Day</Badge>
                  </div>
                  <a href="https://www.screwfix.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 group-hover:shadow-lg">
                      Visit Screwfix
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/70 to-elec-gray/50 hover:from-elec-gray/80 hover:to-elec-gray/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 group-hover:text-elec-yellow transition-colors">
                    <div className="p-2 bg-red-500/20 rounded-xl">
                      <Wrench className="h-5 w-5 text-red-500" />
                    </div>
                    RS Components
                    <Badge className="ml-auto bg-blue-500/20 text-blue-400 border-blue-500/30">Pro</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Professional electrical equipment, automation, and industrial components with technical support
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Industrial</Badge>
                    <Badge variant="outline" className="text-xs">Technical Support</Badge>
                    <Badge variant="outline" className="text-xs">Bulk Orders</Badge>
                  </div>
                  <a href="https://in.rsdelivers.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 group-hover:shadow-lg">
                      Visit RS Components
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/70 to-elec-gray/50 hover:from-elec-gray/80 hover:to-elec-gray/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 group-hover:text-elec-yellow transition-colors">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <Wrench className="h-5 w-5 text-green-500" />
                    </div>
                    Toolstation
                    <Badge className="ml-auto bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Value</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Competitive prices on tools and electrical supplies with rapid delivery nationwide
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Best Prices</Badge>
                    <Badge variant="outline" className="text-xs">Quick Delivery</Badge>
                    <Badge variant="outline" className="text-xs">500+ Stores</Badge>
                  </div>
                  <a href="https://www.toolstation.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 group-hover:shadow-lg">
                      Visit Toolstation
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/70 to-elec-gray/50 hover:from-elec-gray/80 hover:to-elec-gray/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 group-hover:text-elec-yellow transition-colors">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                      <Wrench className="h-5 w-5 text-purple-500" />
                    </div>
                    City Electrical Factors
                    <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30">Trade</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    UK's largest electrical wholesaler with trade accounts and specialist electrical equipment
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Trade Only</Badge>
                    <Badge variant="outline" className="text-xs">UK Largest</Badge>
                    <Badge variant="outline" className="text-xs">Specialist</Badge>
                  </div>
                  <a href="https://www.cef.co.uk/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-300 group-hover:shadow-lg">
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
