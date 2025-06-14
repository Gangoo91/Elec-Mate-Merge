
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, Shield, CheckCircle } from 'lucide-react';

const CircuitTestingTab = () => {
  const testingCategories = [
    {
      title: 'Continuity Testing',
      icon: '🔗',
      description: 'Test protective conductor continuity',
      tests: ['R1+R2 Testing', 'Ring Circuit Continuity', 'Protective Bonding'],
      importance: 'Critical'
    },
    {
      title: 'Insulation Resistance',
      icon: '⚡',
      description: 'Measure insulation integrity',
      tests: ['Line to Earth', 'Line to Neutral', 'Between Lines'],
      importance: 'Critical'
    },
    {
      title: 'Earth Fault Loop',
      icon: '🌍',
      description: 'Verify earth fault protection',
      tests: ['Zs Measurement', 'Ze Testing', 'Fault Current Calculation'],
      importance: 'Critical'
    },
    {
      title: 'RCD Testing',
      icon: '🛡️',
      description: 'Test RCD operation and timing',
      tests: ['Trip Time Testing', 'Ramp Testing', 'Non-Trip Testing'],
      importance: 'High'
    },
    {
      title: 'Polarity Testing',
      icon: '🔄',
      description: 'Verify correct polarity connections',
      tests: ['Live Conductor Polarity', 'Switch Connections', 'Socket Outlets'],
      importance: 'Medium'
    },
    {
      title: 'Functional Testing',
      icon: '⚙️',
      description: 'Test operational functionality',
      tests: ['Switch Operation', 'Emergency Systems', 'Control Systems'],
      importance: 'Medium'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Circuit Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Comprehensive testing procedures for electrical circuits following BS 7671 requirements. 
            Each test category includes specific procedures, acceptable limits, and safety considerations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testingCategories.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <CardTitle className="text-lg text-white">{category.title}</CardTitle>
                    </div>
                    <Badge className={`${getImportanceColor(category.importance)} text-white`}>
                      {category.importance}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-white">Test Procedures:</h4>
                    <ul className="space-y-1">
                      {category.tests.map((test, testIndex) => (
                        <li key={testIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Start {category.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-blue-500/30 bg-blue-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <h4 className="font-medium text-blue-400">Safety Reminder</h4>
              </div>
              <p className="text-sm text-blue-200">
                Always ensure safe isolation before conducting any electrical tests. Use appropriate PPE 
                and follow your company's safety procedures. Verify test equipment calibration before use.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitTestingTab;
