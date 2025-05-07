
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Building, TrendingUp, Trophy, GraduationCap } from "lucide-react";

const careerPaths = [
  {
    id: 1,
    title: "Electrical Engineer",
    requirements: "Degree in Electrical Engineering + professional experience",
    description: "Design, develop and test electrical equipment and systems for buildings, transportation, or power generation.",
    icon: <Award className="h-8 w-8 text-elec-yellow" />,
    skills: ["Circuit design", "Power systems", "Project management", "Technical documentation"],
    salaryRange: "£30,000 - £60,000",
    timeToAchieve: "5-7 years (including education)"
  },
  {
    id: 2,
    title: "Master Electrician",
    requirements: "Journey-level experience + advanced certification",
    description: "Lead complex installations, manage teams of electricians, and take on supervisory responsibilities.",
    icon: <Briefcase className="h-8 w-8 text-elec-yellow" />,
    skills: ["Advanced installations", "Team management", "Problem solving", "Regulatory knowledge"],
    salaryRange: "£35,000 - £50,000",
    timeToAchieve: "4-6 years"
  },
  {
    id: 3,
    title: "Specialist Contractor",
    requirements: "Journey-level experience + business licence",
    description: "Start your own electrical contracting business focusing on residential, commercial, or industrial work.",
    icon: <Building className="h-8 w-8 text-elec-yellow" />,
    skills: ["Business management", "Customer relations", "Estimation", "Financial planning"],
    salaryRange: "Variable (£40,000 - £100,000+)",
    timeToAchieve: "5+ years"
  },
  {
    id: 4,
    title: "Electrical Inspector",
    requirements: "Advanced certification + extensive field experience",
    description: "Ensure electrical installations comply with regulations and safety standards, working with local authorities.",
    icon: <TrendingUp className="h-8 w-8 text-elec-yellow" />,
    skills: ["Regulatory expertise", "Attention to detail", "Documentation", "Communication"],
    salaryRange: "£38,000 - £55,000",
    timeToAchieve: "6-8 years"
  },
  {
    id: 5,
    title: "Project Manager",
    requirements: "Extensive electrical experience + management qualifications",
    description: "Oversee large-scale electrical projects, coordinate teams, and manage budgets and timelines.",
    icon: <Trophy className="h-8 w-8 text-elec-yellow" />,
    skills: ["Leadership", "Budgeting", "Scheduling", "Stakeholder management"],
    salaryRange: "£45,000 - £70,000",
    timeToAchieve: "7-10 years"
  }
];

const CareerPathways = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Pathways</h2>
        <p className="text-muted-foreground">
          The electrical industry offers diverse career paths with opportunities for advancement based on your interests, skills, and goals. 
          Below are key pathways you can explore as you progress in your electrical career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <Card key={path.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              {path.icon}
              <div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <p className="text-sm text-amber-400">{path.requirements}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-2 flex-grow flex flex-col gap-4">
              <p className="text-sm">{path.description}</p>
              
              <div className="space-y-3 mt-auto">
                <div>
                  <h4 className="text-sm font-medium text-elec-yellow">Key Skills:</h4>
                  <ul className="text-xs grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                    {path.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-elec-yellow/10 pt-3">
                  <div>
                    <p className="text-elec-yellow/80">Salary Range:</p>
                    <p>{path.salaryRange}</p>
                  </div>
                  <div>
                    <p className="text-elec-yellow/80">Time to Achieve:</p>
                    <p>{path.timeToAchieve}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <GraduationCap className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Career Advancement Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Continuously update your skills through courses and certifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Join professional organisations like the IET or ECA to network with others in the field</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider specialising in growth areas like renewable energy or smart building systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Document your work and build a portfolio showcasing your most impressive projects</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareerPathways;
