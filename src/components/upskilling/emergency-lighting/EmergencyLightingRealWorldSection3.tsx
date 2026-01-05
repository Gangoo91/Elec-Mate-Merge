import { Building2, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorldSection3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-orange-400 drop-shadow-md" />
          Real-World Example: Hospital Wing Emergency Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/40 rounded-lg">
          <h4 className="text-orange-300 font-semibold mb-2">Project Brief</h4>
          <p className="text-sm">
            A 4-storey hospital wing requiring emergency lighting for 24/7 operations. The facility includes operating theatres, 
            intensive care units, patient wards, and critical equipment areas. High reliability and extended duration requirements apply.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400" />
              System Selection Process
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Power Supply:</strong> Central battery system chosen for reliability and centralised monitoring</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Operating Mode:</strong> Mix of maintained (critical areas) and non-maintained (general circulation)</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Battery Technology:</strong> Lithium Iron Phosphate for longevity and reliability</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Duration:</strong> 3-hour capacity for critical areas, 1-hour for general areas</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-purple-300 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-400" />
              System Configuration
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Operating Theatres:</strong> Maintained high-intensity task lighting with backup power</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Patient Areas:</strong> Non-maintained escape route lighting with comfort illumination</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Critical Equipment:</strong> Specialised luminaires for life support and monitoring systems</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Circulation Areas:</strong> Standard escape route lighting with clear exit signage</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-2">Solution Benefits</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-200 mb-1">Operational Advantages:</p>
              <p>• Centralised monitoring reduces maintenance staff requirements</p>
              <p>• Extended battery life minimises service disruptions</p>
              <p>• Maintained mode ensures continuous illumination in critical areas</p>
            </div>
            <div>
              <p className="font-medium text-green-200 mb-1">Safety & Compliance:</p>
              <p>• Meets healthcare-specific emergency lighting requirements</p>
              <p>• Provides adequate illumination for patient evacuation</p>
              <p>• Supports continuation of life-critical operations</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/40 rounded-lg">
          <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Key Learning Point
          </h4>
          <p className="text-sm">
            Healthcare facilities require careful consideration of both general escape lighting and task-specific illumination. 
            The system type selection must balance operational requirements, maintenance accessibility, and life-safety priorities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};