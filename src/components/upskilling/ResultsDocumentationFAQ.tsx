import { HelpCircle, CheckCircle, AlertTriangle, Info, FileText, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-4 w-4 text-blue-400" />
              What happens if I write "Pass" instead of actual values?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Writing "Pass" or "OK" instead of actual measured values is considered false certification and can result in 
              serious legal consequences including prosecution, professional deregistration, and insurance invalidation.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Legal requirement:</strong> BS7671 and IET Guidance Notes specifically require actual measured 
                values to be recorded. Subjective assessments provide no useful information for future maintenance or fault diagnosis.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              How long should I keep test certificates and records?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Test certificates should be retained permanently as they provide legal evidence of work carried out. 
              Many insurance policies and legal cases rely on historical documentation spanning many years.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Best practice:</strong> Keep original certificates with the client, retain copies indefinitely, 
                and ensure digital backups are secure and accessible. Consider cloud storage with appropriate encryption.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-4 w-4 text-blue-400" />
              Can I correct mistakes on certificates after signing?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Minor corrections can be made using the official amendment process, but significant errors may require 
              a new certificate. Any corrections must be initialled, dated, and clearly documented.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Important:</strong> Never use correcting fluid or attempt to erase entries. Cross out errors 
                with a single line, write the correction clearly, and initial/date the change. Major errors may require reissue.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <FileText className="h-4 w-4 text-green-400" />
              What information must be included in the Schedule of Test Results?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              The schedule must include circuit details, cable specifications, protective device ratings, and all 
              relevant test results with units. Environmental conditions and test method variations should also be noted.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Essential details:</strong> Circuit designation, cable type/size, protective device type/rating, 
                test method used, ambient temperature, and all measured values with appropriate units and precision.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Shield className="h-4 w-4 text-red-400" />
              What should I do if test results are marginal but still within limits?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Record the actual values and consider adding observations or recommendations. Results close to limits 
              may indicate deteriorating conditions that require monitoring or remedial action in the near future.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Professional judgment:</strong> While technically acceptable, marginal results should be flagged 
                for attention. Consider shorter inspection intervals or recommend improvements to provide better safety margins.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-4 w-4 text-blue-400" />
              How should I handle digital certificates and electronic signatures?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Digital certificates are acceptable provided they maintain data integrity and include proper authentication. 
              Electronic signatures must comply with relevant legislation and industry standards.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Digital security:</strong> Ensure certificates are tamper-evident, backed up securely, and 
                accessible for the required retention period. Consider PDF/A format for long-term archival.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What if the client refuses to allow me to record a failed result?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              You must record actual test results regardless of client preferences. Your professional integrity and 
              legal obligations take precedence over client commercial concerns.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Professional duty:</strong> Never compromise on accurate recording. Explain the legal requirements 
                to the client and document any refusal to allow proper testing or certification. Consider withdrawing from the contract if necessary.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 text-green-400" />
              How precise should my recorded measurements be?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Record measurements to the precision provided by your calibrated test equipment. Generally, loop impedance 
              to 2 decimal places, fault current to 1 decimal place, and insulation resistance as displayed.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Measurement precision:</strong> Don't round excessively or add false precision. Record what 
                your equipment displays, include appropriate units, and ensure consistency throughout the certificate.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-4 w-4 text-blue-400" />
              Should I include photos or additional documentation?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Photos can provide valuable supporting evidence, especially for safety observations or unusual installations. 
              They help justify decisions and provide context for future inspections.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Documentation value:</strong> Photos of equipment nameplates, dangerous conditions, or 
                installation details can be invaluable. Ensure images are clear, dated, and properly catalogued with the certificate.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Shield className="h-4 w-4 text-red-400" />
              What's the difference between observations and recommendations?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2 leading-relaxed">
              Observations record actual conditions found, while recommendations suggest actions. Both should be specific, 
              actionable, and prioritised according to safety significance.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Clear communication:</strong> Use EICR coding (C1, C2, C3) appropriately, be specific about 
                locations and issues, and provide clear guidance on required actions and timescales.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};