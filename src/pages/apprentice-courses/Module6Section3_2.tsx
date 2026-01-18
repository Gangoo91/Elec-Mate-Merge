import { ArrowLeft, Shield, AlertTriangle, Target, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_2 = () => {
  useSEO(
    "GS38 compliance and tester safety - Level 2 Electrical Testing & Inspection",
    "Understanding and implementing GS38 safety requirements for electrical test instruments"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does GS38 relate to?",
      options: ["Building regulations", "Test equipment safety", "Fire alarms", "Electrical theory"],
      correctAnswer: 1,
      explanation: "GS38 is HSE guidance specifically for test equipment safety in electrical work."
    },
    {
      id: 2,
      question: "What is the maximum exposed length of a GS38 probe tip?",
      options: ["10 mm", "6 mm", "4 mm", "2 mm"],
      correctAnswer: 2,
      explanation: "GS38 specifies that probe tips must not have more than 4 mm of exposed metal."
    },
    {
      id: 3,
      question: "Why must test leads be fused?",
      options: ["To protect against short circuits", "To make readings faster", "To improve accuracy", "To save battery"],
      correctAnswer: 0,
      explanation: "Fused leads protect the user and instrument from dangerous fault currents."
    },
    {
      id: 4,
      question: "Which rating indicates a tester's suitability for different environments?",
      options: ["CAT rating", "IP rating", "Voltage scale", "Battery rating"],
      correctAnswer: 0,
      explanation: "CAT (Category) ratings indicate the maximum transient voltage the instrument can safely handle."
    },
    {
      id: 5,
      question: "What should you always do before and after using a voltage tester?",
      options: ["Shake it", "Prove it on a proving unit", "Turn it off and on", "Check the leads"],
      correctAnswer: 1,
      explanation: "Proving the tester ensures it's working correctly before and after use."
    },
    {
      id: 6,
      question: "True or False: Neon screwdrivers are GS38 compliant.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Neon screwdrivers are not considered safe or reliable for proving dead according to GS38."
    },
    {
      id: 7,
      question: "Which of these is not a GS38 requirement?",
      options: ["Insulated leads", "Exposed 12 mm probes", "Fused leads", "Shrouded probes"],
      correctAnswer: 1,
      explanation: "GS38 specifically prohibits exposed probe tips greater than 4 mm."
    },
    {
      id: 8,
      question: "What could happen if cracked insulation is ignored?",
      options: ["Slightly inaccurate readings", "Electric shock or arcing", "No effect", "Better conductivity"],
      correctAnswer: 1,
      explanation: "Damaged insulation can expose the user to dangerous voltages and cause arcing."
    },
    {
      id: 9,
      question: "Which category rating is typically required for distribution board testing?",
      options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
      correctAnswer: 2,
      explanation: "CAT III is typically required for distribution board testing due to higher transient voltages."
    },
    {
      id: 10,
      question: "Why is GS38 compliance essential?",
      options: ["To pass exams", "To ensure safe live testing", "To avoid paperwork", "To save money"],
      correctAnswer: 1,
      explanation: "GS38 compliance is essential for ensuring the safety of electricians during live testing work."
    }
  ];

  const faqs = [
    {
      question: "Can I still use my old multimeter if the leads are not shrouded?",
      answer: "No, GS38 requires properly shrouded probes for safe testing. Replace the leads immediately with GS38-compliant alternatives."
    },
    {
      question: "Why do I need fused leads?",
      answer: "Fused leads protect both you and the instrument if the circuit suddenly faults, limiting dangerous current flow and preventing equipment damage."
    },
    {
      question: "Are cheap testers safe if they work?",
      answer: "Not necessarily. If they are not GS38-compliant, they are unsafe and should not be used. Quality and compliance are more important than cost."
    },
    {
      question: "What's the difference between CAT II and CAT III ratings?",
      answer: "CAT II is for local level circuits (up to 600V), while CAT III is for distribution level with higher transient voltages (up to 1000V). Use the appropriate rating for your application."
    },
    {
      question: "How often should I replace test leads?",
      answer: "Replace immediately if damaged, or as recommended by the manufacturer - typically every 2-3 years with regular use. Keep spare sets available."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 6.3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.3.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              GS38 Compliance and Tester Safety
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding and implementing GS38 safety requirements for electrical test instruments
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-lg font-semibold text-white">Spot it in 30 Seconds</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <p className="font-medium text-white mb-2">Key Points</p>
                <ul className="space-y-1.5">
                  <li>• GS38 compliance: shrouded probes, fused leads</li>
                  <li>• Visual inspection: cracked insulation, damaged leads</li>
                  <li>• CAT rating verification: matches installation type</li>
                  <li>• Proving unit test: before and after voltage testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Spot / Use / Check</p>
                <ul className="space-y-1.5">
                  <li><strong>Spot:</strong> Non-compliant equipment, exposed probes</li>
                  <li><strong>Use:</strong> GS38-compliant testers; proving units</li>
                  <li><strong>Check:</strong> Probe shrouding ≤4mm; CAT ratings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical testing instruments are critical tools for ensuring safety and compliance in electrical installations. However, test instruments themselves can pose significant safety risks if they are not compliant with recognised safety standards.
              </p>
              <p>
                GS38 is a guidance document published by the Health and Safety Executive (HSE) that specifies the safety requirements for electrical test equipment used in hazardous live environments. Understanding and implementing GS38 compliance is essential for protecting electricians and ensuring accurate, safe testing procedures.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you will be able to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain what GS38 is and why it is important for electrical testing safety.</li>
              <li>Identify the key features of GS38-compliant test equipment.</li>
              <li>Recognise the dangers associated with non-compliant test equipment.</li>
              <li>Describe safe testing practices and procedures.</li>
              <li>Apply GS38 principles to instrument selection and use.</li>
            </ul>
          </section>

          {/* What is GS38? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What is GS38?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                GS38 (Guidance on the Use of Electrical Test Equipment) is a Health and Safety Executive (HSE) document that provides essential safety guidance for electrical test equipment used in potentially hazardous environments.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-white mb-3">Primary Purpose</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Provides HSE safety guidance for electrical test equipment design</li>
                  <li>• Prevents accidents and injuries from unsafe test instruments</li>
                  <li>• Establishes minimum safety requirements for probe and lead construction</li>
                  <li>• Reduces risk of electric shock and arc flash incidents</li>
                  <li>• Ensures test equipment is suitable for live working environments</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <h3 className="font-semibold text-white mb-3">Key Requirements</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Maximum 4mm exposed probe tip to minimise contact risk</li>
                  <li>• Shrouded probe design to prevent accidental contact</li>
                  <li>• Fused test leads to limit fault current</li>
                  <li>• Appropriate CAT rating for installation voltage and environment</li>
                  <li>• Robust construction to withstand industrial use</li>
                  <li>• Clear markings and identification on all components</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="gs38-check"
            question="Who publishes GS38 guidance?"
            options={["IET", "HSE", "NICEIC", "BSI"]}
            correctIndex={1}
            explanation="GS38 is published by the Health and Safety Executive (HSE) to provide safety guidance for electrical test equipment."
          />

          {/* GS38 Safety Features */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              GS38 Safety Features
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                GS38-compliant test equipment incorporates specific design features to minimise the risk of electric shock and ensure safe operation in live electrical environments.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-white mb-3">Essential Safety Features</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Shrouded probes with maximum 4mm exposed tip</li>
                  <li>• Fused test leads providing current limiting protection</li>
                  <li>• Robust construction for industrial environments</li>
                  <li>• Appropriate CAT ratings for the electrical environment</li>
                  <li>• Clear marking of voltage ratings and safety information</li>
                  <li>• Double insulation on leads</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <h3 className="font-semibold text-white mb-3">Probe Design Requirements</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Maximum 4mm exposed metal tip to reduce contact area</li>
                  <li>• Spring-loaded shrouds that retract under pressure</li>
                  <li>• Insulated probe body with finger guards</li>
                  <li>• Secure connection to test leads without exposed metal</li>
                  <li>• Clear identification markings and colour coding</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="probe-tip-check"
            question="What is the maximum exposed probe tip length for GS38 compliance?"
            options={["2mm", "4mm", "6mm", "10mm"]}
            correctIndex={1}
            explanation="GS38 specifies a maximum of 4mm exposed probe tip to minimise the risk of accidental contact."
          />

          {/* Dangers of Non-Compliant Equipment */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Dangers of Non-Compliant Equipment
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Using non-compliant test equipment poses serious safety risks and can result in severe injury or death. Understanding these dangers is critical for making informed equipment choices.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-semibold text-red-400 mb-3">Serious Safety Risks</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Electric shock from direct contact through exposed probes</li>
                  <li>• Arc flash incidents causing severe burns and blast injuries</li>
                  <li>• Equipment damage from unfused leads during fault conditions</li>
                  <li>• Inaccurate readings due to poor construction</li>
                  <li>• Fire risk from overheating due to inadequate current protection</li>
                  <li>• Legal liability for non-compliance with health and safety regulations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <h3 className="font-semibold text-amber-400 mb-3">Common Non-Compliant Features</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Excessive exposed probe tips (&gt;4mm)</li>
                  <li>• Unfused test leads allowing dangerous fault currents</li>
                  <li>• Poor insulation quality leading to breakdown</li>
                  <li>• Inadequate CAT ratings for the intended application</li>
                  <li>• Cheap construction using substandard materials</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Safe Testing Practices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Safe Testing Practices
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-white mb-3">Essential Testing Procedures</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li>• Prove before and after: Test instruments on known live source</li>
                  <li>• Visual inspection: Check test equipment for damage before each use</li>
                  <li>• Appropriate PPE: Use insulated gloves and safety glasses</li>
                  <li>• Proper procedure: Follow manufacturer's instructions</li>
                  <li>• Environmental awareness: Consider conditions affecting safety</li>
                  <li>• Regular calibration: Ensure instruments are within specification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-white mb-3">Pre-Use Safety Checks</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li>• Inspect leads for cuts, nicks, or damaged insulation</li>
                  <li>• Check probe shrouds are intact and functioning</li>
                  <li>• Verify CAT rating is appropriate for the installation</li>
                  <li>• Confirm calibration is current and within validity period</li>
                  <li>• Test proving unit functionality before use</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-practices-check"
            question="What should you do before and after using test instruments?"
            options={["Clean the probes", "Prove on known live source", "Check the battery", "Read the manual"]}
            correctIndex={1}
            explanation="You should always prove test instruments on a known live source before and after use to ensure they are working correctly."
          />

          {/* CAT Ratings */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              CAT Rating Selection
            </h2>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50 mb-4">
              <h3 className="font-semibold text-white mb-3">Understanding CAT Ratings</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li><strong>CAT I:</strong> Electronic equipment, domestic appliances (300V max)</li>
                <li><strong>CAT II:</strong> Local level circuits, socket outlets (600V max)</li>
                <li><strong>CAT III:</strong> Distribution boards, fixed installations (1000V max)</li>
                <li><strong>CAT IV:</strong> Origin of supply, overhead lines (1500V max)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-medium text-amber-400 mb-2">Important</p>
              <p className="text-sm text-white/80">
                Always use equipment with a CAT rating that matches or exceeds the environment you're working in. Using equipment with an inadequate CAT rating can result in equipment failure, injury, or death.
              </p>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <h3 className="font-semibold text-amber-400 mb-3">Case Study: Non-Compliant Equipment Incident</h3>
              <p className="text-white/80 mb-4">
                An electrician was testing a commercial three-phase distribution board using non-GS38 compliant test probes. The probes had excessive exposed tips (10mm) and no finger guards. During voltage testing, the electrician accidentally contacted both probes simultaneously while reaching across the panel.
              </p>
              <p className="text-white/80 mb-4">
                The result was an immediate short circuit between phases, causing an arc flash that resulted in second-degree burns to the electrician's hands and face, damaged equipment, and a site shutdown lasting several days.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-red-500/10 rounded border-l-2 border-red-500/50">
                  <p className="font-medium text-red-400 mb-1">What Went Wrong</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Non-compliant probes with excessive exposed tips</li>
                    <li>• No finger guards or shrouding</li>
                    <li>• Poor working practice</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-500/10 rounded border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-1">Prevention with GS38</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Shrouded probes would have prevented contact</li>
                    <li>• 4mm tip limit would have reduced arc energy</li>
                    <li>• Fused leads would have limited fault current</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-sm text-white/80">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-elec-yellow" />
                <h2 className="text-lg font-semibold text-white">Pocket Guide: GS38 Essentials</h2>
              </div>
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Check probe shrouds: max 4mm exposed tip</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Verify fused leads: current limiting protection</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Confirm CAT rating: matches installation voltage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Visual inspection: check for damage before use</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Prove before/after: test on known live source</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-white/90">Never use: neon screwdrivers for proving dead</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Shield className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                <p className="font-medium text-white text-sm">GS38 Purpose</p>
                <p className="text-xs text-white/60">HSE safety guidance</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Eye className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Safety Features</p>
                <p className="text-xs text-white/60">Shrouded probes, fused leads</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Compliance</p>
                <p className="text-xs text-white/60">4mm max tip, CAT ratings</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Risks</p>
                <p className="text-xs text-white/60">Shock, arc flash, damage</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Target className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Best Practice</p>
                <p className="text-xs text-white/60">Prove, inspect, comply</p>
              </div>
            </div>
            <p className="text-white/80">
              GS38 compliance is not optional - it's a legal and professional requirement that protects electricians and ensures safe testing practices. Always use compliant equipment and follow proper procedures to prevent accidents and maintain professional standards.
            </p>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Section 6.3.2 Knowledge Check" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Introduction to Test Instruments
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-3">
                Next: Setting Up and Zeroing
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section3_2;
