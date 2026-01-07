import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Search, CheckSquare, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "Section 1",
    title: "Time Management Mastery",
    description: "Master essential time management strategies for both written and practical exams, including allocation techniques and pacing methods.",
    icon: Clock,
    href: "section1"
  },
  {
    number: "Section 2", 
    title: "Question Analysis Techniques",
    description: "Learn how to break down exam questions, identify key requirements, and structure your answers effectively.",
    icon: Search,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Exam Day Preparation", 
    description: "Essential preparation steps for exam day, including mental preparation, required materials, and last-minute revision strategies.",
    icon: CheckSquare,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Common Pitfalls & Solutions",
    description: "Identify and avoid common exam mistakes, with practical solutions and preventive strategies for better performance.",
    icon: AlertTriangle,
    href: "section4"
  },
];

const Level2Module8Section2 = () => {
  useSEO(
    "How to Pass Exams - Level 2 Electrical Installation | Module 8 Section 2",
    "Master exam success with proven strategies, time management techniques, and expert tips for Level 2 electrical installation examinations. BS7671 compliant preparation guide."
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
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
            How to Pass Exams – Tips and Techniques
          </h1>
          <p className="text-white/80 text-lg max-w-3xl">
            Master the essential strategies and techniques needed to excel in your Level 2 electrical installation examinations. 
            Learn proven methods for time management, question analysis, and exam preparation that will maximise your performance and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
              number={subsection.number}
              title={subsection.title}
              description={subsection.description}
              icon={subsection.icon}
              href={subsection.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section2;