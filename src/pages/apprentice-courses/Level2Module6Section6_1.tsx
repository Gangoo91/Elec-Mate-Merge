import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level2Module6Section6_1 = () => {
  useSEO(
    "Recording Electrical Test Results - Level 2 Module 6 Section 6.1",
    "Understanding the importance of accurate test documentation"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why is it important to record test results immediately after testing?",
      options: ["It's not important", "To avoid forgetting or mixing up readings", "To impress the client", "To save time"],
      correctAnswer: 1,
      explanation: "Recording results immediately prevents confusion, ensures accuracy, and maintains proper documentation for compliance."
    },
    {
      id: 2,
      question: "What information must be included when recording test results?",
      options: ["Just the readings", "Date, time, readings, tester details, and conditions", "Only pass/fail", "Just the circuit details"],
      correctAnswer: 1,
      explanation: "Complete documentation must include date, time, actual readings, tester identification, environmental conditions, and any relevant observations."
    },
    {
      id: 3,
      question: "What are the legal consequences of poor record keeping?",
      options: ["None", "Professional liability and potential prosecution", "Just a warning", "Loss of coffee privileges"],
      correctAnswer: 1,
      explanation: "Poor record keeping can result in professional liability claims, prosecution under health and safety legislation, and loss of professional credibility."
    },
    {
      id: 4,
      question: "How long should electrical test records be kept?",
      options: ["1 year", "5 years", "10 years", "Forever"],
      correctAnswer: 1,
      explanation: "Electrical test records should typically be kept for at least 5 years, though some situations may require longer retention periods."
    },
    {
      id: 5,
      question: "Who can access electrical test records?",
      options: ["Anyone", "Only the electrician", "Client, insurers, HSE, and relevant authorities", "Just the client"],
      correctAnswer: 2,
      explanation: "Test records may need to be made available to the client, insurance companies, HSE inspectors, and other relevant regulatory authorities."
    },
    {
      id: 6,
      question: "Under EAWR 1989, what is the electrician's duty regarding test records?",
      options: ["Records are optional", "Must ensure installations are safe and maintain records proving this", "Only need records for commercial work", "Records only needed if client requests them"],
      correctAnswer: 1,
      explanation: "EAWR 1989 places a legal duty on electricians to ensure installations are safe and maintain records that prove proper testing was carried out."
    },
    {
      id: 7,
      question: "What happens to professional registration if record keeping is consistently poor?",
      options: ["Nothing changes", "A verbal warning only", "Suspension or permanent removal from approved schemes", "Just a small fine"],
      correctAnswer: 2,
      explanation: "Registration bodies audit members' work regularly, and poor documentation can result in suspension or removal from schemes like NICEIC, NAPIT, or ELECSA."
    },
    {
      id: 8,
      question: "Why should actual numerical readings be recorded rather than just 'pass/fail'?",
      options: ["It looks more professional", "Numerical values allow future comparisons and trend analysis", "It's quicker to write", "Clients prefer numbers"],
      correctAnswer: 1,
      explanation: "Actual readings provide a baseline for future testing, enable trend analysis, and provide concrete evidence for legal or insurance purposes."
    },
    {
      id: 9,
      question: "Which document requires electrical work to be certified with supporting test records?",
      options: ["BS 7671 only", "Building Regulations Approved Document P", "Health and Safety at Work Act", "Company policies"],
      correctAnswer: 1,
      explanation: "Building Regulations Approved Document P specifically requires electrical work to be certified, and certification must be supported by comprehensive test records."
    },
    {
      id: 10,
      question: "What can invalidate professional indemnity insurance claims?",
      options: ["Using the wrong pen colour", "Inability to prove proper procedures and documentation were followed", "Testing on a rainy day", "Not wearing high-vis clothing"],
      correctAnswer: 1,
      explanation: "Professional indemnity insurance may be invalidated if proper testing procedures and documentation cannot be proven, leaving the electrician personally liable for claims."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
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
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Recording Electrical Test Results
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Understanding the importance of accurate test documentation
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
                  <span>Record results immediately after testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Include date, time, readings, and conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Keep records for minimum 5 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Ensure legibility and accuracy</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Missing documentation, incomplete records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Proper recording forms and procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> All details recorded, legible, signed</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Accurate recording of electrical test results is not just good practice—it's a legal requirement and professional obligation. Poor or missing documentation can result in serious consequences, including professional liability, insurance claims, and potential prosecution. This section explains why recording matters, what must be documented, and the standards required for compliance with BS 7671 and relevant legislation.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the importance of accurate test documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify what information must be recorded during testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the legal and professional consequences of poor record keeping</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply best practices for maintaining test records</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Why Recording Results Matters */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Why Recording Results Matters</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Test records serve multiple critical purposes beyond simple documentation. They provide legal evidence of compliance with BS 7671 and the Electricity at Work Regulations 1989, demonstrating that the installation has been properly tested and meets safety standards. This evidence becomes crucial if accidents occur or if authorities need to verify that due diligence was exercised.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        From an insurance perspective, detailed test records demonstrate professional competence and adherence to industry standards. Insurance companies require this evidence when processing claims related to electrical failures. Without proper documentation, claims may be denied, leaving both electrician and client exposed to significant financial liability.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        For troubleshooting and maintenance, accurate records provide a baseline for future comparisons. When faults develop years after installation, these historical readings help identify deterioration patterns and guide repair strategies. They also protect the original installer from unfounded liability claims by establishing the condition of the installation at completion.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional reputation depends heavily on thorough documentation. Clients, building control officers, and other professionals judge competence partly on the quality of paperwork. Poor records suggest careless work practices and can damage career prospects and business relationships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="importance-check"
            question="What is the primary legal purpose of recording test results?"
            options={["To impress clients", "To provide evidence of compliance with regulations", "To save time", "To avoid paperwork"]}
            correctIndex={1}
            explanation="Test records provide crucial evidence that work has been carried out in compliance with BS 7671 and other relevant regulations, which is essential for legal protection."
          />

          {/* 2. What Must Be Recorded */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">What Must Be Recorded</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Essential information must be recorded for every test conducted. This includes the date and precise time of testing, as this establishes when the installation was verified as safe. The actual numerical readings must be recorded—never just "pass" or "fail"—as these values may need to be compared with future tests or challenged in legal proceedings.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Environmental conditions significantly affect test results and must be documented. Temperature, humidity, and moisture levels can influence insulation resistance readings. For example, high humidity may temporarily reduce insulation resistance, making it important to note these conditions for proper interpretation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Test equipment details are crucial for traceability. Record the instrument type, manufacturer, model, serial number, and last calibration date. This information proves that appropriate, calibrated equipment was used and helps investigate any disputed results. Circuit identification must be clear and unambiguous, using the same references as on installation drawings and schedules.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        The tester must sign and print their name clearly, along with their qualification level and company details. This establishes accountability and provides a contact point for future queries. Any deviations from standard procedures, unexpected results, or remedial actions taken must be documented in detail.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        For specific tests, additional information may be required. Insulation resistance tests need the conductor combinations tested and the test voltage used. RCD tests require trip times and test currents. Polarity tests need clear indication of any incorrect connections found and corrected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-check"
            question="Why is it important to record actual numerical readings rather than just 'pass' or 'fail'?"
            options={["It looks more professional", "Numerical values allow future comparisons and legal verification", "It takes less time", "It impresses the client"]}
            correctIndex={1}
            explanation="Actual numerical readings are essential for future comparisons, trend analysis, and legal verification. Simple pass/fail notations provide no baseline for future reference."
          />

          {/* 3. Compliance and Certification */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3 text-base">Compliance and Certification</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Test records form the foundation of all electrical certification documents required by BS 7671. The Electrical Installation Certificate (EIC) for new installations, Minor Works Certificate (MWC) for small additions or alterations, and Electrical Installation Condition Report (EICR) for periodic inspections all depend entirely on the quality and completeness of the underlying test records.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Building Regulations Approved Document P requires electrical work to be certified, and this certification is only valid if supported by comprehensive test records. Building Control and local authority inspectors routinely examine these records, and incomplete or poor documentation can result in rejection of the installation and requirements for retesting.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        For insurance purposes, electrical certificates backed by detailed test records demonstrate that installations comply with current standards and have been properly commissioned. Many insurance policies require periodic electrical certification, and the quality of supporting test records directly affects coverage validity.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional registration schemes, such as NICEIC, NAPIT, and ELECSA, regularly audit members' work, including examination of test records. Poor documentation can result in warnings, retraining requirements, or even loss of registration. Competent Person Schemes rely on consistent, high-quality record-keeping to maintain their credibility with regulatory bodies.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        In commercial and industrial settings, additional requirements may apply. Health and Safety Executive (HSE) inspectors have powers to examine electrical records, and failure to produce adequate documentation can result in improvement or prohibition notices. Some industries have specific record-keeping requirements that exceed BS 7671 minimum standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="compliance-check"
            question="Which document requires electrical work to be certified with supporting test records?"
            options={["BS 7671 only", "Building Regulations Approved Document P", "Company health and safety policy", "Manufacturer's guidelines"]}
            correctIndex={1}
            explanation="Building Regulations Approved Document P specifically requires electrical work to be certified, and this certification must be supported by comprehensive test records."
          />

          {/* 4. Consequences of Poor Record-Keeping */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3 text-base">Consequences of Poor Record-Keeping</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Legal consequences of poor record-keeping can be severe and career-ending. Under the Electricity at Work Regulations 1989, electricians have a legal duty to ensure installations are safe and to maintain records proving this. Failure to produce adequate records following an electrical incident can result in prosecution by the HSE, with potential penalties including unlimited fines and imprisonment.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional liability claims represent a significant financial risk. If an electrical fault causes injury, death, or property damage, and inadequate test records prevent the electrician from demonstrating proper testing was carried out, they may face substantial compensation claims. Professional indemnity insurance may be invalidated if proper procedures and documentation cannot be proven.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Insurance implications extend beyond professional liability. Building insurance claims related to electrical faults may be rejected if proper electrical certification cannot be produced. This affects not only the electrician but also the building owner, potentially leading to civil claims for the cost of denied insurance coverage.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional registration and career prospects suffer significantly from poor record-keeping practices. Registration bodies regularly audit members' work, and consistent documentation failures can result in suspension or permanent removal from approved schemes. This effectively ends the ability to self-certify work under Building Regulations, severely limiting career options.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Business reputation and client relationships are damaged by poor documentation. Word spreads quickly in the electrical industry about contractors who provide substandard paperwork. Building control officers, main contractors, and other professionals maintain informal networks and poor documentation practices can lead to exclusion from future work opportunities.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Warranty and guarantee implications should not be overlooked. Electrical equipment manufacturers often require proof of proper installation and testing to honour warranties. Poor test records can void these warranties, leaving clients liable for expensive replacement costs and potentially creating additional liability for the installer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question="What can happen to an electrician under EAWR 1989 if they cannot produce adequate test records after an electrical incident?"
            options={["Just a verbal warning", "A small administrative fine", "Prosecution with potential unlimited fines and imprisonment", "Loss of tool allowance"]}
            correctIndex={2}
            explanation="Under EAWR 1989, failure to maintain adequate records can result in HSE prosecution with penalties including unlimited fines and potential imprisonment, making proper record-keeping a critical legal requirement."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground">
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-border/20">
              <p className="font-medium mb-2">Record Keeping Best Practices:</p>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>• Use permanent ink, never pencil</li>
                <li>• Record readings immediately, don't rely on memory</li>
                <li>• Use standard forms and templates</li>
                <li>• Ensure handwriting is legible</li>
                <li>• Include all required signatures and dates</li>
                <li>• Keep copies in multiple locations</li>
                <li>• Use digital backups where possible</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Real-World Example</h2>
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">!</div>
              <div className="flex-1">
                <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2">The £250,000 Insurance Disaster</p>
                <div className="space-y-3 text-xs sm:text-sm text-foreground">
                  <p>
                    <strong>The Situation:</strong> A qualified electrician completed a rewire of a small office building in Manchester. He carried out all required tests but took shortcuts with documentation, recording only "PASS" or "FAIL" on a basic notepad instead of using proper test forms. Six months later, a fire broke out due to an electrical fault in a lighting circuit.
                  </p>
                  <p>
                    <strong>The Investigation:</strong> Fire investigators determined the cause was a poor connection that should have been detected during testing. When the insurance company requested test records, the electrician could only provide his handwritten notes with no numerical readings, dates, or equipment details.
                  </p>
                  <p>
                    <strong>The Consequences:</strong> The insurance company rejected the £250,000 claim, stating insufficient evidence of proper testing. The building owner sued the electrician for the full amount. HSE prosecuted under EAWR 1989, resulting in a £45,000 fine and 200 hours community service. The electrician lost his NICEIC registration and was forced to close his business.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Proper test documentation isn't just paperwork—it's legal protection. The 30 minutes saved on documentation cost this electrician his career and nearly £300,000 in total costs.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-card border border-red-500/20 rounded-lg">
              <p className="text-xs sm:text-xs sm:text-sm text-foreground font-medium">
                💡 <strong>Key Takeaway:</strong> This case demonstrates that cutting corners on documentation is never worth the risk. Comprehensive test records are your professional insurance policy.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                How long should I keep test records?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Test records should be kept for a minimum of 5 years, though some situations (such as public buildings) may require longer retention periods. Always check specific requirements for your type of work.
              </p>
            </details>
            <Separator />
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                Can I use digital records instead of paper?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Yes, digital records are acceptable provided they are properly backed up, cannot be easily altered, and remain accessible for the required retention period.
              </p>
            </details>
            <Separator />
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                What if I make a mistake in my records?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Never use correction fluid or erase mistakes. Cross through errors with a single line, write the correction alongside, initial and date the correction.
              </p>
            </details>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Pocket Guide - Record Keeping Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <p className="font-medium mb-2 text-foreground">Essential Information:</p>
              <ul className="space-y-1 text-foreground">
                <li>✓ Date and time</li>
                <li>✓ Actual readings</li>
                <li>✓ Test equipment details</li>
                <li>✓ Environmental conditions</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2 text-foreground">Quality Standards:</p>
              <ul className="space-y-1 text-foreground">
                <li>✓ Legible handwriting</li>
                <li>✓ Permanent ink</li>
                <li>✓ Signed and dated</li>
                <li>✓ No alterations</li>
              </ul>
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
                  <p className="font-medium text-foreground text-sm sm:text-base">Legal Requirement</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Test records are mandatory under EAWR 1989 and BS 7671</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Complete Documentation</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Date, time, readings, equipment, tester details required</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Serious Consequences</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Poor records risk prosecution, liability claims, lost registration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Professional Protection</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Proper records protect career, reputation, and finances</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-center text-sm sm:text-base font-medium text-foreground">
              💡 Remember: Good test records are your professional insurance policy - invest the time to get them right!
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="module6-section6/2">
              Next: Interpreting Test Readings
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level2Module6Section6_1;
