import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: "faq1",
    question: "How do I determine which test points are essential for Zs testing?",
    answer: "Essential test points include: the furthest outlet on each final circuit (worst-case impedance), each different type of protective device, all fixed equipment with exposed metalwork, and special locations like bathrooms or outdoor areas. For ring circuits, test both ends and the furthest point. For radial circuits, test the end point and consider intermediate points on long runs. Always prioritise safety-critical circuits and areas with challenging environmental conditions."
  },
  {
    id: "faq2",
    question: "What should I do if Zs readings vary significantly along the same circuit?",
    answer: "Significant variations indicate potential problems. Small increases along radial circuits are normal due to cable resistance, but sudden jumps suggest loose connections, cable damage, or incorrect installation. For ring circuits, both ends should read similarly. Investigate by checking connections systematically, verifying conductor continuity, and examining cable routes. Document the variations and determine if remedial work is needed before energising the circuit."
  },
  {
    id: "faq3",
    question: "How do I test Zs at lighting points when access is difficult?",
    answer: "Several approaches are available: remove the lamp and test directly at the lampholder terminals (safest method), use flexible test leads to access pendant fittings, test at accessible switch positions (though this gives switch loop impedance), or test at accessible junction boxes. If none are practical, calculate Zs using measured Ze and (R1 + R2) values. Always document the method used and any access limitations in your test report."
  },
  {
    id: "faq4",
    question: "Is it necessary to test every socket on a ring circuit?",
    answer: "No, but you must test strategically. Test both ends of the ring at the consumer unit, the furthest socket from the origin, and several intermediate points including any spurs. BS 7671 requires minimum 10% of outlets, but for ring circuits, testing key points (ends, furthest, and mid-points) is more important than a simple percentage. This approach reveals the circuit's impedance profile and identifies any irregularities."
  },
  {
    id: "faq5",
    question: "How do I handle three-phase equipment when testing Zs?",
    answer: "Test each phase to earth separately as impedances may vary due to different cable routes or connections. Record all three readings and use the highest value for compliance assessment. For motors, test at both the isolator and motor terminals. Check that the neutral is properly earthed at the supply. Be aware that motor star-point earthing or parallel paths through the motor windings can affect readings."
  },
  {
    id: "faq6",
    question: "What if my test equipment keeps tripping RCDs during Zs testing?",
    answer: "Use the lowest test current setting initially (often 10A rather than 25A). Some testers have specific 'RCD-compatible' or 'no-trip' modes that use lower currents or different test methods. Consider temporarily disabling the RCD for testing (with appropriate safety measures), or test during a maintenance window when the circuit can be isolated. Document any special procedures used and ensure safety is maintained throughout."
  },
  {
    id: "faq7",
    question: "How do parallel earth paths affect my Zs readings at different test points?",
    answer: "Parallel paths through bonded metalwork, cable armour, or other services can give artificially low readings, and their effect varies with location. Near the origin, parallel paths have more influence; at distant points, the circuit's own impedance dominates. This can mask protective conductor problems. Document known parallel paths and consider testing with bonding temporarily disconnected to verify the primary earth path integrity."
  },
  {
    id: "faq8",
    question: "Should I test Zs at outdoor sockets and equipment differently?",
    answer: "Outdoor installations require particular attention due to higher earth fault risks. Always test outdoor sockets, lighting, and equipment. Check that RCD protection is in place and functioning. Be aware that TT earthing systems are common for outbuildings, requiring different maximum Zs values. Consider environmental factors like moisture and corrosion that may affect connections. Document the earthing system type and RCD operation."
  },
  {
    id: "faq9",
    question: "How do I interpret Zs readings that are close to the maximum permitted values?",
    answer: "Readings approaching limits require careful consideration. Apply temperature correction if not already done. Consider measurement uncertainty (typically ±5% for test instruments). If still close to limits, investigate for potential improvements: tighten connections, check for corrosion, verify conductor sizes. Consider that the installation may deteriorate over time, so readings close to limits now may exceed them later. Document your assessment and any recommendations."
  },
  {
    id: "faq10",
    question: "What's the best approach for testing in occupied premises with sensitive equipment?",
    answer: "Plan testing carefully to minimise disruption. Use lower test currents initially and test during agreed hours. Identify and temporarily isolate electronic equipment that might be affected by test currents. Warn occupants about brief power interruptions. Consider testing circuits sequentially rather than whole installations. Use battery-powered test equipment to avoid extending test leads across working areas. Document any special arrangements and ensure customer liaison throughout."
  }
];

export const ZsTestingFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-foreground">Frequently Asked Questions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-white/20">
              <AccordionTrigger className="text-left text-foreground hover:text-elec-yellow text-sm sm:text-base py-3 sm:py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground text-xs sm:text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};