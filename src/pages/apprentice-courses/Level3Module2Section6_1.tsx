/**
 * Level 3 Module 2 Section 6.1
 * Waste Management and Recycling of Materials
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Waste Management and Recycling of Materials - Level 3 Module 2 Section 6.1";
const DESCRIPTION = "Understanding legal requirements and best practices for managing electrical waste, recycling materials, and implementing sustainable disposal practices on site.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under UK law, who holds primary responsibility for ensuring waste is correctly disposed of?",
    options: [
      "Only the waste carrier",
      "Only the local authority",
      "The person or business that produces the waste (Duty of Care)",
      "No one has legal responsibility"
    ],
    correctIndex: 2,
    explanation: "The Duty of Care under the Environmental Protection Act 1990 places responsibility on the waste producer. You must ensure waste goes to an authorised person, is properly described, transferred with documentation, and disposed of correctly."
  },
  {
    id: "check-2",
    question: "What document should you receive and keep when transferring waste to a carrier?",
    options: [
      "A delivery note only",
      "A Waste Transfer Note with details of waste type and carrier",
      "A verbal confirmation is sufficient",
      "No documentation is required for small amounts"
    ],
    correctIndex: 1,
    explanation: "A Waste Transfer Note must be completed for each waste transfer, describing the waste, quantities, and confirming the carrier is authorised. These notes must be kept for at least 2 years as proof of compliance with Duty of Care."
  },
  {
    id: "check-3",
    question: "Why should copper cable offcuts be separated from general waste?",
    options: [
      "It's not necessary to separate copper",
      "Copper is valuable and recyclable, saving resources and potentially generating income",
      "Copper is hazardous waste",
      "Only for cables over 10mm cross-section"
    ],
    correctIndex: 1,
    explanation: "Copper is a valuable commodity and highly recyclable. Separating cable offcuts keeps material value, reduces virgin mining demand, and can offset waste disposal costs. Many merchants buy clean copper scrap."
  },
  {
    id: "check-4",
    question: "What does the WEEE directive cover regarding electrical waste?",
    options: [
      "Only large industrial equipment",
      "Waste Electrical and Electronic Equipment - setting collection, recycling and recovery targets",
      "Only household appliances",
      "The WEEE directive doesn't apply in the UK"
    ],
    correctIndex: 1,
    explanation: "WEEE (Waste Electrical and Electronic Equipment) regulations set requirements for collecting, treating, recycling, and recovering electrical equipment. Producers have obligations, and installers must ensure removed equipment goes to appropriate recycling facilities."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the waste hierarchy in order of preference?",
    options: [
      "Recycle, Dispose, Reduce, Reuse, Recover",
      "Prevention, Reuse, Recycle, Recovery, Disposal",
      "Disposal, Recovery, Recycle, Reuse, Prevention",
      "There is no preferred order"
    ],
    correctAnswer: 1,
    explanation: "The waste hierarchy prioritises prevention first (avoiding waste creation), then reuse, recycling, energy recovery, and finally disposal as the last resort. This guides sustainable waste management decisions."
  },
  {
    id: 2,
    question: "What waste classification applies to old mineral-insulated (MICC) cable that might contain lead sheathing?",
    options: [
      "General waste - no special handling needed",
      "Potentially hazardous waste requiring assessment and appropriate disposal",
      "Can be disposed with normal cable offcuts",
      "Only hazardous if over 100 years old"
    ],
    correctAnswer: 1,
    explanation: "Older MICC cable may have lead sheathing, making it potentially hazardous waste. Lead is a controlled substance requiring proper assessment and disposal through licensed facilities. Never mix potentially hazardous materials with general waste."
  },
  {
    id: 3,
    question: "How long must a business retain Waste Transfer Notes?",
    options: [
      "6 months",
      "1 year",
      "At least 2 years",
      "No retention requirement"
    ],
    correctAnswer: 2,
    explanation: "Waste Transfer Notes must be kept for at least 2 years. For hazardous waste, records must be kept for 3 years. These demonstrate Duty of Care compliance if questioned by regulatory authorities."
  },
  {
    id: 4,
    question: "What is the benefit of segregating waste streams on site?",
    options: [
      "There's no benefit - it's extra work",
      "It improves recycling rates, reduces disposal costs, and recovers material value",
      "It only matters for very large sites",
      "Segregation is optional under UK law"
    ],
    correctAnswer: 1,
    explanation: "Segregating waste (metals, plastics, cardboard, general) maximises recycling potential and material recovery. Mixed waste typically costs more to dispose and has lower recycling rates. Good segregation is both environmentally and financially sensible."
  },
  {
    id: 5,
    question: "What should happen to old consumer units removed during upgrades?",
    options: [
      "Throw them in the general skip",
      "Take them to WEEE recycling as they're electronic equipment",
      "They can be sold for reuse without testing",
      "Leave them on site for the customer to deal with"
    ],
    correctAnswer: 1,
    explanation: "Consumer units are electrical equipment covered by WEEE regulations. They should go to appropriate WEEE recycling where metals and plastics can be recovered. Many contain electronic components that require proper processing."
  },
  {
    id: 6,
    question: "Why should packaging materials be minimised and recycled?",
    options: [
      "Packaging has no environmental impact",
      "Packaging contributes to waste volumes and uses resources; recycling reduces demand for virgin materials",
      "It only matters for plastic packaging",
      "Manufacturers are solely responsible for packaging"
    ],
    correctAnswer: 1,
    explanation: "Packaging waste is significant on construction sites. Using products with minimal packaging, returning reusable packaging, and recycling cardboard and plastics reduces environmental impact and often disposal costs."
  },
  {
    id: 7,
    question: "What regulations govern the transport of hazardous waste?",
    options: [
      "No special regulations apply",
      "The carrier must be registered, and consignment notes are required",
      "Only applies to chemical waste",
      "Any licensed skip company can take hazardous waste"
    ],
    correctAnswer: 1,
    explanation: "Hazardous waste requires a registered hazardous waste carrier. Consignment notes (not standard Waste Transfer Notes) must be completed, including a unique consignment note code. Stricter controls ensure proper handling and disposal."
  },
  {
    id: 8,
    question: "What is the environmental benefit of recycling aluminium cable?",
    options: [
      "Aluminium cannot be recycled",
      "Recycling aluminium uses about 5% of the energy needed to produce virgin aluminium",
      "There's no environmental benefit",
      "Only copper cables should be recycled"
    ],
    correctAnswer: 1,
    explanation: "Aluminium recycling is highly efficient - using approximately 5% of the energy needed for primary production. Recycling also avoids the environmental impact of bauxite mining. Aluminium can be recycled indefinitely without quality loss."
  },
  {
    id: 9,
    question: "What should you check before using a waste carrier?",
    options: [
      "Nothing specific needs checking",
      "Their registration with the Environment Agency and appropriate licenses for waste types",
      "Only their vehicle insurance",
      "Just that they have a van"
    ],
    correctAnswer: 1,
    explanation: "Verify the carrier is registered with the Environment Agency (or relevant authority in Scotland/Wales) and holds appropriate licenses for the waste types you're transferring. Ask for their registration number and check it online if uncertain."
  },
  {
    id: 10,
    question: "What does 'circular economy' mean in the context of electrical materials?",
    options: [
      "A type of electrical circuit",
      "Designing products and systems where materials are reused, recycled, and kept in use rather than disposed",
      "Only relates to renewable energy",
      "A government department"
    ],
    correctAnswer: 1,
    explanation: "The circular economy aims to eliminate waste by keeping materials in use through reuse, repair, remanufacture, and recycling. For electricians, this means choosing repairable products, recycling materials, and avoiding single-use items where possible."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I put cable offcuts in a general builder's skip?",
    answer: "Technically yes, but it's wasteful. Cable offcuts have significant scrap value and are highly recyclable. Most electrical wholesalers or scrap merchants will buy clean copper cable. Even if quantities are small, collecting cable over time and recycling it is environmentally better than landfill and can generate income."
  },
  {
    question: "Who is responsible for disposing of equipment I remove during an upgrade?",
    answer: "As the contractor, you become the waste producer when you remove old equipment. You have Duty of Care responsibility to ensure it's properly disposed. Discuss with customers who takes responsibility - some prefer to keep old equipment, others expect you to dispose of it. Document the agreement."
  },
  {
    question: "What if I'm not sure if something is hazardous waste?",
    answer: "If uncertain, treat it as potentially hazardous and seek guidance. The Environment Agency provides hazardous waste classification guidance. For items like old transformers, capacitors, or unknown fluids, specialist assessment may be needed before disposal decisions can be made."
  },
  {
    question: "How do I find a licensed waste carrier?",
    answer: "The Environment Agency maintains a public register of licensed waste carriers searchable online. Check the carrier's registration before using them. For hazardous waste, ensure they have specific authorization for the waste types you need to dispose of."
  },
  {
    question: "Are there any charges for recycling WEEE equipment?",
    answer: "Household WEEE can be taken to local authority recycling centres free of charge. For trade WEEE, you may need to use commercial recycling services, which may charge or pay for items depending on type and quantity. Some distributors offer take-back schemes."
  },
  {
    question: "What should I do with old fluorescent tubes?",
    answer: "Fluorescent tubes contain mercury and are hazardous waste. They must not go in general waste. Return them to suppliers with take-back schemes, use council hazardous waste facilities, or arrange collection by a licensed hazardous waste carrier. LED replacements avoid this ongoing disposal issue."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Duty of Care:</strong> You're responsible for waste you produce</li>
              <li><strong>Hierarchy:</strong> Prevent, reuse, recycle, recover, then dispose</li>
              <li><strong>Documentation:</strong> Keep Waste Transfer Notes for 2+ years</li>
              <li><strong>WEEE:</strong> Electrical equipment must go to proper recycling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Segregated waste bins on well-run sites</li>
              <li><strong>Use:</strong> Separate copper from general waste for recycling</li>
              <li><strong>Apply:</strong> Check carrier licenses before transferring waste</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Duty of Care
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Environmental Protection Act 1990 creates a Duty of Care for anyone producing, handling, or disposing of waste. As an electrician, when you create waste on a job - whether cable offcuts, old equipment, or packaging - you become legally responsible for ensuring that waste is handled correctly all the way to its final disposal point.
            </p>

            <p>
              This responsibility cannot be avoided simply by handing waste to someone else. If you give waste to an unlicensed carrier who fly-tips it, you can be prosecuted even though you didn't dump it yourself. The law requires you to take reasonable steps to verify that anyone you transfer waste to is authorised to receive it and will handle it properly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Your Duty of Care Requires:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Storing waste securely to prevent escape or unauthorised access</li>
                <li>Describing waste accurately when transferring it</li>
                <li>Only transferring waste to authorised persons</li>
                <li>Completing and retaining Waste Transfer Notes</li>
                <li>Taking reasonable steps to prevent illegal waste handling</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Penalties for Duty of Care breaches can be substantial - unlimited fines and even imprisonment for serious offences. It's not worth the risk to cut corners on waste disposal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Waste Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The waste hierarchy provides a framework for making waste management decisions, ranking options from most to least environmentally preferable. Every waste decision should consider options higher in the hierarchy before accepting those lower down.
            </p>

            <div className="grid grid-cols-5 gap-2 my-6 text-center text-xs">
              <div className="p-2 rounded bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-1">1. Prevent</p>
                <p className="text-white/70">Avoid creating waste</p>
              </div>
              <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
                <p className="font-medium text-green-400/80 mb-1">2. Reuse</p>
                <p className="text-white/70">Use again as-is</p>
              </div>
              <div className="p-2 rounded bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium text-elec-yellow mb-1">3. Recycle</p>
                <p className="text-white/70">Reprocess material</p>
              </div>
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/30">
                <p className="font-medium text-orange-400 mb-1">4. Recover</p>
                <p className="text-white/70">Energy from waste</p>
              </div>
              <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-1">5. Dispose</p>
                <p className="text-white/70">Last resort</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You're ordering cable for a job. Prevention: order accurate quantities to minimise offcuts. Reuse: keep usable offcuts for future small jobs. Recycle: take copper and aluminium offcuts to scrap recycling. Recovery and disposal are last resorts for materials that can't be recycled.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Waste Segregation on Site
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective waste segregation maximises recycling potential and often reduces overall disposal costs. Mixed waste typically costs more to dispose of and has much lower recycling rates than separated waste streams. On larger sites, segregated skips or bins should be provided; on smaller jobs, you can still separate your own waste.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Electrical Waste Streams</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Copper cable and wire offcuts</li>
                  <li>Aluminium cable and conductors</li>
                  <li>Steel (trunking, brackets, back boxes)</li>
                  <li>Plastic (conduit, trunking, packaging)</li>
                  <li>Cardboard and paper packaging</li>
                  <li>WEEE (removed equipment)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Segregation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Higher recycling rates achieved</li>
                  <li>Material value can be recovered</li>
                  <li>Lower disposal costs overall</li>
                  <li>Easier identification of hazardous items</li>
                  <li>Better compliance documentation</li>
                </ul>
              </div>
            </div>

            <p>
              Even small quantities add up. Keeping a container in your van for copper offcuts, collecting them over several jobs, then taking them to a scrap merchant is both environmentally responsible and can provide useful supplementary income. Clean copper commands better prices than mixed cable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            WEEE Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Waste Electrical and Electronic Equipment (WEEE) regulations set requirements for the collection, treatment, and recycling of electrical equipment. As an installer who removes old equipment during upgrades, you have responsibilities under these regulations to ensure proper disposal.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common WEEE Items in Electrical Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Old consumer units and distribution boards</li>
                <li>Removed light fittings and luminaires</li>
                <li>Obsolete heating controls and thermostats</li>
                <li>Old smoke detectors and fire alarm equipment</li>
                <li>Removed switches, sockets, and accessories with electronics</li>
                <li>Inverters and control equipment from renewable systems</li>
              </ul>
            </div>

            <p>
              WEEE items should not go in general waste or builder's skips. Take them to designated WEEE recycling points - most local authority recycling centres accept household WEEE free of charge. For larger quantities or trade waste, use commercial WEEE recycling services. Some distributors offer take-back schemes.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> WEEE recycling recovers valuable materials including copper, aluminium, and rare earth elements from electronics. Proper WEEE disposal is both a legal requirement and an environmental responsibility.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Jobs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Order materials accurately to minimise waste</li>
                <li>Discuss who handles removed equipment with customer</li>
                <li>Identify any potentially hazardous materials in advance</li>
                <li>Arrange appropriate disposal routes before starting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Separate waste streams as you work - it's easier than sorting later</li>
                <li>Keep copper offcuts clean and separate from other materials</li>
                <li>Flatten cardboard packaging to reduce storage volume</li>
                <li>Store hazardous waste separately and securely</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing waste streams</strong> - Reduces recyclability and increases costs</li>
                <li><strong>Using unlicensed carriers</strong> - You remain liable if waste is fly-tipped</li>
                <li><strong>Not keeping documentation</strong> - Can't prove compliance without records</li>
                <li><strong>Throwing WEEE in general waste</strong> - Breach of regulations</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Record Retention</p>
                <ul className="space-y-0.5">
                  <li>Waste Transfer Notes: 2 years minimum</li>
                  <li>Hazardous waste: 3 years minimum</li>
                  <li>Keep copies of carrier registrations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Contacts</p>
                <ul className="space-y-0.5">
                  <li>Environment Agency: carrier register</li>
                  <li>Local authority: recycling centres</li>
                  <li>Trade associations: disposal guidance</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6-2">
              Next: Hazardous Disposal
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section6_1;
