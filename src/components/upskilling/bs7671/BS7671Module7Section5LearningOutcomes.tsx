import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BS7671Module7Section5LearningOutcomes = () => {
  const outcomes = [
    {
      category: "Prosumer Installation Fundamentals",
      items: [
        "Define prosumer electrical installations and their scope under Part 8",
        "Identify key components including generation, storage, and load management",
        "Understand the regulatory framework and compliance requirements"
      ]
    },
    {
      category: "Energy Management & Control",
      items: [
        "Explain energy flow management in bi-directional systems",
        "Design energy management systems for optimal performance",
        "Implement demand response and grid services functionality"
      ]
    },
    {
      category: "Protection & Safety Systems",
      items: [
        "Apply protection requirements for prosumer installations",
        "Implement anti-islanding and grid protection measures",
        "Design battery energy storage system safety protocols"
      ]
    },
    {
      category: "Grid Integration & Services",
      items: [
        "Navigate G98/G99 connection requirements and DNO procedures",
        "Implement export limitation and grid service capabilities",
        "Understand virtual power plant and aggregation concepts"
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-6">By the end of this section, you should be able to:</p>
        
        <div className="space-y-6">
          {outcomes.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="text-elec-yellow font-semibold mb-3">{category.category}</h4>
              <ul className="space-y-3 ml-4">
                {category.items.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-elec-dark rounded-md border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-2">Professional Development:</h4>
          <p className="text-sm">
            This comprehensive understanding of prosumer installations positions you at the forefront of 
            the energy transition, enabling you to design, install, and maintain the next generation 
            of electrical infrastructure supporting the UK's net-zero ambitions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};