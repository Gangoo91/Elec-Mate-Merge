
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, HardHat, AlertTriangle, CheckCircle, Star } from "lucide-react";

interface PPESafetyGuideProps {
  onBack: () => void;
}

const PPESafetyGuide = ({ onBack }: PPESafetyGuideProps) => {
  const [selectedWorkType, setSelectedWorkType] = useState<string>("domestic");

  const workTypes = {
    domestic: { label: "Domestic Work", riskLevel: "Standard" },
    commercial: { label: "Commercial Sites", riskLevel: "Medium" },
    industrial: { label: "Industrial/HV", riskLevel: "High" }
  };

  const ppeCategories = [
    {
      category: "Head Protection",
      mandatory: true,
      description: "Essential protection for construction sites and industrial environments",
      items: [
        {
          name: "JSP EVOLite Hard Hat",
          price: "£12-18",
          rating: 4.8,
          standards: ["BS EN 397", "Electrical insulation"],
          features: ["Lightweight", "Adjustable", "Lamp clips"],
          workTypes: ["domestic", "commercial", "industrial"],
          image: "⛑️"
        },
        {
          name: "3M SecureFit Hard Hat",
          price: "£15-25",
          rating: 4.7,
          standards: ["BS EN 397", "30kV electrical"],
          features: ["Pressure diffusion", "Uvicator", "Ratchet suspension"],
          workTypes: ["commercial", "industrial"],
          image: "⛑️"
        }
      ]
    },
    {
      category: "Eye Protection",
      mandatory: true,
      description: "Impact and UV protection for all electrical work",
      items: [
        {
          name: "3M SecureFit Safety Glasses",
          price: "£8-15",
          rating: 4.6,
          standards: ["BS EN 166", "Impact resistant"],
          features: ["Anti-fog", "UV protection", "Comfortable"],
          workTypes: ["domestic", "commercial", "industrial"],
          image: "🥽"
        },
        {
          name: "Uvex Sportstyle Glasses",
          price: "£12-20",
          rating: 4.8,
          standards: ["BS EN 166", "Side protection"],
          features: ["German quality", "Prescription inserts", "Durable"],
          workTypes: ["commercial", "industrial"],
          image: "🥽"
        }
      ]
    },
    {
      category: "Hand Protection",
      mandatory: false,
      description: "Task-specific gloves for different electrical work scenarios",
      items: [
        {
          name: "Ansell HyFlex Work Gloves",
          price: "£5-12",
          rating: 4.5,
          standards: ["Cut level A", "General handling"],
          features: ["Dexterous", "Breathable", "Machine washable"],
          workTypes: ["domestic", "commercial"],
          image: "🧤"
        },
        {
          name: "Salisbury Class 0 Electrical Gloves",
          price: "£35-65",
          rating: 4.9,
          standards: ["BS EN 60903", "1000V protection"],
          features: ["Electrical insulation", "Regular testing required", "Professional grade"],
          workTypes: ["industrial"],
          image: "🧤"
        }
      ]
    },
    {
      category: "Foot Protection",
      mandatory: true,
      description: "Safety boots with electrical hazard protection",
      items: [
        {
          name: "Caterpillar Holton S3 Boots",
          price: "£45-65",
          rating: 4.6,
          standards: ["BS EN ISO 20345", "S3 rating"],
          features: ["Steel toe cap", "Midsole protection", "Water resistant"],
          workTypes: ["domestic", "commercial", "industrial"],
          image: "🥾"
        },
        {
          name: "DeWalt Laser Safety Boots",
          price: "£55-85",
          rating: 4.7,
          standards: ["S1P rating", "Electrical hazard"],
          features: ["Composite toe cap", "Anti-slip", "Comfortable"],
          workTypes: ["commercial", "industrial"],
          image: "🥾"
        }
      ]
    }
  ];

  const getWorkTypeRecommendations = (workType: string) => {
    return ppeCategories.map(category => ({
      ...category,
      recommendedItems: category.items.filter(item => 
        item.workTypes.includes(workType)
      )
    })).filter(category => category.recommendedItems.length > 0);
  };

  const workTypeRecommendations = getWorkTypeRecommendations(selectedWorkType);
  const totalCost = workTypeRecommendations.reduce((sum, category) => {
    const cheapestItem = category.recommendedItems.reduce((min, item) => {
      const price = parseInt(item.price.split('-')[0].replace('£', ''));
      const minPrice = parseInt(min.price.split('-')[0].replace('£', ''));
      return price < minPrice ? item : min;
    });
    return sum + parseInt(cheapestItem.price.split('-')[0].replace('£', ''));
  }, 0);

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
          <h1 className="text-3xl font-bold text-elec-yellow">PPE & Safety Equipment Guide</h1>
          <p className="text-muted-foreground">Essential personal protective equipment for electrical work</p>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="workplace">Workplace Specific</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white">Select Your Work Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(workTypes).map(([key, type]) => (
                  <Button
                    key={key}
                    variant={selectedWorkType === key ? "default" : "outline"}
                    onClick={() => setSelectedWorkType(key)}
                    className={selectedWorkType === key ? 
                      "bg-elec-yellow text-black" : 
                      "border-elec-yellow/30 hover:bg-elec-yellow/10"
                    }
                  >
                    <div className="text-center">
                      <div>{type.label}</div>
                      <div className="text-xs opacity-70">Risk: {type.riskLevel}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {workTypeRecommendations.map((category, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5 text-elec-yellow" />
                      {category.category}
                      {category.mandatory && (
                        <Badge className="bg-red-500/20 text-red-400 text-xs">Mandatory</Badge>
                      )}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.recommendedItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{item.image}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-white">{item.name}</h4>
                                <span className="text-elec-yellow font-bold">{item.price}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                                  <span className="text-xs">{item.rating}</span>
                                </div>
                                <div className="flex gap-1">
                                  {item.standards.map((standard, idx) => (
                                    <Badge key={idx} className="bg-blue-500/20 text-blue-400 text-xs">
                                      {standard}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-1 mb-3">
                                {item.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    {feature}
                                  </div>
                                ))}
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
                  <CardTitle className="text-white text-lg">PPE Cost Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Minimum PPE Cost</div>
                        <div className="text-xl font-bold text-elec-yellow">£{totalCost}+</div>
                        <div className="text-xs text-muted-foreground">for {workTypes[selectedWorkType as keyof typeof workTypes].label}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Investment Breakdown:</h4>
                      {workTypeRecommendations.map((category, index) => {
                        const cheapest = category.recommendedItems.reduce((min, item) => {
                          const price = parseInt(item.price.split('-')[0].replace('£', ''));
                          const minPrice = parseInt(min.price.split('-')[0].replace('£', ''));
                          return price < minPrice ? item : min;
                        });
                        const cost = parseInt(cheapest.price.split('-')[0].replace('£', ''));
                        
                        return (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{category.category}:</span>
                            <span className="text-white">£{cost}+</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Safety Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-3 w-3 text-red-400" />
                        <span className="text-red-300 text-xs font-medium">Critical</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Never work without appropriate PPE. Your safety is worth more than any job.
                      </p>
                    </div>
                    
                    <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-3 w-3 text-amber-400" />
                        <span className="text-amber-300 text-xs font-medium">Important</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Replace damaged PPE immediately. Compromised protection is no protection.
                      </p>
                    </div>
                    
                    <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-3 w-3 text-blue-400" />
                        <span className="text-blue-300 text-xs font-medium">Best Practice</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Keep spare PPE items. Safety glasses and gloves are easily lost or damaged.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white">UK Legal Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-300 font-medium text-sm mb-2">Personal Protective Equipment at Work Regulations 1992</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Employers must provide adequate PPE free of charge</li>
                      <li>• Employees must use PPE correctly and report defects</li>
                      <li>• PPE must be properly maintained and stored</li>
                      <li>• Training must be provided on correct use</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-300 font-medium text-sm mb-2">Construction (Design and Management) Regulations 2015</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Hard hats mandatory on construction sites</li>
                      <li>• High-visibility clothing in designated areas</li>
                      <li>• Safety footwear with appropriate protection level</li>
                      <li>• Eye protection for specific tasks</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-300 font-medium text-sm mb-2">Electricity at Work Regulations 1989</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Appropriate PPE for electrical work</li>
                      <li>• Insulated tools where required</li>
                      <li>• Arc flash protection for live work</li>
                      <li>• Regular testing and maintenance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white">PPE Standards & Markings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">CE Marking</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    All PPE sold in the UK must carry CE marking and meet European standards.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Key Standards:</h4>
                  <div className="space-y-2">
                    {[
                      { standard: "BS EN 397", description: "Hard hats and industrial safety helmets" },
                      { standard: "BS EN 166", description: "Eye protection specifications" },
                      { standard: "BS EN ISO 20345", description: "Safety footwear requirements" },
                      { standard: "BS EN 60903", description: "Electrical insulating gloves" },
                      { standard: "BS EN ISO 20471", description: "High-visibility warning clothing" }
                    ].map((item, index) => (
                      <div key={index} className="p-2 bg-elec-dark/30 rounded border border-elec-yellow/10">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                            {item.standard}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workplace" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(workTypes).map(([key, type]) => (
              <Card key={key} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white">{type.label}</CardTitle>
                  <Badge className={
                    type.riskLevel === "Standard" ? "bg-green-500/20 text-green-400" :
                    type.riskLevel === "Medium" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  }>
                    {type.riskLevel} Risk
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Required PPE:</h4>
                    <div className="space-y-2">
                      {getWorkTypeRecommendations(key).map((category, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-muted-foreground">{category.category}</span>
                          {category.mandatory && (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">Required</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t border-elec-yellow/10">
                      <h4 className="text-sm font-medium text-white mb-2">Additional Considerations:</h4>
                      {key === "domestic" && (
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• Customer premises - professional appearance</li>
                          <li>• Limited space - compact PPE preferred</li>
                          <li>• Lower voltage work - standard protection</li>
                        </ul>
                      )}
                      {key === "commercial" && (
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• Site induction requirements</li>
                          <li>• High-visibility clothing often mandatory</li>
                          <li>• Specific site PPE policies</li>
                        </ul>
                      )}
                      {key === "industrial" && (
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• High voltage work - specialized PPE</li>
                          <li>• Arc flash protection may be required</li>
                          <li>• Regular PPE inspections mandatory</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white">PPE Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      item: "Hard Hats",
                      daily: "Visual inspection for cracks",
                      weekly: "Clean and check suspension",
                      monthly: "Detailed inspection",
                      annually: "Replace if over 5 years old",
                      replacement: "3-5 years or after impact"
                    },
                    {
                      item: "Safety Glasses",
                      daily: "Clean lenses, check for scratches",
                      weekly: "Inspect frame and hinges",
                      monthly: "Replace scratched lenses",
                      annually: "Full replacement",
                      replacement: "When scratched or damaged"
                    },
                    {
                      item: "Safety Boots",
                      daily: "Check sole condition",
                      weekly: "Clean and condition leather",
                      monthly: "Inspect laces and eyelets",
                      annually: "Replace if worn",
                      replacement: "6-12 months depending on use"
                    }
                  ].map((schedule, index) => (
                    <div key={index} className="p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                      <h4 className="text-white font-medium text-sm mb-2">{schedule.item}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily:</span>
                          <span className="text-white text-right flex-1 ml-2">{schedule.daily}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weekly:</span>
                          <span className="text-white text-right flex-1 ml-2">{schedule.weekly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Replace:</span>
                          <span className="text-elec-yellow text-right flex-1 ml-2">{schedule.replacement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-white">Storage & Care Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-300 font-medium text-sm mb-2">Proper Storage</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Store in clean, dry conditions</li>
                      <li>• Avoid extreme temperatures</li>
                      <li>• Keep away from chemicals and UV light</li>
                      <li>• Use dedicated PPE storage</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-300 font-medium text-sm mb-2">Cleaning Guidelines</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Follow manufacturer's instructions</li>
                      <li>• Use mild soap and water</li>
                      <li>• Air dry completely before storage</li>
                      <li>• Never use harsh chemicals</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-amber-300 font-medium text-sm mb-2">When to Replace</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Any visible damage or wear</li>
                      <li>• After exposure to chemicals</li>
                      <li>• When comfort or fit is compromised</li>
                      <li>• If protection level is questioned</li>
                    </ul>
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

export default PPESafetyGuide;
