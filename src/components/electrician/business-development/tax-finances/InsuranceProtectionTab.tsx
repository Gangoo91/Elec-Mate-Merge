
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Heart, Home } from "lucide-react";

const InsuranceProtectionTab = () => {
  const essentialInsurance = [
    {
      type: "Public Liability Insurance",
      icon: <Shield className="h-5 w-5" />,
      coverage: "£1-6 million typical",
      description: "Protects against claims for injury or property damage to third parties",
      required: "Essential",
      considerations: [
        "Most clients require minimum £2 million coverage",
        "Covers legal costs and compensation claims",
        "Essential for all electrical contractors",
        "Annual premiums typically £150-500"
      ]
    },
    {
      type: "Professional Indemnity Insurance",
      icon: <AlertTriangle className="h-5 w-5" />,
      coverage: "£250,000-2 million",
      description: "Covers claims arising from professional advice or negligent services",
      required: "Highly Recommended",
      considerations: [
        "Protects against design or specification errors",
        "Covers financial losses to clients",
        "Important for consultancy work",
        "Some contracts specifically require this cover"
      ]
    },
    {
      type: "Employer's Liability Insurance",
      icon: <Heart className="h-5 w-5" />,
      coverage: "£10 million minimum",
      description: "Legally required if you employ staff, even part-time",
      required: "Legal Requirement",
      considerations: [
        "Compulsory by law for employers",
        "Covers employee injury claims",
        "Includes apprentices and subcontractors",
        "Fines up to £2,500 per day without cover"
      ]
    },
    {
      type: "Tools & Equipment Insurance",
      icon: <Home className="h-5 w-5" />,
      coverage: "Based on tool value",
      description: "Covers theft, damage, or loss of tools and equipment",
      required: "Recommended",
      considerations: [
        "Covers tools in van, at home, or on-site",
        "Important for expensive test equipment",
        "Consider new-for-old replacement",
        "Some policies include temporary hire costs"
      ]
    }
  ];

  const additionalProtection = [
    {
      protection: "Income Protection Insurance",
      description: "Replaces income if unable to work due to illness or injury",
      benefits: [
        "Typically pays 50-70% of income",
        "Short-term and long-term options",
        "Tax-deductible premiums for business policies",
        "Essential for sole traders with no sick pay"
      ]
    },
    {
      protection: "Critical Illness Cover",
      description: "Lump sum payment upon diagnosis of specified serious illnesses",
      benefits: [
        "Covers major illnesses like cancer, heart attack, stroke",
        "Can pay off business debts or provide living expenses",
        "Separate from life insurance",
        "Premiums vary significantly by age and health"
      ]
    },
    {
      protection: "Business Interruption Insurance",
      description: "Compensates for lost income during business disruption",
      benefits: [
        "Covers loss of income during recovery",
        "Includes ongoing business expenses",
        "Important for natural disasters or major incidents",
        "Can include suppliers or key customer protection"
      ]
    },
    {
      protection: "Motor Insurance Enhancement",
      description: "Enhanced commercial vehicle cover beyond basic requirements",
      benefits: [
        "Goods in transit cover for materials",
        "Tool cover while in vehicle",
        "Business use classification essential",
        "Consider breakdown and recovery services"
      ]
    }
  ];

  const insuranceTips = [
    {
      tip: "Annual Review",
      description: "Review all policies annually to ensure adequate coverage and competitive pricing",
      priority: "High"
    },
    {
      tip: "Disclosure",
      description: "Always fully disclose your business activities to avoid policy voidance",
      priority: "Critical"
    },
    {
      tip: "Documentation",
      description: "Keep detailed records of all equipment and tools for insurance purposes",
      priority: "High"
    },
    {
      tip: "Claims History",
      description: "Maintain a clean claims history to keep premiums low",
      priority: "Medium"
    },
    {
      tip: "Bundle Policies",
      description: "Consider bundling multiple policies with one insurer for discounts",
      priority: "Medium"
    },
    {
      tip: "Read Policy Terms",
      description: "Understand exclusions and conditions to avoid claim disappointments",
      priority: "Critical"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2 text-lg md:text-xl">
            <Shield className="h-5 w-5" />
            Insurance & Protection Essentials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
            Proper insurance protection is crucial for electrical contractors. The right coverage protects 
            your business, personal finances, and provides peace of mind for you and your clients.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {essentialInsurance.map((insurance, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                  {insurance.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <CardTitle className="text-lg md:text-xl text-elec-yellow leading-tight">
                      {insurance.type}
                    </CardTitle>
                    <div className="flex flex-col md:items-end gap-1">
                      <Badge 
                        variant="outline" 
                        className={`border-elec-yellow/30 shrink-0 ${
                          insurance.required === 'Legal Requirement' ? 'text-red-400' :
                          insurance.required === 'Essential' ? 'text-orange-400' :
                          'text-green-400'
                        }`}
                      >
                        {insurance.required}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{insurance.coverage}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{insurance.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-white mb-2">Key Considerations</h4>
              <ul className="space-y-1">
                {insurance.considerations.map((consideration, considerationIndex) => (
                  <li key={considerationIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-elec-yellow mt-1 shrink-0">•</span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <Heart className="h-5 w-5" />
            Additional Protection Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {additionalProtection.map((protection, index) => (
              <div key={index} className="p-4 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-2">{protection.protection}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{protection.description}</p>
                <ul className="space-y-1">
                  {protection.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-green-400 mt-1 shrink-0">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 text-lg md:text-xl">Insurance Management Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {insuranceTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge 
                    variant="outline" 
                    className={`border-purple-500/30 shrink-0 ${
                      tip.priority === 'Critical' ? 'text-red-400' :
                      tip.priority === 'High' ? 'text-orange-400' :
                      'text-purple-400'
                    }`}
                  >
                    {tip.priority}
                  </Badge>
                  <h4 className="font-semibold text-white leading-tight">{tip.tip}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceProtectionTab;
