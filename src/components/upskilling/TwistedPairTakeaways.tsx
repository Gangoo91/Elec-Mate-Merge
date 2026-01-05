import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TwistedPairTakeaways = () => {
  const takeaways = [
    {
      title: "Wire Twisting is Critical",
      description: "The twist rate in each pair is precisely engineered to cancel electromagnetic interference and crosstalk."
    },
    {
      title: "Category Selection Impacts Future",
      description: "Choose cable categories based on both current needs and future growth—Cat6A offers the best long-term value."
    },
    {
      title: "Installation Quality Matters",
      description: "Poor installation practices can degrade even the highest category cables below their rated performance."
    },
    {
      title: "Testing Validates Performance", 
      description: "Proper certification testing ensures your installation will support intended applications reliably."
    },
    {
      title: "Standards Ensure Compatibility",
      description: "Following TIA/EIA and ISO standards guarantees interoperability between different manufacturers."
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
            <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">{takeaway.title}</h3>
              <p className="text-gray-300">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
          <h3 className="font-semibold text-yellow-300 mb-2">Remember</h3>
          <p className="text-gray-300 text-sm">
            Twisted pair cables are the foundation of most data networks. Understanding their construction, 
            categories, and proper installation practices is essential for designing reliable, future-proof 
            structured cabling systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};