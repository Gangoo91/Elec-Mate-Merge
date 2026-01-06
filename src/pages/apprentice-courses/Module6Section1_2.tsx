import { ArrowLeft, Scale, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_2 = () => {
  useSEO(
    "Legal and Safety Reasons for Electrical Inspection and Testing | Level 2 Electrical",
    "Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What year were the Electricity at Work Regulations introduced?",
      options: ["1987", "1989", "1991", "1995"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations were introduced in 1989 and remain the primary legal framework for electrical safety."
    },
    {
      id: 2,
      question: "What do Regulations 4(1) & 4(2) of EAWR require?",
      options: [
        "That systems must be cost-effective",
        "That systems must be safe and maintained in a safe condition",
        "That systems must be energy efficient",
        "That systems must be inspected annually"
      ],
      correctAnswer: 1,
      explanation: "Regulations 4(1) & 4(2) require that electrical systems must be constructed to be safe and maintained in a safe condition."
    },
    {
      id: 3,
      question: "Which standard sets out the technical requirements for inspection and testing?",
      options: ["EAWR 1989", "BS 7671 Wiring Regulations", "Building Regulations Part P", "IET Code of Practice"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations provides the detailed technical requirements for inspection and testing procedures."
    },
    {
      id: 4,
      question: "True or False: It is acceptable to sign an installation certificate without testing if you trust the installer.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – You must never sign a certificate without personally carrying out or supervising the testing. Trust is not a substitute for verification."
    },
    {
      id: 5,
      question: "What are the two key types of inspection required under BS 7671?",
      options: [
        "Visual and instrumental",
        "Initial verification and periodic inspection",
        "Internal and external",
        "Basic and advanced"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires initial verification for new installations and periodic inspection for existing installations."
    },
    {
      id: 6,
      question: "What must all test instruments be?",
      options: ["Expensive and new", "Calibrated and approved", "Digital only", "Imported from Germany"],
      correctAnswer: 1,
      explanation: "All test instruments must be properly calibrated and approved to ensure accurate and reliable test results."
    },
    {
      id: 7,
      question: "Give one legal consequence of failing to comply with EAWR 1989.",
      options: [
        "Verbal warning only",
        "Prosecution, fines, or imprisonment",
        "Loss of tools",
        "Temporary suspension"
      ],
      correctAnswer: 1,
      explanation: "Failing to comply with EAWR 1989 can result in prosecution, substantial fines, or even imprisonment in serious cases."
    },
    {
      id: 8,
      question: "Who is legally responsible for safety once they sign the Electrical Installation Certificate?",
      options: [
        "The employer only",
        "The person who signs the certificate",
        "The client",
        "The supply company"
      ],
      correctAnswer: 1,
      explanation: "The person who signs the Electrical Installation Certificate takes full legal responsibility for the safety of that installation."
    },
    {
      id: 9,
      question: "What could happen to an employer if an employee is injured due to unsafe electrics?",
      options: [
        "Nothing if it was an accident",
        "The employer can be prosecuted and held liable",
        "Only the injured person is responsible",
        "Insurance covers everything"
      ],
      correctAnswer: 1,
      explanation: "Employers can face prosecution and be held legally and financially liable for injuries caused by unsafe electrical installations."
    },
    {
      id: 10,
      question: "Why is BS 7671 updated periodically?",
      options: [
        "To increase costs",
        "To keep regulations up to date with technology and safety requirements",
        "To confuse electricians",
        "For commercial reasons"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is regularly updated to incorporate new technologies, improved safety knowledge, and lessons learned from incidents."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.1.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Legal and Safety Reasons for Electrical Inspection and Testing
          </h1>
          <p className="text-white">
            Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>EAWR 1989 creates absolute legal duty to prevent electrical danger.</li>
                <li>BS 7671 sets technical standards – initial verification and periodic inspection mandatory.</li>
                <li>Personal responsibility: whoever signs certificates accepts full legal liability.</li>
                <li>Non-compliance consequences: prosecution, fines, imprisonment, professional disgrace.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> EAWR references, BS 7671 amendment dates, calibration labels, certificate signatures.</li>
                <li><strong>Use:</strong> Check legal duties before work; verify competence and authority; use calibrated instruments; document everything.</li>
                <li><strong>Check:</strong> Never sign what you haven't tested; maintain professional insurance; stay updated on regulations.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white">
            Electrical inspection and testing operates within a robust legal framework designed to protect lives and property. The Electricity at Work Regulations (EAWR 1989) creates the legal obligation, while BS 7671 provides the technical framework for compliance. Understanding these legal requirements is essential for every electrical worker, as non-compliance can result in serious personal and professional consequences.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify the specific legal requirements for inspection and testing under EAWR 1989 and their enforcement.</li>
            <li>Explain how BS 7671 principles guide safe design, installation, and testing practices in electrical work.</li>
            <li>Understand the serious personal, professional, and criminal consequences of failing to comply with regulations.</li>
            <li>Recognise your personal legal responsibility as an installer and the limits of delegation.</li>
            <li>Appreciate the relationship between legal compliance, professional insurance, and career protection.</li>
            <li>Distinguish between criminal liability (EAWR) and civil liability (negligence claims) in electrical work.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. The Electricity at Work Regulations (EAWR 1989) */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. The Electricity at Work Regulations (EAWR 1989)</h3>
            <p className="text-base text-white mb-4">
              The EAWR 1989 creates the legal foundation for electrical safety in the UK. Unlike guidance documents, these are statutory regulations with the full force of criminal law behind them. They place absolute duties on both employers and employees to prevent electrical danger.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Legal Framework and Enforcement Powers</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Key Regulations and Duties:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Regulation 4(1):</strong> All electrical systems must be constructed, maintained, and used in a manner that prevents danger so far as is reasonably practicable</li>
                          <li><strong>Regulation 4(2):</strong> Systems must be maintained in a safe condition at all times, requiring ongoing verification of safety</li>
                          <li><strong>Regulation 14:</strong> No person shall work on or near live conductors except in specific circumstances with adequate precautions</li>
                          <li><strong>Absolute duty:</strong> Employers cannot delegate their legal responsibility – they remain liable for ensuring compliance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Enforcement and Penalties:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>HSE Powers:</strong> Health and Safety Executive can prosecute individuals and companies</li>
                          <li><strong>Criminal Sanctions:</strong> Unlimited fines and up to 2 years imprisonment for serious breaches</li>
                          <li><strong>Corporate Manslaughter:</strong> Directors can face personal prosecution under the Corporate Manslaughter Act</li>
                          <li><strong>Improvement/Prohibition Notices:</strong> HSE can stop work immediately if danger exists</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                        <p className="font-medium text-yellow-700 text-elec-yellow mb-2">Critical Legal Point</p>
                        <p className="text-xs sm:text-sm text-white">
                          EAWR 1989 creates "absolute duties" – this means you cannot use cost, time pressure, or difficulty as excuses for non-compliance. If electrical danger exists, the law has been broken regardless of circumstances.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="eawr-duties-check"
            question="What type of duty does EAWR 1989 place on employers regarding electrical safety?"
            options={["Advisory duty only", "Absolute duty that cannot be delegated", "Shared responsibility with employees", "Optional best practice"]}
            correctIndex={1}
            explanation="EAWR 1989 places an absolute duty on employers to prevent electrical danger - this legal responsibility cannot be delegated to others."
          />
          <Separator className="my-6" />

          {/* 2. BS 7671 Wiring Regulations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. BS 7671 Wiring Regulations - The Technical Framework</h3>
            <p className="text-base text-white mb-4">
              While EAWR 1989 sets the legal requirement for safety, BS 7671 provides the detailed technical methods for achieving compliance. Courts recognise BS 7671 as the definitive standard for electrical installation safety in the UK.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">BS 7671 Compliance Framework</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Mandatory Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Initial verification (Part 6):</strong> Mandatory testing before any new installation is energised</li>
                          <li><strong>Periodic inspection and testing:</strong> Regular verification that existing installations remain safe</li>
                          <li><strong>Test procedures:</strong> Specific sequences for continuity, insulation resistance, polarity, earth fault loop impedance</li>
                          <li><strong>Acceptance criteria:</strong> Clear pass/fail values for all electrical parameters</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Documentation and Certification:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Required Certificates:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>EIC:</strong> Electrical Installation Certificate (new work)</li>
                                <li><strong>EICR:</strong> Electrical Installation Condition Report (periodic)</li>
                                <li><strong>MWC:</strong> Minor Works Certificate (alterations/additions)</li>
                                <li><strong>Schedule of Items:</strong> Detailed test results and observations</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Amendment Updates:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>Current:</strong> 18th Edition Amendment 2 (2022)</li>
                                <li><strong>Key changes:</strong> AFDD requirements, EV charging provisions</li>
                                <li><strong>Compliance:</strong> Must use current amendment for new work</li>
                                <li><strong>Transition:</strong> Existing installations assessed against installation date</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 text-elec-yellow mb-2">Legal Status of BS 7671</p>
                        <p className="text-xs sm:text-sm text-white">
                          While BS 7671 is not directly law, courts accept it as the standard for safe electrical installation. Deviation from BS 7671 without equivalent safety measures can be used as evidence of EAWR non-compliance in legal proceedings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bs7671-framework-check"
            question="What is the current edition of BS 7671 and why is it important to stay updated?"
            options={["17th Edition - updates aren't important", "18th Edition - updates reflect new safety knowledge and technology", "16th Edition - still current", "Updates are optional guidance"]}
            correctIndex={1}
            explanation="The current standard is BS 7671 18th Edition (with Amendment 2). Updates are crucial as they incorporate new safety knowledge, technology advances, and lessons from electrical incidents."
          />
          <Separator className="my-6" />

          {/* 3. Personal Legal Responsibility */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Personal Legal Responsibility and Professional Accountability</h3>
            <p className="text-base text-white mb-4">
              When you sign an electrical certificate, you're not just completing paperwork – you're making a legal declaration that could result in criminal prosecution if proved false or negligent. Understanding this responsibility is crucial for career protection.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Personal Liability and Professional Consequences</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Certificate Signature Responsibilities:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Legal declaration:</strong> Signing creates personal legal liability for accuracy of all test results</li>
                          <li><strong>Competence requirement:</strong> Must be competent to carry out the work being certified</li>
                          <li><strong>Supervision limitations:</strong> Remain liable even when supervising others' work</li>
                          <li><strong>No delegation:</strong> Cannot delegate the legal responsibility that comes with signature</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Professional and Insurance Implications:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1">Professional Registration</p>
                            <ul className="text-xs text-white list-disc ml-4 space-y-1">
                              <li><strong>Scheme membership:</strong> NICEIC, NAPIT, ELECSA can remove members</li>
                              <li><strong>Self-certification rights:</strong> Lost if removed from scheme</li>
                              <li><strong>Annual assessments:</strong> Work quality and compliance checked</li>
                              <li><strong>Complaints procedure:</strong> Poor work can trigger investigation</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1">Insurance and Liability</p>
                            <ul className="text-xs text-white list-disc ml-4 space-y-1">
                              <li><strong>Professional indemnity:</strong> May be void if working outside competence</li>
                              <li><strong>Public liability:</strong> Required for injury claims from electrical faults</li>
                              <li><strong>Fraudulent work:</strong> Insurance doesn't cover deliberate misconduct</li>
                              <li><strong>Civil claims:</strong> Can run to millions for serious electrical incidents</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2">Criminal Liability Warning</p>
                        <p className="text-xs sm:text-sm text-white">
                          Fraudulent certification or gross negligence can result in prosecution under fraud laws or manslaughter charges if someone dies. Prison sentences are real – in 2019, a landlord received 12 months imprisonment after a tenant died in an electrical fire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="personal-responsibility-check"
            question="If you supervise an apprentice doing testing but sign the certificate, who is legally responsible for any errors?"
            options={["The apprentice who did the work", "You as the person signing the certificate", "Both equally", "The employer only"]}
            correctIndex={1}
            explanation="You remain fully legally responsible for all work covered by your signature, regardless of who physically performed the testing."
          />
          <Separator className="my-6" />

          {/* 4. Real-World Consequences */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Real-World Consequences and Case Studies</h3>
            <p className="text-base text-white mb-4">
              The consequences of cutting corners on inspection and testing extend far beyond paperwork issues. Real people suffer real harm, and the legal system responds with serious penalties for those responsible.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Legal Precedents and Industry Impact</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Criminal and Civil Consequences:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Criminal prosecution:</strong> HSE prosecutions carry unlimited fines and up to 2 years imprisonment</li>
                          <li><strong>Corporate manslaughter:</strong> Company directors face prosecution if poor electrical safety contributes to deaths</li>
                          <li><strong>Civil liability:</strong> Injury claims can bankrupt individuals and companies</li>
                          <li><strong>Professional disgrace:</strong> Public court cases destroy careers and reputations permanently</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Recent Case Examples:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-white mb-1">R v Tangerine Confectionery (2014)</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>Incident:</strong> Maintenance electrician killed by 415V shock</li>
                                <li><strong>Failures:</strong> No electrical safety policy, untested equipment, missing labels</li>
                                <li><strong>Penalty:</strong> Company fined £750,000, manager received suspended sentence</li>
                                <li><strong>Impact:</strong> Family destroyed, industry reputation damaged</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-1">Landlord Manslaughter Case (2019)</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>Incident:</strong> Tenant died in electrical fire</li>
                                <li><strong>Cause:</strong> No proper inspection or testing of installation</li>
                                <li><strong>Penalty:</strong> 12-month prison sentence for gross negligence manslaughter</li>
                                <li><strong>Lesson:</strong> Ignorance of electrical safety law is no defence</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 text-elec-yellow mb-2">Industry-Wide Impact</p>
                        <p className="text-xs sm:text-sm text-white">
                          Every incident of poor electrical work damages the reputation of the entire electrical industry and leads to increased regulation and scrutiny. Your professional conduct affects not just your own career, but the standing of all electrical workers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-impact-check"
            question="What is the maximum penalty under EAWR 1989 for serious electrical safety breaches?"
            options={["£5,000 fine", "£50,000 fine and 6 months prison", "Unlimited fine and 2 years imprisonment", "Professional registration loss only"]}
            correctIndex={2}
            explanation="EAWR 1989 breaches can result in unlimited fines and up to 2 years imprisonment, reflecting the serious nature of electrical safety failures."
          />
          <Separator className="my-6" />
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 border border-amber-400/30">
          <h2 className="text-lg sm:text-xl font-semibold text-amber-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Real-World Case Study: The Legal Reality
          </h2>
          <div className="text-base text-white space-y-4">
            <p>
              <strong>R v Tangerine Confectionery and Mr David Costley-Wood (2014):</strong> A maintenance electrician was killed when he touched live 415V conductors in a distribution board. The investigation revealed systematic failures in electrical safety management.
            </p>
            <div className="rounded-lg p-4 bg-[#121212]/50 border border-white/10">
              <p className="font-medium mb-2">The failures that led to conviction:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>No electrical safety policy or risk assessments</li>
                <li>Equipment not properly inspected or tested</li>
                <li>Staff not trained in electrical safety procedures</li>
                <li>Warning labels missing from distribution boards</li>
                <li>No system for ensuring EAWR compliance</li>
              </ul>
            </div>
            <p>
              <strong>Consequences:</strong> The company was fined £750,000, and the maintenance manager received a 6-month suspended prison sentence. The victim's family received substantial compensation, but no amount of money could repair the devastation to his wife and children.
            </p>
            <p className="text-sm text-white">
              <strong>Lesson:</strong> This case demonstrates that electrical safety isn't just about individual competence – it requires systematic compliance with legal duties at every level.
            </p>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Practical Guidance for Legal Compliance
          </h2>
          <div className="text-base text-white space-y-4">
            <div className="rounded-lg p-4 bg-[#121212]/50 border border-white/10">
              <p className="font-medium mb-3">Before starting any electrical work:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Verify your competence for the specific work type and complexity</li>
                <li>Ensure you have appropriate test equipment that is calibrated and within date</li>
                <li>Check that you have authority to sign certificates for the work location</li>
                <li>Confirm professional indemnity insurance is valid and adequate</li>
                <li>Review the latest amendments to BS 7671 and any relevant guidance notes</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-[#121212]/50 border border-white/10">
              <p className="font-medium mb-3">During testing and certification:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Never sign certificates for work you haven't personally tested or directly supervised</li>
                <li>Record actual measured values, not estimated or typical values</li>
                <li>Document any deviations from BS 7671 with clear justifications</li>
                <li>Take photographs of key installation details for your records</li>
                <li>Ensure all test results are within acceptable limits before signing</li>
              </ul>
            </div>
            <p className="text-sm text-white">
              <strong>Career protection tip:</strong> Keep detailed records of all work, including who was present during testing, equipment used, and any unusual circumstances. These records can be invaluable if questions arise years later.
            </p>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Pocket Guide Summary</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div>
              <p className="font-medium mb-3">Legal Framework:</p>
              <ul className="space-y-2 text-sm">
                <li><strong>EAWR 1989:</strong> Criminal law – absolute duty to prevent danger</li>
                <li><strong>BS 7671:</strong> Technical standard – defines compliance methods</li>
                <li><strong>Regulation 4:</strong> Systems must be constructed and maintained safely</li>
                <li><strong>Enforcement:</strong> HSE prosecution powers – unlimited fines/prison</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-3">Personal Protection:</p>
              <ul className="space-y-2 text-sm">
                <li><strong>Competence:</strong> Only work within your proven abilities</li>
                <li><strong>Equipment:</strong> Use calibrated, approved instruments only</li>
                <li><strong>Certificates:</strong> Only sign what you've personally verified</li>
                <li><strong>Records:</strong> Document everything for legal protection</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4">Key Takeaways</h2>
          <div className="text-base text-white space-y-3">
            <p>
              Electrical inspection and testing exist within a robust legal framework that protects lives and property. EAWR 1989 creates the legal duty, BS 7671 provides the technical methods, and personal responsibility ensures accountability.
            </p>
            <div className="rounded-lg p-4 bg-[#121212]/50 border border-white/10">
              <p className="font-medium mb-2">Remember the hierarchy:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Criminal law (EAWR):</strong> Creates absolute duties and penalties</li>
                <li><strong>Technical standards (BS 7671):</strong> Defines compliance methods</li>
                <li><strong>Professional responsibility:</strong> Ensures personal accountability</li>
                <li><strong>Industry reputation:</strong> Maintains public trust in electrical work</li>
              </ul>
            </div>
            <p className="text-sm text-white">
              Every time you test an installation and sign a certificate, you're not just completing a job – you're participating in a system designed to prevent electrical deaths and injuries. This legal framework exists because electricity can kill, and society demands that those who work with it accept serious responsibilities.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Legal and Safety Requirements Quiz" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Why Inspect and Test?
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Return to Section 6.1
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section1_2;