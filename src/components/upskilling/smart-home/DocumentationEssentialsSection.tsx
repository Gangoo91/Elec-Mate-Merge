import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, MapPin } from 'lucide-react';

const DocumentationEssentialsSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-elec-yellow" />
          1. Documentation Essentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Comprehensive documentation is essential for future reference, compliance, and liability protection. 
          Proper records demonstrate competence and provide foundation for ongoing client relationships.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                Wiring Diagrams and Circuit References
              </h4>
              <p className="text-gray-300 text-sm mb-2">Provide detailed circuit documentation:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Complete wiring diagrams for all smart circuits</li>
                <li>• Device locations with room references</li>
                <li>• Circuit breaker references and labels</li>
                <li>• Cable routes and containment details</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-green-400" />
                Device Information Records
              </h4>
              <p className="text-gray-300 text-sm mb-2">Record comprehensive device data:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Device IDs, serial numbers, and model numbers</li>
                <li>• Firmware versions at time of installation</li>
                <li>• Paired hub/controller information</li>
                <li>• MAC addresses for network devices</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-medium text-purple-200 mb-2">System Configuration Notes</h4>
              <p className="text-purple-100 text-sm mb-2">Document system setup details:</p>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Automation routines and scenes created</li>
                <li>• Integration settings and API connections</li>
                <li>• Network configuration and Wi-Fi settings</li>
                <li>• User account details (if agreed with client)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2">Storage and Access</h4>
              <p className="text-amber-100 text-sm mb-2">Maintain accessible records:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Store client copy and installer copy separately</li>
                <li>• Use cloud storage with backup systems</li>
                <li>• Ensure records are accessible for future work</li>
                <li>• Organise by client and installation date</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Documentation Package Contents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Technical Documents</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>✓ As-fitted wiring diagrams</li>
                <li>✓ Device inventory and locations</li>
                <li>✓ Test certificates and results</li>
                <li>✓ Network configuration details</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">User Documents</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>✓ Quick-start guides</li>
                <li>✓ Troubleshooting checklists</li>
                <li>✓ Contact information sheet</li>
                <li>✓ Warranty documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationEssentialsSection;