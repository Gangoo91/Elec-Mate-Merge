import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_2 = () => {
  useSEO(
    "Legal and Safety Reasons for Electrical Inspection and Testing | Level 2 Electrical",
    "Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance"
  );

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.1.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Legal and Safety Reasons for Electrical Inspection and Testing
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-sm space-y-1 list-disc pl-5">
              <li>EAWR 1989 creates absolute legal duty to prevent electrical danger.</li>
              <li>BS 7671 sets technical standards – initial verification and periodic inspection mandatory.</li>
              <li>Personal responsibility: whoever signs certificates accepts full legal liability.</li>
              <li>Non-compliance consequences: prosecution, fines, imprisonment, professional disgrace.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Identify the specific legal requirements for inspection and testing under EAWR 1989 and their enforcement.</li>
                <li>Explain how BS 7671 principles guide safe design, installation, and testing practices in electrical work.</li>
                <li>Understand the serious personal, professional, and criminal consequences of failing to comply with regulations.</li>
                <li>Recognise your personal legal responsibility as an installer and the limits of delegation.</li>
                <li>Appreciate the relationship between legal compliance, professional insurance, and career protection.</li>
                <li>Distinguish between criminal liability (EAWR) and civil liability (negligence claims) in electrical work.</li>
              </ul>
            </div>
          </section>

          {/* EAWR 1989 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              The Electricity at Work Regulations (EAWR 1989)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The EAWR 1989 creates the legal foundation for electrical safety in the UK. Unlike guidance documents, these are statutory regulations with the full force of criminal law behind them. They place absolute duties on both employers and employees to prevent electrical danger.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Key Regulations and Duties:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Regulation 4(1):</strong> All electrical systems must be constructed, maintained, and used in a manner that prevents danger so far as is reasonably practicable</li>
                  <li><strong>Regulation 4(2):</strong> Systems must be maintained in a safe condition at all times, requiring ongoing verification of safety</li>
                  <li><strong>Regulation 14:</strong> No person shall work on or near live conductors except in specific circumstances with adequate precautions</li>
                  <li><strong>Absolute duty:</strong> Employers cannot delegate their legal responsibility – they remain liable for ensuring compliance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Enforcement and Penalties:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>HSE Powers:</strong> Health and Safety Executive can prosecute individuals and companies</li>
                  <li><strong>Criminal Sanctions:</strong> Unlimited fines and up to 2 years imprisonment for serious breaches</li>
                  <li><strong>Corporate Manslaughter:</strong> Directors can face personal prosecution under the Corporate Manslaughter Act</li>
                  <li><strong>Improvement/Prohibition Notices:</strong> HSE can stop work immediately if danger exists</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Critical Legal Point</p>
                <p className="text-sm">
                  EAWR 1989 creates "absolute duties" – this means you cannot use cost, time pressure, or difficulty as excuses for non-compliance. If electrical danger exists, the law has been broken regardless of circumstances.
                </p>
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

          {/* BS 7671 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              BS 7671 Wiring Regulations - The Technical Framework
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                While EAWR 1989 sets the legal requirement for safety, BS 7671 provides the detailed technical methods for achieving compliance. Courts recognise BS 7671 as the definitive standard for electrical installation safety in the UK.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Mandatory Requirements:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Initial verification (Part 6):</strong> Mandatory testing before any new installation is energised</li>
                  <li><strong>Periodic inspection and testing:</strong> Regular verification that existing installations remain safe</li>
                  <li><strong>Test procedures:</strong> Specific sequences for continuity, insulation resistance, polarity, earth fault loop impedance</li>
                  <li><strong>Acceptance criteria:</strong> Clear pass/fail values for all electrical parameters</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Required Certificates:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>EIC:</strong> Electrical Installation Certificate (new work)</li>
                    <li><strong>EICR:</strong> Electrical Installation Condition Report (periodic)</li>
                    <li><strong>MWC:</strong> Minor Works Certificate (alterations/additions)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Amendment Updates:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Current:</strong> 18th Edition Amendment 2 (2022)</li>
                    <li><strong>Key changes:</strong> AFDD requirements, EV charging provisions</li>
                    <li><strong>Compliance:</strong> Must use current amendment for new work</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                <p className="font-medium text-blue-400 mb-2">Legal Status of BS 7671</p>
                <p className="text-sm">
                  While BS 7671 is not directly law, courts accept it as the standard for safe electrical installation. Deviation from BS 7671 without equivalent safety measures can be used as evidence of EAWR non-compliance in legal proceedings.
                </p>
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

          {/* Personal Responsibility */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Personal Legal Responsibility and Professional Accountability
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                When you sign an electrical certificate, you're not just completing paperwork – you're making a legal declaration that could result in criminal prosecution if proved false or negligent. Understanding this responsibility is crucial for career protection.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Certificate Signature Responsibilities:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Legal declaration:</strong> Signing creates personal legal liability for accuracy of all test results</li>
                  <li><strong>Competence requirement:</strong> Must be competent to carry out the work being certified</li>
                  <li><strong>Supervision limitations:</strong> Remain liable even when supervising others' work</li>
                  <li><strong>No delegation:</strong> Cannot delegate the legal responsibility that comes with signature</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Professional Registration:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Scheme membership:</strong> NICEIC, NAPIT, ELECSA can remove members</li>
                    <li><strong>Self-certification rights:</strong> Lost if removed from scheme</li>
                    <li><strong>Annual assessments:</strong> Work quality and compliance checked</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Insurance and Liability:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Professional indemnity:</strong> May be void if working outside competence</li>
                    <li><strong>Public liability:</strong> Required for injury claims</li>
                    <li><strong>Fraudulent work:</strong> Insurance doesn't cover deliberate misconduct</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Criminal Liability Warning</p>
                <p className="text-sm">
                  Fraudulent certification or gross negligence can result in prosecution under fraud laws or manslaughter charges if someone dies. Prison sentences are real – in 2019, a landlord received 12 months imprisonment after a tenant died in an electrical fire.
                </p>
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

          {/* Real-World Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Case Study: The Legal Reality
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <h3 className="font-medium text-white mb-2">R v Tangerine Confectionery and Mr David Costley-Wood (2014)</h3>
              <div className="text-white/80 text-sm space-y-3">
                <p>
                  A maintenance electrician was killed when he touched live 415V conductors in a distribution board. The investigation revealed systematic failures in electrical safety management.
                </p>
                <p><strong>The failures that led to conviction:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No electrical safety policy or risk assessments</li>
                  <li>Equipment not properly inspected or tested</li>
                  <li>Staff not trained in electrical safety procedures</li>
                  <li>Warning labels missing from distribution boards</li>
                  <li>No system for ensuring EAWR compliance</li>
                </ul>
                <p>
                  <strong>Consequences:</strong> The company was fined £750,000, and the maintenance manager received a 6-month suspended prison sentence.
                </p>
                <p className="text-elec-yellow/80">
                  <strong>Lesson:</strong> This case demonstrates that electrical safety isn't just about individual competence – it requires systematic compliance with legal duties at every level.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Pocket Guide Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Legal Framework:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li><strong>EAWR 1989:</strong> Criminal law – absolute duty to prevent danger</li>
                  <li><strong>BS 7671:</strong> Technical standard – defines compliance methods</li>
                  <li><strong>Regulation 4:</strong> Systems must be constructed and maintained safely</li>
                  <li><strong>Enforcement:</strong> HSE prosecution powers – unlimited fines/prison</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Personal Protection:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li><strong>Competence:</strong> Only work within your proven abilities</li>
                  <li><strong>Equipment:</strong> Use calibrated, approved instruments only</li>
                  <li><strong>Certificates:</strong> Only sign what you've personally verified</li>
                  <li><strong>Records:</strong> Document everything for legal protection</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Key Takeaways
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical inspection and testing exist within a robust legal framework that protects lives and property. EAWR 1989 creates the legal duty, BS 7671 provides the technical methods, and personal responsibility ensures accountability.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Remember the hierarchy:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Criminal law (EAWR):</strong> Creates absolute duties and penalties</li>
                  <li><strong>Technical standards (BS 7671):</strong> Defines compliance methods</li>
                  <li><strong>Professional responsibility:</strong> Ensures personal accountability</li>
                  <li><strong>Industry reputation:</strong> Maintains public trust in electrical work</li>
                </ul>
              </div>
              <p className="text-sm">
                Every time you test an installation and sign a certificate, you're not just completing a job – you're participating in a system designed to prevent electrical deaths and injuries.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Legal and Safety Requirements Quiz" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Why Inspect and Test?
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                Next: When Testing Is Required
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section1_2;
