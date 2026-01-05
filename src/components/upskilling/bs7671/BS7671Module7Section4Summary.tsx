import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const BS7671Module7Section4Summary = () => {
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
          Key takeaways from medical, commercial, and industrial installations:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-4 bg-elec-dark border border-red-600/50 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Medical Locations</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Group 0, 1, and 2 classifications determine electrical safety requirements</li>
                <li>• Group 2 locations require medical IT systems with isolation transformers</li>
                <li>• Insulation monitoring devices (IMD) provide continuous safety monitoring</li>
                <li>• Emergency power systems with UPS and generator backup are essential</li>
                <li>• Colour-coded outlets distinguish IT (orange) from TN (blue) systems</li>
              </ul>
            </div>
            
            <div className="p-4 bg-elec-dark border border-blue-600/50 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Industrial Systems</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Selective coordination prevents unnecessary production interruptions</li>
                <li>• Time-graded protection: incoming (0.4-1.2s), distribution (0.1-0.4s), final (0.01-0.1s)</li>
                <li>• TN-S earthing systems preferred for industrial applications</li>
                <li>• Motor protection requires overload, short-circuit, and phase failure protection</li>
                <li>• Load management systems optimise demand and energy consumption</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-elec-dark border border-green-600/50 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-2">Critical Infrastructure</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• High-availability systems require redundant protection and supply arrangements</li>
                <li>• Emergency lighting must provide minimum 3-hour backup duration</li>
                <li>• Hazardous area installations need ATEX/IECEx certified equipment</li>
                <li>• Power quality management essential for sensitive electronic equipment</li>
                <li>• Documentation and testing procedures must be comprehensive and current</li>
              </ul>
            </div>
            
            <div className="p-4 bg-elec-dark border border-orange-600/50 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">Safety Integration</h4>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Fire safety systems must integrate with electrical distribution design</li>
                <li>• Access control and security systems require dedicated protected supplies</li>
                <li>• Building management systems enable centralised monitoring and control</li>
                <li>• Regular testing and maintenance are critical for safety and reliability</li>
                <li>• Staff training ensures proper operation and emergency response</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-dark border border-elec-yellow rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-2">Design Philosophy</h4>
          <p className="text-foreground text-sm">
            Medical, commercial, and industrial installations require a systems-thinking approach 
            where electrical design must balance safety, reliability, maintainability, and operational 
            efficiency. The consequences of electrical failure extend far beyond the electrical system 
            itself, affecting patient safety, production continuity, and business operations. 
            Investment in proper design, quality equipment, and comprehensive protection systems 
            is essential for long-term success.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};