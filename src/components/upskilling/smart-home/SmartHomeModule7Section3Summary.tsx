import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SmartHomeModule7Section3Summary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          This section demonstrated that wireless reliability is essential for smart home success, requiring proper testing, optimisation, and troubleshooting skills.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Signal Testing</h4>
            <ul className="text-sm space-y-1">
              <li>• Use Wi-Fi analyser apps and professional tools</li>
              <li>• Aim for -65 dBm or stronger for reliability</li>
              <li>• Test at actual device locations</li>
              <li>• Document coverage areas and dead zones</li>
            </ul>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Coverage Optimisation</h4>
            <ul className="text-sm space-y-1">
              <li>• Central hub/router placement</li>
              <li>• Mesh networks for large properties</li>
              <li>• Avoid metal enclosures (Faraday cage)</li>
              <li>• Consider building materials and interference</li>
            </ul>
          </div>
        </div>
        
        <p>
          Troubleshooting connectivity requires systematic approaches: checking power first, then signal strength, interference sources, and firmware updates. Professional installers must design around strong coverage rather than forcing devices into dead zones.
        </p>

        <p>
          Strong signals reduce call-backs, maintain system stability, and ensure client satisfaction — making wireless verification an essential professional skill.
        </p>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section3Summary;