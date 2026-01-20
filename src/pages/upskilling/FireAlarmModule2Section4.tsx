import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sounders & VADs - Fire Alarm Module 2 Section 4";
const DESCRIPTION = "Learn about fire alarm sounders, visual alarm devices (VADs), sound pressure levels, BS 5839-1 requirements, and accessibility considerations.";

const quickCheckQuestions = [
  {
    id: "sounder-bedroom",
    question: "A hotel bedroom measures 68 dB(A) at the pillow position with the door closed. Is this compliant for sleeping accommodation?",
    options: [
      "Yes - anything above 65 dB(A) is acceptable",
      "No - sleeping accommodation requires minimum 75 dB(A) at the bedhead",
      "Yes - 68 dB(A) exceeds the 60 dB(A) minimum",
      "It depends on the background noise level"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 requires a minimum of 75 dB(A) at the bedhead in sleeping accommodation to ensure the alarm wakes sleeping occupants. 68 dB(A) is insufficient."
  },
  {
    id: "vad-requirement",
    question: "A disabled WC is located away from the main corridor. What warning device provision is required?",
    options: [
      "A standard sounder only is sufficient",
      "A VAD (visual alarm device) must be installed inside the WC",
      "No specific requirement if the main corridor sounder is loud enough",
      "An emergency voice intercom"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 requires VADs in areas where hearing-impaired people may be alone and unable to hear the main sounders, including disabled WCs."
  },
  {
    id: "noisy-environment",
    question: "A factory floor has background noise levels of 85 dB(A). What sound pressure level should the fire alarm achieve?",
    options: [
      "65 dB(A) minimum",
      "75 dB(A) minimum",
      "90 dB(A) minimum (5 dB above ambient)",
      "120 dB(A) maximum"
    ],
    correctIndex: 2,
    explanation: "BS 5839-1 requires sounders to achieve 5 dB above any background noise likely to persist for more than 30 seconds. With 85 dB(A) ambient, the alarm must achieve at least 90 dB(A)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum sound pressure level required for a fire alarm sounder at the bedhead in sleeping accommodation?",
    options: ["60 dB(A)", "65 dB(A)", "75 dB(A)", "85 dB(A)"],
    correctAnswer: 2,
    explanation: "BS 5839-1 requires a minimum of 75 dB(A) at the bedhead in sleeping accommodation to ensure the alarm wakes sleeping occupants."
  },
  {
    id: 2,
    question: "What is the minimum SPL requirement in areas where occupants are awake?",
    options: ["60 dB(A)", "65 dB(A) or 5 dB above ambient", "70 dB(A)", "75 dB(A)"],
    correctAnswer: 1,
    explanation: "In areas where occupants are awake, sounders must achieve 65 dB(A), or 5 dB above any background noise likely to persist for more than 30 seconds."
  },
  {
    id: 3,
    question: "What is the purpose of Visual Alarm Devices (VADs)?",
    options: [
      "To provide illumination during evacuation",
      "To alert people with hearing impairments",
      "To indicate the location of fire",
      "To replace sounders in all areas"
    ],
    correctAnswer: 1,
    explanation: "VADs provide visual warning for deaf or hearing-impaired occupants who may not hear audible fire alarms."
  },
  {
    id: 4,
    question: "What colour should fire alarm VADs typically produce?",
    options: ["Blue", "Amber", "Red or white", "Green"],
    correctAnswer: 2,
    explanation: "Fire alarm VADs should produce red or white light. Red is the traditional fire alarm colour, though white is permitted and often provides better visibility."
  },
  {
    id: 5,
    question: "Where are VADs specifically required by BS 5839-1?",
    options: [
      "In every room",
      "In areas with deaf or hearing-impaired occupants",
      "Only in bedrooms",
      "Only in corridors"
    ],
    correctAnswer: 1,
    explanation: "VADs are required where hearing-impaired people are likely to be alone and may not hear the audible alarm, such as disabled toilets, bedrooms, or workstations."
  },
  {
    id: 6,
    question: "What is the maximum SPL to avoid causing discomfort?",
    options: ["100 dB(A)", "110 dB(A)", "120 dB(A)", "130 dB(A)"],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends the SPL should not exceed 120 dB(A) at any point to prevent discomfort and potential hearing damage."
  },
  {
    id: 7,
    question: "Why might different sounder tones be used in a building?",
    options: [
      "To create musical variety",
      "To distinguish between fire alarm and other alerts",
      "Because cheaper sounders have different tones",
      "For aesthetic reasons only"
    ],
    correctAnswer: 1,
    explanation: "Different tones can distinguish the fire alarm from other building alerts and can signal different evacuation strategies (e.g., phased evacuation)."
  },
  {
    id: 8,
    question: "What type of sounder might be used in a noisy industrial environment?",
    options: [
      "Standard electronic sounder only",
      "High-power sounder or voice alarm system",
      "No sounders - VADs only",
      "Multiple standard sounders"
    ],
    correctAnswer: 1,
    explanation: "Noisy environments may require high-power sounders or voice alarm systems to achieve the required sound levels above ambient noise."
  },
  {
    id: 9,
    question: "What is a key benefit of voice alarm systems over traditional sounders?",
    options: [
      "They are cheaper to install",
      "They provide clear spoken instructions to aid evacuation",
      "They are louder than sounders",
      "They do not require regular testing"
    ],
    correctAnswer: 1,
    explanation: "Voice alarm systems provide clear spoken instructions, which can be particularly useful in complex buildings or where occupants are unfamiliar with evacuation procedures."
  },
  {
    id: 10,
    question: "In a phased evacuation building, what do the two different alert and evacuate signals indicate?",
    options: [
      "Fault and normal operation",
      "Alert (prepare to evacuate) and Evacuate (leave immediately)",
      "Test mode and live mode",
      "Fire in zone and all clear"
    ],
    correctAnswer: 1,
    explanation: "In phased evacuation, the alert signal warns staff to prepare for evacuation while the evacuate signal indicates immediate evacuation is required."
  }
];

const faqs = [
  {
    question: "Can I use green VADs for the fire alarm?",
    answer: "No - green is typically reserved for emergency exit signage. Fire alarm VADs should be red or white."
  },
  {
    question: "How do I test VADs?",
    answer: "VADs should be tested during weekly tests by visual inspection to confirm correct operation. Annual service should include detailed checks."
  },
  {
    question: "What if occupants are wearing ear protection?",
    answer: "Consider additional measures such as VADs, personal pager systems, or flashing lights on machinery that stop when the alarm activates."
  },
  {
    question: "Do I need sounders in every room?",
    answer: "Not necessarily - sounders must achieve the required SPL at all points. Open-plan areas may require fewer devices than cellular offices."
  },
  {
    question: "Can voice alarm replace traditional sounders?",
    answer: "Yes - voice alarm systems can be the primary warning method, but must still achieve the required sound levels and include a warning tone."
  },
  {
    question: "What tone should fire alarm sounders produce?",
    answer: "BS 5839-1 recommends a continuous or modulating tone. The key requirement is consistency throughout the building."
  }
];

const FireAlarmModule2Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-course/module-2">
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
            <Volume2 className="h-4 w-4" />
            <span>Module 2 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sounders & VADs
          </h1>
          <p className="text-white">
            Understanding fire alarm warning devices and accessibility requirements per BS 5839-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sleeping areas:</strong> Minimum 75 dB(A) at bedhead</li>
              <li><strong>Awake areas:</strong> 65 dB(A) or 5 dB above ambient</li>
              <li><strong>Maximum:</strong> 120 dB(A) to prevent discomfort</li>
              <li><strong>VADs:</strong> Required for hearing-impaired accessibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Disabled WC = VAD required</li>
              <li><strong>Use:</strong> Voice alarm for complex buildings</li>
              <li><strong>Apply:</strong> Phased evacuation needs two signal types</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State BS 5839-1 sound pressure level requirements",
              "Explain the purpose and placement of VADs",
              "Describe different sounder types and applications",
              "Understand voice alarm system benefits",
              "Apply accessibility requirements for warning devices",
              "Design appropriate warning device coverage"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction to Warning Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Introduction to Warning Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm warning devices alert building occupants to evacuate. They must be audible and/or visible throughout the building to ensure everyone receives adequate warning regardless of their location or hearing ability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Types of Warning Devices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Audible sounders:</strong> Bells, electronic sounders, horns</li>
                <li><strong>Visual Alarm Devices (VADs):</strong> Flashing beacons/strobes</li>
                <li><strong>Voice alarm systems:</strong> Spoken messages and instructions</li>
                <li><strong>Combined units:</strong> Sounder/VAD combinations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Sound Pressure Level Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Sound Pressure Level Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 specifies minimum sound levels to ensure alarms can be heard throughout the building.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Sleeping Accommodation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Minimum 75 dB(A)</strong> at bedhead</li>
                  <li>Must wake sleeping occupants</li>
                  <li>Measured with all doors closed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Awake Occupants</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Minimum 65 dB(A)</strong></li>
                  <li>Or 5 dB above ambient noise</li>
                  <li>Whichever is greater</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <p className="text-sm text-white">
                <strong>Warning:</strong> Maximum SPL should not exceed 120 dB(A) at any point to prevent discomfort and potential hearing damage.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Visual Alarm Devices (VADs) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Visual Alarm Devices (VADs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VADs provide visual warning for people who are deaf or hearing-impaired and may not hear audible alarms. They are essential for building accessibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Where VADs Are Required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Disabled WCs and accessible facilities</li>
                <li>Bedrooms in premises with hearing-impaired occupants</li>
                <li>Workstations where employees may be alone</li>
                <li>Noisy environments where sounders may not be heard</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">VAD Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Colour:</strong> Red or white flash</li>
                <li><strong>Flash rate:</strong> 0.5 to 2 Hz (0.5 to 4 flashes per second)</li>
                <li><strong>Coverage:</strong> Must be visible from all positions in the area</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Types of Sounders */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Types of Sounders
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Various sounder types are available to suit different environments and requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Common Sounder Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electronic sounders:</strong> Most common, adjustable tone and volume</li>
                <li><strong>Bells:</strong> Traditional, distinctive sound</li>
                <li><strong>High-power sounders:</strong> For noisy industrial environments</li>
                <li><strong>Sounder/VAD combinations:</strong> Integrated audible and visual warning</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> All sounders should produce a consistent tone throughout the building to avoid confusion. Different tones may be used for different purposes (e.g., alert vs evacuate in phased evacuation).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Voice Alarm Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Voice Alarm Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voice alarm systems provide spoken messages instead of or in addition to traditional tones. They are particularly valuable in complex buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Benefits of Voice Alarm:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clear evacuation instructions</li>
                <li>Supports phased evacuation strategies</li>
                <li>Can provide zone-specific messages</li>
                <li>Reduces panic through clear communication</li>
                <li>Multi-language capability for diverse buildings</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Note:</strong> Voice alarm systems must comply with BS 5839-8 for design, installation and maintenance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Phased Evacuation Signalling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Phased Evacuation Signalling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In buildings with phased evacuation, different signals indicate alert and evacuate stages.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-orange-400 mb-2">Alert Signal</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Intermittent tone</li>
                  <li>Staff prepare for evacuation</li>
                  <li>Fire wardens investigate</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400 mb-2">Evacuate Signal</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuous tone</li>
                  <li>Immediate evacuation required</li>
                  <li>All occupants leave building</li>
                </ul>
              </div>
            </div>

            <p>
              Staff training is essential to ensure correct response to each signal type.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measure actual sound levels during commissioning with calibrated equipment</li>
                <li>Consider using combined sounder/VAD units to reduce installation costs</li>
                <li>In voice alarm systems, use pre-recorded messages for consistency and clarity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not measuring at pillow position:</strong> Bedroom measurements must be at the actual pillow location</li>
                <li><strong>Omitting VADs in disabled WCs:</strong> This is a common compliance failure</li>
                <li><strong>Using different tones:</strong> Inconsistent sounder tones cause confusion</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
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
                <p className="font-medium text-white mb-1">Sound Pressure Levels</p>
                <ul className="space-y-0.5">
                  <li>Sleeping areas = 75 dB(A) at bedhead</li>
                  <li>Awake areas = 65 dB(A) or 5 dB above ambient</li>
                  <li>Maximum = 120 dB(A)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">VAD Requirements</p>
                <ul className="space-y-0.5">
                  <li>Colour = Red or white</li>
                  <li>Flash rate = 0.5 to 2 Hz</li>
                  <li>Disabled WCs = Always required</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule2Section4;
