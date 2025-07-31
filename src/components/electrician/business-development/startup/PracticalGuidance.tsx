import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Shield,
  PoundSterling,
  Users,
  Wrench,
  FileText
} from "lucide-react";

const PracticalGuidance = () => {
  const practicalGuides = [
    {
      title: "Legal Business Setup",
      icon: <FileText className="h-6 w-6" />,
      category: "Legal",
      difficulty: "Medium"
    },
    {
      title: "Electrical Certifications", 
      icon: <Shield className="h-6 w-6" />,
      category: "Qualifications",
      difficulty: "High"
    },
    {
      title: "Financial Management",
      icon: <PoundSterling className="h-6 w-6" />,
      category: "Finance", 
      difficulty: "Medium"
    },
    {
      title: "Customer Acquisition",
      icon: <Users className="h-6 w-6" />,
      category: "Marketing",
      difficulty: "Medium"
    },
    {
      title: "Operational Systems",
      icon: <Wrench className="h-6 w-6" />,
      category: "Operations",
      difficulty: "Medium"
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
        <div className="grid grid-cols-1 gap-3">
          {practicalGuides.map((guide, index) => (
            <Card 
              key={index}
              className={`${categoryColors[guide.category as keyof typeof categoryColors]} p-4`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="flex justify-center">
                  {guide.icon}
                </div>
                <h3 className="font-semibold text-sm leading-tight">
                  {guide.title}
                </h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}
                >
                  {guide.difficulty}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticalGuidance;