import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hierarchy of Controls - MOET Module 1 Section 3.3";
const DESCRIPTION = "Comprehensive guide to the hierarchy of controls for electrical maintenance technicians: elimination, substitution, engineering controls, administrative controls and PPE, with practical electrical maintenance examples for each level.";

const quickCheckQuestions = [
  {
    id: "hierarchy-order",
    question: "Which is the correct order of the hierarchy of controls, from most to least effective?",
    options: [
      "PPE, administrative, engineering, substitution, elimination",
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "Administrative, PPE, engineering, elimination, substitution",
      "Engineering, elimination, administrative, substitution, PPE"
    ],
    correctIndex: 1,
    explanation: "The hierarchy of controls runs from most effective (elimination — removing the hazard entirely) to least effective (PPE — protecting the individual from the hazard). The order is: elimination, substitution, engineering controls, administrative controls, PPE. Controls at the top of the hierarchy are always preferred because they reduce or remove the hazard at source rather than relying on human behaviour."
  },
  {
    id: "engineering-control-example",
    question: "Which of the following is an example of an engineering control in electrical maintenance?",
    options: [
      "A toolbox talk about electrical safety",
      "Wearing insulated gloves when working on live equipment",
      "Installing finger-safe (IP2X) covers on distribution board busbars",
      "Rotating workers to reduce fatigue from repetitive tasks"
    ],
    correctIndex: 2,
    explanation: "Finger-safe (IP2X) busbar covers are an engineering control — they physically prevent contact with live parts through the design of the equipment. Engineering controls work by isolating people from the hazard without relying on individual behaviour. A toolbox talk is an administrative control, insulated gloves are PPE, and worker rotation is an administrative control."
  },
  {
    id: "residual-risk",
    question: "After applying all reasonably practicable controls from the hierarchy, what remains is called:",
    options: [
      "Eliminated risk",
      "Transferred risk",
      "Residual risk",
      "Theoretical risk"
    ],
    correctIndex: 2,
    explanation: "Residual risk is the level of risk that remains after all reasonably practicable control measures have been applied. It is the risk the work team must manage through ongoing vigilance, monitoring and compliance with the safe system of work. Residual risk must be ALARP (as low as reasonably practicable) before work can proceed."
  },
  {
    id: "combined-controls",
    question: "Why are combined controls from multiple levels of the hierarchy generally more effective than a single control?",
    options: [
      "Because the HSE requires a minimum of three controls for every hazard",
      "Because if one control fails or is compromised, the remaining controls still provide some protection (defence in depth)",
      "Because it makes the risk assessment document longer and more impressive",
      "Because PPE alone is always sufficient"
    ],
    correctIndex: 1,
    explanation: "The principle of 'defence in depth' means that layering controls from different levels of the hierarchy provides multiple barriers between the hazard and the worker. If one control fails — for example, if an interlock is defeated — the remaining controls (safe system of work, PPE) still provide some protection. No single control should ever be relied upon as the sole barrier."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The hierarchy of controls is based on the principle that:",
    options: [
      "PPE is always the first choice because it is cheapest",
      "Controls that remove or reduce the hazard at source are more effective and reliable than those that rely on human behaviour",
      "Administrative controls are the most effective because they involve training",
      "All five levels must be applied to every hazard regardless of the risk level"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy is based on the principle that controls which act on the hazard itself (elimination, substitution, engineering) are inherently more reliable than those that depend on people following procedures (administrative) or wearing equipment correctly (PPE). Human behaviour is variable and fallible; physical controls are consistent."
  },
  {
    id: 2,
    question: "An electrical maintenance team decides to replace a planned live cable joint with a method that allows the work to be done with the circuit de-energised. This is an example of:",
    options: [
      "Administrative control",
      "Personal protective equipment",
      "Elimination of the electrical hazard",
      "Substitution of materials"
    ],
    correctAnswer: 2,
    explanation: "By changing the work method so that the circuit is de-energised, the team has eliminated the electrical hazard (contact with live conductors) for the duration of the work. Elimination is the most effective control because the hazard no longer exists. This is exactly what Regulation 14 of the Electricity at Work Regulations 1989 requires — dead working is the default; live working is the exception."
  },
  {
    id: 3,
    question: "Substituting a solvent-based contact cleaner with a water-based alternative is an example of:",
    options: [
      "Elimination",
      "Substitution",
      "Engineering control",
      "Administrative control"
    ],
    correctAnswer: 1,
    explanation: "Substitution involves replacing a hazardous substance, process or piece of equipment with a less hazardous alternative. Replacing a flammable, toxic solvent with a water-based cleaner reduces the chemical hazard without eliminating the cleaning activity. The hazard is not removed entirely (the water-based cleaner may still have some hazards), but it is significantly reduced."
  },
  {
    id: 4,
    question: "Which of the following is an administrative control for managing electrical risk?",
    options: [
      "Installing an interlocked isolator on a motor",
      "Implementing a permit to work system for HV switching",
      "Fitting IP2X covers to distribution board busbars",
      "Wearing arc flash rated face shield"
    ],
    correctAnswer: 1,
    explanation: "A permit to work system is an administrative control — it is a documented procedure that controls how work is carried out by people. Administrative controls depend on people following the system correctly. An interlocked isolator and IP2X covers are engineering controls (they physically prevent access to the hazard). An arc flash face shield is PPE."
  },
  {
    id: 5,
    question: "PPE is at the bottom of the hierarchy of controls because:",
    options: [
      "It is the most expensive option",
      "It does nothing to reduce or remove the hazard — it only protects the individual wearing it, and its effectiveness depends entirely on correct selection, fitting, use and maintenance",
      "PPE is never effective against electrical hazards",
      "It is not required by law"
    ],
    correctAnswer: 1,
    explanation: "PPE is the last resort because it does nothing to change the hazard — the hazard remains present at the same level. PPE only protects the individual if it is correctly selected for the hazard, properly fitted, worn consistently, and maintained in good condition. Any failure in these factors leaves the worker fully exposed. This is why PPE should supplement, not replace, higher-level controls."
  },
  {
    id: 6,
    question: "A maintenance technician is asked to install a new circuit in a ceiling void. The void contains asbestos insulation board. Applying the hierarchy of controls, the FIRST option to consider is:",
    options: [
      "Wearing a disposable coverall and half-face mask",
      "Routing the cable to avoid the asbestos entirely (elimination of exposure)",
      "Writing a method statement for working near asbestos",
      "Limiting the time spent in the ceiling void to 30 minutes"
    ],
    correctAnswer: 1,
    explanation: "The first option to consider under the hierarchy is always elimination. If the cable can be routed to completely avoid the asbestos-containing material, the exposure hazard is eliminated. Only if elimination is not reasonably practicable should you move down the hierarchy to consider engineering controls (encapsulation), administrative controls (licensed removal, method statements) or PPE."
  },
  {
    id: 7,
    question: "An interlocked isolator on a motor ensures that the motor cannot be started while the guard is open. This is:",
    options: [
      "An administrative control because it requires maintenance",
      "PPE because it protects the worker",
      "An engineering control because it physically prevents the hazard",
      "Elimination because the motor cannot run"
    ],
    correctAnswer: 2,
    explanation: "An interlocked isolator is an engineering control. It uses a physical mechanism to prevent the motor from being energised when the guard is removed, regardless of what the operator does. Engineering controls are highly effective because they do not rely on human behaviour — the interlock works automatically every time (provided it is maintained and not defeated)."
  },
  {
    id: 8,
    question: "Which of the following statements about residual risk is correct?",
    options: [
      "Residual risk is always zero after controls are applied",
      "Residual risk is the risk that remains after all reasonably practicable controls have been implemented",
      "Residual risk only applies to electrical hazards",
      "Residual risk does not need to be communicated to the work team"
    ],
    correctAnswer: 1,
    explanation: "Residual risk is the level of risk remaining after all reasonably practicable control measures have been applied. It is rarely zero — some level of risk usually remains. The residual risk must be ALARP and must be clearly communicated to the work team so they understand what hazards they are still exposed to and can remain vigilant."
  },
  {
    id: 9,
    question: "A construction site has exposed 400 V cables running across a pedestrian walkway. The best hierarchy response is:",
    options: [
      "Issue high-visibility vests to all pedestrians",
      "Eliminate the hazard by re-routing the cables underground or overhead, away from the walkway",
      "Put up a warning sign",
      "Brief the site workers about the cables in a toolbox talk"
    ],
    correctAnswer: 1,
    explanation: "The best response under the hierarchy is elimination — re-routing the cables so they no longer cross the pedestrian walkway. This removes the hazard entirely. Warning signs and toolbox talks are administrative controls that depend on people noticing and obeying them. High-visibility vests do not address the electrical hazard at all. If re-routing is not immediately possible, engineering controls such as cable covers, barriers or cable bridges should be used as interim measures."
  },
  {
    id: 10,
    question: "When selecting controls for a hazard, you should:",
    options: [
      "Start at the bottom of the hierarchy with PPE because it is quickest to implement",
      "Start at the top of the hierarchy with elimination and work down, applying the most effective controls that are reasonably practicable",
      "Only apply controls that cost less than £500",
      "Apply all five levels simultaneously regardless of the hazard"
    ],
    correctAnswer: 1,
    explanation: "The correct approach is to start at the top of the hierarchy (elimination) and work downwards. At each level, ask whether that type of control is reasonably practicable for the hazard in question. Apply the most effective controls possible, and use lower-level controls (such as PPE) only to manage residual risk that remains after higher-level controls have been applied."
  },
  {
    id: 11,
    question: "Monitoring the effectiveness of control measures is important because:",
    options: [
      "It is only necessary for controls costing more than £1,000",
      "Controls can degrade over time, be defeated or bypassed, or prove inadequate in practice — monitoring ensures they continue to work as intended",
      "The HSE will fine you if you do not produce a monitoring report",
      "Monitoring is only required for PPE, not for engineering or administrative controls"
    ],
    correctAnswer: 1,
    explanation: "All control measures require monitoring because they can degrade, be bypassed, or prove inadequate over time. Engineering controls need maintenance (interlocks can fail, guards can be removed). Administrative controls need reinforcement (procedures can drift, training can be forgotten). PPE needs inspection and replacement (PPE degrades with use). Regular monitoring ensures controls remain effective and identifies when they need to be improved."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician should be able to:",
    options: [
      "Design a complete hierarchy of controls for a nuclear power station",
      "Identify appropriate controls for hazards encountered in their work, apply them correctly, and monitor their effectiveness",
      "Only wear PPE when instructed by a supervisor",
      "Delegate all control selection to the health and safety department"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to demonstrate knowledge of control measures and the ability to apply them in practice. This includes selecting appropriate controls for the hazards they encounter, implementing those controls correctly, monitoring their effectiveness, and reporting when controls are inadequate or have failed. This is assessed in the end-point assessment practical observation and professional discussion."
  }
];

const faqs = [
  {
    question: "Do I always have to eliminate the hazard before considering other controls?",
    answer: "You must always consider elimination first — that is the principle of the hierarchy. However, elimination is not always reasonably practicable. For example, you cannot eliminate electricity from an electrical maintenance task. What you can do is eliminate the exposure to live conductors by de-energising the circuit (safe isolation). If elimination is not possible, you move down the hierarchy to substitution, then engineering controls, and so on. The key is to start at the top and work down, applying the most effective controls that are reasonably practicable."
  },
  {
    question: "Can PPE ever be the primary control measure?",
    answer: "PPE should only be the primary control in situations where higher-level controls are not reasonably practicable and the residual risk justifies work proceeding. For example, during authorised live working where dead working is genuinely unreasonable, insulated gloves and arc flash PPE become primary controls alongside administrative controls (permit to work, competent person). However, even in these situations, the risk assessment should demonstrate why higher-level controls cannot be applied."
  },
  {
    question: "How do I know if an engineering control is working properly?",
    answer: "Engineering controls must be regularly inspected, tested and maintained. Interlocks should be tested periodically to confirm they prevent operation when guards are removed. Ventilation systems should be examined under the COSHH Regulations schedule. Electrical protective devices should be tested in accordance with BS 7671 and manufacturer instructions. Records of these inspections and tests should be maintained. If you suspect an engineering control is not working, report it immediately and do not rely on it until it has been verified."
  },
  {
    question: "What is the difference between an engineering control and an administrative control?",
    answer: "An engineering control is a physical change to the equipment, environment or process that reduces the hazard without depending on human behaviour — for example, an interlocked guard, an enclosed busbar system, or a ventilation system. An administrative control is a procedure, rule, training programme or way of organising work that depends on people following it — for example, a permit to work, a safe system of work, job rotation, or warning signs. Engineering controls are more reliable because they work independently of human behaviour."
  },
  {
    question: "How does the hierarchy of controls link to the cost-benefit analysis in risk assessment?",
    answer: "The ALARP principle requires that the cost of a control measure must be weighed against the risk reduction it achieves. Higher-level controls (elimination, substitution, engineering) often have higher upfront costs but provide more reliable, long-term risk reduction. Lower-level controls (administrative, PPE) may be cheaper initially but have ongoing costs (training, supervision, replacement) and are less reliable. A good cost-benefit analysis considers the total lifecycle cost, including the cost of failure. For electrical hazards where the potential severity is fatal, the cost threshold for justifying controls is very high."
  }
];

const MOETModule1Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Hierarchy of Controls
          </h1>
          <p className="text-white/80">
            Selecting and applying control measures in order of effectiveness
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>5 levels:</strong> Elimination, substitution, engineering, administrative, PPE</li>
              <li className="pl-1"><strong>Principle:</strong> Higher levels are more effective and reliable</li>
              <li className="pl-1"><strong>Application:</strong> Start at elimination, work down to PPE</li>
              <li className="pl-1"><strong>Residual risk:</strong> What remains after all controls are applied</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Elimination:</strong> De-energise circuits (safe isolation)</li>
              <li className="pl-1"><strong>Engineering:</strong> IP-rated enclosures, interlocks, RCDs</li>
              <li className="pl-1"><strong>Administrative:</strong> Permits to work, safe systems, training</li>
              <li className="pl-1"><strong>PPE:</strong> Insulated gloves, arc flash suits, safety footwear</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "List the five levels of the hierarchy of controls in order of effectiveness",
              "Give practical examples of each control level in electrical maintenance",
              "Explain why higher-level controls are preferred over lower-level controls",
              "Understand the concept of combined controls and defence in depth",
              "Define residual risk and explain how it should be managed",
              "Apply the hierarchy to select appropriate controls for electrical work"
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

        {/* Section 01: Overview of the Hierarchy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Five-Level Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The hierarchy of controls is a universally accepted framework for selecting and implementing risk
              control measures. It is based on a simple principle: controls that act on the hazard itself are more
              effective and reliable than controls that depend on human behaviour. The hierarchy arranges control
              measures in order from most effective (elimination) to least effective (personal protective equipment).
            </p>

            <p>
              This framework is embedded in the Management of Health and Safety at Work Regulations 1999 (Schedule 1,
              General Principles of Prevention) and is referenced in numerous sector-specific regulations and
              guidance. For electrical maintenance technicians, it is a fundamental tool for deciding how to make
              your work safe.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded">LEVEL 1</span>
                  <h3 className="text-sm font-medium text-green-400">Elimination</h3>
                </div>
                <p className="text-sm text-white mb-2">
                  Physically remove the hazard from the workplace entirely. This is the most effective control
                  because the hazard no longer exists — there is zero residual risk from that specific hazard.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Effectiveness:</strong> Highest — removes the hazard at source. No reliance on human behaviour.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-green-300 bg-green-500/15 px-2 py-0.5 rounded">LEVEL 2</span>
                  <h3 className="text-sm font-medium text-green-300">Substitution</h3>
                </div>
                <p className="text-sm text-white mb-2">
                  Replace the hazardous substance, process, equipment or activity with a less hazardous alternative.
                  The hazard is not removed entirely but is reduced at source.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Effectiveness:</strong> Very high — reduces the hazard at source. Minimal reliance on human behaviour.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-500/15 px-2 py-0.5 rounded">LEVEL 3</span>
                  <h3 className="text-sm font-medium text-yellow-400">Engineering Controls</h3>
                </div>
                <p className="text-sm text-white mb-2">
                  Isolate people from the hazard through physical means — guards, barriers, enclosures, interlocks,
                  ventilation systems, or redesigned equipment. The hazard still exists, but access to it is
                  physically restricted.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Effectiveness:</strong> High — creates a physical barrier. Works automatically without human action (if maintained).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded">LEVEL 4</span>
                  <h3 className="text-sm font-medium text-orange-400">Administrative Controls</h3>
                </div>
                <p className="text-sm text-white mb-2">
                  Change the way people work through procedures, training, supervision, signage, permits to work,
                  job rotation, or scheduling. The hazard and the potential for exposure remain — control depends on
                  people following the system.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Effectiveness:</strong> Moderate — depends entirely on human compliance. Subject to drift, complacency and error.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded">LEVEL 5</span>
                  <h3 className="text-sm font-medium text-red-400">Personal Protective Equipment (PPE)</h3>
                </div>
                <p className="text-sm text-white mb-2">
                  Protect the individual from the hazard using personal equipment — gloves, safety glasses, helmets,
                  hearing protection, respiratory protection, arc flash suits. The hazard remains at full strength;
                  the PPE is the only barrier.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Effectiveness:</strong> Lowest — protects only the wearer. Depends on correct selection, fitting, use and maintenance.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The hierarchy is not a pick list — it is a decision framework. You must
              start at Level 1 and work downwards, applying the most effective controls that are reasonably
              practicable at each level. Only when higher-level controls have been fully considered and either
              applied or ruled out (with justification) should you move to lower levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Electrical Maintenance Examples */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Applying the Hierarchy to Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the hierarchy in theory is one thing — applying it to the real hazards of electrical
              maintenance work is what matters. The following examples show how each level of the hierarchy applies
              to common electrical maintenance tasks.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Maintenance Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">Elimination</td>
                      <td className="border border-white/10 px-3 py-2">
                        <ul className="space-y-1 list-disc list-outside ml-4">
                          <li>De-energise the circuit before work begins (safe isolation) — eliminates the live working hazard</li>
                          <li>Remove redundant wiring or equipment entirely instead of leaving it disconnected in situ</li>
                          <li>Redesign the installation to eliminate a cable route through a hazardous area</li>
                          <li>Replace an overhead cable crossing with an underground route to eliminate contact risk</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-300">Substitution</td>
                      <td className="border border-white/10 px-3 py-2">
                        <ul className="space-y-1 list-disc list-outside ml-4">
                          <li>Replace 110 V site tools with battery-powered alternatives (lower electrical risk)</li>
                          <li>Substitute a flammable solvent cleaner with a water-based alternative</li>
                          <li>Replace MIMS cable with thermoplastic-insulated cable where conditions allow (easier handling, lower mechanical hazard)</li>
                          <li>Use pre-fabricated wiring assemblies instead of on-site fabrication to reduce exposure time</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">Engineering</td>
                      <td className="border border-white/10 px-3 py-2">
                        <ul className="space-y-1 list-disc list-outside ml-4">
                          <li>Install IP2X (finger-safe) covers on distribution board busbars</li>
                          <li>Fit interlocked isolators so equipment cannot be energised with guards removed</li>
                          <li>Install RCDs for additional shock protection (30 mA for socket circuits)</li>
                          <li>Use cable protection systems (conduit, trunking, armoured cable) to prevent mechanical damage</li>
                          <li>Install barriers and insulating screens when live working is justified</li>
                          <li>Provide local exhaust ventilation when soldering in enclosed spaces</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">Administrative</td>
                      <td className="border border-white/10 px-3 py-2">
                        <ul className="space-y-1 list-disc list-outside ml-4">
                          <li>Implement a permit to work system for HV switching and live working</li>
                          <li>Write and follow safe systems of work for electrical maintenance tasks</li>
                          <li>Provide competence-based training and regular refresher training</li>
                          <li>Display warning signs and labels on electrical equipment</li>
                          <li>Conduct toolbox talks on specific hazards before starting work</li>
                          <li>Rotate workers to reduce fatigue on repetitive or demanding tasks</li>
                          <li>Implement a lock-out/tag-out (LOTO) procedure for isolation</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">PPE</td>
                      <td className="border border-white/10 px-3 py-2">
                        <ul className="space-y-1 list-disc list-outside ml-4">
                          <li>Insulated gloves (Class 00/0 for LV work) when live working is authorised</li>
                          <li>Arc flash rated face shield and clothing for work on high fault-level systems</li>
                          <li>Safety footwear with insulating soles</li>
                          <li>Safety glasses/goggles when there is a risk of ejected particles</li>
                          <li>Hearing protection when working near noisy equipment (generators, UPS)</li>
                          <li>Respiratory protection when working with chemicals or in dusty environments</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Safe Isolation — The Hierarchy in Action</p>
              <p className="text-sm text-white">
                Safe isolation is the single most important application of the hierarchy of controls in electrical
                maintenance. By de-energising a circuit (elimination), you remove the risk of electric shock and
                arc flash for the duration of the work. This is why Regulation 14 of the Electricity at Work
                Regulations 1989 establishes dead working as the default — it is the most effective control
                available. The safe isolation procedure (isolate, lock off, prove dead, post warning notices)
                combines elimination with engineering controls (locks) and administrative controls (notices, permits),
                creating a robust multi-layered defence.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Combined Controls and Defence in Depth */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Combined Controls and Defence in Depth
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In practice, most hazards require a combination of controls from multiple levels of the hierarchy. This
              approach — known as "defence in depth" — provides multiple layers of protection so that if one control
              fails, the others still provide some degree of safety. Relying on a single control, no matter how
              robust, creates a single point of failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example: Working on a Distribution Board</h3>
              <p className="text-sm text-white mb-3">
                Consider a maintenance technician replacing a circuit breaker in a three-phase distribution board.
                The following combined controls would typically be applied:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Elimination:</strong> Isolate the supply to the board — de-energise the hazard</li>
                <li className="pl-1"><strong>Engineering:</strong> Apply a lock to the isolator so it cannot be re-energised; use an approved voltage indicator to prove dead (GS38 compliant)</li>
                <li className="pl-1"><strong>Administrative:</strong> Obtain a permit to work (if required by the organisation's policy); follow the safe system of work; post warning notices at the isolation point; brief the work team</li>
                <li className="pl-1"><strong>PPE:</strong> Wear safety footwear and safety glasses as a baseline; keep insulated gloves available for the proving dead procedure</li>
              </ul>
              <p className="text-sm text-white mt-3">
                If any single control fails — for example, if the lock is accidentally removed — the remaining
                controls (warning notice, permit, prove dead procedure) still provide protection. No single failure
                should result in a worker being exposed to the full, uncontrolled hazard.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Swiss Cheese Model</p>
              <p className="text-sm text-white">
                Professor James Reason's "Swiss cheese model" illustrates defence in depth. Each control measure is
                like a slice of Swiss cheese — it has holes (weaknesses). When the holes in multiple slices line up,
                the hazard passes through all the defences and an accident occurs. By having multiple layers with
                different types of holes (i.e., controls from different levels of the hierarchy, with different
                failure modes), the probability of all holes aligning is dramatically reduced. This is why combined
                controls are always more effective than a single control.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Selecting the Right Combination</h3>
              <p className="text-sm text-white mb-3">
                When selecting controls, consider:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>The nature of the hazard:</strong> Electrical, mechanical, chemical, ergonomic — different hazards respond differently to different controls</li>
                <li className="pl-1"><strong>The level of risk:</strong> Higher risks require more robust, higher-level controls and more layers</li>
                <li className="pl-1"><strong>The work environment:</strong> What is practicable on site — a confined substation limits the engineering controls that can be installed</li>
                <li className="pl-1"><strong>The duration of exposure:</strong> Short-duration tasks may justify different controls from long-duration activities</li>
                <li className="pl-1"><strong>The competence of the workforce:</strong> Administrative controls are only effective if workers understand and follow them</li>
                <li className="pl-1"><strong>Maintenance requirements:</strong> Engineering controls need ongoing maintenance to remain effective</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Residual Risk and Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Residual Risk and Control Effectiveness Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After applying all reasonably practicable controls from the hierarchy, some risk will usually remain.
              This is residual risk — the level of risk that the work team must accept and manage through ongoing
              vigilance, monitoring and compliance with the safe system of work. Understanding and communicating
              residual risk is critical because it tells workers what hazards they are still exposed to, even with
              controls in place.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Residual Risk</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Communicate:</strong> Ensure all members of the work team understand what residual risks remain and what they need to do to manage them</li>
                <li className="pl-1"><strong>Monitor:</strong> Watch for changes in conditions that could increase the residual risk — weather changes, additional workers, equipment failures</li>
                <li className="pl-1"><strong>Review:</strong> Regularly check that controls are still effective and that the residual risk has not increased</li>
                <li className="pl-1"><strong>Record:</strong> Document the residual risk level in the risk assessment — typically using the "with controls" column of the risk matrix</li>
                <li className="pl-1"><strong>Accept only if ALARP:</strong> The residual risk must be ALARP — as low as reasonably practicable. If it is not, further controls are needed before work proceeds</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Monitoring Control Effectiveness</h3>
              <p className="text-sm text-white mb-3">
                Controls are only as good as their ongoing maintenance and monitoring. All types of controls can
                degrade, be defeated or prove inadequate over time:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Control Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How It Can Fail</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Monitoring Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Engineering (interlocks)</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical wear, deliberate defeat, lack of maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Periodic functional testing, planned preventive maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Engineering (RCDs)</td>
                      <td className="border border-white/10 px-3 py-2">Internal component failure, nuisance tripping leading to bypass</td>
                      <td className="border border-white/10 px-3 py-2">6-monthly push-button test (user), periodic instrument test (electrician)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Administrative (procedures)</td>
                      <td className="border border-white/10 px-3 py-2">Procedural drift, poor training, complacency, time pressure</td>
                      <td className="border border-white/10 px-3 py-2">Supervision, audits, observations, refresher training</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PPE (insulated gloves)</td>
                      <td className="border border-white/10 px-3 py-2">Puncture, contamination, age degradation, incorrect class for voltage</td>
                      <td className="border border-white/10 px-3 py-2">Pre-use visual inspection, inflation test, periodic dielectric test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Defeating Controls</p>
              <p className="text-sm text-white">
                One of the most dangerous failures is the deliberate defeat of engineering controls by workers —
                for example, taping down an interlock switch so a machine can be operated with the guard open, or
                bypassing an RCD because it causes nuisance tripping. Defeating controls is almost always a sign
                of underlying problems: the control may be poorly designed, causing productivity issues, or workers
                may not understand its purpose. If you encounter a defeated control, report it immediately. Under
                the Health and Safety at Work Act 1974, Section 8, it is a criminal offence to intentionally or
                recklessly interfere with anything provided in the interests of health and safety.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to monitor the
              effectiveness of control measures as part of your ongoing responsibilities. This includes reporting
              when controls are inadequate, damaged or not being followed, and contributing to continuous
              improvement of the safe system of work. This behaviour is assessed in the end-point assessment
              professional discussion and practical observation.
            </p>
          </div>
        </section>

        {/* Section 05: Cost-Benefit Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cost-Benefit Considerations in Control Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ALARP principle requires that the cost of control measures be weighed against the risk reduction
              they achieve. This does not mean choosing the cheapest option — it means ensuring that expenditure on
              controls is proportionate to the level of risk. For high-severity hazards such as electrical contact,
              the expectation is that significant investment in controls is justified.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Factors in Cost-Benefit Analysis</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Initial cost:</strong> Purchase, installation and commissioning of the control measure</li>
                <li className="pl-1"><strong>Ongoing cost:</strong> Maintenance, inspection, replacement, training, supervision</li>
                <li className="pl-1"><strong>Reliability:</strong> How consistently the control works in practice — engineering controls are generally more reliable than administrative controls over time</li>
                <li className="pl-1"><strong>Effectiveness:</strong> How much risk reduction the control actually achieves</li>
                <li className="pl-1"><strong>Practicability:</strong> Whether the control can be implemented in the specific work environment and conditions</li>
                <li className="pl-1"><strong>Impact on productivity:</strong> Controls that excessively impede work may be resisted or bypassed — good design integrates safety with efficiency</li>
                <li className="pl-1"><strong>Cost of failure:</strong> The potential consequences if the control fails — for fatal hazards, this is effectively infinite</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Higher-Level Controls</h3>
                <p className="text-sm text-white">
                  Higher-level controls (elimination, substitution, engineering) often have higher upfront costs but
                  lower ongoing costs because they do not require constant human compliance. A properly designed
                  interlocked enclosure works every time it is engaged, regardless of training levels, fatigue or
                  distraction. Over the life of an installation, engineering controls are often more cost-effective
                  than continuous administrative measures.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lower-Level Controls</h3>
                <p className="text-sm text-white">
                  Lower-level controls (administrative, PPE) often have lower upfront costs but higher ongoing costs
                  — training must be refreshed, procedures must be supervised, PPE must be replaced, and compliance
                  must be monitored. They also have a higher failure rate because they depend on human behaviour,
                  which is inherently variable. A permit to work system is only as good as the people operating it.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For electrical hazards where the potential outcome is death, the courts
              have consistently held that the cost of prevention must be very high indeed before it can be considered
              "grossly disproportionate" to the risk. In practical terms, this means that safe isolation equipment,
              competence training, properly rated PPE and robust safe systems of work are always justified — their
              cost is trivial compared to the value of a human life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Evaluation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-4">
              Next: Method Statements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section3_3;
