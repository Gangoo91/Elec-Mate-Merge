import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Ruler, 
  Zap, 
  BookOpen,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const EmergencyLightingTechnicalSection2_4 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-6 w-6 text-elec-yellow" />
          Technical Specifications & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        {/* Illumination Requirements */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Illumination Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Minimum Levels (BS 5266)</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span><strong>1 lux</strong> along centre line of escape route</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span><strong>0.5 lux</strong> minimum anywhere on route</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span><strong>40:1</strong> maximum diversity ratio</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Special Considerations</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span>Higher levels at changes of direction</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span>Enhanced lighting at fire equipment</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span>Consistent levels avoid dark spots</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Placement Standards */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Luminaire Placement Standards
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Mandatory Locations</h4>
              <ul className="space-y-2 text-foreground">
                <li>• Near each exit door (within 2m)</li>
                <li>• At changes in direction</li>
                <li>• At intersections of corridors</li>
                <li>• Near each staircase (top and bottom)</li>
                <li>• At changes in floor level</li>
                <li>• Near fire-fighting equipment</li>
                <li>• Outside each final exit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Spacing Guidelines</h4>
              <ul className="space-y-2 text-foreground">
                <li>• Maximum 25m spacing in corridors</li>
                <li>• Sufficient height to avoid obstruction</li>
                <li>• Avoid shadows from structural elements</li>
                <li>• Consider furniture and equipment placement</li>
                <li>• Ensure uniform light distribution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Duration and Performance */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Duration and Performance Requirements
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Standard Duration</h4>
              <p className="text-foreground text-sm">
                <strong>3 hours</strong> minimum operation time for most buildings
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">High-Risk Areas</h4>
              <p className="text-foreground text-sm">
                May require <strong>extended duration</strong> based on evacuation time
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Activation Time</h4>
              <p className="text-foreground text-sm">
                Must activate within <strong>5 seconds</strong> of mains failure
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Documentation */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Compliance Documentation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Installation Records</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  System design drawings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Luminaire specifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Installation certificates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Commissioning test results
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Ongoing Maintenance</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Monthly test logbooks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Annual duration test records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Maintenance and repair logs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Battery replacement schedules
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Critical Compliance Note</h4>
              <p className="text-foreground">
                Failure to meet BS 5266 requirements can result in prosecution under the Regulatory Reform (Fire Safety) Order 2005. Always ensure installations are fully compliant and properly documented.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};