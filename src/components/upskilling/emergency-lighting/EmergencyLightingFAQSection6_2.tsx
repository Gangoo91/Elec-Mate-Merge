import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const EmergencyLightingFAQSection6_2 = () => {
  const faqs = [
    {
      question: "Does the Fire Safety Order specify lighting levels?",
      answer: "No — the Regulatory Reform (Fire Safety) Order 2005 requires 'suitable' emergency lighting for safe evacuation but doesn't specify technical criteria. BS 5266-1 and EN 1838 provide the measurable standards used to prove 'suitability.' Fire authorities and courts treat compliance with these British Standards as demonstrating adequate provision. If your system meets BS 5266-1 and EN 1838, it satisfies the RRO requirement. If it doesn't, you cannot prove compliance regardless of what you think is 'adequate.'"
    },
    {
      question: "Who can act as the Responsible Person?",
      answer: "Usually the employer (for workplaces), building owner, landlord, managing agent, or a formally delegated facilities manager. The key factor is who has 'control' of the premises under Article 3 of the RRO. In complex buildings, multiple people may share Responsible Person duties — for example, a landlord responsible for common areas and tenants responsible for their own spaces. The duty cannot be completely delegated away; the ultimate Responsible Person remains accountable even when work is contracted to third parties. If unsure, seek professional advice — assuming someone else is responsible doesn't protect you legally."
    },
    {
      question: "How often must fire safety integration be reviewed?",
      answer: "The fire risk assessment (which determines emergency lighting requirements) must be reviewed whenever there are significant changes to the premises, and at minimum annually. Significant changes include alterations to the building layout, changes in use or occupancy levels, after fire incidents or near-misses, installation of new equipment that creates hazards, or following regulatory changes. After any building alterations, emergency lighting should be reviewed to ensure it still provides adequate coverage for the modified layout. Integration with fire alarms and evacuation procedures should be reviewed whenever these systems are modified or replaced."
    },
    {
      question: "What happens if the fire risk assessment and my emergency lighting design don't match?",
      answer: "If the FRA specifies requirements that your installed system doesn't meet (or vice versa), there is a compliance gap that needs resolving. First, verify which document is correct: is the FRA outdated or incorrect, or is the lighting system inadequate? If the FRA is wrong, it must be updated by a competent assessor. If the lighting is wrong, it must be upgraded or additional luminaires installed. Don't ignore discrepancies — document them formally and notify the client in writing. You may face liability if you knowingly installed a system that doesn't meet FRA requirements."
    },
    {
      question: "Can emergency lighting and fire alarms share the same circuits?",
      answer: "No — absolutely not. Emergency lighting must be independently supplied and must operate automatically on mains failure regardless of fire alarm status. Sharing circuits creates a single point of failure: if the shared circuit fails, both systems fail simultaneously. This is extremely dangerous. Emergency lighting and fire alarm systems may share control interfaces for coordinated triggering, but they must have separate, independent power supplies. BS 5266-1 explicitly requires independence of supply to ensure reliability during various failure scenarios."
    },
    {
      question: "What if fire inspectors request documents I don't have?",
      answer: "Be honest and explain why documents are missing, then act immediately to rectify the situation. If documents never existed (e.g., no commissioning certificate was produced), this is serious non-compliance requiring urgent remediation. If documents existed but are lost, attempt to reconstruct them: contact original contractors, search archived emails, check with building control. If reconstruction is impossible, consider retrospective commissioning by a competent contractor to produce current certificates. Missing documentation can result in Enforcement Notices requiring works to be repeated and certified properly. Never attempt to fabricate documents — this is fraud and will make the situation far worse if discovered."
    },
    {
      question: "Do I need a fire risk assessment before quoting emergency lighting work?",
      answer: "Absolutely yes — you cannot competently design or quote for emergency lighting without understanding the fire risk assessment findings. The FRA determines duration requirements (1 or 3 hours), identifies vulnerable occupants needing special provision, specifies high-risk areas, and defines the evacuation strategy (simultaneous or staged). Quoting blind based on floor area alone is unprofessional and potentially dangerous. Always request the current FRA before providing quotations, and state in your quote that pricing assumes the FRA provided is current and accurate. If the client cannot produce an FRA, recommend they commission one before proceeding with electrical work."
    },
    {
      question: "What enforcement powers do fire authorities actually use?",
      answer: "Fire authorities use a graduated approach: informal advice for minor issues, written recommendations for improvements, Enforcement Notices for significant failings requiring works within set timescales (typically 28 days to 6 months), Prohibition Notices for serious immediate risks (closing premises until rectified), and prosecution for persistent non-compliance or where serious risk to life exists. In 2023/24, UK fire authorities issued approximately 3,400 Enforcement Notices, 850 Prohibition Notices, and prosecuted 420 cases with average fines of £47,000 (though individual fines reached £250,000+). These are real powers used regularly — not theoretical threats. Compliance is always cheaper than enforcement."
    },
    {
      question: "If I'm just the electrician, am I liable for integration failures?",
      answer: "Potentially yes. While the Responsible Person has overall liability under the RRO, designers and contractors can face liability for negligent design or installation that contributes to non-compliance. If you design emergency lighting without consulting the FRA, without integrating it with the fire strategy, or without proper coordination with fire alarm systems, you may face professional negligence claims or even contributory liability in criminal proceedings if injury or death results. Professional competence requires considering integration — you cannot claim 'I just installed what I was told.' Document all concerns raised, all advice given, and all limitations in your scope of work. Professional indemnity insurance is essential but won't cover you if you acted negligently or outside your competence."
    },
    {
      question: "How do I demonstrate that emergency lighting is properly integrated?",
      answer: "Maintain comprehensive documentation showing: (1) Emergency lighting design explicitly referenced in the Fire Safety Strategy; (2) Unified drawings showing emergency lighting, fire alarms, escape routes, and fire-fighting equipment on the same plans; (3) Design statement explaining how lighting supports the evacuation strategy defined in the FRA; (4) Commissioning records proving integrated functions were tested (e.g., fire alarm interfaces, BMS links); (5) Interface wiring diagrams and logic descriptions for any control integration; (6) Handover documentation provided to Responsible Person explaining maintenance obligations and integration points. File copies of all integration documentation with the building's fire safety records. During audits, being able to immediately produce this evidence demonstrates professional competence and compliance."
    }
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
