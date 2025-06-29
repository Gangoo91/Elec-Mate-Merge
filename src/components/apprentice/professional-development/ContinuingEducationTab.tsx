
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
  Calculator,
  FileText
} from "lucide-react";
import MobileContinuingEducationTab from "./MobileContinuingEducationTab";
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

const ContinuingEducationTab = () => {
  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileContinuingEducationTab />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Further Education & Funding</h2>
          <p className="text-muted-foreground">
            Comprehensive guide to advancing your academic qualifications and securing funding. 
            Explore education options, calculate funding requirements, and access detailed funding guidance.
          </p>
        </div>

        <Tabs defaultValue="education" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Education Options
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Funding Calculator
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Funding Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {educationOptions.map((option) => (
                <Card key={option.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                        <p className="text-sm text-amber-400">{option.institution}</p>
                      </div>
                      <div className="text-sm bg-elec-dark/30 px-2 py-1 rounded-md inline-block">
                        {option.level}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow flex flex-col">
                    <p className="text-sm mb-4">{option.description}</p>
                    
                    <div className="space-y-4 mt-auto">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-4 w-4 text-elec-yellow" />
                          <span><span className="text-elec-yellow/80">Duration:</span> {option.duration}</span>
                        </div>
                        
                        <div className="text-xs">
                          <p className="text-elec-yellow/80 mb-1">Entry Requirements:</p>
                          <p>{option.entryRequirements}</p>
                        </div>
                        
                        <div className="text-xs">
                          <p className="text-elec-yellow/80 mb-1">Estimated Cost:</p>
                          <p className="text-green-400">{option.estimatedCost}</p>
                        </div>
                        
                        <div className="text-xs">
                          <p className="text-elec-yellow/80 mb-1">Progression:</p>
                          <p>{option.progressionOptions}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-elec-yellow/10 pt-3">
                        <h4 className="text-xs text-elec-yellow mb-2">Key Topics:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {option.keyTopics.map((topic, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-elec-dark/60 px-2 py-0.5 rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-elec-yellow/10 pt-3">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-elec-yellow mt-0.5" />
                          <div>
                            <h4 className="text-xs text-elec-yellow mb-1">Example Locations:</h4>
                            <p className="text-xs">{option.locations.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator">
            <FundingCalculator />
          </TabsContent>

          <TabsContent value="guide">
            <FundingGuide />
          </TabsContent>
        </Tabs>

        <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
          <div className="flex gap-3 items-start">
            <GraduationCap className="h-6 w-6 text-elec-yellow mt-1" />
            <div>
              <h3 className="font-medium text-lg mb-1">Why Invest in Further Education?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="text-amber-400 font-medium">Career Advancement</h4>
                  <p className="text-xs mt-1">Higher qualifications open doors to technical management, design engineering, and senior positions with significantly higher earning potential.</p>
                </div>
                <div>
                  <h4 className="text-amber-400 font-medium">Industry Recognition</h4>
                  <p className="text-xs mt-1">Professional qualifications are highly valued by employers and can lead to chartership with institutions like the IET.</p>
                </div>
                <div>
                  <h4 className="text-amber-400 font-medium">Future-Proof Skills</h4>
                  <p className="text-xs mt-1">Advanced education in areas like renewable energy, smart systems, and IoT positions you at the forefront of industry innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContinuingEducationTab;
