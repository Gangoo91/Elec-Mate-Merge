import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FutureImprovementsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Future Improvements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          The smart home industry continues to evolve with new technologies designed to address current interference and bandwidth limitations. These emerging standards promise more reliable and scalable networks.
        </p>

        <div className="space-y-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Wi-Fi 6 and 6E</h4>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Better handling of multiple device connections</li>
              <li>• 6E opens access to 6 GHz band (less congested)</li>
              <li>• Improved power efficiency for IoT devices</li>
              <li>• Better performance in dense environments</li>
            </ul>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-2">Thread Adoption</h4>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Mesh topology reduces single-point congestion</li>
              <li>• IP-based protocol with robust security</li>
              <li>• Growing support from major manufacturers</li>
              <li>• Native border router functionality in smart speakers</li>
            </ul>
          </div>

          <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-2">Matter Standard</h4>
            <ul className="space-y-1 text-sm text-foreground">
              <li>• Reduces ecosystem fragmentation</li>
              <li>• Works over Wi-Fi, Thread, and Ethernet</li>
              <li>• Simplifies multi-protocol installations</li>
              <li>• Backed by major tech companies</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};