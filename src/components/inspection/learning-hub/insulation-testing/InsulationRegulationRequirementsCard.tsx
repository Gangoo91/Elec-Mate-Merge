
import React from 'react';
import { BookOpen, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InsulationRegulationRequirementsCard = () => (
  <Card className="bg-gradient-to-br from-card to-background border-border">
    <CardHeader className="p-4 sm:p-5 md:p-6">
      <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg md:text-xl">
        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
        BS 7671 Regulation Requirements
      </CardTitle>
      <CardDescription className="text-gray-300 text-sm sm:text-base">
        Detailed regulatory requirements for insulation resistance testing
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 sm:p-5 md:p-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
            <h4 className="font-medium text-purple-400 text-sm sm:text-base">Regulation 612.3 - Insulation Resistance</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">612.3.1 - Test Requirements:</p>
                <div className="space-y-1 text-xs">
                  <p>• Test voltage shall be DC</p>
                  <p>• Test voltage selection based on circuit nominal voltage</p>
                  <p>• SELV circuits: 250V DC minimum</p>
                  <p>• LV circuits: 500V DC minimum (up to 500V)</p>
                  <p>• Circuits above 500V: 1000V DC</p>
                  <p>• Minimum insulation resistance: 1.0MΩ for new installations</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">612.3.2 - Test Procedure:</p>
                <div className="space-y-1 text-xs">
                  <p>• All equipment and accessories disconnected</p>
                  <p>• Surge protective devices isolated</p>
                  <p>• Test between live conductors and earth</p>
                  <p>• Test between live conductors</p>
                  <p>• Apply test voltage for 1 minute minimum</p>
                  <p>• Reading must be stable in final 15 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <h4 className="font-medium text-blue-400 text-sm sm:text-base">Regulation 134.1.1 - Protection Against Electric Shock</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Basic Protection Requirements:</p>
                <div className="space-y-1 text-xs">
                  <p>• Insulation of live parts essential</p>
                  <p>• Insulation must be suitable for circuit voltage</p>
                  <p>• Minimum insulation resistance values must be maintained</p>
                  <p>• Regular testing ensures continued protection</p>
                  <p>• Deterioration must be identified and remedied</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Environmental Considerations:</p>
                <div className="space-y-1 text-xs">
                  <p>• Insulation suitable for installation conditions</p>
                  <p>• Temperature rating adequate for application</p>
                  <p>• Moisture resistance where required</p>
                  <p>• Chemical resistance in industrial environments</p>
                  <p>• UV resistance for outdoor applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            <h4 className="font-medium text-green-400 text-sm sm:text-base">Regulation 651.4 - Periodic Inspection and Testing</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Periodic Testing Requirements:</p>
                <div className="space-y-1 text-xs">
                  <p>• Insulation resistance testing mandatory</p>
                  <p>• Test intervals based on installation type</p>
                  <p>• Domestic: 10 years maximum interval</p>
                  <p>• Commercial: 5 years maximum interval</p>
                  <p>• Industrial: 3 years maximum interval</p>
                  <p>• Special locations: More frequent testing may be required</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Acceptable Values for Existing Installations:</p>
                <div className="space-y-1 text-xs">
                  <p>• Minimum 1.0MΩ preferred</p>
                  <p>• 0.5MΩ acceptable for existing installations</p>
                  <p>• Values {'<'} 0.5MΩ require investigation</p>
                  <p>• Trending analysis important</p>
                  <p>• Significant deterioration requires action</p>
                  <p>• Environmental factors must be considered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
            <h4 className="font-medium text-orange-400 text-sm sm:text-base">Regulation 421.1.201 - RCD Protection</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Insulation and RCD Relationship:</p>
                <div className="space-y-1 text-xs">
                  <p>• Poor insulation causes RCD nuisance tripping</p>
                  <p>• Earth leakage current increases with poor insulation</p>
                  <p>• 30mA RCD trips at 15-30mA leakage current</p>
                  <p>• Multiple circuits with poor insulation compound the problem</p>
                  <p>• Good insulation essential for RCD reliability</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Acceptable Earth Leakage:</p>
                <div className="space-y-1 text-xs">
                  <p>• Total earth leakage should be {'<'} 9mA</p>
                  <p>• Individual circuit leakage {'<'} 3mA recommended</p>
                  <p>• High insulation resistance reduces earth leakage</p>
                  <p>• Regular testing prevents RCD problems</p>
                  <p>• Poor insulation identification prevents outages</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
            <h4 className="font-medium text-red-400 text-sm sm:text-base">Critical Compliance Points</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Testing Compliance:</p>
                <div className="space-y-1 text-xs">
                  <p>• Correct test voltage selection</p>
                  <p>• Minimum test duration (1 minute)</p>
                  <p>• All equipment properly disconnected</p>
                  <p>• Temperature correction applied</p>
                  <p>• Results properly documented</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Value Compliance:</p>
                <div className="space-y-1 text-xs">
                  <p>• New installations: ≥ 1.0MΩ</p>
                  <p>• Existing installations: ≥ 0.5MΩ</p>
                  <p>• SELV circuits: Different requirements</p>
                  <p>• Environmental correction factors</p>
                  <p>• Trend analysis for deterioration</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Documentation:</p>
                <div className="space-y-1 text-xs">
                  <p>• Electrical Installation Certificate</p>
                  <p>• Schedule of Test Results</p>
                  <p>• Periodic Inspection Report</p>
                  <p>• Test conditions recorded</p>
                  <p>• Non-compliance actions documented</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InsulationRegulationRequirementsCard;
