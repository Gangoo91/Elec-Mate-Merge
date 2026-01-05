import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';

export const SmartHomeModule5Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-6 w-6 text-elec-yellow" />
          Real-World Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <p className="font-semibold text-foreground mb-3">
            The Corner Shop CCTV Storage Crisis
          </p>
          <p className="text-sm mb-4">
            A corner shop in Manchester installed state-of-the-art 4K cameras with an NVR system designed for 30-day storage. 
            However, the system was constantly overwriting footage after just one week, causing compliance issues and missing 
            critical incidents. The owner needed a solution that maintained image quality whilst extending storage duration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#1a1a1a] p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Initial Configuration Problems</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• 8 × 4K cameras recording 24/7</li>
                <li>• 2TB NVR storage insufficient</li>
                <li>• No motion detection configured</li>
                <li>• Maximum bitrate settings used</li>
                <li>• No compression optimisation</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Optimised Solution Implemented</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Motion-triggered recording during closed hours</li>
                <li>• Reduced bitrate for perimeter cameras</li>
                <li>• Cloud backup for entrance/till cameras</li>
                <li>• H.265 compression enabled</li>
                <li>• Tiered storage strategy implemented</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Measured Results After Changes</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Storage consumption reduced by 75%</li>
                <li>• Full 30-day retention achieved</li>
                <li>• Critical areas maintain 4K quality</li>
                <li>• Remote access via mobile app</li>
                <li>• GDPR compliance maintained</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Additional Benefits Discovered</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Reduced false alarm notifications</li>
                <li>• Lower bandwidth usage for remote viewing</li>
                <li>• Easier footage retrieval with smart search</li>
                <li>• Extended hardware lifespan</li>
                <li>• Better integration with existing systems</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/40 p-4 rounded">
            <p className="text-green-400 font-semibold text-sm mb-3">Key Learning Points:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Technical Strategy</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Match resolution to purpose</li>
                  <li>• Use motion detection intelligently</li>
                  <li>• Enable modern compression</li>
                  <li>• Plan storage requirements properly</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Business Impact</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Maintain compliance requirements</li>
                  <li>• Reduce ongoing storage costs</li>
                  <li>• Improve system reliability</li>
                  <li>• Enable remote monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Best Practices</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Test before full deployment</li>
                  <li>• Document configuration changes</li>
                  <li>• Train users on new features</li>
                  <li>• Regular system health checks</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0f0f0f] border border-gray-600 p-3 rounded mt-4">
            <p className="text-elec-yellow font-semibold text-sm mb-2">Discussion Points:</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• How does resolution choice affect storage requirements and costs?</li>
              <li>• What are the trade-offs between continuous and motion-triggered recording?</li>
              <li>• When would cloud storage be preferred over local NVR storage?</li>
              <li>• How can GDPR compliance be maintained whilst maximising security coverage?</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};