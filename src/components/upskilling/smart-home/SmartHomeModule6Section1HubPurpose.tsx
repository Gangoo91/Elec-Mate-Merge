import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Smartphone, Globe } from 'lucide-react';
import { HubPurposeQuickCheck } from './HubPurposeQuickCheck';

export const SmartHomeModule6Section1HubPurpose = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">1</span>
            What is a Smart Home Hub?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <Network className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Central Controller</h4>
                <p className="text-foreground text-sm">
                  A hub is a central controller that connects smart devices and allows them to work together.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Smartphone className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Protocol Translation</h4>
                <p className="text-foreground text-sm">
                  It communicates with sensors, switches, locks, cameras, and more, translating protocols into one ecosystem.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <Globe className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Remote Access</h4>
                <p className="text-foreground text-sm">
                  Many hubs also provide remote access via cloud services.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Key Benefits:</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• Unified device management and control</li>
              <li>• Cross-protocol communication</li>
              <li>• Automation and scene creation</li>
              <li>• Remote monitoring and control</li>
              <li>• Future device compatibility</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <HubPurposeQuickCheck />
    </div>
  );
};