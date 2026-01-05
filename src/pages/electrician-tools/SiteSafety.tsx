
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, AlertTriangle, Camera, Users, ClipboardCheck, Wrench, Phone, ArrowRight, Zap, Star, FolderOpen } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { RAMSProvider } from "@/components/electrician-tools/site-safety/rams/RAMSContext";
import { RAMSQuickAdd } from "@/components/electrician-tools/site-safety/RAMSQuickAdd";
import RAMSGenerator from "@/components/electrician-tools/site-safety/RAMSGenerator";
import MethodStatementGenerator from "@/components/electrician-tools/site-safety/MethodStatementGenerator";
import IntegratedRAMSGenerator from "@/components/electrician-tools/site-safety/IntegratedRAMSGenerator";
import { EnhancedHazardDatabase } from "@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase";
import PhotoDocumentation from "@/components/electrician-tools/site-safety/PhotoDocumentation";
import TeamBriefingTemplates from "@/components/electrician-tools/site-safety/TeamBriefingTemplates";
import { NearMissReporting } from "@/components/electrician-tools/site-safety/NearMissReporting";
import SafetyEquipmentTracker from "@/components/electrician-tools/site-safety/SafetyEquipmentTracker";
import EmergencyProcedures from "@/components/electrician-tools/site-safety/EmergencyProcedures";
import { AIRAMSGenerator } from "@/components/electrician-tools/site-safety/ai-rams/AIRAMSGenerator";
import { SavedRAMSLibrary } from "@/components/electrician-tools/site-safety/SavedRAMSLibrary";

const SiteSafety = () => {
  const [searchParams] = useSearchParams();
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
      title: "AI-Powered RAMS Generator", 
      description: "Let AI create comprehensive RAMS documentation from your job description in seconds",
      icon: FileText,
      featured: true,
      badge: "AI Assistant"
    },
    { 
      id: "saved-rams", 
      title: "Saved RAMS Documents", 
      description: "Access and download your previously generated RAMS documentation",
      icon: FolderOpen,
      featured: true,
      badge: "Library"
    }
  ];

  const safetyTools = [
    { 
      id: "hazard-database", 
      title: "Hazard Database", 
      description: "Access comprehensive electrical hazard information",
      icon: Shield,
      category: "Reference"
    },
    { 
      id: "photo-docs", 
      title: "Photo Documentation", 
      description: "Document safety conditions and compliance",
      icon: Camera,
      category: "Documentation"
    },
    { 
      id: "team-briefing", 
      title: "Team Briefing", 
      description: "Pre-work safety briefings and toolbox talks",
      icon: Users,
      category: "Communication"
    },
    { 
      id: "near-miss", 
      title: "Near Miss Reports", 
      description: "Report and track safety incidents",
      icon: AlertTriangle,
      category: "Reporting"
    }
  ];

  const managementTools = [
    { 
      id: "equipment", 
      title: "Safety Equipment Tracker", 
      description: "Track PPE and safety equipment inventory",
      icon: Wrench,
      category: "Management"
    },
    { 
      id: "emergency", 
      title: "Emergency Procedures", 
      description: "Quick access to emergency protocols",
      icon: Phone,
      category: "Emergency"
    }
  ];

  const renderToolContent = () => {
    switch (activeView) {
      case "ai-rams":
        return <AIRAMSGenerator />;
      case "saved-rams":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Saved RAMS Documents</h2>
              <p className="text-muted-foreground">
                View and download your previously generated RAMS documentation
              </p>
            </div>
            <SavedRAMSLibrary />
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
        return <PhotoDocumentation />;
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
    return (
      <RAMSProvider>
        <div className="min-h-screen bg-background animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="mb-4 sm:mb-6">
              <Button
                onClick={() => setActiveView(null)}
                variant="outline"
                className="h-10 border-white/10 hover:border-elec-yellow/30 text-white/60 hover:text-white hover:bg-white/5"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Site Safety
              </Button>
            </div>
            {renderToolContent()}
          </div>
        </div>
      </RAMSProvider>
    );
  }

  return (
    <RAMSProvider>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Site Safety & RAMS
                </h1>
                <p className="text-sm sm:text-base text-white/50">
                  Generate RAMS documents, assess risks, and maintain safety compliance
                </p>
              </div>
              <BackButton customUrl="/electrician" label="Back" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-10">
          {/* Featured Tools */}
          <section>
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Star className="h-4 w-4 text-elec-yellow" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Essential Tools</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {primaryTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card
                    key={tool.id}
                    className="group bg-[#1e1e1e] border border-white/10 hover:border-elec-yellow/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0 group-hover:bg-elec-yellow/15 transition-colors">
                          <IconComponent className="h-6 w-6 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-base sm:text-lg font-semibold text-white group-hover:text-elec-yellow transition-colors">
                              {tool.title}
                            </CardTitle>
                            {tool.badge && (
                              <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-[10px] px-1.5 py-0">
                                {tool.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/50 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Safety Tools Grid */}
          <section>
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Safety Management</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {safetyTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card
                    key={tool.id}
                    className="group bg-[#1e1e1e] border border-white/10 hover:border-elec-yellow/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="p-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="h-11 w-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow/15 transition-colors">
                          <IconComponent className="h-5 w-5 text-elec-yellow" />
                        </div>
                      </div>
                      <CardTitle className="text-sm sm:text-base font-medium text-white group-hover:text-elec-yellow transition-colors mb-1">
                        {tool.title}
                      </CardTitle>
                      <p className="text-xs text-white/40 line-clamp-2 hidden sm:block">
                        {tool.description}
                      </p>
                      <Badge className="mt-2 bg-white/5 text-white/40 border-white/10 text-[10px]">
                        {tool.category}
                      </Badge>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Management Tools */}
          <section>
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Equipment & Emergency</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {managementTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card
                    key={tool.id}
                    className="group bg-[#1e1e1e] border border-white/10 hover:border-elec-yellow/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="p-4 sm:p-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0 group-hover:bg-elec-yellow/15 transition-colors">
                          <IconComponent className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm sm:text-base font-medium text-white group-hover:text-elec-yellow transition-colors">
                            {tool.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-white/40">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>


          {/* Modern Safety Best Practices */}
          <section>
            <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-white">
                      Safety Best Practices
                    </CardTitle>
                    <p className="text-sm text-white/50">
                      BS 7671 compliant electrical work guidelines
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center text-sm font-bold text-elec-yellow">1</div>
                      Before Starting Work
                    </h4>
                    <div className="space-y-2 pl-11">
                      {[
                        { title: "Complete risk assessment for each task", detail: "Identify hazards and plan control measures" },
                        { title: "Brief all team members on hazards", detail: "Ensure understanding of risks and emergency procedures" },
                        { title: "Check all safety equipment and PPE", detail: "Verify voltage detectors and protective gear" },
                        { title: "Verify isolation and permit to work", detail: "Confirm safe isolation and authorization" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-white/80 block">{item.title}</span>
                            <span className="text-xs text-white/40">{item.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center text-sm font-bold text-elec-yellow">2</div>
                      During Work
                    </h4>
                    <div className="space-y-2 pl-11">
                      {[
                        { title: "Follow method statements precisely", detail: "Adhere to approved procedures" },
                        { title: "Report near misses immediately", detail: "Document incidents to prevent accidents" },
                        { title: "Update risk assessments if conditions change", detail: "Re-evaluate when new hazards discovered" },
                        { title: "Use proper tools and equipment", detail: "Only use correctly rated instruments" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-white/80 block">{item.title}</span>
                            <span className="text-xs text-white/40">{item.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </RAMSProvider>
  );
};

export default SiteSafety;
