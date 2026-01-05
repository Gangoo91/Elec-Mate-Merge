import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const BS7671Module7Section5FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "System Design & Configuration",
      questions: [
        {
          question: "What is the maximum generation capacity I can install under G98?",
          answer: "Under G98, you can install up to 16A per phase without formal application. This equates to 3.68kW on single-phase and 11.04kW on three-phase supplies. For larger systems, you'll need to follow the G99 application process."
        },
        {
          question: "Can I combine different generation technologies in one PEI system?",
          answer: "Yes, Part 8 allows multiple generation sources including solar PV, wind, and micro-CHP. Each must comply with relevant standards, and the energy management system must coordinate all sources effectively whilst maintaining protection requirements."
        },
        {
          question: "What are the minimum battery storage requirements for a PEI system?",
          answer: "There's no minimum requirement, but systems typically include 4-6 hours of storage relative to generation capacity for optimal performance. The BMS must comply with safety standards, and the installation must meet fire safety requirements."
        }
      ]
    },
    {
      category: "Grid Connection & Compliance",
      questions: [
        {
          question: "How long does it take to get grid connection approval?",
          answer: "G98 notifications typically take up to 45 working days. G99 applications can take 65 working days for standard connections. Complex applications requiring detailed studies may take longer, so early engagement with your DNO is recommended."
        },
        {
          question: "What is export limitation and when is it required?",
          answer: "Export limitation restricts the maximum power you can export to the grid. It's required when local network capacity is constrained. Dynamic limitation allows flexible export based on network conditions, whilst static limitation sets a fixed maximum."
        },
        {
          question: "Do I need planning permission for a PEI installation?",
          answer: "Domestic systems under permitted development rights typically don't need planning permission. Commercial and larger installations usually require planning consent. Battery storage may have specific requirements depending on size and location."
        }
      ]
    },
    {
      category: "Protection & Safety",
      questions: [
        {
          question: "What additional protection is required for bi-directional energy flow?",
          answer: "Bi-directional systems require enhanced protection including anti-islanding (G98/G99 compliant), directional overcurrent protection, and earth fault protection on both generation and load sides. The protection must coordinate properly in both directions."
        },
        {
          question: "How do I ensure battery storage safety compliance?",
          answer: "Battery systems require comprehensive BMS monitoring, thermal management, fire detection/suppression systems, and emergency isolation. Installation must comply with manufacturer requirements and relevant fire safety standards."
        },
        {
          question: "What are the cybersecurity requirements for PEI systems?",
          answer: "Systems must implement end-to-end encryption, secure authentication protocols, regular security updates, and network segmentation. GDPR compliance is required for personal energy data, and intrusion detection systems are recommended."
        }
      ]
    },
    {
      category: "Performance & Economics",
      questions: [
        {
          question: "What self-consumption ratio should I expect from a well-designed system?",
          answer: "Well-designed domestic systems typically achieve 70-80% self-consumption. Commercial systems can achieve 60-90% depending on load profiles. Energy management systems and battery storage significantly improve these ratios."
        },
        {
          question: "What grid services revenue can I expect from my PEI system?",
          answer: "Revenue varies by system size and services provided. Frequency response can generate £8-20/MW/h, DSR services £100-500/MWh during events, and Capacity Market payments £15-75/kW/year. Total additional revenue typically adds 10-30% to system economics."
        },
        {
          question: "How do I optimise the economic performance of my PEI system?",
          answer: "Optimisation involves maximising self-consumption, participating in appropriate grid services, time-shifting energy based on tariffs, and implementing demand response. Advanced energy management systems can automatically optimise based on weather, pricing, and demand forecasts."
        }
      ]
    },
    {
      category: "Installation & Commissioning",
      questions: [
        {
          question: "What testing is required during PEI commissioning?",
          answer: "Comprehensive testing includes electrical safety verification, insulation resistance, earth fault loop impedance, protection coordination, anti-islanding functionality, battery performance, and energy management system verification. All tests must be documented."
        },
        {
          question: "How often should PEI systems be maintained and tested?",
          answer: "Annual electrical testing is recommended, with monthly performance monitoring and quarterly battery health checks. Protection systems should be tested annually, and software updates applied as available. Predictive maintenance can extend equipment life."
        },
        {
          question: "What documentation is required for handover to the customer?",
          answer: "Essential documents include as-built drawings, test certificates, equipment warranties, operating manuals, performance guarantees, grid connection approvals, insurance certificates, and training records. Digital copies should be maintained for future reference."
        }
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="text-gray-300 mb-6">
          Common questions and expert answers about prosumer electrical installations implementation.
        </p>
        
        <div className="space-y-4">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <h4 className="text-elec-yellow font-semibold text-lg">{category.category}</h4>
              
              {category.questions.map((faq, faqIndex) => {
                const itemIndex = categoryIndex * 100 + faqIndex;
                const isOpen = openItems.includes(itemIndex);
                
                return (
                  <div key={faqIndex} className="border border-gray-600 rounded-lg">
                    <button
                      onClick={() => toggleItem(itemIndex)}
                      className="w-full p-4 text-left hover:bg-elec-dark transition-colors duration-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-foreground pr-4">{faq.question}</h5>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <div className="pt-2 border-t border-gray-600">
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-elec-dark rounded-lg border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-2">Need More Information?</h4>
          <p className="text-gray-300 text-sm">
            For specific technical questions or complex installation scenarios, consult with:
          </p>
          <ul className="text-gray-300 text-sm mt-2 space-y-1 ml-4">
            <li>• Your local Distribution Network Operator (DNO)</li>
            <li>• Accredited electrical installation companies</li>
            <li>• Professional engineering consultants</li>
            <li>• Equipment manufacturers' technical support</li>
            <li>• Industry bodies such as the Renewable Energy Association</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};