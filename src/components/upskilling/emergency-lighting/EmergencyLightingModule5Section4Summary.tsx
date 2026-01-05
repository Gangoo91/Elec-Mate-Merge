import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Shield, Lightbulb } from 'lucide-react';

export const EmergencyLightingModule5Section4Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Points to Remember */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-foreground">Key Points to Remember</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-green-500">
              <p className="font-semibold text-green-400 mb-2 text-sm sm:text-base">1. Labelling is Essential</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Clear, durable labelling ensures circuits can be safely isolated, test points quickly identified, and compliance verified efficiently during inspections.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-blue-500">
              <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">2. Component Labelling Requirements</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Luminaires, distribution boards, test points, cabling, and logbooks must all be clearly labelled with cross-referenced identification systems.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
              <p className="font-semibold text-purple-400 mb-2 text-sm sm:text-base">3. Complete Documentation</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Maintenance logbooks must record all tests, faults, repairs, battery replacements, and commissioning evidence for the lifetime of the installation.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border-l-4 border-red-500">
              <p className="font-semibold text-red-400 mb-2 text-sm sm:text-base">4. Legal Compliance</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Missing records can result in enforcement notices, invalid insurance, prosecution, and increased civil liability — even if the physical system is perfect.
              </p>
            </div>
          </div>
        </div>

        {/* Labelling and Documentation Checklist */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-foreground">Labelling and Documentation Checklist</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                All luminaires labelled with circuit references and maintained/non-maintained status
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Distribution boards marked "Emergency Lighting Circuits Only"
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Test points and key switches identified for monthly checks
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Exit signs comply with ISO 7010 pictograms
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Logbook includes all tests, faults, repairs, and battery replacements
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Cross-referencing between labels, drawings, and logbook entries verified
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Commissioning certificates and initial duration test results retained
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700" readOnly />
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Records available for inspection by fire authorities and insurers
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Benefits Summary */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Compliance Benefits Summary</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-4 rounded-md">
              <p className="font-semibold text-green-400 mb-2 text-sm sm:text-base">Legal Protection</p>
              <ul className="space-y-1 text-foreground text-sm sm:text-base">
                <li>• Demonstrates due diligence</li>
                <li>• Validates insurance policies</li>
                <li>• Defends against prosecution</li>
                <li>• Reduces civil liability</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-4 rounded-md">
              <p className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">Operational Benefits</p>
              <ul className="space-y-1 text-foreground text-sm sm:text-base">
                <li>• Faster fault-finding</li>
                <li>• Reduced maintenance time</li>
                <li>• Simplified inspections</li>
                <li>• Clear audit trail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 p-4 rounded-md">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-elec-yellow mb-2 text-sm sm:text-base lg:text-lg">Key Takeaway for Electricians</p>
              <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                Never hand over an emergency lighting installation without complete labelling and documentation. A technically perfect system without proper records is legally non-compliant and can result in prosecution. Professional labelling, accurate logbooks, and clear cross-referencing are not optional extras — they are legal requirements that protect both you and your client.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
