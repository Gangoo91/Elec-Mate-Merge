
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Zap, 
  HardHat, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Play
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SafetyKnowledgeTab = () => {
  const isMobile = useIsMobile();
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const safetyModules = [
    {
      id: "electrical-hazards",
      title: "Electrical Hazards & Risks",
      icon: Zap,
      description: "Understanding electrical dangers and risk assessment",
      topics: ["Arc Flash", "Electric Shock", "Burns", "Fire Hazards"],
      duration: "25 min",
      difficulty: "Essential",
      progress: 75
    },
    {
      id: "ppe-safety",
      title: "Personal Protective Equipment",
      icon: HardHat,
      description: "Proper selection and use of safety equipment",
      topics: ["Safety Helmets", "Eye Protection", "Gloves", "Footwear"],
      duration: "20 min",
      difficulty: "Essential", 
      progress: 60
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      icon: Shield,
      description: "Step-by-step isolation and testing procedures",
      topics: ["Lock-out Tag-out", "Proving Dead", "Isolation Points"],
      duration: "30 min",
      difficulty: "Critical",
      progress: 40
    },
    {
      id: "emergency-response",
      title: "Emergency Response",
      icon: AlertTriangle,
      description: "Actions to take during electrical emergencies",
      topics: ["First Aid", "Emergency Contacts", "Evacuation", "Incident Reporting"],
      duration: "35 min",
      difficulty: "Essential",
      progress: 20
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Critical": return "bg-red-500/20 text-red-400 border-red-400/30";
      case "Essential": return "bg-amber-500/20 text-amber-400 border-amber-400/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    }
  };

  const markAsCompleted = (moduleId: string) => {
    if (!completedTopics.includes(moduleId)) {
      setCompletedTopics([...completedTopics, moduleId]);
    }
  };

  const ModuleCard = ({ module }: { module: any }) => {
    const Icon = module.icon;
    const isCompleted = completedTopics.includes(module.id);
    
    return (
      <Card className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-all duration-200 ${
        isMobile ? 'mb-4' : ''
      } ${isCompleted ? 'ring-2 ring-green-500/30' : ''}`}>
        <CardHeader className={`${isMobile ? 'pb-3' : 'pb-4'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-elec-yellow/10 ${isMobile ? 'p-1.5' : ''}`}>
                <Icon className={`text-elec-yellow ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </div>
              <div className="flex-1">
                <CardTitle className={`text-elec-light ${isMobile ? 'text-base' : 'text-lg'}`}>
                  {module.title}
                </CardTitle>
                <p className={`text-elec-light/70 ${isMobile ? 'text-xs mt-1' : 'text-sm mt-2'}`}>
                  {module.description}
                </p>
              </div>
            </div>
            {isCompleted && (
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            )}
          </div>
        </CardHeader>
        
        <CardContent className={`space-y-4 ${isMobile ? 'pt-0' : ''}`}>
          <div className="flex flex-wrap gap-2">
            {module.topics.map((topic: string, idx: number) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className={`border-elec-yellow/30 text-elec-light bg-elec-dark/50 ${
                  isMobile ? 'text-xs px-2 py-1' : 'text-sm'
                }`}
              >
                {topic}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Progress
              </span>
              <span className={`text-elec-yellow font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {module.progress}%
              </span>
            </div>
            <Progress 
              value={module.progress} 
              className={`bg-elec-dark ${isMobile ? 'h-2' : 'h-3'}`}
            />
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'}`}>
            <div className={`flex items-center gap-4 ${isMobile ? 'text-xs' : 'text-sm'} text-elec-light/70`}>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{module.duration}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`${getDifficultyColor(module.difficulty)} ${isMobile ? 'text-xs' : ''}`}
              >
                {module.difficulty}
              </Badge>
            </div>
            
            <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className={`border-elec-yellow/30 hover:bg-elec-yellow/10 text-elec-yellow ${
                  isMobile ? 'flex-1' : ''
                }`}
                onClick={() => setActiveModule(module.id)}
              >
                <Play className="h-4 w-4 mr-1" />
                {isMobile ? "Start" : "Start Module"}
              </Button>
              
              {!isCompleted && (
                <Button
                  variant="ghost"
                  size={isMobile ? "sm" : "default"}
                  className={`text-green-400 hover:bg-green-400/10 ${
                    isMobile ? 'flex-1' : ''
                  }`}
                  onClick={() => markAsCompleted(module.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {isMobile ? "Complete" : "Mark Complete"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const OverviewStats = () => (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-6'} mb-6`}>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-elec-yellow font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {safetyModules.length}
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Total Modules
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-green-400 font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {completedTopics.length}
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Completed
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-blue-400 font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {Math.round(safetyModules.reduce((acc, mod) => acc + mod.progress, 0) / safetyModules.length)}%
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Avg Progress
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-amber-400 font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            110
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Total Minutes
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`space-y-6 ${isMobile ? 'px-2' : ''}`}>
      <div className="text-center space-y-4">
        <h2 className={`font-bold text-elec-light ${isMobile ? 'text-xl' : 'text-2xl'}`}>
          Safety Knowledge Hub
        </h2>
        <p className={`text-elec-light/70 max-w-2xl mx-auto ${isMobile ? 'text-sm px-4' : ''}`}>
          Essential safety knowledge modules to keep you and your colleagues safe on-site. 
          Complete these modules to build comprehensive safety awareness.
        </p>
      </div>

      <OverviewStats />

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className={`grid w-full grid-cols-3 bg-elec-dark border border-elec-yellow/20 ${
          isMobile ? 'h-auto' : ''
        }`}>
          <TabsTrigger 
            value="modules" 
            className={`flex items-center gap-2 ${isMobile ? 'text-xs p-2' : ''}`}
          >
            <BookOpen className="h-4 w-4" />
            {isMobile ? "Modules" : "Safety Modules"}
          </TabsTrigger>
          <TabsTrigger 
            value="quick-reference" 
            className={`flex items-center gap-2 ${isMobile ? 'text-xs p-2' : ''}`}
          >
            <Star className="h-4 w-4" />
            {isMobile ? "Reference" : "Quick Reference"}
          </TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className={`flex items-center gap-2 ${isMobile ? 'text-xs p-2' : ''}`}
          >
            <ChevronRight className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-6">
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {safetyModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-reference" className="mt-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
            <Card className="border-red-500/30 bg-red-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-red-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>Emergency:</span>
                  <span className="font-mono">999</span>
                </div>
                <div className="flex justify-between">
                  <span>Health & Safety:</span>
                  <span className="font-mono">0845 345 0055</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-500/30 bg-amber-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-amber-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Zap className="h-5 w-5" />
                  Voltage Levels
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>Low Voltage:</span>
                  <span>Up to 1kV</span>
                </div>
                <div className="flex justify-between">
                  <span>High Voltage:</span>
                  <span>Above 1kV</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-green-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Shield className="h-5 w-5" />
                  Safety Checks
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div>✓ Visual inspection</div>
                <div>✓ Test equipment</div>
                <div>✓ Isolation procedures</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className={`text-elec-yellow ${isMobile ? 'text-base' : ''}`}>
                  Safety Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  BS 7671 Safety Guide
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <HardHat className="h-4 w-4 mr-2" />
                  PPE Requirements Chart
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Risk Assessment Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className={`text-elec-yellow ${isMobile ? 'text-base' : ''}`}>
                  Training Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Safe Isolation Procedure
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Emergency Response
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 ${
                    isMobile ? 'text-sm h-9' : ''
                  }`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  PPE Selection Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafetyKnowledgeTab;
