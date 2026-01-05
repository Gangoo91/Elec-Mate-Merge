import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, FileCheck, Shield } from 'lucide-react';

const ProfessionalStandardsSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          4. Professional Standards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Professional documentation standards ensure compliance, protect against liability, 
          and demonstrate competence to clients and regulatory bodies.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-400" />
                BS 7671 Documentation Requirements
              </h4>
              <p className="text-gray-300 text-sm mb-2">Maintain alignment with wiring regulations:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Complete electrical installation certificates (EIC)</li>
                <li>• Minor electrical installation works certificates (MEIWC)</li>
                <li>• Periodic inspection and testing records</li>
                <li>• Test result schedules and measurements</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                Safety Certificates
              </h4>
              <p className="text-gray-300 text-sm mb-2">Ensure all safety documentation is complete:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• RCD testing certificates and schedules</li>
                <li>• Insulation resistance test results</li>
                <li>• Continuity testing documentation</li>
                <li>• Functional testing records for smart devices</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-medium text-purple-200 mb-2">Digital Handover Packages</h4>
              <p className="text-purple-100 text-sm mb-2">Modern documentation delivery:</p>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• PDF packages with searchable content</li>
                <li>• QR codes linking to online resources</li>
                <li>• Cloud-based document storage and sharing</li>
                <li>• Mobile-friendly formats for easy client access</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2">Liability Protection</h4>
              <p className="text-amber-100 text-sm mb-2">Documentation demonstrates:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Compliance with relevant standards and regulations</li>
                <li>• Professional competence and attention to detail</li>
                <li>• Clear communication of limitations and responsibilities</li>
                <li>• Proper testing and verification procedures followed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-200 mb-2">Record Retention Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Legal Requirements</h5>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Keep electrical certificates for minimum 6 years</li>
                <li>• Maintain test records for regulatory inspections</li>
                <li>• Store client documentation securely and accessibly</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Best Practice</h5>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Digital backups in multiple locations</li>
                <li>• Regular backup verification and testing</li>
                <li>• Secure access controls for sensitive information</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Benefits</h4>
          <p className="text-gray-300 text-sm mb-3">
            Maintaining high documentation standards delivers multiple professional advantages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Demonstrates competence to clients and inspectors</li>
              <li>• Reduces liability and insurance risks</li>
              <li>• Facilitates future maintenance and expansion work</li>
            </ul>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Builds client confidence and trust</li>
              <li>• Supports warranty claims and dispute resolution</li>
              <li>• Enhances professional reputation and referrals</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalStandardsSection;