import React from 'react';

const PracticalTipsTab = () => {
  return (
    <div className="space-y-4 text-gray-300">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-emerald-400 mb-3">Practical Completion Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Professional Presentation:</h5>
            <ul className="space-y-1">
              <li>• Use black ink only (blue acceptable for client signatures)</li>
              <li>• Write in clear block capitals throughout</li>
              <li>• Avoid abbreviations unless standard (e.g., MCB, RCD)</li>
              <li>• Cross through errors with single line, initial changes</li>
              <li>• Use continuation sheets if insufficient space</li>
              <li>• Ensure all pages are dated and referenced</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Technical Accuracy:</h5>
            <ul className="space-y-1">
              <li>• Double-check all numerical values and units</li>
              <li>• Verify protective device characteristics match installation</li>
              <li>• Ensure test results are within acceptable limits</li>
              <li>• Cross-reference circuit numbers between schedules</li>
              <li>• Confirm earthing arrangements are correctly described</li>
              <li>• Validate cable specifications and installation methods</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-blue-400 mb-3">Certificate Storage and Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Required Copies:</h5>
            <ul className="space-y-1">
              <li>• Original to client (property owner/occupier)</li>
              <li>• Copy for contractor records (minimum 6 years)</li>
              <li>• Copy to Building Control (if notifiable work)</li>
              <li>• Copy to Competent Person Scheme</li>
              <li>• Insurance company copy (if requested)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Digital Best Practices:</h5>
            <ul className="space-y-1">
              <li>• Scan certificates at high resolution (minimum 300dpi)</li>
              <li>• Store in secure, backed-up location</li>
              <li>• Use PDF format for distribution</li>
              <li>• Implement version control for amendments</li>
              <li>• Maintain client database with certificate references</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-amber-400 mb-3">Legal and Insurance Considerations</h4>
        <p className="text-sm mb-3">
          Electrical certificates have significant legal implications. They may be required as evidence 
          in insurance claims, property sales, legal disputes, or Health and Safety investigations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Legal Requirements:</h5>
            <ul className="space-y-1">
              <li>• Certificates must be retained for minimum periods (6 years minimum)</li>
              <li>• False certification is a criminal offence under Building Regulations</li>
              <li>• Competent person must personally verify all work</li>
              <li>• Professional indemnity insurance essential (minimum £1M recommended)</li>
              <li>• Duty of care to client and future occupants</li>
              <li>• Compliance with CDM Regulations where applicable</li>
              <li>• Data protection considerations for client information</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Professional Standards:</h5>
            <ul className="space-y-1">
              <li>• Maintain continuous professional development (CPD)</li>
              <li>• Stay current with regulation changes and updates</li>
              <li>• Use calibrated test equipment only (annual calibration)</li>
              <li>• Document limitations and exclusions clearly</li>
              <li>• Provide clear explanations to clients in plain English</li>
              <li>• Maintain professional competence and qualifications</li>
              <li>• Follow industry codes of practice and ethics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-violet-400 mb-3">Quality Assurance and Verification</h4>
        <div className="text-sm space-y-3">
          <p>
            Implementing systematic quality assurance procedures ensures consistent, accurate 
            certificate completion and reduces the risk of errors or omissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Pre-Completion Checks:</h5>
              <ul className="space-y-1">
                <li>• Verify all sections are applicable and completed</li>
                <li>• Cross-check test results against acceptable values</li>
                <li>• Confirm circuit descriptions match actual installation</li>
                <li>• Validate protective device ratings and characteristics</li>
                <li>• Ensure earthing and bonding arrangements are documented</li>
                <li>• Verify compliance with special location requirements</li>
                <li>• Check calculations and design assumptions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Post-Completion Review:</h5>
              <ul className="space-y-1">
                <li>• Independent review by competent colleague (where possible)</li>
                <li>• Verification of all signatures and dates</li>
                <li>• Technical review of test results and observations</li>
                <li>• Confirmation of schedule attachments</li>
                <li>• Client explanation and handover procedures</li>
                <li>• Record retention and filing procedures</li>
                <li>• Follow-up requirements and timescales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-orange-400 mb-3">Client Communication and Education</h4>
        <div className="text-sm space-y-3">
          <p>
            Effective communication with clients is essential for professional service and 
            helps ensure they understand their responsibilities and the importance of the certification.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Pre-Work Discussion:</h5>
              <ul className="space-y-1">
                <li>• Explain scope and limitations of work to be undertaken</li>
                <li>• Discuss access requirements and potential disruptions</li>
                <li>• Clarify responsibilities and expectations</li>
                <li>• Outline testing procedures and safety requirements</li>
                <li>• Confirm timescales and arrangements</li>
                <li>• Provide cost estimates and terms</li>
                <li>• Document any special requirements or constraints</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Certificate Handover:</h5>
              <ul className="space-y-1">
                <li>• Explain certificate contents in plain English</li>
                <li>• Highlight any defects or recommendations</li>
                <li>• Discuss next inspection requirements</li>
                <li>• Provide guidance on maintenance and care</li>
                <li>• Explain Building Control notification requirements</li>
                <li>• Provide contact details for follow-up queries</li>
                <li>• Document client acknowledgment and understanding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-teal-400 mb-3">Common Mistakes and How to Avoid Them</h4>
        <div className="text-sm space-y-3">
          <p>
            Learning from common errors helps improve certificate quality and reduces 
            the risk of regulatory or professional issues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Technical Errors to Avoid:</h5>
              <ul className="space-y-1">
                <li>• Incorrect units (Ω vs MΩ, mA vs A confusion)</li>
                <li>• Temperature correction not applied to resistance values</li>
                <li>• Wrong earthing system identification (TN-S vs TN-C-S)</li>
                <li>• Inadequate circuit descriptions ("sockets" vs "ring final circuit")</li>
                <li>• Missing or incorrect protective device characteristics</li>
                <li>• Test results that exceed acceptable limits without explanation</li>
                <li>• Incomplete observation codes without justification</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Administrative Errors to Avoid:</h5>
              <ul className="space-y-1">
                <li>• Unsigned or undated certificates (legally invalid)</li>
                <li>• Missing competent person scheme details</li>
                <li>• Incomplete client contact information</li>
                <li>• No reference to schedule attachments</li>
                <li>• Illegible handwriting or unclear corrections</li>
                <li>• Missing insurance or registration details</li>
                <li>• Inadequate record keeping and filing</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
            <h6 className="font-medium text-red-400 mb-2">🚫 Critical Errors That Must Be Avoided</h6>
            <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <strong>Never:</strong> Sign certificates for work you haven't personally verified
              </div>
              <div>
                <strong>Never:</strong> Issue certificates for work that doesn't comply with regulations
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-400 mb-3">Professional Development and Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Continuing Education:</h5>
            <ul className="space-y-1">
              <li>• Regular BS 7671 update courses and seminars</li>
              <li>• Competent Person Scheme assessment updates</li>
              <li>• Industry conferences and technical presentations</li>
              <li>• Online learning and certification programmes</li>
              <li>• Peer review and knowledge sharing sessions</li>
              <li>• Manufacturer training on new products and technologies</li>
              <li>• Health and safety refresher training</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Professional Resources:</h5>
            <ul className="space-y-1">
              <li>• IET Wiring Regulations (BS 7671) - current edition</li>
              <li>• IET Guidance Notes for electrical installations</li>
              <li>• Professional institution technical guidance</li>
              <li>• Competent Person Scheme technical bulletins</li>
              <li>• Industry magazines and technical publications</li>
              <li>• Professional networking and discussion forums</li>
              <li>• Regulatory updates and government guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalTipsTab;