
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Zap, Eye, HardHat, Package, ArrowRight, TrendingUp, Star } from "lucide-react";

const ToolCategoryBrowser = () => {
  const categories = [
    {
      id: "testing",
      title: "Testing Equipment",
      icon: Zap,
      description: "Multifunction testers, insulation testers, socket checkers",
      productCount: 156,
      priceRange: "£25 - £1,500",
      trending: true,
      topBrands: ["Fluke", "Megger", "Kewtech", "Martindale"],
      popularItems: [
        { name: "Fluke 1663 MFT", price: "£649.99", rating: 4.8 },
        { name: "Kewtech KT65DL", price: "£299.99", rating: 4.6 },
        { name: "Socket & See SOK32", price: "£29.99", rating: 4.5 }
      ]
    },
    {
      id: "power-tools",
      title: "Power Tools",
      icon: Wrench,
      description: "Drills, grinders, saws, and professional power equipment",
      productCount: 243,
      priceRange: "£45 - £800",
      trending: false,
      topBrands: ["DeWalt", "Makita", "Bosch", "Milwaukee"],
      popularItems: [
        { name: "DeWalt 18V Combi Kit", price: "£149.99", rating: 4.9 },
        { name: "Makita Angle Grinder", price: "£89.99", rating: 4.7 },
        { name: "Bosch SDS Drill", price: "£125.00", rating: 4.6 }
      ]
    },
    {
      id: "hand-tools",
      title: "Hand Tools",
      icon: Package,
      description: "Screwdrivers, pliers, cutters, and essential hand tools",
      productCount: 189,
      priceRange: "£8 - £120",
      trending: false,
      topBrands: ["Wiha", "Knipex", "CK Tools", "Klein"],
      popularItems: [
        { name: "Wiha VDE Screwdriver Set", price: "£45.99", rating: 4.8 },
        { name: "Knipex Side Cutters", price: "£32.50", rating: 4.9 },
        { name: "CK Electrician's Pliers", price: "£28.99", rating: 4.5 }
      ]
    },
    {
      id: "ppe",
      title: "PPE & Safety",
      icon: HardHat,
      description: "Hard hats, safety glasses, gloves, and protective equipment",
      productCount: 95,
      priceRange: "£5 - £85",
      trending: true,
      topBrands: ["3M", "Honeywell", "JSP", "Uvex"],
      popularItems: [
        { name: "JSP Hard Hat with Lamp", price: "£24.99", rating: 4.7 },
        { name: "3M Safety Glasses", price: "£12.50", rating: 4.6 },
        { name: "Electrical Safety Gloves", price: "£18.99", rating: 4.4 }
      ]
    },
    {
      id: "inspection",
      title: "Inspection Tools",
      icon: Eye,
      description: "Torches, cameras, mirrors, and inspection equipment",
      productCount: 67,
      priceRange: "£15 - £250",
      trending: false,
      topBrands: ["Ledlenser", "Milwaukee", "DeWalt", "Fluke"],
      popularItems: [
        { name: "Ledlenser Work Light", price: "£45.99", rating: 4.8 },
        { name: "Inspection Mirror", price: "£15.50", rating: 4.3 },
        { name: "USB Borescope Camera", price: "£35.00", rating: 4.2 }
      ]
    },
    {
      id: "accessories",
      title: "Tool Accessories",
      icon: Package,
      description: "Bits, blades, cases, and tool maintenance items",
      productCount: 312,
      priceRange: "£3 - £150",
      trending: false,
      topBrands: ["Wera", "Makita", "DeWalt", "Bosch"],
      popularItems: [
        { name: "Wera Bit Set", price: "£25.99", rating: 4.7 },
        { name: "Tool Case Organiser", price: "£45.00", rating: 4.5 },
        { name: "Drill Bit Set", price: "£18.99", rating: 4.4 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Browse by Category</h2>
        <p className="text-muted-foreground">
          Explore our comprehensive range of electrical tools organised by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-elec-yellow/20 rounded-lg">
                    <category.icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                  </div>
                </div>
                {category.trending && (
                  <Badge className="bg-green-500/20 text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{category.description}</p>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price Range:</span>
                <span className="text-elec-yellow font-medium">{category.priceRange}</span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2">Popular Brands:</h4>
                <div className="flex flex-wrap gap-1">
                  {category.topBrands.slice(0, 3).map((brand) => (
                    <Badge key={brand} variant="outline" className="text-xs border-elec-yellow/30">
                      {brand}
                    </Badge>
                  ))}
                  {category.topBrands.length > 3 && (
                    <Badge variant="outline" className="text-xs border-elec-yellow/30">
                      +{category.topBrands.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2">Top Sellers:</h4>
                <div className="space-y-2">
                  {category.popularItems.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{item.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-muted-foreground">{item.rating}</span>
                        </div>
                      </div>
                      <span className="text-elec-yellow font-medium ml-2">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Browse {category.title}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolCategoryBrowser;
