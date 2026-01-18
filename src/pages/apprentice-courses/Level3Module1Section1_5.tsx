import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Clock, Wrench, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level3Module1Section1_5 = () => {
  useSEO(
    "PUWER & LOLER Regulations - Level 3 Module 1 Section 1.5",
    "Understanding Provision and Use of Work Equipment Regulations 1998 (PUWER) and Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) for electrical installation work"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does PUWER stand for?",
      options: [
        "Personal Use of Work Equipment Regulations",
        "Provision and Use of Work Equipment Regulations",
        "Protection and Use of Workplace Equipment Rules",
        "Practical Use of Work Equipment Requirements"
      ],
      correctAnswer: 1,
      explanation: "PUWER stands for Provision and Use of Work Equipment Regulations 1998. This legislation sets requirements for all work equipment to be suitable for purpose, properly maintained, and safely used."
    },
    {
      id: 2,
      question: "Under PUWER Regulation 4, what is the KEY requirement for work equipment?",
      options: [
        "It must be the cheapest available option",
        "It must be suitable for its intended purpose",
        "It must be less than 5 years old",
        "It must be branded equipment only"
      ],
      correctAnswer: 1,
      explanation: "Regulation 4 (Suitability) requires work equipment to be suitable for its intended use. For electricians, this means using test instruments with correct CAT ratings, tools appropriate for the task, and PPE matched to the hazards present."
    },
    {
      id: 3,
      question: "What does PUWER Regulation 5 require regarding work equipment maintenance?",
      options: [
        "Maintenance is optional if equipment looks okay",
        "Equipment must be maintained in efficient state, working order, and good repair",
        "Only annual servicing is required",
        "Maintenance is the employee's personal responsibility"
      ],
      correctAnswer: 1,
      explanation: "Regulation 5 places a duty on employers to ensure work equipment is maintained in an efficient state, in efficient working order, and in good repair. Where maintenance logs are required, they must be kept up to date."
    },
    {
      id: 4,
      question: "Under PUWER Regulation 6, when must work equipment be inspected by a competent person?",
      options: [
        "Only when it breaks down",
        "Where safety depends on installation conditions, after installation and at suitable intervals",
        "Only when purchased new",
        "Inspection is not required under PUWER"
      ],
      correctAnswer: 1,
      explanation: "Regulation 6 requires inspection by a competent person where the safety of equipment depends on how it is installed. This includes inspection after installation, before first use, and at suitable intervals thereafter."
    },
    {
      id: 5,
      question: "How often must lifting equipment used for lifting PERSONS undergo thorough examination under LOLER?",
      options: [
        "Every 3 months",
        "Every 6 months",
        "Every 12 months",
        "Every 24 months"
      ],
      correctAnswer: 1,
      explanation: "Under LOLER, lifting equipment used for lifting persons (such as MEWPs/cherry pickers) must undergo thorough examination at least every 6 months. This higher frequency reflects the greater risk when people are being lifted."
    },
    {
      id: 6,
      question: "What is the thorough examination interval for lifting equipment NOT used for lifting persons?",
      options: [
        "Every 6 months",
        "Every 12 months",
        "Every 18 months",
        "Every 24 months"
      ],
      correctAnswer: 1,
      explanation: "Lifting equipment not used for lifting persons (such as hoists for materials) must undergo thorough examination at least every 12 months, or in accordance with an examination scheme drawn up by a competent person."
    },
    {
      id: 7,
      question: "Before using a power tool on site, what should an electrician check under PUWER?",
      options: [
        "Just plug it in and test if it works",
        "Visual inspection, PAT label status, and suitability for the task",
        "Only check if it belongs to you",
        "Nothing specific - employer handles all checks"
      ],
      correctAnswer: 1,
      explanation: "Before using any power tool, electricians should visually inspect for damage to cables, plugs and casings, verify PAT test labels are current, ensure guards and safety features work, and confirm the tool is suitable for the specific task."
    },
    {
      id: 8,
      question: "What must be done with a power tool found to have damaged insulation during pre-use inspection?",
      options: [
        "Use it carefully until it can be replaced",
        "Tape over the damage and continue",
        "Immediately withdraw it from use and label it defective",
        "Report it at end of shift"
      ],
      correctAnswer: 2,
      explanation: "Damaged equipment must be immediately withdrawn from use, clearly labelled as defective, and removed from the work area. It must be repaired by a competent person or disposed of. Never continue using damaged electrical equipment."
    },
    {
      id: 9,
      question: "What documentation must be available for lifting equipment under LOLER?",
      options: [
        "No documentation is legally required",
        "Only purchase receipts",
        "Reports of thorough examinations and SWL markings",
        "Just the manufacturer's handbook"
      ],
      correctAnswer: 2,
      explanation: "LOLER requires that reports of thorough examinations are kept and made available. Equipment must also be clearly marked with its Safe Working Load (SWL). Operating lifting equipment without valid documentation is a breach of LOLER."
    },
    {
      id: 10,
      question: "Which organisation provides recognised training certification for MEWP operators?",
      options: [
        "HSE directly",
        "IPAF (International Powered Access Federation)",
        "City & Guilds only",
        "No training is required"
      ],
      correctAnswer: 1,
      explanation: "IPAF (International Powered Access Federation) is the industry standard body providing training and certification for MEWP operators. LOLER requires operators to be adequately trained and competent for the equipment they use."
    },
    {
      id: 11,
      question: "What is the SWL marking on lifting equipment?",
      options: [
        "Standard Working Limit",
        "Safe Working Load",
        "Site Work Location",
        "Supplier Warranty Label"
      ],
      correctAnswer: 1,
      explanation: "SWL stands for Safe Working Load - the maximum load the equipment is designed to lift safely. Before any lifting operation, you must check the SWL is adequate for the intended load. Exceeding SWL can cause catastrophic failure."
    },
    {
      id: 12,
      question: "Under PUWER, who has the primary duty to ensure work equipment is suitable and safe?",
      options: [
        "The equipment manufacturer",
        "The employee using it",
        "The employer",
        "The HSE"
      ],
      correctAnswer: 2,
      explanation: "Employers have the primary duty under PUWER to provide suitable, maintained, and safe equipment. However, employees also have duties to use equipment properly, report defects, and cooperate with safety measures."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            to="/study-centre/apprentice/level3-module1-section1"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white active:text-elec-yellow text-sm sm:text-base min-h-[44px] touch-manipulation transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Section 1</span>
          </Link>
          <span className="inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-xs sm:text-sm font-medium">
            1.5
          </span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">

          {/* HEADER */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-sm font-medium">
              <Wrench className="w-4 h-4" />
              Section 1.5
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              PUWER & LOLER
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Provision and Use of Work Equipment Regulations 1998 & Lifting Operations and Lifting Equipment Regulations 1998
            </p>
          </header>

          {/* QUICK SUMMARY BOX */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">In 30 Seconds</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  PUWER covers ALL work equipment - must be suitable, maintained, inspected
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  LOLER covers lifting equipment - 6 monthly for persons, 12 monthly for materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Visual inspection before EVERY use - withdraw damaged equipment immediately
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Check SWL (Safe Working Load) before any lifting operation
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Spot it / Use it</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Spot:</strong> PAT labels, damage, thorough examination certificates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Use:</strong> Equipment suitable for task, within safe limits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Check:</strong> Inspection dates, SWL markings, condition before use
                </li>
              </ul>
            </div>
          </div>

          {/* LEARNING OUTCOMES */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <p className="text-white/70 mb-4 text-sm sm:text-base">By the end of this section, you will be able to:</p>
            <ul className="space-y-3">
              {[
                "Explain the main requirements of PUWER Regulations 4, 5, and 6",
                "Identify how PUWER applies to electrical tools and test equipment",
                "Understand LOLER requirements for thorough examination of lifting equipment",
                "Describe the difference between 6-month and 12-month examination intervals",
                "Apply PUWER and LOLER requirements in practical electrical work situations",
                "Know what actions to take when equipment is found to be defective"
              ].map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm sm:text-base">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 01: PUWER Requirements */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">PUWER Requirements - Suitability, Maintenance, Inspection</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Provision and Use of Work Equipment Regulations 1998 (PUWER)</strong> applies to all work equipment provided for use at work. "Work equipment" includes any machinery, appliance, apparatus, tool, or installation used at work - from a simple screwdriver to complex multifunction test instruments.
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-3">Why PUWER matters to electricians:</h4>
                <p className="text-white/80 text-sm">
                  Every tool you pick up - your multifunction tester, voltage indicator, power drill, extension lead - is covered by PUWER. The legislation exists because defective or unsuitable equipment causes hundreds of serious injuries every year. As an electrician, you're particularly at risk because your work involves both electrical hazards and mechanical hazards from tools.
                </p>
              </div>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Regulation 4 - Suitability</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Equipment must be <strong className="text-white">suitable for its intended purpose</strong>. For electricians, this means using the RIGHT tool for the job. A voltage indicator must be rated for the voltage being tested. Test instruments must have appropriate CAT ratings for the installation type. Using a CAT III instrument in a CAT IV environment would breach suitability requirements - and could result in injury or death if an arc flash occurs.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Regulation 5 - Maintenance</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Work equipment must be maintained in an <strong className="text-white">efficient state, in efficient working order, and in good repair</strong>. Where equipment has a maintenance log, it must be kept up to date. For electricians, this covers regular servicing of power tools, calibration of test instruments, and prompt repair or replacement of any defective items.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Regulation 6 - Inspection</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Where the safety of equipment depends on installation conditions, it must be <strong className="text-white">inspected after installation and at suitable intervals</strong> by a competent person. This applies to fixed equipment as well as portable tools. Records of inspections must be kept. The frequency of inspection depends on the risk - high-use tools on construction sites need more frequent inspection than office equipment.
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id="puwer-reg5-check"
              question="Under PUWER Regulation 5, what is the employer's duty regarding work equipment?"
              options={[
                "Maintenance is optional if equipment looks okay",
                "Equipment must be maintained in efficient state, working order, and good repair",
                "Only repair when equipment completely fails",
                "Maintenance is the employee's personal responsibility"
              ]}
              correctIndex={1}
              explanation="Regulation 5 requires employers to ensure work equipment is maintained in an efficient state, in efficient working order, and in good repair. This is a legal duty - not optional."
            />
          </section>

          {/* SECTION 02: Electrical Equipment Under PUWER */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Electrical Equipment Under PUWER</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Understanding how PUWER applies to your specific tools and equipment is essential for safe working. Every piece of kit you use daily falls under these requirements - and failure to comply puts both you and your employer at legal risk.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Test Instruments</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    All electrical test equipment falls under PUWER - multifunction testers, insulation resistance testers, RCD testers, voltage indicators, earth loop impedance testers. They must be suitable for intended use (correct CAT rating), properly maintained, and regularly calibrated. Test leads and probes must be inspected for damage before use. Instruments should carry calibration certificates showing they are within accuracy specifications - typically recalibrated annually.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Power Tools</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Drills, grinders, circular saws, jigsaws, and other power tools are subject to PUWER. Before use, check for: damaged cables or plugs, cracked casings, proper guard function, correct blade/bit installation, and valid PAT labels. 110V tools are preferred on construction sites to reduce shock risk, but they still require the same inspection regime as 230V equipment.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Extension Leads</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Often overlooked, extension leads are work equipment under PUWER. They must be of suitable rating for the intended load, inspected for cable damage before use, fully unwound during use to prevent overheating, and included in PAT testing schedules. A damaged extension lead can cause fire or electric shock - treat them with the same care as any other electrical equipment.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Portable Appliance Testing (PAT)</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    While PAT testing is not a specific legal requirement, it is a practical way to demonstrate PUWER compliance for portable electrical equipment. Equipment should be visually inspected before each use and formally tested at intervals determined by risk assessment. Failed equipment must be immediately removed from service, clearly labelled as defective, and either repaired by a competent person or disposed of.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-1">Pre-Use Inspection - Every Time</h4>
                    <p className="text-white/80 text-sm">
                      Every time you pick up a tool, perform a quick visual inspection: check cables and connections, look for visible damage, ensure guards and safety features are in place, verify any test dates are current. This takes seconds but prevents accidents. If you find a defect, DO NOT USE the equipment - withdraw it immediately and report it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="damaged-tool-check"
              question="What should you do if you find a power tool with damaged cable insulation during pre-use inspection?"
              options={[
                "Use it carefully until the job is finished",
                "Tape over the damage and continue",
                "Immediately withdraw it from use and label it defective",
                "Report it at end of shift but keep using it"
              ]}
              correctIndex={2}
              explanation="Damaged equipment must be immediately withdrawn from use, clearly labelled as defective, and removed from the work area. Never continue using damaged electrical equipment - it risks electric shock and fire."
            />
          </section>

          {/* SECTION 03: LOLER Requirements */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">LOLER Requirements - Lifting Equipment</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)</strong> apply to all lifting equipment and lifting operations in the workplace. For electricians, this commonly includes MEWPs (cherry pickers), scaffold hoists, lifting slings, and any equipment used to lift loads or people.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-semibold text-amber-400 mb-2">6-Month Examination</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Equipment used for <strong className="text-white">lifting persons</strong> must be thoroughly examined at least every 6 months. This includes MEWPs (cherry pickers, scissor lifts), personnel hoists, and cradles. The higher frequency reflects the greater consequence of failure when people are being lifted.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">12-Month Examination</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Equipment used for lifting <strong className="text-white">materials only</strong> must be thoroughly examined at least every 12 months. This includes scaffold hoists, cranes, and lifting beams. An examination scheme by a competent person may specify different intervals based on use.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Safe Working Load (SWL)</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  All lifting equipment must be clearly marked with its <strong className="text-white">Safe Working Load</strong>. Before using any lifting equipment, you MUST check the SWL marking and ensure your intended load does not exceed this limit. Overloading lifting equipment can cause catastrophic failure - chains can snap, hydraulics can fail, structures can collapse. Never exceed the SWL under any circumstances.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Lifting Accessories</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  LOLER also covers lifting accessories - chains, slings, shackles, eyebolts. These must be examined every 6 months and marked with their SWL. Unlike other equipment, damaged lifting accessories <strong className="text-white">cannot be repaired and reused</strong> - they must be disposed of. A worn chain link or frayed sling could fail under load with fatal consequences.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Documentation Requirements</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Reports of thorough examinations must be kept and made available. Before using lifting equipment, verify that current examination certificates are available and the equipment has not exceeded its examination due date. Operating equipment without valid documentation is a breach of LOLER - and puts you at risk if the equipment fails.
                </p>
              </div>
            </div>

            <InlineCheck
              id="mewp-examination-check"
              question="How often must a MEWP (cherry picker) used for lifting electricians undergo thorough examination?"
              options={[
                "Every 3 months",
                "Every 6 months",
                "Every 12 months",
                "Every 24 months"
              ]}
              correctIndex={1}
              explanation="Equipment used for lifting persons, including MEWPs, must undergo thorough examination at least every 6 months under LOLER. This is more frequent than the 12-month requirement for equipment lifting materials only."
            />
          </section>

          {/* SECTION 04: Practical Application */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Practical Application for Electricians</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Knowing the regulations is one thing - applying them on site every day is what keeps you safe and legal. Here's how PUWER and LOLER translate into your daily work routine.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Daily Pre-Use Checks</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Before starting work each day, visually inspect all equipment you will use. Check power tool cables for cuts or damage, verify test instrument calibration is current, inspect PPE for wear or damage, check any lifting equipment certificates. This should become automatic - it only takes a few minutes but could save your life.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Using MEWPs (Cherry Pickers)</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    When working from a MEWP, you must: verify the thorough examination is current (within 6 months), check the SWL includes combined weight of operatives, tools and materials, ensure you have received appropriate training and familiarisation, perform pre-use checks per the operator's manual, and ensure rescue plans are in place. Never operate a MEWP without valid documentation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Using Scaffold Hoists</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    When materials need to be lifted to height, scaffold hoists are commonly used. Check the thorough examination certificate is current (12 months), verify the SWL is adequate for your load, inspect the hoist rope or chain for damage, ensure the load is properly secured before lifting, and keep the area below clear during lifting operations.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Reporting Defects</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Any equipment defects discovered MUST be reported immediately to your employer or site supervisor. Defective equipment must be labelled and removed from the work area to prevent inadvertent use by others. Never attempt to repair lifting equipment or accessories in the field - this must be done by competent persons with appropriate certification.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Competence and Training</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Both PUWER and LOLER require persons using work equipment to be adequately trained and competent. For electricians, this includes training in specific test instruments, safe use of power tools, and where using lifting equipment like MEWPs, specific operator training such as IPAF certification. You should not use equipment you haven't been trained on.
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id="mewp-first-check"
              question="Before using a MEWP on site, what is the FIRST thing an electrician should verify?"
              options={[
                "The fuel level",
                "That the thorough examination is current (within 6 months)",
                "The colour scheme matches the site",
                "That it has a radio"
              ]}
              correctIndex={1}
              explanation="The first verification should be that the thorough examination is current - within 6 months for equipment lifting persons. Operating a MEWP without valid examination documentation is a breach of LOLER and puts you at serious risk."
            />
          </section>

          {/* REAL-WORLD EXAMPLE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white">Real-World Case: The Overlooked Examination Date</h3>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                <strong className="text-white">The Situation:</strong> An electrical contractor was hired to install external lighting on a warehouse. The work required a cherry picker to access high-level installation points. The site foreman directed the electrician to a MEWP available on site.
              </p>
              <p>
                <strong className="text-white">The Near Miss:</strong> The electrician noticed the thorough examination sticker showed it was 8 months since the last examination - 2 months overdue. When he raised this with the foreman, he was told "it's fine, we've been using it for weeks." The electrician refused to use the equipment and reported the issue.
              </p>
              <p>
                <strong className="text-white">The Investigation:</strong> An HSE inspector visited following the report. The MEWP was examined and found to have significant hydraulic issues that could have caused the platform to fail during use. The site manager received an Improvement Notice and faced potential prosecution.
              </p>
              <p>
                <strong className="text-white">The Lesson:</strong> Always check examination dates before using lifting equipment. The electrician's knowledge of LOLER requirements and refusal to use non-compliant equipment potentially prevented a serious accident. Never assume equipment is compliant - verify it yourself.
              </p>
            </div>
          </div>

          {/* PRACTICAL GUIDANCE */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance - Compliance Checklists</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">PUWER Compliance Checklist</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Visual inspection before each use
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Check PAT test labels are current
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Verify test instrument calibration dates
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Withdraw damaged equipment immediately
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Use equipment only for intended purpose
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Ensure you're trained for the equipment
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">LOLER Compliance Checklist</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Check thorough examination is current
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Verify SWL is adequate for load
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Inspect accessories for wear/damage
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Ensure operator training (e.g., IPAF)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Perform pre-use checks per manual
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Never exceed the Safe Working Load
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Who is responsible for PUWER compliance - employer or employee?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  The employer has the primary legal duty under PUWER to provide suitable, maintained, and safe equipment. However, employees also have duties to use equipment properly, report defects, and not misuse safety devices. If you're self-employed, you have the same duties as an employer for equipment you provide.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Can I use my own personal tools on site?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Yes, but personal tools used for work are still subject to PUWER. They must be suitable for the task, properly maintained, and included in inspection regimes. Many employers require personal tools to be included in their PAT testing schedules when used on their sites.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>What training do I need to operate a MEWP?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  LOLER requires operators to be adequately trained and competent. IPAF (International Powered Access Federation) training is the industry standard for MEWP operators. This covers safe operation, pre-use checks, emergency procedures, and rescue. Familiarisation training is also required for specific machine types.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Can damaged lifting accessories be repaired?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  No. Unlike most equipment, damaged lifting accessories such as chains, slings, and shackles cannot be repaired and reused. They must be disposed of immediately. The integrity of these items is critical - a repaired weak point could fail catastrophically under load.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>What happens if I'm asked to use equipment without valid examination?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  You should refuse to use it. Using lifting equipment without valid documentation is a breach of LOLER. Report the issue to your supervisor and document your concerns. You cannot be disciplined for refusing to undertake work that you reasonably believe puts you in serious and imminent danger.
                </p>
              </details>
            </div>
          </div>

          {/* QUICK REFERENCE / POCKET GUIDE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide - PUWER & LOLER Quick Reference</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">PUWER Key Points:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>* <strong className="text-white">Reg 4:</strong> Equipment must be suitable for purpose</li>
                  <li>* <strong className="text-white">Reg 5:</strong> Must be maintained in good repair</li>
                  <li>* <strong className="text-white">Reg 6:</strong> Inspection by competent person</li>
                  <li>* Applies to ALL work equipment</li>
                  <li>* Visual check before EVERY use</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">LOLER Key Points:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>* <strong className="text-white">6 months:</strong> Lifting persons (MEWPs)</li>
                  <li>* <strong className="text-white">12 months:</strong> Lifting materials only</li>
                  <li>* Check SWL before EVERY lift</li>
                  <li>* Keep examination records available</li>
                  <li>* Damaged accessories = dispose, not repair</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#1a1a1a] border border-white/10">
              <p className="text-white/80 text-sm text-center">
                <strong className="text-elec-yellow">Remember:</strong> PUWER = ALL work equipment | LOLER = Lifting equipment | Both require suitable, maintained, examined equipment!
              </p>
            </div>
          </div>

          {/* QUIZ */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <Quiz questions={quizQuestions} />
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              to="/study-centre/apprentice/level3-module1-section1"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Section 1
            </Link>
            <Link
              to="/study-centre/apprentice/level3-module1-section1-6"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-elec-yellow text-[#1a1a1a] font-medium hover:bg-elec-yellow/90 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              Next: 1.6 Working at Height
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section1_5;
