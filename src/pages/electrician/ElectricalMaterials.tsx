
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMaterialsData } from "@/hooks/useMaterialsData";
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

// Enhanced Components
import MaterialsNavigationHeader from "@/components/electrician-materials/enhanced/MaterialsNavigationHeader";
import EnhancedMaterialSearch from "@/components/electrician-materials/enhanced/EnhancedMaterialSearch";
import DealsCarousel from "@/components/electrician-materials/enhanced/DealsCarousel";
import CategoryMegaMenu from "@/components/electrician-materials/enhanced/CategoryMegaMenu";

const ElectricalMaterials = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isForceUpdating, setIsForceUpdating] = useState(false);
  const { data: categories, isLoading: isLoadingCounts } = useMaterialsData();
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

  // Removed materialCategories array - now handled by CategoryMegaMenu component

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Navigation Header */}
      <MaterialsNavigationHeader />
      
      {/* Enhanced Search Bar */}
      <EnhancedMaterialSearch />
      
      <div className="container space-y-8 py-6">
        {/* Deals Section */}
        <section>
          <DealsCarousel />
        </section>
        
        {/* Categories Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground">
              Explore our comprehensive range of electrical materials and components
            </p>
          </div>
          <CategoryMegaMenu />
        </section>

        {/* Admin Controls - Moved to bottom */}
        <section className="pt-8 border-t border-elec-yellow/20">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">System Controls</CardTitle>
              <CardDescription>
                Manage materials database updates and cache refresh
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleUpdateProducts}
                  disabled={isUpdating || isForceUpdating}
                  variant="outline"
                  className="shrink-0"
                >
                  {isUpdating ? 'Updating...' : 'Weekly Refresh'}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={isUpdating || isForceUpdating}
                      variant="destructive"
                      className="shrink-0"
                    >
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

                <Link to="/electrician/business">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Business Hub
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Materials are automatically updated weekly using Firecrawl 2.0. Real-time pricing from major UK suppliers.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ElectricalMaterials;
