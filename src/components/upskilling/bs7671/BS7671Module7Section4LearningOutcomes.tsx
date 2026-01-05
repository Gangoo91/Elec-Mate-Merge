import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const BS7671Module7Section4LearningOutcomes = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-elec-yellow font-medium">
          By the end of this section, you will be able to:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Medical Location Classification</h4>
                <p className="text-foreground text-sm">Classify medical locations into Groups 0, 1, and 2 based on risk levels and apply appropriate electrical system requirements for each group.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Medical IT Systems</h4>
                <p className="text-foreground text-sm">Design and implement medical IT systems with isolating transformers, insulation monitoring devices, and appropriate alarm systems for Group 2 locations.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Selective Coordination</h4>
                <p className="text-foreground text-sm">Apply selective coordination principles to ensure that protective devices operate in the correct sequence to minimise disruption during fault conditions.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Industrial Power Systems</h4>
                <p className="text-foreground text-sm">Design robust industrial electrical systems with appropriate earthing, protection coordination, and emergency supply arrangements.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Emergency Supply Systems</h4>
                <p className="text-foreground text-sm">Implement UPS systems, standby generators, and automatic changeover systems to ensure continuity of critical electrical supplies.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Commercial Building Systems</h4>
                <p className="text-foreground text-sm">Integrate fire safety systems, emergency lighting, access control, and energy management within commercial electrical installations.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-dark border border-elec-yellow rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Regulatory References</h4>
          <ul className="text-foreground text-sm space-y-1">
            <li>• BS 7671:2018+A2:2022 Section 710 - Medical locations</li>
            <li>• BS EN 60601-1 - Medical electrical equipment safety requirements</li>
            <li>• BS 5266 - Emergency lighting systems</li>
            <li>• BS EN 50172 - Emergency escape lighting systems</li>
            <li>• IEC 60364-5-56 - Safety services and equipment</li>
            <li>• BS 6266 - Fire detection and alarm systems for buildings</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};