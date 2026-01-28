import { ArrowLeft, Target, CheckCircle, Settings, AlertTriangle, Eye, Shield, Database, Lightbulb, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level2Module6Section6_4 = () => {
  useSEO(
    "Corrective Action and Retesting - Level 2 Module 6 Section 6.4",
    "Procedures for addressing test failures and importance of retesting"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "After correcting a fault that caused a test failure, what is the MOST important next step?",
      options: ["Move to the next circuit", "Retest to verify the correction", "Complete the certificate", "Pack up the equipment"],
      correctAnswer: 1,
      explanation: "Retesting is essential to verify that the correction has been effective and that the circuit now meets all safety requirements."
    },
    {
      id: 2,
      question: "If multiple circuits fail insulation resistance tests, what should be your priority action?",
      options: ["Test other properties", "Investigate the root cause", "Lower the test voltage", "Issue the certificate anyway"],
      correctAnswer: 1,
      explanation: "Multiple failures suggest a systematic problem (like moisture ingress) that needs investigation before individual circuit corrections."
    },
    {
      id: 3,
      question: "When is it acceptable to energise a circuit that has failed testing?",
      options: ["If the customer needs power", "After working hours", "Never until all tests pass", "If it's only a minor failure"],
      correctAnswer: 2,
      explanation: "It is never acceptable to energise a circuit that has failed testing. This violates BS 7671 and could create dangerous conditions."
    },
    {
      id: 4,
      question: "What documentation is required when corrective action has been taken?",
      options: ["Just update the test results", "Record details of fault found and action taken", "No documentation needed", "Only note the retest results"],
      correctAnswer: 1,
      explanation: "Full documentation must include details of the fault found, corrective action taken, and evidence that retesting confirms the problem is resolved."
    },
    {
      id: 5,
      question: "Who is responsible for ensuring corrective action is completed before energising?",
      options: ["The customer", "Building control", "The person in control of the electrical work", "The electricity supplier"],
      correctAnswer: 2,
      explanation: "The person in control of the electrical work is legally responsible for ensuring all defects are corrected before energising any circuit."
    },
    {
      id: 6,
      question: "If a retest still shows failure after corrective action, what should you do?",
      options: ["Accept it as close enough", "Try a different test method", "Further investigate and correct the underlying cause", "Energise anyway"],
      correctAnswer: 2,
      explanation: "Continued failures indicate the root cause hasn't been addressed. Further investigation and correction are required."
    },
    {
      id: 7,
      question: "What could happen if you energise a circuit without proper retesting after repairs?",
      options: ["Nothing if the repair looked good", "Potential danger and legal liability", "Just equipment damage", "Minor inconvenience only"],
      correctAnswer: 1,
      explanation: "Energising without proper verification could create dangerous conditions and result in legal liability under EAWR 1989."
    },
    {
      id: 8,
      question: "How should test results be updated after successful corrective action?",
      options: ["Overwrite the original readings", "Record new readings with date and signature", "Just note 'corrected'", "Keep separate informal records"],
      correctAnswer: 1,
      explanation: "New test results should be properly recorded with date and signature to provide a complete audit trail of the corrective action."
    },
    {
      id: 9,
      question: "What is the main purpose of retesting after corrective action?",
      options: ["To satisfy the customer", "To prove the correction was effective", "To fill in paperwork", "To use expensive test equipment"],
      correctAnswer: 1,
      explanation: "Retesting provides objective evidence that the corrective action has been effective and the circuit now meets safety requirements."
    },
    {
      id: 10,
      question: "According to BS 7671, can partially completed installations be energised for testing purposes?",
      options: ["Yes, if clearly labelled", "No, never under any circumstances", "Only with special permission", "Yes, if protective devices are fitted"],
      correctAnswer: 3,
      explanation: "Partially completed installations may be energised for testing if protective devices are in place and appropriate safety measures are taken."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Corrective Action and Retesting
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Procedures for addressing test failures and importance of retesting
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
                  <span>Never energise failed circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Always retest after corrective action</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Document everything clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Verify compliance before energising</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Any test failure requiring correction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Systematic approach to fault finding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Retest confirms successful correction</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Finding a fault during testing is only the beginning—the real work lies in taking appropriate corrective action and verifying the fix through retesting. This subsection covers the systematic approach to addressing test failures, the importance of thorough retesting, and the legal requirements that must be met before any circuit can be safely energised. Understanding these procedures is essential for both safety and regulatory compliance.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the importance of corrective action when tests fail</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply systematic approaches to fault-finding and correction</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the critical importance of retesting after any corrective action</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the legal and safety implications of energising faulty circuits</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Why Corrective Action is Essential */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Why Corrective Action is Essential</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Corrective action serves multiple critical purposes beyond simply achieving test compliance. It eliminates safety hazards that could cause electric shock, fire, or equipment damage, protecting both users and property. The Electricity at Work Regulations 1989 place absolute duty on employers and the self-employed to ensure electrical systems are safe, making corrective action a legal requirement rather than an option.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        From a professional perspective, corrective action demonstrates competence and integrity. Clients trust electricians to identify and resolve problems rather than simply document them. Failing to address known defects can result in loss of professional certification, legal liability, and damage to business reputation. The electrical industry's credibility depends on individual practitioners maintaining the highest standards.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Insurance implications make corrective action financially essential. Most insurance policies require electrical installations to comply with current standards, and known defects that are not corrected can void coverage entirely. If an electrical fault causes fire or injury after a defect has been identified but not corrected, the resulting liability can be enormous, potentially including criminal prosecution.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Economic factors also support immediate corrective action. Minor defects often develop into major problems if left unaddressed, making early intervention far more cost-effective than delayed repairs. Additionally, defective installations may not perform efficiently, leading to increased energy costs and reduced equipment lifespan that ultimately costs more than proper correction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="corrective-action-essential-check"
            question="What is the primary legal basis for requiring corrective action when electrical defects are found?"
            options={["Building regulations", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "Insurance requirements"]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations 1989 place absolute duty on duty holders to ensure electrical systems are safe, making corrective action legally mandatory when defects are identified."
          />

          {/* 2. Systematic Fault Finding Approaches */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Systematic Fault Finding Approaches</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Effective fault finding requires structured methodology rather than random testing or guesswork. The logical approach begins with understanding what the failed test actually indicates about the installation condition. For example, low insulation resistance suggests moisture, contamination, or physical damage, while high loop impedance typically indicates poor earthing connections or supply problems.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Information gathering is crucial before starting physical investigation. This includes reviewing installation records, understanding the construction sequence, identifying environmental factors, and noting any recent changes or maintenance work. Often, the history of the installation provides vital clues about the likely location and nature of problems.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Systematic testing techniques help isolate faults efficiently. This might involve dividing circuits into sections, testing individual components, or using specialised techniques like step-voltage testing for insulation problems. The key is to narrow down the fault location progressively rather than testing randomly throughout the installation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Visual inspection often reveals information that testing alone cannot provide. Look for obvious damage, poor workmanship, environmental contamination, or signs of overheating. Sometimes the visual evidence points directly to the problem area, saving considerable testing time and ensuring that all related issues are identified and addressed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-finding-check"
            question="What should be the first step in systematic fault finding after a test failure is identified?"
            options={["Start random testing", "Understanding what the test result indicates", "Call for help", "Replace components"]}
            correctIndex={1}
            explanation="Understanding what the failed test actually indicates about the installation condition is essential before beginning physical investigation or additional testing."
          />

          {/* 3. The Critical Importance of Retesting */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3 text-base">The Critical Importance of Retesting</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Retesting provides objective verification that corrective action has been effective and that the installation now meets safety requirements. Good intentions, careful workmanship, and expensive materials mean nothing without testing to prove compliance. This principle applies regardless of the complexity of the corrective work or the experience of the person carrying it out.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        The scope of retesting must be appropriate to the nature of the corrective action. Simple repairs might require only specific retests, while major modifications could necessitate complete retesting of affected circuits. Sometimes corrective action in one area can affect other parts of the installation, making broader retesting necessary to ensure no new problems have been created.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Retesting must demonstrate not just that the original fault has been cleared, but that the installation maintains its overall integrity. For example, tightening a loose earth connection should improve both local continuity readings and overall loop impedance values. If retesting shows improvement in one area but deterioration elsewhere, further investigation is required.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Documentation of retesting is as important as the original test results. The retesting results become part of the permanent record and provide evidence that due diligence was exercised. This documentation may be crucial for legal protection, insurance claims, or future electrical work on the installation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="retesting-importance-check"
            question="Why must retesting cover more than just the specific test that originally failed?"
            options={["To use more test equipment", "Corrective action may affect other aspects of the installation", "To satisfy regulations", "To spend more time on site"]}
            correctIndex={1}
            explanation="Corrective action in one area can sometimes affect other parts of the installation, so retesting must verify that overall installation integrity is maintained."
          />

          {/* 4. Professional and Legal Responsibilities */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3 text-base">Professional and Legal Responsibilities</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        The person responsible for electrical work bears ultimate accountability for ensuring all defects are corrected before energization. This responsibility cannot be delegated, avoided, or transferred to others. Under criminal law, the Electricity at Work Regulations 1989 impose absolute duties that apply regardless of intent, knowledge, or circumstances beyond the duty holder's control.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional codes of conduct require members to prioritize safety above all other considerations, including commercial pressures, time constraints, or client demands. Compromising safety standards for any reason constitutes professional misconduct that can result in loss of certification, exclusion from industry schemes, and serious damage to career prospects.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Civil liability exposure is significant when known defects are not corrected. If an electrical fault causes injury, death, or property damage after defects were identified but not addressed, the resulting claims can include compensation, legal costs, and punitive damages. Professional indemnity insurance may not cover claims where professional standards were knowingly breached.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        The wider industry reputation depends on individual practitioners maintaining high standards. Each electrician's work reflects on the profession as a whole, and poor practices by some individuals can damage public confidence in all electrical contractors. This collective responsibility means that maintaining professional standards is both an individual and industry-wide obligation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="professional-responsibility-check"
            question="Can responsibility for correcting electrical defects be delegated to others?"
            options={["Yes, to qualified assistants", "Yes, to the client", "No, the person in control remains responsible", "Yes, to building control"]}
            correctIndex={2}
            explanation="The person in control of electrical work bears ultimate legal responsibility that cannot be delegated, avoided, or transferred to others under the Electricity at Work Regulations."
          />
        </Card>

        {/* Additional Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Additional Content / Learning</h2>

          {/* 5. Documentation Requirements for Corrective Action */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3 text-base">Documentation Requirements for Corrective Action</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Comprehensive documentation of corrective action serves multiple critical purposes beyond simple record-keeping. It provides legal protection by demonstrating that identified defects were properly addressed, creates an audit trail for insurance purposes, and offers valuable information for future maintenance and inspection work. The documentation must clearly show what was wrong, what action was taken, and evidence that the correction was successful.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        The scope of documentation must match the complexity of the corrective action. Simple repairs like tightening connections require basic recording of the fault found, action taken, and retest results. Major modifications involving circuit alterations, component replacement, or system upgrades need more detailed documentation including materials used, modified circuit diagrams, and comprehensive test results covering all affected areas.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Photographic evidence can provide valuable support for written documentation, particularly for complex installations or unusual fault conditions. Before and after photographs help demonstrate the extent of problems and verify that corrective action was appropriate and thorough. This visual evidence can be particularly important for insurance claims or legal proceedings years after the work was completed.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Timing information in documentation helps establish the urgency and appropriateness of corrective action. Recording when faults were discovered, when corrective action began, and when retesting confirmed compliance demonstrates professional diligence and helps defend against claims that problems were left unaddressed for excessive periods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-requirements-check"
            question="Why should photographic evidence be included in corrective action documentation?"
            options={["To make reports look more professional", "To provide visual support for written documentation", "To satisfy clients", "To fill up space in reports"]}
            correctIndex={1}
            explanation="Photographic evidence provides valuable visual support for written documentation, particularly for complex installations, and can be crucial for insurance claims or legal proceedings."
          />

        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background border-border/20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-lg bg-elec-yellow/10">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
            </div>
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Practical Guidance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Settings className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Systematic Investigation</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Always investigate the root cause of test failures, not just the immediate symptom. Use structured fault finding methods</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Comprehensive Retesting</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Retest comprehensively after any corrective action to verify effectiveness and ensure no new problems created</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Target className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Competence Requirements</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Ensure you have the competence for any corrective action—involve specialists when necessary for complex repairs</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Safety Priority</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Never energise circuits that haven't passed all required tests. Safety requirements are absolute</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <FileText className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Documentation Standards</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Document everything clearly: fault details, action taken, and retest results with dates and signatures</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Eye className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Visual Inspection</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Combine systematic testing with thorough visual inspection to identify all related problems</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Shield className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Legal Compliance</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Understand EAWR 1989 requirements and maintain compliance throughout corrective action process</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Database className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Complete Verification</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Verify that all safety issues are resolved before energisation, regardless of commercial pressures</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base mb-2">Professional Tip</p>
                <p className="text-xs sm:text-sm text-white/80">
                  Systematic corrective action and thorough retesting protect both your professional reputation and public safety. Never compromise on safety requirements due to commercial pressures or time constraints. Proper procedures today prevent serious problems tomorrow.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Real World Example</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Situation</h4>
              <p className="text-white/80">
                During testing of a recently extended domestic installation, multiple circuits failed insulation resistance tests with readings between 0.6-0.8 MΩ. The electrician initially suspected moisture ingress from recent heavy rain but found the consumer unit dry with no obvious water damage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Investigation</h4>
              <p className="text-white/80">
                Systematic fault finding revealed that new cables had been run through existing ducting without checking its condition. The ducting had been compromised by building work, allowing moisture to affect multiple cables simultaneously. Additional testing showed that some circuits had borderline earth loop impedance values.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Initial Corrective Action</h4>
              <p className="text-white/80">
                The electrician replaced the affected cable sections and improved the ducting sealing. Initial retesting showed improved insulation resistance (2-3 MΩ) but revealed that tightening connections during the cable replacement had increased loop impedance values beyond acceptable limits due to inadequate earthing arrangements.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Further Issues Discovered</h4>
              <p className="text-white/80">
                Comprehensive retesting revealed that the original earthing conductor was undersized for the extended installation and had high resistance connections. What initially appeared to be a simple moisture problem actually indicated fundamental earthing deficiencies that would have created serious safety risks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Final Resolution</h4>
              <p className="text-white/80">
                Complete earthing system upgrade was required, including new main earthing conductor and improved bonding arrangements. Final testing confirmed all circuits met requirements. Total corrective work took three days instead of the anticipated few hours, demonstrating why systematic retesting is essential.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-card rounded-lg border border-green-500/20">
              <p className="text-green-700 dark:text-green-300 font-medium">
                ✅ Lesson: Initial corrective action may reveal additional problems that were previously masked. Only comprehensive retesting ensures all safety issues are identified and resolved before energisation.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground">
            <div>
              <h4 className="font-semibold mb-2">Q: Can I energise a circuit if most tests pass but one shows a borderline failure?</h4>
              <p className="text-white/80">A: No. All tests must pass their specified criteria before any circuit can be safely energised.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: What if the customer pressures me to energise circuits that haven't passed testing?</h4>
              <p className="text-white/80">A: Customer pressure never justifies compromising safety. Explain the legal and safety reasons why this cannot be done.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: How long should I wait after corrective action before retesting?</h4>
              <p className="text-white/80">A: This depends on the nature of the fault and correction. Moisture-related issues may need drying time, while connection repairs can usually be retested immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: What if I don't have the skills to correct a particular fault?</h4>
              <p className="text-white/80">A: Involve appropriately qualified specialists. Professional integrity means recognising your limitations and seeking help when needed.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-elec-yellow/10 border border-primary/20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Key Learning Points</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Systematic Approach</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Use structured fault finding methods to identify root causes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Always Retest</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Verify corrective action success through comprehensive retesting</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Legal Requirements</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">EAWR 1989 mandates safe systems before energisation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Documentation</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Record all corrective actions and retest results clearly</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-center text-sm sm:text-base font-medium text-foreground">
              💡 Remember: Never energise circuits that have failed testing—corrective action and retesting are essential for safety!
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz 
            questions={quizQuestions}
            title="Section 6.4 Quiz: Corrective Action and Retesting"
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="module6-section6/3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Section 6.3
            </Link>
          </Button>
          <Button asChild>
            <Link to="module6-section6/5" className="flex items-center gap-2">
              Next: Section 6.5
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level2Module6Section6_4;