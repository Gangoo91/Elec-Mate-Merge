import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Search,
  Zap,
  FileText,
  Calendar,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Safety Checks New Home', href: '/guides/electrical-safety-checks-new-home' },
];

const tocItems = [
  { id: 'overview', label: 'Why Electrical Checks Matter When Buying' },
  { id: 'eicr', label: 'Commissioning an EICR' },
  { id: 'wiring-age', label: 'Identifying Wiring Age' },
  { id: 'consumer-unit', label: 'Consumer Unit Age and Type' },
  { id: 'red-flags', label: 'Electrical Red Flags in a New Home' },
  { id: 'before-purchase', label: 'Before and After Purchase' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical safety is rarely covered in standard homebuyer surveys — a dedicated EICR (Electrical Installation Condition Report) commissioned by a qualified electrician is the only way to assess the condition of the fixed electrical installation.',
  'Wiring age indicators include rubber insulation (pre-1960s, now dangerous), aluminium wiring (1960s to 1970s, prone to loose connections), and TRS (tough rubber sheathed) wiring (1960s to 1980s).',
  'Consumer unit age indicators: BS 3036 rewireable fuse boards (pre-1980s, no RCD, over-fusing risk), MCB boards without RCD protection (pre-2008 practice), and split-load boards with one RCD (standard from late 1990s to 2015).',
  'Red flags in a new home include no main protective bonding on gas and water services, no RCD protection, single-pole isolation at the main switch, 5-amp round-pin sockets, and scorch marks on accessories.',
  'An EICR should be commissioned before exchange of contracts where possible, or immediately after moving in. Any C1 deficiencies must be remediated before the installation is used.',
];

const faqs = [
  {
    question: 'Does a standard homebuyer survey cover the electrical installation?',
    answer:
      'A standard homebuyer survey (RICS Level 2 or Level 3 survey) does not include a detailed assessment of the electrical installation. Surveyors will note obvious defects visible on a visual inspection — such as exposed wiring or a clearly damaged consumer unit — but they will not carry out the testing required to determine the condition of the fixed electrical installation. Only a qualified electrician carrying out an Electrical Installation Condition Report (EICR) can assess the electrical installation properly, including testing continuity, insulation resistance, RCD operation, and earth fault loop impedance. Homebuyers should commission an EICR separately, ideally before exchange of contracts.',
  },
  {
    question: 'What does rubber-insulated wiring look like and why is it dangerous?',
    answer:
      'Rubber-insulated wiring was standard in UK domestic properties until approximately the early 1960s. It can be identified by its outer sheath: early rubber wiring has a braided or woven cotton or jute outer covering (sometimes known as VIR — vulcanised india rubber). Later rubber wiring has a black rubber outer sheath. Inside, the conductors are insulated with rubber, which deteriorates over time, becoming brittle, cracking, and eventually disintegrating. When the rubber insulation cracks, conductors are exposed and can arc against each other or against earthed metalwork — a serious fire and shock risk. Rubber wiring is typically over 60 years old and well beyond its design life. Any property with rubber-insulated wiring should be prioritised for rewiring.',
  },
  {
    question: 'What was aluminium wiring used for in homes and what are the risks?',
    answer:
      'Aluminium wiring was used in some UK domestic properties during the 1960s and 1970s, typically for larger circuits and sometimes for all wiring, as a cheaper alternative to copper during a period when copper prices were high. Aluminium wiring can be identified by its silver colour (copper is orange-red). The risks with aluminium wiring include: aluminium oxidises at connection points, increasing resistance and causing localised heating; aluminium work-hardens and becomes brittle with thermal cycling, leading to loose connections over time; and aluminium connections made in copper accessories (socket outlets, switches designed for copper conductors) can corrode and overheat. Aluminium wiring requires careful inspection and, where it remains in service, bi-metallic connectors and aluminium-rated accessories.',
  },
  {
    question: 'What is TRS wiring and is it still safe?',
    answer:
      'TRS stands for Tough Rubber Sheathed — a type of wiring used in UK domestic properties from the 1960s to the 1980s. TRS cable has a grey or black rubber outer sheath with rubber-insulated conductors inside. The conductor insulation colours in TRS wiring are red (live) and black (neutral), with a bare or green-sleeved earth conductor. TRS wiring is generally in better condition than older VIR wiring but is still ageing — most TRS installations are now 40 to 60 years old. Where TRS insulation has been subject to heat from overloading, UV exposure in roof spaces, or repeated flexing, it can become brittle and cracked. An EICR is essential for any property with TRS wiring to assess its current condition.',
  },
  {
    question: 'What should I look for at the consumer unit when viewing a property?',
    answer:
      'At the consumer unit, look for: the type of protective device (rewireable fuses = very old, MCBs = modern); whether RCD protection is present (a large switch with a test button labelled "RCD" or "RCCB" on a section of the board); whether the consumer unit has a metal or plastic enclosure (plastic units pre-date the 2015 requirement for metal enclosures); the condition of the consumer unit (signs of overheating, scorch marks, corrosion); and whether all circuits are clearly labelled. A consumer unit with rewireable fuses and no RCD protection represents a significant safety deficiency that will typically be rated C2 or C3 on an EICR, requiring urgent attention.',
  },
  {
    question: 'What is main protective bonding and how do I check if it is present?',
    answer:
      'Main protective bonding (also called equipotential bonding) connects the main metallic services entering the building — gas pipes and water pipes — to the main earthing terminal at the consumer unit. It is required by BS 7671 Regulation 411.3.1.2 to prevent a dangerous voltage difference developing between these services and earthed electrical equipment if a fault occurs on the electrical supply. Main bonding cables are typically 10mm green-and-yellow insulated cables that can be seen connecting the gas meter pipework or incoming water pipe to the consumer unit or to an earth rod. The connection point on the gas or water service is a yellow earthing clamp. If no main bonding is visible, the installation should be inspected — absence of main bonding is typically a C2 deficiency on an EICR.',
  },
  {
    question: 'How long does an EICR take and what does it cost?',
    answer:
      'An EICR typically takes 2 to 4 hours for a standard 3-bedroom house, depending on the number of circuits, the age and condition of the installation, and the ease of access. For larger properties with more circuits, it can take 4 to 8 hours. Electricians typically charge £150 to £300 for a domestic EICR depending on the property size and location. The EICR produces a written report (the certificate) that classifies all deficiencies found and makes a recommendation on whether the installation is Satisfactory or Unsatisfactory. An Unsatisfactory report should be followed by remediation work to address C1 and C2 deficiencies.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete Electrical Installation Condition Reports on your phone.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-fire-prevention-uk',
    title: 'Electrical Fire Prevention Guide',
    description: 'Warning signs of dangerous wiring and fire prevention measures.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'What certificates to look for when buying a property with existing electrical work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When and why to upgrade an old fuse board to a modern consumer unit.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'What certificates should exist for electrical work carried out since 2005.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue EICs for remediation work identified in EICRs.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Electrical Checks Matter When Buying a Home',
    content: (
      <>
        <p>
          The electrical installation is one of the most important — and most frequently overlooked
          — aspects of buying a home. Unlike a damp problem or a roof defect, electrical deficiencies
          are often invisible and can be present for years before causing an incident. A house with
          deteriorating wiring, no RCD protection, or absent earth bonding can look perfectly normal
          while presenting a serious risk of electric shock or fire.
        </p>
        <p>
          Standard homebuyer surveys do not include detailed electrical testing. A surveyor will
          note obvious visual defects but will not carry out the insulation resistance testing,
          continuity testing, and RCD testing that form the basis of an EICR. Only a qualified
          electrician carrying out an EICR can properly assess the condition of the fixed
          electrical installation.
        </p>
        <p>
          For buyers, commissioning an EICR before exchange of contracts gives them accurate
          information about the cost of any necessary remediation work — information that can
          be used to negotiate the purchase price or to require the seller to carry out
          remediation before completion. Discovering serious electrical deficiencies after
          completion is both more stressful and more expensive.
        </p>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'Commissioning an EICR for a New Home',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) assesses the condition of the fixed
          electrical installation in an existing building. It tests the wiring, accessories,
          consumer unit, and earthing arrangements, and classifies any deficiencies found.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>When to commission</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Ideally before exchange of contracts, so the results can inform the purchase
                  negotiation. If this is not possible, commission the EICR within the first few
                  weeks after moving in. An EICR within the first year of ownership is essential
                  for any property where there is no existing EICR certificate or where the
                  existing certificate is more than 5 to 10 years old.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>What the EICR covers</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The EICR assesses the condition of all fixed wiring, circuit protective devices,
                  earthing and bonding, RCD protection, socket outlets, switches, and light fittings.
                  It includes electrical testing (continuity, insulation resistance, polarity, earth
                  fault loop impedance, RCD test) and a visual inspection of all accessible parts
                  of the installation.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Satisfactory vs Unsatisfactory</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The EICR concludes with an overall assessment: Satisfactory (no C1 or C2
                  deficiencies found) or Unsatisfactory (one or more C1 or C2 deficiencies
                  present). An Unsatisfactory result does not mean the installation is unusable,
                  but C1 deficiencies (danger present) require immediate attention — in some cases
                  the electrician may disconnect the affected circuits before leaving.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete EICRs on site with Elec-Mate"
          description="Elec-Mate's EICR certificate app guides you through the inspection and testing process, records all results, classifies deficiencies, and produces a professional EICR PDF on site. Ideal for new home purchase EICRs."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'wiring-age',
    heading: 'Identifying Wiring Age in an Existing Property',
    content: (
      <>
        <p>
          The age of the wiring in a property is one of the most important indicators of electrical
          risk. Different wiring types were used in different periods, and each type has a
          characteristic appearance and associated risk profile.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white text-base mb-2 flex items-center gap-2">
                <span className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1">Pre-1960s</span>
                Rubber-Insulated Wiring (VIR/TRS)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Braided or cotton-covered outer sheath (VIR — vulcanised india rubber) or black
                rubber outer sheath. Conductors insulated with rubber, which has become brittle
                and may be crumbling. Colours: red (live), black (neutral), bare or green earth.
                Very high fire risk — prioritise rewiring immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-2 flex items-center gap-2">
                <span className="bg-orange-500 text-white text-xs font-bold rounded px-2 py-1">1960s–1970s</span>
                Aluminium Wiring
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Silver-coloured conductors (instead of copper's orange-red). Used for ring main
                circuits in some properties during this period. Prone to loose connections through
                oxidisation and work hardening. Requires specialist inspection and bi-metallic
                connectors at termination points.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-2 flex items-center gap-2">
                <span className="bg-yellow-500 text-black text-xs font-bold rounded px-2 py-1">1960s–1980s</span>
                TRS (Tough Rubber Sheathed) Wiring
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Grey or black rubber outer sheath, rubber-insulated conductors. Colours: red
                (live), black (neutral). Generally better condition than older rubber wiring but
                ageing — 40 to 60 years old. Insulation condition varies significantly; inspect
                carefully and test insulation resistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base mb-2 flex items-center gap-2">
                <span className="bg-green-500 text-white text-xs font-bold rounded px-2 py-1">1970s onwards</span>
                PVC-Insulated Wiring (T&E)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                White or grey PVC outer sheath, PVC-insulated conductors. Old colour code: red
                (live), black (neutral). New colour code (post-2004): brown (live), blue (neutral).
                Generally durable — PVC wiring from the 1970s onwards can still be in good
                condition, though it should be inspected and tested. Any mixing of old and new
                colour codes should be verified for correct connections.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Age: What to Look For',
    content: (
      <>
        <p>
          The consumer unit (fuse board) is the most visible indicator of the age and level of
          protection of the electrical installation. Different types reflect different eras of
          electrical practice and different levels of protection.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">BS 3036 Rewireable Fuses</h3>
            <p className="text-white text-sm text-white mb-2 leading-relaxed">
              Very old. Fuse elements made of fuse wire that must be replaced manually when blown.
              No RCD protection. Risk of over-fusing (fitting wire of incorrect rating). Consumer
              unit is typically brown or cream Bakelite or early plastic.
            </p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-white text-sm font-semibold">High priority for replacement</span>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">MCB Board, No RCD</h3>
            <p className="text-white text-sm text-white mb-2 leading-relaxed">
              MCBs (miniature circuit breakers) replace rewireable fuses — an improvement. No RCD
              protection means no protection against shock from direct contact with live conductors.
              Common in properties wired or rewired between approximately 1970 and the late 1990s.
            </p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-white text-sm font-semibold">C3 deficiency — upgrade recommended</span>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Split-Load with One RCD</h3>
            <p className="text-white text-sm text-white mb-2 leading-relaxed">
              Consumer unit with a main switch and one RCD protecting some circuits. Common from
              late 1990s to 2015. Better than no RCD, but circuits on the non-RCD side are
              unprotected. A nuisance trip on the single RCD disconnects multiple circuits.
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-white text-sm font-semibold">Acceptable but improvement possible</span>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Modern Metal CU with RCBOs</h3>
            <p className="text-white text-sm text-white mb-2 leading-relaxed">
              Metal consumer unit (required from 2015), individual RCBOs per circuit, all circuits
              protected by 30mA RCD. Current best practice. Provides individual protection for each
              circuit — a fault on one circuit does not affect others.
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-white text-sm font-semibold">Current best practice</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'red-flags',
    heading: 'Electrical Red Flags in a New Home',
    content: (
      <>
        <p>
          These are the specific electrical red flags that warrant immediate investigation and
          remediation in a property being purchased or recently purchased:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No main protective bonding</strong> — gas and water service pipes not
                bonded to the main earthing terminal. This is typically a C2 deficiency on an
                EICR and should be remediated promptly. Bonding cables are yellow-green, typically
                10mm, attached to the pipework near the meter with an earthing clamp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — a consumer unit with no RCD (only MCBs or
                rewireable fuses) means socket outlets and other circuits are not protected against
                the shock risk that arises when someone touches a live conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-pole isolation at the main switch</strong> — a main switch that
                disconnects only the live conductor (not both live and neutral) means the neutral
                remains live after isolation. Double-pole isolation is required by BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>5-amp round-pin sockets</strong> — these are very old socket types (pre-1950s)
                indicating the installation has not been updated since the property was built.
                A comprehensive rewire is likely needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks or heat discolouration on accessories</strong> — any visible
                scorch marks on socket outlets, switches, the consumer unit, or light fittings
                indicate that arcing has already occurred and the installation is potentially
                dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Untested rewires and additions without certificates</strong> — evidence of
                DIY or unqualified electrical work without Part P certificates indicates that the
                work may not meet BS 7671 requirements and has not been inspected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'before-purchase',
    heading: 'Before and After Purchase: What to Do',
    content: (
      <>
        <p>
          The ideal sequence for electrical due diligence when buying a property is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-5 text-white">
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <strong>Ask for existing electrical certificates</strong>
                <p className="text-white text-sm mt-1">
                  Ask the seller or estate agent for any existing EICR, EIC, or Minor Works
                  Certificates for the property. A valid EICR within the past 5 to 10 years is a
                  positive indicator. Absence of any certificates is a red flag — it does not mean
                  the installation is unsafe, but it means there is no verified evidence of its
                  condition.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <strong>Commission an EICR before exchange</strong>
                <p className="text-white text-sm mt-1">
                  Instruct a qualified electrician (NICEIC, NAPIT, or equivalent registered) to
                  carry out an EICR of the property before exchange of contracts. Use the results
                  to negotiate or to require remediation by the seller as a condition of purchase.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <strong>Remediate C1 and C2 deficiencies immediately</strong>
                <p className="text-white text-sm mt-1">
                  Any C1 (danger present) or C2 (potentially dangerous) deficiencies identified
                  in the EICR must be remediated before or immediately after moving in. C3
                  improvement recommendations should be budgeted for and addressed within a
                  reasonable timeframe.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">4</span>
              <div>
                <strong>Plan any major electrical upgrades</strong>
                <p className="text-white text-sm mt-1">
                  If the EICR reveals that the installation is nearing the end of its useful life
                  (very old wiring, no RCD protection, rewireable fuses), plan for a full rewire
                  or consumer unit upgrade within the first year of ownership.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: New Home EICRs',
    content: (
      <>
        <p>
          New home purchase EICRs are an excellent source of work for electricians. They typically
          lead to follow-on remediation work — rewires, consumer unit upgrades, main bonding, and
          additional RCD protection — and they build a long-term relationship with a new homeowner
          who will need electrical work for years to come.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete your{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR certificate
                  </SEOInternalLink>{' '}
                  on site with Elec-Mate. AI-assisted inspection guidance, deficiency classification,
                  and instant PDF for the homeowner — professional report delivered on the day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Fault Finding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate's AI tools help you identify and classify unfamiliar wiring types,
                  check regulation compliance on old installations, and generate accurate remediation
                  recommendations for the homeowner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyChecksNewHomePage() {
  return (
    <GuideTemplate
      title="Electrical Safety Checks for a New Home | EICR Buyer's Guide UK"
      description="What to check in the electrical installation when buying a home in the UK. How to commission an EICR, wiring age indicators (rubber pre-1960s, aluminium 1960s–1970s, TRS 1960s–1980s), consumer unit types, red flags including no earth bonding and no RCD protection, and what to do before and after purchase."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Home Buyer's Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Electrical Safety Checks:{' '}
          <span className="text-yellow-400">Buying a New Home in the UK</span>
        </>
      }
      heroSubtitle="The electrical installation is rarely covered in a standard homebuyer survey. This guide explains how to assess the electrical safety of a property you are buying — wiring age indicators, consumer unit types, red flags, and when to commission an EICR."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Safety Checks When Buying a Home"
      relatedPages={relatedPages}
      ctaHeading="Complete New Home EICRs On Site"
      ctaSubheading="Elec-Mate helps UK electricians complete EICR certificates on site for new home purchase clients. AI-assisted inspection, deficiency classification, and professional PDF — delivered on the day. 7-day free trial."
    />
  );
}
