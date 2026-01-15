import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileCheck, Mic, Camera, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: FileCheck,
    title: 'EICR, EIC & Minor Works',
    description: 'Complete BS7671 compliant certification suite',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Hands-free data entry while you work',
  },
  {
    icon: Camera,
    title: 'AI Board Scanner',
    description: 'Auto-detect circuits from board photos',
  },
  {
    icon: Wrench,
    title: 'Fault Finding Codes',
    description: 'Quick lookup for common fault codes',
  },
];

export const InspectionShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
              <FileCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Inspection Suite</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Complete Certification &{' '}
              <span className="text-green-400">Testing Platform</span>
            </h2>

            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Digital certificates, test result logging, and automatic compliance checking.
              Everything you need for professional electrical inspections.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-white/60 text-xs mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/auth/signup">
              <Button
                size="lg"
                className="h-14 px-8 bg-green-500 hover:bg-green-400 text-white font-semibold touch-manipulation"
              >
                Try Inspection Suite
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 p-6 sm:p-8">
              {/* Mock certificate preview */}
              <div className="bg-neutral-900 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">EICR Certificate</h4>
                    <p className="text-xs text-white/60">Electrical Installation Condition Report</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">Installation Address</span>
                    <span className="text-white text-sm">123 Example Street</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">Date of Inspection</span>
                    <span className="text-white text-sm">15 Jan 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">Next Inspection</span>
                    <span className="text-white text-sm">Jan 2031</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/60 text-sm">Overall Assessment</span>
                    <span className="text-green-400 font-semibold text-sm">SATISFACTORY</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-green-500/30 blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
