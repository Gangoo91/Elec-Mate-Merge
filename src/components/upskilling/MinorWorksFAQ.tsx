import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const MinorWorksFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData = [
    {
      id: "meiwc-scope",
      question: "What exactly qualifies as 'minor works' for MEIWC purposes?",
      answer: "Minor works are small additions or modifications to existing electrical installations that don't significantly alter the installation characteristics. This includes adding socket outlets to existing circuits, replacing accessories like-for-like, adding single circuits from existing distribution boards with spare capacity, and replacing single protective devices. The work must not require design calculations, load assessments, or major modifications to earthing or bonding arrangements."
    },
    {
      id: "competency-requirements",
      question: "What competency requirements must be met to complete a Minor Works Certificate?",
      answer: "The person completing the MEIWC must be competent in both installation and testing work, as they take responsibility for all aspects. This includes competency in relevant installation techniques, testing and inspection procedures, knowledge of BS 7671 requirements, understanding of Building Regulations Part P, and awareness of health and safety obligations. Professional indemnity insurance coverage is also essential."
    },
    {
      id: "testing-requirements",
      question: "What testing is required for minor works compared to a full EIC?",
      answer: "Minor works require proportionate testing including continuity of protective conductors, insulation resistance testing, polarity verification, and RCD operation where applicable. While not requiring the full testing regime of an EIC, all tests relevant to the work performed must be completed. Earth fault loop impedance testing is required where new circuits are added, and functional testing must verify proper operation of all new installations."
    },
    {
      id: "building-regulations",
      question: "When does minor electrical work require Building Regulations notification?",
      answer: "Most minor works don't require Building Regulations notification if performed by a registered competent person. However, work in special locations (bathrooms, swimming pools), new circuits in kitchens, or work involving consumer unit changes typically requires notification. Always check current Part P requirements and consider whether the installer is registered with an appropriate competent person scheme."
    },
    {
      id: "circuit-capacity",
      question: "How do I determine if an existing circuit can handle additional load?",
      answer: "Check the existing cable rating against new load requirements, verify protective device coordination, consider voltage drop impact of extensions, and assess the total connected load. The original circuit design should accommodate the additional load without exceeding cable current-carrying capacity or causing voltage drop issues. If in doubt, perform load calculations or upgrade to appropriate circuit capacity."
    },
    {
      id: "rcd-protection",
      question: "When is RCD protection required for minor works additions?",
      answer: "RCD protection requirements depend on the type of work and location. New socket outlets generally require 30mA RCD protection, especially in domestic installations. Work in special locations always requires appropriate RCD protection. Existing circuits may need RCD protection added when modified. Always test existing RCD operation before connecting new work and verify discrimination in installations with multiple RCDs."
    },
    {
      id: "certificate-validity",
      question: "How long is a Minor Works Certificate valid and who keeps copies?",
      answer: "Minor Works Certificates remain valid for the life of the work completed, not a fixed time period. The original must be provided to the installation owner/occupier, and the certifying person must retain a copy. These certificates should be available to subsequent electricians, building control authorities, insurance companies, and for legal purposes. They form part of the installation's permanent record."
    },
    {
      id: "scope-exceeded",
      question: "What should I do if the work scope exceeds minor works during installation?",
      answer: "Stop the minor works process immediately and assess whether a full EIC is required. Work requiring design calculations, load assessments, major circuit modifications, or affecting main earthing/bonding exceeds minor works scope. Complete the additional work under appropriate certification (usually EIC) and document all work properly. Don't attempt to force complex work into minor works certification."
    },
    {
      id: "liability-insurance",
      question: "What are the liability implications of completing a Minor Works Certificate?",
      answer: "By signing a MEIWC, you accept full professional responsibility for the work documented. This includes design adequacy (within minor works scope), installation quality, testing accuracy, and compliance with all relevant standards. Professional indemnity insurance is essential to cover potential claims. The certificate serves as evidence of your professional assessment and workmanship."
    },
    {
      id: "existing-installation",
      question: "How much of the existing installation do I need to inspect for minor works?",
      answer: "Inspect and test the circuits being modified and assess the general condition of related installation parts. While you don't need to inspect the entire installation (as with EICR), you must verify that the existing installation is suitable for the proposed modifications. Check protective device ratings, RCD operation if applicable, earthing arrangements, and general installation condition affecting your work."
    },
    {
      id: "multi-circuit-work",
      question: "Can I use one MEIWC for work involving multiple circuits or areas?",
      answer: "Yes, a single MEIWC can cover multiple minor works completed at the same time, provided each individual item falls within minor works scope. However, be careful not to exceed the overall scope limitation. If the combined work significantly alters the installation or requires complex assessment, consider whether multiple MEIWCs or an EIC would be more appropriate."
    },
    {
      id: "customer-education",
      question: "What information should I provide to customers with the Minor Works Certificate?",
      answer: "Provide the completed MEIWC, explain the work completed and any limitations, demonstrate operation of new installations, provide relevant user instructions or manufacturer information, explain any ongoing maintenance requirements, and advise on when future inspection might be needed. Ensure customers understand what work was covered and any restrictions or recommendations."
    }
  ];

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <Collapsible
              key={faq.id}
              open={openItems.includes(faq.id)}
              onOpenChange={() => toggleItem(faq.id)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-[#323232] border border-gray-600 p-4 text-left hover:bg-[#2a2a2a] transition-colors">
                <span className="text-foreground font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`h-4 w-4 text-elec-yellow transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="rounded-lg bg-[#2a2a2a] border border-gray-600 p-4">
                  <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MinorWorksFAQ;