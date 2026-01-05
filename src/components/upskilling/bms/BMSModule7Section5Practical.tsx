import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Users, CheckSquare, FileText } from 'lucide-react';

export const BMSModule7Section5Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Electrician's Role in Commissioning</h3>
          </div>
          <div className="space-y-3 ml-7">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">Be on hand to operate field switches, dampers, and valves when requested</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">Correct wiring issues quickly if points fail during testing</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">Verify signals with multimeters before blaming programming errors</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">Ensure access to panels and provide safe isolation if rework is needed</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold">Best Practices</h3>
          </div>
          <div className="grid gap-4 ml-7">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <h4 className="text-foreground font-semibold mb-2">Pre-Commissioning Preparation</h4>
              <p className="text-sm text-foreground">
                Double-check I/O wiring before handover to engineers. Create detailed wiring schedules 
                and ensure all terminations are secure and correctly labelled.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <h4 className="text-foreground font-semibold mb-2">Documentation Maintenance</h4>
              <p className="text-sm text-foreground">
                Label circuits and keep drawings updated during changes. Any field modifications must 
                be reflected in the documentation immediately.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <h4 className="text-foreground font-semibold mb-2">Active Support</h4>
              <p className="text-sm text-foreground">
                During functional testing, stay with commissioning engineers to assist. Quick response 
                to issues prevents delays and keeps testing momentum.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <h4 className="text-foreground font-semibold">Record Keeping</h4>
              </div>
              <p className="text-sm text-foreground">
                Record results in commissioning sheets for O&M documentation. Include any field changes, 
                calibration values, and specific operational notes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};