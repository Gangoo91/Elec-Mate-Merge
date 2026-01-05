import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const BS7671Module7Section3LearningOutcomes = () => {
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
                <h4 className="font-semibold text-foreground mb-1">Environmental Risk Assessment</h4>
                <p className="text-foreground text-sm">Identify and evaluate environmental challenges including UV exposure, moisture ingress, temperature cycling, and chemical corrosion in outdoor installations.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">IP Rating Selection</h4>
                <p className="text-foreground text-sm">Select appropriate Ingress Protection ratings and enclosure types based on specific environmental conditions and installation locations.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Material Compatibility</h4>
                <p className="text-foreground text-sm">Choose UV-stable materials, corrosion-resistant components, and appropriate cable types for long-term outdoor performance.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Agricultural Earthing Systems</h4>
                <p className="text-foreground text-sm">Design and implement enhanced earthing and equipotential bonding systems for livestock safety in agricultural environments.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">BS 7671 Section 705 Compliance</h4>
                <p className="text-foreground text-sm">Apply specific requirements for agricultural and horticultural premises including RCD sensitivity and protective device selection.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Livestock Safety Protection</h4>
                <p className="text-foreground text-small">Implement appropriate touch and step voltage protection measures, considering the increased sensitivity of animals to electrical hazards.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-dark border border-elec-yellow rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Regulatory References</h4>
          <ul className="text-foreground text-sm space-y-1">
            <li>• BS 7671:2018+A2:2022 Section 705 - Agricultural and horticultural premises</li>
            <li>• BS EN 61140 - Protection against electric shock</li>
            <li>• BS EN 60529 - Degrees of protection provided by enclosures (IP Code)</li>
            <li>• IEC 60364-7-705 - Requirements for special installations or locations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};