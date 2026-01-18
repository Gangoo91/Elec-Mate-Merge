import { ArrowLeft, Database, CheckCircle, Search, QrCode, MapPin, Layers, AlertTriangle, Zap, HelpCircle, ChevronRight, ChevronLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Asset Register Creation & Management - PAT Testing Course";
const DESCRIPTION = "Learn how to create and maintain a comprehensive electrical equipment asset register for effective PAT testing management and compliance.";

const quickCheckQuestions = [
  {
    id: "m5s3-qc1",
    question: "What is the primary purpose of an asset register in PAT testing?",
    options: ["To track equipment costs", "To identify and locate all testable equipment", "To record employee names", "To store warranty information only"],
    correctIndex: 1,
    explanation: "The primary purpose is to identify, locate and track all portable appliances requiring testing to ensure none are missed."
  },
  {
    id: "m5s3-qc2",
    question: "Which numbering system is recommended for asset IDs?",
    options: ["Random numbers", "Sequential with location prefix", "Manufacturer serial only", "Employee initials"],
    correctIndex: 1,
    explanation: "Sequential numbers with location or department prefixes allow easy identification and organisation while maintaining uniqueness."
  },
  {
    id: "m5s3-qc3",
    question: "How often should an asset register be audited for accuracy?",
    options: ["Never", "Every 5 years", "Annually at minimum", "Only when equipment breaks"],
    correctIndex: 2,
    explanation: "Annual audits ensure the register remains accurate, capturing new equipment, disposals, and location changes."
  }
];

const quizQuestions = [
  { question: "What information is essential in an asset register entry?", options: ["Just the equipment name", "Asset ID, description, location, and test status", "Only purchase price", "Manufacturer contact details only"], correctAnswer: 1 },
  { question: "What is the advantage of using barcode or QR code labels?", options: ["They look professional", "Fast, accurate identification and reduced data entry errors", "They are colourful", "They are waterproof"], correctAnswer: 1 },
  { question: "When creating an initial asset register, you should:", options: ["Only register expensive items", "Conduct a comprehensive site walkthrough", "Wait until equipment fails", "Copy a template from the internet"], correctAnswer: 1 },
  { question: "How should personal equipment brought from home be handled?", options: ["Ignore it completely", "Include in register and test before use", "Only test if it looks old", "Let the owner test it"], correctAnswer: 1 },
  { question: "Which asset register format offers the best searchability?", options: ["Paper cards", "Electronic database system", "Handwritten notebook", "Memory alone"], correctAnswer: 1 },
  { question: "What should happen when equipment is moved to a new location?", options: ["Nothing - location doesn't matter", "Update the register with new location", "Remove from register", "Create a new asset ID"], correctAnswer: 1 },
  { question: "How should disposed equipment be handled in the register?", options: ["Delete the record immediately", "Mark as disposed with date and retain record", "Ignore it", "Transfer to another register"], correctAnswer: 1 },
  { question: "What is a 'ghost asset' in PAT testing context?", options: ["Haunted equipment", "Equipment in register but no longer exists", "New equipment", "Equipment on loan"], correctAnswer: 1 },
  { question: "For multi-site organisations, asset IDs should:", options: ["Be the same across all sites", "Include a site identifier", "Only use numbers", "Be assigned randomly"], correctAnswer: 1 },
  { question: "What triggers the need to add equipment to the register?", options: ["Only annual review", "Purchase, transfer in, or discovery of unregistered items", "Only when testing", "Never - register is fixed"], correctAnswer: 1 }
];

const faqs = [
  { question: "How do I handle equipment without serial numbers?", answer: "Assign your own unique asset ID using a sequential numbering system. Attach a permanent label with this ID to the equipment. Document the lack of manufacturer serial number in your records." },
  { question: "Should I include fixed appliances in the PAT register?", answer: "Fixed (hardwired) appliances are not portable and are typically covered by periodic fixed installation testing. However, you may include them in a general electrical equipment register for completeness." },
  { question: "How do I manage equipment shared between departments?", answer: "Assign a 'home' location for the equipment and track loans via a sign-out system. Alternatively, assign it to a 'shared equipment' category with defined custodian responsibility." },
  { question: "What's the best way to handle new equipment entering the site?", answer: "Establish a process where all new equipment is registered before use. Include goods receiving in the process so equipment is captured at delivery. New items should be tested and labelled before deployment." },
  { question: "Should contractors' equipment be in our register?", answer: "Contractors' equipment remains their responsibility. However, you should verify they have a testing regime and may record their test certificates. Your register should note contractor equipment is on-site but managed externally." },
  { question: "How do I handle equipment that's rarely used?", answer: "Include all equipment in the register regardless of usage frequency. Rarely used equipment may actually need more attention as faults may go unnoticed. Test before use if left idle for extended periods." }
];

const PATTestingModule5Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-24">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Database className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-elec-yellow/80 text-sm font-medium">Module 5 - Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Asset Register Creation & Management</h1>
          <p className="text-white/60 text-base">Building and maintaining a comprehensive database of all portable appliances for effective testing management</p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 15 min read</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="text-sm text-white space-y-1">
            <li>- An asset register catalogues all portable appliances requiring testing</li>
            <li>- It includes unique IDs, descriptions, locations, and test history</li>
            <li>- Regular audits ensure accuracy</li>
            <li>- Electronic systems with barcode scanning provide the best efficiency</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Create a comprehensive asset register from scratch", "Implement effective asset identification systems", "Manage equipment locations and movements", "Maintain register accuracy through auditing", "Handle special cases (shared, personal, disposed equipment)", "Select appropriate register management tools"].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2 text-white text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center font-medium">{i + 1}</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is an Asset Register?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>An asset register is a comprehensive database of all portable electrical equipment that requires PAT testing. It serves as the foundation of your testing programme, ensuring every item is identified, tracked, and tested at appropriate intervals.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Core Functions of an Asset Register</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Search className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Identification:</strong> Uniquely identifies every testable item</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Location:</strong> Records where equipment is located</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Database className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">History:</strong> Tracks test history and results</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Layers className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Scheduling:</strong> Enables test due date management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Classification:</strong> Groups equipment by type/risk</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Compliance:</strong> Demonstrates systematic approach</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Minimum Data Fields</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white/70">
                <div>- Asset ID number</div>
                <div>- Description/type</div>
                <div>- Manufacturer</div>
                <div>- Model number</div>
                <div>- Serial number</div>
                <div>- Location</div>
                <div>- Department</div>
                <div>- Equipment class</div>
                <div>- Date registered</div>
                <div>- Last test date</div>
                <div>- Next test due</div>
                <div>- Current status</div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Creating the Initial Register
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Creating a comprehensive asset register requires a systematic approach. The initial setup is the most time-consuming phase, but getting it right establishes a solid foundation for ongoing management.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Step-by-Step Process</h4>
              <div className="space-y-3">
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">1</div><div><h5 className="font-medium text-white">Plan the Walkthrough</h5><p className="text-white/70 text-sm mt-1">Obtain floor plans or site maps. Schedule access to all areas including restricted spaces, storage rooms, and workshops. Inform department managers.</p></div></div>
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">2</div><div><h5 className="font-medium text-white">Define Naming Conventions</h5><p className="text-white/70 text-sm mt-1">Establish asset ID format before starting. Example: LOC-DEPT-0001 (Building A, IT Department, item 1). Consistent format aids sorting and reporting.</p></div></div>
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">3</div><div><h5 className="font-medium text-white">Conduct Systematic Walkthrough</h5><p className="text-white/70 text-sm mt-1">Work room-by-room, recording every portable appliance. Check desks, under desks, storage areas, kitchens, workshops, and reception areas.</p></div></div>
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">4</div><div><h5 className="font-medium text-white">Record All Details</h5><p className="text-white/70 text-sm mt-1">Capture all required data fields. Take photos of nameplates if needed. Note equipment condition and any visible damage.</p></div></div>
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">5</div><div><h5 className="font-medium text-white">Apply Asset Labels</h5><p className="text-white/70 text-sm mt-1">Attach permanent labels with asset ID to each item. Position labels where visible but protected from wear.</p></div></div>
                <div className="flex gap-4"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">6</div><div><h5 className="font-medium text-white">Enter Data and Verify</h5><p className="text-white/70 text-sm mt-1">Input all data into your chosen system. Review entries for completeness and accuracy before going live.</p></div></div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Commonly Missed Items</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white/70">
                <div>- Phone chargers</div>
                <div>- Desk fans</div>
                <div>- Personal heaters</div>
                <div>- Extension leads</div>
                <div>- Multiway adaptors</div>
                <div>- Coffee machines</div>
                <div>- Microwaves</div>
                <div>- Fridges</div>
                <div>- Vending machines</div>
                <div>- Portable heaters</div>
                <div>- Desk lamps</div>
                <div>- Power tools</div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Asset Identification Systems
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Effective identification systems enable rapid equipment location and accurate record linking. The choice of system depends on organisation size, budget, and operational requirements.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">Barcode/QR Code Systems</h4>
                </div>
                <p className="text-white/70 text-sm mb-3">Most efficient for medium to large organisations.</p>
                <div className="text-sm space-y-2">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Fast scanning reduces data entry time</li>
                    <li>- Eliminates transcription errors</li>
                    <li>- Links directly to database record</li>
                    <li>- Works with most PAT software</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Numeric/Alphanumeric Labels</h4>
                <p className="text-white/70 text-sm mb-3">Suitable for smaller organisations or manual systems.</p>
                <div className="text-sm space-y-2">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Low cost implementation</li>
                    <li>- No special equipment needed</li>
                    <li>- Human-readable at a glance</li>
                    <li>- Works with any record system</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Recommended ID Format</h4>
              <div className="text-sm space-y-2">
                <p className="text-white/70">Structure: <code className="bg-black/30 px-2 py-0.5 rounded text-white">[SITE]-[DEPT]-[NUMBER]</code></p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="font-medium text-white">Examples:</p>
                    <ul className="text-white/70 mt-1 space-y-1">
                      <li>- HQ-IT-0001 (Head Office, IT, item 1)</li>
                      <li>- WH-OPS-0156 (Warehouse, Operations)</li>
                      <li>- BR2-ADMIN-0023 (Branch 2, Admin)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white">Benefits:</p>
                    <ul className="text-white/70 mt-1 space-y-1">
                      <li>- Location immediately identifiable</li>
                      <li>- Easy sorting by department</li>
                      <li>- Unique across all sites</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ongoing Register Management
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>An asset register is a living document that requires regular maintenance. Without ongoing management, it quickly becomes inaccurate and loses its value as a compliance tool.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Management Activities</h4>
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-3">
                  <h5 className="font-medium text-green-400">Adding New Equipment</h5>
                  <p className="text-white/70 text-sm mt-1">Establish a process to capture new equipment at purchase or arrival. Goods receiving, procurement, or IT departments should trigger registration.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <h5 className="font-medium text-blue-400">Recording Disposals</h5>
                  <p className="text-white/70 text-sm mt-1">When equipment is disposed, update the register with disposal date, method, and reason. Never delete records - mark as disposed and retain.</p>
                </div>
                <div className="border-l-2 border-orange-500 pl-3">
                  <h5 className="font-medium text-orange-400">Location Changes</h5>
                  <p className="text-white/70 text-sm mt-1">Update register when equipment moves. Consider a sign-out/sign-in system for frequently moved items or shared equipment.</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <h5 className="font-medium text-purple-400">Status Updates</h5>
                  <p className="text-white/70 text-sm mt-1">Track equipment status: active, under repair, awaiting disposal, on loan, etc. This helps identify equipment unavailable for testing.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Dealing with Ghost Assets</h4>
              <p className="text-white/70 text-sm mb-2">'Ghost assets' are items in your register that no longer exist or cannot be located. They distort reporting and scheduling.</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Investigate during regular audits</li>
                <li>- Check with department managers before marking disposed</li>
                <li>- Equipment may have been moved, renamed, or scrapped</li>
                <li>- Update register to reflect actual status</li>
                <li>- Document investigation findings</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Register Auditing
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Regular audits verify register accuracy and identify gaps. They ensure your testing programme covers all equipment and records remain reliable.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Audit Types and Frequency</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/20"><th className="text-left py-2 text-elec-yellow font-medium">Audit Type</th><th className="text-center py-2 text-elec-yellow font-medium">Frequency</th><th className="text-left py-2 text-elec-yellow font-medium">Scope</th></tr></thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10"><td className="py-2">Full physical audit</td><td className="text-center py-2">Annually</td><td className="py-2">All equipment, all locations</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2">Spot checks</td><td className="text-center py-2">Quarterly</td><td className="py-2">Random sample per department</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2">Department review</td><td className="text-center py-2">As needed</td><td className="py-2">Following reorganisation or moves</td></tr>
                    <tr><td className="py-2">New equipment verification</td><td className="text-center py-2">Monthly</td><td className="py-2">Cross-check with procurement records</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Audit Checklist</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Equipment exists at recorded location</li>
                  <li>- Asset label attached and legible</li>
                  <li>- Description matches actual item</li>
                  <li>- PAT test label present (if tested)</li>
                  <li>- No unregistered equipment found</li>
                  <li>- Equipment condition acceptable</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Common Findings</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Equipment moved without register update</li>
                  <li>- New items not registered</li>
                  <li>- Disposed items still in register</li>
                  <li>- Personal equipment brought in</li>
                  <li>- Missing or damaged asset labels</li>
                  <li>- Duplicate entries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Asset Register Setup</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Required Data Fields</h4>
              <ul className="text-white space-y-1">
                <li>- Asset ID (unique identifier)</li>
                <li>- Equipment description</li>
                <li>- Manufacturer & model</li>
                <li>- Serial number</li>
                <li>- Location/department</li>
                <li>- Equipment class (I/II/III)</li>
                <li>- Test interval</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Maintenance Tasks</h4>
              <ul className="text-white space-y-1">
                <li>- Add new equipment immediately</li>
                <li>- Update location changes</li>
                <li>- Mark disposals (don't delete)</li>
                <li>- Annual full audit</li>
                <li>- Quarterly spot checks</li>
                <li>- Replace damaged labels</li>
                <li>- Regular data backups</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 5.3 Quiz</h2>
          <p className="text-white/60">Test your understanding of asset register creation and management.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m5s3" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../section-2" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: Record Keeping
            </Button>
          </Link>
          <Link to="../section-4" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Re-Test Period Planning <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule5Section3;
