import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cable, 
  Zap, 
  Shield, 
  Building, 
  Settings, 
  Boxes,
  Wifi,
  Flame,
  Car,
  Home,
  Thermometer,
  Wrench,
  ArrowRight,
  TrendingUp,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
  trending?: boolean;
  subcategories: string[];
  popularItems: string[];
  priceRange: string;
  topBrands: string[];
}

const CategoryMegaMenu = () => {
  const categories: CategoryData[] = [
    {
      id: "cables",
      title: "Cables & Wiring",
      description: "Professional electrical cables and wiring solutions",
      icon: <Cable className="h-8 w-8 text-elec-yellow" />,
      productCount: 1247,
      trending: true,
      subcategories: [
        "Twin & Earth Cable",
        "SWA Armoured Cable", 
        "Flex Cables",
        "Data Cables",
        "Fire Rated Cables",
        "Outdoor Cables"
      ],
      popularItems: [
        "2.5mm² Twin & Earth 100m",
        "1.5mm² Twin & Earth 100m", 
        "6mm² Twin & Earth 50m",
        "4mm SWA 3 Core 25m"
      ],
      priceRange: "£15 - £450",
      topBrands: ["Prysmian", "Doncaster", "FP McCann", "Nexans"]
    },
    {
      id: "components",
      title: "Electrical Components",
      description: "Consumer units, MCBs, RCDs and protection devices",
      icon: <Zap className="h-8 w-8 text-elec-yellow" />,
      productCount: 892,
      trending: true,
      subcategories: [
        "Consumer Units",
        "MCBs & RCBOs",
        "RCDs",
        "Isolators",
        "Switches & Sockets",
        "Distribution Boards"
      ],
      popularItems: [
        "10-Way Consumer Unit",
        "32A Type B MCB",
        "30mA RCD",
        "100A Isolator Switch"
      ],
      priceRange: "£3 - £350",
      topBrands: ["Schneider", "Hager", "Wylex", "Crabtree"]
    },
    {
      id: "lighting",
      title: "Lighting Solutions", 
      description: "LED downlights, battens and emergency lighting",
      icon: <Building className="h-8 w-8 text-elec-yellow" />,
      productCount: 756,
      trending: false,
      subcategories: [
        "LED Downlights",
        "LED Battens",
        "Emergency Lighting",
        "Fire Rated Lights",
        "Outdoor Lighting",
        "Strip Lighting"
      ],
      popularItems: [
        "Fire Rated Downlights 6 Pack",
        "5ft LED Batten 22W",
        "Emergency Exit Signs",
        "GU10 LED Dimmable"
      ],
      priceRange: "£8 - £180",
      topBrands: ["Aurora", "Integral", "Kosnic", "JCC"]
    },
    {
      id: "protection",
      title: "Protection Equipment",
      description: "Earth rods, surge protectors and safety equipment",
      icon: <Shield className="h-8 w-8 text-elec-yellow" />,
      productCount: 324,
      trending: false,
      subcategories: [
        "Earth Rods & Clamps",
        "Surge Protection",
        "Arc Fault Detection",
        "Safety Equipment",
        "Test Equipment",
        "Personal Protection"
      ],
      popularItems: [
        "1.2m Earth Rod",
        "Type 2 SPD 3+N",
        "Voltage Tester",
        "Safety Glasses"
      ],
      priceRange: "£12 - £280",
      topBrands: ["Furse", "Dehn", "Phoenix", "OBO"]
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      description: "Junction boxes, cable glands and fixings",
      icon: <Settings className="h-8 w-8 text-elec-yellow" />,
      productCount: 1156,
      trending: false,
      subcategories: [
        "Junction Boxes",
        "Cable Glands",
        "Fixings & Screws",
        "Cable Ties",
        "Grommets",
        "Terminal Blocks"
      ],
      popularItems: [
        "IP55 Junction Box",
        "SWA Cable Glands",
        "Cable Tie Pack 100",
        "Terminal Block Strip"
      ],
      priceRange: "£1 - £45",
      topBrands: ["Schneider", "Wago", "Spelsberg", "Hawke"]
    },
    {
      id: "cable-management",
      title: "Cable Management",
      description: "Trunking, conduit and cable trays",
      icon: <Boxes className="h-8 w-8 text-elec-yellow" />,
      productCount: 468,
      trending: false,
      subcategories: [
        "Trunking Systems",
        "Conduit & Fittings",
        "Cable Trays",
        "Cable Ladders",
        "Underfloor Systems",
        "Dado Trunking"
      ],
      popularItems: [
        "50x50 Trunking 3m",
        "20mm Conduit 3m",
        "Cable Tray 100mm",
        "Trunking Couplers"
      ],
      priceRange: "£3 - £120",
      topBrands: ["Marshall Tufflex", "Legrand", "D-Line", "Schneider"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {category.title}
                    {category.trending && (
                      <Badge className="bg-elec-yellow text-black text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Product Count & Price Range */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-elec-yellow">
                <Package className="h-3 w-3" />
                <span>{category.productCount.toLocaleString()} products</span>
              </div>
              <div className="text-muted-foreground">
                {category.priceRange}
              </div>
            </div>

            {/* Popular Subcategories */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Popular Categories:</h4>
              <div className="grid grid-cols-1 gap-1">
                {category.subcategories.slice(0, 4).map((subcat) => (
                  <Link
                    key={subcat}
                    to={`/electrician/materials/category/${category.id}?subcategory=${encodeURIComponent(subcat)}`}
                    className="text-xs text-muted-foreground hover:text-elec-yellow transition-colors block py-1"
                  >
                    • {subcat}
                  </Link>
                ))}
                {category.subcategories.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{category.subcategories.length - 4} more...
                  </span>
                )}
              </div>
            </div>

            {/* Top Brands */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Top Brands:</h4>
              <div className="flex flex-wrap gap-1">
                {category.topBrands.map((brand) => (
                  <Badge 
                    key={brand} 
                    variant="outline" 
                    className="text-xs border-elec-yellow/30 hover:border-elec-yellow/60 cursor-pointer"
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Popular Items */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Popular Items:</h4>
              <div className="space-y-1">
                {category.popularItems.slice(0, 3).map((item) => (
                  <div key={item} className="text-xs text-muted-foreground">
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Browse Button */}
            <div className="pt-2">
              <Link to={`/electrician/materials/category/${category.id}`}>
                <Button 
                  className="w-full group-hover:bg-elec-yellow group-hover:text-black transition-colors"
                  variant="outline"
                >
                  Browse {category.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryMegaMenu;