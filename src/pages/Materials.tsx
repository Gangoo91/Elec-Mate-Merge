import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";

const Materials = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsUpdating(true);
    try {
      toast({
        title: "Refreshing...",
        description: "Fetching latest materials from Screwfix...",
      });
      
      window.location.reload();
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Electrical Materials - Elec-Mate</title>
        <meta name="description" content="Browse and source electrical materials from multiple suppliers. Compare prices on cables, components, protection equipment and more." />
        <meta name="keywords" content="electrical materials, cables, MCBs, RCDs, electrical components, UK suppliers" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Electrical Materials</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Browse electrical materials from Screwfix. Real-time pricing and availability.
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isUpdating}
            variant="outline"
            className="shrink-0"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Refreshing...' : 'Refresh Products'}
          </Button>
        </div>

        <MaterialCategoryBrowser />
      </div>
    </div>
  );
};

export default Materials;
