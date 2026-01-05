import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const ChoosingHubVsHublessSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Choosing Hub vs Hubless
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Decision Guide by Installation Size</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Small (1-10 devices)</h5>
              <div className="text-blue-100 text-sm space-y-1">
                <p><strong>Recommendation:</strong> Hubless may be fine</p>
                <p><strong>Examples:</strong> Apartment, single room, basic lighting</p>
                <p><strong>Benefits:</strong> Low cost, simple setup</p>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <h5 className="font-medium text-yellow-200 mb-2">Medium (10-50 devices)</h5>
              <div className="text-yellow-100 text-sm space-y-1">
                <p><strong>Recommendation:</strong> Hub recommended</p>
                <p><strong>Examples:</strong> Family home, multi-room systems</p>
                <p><strong>Benefits:</strong> Better reliability, scalability</p>
              </div>
            </div>
            
            <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <h5 className="font-medium text-green-200 mb-2">Large (50+ devices)</h5>
              <div className="text-green-100 text-sm space-y-1">
                <p><strong>Recommendation:</strong> Hub-based essential</p>
                <p><strong>Examples:</strong> Large homes, commercial spaces</p>
                <p><strong>Benefits:</strong> Multiple hubs, zone management</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-elec-dark border border-gray-600 rounded-lg">
          <h4 className="font-medium text-elec-yellow mb-3">Key Assessment Factors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Client Considerations</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Budget constraints and cost priorities</li>
                <li>• Technical comfort level and DIY capability</li>
                <li>• Expansion plans and future growth</li>
                <li>• Reliability requirements (critical vs nice-to-have)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Technical Factors</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Existing network infrastructure quality</li>
                <li>• Property size and signal coverage needs</li>
                <li>• Internet reliability and bandwidth</li>
                <li>• Integration with existing systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-purple-900/10 border border-purple-600/20 rounded-lg">
          <h4 className="font-medium text-purple-200 mb-2">Professional Tip</h4>
          <p className="text-purple-100 text-sm">
            Start with a hub-based system even for smaller installations if the client shows interest in expansion. 
            It's easier to add devices to an existing hub than to migrate from hubless to hub-based later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};