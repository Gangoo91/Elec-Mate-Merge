
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
  Building,
  TrendingUp,
  Clock,
  MapPin
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
      color: "bg-blue-500/10 border-blue-500/20",
      productCount: 324,
      trending: true
    },
    {
      id: "components",
      title: "Electrical Components",
      description: "Consumer units, MCBs, RCDs and isolators",
      icon: <Zap className="h-6 w-6" />,
      path: "/electrician/materials/components",
      color: "bg-yellow-500/10 border-yellow-500/20",
      productCount: 186,
      trending: false
    },
    {
      id: "protection",
      title: "Protection Equipment",
      description: "Earth rods, surge protectors and circuit breakers",
      icon: <Shield className="h-6 w-6" />,
      path: "/electrician/materials/protection",
      color: "bg-red-500/10 border-red-500/20",
      productCount: 95,
      trending: true
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      description: "Junction boxes, cable glands and trunking",
      icon: <Settings className="h-6 w-6" />,
      path: "/electrician/materials/accessories",
      color: "bg-green-500/10 border-green-500/20",
      productCount: 412,
      trending: false
    },
    {
      id: "lighting",
      title: "Lighting Solutions",
      description: "LED downlights, battens and emergency lighting",
      icon: <Building className="h-6 w-6" />,
      path: "/electrician/materials/lighting",
      color: "bg-purple-500/10 border-purple-500/20",
      productCount: 278,
      trending: true
    },
    {
      id: "tools",
      title: "Electrical Tools",
      description: "Testing equipment, hand tools and power tools",
      icon: <Wrench className="h-6 w-6" />,
      path: "/electrician/materials/tools",
      color: "bg-orange-500/10 border-orange-500/20",
      productCount: 156,
      trending: false
    }
  ];

  const filteredMaterials = materialCategories.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-elec-yellow/20 rounded-full">
            <Package className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Electrical Materials Hub
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Professional electrical materials sourcing and pricing platform. Compare suppliers, 
          track real-time prices, and find the best deals for your electrical projects.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-6">
          <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/20">
            <div className="text-2xl font-bold text-elec-yellow">1,400+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/20">
            <div className="text-2xl font-bold text-elec-yellow">50+</div>
            <div className="text-sm text-muted-foreground">Suppliers</div>
          </div>
          <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/20">
            <div className="text-2xl font-bold text-elec-yellow">Live</div>
            <div className="text-sm text-muted-foreground">Pricing</div>
          </div>
          <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/20">
            <div className="text-2xl font-bold text-elec-yellow">24/7</div>
            <div className="text-sm text-muted-foreground">Access</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Search & Filters */}
        <div className="lg:col-span-3 space-y-6">
          <MaterialSearchWidget />
          
          {/* Quick Search Bar */}
          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Quick search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray/50 border-elec-yellow/20"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMaterials.map((material) => (
              <Card 
                key={material.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${material.color} bg-elec-gray/50 hover:border-elec-yellow/50`}
                onClick={() => navigate(material.path)}
              >
                <CardHeader className="text-center pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex justify-center flex-1">
                      <div className="p-3 rounded-full bg-elec-yellow/10">
                        {material.icon}
                      </div>
                    </div>
                    {material.trending && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-white">{material.title}</CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {material.productCount} products available
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
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

          {/* No Results State */}
          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-white">No materials found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available categories.
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Live Pricing */}
        <div className="space-y-6">
          <MaterialPricingWidget />
          
          {/* Quick Info Cards */}
          <Card className="bg-elec-gray/30 border-elec-yellow/20">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                Delivery Info
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Same day collection available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Next day delivery on stock items</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-gray/30 border-elec-yellow/20">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-white">Trade Account Benefits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Competitive trade pricing</li>
                <li>• Monthly billing options</li>
                <li>• Priority stock allocation</li>
                <li>• Dedicated account manager</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Category Browser */}
      <MaterialCategoryBrowser />

      {/* Professional Info Footer */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-white">Professional Electrical Materials Platform</h3>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              Access competitive pricing from leading UK electrical suppliers, track material costs in real-time, 
              and compare products from trusted wholesalers. Built specifically for electrical contractors, 
              apprentices, and industry professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                BS 7671 Compliant
              </Badge>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                NICEIC Approved Suppliers
              </Badge>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                ECA Recommended
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalMaterials;
