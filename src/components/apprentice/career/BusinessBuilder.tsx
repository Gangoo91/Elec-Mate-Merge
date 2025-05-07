
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck } from "lucide-react";

const businessResources = [
  {
    id: 1,
    title: "Business Start-up Kit",
    description: "Templates and resources for establishing your electrical contracting business, including business plans and marketing strategies."
  },
  {
    id: 2,
    title: "Contractor Certification",
    description: "Information on becoming NICEIC, NAPIT, or ELECSA approved, essential for gaining customer trust."
  },
  {
    id: 3,
    title: "Accounting & Tax Guidance",
    description: "Financial management resources specifically for electrical contractors and small businesses."
  }
];

const BusinessBuilder = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Business Builder</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessResources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <FileCheck className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{resource.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessBuilder;
