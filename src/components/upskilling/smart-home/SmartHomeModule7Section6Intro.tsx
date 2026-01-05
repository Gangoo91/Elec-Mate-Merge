import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, FileText, Shield } from 'lucide-react';

const SmartHomeModule7Section6Intro = () => {
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
          The final stage of any smart home installation is providing clear documentation, warranty details, and aftercare guidance. Without this, clients may forget how the system was set up, lose confidence in the technology, or struggle to make warranty claims.
        </p>
        
        <p className="text-foreground text-base leading-relaxed">
          Professional documentation and structured aftercare not only protect the client — they protect you as the installer. Proper records demonstrate competence, reduce liability, and provide a foundation for ongoing client relationships.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Legal and Professional Protection</h4>
          <p className="text-blue-100 text-sm">
            Comprehensive documentation protects against liability claims, provides evidence of compliance, 
            and demonstrates professional competence if disputes arise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-foreground">Documentation</span>
            </div>
            <p className="text-gray-300 text-sm">Complete records of installation, configuration, and testing</p>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="font-medium text-foreground">Warranty Coverage</span>
            </div>
            <p className="text-gray-300 text-sm">Clear explanation of manufacturer and installer warranties</p>
          </div>

          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-foreground">Aftercare Support</span>
            </div>
            <p className="text-gray-300 text-sm">Ongoing maintenance and support arrangements</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section6Intro;