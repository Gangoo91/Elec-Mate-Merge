
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Smartphone, Headset, Zap, Clock } from "lucide-react";

const ARTrainingTab = () => {
  const arFeatures = [
    {
      title: "Virtual Circuit Builder",
      description: "Build and test circuits in 3D space",
      status: "coming-soon",
      icon: Zap
    },
    {
      title: "Equipment Recognition",
      description: "Point camera at tools for instant info",
      status: "coming-soon",
      icon: Smartphone
    },
    {
      title: "Safety Simulation",
      description: "Practice hazard identification safely",
      status: "development",
      icon: Headset
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2 text-lg">
            <Eye className="h-5 w-5" />
            Augmented Reality Training
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Experience hands-on learning with cutting-edge AR technology
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {arFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-purple-500/20 bg-purple-500/5">
                <feature.icon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <Badge 
                      variant="outline" 
                      className="text-xs border-amber-500/60 text-amber-400 bg-amber-500/10 flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {feature.status === 'coming-soon' ? 'Coming Soon' : 'In Development'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-100">
              📱 AR features will be available through the Elec-Mate mobile app. 
              Stay tuned for exciting developments in immersive electrical training!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARTrainingTab;
