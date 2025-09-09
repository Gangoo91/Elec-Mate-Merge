
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Wifi,
  Flame,
  Car,
  Home,
  Thermometer,
  Wrench
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useMaterialsData } from "@/hooks/useMaterialsData";

const ElectricalMaterials = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories, isLoading: isLoadingCounts } = useMaterialsData();

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
        <Link to="/electrician/business">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Business Hub
          </Button>
        </Link>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredMaterials.map((material) => (
          <Card 
            key={material.id}
            className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:border-elec-yellow/50 transition-colors"
            onClick={() => navigate(material.path)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-center gap-3 text-lg text-center">
                {material.icon}
                {material.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {material.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-elec-yellow/80 flex items-center justify-center gap-2 font-medium">
                {isLoadingCounts ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading...
                  </>
                ) : material.productCount > 0 ? (
                  <>
                    <Package className="h-3 w-3" />
                    {material.productCount} products available
                  </>
                ) : (
                  <span className="text-muted-foreground italic">
                    Data being collected
                  </span>
                )}
              </div>
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
