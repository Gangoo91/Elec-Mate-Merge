import { ArrowLeft, Zap, CheckCircle, Shield, Award, GraduationCap, BookOpen } from "lucide-react";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import { Link } from "react-router-dom";

// Available courses first, then coming soon
const courses = [
  // Available courses
  {
    title: "Level 2 Electrical Installation",
    description: "Foundation electrical installation skills and safety",
    icon: Zap,
    href: "level2",
  },
  {
    title: "Level 3 Electrical Installation",
    description: "Advanced electrical installation techniques",
    icon: CheckCircle,
    href: "level3",
  },
  {
    title: "AM 2 Preparation and Guidance",
    description: "Assessment preparation and practical guidance",
    icon: Award,
    href: "am2",
  },
  {
    title: "HNC Electrical Engineering",
    description: "Higher National Certificate in Electrical and Electronic Engineering for Building Services",
    icon: GraduationCap,
    href: "hnc",
  },
  // Coming soon
  {
    title: "MOET",
    description: "Maintenance Operations Engineering Technician training",
    icon: Shield,
    href: "moet",
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
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Compact Header */}
      <div className="sticky top-0 z-10 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/5">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/study-centre" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">Apprentice Courses</h1>
          </div>
        </div>
      </div>

      {/* Course Grid - single column on mobile */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
