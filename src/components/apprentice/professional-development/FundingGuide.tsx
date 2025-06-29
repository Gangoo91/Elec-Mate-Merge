
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Building, 
  CreditCard, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";

const FundingGuide = () => {
  const fundingOptions = [
    {
      title: "Advanced Learner Loan",
      icon: CreditCard,
      eligibility: "Level 3-6 qualifications",
      description: "Government loan to cover course fees. No upfront payment required.",
      benefits: [
        "No credit checks required",
        "No repayment until earning £25,000+",
        "9% of income above threshold",
        "Loan written off after 30 years"
      ],
      howToApply: "Apply through Student Finance England when enrolling on your course",
      contactInfo: {
        phone: "0300 100 0607",
        website: "gov.uk/advanced-learner-loan"
      }
    },
    {
      title: "Employer Sponsorship",
      icon: Building,
      eligibility: "Employed apprentices/workers",
      description: "Many employers fund education that benefits their business operations.",
      benefits: [
        "Full or partial fee coverage",
        "Potential study time allowance",
        "Career advancement opportunities",
        "No personal financial burden"
      ],
      howToApply: "Speak with your line manager, HR department, or training coordinator",
      tips: [
        "Highlight business benefits",
        "Propose a skills development plan",
        "Consider a learning agreement"
      ]
    },
    {
      title: "Professional Body Grants",
      icon: GraduationCap,
      eligibility: "IET, ECA, NICEIC members",
      description: "Grants and scholarships from electrical industry professional bodies.",
      benefits: [
        "Merit-based awards",
        "Industry-specific funding",
        "Networking opportunities",
        "Professional recognition"
      ],
      providers: [
        { name: "IET", description: "Institution of Engineering and Technology grants" },
        { name: "ECA", description: "Electrical Contractors' Association bursaries" },
        { name: "City & Guilds", description: "Educational foundation grants" }
      ]
    }
  ];

  const studyModes = [
    {
      mode: "Part-time Evening/Weekend",
      cost: "Lower fees, spread over longer period",
      timeCommitment: "6-12 hours per week",
      benefits: ["Continue working", "Steady income", "Practical application"]
    },
    {
      mode: "Online/Distance Learning",
      cost: "Often 20-40% cheaper than classroom",
      timeCommitment: "Flexible, self-paced",
      benefits: ["No travel costs", "Study from home", "Work around job schedule"]
    },
    {
      mode: "Block Release",
      cost: "Intensive courses, fewer travel days",
      timeCommitment: "1-2 weeks full-time blocks",
      benefits: ["Focused learning", "Networking", "Employer support"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Funding Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comprehensive Funding Options</h3>
        <div className="space-y-4">
          {fundingOptions.map((option, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-elec-yellow/10">
                      <option.icon className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {option.eligibility}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{option.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-elec-yellow mb-2">Key Benefits:</h4>
                  <ul className="text-xs space-y-1">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-elec-yellow mb-2">How to Apply:</h4>
                  <p className="text-xs text-muted-foreground">{option.howToApply}</p>
                </div>

                {option.tips && (
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Tips for Success:</h4>
                    <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                      {option.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {option.providers && (
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Grant Providers:</h4>
                    <div className="space-y-2">
                      {option.providers.map((provider, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-medium">{provider.name}:</span>
                          <span className="text-muted-foreground ml-1">{provider.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {option.contactInfo && (
                  <div className="border-t border-elec-yellow/10 pt-3">
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Contact Information:</h4>
                    <div className="flex items-center gap-4 text-xs">
                      {option.contactInfo.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{option.contactInfo.phone}</span>
                        </div>
                      )}
                      {option.contactInfo.website && (
                        <div className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>{option.contactInfo.website}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Modes and Cost Considerations */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Study Modes & Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studyModes.map((mode, index) => (
              <div key={index} className="space-y-3 p-3 bg-elec-dark/30 rounded-md">
                <h4 className="font-medium text-elec-yellow">{mode.mode}</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Cost: </span>
                    <span>{mode.cost}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time: </span>
                    <span>{mode.timeCommitment}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Benefits:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {mode.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Steps */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400">Next Steps to Secure Funding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium">Research Your Options</p>
                <p className="text-xs text-muted-foreground">Use our calculator to understand funding requirements for your chosen course</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium">Speak to Your Employer</p>
                <p className="text-xs text-muted-foreground">Schedule a meeting to discuss potential employer funding and support</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium">Apply for Loans/Grants</p>
                <p className="text-xs text-muted-foreground">Submit applications early - funding approval can take 4-6 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
              <div>
                <p className="font-medium">Enrol on Your Course</p>
                <p className="text-xs text-muted-foreground">Complete enrollment with your chosen provider and confirm funding arrangements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingGuide;
