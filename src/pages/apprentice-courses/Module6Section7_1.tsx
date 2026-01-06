import { ArrowLeft, Target, CheckCircle, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_1 = () => {
  useSEO(
    "Why Certification Is Required (BS 7671 Compliance) - Level 2 Module 6 Section 7.1",
    "Understanding the legal requirement for electrical certification under BS 7671 and EAWR 1989"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of electrical certification?",
      options: ["To charge more money", "To prove safety and compliance with regulations", "To create paperwork", "To satisfy customers"],
      correctAnswer: 1,
      explanation: "Certification provides legal evidence that installations meet safety standards and comply with BS 7671 and EAWR 1989."
    },
    {
      id: 2,
      question: "Which UK regulation requires all electrical systems to be safe?",
      options: ["Health and Safety at Work Act", "Electricity at Work Regulations 1989", "Building Regulations", "Wiring Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 (EAWR) make it a legal duty to ensure electrical systems are constructed and maintained safely."
    },
    {
      id: 3,
      question: "Which standard sets out the certification requirements for electrical work?",
      options: ["BS 7671", "BS 5839", "BS 6423", "BS 1363"],
      correctAnswer: 0,
      explanation: "BS 7671 (The Wiring Regulations) sets out the technical requirements for electrical installations, including mandatory testing and certification."
    },
    {
      id: 4,
      question: "Why is certification important for insurers and building control?",
      options: ["It looks professional", "It provides evidence of compliance and due diligence", "It's required by law", "It helps with marketing"],
      correctAnswer: 1,
      explanation: "Certification provides insurers and building control with evidence that proper testing was conducted and safety standards were met."
    },
    {
      id: 5,
      question: "What key details are included on a certificate?",
      options: ["Only test results", "Installation details, test results, and competent person signatures", "Just the electrician's name", "Equipment serial numbers only"],
      correctAnswer: 1,
      explanation: "Certificates include installation details, test results, and signatures of competent persons to ensure accountability and traceability."
    },
    {
      id: 6,
      question: "True or False: Certification is optional for small alterations.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. All electrical work including alterations and additions must be certified, though minor works may use different certificate types."
    },
    {
      id: 7,
      question: "Why must a certificate include the signature of a competent person?",
      options: ["For legal requirement", "To provide accountability and traceability", "To look official", "For insurance purposes"],
      correctAnswer: 1,
      explanation: "Signatures establish accountability and ensure responsibility is clear and traceable for the work carried out."
    },
    {
      id: 8,
      question: "What are the legal consequences of failing to issue a certificate?",
      options: ["Minor paperwork issues", "Prosecution, fines, insurance denial, and personal liability", "Customer complaints", "Nothing serious"],
      correctAnswer: 1,
      explanation: "Failing to certify can result in prosecution, fines, imprisonment, insurance denial, and personal liability for damages."
    },
    {
      id: 9,
      question: "What must be completed before a new installation can be energised?",
      options: ["Payment from client", "Building control approval", "Certification", "Material delivery"],
      correctAnswer: 2,
      explanation: "Certification must be complete before energising any new installation to ensure it meets safety standards."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake left the contractor personally liable for damages?",
      options: ["Using wrong cables", "Failing to issue an Electrical Installation Certificate", "Poor workmanship", "Late completion"],
      correctAnswer: 1,
      explanation: "The contractor failed to issue an EIC, leaving no documentation to prove compliance, resulting in personal liability for fire damages."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.7.1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Why Certification Is Required (BS 7671 Compliance)
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding the legal requirement for electrical certification
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Certification is a legal requirement under EAWR 1989</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>BS 7671 sets certification standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Protects electricians, clients, and insurers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Non-compliance has serious consequences</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Uncertified electrical work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Correct certificate for each job type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> All certificates are complete and signed</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Electrical certification is not optional paperwork — it is a legal requirement. Every new installation, alteration, or addition must be verified, tested, and formally recorded to prove compliance with BS 7671 and the Electricity at Work Regulations 1989 (EAWR). Certification protects users, clients, and electricians by providing evidence that the work was carried out to the required standard. This subsection introduces learners to the reasons certification exists and why it is fundamental to professional electrical practice.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain why certification is required in electrical work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify the regulations and standards that make certification mandatory</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand how certification demonstrates compliance with BS 7671</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the consequences of failing to certify electrical work</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. The Purpose of Certification */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">The Purpose of Certification</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Certification exists to prove that an installation is safe, compliant, and fit for use. It confirms that testing has been carried out and that results meet the requirements of BS 7671. Certificates also provide a record for clients, insurers, and building control authorities. Without certification, there is no proof that the installation has been tested or meets legal requirements.
                      </p>
                      
                      <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <h4 className="font-medium text-blue-800 text-elec-yellow mb-2">Key Functions of Certification:</h4>
                        <ul className="text-sm text-blue-700 text-elec-yellow space-y-1">
                          <li>• <strong>Legal Evidence:</strong> Proves compliance with statutory requirements</li>
                          <li>• <strong>Safety Assurance:</strong> Confirms the installation is safe to energise and use</li>
                          <li>• <strong>Quality Record:</strong> Documents that proper procedures were followed</li>
                          <li>• <strong>Future Reference:</strong> Provides baseline data for maintenance and troubleshooting</li>
                          <li>• <strong>Insurance Validation:</strong> Supports insurance claims and coverage</li>
                          <li>• <strong>Building Control Approval:</strong> Satisfies local authority requirements</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The certification process creates a formal audit trail that follows the installation throughout its life. This documentation becomes particularly valuable when modifications are needed, faults develop, or when the property changes ownership. It also serves as evidence of due diligence if accidents occur, protecting both the electrician and the client from legal liability.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        From a professional perspective, thorough certification demonstrates competence and attention to detail. It builds client confidence and establishes credibility with other professionals in the construction industry. Conversely, poor or missing certification can damage reputation and lead to loss of business opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="purpose-check"
            question="What is the main purpose of electrical certification?"
            options={["To create paperwork", "To prove that an installation is safe, compliant, and fit for use", "To charge more money", "To satisfy building control"]}
            correctIndex={1}
            explanation="Certification exists to prove that an installation is safe, compliant, and fit for use, providing evidence that testing has been carried out and meets BS 7671 requirements."
          />

          {/* 2. Legal and Regulatory Framework */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Legal and Regulatory Framework</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        BS 7671 sets out the technical requirements for electrical installations, including mandatory testing and certification. The Electricity at Work Regulations 1989 (EAWR) go further, making it a legal duty to ensure electrical systems are constructed and maintained safely. Certification is the formal evidence that these duties have been met. This means that certification is not just good practice — it is a legal obligation.
                      </p>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Key Regulations and Standards:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-green-700 dark:text-green-400">
                          <div>
                            <strong>BS 7671 (18th Edition):</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Technical requirements for installations</li>
                              <li>• Testing procedures and acceptance criteria</li>
                              <li>• Certification formats and requirements</li>
                              <li>• Regular updates reflecting technology changes</li>
                            </ul>
                          </div>
                          <div>
                            <strong>EAWR 1989:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Legal duty of care for electrical safety</li>
                              <li>• Requirements for competent persons</li>
                              <li>• Penalties for non-compliance</li>
                              <li>• Risk assessment obligations</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The relationship between BS 7671 and EAWR is crucial to understand. While BS 7671 is a British Standard (not law), compliance with it is widely accepted as demonstrating compliance with the legal requirements of EAWR. This means that following BS 7671 provides a recognised defence against prosecution under EAWR.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Under EAWR Regulation 4, every electrical system must be constructed, maintained, and operated so as to prevent danger. Regulation 14 requires that no person shall be engaged in electrical work unless they possess sufficient technical knowledge or experience. These regulations create a legal framework that makes proper certification not optional, but mandatory.
                      </p>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Legal Consequences of Non-Compliance:</h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• Prosecution under EAWR with unlimited fines</li>
                          <li>• Personal imprisonment for up to 6 months</li>
                          <li>• Civil liability for damages and injuries</li>
                          <li>• Professional disqualification and loss of competent person status</li>
                          <li>• Insurance coverage invalidation</li>
                          <li>• Building control rejection and enforcement action</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-framework-check"
            question="Which UK regulation makes it a legal duty to ensure electrical systems are safe?"
            options={["BS 7671", "Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety at Work Act"]}
            correctIndex={2}
            explanation="The Electricity at Work Regulations 1989 (EAWR) make it a legal duty to ensure electrical systems are constructed and maintained safely."
          />

          {/* 3. Proving Compliance and Accountability */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3 text-base">Proving Compliance and Accountability</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Certificates provide accountability by showing who carried out or supervised the work and when it was tested. They include details of the installation, the test results, and the signatures of competent persons. This ensures that responsibility is clear and traceable. In the event of a fault or incident, the certificate is a vital piece of evidence that can protect both the electrician and the client.
                      </p>

                      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                        <h4 className="font-medium text-orange-800 text-elec-yellow mb-2">Accountability Elements in Certification:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-orange-700 text-elec-yellow">
                          <div>
                            <strong>Designer Accountability:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Circuit design and protection coordination</li>
                              <li>• Load calculations and cable sizing</li>
                              <li>• Earthing and bonding arrangements</li>
                              <li>• Special location requirements</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Installer Accountability:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Workmanship quality and materials used</li>
                              <li>• Compliance with design specifications</li>
                              <li>• Safe working practices followed</li>
                              <li>• Installation completion standards</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The signature of a competent person on a certificate carries significant legal weight. It represents a professional declaration that the work has been carried out to the required standards and that the signer takes responsibility for the quality and safety of the installation. This creates a clear chain of accountability that can be crucial in legal proceedings.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Detailed test results recorded on certificates provide objective evidence of installation condition at the time of completion. These measurements become baseline data for future comparisons and can help identify degradation over time. They also demonstrate that proper test procedures were followed using calibrated instruments.
                      </p>

                      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <h4 className="font-medium text-purple-800 text-elec-yellow mb-2">Certificate as Legal Evidence:</h4>
                        <ul className="text-sm text-purple-700 text-elec-yellow space-y-1">
                          <li>• Admissible in court proceedings as evidence of compliance</li>
                          <li>• Demonstrates due diligence in safety matters</li>
                          <li>• Shows professional competence and proper procedures</li>
                          <li>• Provides defence against negligence claims</li>
                          <li>• Supports insurance coverage and claims</li>
                          <li>• Satisfies regulatory authority requirements</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The traceability provided by proper certification extends beyond the original installation. Future electricians working on the system can identify original design intent, understand protection arrangements, and access baseline test data. This continuity of information is essential for safe maintenance and modification work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="accountability-check"
            question="Why is the signature of a competent person an essential part of certification?"
            options={["To make it look official", "To provide accountability and traceability", "For legal requirement only", "To satisfy insurers"]}
            correctIndex={1}
            explanation="Signatures ensure that responsibility is clear and traceable, providing accountability by showing who carried out or supervised the work."
          />

          {/* 4. Consequences of Non-Certification */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Consequences of Non-Certification</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Failing to provide certification has serious consequences. Work may be deemed non-compliant and illegal. Clients may refuse payment, insurers may deny cover, and building control may reject the installation. In the event of an accident, the electrician could face prosecution, fines, or even imprisonment if no certification exists to prove compliance.
                      </p>

                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-medium text-red-800 text-elec-yellow mb-2">Immediate Consequences:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-red-700 text-elec-yellow">
                          <div>
                            <strong>Financial Impact:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Client refusal to pay final invoice</li>
                              <li>• Contract termination and damages</li>
                              <li>• Cost of remedial work and re-testing</li>
                              <li>• Loss of future business opportunities</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Professional Impact:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Damage to professional reputation</li>
                              <li>• Loss of competent person status</li>
                              <li>• Exclusion from certification schemes</li>
                              <li>• Difficulty obtaining professional insurance</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The legal consequences can be severe and long-lasting. Under the Electricity at Work Regulations 1989, failure to ensure electrical safety can result in prosecution with unlimited fines and potential imprisonment. These are criminal sanctions that can have lifetime impacts on career prospects and professional standing.
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                        <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-2">Long-term Consequences:</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                          <li>• <strong>Criminal Record:</strong> Convictions under EAWR remain on record permanently</li>
                          <li>• <strong>Civil Liability:</strong> Personal responsibility for damages, injuries, and deaths</li>
                          <li>• <strong>Professional Exclusion:</strong> Inability to obtain competent person status with approved schemes</li>
                          <li>• <strong>Insurance Issues:</strong> Difficulty obtaining professional indemnity and public liability cover</li>
                          <li>• <strong>Career Limitation:</strong> Restricted opportunities for advancement and business development</li>
                          <li>• <strong>Regulatory Action:</strong> Potential intervention by HSE and local authorities</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        From an insurance perspective, failure to provide proper certification can void coverage entirely. Insurance companies require evidence of professional competence and compliance with industry standards. Without certification, claims may be denied even for unrelated incidents, leaving both electrician and client exposed to significant financial liability.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Building control authorities have the power to require remedial work and can issue enforcement notices for non-compliant installations. This can lead to costly delays, additional inspections, and potential legal action. In extreme cases, buildings may be deemed unsafe for occupation until compliance is demonstrated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question="What could happen to an electrician who energises a new installation without certification?"
            options={["Nothing serious", "Minor paperwork issues", "Prosecution, fines, or imprisonment, plus liability for damages", "Client complaints only"]}
            correctIndex={2}
            explanation="Without certification, electricians face prosecution, fines, or imprisonment, plus personal liability for any damages as there's no proof of compliance."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Practical Guidance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Use Correct Certificate Type</h3>
                <p className="text-sm text-white">Always use the correct certificate type (EIC, MWC, or EICR) for the work carried out.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Complete All Sections</h3>
                <p className="text-sm text-white">Make sure all sections of the certificate are completed clearly and accurately.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">No Energising Without Certification</h3>
                <p className="text-sm text-white">Never energise a new installation until certification is complete.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Part of the Installation</h3>
                <p className="text-sm text-white">Treat certification as part of the installation, not an optional extra.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-800 text-elec-yellow mb-2">Certification Failure Leads to Personal Liability</h3>
            <p className="text-sm text-red-700 text-elec-yellow mb-3">
              A small electrical contractor completed a new shop fit-out but failed to issue an Electrical Installation Certificate. Months later, a fire broke out in the premises. During the investigation, the contractor had no documentation to prove that the installation complied with BS 7671. The insurance company refused the claim, and the contractor was held personally liable for damages running into tens of thousands of pounds.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Lesson</h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Certification protects electricians legally and financially as much as it protects the client.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">Q: Is certification required for all electrical work?</h3>
              <p className="text-sm text-white">A: Yes. All new installations, alterations, and additions must be certified.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">Q: Does BS 7671 itself have the force of law?</h3>
              <p className="text-sm text-white">A: BS 7671 is not law, but compliance with it is widely recognised as the standard for meeting legal duties under EAWR 1989.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: Who can sign a certificate?</h3>
              <p className="text-sm text-white">A: Only a competent person who carried out or supervised the work and testing.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white">
            Certification is a legal requirement under BS 7671 and EAWR 1989. It proves that installations have been tested, meet safety standards, and are compliant. Certificates provide accountability by recording test results, installation details, and signatures. Without certification, electricians risk prosecution, unpaid work, invalid insurance, and reputational damage.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Certification Requirements Quiz" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to=".." className="flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: Section 7 Overview</span>
              <span className="sm:hidden">Previous: Overview</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../7-2" className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Next: EIC Awareness</span>
              <span className="sm:hidden">Next: EIC Awareness</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section7_1;