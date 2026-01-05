
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Play, CheckCircle } from 'lucide-react';

const TestingProcedures = () => {
  const testingTopics = [
    { title: 'Continuity Testing', status: 'Essential', description: 'Earth continuity and protective bonding' },
    { title: 'Insulation Resistance', status: 'Essential', description: 'Testing insulation between conductors' },
    { title: 'Earth Fault Loop Impedance', status: 'Critical', description: 'Zs measurements and validation' },
    { title: 'RCD Testing', status: 'Required', description: 'Residual current device verification' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Essential': return 'text-red-400';
      case 'Critical': return 'text-orange-400';
      case 'Required': return 'text-blue-400';
      default: return 'text-white/80';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Testing Procedures
        </CardTitle>
        <CardDescription className="text-white">
          Step-by-step testing guides and procedures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {testingTopics.map((topic, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg flex items-center justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{topic.title}</h4>
                  <span className={`text-xs font-medium ${getStatusColor(topic.status)}`}>
                    {topic.status}
                  </span>
                </div>
                <p className="text-sm text-white/80">{topic.description}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-elec-yellow hover:bg-elec-yellow hover:text-black">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <CheckCircle className="h-4 w-4 mr-2" />
          View All Testing Guides
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestingProcedures;
