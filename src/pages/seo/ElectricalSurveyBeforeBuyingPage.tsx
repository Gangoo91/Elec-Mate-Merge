import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { CARD, CARD_PADDED, DIVIDE, LABEL, SUBPANEL } from '@/components/seo/seoSurface';
import { FileCheck2, Home, ClipboardCheck, Search, CheckCircle2, Scale } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Buying a House Guides', href: '/buying-house-electrical-guide' },
  { label: 'Electrical Survey When Buying', href: '/electrical-survey-before-buying' },
];

const tocItems = [
  { id: 'do-you-need-eicr', label: 'Do You Need an EICR?' },
  { id: 'properties-over-25-years', label: 'Properties Over 25 Years Old' },
  { id: 'eicr-cost', label: 'EICR Cost for House Purchase' },
  { id: 'what-eicr-reveals', label: 'What an EICR Reveals' },
  { id: 'c1-c2-explained', label: 'C1 and C2 Observations Explained' },
  { id: 'negotiating-on-results', label: 'Negotiating on EICR Results' },
  { id: 'satisfactory-eicr', label: 'What a Satisfactory EICR Means' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR (Electrical Installation Condition Report) is not legally required when buying a property — but it is strongly recommended for any property over 25 years old, any property with a rewirable fuse board, or any property where the vendor cannot produce a recent EICR.',
  'The cost of an EICR for a house purchase is typically £150 to £400 depending on property size. This is a small cost relative to the potential expense of undisclosed electrical defects.',
  'A C1 observation means danger is present and requires immediate action. A C2 observation means the installation is potentially dangerous. Either one makes the overall assessment Unsatisfactory and gives strong grounds for renegotiation.',
  'C3 (improvement recommended) and FI (further investigation) observations are advisory. They do not change the overall assessment, but an FI is unresolved information and worth chasing before you exchange.',
  'EICR findings are quantifiable — get quotes for the remedial work and use them to negotiate a price reduction or require the vendor to complete the work before exchange.',
  'Mortgage lenders and insurers increasingly ask for evidence of a satisfactory EICR for older properties. Some lenders will withhold mortgage funds if an EICR reveals significant defects.',
];

const faqs = [
  {
    question: 'Is an EICR legally required when buying a house?',
    answer:
      "No. There is no legal requirement for a vendor to provide an EICR when selling a residential property. However, a standard homebuyer's survey does not include electrical testing. Without commissioning your own EICR, you have no reliable information about the condition of the electrical installation. For properties over 25 years old, or where you can see signs of old wiring or a rewirable fuse board, commissioning an EICR before exchange of contracts is strongly recommended.",
  },
  {
    question: 'How much does an electrical survey cost when buying a house?',
    answer:
      'An EICR for a house purchase typically costs £150 to £200 for a one-bedroom flat, £175 to £275 for a two-bedroom property, £250 to £400 for a three-bedroom house, and £350 to £550 for a four-bedroom house. Prices are higher in London and the South East. The cost is non-refundable if you withdraw from the purchase, but it is a small sum compared to the cost of an undisclosed rewire (£4,500 to £10,000) or consumer unit replacement (£400 to £900).',
  },
  {
    question: 'What is the difference between a C1 and C2 observation on an EICR?',
    answer:
      'C1 means danger present — the inspecting electrician has found a condition that poses an immediate risk of injury, and immediate remedial action is necessary. C2 means potentially dangerous — the condition is not immediately dangerous but could become so, and urgent remedial action is necessary. Either code makes the overall assessment Unsatisfactory. A C1 finding might be an exposed live conductor, a damaged cable, or an unearthed metal enclosure. A C2 finding might be the absence of RCD protection, inadequate bonding, or deteriorated insulation that has not yet failed. Both give strong grounds for renegotiation.',
  },
  {
    question: 'Does an FI observation make the EICR Unsatisfactory?',
    answer:
      'No. Under the model Electrical Installation Condition Report in BS 7671:2018+A4:2026, the overall assessment is reported as Unsatisfactory where any observation is given a C1 or C2 classification. C3 (improvement recommended) and FI (further investigation) are advisory and do not affect the overall assessment. That said, an FI means the inspector could not verify something within the agreed extent and limitations of the inspection — so as a buyer you are looking at an open question rather than a clean bill of health. Ask for it to be resolved before exchange.',
  },
  {
    question: 'Should I withdraw from a purchase if the EICR is Unsatisfactory?',
    answer:
      'Not necessarily. An Unsatisfactory EICR gives you information — and information is power in a negotiation. The key question is: how much will the remedial work cost, and is the property still good value at the current offer price once you factor in that cost? Get quotes from electricians for the remedial work, then either request a price reduction or ask the vendor to carry out and certify the work before exchange. Withdrawal is appropriate only if the vendor refuses all concessions and the cost of remediation is prohibitive.',
  },
  {
    question: 'Will my mortgage lender ask for an EICR?',
    answer:
      'Some lenders, particularly for older properties or buy-to-let purchases, require evidence of a satisfactory EICR before releasing mortgage funds. Even where a lender does not specifically require an EICR, their surveyor may flag electrical concerns that trigger a further investigation condition on the mortgage offer. Check with your mortgage broker or lender whether an EICR will be required for your specific purchase.',
  },
  {
    question: 'Does the vendor have to let me have an EICR done?',
    answer:
      "The vendor is not legally obliged to allow a pre-purchase EICR, but virtually all will do so. It is a reasonable request and refusal would raise concerns in most buyers' minds. If a vendor actively refuses to allow an electrical inspection, treat this as a significant red flag. You may wish to make allowing an EICR a condition of your offer.",
  },
  {
    question: 'What does an EICR not cover?',
    answer:
      "An EICR covers the fixed electrical installation — wiring, consumer unit, sockets, switches, and the main earthing and bonding system. The supply intake is included by visual inspection only: the model schedule in BS 7671 lists the service cable, service head, earthing arrangements, supplier's meter tails and metering equipment as items to look at, but they are not tested and they are not yours to repair. Defects there are reported to the person who ordered the work so the distributor or energy supplier can be told. An EICR does not cover portable appliances, which fall under in-service inspection and testing of electrical equipment rather than BS 7671 periodic inspection. Solar PV systems and EV chargers may or may not be included — confirm the scope with the inspector before booking.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/buying-house-electrical-guide',
    title: 'Buying a House Electrical Checklist',
    description:
      'What to check at viewing, signs of DIY work, and rewire costs to factor into your offer.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-issues-house-value',
    title: 'How Electrical Issues Affect House Value',
    description:
      'How rewires, consumer unit upgrades, and EICR failures affect property value and mortgage lending.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description:
      'What to do when you move into a new property — RCD tests, smoke detectors, emergency procedures.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Small presentational helpers (local to this page)
// -------------------------------------------------------------------

/** A typographic list row: bold lead-in, then the explanation. No icons. */
function PointList({ items }: { items: Array<{ term: string; detail: React.ReactNode }> }) {
  return (
    <div className={`${CARD} my-6 ${DIVIDE}`}>
      {items.map((item) => (
        <div key={item.term} className="p-4 sm:p-5">
          <p className="text-[15px] font-semibold leading-snug text-white">{item.term}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-white">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

const TH = 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white';
const TD = 'px-4 py-3.5 text-[14px] text-white';

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'do-you-need-eicr',
    heading: 'Do You Need an EICR When Buying a House?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is not a legal requirement for a
          residential property sale. Unlike a Gas Safety Record, which must be provided for rented
          properties, there is no obligation on a vendor to commission or provide an EICR to a buyer.
          A standard homebuyer's survey does not test the electrics either, so without a separate
          EICR you have no reliable information about the condition of the wiring.
        </p>
        <p>
          For most properties, commissioning an EICR before exchange of contracts is strongly
          recommended. The cost — typically £150 to £400 — is modest relative to the protection it
          provides. An EICR matters most in four situations.
        </p>
        <PointList
          items={[
            {
              term: 'The property is over 25 years old',
              detail: (
                <>
                  Installations from before the year 2000 commonly lack RCD protection on socket
                  circuits. Regulation 411.3.3 of BS 7671, as revised at Amendment 4, requires RCD
                  protection for socket-outlets rated up to 32&nbsp;A, and the risk-assessment
                  exception that allows it to be omitted is expressly not available for dwellings.
                </>
              ),
            },
            {
              term: 'The consumer unit is a rewirable fuse board',
              detail:
                'Rewirable ceramic fuse holders without MCBs or RCDs indicate the installation has not been significantly updated since at least the 1970s.',
            },
            {
              term: 'The vendor cannot produce a recent EICR',
              detail:
                "If the vendor has no EICR from the past five years, there is no documentary evidence of the installation's condition — and no previous report for an inspector to work from.",
            },
            {
              term: 'You can see signs of DIY work or old wiring at viewing',
              detail:
                'Dark rubber-insulated cables, fabric-braided wiring, or non-standard fittings are all reasons to commission an inspection.',
            },
          ]}
        />
        <p>
          Even for newer properties, an EICR can uncover defects from poor installation work. It is
          one of the most cost-effective due diligence steps available to a property buyer.
        </p>
      </>
    ),
  },
  {
    id: 'properties-over-25-years',
    heading: 'Why Properties Over 25 Years Old Need Extra Scrutiny',
    content: (
      <>
        <p>
          The current edition of the Wiring Regulations is BS&nbsp;7671:2018+A4:2026. The 18th
          Edition was published in 2018 and has been amended four times — Amendment&nbsp;1:2020,
          Amendment&nbsp;2:2022, Amendment&nbsp;3:2024 and Amendment&nbsp;4:2026. Amendment&nbsp;4
          was issued on 15&nbsp;April 2026; the previous edition remains current but is withdrawn on
          15&nbsp;October 2026.
        </p>
        <p>
          Properties wired before 2000 were designed to earlier standards and will not match today's
          requirements in several respects. That is expected, and BS&nbsp;7671 says so directly: an
          existing installation that does not comply with the current edition in every respect is
          not, for that reason alone, unsafe for continued use or in need of upgrading. What follows
          are the four areas an inspector will look at hardest in an older home.
        </p>
        <PointList
          items={[
            {
              term: 'No RCD protection on socket circuits',
              detail: (
                <>
                  Required under Regulation 411.3.3 for socket-outlets rated up to 32&nbsp;A.
                  Properties wired before the 16th Edition (1991) commonly have no RCD protection at
                  all. This is one of the most common C2 observations in older properties.
                </>
              ),
            },
            {
              term: 'No supplementary bonding in bathrooms',
              detail: (
                <>
                  Regulation 701.415.2 requires supplementary protective equipotential bonding in a
                  room containing a bath or shower. It may be omitted only where all three of the
                  following are met: every final circuit in the room meets the disconnection times of
                  Regulation 411.3.2, every final circuit has additional protection by RCD to
                  Regulation 415.1.1, and all extraneous-conductive-parts in the room are effectively
                  connected to the main protective bonding. A property with no RCDs fails the second
                  condition, so the bonding has to be there.
                </>
              ),
            },
            {
              term: 'Original wiring at end of life',
              detail:
                'PVC-insulated cable has a design life of roughly 25 to 40 years, so wiring from the 1980s and early 1990s is approaching or past that range. Rubber-insulated wiring from the 1960s and earlier is well beyond its serviceable life and is a common trigger for a full rewire.',
            },
            {
              term: 'Combustible consumer unit enclosure',
              detail: (
                <>
                  Regulation 421.1.201 requires consumer units in domestic premises to comply with
                  BS&nbsp;EN&nbsp;61439-3 and either have an enclosure of non-combustible material or
                  be enclosed in one — ferrous metal such as steel being the example the standard
                  gives. This came in with BS&nbsp;7671:2008+A3:2015, so white plastic consumer units
                  predating it are widespread and are typically recorded as C3, improvement
                  recommended.
                </>
              ),
            },
          ]}
        />
        <div className={`${CARD_PADDED} my-6`}>
          <p className={`${LABEL} text-white`}>New at Amendment 4</p>
          <h3 className="mt-2 text-[17px] font-bold leading-snug text-white">
            RCD protection on domestic lighting circuits
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white">
            Amendment&nbsp;4, issued in April 2026, introduced Regulation 411.3.4: within domestic
            (household) premises, additional protection by an RCD with a rated residual operating
            current not exceeding 30&nbsp;mA shall be provided for AC final circuits supplying
            luminaires. Virtually every home wired before 2026 lacks it.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white">
            BS&nbsp;7671 is not applied retrospectively, so its absence in an existing installation
            does not automatically mean danger. An inspector assesses the installation against the
            current edition and uses professional judgement: C1 or C2 where a condition is dangerous
            or potentially dangerous, and C3 where the item is simply an improvement. Unprotected
            lighting on its own would usually sit at C3. Either way, it is a real cost to factor into
            a post-purchase upgrade plan.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-cost',
    heading: 'EICR Cost for a House Purchase (2026 Prices)',
    content: (
      <>
        <p>
          The cost of an EICR commissioned during a house purchase depends primarily on the size of
          the property — really, the number of circuits — and on your location. These are typical
          2026 prices across the UK.
        </p>
        <div className={`${CARD} my-6 overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="bg-[hsl(0_0%_13%)]">
                  <th className={TH}>Property</th>
                  <th className={TH}>Typical fee</th>
                  <th className={TH}>Time on site</th>
                  <th className={TH}>Circuits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                <tr>
                  <td className={`${TD} font-semibold`}>One-bedroom flat</td>
                  <td className={`${TD} font-semibold text-elec-yellow`}>£150 – £200</td>
                  <td className={TD}>2 – 3 hours</td>
                  <td className={TD}>3 – 5</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Two-bedroom property</td>
                  <td className={`${TD} font-semibold text-elec-yellow`}>£175 – £275</td>
                  <td className={TD}>3 – 4 hours</td>
                  <td className={TD}>5 – 8</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Three-bedroom house</td>
                  <td className={`${TD} font-semibold text-elec-yellow`}>£250 – £400</td>
                  <td className={TD}>3 – 5 hours</td>
                  <td className={TD}>8 – 12</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Four-bedroom house</td>
                  <td className={`${TD} font-semibold text-elec-yellow`}>£350 – £550</td>
                  <td className={TD}>4 – 6 hours</td>
                  <td className={TD}>10 – 16</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${SUBPANEL} p-4 sm:p-5`}>
          <p className="text-[15px] leading-relaxed text-white">
            <span className="font-semibold">London and the South East:</span> add 20 to 30 per cent
            to the figures above. Inner London sits at the top of these ranges or beyond, on higher
            labour rates, parking and congestion charges.
          </p>
        </div>
        <p>
          The EICR fee is not refundable if you withdraw from the purchase, but it is a sound
          investment. A single C2 observation can justify a price reduction many times the cost of
          the inspection.
        </p>
      </>
    ),
  },
  {
    id: 'what-eicr-reveals',
    heading: 'What an EICR Reveals About a Property',
    content: (
      <>
        <p>
          An EICR is a comprehensive assessment of the fixed electrical installation. Regulation
          651.2 of BS 7671 sets what a periodic inspection is for: the safety of people against
          electric shock and burns, protection against fire and heat from an installation defect,
          confirmation that protective devices are correctly rated and set, confirmation that the
          installation is not damaged or deteriorated so as to impair safety, and the identification
          of defects and non-compliances that may give rise to danger. In practice the inspector
          carries out a visual inspection supported by tests.
        </p>
        <PointList
          items={[
            {
              term: 'Consumer unit and protective devices',
              detail:
                'Condition, age, type of protection (MCBs, RCDs, RCBOs) and compliance with current standards.',
            },
            {
              term: 'Earthing and bonding',
              detail: (
                <>
                  Main earthing terminal, and main protective bonding to gas, water and other
                  incoming metallic services. Regulation 544.1.2 requires that connection to be made
                  as near as practicable to the point of entry of the service into the premises, and
                  within 600&nbsp;mm of the meter outlet union where that is practicable — a
                  frequently missed detail in older homes.
                </>
              ),
            },
            {
              term: 'Circuit testing',
              detail:
                'Continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance (Ze and Zs), prospective fault current and RCD operation. These tests reveal the condition of hidden wiring that cannot be assessed by eye.',
            },
            {
              term: 'Arc fault detection devices',
              detail: (
                <>
                  Regulation 421.1.7 was redrafted at Amendment&nbsp;4. AFDDs conforming to
                  BS&nbsp;EN&nbsp;62606 are now <strong>required</strong> on single-phase AC final
                  circuits supplying socket-outlets rated up to 32&nbsp;A in high rise residential
                  buildings, houses in multiple occupation, purpose-built student accommodation and
                  care homes. For all other premises — an ordinary house or flat included — their use
                  is <strong>recommended</strong>, not required. Their absence in a standard domestic
                  property is therefore a C3 matter at most, but retrofitting them alongside a
                  consumer unit replacement is a real cost worth knowing about.
                </>
              ),
            },
            {
              term: 'Sockets, switches and accessories',
              detail:
                'Condition and compliance, including accessory positions in rooms containing a bath or shower, where BS 7671 Part 7 places zone restrictions.',
            },
            {
              term: 'Special locations',
              detail:
                'Bathrooms, garages, outbuildings and garden installations each carry specific requirements under BS 7671 Part 7 that the inspector will check.',
            },
          ]}
        />
        <div className={`${SUBPANEL} p-4 sm:p-5`}>
          <p className="text-[15px] leading-relaxed text-white">
            <span className="font-semibold">The supply intake is looked at, not tested.</span> The
            model schedule of inspections in BS 7671 lists the service cable, service head, earthing
            arrangements, supplier's meter tails and metering equipment under external condition of
            intake equipment — visual inspection only. Those items belong to the distributor and the
            energy supplier, not to you, so an inspector who finds a problem there reports it to the
            person who ordered the work rather than fixing it.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'c1-c2-explained',
    heading: 'C1 and C2 Observations — What They Mean for Your Purchase',
    content: (
      <>
        <p>
          Observations are classified using the codes explained in Table 3.5 of IET Guidance Note 3.
          Only two of the four codes change the outcome of the report.
        </p>
        <div className={`${CARD} my-6 overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="bg-[hsl(0_0%_13%)]">
                  <th className={TH}>Code</th>
                  <th className={TH}>Meaning</th>
                  <th className={TH}>Action</th>
                  <th className={TH}>Effect on the report</th>
                </tr>
              </thead>
              {/* The code colours stay: they carry the severity meaning an
                  inspector already reads, so this is semantic, not decor. */}
              <tbody className="divide-y divide-white/[0.08]">
                <tr>
                  <td className={`${TD} font-bold text-red-400`}>C1</td>
                  <td className={TD}>Danger present. Risk of injury</td>
                  <td className={TD}>Immediate remedial action</td>
                  <td className={`${TD} font-semibold text-red-400`}>Unsatisfactory</td>
                </tr>
                <tr>
                  <td className={`${TD} font-bold text-orange-400`}>C2</td>
                  <td className={TD}>Potentially dangerous</td>
                  <td className={TD}>Urgent remedial action</td>
                  <td className={`${TD} font-semibold text-orange-400`}>Unsatisfactory</td>
                </tr>
                <tr>
                  <td className={`${TD} font-bold text-white`}>C3</td>
                  <td className={TD}>Improvement recommended</td>
                  <td className={TD}>Advisory</td>
                  <td className={TD}>No effect on the assessment</td>
                </tr>
                <tr>
                  <td className={`${TD} font-bold text-white`}>FI</td>
                  <td className={TD}>Further investigation required</td>
                  <td className={TD}>Advisory — resolve before exchange</td>
                  <td className={TD}>No effect on the assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Under the model Electrical Installation Condition Report in BS 7671:2018+A4:2026, the
          overall assessment is reported as Unsatisfactory where any observation is given a C1 or C2
          classification. C3 and FI observations are advisory and do not affect the overall
          assessment — though the report itself says they should be given due consideration.
        </p>
        <PointList
          items={[
            {
              term: 'C1 — Danger present',
              detail:
                'There is an immediate risk of injury and immediate remedial action is necessary. Wherever practicable the inspector will make the item safe on discovery; where that is not possible you should receive written notification as a matter of urgency. Typical examples are an exposed live conductor, a broken accessory with live parts accessible, or a cable with damaged insulation. A C1 is the most serious outcome available and is strong grounds for significant renegotiation or withdrawal.',
            },
            {
              term: 'C2 — Potentially dangerous',
              detail:
                'Not immediately dangerous, but it could become so, and urgent remedial action is necessary. This is the code you will see most often in older properties — no RCD protection on socket circuits, inadequate main bonding, deteriorated insulation that has not yet failed.',
            },
            {
              term: 'C3 — Improvement recommended',
              detail:
                'Non-compliant but not dangerous, in the inspector’s judgement. A pre-2016 plastic consumer unit enclosure is the classic example. Useful for planning upgrades; weak as negotiating leverage.',
            },
            {
              term: 'FI — Further investigation required',
              detail:
                'The inspection identified something the inspector could not verify within the agreed extent and limitations — restricted access, or a borderline test result. It is recorded as advisory, but for a buyer it is an open question about a property you are about to own. Ask for it to be closed out before exchange.',
            },
          ]}
        />
        <p>
          An Unsatisfactory EICR does not mean the property is uninhabitable. It means there is
          documented, quotable evidence of work that needs doing.
        </p>
      </>
    ),
  },
  {
    id: 'negotiating-on-results',
    heading: 'Negotiating on EICR Results',
    content: (
      <>
        <p>
          An Unsatisfactory EICR is one of the clearest grounds for renegotiating a property
          purchase. Electrical remedial work is quantifiable and quotable — unlike damp or structural
          issues, where costs are harder to pin down, an electrician can give a firm quote for the
          work the EICR identifies.
        </p>
        <PointList
          items={[
            {
              term: 'Get written quotes before you negotiate',
              detail:
                "Obtain two or three written quotes for the remedial work from registered electricians and present them to the vendor's solicitor as evidence. A quote is far more persuasive than a verbal estimate.",
            },
            {
              term: 'A price reduction usually beats vendor-managed works',
              detail:
                'Asking the vendor to arrange and pay for the work before completion risks a rushed job by the cheapest available contractor. A reduction at the mid-point of your quotes leaves you in control of who does the work and to what standard.',
            },
            {
              term: 'Factor in disruption, not just the electrician',
              detail:
                "A rewire is not only the electrician's fee. Redecoration, replastering, temporary accommodation and the practical disruption of living through it all add cost. Put those in the number you take to the vendor.",
            },
            {
              term: "Consider a solicitor's retention",
              detail:
                'For significant works, your solicitor can arrange a contractual retention — part of the purchase price held back until the work is completed and certified. Useful where the vendor agrees to do the work but you want assurance it actually happens.',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'satisfactory-eicr',
    heading: 'What a Satisfactory EICR Means',
    content: (
      <>
        <p>
          A Satisfactory EICR is the result you are hoping for. It means the inspector recorded no C1
          and no C2 observations. There may still be C3 or FI entries — these are advisory and do not
          change the assessment, but they are worth reading rather than filing.
        </p>
        <p>
          Satisfactory does not mean perfect, and it does not mean the installation will never need
          attention. It means that at the time of inspection the installation was found to be in a
          satisfactory condition for continued service.
        </p>
        <PointList
          items={[
            {
              term: 'Keep the report',
              detail:
                'A Satisfactory EICR documents the condition of the installation at the time of purchase. It will be useful when you come to sell, let the property, or make an insurance claim, and the next inspector will work from it.',
            },
            {
              term: 'Note the next inspection date',
              detail: (
                <>
                  Regulation 653.4 requires the report to state a recommended interval until the next
                  inspection, supported by an explanation for that recommendation. Under Regulation
                  652.1 the interval is set having regard to the type of installation and equipment,
                  its use and operation, the frequency and quality of maintenance, the external
                  influences it is subject to, and the results and recommendations of previous
                  reports — so it is a judgement about your property, not a fixed number. Diarise the
                  date on your report.
                </>
              ),
            },
            {
              term: 'Review the C3 observations',
              detail:
                'C3 findings do not make a report Unsatisfactory, but they identify where the installation would benefit from improvement. Review them with your electrician and plan the upgrades as budget allows.',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician for a House Purchase EICR',
    content: (
      <>
        <p>
          Regulation 651.5 of BS 7671 requires periodic inspection and testing to be carried out by
          one or more skilled persons competent in such work, and Regulation 653.5 requires the
          report to be compiled and signed by them. For a house purchase EICR to be worth
          commissioning, that person also needs to be independent of the sale. Here is what to look
          for.
        </p>
        <PointList
          items={[
            {
              term: 'Registered with a competent person scheme',
              detail:
                'NICEIC, NAPIT and the other government-approved schemes assess their registrants and require minimum qualifications and insurance. Check the registration number on the scheme’s own online register before booking — not on the contractor’s website.',
            },
            {
              term: 'Qualified in inspection and testing specifically',
              detail:
                'The inspector should hold a qualification in inspection and testing, not only in installation work. The City & Guilds 2391 series (inspection and testing of electrical installations) is the standard route.',
            },
            {
              term: 'Independent of anyone who has worked on the property',
              detail:
                'Use a different electrician from the one who carried out any recent work at the property. An independent inspector has no interest in concealing an earlier defect.',
            },
            {
              term: 'Able to turn the report around fast',
              detail:
                'House purchases move quickly. Confirm before booking how soon the inspector can attend and issue the written report. A report emailed the same day as the inspection is what you want.',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your House Purchase EICR Business',
    content: (
      <>
        <p>
          House purchase EICRs are high-volume, repeatable work with a predictable fee structure.
          Buyers are commissioning them more as awareness grows, and a referral network with mortgage
          brokers, conveyancers and estate agents can generate a steady flow of bookings.
        </p>
        <div className={`${CARD_PADDED} my-6`}>
          <h4 className="text-[15px] font-bold text-white">Deliver the report before you leave</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            Use the <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate EICR app</SEOInternalLink>{' '}
            to complete the full report on your phone during the inspection and send the PDF to the
            buyer before you drive away. Speed is a genuine competitive advantage here — the buyer
            cannot progress the transaction until the report lands.
          </p>
          <div className="mt-5 border-t border-white/[0.08] pt-5">
            <h4 className="text-[15px] font-bold text-white">Quote the remedial work on the day</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              Where C1 or C2 findings come up, quote the remedial work immediately using the{' '}
              <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink>. Buyers
              need a number fast to negotiate with the vendor, and the electrician who supplies it on
              the day of the EICR usually wins the work.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Complete house purchase EICRs faster with Elec-Mate"
          description="Join 1,600+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSurveyBeforeBuyingPage() {
  return (
    <GuideTemplate
      title="Electrical Survey When Buying a House UK: EICR"
      description="Do you need an EICR when buying a house? Not legally required but strongly recommended for properties over 25 years old."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Buyer's Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Electrical Survey When Buying a House:{' '}
          <span className="text-yellow-400">EICR for House Purchase UK</span>
        </>
      }
      heroSubtitle="An EICR is not legally required when buying a house — but for any property over 25 years old, it is one of the most valuable pieces of due diligence you can commission. This guide explains what an EICR costs, what it reveals, how to interpret C1 and C2 observations, and how to use the findings to negotiate."
      answerBox={{
        question: 'What is a homebuyer’s electrical report?',
        answer:
          'It is an Electrical Installation Condition Report (EICR) commissioned by a buyer before exchange of contracts. A qualified electrician inspects and tests the fixed wiring, consumer unit, earthing and bonding, then reports the condition as Satisfactory or Unsatisfactory. It typically costs £150 to £400 and takes 2 to 6 hours on site.',
        detail:
          'It is not legally required and a standard homebuyer’s survey does not include it. The overall assessment comes back Unsatisfactory if any C1 (danger present) or C2 (potentially dangerous) observation is recorded — either of which is quotable, and therefore negotiable.',
      }}
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Surveys When Buying a House"
      relatedPages={relatedPages}
      ctaHeading="Deliver House Purchase EICRs Before You Leave the Property"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning and instant PDF export. Speed wins house purchase work. 7-day free trial, cancel anytime."
    />
  );
}
