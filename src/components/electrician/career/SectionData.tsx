import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase,
  Clock
} from "lucide-react";

export const electricianCareerSections = [
  {
    id: "cpd",
    title: "CPD Tracker",
    description: "Track and manage your Continuing Professional Development hours and goals",
    icon: <Clock className="h-12 w-12 text-elec-yellow" />
  },
  {
    id: "pathways",
    title: "Career Pathways",
    description: "Explore different career advancement routes in the electrical industry",
    icon: <Briefcase className="h-12 w-12 text-blue-400" />
  },
  {
    id: "courses",
    title: "Career Courses",
    description: "Professional courses to enhance your electrical career skills",
    icon: <BookOpen className="h-12 w-12 text-purple-400" />
  },
  {
    id: "education",
    title: "Further Education",
    description: "Degrees and advanced learning opportunities for electrical professionals",
    icon: <GraduationCap className="h-12 w-12 text-green-400" />
  },
  {
    id: "accreditation",
    title: "Professional Accreditation",
    description: "Essential qualifications and certifications for career advancement",
    icon: <Award className="h-12 w-12 text-purple-400" />
  }
];