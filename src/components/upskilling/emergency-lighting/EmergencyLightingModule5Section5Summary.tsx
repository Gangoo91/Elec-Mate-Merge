import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Shield, Lightbulb } from 'lucide-react';

export const EmergencyLightingModule5Section5Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Points to Remember */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Key Points to Remember</h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
            <h4 className="font-semibold text-green-400 mb-2 text-sm sm:text-base">Certification Confirms Compliance</h4>
            <p className="text-foreground text-sm sm:text-base">
              Formal certification provides written proof that the system meets all design and performance 
              requirements under BS 5266-1, BS 7671, and BS EN 50172. It establishes professional accountability 
              and is essential for legal compliance.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">Multiple Certificates Required</h4>
            <p className="text-foreground text-sm sm:text-base">
              A complete certification package includes the Emergency Lighting Completion Certificate, Electrical 
              Installation Certificate, Design Declaration Certificate, Commissioning Certificate, and (where 
              applicable) Minor Works Certificates.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-400 mb-2 text-sm sm:text-base">Commissioning Checklists Provide Structured Verification</h4>
            <p className="text-foreground text-sm sm:text-base">
              Commissioning checklists verify that every aspect of the system has been tested, labelled, and 
              documented correctly. They must cover luminaire verification, battery testing, exit sign compliance, 
              system labelling, documentation, and professional sign-off.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
            <h4 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">Sign-Off Establishes Accountability</h4>
            <p className="text-foreground text-sm sm:text-base">
              Certification documents must be signed by the designer, installer, and verifier/commissioning engineer 
              to establish clear accountability at every stage of the project. Never sign certificates for work you 
              haven't personally verified.
            </p>
          </div>
        </div>

        {/* Certification and Commissioning Checklist */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Certification and Commissioning Checklist</h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-foreground text-sm sm:text-base mb-4">
              Before issuing final certificates, verify the following:
            </p>
            <div className="space-y-2">
              {[
                "Emergency Lighting Completion Certificate (BS 5266-1, Annex G) prepared",
                "Electrical Installation Certificate (BS 7671) prepared",
                "Design Declaration Certificate prepared",
                "Commissioning Certificate prepared",
                "Minor Works Certificates prepared (if applicable)",
                "Commissioning checklist completed with all items verified",
                "All luminaires installed per design drawings",
                "3-hour duration test completed successfully",
                "Exit signs comply with ISO 7010",
                "System labelling, segregation, and containment verified",
                "Documentation package (drawings, logbook, test results) complete",
                "Designer signature obtained",
                "Installer signature obtained",
                "Verifier/Commissioning Engineer signature obtained",
                "All outstanding defects resolved",
                "Client handover meeting completed",
                "Digital and physical copies provided to client",
                "Certificates stored in fire safety documentation folder",
                "Personal copies retained for at least six years"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-gray-800" 
                  />
                  <span className="text-foreground text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Compliance Benefits */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Professional Compliance Benefits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3 text-sm sm:text-base">Legal Protection</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Demonstrates compliance with fire safety legislation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Validates insurance claims and coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Protects against professional liability claims</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3 text-sm sm:text-base">Professional Benefits</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Establishes professional credibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Ensures audit readiness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Builds client confidence and trust</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2 text-sm sm:text-base lg:text-lg">
                Key Takeaway for Electricians
              </h4>
              <p className="text-foreground text-sm sm:text-base lg:text-lg">
                Certification transforms a working system into a legally compliant installation. Without proper 
                documentation, even a perfect installation is considered non-verified. Always complete and retain 
                all certificates for professional protection and client confidence. Remember: a system without 
                certification is legally non-existent from a compliance perspective.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
