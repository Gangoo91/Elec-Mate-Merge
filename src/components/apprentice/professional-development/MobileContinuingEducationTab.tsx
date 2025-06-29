
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Calculator,
  FileText
} from "lucide-react";
import FundingCalculator from "./FundingCalculator";
import FundingGuide from "./FundingGuide";

const educationOptions = [
  {
    id: 1,
    title: "HNC in Electrical Engineering",
    institution: "UK Colleges",
    description: "Higher National Certificate qualification providing advanced electrical theory and practice.",
    level: "Level 4",
    duration: "1-2 years (part-time options available)",
    entryRequirements: "Level 3 qualification or relevant work experience",
    progressionOptions: "HND, Foundation degree, or employment in technical roles",
    keyTopics: ["Electrical principles", "Engineering mathematics", "Digital electronics", "Project management"],
    locations: ["Birmingham", "Manchester", "London", "Glasgow", "Cardiff"],
    estimatedCost: "£4,000 - £6,000"
  },
  {
    id: 2,
    title: "HND in Electrical Engineering",
    institution: "UK Colleges",
    description: "Higher National Diploma offering practical and theoretical knowledge in electrical engineering.",
    level: "Level 5",
    duration: "2 years (full-time), 3 years (part-time)",
    entryRequirements: "Level 3 qualification or HNC",
    progressionOptions: "Final year entry to bachelor's degree or technical management roles",
    keyTopics: ["Power systems", "Electronic design", "Engineering mathematics", "Industrial applications"],
    locations: ["Liverpool", "Newcastle", "Nottingham", "Plymouth", "Belfast"],
    estimatedCost: "£6,000 - £9,000"
  },
  {
    id: 3,
    title: "Bachelor's Degree",
    institution: "Universities",
    description: "BEng or BSc in Electrical Engineering, Building Services, or Energy Management.",
    level: "Level 6",
    duration: "3-4 years (full-time), 5-6 years (part-time)",
    entryRequirements: "A-Levels/BTEC Level 3 or HNC/HND",
    progressionOptions: "Master's degree, graduate schemes, or professional engineering roles",
    keyTopics: ["Advanced electrical systems", "Power engineering", "Control systems", "Professional practice"],
    locations: ["London", "Manchester", "Edinburgh", "Bristol", "Sheffield"],
    estimatedCost: "£9,250 per year (UK students)"
  },
  {
    id: 4,
    title: "Master's Degree",
    institution: "Universities",
    description: "MEng or MSc specialising in power systems, renewable energy, or building services.",
    level: "Level 7",
    duration: "1 year (full-time), 2-3 years (part-time)",
    entryRequirements: "Bachelor's degree (2:1 or above) in related subject",
    progressionOptions: "PhD, chartered engineer status, or senior technical positions",
    keyTopics: ["Advanced power systems", "Renewable technology", "Research methods", "Energy efficiency"],
    locations: ["London", "Cambridge", "Manchester", "Leeds", "Southampton"],
    estimatedCost: "£8,000 - £15,000"
  }
];

const MobileContinuingEducationTab = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Further Education & Funding</h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive guide to advancing your qualifications and securing funding.
        </p>
      </div>

      <Tabs defaultValue="education" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="education" className="flex items-center gap-1 text-xs">
            <BookOpen className="h-3 w-3" />
            Options
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center gap-1 text-xs">
            <Calculator className="h-3 w-3" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-1 text-xs">
            <FileText className="h-3 w-3" />
            Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="space-y-3">
          {educationOptions.map((option) => (
            <Card key={option.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base leading-tight">{option.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {option.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-amber-400">{option.institution}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCard(option.id)}
                    className="p-1 h-auto"
                  >
                    {expandedCard === option.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm mb-3">{option.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3 w-3 text-elec-yellow" />
                  <span className="text-xs">{option.duration}</span>
                </div>

                <div className="text-xs mb-3">
                  <span className="text-elec-yellow/80 font-medium">Cost: </span>
                  <span className="text-green-400">{option.estimatedCost}</span>
                </div>

                {expandedCard === option.id && (
                  <div className="space-y-3 border-t border-elec-yellow/10 pt-3">
                    <div className="text-xs">
                      <p className="text-elec-yellow/80 mb-1 font-medium">Entry Requirements:</p>
                      <p className="text-muted-foreground">{option.entryRequirements}</p>
                    </div>
                    
                    <div className="text-xs">
                      <p className="text-elec-yellow/80 mb-1 font-medium">Progression Options:</p>
                      <p className="text-muted-foreground">{option.progressionOptions}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs text-elec-yellow mb-2 font-medium">Key Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {option.keyTopics.map((topic, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-elec-dark/60 px-2 py-1 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start gap-1.5">
                        <MapPin className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs text-elec-yellow mb-1 font-medium">Example Locations:</h4>
                          <p className="text-xs text-muted-foreground">{option.locations.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calculator">
          <FundingCalculator />
        </TabsContent>

        <TabsContent value="guide">
          <FundingGuide />
        </TabsContent>
      </Tabs>

      {/* Benefits Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Why Further Education?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="text-amber-400 font-medium text-sm">Higher Earnings</h4>
              <p className="text-xs mt-1 text-muted-foreground">Advanced qualifications can increase earning potential by £5,000-£15,000 annually.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium text-sm">Career Progression</h4>
              <p className="text-xs mt-1 text-muted-foreground">Access to management, design, and senior technical roles.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-medium text-sm">Professional Recognition</h4>
              <p className="text-xs mt-1 text-muted-foreground">Pathway to chartered engineer status and industry leadership.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileContinuingEducationTab;
