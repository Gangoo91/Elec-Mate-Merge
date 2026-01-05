import { Building, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorldSection4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-orange-400 drop-shadow-md" />
          Real-World Example: Multi-Tenancy Shopping Centre Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/40 rounded-lg">
          <h4 className="text-orange-300 font-semibold mb-2">Project Challenge</h4>
          <p className="text-sm">
            A large shopping centre with multiple tenants, varying ceiling heights, and complex escape routes. The project required 
            coordination between multiple responsible persons while ensuring full BS 5266 compliance across all areas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-400" />
              Standards Application
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>BS 5266-1:2016:</strong> Used for design methodology and system specification</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>BS EN 1838:2013:</strong> Applied for photometric calculations and light levels</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Building Regulations:</strong> Compliance with Approved Document B requirements</p>
              </div>
              <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                <p><strong>Fire Safety Order:</strong> Risk assessment and responsible person duties defined</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-purple-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-purple-400" />
              Compliance Challenges
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Multiple Tenancies:</strong> Coordinating individual and common area responsibilities</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Varied Layouts:</strong> Different ceiling heights and shop configurations</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Testing Coordination:</strong> Scheduling across multiple business operations</p>
              </div>
              <div className="p-2 bg-purple-500/10 border-l-2 border-purple-500 rounded">
                <p><strong>Documentation:</strong> Maintaining records across different responsible persons</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-2">Standards-Based Solution</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-200 mb-1">Design Phase (BS 5266-1):</p>
              <p>• Comprehensive risk assessment covering all areas</p>
              <p>• Photometric calculations using BS EN 1838 criteria</p>
              <p>• System specification meeting duration requirements</p>
            </div>
            <div>
              <p className="font-medium text-green-200 mb-1">Operation Phase (BS 5266-8):</p>
              <p>• Coordinated testing schedule across all tenancies</p>
              <p>• Centralised record-keeping system</p>
              <p>• Clear responsibility matrix for maintenance</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-indigo-300 font-semibold">Documentation and Compliance Framework</h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/40 rounded">
              <p className="font-medium text-indigo-200 mb-1">Legal Documents:</p>
              <p>• Fire risk assessments per tenancy</p>
              <p>• Responsible person agreements</p>
              <p>• Compliance certificates</p>
            </div>
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/40 rounded">
              <p className="font-medium text-indigo-200 mb-1">Technical Records:</p>
              <p>• BS 5266-1 design calculations</p>
              <p>• Installation certificates</p>
              <p>• Commissioning test results</p>
            </div>
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/40 rounded">
              <p className="font-medium text-indigo-200 mb-1">Operational Records:</p>
              <p>• BS 5266-8 test schedules</p>
              <p>• Maintenance logs</p>
              <p>• Training documentation</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/40 rounded-lg">
          <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Key Learning Point
          </h4>
          <p className="text-sm">
            Standards compliance in complex buildings requires systematic application of the regulatory hierarchy. 
            BS 5266 provides the technical framework, but success depends on clear responsibility allocation and 
            coordinated documentation across all stakeholders.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};