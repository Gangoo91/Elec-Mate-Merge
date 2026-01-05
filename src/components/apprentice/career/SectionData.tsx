
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Building,
  Clock,
  TrendingUp,
  Target,
  Users,
  Zap
} from "lucide-react";

export interface CareerSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats?: { label: string; value: string }[];
  badge?: string;
  accentColor: "yellow" | "green" | "blue" | "purple" | "orange";
  features?: string[];
}

export const careerSections: CareerSection[] = [
  {
    id: "pathways",
    title: "Career Pathways",
    description: "Explore 12+ career routes from apprentice to senior roles with salary guides and progression timelines",
    icon: <Briefcase className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Career Paths", value: "12+" },
      { label: "Salary Range", value: "£28k-£92k+" }
    ],
    badge: "Most Popular",
    accentColor: "yellow",
    features: ["JIB Grading Scheme", "Regional Job Markets", "Skills Matrix", "Industry Insights"]
  },
  {
    id: "courses",
    title: "Career Courses",
    description: "Find training courses to advance your skills - from 18th Edition to specialist certifications",
    icon: <BookOpen className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Courses", value: "50+" },
      { label: "Providers", value: "100+" }
    ],
    badge: "Updated 2026",
    accentColor: "blue",
    features: ["Course Search", "Provider Directory", "Cost Comparison", "Funding Options"]
  },
  {
    id: "accreditation",
    title: "Professional Accreditation",
    description: "Essential certifications from NICEIC, NAPIT, ECS cards and more to advance your career",
    icon: <Award className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Certifications", value: "25+" },
      { label: "Bodies", value: "10+" }
    ],
    accentColor: "green",
    features: ["ECS Cards", "Scheme Membership", "BS 7671 Compliance", "Specialist Certs"]
  },
  {
    id: "education",
    title: "Further Education",
    description: "HNC, HND, degrees and advanced qualifications to take your career to the next level",
    icon: <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Programmes", value: "20+" },
      { label: "Universities", value: "50+" }
    ],
    accentColor: "purple",
    features: ["Part-Time Options", "Distance Learning", "Degree Pathways", "Funding Guides"]
  },
  {
    id: "cpd",
    title: "CPD Tracker",
    description: "Track your Continuing Professional Development hours, set goals and stay compliant",
    icon: <Clock className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Target", value: "35 hrs/yr" },
      { label: "Categories", value: "8+" }
    ],
    accentColor: "orange",
    features: ["Hour Logging", "Goal Setting", "Progress Reports", "Reminders"]
  },
  {
    id: "business",
    title: "Business Builder",
    description: "Start and grow your own electrical contracting business with step-by-step guidance",
    icon: <Building className="h-10 w-10 sm:h-12 sm:w-12" />,
    stats: [
      { label: "Avg Revenue", value: "£80k+" },
      { label: "Resources", value: "30+" }
    ],
    accentColor: "green",
    features: ["Business Plans", "Insurance Guide", "Marketing Tips", "Pricing Calculator"]
  }
];

// Industry statistics for 2026
export const industryStats = {
  averageSalary: "£38,500",
  jobGrowth: "+12%",
  activeElectricians: "285,000",
  apprenticeships: "14,500",
  skillsShortage: "18,000",
  averageContractorDayRate: "£220",
  evGrowth: "+45%",
  renewablesGrowth: "+38%"
};

// Quick facts for the career page
export const quickFacts = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    label: "Industry Growth",
    value: "+12% YoY",
    description: "Electrical sector growing faster than average"
  },
  {
    icon: <Target className="h-5 w-5" />,
    label: "Skills Shortage",
    value: "18,000",
    description: "Qualified electricians needed by 2028"
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "UK Electricians",
    value: "285,000",
    description: "Registered electrical professionals"
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "EV & Renewables",
    value: "+40%",
    description: "Growth in green technology roles"
  }
];
