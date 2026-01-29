import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hierarchy of Control - HNC Module 1 Section 2.3";
const DESCRIPTION = "Master the hierarchy of control for building services: elimination, substitution, engineering controls, administrative controls and PPE with practical electrical examples.";

const quickCheckQuestions = [
  {
    id: "most-effective-control",
    question: "Which control measure is considered the MOST effective in the hierarchy?",
    options: ["PPE", "Administrative controls", "Elimination", "Engineering controls"],
    correctIndex: 2,
    explanation: "Elimination is the most effective control as it completely removes the hazard. This should always be considered first before moving down the hierarchy to less effective controls."
  },
  {
    id: "substitution-example",
    question: "Which is an example of substitution in building services?",
    options: ["Wearing gloves when handling cables", "Replacing solvent-based adhesive with water-based", "Installing warning signs", "Providing training on safe working"],
    correctIndex: 1,
    explanation: "Substitution replaces a hazardous substance or process with a less hazardous alternative. Replacing solvent-based adhesive with water-based reduces exposure to harmful fumes."
  },
  {
    id: "engineering-control",
    question: "Which of the following is an engineering control?",
    options: ["Permit to work system", "Safety goggles", "Local exhaust ventilation", "Toolbox talk"],
    correctIndex: 2,
    explanation: "Local exhaust ventilation (LEV) is an engineering control that physically removes hazardous fumes at source. It doesn't rely on worker behaviour or PPE."
  },
  {
    id: "ppe-position",
    question: "Why is PPE considered the 'last resort' in the hierarchy of control?",
    options: ["It is too expensive", "It relies on correct usage and only protects the wearer", "It is difficult to obtain", "It slows down work too much"],
    correctIndex: 1,
    explanation: "PPE is the least effective control because it relies entirely on correct selection, fitting and consistent use. It only protects the individual wearer and doesn't eliminate or reduce the hazard itself."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the correct order of the hierarchy of control, from most to least effective?",
    options: [
      "PPE, Administrative, Engineering, Substitution, Elimination",
      "Elimination, Substitution, Engineering, Administrative, PPE",
      "Engineering, Elimination, Substitution, Administrative, PPE",
      "Substitution, Elimination, Engineering, PPE, Administrative"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy runs from most effective (Elimination) to least effective (PPE). Remember: ESEA-P - Eliminate, Substitute, Engineer, Administrate, Protect."
  },
  {
    id: 2,
    question: "A contractor is planning to install cables in a ceiling void containing asbestos. What is the BEST control measure?",
    options: [
      "Provide RPE and protective clothing",
      "Use an alternative cable route that avoids the asbestos",
      "Provide asbestos awareness training",
      "Install warning signs at access points"
    ],
    correctAnswer: 1,
    explanation: "Using an alternative route eliminates the asbestos exposure risk entirely. This is the most effective control and should be considered before relying on PPE or administrative controls."
  },
  {
    id: 3,
    question: "Which control measure would be classified as 'administrative'?",
    options: [
      "Installing interlocked guards on machinery",
      "Using battery-powered tools instead of mains",
      "Implementing a permit to work system",
      "Providing hearing protection in plant rooms"
    ],
    correctAnswer: 2,
    explanation: "Permit to work systems are administrative controls - they rely on procedures and human behaviour rather than physical barriers. They manage how work is done rather than eliminating the hazard."
  },
  {
    id: 4,
    question: "An electrician needs to work on a live distribution board. What combination of controls should be applied?",
    options: [
      "PPE only - insulated gloves and face shield",
      "Elimination (isolate if possible), engineering (barriers), administrative (permit), PPE",
      "Warning signs and safety briefing only",
      "Training and competence checks only"
    ],
    correctAnswer: 1,
    explanation: "Live working requires multiple layers of control. First consider if isolation is possible (elimination), use barriers (engineering), follow permit systems (administrative), and use appropriate PPE as additional protection."
  },
  {
    id: 5,
    question: "Installing acoustic enclosures around noisy plant equipment is an example of which control type?",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 2,
    explanation: "Acoustic enclosures are engineering controls - they physically contain the noise at source. The hazard isn't eliminated but is controlled through physical measures that don't rely on worker behaviour."
  },
  {
    id: 6,
    question: "Why should controls higher in the hierarchy be prioritised?",
    options: [
      "They are always cheaper to implement",
      "They are more reliable and don't depend on human behaviour",
      "They are required by law for all hazards",
      "They are easier to monitor and maintain"
    ],
    correctAnswer: 1,
    explanation: "Controls higher in the hierarchy (elimination, substitution, engineering) are more reliable because they don't depend on people remembering to follow procedures or wear PPE correctly. They provide consistent protection."
  },
  {
    id: 7,
    question: "A building services contractor replaces 110V power tools with battery-powered alternatives for site work. This is an example of:",
    options: [
      "Elimination - removing the electrical shock hazard",
      "Substitution - replacing mains power with battery",
      "Engineering control - using lower voltage",
      "Both A and B are correct"
    ],
    correctAnswer: 3,
    explanation: "This could be viewed as elimination (no trailing cables, no shock from mains) or substitution (replacing mains with battery). Both interpretations are valid - the key point is it's high in the hierarchy."
  },
  {
    id: 8,
    question: "What is the main limitation of administrative controls?",
    options: [
      "They are expensive to implement",
      "They require specialist equipment",
      "They rely on people following procedures correctly",
      "They cannot be used for electrical hazards"
    ],
    correctAnswer: 2,
    explanation: "Administrative controls depend entirely on human behaviour - people must follow procedures, read signs, and comply with rules. Human error, complacency or shortcuts can render them ineffective."
  },
  {
    id: 9,
    question: "When specifying PPE for electrical work, which factor is MOST important?",
    options: [
      "The PPE should be the cheapest option available",
      "PPE must be correctly rated for the hazard level",
      "All workers should use identical PPE",
      "PPE should match the company colours"
    ],
    correctAnswer: 1,
    explanation: "PPE must be correctly rated for the specific hazard - for example, insulating gloves must be rated for the voltage being worked on. Using incorrectly rated PPE provides false confidence and inadequate protection."
  },
  {
    id: 10,
    question: "Under the Management of Health and Safety at Work Regulations, employers must:",
    options: [
      "Always provide PPE regardless of other controls",
      "Apply the hierarchy of control when assessing risks",
      "Use elimination for every identified hazard",
      "Provide administrative controls before engineering controls"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control is a legal requirement under MHSWR. Employers must consider controls in order of effectiveness, though the most reasonably practicable option for each specific situation should be selected."
  },
  {
    id: 11,
    question: "Providing toolbox talks on manual handling techniques is an example of:",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 3,
    explanation: "Training and toolbox talks are administrative controls. They aim to change behaviour and improve awareness but rely on workers applying what they've learned consistently."
  },
  {
    id: 12,
    question: "Which combination represents applying multiple levels of the hierarchy correctly?",
    options: [
      "Signs, training, and PPE only",
      "Eliminate where possible, guard remaining hazards, train staff, provide PPE",
      "PPE for all hazards with training on correct use",
      "Engineering controls only without any PPE"
    ],
    correctAnswer: 1,
    explanation: "The best approach is layered: eliminate what you can, engineer controls for remaining hazards, implement administrative procedures, and provide PPE as additional protection. This provides defence in depth."
  }
];

const faqs = [
  {
    question: "Can I just use PPE if it's easier than implementing other controls?",
    answer: "No. The hierarchy of control is a legal requirement under the Management of Health and Safety at Work Regulations 1999. Employers must consider controls in order of effectiveness - elimination first, PPE last. While 'reasonably practicable' allows flexibility, you must be able to demonstrate why higher-level controls weren't implemented. PPE should never be the first choice simply for convenience."
  },
  {
    question: "What if complete elimination isn't possible?",
    answer: "If elimination isn't reasonably practicable, move down the hierarchy. Consider substitution (can you use something less hazardous?), then engineering controls (can you isolate or contain the hazard?), then administrative controls (procedures, training, supervision), and finally PPE. Often the best approach combines multiple levels - for example, engineering controls plus PPE for additional protection."
  },
  {
    question: "How does the hierarchy apply to electrical hazards specifically?",
    answer: "For electrical work: Elimination means designing out the need for electrical work, or isolating supplies. Substitution might mean using battery tools or SELV circuits. Engineering controls include RCDs, insulated tools, and physical barriers. Administrative controls are permits to work, safe isolation procedures, and competency requirements. PPE includes insulating gloves, arc flash suits, and safety footwear."
  },
  {
    question: "Who is responsible for applying the hierarchy of control?",
    answer: "Primary responsibility lies with the employer under HSWA 1974 and MHSWR 1999. However, designers have duties under CDM 2015 to eliminate hazards through design. Contractors must plan work using the hierarchy. Self-employed persons have the same duties for their own and others' safety. Everyone in the supply chain has a role in applying appropriate controls."
  },
  {
    question: "What's the difference between isolation and guarding?",
    answer: "Both are engineering controls but work differently. Isolation separates the hazard from people - such as acoustic enclosures or remote operation. Guarding prevents access to the hazard - such as interlocked machine guards or fixed barriers around live equipment. Isolation is generally preferred as it provides more reliable protection, but guarding is appropriate when access is occasionally needed."
  },
  {
    question: "How do I document the hierarchy of control in a risk assessment?",
    answer: "Your risk assessment should show the thought process: identify the hazard, consider elimination, explain why it can or can't be eliminated, then work through substitution, engineering, administrative and PPE options. Document what controls are selected and why higher-level controls weren't reasonably practicable. This demonstrates legal compliance and provides an audit trail."
  }
];

const HNCModule1Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hierarchy of Control
          </h1>
          <p className="text-white/80">
            The systematic approach to managing workplace hazards from most to least effective controls
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Elimination:</strong> Remove the hazard completely</li>
              <li className="pl-1"><strong>Substitution:</strong> Replace with less hazardous alternative</li>
              <li className="pl-1"><strong>Engineering:</strong> Isolate, guard, or ventilate</li>
              <li className="pl-1"><strong>Administrative:</strong> Procedures, training, signage</li>
              <li className="pl-1"><strong>PPE:</strong> Last resort protection for the individual</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Legal basis:</strong> MHSWR 1999, CDM 2015</li>
              <li className="pl-1"><strong>Application:</strong> Risk assessments, method statements</li>
              <li className="pl-1"><strong>Electrical work:</strong> Isolation, permits, PPE layers</li>
              <li className="pl-1"><strong>Principle:</strong> Most effective first, PPE last</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the five levels of the hierarchy of control in order",
              "Apply elimination and substitution principles to building services",
              "Identify appropriate engineering controls for electrical hazards",
              "Understand the role and limitations of administrative controls",
              "Select and specify PPE as a last line of defence",
              "Combine multiple control levels for effective risk management"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Elimination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Elimination - Removing the Hazard Completely
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Elimination is the most effective control measure because it completely removes the hazard
              from the workplace. When a hazard is eliminated, there is no possibility of harm from that
              source - no reliance on barriers, procedures or protective equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Principles of elimination:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Consider elimination at the design stage - it's easier and cheaper</li>
                <li className="pl-1">Question whether the hazardous activity is actually necessary</li>
                <li className="pl-1">Design out the need for hazardous work where possible</li>
                <li className="pl-1">Elimination provides 100% protection with zero ongoing cost</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Elimination Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Elimination Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working at height</td>
                      <td className="border border-white/10 px-3 py-2">Pre-fabricate at ground level</td>
                      <td className="border border-white/10 px-3 py-2">Assemble cable trays, containment on floor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical shock</td>
                      <td className="border border-white/10 px-3 py-2">Isolate supply before work</td>
                      <td className="border border-white/10 px-3 py-2">Safe isolation removes the hazard entirely</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Asbestos exposure</td>
                      <td className="border border-white/10 px-3 py-2">Route cables around asbestos</td>
                      <td className="border border-white/10 px-3 py-2">Alternative route avoids any disturbance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined space entry</td>
                      <td className="border border-white/10 px-3 py-2">External installation point</td>
                      <td className="border border-white/10 px-3 py-2">Design allows work from outside the space</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manual handling</td>
                      <td className="border border-white/10 px-3 py-2">Specify smaller, lighter equipment</td>
                      <td className="border border-white/10 px-3 py-2">Multiple smaller units instead of one heavy one</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>CDM 2015 Duty:</strong> Designers must eliminate hazards where reasonably practicable. This includes electrical designers specifying systems that minimise hazardous installation and maintenance work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Substitution */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Substitution - Replacing with Less Hazardous Alternatives
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When elimination isn't possible, substitution replaces a hazardous substance, process or
              equipment with something less hazardous. The hazard still exists but in a reduced form
              that presents less risk to workers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Principles of substitution:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Consider less hazardous alternatives for every specified material</li>
                <li className="pl-1">Evaluate whether the substitute creates different hazards</li>
                <li className="pl-1">Balance reduced risk against technical performance requirements</li>
                <li className="pl-1">Document the substitution decision in risk assessments</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Substance Substitution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Water-based instead of solvent-based products</li>
                  <li className="pl-1">Pre-formed gaskets instead of poured sealants</li>
                  <li className="pl-1">Mechanical fixings instead of chemical anchors</li>
                  <li className="pl-1">LED instead of fluorescent (eliminates mercury)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Substitution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery tools instead of mains-powered</li>
                  <li className="pl-1">110V CTE instead of 230V on site</li>
                  <li className="pl-1">SELV (12/24V) for wet locations</li>
                  <li className="pl-1">Quieter plant to reduce noise exposure</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Substitution Assessment Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Is the substitute genuinely less hazardous overall?</li>
                <li className="pl-1">Does it introduce new or different hazards?</li>
                <li className="pl-1">Will it perform the required function adequately?</li>
                <li className="pl-1">Is the cost increase proportionate to risk reduction?</li>
                <li className="pl-1">Are workers trained on the substitute material/equipment?</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Substitution must reduce overall risk, not just transfer it. Always assess the full hazard profile of any substitute.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Engineering Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Engineering Controls - Isolation, Guarding and Ventilation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering controls use physical means to prevent or reduce exposure to hazards. Unlike
              administrative controls or PPE, they don't rely on human behaviour - once installed, they
              provide consistent protection regardless of worker actions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of engineering controls:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolation:</strong> Physically separating the hazard from workers</li>
                <li className="pl-1"><strong>Guarding:</strong> Barriers preventing access to hazardous areas</li>
                <li className="pl-1"><strong>Ventilation:</strong> Removing hazardous substances from the air</li>
                <li className="pl-1"><strong>Enclosure:</strong> Containing hazards within sealed systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Engineering Controls</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Engineering Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical shock</td>
                      <td className="border border-white/10 px-3 py-2">RCD protection</td>
                      <td className="border border-white/10 px-3 py-2">30mA RCD on socket circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc flash</td>
                      <td className="border border-white/10 px-3 py-2">Enclosed switchgear</td>
                      <td className="border border-white/10 px-3 py-2">IP-rated enclosures, arc-resistant panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contact with live parts</td>
                      <td className="border border-white/10 px-3 py-2">Insulation and barriers</td>
                      <td className="border border-white/10 px-3 py-2">Finger-safe terminals, shrouded busbars</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise</td>
                      <td className="border border-white/10 px-3 py-2">Acoustic enclosures</td>
                      <td className="border border-white/10 px-3 py-2">Plant rooms, generator housing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fumes/dust</td>
                      <td className="border border-white/10 px-3 py-2">Local exhaust ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Extraction at soldering stations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotating machinery</td>
                      <td className="border border-white/10 px-3 py-2">Interlocked guards</td>
                      <td className="border border-white/10 px-3 py-2">Motor couplings, fan drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Falls from height</td>
                      <td className="border border-white/10 px-3 py-2">Permanent edge protection</td>
                      <td className="border border-white/10 px-3 py-2">Roof-mounted plant access routes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of Engineering Controls</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Work automatically - don't require active worker participation</li>
                <li className="pl-1">Provide consistent, reliable protection 24/7</li>
                <li className="pl-1">Cannot be bypassed as easily as administrative controls</li>
                <li className="pl-1">Protect everyone in the area, not just individuals</li>
                <li className="pl-1">Once installed, have relatively low ongoing costs</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>PUWER requirement:</strong> The Provision and Use of Work Equipment Regulations require that guards and protection devices are suitable, maintained in efficient working order, and not easily bypassed or disabled.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Administrative Controls and PPE */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Administrative Controls and PPE - The Lower Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Administrative controls and PPE are the lower levels of the hierarchy. They are often
              necessary but should supplement, not replace, higher-level controls. Both depend on
              human behaviour for effectiveness, which makes them inherently less reliable.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Administrative Controls</p>
              <p className="text-sm text-white/90 mb-3">
                These are procedures, policies and practices that control how work is performed.
                They reduce exposure by changing the way people work rather than eliminating or
                engineering out the hazard.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs font-medium text-white mb-2">Types of Administrative Controls</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-inside">
                    <li>Permit to work systems</li>
                    <li>Safe systems of work (method statements)</li>
                    <li>Training and competency assessment</li>
                    <li>Warning signs and labels</li>
                    <li>Job rotation to limit exposure time</li>
                    <li>Supervision and monitoring</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs font-medium text-white mb-2">Building Services Examples</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-inside">
                    <li>Electrical isolation permits</li>
                    <li>Hot work permits</li>
                    <li>Confined space entry procedures</li>
                    <li>Toolbox talks and briefings</li>
                    <li>Site inductions</li>
                    <li>Daily safety inspections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Personal Protective Equipment (PPE)</p>
              <p className="text-sm text-white/90 mb-3">
                PPE is the last line of defence. It protects only the individual wearing it and only
                when correctly selected, fitted, worn and maintained. It should never be the sole
                control measure for significant hazards.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PPE Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard/Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical shock</td>
                      <td className="border border-white/10 px-3 py-2">Insulating gloves</td>
                      <td className="border border-white/10 px-3 py-2">Class 00-4 per BS EN 60903</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc flash</td>
                      <td className="border border-white/10 px-3 py-2">Arc-rated clothing, face shield</td>
                      <td className="border border-white/10 px-3 py-2">Arc rating (cal/cm²) to match risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Head injury</td>
                      <td className="border border-white/10 px-3 py-2">Safety helmet</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 397 industrial helmet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Eye injury</td>
                      <td className="border border-white/10 px-3 py-2">Safety glasses/goggles</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 166 eye protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise (85+ dB)</td>
                      <td className="border border-white/10 px-3 py-2">Hearing protection</td>
                      <td className="border border-white/10 px-3 py-2">SNR rating adequate for exposure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Foot injury</td>
                      <td className="border border-white/10 px-3 py-2">Safety footwear</td>
                      <td className="border border-white/10 px-3 py-2">S3 for construction sites</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Limitations of PPE</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Only protects the wearer - doesn't remove the hazard</li>
                <li className="pl-1">Relies on correct selection for the specific hazard</li>
                <li className="pl-1">Must be correctly fitted to each individual</li>
                <li className="pl-1">Effectiveness depends on consistent, correct use</li>
                <li className="pl-1">Can be uncomfortable, leading to non-compliance</li>
                <li className="pl-1">Requires regular inspection, maintenance and replacement</li>
                <li className="pl-1">May create additional hazards (reduced visibility, hearing, dexterity)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>PPE Regulations:</strong> The Personal Protective Equipment at Work Regulations 1992 require employers to provide suitable PPE free of charge, ensure it is properly maintained, and provide training on its use.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Applying the Hierarchy - Worked Example</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario: Working on a Live Distribution Board</h3>
              <p className="text-sm text-white mb-4">
                An electrician needs to add a new circuit to an occupied commercial building where
                complete isolation would cause unacceptable disruption. Apply the hierarchy of control.
              </p>

              <div className="space-y-4">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-xs font-medium text-green-400 mb-1">1. ELIMINATION</p>
                  <p className="text-sm text-white/90">
                    Can we avoid live working? Consider: partial isolation of sections, out-of-hours work
                    when building is unoccupied, temporary supply from generator. If none viable, proceed
                    to next level.
                  </p>
                </div>

                <div className="bg-black/30 p-3 rounded">
                  <p className="text-xs font-medium text-blue-400 mb-1">2. SUBSTITUTION</p>
                  <p className="text-sm text-white/90">
                    Can we reduce severity? Consider: pre-fabricate components to minimise live work time,
                    use plug-in devices where possible. Limited substitution options for this scenario.
                  </p>
                </div>

                <div className="bg-black/30 p-3 rounded">
                  <p className="text-xs font-medium text-purple-400 mb-1">3. ENGINEERING CONTROLS</p>
                  <p className="text-sm text-white/90">
                    Install temporary barriers around work area. Use insulated shrouds on adjacent live
                    parts. Ensure RCD protection is functional. Use insulated tools rated for voltage.
                  </p>
                </div>

                <div className="bg-black/30 p-3 rounded">
                  <p className="text-xs font-medium text-orange-400 mb-1">4. ADMINISTRATIVE CONTROLS</p>
                  <p className="text-sm text-white/90">
                    Implement permit to work system. Conduct risk assessment and method statement review.
                    Ensure only competent person (as per HSE GS38) undertakes work. Brief accompanying
                    persons on emergency procedures. Limit access to immediate work area.
                  </p>
                </div>

                <div className="bg-black/30 p-3 rounded">
                  <p className="text-xs font-medium text-red-400 mb-1">5. PPE (Last Resort)</p>
                  <p className="text-sm text-white/90">
                    Insulating gloves rated for voltage (Class 0 minimum for 230V). Arc-rated face shield.
                    Arc-rated long-sleeved clothing. Safety footwear. Non-conductive matting if available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Remember: ESEA-P</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>E</strong>liminate - Remove the hazard completely</li>
                <li className="pl-1"><strong>S</strong>ubstitute - Replace with less hazardous alternative</li>
                <li className="pl-1"><strong>E</strong>ngineer - Isolate, guard, ventilate</li>
                <li className="pl-1"><strong>A</strong>dministrate - Procedures, training, signs</li>
                <li className="pl-1"><strong>P</strong>rotect - PPE as last line of defence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Risk assessments must show hierarchy consideration</li>
                <li className="pl-1">Document why higher controls aren't reasonably practicable</li>
                <li className="pl-1">Record control measures selected and implemented</li>
                <li className="pl-1">Review and update when circumstances change</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Jumping to PPE</strong> - Always consider higher controls first</li>
                <li className="pl-1"><strong>Single control reliance</strong> - Layer multiple controls for serious hazards</li>
                <li className="pl-1"><strong>Ignoring maintenance</strong> - Engineering controls need regular checking</li>
                <li className="pl-1"><strong>Generic PPE</strong> - Select PPE specific to the hazard rating</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Hierarchy Order (Most to Least Effective)</p>
                <ul className="space-y-0.5">
                  <li>1. Elimination - Remove hazard completely</li>
                  <li>2. Substitution - Less hazardous alternative</li>
                  <li>3. Engineering - Physical controls</li>
                  <li>4. Administrative - Procedures/training</li>
                  <li>5. PPE - Last resort protection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>MHSWR 1999 - General duty to apply hierarchy</li>
                  <li>CDM 2015 - Designers must eliminate hazards</li>
                  <li>PUWER 1998 - Equipment guards and controls</li>
                  <li>PPE Regulations 1992 - PPE provision and use</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-4">
              Next: Risk Control Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_3;
