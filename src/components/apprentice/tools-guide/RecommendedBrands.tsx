
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Award, Shield, TrendingUp, Wrench, Zap, Eye, HardHat } from "lucide-react";

const RecommendedBrands = () => {
  const handToolBrands = [
    {
      name: "Wiha",
      category: "Premium Screwdrivers & Hand Tools",
      rating: 5,
      priceRange: "££££",
      strengths: ["VDE certified", "Ergonomic design", "Lifetime warranty"],
      bestFor: "Professional screwdrivers and precision tools",
      ukAvailability: "Excellent",
      apprenticeTip: "Expensive but last a career. Start with essential sizes."
    },
    {
      name: "Knipex", 
      category: "Pliers & Cutters",
      rating: 5,
      priceRange: "£££",
      strengths: ["German engineering", "Precise cutting", "Ergonomic handles"],
      bestFor: "Professional pliers and wire strippers",
      ukAvailability: "Excellent",
      apprenticeTip: "Industry standard for pliers. Worth the investment."
    },
    {
      name: "Bahco",
      category: "General Hand Tools",
      rating: 4,
      priceRange: "£££",
      strengths: ["Swedish quality", "Wide range", "Good value"],
      bestFor: "Adjustable wrenches and general tools",
      ukAvailability: "Very good",
      apprenticeTip: "Good balance of quality and price for hand tools."
    },
    {
      name: "Stanley",
      category: "Measuring & Marking",
      rating: 4,
      priceRange: "££",
      strengths: ["Reliable", "Widely available", "Good warranty"],
      bestFor: "Tape measures, levels, and marking tools",
      ukAvailability: "Excellent",
      apprenticeTip: "Solid choice for measuring tools. Widely available."
    }
  ];

  const powerToolBrands = [
    {
      name: "Makita",
      category: "Cordless Power Tools",
      rating: 5,
      priceRange: "£££",
      strengths: ["18V LXT system", "Reliable batteries", "Wide tool range"],
      bestFor: "Complete cordless tool system",
      ukAvailability: "Excellent",
      apprenticeTip: "Popular with electricians. Stick to one battery platform."
    },
    {
      name: "DeWalt",
      category: "Construction Power Tools", 
      rating: 5,
      priceRange: "£££",
      strengths: ["XR battery range", "Tough construction", "Good service"],
      bestFor: "Heavy-duty cordless tools",
      ukAvailability: "Excellent",
      apprenticeTip: "Very popular on construction sites. Robust tools."
    },
    {
      name: "Milwaukee",
      category: "Professional Power Tools",
      rating: 5,
      priceRange: "££££",
      strengths: ["M18 FUEL system", "Innovation", "Professional focus"],
      bestFor: "Professional cordless systems",
      ukAvailability: "Good",
      apprenticeTip: "Premium tools but expensive. Great if budget allows."
    },
    {
      name: "Bosch Professional",
      category: "Power Tools & Measuring",
      rating: 4,
      priceRange: "£££",
      strengths: ["German engineering", "Measuring tools", "Reliability"],
      bestFor: "Mixed power tools and measuring equipment",
      ukAvailability: "Very good",
      apprenticeTip: "Good all-round choice. Excellent measuring tools."
    }
  ];

  const testEquipmentBrands = [
    {
      name: "Fluke",
      category: "Professional Test Equipment",
      rating: 5,
      priceRange: "££££",
      strengths: ["Industry standard", "Accuracy", "Build quality"],
      bestFor: "Multifunction testers and professional instruments",
      ukAvailability: "Excellent",
      apprenticeTip: "Gold standard but expensive. Consider when qualified."
    },
    {
      name: "Megger",
      category: "Electrical Testing",
      rating: 5,
      priceRange: "£££",
      strengths: ["UK heritage", "Testing expertise", "Compliance"],
      bestFor: "Installation testing and insulation testing",
      ukAvailability: "Excellent",
      apprenticeTip: "British company with excellent UK support."
    },
    {
      name: "Kewtech",
      category: "UK Testing Specialists",
      rating: 4,
      priceRange: "£££",
      strengths: ["UK focused", "Good value", "18th Edition compliant"],
      bestFor: "Multifunction testers for UK market",
      ukAvailability: "Excellent",
      apprenticeTip: "UK specialist. Good alternative to Fluke."
    },
    {
      name: "Martindale",
      category: "Basic Test Equipment",
      rating: 4,
      priceRange: "££",
      strengths: ["GS38 compliant", "Affordable", "UK company"],
      bestFor: "Voltage indicators and basic test equipment",
      ukAvailability: "Excellent",
      apprenticeTip: "Good for starting out. Reliable basic equipment."
    }
  ];

  const ppeBrands = [
    {
      name: "Honeywell",
      category: "Professional PPE",
      rating: 5,
      priceRange: "£££",
      strengths: ["Wide range", "Quality standards", "Innovation"],
      bestFor: "Complete PPE solutions",
      ukAvailability: "Excellent",
      apprenticeTip: "Premium PPE with excellent protection standards."
    },
    {
      name: "3M",
      category: "Respiratory & Eye Protection",
      rating: 5,
      priceRange: "£££",
      strengths: ["Innovation", "Comfort", "Effective protection"],
      bestFor: "Masks, ear defenders, and safety glasses",
      ukAvailability: "Excellent",
      apprenticeTip: "Top choice for respiratory protection."
    },
    {
      name: "Dickies",
      category: "Workwear & Boots",
      rating: 4,
      priceRange: "££",
      strengths: ["Durability", "Comfort", "Value"],
      bestFor: "Work clothing and safety boots",
      ukAvailability: "Excellent",
      apprenticeTip: "Good value workwear. Comfortable for daily wear."
    },
    {
      name: "Site",
      category: "Safety Footwear",
      rating: 4,
      priceRange: "££",
      strengths: ["UK brand", "Comfort", "Good value"],
      bestFor: "Safety boots for construction sites",
      ukAvailability: "Excellent",
      apprenticeTip: "Affordable UK safety boots. Good for apprentices."
    }
  ];

  const budgetAlternatives = [
    {
      category: "Hand Tools",
      premiumBrand: "Wiha",
      budgetAlternative: "Wera",
      savings: "30-40%",
      tradeOff: "Slightly less ergonomic but still VDE certified"
    },
    {
      category: "Power Tools", 
      premiumBrand: "Milwaukee",
      budgetAlternative: "Ryobi ONE+",
      savings: "40-50%",
      tradeOff: "Less power but adequate for most electrical work"
    },
    {
      category: "Test Equipment",
      premiumBrand: "Fluke",
      budgetAlternative: "UniT",
      savings: "50-60%",
      tradeOff: "Basic functionality but meets testing requirements"
    },
    {
      category: "PPE",
      premiumBrand: "Honeywell",
      budgetAlternative: "Portwest",
      savings: "30-40%",
      tradeOff: "Same safety standards but may be less comfortable"
    }
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '££££': return 'text-red-400';
      case '£££': return 'text-orange-400';
      case '££': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Award className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          These brands are trusted by UK electrical professionals. Quality tools are an investment - they'll serve you throughout your career.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="hand-tools" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hand-tools" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" />
            Hand Tools
          </TabsTrigger>
          <TabsTrigger value="power-tools" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Power Tools
          </TabsTrigger>
          <TabsTrigger value="test-equipment" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            Test Equipment
          </TabsTrigger>
          <TabsTrigger value="ppe" className="flex items-center gap-1">
            <HardHat className="h-4 w-4" />
            PPE
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Budget Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {handToolBrands.map((brand, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow">{brand.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getRatingStars(brand.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.category}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${getPriceColor(brand.priceRange)}`}>
                      {brand.priceRange}
                    </span>
                    <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                      {brand.ukAvailability} UK availability
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Strengths:</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Best for:</h4>
                    <p className="text-sm text-muted-foreground">{brand.bestFor}</p>
                  </div>

                  <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
                    <Shield className="h-4 w-4 text-elec-yellow" />
                    <AlertDescription className="text-elec-yellow/90 text-sm">
                      <strong>Apprentice tip:</strong> {brand.apprenticeTip}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="power-tools">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {powerToolBrands.map((brand, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow">{brand.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getRatingStars(brand.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.category}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${getPriceColor(brand.priceRange)}`}>
                      {brand.priceRange}
                    </span>
                    <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                      {brand.ukAvailability} UK availability
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Strengths:</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Best for:</h4>
                    <p className="text-sm text-muted-foreground">{brand.bestFor}</p>
                  </div>

                  <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
                    <Shield className="h-4 w-4 text-elec-yellow" />
                    <AlertDescription className="text-elec-yellow/90 text-sm">
                      <strong>Apprentice tip:</strong> {brand.apprenticeTip}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="test-equipment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testEquipmentBrands.map((brand, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow">{brand.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getRatingStars(brand.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.category}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${getPriceColor(brand.priceRange)}`}>
                      {brand.priceRange}
                    </span>
                    <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                      {brand.ukAvailability} UK availability
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Strengths:</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Best for:</h4>
                    <p className="text-sm text-muted-foreground">{brand.bestFor}</p>
                  </div>

                  <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
                    <Shield className="h-4 w-4 text-elec-yellow" />
                    <AlertDescription className="text-elec-yellow/90 text-sm">
                      <strong>Apprentice tip:</strong> {brand.apprenticeTip}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ppe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ppeBrands.map((brand, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow">{brand.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getRatingStars(brand.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.category}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${getPriceColor(brand.priceRange)}`}>
                      {brand.priceRange}
                    </span>
                    <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                      {brand.ukAvailability} UK availability
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Strengths:</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Best for:</h4>
                    <p className="text-sm text-muted-foreground">{brand.bestFor}</p>
                  </div>

                  <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
                    <Shield className="h-4 w-4 text-elec-yellow" />
                    <AlertDescription className="text-elec-yellow/90 text-sm">
                      <strong>Apprentice tip:</strong> {brand.apprenticeTip}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Budget-Friendly Alternatives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetAlternatives.map((alt, index) => (
                  <div key={index} className="border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3">{alt.category}</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Premium:</span>
                        <span className="text-sm text-red-400">{alt.premiumBrand}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Budget:</span>
                        <span className="text-sm text-green-400">{alt.budgetAlternative}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Savings:</span>
                        <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                          {alt.savings}
                        </Badge>
                      </div>
                      
                      <div className="pt-2 border-t border-green-500/20">
                        <p className="text-xs text-muted-foreground">
                          <strong>Trade-off:</strong> {alt.tradeOff}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendedBrands;
