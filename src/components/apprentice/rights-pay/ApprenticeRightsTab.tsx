
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
        "Maximum 48-hour working week (averaged over 17 weeks) - you can opt out voluntarily in writing",
        "Minimum 20 days paid holiday plus 8 bank holidays (28 days total) - increases with service",
        "Rest breaks: 20 minutes if working over 6 hours continuously (paid break time)",
        "11 hours consecutive rest between working days (protected by law)",
        "24 hours consecutive rest in each 7-day period (usually includes one full weekend day)",
        "Night work restrictions (22:00-06:00) with mandatory health assessments for regular night workers",
        "Overtime pay rates must be clearly defined in your contract - cannot be below minimum wage",
        "Flexible working requests can be made after 26 weeks of employment",
        "Protection from excessive working hours that could affect your studies or wellbeing"
      ]
    },
    {
      category: "Training & Development Rights",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        "Minimum 20% off-the-job training (equivalent to 1 day per week) - this is legally protected time",
        "Access to structured learning programme aligned to your specific apprenticeship standard",
        "Regular progress reviews every 12 weeks with documented feedback and development planning",
        "Qualified mentor or supervisor support throughout your apprenticeship journey",
        "All training costs covered by employer (tuition fees, materials, assessments, EPA)",
        "Time off for college/training centre attendance without loss of pay",
        "Access to End Point Assessment when ready, fully funded by your employer",
        "Protection from being used as cheap labour - your role must provide genuine learning opportunities",
        "Right to additional support if you have learning difficulties or require reasonable adjustments",
        "Access to career guidance and progression planning discussions"
      ]
    },
    {
      category: "Health & Safety Protection",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "Safe working environment with comprehensive risk assessments completed before you start",
        "Mandatory health and safety induction training before beginning any work activities",
        "Personal protective equipment (PPE) provided free of charge and replaced when necessary",
        "Right to refuse unsafe work without penalty, discrimination, or loss of pay",
        "Access to first aid facilities and trained first aiders at all times during working hours",
        "Proper supervision when working with dangerous equipment, substances, or in hazardous areas",
        "Regular safety briefings, toolbox talks, and ongoing safety training updates",
        "Right to report safety concerns anonymously without fear of retaliation or victimisation",
        "Access to occupational health services if your work affects your health",
        "Right to safety representation through safety committees or union safety representatives"
      ]
    },
    {
      category: "Employment Protection & Benefits",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Written apprenticeship agreement within 2 months of starting (legally required document)",
        "Protection against unfair dismissal after 2 years continuous employment",
        "Statutory sick pay (SSP) after 4 consecutive days of illness (£109.40 per week in 2025)",
        "Maternity/paternity leave and pay entitlements (including shared parental leave options)",
        "Right to join a trade union and participate in union activities during working hours",
        "Protection from discrimination based on age, gender, race, religion, disability, sexual orientation",
        "Reasonable adjustments for apprentices with disabilities or health conditions",
        "Access to formal grievance and disciplinary procedures with right to representation",
        "Right to request flexible working arrangements after 26 weeks of employment",
        "Protection from victimisation for exercising your employment rights"
      ]
    },
    {
      category: "Financial Rights & Protections",
      icon: <Users className="h-5 w-5" />,
      items: [
        "Apprentice minimum wage £6.40/hour (2025) for under 19s or first year, then age-appropriate rates",
        "Regular, predictable pay schedule (weekly/monthly as specified in your contract)",
        "Detailed itemised payslips showing gross pay, deductions, tax, NI contributions, and net pay",
        "No unlawful deductions from wages without your written consent",
        "Reimbursement of reasonable travel expenses for off-site training (check your contract)",
        "Tool allowances or provision of necessary equipment and protective clothing",
        "Protection from having to pay back training costs if you leave through no fault of your own",
        "Clear explanation of any training bond or repayment clauses before you sign",
        "Right to National Insurance number and understanding of your tax obligations",
        "Access to pension auto-enrolment after 3 months if you meet the criteria"
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
    <div className="space-y-6 sm:space-y-8">
      <Alert className="border-elec-yellow/30 bg-elec-yellow/5 p-4 sm:p-6">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
          <AlertDescription className="text-white">
            <strong className="text-elec-yellow">Know Your Rights:</strong> These rights are protected by law. Understanding them helps ensure you receive fair treatment throughout your apprenticeship.
          </AlertDescription>
        </div>
      </Alert>

      <div className="grid gap-4 sm:gap-6">
        {rights.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-elec-yellow text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  {section.icon}
                </div>
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-white">
                    <span className="text-elec-yellow text-lg leading-none mt-0.5 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-400/30 bg-orange-500/10 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-orange-300 text-lg sm:text-xl font-semibold">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-400/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Common Rights Violations & What to Do
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-4">
            {commonViolations.map((violation, index) => (
              <li key={index} className="bg-orange-500/5 border border-orange-400/20 rounded-lg p-4 hover:bg-orange-500/10 transition-colors">
                <div className="flex gap-2 mb-2">
                  <span className="text-orange-300 text-sm font-medium flex-shrink-0">Issue:</span>
                  <span className="text-orange-200 text-sm font-medium">{violation.issue}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-300 text-sm font-medium flex-shrink-0">Action:</span>
                  <span className="text-white text-sm leading-relaxed font-light">{violation.action}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert className="border-green-400/30 bg-green-500/10 p-4 sm:p-6">
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
          <AlertDescription className="text-white">
            <strong className="text-green-400">Remember:</strong> Your apprenticeship should be a positive learning experience. If you're experiencing problems, don't suffer in silence - help is available and using it shows strength, not weakness.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default ApprenticeRightsTab;
