import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: "faq1",
    question: "What's the difference between Zs and Ze, and why are both important?",
    answer: "Ze (external earth fault loop impedance) is the impedance of the supply system external to your installation, while Zs (earth fault loop impedance) is the total impedance including your installation cables. Ze is measured with the main earthing conductor disconnected, whilst Zs includes the resistance of your line and protective conductors (R1 + R2). Both are critical because Ze tells you what you're starting with from the supply, and Zs tells you if your installation will operate protective devices quickly enough during a fault."
  },
  {
    id: "faq2", 
    question: "Why do we need to apply temperature correction to earth fault loop impedance?",
    answer: "Cable resistance increases with temperature. During normal operation, cables heat up due to load current, increasing their resistance. Since earth fault loop impedance tests are usually performed with cables at ambient temperature, we must apply correction factors (1.25 for copper, 1.28 for aluminium) to predict the higher impedance that will exist during maximum operating conditions. This ensures protective devices will still operate correctly when cables are hot."
  },
  {
    id: "faq3",
    question: "What happens if my Zs reading is higher than the maximum permitted value?",
    answer: "High Zs readings indicate insufficient fault current will flow to operate the protective device within the required time (typically 0.4 seconds for final circuits). This creates a serious safety risk as the circuit may remain energised during an earth fault. You must investigate the cause - check connections, conductor sizes, and earthing arrangements. Solutions may include improving connections, upgrading protective conductors, or changing to a more sensitive protective device."
  },
  {
    id: "faq4",
    question: "Can I use calculated Zs values instead of measured values?",
    answer: "Measured values are always preferred and required by BS 7671 where practicable. However, calculated Zs values (Ze + R1 + R2) are acceptable for verification where direct measurement is not practical, such as inaccessible junction boxes. When calculating, you must use the measured Ze value, apply temperature correction to (R1 + R2), and ensure all values are based on actual installation conditions, not design assumptions."
  },
  {
    id: "faq5",
    question: "Why might I get different Zs readings at different points on the same circuit?",
    answer: "Zs naturally increases along radial circuits due to additional cable resistance. However, unexpected variations may indicate problems: loose connections causing high resistance, parallel earth paths affecting readings, cable damage or incorrect installation, or different cable sizes/types within the circuit. Consistent, gradual increases are normal; sudden jumps or decreases require investigation."
  },
  {
    id: "faq6",
    question: "How do I test Zs safely on an energised installation?",
    answer: "Use a calibrated earth fault loop impedance tester designed for live testing. Ensure the test current is appropriate (typically 10-25A) and won't cause nuisance RCD tripping. Wear appropriate PPE including insulated gloves. Be particularly careful when disconnecting the main earthing conductor for Ze measurement - this should only be done briefly and with appropriate safety measures. Never work alone and ensure others are aware of your activities."
  },
  {
    id: "faq7",
    question: "What's the significance of the maximum Zs values in BS 7671 tables?",
    answer: "These values ensure the protective device operates within the maximum disconnection time required for safety (0.4s for socket outlets, 5s for fixed equipment). The values are calculated based on the protective device characteristics and required disconnection times. They account for the minimum fault current needed to operate the device quickly enough to prevent dangerous touch voltages persisting. Different protective devices have different maximum Zs values due to their operating characteristics."
  },
  {
    id: "faq8",
    question: "Should I test Zs at every outlet or just a sample?",
    answer: "BS 7671 requires testing at least 10% of outlets, but best practice suggests testing more comprehensively. Always test the furthest point on each circuit, each type of protective device, and any points with challenging installation conditions. For critical safety circuits or special locations, consider 100% testing. The goal is to verify that protection operates correctly throughout the installation while being practical about time and cost."
  },
  {
    id: "faq9",
    question: "How do parallel earth paths affect Zs measurements?",
    answer: "Parallel earth paths (through gas pipes, water pipes, cable armour, etc.) can give artificially low Zs readings because they provide additional current paths during the test. This can mask problems with the intended protective conductor. While these paths may provide additional safety in practice, you shouldn't rely on them as they may be removed during maintenance. Document their presence and consider testing with bonding temporarily disconnected to verify the primary earth path."
  },
  {
    id: "faq10",
    question: "What should I do if I can't get a stable Zs reading?",
    answer: "Unstable readings often indicate poor connections or loose terminals. Check and tighten all relevant connections including consumer unit terminals, accessory terminals, and junction boxes. Verify test lead connections are secure and clean. Environmental factors like vibration or electromagnetic interference can also cause instability. If problems persist, investigate the protective conductor continuity separately and consider whether parallel paths are causing interference with the measurement."
  }
];

export const EarthFaultLoopFAQ = () => {
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