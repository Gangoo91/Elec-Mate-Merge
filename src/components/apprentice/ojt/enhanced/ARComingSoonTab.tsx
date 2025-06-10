
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Zap, 
  Smartphone, 
  BookOpen, 
  Settings, 
  AlertTriangle,
  Lightbulb,
  Target,
  Wrench,
  Camera
} from "lucide-react";

const ARComingSoonTab = () => {
  const arFeatures = [
    {
      title: "Live Circuit Visualisation",
      description: "Point your device at electrical panels to see live circuit mapping and current flow visualisation",
      icon: Zap,
      status: "In Development"
    },
    {
      title: "Interactive Installation Guides",
      description: "Step-by-step AR overlays showing exactly where to install components and run cables",
      icon: Target,
      status: "Coming Q2 2025"
    },
    {
      title: "Safety Hazard Detection",
      description: "Real-time identification of potential electrical hazards through your camera",
      icon: AlertTriangle,
      status: "Research Phase"
    },
    {
      title: "Virtual Testing Equipment",
      description: "Simulate multimeter readings and testing procedures in augmented reality",
      icon: Settings,
      status: "Planned"
    }
  ];

  const currentCapabilities = [
    "Camera access for future AR functionality",
    "3D visualisation foundation",
    "Real-time data processing pipeline",
    "Mobile-optimised interface design"
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/20 to-orange-500/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Eye className="h-16 w-16 text-elec-yellow" />
              <div className="absolute -top-2 -right-2">
                <Badge variant="outline" className="bg-elec-yellow text-black font-semibold">
                  AR
                </Badge>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl text-elec-yellow">
            Augmented Reality Training
          </CardTitle>
          <p className="text-lg text-muted-foreground mt-2">
            The future of electrical apprentice training is here
          </p>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 mt-4">
            Coming Soon
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-200 leading-relaxed">
              Experience hands-on electrical training like never before with our upcoming AR features. 
              Point your device at real electrical installations and see interactive overlays, 
              safety information, and step-by-step guidance in real-time.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" className="border-elec-yellow/50 text-elec-yellow">
                <Lightbulb className="mr-2 h-4 w-4" />
                Join Beta Waitlist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planned Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arFeatures.map((feature, index) => (
          <Card key={index} className="border-gray-700 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-elec-yellow" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    feature.status === 'In Development' ? 'border-green-500/50 text-green-400' :
                    feature.status === 'Coming Q2 2025' ? 'border-blue-500/50 text-blue-400' :
                    feature.status === 'Research Phase' ? 'border-purple-500/50 text-purple-400' :
                    'border-gray-500/50 text-gray-400'
                  }`}
                >
                  {feature.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Progress */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Development Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We're building the foundation for AR capabilities with these current features:
            </p>
            <ul className="space-y-2">
              {currentCapabilities.map((capability, index) => (
                <li key={index} className="text-sm text-gray-200 flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  {capability}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Get Ready for AR</h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure your device has camera permissions enabled. When AR features launch, 
                    you'll be able to access them directly from this interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Preview */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            AR Preview Concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Here's what you'll experience with our AR features:
            </p>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-purple-500/30">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-48 h-32 bg-gradient-to-br from-elec-yellow/20 to-orange-500/20 rounded-lg border-2 border-dashed border-elec-yellow/50 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                      <p className="text-sm text-elec-yellow font-semibold">AR View</p>
                      <p className="text-xs text-muted-foreground">Camera + Overlays</p>
                    </div>
                  </div>
                  
                  {/* Simulated AR Elements */}
                  <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
                    ⚠️ 240V Live
                  </div>
                  <div className="absolute bottom-2 left-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded">
                    ✅ Safe to work
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-elec-yellow rounded-full animate-pulse" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-300">
                  Point your camera at electrical equipment and see live safety information, 
                  voltage readings, and interactive guidance overlaid in real-time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Note */}
      <Card className="border-gray-600 bg-elec-gray/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 mt-1" />
            <div>
              <p className="font-semibold text-gray-300 mb-1">Development Note</p>
              <p>
                AR functionality requires advanced camera processing and 3D rendering capabilities. 
                We're working with industry partners to ensure our AR features meet the highest 
                standards for electrical training and safety compliance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARComingSoonTab;
