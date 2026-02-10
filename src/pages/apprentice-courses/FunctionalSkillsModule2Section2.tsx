import { ArrowLeft, ArrowRight, PenTool, FileCheck, ClipboardList, Mail, FileText, NotebookPen, AlertTriangle, CheckCircle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule2Section2 = () => {
  useSEO(
    "Section 2: Technical Writing - English for Electricians",
    "Master technical writing skills for EICR forms, EIC certificates, method statements, professional emails and technical reports in the electrical trade."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "When completing an EICR, what does a C1 classification code indicate?",
      options: [
        "An improvement is recommended",
        "The observation requires further investigation",
        "Danger present — risk of injury; immediate remedial action required",
        "The installation meets all current standards"
      ],
      correctAnswer: 2,
      explanation: "A C1 (Code 1) classification indicates that danger is present and there is a risk of injury. Immediate remedial action is required. This is the most serious classification and means the defect needs to be addressed straight away."
    },
    {
      id: 2,
      question: "Which of the following is the correct way to describe a defect on an EICR?",
      options: [
        "Socket in kitchen is dodgy",
        "Missing earth connection to socket outlet in kitchen — circuit 5",
        "Kitchen socket needs fixing",
        "Problem with socket"
      ],
      correctAnswer: 1,
      explanation: "Technical writing on certification forms must be precise, specific, and unambiguous. 'Missing earth connection to socket outlet in kitchen — circuit 5' clearly identifies the defect, the location, and the circuit. Vague descriptions like 'dodgy' or 'needs fixing' are unprofessional and unhelpful."
    },
    {
      id: 3,
      question: "On an Electrical Installation Certificate (EIC), which section records the results of the initial verification tests?",
      options: [
        "Section A — Details of the contractor",
        "Section B — Details of the installation",
        "Schedule of Test Results",
        "Section D — Declaration"
      ],
      correctAnswer: 2,
      explanation: "The Schedule of Test Results accompanies the EIC and records all the test values obtained during initial verification, including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD test results."
    },
    {
      id: 4,
      question: "What is the most important consideration when writing a method statement?",
      options: [
        "Using as many technical terms as possible",
        "Making it as short as possible",
        "Ensuring it is clear, accurate, and can be understood by all personnel",
        "Including photographs on every page"
      ],
      correctAnswer: 2,
      explanation: "The primary purpose of a method statement is to communicate how work will be carried out safely. It must be clear enough for all personnel involved to understand, including those whose first language may not be English. Clarity and accuracy take priority over brevity or complexity."
    },
    {
      id: 5,
      question: "When sending a professional email to a client about a completed installation, which opening is most appropriate?",
      options: [
        "Hiya, just letting you know the job's done",
        "Dear Mr Thompson, I am writing to confirm that the electrical installation work at your property has been completed",
        "Hi mate, all finished at yours",
        "To whom it may concern, the job is done"
      ],
      correctAnswer: 1,
      explanation: "Professional emails should use formal language, address the client by name, and clearly state the purpose. 'Dear Mr Thompson, I am writing to confirm...' is professional, specific, and sets the right tone for client communication."
    },
    {
      id: 6,
      question: "Which of the following is a common writing mistake that electricians should avoid on certification forms?",
      options: [
        "Using the full circuit reference number",
        "Recording test values to the correct number of decimal places",
        "Using abbreviations that are not universally understood",
        "Including the date of the inspection"
      ],
      correctAnswer: 2,
      explanation: "Using non-standard abbreviations can cause confusion. While common abbreviations like MCB, RCD, and CPC are widely understood in the trade, informal or company-specific abbreviations should be avoided on official forms that may be read by other professionals."
    },
    {
      id: 7,
      question: "When writing a technical report about a fault you have investigated, what should you include?",
      options: [
        "Only the solution — the client does not need to know the details",
        "A description of the fault, the investigation process, findings, and recommended actions",
        "Just the cost of the repair",
        "A copy of your qualifications"
      ],
      correctAnswer: 1,
      explanation: "A technical report should provide a complete picture: what the fault was, how you investigated it, what you found, and what actions you recommend. This gives the client confidence in your work and creates a clear record for future reference."
    },
    {
      id: 8,
      question: "What information should always be recorded on a day sheet or site diary?",
      options: [
        "Only the materials used",
        "Date, personnel on site, work carried out, materials used, any issues encountered, and hours worked",
        "Just the start and finish time",
        "Only problems or delays"
      ],
      correctAnswer: 1,
      explanation: "Day sheets should provide a comprehensive daily record: the date, who was on site, what work was done, what materials were used, any problems encountered, and hours worked. This information is essential for project management, invoicing, and resolving any disputes."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module2" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 2 &bull; Section 2</p>
            <h1 className="text-base font-bold text-white">Technical Writing</h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <PenTool className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Technical Writing</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">Learn to write clear, accurate, and professional technical documents that meet industry standards and protect your reputation.</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Professional Writing Standards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Professional Writing Standards</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The documents you produce as an electrician carry legal weight. An Electrical Installation Certificate (EIC) is a legal declaration that the work complies with BS 7671. An EICR is an official assessment of an installation's safety. Method statements and risk assessments are legally required safety documents. Every word you write on these forms matters.
            </p>
            <p>
              Poor writing on technical documents can have serious consequences. Vague or inaccurate descriptions of defects may lead to safety issues being overlooked. Incomplete test records can result in failed audits. Unprofessional emails can damage your reputation and cost you clients. Developing strong technical writing skills is not optional — it is essential to your career.
            </p>

            <h4 className="text-white font-semibold pt-2">The four principles of technical writing</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Clarity:</strong> Write so that your meaning cannot be misunderstood. If a sentence could be interpreted in two ways, rewrite it. Use simple, direct language.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Accuracy:</strong> Every fact, figure, and description must be correct. Double-check test values, regulation references, and technical details before writing them down.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Completeness:</strong> Include all necessary information. A partially completed form is as problematic as an incorrect one. Fill in every required field.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Professionalism:</strong> Your writing reflects your competence. Neat handwriting (or well-formatted digital documents), correct spelling, and proper grammar demonstrate attention to detail — the same attention you apply to your electrical work.</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Your technical writing is a reflection of your professional competence. A well-written EICR or EIC shows that you are thorough, careful, and knowledgeable. A poorly written one suggests the opposite — regardless of how good your electrical work actually is.</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Common standards to follow</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use UK English spelling (colour, centre, metre, defence)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Write dates in the format DD/MM/YYYY (e.g. 15/03/2026)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use standard industry abbreviations (MCB, RCD, CPC, EICR) but avoid informal shorthand</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Write in the third person for formal documents ("The installation was tested..." not "I tested...")</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use consistent terminology throughout a document — do not switch between "consumer unit" and "fuseboard"</span></li>
            </ul>
          </div>
        </motion.div>

        {/* Section 02 — Completing EICR Forms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Completing EICR Forms</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Electrical Installation Condition Report (EICR) is one of the most important documents you will complete as an electrician. It assesses the condition of an existing electrical installation and identifies any defects or non-compliances. Completing it accurately requires both technical knowledge and strong writing skills.
            </p>

            <h4 className="text-white font-semibold pt-2">Structure of an EICR</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section A — Details of the person ordering the report:</strong> Client name, address, contact details</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section B — Details of the installation:</strong> Address (if different from A), date of last inspection, evidence of alterations</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section C — Supply characteristics:</strong> Earthing system (TN-S, TN-C-S, TT), supply voltage, protective device ratings, prospective fault current</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section D — Particulars of the installation:</strong> Number of circuits, type of wiring, age of installation</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section E — Summary of the condition:</strong> Overall assessment — satisfactory or unsatisfactory</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Section F — Observations and recommendations:</strong> This is where your writing skills are most critical</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Classification codes</h4>
            <p>Each observation must be assigned a classification code. Understanding and correctly applying these codes is essential:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-red-400">C1 — Danger present:</strong> Risk of injury. Immediate remedial action required. The person responsible for the installation should be advised to take action immediately.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-orange-400">C2 — Potentially dangerous:</strong> Urgent remedial action required. The defect could become dangerous if left unaddressed.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-yellow-400">C3 — Improvement recommended:</strong> The installation does not comply with current standards but is not immediately dangerous. Improvement is recommended.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-blue-400">FI — Further investigation:</strong> The observation requires further investigation to determine its significance. This might be used when access is limited or testing was not possible.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Writing clear observations</h4>
            <p>Each observation should follow this structure:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">What is the defect?</strong> Be specific about what is wrong</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Where is it?</strong> Give the precise location (room, circuit number, distribution board reference)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Why is it a problem?</strong> Reference the relevant regulation if appropriate</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Examples of good vs poor observations</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <div className="space-y-3">
                <div>
                  <p className="text-red-400 font-semibold text-xs mb-1">Poor:</p>
                  <p className="text-white/60 italic">"Socket in kitchen not right"</p>
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-xs mb-1">Good:</p>
                  <p className="text-white/90">"Missing CPC connection at double socket outlet adjacent to sink in kitchen — circuit 5 from DB1. Non-compliance with Regulation 411.3.1.1 (C2)"</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-red-400 font-semibold text-xs mb-1">Poor:</p>
                  <p className="text-white/60 italic">"Old wiring"</p>
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-xs mb-1">Good:</p>
                  <p className="text-white/90">"Rubber-insulated cables to first-floor lighting circuit (circuit 2, DB1) show signs of insulation deterioration. Insulation resistance test result: 0.8 MOhm. Recommend rewire of affected circuit (C2)"</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Every observation on an EICR should be specific enough that another electrician could find the defect and understand the issue without any additional explanation from you. If your description requires verbal clarification, it is not detailed enough.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          id="m2s2-eicr-codes"
          question="You discover that a consumer unit has no main switch and the installation is relying on the DNO's service fuse as the only means of isolation. What classification code would you assign?"
          options={["C3 — Improvement recommended", "FI — Further investigation", "C2 — Potentially dangerous", "C1 — Danger present"]}
          correctIndex={3}
          explanation="The absence of a main switch means there is no safe means of isolation available to the user. This represents immediate danger (C1) because anyone needing to isolate the supply in an emergency would be unable to do so safely."
        />

        {/* Section 03 — Writing EIC & MEIWC Forms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Writing EIC &amp; MEIWC Forms</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Electrical Installation Certificate (EIC) and Minor Electrical Installation Works Certificate (MEIWC) are the documents you issue to declare that new work or alterations comply with BS 7671. They are your professional declaration — your signature on these forms means you are certifying that the work is safe and compliant.
            </p>

            <h4 className="text-white font-semibold pt-2">Electrical Installation Certificate (EIC)</h4>
            <p>An EIC is required for all new installations and for alterations or additions to existing installations that include new circuits. It consists of:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 1 — Details of the designer:</strong> The person who designed the installation (may be the same as the installer)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 2 — Details of the installer:</strong> The person or company that carried out the installation work</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Part 3 — Details of the person commissioning the inspection and testing:</strong> The person who carried out initial verification</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Schedule of Inspections:</strong> A checklist confirming that all required visual inspections were carried out</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Schedule of Test Results:</strong> All test values recorded during initial verification</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Minor Electrical Installation Works Certificate (MEIWC)</h4>
            <p>A MEIWC is used for minor work that does not include a new circuit, such as:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Adding a socket outlet to an existing circuit</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Replacing a light fitting with a different type</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Adding a fused connection unit to an existing ring final circuit</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Installing an outdoor socket from an existing circuit</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Writing tips for certification forms</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Record test values accurately:</strong> Write the actual measured value, not the expected value. If insulation resistance measured 200 MOhm, write 200, not &gt;200.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Complete every field:</strong> If a field is not applicable, write "N/A" rather than leaving it blank. Blank fields look like omissions.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Use consistent units:</strong> Record all resistance values in ohms (with appropriate prefix: MOhm, kohm, ohm) and clearly label the units.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Include circuit descriptions:</strong> Use clear, descriptive names for circuits (e.g. "Kitchen sockets ring" not just "Ring 1").</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Sign and date:</strong> Your signature is your professional declaration. Always sign and date the certificate on the day of completion.</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Your signature on an EIC or MEIWC is a legal declaration that the work complies with BS 7671. If a defect is later found, this certificate is the first document that will be examined. Make sure it accurately reflects the work you carried out and the results you obtained.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — Method Statement Writing */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Method Statement Writing</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              While Section 1 covered reading method statements, as you progress in your career you will be expected to write them. A well-written method statement demonstrates your understanding of the work, the hazards involved, and the measures needed to carry it out safely.
            </p>

            <h4 className="text-white font-semibold pt-2">Writing the sequence of operations</h4>
            <p>This is the most critical part of a method statement. Each step should:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be numbered sequentially:</strong> Use clear numbering (1, 2, 3...) so that steps can be referenced easily</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Start with an action verb:</strong> "Isolate the supply...", "Verify dead using...", "Connect the...", "Test the..."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be specific:</strong> "Isolate the supply at the main switch in the consumer unit" is better than "Turn off the power"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Include safety measures at each step:</strong> If a step involves a specific hazard, state the control measure within that step</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Be logical:</strong> Steps should follow in the order they will actually be carried out on site</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Example: Well-written sequence (cable installation in ceiling void)</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <ol className="space-y-2 list-decimal list-inside text-white/70">
                <li>Carry out a toolbox talk with all personnel covering the hazards identified in the associated risk assessment</li>
                <li>Confirm the ceiling void has been inspected for asbestos-containing materials (refer to asbestos survey report)</li>
                <li>Set up a mobile tower scaffold in accordance with the manufacturer's instructions (PASMA trained operatives only)</li>
                <li>Remove ceiling tiles to gain access to the void. Wear dust mask (FFP2 minimum) and safety glasses</li>
                <li>Install cable tray supports at 1.2m maximum centres using appropriate fixings for the building structure</li>
                <li>Route cables on cable tray in accordance with the cable schedule (drawing ref: E-101 Rev C)</li>
                <li>Maintain a minimum separation of 50mm from data cables at crossings, and 300mm for parallel runs</li>
                <li>Secure cables to tray using cable ties at 300mm centres</li>
                <li>Label all cables at both ends with the circuit reference number</li>
                <li>Replace ceiling tiles, ensuring no cables are trapped or damaged</li>
                <li>Dismantle scaffold and clear the work area of all tools, materials, and waste</li>
              </ol>
            </div>

            <h4 className="text-white font-semibold pt-2">Tone and language</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use imperative sentences (commands): "Isolate...", "Verify...", "Install..."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Avoid jargon that non-electrical trades may not understand</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Do not use humour or informal language — this is a safety document</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Be concise but thorough — every word should serve a purpose</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">A good method statement should be detailed enough that someone who has never visited the site could understand exactly how the work will be carried out. If you have to explain something verbally that is not in the document, the document needs updating.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          id="m2s2-method-statement"
          question="When writing the sequence of operations in a method statement, what should each step begin with?"
          options={["A description of the hazard", "An action verb (e.g. Isolate, Verify, Install)", "The name of the person responsible", "A reference to the relevant regulation"]}
          correctIndex={1}
          explanation="Each step in a method statement should begin with a clear action verb that tells the reader exactly what to do. Starting with verbs like 'Isolate', 'Verify', 'Install', 'Test', or 'Connect' makes the instructions direct and unambiguous."
        />

        {/* Section 05 — Professional Emails */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Professional Emails</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Email is the primary method of written communication in the electrical industry. Whether you are quoting for work, confirming appointments, reporting on completed installations, or raising issues on a commercial project, your emails represent you and your company. Professional email writing is a skill that will directly affect your career success.
            </p>

            <h4 className="text-white font-semibold pt-2">Structure of a professional email</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Subject line:</strong> Clear and specific. "Electrical Installation Complete — 14 Oak Lane" is far better than "Job done" or "Update"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Greeting:</strong> "Dear Mr/Mrs [Name]" for clients, "Hi [First Name]" for colleagues you work with regularly</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Opening line:</strong> State the purpose immediately. "I am writing to confirm..." or "Further to our conversation on..."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Body:</strong> Provide the details in clear, short paragraphs. Use bullet points for lists of items or actions.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Closing:</strong> State any actions required or next steps. "Please let me know if you have any questions."</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Sign-off:</strong> "Kind regards" or "Best regards" followed by your name, company, and contact details</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Example: Completion email to a client</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2 font-mono text-xs text-white/70">
              <p className="text-white/90 mb-1"><strong>Subject:</strong> Consumer Unit Replacement Complete — 27 Elm Street</p>
              <p className="mb-2">Dear Mrs Johnson,</p>
              <p className="mb-2">I am writing to confirm that the consumer unit replacement at your property has been completed. The work included:</p>
              <ul className="mb-2 ml-4 list-disc list-inside space-y-1">
                <li>Removal of the existing rewireable fuse board</li>
                <li>Installation of a new 18th Edition dual RCD consumer unit</li>
                <li>Full initial verification testing of all circuits</li>
              </ul>
              <p className="mb-2">All circuits have been tested and are operating correctly. I have attached the Electrical Installation Certificate (EIC) and the Building Regulations compliance notification for your records. Please keep these documents safe, as they will be needed for any future property sale or insurance claim.</p>
              <p className="mb-2">If you notice any issues with your electrics or have any questions, please do not hesitate to contact me.</p>
              <p className="mb-1">Kind regards,</p>
              <p>James Walker</p>
              <p>Walker Electrical Services</p>
              <p>07700 900123 | james@walkerelectrical.co.uk</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Common mistakes to avoid</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Text speak:</strong> Never use "u", "r", "2moro", or similar abbreviations in professional emails</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">All capitals:</strong> Writing in all capitals reads as SHOUTING and is unprofessional</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">No subject line:</strong> Emails without subject lines are harder to find later and look unprofessional</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Replying in anger:</strong> If you receive a difficult email, wait before responding. A calm, professional reply always reflects better on you</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Before sending any email, read it back to yourself. Check for spelling errors, ensure the tone is professional, and confirm that all necessary information is included. A two-minute review can prevent an embarrassing mistake.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 06 — Technical Reports */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Technical Reports</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              At times, you will need to write technical reports — for example, when investigating a fault, assessing the feasibility of a proposed alteration, or reporting on the condition of an installation beyond the standard EICR format. A well-structured technical report demonstrates your expertise and provides a clear record for your client.
            </p>

            <h4 className="text-white font-semibold pt-2">Structure of a technical report</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Title and reference:</strong> A clear title, your company details, the date, and a unique reference number</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Introduction:</strong> Why the report was commissioned and what it covers</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Background:</strong> Relevant history of the installation or the issue being investigated</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Investigation/findings:</strong> What you inspected, tested, and discovered. Include test results, photographs, and observations.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Conclusions:</strong> Your professional assessment based on the findings</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Recommendations:</strong> What action should be taken, with estimated costs if requested</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Appendices:</strong> Supporting documents — test results, photographs, relevant datasheets</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Example: Fault investigation report (extract)</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-white/90 font-semibold mb-2">Findings:</p>
              <p className="text-white/70 mb-2">
                Upon investigation, the intermittent tripping of the RCD protecting the downstairs socket circuits was found to be caused by a deteriorated cable joint in the underfloor void beneath the kitchen. The joint, which appeared to be an unauthorised addition to the original installation, showed signs of moisture ingress and corrosion of the conductors.
              </p>
              <p className="text-white/70 mb-2">
                Insulation resistance testing of the affected circuit with the joint disconnected returned a reading of 150 MOhm. With the joint reconnected, the reading dropped to 0.3 MOhm, confirming the joint as the source of the fault.
              </p>
              <p className="text-white/90 font-semibold mb-2">Recommendations:</p>
              <p className="text-white/70">
                1. The defective joint should be removed and the cable replaced with a continuous run of 2.5mm² twin and earth cable from the distribution board to the first socket outlet on the circuit. 2. The circuit should be re-tested following the repair and the results recorded. 3. A full EICR is recommended, as the presence of one unauthorised alteration suggests there may be others.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Write technical reports in a factual, objective tone. Present your findings before your conclusions, and let the evidence support your recommendations. Avoid speculation or opinion that is not backed by your observations and test results.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          id="m2s2-technical-reports"
          question="In a technical report about a fault investigation, which should come first — your findings or your recommendations?"
          options={["Recommendations — the client wants to know what to do", "Findings — the evidence should support the recommendations", "Cost estimate — the client needs to know the price first", "Conclusions — start with the summary"]}
          correctIndex={1}
          explanation="In a technical report, you should present your findings first, then your conclusions, and finally your recommendations. This logical structure allows the reader to see the evidence before the suggested actions, building confidence in your professional assessment."
        />

        {/* Section 07 — Site Notes & Day Sheets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Site Notes &amp; Day Sheets</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Day sheets (also called site diaries or daily reports) are your daily record of what happened on site. They might seem like mundane paperwork, but they serve critical purposes: they support your invoices, provide evidence in disputes, track project progress, and create a permanent record that may be needed months or years later.
            </p>

            <h4 className="text-white font-semibold pt-2">What to record every day</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Date and weather conditions:</strong> Weather can affect work progress and may be relevant to insurance claims</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Personnel on site:</strong> Names and roles of all electrical operatives present, including subcontractors</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Hours worked:</strong> Start time, finish time, and any breaks. Important for labour cost tracking</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Work carried out:</strong> A clear description of what was done that day. Be specific: "First fix cabling to ground-floor sockets and lighting — plots 1-4" is better than "First fix"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Materials used:</strong> What was used and quantities where significant. Helps with stock control and cost tracking</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Issues and delays:</strong> Record anything that affected progress — other trades blocking access, missing materials, design changes, weather stoppages</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Instructions received:</strong> Any verbal instructions from the project manager, site agent, or client — and confirm them in writing afterwards</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Visitors:</strong> Record any visitors to your work area, including inspectors, consultants, or client representatives</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Why day sheets matter</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Payment disputes:</strong> If a client queries your invoice, day sheets provide evidence of the work done and hours spent</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Delay claims:</strong> On commercial contracts, if other trades caused delays to your work, day sheet records support your claim for additional time or costs</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Defect investigations:</strong> If a problem is discovered later, day sheets can help establish when and how the work was done</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Project handover:</strong> Day sheets contribute to the project record and can be included in the O&amp;M manual</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Complete your day sheet at the end of every working day, while the details are fresh. A day sheet written a week later from memory is far less reliable — and far less useful in a dispute — than one written on the day.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Common Writing Mistakes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Common Writing Mistakes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Awareness of common mistakes is the first step to avoiding them. Here are the errors most frequently seen on technical documents in the electrical trade, along with guidance on how to correct them.
            </p>

            <h4 className="text-white font-semibold pt-2">Vague or ambiguous descriptions</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span className="text-white/60"><strong>Avoid:</strong> "Some wiring needs replacing"</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span className="text-white/90"><strong>Write:</strong> "Rubber-insulated cables to first-floor lighting circuits (circuits 1 and 2 from DB1) require replacement due to insulation deterioration"</span></div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Incomplete information</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span className="text-white/60"><strong>Avoid:</strong> Leaving blank fields on certification forms</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span className="text-white/90"><strong>Write:</strong> "N/A" for fields that are not applicable, and complete all other fields with the correct information</span></div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Spelling and terminology errors</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Consumer unit</strong> — not "consumer box", "fuse box", or "fuseboard" on official documents</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Circuit protective conductor (CPC)</strong> — not just "earth wire" on formal documents</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Residual current device (RCD)</strong> — not "trip switch" on certification</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Miniature circuit breaker (MCB)</strong> — not "breaker" or "fuse" on official forms</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Inconsistent formatting</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use the same date format throughout (DD/MM/YYYY)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use the same unit conventions (always ohm or always omega symbol, not a mix)</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use the same terminology throughout — if you call it a "consumer unit" at the start, do not switch to "distribution board" later in the same document</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Missing signatures and dates</h4>
            <p>
              An unsigned or undated certificate has no legal standing. Always check that you have signed and dated every page or section that requires it before leaving site. On multi-page documents, ensure every page is numbered and referenced.
            </p>

            <h4 className="text-white font-semibold pt-2">Proofreading checklist</h4>
            <p>Before submitting any technical document, check the following:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all required fields completed?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all test values recorded correctly and in the right units?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all addresses, names, and dates correct?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Is the spelling correct, especially of technical terms?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all observations clear, specific, and correctly classified?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Have you signed and dated the document?</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Would another electrician understand everything without needing to ask you for clarification?</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The best way to improve your technical writing is to review what you have written with fresh eyes. Put the document down for a few minutes, then read it again as if you were seeing it for the first time. Errors that were invisible when you were writing will become obvious when you read it back.</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Section 2: Technical Writing Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link to="/study-centre/apprentice/functional-skills/module2/section1" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation">
            <ArrowLeft className="w-4 h-4" />Reading Documents
          </Link>
          <Link to="/study-centre/apprentice/functional-skills/module2/section3" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25">
            Communication Skills<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule2Section2;
