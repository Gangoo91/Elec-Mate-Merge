
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, AlertTriangle, Camera, Users, ClipboardCheck, Wrench, Phone, ArrowRight, Zap, Star } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { RAMSProvider } from "@/components/electrician-tools/site-safety/rams/RAMSContext";
import { RAMSQuickAdd } from "@/components/electrician-tools/site-safety/RAMSQuickAdd";
import RAMSGenerator from "@/components/electrician-tools/site-safety/RAMSGenerator";
import MethodStatementGenerator from "@/components/electrician-tools/site-safety/MethodStatementGenerator";
import EnhancedHazardDatabase from "@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase";
import PhotoDocumentation from "@/components/electrician-tools/site-safety/PhotoDocumentation";
import TeamBriefingTemplates from "@/components/electrician-tools/site-safety/TeamBriefingTemplates";
import NearMissReporting from "@/components/electrician-tools/site-safety/NearMissReporting";
import SafetyEquipmentTracker from "@/components/electrician-tools/site-safety/SafetyEquipmentTracker";
import EmergencyProcedures from "@/components/electrician-tools/site-safety/EmergencyProcedures";

const SiteSafety = () => {
  const [activeView, setActiveView] = useState<string | null>(null);

  const primaryTools = [
    { 
      id: "rams", 
      title: "Risk Assessment & Method Statements", 
      description: "Generate comprehensive RAMS documents for electrical work",
      icon: FileText,
      featured: true,
      badge: "Popular"
    },
    { 
      id: "method-statement", 
      title: "Method Statement Generator", 
      description: "Create detailed step-by-step work procedures",
      icon: ClipboardCheck,
      featured: true,
      badge: "Essential"
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
        <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-elec-gray animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="mb-6">
              <Button 
                onClick={() => setActiveView(null)}
                variant="outline" 
                className="mb-4 border-elec-yellow/30 hover:border-elec-yellow/60 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to {[...primaryTools, ...safetyTools, ...managementTools].find(tool => tool.id === activeView)?.title || 'Site Safety'}
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
      <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-elec-gray">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12 relative">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                  <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-elec-yellow" />
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Site Safety & Risk Assessment
              </h1>
              
              <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
                <span className="hidden sm:inline">Comprehensive safety management tools for electrical contractors. Generate RAMS documents, assess risks, and maintain safety compliance on all your projects.</span>
                <span className="sm:hidden">Essential safety tools for electrical contractors. Generate RAMS, assess risks, and maintain compliance.</span>
              </p>
              
              <div className="flex justify-center pt-2 sm:pt-4">
                <BackButton customUrl="/electrician" label="Back to Electrical Hub" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-12 space-y-12 animate-fade-in">
          {/* Featured Tools */}
          <section>
            <div className="flex items-center gap-3 mb-8 pt-4">
              <Star className="h-6 w-6 text-elec-yellow" />
              <h2 className="text-2xl font-bold">Essential Safety Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {primaryTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card 
                    key={tool.id}
                    className="group relative overflow-hidden border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-card/80 hover:border-elec-yellow/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-elec-yellow transition-colors">
                            {tool.title}
                          </CardTitle>
                          <p className="text-foreground/90 text-sm leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/70">Click to open</span>
                        <ArrowRight className="h-4 w-4 text-elec-yellow group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Safety Tools Grid */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-6 w-6 text-elec-yellow" />
              <h2 className="text-2xl font-bold">Safety Management Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card 
                    key={tool.id}
                    className="group border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-3">
                        <div className="p-3 rounded-full bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-elec-yellow" />
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-elec-yellow transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <p className="text-foreground/90 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-elec-yellow/80">
                        <span>{tool.category}</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Management Tools */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="h-6 w-6 text-elec-yellow" />
              <h2 className="text-2xl font-bold">Equipment & Emergency</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {managementTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card 
                    key={tool.id}
                    className="group border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setActiveView(tool.id)}
                  >
                    <CardHeader className="flex-row items-center space-y-0 gap-4">
                      <div className="p-3 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-elec-yellow transition-colors">
                          {tool.title}
                        </CardTitle>
                        <p className="text-foreground/90 text-sm">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-elec-yellow group-hover:translate-x-1 transition-transform" />
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Quick Add Section */}
          <RAMSQuickAdd />

          {/* Modern Safety Best Practices */}
          <section>
            <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-elec-yellow/20">
                    <Shield className="h-8 w-8 text-elec-yellow" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-elec-yellow">
                  Safety Best Practices
                </CardTitle>
                <p className="text-muted-foreground">
                  Essential guidelines for safe electrical work
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-elec-yellow text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-sm">1</div>
                      Before Starting Work
                    </h4>
                    <div className="space-y-4 pl-10">
                      {[
                        "Complete risk assessment for each task",
                        "Brief all team members on hazards",
                        "Check all safety equipment",
                        "Document site conditions"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-left">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-semibold text-elec-yellow text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-sm">2</div>
                      During Work
                    </h4>
                    <div className="space-y-4 pl-10">
                      {[
                        "Follow method statements precisely",
                        "Report near misses immediately", 
                        "Take photos of safety concerns",
                        "Update risk assessments if conditions change"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-left">{item}</span>
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
