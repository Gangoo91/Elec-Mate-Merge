import { ArrowLeft, Grid, Calculator, Thermometer, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BS7671Module3 = () => {
  const sections = [
    {
      id: 1,
      title: "Supply Systems – TN-S, TN-C-S, TT, IT",
      icon: Grid,
      description: "Understanding earthing arrangements and their safety implications"
    },
    {
      id: 2,
      title: "Maximum Demand, Diversity, and Load Profiles",
      icon: Calculator,
      description: "Load calculations, diversity factors, and system design principles"
    },
    {
      id: 3,
      title: "External Influences and Installation Conditions",
      icon: Thermometer,
      description: "Environmental conditions affecting material selection and installation methods"
    },
    {
      id: 4,
      title: "Voltage Drop and System Design Limits",
      icon: Zap,
      description: "Calculating and managing voltage drop within BS 7671 limits"
    },
    {
      id: 5,
      title: "Earthing Arrangements and Protective Measures Selection",
      icon: Shield,
      description: "Matching earthing systems with appropriate protection strategies"
    },
    {
      id: 6,
      title: "Amendment 3 Current Requirements",
      icon: TrendingUp,
      description: "Latest bidirectional protection and renewable energy integration requirements"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Link to="bs7671-course">
            <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to BS7671 Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 3: General Characteristics & Selection Criteria
            </h1>
            <p className="text-xl text-white mb-6">
              System design fundamentals, earthing arrangements, and selection criteria
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 auto-rows-fr">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`bs7671-module-3-section-${section.id}`}>
                  <Card
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[200px]"
                  >
                    {/* Accent line at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    <CardContent className="relative text-center space-y-3 p-4">
                      {/* Icon with gradient bg */}
                      <div className="flex justify-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                          <section.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-bold text-xs px-3 py-1"
                        >
                          Section {section.id}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module3;
