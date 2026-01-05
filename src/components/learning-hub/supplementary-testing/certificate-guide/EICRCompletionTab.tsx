import React from 'react';

const EICRCompletionTab = () => {
  return (
    <div className="space-y-4 text-gray-300">
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-orange-400 mb-3">EICR Assessment Process</h4>
        <div className="text-sm space-y-3">
          <p>
            EICRs require careful assessment of existing installations against current standards, 
            considering the age and purpose of the installation. The assessment must be based on 
            safety rather than strict compliance with current regulations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Inspection Strategy:</h5>
              <ul className="space-y-1">
                <li>• Visual inspection of all accessible parts (consumer units, accessories)</li>
                <li>• Sample testing of circuits (typically 10% minimum)</li>
                <li>• Assessment of deterioration or damage (thermal damage, corrosion)</li>
                <li>• Review of previous reports and modifications</li>
                <li>• Assessment against current BS 7671 (where safety is concerned)</li>
                <li>• Identification of non-standard arrangements</li>
                <li>• Documentation of limitations and restrictions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Defect Classification:</h5>
              <ul className="space-y-1">
                <li>• <strong>C1:</strong> Danger present (immediate disconnection required)</li>
                <li>• <strong>C2:</strong> Potentially dangerous (urgent remedial action)</li>
                <li>• <strong>C3:</strong> Improvement recommended (not immediately dangerous)</li>
                <li>• <strong>FI:</strong> Further investigation required (insufficient access)</li>
                <li>• Clear explanations for each code required</li>
                <li>• Photographic evidence where appropriate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-cyan-400 mb-3">EICR Testing Strategy and Sampling</h4>
        <div className="text-sm space-y-3">
          <p>
            EICR testing differs from new installation testing. Sample testing is permitted, 
            but the inspector must ensure adequate coverage to identify potential safety issues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Sampling Guidelines:</h5>
              <ul className="space-y-1">
                <li>• <strong>Minimum 10%</strong> of all circuits tested</li>
                <li>• <strong>All RCDs</strong> must be tested (no sampling)</li>
                <li>• <strong>Main earthing</strong> and bonding connections tested</li>
                <li>• <strong>At least one point</strong> on each type of circuit</li>
                <li>• <strong>Highest risk areas</strong> prioritised (kitchens, bathrooms)</li>
                <li>• <strong>Oldest installations</strong> require more comprehensive testing</li>
                <li>• <strong>Any suspected problems</strong> fully investigated</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Risk-Based Testing Approach:</h5>
              <ul className="space-y-1">
                <li>• Areas of visible deterioration (priority testing)</li>
                <li>• High-use circuits (kitchen rings, shower circuits)</li>
                <li>• Outdoor installations (weathering effects)</li>
                <li>• Special locations (zones 1 and 2)</li>
                <li>• Circuits with known historical issues</li>
                <li>• Recently modified or extended circuits</li>
                <li>• Circuits serving critical safety systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-red-400 mb-3">EICR Coding Examples and Justifications</h4>
        <div className="text-sm space-y-3">
          <p>
            Understanding when to apply each code is crucial for accurate EICRs. 
            Each code must be justified with clear safety reasoning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">C1 Examples (Immediate Danger):</h5>
              <ul className="space-y-1">
                <li>• Live parts accessible to touch</li>
                <li>• Missing or damaged protective conductors</li>
                <li>• Severely damaged cables with exposed conductors</li>
                <li>• RCD not operating within time limits</li>
                <li>• Earth fault loop impedance exceeding limits</li>
                <li>• Equipment in dangerous condition</li>
                <li>• Insulation resistance below minimum values</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">C2 Examples (Potentially Dangerous):</h5>
              <ul className="space-y-1">
                <li>• Inadequate protective conductor sizing</li>
                <li>• Missing RCD protection where required</li>
                <li>• Non-compliant installations in special locations</li>
                <li>• Overloaded circuits or distribution boards</li>
                <li>• Poor workmanship affecting safety</li>
                <li>• Missing or inadequate main bonding</li>
                <li>• Incorrect polarity on lighting circuits</li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <h5 className="font-medium text-foreground mb-2">C3 Examples (Improvement Recommended):</h5>
            <ul className="space-y-1 text-xs">
              <li>• Missing supplementary bonding (where not required by current standards)</li>
              <li>• Old colour cable (red/black) - document for future reference</li>
              <li>• Lack of discrimination between protective devices</li>
              <li>• Missing labels or schedules</li>
              <li>• Outdated protective devices that could be upgraded</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-purple-400 mb-3">EICR Recommendations and Next Inspection</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Assessment Criteria:</h5>
            <ul className="space-y-1">
              <li>• Safety takes priority over strict regulatory compliance</li>
              <li>• Age and general condition of installation</li>
              <li>• Type of occupancy and usage patterns</li>
              <li>• Environmental conditions and exposure</li>
              <li>• Quality of original installation and maintenance</li>
              <li>• Cost-effectiveness of recommended improvements</li>
              <li>• Risk assessment considering all factors</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Next Inspection Periods:</h5>
            <ul className="space-y-1">
              <li>• <strong>Domestic (owner-occupied):</strong> 10 years maximum</li>
              <li>• <strong>Domestic (rented):</strong> 5 years maximum</li>
              <li>• <strong>Commercial offices:</strong> 5 years typical</li>
              <li>• <strong>Industrial premises:</strong> 3-5 years</li>
              <li>• <strong>Schools/hospitals:</strong> 5 years</li>
              <li>• <strong>Harsh environments:</strong> 1-3 years</li>
              <li>• <strong>Caravan/marina sites:</strong> 1 year</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
          <h6 className="font-medium text-amber-400 mb-2">⚠️ Inspection Period Factors</h6>
          <p className="text-xs">
            The recommended inspection period should be based on installation condition, 
            environment, and usage. A badly maintained installation may need inspection 
            in 1-2 years, whilst a well-maintained modern installation may be suitable 
            for the maximum period.
          </p>
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-emerald-400 mb-3">EICR Documentation Best Practices</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Essential Documentation:</h5>
            <ul className="space-y-1">
              <li>• Detailed observations with locations</li>
              <li>• Photographic evidence of defects</li>
              <li>• Limitations and restrictions clearly stated</li>
              <li>• Test results for sample circuits</li>
              <li>• Previous inspection history (if available)</li>
              <li>• Reasons for any codes applied</li>
              <li>• Recommendations prioritised by urgency</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Professional Standards:</h5>
            <ul className="space-y-1">
              <li>• Clear, unambiguous language throughout</li>
              <li>• Technical justification for all observations</li>
              <li>• Compliance with inspection scope</li>
              <li>• Accurate test results and measurements</li>
              <li>• Professional presentation and layout</li>
              <li>• Client discussion and explanation</li>
              <li>• Follow-up recommendations documented</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EICRCompletionTab;