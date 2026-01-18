import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Layers, Wrench } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const mockExams = [
  {
    number: "Mock Exam 1",
    title: "Health and Safety in Building Services Engineering",
    description: "Test your knowledge of essential health and safety practices for electrical work environments, covering regulations, hazards, and safety procedures.",
    icon: FileText,
    href: "mock1"
  },
  {
    number: "Mock Exam 2", 
    title: "Principles of Electrical Science",
    description: "Assess your understanding of fundamental electrical theory, voltage, current, resistance and power calculations.",
    icon: FileText,
    href: "mock2"
  },
  {
    number: "Mock Exam 3",
    title: "Electrical Installation Methods & Technology", 
    description: "Test your knowledge of wiring systems, containment methods, tools and materials for electrical installations.",
    icon: FileText,
    href: "mock3"
  },
  {
    number: "Mock Exam 4",
    title: "Installing Wiring Systems & Enclosures",
    description: "Evaluate your understanding of hands-on installation techniques for PVC, trunking, conduit and cable tray systems.",
    icon: FileText,
    href: "mock4"
  },
  {
    number: "Mock Exam 5",
    title: "Design, Planning & Communication",
    description: "Test your knowledge of project planning, technical documentation and effective team communication skills.",
    icon: FileText,
    href: "mock5"
  },
  {
    number: "Mock Exam 6", 
    title: "Inspection, Testing & Certification",
    description: "Assess your understanding of safe isolation procedures, continuity testing, insulation resistance and certification requirements.",
    icon: FileText,
    href: "mock6"
  },
  {
    number: "Mock Exam 7",
    title: "Electrical Fault Finding and Diagnosis",
    description: "Test your ability to identify, diagnose, and safely resolve electrical faults in installations using systematic approaches.",
    icon: FileText,
    href: "mock7"
  },
  {
    number: "Mock Exam 8",
    title: "Mixed Mock Exam",
    description: "Comprehensive examination covering all Level 2 modules with mixed questions to simulate real exam conditions.",
    icon: Layers,
    href: "mock8"
  },
];

const Level2Module8Section1 = () => {
  useSEO(
    "Level 2 Mock Examinations - Section 1 | Electrical Training",
    "Access comprehensive mock examinations for Level 2 electrical installation. Practice with module-specific tests, mixed exams, and practical assessments to prepare for your qualification."
  );

  return (
    <div className="bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to=".." 
            className="inline-flex items-center text-white/80 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module 8
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            Mock Examinations
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExams.map((exam) => {
            if (exam.number === "Mock Exam 4") {
              console.log("Mock Exam 4 card data:", exam);
            }
            return (
              <ModuleCard
                key={exam.number}
                number={exam.number}
                title={exam.title}
                description={exam.description}
                icon={exam.icon}
                href={exam.href}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section1;