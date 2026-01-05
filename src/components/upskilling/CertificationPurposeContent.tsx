import { Book, CheckCircle, Shield, AlertTriangle, FileText, Users, Target, Info, Award, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CertificationPurposeContent = () => {
  const learningObjectives = [
    "Understand the legal framework governing electrical certification",
    "Identify when different types of certificates are required",
    "Recognise the responsibilities of competent persons",
    "Understand the role of certification in safety management",
    "Apply regulatory requirements to practical situations",
    "Appreciate the consequences of inadequate certification"
  ];

  const legalRequirements = [
    {
      legislation: "Electricity at Work Regulations 1989",
      requirement: "Regulation 4(2) - Duty to maintain electrical systems to prevent danger",
      application: "All electrical installations must be maintained in safe condition",
      evidence: "Certification provides evidence of compliance",
      color: "red"
    },
    {
      legislation: "Building Regulations Part P",
      requirement: "Electrical safety in dwellings - notification and certification required",
      application: "Domestic electrical work must be certified by competent person",
      evidence: "EIC or MEIWC must be issued for notifiable work",
      color: "blue"
    },
    {
      legislation: "Housing Act 2004 (England)",
      requirement: "Private rental sector electrical safety regulations",
      application: "Landlords must ensure electrical safety every 5 years",
      evidence: "EICR required with satisfactory outcome",
      color: "green"
    }
  ];

  const certificationPurposes = [
    "Legal compliance demonstration",
    "Safety verification and assurance",
    "Professional liability protection",
    "Insurance requirement fulfillment",
    "Property transaction facilitation",
    "Maintenance planning support",
    "Regulatory inspection preparation",
    "Quality assurance documentation"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Book className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What is Electrical Certification */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What is Electrical Certification?</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed">
              Electrical certification is the formal documentation process that verifies electrical installations 
              comply with safety standards and regulatory requirements. It provides legal evidence that work 
              has been designed, installed, and tested according to BS 7671 and other applicable standards.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                <strong>Remember:</strong> Certification is not just paperwork - it's a legal declaration 
                of safety and compliance that carries significant responsibilities and liabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Framework */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal Framework and Requirements</h3>
          <div className="space-y-4">
            {legalRequirements.map((item, index) => (
              <div key={index} className={`bg-${item.color}-600/10 border border-${item.color}-600/20 rounded-lg p-4`}>
                <h4 className={`text-${item.color}-200 font-medium mb-3 flex items-center gap-2`}>
                  <Scale className={`h-5 w-5 text-${item.color}-400`} />
                  {item.legislation}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Legal Requirement:</h5>
                    <p className="text-foreground mb-2">{item.requirement}</p>
                    <h5 className="text-foreground font-semibold mb-2">Application:</h5>
                    <p className="text-foreground">{item.application}</p>
                  </div>
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Evidence Required:</h5>
                    <p className="text-foreground">{item.evidence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-600/50">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Purposes of Certification */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Primary Purposes of Electrical Certification</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certificationPurposes.map((purpose, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-600/10 border border-gray-600/20 rounded">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-foreground text-sm">{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Types of Electrical Certificates */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Types of Electrical Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <FileText className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Electrical Installation Certificate (EIC)</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• New electrical installations</li>
                <li>• Complete rewiring projects</li>
                <li>• New consumer unit installations</li>
                <li>• Addition of new circuits</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <FileText className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">Minor Electrical Installation Works Certificate</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Additional socket outlets</li>
                <li>• New lighting points</li>
                <li>• Replacement accessories</li>
                <li>• Fused spur installations</li>
              </ul>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <FileText className="h-6 w-6 text-orange-400 mb-3" />
              <h4 className="text-orange-200 font-medium mb-2">Electrical Installation Condition Report</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Periodic inspections</li>
                <li>• Property transactions</li>
                <li>• Insurance requirements</li>
                <li>• Rental property compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Competent Person Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Competent Person Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Essential Qualifications</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• City & Guilds 2391 Inspection & Testing</li>
                  <li>• Relevant electrical installation qualifications</li>
                  <li>• Current BS 7671 knowledge (18th Edition)</li>
                  <li>• Appropriate practical experience</li>
                  <li>• Understanding of health and safety</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Professional Requirements</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Professional indemnity insurance</li>
                  <li>• Competent person scheme membership</li>
                  <li>• Continuous professional development</li>
                  <li>• Calibrated test equipment</li>
                  <li>• Understanding of legal responsibilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Consequences and Responsibilities */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Consequences and Responsibilities</h3>
          <div className="space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Legal Consequences of Poor Certification</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Criminal prosecution under Electricity at Work Regulations</li>
                    <li>• Civil liability for accidents and damage</li>
                    <li>• Professional disciplinary action</li>
                    <li>• Insurance policy invalidation</li>
                    <li>• Building control prosecution</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-200 font-medium mb-2">Professional Responsibilities</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Accurate completion of all certificate sections</li>
                    <li>• Thorough inspection and testing verification</li>
                    <li>• Clear identification of non-compliances</li>
                    <li>• Appropriate recommendations for remedial work</li>
                    <li>• Maintenance of certification records</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-200 font-medium mb-2">Benefits of Proper Certification</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Legal compliance and protection</li>
                    <li>• Professional credibility and reputation</li>
                    <li>• Client confidence and satisfaction</li>
                    <li>• Clear audit trail for maintenance</li>
                    <li>• Support for warranty and insurance claims</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Certification Considerations</h3>
          <div className="space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Documentation Integrity</h4>
                  <p className="text-foreground text-sm">
                    All certificates must be complete, accurate, and legible. Electronic certificates 
                    are acceptable but must maintain security and authenticity.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-purple-200 font-medium mb-2">Record Retention</h4>
                  <p className="text-foreground text-sm">
                    Certificates should be retained for the life of the installation. Building owners 
                    should maintain copies and provide them to subsequent owners or tenants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CertificationPurposeContent;