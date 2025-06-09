
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Wrench, Star, ShoppingCart, Calculator, TrendingUp, Users } from "lucide-react";

interface HandToolsGuideProps {
  onBack: () => void;
}

const HandToolsGuide = ({ onBack }: HandToolsGuideProps) => {
  const [selectedBudget, setSelectedBudget] = useState<string>("apprentice");

  const budgetTiers = {
    apprentice: { min: 200, max: 500, label: "Apprentice Budget" },
    intermediate: { min: 500, max: 1000, label: "Intermediate Budget" },
    professional: { min: 1000, max: 2500, label: "Professional Kit" }
  };

  const handToolCategories = [
    {
      category: "Essential Screwdrivers",
      description: "High-quality screwdrivers are the backbone of electrical work",
      tools: [
        {
          name: "Wiha VDE Screwdriver Set",
          price: "£45-65",
          rating: 4.9,
          features: ["1000V insulated", "Lifetime guarantee", "Ergonomic grip"],
          apprenticeChoice: true,
          image: "🔧"
        },
        {
          name: "CK Tools Triton XLS",
          price: "£55-75",
          rating: 4.8,
          features: ["UK made", "Chrome vanadium steel", "Comfortable handles"],
          professionalChoice: true,
          image: "🔧"
        }
      ]
    },
    {
      category: "Cutting Tools",
      description: "Precision cutting tools for cable and conduit work",
      tools: [
        {
          name: "Knipex Side Cutters",
          price: "£28-45",
          rating: 4.9,
          features: ["German engineering", "Precise cutting", "Long-lasting"],
          apprenticeChoice: true,
          image: "✂️"
        },
        {
          name: "Klein Heavy Duty Cutters",
          price: "£35-55",
          rating: 4.7,
          features: ["American quality", "Comfortable grip", "Durable"],
          professionalChoice: true,
          image: "✂️"
        }
      ]
    },
    {
      category: "Stripping Tools",
      description: "Cable preparation and wire stripping equipment",
      tools: [
        {
          name: "CK Auto Wire Strippers",
          price: "£18-28",
          rating: 4.6,
          features: ["Self-adjusting", "Multiple gauges", "Built-in crimp"],
          apprenticeChoice: true,
          image: "🔌"
        },
        {
          name: "Ideal Reflex Stripper",
          price: "£25-40",
          rating: 4.8,
          features: ["Professional grade", "Precision stripping", "Ergonomic"],
          professionalChoice: true,
          image: "🔌"
        }
      ]
    }
  ];

  const calculateBudgetRecommendations = () => {
    const budget = budgetTiers[selectedBudget as keyof typeof budgetTiers];
    const recommendations = handToolCategories.map(cat => ({
      ...cat,
      recommendedTool: cat.tools.find(tool => 
        selectedBudget === "apprentice" ? tool.apprenticeChoice : tool.professionalChoice
      ) || cat.tools[0]
    }));
    
    const totalCost = recommendations.reduce((sum, rec) => {
      const price = rec.recommendedTool.price.split('-')[0].replace('£', '');
      return sum + parseInt(price);
    }, 0);

    return { recommendations, totalCost, budget };
  };

  const { recommendations, totalCost, budget } = calculateBudgetRecommendations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-elec-yellow">Hand Tools Buying Guide</h1>
          <p className="text-muted-foreground">Professional-grade hand tools for electrical work</p>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="calculator">Budget Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Tool Comparison</TabsTrigger>
          <TabsTrigger value="reviews">User Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {handToolCategories.map((category, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-elec-yellow" />
                      {category.category}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{tool.image}</div>
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{tool.name}</h4>
                              <div className="flex items-center gap-2 my-2">
                                <span className="text-elec-yellow font-bold">{tool.price}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                                  <span className="text-xs">{tool.rating}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {tool.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="w-1 h-1 bg-elec-yellow rounded-full" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 mt-3">
                                {tool.apprenticeChoice && (
                                  <Badge className="bg-green-500/20 text-green-400 text-xs">
                                    Apprentice Choice
                                  </Badge>
                                )}
                                {tool.professionalChoice && (
                                  <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                                    Pro Choice
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Buy Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">For Apprentices (£200-500)</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Start with Wiha VDE screwdriver set</li>
                      <li>• Add basic Knipex side cutters</li>
                      <li>• CK auto wire strippers</li>
                      <li>• Focus on safety-certified tools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">For Professionals (£1000+)</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Invest in premium German tools</li>
                      <li>• Complete sets over individual tools</li>
                      <li>• Consider lifetime warranties</li>
                      <li>• Tool storage and organisation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Top Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Wiha", rating: 4.9, specialty: "VDE Insulated Tools" },
                      { name: "Knipex", rating: 4.8, specialty: "Precision Pliers" },
                      { name: "CK Tools", rating: 4.7, specialty: "UK Manufacturing" },
                      { name: "Klein Tools", rating: 4.6, specialty: "Heavy Duty" }
                    ].map((brand, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-white text-sm font-medium">{brand.name}</p>
                          <p className="text-xs text-muted-foreground">{brand.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-xs">{brand.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Budget Calculator & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-3">Select Your Budget Range:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(budgetTiers).map(([key, tier]) => (
                    <Button
                      key={key}
                      variant={selectedBudget === key ? "default" : "outline"}
                      onClick={() => setSelectedBudget(key)}
                      className={selectedBudget === key ? 
                        "bg-elec-yellow text-black" : 
                        "border-elec-yellow/30 hover:bg-elec-yellow/10"
                      }
                    >
                      {tier.label}
                      <br />
                      <span className="text-xs">£{tier.min}-{tier.max}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Recommended Kit for {budget.label}</h3>
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white text-sm font-medium">{rec.recommendedTool.name}</p>
                            <p className="text-xs text-muted-foreground">{rec.category}</p>
                          </div>
                          <span className="text-elec-yellow font-medium text-sm">
                            {rec.recommendedTool.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Budget Summary</h3>
                  <div className="p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Total:</span>
                        <span className="text-elec-yellow font-bold">£{totalCost}+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget Range:</span>
                        <span className="text-white">£{budget.min}-{budget.max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining Budget:</span>
                        <span className={budget.max - totalCost > 0 ? "text-green-400" : "text-red-400"}>
                          £{budget.max - totalCost}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-white text-sm font-medium">Budget Tips:</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Buy quality tools that will last your entire career</li>
                      <li>• Consider sets over individual tools for better value</li>
                      <li>• Look for apprentice discounts from major suppliers</li>
                      <li>• Invest in safety-certified tools first</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white">Tool Comparison Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-elec-yellow/20">
                      <th className="text-left text-white p-2">Tool</th>
                      <th className="text-left text-white p-2">Price</th>
                      <th className="text-left text-white p-2">Rating</th>
                      <th className="text-left text-white p-2">Warranty</th>
                      <th className="text-left text-white p-2">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {handToolCategories.flatMap(cat => cat.tools).map((tool, index) => (
                      <tr key={index} className="border-b border-elec-yellow/10">
                        <td className="p-2 text-white">{tool.name}</td>
                        <td className="p-2 text-elec-yellow">{tool.price}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400 fill-current" />
                            <span className="text-muted-foreground">{tool.rating}</span>
                          </div>
                        </td>
                        <td className="p-2 text-muted-foreground">Lifetime</td>
                        <td className="p-2">
                          {tool.apprenticeChoice && <Badge className="bg-green-500/20 text-green-400 text-xs mr-1">Apprentice</Badge>}
                          {tool.professionalChoice && <Badge className="bg-purple-500/20 text-purple-400 text-xs">Professional</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  Electrician Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Mike Thompson",
                    role: "Qualified Electrician - 15 years",
                    review: "Wiha screwdrivers are worth every penny. I've had the same set for 8 years and they're still perfect.",
                    rating: 5,
                    tool: "Wiha VDE Set"
                  },
                  {
                    name: "Sarah Jones",
                    role: "Apprentice - 2nd Year",
                    review: "Started with cheaper tools but quickly upgraded to Knipex cutters. The difference in quality is massive.",
                    rating: 5,
                    tool: "Knipex Side Cutters"
                  },
                  {
                    name: "Dave Wilson",
                    role: "Commercial Electrician",
                    review: "CK tools are brilliant. British made, reliable, and their customer service is excellent.",
                    rating: 4,
                    tool: "CK Triton XLS"
                  }
                ].map((review, index) => (
                  <div key={index} className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                        <span className="text-elec-yellow text-sm font-bold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-sm font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{review.role}</p>
                        <p className="text-sm text-muted-foreground mb-2">"{review.review}"</p>
                        <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                          {review.tool}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white">Professional Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-300 font-medium text-sm mb-1">Apprentice Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Start with a basic VDE screwdriver set and quality side cutters. These are your most-used tools. 
                      Upgrade other tools as you gain experience and know what you prefer.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-300 font-medium text-sm mb-1">Professional Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Invest in complete sets from one manufacturer for consistency. German tools (Wiha, Knipex) 
                      offer exceptional build quality and lifetime warranties.
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-300 font-medium text-sm mb-1">Business Owner Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Quality tools are a business investment. They last longer, work better, and can be claimed 
                      as business expenses. Consider tool insurance for expensive sets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HandToolsGuide;
