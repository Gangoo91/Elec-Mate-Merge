import { ArrowLeft, Smartphone, CheckCircle, AlertTriangle, QrCode, Cloud, Share2, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-towersure-what",
    question: "What is TowerSure?",
    options: [
      "A type of stabiliser used on mobile scaffold towers",
      "PASMA's digital inspection app for recording tower inspections",
      "A brand of mobile scaffold tower manufactured in the UK",
      "An HSE database of all scaffold inspection records"
    ],
    correctIndex: 1,
    explanation: "TowerSure is PASMA's digital inspection app, available on iOS and Android. It replaces paper inspection forms and provides time-stamped, cloud-stored inspection records for mobile scaffold towers."
  },
  {
    id: "pasma-towersure-advantage",
    question: "What is the primary advantage of TowerSure's time-stamped records over paper records?",
    options: [
      "They are printed in colour",
      "They cannot be backdated, providing a tamper-resistant audit trail",
      "They cost more to produce, showing investment in safety",
      "They can only be read by PASMA-trained operatives"
    ],
    correctIndex: 1,
    explanation: "The key advantage of digital time-stamped records is that they cannot be backdated. Each record is automatically stamped with the exact date, time, and location when it is created, providing a tamper-resistant audit trail that paper records cannot match."
  },
  {
    id: "pasma-towersure-future",
    question: "Which emerging technology could enhance tower inspection in the future?",
    options: [
      "Typewriters for clearer documentation",
      "IoT sensors that monitor tower condition in real time",
      "Carrier pigeons for delivering inspection records",
      "Fax machines for sharing records between sites"
    ],
    correctIndex: 1,
    explanation: "Internet of Things (IoT) sensors are an emerging technology that could monitor tower conditions in real time — detecting movement, tilt, wind loading, and component stress without requiring a human inspector to be present."
  }
];

const faqs = [
  {
    question: "Is TowerSure free to download and use?",
    answer: "Yes, TowerSure is free to download from the Apple App Store and Google Play Store. The basic inspection functionality is available at no cost. PASMA periodically updates the app with new features and improvements. There may be premium features or integrations available for larger organisations, but the core inspection recording functionality is free."
  },
  {
    question: "Do I need an internet connection to use TowerSure on site?",
    answer: "TowerSure is designed to work in environments with limited connectivity. You can complete inspections offline, and the app will synchronise records to the cloud when a connection becomes available. However, for sharing records instantly or accessing historical data from other devices, an internet connection is required. It is good practice to ensure records are synced before leaving site."
  },
  {
    question: "Can TowerSure records be shared with an HSE inspector during a site visit?",
    answer: "Yes. TowerSure records can be displayed on the device screen or exported and shared via email, PDF, or other methods directly from the app. The time-stamped, structured format of TowerSure records is well-suited for presenting to HSE inspectors and demonstrates a modern, professional approach to compliance."
  },
  {
    question: "Does using TowerSure mean I no longer need to understand paper inspection forms?",
    answer: "No. You should always understand the underlying Schedule 5 requirements and be capable of completing a paper form if necessary. Technology can fail — phones break, batteries die, and apps crash. A competent person must be able to record an inspection regardless of the tools available. TowerSure is a tool to make the process easier and more reliable, not a replacement for knowledge and competence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the first step in the TowerSure inspection workflow?",
    options: [
      "Take a photograph of the tower",
      "Scan the QR code attached to the tower",
      "Email the site manager to request permission",
      "Download the inspection from the cloud"
    ],
    correctAnswer: 1,
    explanation: "The TowerSure workflow begins with scanning the QR code attached to the tower. This links the inspection to the specific tower's record, ensuring traceability and preventing mix-ups between different towers on site."
  },
  {
    id: 2,
    question: "Where are TowerSure inspection records stored after submission?",
    options: [
      "Only on the local device",
      "On a USB drive attached to the tower",
      "In the cloud with automatic backup",
      "On PASMA's physical servers in a warehouse"
    ],
    correctAnswer: 2,
    explanation: "TowerSure records are stored in the cloud with automatic backup. This means records are protected against device loss, damage, or theft, and can be accessed from any authorised device with an internet connection."
  },
  {
    id: 3,
    question: "Which of the following is a key advantage of TowerSure over paper inspection forms?",
    options: [
      "Paper forms are more searchable",
      "TowerSure records are automatically time-stamped and cannot be backdated",
      "Paper forms provide better photographic evidence",
      "TowerSure requires no training to use"
    ],
    correctAnswer: 1,
    explanation: "Automatic time-stamping is one of TowerSure's most significant advantages. Unlike paper records, which can be completed or altered after the fact, TowerSure records are stamped with the exact date, time, and GPS location at the moment of creation."
  },
  {
    id: 4,
    question: "How are individual towers identified within the TowerSure system?",
    options: [
      "By the inspector's name",
      "By QR code labels attached to each tower",
      "By the tower's paint colour",
      "By the site postcode only"
    ],
    correctAnswer: 1,
    explanation: "Each tower is registered in TowerSure and given a unique QR code label. When the inspector scans this QR code, the app automatically links the inspection to the correct tower record, building up a complete inspection history for that specific tower."
  },
  {
    id: 5,
    question: "What should you do if TowerSure is unavailable during an inspection (e.g. phone battery dead)?",
    options: [
      "Skip the inspection and complete it the next day",
      "Complete the inspection on paper using a Schedule 5 compliant form",
      "Ask someone else to do the inspection on their phone",
      "Take photographs only and upload them later"
    ],
    correctAnswer: 1,
    explanation: "If TowerSure or any digital tool is unavailable, you must still carry out the inspection and record it. A paper form that captures all Schedule 5 mandatory fields is perfectly acceptable. The inspection cannot be postponed because of a technology failure."
  },
  {
    id: 6,
    question: "Which of the following can TowerSure notifications help prevent?",
    options: [
      "Tower components from rusting",
      "Wind speed from increasing",
      "Overdue inspections being missed",
      "Operatives from climbing the tower"
    ],
    correctAnswer: 2,
    explanation: "TowerSure can be configured to send notifications when inspections are due, helping to prevent the 7-day interval from being exceeded. This is one of the key benefits of a digital system — automated reminders that paper systems cannot provide."
  },
  {
    id: 7,
    question: "How can TowerSure records be shared with a client or principal contractor?",
    options: [
      "They cannot be shared — records are private",
      "Only by printing them out and posting them by mail",
      "Via export options such as email, PDF, or integration with construction management software",
      "Only by giving the client your phone"
    ],
    correctAnswer: 2,
    explanation: "TowerSure provides multiple sharing options including email, PDF export, and integration with construction management software. This makes it easy to demonstrate compliance to clients, principal contractors, and HSE inspectors."
  },
  {
    id: 8,
    question: "Which emerging technology could provide real-time monitoring of tower conditions without a human inspector?",
    options: [
      "Blockchain ledger technology",
      "Virtual reality headsets",
      "IoT (Internet of Things) sensors",
      "3D printing"
    ],
    correctAnswer: 2,
    explanation: "IoT sensors can be attached to tower components to monitor conditions such as tilt, vibration, wind loading, and component stress in real time. This technology is still emerging but has the potential to supplement human inspections with continuous automated monitoring."
  }
];

export default function PasmaModule5Section4() {
  useSEO({
    title: "TowerSure App & Digital Inspection | PASMA Module 5.4",
    description: "PASMA TowerSure digital inspection app: how it works, QR code workflow, benefits over paper, setup, sharing records, compliance, and the future of digital tower inspection.",
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
            <Link to="../pasma-module-5">
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
            <Smartphone className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            TowerSure App &amp; Digital Inspection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            PASMA&rsquo;s digital inspection platform &mdash; replacing paper forms with time-stamped, cloud-stored records that modernise compliance and simplify audit trails
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> PASMA&rsquo;s free digital inspection app (iOS &amp; Android)</li>
              <li><strong>How:</strong> Scan QR &rarr; Answer checklist &rarr; Photo &rarr; Submit &rarr; Cloud</li>
              <li><strong>Why:</strong> Time-stamped, searchable, shareable, tamper-resistant records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Register towers, attach QR labels, set up team access</li>
              <li><strong>During:</strong> Scan, inspect, photograph, submit &mdash; all from your phone</li>
              <li><strong>After:</strong> Share records instantly, review analytics, schedule next check</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what TowerSure is and why PASMA developed it",
              "Describe the 5-step TowerSure inspection workflow",
              "Compare the benefits and limitations of digital vs paper inspection",
              "Set up TowerSure for a new site including tower registration",
              "Share inspection records with clients, contractors, and the HSE",
              "Identify emerging technologies that will shape future tower compliance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is TowerSure? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is TowerSure?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                TowerSure is PASMA&rsquo;s official digital inspection application, developed to modernise
                and simplify the process of recording mobile scaffold tower inspections. It is available as
                a free download on both iOS (Apple App Store) and Android (Google Play Store) and is designed
                to replace traditional paper inspection forms with a faster, more reliable digital alternative.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> TowerSure was developed by PASMA
                  in response to industry feedback that paper inspection records were inconsistent, often
                  incomplete, and vulnerable to loss, damage, and backdating. The app addresses all of these
                  issues by providing a structured, time-stamped, cloud-backed recording system.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">TowerSure at a Glance</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Free to download</strong> &mdash; no subscription required for core functionality</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Cross-platform</strong> &mdash; works on iOS and Android smartphones and tablets</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Offline capable</strong> &mdash; complete inspections without connectivity, sync when back online</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Schedule 5 compliant</strong> &mdash; captures all 7 mandatory record fields automatically</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Photo integration</strong> &mdash; attach time-stamped photographs directly to each inspection record</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Cloud storage</strong> &mdash; records backed up automatically, accessible from any authorised device</span></li>
                </ul>
              </div>

              <p>
                TowerSure is not the only digital inspection tool available, but it is the one developed and
                endorsed by PASMA &mdash; the trade body for the mobile access tower industry. Using TowerSure
                demonstrates alignment with industry best practice and PASMA&rsquo;s recommended standards.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: How TowerSure Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How TowerSure Works
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The TowerSure workflow is designed to be simple and intuitive, even for operatives who are
                not particularly tech-savvy. The process follows five clear steps, each taking only a few
                moments to complete. The entire inspection can typically be recorded in under five minutes.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">The 5-Step TowerSure Workflow</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Scan QR Code</p>
                      <p className="text-sm text-white/80">Open the TowerSure app and scan the QR code label attached to the tower. This instantly identifies the tower and links the inspection to its unique record history.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Answer Checklist Questions</p>
                      <p className="text-sm text-white/80">Work through the structured inspection checklist. Each question prompts you to check a specific component or condition. Answer pass, fail, or N/A with optional notes for each item.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Take Photograph</p>
                      <p className="text-sm text-white/80">Capture a photograph of the tower showing its current condition and location. The image is automatically time-stamped and GPS-tagged.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Submit</p>
                      <p className="text-sm text-white/80">Review the completed inspection and submit. The record is signed digitally with your TowerSure account credentials, providing attribution to the competent person.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">Cloud Storage</p>
                      <p className="text-sm text-white/80">The completed record is uploaded to secure cloud storage, where it is backed up, searchable, and accessible to authorised users from any device.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Each QR code is unique to a specific tower. This means that over time, TowerSure builds a
                complete inspection history for every tower in your fleet &mdash; showing every inspection
                carried out, every defect found, every action taken, and the condition of the tower at each
                point in time. This historical data is invaluable for asset management and compliance audits.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: TowerSure Workflow Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TowerSure Workflow Overview
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following diagram illustrates the five-step TowerSure workflow from scanning the tower&rsquo;s
                QR code through to secure cloud storage. Each step takes only moments, and the entire process
                is completed on a single device.
              </p>

              {/* SVG Flowchart */}
              <div className="my-8 flex justify-center">
                <svg viewBox="0 0 600 200" className="w-full max-w-xl" role="img" aria-label="TowerSure 5-step workflow: Scan QR, Answer Questions, Take Photo, Submit, Cloud Storage">
                  {/* Step 1: Scan QR */}
                  <rect x="2" y="50" width="96" height="100" rx="12" fill="rgba(250,204,21,0.08)" stroke="rgba(250,204,21,0.4)" strokeWidth="1.5" />
                  <circle cx="50" cy="85" r="16" fill="rgba(250,204,21,0.15)" stroke="rgba(250,204,21,0.5)" strokeWidth="1" />
                  <rect x="41" y="76" width="18" height="18" rx="2" fill="none" stroke="rgba(250,204,21,0.8)" strokeWidth="1.5" />
                  <rect x="44" y="79" width="4" height="4" fill="rgba(250,204,21,0.8)" />
                  <rect x="52" y="79" width="4" height="4" fill="rgba(250,204,21,0.8)" />
                  <rect x="44" y="87" width="4" height="4" fill="rgba(250,204,21,0.8)" />
                  <text x="50" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Scan QR</text>
                  <text x="50" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Identify tower</text>

                  {/* Arrow 1→2 */}
                  <line x1="102" y1="100" x2="118" y2="100" stroke="rgba(250,204,21,0.4)" strokeWidth="1.5" />
                  <polygon points="118,96 126,100 118,104" fill="rgba(250,204,21,0.5)" />

                  {/* Step 2: Answer Questions */}
                  <rect x="128" y="50" width="96" height="100" rx="12" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
                  <circle cx="176" cy="85" r="16" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
                  <rect x="167" y="76" width="18" height="18" rx="2" fill="none" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" />
                  <line x1="171" y1="82" x2="183" y2="82" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
                  <line x1="171" y1="86" x2="183" y2="86" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
                  <line x1="171" y1="90" x2="179" y2="90" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
                  <text x="176" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Checklist</text>
                  <text x="176" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Answer prompts</text>

                  {/* Arrow 2→3 */}
                  <line x1="228" y1="100" x2="244" y2="100" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
                  <polygon points="244,96 252,100 244,104" fill="rgba(168,85,247,0.5)" />

                  {/* Step 3: Take Photo */}
                  <rect x="254" y="50" width="96" height="100" rx="12" fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
                  <circle cx="302" cy="85" r="16" fill="rgba(20,184,166,0.15)" stroke="rgba(20,184,166,0.5)" strokeWidth="1" />
                  <rect x="292" y="77" width="20" height="16" rx="3" fill="none" stroke="rgba(20,184,166,0.8)" strokeWidth="1.5" />
                  <circle cx="302" cy="85" r="5" fill="none" stroke="rgba(20,184,166,0.8)" strokeWidth="1.5" />
                  <text x="302" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Photograph</text>
                  <text x="302" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Capture evidence</text>

                  {/* Arrow 3→4 */}
                  <line x1="354" y1="100" x2="370" y2="100" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
                  <polygon points="370,96 378,100 370,104" fill="rgba(20,184,166,0.5)" />

                  {/* Step 4: Submit */}
                  <rect x="380" y="50" width="96" height="100" rx="12" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
                  <circle cx="428" cy="85" r="16" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
                  <polyline points="419,85 425,91 437,79" fill="none" stroke="rgba(59,130,246,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="428" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Submit</text>
                  <text x="428" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Sign &amp; confirm</text>

                  {/* Arrow 4→5 */}
                  <line x1="480" y1="100" x2="496" y2="100" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
                  <polygon points="496,96 504,100 496,104" fill="rgba(59,130,246,0.5)" />

                  {/* Step 5: Cloud Storage */}
                  <rect x="506" y="50" width="92" height="100" rx="12" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
                  <circle cx="552" cy="85" r="16" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />
                  <path d="M542,89 a7,7 0 0 1 0,-8 a6,6 0 0 1 10,-3 a5,5 0 0 1 8,4 a5,5 0 0 1 -2,7 z" fill="none" stroke="rgba(34,197,94,0.8)" strokeWidth="1.5" />
                  <text x="552" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Cloud</text>
                  <text x="552" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Secure backup</text>

                  {/* Step numbers along top */}
                  <text x="50" y="40" textAnchor="middle" fill="rgba(250,204,21,0.6)" fontSize="9" fontWeight="600">Step 1</text>
                  <text x="176" y="40" textAnchor="middle" fill="rgba(168,85,247,0.6)" fontSize="9" fontWeight="600">Step 2</text>
                  <text x="302" y="40" textAnchor="middle" fill="rgba(20,184,166,0.6)" fontSize="9" fontWeight="600">Step 3</text>
                  <text x="428" y="40" textAnchor="middle" fill="rgba(59,130,246,0.6)" fontSize="9" fontWeight="600">Step 4</text>
                  <text x="552" y="40" textAnchor="middle" fill="rgba(34,197,94,0.6)" fontSize="9" fontWeight="600">Step 5</text>
                </svg>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Workflow in Practice</p>
                <p className="text-sm text-white/80">
                  The entire TowerSure workflow &mdash; from scanning the QR code to the record being stored
                  in the cloud &mdash; typically takes 3&ndash;5 minutes for a routine inspection. If defects
                  are found and additional notes or photographs are needed, it may take slightly longer. This
                  is comparable to or faster than completing a paper form, with the added benefit of automatic
                  time-stamping, cloud backup, and instant shareability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Benefits vs Paper Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benefits vs Paper Inspection
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Digital inspection through TowerSure offers significant advantages over traditional paper
                forms, but it is important to understand both the benefits and the limitations so you can
                make an informed decision about which system &mdash; or combination &mdash; works best
                for your operation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">TowerSure Advantages</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Time-stamped &mdash; records cannot be backdated</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Photo evidence built into every record</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Searchable &mdash; find any record in seconds</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Shareable instantly via email or export</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Backed up automatically to secure cloud</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Complete audit trail for each tower</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Analytics to identify defect trends</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Automated overdue inspection alerts</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">TowerSure Limitations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Requires a smartphone or tablet</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Device battery must be charged</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Connectivity needed for sync (offline mode available)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Operatives need basic app familiarity</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Device may be damaged on site</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>QR labels must be maintained on towers</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Initial setup time to register towers</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Dependence on PASMA maintaining the platform</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The most significant advantage of
                  TowerSure is the automatic time-stamp. Paper records can be completed at any time &mdash;
                  there is nothing to prevent someone filling in a form at the end of the week and backdating
                  it. TowerSure records are stamped at the moment of creation, making it virtually impossible
                  to falsify the date and time of an inspection. This is a powerful compliance tool.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Always Have a Paper Backup Plan</p>
                </div>
                <p className="text-sm text-white/80">
                  Technology is not infallible. Phones break, batteries die, and apps occasionally crash.
                  You must always have paper inspection forms available as a backup. If TowerSure is
                  unavailable for any reason, the inspection must still be carried out and recorded. A
                  competent person should never delay an inspection because of a technology failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Setting Up TowerSure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Setting Up TowerSure
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Setting up TowerSure for a new site or fleet of towers involves a few straightforward steps.
                The initial setup takes a small investment of time but pays dividends in efficiency and
                compliance throughout the life of the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Setup Steps</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Download the App</p>
                      <p className="text-sm text-white/80">Install TowerSure from the Apple App Store or Google Play Store. It is free to download and does not require a paid subscription.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Create Your Account</p>
                      <p className="text-sm text-white/80">Register with your name, company details, and contact information. This creates your inspector profile which will be attributed to all records you submit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Register Your Towers</p>
                      <p className="text-sm text-white/80">Add each tower to the system with its manufacturer, model, configuration, and location. Attach a unique QR code label to each tower in a visible, protected position.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Set Up Inspection Schedules</p>
                      <p className="text-sm text-white/80">Configure the 7-day inspection interval for each tower. TowerSure will send notifications when inspections are due, helping to prevent overdue inspections.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">Add Team Members</p>
                      <p className="text-sm text-white/80">Invite other competent persons to join your TowerSure account so they can carry out and record inspections. Set appropriate access levels for each team member.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-sm font-medium text-white">Configure Notifications</p>
                      <p className="text-sm text-white/80">Set up alerts for overdue inspections, upcoming inspections, and any failed inspection results that require follow-up action.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> QR code labels must be attached
                  in a location that is visible and accessible but protected from damage. The inside of a
                  frame member or the underside of the platform are common positions. Use weatherproof,
                  durable labels &mdash; a QR code that has faded or been torn off is useless. Carry spare
                  labels on site for replacements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Sharing Records & Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Sharing Records &amp; Compliance
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most practical advantages of TowerSure is the ability to share inspection records
                instantly with anyone who needs them. This is particularly valuable during HSE visits, client
                audits, and when demonstrating compliance to principal contractors.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Sharing Options</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">On-screen display:</strong> Show the record directly on your device during a site visit or audit. The structured format is easy to read and presents professionally</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">PDF export:</strong> Generate a formal PDF report of any inspection or series of inspections. Suitable for inclusion in project files and handover documentation</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Email:</strong> Send records directly via email to clients, principal contractors, HSE inspectors, or colleagues</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Construction management integration:</strong> Some platforms allow direct integration with site management software, pulling tower inspection data into the broader project compliance system</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> During an HSE visit, being able
                  to produce comprehensive, time-stamped inspection records within seconds makes a powerful
                  impression. It demonstrates that your organisation takes compliance seriously and has invested
                  in systems that go beyond the minimum. Contrast this with rummaging through a filing cabinet
                  for a crumpled paper form &mdash; the difference in perception is significant.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Demonstrating Compliance During Audits</p>
                <p className="text-sm text-white/80">
                  TowerSure&rsquo;s cloud-based system allows you to pull up the complete inspection history
                  of any tower, from its first registration through to the most recent inspection. This
                  longitudinal view shows the auditor that inspections have been carried out consistently,
                  defects have been addressed, and the 7-day interval has been maintained. Analytics features
                  can also show trends, such as the most common defect types or the average time between
                  inspections.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: The Future of Digital Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            The Future of Digital Compliance
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Digital inspection tools like TowerSure represent the current state of the art, but the
                technology is evolving rapidly. Several emerging technologies have the potential to
                transform how tower inspections are carried out, recorded, and monitored in the coming
                years.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Emerging Technologies</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">IoT sensors:</strong> Small wireless sensors attached to tower components that continuously monitor tilt, vibration, wind loading, and component stress. Data transmitted in real time to a central dashboard, alerting supervisors to changes that require attention</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Automated alerts:</strong> Systems that automatically notify the responsible person when a tower exceeds a pre-set tilt angle, when wind speed approaches the working limit, or when a component sensor detects an anomaly</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">AI defect recognition:</strong> Artificial intelligence trained on thousands of inspection photographs to automatically identify defects such as corrosion, bending, cracking, and missing components from uploaded images</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Industry-wide databases:</strong> Shared databases where tower inspection records from across the industry contribute to a national picture of tower safety, enabling regulators to identify trends and target enforcement</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Digital PASMA cards:</strong> Linking TowerSure inspection records to the inspector&rsquo;s PASMA digital card, automatically verifying their competence and training currency at the point of inspection</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Real-time compliance dashboards:</strong> Management dashboards showing the inspection status of every tower in the fleet, with colour-coded indicators for compliance, upcoming, and overdue inspections</span></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">What This Means for You</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Embrace digital tools now &mdash; they will become standard</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Maintain your competence in both digital and paper methods</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Stay current with PASMA updates and new features</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>View technology as a complement to, not replacement for, human judgement</span></li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">The Human Element Remains</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Technology assists but does not replace the competent person</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Professional judgement is still required for every inspection</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Sensors can detect data but cannot make safety decisions</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>The legal duty remains with the duty holder, not the technology</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> No matter how sophisticated the
                  technology becomes, the legal requirement for a competent person to carry out inspections
                  will remain. IoT sensors, AI, and automated systems will augment human inspection &mdash;
                  making it faster, more accurate, and more consistent &mdash; but they will not remove the
                  need for a trained, experienced person to exercise professional judgement on whether a
                  tower is safe to use.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../pasma-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Records &amp; Documentation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-6">
              Next: Module 6 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}