import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const EmergencyLightingIntroSection2_3 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Introduction to High-Risk Task Area Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-foreground">
          High-risk task area lighting is designed for locations where people are engaged in potentially 
          dangerous activities — such as operating machinery, handling chemicals, or working at height. 
          In these areas, sudden loss of lighting can result in serious injury or even fatalities.
        </p>
        <p className="text-foreground">
          The purpose of this lighting is not simply to guide people to an exit, but to ensure workers 
          can safely shut down processes or equipment before evacuating. Electricians need to apply 
          precise standards when designing, installing, and maintaining this type of emergency lighting, 
          as mistakes can put lives directly at risk.
        </p>
        <div className="bg-red-600/10 border border-red-400/30 rounded-lg p-4 mt-4">
          <p className="text-red-300 font-medium">
            <strong>Critical Safety Focus:</strong> This lighting system enables controlled shutdown of 
            dangerous processes, preventing accidents during power failures. It requires higher illumination 
            levels and more precise installation than standard emergency lighting systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};