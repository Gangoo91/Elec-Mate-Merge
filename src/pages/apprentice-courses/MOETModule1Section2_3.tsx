import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Personal Protective Equipment (PPE) - MOET Module 1.2.3";
const DESCRIPTION = "Comprehensive guide to PPE for electrical maintenance: PPE Regulations 2022, hierarchy of controls, insulating gloves, arc flash suits, selection criteria, inspection schedules, CE/UKCA marking and employer duties under EAWR 1989.";

const quickCheckQuestions = [
  {
    id: "hierarchy-ppe",
    question: "Where does PPE sit in the hierarchy of controls?",
    options: [
      "First — it should be the primary control measure",
      "Second — after elimination but before engineering controls",
      "Last — it is the final line of defence when other controls are insufficient",
      "It can be used at any level as a substitute for other controls"
    ],
    correctIndex: 2,
    explanation: "PPE is the LAST resort in the hierarchy of controls: elimination, substitution, engineering controls, administrative controls, and finally PPE. It is the least effective control because it only protects the individual wearing it and depends on correct selection, fit, use and maintenance. Employers must always consider higher-level controls first."
  },
  {
    id: "glove-classes",
    question: "Which class of insulating glove is rated for use on low voltage systems up to 1000 V AC?",
    options: [
      "Class 00",
      "Class 0",
      "Class 1",
      "Class 2"
    ],
    correctIndex: 1,
    explanation: "Class 0 insulating gloves are rated for a maximum use voltage of 1000 V AC (1500 V DC) and are the standard choice for low voltage electrical work. Class 00 is rated to 500 V AC, while Classes 1 through 4 are for progressively higher voltages up to 36,000 V AC (Class 4). Always check the voltage rating matches or exceeds the system voltage."
  },
  {
    id: "arc-flash-cat2",
    question: "Category 2 arc flash PPE must have an arc rating of at least:",
    options: [
      "4 cal/cm²",
      "8 cal/cm²",
      "25 cal/cm²",
      "40 cal/cm²"
    ],
    correctIndex: 1,
    explanation: "Category 2 arc flash PPE must have a minimum arc rating of 8 cal/cm². Category 1 requires 4 cal/cm², Category 3 requires 25 cal/cm² and Category 4 requires 40 cal/cm². The required category is determined by the incident energy calculation for the specific equipment and working distance."
  },
  {
    id: "ppe-employer-duty",
    question: "Under the Personal Protective Equipment at Work Regulations 2022, who is responsible for providing PPE to workers?",
    options: [
      "The worker must provide their own PPE",
      "The employer must provide suitable PPE free of charge",
      "PPE costs are shared equally between employer and worker",
      "The client whose premises the work is carried out on"
    ],
    correctIndex: 1,
    explanation: "The PPE at Work Regulations 2022 require the employer to provide suitable PPE free of charge where risks cannot be adequately controlled by other means. This was extended in 2022 to cover limb (b) workers (those who are not employees but work under a contract personally to do work). The employer must also ensure PPE is maintained, replaced and stored correctly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The hierarchy of controls, in the correct order from most to least effective, is:",
    options: [
      "PPE, administrative controls, engineering controls, substitution, elimination",
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "Risk assessment, method statement, PPE, monitoring, review",
      "Engineering controls, elimination, PPE, substitution, administrative controls"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of controls runs from most effective to least effective: (1) Elimination — remove the hazard entirely, (2) Substitution — replace with a less hazardous alternative, (3) Engineering controls — physical barriers, interlocks, ventilation, (4) Administrative controls — procedures, training, signage, (5) PPE — personal protective equipment as the last resort."
  },
  {
    id: 2,
    question: "Insulating gloves for electrical work must comply with:",
    options: [
      "BS EN 388 (mechanical hazards)",
      "BS EN 60903 (live working — insulating gloves)",
      "BS EN 374 (chemical hazards)",
      "BS EN 511 (cold hazards)"
    ],
    correctAnswer: 1,
    explanation: "Insulating gloves for electrical work must comply with BS EN 60903 (IEC 60903), which specifies requirements for insulating gloves and mitts for live working. The standard defines six classes (00 to 4) based on the maximum use voltage, and requires each glove to be individually tested. Additional standards may apply for mechanical protection (leather over-gloves are usually worn over insulating gloves)."
  },
  {
    id: 3,
    question: "How often should Class 0 insulating gloves be electrically retested?",
    options: [
      "Every month",
      "Every 6 months",
      "Every 12 months",
      "Only when visually damaged"
    ],
    correctAnswer: 1,
    explanation: "BS EN 60903 and industry best practice recommend that insulating gloves are electrically retested at intervals not exceeding 6 months. Some organisations test more frequently (e.g., every 3 months for daily-use gloves). Between formal electrical tests, gloves should be visually inspected and air-tested (inflated to check for pinholes) before each use."
  },
  {
    id: 4,
    question: "An arc flash face shield or hood visor must be rated to protect against:",
    options: [
      "Impact from falling objects only",
      "Ultraviolet radiation, infrared radiation, molten metal splash and the thermal energy of the arc",
      "Chemical splash only",
      "Dust and airborne particles only"
    ],
    correctAnswer: 1,
    explanation: "Arc flash face protection must guard against the full range of arc flash hazards: intense UV and IR radiation (which can cause flash burns and eye damage), molten metal droplets projected by the arc blast, and the thermal energy of the arc itself. The visor must have an arc rating (cal/cm²) that matches or exceeds the incident energy of the task."
  },
  {
    id: 5,
    question: "Safety footwear for electrical work should be:",
    options: [
      "Steel-capped boots with no specific electrical rating",
      "Electrically insulating (EH-rated) safety boots with composite toe caps",
      "Wellington boots with no safety features",
      "Any footwear with ankle support"
    ],
    correctAnswer: 1,
    explanation: "Safety footwear for electrical work should be EH-rated (Electrical Hazard) with insulating soles to reduce the risk of a current path through the feet to earth. Composite (non-metallic) toe caps are preferred over steel toe caps for electrical work because they do not provide a conductive path. Boots should also meet BS EN ISO 20345 for general workplace safety."
  },
  {
    id: 6,
    question: "The ATPV rating of an arc flash garment indicates:",
    options: [
      "The maximum temperature the garment can withstand",
      "The incident energy level at which there is a 50% probability of a second-degree burn through the fabric",
      "The resistance of the fabric to tearing",
      "The UV protection factor of the fabric"
    ],
    correctAnswer: 1,
    explanation: "ATPV (Arc Thermal Performance Value) is the incident energy (in cal/cm²) at which there is a 50% probability that the wearer will sustain the onset of a second-degree burn through the fabric. It is the primary rating used to match garment protection to the calculated incident energy of the task. The garment's arc rating must exceed the calculated incident energy."
  },
  {
    id: 7,
    question: "Under the PPE at Work Regulations 2022, a key change from the 1992 regulations was:",
    options: [
      "PPE is no longer required for office workers",
      "The duty to provide PPE was extended to cover 'limb (b) workers' — those personally performing work under a contract",
      "Employers are no longer required to maintain PPE",
      "Workers can opt out of wearing PPE"
    ],
    correctAnswer: 1,
    explanation: "The 2022 update extended the duty to provide PPE to 'limb (b) workers' — individuals who personally perform work under a contract but are not employees (e.g., some agency workers, casual workers). Previously, only employees were covered. This brought the UK in line with the broader intention of the original EU PPE Directive."
  },
  {
    id: 8,
    question: "A hard hat (safety helmet) worn for electrical work should be:",
    options: [
      "Any standard construction hard hat (BS EN 397)",
      "An electrically insulated safety helmet tested to withstand electrical contact",
      "A bump cap (BS EN 812)",
      "A standard cycling helmet"
    ],
    correctAnswer: 1,
    explanation: "Safety helmets for electrical work should be electrically insulated and tested for electrical resistance. BS EN 397 includes an optional requirement for electrical insulation (tested at 440 V AC). BS EN 50365 specifies helmets for use in low voltage installations (up to 1000 V AC). Metal components (such as ventilation systems) should be avoided as they can provide a conductive path."
  },
  {
    id: 9,
    question: "Before using insulating gloves, a user should perform which daily check?",
    options: [
      "Weigh the gloves to check for moisture absorption",
      "Inflate each glove by rolling from the cuff and check for air leaks (the 'air test')",
      "Measure the resistance of the glove with a multimeter",
      "Soak the gloves in water for 10 minutes"
    ],
    correctAnswer: 1,
    explanation: "The air test (or inflation test) is the standard daily pre-use check for insulating gloves. Roll the cuff towards the fingers to trap air inside the glove, then squeeze gently while listening and feeling for air leaks. Any leak indicates a pinhole or crack in the insulation, and the glove must be withdrawn from service immediately. This simple test can detect defects that are invisible to the naked eye."
  },
  {
    id: 10,
    question: "CE and UKCA markings on PPE indicate that:",
    options: [
      "The product has been tested by the HSE and approved for use",
      "The product conforms to the essential health and safety requirements of the relevant regulations",
      "The product is the cheapest option available",
      "The product is recommended by trade unions"
    ],
    correctAnswer: 1,
    explanation: "CE marking (for EU/Northern Ireland market) and UKCA marking (for Great Britain market) indicate that the PPE conforms to the essential health and safety requirements set out in the PPE Regulation (EU) 2016/425 or UK PPE Regulations. The manufacturer declares conformity based on testing by a Notified Body (for Category II and III PPE). These markings are a legal requirement for placing PPE on the market."
  },
  {
    id: 11,
    question: "Which of the following is NOT a recognised reason for replacing arc flash PPE?",
    options: [
      "The garment has been exposed to an arc flash event",
      "The fabric shows signs of wear, thinning or contamination",
      "The garment has been washed more than 10 times",
      "The arc rating label is no longer legible"
    ],
    correctAnswer: 2,
    explanation: "Arc flash garments should be replaced after exposure to an arc event (even if no visible damage), when the fabric shows wear, thinning, holes or contamination with flammable substances, and when labelling is no longer legible (as the arc rating cannot be confirmed). The number of washes alone is not a replacement criterion — quality arc-rated garments are designed to withstand industrial laundering. However, follow the manufacturer's care instructions to maintain the arc rating."
  },
  {
    id: 12,
    question: "When working on a 400 V three-phase distribution board, the MINIMUM PPE should include:",
    options: [
      "Safety glasses only",
      "Arc-rated clothing, face shield, insulating gloves (Class 0), safety boots and hard hat",
      "Leather work gloves and steel-capped boots",
      "A high-visibility vest and ear defenders"
    ],
    correctAnswer: 1,
    explanation: "Work on a 400 V three-phase distribution board presents both shock and arc flash hazards. Minimum PPE should include arc-rated clothing appropriate to the calculated incident energy, arc-rated face shield or hood, insulating gloves (Class 0 minimum for LV), safety boots with insulating soles, and a safety helmet where overhead hazards exist. The specific PPE level depends on the arc flash risk assessment for the equipment."
  }
];

const faqs = [
  {
    question: "Do I need arc flash PPE for working on a domestic consumer unit?",
    answer: "The requirement depends on the risk assessment. Domestic consumer units typically have lower available fault currents, but arc flash can still occur — particularly at the main switch or incoming supply. Many employers now require at minimum an arc-rated face shield and Category 1 or 2 arc-rated clothing for any work where there is a risk of an arc flash, including domestic work near the incoming supply. Always follow your employer's PPE policy."
  },
  {
    question: "Can I use leather gloves instead of insulating gloves for electrical work?",
    answer: "No. Leather gloves are not rated for electrical insulation and will not protect against electric shock. However, leather over-gloves are worn OVER insulating gloves to provide mechanical protection — preventing cuts, abrasion and punctures that could damage the insulating glove underneath. The combination of insulating glove plus leather over-glove provides both electrical and mechanical protection."
  },
  {
    question: "How should I store insulating gloves when not in use?",
    answer: "Store insulating gloves in a clean, dry, cool location away from direct sunlight, ozone sources (such as electric motors) and chemicals. Keep them in their protective bag or canister in their natural shape — do not fold, compress or stack heavy objects on them. UV radiation and ozone degrade rubber, reducing the insulating properties. Inspect gloves before each use and conduct the air test."
  },
  {
    question: "Is a 'flash guard' the same as a full arc flash suit?",
    answer: "No. A flash guard (or arc-rated balaclava/face shield combination) provides head and face protection but is only part of the overall arc flash PPE system. A full arc flash suit (sometimes called a 'switching suit' or 'bomb suit') is a complete head-to-toe protective system including hood with visor, jacket, trousers (or coverall), gloves and boot covers. The full suit is required for Category 3 and 4 arc flash hazards where incident energy exceeds 25 cal/cm²."
  },
  {
    question: "What is the difference between UKCA and CE marking on PPE?",
    answer: "CE marking is the European conformity mark required for products placed on the EU market (and Northern Ireland under the Windsor Framework). UKCA (UK Conformity Assessed) is the equivalent mark for products placed on the Great Britain market. Both indicate that the PPE meets the essential health and safety requirements. Currently, CE-marked PPE can still be sold in Great Britain under transitional arrangements, but UKCA marking will eventually become the sole requirement."
  }
];

const MOETModule1Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 1.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Personal Protective Equipment (PPE)
          </h1>
          <p className="text-white/80">
            Selection, use, inspection and maintenance of PPE for electrical maintenance work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hierarchy:</strong> PPE is the LAST resort — after all other controls</li>
              <li className="pl-1"><strong>Gloves:</strong> Class 00-4 insulating gloves (BS EN 60903)</li>
              <li className="pl-1"><strong>Arc flash:</strong> CAT 1-4 rated suits, hoods and visors</li>
              <li className="pl-1"><strong>Duty:</strong> Employer provides free of charge (PPE Regs 2022)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS EN 60903:</strong> Insulating gloves for live working</li>
              <li className="pl-1"><strong>NFPA 70E / IEEE 1584:</strong> Arc flash PPE categories</li>
              <li className="pl-1"><strong>PPE Regulations 2022:</strong> Employer duties and worker coverage</li>
              <li className="pl-1"><strong>CE/UKCA marking:</strong> Product conformity for UK/EU market</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the hierarchy of controls and why PPE is the last resort",
              "Identify the types of PPE required for electrical maintenance work",
              "Select the correct class of insulating glove for LV and HV work",
              "Describe arc flash PPE categories (CAT 1-4) and ATPV/EBT ratings",
              "Carry out inspection, testing and replacement of electrical PPE",
              "State employer duties under the PPE at Work Regulations 2022"
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

        {/* Section 01: Hierarchy of Controls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Hierarchy of Controls — PPE as Last Resort
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The hierarchy of controls is a fundamental principle of risk management established in the
              Management of Health and Safety at Work Regulations 1999 and reinforced by BS 7671 and
              HSG85. It requires that control measures are applied in order of effectiveness, starting
              with the most effective (elimination) and descending to the least effective (PPE). PPE is
              always the last line of defence — it should never be the primary control measure.
            </p>
            <p>
              For electrical maintenance work, this means that the first consideration must always be
              whether the work can be done with the circuit dead (elimination of the electrical hazard).
              If dead working is not possible, engineering controls (barriers, insulation, reduced
              voltage) and administrative controls (safe systems of work, permits, competent persons)
              must be applied before PPE is considered.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five Levels — Applied to Electrical Work</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Elimination:</strong> Work dead — isolate and prove dead before starting work. This completely removes the electrical hazard (EAWR Reg 12)</li>
                <li className="pl-1"><strong>2. Substitution:</strong> Use a reduced voltage supply (e.g., 110 V CTE for portable tools instead of 230 V). Use SELV where possible</li>
                <li className="pl-1"><strong>3. Engineering controls:</strong> Install barriers, shrouds, insulating covers over live parts. Use interlocked switchgear. Apply temporary insulation</li>
                <li className="pl-1"><strong>4. Administrative controls:</strong> Permit to work systems, safe systems of work, method statements, competence requirements, accompaniment, warning signs</li>
                <li className="pl-1"><strong>5. PPE:</strong> Insulating gloves, arc flash suits, face shields, safety boots, helmets — protecting the individual worker when residual risk remains</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why PPE Is the Least Effective Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single point of failure:</strong> If the PPE fails, is damaged or is incorrectly used, the worker is immediately exposed to the full hazard</li>
                <li className="pl-1"><strong>Individual protection only:</strong> PPE protects only the person wearing it — other workers in the area may be unprotected</li>
                <li className="pl-1"><strong>Human factors:</strong> PPE depends on the worker selecting it correctly, putting it on properly, wearing it consistently and maintaining it</li>
                <li className="pl-1"><strong>Comfort and compliance:</strong> PPE can be uncomfortable, hot and restrictive, leading to non-compliance particularly on long tasks</li>
                <li className="pl-1"><strong>False sense of security:</strong> Wearing PPE can lead workers to take greater risks, believing they are fully protected</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PPE at Work Regulations 2022 — Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Employer duty:</strong> Provide suitable PPE free of charge where risks cannot be controlled by other means</li>
                <li className="pl-1"><strong>Suitability assessment:</strong> PPE must be suitable for the risk, the user and the working conditions</li>
                <li className="pl-1"><strong>Compatibility:</strong> Where multiple PPE items are worn together, they must be compatible (e.g., safety helmet with arc flash visor)</li>
                <li className="pl-1"><strong>Maintenance:</strong> Employer must ensure PPE is maintained, repaired or replaced as necessary</li>
                <li className="pl-1"><strong>Storage:</strong> Appropriate storage must be provided to keep PPE in good condition</li>
                <li className="pl-1"><strong>Training:</strong> Workers must be instructed and trained in the use, storage and maintenance of PPE</li>
                <li className="pl-1"><strong>Worker duty:</strong> Workers must use PPE as instructed and report any defects or loss</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you find yourself relying entirely on PPE for protection, the
              risk assessment should be reviewed. There should always be other control measures in place
              alongside PPE to create a layered defence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Insulating Gloves */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulating Gloves for Electrical Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulating gloves are the most critical item of PPE for electrical work. They provide a
              barrier between the worker's hands and live conductors, preventing current from flowing
              through the body. The selection, use, testing and storage of insulating gloves must follow
              strict procedures, as any failure in the glove's insulation can result in fatal electric shock.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulating Glove Classes (BS EN 60903)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Use Voltage (AC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Use Voltage (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Proof Test Voltage (AC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 00</td>
                      <td className="border border-white/10 px-3 py-2">500 V</td>
                      <td className="border border-white/10 px-3 py-2">750 V</td>
                      <td className="border border-white/10 px-3 py-2">2,500 V</td>
                      <td className="border border-white/10 px-3 py-2">Low voltage work up to 500 V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 0</td>
                      <td className="border border-white/10 px-3 py-2">1,000 V</td>
                      <td className="border border-white/10 px-3 py-2">1,500 V</td>
                      <td className="border border-white/10 px-3 py-2">5,000 V</td>
                      <td className="border border-white/10 px-3 py-2">Standard LV work (230/400 V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 1</td>
                      <td className="border border-white/10 px-3 py-2">7,500 V</td>
                      <td className="border border-white/10 px-3 py-2">11,250 V</td>
                      <td className="border border-white/10 px-3 py-2">10,000 V</td>
                      <td className="border border-white/10 px-3 py-2">HV distribution up to 7.5 kV</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 2</td>
                      <td className="border border-white/10 px-3 py-2">17,000 V</td>
                      <td className="border border-white/10 px-3 py-2">25,500 V</td>
                      <td className="border border-white/10 px-3 py-2">20,000 V</td>
                      <td className="border border-white/10 px-3 py-2">HV distribution up to 17 kV</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 3</td>
                      <td className="border border-white/10 px-3 py-2">26,500 V</td>
                      <td className="border border-white/10 px-3 py-2">39,750 V</td>
                      <td className="border border-white/10 px-3 py-2">30,000 V</td>
                      <td className="border border-white/10 px-3 py-2">HV transmission up to 26.5 kV</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 4</td>
                      <td className="border border-white/10 px-3 py-2">36,000 V</td>
                      <td className="border border-white/10 px-3 py-2">54,000 V</td>
                      <td className="border border-white/10 px-3 py-2">40,000 V</td>
                      <td className="border border-white/10 px-3 py-2">HV transmission up to 36 kV</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection, Testing and Replacement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Before each use — visual inspection:</strong> Check for cuts, punctures, embedded objects, swelling, softening, hardening, sticky patches or discolouration</li>
                <li className="pl-1"><strong>Before each use — air test:</strong> Roll the cuff towards the fingers to trap air, squeeze gently and check for leaks. Any leak means immediate withdrawal</li>
                <li className="pl-1"><strong>Every 6 months — electrical retest:</strong> Laboratory dielectric test to the proof voltage for the glove class. Must be carried out by an approved test facility</li>
                <li className="pl-1"><strong>Immediate withdrawal if:</strong> Exposed to an electrical fault, mechanical damage, chemical contamination, excessive heat, or any visible defect</li>
                <li className="pl-1"><strong>Shelf life:</strong> Even unused gloves have a limited shelf life. Most manufacturers recommend a maximum of 12 months from date of test, whether used or not</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Storage Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Store in protective canvas bag or purpose-made canister — natural shape, not folded</li>
                <li className="pl-1">Keep away from direct sunlight, UV sources, ozone (electric motors, generators)</li>
                <li className="pl-1">Store at room temperature — avoid extremes of heat or cold</li>
                <li className="pl-1">Keep away from oils, solvents, chemicals and sharp objects</li>
                <li className="pl-1">Do not store with leather over-gloves inside the insulating gloves (moisture trap)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always wear leather over-gloves on top of insulating gloves during
              practical work. The leather protects the insulating rubber from cuts, punctures and abrasion.
              The combination provides both electrical insulation and mechanical protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Arc Flash PPE */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Arc Flash PPE and Thermal Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Arc flash PPE is designed to protect against the thermal energy, radiant heat, UV radiation,
              molten metal and blast effects of an electrical arc. The required level of protection is
              determined by an arc flash risk assessment, which calculates the incident energy at the
              working distance for the specific equipment. Arc flash PPE is categorised into four levels,
              each providing progressively greater protection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Flash PPE Categories — Detailed Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category 1 (4 cal/cm²):</strong> Single layer arc-rated shirt and trousers, safety glasses, hearing protection, leather gloves. Typical for low-energy LV work at distance</li>
                <li className="pl-1"><strong>Category 2 (8 cal/cm²):</strong> Arc-rated shirt and trousers, arc-rated face shield with balaclava, hearing protection, leather gloves, safety boots. Standard for most LV distribution work</li>
                <li className="pl-1"><strong>Category 3 (25 cal/cm²):</strong> Arc flash suit (coverall or jacket/trousers) with arc-rated hood and face shield visor, arc-rated gloves, leather work boots. Required for higher-energy LV and lower-energy HV work</li>
                <li className="pl-1"><strong>Category 4 (40 cal/cm²):</strong> Multi-layer arc flash suit with arc-rated hood and visor, heavy-duty arc-rated gloves, leather boots with arc-rated gaiters. Required for high-energy HV switchgear work</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">ATPV and EBT — Understanding Arc Ratings</p>
              <p className="text-sm text-white mb-3">
                Every arc-rated garment is tested and assigned an arc rating based on two criteria:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ATPV (Arc Thermal Performance Value):</strong> The incident energy at which there is a 50% probability of the onset of a second-degree burn THROUGH the intact fabric. The fabric provides thermal protection but does not break open</li>
                <li className="pl-1"><strong>EBT (Energy Breakopen Threshold):</strong> The incident energy at which there is a 50% probability the fabric will break open, directly exposing the skin to the arc. This is typically a lower value than ATPV</li>
                <li className="pl-1"><strong>Arc Rating:</strong> The lower of ATPV and EBT. This is the value used to select PPE — it must equal or exceed the calculated incident energy for the task</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Flash PPE Components</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Arc-rated shirt and trousers (or coverall)</li>
                  <li className="pl-1">Arc-rated face shield or hood with visor</li>
                  <li className="pl-1">Arc-rated balaclava for neck and chin protection</li>
                  <li className="pl-1">Arc-rated gloves (leather or arc-specific)</li>
                  <li className="pl-1">Safety boots with insulating soles</li>
                  <li className="pl-1">Hard hat (electrically rated)</li>
                  <li className="pl-1">Hearing protection (earplugs or arc-rated ear muffs)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What NOT to Wear</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Synthetic fabrics (polyester, nylon) — melt onto skin</li>
                  <li className="pl-1">Loose clothing that could catch in equipment</li>
                  <li className="pl-1">Metal jewellery, watches, piercings — conductive</li>
                  <li className="pl-1">Standard safety glasses without side shields</li>
                  <li className="pl-1">Metal-framed spectacles near live parts</li>
                  <li className="pl-1">Non-arc-rated clothing under arc flash PPE</li>
                  <li className="pl-1">Clothing contaminated with oil or grease (flammable)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance and Care of Arc Flash PPE</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Laundering:</strong> Follow manufacturer's instructions. Industrial laundering at specified temperatures. Do not use bleach or fabric softener — these can degrade arc-rated properties</li>
                <li className="pl-1"><strong>Inspection:</strong> Check for tears, thinning, holes, contamination and legible labelling before each use</li>
                <li className="pl-1"><strong>Replacement:</strong> After any arc flash exposure (even without visible damage), when fabric shows wear or thinning, or when labels are illegible</li>
                <li className="pl-1"><strong>Repairs:</strong> Only repairs using arc-rated materials and approved methods. Standard patches or stitching will create a weak point</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Natural fibre clothing (100% cotton) does not melt like synthetics
              and can provide limited thermal protection, but it is NOT arc-rated and should not be relied
              upon as arc flash protection. Only garments specifically tested and rated to a recognised
              standard (ASTM F1506, IEC 61482-2) provide verified arc protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Other Electrical PPE and Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Other Electrical PPE, Selection Criteria and CE/UKCA Marking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond insulating gloves and arc flash clothing, electrical maintenance technicians require
              a range of additional PPE items. Each must be selected to match the specific hazards of
              the task, correctly fitted to the individual, and maintained in serviceable condition. All
              PPE placed on the UK market must carry the appropriate conformity marking.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional PPE for Electrical Work</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">PPE Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Inspection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety helmet</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 397 / BS EN 50365</td>
                      <td className="border border-white/10 px-3 py-2">Head protection; electrical insulation</td>
                      <td className="border border-white/10 px-3 py-2">Check shell, harness, chin strap. Replace if cracked, UV-damaged or impacted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety boots</td>
                      <td className="border border-white/10 px-3 py-2">BS EN ISO 20345 (EH rated)</td>
                      <td className="border border-white/10 px-3 py-2">Insulating soles; toe protection</td>
                      <td className="border border-white/10 px-3 py-2">Check soles, stitching, toe cap. Replace if sole separation or wear-through</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety glasses</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 166</td>
                      <td className="border border-white/10 px-3 py-2">Eye protection from debris and flash</td>
                      <td className="border border-white/10 px-3 py-2">Clean lenses, check for scratches and frame integrity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Face shield</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 166 / arc rated</td>
                      <td className="border border-white/10 px-3 py-2">Full face protection from arc flash</td>
                      <td className="border border-white/10 px-3 py-2">Check visor for cracks, crazing or discolouration. Replace after arc exposure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hearing protection</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 352</td>
                      <td className="border border-white/10 px-3 py-2">Protection from arc flash noise (up to 160 dB)</td>
                      <td className="border border-white/10 px-3 py-2">Check seal, cushions, headband tension</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulating matting</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61111</td>
                      <td className="border border-white/10 px-3 py-2">Floor insulation in front of switchgear</td>
                      <td className="border border-white/10 px-3 py-2">Check for cuts, punctures, contamination. Periodic dielectric test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PPE Selection Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hazard matching:</strong> PPE must be rated for the specific hazard — voltage level, incident energy, mechanical hazards present</li>
                <li className="pl-1"><strong>Correct sizing:</strong> Ill-fitting PPE is dangerous — gloves that are too large reduce dexterity, boots that are too small cause fatigue</li>
                <li className="pl-1"><strong>Compatibility:</strong> All PPE items must work together — e.g., face shield must fit with hard hat, gloves must not interfere with tool use</li>
                <li className="pl-1"><strong>Comfort and wearability:</strong> If PPE is uncomfortable, it will not be worn consistently. Select the most comfortable option that meets the safety requirement</li>
                <li className="pl-1"><strong>Environment:</strong> Consider temperature, humidity, confined spaces and the duration of wear. Breathable fabrics reduce heat stress</li>
                <li className="pl-1"><strong>Dexterity:</strong> Electrical work requires fine motor skills. Select gloves that provide adequate protection without excessive loss of dexterity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CE and UKCA Marking</p>
              <p className="text-sm text-white mb-3">
                All PPE sold in the UK must carry the appropriate conformity marking as evidence that it
                meets the essential health and safety requirements of the PPE Regulation.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category I (simple PPE):</strong> Low-risk protection (e.g., gardening gloves). Self-certified by manufacturer</li>
                <li className="pl-1"><strong>Category II (intermediate PPE):</strong> Most general-purpose PPE (e.g., safety glasses, hard hats, general work gloves). Requires EU-type examination by a Notified Body</li>
                <li className="pl-1"><strong>Category III (complex PPE):</strong> Protection against mortal danger or irreversible health damage (e.g., insulating gloves, arc flash suits, fall protection). Requires EU-type examination AND ongoing production quality assurance by a Notified Body</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to select, use
              and maintain appropriate PPE for the task. You must demonstrate understanding of why PPE is
              the last resort, how to inspect it, and when to replace it. This is assessed through
              practical observation during your End-Point Assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Insulating Glove Classes</p>
                <ul className="space-y-0.5">
                  <li>Class 00 — 500 V AC max</li>
                  <li>Class 0 — 1,000 V AC max (standard LV)</li>
                  <li>Class 1 — 7,500 V AC max</li>
                  <li>Class 2 — 17,000 V AC max</li>
                  <li>Class 3 — 26,500 V AC max</li>
                  <li>Class 4 — 36,000 V AC max</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>PPE at Work Regulations 2022</li>
                  <li>BS EN 60903 — Insulating gloves</li>
                  <li>NFPA 70E / IEEE 1584 — Arc flash</li>
                  <li>BS EN 61111 — Insulating matting</li>
                  <li>ST1426 — Maintenance technician KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Use of Tools
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section2-4">
              Next: Approach Distances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section2_3;
