
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, LayoutGrid, Wrench, PlusCircle, Loader2, TrendingUp, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ToolStats {
  totalTools: number;
  categories: Record<string, number>;
  priceRange: { min: number; max: number };
  topDeals: number;
}

const ProjectManagement = () => {
  const [toolStats, setToolStats] = useState<ToolStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchToolStats();
  }, []);

  const fetchToolStats = async () => {
    try {
      setIsLoading(true);
      console.log('📊 Fetching tool statistics from Firecrawl...');
      
      const { data, error } = await supabase.functions.invoke('firecrawl-tools-scraper');
      
      if (error) {
        console.error('❌ Error fetching tool stats:', error);
        toast.error('Failed to load tool statistics');
        return;
      }

      if (Array.isArray(data) && data.length > 0) {
        // Calculate statistics from live tool data
        const categories: Record<string, number> = {};
        let minPrice = Infinity;
        let maxPrice = 0;
        let dealsCount = 0;

        data.forEach((tool: any) => {
          // Extract category from name or use default
          const category = tool.category || 'General Tools';
          categories[category] = (categories[category] || 0) + 1;

          // Extract price for range calculation
          const priceMatch = tool.price?.match(/£([\d,]+\.?\d*)/);
          if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace(',', ''));
            minPrice = Math.min(minPrice, price);
            maxPrice = Math.max(maxPrice, price);
          }

          // Count deals (tools with sale prices)
          if (tool.salePrice || tool.isOnSale) {
            dealsCount++;
          }
        });

        setToolStats({
          totalTools: data.length,
          categories,
          priceRange: { 
            min: minPrice === Infinity ? 0 : minPrice, 
            max: maxPrice 
          },
          topDeals: dealsCount
        });

        console.log('✅ Tool statistics loaded:', {
          total: data.length,
          categories: Object.keys(categories).length,
          deals: dealsCount
        });
      }
    } catch (error) {
      console.error('❌ Error in fetchToolStats:', error);
      toast.error('Failed to load tool statistics');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Electrical Workshop</CardTitle>
              <CardDescription>
                Live toolkit with real-time tool data and pricing.
              </CardDescription>
            </div>
            <Link to="/electrician/tools">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Browse Tools
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
              <p className="text-muted-foreground">Loading live tool data...</p>
            </div>
          ) : toolStats ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-4 text-center">
                  <Package className="h-6 w-6 mx-auto mb-2 text-elec-yellow" />
                  <div className="text-2xl font-bold text-white">{toolStats.totalTools}</div>
                  <div className="text-sm text-muted-foreground">Tools Available</div>
                </div>
                <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-elec-yellow" />
                  <div className="text-2xl font-bold text-white">{toolStats.topDeals}</div>
                  <div className="text-sm text-muted-foreground">Current Deals</div>
                </div>
                <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-4 text-center">
                  <Calculator className="h-6 w-6 mx-auto mb-2 text-elec-yellow" />
                  <div className="text-2xl font-bold text-white">
                    £{toolStats.priceRange.min}-{toolStats.priceRange.max}
                  </div>
                  <div className="text-sm text-muted-foreground">Price Range</div>
                </div>
              </div>
              <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-4">
                <h4 className="font-medium text-white mb-2">Categories Available:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(toolStats.categories).map(([category, count]) => (
                    <span key={category} className="px-2 py-1 bg-elec-yellow/20 text-elec-yellow text-sm rounded">
                      {category} ({count})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-dark p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Unable to load tool data. Please check your connection.
              </p>
              <Button 
                variant="outline" 
                onClick={fetchToolStats}
                className="w-full sm:w-auto"
              >
                Retry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Live Tool Browser</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse {toolStats?.totalTools || 'live'} tools with real-time pricing and availability.
            </p>
            <Link to="/electrician/tools">
              <Button variant="outline" className="w-full">Browse Tools</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Material Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track materials and tools across different projects with live pricing.
            </p>
            <Link to="/electrician/materials">
              <Button variant="outline" className="w-full">Open Tracker</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Project Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate project costs with {toolStats?.topDeals || 'current'} deals and live pricing.
            </p>
            <Link to="/electrician/tools?tab=guides">
              <Button variant="outline" className="w-full">Use Calculator</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagement;
