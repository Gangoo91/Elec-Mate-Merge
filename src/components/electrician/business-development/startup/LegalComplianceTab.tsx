import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Scale, 
  Clock, 
  Building, 
  PoundSterling, 
  Award, 
  Users,
  Briefcase,
  Home
} from "lucide-react";

const LegalComplianceTab = () => {
  const isMobile = useIsMobile();

  // Key legal compliance metrics for electrical contractors
  const complianceMetrics = [
    {
      metric: "Setup Time Required",
      data: "4-8 weeks for full compliance",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Including registrations, insurance, and certifications"
    },
    {
      metric: "Essential Qualifications",
      data: "3-5 core certifications needed",
      icon: <Award className="h-5 w-5 text-elec-yellow" />,
      detail: "Level 3, 18th Edition, Part P, and scheme membership"
    },
    {
      metric: "Compliance Success Rate",
      data: "95% avoid legal issues with proper setup",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Structured compliance reduces risk significantly"
    },
    {
      metric: "Average Compliance Cost",
      data: "£4,000-8,000 initial investment",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Including all legal requirements and insurance"
    }
  ];

  const businessRegistration = [
    {
      structure: "Sole Trader Registration",
      timeline: "1-2 weeks",
      description: "Simple business setup for individual electrical contractors",
      components: [
        "Register with HMRC for self-employment (free, within 3 months)",
        "Choose business name and ensure it's not trademarked",
        "Set up separate business bank account for financial records",
        "Obtain public liability insurance (minimum £2M coverage)"
      ],
      businessImpact: "Lowest cost setup with full personal control but unlimited liability",
      considerations: ["Personal liability for debts", "Income tax on profits", "Simple record keeping", "No corporation tax"]
    },
    {
      structure: "Limited Company Formation",
      timeline: "2-4 weeks",
      description: "Professional corporate structure with liability protection",
      components: [
        "Register company name and directors with Companies House (£12)",
        "Create Articles of Association and Memorandum",
        "Issue share certificates and maintain statutory books",
        "Register for corporation tax and submit annual returns"
      ],
      businessImpact: "Professional credibility and liability protection with potential tax benefits",
      considerations: ["Limited liability protection", "Corporation tax rates", "Annual filing requirements", "Director responsibilities"]
    },
    {
      structure: "Partnership Formation",
      timeline: "2-3 weeks",
      description: "Shared business ownership between multiple electrical contractors",
      components: [
        "Draft comprehensive partnership agreement",
        "Register partnership with HMRC within 3 months",
        "Define profit sharing and decision-making processes",
        "Establish procedures for partner changes and business exit"
      ],
      businessImpact: "Shared resources and expertise but joint liability for all partner actions",
      considerations: ["Joint and several liability", "Partnership tax", "Shared decision making", "Exit procedures"]
    }
  ];

  const professionalQualifications = [
    {
      category: "Essential Electrical Qualifications",
      requirements: [
        { 
          qualification: "Level 3 Electrical Installation", 
          cost: "£2,000-4,000", 
          timeframe: "6-18 months",
          necessity: "Essential",
          description: "Foundation qualification for all electrical work in the UK"
        },
        { 
          qualification: "18th Edition IET Wiring Regulations", 
          cost: "£300-500", 
          timeframe: "3-5 days",
          necessity: "Essential",
          description: "Current BS 7671 regulations (Amendment 2 is latest)"
        },
        { 
          qualification: "Inspection & Testing (2391)", 
          cost: "£800-1,200", 
          timeframe: "1-2 weeks",
          necessity: "Essential",
          description: "Required for electrical testing and certification"
        }
      ],
      totalInvestment: "£3,100-5,700"
    },
    {
      category: "Legal Compliance Requirements",
      requirements: [
        { 
          qualification: "Part P Building Regulations", 
          cost: "£400-800", 
          timeframe: "Annual",
          necessity: "Essential",
          description: "Legal requirement for domestic electrical work"
        },
        { 
          qualification: "Scheme Membership (NICEIC/NAPIT)", 
          cost: "£500-800", 
          timeframe: "Annual",
          necessity: "Essential",
          description: "Competent person registration for Part P compliance"
        },
        { 
          qualification: "Public Liability Insurance", 
          cost: "£800-2,500", 
          timeframe: "Annual",
          necessity: "Essential",
          description: "Minimum £2M coverage legally required"
        }
      ],
      totalInvestment: "£1,700-4,100 annually"
    }
  ];

  const insuranceRequirements = [
    {
      category: "Mandatory Insurance Coverage",
      policies: [
        {
          type: "Public Liability Insurance",
          coverage: "£2M minimum (£6M recommended)",
          cost: "£800-2,500 annually",
          description: "Covers third-party injury and property damage claims",
          businessImpact: "Legal requirement for most commercial work and customer confidence"
        },
        {
          type: "Professional Indemnity Insurance", 
          coverage: "£250K-£1M depending on work type",
          cost: "£300-800 annually",
          description: "Covers errors in design, advice, or professional services",
          businessImpact: "Required for design work and recommended for all electrical advice"
        },
        {
          type: "Employers' Liability Insurance",
          coverage: "£10M minimum",
          cost: "£500-1,500 annually",
          description: "Legal requirement if employing staff (£5M fine for non-compliance)",
          businessImpact: "Mandatory when hiring employees or subcontractors"
        }
      ]
    },
    {
      category: "Additional Recommended Coverage",
      policies: [
        {
          type: "Tool and Equipment Insurance",
          coverage: "Based on tool value",
          cost: "£200-600 annually", 
          description: "Covers theft, damage, and breakdown of tools and equipment",
          businessImpact: "Protects significant tool investment and business continuity"
        },
        {
          type: "Commercial Vehicle Insurance",
          coverage: "Comprehensive including goods in transit",
          cost: "£800-2,000 annually",
          description: "Covers van, tools in transit, and business use",
          businessImpact: "Essential for mobile electrical contractor operations"
        }
      ]
    }
  ];

  const healthSafetyCompliance = [
    {
      requirement: "Risk Assessment Documentation",
      timeline: "Ongoing requirement",
      description: "Legal obligation under Management of Health and Safety at Work Regulations",
      components: [
        "Written risk assessments for all electrical work activities",
        "Site-specific risk assessments for each job location",
        "Regular review and updates of assessment procedures",
        "Staff training records on risk assessment awareness"
      ],
      businessImpact: "Legal protection and insurance compliance, reduces liability claims",
      enforcement: ["HSE inspections", "Insurance requirements", "Customer contracts"]
    },
    {
      requirement: "Method Statements",
      timeline: "Before high-risk work",
      description: "Written procedures for complex or high-risk electrical installations",
      components: [
        "Step-by-step work procedures for complex installations",
        "Safety precautions and protective equipment requirements",
        "Emergency procedures and incident response plans", 
        "Competency requirements for staff performing work"
      ],
      businessImpact: "Required for commercial contracts and demonstrates professional competence",
      enforcement: ["Commercial contract requirements", "Insurance conditions", "CDM regulations"]
    },
    {
      requirement: "COSHH Assessments",
      timeline: "Before using hazardous substances",
      description: "Control of Substances Hazardous to Health regulations compliance",
      components: [
        "Assessment of cleaning chemicals and solvents used",
        "Safe storage procedures for hazardous materials",
        "Personal protective equipment specifications",
        "Staff training on safe handling procedures"
      ],
      businessImpact: "Legal requirement prevents prosecution and ensures worker safety",
      enforcement: ["HSE enforcement", "Workplace inspections", "Accident investigations"]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-red-500/50 bg-red-500/10">
        <Shield className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          Legal compliance is mandatory - 98% of electrical businesses face legal issues without proper setup and documentation.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {complianceMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="business-registration">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-blue-400" />}>
            Business Registration & Structure
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {businessRegistration.map((structure, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{structure.structure}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {structure.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{structure.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Setup Requirements</h5>
                    <ul className="space-y-1">
                      {structure.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{structure.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Considerations</h5>
                    <div className="flex flex-wrap gap-1">
                      {structure.considerations.map((consideration, consIndex) => (
                        <Badge key={consIndex} variant="outline" className={`text-amber-300 border-amber-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {consideration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="qualifications">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-green-400" />}>
            Professional Qualifications & Certifications
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {professionalQualifications.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-green-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  <div className="border border-green-500/20 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Required Qualifications</h5>
                      <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {category.totalInvestment}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {category.requirements.map((requirement, reqIndex) => (
                        <div key={reqIndex} className={`${isMobile ? 'text-center space-y-2' : 'flex items-center justify-between'} p-3 bg-green-500/5 border border-green-500/20 rounded`}>
                          {isMobile ? (
                            <>
                              <div className="text-sm text-green-200 font-medium">{requirement.qualification}</div>
                              <div className="text-xs text-muted-foreground">{requirement.description}</div>
                              <Badge variant="outline" className="text-green-300 border-green-400/30 text-sm">
                                {requirement.necessity}
                              </Badge>
                              <div className="text-base text-white font-bold">{requirement.cost}</div>
                            </>
                          ) : (
                            <>
                              <div className="flex-1">
                                <div className="text-sm text-green-200 font-medium">{requirement.qualification}</div>
                                <div className="text-xs text-muted-foreground">{requirement.description}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-green-300 border-green-400/30 text-sm">
                                  {requirement.necessity}
                                </Badge>
                                <span className="text-sm text-white font-medium">{requirement.cost}</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="insurance">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-purple-400" />}>
            Insurance Requirements & Protection
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {insuranceRequirements.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-purple-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.policies.map((policy, policyIndex) => (
                    <div key={policyIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{policy.type}</h5>
                        <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {policy.cost}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{policy.description}</p>
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Coverage: {policy.coverage}</h6>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{policy.businessImpact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="health-safety">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-orange-400" />}>
            Health & Safety Compliance
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {healthSafetyCompliance.map((requirement, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{requirement.requirement}</h4>
                      <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {requirement.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{requirement.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Compliance Requirements</h5>
                    <ul className="space-y-1">
                      {requirement.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{requirement.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-red-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Enforcement</h5>
                    <div className="flex flex-wrap gap-1">
                      {requirement.enforcement.map((enforcement, enfIndex) => (
                        <Badge key={enfIndex} variant="outline" className={`text-red-300 border-red-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {enforcement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default LegalComplianceTab;