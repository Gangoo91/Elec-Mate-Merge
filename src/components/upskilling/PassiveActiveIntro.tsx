import { Cpu, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PassiveActiveIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Cpu className="h-5 w-5 text-elec-yellow" />
          Introduction to Passive vs Active Hardware
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p className="leading-relaxed">
          Network infrastructure consists of two fundamental types of components: passive and active hardware. 
          Understanding the distinction between these components is crucial for designing effective, 
          cost-efficient, and maintainable network systems.
        </p>
        
        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-300 mb-2">Why This Distinction Matters</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                The choice between passive and active components affects network performance, maintenance requirements, 
                power consumption, costs, and troubleshooting complexity. Each approach has specific advantages that 
                make them suitable for different applications and environments.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};