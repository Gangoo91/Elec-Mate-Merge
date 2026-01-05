import { Building2, TrendingUp, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NetworkSpeedScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Growing Creative Agency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-300">
        <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">The Challenge</h4>
              <p className="text-orange-100 text-sm leading-relaxed">
                DesignFlow Creative started with 10 employees working on basic graphics. Five years later, 
                they have 50 staff creating 4K videos, 3D animations, and VR content. Their original 
                100 Mbps network can barely handle current needs, and they&apos;re planning to double in size again.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">The Future-Proofed Solution</h4>
              <div className="space-y-3 text-blue-100 text-sm">
                <div>
                  <strong>Phase 1 - Immediate Relief (Cat 6A to 10 Gbps):</strong>
                  <p>Upgraded backbone to 10 Gbps with Cat 6A cabling supporting current 4K workflows 
                  and providing headroom for growth.</p>
                </div>
                <div>
                  <strong>Phase 2 - Capacity Planning (25 Gbps Backbone):</strong>
                  <p>Installed fibre backbone with 25 Gbps capacity and extra conduit space for future 
                  expansion to 100 Gbps when needed.</p>
                </div>
                <div>
                  <strong>Phase 3 - Application Evolution:</strong>
                  <p>Infrastructure ready for 8K video, real-time collaboration, and whatever new 
                  creative technologies emerge in the next decade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Results Achieved</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• File transfer times reduced from hours to minutes</li>
                <li>• Seamless 4K video editing collaboration</li>
                <li>• Network ready for 8K and VR content creation</li>
                <li>• Avoided three separate network upgrades</li>
                <li>• 300% staff growth supported without infrastructure changes</li>
                <li>• Competitive advantage in handling large, complex projects</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};