
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileCheck, Calculator } from "lucide-react";
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

const BusinessResources = () => {
  return (
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
  );
};

export default BusinessResources;
