import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummarySection3 = () => {
  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-md" />
          Section Summary: Emergency Lighting System Types
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-green-200">
          This section covered the various types of emergency lighting systems available and their appropriate applications.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Power Supply Systems</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Central Battery:</strong> Best for large installations, offering centralised maintenance and longer battery life</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Self-Contained:</strong> Suitable for smaller installations with lower initial costs and simpler installation</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Operating Modes</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Non-Maintained:</strong> Most common type, operating only during mains failure</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Maintained:</strong> Continuous operation, required in entertainment venues</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Battery Technologies</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Lithium Iron Phosphate:</strong> Longest life (10-20 years), environmentally friendly</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Nickel Cadmium:</strong> Reliable with good temperature range but toxic materials</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Lead Acid:</strong> Lower initial cost but shorter life and higher maintenance</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Selection Criteria</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>Building size and complexity influence power supply choice</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>Occupancy type determines operating mode requirements</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>Environmental conditions affect battery technology selection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-2">Next Steps</h4>
          <p className="text-sm">
            Understanding system types enables appropriate selection for specific applications. The next section will cover 
            BS 5266 and related standards that govern the design, installation, and maintenance of these systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};