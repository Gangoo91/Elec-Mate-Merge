import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";

const Materials = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const { toast } = useToast();

  const addLog = (message: string) => {
    console.log(message);
    setActionLog(prev => [...prev, message]);
  };

  const handleRefresh = async () => {
    setIsUpdating(true);
    setActionLog([]);
    
    try {
      addLog("🔄 Starting materials refresh...");
      addLog("📡 Calling simple-materials-scraper edge function...");
      
      toast({
        title: "Fetching Materials",
        description: "Calling Firecrawl API to scrape Screwfix products...",
      });
      
      const { data, error } = await supabase.functions.invoke('simple-materials-scraper', {
        body: {}
      });
      
      if (error) {
        addLog(`❌ Edge function error: ${error.message}`);
        throw error;
      }

      const materialsCount = data?.materials?.length || 0;
      addLog(`✅ Edge function completed successfully`);
      addLog(`📦 Received ${materialsCount} materials from Screwfix`);
      
      if (materialsCount > 0) {
        addLog("🔄 Reloading page to display new materials...");
        toast({
          title: "Success!",
          description: `Fetched ${materialsCount} products. Refreshing page...`,
        });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        addLog("⚠️ No materials returned - check edge function logs");
        toast({
          title: "No Products Found",
          description: "The scraper returned 0 products. Check the edge function logs.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      addLog(`❌ Error: ${errorMessage}`);
      
      toast({
        title: "Refresh Failed",
        description: errorMessage,
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
            {isUpdating ? 'Fetching from Screwfix...' : 'Update Products'}
          </Button>
        </div>

        {actionLog.length > 0 && (
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-elec-yellow mb-2">Action Log:</h3>
            <div className="space-y-1 text-sm font-mono">
              {actionLog.map((log, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-2 ${
                    log.includes('❌') ? 'text-red-400' : 
                    log.includes('✅') ? 'text-green-400' : 
                    log.includes('⚠️') ? 'text-yellow-400' :
                    'text-muted-foreground'
                  }`}
                >
                  {log.includes('✅') && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
                  {log.includes('❌') && <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <MaterialCategoryBrowser />
      </div>
    </div>
  );
};

export default Materials;
