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
    id: 'fam5-s2-siting',
    question:
      'BS 5839-1:2025 expects the Control and Indicating Equipment (CIE) to be sited so it is accessible to the fire and rescue service on first attendance. Which siting is BEST aligned with that expectation?',
    options: [
      'On the top floor in a locked plant room with no signage to direct the FRS.',
      'At the principal protected entrance, signed from outside, with unobstructed key-free access.',
      'In a basement riser cupboard behind a stack of stored chairs and other items.',
      'In an occupier-only area accessible only with a manager’s key during office hours.',
    ],
    correctIndex: 1,
    explanation:
      'CIE siting is a fire-service-access decision, not a tidy-cupboard decision. Reception or principal entrance, signed from outside, mounted so a standing operator reads it without aids, accessible without keys or stored items in the way. The FRS first reads the CIE for zone information; delay reading it delays the response.',
  },
  {
    id: 'fam5-s2-mounting',
    question:
      'CIE mounting height — what is the working principle for a CIE display whose centreline you can choose?',
    options: [
      'As high on the wall as practical, to keep the panel clear of passing traffic.',
      'Active-display centreline in the 1.4 to 1.6 m range, readable by a standing operator.',
      'At skirting level, low on the wall, to keep the display out of direct sightlines.',
      'At high level near the ceiling, where the indicators are visible from across the room.',
    ],
    correctIndex: 1,
    explanation:
      'The mounting height supports operation under stress by an operator who may be unfamiliar with the equipment. A 1.4-1.6 m centreline lets a standing operator of average height read every indicator and operate reset / silence / evacuate without aids or bending. Higher than that pushes controls out of reach; lower means they are obscured by floor furniture.',
  },
  {
    id: 'fam5-s2-cyber',
    question:
      'BS 5839-1:2025 introduces a new clause (43.4) on remote services and cyber security. Which physical control is recommended?',
    options: [
      'Leave the comms cabinet unlocked so any visiting engineer can connect quickly.',
      'Physical lock-off of the comms cabinet, with anti-tamper plugs on CIE network patch leads.',
      'Connect the CIE to the building’s public Wi-Fi so remote service is always available.',
      'Rely on software alone for security, with no physical controls at the network port.',
    ],
    correctIndex: 1,
    explanation:
      'Clause 43.4 (new in 2025) places explicit weight on physical and authentication controls for the CIE network connection: locked comms cabinet, anti-tamper plugs, and authentication of any remote-connection request before access is allowed. The intent is that an attacker cannot plug a laptop into the network port and gain control without opening the locked cabinet or defeating the authentication. The CIE is now a connected device and must be secured as one.',
  },
  {
    id: 'fam5-s2-falsenotice',
    question:
      'The 2025 false-alarm notice (Figure 1 of the FIA Guide) is recommended to be fixed where, and to read what?',
    options: [
      'Inside the panel door, where it is hidden from anyone operating the controls.',
      'On or adjacent to the CIE, stating the active ARC connection and the ARC telephone number.',
      'Behind the panel against the wall, where the printed text cannot readily be read.',
      'On the building’s front door only, away from where the panel is actually operated.',
    ],
    correctIndex: 1,
    explanation:
      'The false-alarm notice is a pre-test prompt, fixed so it is the first thing a person looking at the panel reads. It states the system has an active FRS connection via an ARC and gives the ARC number. Premises management calls the ARC before testing; the ARC suspends despatch; the test runs; the ARC is unsuspended. This reduces unnecessary FRS attendances and complies with the FRS call-challenging policy direction — a single label that has driven a measurable reduction in unwanted FRS calls in the 2025 commentary.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5839-1:2025 expects the CIE siting to support what primary user need?',
    options: [
      'Access for the fire and rescue service on attendance, as its first information point.',
      'Easy day-to-day access for the cleaning contractor and facilities maintenance staff.',
      'Maximum privacy, so the panel is hidden well away from public and visitor view.',
      'Proximity to a power socket, to simplify and shorten the mains supply connection.',
    ],
    correctAnswer: 0,
    explanation:
      'The CIE is the FRS information interface — on arrival the FRS reads zone information, suppresses sounders if instructed, and confirms fire location within seconds. Operator and maintainer access are secondary. Siting follows that priority: principal protected entrance, signed from outside, accessible without keys or obstructions.',
  },
  {
    id: 2,
    question: 'CIE mains supply termination — best practice is...?',
    options: [
      'A plug-and-socket connection on a switched 13 A socket-outlet sited near the panel.',
      'A fused spur taken from the nearest general lighting circuit on that same floor.',
      'Hard-wired from a dedicated, labelled, lockable-off final circuit for authorised persons only.',
      'A connection to the nearest ring final circuit, via an unswitched fused connection unit.',
    ],
    correctAnswer: 2,
    explanation:
      'CIE mains is dedicated and protected against accidental disconnection: hard-wired (no plug-and-socket), labelled "FIRE ALARM — DO NOT SWITCH OFF", lockable-off, fed from before any switching device an occupant could operate in error, and accessible only to authorised personnel. Plug-and-socket is non-compliant; spurring off shared circuits creates accidental-isolation risk.',
  },
  {
    id: 3,
    question:
      'CIE battery installation — what does BS 5839-1:2025 §16 require to be marked on the batteries?',
    options: [
      'A barcode encoding the manufacturer’s warranty terms and supply-chain details.',
      'The battery serial number only, recorded purely for stock-control purposes.',
      'Nothing at all — fire-alarm standby batteries are deliberately left unmarked.',
      'The date of installation, as a label or permanent-marker mark on the battery.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1:2025 §16 acknowledges the long-standing custom of marking batteries with the installation date. The date is the lifecycle datum that drives the replacement schedule (typically a 4-year design life for VRLA batteries, per manufacturer data). A permanent-marker date is sufficient; an applied label is preferred. Without it, replacement planning is guesswork.',
  },
  {
    id: 4,
    question:
      'CIE earthing — the CIE is fed from the building LV supply. The earthing system is...?',
    options: [
      'Connected per BS 7671 to the main earthing terminal, CPC to the CIE earth bar.',
      'No earth needed — the CIE is treated as double-insulated (Class II) throughout.',
      'Connected to the nearest cold-water service pipe, used as the earthing point.',
      'Connected to the central-heating radiator pipework local to the CIE panel.',
    ],
    correctAnswer: 0,
    explanation:
      'CIE earthing is BS 7671 territory: CPC sized per Table 54.7 or the adiabatic equation, terminated to the dedicated CIE earth bar, identified green-and-yellow. The 2022 amendment to BS 7671 (and the 2025 BS 5839-1 alignment) introduces PINK / "FE" identification for functional earth, which is a distinct conductor from the protective earth.',
  },
  {
    id: 5,
    question:
      'The 2025 cyber security clause (43.4) recommends what for a method of authentication of a request to accept a remote connection?',
    options: [
      'No authentication — remote connections are accepted automatically to avoid any delay.',
      'Authentication in the CIE or gateway software before any remote access is allowed.',
      'Open anonymous access, so any field engineer can connect without supplying credentials.',
      'A single shared password written on a label fixed to the front face of the panel.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 43.4 introduces layered controls: physical lock-off, anti-tamper plugs, authentication for remote connection, a risk assessment before any remote read / control / write service, and the responsible individual confirming the system is fully operational on completion. A connected CIE is an attack surface; the controls treat it as one.',
  },
  {
    id: 6,
    question:
      'A false-alarm notice (Figure 1 of the FIA Guide) is recommended near the CIE for what purpose?',
    options: [
      'To record the date the panel was last serviced, as an entry for the logbook.',
      'To display the maximum permitted occupancy figure for the protected premises.',
      'To list every zone number and its physical location for the operator’s reference.',
      'Pre-test reminder of the active ARC connection, giving the ARC telephone number.',
    ],
    correctAnswer: 3,
    explanation:
      'The notice tells anyone about to operate or test the panel that the system has an active FRS connection via an ARC. Premises management calls the ARC to suspend despatch before any test; the ARC suspends; the test runs; despatch is restored. It is a procedural prompt that reduces unwanted FRS calls and aligns with the FRS call-challenging policy direction.',
  },
  {
    id: 7,
    question:
      'CIE mains supply isolation device — BS 5839-1:2025 has consolidated the recommendations into a single clause. What does it require?',
    options: [
      'A dedicated, labelled, lockable-off isolating device for authorised persons only.',
      'A readily accessible wall switch that any building occupant can use to isolate the panel.',
      'No isolating device at all — the CIE is wired directly with no means of disconnection.',
      'A shared isolator that also feeds the general lighting served on the same circuit.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1:2025 §19 (Power supplies) consolidates the previous split-clause guidance (2017 clauses 25 and 29) into a single clause: a clearly identified, dedicated isolating device — typically a lockable-off MCB or isolator labelled FIRE ALARM PANEL DO NOT SWITCH OFF, managed under permit-to-work. The maintenance use case drives the design — the device exists for the maintainer’s safety, not for occupant convenience.',
  },
  {
    id: 8,
    question: 'CIE batteries — the standby capacity calculation is driven by what factor?',
    options: [
      'The physical size of the panel enclosure and the space available for the batteries.',
      'The unit price of the batteries and the planned maintenance budget for the contract.',
      'The standby and alarm load currents over the standby and alarm durations required.',
      'The number of zones provided on the panel, regardless of the current each one draws.',
    ],
    correctAnswer: 2,
    explanation:
      'Battery sizing is a load-and-duration calculation: standby current × standby hours + alarm current × alarm minutes, with margin for ageing, temperature and depth of discharge. Typical durations are 24 h standby then 30 min alarm for Category L systems with ARC monitoring (longer without ARC). The output is the Ah rating; the chosen battery meets or exceeds it. Under-sized batteries trip on quiescent load before they ever see an alarm.',
  },
  {
    id: 9,
    question: 'The CIE earthing connection is identified by which conductor colour?',
    options: [
      'Red, to distinguish the fire-alarm protective earth from general installation earths.',
      'Brown, matching the line conductor used for the dedicated fire-alarm final circuit.',
      'Black, in line with the neutral conductor identification used elsewhere on the panel.',
      'Green-and-yellow for the protective earth (CPC) per BS 7671 across the installation.',
    ],
    correctAnswer: 3,
    explanation:
      'Two distinct conductors: green-and-yellow protective earth (CPC) per BS 7671, and functional earth (a separate EMC / signal-reference conductor) identified PINK or marked "FE" per BS 7671 Amendment 2 and IEC 60445:2021, adopted in BS 5839-1:2025. Functional earth was previously identified by cream; the 2025 change aligns with the IEC standard.',
  },
  {
    id: 10,
    question:
      'CIE installation — the single most important commissioning prerequisite that the install team must put in place is...?',
    options: [
      'A mechanically complete, labelled panel with documented address and zone mapping.',
      'A final clean of the panel enclosure, inside and out, carried out before handover.',
      'A fresh coat of paint applied to the panel so it matches the building’s decor.',
      'A stock of spare detectors left on top of the panel for the maintainer to use.',
    ],
    correctAnswer: 0,
    explanation:
      'Install delivers a mechanically complete, electrically connected, labelled panel: zones vs. physical areas, addresses vs. devices, mains identified, batteries dated, earthing terminated and tested, false-alarm notice fitted, mounting compliant, with documented mapping. Commissioning then verifies the system — it does not finish the install. A panel that is "mostly done" forces the commissioning engineer to complete installation work, eats programme time, and risks signing off an incomplete system.',
  },
];

const FireAlarmModule5Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Control panel installation | Fire Alarm Module 5.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 control panel installation: CIE siting for fire and rescue service access, mounting height (1.4-1.6 m centreline), mains supply termination per BS 7671, battery installation with date marking, earthing, the 2025 cyber security clause 43.4, and the false alarm notice near the CIE.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2"
            title="Control panel installation"
            description="The Control and Indicating Equipment is the single most important physical asset in the system. BS 5839-1:2025 codifies its siting, mounting, mains supply, batteries, earthing, cyber security and labelling — all of which the installer must get right before commissioning starts."
            tone="yellow"
          />

          <TLDR
            points={[
              'CIE siting per BS 5839-1:2025: accessible to the fire and rescue service on attendance — typically at the principal protected entrance, signed from outside, unobstructed, no keys needed.',
              'Mounting height: active display centreline 1.4 to 1.6 m so a standing operator can read every indicator and operate every control without aids.',
              'Mains supply: dedicated, hard-wired, lockable-off final circuit, labelled "FIRE ALARM — DO NOT SWITCH OFF", fed from before any switching device that could be operated by occupants in error. Consolidated in 2025 §19 (was split between 2017 clauses 25 and 29).',
              'Batteries: installed in CIE or in dedicated battery enclosure, dated per §16 (label or permanent marker), sized for the standby + alarm load over the required duration, secured against movement and short-circuit risk.',
              "Earthing per BS 7671: protective earth (CPC) green-and-yellow, terminated to CIE earth bar. Functional earth (FE) PINK or marked 'FE' per BS 7671 A2 / IEC 60445:2021 (was cream).",
              'Cyber security (NEW in 2025 — clause 43.4): physical lock-off of comms cabinet, anti-tamper plugs on patch leads at CIE network port, authentication of remote-connection requests, risk assessment before remote service.',
              'False-alarm notice (NEW in 2025 — Figure 1 in FIA Guide): fixed on or adjacent to the CIE, stating the active ARC connection and the ARC contact telephone number. Pre-test reminder for premises management.',
              'Install hand-over to commissioning: mechanically complete, electrically connected, labelled panel with documented address mapping. Commissioning verifies, not finishes, the install.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Site the CIE per BS 5839-1:2025 to support fire and rescue service access on attendance, with appropriate signage and unobstructed approach',
              'Mount the CIE at a height that supports operation by a standing operator under stress (1.4-1.6 m display centreline)',
              'Terminate the CIE mains supply per BS 7671 from a dedicated, labelled, lockable-off final circuit accessible only to authorised personnel',
              'Install and date-mark CIE batteries per §16, sized for the design standby and alarm load',
              'Earth the CIE per BS 7671 with protective earth (CPC) green-and-yellow and the new pink / FE-marked functional earth per IEC 60445:2021',
              'Apply the BS 5839-1:2025 clause 43.4 cyber security physical and authentication controls — lock-off, anti-tamper plugs, authenticated remote-connection requests',
              'Fit the 2025 false-alarm notice near the CIE and brief the Responsible Person on the pre-test ARC call procedure',
              'Hand the installed CIE over to commissioning with mechanical completion, electrical connection, labelled mapping and documented configuration',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>CIE siting and mounting</ContentEyebrow>

          <ConceptBlock
            title="Where the CIE goes — fire-service-first thinking"
            plainEnglish="The CIE is the building’s primary fire-information interface. The fire and rescue service arrives, enters the building, finds the CIE, reads zone information, decides where to deploy. Every second between FRS arrival and reading the panel is a second of delayed response. Siting decisions therefore start from the FRS’s arrival path: principal protected entrance, signed from outside, unobstructed approach, no keys needed."
            onSite="Walk the FRS arrival path with the design. From the front gate, to the building entrance, to the panel. Anything that obstructs that path — locked doors, stored items, unsigned junctions, unfit reception desks — becomes a siting issue."
          >
            <p>The siting checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Principal protected entrance.</strong> The entrance the FRS will use — the
                main approach, signed for fire access, with hard standing for the appliance. Not a
                rear or side door. Not a basement entrance unless that is the FRS-agreed access.
              </li>
              <li>
                <strong>Adjacent reception or lobby.</strong> Permanently staffed where possible.
                Reception staff are the operator under normal conditions; the CIE is in their line
                of sight or within a few paces.
              </li>
              <li>
                <strong>Signed from outside.</strong> External fire-access signage points to the CIE
                location. The FRS does not search; it reads the sign.
              </li>
              <li>
                <strong>Unobstructed approach.</strong> No stored items, no locked doors that
                require a key the FRS does not have, no chairs in front of the panel. This is a
                management duty under the RRO 2005; the contractor highlights and records, the
                Responsible Person maintains.
              </li>
              <li>
                <strong>Adequate lighting.</strong> Including emergency lighting per BS 5266-1 so
                the panel is readable on mains failure.
              </li>
              <li>
                <strong>Temperature and environment.</strong> Within the CIE’s rated operating
                range. Most CIEs are designed for indoor environments; outdoor or high-temperature
                environments need a rated enclosure or a different siting.
              </li>
              <li>
                <strong>Ambient noise.</strong> Quiet enough for the audible CIE buzzer to be heard.
                A panel in a noisy plant room is not heard until the operator passes by.
              </li>
              <li>
                <strong>Repeater panels.</strong> For very large premises, repeater panels at
                additional FRS-access entrances. The repeater shows the same zone information; the
                primary CIE is one of several read points.
              </li>
            </ul>
            <p>
              Where the FRS-access requirement and the operator-convenience requirement disagree,
              FRS-access wins. The operator is the secondary user; the FRS arriving in an emergency
              is the primary user.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 22 (Control and indicating equipment) — siting"
            clause={
              <>
                The CIE should be sited so that it is accessible to the fire and rescue service on
                arrival. The siting should support reading of zone indications and operation of
                primary controls without delay or obstruction.
              </>
            }
            meaning="Two phrases earn close reading. 'Accessible to the FRS on arrival' — the design starts from the FRS arrival path, not from operator convenience. 'Without delay or obstruction' — the management of the panel area is part of the siting decision; a compliant siting is undermined by stored items in front of the panel."
          />

          <ConceptBlock
            title="Mounting height and viewing angle"
            plainEnglish="The CIE is operated under stress, often by a person who is not a regular user. Mounting height supports rapid, error-free reading and operation. The active display centreline is in the 1.4 to 1.6 m range; the upper edge stays within reach (so reset / silence / evacuate buttons are not above shoulder height for an average operator); the lower edge stays above 700 mm so it is not obscured by floor furniture."
          >
            <p>The mounting checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Centreline 1.4-1.6 m.</strong> Customary range. Specific CIE platforms may
                publish their own preferred range; the manufacturer instruction takes priority where
                given.
              </li>
              <li>
                <strong>Wall material.</strong> Masonry, blockwork, stud-and-board. Fixings to
                manufacturer instruction; resin-anchored on lightweight blocks where pull-out
                strength is critical.
              </li>
              <li>
                <strong>Plumb and level.</strong> The CIE is read at an angle; tilted mounting
                creates parallax error.
              </li>
              <li>
                <strong>Clearance for door swing.</strong> CIE enclosure door opens fully without
                fouling adjacent walls or fixtures. Hinge side allows maintenance access.
              </li>
              <li>
                <strong>Conduit / cable entry.</strong> From the bottom (preferred — keeps moisture
                out) or from sides as the design directs. Top entry only where the manufacturer
                permits and the gland is rated for any condensation.
              </li>
              <li>
                <strong>Cable management inside the enclosure.</strong> Tidy, segregated by function
                (mains, battery, loop, network), labelled at termination.
              </li>
            </ul>
            <p>
              The CIE is in service for 15-25 years. Mounting decisions made now are lived with by
              every maintainer for the life of the panel. Get them right at install.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* CIE installation diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              CIE installation — mounting, lock-off, false-alarm notice
            </h4>
            <svg
              viewBox="0 0 820 520"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram of a wall-mounted control and indicating equipment showing the active display centreline at 1.5 metres above finished floor level, the false-alarm notice fixed adjacent to the panel, the locked comms cabinet behind the panel housing the network connection with anti-tamper plug, and the dedicated mains supply lock-off device labelled FIRE ALARM DO NOT SWITCH OFF."
            >
              <line
                x1="40"
                y1="490"
                x2="780"
                y2="490"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
                strokeDasharray="6,3"
              />
              <text x="410" y="505" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
                Finished floor level (FFL)
              </text>

              <rect
                x="40"
                y="40"
                width="740"
                height="450"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <text
                x="410"
                y="30"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                CIE installation — wall elevation
              </text>

              <line
                x1="120"
                y1="490"
                x2="120"
                y2="180"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1.4"
              />
              <line x1="115" y1="490" x2="125" y2="490" stroke="#FBBF24" strokeWidth="1.6" />
              <line x1="115" y1="180" x2="125" y2="180" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="100" y="340" textAnchor="end" fill="#FBBF24" fontSize="10" fontWeight="bold">
                1.50 m
              </text>
              <text x="100" y="354" textAnchor="end" fill="rgba(251,191,36,0.7)" fontSize="9">
                centreline
              </text>
              <text x="100" y="368" textAnchor="end" fill="rgba(251,191,36,0.7)" fontSize="9">
                of display
              </text>

              <rect
                x="200"
                y="120"
                width="220"
                height="280"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <rect
                x="210"
                y="130"
                width="200"
                height="60"
                rx="3"
                fill="rgba(34,211,238,0.15)"
                stroke="rgba(34,211,238,0.6)"
                strokeWidth="1"
              />
              <text
                x="310"
                y="155"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                ZONE 1 FIRE
              </text>
              <text x="310" y="172" textAnchor="middle" fill="rgba(34,211,238,0.7)" fontSize="9">
                Active LCD display
              </text>
              <text x="310" y="184" textAnchor="middle" fill="rgba(34,211,238,0.6)" fontSize="8">
                centreline at 1.50 m AFFL
              </text>
              <g>
                <rect
                  x="220"
                  y="210"
                  width="40"
                  height="22"
                  rx="3"
                  fill="rgba(34,211,238,0.1)"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                />
                <text x="240" y="225" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="8">
                  RESET
                </text>
                <rect
                  x="270"
                  y="210"
                  width="40"
                  height="22"
                  rx="3"
                  fill="rgba(34,211,238,0.1)"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                />
                <text x="290" y="225" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="8">
                  SILENCE
                </text>
                <rect
                  x="320"
                  y="210"
                  width="40"
                  height="22"
                  rx="3"
                  fill="rgba(34,211,238,0.1)"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                />
                <text x="340" y="225" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="8">
                  EVAC
                </text>
                <rect
                  x="370"
                  y="210"
                  width="40"
                  height="22"
                  rx="3"
                  fill="rgba(34,211,238,0.1)"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                />
                <text x="390" y="225" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="8">
                  TEST
                </text>
              </g>
              <rect
                x="210"
                y="260"
                width="200"
                height="60"
                rx="3"
                fill="rgba(168,85,247,0.1)"
                stroke="rgba(168,85,247,0.5)"
                strokeWidth="1"
              />
              <text
                x="310"
                y="280"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                Battery compartment
              </text>
              <text x="310" y="296" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="9">
                2 × 12 V VRLA, dated label
              </text>
              <text x="310" y="310" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="9">
                sized for 24h standby + 30 min alarm
              </text>
              <rect
                x="210"
                y="340"
                width="200"
                height="50"
                rx="3"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1"
              />
              <text
                x="310"
                y="358"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Loop terminations
              </text>
              <text x="310" y="374" textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize="9">
                L1+ L1- screen FE PE N L
              </text>
              <text x="220" y="395" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="bold">
                CIE
              </text>

              <rect
                x="450"
                y="130"
                width="180"
                height="100"
                rx="6"
                fill="#FACC15"
                stroke="#000"
                strokeWidth="1.5"
              />
              <text x="540" y="152" textAnchor="middle" fill="#000" fontSize="11" fontWeight="bold">
                FALSE ALARM NOTICE
              </text>
              <text x="540" y="170" textAnchor="middle" fill="#000" fontSize="9">
                This fire alarm has an active
              </text>
              <text x="540" y="182" textAnchor="middle" fill="#000" fontSize="9">
                connection to the fire and
              </text>
              <text x="540" y="194" textAnchor="middle" fill="#000" fontSize="9">
                rescue service via an ARC
              </text>
              <text x="540" y="214" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">
                ARC tel: 0345 XXX XXXX
              </text>
              <line
                x1="450"
                y1="232"
                x2="630"
                y2="232"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.8"
              />
              <text x="540" y="246" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                BS 5839-1:2025 §13 — Figure 1
              </text>

              <rect
                x="450"
                y="270"
                width="180"
                height="80"
                rx="6"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="540"
                y="290"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                MAINS LOCK-OFF
              </text>
              <text x="540" y="306" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="9">
                FIRE ALARM PANEL
              </text>
              <text x="540" y="318" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="9">
                DO NOT SWITCH OFF
              </text>
              <text x="540" y="334" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                authorised personnel only
              </text>

              <rect
                x="660"
                y="130"
                width="120"
                height="120"
                rx="6"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="720"
                y="150"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                Comms cabinet
              </text>
              <text x="720" y="166" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="9">
                LOCKED
              </text>
              <text x="720" y="180" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="9">
                cl. 43.4
              </text>
              <rect
                x="708"
                y="190"
                width="24"
                height="20"
                rx="2"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <path
                d="M712 190 L712 184 Q712 176 720 176 Q728 176 728 184 L728 190"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <circle cx="720" cy="200" r="2.5" fill="#A855F7" />
              <text x="720" y="226" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                RJ45 patch with
              </text>
              <text x="720" y="238" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                anti-tamper plug
              </text>

              <g>
                <rect
                  x="660"
                  y="270"
                  width="120"
                  height="60"
                  rx="6"
                  fill="rgba(34,197,94,0.06)"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                />
                <text
                  x="720"
                  y="290"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Earthing
                </text>
                <text x="720" y="306" textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize="9">
                  CPC: green/yellow
                </text>
                <text x="720" y="320" textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize="9">
                  FE: PINK / "FE"
                </text>
              </g>

              <rect
                x="40"
                y="420"
                width="740"
                height="48"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="440"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                FRS-ACCESS APPROACH — PRINCIPAL ENTRANCE → SIGNED → UNOBSTRUCTED → CIE
              </text>
              <text x="410" y="458" textAnchor="middle" fill="rgba(34,211,238,0.7)" fontSize="9.5">
                no keys needed for FRS arrival; reception staff visible from entrance
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Mains supply, batteries and earthing</ContentEyebrow>

          <ConceptBlock
            title="Mains supply termination — dedicated, labelled, locked"
            plainEnglish="The CIE mains supply is one of the safety-critical inputs of the system. A panel switched off accidentally because it shared a circuit with cleaning sockets is a panel that has stopped detecting fire. The supply is therefore dedicated (its own final circuit), hard-wired (no plug-and-socket), labelled (so the maintainer and the unconnected electrician know what it is), lockable-off (so maintenance can isolate safely under permit-to-work) and accessible only to authorised personnel (so occupants cannot operate it in error)."
          >
            <p>The mains termination checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Dedicated final circuit.</strong> Its own MCB or RCBO at the distribution
                board. Sized per the CIE manufacturer’s nameplate (typically 6 A or 10 A) and BS
                7671. RCD protection per BS 7671 unless the CIE manufacturer’s instructions and the
                design specifically dispense with it (rare).
              </li>
              <li>
                <strong>Cable.</strong> Fire-resisting cable to the same standard as the rest of the
                fire alarm system, terminated at the CIE’s mains-input gland and at the board.
              </li>
              <li>
                <strong>Labelling.</strong> Distribution board: "FIRE ALARM PANEL — DO NOT SWITCH
                OFF". CIE: cable identified at the gland with the originating circuit reference.
              </li>
              <li>
                <strong>Lockable-off.</strong> The MCB or isolator accepts a lock-off device
                (padlock, captive lock-off clip). The lock-off is fitted only when isolation is
                actually required (under permit-to-work for maintenance). It is not fitted as
                "always on" decoration.
              </li>
              <li>
                <strong>Accessible only to authorised personnel.</strong> The distribution board is
                in a riser, plant room or lockable cupboard. Occupants do not have routine access.
              </li>
              <li>
                <strong>Position in the supply hierarchy.</strong> Fed from before any local
                switching device that could be operated by an occupant in error. A switched-fused
                spur in a corridor, accessible to anyone, is not acceptable.
              </li>
              <li>
                <strong>Earthing.</strong> CPC sized per BS 7671 Table 54.7 or adiabatic; terminated
                to the CIE earth bar. Functional earth, where used, identified per IEC 60445:2021
                (PINK or "FE" marked).
              </li>
            </ul>
            <p>
              The 2025 revision consolidates the mains-supply guidance into a single clause (§19);
              the 2017 revision split it between clauses 25 and 29. The technical content is the
              same — the structure is clearer.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19 (Power supplies) — mains supply"
            clause={
              <>
                The fire detection and fire alarm system shall be supplied from a dedicated final
                circuit at the LV distribution board, with a clearly identified isolating device,
                accessible only to authorised persons, labelled in a manner that warns against
                accidental switching off.
              </>
            }
            meaning="Three load-bearing words. 'Dedicated' — its own circuit, no shared loads. 'Authorised persons' — occupants do not operate this device. 'Labelled' — visible warning that switching off disables the fire alarm. The 2025 revision pulls the previous split-clause guidance into a single clause; the maintainer and inspector now look in one place."
          />

          <ConceptBlock
            title="Batteries — sizing, installation, dating"
            plainEnglish="The standby battery system keeps the CIE running through mains failure. Sizing follows the load-and-duration calculation; installation follows the manufacturer’s mechanical and electrical specification; dating per BS 5839-1:2025 §16 makes the lifecycle visible to the maintainer."
          >
            <p>The battery checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Type.</strong> VRLA (valve-regulated lead-acid), sealed, designed for
                stand-by use. Specific manufacturer family per the CIE specification.
              </li>
              <li>
                <strong>Capacity (Ah).</strong> Sized to standby load × standby hours + alarm load ×
                alarm minutes, with margin for ageing (typically 25 % de-rating) and temperature
                (de-rating below 20 °C). Standby duration typically 24 h followed by 30 min alarm
                for Category L systems with ARC monitoring; longer for systems without ARC. Specific
                durations per the design.
              </li>
              <li>
                <strong>Mounting.</strong> Inside the CIE enclosure or in a dedicated battery
                enclosure. Secured against movement. Adequate ventilation per the manufacturer
                instruction. Terminals not exposed to short-circuit risk (covers fitted, no loose
                tools left on terminals).
              </li>
              <li>
                <strong>Cabling to CIE.</strong> Sized for the maximum charge / discharge current
                with margin. Polarity verified before energising — wrong polarity damages the CIE
                charging circuit.
              </li>
              <li>
                <strong>Date marking.</strong> Date of installation labelled or written in permanent
                marker on each battery. The 2025 revision §16 acknowledges the long-standing custom
                and makes it explicit.
              </li>
              <li>
                <strong>Identification on schedule.</strong> Battery manufacturer, model, capacity,
                installation date recorded in the install pack and the logbook (Annex H 2025; was
                Annex F 2017).
              </li>
            </ul>
            <p>
              Battery replacement runs to a schedule typically every 4 years
              (manufacturer-specific). The dated install label is the lifecycle anchor; without it
              the maintainer is guessing. Service visits (every 6 months per §22 / clause 43.2.1)
              check battery condition and replace as needed.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cyber security — the new clause 43.4</ContentEyebrow>

          <ConceptBlock
            title="Why cyber security is now in BS 5839-1"
            plainEnglish="Modern CIEs are connected. The CIE talks to remote service tools, to building management systems, to the ARC over IP, sometimes to cloud dashboards. A connected CIE is an attack surface. The 2025 revision introduces clause 43.4 (Remote services and cyber security) recognising the change and placing controls on the install."
            onSite="Treat the CIE network port as you would treat a critical-system network port: physical lock-off, anti-tamper plug, authentication, and risk assessment for any remote service. The detector loop is no longer the only attack surface."
          >
            <p>The clause 43.4 controls:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical lock-off of the comms cabinet.</strong> The cabinet that contains
                the CIE network connection is locked. An attacker cannot plug a rogue laptop into
                the network port without opening a locked cabinet — a discrete and detectable
                action.
              </li>
              <li>
                <strong>Anti-tamper plugs on patch leads.</strong> The RJ45 (or other connector)
                going into and out of the CIE network port has an anti-tamper sleeve that prevents
                covert removal and re-plugging. Tampering leaves visible evidence.
              </li>
              <li>
                <strong>Authentication of remote-connection requests.</strong> Before remote access
                is allowed, the CIE or gateway software authenticates the request — typically
                challenge-response, PIN, certificate or multi-factor depending on platform. The
                authentication is not bypassable from the network side.
              </li>
              <li>
                <strong>Risk assessment for remote service.</strong> Before any remote read /
                control / write operation, a risk assessment evaluates the potential impact on CIE
                operation. Remote service that compromises the CIE during execution is not
                acceptable.
              </li>
              <li>
                <strong>Post-service operability check.</strong> The responsible individual ensures
                the system is fully operational on completion of the remote service. A remote
                service that ends with the CIE in a non-operational state is an explicit failure of
                the clause.
              </li>
              <li>
                <strong>Documented in the logbook.</strong> Remote service events are recorded —
                what was done, by whom, when, with what authentication, and the post-service
                operability confirmation.
              </li>
            </ul>
            <p>
              For the install team: physically lock the cabinet, fit the anti-tamper plugs at
              first-fix, identify the network port and document its protection in the handover pack.
              Authentication and risk-assessment are commissioning / service activities; the install
              creates the physical conditions that allow them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.4 (Remote services and cyber security) — NEW"
            clause={
              <>
                Recommendations for preventing the unauthorised access to the system, access points,
                and network pathways by physical means such as locking the comms cabinet or fitting
                anti-tamper plugs to patch leads. A method of authentication of a request to accept
                a remote connection should be included in the CIE or gateway software before remote
                access is allowed.
              </>
            }
            meaning="The first cyber-security clause in BS 5839-1. Physical controls (locked cabinet, anti-tamper plugs) sit alongside software controls (authentication of remote connection). The install delivers the physical controls; the software platform delivers the authentication. Both are required."
          />

          <Scenario
            title="The unsecured network port"
            situation="A 2025 CIE is installed in a small office. Mains, batteries, earthing, mounting all compliant. The CIE has a single Ethernet port for ARC IP transmission and remote service. The installer terminates the patch lead into the comms-room patch panel, leaves the comms-room door unlocked because the office is small and we trust the staff, and does not fit anti-tamper plugs. Six months later a contractor visiting for unrelated work plugs a laptop into the spare network port for internet access, observes the fire alarm IP traffic, and an internal audit later flags the CIE as exposed."
            whatToDo="Apply clause 43.4 as the design intends. The comms cabinet is locked; only authorised persons hold the key. Anti-tamper plugs are fitted at the CIE network port and at the patch panel termination. The CIE’s software authentication is enabled and tested. The Responsible Person is briefed that the CIE network connection is part of the fire-alarm-system protection envelope and is managed accordingly. The logbook records the comms-cabinet lock-off and anti-tamper plug fitment as a system control."
            whyItMatters="A connected CIE is an attack surface. An unsecured network port is a vulnerability that bypasses every other control on the system — an attacker with network access can suppress alarms, disable zones or generate false alarms remotely. Clause 43.4 is not optional security theatre; it is treating the CIE as the connected device it now is."
          />

          <CommonMistake
            title="Skipping the anti-tamper plug because it is fiddly"
            whatHappens="The installer prefers a clean termination and skips the anti-tamper sleeve on the CIE Ethernet patch lead. At service the maintainer notices the missing sleeve and records it as non-compliant under clause 43.4. The Responsible Person is informed; remedial work is scheduled; the auditor flags the system as having had an unsecured network port from install. The contractor’s reputation takes a hit on a piece of work that should have taken five minutes."
            doInstead="Anti-tamper plugs are part of the CIE installation kit, not an optional accessory. Fit at first termination of the patch lead. Document the fitment in the install pack. The cost is minimal; the audit risk of skipping it is significant under the 2025 clause."
          />

          <CommonMistake
            title="Mains supply on a shared circuit"
            whatHappens="A small refurbishment install times-out at second-fix; rather than wait for the dedicated MCB to be installed in the distribution board, the contractor spurs the CIE off the corridor lighting circuit to get the panel energised for commissioning. The corridor lighting is later switched off at the wall switch by a cleaner; the CIE drops to battery; the battery flat-discharges over the weekend; the CIE is offline by Monday morning. The Responsible Person inherits a system that has had its first incident before handover."
            doInstead="The mains supply is dedicated and lockable per §19. No spurs off shared circuits, ever. If the dedicated MCB cannot be installed in time, the commissioning is held until it is. Energising the CIE from a non-compliant supply for convenience is a non-compliant install that creates incidents."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Labelling — the false-alarm notice</ContentEyebrow>

          <ConceptBlock
            title="The 2025 false-alarm notice"
            plainEnglish="A specific 2025 addition. With the FRS now operating call-challenging policies to reduce unnecessary attendance, BS 5839-1:2025 §13 recommends a false-alarm notice fixed near the CIE. The notice tells anyone about to operate or test the panel that the system has an active connection to the FRS via an ARC, and gives the ARC contact telephone number. Premises management calls the ARC to suspend despatch before any test; the ARC suspends; the test runs; the ARC despatch is restored. The notice is a procedural prompt that has driven a measurable reduction in unwanted FRS calls."
          >
            <p>The notice content (per FIA Guide Figure 1):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Title.</strong> "False alarm notice" or equivalent prominent header.
              </li>
              <li>
                <strong>Body.</strong> "This fire alarm has an active connection to the fire and
                rescue service" (or equivalent). The reader is left in no doubt that an unannounced
                test triggers an FRS despatch.
              </li>
              <li>
                <strong>ARC contact.</strong> ARC name (or simply "ARC") and the telephone number
                that premises management calls before testing. The number must be the live,
                in-service ARC number at the time of fitment.
              </li>
              <li>
                <strong>Position.</strong> Fixed on or adjacent to the CIE so it is the first thing
                a person looking at the panel reads. Not behind, not below floor furniture, not
                covered.
              </li>
              <li>
                <strong>Material and durability.</strong> Permanent label, weather-resistant if
                exposed to humid environments, legible for the life of the CIE.
              </li>
              <li>
                <strong>Update procedure.</strong> If the ARC contract changes, the label is
                updated. The logbook records the update.
              </li>
            </ul>
            <p>
              The notice is a small, cheap, procedurally significant intervention. The 2025 revision
              flags it because the FRS call-challenging environment has changed since 2017; informed
              premises management is the front-line defence against unwanted FRS attendance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Other CIE labels and identification"
            plainEnglish="The CIE area carries a small set of standard labels in addition to the false-alarm notice. Each has a specific purpose; together they tell the operator, maintainer and FRS what they need to know without searching."
          >
            <p>The label set:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CIE identification.</strong> Manufacturer, model, serial number,
                installation date (often on a separate plate or inside the door).
              </li>
              <li>
                <strong>Zone plan.</strong> A diagrammatic representation of the building with zone
                boundaries marked, fixed at or near the CIE. Required for any system with more than
                one zone per BS 5839-1:2025 §22.2.5; absence is now NOT an acceptable variation
                under §6 in multi-zone premises (especially sleeping risk).
              </li>
              <li>
                <strong>Mains lock-off label.</strong> "FIRE ALARM PANEL — DO NOT SWITCH OFF" at the
                distribution board.
              </li>
              <li>
                <strong>Battery date.</strong> Per §16. Permanent marker on each battery or attached
                label.
              </li>
              <li>
                <strong>Comms cabinet lock-off identification.</strong> Per clause 43.4. Locked,
                identified, key custody recorded.
              </li>
              <li>
                <strong>FRS access signage.</strong> External and internal signage pointing to the
                CIE location for FRS arrival.
              </li>
              <li>
                <strong>False-alarm notice.</strong> Per §13. Adjacent to CIE, visible at first
                glance.
              </li>
            </ul>
            <p>
              Labels are commonly produced after install and applied as a snag list item — leaving
              gaps for inspection. Better practice: produce the label set as part of the install
              pack, apply at completion, photograph and record. The labels are part of the system,
              not a tidy-up afterthought.
            </p>
          </ConceptBlock>

          <Scenario
            title="The unannounced test that despatched two appliances"
            situation="A new building manager runs the weekly fire alarm test on a 2025-spec system without calling the ARC. The system, correctly configured, transmits the alarm to the ARC. The ARC despatches per the agreed protocol (it has had no test-suspension call). Two FRS appliances arrive eight minutes after the test starts. The FRS records an unwanted attendance; the building gets a yellow flag against its risk profile; the relationship with the local FRS deteriorates. The building manager later says they did not know there was an active ARC connection."
            whatToDo="The 2025 false-alarm notice fixed near the CIE addresses exactly this. New building manager looks at the panel before testing; reads the notice; calls the ARC; suspends; tests; restores. No unwanted attendance. The contractor at install fits the notice with the correct ARC number and briefs the Responsible Person on its purpose. The Responsible Person briefs the building manager on the procedure."
            whyItMatters="Unwanted FRS attendances are a regulatory and operational issue. The 2025 revision specifically addresses the human factor — the person who does not know there is an active ARC connection — with a visible, procedural label. This is not paperwork; it is a control."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'CIE siting is FRS-first: principal protected entrance, signed from outside, unobstructed approach, no keys for FRS arrival.',
              'Mounting: active display centreline 1.4-1.6 m AFFL; controls within reach; clearance for door swing; cable entry from below preferred.',
              'Mains supply (§19): dedicated, hard-wired, lockable-off, labelled "FIRE ALARM — DO NOT SWITCH OFF", accessible only to authorised persons. 2025 consolidates the 2017 split-clause guidance.',
              'Batteries: sized for standby + alarm load × duration with ageing/temperature de-rating; secured; date-marked on each battery per §16.',
              "Earthing: protective earth (CPC) green-and-yellow per BS 7671; functional earth (FE) PINK or 'FE' marked per BS 7671 A2 / IEC 60445:2021 (was cream).",
              'Cyber security clause 43.4 (NEW 2025): physical lock-off of comms cabinet, anti-tamper plugs on patch leads, authentication of remote-connection requests, risk assessment before remote service, post-service operability check.',
              'False-alarm notice (NEW 2025 §13 / FIA Figure 1): fixed near CIE, states active ARC connection, gives ARC telephone number, drives the pre-test ARC call procedure.',
              'Zone plan at CIE: required for multi-zone premises per §22.2.5; absence is NOT an acceptable variation under §6 in sleeping-risk multi-zone premises.',
              'Hand-over to commissioning: mechanically complete, electrically connected, labelled, with documented address mapping. Commissioning verifies the install — it does not finish it.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Where exactly should the CIE be mounted in a small office building?',
                answer:
                  'In or immediately adjacent to the reception or principal protected entrance, at a display centreline of 1.4-1.6 m AFFL, with external fire-access signage pointing to the CIE location. The fire and rescue service should be able to enter the building and read the CIE within seconds. A back office, a basement plant room or a locked riser without keys for the FRS would all be non-compliant siting.',
              },
              {
                question: 'Can the CIE be plugged in via a 13A socket?',
                answer:
                  'No. BS 5839-1:2025 §19 requires a dedicated final circuit, hard-wired, with a clearly identified isolating device accessible only to authorised persons. Plug-and-socket is non-compliant — anyone could unplug the panel. The mains supply is hard-wired from a labelled, lockable-off MCB / RCBO at the distribution board.',
              },
              {
                question:
                  'Has clause 43.4 (cyber security) introduced new mandatory technical requirements?',
                answer:
                  'BS 5839-1 is a code of practice, so its recommendations are persuasive rather than mandatory. Clause 43.4 in 2025 sets the expected practice for connected CIEs: physical lock-off, anti-tamper plugs, authentication of remote connection, risk assessment for remote service. A system without these will be flagged at audit and may attract a non-compliant finding from a third-party scheme (BAFE, FIA). For new 2025 installs, treat the clause as effectively mandatory.',
              },
              {
                question:
                  'My CIE platform does not have an authentication mechanism for remote connection. What do I do?',
                answer:
                  'Either upgrade to a platform that does, or document the gap and apply compensating controls: physical lock-off, no remote service permitted (only on-site service), and the risk assessment records the limitation. The 2025 revision expects authentication; absence is a justified-variation matter under §6 if it cannot be remedied.',
              },
              {
                question: 'How is functional earth different from protective earth?',
                answer:
                  'Protective earth (CPC) is the safety conductor required by BS 7671 for fault protection — green-and-yellow, sized per Table 54.7 or adiabatic. Functional earth (FE) is a separate conductor for EMC / signal-reference purposes — does NOT provide fault protection. Per BS 7671 Amendment 2 (2022) and IEC 60445:2021, functional earth is identified PINK or marked "FE"; previously identified by cream. BS 5839-1:2025 §16 reflects the change.',
              },
              {
                question:
                  'Do I need to date each battery individually, or just the install date for the system?',
                answer:
                  'Each battery individually. The §16 acknowledgement is of the long-standing custom of marking batteries with the installation date — typically permanent marker on each cell. The maintainer reads the date at every service visit; without it, replacement decisions are guesswork. A system-level install date does not survive battery replacement events; per-battery dating does.',
              },
              {
                question: 'How big should the false-alarm notice be?',
                answer:
                  'Big enough to be read at first glance from the operator position in front of the CIE. The FIA Guide Figure 1 example is approximately A5 size; that scale works for most installations. Smaller is acceptable if the panel is in a confined space; larger is acceptable if visibility from a standing position is poor. The test is whether a person about to operate the panel sees and reads the notice without effort.',
              },
              {
                question:
                  'What is the difference between the CIE installation and the CIE commissioning?',
                answer:
                  'Installation makes the panel mechanically complete, electrically connected and ready for power-up: mounting, mains termination, battery installation, earthing, network connection, labelling, address mapping documentation. Commissioning verifies the system: programming the cause-and-effect, testing every device and interface, sound and visual surveys, battery-autonomy test, ARC interface verification. Installation delivers a panel ready to be commissioned; commissioning delivers a system ready to be handed over. The two are sequential; commissioning cannot start on an incomplete install.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Control panel installation — Module 5.2" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-5/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Device installation
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

export default FireAlarmModule5Section2;
