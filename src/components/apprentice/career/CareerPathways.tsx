
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Building } from "lucide-react";

const careerPaths = [
  {
    id: 1,
    title: "Electrical Engineer",
    requirements: "Degree in Electrical Engineering + professional experience",
    description: "Design, develop and test electrical equipment and systems for buildings, transportation, or power generation.",
    icon: <Award className="h-8 w-8 text-elec-yellow" />
  },
  {
    id: 2,
    title: "Master Electrician",
    requirements: "Journey-level experience + advanced certification",
    description: "Lead complex installations, manage teams of electricians, and take on supervisory responsibilities.",
    icon: <Briefcase className="h-8 w-8 text-elec-yellow" />
  },
  {
    id: 3,
    title: "Specialist Contractor",
    requirements: "Journey-level experience + business licence",
    description: "Start your own electrical contracting business focusing on residential, commercial, or industrial work.",
    icon: <Building className="h-8 w-8 text-elec-yellow" />
  }
];

const CareerPathways = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Career Pathways</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <Card key={path.id} className="border-elec-yellow/20 bg-elec-gray h-full">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              {path.icon}
              <div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <p className="text-sm text-amber-400">{path.requirements}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{path.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerPathways;
