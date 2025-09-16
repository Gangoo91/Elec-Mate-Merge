import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Search, Info, X, Filter, SlidersHorizontal, TrendingUp } from "lucide-react";
import EnhancedPricingCard from "./EnhancedPricingCard";

interface RegionalPricingData {
  id: string;
  region: string;
  county?: string;
  postcode?: string;
  job_type: string;
  job_category: string;
  min_price: number;
  max_price: number;
  average_price: number;
  currency: string;
  unit: string;
  complexity_level: string;
  last_updated: string;
  data_source: string;
  confidence_score?: number;
  is_approximate?: boolean;
}

interface SearchDrivenRegionalPricingProps {
  regionalData: RegionalPricingData[];
}

const SearchDrivenRegionalPricing = ({ regionalData }: SearchDrivenRegionalPricingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Quick search options
  const quickLocations = ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Glasgow", "Liverpool", "Sheffield"];
  const quickJobTypes = [
    "Socket Installation", "Consumer Unit", "Rewiring", "Testing", "Fault Finding",
    "Light Switch", "Outdoor Socket", "Cooker Point", "EV Charger", "Smoke Alarm",
    "Shower Installation", "Fuse Box", "Ceiling Fan", "Emergency Lighting"
  ];

  // Popular results to show by default
  const popularJobs = useMemo(() => {
    const jobCounts = regionalData.reduce((acc, item) => {
      acc[item.job_type] = (acc[item.job_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(jobCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([jobType]) => jobType);
  }, [regionalData]);

  const defaultResults = useMemo(() => {
    return regionalData
      .filter(item => popularJobs.includes(item.job_type))
      .sort((a, b) => b.confidence_score! - a.confidence_score!)
      .slice(0, 6);
  }, [regionalData, popularJobs]);

  // Fuzzy search function
  const fuzzyMatch = (text: string, search: string): boolean => {
    const searchLower = search.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Exact match gets highest priority
    if (textLower.includes(searchLower)) return true;
    
    // Split search terms and check each
    const searchTerms = searchLower.split(' ');
    return searchTerms.every(term => textLower.includes(term));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
    setSelectedCategory("all");
    setSelectedComplexity("all");
    setPriceRange([0, 5000]);
    setSortBy("relevance");
  };

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
    setShowResults(true);
  };

  // Enhanced filtering and sorting
  const filteredData = useMemo(() => {
    let results = regionalData;

    // Text search with fuzzy matching
    if (searchTerm.trim()) {
      results = results.filter(item => 
        fuzzyMatch(item.region, searchTerm) ||
        fuzzyMatch(item.county || "", searchTerm) ||
        fuzzyMatch(item.job_type, searchTerm) ||
        fuzzyMatch(item.job_category, searchTerm) ||
        fuzzyMatch(item.postcode || "", searchTerm)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter(item => item.job_category === selectedCategory);
    }

    // Complexity filter
    if (selectedComplexity !== "all") {
      results = results.filter(item => item.complexity_level === selectedComplexity);
    }

    // Price range filter
    results = results.filter(item => 
      item.average_price >= priceRange[0] && item.average_price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case "price_low":
        results.sort((a, b) => a.min_price - b.min_price);
        break;
      case "price_high":
        results.sort((a, b) => b.min_price - a.min_price);
        break;
      case "confidence":
        results.sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0));
        break;
      case "recent":
        results.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
        break;
      default: // relevance
        results.sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0));
    }

    return results;
  }, [regionalData, searchTerm, selectedCategory, selectedComplexity, priceRange, sortBy]);

  const formatPrice = (price: number, currency: string = 'GBP') => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '£0.00';
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const categories = [...new Set(regionalData.map(item => item.job_category))].filter(Boolean);
  const complexityLevels = [...new Set(regionalData.map(item => item.complexity_level))].filter(Boolean);

  const showingResults = showResults || searchTerm.trim();
  const displayData = showingResults ? filteredData : defaultResults;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray mobile-card">
      <CardHeader className="pb-4">
        <CardTitle className="mobile-heading flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Regional Job Pricing
        </CardTitle>
        <p className="mobile-text text-muted-foreground">
          Search for pricing information by region, county, or job type
        </p>
      </CardHeader>
      
      <CardContent className="mobile-input-spacing">
        {/* Search Interface */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Search by region, county, or job type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 mobile-focus"
            />
            <Button onClick={handleSearch} disabled={!searchTerm.trim()} className="touch-target">
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className="touch-target"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            {showingResults && (
              <Button variant="outline" onClick={clearSearch} className="touch-target">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="mobile-small-text font-medium text-elec-yellow mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mobile-focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mobile-small-text font-medium text-elec-yellow mb-2 block">Complexity</label>
                  <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                    <SelectTrigger className="mobile-focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {complexityLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mobile-small-text font-medium text-elec-yellow mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="mobile-focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mobile-small-text font-medium text-elec-yellow mb-2 block">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results or Default Content */}
        {showingResults ? (
          filteredData.length > 0 ? (
            <div className="mobile-section-spacing">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <p className="mobile-small-text text-muted-foreground">
                  Found {filteredData.length} result(s) {searchTerm && `for "${searchTerm}"`}
                </p>
                {filteredData.length > 6 && (
                  <Badge variant="outline" className="w-fit">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Showing top results
                  </Badge>
                )}
              </div>
              
              <div className="mobile-grid-auto">
                {filteredData.slice(0, 12).map((item) => (
                  <EnhancedPricingCard key={item.id} pricingData={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mobile-text">No pricing data found{searchTerm && ` for "${searchTerm}"`}</p>
              <p className="mobile-small-text mt-2">Try adjusting your search or filters.</p>
            </div>
          )
        ) : (
          /* Default State with Popular Results */
          <div className="mobile-section-spacing">
            {/* Popular Results */}
            <div className="mb-6">
              <h3 className="mobile-subheading text-elec-yellow mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Popular Jobs
              </h3>
              <div className="mobile-grid-auto">
                {defaultResults.map((item) => (
                  <EnhancedPricingCard key={item.id} pricingData={item} />
                ))}
              </div>
            </div>

            {/* Quick Search */}
            <div className="py-6 text-muted-foreground">
              <p className="mobile-text font-medium mb-4 text-center">Quick search</p>

              <div className="mb-6">
                <h4 className="mobile-small-text uppercase tracking-wider text-elec-yellow/80 mb-3 text-center">Popular locations</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickLocations.map((loc) => (
                    <Button
                      key={loc}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSearch(loc)}
                      className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow mobile-interactive touch-target"
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mobile-small-text uppercase tracking-wider text-elec-yellow/80 mb-3 text-center">Common jobs</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickJobTypes.map((job) => (
                    <Button
                      key={job}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSearch(job)}
                      className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow mobile-interactive touch-target"
                    >
                      {job}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 p-4 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
          <h4 className="mobile-text font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Regional Pricing Information
          </h4>
          <p className="mobile-small-text text-muted-foreground">
            Prices shown are indicative of current UK market rates and may vary by supplier, complexity, and local factors. 
            Always obtain multiple quotes for accurate pricing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchDrivenRegionalPricing;