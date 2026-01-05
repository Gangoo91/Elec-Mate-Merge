import { ArrowLeft, Zap, CheckCircle, Shield, Award, GraduationCap, BookOpen } from "lucide-react";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "Level 2 Electrical Installation",
    description: "Foundation electrical installation skills and safety",
    icon: Zap,
    href: "level2",
  },
  {
    title: "AM 2 Preparation and Guidance",
    description: "Assessment preparation and practical guidance",
    icon: Award,
    href: "am2",
  },
  {
    title: "Level 3 Electrical Installation",
    description: "Advanced electrical installation techniques",
    icon: CheckCircle,
    href: "level3",
    comingSoon: true,
  },
  {
    title: "MOET",
    description: "Maintenance Operations Engineering Technician training",
    icon: Shield,
    href: "moet",
    comingSoon: true,
  },
  {
    title: "HNC Electrical Engineering",
    description: "Higher National Certificate in Electrical and Electronic Engineering",
    icon: GraduationCap,
    href: "hnc",
    comingSoon: true,
  },
  {
    title: "Functional Skills",
    description: "Essential maths, English and IT skills for electrical apprentices",
    icon: BookOpen,
    href: "functional-skills",
    comingSoon: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/study-centre">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Back to Study Centre</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Apprentice courses
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl">
            Comprehensive electrical training and skills development for apprentice electricians
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              icon={course.icon}
              href={course.href}
              comingSoon={course.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
