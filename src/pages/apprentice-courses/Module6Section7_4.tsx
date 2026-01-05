import { ArrowLeft, Target, CheckCircle, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_4 = () => {
  useSEO(
    "Who Can Sign Off Work and What Level 2 Can Do Legally - Level 2 Module 6 Section 7.4",
    "Understanding legal responsibilities for signing electrical certificates and Level 2 limitations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Who can legally sign electrical certificates?",
      options: ["Any electrician", "Level 2 electricians", "Competent persons with sufficient training and experience", "Building control officers"],
      correctAnswer: 2,
      explanation: "Only competent persons with sufficient training, technical knowledge, and experience can legally sign electrical certificates."
    },
    {
      id: 2,
      question: "What does 'competent person' mean in BS 7671?",
      options: ["Anyone with basic electrical knowledge", "Someone with sufficient training, technical knowledge, and experience", "Any qualified tradesperson", "A person with insurance"],
      correctAnswer: 1,
      explanation: "In BS 7671, a competent person is someone with sufficient training, technical knowledge, and experience to carry out the work safely."
    },
    {
      id: 3,
      question: "What does a signatory confirm when signing a certificate?",
      options: ["Work completion only", "Compliance with design, construction, inspection, and testing standards", "Payment has been received", "Client satisfaction"],
      correctAnswer: 1,
      explanation: "When signing a certificate, the signatory confirms that the design, construction, inspection, and testing comply with BS 7671 and the installation is safe."
    },
    {
      id: 4,
      question: "What happens if an unqualified person signs a certificate?",
      options: ["Nothing serious", "The certificate is invalid and fraud may have occurred", "A small fine is issued", "The work needs minor corrections"],
      correctAnswer: 1,
      explanation: "If an unqualified person signs a certificate, it's invalid and potentially fraudulent, leading to serious legal and professional consequences."
    },
    {
      id: 5,
      question: "Can Level 2 electricians carry out electrical testing?",
      options: ["Yes, independently", "Yes, but only under supervision", "No, never", "Only simple tests"],
      correctAnswer: 1,
      explanation: "Level 2 electricians can carry out electrical testing, but only under the instruction or supervision of a qualified competent person."
    },
    {
      id: 6,
      question: "Can Level 2 electricians legally sign off a Minor Works Certificate?",
      options: ["Yes, for all minor works", "Yes, but only simple ones", "No, they cannot sign any certificates", "Only if supervised"],
      correctAnswer: 2,
      explanation: "Level 2 electricians cannot legally sign any electrical certificates, including Minor Works Certificates, as they are not yet fully qualified competent persons."
    },
    {
      id: 7,
      question: "Why is supervision important during Level 2 training?",
      options: ["To slow down the work", "Legal safeguard and skill development", "Company policy only", "Insurance requirements"],
      correctAnswer: 1,
      explanation: "Supervision provides legal safeguard (qualified person takes responsibility) while allowing Level 2 learners to gain valuable experience and skills."
    },
    {
      id: 8,
      question: "What are the risks of signing a certificate without being competent?",
      options: ["Minor paperwork errors", "Fraud, disciplinary action, loss of employment, or prosecution", "Delayed project completion", "Client complaints"],
      correctAnswer: 1,
      explanation: "Signing a certificate without being competent is fraudulent and can lead to disciplinary action, loss of employment, or even prosecution."
    },
    {
      id: 9,
      question: "What role should a Level 2 learner play in the certification process?",
      options: ["Sign certificates independently", "Assist with testing and recording under supervision", "Avoid all certification activities", "Only observe"],
      correctAnswer: 1,
      explanation: "Level 2 learners should assist with testing and recording results under supervision, gaining experience while the qualified person takes legal responsibility."
    },
    {
      id: 10,
      question: "In the real-world example, why was the Minor Works Certificate invalid?",
      options: ["Wrong form used", "An apprentice signed it instead of a qualified person", "Incomplete test results", "Missing client signature"],
      correctAnswer: 1,
      explanation: "The certificate was invalid because an apprentice signed it while the supervising qualified electrician was off-site, making the apprentice's signature unauthorised."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 6.7.4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Who Can Sign Off Work and What Level 2 Can Do Legally
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Understanding legal responsibilities for signing electrical certificates and Level 2 limitations
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Only competent persons can sign electrical certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Level 2 electricians cannot legally sign any certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Signing carries legal responsibility for installation safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Supervision required until fully qualified</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Unauthorised signatures on certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Supervised testing and recording for Level 2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Competent person signatures and authorisation</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            One of the most important aspects of certification is understanding who is legally allowed to sign it. Not every electrician — especially at apprentice or Level 2 stage — can take legal responsibility for test results and certification. Signing off electrical work carries serious accountability under BS 7671 and the Electricity at Work Regulations 1989 (EAWR). This subsection explains who can legally sign certificates, what responsibilities come with that signature, and what tasks Level 2 learners can and cannot do at this stage in their career.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain who is legally responsible for signing electrical certificates</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the meaning of "competent person" in BS 7671</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the limits of what a Level 2 electrician can do legally</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Appreciate the importance of supervision and accountability during training</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Who Can Sign Off Electrical Work */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2 sm:mb-3 text-sm sm:text-base">Who Can Sign Off Electrical Work</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Electrical certificates — whether EIC, MWC, or EICR — must be signed by a competent person. In BS 7671, a competent person is defined as someone with sufficient training, technical knowledge, and experience to carry out the work safely. This usually means a fully qualified electrician who holds the appropriate qualifications and is confident in verifying that the installation complies with the regulations. The signature is not just formality — it is a legal declaration of responsibility.
                      </p>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Competent Person Requirements
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-blue-900 dark:text-blue-200 block mb-2">Qualifications Needed:</strong>
                            <ul className="space-y-1 text-blue-800 dark:text-emerald-400">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Recognised electrical qualification (Level 3 minimum)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>BS 7671 18th Edition certification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Inspection and Testing qualifications</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Appropriate registration with scheme provider</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-blue-900 dark:text-blue-200 block mb-2">Experience Requirements:</strong>
                            <ul className="space-y-1 text-blue-800 dark:text-emerald-400">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Practical electrical installation experience</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Understanding of testing procedures</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Knowledge of regulatory requirements</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>Ability to identify defects and non-compliance</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground">
                        The concept of competence extends beyond just having qualifications. A competent person must understand the scope of their abilities and only undertake work they are qualified to perform. They must stay current with regulations, maintain their knowledge through continuing professional development, and recognise when specialist expertise is required.
                      </p>

                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Professional Standards
                        </h4>
                        <ul className="space-y-2 text-amber-800 dark:text-amber-200">
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">✓</span>
                            <span>Must be registered with an approved scheme (NICEIC, NAPIT, etc.)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">✓</span>
                            <span>Carry appropriate insurance and professional indemnity cover</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">✓</span>
                            <span>Maintain certification through regular assessments</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">✓</span>
                            <span>Follow scheme provider codes of practice</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="competent-person-check"
            question="What does the term 'competent person' mean in the context of BS 7671?"
            options={["Anyone with basic electrical knowledge", "Someone with sufficient training, technical knowledge, and experience", "Any qualified tradesperson", "A person with insurance"]}
            correctIndex={1}
            explanation="In BS 7671, a competent person is someone with sufficient training, technical knowledge, and experience to carry out the work safely and verify compliance."
          />

          {/* 2. Responsibilities of Signing a Certificate */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Responsibilities of Signing a Certificate</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        When an electrician signs a certificate, they are confirming that:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground ml-4">
                        <li>The design, construction, inspection, and testing of the installation comply with BS 7671</li>
                        <li>The recorded results are accurate and complete</li>
                        <li>The installation is safe to be energised and used</li>
                      </ul>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Legal Implications of Signing
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Personal Liability:</strong>
                            <p className="text-green-800 dark:text-green-300">The signatory becomes personally liable for the accuracy of the certificate and the safety of the installation.</p>
                          </div>
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Professional Standards:</strong>
                            <p className="text-green-800 dark:text-green-300">Signing confirms adherence to professional codes of practice and industry standards.</p>
                          </div>
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Insurance Coverage:</strong>
                            <p className="text-green-800 dark:text-green-300">Professional indemnity insurance relies on proper certification and competent practice.</p>
                          </div>
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Regulatory Compliance:</strong>
                            <p className="text-green-800 dark:text-green-300">Ensures work meets Building Regulations and Electricity at Work Regulations requirements.</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground">
                        If an incident occurs later (shock, fire, or injury), the signatory can be held legally accountable. This is why only competent persons can take on this role. The certificate becomes evidence in any investigation, and the signatory may be required to justify their decisions and demonstrate their competence.
                      </p>

                      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Potential Consequences of Poor Practice
                        </h4>
                        <ul className="space-y-2 text-red-800 dark:text-red-200">
                          <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">⚠️</span>
                            <span>Criminal prosecution under Health and Safety legislation</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">⚠️</span>
                            <span>Civil liability for damages and injuries</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">⚠️</span>
                            <span>Professional disciplinary action and loss of registration</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">⚠️</span>
                            <span>Insurance claim rejection and personal financial exposure</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="signing-responsibility-check"
            question="What is an electrician legally confirming when signing an electrical certificate?"
            options={["Work completion only", "Compliance with design, construction, inspection, and testing standards", "Payment has been received", "Client satisfaction"]}
            correctIndex={1}
            explanation="When signing a certificate, the electrician legally confirms that the design, construction, inspection, and testing comply with BS 7671 and the installation is safe."
          />

          {/* 3. What Level 2 Electricians Can Do */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3 text-base">What Level 2 Electricians Can Do</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        At Level 2, learners are developing their knowledge and skills but are not yet fully qualified. This means:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-foreground ml-4">
                        <li>They can carry out tests under the instruction or supervision of a qualified person</li>
                        <li>They can record results and help complete documentation</li>
                        <li>They cannot legally sign an EIC, MWC, or EICR — even if they carried out the work or testing</li>
                      </ul>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Level 2 Permitted Activities
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-purple-900 dark:text-purple-200 block mb-2">Testing Activities:</strong>
                            <ul className="space-y-1 text-purple-800 dark:text-emerald-400">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Continuity testing under supervision</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Insulation resistance measurements</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Polarity verification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>RCD testing with guidance</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-purple-900 dark:text-purple-200 block mb-2">Documentation Support:</strong>
                            <ul className="space-y-1 text-purple-800 dark:text-emerald-400">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Recording test results accurately</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Completing observation schedules</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Preparing certificates for supervisor</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">✓</span>
                                <span>Maintaining test equipment records</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground">
                        Level 2 learners must always work under supervision and must not present themselves as competent persons until they are qualified and experienced enough to do so. This supervised approach allows gradual skill development while maintaining safety and compliance standards.
                      </p>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Progression Path for Level 2 Electricians
                        </h4>
                        <div className="space-y-2 text-sm text-blue-800 dark:text-emerald-400">
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">1.</span>
                            <span><strong>Current Stage:</strong> Supervised practice and skill development</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">2.</span>
                            <span><strong>Next Steps:</strong> Complete Level 3 qualifications and gain experience</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">3.</span>
                            <span><strong>Future Goal:</strong> Achieve competent person status with scheme registration</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">⏱️</span>
                            <span><strong>Timeline:</strong> Typically 2-4 years depending on training route and experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="level2-signing-check"
            question="Can a Level 2 electrician legally sign a Minor Works Certificate?"
            options={["Yes, for all minor works", "Yes, but only simple ones", "No, they cannot sign any certificates", "Only if supervised"]}
            correctIndex={2}
            explanation="Level 2 electricians cannot legally sign any electrical certificates, including Minor Works Certificates, as they are not yet fully qualified competent persons."
          />

          {/* 4. Importance of Supervision and Integrity */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3 text-base">Importance of Supervision and Integrity</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Working under supervision is not just a training exercise — it is a legal safeguard. Supervising electricians carry the legal responsibility for the work, while apprentices gain experience. Honesty is vital: Level 2 learners should never sign documents they are not authorised to sign. Doing so is fraudulent and could lead to disciplinary action, loss of employment, or even prosecution.
                      </p>

                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-medium text-red-800 dark:text-emerald-400 mb-2">Importance of Supervision:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-red-700 dark:text-emerald-400">
                          <div>
                            <strong>Legal Protection:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Qualified person takes legal responsibility</li>
                              <li>• Apprentice protected from liability</li>
                              <li>• Company insurance coverage maintained</li>
                              <li>• Regulatory compliance ensured</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Learning Benefits:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Real-world experience with guidance</li>
                              <li>• Immediate feedback on performance</li>
                              <li>• Safety culture development</li>
                              <li>• Professional standards training</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground">
                        Integrity in certification is fundamental to the electrical industry's reputation and public safety. Level 2 learners must understand that cutting corners or misrepresenting their status undermines both personal career development and industry standards. The supervised learning period is an investment in becoming a competent, trustworthy professional.
                      </p>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Building Professional Integrity:</h4>
                        <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
                          <p><strong>Honesty:</strong> Always be truthful about qualifications and capabilities</p>
                          <p><strong>Responsibility:</strong> Take ownership of learning and skill development</p>
                          <p><strong>Respect:</strong> Value the supervision and guidance provided</p>
                          <p><strong>Excellence:</strong> Strive for the highest standards in all work</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Warning Signs of Poor Practice:</h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• Pressure to sign certificates before qualification</li>
                          <li>• Working without adequate supervision</li>
                          <li>• Employers bypassing competency requirements</li>
                          <li>• Ignoring professional development requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="level2-supervision-check"
            question="Why must Level 2 electricians never sign certificates in their own name?"
            options={["To slow down the work", "It's fraudulent and they lack legal authority", "Company policy only", "Insurance requirements"]}
            correctIndex={1}
            explanation="Level 2 electricians must never sign certificates as they lack the legal authority to do so, and signing would be fraudulent with serious consequences."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Always make clear notes of test results and hand them to the supervising electrician</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Ask questions about the certification process to build understanding</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Never sign paperwork unless fully qualified and authorised</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Treat every test you do as if you were signing it yourself — accuracy and honesty are essential</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-foreground">
              On a small domestic rewiring job, an apprentice filled out and signed a Minor Works Certificate while the supervising electrician was off-site. Months later, a fault caused repeated RCD tripping, and the certificate was checked. Because the apprentice was not legally competent to sign, the certificate was invalid, and the contractor faced penalties for non-compliance. The client demanded retesting and full certification, costing the company time and money.
            </p>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-emerald-400">
                <strong>Issue:</strong> Apprentice signed certificate without authority, making it invalid and leading to compliance penalties and additional costs.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>✅ Lesson:</strong> Only competent, qualified electricians can sign certificates. Apprentices and Level 2 learners can assist but must never sign.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-foreground mb-2">Q: Can Level 2 learners carry out testing?</p>
              <p className="text-muted-foreground">A: Yes, but only under the supervision of a qualified person.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Q: Why can't Level 2 electricians sign certificates?</p>
              <p className="text-muted-foreground">A: Because they are not yet fully qualified and legally recognised as competent persons.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Q: Who is legally responsible for certification?</p>
              <p className="text-muted-foreground">A: The qualified electrician who signs the certificate.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-foreground">
            Certification must always be signed by a competent person — someone with the training, knowledge, and experience to confirm compliance with BS 7671. Signing carries legal responsibility for the safety of the installation. Level 2 electricians can help with testing and recording results but cannot sign certificates. Supervision, honesty, and integrity are essential at this stage of training.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz 
            title="Who Can Sign Off Work Quiz"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../7-3">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Minor Works Certificates
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="..">
              Back to Section 7 Overview
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section7_4;