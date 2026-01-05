import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const EmergencyLightingFAQSection6_1 = () => {
  const faqs = [
    {
      question: "What's the difference between BS 5266-1 and EN 1838?",
      answer: "BS 5266-1 covers system design, installation, and maintenance, while EN 1838 sets the photometric performance criteria (light levels and duration). BS 5266-1 is the 'how-to' guide — it tells you what type of system to install, where to place luminaires, how to wire them, and how to test them. EN 1838 is the 'performance standard' — it specifies the minimum lux levels, duration, uniformity ratios, and colour rendering requirements the system must achieve. You need both standards to design a compliant system."
    },
    {
      question: "Is compliance with BS 5266 mandatory by law?",
      answer: "BS 5266 is not legislation in itself, but it is the accepted standard of compliance under the Regulatory Reform (Fire Safety) Order 2005. The Fire Safety Order requires the Responsible Person to provide adequate emergency lighting. In legal terms, 'adequate' means compliant with BS 5266-1 and EN 1838. Failure to follow these standards can result in prosecution, prohibition notices, and liability for injury or death. Courts and fire officers treat BS 5266 as the benchmark for demonstrating due diligence."
    },
    {
      question: "How often are standards updated?",
      answer: "Typically every 5–10 years, with amendments published in between. The current version of BS 5266-1 is the 2016 edition (with 2025 amendments expected). Always confirm the current edition before designing or certifying — using an outdated version does not excuse non-compliance. Subscribe to BSI updates or check the BSI website for the latest amendments. Building regulations may also reference specific versions of standards, so verify which version applies to your project."
    },
    {
      question: "Do I need emergency lighting in a small office or shop?",
      answer: "Yes, if the premises have more than minimal artificial lighting or if the building has no direct exit to open air from every part. BS 5266-1 applies to virtually all non-domestic premises. Even a small shop or office needs emergency lighting if occupants could be unfamiliar with the layout, if there are internal rooms without natural light, or if evacuation in darkness would pose a risk. The only exceptions are very small premises with direct external access from all areas and predominantly natural lighting."
    },
    {
      question: "What's the difference between self-contained and centrally supplied systems?",
      answer: "Self-contained luminaires have individual batteries built into each unit. They are simpler to install, require less cable infrastructure, and failures are isolated to individual units. Central battery systems have one large battery bank supplying power to multiple non-maintained luminaires. They are more efficient for large installations, easier to maintain (one battery location), and typically have longer battery life. However, a central battery failure affects the entire system. Choice depends on building size, maintenance capabilities, and budget."
    },
    {
      question: "Can I use LED emergency lighting, or must it be fluorescent?",
      answer: "LED emergency lighting is fully compliant and increasingly preferred. EN 1838 is technology-neutral — it specifies performance (lux levels, duration, colour rendering), not technology. LED luminaires offer longer life, lower energy consumption, better reliability, and reduced maintenance. Ensure LED luminaires are certified to relevant standards, provide adequate colour rendering (Ra ≥ 40), and deliver consistent output throughout the rated duration. Modern LED emergency lighting often outperforms older fluorescent equivalents."
    },
    {
      question: "How do I calculate how many luminaires I need?",
      answer: "Use photometric software or manufacturer-supplied spacing tables based on luminaire lumen output and mounting height. For escape routes, ensure 1 lux minimum along the centre line. For open areas, achieve 0.5 lux minimum across the floor area with uniformity ratio ≤ 40:1. Luminaires must be placed at every exit, change of direction, stairway, change in floor level, fire equipment location, and first aid point. Spacing depends on luminaire output, mounting height, room dimensions, and surface reflectance. Always verify calculations with lux measurements during commissioning."
    },
    {
      question: "What happens if I install a non-compliant system?",
      answer: "You expose yourself, your employer, and the building owner to significant legal and financial risk. Non-compliant systems may be rejected by building control, preventing building occupancy. Fire officers can issue prohibition notices, closing the premises immediately. In the event of a fire-related injury or death, non-compliance may result in corporate manslaughter charges, prosecution under the Fire Safety Order (unlimited fines), and civil liability claims. Professional reputation damage can be irreparable. The cost of compliance is always less than the cost of non-compliance."
    },
    {
      question: "Do existing systems need upgrading to current standards?",
      answer: "Not automatically, but alterations or extensions trigger compliance reviews. Existing systems installed to earlier standards can remain in use if they provide adequate safety. However, any modification, extension, or change in building use requires the entire system to be reviewed against current standards. Fire risk assessments may identify shortcomings in older systems even without physical changes. Best practice is to conduct periodic reviews (every 5 years) and budget for upgrades as standards evolve. Some insurance policies may require compliance with current standards regardless of installation date."
    },
    {
      question: "What records must I keep, and for how long?",
      answer: "Keep all design calculations, photometric reports, installation certificates, commissioning test results, and as-built drawings permanently (lifetime of the installation). Monthly test logs and annual discharge test results must be kept for at least 5 years, though permanent retention is recommended. These records may be required for insurance claims, fire investigations, property sales, or legal proceedings decades after installation. Digital backups are essential — provide copies to the building owner and retain copies yourself for professional indemnity purposes. Good record-keeping demonstrates professionalism and protects your liability."
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
