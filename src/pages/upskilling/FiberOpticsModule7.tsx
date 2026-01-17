import { ArrowLeft, AlertTriangle, Droplets, Wrench, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FiberOpticsModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Common Fibre Faults and Symptoms",
      icon: AlertTriangle,
      description: "Identifying typical fiber optic issues"
    },
    {
      id: 2,
      title: "End-Face Contamination and Cleaning",
      icon: Droplets,
      description: "Connector cleaning and maintenance procedures"
    },
    {
      id: 3,
      title: "Troubleshooting Tools and OTDR Use",
      icon: Wrench,
      description: "Diagnostic equipment and fault location techniques"
    },
    {
      id: 4,
      title: "Fibre Record-Keeping",
      icon: FileText,
      description: "Documentation and maintenance records"
    },
    {
      id: 5,
      title: "Upgrade Planning and Network Expansion",
      icon: TrendingUp,
      description: "Future-proofing and capacity planning"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/fiber-optics-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px] touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fiber Optics Course
          </Button>
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 7: Fault Finding, Maintenance, and Upgrades
            </h1>
            <p className="text-xl text-white mb-6">
              Troubleshooting, maintenance, and network expansion strategies
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                55 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`../fiber-optics-module-7-section-${section.id}`} className="h-full block">
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

export default FiberOpticsModule7;
