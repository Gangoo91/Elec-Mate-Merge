import { Wifi, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TopologiesIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Introduction to Network Topologies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p className="leading-relaxed">
          Network topology refers to the arrangement of different elements (links, nodes, etc.) 
          in a computer network. It's the physical and logical layout of how devices are connected 
          and how data flows through the network infrastructure.
        </p>
        
        <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Why Topology Matters</h4>
              <p className="text-purple-100 text-sm leading-relaxed">
                The choice of network topology directly impacts performance, cost, fault tolerance, 
                and scalability. Understanding different topologies helps in designing networks that 
                meet specific requirements whilst maintaining efficiency and reliability.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};