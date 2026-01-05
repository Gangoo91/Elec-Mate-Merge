import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine } from 'lucide-react';

export const BS7671Module7Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TreePine className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Outdoor and agricultural installations present unique challenges that require specialised equipment, enhanced protection methods, and careful consideration of environmental factors. BS 7671 Section 705 (Agricultural and horticultural premises) and related sections provide comprehensive guidance for installations exposed to harsh outdoor conditions, moisture, temperature variations, mechanical stress, and corrosive substances.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Environmental Challenges</h4>
            <p className="text-green-100 text-sm">UV radiation, moisture ingress, temperature extremes, and chemical exposure requiring appropriate IP ratings and material selection.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-orange-600 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-2">Agricultural Safety</h4>
            <p className="text-orange-100 text-sm">Livestock safety considerations with enhanced earthing systems, lower voltage thresholds, and specialised RCD protection.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Equipment Protection</h4>
            <p className="text-blue-100 text-sm">Mechanical protection, appropriate enclosure ratings, and selection of UV-stable materials for long-term reliability.</p>
          </div>
        </div>

        <p>
          Agricultural installations require particular attention to equipotential bonding, as livestock are particularly sensitive to touch and step voltages. Enhanced earthing arrangements and supplementary protective devices are essential for ensuring both human and animal safety in these environments.
        </p>
      </CardContent>
    </Card>
  );
};