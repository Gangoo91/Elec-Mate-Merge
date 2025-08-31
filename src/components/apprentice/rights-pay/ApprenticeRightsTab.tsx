
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Clock, GraduationCap, FileText, Phone, AlertTriangle, Users, Heart } from "lucide-react";

const ApprenticeRightsTab = () => {
  const rights = [
    {
      category: "Working Time & Conditions",
      icon: <Clock className="h-5 w-5" />,
      items: [
        "Maximum 48-hour working week (averaged over 17 weeks) - you can opt out voluntarily",
        "Minimum 20 days paid holiday plus 8 bank holidays (28 days total)",
        "Rest breaks: 20 minutes if working over 6 hours continuously",
        "11 hours consecutive rest between working days",
        "24 hours consecutive rest in each 7-day period",
        "Night work restrictions (22:00-06:00) with health assessments if required",
        "Overtime pay rates should be clearly defined in your contract"
      ]
    },
    {
      category: "Training & Development Rights",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        "Minimum 20% off-the-job training (equivalent to 1 day per week)",
        "Access to structured learning programme aligned to apprenticeship standard",
        "Regular progress reviews every 12 weeks with documented feedback",
        "Qualified mentor or supervisor support throughout apprenticeship",
        "Training costs covered by employer (tuition fees, materials, assessments)",
        "Time off for college/training centre attendance without loss of pay",
        "Access to End Point Assessment when ready, funded by employer",
        "Protection from being used as cheap labour - training must be genuine"
      ]
    },
    {
      category: "Health & Safety Protection",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "Safe working environment with proper risk assessments",
        "Comprehensive health and safety training before starting work",
        "Personal protective equipment (PPE) provided free of charge",
        "Right to refuse unsafe work without penalty or discrimination",
        "Access to first aid facilities and trained first aiders",
        "Proper supervision when working with dangerous equipment/substances",
        "Regular safety briefings and toolbox talks",
        "Right to report safety concerns without fear of retaliation"
      ]
    },
    {
      category: "Employment Protection & Benefits",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Written apprenticeship agreement within 2 months of starting",
        "Protection against unfair dismissal after 2 years continuous employment",
        "Statutory sick pay (SSP) after 4 consecutive days of illness",
        "Maternity/paternity leave and pay entitlements",
        "Right to join a trade union and participate in union activities",
        "Protection from discrimination based on age, gender, race, religion, etc.",
        "Reasonable adjustments for apprentices with disabilities",
        "Access to grievance and disciplinary procedures"
      ]
    },
    {
      category: "Financial Rights & Protections",
      icon: <Users className="h-5 w-5" />,
      items: [
        "Minimum wage protection (apprentice minimum wage applies for first year)",
        "Regular, predictable pay schedule (weekly/monthly as specified)",
        "Itemised payslips showing deductions and contributions",
        "No unlawful deductions from wages without written consent",
        "Travel expenses for training may be reimbursable (check contract)",
        "Tool allowances or provision of necessary equipment",
        "Protection from having to pay for training if you leave early",
        "Clear explanation of any training bond or repayment clauses"
      ]
    }
  ];

  const commonViolations = [
    {
      issue: "Being denied off-the-job training time",
      action: "Document missed training sessions and speak to your training provider"
    },
    {
      issue: "Working excessive hours without proper breaks",
      action: "Keep a record of hours worked and contact ACAS for advice"
    },
    {
      issue: "Not receiving proper supervision or mentoring",
      action: "Raise with HR/management and involve your training provider"
    },
    {
      issue: "Being treated as cheap labour rather than a learner",
      action: "Contact your apprenticeship provider and local authority"
    },
    {
      issue: "Pay below minimum wage rates",
      action: "Contact HMRC's National Minimum Wage team immediately"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Know Your Rights:</strong> These rights are protected by law. Understanding them helps ensure you receive fair treatment throughout your apprenticeship.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {rights.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/30 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Common Rights Violations & What to Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonViolations.map((violation, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">Issue: {violation.issue}</h4>
                <p className="text-sm text-orange-200">Action: {violation.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-500/50 bg-green-500/10">
        <Heart className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>Remember:</strong> Your apprenticeship should be a positive learning experience. If you're experiencing problems, don't suffer in silence - help is available and using it shows strength, not weakness.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ApprenticeRightsTab;
