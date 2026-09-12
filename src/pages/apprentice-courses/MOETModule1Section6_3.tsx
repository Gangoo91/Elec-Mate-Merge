/**
 * MOET · Module 1 · Section 1.6 · Subsection 3 — Evacuation Procedures
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Emergency incident and response procedures."
 *              · "Health and safety regulations – key features and impact on role."
 *   Skills     · "Follow emergency incident and response procedures."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Evacuation Procedures - MOET Module 1 Section 6.3';
const DESCRIPTION =
  'Comprehensive guide to evacuation procedures for electrical maintenance technicians: emergency plans, evacuation types, alarm systems, assembly points, PEEPs, fire warden responsibilities, escape route signage to BS 5499, and emergency lighting testing.';

const quickCheckQuestions = [
  {
    id: 'evacuation-types',
    question: 'What is the difference between a simultaneous evacuation and a phased evacuation?',
    options: [
      'Simultaneous evacuation uses the fire alarm; phased evacuation relies on voice announcements only',
      'Simultaneous evacuation applies to staff; phased evacuation applies to visitors and contractors',
      'In simultaneous evacuation, everyone leaves at once; in phased evacuation, the fire floor evacuates first, then adjacent floors',
      'Simultaneous evacuation is used at night; phased evacuation is used during working hours',
    ],
    correctIndex: 2,
    explanation:
      'In a simultaneous evacuation, the alarm sounds throughout the building and everyone evacuates at the same time. In a phased evacuation (used in tall or complex buildings), the fire floor evacuates first, followed by the floors immediately above and below, then the rest of the building in sequence. This prevents overcrowding of stairways.',
  },
  {
    id: 'peep-purpose',
    question: 'What is a PEEP and who needs one?',
    options: [
      'A personal emergency evacuation plan — for any person who may need assistance to evacuate',
      'A public emergency exit plan — every building must display one',
      'A pre-evacuation emergency procedure — for fire marshals only',
      'A permanent electrical equipment protocol — for maintaining fire alarms',
    ],
    correctIndex: 0,
    explanation:
      'A PEEP (Personal Emergency Evacuation Plan) is an individual plan for any person who may need assistance to evacuate the building in an emergency. This includes persons with mobility impairments, visual or hearing impairments, temporary injuries, pregnant women, and anyone who cannot use stairs unaided. PEEPs must be agreed in advance and communicated to fire wardens.',
  },
  {
    id: 'fire-warden-duty',
    question: "During an evacuation, what is the fire warden's primary responsibility?",
    options: [
      'To sweep their designated area, ensure it is clear, and report to the assembly point',
      'To fight the fire using the nearest extinguisher',
      'To lock all external doors to prevent unauthorised entry',
      'To investigate the cause of the alarm and reset the panel',
    ],
    correctIndex: 0,
    explanation:
      "The fire warden's primary duty during an evacuation is to sweep their designated area (checking all rooms, toilets and storage areas), ensure everyone has left, assist anyone who needs help, close doors behind them, and report to the chief fire warden at the assembly point confirming their area is clear or identifying anyone unaccounted for.",
  },
  {
    id: 'emergency-lighting',
    question: 'How often should emergency lighting be functionally tested under BS 5266-1?',
    options: [
      'Weekly for a brief functional test and six-monthly for a full rated duration test',
      'Monthly for a brief functional test and annually for a full rated duration test',
      'Quarterly for a brief functional test and every three years for a full duration test',
      'Annually for both the brief functional test and the full rated duration test',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1 requires emergency lighting to be functionally tested monthly (a brief test to confirm each luminaire operates on battery) and annually for its full rated duration (typically 3 hours). The monthly test should last long enough to confirm illumination (a few seconds to a minute). Results must be recorded in the emergency lighting log book.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A simultaneous evacuation is best suited for:',
    options: [
      'Large multi-storey buildings such as hospitals',
      'Small to medium-sized single occupancy buildings',
      'Shopping centres with thousands of occupants',
      'High-rise residential buildings over 18 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Simultaneous evacuation (everyone evacuates at once when the alarm sounds) is suitable for small to medium-sized, single occupancy buildings where all occupants can evacuate quickly via the available exits without overcrowding stairways. Larger or more complex buildings typically require phased or progressive horizontal evacuation.',
  },
  {
    id: 2,
    question: 'In a phased evacuation, which floor evacuates first?',
    options: [
      'The ground floor, then each floor upwards in sequence',
      'The top floor first, working downwards to ground level',
      'The fire floor, then the floors immediately above and below',
      'All floors at once, with the most crowded directed out first',
    ],
    correctAnswer: 2,
    explanation:
      'In phased evacuation, the floor where the fire is located evacuates first, followed by the floors immediately above and below. This is because fire and smoke travel upwards, making the floors above most at risk. The remaining floors then evacuate in sequence, reducing the risk of stairway congestion.',
  },
  {
    id: 3,
    question: 'A two-stage fire alarm system uses:',
    options: [
      'A single continuous tone that sounds throughout the building immediately',
      'A silent pager system that alerts only the nominated fire wardens',
      'A voice message repeated until the fire brigade arrives on site',
      "An 'alert' signal (intermittent) for staff followed by an 'evacuate' signal (continuous) for all occupants",
    ],
    correctAnswer: 3,
    explanation:
      "A two-stage alarm provides an initial 'alert' signal (often intermittent or a different tone) to warn trained staff to investigate, followed by a full 'evacuate' signal (continuous) if the fire is confirmed. This reduces unnecessary full evacuations caused by false alarms, while ensuring rapid evacuation when a real fire is confirmed.",
  },
  {
    id: 4,
    question: 'Assembly points should be located:',
    options: [
      'At a safe distance from the building, away from access routes for emergency vehicles',
      'Immediately outside the main entrance for the quickest head count',
      'Inside the nearest neighbouring building to shelter occupants',
      'On the car park access road so vehicles can be moved if needed',
    ],
    correctAnswer: 0,
    explanation:
      'Assembly points must be at a safe distance from the building (typically at least 20 metres), clear of access routes that emergency vehicles will need, sheltered if possible, and large enough to accommodate all occupants. They should be clearly signed and well-known to all building occupants.',
  },
  {
    id: 5,
    question: 'A fire warden should NOT:',
    options: [
      'Close doors behind them as they sweep their designated area',
      'Re-enter the building to search for missing persons after reporting to the assembly point',
      'Report anyone unaccounted for to the chief fire warden',
      'Assist a person with a PEEP to reach a refuge area',
    ],
    correctAnswer: 1,
    explanation:
      'A fire warden must never re-enter the building once they have completed their sweep and reported to the assembly point. If someone is unaccounted for, this information is passed to the fire brigade who have the training, equipment and PPE to carry out search and rescue safely. Re-entering a burning building puts the warden at extreme risk.',
  },
  {
    id: 6,
    question: 'Personal Emergency Evacuation Plans (PEEPs) are required for:',
    options: [
      'Every employee in the building, regardless of ability',
      'Visitors and contractors only, not permanent staff',
      'Any person who may need assistance to evacuate the building',
      'Fire wardens, so they know their designated sweep area',
    ],
    correctAnswer: 2,
    explanation:
      'PEEPs are required for any person who may have difficulty evacuating without assistance. This includes permanent disabilities, temporary conditions (broken leg, pregnancy), sensory impairments, and cognitive conditions. Each PEEP is tailored to the individual and must be reviewed regularly and whenever circumstances change.',
  },
  {
    id: 7,
    question: 'Under BS 5499 / BS ISO 7010, emergency exit signs must be:',
    options: [
      'Red with a white pictogram and the word EXIT',
      'Blue with a white pictogram (mandatory action sign)',
      'Yellow with a black pictogram and border (warning sign)',
      'Green with white pictogram (running man and arrow)',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency exit signs must display a white running man pictogram and directional arrow on a green background, in accordance with BS ISO 7010 and BS 5499. Signs may be internally illuminated (maintained or non-maintained) or photoluminescent. They must be visible from all points on the escape route.',
  },
  {
    id: 8,
    question: 'Emergency lighting must provide illumination on escape routes for a minimum of:',
    options: ['3 hours (in most cases)', '24 hours', '30 minutes', '1 hour'],
    correctAnswer: 0,
    explanation:
      'BS 5266-1 requires emergency lighting to provide a minimum duration of 3 hours in most premises (1 hour is permitted in some premises where immediate evacuation is possible and the building will not be reoccupied until the system is fully recharged). The 3-hour duration allows for evacuation, fire brigade operations and safe re-entry.',
  },
  {
    id: 9,
    question: 'How often should fire evacuation drills be carried out?',
    options: [
      'Only once, when the building is first occupied',
      'At least once a year, with more frequent drills recommended for high-risk premises',
      'Every month, in line with the emergency lighting test cycle',
      'Whenever a new member of staff joins the organisation',
    ],
    correctAnswer: 1,
    explanation:
      'Fire evacuation drills should be carried out at least once a year for most premises, with more frequent drills (every 6 months) recommended for high-risk premises, premises with sleeping accommodation, and premises with frequent staff turnover. Drills should be unannounced (after the first one), timed, and reviewed to identify improvements.',
  },
  {
    id: 10,
    question: 'Invacuation (staying put) is most appropriate when:',
    options: [
      'A fire is confirmed on the floor immediately below your own',
      'The fire alarm sounds and the nearest exit is more than 20 metres away',
      'External hazards such as chemical spills or terrorist incidents make leaving the building more dangerous',
      'A drill is in progress and occupants have already been warned',
    ],
    correctAnswer: 2,
    explanation:
      'Invacuation (also called lockdown or shelter-in-place) is used when external hazards make it safer to remain inside the building. Examples include chemical or toxic releases, severe weather events, bomb threats in the surrounding area, or security incidents. Occupants move to a designated safe area within the building.',
  },
  {
    id: 11,
    question: 'Visitor management during an evacuation requires:',
    options: [
      'Leaving visitors to find their own way out to avoid delaying staff',
      'Holding visitors at reception until all staff have evacuated',
      'Directing visitors to a separate assembly point from staff',
      'A visitor sign-in system, escorted evacuation, and checking the visitor log at the assembly point',
    ],
    correctAnswer: 3,
    explanation:
      'Visitors must be signed in on arrival so they can be accounted for during an evacuation. They should be escorted by their host or directed by fire wardens. At the assembly point, the visitor log is checked to ensure all visitors are accounted for. Visitors should receive a brief fire safety induction on arrival.',
  },
  {
    id: 12,
    question: 'When working as a contractor in an unfamiliar building, you should:',
    options: [
      'Familiarise yourself with escape routes, assembly points, alarm sounds and fire procedures during your site induction',
      'Assume the procedures are the same as the last similar site you visited',
      'Wait until an alarm sounds before locating the nearest exit',
      'Rely on the building occupants to guide you out in an emergency',
    ],
    correctAnswer: 0,
    explanation:
      'Every time you attend a new site, you must familiarise yourself with the escape routes, assembly point location, alarm sounds (distinguish between alert and evacuate signals), fire extinguisher locations, and the site-specific emergency procedures. This should be covered in your site induction. Never assume — every building is different.',
  },
];

const faqs = [
  {
    question:
      'What should I do if the fire alarm sounds while I am working on a live or isolated circuit?',
    answer:
      'If the alarm sounds while you are working on a circuit, make the area safe as quickly as possible. If working on a live circuit (under a permit), immediately stop work, secure any exposed conductors if you can do so in a few seconds, and evacuate. If you have isolated a circuit and applied locks, leave the locks in place — the isolation must remain secure. Do not delay your evacuation to carry out lengthy procedures. Your life takes priority over the installation.',
  },
  {
    question: 'How do I know if it is a real fire or a false alarm?',
    answer:
      'You should treat every alarm activation as real until confirmed otherwise. In buildings with two-stage alarms, the initial alert tone indicates staff should investigate — but if you are not a fire warden, you should prepare to evacuate. If the continuous evacuate signal sounds, leave immediately. Only the fire brigade or a senior manager can declare a false alarm. Never ignore an alarm or assume it is a drill unless you have been officially notified in advance.',
  },
  {
    question: 'Can I use the lift during an evacuation?',
    answer:
      'No — lifts must not be used during a fire evacuation unless they are specifically designated as evacuation lifts (compliant with BS EN 81-72). Standard lifts may stop at the fire floor, fill with smoke, lose power, or the shaft may act as a chimney. The only exceptions are designated evacuation lifts used as part of a PEEP for persons unable to use stairs, under the control of trained personnel.',
  },
  {
    question: 'What is a refuge area and how is it used?',
    answer:
      'A refuge area is a designated space (usually on a stairway landing or in a protected lobby) where a person who cannot use stairs can wait safely for assistance during an evacuation. Refuges must have fire resistance, a communication system (intercom or telephone) to alert the fire brigade or building management, and sufficient space. They are a key component of PEEPs for persons with mobility impairments.',
  },
  {
    question: 'How often should emergency lighting be tested?',
    answer:
      'Under BS 5266-1, emergency lighting should receive a brief functional test monthly (confirm each luminaire illuminates on battery for a few seconds) and a full duration test annually (typically 3 hours of battery operation). Tests should be carried out by a competent person and recorded in the emergency lighting log book. Additionally, a daily visual check is recommended to ensure luminaires are undamaged and indicator LEDs are showing normal status.',
  },
];

const MOETModule1Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.6 · Subsection 3"
        title="Evacuation Procedures"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Emergency plans, evacuation types, fire warden duties and escape route management.
          </p>

          <TLDR
            points={[
              'Types: Simultaneous, phased, progressive horizontal, invacuation',
              'Alarms: Single-stage (instant evacuate) or two-stage (alert then evacuate)',
              'PEEPs: Individual plans for persons needing evacuation assistance',
              'Drills: At least annually, timed, recorded and reviewed',
              'Contractor awareness: Check escape routes at every new site',
              'Emergency lighting: Monthly functional, annual duration test (BS 5266)',
              'Exit signage: Green running man to BS ISO 7010 / BS 5499',
              'ST1426: Maps to emergency procedures KSBs',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the different types of evacuation: simultaneous, phased, progressive and invacuation',
              'Describe the operation of single-stage and two-stage fire alarm systems',
              'Identify the responsibilities of fire wardens during an evacuation',
              'Explain the purpose and content of a Personal Emergency Evacuation Plan (PEEP)',
              'State the requirements for emergency lighting testing under BS 5266-1',
              'Apply contractor site induction requirements for fire safety procedures',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Emergency plans and evacuation types</ContentEyebrow>

          <ConceptBlock title="Emergency Plans and Evacuation Types">
            <p>
              Every workplace must have an emergency plan that sets out the procedures for dealing
              with fire and other emergencies. The Regulatory Reform (Fire Safety) Order 2005
              requires the responsible person to establish and implement appropriate emergency
              procedures, including evacuation plans suited to the building, its occupancy and the
              activities carried out within it. As a maintenance electrician working across multiple
              sites, you must understand all evacuation types and adapt to each building's specific
              procedures.
            </p>
            <p>
              <strong>Simultaneous Evacuation.</strong> The simplest and most common evacuation
              strategy. When the alarm sounds, everyone in the building evacuates immediately to the
              assembly point. This is suitable for:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Small to medium-sized buildings</li>
              <li>Single-storey premises</li>
              <li>Buildings with simple layouts and adequate exit capacity</li>
              <li>Premises where all occupants can evacuate within a few minutes</li>
            </ul>
            <p>
              <strong>Phased Evacuation.</strong> Used in tall buildings and large complex premises
              where simultaneous evacuation would cause dangerous overcrowding of stairways. The
              evacuation is carried out in stages:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase 1:</strong> The fire floor evacuates immediately on hearing the
                continuous alarm
              </li>
              <li>
                <strong>Phase 2:</strong> The floors immediately above and below evacuate next
              </li>
              <li>
                <strong>Phase 3:</strong> Remaining floors evacuate in sequence, directed by the
                fire control team
              </li>
              <li>Requires a two-stage alarm system and trained fire wardens on every floor</li>
              <li>
                Building must have adequate compartmentation to allow phased evacuation safely
              </li>
            </ul>
            <p>
              <strong>Progressive Horizontal Evacuation.</strong> Used in hospitals, care homes and
              similar premises where occupants cannot easily use stairs. People are moved
              horizontally through fire compartment walls to an adjacent safe compartment:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Occupants move to the adjacent fire compartment on the same floor</li>
              <li>Each compartment provides protection for at least 30 minutes (typically 60)</li>
              <li>
                Vertical evacuation (via stairs or lifts) only if the fire spreads beyond the
                compartment
              </li>
              <li>
                Critical that fire compartment walls are fully intact — maintenance electricians
                must fire-stop all penetrations
              </li>
            </ul>
            <p>
              <strong>Invacuation (Stay Put / Shelter in Place).</strong> Invacuation means keeping
              people inside the building rather than evacuating. This is used when external hazards
              make leaving the building more dangerous than staying inside:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Chemical or toxic substance release outside the building</li>
              <li>Security threats (terrorism, violent incidents) in the surrounding area</li>
              <li>Severe weather events (storms, flooding) where leaving would be hazardous</li>
              <li>Occupants move to a designated safe area within the building</li>
              <li>Windows and ventilation sealed to prevent external contaminants entering</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a contractor working in different buildings, always
              check which evacuation type is in use during your site induction. Do not assume it is
              a simultaneous evacuation — many large buildings use phased or progressive strategies
              that require you to listen for specific alarm tones and follow different procedures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Alarm systems and signalling</ContentEyebrow>

          <ConceptBlock title="Alarm Systems and Signalling">
            <p>
              The fire alarm system is the primary means of alerting building occupants to a fire.
              Different buildings use different types of alarm system depending on their size,
              complexity and evacuation strategy. As a maintenance electrician, you will install,
              test and maintain these systems — but you also need to understand them as a building
              occupant for your own safety.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Alarm Type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Single-stage</td>
                    <td className="border border-white/10 px-3 py-2">
                      Continuous alarm sounds immediately throughout the building; all occupants
                      evacuate at once
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Small to medium buildings; simultaneous evacuation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Two-stage</td>
                    <td className="border border-white/10 px-3 py-2">
                      Alert signal (intermittent/pulsing) for staff to investigate; evacuate signal
                      (continuous) if confirmed
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Medium to large buildings with trained fire wardens
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Voice alarm</td>
                    <td className="border border-white/10 px-3 py-2">
                      Recorded or live voice messages give specific instructions (which floors to
                      evacuate, which exits to use)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Large complex buildings, shopping centres, transport hubs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Staff alarm</td>
                    <td className="border border-white/10 px-3 py-2">
                      Discreet notification (pager, coded announcement) alerts staff without
                      alarming the public
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Retail, hotels, entertainment venues
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Two-Stage Alarms and Voice Alarm Systems">
            <p>
              <strong>Two-Stage Alarm Details</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Alert stage:</strong> Intermittent or pulsing tone lasting typically 2-5
                minutes
              </li>
              <li>Fire wardens investigate the source of the alarm</li>
              <li>
                If the fire is confirmed, the warden breaks a second call point or the panel
                escalates automatically
              </li>
              <li>
                <strong>Evacuate stage:</strong> Continuous alarm signals full evacuation
              </li>
              <li>
                If the alert is not investigated within the set time, the system automatically
                escalates to full evacuation
              </li>
            </ul>
            <p>
              <strong>Voice Alarm Systems (BS 5839-8)</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Pre-recorded messages for different scenarios (fire on specific floor, evacuate via
                specific exit)
              </li>
              <li>
                Live microphone facility for the fire control team to give real-time instructions
              </li>
              <li>Zoned messaging — different messages to different areas of the building</li>
              <li>
                Proven to be more effective than bells/sounders at achieving evacuation compliance
              </li>
              <li>
                Must be intelligible — background noise levels and acoustic design are critical
              </li>
            </ul>
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-orange-400">Alarm Testing</p>
              <p className="text-sm text-white">
                BS 5839-1 requires the fire alarm to be tested weekly by activating a different
                manual call point each week (rotating around the building so every MCP is tested
                over a period of time). The test confirms that the sounder or voice alarm operates
                throughout the building. The test should be carried out at the same time each week
                so building occupants recognise it. All tests must be recorded in the fire alarm log
                book.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> As a maintenance electrician, you may be the person
              carrying out weekly fire alarm tests. Use a call point key (not the break glass
              element) to activate the test, confirm all sounders operate, and record the test.
              Always notify building occupants before testing so they do not evacuate unnecessarily.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>PEEPs, fire wardens and visitor management</ContentEyebrow>

          <ConceptBlock title="Personal Emergency Evacuation Plans (PEEPs)">
            <p>
              Effective evacuation depends on trained personnel, individual support for vulnerable
              persons, and robust management of visitors and contractors. The Equality Act 2010
              requires reasonable adjustments for disabled persons, including in emergency
              evacuation planning. As a contractor, you are both someone who needs to be managed
              (visitor/contractor on site) and potentially someone who assists others during an
              emergency.
            </p>
            <p>
              A PEEP is an individual evacuation plan for any person who may need assistance to
              evacuate safely. PEEPs should be:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Person-specific:</strong> Tailored to the individual's needs, abilities and
                the building layout
              </li>
              <li>
                <strong>Agreed with the individual:</strong> Discussed, not imposed — the person
                knows their own needs best
              </li>
              <li>
                <strong>Documented:</strong> Written plan kept on file and copies given to all
                relevant persons
              </li>
              <li>
                <strong>Communicated:</strong> Fire wardens, colleagues and reception staff must
                know who has a PEEP and what it involves
              </li>
              <li>
                <strong>Practised:</strong> Included in evacuation drills to test effectiveness
              </li>
              <li>
                <strong>Reviewed:</strong> Updated whenever the person's circumstances change, the
                building layout changes, or after a drill
              </li>
            </ul>
            <p>
              <strong>Who May Need a PEEP?</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mobility impairment:</strong> Wheelchair users, persons with walking
                difficulties, persons using crutches or walking frames
              </li>
              <li>
                <strong>Visual impairment:</strong> Persons who cannot see exit signs or may be
                disoriented by smoke
              </li>
              <li>
                <strong>Hearing impairment:</strong> Persons who may not hear the fire alarm
                (vibrating pagers or flashing beacons may be needed)
              </li>
              <li>
                <strong>Temporary conditions:</strong> Broken leg, recent surgery, pregnancy
                (particularly late stage)
              </li>
              <li>
                <strong>Cognitive conditions:</strong> Persons who may not understand or respond
                appropriately to alarms
              </li>
              <li>
                <strong>Visitors:</strong> A generic evacuation assistance plan (GEAP) should be in
                place for visitors with disabilities
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fire Warden Responsibilities">
            <p>
              Fire wardens (also called fire marshals) are trained employees who play a critical
              role during evacuation. Each fire warden is assigned a specific zone or floor. Their
              duties during an evacuation include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Investigate:</strong> In two-stage systems, investigate the alarm source
                during the alert phase
              </li>
              <li>
                <strong>Sweep:</strong> Systematically check every room, toilet, storage area and
                office in their zone
              </li>
              <li>
                <strong>Direct:</strong> Guide occupants to the nearest safe exit route and assembly
                point
              </li>
              <li>
                <strong>Assist:</strong> Help anyone with a PEEP to evacuate according to their plan
              </li>
              <li>
                <strong>Close:</strong> Close all doors behind them as they leave (doors are fire
                barriers when closed)
              </li>
              <li>
                <strong>Report:</strong> Report to the chief fire warden at the assembly point,
                confirming their zone is clear or identifying anyone missing
              </li>
              <li>
                <strong>Do NOT re-enter:</strong> Never go back into the building once the sweep is
                complete
              </li>
            </ul>
            <p>
              <strong>Visitor Management</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All visitors must sign in on arrival and sign out on departure</li>
              <li>
                Visitors should receive a brief fire safety induction (escape routes, assembly
                point, alarm sound)
              </li>
              <li>Visitors should be escorted or given clear directions to exit routes</li>
              <li>The visitor log must be taken to the assembly point for roll call</li>
              <li>Contractor sign-in boards should be separate from visitor logs for clarity</li>
            </ul>
            <p>
              <strong>Disabled Persons Evacuation</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Refuge areas: protected spaces on stairway landings with communication points</li>
              <li>Evacuation chairs: lightweight chairs for carrying persons down stairs</li>
              <li>Evacuation lifts: BS EN 81-72 compliant lifts under fire service control</li>
              <li>Buddy systems: trained colleagues designated to assist specific individuals</li>
              <li>Visual/vibrating alarms for hearing-impaired persons</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Contractor note:</strong> As a maintenance electrician visiting different
              sites, you are effectively a visitor. Ensure you sign in, receive the fire safety
              induction, know the escape routes and assembly point, and sign out when you leave. If
              you have any condition that might affect your evacuation, inform your host so
              arrangements can be made.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Training, drills and escape route maintenance</ContentEyebrow>

          <ConceptBlock title="Fire Evacuation Drills">
            <p>
              Fire evacuation procedures are only effective if everyone knows what to do. Regular
              training, realistic drills and diligent maintenance of escape routes are essential
              components of fire safety management. As a maintenance electrician, you have a dual
              role — ensuring your own fire safety awareness and maintaining the systems (emergency
              lighting, signage, fire doors) that support safe evacuation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency:</strong> At least annually for most premises; every 6 months for
                higher-risk premises (sleeping accommodation, hazardous processes, high staff
                turnover)
              </li>
              <li>
                <strong>Unannounced:</strong> After the initial drill (which may be announced),
                subsequent drills should be unannounced to test genuine response
              </li>
              <li>
                <strong>Timing:</strong> Vary the time of day, day of the week, and simulate
                different scenarios (blocked exit, night shift, during maintenance work)
              </li>
              <li>
                <strong>Recording:</strong> Document the date, time, alarm activation time,
                evacuation time, number of occupants, any issues identified, and corrective actions
              </li>
              <li>
                <strong>Review:</strong> After each drill, hold a debrief with fire wardens.
                Identify what worked well and what needs improvement
              </li>
              <li>
                <strong>Target times:</strong> Typical target evacuation times are 2.5 minutes for
                single-storey buildings, 5 minutes for multi-storey, though this depends on building
                size and complexity
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintaining Escape Routes">
            <p>
              Escape routes must be kept clear and usable at all times. This is a legal requirement
              under the RRFSO 2005. Common problems include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Obstructions:</strong> Materials stored in corridors, stairways or in front
                of exits. Maintenance equipment, cable drums and toolboxes are common culprits —
                ensure your work does not block escape routes
              </li>
              <li>
                <strong>Locked exits:</strong> Final exit doors must be operable from the inside
                without a key. Electromagnetic locks must release on fire alarm activation.
                Padlocked fire exits are a serious offence
              </li>
              <li>
                <strong>Fire door issues:</strong> Doors wedged open (use electromagnetic holders
                instead), damaged intumescent strips, faulty self-closers, excessive gaps (max 3 mm
                at sides, 8 mm at threshold)
              </li>
              <li>
                <strong>Signage failures:</strong> Non-illuminated or obscured exit signs, incorrect
                directional arrows, missing signs at changes of direction
              </li>
              <li>
                <strong>Emergency lighting failures:</strong> Failed luminaires, depleted batteries,
                obstructed light fittings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency Lighting — BS 5266-1">
            <p>
              Emergency lighting provides illumination when the normal mains supply fails, enabling
              safe evacuation. As a maintenance electrician, you may be responsible for installing,
              testing and maintaining these systems.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Types:</strong> Maintained (always on) or non-maintained (only when mains
                fails). Self-contained (individual batteries) or central battery system
              </li>
              <li>
                <strong>Locations:</strong> All escape routes, exit doors, stairways, changes of
                direction, intersections, external exits, near fire alarm call points, near
                firefighting equipment, lift cars, toilets over 8 m², high-risk task areas
              </li>
              <li>
                <strong>Illumination:</strong> Minimum 1 lux along the centre line of an escape
                route, 0.5 lux across the full width
              </li>
              <li>
                <strong>Duration:</strong> Minimum 3 hours for most premises (1 hour where immediate
                evacuation is possible)
              </li>
              <li>
                <strong>Monthly test:</strong> Brief functional test — simulate mains failure and
                confirm each luminaire illuminates. Record results
              </li>
              <li>
                <strong>Annual test:</strong> Full rated duration test (3 hours) — verify each
                luminaire operates for its full duration. Replace any that fail
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Exit Signage — BS 5499 / BS ISO 7010">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Green background with white running man pictogram and directional arrow</li>
              <li>Must be visible from every point on the escape route</li>
              <li>
                Illuminated signs (internally lit) for buildings where normal lighting may fail
              </li>
              <li>Photoluminescent signs acceptable where adequate ambient light charges them</li>
              <li>Signs required at every exit, change of direction, and intersection</li>
              <li>
                Maximum viewing distance depends on sign size (100 mm letter height = 30 m viewing
                distance)
              </li>
            </ul>
            <p className="italic text-white">
              <strong>Note:</strong> During your maintenance work, always check the condition of
              emergency lighting, exit signage and fire doors in the areas where you are working. If
              you notice failures (blown luminaires, damaged signs, faulty door closers), report
              them to the building manager. Under the RRFSO 2005, everyone on site has a duty to
              cooperate with fire safety measures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Contractor and multi-site considerations</ContentEyebrow>

          <ConceptBlock title="Contractor Site Induction — Fire Safety Essentials">
            <p>
              Electrical maintenance technicians frequently work as contractors, visiting multiple
              different sites each week. Each building has its own emergency procedures, alarm
              systems, escape routes and assembly points. Complacency is a serious risk — you must
              treat every site as unfamiliar and take the time to learn the specific procedures.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Escape routes:</strong> Walk the escape routes from your work area to the
                nearest exits. Identify at least two independent routes
              </li>
              <li>
                <strong>Assembly point:</strong> Know the exact location — not just "outside" but
                the specific designated area
              </li>
              <li>
                <strong>Alarm sound:</strong> Listen to the alarm during the induction or weekly
                test. In two-stage systems, know the difference between alert and evacuate
              </li>
              <li>
                <strong>Call points:</strong> Locate the nearest manual call point to your work area
              </li>
              <li>
                <strong>Extinguishers:</strong> Note the type and location of the nearest fire
                extinguisher
              </li>
              <li>
                <strong>Fire warden:</strong> Know who the local fire warden is for the area you are
                working in
              </li>
              <li>
                <strong>Sign in/out:</strong> Always sign the contractor register on arrival and
                departure so you can be accounted for
              </li>
              <li>
                <strong>Permit to work:</strong> If your work involves hot work, ensure the building
                fire risk assessment accounts for this
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Working in Occupied Buildings and Multi-Site Awareness">
            <p>
              <strong>Working in Occupied Buildings.</strong> When carrying out maintenance in
              occupied buildings, your work must not compromise the escape routes or fire safety
              systems. Cable installation that temporarily blocks a corridor, dust from cutting that
              triggers false alarms, or isolation of fire alarm circuits all require careful
              planning and coordination with the building manager. If you need to impair any fire
              safety system (even temporarily), a fire impairment notice must be issued and
              compensatory measures put in place.
            </p>
            <p>
              <strong>Multi-Site Awareness.</strong> Maintain a personal record of fire safety
              information for every site you regularly visit. Include the assembly point location,
              alarm type, nearest exits from your typical work areas, and emergency contact numbers.
              Review this information each time you attend site — building layouts, procedures and
              personnel can change. If you arrive on site and notice changes to escape routes (new
              construction, blocked exits), report this immediately.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to
              comply with site-specific emergency procedures and demonstrate awareness of evacuation
              plans at every workplace. This is assessed through your portfolio evidence and
              workplace observations — ensure you can demonstrate that you routinely check fire
              safety arrangements when attending different sites.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Simultaneous — everyone at once, small/medium buildings',
              'Phased — fire floor first, then adjacent, then rest',
              'Progressive horizontal — to adjacent compartment',
              'Invacuation — shelter in place, external threat',
              'Fire wardens sweep and report at assembly point',
              'PEEPs for any person needing assistance',
              'RRFSO 2005 — Emergency procedures duty',
              'BS 5839-1 — Fire alarm testing (weekly MCPs)',
              'BS 5266-1 — Emergency lighting (monthly/annual test)',
              'BS 5499 / BS ISO 7010 — Exit signage',
              'Equality Act 2010 — Reasonable adjustments',
              'ST1426 — Emergency procedures KSBs',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  First Aid for Electrical Incidents
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Reporting Incidents, Accidents and Near Misses
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section6_3;
