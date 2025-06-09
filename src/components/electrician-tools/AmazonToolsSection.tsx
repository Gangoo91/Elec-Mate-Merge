
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Star, Truck, ShoppingCart } from "lucide-react";

const AmazonToolsSection = () => {
  const amazonDeals = [
    {
      title: "Klein Tools Electrician's Tool Set",
      price: "£89.99",
      originalPrice: "£129.99",
      discount: "31%",
      rating: 4.6,
      reviews: 1247,
      prime: true,
      features: ["11-piece set", "Professional grade", "Lifetime warranty"],
      image: "🔧"
    },
    {
      title: "Electrical Wire Strippers Multi-tool",
      price: "£24.99",
      originalPrice: "£34.99",
      discount: "29%",
      rating: 4.4,
      reviews: 892,
      prime: true,
      features: ["10-22 AWG", "Built-in tester", "Ergonomic grip"],
      image: "✂️"
    },
    {
      title: "LED Work Light - Rechargeable",
      price: "£19.99",
      originalPrice: "£29.99",
      discount: "33%",
      rating: 4.7,
      reviews: 2156,
      prime: true,
      features: ["1000 lumens", "Magnetic base", "4-hour battery"],
      image: "💡"
    }
  ];

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-blue-500/5">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Package className="h-5 w-5 text-amber-400" />
          Amazon Business
          <Badge className="bg-amber-500/20 text-amber-400">Prime</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Business pricing with fast delivery
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {amazonDeals.map((deal, index) => (
          <div key={index} className="p-3 bg-elec-dark/30 rounded-lg border border-amber-500/20">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{deal.image}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm leading-tight mb-1">
                  {deal.title}
                </h4>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-xs font-medium">{deal.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({deal.reviews})</span>
                  {deal.prime && (
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                      <Truck className="h-2 w-2 mr-1" />
                      Prime
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400">{deal.price}</span>
                    <span className="text-xs line-through text-muted-foreground">
                      {deal.originalPrice}
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      -{deal.discount}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  {deal.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-amber-400 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-amber-500/20">
          <Button variant="outline" className="w-full border-amber-500/30 hover:bg-amber-500/10">
            Browse Amazon Business
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmazonToolsSection;
