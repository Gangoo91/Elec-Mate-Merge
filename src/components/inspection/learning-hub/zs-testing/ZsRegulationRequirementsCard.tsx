
import React from 'react';
import { BookOpen, AlertTriangle, CheckCircle, ThermometerSun, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ZsRegulationRequirementsCard = () => {
  const requirements = [
    { icon: AlertTriangle, title: 'Test Location', description: 'Test at furthest point of each final circuit for worst-case measurement', color: 'text-yellow-400' },
    { icon: ThermometerSun, title: 'Temperature Correction', description: 'Apply correction to conductor operating temperature (typically 70°C)', color: 'text-orange-400' },
    { icon: Calculator, title: 'Maximum Values', description: 'Corrected Zs must not exceed maximum values in BS 7671 Appendix 3', color: 'text-red-400' },
    { icon: CheckCircle, title: 'Additional Factors', description: 'Consider voltage drop and thermal effects in calculations', color: 'text-blue-400' },
    { icon: BookOpen, title: 'RCD Protected Circuits', description: 'Zs may be higher but still requires verification per Regulation 411.5', color: 'text-purple-400' }
  ];

  return (
    <Card className="bg-card/50 border-border border-l-4 border-l-yellow-500 hover:bg-card transition-all">
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          <CardTitle className="text-yellow-400 text-base sm:text-lg md:text-xl">
            BS 7671 Zs Requirements
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-2 sm:space-y-3">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <Icon className={`h-4 w-4 ${req.color} mt-0.5 shrink-0`} />
              <div>
                <span className="font-medium text-foreground">{req.title}:</span> {req.description}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ZsRegulationRequirementsCard;
