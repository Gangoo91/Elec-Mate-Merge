import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  EyeOff,
  Scan,
  Flame,
  Plug,
  Search,
  ClipboardCheck,
  PoundSterling,
  Scale,
  GraduationCap,
  Brain,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR Limitations', href: '/guides/eicr-limitations' },
];

const tocItems = [
  { id: 'what-limitations-means', label: 'What "Limitations" Means' },
  { id: 'extent-of-inspection', label: 'Extent of the Inspection' },
  { id: 'sampling', label: 'Sampling: Why Not Every Circuit Is Tested' },
  { id: 'concealed-wiring', label: 'Concealed Wiring' },
  { id: 'what-eicr-does-not-cover', label: 'What the EICR Does Not Cover' },
  { id: 'recording-limitations', label: 'Recording Limitations Correctly' },
  { id: 'common-limitations', label: 'Common Limitation Examples' },
  { id: 'for-electricians', label: 'For Electricians: Getting It Right' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every EICR must include a clear statement of the extent and limitations of the inspection — this is a BS 7671 requirement, not an optional addition.',
  'The EICR covers the fixed electrical installation only. It does not cover gas installations, water systems, structural issues, portable appliances, or equipment beyond the landlord meter.',
  'Sampling is standard practice on larger installations. The EICR should clearly state what percentage of circuits was tested and any areas that could not be accessed.',
  'Concealed wiring behind walls, under floors, or above ceilings is not inspected during a standard EICR unless there is reason to suspect a fault or the client specifically requests invasive inspection.',
  'Recording limitations accurately protects both the electrician (from liability for issues outside the inspection scope) and the client (by making clear what further work may be needed).',
];

const faqs = [
  {
    question: 'Why does the EICR have a "limitations" section?',
    answer:
      'The limitations section exists because no periodic inspection can examine every part of an electrical installation. Some wiring is buried in walls, hidden above ceilings, or concealed under floors. Some parts of the installation may be inaccessible — for example, behind heavy furniture that the occupant has not moved, in locked rooms, or in areas that are physically unsafe to access. The limitations section formally records what could not be inspected and tested, so that the client and any future reader of the report understands the scope of the inspection. Without this section, a reader might assume that every part of the installation has been examined and found satisfactory, when in reality certain areas were not assessed. BS 7671 Appendix 6 and Guidance Note 3 (GN3) both require the inspector to record the extent and limitations of the inspection on the EICR.',
  },
  {
    question: 'Does a limitation mean the EICR is incomplete?',
    answer:
      'No. Limitations are a normal and expected part of every EICR. A well-recorded set of limitations shows that the inspector has been thorough in documenting what they could and could not assess. An EICR with no limitations recorded is more concerning — it might suggest the inspector has not considered the scope carefully. The EICR is complete when the inspector has inspected and tested everything within the agreed scope and has clearly recorded anything that falls outside that scope. However, if a limitation is significant — for example, the inspector could not access the main consumer unit — the client should understand that the report may not give a full picture of the installation condition, and further investigation may be needed.',
  },
  {
    question: 'Can I ask the electrician to lift floorboards and check concealed wiring?',
    answer:
      'Yes, but this would be an invasive inspection and should be agreed in advance. A standard EICR is a non-invasive or limited invasive inspection — the inspector tests at accessible points (sockets, switches, distribution boards, junction boxes) and uses test results to infer the condition of the wiring in between. If you want the inspector to lift floorboards, remove ceiling panels, or open up trunking to physically inspect concealed wiring, this is additional work that takes more time and may involve making good afterwards. It should be priced and agreed separately. Invasive inspection is typically only warranted if the property has very old wiring (pre-1970s rubber or lead-sheathed cables), if test results suggest a concealed fault, or if a previous EICR has recommended further investigation of concealed areas.',
  },
  {
    question: 'Does the EICR cover the supply authority equipment?',
    answer:
      'No. The EICR covers the fixed electrical installation from the customer side of the meter onwards. It does not cover the electricity supply cable, the service head (cutout), the meter, or the meter tails between the meter and the consumer unit — these belong to the Distribution Network Operator (DNO) or the meter operator. If the inspector identifies a fault or concern with the supply authority equipment — for example, damaged tails, a faulty main fuse, or a corroded service head — they should record it as an observation on the EICR and recommend that the client contacts their DNO. The inspector must not work on or modify supply authority equipment.',
  },
  {
    question: 'Is PAT testing part of the EICR?',
    answer:
      'No. The EICR covers the fixed electrical installation — wiring, consumer unit, sockets, switches, light fittings, and permanently connected equipment (cookers, immersion heaters, shower units). It does not cover portable or moveable equipment that plugs into the sockets. Portable Appliance Testing (PAT) is a completely separate process with its own documentation. Electricians sometimes offer PAT testing as an add-on service when conducting an EICR, which is convenient for landlords, but the two processes are distinct and have different documentation requirements. If you need both an EICR and PAT testing, make sure you request both and that you receive separate documentation for each.',
  },
  {
    question: 'What should I do if the EICR records an FI (Further Investigation) code?',
    answer:
      'An FI (Further Investigation) code means the inspector could not fully assess a particular aspect of the installation and recommends that further investigation is carried out before a definitive classification can be given. This is different from a C1, C2, or C3 code — an FI is not a defect classification but rather an acknowledgement that more work is needed to determine whether a defect exists. Common reasons for an FI include: suspected concealed wiring fault that requires lifting floorboards to verify; an inaccessible junction box that needs to be opened; or an unusual test result that needs investigation with the supply disconnected. You should treat FI codes seriously and arrange the further investigation promptly. The follow-up investigation may clear the FI (no defect found) or may result in a C1, C2, or C3 classification once the area has been fully examined.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Legal requirements, penalties, and landlord obligations for EICR compliance.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and what to charge as an electrician.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training content on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-limitations-means',
    heading: 'What "Extent and Limitations" Means on an EICR',
    content: (
      <>
        <p>
          Every EICR includes a section titled "Extent and Limitations of the Inspection." This is
          not boilerplate text to be copied and pasted — it is a critical part of the report that
          defines exactly what was inspected, what was tested, and what was excluded.
        </p>
        <p>
          The purpose is transparency. An EICR is a snapshot of the installation's condition at the
          time of inspection, based on what the inspector could reasonably access and test. It is
          not a guarantee that every part of the installation is safe — because not every part of
          the installation can be examined during a standard periodic inspection.
        </p>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Appendix 6 and Guidance Note 3 (GN3) require the inspector to record both the extent (what
          was inspected and tested) and the limitations (what was not inspected or tested, and why).
          This protects both parties: the client understands the scope of the report, and the
          inspector has a clear record of what fell outside the agreed inspection.
        </p>
      </>
    ),
  },
  {
    id: 'extent-of-inspection',
    heading: 'Extent of the Inspection: What Is Covered',
    content: (
      <>
        <p>
          A standard EICR covers the fixed electrical installation from the origin (the customer
          side of the meter) to the final circuits and accessories. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit / distribution board:</strong> condition, labelling,
                protective devices (MCBs, RCDs, RCBOs), main switch, connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding:</strong> main earth terminal, earthing conductor, main
                equipotential bonding conductors, supplementary bonding where applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Final circuits:</strong> wiring to socket outlets, lighting circuits, cooker
                circuits, shower circuits, and any other final circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories:</strong> socket outlets, switches, light fittings, connection
                units, and other fixed electrical equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permanently connected equipment:</strong> cookers, immersion heaters,
                electric showers, towel rails, and other fixed appliances.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The extent section should specify which circuits were tested, the number of distribution
          boards inspected, and whether the inspection covered the entire installation or a specific
          part of it.
        </p>
      </>
    ),
  },
  {
    id: 'sampling',
    heading: 'Sampling: Why Not Every Point Is Tested',
    content: (
      <>
        <p>
          On larger installations — particularly commercial properties with many circuits — it is
          not always practical to test every single circuit and accessory. In these cases, the
          inspector uses a sampling approach, testing a representative proportion of the
          installation and recording the sampling rate on the EICR.
        </p>
        <p>
          Guidance Note 3 (GN3) provides guidance on appropriate sampling rates. For a standard
          domestic property, the expectation is that every circuit is tested. For a large commercial
          installation with hundreds of circuits, a sampling rate of 10% to 25% may be appropriate,
          depending on the age and condition of the installation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Scan className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Sampling best practice</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>For domestic properties: test every circuit. Sampling is not appropriate.</li>
                <li>
                  For commercial properties: agree the sampling rate with the client before
                  starting. Record it clearly on the EICR.
                </li>
                <li>
                  Select samples that are representative — include circuits of different types,
                  ages, and locations.
                </li>
                <li>
                  If any sampled circuit shows a defect, increase the sample size for that circuit
                  type to determine whether the issue is widespread.
                </li>
                <li>
                  Record which circuits were tested and which were not. The report must make this
                  clear.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          A limitation recorded as "10% sample of lighting circuits tested" is informative and
          appropriate. A limitation recorded simply as "sampling applied" is vague and unhelpful. Be
          specific.
        </p>
      </>
    ),
  },
  {
    id: 'concealed-wiring',
    heading: 'Concealed Wiring: The Biggest Limitation',
    content: (
      <>
        <p>
          The most significant limitation on any EICR is concealed wiring. In most properties, the
          majority of the electrical cabling is hidden — buried in walls, run under floorboards,
          routed through ceiling voids, or enclosed in trunking. During a standard EICR, the
          inspector cannot see this wiring.
        </p>
        <p>
          Instead, the inspector uses test results to infer the condition of concealed wiring.
          Insulation resistance testing at 500V DC can detect degraded insulation. Continuity
          testing can detect broken or high-resistance conductors. Earth fault loop impedance
          testing can reveal issues with the protective conductor. But none of these tests can
          detect physical damage to cable sheathing, incorrect installation methods, or mechanical
          damage that has not yet affected the electrical properties.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <EyeOff className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">What concealed wiring limitations mean</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  The inspector has not visually inspected the wiring behind walls, under floors, or
                  above ceilings.
                </li>
                <li>
                  Test results for concealed circuits are based on measurements taken at accessible
                  points (sockets, switches, distribution boards).
                </li>
                <li>
                  Physical damage, incorrect installation methods, or non-compliant cable routes may
                  exist but cannot be identified without invasive inspection.
                </li>
                <li>
                  If test results suggest a concealed fault, the inspector should record an FI
                  (Further Investigation) code recommending that the concealed area be opened up for
                  examination.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          For most properties, accepting this limitation is reasonable. For properties with very old
          wiring (pre-1970s), a history of electrical problems, or previous reports of overheating,
          the client may wish to commission an invasive inspection of specific areas.
        </p>
      </>
    ),
  },
  {
    id: 'what-eicr-does-not-cover',
    heading: 'What the EICR Does Not Cover',
    content: (
      <>
        <p>
          Understanding what falls outside the scope of an EICR is as important as understanding
          what it covers. The EICR does not assess:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portable appliances.</strong> Anything that plugs into a socket is not
                covered. Fridges, washing machines, kettles, lamps — these require separate{' '}
                <SEOInternalLink href="/guides/pat-testing-guide">PAT testing</SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas installations.</strong> The EICR does not cover gas boilers, gas fires,
                gas cookers, or gas pipework. These require a Gas Safe registered engineer and a
                separate gas safety certificate (CP12).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply authority equipment.</strong> The meter, service head (cutout),
                supply cable, and meter tails belong to the DNO/meter operator. The EICR starts at
                the customer side of the meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Telephone, data, and TV cabling.</strong> Low-voltage communication cabling
                is not part of the electrical installation covered by BS 7671 (except where it
                interfaces with the mains supply, such as a powered TV amplifier).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems (specialist).</strong> While the EICR may note the
                presence of a fire alarm system, a full assessment of fire detection and alarm
                systems requires inspection to BS 5839 by a fire alarm competent person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (specialist).</strong> Similar to fire alarms, emergency
                lighting requires inspection to BS 5266. The EICR may note its presence but does not
                constitute a full emergency lighting test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural issues.</strong> Water ingress, dampness, thermal insulation, and
                building fabric issues that may affect the electrical installation are noted as
                observations but are not within the electrician's scope to assess fully.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are a landlord or property manager, make sure you commission the right inspections
          for each system. An EICR alone does not cover everything.
        </p>
      </>
    ),
  },
  {
    id: 'recording-limitations',
    heading: 'Recording Limitations Correctly on the EICR',
    content: (
      <>
        <p>
          Recording limitations is a professional skill. Vague, generic statements do not serve the
          purpose. The limitations section should be specific, factual, and actionable.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Poor Examples</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>"Limited inspection."</li>
              <li>"Some areas not accessed."</li>
              <li>"Concealed wiring not inspected."</li>
              <li>"As per standard limitations."</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Good Examples</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>"Loft space not accessed — hatch obstructed by fitted wardrobe in bedroom 2."</li>
              <li>
                "Under-floor wiring in ground floor not visually inspected — solid floor, no
                access."
              </li>
              <li>
                "Garage sub-board not tested — garage locked, key not available at time of
                inspection."
              </li>
              <li>
                "Consumer unit labelling only — internal connections not inspected due to plastic
                housing (non-removable cover)."
              </li>
            </ul>
          </div>
        </div>
        <p>
          The good examples tell the reader exactly what was excluded and why. This is essential for
          accountability — if a fault later develops in an area that was listed as a limitation, the
          EICR clearly records that the area was not within the inspection scope.
        </p>
        <SEOAppBridge
          title="Get the limitations section right first time"
          description="Elec-Mate prompts you to record the extent and limitations as you work through the EICR. Pre-populated options for common limitations, plus free text for specific access issues. No more vague boilerplate."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'common-limitations',
    heading: 'Common Limitation Examples for Different Property Types',
    content: (
      <>
        <p>The limitations you encounter vary by property type. Here are common examples:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Domestic Properties</h4>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                Furniture not moved — sockets behind heavy wardrobes, beds, or kitchen units not
                accessed.
              </li>
              <li>
                Loft wiring not visually inspected — insufficient boarding or insulation covering
                cables.
              </li>
              <li>
                Under-floor wiring not inspected — solid floors or fully carpeted timber floors.
              </li>
              <li>Outbuildings not included — separate supply, not part of main installation.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Commercial Properties</h4>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Sampling applied — 20% of lighting circuits, 100% of socket circuits tested.</li>
              <li>
                Ceiling void wiring not visually inspected — suspended ceiling tiles not removed.
              </li>
              <li>
                Server room circuits not tested — could not be isolated during business hours.
              </li>
              <li>
                Three-phase distribution not tested — main isolator could not be operated during
                trading hours.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">HMOs</h4>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                Tenant rooms 3 and 5 not accessed — tenants not available at time of inspection.
              </li>
              <li>Communal area under-stair cupboard locked — key not provided.</li>
              <li>
                External lighting circuit to rear not tested — area inaccessible due to overgrown
                vegetation.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Getting Limitations Right',
    content: (
      <>
        <p>
          Recording the extent and limitations properly is one of the hallmarks of a competent
          inspector. It demonstrates that you have thought carefully about the scope of your
          inspection and have been transparent about what you could and could not assess.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agree the scope beforehand.</strong> Before starting the inspection, discuss
                with the client what will be included. Is it the whole installation or just specific
                areas? Are there known access restrictions? Will the occupier be present to move
                furniture or provide keys?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record limitations as you go.</strong> Do not try to remember them all at
                the end. When you encounter an area you cannot access or a circuit you cannot test,
                record it immediately on the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be specific and factual.</strong> State what was not inspected, where it is,
                and why. Avoid vague statements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use FI codes where appropriate.</strong> If a limitation means you cannot
                determine the safety of a particular part of the installation, consider whether an
                FI (Further Investigation) observation code is warranted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discuss limitations with the client.</strong> When you hand over the report,
                explain what the limitations mean in practical terms. If further investigation is
                needed, explain why and what it would involve.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record extent and limitations as you inspect"
          description="Elec-Mate walks you through the extent and limitations section as part of the EICR workflow. Common limitation templates plus free text, all recorded in real time on site. Professional reporting with zero desk time."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRLimitationsPage() {
  return (
    <GuideTemplate
      title="EICR Limitations | What the EICR Does Not Cover"
      description="Understanding EICR extent and limitations. What the EICR covers, what it does not, sampling, concealed wiring, and how to record limitations correctly. Essential for electricians and property owners."
      datePublished="2025-03-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Limitations:{' '}
          <span className="text-yellow-400">What the Report Does and Does Not Cover</span>
        </>
      }
      heroSubtitle="Every EICR has an extent and limitations section. Understanding what falls inside and outside the scope of the inspection is essential — for electricians writing the report and for clients reading it. This guide explains what the EICR covers, what it does not, and how to record limitations correctly."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR Limitations"
      relatedPages={relatedPages}
      ctaHeading="Complete Professional EICRs on Your Phone"
      ctaSubheading="AI board scanning, voice test entry, structured extent and limitations recording, and instant PDF delivery. Join 430+ electricians doing EICRs the smart way. 7-day free trial."
    />
  );
}
