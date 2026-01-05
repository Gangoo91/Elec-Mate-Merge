import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const SmartHomeModule5Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Rental Property Smart Lock Solution</h4>
          
          <div className="mb-4">
            <p className="text-blue-100 text-sm mb-3">
              A landlord installs smart locks with keypad entry on a rental property. Guests are issued one-time codes that expire after checkout. This avoids lost keys and gives the landlord full control remotely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#1a1a1a] border border-green-600 rounded">
              <h5 className="font-medium text-green-200 mb-2">Benefits Achieved</h5>
              <ul className="text-xs text-green-100 space-y-1">
                <li>• No more key exchanges with guests</li>
                <li>• Automatic code expiry prevents misuse</li>
                <li>• Remote monitoring of property access</li>
                <li>• Easy cleaning/maintenance coordination</li>
                <li>• Reduced property management overhead</li>
              </ul>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-blue-600 rounded">
              <h5 className="font-medium text-blue-200 mb-2">System Features Used</h5>
              <ul className="text-xs text-blue-100 space-y-1">
                <li>• Temporary 4-hour access codes</li>
                <li>• SMS notifications for all entries</li>
                <li>• Mobile app for remote management</li>
                <li>• Backup mechanical key for emergencies</li>
                <li>• Integration with property management software</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-2">Discussion Question:</h5>
            <p className="text-gray-300 text-sm mb-2">
              What risks still exist with this setup, and how could they be reduced?
            </p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded border border-gray-600">
              <h6 className="text-foreground text-sm font-medium mb-2">Potential Risks & Solutions:</h6>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <strong>Code sharing:</strong> Use single-use codes and monitor access logs</li>
                <li>• <strong>Technical failure:</strong> Maintain physical backup key access</li>
                <li>• <strong>Battery depletion:</strong> Set up low-battery alerts and regular maintenance</li>
                <li>• <strong>Wi-Fi outage:</strong> Choose locks with offline PIN functionality</li>
                <li>• <strong>Guest disputes:</strong> Maintain detailed access audit trails</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-600 rounded-lg">
            <h5 className="font-medium text-emerald-200 mb-2">Success Metrics</h5>
            <ul className="text-xs text-emerald-100 space-y-1">
              <li>• 95% reduction in key-related issues</li>
              <li>• 40% faster guest check-in process</li>
              <li>• Zero lost key replacement costs</li>
              <li>• Improved guest satisfaction scores</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-600 rounded-lg">
            <h5 className="font-medium text-orange-200 mb-2">Implementation Costs</h5>
            <ul className="text-xs text-orange-100 space-y-1">
              <li>• Smart lock: £150-250 per door</li>
              <li>• Installation: £50-100 per lock</li>
              <li>• Monthly app fees: £5-15</li>
              <li>• ROI achieved in 8-12 months</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};