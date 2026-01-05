import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';

export const BS7671Module7Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Medical, commercial, and industrial locations represent some of the most challenging electrical installation environments, where system reliability, safety, and continuity of service are paramount. These installations require enhanced protection measures, specialised equipment, and careful consideration of the consequences of electrical failure on critical operations, patient safety, and economic productivity.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-2">Medical Facilities</h4>
            <p className="text-red-100 text-sm">Group 0, 1, and 2 medical locations with specialised IT systems, enhanced earthing, and fail-safe power supplies for patient safety.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Industrial Systems</h4>
            <p className="text-blue-100 text-sm">High-availability power systems with selective coordination, load management, and protection against production disruption.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Commercial Buildings</h4>
            <p className="text-green-100 text-sm">Energy management, fire safety systems, emergency lighting, and business continuity electrical infrastructure.</p>
          </div>
        </div>

        <p>
          The 2025 regulatory landscape emphasises enhanced safety margins, improved monitoring systems, and integration with smart building technologies. These installations must balance operational efficiency with safety requirements, often requiring redundant systems and comprehensive risk management strategies.
        </p>
      </CardContent>
    </Card>
  );
};