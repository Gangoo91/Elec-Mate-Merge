import React from "react";
import {
  ArrowLeft,
  Zap,
  CheckCircle,
  Shield,
  Award,
  GraduationCap,
  BookOpen,
  GraduationCap as HatIcon,
} from "lucide-react";
import { CourseCard } from "@/components/upskilling/cards";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

type CourseLevel =
  | "Essential"
  | "Foundation"
  | "Intermediate"
  | "Advanced"
  | "Specialist"
  | "Expert";

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  link: string;
  comingSoon?: boolean;
}

const availableCourses: Course[] = [
  {
    id: 1,
    title: "Level 2 Electrical Installation",
    description: "Foundation electrical installation skills and safety",
    icon: Zap,
    level: "Foundation",
    duration: "2 years",
    link: "level2",
  },
  {
    id: 2,
    title: "Level 3 Electrical Installation",
    description: "Advanced electrical installation techniques",
    icon: CheckCircle,
    level: "Intermediate",
    duration: "2 years",
    link: "level3",
  },
  {
    id: 3,
    title: "AM 2 Preparation and Guidance",
    description: "Assessment preparation and practical guidance",
    icon: Award,
    level: "Intermediate",
    duration: "1 day",
    link: "am2",
  },
  {
    id: 4,
    title: "HNC Electrical Engineering",
    description:
      "Higher National Certificate in Electrical and Electronic Engineering for Building Services",
    icon: GraduationCap,
    level: "Advanced",
    duration: "2 years",
    link: "hnc",
  },
  {
    id: 5,
    title: "MOET",
    description: "Maintenance Operations Engineering Technician training",
    icon: Shield,
    level: "Intermediate",
    duration: "18 months",
    link: "moet",
  },
  {
    id: 6,
    title: "Functional Skills",
    description:
      "Essential maths, English and IT skills for electrical apprentices",
    icon: BookOpen,
    level: "Essential",
    duration: "Ongoing",
    link: "functional-skills",
  },
];

const comingSoonCourses: Course[] = [];

const Index = () => {
  useSEO(
    "Apprentice Courses - Elec-Mate",
    "Comprehensive electrical apprenticeship courses covering Level 2, Level 3, AM2 preparation, HNC, MOET and Functional Skills"
  );

  return (
    <div className="overflow-x-hidden bg-[#0d0d0d] min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/5 px-4 sm:px-6 py-3">
        <Link
          to="/study-centre"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors touch-manipulation active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Study Centre</span>
        </Link>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-neutral-900 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-elec-yellow/8 via-transparent to-transparent" />

        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-elec-yellow/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-elec-yellow/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-500 to-orange-500 shadow-2xl shadow-elec-yellow/25">
                <HatIcon className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Apprentice Courses
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto mb-5">
              Structured learning pathways from foundation to advanced level,
              designed for electrical apprentices at every stage
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-semibold text-elec-yellow">
                  {availableCourses.length}
                </span>
                <span className="text-xs text-white/50">Courses</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-semibold text-green-400">
                  Level 2-4
                </span>
                <span className="text-xs text-white/50">Range</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-semibold text-blue-400">
                  Ongoing
                </span>
                <span className="text-xs text-white/50">Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Available Courses */}
          <div>
            <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
              Available Now
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
              {availableCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  to={course.link}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  level={course.level}
                  duration={course.duration}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Coming Soon Section */}
          {comingSoonCourses.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
                Coming Soon
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
                {comingSoonCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    to={course.link}
                    title={course.title}
                    description={course.description}
                    icon={course.icon}
                    level={course.level}
                    duration={course.duration}
                    index={index + availableCourses.length}
                    comingSoon
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
