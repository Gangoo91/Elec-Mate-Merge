import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingPracticalSection6_1 = () => {
  const guidance = [
    {
      title: "Always use the latest published standards",
      description: "Design using the latest published version of BS 5266-1 and EN 1838 (check for amendments). BSI regularly updates standards — using outdated versions can result in non-compliance even if the older version was followed correctly.",
      tip: "Subscribe to BSI updates or check the BSI website before starting any new project."
    },
    {
      title: "Conduct thorough risk assessments",
      description: "Cross-check design decisions with building risk assessments and fire strategy drawings. The fire risk assessment identifies specific hazards, occupancy levels, and evacuation challenges that directly inform emergency lighting requirements.",
      tip: "Request the fire risk assessment early in the design process — don't wait until installation begins."
    },
    {
      title: "Document everything with standard references",
      description: "Include specific clause numbers and standard references in your design documentation. This demonstrates professional competence, proves due diligence, and provides clear justification for design decisions during audits or legal proceedings.",
      tip: "Create a design statement that explicitly references BS 5266-1 clauses for every major design decision."
    },
    {
      title: "Maintain photometric evidence",
      description: "Keep detailed photometric calculations and lux measurements. Use calibrated lux meters and document readings at critical points along escape routes, in open areas, and at changes in level or direction.",
      tip: "Take photographs of lux meter readings with visible location markers for your records."
    },
    {
      title: "Be audit-ready with clause justifications",
      description: "During inspection or audit, be ready to reference specific clauses that justify your design choices. Inspectors and fire officers expect you to demonstrate competence by citing relevant standards, not just relying on 'industry practice'.",
      tip: "Prepare a compliance matrix matching each system element to its governing clause."
    },
    {
      title: "Provide comprehensive handover training",
      description: "Train clients to maintain systems according to BS 5266-8 testing intervals. Many system failures occur due to inadequate maintenance, not poor installation. The Responsible Person must understand their ongoing obligations.",
      tip: "Provide a maintenance manual with testing schedules, logbook templates, and emergency contact details."
    },
    {
      title: "Consider battery technology and lifespan",
      description: "Specify batteries with appropriate chemistry and lifespan for the application. Lead-acid, NiCd, NiMH, and lithium batteries each have different characteristics, maintenance requirements, and replacement intervals.",
      tip: "Factor battery replacement costs into client budgets — unexpected replacement costs damage professional relationships."
    },
    {
      title: "Plan for system testing during commissioning",
      description: "Allow adequate time for full commissioning tests, including complete discharge testing of all luminaires. Rushed commissioning often misses faults that only appear during extended operation.",
      tip: "Schedule commissioning tests overnight or during building closure to avoid disruption."
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
