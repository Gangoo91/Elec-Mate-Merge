import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EICCompletionTab = () => {
  return (
    <div className="space-y-4 text-white">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-green-400 mb-3">EIC Completion Requirements</h4>
        <p className="text-sm mb-3">
          The Electrical Installation Certificate is required for all new electrical installations and substantial 
          modifications. It demonstrates that the design, construction, inspection, and testing have been completed 
          in accordance with BS 7671.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Essential Information:</h5>
            <ul className="space-y-1">
              <li>• Installation description and location (detailed address)</li>
              <li>• Design details and calculations (diversity, earthing, protection)</li>
              <li>• Construction method and timeline (installation methods used)</li>
              <li>• Inspection findings and observations (defects, limitations)</li>
              <li>• Test results for all circuits (complete schedule attached)</li>
              <li>• Materials and equipment specifications</li>
              <li>• Environmental conditions and special requirements</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Signatures Required:</h5>
            <ul className="space-y-1">
              <li>• Designer (if different from installer) - with qualification details</li>
              <li>• Constructor/Installer - with competence evidence</li>
              <li>• Inspector and Tester - with test instrument details</li>
              <li>• Client acknowledgment - confirming receipt and understanding</li>
              <li>• All signatures must be dated and include printed names</li>
              <li>• Qualifications and competency schemes must be stated</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-400 mb-3">Step-by-Step EIC Completion</h4>
        <ol className="space-y-3 text-sm">
          <li><strong>1. Installation Details:</strong> Complete full address, description of work, and installation characteristics</li>
          <li><strong>2. Design Information:</strong> Record design current, protective device ratings, earthing arrangements</li>
          <li><strong>3. Supply Characteristics:</strong> Note supply type (TN-S, TN-C-S, TT), voltage, frequency, and supply authority details</li>
          <li><strong>4. Earthing and Bonding:</strong> Record earthing conductor sizes, bonding arrangements, and electrode details</li>
          <li><strong>5. Protective Devices:</strong> List all consumer units, RCDs, MCBs with ratings and characteristics</li>
          <li><strong>6. Circuit Information:</strong> Complete circuit schedule with all required technical details</li>
          <li><strong>7. Test Results:</strong> Attach completed Schedule of Test Results with all measurements</li>
          <li><strong>8. Inspection:</strong> Complete Schedule of Inspections noting any defects or limitations</li>
          <li><strong>9. Recommendations:</strong> Note any improvements needed or future maintenance requirements</li>
          <li><strong>10. Signatures:</strong> Ensure all responsible persons sign with dates and qualifications</li>
        </ol>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-amber-400 mb-3">Common EIC Completion Errors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Documentation Errors:</h5>
            <ul className="space-y-1">
              <li>• Incomplete installation descriptions (vague or generic descriptions)</li>
              <li>• Missing or incorrect test values (especially R1+R2, Zs, RCD times)</li>
              <li>• Unsigned or undated sections (particularly dangerous)</li>
              <li>• Illegible handwriting or corrections (use block capitals)</li>
              <li>• Missing schedule attachments (essential supporting documentation)</li>
              <li>• Incorrect supply characteristics (voltage, earthing type)</li>
              <li>• Missing protective device details (type, rating, breaking capacity)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Technical Errors:</h5>
            <ul className="space-y-1">
              <li>• Incorrect diversity calculations (overloading circuits)</li>
              <li>• Wrong earthing arrangement selection (TN-S vs TN-C-S confusion)</li>
              <li>• Missing or incorrect RCD information (type, rating, test results)</li>
              <li>• Inadequate circuit descriptions (room locations, socket quantities)</li>
              <li>• Non-compliant protective device ratings (discrimination issues)</li>
              <li>• Voltage drop calculations errors (cable length/load assumptions)</li>
              <li>• Incorrect Zs values (not accounting for temperature correction)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-blue-400 mb-3">Design Responsibility and Calculations</h4>
        <div className="text-sm space-y-3">
          <p>
            The design section must clearly identify who was responsible for the design and 
            verify that appropriate calculations and selections have been made. This is critical 
            for safety and compliance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Design Elements to Document:</h5>
              <ul className="space-y-1">
                <li>• Maximum demand assessment (diversity calculations)</li>
                <li>• Earthing and bonding arrangements (TN, TT, IT systems)</li>
                <li>• Circuit design and protection coordination</li>
                <li>• Special location requirements (bathrooms, kitchens)</li>
                <li>• RCD and RCBO selections (type, sensitivity, time delay)</li>
                <li>• Cable sizing calculations (current capacity, voltage drop)</li>
                <li>• Protective device discrimination and coordination</li>
                <li>• Environmental factor considerations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">When Design Responsibility Applies:</h5>
              <ul className="space-y-1">
                <li>• Complete new installations (domestic, commercial, industrial)</li>
                <li>• Consumer unit replacements (main switch, RCD protection)</li>
                <li>• Circuit additions or modifications (new circuits, extensions)</li>
                <li>• Work requiring electrical design calculations</li>
                <li>• Addition of new circuits to existing consumer units</li>
                <li>• Work affecting special locations (IP ratings, zones)</li>
                <li>• Any work that significantly alters installation characteristics</li>
                <li>• Commercial or industrial installation work</li>
                <li>• Installations with renewable energy sources</li>
                <li>• Electric vehicle charging installations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-purple-400 mb-3">Quality Assurance Checklist</h4>
        <div className="text-sm space-y-2">
          <h5 className="font-medium text-foreground mb-2">Before Submitting EIC:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-1">
              <li>✓ All sections completed in block capitals</li>
              <li>✓ No blank fields (use N/A where appropriate)</li>
              <li>✓ All calculations checked and verified</li>
              <li>✓ Test results within acceptable limits</li>
              <li>✓ Schedule of Inspections attached</li>
              <li>✓ Schedule of Test Results attached</li>
              <li>✓ Circuit diagrams provided where required</li>
            </ul>
            <ul className="space-y-1">
              <li>✓ All signatures present with dates</li>
              <li>✓ Qualifications and schemes noted</li>
              <li>✓ Company registration details included</li>
              <li>✓ Insurance details provided</li>
              <li>✓ Client copy prepared and issued</li>
              <li>✓ Building Control notified (if required)</li>
              <li>✓ Competent Person Scheme notification submitted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EICCompletionTab;