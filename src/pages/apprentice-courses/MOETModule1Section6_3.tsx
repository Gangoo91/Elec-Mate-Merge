import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Evacuation Procedures - MOET Module 1 Section 6.3";
const DESCRIPTION = "Comprehensive guide to evacuation procedures for electrical maintenance technicians: emergency plans, evacuation types, alarm systems, assembly points, PEEPs, fire warden responsibilities, escape route signage to BS 5499, and emergency lighting testing.";

const quickCheckQuestions = [
  {
    id: "evacuation-types",
    question: "What is the difference between a simultaneous evacuation and a phased evacuation?",
    options: [
      "Simultaneous is for small buildings; phased is for buildings with fire suppression",
      "In simultaneous evacuation, everyone leaves at once; in phased evacuation, the fire floor evacuates first, then adjacent floors",
      "Simultaneous uses voice alarms; phased uses bells only",
      "There is no difference — they are the same procedure"
    ],
    correctIndex: 1,
    explanation: "In a simultaneous evacuation, the alarm sounds throughout the building and everyone evacuates at the same time. In a phased evacuation (used in tall or complex buildings), the fire floor evacuates first, followed by the floors immediately above and below, then the rest of the building in sequence. This prevents overcrowding of stairways."
  },
  {
    id: "peep-purpose",
    question: "What is a PEEP and who needs one?",
    options: [
      "A public emergency exit plan — every building must display one",
      "A personal emergency evacuation plan — for any person who may need assistance to evacuate",
      "A permanent electrical equipment protocol — for maintaining fire alarms",
      "A pre-evacuation emergency procedure — for fire marshals only"
    ],
    correctIndex: 1,
    explanation: "A PEEP (Personal Emergency Evacuation Plan) is an individual plan for any person who may need assistance to evacuate the building in an emergency. This includes persons with mobility impairments, visual or hearing impairments, temporary injuries, pregnant women, and anyone who cannot use stairs unaided. PEEPs must be agreed in advance and communicated to fire wardens."
  },
  {
    id: "fire-warden-duty",
    question: "During an evacuation, what is the fire warden's primary responsibility?",
    options: [
      "To investigate the cause of the alarm and reset the panel",
      "To sweep their designated area, ensure it is clear, and report to the assembly point",
      "To fight the fire using the nearest extinguisher",
      "To lock all external doors to prevent unauthorised entry"
    ],
    correctIndex: 1,
    explanation: "The fire warden's primary duty during an evacuation is to sweep their designated area (checking all rooms, toilets and storage areas), ensure everyone has left, assist anyone who needs help, close doors behind them, and report to the chief fire warden at the assembly point confirming their area is clear or identifying anyone unaccounted for."
  },
  {
    id: "emergency-lighting",
    question: "How often should emergency lighting be functionally tested under BS 5266-1?",
    options: [
      "Every 6 months for a brief flick test",
      "Monthly for a brief functional test and annually for a full rated duration test",
      "Annually only, during the fire alarm service",
      "Weekly, at the same time as the fire alarm test"
    ],
    correctIndex: 1,
    explanation: "BS 5266-1 requires emergency lighting to be functionally tested monthly (a brief test to confirm each luminaire operates on battery) and annually for its full rated duration (typically 3 hours). The monthly test should last long enough to confirm illumination (a few seconds to a minute). Results must be recorded in the emergency lighting log book."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A simultaneous evacuation is best suited for:",
    options: [
      "Large multi-storey buildings such as hospitals",
      "Small to medium-sized single occupancy buildings",
      "Shopping centres with thousands of occupants",
      "High-rise residential buildings over 18 metres"
    ],
    correctAnswer: 1,
    explanation: "Simultaneous evacuation (everyone evacuates at once when the alarm sounds) is suitable for small to medium-sized, single occupancy buildings where all occupants can evacuate quickly via the available exits without overcrowding stairways. Larger or more complex buildings typically require phased or progressive horizontal evacuation."
  },
  {
    id: 2,
    question: "In a phased evacuation, which floor evacuates first?",
    options: [
      "The ground floor, then upwards",
      "The top floor, then downwards",
      "The fire floor, then the floors immediately above and below",
      "All floors evacuate simultaneously but in different directions"
    ],
    correctAnswer: 2,
    explanation: "In phased evacuation, the floor where the fire is located evacuates first, followed by the floors immediately above and below. This is because fire and smoke travel upwards, making the floors above most at risk. The remaining floors then evacuate in sequence, reducing the risk of stairway congestion."
  },
  {
    id: 3,
    question: "A two-stage fire alarm system uses:",
    options: [
      "Two separate alarm panels for redundancy",
      "An 'alert' signal (intermittent) for staff followed by an 'evacuate' signal (continuous) for all occupants",
      "Two different volume levels depending on the time of day",
      "Two separate sounder circuits for different parts of the building"
    ],
    correctAnswer: 1,
    explanation: "A two-stage alarm provides an initial 'alert' signal (often intermittent or a different tone) to warn trained staff to investigate, followed by a full 'evacuate' signal (continuous) if the fire is confirmed. This reduces unnecessary full evacuations caused by false alarms, while ensuring rapid evacuation when a real fire is confirmed."
  },
  {
    id: 4,
    question: "Assembly points should be located:",
    options: [
      "As close to the building as possible for convenience",
      "At a safe distance from the building, away from access routes for emergency vehicles",
      "Inside the building in the largest room",
      "In the car park directly in front of the main entrance"
    ],
    correctAnswer: 1,
    explanation: "Assembly points must be at a safe distance from the building (typically at least 20 metres), clear of access routes that emergency vehicles will need, sheltered if possible, and large enough to accommodate all occupants. They should be clearly signed and well-known to all building occupants."
  },
  {
    id: 5,
    question: "A fire warden should NOT:",
    options: [
      "Check toilets and storage rooms during the sweep",
      "Assist persons with mobility difficulties",
      "Re-enter the building to search for missing persons after reporting to the assembly point",
      "Close doors behind them as they leave their area"
    ],
    correctAnswer: 2,
    explanation: "A fire warden must never re-enter the building once they have completed their sweep and reported to the assembly point. If someone is unaccounted for, this information is passed to the fire brigade who have the training, equipment and PPE to carry out search and rescue safely. Re-entering a burning building puts the warden at extreme risk."
  },
  {
    id: 6,
    question: "Personal Emergency Evacuation Plans (PEEPs) are required for:",
    options: [
      "All employees, regardless of ability",
      "Fire wardens only",
      "Any person who may need assistance to evacuate the building",
      "Visitors only, as employees know the escape routes"
    ],
    correctAnswer: 2,
    explanation: "PEEPs are required for any person who may have difficulty evacuating without assistance. This includes permanent disabilities, temporary conditions (broken leg, pregnancy), sensory impairments, and cognitive conditions. Each PEEP is tailored to the individual and must be reviewed regularly and whenever circumstances change."
  },
  {
    id: 7,
    question: "Under BS 5499 / BS ISO 7010, emergency exit signs must be:",
    options: [
      "Red with white text",
      "Green with white pictogram (running man and arrow)",
      "Yellow with black text",
      "Blue with white text"
    ],
    correctAnswer: 1,
    explanation: "Emergency exit signs must display a white running man pictogram and directional arrow on a green background, in accordance with BS ISO 7010 and BS 5499. Signs may be internally illuminated (maintained or non-maintained) or photoluminescent. They must be visible from all points on the escape route."
  },
  {
    id: 8,
    question: "Emergency lighting must provide illumination on escape routes for a minimum of:",
    options: [
      "30 minutes",
      "1 hour",
      "3 hours (in most cases)",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires emergency lighting to provide a minimum duration of 3 hours in most premises (1 hour is permitted in some premises where immediate evacuation is possible and the building will not be reoccupied until the system is fully recharged). The 3-hour duration allows for evacuation, fire brigade operations and safe re-entry."
  },
  {
    id: 9,
    question: "How often should fire evacuation drills be carried out?",
    options: [
      "Once every 3 years",
      "At least once a year, with more frequent drills recommended for high-risk premises",
      "Every 5 years as part of the fire risk assessment review",
      "Only when new employees start"
    ],
    correctAnswer: 1,
    explanation: "Fire evacuation drills should be carried out at least once a year for most premises, with more frequent drills (every 6 months) recommended for high-risk premises, premises with sleeping accommodation, and premises with frequent staff turnover. Drills should be unannounced (after the first one), timed, and reviewed to identify improvements."
  },
  {
    id: 10,
    question: "Invacuation (staying put) is most appropriate when:",
    options: [
      "The fire is in the building and all exits are blocked",
      "External hazards such as chemical spills or terrorist incidents make leaving the building more dangerous",
      "It is raining outside and the assembly point is unsheltered",
      "The fire alarm is faulty and giving false alarms"
    ],
    correctAnswer: 1,
    explanation: "Invacuation (also called lockdown or shelter-in-place) is used when external hazards make it safer to remain inside the building. Examples include chemical or toxic releases, severe weather events, bomb threats in the surrounding area, or security incidents. Occupants move to a designated safe area within the building."
  },
  {
    id: 11,
    question: "Visitor management during an evacuation requires:",
    options: [
      "Visitors to find their own way out as they are adults",
      "A visitor sign-in system, escorted evacuation, and checking the visitor log at the assembly point",
      "Visitors to wait at reception until the fire brigade arrives",
      "No special arrangements — visitors follow the same procedure as employees"
    ],
    correctAnswer: 1,
    explanation: "Visitors must be signed in on arrival so they can be accounted for during an evacuation. They should be escorted by their host or directed by fire wardens. At the assembly point, the visitor log is checked to ensure all visitors are accounted for. Visitors should receive a brief fire safety induction on arrival."
  },
  {
    id: 12,
    question: "When working as a contractor in an unfamiliar building, you should:",
    options: [
      "Assume the escape routes are the same as the last building you worked in",
      "Familiarise yourself with escape routes, assembly points, alarm sounds and fire procedures during your site induction",
      "Only worry about fire safety if you are doing hot work",
      "Follow other people if the alarm sounds — they will know the way out"
    ],
    correctAnswer: 1,
    explanation: "Every time you attend a new site, you must familiarise yourself with the escape routes, assembly point location, alarm sounds (distinguish between alert and evacuate signals), fire extinguisher locations, and the site-specific emergency procedures. This should be covered in your site induction. Never assume — every building is different."
  }
];

const faqs = [
  {
    question: "What should I do if the fire alarm sounds while I am working on a live or isolated circuit?",
    answer: "If the alarm sounds while you are working on a circuit, make the area safe as quickly as possible. If working on a live circuit (under a permit), immediately stop work, secure any exposed conductors if you can do so in a few seconds, and evacuate. If you have isolated a circuit and applied locks, leave the locks in place — the isolation must remain secure. Do not delay your evacuation to carry out lengthy procedures. Your life takes priority over the installation."
  },
  {
    question: "How do I know if it is a real fire or a false alarm?",
    answer: "You should treat every alarm activation as real until confirmed otherwise. In buildings with two-stage alarms, the initial alert tone indicates staff should investigate — but if you are not a fire warden, you should prepare to evacuate. If the continuous evacuate signal sounds, leave immediately. Only the fire brigade or a senior manager can declare a false alarm. Never ignore an alarm or assume it is a drill unless you have been officially notified in advance."
  },
  {
    question: "Can I use the lift during an evacuation?",
    answer: "No — lifts must not be used during a fire evacuation unless they are specifically designated as evacuation lifts (compliant with BS EN 81-72). Standard lifts may stop at the fire floor, fill with smoke, lose power, or the shaft may act as a chimney. The only exceptions are designated evacuation lifts used as part of a PEEP for persons unable to use stairs, under the control of trained personnel."
  },
  {
    question: "What is a refuge area and how is it used?",
    answer: "A refuge area is a designated space (usually on a stairway landing or in a protected lobby) where a person who cannot use stairs can wait safely for assistance during an evacuation. Refuges must have fire resistance, a communication system (intercom or telephone) to alert the fire brigade or building management, and sufficient space. They are a key component of PEEPs for persons with mobility impairments."
  },
  {
    question: "How often should emergency lighting be tested?",
    answer: "Under BS 5266-1, emergency lighting should receive a brief functional test monthly (confirm each luminaire illuminates on battery for a few seconds) and a full duration test annually (typically 3 hours of battery operation). Tests should be carried out by a competent person and recorded in the emergency lighting log book. Additionally, a daily visual check is recommended to ensure luminaires are undamaged and indicator LEDs are showing normal status."
  }
];

const MOETModule1Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6">
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
            <span>Module 1.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Evacuation Procedures
          </h1>
          <p className="text-white/80">
            Emergency plans, evacuation types, fire warden duties and escape route management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Types:</strong> Simultaneous, phased, progressive horizontal, invacuation</li>
              <li className="pl-1"><strong>Alarms:</strong> Single-stage (instant evacuate) or two-stage (alert then evacuate)</li>
              <li className="pl-1"><strong>PEEPs:</strong> Individual plans for persons needing evacuation assistance</li>
              <li className="pl-1"><strong>Drills:</strong> At least annually, timed, recorded and reviewed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Contractor awareness:</strong> Check escape routes at every new site</li>
              <li className="pl-1"><strong>Emergency lighting:</strong> Monthly functional, annual duration test (BS 5266)</li>
              <li className="pl-1"><strong>Exit signage:</strong> Green running man to BS ISO 7010 / BS 5499</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to emergency procedures KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the different types of evacuation: simultaneous, phased, progressive and invacuation",
              "Describe the operation of single-stage and two-stage fire alarm systems",
              "Identify the responsibilities of fire wardens during an evacuation",
              "Explain the purpose and content of a Personal Emergency Evacuation Plan (PEEP)",
              "State the requirements for emergency lighting testing under BS 5266-1",
              "Apply contractor site induction requirements for fire safety procedures"
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

        {/* Section 01: Emergency Plans and Evacuation Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Plans and Evacuation Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every workplace must have an emergency plan that sets out the procedures for dealing with fire and other
              emergencies. The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to establish
              and implement appropriate emergency procedures, including evacuation plans suited to the building, its
              occupancy and the activities carried out within it. As a maintenance electrician working across multiple
              sites, you must understand all evacuation types and adapt to each building's specific procedures.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Simultaneous Evacuation</h3>
                <p className="text-sm text-white mb-2">
                  The simplest and most common evacuation strategy. When the alarm sounds, everyone in the building
                  evacuates immediately to the assembly point. This is suitable for:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Small to medium-sized buildings</li>
                  <li className="pl-1">Single-storey premises</li>
                  <li className="pl-1">Buildings with simple layouts and adequate exit capacity</li>
                  <li className="pl-1">Premises where all occupants can evacuate within a few minutes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Phased Evacuation</h3>
                <p className="text-sm text-white mb-2">
                  Used in tall buildings and large complex premises where simultaneous evacuation would cause dangerous
                  overcrowding of stairways. The evacuation is carried out in stages:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Phase 1:</strong> The fire floor evacuates immediately on hearing the continuous alarm</li>
                  <li className="pl-1"><strong>Phase 2:</strong> The floors immediately above and below evacuate next</li>
                  <li className="pl-1"><strong>Phase 3:</strong> Remaining floors evacuate in sequence, directed by the fire control team</li>
                  <li className="pl-1">Requires a two-stage alarm system and trained fire wardens on every floor</li>
                  <li className="pl-1">Building must have adequate compartmentation to allow phased evacuation safely</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Progressive Horizontal Evacuation</h3>
                <p className="text-sm text-white mb-2">
                  Used in hospitals, care homes and similar premises where occupants cannot easily use stairs. People
                  are moved horizontally through fire compartment walls to an adjacent safe compartment:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Occupants move to the adjacent fire compartment on the same floor</li>
                  <li className="pl-1">Each compartment provides protection for at least 30 minutes (typically 60)</li>
                  <li className="pl-1">Vertical evacuation (via stairs or lifts) only if the fire spreads beyond the compartment</li>
                  <li className="pl-1">Critical that fire compartment walls are fully intact — maintenance electricians must fire-stop all penetrations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Invacuation (Stay Put / Shelter in Place)</h3>
                <p className="text-sm text-white mb-2">
                  Invacuation means keeping people inside the building rather than evacuating. This is used when
                  external hazards make leaving the building more dangerous than staying inside:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Chemical or toxic substance release outside the building</li>
                  <li className="pl-1">Security threats (terrorism, violent incidents) in the surrounding area</li>
                  <li className="pl-1">Severe weather events (storms, flooding) where leaving would be hazardous</li>
                  <li className="pl-1">Occupants move to a designated safe area within the building</li>
                  <li className="pl-1">Windows and ventilation sealed to prevent external contaminants entering</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a contractor working in different buildings, always check which
              evacuation type is in use during your site induction. Do not assume it is a simultaneous evacuation —
              many large buildings use phased or progressive strategies that require you to listen for specific
              alarm tones and follow different procedures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Alarm Systems and Signalling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Alarm Systems and Signalling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fire alarm system is the primary means of alerting building occupants to a fire. Different buildings
              use different types of alarm system depending on their size, complexity and evacuation strategy. As a
              maintenance electrician, you will install, test and maintain these systems — but you also need to
              understand them as a building occupant for your own safety.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
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
                      <td className="border border-white/10 px-3 py-2">Continuous alarm sounds immediately throughout the building; all occupants evacuate at once</td>
                      <td className="border border-white/10 px-3 py-2">Small to medium buildings; simultaneous evacuation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Two-stage</td>
                      <td className="border border-white/10 px-3 py-2">Alert signal (intermittent/pulsing) for staff to investigate; evacuate signal (continuous) if confirmed</td>
                      <td className="border border-white/10 px-3 py-2">Medium to large buildings with trained fire wardens</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Voice alarm</td>
                      <td className="border border-white/10 px-3 py-2">Recorded or live voice messages give specific instructions (which floors to evacuate, which exits to use)</td>
                      <td className="border border-white/10 px-3 py-2">Large complex buildings, shopping centres, transport hubs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Staff alarm</td>
                      <td className="border border-white/10 px-3 py-2">Discreet notification (pager, coded announcement) alerts staff without alarming the public</td>
                      <td className="border border-white/10 px-3 py-2">Retail, hotels, entertainment venues</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Stage Alarm Details</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Alert stage:</strong> Intermittent or pulsing tone lasting typically 2-5 minutes</li>
                  <li className="pl-1">Fire wardens investigate the source of the alarm</li>
                  <li className="pl-1">If the fire is confirmed, the warden breaks a second call point or the panel escalates automatically</li>
                  <li className="pl-1"><strong>Evacuate stage:</strong> Continuous alarm signals full evacuation</li>
                  <li className="pl-1">If the alert is not investigated within the set time, the system automatically escalates to full evacuation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Voice Alarm Systems (BS 5839-8)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-recorded messages for different scenarios (fire on specific floor, evacuate via specific exit)</li>
                  <li className="pl-1">Live microphone facility for the fire control team to give real-time instructions</li>
                  <li className="pl-1">Zoned messaging — different messages to different areas of the building</li>
                  <li className="pl-1">Proven to be more effective than bells/sounders at achieving evacuation compliance</li>
                  <li className="pl-1">Must be intelligible — background noise levels and acoustic design are critical</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Alarm Testing</p>
              <p className="text-sm text-white">
                BS 5839-1 requires the fire alarm to be tested weekly by activating a different manual call point each
                week (rotating around the building so every MCP is tested over a period of time). The test confirms
                that the sounder or voice alarm operates throughout the building. The test should be carried out at the
                same time each week so building occupants recognise it. All tests must be recorded in the fire alarm
                log book.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> As a maintenance electrician, you may be the person carrying out weekly fire
              alarm tests. Use a call point key (not the break glass element) to activate the test, confirm all
              sounders operate, and record the test. Always notify building occupants before testing so they do not
              evacuate unnecessarily.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: PEEPs, Fire Wardens and Visitor Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            PEEPs, Fire Wardens and Visitor Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective evacuation depends on trained personnel, individual support for vulnerable persons, and
              robust management of visitors and contractors. The Equality Act 2010 requires reasonable adjustments
              for disabled persons, including in emergency evacuation planning. As a contractor, you are both
              someone who needs to be managed (visitor/contractor on site) and potentially someone who assists
              others during an emergency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Personal Emergency Evacuation Plans (PEEPs)</h3>
              <p className="text-sm text-white mb-2">
                A PEEP is an individual evacuation plan for any person who may need assistance to evacuate safely.
                PEEPs should be:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Person-specific:</strong> Tailored to the individual's needs, abilities and the building layout</li>
                <li className="pl-1"><strong>Agreed with the individual:</strong> Discussed, not imposed — the person knows their own needs best</li>
                <li className="pl-1"><strong>Documented:</strong> Written plan kept on file and copies given to all relevant persons</li>
                <li className="pl-1"><strong>Communicated:</strong> Fire wardens, colleagues and reception staff must know who has a PEEP and what it involves</li>
                <li className="pl-1"><strong>Practised:</strong> Included in evacuation drills to test effectiveness</li>
                <li className="pl-1"><strong>Reviewed:</strong> Updated whenever the person's circumstances change, the building layout changes, or after a drill</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Who May Need a PEEP?</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mobility impairment:</strong> Wheelchair users, persons with walking difficulties, persons using crutches or walking frames</li>
                <li className="pl-1"><strong>Visual impairment:</strong> Persons who cannot see exit signs or may be disoriented by smoke</li>
                <li className="pl-1"><strong>Hearing impairment:</strong> Persons who may not hear the fire alarm (vibrating pagers or flashing beacons may be needed)</li>
                <li className="pl-1"><strong>Temporary conditions:</strong> Broken leg, recent surgery, pregnancy (particularly late stage)</li>
                <li className="pl-1"><strong>Cognitive conditions:</strong> Persons who may not understand or respond appropriately to alarms</li>
                <li className="pl-1"><strong>Visitors:</strong> A generic evacuation assistance plan (GEAP) should be in place for visitors with disabilities</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Fire Warden Responsibilities</h3>
              <p className="text-sm text-white mb-3">
                Fire wardens (also called fire marshals) are trained employees who play a critical role during
                evacuation. Each fire warden is assigned a specific zone or floor. Their duties during an
                evacuation include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Investigate:</strong> In two-stage systems, investigate the alarm source during the alert phase</li>
                <li className="pl-1"><strong>Sweep:</strong> Systematically check every room, toilet, storage area and office in their zone</li>
                <li className="pl-1"><strong>Direct:</strong> Guide occupants to the nearest safe exit route and assembly point</li>
                <li className="pl-1"><strong>Assist:</strong> Help anyone with a PEEP to evacuate according to their plan</li>
                <li className="pl-1"><strong>Close:</strong> Close all doors behind them as they leave (doors are fire barriers when closed)</li>
                <li className="pl-1"><strong>Report:</strong> Report to the chief fire warden at the assembly point, confirming their zone is clear or identifying anyone missing</li>
                <li className="pl-1"><strong>Do NOT re-enter:</strong> Never go back into the building once the sweep is complete</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visitor Management</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">All visitors must sign in on arrival and sign out on departure</li>
                  <li className="pl-1">Visitors should receive a brief fire safety induction (escape routes, assembly point, alarm sound)</li>
                  <li className="pl-1">Visitors should be escorted or given clear directions to exit routes</li>
                  <li className="pl-1">The visitor log must be taken to the assembly point for roll call</li>
                  <li className="pl-1">Contractor sign-in boards should be separate from visitor logs for clarity</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Disabled Persons Evacuation</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Refuge areas: protected spaces on stairway landings with communication points</li>
                  <li className="pl-1">Evacuation chairs: lightweight chairs for carrying persons down stairs</li>
                  <li className="pl-1">Evacuation lifts: BS EN 81-72 compliant lifts under fire service control</li>
                  <li className="pl-1">Buddy systems: trained colleagues designated to assist specific individuals</li>
                  <li className="pl-1">Visual/vibrating alarms for hearing-impaired persons</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Contractor note:</strong> As a maintenance electrician visiting different sites, you are effectively
              a visitor. Ensure you sign in, receive the fire safety induction, know the escape routes and assembly
              point, and sign out when you leave. If you have any condition that might affect your evacuation, inform
              your host so arrangements can be made.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Training, Drills and Escape Route Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Training, Drills and Escape Route Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire evacuation procedures are only effective if everyone knows what to do. Regular training, realistic
              drills and diligent maintenance of escape routes are essential components of fire safety management. As
              a maintenance electrician, you have a dual role — ensuring your own fire safety awareness and maintaining
              the systems (emergency lighting, signage, fire doors) that support safe evacuation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Evacuation Drills</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency:</strong> At least annually for most premises; every 6 months for higher-risk premises (sleeping accommodation, hazardous processes, high staff turnover)</li>
                <li className="pl-1"><strong>Unannounced:</strong> After the initial drill (which may be announced), subsequent drills should be unannounced to test genuine response</li>
                <li className="pl-1"><strong>Timing:</strong> Vary the time of day, day of the week, and simulate different scenarios (blocked exit, night shift, during maintenance work)</li>
                <li className="pl-1"><strong>Recording:</strong> Document the date, time, alarm activation time, evacuation time, number of occupants, any issues identified, and corrective actions</li>
                <li className="pl-1"><strong>Review:</strong> After each drill, hold a debrief with fire wardens. Identify what worked well and what needs improvement</li>
                <li className="pl-1"><strong>Target times:</strong> Typical target evacuation times are 2.5 minutes for single-storey buildings, 5 minutes for multi-storey, though this depends on building size and complexity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Maintaining Escape Routes</h3>
              <p className="text-sm text-white mb-3">
                Escape routes must be kept clear and usable at all times. This is a legal requirement under the
                RRFSO 2005. Common problems include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Obstructions:</strong> Materials stored in corridors, stairways or in front of exits. Maintenance equipment, cable drums and toolboxes are common culprits — ensure your work does not block escape routes</li>
                <li className="pl-1"><strong>Locked exits:</strong> Final exit doors must be operable from the inside without a key. Electromagnetic locks must release on fire alarm activation. Padlocked fire exits are a serious offence</li>
                <li className="pl-1"><strong>Fire door issues:</strong> Doors wedged open (use electromagnetic holders instead), damaged intumescent strips, faulty self-closers, excessive gaps (max 3 mm at sides, 8 mm at threshold)</li>
                <li className="pl-1"><strong>Signage failures:</strong> Non-illuminated or obscured exit signs, incorrect directional arrows, missing signs at changes of direction</li>
                <li className="pl-1"><strong>Emergency lighting failures:</strong> Failed luminaires, depleted batteries, obstructed light fittings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Emergency Lighting — BS 5266-1</h3>
              <p className="text-sm text-white mb-3">
                Emergency lighting provides illumination when the normal mains supply fails, enabling safe evacuation.
                As a maintenance electrician, you may be responsible for installing, testing and maintaining these systems.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Types:</strong> Maintained (always on) or non-maintained (only when mains fails). Self-contained (individual batteries) or central battery system</li>
                <li className="pl-1"><strong>Locations:</strong> All escape routes, exit doors, stairways, changes of direction, intersections, external exits, near fire alarm call points, near firefighting equipment, lift cars, toilets over 8 m², high-risk task areas</li>
                <li className="pl-1"><strong>Illumination:</strong> Minimum 1 lux along the centre line of an escape route, 0.5 lux across the full width</li>
                <li className="pl-1"><strong>Duration:</strong> Minimum 3 hours for most premises (1 hour where immediate evacuation is possible)</li>
                <li className="pl-1"><strong>Monthly test:</strong> Brief functional test — simulate mains failure and confirm each luminaire illuminates. Record results</li>
                <li className="pl-1"><strong>Annual test:</strong> Full rated duration test (3 hours) — verify each luminaire operates for its full duration. Replace any that fail</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Exit Signage — BS 5499 / BS ISO 7010</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Green background with white running man pictogram and directional arrow</li>
                <li className="pl-1">Must be visible from every point on the escape route</li>
                <li className="pl-1">Illuminated signs (internally lit) for buildings where normal lighting may fail</li>
                <li className="pl-1">Photoluminescent signs acceptable where adequate ambient light charges them</li>
                <li className="pl-1">Signs required at every exit, change of direction, and intersection</li>
                <li className="pl-1">Maximum viewing distance depends on sign size (100 mm letter height = 30 m viewing distance)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> During your maintenance work, always check the condition of emergency lighting,
              exit signage and fire doors in the areas where you are working. If you notice failures (blown
              luminaires, damaged signs, faulty door closers), report them to the building manager. Under the RRFSO
              2005, everyone on site has a duty to cooperate with fire safety measures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Contractor and Multi-Site Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Contractor and Multi-Site Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance technicians frequently work as contractors, visiting multiple different sites
              each week. Each building has its own emergency procedures, alarm systems, escape routes and assembly
              points. Complacency is a serious risk — you must treat every site as unfamiliar and take the time
              to learn the specific procedures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Site Induction — Fire Safety Essentials</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Escape routes:</strong> Walk the escape routes from your work area to the nearest exits. Identify at least two independent routes</li>
                <li className="pl-1"><strong>Assembly point:</strong> Know the exact location — not just "outside" but the specific designated area</li>
                <li className="pl-1"><strong>Alarm sound:</strong> Listen to the alarm during the induction or weekly test. In two-stage systems, know the difference between alert and evacuate</li>
                <li className="pl-1"><strong>Call points:</strong> Locate the nearest manual call point to your work area</li>
                <li className="pl-1"><strong>Extinguishers:</strong> Note the type and location of the nearest fire extinguisher</li>
                <li className="pl-1"><strong>Fire warden:</strong> Know who the local fire warden is for the area you are working in</li>
                <li className="pl-1"><strong>Sign in/out:</strong> Always sign the contractor register on arrival and departure so you can be accounted for</li>
                <li className="pl-1"><strong>Permit to work:</strong> If your work involves hot work, ensure the building fire risk assessment accounts for this</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Working in Occupied Buildings</h3>
                <p className="text-sm text-white">
                  When carrying out maintenance in occupied buildings, your work must not compromise the escape routes
                  or fire safety systems. Cable installation that temporarily blocks a corridor, dust from cutting that
                  triggers false alarms, or isolation of fire alarm circuits all require careful planning and coordination
                  with the building manager. If you need to impair any fire safety system (even temporarily), a fire
                  impairment notice must be issued and compensatory measures put in place.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Site Awareness</h3>
                <p className="text-sm text-white">
                  Maintain a personal record of fire safety information for every site you regularly visit. Include the
                  assembly point location, alarm type, nearest exits from your typical work areas, and emergency contact
                  numbers. Review this information each time you attend site — building layouts, procedures and
                  personnel can change. If you arrive on site and notice changes to escape routes (new construction,
                  blocked exits), report this immediately.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to comply with site-specific
              emergency procedures and demonstrate awareness of evacuation plans at every workplace. This is assessed
              through your portfolio evidence and workplace observations — ensure you can demonstrate that you
              routinely check fire safety arrangements when attending different sites.
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
                <p className="font-medium text-white mb-1">Evacuation Types</p>
                <ul className="space-y-0.5">
                  <li>Simultaneous — everyone at once, small/medium buildings</li>
                  <li>Phased — fire floor first, then adjacent, then rest</li>
                  <li>Progressive horizontal — to adjacent compartment</li>
                  <li>Invacuation — shelter in place, external threat</li>
                  <li>Fire wardens sweep and report at assembly point</li>
                  <li>PEEPs for any person needing assistance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>RRFSO 2005 — Emergency procedures duty</li>
                  <li>BS 5839-1 — Fire alarm testing (weekly MCPs)</li>
                  <li>BS 5266-1 — Emergency lighting (monthly/annual test)</li>
                  <li>BS 5499 / BS ISO 7010 — Exit signage</li>
                  <li>Equality Act 2010 — Reasonable adjustments</li>
                  <li>ST1426 — Emergency procedures KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: First Aid
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section6-4">
              Next: Reporting Incidents
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section6_3;
