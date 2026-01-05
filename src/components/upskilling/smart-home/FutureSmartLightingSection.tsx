import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export const FutureSmartLightingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Future of Smart Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Smart lighting continues to evolve with new standards, health-focused features, and deeper integration capabilities.
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Matter Standard Convergence</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• Universal compatibility between brands</li>
              <li>• Simplified setup and management</li>
              <li>• Local processing for better reliability</li>
              <li>• Thread mesh networking for robust communication</li>
            </ul>
          </div>

          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Adaptive Lighting Technology</h5>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• Automatic colour temperature adjustment throughout the day</li>
              <li>• Daylight harvesting with seamless dimming</li>
              <li>• Occupancy-based intelligent control</li>
              <li>• Weather and season-aware lighting scenes</li>
            </ul>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Wellness Integration</h5>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• <strong>Circadian rhythm lighting</strong> - supporting natural sleep patterns</li>
              <li>• Integration with wearable health devices</li>
              <li>• Mood-responsive lighting based on biometric data</li>
              <li>• Therapeutic light therapy features</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Installation Implications</h5>
            <p className="text-sm text-orange-100">
              Future-proofing installations means planning for Matter compatibility, ensuring adequate bandwidth for adaptive features, and considering health-focused control strategies from the design stage.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};