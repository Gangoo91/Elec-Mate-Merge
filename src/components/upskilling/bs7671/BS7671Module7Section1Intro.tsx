import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const BS7671Module7Section1Intro = () => {
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
          Electrical installations in wet or high-risk environments pose increased safety hazards due to the presence of water and reduced body resistance. BS 7671 Section 701 establishes specific regulations to reduce the risk of electric shock and equipment failure in locations such as bathrooms, shower rooms, and swimming pools.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Zone System</h4>
            <p className="text-blue-100 text-sm">Defined zones based on proximity to water sources with specific requirements for each area.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">IP Protection</h4>
            <p className="text-green-100 text-sm">Ingress Protection ratings ensure equipment can withstand moisture and water spray.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">RCD Protection</h4>
            <p className="text-purple-100 text-sm">Residual Current Devices provide enhanced protection against electric shock in wet conditions.</p>
          </div>
        </div>

        <p>
          The 2025 amendments to BS 7671 include enhanced requirements for smart bathroom devices and IoT integration safety measures, reflecting the increasing adoption of connected technology in wet locations.
        </p>
      </CardContent>
    </Card>
  );
};