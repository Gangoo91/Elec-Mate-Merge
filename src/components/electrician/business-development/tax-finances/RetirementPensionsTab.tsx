
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, TrendingUp, Calculator, Users } from "lucide-react";

const RetirementPensionsTab = () => {
  const pensionOptions = [
    {
      type: "Self-Invested Personal Pension (SIPP)",
      icon: <PiggyBank className="h-5 w-5" />,
      suitability: "All business structures",
      description: "Flexible pension with wide investment choices and full control",
      advantages: [
        "Wide range of investment options",
        "Full control over investment decisions",
        "Can accept transfers from other pensions",
        "Tax relief on contributions up to annual allowance",
        "Potential for higher returns with active management"
      ],
      considerations: [
        "Requires investment knowledge or advice",
        "Higher fees than basic personal pensions",
        "Investment risk lies with you",
        "Annual management charges apply"
      ],
      taxRelief: "20%, 40%, or 45% depending on income tax rate"
    },
    {
      type: "Stakeholder Pension",
      icon: <Users className="h-5 w-5" />,
      suitability: "Lower earners, basic needs",
      description: "Simple, low-cost pension with capped charges",
      advantages: [
        "Low charges (capped at 1.5% for first 10 years)",
        "Simple to understand and manage",
        "Minimum contributions from £20",
        "Flexible payment schedules",
        "Basic tax relief automatically applied"
      ],
      considerations: [
        "Limited investment choices",
        "May not be suitable for higher earners",
        "Less flexibility than SIPP",
        "Lower potential returns"
      ],
      taxRelief: "Basic rate relief automatically added"
    },
    {
      type: "Company Pension Scheme",
      icon: <Calculator className="h-5 w-5" />,
      suitability: "Limited company directors/employees",
      description: "Employer-sponsored scheme with potential contributions from company",
      advantages: [
        "Employer contributions don't count towards annual allowance",
        "Corporation tax relief for company",
        "Potential for matching contributions",
        "Auto-enrolment compliance if applicable",
        "Additional protection under pension schemes"
      ],
      considerations: [
        "Only available to company employees",
        "Scheme setup and administration costs",
        "Ongoing compliance requirements",
        "May be complex for small companies"
      ],
      taxRelief: "Corporation tax relief plus personal tax relief"
    }
  ];

  const planningStrategies = [
    {
      strategy: "Annual Allowance Planning",
      description: "Maximise tax-efficient contributions within annual limits",
      tips: [
        "2024/25 annual allowance: £60,000 (reduced for high earners)",
        "Use carry forward rules for unused allowances from previous 3 years",
        "Consider timing of contributions around year-end",
        "Monitor tapered annual allowance if earning over £200,000"
      ]
    },
    {
      strategy: "Age-Based Contribution Planning",
      description: "Adjust contribution levels based on age and circumstances",
      tips: [
        "20s-30s: Focus on consistent, modest contributions",
        "40s: Increase contributions as earnings typically peak",
        "50s: Maximum contributions to catch up on shortfall",
        "60+: Consider drawdown and tax-efficient withdrawal strategies"
      ]
    },
    {
      strategy: "Business Structure Optimisation",
      description: "Choose pension approach based on business structure",
      tips: [
        "Sole traders: Personal pensions with full contribution flexibility",
        "Limited companies: Mix of employer and employee contributions",
        "Consider splitting contributions between personal and company schemes",
        "Use company contributions for Corporation Tax relief"
      ]
    },
    {
      strategy: "Investment Diversification",
      description: "Spread risk across different asset classes and time horizons",
      tips: [
        "Early career: Higher risk/reward growth investments",
        "Mid-career: Balanced portfolio with growth and stability",
        "Pre-retirement: Gradual shift to lower-risk investments",
        "Consider ethical/ESG investment options"
      ]
    }
  ];

  const retirementMilestones = [
    {
      age: "55+",
      milestone: "Pension Access Age",
      description: "Earliest age to access private pension benefits",
      actions: [
        "Can take 25% as tax-free lump sum",
        "Remaining 75% subject to income tax",
        "Consider phased retirement options",
        "Review State Pension forecast"
      ]
    },
    {
      age: "State Pension Age",
      milestone: "State Pension Entitlement",
      description: "Currently 66, rising to 67 by 2028",
      actions: [
        "Check National Insurance contribution record",
        "Consider voluntary contributions if gaps exist",
        "Plan integration with private pension income",
        "Review claiming strategy for maximum benefit"
      ]
    },
    {
      age: "75",
      milestone: "Pension Review Requirements",
      description: "Regulatory requirements for pension drawdown",
      actions: [
        "Mandatory annual reviews for some products",
        "Consider annuity vs drawdown options",
        "Review beneficiary nominations",
        "Plan for inheritance tax implications"
      ]
    }
  ];

  const keyNumbers = [
    {
      figure: "£60,000",
      description: "Annual allowance for pension contributions (2024/25)",
      note: "Reduced for high earners above £200,000"
    },
    {
      figure: "£1,073,100",
      description: "Lifetime allowance abolished from April 2024",
      note: "Replaced with new allowances and recycling rules"
    },
    {
      figure: "25%",
      description: "Maximum tax-free lump sum from pension",
      note: "Subject to new lump sum allowances from April 2024"
    },
    {
      figure: "£11,502",
      description: "Full new State Pension (2024/25)",
      note: "Requires 35+ years of National Insurance contributions"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2 text-lg md:text-xl">
            <PiggyBank className="h-5 w-5" />
            Retirement & Pension Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
            Building a secure retirement requires early planning and regular contributions. As a self-employed 
            electrician, you have excellent pension options with substantial tax advantages.
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <Calculator className="h-5 w-5" />
            Key Figures for 2024/25
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyNumbers.map((item, index) => (
              <div key={index} className="p-4 border border-green-500/30 rounded-lg">
                <div className="text-2xl font-bold text-green-200 mb-1">{item.figure}</div>
                <div className="text-sm font-medium text-white mb-1">{item.description}</div>
                <div className="text-xs text-muted-foreground">{item.note}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {pensionOptions.map((option, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <CardTitle className="text-lg md:text-xl text-elec-yellow leading-tight">
                      {option.type}
                    </CardTitle>
                    <Badge variant="outline" className="border-elec-yellow/30 shrink-0">
                      {option.suitability}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{option.description}</p>
                  <div className="text-xs text-green-400">Tax Relief: {option.taxRelief}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {option.advantages.map((advantage, advantageIndex) => (
                      <li key={advantageIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-green-400 mt-1 shrink-0">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Considerations</h4>
                  <ul className="space-y-1">
                    {option.considerations.map((consideration, considerationIndex) => (
                      <li key={considerationIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-orange-400 mt-1 shrink-0">•</span>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2 text-lg md:text-xl">
            <TrendingUp className="h-5 w-5" />
            Planning Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {planningStrategies.map((strategy, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">{strategy.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{strategy.description}</p>
                <ul className="space-y-1">
                  {strategy.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-purple-400 mt-1 shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2 text-lg md:text-xl">
            <Users className="h-5 w-5" />
            Retirement Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {retirementMilestones.map((milestone, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Badge variant="outline" className="border-orange-500/50 text-orange-200 shrink-0">
                    {milestone.age}
                  </Badge>
                  <div>
                    <h4 className="font-semibold text-orange-200">{milestone.milestone}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                <div className="pl-6">
                  <h5 className="font-medium text-white mb-2">Key Actions:</h5>
                  <ul className="space-y-1">
                    {milestone.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-orange-400 mt-1 shrink-0">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetirementPensionsTab;
