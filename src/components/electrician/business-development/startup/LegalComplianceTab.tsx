
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
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
                <div className="ml-auto flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      section.priority === 'essential' 
                        ? 'border-red-400/50 text-red-300' 
                        : 'border-yellow-400/50 text-yellow-300'
                    }`}
                  >
                    {section.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {section.timeframe}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {item}
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
          <div className="space-y-3">
            {complianceSteps.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-300 font-medium text-sm">{item.step}</span>
                </div>
                <span className="flex-1 text-blue-200">{item.title}</span>
                <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                  {item.cost}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    item.status === 'essential' 
                      ? 'border-red-400/50 text-red-300' 
                      : item.status === 'important'
                      ? 'border-yellow-400/50 text-yellow-300'
                      : 'border-green-400/50 text-green-300'
                  }`}
                >
                  {item.status}
                </Badge>
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
          <div className="grid md:grid-cols-2 gap-4">
            {insuranceTypes.map((insurance, index) => (
              <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{insurance.type}</h4>
                  <Badge className={insurance.required ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"}>
                    {insurance.required ? "Required" : "Recommended"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insurance.description}</p>
                <Badge variant="outline" className="text-green-300 border-green-400/30">
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
          <div className="space-y-4">
            {regulatoryBodies.map((body, index) => (
              <div key={index} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white">{body.name}</h4>
                    <p className="text-sm text-muted-foreground">{body.description}</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    {body.cost}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {body.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm text-purple-200">
                      <CheckCircle className="h-3 w-3" />
                      {benefit}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <ExternalLink className="h-4 w-4 mr-1" />
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
