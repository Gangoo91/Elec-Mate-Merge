
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Zap, Headphones, Smartphone, Calendar, Clock, Star } from "lucide-react";

const ARTrainingTab = () => {
  const arFeatures = [
    {
      title: "3D Circuit Visualisation",
      description: "See electrical circuits in 3D space with real-time current flow animations",
      icon: Zap,
      status: "In Development"
    },
    {
      title: "Virtual Equipment Training",
      description: "Practice with virtual test equipment before using the real thing",
      icon: Smartphone,
      status: "Planned"
    },
    {
      title: "Interactive Safety Scenarios",
      description: "Experience safety situations in a controlled virtual environment",
      icon: Eye,
      status: "Research Phase"
    },
    {
      title: "Remote Mentoring",
      description: "Share your view with mentors for real-time guidance on-site",
      icon: Headphones,
      status: "Concept"
    }
  ];

  const developmentMilestones = [
    { phase: "Research & Design", progress: 100, status: "Complete" },
    { phase: "Prototype Development", progress: 75, status: "In Progress" },
    { phase: "Beta Testing", progress: 0, status: "Upcoming" },
    { phase: "Public Release", progress: 0, status: "2025 Q3" }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-600/10">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-400 flex items-center justify-center gap-2 text-2xl">
            <Eye className="h-6 w-6" />
            Augmented Reality Training
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            The future of electrical apprentice training is here
          </p>
          <Badge variant="outline" className="self-center bg-blue-500/20 text-blue-300 border-blue-500/50">
            Coming Soon - 2025 Q3
          </Badge>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-8 border border-blue-500/30">
            <Eye className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Imagine being able to see electrical circuits in 3D, practice with virtual equipment, 
              and receive real-time guidance from mentors - all through augmented reality.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Planned AR Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Star className="h-5 w-5" />
            Planned AR Features
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Revolutionary training experiences powered by augmented reality technology
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arFeatures.map((feature, index) => (
              <Card key={index} className="border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-blue-400" />
                    {feature.title}
                  </CardTitle>
                  <Badge variant="outline" className="self-start text-xs">
                    {feature.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Development Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Development Progress
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track our progress towards bringing AR training to Elec-Mate
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {developmentMilestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{milestone.phase}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      milestone.status === 'Complete' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                      milestone.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' :
                      'bg-gray-500/20 text-gray-300 border-gray-500/50'
                    }`}
                  >
                    {milestone.status}
                  </Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      milestone.progress === 100 ? 'bg-green-500' :
                      milestone.progress > 0 ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {milestone.progress}% Complete
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive AR Preview Concept */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-600/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            AR Preview Concept
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get a glimpse of what AR training will look like
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-purple-500/50">
                  <Eye className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-purple-300 font-semibold">AR Experience Preview</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Point your device at electrical equipment to see interactive 3D overlays, 
                    safety information, and step-by-step guidance.
                  </p>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-purple-500 text-white">
                    Demo Coming Soon
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Circuit Visualisation</p>
                </div>
                <div className="text-center">
                  <Smartphone className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Mobile Compatible</p>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Real-time Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stay Updated */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow">Stay Updated</CardTitle>
          <p className="text-sm text-muted-foreground">
            Be the first to know when AR training becomes available
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" variant="outline">
              Join AR Beta List
            </Button>
            <Button className="flex-1">
              Get Notified on Release
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Expected release: Q3 2025 • Beta testing available Q2 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARTrainingTab;
