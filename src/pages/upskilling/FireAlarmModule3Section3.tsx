import { ArrowLeft, ArrowRight, Volume2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A hotel has noisy plant on the ground floor with ambient levels around 70 dB(A). What sounder level is required?",
    answer: "Sounders must achieve 75 dB(A) (5 dB above the 70 dB(A) ambient). Additionally, as a hotel with sleeping risk, bedrooms require 75 dB(A) at bedhead regardless of ambient levels."
  },
  {
    question: "Why must VADs be synchronised when multiple devices are visible from the same location?",
    answer: "Synchronisation reduces photosensitive epilepsy risk and provides a clearer, more recognisable warning signal. Unsynchronised flashing can cause disorientation and discomfort."
  },
  {
    question: "What is the difference between alert and evacuate signals in phased evacuation?",
    answer: "Alert (intermittent tone) tells occupants to prepare and await instruction. Evacuate (continuous tone) instructs immediate departure. Fire floor and floor above receive immediate evacuate; other floors receive alert first."
  }
];

const quizQuestions = [
  {
    question: "What is the general audibility target for fire alarm sounders in most occupied areas?",
    options: ["55 dB(A)", "65 dB(A) or 5 dB above ambient", "75 dB(A) everywhere", "85 dB(A)"],
    correctAnswer: 1,
    explanation: "BS 5839-1 specifies 65 dB(A) or 5 dB above ambient noise - whichever is greater."
  },
  {
    question: "What audibility level is required at the bedhead in sleeping accommodation?",
    options: ["55 dB(A)", "65 dB(A)", "75 dB(A) with doors closed", "85 dB(A)"],
    correctAnswer: 2,
    explanation: "Sleeping areas require 75 dB(A) at the bedhead with bedroom doors closed to ensure occupants are awakened."
  },
  {
    question: "Why should multiple visual alarm devices (VADs) be synchronised?",
    options: ["To save power", "To reduce photosensitive risk and provide clear, unified signalling", "For aesthetic reasons", "It is not required"],
    correctAnswer: 1,
    explanation: "Synchronised VADs reduce photosensitive risk and provide clearer, more recognisable warning signals."
  },
  {
    question: "What distinguishes an alert signal from an evacuate signal in phased evacuation?",
    options: ["Volume only", "Alert prepares occupants to standby; evacuate instructs immediate departure", "They are identical", "Alert is visual only"],
    correctAnswer: 1,
    explanation: "Alert signals prepare occupants in adjacent areas while evacuate signals instruct immediate departure from the affected zone."
  },
  {
    question: "For voice alarm systems, what is more important than maximum loudness?",
    options: ["Lowest cost", "Intelligibility (speech transmission index)", "Number of speakers", "Aesthetic appearance"],
    correctAnswer: 1,
    explanation: "Speech intelligibility (measured by STI) is critical - occupants must understand evacuation instructions clearly."
  },
  {
    question: "What is the primary purpose of sounder zones in fire alarm design?",
    options: ["Reduce equipment costs", "Enable selective alerting based on fire location and evacuation strategy", "Simplify wiring", "Meet aesthetic requirements"],
    correctAnswer: 1,
    explanation: "Sounder zones enable selective alerting, supporting phased evacuation and preventing unnecessary building-wide alarm."
  },
  {
    question: "When should different alarm tones be used within the same building?",
    options: ["Never - one tone throughout", "To distinguish different alarm types (e.g., fire vs. gas)", "Based on occupant preferences", "Only in hospitals"],
    correctAnswer: 1,
    explanation: "Different tones can distinguish alarm types (fire, gas, security) but must be clearly recognisable and documented in fire procedures."
  },
  {
    question: "What consideration is needed for sounder placement in high-ceiling areas?",
    options: ["Ceiling height has no effect", "Sound may need to be supplemented or speakers angled to maintain audibility at occupant level", "Only VADs are needed", "Use louder sounders automatically"],
    correctAnswer: 1,
    explanation: "High ceilings can affect sound distribution; supplementary wall-mounted sounders or angled speakers may be needed to maintain audibility at floor level."
  },
  {
    question: "How should class change or test signals differ from fire alarms?",
    options: ["They should sound identical", "Clearly distinguishable tones to prevent confusion or inappropriate response", "No signal should be used", "Visual only"],
    correctAnswer: 1,
    explanation: "Test and class change signals must be clearly distinguishable from fire alarms to prevent confusion and maintain appropriate response to actual fire signals."
  },
  {
    question: "What documentation should specify sounder zone arrangements?",
    options: ["No documentation needed", "Cause and effect matrix and zone drawings", "Only verbal instructions", "Manufacturer catalogues only"],
    correctAnswer: 1,
    explanation: "Cause and effect documentation and zone drawings must clearly specify which sounders operate for each detection zone and scenario."
  }
];

const faqs = [
  {
    question: "Can sounder zones differ from detection zones?",
    answer: "Yes - sounder zones are designed around evacuation strategy and may not match detection zones exactly. The cause and effect matrix defines how detection zones trigger sounder zones."
  },
  {
    question: "Is voice alarm always required?",
    answer: "No - voice alarm is beneficial for complex buildings, phased evacuation, and multilingual environments but is not mandatory for all premises."
  },
  {
    question: "How do I calculate required sounder coverage?",
    answer: "Use manufacturer data for sounder output and coverage patterns. Account for distance attenuation, absorption, and barriers. Verify with commissioning measurements."
  },
  {
    question: "Do VADs replace sounders?",
    answer: "No - VADs supplement sounders. They provide visual warning for hearing-impaired occupants and noisy areas but do not replace audible warning."
  },
  {
    question: "What about test and class change signals?",
    answer: "These must be clearly distinguishable from fire alarms. Use different tones, patterns, or pre-announcements to prevent confusion."
  },
  {
    question: "How should sounders operate during a fire drill?",
    answer: "Fire drills should use the same signals as actual fire conditions to ensure familiarity. Brief occupants beforehand and record the drill in the logbook."
  }
];

const FireAlarmModule3Section3 = () => {
  useSEO({
    title: "Sounder Zones - Fire Alarm Course",
    description: "BS 5839-1 sounder zone design: audibility requirements, alarm signals, voice alarm systems, VADs, and phased evacuation considerations."
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-white hover:text-elec-yellow">
            <Link to="..">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module</span>
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 6</span>
        </div>
      </header>

      <main className="px-4 py-8 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Volume2 className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sounder Zones</h1>
          <p className="text-white">Designing effective alarm signalling with audibility, voice alarm, VADs, and phased evacuation support</p>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Apply BS 5839-1 audibility requirements for general and sleeping areas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Design sounder zones to support evacuation strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Specify voice alarm systems with appropriate intelligibility</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Select and position VADs for effective visual warning</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Understand alert vs evacuate signalling for phased evacuation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Coordinate sounder zones with cause and effect programming</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Audibility Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Audibility Requirements
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Fire alarm sounders must provide adequate warning throughout all occupied areas. BS 5839-1 sets clear audibility targets that depend on the type of occupancy.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">BS 5839-1 Audibility Targets</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>General areas:</strong> 65 dB(A) or 5 dB above ambient noise (whichever is greater)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Sleeping areas:</strong> 75 dB(A) at the bedhead with bedroom doors closed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Noisy environments:</strong> consider ambient noise levels during typical occupied hours</span>
                </li>
              </ul>
            </div>

            <p>
              Sound level calculations should account for absorption, distance, and intervening barriers. Always measure ambient noise during typical occupied hours rather than when the building is empty.
            </p>
          </div>
        </section>

        {/* Section 02: Sounder Zone Design */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Sounder Zone Design
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Sounder zones enable selective alerting based on fire location and evacuation strategy. This supports phased evacuation and prevents unnecessary building-wide alarm.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Zone Design Principles</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Align sounder zones with evacuation strategy (phased or simultaneous)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Consider floor-by-floor or area-based zoning for phased evacuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Protected stairs may have separate sounder arrangements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Coordinate with cause and effect matrix for each detection zone</span>
                </li>
              </ul>
            </div>

            <p>
              Sounder zones do not need to match detection zones exactly. The cause and effect matrix defines how detection in one zone triggers sounders in other zones based on the fire strategy.
            </p>
          </div>
        </section>

        {/* Section 03: Alert and Evacuate Signals */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Alert and Evacuate Signals
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Phased evacuation uses distinct signals to control occupant movement progressively:
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Signal Types</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Alert (intermittent tone):</strong> prepare to leave, await further instruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Evacuate (continuous tone):</strong> leave immediately via nearest escape route</span>
                </li>
              </ul>
            </div>

            <p>
              The fire floor and floor above typically receive immediate evacuate signal, while other floors receive an alert signal that can escalate to full evacuation if needed.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[0].question}
          answer={quickCheckQuestions[0].answer}
        />

        {/* Section 04: Voice Alarm Systems */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Voice Alarm Systems
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Voice alarm provides clear spoken instructions rather than tones alone. This is particularly valuable for complex buildings, phased evacuation, and multilingual environments.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Voice Alarm Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Intelligibility:</strong> prioritise STI (Speech Transmission Index) over loudness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Reverberation:</strong> control acoustic environment to maintain clarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Messages:</strong> pre-recorded and live announcement capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Zoning:</strong> enable targeted messages per zone or floor</span>
                </li>
              </ul>
            </div>

            <p>
              Occupants must be able to clearly understand evacuation instructions. A highly intelligible message at moderate volume is more effective than a loud but unintelligible one.
            </p>
          </div>
        </section>

        {/* Section 05: Visual Alarm Devices (VADs) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Visual Alarm Devices (VADs)
          </h2>
          <div className="space-y-4 text-white">
            <p>
              VADs provide visual warning for hearing-impaired occupants and in noisy environments where audible alarms may not be heard.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">EN 54-23 VAD Categories</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Category W:</strong> wall-mounted - coverage specified in height x width</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Category C:</strong> ceiling-mounted - circular coverage pattern</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Category O:</strong> open area - large space coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Synchronisation:</strong> required where multiple VADs are visible</span>
                </li>
              </ul>
            </div>

            <p>
              Synchronisation is critical when multiple VADs are visible from the same location. Unsynchronised flashing increases photosensitive epilepsy risk and makes the warning less recognisable.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[1].question}
          answer={quickCheckQuestions[1].answer}
        />

        {/* Section 06: Sounder Placement Considerations */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Sounder Placement Considerations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Effective sounder placement ensures audibility throughout the protected area while avoiding excessive noise that could cause distress or confusion.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Placement Factors</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Account for room acoustics, absorption materials, and barriers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>High ceilings may require wall-mounted or angled speakers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Open-plan areas need distributed coverage rather than single powerful sounders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>Avoid excessive loudness that causes sound masking or occupant distress</span>
                </li>
              </ul>
            </div>

            <p>
              Consider future use changes when designing sounder coverage. A plant room today may become an occupied office tomorrow, requiring adequate audibility.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[2].question}
          answer={quickCheckQuestions[2].answer}
        />

        {/* Pro Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">07</span>
            Pro Tips
          </h2>
          <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Measure ambient noise during typical occupied hours, not when the building is empty</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Consider future use changes - plant rooms may become occupied spaces</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Document sounder zones clearly in cause and effect matrix for commissioning</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">08</span>
            Common Mistakes
          </h2>
          <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Ignoring sleeping risk audibility requirements (75 dB(A) at bedhead)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Omitting VADs in noisy areas or accessibility-critical spaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Unsynchronised VADs where multiple devices are visible</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Sounder Zones Knowledge Check"
            questions={quizQuestions}
            moduleTitle="Sounder Zones"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Detection Zones & Categories
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-4">
              Next: Detector Spacing & Coverage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default FireAlarmModule3Section3;
