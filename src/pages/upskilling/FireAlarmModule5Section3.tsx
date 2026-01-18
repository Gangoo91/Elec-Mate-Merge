import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Device Installation - Fire Alarm Course";
const DESCRIPTION = "Learn about detector mounting, manual call point positioning and sounder installation requirements per BS 5839-1.";

const quickCheckQuestions = [
  {
    id: "device-1",
    question: "A hotel bedroom door when closed reduces corridor sounder level to 60 dB(A). Is this compliant for sleeping accommodation?",
    options: [
      "Yes - 60 dB(A) is sufficient",
      "No - 75 dB(A) is required at bed-head level in sleeping accommodation",
      "It depends on the hotel star rating",
      "Only if the guest requests it"
    ],
    correctIndex: 1,
    explanation: "No - 75 dB(A) is required at bed-head level in sleeping accommodation. A sounder or sounder-beacon would need to be installed within the bedroom to achieve compliance."
  },
  {
    id: "device-2",
    question: "Why must multiple VADs visible from the same location be synchronised?",
    options: [
      "To look more professional",
      "Unsynchronised flashing can cause disorientation and may trigger photosensitive conditions",
      "To save battery power",
      "It is not required"
    ],
    correctIndex: 1,
    explanation: "Unsynchronised flashing can cause disorientation and may trigger photosensitive conditions in susceptible individuals. Synchronisation ensures a consistent, recognisable alarm signal."
  },
  {
    id: "device-3",
    question: "A warehouse has a 15m high ceiling. Which detector type would be most appropriate and why?",
    options: [
      "Standard point smoke detectors",
      "Beam detectors - they are more effective at greater heights where smoke disperses before reaching ceiling level",
      "Heat detectors only",
      "No detectors needed at this height"
    ],
    correctIndex: 1,
    explanation: "Beam detectors would be appropriate for a 15m ceiling. Point detectors become less effective at greater heights due to smoke cooling and dispersing before reaching ceiling level. Beam detectors can be positioned at optimal height for early detection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "At what height should manual call points (MCPs) be mounted according to BS 5839-1?",
    options: [
      "0.8m to 1.0m above floor level",
      "1.4m above floor level to the operating element",
      "1.8m above floor level",
      "Any height convenient for the installer"
    ],
    correctAnswer: 1,
    explanation: "BS 5839-1 recommends MCPs be mounted at 1.4m above floor level to the operating element for accessibility and compliance with DDA requirements."
  },
  {
    id: 2,
    question: "What is the maximum travel distance to an MCP from any point on an escape route?",
    options: [
      "15m",
      "30m",
      "45m",
      "60m"
    ],
    correctAnswer: 2,
    explanation: "MCPs should be positioned so that no person need travel more than 45m to reach a call point on the floor. Near exits is preferable."
  },
  {
    id: 3,
    question: "What is the typical mounting height for point-type smoke detectors on flat ceilings?",
    options: [
      "Within 500mm of walls",
      "At ceiling level or within 50mm of ceiling",
      "300mm below ceiling level",
      "At any height above 2m"
    ],
    correctAnswer: 1,
    explanation: "Point detectors should be mounted at ceiling level or within 50mm of the ceiling surface to detect rising smoke effectively."
  },
  {
    id: 4,
    question: "What minimum sound level must fire alarm sounders achieve at bed-head level in sleeping accommodation?",
    options: [
      "55 dB(A)",
      "65 dB(A)",
      "75 dB(A)",
      "85 dB(A)"
    ],
    correctAnswer: 2,
    explanation: "BS 5839-1 requires a minimum of 75 dB(A) at bed-head level in sleeping areas to ensure occupants are awakened by the alarm."
  },
  {
    id: 5,
    question: "What is the minimum sound level required throughout all other areas of a building?",
    options: [
      "55 dB(A)",
      "65 dB(A)",
      "75 dB(A)",
      "85 dB(A)"
    ],
    correctAnswer: 1,
    explanation: "A minimum of 65 dB(A) is required throughout all areas of the building, or 5 dB(A) above ambient noise if this is higher."
  },
  {
    id: 6,
    question: "How far from a wall corner should a point detector be positioned?",
    options: [
      "No minimum distance",
      "At least 300mm from corners and obstructions",
      "At least 1m from corners",
      "Within 100mm of corner"
    ],
    correctAnswer: 1,
    explanation: "Detectors should be positioned at least 300mm from walls and obstructions to avoid dead air spaces where smoke may not reach the detector."
  },
  {
    id: 7,
    question: "When installing beam detectors, what is the typical height range above floor level?",
    options: [
      "1-2m",
      "3-5m",
      "6-25m typically",
      "Any height"
    ],
    correctAnswer: 2,
    explanation: "Beam detectors are typically used for high ceiling applications, generally between 6m and 25m, where point detectors would be impractical."
  },
  {
    id: 8,
    question: "What should be considered when positioning visual alarm devices (VADs)?",
    options: [
      "Colour preference only",
      "Coverage pattern, mounting height and potential obstructions",
      "Distance from sounders only",
      "Building age"
    ],
    correctAnswer: 1,
    explanation: "VADs must be positioned considering their coverage pattern, mounting height requirements, and any obstructions that could reduce visibility."
  },
  {
    id: 9,
    question: "What special requirement applies to MCPs at final exits?",
    options: [
      "No special requirement",
      "Must be adjacent to and on the same side as the door opening",
      "Must be above 2m height",
      "Must be red in colour"
    ],
    correctAnswer: 1,
    explanation: "MCPs at final exits should be positioned adjacent to and on the same side as the door opening to allow easy activation when evacuating."
  },
  {
    id: 10,
    question: "What fixing consideration is important for detector bases in suspended ceilings?",
    options: [
      "Any clip will do",
      "Independent support to structure, not relying on ceiling tile alone",
      "Ceiling tile can support all detectors",
      "Magnetic fixing preferred"
    ],
    correctAnswer: 1,
    explanation: "Detector bases in suspended ceilings must have independent support to the structure above, not rely solely on ceiling tiles which may not support the weight."
  }
];

const faqs = [
  {
    question: "Can smoke detectors be installed in kitchens?",
    answer: "Generally no - heat detectors are preferred due to cooking fumes causing false alarms. Multi-sensor detectors with appropriate algorithms may be suitable in some situations."
  },
  {
    question: "What about detectors in bathrooms and shower rooms?",
    answer: "Heat detectors can be used if detection is required. Smoke detectors are generally unsuitable due to steam. Consider whether detection is actually needed based on risk assessment."
  },
  {
    question: "How do I handle sloped ceilings?",
    answer: "Detectors should be mounted at the apex or within 600mm of it. For steeper pitches, additional detectors may be needed at lower levels. Refer to BS 5839-1 guidance."
  },
  {
    question: "Can MCPs be recessed into walls?",
    answer: "Yes, provided the operating element remains easily identifiable and accessible. The recess must not obstruct operation or visibility."
  },
  {
    question: "What if the design shows fewer sounders than needed for coverage?",
    answer: "Raise a technical query with the designer before proceeding. Sound level verification at commissioning may reveal the issue - better to address early."
  },
  {
    question: "Do all VADs need to be the same colour?",
    answer: "VADs for fire alarm should produce red or white flashing light. Consistency within a building aids recognition. Check specification requirements."
  }
];

const FireAlarmModule5Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Device Installation
          </h1>
          <p className="text-white/80">
            Detector mounting, manual call points, sounders and visual alarm devices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Detectors:</strong> Mount at ceiling level, 300mm from walls/obstructions, with spacing per manufacturer data</li>
              <li><strong>MCPs:</strong> At 1.4m height, within 45m travel distance, adjacent to exits</li>
              <li><strong>Sounders:</strong> Must achieve 75 dB(A) at bed-head in sleeping areas, 65 dB(A) elsewhere</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>VADs:</strong> Coverage per BS EN 54-23, synchronised if multiple visible</li>
              <li><strong>Fixings:</strong> Independent support for suspended ceiling detectors</li>
              <li><strong>Spacing:</strong> Per manufacturer data sheets for specific detector types</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Install point-type detectors at correct height and spacing",
              "Position manual call points for accessibility and coverage",
              "Mount sounders to achieve required sound levels",
              "Install visual alarm devices with appropriate coverage",
              "Select correct fixings for different substrates",
              "Apply BS 5839-1 siting requirements to real scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Point Detector Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Point-type detectors (smoke, heat, multi-sensor) are the most common device type. Correct positioning ensures reliable detection of fire conditions.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mounting Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>At ceiling level or within 50mm of ceiling surface</li>
                <li>Minimum 300mm from walls and obstructions</li>
                <li>500mm from luminaires and HVAC outlets</li>
                <li>Coverage spacing per manufacturer and ceiling height</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Coverage (flat ceilings up to 10.5m):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Optical smoke: 7.5m radius typical</li>
                <li>Heat Grade A1: 5.3m radius typical</li>
                <li>Always check manufacturer's specific data sheets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Manual Call Point Positioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Manual call points (MCPs) allow building occupants to manually trigger the alarm. Positioning is critical for accessibility and rapid evacuation.</p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Height & Position</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>1.4m to operating element</li>
                  <li>Unobstructed access</li>
                  <li>Adjacent to final exits</li>
                  <li>On escape routes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coverage</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>45m maximum travel distance</li>
                  <li>Each floor level covered</li>
                  <li>Each fire exit location</li>
                  <li>Stairway landings</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white"><strong>Important:</strong> MCPs at final exits must be positioned on the same side as the door opening so occupants can activate while evacuating.</p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sounder Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Fire alarm sounders must achieve minimum sound pressure levels throughout the building to ensure all occupants are alerted.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sound Level Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sleeping areas:</strong> 75 dB(A) minimum at bed-head level</li>
                <li><strong>All other areas:</strong> 65 dB(A) minimum throughout</li>
                <li><strong>High ambient noise:</strong> 5 dB(A) above ambient level</li>
                <li><strong>Plant rooms:</strong> Consider hearing protection requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Positioning Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Corridor sounders typically at 15m centres</li>
                <li>Consider sound absorption of room furnishings</li>
                <li>Account for closed doors reducing sound transmission</li>
                <li>Mount at high level for better distribution</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Visual Alarm Devices (VADs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Visual alarm devices supplement sounders to alert those who are deaf or hard of hearing, or in areas where audible alarms may not be effective.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VAD Categories per BS EN 54-23:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>W (Wall):</strong> Mounted on wall, coverage in front</li>
                <li><strong>C (Ceiling):</strong> Mounted on ceiling, coverage below</li>
                <li><strong>O (Open):</strong> Coverage in all directions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Coverage volume specified by manufacturer</li>
                <li>Avoid positioning where direct sunlight competes</li>
                <li>Consider room layout and potential obstructions</li>
                <li>Synchronisation required for multiple VADs in view</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Fixing Methods & Substrates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Selecting the correct fixings for different substrates ensures devices remain secure throughout their service life.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Substrates & Fixings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Concrete/masonry:</strong> Nylon plugs with appropriate screws</li>
                <li><strong>Plasterboard:</strong> Spring toggles or cavity fixings</li>
                <li><strong>Suspended ceilings:</strong> Independent support to structure</li>
                <li><strong>Metal surfaces:</strong> Self-tapping screws or threaded studs</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white"><strong>Warning:</strong> Detector bases in suspended ceilings must be independently supported from the structure above - never rely on ceiling tiles alone.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Special Detector Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Beyond point detectors, several specialist detector types address specific application requirements.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Beam Detectors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Suitable for high ceilings (typically 6-25m)</li>
                <li>Transmitter and receiver require stable mounting</li>
                <li>Avoid locations with structural movement</li>
                <li>Beam path must remain unobstructed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Duct Detectors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Installed in HVAC ductwork for smoke detection</li>
                <li>Coordinate with mechanical contractor for positioning</li>
                <li>Sampling tubes installed per manufacturer guidance</li>
                <li>Access required for maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Aspirating Smoke Detection (ASD):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Very early warning detection for high-value areas</li>
                <li>Pipe network draws air samples to detector unit</li>
                <li>Pipe routing and sampling hole positions critical</li>
                <li>Requires specialist design and installation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mark detector positions on ceiling grid before installing - ensures even spacing</li>
                <li>Use a laser level for consistent MCP heights along corridors</li>
                <li>Install detector bases at first fix, heads at second fix after decoration</li>
                <li>Photograph device locations before ceiling tiles are installed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Positioning detectors too close to air conditioning vents</strong> — causes nuisance alarms</li>
                <li><strong>Installing MCPs behind doors or in locations not visible to occupants</strong> — defeats purpose</li>
                <li><strong>Relying on ceiling tiles to support detector bases without independent fixing</strong> — will fail</li>
                <li><strong>Assuming corridor sounders will achieve required levels in bedrooms</strong> — check through closed doors</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FireAlarmModule5Section3;
