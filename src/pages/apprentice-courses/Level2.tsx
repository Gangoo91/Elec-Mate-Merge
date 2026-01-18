import { ArrowLeft, Shield, Zap, Wrench, HardHat, FileText, TestTube, AlertTriangle, GraduationCap, ChevronLeft } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    number: "Module 1",
    title: "Health and Safety in Building Services Engineering",
    description: "Essential health and safety practices for electrical work environments",
    icon: Shield,
    href: "module1",
  },
  {
    number: "Module 2",
    title: "Principles of Electrical Science",
    description: "Fundamental electrical theory, voltage, current, resistance and power calculations",
    icon: Zap,
    href: "module2",
  },
  {
    number: "Module 3",
    title: "Electrical Installation Methods & Technology",
    description: "Wiring systems, containment methods, tools and materials for electrical installations",
    icon: Wrench,
    href: "module3",
  },
  {
    number: "Module 4",
    title: "Installing Wiring Systems & Enclosures",
    description: "Hands-on installation techniques for PVC, trunking, conduit and cable tray systems",
    icon: HardHat,
    href: "module4",
  },
  {
    number: "Module 5",
    title: "Design, Planning & Communication",
    description: "Project planning, technical documentation and effective team communication",
    icon: FileText,
    href: "module5",
  },
  {
    number: "Module 6",
    title: "Inspection, Testing & Certification",
    description: "Safe isolation procedures, continuity testing, insulation resistance and certification",
    icon: TestTube,
    href: "module6",
  },
  {
    number: "Module 7",
    title: "Electrical Fault Finding and Diagnosis",
    description: "Learn to identify, diagnose, and safely resolve electrical faults in installations",
    icon: AlertTriangle,
    href: "module7",
  },
  {
    number: "Module 8",
    title: "Mock Examinations & Assessment",
    description: "Test your knowledge and exam readiness with comprehensive mock examinations and practice questions",
    icon: TestTube,
    href: "module8",
  },
];

const Level2 = () => {
  return (
    <div className="pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl"
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
              <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-2xl shadow-blue-500/25">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Level 2 Electrical Installation
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Foundation electrical installation skills and safety training modules
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

export default Level2;
