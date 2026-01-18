import { Shield, Zap, Cog, Wrench, Settings, FileText, Award, GraduationCap, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const MOET = () => {
  useSEO(
    "MOET - Maintenance Operations Engineering Technician Course",
    "Comprehensive maintenance operations engineering training covering health & safety, electrical theory, plant systems, diagnostics and assessment preparation"
  );

  const modules = [
    {
      number: "Module 1",
      title: "Health, Safety and Compliance",
      description: "Essential health and safety requirements, risk management and regulatory compliance for maintenance operations",
      icon: Shield,
      href: "../m-o-e-t-module1"
    },
    {
      number: "Module 2",
      title: "Engineering Principles and Electrical Theory",
      description: "Fundamental engineering principles, electrical theory and mathematical applications for maintenance engineering",
      icon: Zap,
      href: "../m-o-e-t-module2"
    },
    {
      number: "Module 3",
      title: "Electrical Plant, Equipment and Systems",
      description: "Understanding electrical plant, equipment specifications, system operations and maintenance requirements",
      icon: Cog,
      href: "../m-o-e-t-module3"
    },
    {
      number: "Module 4",
      title: "Maintenance Techniques and Fault Diagnosis",
      description: "Systematic maintenance approaches, fault finding techniques and diagnostic procedures for engineering systems",
      icon: Wrench,
      href: "../m-o-e-t-module4"
    },
    {
      number: "Module 5",
      title: "Control, Automation and Instrumentation",
      description: "Control systems, automation technology, instrumentation and monitoring systems for industrial applications",
      icon: Settings,
      href: "../m-o-e-t-module5"
    },
    {
      number: "Module 6",
      title: "Technical Documentation and Communication",
      description: "Technical reporting, documentation standards, communication skills and professional development",
      icon: FileText,
      href: "../m-o-e-t-module6"
    },
    {
      number: "Module 7",
      title: "End Point Assessment Preparation",
      description: "Comprehensive preparation for MOET end point assessment including practical tasks and knowledge evaluation",
      icon: Award,
      href: "../m-o-e-t-module7"
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-orange-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-red-500/10 blur-2xl"
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
              <div className="absolute inset-0 bg-orange-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 shadow-2xl shadow-orange-500/25">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                MOET - Maintenance Operations Engineering
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Comprehensive maintenance operations engineering training covering health & safety, electrical theory, plant systems, diagnostics and assessment preparation
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

export default MOET;
