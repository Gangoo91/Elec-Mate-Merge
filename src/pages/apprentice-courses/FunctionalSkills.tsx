import { BookOpen, Calculator, FileText, Laptop, Wrench, Target, Award, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkills = () => {
  useSEO(
    "Functional Skills for Electricians",
    "Comprehensive functional skills training in maths, English and IT designed specifically for electrical apprentices"
  );

  const modules = [
    {
      number: "Module 1",
      title: "Mathematics for Electricians",
      description: "Number systems, units, algebra, data handling and practical calculations for electrical work",
      icon: Calculator,
      href: "/study-centre/apprentice/functional-skills/module1"
    },
    {
      number: "Module 2",
      title: "English for Electricians",
      description: "Technical reading, writing, communication skills and professional documentation",
      icon: FileText,
      href: "/study-centre/apprentice/functional-skills/module2"
    },
    {
      number: "Module 3",
      title: "Digital Skills for Electricians",
      description: "Computer basics, spreadsheets, digital documentation and online safety",
      icon: Laptop,
      href: "/study-centre/apprentice/functional-skills/module3"
    },
    {
      number: "Module 4",
      title: "Practical Mathematics Applications",
      description: "Electrical calculations, cable sizing, costing, quoting and geometry for installation work",
      icon: Wrench,
      href: "/study-centre/apprentice/functional-skills/module4"
    },
    {
      number: "Module 5",
      title: "Assessment Preparation",
      description: "Level 1 and Level 2 practice, study techniques, exam skills and portfolio building",
      icon: Target,
      href: "/study-centre/apprentice/functional-skills/module5"
    },
    {
      number: "Module 6",
      title: "Mock Examination",
      description: "200-question bank covering all modules with timed practice exams and instant results",
      icon: Award,
      href: "/study-centre/apprentice/functional-skills/module6"
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-green-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl"
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
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Functional Skills for Electricians
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Comprehensive functional skills training in maths, English and IT designed specifically for electrical apprentices
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <ModuleCard
                number={module.number}
                title={module.title}
                description={module.description}
                icon={module.icon}
                href={module.href}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkills;
