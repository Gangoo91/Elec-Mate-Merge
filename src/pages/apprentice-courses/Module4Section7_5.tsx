import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Keeping the Work Area Safe and Organised - Module 4.7.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn effective workplace organisation and housekeeping practices. Master safe storage, waste management, and maintaining clear access routes for improved safety and productivity.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation requires housekeeping to be maintained on construction sites?",
    options: ["CDM 2015", "PUWER 1998", "PPE Regulations 1992", "Manual Handling Operations Regulations"],
    correctIndex: 0,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM) require housekeeping standards to be maintained throughout construction projects."
  },
  {
    id: 2,
    question: "Name one hazard caused by leaving waste in the work area.",
    options: ["Fire hazards from flammable materials", "Improved organisation", "Better visibility", "Reduced work time"],
    correctIndex: 0,
    explanation: "Waste materials, particularly flammable packaging and offcuts, can create fire hazards if left near heat sources or ignition points."
  },
  {
    id: 3,
    question: "Why should heavy items be stored at waist height where possible?",
    options: ["To reduce manual handling risks", "To save floor space", "To improve appearance", "To prevent theft"],
    correctIndex: 0,
    explanation: "Storing heavy items at waist height reduces the need for lifting from floor level or reaching overhead, significantly reducing manual handling injury risks."
  }
];

const Module4Section7_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation requires safe housekeeping on construction projects?",
      options: [
        "PUWER 1998",
        "CDM 2015",
        "PPE Regulations 1992",
        "EAWR 1989"
      ],
      correctAnswer: 1,
      explanation: "The Construction (Design and Management) Regulations 2015 (CDM) specifically require safe housekeeping standards to be maintained throughout construction projects."
    },
    {
      id: 2,
      question: "True or False: It is acceptable to leave waste in voids as long as it's out of sight.",
      options: [
        "True",
        "False",
        "Only non-flammable waste",
        "Only for short periods"
      ],
      correctAnswer: 1,
      explanation: "False - leaving waste in voids poses fire risks, breaches regulations, and can interfere with building services or future maintenance access."
    },
    {
      id: 3,
      question: "Name two hazards of poor housekeeping.",
      options: [
        "Better organisation and efficiency",
        "Slips/trips and fire hazards",
        "Improved visibility and access",
        "Reduced material costs"
      ],
      correctAnswer: 1,
      explanation: "Poor housekeeping creates slip, trip and fall hazards from debris, and fire hazards from accumulation of flammable materials near ignition sources."
    },
    {
      id: 4,
      question: "Why should cable reels be stored off the floor?",
      options: [
        "To save space",
        "To prevent damage and trip hazards",
        "To make them look tidy",
        "To avoid colour fading"
      ],
      correctAnswer: 1,
      explanation: "Storing cable reels off the floor prevents damage from moisture, impact, and wheeled traffic, while also eliminating trip hazards for site personnel."
    },
    {
      id: 5,
      question: "What is the recommended safe storage level for heavy materials?",
      options: [
        "Floor level",
        "Waist height",
        "Shoulder height",
        "Above head height"
      ],
      correctAnswer: 1,
      explanation: "Waist height storage minimises manual handling risks by reducing the lifting distance and awkward postures required to access heavy materials."
    },
    {
      id: 6,
      question: "Which piece of equipment helps to manage trailing cables safely?",
      options: [
        "Cable ties",
        "Cable stands or hooks",
        "Plastic bags",
        "Tool boxes"
      ],
      correctAnswer: 1,
      explanation: "Cable stands or hooks keep trailing leads off the floor and organised, preventing trip hazards and cable damage from foot traffic."
    },
    {
      id: 7,
      question: "True or False: Only supervisors are responsible for site housekeeping.",
      options: [
        "True",
        "False",
        "Only for major clean-ups",
        "Only in designated areas"
      ],
      correctAnswer: 1,
      explanation: "False - everyone on site is responsible for housekeeping. Good organisation and cleanliness are shared responsibilities that contribute to overall safety."
    },
    {
      id: 8,
      question: "Give one reason why 'clear as you go' is better than tidying up at the end of the day only.",
      options: [
        "Uses less time overall",
        "Reduces hazards during work, not just at the end",
        "Requires fewer people",
        "Creates less waste"
      ],
      correctAnswer: 1,
      explanation: "'Clear as you go' maintains safety throughout the working day, preventing accidents during work activities rather than allowing hazards to accumulate."
    },
    {
      id: 9,
      question: "Name one legal duty under the Health and Safety at Work Act related to the work area.",
      options: [
        "Provide expensive equipment",
        "Duty to keep workplace safe and without risks to health",
        "Hire additional staff",
        "Work longer hours"
      ],
      correctAnswer: 1,
      explanation: "The Health and Safety at Work Act places a legal duty on employers and employees to keep the workplace safe and without risks to health."
    },
    {
      id: 10,
      question: "Why should all access and escape routes be kept clear?",
      options: [
        "To meet fire safety and emergency requirements",
        "To reduce waste collection times",
        "To improve airflow",
        "To prevent tool loss"
      ],
      correctAnswer: 0,
      explanation: "Clear access and escape routes are essential for fire safety and emergency evacuation, allowing rapid exit in case of incidents or emergencies."
    }
  ];

  const faqs = [
    {
      question: "Whose responsibility is it to keep the work area clean?",
      answer: "Everyone on site – not just labourers or cleaners. Good housekeeping is a shared responsibility that contributes to overall site safety and efficiency. Each trade and individual worker should maintain their work area and contribute to general site cleanliness."
    },
    {
      question: "Can waste be left in voids or risers if hidden?",
      answer: "No – this poses fire risks and breaches regulations. Waste in voids can interfere with building services, create fire hazards, and make future maintenance work dangerous. All waste must be properly disposed of in designated areas."
    },
    {
      question: "Do small tools need to be stored properly even if used frequently?",
      answer: "Yes – leaving them lying around increases trip hazards and risks of damage or theft. Frequently used tools should be kept in tool belts, pouches, or designated areas where they're secure but easily accessible."
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
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Keeping the Work Area Safe and Organised
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master workplace organisation and housekeeping practices to maintain safety, efficiency, and legal compliance.
            </p>
          </header>

          {/* In 30 Seconds / Spot it Use it */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li>A clean, organised work area prevents accidents and improves efficiency in electrical installation work.</li>
                  <li>Legal duties under HASAWA 1974 and CDM 2015 require maintaining safe and organised workspaces.</li>
                  <li>Proper tool storage, waste management, and 'clear as you go' practices are essential for site safety.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li><strong>Spot:</strong> Trailing cables, scattered tools, waste accumulation, blocked access routes, poor material storage.</li>
                  <li><strong>Use:</strong> Tool belts, cable stands, waste bins, designated storage areas, daily tidy-up routines.</li>
                  <li><strong>Check:</strong> Clear access routes, secure tool storage, proper waste disposal, organised material storage.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc ml-6 space-y-2">
                <li>Recognise the risks of a disorganised workspace.</li>
                <li>Apply safe systems for storage and housekeeping.</li>
                <li>Manage waste materials responsibly on site.</li>
                <li>Maintain safe access and escape routes.</li>
                <li>Integrate organisation into daily working routines.</li>
              </ul>
            </div>
          </section>

          {/* Hazards of a Poorly Managed Workspace */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Hazards of a Poorly Managed Workspace
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Disorganised workspaces create multiple serious hazards that can lead to accidents, injuries, and project delays:
              </p>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Safety and Productivity Hazards</p>
                <ul className="text-white/80 text-sm space-y-2 list-disc ml-4">
                  <li><strong>Slips, trips, and falls</strong> - from trailing cables, scattered tools, packaging materials, and debris</li>
                  <li><strong>Fire hazards</strong> - flammable waste materials left near heat sources, electrical equipment, or ignition points</li>
                  <li><strong>Projectile risks</strong> - loose materials and tools that can fall from heights or be displaced by movement</li>
                  <li><strong>Access obstruction</strong> - blocked pathways preventing emergency evacuation or routine movement</li>
                  <li><strong>Tool and material damage</strong> - equipment left exposed to damage from foot traffic, weather, or impact</li>
                  <li><strong>Security risks</strong> - valuable tools and materials left unattended and vulnerable to theft</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Productivity impacts:</p>
                <p className="text-white/70 text-sm">
                  Poor organisation directly affects work efficiency. Time lost searching for tools, delays from damaged materials, and work disruption from accident investigations all contribute to increased project costs and reduced competitiveness.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Psychological effects:</p>
                <p className="text-white/70 text-sm">
                  Cluttered, disorganised workspaces increase stress levels, reduce concentration, and contribute to fatigue. This can lead to poor decision-making and increased accident risk, creating a cycle of declining safety standards.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Legal Duties */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Legal Duties
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Workplace organisation and housekeeping are legal requirements backed by comprehensive legislation and enforcement:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Legislative Requirements and Responsibilities</p>
                <ul className="text-white/80 text-sm space-y-2 list-disc ml-4">
                  <li><strong>Health and Safety at Work Act 1974</strong> - employers and employees have duty to keep workplaces safe and without risks to health</li>
                  <li><strong>CDM Regulations 2015</strong> - require housekeeping standards to be maintained throughout construction projects</li>
                  <li><strong>Workplace Regulations 1992</strong> - specify requirements for workplace cleanliness, lighting, and organisation</li>
                  <li><strong>Management Regulations 1999</strong> - require systematic approach to health and safety management including housekeeping</li>
                  <li><strong>Fire Safety Order 2005</strong> - mandate keeping escape routes clear and managing combustible materials</li>
                  <li><strong>Employer obligations</strong> - provide adequate facilities, training, and systems for maintaining workplace organisation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Employee responsibilities:</p>
                <p className="text-white/70 text-sm">
                  Workers have legal duties to cooperate with housekeeping requirements, use provided facilities properly, report hazards, and take reasonable care for their own and others' safety through maintaining tidy work areas.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Enforcement and consequences:</p>
                <p className="text-white/70 text-sm">
                  HSE inspectors regularly assess housekeeping standards during site visits. Poor organisation can result in improvement notices, prohibition notices, prosecution, and significant financial penalties for both companies and individuals.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Good Housekeeping Practices */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Good Housekeeping Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective housekeeping requires systematic approaches and consistent application of proven organisational principles:
              </p>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Systematic Organisation Standards</p>
                <ul className="text-white/80 text-sm space-y-2 list-disc ml-4">
                  <li><strong>Designated storage areas</strong> - store tools and materials neatly in allocated locations with clear identification</li>
                  <li><strong>Progressive clearance</strong> - clear packaging and waste as work progresses, not at end of shift only</li>
                  <li><strong>Route maintenance</strong> - keep walkways, access points, and fire exits free from obstruction at all times</li>
                  <li><strong>Cable management</strong> - coil and secure trailing leads using appropriate stands, hooks, or storage systems</li>
                  <li><strong>Clean as you go</strong> - maintain cleanliness throughout work activities, not just during designated clean-up periods</li>
                  <li><strong>Daily inspection</strong> - conduct end-of-shift checks to identify and address potential hazards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">5S methodology application:</p>
                <ul className="text-white/70 text-sm list-disc ml-4 space-y-1">
                  <li><strong>Sort:</strong> Remove unnecessary items from work area</li>
                  <li><strong>Set in order:</strong> Organise remaining items logically</li>
                  <li><strong>Shine:</strong> Clean and maintain the work area</li>
                  <li><strong>Standardise:</strong> Establish consistent procedures</li>
                  <li><strong>Sustain:</strong> Maintain standards through regular review</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Visual management techniques:</p>
                <p className="text-white/70 text-sm">
                  Use colour coding, labels, floor markings, and designated areas to make organisation standards visible and easy to maintain. Clear visual cues help all site personnel understand and maintain housekeeping requirements consistently.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-5-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Tool and Material Organisation */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Tool and Material Organisation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper tool and material organisation prevents damage, reduces handling risks, and improves work efficiency:
              </p>

              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <p className="font-semibold text-amber-400 mb-2">Systematic Tool and Material Management</p>
                <ul className="text-white/80 text-sm space-y-2 list-disc ml-4">
                  <li><strong>Personal tool organisation</strong> - use tool belts, pouches, or boxes to keep hand tools accessible and secure</li>
                  <li><strong>Cable reel management</strong> - label reels clearly and store off the floor using stands or designated areas</li>
                  <li><strong>Ergonomic storage</strong> - keep heavy items at waist level to reduce manual handling injury risk</li>
                  <li><strong>Environmental protection</strong> - protect materials from weather, contamination, and physical damage</li>
                  <li><strong>Inventory control</strong> - maintain accurate records of tool and material locations and condition</li>
                  <li><strong>Security measures</strong> - secure valuable items in lockable storage or supervised areas</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Tool storage hierarchy:</p>
                <ul className="text-white/70 text-sm list-disc ml-4 space-y-1">
                  <li><strong>Daily use tools:</strong> Tool belt, pouch, or personal toolbox</li>
                  <li><strong>Regular use tools:</strong> Secure vehicle storage or site toolbox</li>
                  <li><strong>Occasional use tools:</strong> Lockable site storage with check-out system</li>
                  <li><strong>Specialist equipment:</strong> Controlled storage with training records</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="font-medium text-white mb-2">Material storage considerations:</p>
                <p className="text-white/70 text-sm">
                  Consider material characteristics when planning storage: cable sensitivity to crushing and moisture, conduit susceptibility to dents and corrosion, electrical accessories requiring protection from contamination, and hazardous materials needing special storage conditions.
                </p>
              </div>
            </div>
          </section>

          {/* Waste Management */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Waste Management
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Responsible waste management is essential for safety, environmental protection, and regulatory compliance:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Comprehensive Waste Management Systems</p>
                <ul className="text-white/80 text-sm space-y-2 list-disc ml-4">
                  <li><strong>Waste segregation</strong> - separate materials by type (metal, plastic, general) where recycling facilities are provided</li>
                  <li><strong>Designated disposal</strong> - use provided skips and bins, avoid accumulating waste near work areas</li>
                  <li><strong>Hazardous waste management</strong> - follow special procedures for contaminated or dangerous materials</li>
                  <li><strong>Facility monitoring</strong> - report overflowing or inadequate waste facilities to supervisors immediately</li>
                  <li><strong>Documentation</strong> - maintain records for hazardous waste disposal and recycling activities</li>
                  <li><strong>Environmental responsibility</strong> - minimise waste generation and maximise recycling opportunities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Common electrical waste categories:</p>
                <ul className="text-white/70 text-sm list-disc ml-4 space-y-1">
                  <li><strong>Metal waste:</strong> Cable offcuts, conduit, trunking, and metal accessories</li>
                  <li><strong>Plastic waste:</strong> Cable insulation, conduit, trunking, and plastic accessories</li>
                  <li><strong>Packaging:</strong> Cardboard, plastic wrapping, and protective materials</li>
                  <li><strong>Hazardous waste:</strong> Contaminated materials, batteries, and fluorescent tubes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Legal compliance requirements:</p>
                <p className="text-white/70 text-sm">
                  Waste management is regulated under Environmental Protection Act, Waste Regulations, and site-specific licenses. Improper disposal can result in prosecution, fines, and environmental damage claims. Always follow established procedures and seek guidance when uncertain.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance (On-Site Tips)
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Continuous Housekeeping Practices</h3>
                <ul className="text-white/70 text-sm space-y-1 list-disc ml-5">
                  <li>Always "clear as you go" – never leave cuttings, insulation, or packaging to build up during work</li>
                  <li>Keep a small brush and pan for quickly clearing debris from confined workspaces</li>
                  <li>At the end of every shift, spend 5 minutes checking the area for potential hazards</li>
                  <li>Report housekeeping issues immediately rather than allowing problems to accumulate</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Tool and Material Management</h3>
                <ul className="text-white/70 text-sm space-y-1 list-disc ml-5">
                  <li>Use cable stands to prevent drums rolling loose around site and creating hazards</li>
                  <li>Coil and hang extension leads when not in use to prevent trip hazards and cable damage</li>
                  <li>Label personal tools clearly to prevent mix-ups and potential theft</li>
                  <li>Store frequently used items in consistent locations to reduce search time</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Safety and Compliance</h3>
                <ul className="text-white/70 text-sm space-y-1 list-disc ml-5">
                  <li>Keep fire exits and escape routes completely clear at all times</li>
                  <li>Never store materials in building voids or service areas</li>
                  <li>Use appropriate waste bins and recycling facilities as provided</li>
                  <li>Maintain vehicle loading areas clear for emergency access</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <h3 className="font-medium text-red-400 mb-2">Case Study 1: Trip Hazard Injury</h3>
                <p className="text-white/70 text-sm mb-2">
                  On a refurbishment project, an apprentice left offcuts of twin-and-earth cable and packaging across a corridor. A site supervisor tripped over the debris and injured his wrist, requiring hospital treatment and time off work.
                </p>
                <p className="text-white/60 text-sm bg-white/5 p-2 rounded">
                  <strong>Prevention:</strong> Following "clear as you go" principles would have prevented this accident. The incident led to stricter housekeeping enforcement and highlighted how poor organisation can cause serious injuries to any site personnel.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <h3 className="font-medium text-red-400 mb-2">Case Study 2: Fire Hazard from Poor Waste Management</h3>
                <p className="text-white/70 text-sm mb-2">
                  Flammable packaging materials were left near a temporary electrical distribution board on a construction site. Overheating equipment ignited the materials, causing a significant fire that damaged work already completed and delayed the project by several weeks.
                </p>
                <p className="text-white/60 text-sm bg-white/5 p-2 rounded">
                  <strong>Prevention:</strong> Proper waste disposal and maintaining clear areas around electrical equipment would have prevented this fire. The incident resulted in substantial financial losses and HSE investigation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-medium text-green-400 mb-2">Case Study 3: Effective Organisation System</h3>
                <p className="text-white/70 text-sm mb-2">
                  A large office installation project implemented systematic housekeeping procedures with designated storage areas, daily clean-up routines, and clear responsibility assignments. The project completed ahead of schedule with zero housekeeping-related incidents.
                </p>
                <p className="text-white/60 text-sm bg-white/5 p-2 rounded">
                  <strong>Good Practice:</strong> Systematic organisation improved efficiency, reduced material waste, and created a positive safety culture. The client praised the professional appearance and minimal disruption to their ongoing operations.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Pocket Guide (Key Takeaways)
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">Clear as you go – don't leave clutter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">Store tools and materials neatly</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">Keep access routes and exits clear</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">Manage waste responsibly</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">End every shift with a tidy-up check</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-white/80">Everyone is responsible for site housekeeping</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>In this subsection, you learned:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The hazards of cluttered and disorganised workspaces.</li>
                <li>Legal obligations under HASAWA and CDM for safe housekeeping.</li>
                <li>Best practice for tool and material organisation.</li>
                <li>How to manage waste responsibly.</li>
                <li>Practical steps to keep the site safer and more productive.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Knowledge Check Quiz
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../section7/subsection4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Working in Voids, Risers, and Ceilings
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 7
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section7_5;
