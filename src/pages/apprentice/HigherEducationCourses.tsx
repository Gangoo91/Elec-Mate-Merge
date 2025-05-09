
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { School, BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface HigherEducationCourseProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  level: string;
  duration: string;
  institution: string;
  modules: string[];
}

const HigherEducationCourse = ({ 
  title, 
  description, 
  icon, 
  link, 
  level,
  duration,
  institution,
  modules
}: HigherEducationCourseProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={link} className="block h-full">
      <Card 
        className={`border-elec-yellow/20 bg-elec-gray h-full transition-all duration-300 cursor-pointer
          ${isHovered ? 'border-elec-yellow/80 shadow-lg shadow-elec-yellow/10' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 bg-elec-dark rounded-md transition-colors ${isHovered ? 'bg-elec-yellow/20' : ''}`}>
                {icon}
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-1 transition-colors ${isHovered ? 'text-elec-yellow' : ''}`}>{title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{level} | {duration}</p>
                <p className="text-xs text-elec-yellow/80">{institution}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            <div className="mt-auto">
              <h4 className="text-xs font-medium text-elec-yellow/80 mb-2">Key Modules:</h4>
              <div className="flex flex-wrap gap-1.5">
                {modules.slice(0, 3).map((module, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-elec-dark/60 px-2 py-0.5 rounded"
                  >
                    {module}
                  </span>
                ))}
                {modules.length > 3 && (
                  <span className="text-xs text-elec-yellow">+{modules.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const HigherEducationCourses = () => {
  const courses: HigherEducationCourseProps[] = [
    {
      title: "HNC Electrical Engineering",
      description: "Higher National Certificate covering advanced electrical principles and practices.",
      icon: <School className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/hnc",
      level: "Level 4",
      duration: "1-2 years",
      institution: "UK Universities & Colleges",
      modules: [
        "Electrical Principles", 
        "Engineering Mathematics", 
        "Digital Electronics", 
        "Project Management",
        "Analytical Methods",
        "Engineering Science"
      ]
    },
    {
      title: "HND Electrical Engineering",
      description: "Higher National Diploma providing in-depth knowledge of electrical systems and design.",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/hnd",
      level: "Level 5",
      duration: "2 years",
      institution: "UK Universities & Colleges",
      modules: [
        "Power Systems", 
        "Electronic Design", 
        "Advanced Mathematics", 
        "Industrial Applications",
        "Control Systems",
        "Renewable Energy Systems"
      ]
    },
    {
      title: "BEng Electrical Engineering",
      description: "Bachelor's degree in Electrical Engineering with focus on power systems and electronics.",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/beng",
      level: "Level 6",
      duration: "3-4 years",
      institution: "University",
      modules: [
        "Advanced Electrical Systems", 
        "Power Engineering", 
        "Control Systems", 
        "Professional Practice",
        "Digital Signal Processing",
        "Final Year Project"
      ]
    },
    {
      title: "MEng Electrical Engineering",
      description: "Integrated Master's degree providing advanced knowledge for professional engineering careers.",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/meng",
      level: "Level 7",
      duration: "4-5 years",
      institution: "University",
      modules: [
        "Advanced Power Systems", 
        "Renewable Technology", 
        "Research Methods", 
        "Energy Efficiency",
        "Smart Grid Technology",
        "Dissertation"
      ]
    },
    {
      title: "MSc Electrical Power Systems",
      description: "Specialist Master's degree focusing on electrical power systems and energy management.",
      icon: <School className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/msc-power",
      level: "Level 7",
      duration: "1-2 years",
      institution: "University",
      modules: [
        "Grid Integration", 
        "Power Distribution", 
        "Energy Storage", 
        "System Protection",
        "Advanced Modeling",
        "Research Project"
      ]
    },
    {
      title: "MSc Renewable Energy Systems",
      description: "Advanced study of renewable energy technologies and their integration into electrical systems.",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/study/higher/msc-renewable",
      level: "Level 7",
      duration: "1-2 years",
      institution: "University",
      modules: [
        "Solar Energy Systems", 
        "Wind Power", 
        "Energy Storage", 
        "Grid Integration",
        "Sustainability Assessment",
        "Research Dissertation"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Higher Education</h1>
          <p className="text-muted-foreground mt-1">
            Advanced qualifications to enhance your electrical career prospects
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <HigherEducationCourse
            key={index}
            {...course}
          />
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <GraduationCap className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Funding Options for Higher Education</h3>
            <p className="text-sm mb-4">
              Various funding options are available to support your higher education journey in electrical engineering.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Student Finance</h4>
                <p className="text-xs">Loans available for tuition fees and living costs, with repayments starting only after you earn above the threshold.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Advanced Learner Loan</h4>
                <p className="text-xs">Available for Level 3-6 qualifications at approved colleges and training providers.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Employer Sponsorship</h4>
                <p className="text-xs">Many employers support employees through part-time higher education programs related to their work.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Professional Scholarships</h4>
                <p className="text-xs">Organizations like IET offer grants and scholarships for electrical engineering studies.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HigherEducationCourses;
