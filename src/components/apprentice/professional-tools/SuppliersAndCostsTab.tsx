
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Clock, Phone, Mail, AlertTriangle, TrendingUp, Award, Users } from "lucide-react";
import BudgetPlanningCalculator from "@/components/apprentice/tools-guide/BudgetPlanningCalculator";

const SuppliersAndCostsTab = () => {
  const ukSuppliers = [
    {
      name: "Screwfix",
      type: "Trade Counter & Online",
      locations: "700+ UK locations",
      speciality: "Trade tools and hardware",
      priceRange: "Budget to mid-range",
      tradeDiscount: "Up to 15% with Trade Account",
      deliveryOptions: "Next day delivery, Click & Collect",
      strengths: ["Extensive branch network", "Competitive pricing", "Good tool range"],
      contact: { phone: "0333 011 2112", website: "screwfix.com" },
      rating: 4.2
    },
    {
      name: "Toolstation",
      type: "Trade Counter & Online",
      locations: "500+ UK locations",
      speciality: "Professional tools and equipment",
      priceRange: "Budget to mid-range",
      tradeDiscount: "Trade pricing available",
      deliveryOptions: "Next day delivery, Click & Collect",
      strengths: ["Good value", "Wide product range", "Trade-focused"],
      contact: { phone: "0330 333 3303", website: "toolstation.com" },
      rating: 4.1
    },
    {
      name: "TLC Electrical",
      type: "Electrical Specialist",
      locations: "Online + trade counters",
      speciality: "Electrical tools and testing equipment",
      priceRange: "Mid to premium range",
      tradeDiscount: "Competitive trade pricing",
      deliveryOptions: "Free delivery over £45",
      strengths: ["Electrical specialist", "Quality brands", "Expert advice"],
      contact: { phone: "01922 712765", website: "tlc-direct.co.uk" },
      rating: 4.5
    },
    {
      name: "CEF (City Electrical Factors)",
      type: "Electrical Wholesale",
      locations: "400+ branches UK-wide",
      speciality: "Professional electrical supplies",
      priceRange: "Trade pricing",
      tradeDiscount: "Wholesale pricing for trades",
      deliveryOptions: "Local delivery service",
      strengths: ["Industry specialist", "Professional focus", "Local service"],
      contact: { phone: "0117 9818282", website: "cef.co.uk" },
      rating: 4.3
    },
    {
      name: "RS Components",
      type: "Online & Trade Counters",
      locations: "Multiple UK locations",
      speciality: "Industrial & electronic components",
      priceRange: "Premium pricing",
      tradeDiscount: "Volume discounts available",
      deliveryOptions: "Next day delivery",
      strengths: ["Quality products", "Technical support", "Industrial focus"],
      contact: { phone: "01536 201234", website: "uk.rs-online.com" },
      rating: 4.4
    }
  ];

  const budgetCategories = [
    {
      category: "Essential Hand Tools",
      budgetRange: "£200-400",
      priority: "Immediate",
      items: ["VDE screwdrivers", "Pliers set", "Wire strippers", "Basic spanners"],
      tips: "Start with quality basics. These tools will be used daily."
    },
    {
      category: "Power Tools",
      budgetRange: "£300-800",
      priority: "Within 3-6 months",
      items: ["Cordless drill system", "SDS drill", "Angle grinder", "LED torch"],
      tips: "Invest in a good battery platform. Stick to one brand ecosystem."
    },
    {
      category: "Test Equipment",
      budgetRange: "£400-1200",
      priority: "Essential for qualification",
      items: ["Voltage indicator", "MFT tester", "RCD tester", "Insulation tester"],
      tips: "Never compromise on test equipment quality. Your safety depends on it."
    },
    {
      category: "PPE & Safety",
      budgetRange: "£150-300",
      priority: "Day one requirement",
      items: ["Safety boots", "Hard hat", "Hi-vis clothing", "Safety glasses"],
      tips: "Replace PPE as recommended by manufacturers. Keep spares available."
    }
  ];

  const costSavingTips = [
    {
      tip: "Join Trade Schemes",
      description: "Most suppliers offer trade accounts with 10-20% discounts",
      savings: "10-20%"
    },
    {
      tip: "Buy in Tool Sets",
      description: "Tool sets often cost less than individual items",
      savings: "15-30%"
    },
    {
      tip: "Watch for Seasonal Sales",
      description: "Black Friday and end-of-year sales offer significant savings",
      savings: "20-40%"
    },
    {
      tip: "Consider Refurbished",
      description: "Manufacturer refurbished tools with full warranty",
      savings: "25-50%"
    },
    {
      tip: "Group Purchases",
      description: "Coordinate with fellow apprentices for bulk discounts",
      savings: "10-15%"
    }
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
      />
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "immediate":
      case "day one requirement":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "essential for qualification":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* UK Suppliers Section */}
      <div>
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">UK Tool Suppliers & Trade Counters</h3>
        
        <div className="grid gap-4">
          {ukSuppliers.map((supplier, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-elec-yellow text-lg">{supplier.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{supplier.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(supplier.rating)}
                    <span className="text-sm text-muted-foreground ml-1">({supplier.rating})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">{supplier.locations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">{supplier.speciality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm text-white">{supplier.priceRange}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-green-300">Trade Discount: </span>
                      <span className="text-sm text-white">{supplier.tradeDiscount}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-300">Delivery: </span>
                      <span className="text-sm text-white">{supplier.deliveryOptions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Key Strengths:</h5>
                  <div className="flex flex-wrap gap-2">
                    {supplier.strengths.map((strength, idx) => (
                      <Badge key={idx} variant="outline" className="border-green-500/40 text-green-400">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-elec-yellow/20">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white">{supplier.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400">{supplier.contact.website}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget Planning Section */}
      <div>
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Budget Planning by Category</h3>
        
        <div className="grid gap-4 mb-6">
          {budgetCategories.map((category, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{category.category}</h4>
                    <p className="text-lg font-bold text-elec-yellow">{category.budgetRange}</p>
                  </div>
                  <Badge className={getPriorityColor(category.priority)} variant="outline">
                    {category.priority}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-white">Typical Items: </span>
                    <span className="text-sm text-muted-foreground">{category.items.join(", ")}</span>
                  </div>
                  <div className="bg-blue-500/10 rounded p-2">
                    <span className="text-xs font-medium text-blue-300">Tip: </span>
                    <span className="text-xs text-blue-200">{category.tips}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Budget Planning Calculator */}
        <BudgetPlanningCalculator />
      </div>

      {/* Cost Saving Tips */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Cost-Saving Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {costSavingTips.map((tip, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{tip.tip}</h4>
                  <Badge variant="outline" className="border-green-500/40 text-green-400">
                    Save {tip.savings}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Reminders */}
      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Investment Strategy:</strong> Spread tool purchases over 12-18 months. Start with safety-critical items and daily-use tools. 
          Quality test equipment is non-negotiable - your safety and career depend on accurate measurements.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SuppliersAndCostsTab;
