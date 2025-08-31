
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Clock, GraduationCap, FileText, Phone, AlertTriangle, Users, Heart, Scale, Building2, BookOpen, UserCheck, Gavel, HelpCircle } from "lucide-react";

const ApprenticeRightsTab = () => {
  const coreRights = [
    {
      category: "Working Time & Conditions",
      icon: <Clock className="h-5 w-5" />,
      color: "blue",
      items: [
        "Maximum 48-hour working week (averaged over 17 weeks) - you can opt out voluntarily",
        "Minimum 20 days paid holiday plus 8 bank holidays (28 days total)",
        "Rest breaks: 20 minutes if working over 6 hours continuously",
        "11 hours consecutive rest between working days",
        "24 hours consecutive rest in each 7-day period",
        "Night work restrictions (22:00-06:00) with health assessments if required",
        "Overtime pay rates should be clearly defined in your contract",
        "Right to flexible working requests after 26 weeks employment"
      ]
    },
    {
      category: "Training & Development Rights", 
      icon: <GraduationCap className="h-5 w-5" />,
      color: "green",
      items: [
        "Minimum 20% off-the-job training (equivalent to 1 day per week)",
        "Access to structured learning programme aligned to apprenticeship standard",
        "Regular progress reviews every 12 weeks with documented feedback",
        "Qualified mentor or supervisor support throughout apprenticeship",
        "Training costs covered by employer (tuition fees, materials, assessments)",
        "Time off for college/training centre attendance without loss of pay",
        "Access to End Point Assessment when ready, funded by employer",
        "Protection from being used as cheap labour - training must be genuine",
        "Right to continue learning if apprenticeship standard changes"
      ]
    },
    {
      category: "Health & Safety Protection",
      icon: <Shield className="h-5 w-5" />,
      color: "red",
      items: [
        "Safe working environment with proper risk assessments",
        "Comprehensive health and safety training before starting work",
        "Personal protective equipment (PPE) provided free of charge",
        "Right to refuse unsafe work without penalty or discrimination",
        "Access to first aid facilities and trained first aiders",
        "Proper supervision when working with dangerous equipment/substances",
        "Regular safety briefings and toolbox talks",
        "Right to report safety concerns without fear of retaliation",
        "Access to occupational health services if required"
      ]
    },
    {
      category: "Employment Protection & Benefits",
      icon: <FileText className="h-5 w-5" />,
      color: "purple",
      items: [
        "Written apprenticeship agreement within 2 months of starting",
        "Protection against unfair dismissal after 2 years continuous employment",
        "Statutory sick pay (SSP) after 4 consecutive days of illness",
        "Maternity/paternity leave and pay entitlements",
        "Right to join a trade union and participate in union activities",
        "Protection from discrimination based on age, gender, race, religion, etc.",
        "Reasonable adjustments for apprentices with disabilities",
        "Access to grievance and disciplinary procedures",
        "Right to be accompanied in disciplinary or grievance meetings"
      ]
    }
  ];

  const financialRights = [
    {
      title: "Minimum Wage Protection",
      description: "Apprentice minimum wage (£7.55/hour) applies for first year or if under 19. After that, normal minimum wage rates apply.",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Regular Pay Schedule", 
      description: "Employers must pay on time according to your contract (weekly/monthly). Late payment is a breach of contract.",
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: "Itemised Payslips",
      description: "You must receive detailed payslips showing gross pay, deductions, tax, NI contributions, and net pay.",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "No Unlawful Deductions",
      description: "Employers cannot deduct money from wages without written consent, except for tax, NI, and court orders.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      title: "Training Investment Protection",
      description: "Generally, you shouldn't have to repay training costs if you leave, unless there's a fair training bond clause.",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      title: "Equipment & Tools",
      description: "Essential tools and equipment should be provided. Any tool allowance or purchase requirements must be clearly stated.",
      icon: <Building2 className="h-4 w-4" />
    }
  ];

  const legalProtections = [
    {
      law: "Apprenticeships, Skills, Children and Learning Act 2009",
      protection: "Establishes apprenticeship frameworks and standards, ensuring quality training programmes.",
      keyPoints: ["Minimum training standards", "Apprenticeship agreement requirements", "Quality assurance frameworks"]
    },
    {
      law: "Employment Rights Act 1996",
      protection: "Provides core employment rights including working time, pay protection, and unfair dismissal.",
      keyPoints: ["Written terms of employment", "Protection against unfair dismissal", "Statutory notice periods"]
    },
    {
      law: "Working Time Regulations 1998",
      protection: "Limits working hours, ensures rest breaks, and guarantees paid annual leave.",
      keyPoints: ["48-hour maximum working week", "Minimum rest periods", "Paid holiday entitlement"]
    },
    {
      law: "Equality Act 2010",
      protection: "Protects against discrimination and requires reasonable adjustments for disabilities.",
      keyPoints: ["Protection from discrimination", "Reasonable adjustments", "Equal opportunities"]
    },
    {
      law: "Health and Safety at Work Act 1974",
      protection: "Ensures safe working conditions and proper training on health and safety matters.",
      keyPoints: ["Safe working environment", "Proper training", "Right to refuse unsafe work"]
    }
  ];

  const commonViolations = [
    {
      issue: "Being denied off-the-job training time",
      severity: "High",
      action: "Document missed training sessions and speak to your training provider immediately. Contact ESFA if unresolved.",
      legalBasis: "Apprenticeship funding and assessment rules require 20% off-the-job training."
    },
    {
      issue: "Working excessive hours without proper breaks",
      severity: "High", 
      action: "Keep detailed records of hours worked. Contact ACAS for free advice on working time violations.",
      legalBasis: "Working Time Regulations 1998 set maximum hours and minimum rest periods."
    },
    {
      issue: "Not receiving proper supervision or mentoring",
      severity: "Medium",
      action: "Raise with HR/management first, then involve your training provider and apprenticeship assessor.",
      legalBasis: "Apprenticeship standards require adequate supervision and support."
    },
    {
      issue: "Being treated as cheap labour rather than a learner",
      severity: "High",
      action: "Document tasks vs learning outcomes. Contact training provider and Education & Skills Funding Agency.",
      legalBasis: "Apprenticeships must provide genuine training, not just employment."
    },
    {
      issue: "Pay below minimum wage rates",
      severity: "Critical",
      action: "Contact HMRC's National Minimum Wage team immediately. They can recover unpaid wages.",
      legalBasis: "National Minimum Wage Act 1998 sets legal minimum rates."
    },
    {
      issue: "Discrimination or harassment",
      severity: "Critical",
      action: "Report to employer's HR. If unresolved, contact ACAS or consider Employment Tribunal claim.",
      legalBasis: "Equality Act 2010 protects against discrimination in the workplace."
    }
  ];

  const emergencyContacts = [
    {
      service: "ACAS (Advisory, Conciliation and Arbitration Service)",
      phone: "0300 123 1100",
      website: "www.acas.org.uk",
      purpose: "Free employment advice, dispute resolution, workplace rights guidance"
    },
    {
      service: "National Minimum Wage Helpline (HMRC)",
      phone: "0300 123 1222", 
      website: "www.gov.uk/minimum-wage-rates",
      purpose: "Report underpayment, get wage rates information, file complaints"
    },
    {
      service: "Health and Safety Executive (HSE)",
      phone: "0300 003 1647",
      website: "www.hse.gov.uk",
      purpose: "Report serious safety concerns, get health and safety advice"
    },
    {
      service: "Education & Skills Funding Agency",
      phone: "0370 267 0001",
      website: "www.gov.uk/government/organisations/education-and-skills-funding-agency",
      purpose: "Apprenticeship quality concerns, training provider issues"
    },
    {
      service: "Citizens Advice",
      phone: "0808 223 1133",
      website: "www.citizensadvice.org.uk", 
      purpose: "General advice on employment, benefits, legal rights"
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

      <Tabs defaultValue="core-rights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core-rights" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Core Rights
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            Legal Framework
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Get Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="core-rights" className="mt-6">
          <div className="grid gap-6">
            {coreRights.map((section, index) => (
              <Card key={index} className={`border-${section.color}-500/20 bg-${section.color}-500/5`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-${section.color}-400`}>
                    {section.icon}
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                        <Badge variant="outline" className={`mt-0.5 h-2 w-2 rounded-full p-0 border-${section.color}-500/50 bg-${section.color}-500/20 flex-shrink-0`} />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialRights.map((right, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-elec-yellow text-lg">
                    {right.icon}
                    {right.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{right.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <div className="space-y-6">
            {legalProtections.map((law, index) => (
              <Card key={index} className="border-purple-500/20 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Scale className="h-5 w-5" />
                    {law.law}
                  </CardTitle>
                  <p className="text-purple-300 text-sm">{law.protection}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {law.keyPoints.map((point, pointIndex) => (
                      <Badge key={pointIndex} variant="outline" className="border-purple-500/30 text-purple-300">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="help" className="mt-6">
          <div className="space-y-6">
            <Card className="border-orange-500/30 bg-orange-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="h-5 w-5" />
                  Common Rights Violations & How to Respond
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonViolations.map((violation, index) => (
                    <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-orange-300">{violation.issue}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            violation.severity === 'Critical' ? 'border-red-500 text-red-400' :
                            violation.severity === 'High' ? 'border-orange-500 text-orange-400' :
                            'border-yellow-500 text-yellow-400'
                          }`}
                        >
                          {violation.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-200 mb-2">{violation.action}</p>
                      <p className="text-xs text-orange-100 italic">{violation.legalBasis}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts & Support Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-medium text-green-300 mb-1">{contact.service}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-green-200">📞 {contact.phone}</p>
                        <p className="text-green-200">🌐 {contact.website}</p>
                        <p className="text-xs text-green-100 mt-2">{contact.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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
