import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Sparkles } from 'lucide-react';

export const FutureTrendsHubSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          Future Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-300">
          The smart home landscape is evolving rapidly, with new standards and technologies reshaping 
          how we think about hubs and device connectivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Matter Standard Impact
            </h4>
            <ul className="text-blue-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Reduces hub dependency by enabling direct device interoperability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Devices can communicate across different ecosystems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Thread networking provides mesh benefits without traditional hubs</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Edge Computing Evolution
            </h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Hubs evolving into local mini-servers with AI processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Local voice processing and machine learning capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Enhanced privacy through local data processing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">What This Means for Installers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Short Term (1-2 years)</h5>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Hubs remain important for reliability and local control</li>
                <li>• Matter adoption will be gradual</li>
                <li>• Hybrid approaches become more common</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Long Term (3-5 years)</h5>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Traditional hubs may evolve rather than disappear</li>
                <li>• Focus shifts to edge computing and local AI</li>
                <li>• Simplified installation with better interoperability</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-elec-dark border border-gray-600 rounded-lg">
          <h4 className="font-medium text-elec-yellow mb-2">Installer Recommendation:</h4>
          <p className="text-gray-300 text-sm">
            Stay informed about Matter adoption and Thread networking, but continue recommending hub-based 
            solutions for reliability-critical installations. The transition will be evolutionary, not revolutionary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};