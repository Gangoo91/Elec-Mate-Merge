import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Zap, AlertTriangle, CheckCircle2, FileCheck2, ShieldCheck, Wrench } from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Work in Damp Buildings', href: '/electrical-damp-proofing' },
];

const tocItems = [
  { id: 'moisture-damage', label: 'Moisture Damage to Electrical Installations' },
  { id: 'eicr-requirements', label: 'EICR Before & After DPC Works' },
  { id: 'ip-ratings', label: 'IP Ratings for Damp Locations' },
  { id: 'cable-replacement', label: 'Cable Replacement After Damp Works' },
  { id: 'coordinating', label: 'Coordinating with Damp Proofing Contractors' },
  { id: 'landlord-obligations', label: 'Landlord Obligations' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Rising damp, penetrating damp, and condensation can all cause serious damage to electrical installations — corroding terminals, degrading cable insulation, and reducing insulation resistance to dangerous levels.',
  'An EICR should be carried out before damp proofing works begin to establish the baseline condition of the installation, and again after works are complete to confirm the installation is safe following any disturbance.',
  'BS 7671 Chapter 52 specifies the selection and erection of wiring systems in relation to external influences including moisture. IP ratings of accessories and cable systems must be appropriate for the degree of moisture present.',
  'After DPC (damp-proof course) injection, replastering, or significant damp remediation work, any cables buried in the treated walls should be replaced. Old PVC cable that has been saturated may have permanently degraded insulation even after drying out.',
  'Electricians should not simply test and certify an installation in a damp building without noting and reporting the damp condition as an external influence that affects the installation. Damp is a C2 (potentially dangerous) finding on an EICR.',
  'Landlords have specific obligations regarding electrical safety in rented properties. A damp-damaged electrical installation is a hazard that must be remedied — a valid EICR cannot be issued on a seriously damp-affected installation without remedial action.',
];

const howToSteps = [
  {
    name: 'Carry out an EICR before damp works start',
    text: 'Before any damp proofing contractor starts work, an EICR should be carried out to document the condition of the electrical installation. This establishes which defects existed before the damp works and protects the electrician from liability for pre-existing conditions. Note visible moisture damage, corrosion on accessories, and any signs of dampness affecting wiring systems.',
  },
  {
    name: 'Identify cables at risk during damp works',
    text: 'Locate all cables buried in walls that will be treated with DPC injection chemicals or re-plastered. Cables in external walls in ground floor rooms are most at risk. Draw a simple cable route plan if possible. Advise the damp proofing contractor of cable locations to avoid drilling into them during injection.',
  },
  {
    name: 'Isolate and remove cables in affected areas before replastering',
    text: 'Where walls are to be re-plastered (which is standard after DPC injection), the preferred approach is to remove all cables from the wall, re-route through surface conduit after plastering, or run new cables in conduit that is installed before plastering and left empty for the cable draw through. Do not leave old PVC cables buried in newly treated walls — the chemicals and heat from drying plaster can damage cable insulation.',
  },
  {
    name: 'Allow the building to dry out before rewiring',
    text: 'Newly treated and re-plastered walls need time to dry before rewiring. Plaster typically takes 4 to 6 weeks to dry fully in good conditions. Rewiring in wet plaster risks moisture ingress into cable insulation. Plan the electrical works in coordination with the damp proofing and plastering programme.',
  },
  {
    name: 'Rewire affected areas with appropriate cable systems',
    text: 'After the walls have dried, rewire using standard PVC twin and earth or, in higher-risk moisture areas, LSZH cable. Use IP44 or IP55 accessories as appropriate for the location. Install cables in prescribed zones per BS 7671 Chapter 52, or in conduit for accessible locations. Replace any consumer unit or distribution board damaged by moisture.',
  },
  {
    name: 'Carry out EICR on completion',
    text: 'After all electrical remediation work is complete and the building has fully dried out, carry out a final EICR. This confirms the installation is satisfactory and provides the landlord or owner with documentary evidence of the installation condition. Issue the EICR using Elec-Mate and share with the client.',
  },
];

const faqs = [
  {
    question: 'How does damp affect electrical cables and wiring?',
    answer:
      'Moisture affects electrical wiring in several ways. Water contamination on cable insulation reduces insulation resistance (IR) — which can fall from hundreds of megaohms to below 1M\u03a9 (the BS 7671 Table 64 minimum). Moisture at terminal connections causes electrochemical corrosion of copper conductors, increasing contact resistance and generating heat. In severe cases, water ingress into consumer units or accessories causes tracking (conductive paths forming across the surface of insulation), arcing, and ultimately fire. Even after a building dries out, cable insulation that has been water-saturated for a prolonged period may have permanently reduced IR due to chemical degradation of the PVC plasticiser.',
  },
  {
    question: 'What EICR observation code applies to damp-damaged wiring?',
    answer:
      'Damp-damaged wiring is typically coded as C2 (potentially dangerous) on an EICR if there is visible moisture damage to accessories, corroded terminals, or IR readings below 1M\u03a9. Where the damage is severe enough to present an immediate danger (e.g. exposed conductors in contact with water, or live parts at risk of imminent contact), the observation would be coded C1 (danger present) and immediate action would be required. The presence of rising damp in the building (even if the wiring is not yet visibly affected) is noted as a FI (further investigation required) because it will eventually affect the installation if not treated.',
  },
  {
    question: 'Do I need an EICR before DPC injection?',
    answer:
      'There is no legal requirement for an EICR before DPC injection in a privately owned property. However, it is strongly recommended for the following reasons: it documents the pre-existing condition of the installation, protecting you from liability for any damage that may be attributed to the damp works; it identifies any cables that need to be relocated before work begins; and it provides a baseline against which the post-works EICR can be compared. For rented properties, a valid EICR is required every 5 years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. If the current EICR is due or overdue, carry it out before the damp works.',
  },
  {
    question: 'What IP rating is needed for electrical accessories in damp rooms?',
    answer:
      'BS 7671 Chapter 52 requires the wiring system (cables, accessories, and enclosures) to be selected with regard to external influences, including the presence of water. For locations with moderate moisture (damp but not wet), IP44 accessories provide protection against solid particles over 1mm and water splashing from any direction. For locations with water jets or significant condensation, IP55 is appropriate. For rooms that may be temporarily flooded (ground floor cellars, basements), IPX7 or IPX8 accessories should be considered. In bathrooms, the zone system of BS 7671 Section 701 dictates IP ratings based on the proximity to the bath or shower — Zone 1 requires IPX4 minimum, Zone 0 (inside the bath) requires IPX7.',
  },
  {
    question: 'Can I just dry-test a damp-affected installation and issue a satisfactory EICR?',
    answer:
      'No. An EICR must reflect the actual condition of the installation at the time of inspection. If the installation is in a building with known damp issues, the inspecting electrician must note the presence of damp as an external influence and assess whether it has affected the installation. If IR readings are below the BS 7671 Table 64 minimums, or if moisture damage is visible on accessories or cables, these must be recorded as C1 or C2 observations. Issuing a satisfactory EICR when you know damp is affecting the installation would be misleading and could expose the electrician to professional liability if damage or injury subsequently occurs.',
  },
  {
    question: "What are a landlord's obligations regarding damp and electrical safety?",
    answer:
      'Landlords in England have a legal duty to ensure their rental properties are free from category 1 hazards under the Housing Health and Safety Rating System (HHSRS). A damp-damaged electrical installation that presents a risk of electric shock or fire is a category 1 hazard. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must maintain the electrical installation in a safe condition and have a valid EICR every 5 years. Where an EICR identifies C1 or C2 defects (including damp-related damage), the landlord must arrange remedial work within 28 days. Failure to comply can result in a financial penalty of up to £30,000 imposed by the local authority.',
  },
  {
    question: 'What happens to cables buried in walls during DPC injection?',
    answer:
      'DPC injection involves drilling holes through the mortar course at approximately 150mm spacing, then injecting damp-proofing fluid (typically silane or siloxane) under pressure. The fluid creates a water-resistant barrier in the masonry. Cables buried in the wall are at risk of: being drilled through (if the contractor does not know their location); being saturated by the injection fluid (which, while non-toxic, can degrade PVC insulation); and being buried under new sand-and-cement or lime plaster, which generates significant heat while drying. The safest approach is to remove cables from walls before DPC works and reinstate them afterwards. Alternatively, agree cable positions with the damp proofing contractor in advance and ensure the contractor avoids these areas during injection drilling.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/sump-pump-electrical-installation',
    title: 'Sump Pump Electrical Installation',
    description: 'Wiring sump pumps correctly in damp basement locations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations including damp-affected properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Guide',
    description:
      'Systematic approach to finding faults including damp-related insulation failures.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Generate EICR reports on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'moisture-damage',
    heading: 'Moisture Damage to Electrical Installations',
    content: (
      <>
        <p>
          Damp in buildings is one of the most common causes of electrical installation
          deterioration in the UK. Rising damp, penetrating damp from defective gutters or roofing,
          and condensation all contribute to degradation of cables, accessories, and consumer units.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation degradation</strong> — moisture reduces cable insulation
                resistance (IR), potentially to below 1M\u03a9 (the BS 7671 Table 64 minimum).
                Permanently saturated cable insulation may not recover even after the building dries
                out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal corrosion</strong> — moisture on copper conductors causes oxidation
                and electrochemical corrosion, increasing contact resistance and generating
                dangerous heat at joints and terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tracking and arcing</strong> — moisture on the surface of insulation in
                consumer units and accessories creates conductive tracks that can cause arcing,
                tripped MCBs, and ultimately fire.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The presence of damp should be recorded during an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR inspection
          </SEOInternalLink>{' '}
          as an external influence, and any damage noted with the appropriate observation code.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-requirements',
    heading: 'EICR Before & After DPC Works',
    content: (
      <>
        <p>
          Carrying out an EICR both before and after damp proofing works is best practice and
          provides important protection for both the electrician and the property owner.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-works EICR</strong> — documents the condition of the installation before
                any disturbance. Identifies cables at risk, existing defects, and establishes who is
                responsible for pre-existing damage. Provides a benchmark for the post-works
                inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-works EICR</strong> — confirms the installation is satisfactory after
                all remediation and electrical reinstatement work is complete. Provides the landlord
                or owner with a certificate they can use to demonstrate compliance. Should not be
                issued until the building has fully dried out.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="EICR Certificates for Damp Remediation Projects"
          description="Generate pre- and post-works EICRs on your phone with Elec-Mate. Record observations, test results, and remedial action — all in one place."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Damp Locations — BS 7671 Chapter 52',
    content: (
      <>
        <p>
          BS 7671 Chapter 52 (Selection and Erection of Wiring Systems) requires that wiring systems
          are selected with regard to external influences, including moisture. The relevant external
          influence codes for moisture are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AD1 — negligible</strong> (standard dry indoor location): standard IP2X
                accessories are sufficient. Normal domestic wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AD2 — free fall of water</strong> (damp rooms, condensation): IP44
                accessories required. Applicable to damp basements and cellars with rising damp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AD3 — spraying water</strong>: IP55 accessories required. Applicable to
                outdoor areas or rooms subject to hosing-down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AD6 — waves</strong> / AD7 — immersion: IP67/IP68 required. Applicable to
                areas subject to periodic flooding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-replacement',
    heading: 'Cable Replacement After Damp Works',
    content: (
      <>
        <p>
          The decision on whether cables in damp-affected walls need to be replaced depends on the
          degree of damage, the age of the cables, and the extent of the damp works.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always replace cables that were buried in re-plastered walls.</strong>{' '}
                Cables buried under new plaster cannot be easily inspected or replaced in the
                future. Use the opportunity of replastering to run new cables (or empty conduit for
                future draw-through) before the plaster is applied.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable assessment after damp exposure</strong> — test IR at 500V DC on any
                cables that have been exposed to moisture. Below 1M\u03a9 confirms replacement is
                necessary. Between 1M\u03a9 and 10M\u03a9 warrants further investigation and
                monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age of existing cables</strong> — cables installed before 2004 use the old
                (pre-harmonised) colour code (red/black). Any exposed and replaced cables should use
                current harmonised colours (brown/blue). Old rubber-insulated cables (pre-1970s)
                must be replaced — rubber insulation has a finite life and is always suspect in a
                damp building.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'coordinating',
    heading: 'Coordinating with Damp Proofing Contractors',
    content: (
      <>
        <p>
          Effective coordination between electricians and damp proofing contractors can prevent
          damage to cables, reduce costs, and ensure the electrical installation is reinstated
          correctly after works.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-works meeting</strong> — agree cable locations with the damp contractor
                before drilling begins. Mark cable positions with chalk or tape on the wall surface.
                The damp contractor should be informed of the 150mm zone rules and avoid drilling in
                these areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sequence of works</strong> — ideally: (1) EICR; (2) electrician strips out
                cables from affected walls; (3) damp contractor installs DPC; (4) plasterer
                re-renders; (5) electrician installs new cables/conduit in fresh plaster (or in
                conduit left during plastering); (6) EICR on completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: 'Landlord Obligations — Damp & Electrical Safety',
    content: (
      <>
        <p>
          Landlords in England have overlapping obligations from housing and electrical safety
          legislation regarding damp-affected properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Safety Standards Regulations 2020</strong> — landlords must have
                a valid EICR every 5 years. C1 or C2 defects (including damp- related damage) must
                be remedied within 28 days. Fines of up to £30,000 for non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing Health and Safety Rating System (HHSRS)</strong> — damp is a
                category 1 hazard (requiring immediate remedy) if it presents a risk to health.
                Where damp has damaged the electrical installation, local authority housing officers
                can serve an Improvement Notice requiring the landlord to remedy the hazard within
                28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renters Reform</strong> — the Renters Reform Bill, when enacted, will extend
                the Decent Homes Standard to the private rented sector, further tightening
                requirements around damp and electrical safety.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See our{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICR guide</SEOInternalLink>{' '}
          for a complete overview of landlord electrical safety obligations.
        </p>
      </>
    ),
  },
];

export default function ElectricalDampProofingPage() {
  return (
    <GuideTemplate
      title="Electrical Work in Damp Buildings — Rewiring After DPC & EICR Requirements"
      description="Guide to electrical issues in damp buildings — moisture damage to wiring, EICR requirements before and after DPC injection, IP ratings under BS 7671, cable replacement, and landlord obligations."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Electrical Work in Damp Buildings{' '}
          <span className="text-yellow-400">— DPC & EICR Guide</span>
        </>
      }
      heroSubtitle="A complete guide to electrical issues in damp buildings — moisture damage, EICR requirements before and after DPC injection, IP ratings under BS 7671 Chapter 52, cable replacement, and landlord obligations."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Manage Electrical Work Around Damp Proofing — Step by Step"
      howToDescription="Follow this procedure to safely manage electrical installations during and after damp proofing works."
      faqs={faqs}
      faqHeading="Electrical Work in Damp Buildings — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="EICR Certificates for Damp Remediation Projects"
      ctaSubheading="Generate pre- and post-works EICRs on your phone with Elec-Mate. Record all observations and test results, share with clients as PDF."
    />
  );
}
