
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Users, AlertTriangle, CheckCircle, Info, Clock } from "lucide-react";

const CommunicationGuideTab = () => {
  const communicationScenarios = [
    {
      title: "Morning Site Briefings",
      description: "Starting the day with clear communication",
      dos: [
        "Arrive 5-10 minutes early",
        "Listen actively to instructions",
        "Ask clarifying questions if needed",
        "Confirm your understanding"
      ],
      donts: [
        "Interrupt the supervisor",
        "Check your phone during briefing",
        "Make assumptions about tasks",
        "Leave without confirming next steps"
      ],
      example: "Good morning. I understand I'm working on the kitchen ring main today. Should I start with the sockets or lighting circuit first? And who should I report to if I find any issues?"
    },
    {
      title: "Reporting Problems or Delays",
      description: "How to communicate issues effectively",
      dos: [
        "Report problems immediately",
        "Be specific about the issue",
        "Suggest potential solutions",
        "Document what you've tried"
      ],
      donts: [
        "Hide problems hoping they'll resolve",
        "Blame others for issues",
        "Make excuses without solutions",
        "Continue working unsafely"
      ],
      example: "I've hit a problem with the cable run behind the kitchen units - there's a gas pipe in the way that wasn't on the drawings. I've stopped work and marked the area. Could we discuss alternative routing options?"
    },
    {
      title: "Client Interactions",
      description: "Professional communication with customers",
      dos: [
        "Introduce yourself and your role",
        "Explain work in simple terms",
        "Keep clients informed of progress",
        "Be respectful of their property"
      ],
      donts: [
        "Make promises about costs or timing",
        "Criticise previous work",
        "Use technical jargon excessively",
        "Ignore client concerns"
      ],
      example: "Hello, I'm James, the apprentice electrician working with [Supervisor's name] today. We'll be installing your new consumer unit, which should take about 4 hours. You'll be without power for about 2 hours while we make the final connections. Is there anything specific you'd like us to be careful with?"
    }
  ];

  const communicationChannels = [
    {
      method: "Face-to-Face",
      icon: Users,
      when: "Complex instructions, safety issues, learning new skills, problem-solving",
      advantages: ["Immediate feedback", "Clear understanding", "Builds relationships", "Shows respect"],
      tips: ["Make eye contact", "Use active listening", "Ask follow-up questions", "Confirm understanding"]
    },
    {
      method: "Radio/Phone",
      icon: Phone,
      when: "Quick updates, coordination between areas, urgent communications",
      advantages: ["Immediate contact", "Efficient for simple messages", "Good for coordination"],
      tips: ["Keep messages brief", "Speak clearly", "Use proper radio etiquette", "Confirm receipt"]
    },
    {
      method: "Written/Text",
      icon: Mail,
      when: "Non-urgent updates, sharing photos, material lists, handovers",
      advantages: ["Permanent record", "Can include images", "No interruption", "Reference later"],
      tips: ["Be clear and concise", "Include relevant details", "Use proper spelling", "Professional tone"]
    }
  ];

  const industryTerminology = [
    {
      category: "Common Abbreviations",
      terms: [
        { term: "CU", meaning: "Consumer Unit", usage: "We need to upgrade the CU to meet current regulations" },
        { term: "RCD", meaning: "Residual Current Device", usage: "Test the RCD monthly by pressing the test button" },
        { term: "RCBO", meaning: "Residual Current Breaker with Overload", usage: "Install an RCBO for each circuit" },
        { term: "DB", meaning: "Distribution Board", usage: "Label all circuits clearly in the DB" },
        { term: "SWA", meaning: "Steel Wire Armoured cable", usage: "We'll use SWA for the outdoor supply" }
      ]
    },
    {
      category: "Testing & Inspection",
      terms: [
        { term: "IR", meaning: "Insulation Resistance", usage: "The IR test results are within acceptable limits" },
        { term: "EFLI", meaning: "Earth Fault Loop Impedance", usage: "Record the EFLI values for each circuit" },
        { term: "R1+R2", meaning: "Live + Earth continuity", usage: "The R1+R2 readings confirm good continuity" },
        { term: "PFC", meaning: "Prospective Fault Current", usage: "Check the PFC at the origin of the installation" },
        { term: "Zs", meaning: "Earth Loop Impedance", usage: "Zs values must not exceed the maximum permitted" }
      ]
    },
    {
      category: "Site Language",
      terms: [
        { term: "First fix", meaning: "Initial electrical installation", usage: "Complete first fix before plasterboarding" },
        { term: "Second fix", meaning: "Final electrical installation", usage: "Second fix includes fitting accessories and testing" },
        { term: "Snagging", meaning: "Fixing minor defects", usage: "There's a snagging list to complete before handover" },
        { term: "Making good", meaning: "Repairing after installation", usage: "Make good any damage to walls after cable installation" },
        { term: "Pulling cables", meaning: "Installing cables", usage: "Start pulling cables for the ground floor circuits" }
      ]
    }
  ];

  const regionalConsiderations = [
    {
      region: "London & South East",
      characteristics: ["Fast-paced work environment", "Multicultural teams", "High cost awareness"],
      tips: ["Be direct but polite", "Respect diverse backgrounds", "Understand time pressures"]
    },
    {
      region: "Northern England",
      characteristics: ["Strong team culture", "Direct communication", "Traditional work practices"],
      tips: ["Build good relationships", "Appreciate directness", "Show respect for experience"]
    },
    {
      region: "Scotland",
      characteristics: ["Safety-focused culture", "Proud trade traditions", "Strong apprenticeship values"],
      tips: ["Embrace learning opportunities", "Respect safety protocols", "Value traditional skills"]
    },
    {
      region: "Wales",
      characteristics: ["Community-focused approach", "Bilingual considerations", "Strong work ethic"],
      tips: ["Be part of the team", "Respect language differences", "Show commitment to quality"]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Communication Scenarios */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
            </div>
            Real-World Communication Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          {communicationScenarios.map((scenario, index) => (
            <div key={index} className="p-5 rounded-xl bg-white/10 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{scenario.title}</h3>
              <p className="text-white/60 mb-4">{scenario.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Do's
                  </h4>
                  <ul className="space-y-2">
                    {scenario.dos.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Don'ts
                  </h4>
                  <ul className="space-y-2">
                    {scenario.donts.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2">Example Communication:</h4>
                <p className="text-sm italic text-white/70">"{scenario.example}"</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
              <Phone className="h-5 w-5 text-cyan-400" />
            </div>
            Communication Methods & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {communicationChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <IconComponent className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{channel.method}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/5">
                    <h4 className="text-sm font-medium text-cyan-400 mb-2">When to Use:</h4>
                    <p className="text-sm text-white/60">{channel.when}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Advantages:</h4>
                    <ul className="space-y-1">
                      {channel.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className="text-sm text-white/70 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Tips:</h4>
                    <ul className="space-y-1">
                      {channel.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-white/70 flex items-center gap-2">
                          <Info className="h-3 w-3 text-blue-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Industry Terminology */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <MessageSquare className="h-5 w-5 text-purple-400" />
            </div>
            Essential Industry Terminology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {industryTerminology.map((category, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.terms.map((item, termIndex) => (
                  <div key={termIndex} className="pl-4 border-l-2 border-purple-500/30">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {item.term}
                      </Badge>
                      <span className="text-sm font-medium text-white">{item.meaning}</span>
                    </div>
                    <p className="text-sm text-white/60 italic">"{item.usage}"</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regional Considerations */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
            Regional Communication Differences
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-6">
            The UK electrical industry has regional variations in communication styles and workplace culture.
            Understanding these differences will help you adapt and succeed wherever you work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalConsiderations.map((region, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">{region.region}</h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/5">
                    <h4 className="text-sm font-medium text-white mb-2">Characteristics:</h4>
                    <ul className="space-y-1">
                      {region.characteristics.map((char, charIndex) => (
                        <li key={charIndex} className="text-sm text-white/60 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Success Tips:</h4>
                    <ul className="space-y-1">
                      {region.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-white/70 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationGuideTab;
