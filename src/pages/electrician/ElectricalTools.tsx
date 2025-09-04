
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wrench, Search, MapPin, BookOpen, Calculator, FileText, Zap, Loader2, Package, TrendingUp, RefreshCw, Star, Clock, ShoppingCart, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToolCategories } from "@/hooks/useToolCategories";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";

// ToolCategory interface is now imported from useToolCategories hook

const ElectricalTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories: toolCategories, isLoading, error, refetch } = useToolCategories();

  // Show live data indicator when we have fresh data
  const hasLiveData = toolCategories.some(cat => cat.count > 0);

  // All category analysis logic is now in the useToolCategories hook

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to materials page with search term
      window.location.href = `/electrician/materials/Tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-elec-yellow/20 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-elec-yellow/10 rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border border-elec-yellow/15 -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-elec-yellow/10 rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in relative">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex justify-start">
            <Link to="/electrician/business">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Business Hub
              </Button>
            </Link>
          </div>

          {/* Enhanced Hero Section */}
          <div className="text-center space-y-6 py-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-elec-yellow/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent rounded-2xl border border-elec-yellow/30 backdrop-blur-sm">
                <Wrench className="h-12 w-12 text-elec-yellow mx-auto animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-elec-yellow animate-bounce" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-elec-yellow via-elec-yellow/90 to-elec-yellow/70 bg-clip-text text-transparent">
                Electrical Workshop
              </h1>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                Your comprehensive toolkit for electrical work - discover tools, connect with suppliers, and access expert buying guides.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 bg-elec-gray/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-elec-yellow/20">
                  <Package className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white">1000+ Tools</span>
                </div>
                <div className="flex items-center gap-2 bg-elec-gray/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-elec-yellow/20">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white">UK Suppliers</span>
                </div>
                <div className="flex items-center gap-2 bg-elec-gray/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-elec-yellow/20">
                  <Star className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white">Expert Reviews</span>
                </div>
              </div>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.name} 
                      className="group border-elec-yellow/20 bg-gradient-to-br from-elec-gray/50 via-elec-gray/30 to-elec-gray/50 hover:from-elec-gray/60 hover:via-elec-gray/40 hover:to-elec-gray/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-elec-yellow/10 relative overflow-hidden backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/20 to-elec-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Trending Badge */}
                      {category.trending && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge variant="outline" className="bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow text-[10px] animate-pulse">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            TRENDING
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-4 relative z-10">
                        <CardTitle className="flex items-center gap-3 text-lg group-hover:text-elec-yellow transition-colors">
                          <div className="p-2 bg-elec-yellow/20 rounded-lg group-hover:bg-elec-yellow/30 transition-colors">
                            <IconComponent className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <span className="flex-1">{category.name}</span>
                          {category.count > 0 && (
                            <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400 text-[10px]">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mr-1"></div>
                              {category.count}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 relative z-10">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                        
                        {category.priceRange && (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-[10px] bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                              {category.priceRange}
                            </Badge>
                          </div>
                        )}
                        
                        <Link to={`/electrician/materials/Tools?category=${encodeURIComponent(category.name)}`}>
                          <Button 
                            size="sm" 
                            className="w-full bg-gradient-to-r from-elec-yellow to-elec-yellow/90 text-black hover:from-elec-yellow/90 hover:to-elec-yellow hover:scale-105 transition-all duration-200 font-medium group-hover:shadow-lg group-hover:shadow-elec-yellow/20"
                          >
                            Browse {category.name}
                            <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Enhanced Search Section */}
            <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray/40 via-elec-gray/50 to-elec-gray/40 backdrop-blur-sm hover:shadow-lg hover:shadow-elec-yellow/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-elec-yellow">
                  <Search className="h-5 w-5" />
                  Quick Search
                  <Badge variant="outline" className="ml-auto bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-[10px]">
                    POWERED BY AI
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hasLiveData && (
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Live data from {toolCategories.reduce((sum, cat) => sum + cat.count, 0)} tools
                      </div>
                      <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400 text-[10px]">
                        <Clock className="h-3 w-3 mr-1" />
                        REAL-TIME
                      </Badge>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search for tools, brands, or models..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-elec-yellow/30 bg-elec-dark/80 text-white placeholder:text-gray-400 focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 transition-all"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSearch}
                        className="flex-1 bg-gradient-to-r from-elec-yellow to-elec-yellow/90 text-black hover:from-elec-yellow/90 hover:to-elec-yellow hover:scale-105 transition-all duration-200 font-medium"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search Tools
                      </Button>
                      <Button 
                        onClick={() => refetch()}
                        variant="outline"
                        className="border-elec-yellow/30 hover:bg-elec-yellow/10 hover:scale-105 transition-all duration-200"
                        title="Refresh live data"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Popular Searches */}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Popular searches:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Multimeter', 'Wire Strippers', 'Drill Bits', 'Cable Cutters'].map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchTerm(term);
                              window.location.href = `/electrician/materials/Tools?search=${encodeURIComponent(term)}`;
                            }}
                            className="text-xs border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/10 transition-all duration-200"
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            {/* Suppliers Header */}
            <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray/40 via-elec-gray/50 to-elec-gray/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-elec-yellow">
                  <MapPin className="h-5 w-5" />
                  UK Trade Suppliers
                  <Badge variant="outline" className="ml-auto bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-[10px]">
                    VERIFIED PARTNERS
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with the UK's leading electrical trade suppliers. All partners are verified for quality, reliability, and competitive pricing.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Screwfix */}
              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-orange-500/10 via-elec-gray/50 to-orange-500/5 hover:from-orange-500/20 hover:via-elec-gray/60 hover:to-orange-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-orange-500/20 border-orange-500/50 text-orange-400 text-[10px]">
                    <Star className="h-3 w-3 mr-1" />
                    POPULAR
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 group-hover:text-orange-400 transition-colors">
                    <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <Wrench className="h-5 w-5 text-orange-400" />
                    </div>
                    Screwfix
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Trade electrical supplies and tools with nationwide delivery
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px]">Same Day Delivery</Badge>
                    <Badge variant="secondary" className="text-[10px]">Trade Account</Badge>
                    <Badge variant="secondary" className="text-[10px]">Click & Collect</Badge>
                  </div>
                  <a href="https://www.screwfix.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Visit Screwfix
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* RS Components */}
              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-blue-500/10 via-elec-gray/50 to-blue-500/5 hover:from-blue-500/20 hover:via-elec-gray/60 hover:to-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 text-blue-400 text-[10px]">
                    <Star className="h-3 w-3 mr-1" />
                    PREMIUM
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Package className="h-5 w-5 text-blue-400" />
                    </div>
                    RS Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Professional electrical equipment and industrial supplies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px]">Industrial Grade</Badge>
                    <Badge variant="secondary" className="text-[10px]">Technical Support</Badge>
                    <Badge variant="secondary" className="text-[10px]">Bulk Orders</Badge>
                  </div>
                  <a href="https://in.rsdelivers.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Visit RS Components
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Toolstation */}
              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-red-500/10 via-elec-gray/50 to-red-500/5 hover:from-red-500/20 hover:via-elec-gray/60 hover:to-red-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/10 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-red-500/20 border-red-500/50 text-red-400 text-[10px]">
                    <Clock className="h-3 w-3 mr-1" />
                    FAST
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 group-hover:text-red-400 transition-colors">
                    <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                      <Wrench className="h-5 w-5 text-red-400" />
                    </div>
                    Toolstation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Tools and electrical supplies with competitive pricing
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px]">Low Prices</Badge>
                    <Badge variant="secondary" className="text-[10px]">Local Branches</Badge>
                    <Badge variant="secondary" className="text-[10px]">Online Orders</Badge>
                  </div>
                  <a href="https://www.toolstation.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Visit Toolstation
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* City Electrical Factors */}
              <Card className="group border-elec-yellow/20 bg-gradient-to-br from-green-500/10 via-elec-gray/50 to-green-500/5 hover:from-green-500/20 hover:via-elec-gray/60 hover:to-green-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400 text-[10px]">
                    <MapPin className="h-3 w-3 mr-1" />
                    NATIONWIDE
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 group-hover:text-green-400 transition-colors">
                    <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    City Electrical Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Electrical wholesaler with nationwide coverage and trade focus
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px]">Trade Only</Badge>
                    <Badge variant="secondary" className="text-[10px]">Wholesale Prices</Badge>
                    <Badge variant="secondary" className="text-[10px]">Expert Advice</Badge>
                  </div>
                  <a href="https://www.cef.co.uk/" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Visit CEF
                      <ExternalLink className="h-4 w-4 ml-2" />
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
