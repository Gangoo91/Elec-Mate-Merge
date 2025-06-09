
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, TrendingUp, ExternalLink } from "lucide-react";

const FeaturedDealsCarousel = () => {
  const featuredDeals = [
    {
      id: 1,
      title: "Fluke 1663 Multifunction Tester",
      supplier: "RS Components",
      originalPrice: "£899.99",
      salePrice: "£649.99",
      discount: "28%",
      timeLeft: "2 days",
      rating: 4.8,
      reviews: 342,
      features: ["17th & 18th Edition", "Bluetooth Connectivity", "2-Year Warranty"],
      badge: "Limited Time"
    },
    {
      id: 2,
      title: "Festool Cordless Drill Set",
      supplier: "Toolstation",
      originalPrice: "£379.99",
      salePrice: "£299.99",
      discount: "21%",
      timeLeft: "5 hours",
      rating: 4.9,
      reviews: 156,
      features: ["18V Brushless", "3 Batteries", "Carry Case"],
      badge: "Flash Sale"
    },
    {
      id: 3,
      title: "Megger MFT1741 Tester Kit",
      supplier: "City Electrical Factors",
      originalPrice: "£1,299.99",
      salePrice: "£999.99",
      discount: "23%",
      timeLeft: "1 day",
      rating: 4.7,
      reviews: 89,
      features: ["Complete Test Kit", "Calibration Certificate", "Free Training"],
      badge: "Best Value"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Featured Deals</h2>
        <Button variant="outline" size="sm" className="border-elec-yellow/30">
          View All Deals
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDeals.map((deal) => (
          <Card key={deal.id} className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 hover:border-elec-yellow/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge className={`${
                  deal.badge === "Flash Sale" ? "bg-red-500/20 text-red-400" :
                  deal.badge === "Limited Time" ? "bg-amber-500/20 text-amber-400" :
                  "bg-green-500/20 text-green-400"
                }`}>
                  {deal.badge}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {deal.timeLeft}
                </div>
              </div>
              <CardTitle className="text-lg text-white leading-tight">
                {deal.title}
              </CardTitle>
              <p className="text-sm text-elec-yellow">{deal.supplier}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-elec-yellow">{deal.salePrice}</span>
                  <span className="text-sm line-through text-muted-foreground">{deal.originalPrice}</span>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow font-bold">
                  -{deal.discount}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{deal.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({deal.reviews} reviews)</span>
              </div>
              
              <div className="space-y-2">
                {deal.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-elec-yellow rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="border-elec-yellow/30">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDealsCarousel;
