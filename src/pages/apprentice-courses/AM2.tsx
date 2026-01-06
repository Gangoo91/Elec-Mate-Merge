import { BookOpen, Shield, Wrench, TestTube, Search, Monitor, Trophy, Award, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const AM2 = () => {
  useSEO(
    "AM2 Preparation & Guidance Course - Electrical Training",
    "Comprehensive AM2 assessment preparation covering installation, testing, fault diagnosis and exam strategy for electrical qualifications"
  );

  const modules = [
    {
      id: 1,
      number: "Module 1",
      title: "Introduction to the AM2",
      description: "Purpose, structure, marking criteria and common failure reasons",
      icon: BookOpen,
      path: "module1"
    },
    {
      id: 2,
      number: "Module 2",
      title: "Health, Safety and Documentation",
      description: "Safe isolation, RAMS, drawings, paperwork and critical safety procedures",
      icon: Shield,
      path: "module2"
    },
    {
      id: 3,
      number: "Module 3",
      title: "Installation Tasks",
      description: "Cable selection, power circuits, lighting, special installations and time management",
      icon: Wrench,
      path: "module3"
    },
    {
      id: 4,
      number: "Module 4",
      title: "Inspection and Testing",
      description: "Test sequences, instruments, certification, functional testing and compliance",
      icon: TestTube,
      path: "module4"
    },
    {
      id: 5,
      number: "Module 5",
      title: "Fault Diagnosis and Rectification",
      description: "Typical faults, logical processes, test equipment and re-testing procedures",
      icon: Search,
      path: "module5"
    },
    {
      id: 6,
      number: "Module 6",
      title: "Online Knowledge Test",
      description: "Format, core topics, practice questions and time management strategies",
      icon: Monitor,
      path: "module6"
    },
    {
      id: 7,
      number: "Module 7",
      title: "Exam Strategy and Success Tips",
      description: "Time management, pressure handling, safety approach and common mistakes",
      icon: Trophy,
      path: "module7"
    },
    {
      id: 8,
      number: "Module 8",
      title: "Full Mock AM2 Assessment",
      description: "Simulated tasks, practice runs, exam conditions and improvement planning",
      icon: Award,
      path: "module8"
    }
  ];

  return (
    <div className="min-h-screen pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-elec-yellow/10 via-transparent to-transparent" />

        {/* Floating orbs */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-white/60 hover:text-white hover:bg-white/10 gap-2"
              asChild
            >
              <Link to="/study-centre/apprentice">
                <ChevronLeft className="h-4 w-4" />
                Back to Study Centre
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-elec-yellow/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-500 to-orange-500 shadow-2xl shadow-elec-yellow/25">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                AM2 Preparation & Guidance
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Comprehensive preparation for the AM2 assessment covering installation tasks, inspection & testing, fault diagnosis, and exam strategy
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <CourseCard
                title={module.title}
                description={module.description}
                icon={module.icon}
                href={module.path}
                number={module.number}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AM2;
