import { ArrowLeft, Settings, Cable, Package, Power, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BS7671Module5 = () => {
  const sections = [
    {
      id: 1,
      title: "Equipment Ratings and Suitability for Purpose",
      icon: Settings,
      description: "Selecting equipment including enhanced consumer units for renewable energy systems"
    },
    {
      id: 2,
      title: "Cable Types, Sizing, Grouping, and Routing",
      icon: Cable,
      description: "Cable selection, current-carrying capacity calculations, and installation methods"
    },
    {
      id: 3,
      title: "Containment Systems and Mechanical Protection",
      icon: Package,
      description: "Cable management systems and protection against mechanical damage"
    },
    {
      id: 4,
      title: "Isolation, Switching, and Emergency Controls",
      icon: Power,
      description: "Requirements for isolation devices, switching arrangements, and emergency stopping"
    },
    {
      id: 5,
      title: "Grid Interaction and Anti-Islanding Protection",
      icon: ShieldCheck,
      description: "Grid interaction safety measures and anti-islanding protection for renewable energy"
    },
    {
      id: 6,
      title: "Environmental Protection (IP Ratings, Fire Resistance)",
      icon: Package,
      description: "Protection against environmental influences and fire safety requirements"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="bs7671-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BS7671 Course
          </Button>
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 5: Selection & Erection of Equipment
            </h1>
            <p className="text-xl text-white mb-6">
              Equipment selection criteria, installation methods, and protection requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`bs7671-module-5-section-${section.id}`}>
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

export default BS7671Module5;
