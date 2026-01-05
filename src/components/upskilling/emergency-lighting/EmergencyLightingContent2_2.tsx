import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Eye, Calculator, Layout, Users } from 'lucide-react';

export const EmergencyLightingContent2_2 = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Open Area (Anti-Panic) Lighting Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-elec-yellow" />
              Purpose and Benefits
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                Anti-panic lighting is designed to reduce the likelihood of panic and provide 
                sufficient illumination to enable safe movement of occupants towards escape routes 
                in areas exceeding 60m².
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-2">Primary Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Reduces panic and anxiety</li>
                    <li>• Enables identification of escape routes</li>
                    <li>• Prevents dangerous crowd behaviour</li>
                    <li>• Provides general area visibility</li>
                  </ul>
                </div>
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-2">When Required:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Open areas &gt; 60m²</li>
                    <li>• High occupancy spaces</li>
                    <li>• Assembly areas</li>
                    <li>• Large retail spaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calculator className="h-4 w-4 text-elec-yellow" />
              Illuminance and Coverage Requirements
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">Minimum Illuminance</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">0.5 lux</p>
                    <p className="text-gray-300 text-sm">At floor level anywhere in open area</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">Uniformity Ratio</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">40:1 maximum</p>
                    <p className="text-gray-300 text-sm">Between maximum and minimum levels</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow mb-2">Coverage Area</Badge>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Complete area</p>
                    <p className="text-gray-300 text-sm">No area should be without coverage</p>
                  </div>
                </div>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-2">Coverage Calculation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p><strong>Spacing Formula:</strong> Maximum 4 x mounting height</p>
                    <p><strong>Edge Distance:</strong> Half the spacing distance</p>
                  </div>
                  <div>
                    <p><strong>Overlap:</strong> Light cones must overlap sufficiently</p>
                    <p><strong>Calculation Grid:</strong> Use 2m x 2m grid for verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Layout className="h-4 w-4 text-elec-yellow" />
              Design Considerations
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Luminaire Positioning:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Even distribution across area</li>
                      <li>• Consider furniture and obstacles</li>
                      <li>• Avoid glare and shadows</li>
                      <li>• Coordinate with escape lighting</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Installation Requirements:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Minimum 2m mounting height</li>
                      <li>• Protected from damage</li>
                      <li>• Accessible for maintenance</li>
                      <li>• IP rating for environment</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Performance Criteria:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• 1-hour minimum duration</li>
                      <li>• 5-second response time</li>
                      <li>• Maintained or non-maintained</li>
                      <li>• Battery backup systems</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-foreground font-medium mb-2">Integration with Systems:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Fire alarm system integration</li>
                      <li>• Building management systems</li>
                      <li>• Emergency voice systems</li>
                      <li>• Access control coordination</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-elec-yellow" />
              Application Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Retail Environments</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Large retail floors</li>
                  <li>• Shopping centres</li>
                  <li>• Supermarkets</li>
                  <li>• Department stores</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">
                  High occupancy areas requiring comprehensive coverage
                </div>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Assembly Areas</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Conference halls</li>
                  <li>• Auditoriums</li>
                  <li>• Sports facilities</li>
                  <li>• Exhibition spaces</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">
                  Large open areas with high occupant density
                </div>
              </div>
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">Industrial Spaces</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Warehouses</li>
                  <li>• Manufacturing floors</li>
                  <li>• Distribution centres</li>
                  <li>• Loading areas</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">
                  Large industrial areas with machinery and obstacles
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};