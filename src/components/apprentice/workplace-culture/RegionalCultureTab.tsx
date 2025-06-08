
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Globe, Users, MessageSquare, Building, Clock } from "lucide-react";

const RegionalCultureTab = () => {
  const regions = [
    {
      name: "London & South East",
      characteristics: [
        "Fast-paced working environment",
        "More formal communication style",
        "Higher client expectations",
        "Diverse multicultural teams"
      ],
      commonPhrases: ["Right, let's crack on", "Cheers mate", "I'll ping you an email"],
      workingHours: "7:30 AM - 4:30 PM typically",
      breakCulture: "Quick lunch breaks, tea breaks important",
      payExpectations: "£15-25/hour experienced",
      keyTips: [
        "Be punctual - traffic delays not accepted",
        "Dress smartly for client-facing work",
        "Be prepared for longer commutes"
      ]
    },
    {
      name: "Scotland",
      characteristics: [
        "Strong emphasis on craftsmanship",
        "Team-oriented approach",
        "Respect for experience and tradition",
        "Direct but friendly communication"
      ],
      commonPhrases: ["How's it going?", "Aye, no bother", "That's you sorted"],
      workingHours: "8:00 AM - 5:00 PM typically",
      breakCulture: "Longer lunch breaks, morning tea ritual",
      payExpectations: "£12-18/hour experienced",
      keyTips: [
        "Weather preparedness essential",
        "Respect for hierarchical structure",
        "Community approach to problem-solving"
      ]
    },
    {
      name: "Northern England",
      characteristics: [
        "Straightforward communication",
        "Strong work ethic",
        "Emphasis on practical solutions",
        "Friendly workplace banter"
      ],
      commonPhrases: ["Alreet mate", "Get cracking", "That'll do nicely"],
      workingHours: "7:45 AM - 4:45 PM typically",
      breakCulture: "Proper breakfast culture, mid-morning breaks",
      payExpectations: "£11-16/hour experienced",
      keyTips: [
        "Be ready for direct feedback",
        "Appreciate local industrial heritage",
        "Weather-resistant work attitude"
      ]
    },
    {
      name: "Wales",
      characteristics: [
        "Close-knit working relationships",
        "Bilingual considerations",
        "Strong community connections",
        "Methodical approach to work"
      ],
      commonPhrases: ["Shwmae", "Tidy job", "Fair play to you"],
      workingHours: "8:00 AM - 5:00 PM typically",
      breakCulture: "Social break times, rugby talk common",
      payExpectations: "£10-15/hour experienced",
      keyTips: [
        "Respect Welsh language when present",
        "Community reputation matters",
        "Seasonal work variations common"
      ]
    }
  ];

  const industryDifferences = [
    {
      sector: "Domestic Electrical",
      culture: "Customer service focused, neat appearance crucial, explaining work to homeowners",
      communication: "Patient, clear explanations, avoiding technical jargon",
      challenges: "Managing client expectations, working in occupied homes"
    },
    {
      sector: "Commercial Projects",
      culture: "Team coordination, meeting deadlines, corporate environment awareness",
      communication: "Professional emails, site meeting participation, progress reporting",
      challenges: "Multiple trades coordination, client business operations"
    },
    {
      sector: "Industrial Settings",
      culture: "Safety-first mentality, shift work patterns, machinery integration",
      communication: "Clear, concise radio communication, technical documentation",
      challenges: "24/7 operations, critical system dependencies"
    },
    {
      sector: "New Build Construction",
      culture: "Fast-paced, deadline-driven, multi-trade environment",
      communication: "Quick decisions, progress updates, problem escalation",
      challenges: "Weather dependency, programme changes, material logistics"
    }
  ];

  const culturalConsiderations = [
    {
      aspect: "Age Differences",
      description: "Working with experienced electricians vs. younger apprentices",
      guidance: "Show respect for experience while bringing fresh perspectives. Listen more than you speak initially."
    },
    {
      aspect: "Gender Dynamics",
      description: "Increasing female participation in electrical trades",
      guidance: "Treat all colleagues equally and professionally. Challenge inappropriate behaviour respectfully."
    },
    {
      aspect: "Cultural Backgrounds",
      description: "Diverse teams with different cultural perspectives",
      guidance: "Be inclusive and open-minded. Learn from different approaches to problem-solving."
    },
    {
      aspect: "Urban vs Rural",
      description: "Different pace and client expectations between city and countryside",
      guidance: "Adapt your communication style to the local environment and client base."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Regional Workplace Cultures</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The UK electrical industry varies significantly by region. Understanding local workplace cultures, 
            communication styles, and industry practices will help you adapt and succeed wherever you work.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="regions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regions">Regional Differences</TabsTrigger>
          <TabsTrigger value="industries">Industry Sectors</TabsTrigger>
          <TabsTrigger value="considerations">Cultural Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="regions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regions.map((region, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-elec-yellow" />
                    {region.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-elec-yellow mb-2">Workplace Characteristics:</h4>
                      <ul className="space-y-1">
                        {region.characteristics.map((char, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {char}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-blue-400 mb-2">Common Phrases:</h4>
                      <div className="flex flex-wrap gap-2">
                        {region.commonPhrases.map((phrase, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            "{phrase}"
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-muted-foreground">{region.workingHours}</span>
                      </div>
                      <div className="bg-elec-dark/40 rounded-lg p-2">
                        <span className="text-xs text-elec-yellow">Break Culture: </span>
                        <span className="text-xs text-muted-foreground">{region.breakCulture}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-400 mb-2">Key Tips:</h4>
                      <ul className="space-y-1">
                        {region.keyTips.map((tip, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industries">
          <div className="space-y-4">
            {industryDifferences.map((industry, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building className="h-5 w-5 text-elec-yellow" />
                    {industry.sector}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-elec-yellow mb-2">Culture:</h4>
                      <p className="text-sm text-muted-foreground">{industry.culture}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-400 mb-2">Communication:</h4>
                      <p className="text-sm text-muted-foreground">{industry.communication}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-400 mb-2">Key Challenges:</h4>
                      <p className="text-sm text-muted-foreground">{industry.challenges}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="considerations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {culturalConsiderations.map((consideration, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-elec-yellow" />
                    {consideration.aspect}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{consideration.description}</p>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <h4 className="font-medium text-blue-300 mb-1">Guidance:</h4>
                      <p className="text-sm text-blue-200">{consideration.guidance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegionalCultureTab;
