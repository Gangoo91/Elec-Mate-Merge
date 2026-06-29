import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm3-s4-cat-place',
    question:
      'A small architects’ practice keeps PCs, monitors, printers and a kettle in a clean, dry, occupied office. Equipment is moved rarely. Which HSG107 environment category does this fall into?',
    options: [
      'Construction site (high-risk)',
      'Equipment hire / event hire',
      'Low-risk environment — clean, dry office with minimal mechanical stress on equipment',
      'Industrial wet processing',
    ],
    correctIndex: 2,
    explanation:
      'HSG107 Table 1 places clean, dry, low-movement office environments in the lowest-risk category. Frequencies are at the longest end of the scale (years) and most equipment will not need formal electrical testing every cycle — formal visual inspection is the principal control.',
  },
  {
    id: 'patm3-s4-ip',
    question:
      'A 230 V hand-held power tool is to be used on a lightly-rained outdoor site. The tool is rated IP20 (drip protection only on a vertical drop). Acceptable, restrict, or fail at inspection?',
    options: [
      'Acceptable — the user can be trusted to keep the tool out of the rain entirely.',
      'Pass it, provided a subsequent insulation-resistance test is satisfactory.',
      'Acceptable if the operator wipes the tool dry periodically during use.',
      'Restrict / fail at inspection — IP20 has no water rating for this environment.',
    ],
    correctIndex: 3,
    explanation:
      'IP20 is dust-protected against fingers but has no water rating, so it is unsuitable for outdoor / wet use — risking ingress, insulation breakdown and shock. The CoP and HSG107 require equipment to suit the environment; failure for the location stands regardless of electrical-test results. Remedy: supply an IP44+ tool, restrict use to indoors, or fail until appropriate equipment is provided.',
  },
  {
    id: 'patm3-s4-vibration',
    question:
      'A laminator on a printer cart has its plug body cracked across the body of the cord grip after six months of being moved between rooms multiple times daily. The flex is sound. Best diagnosis?',
    options: [
      'A manufacturing defect in the moulded plug body, present from new.',
      'Mechanical / movement stress — the plug has been pulled, knocked and twisted in service.',
      'An underlying electrical fault that has stressed and cracked the plug body.',
      'Heat damage from the laminator running the plug at an elevated temperature.',
    ],
    correctIndex: 1,
    explanation:
      'Frequent movement is mechanical stress, and the environment imposes load the moulded plug cannot withstand long term. Moulded plug bodies tolerate it less well than rewireable plugs with strain-relief boots. Remediation is mechanical (refit a more robust BS 1363 rewireable, route the flex to reduce strain) and managerial (shorter cycle for high-mechanical-stress items per HSG107 Table 1).',
  },
  {
    id: 'patm3-s4-dust',
    question:
      'A bench grinder in a wood workshop has fine wood dust packed into the cord-grip recess and around the cooling vents. The flex shows no visible damage. Action?',
    options: [
      'Fail at inspection until cleaned — combustible dust around the cord grip and vents is a fire-spread risk.',
      'Pass it — dust accumulation is purely a housekeeping matter, not a test failure.',
      'Test it electrically and pass it on the strength of a good insulation-resistance reading.',
      'Pass it — wood dust is non-conductive, so it presents no electrical risk.',
    ],
    correctIndex: 0,
    explanation:
      'HSG107 Table 1 puts dusty / construction environments at the more-frequent end of the inspection scale. Dust packed around contacts contributes to overheating (insulating the cooling) and to fire spread, and signals an environment warranting more frequent inspection, IP-rated equipment, or both. The CoP fails on the visual stage until cleaned, re-inspected, and the inspection frequency for that location is reviewed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'HSG107 categorises workplace environments to guide PAT frequency. Which of the following lists best matches the categories the HSE uses?',
    options: [
      'Domestic, commercial and industrial premises, split by building type',
      'Indoor versus outdoor, based purely on the equipment location',
      'Construction class of the equipment: Class I / Class II / Class III',
      'Offices, schools, public-access, industrial / construction, and equipment hire',
    ],
    correctAnswer: 3,
    explanation:
      'HSG107 Table 1 distinguishes environments by the level of mechanical, environmental and user-related stress on the equipment. Offices are at one end (low frequency); construction sites and equipment hire are at the other (high frequency). Domestic / commercial / industrial is too coarse to drive a sensible inspection regime.',
  },
  {
    id: 2,
    question: 'A 230 V appliance carries an IP rating of IP44. The first digit (4) describes:',
    options: [
      'Protection against ingress of solid foreign objects (here ≥ 1.0 mm — wires, small tools)',
      'The voltage rating the enclosure is suitable for',
      'The maximum continuous current rating of the appliance',
      'The insulation construction class of the appliance',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 60529 IP code: first digit is solids ingress (0–6). IP4 means protected against solid foreign objects ≥ 1.0 mm — typical for general industrial / outdoor equipment. The second digit (4) is water ingress — protected against splashing water from any direction.',
  },
  {
    id: 3,
    question:
      'For a UK construction site, the IET CoP and HSG107 typically recommend more frequent formal visual inspection than for a low-risk office environment because:',
    options: [
      'Construction sites generally operate at higher voltages than offices',
      'Construction equipment tends to be older than office equipment',
      'Mechanical damage, environmental contamination (dust, water) and frequent movement of equipment all mean defects appear sooner',
      'Construction workers are assumed to be less competent than office staff',
    ],
    correctAnswer: 2,
    explanation:
      'HSG107 Table 1 reflects the rate at which defects develop. On construction sites, the same lead is dragged through dust, dropped, pulled tight against sharp edges, and used outdoors — so defects develop faster than in an office. Frequency is set to catch them early.',
  },
  {
    id: 4,
    question:
      'A piece of 110 V site equipment is being used outdoors in light rain. Which IP rating is the minimum the equipment should hold for the environment per common UK construction practice?',
    options: [
      'IP00 — no ingress protection is required for this use',
      'IP20 — protection against solid objects but none against water',
      'IP65 — dust-tight and protected against low-pressure water jets',
      'IP44 — protection against splashing water from any direction',
    ],
    correctAnswer: 3,
    explanation:
      'IP44 (or higher) is the typical minimum for outdoor / damp construction use. IP20 has no water protection and is unsuitable. IP65 is appropriate for harsher exposures. The choice is driven by the environment, with HSG107 referring back to BS EN 60529 for the IP code definitions.',
  },
  {
    id: 5,
    question: 'A “low-risk” HSG107 environment is one in which:',
    options: [
      'Equipment is in a clean, dry, occupied location, is not subject to frequent movement, and has minimal exposure to mechanical or environmental stress — typical of an office',
      'There is no mains electrical equipment present at all',
      'Only Class II (double-insulated) equipment is in use',
      'All the equipment present is less than 12 months old',
    ],
    correctAnswer: 0,
    explanation:
      'HSG107 Table 1 defines low-risk by the conditions the equipment is exposed to: clean, dry, low movement, low mechanical stress, supervised use. Offices, classrooms (with adult use), and similar environments meet this. Frequency is at the longest end of the scale.',
  },
  {
    id: 6,
    question:
      'On a hire-out or rental floor (event hire, tool hire), the IET CoP and HSG107 expect inspection:',
    options: [
      'Only once a year, in line with a fixed annual cycle',
      'Never — the hire customer is responsible for the equipment they hire',
      'Before and after each hire — equipment status changes with each user, and damage from one hire must be detected before the next',
      'Only on Class I equipment, since Class II items are exempt',
    ],
    correctAnswer: 2,
    explanation:
      'Hire equipment passes through many users with no continuity of supervision. HSG107 Table 1 puts hire kit at the most frequent end — often before-and-after each hire — with formal visual inspection as the principal tool. The duty falls on the hire company.',
  },
  {
    id: 7,
    question: 'IP65 means the equipment is:',
    options: [
      'Dust-protected (not dust-tight) and splash-proof',
      'Dust-tight and water-immersible to a depth of 1 m',
      'Dust-tight and resistant to high-pressure water jets',
      'Dust-tight and protected against low-pressure water jets from any direction',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 60529: IP6 = dust-tight (no ingress at all); IP_5 = protected against low-pressure water jets (12.5 mm nozzle, 30 kPa) from any direction. So IP65 is dust-tight and water-jet-resistant. IP67/IP68 cover immersion.',
  },
  {
    id: 8,
    question:
      'A workshop produces fine metallic dust during use of grinders and lathes. Equipment in this environment requires:',
    options: [
      'IP5x / IP6x equipment, regular cleaning, and shorter inspection intervals',
      'No additional consideration, because metallic dust is non-conductive',
      'Only Class III (SELV) equipment, run at a longer inspection interval',
      'No PAT regime at all, since the dust would simply cause the test to fail',
    ],
    correctAnswer: 0,
    explanation:
      'Metallic dust is conductive; it can settle inside equipment and bridge live parts to earth or to each other. Dust-rated IP enclosures (IP5x or IP6x) and shorter inspection cycles are the controls. HSG107 explicitly considers dust contamination as an environmental risk factor.',
  },
  {
    id: 9,
    question:
      'A 13 A extension lead is being used to power a portable wash-station outside on a construction site. The lead is rated IP20. CoP and HSG107 position?',
    options: [
      'Acceptable, as long as the lead is dry at the moment it is plugged in',
      'Acceptable, provided the equipment supplied through it is Class II',
      'Fail / unsuitable — IP20 has no water protection for an outdoor wet location',
      'Acceptable, provided the lead is used outdoors for less than one hour',
    ],
    correctAnswer: 2,
    explanation:
      'IP20 is not suitable for an outdoor wet location. The CoP and HSG107 require the equipment to be appropriate for the environment — failed at inspection for that location, and the duty-holder needs to supply IP44+ leads / site-grade rubber-sheathed flex.',
  },
  {
    id: 10,
    question:
      'In an environment with high vibration (e.g. a workshop floor with reciprocating machinery), additional inspection focus should be on:',
    options: [
      'The insulation resistance reading, taken in place of a visual check',
      'The fuse rating fitted in the plug top, against the appliance load',
      'The construction class of the equipment, confirmed at the rating plate',
      'Strain-relief, plug-pin retention, plug terminations, and cable routing',
    ],
    correctAnswer: 3,
    explanation:
      'Vibration is a mechanical fatigue load. It loosens terminal screws, accelerates flex damage at strain reliefs, and can crack moulded plug bodies over time. The inspection emphasis follows the failure mode — terminations and mechanical retention rather than electrical-only tests.',
  },
];

const PATTestingModule3Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Environmental considerations | PAT Testing Module 3.4 | Elec-Mate',
    description:
      'HSG107 Table 1 environment categories, BS EN 60529 IP ratings, wet / dust / heat / vibration considerations, and how the environment drives the choice of equipment and the inspection frequency.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="PAT M3 · Section 4"
            title="Environmental considerations"
            description="HSG107 Table 1 categories, BS EN 60529 IP ratings, and how wet / dust / heat / vibration / movement drive both equipment selection and inspection frequency."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSG107 Table 1 ranks workplace environments by the rate at which defects develop — offices at one end, construction / hire at the other. The category drives inspection frequency.',
              'BS EN 60529 IP rating describes solids ingress (1st digit) and water ingress (2nd digit). IP44 is a typical outdoor / damp minimum; IP65 is dust-tight and water-jet-resistant.',
              'Equipment must suit the environment. An IP20 lead used outdoors is failed at inspection regardless of its electrical-test results — the rating, not the reading, is the deciding factor.',
              'Dust (combustible or conductive), water, heat, and vibration each have characteristic failure modes — the inspector adapts the inspection focus to the environmental load on the equipment.',
              'Hire and rental kit moves between users without supervised continuity. HSG107 puts these at the most frequent end of the inspection scale — typically before and after each hire.',
              'Movement and frequent re-plugging are themselves a stress. Items that travel often (printer carts, presentation kit) earn shorter inspection cycles and more robust connectors.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Place a workplace into the appropriate HSG107 Table 1 environment category from the visible / described conditions',
              'Read a BS EN 60529 IP code and decide whether equipment is suited to a given environment',
              'Identify the dominant environmental stress on a piece of equipment — water, dust, heat, vibration, movement — and adjust the inspection focus accordingly',
              'Distinguish equipment that is failed for the environment (regardless of test results) from equipment that is failed for a defect',
              'Apply HSG107 frequency principles — most frequent at construction / hire, least frequent in low-risk offices — and explain the basis to a duty-holder',
              'Feed environment-related observations back to the duty-holder so equipment selection and management controls can be improved',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>HSG107 Table 1 — environment categories</ContentEyebrow>

          <ConceptBlock
            title="What HSG107 Table 1 does and why"
            plainEnglish="HSG107 Table 1 is the HSE’s starting-point table for inspection frequency. It groups workplace environments by the rate at which equipment defects develop in service, and it gives indicative starting frequencies for both formal visual inspection and combined inspection-and-test."
            onSite="Walk into the room. Note the conditions: dry / wet, clean / dusty, supervised / unsupervised, fixed-position / frequently-moved. The Table 1 category falls out of the conditions, and the frequency falls out of the category."
          >
            <p>The categories the table uses, broadly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Low-risk offices and similar premises.</strong> Clean, dry, occupied, low
                movement, supervised use. Equipment lifecycle is mostly desk-based — PCs, monitors,
                printers, kettles, lamps. Frequencies at the longest end of the scale; formal visual
                inspection often substitutes for combined test for many cycles.
              </li>
              <li>
                <strong>Schools, colleges, public-access locations.</strong> Higher movement and
                potentially less supervised use; cleaning regimes generally good. Frequencies
                shorter than offices but longer than industrial / hire.
              </li>
              <li>
                <strong>Hotels, shops, public buildings.</strong> Mixed environments — staff areas
                similar to offices; public-facing areas with vending / catering equipment that may
                be moved or knocked. Frequencies set to the dominant exposure of the equipment.
              </li>
              <li>
                <strong>Industrial / commercial workshops.</strong> Mechanical stress, vibration,
                potential dust / contamination, frequent use. Frequencies in the middle-to-shorter
                range, with focus on cord-grip, terminations and IP appropriateness.
              </li>
              <li>
                <strong>Construction sites.</strong> Outdoor / wet exposure, dust, mechanical damage
                from being dragged / dropped / pulled, multi-user. Frequencies short; formal visual
                inspection effectively continuous (toolbox checks daily, formal cycles in weeks /
                months).
              </li>
              <li>
                <strong>Equipment hire / event hire.</strong> Maximum exposure: any environment, any
                user, no supervision continuity. Frequencies at the shortest end — before-and-after
                each hire, with a robust quarantine-and-test process between.
              </li>
            </ul>
            <p>
              The table gives indicative numbers; the duty-holder’s risk assessment finalises them.
              Section 5 of this module covers the risk-based frequency-setting process in detail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                The frequency of inspection and combined inspection-and-test should be determined by
                the user / duty-holder on the basis of a risk assessment that takes account of: the
                type of equipment and whether it is hand-held; the manufacturer&rsquo;s
                recommendations; the initial integrity and soundness of the equipment; the age of
                the equipment; the working environment in which the equipment is used (for example,
                wet, dusty, hot, corrosive); the frequency of use, and the duty cycle of the
                equipment.
              </>
            }
            meaning="Frequency is risk-based, not fixed. The environment is one of several factors HSG107 names; the inspector’s job is to surface the environmental conditions to the duty-holder and feed them into the frequency decision."
          />

          <SectionRule />

          <ContentEyebrow>BS EN 60529 IP ratings — what the digits mean</ContentEyebrow>

          <ConceptBlock
            title="The IP code as a working tool"
            plainEnglish="BS EN 60529 defines a two-digit code that describes the protection of an enclosure against solid objects (1st digit) and water (2nd digit). The PAT inspector uses the IP rating on the equipment label to decide whether the equipment is suited to its environment."
          >
            <p>The two digits, end to end:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">1st digit (solids)</th>
                    <th className="text-left text-white/80 py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">0</td>
                    <td>No protection</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1</td>
                    <td>Protected against objects ≥ 50 mm (back-of-hand)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2</td>
                    <td>≥ 12.5 mm (fingers)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">3</td>
                    <td>≥ 2.5 mm (small tools, thick wires)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4</td>
                    <td>≥ 1.0 mm (most wires, screws)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">5</td>
                    <td>Dust-protected (limited ingress, no harmful effect)</td>
                  </tr>
                  <tr>
                    <td className="py-2">6</td>
                    <td>Dust-tight (no ingress at all)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">2nd digit (water)</th>
                    <th className="text-left text-white/80 py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">0</td>
                    <td>No protection</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1</td>
                    <td>Vertical drips</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2</td>
                    <td>Drips, enclosure tilted up to 15°</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">3</td>
                    <td>Spraying water (60° from vertical)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4</td>
                    <td>Splashing water from any direction</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">5</td>
                    <td>Low-pressure water jets (12.5 mm nozzle, 30 kPa)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6</td>
                    <td>Powerful water jets (heavy seas)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">7</td>
                    <td>Temporary immersion to 1 m</td>
                  </tr>
                  <tr>
                    <td className="py-2">8</td>
                    <td>Continuous immersion (manufacturer-specified)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Common ratings the PAT inspector encounters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>IP20</strong> — typical indoor desk equipment. No water protection.
                Unsuitable for damp / outdoor use.
              </li>
              <li>
                <strong>IP44</strong> — splash-proof general industrial / outdoor. Typical minimum
                for site-tools and outdoor extension leads.
              </li>
              <li>
                <strong>IP54</strong> — limited dust protection plus splash. Common on workshop hand
                tools.
              </li>
              <li>
                <strong>IP65</strong> — dust-tight plus water-jet-resistant. Outdoor / wash-down
                environments.
              </li>
              <li>
                <strong>IP66 / IP67</strong> — heavy-duty outdoor / immersion-capable. Specialist
                equipment.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60529:1992+A2:2013 — Degrees of protection provided by enclosures (IP Code)"
            clause={
              <>
                The IP Code shall be used to indicate the degree of protection provided by an
                enclosure against access to hazardous parts, ingress of solid foreign objects,
                ingress of water, and to give additional information in connection with such
                protection. The first characteristic numeral indicates the degree of protection
                provided by the enclosure against access to hazardous parts and against ingress of
                solid foreign objects. The second characteristic numeral indicates the degree of
                protection provided by the enclosure against the ingress of water with harmful
                effects.
              </>
            }
            meaning="The IP code is two pieces of information packaged in two digits. Each digit is independent — the inspector reads the digits separately and matches them to the environmental load on the equipment."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four environmental stresses — and how they show up</ContentEyebrow>

          <ConceptBlock
            title="Wet, dust, heat, vibration / movement"
            plainEnglish="Most environmental damage to portable equipment falls into four categories: water, dust, heat, and mechanical (vibration / movement). Each has characteristic failure modes and the inspector’s eye is tuned to look for them."
          >
            <p>The four stresses, side by side:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Water.</strong> Pin oxidation (green / brown corrosion), insulation
                resistance dropping over time, rust on metal parts, water ingress through cord-grip
                gaps. Equipment must be IP44+ for typical wet exposure; IP65+ for direct washdown.
              </li>
              <li>
                <strong>Dust.</strong> Packed around contacts (insulating the cooling), bridging
                live parts to earth (especially metallic / conductive dust), clogging cooling vents,
                accumulating on hot components and providing fire fuel. Equipment in dusty
                environments needs IP5x / IP6x and shorter cleaning / inspection cycles.
              </li>
              <li>
                <strong>Heat.</strong> PVC flex hardening, moulded plastic discolouring, contact
                oxidation accelerated. Heating-appliance flex must be heat-resisting (BS EN 50525
                H05RR-F or H07RN-F); ambient-hot environments (boiler rooms, kitchens) need a review
                of the flex specification on every appliance.
              </li>
              <li>
                <strong>Vibration / movement.</strong> Loose terminal screws, fatigue cracking of
                conductors at strain-reliefs, cracked moulded plug bodies, cord-grip slip. Items
                that travel between rooms, are plugged / unplugged daily, or are mounted on
                vibrating equipment earn a shorter inspection cycle and more robust connectors.
              </li>
            </ul>
            <p>
              These stresses combine in the real world. A construction site is wet, dusty, hot in
              summer, vibrating, and high-movement. The cumulative effect is what HSG107 reflects in
              putting site equipment at the shortest inspection intervals.
            </p>
          </ConceptBlock>

          {/* Environment-risk matrix diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Environment-risk matrix — placement drives the inspection regime
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Two-axis matrix diagram. The horizontal axis is mechanical stress (low to high) and the vertical axis is environmental contamination (low to high). A green-to-red gradient fills the plot area. Five workplace environments are plotted: low-risk office near the origin, school / college in the lower-middle, workshop / industrial in the middle, construction site in the upper-right, and hire / event at the maximum corner. Each marker has a label placed clear of the plot edges and a small caption noting the typical inspection cadence. A separated bottom band states the rule: HSG107 Table 1 — placement on the matrix drives the starting inspection frequency."
            >
              <defs>
                <linearGradient id="riskGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Plot area with gradient */}
              <rect
                x="100"
                y="60"
                width="660"
                height="280"
                rx="6"
                fill="url(#riskGrad)"
                opacity="0.35"
              />

              {/* Axes */}
              <line
                x1="100"
                y1="340"
                x2="760"
                y2="340"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.4"
              />
              <line
                x1="100"
                y1="340"
                x2="100"
                y2="60"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.4"
              />

              {/* Axis titles */}
              <text
                x="430"
                y="370"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Mechanical stress / movement →
              </text>
              <text
                x="50"
                y="200"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
                transform="rotate(-90 50 200)"
              >
                Environmental contamination →
              </text>

              {/* Office (low-low) */}
              <circle
                cx="180"
                cy="300"
                r="11"
                fill="#22C55E"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <text x="200" y="298" fill="rgba(255,255,255,0.95)" fontSize="11" fontWeight="bold">
                Low-risk office
              </text>
              <text x="200" y="312" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Long cycles · visual primary
              </text>

              {/* School / college */}
              <circle
                cx="310"
                cy="240"
                r="11"
                fill="#84CC16"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <text x="330" y="238" fill="rgba(255,255,255,0.95)" fontSize="11" fontWeight="bold">
                School / college
              </text>
              <text x="330" y="252" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Annual visual; 2-yearly test typical
              </text>

              {/* Workshop */}
              <circle
                cx="430"
                cy="180"
                r="12"
                fill="#FBBF24"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <text x="450" y="178" fill="rgba(255,255,255,0.95)" fontSize="11" fontWeight="bold">
                Workshop / industrial
              </text>
              <text x="450" y="192" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Quarterly visual; annual test
              </text>

              {/* Construction */}
              <circle
                cx="560"
                cy="130"
                r="13"
                fill="#F97316"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <text
                x="540"
                y="112"
                textAnchor="end"
                fill="rgba(255,255,255,0.95)"
                fontSize="11"
                fontWeight="bold"
              >
                Construction site
              </text>
              <text x="540" y="126" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Weekly visual; quarterly test
              </text>

              {/* Hire / event (top-right) — labels placed BELOW marker so they don't clash with caption */}
              <circle
                cx="690"
                cy="100"
                r="13"
                fill="#EF4444"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <text
                x="672"
                y="86"
                textAnchor="end"
                fill="rgba(255,255,255,0.95)"
                fontSize="11"
                fontWeight="bold"
              >
                Hire / event
              </text>
              <text x="672" y="100" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Before / after each hire
              </text>

              {/* Separated bottom rule band */}
              <rect
                x="40"
                y="392"
                width="740"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="409"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                HSG107 Table 1 — placement on the matrix drives the starting frequency
              </text>
              <text x="410" y="423" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Higher stress + more contamination = shorter cycles; inverse for low-risk offices.
              </text>
            </svg>
          </div>

          <Scenario
            title="A wash-down food-prep area in a small commercial kitchen"
            situation="A small commercial kitchen has a stick blender, a stand mixer, and several plug-in appliances on stainless work surfaces. Cleaning is by hose-and-cloth at end of shift, including water on surfaces near the sockets. Most appliances are rated IP20."
            whatToDo="Flag at inspection. The environment is washdown — IP44 or higher equipment is appropriate. The appliances themselves may be Class II and acceptable, but the sockets / extension leads and any IP20-rated appliances are unsuitable. Inspector’s scope: identify the mismatch, recommend IP-appropriate replacements to the duty-holder, set a shorter inspection cycle while non-compliant equipment is in use."
            whyItMatters="Water on a 230 V appliance is the textbook fault scenario. Even with RCD protection, an under-rated appliance in a wet environment is a regular nuisance-trip risk and an occasional fire risk. The fix is environment-appropriate equipment, not just shorter inspection cycles."
          />

          <SectionRule />

          <ContentEyebrow>
            Movement, plug cycles, and the high-mechanical-stress case
          </ContentEyebrow>

          <ConceptBlock
            title="The “moves around a lot” class of items"
            plainEnglish="Some equipment is fixed in service; some is moved daily. The frequently-moved items take more mechanical stress at the plug, the cord grip and the flex strain-relief than fixed-position items. They earn shorter inspection cycles and more robust connectors."
          >
            <p>Items that fall into this class:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Presentation kit (projectors, lecture-room laptops with carts).</li>
              <li>Cleaning equipment (vacuums, scrubbers, polishers).</li>
              <li>Floor-care kit (dryers, dehumidifiers, fans).</li>
              <li>Catering on wheels (heated trolleys, tea / coffee carts).</li>
              <li>Construction-site small-tools (drills, sanders, multi-tools).</li>
              <li>Photocopiers and printer-trolleys that move between rooms.</li>
              <li>Event / AV kit (active speakers, DJ rigs, stage lighting).</li>
            </ul>
            <p>The visible failure modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Cracked moulded plug bodies, especially across the cord-grip area.</li>
              <li>Sheath stripped past the cord grip from being yanked.</li>
              <li>Flex strain-relief torn / split where the flex enters the appliance.</li>
              <li>Loose internal terminations from vibration in transit.</li>
              <li>Pin discolouration from rapid plug / unplug cycles oxidising the contact.</li>
            </ul>
            <p>
              The mitigation is environment-appropriate kit (rewireable plug with a robust strain-
              relief boot, heavy-duty rubber-sheathed flex, adequate IP rating) plus shorter
              inspection cycles per HSG107.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Setting one inspection frequency for an entire workplace"
            whatHappens="A duty-holder runs a single yearly PAT regime for the whole site. The site has both a low-risk office (where annual is generous) and an outdoor site compound (where annual is far too long). The office equipment is over-inspected; the site equipment is under-inspected — and is the equipment most likely to develop defects."
            doInstead="HSG107 explicitly supports differentiated frequencies. The duty-holder runs separate cycles by location / risk category. Office equipment can be on a longer cycle with formal visual as the principal control; site equipment is on a shorter cycle with combined inspection-and-test more frequently. The PAT inspector is well-placed to recommend this split because they walk the building."
          />

          <CommonMistake
            title="Treating the IP rating as an aspiration rather than a requirement"
            whatHappens="A site uses IP20-rated extension leads on the assumption that ‘they’ll be fine if it doesn’t rain’. On a wet day someone uses one anyway, water gets into the trailing socket, and the RCD trips repeatedly until someone removes it. Eventually, with the RCD removed, an actual fault becomes a shock or a fire."
            doInstead="The IP rating is a requirement matched to the environment, not a suggestion. IP44+ for outdoor / damp, IP65+ for washdown / wet, and IP6x for dust-laden environments. PAT inspector flags the mismatch; duty-holder supplies appropriate kit. The CoP and HSG107 are clear: equipment must suit the environment."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Heat, kitchens and hot ambient environments</ContentEyebrow>

          <ConceptBlock
            title="What hot environments do to ordinary equipment"
            plainEnglish="Equipment rated for typical room temperatures degrades faster in hot environments. Boiler rooms, commercial kitchens, plant rooms, drying rooms and laundries are hot ambient environments — the flex, the connectors and the appliance bodies all run hotter than designed."
          >
            <p>The visible signs and the inspection focus:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Hardened, brittle PVC flex within months of installation. Replace with
                heat-resisting flex (BS EN 50525 H05RR-F or H07RN-F).
              </li>
              <li>
                Discolouration of moulded plug bodies even without a contact fault — the ambient
                heat is doing the work.
              </li>
              <li>
                Equipment with high internal heat (commercial kitchen kit, laundry irons) has its
                own thermal envelope; the lead specification must match.
              </li>
              <li>
                Flex routing is critical — flex must not run across hot surfaces, hot exhaust ducts,
                or against radiators / heaters.
              </li>
            </ul>
            <p>
              Inspection cycles in hot environments are shorter than in office environments at the
              same use frequency. Heat is a continuous accelerator of every failure mode.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                Where equipment is used in adverse environments, including but not limited to wet,
                dusty, hot or corrosive locations, the equipment shall be selected to be suitable
                for the environment, the inspection regime shall reflect the increased rate at which
                faults develop in such environments, and the duty-holder shall consider whether
                equipment of a higher specification (for example, with a higher IP rating or with
                heat-resisting flexible cables) is required.
              </>
            }
            meaning="HSG107 puts three duties on the duty-holder for adverse environments: select equipment to suit; shorten inspection cycles; consider higher-specification equipment. The PAT inspector’s observations feed the third duty by surfacing where the current equipment is mismatched."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hire, rental and equipment that crosses environments</ContentEyebrow>

          <ConceptBlock
            title="The maximum-stress class of equipment"
            plainEnglish="Hire and rental kit goes through every kind of environment, with no continuity of supervision between users. HSG107 puts these at the most frequent end of the inspection scale — typically before-and-after each hire, with a robust quarantine-and-test process between."
          >
            <p>The hire-specific challenges:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Each hirer treats the kit differently. Damage is cumulative across hires.</li>
              <li>
                The hirer&rsquo;s environment may be unknown — the same lead might be used indoors
                one week and outdoors the next.
              </li>
              <li>
                Returned kit may have been modified by the hirer (foil fuses, removed earth pins,
                taped joints — see Section 3).
              </li>
              <li>
                Liability sits with the hire company — the kit going out must be safe; the kit
                coming back must be inspected before the next hire.
              </li>
            </ul>
            <p>
              The standard hire-yard process is: pre-hire inspection (formal visual + electrical
              test), hire issued with a clear date / inspection record, post-hire quarantine until
              re-inspected and re-tested. The cycle is per-hire, not periodic. Event-hire kit and
              tool-hire kit both fall under this.
            </p>
          </ConceptBlock>

          <Scenario
            title="A site-tools hire counter at the start of a busy morning"
            situation="A construction tool hire shop has 30 hand-power-tools out on hire and another 50 returned during the day. Each returned tool is supposed to be inspected before re-issue. The hire shop is using a fixed quarterly PAT regime."
            whatToDo="The fixed quarterly regime is wrong for hire kit. HSG107 places hire equipment at the most-frequent end of the inspection scale: every tool needs a formal visual inspection before re-issue, and combined inspection-and-test on a much shorter cycle than quarterly (typically before each hire or at minimum every few hires for high-turnover items). The PAT inspector’s job is to feed this back to the duty-holder; the company’s insurance and HSE compliance depend on it."
            whyItMatters="A hire-yard quarterly regime is a textbook gap. Most damage to a hand-power-tool happens during the hire — the next hirer is the next person to encounter the damage. HSG107’s frequency principle is exactly designed to prevent this gap."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'HSG107 Table 1 ranks environments by the rate at which defects develop. Office at one end, construction / hire at the other.',
              'BS EN 60529 IP code: first digit is solids (0–6), second digit is water (0–8). Read both, match to environment.',
              'Equipment must suit the environment. An IP20 lead used outdoors is failed at inspection regardless of its electrical-test results.',
              'Four environmental stresses: water, dust, heat, vibration / movement. Each has characteristic failure modes that focus the inspection.',
              'Hot environments require heat-resisting flex (BS EN 50525 H05RR-F / H07RN-F) and shorter inspection cycles. Ordinary PVC degrades quickly above its rated continuous temperature.',
              'Hire and rental kit is at the maximum-stress end. Inspection is per-hire (before and after), not periodic.',
              'Frequently-moved items earn shorter cycles and more robust connectors. Mechanical stress is a real failure mode.',
              'Differentiated inspection frequencies across a single workplace are correct, not unusual. Office and site compound on the same cycle is rarely defensible.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Where do I find the IP rating on a piece of equipment?',
                answer:
                  'On the rating plate / data plate of the equipment, usually on the back or underside. It will be printed as “IPxx” with the two digits. Some equipment has the IP rating moulded into the plastic body. If it is not present, the equipment is generally treated as IP00 (no protection rated) and is suitable only for benign indoor environments.',
              },
              {
                question: 'A piece of equipment has IPX4 rather than IP44. What does the X mean?',
                answer:
                  'The X in IPX4 means the manufacturer has not tested or certified the solids ingress rating, only the water rating (4 = splash). Treat IPX4 as having unknown solids protection — usually fine for indoor splash environments, but in a dusty environment look for a specified first digit.',
              },
              {
                question: 'Can I use an IP65 outdoor extension lead indoors in a dry office?',
                answer:
                  'Yes, an IP65 lead is over-rated for indoor use but it is safe — IP ratings are minimums for the environment, not maximums. The IP65 lead may be heavier and more expensive than necessary, but it is not non-compliant. Going the other way (IP20 outdoors) is the breach.',
              },
              {
                question: 'Does HSG107 give numerical inspection frequencies?',
                answer:
                  'HSG107 Table 1 gives indicative starting frequencies — for example, weekly user-checks on construction sites; quarterly to annual formal visual inspection in different environments; annually to 4-yearly combined inspection-and-test. The numbers are starting points; the duty-holder’s risk assessment finalises them. Section 5 of this module covers this in detail.',
              },
              {
                question:
                  'A piece of equipment carries a TUV / GS / VDE mark from a foreign manufacturer. Is that enough to pass the environment check?',
                answer:
                  'Foreign certification marks indicate compliance with their respective standards but do not by themselves confirm suitability for a given UK workplace environment. The PAT inspector still checks IP rating, flex type, plug compliance, and applies the formal visual inspection. The mark is information; the suitability decision is the inspector’s.',
              },
              {
                question: 'I see flex marked “H05RR-F” — what does that mean?',
                answer:
                  'BS EN 50525 cable code: H = harmonised, 05 = 300/500 V rated, RR = rubber insulation and rubber sheath, F = fine stranded (flexible). H05RR-F is heat-resisting rubber-sheathed flex used on heating appliances. H07RN-F is the heavier 450/750 V version used on heavy-duty / outdoor cables.',
              },
              {
                question:
                  'A small office has one washroom with a 13 A socket near the basin. Does that change the office’s environment category?',
                answer:
                  'Not for the office equipment overall, but the washroom socket itself is in a different environment — wet / damp — and any equipment plugged in there should be IP-rated for that environment. The PAT inspector treats the washroom as a separate location and inspects the equipment used there accordingly. The office cycle stays at low-risk frequencies.',
              },
              {
                question:
                  'How does the environment affect electrical-test results, not just visual inspection?',
                answer:
                  'Wet environments depress insulation-resistance readings — moisture in or on the equipment provides leakage paths. Dust contamination can do the same on internal surfaces. The CoP-recommended thresholds (covered in M4) assume reasonable test conditions. If a wet appliance fails IR testing, the inspector cleans / dries and re-tests before declaring a fail; if it still fails, the fault is real.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Environmental considerations — PAT M3.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Risk-based approaches to test intervals
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule3Section4;
