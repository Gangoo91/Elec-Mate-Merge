
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, FileText, CheckCircle, AlertTriangle } from "lucide-react";

const LegalComplianceTab = () => {
  const legalRequirements = [
    {
      category: "Business Registration",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Register as sole trader or limited company",
        "Choose and register business name",
        "Set up business bank account",
        "Register for VAT (if applicable)",
        "Obtain business insurance"
      ]
    },
    {
      category: "Professional Qualifications",
      icon: <CheckCircle className="h-5 w-5" />,
      items: [
        "Valid electrical qualifications",
        "18th Edition Wiring Regulations",
        "Testing and inspection certification",
        "Part P Building Regulations compliance",
        "Continuing Professional Development (CPD)"
      ]
    },
    {
      category: "Industry Registrations",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "NICEIC or NAPIT registration",
        "Competent Person Scheme membership",
        "JIB registration (if applicable)",
        "TrustMark certification",
        "Local authority notifications"
      ]
    }
  ];

  const complianceSteps = [
    { step: "1", title: "Obtain Required Qualifications", status: "essential" },
    { step: "2", title: "Register Business Structure", status: "essential" },
    { step: "3", title: "Get Professional Insurance", status: "essential" },
    { step: "4", title: "Join Competent Person Scheme", status: "essential" },
    { step: "5", title: "Set Up Tax and VAT", status: "important" },
    { step: "6", title: "Obtain Additional Certifications", status: "recommended" }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          Legal compliance is mandatory. Ensure all requirements are met before starting work.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {legalRequirements.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Checklist
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
    </div>
  );
};

export default LegalComplianceTab;
