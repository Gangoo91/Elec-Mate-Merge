import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Info, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RegionalPricingData {
  id: string;
  region: string;
  county: string;
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
}

interface PricingResult {
  success: boolean;
  results: RegionalPricingData[];
  isApproximate: boolean;
  location: any;
  searchLocation: string;
  jobType: string;
}

const EnhancedRegionalPricing = () => {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [results, setResults] = useState<RegionalPricingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isApproximate, setIsApproximate] = useState(false);
  const { toast } = useToast();

  const jobTypes = [
    "Socket Installation",
    "Consumer Unit Change", 
    "Rewire 3-bed House",
    "PAT Testing",
    "EICR Inspection",
    "Light Fitting",
    "Outdoor Lighting",
    "Electric Shower Installation"
  ];

  const handleSearch = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a postcode or town name",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const { data, error } = await supabase.functions.invoke('regional-pricing', {
        body: { location: location.trim(), jobType: jobType === "all" ? null : jobType }
      });

      if (error) {
        console.error('Regional pricing error:', error);
        toast({
          title: "Search Failed",
          description: "Unable to fetch pricing data. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const result = data as PricingResult;
      setResults(result.results || []);
      setIsApproximate(result.isApproximate || false);
      setShowResults(true);

      if (result.results?.length === 0) {
        toast({
          title: "No Results",
          description: "No pricing data found for this location. Try a different area.",
          variant: "destructive"
        });
      } else if (result.isApproximate) {
        toast({
          title: "Approximate Results",
          description: "Showing approximate pricing based on regional averages",
        });
      }

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setLocation("");
    setJobType("all");
    setResults([]);
    setShowResults(false);
    setIsApproximate(false);
  };

  const formatPrice = (price: number, currency: string = 'GBP') => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '£0.00';
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity?.toLowerCase()) {
      case 'simple': return 'bg-green-100 text-green-800 border-green-200';
      case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'complex': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Regional Job Pricing
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get pricing estimates for electrical work in your area
        </p>
      </CardHeader>
      
      <CardContent>
        {/* Search Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Enter postcode or town (e.g. M1 1AA, Manchester, London)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
          </div>
          
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger>
              <SelectValue placeholder="All job types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All job types</SelectItem>
              {jobTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 mb-4">
          <Button 
            onClick={handleSearch} 
            disabled={!location.trim() || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search Pricing
          </Button>
          
          {showResults && (
            <Button variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>

        {/* Approximate Results Warning */}
        {showResults && isApproximate && (
          <div className="mb-4 p-3 border border-orange-200 rounded-lg bg-orange-50">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Approximate Results</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              No exact data for this location. Showing regional estimates adjusted for your area.
            </p>
          </div>
        )}

        {/* Search Results */}
        {showResults && results.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Found {results.length} result(s) for "{location}"
              {jobType !== "all" && ` • ${jobType}`}
            </p>
            
            {results.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-gray/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-medium">{item.job_type}</h4>
                      <Badge 
                        variant="outline" 
                        className={getComplexityColor(item.complexity_level)}
                      >
                        {item.complexity_level}
                      </Badge>
                      <Badge variant="secondary">
                        {item.job_category}
                      </Badge>
                      {isApproximate && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                          Approximate
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{item.region}</span>
                      {item.county && ` • ${item.county}`}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
                      <span>Range: {formatPrice(item.min_price)} - {formatPrice(item.max_price)}</span>
                      <span className="text-elec-yellow font-medium">
                        Avg: {formatPrice(item.average_price)}
                      </span>
                      <span>{item.unit}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-elec-yellow">
                      {formatPrice(item.average_price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {new Date(item.last_updated).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Welcome State */}
        {!showResults && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium mb-2">Search Regional Job Pricing</p>
            <p className="text-sm">
              Enter your postcode or town to view current pricing information for electrical work in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
              <Badge variant="outline">M1 1AA</Badge>
              <Badge variant="outline">London</Badge>
              <Badge variant="outline">Birmingham</Badge>
              <Badge variant="outline">Edinburgh</Badge>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 p-3 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Pricing Information
          </h4>
          <p className="text-sm text-muted-foreground">
            Prices are indicative of current UK market rates and may vary by supplier, complexity, and local factors. 
            Always obtain multiple quotes for accurate pricing. Data sourced from industry standards and regional surveys.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRegionalPricing;