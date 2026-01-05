import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wrench, Calendar, Phone } from 'lucide-react';

const AftercareMaintenanceSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Heart className="h-6 w-6 text-elec-yellow" />
          3. Aftercare and Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Structured aftercare and maintenance advice helps clients keep their systems running optimally 
          while creating opportunities for ongoing professional relationships.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Regular Maintenance Checks
              </h4>
              <p className="text-gray-300 text-sm mb-2">Offer scheduled maintenance services:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Annual or semi-annual system health checks</li>
                <li>• Firmware updates and security patches</li>
                <li>• Battery replacement and device testing</li>
                <li>• Performance optimisation and troubleshooting</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-green-400" />
                Routine Tasks for Clients
              </h4>
              <p className="text-gray-300 text-sm mb-2">Recommend client-manageable tasks:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Monthly testing of safety-critical devices</li>
                <li>• Battery replacements in sensors (with guidance)</li>
                <li>• App updates and basic troubleshooting</li>
                <li>• Regular cleaning of devices and sensors</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-medium text-purple-200 mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Technical Support Services
              </h4>
              <p className="text-purple-100 text-sm mb-2">Provide clear support structure:</p>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Point of contact for technical support</li>
                <li>• Remote assistance for software issues</li>
                <li>• Emergency response for critical systems</li>
                <li>• System expansion consultation services</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2">Tiered Support Packages</h4>
              <p className="text-amber-100 text-sm mb-2">Consider offering different levels:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Basic: Emergency contact and advice</li>
                <li>• Standard: Annual check + remote support</li>
                <li>• Premium: Bi-annual visits + priority response</li>
                <li>• Enterprise: Monthly monitoring + rapid response</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Aftercare Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">For Clients</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Maximises system reliability and lifespan</li>
                <li>• Reduces unexpected failure costs</li>
                <li>• Keeps systems current with technology</li>
                <li>• Provides peace of mind and expert support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">For Installers</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Creates ongoing revenue streams</li>
                <li>• Builds long-term client relationships</li>
                <li>• Opportunities for system expansion</li>
                <li>• Enhances professional reputation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-200 mb-2">Maintenance Schedule Template</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Monthly:</span>
              <span className="text-gray-300 text-sm ml-2">Safety device tests</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Quarterly:</span>
              <span className="text-gray-300 text-sm ml-2">Battery checks</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">Annually:</span>
              <span className="text-gray-300 text-sm ml-2">Full system review</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AftercareMaintenanceSection;