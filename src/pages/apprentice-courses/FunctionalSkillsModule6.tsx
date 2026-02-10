import { ChevronLeft, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule6 = () => {
  useSEO(
    "Module 6: Mock Examination - Functional Skills",
    "Practice examination with 20 random questions from a 200-question bank covering all five modules"
  );

  return (
    <div className="pb-24 bg-elec-dark">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-white/60 hover:text-white hover:bg-white/10 gap-2"
              asChild
            >
              <Link to="/study-centre/apprentice/functional-skills">
                <ChevronLeft className="h-4 w-4" />
                Back to Functional Skills
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
              Module 6
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Mock Examination
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Practice examination with 20 random questions from a 200-question bank covering all five modules
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ModuleCard
              number="Mock Exam"
              title="Functional Skills Mock Examination"
              description="200-question bank covering all five modules. 20 random questions per exam with a 30-minute timer and 80% pass mark."
              icon={Target}
              href="/study-centre/apprentice/functional-skills/module6/mock-exam"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule6;
