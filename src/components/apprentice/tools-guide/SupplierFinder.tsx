
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, MapPin, Phone, Globe, CreditCard, Truck, GraduationCap, Star } from "lucide-react";

const SupplierFinder = () => {
  const majorSuppliers = [
    {
      name: "Screwfix",
      type: "Trade Counter & Online",
      speciality: "Quick collection, everyday tools",
      apprenticeDiscount: "10% with trade card",
      locations: "700+ stores nationwide",
      delivery: "Next day delivery available",
      strengths: ["Convenient locations", "Good basic tool range", "Fast service"],
      contact: "0333 003 3000",
      website: "screwfix.com"
    },
    {
      name: "Toolstation",
      type: "Trade Counter & Online", 
      speciality: "Competitive prices, trade quality",
      apprenticeDiscount: "Account pricing available",
      locations: "500+ stores nationwide",
      delivery: "Same day click & collect",
      strengths: ["Competitive pricing", "Quality brands", "Trade focused"],
      contact: "0808 100 7211",
      website: "toolstation.com"
    },
    {
      name: "RS Components",
      type: "Specialist Electrical",
      speciality: "Test equipment, industrial supplies",
      apprenticeDiscount: "Educational pricing",
      locations: "Online + trade counters",
      delivery: "Next day delivery",
      strengths: ["Technical expertise", "Quality test equipment", "Engineering support"],
      contact: "01536 201234",
      website: "rs-online.com"
    },
    {
      name: "CPC Farnell",
      type: "Electrical Specialist",
      speciality: "Professional electrical equipment",
      apprenticeDiscount: "Student & apprentice rates",
      locations: "Online + collection points",
      delivery: "Free delivery over £45",
      strengths: ["Electrical focus", "Professional grade", "Technical datasheets"],
      contact: "0800 587 0093",
      website: "cpc.co.uk"
    }
  ];

  const localSuppliers = [
    {
      type: "Independent Electrical Wholesalers",
      description: "Local electrical wholesalers often offer the best trade prices and personalised service",
      benefits: ["Better trade discounts", "Local knowledge", "Account facilities", "Bulk pricing"],
      howToFind: "Search 'electrical wholesaler near me' or ask local electricians for recommendations"
    },
    {
      type: "Tool Specialists",
      description: "Specialist tool shops often have better expertise and can provide hands-on advice",
      benefits: ["Expert advice", "Try before buying", "Better warranties", "Professional service"],
      howToFind: "Look for established local tool shops, often family-run businesses"
    }
  ];

  const costBreakdown = [
    {
      category: "Hand Tools",
      essentialCost: "£150-250",
      qualityCost: "£300-450",
      timeframe: "First 6 months",
      priority: "Start immediately"
    },
    {
      category: "Power Tools",
      essentialCost: "£200-400",
      qualityCost: "£500-800",
      timeframe: "Months 6-12",
      priority: "Build gradually"
    },
    {
      category: "Test Equipment",
      essentialCost: "£300-600",
      qualityCost: "£800-1500",
      timeframe: "Year 2-3",
      priority: "As training progresses"
    },
    {
      category: "PPE & Safety",
      essentialCost: "£100-200",
      qualityCost: "£200-350",
      timeframe: "Immediate",
      priority: "Never compromise"
    }
  ];

  const savingsTips = [
    "Join trade associations for member discounts",
    "Buy during end-of-year sales (November-January)",
    "Consider quality second-hand tools from reputable sources",
    "Group purchases with other apprentices for bulk discounts",
    "Look for manufacturer cashback offers",
    "Use price comparison websites for expensive items",
    "Ask about payment plans for expensive test equipment",
    "Check if your employer has corporate accounts you can use"
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="major-suppliers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="major-suppliers">Major Suppliers</TabsTrigger>
          <TabsTrigger value="local-suppliers">Local Options</TabsTrigger>
          <TabsTrigger value="cost-planning">Cost Planning</TabsTrigger>
          <TabsTrigger value="savings-tips">Savings Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="major-suppliers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {majorSuppliers.map((supplier, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow flex items-center gap-2">
                      <Store className="h-5 w-5" />
                      {supplier.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                      {supplier.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{supplier.speciality}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">{supplier.apprenticeDiscount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {supplier.locations}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      {supplier.delivery}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Key Strengths:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {supplier.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Star className="h-3 w-3 text-elec-yellow" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-elec-yellow/20 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {supplier.contact}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      {supplier.website}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="local-suppliers">
          <div className="space-y-4">
            {localSuppliers.map((supplier, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow text-lg">{supplier.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">{supplier.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Benefits:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {supplier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="h-2 w-2 rounded-full p-0 border-green-500/50 bg-green-500/20" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-200">
                      <strong>How to find:</strong> {supplier.howToFind}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost-planning">
          <div className="space-y-6">
            <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
              <CreditCard className="h-4 w-4 text-elec-yellow" />
              <AlertDescription className="text-elec-yellow/90">
                Total toolkit investment over 2-3 years: £750-2000. Quality tools are a career investment that can last decades.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {costBreakdown.map((category, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <CardTitle className="text-elec-yellow">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-300">Essential Range</h4>
                        <p className="text-lg font-bold text-green-400">{category.essentialCost}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-300">Quality Range</h4>
                        <p className="text-lg font-bold text-blue-400">{category.qualityCost}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeframe:</span>
                        <span className="text-white">{category.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge variant="outline" className={`text-xs ${
                          category.priority === 'Start immediately' || category.priority === 'Immediate' ? 
                          'border-red-500/40 text-red-400' :
                          category.priority === 'Never compromise' ?
                          'border-orange-500/40 text-orange-400' :
                          'border-blue-500/40 text-blue-400'
                        }`}>
                          {category.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="savings-tips">
          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Money-Saving Strategies for Apprentices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savingsTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-green-500/20 rounded-lg">
                    <Badge variant="outline" className="mt-0.5 h-6 w-6 rounded-full p-0 border-green-500/40 bg-green-500/20 flex items-center justify-center text-green-400">
                      {index + 1}
                    </Badge>
                    <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert className="border-orange-500/50 bg-orange-500/10">
            <Store className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200">
              <strong>Apprentice Schemes:</strong> Many suppliers offer special apprentice pricing. Always ask about discounts and bring your apprenticeship agreement as proof of status.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierFinder;
