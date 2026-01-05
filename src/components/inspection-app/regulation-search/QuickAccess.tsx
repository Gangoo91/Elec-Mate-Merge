
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Zap, Shield, TestTube, Home, AlertTriangle } from 'lucide-react';

interface QuickAccessProps {
  onRegulationClick: (regNumber: string) => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onRegulationClick }) => {
  const quickAccessSections = [
    {
      title: 'Testing Essentials',
      icon: TestTube,
      color: 'text-green-400',
      regulations: ['612.1', '612.2.1', '612.3.1', '612.6', '612.8', '612.10']
    },
    {
      title: 'Protection Requirements',
      icon: Shield,
      color: 'text-red-400',
      regulations: ['411.3.3', '415.1.1', '411.4.5', '433.1.1', 'Table 41.3']
    },
    {
      title: 'Installation Standards',
      icon: Home,
      color: 'text-blue-400',
      regulations: ['522.6.204', '526.3', '537.2.1.1', '543.1.1', '314.1']
    },
    {
      title: 'Special Locations',
      icon: AlertTriangle,
      color: 'text-purple-400',
      regulations: ['701.411.3.3', '701.32', '702.32', '705.411.1']
    }
  ];

  const mostUsedRegulations = [
    '612.1', '612.2.1', '612.3.1', '612.8', '612.10', '411.3.3', 
    '415.1.1', 'Table 41.3', '701.411.3.3', '522.6.204', '612.6', '643.7'
  ];

  return (
    <div className="space-y-6">
      {/* Quick Access by Category */}
      <Card className="bg-gradient-to-r from-neutral-800 to-neutral-700 border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Quick Access by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {quickAccessSections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h4 className={`text-sm font-semibold ${section.color} flex items-center gap-2`}>
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.regulations.map((regNum) => (
                    <Button
                      key={regNum}
                      variant="outline"
                      size="sm"
                      className="border-border text-gray-300 hover:bg-neutral-600 justify-start text-xs"
                      onClick={() => onRegulationClick(regNum)}
                    >
                      {regNum}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Referenced */}
      <Card className="bg-gradient-to-r from-neutral-800 to-neutral-700 border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Most Referenced Regulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
            {mostUsedRegulations.map((regNum) => (
              <Button
                key={regNum}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black justify-start text-xs sm:text-sm"
                onClick={() => onRegulationClick(regNum)}
              >
                {regNum}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickAccess;
