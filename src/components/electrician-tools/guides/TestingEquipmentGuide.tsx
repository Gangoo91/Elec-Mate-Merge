
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CheckCircle, AlertTriangle, TrendingUp, ArrowLeft } from "lucide-react";

interface TestingEquipmentGuideProps {
  onBack: () => void;
}

const TestingEquipmentGuide = ({ onBack }: TestingEquipmentGuideProps) => {
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [userLevel, setUserLevel] = useState<string>("");

  const budgetRanges = [
    { id: "budget", label: "Budget (£200-500)", description: "Essential tools for apprentices" },
    { id: "mid", label: "Mid-range (£500-1000)", description: "Professional quality tools" },
    { id: "premium", label: "Premium (£1000+)", description: "Top-tier professional equipment" }
  ];

  const userLevels = [
    { id: "apprentice", label: "Apprentice", description: "Starting out in electrical work" },
    { id: "qualified", label: "Qualified Electrician", description: "Fully qualified professional" },
    { id: "contractor", label: "Contractor", description: "Running electrical business" }
  ];

  const recommendations = {
    "budget-apprentice": {
      primary: "Kewtech KT65DL",
      price: "£299.99",
      reason: "Perfect for apprentices - reliable, affordable, and includes essential tests"
    },
    "mid-qualified": {
      primary: "Fluke 1663",
      price: "£649.99", 
      reason: "Industry standard for qualified electricians - comprehensive testing capabilities"
    },
    "premium-contractor": {
      primary: "Megger MFT1741",
      price: "£999.99",
      reason: "Professional contractor grade - advanced features and calibration services"
    }
  };

  const getRecommendation = () => {
    const key = `${selectedBudget}-${userLevel}`;
    return recommendations[key as keyof typeof recommendations] || recommendations["mid-qualified"];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Guides
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-elec-yellow">Essential Testing Equipment Guide 2024</h1>
          <p className="text-muted-foreground">Complete guide to choosing the right testing equipment</p>
        </div>
      </div>

      <Tabs defaultValue="selector" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50">
          <TabsTrigger value="selector">Smart Selector</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="calibration">Calibration</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="selector" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Find Your Perfect Testing Equipment</CardTitle>
              <p className="text-muted-foreground">Answer a few questions to get personalised recommendations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">What's your budget range?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {budgetRanges.map((range) => (
                    <Card 
                      key={range.id}
                      className={`cursor-pointer transition-all ${
                        selectedBudget === range.id 
                          ? 'border-elec-yellow bg-elec-yellow/10' 
                          : 'border-elec-yellow/20 hover:border-elec-yellow/50'
                      }`}
                      onClick={() => setSelectedBudget(range.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white">{range.label}</h4>
                        <p className="text-sm text-muted-foreground">{range.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">What's your experience level?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {userLevels.map((level) => (
                    <Card 
                      key={level.id}
                      className={`cursor-pointer transition-all ${
                        userLevel === level.id 
                          ? 'border-elec-yellow bg-elec-yellow/10' 
                          : 'border-elec-yellow/20 hover:border-elec-yellow/50'
                      }`}
                      onClick={() => setUserLevel(level.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white">{level.label}</h4>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedBudget && userLevel && (
                <Card className="border-green-500/30 bg-green-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <h3 className="text-lg font-medium text-green-400">Recommended for You</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-white">{getRecommendation().primary}</h4>
                        <Badge className="bg-elec-yellow/20 text-elec-yellow text-lg px-3 py-1">
                          {getRecommendation().price}
                        </Badge>
                      </div>
                      <p className="text-green-300">{getRecommendation().reason}</p>
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 mt-4">
                        View Product Details & Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Top Testing Equipment Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-elec-yellow/20">
                      <th className="text-left p-3 text-white">Model</th>
                      <th className="text-left p-3 text-white">Price</th>
                      <th className="text-left p-3 text-white">Tests</th>
                      <th className="text-left p-3 text-white">Rating</th>
                      <th className="text-left p-3 text-white">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-elec-yellow/10">
                      <td className="p-3 font-medium text-white">Fluke 1663</td>
                      <td className="p-3 text-elec-yellow">£649.99</td>
                      <td className="p-3 text-muted-foreground">All 17th/18th Ed tests</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span>4.8</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">Professional electricians</td>
                    </tr>
                    <tr className="border-b border-elec-yellow/10">
                      <td className="p-3 font-medium text-white">Kewtech KT65DL</td>
                      <td className="p-3 text-elec-yellow">£299.99</td>
                      <td className="p-3 text-muted-foreground">Essential tests + RCD</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span>4.6</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">Apprentices & budget</td>
                    </tr>
                    <tr className="border-b border-elec-yellow/10">
                      <td className="p-3 font-medium text-white">Megger MFT1741</td>
                      <td className="p-3 text-elec-yellow">£999.99</td>
                      <td className="p-3 text-muted-foreground">Advanced + Download</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span>4.7</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">Contractors & testing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calibration" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Calibration Requirements</CardTitle>
              <p className="text-muted-foreground">Understanding when and how to calibrate your testing equipment</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <h3 className="font-medium text-amber-400">Legal Requirement</h3>
                </div>
                <p className="text-sm text-amber-300">
                  All testing equipment must be calibrated annually to maintain accuracy and comply with BS 7671.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Calibration Schedule</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Annual calibration required</li>
                    <li>• Heavy use: Consider 6-monthly</li>
                    <li>• After any damage or drop</li>
                    <li>• Before important installations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Typical Costs</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Basic MFT: £80-120</li>
                    <li>• Advanced MFT: £120-180</li>
                    <li>• PAT Tester: £60-100</li>
                    <li>• Express service: +50%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Buying Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Buy from authorised dealers</h4>
                    <p className="text-sm text-muted-foreground">Ensures warranty and calibration services</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Consider lease options</h4>
                    <p className="text-sm text-muted-foreground">Spread costs and include calibration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Check software updates</h4>
                    <p className="text-sm text-muted-foreground">Ensure compliance with latest standards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Buying cheap imports</h4>
                    <p className="text-sm text-muted-foreground">May not meet UK standards or have support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Ignoring calibration costs</h4>
                    <p className="text-sm text-muted-foreground">Budget £100-200 annually for calibration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Not checking warranty</h4>
                    <p className="text-sm text-muted-foreground">Ensure comprehensive warranty coverage</p>
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

export default TestingEquipmentGuide;
