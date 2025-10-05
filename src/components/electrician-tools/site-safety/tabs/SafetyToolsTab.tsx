import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Camera, Users, AlertTriangle, Wrench, Phone, ArrowRight, Star, Zap } from "lucide-react";

interface SafetyToolsTabProps {
  onToolSelect: (toolId: string) => void;
}

const SafetyToolsTab = ({ onToolSelect }: SafetyToolsTabProps) => {
  const primaryTools = [
    { 
      id: "integrated-rams", 
      title: "Professional RAMS Generator", 
      description: "Complete integrated risk assessment and method statement workflow",
      icon: FileText,
      featured: true,
      badge: "Professional"
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

  return (
    <div className="space-y-12">
      {/* Featured Tools */}
      <section>
        <div className="flex items-center gap-3 mb-8">
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
                onClick={() => onToolSelect(tool.id)}
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
                className="group border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col h-full"
                onClick={() => onToolSelect(tool.id)}
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
                
                <CardContent className="text-center flex-1 flex flex-col">
                  <p className="text-foreground/90 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-elec-yellow/80 mt-auto">
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
                onClick={() => onToolSelect(tool.id)}
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

      {/* Best Practices */}
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
            <p className="text-foreground/90">
              Essential guidelines for safe electrical work in compliance with BS 7671
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-5">
                <h4 className="font-semibold text-elec-yellow text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-base font-bold">1</div>
                  Before Starting Work
                </h4>
                <div className="space-y-3">
                  {[
                    { title: "Complete risk assessment for each task", detail: "Identify all electrical hazards and plan control measures" },
                    { title: "Brief all team members on hazards", detail: "Ensure everyone understands risks and emergency procedures" },
                    { title: "Check all safety equipment and PPE", detail: "Verify voltage detectors, insulated tools, and protective gear" },
                    { title: "Document site conditions", detail: "Record existing hazards and environmental factors" },
                    { title: "Verify isolation and permit to work", detail: "Confirm safe isolation and authorization to proceed" },
                    { title: "Review method statements", detail: "Understand step-by-step safe working procedures" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-foreground font-medium block">{item.title}</span>
                        <span className="text-foreground/70 text-sm">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-5">
                <h4 className="font-semibold text-elec-yellow text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-base font-bold">2</div>
                  During Work
                </h4>
                <div className="space-y-3">
                  {[
                    { title: "Follow method statements precisely", detail: "Adhere to approved procedures without deviation" },
                    { title: "Report near misses immediately", detail: "Document incidents to prevent future accidents" }, 
                    { title: "Take photos of safety concerns", detail: "Create visual evidence of hazards and conditions" },
                    { title: "Update risk assessments if conditions change", detail: "Re-evaluate when new hazards are discovered" },
                    { title: "Maintain safe working distances", detail: "Keep appropriate clearance from live equipment" },
                    { title: "Use proper tools and equipment", detail: "Only use correctly rated and calibrated instruments" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-foreground font-medium block">{item.title}</span>
                        <span className="text-foreground/70 text-sm">{item.detail}</span>
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
  );
};

export default SafetyToolsTab;
