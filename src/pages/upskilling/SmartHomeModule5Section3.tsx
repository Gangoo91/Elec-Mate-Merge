import { ArrowLeft, ArrowRight, Eye, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Door/Window Contact Sensors and PIR";
const DESCRIPTION = "Perimeter contacts and indoor motion detection for layered security systems";

const quickCheckQuestions = [
  {
    question: "What causes a magnetic contact sensor to trigger an alarm?",
    options: [
      "Motion detected nearby",
      "Temperature change",
      "Separation of the magnet from the reed switch",
      "Sound vibration"
    ],
    correctAnswer: 2,
    explanation: "Magnetic contact sensors trigger when the magnet (on the moving part) separates from the reed switch (on the fixed frame), breaking the magnetic field and changing the circuit state."
  },
  {
    question: "Where should PIR sensors NOT be positioned?",
    options: [
      "Hallways and corridors",
      "Directly facing windows or radiators",
      "Living rooms",
      "Stairwells"
    ],
    correctAnswer: 1,
    explanation: "PIR sensors detect infrared radiation changes from body heat. Positioning them facing windows (sunlight) or radiators (heat sources) causes false triggers from temperature fluctuations."
  },
  {
    question: "What is the main advantage of layered security using both contact sensors and PIR?",
    options: [
      "Reduced installation cost",
      "Simpler wiring requirements",
      "Multiple detection points providing redundancy and earlier warning",
      "Lower battery consumption"
    ],
    correctAnswer: 2,
    explanation: "Layered security provides multiple detection points: perimeter sensors trigger on entry attempt whilst interior PIR sensors detect movement if perimeter is bypassed, giving redundant protection."
  }
];

const quizQuestions = [
  {
    question: "What type of sensor uses a reed switch and magnet combination?",
    options: [
      "PIR motion sensor",
      "Glass break sensor",
      "Magnetic contact sensor",
      "Vibration sensor"
    ],
    correctAnswer: 2,
    explanation: "Magnetic contact sensors use a reed switch mounted on the door or window frame and a magnet on the moving part. When separated, the reed switch changes state and triggers the alarm."
  },
  {
    question: "What does PIR stand for?",
    options: [
      "Passive Infrared Radiation",
      "Proximity Infrared Response",
      "Perimeter Intrusion Recognition",
      "Programmed Instant Reaction"
    ],
    correctAnswer: 0,
    explanation: "PIR stands for Passive Infrared Radiation. These sensors detect changes in infrared energy emitted by warm bodies moving across their detection field."
  },
  {
    question: "What is the typical detection range of a domestic PIR sensor?",
    options: [
      "2-3 metres",
      "5-7 metres",
      "10-12 metres",
      "15-20 metres"
    ],
    correctAnswer: 2,
    explanation: "Most domestic PIR sensors have a detection range of 10-12 metres with a field of view around 90-110 degrees, covering typical room dimensions effectively."
  },
  {
    question: "Which pet immunity feature is used in PIR sensors?",
    options: [
      "Weight detection",
      "Sound filtering",
      "Dual-element detection and lens masking",
      "Colour recognition"
    ],
    correctAnswer: 2,
    explanation: "Pet-immune PIR sensors use dual-element detection and specially designed lens patterns that distinguish between small animals (low/ground level heat signatures) and humans."
  },
  {
    question: "What is the recommended mounting height for contact sensors on doors?",
    options: [
      "Ground level",
      "Mid-height of the door",
      "Top third of the door, close to the frame edge",
      "Above the door frame"
    ],
    correctAnswer: 2,
    explanation: "Contact sensors should be mounted on the top third of the door, close to the frame edge where the gap remains smallest during frame movement, ensuring reliable triggering."
  }
];

const faqs = [
  {
    question: "How long do battery-powered contact sensors last?",
    answer: "Most contact sensors use CR2032 or CR2450 coin cells lasting 2-5 years depending on transmission frequency. Low battery warnings are sent via the hub app well in advance of failure."
  },
  {
    question: "Can PIR sensors work through glass?",
    answer: "No, standard PIR sensors cannot detect through glass as glass blocks the infrared radiation emitted by body heat. For windows, contact sensors or glass break detectors should be used instead."
  },
  {
    question: "What causes false alarms from contact sensors?",
    answer: "Common causes include loose mounting allowing sensor movement, warped doors or windows affecting gap consistency, interference from nearby metal objects, and low batteries causing intermittent signals."
  }
];

const SmartHomeModule5Section3 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 5`,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Eye className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Contact Sensors</h3>
            <p className="text-sm text-white">Magnetic reed switch detection</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">PIR Sensors</h3>
            <p className="text-sm text-white">Passive infrared motion detection</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Layered Security</h3>
            <p className="text-sm text-white">Perimeter and interior zones</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Installation</h3>
            <p className="text-sm text-white">Positioning and avoiding false alarms</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Explain how magnetic contact sensors detect door and window opening</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Describe PIR sensor operation and appropriate mounting positions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Understand layered security concepts using perimeter and volumetric detection</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify causes of false alarms and apply best practices to minimise them</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Door and Window Contact Sensors
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Magnetic contact sensors form the foundation of perimeter security. They detect when doors and windows are opened, providing the first line of defence against intrusion.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">How Contact Sensors Work</h3>
              <p className="text-white mb-3">
                Contact sensors consist of two parts: a reed switch (containing magnetically-sensitive contacts) and a magnet. When the two parts are close together, the magnetic field keeps the reed switch closed. Opening the door or window separates the components, breaking the magnetic field and changing the switch state.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Reed switch mounted on the fixed frame (door frame, window frame)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Magnet mounted on the moving part (door, window sash)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Gap tolerance typically 10-25mm depending on sensor quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Wireless versions communicate via Zigbee, Z-Wave, or proprietary protocols</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Installation Best Practices</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Mount on the top third of doors where gap remains most consistent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Ensure sensor and magnet alignment within manufacturer specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use surface-mount or recessed versions depending on aesthetics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test opening detection before completing installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Consider slim-profile sensors for double-glazed window reveals</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* PIR Motion Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            PIR Motion Sensors
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Passive Infrared (PIR) sensors detect changes in infrared radiation caused by warm bodies moving through their detection field. They provide volumetric coverage of interior spaces.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">How PIR Detection Works</h3>
              <p className="text-white mb-3">
                PIR sensors contain a pyroelectric element behind a segmented Fresnel lens. The lens divides the field of view into detection zones. When a warm body moves across zone boundaries, the sensor detects the change in infrared energy and triggers an alarm.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Detection range typically 10-12 metres</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Field of view approximately 90-110 degrees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Best detects movement across zones, not directly towards sensor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Cannot detect through glass (glass blocks infrared)</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Mounting Recommendations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Height: 2.0-2.4 metres for optimal coverage pattern</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Corner mounting provides widest room coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Avoid facing windows - sunlight causes false triggers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Keep away from radiators and heating vents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Position to cover likely intruder paths</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Pet Immunity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pet Immunity Features
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Many households have pets, making pet-immune PIR sensors essential to avoid false alarms whilst maintaining security effectiveness.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Pet Immunity Technologies</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-elec-yellow">Dual-element detection:</strong>
                  <span className="text-white"> Uses two pyroelectric elements that must both trigger simultaneously, filtering out small heat signatures from pets.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Lens masking:</strong>
                  <span className="text-white"> Lower detection zones are masked or reduced in sensitivity to ignore ground-level movement.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Signal processing:</strong>
                  <span className="text-white"> Advanced algorithms analyse signal patterns to distinguish between human and animal movement characteristics.</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Practical note:</strong> Pet immunity ratings (e.g., up to 25kg, up to 40kg) assume the pet remains at floor level. Cats climbing on furniture or shelves near the sensor may still trigger alarms.
              </p>
            </div>
          </div>
        </section>

        {/* Layered Security */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Layered Security Concepts
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Effective security systems use multiple layers of detection to provide redundancy and early warning. This defence-in-depth approach ensures that bypassing one sensor does not compromise the entire system.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Security Layers</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Perimeter Protection (Layer 1)</h4>
                  <p className="text-white text-sm">
                    Contact sensors on all entry points - doors and accessible windows. Triggers immediately upon opening, providing earliest warning of intrusion attempt.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Volumetric Detection (Layer 2)</h4>
                  <p className="text-white text-sm">
                    PIR sensors covering interior spaces. Detects movement if perimeter is bypassed (e.g., glass broken without triggering contact). Covers hallways, landings, and high-value rooms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Specific Protection (Layer 3)</h4>
                  <p className="text-white text-sm">
                    Glass break detectors, vibration sensors, and object protection for valuables. Provides targeted detection for specific threats.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Zone Configuration</h3>
              <p className="text-white">
                Smart security systems allow flexible zone configuration:
              </p>
              <ul className="space-y-2 text-white mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Away mode:</strong> All sensors active</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Night mode:</strong> Perimeter sensors active, interior PIR disabled for movement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Partial arming:</strong> Specific zones enabled based on occupancy</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* False Alarm Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Preventing False Alarms
          </h2>
          <div className="space-y-4 text-white">
            <p>
              False alarms reduce system reliability and user confidence. Proper installation and configuration minimises nuisance triggers.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Causes and Solutions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Contact Sensors</h4>
                  <ul className="text-white text-sm space-y-1 mt-1">
                    <li>- Loose mounting: Ensure firm adhesive or screw fixing</li>
                    <li>- Door/window warping: Check alignment and gap consistency</li>
                    <li>- Low battery: Replace promptly when warnings appear</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">PIR Sensors</h4>
                  <ul className="text-white text-sm space-y-1 mt-1">
                    <li>- Sunlight exposure: Reposition or use curtains/blinds</li>
                    <li>- Heat sources: Maintain distance from radiators and vents</li>
                    <li>- Moving objects: Avoid detection of swinging plants, curtains</li>
                    <li>- Insects: Use sealed housings to prevent spider webs inside</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Contact Sensors and PIR Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
            sectionId="section-3"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              CCTV Types and Storage
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-4">
              Remote Access and Alerts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section3;
