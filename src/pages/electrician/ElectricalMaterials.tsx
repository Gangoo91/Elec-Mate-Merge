
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Search,
  Cable,
  Zap,
  Shield,
  Settings,
  Building,
  ArrowLeft,
  Loader2,
  Boxes,
  Badge as BadgeIcon,
  Wifi,
  Flame,
  Car,
  Home,
  Thermometer,
  Wrench,
  RefreshCw
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
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
    {
      id: "cables",
      title: "Cables & Wiring",
      description: "Twin & Earth, SWA, flex cables and data cables",
      icon: <Cable className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/cables",
      productCount: categories?.find(cat => cat.id === "cables")?.productCount || 0
    },
    {
      id: "fixings-consumables",
      title: "Fixings & Consumables",
      description: "Screws, plugs, cable ties, tape and installation consumables",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/fixings-consumables",
      productCount: categories?.find(cat => cat.id === "fixings-consumables")?.productCount || 0
    },
    {
      id: "components",
      title: "Electrical Components",
      description: "Consumer units, MCBs, RCDs and isolators",
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/components",
      productCount: categories?.find(cat => cat.id === "components")?.productCount || 0
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      description: "Junction boxes, cable glands and trunking",
      icon: <Settings className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/accessories",
      productCount: categories?.find(cat => cat.id === "accessories")?.productCount || 0
    },
    {
      id: "cable-management",
      title: "Cable Management & Conduit",
      description: "Trunking, conduit, cable trays and management systems",
      icon: <Boxes className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/cable-management",
      productCount: categories?.find(cat => cat.id === "cable-management")?.productCount || 0
    },
    {
      id: "protection",
      title: "Protection Equipment",
      description: "Earth rods, surge protectors and circuit breakers",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/protection",
      productCount: categories?.find(cat => cat.id === "protection")?.productCount || 0
    },
    {
      id: "lighting",
      title: "Lighting Solutions",
      description: "LED downlights, battens and emergency lighting",
      icon: <Building className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/lighting",
      productCount: categories?.find(cat => cat.id === "lighting")?.productCount || 0
    },
    {
      id: "smart-controls",
      title: "Smart Home & Controls",
      description: "Smart switches, dimmers, automation and control systems",
      icon: <Home className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/smart-controls",
      productCount: categories?.find(cat => cat.id === "smart-controls")?.productCount || 0
    },
    {
      id: "data-networking",
      title: "Data & Networking",
      description: "Cat6 cables, patch panels, switches and network accessories",
      icon: <Wifi className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/data-networking",
      productCount: categories?.find(cat => cat.id === "data-networking")?.productCount || 0
    },
    {
      id: "heating-controls",
      title: "Heating Controls",
      description: "Thermostats, zone valves, heating timers and controls",
      icon: <Thermometer className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/heating-controls",
      productCount: categories?.find(cat => cat.id === "heating-controls")?.productCount || 0
    },
    {
      id: "ev-charging",
      title: "EV Charging",
      description: "Electric vehicle charging points and installation accessories",
      icon: <Car className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/ev-charging",
      productCount: categories?.find(cat => cat.id === "ev-charging")?.productCount || 0
    },
    {
      id: "fire-security",
      title: "Fire & Security",
      description: "Fire alarms, smoke detectors, security systems and panels",
      icon: <Flame className="h-6 w-6 text-elec-yellow" />,
      path: "/electrician/materials/category/fire-security",
      productCount: categories?.find(cat => cat.id === "fire-security")?.productCount || 0
    }
  ];

  const filteredMaterials = materialCategories.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in p-0">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Materials</h1>
          <p className="text-muted-foreground text-sm md:text-base">Browse electrical materials for your projects</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleUpdateProducts}
            disabled={isUpdating || isForceUpdating}
            variant="outline"
            className="shrink-0"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating...' : 'Update Products'}
          </Button>
          
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

          <Link to="/electrician/business">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Business Hub
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-elec-gray border-elec-yellow/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMaterials.map((material) => (
          <Card 
            key={material.id}
            className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-card backdrop-blur cursor-pointer hover:border-elec-yellow/60 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] group overflow-hidden"
            onClick={() => navigate(material.path)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="pb-3 relative">
              <div className="flex flex-col items-center gap-3">
                <div className="text-elec-yellow group-hover:scale-110 transition-transform duration-300">
                  {material.icon}
                </div>
                <CardTitle className="text-lg text-center text-white group-hover:text-elec-yellow transition-colors">
                  {material.title}
                </CardTitle>
              </div>
              <CardDescription className="text-sm text-center leading-relaxed mt-2">
                {material.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-3">
              {/* Product Count & Status */}
              <div className="flex items-center justify-center gap-2">
                {isLoadingCounts ? (
                  <div className="flex items-center gap-2 text-xs text-elec-yellow/80">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : material.productCount > 0 ? (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 gap-1.5"
                      >
                        <Package className="h-3 w-3" />
                        {material.productCount} available
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Data being collected
                  </span>
                )}
              </div>
              
              {/* View All Indicator */}
              {material.productCount > 0 && (
                <div className="text-center">
                  <span className="text-xs text-elec-yellow/60 group-hover:text-elec-yellow transition-colors">
                    Browse materials →
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No materials found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available categories.
          </p>
        </div>
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Materials are automatically updated weekly using Firecrawl 2.0. Real-time pricing from major UK suppliers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalMaterials;
