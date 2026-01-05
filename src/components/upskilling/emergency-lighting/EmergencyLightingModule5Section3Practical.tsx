import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export const EmergencyLightingModule5Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Scheduling Tests */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-600 text-foreground flex items-center justify-center text-xs font-bold">1</span>
            Scheduling Tests During Low Occupancy
          </h4>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Carry out monthly tests during periods of low building occupancy to minimise disruption and risk.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
              <p className="text-green-400 font-semibold text-sm">Recommended Test Times:</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">•</span>
                  <span><strong>Early Morning:</strong> Before building opens (e.g., 6:00-8:00 AM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">•</span>
                  <span><strong>Late Evening:</strong> After building closes (e.g., 7:00-9:00 PM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">•</span>
                  <span><strong>Weekends:</strong> In commercial buildings with low weekend occupancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">•</span>
                  <span><strong>Lunch Breaks:</strong> In small premises with predictable quiet periods</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Staggered Annual Tests */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-600 text-foreground flex items-center justify-center text-xs font-bold">2</span>
            Staggering Annual Duration Tests
          </h4>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              In large buildings, stagger annual duration tests across zones to avoid leaving all areas without emergency protection simultaneously.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 space-y-3">
              <p className="text-orange-400 font-semibold text-sm">Zone Testing Strategy:</p>
              <div className="space-y-3 text-foreground text-sm">
                <div className="bg-elec-dark p-3 rounded border border-gray-700">
                  <p className="font-semibold text-orange-300 mb-2">Example: 4-Floor Office Building</p>
                  <div className="space-y-1 text-xs">
                    <p><strong className="text-foreground">January:</strong> Ground Floor emergency lighting (3-hour test)</p>
                    <p><strong className="text-foreground">April:</strong> First Floor emergency lighting (3-hour test)</p>
                    <p><strong className="text-foreground">July:</strong> Second Floor emergency lighting (3-hour test)</p>
                    <p><strong className="text-foreground">October:</strong> Third Floor emergency lighting (3-hour test)</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2 italic">This ensures all floors are tested annually while maintaining emergency coverage on other floors</p>
                </div>
                <p className="text-gray-300 text-xs">
                  <strong className="text-foreground">Important:</strong> Document clearly which zones have been tested and when next tests are due
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Test Systems */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-foreground flex items-center justify-center text-xs font-bold">3</span>
            Using Automatic Test Systems
          </h4>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Use automatic test systems in complex buildings to reduce labour costs and ensure consistent testing compliance.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
              <p className="text-blue-400 font-semibold text-sm">Benefits of Self-Test Systems:</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Reduced Labour:</strong> 70-80% reduction in testing time and costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Consistent Schedule:</strong> Automatic testing at programmed intervals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Digital Records:</strong> Automatic documentation and reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Fault Detection:</strong> Immediate alerts for failures or defects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span><strong>Compliance Proof:</strong> Electronic logbook accessible to authorities</span>
                </li>
              </ul>
              <div className="bg-elec-dark p-3 rounded border border-gray-700 mt-3">
                <p className="text-amber-300 text-xs font-semibold mb-1">Cost Comparison (100 Fittings):</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400">Manual Testing:</p>
                    <p className="text-foreground">£1,920-£2,880/year</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Self-Test System:</p>
                    <p className="text-foreground">£400-£600/year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logbook Location */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-foreground flex items-center justify-center text-xs font-bold">4</span>
            Logbook Storage and Accessibility
          </h4>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Keep logbooks on-site in an accessible location, ideally near the fire alarm panel.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-2">
              <p className="text-purple-400 font-semibold text-sm">Recommended Logbook Locations:</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">📍</span>
                  <span><strong>Fire Alarm Panel:</strong> Logical location alongside fire safety documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">📍</span>
                  <span><strong>Electrical Intake Room:</strong> Secure location with controlled access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">📍</span>
                  <span><strong>Building Manager's Office:</strong> Accessible to authorities during inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">📍</span>
                  <span><strong>Reception/Security Desk:</strong> 24/7 staffed locations in large buildings</span>
                </li>
              </ul>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mt-3">
                <p className="text-red-400 text-xs font-semibold">Important:</p>
                <p className="text-foreground text-xs mt-1">
                  Logbook must be immediately available to Fire and Rescue Authority during inspections. Failure to produce records is a compliance breach.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-Up on Failed Tests */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-foreground flex items-center justify-center text-xs font-bold">5</span>
            Prompt Corrective Action for Failed Tests
          </h4>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Always follow up failed tests with prompt corrective action — incomplete systems are non-compliant.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-3">
              <p className="text-red-400 font-semibold text-sm">Remedial Action Procedure:</p>
              <ol className="space-y-3 text-foreground text-sm list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong>Immediate Documentation</strong>
                    <p className="text-gray-300 text-xs mt-1">Record the failure details, location, and nature of defect in logbook</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong>Notify Responsible Person</strong>
                    <p className="text-gray-300 text-xs mt-1">Inform building owner/manager immediately of failed units</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong>Arrange Urgent Repairs</strong>
                    <p className="text-gray-300 text-xs mt-1">Schedule immediate repair or replacement of failed luminaires</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <strong>Retest After Repair</strong>
                    <p className="text-gray-300 text-xs mt-1">Carry out retest of repaired units to confirm functionality</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <strong>Document Completion</strong>
                    <p className="text-gray-300 text-xs mt-1">Update logbook with repair details and successful retest results</p>
                  </div>
                </li>
              </ol>
              <div className="bg-amber-900/30 border border-amber-500/30 rounded p-3 mt-3">
                <p className="text-amber-300 text-xs font-semibold">Time-Critical Failures:</p>
                <p className="text-foreground text-xs mt-1">
                  If failures affect critical escape routes, temporary measures (e.g., additional battery-powered torches) may be needed while repairs are arranged. Document all temporary provisions.
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
