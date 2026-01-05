import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, ClipboardCheck, FileCheck, Shield, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection6_4 = () => {
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean>>({});

  const handleCheckAnswer = (id: string) => {
    setCheckAnswers(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow drop-shadow-md" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Section 1: Role of Documentation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            1. The Role of Documentation in Compliance
          </h3>
          
          <p className="leading-relaxed">
            Documentation serves as legal evidence that the system:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Was designed and installed to the correct standards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Has been tested, maintained, and remains in good working order</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Is under the control of a Responsible Person who is meeting their obligations under the RRO</span>
            </li>
          </ul>
          <p className="leading-relaxed font-semibold">
            Without this paper trail, compliance cannot be demonstrated — regardless of system performance.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">✅ Quick Check</h4>
                <p className="text-foreground text-sm font-medium mb-2">
                  Why is documentation as important as the emergency lighting installation itself?
                </p>
                {!checkAnswers['check1'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check1')}
                    className="bg-purple-600 hover:bg-purple-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-foreground text-sm leading-relaxed">
                      <strong>Answer:</strong> Because it provides the legal evidence needed to demonstrate compliance. 
                      Even a perfectly functioning system will fail an inspection if proper documentation cannot be produced. 
                      The paper trail proves the system was designed, installed, tested, and maintained correctly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Documents Required */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            2. Documents Required for Fire Authority Audits
          </h3>
          
          <p className="leading-relaxed">
            Fire Authorities typically expect to review the following:
          </p>

          {/* a. Design and Installation Records */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">a. Design and Installation Records</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>System design drawings and risk-based design statements</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Specification documents referencing BS 5266-1 and EN 1838 clauses</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Cable routing and circuit identification plans</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* b. Testing and Maintenance Records */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">b. Testing and Maintenance Records</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Emergency lighting logbook showing all monthly and annual test entries</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Records of remedial work or component replacement</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Proof that any failed luminaires were repaired or retested</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* c. Certification */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">c. Certification</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Commissioning certificate (BS 5266-1 Annex G)</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Electrical Installation Certificate (BS 7671)</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Design Declaration Certificate (verifying standards compliance)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* d. Risk Assessment and Fire Strategy */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">d. Risk Assessment and Fire Strategy</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>The latest fire risk assessment incorporating emergency lighting requirements</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground text-sm">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Fire strategy drawings showing escape routes, fire doors, alarms, and lighting integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">✅ Quick Check</h4>
                <p className="text-foreground text-sm font-medium mb-2">
                  Name three specific documents inspectors will always request during a fire safety audit.
                </p>
                {!checkAnswers['check2'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check2')}
                    className="bg-blue-600 hover:bg-blue-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-foreground text-sm leading-relaxed">
                      <strong>Answer:</strong> (1) System design drawings, (2) Emergency lighting logbook with all monthly and annual test entries, 
                      and (3) Commissioning certificate (BS 5266-1 Annex G). These three documents form the core of compliance demonstration.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Presentation and Accessibility */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            3. Presentation and Accessibility of Records
          </h3>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>All documents must be kept on-site and accessible — typically near the main fire alarm panel or security office</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Digital records are acceptable, but paper copies must be available during inspections</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Logbooks must be clearly legible and signed by the person performing tests</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
              <span>Old records should be retained for at least six years to demonstrate system history</span>
            </li>
          </ul>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">✅ Quick Check</h4>
                <p className="text-foreground text-sm font-medium mb-2">
                  Where should emergency lighting records normally be stored for easy access during inspection?
                </p>
                {!checkAnswers['check3'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check3')}
                    className="bg-green-600 hover:bg-green-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-foreground text-sm leading-relaxed">
                      <strong>Answer:</strong> Near the main fire alarm panel or security office. Records must be on-site and immediately 
                      accessible to inspectors, with both digital and paper copies available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Common Audit Failures */}
        <div className="space-y-4 pt-6 border-t border-gray-600">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            4. Common Audit Failures
          </h3>
          
          <p className="leading-relaxed">
            Fire inspectors regularly identify these recurring issues:
          </p>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>Missing or incomplete logbook entries</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>Certificates not signed or incorrectly dated</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>Out-of-date fire risk assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>Mismatch between system drawings and actual installation</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>No evidence of 3-hour duration testing</span>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-foreground mb-3">Such issues can lead to:</h4>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span><strong>Improvement Notices</strong> (requiring corrective action)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span><strong>Prohibition Notices</strong> (restricting building use)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span><strong>Fines or prosecution</strong> for serious breaches</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">✅ Quick Check</h4>
                <p className="text-foreground text-sm font-medium mb-2">
                  What are two common documentation errors that can cause audit failure?
                </p>
                {!checkAnswers['check4'] ? (
                  <Button 
                    onClick={() => handleCheckAnswer('check4')}
                    className="bg-orange-600 hover:bg-orange-700 text-foreground"
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-3">
                    <p className="text-foreground text-sm leading-relaxed">
                      <strong>Answer:</strong> (1) Missing or incomplete logbook entries, and (2) Certificates not signed or incorrectly dated. 
                      These simple administrative errors can result in enforcement notices, even when the physical system is fully functional.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};