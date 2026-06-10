import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { Cable, Zap, Calculator, ClipboardCheck, BookOpen, Network } from 'lucide-react';

// -------------------------------------------------------------------
// Grounding
// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 50173 (Generic cabling), BS EN 50174 (Cable installation practice),
// IEEE 802.3bt (PoE Type 3 & 4) and TIA TSB-184-A (TIA guidelines for
// supporting PoE over balanced twisted-pair cabling).
// Verified BS 7671 references: Reg 422.2.1 (redrafted in A4:2026, CPR
// reaction-to-fire, Appendix 2 Item 17); Section 414 (SELV/PELV, Band I
// upper limit 50 V AC / 120 V ripple-free DC); Section 528 (Band I/II
// proximity); Reg 542.2.8 (introduced in A4:2026, earth electrodes);
// Reg 523.1 (current-carrying capacity, grouping); Section 715 (ELV
// lighting installations).
// -------------------------------------------------------------------

const published = '2026-05-17';
const modified = '2026-06-10';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Cat6 vs Cat6a Current Rating (PoE)', href: '/guides/cat6-cat6a-current-rating-poe' },
];

const tocItems = [
  { id: 'why-cable-current-rating-matters-for-poe', label: 'Why current rating matters' },
  { id: 'conductor-area-by-cable-category', label: 'Conductor area by category' },
  { id: 'current-per-pair-by-poe-type', label: 'Current per PoE type' },
  { id: 'bundle-derating-curve', label: 'Bundle de-rating curve' },
  { id: 'ambient-temperature-impact', label: 'Ambient temperature' },
  { id: 'heat-in-enclosed-pathways', label: 'Heat in enclosed pathways' },
  { id: 'lszh-vs-pvc-jacket', label: 'LSZH vs PVC jacket' },
  { id: 'pull-tension-limits', label: 'Pull-tension limits' },
  { id: 'recommended-max-bundle-size', label: 'Max bundle size table' },
  { id: 'tia-tsb-184a-bundle-recommendations', label: 'TIA TSB-184-A detail' },
  { id: 'routing-best-practice', label: 'Routing best practice' },
  { id: 'bs-7671-and-a4-2026-considerations', label: 'BS 7671 considerations' },
  { id: 'design-checklist', label: 'Design checklist' },
  { id: 'elec-mate-tools', label: 'In-app tools' },
  { id: 'how-to', label: 'How to size a PoE bundle' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related pages' },
];

// -------------------------------------------------------------------
// Reusable table primitive — matches the colour-codes reference page
// design system (rounded-2xl card, tinted header row, divided body).
// -------------------------------------------------------------------
function DataTable({
  title,
  headers,
  rows,
}: {
  title?: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-6 overflow-x-auto">
      {title && <h3 className="font-bold text-white text-lg mb-4">{title}</h3>}
      <table className="w-full text-sm border-collapse min-w-[34rem]">
        <thead>
          <tr className="bg-yellow-500/10">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-bold text-yellow-300 px-3 py-2.5 border-b border-white/10 align-bottom"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 last:border-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2.5 align-top text-white ${
                    ci === 0 ? 'font-semibold' : 'text-white/90'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({
  tone,
  title,
  children,
}: {
  tone: 'info' | 'warning' | 'success' | 'pricing';
  title: string;
  children: React.ReactNode;
}) {
  const map = {
    info: { box: 'bg-blue-500/10 border-blue-500/20', title: 'text-blue-300' },
    warning: { box: 'bg-red-500/10 border-red-500/20', title: 'text-red-300' },
    success: { box: 'bg-emerald-500/10 border-emerald-500/20', title: 'text-emerald-300' },
    pricing: { box: 'bg-yellow-500/10 border-yellow-500/20', title: 'text-yellow-300' },
  } as const;
  const styles = map[tone];
  return (
    <div className={`rounded-2xl border p-5 my-4 ${styles.box}`}>
      <h4 className={`font-bold mb-2 ${styles.title}`}>{title}</h4>
      <p className="text-white leading-relaxed text-sm sm:text-base">{children}</p>
    </div>
  );
}

const sections = [
  {
    id: 'why-cable-current-rating-matters-for-poe',
    heading: 'Why Cable Current Rating Suddenly Matters for PoE',
    content: (
      <>
        <p>
          For most of the history of Ethernet, installers only worried about signal performance —
          return loss, NEXT, insertion loss, and the 100 m channel limit. Current was negligible.
        </p>
        <p>
          PoE changed that. Each generation of the IEEE 802.3 standard raised the per-port power
          ceiling, and IEEE 802.3bt (ratified 2018) spread the load across all four pairs. The
          progression is what turned data cabling into a thermal design problem:
        </p>
        <DataTable
          title="Per-port power by PoE generation"
          headers={['IEEE standard', 'Common name', 'Power at PSE', 'Pairs used']}
          rows={[
            ['802.3af (Type 1)', 'PoE', '15.4 W', '2 pairs'],
            ['802.3at (Type 2)', 'PoE+', '30 W', '2 pairs'],
            ['802.3bt (Type 3)', 'PoE++ / 4PPoE', '60 W', '4 pairs'],
            ['802.3bt (Type 4)', 'PoE++ / 4PPoE', '90 W', '4 pairs'],
          ]}
        />
        <p>
          At Type 4 with a PD voltage near 50 V, total cable current is roughly 1.8 A, giving 0.45
          to 0.6 A per conductor. On a single isolated cable, 0.6 A is unremarkable. But PoE cables
          are bundled — 24, 48, sometimes 96 cables packed together for tens of metres through
          ceiling voids, risers and conduit. The problem is bundle heat dissipation with nowhere to
          escape.
        </p>
        <Callout tone="info" title="PoE is now a continuous current load">
          Cameras, access control panels, LED lighting and digital signage all run effectively
          24/7. The "continuous current" assumption that drives BS 7671 derating for mains circuits
          applies to PoE in everything but name. See our{' '}
          <SEOInternalLink href="/guides/poe-plus-plus-type-4-90w-installation">
            PoE++ Type 4 90 W installation guide
          </SEOInternalLink>{' '}
          for wider Type 4 design context.
        </Callout>
      </>
    ),
  },
  {
    id: 'conductor-area-by-cable-category',
    heading: 'Conductor Cross-Sectional Area by Cable Category',
    content: (
      <>
        <p>
          Category determines conductor gauge, which determines DC loop resistance — the biggest
          single factor in PoE heat. More copper, lower I²R loss per metre, cooler bundle.
        </p>
        <DataTable
          title="Conductor gauge and DC loop resistance by category"
          headers={['Category', 'Conductor (AWG)', 'Area (mm²)', 'DC loop resistance per 100 m', 'Copper vs Cat5e']}
          rows={[
            ['Cat5e', '24 AWG solid', '0.205', '~9.4 Ω/pair', 'baseline'],
            ['Cat6', '23 AWG solid', '0.258', '~7.4 Ω/pair', '~26% more'],
            ['Cat6a UTP / F/UTP', '23 AWG / 22 AWG solid', '0.258 – 0.326', '~6.6 – 5.8 Ω/pair', 'up to ~60% more'],
            ['Cat7 / Cat7a / Cat8', '22 AWG S/FTP', '~0.326', 'lowest of any category', 'up to ~60% more'],
          ]}
        />
        <p>
          In a 48-cable bundle running Type 4, the gap between Cat5e and Cat6a is roughly 10 °C vs
          5 °C rise — which decides whether the install passes or fails. The lower DC resistance of
          the larger conductor is doing the work.
        </p>
        <Callout tone="warning" title="Stranded patch cable is not solid-core horizontal cable">
          Stranded cable used for patch leads has measurably higher DC resistance than solid-core
          for the same nominal AWG. Permanent horizontal runs must be solid-core. Using stranded
          patch as fixed cabling is a common cause of PoE under-voltage at the PD and excess heat in
          the bundle.
        </Callout>
      </>
    ),
  },
  {
    id: 'current-per-pair-by-poe-type',
    heading: 'Maximum Current per Pair by PoE Type',
    content: (
      <>
        <p>
          IEEE 802.3 specifies maximum power at the PSE, minimum power at the PD, and a voltage
          band. Current per conductor falls out of those once you fix PD voltage and cable
          resistance.
        </p>
        <DataTable
          title="Current and heat by PoE type"
          headers={['PoE type', 'PSE power', 'PD power', 'Pairs', 'Current per conductor']}
          rows={[
            ['802.3af (Type 1)', '15.4 W', '12.95 W', '2', '~175 mA — heat negligible'],
            ['802.3at (Type 2)', '30 W', '25.5 W', '2', '~360 mA'],
            ['802.3bt (Type 3)', '60 W', '51 W', '4', '~300 mA'],
            ['802.3bt (Type 4)', '90 W', '71.3 W min', '4', '450 – 600 mA — design case'],
          ]}
        />
        <p>
          The key number is I²R loss per metre. For Cat6 at 600 mA per conductor that is around 0.27
          W per metre across all four conductors. Multiply by a 24-cable bundle and you have 6 to 7
          W per metre dissipating into the bundle — with nowhere to go if the pathway is enclosed.
        </p>
      </>
    ),
  },
  {
    id: 'bundle-derating-curve',
    heading: 'The Bundle De-rating Curve — TIA TSB-184-A',
    content: (
      <>
        <p>
          TIA TSB-184-A is the industry design reference for PoE bundle sizing. BS EN 50174-1
          references the same body of work via informative annexes. Headline temperature-rise
          figures in free air at 20 °C lab ambient:
        </p>
        <DataTable
          title="Bundle temperature rise above ambient (free air, 20 °C)"
          headers={['Bundle', 'Cable', 'PoE type', 'Approx. centre rise']}
          rows={[
            ['1 – 6 cables', 'any', 'up to Type 4', '< 1 °C'],
            ['12 cables', 'Cat6 UTP', 'Type 4', '~3 °C'],
            ['24 cables', 'Cat6 UTP', 'Type 4', '~5 °C — reference design point'],
            ['48 cables', 'Cat6 UTP', 'Type 4', '~8 – 10 °C'],
            ['100 cables', 'Cat5e UTP', 'Type 4', '~15 °C — upper bound'],
            ['100 cables', 'Cat6a UTP', 'Type 4', '~8 – 10 °C'],
          ]}
        />
        <Callout tone="info" title="The TIA numbers assume 20 °C ambient — yours may not">
          TSB-184-A measurements are conducted at lab ambient. In a UK summer ceiling void above an
          open-plan office, ambient can sit at 35 to 40 °C continuously; in an unventilated
          south-facing riser, 45 to 50 °C is not unusual. The bundle rise stacks on top of whatever
          ambient your building actually delivers.
        </Callout>
        <p>
          This bundle de-rating discipline maps directly onto the BS 7671 cable-grouping framework
          electricians already apply to mains cabling. BS 7671 Reg 523.1 requires that conductor
          current-carrying capacity be assessed taking grouping, ambient temperature and
          installation method into account — exactly the same variables that drive TSB-184-A bundle
          sizing. If you already think in terms of BS 7671 correction factors (Ca for ambient, Cg
          for grouping), PoE bundle de-rating is the same discipline applied to 50 V DC. See our{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors guide
          </SEOInternalLink>{' '}
          for the mains-cabling parallel.
        </p>
      </>
    ),
  },
  {
    id: 'ambient-temperature-impact',
    heading: 'Ambient Temperature Impact — 40 °C to 60 °C',
    content: (
      <>
        <p>
          Most Category cable is rated for continuous operation up to 60 °C conductor temperature.
          Above that the dielectric drifts (degrading signal performance) and the jacket begins
          long-term creep. The rule: ambient plus bundle rise must stay below 60 °C with margin.
        </p>
        <DataTable
          title="Operating temperature = ambient + bundle rise"
          headers={['Pathway ambient', 'Bundle rise', 'Operating temp', 'Verdict']}
          rows={[
            ['25 °C', '+5 °C (24 Cat6, Type 4)', '30 °C', 'Plenty of headroom — target design point'],
            ['35 °C', '+5 °C', '40 °C', 'Still safe'],
            ['40 °C', '+10 °C (48 Cat6, Type 4)', '50 °C', 'Within rating; specify Cat6a to cut the rise'],
            ['50 °C', '+10 °C', '60 °C', 'At the limit — not recommended for new design'],
            ['60 °C', 'meaningful rise', '> 60 °C', 'Beyond rating — limit current, split bundles, reroute'],
          ]}
        />
        <p>
          For how ambient correction integrates with the wider BS 7671 derating framework for
          parallel mains cabling, see our{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'heat-in-enclosed-pathways',
    heading: 'Total Cable Bundle Heat in Enclosed Pathways',
    content: (
      <>
        <p>
          A horizontal bundle on an open mesh basket above a suspended ceiling behaves very
          differently from the same bundle in a riser conduit or sealed firestop. The difference is
          whether convective airflow can carry heat away.
        </p>
        <DataTable
          title="How the pathway changes the bundle rise"
          headers={['Pathway', 'Effect on TSB-184-A figure']}
          rows={[
            ['Open ladder rack / open basket tray', 'Free convection all sides — figures apply directly'],
            ['Closed cable tray with lid', 'Modest restriction — add ~1.5 to 2 °C'],
            ['Round PVC conduit, < 40% filled', 'Moderate restriction — add 3 to 5 °C'],
            ['Round PVC conduit, ≥ 60% packed', 'Rise can more than double (5 °C → 12 – 15 °C)'],
            ['Unventilated riser shaft', 'Worst case — hot air accumulates at the top'],
          ]}
        />
        <p>
          Bundles in unventilated risers running Type 4 PoE over 50 m have been measured above 70 °C
          in industry case studies — well past the 60 °C rated operating temperature.
        </p>
        <Callout tone="warning" title="Firestop sleeves trap heat">
          Intumescent firestop sleeves at fire compartment boundaries are airtight by design and
          concentrate heat at the crossing point. Where possible, split bundles into multiple
          smaller sleeves with thermal breaks between them rather than routing the entire bundle
          through a single sealed sleeve.
        </Callout>
      </>
    ),
  },
  {
    id: 'lszh-vs-pvc-jacket',
    heading: 'LSZH vs PVC Jacket — Thermal and Fire Performance',
    content: (
      <>
        <p>
          Jacket choice has a fire-safety dimension (mandated by BS 7671:2018+A4:2026, Approved
          Document B and BS 6701) and a thermal dimension (driven by PoE bundle heat). The two are
          not always aligned.
        </p>
        <DataTable
          title="PVC vs LSZH jacket"
          headers={['Property', 'PVC', 'LSZH']}
          rows={[
            ['CPR / EN 13501-6 class (typical)', 'Cca / Dca', 'B2ca / Cca'],
            ['Continuous operating temp', '60 – 75 °C', '60 – 70 °C'],
            ['Cost', 'Cheaper', 'More expensive'],
            ['Smoke & gas on burning', 'Dense black smoke, HCl gas', 'Low smoke, no halogen gases'],
            ['Escape routes / risers', 'Not permitted (Approved Doc B)', 'Required'],
          ]}
        />
        <Callout tone="info" title="LSZH gives no extra PoE thermal headroom">
          PVC and LSZH are equivalent for PoE current-carrying purposes inside the 60 °C operating
          window. LSZH's advantage is fire and smoke behaviour during combustion — not heat
          tolerance under PoE load. The jacket choice is driven by CPR reaction-to-fire
          classification, not PoE heat.
        </Callout>
        <p>
          For the wider rules on installing data cabling — including jacket selection by building
          type, routing and segregation — see our{' '}
          <SEOInternalLink href="/guides/bs-en-50174-data-cable-installation">
            BS EN 50174 data cable installation guide
          </SEOInternalLink>
          . For the underlying generic cabling standard that defines what Cat6 and Cat6a actually
          mean, see our{' '}
          <SEOInternalLink href="/guides/structured-cabling-bs-en-50173-electricians">
            structured cabling BS EN 50173 guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'pull-tension-limits',
    heading: 'Pull-Tension Limits During Installation',
    content: (
      <>
        <p>
          Installation damage is the silent killer of PoE bundles. A cable pulled too hard passes
          signal certification but fails thermally months later under Type 4 load — the pull
          stretched the conductors, adding 10 to 20 per cent to DC loop resistance, which becomes
          extra I²R heat.
        </p>
        <DataTable
          title="Pull tension and bend radius limits"
          headers={['Cable type', 'Max pull tension', 'Bend radius']}
          rows={[
            ['Cat6 UTP, 4-pair', '110 N (~11.3 kgf)', '4× OD installing, 1× OD at rest'],
            ['Cat6a UTP, 4-pair', '110 N (same limit)', '8× OD installing, 1× OD at rest'],
            ['Cat6a F/UTP, Cat7/Cat7a S/FTP', '~130 – 150 N (per manufacturer)', 'Per manufacturer'],
          ]}
        />
        <p>
          The 110 N figure is the universal industry value, set in BS EN 50174-2. For Cat6a UTP the
          constraint is the dielectric and jacket, not the copper — which is why the larger
          conductor does not raise the tension limit.
        </p>
        <Callout tone="warning" title="Use a tension-measuring puller for long runs">
          Hand-pulling Cat6/Cat6a through long conduit runs almost always exceeds 110 N — a
          determined two-person pull on a stuck cable can exceed 200 N. Use a winch puller with a
          calibrated tension limiter, or pull in shorter stages with intermediate access points.
          Over-pull damage is invisible from outside the jacket.
        </Callout>
      </>
    ),
  },
  {
    id: 'recommended-max-bundle-size',
    heading: 'Recommended Maximum Bundle Size by Category and PoE Type',
    content: (
      <>
        <p>
          Combining conductor area, current per pair, ambient, pathway type and the TSB-184-A curve,
          the practical design recommendations for UK installations:
        </p>
        <DataTable
          title="Practical maximum bundle size (25 – 30 °C pathway ambient)"
          headers={['Cable', 'PoE type', 'Free air', 'In conduit']}
          rows={[
            ['Cat5e UTP', 'Type 1 / 2', 'No practical limit (≤ 100)', 'No practical limit'],
            ['Cat5e UTP', 'Type 3', '48 — not recommended for new', '24'],
            ['Cat5e UTP', 'Type 4', 'Not recommended — use Cat6 min.', '—'],
            ['Cat6 UTP', 'Type 3', '96', '48'],
            ['Cat6 UTP', 'Type 4', '48 — standard office design point', '24'],
            ['Cat6a UTP / F/UTP', 'Type 3', 'No practical limit (≤ 100)', '96'],
            ['Cat6a UTP / F/UTP', 'Type 4', '96', '48'],
          ]}
        />
        <Callout tone="warning" title="Reduce these figures for hot pathways">
          The table assumes 25 to 30 °C pathway ambient and continuous current at design maximum.
          For higher ambient — plant rooms, south-facing risers, unventilated voids over IT rooms —
          reduce bundle sizes by 25 to 50 per cent.
        </Callout>
      </>
    ),
  },
  {
    id: 'tia-tsb-184a-bundle-recommendations',
    heading: 'TIA TSB-184-A Bundle Recommendations',
    content: (
      <>
        <p>
          TIA TSB-184-A "Guidelines for Supporting Power Delivery Over Balanced Twisted-Pair
          Cabling" is advisory under UK law but universally followed and underpins manufacturer PoE
          warranties.
        </p>
        <DataTable
          headers={['#', 'Recommendation']}
          rows={[
            ['1', 'For any IEEE 802.3bt Type 3 or Type 4 install, specify Category 6 minimum, Category 6a strongly preferred for new builds.'],
            ['2', 'Limit bundles to 24 cables in free air for the worst case (Cat6 UTP, Type 4, 60 °C operating environment).'],
            ['3', 'Where high bundle counts are unavoidable, use Cat6a or higher, increase cable spacing (open ladder rack) and ventilate the pathway.'],
            ['4', 'Calculate temperature rise from manufacturer-published per-cable dissipation figures, not generic rules of thumb.'],
            ['5', 'For cables in conduit, derate bundle size by 50 per cent relative to the free-air figure; derate further for sealed sleeves.'],
          ]}
        />
        <Callout tone="info" title="BS EN 50174-2:2018 informative annex">
          BS EN 50174-2:2018 includes an informative annex on PoE thermal considerations that
          mirrors the TSB-184-A approach. The annex is informative (not normative), but UK
          specifiers including NHS Estates, MoD and large commercial new-build reference BS EN
          50174-2 explicitly in cabling specifications.
        </Callout>
      </>
    ),
  },
  {
    id: 'routing-best-practice',
    heading: 'Routing Best Practice — Open Ladder vs Enclosed Conduit',
    content: (
      <>
        <p>
          For BS 7671 mains cabling, conduit is often the gold standard. For PoE-heavy data cabling
          it is frequently the worst choice — PoE bundles need airflow to manage I²R heat, and
          conduit removes it.
        </p>
        <DataTable
          title="Routing methods ranked for PoE-heavy bundles"
          headers={['Routing method', 'Suitability for high-density PoE']}
          rows={[
            ['Open ladder rack', 'Preferred — airflow on all four sides; largest bundles, highest PoE types'],
            ['Wire mesh basket', 'Almost as good — airflow on three sides, mesh acts as a heat sink'],
            ['Closed cable tray with lid', 'Medium density — apply free-air figures + 1 to 2 °C'],
            ['PVC conduit, well-spaced', 'Low/medium density — derate bundle to 50% of free air'],
            ['PVC conduit, densely packed', 'Avoid for Type 3 / Type 4 — no thermal escape route'],
            ['Plenum spaces', 'Airflow helps, but many jurisdictions require LSZH / plenum-rated jacket'],
            ['Risers', 'Must be vented top and bottom for any high-density PoE'],
          ]}
        />
        <p>
          A sealed riser with 48 cables of Type 4 will accumulate heat at the top, with cables there
          10 to 15 °C hotter than at the bottom. BS 7671 Section 528 separation between Band I (data,
          ELV) and Band II (mains) for EMC reasons incidentally also helps PoE thermally — the
          bundle is not in contact with warm mains cables.
        </p>
      </>
    ),
  },
  {
    id: 'bs-7671-and-a4-2026-considerations',
    heading: 'BS 7671:2018+A4:2026 Considerations',
    content: (
      <>
        <p>
          BS 7671:2018+A4:2026 governs the mains supply side of any PoE installation — the circuits
          feeding the switches, distribution-board protection, and bonding of network equipment. The
          PoE cabling itself (Cat6/Cat6a at 50 to 57 V DC) is SELV: it sits within voltage Band I,
          whose upper limit is 50 V AC or 120 V ripple-free DC.
        </p>
        <DataTable
          title="Which parts of BS 7671 apply to a PoE installation"
          headers={['Reference', 'What it covers for PoE']}
          rows={[
            [
              'Section 414',
              'Protection by SELV and PELV. PoE at 50 to 57 V DC qualifies as SELV when the source is isolated from earth and within the Band I limit.',
            ],
            [
              'Reg 422.2.1 (redrafted in A4:2026)',
              'Cables in protected escape routes, risers and protected zones. Cables must satisfy the CPR in respect of reaction to fire — see Appendix 2, Item 17. LSZH at the appropriate CPR class is the usual compliance route.',
            ],
            [
              'Section 528',
              'Proximity to other services — maintain segregation between Band I (data/ELV) and Band II (mains) to satisfy both BS 7671 and BS EN 50174-2 EMC requirements.',
            ],
            [
              'Section 542 (incl. Reg 542.2.8, new in A4:2026)',
              'Earthing arrangements. Network cabinets and PoE switch chassis bonded to the main earthing terminal; functional earth for shielded Cat6a (F/UTP, S/FTP). Reg 542.2.8 introduces requirements on earth electrodes.',
            ],
            [
              'Section 715',
              'Extra-low voltage lighting installations — applies to PoE-driven lighting. See the linked Section 715 guide below.',
            ],
          ]}
        />
        <p>
          For the Section 715 detail relevant to PoE-driven LED lighting, see our{' '}
          <SEOInternalLink href="/guides/section-715-elv-lighting-a4-2026">
            Section 715 ELV lighting (A4:2026) guide
          </SEOInternalLink>
          .
        </p>
        <Callout tone="pricing" title="EICR and EIC implications">
          For BS 7671 inspection and testing, PoE switches are fixed equipment. The supply circuit
          is tested in the normal way — IR, polarity, Zs, RCD operation. The PoE cabling itself is
          not a BS 7671 circuit and is not tested on the{' '}
          <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> or EICR — but
          manufacturers require a structured-cabling certification test (Fluke DSX or equivalent)
          for warranty validity.
        </Callout>
      </>
    ),
  },
  {
    id: 'design-checklist',
    heading: 'Design Checklist for a Compliant PoE Installation',
    content: (
      <>
        <p>A practical checklist for the design stage of a PoE-heavy commercial project:</p>
        <ol className="space-y-3 my-4 pl-6 list-decimal text-white">
          <li>
            Identify the PoE type per device. Do not assume Type 4 — most cameras and access control
            panels are Type 2 or 3.
          </li>
          <li>
            Calculate total simultaneous current draw on the PoE switch — drives mains supply sizing
            and switch power budget.
          </li>
          <li>Specify the cable category — Cat6 minimum for Type 3 or 4; Cat6a preferred for high-density.</li>
          <li>
            Map the cable routes — ceiling voids, risers, conduits, firestops, plenum. Note ambient
            in each pathway.
          </li>
          <li>Size the bundles — apply TSB-184-A figures, derated for pathway type and ambient.</li>
          <li>
            Specify the jacket compound — LSZH for escape routes, risers and protected zones (Reg
            422.2.1 and Approved Document B).
          </li>
          <li>Plan firestops — split bundles across multiple sleeves where layout allows.</li>
          <li>
            Specify the mains supply to each PoE switch — sized and protected per BS 7671, RCD where
            required, labelled.
          </li>
          <li>
            Specify the structured cabling certification — Fluke DSX or equivalent, with PoE thermal
            report in handover.
          </li>
          <li>
            Schedule a thermal recheck 3 to 6 months after full PoE load is applied to confirm
            bundles are running within the design envelope.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'elec-mate-tools',
    heading: 'Tools That Make This Easier',
    content: (
      <>
        <p>
          Hand-calculating PoE bundle thermal performance for a 200-luminaire office traditionally
          fell to a building services consultant. Most UK contractors taking on PoE work will be
          doing the design themselves.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Calculator className="w-5 h-5 text-yellow-400 mb-2" />
            <h4 className="font-bold text-white mb-1">Cable sizing calculator</h4>
            <p className="text-white/90 text-sm">
              For the mains supply to PoE switches, sized to BS 7671:2018+A4:2026 — current-carrying
              capacity, voltage drop and earth fault loop impedance checks.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ClipboardCheck className="w-5 h-5 text-yellow-400 mb-2" />
            <h4 className="font-bold text-white mb-1">EIC certificate tool</h4>
            <p className="text-white/90 text-sm">
              For the mains supply circuits to PoE switches and network cabinets — BS
              7671:2018+A4:2026 model form, AFDD declaration, digital sign-off.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Network className="w-5 h-5 text-yellow-400 mb-2" />
            <h4 className="font-bold text-white mb-1">Quoting app</h4>
            <p className="text-white/90 text-sm">
              Itemised quotes for PoE-heavy commercial work including structured cabling,
              terminations, certification testing and the mains supply.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Zap className="w-5 h-5 text-yellow-400 mb-2" />
            <h4 className="font-bold text-white mb-1">Mate, the in-app assistant</h4>
            <p className="text-white/90 text-sm">
              Ask design questions like "maximum bundle size for Cat6a Type 4 in a 40 °C ceiling
              void" and get a worked figure plus references.
            </p>
          </div>
        </div>
        <Callout tone="pricing" title="Included on the Electrician tier">
          The BS 7671 calculator and certificate tools are included with the Elec-Mate Electrician
          subscription. 7-day free trial, cancel anytime.
        </Callout>
      </>
    ),
  },
];

const howToSteps = [
  {
    name: 'Total the PoE load and find the worst-case bundle',
    text: 'List every powered device, its PoE type, and its location. Identify the longest, hottest, most densely-bundled pathway — that is the worst-case bundle, and the rest of the design works inwards from it.',
  },
  {
    name: 'Choose the cable category from the worst-case bundle',
    text: 'Apply the practical bundle-size table. If the worst case would exceed 24 cables of Cat6 UTP at Type 4, upgrade the whole installation to Cat6a — partial upgrades are not warrantied by major manufacturers.',
  },
  {
    name: 'Calculate ambient + bundle rise for each pathway',
    text: 'For each pathway take the design ambient from the building services HVAC schedule, add the TSB-184-A bundle rise, and confirm the result stays below 60 °C with margin. See the correction factors guide for parallel mains cabling considerations.',
  },
  {
    name: 'Select the routing method',
    text: 'Open ladder rack and basket trays are preferred for any high-density PoE bundle. Where conduit is mandated, derate the bundle to 50 per cent of the free-air figure and document the derating in the design submission.',
  },
  {
    name: 'Specify the jacket compound and firestop strategy',
    text: 'LSZH for any escape route, riser or protected zone (Reg 422.2.1 and Approved Document B). Plan firestop crossings so the entire bundle does not pass through a single sealed sleeve.',
  },
  {
    name: 'Document, certify and schedule a thermal recheck',
    text: 'Issue the design with the bundle sizing calculations as part of the cabling specification. After installation, run a full structured-cabling certification. Schedule a thermal recheck 3 to 6 months after full PoE load is applied, measuring jacket temperature at the hottest point of the worst-case bundle.',
  },
];

const faqs = [
  {
    question: 'Can Cat5e be used for PoE++ (Type 3 or Type 4)?',
    answer:
      'Technically Cat5e will pass current for Type 3 and Type 4, and IEEE 802.3bt does not prohibit it — but it is strongly not recommended for new installation. The 24 AWG conductor has 20 to 30 per cent more DC loop resistance per metre than Cat6, meaning proportionally more I²R heat. In bundles over about 12 cables at Type 4, Cat5e runs hot, PD voltage drop may be excessive, and most manufacturers void their PoE warranty on Cat5e. Cat6 is the practical minimum; Cat6a is preferred.',
  },
  {
    question: 'What is the maximum bundle size for 90 W PoE in a typical UK office?',
    answer:
      'For a 25 to 30 °C ceiling-void ambient on open ladder rack, the practical maximum is 48 cables of Cat6 UTP per bundle, or 96 cables of Cat6a UTP per bundle. In conduit, halve those — 24 Cat6, 48 Cat6a. For higher ambient (riser, plant room, void above an IT room), reduce by a further 25 to 50 per cent. These figures derive from TIA TSB-184-A and the BS EN 50174-2 informative annex.',
  },
  {
    question: 'Why does ambient temperature matter so much for PoE cabling?',
    answer:
      'Category cabling is rated for continuous operation up to 60 °C conductor temperature. Above that, the dielectric drifts (degrading signal performance) and the jacket begins long-term creep. The PoE I²R bundle rise stacks directly on pathway ambient. A 5 °C rise is fine in a 25 °C ceiling void but becomes a 60 °C operating temperature in a 55 °C riser. Ambient is the single most important non-cable variable in PoE bundle design.',
  },
  {
    question: 'What is the benefit of LSZH over PVC for PoE cabling?',
    answer:
      'LSZH jackets are required by BS 7671:2018+A4:2026 (Reg 422.2.1) and Approved Document B in protected escape routes, risers, hospital corridors and many commercial new-builds. The benefit is fire and smoke behaviour during combustion — LSZH emits substantially less smoke and no halogen acid gases. LSZH does not give more thermal headroom under PoE load — both PVC and LSZH operate to 60 to 75 °C continuously. The choice is driven by fire regulations, not PoE heat.',
  },
  {
    question: 'What is the maximum pulling tension for Cat6 and Cat6a cable?',
    answer:
      '110 N — about 11.3 kgf or 25 lbf — for 4-pair Cat6 and Cat6a UTP, per BS EN 50174-2 and major manufacturer specifications. Cat7 and Cat7a S/FTP tolerate 130 to 150 N. Hand-pulling long conduit runs almost always exceeds 110 N — use a calibrated winch puller or pull in shorter stages. Over-pulling stretches conductors, increases DC loop resistance, and causes the cable to run hotter under PoE load months later.',
  },
  {
    question: 'Is there a real difference between standard Cat6a and "jumbo" large-conductor Cat6a?',
    answer:
      'Yes. Standard Cat6a is 23 AWG (0.258 mm² conductor area). Some manufacturers produce 22 AWG solid Cat6a (often marketed as "jumbo" or "PoE-rated") with a 0.326 mm² conductor — roughly 26 per cent more copper. The larger conductor reduces DC loop resistance by 15 to 25 per cent, directly reducing I²R heat. For Type 4 on large bundles or high-ambient pathways, 22 AWG solid Cat6a is worth the modest extra cost. For standard office PoE the difference is academic.',
  },
  {
    question: 'Do I need to be a qualified electrician to install PoE cabling itself?',
    answer:
      'Under the Electricity at Work Regulations 1989 and BS 7671, Cat6/Cat6a carrying PoE at 50 to 57 V DC is SELV and does not require a qualified electrician to install. The mains supply to PoE switches and network cabinets does — that is a BS 7671 circuit. Most PoE projects are delivered by mixed teams: an electrician for the mains side and a data cabling specialist (typically a City & Guilds 3667 holder or a vendor certification) for the structured cabling. Note that City & Guilds and EAL data-cabling qualifications are separate, standalone routes.',
  },
  {
    question: 'How does cabling certification testing relate to PoE thermal performance?',
    answer:
      'A standard certification test (Fluke DSX or equivalent) measures signal performance — insertion loss, return loss, NEXT, ELFEXT, length, wiremap. It does not measure PoE current capacity or bundle temperature. The signal test catches gross faults but will pass a bundle that is thermally marginal. For PoE-heavy installations, supplement with a thermal survey: measure jacket temperature at the centre of the worst-case bundle under full continuous load, and confirm it sits below 60 °C with margin. Some specifiers now mandate the thermal survey as part of handover.',
  },
];

const relatedPages = [
  {
    href: '/guides/poe-plus-plus-type-4-90w-installation',
    title: 'PoE++ Type 4 (90 W) Installation Guide',
    description:
      'Full design walk-through for IEEE 802.3bt Type 4 — switch sizing, power budget, PD selection, and how the 90 W limit drives the rest of the cabling design.',
    icon: Zap,
    category: 'Guide' as const,
  },
  {
    href: '/guides/poe-lighting-guide',
    title: 'PoE Lighting Guide',
    description:
      'Power over Ethernet lighting end to end — IEEE 802.3bt, Cat6/Cat6a cabling, switch sizing, commercial applications and BS 7671 considerations.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/structured-cabling-bs-en-50173-electricians',
    title: 'Structured Cabling — BS EN 50173',
    description:
      'The generic cabling standard that defines Cat6 and Cat6a, channel performance, and how structured cabling integrates with electrical installation work.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-en-50174-data-cable-installation',
    title: 'BS EN 50174 — Data Cable Installation',
    description:
      'Installation practice for data cabling — pathway design, segregation from mains, pull tension, bend radius and jacket selection by building type.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/section-715-elv-lighting-a4-2026',
    title: 'Section 715 ELV Lighting (A4:2026)',
    description:
      'BS 7671:2018+A4:2026 Section 715 requirements for extra-low voltage lighting, including PoE-driven LED installations and the mains-supply rules they sit alongside.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'BS 7671 ambient temperature, grouping and thermal insulation correction factors — the parallel framework for derating mains cables that sits alongside PoE bundle sizing.',
    icon: Calculator,
    category: 'Guide' as const,
  },
];

export default function Cat6Cat6aCurrentRatingPoEPage() {
  return (
    <GuideTemplate
      title="Cat6 vs Cat6a Current Rating for PoE Installations | Bundle"
      description="Cat6 vs Cat6a current rating for PoE — conductor area, current per pair by PoE type, bundle de-rating, ambient impact, LSZH vs PVC and BS 7671:2018+A4:2026 considerations."
      datePublished={published}
      dateModified={modified}
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Data Cabling & PoE"
      badgeIcon={Cable}
      heroTitle={
        <>
          Cat6 vs Cat6a Current Rating{' '}
          <span className="text-yellow-400">for PoE Installations</span> — Bundle De-rating Guide
        </>
      }
      heroSubtitle="Power over Ethernet has graduated from a low-current curiosity to a serious electrical load. IEEE 802.3bt Type 4 delivers up to 90 W per port across four pairs, and a fully-loaded 48-port switch into a ceiling-void bundle now draws continuous current comparable to a small lighting circuit. This guide explains the current carrying capacity of Cat6 and Cat6a in PoE service, how bundle de-rating works, how ambient temperature changes the maths, and what TIA TSB-184-A, BS EN 50173 and BS EN 50174 actually require."
      readingTime={14}
      answerBox={{
        question: 'What is the current rating difference between Cat6 and Cat6a for PoE?',
        answer:
          'Both carry the same PoE current (about 0.45 to 0.6 A per conductor at IEEE 802.3bt Type 4, 90 W). The real difference is heat: Cat6a has a larger conductor (23 or 22 AWG, 0.258 to 0.326 mm²) and lower DC loop resistance than Cat6, so a Cat6a bundle runs roughly half the temperature rise. That lets Cat6a carry about double the bundle size of Cat6 at the same PoE type.',
      }}
      keyTakeaways={[
        'PoE current is DC across the cable pairs. Type 3 (60 W) and Type 4 (90 W) use all four pairs; at the Type 4 limit, current is approximately 0.45 to 0.6 A per conductor depending on PD voltage and cable losses.',
        'Conductor cross-sectional area dominates thermal performance. Cat5e (24 AWG) is 0.205 mm², Cat6 (23 AWG) is 0.258 mm², Cat6a is 23 AWG or 22 AWG solid (up to 0.326 mm²). More copper means lower DC loop resistance and cooler running.',
        'Bundle de-rating is the real design constraint. TIA TSB-184-A reports roughly 5 °C rise inside a 24-cable Cat6 UTP bundle at full Type 4, and around 15 °C for a 100-cable Cat5e bundle — past the 60 °C rated operating temperature.',
        'Ambient stacks on top of bundle rise. A 40 °C ceiling void plus a 10 °C rise puts the jacket at 50 °C, leaving little margin before performance and life degrade.',
        'Cables in escape routes and risers must satisfy the CPR reaction-to-fire classification required by Reg 422.2.1 (redrafted in A4:2026) — see Appendix 2, Item 17. LSZH gives no thermal headroom over PVC; the choice is driven by CPR fire classification and smoke behaviour, not PoE heat.',
        'BS EN 50174-2 limits pull tension to 110 N (about 11.3 kgf) for Cat6/Cat6a UTP. Exceeding it stretches conductors and raises DC loop resistance — which directly raises PoE heat.',
        'Open ladder rack and basket trays are materially better than enclosed conduit. The same bundle in sealed conduit can more than double its temperature rise.',
      ]}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Size and De-rate a Cat6/Cat6a PoE Bundle"
      howToDescription="A six-step working method for taking a PoE-heavy installation from device list to a defensible, certifiable cable design."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Stop guessing whether your PoE bundle will run hot"
      ctaSubheading="Elec-Mate gives UK electricians the BS 7671 calculators, on-site certificates and quoting tools needed to deliver PoE-heavy commercial installations with confidence — including the mains-supply cable sizing and EIC certification that surround the structured cabling work. 7-day free trial, cancel anytime."
    />
  );
}
