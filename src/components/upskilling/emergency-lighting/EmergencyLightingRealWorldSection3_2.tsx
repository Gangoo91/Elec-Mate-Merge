import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle } from 'lucide-react';

export const EmergencyLightingRealWorldSection3_2 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Manchester Warehouse Case Study
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-300">The Problem:</h4>
                <p className="text-sm">
                  A warehouse in Manchester had emergency lighting installed along escape routes, but luminaires 
                  were only fitted at doorways and not at changes in direction. During a fire drill, staff 
                  struggled to find the correct exit when moving around tall storage racks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-300">The Solution:</h4>
                <p className="text-sm">
                  After review, extra luminaires were installed at each junction and exit sign, ensuring 
                  routes were clearly visible. The updated system passed the next fire safety audit without issue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium">
            <strong>Key Lesson:</strong> Compliance isn't just about lux levels at specific points—it's about 
            ensuring continuous, clear guidance along the entire escape path. Physical obstructions must be 
            considered during design.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};