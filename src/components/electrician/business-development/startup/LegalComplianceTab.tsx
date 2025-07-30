
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, FileText, CheckCircle, AlertTriangle, ExternalLink, Scale, Clock } from "lucide-react";

const LegalComplianceTab = () => {
  const legalRequirements = [
    {
      category: "Business Registration & Structure",
      icon: <FileText className="h-5 w-5" />,
      priority: "essential",
      timeframe: "1-2 weeks",
      items: [
        "Choose business structure (sole trader vs limited company)",
        "Register business name with Companies House",
        "Set up dedicated business bank account",
        "Register for VAT if turnover exceeds £85,000",
        "Obtain business insurance (public liability £2M minimum)",
        "Register as employer if hiring staff"
      ]
    },
    {
      category: "Professional Qualifications & Certifications",
      icon: <CheckCircle className="h-5 w-5" />,
      priority: "essential",
      timeframe: "Ongoing",
      items: [
        "Level 3 electrical installation qualification",
        "18th Edition Wiring Regulations (BS 7671)",
        "Testing and inspection certification (2391)",
        "Part P Building Regulations compliance",
        "First Aid at Work certification",
        "Continuing Professional Development (CPD) hours"
      ]
    },
    {
      category: "Industry Scheme Membership",
      icon: <Shield className="h-5 w-5" />,
      priority: "essential",
      timeframe: "2-4 weeks",
      items: [
        "NICEIC, NAPIT, or ELECSA registration",
        "Competent Person Scheme membership",
        "JIB electrician registration (optional)",
        "TrustMark certification for domestic work",
        "Local authority notifications and approvals",
        "Trade association membership (ECA, SELECT)"
      ]
    },
    {
      category: "Health & Safety Compliance",
      icon: <AlertTriangle className="h-5 w-5" />,
      priority: "essential",
      timeframe: "1 week",
      items: [
        "Risk assessment procedures and documentation",
        "Method statements for common electrical work",
        "COSHH assessments for materials and chemicals",
        "Accident reporting and RIDDOR compliance",
        "Equipment inspection and PAT testing schedules",
        "Safe working procedures and toolbox talks"
      ]
    }
  ];

  const complianceSteps = [
    { step: "1", title: "Obtain Required Qualifications", status: "essential", cost: "£1,000-£3,000" },
    { step: "2", title: "Register Business Structure", status: "essential", cost: "£12-£100" },
    { step: "3", title: "Get Professional Insurance", status: "essential", cost: "£800-£2,500/year" },
    { step: "4", title: "Join Competent Person Scheme", status: "essential", cost: "£400-£800/year" },
    { step: "5", title: "Set Up Tax and VAT Registration", status: "important", cost: "Free" },
    { step: "6", title: "Obtain Additional Certifications", status: "recommended", cost: "£200-£500" }
  ];

  const insuranceTypes = [
    {
      type: "Public Liability",
      coverage: "£2,000,000 minimum",
      description: "Covers damage to third party property and injury claims",
      required: true
    },
    {
      type: "Employers' Liability",
      coverage: "£10,000,000 minimum",
      description: "Required if you employ staff, covers workplace injuries",
      required: false
    },
    {
      type: "Professional Indemnity",
      coverage: "£250,000 - £1,000,000",
      description: "Covers errors in design or advice leading to financial loss",
      required: false
    },
    {
      type: "Tool Insurance",
      coverage: "Value of tools",
      description: "Covers theft and damage to tools and equipment",
      required: false
    }
  ];

  const regulatoryBodies = [
    {
      name: "NICEIC",
      description: "National Inspection Council for Electrical Installation Contracting",
      benefits: ["Industry recognition", "Technical support", "Marketing materials", "Certification schemes"],
      cost: "£400-£800/year"
    },
    {
      name: "NAPIT",
      description: "National Association of Professional Inspectors and Testers",
      benefits: ["Competent person schemes", "Training courses", "Technical helpline", "Business support"],
      cost: "£350-£700/year"
    },
    {
      name: "ELECSA",
      description: "Electrical Contractors' Association Certification",
      benefits: ["Part P registration", "Quality assurance", "Dispute resolution", "Technical guidance"],
      cost: "£300-£600/year"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          Legal compliance is mandatory before starting electrical work. Non-compliance can result in fines, prosecution, and insurance invalidation.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {legalRequirements.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">
                <div className="flex items-center gap-2 mb-3">
                  {section.icon}
                  {section.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      section.priority === 'essential' 
                        ? 'border-red-400/50 text-red-300 bg-red-500/10' 
                        : 'border-yellow-400/50 text-yellow-300 bg-yellow-500/10'
                    }`}
                  >
                    {section.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-elec-yellow/50 text-elec-yellow bg-elec-yellow/10">
                    <Clock className="h-3 w-3 mr-1" />
                    {section.timeframe}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-elec-dark/30 border border-elec-yellow/10">
                    <div className="mt-1 h-2 w-2 rounded-full bg-elec-yellow/60 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Checklist & Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceSteps.map((item, index) => (
              <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-300 font-medium text-sm">{item.step}</span>
                  </div>
                  <span className="text-blue-200 font-medium flex-1">{item.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 ml-11">
                  <Badge variant="outline" className="text-blue-300 border-blue-400/30 bg-blue-500/10">
                    {item.cost}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      item.status === 'essential' 
                        ? 'border-red-400/50 text-red-300 bg-red-500/10' 
                        : item.status === 'important'
                        ? 'border-yellow-400/50 text-yellow-300 bg-yellow-500/10'
                        : 'border-green-400/50 text-green-300 bg-green-500/10'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Insurance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {insuranceTypes.map((insurance, index) => (
              <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{insurance.type}</h4>
                    <Badge className={insurance.required ? "bg-red-500/20 text-red-300 border-red-400/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"}>
                      {insurance.required ? "Required" : "Recommended"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{insurance.description}</p>
                <Badge variant="outline" className="text-green-300 border-green-400/30 bg-green-500/10">
                  {insurance.coverage}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Regulatory Bodies & Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {regulatoryBodies.map((body, index) => (
              <div key={index} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium text-white">{body.name}</h4>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 flex-shrink-0">
                      {body.cost}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body.description}</p>
                </div>
                <div className="space-y-2 mb-4">
                  {body.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-2 text-sm text-purple-200">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalComplianceTab;
