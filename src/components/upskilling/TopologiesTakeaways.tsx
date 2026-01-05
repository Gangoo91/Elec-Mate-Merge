import { Key, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TopologiesTakeaways = () => {
  const takeaways = [
    {
      title: "Star Topology Dominates Modern Networks",
      description: "Star topology is the foundation of structured cabling systems due to its reliability, scalability, and ease of management."
    },
    {
      title: "Topology Choice Affects Everything",
      description: "The topology decision impacts cost, performance, fault tolerance, scalability, and maintenance requirements."
    },
    {
      title: "Hybrid Approaches Optimise Trade-offs",
      description: "Combining different topologies allows networks to balance cost, performance, and reliability requirements effectively."
    },
    {
      title: "Consider Future Requirements",
      description: "Network topology should accommodate growth, technology changes, and evolving performance demands."
    },
    {
      title: "Fault Tolerance vs. Cost Balance",
      description: "Mesh topologies provide maximum redundancy but at significantly higher cost - use strategically for critical connections."
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
                Network topology is not just about how cables are physically connected, but also about 
                how data flows through the network. The logical topology (how data moves) can differ 
                from the physical topology (how cables are arranged). Understanding both aspects is 
                crucial for effective network design and troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};