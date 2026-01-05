import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, RefreshCw, Battery } from 'lucide-react';

const AftercareAdviceSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Heart className="h-6 w-6 text-elec-yellow" />
          4. Aftercare and Support Advice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Proper aftercare guidance helps clients maintain their system and reduces unnecessary support calls while building long-term relationships.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-400" />
                Firmware and App Updates
              </h4>
              <p className="text-gray-300 text-sm mb-2">Show clients how to keep systems current:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Enable automatic app updates on their devices</li>
                <li>• Check for hub firmware updates monthly</li>
                <li>• Understand when updates require professional help</li>
                <li>• Backup system settings before major updates</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-400" />
                Battery Replacement Schedules
              </h4>
              <p className="text-gray-300 text-sm mb-2">Advise on battery maintenance:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Typical battery life for different device types</li>
                <li>• How to identify low battery warnings</li>
                <li>• Recommended battery types and sources</li>
                <li>• Simple replacement procedures they can handle</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-medium text-purple-200 mb-2">Regular System Testing</h4>
              <p className="text-purple-100 text-sm mb-2">Encourage routine checks:</p>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Test security system monthly</li>
                <li>• Check smart locks operate smoothly</li>
                <li>• Verify backup procedures work</li>
                <li>• Test emergency lighting and alarms</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2">Support Package Options</h4>
              <p className="text-amber-100 text-sm mb-2">Offer structured aftercare:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Annual system health checks</li>
                <li>• Priority response for emergency calls</li>
                <li>• Remote support for minor issues</li>
                <li>• System expansion consultations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Setting Support Expectations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">What Clients Can Handle</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Battery replacements in sensors</li>
                <li>• App updates and basic troubleshooting</li>
                <li>• Wi-Fi password changes</li>
                <li>• Simple device re-pairing</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">When to Call Professionals</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Electrical faults or power issues</li>
                <li>• Major system failures</li>
                <li>• Hub replacement or major updates</li>
                <li>• Adding new circuits or devices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-200 mb-2">Building Long-term Relationships</h4>
          <p className="text-blue-100 text-sm mb-2">
            Quality aftercare advice demonstrates professionalism and often leads to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <ul className="space-y-1 text-blue-100 text-sm">
              <li>• Reduced emergency call-outs</li>
              <li>• Positive reviews and referrals</li>
            </ul>
            <ul className="space-y-1 text-blue-100 text-sm">
              <li>• Future expansion projects</li>
              <li>• Ongoing maintenance contracts</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AftercareAdviceSection;