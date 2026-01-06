
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
      description: "Understanding electrical dangers, risk assessment methodologies, and hazard identification techniques for UK electrical installations",
      topics: ["Arc Flash Hazards", "Electric Shock Mechanisms", "Thermal Burns", "Fire Hazards", "Secondary Injuries"],
      duration: "35 min",
      difficulty: "Essential",
      progress: 75,
      learningOutcomes: [
        "Identify the five main electrical hazards in the workplace",
        "Understand how electric shock affects the human body",
        "Calculate arc flash incident energy levels",
        "Recognise fire risk factors in electrical installations"
      ],
      keyRegulations: ["Electricity at Work Regulations 1989", "BS 7671:2018", "HASAWA 1974"]
    },
    {
      id: "ppe-safety",
      title: "Personal Protective Equipment",
      icon: HardHat,
      description: "Comprehensive guide to selecting, using, and maintaining PPE for electrical work in compliance with UK standards",
      topics: ["Safety Helmets (BS EN 397)", "Eye Protection", "Insulated Gloves", "Safety Footwear", "Arc Flash PPE", "Hi-Vis Clothing"],
      duration: "30 min",
      difficulty: "Essential",
      progress: 60,
      learningOutcomes: [
        "Select appropriate PPE for different electrical tasks",
        "Understand PPE inspection and maintenance requirements",
        "Know the voltage ratings for insulated equipment",
        "Recognise when PPE needs replacement"
      ],
      keyRegulations: ["PPE at Work Regulations 1992", "BS EN 61482", "GS38"]
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      icon: Shield,
      description: "Step-by-step safe isolation procedures including lock-out/tag-out, proving dead, and permit-to-work systems",
      topics: ["Lock-out Tag-out (LOTO)", "Proving Dead Procedure", "Isolation Points", "Permit Systems", "Multi-Lock Isolation"],
      duration: "45 min",
      difficulty: "Critical",
      progress: 40,
      learningOutcomes: [
        "Execute the complete safe isolation procedure",
        "Use voltage indicators and proving units correctly",
        "Apply personal locks and tags appropriately",
        "Understand permit-to-work requirements"
      ],
      keyRegulations: ["EAWR 1989 Regulation 12-14", "BS EN 50110", "HSE GS38"]
    },
    {
      id: "emergency-response",
      title: "Emergency Response & First Aid",
      icon: AlertTriangle,
      description: "Emergency procedures for electrical incidents, first aid for electric shock, and incident reporting requirements",
      topics: ["Electric Shock First Aid", "Emergency Contacts", "Evacuation Procedures", "RIDDOR Reporting", "Scene Safety"],
      duration: "40 min",
      difficulty: "Essential",
      progress: 20,
      learningOutcomes: [
        "Respond safely to electrical emergencies",
        "Administer appropriate first aid for electric shock",
        "Complete RIDDOR reports correctly",
        "Coordinate with emergency services"
      ],
      keyRegulations: ["Health and Safety (First Aid) Regulations 1981", "RIDDOR 2013", "HASAWA 1974"]
    },
    {
      id: "working-at-height",
      title: "Working at Height Safety",
      icon: HardHat,
      description: "Safe practices for electrical work at height including ladder safety, scaffold requirements, and fall protection",
      topics: ["Ladder Selection & Use", "Mobile Platforms (MEWPs)", "Scaffold Safety", "Fall Arrest Systems", "Roof Work"],
      duration: "35 min",
      difficulty: "Essential",
      progress: 0,
      learningOutcomes: [
        "Select appropriate access equipment for the task",
        "Inspect ladders and platforms before use",
        "Understand fall protection requirements",
        "Recognise fragile surface hazards"
      ],
      keyRegulations: ["Work at Height Regulations 2005", "BS EN 131", "HSE INDG401"]
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment Methods",
      icon: Shield,
      description: "Practical risk assessment techniques for electrical work including hazard identification and control measures",
      topics: ["5-Step Risk Assessment", "Hazard Identification", "Control Hierarchy", "Method Statements", "Dynamic Risk Assessment"],
      duration: "40 min",
      difficulty: "Essential",
      progress: 0,
      learningOutcomes: [
        "Conduct a thorough risk assessment for electrical tasks",
        "Apply the hierarchy of controls effectively",
        "Write clear method statements",
        "Perform dynamic risk assessments on site"
      ],
      keyRegulations: ["Management of Health and Safety at Work Regulations 1999", "CDM 2015", "HASAWA 1974"]
    },
    {
      id: "confined-spaces",
      title: "Confined Space Working",
      icon: AlertTriangle,
      description: "Safety requirements for electrical work in confined spaces including gas testing, ventilation, and rescue procedures",
      topics: ["Confined Space Definition", "Atmospheric Testing", "Ventilation Requirements", "Rescue Procedures", "Permit Systems"],
      duration: "45 min",
      difficulty: "Critical",
      progress: 0,
      learningOutcomes: [
        "Identify confined spaces in electrical installations",
        "Conduct atmospheric monitoring correctly",
        "Understand emergency rescue requirements",
        "Apply confined space permit procedures"
      ],
      keyRegulations: ["Confined Spaces Regulations 1997", "BS 7671 Section 706", "HSE L101"]
    },
    {
      id: "manual-handling",
      title: "Manual Handling for Electricians",
      icon: HardHat,
      description: "Safe manual handling techniques for electrical equipment, cables, and heavy components",
      topics: ["TILE Assessment", "Lifting Techniques", "Mechanical Aids", "Cable Handling", "Team Lifting"],
      duration: "25 min",
      difficulty: "Essential",
      progress: 0,
      learningOutcomes: [
        "Apply TILE risk assessment to manual handling tasks",
        "Use correct lifting techniques for electrical equipment",
        "Select appropriate mechanical handling aids",
        "Organise team lifts safely"
      ],
      keyRegulations: ["Manual Handling Operations Regulations 1992", "HSE INDG143", "L23 Guidance"]
    },
    {
      id: "hazardous-areas",
      title: "Hazardous Area Working",
      icon: Zap,
      description: "Electrical safety in explosive atmospheres, DSEAR compliance, and Ex-rated equipment selection",
      topics: ["Zone Classification", "ATEX/DSEAR Requirements", "Ex Equipment Types", "Hot Work Permits", "Intrinsic Safety"],
      duration: "50 min",
      difficulty: "Critical",
      progress: 0,
      learningOutcomes: [
        "Understand zone classification for explosive atmospheres",
        "Select appropriate Ex-rated equipment",
        "Apply DSEAR requirements to electrical work",
        "Recognise ignition sources in hazardous areas"
      ],
      keyRegulations: ["DSEAR 2002", "BS EN 60079 Series", "ATEX Directive 2014/34/EU"]
    },
    {
      id: "site-safety",
      title: "Construction Site Safety",
      icon: HardHat,
      description: "Site-specific safety requirements for electrical work on construction sites under CDM regulations",
      topics: ["CDM Duties", "Site Inductions", "Temporary Supplies", "Coordination Requirements", "Welfare Facilities"],
      duration: "30 min",
      difficulty: "Essential",
      progress: 0,
      learningOutcomes: [
        "Understand CDM duty holder responsibilities",
        "Comply with site induction requirements",
        "Install and maintain temporary electrical supplies safely",
        "Coordinate work with other trades"
      ],
      keyRegulations: ["CDM Regulations 2015", "BS 7671 Section 704", "HSE L153"]
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
      <Card className={`border-elec-yellow/20 bg-white/5 hover:bg-white/5 transition-all duration-200 ${
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
                className={`border-elec-yellow/30 text-elec-light bg-white/10 ${
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
              className={`bg-white/10 ${isMobile ? 'h-2' : 'h-3'}`}
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
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-elec-yellow font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {safetyModules.length}
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Total Modules
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-green-400 font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {completedTopics.length}
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Completed
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
          <div className={`text-blue-400 font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {Math.round(safetyModules.reduce((acc, mod) => acc + mod.progress, 0) / safetyModules.length)}%
          </div>
          <div className={`text-elec-light/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Avg Progress
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-white/5">
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
        <TabsList className={`grid w-full grid-cols-3 bg-white/10 border border-elec-yellow/20 ${
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

        <TabsContent value="quick-reference" className="mt-6 space-y-6">
          {/* Emergency Information */}
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
                  <span>Emergency Services:</span>
                  <span className="font-mono font-bold text-red-400">999</span>
                </div>
                <div className="flex justify-between">
                  <span>HSE Incident Line:</span>
                  <span className="font-mono">0345 300 9923</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Emergency:</span>
                  <span className="font-mono">0800 111 999</span>
                </div>
                <div className="flex justify-between">
                  <span>Electricity DNO:</span>
                  <span className="font-mono">105</span>
                </div>
                <div className="flex justify-between">
                  <span>Poison Control:</span>
                  <span className="font-mono">0344 892 0111</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-amber-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-amber-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Zap className="h-5 w-5" />
                  Voltage Classifications
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>Extra Low Voltage:</span>
                  <span>≤50V AC / ≤120V DC</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Voltage:</span>
                  <span>50V - 1000V AC</span>
                </div>
                <div className="flex justify-between">
                  <span>High Voltage:</span>
                  <span>&gt;1000V AC</span>
                </div>
                <div className="flex justify-between">
                  <span>UK Mains:</span>
                  <span>230V ±10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Three Phase:</span>
                  <span>400V between phases</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-green-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Shield className="h-5 w-5" />
                  Safe Isolation Steps
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">1</span> Identify circuit</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">2</span> Switch off supply</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">3</span> Isolate at point</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">4</span> Secure isolation (lock)</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">5</span> Prove voltage indicator</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">6</span> Test for dead</div>
                <div className="flex items-center gap-2"><span className="bg-green-500/30 px-2 py-0.5 rounded text-xs">7</span> Re-prove indicator</div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row - More Reference Cards */}
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
            <Card className="border-blue-500/30 bg-blue-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-blue-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Clock className="h-5 w-5" />
                  RCD Trip Times
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>30mA @ rated (IΔn):</span>
                  <span>≤300ms</span>
                </div>
                <div className="flex justify-between">
                  <span>30mA @ 5×IΔn:</span>
                  <span>≤40ms</span>
                </div>
                <div className="flex justify-between">
                  <span>100mA @ rated:</span>
                  <span>≤300ms</span>
                </div>
                <div className="flex justify-between">
                  <span>S-Type delay:</span>
                  <span>130-500ms</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-purple-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <Zap className="h-5 w-5" />
                  MCB Disconnection Times
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>TN System ≤32A:</span>
                  <span>0.4 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>TN System &gt;32A:</span>
                  <span>5 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>TT System:</span>
                  <span>0.2 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Distribution circuits:</span>
                  <span>5 seconds max</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-orange-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <AlertTriangle className="h-5 w-5" />
                  Electric Shock Effects
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-2 ${isMobile ? 'text-sm' : ''}`}>
                <div className="flex justify-between">
                  <span>1mA:</span>
                  <span>Perception threshold</span>
                </div>
                <div className="flex justify-between">
                  <span>5mA:</span>
                  <span>Pain threshold</span>
                </div>
                <div className="flex justify-between">
                  <span>10-30mA:</span>
                  <span>Muscle contraction</span>
                </div>
                <div className="flex justify-between">
                  <span>30-75mA:</span>
                  <span>Respiratory arrest</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt;75mA:</span>
                  <span>Ventricular fibrillation</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row - Key Standards */}
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <Card className="border-elec-yellow/30 bg-elec-yellow/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-elec-yellow flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <BookOpen className="h-5 w-5" />
                  Key UK Regulations
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${isMobile ? 'text-sm' : ''}`}>
                <div className="border-b border-elec-yellow/20 pb-2">
                  <div className="font-medium text-elec-yellow">EAWR 1989</div>
                  <div className="text-xs text-white">Electricity at Work Regulations - Criminal law for electrical safety</div>
                </div>
                <div className="border-b border-elec-yellow/20 pb-2">
                  <div className="font-medium text-elec-yellow">BS 7671:2018 +A2:2022</div>
                  <div className="text-xs text-white">18th Edition IET Wiring Regulations - Technical standard</div>
                </div>
                <div className="border-b border-elec-yellow/20 pb-2">
                  <div className="font-medium text-elec-yellow">HASAWA 1974</div>
                  <div className="text-xs text-white">Health & Safety at Work Act - General duties</div>
                </div>
                <div className="border-b border-elec-yellow/20 pb-2">
                  <div className="font-medium text-elec-yellow">CDM 2015</div>
                  <div className="text-xs text-white">Construction Design & Management Regulations</div>
                </div>
                <div>
                  <div className="font-medium text-elec-yellow">Building Regs Part P</div>
                  <div className="text-xs text-white">Electrical safety in dwellings - England & Wales</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-500/10">
              <CardHeader className={isMobile ? "pb-3" : ""}>
                <CardTitle className={`text-cyan-400 flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                  <HardHat className="h-5 w-5" />
                  PPE Voltage Ratings
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${isMobile ? 'text-sm' : ''}`}>
                <div className="border-b border-cyan-500/20 pb-2">
                  <div className="font-medium text-cyan-400">Class 00 Gloves</div>
                  <div className="text-xs text-white">Max 500V AC / 750V DC - Beige colour</div>
                </div>
                <div className="border-b border-cyan-500/20 pb-2">
                  <div className="font-medium text-cyan-400">Class 0 Gloves</div>
                  <div className="text-xs text-white">Max 1000V AC / 1500V DC - Red colour</div>
                </div>
                <div className="border-b border-cyan-500/20 pb-2">
                  <div className="font-medium text-cyan-400">Class 1 Gloves</div>
                  <div className="text-xs text-white">Max 7500V AC / 11250V DC - White colour</div>
                </div>
                <div className="border-b border-cyan-500/20 pb-2">
                  <div className="font-medium text-cyan-400">GS38 Test Leads</div>
                  <div className="text-xs text-white">Fused, shrouded, max 4mm exposed tip</div>
                </div>
                <div>
                  <div className="font-medium text-cyan-400">Arc Flash PPE</div>
                  <div className="text-xs text-white">Rated in cal/cm² - Match to incident energy</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <Card className="border-elec-yellow/20 bg-white/5">
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
            
            <Card className="border-elec-yellow/20 bg-white/5">
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
