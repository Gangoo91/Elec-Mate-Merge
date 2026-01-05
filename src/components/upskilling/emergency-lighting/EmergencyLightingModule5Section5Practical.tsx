import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export const EmergencyLightingModule5Section5Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Section 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-xs">
              1
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Pre-Certification Verification</h4>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 ml-0 sm:ml-9">
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0">•</span>
                <span>Always cross-check test results and luminaire counts with drawings before signing certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0">•</span>
                <span>Walk the entire site with the design drawings to verify every luminaire position and exit sign</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0">•</span>
                <span>Confirm all test results are recorded in the logbook with dates, times, and tester signatures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0">•</span>
                <span>Review any deviations from the original design and ensure they've been approved in writing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-xs">
              2
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Documentation Storage</h4>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 ml-0 sm:ml-9">
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Keep copies of all certificates in the fire safety documentation folder for inspection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Store certificates in a clearly labelled red fire safety file near the building entrance or fire panel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Include the emergency lighting logbook, design drawings, and test records in the same location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Ensure the Responsible Person knows where documentation is stored and how to access it</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-xs">
              3
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Digital vs. Physical Certificates</h4>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 ml-0 sm:ml-9">
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0">•</span>
                <span>Provide the client with digital and hard copies of certificates for insurance and auditing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0">•</span>
                <span>Email PDF copies to the client, building manager, and facilities team immediately after handover</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0">•</span>
                <span>Laminate physical certificates to protect them from damage in mechanical or plant rooms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0">•</span>
                <span>Use cloud storage or secure digital platforms to back up all certification documents</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-xs">
              4
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Outstanding Defects Protocol</h4>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 ml-0 sm:ml-9">
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>Never issue a certificate if outstanding defects or failed tests remain unresolved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>Create a formal snagging list with target resolution dates for any minor issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>If a defect prevents full certification, issue a conditional certificate with clear limitations stated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>Return to site to verify all defects have been rectified before issuing the final certificate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-xs">
              5
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Professional Record Retention</h4>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 ml-0 sm:ml-9">
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">•</span>
                <span>Retain your own copies for at least six years as part of professional records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">•</span>
                <span>Maintain a central filing system organised by project name, date, and certificate type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">•</span>
                <span>Include photographs of the installation and test equipment readings as supporting evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">•</span>
                <span>Keep records accessible for insurance claims, legal disputes, or professional indemnity investigations</span>
              </li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
