
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, GraduationCap, Factory, Users, Globe, Award } from "lucide-react";

const TrainingProvidersCard = () => {
  const providerTypes = [
    {
      type: "Further Education Colleges",
      icon: <GraduationCap className="h-5 w-5 text-blue-400" />,
      description: "Traditional colleges offering apprenticeship programmes",
      characteristics: ["Established facilities", "Qualified teaching staff", "Broad curriculum"],
      examples: ["Local FE colleges", "Sixth form colleges", "Technical colleges"],
      considerations: ["Fixed timetables", "Group-based learning", "Academic focus"]
    },
    {
      type: "Private Training Providers",
      icon: <Building className="h-5 w-5 text-green-400" />,
      description: "Commercial organisations specialising in apprenticeship training",
      characteristics: ["Industry-focused", "Flexible delivery", "Employer partnerships"],
      examples: ["JTL", "NICEIC Training", "ECITB providers"],
      considerations: ["Specialist expertise", "Industry connections", "Variable quality"]
    },
    {
      type: "University Technical Colleges",
      icon: <Factory className="h-5 w-5 text-purple-400" />,
      description: "Specialist institutions for 14-19 year olds with industry focus",
      characteristics: ["State-of-the-art facilities", "Industry partnerships", "Technical specialisation"],
      examples: ["Energy Coast UTC", "Advanced Manufacturing UTC"],
      considerations: ["Age-specific", "Limited locations", "High standards"]
    },
    {
      type: "Employer-Led Training",
      icon: <Users className="h-5 w-5 text-orange-400" />,
      description: "Large employers providing their own training programmes",
      characteristics: ["Company-specific", "Career progression", "Internal expertise"],
      examples: ["National Grid", "BAE Systems", "Rolls Royce"],
      considerations: ["Limited external recognition", "Company culture", "Career progression"]
    },
    {
      type: "Online Training Platforms",
      icon: <Globe className="h-5 w-5 text-cyan-400" />,
      description: "Digital-first training providers offering flexible learning",
      characteristics: ["24/7 access", "Self-paced learning", "Interactive content"],
      examples: ["Multiverse", "Baltic Training", "Digital platforms"],
      considerations: ["Self-motivation required", "Limited practical work", "Technology dependence"]
    },
    {
      type: "Industry Bodies",
      icon: <Award className="h-5 w-5 text-red-400" />,
      description: "Professional organisations offering recognised training",
      characteristics: ["Industry credibility", "Professional standards", "Networking opportunities"],
      examples: ["IET", "SELECT", "ECS"],
      considerations: ["Professional focus", "Higher costs", "Entry requirements"]
    }
  ];

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-green-400">Training Provider Types</CardTitle>
        <p className="text-sm text-muted-foreground">
          Understanding different organisations that deliver off-the-job training
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providerTypes.map((provider, index) => (
            <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                {provider.icon}
                <h4 className="font-medium text-white">{provider.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-medium text-green-400">Key Features:</span>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {provider.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-green-400">•</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-blue-400">Examples:</span>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {provider.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-blue-400">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-yellow-400">Considerations:</span>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {provider.considerations.map((consideration, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-yellow-400">!</span>
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <h5 className="font-medium text-blue-400 mb-2">Choosing the Right Provider</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-white">Consider:</span>
              <ul className="mt-1 space-y-1">
                <li>• Location and accessibility</li>
                <li>• Delivery methods offered</li>
                <li>• Industry reputation</li>
                <li>• Pass rates and outcomes</li>
              </ul>
            </div>
            <div>
              <span className="font-medium text-white">Ask about:</span>
              <ul className="mt-1 space-y-1">
                <li>• Support services available</li>
                <li>• Equipment and facilities</li>
                <li>• Progression opportunities</li>
                <li>• Employer feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProvidersCard;
