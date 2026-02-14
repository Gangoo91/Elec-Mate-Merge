import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  Thermometer,
  Calculator,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Cable,
  Layers,
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 Correction Factors | Ca Cg Ci Cf Explained';
const PAGE_DESCRIPTION =
  'Complete guide to BS 7671 correction factors for cable sizing. Ca (ambient temperature from Table 4B1), Cg (grouping from Table 4C1-4C5), Ci (thermal insulation from Regulation 523.7), and Cf (0.725 for BS 3036 fuses). Worked examples, formula, common mistakes.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Correction Factors BS 7671', href: '/guides/correction-factors-bs-7671' },
];

const tocItems = [
  { id: 'what-are-correction-factors', label: 'What Are Correction Factors?' },
  { id: 'ca-ambient-temperature', label: 'Ca — Ambient Temperature' },
  { id: 'cg-grouping', label: 'Cg — Grouping' },
  { id: 'ci-thermal-insulation', label: 'Ci — Thermal Insulation' },
  { id: 'cf-semi-enclosed-fuses', label: 'Cf — Semi-Enclosed Fuses' },
  { id: 'applying-all-factors', label: 'Applying All Factors' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The correction factor formula is It = In / (Ca x Cg x Ci x Cf) — you must calculate the tabulated current rating before selecting a cable from BS 7671 Appendix 4.',
  'Ca (ambient temperature) comes from Table 4B1 and accounts for temperatures above the standard 30 degrees Celsius reference — at 40 degrees Celsius, Ca drops to 0.87 for PVC cables, requiring a larger cable.',
  'Cg (grouping) from Table 4C1 to 4C5 is the most commonly applied factor — three circuits touching on a surface have Cg of 0.70, meaning the cable can only carry 70% of its tabulated current.',
  'Ci (thermal insulation) is the most punishing factor — a cable totally surrounded by thermal insulation for more than 0.5 metres drops to Ci = 0.50, halving its current-carrying capacity.',
  "Elec-Mate's cable sizing calculator applies all four correction factors automatically with every BS 7671 table built in — no manual lookups, no calculation errors.",
];

const faqs = [
  {
    question: 'What is the formula for applying correction factors in cable sizing?',
    answer:
      'The formula is It = In / (Ca x Cg x Ci x Cf), where It is the minimum tabulated current-carrying capacity required, In is the rated current of the protective device, Ca is the ambient temperature correction factor, Cg is the grouping correction factor, Ci is the thermal insulation correction factor, and Cf is the semi-enclosed fuse correction factor (0.725 for BS 3036 fuses, or 1.0 for MCBs and RCBOs). After calculating It, you select a cable from the appropriate BS 7671 Appendix 4 table with a current-carrying capacity Iz that is equal to or greater than It. This ensures the cable can carry the required current under the actual installation conditions, not just under the ideal reference conditions assumed in the Appendix 4 tables.',
  },
  {
    question: 'When do I need to apply correction factor Ca for ambient temperature?',
    answer:
      'You apply Ca whenever the ambient temperature where the cable is installed differs from the reference temperature used in the BS 7671 Appendix 4 tables. For thermoplastic (PVC) cables, the reference temperature is 30 degrees Celsius. For thermosetting (XLPE and LSF) cables, the reference temperature is also 30 degrees Celsius, but the conductor operating temperature is 90 degrees Celsius rather than 70 degrees Celsius, so the Ca values are different. Common situations where ambient temperature exceeds 30 degrees Celsius include cables routed through loft spaces in summer (easily 35-45 degrees Celsius), cables near heat sources such as boilers or hot water pipes, cables in plant rooms or commercial kitchens, and cables in South-facing walls or roof spaces. If the ambient temperature is at or below 30 degrees Celsius, Ca is 1.0 and does not affect the calculation. The Ca values come from Table 4B1 in BS 7671 Appendix 4.',
  },
  {
    question: 'How does the grouping correction factor Cg work?',
    answer:
      'The grouping correction factor Cg accounts for the reduction in current-carrying capacity when multiple circuits are installed together. When cables are grouped, each cable generates heat and that heat is shared with adjacent cables, reducing the ability of each cable to dissipate its own heat. The more cables grouped together, the lower the Cg factor. For example, two circuits touching on a surface have Cg = 0.80, three circuits have Cg = 0.70, four circuits have Cg = 0.65, six circuits have Cg = 0.57, and nine or more circuits have Cg = 0.50. The Cg values depend on the arrangement — cables bunched together, cables touching on a surface, cables spaced on a cable tray, or cables in conduit or trunking. These values are found in Tables 4C1 to 4C5 in BS 7671. An important exception is that circuits which are not expected to carry more than 30% of their rated current simultaneously can be excluded from the grouping count, as stated in Note 2 of Table 4C1.',
  },
  {
    question: 'What is the thermal insulation correction factor Ci and when does it apply?',
    answer:
      'The thermal insulation correction factor Ci applies when a cable passes through or is enclosed in thermal insulation material such as loft insulation, wall insulation, or floor insulation. Thermal insulation prevents the cable from dissipating heat, which reduces its safe current-carrying capacity. There are two scenarios under BS 7671 Regulation 523.7 and 523.9: (1) If the cable is in contact with thermal insulation on one side only, Ci = 0.89 — this is common where cables are clipped to joists with insulation laid between the joists. (2) If the cable is totally surrounded by thermal insulation for a length of more than 0.5 metres, Ci = 0.50 — this halves the cable rating and is extremely punishing. For cables totally surrounded by insulation for less than 0.5 metres, a sliding scale applies depending on the length enclosed, as shown in Table 52.2 of BS 7671. The Ci factor is one of the most commonly forgotten derating factors, particularly in domestic loft installations where insulation depth has increased significantly in recent years.',
  },
  {
    question: 'Do I still need to apply Cf = 0.725 for BS 3036 fuses?',
    answer:
      'Yes, if the circuit is protected by a BS 3036 semi-enclosed (rewirable) fuse, you must apply a correction factor of Cf = 0.725. This factor exists because BS 3036 fuses have a fusing factor of approximately 2.0 — meaning they may not blow until the current reaches twice their rated value. By comparison, MCBs to BS EN 60898 have a much tighter operating characteristic. The 0.725 factor ensures that the cable can withstand the higher currents that may flow through a BS 3036 fuse without exceeding its safe operating temperature. In modern installations, BS 3036 fuses are rarely used for new circuits — MCBs and RCBOs are standard. However, BS 3036 fuses are still commonly encountered during periodic inspection of older installations, and the Cf factor must be applied if you are verifying the cable sizing of an existing circuit protected by these fuses. If the circuit uses an MCB, RCBO, or HRC fuse, Cf = 1.0 and has no effect on the calculation.',
  },
  {
    question: 'Can I apply diversity to reduce the effect of grouping?',
    answer:
      'Yes, in certain circumstances. Note 2 to Table 4C1 in BS 7671 states that where cables in a group are not expected to carry more than 30% of their grouped current rating simultaneously, the grouping factor need not be applied. This is a form of diversity applied at the cable sizing stage. In practice, this is most relevant in situations where you have a large number of circuits in a common route (such as cables leaving a distribution board through a common hole or in a shared trunking run) but the circuits serve different loads that are unlikely to be fully loaded at the same time. For example, a residential distribution board might have twelve circuits leaving through a common void, but lighting circuits, cooker circuits, and socket circuits do not all operate at full load simultaneously. Applying this note requires engineering judgement and documentation of the diversity assumptions. If you are unsure, the safe approach is to apply the full grouping factor without diversity.',
  },
  {
    question: 'Does Elec-Mate apply all correction factors automatically?',
    answer:
      "Yes. Elec-Mate's cable sizing calculator includes every correction factor table from BS 7671 Appendix 4. When you enter the ambient temperature, the number of grouped circuits, the thermal insulation conditions, and the type of protective device, the calculator applies Ca, Cg, Ci, and Cf automatically. It calculates the required tabulated current rating (It), selects the appropriate cable from the correct Appendix 4 table for your chosen cable type and reference method, and then verifies voltage drop and fault current withstand. All this happens in seconds, with full transparency — you can see every factor applied and every table referenced. The calculator works offline, so you can use it on site without mobile signal. It is one of 70 electrical calculators included in Elec-Mate, alongside voltage drop, Zs verification, maximum demand, adiabatic equation, and more.",
  },
];

const sections = [
  {
    id: 'what-are-correction-factors',
    heading: 'What Are Correction Factors?',
    content: (
      <>
        <p>
          Correction factors are multipliers used in the{' '}
          <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
            cable sizing process
          </SEOInternalLink>{' '}
          to account for real-world installation conditions that reduce a cable's ability to carry
          current safely. The current-carrying capacity values in BS 7671 Appendix 4 are based on a
          set of reference conditions — a single circuit, installed in an ambient temperature of 30
          degrees Celsius, with no thermal insulation, and protected by an MCB or HRC fuse. When the
          actual conditions differ from these references, correction factors must be applied to
          derate the cable accordingly.
        </p>
        <p>
          There are four correction factors in the BS 7671 cable sizing methodology: Ca for ambient
          temperature, Cg for grouping (multiple circuits installed together), Ci for thermal
          insulation, and Cf for semi-enclosed fuses. Each factor is a decimal value less than or
          equal to 1.0. Multiplying them together gives the overall derating, and dividing the
          protective device rating by this product gives the minimum tabulated current rating the
          cable must have.
        </p>
        <p>The fundamental formula is:</p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            I<sub>t</sub> = I<sub>n</sub> &divide; (C<sub>a</sub> &times; C<sub>g</sub> &times; C
            <sub>i</sub> &times; C<sub>f</sub>)
          </p>
          <p className="text-white text-xs mt-2">
            I<sub>t</sub> = minimum tabulated current rating | I<sub>n</sub> = rated current of
            protective device | C<sub>a</sub>, C<sub>g</sub>, C<sub>i</sub>, C<sub>f</sub> =
            correction factors
          </p>
        </div>
        <p>
          You then select a cable from the appropriate Appendix 4 table where the tabulated
          current-carrying capacity I<sub>z</sub> is equal to or greater than I<sub>t</sub>. If any
          factor is missed or applied incorrectly, the cable will be undersized for the actual
          conditions, leading to overheating, insulation degradation, and a potential fire risk.
        </p>
        <SEOAppBridge
          title="Cable sizing calculator with all correction factors built in"
          description="Enter your load, installation conditions, and cable route. Elec-Mate applies Ca, Cg, Ci, and Cf automatically using every BS 7671 Appendix 4 table. No manual lookups, no calculation errors."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'ca-ambient-temperature',
    heading: 'Ca — Ambient Temperature Correction Factor',
    content: (
      <>
        <p>
          The ambient temperature correction factor Ca accounts for the fact that cable
          current-carrying capacity tables in Appendix 4 are based on an ambient temperature of 30
          degrees Celsius. When cables are installed in environments hotter than 30 degrees Celsius,
          their ability to dissipate heat is reduced, and the cable must be derated. Ca values are
          found in Table 4B1 of BS 7671 Appendix 4.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Table 4B1 — Key Ca Values (70 degrees Celsius PVC)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">25&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">1.03</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">30&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">1.00</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">35&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.94</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">40&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.87</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">45&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.79</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">50&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.71</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">55&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.61</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">60&deg;C</p>
              <p className="text-yellow-400 text-lg font-bold">0.50</p>
            </div>
          </div>
        </div>
        <p>
          Thermosetting cables (XLPE, LSF) have different Ca values because they have a higher
          maximum conductor temperature of 90 degrees Celsius compared to 70 degrees Celsius for
          PVC. This means thermosetting cables are less affected by elevated ambient temperatures.
          For example, at 40 degrees Celsius, XLPE cable has Ca = 0.91 compared to 0.87 for PVC.
        </p>
        <p>
          Common situations where Ca must be applied include loft spaces (35 to 50 degrees Celsius
          in summer), plant rooms, airing cupboards, near hot water cylinders, commercial kitchens,
          server rooms, and South-facing roof voids. If the ambient temperature is 30 degrees
          Celsius or below, Ca = 1.0 and has no effect on the calculation.
        </p>
      </>
    ),
  },
  {
    id: 'cg-grouping',
    heading: 'Cg — Grouping Correction Factor',
    content: (
      <>
        <p>
          The grouping correction factor Cg accounts for the mutual heating effect when multiple
          circuits are installed together. Each current-carrying cable generates heat, and when
          cables are bunched or touching, they share that heat, raising the temperature of every
          cable in the group. This reduces the safe current each individual cable can carry.
        </p>
        <p>
          Cg values are found in Tables 4C1 to 4C5 of BS 7671 Appendix 4. The correct table depends
          on the installation arrangement — whether cables are bunched together (Table 4C1),
          installed on a cable tray (Table 4C2 to 4C4), or in conduit or trunking (Table 4C5).
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Table 4C1 — Key Cg Values (Bunched or Same Conduit/Trunking)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">1 circuit</p>
              <p className="text-yellow-400 text-lg font-bold">1.00</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">2 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.80</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">3 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.70</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">4 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.65</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">5 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.60</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">6 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.57</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">7 circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.54</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">9+ circuits</p>
              <p className="text-yellow-400 text-lg font-bold">0.50</p>
            </div>
          </div>
        </div>
        <p>
          An important exception exists in Note 2 of Table 4C1: if cables in a group are not
          expected to carry more than 30% of their grouped current rating simultaneously, the
          grouping factor need not be applied. This allows for diversity to be taken into account at
          the cable sizing stage, reducing the impact of grouping in installations where not all
          circuits are fully loaded at the same time.
        </p>
        <p>
          Grouping is the correction factor most frequently encountered in practice because cables
          commonly share routes — leaving a consumer unit through a common hole, running through
          shared voids, or installed together in conduit or trunking. Every electrician must count
          the number of circuits sharing a route and apply the correct Cg factor for the worst-case
          section of the cable run.
        </p>
      </>
    ),
  },
  {
    id: 'ci-thermal-insulation',
    heading: 'Ci — Thermal Insulation Correction Factor',
    content: (
      <>
        <p>
          The thermal insulation correction factor Ci is the most punishing of all correction
          factors. Thermal insulation prevents a cable from dissipating the heat generated by
          current flow, causing the conductor temperature to rise above its safe operating limit. BS
          7671 Regulation 523.7 and 523.9 set out the requirements.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Cable touching insulation on one side only
            </h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Ci = 0.89</strong> — This is the common scenario
              where cables are clipped to joists or studwork with insulation laid between the joists
              or packed into the stud wall. The cable has insulation on one side but can still
              dissipate some heat from the other side. This is by far the most frequently applied Ci
              value in domestic installations.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Cable totally surrounded by thermal insulation (&gt;0.5m)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Ci = 0.50</strong> — If the cable is completely
              enclosed in thermal insulation for a continuous length of more than 0.5 metres, the
              cable's current-carrying capacity is halved. This is an extremely severe derating that
              typically forces a significant increase in cable size. It applies when cables are run
              through insulation in lofts, walls, or floors where the insulation completely
              surrounds the cable.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Cable in insulation for less than 0.5m
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Table 52.2 of BS 7671 provides Ci values for cables totally surrounded by thermal
              insulation for short lengths. For 100mm in insulation, Ci = 0.89. For 200mm, Ci =
              0.81. For 400mm, Ci = 0.68. For 500mm or more, Ci = 0.50. These intermediate values
              are useful when cables pass through insulated walls or partitions.
            </p>
          </div>
        </div>
        <p>
          The Ci factor is the one most commonly forgotten by electricians, particularly in domestic
          loft installations where insulation depths have increased from 100mm to 270mm or more in
          recent years. A cable that was adequately sized when the loft had 100mm of insulation may
          now be undersized if additional insulation has been laid over it, totally enclosing the
          cable.
        </p>
        <SEOAppBridge
          title="Never forget a derating factor again"
          description="Elec-Mate's cable derating calculator prompts you for ambient temperature, grouping, and insulation conditions. It applies Ci automatically and warns if the cable passes through thermal insulation."
          icon={Thermometer}
        />
      </>
    ),
  },
  {
    id: 'cf-semi-enclosed-fuses',
    heading: 'Cf — Semi-Enclosed Fuse Correction Factor',
    content: (
      <>
        <p>
          The semi-enclosed fuse correction factor Cf = 0.725 applies only when the circuit is
          protected by a BS 3036 semi-enclosed (rewirable) fuse. This factor compensates for the
          poor fusing characteristics of BS 3036 fuses, which have a fusing factor of approximately
          2.0 — meaning they may not blow until the current reaches twice their rated value.
        </p>
        <p>
          By comparison, an MCB to BS EN 60898 has a much more precise operating characteristic,
          with guaranteed tripping between 1.13 and 1.45 times its rated current. HRC fuses to BS 88
          are similarly precise. Because BS 3036 fuses allow significantly higher currents to flow
          for longer periods before they blow, the cable must be rated to handle these higher
          currents without overheating — hence the 0.725 derating factor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">When does Cf apply?</h3>
              <p className="text-white text-sm leading-relaxed">
                Cf = 0.725 applies <strong className="text-yellow-400">only</strong> when the
                protective device is a BS 3036 semi-enclosed fuse. For MCBs (BS EN 60898), RCBOs,
                HRC fuses (BS 88), and cartridge fuses (BS 1361), Cf = 1.0 and has no effect on the
                calculation. BS 3036 fuses are rarely installed in new work but are commonly
                encountered during periodic inspection of older installations, particularly those
                with rewirable fuse boards.
              </p>
            </div>
          </div>
        </div>
        <p>
          If you are assessing an existing installation with BS 3036 fuses during an EICR, you must
          apply Cf = 0.725 when verifying the existing cable sizes. If the cable was originally
          sized without this factor (as was common in older installations designed before this
          requirement was introduced), the cable may be undersized for the fuse protecting it. This
          is a common finding on older installations and may warrant a C3 observation code on the
          EICR, depending on the magnitude of the shortfall and the actual loading of the circuit.
        </p>
      </>
    ),
  },
  {
    id: 'applying-all-factors',
    heading: 'Applying All Correction Factors Together',
    content: (
      <>
        <p>
          In practice, multiple correction factors often apply simultaneously. A cable leaving a
          consumer unit may be grouped with other circuits (Cg), pass through a loft space at
          elevated temperature (Ca), and be in contact with thermal insulation (Ci). All applicable
          factors must be multiplied together, and the protective device rating divided by this
          product to determine the minimum tabulated current rating.
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            I<sub>t</sub> = I<sub>n</sub> &divide; (C<sub>a</sub> &times; C<sub>g</sub> &times; C
            <sub>i</sub> &times; C<sub>f</sub>)
          </p>
        </div>
        <p>
          The combined effect of multiple correction factors can be dramatic. Consider a circuit
          protected by a 32A MCB with three circuits grouped (Cg = 0.70), ambient temperature of 35
          degrees Celsius (Ca = 0.94), and cable touching insulation on one side (Ci = 0.89):
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            I<sub>t</sub> = 32 &divide; (0.94 &times; 0.70 &times; 0.89 &times; 1.0)
          </p>
          <p className="text-white font-mono text-sm mt-1">
            I<sub>t</sub> = 32 &divide; 0.5855 = <strong>54.7A</strong>
          </p>
        </div>
        <p>
          Without any correction factors, a 32A circuit would need a cable rated for just 32A. With
          all three factors applied, the cable must be rated for 54.7A — a massive increase that
          could mean the difference between 4mm&sup2; and 10mm&sup2; cable, with significant cost
          and installation implications.
        </p>
        <p>
          This is precisely why cable sizing must be done correctly at the design stage. An
          electrician who skips the correction factor calculation and simply selects a cable based
          on the MCB rating alone is likely to install an undersized cable that will overheat under
          full load conditions. Over time, this overheating degrades the cable insulation and
          increases the risk of fire.
        </p>
        <SEOAppBridge
          title="Automatic derating with every BS 7671 table"
          description="Elec-Mate's cable sizing calculator applies all correction factors and shows you the calculation step by step. See every factor, every table reference, every intermediate value. Works offline on site."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples',
    content: (
      <>
        <div className="space-y-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Example 1: Domestic Shower Circuit
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              A 9.5kW electric shower is to be installed on a dedicated radial circuit. The cable
              route runs through a loft space at 35 degrees Celsius, grouped with 2 other circuits,
              touching insulation on one side. Protected by an MCB.
            </p>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Design current:</strong> I<sub>b</sub> = 9,500 &divide; 230 = 41.3A
              </p>
              <p>
                <strong>Protective device:</strong> 45A Type B MCB (next standard rating above
                41.3A)
              </p>
              <p>
                <strong>Correction factors:</strong> Ca = 0.94 (35&deg;C) | Cg = 0.80 (3 circuits
                including this one, but using 2-group for touching arrangement) | Ci = 0.89 (one
                side) | Cf = 1.0 (MCB)
              </p>
              <p>
                <strong>Combined factor:</strong> 0.94 &times; 0.80 &times; 0.89 &times; 1.0 = 0.669
              </p>
              <p>
                <strong>
                  Required I<sub>t</sub>:
                </strong>{' '}
                45 &divide; 0.669 = <strong>67.3A</strong>
              </p>
              <p>
                <strong>Cable selected:</strong> 16mm&sup2; twin and earth (Reference Method A: I
                <sub>z</sub> = 57A — NOT sufficient. Must use Reference Method C: I<sub>z</sub> =
                73A, or increase to 16mm&sup2; even for Method A)
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Example 2: Ring Final Circuit in Insulated Wall
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              A ring final circuit protected by a 32A Type B MCB. Cable runs through an insulated
              timber-frame wall where it is totally enclosed in insulation for 2 metres. Ambient
              temperature 30 degrees Celsius, no other circuits grouped at the insulated section.
            </p>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Correction factors:</strong> Ca = 1.00 (30&deg;C) | Cg = 1.00 (single
                circuit at worst point) | Ci = 0.50 (totally enclosed &gt;0.5m) | Cf = 1.0 (MCB)
              </p>
              <p>
                <strong>Combined factor:</strong> 1.00 &times; 1.00 &times; 0.50 &times; 1.0 = 0.50
              </p>
              <p>
                <strong>
                  Required I<sub>t</sub>:
                </strong>{' '}
                32 &divide; 0.50 = <strong>64.0A</strong>
              </p>
              <p>
                <strong>Result:</strong> Standard 2.5mm&sup2; T&E (I<sub>z</sub> = 27A for Method A)
                is nowhere near sufficient. Even 10mm&sup2; (I<sub>z</sub> = 43A for Method A)
                fails. You would need to reconsider the cable route to avoid being totally enclosed
                in insulation, or use thermosetting cable with higher ratings.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes with Correction Factors',
    content: (
      <>
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Forgetting to apply any correction factors at all
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The most common and most dangerous mistake. Many electricians select cables based
                  solely on the MCB rating without considering the installation conditions. A 32A
                  MCB does not mean a 32A-rated cable is sufficient — it means you need a cable that
                  can carry at least 32A after all derating factors have been applied. Under adverse
                  conditions, this could require a cable rated for 50A or more.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Using the wrong grouping count</h3>
                <p className="text-white text-sm leading-relaxed">
                  Grouping must be assessed at the worst point along the cable route — typically
                  where the most cables are bundled together, such as at the consumer unit or where
                  cables pass through a common hole in a joist. Counting only the cables at the load
                  end rather than at the point of maximum grouping leads to an incorrect (too high)
                  Cg value.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Ignoring thermal insulation in loft spaces
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  With modern loft insulation depths of 270mm or more, cables laid on ceiling joists
                  can be completely buried in insulation. This triggers the Ci = 0.50 factor,
                  halving the cable capacity. Many electricians fail to check whether insulation has
                  been added since the original installation, particularly during periodic
                  inspections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Applying correction factors to the design current instead of the protective device
                  rating
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The formula divides the protective device rating (In) by the correction factors,
                  not the design current (Ib). Dividing Ib by the factors would give a lower value
                  than required, potentially resulting in an undersized cable. The correct approach
                  is: It = In / (Ca x Cg x Ci x Cf), then select a cable with Iz equal to or greater
                  than It.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables to BS 7671',
    description:
      'The complete 6-step cable sizing process with correction factors, voltage drop, and fault current verification.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/reference-methods-bs-7671',
    title: 'Cable Reference Methods',
    description:
      'Reference Methods A to G from Table 4A2 — how installation method affects current carrying capacity.',
    icon: Layers,
    category: 'Guide' as const,
  },
  {
    href: '/guides/appendix-4-tables-bs-7671',
    title: 'Appendix 4 Tables Guide',
    description:
      'How to read and use BS 7671 Appendix 4 current carrying capacity and voltage drop tables.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Automatic cable sizing with all correction factors, voltage drop, and adiabatic equation verification.',
    icon: Calculator,
    category: 'Tool' as const,
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Calculate voltage drop using mV/A/m values from Appendix 4 for single-phase and three-phase circuits.',
    icon: Zap,
    category: 'Tool' as const,
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to BS 7671:2018 — all 7 parts, amendments, and how they apply to daily practice.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CorrectionFactorsGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-01"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Cable Sizing"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          BS 7671 Correction Factors{' '}
          <span className="text-yellow-400">Ca, Cg, Ci &amp; Cf Explained</span>
        </>
      }
      heroSubtitle="The complete guide to cable sizing correction factors under BS 7671. Ambient temperature (Ca from Table 4B1), grouping (Cg from Table 4C1-4C5), thermal insulation (Ci from Regulation 523.7), and semi-enclosed fuse factor (Cf = 0.725). Worked examples, common mistakes, and how to apply the formula It = In / (Ca x Cg x Ci x Cf)."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Cable sizing with automatic derating"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site cable sizing, 70 calculators, and 8 certificate types — all built to BS 7671:2018+A3:2024. 7-day free trial, cancel anytime."
    />
  );
}
