import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Search,
  Loader2,
  Zap,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
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
import PremiumMaterialCategoryCard from "@/components/electrician-materials/PremiumMaterialCategoryCard";
import { getMaterialCategoryStyle, MATERIAL_CATEGORY_META } from "@/components/electrician-materials/materialCategoryStyleUtils";
import { cn } from "@/lib/utils";

const ElectricalMaterials = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
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
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-weekly-scraper', {
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

  const materialCategories = [
    { id: "cables", path: "/electrician/materials/category/cables" },
    { id: "fixings-consumables", path: "/electrician/materials/category/fixings-consumables" },
    { id: "components", path: "/electrician/materials/category/components" },
    { id: "accessories", path: "/electrician/materials/category/accessories" },
    { id: "cable-management", path: "/electrician/materials/category/cable-management" },
    { id: "protection", path: "/electrician/materials/category/protection" },
    { id: "lighting", path: "/electrician/materials/category/lighting" },
    { id: "smart-controls", path: "/electrician/materials/category/smart-controls" },
    { id: "data-networking", path: "/electrician/materials/category/data-networking" },
    { id: "heating-controls", path: "/electrician/materials/category/heating-controls" },
    { id: "ev-charging", path: "/electrician/materials/category/ev-charging" },
    { id: "fire-security", path: "/electrician/materials/category/fire-security" },
  ].map(cat => ({
    ...cat,
    title: MATERIAL_CATEGORY_META[cat.id]?.title || cat.id,
    description: MATERIAL_CATEGORY_META[cat.id]?.description || "Browse materials",
    productCount: categories?.find(c => c.id === cat.id)?.productCount || 0,
  }));

  const filteredMaterials = materialCategories.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in p-0  ">
      {/* Premium Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 sm:p-4 rounded-2xl bg-primary/10 border border-primary/20">
            <Package className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Materials
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Browse electrical materials for your projects
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleUpdateProducts}
            disabled={isUpdating || isForceUpdating}
            variant="outline"
            className="shrink-0 h-11 px-4 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 touch-manipulation active:scale-[0.98]"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isUpdating || isForceUpdating}
                variant="destructive"
                className="shrink-0 h-11 px-4 rounded-xl touch-manipulation active:scale-[0.98]"
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

          <SmartBackButton />
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        {!searchTerm && (
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search material categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            "h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-primary/40 focus:ring-2 focus:ring-primary/20 placeholder:text-white/40",
            !searchTerm && "pl-12"
          )}
        />
      </div>

      {/* Premium Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredMaterials.map((material, index) => (
          <div
            key={material.id}
            className="stagger-enter"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <PremiumMaterialCategoryCard
              category={material}
              onClick={() => navigate(material.path)}
              isLoading={isLoadingCounts}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-block mb-4">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">No materials found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available categories.
          </p>
        </div>
      )}

      {/* Info Card */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm rounded-xl">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Materials are automatically updated weekly using Firecrawl 2.0. Real-time pricing from major UK suppliers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalMaterials;
