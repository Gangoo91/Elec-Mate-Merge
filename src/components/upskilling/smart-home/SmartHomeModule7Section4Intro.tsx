import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Shield, AlertTriangle } from 'lucide-react';

const SmartHomeModule7Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-base leading-relaxed">
          No smart home installation is safe unless it follows proper electrical safety and isolation procedures. Smart devices may seem low-risk, but many connect directly to mains circuits. Incorrect installation can result in electric shock, fire hazards, or system failure.
        </p>
        
        <p className="text-foreground text-base leading-relaxed">
          This section aligns smart home practices with the UK Wiring Regulations (BS 7671) to ensure compliance, safety, and professional standards. Every electrician must prioritise safety over convenience.
        </p>
        
        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-200 mb-2">Critical Safety Reminder</h4>
              <p className="text-red-100 text-sm">
                Smart devices connected to mains electricity pose the same risks as traditional electrical equipment. 
                Never compromise on isolation procedures, even for "simple" installations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-foreground">BS 7671 Compliance</span>
            </div>
            <p className="text-gray-300 text-sm">All installations must meet UK Wiring Regulations for safety and legal compliance</p>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="font-medium text-foreground">Professional Standards</span>
            </div>
            <p className="text-gray-300 text-sm">Proper procedures protect installers, clients, and maintain industry reputation</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4Intro;