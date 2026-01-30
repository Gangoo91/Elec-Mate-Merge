import { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, AlertTriangle, Camera, Users, Wrench, Phone, ArrowRight, ArrowLeft, FolderOpen, Loader2 } from "lucide-react";
import { RAMSProvider } from "@/components/electrician-tools/site-safety/rams/RAMSContext";
import { motion } from "framer-motion";

// Lazy-loaded tool components for code splitting
const RAMSGenerator = lazy(() => import("@/components/electrician-tools/site-safety/RAMSGenerator"));
const MethodStatementGenerator = lazy(() => import("@/components/electrician-tools/site-safety/MethodStatementGenerator"));
const IntegratedRAMSGenerator = lazy(() => import("@/components/electrician-tools/site-safety/IntegratedRAMSGenerator"));
const EnhancedHazardDatabase = lazy(() => import("@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase").then(m => ({ default: m.EnhancedHazardDatabase })));
const PhotoDocumentation = lazy(() => import("@/components/electrician-tools/site-safety/PhotoDocumentation"));
const TeamBriefingTemplates = lazy(() => import("@/components/electrician-tools/site-safety/TeamBriefingTemplates"));
const NearMissReporting = lazy(() => import("@/components/electrician-tools/site-safety/NearMissReporting").then(m => ({ default: m.NearMissReporting })));
const SafetyEquipmentTracker = lazy(() => import("@/components/electrician-tools/site-safety/SafetyEquipmentTracker"));
const EmergencyProcedures = lazy(() => import("@/components/electrician-tools/site-safety/EmergencyProcedures"));
const AIRAMSGenerator = lazy(() => import("@/components/electrician-tools/site-safety/ai-rams/AIRAMSGenerator").then(m => ({ default: m.AIRAMSGenerator })));
const SavedRAMSLibrary = lazy(() => import("@/components/electrician-tools/site-safety/SavedRAMSLibrary").then(m => ({ default: m.SavedRAMSLibrary })));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Loading spinner for lazy components
const ToolLoader = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
  </div>
);

// Tool color mapping
const toolColors: Record<string, string> = {
  'ai-rams': 'from-orange-400 to-red-500',
  'saved-rams': 'from-amber-400 to-yellow-500',
  'hazard-database': 'from-blue-400 to-blue-500',
  'photo-docs': 'from-emerald-400 to-green-500',
  'team-briefing': 'from-purple-400 to-purple-500',
  'near-miss': 'from-red-400 to-rose-500',
  'equipment': 'from-cyan-400 to-teal-500',
  'emergency': 'from-pink-400 to-rose-500',
};

const SiteSafety = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'briefings') {
      setActiveView('team-briefing');
    }
  }, [searchParams]);

  const primaryTools = [
    {
      id: "ai-rams",
      title: "RAMS Generator",
      description: "Create comprehensive RAMS documentation from your job description",
      icon: FileText,
      badge: "AI"
    },
    {
      id: "saved-rams",
      title: "Saved Documents",
      description: "Access your previously generated RAMS documentation",
      icon: FolderOpen,
      badge: "Library"
    }
  ];

  const safetyTools = [
    {
      id: "hazard-database",
      title: "Hazard Database",
      description: "Comprehensive electrical hazard information",
      icon: Shield
    },
    {
      id: "photo-docs",
      title: "Photo Documentation",
      description: "Document safety conditions on site",
      icon: Camera
    },
    {
      id: "team-briefing",
      title: "Team Briefing",
      description: "Pre-work safety briefings & toolbox talks",
      icon: Users
    },
    {
      id: "near-miss",
      title: "Near Miss Reports",
      description: "Report and track safety incidents",
      icon: AlertTriangle
    },
    {
      id: "equipment",
      title: "Equipment Tracker",
      description: "Track PPE and safety equipment",
      icon: Wrench
    },
    {
      id: "emergency",
      title: "Emergency Procedures",
      description: "Quick access to emergency protocols",
      icon: Phone
    }
  ];

  const renderToolContent = () => {
    switch (activeView) {
      case "ai-rams":
        return <AIRAMSGenerator onBack={() => setActiveView(null)} />;
      case "saved-rams":
        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
              <div className="px-4 py-2">
                <button
                  onClick={() => setActiveView(null)}
                  className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm font-medium">Site Safety</span>
                </button>
              </div>
            </div>
            <div className="px-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Saved RAMS Documents</h2>
                <p className="text-white/70">
                  View and download your previously generated RAMS documentation
                </p>
              </div>
              <SavedRAMSLibrary />
            </div>
          </div>
        );
      case "integrated-rams":
        return <IntegratedRAMSGenerator />;
      case "rams":
        return <RAMSGenerator />;
      case "method-statement":
        return <MethodStatementGenerator />;
      case "hazard-database":
        return <EnhancedHazardDatabase />;
      case "photo-docs":
        return <PhotoDocumentation onBack={() => setActiveView(null)} />;
      case "team-briefing":
        return <TeamBriefingTemplates />;
      case "near-miss":
        return <NearMissReporting />;
      case "equipment":
        return <SafetyEquipmentTracker />;
      case "emergency":
        return <EmergencyProcedures />;
      default:
        return null;
    }
  };

  if (activeView) {
    // Full-width views render without max-width container
    const isFullWidth = activeView === "equipment" || activeView === "photo-docs" || activeView === "ai-rams" || activeView === "saved-rams";

    return (
      <RAMSProvider>
        <div className="bg-background animate-fade-in">
          {isFullWidth ? (
            // Edge-to-edge layout for native mobile feel
            <Suspense fallback={<ToolLoader />}>
              {renderToolContent()}
            </Suspense>
          ) : (
            // Standard contained layout for other views
            <div className="px-4 py-4 sm:py-6">
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={() => setActiveView(null)}
                  className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm font-medium">Back to Safety Tools</span>
                </button>
              </div>
              <Suspense fallback={<ToolLoader />}>
                {renderToolContent()}
              </Suspense>
            </div>
          )}
        </div>
      </RAMSProvider>
    );
  }

  return (
    <RAMSProvider>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="px-4 py-2">
            <button
              onClick={() => navigate('/electrician')}
              className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Electrician Hub</span>
            </button>
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-6"
        >
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Site Safety & RAMS</h1>
              <p className="text-sm text-white/70">Risk assessments & safety compliance</p>
            </div>
          </motion.div>

          {/* Essential Tools Section */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
              <h2 className="text-base font-bold text-white">Essential Tools</h2>
              <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                2 Active
              </Badge>
            </div>

            <motion.div variants={containerVariants} className="space-y-2">
              {primaryTools.map((tool) => {
                const IconComponent = tool.icon;
                const gradient = toolColors[tool.id] || 'from-gray-400 to-gray-500';

                return (
                  <motion.button
                    key={tool.id}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(tool.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Icon with gradient background */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[15px] font-bold text-white">
                                {tool.title}
                              </h3>
                              {tool.badge && (
                                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-[10px]">
                                  {tool.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[13px] text-white/70 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white/70" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Safety Tools Section */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <h2 className="text-base font-bold text-white">Safety Tools</h2>
              <Badge variant="secondary" className="bg-white/10 text-white/70 border-white/10 text-xs">
                {safetyTools.length} Tools
              </Badge>
            </div>

            <motion.div variants={containerVariants} className="space-y-2">
              {safetyTools.map((tool) => {
                const IconComponent = tool.icon;
                const gradient = toolColors[tool.id] || 'from-gray-400 to-gray-500';

                return (
                  <motion.button
                    key={tool.id}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(tool.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Icon with gradient background */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-bold text-white">
                              {tool.title}
                            </h3>
                            <p className="text-[13px] text-white/70 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white/70" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.section>
        </motion.main>
      </div>
    </RAMSProvider>
  );
};

export default SiteSafety;
