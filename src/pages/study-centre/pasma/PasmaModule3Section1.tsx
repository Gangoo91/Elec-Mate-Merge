import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle, Search, FileText, HardHat, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pre-assembly-exclusion-zone",
    question: "What is the minimum exclusion zone distance from overhead power lines when positioning a mobile tower?",
    options: [
      "5 metres",
      "10 metres",
      "15 metres",
      "20 metres"
    ],
    correctIndex: 2,
    explanation: "PASMA and HSE guidance requires a minimum exclusion zone of 15 metres from overhead power lines. This distance accounts for the full reach of the tower including any conductive tools or materials that could bridge the gap."
  },
  {
    id: "pre-assembly-ground-assessment",
    question: "Before assembling a mobile tower, what is the FIRST thing you should check about the ground conditions?",
    options: [
      "Whether the ground is painted with markings",
      "Whether the ground is firm, level, and capable of supporting the tower loads",
      "Whether the ground is wet or dry",
      "Whether the ground is indoor or outdoor"
    ],
    correctIndex: 1,
    explanation: "The ground must be firm, level, and capable of supporting the full weight of the tower plus operatives, materials, and wind loads. Soft, uneven, or unstable ground can cause the tower to sink, tilt, or overturn."
  },
  {
    id: "pre-assembly-method-statement",
    question: "Which of the following must a method statement for tower assembly include?",
    options: [
      "Only the names of operatives involved",
      "Only the height of the tower required",
      "The sequence of work, equipment list, team roles, emergency procedures, and specific risks with controls",
      "Only the date and time of assembly"
    ],
    correctIndex: 2,
    explanation: "A method statement for tower work must be comprehensive, covering the full sequence of assembly, all equipment needed, defined team roles, emergency and rescue procedures, and specific risks identified with corresponding control measures."
  }
];

const faqs = [
  {
    question: "How far from overhead power lines should a mobile tower be positioned?",
    answer: "A minimum exclusion zone of 15 metres must be maintained from overhead power lines. This applies to all parts of the tower, including the highest point and any materials or tools being used from the platform. If work closer than 15 metres is unavoidable, the electricity distribution network operator must be contacted to arrange isolation or protective measures before any work begins."
  },
  {
    question: "What should I do if the ground is sloping at the assembly location?",
    answer: "Towers must be erected on firm, level ground. If the ground slopes, adjustable legs can compensate for minor variations, but the maximum permissible slope depends on the manufacturer's instructions. For significant slopes, the ground must be levelled using sole boards or a purpose-built platform. Never use loose bricks, blocks, or other improvised packing to level a tower."
  },
  {
    question: "Who should be briefed before tower assembly begins?",
    answer: "Every person involved in the assembly must be briefed on the method statement, their specific role, the sequence of work, hazards identified in the risk assessment, control measures in place, emergency procedures, and their authority to stop work if conditions become unsafe. Other trades working nearby should also be informed of the assembly activity and any exclusion zones."
  },
  {
    question: "What PPE is required during tower assembly?",
    answer: "The minimum PPE for tower assembly includes a safety helmet (to EN 397), safety footwear with ankle support and toe protection, and work gloves for handling components. Depending on site conditions, additional PPE such as high-visibility clothing, eye protection, or hearing protection may be required. All PPE must be in good condition and correctly fitted."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a site survey before tower assembly?",
    options: [
      "To determine the colour of the tower needed",
      "To identify hazards, assess ground conditions, and plan the safe assembly of the tower",
      "To count how many operatives are available",
      "To measure the building height only"
    ],
    correctAnswer: 1,
    explanation: "A site survey identifies hazards such as overhead obstructions, assesses ground conditions for firmness and levelness, measures available space, and informs the method statement and risk assessment for safe tower assembly."
  },
  {
    id: 2,
    question: "What is the maximum slope on which a tower can typically be assembled without additional measures?",
    options: [
      "Any slope is acceptable with adjustable legs",
      "A slight slope within the adjustment range of the tower's levelling legs, as per manufacturer's instructions",
      "Up to 15 degrees",
      "Up to 45 degrees"
    ],
    correctAnswer: 1,
    explanation: "Towers should be erected on level ground. Adjustable legs can compensate only for minor variations within the range specified by the manufacturer. Any slope beyond this requires the ground to be levelled using sole boards or other approved means."
  },
  {
    id: 3,
    question: "When assessing ground conditions indoors, what must you consider?",
    options: [
      "Only whether the floor is clean",
      "The floor's load-bearing capacity relative to the total tower load including operatives and materials",
      "Whether the floor is carpeted",
      "The colour of the floor surface"
    ],
    correctAnswer: 1,
    explanation: "Indoor floors must be assessed for their load-bearing capacity. Suspended floors, raised access floors, and floors over voids may not support concentrated tower loads. The total load includes the tower weight, platform boards, operatives, tools, and materials."
  },
  {
    id: 4,
    question: "Which of the following is an overhead hazard that must be assessed before tower assembly?",
    options: [
      "Road markings on the ground",
      "Building services such as pipes, ducts, and electrical cables",
      "Floor drainage grates",
      "Wall-mounted fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Overhead hazards include power lines, building services (pipes, cable trays, ducts), tree branches, cranes, and any overhead structures that could be contacted during assembly or use of the tower."
  },
  {
    id: 5,
    question: "What is the purpose of barriers around the tower assembly area?",
    options: [
      "To make the site look professional",
      "To prevent unauthorised access, protect pedestrians, and manage vehicle movements during assembly",
      "To hold tower components in place",
      "To provide shade for operatives"
    ],
    correctAnswer: 1,
    explanation: "Barriers and exclusion zones around the assembly area prevent unauthorised persons from entering a hazardous zone, protect pedestrians and vehicles from falling components, and ensure the assembly team can work without interference."
  },
  {
    id: 6,
    question: "What must be checked during a pre-assembly component inspection?",
    options: [
      "Only the colour of the components",
      "That all components are present, undamaged, from the same manufacturer and system, and free from corrosion or deformation",
      "Only the weight of the components",
      "Only that the components are dry"
    ],
    correctAnswer: 1,
    explanation: "Every component must be checked for damage, corrosion, deformation, missing parts, and correct labelling. All parts must be from the same manufacturer and tower system — never mix components from different systems."
  },
  {
    id: 7,
    question: "Who has 'stop-work authority' during tower assembly?",
    options: [
      "Only the site manager",
      "Only the person named in the method statement",
      "Every member of the assembly team",
      "Only the tower manufacturer"
    ],
    correctAnswer: 2,
    explanation: "Every member of the assembly team has the authority and responsibility to stop work if they observe unsafe conditions, a deviation from the method statement, or any hazard that was not anticipated in the risk assessment."
  },
  {
    id: 8,
    question: "A method statement for tower assembly should include which of the following?",
    options: [
      "Only the tower height",
      "The assembly sequence, equipment list, team roles, emergency procedures, and risk controls",
      "Only the names of the operatives",
      "Only the date of assembly"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive method statement covers the step-by-step assembly sequence, all equipment and components required, defined roles for each team member, emergency and rescue procedures, specific risks identified, and the control measures to manage those risks."
  }
];

export default function PasmaModule3Section1() {
  useSEO({
    title: "Pre-Assembly Planning | PASMA Module 3.1",
    description: "Site survey requirements, ground assessment, overhead hazard checks, exclusion zones, method statement preparation, PPE checks, and team briefing for mobile tower assembly.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Assembly Planning
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Everything that must happen before the first component leaves the vehicle — site survey, ground checks, hazard assessment, and team briefing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Survey:</strong> Walk the area, check ground, clearances &amp; hazards</li>
              <li><strong>Plan:</strong> Method statement covering sequence, roles &amp; controls</li>
              <li><strong>Check:</strong> All components present, undamaged, PPE ready</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Ground:</strong> Firm, level, load-bearing &mdash; sole boards if needed</li>
              <li><strong>Overhead:</strong> 15m minimum from power lines</li>
              <li><strong>Team:</strong> Brief everyone, assign roles, confirm stop-work authority</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Carry out a thorough site survey before tower assembly",
              "Assess ground conditions for firmness, levelness, and load-bearing capacity",
              "Identify and manage overhead hazards including power lines",
              "Establish exclusion zones and site control measures",
              "Prepare a method statement specific to the tower work",
              "Brief the assembly team on roles, risks, and emergency procedures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Site Survey Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Site Survey Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before any tower components are unloaded, a competent person must carry out a thorough site survey. This is not a clipboard exercise &mdash; it requires physically walking the proposed assembly area, looking up, looking down, and thinking through every stage of the assembly and use of the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Site Survey Checklist</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Walk the area</strong> &mdash; Identify the exact position for the tower, noting any obstructions at ground level and above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Measure available space</strong> &mdash; Confirm sufficient room for the tower footprint, stabilisers or outriggers, and safe access around all sides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Check overhead clearances</strong> &mdash; Measure the vertical distance to any overhead structures, services, or power lines. Maintain a minimum 15-metre exclusion zone from power lines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Assess ground conditions</strong> &mdash; Confirm the ground is firm, level, and capable of supporting the full tower load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Note access routes</strong> &mdash; Plan how components will be transported from the vehicle to the assembly area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Identify nearby activities</strong> &mdash; Other trades, vehicle movements, pedestrians, and any concurrent work that could affect safety</span>
                  </li>
                </ul>
              </div>

              <p>
                The site survey informs the risk assessment and method statement. Without a proper survey, you cannot identify site-specific hazards or plan appropriate control measures. Every tower location is different &mdash; even if you have worked on the same site before, conditions may have changed.
              </p>

              <p>
                The survey should be carried out by a competent person &mdash; someone with the training, knowledge, and experience to recognise hazards and assess whether the proposed location is suitable. This is typically the PASMA-trained team leader or supervisor. The survey findings should be documented and shared with all members of the assembly team during the pre-work briefing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Recording the Survey</p>
                <p className="text-sm text-white/80">
                  A site survey record should include: the date and time of the survey, the name of the person carrying it out, the proposed tower position, all hazards identified, the ground condition assessment, overhead clearance measurements, and any control measures required. This record becomes part of the job documentation and may be reviewed by the HSE in the event of an incident.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">What Changes Between Visits?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ground conditions after rain, frost, or excavation works</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>New overhead obstructions from cranes, scaffolding, or building services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Changes to traffic routes or pedestrian access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>New underground services or excavations near the tower position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Other trades now working in the area</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ground Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ground Assessment
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ground beneath a tower must support the entire weight of the tower, platforms, operatives, tools, and materials, plus any additional forces from wind loading. A tower on inadequate ground is a tower waiting to collapse.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Ground Requirements</p>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Firm:</strong> The ground must not compress or yield under the concentrated loads at the base plates or castors. Soft ground, freshly filled trenches, and waterlogged soil are all unsuitable without additional measures.</p>
                  <p><strong className="text-white">Level:</strong> The ground should be as level as possible. Minor variations can be accommodated by the tower's adjustable legs, but only within the range specified by the manufacturer. The maximum permissible slope varies by manufacturer but is typically very small.</p>
                  <p><strong className="text-white">Load-bearing:</strong> Calculate the total load (tower + operatives + materials + wind forces) and confirm the ground can support this load at each base point without settlement.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Sole Board Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Used to spread the load on soft or sensitive ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be of adequate size to distribute the load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Timber sole boards must be sound, not split or rotten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be positioned centrally under each base plate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Castor wheels must be fully on the sole board</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Indoor Floor Considerations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Raised access floors may not support concentrated loads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Suspended timber floors have limited capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Floor voids or cellars below may reduce capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Drainage grates and manhole covers must be avoided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check floor loading ratings if available</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Identifying Soft or Unstable Ground</p>
                </div>
                <p className="text-sm text-white/80">
                  Signs of unsuitable ground include: footprints sinking when you walk across it, visible waterlogging or standing water, recently backfilled trenches or excavations, cracked or uneven tarmac suggesting subsidence, and any ground that feels spongy underfoot. If in doubt, use sole boards or find an alternative location.
                </p>
              </div>

              <p>
                Remember that ground conditions can change during the course of a job. Heavy rain overnight can turn firm ground into soft, waterlogged soil. Excavation works by other trades can undermine the ground beneath your tower position. Check the ground conditions each day before work commences, not just at the initial survey.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Ground Assessment for Moving Towers</p>
                <p className="text-sm text-white/80">
                  If the tower will be moved during the work (on its castors), the entire route must be assessed. Every surface the tower will travel over must be firm, level, and free from obstructions. Thresholds, expansion joints, drainage channels, and changes in floor level along the route must all be identified and managed. Never push a tower across soft or uneven ground.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Ground Condition Red Flags</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-white mb-1">Outdoor</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Standing water or puddles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Visible tyre ruts or foot impressions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Recently filled excavations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Frost-heaved or cracked tarmac</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Indoor</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Raised access floor tiles lifting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Visible deflection when walked upon</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Manhole covers or service access points</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Floors rated below the required load</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Overhead Hazard Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Overhead Hazard Assessment
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Looking up is just as important as looking down. Overhead hazards can be fatal, particularly where power lines are involved. A comprehensive overhead assessment must be completed before assembly begins and reviewed each time the tower is repositioned.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Power Lines — 15-Metre Exclusion Zone</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Overhead power lines present an extreme electrocution hazard. You do not need to touch a power line to receive a fatal shock &mdash; electricity can arc across a gap, particularly in damp conditions or when conductive materials are present.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintain a minimum 15-metre exclusion zone from overhead power lines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>This distance applies to all parts of the tower at maximum height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Include the reach of any tools, materials, or equipment used from the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If work within 15 metres is essential, contact the electricity distributor for isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Never assume power lines are insulated &mdash; most overhead lines are bare conductors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Other Overhead Hazards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Building services:</strong> Pipes, cable trays, ventilation ducts, sprinkler pipework, and lighting that could be contacted or damaged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tree branches:</strong> Branches that could interfere with the tower or create a falling object hazard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Cranes and lifting operations:</strong> Active crane operations may swing loads over or near the tower position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Overhead structures:</strong> Canopies, walkways, mezzanine floors, or other structures that limit the available height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Low beams and lintels:</strong> Particularly in refurbishment work, structural members may obstruct tower assembly</span>
                  </li>
                </ul>
              </div>

              <p>
                In refurbishment projects, overhead services may be concealed behind ceiling tiles or within service voids. Before removing ceiling panels or accessing voids from a tower, establish what services are present. Refer to as-built drawings where available and use a cable avoidance tool (CAT) to detect hidden cables. Assume all cables are live until confirmed otherwise.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">When Overhead Hazards Are Identified:</strong> Record them in the risk assessment, implement control measures (relocate the tower, arrange isolation, install barriers), brief the team on the specific hazard, and monitor throughout the work. If the hazard cannot be adequately controlled, do not proceed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Overhead Hazard Decision Flowchart</p>
                <div className="space-y-1 text-sm text-white/80">
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Can the tower be relocated</strong> away from the hazard? &rarr; Yes: move the tower position</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Can the hazard be removed or isolated?</strong> &rarr; Yes: arrange removal or isolation before assembly</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Can barriers protect against contact?</strong> &rarr; Yes: install physical barriers and warning signage</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">None of the above are practicable?</strong> &rarr; Do not proceed with the work. Seek alternative access methods.</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Exclusion Zones & Site Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Exclusion Zones &amp; Site Control
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                During tower assembly, components are being lifted, positioned, and connected. This creates a hazard zone around the assembly area where falling objects, moving parts, and the assembly team's movements all pose risks to anyone nearby. Effective site control is essential.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Establishing an Exclusion Zone</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Physical barriers:</strong> Use proprietary barriers, cones, or tape to mark the exclusion zone around the assembly area. The zone should extend beyond the tower footprint to account for dropped components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Signage:</strong> Clearly display signs warning of overhead work, falling objects, and restricted access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Pedestrian management:</strong> Redirect foot traffic away from the assembly area. Provide alternative routes where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Vehicle management:</strong> If the tower is near a vehicle route, implement traffic management measures such as banksmen, speed restrictions, or temporary road closures</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Coordination with Other Trades</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Inform other trades of the assembly activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Agree timings to avoid conflicting operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure no one works directly below the assembly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Coordinate with crane operators and riggers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Share the risk assessment with affected parties</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Permit-to-Work Situations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required near live electrical equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required in confined spaces or restricted areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>May be required near process plant or pipework</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Always check the site's permit-to-work procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure the permit covers both assembly and use</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The exclusion zone must remain in place throughout the assembly, use, and dismantling of the tower. It is not sufficient to remove barriers once assembly is complete &mdash; there is still a risk of falling objects from the working platform. The zone should only be removed after the tower is fully dismantled and all components are secured at ground level.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Public Areas:</strong> When assembling or using a tower in areas accessible to the public (shopping centres, hospitals, schools), additional measures are needed. Consider hoarding, dedicated marshals, and clearly signed alternative routes. Members of the public cannot be expected to understand construction hazards and may walk into exclusion zones if they are not robustly maintained.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Method Statement Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Method Statement Preparation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A method statement is a written document that describes, step by step, how the tower assembly, use, and dismantling will be carried out safely. It translates the risk assessment into practical instructions that every member of the team can follow.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Method Statement Contents</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Sequence of work:</strong> Step-by-step assembly procedure from base setup through to completion, including each lift level and the order of component installation</p>
                  <p><strong className="text-white">Equipment list:</strong> Full inventory of tower components, tools, PPE, and ancillary equipment required (sole boards, barriers, signage)</p>
                  <p><strong className="text-white">Team roles:</strong> Named individuals and their responsibilities &mdash; who leads the assembly, who passes components, who manages the exclusion zone</p>
                  <p><strong className="text-white">Emergency procedures:</strong> What to do if someone is injured during assembly, rescue plan for a person stranded at height, first-aid arrangements</p>
                  <p><strong className="text-white">Specific risks and controls:</strong> Hazards identified in the risk assessment with the exact control measures being applied</p>
                </div>
              </div>

              <p>
                The method statement must be site-specific. A generic method statement that has not been tailored to the actual site conditions is of little value. It should reference the risk assessment and be updated if conditions change during the work. Many principal contractors will require the method statement to be submitted and approved before work can begin on site.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Method Statement Failures</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Using a generic template without site-specific detail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not specifying the assembly method (3T or AGR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Omitting the rescue plan for a person stranded at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Failing to list specific hazards identified during the site survey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not naming the competent person responsible for assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not updating the method statement when conditions change</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Method Statement Must Also Cover:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The tower configuration required (height, width, platform type)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The assembly method to be used (3T or AGR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Whether stabilisers or outriggers are needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The dismantling sequence (reverse of assembly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Handover and inspection requirements before the tower is used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Storage and security of the tower when not in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum number of persons permitted on the platform simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum platform load including operatives, tools, and materials</span>
                  </li>
                </ul>
              </div>

              <p>
                A well-prepared method statement saves time on site. When every team member knows the plan before they start, the assembly proceeds efficiently with fewer stops and fewer errors. Spend time on the method statement in the office &mdash; it pays back many times over on site. A copy of the approved method statement must be available at the assembly location for reference by all team members throughout the work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: PPE & Equipment Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            PPE &amp; Equipment Checks
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Personal protective equipment and a thorough pre-assembly component inspection are the final safety checks before assembly begins. No operative should handle tower components without the correct PPE, and no component should be used if there is any doubt about its condition.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HardHat className="h-5 w-5 text-elec-yellow" />
                    <p className="text-sm font-medium text-elec-yellow">Required PPE During Assembly</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Safety helmet:</strong> To EN 397, with chin strap if working at height or risk of the helmet being dislodged</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Safety footwear:</strong> With ankle support and toe protection. Boots give better support than shoes during assembly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Gloves:</strong> Suitable work gloves for handling metal components. Protect against sharp edges, pinch points, and cold weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Additional as required:</strong> High-vis clothing, eye protection, hearing protection depending on site conditions</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Pre-Assembly Component Inspection</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">All parts present:</strong> Check the inventory against the configuration guide for the required tower height and width</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">No damage:</strong> Look for dents, bends, cracks, weld failures, or deformation in any component</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">No corrosion:</strong> Surface rust may be acceptable, but heavy corrosion or pitting that weakens the component is not</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Correct system:</strong> All components must be from the same manufacturer and tower system. Never mix components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Moving parts work:</strong> Test castor brakes, adjustable legs, platform locks, and trapdoor mechanisms</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Reject Criteria</p>
                </div>
                <p className="text-sm text-white/80">
                  Any component that is bent, cracked, heavily corroded, has damaged welds, missing locking pins, or non-functional moving parts must be taken out of service immediately. Tag it as defective and do not use it. Using damaged components compromises the structural integrity of the entire tower.
                </p>
              </div>

              <p>
                When collecting tower components from a hire company, carry out a basic inspection before leaving the depot. It is far easier to exchange a damaged component at the depot than to discover it on site when the assembly is already underway. Keep a checklist of the required components for your specific tower configuration and tick off each item as it is loaded onto the vehicle.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Component Storage on Site</p>
                <p className="text-sm text-white/80">
                  Tower components awaiting assembly should be stored in a secure, organised area near the assembly position. Lay components out in the order they will be used to speed up the assembly process and reduce the risk of picking up the wrong item. Do not stack heavy components on top of lighter ones. Protect components from rain and frost where possible, as wet or icy components are harder and more dangerous to handle.
                </p>
              </div>

              <p>
                Manual handling is a significant consideration during tower assembly. Individual components can weigh up to 15&ndash;20 kg, and repetitive lifting throughout the assembly process is physically demanding. Assess the manual handling risk as part of the overall risk assessment. Consider the weight and shape of each component, the frequency of lifts, the distances involved, and the individual capability of each team member.
              </p>

              <p>
                Use team lifts for heavier items and mechanical aids where available. Rotate tasks between team members to prevent fatigue from repetitive lifting. Ensure all operatives are trained in correct manual handling techniques and know the maximum weights they should lift individually.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Team Briefing & Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Team Briefing &amp; Communication
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The final step before assembly begins is a team briefing. Even if the team has assembled towers together many times, every site is different and every briefing must cover the specific conditions, hazards, and plan for that particular job.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Team Briefing Must Cover</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The method statement &mdash; walk through the assembly sequence step by step</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Hazards identified in the risk assessment and the specific controls in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Individual roles and responsibilities during assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Communication methods during assembly (verbal commands, hand signals in noisy environments)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency procedures &mdash; what to do if someone is injured or conditions change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stop-work authority &mdash; everyone has the right and responsibility to stop work if unsafe</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Roles During Assembly</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Assembly lead:</strong> The competent person who directs the assembly sequence and makes decisions on site. Must hold a valid PASMA certificate.</p>
                  <p><strong className="text-white">Component handlers:</strong> Operatives who prepare and pass components to the assembly lead. Must understand the sequence and be briefed on safe manual handling.</p>
                  <p><strong className="text-white">Ground operative:</strong> Maintains the exclusion zone, manages component storage, monitors for hazards, and is the point of contact for other site personnel.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Communication During Assembly</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Agree standard verbal commands before starting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use hand signals in noisy environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confirm each stage is complete before moving on</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Call out before passing or lifting components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maintain visual contact between team members</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Stop-Work Authority</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Every team member can stop work if unsafe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No repercussions for raising safety concerns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Work stops until the concern is resolved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Document the issue and the resolution taken</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Resume only when all team members are satisfied</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The briefing should be conducted at the assembly location, not in the site office or canteen. This allows the team to visualise the plan in context, point out specific hazards in the area, and agree on the exact positions for the tower, exclusion zone barriers, and component storage. Keep the briefing focused and concise, but ensure everyone has the opportunity to ask questions.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Toolbox Talk Format:</strong> A pre-assembly briefing can follow a toolbox talk format: state the task, describe the hazards, explain the controls, assign roles, confirm understanding, and invite questions. Record the briefing with a sign-on sheet confirming who attended. This record demonstrates compliance with the duty to inform and instruct workers about risks and precautions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">After the Briefing</p>
                <p className="text-sm text-white/80">
                  Once the briefing is complete and all team members are satisfied, the assembly can begin. If conditions change during the work &mdash; unexpected hazards, deteriorating weather, changes to the site layout &mdash; a further briefing must be held before work continues. The method statement may need to be revised to reflect the new conditions. Never continue with an outdated plan when circumstances have changed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3-section-2">
              Next: 3T Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}