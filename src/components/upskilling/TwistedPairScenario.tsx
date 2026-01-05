import { Building2, Users, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TwistedPairScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Office Network Upgrade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">The Challenge</h3>
          <div className="text-gray-300 space-y-3">
            <p>
              <strong>Client:</strong> Manufacturing company with 200 employees across three floors
            </p>
            <p>
              <strong>Current System:</strong> 15-year-old Cat5e installation supporting 100Mbps network
            </p>
            <p>
              <strong>Requirements:</strong> Upgrade to support 10Gbps backbone, future-proof for 20 years, 
              maintain operations during installation
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Design Decisions</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                Workstation Areas
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li><strong>Solution:</strong> Cat6A to all desk outlets</li>
                <li><strong>Reasoning:</strong> Future-proof for 10Gbps</li>
                <li><strong>Quantity:</strong> 250 outlets across three floors</li>
                <li><strong>Installation:</strong> Phased approach by floor</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Server Room Connections
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li><strong>Solution:</strong> Cat6A with enhanced shielding</li>
                <li><strong>Reasoning:</strong> High-density environment</li>
                <li><strong>Special Requirements:</strong> Plenum-rated cables</li>
                <li><strong>Testing:</strong> Full Level IV certification</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Implementation Results</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground">Performance</h4>
              <p className="text-gray-300 text-sm">All links certified to Cat6A standards with 15% margin</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground">Timeline</h4>
              <p className="text-gray-300 text-sm">Completed in 3 weeks with minimal disruption</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground">Future-Ready</h4>
              <p className="text-gray-300 text-sm">Infrastructure supports next 20 years of growth</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-300 mb-2">Key Learning Points</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Cat6A provided the best balance of performance and future-proofing</li>
            <li>• Proper planning allowed for phased installation without network downtime</li>
            <li>• Enhanced shielding was essential in the high-density server environment</li>
            <li>• Investment in higher category cables paid off within 3 years</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};