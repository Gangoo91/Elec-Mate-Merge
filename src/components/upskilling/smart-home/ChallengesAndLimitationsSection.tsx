import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const ChallengesAndLimitationsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Challenges and Limitations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          While smart heating systems offer many benefits, installers should be aware of potential challenges and limitations that may affect implementation and user satisfaction.
        </p>
        
        <div className="space-y-4">
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Installation Challenges</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Retrofit installations can be disruptive, especially wired zoning</li>
              <li>• Existing wiring may not support new systems</li>
              <li>• Structural modifications sometimes required</li>
              <li>• Compatibility issues with older heating systems</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Technical Limitations</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Wireless signal dropouts in large houses</li>
              <li>• Battery replacement requirements for wireless devices</li>
              <li>• Network dependency for remote control</li>
              <li>• Potential interference from other devices</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-yellow-600 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-200 mb-3">Cost Considerations</h4>
            <ul className="space-y-2 text-sm text-yellow-100">
              <li>• Smart TRVs can be expensive for large installations</li>
              <li>• Professional installation costs</li>
              <li>• Ongoing subscription fees for some services</li>
              <li>• Replacement costs for failed components</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">User Experience</h4>
            <ul className="space-y-2 text-sm text-purple-100">
              <li>• System complexity may overwhelm some users</li>
              <li>• Learning curve for advanced features</li>
              <li>• Dependence on smartphone apps</li>
              <li>• Potential for user configuration errors</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};