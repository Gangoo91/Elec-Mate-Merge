
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Building, PenTool, Calculator, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessResources = [
  {
    id: 1,
    title: "Business Start-up Kit",
    description: "Templates and resources for establishing your electrical contracting business, including business plans and marketing strategies.",
    contents: [
      "Business plan template", 
      "Market research guide", 
      "Brand development workbook",
      "Business registration checklist"
    ],
    icon: <Briefcase className="h-6 w-6 text-elec-yellow" />
  },
  {
    id: 2,
    title: "Contractor Certification",
    description: "Information on becoming NICEIC, NAPIT, or ELECSA approved, essential for gaining customer trust.",
    contents: [
      "Certification requirements guide", 
      "Application process walkthrough", 
      "Assessment preparation tips",
      "First-year compliance checklist"
    ],
    icon: <FileCheck className="h-6 w-6 text-elec-yellow" />
  },
  {
    id: 3,
    title: "Accounting & Tax Guidance",
    description: "Financial management resources specifically for electrical contractors and small businesses.",
    contents: [
      "Tax obligations overview", 
      "Bookkeeping templates", 
      "Expense tracking systems",
      "VAT registration guide"
    ],
    icon: <Calculator className="h-6 w-6 text-elec-yellow" />
  }
];

const businessSteps = [
  {
    id: 1,
    title: "Business Structure Setup",
    description: "Choose between sole trader, partnership, or limited company structures, each with different legal and tax implications.",
    timeline: "Month 1-2",
    keyTasks: [
      "Register with HMRC",
      "Set up business banking",
      "Arrange business insurance",
      "Register for VAT (if applicable)"
    ]
  },
  {
    id: 2,
    title: "Certification & Compliance",
    description: "Ensure you have all necessary certifications to operate legally and build trust with customers.",
    timeline: "Month 2-4",
    keyTasks: [
      "Apply for competent person scheme membership",
      "Prepare for assessment visits",
      "Set up notification processes for building control",
      "Establish health and safety policies"
    ]
  },
  {
    id: 3,
    title: "Marketing & Client Acquisition",
    description: "Develop your brand and marketing strategy to attract your first clients.",
    timeline: "Month 3-6",
    keyTasks: [
      "Create business website and social profiles",
      "Design business cards and brochures",
      "Establish relationships with builders and other trades",
      "Set up online business listings"
    ]
  }
];

const BusinessBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Business Builder</h2>
        <p className="text-muted-foreground">
          Starting your own electrical business can be a rewarding career path. Below are essential resources and guidance 
          to help you establish and grow a successful electrical contracting business in the UK market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessResources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                {resource.icon}
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-1 flex flex-col flex-grow">
              <p className="text-sm mb-4">{resource.description}</p>
              
              <div className="mt-auto space-y-3">
                <div>
                  <h4 className="text-xs text-elec-yellow mb-1.5">What's Included:</h4>
                  <ul className="text-xs space-y-1.5">
                    {resource.contents.map((content, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-3 border-elec-yellow/30 hover:border-elec-yellow text-xs"
                >
                  Access Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4 pt-2">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <PenTool className="h-5 w-5 text-elec-yellow" />
          <span>Business Establishment Roadmap</span>
        </h3>
        
        <div className="space-y-4">
          {businessSteps.map((step, index) => (
            <Card key={step.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-medium text-lg">{step.title}</h4>
                      <span className="text-xs bg-elec-dark/60 px-3 py-1 rounded-full text-elec-yellow">
                        {step.timeline}
                      </span>
                    </div>
                    
                    <p className="text-sm">{step.description}</p>
                    
                    <div className="pt-2">
                      <h5 className="text-xs text-elec-yellow mb-1.5">Key Tasks:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {step.keyTasks.map((task, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <FileText className="h-3 w-3 text-elec-yellow" />
                            <span className="text-xs">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <Building className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Business Success Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Invest in good accounting software from the start to keep finances organised</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Build relationships with suppliers to negotiate better prices on materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider specialising in a niche area like renewable energy or smart home systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Collect and showcase customer testimonials to build credibility in your local market</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessBuilder;
