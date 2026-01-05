import { BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummarySection2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-400" />
          Section Summary: Required Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Mandatory Locations</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-blue-400 font-medium">Escape Routes</span>
                  <p className="text-sm text-gray-400">All stairways, corridors, and exits forming evacuation paths</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-green-400 font-medium">High-Risk Areas</span>
                  <p className="text-sm text-gray-400">Plant rooms, areas with flammable materials, critical equipment locations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Building-Specific Requirements</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-yellow-400 font-medium">Healthcare Facilities</span>
                  <p className="text-sm text-gray-400">Operating theatres, treatment areas with enhanced duration requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-purple-400 font-medium">Commercial Premises</span>
                  <p className="text-sm text-gray-400">Large open areas, toilets &gt;8m², reception areas</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
          <h5 className="font-semibold text-amber-400 mb-2">Assessment Process</h5>
          <p className="text-sm">
            Systematically review building layout against BS5266 requirements, considering escape routes, 
            area classifications, and building-specific regulations to ensure complete compliance.
          </p>
        </div>

        <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
          <h5 className="font-semibold text-blue-400 mb-2">Next Steps</h5>
          <p className="text-sm">
            Understanding location requirements enables accurate system design, including luminaire positioning, 
            spacing calculations, and illumination level specifications covered in the next sections.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};