
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Shield, Clock, PoundSterling, AlertTriangle } from "lucide-react";

const LegalRequirementsTab = () => {
  const legalRequirements = [
    {
      category: "Employment Law",
      requirements: [
        "Written statement of employment terms within 2 months",
        "Apprentice minimum wage compliance (£6.40/hour for first year)",
        "National minimum wage after first year (£10.42/hour)",
        "28 days annual leave including bank holidays",
        "Employer liability insurance coverage",
        "Health and safety training documentation"
      ]
    },
    {
      category: "Training Requirements",
      requirements: [
        "20% off-the-job training (minimum 6 hours per week)",
        "Registered training provider agreement",
        "Individual learning plan development",
        "Skills development and assessment records",
        "End-point assessment arrangements",
        "EPA organisation registration"
      ]
    },
    {
      category: "Health & Safety",
      requirements: [
        "Risk assessment for young workers under 18",
        "Construction skills certification scheme (CSCS)",
        "Personal protective equipment provision",
        "Safe working procedures training",
        "First aid training and facilities",
        "Accident reporting procedures"
      ]
    }
  ];

  const payrollConsiderations = [
    { item: "Apprentice Minimum Wage", rate: "£6.40/hour", condition: "First year or under 19" },
    { item: "National Minimum Wage 18-20", rate: "£8.60/hour", condition: "After first year" },
    { item: "National Minimum Wage 21+", rate: "£10.42/hour", condition: "After first year" },
    { item: "Apprenticeship Levy", rate: "0.5%", condition: "If payroll >£3m annually" },
    { item: "Employer NI", rate: "13.8%", condition: "On earnings >£175/week" },
    { item: "Auto-enrolment Pension", rate: "3%", condition: "Minimum employer contribution" }
  ];

  const complianceChecklist = [
    "Apprenticeship agreement signed and dated",
    "Training provider contract in place",
    "Individual learning plan created",
    "20% off-the-job training scheduled",
    "Health and safety induction completed",
    "First aid training arranged",
    "Insurance coverage confirmed",
    "Payroll systems updated for apprentice rates",
    "Holiday entitlement calculated correctly",
    "Performance review dates scheduled"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-amber-500/30 bg-amber-500/10">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong>Important:</strong> Legal requirements for apprentices are strictly enforced. 
          Non-compliance can result in significant fines and loss of government funding. 
          Consider consulting an employment law specialist if unsure.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {legalRequirements.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="flex items-start gap-2 p-3 bg-elec-dark/50 rounded-lg">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Payroll & Financial Obligations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollConsiderations.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">{item.condition}</p>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow">
                  {item.rate}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Government Incentives Available</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• £3,000 incentive for hiring apprentices aged 16-18</li>
              <li>• £1,500 incentive for apprentices aged 19-24</li>
              <li>• Additional support for small employers (< 50 employees)</li>
              <li>• 100% funding for apprentices aged 16-18</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Compliance Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2">
                <input type="checkbox" className="rounded border-green-500" />
                <span className="text-sm text-green-200">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/40 rounded-lg">
            <p className="text-sm text-green-300">
              <strong>Tip:</strong> Keep all documentation organised and easily accessible. 
              Regular audits by training providers and funding bodies are common.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalRequirementsTab;
