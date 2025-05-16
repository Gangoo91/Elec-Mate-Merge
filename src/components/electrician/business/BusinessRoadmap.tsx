
import { Card, CardContent } from "@/components/ui/card";
import { FileText, PenTool } from "lucide-react";

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

const BusinessRoadmap = () => {
  return (
    <div className="space-y-4">
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
  );
};

export default BusinessRoadmap;
