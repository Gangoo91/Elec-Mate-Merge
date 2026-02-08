import { ArrowLeft, PackageOpen, CheckCircle, AlertTriangle, Wrench, Tag, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-storage-cleaning",
    question: "Why should components be cleaned before they are put into storage?",
    options: [
      "To make them look nice for the next job",
      "Cleaning removes contaminants and reveals hidden defects",
      "Because the manufacturer requires daily polishing",
      "To reduce the weight of the components"
    ],
    correctIndex: 1,
    explanation: "Cleaning components before storage removes contaminants such as concrete, plaster, and paint that can cause corrosion and conceal defects. The cleaning process itself often reveals cracks, bends, and damage that would otherwise go unnoticed."
  },
  {
    id: "pasma-storage-segregation",
    question: "Why should tower components be segregated by type during storage?",
    options: [
      "It looks more professional to visitors",
      "It makes assembly faster and prevents selection of wrong components",
      "Different component types need different temperatures",
      "It is a fire regulation requirement"
    ],
    correctIndex: 1,
    explanation: "Segregating components by type — frames, braces, platforms, castors, stabilisers — makes the next assembly significantly faster and prevents the wrong component being selected. Mixed storage leads to time wasted searching and increases the risk of incorrect components being used."
  },
  {
    id: "pasma-storage-quarantine",
    question: "What must happen to a component found to be damaged during storage inspection?",
    options: [
      "It can be used if the damage is minor",
      "Wrap it in tape so others know it is damaged",
      "Separate it immediately, tag it red, record the defect, and prevent re-use",
      "Put it at the back of the rack so it is used last"
    ],
    correctIndex: 2,
    explanation: "Damaged components must be immediately separated from serviceable stock, tagged with a red defect tag, and the defect details recorded. They must be placed in a quarantine area and must not be re-used until they have been repaired by the manufacturer or disposed of."
  }
];

const faqs = [
  {
    question: "Can tower components be stored outdoors?",
    answer: "Components should be stored under cover wherever possible. If outdoor storage is unavoidable, they should be stored on racking off the ground, covered with breathable sheeting to prevent rainwater pooling, and inspected more frequently for corrosion. Prolonged outdoor storage without protection will significantly reduce the lifespan of steel components and can void the manufacturer's warranty."
  },
  {
    question: "How often should stored components be inspected?",
    answer: "The manufacturer's instructions will specify the inspection interval for stored components. As a general guide, components in indoor dry storage should be inspected at least every 3 months. Components stored outdoors or in damp conditions should be inspected monthly. Castor mechanisms and lock systems should be tested regularly even when not in use, as they can seize."
  },
  {
    question: "Can I repair a damaged tower component myself?",
    answer: "No. Tower components must only be repaired by the manufacturer or a manufacturer-approved repair centre. Welding, straightening, or otherwise modifying a tower component on site will compromise its structural integrity and will void the manufacturer's warranty and certification. Any repaired component must be re-certified before it can return to service."
  },
  {
    question: "Do GRP (fibreglass) components need different storage conditions?",
    answer: "Yes. GRP components should be stored away from direct sunlight, which degrades the resin over time through UV exposure. They should not be stored in excessively hot conditions as this can cause warping. GRP is also more susceptible to surface damage from impact, so components should be stored where they will not be knocked or struck by other equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the PRIMARY reason for proper component storage?",
    options: [
      "To keep the storage area tidy",
      "To prevent component damage that could cause tower failure",
      "To comply with fire regulations",
      "To reduce insurance premiums"
    ],
    correctAnswer: 1,
    explanation: "The primary reason for proper storage is to prevent component damage. Damaged components — whether corroded, bent, or contaminated — can fail in use, leading to tower collapse and serious injury or death."
  },
  {
    id: 2,
    question: "Which contaminant is most commonly found on tower components that must be removed before storage?",
    options: [
      "Oil from machinery",
      "Concrete, plaster, and paint splashes",
      "Food waste from operatives",
      "Rust inhibitor spray"
    ],
    correctAnswer: 1,
    explanation: "Concrete, plaster, and paint are the most common contaminants found on tower components after use on construction sites. These must be removed because they trap moisture against the metal surface causing corrosion, and they can interfere with lock mechanisms and connection points."
  },
  {
    id: 3,
    question: "Where should tower components ideally be stored?",
    options: [
      "Directly on the ground in the open air",
      "Under cover, off the ground, on racking in a ventilated area",
      "In a sealed, airtight container",
      "In direct sunlight to keep them dry"
    ],
    correctAnswer: 1,
    explanation: "Components should be stored under cover to protect from rain, off the ground to prevent moisture damage and corrosion, on racking for organisation and accessibility, and in a ventilated area to prevent condensation buildup."
  },
  {
    id: 4,
    question: "What does a RED tag on a tower component indicate?",
    options: [
      "The component is brand new",
      "The component belongs to a specific project",
      "The component is defective and must not be used",
      "The component has been recently cleaned"
    ],
    correctAnswer: 2,
    explanation: "A red tag indicates that the component is defective, has been quarantined, and must not be used under any circumstances. It must remain in the quarantine area until it is repaired by the manufacturer or disposed of."
  },
  {
    id: 5,
    question: "Why must castor wheels be cleaned and their brakes tested before storage?",
    options: [
      "Because dirty castors look unprofessional",
      "Debris in the wheels and brake mechanisms can cause them to seize or fail on next use",
      "To check if the castors need replacing with a larger size",
      "Because the castors are the most expensive component"
    ],
    correctAnswer: 1,
    explanation: "Debris such as concrete, grit, and plaster in the castor wheels and brake mechanisms can cause them to seize during storage. If the brake fails to engage on next use, the tower can roll when occupied, leading to overturning."
  },
  {
    id: 6,
    question: "Who is authorised to repair a damaged tower component?",
    options: [
      "Any competent welder on site",
      "The PASMA-trained operative who found the defect",
      "Only the manufacturer or a manufacturer-approved repair centre",
      "The site maintenance team"
    ],
    correctAnswer: 2,
    explanation: "Tower components can only be repaired by the manufacturer or a manufacturer-approved repair centre. On-site repairs such as welding or straightening compromise the structural integrity and void the warranty and certification."
  },
  {
    id: 7,
    question: "What is the purpose of segregating components by type in storage?",
    options: [
      "To use less storage space",
      "To make the next assembly faster and prevent wrong component selection",
      "To separate heavy items from light items",
      "To comply with COSHH regulations"
    ],
    correctAnswer: 1,
    explanation: "Segregating components by type — frames, braces, platforms, castors, stabilisers — speeds up the assembly process because operatives can quickly find the right component. It also prevents the wrong component being selected, which could compromise the tower's structural integrity."
  },
  {
    id: 8,
    question: "How can poor storage affect the manufacturer's warranty on tower components?",
    options: [
      "It has no effect on the warranty",
      "The warranty only covers electrical faults",
      "Failure to follow manufacturer storage instructions can void the warranty",
      "The warranty expires after one year regardless of storage"
    ],
    correctAnswer: 2,
    explanation: "Manufacturers' warranties typically include conditions about storage and maintenance. Storing components outdoors without protection, failing to maintain them, or making unauthorised repairs can all void the warranty, leaving the owner liable for replacement costs."
  }
];

export default function PasmaModule4Section3() {
  useSEO({
    title: "Storage & Maintenance | PASMA Module 4.3",
    description: "Correct storage and maintenance procedures for mobile scaffold tower components including cleaning, indoor storage, component segregation, quarantine, and manufacturer requirements.",
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
            <Link to="../pasma-module-4">
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
            <PackageOpen className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Storage &amp; Maintenance
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Correct storage, cleaning, segregation, and maintenance practices that protect tower components and prevent failures on the next use
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Clean first:</strong> remove concrete, plaster, paint before storing</li>
              <li><strong>Store:</strong> under cover, off ground, on racking, ventilated</li>
              <li><strong>Quarantine:</strong> tag and separate damaged components immediately</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before storing:</strong> Clean, inspect, sort by type</li>
              <li><strong>During storage:</strong> Regular checks, lubricate castors, test locks</li>
              <li><strong>Defects found:</strong> Red tag, quarantine, record, report</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why proper storage prevents tower failures",
              "Describe the cleaning process before storage",
              "State the requirements for indoor dry storage",
              "Explain the importance of component segregation",
              "Describe the quarantine process for damaged components",
              "Understand manufacturer maintenance requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Proper Storage Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Proper Storage Matters
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile scaffold tower components are precision-engineered structural elements.
                They are designed to carry specific loads and maintain specific tolerances. When
                components are damaged through poor storage &mdash; whether by corrosion, bending,
                contamination, or UV degradation &mdash; they can no longer perform as designed.
                A corroded frame may look intact but fail under load. A bent brace may fit but
                provide no structural support.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Damaged components
                  cause tower failures. Tower failures cause falls from height. Falls from height
                  cause death and life-changing injuries. The chain from poor storage to a fatal
                  incident is direct and well documented in HSE investigation reports.
                </p>
              </div>

              <p>
                The cost of proper storage is a fraction of the cost of replacing damaged
                components, and it is insignificant compared to the human and financial cost of a
                tower collapse caused by defective equipment. A basic racking system in a dry,
                covered area is all that is needed to protect components worth thousands of pounds.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Storage-Related Damage</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Corrosion:</strong> Steel components left in damp conditions rust. Rust weakens the metal and can cause lock mechanisms to seize.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Bending:</strong> Frames and braces stored directly on the floor or stacked improperly can become bent, affecting fit and structural integrity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Contamination:</strong> Concrete and plaster left on components traps moisture, accelerating corrosion and jamming connection points.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>UV degradation:</strong> GRP (fibreglass) components exposed to sunlight deteriorate, losing strength and becoming brittle.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Cleaning Before Storage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cleaning Before Storage
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every component should be cleaned before it goes into storage. This is not
                about aesthetics &mdash; cleaning serves two critical safety purposes. First,
                it removes contaminants that cause corrosion and mechanical failure. Second,
                the act of cleaning each component forces a close visual inspection that
                reveals defects.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">What to Clean and How</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Concrete and plaster:</strong> Chip off dried deposits carefully, avoiding damage to the galvanised surface. Use a stiff brush or scraper. Do not use power tools that could damage the zinc coating.</p>
                  <p><strong className="text-white">Paint splashes:</strong> Remove with an appropriate solvent where necessary, particularly from connection points, lock mechanisms, and adjustment threads.</p>
                  <p><strong className="text-white">Castor wheels and brakes:</strong> Clear all debris from the wheel treads, axles, and brake mechanisms. Grit in the brake mechanism is a common cause of brake failure.</p>
                  <p><strong className="text-white">Labels and tape:</strong> Remove all site-specific labels, hazard tape, and adhesive residue. Old labels can conceal defects and cause confusion on the next job.</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-2">Cleaning Reveals Defects</p>
                <p className="text-sm text-white/80">
                  Many defects are only visible once the component is clean. Cracks concealed
                  under paint splashes, corrosion hidden beneath concrete deposits, bent tubes
                  masked by plaster buildup &mdash; all are revealed during a thorough clean.
                  This is why cleaning should be treated as a combined cleaning and inspection
                  activity, not just a housekeeping task.
                </p>
              </div>

              <p>
                After cleaning, allow components to dry completely before placing them into
                storage. Storing damp components in an enclosed space creates the very conditions
                that cause corrosion. If components have been washed, stand them upright to drain
                and air-dry before racking.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Indoor Dry Storage Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Indoor Dry Storage Requirements
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ideal storage environment for tower components is a dry, covered, ventilated
                indoor space. This protects against rain, ground moisture, UV radiation, and
                extremes of temperature. While not every site can provide perfect conditions,
                the closer you get to this standard, the longer your components will last.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Storage Requirements</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Under cover:</strong> A roof or canopy to protect from rain and direct sunlight. Even a simple lean-to structure is significantly better than open-air storage.</p>
                  <p><strong className="text-white">Off the ground:</strong> Components stored directly on the floor sit in any water that collects and are vulnerable to forklift damage. Use racking or pallet supports.</p>
                  <p><strong className="text-white">On racking:</strong> Purpose-built racking organises components, prevents bending from improper stacking, and makes stock management easier.</p>
                  <p><strong className="text-white">Ventilated:</strong> Air circulation prevents condensation buildup. A sealed, unventilated container will generate condensation as temperatures change, creating a damp environment that accelerates corrosion.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Temperature Considerations for GRP</p>
                </div>
                <p className="text-sm text-white/80">
                  GRP (glass-reinforced plastic) components are sensitive to temperature extremes
                  and UV exposure. Store them away from direct sunlight and heat sources. High
                  temperatures can cause warping and deformation, while prolonged UV exposure
                  degrades the resin matrix, reducing structural strength. If your tower includes
                  GRP components (common in towers designed for electrical work), pay particular
                  attention to the manufacturer&rsquo;s storage temperature range.
                </p>
              </div>

              <p>
                Where outdoor storage is unavoidable, cover components with breathable sheeting
                &mdash; not plastic wrapping, which traps moisture. Elevate on blocks or pallets,
                and inspect more frequently (monthly rather than quarterly) to catch corrosion
                early.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Component Segregation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Component Segregation
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Components should be sorted and stored by type. Mixing frames, braces, platforms,
                castors, and stabilisers together in a single pile wastes time during the next
                assembly and increases the risk of selecting the wrong component. A well-organised
                storage area directly improves site efficiency and safety.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Storage Categories</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Frames:</strong> Store vertically on racking where possible. If stored horizontally, do not stack more than the manufacturer recommends to avoid bending the lower items.</p>
                  <p><strong className="text-white">Braces (diagonal and horizontal):</strong> Store flat on racking. Keep diagonal braces separate from horizontal braces to prevent mix-ups during assembly.</p>
                  <p><strong className="text-white">Platforms and trapdoor platforms:</strong> Store flat, supported evenly. Do not stand platforms on their edge as this can cause warping over time.</p>
                  <p><strong className="text-white">Castors:</strong> Store clean, with brakes engaged to prevent the mechanism from relaxing. Keep away from sources of grit and dust.</p>
                  <p><strong className="text-white">Stabilisers and outriggers:</strong> Store together. Check adjustment threads are clean and free-moving before putting away.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Labelling Storage Locations</p>
                <p className="text-sm text-white/80 mb-2">
                  Label each storage bay or rack with the component type and, if you have
                  multiple tower systems, the manufacturer and model. This prevents components
                  from different manufacturer systems being mixed &mdash; a serious safety
                  hazard, as components from different manufacturers are not interchangeable
                  even if they appear similar.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Example: &ldquo;BoSS Clima &mdash; Diagonal Braces &mdash; 1.45m&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Example: &ldquo;Youngman &mdash; Trapdoor Platforms &mdash; 1.8m&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Example: &ldquo;BoSS Clima &mdash; 200mm Castors with Brakes&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Never mix components from different manufacturers. Even if frames and braces
                  from different systems appear to fit together, they have not been tested or
                  certified as a combined system. Using mixed components voids all manufacturer
                  warranties and certifications, and creates an untested, potentially unsafe
                  structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Damaged Component Quarantine */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Damaged Component Quarantine
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Any component found to be damaged &mdash; whether during dismantling, cleaning,
                storage inspection, or pre-use checks &mdash; must be immediately removed from
                service and quarantined. The quarantine process exists to prevent a defective
                component from being inadvertently picked up and used on the next job.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Quarantine Process</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Separate immediately:</strong> Remove the damaged item from the serviceable stock. Do not leave it where it could be picked up by someone unaware of the defect.</p>
                  <p><strong className="text-white">2. Apply a red tag:</strong> Attach a red defect tag to the component with the date, description of the defect, and the name of the person who found it.</p>
                  <p><strong className="text-white">3. Record the defect:</strong> Enter the defect in the maintenance and inspection register. Include the component type, serial number or identifier if available, nature of the defect, and severity.</p>
                  <p><strong className="text-white">4. Place in quarantine area:</strong> Move the component to a designated quarantine area that is clearly signed and separate from serviceable stock.</p>
                  <p><strong className="text-white">5. Prevent re-use:</strong> The component must not be used again until it has been repaired by the manufacturer or a manufacturer-approved repairer, re-certified, and returned to service with documentation.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Defects Requiring Quarantine</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bent or bowed frame tubes (even slight bends affect structural capacity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cracked or broken welds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Missing or damaged locking mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Excessive corrosion or pitting on structural members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cracked or delaminated platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Castor wheels that do not turn freely or brakes that do not hold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Damaged spigot pins or gravity locks</span>
                  </li>
                </ul>
              </div>

              <p>
                The quarantine area should be clearly signed &ldquo;Defective Equipment &mdash;
                Do Not Use&rdquo; and should be locked or controlled to prevent unauthorised
                access. Defective components left in an unlocked area will eventually find their
                way back into service.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Maintenance Schedule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Maintenance Schedule
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Components require regular maintenance even when in storage. Mechanisms seize,
                lubrication dries out, and environmental conditions can cause slow deterioration
                that is only caught by routine checks. A maintenance schedule ensures nothing
                is overlooked.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Routine Maintenance Tasks</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Castor lubrication:</strong> Apply a light machine oil to castor axles and wheel bearings at intervals specified by the manufacturer. This prevents seizing and ensures smooth operation on next use.</p>
                  <p><strong className="text-white">Lock mechanism testing:</strong> Operate every lock mechanism (gravity locks, spigot pins, AGR release catches) through its full range at least quarterly. Mechanisms that are not used can seize.</p>
                  <p><strong className="text-white">Frame straightness verification:</strong> Visually check frames for straightness. Place on a flat surface and check for rocking or bowing. Even slight deformation can indicate impact damage.</p>
                  <p><strong className="text-white">Brake testing:</strong> Engage and disengage every castor brake. The brake must hold firmly when engaged and release fully when disengaged. Replace any castor with a suspect brake.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Manufacturer&rsquo;s Maintenance Requirements</p>
                </div>
                <p className="text-sm text-white/80">
                  The manufacturer&rsquo;s instruction manual will specify the maintenance
                  schedule and procedures for their specific tower system. Some manufacturers
                  require annual professional inspections in addition to routine user
                  maintenance. Follow the manufacturer&rsquo;s requirements as a minimum &mdash;
                  if your experience or conditions suggest more frequent maintenance, increase
                  the frequency.
                </p>
              </div>

              <p>
                Record all maintenance activities in a maintenance log. This creates an audit
                trail demonstrating due diligence and helps identify components that require
                more frequent attention or are approaching end of life.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Manufacturer Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Manufacturer Requirements
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every tower manufacturer provides specific storage, maintenance, and inspection
                instructions for their equipment. These instructions are not advisory &mdash;
                they form part of the design and certification basis for the tower. Failing to
                follow them can compromise the equipment&rsquo;s safety and void all warranties
                and product liability protections.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The manufacturer&rsquo;s
                  instruction manual is the definitive authority on how to store, maintain, and
                  inspect their specific tower system. If there is ever a conflict between
                  general guidance and the manufacturer&rsquo;s instructions, the
                  manufacturer&rsquo;s instructions take precedence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What the Manufacturer Specifies</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Storage environment:</strong> Temperature range, humidity limits, UV protection requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Stacking limits:</strong> Maximum number of frames or platforms that can be stacked without causing damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Maintenance intervals:</strong> How often to lubricate, test, and inspect specific components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Component lifespan:</strong> Expected service life under normal conditions and when to retire components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Replacement criteria:</strong> What level of wear or damage requires component replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Approved repair centres:</strong> Where to send damaged components for authorised repair</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Warranty Implications</p>
                <p className="text-sm text-white/80 mb-2">
                  Manufacturer warranties typically cover defects in materials and workmanship,
                  but they contain conditions. The warranty can be voided by:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Improper storage (outdoor, damp, extreme temperatures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Unauthorised modifications or repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Mixing components from different manufacturers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Failure to carry out specified maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Use outside the rated capacity or configuration</span>
                  </li>
                </ul>
              </div>

              <p>
                If you are unsure about any aspect of storage, maintenance, or repair, contact
                the manufacturer directly. Most tower manufacturers have technical support teams
                who can advise on specific situations. It is always better to ask than to guess
                when the safety of a structural element is in question.
              </p>
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
          title="Section 3 Knowledge Check"
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
            <Link to="../pasma-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Moving &amp; Repositioning
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4-section-4">
              Next: Post-Use Inspection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
