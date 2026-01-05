import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const BS7671Module7Section3Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-elec-yellow font-medium">
          Key takeaways from outdoor and agricultural installations:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-4 bg-elec-dark border border-green-600/50 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-2">Environmental Protection</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• UV protection requires specialised cable materials and UV-stable conduit systems</li>
                <li>• IP ratings must match specific environmental conditions (IP44 minimum outdoors, IP65 for high-pressure areas)</li>
                <li>• Temperature cycling and moisture ingress are critical design considerations</li>
                <li>• Chemical resistance is essential in agricultural environments with ammonia exposure</li>
              </ul>
            </div>
            
            <div className="p-4 bg-elec-dark border border-blue-600/50 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Material Selection</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• XLPE insulation preferred over standard PVC for outdoor applications</li>
                <li>• Stainless steel (316L grade) required for highly corrosive environments</li>
                <li>• Armoured cables essential for mechanical protection in exposed locations</li>
                <li>• Regular inspection schedules (6-monthly minimum) vital for early problem detection</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-elec-dark border border-amber-600/50 rounded-lg">
              <h4 className="font-semibold text-amber-300 mb-2">Agricultural Safety</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Enhanced RCD protection (30mA maximum) mandatory for livestock safety</li>
                <li>• Comprehensive equipotential bonding of all metallic structures essential</li>
                <li>• Lower voltage thresholds apply due to animal sensitivity (25V touch, 10V step)</li>
                <li>• Dedicated earth electrode systems required for agricultural buildings</li>
              </ul>
            </div>
            
            <div className="p-4 bg-elec-dark border border-purple-600/50 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">BS 7671 Compliance</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Section 705 provides specific requirements for agricultural premises</li>
                <li>• Regular earth resistance testing and bonding verification required</li>
                <li>• Environmental risk assessments must inform design decisions</li>
                <li>• Documentation and maintenance records critical for compliance</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-dark border border-elec-yellow rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-2">Critical Success Factors</h4>
          <p className="text-foreground text-sm">
            Success in outdoor and agricultural installations depends on thorough environmental assessment, 
            appropriate material selection, comprehensive protection systems, and regular maintenance. 
            The higher initial cost of proper materials and protection is always justified by improved 
            safety, reliability, and reduced long-term maintenance costs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};