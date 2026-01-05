import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Wifi, Lock } from 'lucide-react';

export const SmartHomeModule5Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          Smart home systems rely on internet connectivity. While this makes them powerful and convenient, 
          it also introduces risks. Weak security can expose homeowners to hacking, data theft, and privacy breaches. 
          As an electrician working with smart home installations, you must understand the importance of securing 
          networks and advising clients on best practices.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Network Risks</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Unsecured networks can be exploited by attackers to gain access to smart devices
            </p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Data Protection</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Personal data, video feeds, and usage patterns need proper protection
            </p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Professional Role</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Electricians must ensure secure installation and educate clients
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};