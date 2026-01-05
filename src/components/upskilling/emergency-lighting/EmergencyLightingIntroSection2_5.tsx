import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signpost, AlertTriangle, Shield } from 'lucide-react';

export const EmergencyLightingIntroSection2_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Signpost className="h-6 w-6 text-elec-yellow" />
          Introduction to Emergency Exit Signs
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg leading-relaxed">
          Emergency exit signs are a vital component of a building's life safety system. Even with adequate lighting, occupants must be able to clearly see and understand where the exits are. Incorrect, poorly lit, or missing signage has been a common cause of evacuation failures in real emergencies.
        </p>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Critical Importance</h3>
              <p className="text-foreground">
                Electricians must ensure exit signs are installed in line with BS 5266-1 and BS EN ISO 7010, providing consistent and unambiguous direction to safety. Poor signage has directly contributed to evacuation failures and casualties in real emergencies.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-blue-400">Life Safety Function</h3>
            </div>
            <p className="text-foreground">
              Exit signs must provide clear, unambiguous guidance to safety even in the most challenging conditions including smoke, darkness, and panic situations during emergencies.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Signpost className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-green-400">Regulatory Compliance</h3>
            </div>
            <p className="text-foreground">
              All exit signage installations must comply with BS 5266-1 and BS EN ISO 7010 standards, ensuring consistency and effectiveness across all building types and occupancies.
            </p>
          </div>
        </div>

        <p className="text-foreground leading-relaxed">
          This section will provide you with the essential knowledge and practical skills needed to correctly specify, install, and maintain emergency exit signage systems that protect lives and ensure regulatory compliance.
        </p>
      </CardContent>
    </Card>
  );
};