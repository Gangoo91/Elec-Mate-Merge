
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Search,
  Cable,
  Zap,
  Shield,
  Settings,
  Wrench,
  Building
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";
import MaterialPricingWidget from "@/components/electrician-materials/MaterialPricingWidget";
import MaterialSearchWidget from "@/components/electrician-materials/MaterialSearchWidget";

const ElectricalMaterials = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const materialCategories = [
    {
      id: "cables",
      title: "Cables & Wiring",
      description: "Twin & Earth, SWA, flex cables and data cables",
      icon: <Cable className="h-6 w-6" />,
      path: "/electrician/materials/cables",
      color: "bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "components",
      title: "Electrical Components",
      description: "Consumer units, MCBs, RCDs and isolators",
      icon: <Zap className="h-6 w-6" />,
      path: "/electrician/materials/components",
      color: "bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "protection",
      title: "Protection Equipment",
      description: "Earth rods, surge protectors and circuit breakers",
      icon: <Shield className="h-6 w-6" />,
      path: "/electrician/materials/protection",
      color: "bg-red-500/10 border-red-500/20"
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      description: "Junction boxes, cable glands and trunking",
      icon: <Settings className="h-6 w-6" />,
      path: "/electrician/materials/accessories",
      color: "bg-green-500/10 border-green-500/20"
    },
    {
      id: "lighting",
      title: "Lighting Solutions",
      description: "LED downlights, battens and emergency lighting",
      icon: <Building className="h-6 w-6" />,
      path: "/electrician/materials/lighting",
      color: "bg-purple-500/10 border-purple-500/20"
    },
    {
      id: "tools",
      title: "Electrical Tools",
      description: "Testing equipment, hand tools and power tools",
      icon: <Wrench className="h-6 w-6" />,
      path: "/electrician/materials/tools",
      color: "bg-orange-500/10 border-orange-500/20"
    }
  ];

  const filteredMaterials = materialCategories.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Package className="h-8 w-8 text-elec-yellow" />
          Electrical Materials Hub
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional electrical materials sourcing and pricing. Compare suppliers, track prices, and find the best deals.
        </p>
      </div>

      {/* Search and Live Pricing Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MaterialSearchWidget />
        </div>
        <div>
          <MaterialPricingWidget />
        </div>
      </div>

      {/* Quick Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-elec-gray/50 border-elec-yellow/20"
          />
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card 
            key={material.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${material.color} bg-elec-gray/50`}
            onClick={() => navigate(material.path)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-elec-yellow/10">
                  {material.icon}
                </div>
              </div>
              <CardTitle className="text-lg">{material.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {material.description}
              </p>
              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(material.path);
                }}
              >
                Browse Materials
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No materials found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available categories.
          </p>
        </div>
      )}

      {/* Enhanced Category Browser */}
      <MaterialCategoryBrowser />

      {/* Quick Info */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Professional Electrical Materials</h3>
            <p className="text-sm text-muted-foreground">
              Access competitive pricing from leading suppliers, track material costs, and compare 
              products from trusted electrical wholesalers across the UK.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalMaterials;
