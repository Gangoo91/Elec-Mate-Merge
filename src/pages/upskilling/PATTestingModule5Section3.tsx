import { ArrowLeft, Database, CheckCircle, Search, QrCode, MapPin, Settings, Layers, AlertTriangle, BookOpen } from "lucide-react";
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
  {
    question: "What information is essential in an asset register entry?",
    options: ["Just the equipment name", "Asset ID, description, location, and test status", "Only purchase price", "Manufacturer contact details only"],
    correctAnswer: 1
  },
  {
    question: "What is the advantage of using barcode or QR code labels?",
    options: ["They look professional", "Fast, accurate identification and reduced data entry errors", "They are colourful", "They are waterproof"],
    correctAnswer: 1
  },
  {
    question: "When creating an initial asset register, you should:",
    options: ["Only register expensive items", "Conduct a comprehensive site walkthrough", "Wait until equipment fails", "Copy a template from the internet"],
    correctAnswer: 1
  },
  {
    question: "How should personal equipment brought from home be handled?",
    options: ["Ignore it completely", "Include in register and test before use", "Only test if it looks old", "Let the owner test it"],
    correctAnswer: 1
  },
  {
    question: "Which asset register format offers the best searchability?",
    options: ["Paper cards", "Electronic database system", "Handwritten notebook", "Memory alone"],
    correctAnswer: 1
  },
  {
    question: "What should happen when equipment is moved to a new location?",
    options: ["Nothing - location doesn't matter", "Update the register with new location", "Remove from register", "Create a new asset ID"],
    correctAnswer: 1
  },
  {
    question: "How should disposed equipment be handled in the register?",
    options: ["Delete the record immediately", "Mark as disposed with date and retain record", "Ignore it", "Transfer to another register"],
    correctAnswer: 1
  },
  {
    question: "What is a 'ghost asset' in PAT testing context?",
    options: ["Haunted equipment", "Equipment in register but no longer exists", "New equipment", "Equipment on loan"],
    correctAnswer: 1
  },
  {
    question: "For multi-site organisations, asset IDs should:",
    options: ["Be the same across all sites", "Include a site identifier", "Only use numbers", "Be assigned randomly"],
    correctAnswer: 1
  },
  {
    question: "What triggers the need to add equipment to the register?",
    options: ["Only annual review", "Purchase, transfer in, or discovery of unregistered items", "Only when testing", "Never - register is fixed"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "How do I handle equipment without serial numbers?",
    answer: "Assign your own unique asset ID using a sequential numbering system. Attach a permanent label with this ID to the equipment. Document the lack of manufacturer serial number in your records."
  },
  {
    question: "Should I include fixed appliances in the PAT register?",
    answer: "Fixed (hardwired) appliances are not portable and are typically covered by periodic fixed installation testing. However, you may include them in a general electrical equipment register for completeness."
  },
  {
    question: "How do I manage equipment shared between departments?",
    answer: "Assign a 'home' location for the equipment and track loans via a sign-out system. Alternatively, assign it to a 'shared equipment' category with defined custodian responsibility."
  },
  {
    question: "What's the best way to handle new equipment entering the site?",
    answer: "Establish a process where all new equipment is registered before use. Include goods receiving in the process so equipment is captured at delivery. New items should be tested and labelled before deployment."
  },
  {
    question: "Should contractors' equipment be in our register?",
    answer: "Contractors' equipment remains their responsibility. However, you should verify they have a testing regime and may record their test certificates. Your register should note contractor equipment is on-site but managed externally."
  },
  {
    question: "How do I handle equipment that's rarely used?",
    answer: "Include all equipment in the register regardless of usage frequency. Rarely used equipment may actually need more attention as faults may go unnoticed. Test before use if left idle for extended periods."
  }
];

const PATTestingModule5Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to=".."
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 5</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-3xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <Database className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 5 • Section 3</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Asset Register Creation & Management</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building and maintaining a comprehensive database of all portable appliances for effective testing management.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              An asset register catalogues all portable appliances requiring testing. It includes unique IDs, descriptions,
              locations, and test history. Regular audits ensure accuracy. Electronic systems with barcode scanning provide
              the best efficiency.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Key Benefits
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• No equipment missed from testing</li>
              <li>• Easy scheduling and tracking</li>
              <li>• Location management</li>
              <li>• Compliance evidence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Create a comprehensive asset register from scratch",
              "Implement effective asset identification systems",
              "Manage equipment locations and movements",
              "Maintain register accuracy through auditing",
              "Handle special cases (shared, personal, disposed equipment)",
              "Select appropriate register management tools"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: What is an Asset Register */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">What is an Asset Register?</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              An asset register is a comprehensive database of all portable electrical equipment that requires PAT testing.
              It serves as the foundation of your testing programme, ensuring every item is identified, tracked, and tested
              at appropriate intervals.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Core Functions of an Asset Register</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Search className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Identification:</strong> Uniquely identifies every testable item</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Location:</strong> Records where equipment is located</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Database className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>History:</strong> Tracks test history and results</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Settings className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Scheduling:</strong> Enables test due date management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Classification:</strong> Groups equipment by type/risk</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Compliance:</strong> Demonstrates systematic approach</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Minimum Data Fields</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div>• Asset ID number</div>
                <div>• Description/type</div>
                <div>• Manufacturer</div>
                <div>• Model number</div>
                <div>• Serial number</div>
                <div>• Location</div>
                <div>• Department</div>
                <div>• Equipment class</div>
                <div>• Date registered</div>
                <div>• Last test date</div>
                <div>• Next test due</div>
                <div>• Current status</div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Creating the Initial Register */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Creating the Initial Register</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Creating a comprehensive asset register requires a systematic approach. The initial setup is the most
              time-consuming phase, but getting it right establishes a solid foundation for ongoing management.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Step-by-Step Process</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">1</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Plan the Walkthrough</h5>
                    <p className="text-sm mt-1">Obtain floor plans or site maps. Schedule access to all areas including restricted spaces,
                    storage rooms, and workshops. Inform department managers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">2</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Define Naming Conventions</h5>
                    <p className="text-sm mt-1">Establish asset ID format before starting. Example: LOC-DEPT-0001 (Building A, IT Department, item 1).
                    Consistent format aids sorting and reporting.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">3</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Conduct Systematic Walkthrough</h5>
                    <p className="text-sm mt-1">Work room-by-room, recording every portable appliance. Check desks, under desks, storage areas,
                    kitchens, workshops, and reception areas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">4</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Record All Details</h5>
                    <p className="text-sm mt-1">Capture all required data fields. Take photos of nameplates if needed.
                    Note equipment condition and any visible damage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">5</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Apply Asset Labels</h5>
                    <p className="text-sm mt-1">Attach permanent labels with asset ID to each item.
                    Position labels where visible but protected from wear.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">6</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Enter Data and Verify</h5>
                    <p className="text-sm mt-1">Input all data into your chosen system.
                    Review entries for completeness and accuracy before going live.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Commonly Missed Items
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div>• Phone chargers</div>
                <div>• Desk fans</div>
                <div>• Personal heaters</div>
                <div>• Extension leads</div>
                <div>• Multiway adaptors</div>
                <div>• Coffee machines</div>
                <div>• Microwaves</div>
                <div>• Fridges</div>
                <div>• Vending machines</div>
                <div>• Portable heaters</div>
                <div>• Desk lamps</div>
                <div>• Power tools</div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Asset Identification Systems */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Asset Identification Systems</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective identification systems enable rapid equipment location and accurate record linking.
              The choice of system depends on organisation size, budget, and operational requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">Barcode/QR Code Systems</h4>
                </div>
                <p className="text-sm mb-3">Most efficient for medium to large organisations.</p>
                <div className="text-sm space-y-2">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="space-y-1 mb-2">
                    <li>• Fast scanning reduces data entry time</li>
                    <li>• Eliminates transcription errors</li>
                    <li>• Links directly to database record</li>
                    <li>• Works with most PAT software</li>
                  </ul>
                  <p className="text-red-400 font-medium">Considerations:</p>
                  <ul className="space-y-1">
                    <li>• Initial setup cost for labels and scanners</li>
                    <li>• Labels can become damaged</li>
                    <li>• Requires compatible software</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Numeric/Alphanumeric Labels</h4>
                <p className="text-sm mb-3">Suitable for smaller organisations or manual systems.</p>
                <div className="text-sm space-y-2">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="space-y-1 mb-2">
                    <li>• Low cost implementation</li>
                    <li>• No special equipment needed</li>
                    <li>• Human-readable at a glance</li>
                    <li>• Works with any record system</li>
                  </ul>
                  <p className="text-red-400 font-medium">Considerations:</p>
                  <ul className="space-y-1">
                    <li>• Manual data entry required</li>
                    <li>• Higher risk of transcription errors</li>
                    <li>• Slower test process</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Recommended ID Format</h4>
              <div className="text-sm space-y-2">
                <p>Structure: <code className="bg-gray-800 px-2 py-0.5 rounded">[SITE]-[DEPT]-[NUMBER]</code></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="font-medium text-white">Examples:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• HQ-IT-0001 (Head Office, IT, item 1)</li>
                      <li>• WH-OPS-0156 (Warehouse, Operations)</li>
                      <li>• BR2-ADMIN-0023 (Branch 2, Admin)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white">Benefits:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Location immediately identifiable</li>
                      <li>• Easy sorting by department</li>
                      <li>• Unique across all sites</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Label Specifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Material Requirements</h5>
                  <ul className="space-y-1">
                    <li>• Tamper-evident or permanent adhesive</li>
                    <li>• Heat and chemical resistant</li>
                    <li>• Legible text size (min 8pt)</li>
                    <li>• Durable for expected environment</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Placement Guidelines</h5>
                  <ul className="space-y-1">
                    <li>• Visible when equipment is in use</li>
                    <li>• Protected from wear and abrasion</li>
                    <li>• Away from hot surfaces</li>
                    <li>• Not covering safety information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Ongoing Management */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Ongoing Register Management</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              An asset register is a living document that requires regular maintenance. Without ongoing management,
              it quickly becomes inaccurate and loses its value as a compliance tool.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Key Management Activities</h4>
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-3">
                  <h5 className="font-medium text-green-400">Adding New Equipment</h5>
                  <p className="text-sm mt-1">Establish a process to capture new equipment at purchase or arrival.
                  Goods receiving, procurement, or IT departments should trigger registration.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <h5 className="font-medium text-blue-400">Recording Disposals</h5>
                  <p className="text-sm mt-1">When equipment is disposed, update the register with disposal date, method,
                  and reason. Never delete records - mark as disposed and retain.</p>
                </div>
                <div className="border-l-2 border-orange-500 pl-3">
                  <h5 className="font-medium text-orange-400">Location Changes</h5>
                  <p className="text-sm mt-1">Update register when equipment moves. Consider a sign-out/sign-in system
                  for frequently moved items or shared equipment.</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <h5 className="font-medium text-purple-400">Status Updates</h5>
                  <p className="text-sm mt-1">Track equipment status: active, under repair, awaiting disposal,
                  on loan, etc. This helps identify equipment unavailable for testing.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Dealing with Ghost Assets</h4>
              <p className="text-sm mb-2">
                'Ghost assets' are items in your register that no longer exist or cannot be located.
                They distort reporting and scheduling.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Investigate during regular audits</li>
                <li>• Check with department managers before marking disposed</li>
                <li>• Equipment may have been moved, renamed, or scrapped</li>
                <li>• Update register to reflect actual status</li>
                <li>• Document investigation findings</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 05: Register Auditing */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Register Auditing</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Regular audits verify register accuracy and identify gaps. They ensure your testing programme
              covers all equipment and records remain reliable.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Audit Types and Frequency</h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2 items-center border-b border-gray-700 pb-2">
                  <span className="font-medium text-elec-yellow">Audit Type</span>
                  <span className="font-medium text-elec-yellow">Frequency</span>
                  <span className="font-medium text-elec-yellow">Scope</span>
                </div>
                <div className="grid grid-cols-3 gap-2 items-start border-b border-gray-700 pb-2">
                  <span>Full physical audit</span>
                  <span>Annually</span>
                  <span>All equipment, all locations</span>
                </div>
                <div className="grid grid-cols-3 gap-2 items-start border-b border-gray-700 pb-2">
                  <span>Spot checks</span>
                  <span>Quarterly</span>
                  <span>Random sample per department</span>
                </div>
                <div className="grid grid-cols-3 gap-2 items-start border-b border-gray-700 pb-2">
                  <span>Department review</span>
                  <span>As needed</span>
                  <span>Following reorganisation or moves</span>
                </div>
                <div className="grid grid-cols-3 gap-2 items-start">
                  <span>New equipment verification</span>
                  <span>Monthly</span>
                  <span>Cross-check with procurement records</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Audit Checklist</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Equipment exists at recorded location</li>
                  <li>✓ Asset label attached and legible</li>
                  <li>✓ Description matches actual item</li>
                  <li>✓ PAT test label present (if tested)</li>
                  <li>✓ No unregistered equipment found</li>
                  <li>✓ Equipment condition acceptable</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Common Findings</h4>
                <ul className="text-sm space-y-1">
                  <li>• Equipment moved without register update</li>
                  <li>• New items not registered</li>
                  <li>• Disposed items still in register</li>
                  <li>• Personal equipment brought in</li>
                  <li>• Missing or damaged asset labels</li>
                  <li>• Duplicate entries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Software Options</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium">Dedicated PAT Software</h5>
                  <p className="text-gray-300 mt-1">Purpose-built solutions with PAT tester integration, automatic scheduling,
                  certificate generation, and compliance reporting. Best for professional testers and larger organisations.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium">Spreadsheet Systems</h5>
                  <p className="text-gray-300 mt-1">Excel or Google Sheets can work for smaller operations. Use data validation,
                  conditional formatting, and pivot tables. Limited automation and higher error risk.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium">General Asset Management Software</h5>
                  <p className="text-gray-300 mt-1">Tools like Asset Panda or Snipe-IT can be adapted for PAT tracking.
                  Good if already using for other asset types.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Common Mistakes to Avoid</h4>
              <ul className="text-sm space-y-1">
                <li>• Starting testing before completing the register</li>
                <li>• Using overly complex ID systems</li>
                <li>• Not involving department managers in setup</li>
                <li>• Deleting records instead of marking disposed</li>
                <li>• Ignoring personal equipment brought from home</li>
                <li>• Failing to audit register regularly</li>
                <li>• Not backing up electronic records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Asset Register Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Required Data Fields</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Asset ID (unique identifier)</li>
                  <li>• Equipment description</li>
                  <li>• Manufacturer & model</li>
                  <li>• Serial number</li>
                  <li>• Location/department</li>
                  <li>• Equipment class (I/II/III)</li>
                  <li>• Test interval</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Maintenance Tasks</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Add new equipment immediately</li>
                  <li>• Update location changes</li>
                  <li>• Mark disposals (don't delete)</li>
                  <li>• Annual full audit</li>
                  <li>• Quarterly spot checks</li>
                  <li>• Replace damaged labels</li>
                  <li>• Regular data backups</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 3 Quiz: Asset Register Creation & Management"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="../section-2">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Record Keeping
            </Button>
          </Link>
          <Link to="../section-4">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next: Re-Test Period Planning
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PATTestingModule5Section3;
