import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Cog, Monitor, AlertTriangle } from 'lucide-react';

export const BMSImplementationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          BMS Implementation Process
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Implementing a BMS requires careful planning, phased installation, and thorough commissioning. 
          Understanding the process helps installers and clients set realistic expectations and timelines.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Cog className="h-4 w-4 text-blue-400" />
              Pre-Installation Phase
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Site Survey & Assessment</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Existing system evaluation</li>
                  <li>• Infrastructure requirements</li>
                  <li>• Network topology planning</li>
                  <li>• Integration point identification</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">System Design</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Control strategy development</li>
                  <li>• Protocol selection and gateways</li>
                  <li>• User interface design</li>
                  <li>• Sequence of operations</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Monitor className="h-4 w-4 text-green-400" />
              Installation & Commissioning
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Physical Installation</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Controller and sensor mounting</li>
                  <li>• Network cabling and wireless setup</li>
                  <li>• Integration with existing systems</li>
                  <li>• Safety interlocks implementation</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">System Commissioning</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Control logic testing</li>
                  <li>• Interlock verification</li>
                  <li>• User training and handover</li>
                  <li>• Performance optimisation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">Typical Timeline</h5>
            <ul className="text-sm space-y-1">
              <li>• Design: 4-8 weeks</li>
              <li>• Installation: 8-16 weeks</li>
              <li>• Commissioning: 2-6 weeks</li>
              <li>• Optimisation: 3-6 months</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">Key Success Factors</h5>
            <ul className="text-sm space-y-1">
              <li>• Clear project scope</li>
              <li>• Stakeholder engagement</li>
              <li>• Phased implementation</li>
              <li>• Thorough testing</li>
            </ul>
          </div>
          
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Common Challenges
            </h5>
            <ul className="text-sm space-y-1">
              <li>• Legacy system integration</li>
              <li>• Network infrastructure</li>
              <li>• User adoption</li>
              <li>• Budget overruns</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};