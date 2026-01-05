import { ArrowLeft, ArrowRight, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_5 = () => {
  useSEO(
    "Avoiding Live Testing Where Possible - Level 2 Module 7 Section 5.5",
    "Safe isolation practices and minimising live working in electrical testing"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why is live testing considered dangerous?",
      options: ["It takes longer", "It exposes electricians to shock, burns, and arc flash", "It uses more equipment", "It requires more skill"],
      correctAnswer: 1,
      explanation: "Live testing is dangerous because it exposes electricians to electric shock, severe burns, and arc flash incidents, all of which can be fatal."
    },
    {
      id: 2,
      question: "What regulation underpins the requirement to avoid live testing?",
      options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "CDM Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 require work to be carried out safely, which includes avoiding live testing unless absolutely necessary."
    },
    {
      id: 3,
      question: "Give one example of a test that requires live conditions.",
      options: ["Continuity testing", "Insulation resistance testing", "Earth fault loop impedance testing", "Polarity testing with power off"],
      correctAnswer: 2,
      explanation: "Earth fault loop impedance testing requires the circuit to be live to measure the actual fault current path and impedance values."
    },
    {
      id: 4,
      question: "What should always be done before assuming a circuit is safe to work on?",
      options: ["Check the drawings", "Isolate, lock off, and prove dead", "Ask someone else", "Use better tools"],
      correctAnswer: 1,
      explanation: "Safe isolation procedure must always be followed: isolate the supply, lock it off where possible, and prove dead with a proving unit and voltage indicator."
    },
    {
      id: 5,
      question: "What type of PPE should be worn during live testing?",
      options: ["Any gloves and glasses", "Insulated gloves and safety glasses", "Leather gloves only", "No PPE needed"],
      correctAnswer: 1,
      explanation: "Insulated gloves provide protection against electric shock, while safety glasses protect eyes from arc flash and flying debris."
    },
    {
      id: 6,
      question: "Why must GS38-compliant leads be used for live testing?",
      options: ["They're cheaper", "They have safety features like fused leads and reduced exposed metal", "They're more accurate", "They last longer"],
      correctAnswer: 1,
      explanation: "GS38-compliant leads have safety features including fused leads, insulated probes with minimal exposed metal, and finger guards to reduce shock risk."
    },
    {
      id: 7,
      question: "True or False: Live testing should be treated as a normal part of every job.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Live testing should only be carried out when absolutely necessary and safe isolation is not possible. It should never be routine."
    },
    {
      id: 8,
      question: "What must apprentices never do during live testing?",
      options: ["Ask questions", "Work without close supervision from a competent person", "Use PPE", "Follow procedures"],
      correctAnswer: 1,
      explanation: "Apprentices must never carry out live testing without close supervision from a competent person due to the high risks involved."
    },
    {
      id: 9,
      question: "In the refurbishment project example, what went wrong when testing sockets live?",
      options: ["Wrong equipment used", "Probes slipped causing a short circuit and flashover", "No PPE available", "Poor lighting"],
      correctAnswer: 1,
      explanation: "The electrician's probes slipped while testing live, causing a short circuit that resulted in a flashover, burns, and damage to the consumer unit."
    },
    {
      id: 10,
      question: "How was RCD testing carried out safely in the second example?",
      options: ["Working alone quickly", "With supervision, PPE, GS38 leads, and controlled area", "Using different equipment", "Testing during the day only"],
      correctAnswer: 1,
      explanation: "Safe RCD testing involved supervision, proper PPE, GS38-compliant leads, keeping the area clear of non-essential people, and following strict precautions."
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
              Back to Section 7.5
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
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 7.5.5
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Avoiding Live Testing Where Possible
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Safe isolation as the default; reduce live work to the absolute minimum
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
                  <span>Confirm isolation is possible before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Check lock-off/permit systems are available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Ensure proving unit and voltage indicator are ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Consider if risk assessment justifies any live work</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Live work situations, distractions, poor access, unnecessary risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> GS38-compliant instruments, insulated gloves, safety glasses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Isolation documented, area clear, supervision for apprentices</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Live testing is one of the most hazardous activities in electrical work. Whenever possible, circuits should be isolated and proved dead before any testing or investigation is carried out. While some specific tests do require circuits to be live — such as earth fault loop impedance or RCD testing — the guiding principle for electricians is always to avoid live work unless absolutely necessary. Apprentices must understand when live testing is unavoidable, how to minimise the risks, and why safe isolation is the default approach in every situation.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, you should be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain why live testing is dangerous</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe when live testing may be necessary</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply safe working practices to control risk</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* Section 1 — Safe Isolation as Default */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-emerald-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-400 dark:text-emerald-400 mb-4 text-base">Safe Isolation as the Default Approach</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>Safe isolation is the foundation of electrical safety. Before investigating faults, the electrician should switch off the supply, lock it off where possible, and use a proving unit with a voltage indicator to confirm the circuit is dead. This removes the risk of shock, burns, and arc flash completely.</p>
                    
                    <p>Working live should never be treated as routine or a shortcut to save time. The default position must always be to isolate first, then test. Every electrician should ask themselves: "Can this be done safely with the power off?" In the vast majority of cases, the answer is yes, and taking shortcuts puts lives at risk unnecessarily.</p>
                    
                    <p>Safe isolation procedures must be methodical and documented. This includes identifying the correct isolator, securing it in the off position with locks where possible, placing warning notices, and using a proving unit to confirm the circuit is dead before starting work. The proving unit itself must be tested before and after use to ensure it's working correctly.</p>
                    
                    <p>Lock-off procedures prevent accidental re-energisation while work is in progress. Where multiple trades are working, a multi-lock system ensures no one person can restore the supply while others are still working. Permits to work may also be required in industrial environments to formalise the isolation process.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-isolation-procedure"
            question="What must be done before assuming a circuit is safe to work on?"
            options={["Check the drawings", "Isolate, lock off, and prove dead", "Ask a colleague", "Use different tools"]}
            correctIndex={1}
            explanation="Safe isolation procedure must always be followed: isolate the supply, lock it off where possible, and prove dead with a proving unit and voltage indicator."
          />

          {/* Section 2 — When Live Testing is Unavoidable */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base">When Live Testing is Unavoidable</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>There are limited circumstances where live testing is unavoidable. Examples include measuring earth fault loop impedance (Ze, Zs), verifying polarity under load, testing RCD trip times and ramp testing, measuring prospective fault current, and functional testing of equipment that must be energised to operate correctly.</p>
                    
                    <p>Even in these cases, the risks must be reduced as far as reasonably practicable. This means wearing appropriate PPE such as safety glasses and insulated gloves, ensuring the work area is clear of distractions, and using GS38-compliant instruments with fused leads and finger guards.</p>
                    
                    <p>The work environment must be controlled: adequate lighting, dry conditions, clear access and egress routes, and barriers to prevent interruption. All non-essential personnel should be kept away from the work area during live testing. Emergency procedures must be established before starting work.</p>
                    
                    <p>Risk assessments for live testing must consider the specific hazards: voltage level, available fault current, environmental conditions, access restrictions, and the competency of personnel. Higher voltages and fault levels require more stringent precautions and may require specialist techniques or equipment.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="live-testing-example"
            question="Name a test that requires live conditions."
            options={["Continuity testing", "Insulation resistance", "Earth fault loop impedance", "Polarity (power off)"]}
            correctIndex={2}
            explanation="Earth fault loop impedance testing requires the circuit to be live to measure the actual fault current path and impedance values under normal operating conditions."
          />

          {/* Section 3 — Apprentices and Legal Obligations */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-amber-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 text-base">Apprentices and Legal Obligations</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>Apprentices in particular must not carry out live testing without close supervision from a competent person. The risks are too high for someone still learning the trade to work independently on live systems. Supervision means direct oversight, not just being available nearby if help is needed.</p>
                    
                    <p>The Electricity at Work Regulations 1989 place clear duties on employers and employees to prevent danger. Regulation 4 requires that all electrical systems are constructed and maintained to prevent danger, while Regulation 14 specifically addresses work on or near live conductors. Attempting to work on live equipment without sufficient training or control measures is not only unsafe but also a breach of these regulations.</p>
                    
                    <p>Competency must be demonstrated before any live work is undertaken. This includes understanding the equipment, the hazards, the precautions needed, emergency procedures, and rescue techniques. Training and assessment are legal requirements, not optional extras. Competency records must be maintained and reviewed regularly.</p>
                    
                    <p>Employers have specific duties under the regulations to ensure only competent persons carry out electrical work, provide appropriate equipment and PPE, establish safe systems of work, and provide adequate training. Employees must follow established procedures and report defects or unsafe conditions immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="apprentice-supervision"
            question="Can apprentices perform live testing alone?"
            options={["Yes, if they're experienced", "Yes, with the right tools", "No, they must be supervised by a competent person", "Only simple tests"]}
            correctIndex={2}
            explanation="Apprentices must never carry out live testing without close supervision from a competent person due to the high risks and their developing skill level."
          />

          {/* Section 4 — Practical Guidance */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-emerald-400 mb-4 text-base">Practical Guidance and Documentation</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>The professional approach is always to ask: "Can this test be done with the power off?" If the answer is yes, isolation should take place immediately. Do not take shortcuts or assume live testing is quicker - the time saved is never worth the risk to life and safety.</p>
                    
                    <p>If live testing is absolutely required, plan carefully. Conduct a specific risk assessment, obtain necessary permits, wear appropriate PPE, ensure the area is controlled, and complete the task quickly and efficiently with the correct GS38-compliant equipment. Rushed live work is dangerous live work - plan thoroughly but execute efficiently.</p>
                    
                    <p>Always document the reason for working live and the precautions taken. This provides evidence of a professional approach and helps others learn from your risk assessment and control measures. Documentation also demonstrates compliance with legal duties and can be crucial in accident investigations.</p>
                    
                    <p>Emergency arrangements must be in place before starting live work. This includes having appropriately trained personnel available for rescue, ensuring communication systems work, and having emergency contact numbers readily available. First aid equipment and procedures specific to electrical incidents should be immediately accessible.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="live-work-documentation"
            question="What should be documented when live testing is unavoidable?"
            options={["Only the test results", "The reason for working live and precautions taken", "Just the time taken", "Equipment serial numbers"]}
            correctIndex={1}
            explanation="When live testing is unavoidable, both the justification for working live and all the precautions taken must be documented to demonstrate a professional approach and legal compliance."
          />
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Real-World Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
            {/* Case Study 1 - Poor practice */}
            <div className="rounded-lg p-4 sm:p-6 bg-destructive/5 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-3 sm:mb-4 text-base">Case Study: Unnecessary Live Testing</h3>
              <p className="text-foreground mb-4">
                On a refurbishment project, an electrician attempted to carry out continuity testing on live socket circuits, believing it would save time. His probes slipped, causing a short circuit that resulted in a flashover.
              </p>
              <p className="text-foreground mb-4">
                He suffered burns to his hand, and the consumer unit was badly damaged. The investigation concluded that the test could have been performed with the supply isolated, and the accident was entirely preventable.
              </p>
              <p className="text-destructive font-medium">
                Outcome: Injury and equipment damage from completely avoidable live work.
              </p>
            </div>

            {/* Case Study 2 - Good practice */}
            <div className="rounded-lg p-4 sm:p-6 bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3 sm:mb-4 text-base">Case Study: Safe RCD Testing</h3>
              <p className="text-foreground mb-4">
                On another site, an apprentice working under supervision needed to carry out RCD trip-time testing. The supervisor ensured all non-essential people were kept clear of the area, the apprentice wore full PPE, and GS38-compliant leads were used.
              </p>
              <p className="text-foreground mb-4">
                The test was carried out safely, quickly, and in full compliance with regulations. The area was controlled, the equipment was appropriate, and the apprentice was closely supervised throughout.
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                Outcome: Essential testing completed safely with proper precautions and supervision.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-border/20 pb-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Why should live testing be avoided?</h3>
              <p className="text-sm text-muted-foreground">
                Because it exposes electricians to shock, burns, and arc flash. Live testing puts the electrician at direct risk from electrical energy, which can cause fatal injuries. Safe isolation removes these risks completely.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-border/20 pb-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">When is live testing unavoidable?</h3>
              <p className="text-sm text-muted-foreground">
                For tests such as earth fault loop impedance, polarity verification under load, RCD trip times, and functional testing of equipment that must be energised to operate. These tests require live conditions to provide meaningful results.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-border/20 pb-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">What must always be done before any live test?</h3>
              <p className="text-sm text-muted-foreground">
                Risk assessment, appropriate PPE must be worn, and GS38-compliant equipment must be used. The work area must be controlled, emergency procedures established, and proper supervision arranged for apprentices.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-border/20 pb-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Can apprentices perform live testing alone?</h3>
              <p className="text-sm text-muted-foreground">
                No. They must always be supervised by a competent person. Apprentices are still learning and the risks of live testing are too high for independent work on energised systems.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b-0 pb-0">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">What regulation governs avoiding live testing?</h3>
              <p className="text-sm text-muted-foreground">
                The Electricity at Work Regulations 1989, particularly Regulation 14, which states that no work should be carried out on or near live conductors unless it is unreasonable for it to be dead and suitable precautions are taken.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Key Takeaways</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Isolate and prove dead by default—live work only when absolutely essential</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>If live testing is required: PPE, GS38 equipment, controlled environment, and supervision for apprentices</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Working live without justification or control breaches the Electricity at Work Regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Document reasons and precautions whenever live testing cannot be avoided</span>
            </li>
          </ul>
        </Card>

        {/* Test Your Knowledge */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PPE and Environmental Precautions
            </Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="..">
              Back to Section 5 Overview
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section5_5;