import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const BS7671Module7Section2FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I install a 7kW EV charger on a 6mm² cable circuit?",
      answer: "It depends on the installation method and ambient conditions. A 7kW single-phase charger draws approximately 30A continuously. 6mm² cable typically has a current-carrying capacity of 32A (Method C) to 46A (Method A), but derating factors for grouping, temperature, and thermal insulation must be considered. Always calculate the actual capacity based on installation conditions.",
      category: "cables"
    },
    {
      question: "Is a Type A RCD sufficient for domestic EV charging?",
      answer: "For Mode 1 and Mode 2 charging, Type A RCDs may be acceptable, but Type B RCDs are increasingly recommended. Mode 3 and Mode 4 charging typically requires Type B RCDs as they can detect DC residual currents that Type A devices cannot. Check the charger manufacturer's specifications for specific requirements.",
      category: "protection"
    },
    {
      question: "Do I need an additional earth electrode for every PME EV installation?",
      answer: "Yes, BS 7671 requires additional earthing provisions for EV charging on PME systems. This typically involves a local earth electrode connected to the main earthing terminal. The electrode provides an alternative earth path if the PEN conductor fails, reducing touch voltages on the vehicle chassis.",
      category: "earthing"
    },
    {
      question: "Can I connect multiple EV chargers to a single circuit?",
      answer: "Generally not recommended for domestic installations. Each EV charger should have its own dedicated circuit for safety, discrimination, and load management. In commercial installations, multiple chargers may share infrastructure but require sophisticated load management systems and careful circuit design.",
      category: "circuits"
    },
    {
      question: "What's the minimum supply capacity needed for home EV charging?",
      answer: "For a typical 7kW single-phase charger, consider approximately 32A additional load. Many domestic supplies can accommodate this, but load assessment including existing installation, diversity factors, and peak demand periods is essential. Upgrading the main supply may be necessary in some cases.",
      category: "capacity"
    },
    {
      question: "Are SPDs mandatory for EV charging installations?",
      answer: "SPDs are not specifically mandated by Section 722, but they are strongly recommended, especially for outdoor installations and where the charging point is fed by overhead lines. The investment in surge protection can prevent costly damage to both the charging equipment and the vehicle's electronics.",
      category: "protection"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleQuestion(index)}
              className="w-full p-3 sm:p-4 text-left hover:bg-[#323232] justify-between min-h-0"
            >
              <span className="text-foreground font-medium text-sm sm:text-base">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </Button>
            
            {openQuestion === index && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-600 bg-[#1a1a1a]">
                <p className="text-foreground text-sm leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};