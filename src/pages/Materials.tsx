
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";

const Materials = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdateProducts = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase.rpc('trigger_materials_weekly_refresh');
      
      if (error) {
        console.error('Error triggering materials refresh:', error);
        toast({
          title: "Update Failed",
          description: "Failed to trigger materials update. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Update Started",
          description: "Materials refresh has been triggered. This may take a few minutes to complete.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating materials.",
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
              Browse electrical materials from leading UK suppliers. Real-time pricing and availability from Screwfix, Toolstation, RS Components, and CEF.
            </p>
          </div>
          <Button
            onClick={handleUpdateProducts}
            disabled={isUpdating}
            variant="outline"
            className="shrink-0"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating...' : 'Update Products'}
          </Button>
        </div>

        <MaterialCategoryBrowser />
      </div>
    </div>
  );
};

export default Materials;
