import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-base leading-relaxed">
          This section provided a comprehensive introduction to smart homes as integrated systems that use 
          interconnected devices, communication protocols, and control interfaces to automate, monitor, 
          and control home functions for improved convenience, security, and energy efficiency.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Key Concepts Covered
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Smart home definition: interconnected devices providing automation, monitoring, and control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Communication protocols: Zigbee, Z-Wave, Wi-Fi, Bluetooth for device connectivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Core components: smart devices, communication networks, control interfaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Benefits: energy efficiency, enhanced security, convenience, accessibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Implementation challenges: interoperability, security, costs, complexity</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              Real-World Applications
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Energy management through intelligent automation and scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Enhanced security with integrated monitoring and access control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Accessibility improvements for elderly and disabled users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Retrofit strategies for existing homes vs new build considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Phased implementation approaches for cost management</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-blue-400 font-semibold mb-3">Key Takeaways for Practitioners</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Technical Considerations:</p>
              <ul className="text-xs space-y-1">
                <li>• Protocol selection impacts reliability and expandability</li>
                <li>• Network design crucial for system performance</li>
                <li>• Security measures must be implemented from the start</li>
                <li>• Integration planning prevents compatibility issues</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">User-Focused Approach:</p>
              <ul className="text-xs space-y-1">
                <li>• Simplified interfaces improve user adoption</li>
                <li>• Training and support essential for success</li>
                <li>• Phased implementation reduces complexity</li>
                <li>• Accessibility needs should guide system design</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-green-400 font-semibold mb-2">Next Steps in Your Learning Journey</h4>
          <p className="text-sm text-gray-300 mb-3">
            Having completed this introduction to smart homes, you're ready to explore specific 
            implementation aspects, including device selection, system design, and integration strategies.
          </p>
          <p className="text-sm text-gray-300">
            Continue to the next section to dive deeper into smart home communication protocols 
            and learn how to design robust, scalable smart home networks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};