
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Star, 
  History, 
  Download, 
  Share2, 
  BookOpen, 
  Calculator,
  Zap,
  TrendingUp,
  Filter,
  Grid,
  List,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CalculatorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isFavourite: boolean;
  lastUsed?: Date;
  usageCount: number;
  estimatedTime: string;
  regulation?: string;
}

interface CalculatorManagerProps {
  calculators: CalculatorItem[];
  currentCalculator: string;
  onCalculatorSelect: (calculatorId: string) => void;
}

const CalculatorManager: React.FC<CalculatorManagerProps> = ({
  calculators,
  currentCalculator,
  onCalculatorSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'recent'>('name');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [recentCalculators, setRecentCalculators] = useState<string[]>([]);

  // Load user preferences
  useEffect(() => {
    const savedFavourites = localStorage.getItem('calculator-favourites');
    const savedRecent = localStorage.getItem('calculator-recent');
    
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
    if (savedRecent) {
      setRecentCalculators(JSON.parse(savedRecent));
    }
  }, []);

  // Save preferences
  const saveFavourites = (newFavourites: string[]) => {
    setFavourites(newFavourites);
    localStorage.setItem('calculator-favourites', JSON.stringify(newFavourites));
  };

  const saveRecent = (calculatorId: string) => {
    const updatedRecent = [calculatorId, ...recentCalculators.filter(id => id !== calculatorId)].slice(0, 10);
    setRecentCalculators(updatedRecent);
    localStorage.setItem('calculator-recent', JSON.stringify(updatedRecent));
  };

  const toggleFavourite = (calculatorId: string) => {
    const newFavourites = favourites.includes(calculatorId)
      ? favourites.filter(id => id !== calculatorId)
      : [...favourites, calculatorId];
    
    saveFavourites(newFavourites);
    toast({
      title: favourites.includes(calculatorId) ? "Removed from favourites" : "Added to favourites",
      description: "Your calculator preferences have been updated."
    });
  };

  const handleCalculatorSelect = (calculatorId: string) => {
    saveRecent(calculatorId);
    onCalculatorSelect(calculatorId);
  };

  // Filter and sort calculators
  const filteredCalculators = calculators
    .filter(calc => {
      const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          calc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'usage':
          return b.usageCount - a.usageCount;
        case 'recent':
          const aIndex = recentCalculators.indexOf(a.id);
          const bIndex = recentCalculators.indexOf(b.id);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const categories = ['all', ...Array.from(new Set(calculators.map(calc => calc.category)))];
  const favouriteCalculators = calculators.filter(calc => favourites.includes(calc.id));
  const recentCalcs = calculators.filter(calc => recentCalculators.includes(calc.id))
    .sort((a, b) => recentCalculators.indexOf(a.id) - recentCalculators.indexOf(b.id));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const CalculatorCard = ({ calculator }: { calculator: CalculatorItem }) => {
    const Icon = calculator.icon;
    const isFav = favourites.includes(calculator.id);
    const isActive = currentCalculator === calculator.id;

    return (
      <Card 
        className={`cursor-pointer border-2 transition-all hover:border-elec-yellow/50 ${
          isActive ? 'border-elec-yellow bg-elec-yellow/10' : 'border-elec-yellow/20'
        }`}
        onClick={() => handleCalculatorSelect(calculator.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-8 w-8 text-elec-yellow" />
              <div>
                <CardTitle className="text-lg">{calculator.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getDifficultyColor(calculator.difficulty)}>
                    {calculator.difficulty}
                  </Badge>
                  {calculator.regulation && (
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {calculator.regulation}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(calculator.id);
              }}
              className={isFav ? 'text-yellow-400' : 'text-gray-400'}
            >
              <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{calculator.description}</p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Est. time: {calculator.estimatedTime}</span>
            <span>Used {calculator.usageCount} times</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CalculatorListItem = ({ calculator }: { calculator: CalculatorItem }) => {
    const Icon = calculator.icon;
    const isFav = favourites.includes(calculator.id);
    const isActive = currentCalculator === calculator.id;

    return (
      <Card 
        className={`cursor-pointer border transition-all hover:border-elec-yellow/50 ${
          isActive ? 'border-elec-yellow bg-elec-yellow/10' : 'border-elec-yellow/20'
        }`}
        onClick={() => handleCalculatorSelect(calculator.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6 text-elec-yellow" />
              <div>
                <h3 className="font-medium">{calculator.name}</h3>
                <p className="text-sm text-muted-foreground">{calculator.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getDifficultyColor(calculator.difficulty)}>
                    {calculator.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {calculator.estimatedTime} • Used {calculator.usageCount} times
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(calculator.id);
                }}
                className={isFav ? 'text-yellow-400' : 'text-gray-400'}
              >
                <Star className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
              </Button>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-elec-dark border-elec-yellow/20">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32 bg-elec-dark border-elec-yellow/20">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="usage">Most Used</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-elec-yellow/20 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-elec-yellow text-black' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-elec-yellow text-black' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            All Calculators
          </TabsTrigger>
          <TabsTrigger value="favourites" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Favourites ({favourites.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent ({recentCalcs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredCalculators.length === 0 ? (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-8 text-center">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No calculators found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }>
              {filteredCalculators.map(calculator => (
                viewMode === 'grid' 
                  ? <CalculatorCard key={calculator.id} calculator={calculator} />
                  : <CalculatorListItem key={calculator.id} calculator={calculator} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="favourites" className="mt-6">
          {favouriteCalculators.length === 0 ? (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No favourite calculators</h3>
                <p className="text-muted-foreground">
                  Mark calculators as favourites to access them quickly.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }>
              {favouriteCalculators.map(calculator => (
                viewMode === 'grid' 
                  ? <CalculatorCard key={calculator.id} calculator={calculator} />
                  : <CalculatorListItem key={calculator.id} calculator={calculator} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          {recentCalcs.length === 0 ? (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-8 text-center">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No recent calculators</h3>
                <p className="text-muted-foreground">
                  Calculators you use will appear here for quick access.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }>
              {recentCalcs.map(calculator => (
                viewMode === 'grid' 
                  ? <CalculatorCard key={calculator.id} calculator={calculator} />
                  : <CalculatorListItem key={calculator.id} calculator={calculator} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorManager;
