
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Zap, Shield, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KeyRegulationsGrid = () => {
  const navigate = useNavigate();

  const keyRegulations = [
    {
      regulation: 'Part 6 - Inspection & Testing',
      title: 'Your daily bread and butter',
      description: 'Everything you need for EICR, EIC, and testing procedures',
      sections: [
        '610 - Initial verification requirements',
        '612 - Testing sequence and methods', 
        '620 - Certification requirements',
        '630 - Periodic inspection intervals'
      ],
      color: 'border-elec-yellow/30 bg-elec-yellow/5',
      priority: 'high',
      icon: Zap,
      usage: '95%',
      route: '/regulation/part-6'
    },
    {
      regulation: 'Part 4 - Protection for Safety',
      title: 'Safety first, always',
      description: 'Shock protection, fault protection, and RCD requirements',
      sections: [
        '411 - Protective measure requirements',
        '415 - Additional protection (RCDs)',
        '433 - Overcurrent protection',
        '434 - Fault current protection'
      ],
      color: 'border-red-500/30 bg-red-500/5',
      priority: 'high',
      icon: Shield,
      usage: '90%',
      route: '/regulation/part-4'
    },
    {
      regulation: 'Part 5 - Selection & Erection',
      title: 'Getting installations right',
      description: 'Cable selection, installation methods, and equipment requirements',
      sections: [
        '522 - Cable installation methods',
        '526 - Electrical connections',
        '543 - Protective conductors',
        '559 - Luminaires and lighting'
      ],
      color: 'border-blue-500/30 bg-blue-500/5',
      priority: 'medium',
      icon: CheckCircle,
      usage: '75%',
      route: '/regulation/part-5'
    },
    {
      regulation: 'Part 7 - Special Locations',
      title: 'When standard rules aren\'t enough',
      description: 'Bathrooms, swimming pools, construction sites, and more',
      sections: [
        '701 - Locations with bath/shower',
        '702 - Swimming pools',
        '704 - Construction sites',
        '717 - Mobile/transportable units'
      ],
      color: 'border-purple-500/30 bg-purple-500/5',
      priority: 'medium',
      icon: AlertTriangle,
      usage: '60%',
      route: '/regulation/part-7'
    }
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const handleButtonClick = (e: React.MouseEvent, route: string) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    navigate(route);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
        <FileText className="h-8 w-8 text-elec-yellow" />
        Essential Regulations for Electricians
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {keyRegulations.map((reg, index) => {
          const IconComponent = reg.icon;
          return (
            <Card 
              key={index} 
              className={`bg-card border-2 ${reg.color} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer group touch-manipulation rounded-xl`}
              onClick={() => handleCardClick(reg.route)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-foreground group-hover:text-elec-yellow transition-colors text-xl">
                        {reg.regulation}
                      </CardTitle>
                      <CardDescription className="text-elec-yellow font-semibold text-base">
                        {reg.title}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    {reg.priority === 'high' && (
                      <Badge className="bg-elec-yellow text-black font-bold mb-2">
                        PRIORITY
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <TrendingUp className="h-4 w-4" />
                      <span>{reg.usage} usage</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-white text-base">
                  {reg.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {reg.sections.map((section, idx) => (
                    <div key={idx} className="text-sm text-white/80 flex items-center gap-3">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0" />
                      <span>{section}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                  onClick={(e) => handleButtonClick(e, reg.route)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Details & Examples
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default KeyRegulationsGrid;
