import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2Summary = () => {
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
          This section explored the practical benefits and applications of smart home technology across four 
          key domains: lighting, HVAC, security, and accessibility. We examined how these systems create 
          measurable improvements in energy efficiency, convenience, safety, and quality of life while 
          supporting diverse user needs and capabilities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-gray p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Core Application Areas Covered
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Smart Lighting: Automated scheduling, energy efficiency, and ambience control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>HVAC Systems: Intelligent climate control, zoning, and energy optimisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Security Applications: Access control, monitoring, and integrated protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Accessibility Solutions: Assistive technology and independent living support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>System Integration: Cross-domain automation and coordinated responses</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-gray p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              Quantified Benefits Demonstrated
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Energy efficiency: 20-50% reductions in lighting and HVAC consumption</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Security enhancement: Real-time monitoring and automated threat response</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Accessibility improvements: Voice control and automated assistance features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Convenience gains: 90% reduction in manual system adjustments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Quality of life: Improved comfort, sleep quality, and peace of mind</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-blue-400 font-semibold mb-3">Implementation Insights for Practitioners</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Technical Integration:</p>
              <ul className="text-xs space-y-1">
                <li>• Start with single-domain implementations before cross-system integration</li>
                <li>• Prioritise user experience and reliability over feature complexity</li>
                <li>• Ensure scalability and future expansion capabilities</li>
                <li>• Implement robust security measures from initial deployment</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">User-Centered Design:</p>
              <ul className="text-xs space-y-1">
                <li>• Design for diverse user capabilities and accessibility needs</li>
                <li>• Provide multiple control methods for critical functions</li>
                <li>• Balance automation with user control and override capabilities</li>
                <li>• Consider long-term maintenance and user support requirements</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-green-400 font-semibold mb-2">Key Performance Indicators</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-green-400">30-50%</p>
              <p className="text-xs text-gray-300">Lighting energy reduction potential</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-400">20-30%</p>
              <p className="text-xs text-gray-300">HVAC efficiency improvement</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-400">24/7</p>
              <p className="text-xs text-gray-300">Security monitoring capability</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-400">95%+</p>
              <p className="text-xs text-gray-300">Task automation potential</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-purple-400 font-semibold mb-2">Preparing for Advanced Topics</h4>
          <p className="text-sm text-gray-300 mb-3">
            Having mastered the benefits and applications of smart home technology, you're prepared to explore 
            more advanced topics including system design principles, network architecture, and emerging 
            technologies that will shape the future of intelligent buildings.
          </p>
          <p className="text-sm text-gray-300">
            The next section will delve into communication protocols and network design, providing the 
            technical foundation necessary for designing robust, scalable smart home systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};