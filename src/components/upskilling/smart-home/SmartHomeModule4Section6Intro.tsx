import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Network, Zap } from 'lucide-react';

export const SmartHomeModule4Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Introduction to BMS Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          In larger buildings such as offices, schools, and commercial sites, smart devices alone are not enough. 
          These sites use Building Management Systems (BMS) to integrate HVAC, lighting, security, and energy 
          monitoring into one platform. Understanding how HVAC integrates with BMS gives learners insight into 
          professional-level systems beyond domestic installs.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Centralised Control</h4>
            </div>
            <p className="text-sm">Single platform managing HVAC, lighting, security, and energy across large buildings</p>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Network className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Integration</h4>
            </div>
            <p className="text-sm">Seamless communication between different building systems using standard protocols</p>
          </div>
          
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Efficiency</h4>
            </div>
            <p className="text-sm">Optimised energy use through coordinated system operation and advanced monitoring</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};