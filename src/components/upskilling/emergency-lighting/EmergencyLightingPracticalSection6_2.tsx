import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingPracticalSection6_2 = () => {
  const guidance = [
    {
      title: "Confirm emergency lighting is part of the Fire Safety Strategy",
      description: "Always verify that emergency lighting design forms part of the building's official Fire Safety Strategy Document before starting work. The strategy should explicitly reference emergency lighting provision, specify duration requirements, and identify critical areas requiring illumination.",
      tip: "Request the Fire Safety Strategy Document during the quotation stage — design decisions depend on it."
    },
    {
      title: "Use unified floor plans for all life-safety systems",
      description: "Label emergency lighting circuits on the same floor plan drawings used for fire alarms and evacuation routes. This ensures consistency, reveals integration gaps, and makes future modifications safer. Coordinated drawings prevent dangerous assumptions about system interactions.",
      tip: "Create a master life-safety drawing set showing fire alarms, emergency lighting, fire-fighting equipment, and escape routes overlaid."
    },
    {
      title: "Test integrated functions during commissioning",
      description: "Ensure fire alarm interfaces, BMS links, and other integrated system connections are tested together during commissioning. Don't just test emergency lighting in isolation — verify it works correctly when activated by fire alarm triggers, BMS commands, or staged evacuation sequences.",
      tip: "Schedule commissioning to include fire alarm contractor presence — test interface functions with both parties present."
    },
    {
      title: "Prepare comprehensive handover documentation",
      description: "Keep all certificates and records ready for inspection. Missing paperwork is treated as non-compliance even if the system works perfectly. Assemble a complete handover pack including design calculations, as-built drawings, commissioning certificates, test results, manufacturer datasheets, and maintenance schedules.",
      tip: "Create a dedicated fire safety folder (physical and digital) containing all emergency lighting documentation for easy inspector access."
    },
    {
      title: "Integrate testing into fire logbook procedures",
      description: "Encourage clients to integrate emergency lighting checks into their existing fire logbook routine. Monthly emergency lighting tests should occur alongside fire alarm tests, fire door checks, and fire-fighting equipment inspections. This creates a unified fire safety maintenance culture.",
      tip: "Provide pre-printed test record sheets that match the format of fire alarm logbooks — consistency improves compliance."
    },
    {
      title: "Educate Responsible Persons about their duties",
      description: "Many Responsible Persons don't understand they are personally liable for emergency lighting maintenance. Provide clear written guidance during handover explaining RRO obligations, testing requirements, enforcement powers, and potential penalties. Document that this guidance was provided.",
      tip: "Include a one-page 'Responsible Person Duties' summary with every emergency lighting installation — use plain English, not technical jargon."
    },
    {
      title: "Challenge inadequate fire risk assessments",
      description: "If the FRA provided is generic, outdated, or doesn't mention emergency lighting, raise this formally in writing with the client. Don't design systems based on inadequate risk assessments — you may inherit liability if the assessment was flawed and your system proves inadequate.",
      tip: "Keep records of any concerns raised about FRA quality — this demonstrates professional diligence if problems arise later."
    },
    {
      title: "Maintain coordination with other trades",
      description: "Liaise with fire alarm contractors, builders, decorators, and facilities managers to ensure emergency lighting isn't compromised by other works. Ceiling changes, partition additions, furniture layouts, and lighting alterations can all affect emergency lighting coverage.",
      tip: "Request notification of any building alterations during defects liability period — offer to review emergency lighting adequacy post-alterations."
    },
    {
      title: "Document interface arrangements clearly",
      description: "If emergency lighting integrates with fire alarms or BMS, document the interface wiring, logic, and operation clearly. Future maintenance engineers need to understand how systems interact to avoid dangerous modifications that break integration.",
      tip: "Create a simple wiring schematic showing interface connections, include it in O&M manuals, and fix a laminated copy inside relevant equipment."
    },
    {
      title: "Provide client training on enforcement procedures",
      description: "Help clients understand fire authority powers, typical audit processes, and what inspectors look for. Clients who understand enforcement are more likely to maintain systems and keep records properly. This protects both their business and your professional reputation.",
      tip: "Offer a brief (30-minute) post-handover training session covering RRO obligations, testing procedures, record-keeping, and what to expect during audits."
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-dark border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {guidance.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="text-foreground font-semibold mb-1">{item.title}</h4>
                <p className="text-foreground text-sm leading-relaxed mb-2">{item.description}</p>
                <div className="bg-blue-900/20 border border-blue-600/30 rounded p-2">
                  <p className="text-blue-300 text-xs">
                    <strong>💡 Pro Tip:</strong> {item.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
