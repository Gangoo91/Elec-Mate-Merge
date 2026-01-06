import { Shield, Leaf, Zap, Search, TestTube, DraftingCompass, Users, GraduationCap, ChevronLeft } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    number: "Module 1",
    title: "Health and Safety in Building Services Engineering",
    description: "Advanced health and safety practices for complex electrical work environments",
    icon: Shield,
    href: "../level3-module1",
  },
  {
    number: "Module 2",
    title: "Environmental Technology Systems",
    description: "Energy-efficient systems, renewable technologies and environmental compliance",
    icon: Leaf,
    href: "../level3-module2",
  },
  {
    number: "Module 3",
    title: "Electrical Science Principles",
    description: "Advanced electrical theory, AC/DC circuits, and complex electrical calculations",
    icon: Zap,
    href: "../level3-module3",
  },
  {
    number: "Module 4",
    title: "Fault Diagnosis & Rectification",
    description: "Advanced fault finding techniques and systematic problem-solving methods",
    icon: Search,
    href: "../level3-module4",
  },
  {
    number: "Module 5",
    title: "Inspection, Testing & Commissioning",
    description: "Comprehensive testing procedures, commissioning protocols and compliance verification",
    icon: TestTube,
    href: "../level3-module5",
  },
  {
    number: "Module 6",
    title: "Electrical Systems Design",
    description: "Design principles, load calculations, and electrical system specification",
    icon: DraftingCompass,
    href: "../level3-module6",
  },
  {
    number: "Module 7",
    title: "Career Awareness & Professional Development",
    description: "Professional standards, career progression and continuing professional development",
    icon: Users,
    href: "../level3-module7",
  },
  {
    number: "Module 8",
    title: "Mock Exams",
    description: "Comprehensive mock examinations and assessment preparation for Level 3 qualification",
    icon: TestTube,
    href: "../level3-module8",
  },
];

const Level3 = () => {
  return (
    <div className="min-h-screen pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-teal-500/10 blur-2xl"
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
              <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-cyan-600 to-teal-600 shadow-2xl shadow-cyan-500/25">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Level 3 Electrical Installation
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Advanced electrical installation techniques and professional development modules
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

export default Level3;
