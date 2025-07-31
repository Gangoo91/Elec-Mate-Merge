import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { 
  BookOpen, 
  Shield,
  PoundSterling,
  Users,
  Wrench,
  FileText,
  CheckCircle
} from "lucide-react";

const PracticalGuidance = () => {
  const practicalGuides = [
    {
      title: "Legal Business Setup",
      icon: <FileText className="h-6 w-6" />,
      category: "Legal",
      difficulty: "Medium",
      steps: [
        "Choose business structure (Sole Trader vs Limited Company)",
        "Register with HMRC for self-assessment",
        "Set up business bank account",
        "Arrange professional indemnity insurance",
        "Register for VAT if turnover exceeds £85,000",
        "Consider trade body membership (NICEIC, NAPIT, etc.)"
      ],
      keyPoints: [
        "Sole traders have simpler paperwork but unlimited liability",
        "Limited companies offer protection but require more admin",
        "Insurance is essential - minimum £1m public liability",
        "Keep detailed records from day one for tax purposes"
      ]
    },
    {
      title: "Electrical Certifications", 
      icon: <Shield className="h-6 w-6" />,
      category: "Qualifications",
      difficulty: "High",
      steps: [
        "Complete 18th Edition IET Wiring Regulations",
        "Obtain PAT Testing certification",
        "Complete Inspection & Testing (2391-52)",
        "Apply for Part P competent person scheme",
        "Join approved contractor scheme (NICEIC/NAPIT)",
        "Consider additional qualifications (EV charging, renewables)"
      ],
      keyPoints: [
        "18th Edition is mandatory - updated every 3-5 years",
        "Part P registration allows self-certification of work",
        "Scheme membership provides credibility and support",
        "Continuous professional development is required"
      ]
    },
    {
      title: "Financial Management",
      icon: <PoundSterling className="h-6 w-6" />,
      category: "Finance", 
      difficulty: "Medium",
      steps: [
        "Set up accounting software (Xero, QuickBooks, FreeAgent)",
        "Create pricing structure and rate cards",
        "Establish payment terms and invoicing process",
        "Set aside funds for tax obligations (30-40%)",
        "Create business budget and cash flow projections",
        "Find reliable accountant familiar with trades"
      ],
      keyPoints: [
        "Price your time at what you believe it's worth",
        "Factor in all costs: materials, travel, insurance, taxes",
        "Always get deposits for larger jobs",
        "Separate business and personal finances completely"
      ]
    },
    {
      title: "Customer Acquisition",
      icon: <Users className="h-6 w-6" />,
      category: "Marketing",
      difficulty: "Medium",
      steps: [
        "Create professional website with portfolio",
        "Set up Google My Business listing",
        "Join trade directories (Checkatrade, Rated People)",
        "Build social media presence (Facebook, Instagram)",
        "Develop referral system for existing customers",
        "Network with local builders and tradespeople"
      ],
      keyPoints: [
        "Word-of-mouth is the most valuable marketing",
        "Online reviews are crucial for credibility",
        "Professional appearance and uniform matter",
        "Always follow up on quotes and completed work"
      ]
    },
    {
      title: "Operational Systems",
      icon: <Wrench className="h-6 w-6" />,
      category: "Operations",
      difficulty: "Medium",
      steps: [
        "Invest in quality testing equipment and tools",
        "Create job scheduling and calendar system",
        "Develop standard operating procedures",
        "Set up supplier accounts for materials",
        "Create digital forms for certificates and invoices",
        "Establish health & safety protocols"
      ],
      keyPoints: [
        "Quality tools save time and increase safety",
        "Good organisation prevents costly mistakes",
        "Digital systems improve efficiency and professionalism",
        "Always carry adequate stock for common jobs"
      ]
    }
  ];

  const categoryColors = {
    Legal: "border-red-500/50 bg-red-500/10 text-red-300",
    Qualifications: "border-blue-500/50 bg-blue-500/10 text-blue-300", 
    Finance: "border-green-500/50 bg-green-500/10 text-green-300",
    Marketing: "border-purple-500/50 bg-purple-500/10 text-purple-300",
    Operations: "border-orange-500/50 bg-orange-500/10 text-orange-300"
  };

  const difficultyColors = {
    Medium: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    High: "bg-red-500/20 text-red-300 border-red-400/30"
  };

  return (
    <Card className="border-indigo-500/50 bg-indigo-500/10">
      <CardHeader className="text-center">
        <CardTitle className="text-indigo-300 flex items-center justify-center gap-2 text-lg">
          <BookOpen className="h-5 w-5" />
          Step-by-Step Implementation Guides
        </CardTitle>
        <p className="text-indigo-200 text-sm">
          Essential guides for starting your electrical business
        </p>
      </CardHeader>
      <CardContent className="px-4">
        <MobileAccordion type="single" collapsible className="space-y-2">
          {practicalGuides.map((guide, index) => (
            <MobileAccordionItem key={index} value={`guide-${index}`}>
              <MobileAccordionTrigger 
                icon={
                  <div className="flex justify-center">
                    {guide.icon}
                  </div>
                }
                className={`${categoryColors[guide.category as keyof typeof categoryColors]}`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-sm">{guide.title}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs mt-1 ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}
                  >
                    {guide.difficulty}
                  </Badge>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Implementation Steps:
                    </h4>
                    <ol className="space-y-1">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <h4 className="font-semibold text-sm text-primary mb-2">Key Points to Remember:</h4>
                    <ul className="space-y-1">
                      {guide.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          ))}
        </MobileAccordion>
      </CardContent>
    </Card>
  );
};

export default PracticalGuidance;