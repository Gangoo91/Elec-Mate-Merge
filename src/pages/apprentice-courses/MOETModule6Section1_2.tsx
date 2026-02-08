import { ArrowLeft, Scale, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const MOETModule6Section1_2 = () => {
  useSEO(
    "Section 6.1.2: Legal and Safety Reasons (EAWR, BS 7671 Principles) - MOET Module 6",
    "Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Scale className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Section 6.1.2: Legal and Safety Reasons (EAWR, BS 7671 Principles)
              </h1>
              <p className="text-muted-foreground mt-2">
                Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-card/30 border-elec-yellow/30">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-6">Introduction</h2>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* In 30 seconds */}
              <div className="bg-background/50 rounded-lg p-4 border border-border/20">
                <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                  In 30 seconds
                </h3>
                <p className="text-sm text-muted-foreground">
                  Electrical inspection and testing is not only good practice – it is a legal requirement. The Electricity at Work Regulations (EAWR 1989) and BS 7671 Wiring Regulations set clear standards for the design, construction, inspection, and testing of electrical systems. Failure to comply can result in serious injury, prosecution, fines, or imprisonment.
                </p>
              </div>

              {/* Spot it / Use it */}
              <div className="bg-background/50 rounded-lg p-4 border border-border/20">
                <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-elec-yellow" />
                  Spot it / Use it
                </h3>
                <p className="text-sm text-muted-foreground">
                  This subsection explains the legal framework and why compliance is critical for all electricians. Understanding these requirements protects both you and your clients from legal consequences and safety risks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-8 bg-card/30 border-elec-yellow/30">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Learning Outcomes</h2>
            <p className="text-sm text-muted-foreground mb-4">By the end of this subsection, you will be able to:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Identify the legal requirements for inspection and testing under EAWR 1989</li>
              <li>• Explain how BS 7671 principles guide safe design and testing practices</li>
              <li>• Understand the consequences of failing to comply with regulations</li>
              <li>• Recognise your personal responsibility as an installer</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Content / Learning</h2>

            {/* 1. The Electricity at Work Regulations (EAWR 1989) */}
            <section className="mb-8">
              <h3 className="text-lg font-medium text-foreground mb-4">1. The Electricity at Work Regulations (EAWR 1989)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Key Principle:</strong> All electrical systems must be constructed, maintained, and tested so they are safe to use.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Employers and employees have a duty to prevent danger</li>
                <li>• Regulation 4(1) & 4(2): Systems must be safe at all times and maintained in that condition</li>
                <li>• Failure to comply can lead to legal action, fines, or imprisonment</li>
              </ul>
            </section>

            <InlineCheck
              id="eawr-check"
              question="What is the key principle of the Electricity at Work Regulations (EAWR 1989)?"
              options={["Systems must be energy efficient", "All electrical systems must be constructed, maintained, and tested so they are safe to use", "Installation costs must be minimised", "Only qualified electricians can work on systems"]}
              correctIndex={1}
              explanation="The EAWR 1989 establishes that all electrical systems must be constructed, maintained, and tested to ensure they are safe to use at all times."
            />
            <Separator className="my-6" />

            {/* 2. BS 7671 Wiring Regulations */}
            <section className="mb-8">
              <h3 className="text-lg font-medium text-foreground mb-4">2. BS 7671 Wiring Regulations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• BS 7671 provides the technical framework for electrical safety</li>
                <li>• Requires initial verification of new installations and periodic inspection/testing of existing ones</li>
                <li>• Outlines test procedures: continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation</li>
                <li>• Ensures uniformity and professional standards across the industry</li>
              </ul>
            </section>

            <InlineCheck
              id="bs7671-check"
              question="What does BS 7671 require for new electrical installations?"
              options={["Only visual inspection", "Initial verification before energising", "Annual testing only", "No specific requirements"]}
              correctIndex={1}
              explanation="BS 7671 requires initial verification of all new installations before they are energised, ensuring they meet safety standards."
            />
            <Separator className="my-6" />

            {/* 3. Personal Responsibility */}
            <section className="mb-8">
              <h3 className="text-lg font-medium text-foreground mb-4">3. Personal Responsibility</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• The person signing the Electrical Installation Certificate takes legal responsibility for safety</li>
                <li>• "Ignorance of the law" is not a defence – all electricians must be competent and aware of requirements</li>
                <li>• Poor testing or fraudulent certification can result in prosecution or being struck off professional registers</li>
              </ul>
            </section>

            <InlineCheck
              id="responsibility-check"
              question="Who takes legal responsibility for safety when signing an Electrical Installation Certificate?"
              options={["The employer only", "The client", "The person signing the certificate", "The testing equipment manufacturer"]}
              correctIndex={2}
              explanation="The person who signs the Electrical Installation Certificate takes full legal responsibility for the safety of the installation."
            />
            <Separator className="my-6" />

            {/* 4. Consequences of Non-Compliance */}
            <section className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-4">4. Consequences of Non-Compliance</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>For Clients:</strong> Unsafe installations, shock, fire, damage.</p>
                <p><strong>For Electricians:</strong> Prosecution, loss of employment, damaged reputation.</p>
                <p><strong>For Employers:</strong> Liability for injury/death of workers or members of the public.</p>
              </div>
            </section>

            <InlineCheck
              id="consequences-check"
              question="What are potential consequences for electricians who fail to comply with regulations?"
              options={["Only verbal warnings", "Prosecution, loss of employment, damaged reputation", "Small fines only", "No consequences"]}
              correctIndex={1}
              explanation="Non-compliance can lead to serious consequences including prosecution, loss of employment, and permanent damage to professional reputation."
            />
            <Separator className="my-6" />
          </CardContent>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 bg-card border-amber-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-amber-500 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Real-World Example
            </h2>
            <p className="text-sm text-muted-foreground">
              In 2010, a landlord was fined £20,000 after a tenant was seriously injured due to faulty wiring. The landlord failed to arrange proper inspection and testing, breaching EAWR and BS 7671. This case highlights the legal responsibility to ensure installations are regularly tested and certified.
            </p>
          </CardContent>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 bg-card border-elec-yellow/20">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Practical Guidance</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Always test and document results, even on small jobs</li>
              <li>• Keep up to date with Amendments to BS 7671 (currently 18th Edition with Amendment 2)</li>
              <li>• Use only calibrated, approved test equipment</li>
              <li>• Never sign certificates unless you have carried out or supervised the testing</li>
              <li>• Remember: safety certificates are legal documents</li>
            </ul>
          </CardContent>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 bg-card border-green-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-green-500 mb-4">Pocket Guide</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• <strong>EAWR 1989</strong> = Legal requirement for safe systems</li>
                <li>• <strong>BS 7671</strong> = Technical standard for compliance</li>
                <li>• <strong>Initial verification</strong> = Must be carried out before energising new systems</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Periodic inspection</strong> = Required for ongoing safety</li>
                <li>• <strong>Non-compliance</strong> = Prosecution, fines, imprisonment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card className="mb-8 bg-card border-purple-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Recap</h2>
            <p className="text-sm text-muted-foreground">
              Inspection and testing are not just about professionalism – they are law and regulation. EAWR 1989 sets the legal duty, while BS 7671 provides the framework for compliance. Every electrician is personally responsible for ensuring systems are safe, tested, and properly certified.
            </p>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Quiz (10 Questions)</h2>
            <div className="space-y-6 text-sm">
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">1. What year were the Electricity at Work Regulations introduced?</p>
                <p className="text-muted-foreground">Answer: 1989.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">2. What do Regulations 4(1) & 4(2) of EAWR require?</p>
                <p className="text-muted-foreground">Answer: That systems must be safe and maintained in a safe condition.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">3. Which standard sets out the technical requirements for inspection and testing?</p>
                <p className="text-muted-foreground">Answer: BS 7671 Wiring Regulations.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">4. True or False: It is acceptable to sign an installation certificate without testing if you trust the installer.</p>
                <p className="text-muted-foreground">Answer: False.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">5. What are two key types of inspection required under BS 7671?</p>
                <p className="text-muted-foreground">Answer: Initial verification and periodic inspection.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">6. What must all test instruments be?</p>
                <p className="text-muted-foreground">Answer: Calibrated and approved.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">7. Give one legal consequence of failing to comply with EAWR 1989.</p>
                <p className="text-muted-foreground">Answer: Prosecution, fines, or imprisonment.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">8. Who is legally responsible for safety once they sign the Electrical Installation Certificate?</p>
                <p className="text-muted-foreground">Answer: The person who signs the certificate.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">9. What could happen to an employer if an employee is injured due to unsafe electrics?</p>
                <p className="text-muted-foreground">Answer: The employer can be prosecuted and held liable.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-medium text-foreground mb-1">10. Why is BS 7671 updated periodically?</p>
                <p className="text-muted-foreground">Answer: To keep regulations up to date with technology and safety requirements.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MOETModule6Section1_2;