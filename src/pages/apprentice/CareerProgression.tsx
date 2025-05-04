
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft, Award, BriefcaseBusiness, TrendingUp } from "lucide-react";

const CareerProgression = () => {
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
      icon: <BriefcaseBusiness className="h-8 w-8 text-elec-yellow" />
    },
    {
      id: 3,
      title: "Specialist Contractor",
      requirements: "Journey-level experience + business license",
      description: "Start your own electrical contracting business focusing on residential, commercial, or industrial work.",
      icon: <TrendingUp className="h-8 w-8 text-elec-yellow" />
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "18th Edition BS7671 Wiring Regulations",
      level: "Mandatory",
      description: "Essential qualification for all practicing electricians in the UK"
    },
    {
      id: 2,
      title: "Level 3 NVQ Diploma in Electrotechnical Services",
      level: "Advanced",
      description: "Industry-recognized qualification for electricians"
    },
    {
      id: 3,
      title: "Inspection and Testing Certification",
      level: "Specialist",
      description: "Required for testing electrical installations"
    },
    {
      id: 4,
      title: "EV Charger Installation",
      level: "Specialist",
      description: "Certification for installing electric vehicle charging points"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
            Career Progression
          </h1>
          <p className="text-muted-foreground">
            Resources and guidance for advancing your electrical career
          </p>
        </div>
        <Link to="/electrical-hub">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
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

        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded ${
                      cert.level === "Mandatory" 
                        ? "bg-red-500/20 text-red-500" 
                        : cert.level === "Advanced" 
                        ? "bg-blue-500/20 text-blue-500" 
                        : "bg-green-500/20 text-green-500"
                    }`}>
                      {cert.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="border p-6 rounded-lg bg-elec-gray border-elec-yellow/20">
          <h2 className="text-xl font-medium mb-4">Professional Development Resources</h2>
          <p className="mb-4">
            Continuing professional development (CPD) is essential for electricians who want to stay 
            current with industry trends, regulations, and new technologies.
          </p>
          <div className="space-y-4">
            <div className="bg-elec-yellow/10 p-4 rounded-md">
              <h3 className="font-medium text-elec-yellow">Industry Associations</h3>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li>National Inspection Council for Electrical Installation Contracting (NICEIC)</li>
                <li>Electrical Contractors' Association (ECA)</li>
                <li>Joint Industry Board (JIB)</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-md">
              <h3 className="font-medium text-elec-yellow">Further Education</h3>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li>HNC/HND in Electrical Engineering</li>
                <li>Foundation Degree in Electrical Systems</li>
                <li>BSc in Electrical Engineering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerProgression;
