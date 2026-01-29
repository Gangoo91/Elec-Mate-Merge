import { Shield, Beaker, Zap, Building2, FolderKanban, Leaf, Lightbulb, Wind, GraduationCap, ChevronLeft, FileText } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    number: "Module 1",
    title: "Health, Safety and Risk Management",
    description: "Comprehensive H&S protocols, RAMS, CDM regulations and risk assessment for building services engineering",
    icon: Shield,
    href: "../h-n-c-module1",
    credits: 15,
  },
  {
    number: "Module 2",
    title: "Building Services Science",
    description: "Heat transfer, fluid mechanics, psychrometrics and environmental physics applied to HVAC, plumbing and fire systems",
    icon: Beaker,
    href: "../h-n-c-module2",
    credits: 15,
  },
  {
    number: "Module 3",
    title: "Electrical & Electronic Principles",
    description: "DC/AC circuit theory, three-phase systems, semiconductors and digital electronics for building services",
    icon: Zap,
    href: "../h-n-c-module3",
    credits: 15,
  },
  {
    number: "Module 4",
    title: "Design Principles for Building Services",
    description: "Load calculations, system sizing, BS 7671 compliance and specification writing for electrical installations",
    icon: Building2,
    href: "../h-n-c-module4",
    credits: 15,
  },
  {
    number: "Module 5",
    title: "Project Management",
    description: "Planning, procurement, cost control, quality management and commissioning of building services projects",
    icon: FolderKanban,
    href: "../h-n-c-module5",
    credits: 15,
  },
  {
    number: "Module 6",
    title: "Sustainability & Environmental Engineering",
    description: "Part L compliance, renewable integration, BREEAM assessment and carbon reduction strategies for sustainable buildings",
    icon: Leaf,
    href: "../h-n-c-module6",
    credits: 15,
  },
  {
    number: "Module 7",
    title: "Power and Lighting Systems",
    description: "LV distribution design, emergency systems, lighting calculations, controls and energy-efficient solutions for commercial buildings",
    icon: Lightbulb,
    href: "../h-n-c-module7",
    credits: 15,
  },
  {
    number: "Module 8",
    title: "HVAC Systems",
    description: "Heating, ventilation and air conditioning system design, motor control, BMS integration and electrical services coordination",
    icon: Wind,
    href: "../h-n-c-module8",
    credits: 15,
  },
  {
    number: "Module 9",
    title: "Mock Examinations",
    description: "Test your knowledge with timed practice exams. 500-question bank covering all modules, 30 questions per exam, 45 minutes",
    icon: FileText,
    href: "../h-n-c-module9",
    credits: 0,
  },
];

const HNC = () => {
  return (
    <div className="pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-pink-500/10 blur-2xl"
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
              <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/25">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                HNC Electrical Engineering
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Higher National Certificate in Electrical Engineering for Building Services - Core electrical principles combined with specialist building services applications (120 credits)
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.number}
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

export default HNC;
