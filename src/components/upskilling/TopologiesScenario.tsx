import { Building2, Users, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TopologiesScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Multi-Building Campus Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-300">
        <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">The Challenge</h4>
              <p className="text-orange-100 text-sm leading-relaxed">
                TechCorp University needs to design a network for their new campus with 5 buildings: 
                Administration, Engineering, Library, Student Centre, and Data Centre. Each building 
                has different requirements for reliability, performance, and cost considerations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">The Hybrid Topology Solution</h4>
              <div className="space-y-3 text-blue-100 text-sm">
                <div>
                  <strong>Building Level (Star Topology):</strong>
                  <p>Each building uses star topology with central switches for easy management and fault isolation.</p>
                </div>
                <div>
                  <strong>Campus Backbone (Partial Mesh):</strong>
                  <p>Critical buildings (Data Centre, Administration) have redundant connections, whilst others connect via single links to reduce costs.</p>
                </div>
                <div>
                  <strong>Departmental Networks (Tree Structure):</strong>
                  <p>Large departments like Engineering use hierarchical star arrangements with departmental switches feeding into building switches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Results Achieved</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• 99.9% uptime achieved through strategic redundancy</li>
                <li>• 40% cost savings compared to full mesh design</li>
                <li>• Scalable design accommodating future building additions</li>
                <li>• Simplified troubleshooting with clear network hierarchy</li>
                <li>• Optimal performance for each building's specific needs</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};