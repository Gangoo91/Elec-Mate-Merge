
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, TrendingDown, Info } from "lucide-react";

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

interface RegionalJobPricingProps {
  regionalData: RegionalPricingData[];
}

const RegionalJobPricing = ({ regionalData }: RegionalJobPricingProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique regions and categories
  const regions = ["all", ...new Set(regionalData.map(item => item.region))];
  const categories = ["all", ...new Set(regionalData.map(item => item.job_category))];

  // Filter data based on selections
  const filteredData = regionalData.filter(item => {
    const regionMatch = selectedRegion === "all" || item.region === selectedRegion;
    const categoryMatch = selectedCategory === "all" || item.job_category === selectedCategory;
    return regionMatch && categoryMatch;
  });

  // Group by region for better display
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.region]) {
      acc[item.region] = [];
    }
    acc[item.region].push(item);
    return acc;
  }, {} as Record<string, RegionalPricingData[]>);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number, currency: string = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          UK Regional Job Pricing
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.slice(1).map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No pricing data available for the selected filters.</p>
            <p className="text-sm mt-2">Try selecting different region or category options.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedData).map(([region, items]) => (
              <div key={region} className="space-y-3">
                <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
                  {region} {items[0]?.county && `(${items[0].county})`}
                </h3>
                
                <div className="grid gap-3">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-elec-yellow/20 rounded-lg bg-elec-gray/50"
                    >
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
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span>Range: {formatPrice(item.min_price)} - {formatPrice(item.max_price)}</span>
                          <span className="text-elec-yellow font-medium">
                            Avg: {formatPrice(item.average_price)}
                          </span>
                          <span>{item.unit}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 sm:mt-0">
                        <div className="text-right">
                          <div className="text-lg font-bold text-elec-yellow">
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
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Regional Pricing Information
          </h4>
          <p className="text-sm text-muted-foreground">
            Prices shown are indicative of current UK market rates and may vary by supplier, complexity, and local factors. 
            Always obtain multiple quotes for accurate pricing. Data sourced from market research and industry reports.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalJobPricing;
