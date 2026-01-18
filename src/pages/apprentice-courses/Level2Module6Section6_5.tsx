import { ArrowLeft, Target, CheckCircle, FileText, Settings, AlertTriangle, Eye, Shield, Database, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level2Module6Section6_5 = () => {
  useSEO(
    "Test Sheets and Site Documentation - Level 2 Module 6 Section 6.5",
    "Proper completion and management of electrical test documentation"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What information MUST be recorded on test sheets before any testing begins?",
      options: ["Test results", "Client details and installation description", "Weather conditions", "Tester's lunch plans"],
      correctAnswer: 1,
      explanation: "Client details, installation description, and test parameters must be recorded first to ensure test results can be properly attributed and traced."
    },
    {
      id: 2,
      question: "If you make an error when recording test results, what is the correct procedure?",
      options: ["Use correction fluid", "Cross out neatly and initial the correction", "Start a new sheet", "Ignore the error"],
      correctAnswer: 1,
      explanation: "Cross out errors neatly with a single line, write the correct information, and initial the correction to maintain an audit trail."
    },
    {
      id: 3,
      question: "How long must electrical test records be retained?",
      options: ["1 year", "2 years", "Until the next inspection", "Indefinitely for insurance and legal purposes"],
      correctAnswer: 3,
      explanation: "Test records should be retained indefinitely as they may be required for insurance claims, legal proceedings, or future electrical work."
    },
    {
      id: 4,
      question: "What happens if test documentation is incomplete or missing?",
      options: ["Nothing serious", "May invalidate insurance and create legal liability", "Just fill it in later", "Only affects the paperwork"],
      correctAnswer: 1,
      explanation: "Incomplete documentation can invalidate insurance coverage and create legal liability, as there's no evidence that proper testing was conducted."
    },
    {
      id: 5,
      question: "Who should sign and date completed test sheets?",
      options: ["Anyone present", "The customer", "The person responsible for the testing", "Building Control"],
      correctAnswer: 2,
      explanation: "Test sheets must be signed and dated by the person responsible for carrying out the testing to establish accountability."
    },
    {
      id: 6,
      question: "What is the purpose of recording test instrument details on documentation?",
      options: ["To show off expensive equipment", "For traceability and calibration verification", "Marketing purposes", "No particular reason"],
      correctAnswer: 1,
      explanation: "Recording instrument details ensures traceability and allows verification that properly calibrated equipment was used for testing."
    },
    {
      id: 7,
      question: "Should test sheets include readings that indicate failures?",
      options: ["No, only record passes", "Yes, record all actual readings", "Only if the customer requests it", "Hide failures to avoid problems"],
      correctAnswer: 1,
      explanation: "All actual test readings must be recorded, including failures, to provide an honest and complete record of the installation's condition."
    },
    {
      id: 8,
      question: "What should be done if a test sheet becomes damaged or illegible during site work?",
      options: ["Continue using it", "Recreate from memory", "Start fresh and transfer legible information carefully", "Abandon the testing"],
      correctAnswer: 2,
      explanation: "Start a new test sheet and carefully transfer any legible information, noting the reason for the replacement to maintain audit trail integrity."
    },
    {
      id: 9,
      question: "Can test results be recorded in pencil for ease of correction?",
      options: ["Yes, always use pencil", "No, permanent ink is required", "Either is acceptable", "Only for rough notes"],
      correctAnswer: 1,
      explanation: "Test results must be recorded in permanent ink to prevent unauthorised alterations and maintain the integrity of the documentation."
    },
    {
      id: 10,
      question: "In the real-world example, what was the consequence of poor record-keeping?",
      options: ["Minor paperwork issue", "Difficulty proving insurance compliance after electrical fire", "Customer complained", "Equipment was damaged"],
      correctAnswer: 1,
      explanation: "Poor documentation made it difficult to prove that proper testing had been conducted, potentially affecting insurance coverage after an electrical fire."
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
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.5
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Test Sheets and Site Documentation
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Proper completion and management of electrical test documentation
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
                  <span>Complete all test sheet headers first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Record actual readings in permanent ink</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Include instrument details and calibration dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Sign, date, and retain all documentation</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Incomplete or illegible documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Proper recording procedures throughout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> All sections complete before leaving site</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Test documentation is not just paperwork—it's a legal record that provides evidence of compliance, supports insurance claims, assists future electrical work, and demonstrates professional competence. Poor documentation can invalidate otherwise excellent work and create serious legal and financial liabilities. This subsection covers the essential requirements for proper completion and management of electrical test sheets and related site documentation.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Complete electrical test sheets accurately and comprehensively</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the legal and professional importance of proper documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply correct procedures for recording, correcting, and retaining test records</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the consequences of inadequate documentation</span>
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
            id="recording-matters-check"
            question="What is the primary legal purpose of recording test results?"
            options={["To satisfy clients", "To provide evidence of compliance with safety standards", "To create more paperwork", "To justify charges"]}
            correctIndex={1}
            explanation="Test records provide legal evidence of compliance with BS 7671 and the Electricity at Work Regulations, demonstrating that proper testing was conducted and safety standards met."
          />

          {/* 2. Essential Documentation Requirements */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Essential Documentation Requirements</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Complete test documentation begins with accurate identification of the installation, client, and scope of work. This includes full client contact details, precise property address, description of electrical work covered, and clear definition of what has and has not been tested. Without this foundation information, test results cannot be properly attributed or verified in the future.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Test instrument details are crucial for establishing result validity and traceability. This includes instrument make, model, serial numbers, and current calibration dates for all equipment used. If instruments are subsequently found to be faulty or out of calibration, having this information allows determination of which test results may be affected and what retesting might be required.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Environmental conditions during testing should be recorded where relevant, particularly for insulation resistance tests which can be significantly affected by temperature and humidity. Unusual conditions that might affect test results or interpretation should be noted to provide context for future reference or investigation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Circuit and installation details provide essential technical context for interpreting results and planning future work. This includes protective device types and ratings, cable specifications and routing, earthing system arrangements, and any special conditions or limitations that apply to specific circuits or areas of the installation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-requirements-check"
            question="Why is it essential to record test instrument calibration dates on documentation?"
            options={["To impress clients", "For warranty purposes", "To establish result validity and traceability", "To meet manufacturer requirements"]}
            correctIndex={2}
            explanation="Recording calibration dates establishes the validity of test results and provides traceability if instruments are later found to be faulty or out of calibration."
          />

          {/* 3. Accurate Recording Procedures */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3 text-base">Accurate Recording Procedures</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        All test results must be recorded in permanent ink to prevent unauthorized alterations and maintain document integrity. Pencil recordings are completely unacceptable for final documentation as they can be easily erased or modified without leaving any trace. Digital recording systems must include appropriate security features and audit trails to prevent tampering.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Actual test readings must be recorded, not just pass/fail indicators or simplified summaries. Recording actual values provides valuable information for future testing, helps identify trends that might indicate developing problems, and demonstrates thoroughness in the testing process. Even when readings show clear failures, the actual values should still be documented.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Error correction procedures must maintain document integrity while allowing for necessary corrections. When errors occur, they should be corrected by drawing a single neat line through the incorrect information, writing the correct details, and initialing the correction with the date. Correction fluid, erasers, or overwriting destroy the audit trail and may give the appearance of improper document alteration.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Legibility is essential for all handwritten entries, as illegible documentation serves no useful purpose and may be questioned by authorities or insurance investigators. If handwriting is naturally poor, extra care must be taken to write clearly, or consideration should be given to using digital recording systems that eliminate legibility concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-procedures-check"
            question="Why must actual test readings be recorded rather than just pass/fail indicators?"
            options={["To fill up the form", "To make documentation look more professional", "To provide valuable information for future reference and trend analysis", "To satisfy regulatory requirements"]}
            correctIndex={2}
            explanation="Recording actual values provides information for future testing, helps identify developing problems through trend analysis, and demonstrates thoroughness in the testing process."
          />

          {/* 4. Legal and Professional Implications */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3 text-base">Legal and Professional Implications</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Test documentation serves as legal evidence in various situations, from insurance claims to regulatory investigations to court proceedings. The Electricity at Work Regulations 1989 require adequate records to be maintained, and failure to keep proper documentation can result in legal liability, particularly if electrical incidents occur. Poor documentation can make it difficult to prove that appropriate care was taken.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Insurance implications of inadequate documentation can be severe. Most insurance policies require electrical work to comply with current standards, and proper documentation provides the only evidence that these requirements were met. Incomplete or missing records can void insurance coverage entirely, leaving property owners and electrical contractors exposed to enormous financial risk.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Professional certification schemes increasingly scrutinize documentation standards as part of their quality assurance processes. Poor record-keeping can result in disciplinary action, loss of certification, and exclusion from competent person schemes. The reputational damage from such actions can severely impact career prospects and business viability.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Long-term liability protection depends on maintaining comprehensive records that can demonstrate professional competence and regulatory compliance years after work was completed. Without proper documentation, defending against claims or complaints becomes extremely difficult, and the burden of proof may shift unfavorably against the electrical contractor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-implications-check"
            question="How can inadequate test documentation affect insurance coverage?"
            options={["It has no effect", "It may delay claim processing", "It can void coverage entirely", "It only affects premium costs"]}
            correctIndex={2}
            explanation="Inadequate documentation can void insurance coverage entirely, as it may be impossible to prove that electrical work complied with required standards."
          />
        </Card>

        {/* Additional Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Additional Content / Learning</h2>

          {/* 5. Digital Documentation Systems and Modern Practice */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-cyan-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-3 text-base">Digital Documentation Systems and Modern Practice</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Modern digital documentation systems offer significant advantages over traditional paper-based recording, including improved legibility, automatic data validation, integrated calculations, and cloud-based storage for enhanced security and accessibility. These systems can eliminate common errors like incorrect calculations, missing entries, or illegible handwriting that frequently compromise paper-based documentation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Security features in professional digital systems include encryption, audit trails, user authentication, and version control that provide stronger evidence of document integrity than paper records. Digital timestamps and GPS location recording can provide additional verification that testing was actually conducted at the specified location and time, strengthening the legal value of the documentation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Integration capabilities allow digital systems to link test results with circuit databases, previous inspection records, and manufacturer specifications, providing richer context for interpreting results and planning future work. This integration can help identify trends over time and flag potential developing problems before they become safety hazards.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        However, digital systems introduce new risks including software failures, data corruption, cyber security threats, and dependency on technology that may not be available when needed. Proper backup procedures, regular data validation, and contingency plans for system failures are essential to maintain the reliability and accessibility of electronic documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="digital-systems-check"
            question="What is a key advantage of digital documentation systems over paper-based recording?"
            options={["They're always cheaper", "They eliminate the need for testing", "They provide automatic data validation and improved legibility", "They work without electricity"]}
            correctIndex={2}
            explanation="Digital systems provide automatic data validation, improved legibility, and integrated calculations that help eliminate common errors found in paper-based documentation."
          />

        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background border-border/20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-lg bg-elec-yellow/10">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
            </div>
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Practical Guidance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <FileText className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Pre-Testing Preparation</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Complete all header information including client details, installation description, and test parameters before beginning any testing work</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Error Correction Procedure</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Cross out errors with single neat line, write correct information, and initial with date. Never use correction fluid or erasers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Recording Standards</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Use permanent ink for all test results and maintain neat, legible handwriting. Never use pencil for final documentation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Eye className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Environmental Conditions</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Record relevant environmental conditions (temperature, humidity) that might affect test results or interpretation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Target className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Actual Value Recording</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Record actual test readings with appropriate units, not just pass/fail indicators. This provides valuable trend data for future reference</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Shield className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Authentication Requirements</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Sign, date, and retain all documentation according to professional requirements. Include tester qualifications and certification details</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Settings className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Instrument Documentation</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Include all relevant instrument details: make, model, serial numbers, and current calibration information for traceability</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-card/80 border border-elec-yellow/30 hover:bg-card transition-colors">
              <Database className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">Backup and Storage</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Implement secure storage systems with appropriate backup procedures for indefinite retention and easy retrieval when required</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base mb-2">Professional Tip</p>
                <p className="text-xs sm:text-sm text-white/80">
                  Develop a systematic documentation routine that becomes second nature. Consistent, high-quality documentation practices protect your professional reputation, provide legal protection, and demonstrate competence to clients and authorities. Poor documentation can undermine excellent technical work.
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
                A commercial property suffered an electrical fire six months after a rewiring project. The insurance investigation required proof that proper testing had been conducted and documented according to industry standards.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Documentation Issues Found</h4>
              <p className="text-white/80">
                The electrical contractor provided test sheets, but they were severely deficient: missing instrument calibration dates, illegible readings recorded in pencil, unsigned pages, missing client details, and no clear indication of which circuits had been tested. Several pages were water-damaged and completely illegible.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Investigation Challenges</h4>
              <p className="text-white/80">
                Insurance investigators could not determine whether proper testing had actually been conducted. The illegible pencil entries appeared to have been altered, test instrument details were missing so calibration could not be verified, and the lack of signatures raised questions about who had actually performed the work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Consequences</h4>
              <p className="text-white/80">
                The insurance company delayed settlement pending additional investigation. The electrical contractor faced professional disciplinary action for poor documentation standards. Independent expert testing was required at considerable expense to establish the installation's actual condition, and legal costs mounted rapidly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Final Outcome</h4>
              <p className="text-white/80">
                The contractor lost professional certification and faced civil liability claims. The property owner's insurance coverage was affected, and the contractor's professional indemnity insurance refused to cover the claim due to inadequate documentation demonstrating compliance with professional standards.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-card rounded-lg border border-green-500/20">
              <p className="text-green-700 dark:text-green-300 font-medium">
                ✅ Lesson: Proper documentation protects everyone involved and provides essential evidence of professional competence and regulatory compliance. Poor records can destroy careers and create enormous financial liability.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground">
            <div>
              <h4 className="font-semibold mb-2">Q: Can I use digital devices to complete test sheets on site?</h4>
              <p className="text-white/80">A: Yes, provided the system maintains data integrity and includes appropriate security features to prevent unauthorised alterations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: What if I discover an error in documentation after leaving the site?</h4>
              <p className="text-white/80">A: Contact the client, return to site if necessary, and make corrections following proper procedures with clear notation of when and why changes were made.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: How should I handle test sheets that become damaged during site work?</h4>
              <p className="text-white/80">A: Start fresh documentation and carefully transfer any legible information, noting the reason for replacement to maintain audit trail integrity.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Q: Can test results be recorded in pencil for ease of correction?</h4>
              <p className="text-white/80">A: No, permanent ink is required for all final documentation to prevent unauthorised alterations and maintain document integrity.</p>
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
                  <p className="font-medium text-foreground text-sm sm:text-base">Complete Documentation</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">All header information and test parameters must be recorded</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Permanent Ink</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">All test results must be recorded in permanent ink</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Legal Evidence</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Documentation provides proof of compliance and professional competence</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Retention Requirements</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Records must be retained indefinitely for legal protection</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-center text-sm sm:text-base font-medium text-foreground">
              💡 Remember: Proper documentation provides essential legal protection and demonstrates professional competence!
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz 
            questions={quizQuestions}
            title="Section 6.5 Quiz: Test Sheets and Site Documentation"
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="module6-section6/4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Section 6.4
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Back to Section 6 Overview
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level2Module6Section6_5;