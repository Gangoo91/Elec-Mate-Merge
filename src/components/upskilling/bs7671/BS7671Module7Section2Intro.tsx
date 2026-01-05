import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const BS7671Module7Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Electric Vehicle (EV) charging installations have become increasingly common across domestic, commercial, and public spaces. BS 7671 Section 722 provides comprehensive guidance for the safe installation and operation of EV charging equipment, addressing unique challenges such as high-current loads, extended charging periods, and outdoor installations.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Charging Modes</h4>
            <p className="text-blue-100 text-sm">Four distinct charging modes with different power levels, safety systems, and installation requirements.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">PME Considerations</h4>
            <p className="text-green-100 text-sm">Special provisions for Protective Multiple Earthing systems to prevent PEN conductor failures.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Protection Devices</h4>
            <p className="text-purple-100 text-sm">Enhanced RCD and SPD requirements to protect against unique EV charging risks.</p>
          </div>
        </div>

        <p>
          The 2025 regulatory landscape includes new requirements for smart charging capabilities, load management systems, and integration with renewable energy sources, reflecting the rapid evolution of EV technology and grid infrastructure.
        </p>
      </CardContent>
    </Card>
  );
};