
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
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Globe className="h-5 w-5 text-elec-yellow" />
            </div>
            UK Regional Workplace Cultures
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            The UK electrical industry varies significantly by region. Understanding local workplace cultures,
            communication styles, and industry practices will help you adapt and succeed wherever you work.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="regions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
          <TabsTrigger value="regions" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black touch-manipulation">Regional Differences</TabsTrigger>
          <TabsTrigger value="industries" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black touch-manipulation">Industry Sectors</TabsTrigger>
          <TabsTrigger value="considerations" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black touch-manipulation">Cultural Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="regions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {regions.map((region, index) => (
              <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="relative pb-3">
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/20">
                      <MapPin className="h-4 w-4 text-elec-yellow" />
                    </div>
                    {region.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/5">
                    <h4 className="font-medium text-elec-yellow mb-2 text-sm">Workplace Characteristics:</h4>
                    <ul className="space-y-1">
                      {region.characteristics.map((char, idx) => (
                        <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2 text-sm">Common Phrases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.commonPhrases.map((phrase, idx) => (
                        <Badge key={idx} className="bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs">
                          "{phrase}"
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white/70">{region.workingHours}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 border border-white/5">
                      <span className="text-xs text-elec-yellow">Break Culture: </span>
                      <span className="text-xs text-white/60">{region.breakCulture}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2 text-sm">Key Tips:</h4>
                    <ul className="space-y-1">
                      {region.keyTips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-white/70 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industries">
          <div className="space-y-4 mt-4">
            {industryDifferences.map((industry, index) => (
              <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="relative pb-3">
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Building className="h-4 w-4 text-purple-400" />
                    </div>
                    {industry.sector}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Culture:</h4>
                      <p className="text-sm text-white/60">{industry.culture}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <h4 className="font-medium text-blue-400 mb-2 text-sm">Communication:</h4>
                      <p className="text-sm text-white/60">{industry.communication}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <h4 className="font-medium text-orange-400 mb-2 text-sm">Key Challenges:</h4>
                      <p className="text-sm text-white/60">{industry.challenges}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="considerations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {culturalConsiderations.map((consideration, index) => (
              <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="relative pb-3">
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Users className="h-4 w-4 text-cyan-400" />
                    </div>
                    {consideration.aspect}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative">
                  <p className="text-sm text-white/60">{consideration.description}</p>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2 text-sm">Guidance:</h4>
                    <p className="text-sm text-white/70">{consideration.guidance}</p>
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
