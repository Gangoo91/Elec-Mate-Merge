import { ArrowLeft, Monitor, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Digital vs Paper-Based Reporting - MOET Module 6 Section 3.3";
const DESCRIPTION = "Comparison of digital and paper-based maintenance reporting systems, advantages and limitations, mobile CMMS applications, hybrid approaches and data security for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "digital-advantage",
    question: "What is the primary advantage of digital reporting over paper-based systems?",
    options: [
      "Digital systems never have technical problems",
      "Real-time data access, searchability and automated trend analysis across the entire asset base",
      "Digital reports are always more accurate than paper",
      "Paper-based systems are no longer legal"
    ],
    correctIndex: 1,
    explanation: "Digital reporting provides real-time data access from any location, powerful search and filter capabilities, and automated trend analysis. This enables faster decision-making, better resource planning, and proactive maintenance strategies."
  },
  {
    id: "paper-advantage",
    question: "In which situation might paper-based reporting be preferred?",
    options: [
      "Paper is always preferred in modern maintenance",
      "In ATEX hazardous zones where electronic devices are prohibited, or where network connectivity is unreliable",
      "When the team prefers not to learn new technology",
      "When the organisation wants to save on all IT costs"
    ],
    correctIndex: 1,
    explanation: "Paper-based reporting may be preferred or required in hazardous environments where electronic devices are prohibited (e.g., ATEX Zone 0), in locations with no network coverage, or as a backup when digital systems are unavailable."
  },
  {
    id: "hybrid-approach",
    question: "A hybrid reporting approach means:",
    options: [
      "Using only paper in the morning and digital in the afternoon",
      "Combining digital and paper methods strategically to suit different operational contexts",
      "Having two separate CMMS systems running in parallel",
      "Printing all digital reports onto paper for filing"
    ],
    correctIndex: 1,
    explanation: "A hybrid approach combines digital and paper methods strategically. For example, using mobile CMMS in most areas but paper PTW forms in ATEX zones, then scanning and uploading to the CMMS. All data ultimately feeds into a single asset history."
  },
  {
    id: "digital-single-source",
    question: "The concept of a 'single source of truth' in maintenance data means:",
    options: [
      "Only one person can enter data into the system",
      "All maintenance data is consolidated into one authoritative system, eliminating conflicting records across spreadsheets, paper files and personal notebooks",
      "The first entry made is always correct",
      "Only digital records count as truth"
    ],
    correctIndex: 1,
    explanation: "A single source of truth means all maintenance data — regardless of how it was initially captured (mobile device, paper form, sensor) — is consolidated into one authoritative system (typically the CMMS). This eliminates the confusion and risk that arises when different team members hold different versions of the same information in personal notebooks, spreadsheets, and filing cabinets."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A key advantage of CMMS-based digital reporting is:",
    options: [
      "It eliminates the need for maintenance records",
      "Automated work order generation, real-time dashboards and KPI tracking",
      "It guarantees 100% equipment reliability",
      "It replaces the need for competent technicians"
    ],
    correctAnswer: 1,
    explanation: "CMMS-based digital reporting enables automated work order generation from condition triggers, real-time dashboards showing maintenance status, and KPI tracking for metrics like MTBF, MTTR and schedule compliance."
  },
  {
    id: 2,
    question: "A disadvantage of paper-based maintenance reporting is:",
    options: [
      "It is always less accurate than digital",
      "Difficulty in searching records, risk of loss or damage, and inability to perform automated trend analysis",
      "It cannot be used in legal proceedings",
      "Paper records have no audit value"
    ],
    correctAnswer: 1,
    explanation: "Paper-based records are difficult to search, vulnerable to physical damage or loss, and cannot be automatically analysed for trends. Retrieving a specific asset's maintenance history from years of paper files is time-consuming."
  },
  {
    id: 3,
    question: "Mobile CMMS applications are particularly useful because:",
    options: [
      "They replace the need for training",
      "They allow real-time data entry at the point of work with access to asset history and technical documents",
      "They make all maintenance automatic",
      "They eliminate the need for safety procedures"
    ],
    correctAnswer: 1,
    explanation: "Mobile CMMS apps allow technicians to update work orders in real time at the point of work, view asset history and technical documents on site, capture photographs, and scan barcodes for asset identification."
  },
  {
    id: 4,
    question: "When transitioning from paper to digital, the biggest challenge is typically:",
    options: [
      "The cost of paper shredders",
      "Change management — ensuring all staff adopt the new system consistently and correctly",
      "The digital system will not accept data",
      "Regulators do not accept digital records"
    ],
    correctAnswer: 1,
    explanation: "Change management is the biggest challenge. Some technicians may resist new technology, training is needed for all users, and consistent adoption is essential. A phased rollout with adequate training is more successful than an abrupt switchover."
  },
  {
    id: 5,
    question: "Barcode and QR code scanning in maintenance is used to:",
    options: [
      "Track the location of individual technicians",
      "Quickly and accurately identify assets, reducing transcription errors and linking to CMMS records",
      "Replace all written work descriptions",
      "Print labels for cable identification"
    ],
    correctAnswer: 1,
    explanation: "Barcode and QR code scanning enables rapid, accurate asset identification by linking the physical equipment tag to the CMMS database record. This eliminates transcription errors and speeds up data entry."
  },
  {
    id: 6,
    question: "Digital photographs in fault reports are valuable because:",
    options: [
      "They replace the need for written descriptions",
      "They provide visual evidence, support remote diagnosis and enhance the written record",
      "They are required by law for every fault",
      "They make reports look more professional"
    ],
    correctAnswer: 1,
    explanation: "Digital photographs supplement the written fault description with visual evidence showing equipment condition, damage, and state before and after repair. They are invaluable for remote diagnosis, training and insurance claims."
  },
  {
    id: 7,
    question: "Data security for digital maintenance records includes:",
    options: [
      "There are no security concerns with digital records",
      "Access controls, regular backups, audit trails and compliance with data protection regulations",
      "Simply password-protecting one spreadsheet",
      "Printing a paper backup of every digital record"
    ],
    correctAnswer: 1,
    explanation: "Digital records require proper access controls (role-based permissions), regular backups (ideally automated and off-site), audit trails showing who created or modified records, and compliance with GDPR where personal data is involved."
  },
  {
    id: 8,
    question: "Cloud-based CMMS platforms offer which advantage over on-premise systems?",
    options: [
      "They do not require internet connectivity",
      "Accessibility from any device with internet, automatic updates and reduced IT infrastructure costs",
      "They are always cheaper than paper",
      "They store data only on the local device"
    ],
    correctAnswer: 1,
    explanation: "Cloud-based CMMS platforms can be accessed from any device with internet connectivity, receive automatic software updates, and reduce the need for on-site server infrastructure."
  },
  {
    id: 9,
    question: "When using a tablet to record maintenance data on site, you should:",
    options: [
      "Complete all fields from memory back at the office",
      "Enter data accurately at the point of work, verify readings before submitting, and use offline mode if needed",
      "Take a photograph and let someone else enter the data",
      "Only record pass/fail results"
    ],
    correctAnswer: 1,
    explanation: "Data should be entered accurately at the point of work where observations are fresh. Readings should be verified before submission. If connectivity is poor, use offline mode and sync when connectivity returns."
  },
  {
    id: 10,
    question: "The term 'single source of truth' in maintenance data means:",
    options: [
      "Only one person is allowed to enter data",
      "All maintenance data is consolidated into one authoritative system, eliminating conflicting records",
      "Only one type of record is kept",
      "The first record entered is always correct"
    ],
    correctAnswer: 1,
    explanation: "A 'single source of truth' means all maintenance data — regardless of how initially captured — is consolidated into one authoritative system (typically the CMMS). This eliminates conflicting information across spreadsheets, paper files and personal notebooks."
  },
  {
    id: 11,
    question: "Digital maintenance dashboards are most useful for:",
    options: [
      "Displaying attractive graphics for visitors",
      "Providing real-time visibility of maintenance KPIs, outstanding work orders and asset condition",
      "Replacing the maintenance planner role",
      "Monitoring individual technician bathroom breaks"
    ],
    correctAnswer: 1,
    explanation: "Dashboards provide real-time visibility of KPIs (schedule compliance, backlog, MTBF/MTTR), outstanding work order status, and asset condition summaries. This supports informed decision-making and resource allocation."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician should be able to:",
    options: [
      "Design and build digital reporting systems",
      "Use both digital and paper-based recording methods competently, selecting the appropriate method for context",
      "Only use the specific CMMS their employer provides",
      "Avoid digital technology and use only paper"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects technicians to be competent with both digital and paper-based recording methods and to select the most appropriate method based on operational context."
  }
];

const faqs = [
  {
    question: "Is paper-based reporting still acceptable in modern maintenance?",
    answer: "Yes, paper-based reporting remains acceptable and is sometimes required — for example, in ATEX hazardous areas or for statutory forms requiring wet signatures. However, best practice is to digitise paper records as soon as practicable so they are incorporated into the central maintenance management system."
  },
  {
    question: "What happens to our data if the CMMS vendor goes out of business?",
    answer: "Your data should be exportable in standard formats (CSV, PDF, database exports). Reputable vendors provide data portability clauses in contracts. Regular backups should be maintained independently of the vendor's systems. Cloud-based platforms typically offer data export tools as standard."
  },
  {
    question: "How do we maintain data quality in a digital system?",
    answer: "Data quality is maintained through mandatory fields, dropdown selections, validation rules, regular audits, user training, and a culture that values accurate recording. A CMMS is only as good as the data entered — the principle of 'garbage in, garbage out' applies."
  },
  {
    question: "Can I use my personal phone for mobile CMMS data entry?",
    answer: "This depends on your employer's IT and data security policies. Some organisations allow Bring Your Own Device (BYOD) with appropriate security measures. Others require company-issued devices. Always check your employer's policy before using personal devices for work data."
  },
  {
    question: "What are the GDPR implications of digital maintenance records?",
    answer: "If records contain personal data (technician names, signatures, photographs), GDPR applies. Organisations must have a lawful basis for processing, ensure appropriate security, define retention periods, and respond to data subject access requests. Maintenance records are usually justified under 'legitimate interests' but should be managed in line with your organisation's data protection policy."
  }
];

const MOETModule6Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3">
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
            <Monitor className="h-4 w-4" />
            <span>Module 6.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Digital vs Paper-Based Reporting
          </h1>
          <p className="text-white/80">
            Comparing reporting methods, implementation strategies and hybrid approaches
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Digital:</strong> Real-time access, searchable, automated analytics</li>
              <li className="pl-1"><strong>Paper:</strong> No power/network needed, ATEX compliant, familiar</li>
              <li className="pl-1"><strong>Hybrid:</strong> Best of both — context-appropriate method selection</li>
              <li className="pl-1"><strong>Goal:</strong> Single source of truth for all asset data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Mobile CMMS:</strong> Data entry at the point of work</li>
              <li className="pl-1"><strong>QR/barcode:</strong> Accurate asset identification on site</li>
              <li className="pl-1"><strong>Photo evidence:</strong> Visual fault documentation</li>
              <li className="pl-1"><strong>ST1426:</strong> Competence with both methods required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare advantages and limitations of digital and paper-based reporting",
              "Identify when each method is most appropriate in electrical maintenance",
              "Describe features and benefits of mobile CMMS applications",
              "Explain hybrid reporting strategies for different contexts",
              "Understand data security and quality considerations for digital systems",
              "Apply ST1426 requirements for using both digital and paper methods"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Digital Reporting Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital reporting has transformed maintenance management. Modern CMMS platforms provide mobile applications, real-time dashboards, automated work order generation, and powerful analytics that paper-based systems cannot match. For electrical maintenance, digital systems enable rapid access to asset history, circuit diagrams and previous fault records at the point of work — information that can be the difference between a quick diagnosis and hours of troubleshooting.
            </p>
            <p>
              The shift to digital is not merely about convenience. It fundamentally changes the way maintenance data is used. Paper records are passive — they sit in filing cabinets until someone physically retrieves them. Digital records are active — they can trigger automatic alerts when parameters exceed thresholds, generate trend graphs that reveal deterioration patterns, and produce KPI reports that demonstrate maintenance programme effectiveness. This transition from passive storage to active intelligence is the core advantage of digital reporting.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Benefits of Digital Reporting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real-time visibility:</strong> Managers see maintenance status instantly — no waiting for paper reports</li>
                <li className="pl-1"><strong>Searchability:</strong> Find any record across the entire asset base in seconds</li>
                <li className="pl-1"><strong>Automated triggers:</strong> Condition-based alerts and auto-generated work orders</li>
                <li className="pl-1"><strong>Trend analysis:</strong> Automatic KPI calculation and deterioration tracking</li>
                <li className="pl-1"><strong>Integration:</strong> Links to procurement, stores, finance and BMS systems</li>
                <li className="pl-1"><strong>Consistency:</strong> Mandatory fields and dropdown selections enforce data standards</li>
                <li className="pl-1"><strong>Remote access:</strong> View and update records from any location</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mobile CMMS Features for Technicians</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Receive and accept work orders on your mobile device</li>
                <li className="pl-1">View asset history, drawings and manuals at the point of work</li>
                <li className="pl-1">Scan barcodes/QR codes for instant asset identification</li>
                <li className="pl-1">Capture photographs and attach them to work orders</li>
                <li className="pl-1">Record test measurements directly into digital forms</li>
                <li className="pl-1">Offline mode — work without connectivity, sync when reconnected</li>
                <li className="pl-1">Digital signatures for sign-off procedures</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Digital Does Not Mean Perfect</p>
              <p className="text-sm text-white">
                Digital systems bring their own challenges: dependency on network connectivity, battery life limitations on mobile devices, software bugs and updates, the risk of data loss from server failures, and the ongoing costs of licences and subscriptions. A digital system is only as good as its implementation, configuration, and the discipline of its users. Technology alone does not improve maintenance — it is a tool that enables improvement when properly used.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Paper-Based Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Despite the rise of digital systems, paper-based reporting retains a legitimate role in maintenance. Understanding its strengths and limitations ensures you can work effectively with both methods and select the most appropriate approach for each situation. Paper reporting is not inherently inferior — in certain contexts, it is the better or only viable option.
            </p>
            <p>
              Paper records have served the maintenance industry for decades and, when properly maintained, provide legally valid documentation of maintenance activities. The key challenge with paper is not the recording itself but the subsequent management of the information: storing, retrieving, analysing, and sharing paper records is inherently slower and more labour-intensive than working with digital data.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Digital</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Paper</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Accessibility</td>
                      <td className="border border-white/10 px-3 py-2">Any device, any location with connectivity</td>
                      <td className="border border-white/10 px-3 py-2">Physical access to file required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Searchability</td>
                      <td className="border border-white/10 px-3 py-2">Instant search across all records</td>
                      <td className="border border-white/10 px-3 py-2">Manual search — time consuming</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Durability</td>
                      <td className="border border-white/10 px-3 py-2">Requires backups, server maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Vulnerable to fire, water, loss</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hazardous areas</td>
                      <td className="border border-white/10 px-3 py-2">ATEX-rated devices required</td>
                      <td className="border border-white/10 px-3 py-2">No restrictions — no ignition risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Power dependency</td>
                      <td className="border border-white/10 px-3 py-2">Requires charged device</td>
                      <td className="border border-white/10 px-3 py-2">None — always available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Analysis</td>
                      <td className="border border-white/10 px-3 py-2">Automated trends, KPIs, dashboards</td>
                      <td className="border border-white/10 px-3 py-2">Manual analysis only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher initial, lower ongoing per record</td>
                      <td className="border border-white/10 px-3 py-2">Lower initial, higher ongoing (storage, retrieval)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Paper Remains Appropriate</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ATEX Zone 0 and Zone 1:</strong> Electronic devices are prohibited unless specifically ATEX certified — paper is the only option</li>
                <li className="pl-1"><strong>No network coverage:</strong> Remote sites, deep basements, or shielded areas where mobile devices cannot connect</li>
                <li className="pl-1"><strong>Statutory requirements:</strong> Some regulatory forms still require wet signatures (though this is decreasing)</li>
                <li className="pl-1"><strong>Emergency backup:</strong> Paper forms should always be available as a contingency when digital systems fail</li>
                <li className="pl-1"><strong>Switchroom logbooks:</strong> Immediate access without needing to log in to a device</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hybrid Approaches and Transition Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most organisations use a hybrid approach — combining digital and paper methods to suit different operational contexts. The key is ensuring all data ultimately feeds into a single, authoritative record system. A well-designed hybrid approach captures the benefits of digital systems while accommodating the practical realities of situations where paper remains necessary or more appropriate.
            </p>
            <p>
              The transition from a predominantly paper-based system to a predominantly digital one is a significant organisational change that requires careful planning, adequate resourcing, and sustained commitment. Organisations that attempt to switch overnight, without proper training and change management, typically experience poor adoption, data quality problems, and frustration from both technicians and managers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Hybrid Scenarios</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Mobile CMMS for routine work orders; paper PTW forms in hazardous areas</li>
                <li className="pl-1">Digital data entry at the point of work; printed reports for client handover</li>
                <li className="pl-1">Paper logbooks in switchrooms (immediate access); scanned and uploaded to CMMS daily</li>
                <li className="pl-1">Digital planned maintenance; paper emergency breakdown notes (transferred later)</li>
                <li className="pl-1">Digital certificates for competent person scheme submission; paper copies for site files</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Transition Best Practices</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Phased rollout:</strong> Start with one team or one site, learn from the experience, then expand</li>
                <li className="pl-1"><strong>Adequate training:</strong> Every user needs hands-on training, not just a manual</li>
                <li className="pl-1"><strong>Champion users:</strong> Identify enthusiastic early adopters who can support colleagues</li>
                <li className="pl-1"><strong>Data migration:</strong> Decide what historical paper records to digitise — prioritise active assets</li>
                <li className="pl-1"><strong>Feedback loop:</strong> Gather user feedback and refine the system configuration</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Transition Pitfalls to Avoid</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Running parallel systems without a clear migration plan</li>
                <li className="pl-1">Inconsistent adoption — some technicians using digital, others still on paper</li>
                <li className="pl-1">Insufficient training leading to poor data quality</li>
                <li className="pl-1">Losing historical paper records during transition — always digitise first</li>
                <li className="pl-1">Over-engineering the digital system — start simple and add complexity gradually</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The reporting method is a tool — what matters most is the quality, accuracy and completeness of the information recorded. A well-completed paper form is infinitely more valuable than a poorly completed digital record.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Security, Quality and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital maintenance records carry responsibilities for data security, quality assurance, and regulatory compliance. As a technician, you play a key role in maintaining data integrity — every record you create, modify, or access is part of a system that must be trustworthy, secure, and auditable. Understanding these responsibilities is essential for professional practice under ST1426.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data Security Essentials</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use strong, unique passwords for CMMS access</li>
                  <li className="pl-1">Never share login credentials with colleagues</li>
                  <li className="pl-1">Log out of shared devices after use</li>
                  <li className="pl-1">Report suspected data breaches immediately</li>
                  <li className="pl-1">Follow your organisation's acceptable use policy</li>
                  <li className="pl-1">Be careful with sensitive data on personal devices</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data Quality Principles</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Enter data promptly — ideally at the point of work</li>
                  <li className="pl-1">Verify values before submitting</li>
                  <li className="pl-1">Use standard terminology and correct asset identifiers</li>
                  <li className="pl-1">Complete all mandatory fields without shortcuts</li>
                  <li className="pl-1">If unsure about a field, ask — do not guess</li>
                  <li className="pl-1">Record actual values, not rounded estimates</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulatory Compliance Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>GDPR:</strong> If records contain personal data (names, signatures, photos), data protection requirements apply</li>
                <li className="pl-1"><strong>EAWR 1989:</strong> Digital records are valid evidence of compliance, provided they are secure and auditable</li>
                <li className="pl-1"><strong>Electronic signatures:</strong> Legally valid under the Electronic Communications Act 2000 and eIDAS Regulation</li>
                <li className="pl-1"><strong>Retention periods:</strong> Digital records must be retained for the same periods as paper equivalents</li>
                <li className="pl-1"><strong>Backup requirements:</strong> Regular automated backups with off-site storage to prevent data loss</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The standard requires maintenance technicians to use information technology appropriately. This includes competent CMMS use, data security understanding, and accurate digital records. Demonstrating these skills is assessed in the EPA professional discussion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Future of Maintenance Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance reporting continues to evolve with technology. Understanding emerging trends helps you prepare for the direction the industry is moving and positions you as a forward-thinking technician who can adapt to new methods and tools.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emerging Trends</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IoT and automated data collection:</strong> Sensors automatically feed data into the CMMS, reducing manual entry and enabling real-time monitoring</li>
                <li className="pl-1"><strong>Artificial intelligence:</strong> Machine learning algorithms analyse trend data to predict failures more accurately than manual review</li>
                <li className="pl-1"><strong>Augmented reality:</strong> AR overlays on mobile devices show asset data, procedures, and diagrams while looking at the equipment</li>
                <li className="pl-1"><strong>Digital twins:</strong> Virtual replicas of physical assets enable simulation and predictive analysis</li>
                <li className="pl-1"><strong>Voice-to-text:</strong> Hands-free data entry using voice recognition, particularly useful when working in constrained spaces</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Important:</strong> Regardless of how reporting technology evolves, the fundamental principles remain unchanged: data must be accurate, complete, timely, and secure. The technician who masters these principles will adapt easily to any reporting system — paper, digital, or whatever comes next.
            </p>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Digital Advantages</p>
                <ul className="space-y-0.5">
                  <li>Real-time access and dashboards</li>
                  <li>Instant search across all records</li>
                  <li>Automated trend analysis and KPIs</li>
                  <li>Integration with business systems</li>
                  <li>Mobile access at the point of work</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Paper Advantages</p>
                <ul className="space-y-0.5">
                  <li>No power or connectivity required</li>
                  <li>ATEX zone compliant</li>
                  <li>Familiar and intuitive</li>
                  <li>No software training needed</li>
                  <li>Backup when digital systems are down</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3.2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-4">
              Next: Traceability & Compliance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule6Section3_3;
