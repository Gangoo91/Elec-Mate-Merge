import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Star, 
  Clock, 
  Filter,
  TrendingUp,
  Package,
  Zap,
  Home,
  Settings
} from "lucide-react";
import { enhancedMaterials, materialCombinations, EnhancedMaterialItem } from "@/data/electrician/enhancedPricingData";
import { useToast } from "@/hooks/use-toast";


interface MaterialSearchEnhancedProps {
  onAddMaterial: (material: EnhancedMaterialItem, quantity: number, pricing: any) => void;
  currentQuoteItems?: Array<{ description: string; materialCode?: string; id?: string }>;
}

export const MaterialSearchEnhanced = ({ onAddMaterial, currentQuoteItems = [] }: MaterialSearchEnhancedProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFavourites, setShowFavourites] = useState(false);
  const { toast } = useToast();

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(enhancedMaterials.map(m => m.category));
    return Array.from(cats);
  }, []);

  // Filter and sort materials
  const filteredMaterials = useMemo(() => {
    let filtered = enhancedMaterials.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
      const matchesFavourites = !showFavourites || material.isFavourite;
      
      return matchesSearch && matchesCategory && matchesFavourites;
    });

    // Sort materials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.defaultPrice - b.defaultPrice;
        case "price-desc":
          return b.defaultPrice - a.defaultPrice;
        case "category":
          return a.category.localeCompare(b.category);
        case "confidence":
          const confidenceOrder = { high: 3, medium: 2, low: 1 };
          return confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, showFavourites]);

  const handleQuickAddCombination = (combinationKey: string) => {
    const combination = materialCombinations[combinationKey as keyof typeof materialCombinations];
    let addedCount = 0;
    
    combination.forEach(item => {
      const material = enhancedMaterials.find(m => m.id === item.id);
      if (material) {
        // Calculate pricing for this quantity
        const pricing = {
          unitPrice: material.defaultPrice,
          total: material.defaultPrice * item.quantity * 1.2, // Quick estimate with VAT
          quantity: item.quantity
        };
        onAddMaterial(material, item.quantity, pricing);
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      toast({
        title: "Package Added",
        description: `${addedCount} materials from package added to quote`,
      });
    }
  };

  const getConfidenceBadgeColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Check if material is already in quote
  const isInQuote = (material: EnhancedMaterialItem) => {
    return currentQuoteItems.some(item => 
      item.materialCode === material.id || 
      item.materialCode === material.code ||
      item.description.toLowerCase().includes(material.name.toLowerCase())
    );
  };

  return (
    <div className="space-y-4 -mx-4 px-4">{/* Full width on mobile */}
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elec-light/60" />
            <Input
              placeholder="Search materials, codes, or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFavourites ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFavourites(!showFavourites)}
          >
            <Star className={`h-4 w-4 ${showFavourites ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border shadow-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border shadow-lg">
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price">Price Low-High</SelectItem>
              <SelectItem value="price-desc">Price High-Low</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="confidence">Price Confidence</SelectItem>
            </SelectContent>
          </Select>

          <Badge variant="outline" className="text-xs w-full sm:w-auto text-center">
            {filteredMaterials.length} items
          </Badge>
        </div>
      </div>

      <DropdownTabs
        tabs={[
          {
            value: "search",
            label: "Search",
            icon: Search,
            content: (
              <div className="space-y-4 pb-4">
                {filteredMaterials.map(material => {
                  const alreadyInQuote = isInQuote(material);
                  return (
                    <Card
                      key={material.id}
                      className={`bg-card/50 cursor-pointer transition-colors ${
                        alreadyInQuote 
                          ? 'border-slate-600 dark:border-slate-400 border-2 opacity-75' 
                          : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                      }`}
                      onClick={() => {
                      const pricing = {
                        unitPrice: material.defaultPrice,
                        total: material.defaultPrice * 1.2,
                        quantity: 1
                      };
                        onAddMaterial(material, 1, pricing);
                        toast({
                          title: alreadyInQuote ? "Material Re-added" : "Material Added",
                          description: `${material.name} ${alreadyInQuote ? 're-added to' : 'added to'} quote (£${material.defaultPrice.toFixed(2)})`,
                        });
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-lg font-semibold ${alreadyInQuote ? 'text-slate-400' : 'text-white'}`}>
                                {material.name}
                                {alreadyInQuote && <span className="text-xs ml-2 text-slate-500">(In Quote)</span>}
                              </h4>
                              {material.isFavourite && (
                              <Star className="h-5 w-5 text-yellow-400 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-elec-yellow">
                              £{material.defaultPrice.toFixed(2)}
                            </div>
                            <div className="text-sm text-elec-light/60">
                              per {material.unit}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-base text-elec-light/90">
                            <span className="font-medium">{material.brand}</span> • {material.code}
                          </div>
                          <div className="text-sm text-elec-light/70 capitalize">
                            {material.category}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getConfidenceBadgeColor(material.confidenceLevel)}>
                            {material.confidenceLevel} confidence
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-elec-light/60">
                            <Clock className="h-4 w-4" />
                            {material.estimatedInstallTime}min install
                          </div>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )
          },
          {
            value: "popular",
            label: "Popular",
            icon: TrendingUp,
            content: (
              <div className="space-y-4">
                <p className="text-sm text-elec-light/80">Most frequently used materials in quotes</p>
                <div className="grid gap-4">
                  {enhancedMaterials
                    .filter(m => ['socket-13a-dp', 'cable-te-2.5', 'mcb-32a-b', 'led-downlight-fire'].includes(m.id))
                    .map(material => (
                      <Card
                        key={material.id}
                        className="bg-card/50 border-elec-yellow/20 cursor-pointer hover:border-elec-yellow/40"
                        onClick={() => {
                          const pricing = {
                            unitPrice: material.defaultPrice,
                            total: material.defaultPrice * 1.2,
                            quantity: 1
                          };
                          onAddMaterial(material, 1, pricing);
                          toast({
                            title: "Material Added",
                            description: `${material.name} added to quote (£${material.defaultPrice.toFixed(2)})`,
                          });
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-white">{material.name}</h4>
                              <p className="text-sm text-elec-light/80">{material.brand}</p>
                            </div>
                            <div className="text-lg font-bold text-elec-yellow">
                              £{material.defaultPrice.toFixed(2)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )
          },
          {
            value: "combinations",
            label: "Job Kits",
            icon: Package,
            content: (
              <div className="space-y-4">
                <p className="text-sm text-elec-light/80">Pre-configured material packages for common jobs</p>
                <div className="grid gap-4">
                  <Card className="bg-card/50 border-elec-yellow/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Home className="h-5 w-5 text-elec-yellow" />
                        Kitchen Rewire Package
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-elec-light/80 mb-3">
                        Complete materials for typical kitchen rewire (12 sockets, 8 downlights)
                      </p>
                      <Button
                        onClick={() => handleQuickAddCombination("kitchen_rewire")}
                        className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        Add Kitchen Package
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-elec-yellow/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Zap className="h-5 w-5 text-elec-yellow" />
                        Living Room Lighting
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-elec-light/80 mb-3">
                        6 fire-rated downlights with switching and circuit protection
                      </p>
                      <Button
                        onClick={() => handleQuickAddCombination("living_room_lighting")}
                        className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        Add Lighting Package
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-elec-yellow/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Home className="h-5 w-5 text-elec-yellow" />
                        3-Bed House Rewire Kit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-elec-light/80 mb-3">
                        Complete materials for 3-bedroom house: sockets, lights, switches, cables, consumer unit & shower
                      </p>
                      <div className="text-xs text-elec-light/60 mb-3">
                        13 sockets • 10 lights • Consumer unit • 250m cables • Shower supply
                      </div>
                      <Button
                        onClick={() => handleQuickAddCombination("house_rewire_3bed")}
                        className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        Add 3-Bed Kit (£2,800+)
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-elec-yellow/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Settings className="h-5 w-5 text-elec-yellow" />
                        Garage Supply
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-elec-light/80 mb-3">
                        Sub-main supply to garage with distribution board
                      </p>
                      <Button
                        onClick={() => handleQuickAddCombination("garage_supply")}
                        className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        Add Garage Package
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          }
        ]}
        defaultValue="search"
        placeholder="Select option"
      />

    </div>
  );
};

export default MaterialSearchEnhanced;