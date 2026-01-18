import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Zone Planning Principles - Fire Alarm Module 3 Section 1";
const DESCRIPTION = "Learn BS 5839-1 zone planning principles including fire compartment alignment, zone size limits, search distances, and zone plan requirements.";

const quickCheckQuestions = [
  {
    id: "zone-area-limit",
    question: "What is the typical maximum area for a single detection zone under BS 5839-1?",
    options: [
      "500 m²",
      "1000 m²",
      "2000 m²",
      "No limit specified"
    ],
    correctIndex: 2,
    explanation: "BS 5839-1 typically limits a zone to about 2000 m² to support quick location of alarms and effective emergency response."
  },
  {
    id: "compartment-alignment",
    question: "Why should detection zones align with fire compartment boundaries?",
    options: [
      "To simplify cable installation",
      "To reduce equipment costs",
      "To aid firefighting and evacuation by matching building fire strategy",
      "To improve aesthetic appearance"
    ],
    correctIndex: 2,
    explanation: "Zones that follow fire compartments make it faster to understand fire spread and enable more effective emergency response."
  },
  {
    id: "search-distance",
    question: "What is the typical maximum initial search distance within a zone?",
    options: [
      "10 metres",
      "20 metres",
      "30 metres",
      "60 metres"
    ],
    correctIndex: 2,
    explanation: "Limiting search distance to about 30 metres helps responders find the alarm source quickly without extensive searching."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a common maximum area for a detection zone under BS 5839-1?",
    options: ["500 m²", "1000 m²", "2000 m²", "No limit"],
    correctAnswer: 2,
    explanation: "BS 5839-1 typically limits a zone to about 2000 m² to support quick location of alarms."
  },
  {
    id: 2,
    question: "Why should zones align with fire compartments?",
    options: ["For decoration", "To simplify cabling", "To aid firefighting and evacuation by matching building fabric", "To reduce device count"],
    correctAnswer: 2,
    explanation: "Zones that follow fire compartments make it faster to understand fire spread and respond safely."
  },
  {
    id: 3,
    question: "What is the typical maximum initial search distance within a zone?",
    options: ["10 m", "20 m", "30 m", "60 m"],
    correctAnswer: 2,
    explanation: "Limiting search distance to about 30 m helps responders find the alarm source quickly."
  },
  {
    id: 4,
    question: "How should vertical shafts (stairs/lifts) be zoned?",
    options: ["As part of adjacent rooms", "As a distinct zone per vertical shaft", "Combine all shafts into one zone", "Never zoned"],
    correctAnswer: 1,
    explanation: "Stair/lift shafts are typically separate zones to reflect vertical risk and aid response."
  },
  {
    id: 5,
    question: "What must be provided at the CIE relating to zones?",
    options: ["A random sketch", "No drawing is needed", "A clear zone plan with 'You are here', orientation and boundaries", "Only a device list"],
    correctAnswer: 2,
    explanation: "Provide a legible, oriented zone plan located at the control and indicating equipment."
  },
  {
    id: 6,
    question: "What is the minimum general recommendation for zones per storey?",
    options: ["No zoning required", "At least one zone per floor", "Multiple storeys can share one zone", "Only ground floor needs zones"],
    correctAnswer: 1,
    explanation: "BS 5839-1 generally recommends at least one zone per storey as a minimum, with large floors subdivided further."
  },
  {
    id: 7,
    question: "Why should plant rooms typically be separate zones?",
    options: ["To save money", "They are low risk areas", "To enable quick identification of high-risk areas requiring immediate attention", "Plant rooms do not need detection"],
    correctAnswer: 2,
    explanation: "Plant rooms often contain high-risk equipment and warrant separate zoning for rapid response and clear indication."
  },
  {
    id: 8,
    question: "What should happen to zone plans after building alterations?",
    options: ["Leave them unchanged", "Update them and record changes in the logbook", "Remove them entirely", "Only update every 5 years"],
    correctAnswer: 1,
    explanation: "Zone plans must be kept up to date after alterations, with changes recorded in the system logbook for compliance and safety."
  },
  {
    id: 9,
    question: "How should zone identification labels be chosen?",
    options: ["Random numbers", "Cryptic codes only the installer knows", "Clear names matching drawings and signage", "Leave them as factory defaults"],
    correctAnswer: 2,
    explanation: "Zone labels must be clear and consistent across panel displays, drawings, and site signage so responders instantly understand locations."
  },
  {
    id: 10,
    question: "What is a key problem with zones that cross fire compartment boundaries?",
    options: ["It saves cable runs", "It confuses responders and undermines compartmentation strategy", "It increases device count", "It improves aesthetics"],
    correctAnswer: 1,
    explanation: "Zones crossing compartment boundaries create confusion about fire location and undermine the building fire containment strategy."
  }
];

const faqs = [
  {
    question: "Can a zone span multiple floors?",
    answer: "Generally no - BS 5839-1 recommends at least one zone per floor. Vertical shafts (stairs/lifts) are exceptions as they inherently span multiple levels."
  },
  {
    question: "How do voids affect zone planning?",
    answer: "Ceiling voids should be zoned where they are protected spaces or contain significant fire risk/cabling. Ensure void detection indications make sense to responders."
  },
  {
    question: "What if the building layout changes after installation?",
    answer: "Zone plans must be updated and changes recorded in the logbook. Detector positions may need review to ensure coverage remains compliant."
  },
  {
    question: "Should plant rooms always be separate zones?",
    answer: "Generally yes - plant rooms often contain high-risk equipment and separate zoning enables rapid identification and targeted response."
  },
  {
    question: "How do I coordinate zones with phased evacuation?",
    answer: "Zone boundaries should support the evacuation strategy, enabling selective alert/evacuate signalling by floor or area as defined in the cause-and-effect."
  },
  {
    question: "What is the relationship between zones and loops?",
    answer: "Zones are logical divisions for indication purposes. Loops are wiring topology. A single loop can serve multiple zones, and a zone can span multiple loops."
  }
];

const FireAlarmModule3Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
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

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Zone Planning Principles
          </h1>
          <p className="text-white/80">
            BS 5839-1 zone planning for effective fire detection and emergency response
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zone purpose:</strong> Enable rapid fire location and targeted response</li>
              <li><strong>Key limits:</strong> Max 2000 m², 30 m search distance</li>
              <li><strong>Align with compartments:</strong> Follow fire compartment boundaries</li>
              <li><strong>Zone plan:</strong> Required at CIE with clear orientation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Zone boundaries at compartment lines</li>
              <li><strong>Use:</strong> One zone minimum per floor</li>
              <li><strong>Apply:</strong> Separate vertical shafts as distinct zones</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and principles of zone planning",
              "Align detection zones with fire compartments",
              "Apply BS 5839-1 limits for zone size and search distance",
              "Design vertical zoning for stairs, lifts and risers",
              "Specify zone plan requirements at the CIE",
              "Implement consistent zone identification and labelling"
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

        {/* Section 01: What Is Zone Planning? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is Zone Planning?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zone planning divides a building into logical areas for fire detection purposes. Each zone provides a distinct indication at the fire alarm control panel, enabling responders to quickly locate the origin of an alarm.
            </p>
            <p>
              Effective zone planning is critical for fire safety - it directly affects how quickly fire brigade personnel and building management can identify and respond to a fire event.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Zone Planning Objectives:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Rapid identification of fire location</li>
                <li>Clear and meaningful indications for emergency response</li>
                <li>Support for evacuation strategy and cause-and-effect logic</li>
                <li>Alignment with building fire compartmentation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: BS 5839-1 Zone Size Limits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 5839-1 Zone Size Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 provides guidance on zone sizing to ensure alarms can be investigated promptly. These limits ensure that responding personnel can locate the alarm source within a reasonable time.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone Area:</strong> Commonly not more than 2000 m²</li>
                <li><strong>Storeys:</strong> Generally one zone per floor minimum</li>
                <li><strong>Search Distance:</strong> Aim for 30 m or less within a zone</li>
                <li><strong>Vertical Circulation:</strong> Treat stairs and lifts as separate zones</li>
              </ul>
            </div>

            <p>
              Large open floors should be subdivided to maintain manageable search distances. The aim is for a person arriving at a zone to be able to identify the alarm location quickly.
            </p>
          </div>
        </section>

        {/* Section 03: Aligning Zones with Fire Compartments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Aligning Zones with Fire Compartments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire compartments are structural divisions designed to contain fire spread. Zones should follow compartment lines to provide meaningful indications during a fire event.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compartment Alignment Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow compartment lines and structural boundaries</li>
                <li>Avoid zones straddling multiple compartments</li>
                <li>Provide distinct zones for protected escape routes</li>
                <li>Reflect phased or defend-in-place strategies with appropriate zones</li>
              </ul>
            </div>

            <p>
              When zones cross compartment boundaries, it creates confusion about where the fire is located and undermines the building's fire containment strategy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Vertical Zoning Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Vertical Zoning Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vertical circulation routes present specific fire risks and require careful zone planning. Stairs and lift shafts are critical escape routes that need rapid identification if compromised by fire.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vertical Zone Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Stair Cores:</strong> Typically separate zones for each protected stair</li>
                <li><strong>Lift Shafts:</strong> Zone separately from adjacent floors</li>
                <li><strong>Service Risers:</strong> Consider separate zoning where significant</li>
                <li><strong>Voids:</strong> Zone where protected or containing significant cabling</li>
              </ul>
            </div>

            <p>
              Vertical zones enable rapid identification if fire enters a protected escape route, which is critical information for evacuation management and firefighting.
            </p>
          </div>
        </section>

        {/* Section 05: Zone Plan Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Zone Plan Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A zone plan must be displayed at the fire alarm control equipment to aid emergency response. This plan is critical for fire brigade personnel arriving at an unfamiliar building.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Plan Must Include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>"You are here"</strong> marker showing CIE location</li>
                <li><strong>Orientation</strong> (north arrow) and floor levels</li>
                <li><strong>Clear zone boundaries</strong> with consistent labelling</li>
                <li><strong>Key facilities:</strong> stairs, lifts, risers, plant rooms</li>
                <li><strong>Legend</strong> for symbols and colours used</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Zone Identification and Labelling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Zone Identification and Labelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clear, consistent zone identification is essential for emergency response. Responders must instantly understand zone locations without needing to decode cryptic labels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Best Practice:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clear Names:</strong> Use meaningful names like "Floor 03 - East Office"</li>
                <li><strong>Consistency:</strong> Panel displays must match drawings and site signage</li>
                <li><strong>Avoid Codes:</strong> Do not use cryptic codes that only installers understand</li>
                <li><strong>Documentation:</strong> Maintain consistency across all documentation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> Responders must instantly understand zone locations - unclear labelling delays response and risks lives. A fire brigade arriving at 3 AM should be able to interpret the zone plan immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain fire compartment drawings early in design and plan zones to match</li>
                <li>Consider cause-and-effect requirements when defining zone boundaries</li>
                <li>Walk the site with the zone plan to verify it makes sense in practice</li>
                <li>Coordinate with the fire strategy author for phased evacuation zones</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify zone boundaries match design drawings</li>
                <li>Ensure zone labels at the panel match site signage</li>
                <li>Check zone plan is legible and correctly oriented at CIE</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zones that cross fire compartment boundaries</strong> - creates confusion about fire location</li>
                <li><strong>Excessive zone size</strong> - leading to long search distances</li>
                <li><strong>Missing or outdated zone plans</strong> - at the CIE after building changes</li>
                <li><strong>Using cryptic zone labels</strong> - that do not match site signage</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Zone Size Limits</p>
                <ul className="space-y-0.5">
                  <li>Maximum area: 2000 m²</li>
                  <li>Search distance: 30 m max</li>
                  <li>One zone per floor minimum</li>
                  <li>Separate zones for vertical shafts</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Zone Plan Requirements</p>
                <ul className="space-y-0.5">
                  <li>"You are here" marker</li>
                  <li>North arrow orientation</li>
                  <li>Clear zone boundaries</li>
                  <li>Consistent labelling</li>
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
            <Link to="..">
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

export default FireAlarmModule3Section1;
