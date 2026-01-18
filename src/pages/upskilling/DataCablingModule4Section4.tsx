import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "ID Labelling Standards and Colour Codes | Data Cabling Module 4.4";
const DESCRIPTION = "Master cable identification standards, colour coding systems, and professional labelling requirements for structured cabling.";

const quickCheckQuestions = [
  {
    id: "datacabling-m4s4-check1",
    question: "According to TIA-606-C, what colour identifies demarcation points?",
    options: ["Blue", "Green", "Orange", "Purple"],
    correctIndex: 2,
    explanation: "Orange is used to identify demarcation points (where external services enter the building) according to TIA-606-C colour coding standards."
  },
  {
    id: "datacabling-m4s4-check2",
    question: "What is the standard colour for multimode 50/125 fibre optic cable jacket?",
    options: ["Orange", "Yellow", "Aqua", "Blue"],
    correctIndex: 2,
    explanation: "Aqua (light blue-green) is the standard jacket colour for OM3/OM4 multimode 50/125 fibre optic cables. Orange is used for older OM1/OM2 62.5/125 multimode."
  },
  {
    id: "datacabling-m4s4-check3",
    question: "How often should cable labels be placed along horizontal runs?",
    options: ["Every 1m", "Every 3m", "Every 5m", "Every 10m"],
    correctIndex: 1,
    explanation: "Cable labels should be placed every 3m along horizontal runs, within 300mm of each termination, and at all access points and pull boxes."
  }
];

const faqs = [
  {
    question: "What's the difference between TIA-606 and ISO/IEC 14763-1?",
    answer: "TIA-606 is the North American standard with prescriptive colour codes and hierarchy. ISO/IEC 14763-1 is the international standard adopted in UK/Europe with more flexibility for adaptation to local requirements. Both define labelling and documentation requirements."
  },
  {
    question: "What information must appear on every cable label?",
    answer: "At minimum: unique identifier, termination points (both ends), cable type/category. Optional but recommended: length, installation date, installer code. Labels must be durable, legible, and positioned for easy reading."
  },
  {
    question: "How do QR codes and RFID improve cable management?",
    answer: "QR codes allow smartphone scanning to access full cable records, test results, and maintenance history. RFID enables automated asset tracking, real-time location, and integration with CMDB systems without line-of-sight reading."
  },
  {
    question: "What's the standard naming hierarchy for structured cabling?",
    answer: "Campus (C01) → Building (B03) → Floor (F02) → Room (R205) → Outlet (01). So a full identifier might be C01-B03-F02-R205-01 for Campus 1, Building 3, Floor 2, Room 205, Outlet 1."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A large hospital complex requires a labelling system that supports infection control, links to the BIM system, and allows easy updates. What approach would you recommend?",
  options: [
    "Standard paper labels with handwritten identification",
    "Printed polyester labels with QR codes linking to digital records",
    "Colour-coded tape wrapping around cables",
    "Permanent marker directly on cable jacket"
  ],
  correctAnswer: 1,
  explanation: "Polyester labels with QR codes provide durability, easy cleaning for infection control, and link to the BIM/digital twin system for comprehensive documentation. They support easy updates and can be scanned with standard smartphones."
  }
];

const DataCablingModule4Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            ID Labelling Standards and Colour Codes
          </h1>
          <p className="text-white/80">
            Cable identification and marking systems for professional installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standards:</strong> TIA-606-C (US), ISO/IEC 14763-1 (UK)</li>
              <li><strong>Hierarchy:</strong> Campus → Building → Floor → Room → Outlet</li>
              <li><strong>Placement:</strong> Both ends + every 3m + access points</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Orange = demarcation, Yellow = single mode fibre</li>
              <li><strong>Use:</strong> Consistent naming, durable labels, complete documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply TIA-606-C and ISO/IEC 14763-1 standards",
              "Use colour coding for infrastructure elements",
              "Design hierarchical naming conventions",
              "Select appropriate label materials and placement",
              "Implement digital labelling technologies",
              "Create compliant documentation systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            TIA-606-C Colour Coding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standardised colour schemes provide immediate visual identification of cabling
              infrastructure elements and their functions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Infrastructure Elements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Orange:</strong> Demarcation point</li>
                  <li><strong>Green:</strong> Network connections</li>
                  <li><strong>Purple:</strong> Common equipment</li>
                  <li><strong>White:</strong> First level backbone</li>
                  <li><strong>Gray:</strong> Second level backbone</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workstation/Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Blue:</strong> Workstation outlets</li>
                  <li><strong>Yellow:</strong> Auxiliary circuits</li>
                  <li><strong>Red:</strong> Key telephone systems</li>
                  <li><strong>Pink:</strong> Miscellaneous</li>
                  <li><strong>Aqua:</strong> Maintenance</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Demarcation</p>
                <p className="text-white/90 text-xs">Orange labels</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Network</p>
                <p className="text-white/90 text-xs">Green labels</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Workstation</p>
                <p className="text-white/90 text-xs">Blue labels</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Jacket Colour Coding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable jacket colours help identify cable types at a glance, particularly
              important for fibre optic cables where type identification is critical.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fibre Optic Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Orange:</strong> Multimode 62.5/125 (OM1/OM2)</li>
                  <li><strong>Aqua:</strong> Multimode 50/125 (OM3/OM4)</li>
                  <li><strong>Yellow:</strong> Single mode</li>
                  <li><strong>Lime green:</strong> Bend-insensitive</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Blue/Gray:</strong> Horizontal distribution</li>
                  <li><strong>Orange/White:</strong> Backbone cables</li>
                  <li><strong>Green:</strong> Equipment connections</li>
                  <li><strong>Yellow/Red:</strong> Cross-connect</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plenum rated:</strong> Often white or gray jacket</li>
                <li><strong>Outdoor rated:</strong> Black for UV protection</li>
                <li><strong>LSZH:</strong> Various colours with green stripe</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Naming Conventions and Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hierarchical identification systems provide logical, scalable naming that
              supports efficient management and troubleshooting.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-white font-medium mb-1">Campus Level: <span className="text-elec-yellow">C01</span></p>
                <p className="text-xs text-white/70">Site or campus identifier</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-white font-medium mb-1">Building Level: <span className="text-elec-yellow">C01-B03</span></p>
                <p className="text-xs text-white/70">Individual building within campus</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-white font-medium mb-1">Floor Level: <span className="text-elec-yellow">C01-B03-F02</span></p>
                <p className="text-xs text-white/70">Floor or level within building</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-white font-medium mb-1">Room Level: <span className="text-elec-yellow">C01-B03-F02-R205</span></p>
                <p className="text-xs text-white/70">Individual room or zone</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-white font-medium mb-1">Outlet Level: <span className="text-elec-yellow">C01-B03-F02-R205-01</span></p>
                <p className="text-xs text-white/70">Individual outlet or connection point</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Label Specifications and Placement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Labels must be durable, legible, and positioned for easy identification whilst
              maintaining professional appearance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Material:</strong> Polyester or vinyl</li>
                  <li><strong>Size:</strong> Minimum 19mm height</li>
                  <li><strong>Print:</strong> Fade-resistant, smudge-proof</li>
                  <li><strong>Temperature:</strong> -40°C to +150°C</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Placement Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Terminations:</strong> Within 300mm each end</li>
                  <li><strong>Horizontal:</strong> Every 3m along runs</li>
                  <li><strong>Access points:</strong> All pull boxes</li>
                  <li><strong>Penetrations:</strong> Both sides of walls</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Technologies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>QR codes:</strong> Link to full cable records, test results, maintenance history</li>
                <li><strong>RFID tags:</strong> Automated asset tracking without line-of-sight</li>
                <li><strong>NFC labels:</strong> Smartphone-readable for easy field access</li>
                <li><strong>BIM integration:</strong> Digital twin linking for lifecycle management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inconsistent naming:</strong> — use documented convention throughout</li>
                <li><strong>Poor materials:</strong> — labels fade, fall off, become illegible</li>
                <li><strong>Missing documentation:</strong> — label system worthless without records</li>
                <li><strong>No change control:</strong> — updates must be tracked and documented</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Colours</p>
              <ul className="space-y-0.5">
                <li>Orange = Demarcation</li>
                <li>Aqua = OM3/OM4 multimode</li>
                <li>Yellow = Single mode fibre</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Label Placement</p>
              <ul className="space-y-0.5">
                <li>Within 300mm of terminations</li>
                <li>Every 3m horizontal runs</li>
                <li>Both sides of penetrations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-4-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule4Section4;