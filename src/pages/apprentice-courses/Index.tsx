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
      {/* Header - full width */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-4 sm:pb-6">
        <Link to="/study-centre">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors p-0 mb-3 sm:mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back to Study Centre</span>
          </Button>
        </Link>

        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Apprentice Courses
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Electrical training for apprentices
          </p>
        </div>
      </div>

      {/* Course Grid - full width, edge to edge on mobile */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
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
