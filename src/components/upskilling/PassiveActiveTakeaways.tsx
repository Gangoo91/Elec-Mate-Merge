import { Key, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PassiveActiveTakeaways = () => {
  const takeaways = [
    {
      title: "Passive Components Form the Foundation",
      description: "High-quality passive infrastructure provides the reliable, long-lasting foundation that active components depend on for optimal performance."
    },
    {
      title: "Active Components Provide Intelligence",
      description: "While more complex and costly, active components enable network management, security, and advanced features that modern networks require."
    },
    {
      title: "Hybrid Approaches Optimise Benefits",
      description: "The best networks combine passive reliability for infrastructure with active intelligence where it adds the most value."
    },
    {
      title: "Environmental Factors Drive Decisions",
      description: "Harsh environments favour passive components, whilst controlled environments can fully leverage active equipment capabilities."
    },
    {
      title: "Lifecycle Costs Vary Significantly",
      description: "Passive components have higher initial costs but lower ongoing expenses, whilst active components require regular updates and maintenance."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Key className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {takeaways.map((takeaway, index) => (
          <div key={index} className="bg-slate-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">{takeaway.title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{takeaway.description}</p>
          </div>
        ))}
        
        <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Remember</h4>
              <p className="text-yellow-100 text-sm leading-relaxed">
                The passive vs active decision isn&apos;t about choosing one or the other - it&apos;s about 
                understanding where each approach provides the greatest benefit. Modern networks typically 
                use passive infrastructure as the foundation with strategically placed active components 
                to provide necessary intelligence and functionality.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};