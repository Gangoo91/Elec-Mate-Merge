
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Info } from "lucide-react";

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

interface SearchDrivenRegionalPricingProps {
  regionalData: RegionalPricingData[];
}

const SearchDrivenRegionalPricing = ({ regionalData }: SearchDrivenRegionalPricingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

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
  };

  // Filter data based on search term
  const filteredData = regionalData.filter(item => 
    item?.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.county?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.job_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.job_category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      case 'simple': return 'bg-green-100 text-green-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          Search for pricing information by region, county, or job type
        </p>
      </CardHeader>
      
      <CardContent>
        {/* Search Interface */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search by region, county, or job type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={!searchTerm.trim()}>
            <Search className="h-4 w-4" />
          </Button>
          {showResults && (
            <Button variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>

        {/* Search Results */}
        {showResults ? (
          filteredData.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Found {filteredData.length} result(s) for "{searchTerm}"
              </p>
              
              {filteredData.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-gray/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-medium">{item.job_type}</h4>
                        <Badge variant="outline" className={getComplexityColor(item.complexity_level)}>
                          {item.complexity_level}
                        </Badge>
                        <Badge variant="secondary">
                          {item.job_category}
                        </Badge>
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pricing data found for "{searchTerm}"</p>
              <p className="text-sm mt-2">Try searching for a different region, county, or job type.</p>
            </div>
          )
        ) : (
          /* Welcome State */
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium mb-2">Search Regional Job Pricing</p>
            <p className="text-sm">
              Enter a region, county, or job type to view current pricing information across the UK.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
              <Badge variant="outline">London</Badge>
              <Badge variant="outline">Manchester</Badge>
              <Badge variant="outline">Birmingham</Badge>
              <Badge variant="outline">Installation</Badge>
              <Badge variant="outline">Testing</Badge>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 p-3 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Regional Pricing Information
          </h4>
          <p className="text-sm text-muted-foreground">
            Prices shown are indicative of current UK market rates and may vary by supplier, complexity, and local factors. 
            Always obtain multiple quotes for accurate pricing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchDrivenRegionalPricing;
