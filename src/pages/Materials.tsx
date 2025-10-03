
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";

const Materials = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isForceUpdating, setIsForceUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState<string>('');
  const { toast } = useToast();

  const handleUpdateProducts = async () => {
    setIsUpdating(true);
    setUpdateProgress('Starting update...');
    
    try {
      console.log('🔄 [UPDATE-FLOW] Button clicked - starting materials update');
      
      toast({
        title: "Update Started",
        description: "Refreshing all materials data...",
      });
      
      setUpdateProgress('Triggering refresh...');
      const { error } = await supabase.rpc('trigger_materials_weekly_refresh');
      
      if (error) {
        console.error('❌ [UPDATE-FLOW] RPC error:', error);
        setUpdateProgress('');
        toast({
          title: "Update Failed",
          description: "Failed to trigger materials update. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      setUpdateProgress('Refresh triggered successfully');
      console.log('✅ [UPDATE-FLOW] Materials refresh triggered');
      
      toast({
        title: "Update Started",
        description: "Materials refresh has been triggered. Check back in a few minutes.",
        variant: "success",
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setUpdateProgress('');
      }, 3000);
      
    } catch (error) {
      console.error('❌ [UPDATE-FLOW] Error:', error);
      setUpdateProgress('');
      toast({
        title: "Update Failed",
        description: "An error occurred while updating materials.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
    }
  };

  const handleForceUpdate = async () => {
    setIsForceUpdating(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { forceRefresh: true, bypassCache: true }
      });
      
      if (error) {
        console.error('Error forcing materials update:', error);
        toast({
          title: "Force Update Failed",
          description: "Failed to force materials update. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Force Update Started",
          description: "Materials cache is being forcefully refreshed. This may take 5-10 minutes to complete.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Force Update Failed",
        description: "An error occurred while forcing materials update.",
        variant: "destructive",
      });
    } finally {
      setIsForceUpdating(false);
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
          <div className="flex gap-2">
            <div className="flex flex-col items-end gap-1">
              <Button
                onClick={handleUpdateProducts}
                disabled={isUpdating || isForceUpdating}
                variant="outline"
                className="shrink-0"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? 'Updating...' : 'Update Products'}
              </Button>
              {updateProgress && (
                <span className="text-xs text-muted-foreground">{updateProgress}</span>
              )}
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isUpdating || isForceUpdating}
                  variant="destructive"
                  className="shrink-0"
                >
                  <Zap className={`w-4 h-4 mr-2 ${isForceUpdating ? 'animate-pulse' : ''}`} />
                  {isForceUpdating ? 'Force Updating...' : 'Force Update'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Force Update Materials Cache</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will bypass all cache logic and forcefully refresh the materials database. 
                    This process may take 5-10 minutes and should only be used when absolutely necessary.
                    Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleForceUpdate} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Force Update
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <MaterialCategoryBrowser />
      </div>
    </div>
  );
};

export default Materials;
