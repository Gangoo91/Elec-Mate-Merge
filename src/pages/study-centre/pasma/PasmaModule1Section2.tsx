import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Ruler, Tag, Shield, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-en1004-year",
    question: "When did EN 1004:2020 replace the previous EN 1004:2004 standard?",
    options: [
      "January 2020",
      "November 2021",
      "April 2022",
      "March 2023"
    ],
    correctIndex: 1,
    explanation: "EN 1004:2020 was published in 2020 but the transition period ended in November 2021, at which point it fully replaced EN 1004:2004 for all new tower designs and manufacture."
  },
  {
    id: "pasma-load-class3",
    question: "What is the minimum platform loading capacity for a Class 3 tower under EN 1004:2020?",
    options: [
      "100 kg/m²",
      "150 kg/m²",
      "200 kg/m²",
      "250 kg/m²"
    ],
    correctIndex: 2,
    explanation: "EN 1004:2020 defines Class 3 towers as having a minimum uniformly distributed load capacity of 200 kg/m². Class 2 towers have a capacity of 150 kg/m²."
  },
  {
    id: "pasma-outdoor-max",
    question: "What is the maximum height for a standard mobile tower used outdoors under EN 1004:2020?",
    options: [
      "4 metres",
      "6 metres",
      "8 metres",
      "12 metres"
    ],
    correctIndex: 2,
    explanation: "Under EN 1004:2020, the maximum height for a mobile tower used outdoors without additional measures is 8 metres. Indoors, the maximum is 12 metres."
  }
];

const faqs = [
  {
    question: "What is the difference between EN 1004:2004 and EN 1004:2020?",
    answer: "EN 1004:2020 introduced several key changes: the old single load class was replaced with two defined classes (Class 2 at 150 kg/m² and Class 3 at 200 kg/m²), maximum heights were clarified (8 m outdoor / 12 m indoor without additional measures), new marking and labelling requirements were introduced, and platform size categories were updated. Towers manufactured to EN 1004:2004 that are already in service may continue to be used provided they remain in good condition."
  },
  {
    question: "Do I need to replace all my old EN 1004:2004 towers?",
    answer: "No. Towers manufactured to EN 1004:2004 that are already in service can continue to be used, provided they are maintained in good condition, regularly inspected, and used in accordance with the manufacturer's instructions. However, any new towers purchased must comply with EN 1004:2020."
  },
  {
    question: "What is BS 1139-6 and how does it relate to EN 1004?",
    answer: "BS 1139-6 is the British Standard for metal scaffolding Part 6, which covers mobile access and working towers made of prefabricated elements. It provides additional UK-specific requirements that complement EN 1004. Towers should comply with both standards where applicable, and BS 1139-6 covers some areas not addressed by EN 1004, such as specific inspection criteria."
  },
  {
    question: "How do I check if a tower complies with EN 1004:2020?",
    answer: "Look for the EN 1004:2020 marking on the tower components and the manufacturer's data plate. The data plate should state the standard reference, load class (2 or 3), maximum platform height, and manufacturer details. If in doubt, check the manufacturer's instruction manual which must accompany the tower on site and confirm compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "EN 1004:2020 is a standard that applies to which type of equipment?",
    options: [
      "Fixed scaffolding",
      "Mobile access towers",
      "Ladders and stepladders",
      "Mobile elevating work platforms"
    ],
    correctAnswer: 1,
    explanation: "EN 1004:2020 is the European standard specifically for mobile access towers made of prefabricated elements. It does not cover fixed scaffolding, ladders, or MEWPs."
  },
  {
    id: 2,
    question: "What is the platform loading capacity for a Class 2 tower under EN 1004:2020?",
    options: [
      "100 kg/m²",
      "150 kg/m²",
      "200 kg/m²",
      "250 kg/m²"
    ],
    correctAnswer: 1,
    explanation: "EN 1004:2020 defines Class 2 towers as having a minimum uniformly distributed load capacity of 150 kg/m². Class 3 towers have a higher capacity of 200 kg/m²."
  },
  {
    id: 3,
    question: "What is the maximum indoor platform height for a mobile tower under EN 1004:2020 without additional measures?",
    options: [
      "6 metres",
      "8 metres",
      "10 metres",
      "12 metres"
    ],
    correctAnswer: 3,
    explanation: "EN 1004:2020 sets the maximum indoor platform height at 12 metres without additional measures. For outdoor use, the maximum is 8 metres."
  },
  {
    id: 4,
    question: "Which of the following is a KEY change introduced by EN 1004:2020?",
    options: [
      "Towers no longer need guardrails",
      "Load classes were introduced (Class 2 and Class 3)",
      "Towers can now be used above 20 metres",
      "Inspection requirements were removed"
    ],
    correctAnswer: 1,
    explanation: "One of the most significant changes in EN 1004:2020 was the introduction of two defined load classes: Class 2 (150 kg/m²) and Class 3 (200 kg/m²), replacing the previous single classification."
  },
  {
    id: 5,
    question: "What information must appear on a tower's manufacturer data plate?",
    options: [
      "Only the manufacturer's name",
      "The standard reference, load class, max height, and manufacturer details",
      "Only the date of manufacture",
      "The name of the person who assembled it"
    ],
    correctAnswer: 1,
    explanation: "The manufacturer's data plate must include the standard reference (EN 1004:2020), the load class (2 or 3), the maximum platform height, and manufacturer identification details."
  },
  {
    id: 6,
    question: "BS 1139-6 is the British Standard covering which aspect of scaffolding?",
    options: [
      "Fixed tube and fitting scaffolding",
      "System scaffolding",
      "Mobile access and working towers",
      "Suspended scaffolding"
    ],
    correctAnswer: 2,
    explanation: "BS 1139-6 is the British Standard for metal scaffolding Part 6, specifically covering mobile access and working towers made of prefabricated elements."
  },
  {
    id: 7,
    question: "Why might a tower's maximum height be reduced below the EN 1004:2020 limit?",
    options: [
      "The tower is painted a dark colour",
      "High wind speeds at the site location",
      "The tower was manufactured before 2020",
      "The platform is less than 1 metre wide"
    ],
    correctAnswer: 1,
    explanation: "Wind loading is a critical factor. Even if a tower is rated to 8 m outdoors under EN 1004:2020, the actual maximum safe height may need to be reduced if the site is exposed to high winds. The manufacturer's instructions will specify wind speed limits."
  },
  {
    id: 8,
    question: "What should you do if you discover tower components from two different manufacturers have been mixed?",
    options: [
      "Continue using the tower if it looks stable",
      "Report it but carry on working",
      "Stop using the tower immediately and report the issue",
      "Add extra bracing to compensate"
    ],
    correctAnswer: 2,
    explanation: "Mixing components from different manufacturers is dangerous because parts may not be fully compatible, even if they appear to fit. The tower must be taken out of service immediately, reported, and only reconstructed using components from a single manufacturer in accordance with their instructions."
  }
];

export default function PasmaModule1Section2() {
  useSEO({
    title: "EN 1004:2020 & BS 1139-6 | PASMA Module 1.2",
    description: "EN 1004:2020 European standard for mobile access towers, load classes 2 and 3, maximum heights, BS 1139-6 British Standard scope, compliance marking and identification.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <BookOpen className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EN 1004:2020 &amp; BS 1139-6
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The European and British standards governing the design, manufacture, and safe use of mobile access towers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>EN 1004:2020:</strong> Two load classes &mdash; 150 kg/m&sup2; and 200 kg/m&sup2;</li>
              <li><strong>Max Heights:</strong> 8 m outdoor / 12 m indoor</li>
              <li><strong>BS 1139-6:</strong> UK-specific requirements for mobile towers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Check:</strong> Data plate for EN 1004:2020 and load class</li>
              <li><strong>Verify:</strong> Components are from same manufacturer</li>
              <li><strong>Confirm:</strong> Instruction manual is available on site</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and scope of EN 1004:2020",
              "Describe the key changes from EN 1004:2004",
              "Distinguish between Load Class 2 and Class 3",
              "State maximum heights for indoor and outdoor use",
              "Understand the relationship between EN 1004 and BS 1139-6",
              "Identify compliance markings on tower components"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is EN 1004:2020? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is EN 1004:2020?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                EN 1004:2020 is the European standard for mobile access towers made of prefabricated
                elements. It sets out design, structural, and safety requirements that manufacturers must
                meet when producing towers for use across Europe and the United Kingdom.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> EN 1004:2020 replaced the
                  previous EN 1004:2004 standard. The transition period ended in <strong>November 2021</strong>,
                  after which all newly manufactured towers must comply with the 2020 edition. The standard is
                  harmonised, meaning it applies uniformly across all EU and UK markets.
                </p>
              </div>

              <p>
                The standard is mandatory for manufacturers, not directly for end users. However, as a
                tower user you must understand it because it determines the safe working parameters of
                the equipment you are using. Selecting a tower that does not comply with EN 1004:2020
                could be a breach of your duty to select suitable work equipment under the Work at
                Height Regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">EN 1004:2020 Covers:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Design and structural requirements for tower frames, platforms, and guardrails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Load classifications and safe working load capacities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum platform heights for indoor and outdoor use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stability requirements including height-to-base ratios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Marking, labelling, and instruction manual requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Testing procedures that manufacturers must complete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Key Changes in EN 1004:2020 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Changes in EN 1004:2020
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 2020 edition introduced several significant changes that affect how towers are
                classified, marked, and used. Understanding these changes is essential for anyone
                selecting, inspecting, or working from mobile towers.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Major Changes at a Glance</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Load Classes Introduced</p>
                      <p className="text-sm text-white/80">Two defined load classes replace the previous single classification: Class 2 (150 kg/m&sup2;) and Class 3 (200 kg/m&sup2;). Every tower must now be clearly marked with its load class.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">Maximum Heights Clarified</p>
                      <p className="text-sm text-white/80">Clear limits set: 8 metres maximum platform height outdoors and 12 metres indoors, without additional measures such as ties or ballast beyond standard stabilisers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">Enhanced Marking Requirements</p>
                      <p className="text-sm text-white/80">Towers must now carry clear markings showing the standard reference, load class, maximum height, and manufacturer details. This makes on-site verification straightforward.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Additional Changes:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Updated platform size categories with clearer dimensions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Revised stability calculations and test procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Strengthened requirements for instruction manuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Clarified requirements for castors and adjustable legs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Improved guardrail and toe board specifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Load Classes Explained */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Classes Explained
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important changes in EN 1004:2020 is the introduction of two defined load
                classes. Each class specifies the minimum uniformly distributed load (UDL) that the tower
                platform must be able to support. Choosing the correct class for your work is critical.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-elec-yellow font-medium">Feature</th>
                      <th className="text-left py-2 pr-4 text-blue-400 font-medium">Class 2</th>
                      <th className="text-left py-2 text-purple-400 font-medium">Class 3</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium text-white">Platform UDL</td>
                      <td className="py-2 pr-4">150 kg/m&sup2;</td>
                      <td className="py-2">200 kg/m&sup2;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium text-white">Typical Use</td>
                      <td className="py-2 pr-4">Light-duty tasks: inspection, painting, cable pulling</td>
                      <td className="py-2">Heavier work: bricklaying, M&amp;E installation, plastering</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium text-white">Materials on Platform</td>
                      <td className="py-2 pr-4">Light tools and materials only</td>
                      <td className="py-2">Heavier tools and construction materials</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-white">Marking Colour</td>
                      <td className="py-2 pr-4">Blue label / marking</td>
                      <td className="py-2">Red label / marking</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Practical Load Calculation:</strong> A standard
                  platform of 1.3 m &times; 2.5 m = 3.25 m&sup2;. At Class 2 (150 kg/m&sup2;), the maximum
                  total load is 487.5 kg. At Class 3 (200 kg/m&sup2;), it rises to 650 kg. Remember this
                  includes the weight of persons, tools, and materials combined.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Identification on Site</p>
                </div>
                <p className="text-sm text-white/80">
                  Always check the tower&rsquo;s data plate or label to confirm the load class before use.
                  If you are carrying out work that involves storing materials on the platform, you almost
                  certainly need a Class 3 tower. Overloading a Class 2 tower beyond its rated capacity is
                  extremely dangerous and could cause structural failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Maximum Heights & Safe Working */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maximum Heights &amp; Safe Working
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                EN 1004:2020 sets clear maximum platform heights for mobile towers. These heights represent
                the limits within which the tower has been tested and certified as stable under normal
                conditions. Exceeding them is not permitted without additional measures specified by the
                manufacturer.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Indoor Use</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-400 mb-1">12 m</p>
                  <p className="text-sm text-white/80">Maximum platform height without additional measures. Indoor locations are sheltered from wind, allowing greater heights.</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Outdoor Use</p>
                  </div>
                  <p className="text-3xl font-bold text-amber-400 mb-1">8 m</p>
                  <p className="text-sm text-white/80">Maximum platform height without additional measures. Reduced due to wind loading effects on the tower.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Factors Affecting Maximum Height</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Wind speed:</strong> High winds significantly increase overturning forces. Towers must not be used in wind speeds above those specified by the manufacturer (typically around 17 m/s or Beaufort Force 7).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Stabilisers/outriggers:</strong> Required at certain heights to maintain the correct height-to-base ratio. Without them, the maximum safe height is reduced.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Height-to-base ratio:</strong> EN 1004:2020 specifies maximum ratios (typically 3.5:1 outdoors and 3.5:1 indoors) that must not be exceeded.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Ground conditions:</strong> Soft or uneven ground may require the height to be reduced or additional measures to be taken.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Sheeting and enclosure:</strong> Attaching sheeting or banners to a tower dramatically increases wind loading and may reduce the safe maximum height.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Rule</p>
                </div>
                <p className="text-sm text-white/80">
                  Never exceed the maximum height stated on the manufacturer&rsquo;s data plate or in the
                  instruction manual. Even if the tower physically allows you to add more frames, doing so
                  beyond the rated height creates an immediate risk of collapse.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: BS 1139-6 Scope */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            BS 1139-6 Scope
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 1139-6 is the British Standard for metal scaffolding, Part 6, covering mobile access
                and working towers made of prefabricated elements. While EN 1004:2020 is the harmonised
                European standard, BS 1139-6 provides additional UK-specific requirements and guidance.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Relationship to EN 1004:</strong> BS 1139-6 and
                  EN 1004:2020 are complementary standards. EN 1004 sets the base European requirements for
                  design and manufacture, while BS 1139-6 adds UK-specific provisions for inspection, use,
                  and maintenance. Towers used in the UK should ideally comply with both.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">BS 1139-6 Additional Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Inspection criteria:</strong> More detailed guidance on what constitutes a competent inspection, including specific checks for frame distortion, locking mechanisms, and castor condition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Maintenance schedules:</strong> Recommended maintenance frequencies and procedures for keeping towers in safe working condition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Storage requirements:</strong> How tower components should be stored when not in use to prevent damage and corrosion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Component marking:</strong> Additional marking requirements for individual components to aid identification and matching.</span>
                  </li>
                </ul>
              </div>

              <p>
                When selecting a mobile tower for use in the UK, you should look for compliance with both
                EN 1004:2020 and BS 1139-6. The manufacturer&rsquo;s documentation should reference both
                standards where applicable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Compliance Marking & Identification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Compliance Marking &amp; Identification
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                EN 1004:2020 introduced strengthened marking requirements to make it easier for users and
                inspectors to verify compliance on site. Every tower must carry clear, durable markings
                that provide essential safety information at a glance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Required Tower Markings</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Standard reference:</strong> "EN 1004:2020" must be clearly stated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Load class:</strong> Class 2 or Class 3 with the corresponding UDL capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Maximum platform height:</strong> The highest permitted working platform height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Manufacturer identification:</strong> Name, logo, or trademark of the manufacturer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Year of manufacture:</strong> When the tower or component was produced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Model/type reference:</strong> The specific tower model designation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Instruction Manual:</strong> Every tower must be
                  supplied with an instruction manual that covers assembly sequences, safe use, inspection
                  procedures, maximum heights, load capacities, and dismantling. This manual must be
                  available on site whenever the tower is in use. Missing manuals are a common compliance
                  failure noted by HSE inspectors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">How to Verify Compliance</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check the data plate on the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cross-reference with the instruction manual</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Verify all components match the same manufacturer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check for visible damage or missing markings</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Compliance Red Flags</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No data plate or unreadable markings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Missing instruction manual on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Components from different manufacturers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Markings showing only EN 1004:2004</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Standards in Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Standards in Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing the standards is one thing &mdash; applying them on site is another. Here is
                practical guidance on how to use EN 1004:2020 and BS 1139-6 in your daily work with
                mobile towers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">On-Site Compliance Checks</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Before assembly:</strong> Confirm the tower carries EN 1004:2020 markings and the correct load class for the planned work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Component check:</strong> Verify all frames, braces, platforms, and guardrails are from the same manufacturer and tower system. Never mix components.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Manual available:</strong> Ensure the manufacturer&rsquo;s instruction manual is on site and accessible to the person assembling the tower.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Height check:</strong> Confirm the planned platform height does not exceed the rated maximum for the environment (indoor/outdoor).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Rejecting Non-Compliant Towers</p>
                </div>
                <p className="text-sm text-white/80">
                  If a tower does not carry the correct markings, has missing or damaged components, or
                  shows signs of mixing parts from different manufacturers, it must be taken out of service
                  immediately. Report the issue to your supervisor and do not use the tower until it has
                  been confirmed as compliant. This is not optional &mdash; using a non-compliant tower
                  puts you and others at risk and breaches the Work at Height Regulations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Reporting Defects</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Remove the tower from service immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Clearly tag or mark the defective component(s)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Report to your supervisor and the tower owner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Record the defect in the inspection register</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Do not attempt to repair components yourself unless trained to do so</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Quarantine defective parts to prevent accidental reuse</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Mixed Component Risks</p>
                </div>
                <p className="text-sm text-white/80">
                  Components from different manufacturers may appear similar but can have subtle
                  differences in dimensions, locking mechanisms, or material grades. Even if parts seem
                  to fit together, the structural integrity of the assembled tower cannot be guaranteed.
                  Mixed towers have not been tested as a system and may fail under load. Always use
                  components from a single manufacturer and a single tower system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: WAHR &amp; HSWA 1974
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1-section-3">
              Next: PASMA Code of Practice
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}