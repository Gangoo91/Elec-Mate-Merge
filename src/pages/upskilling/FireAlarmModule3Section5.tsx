import { ArrowLeft, ArrowRight, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A data centre requires very early warning of incipient fire to allow pre-action response. Which detection technology is most appropriate?",
    answer: "Aspirating smoke detection (ASD) is the most appropriate choice. It provides very early warning at the incipient stage, allows air sampling from under-floor voids and ceiling spaces, and can be designed to avoid false alarms while maintaining high sensitivity."
  },
  {
    question: "A Grade I listed building needs fire detection but the conservation officer has restricted visible cables and devices. What approaches might be suitable?",
    answer: "Consider aspirating detection with concealed sampling pipes, wireless detection systems, or discrete mounting with colour-matched devices. Coordinate with the conservation officer early in design to agree acceptable approaches that meet both fire safety and conservation requirements."
  },
  {
    question: "When would you choose flame detectors over smoke detectors?",
    answer: "Flame detectors are suited to fast-developing fires involving flammable liquids or gases, outdoor or high-airflow areas where smoke dissipates, and where very fast response is needed. They require line-of-sight to the fire location."
  }
];

const quizQuestions = [
  {
    question: "What is the primary advantage of aspirating smoke detection (ASD)?",
    options: ["Lower cost than point detectors", "Very early warning through continuous air sampling and high sensitivity", "No maintenance required", "Works without power"],
    correctAnswer: 1,
    explanation: "ASD provides very early warning by continuously sampling air through a pipe network and detecting smoke at much lower concentrations than point detectors."
  },
  {
    question: "When are flame detectors typically used?",
    options: ["In all buildings", "In environments where smoke may not be present or where very fast fire development is expected", "Only outdoors", "Never in the UK"],
    correctAnswer: 1,
    explanation: "Flame detectors are used for fast-developing fires involving flammable liquids/gases, or where smoke may dissipate before reaching conventional detectors (e.g., outdoor or high-airflow areas)."
  },
  {
    question: "What is the purpose of duct smoke detection?",
    options: ["Detect smoke outside the building", "Detect smoke being distributed through HVAC systems before it spreads to occupied areas", "Replace room detectors", "Monitor outdoor air quality"],
    correctAnswer: 1,
    explanation: "Duct detectors identify smoke being transported through HVAC systems, enabling early shutdown or smoke control before contamination spreads to occupied areas."
  },
  {
    question: "What special consideration applies to detection in dusty environments?",
    options: ["Standard smoke detectors work fine", "Use detectors designed for harsh environments with appropriate filtration or technology", "Detection is not required", "Only heat detectors are permitted"],
    correctAnswer: 1,
    explanation: "Dusty environments require detectors with appropriate filtration, shielding, or alternative technologies (e.g., beam detectors, heat detectors) to prevent false alarms and ensure reliable detection."
  },
  {
    question: "Why might heritage buildings require special detection approaches?",
    options: ["They do not need fire detection", "Conservation requirements may limit visible equipment and cable routes", "Only wireless systems are permitted", "BS 5839-1 does not apply"],
    correctAnswer: 1,
    explanation: "Heritage buildings often have conservation restrictions limiting visible cables and equipment; discrete mounting, wireless systems, or concealed detection may be needed."
  },
  {
    question: "What type of detection is often used in clean rooms and data centres?",
    options: ["Standard point smoke detectors only", "Aspirating smoke detection for very early warning without false alarms", "Heat detectors only", "No detection required"],
    correctAnswer: 1,
    explanation: "ASD is commonly used in clean rooms and data centres for very early warning while maintaining clean room standards and minimising false alarm risk."
  },
  {
    question: "How do optical beam detectors work?",
    options: ["Detecting heat only", "Transmitting an infrared beam between transmitter and receiver; smoke reduces received signal", "Using radioactive sources", "Sampling air through pipes"],
    correctAnswer: 1,
    explanation: "Beam detectors transmit an infrared beam between a transmitter and receiver; smoke particles scatter or absorb light, reducing the received signal and triggering an alarm."
  },
  {
    question: "What factor is critical when installing aspirating detection sampling pipes?",
    options: ["Pipe colour matching decor", "Correct sampling hole size and spacing to ensure representative air sampling", "Only vertical runs are permitted", "Pipes must be visible"],
    correctAnswer: 1,
    explanation: "Sampling hole size and spacing determine airflow balance and detection sensitivity; incorrect design leads to uneven sampling and missed or delayed detection."
  },
  {
    question: "When might linear heat detection (LHD) be used?",
    options: ["Only in cold stores", "Along cable runs, conveyors, or where detection over a linear path is more practical than point detection", "Only outdoors", "Never in modern buildings"],
    correctAnswer: 1,
    explanation: "Linear heat detection is well-suited to protecting cable trays, conveyors, tunnels, and other linear risks where discrete detection along the full length is needed."
  },
  {
    question: "What challenge do high-airflow environments present for smoke detection?",
    options: ["No challenges exist", "Smoke dilution may prevent detection or delay alarm significantly", "Only flame detectors work", "Heat detectors are faster in airflow"],
    correctAnswer: 1,
    explanation: "High airflow dilutes smoke, potentially preventing it from reaching detectors or significantly delaying alarm. Duct detection, ASD, or closer detector spacing may be needed."
  }
];

const faqs = [
  {
    question: "Can ASD replace conventional point detection?",
    answer: "Yes - ASD can provide equivalent or superior coverage. Design must follow EN 54-20 and manufacturer guidance. A single ASD unit can replace multiple point detectors in appropriate applications."
  },
  {
    question: "Do flame detectors work in all fire scenarios?",
    answer: "No - flame detectors require line-of-sight and are best suited to fast-developing fires with visible flames. They may not detect smouldering fires before visible flame develops."
  },
  {
    question: "How often should ASD be maintained?",
    answer: "Follow manufacturer guidance and BS 5839-1 recommendations. Typically annual service with periodic filter replacement and flow verification."
  },
  {
    question: "Can wireless detectors be used in heritage buildings?",
    answer: "Yes - wireless systems can reduce visible cabling. Ensure adequate radio coverage and follow manufacturer guidance for battery replacement and signal monitoring."
  },
  {
    question: "What testing is needed for duct detectors?",
    answer: "Regular functional testing using approved test methods (smoke simulation or detector removal for test). Verify HVAC interface actions operate correctly."
  },
  {
    question: "How do I specify detection for a cold store?",
    answer: "Consider LHD rated for low temperatures, or point detectors rated for the temperature range. Standard smoke detectors may not function reliably at very low temperatures."
  }
];

const FireAlarmModule3Section5 = () => {
  useSEO({
    title: "Special Applications - Fire Alarm Course",
    description: "BS 5839-1 special applications: aspirating detection, flame detectors, duct detection, special environments, and heritage building considerations."
  });

  return (
    <div className="bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-white hover:text-elec-yellow">
            <Link to="/electrician/upskilling/fire-alarm-course/module-3">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module</span>
            </Link>
          </Button>
          <span className="text-sm text-white">Section 5 of 6</span>
        </div>
      </header>

      <main className="px-4 py-8 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Wrench className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Special Applications</h1>
          <p className="text-white">Specialist detection technologies and challenging environments including ASD, flame detectors, and heritage buildings</p>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Explain aspirating smoke detection principles and applications</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Select appropriate detection for special hazards (flame, beam, LHD)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Design for challenging environments (dusty, cold, high-airflow)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Address heritage building detection requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Apply duct detection for HVAC smoke control</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Integrate specialist detection with conventional systems</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Aspirating Smoke Detection (ASD) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Aspirating Smoke Detection (ASD)
          </h2>
          <div className="space-y-4 text-white">
            <p>
              ASD continuously samples air through a pipe network, providing very early warning of fire development at much lower smoke concentrations than point detectors.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">ASD Characteristics</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Very early warning:</strong> detects smoke at much lower concentrations than point detectors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Sampling network:</strong> pipes with calibrated holes draw air to central detector</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>High-value protection:</strong> data centres, clean rooms, heritage buildings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>EN 54-20:</strong> specifies sensitivity classes (A, B, C) for different applications</span>
                </li>
              </ul>
            </div>

            <p>
              ASD is ideal for environments where very early warning allows pre-action response, protecting high-value assets before significant damage occurs.
            </p>
          </div>
        </section>

        {/* Section 02: Flame Detectors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Flame Detectors
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Flame detectors respond to the electromagnetic radiation emitted by flames, providing very fast detection for certain fire types.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Flame Detector Types</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>IR (Infrared):</strong> detects infrared radiation from flames</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>UV (Ultraviolet):</strong> responds to UV radiation from flames</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Multi-spectrum:</strong> combines IR and UV for reduced false alarms</span>
                </li>
              </ul>
            </div>

            <p>
              Flame detectors require line-of-sight to the fire location and are suited to fast-developing fires involving flammable liquids or gases.
            </p>
          </div>
        </section>

        {/* Section 03: Optical Beam Detectors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Optical Beam Detectors
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Beam detectors use infrared beams to detect smoke across large areas. Smoke particles scatter or absorb the light, reducing the signal at the receiver.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Beam Detector Applications</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>High ceilings:</strong> warehouses, atriums, churches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Large open areas:</strong> exhibition halls, sports facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Maintenance access:</strong> easier than point detectors at height</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Mounting:</strong> requires stable mounting to prevent drift</span>
                </li>
              </ul>
            </div>

            <p>
              Beam detectors can span up to 100 metres and are effective at heights where point detectors would be impractical to access.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[0].question}
          answer={quickCheckQuestions[0].answer}
        />

        {/* Section 04: Linear Heat Detection (LHD) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Linear Heat Detection (LHD)
          </h2>
          <div className="space-y-4 text-white">
            <p>
              LHD uses continuous sensing cables to detect heat along their length, ideal for protecting linear risks where point detection would be impractical.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">LHD Applications</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Cable trays:</strong> protecting cable routes from fire spread</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Conveyors:</strong> industrial process monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Tunnels:</strong> road and rail tunnel protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Cold stores:</strong> withstands low temperatures where point detectors may fail</span>
                </li>
              </ul>
            </div>

            <p>
              LHD provides detection over the full length of the cable, ensuring that any fire along the protected route triggers an alarm.
            </p>
          </div>
        </section>

        {/* Section 05: Duct Smoke Detection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Duct Smoke Detection
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Duct detectors monitor HVAC systems to identify smoke being transported through ductwork, preventing smoke distribution to occupied areas.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Duct Detection Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Sampling tubes:</strong> extend across duct cross-section</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Airflow:</strong> minimum and maximum airflow rates apply</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Actions:</strong> HVAC shutdown, damper closure, or smoke control mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Access:</strong> ensure maintenance access for testing</span>
                </li>
              </ul>
            </div>

            <p>
              Duct detectors can trigger HVAC shutdown or smoke control activation, preventing smoke from spreading through the ventilation system.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[1].question}
          answer={quickCheckQuestions[1].answer}
        />

        {/* Section 06: Challenging Environments */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Challenging Environments
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Special consideration is needed for harsh or unusual conditions where standard detection may not be suitable.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Environment Solutions</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Dusty:</strong> filtered detectors, beam detectors, or heat detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Cold stores:</strong> LHD or specially rated detectors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>High-airflow:</strong> duct detection, ASD, or increased detector density</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Outdoor:</strong> weatherproof housings, flame detectors, or beam detectors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Explosive:</strong> ATEX/IECEx rated equipment for hazardous areas</span>
                </li>
              </ul>
            </div>

            <p>
              Always verify detector ratings match the environmental conditions. Standard detectors may fail or generate false alarms in extreme environments.
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
                <span>For ASD, involve the manufacturer early to ensure correct pipe design and sensitivity settings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Engage conservation officers early for heritage buildings to agree detection approach</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Document special detector justifications and maintenance requirements clearly</span>
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
                <span>Specifying ASD without proper pipe network design calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Forgetting maintenance access for duct detectors in ceiling voids</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Using standard detectors in environments requiring specialist solutions</span>
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
            title="Special Applications Knowledge Check"
            questions={quizQuestions}
            moduleTitle="Special Applications"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-4">
              <ArrowLeft className="h-4 w-4" />
              Previous: Detector Spacing & Coverage
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-6">
              Next: Cause & Effect Design
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default FireAlarmModule3Section5;
