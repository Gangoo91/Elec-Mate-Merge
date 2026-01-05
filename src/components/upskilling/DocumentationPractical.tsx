import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DocumentationPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Learning Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Exercise 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 1</Badge>
            <h3 className="text-foreground font-semibold">Documentation Review Checklist</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Create a comprehensive checklist for reviewing electrical documentation before starting an inspection:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-lg">Essential Documents:</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Electrical Installation Certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Circuit schedules and layouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Building plans showing electrical routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Previous inspection reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Minor works certificates</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-lg">Document Quality Check:</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>All documents legible and complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Signatures and dates present</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Revision control up to date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Calculations and specifications included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>As-built drawings match design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 2</Badge>
            <h3 className="text-foreground font-semibold">Creating As-Built Drawings</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Practice creating as-built drawings when original plans are missing or inaccurate:
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">Scenario:</h4>
                  <p className="text-foreground text-sm mb-3">
                    You arrive at a 10-year-old office building for inspection. The building plans show basic socket layouts but don't include recent office fit-out changes, emergency lighting circuits, or IT infrastructure.
                  </p>
                  <h4 className="text-yellow-400 font-medium mb-2">Your Task:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Sketch the actual circuit layouts you observe</li>
                    <li>• Note any discrepancies from original plans</li>
                    <li>• Document cable routes and junction points</li>
                    <li>• Identify all protective devices and their ratings</li>
                    <li>• Record time taken and any limitations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 3</Badge>
            <h3 className="text-foreground font-semibold">Documentation Gap Analysis</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Analyse different documentation scenarios and determine the appropriate course of action:
            </p>
            <div className="space-y-3">
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2">Scenario A: Critical Missing Information</h4>
                <p className="text-foreground text-sm">
                  No circuit schedules, protective device ratings unclear, cable types unknown.
                  <span className="text-red-400 ml-2">Action: Cannot proceed safely - request documentation</span>
                </p>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">Scenario B: Partial Documentation</h4>
                <p className="text-foreground text-sm">
                  Basic circuit schedules available but no building plans or cable routes shown.
                  <span className="text-yellow-400 ml-2">Action: Proceed with limitations noted</span>
                </p>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Scenario C: Complete Documentation</h4>
                <p className="text-foreground text-sm">
                  All certificates, plans, and schedules present and up to date.
                  <span className="text-green-400 ml-2">Action: Proceed with full inspection</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 4</Badge>
            <h3 className="text-foreground font-semibold">Client Communication Workshop</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Practice explaining documentation requirements and limitations to clients:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Explaining Requirements</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Why documentation is legally required</li>
                  <li>• How missing docs affect inspection scope</li>
                  <li>• Cost implications of creating as-builts</li>
                  <li>• Timeline impacts and scheduling</li>
                </ul>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Managing Expectations</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• What can/cannot be inspected</li>
                  <li>• Limitation clauses in reports</li>
                  <li>• Recommendations for future work</li>
                  <li>• Professional liability boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium mb-2">Key Learning Points</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Documentation review should always precede any inspection work</li>
                <li>• Missing information creates limitations that must be clearly documented</li>
                <li>• Client communication is essential for managing expectations and costs</li>
                <li>• Professional judgment is required to balance safety with practical constraints</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};