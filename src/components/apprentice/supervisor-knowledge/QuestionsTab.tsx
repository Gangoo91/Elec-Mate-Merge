
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, BookOpen, Zap, Shield, Settings, CheckCircle, AlertTriangle } from "lucide-react";

const QuestionsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const questionCategories = [
    {
      id: "safety",
      title: "Safety Procedures",
      icon: Shield,
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      questions: [
        {
          q: "What should I do if I'm unsure about safe isolation?",
          a: "Never proceed if you're uncertain. Always ask your supervisor to verify the isolation procedure. Use a proven voltage indicator and follow the lock-off/tag-out procedure. Document the isolation and ensure all team members are aware.",
          tags: ["isolation", "safety", "voltage"]
        },
        {
          q: "When is it necessary to wear arc flash PPE?",
          a: "Arc flash PPE is required when working on live equipment above 50V AC or when there's a risk of electrical fault. Your supervisor should provide specific guidance based on the arc flash study. Never assume - always check the risk assessment.",
          tags: ["ppe", "arc flash", "live work"]
        },
        {
          q: "How do I report a near miss incident?",
          a: "Report immediately to your supervisor, complete the incident form within 24 hours, and include witness statements if available. Focus on facts, not blame. Near misses are learning opportunities for the whole team.",
          tags: ["reporting", "near miss", "documentation"]
        },
        {
          q: "What's the correct procedure for working in confined spaces?",
          a: "Never enter without proper assessment, gas monitoring, ventilation, and rescue plan. Ensure trained personnel are present and emergency procedures are in place. Always follow the confined space permit system.",
          tags: ["confined space", "permits", "gas monitoring"]
        }
      ]
    },
    {
      id: "installation",
      title: "Installation Methods",
      icon: Settings,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      questions: [
        {
          q: "How do I calculate cable size for a new circuit?",
          a: "Consider: load current, ambient temperature, installation method, grouping factors, and voltage drop. Use BS7671 tables or approved software. Always verify calculations with your supervisor before installation.",
          tags: ["cable sizing", "calculations", "bs7671"]
        },
        {
          q: "What's the maximum length for a ring final circuit?",
          a: "BS7671 doesn't specify a maximum length, but the floor area served shouldn't exceed 100m². The key is ensuring Zs values are within limits and proper operation of protective devices.",
          tags: ["ring final", "circuit length", "zs values"]
        },
        {
          q: "When should I use SWA cable vs standard twin and earth?",
          a: "Use SWA for underground runs, external installations, or where mechanical protection is needed. Twin and earth is suitable for internal domestic wiring. Consider environmental factors and BS7671 requirements.",
          tags: ["swa cable", "twin and earth", "cable selection"]
        },
        {
          q: "How do I determine the correct IP rating for an installation?",
          a: "Consider the environment: IP44 for bathrooms, IP65 for outdoor locations, IP67 for wet areas. Check manufacturer specifications and BS7671 requirements for specific locations.",
          tags: ["ip rating", "environmental protection", "enclosures"]
        }
      ]
    },
    {
      id: "testing",
      title: "Testing & Inspection",
      icon: CheckCircle,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      questions: [
        {
          q: "What Zs values indicate a failed test?",
          a: "Zs values must not exceed the maximum permitted values in BS7671 tables. For 32A Type B MCB: 1.44Ω, for 20A Type B: 2.3Ω. Temperature correction may apply. Always check the specific requirements for your circuit.",
          tags: ["zs testing", "earth fault loop", "mcb"]
        },
        {
          q: "Why might an RCD test fail?",
          a: "Common causes: damaged RCD, neutral-earth faults, incorrect wiring, or RCD outside tolerance. Check test current, timing, and ensure proper test button operation. Investigate N-E faults if trip time is too fast.",
          tags: ["rcd testing", "fault finding", "neutral earth"]
        },
        {
          q: "What's the minimum insulation resistance reading?",
          a: "Minimum 1MΩ for new installations, though 2MΩ is preferred. For existing installations, 0.5MΩ may be acceptable if no deterioration. Test at 500V DC for circuits up to 500V AC.",
          tags: ["insulation resistance", "testing", "megger"]
        },
        {
          q: "How do I test polarity correctly?",
          a: "Test with installation isolated and use continuity tester. Check L-L continuity at each outlet, verify correct connections at switches and two-way circuits. Document all readings and any discrepancies.",
          tags: ["polarity testing", "continuity", "switches"]
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Fault Finding",
      icon: AlertTriangle,
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      questions: [
        {
          q: "Circuit breaker keeps tripping - what should I check?",
          a: "Check for overload (current too high), short circuit (L-N fault), or earth fault (L-E fault). Use clamp meter to measure current, inspect connections, and test insulation resistance. Work systematically.",
          tags: ["circuit breaker", "tripping", "fault finding"]
        },
        {
          q: "Lights flickering intermittently - possible causes?",
          a: "Check loose connections, neutral issues, voltage fluctuations, or incompatible dimmer switches. Use voltage tester to check supply stability and inspect all connections in the circuit.",
          tags: ["flickering lights", "loose connections", "voltage"]
        },
        {
          q: "Socket not working but others on same circuit are fine?",
          a: "Check the socket connections, test with known good appliance, verify continuity from CU to socket. Could be loose connection at socket, damaged cable, or wiring fault.",
          tags: ["socket fault", "continuity testing", "connections"]
        },
        {
          q: "How do I find a cable fault underground?",
          a: "Use cable locator for route tracing, TDR (Time Domain Reflectometer) for fault location, and insulation resistance testing. Mark the route carefully and dig by hand near the suspected fault location.",
          tags: ["cable fault", "underground", "tdr", "cable locator"]
        }
      ]
    },
    {
      id: "regulations",
      title: "Regulations & Standards",
      icon: BookOpen,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      questions: [
        {
          q: "What's the difference between Parts P and BS7671?",
          a: "Part P is Building Regulations covering notifiable work in dwellings. BS7671 is the IET Wiring Regulations covering all electrical installations. Part P references BS7671 for technical standards.",
          tags: ["part p", "bs7671", "building regulations"]
        },
        {
          q: "When do I need to notify Building Control?",
          a: "For new consumer units, new circuits in kitchens/bathrooms, circuits in gardens, and work in special locations. Some work can be self-certified if carried out by registered electricians.",
          tags: ["building control", "notification", "part p"]
        },
        {
          q: "What certificates do I need to complete?",
          a: "EIC for new installations, EICR for inspections, MWC for minor works. Include schedules of test results and ensure all relevant boxes are completed accurately.",
          tags: ["certificates", "eic", "eicr", "mwc"]
        },
        {
          q: "How often should EICR inspections be carried out?",
          a: "Domestic: 10 years (5 years for rental properties), Commercial: 5 years, Industrial: 3 years. More frequent inspections may be required based on environment and usage.",
          tags: ["eicr", "inspection frequency", "testing"]
        }
      ]
    },
    {
      id: "communication",
      title: "Communication & Workplace",
      icon: Zap,
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      questions: [
        {
          q: "How do I ask for help without seeming incompetent?",
          a: "Frame it as seeking guidance: 'I want to make sure I approach this correctly' or 'Could you verify my understanding of...'. Show what you've already considered and ask specific questions.",
          tags: ["asking help", "communication", "professional development"]
        },
        {
          q: "What should I do if I disagree with my supervisor's approach?",
          a: "Ask questions to understand their reasoning first. If you still have concerns, especially safety-related, express them respectfully: 'Could we discuss an alternative approach?' Document any safety concerns.",
          tags: ["disagreement", "supervisor", "safety concerns"]
        },
        {
          q: "How do I explain delays to clients?",
          a: "Be honest and proactive. Explain the reason simply, provide realistic timeframes, and offer solutions. Keep your supervisor informed and let them handle complex client communications.",
          tags: ["client communication", "delays", "transparency"]
        },
        {
          q: "What should I document in my daily reports?",
          a: "Work completed, materials used, hours worked, any issues encountered, and work planned for next day. Include photos of completed work and note any client interactions or special requirements.",
          tags: ["documentation", "daily reports", "record keeping"]
        }
      ]
    }
  ];

  const filteredCategories = questionCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Comprehensive Questions Bank</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Extensive collection of real-world questions and expert answers from experienced electricians and supervisors. 
            Search by topic, keyword, or browse by category.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, answers, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {(searchQuery ? filteredCategories : questionCategories).map((category) => (
          <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-elec-yellow/10">
                    <category.icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      {category.title}
                      <Badge className={category.color} variant="outline">
                        {category.questions.length} Q&As
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-5 w-5 text-elec-yellow" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-elec-yellow" />
                )}
              </div>
            </CardHeader>
            
            {(expandedCategory === category.id || searchQuery) && (
              <CardContent className="space-y-4">
                {category.questions.map((qa, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-semibold text-elec-yellow mb-2">{qa.q}</h4>
                    <p className="text-sm text-elec-light/80 mb-3">{qa.a}</p>
                    <div className="flex flex-wrap gap-1">
                      {qa.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs bg-elec-dark/40 border-elec-yellow/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && searchQuery && (
        <Card className="border-gray-500/20 bg-gray-500/10">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No questions found matching "{searchQuery}"</p>
            <Button 
              variant="outline" 
              className="mt-3"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionsTab;
