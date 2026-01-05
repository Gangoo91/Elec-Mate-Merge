import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Tag, FileCheck, Wrench } from 'lucide-react';

const BMSModule7Section6ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Electrician's Role in Handover
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Electricians play a crucial supporting role in ensuring successful handover by providing 
          accurate documentation and technical assistance during client training.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <Tag className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Field Device Labelling</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li>• Ensure all devices have clear, durable labels</li>
                <li>• Match label references to IO lists exactly</li>
                <li>• Include device addresses where applicable</li>
                <li>• Use consistent labelling conventions</li>
                <li>• Label all junction boxes and cable routes</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <FileCheck className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Accurate Redline Drawings</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Mark all changes from original design</li>
                <li>• Include cable route modifications</li>
                <li>• Note any additional junction boxes</li>
                <li>• Document emergency circuit additions</li>
                <li>• Provide clear, legible annotations</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <FileCheck className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Test Records</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Insulation resistance test results</li>
                <li>• Continuity verification reports</li>
                <li>• I/O verification test sheets</li>
                <li>• Earth fault loop impedance readings</li>
                <li>• RCD test results where applicable</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <Wrench className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Demonstration Support</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Assist during operator demonstrations</li>
                <li>• Explain physical override functions</li>
                <li>• Show local control access points</li>
                <li>• Demonstrate emergency procedures</li>
                <li>• Answer technical wiring questions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">⚠️ Critical Consequences</h4>
          <p className="text-gray-300 mb-2">
            <strong>What happens if as-built drawings are not updated before handover?</strong>
          </p>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• Future modifications become dangerous and time-consuming</li>
            <li>• Troubleshooting becomes nearly impossible</li>
            <li>• Warranty claims may be rejected</li>
            <li>• Client loses confidence in the installation</li>
            <li>• Legal liability increases significantly</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
          <p className="text-foreground">
            👉 <strong>What happens if as-built drawings are not updated before handover?</strong>
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-elec-yellow">Click for answer</summary>
            <p className="mt-2 text-sm text-foreground">
              Without accurate as-built drawings, future maintenance becomes dangerous and expensive. 
              Technicians cannot safely modify the system, troubleshooting takes much longer, 
              and there's increased risk of electrical accidents.
            </p>
          </details>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6ContentPart3 };