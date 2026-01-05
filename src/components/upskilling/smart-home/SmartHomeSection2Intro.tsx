import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-base leading-relaxed">
          Smart home technology transcends mere gadgetry — it represents a fundamental shift towards creating 
          safer, more efficient, and comfortable living environments through intelligent automation and control. 
          This section examines the practical benefits and real-world applications across four critical domains 
          that define modern smart home implementation.
        </p>
        <p className="text-base leading-relaxed">
          We explore how smart lighting transforms ambience and energy consumption, how intelligent HVAC systems 
          optimise comfort while reducing environmental impact, how security technologies provide comprehensive 
          protection, and how accessibility features enable independent living for all users.
        </p>
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <p className="text-blue-400 font-semibold text-sm mb-2">Core Application Areas:</p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Smart Lighting: Automated control, energy efficiency, and ambience management</li>
            <li>• HVAC Systems: Climate optimisation, zoning, and energy conservation</li>
            <li>• Security Applications: Access control, monitoring, and threat detection</li>
            <li>• Accessibility Solutions: Assistive technology and independent living support</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};