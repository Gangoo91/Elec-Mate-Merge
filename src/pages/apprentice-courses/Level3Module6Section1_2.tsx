import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Compliance with BS 7671 and Building Regulations - Level 3 Module 6 Section 1.2";
const DESCRIPTION = "Understanding how electrical designs must comply with BS 7671 wiring regulations and Building Regulations Part P for safe, legal installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the legal status of BS 7671 in England and Wales?",
    options: [
      "It is directly enforceable criminal law",
      "It is a non-statutory standard that is called up by Building Regulations",
      "It only applies to industrial installations",
      "It is purely advisory with no legal standing"
    ],
    correctIndex: 1,
    explanation: "BS 7671 itself is not law, but compliance with it is the recognised way to satisfy the electrical safety requirements of Building Regulations Part P. This gives it practical legal significance - installations should meet BS 7671 to demonstrate compliance with Building Regulations."
  },
  {
    id: "check-2",
    question: "Which types of domestic electrical work must be notified to Building Control?",
    options: [
      "All electrical work without exception",
      "Only work costing over £5,000",
      "New circuits, consumer unit replacements, work in special locations, and specified work",
      "Only work carried out by non-qualified persons"
    ],
    correctIndex: 2,
    explanation: "Building Regulations Part P requires notification of new circuits, consumer unit work, work in special locations (bathrooms, kitchens with &lt;50mm from sinks), and other specified work. Minor additions to existing circuits don't require notification."
  },
  {
    id: "check-3",
    question: "Why does BS 7671 require installations to be designed and installed to prevent danger?",
    options: [
      "To satisfy insurance requirements only",
      "To protect people from electric shock and fire, and property from damage",
      "To make electrical work more expensive",
      "To prevent interference with other electrical systems"
    ],
    correctIndex: 1,
    explanation: "The fundamental purpose is safety - protecting persons, livestock and property from electric shock, fire, burns and injury. This is the core objective that all BS 7671 requirements support."
  },
  {
    id: "check-4",
    question: "What is the relationship between BS 7671 and European harmonised standards?",
    options: [
      "BS 7671 completely replaces all European standards",
      "BS 7671 incorporates and references many harmonised standards while adding UK-specific requirements",
      "European standards take priority over BS 7671",
      "They are completely unrelated documents"
    ],
    correctIndex: 1,
    explanation: "BS 7671 is based on international IEC standards and harmonised CENELEC documents, but includes UK-specific requirements and references. It works alongside standards like BS EN 61439 (switchgear) and BS EN 60898 (MCBs)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Building Regulations Part P cover?",
    options: [
      "All electrical work in the UK",
      "Electrical safety in dwellings in England",
      "Commercial electrical installations only",
      "Outdoor electrical work only"
    ],
    correctAnswer: 1,
    explanation: "Part P covers electrical safety in dwellings in England. Scotland, Wales and Northern Ireland have separate but similar requirements. It applies to houses, flats, and residential parts of mixed-use buildings."
  },
  {
    id: 2,
    question: "Which organisation maintains and publishes BS 7671?",
    options: [
      "The Health and Safety Executive",
      "The Institution of Engineering and Technology (IET)",
      "NICEIC",
      "The Government Department for Levelling Up"
    ],
    correctAnswer: 1,
    explanation: "The IET (Institution of Engineering and Technology) publishes BS 7671 on behalf of the British Standards Institution (BSI). The IET also publishes guidance notes and other supporting documents."
  },
  {
    id: 3,
    question: "A designer wants to use a method not explicitly described in BS 7671. Is this permitted?",
    options: [
      "No - only methods in BS 7671 can be used",
      "Yes - provided the alternative provides at least equivalent safety",
      "Only with written permission from the IET",
      "Only for installations under 32A"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 120.3 allows departures from the regulations where alternative methods achieve at least the same degree of safety. Such departures should be documented with reasons and the designer takes responsibility for demonstrating equivalent safety."
  },
  {
    id: 4,
    question: "What is the current edition of BS 7671 at the time of 18th Edition Amendment 2?",
    options: [
      "16th Edition",
      "17th Edition",
      "18th Edition",
      "19th Edition"
    ],
    correctAnswer: 2,
    explanation: "The current standard is BS 7671:2018+A2:2022, commonly known as the 18th Edition with Amendment 2. This came into effect for new installations and rewires from September 2022."
  },
  {
    id: 5,
    question: "What must a designer do if the characteristics of the supply are unknown?",
    options: [
      "Proceed with design using assumed values",
      "Make assumptions based on similar properties",
      "Obtain the information from the DNO before completing the design",
      "Use the highest possible values for safety"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 132.4 requires that characteristics be ascertained. If unknown, the designer should obtain them from the DNO. Assumptions can lead to inadequate protection or unnecessarily expensive over-design."
  },
  {
    id: 6,
    question: "How does a Competent Person Scheme work for Part P compliance?",
    options: [
      "It replaces the need to comply with BS 7671",
      "It allows registered members to self-certify notifiable work without Building Control involvement",
      "It provides insurance for electrical work",
      "It is only for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Competent Person Scheme members can self-certify their notifiable work, issuing certificates directly to clients and notifying the local authority on their behalf. This avoids the need for Building Control inspection but requires scheme membership and regular assessment."
  },
  {
    id: 7,
    question: "What does BS 7671 Regulation 134.1.1 require regarding design and installation?",
    options: [
      "Design and installation must be by different persons",
      "There must be proper coordination between designer and installer",
      "Only qualified electricians may design",
      "All design must be computer-generated"
    ],
    correctAnswer: 1,
    explanation: "Regulation 134.1.1 requires proper coordination between design and installation. Information needed for safety must be available, and the installation must match the design. Where different persons are involved, clear communication is essential."
  },
  {
    id: 8,
    question: "Which of these is NOT a special installation or location in BS 7671 Part 7?",
    options: [
      "Bathroom with shower",
      "Swimming pool",
      "Standard domestic living room",
      "Construction site"
    ],
    correctAnswer: 2,
    explanation: "Part 7 covers special installations like bathrooms, swimming pools, saunas, construction sites, agricultural premises, caravan parks, and EV charging. A standard living room has no special requirements beyond the general regulations in Parts 1-6."
  },
  {
    id: 9,
    question: "What is the purpose of the Electrical Installation Certificate?",
    options: [
      "To prove the electrician is qualified",
      "To certify that the installation complies with BS 7671 at the time of completion",
      "To provide a warranty for the work",
      "To satisfy planning permission requirements"
    ],
    correctAnswer: 1,
    explanation: "The EIC certifies that the installation has been designed, constructed, inspected and tested in accordance with BS 7671. It's the formal record of compliance and should be provided for all new installations and rewires."
  },
  {
    id: 10,
    question: "A homeowner wants to add a socket in their kitchen 40mm from the sink. What must the designer consider?",
    options: [
      "This work doesn't require any special consideration",
      "This is notifiable work in a special location and Zone requirements apply",
      "It's prohibited - sockets cannot be in kitchens",
      "Only commercial kitchens have restrictions"
    ],
    correctAnswer: 1,
    explanation: "Work within 50mm of a sink in a kitchen is notifiable under Part P as it's considered a special location. Zone 2 is within 0.6m horizontally from the sink, where socket outlets should not normally be installed without RCD protection and suitable IP rating."
  }
];

const faqs = [
  {
    question: "If I'm a member of a Competent Person Scheme, do I still need to follow BS 7671?",
    answer: "Yes, absolutely. Scheme membership allows you to self-certify work, but the work itself must still comply with BS 7671. The scheme doesn't change the technical requirements - it's simply a route for demonstrating compliance with Building Regulations without involving Building Control. Scheme members are regularly assessed to ensure they maintain competence."
  },
  {
    question: "What happens if work doesn't comply with Building Regulations Part P?",
    answer: "Non-compliant work is a criminal offence that can result in prosecution and fines. Beyond legal consequences, non-compliant work may invalidate building insurance, create problems when selling the property, and most importantly, may be unsafe. If discovered, the local authority can require the work to be brought into compliance or removed at the owner's expense."
  },
  {
    question: "Do I need to issue certificates for minor electrical work?",
    answer: "For non-notifiable minor works (like adding a socket to an existing circuit), a Minor Electrical Installation Works Certificate should be issued. While this work doesn't need Building Control notification, the certificate provides evidence of competent work and compliance with BS 7671. It's good practice and protects both the installer and client."
  },
  {
    question: "How often is BS 7671 updated?",
    answer: "Major new editions typically appear every 5-10 years, with amendments issued between editions. The 18th Edition was published in 2018, with Amendment 1 in 2020 and Amendment 2 in 2022. Electricians should stay current with amendments, which often introduce significant changes - Amendment 2 included major changes to arc fault detection requirements and EV charging."
  },
  {
    question: "Does BS 7671 apply to existing installations?",
    answer: "BS 7671 directly applies to new installations and alterations. Existing installations that complied with regulations when built don't automatically become non-compliant when standards change. However, any new work must meet current standards, and there's a general duty to maintain safety. Periodic inspection may identify concerns about existing installations."
  }
];

const Level3Module6Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Compliance with BS 7671 and Building Regulations
          </h1>
          <p className="text-white/80">
            Understanding the regulatory framework that governs electrical design in the UK
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> The technical standard for electrical safety</li>
              <li><strong>Part P:</strong> Building Regulations covering domestic electrical work</li>
              <li><strong>Notification:</strong> Some work must be notified to Building Control</li>
              <li><strong>Certification:</strong> All work needs appropriate certificates</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing EIC/MEIWC indicates potential compliance issues</li>
              <li><strong>Use:</strong> Check current edition of BS 7671 for all design work</li>
              <li><strong>Apply:</strong> Issue correct certificates for every job</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The structure and legal status of BS 7671",
              "Building Regulations Part P requirements",
              "What work requires notification to Building Control",
              "Competent Person Scheme certification routes",
              "How BS 7671 relates to other standards",
              "Documentation requirements for compliance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671, officially titled "Requirements for Electrical Installations" and commonly called "the Wiring Regulations", is the UK's national standard for the design, selection, erection, inspection and testing of electrical installations. Published by the IET on behalf of BSI, it covers installations operating at up to 1000V AC or 1500V DC.
            </p>
            <p>
              While BS 7671 is not itself law, it has significant legal standing because it's referenced by statutory regulations. The Electricity at Work Regulations 1989 require electrical systems to be safe - compliance with BS 7671 is the recognised way to demonstrate this. Building Regulations Part P calls up BS 7671 as the standard for domestic electrical work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 is structured in seven parts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part 1:</strong> Scope, object and fundamental principles</li>
                <li><strong>Part 2:</strong> Definitions</li>
                <li><strong>Part 3:</strong> Assessment of general characteristics</li>
                <li><strong>Part 4:</strong> Protection for safety</li>
                <li><strong>Part 5:</strong> Selection and erection of equipment</li>
                <li><strong>Part 6:</strong> Inspection and testing</li>
                <li><strong>Part 7:</strong> Special installations and locations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> BS 7671 is regularly updated. Always design to the current edition - using outdated requirements is not acceptable even if you're familiar with them from earlier editions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Building Regulations Part P
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part P (Electrical Safety - Dwellings) applies to electrical installation work in houses, flats, maisonettes, and the shared areas of blocks of flats. It came into effect in 2005 to address safety concerns about DIY and incompetent electrical work in homes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notifiable Work (Requires Notification)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation of a new circuit</li>
                  <li>Consumer unit replacement</li>
                  <li>Work in special locations (bathrooms, swimming pools)</li>
                  <li>Work in kitchens within 50mm of a sink</li>
                  <li>Additions/alterations to special location circuits</li>
                  <li>New outdoor socket outlets and lighting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Notifiable Work</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Replacing accessories (sockets, switches)</li>
                  <li>Adding to an existing circuit (not special locations)</li>
                  <li>Replacing a damaged cable section</li>
                  <li>Re-fixing enclosures and covers</li>
                  <li>Work outside the dwelling (sheds, garages)</li>
                  <li>Installing extra-low voltage systems (under 50V)</li>
                </ul>
              </div>
            </div>

            <p>
              Notifiable work can be handled in two ways: through Building Control (pay a fee, they inspect the work) or through a Competent Person Scheme (registered electricians self-certify their work). The work itself must meet the same standard either way - only the notification route differs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Competent Person Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competent Person Schemes (CPS) were introduced alongside Part P to provide a practical route for qualified electricians to self-certify their work. Members undergo assessment of their competence and are regularly re-assessed. In return, they can certify notifiable work directly, issuing certificates to clients and notifying the local authority automatically.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Main Competent Person Schemes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NICEIC:</strong> National Inspection Council for Electrical Installation Contracting</li>
                <li><strong>NAPIT:</strong> National Association of Professional Inspectors and Testers</li>
                <li><strong>ELECSA:</strong> Electrical Contractors' Association</li>
                <li><strong>BRE:</strong> Building Research Establishment Global</li>
                <li><strong>STROMA:</strong> Certification scheme provider</li>
              </ul>
            </div>

            <p>
              To join a scheme, you typically need relevant qualifications (such as Level 3 in Electrical Installation), appropriate experience, and must pass an assessment of your working practices and technical knowledge. Membership involves ongoing fees and periodic re-assessment, but the ability to self-certify makes business operation much more practical.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When you install a new ring final circuit in a house, if you're a CPS member you complete an Electrical Installation Certificate, upload the notification to your scheme portal, and provide the certificate to the customer. The scheme notifies the local authority and the customer's records are updated - all without Building Control site visits or fees.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Related Standards and Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 doesn't exist in isolation. It references many other standards and works alongside various regulations. A designer must understand how these interact.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Product Standards</p>
                <p className="text-white/90 text-xs">BS EN 61439, BS EN 60898, BS EN 61008</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Legal Regulations</p>
                <p className="text-white/90 text-xs">EAWR 1989, Building Regs, CDM 2015</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Guidance</p>
                <p className="text-white/90 text-xs">IET Guidance Notes, On-Site Guide</p>
              </div>
            </div>

            <p>
              The Electricity at Work Regulations 1989 create legal duties for all workplaces regarding electrical safety. These are goal-based - they require systems to be safe without specifying how. BS 7671 provides the technical detail for meeting these goals. Products must meet their own standards (CE/UKCA marking) and be installed according to manufacturer instructions.
            </p>

            <p>
              For design purposes, you'll frequently reference BS 7671 Appendix 4 (current-carrying capacities), Appendix 12 (IP codes), and various product standards for equipment selection. The IET Guidance Notes expand on BS 7671 with practical application advice.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Compliance isn't just about following BS 7671 - you must also ensure products are suitable, manufacturer instructions are followed, and all applicable regulations are met for the specific installation type.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ensuring Compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always work to the current edition of BS 7671 - currently 18th Edition Amendment 2</li>
                <li>Identify whether work is notifiable before starting - this affects certification</li>
                <li>Document design decisions with reference to relevant regulations</li>
                <li>Use the correct certificate type for the work completed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>New installations and rewires: Electrical Installation Certificate (EIC)</li>
                <li>Alterations and additions: Minor Electrical Installation Works Certificate (MEIWC) or EIC</li>
                <li>Periodic inspection: Electrical Installation Condition Report (EICR)</li>
                <li>Always issue the correct certificate to the client</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using outdated regulations</strong> - Changes between editions can be significant</li>
                <li><strong>Ignoring notification requirements</strong> - This creates serious problems for property sales and insurance</li>
                <li><strong>Incomplete certificates</strong> - All fields must be properly completed including test results</li>
                <li><strong>Not understanding special locations</strong> - Work in bathrooms and other Part 7 locations has additional requirements</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Structure</p>
                <ul className="space-y-0.5">
                  <li>Part 1-3: Principles and assessment</li>
                  <li>Part 4: Protection for safety</li>
                  <li>Part 5: Selection and erection</li>
                  <li>Part 6: Inspection and testing</li>
                  <li>Part 7: Special installations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents</p>
                <ul className="space-y-0.5">
                  <li>EIC - New installations/rewires</li>
                  <li>MEIWC - Minor works/additions</li>
                  <li>EICR - Periodic inspection</li>
                  <li>Building Control notification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Purpose of Design
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-3">
              Next: Client Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section1_2;
