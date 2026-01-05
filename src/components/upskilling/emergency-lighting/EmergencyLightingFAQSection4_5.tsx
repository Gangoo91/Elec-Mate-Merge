import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection4_5 = () => {
  const faqs = [
    {
      question: "Do remote systems fully replace manual inspections?",
      answer: "No — visual checks are still required under BS 5266-1. Remote systems automate functional and duration tests, but electricians or building managers must still conduct regular visual inspections for physical damage, obstructions, dirt accumulation, mounting security, and changes to building layout. A luminaire might pass electronic testing but be blocked by furniture or signage, making it ineffective during an emergency."
    },
    {
      question: "Are remote systems expensive?",
      answer: "Initial costs are higher than traditional emergency lighting — typically £50-£150 per luminaire for self-test units, or £30,000-£100,000+ for networked systems on large sites (including installation and commissioning). However, labour savings often offset this over 5-10 years. For sites with 100+ luminaires and limited maintenance staff, the investment typically pays for itself through reduced testing time (60-80% reduction), improved compliance, instant fault detection, and better maintenance planning. The Manchester University case study showed a 7.6-year payback period with £9,000 annual savings."
    },
    {
      question: "Is remote testing required by law?",
      answer: "No, remote testing is not legally mandated. BS 5266-1 requires regular functional and duration testing, but does not specify the testing method. However, BS 5266-8 (EN 50172) provides standards for automated testing systems, recognising them as best practice. Remote testing is considered the modern standard for medium to large installations, and is increasingly expected by insurers and regulators in high-risk sectors such as healthcare, transport hubs, and public venues. Manual testing remains acceptable for smaller sites (under 100 luminaires) where it can be carried out efficiently."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
            <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
