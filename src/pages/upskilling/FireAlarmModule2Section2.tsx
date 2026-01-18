import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Detectors - Fire Alarm Module 2 Section 2";
const DESCRIPTION = "Learn about fixed temperature and rate-of-rise heat detectors, BS 5839-1 classifications, siting requirements, and appropriate applications.";

const quickCheckQuestions = [
  {
    id: "heat-detector-kitchen",
    question: "A commercial kitchen requires fire detection but smoke detectors cause constant false alarms. What detector type should you specify?",
    options: [
      "Optical smoke detector with higher sensitivity setting",
      "Rate-of-rise heat detector (A1R)",
      "Ionisation smoke detector",
      "Beam detector"
    ],
    correctIndex: 1,
    explanation: "Rate-of-rise heat detectors (A1R) are ideal for kitchens - they respond to rapid temperature increases from fire but are unaffected by cooking fumes and steam."
  },
  {
    id: "heat-detector-boiler",
    question: "A boiler room has ambient temperatures up to 45 degrees Celsius. What detector type and rating would you specify?",
    options: [
      "Rate-of-rise heat detector (A1R) with standard rating",
      "Optical smoke detector",
      "Fixed temperature heat detector (A1S) with 78 degree rating",
      "Any smoke detector"
    ],
    correctIndex: 2,
    explanation: "Fixed temperature heat detector (A1S) with 78 degrees Celsius rating - at least 25 degrees above maximum ambient (45 + 25 = 70, so 78 degrees). Rate-of-rise could false alarm from normal boiler cycling."
  },
  {
    id: "heat-detector-sleeping",
    question: "Why should heat detectors NOT be used in sleeping accommodation?",
    options: [
      "They are too expensive",
      "They respond too slowly to provide adequate warning time for sleeping occupants",
      "They cause too many false alarms",
      "BS 5839-1 prohibits their use anywhere"
    ],
    correctIndex: 1,
    explanation: "Heat detectors respond later than smoke detectors because fire must be more developed to generate significant heat, potentially not providing enough warning time for sleeping occupants to evacuate safely."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Where would you typically use a rate-of-rise heat detector?",
    options: ["Office", "Kitchen", "Escape route", "Hotel bedroom"],
    correctAnswer: 1,
    explanation: "Rate-of-rise heat detectors suit kitchens and similar areas where smoke detection would cause false alarms from cooking fumes."
  },
  {
    id: 2,
    question: "Which detector classification indicates a rate-of-rise heat detector?",
    options: ["A1S", "A1R", "CS", "BR"],
    correctAnswer: 1,
    explanation: "A1R indicates a Class A1 rate-of-rise heat detector. The R suffix denotes rate-of-rise functionality."
  },
  {
    id: 3,
    question: "What is the typical maximum coverage radius for a heat detector (Class A1)?",
    options: ["3.0 m", "5.3 m", "7.5 m", "10.0 m"],
    correctAnswer: 1,
    explanation: "Class A1 heat detectors typically have a maximum coverage radius of 5.3 m under BS 5839-1, compared to 7.5 m for smoke detectors."
  },
  {
    id: 4,
    question: "What is the primary disadvantage of heat detectors compared to smoke detectors?",
    options: [
      "Higher cost",
      "Slower response time - fire must be more developed",
      "More prone to false alarms",
      "Require more maintenance"
    ],
    correctAnswer: 1,
    explanation: "Heat detectors only respond once significant heat is generated, meaning the fire must be more developed before detection occurs."
  },
  {
    id: 5,
    question: "At what temperature does a typical fixed temperature heat detector activate?",
    options: ["47 degrees Celsius", "57 degrees Celsius", "67 degrees Celsius", "77 degrees Celsius"],
    correctAnswer: 1,
    explanation: "Most fixed temperature heat detectors activate at around 57 degrees Celsius, though higher ratings are available for warmer environments."
  },
  {
    id: 6,
    question: "Why should heat detectors NOT be used in sleeping accommodation?",
    options: [
      "They are too expensive",
      "They respond too slowly to provide adequate warning time",
      "They cause false alarms",
      "BS 5839-1 prohibits their use"
    ],
    correctAnswer: 1,
    explanation: "Heat detectors respond later than smoke detectors, potentially not providing enough warning time for sleeping occupants to evacuate safely."
  },
  {
    id: 7,
    question: "What does the S suffix indicate in heat detector classification (e.g., A1S)?",
    options: [
      "Special application",
      "Static/fixed temperature only",
      "High sensitivity",
      "Standard rating"
    ],
    correctAnswer: 1,
    explanation: "The S suffix indicates a static (fixed temperature) heat detector that activates at a set threshold temperature."
  },
  {
    id: 8,
    question: "Which heat detector type combines both fixed temperature and rate-of-rise sensing?",
    options: [
      "Class A1S",
      "Class A1R",
      "Combined A1S/A1R",
      "Multisensor"
    ],
    correctAnswer: 2,
    explanation: "Combined detectors (A1S/A1R) incorporate both sensing methods, providing both rate-of-rise and fixed maximum temperature activation."
  },
  {
    id: 9,
    question: "In which environment would a higher temperature rating heat detector be appropriate?",
    options: [
      "Office space",
      "Boiler room",
      "Corridor",
      "Bedroom"
    ],
    correctAnswer: 1,
    explanation: "Boiler rooms and similar hot environments require higher temperature rating detectors to avoid false alarms from normal ambient temperatures."
  },
  {
    id: 10,
    question: "What is a key advantage of heat detectors over smoke detectors?",
    options: [
      "Faster response time",
      "Not affected by dust, steam, or fumes",
      "Greater coverage area",
      "Lower installation cost"
    ],
    correctAnswer: 1,
    explanation: "Heat detectors are unaffected by dust, steam, aerosols, and fumes that would cause false alarms with smoke detectors."
  }
];

const faqs = [
  {
    question: "Can I use heat detectors in escape routes?",
    answer: "Generally no - smoke detectors are required on escape routes for early warning. Heat detectors may supplement but not replace smoke detection."
  },
  {
    question: "What if a kitchen opens directly onto a corridor?",
    answer: "Use heat detection in the kitchen and smoke detection in the corridor. Consider a multisensor at the transition point."
  },
  {
    question: "How do I choose between A1 and A2 class?",
    answer: "A1 is the fastest response and most commonly specified. A2 may be used where slightly slower response is acceptable."
  },
  {
    question: "Can heat detectors be used with addressable systems?",
    answer: "Yes - addressable heat detectors are available and recommended for larger installations to identify exact device locations."
  },
  {
    question: "Do heat detectors require regular testing?",
    answer: "Yes - weekly functional testing on rotation and annual servicing including thermal response testing per BS 5839-1."
  },
  {
    question: "What is the maximum ceiling height for heat detectors?",
    answer: "BS 5839-1 recommends Class A1/A2 heat detectors up to 9 m ceiling height. Above this, consider linear heat detection or other solutions."
  }
];

const FireAlarmModule2Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-2">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Detectors
          </h1>
          <p className="text-white">
            Understanding fixed temperature and rate-of-rise heat detector technologies per BS 5839-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fixed temperature (S):</strong> Activates at set threshold (typically 57 degrees)</li>
              <li><strong>Rate-of-rise (R):</strong> Activates on rapid temperature increase</li>
              <li><strong>5.3 m coverage radius:</strong> Less than smoke detectors</li>
              <li><strong>Best for:</strong> Kitchens, boiler rooms, dusty areas</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Kitchen = Rate-of-rise (A1R)</li>
              <li><strong>Use:</strong> Boiler room = Fixed temp (A1S) higher rating</li>
              <li><strong>Avoid:</strong> Sleeping areas - use smoke detection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how fixed temperature heat detectors work",
              "Explain how rate-of-rise heat detectors work",
              "Interpret BS 5839-1 heat detector classifications",
              "Apply heat detector siting and spacing requirements",
              "Select appropriate heat detector types for different environments",
              "Understand limitations compared to smoke detection"
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

        {/* Section 01: Introduction to Heat Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Introduction to Heat Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat detectors respond to elevated temperatures rather than smoke particles. They are ideal for environments where smoke detectors would cause false alarms, such as kitchens, boiler rooms, and dusty workshops.
            </p>
            <p>
              The key trade-off is response time - a fire must be more developed to generate sufficient heat, meaning heat detectors provide less early warning than smoke detectors.
            </p>

            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> Heat detectors should NOT be used as the primary detection in sleeping accommodation due to slower response times. Smoke detectors are essential for life safety in sleeping risk areas.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Fixed Temperature (Static) Detectors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Fixed Temperature (Static) Detectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Activates when the surrounding air temperature reaches a predetermined threshold. The most common rating is 57 degrees Celsius, though higher ratings (78 degrees, 90 degrees) are available for warmer environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Classification Suffix: S (Static)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A1S:</strong> Class A1 fixed temperature - fastest response</li>
                <li><strong>A2S:</strong> Class A2 fixed temperature</li>
                <li><strong>BS, CS, DS:</strong> Other classes with varying response times</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Typical Applications:</strong> Boiler rooms, laundries, areas with normally elevated temperatures, or environments with fluctuating temperatures where rate-of-rise would false alarm.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Rate-of-Rise Detectors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Rate-of-Rise Detectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Activates when temperature increases rapidly - typically 6-8 degrees per minute. This responds faster than fixed temperature detection to developing fires where temperature rises quickly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Classification Suffix: R (Rate-of-rise)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A1R:</strong> Class A1 rate-of-rise - fastest response</li>
                <li>Responds to rapid temperature changes from fire</li>
                <li>Faster response than fixed temperature in most fire scenarios</li>
                <li>May include fixed temperature backup element</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Typical Applications:</strong> Kitchens, garages, workshops - areas where temperature normally remains stable but smoke detection would cause false alarms from fumes or dust.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: BS 5839-1 Classifications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            BS 5839-1 Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat detectors are classified by their response characteristics under BS EN 54-5. Understanding classifications helps specify the right detector for each application.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 pr-4 text-white font-medium">Class</th>
                    <th className="text-left py-2 pr-4 text-white font-medium">Response Time</th>
                    <th className="text-left py-2 text-white font-medium">Coverage Radius</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-elec-yellow font-medium">A1</td>
                    <td className="py-2 pr-4">Fastest</td>
                    <td className="py-2">5.3 m</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-elec-yellow font-medium">A2</td>
                    <td className="py-2 pr-4">Very fast</td>
                    <td className="py-2">5.3 m</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-elec-yellow font-medium">B</td>
                    <td className="py-2 pr-4">Fast</td>
                    <td className="py-2">5.3 m</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-elec-yellow font-medium">C</td>
                    <td className="py-2 pr-4">Standard</td>
                    <td className="py-2">5.3 m</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-elec-yellow font-medium">D, E, F, G</td>
                    <td className="py-2 pr-4">Slower (special use)</td>
                    <td className="py-2">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Class A1 and A2 are most commonly specified for fire alarm systems in the UK. Always specify at least Class A1 or A2 unless there is a specific reason for slower response.
            </p>
          </div>
        </section>

        {/* Section 05: Siting and Spacing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Siting and Spacing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat detectors have smaller coverage areas than smoke detectors because heat dissipates more rapidly than smoke spreads.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Requirements (BS 5839-1):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Coverage radius:</strong> 5.3 m for Class A1/A2 (flat ceiling)</li>
                <li><strong>Distance from walls:</strong> Minimum 500 mm</li>
                <li><strong>Ceiling mounting:</strong> 25-150 mm below apex for pitched roofs</li>
                <li><strong>Temperature rating:</strong> Select appropriate for ambient conditions</li>
                <li><strong>Maximum ceiling height:</strong> 9 m for Class A1/A2</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Temperature Rating Selection:</strong> Choose detector temperature rating at least 25 degrees above maximum expected ambient temperature to prevent false alarms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Application Guidelines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Application Guidelines
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting between fixed temperature and rate-of-rise depends on the environment characteristics and how temperature normally varies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400 mb-2">Rate-of-Rise (A1R) Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Kitchens and cooking areas</li>
                  <li>Garages and vehicle areas</li>
                  <li>Workshops (stable temperature)</li>
                  <li>Storage areas</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400 mb-2">Fixed Temperature (A1S) Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Boiler rooms</li>
                  <li>Laundries</li>
                  <li>Areas with fluctuating temperatures</li>
                  <li>Hot process environments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Combined detectors (A1S/A1R) provide both rate-of-rise response and fixed temperature backup - consider these for versatility</li>
                <li>Always document the rationale for heat detector selection over smoke detection in design documentation</li>
                <li>Consider multisensor detectors as an alternative where both types might be appropriate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using heat detectors in sleeping accommodation:</strong> Smoke detectors are required for adequate warning time</li>
                <li><strong>Temperature rating too close to ambient:</strong> Causes false alarms - allow 25 degree margin minimum</li>
                <li><strong>Using rate-of-rise in areas with rapid legitimate temperature changes:</strong> Will cause false alarms when heating cycles</li>
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
                <p className="font-medium text-white mb-1">Detector Type Selection</p>
                <ul className="space-y-0.5">
                  <li>A1R = Rate-of-rise (kitchens)</li>
                  <li>A1S = Fixed temperature (boiler rooms)</li>
                  <li>A1S/A1R = Combined (versatile)</li>
                  <li>Higher temp rating = Hot environments</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Measurements</p>
                <ul className="space-y-0.5">
                  <li>Coverage radius = 5.3 m (Class A1/A2)</li>
                  <li>Wall clearance = 500 mm minimum</li>
                  <li>Max ceiling height = 9 m</li>
                  <li>Temp margin = 25 degrees above ambient</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule2Section2;
