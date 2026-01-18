import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smoke Detectors - Fire Alarm Module 2 Section 1";
const DESCRIPTION = "Learn about optical and ionisation smoke detectors, operating principles, siting requirements, and BS 5839-1 compliance for fire alarm systems.";

const quickCheckQuestions = [
  {
    id: "smoke-detector-bedroom",
    question: "A hotel bedroom requires smoke detection. Which detector type is most appropriate and why?",
    options: [
      "Ionisation detector - faster response to all fire types",
      "Optical detector - better for smouldering fires and less prone to false alarms",
      "Heat detector - immune to smoke-related false alarms",
      "Beam detector - covers larger areas efficiently"
    ],
    correctIndex: 1,
    explanation: "Optical (photoelectric) detectors are recommended for sleeping areas because they respond better to smouldering fires (common in bedrooms from cigarettes, bedding), are less prone to false alarms from cooking fumes, and have no radioactive disposal concerns."
  },
  {
    id: "smoke-detector-ceiling-height",
    question: "A warehouse has 12 m high ceilings. Can you use point smoke detectors?",
    options: [
      "Yes - point detectors work at any ceiling height",
      "No - BS 5839-1 recommends point smoke detectors up to 10.5 m only",
      "Yes - but you need to double the number of detectors",
      "No - smoke detectors are not allowed in warehouses"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 recommends point smoke detectors up to 10.5 m ceiling height. For 12 m ceilings, consider beam detectors or aspirating smoke detection (ASD) systems which are designed for high spaces."
  },
  {
    id: "smoke-detector-coverage",
    question: "What is the typical maximum coverage radius for a smoke detector on a flat ceiling?",
    options: [
      "5.0 m",
      "7.5 m",
      "10.0 m",
      "12.5 m"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 typically specifies 7.5 m radius coverage for smoke detectors on flat ceilings. This should be reduced for obstructions, beams, and room geometry considerations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which smoke detector type is better for smouldering fires?",
    options: ["Optical (Photoelectric)", "Ionisation", "Heat - Fixed Temperature", "Beam"],
    correctAnswer: 0,
    explanation: "Optical detectors are more responsive to larger smoke particles from smouldering fires, making them ideal for bedrooms and escape routes."
  },
  {
    id: 2,
    question: "Which smoke detector type is more prone to nuisance alarms from cooking fumes?",
    options: ["Optical (Photoelectric)", "Ionisation", "Multisensor", "Beam"],
    correctAnswer: 1,
    explanation: "Ionisation detectors are more susceptible to nuisance alarms from cooking fumes and steam due to their sensitivity to smaller particles."
  },
  {
    id: 3,
    question: "What is the typical maximum coverage radius for a smoke detector on a flat ceiling?",
    options: ["5.0 m", "7.5 m", "10.0 m", "12.5 m"],
    correctAnswer: 1,
    explanation: "BS 5839-1 typically specifies 7.5 m radius coverage for smoke detectors, though this should be reduced for obstructions and room geometry."
  },
  {
    id: 4,
    question: "What minimum distance should smoke detectors be mounted from walls?",
    options: ["100 mm", "300 mm", "500 mm", "600 mm"],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends smoke detectors should be at least 500 mm from walls to avoid dead air spaces where smoke may not reach."
  },
  {
    id: 5,
    question: "How does an optical smoke detector work?",
    options: [
      "By ionising air particles with a radioactive source",
      "By measuring temperature rise",
      "By detecting light scattered by smoke particles in a chamber",
      "By detecting infrared beam interruption"
    ],
    correctAnswer: 2,
    explanation: "Optical detectors use a light source and photosensor - when smoke enters the chamber, particles scatter the light onto the sensor, triggering the alarm."
  },
  {
    id: 6,
    question: "In a sleeping risk area, which detector type is most appropriate?",
    options: ["Heat detector (fixed temperature)", "Optical smoke detector", "Ionisation smoke detector", "Beam detector"],
    correctAnswer: 1,
    explanation: "Optical smoke detectors provide the fastest response to smouldering fires common in bedrooms and are recommended for sleeping risk areas."
  },
  {
    id: 7,
    question: "Which detector type should be avoided in dusty environments?",
    options: [
      "Fixed temperature heat detector",
      "Rate-of-rise heat detector",
      "Optical smoke detector",
      "All smoke detectors (both ionisation and optical)"
    ],
    correctAnswer: 3,
    explanation: "Both ionisation and optical smoke detectors can be affected by dust, leading to false alarms. Heat detectors are preferred in dusty environments."
  },
  {
    id: 8,
    question: "What is thermal stratification and why does it affect smoke detectors?",
    options: [
      "Hot air rises and can prevent smoke reaching ceiling detectors",
      "Cold air sinking improves detector response",
      "A method of cooling detectors",
      "The way detectors are manufactured"
    ],
    correctAnswer: 0,
    explanation: "Thermal stratification occurs when hot air forms a layer below the ceiling, preventing smoke from reaching detectors. This is important in high spaces."
  },
  {
    id: 9,
    question: "Why are ionisation detectors becoming less common in the UK?",
    options: [
      "They are more expensive",
      "They contain radioactive material requiring special disposal",
      "They do not work with addressable systems",
      "They require more maintenance"
    ],
    correctAnswer: 1,
    explanation: "Ionisation detectors contain a small radioactive source (Americium-241) which requires special handling and disposal, leading many to prefer optical types."
  },
  {
    id: 10,
    question: "What is the recommended maximum ceiling height for point smoke detectors?",
    options: ["6 m", "9 m", "10.5 m", "12 m"],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends point smoke detectors up to 10.5 m ceiling height. Above this, beam or aspirating detection may be more appropriate."
  }
];

const faqs = [
  {
    question: "Can I mix optical and ionisation detectors in the same system?",
    answer: "Yes - you can use different detector types in different zones based on the environment. An addressable system will identify each detector individually."
  },
  {
    question: "How often should smoke detectors be tested?",
    answer: "BS 5839-1 requires weekly functional testing on a rotation basis, plus annual servicing including smoke response testing."
  },
  {
    question: "What if a room has both cooking and sleeping?",
    answer: "Consider a multisensor detector with adjustable sensitivity, or heat detection near cooking with smoke detection for sleeping areas."
  },
  {
    question: "Do all smoke detectors need to be addressable?",
    answer: "Not for conventional systems, but addressable detectors are recommended for larger buildings to quickly identify the activated device location."
  },
  {
    question: "How do I dispose of ionisation detectors?",
    answer: "Return to the manufacturer or a licensed radioactive waste disposal company. Never dispose of in general waste."
  },
  {
    question: "Can smoke detectors be painted?",
    answer: "No - painting can block the sensing chamber entry and significantly reduce sensitivity. Replace with colour-matched detectors if aesthetics are important."
  }
];

const FireAlarmModule2Section1 = () => {
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
            <Wind className="h-4 w-4" />
            <span>Module 2 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smoke Detectors
          </h1>
          <p className="text-white">
            Understanding optical and ionisation smoke detector technologies per BS 5839-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Optical detectors:</strong> Best for smouldering fires, less prone to cooking fumes</li>
              <li><strong>Ionisation detectors:</strong> Faster to flaming fires but more false alarms</li>
              <li><strong>7.5 m typical coverage:</strong> Maintain 500 mm from walls</li>
              <li><strong>10.5 m max ceiling height:</strong> For point smoke detectors</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Bedroom = Optical detector</li>
              <li><strong>Use:</strong> Avoid smoke detectors in kitchens/dusty areas</li>
              <li><strong>Apply:</strong> Consider stratification in high ceilings</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how optical (photoelectric) smoke detectors work",
              "Explain how ionisation smoke detectors work",
              "Compare advantages and limitations of each detector type",
              "Apply BS 5839-1 siting and spacing requirements",
              "Select the appropriate smoke detector type for different environments",
              "Identify common causes of false alarms and mitigation strategies"
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

        {/* Section 01: Introduction to Smoke Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Introduction to Smoke Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smoke detectors are the most common type of automatic fire detector, designed to provide early warning by detecting smoke particles before a fire develops significantly.
            </p>
            <p>
              Under BS 5839-1, smoke detectors are essential for L category (life safety) systems, particularly in escape routes and sleeping accommodation where early detection is critical for safe evacuation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Two Main Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Optical (Photoelectric):</strong> Uses light scattering to detect smoke</li>
                <li><strong>Ionisation:</strong> Uses radioactive source to detect smoke particles</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Optical (Photoelectric) Smoke Detectors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Optical (Photoelectric) Smoke Detectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An optical detector contains a light source (LED) and a photosensor arranged so that light does not normally reach the sensor. When smoke enters the chamber, particles scatter the light onto the photosensor, triggering the alarm.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Best for smouldering fires with large smoke particles</li>
                <li>Less prone to false alarms from cooking fumes</li>
                <li>No radioactive components - easier disposal</li>
                <li>Recommended for sleeping accommodation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Typical Applications:</strong> Bedrooms, hotel rooms, escape routes, offices, corridors - anywhere early detection of smouldering fires is important.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Ionisation Smoke Detectors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Ionisation Smoke Detectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contains a small radioactive source (Americium-241) that ionises the air between two electrodes. When smoke enters, it disrupts the ion flow, changing the current and triggering the alarm.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Responds faster to fast-flaming fires</li>
                <li>More sensitive to smaller smoke particles</li>
                <li>More prone to false alarms from cooking/steam</li>
                <li>Contains radioactive material - special disposal required</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> Ionisation detectors are becoming less common in the UK due to disposal requirements and nuisance alarm susceptibility. Many specifiers now default to optical types.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Siting and Spacing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Siting and Spacing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 provides specific guidance on smoke detector positioning to ensure effective coverage whilst avoiding false alarm sources.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Requirements (BS 5839-1):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Coverage radius:</strong> 7.5 m typical (flat ceiling)</li>
                <li><strong>Distance from walls:</strong> Minimum 500 mm</li>
                <li><strong>Maximum ceiling height:</strong> 10.5 m for point detectors</li>
                <li><strong>Distance from light fittings:</strong> Minimum 500 mm</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Note:</strong> Coverage must be reduced where beams, partitions, or obstructions affect smoke flow. Always consider room geometry when positioning detectors.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Environmental Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Environmental Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right smoke detector requires consideration of the environment and potential false alarm sources.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400 mb-2">Suitable Environments</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Offices and workspaces</li>
                  <li>Bedrooms and hotel rooms</li>
                  <li>Corridors and escape routes</li>
                  <li>Storage areas (clean)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400 mb-2">Avoid or Use Caution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Kitchens (use heat detectors)</li>
                  <li>Bathrooms with steam</li>
                  <li>Dusty environments</li>
                  <li>Near air diffusers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: False Alarm Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            False Alarm Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              False alarms undermine confidence and can lead to dangerous complacency. Proper detector selection and siting are essential for reliable operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Mitigation Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose optical over ionisation near cooking areas</li>
                <li>Position away from air diffusers and vents</li>
                <li>Consider multisensor detectors for variable environments</li>
                <li>Regular maintenance and cleaning schedules</li>
                <li>Use heat detectors where smoke detection is inappropriate</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Default to optical detectors for most applications - they offer the best balance of sensitivity and false alarm resistance</li>
                <li>Always check ceiling height and adjust detector type selection accordingly - stratification affects smoke reaching detectors</li>
                <li>Document your detector selection rationale in the design documentation for future reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using smoke detectors in kitchens:</strong> This will cause repeated false alarms</li>
                <li><strong>Mounting too close to walls:</strong> Detectors in corners experience dead air pockets</li>
                <li><strong>Ignoring ceiling height:</strong> Point detectors above 10.5 m may not detect smoke effectively</li>
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
                  <li>Optical = Smouldering fires, bedrooms</li>
                  <li>Ionisation = Flaming fires (less common now)</li>
                  <li>Multisensor = Variable environments</li>
                  <li>Heat = Kitchens, dusty areas</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Measurements</p>
                <ul className="space-y-0.5">
                  <li>Coverage radius = 7.5 m typical</li>
                  <li>Wall clearance = 500 mm minimum</li>
                  <li>Max ceiling height = 10.5 m</li>
                  <li>Light fitting clearance = 500 mm</li>
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
            <Link to="/electrician/upskilling/fire-alarm-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule2Section1;
