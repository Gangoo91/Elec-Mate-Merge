import React from 'react';

const MWCCompletionTab = () => {
  return (
    <div className="space-y-4 text-white">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-purple-400 mb-3">Minor Works Certificate Usage and Application</h4>
        <div className="text-sm space-y-3">
          <p>
            Minor Works Certificates are designed for small electrical works that don't require 
            full design verification but still need certification for Building Regulations compliance. 
            They provide a simplified certification route for straightforward additions and modifications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Suitable Works Include:</h5>
              <ul className="space-y-1">
                <li>• Additional socket outlets on existing final circuits (domestic only)</li>
                <li>• Additional lighting points on existing circuits</li>
                <li>• Replacement of damaged electrical accessories</li>
                <li>• Like-for-like protective device replacement (same rating/type)</li>
                <li>• Simple extensions to existing circuits (no new protective devices)</li>
                <li>• Replacement of immersion heater elements</li>
                <li>• Replacement of electrical accessories (switches, sockets)</li>
                <li>• Minor alterations not affecting circuit integrity</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">NOT Suitable For:</h5>
              <ul className="space-y-1">
                <li>• New circuits from consumer unit (requires EIC)</li>
                <li>• Consumer unit replacements or modifications</li>
                <li>• Work in special locations (bathrooms zones 1-2)</li>
                <li>• Work requiring Building Control notification</li>
                <li>• Any work affecting installation earthing/bonding</li>
                <li>• Outdoor installations or garden lighting</li>
                <li>• Commercial or industrial installations</li>
                <li>• Work requiring design calculations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-400 mb-3">MWC Detailed Testing Requirements</h4>
        <div className="text-sm space-y-3">
          <p>
            Although minor works require fewer tests than new installations, the testing must 
            still verify that the work is safe and compliant. All tests must be carried out 
            by a competent person using calibrated instruments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Essential Tests:</h5>
              <ul className="space-y-1">
                <li>• <strong>Continuity of CPC:</strong> Verify protective conductor integrity (≤ calculated value)</li>
                <li>• <strong>Insulation Resistance:</strong> Test between live conductors and earth (≥1.0MΩ)</li>
                <li>• <strong>Polarity:</strong> Confirm correct connections at switches and socket outlets</li>
                <li>• <strong>Earth Fault Loop (Zs):</strong> Measure at furthest point of work (within limits)</li>
                <li>• <strong>RCD Operation:</strong> Test if circuit RCD protected (½×, 1×, 5× rated current)</li>
                <li>• <strong>Functional Testing:</strong> Verify all new equipment operates correctly</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Test Considerations:</h5>
              <ul className="space-y-1">
                <li>• Test instruments must be calibrated and suitable for use</li>
                <li>• Isolation procedures must be followed (safe isolation)</li>
                <li>• Existing installation condition may affect test results</li>
                <li>• Temperature correction may be required for resistance values</li>
                <li>• Parallel paths in TN systems affect Zs measurements</li>
                <li>• RCD test may trip other circuits - warn occupants</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-teal-400 mb-3">MWC Documentation and Completion Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Essential Documentation Elements:</h5>
            <ul className="space-y-1">
              <li>• <strong>Description of Work:</strong> Specific details of what was done and where</li>
              <li>• <strong>Departure Information:</strong> Any deviations from BS 7671 requirements</li>
              <li>• <strong>Test Results:</strong> All measurements recorded with appropriate units</li>
              <li>• <strong>Existing Installation:</strong> Comments on condition and any observations</li>
              <li>• <strong>Signature and Date:</strong> Installer must sign and date with qualifications</li>
              <li>• <strong>Company Details:</strong> Registration numbers and contact information</li>
              <li>• <strong>Client Information:</strong> Clear identification of responsible person</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Common Completion Errors:</h5>
            <ul className="space-y-1">
              <li>• Vague work descriptions ("fitted socket" vs "additional socket outlet")</li>
              <li>• Missing test results or incorrect units (Ω vs MΩ confusion)</li>
              <li>• Unsigned certificates or missing dates</li>
              <li>• No departure information when deviations exist</li>
              <li>• Inadequate comments on existing installation condition</li>
              <li>• Missing or incorrect protective device information</li>
              <li>• No reference to circuit modifications made</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
          <h6 className="font-medium text-amber-400 mb-2">💡 Professional Tip</h6>
          <p className="text-xs">
            Always photograph the work area before and after completion. This provides 
            evidence of the existing condition and the quality of workmanship. Include 
            photos with the certificate copy for your records.
          </p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-cyan-400 mb-3">MWC Practical Examples and Scenarios</h4>
        <div className="text-sm space-y-3">
          <p>
            Understanding practical applications helps determine when MWCs are appropriate 
            and ensures correct completion for different types of minor works.
          </p>
          <div className="space-y-4">
            <div className="bg-muted/20 p-3 rounded">
              <h6 className="font-medium text-foreground mb-2">Example 1: Additional Socket Outlet</h6>
              <p className="text-xs mb-2">Work: Adding socket outlet to kitchen ring circuit</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>Description:</strong> "Additional 13A socket outlet added to kitchen ring final circuit"</li>
                <li>• <strong>Tests Required:</strong> R1+R2, insulation resistance, polarity, Zs at new socket</li>
                <li>• <strong>Considerations:</strong> Check existing circuit loading, cable routing, RCD protection</li>
                <li>• <strong>Departure:</strong> None (assuming compliant addition to existing ring)</li>
              </ul>
            </div>
            
            <div className="bg-muted/20 p-3 rounded">
              <h6 className="font-medium text-foreground mb-2">Example 2: Light Fitting Replacement</h6>
              <p className="text-xs mb-2">Work: Replacing ceiling rose with LED fitting</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>Description:</strong> "Replacement of ceiling rose with LED luminaire in dining room"</li>
                <li>• <strong>Tests Required:</strong> Continuity of CPC, insulation resistance, polarity, functional test</li>
                <li>• <strong>Considerations:</strong> Switch loop wiring, earth at fitting, lamp compatibility</li>
                <li>• <strong>Departure:</strong> May apply if no earth at original ceiling rose</li>
              </ul>
            </div>
            
            <div className="bg-muted/20 p-3 rounded">
              <h6 className="font-medium text-foreground mb-2">Example 3: MCB Replacement</h6>
              <p className="text-xs mb-2">Work: Like-for-like replacement of faulty MCB</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>Description:</strong> "Replacement of 32A Type B MCB in position 3 of main consumer unit"</li>
                <li>• <strong>Tests Required:</strong> Insulation resistance, Zs at circuit end, RCD test if applicable</li>
                <li>• <strong>Considerations:</strong> Breaking capacity, discrimination, circuit integrity</li>
                <li>• <strong>Departure:</strong> None (like-for-like replacement)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MWCCompletionTab;