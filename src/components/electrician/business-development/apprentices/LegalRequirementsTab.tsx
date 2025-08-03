
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  FileText, 
  Shield, 
  Clock, 
  PoundSterling, 
  AlertTriangle, 
  Calculator, 
  Users, 
  Book, 
  CheckCircle, 
  Calendar, 
  FileCheck,
  Eye,
  BarChart3,
  Brain,
  Award,
  Target
} from "lucide-react";

const LegalRequirementsTab = () => {
  const isMobile = useIsMobile();

  // Updated for 2025 - Key metrics for employer focus
  const complianceMetrics = [
    {
      metric: "Non-Compliance Risk",
      data: "15% of employers face penalties annually",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      detail: "Proper compliance systems reduce risk by 90%"
    },
    {
      metric: "Average Penalty Cost",
      data: "£12,500 per violation incident",
      icon: <PoundSterling className="h-5 w-5 text-amber-400" />,
      detail: "Including back-pay, fines, and legal costs"
    },
    {
      metric: "Training Compliance ROI",
      data: "£4.50 saved per £1 invested",
      icon: <BarChart3 className="h-5 w-5 text-green-400" />,
      detail: "Proper systems prevent costly compliance failures"
    },
    {
      metric: "Time to Full Compliance",
      data: "4-6 weeks with structured approach",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Systematic implementation ensures legal protection"
    }
  ];

  // Updated 2025 wage rates
  const currentWageFramework = [
    {
      category: "2025 Minimum Wage Requirements",
      timing: "Updated April 2024",
      description: "Legal minimum wage rates for apprentices with enforcement implications",
      components: [
        "Apprentice minimum wage: £7.00/hour (first year or under 19)",
        "18-20 National minimum wage: £12.21/hour (after first year)",
        "21+ National minimum wage: £12.21/hour (after first year)",
        "Automatic penalty system for underpayment (up to £25,000 per worker)"
      ],
      employerView: "Wage compliance is strictly monitored with automatic penalties and naming/shaming",
      criticalPoints: ["No exceptions to minimum wage", "Backdated payments required", "Public naming for violations"]
    },
    {
      category: "Training Time Legal Requirements",
      timing: "Ongoing Compliance",
      description: "Mandatory 20% off-the-job training with strict documentation requirements",
      components: [
        "Minimum 20% of working hours for off-the-job training",
        "Detailed time tracking and evidence requirements",
        "Regular progress reviews every 12 weeks minimum",
        "EPA readiness assessment and documentation"
      ],
      employerView: "Training compliance directly affects funding eligibility and legal standing",
      criticalPoints: ["Time tracking mandatory", "Evidence must be comprehensive", "Regular audits by providers"]
    },
    {
      category: "Health & Safety Legal Framework",
      timing: "Immediate Compliance Required",
      description: "Enhanced safety requirements for young workers and electrical apprentices",
      components: [
        "Young worker risk assessments (under 18)",
        "CSCS card provision and maintenance",
        "Electrical safety training and certification",
        "RIDDOR compliance and accident reporting"
      ],
      employerView: "Safety violations can result in unlimited fines and imprisonment",
      criticalPoints: ["Zero tolerance for safety breaches", "Enhanced protection for under 18s", "Immediate reporting requirements"]
    }
  ];

  const complianceFramework = [
    {
      priority: "Critical - Immediate Action Required",
      requirements: [
        {
          item: "Employment Contract Documentation",
          description: "Written statement within 2 months, apprenticeship agreement signed",
          penalty: "£20,000 employment tribunal + legal costs",
          action: "Standardise contracts and ensure proper signing procedures"
        },
        {
          item: "Minimum Wage Compliance",
          description: "Correct rates paid from day one with proper record keeping",
          penalty: "£25,000 per worker + naming/shaming + back-pay",
          action: "Implement automatic payroll checks and regular audits"
        },
        {
          item: "Health & Safety Training",
          description: "Site induction, PPE provision, young worker assessments",
          penalty: "Unlimited fines + potential imprisonment",
          action: "Mandatory safety training programme and documentation"
        }
      ]
    },
    {
      priority: "High - Within 30 Days",
      requirements: [
        {
          item: "Training Provider Agreement",
          description: "Registered provider contract and individual learning plans",
          penalty: "Funding withdrawal + recovery action",
          action: "Establish formal training partnerships and documentation"
        },
        {
          item: "Off-the-Job Training Systems",
          description: "20% time allocation with comprehensive tracking",
          penalty: "Funding clawback + apprentice transfer",
          action: "Digital tracking systems and regular monitoring"
        },
        {
          item: "Insurance and Liability Coverage",
          description: "Employer liability minimum £5m, professional indemnity",
          penalty: "Personal liability + unlimited damages",
          action: "Review insurance coverage and update policies"
        }
      ]
    },
    {
      priority: "Medium - Ongoing Compliance",
      requirements: [
        {
          item: "Progress Review System",
          description: "12-week reviews with documented outcomes",
          penalty: "Apprentice withdrawal + funding loss",
          action: "Implement structured review calendar and documentation"
        },
        {
          item: "EPA Preparation",
          description: "End-point assessment readiness and portfolio evidence",
          penalty: "EPA failure + extended programme costs",
          action: "Systematic EPA preparation and evidence gathering"
        },
        {
          item: "Record Keeping Systems",
          description: "Training records, assessments, progress documentation",
          penalty: "Audit failures + regulatory action",
          action: "Digital record keeping with backup systems"
        }
      ]
    }
  ];

  const governmentSupport = [
    {
      support: "Compliance Guidance & Training",
      details: [
        {
          service: "ACAS Employment Law Guidance",
          description: "Free advice on employment law compliance",
          access: "Phone, online, and face-to-face consultations",
          cost: "Free"
        },
        {
          service: "CITB Safety Training Support",
          description: "Industry-specific health and safety guidance",
          access: "Online resources and training programmes",
          cost: "Subsidised rates available"
        }
      ]
    },
    {
      support: "Financial Incentives & Funding",
      details: [
        {
          service: "Apprentice Hiring Incentives",
          description: "£3,000 for 16-18 year olds, £1,500 for 19-24",
          access: "Automatic payment through apprenticeship service",
          cost: "Free money - paid after 90 days"
        },
        {
          service: "Training Cost Support",
          description: "95-100% funding for training costs",
          access: "Through registered training providers",
          cost: "Minimal co-investment required"
        }
      ]
    }
  ];

  const regionalCompliance = [
    {
      region: "England",
      authority: "Education & Skills Funding Agency (ESFA)",
      keyRequirements: [
        "Apprenticeship levy compliance (0.5% if payroll >£3m)",
        "ESFA funding rules and audit requirements",
        "Ofsted inspection readiness for training quality"
      ],
      penalties: "Funding withdrawal, levy recovery, public naming",
      support: "ESFA compliance guidance, digital apprenticeship service"
    },
    {
      region: "Scotland",
      authority: "Skills Development Scotland (SDS)",
      keyRequirements: [
        "Scottish apprenticeship standards compliance",
        "SDS funding and quality requirements",
        "Additional Scottish-specific incentives"
      ],
      penalties: "Similar to England with additional Scottish sanctions",
      support: "SDS direct support, enhanced funding rates"
    },
    {
      region: "Wales",
      authority: "Welsh Government",
      keyRequirements: [
        "Working Wales apprenticeship standards",
        "Welsh language considerations where applicable",
        "Welsh-specific funding requirements"
      ],
      penalties: "Welsh Government enforcement actions",
      support: "Additional Welsh incentives and support programmes"
    },
    {
      region: "Northern Ireland",
      authority: "Department for Economy",
      keyRequirements: [
        "Apprenticeship NI programme compliance",
        "Separate system from rest of UK",
        "DfE NI specific standards and requirements"
      ],
      penalties: "Separate NI enforcement framework",
      support: "DfE NI support services and guidance"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          Legal compliance is strictly enforced with severe penalties. Proper systems prevent 90% of violations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-3">
        {complianceMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className="text-xs font-medium text-white">{metric.metric}</div>
              <div className="text-xs text-muted-foreground">{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="framework">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-red-400" />}>
            2025 Legal Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {currentWageFramework.map((framework, index) => (
                <div key={index} className="border border-red-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white text-sm">{framework.category}</h4>
                      <Badge variant="outline" className="text-red-300 border-red-400/30 text-xs">
                        {framework.timing}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{framework.description}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-red-300 mb-2 text-xs">Legal Requirements</h5>
                    <ul className="space-y-1">
                      {framework.components.map((component, compIndex) => (
                        <li key={compIndex} className="text-xs text-red-200 flex items-center gap-1">
                          <Shield className="h-3 w-3 text-red-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <h5 className="font-medium text-amber-300 mb-1 text-xs">Employer Impact</h5>
                    <p className="text-xs text-amber-200">{framework.employerView}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-red-300 mb-1 text-xs">Critical Points</h5>
                    <div className="flex flex-wrap gap-1">
                      {framework.criticalPoints.map((point, pointIndex) => (
                        <Badge key={pointIndex} variant="outline" className="text-red-300 border-red-400/30 text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="compliance">
          <MobileAccordionTrigger icon={<CheckCircle className="h-5 w-5 text-blue-400" />}>
            Compliance Requirements
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {complianceFramework.map((priority, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-blue-300 text-sm border-b border-blue-500/20 pb-1">
                    {priority.priority}
                  </h4>
                  {priority.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="border border-blue-500/20 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium text-white text-sm">{req.item}</h5>
                      <p className="text-xs text-muted-foreground">{req.description}</p>
                      
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                        <h6 className="font-medium text-red-300 mb-1 text-xs">Penalty Risk</h6>
                        <p className="text-xs text-red-200">{req.penalty}</p>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <h6 className="font-medium text-green-300 mb-1 text-xs">Action Required</h6>
                        <p className="text-xs text-green-200">{req.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="support">
          <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-green-400" />}>
            Government Support & Guidance
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {governmentSupport.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-green-300 text-sm border-b border-green-500/20 pb-1">
                    {category.support}
                  </h4>
                  {category.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white text-sm">{detail.service}</h5>
                        <Badge variant="outline" className="text-green-300 border-green-400/30 text-xs">
                          {detail.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{detail.description}</p>
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <h6 className="font-medium text-blue-300 mb-1 text-xs">How to Access</h6>
                        <p className="text-xs text-blue-200">{detail.access}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="regional">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Regional Compliance Variations
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {regionalCompliance.map((region, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white text-sm">{region.region}</h4>
                    <Badge variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                      {region.authority}
                    </Badge>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2 text-xs">Key Requirements</h5>
                    <ul className="space-y-1">
                      {region.keyRequirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-xs text-purple-200 flex items-center gap-1">
                          <Shield className="h-3 w-3 text-purple-400 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <h5 className="font-medium text-red-300 mb-1 text-xs">Enforcement</h5>
                    <p className="text-xs text-red-200">{region.penalties}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className="font-medium text-green-300 mb-1 text-xs">Available Support</h5>
                    <p className="text-xs text-green-200">{region.support}</p>
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

export default LegalRequirementsTab;
