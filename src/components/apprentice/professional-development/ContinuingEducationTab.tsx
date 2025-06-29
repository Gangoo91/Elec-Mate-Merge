
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  GraduationCap,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import MobileContinuingEducationTab from "./MobileContinuingEducationTab";

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
    locations: ["Birmingham", "Manchester", "London", "Glasgow", "Cardiff"]
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
    locations: ["Liverpool", "Newcastle", "Nottingham", "Plymouth", "Belfast"]
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
    locations: ["London", "Manchester", "Edinburgh", "Bristol", "Sheffield"]
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
    locations: ["London", "Cambridge", "Manchester", "Leeds", "Southampton"]
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
          <h2 className="text-2xl font-semibold">Further Education</h2>
          <p className="text-muted-foreground">
            Advancing your academic qualifications can open doors to higher-level positions and specialisations in the electrical industry.
            Below are key educational pathways that can enhance your career prospects and technical expertise.
          </p>
        </div>

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

        <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
          <div className="flex gap-3 items-start">
            <GraduationCap className="h-6 w-6 text-elec-yellow mt-1" />
            <div>
              <h3 className="font-medium text-lg mb-1">Education Funding Options</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-amber-400 font-medium">Advanced Learner Loan</h4>
                  <p className="text-xs mt-1">Available for Level 3-6 qualifications. You don't pay back until you earn over £25,000 per year.</p>
                </div>
                <div>
                  <h4 className="text-amber-400 font-medium">Employer Sponsorship</h4>
                  <p className="text-xs mt-1">Many employers will fund further education that benefits their business. Speak to your line manager or HR department.</p>
                </div>
                <div>
                  <h4 className="text-amber-400 font-medium">Part-time Study</h4>
                  <p className="text-xs mt-1">Many courses offer evening and weekend options that allow you to continue working while studying.</p>
                </div>
                <div>
                  <h4 className="text-amber-400 font-medium">Professional Association Grants</h4>
                  <p className="text-xs mt-1">Organisations like IET offer grants and scholarships for electrical engineering studies.</p>
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
