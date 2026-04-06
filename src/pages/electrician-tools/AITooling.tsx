import { Brain, ArrowLeft, Camera, AlertTriangle, Search, Wrench, CheckCircle, Megaphone, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BusinessCard } from '@/components/business-hub';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const AITooling = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Brain className="h-4 w-4 text-purple-400" />
              </div>
              <h1 className="text-base font-semibold text-white">AI Tooling Suite</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* Pro Tip */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 rounded-xl border border-purple-500/15 bg-purple-500/[0.06] px-3 py-2"
        >
          <Lightbulb className="h-3.5 w-3.5 text-purple-400 shrink-0" />
          <p className="text-[11px] text-white">Use good lighting for best AI results</p>
        </motion.div>

        {/* FEATURED */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Featured
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Quick Capture"
              description="Photograph any component for instant ID"
              icon={Camera}
              href="/electrician-tools/ai-tooling/component-identify"
              variant="hero"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
            />
            <BusinessCard
              title="Fault Diagnosis"
              description="Identify issues, EICR codes & fixes"
              icon={AlertTriangle}
              href="/electrician-tools/ai-tooling/fault-diagnosis"
              variant="hero"
              accentColor="from-orange-500 via-amber-400 to-orange-400"
              iconColor="text-orange-400"
              iconBg="bg-orange-500/10 border border-orange-500/20"
            />
          </div>
        </motion.section>

        {/* VISUAL ANALYSIS */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Visual Analysis
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Component ID"
              description="Identify components, specs & BS 7671"
              icon={Search}
              href="/electrician-tools/ai-tooling/component-identify"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
            />
            <BusinessCard
              title="Wiring Guide"
              description="Step-by-step UK wiring instructions"
              icon={Wrench}
              href="/electrician-tools/ai-tooling/wiring-instruction"
              accentColor="from-emerald-500 via-emerald-400 to-green-400"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
            />
            <BusinessCard
              title="Install Verify"
              description="BS 7671 compliance pass/fail check"
              icon={CheckCircle}
              href="/electrician-tools/ai-tooling/installation-verify"
              accentColor="from-cyan-500 via-teal-400 to-cyan-400"
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/10 border border-cyan-500/20"
            />
          </div>
        </motion.section>

        {/* TEXT AI */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Text AI
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Client Explainer"
              description="Technical findings in plain English"
              icon={Megaphone}
              href="/electrician-tools/ai-tooling/explainer"
              accentColor="from-pink-500 via-rose-400 to-pink-400"
              iconColor="text-pink-400"
              iconBg="bg-pink-500/10 border border-pink-500/20"
            />
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AITooling;
