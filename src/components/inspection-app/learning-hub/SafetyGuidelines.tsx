
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

const SafetyGuidelines = () => {
  const safetyTopics = [
    { title: 'Safe Isolation Procedures', priority: 'Critical', icon: AlertTriangle },
    { title: 'Personal Protective Equipment', priority: 'Essential', icon: Shield },
    { title: 'Risk Assessment', priority: 'Required', icon: CheckCircle2 },
    { title: 'Emergency Procedures', priority: 'Critical', icon: AlertTriangle },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-400 bg-red-400/10';
      case 'Essential': return 'text-orange-400 bg-orange-400/10';
      case 'Required': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Safety Guidelines
        </CardTitle>
        <CardDescription className="text-gray-300">
          Essential safety protocols and procedures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {safetyTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <div key={index} className="p-3 bg-muted rounded-lg flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(topic.priority)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-foreground">{topic.title}</h4>
                  <span className={`text-xs font-medium ${getPriorityColor(topic.priority).split(' ')[0]}`}>
                    {topic.priority}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Shield className="h-4 w-4 mr-2" />
          Access Safety Resources
        </Button>
      </CardContent>
    </Card>
  );
};

export default SafetyGuidelines;
