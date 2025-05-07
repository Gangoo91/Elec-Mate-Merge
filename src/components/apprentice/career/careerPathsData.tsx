
import { Award, Briefcase, Building, TrendingUp, Trophy, GraduationCap, ShieldCheck, Hammer, Zap, Lightbulb, Wrench, Cpu } from "lucide-react";

export const careerPaths = [
  {
    id: 5,
    title: "Maintenance Electrician",
    requirements: "Level 3 NVQ + specialized maintenance experience",
    description: "Maintain, troubleshoot, and repair electrical systems in factories, plants, or commercial buildings.",
    icon: <Zap className="h-8 w-8 text-elec-yellow" />,
    skills: ["Fault diagnosis", "Preventative maintenance", "PLC systems", "Industrial standards"],
    salaryRange: "£26,000 - £38,000",
    timeToAchieve: "3-5 years"
  },
  {
    id: 2,
    title: "Installation Electrician",
    requirements: "Level 3 NVQ Diploma + AM2 assessment",
    description: "Install, maintain, and repair electrical systems in domestic, commercial and industrial environments.",
    icon: <Hammer className="h-8 w-8 text-elec-yellow" />,
    skills: ["Installation techniques", "Fault finding", "Circuit testing", "Following diagrams"],
    salaryRange: "£28,000 - £35,000",
    timeToAchieve: "3-4 years"
  },
  {
    id: 8,
    title: "Specialist Electrician",
    requirements: "Standard qualification + specialist training",
    description: "Focus on specific areas like renewable energy, electric vehicles, or building management systems.",
    icon: <Briefcase className="h-8 w-8 text-elec-yellow" />,
    skills: ["Specialized knowledge", "Advanced technologies", "Problem solving", "Consultancy"],
    salaryRange: "£30,000 - £40,000",
    timeToAchieve: "4-6 years"
  },
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
    id: 4,
    title: "Electrical Engineer",
    requirements: "Degree in Electrical Engineering + professional experience",
    description: "Design, develop and test electrical equipment and systems for buildings, transportation, or power generation.",
    icon: <Award className="h-8 w-8 text-elec-yellow" />,
    skills: ["Circuit design", "Power systems", "Project management", "Technical documentation"],
    salaryRange: "£32,000 - £55,000",
    timeToAchieve: "5-7 years (including education)"
  },
  {
    id: 10,
    title: "Electrical Designer",
    requirements: "HNC/HND in Electrical Engineering or equivalent + design software proficiency",
    description: "Create detailed electrical designs and drawings for construction projects using CAD and BIM software.",
    icon: <Lightbulb className="h-8 w-8 text-elec-yellow" />,
    skills: ["CAD software", "Design standards", "Load calculations", "Technical drawing"],
    salaryRange: "£33,000 - £48,000",
    timeToAchieve: "4-6 years"
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
    id: 11,
    title: "Commissioning Technician",
    requirements: "Advanced electrical qualification + specialized commissioning training",
    description: "Test, verify and commission new electrical systems to ensure they operate according to specification.",
    icon: <Wrench className="h-8 w-8 text-elec-yellow" />,
    skills: ["System testing", "Troubleshooting", "Documentation", "Commissioning procedures"],
    salaryRange: "£36,000 - £48,000",
    timeToAchieve: "5-7 years"
  },
  {
    id: 12,
    title: "Commissioning Engineer",
    requirements: "Degree in Electrical Engineering + commissioning experience",
    description: "Lead complex commissioning projects for major electrical and control systems in commercial and industrial facilities.",
    icon: <Cpu className="h-8 w-8 text-elec-yellow" />,
    skills: ["Project management", "Control systems", "Technical leadership", "Client management"],
    salaryRange: "£42,000 - £60,000",
    timeToAchieve: "7-10 years"
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
    id: 3,
    title: "Electrical Contractor",
    requirements: "Journey-level experience + business license + certification",
    description: "Run your own electrical contracting business focusing on residential, commercial, or industrial work.",
    icon: <Building className="h-8 w-8 text-elec-yellow" />,
    skills: ["Business management", "Customer relations", "Estimation", "Financial planning"],
    salaryRange: "£40,000 - £80,000+",
    timeToAchieve: "5+ years"
  }
];
