
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Shield, Clock, PoundSterling, AlertTriangle, Calculator, Users, Book, CheckCircle } from "lucide-react";

const LegalRequirementsTab = () => {
  const legalRequirements = [
    {
      category: "Employment Law",
      icon: <FileText className="h-5 w-5" />,
      requirements: [
        "Written statement of employment terms within 2 months of start date",
        "Apprentice minimum wage compliance (£6.40/hour for first year)",
        "National minimum wage after first year (age-dependent rates apply)",
        "28 days annual leave including bank holidays (pro-rata for part-time)",
        "Employer liability insurance coverage (minimum £5 million)",
        "Health and safety training documentation and records",
        "Right to work documentation and verification",
        "Auto-enrolment pension scheme participation",
        "Statutory sick pay entitlements and procedures",
        "Maternity/paternity leave and pay provisions"
      ]
    },
    {
      category: "Training Requirements",
      icon: <Book className="h-5 w-5" />,
      requirements: [
        "20% off-the-job training (minimum 6 hours per week for full-time)",
        "Registered training provider agreement and contract",
        "Individual learning plan development and regular updates",
        "Skills development and assessment records maintenance",
        "End-point assessment arrangements with EPA organisation",
        "EPA organisation registration and compliance",
        "Progress reviews every 12 weeks minimum",
        "Training needs analysis and gap identification",
        "Functional skills support if required (English and Maths)",
        "CITB apprenticeship standards compliance"
      ]
    },
    {
      category: "Health & Safety",
      icon: <Shield className="h-5 w-5" />,
      requirements: [
        "Risk assessment for young workers under 18 years",
        "Construction skills certification scheme (CSCS) card provision",
        "Personal protective equipment provision and maintenance",
        "Safe working procedures training and documentation",
        "First aid training and emergency response procedures",
        "Accident reporting procedures (RIDDOR compliance)",
        "Manual handling training and assessment",
        "Working at height training and safety measures",
        "Electrical safety isolation procedures training",
        "Site-specific safety inductions and documentation"
      ]
    },
    {
      category: "Documentation & Records",
      icon: <CheckCircle className="h-5 w-5" />,
      requirements: [
        "Apprenticeship agreement (legally binding document)",
        "Training plan with clear learning objectives",
        "Regular progress review documentation",
        "Skills assessment and competency records",
        "Time tracking records for off-the-job training",
        "Health and safety training certificates",
        "Professional development activity logs",
        "Performance management documentation",
        "Disciplinary and grievance procedure records",
        "End-point assessment preparation evidence"
      ]
    }
  ];

  const payrollConsiderations = [
    { item: "Apprentice Minimum Wage", rate: "£6.40/hour", condition: "First year or under 19", additional: "Applies regardless of age in first year" },
    { item: "National Minimum Wage 18-20", rate: "£8.60/hour", condition: "After first year, aged 18-20", additional: "Must be paid from day 1 of second year" },
    { item: "National Minimum Wage 21+", rate: "£10.42/hour", condition: "After first year, aged 21+", additional: "Higher rate reflects experience and age" },
    { item: "Apprenticeship Levy", rate: "0.5% of payroll", condition: "If annual payroll >£3m", additional: "Offset against apprenticeship training costs" },
    { item: "Employer National Insurance", rate: "13.8%", condition: "On earnings >£175/week", additional: "Class 1 NI contributions required" },
    { item: "Auto-enrolment Pension", rate: "3% minimum", condition: "Employer contribution", additional: "Employee contributes 5% minimum total 8%" }
  ];

  const governmentIncentives = [
    { incentive: "16-18 Age Group Incentive", amount: "£3,000", description: "One-off payment for apprentices aged 16-18", eligibility: "New starts, paid after 90 days" },
    { incentive: "19-24 Age Group Incentive", amount: "£1,500", description: "Support for young adult apprentices", eligibility: "Applies to care leavers and EHCP holders" },
    { incentive: "Small Employer Support", amount: "100% funding", description: "Full funding for businesses with <50 employees", eligibility: "For apprentices aged 16-18" },
    { incentive: "Levy Transfer", amount: "Variable", description: "Large employers can transfer unused levy", eligibility: "Subject to availability and application" }
  ];

  const complianceTimeline = [
    { phase: "Pre-Employment", tasks: ["Right to work checks", "DBS checks if required", "Health questionnaire", "Educational qualifications verification"], timeframe: "2-4 weeks before start" },
    { phase: "Week 1", tasks: ["Employment contract signing", "Training provider registration", "Health and safety induction", "Emergency contact details"], timeframe: "First week of employment" },
    { phase: "Month 1", tasks: ["Individual learning plan creation", "First progress review", "Skills gap analysis", "Mentor assignment"], timeframe: "Within 30 days of start" },
    { phase: "Ongoing", tasks: ["12-weekly progress reviews", "Training record updates", "Skills assessments", "EPA preparation"], timeframe: "Throughout apprenticeship" }
  ];

  const legalPenalties = [
    { violation: "Minimum Wage Underpayment", penalty: "Up to £25,000 per worker", description: "Plus naming and shaming, and back-pay requirements" },
    { violation: "Training Requirements Breach", penalty: "Funding withdrawal", description: "Loss of government funding and potential recovery action" },
    { violation: "Health & Safety Violations", penalty: "Unlimited fines", description: "Plus potential imprisonment for serious breaches" },
    { violation: "Employment Law Breaches", penalty: "Up to £20,000", description: "Employment tribunal awards plus legal costs" }
  ];

  const regionalVariations = [
    { region: "England", levy: "0.5% of payroll over £3m", funding: "Co-investment rates vary by size", notes: "ESFA manages funding" },
    { region: "Scotland", levy: "Same as England", funding: "Skills Development Scotland", notes: "Additional Scottish funding available" },
    { region: "Wales", levy: "Same as England", funding: "Welsh Government support", notes: "Additional Welsh-specific incentives" },
    { region: "Northern Ireland", levy: "Same as England", funding: "Department for Economy", notes: "Separate apprenticeship system" }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-amber-500/30 bg-amber-500/10">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong>Critical:</strong> Legal requirements for apprentices are strictly enforced by multiple agencies including HMRC, Ofsted, and HSE. 
          Non-compliance can result in significant financial penalties, funding withdrawal, and reputational damage. 
          When in doubt, always seek professional legal and HR advice.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {legalRequirements.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="flex items-start gap-2 p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
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
            Detailed Payroll & Financial Obligations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollConsiderations.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{item.item}</h4>
                    <p className="text-sm text-muted-foreground">{item.condition}</p>
                  </div>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow font-semibold">
                    {item.rate}
                  </Badge>
                </div>
                <p className="text-xs text-blue-300 italic">{item.additional}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Government Incentives & Financial Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governmentIncentives.map((incentive, index) => (
              <div key={index} className="p-4 bg-green-500/5 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-300">{incentive.incentive}</h4>
                  <Badge className="bg-green-500/20 text-green-400">{incentive.amount}</Badge>
                </div>
                <p className="text-sm text-green-200 mb-2">{incentive.description}</p>
                <p className="text-xs text-green-300 italic">{incentive.eligibility}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Compliance Timeline & Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceTimeline.map((phase, index) => (
              <div key={index} className="border-l-2 border-blue-500/30 pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-blue-300">{phase.phase}</h4>
                  <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                    {phase.timeframe}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 text-sm text-blue-200">
                      <CheckCircle className="h-3 w-3 text-blue-400" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Legal Penalties & Enforcement Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {legalPenalties.map((penalty, index) => (
              <div key={index} className="p-4 bg-red-500/5 border border-red-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-300">{penalty.violation}</h4>
                  <Badge className="bg-red-500/20 text-red-400">{penalty.penalty}</Badge>
                </div>
                <p className="text-sm text-red-200">{penalty.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Regional Variations & Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalVariations.map((region, index) => (
              <div key={index} className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">{region.region}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-purple-200"><strong>Levy:</strong> {region.levy}</p>
                  <p className="text-purple-200"><strong>Funding:</strong> {region.funding}</p>
                  <p className="text-xs text-purple-300 italic">{region.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>Best Practice:</strong> Maintain a comprehensive compliance checklist and review it monthly. 
          Consider appointing a dedicated person responsible for apprenticeship compliance in larger organisations. 
          Regular internal audits can help identify and address issues before they become serious problems.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LegalRequirementsTab;
