import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  Lightbulb,
  Shield,
  PoundSterling,
  Users,
  Wrench,
  FileText
} from "lucide-react";

const PracticalGuidance = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const practicalGuides = [
    {
      id: "legal-setup",
      title: "Legal Business Setup",
      icon: <FileText className="h-5 w-5" />,
      category: "Legal",
      timeRequired: "1-2 weeks",
      difficulty: "Medium",
      steps: [
        {
          title: "Choose Business Structure",
          description: "Decide between sole trader, limited company, or partnership",
          tips: [
            "Sole trader: Simplest setup, personal liability for debts",
            "Limited company: More complex but limited liability protection",
            "Partnership: Good for multiple owners, shared responsibilities"
          ],
          resources: ["Companies House website", "HMRC guidance", "Business advisor consultation"]
        },
        {
          title: "Register with HMRC",
          description: "Register for tax and National Insurance",
          tips: [
            "Register within 3 months of starting",
            "Keep detailed records from day one",
            "Consider quarterly VAT registration if turnover exceeds £85k"
          ],
          resources: ["HMRC online registration", "UTR number application", "VAT registration if applicable"]
        },
        {
          title: "Business Insurance",
          description: "Obtain essential insurance coverage",
          tips: [
            "Public liability insurance (minimum £2m recommended)",
            "Professional indemnity insurance",
            "Tools and equipment insurance",
            "Van insurance with business use cover"
          ],
          resources: ["Compare insurance providers", "Trade association discounts", "Annual vs monthly policies"]
        }
      ]
    },
    {
      id: "certification-requirements",
      title: "Electrical Certifications",
      icon: <Shield className="h-5 w-5" />,
      category: "Qualifications",
      timeRequired: "Ongoing",
      difficulty: "High",
      steps: [
        {
          title: "Part P Competent Person Scheme",
          description: "Essential for domestic electrical work",
          tips: [
            "Choose reputable scheme provider (NICEIC, NAPIT, etc.)",
            "Annual assessment required",
            "Allows self-certification of work"
          ],
          resources: ["Scheme provider comparison", "Assessment preparation", "Ongoing CPD requirements"]
        },
        {
          title: "18th Edition BS 7671",
          description: "Current wiring regulations qualification",
          tips: [
            "Required for all electrical work",
            "Updated every few years",
            "Online and classroom options available"
          ],
          resources: ["Approved training centres", "Online course providers", "Update training schedules"]
        },
        {
          title: "Testing and Inspection",
          description: "2391 or equivalent qualifications",
          tips: [
            "Essential for EICR work",
            "Higher earning potential",
            "Required for many commercial contracts"
          ],
          resources: ["City & Guilds centres", "Practical assessment venues", "Equipment requirements"]
        }
      ]
    },
    {
      id: "financial-management",
      title: "Financial Management",
      icon: <PoundSterling className="h-5 w-5" />,
      category: "Finance",
      timeRequired: "Ongoing",
      difficulty: "Medium",
      steps: [
        {
          title: "Business Banking",
          description: "Separate business and personal finances",
          tips: [
            "Compare business account fees",
            "Look for trade-specific features",
            "Consider mobile banking apps for site work",
            "Negotiate overdraft facilities"
          ],
          resources: ["Bank comparison sites", "Trade association partnerships", "Business advisor recommendations"]
        },
        {
          title: "Accounting Software",
          description: "Choose appropriate bookkeeping solution",
          tips: [
            "QuickBooks, Xero, or FreeAgent popular choices",
            "Mobile receipt scanning essential",
            "Integration with CRM systems",
            "Making Tax Digital compliance"
          ],
          resources: ["Software trial periods", "Training resources", "Accountant recommendations"]
        },
        {
          title: "Pricing Strategy",
          description: "Develop competitive yet profitable pricing",
          tips: [
            "Research local market rates",
            "Factor in all costs (travel, materials, overheads)",
            "Consider value-based pricing for specialisms",
            "Build in profit margins of 20-35%"
          ],
          resources: ["Industry salary surveys", "Trade association pricing guides", "Competitor analysis tools"]
        }
      ]
    },
    {
      id: "customer-acquisition",
      title: "Customer Acquisition",
      icon: <Users className="h-5 w-5" />,
      category: "Marketing",
      timeRequired: "3-6 months",
      difficulty: "Medium",
      steps: [
        {
          title: "Local Presence",
          description: "Establish strong local market presence",
          tips: [
            "Google My Business optimisation crucial",
            "Local directory listings (Checkatrade, Rated People)",
            "Vehicle signage and professional appearance",
            "Local networking events and trade shows"
          ],
          resources: ["Google My Business guide", "Directory registration links", "Signage design services"]
        },
        {
          title: "Digital Marketing",
          description: "Build online presence and reputation",
          tips: [
            "Professional website with local SEO",
            "Social media presence (Facebook, Instagram)",
            "Customer review management",
            "WhatsApp Business for customer communication"
          ],
          resources: ["Website builders", "Social media schedulers", "Review management platforms"]
        },
        {
          title: "Referral Network",
          description: "Build relationships for ongoing referrals",
          tips: [
            "Partner with plumbers, builders, decorators",
            "Maintain relationships with suppliers",
            "Previous employer recommendations",
            "Customer referral incentive schemes"
          ],
          resources: ["Local trade directories", "Networking event calendars", "Referral tracking systems"]
        }
      ]
    },
    {
      id: "operational-efficiency",
      title: "Operational Systems",
      icon: <Wrench className="h-5 w-5" />,
      category: "Operations",
      timeRequired: "2-4 weeks",
      difficulty: "Medium",
      steps: [
        {
          title: "Job Management System",
          description: "Implement efficient job tracking and scheduling",
          tips: [
            "Digital scheduling apps (Fieldpower, ServiceTitan)",
            "Customer communication automation",
            "Invoice generation and tracking",
            "Material ordering and stock management"
          ],
          resources: ["Software comparison guides", "Free trial periods", "Integration capabilities"]
        },
        {
          title: "Van Setup and Tools",
          description: "Optimise mobile workshop efficiency",
          tips: [
            "Van racking system for organisation",
            "Essential tool checklist",
            "Emergency stock levels",
            "GPS and route optimisation"
          ],
          resources: ["Van racking suppliers", "Tool inventory lists", "Route planning apps"]
        },
        {
          title: "Quality and Safety Systems",
          description: "Implement consistent quality and safety procedures",
          tips: [
            "Standard operating procedures (SOPs)",
            "Health and safety policies",
            "Quality checklists and certificates",
            "Customer satisfaction surveys"
          ],
          resources: ["Industry templates", "Safety training providers", "Quality management systems"]
        }
      ]
    }
  ];

  const categoryColors = {
    Legal: "border-red-500/50 bg-red-500/10 text-red-300",
    Qualifications: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    Finance: "border-green-500/50 bg-green-500/10 text-green-300",
    Marketing: "border-purple-500/50 bg-purple-500/10 text-purple-300",
    Operations: "border-orange-500/50 bg-orange-500/10 text-orange-300"
  };

  const difficultyColors = {
    Easy: "bg-green-500/20 text-green-300 border-green-400/30",
    Medium: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    High: "bg-red-500/20 text-red-300 border-red-400/30"
  };

  return (
    <Card className="border-indigo-500/50 bg-indigo-500/10">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Step-by-Step Implementation Guides
        </CardTitle>
        <p className="text-indigo-200 text-sm">
          Detailed, actionable guides for every aspect of starting your electrical business
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {practicalGuides.map((guide) => (
          <Card 
            key={guide.id} 
            className={categoryColors[guide.category as keyof typeof categoryColors]}
          >
            <Collapsible 
              open={openSections.includes(guide.id)}
              onOpenChange={() => toggleSection(guide.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {guide.icon}
                      <div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {guide.category}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}
                          >
                            {guide.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs opacity-75">
                            <Clock className="h-3 w-3" />
                            {guide.timeRequired}
                          </div>
                        </div>
                      </div>
                    </div>
                    {openSections.includes(guide.id) ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="border-l-2 border-current/20 pl-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Badge variant="outline" className="mt-1">
                            {stepIndex + 1}
                          </Badge>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{step.title}</h4>
                            <p className="text-sm opacity-75 mb-2">{step.description}</p>
                          </div>
                        </div>
                        
                        <div className="ml-8 space-y-3">
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <Lightbulb className="h-3 w-3" />
                              <span className="text-xs font-semibold">Key Tips:</span>
                            </div>
                            <ul className="space-y-1">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-xs flex items-start gap-1">
                                  <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0 opacity-50" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <FileText className="h-3 w-3" />
                              <span className="text-xs font-semibold">Helpful Resources:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.resources.map((resource, resourceIndex) => (
                                <Badge 
                                  key={resourceIndex} 
                                  variant="outline" 
                                  className="text-xs opacity-75"
                                >
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default PracticalGuidance;