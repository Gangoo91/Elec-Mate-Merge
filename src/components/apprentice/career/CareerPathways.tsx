
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Building, TrendingUp, Trophy, GraduationCap, ShieldCheck, Hammer, Zap } from "lucide-react";

const careerPaths = [
  {
    id: 1,
    title: "Approved Electrician",
    requirements: "Level 3 qualification + 2 years post-qualification experience + AM2 assessment",
    description: "An approved status electrician is qualified to supervise others and can work on most electrical installations independently.",
    icon: <ShieldCheck className="h-8 w-8 text-elec-yellow" />,
    skills: ["Leadership", "Advanced installations", "Mentoring", "Technical knowledge"],
    salaryRange: "£32,000 - £45,000",
    timeToAchieve: "3-5 years"
  },
  {
    id: 2,
    title: "Installation Electrician",
    requirements: "Level 3 NVQ Diploma + AM2 assessment",
    description: "Install, maintain, and repair electrical systems in domestic, commercial and industrial environments.",
    icon: <Hammer className="h-8 w-8 text-elec-yellow" />,
    skills: ["Installation techniques", "Fault finding", "Circuit testing", "Following diagrams"],
    salaryRange: "£25,000 - £35,000",
    timeToAchieve: "3-4 years"
  },
  {
    id: 3,
    title: "Electrical Contractor",
    requirements: "Journey-level experience + business license + certification",
    description: "Run your own electrical contracting business focusing on residential, commercial, or industrial work.",
    icon: <Building className="h-8 w-8 text-elec-yellow" />,
    skills: ["Business management", "Customer relations", "Estimation", "Financial planning"],
    salaryRange: "£40,000 - £80,000+",
    timeToAchieve: "5+ years"
  },
  {
    id: 4,
    title: "Electrical Engineer",
    requirements: "Degree in Electrical Engineering + professional experience",
    description: "Design, develop and test electrical equipment and systems for buildings, transportation, or power generation.",
    icon: <Award className="h-8 w-8 text-elec-yellow" />,
    skills: ["Circuit design", "Power systems", "Project management", "Technical documentation"],
    salaryRange: "£30,000 - £55,000",
    timeToAchieve: "5-7 years (including education)"
  },
  {
    id: 5,
    title: "Maintenance Electrician",
    requirements: "Level 3 NVQ + specialized maintenance experience",
    description: "Maintain, troubleshoot, and repair electrical systems in factories, plants, or commercial buildings.",
    icon: <Zap className="h-8 w-8 text-elec-yellow" />,
    skills: ["Fault diagnosis", "Preventative maintenance", "PLC systems", "Industrial standards"],
    salaryRange: "£28,000 - £40,000",
    timeToAchieve: "3-5 years"
  },
  {
    id: 6,
    title: "Electrical Inspector",
    requirements: "Advanced certification + extensive field experience",
    description: "Ensure electrical installations comply with regulations and safety standards, working with local authorities.",
    icon: <TrendingUp className="h-8 w-8 text-elec-yellow" />,
    skills: ["Regulatory expertise", "Attention to detail", "Documentation", "Communication"],
    salaryRange: "£35,000 - £50,000",
    timeToAchieve: "6-8 years"
  },
  {
    id: 7,
    title: "Project Manager",
    requirements: "Extensive electrical experience + management qualifications",
    description: "Oversee large-scale electrical projects, coordinate teams, and manage budgets and timelines.",
    icon: <Trophy className="h-8 w-8 text-elec-yellow" />,
    skills: ["Leadership", "Budgeting", "Scheduling", "Stakeholder management"],
    salaryRange: "£45,000 - £65,000",
    timeToAchieve: "7-10 years"
  },
  {
    id: 8,
    title: "Specialist Electrician",
    requirements: "Standard qualification + specialist training",
    description: "Focus on specific areas like renewable energy, electric vehicles, or building management systems.",
    icon: <Briefcase className="h-8 w-8 text-elec-yellow" />,
    skills: ["Specialized knowledge", "Advanced technologies", "Problem solving", "Consultancy"],
    salaryRange: "£30,000 - £50,000",
    timeToAchieve: "4-6 years"
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
                <span>Join professional organisations like the IET, ECA, or NICEIC to network with others in the field</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider specialising in growth areas like renewable energy, electric vehicles, or smart building systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Document your work and build a portfolio showcasing your most impressive projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Pursue additional qualifications like the 18th Edition Wiring Regulations or inspection and testing certification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider gaining experience in different sectors (domestic, commercial, industrial) to broaden your expertise</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <Award className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Career Progression Paths</h3>
            <p className="text-sm mb-3">
              Common progression paths in the electrical industry include:
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="text-amber-400 font-medium">Apprentice → Electrician → Approved Electrician → Supervisor</h4>
                <p className="text-xs mt-1">The traditional progression path focusing on installation work and eventually team management.</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-medium">Electrician → Specialist → Consultant</h4>
                <p className="text-xs mt-1">Focusing on developing expertise in specialized fields like renewable energy or building automation.</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-medium">Electrician → Further Education → Electrical Engineer</h4>
                <p className="text-xs mt-1">Pursuing higher education to move into design and engineering roles.</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-medium">Electrician → Business Training → Electrical Contractor</h4>
                <p className="text-xs mt-1">Building business skills to establish and grow your own electrical contracting company.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareerPathways;
