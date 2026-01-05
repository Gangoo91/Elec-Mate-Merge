import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { LabellingImportanceQuickCheck } from './LabellingImportanceQuickCheck';
import { ComponentLabellingQuickCheck } from './ComponentLabellingQuickCheck';
import { MaintenanceRecordsQuickCheck } from './MaintenanceRecordsQuickCheck';
import { LegalRecordsQuickCheck } from './LegalRecordsQuickCheck';

export const EmergencyLightingModule5Section4Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1: Importance of Labelling */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-foreground">Importance of Labelling</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              Clear labelling ensures that emergency lighting systems can be safely maintained, tested, and inspected without confusion or risk. It provides essential information to electricians, fire officers, and building managers, enabling rapid fault-finding and compliance verification.
            </p>

            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-green-500">
              <p className="font-semibold text-green-400 mb-3 text-sm sm:text-base">Labelling Requirements</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg mb-3">
                Clear labelling ensures that:
              </p>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Circuits can be isolated safely during maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Test points are quickly identified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Emergency fittings are distinguished from standard lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Fire inspectors can verify compliance efficiently</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
              <p className="font-semibold text-elec-yellow mb-3 text-sm sm:text-base">Requirements:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <p className="text-foreground text-sm sm:text-base lg:text-lg flex-1 pt-0.5">
                    Labels must be durable, legible, and permanent
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <p className="text-foreground text-sm sm:text-base lg:text-lg flex-1 pt-0.5">
                    Exit signs must comply with ISO 7010 pictograms
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <p className="text-foreground text-sm sm:text-base lg:text-lg flex-1 pt-0.5">
                    Distribution boards must be clearly marked as "Emergency Lighting Circuits Only"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-md">
              <p className="font-semibold text-amber-400 mb-2 text-sm sm:text-base">💡 Professional Tip:</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Use engraved or industrial label printers rather than handwritten stickers. Handwritten labels fade, peel, and are unacceptable to fire inspectors.
              </p>
            </div>

            <LabellingImportanceQuickCheck />
          </div>
        </div>

        {/* Section 2: What Needs Labelling */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-foreground">What Needs Labelling</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              BS 5266-1 and BS 7671 specify which components of an emergency lighting system must be clearly identified. Every critical element requires appropriate labelling to ensure safe operation and maintenance.
            </p>

            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-blue-500">
              <p className="font-semibold text-blue-400 mb-3 text-sm sm:text-base">Component Labelling Standards</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                The following components must be labelled for compliance:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base lg:text-lg">Luminaires</p>
                    <p className="text-foreground text-sm sm:text-base lg:text-lg">
                      Maintained or non-maintained, with circuit references
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base lg:text-lg">Distribution boards</p>
                    <p className="text-foreground text-sm sm:text-base lg:text-lg">
                      Clearly marked as supplying emergency circuits
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base lg:text-lg">Test points / key switches</p>
                    <p className="text-foreground text-sm sm:text-base lg:text-lg">
                      Identified for monthly functional checks
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base lg:text-lg">Cabling</p>
                    <p className="text-foreground text-sm sm:text-base lg:text-lg">
                      Where accessible, labelled as "Fire-Resistant Emergency Lighting Supply"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base lg:text-lg">Logbooks</p>
                    <p className="text-foreground text-sm sm:text-base lg:text-lg">
                      Must reference labelled circuits for easy correlation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-md">
              <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">💡 Professional Tip:</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Always cross-reference luminaire numbers on the drawings with those in the logbook to ensure accurate identification during maintenance.
              </p>
            </div>

            <ComponentLabellingQuickCheck />
          </div>
        </div>

        {/* Section 3: Maintenance Records */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-foreground">Maintenance Records</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              Maintenance documentation is essential for proving compliance with the Regulatory Reform (Fire Safety) Order 2005. Incomplete or missing records render testing legally worthless, even if the physical system is functioning perfectly.
            </p>

            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
              <p className="font-semibold text-purple-400 mb-3 text-sm sm:text-base">Logbook Requirements</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Records must include:
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
              <p className="font-semibold text-elec-yellow mb-3 text-sm sm:text-base">Five Essential Details</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Dates and results of tests</p>
                    <p className="text-foreground text-sm sm:text-base">
                      Monthly functional and annual duration tests with pass/fail outcomes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Details of any faults found</p>
                    <p className="text-foreground text-sm sm:text-base">
                      Luminaire reference, nature of defect, and date discovered
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Repairs or remedial work carried out</p>
                    <p className="text-foreground text-sm sm:text-base">
                      Including who performed it and when
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Battery replacements and luminaire upgrades</p>
                    <p className="text-foreground text-sm sm:text-base">
                      Dates, luminaire references, and specifications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-elec-dark font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Evidence of commissioning and certification</p>
                    <p className="text-foreground text-sm sm:text-base">
                      Initial 3-hour duration test results and installation certificates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
              <p className="font-semibold text-foreground mb-2 text-sm sm:text-base lg:text-lg">Example Logbook Entry:</p>
              <div className="bg-gray-900 p-3 rounded-md font-mono text-xs sm:text-sm text-green-400">
                <p>Date: 15/01/2025</p>
                <p>Test Type: Monthly Functional Test</p>
                <p>Luminaire Ref: EL-02-A-12</p>
                <p>Result: FAIL - No illumination</p>
                <p>Fault: Battery failure</p>
                <p>Action: Battery replaced (NiCd 6V 4Ah)</p>
                <p>Re-test: PASS</p>
                <p>Engineer: J. Smith (Electrical Contractor Ltd)</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-md">
              <p className="font-semibold text-amber-400 mb-2 text-sm sm:text-base">💡 Professional Tip:</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                For large sites, use digital maintenance software to store records. This provides automated reminders, fault alerts, cloud backup, and instant compliance reporting.
              </p>
            </div>

            <MaintenanceRecordsQuickCheck />
          </div>
        </div>

        {/* Section 4: Legal and Regulatory Role of Records */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-foreground">Legal and Regulatory Role of Records</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
              Under the Regulatory Reform (Fire Safety) Order 2005, the Responsible Person has a legal duty to maintain life-safety systems in efficient working order. Maintenance records provide the only evidence that this duty has been fulfilled.
            </p>

            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-red-500">
              <p className="font-semibold text-red-400 mb-3 text-sm sm:text-base">Legal Framework</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Fire inspectors and insurers may request records at any time. Missing or incomplete records can result in:
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-md">
              <p className="font-semibold text-red-400 mb-3 text-sm sm:text-base">⚠️ Legal Consequences:</p>
              <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1 font-bold">⚠</span>
                  <span>Enforcement notices requiring immediate action</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1 font-bold">⚠</span>
                  <span>Invalid insurance policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1 font-bold">⚠</span>
                  <span>Criminal prosecution, unlimited fines, and up to 2 years' imprisonment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1 font-bold">⚠</span>
                  <span>Increased civil liability in the event of fire-related injury or death</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-600">
              <p className="font-semibold text-foreground mb-2 text-sm sm:text-base lg:text-lg">Who is the Responsible Person?</p>
              <p className="text-foreground text-sm sm:text-base">
                The building's Responsible Person under the Fire Safety Order (usually the building owner, employer, or facilities manager) has legal accountability for maintaining life-safety systems and ensuring records are complete and accurate. While routine testing can be delegated to competent staff or contractors, the Responsible Person retains ultimate legal responsibility.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-md">
              <p className="font-semibold text-amber-400 mb-2 text-sm sm:text-base">💡 Electrician's Professional Responsibility:</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Never hand over an emergency lighting installation without complete labelling and documentation. Educate clients on their legal responsibilities and ensure they understand the importance of ongoing record-keeping.
              </p>
            </div>

            <LegalRecordsQuickCheck />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};