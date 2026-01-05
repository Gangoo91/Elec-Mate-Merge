import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Users, FileCheck, DollarSign, AlertTriangle, Shield } from 'lucide-react';

export const BMSBenefitsChallengesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          Benefits and Challenges of BMS Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-400" />
              Benefits
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <h4 className="font-semibold text-foreground text-sm">Reduced Energy Bills</h4>
                </div>
                <p className="text-xs">Optimised system coordination can reduce energy consumption by 20-40%</p>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <h4 className="font-semibold text-foreground text-sm">Enhanced Comfort</h4>
                </div>
                <p className="text-xs">Consistent temperature, lighting, and air quality improve occupant productivity</p>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-4 w-4 text-purple-400" />
                  <h4 className="font-semibold text-foreground text-sm">Compliance Reporting</h4>
                </div>
                <p className="text-xs">Automated data collection for environmental regulations and energy audits</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Challenges
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-orange-400" />
                  <h4 className="font-semibold text-foreground text-sm">High Upfront Costs</h4>
                </div>
                <p className="text-xs">Initial investment can be £50,000-£500,000+ depending on building size</p>
              </div>
              
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-red-400" />
                  <h4 className="font-semibold text-foreground text-sm">Specialist Knowledge</h4>
                </div>
                <p className="text-xs">Requires trained engineers for installation, commissioning, and maintenance</p>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-yellow-400" />
                  <h4 className="font-semibold text-foreground text-sm">Cybersecurity Risks</h4>
                </div>
                <p className="text-xs">Connected systems require ongoing security updates and monitoring</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">For Installers and Clients:</h4>
          <p className="text-sm">
            While BMS integration requires significant investment and expertise, the long-term benefits 
            typically justify costs in buildings over 5,000m². Smaller sites may benefit from hybrid 
            approaches using smart hubs with BMS-like capabilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};