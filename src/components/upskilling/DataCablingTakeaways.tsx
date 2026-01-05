import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DataCablingTakeaways = () => {
  const takeaways = [
    {
      title: "Standardised Approach",
      description: "Structured cabling follows industry standards (TIA/EIA, ISO/IEC) for consistent, reliable performance"
    },
    {
      title: "Six Key Subsystems", 
      description: "Understanding horizontal cabling, backbone cabling, work areas, and supporting infrastructure is essential"
    },
    {
      title: "Cable Performance Matters",
      description: "Choose appropriate cable categories (Cat5e, Cat6, Cat6A, fiber) based on bandwidth and distance requirements"
    },
    {
      title: "Future-Proof Investment",
      description: "Well-designed structured cabling supports multiple applications and emerging technologies"
    },
    {
      title: "Total Cost Benefits",
      description: "Higher upfront costs are offset by reduced operational expenses and simplified management"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="border-l-4 border-elec-yellow pl-4">
              <h4 className="font-semibold text-foreground mb-1">{takeaway.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-[#323232] rounded-lg border border-gray-700">
          <p className="text-center text-gray-300 text-sm leading-relaxed">
            <strong className="text-elec-yellow">Remember:</strong> Structured cabling is not just about cables – 
            it's about creating a comprehensive telecommunications infrastructure that serves as the foundation 
            for all modern business communications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};