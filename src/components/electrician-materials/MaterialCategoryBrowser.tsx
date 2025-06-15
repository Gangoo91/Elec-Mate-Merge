
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cable, Zap, Shield, Package, Building, TrendingUp, Star, ArrowRight, Users, Award } from "lucide-react";

const MaterialCategoryBrowser = () => {
  const categories = [
    {
      id: "cables",
      title: "Cables & Wiring",
      icon: Cable,
      description: "Twin & Earth, SWA, armoured and data cables",
      productCount: 324,
      priceRange: "£12 - £450",
      trending: true,
      topBrands: ["Prysmian", "Nexans", "Excel", "Doncaster"],
      popularItems: [
        { name: "2.5mm² Twin & Earth 100m", price: "£89.99", rating: 4.8, sales: 156 },
        { name: "6mm² SWA Cable 50m", price: "£156.50", rating: 4.7, sales: 89 },
        { name: "Cat6 Data Cable 305m", price: "£45.99", rating: 4.6, sales: 203 }
      ]
    },
    {
      id: "components",
      title: "Electrical Components",
      icon: Zap,
      description: "Consumer units, MCBs, RCDs and distribution boards",
      productCount: 186,
      priceRange: "£8 - £650",
      trending: false,
      topBrands: ["Schneider", "Hager", "Wylex", "MK Electric"],
      popularItems: [
        { name: "Schneider 18-way CU", price: "£234.99", rating: 4.9, sales: 78 },
        { name: "32A Type B MCB", price: "£12.50", rating: 4.8, sales: 345 },
        { name: "63A 30mA RCD", price: "£45.99", rating: 4.7, sales: 189 }
      ]
    },
    {
      id: "protection",
      title: "Protection Equipment", 
      icon: Shield,
      description: "Earth rods, surge protectors and safety devices",
      productCount: 95,
      priceRange: "£15 - £280",
      trending: true,
      topBrands: ["Furse", "Dehn", "Phoenix", "ABB"],
      popularItems: [
        { name: "1.2m Copper Earth Rod", price: "£28.99", rating: 4.6, sales: 134 },
        { name: "Type 2 Surge Protector", price: "£89.50", rating: 4.8, sales: 67 },
        { name: "Earth Rod Clamp", price: "£15.99", rating: 4.5, sales: 178 }
      ]
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      icon: Package,
      description: "Junction boxes, cable glands and fixing accessories",
      productCount: 412,
      priceRange: "£2 - £85",
      trending: false,
      topBrands: ["Wiska", "Gewiss", "Marshall Tufflex", "Adaptaflex"],
      popularItems: [
        { name: "IP65 Junction Box 100x100", price: "£8.99", rating: 4.7, sales: 289 },
        { name: "20mm Cable Gland Pack", price: "£12.50", rating: 4.6, sales: 156 },
        { name: "Oval Conduit 20mm 3m", price: "£4.99", rating: 4.4, sales: 456 }
      ]
    },
    {
      id: "lighting",
      title: "Lighting Solutions",
      icon: Building,
      description: "LED downlights, emergency lighting and battens",
      productCount: 278,
      priceRange: "£8 - £120",
      trending: true,
      topBrands: ["Ansell", "Kosnic", "Aurora", "JCC"],
      popularItems: [
        { name: "Fire Rated Downlight 6W", price: "£18.99", rating: 4.8, sales: 234 },
        { name: "LED Batten 5ft 22W", price: "£24.99", rating: 4.7, sales: 145 },
        { name: "Emergency Exit Sign", price: "£35.50", rating: 4.5, sales: 98 }
      ]
    },
    {
      id: "tools",
      title: "Testing & Tools",
      icon: Package,
      description: "Multifunction testers, tools and measurement equipment",
      productCount: 156,
      priceRange: "£25 - £1,200",
      trending: false,
      topBrands: ["Fluke", "Megger", "Kewtech", "Socket & See"],
      popularItems: [
        { name: "Socket Tester Pro", price: "£45.99", rating: 4.8, sales: 89 },
        { name: "Voltage Indicator", price: "£28.50", rating: 4.6, sales: 167 },
        { name: "Cable Detector", price: "£89.99", rating: 4.7, sales: 56 }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive range of electrical materials organised by category. 
          Find everything you need for professional electrical installations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-elec-yellow/20 rounded-lg">
                    <category.icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                  </div>
                </div>
                {category.trending && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
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
                <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top Brands:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {category.topBrands.slice(0, 3).map((brand) => (
                    <Badge key={brand} variant="outline" className="text-xs border-elec-yellow/30 text-white">
                      {brand}
                    </Badge>
                  ))}
                  {category.topBrands.length > 3 && (
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 text-white">
                      +{category.topBrands.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Best Sellers:
                </h4>
                <div className="space-y-2">
                  {category.popularItems.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs bg-elec-dark/30 p-2 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400 fill-current" />
                            <span className="text-muted-foreground">{item.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{item.sales} sold</span>
                        </div>
                      </div>
                      <span className="text-elec-yellow font-medium ml-2">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors">
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

export default MaterialCategoryBrowser;
