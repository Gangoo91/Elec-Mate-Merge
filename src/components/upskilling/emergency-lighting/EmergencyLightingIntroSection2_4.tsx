import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, AlertTriangle, Shield } from 'lucide-react';

export const EmergencyLightingIntroSection2_4 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Route className="h-6 w-6 text-elec-yellow" />
          Introduction to Escape Route Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg leading-relaxed">
          Escape routes are the designated paths that building occupants must follow to reach a place of safety during an emergency. If the mains lighting fails, people could easily become disorientated or trapped without properly illuminated exit routes. Escape route lighting ensures that corridors, staircases, doorways, and exit signs remain visible, providing safe passage to the outside.
        </p>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Critical Responsibility</h3>
              <p className="text-foreground">
                For electricians, correct design and installation of escape route lighting is a critical responsibility, as it directly affects life safety and compliance with BS 5266-1. Inadequate escape route lighting can result in tragic consequences during emergencies.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-blue-400">Life Safety Priority</h3>
            </div>
            <p className="text-foreground">
              Escape route lighting is fundamentally about preserving human life. When mains lighting fails during an emergency, these systems become the critical difference between safe evacuation and potential disaster.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Route className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-green-400">BS 5266 Compliance</h3>
            </div>
            <p className="text-foreground">
              All escape route lighting installations must comply with BS 5266-1, which sets out the minimum standards for illumination levels, placement, and maintenance to ensure effective evacuation routes.
            </p>
          </div>
        </div>

        <p className="text-foreground leading-relaxed">
          This section will equip you with the knowledge and practical skills needed to design, install, and maintain escape route lighting systems that meet regulatory requirements and, most importantly, protect lives during emergency situations.
        </p>
      </CardContent>
    </Card>
  );
};