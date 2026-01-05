import { HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section2FAQ = () => {
  return (
    <Card className="bg-gradient-to-r from-cyan-900/20 to-elec-gray border-cyan-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Documentation and Quality Control FAQ
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-cyan-600 text-foreground">Expert Guidance</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="space-y-4">
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: Can the same person sign all three sections of an EIC (designer, constructor, inspector)?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Yes, provided they are competent for all three roles. However, this person takes full responsibility 
              for design, construction, and verification. For complex installations, it's often preferable to have independent 
              verification. The person must genuinely fulfill each role - they cannot simply sign as inspector without actually 
              performing comprehensive inspection and testing. Each signature represents a professional declaration of competence 
              and compliance in that specific role.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: When can I use a Minor Works Certificate instead of an EIC?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> MEIWC is appropriate for small additions or alterations that don't affect the main characteristics 
              of the installation and don't require design calculations. Examples include: adding socket outlets or lighting points, 
              replacing accessories, installing outside lighting. It cannot be used for: new circuits to special locations, 
              consumer unit changes, work requiring design verification, or installations requiring building control notification. 
              When in doubt, use an EIC as it provides comprehensive coverage and is always acceptable.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I determine the correct EICR coding (C1, C2, C3, FI)?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Apply codes based on safety risk assessment: <strong>C1</strong> = immediate danger requiring 
              urgent action (live exposed conductors, dangerous conditions); <strong>C2</strong> = potentially dangerous requiring 
              urgent remedial action (non-compliant earthing, inadequate protection); <strong>C3</strong> = improvement recommended 
              for enhanced safety (non-compliance with current standards but not immediately dangerous); <strong>FI</strong> = 
              further investigation required where inspection cannot be completed. Always err on the side of caution - if unsure 
              between codes, choose the higher risk category and document your reasoning.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What should I do if test results exceed acceptable limits?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Do not issue a certificate with non-compliant results. Investigate the cause: check test 
              equipment calibration, verify test methods, examine connections and terminations. If results are genuinely 
              non-compliant, perform remedial work and re-test. Document all findings and corrective actions. For borderline 
              results, consider temperature corrections, measurement uncertainty, and safety margins. Only certify when satisfied 
              that the installation is safe and compliant. Inform the client of any issues and required remedial work before 
              proceeding with certification.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: Are digital certificates legally acceptable?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Yes, digital certificates are legally acceptable provided they maintain document integrity, 
              include all required information, and can be reproduced in hard copy when needed. Electronic signatures must be 
              legally valid under Electronic Communications Act 2000. The certificate must be tamper-evident and maintain an 
              audit trail. However, some clients or authorities may still require hard copies, so always check requirements. 
              Ensure digital systems have adequate backup and recovery procedures, and that certificates remain accessible 
              throughout their required retention period.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I handle documentation for phased installations?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Issue separate certificates for each phase that can operate safely and independently. Each 
              certificate should clearly define the scope and boundaries of that phase. For the final phase, ensure overall 
              system integration is verified and documented. Consider issuing a completion certificate when all phases are 
              finished. Clearly document interfaces between phases and any temporary arrangements. Ensure each phase meets 
              all safety requirements independently - don't rely on future phases for compliance. Maintain clear project 
              documentation showing the relationship between certificates and overall installation scope.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What information must be included in the Schedule of Test Results?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Complete all sections: Circuit designation (clear identification), circuit description 
              (type and location), reference method (installation method), number of points served, type and rating of 
              protective device, conductor cross-sectional areas (live and protective), circuit length. Test results must 
              include: continuity of protective conductors, continuity of ring final conductors (where applicable), insulation 
              resistance, polarity, earth fault loop impedance, and RCD operation. All results must be compared against 
              acceptable limits and any non-conformances investigated and resolved before certification.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How long should I retain electrical certificates and documentation?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Minimum 6 years from completion (Limitation Act 1980), but recommend retaining throughout 
              installation life for practical and professional reasons. Include: original certificates, test results, 
              design calculations, material certificates, and any variation records. Consider longer retention for commercial 
              or public buildings where liability periods may be extended. Digital archives should include format migration 
              planning to ensure long-term accessibility. Maintain multiple backup copies in different locations. Some 
              insurance policies may specify longer retention periods, so check your professional indemnity requirements.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What should I do if I discover errors in a certificate after issue?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Act immediately to assess safety implications. For minor administrative errors (typos, 
              dates), issue a revised certificate clearly marked as "Revision 1" with explanation of changes. For technical 
              errors affecting safety or compliance, investigate thoroughly, perform remedial work if necessary, and issue 
              a completely new certificate. Inform all relevant parties (client, building control, competent person scheme) 
              of the error and corrective action. Document the error, investigation, and resolution for future reference. 
              Consider whether the error indicates systematic issues requiring broader quality improvement measures.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Professional Practice Checklist:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Before Starting Any Work:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Verify competence for proposed scope of work</li>
                <li>☐ Confirm appropriate certificate type required</li>
                <li>☐ Check building control notification requirements</li>
                <li>☐ Ensure test equipment is calibrated and appropriate</li>
                <li>☐ Plan documentation and quality control procedures</li>
                <li>☐ Establish clear communication with all stakeholders</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Before Issuing Certificates:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Verify all test results are within acceptable limits</li>
                <li>☐ Confirm all sections of certificate are complete</li>
                <li>☐ Check calculations and references are accurate</li>
                <li>☐ Ensure all signatures are genuine and authorised</li>
                <li>☐ Provide copies to all required parties promptly</li>
                <li>☐ Archive documentation with appropriate retention systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Emergency Procedures:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-1">Discovery of Immediate Danger</h6>
              <p className="text-sm">Isolate immediately, notify all affected parties, arrange emergency remedial work, document all actions taken, and notify relevant authorities as required.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <h6 className="font-bold text-orange-400 mb-1">Certificate Errors with Safety Implications</h6>
              <p className="text-sm">Assess immediate risk, implement temporary safety measures if needed, investigate thoroughly, correct any defects, and issue revised documentation promptly.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Client Disputes or Challenges</h6>
              <p className="text-sm">Remain professional, investigate concerns thoroughly, provide clear explanations with supporting evidence, seek independent verification if necessary, and document all interactions.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section2FAQ;