import { ArrowLeft, ArrowRight, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_4 = () => {
  useSEO(
    "PPE and Environmental Precautions During Fault Investigation - Level 2 Module 7 Section 5.4",
    "Combining PPE and environmental controls for safer electrical fault investigation"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why is PPE considered essential in electrical testing?",
      options: ["It looks professional", "It provides protection against shock, burns, and flying debris", "It's required by insurance", "It's optional for experienced electricians"],
      correctAnswer: 1,
      explanation: "PPE provides crucial protection against electrical shock, arc flash burns, and flying debris when faults escalate during testing."
    },
    {
      id: 2,
      question: "Name three common items of PPE for fault investigation.",
      options: ["Hard hat, boots, gloves", "Insulated gloves, safety glasses, protective footwear", "Helmet, vest, knee pads", "Overalls, belt, torch"],
      correctAnswer: 1,
      explanation: "Essential PPE for electrical fault investigation includes insulated gloves (shock protection), safety glasses (debris protection), and protective footwear (prevent earthing)."
    },
    {
      id: 3,
      question: "What is the purpose of flame-retardant clothing?",
      options: ["To look professional", "To limit burn injuries in case of arc fault", "To stay warm", "To be visible"],
      correctAnswer: 1,
      explanation: "Flame-retardant clothing is designed to self-extinguish and limit burn injuries if an electrical arc fault occurs during testing."
    },
    {
      id: 4,
      question: "Why must footwear be protective and insulated?",
      options: ["For comfort", "To prevent earthing through the body", "For durability", "To meet dress code"],
      correctAnswer: 1,
      explanation: "Insulated footwear prevents the completion of an electrical circuit through the body to earth, reducing shock risk."
    },
    {
      id: 5,
      question: "What environmental risks must be checked before testing?",
      options: ["Only lighting levels", "Wet areas, poor lighting, trip hazards, confined spaces", "Temperature only", "Just the weather"],
      correctAnswer: 1,
      explanation: "Environmental hazards include wet/damp conditions, poor lighting, trip hazards, confined spaces, and cluttered work areas that all increase electrical risk."
    },
    {
      id: 6,
      question: "What should be done if water is present in the test area?",
      options: ["Continue carefully", "Stop work, make area safe with drying/rubber matting, then proceed", "Work faster", "Use different equipment"],
      correctAnswer: 1,
      explanation: "Water significantly increases shock risk. Work must stop, the area made safe through drying and/or rubber matting, before testing can continue."
    },
    {
      id: 7,
      question: "True or False: PPE can replace safe working practices.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. PPE is a final layer of protection but cannot replace proper safe working practices and risk assessments."
    },
    {
      id: 8,
      question: "Why should barriers be used in industrial or public environments?",
      options: ["To look professional", "To keep unauthorised people away from the work area", "To store equipment", "To mark territory"],
      correctAnswer: 1,
      explanation: "Barriers prevent unauthorised personnel from entering the test area, protecting them from electrical hazards and preventing interference with testing."
    },
    {
      id: 9,
      question: "In the real-world example, what injury occurred due to lack of PPE?",
      options: ["Electric shock", "Face and eye burns from arc particles", "Cut from tools", "Trip and fall"],
      correctAnswer: 1,
      explanation: "The electrician suffered face and eye burns when molten copper particles from an arc fault hit him because he wasn't wearing safety glasses."
    },
    {
      id: 10,
      question: "How did the apprentice in the basement example ensure testing was carried out safely?",
      options: ["Worked quickly", "Stopped, reported the risks, and waited for temporary lighting and rubber matting", "Used different tools", "Asked for help"],
      correctAnswer: 1,
      explanation: "The apprentice recognised the unsafe conditions (wet floor, poor lighting), stopped work, reported the risks, and waited for proper safety measures before continuing."
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
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.5.4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            PPE and Environmental Precautions During Fault Investigation
          </h1>
          <p className="text-white text-sm sm:text-base">
            Combining PPE and environmental controls for safer electrical fault investigation
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
                  <span>Verify PPE condition: gloves, glasses, footwear, FR clothing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Confirm area is dry and well lit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Remove trip hazards, tidy cables, ensure clear escape route</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Set up barriers/signage for public areas</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Wet floors/condensation, poor lighting, confined space, cluttered area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Insulated gloves, safety glasses, protective footwear, FR clothing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Area dry, adequate lighting, barriers in place, safe footing</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Even with the correct test equipment, electrical fault investigation remains hazardous work. The risks are not only from electricity itself but also from the environment in which testing takes place. Wet areas, confined spaces, poor lighting, and cluttered work areas can all increase danger. Personal protective equipment (PPE) provides a final layer of protection against shock, burns, and injury, while good environmental precautions reduce the likelihood of accidents occurring in the first place. For apprentices, learning to combine PPE with safe working environments is a key professional discipline.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, you should be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Explain why PPE and environmental safety are vital during fault investigation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Identify the main items of PPE used in electrical work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Describe environmental checks that must be carried out before testing begins</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* Section 1 — PPE Essentials */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base">PPE Essentials and Their Purpose</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Insulated gloves:</strong> Reduce the chance of electric shock by providing a barrier between hands and live conductors. Must be regularly inspected for holes, tears, or degradation. Different voltage ratings available - ensure gloves match the system voltage being worked on.</p>
                    
                    <p><strong>Safety glasses:</strong> Protect eyes from sparks, flying debris, and molten metal particles that can occur during arc faults. Essential when working near switchgear or when probing live circuits. Side shields provide additional protection from peripheral hazards.</p>
                    
                    <p><strong>Protective footwear:</strong> Prevents earthing through the body by providing electrical insulation from ground. Must have non-conductive soles and be free from metal components that could create conductive paths. Regular inspection for sole damage critical.</p>
                    
                    <p><strong>Flame-retardant clothing:</strong> Limits burn injuries in the event of an arc fault by self-extinguishing rather than continuing to burn. Made from materials that do not melt and stick to skin. Essential in higher-risk environments like distribution boards and industrial installations.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ppe-flame-retardant"
            question="What is the primary purpose of flame-retardant clothing during testing?"
            options={["To stay warm", "To look professional", "To reduce burn injury in an arc fault", "To be visible to others"]}
            correctIndex={2}
            explanation="Flame-retardant clothing is specifically designed to self-extinguish and limit burn injuries if an electrical arc fault occurs during testing, preventing the clothing from continuing to burn."
          />

          {/* Section 2 — Environmental Precautions */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base">Environmental Precautions and Risk Assessment</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Dry working conditions:</strong> Water and electricity are a deadly combination. Check for leaks, condensation, or standing water before testing. Even damp walls or high humidity can increase shock risk significantly. If dampness cannot be eliminated, additional precautions like rubber matting are essential.</p>
                    
                    <p><strong>Adequate lighting:</strong> Poor lighting leads to mistakes and accidents. Ensure sufficient illumination to clearly see what you're testing, read instrument displays, and identify potential hazards. Temporary lighting may be needed in basements, roof spaces, or when main lighting is isolated.</p>
                    
                    <p><strong>Clear workspace:</strong> Remove trip hazards, tidy cables, and ensure adequate space to move safely without contacting live parts. Tools and equipment should be organised to prevent creating additional hazards. Keep escape routes clear in case of emergency evacuation.</p>
                    
                    <p><strong>Crowd control and barriers:</strong> In commercial or public environments, use barriers and warning signs to keep unauthorised people away. This protects others and prevents interruption during critical safety procedures. Barriers also create a defined safe working zone.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="environmental-water-action"
            question="If the work area is wet, what should you do?"
            options={["Continue carefully", "Work faster to finish quickly", "Stop, make safe with drying/rubber matting, then proceed", "Use different tools"]}
            correctIndex={2}
            explanation="Water significantly increases electric shock risk. Work must stop immediately, the area made safe through drying and/or installation of rubber matting, before testing can safely continue."
          />

          {/* Section 3 — PPE and Environment Link */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-amber-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 text-base">Understanding the PPE-Environment Connection</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>PPE is not a substitute:</strong> Personal protective equipment provides essential protection when things go wrong, but it cannot replace proper safe working practices. The best protection comes from eliminating hazards through good planning and environmental control, with PPE as the final safety barrier.</p>
                    
                    <p><strong>Combined approach essential:</strong> PPE and environmental safety must work together. For example, insulated gloves may reduce shock risk, but if testing in a wet basement with poor footing, the overall risk remains unacceptably high. Both the person and workplace must be prepared.</p>
                    
                    <p><strong>Dynamic risk assessment:</strong> Conditions can change during work. Weather may worsen, lighting may fail, or new hazards may appear. Continuously reassess both PPE effectiveness and environmental conditions throughout the job, not just at the start.</p>
                    
                    <p><strong>Professional responsibility:</strong> Skilled electricians understand that using PPE in unsafe environments gives false confidence. The professional approach is to control environmental risks first, then use appropriate PPE as backup protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ppe-substitute-practices"
            question="True or False: PPE can replace safe working practices."
            options={["True", "False"]}
            correctIndex={1}
            explanation="False. PPE is a final layer of protection but cannot replace proper safe working practices and environmental risk control. The best protection comes from eliminating hazards through good planning."
          />

          {/* Section 4 — Risk Assessment Routine */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base">Quick Risk Assessment Routine</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Pre-work checks:</strong> Before any testing begins, ask: Is the area dry? Is there adequate lighting? Are escape routes clear? Are there trip hazards? Is appropriate PPE available and in good condition? If any answer is 'no', stop and address the issue.</p>
                    
                    <p><strong>Environmental hazard identification:</strong> Look for water sources, poor drainage, inadequate lighting, confined spaces, presence of flammable materials, or unstable surfaces. Consider weather conditions for outdoor work and ventilation for indoor work in enclosed spaces.</p>
                    
                    <p><strong>Stop and report procedure:</strong> If conditions are unsafe and cannot be immediately rectified, the correct professional response is to stop work and report the issue to supervision. Document the hazards identified and actions needed before work can proceed safely.</p>
                    
                    <p><strong>Making areas safe:</strong> Common solutions include installing temporary lighting, laying rubber matting, removing water sources, setting up barriers, or waiting for weather to improve. Never compromise on safety to meet deadlines - accidents cost far more than delays.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="unsafe-environment-action"
            question="What's the correct action if the environment is unsafe for testing?"
            options={["Continue but be extra careful", "Work faster to minimise exposure", "Stop work, report, make safe before continuing", "Use more PPE to compensate"]}
            correctIndex={2}
            explanation="If environmental conditions are unsafe, work must stop immediately. The issue should be reported and the area made safe before testing can continue. PPE alone cannot compensate for unsafe environmental conditions."
          />

        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Applications</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 border border-destructive/30 bg-destructive/5">
              <h3 className="font-semibold text-destructive mb-2 text-sm sm:text-base">Case Study: Arc Flash Injury</h3>
              <p className="text-xs sm:text-xs sm:text-sm text-white mb-3">
                An experienced electrician was testing a 400V distribution board when a short circuit caused an arc fault. Without safety glasses, molten copper particles struck his face and eyes, causing serious burns and temporary blindness.
              </p>
              <p className="text-xs sm:text-sm text-white">
                <strong>Lesson:</strong> Even routine testing can escalate rapidly. PPE is essential regardless of experience level.
              </p>
            </div>
            
            <div className="rounded-lg p-4 border border-elec-yellow/30 bg-elec-yellow/5">
              <h3 className="font-semibold text-emerald-600 dark:text-elec-yellow mb-2 text-sm sm:text-base">Case Study: Environmental Awareness</h3>
              <p className="text-xs sm:text-xs sm:text-sm text-white mb-3">
                An apprentice was asked to test circuits in a basement with a wet floor and poor lighting. Rather than proceeding, they stopped work and reported the unsafe conditions. Testing resumed only after temporary lighting was installed and rubber matting laid.
              </p>
              <p className="text-xs sm:text-sm text-white">
                <strong>Lesson:</strong> Recognising and reporting unsafe conditions is professional responsibility, not hesitation.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-primary/5 border-primary/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Key Takeaways</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>PPE provides essential protection but cannot replace safe working practices</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Environmental hazards must be identified and controlled before testing begins</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Stop work and report if conditions are unsafe - no testing deadline justifies compromising safety</span>
            </li>
          </ul>
        </Card>

        {/* Quiz Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: GS38 Testing
            </Link>
          </Button>
          
          <Button className="flex-1" asChild>
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

export default Module7Section5_4;