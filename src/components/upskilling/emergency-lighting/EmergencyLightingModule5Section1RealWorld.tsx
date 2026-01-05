import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingModule5Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3">Commercial Office Fit-Out Inspection Failure</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-foreground mb-2">The Project</h5>
              <p className="text-foreground text-sm">
                A prestigious 4-storey office building in Birmingham underwent a complete refurbishment with new 
                emergency lighting system comprising 180 self-contained luminaires and exit signs. The project had 
                a tight deadline to meet the client's move-in date, with handover scheduled in 3 weeks.
              </p>
              <p className="text-foreground text-sm mt-2">
                Initial inspection was arranged for week 2 to allow 1 week for defect rectification before final 
                commissioning and handover in week 3.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-foreground mb-2">The Problem Discovered</h5>
              <p className="text-foreground text-sm mb-3">
                During initial inspection, the verifying electrician identified multiple serious defects that 
                prevented system certification:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm space-y-2">
                <div className="text-foreground">
                  <span className="font-medium text-red-300">Critical Defect 1:</span> Fire-rated cables installed 
                  with plastic cable clips throughout 3rd and 4th floors (35 locations affected). BS 7671 Reg. 521.10.202 
                  requires non-combustible fixings.
                </div>
                <div className="text-foreground">
                  <span className="font-medium text-red-300">Critical Defect 2:</span> 12 exit signs pointing in 
                  wrong evacuation direction due to misinterpretation of drawings. Would lead occupants away from 
                  final exits during emergency.
                </div>
                <div className="text-foreground">
                  <span className="font-medium text-orange-300">Major Defect 1:</span> Standard PVC cable used through 
                  fire compartment walls instead of specified FP200 fire-rated cable (8 locations).
                </div>
                <div className="text-foreground">
                  <span className="font-medium text-orange-300">Major Defect 2:</span> Emergency lighting circuits 
                  not segregated from normal lighting — shared neutrals discovered at 3 distribution boards.
                </div>
                <div className="text-foreground">
                  <span className="font-medium text-yellow-300">Minor Defects:</span> Incomplete labelling (24 luminaires), 
                  4 luminaires with mounting height below 2m specification, distribution board circuit charts missing.
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-red-300 mb-2">The Consequence</h5>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Project Impact</p>
                  <div className="bg-black/30 p-3 rounded text-sm space-y-1">
                    <div className="text-foreground">
                      <span className="font-medium">Rectification Time:</span> 10 working days required to correct all 
                      critical and major defects (replacing fixings, re-routing cables, repositioning signs)
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Project Delay:</span> Client move-in date missed by 7 days, 
                      resulting in contractual penalties and reputational damage
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Additional Costs:</span> £8,500 for rectification works, including 
                      labour, materials (metal clips, fire-rated cables), and re-testing
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Re-Inspection:</span> Additional inspection visit required after 
                      rectification, further extending timeline
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Why It Happened</p>
                  <div className="text-foreground text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">→</span>
                      <span>Installation team did not review BS 7671 requirements for emergency lighting cable fixings</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">→</span>
                      <span>Design drawings misunderstood — exit sign arrows not properly interpreted for evacuation direction</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">→</span>
                      <span>Cable specification sheet not consulted during installation — standard stock cable used instead</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">→</span>
                      <span>No pre-installation briefing with design engineer to clarify requirements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">→</span>
                      <span>Project manager prioritised speed over compliance verification during installation phase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-green-300 mb-2">The Resolution</h5>
              <p className="text-foreground text-sm mb-2">
                The installation contractor took immediate action to rectify all defects:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Fixings Replaced:</span> All plastic clips removed and replaced 
                    with metal saddle clips throughout affected areas (2 days labour with 2 electricians)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Exit Signs Repositioned:</span> 12 signs removed, repositioned, 
                    and refixed to point in correct evacuation direction (1 day with design engineer verification)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Cables Replaced:</span> Fire compartment penetrations re-cored 
                    and FP200 cable installed in place of standard PVC (3 days including fire stopping)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Circuit Segregation:</span> Distribution boards rewired to 
                    separate emergency circuits with dedicated neutrals (2 days)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Documentation Completed:</span> All labelling, circuit charts, 
                    and luminaire numbering corrected (1 day)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h4>
          <ul className="text-foreground text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Initial inspection is not a formality</span> — it's a critical quality 
                check that protects all parties from costly rework and safety hazards
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Pre-installation briefings prevent defects</span> — ensure installation 
                teams fully understand specifications and compliance requirements before work starts
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Allow adequate time for inspection and rectification</span> — scheduling 
                initial inspection too close to handover date creates project risk
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Document reviews are essential</span> — cable specifications, design drawings, 
                and standards must be consulted during installation, not just afterwards
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Cutting corners creates bigger problems</span> — the £500 saved by using 
                plastic clips cost £8,500 to rectify plus project delays and reputational damage
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded p-3">
          <h5 className="font-medium text-blue-300 mb-2">Industry Impact</h5>
          <p className="text-foreground text-sm">
            Following this incident, the electrical contractor implemented mandatory design review meetings for all 
            emergency lighting projects and revised their quality control procedures to include mid-installation checks 
            before initial inspection. They also developed a pre-installation checklist specifically for emergency 
            lighting to prevent similar failures on future projects.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};