import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s3-agri-system',
    question:
      'A new milking parlour is being wired in a rural area. The DNO has refused to provide a TN-C-S earth (PME) on the basis that livestock will be present. What earthing arrangement does Section 705 effectively force the designer towards?',
    options: [
      'TN-C-S — the DNO must still provide a PME earth on request',
      'TT — a separate earth electrode with RCD-based ADS per Reg 411.5.3',
      'TN-S — split the combined PEN to a separate earth at the meter',
      'IT — an unearthed supply, required for all agricultural buildings',
    ],
    correctIndex: 1,
    explanation:
      'DNOs routinely refuse PME (TN-C-S) earths on agricultural and equestrian premises because of the elevated touch-current risk to livestock under an open-PEN fault. Section 705 then drives the designer to a TT arrangement — separate earth electrode, RCDs delivering ADS per Reg 411.5.3 (Ra x I_dn ≤ 50 V), and supplementary bonding throughout areas where stock is present.',
  },
  {
    id: 'm7s3-stock-touch',
    question:
      'Why does Section 705 demand 30 mA RCD additional protection on socket-outlets and stricter touch-voltage limits than general installations?',
    options: [
      'Because cable runs are longer, raising R1+R2 and the touch voltage',
      'Because livestock have far lower body resistance and a lower lethal-current threshold than humans',
      'Because the buildings are unheated, so condensation lowers insulation resistance',
      'Because farmers are not skilled persons and cannot isolate the supply safely',
    ],
    correctIndex: 1,
    explanation:
      'Cattle, horses and pigs have a body-resistance pathway (four hooves on a wet conductive floor) that is far lower than a standing human, and they are killed by significantly lower currents. A 25 V step-and-touch potential that a person would not notice can disable or kill a cow. That is the design driver behind Section 705.411.1, the supplementary bonding rules and the RCD requirements — not a generic environmental concern.',
  },
  {
    id: 'm7s3-caravan-pitch',
    question:
      'You are designing a 20-pitch caravan touring site. Each pitch socket-outlet (industrial 16 A, BS EN 60309-2 blue) requires what protection arrangement under Section 708?',
    options: [
      'A shared 100 mA upstream RCD covering all pitches, with 16 A overcurrent per outlet',
      'Individual 30 mA RCD and 16 A overcurrent per outlet, max three outlets per circuit',
      'A single 30 mA RCD covering up to 12 pitches, with 16 A overcurrent per outlet',
      'No RCD required at the pitch, as touring caravans bring their own protection',
    ],
    correctIndex: 1,
    explanation:
      'Reg 708.553.1.13 mandates individual 30 mA RCD protection per socket-outlet on a caravan park, with each socket protected by its own overcurrent device, and a maximum of three (3) socket-outlets per final circuit. Sharing an RCD across the whole site would cause unacceptable nuisance tripping and fail the discrimination requirement.',
  },
  {
    id: 'm7s3-marina-rcd-type',
    question:
      'A marina shore-power pedestal feeds modern boats with on-board inverters, lithium battery banks and DC-DC chargers. Under Reg 709.531, which RCD type is most likely required at the pedestal?',
    options: [
      'Type AC — adequate because the shore supply is sinusoidal AC',
      'Type A — adequate for any inverter or charger load on board',
      'Type B — needed where on-board electronics may produce smooth DC residuals',
      'No RCD at the pedestal — vessels supply their own protection on board',
    ],
    correctIndex: 2,
    explanation:
      "Reg 709.531 applies the standard RCD additional-protection rules to marinas, but the equipment realities push designers towards Type B at the shore-power pedestal. Modern vessels run inverters, VSDs and lithium chargers that can leak smooth DC residuals — invisible to Type A and Type AC. If smooth DC residuals can occur, Type B (or RDC-DD upstream of Type A per the manufacturer's instructions) is the only compliant choice.",
  },
  {
    id: 'm7s3-exhibition-temp',
    question:
      'A trade-show exhibition stand is being installed for a 5-day run. Which Section 711 principle applies to the temporary supply?',
    options: [
      'Temporary exhibition installations are exempt from the protective-measure rules',
      'The same protective measures apply, plus extra checks for repeated re-erection',
      'Only basic insulation is required, as the supply is temporary and supervised',
      'A documented risk assessment alone is sufficient in place of ADS and RCDs',
    ],
    correctIndex: 1,
    explanation:
      'Reg 711 (Exhibitions, shows and stands) does not relax the protective-measure rules — it intensifies them. Equipment is repeatedly assembled, knocked, transported and re-energised, so wear on flexible cables and connectors is high. 30 mA RCD additional protection on every final circuit, ADS verified per Section 411, and a documented hand-over inspection per Section 711.6 are all required.',
  },
  {
    id: 'm7s3-outdoor-burial',
    question:
      'A SWA cable is being run from a house to a new outbuilding on a farm. What is the minimum recommended burial depth and what additional mechanical protection is required where the cable crosses a vehicle-trafficked route?',
    options: [
      '150 mm in cultivated ground, with no additional mechanical protection needed',
      'Typically 600 mm in cultivated ground, with marker tape and tile/duct where vehicles cross',
      'A fixed 300 mm everywhere, as the depth is prescribed by BS 7671 nationally',
      'Surface-clipped to a fence line, which is always acceptable on agricultural land',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 does not prescribe a single national depth — Reg 522.8.10 simply requires cables to be at sufficient depth to avoid mechanical damage having regard to anticipated disturbance. UK industry practice (DNO Engineering Recommendations, IET guidance) is typically 450-600 mm in cultivated ground, with marker tape above the cable and additional cable tiles, duct or concrete protection where ploughing, vehicles or heavy plant cross.',
  },
  {
    id: 'm7s3-fairground',
    question:
      'A fairground operator is installing a temporary funfair for one weekend. Which Part 7 section is the primary reference for the temporary structures and rides?',
    options: [
      'Section 705 — agricultural and horticultural premises',
      'Section 740 — structures, amusement devices and booths at fairgrounds and circuses',
      'Section 711 — exhibitions, shows and trade stands only',
      'No specific Part 7 section applies to short-duration funfairs',
    ],
    correctIndex: 1,
    explanation:
      'Section 740 is the dedicated chapter for fairground / circus / mobile-amusement installations — distinct from Section 711 (trade exhibitions / stands) and Section 708 (caravan parks). It covers the cable, connector, RCD and inspection requirements specific to repeatedly-erected ride and booth equipment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Section 705 applies to agricultural and horticultural premises. Which of the following is NOT within its scope?',
    options: [
      'A milking parlour with 24 V control circuits and 230 V wash-down sockets',
      'An equestrian indoor riding school',
      'A domestic kitchen in a farmhouse, with no livestock present',
      'A pig finishing unit with stock-touch metalwork',
    ],
    correctAnswer: 2,
    explanation:
      'Section 705 covers parts of agricultural and horticultural premises where livestock are kept, fodder is processed/stored, or grain/produce is dried/stored. A separate dwelling within the holding (a farmhouse kitchen with no stock and no agricultural operation) reverts to general BS 7671 rules. The trigger for Section 705 is the presence of livestock or agricultural processing, not the rural address.',
  },
  {
    id: 2,
    question:
      'Reg 705.422 (fire risk in agricultural premises) drives certain extra design requirements. Which is correct?',
    options: [
      'AFDDs are forbidden in agricultural buildings under Reg 705.422',
      'Plastic enclosures are required throughout to reduce the earth fault current',
      'Only metal-clad consumer units are permitted in agricultural premises',
      'Where fire risk is elevated, extra measures apply — 30 mA RCDs on all final circuits, AFDDs considered, and correct IP/IK on luminaires and motors',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 705.422 covers the elevated fire risk on farms — dust, fodder, dry bedding, livestock body-heat. The response is multi-layered: 30 mA RCD additional protection on all final circuits (not just sockets), strong consideration of AFDDs (Reg 421.1.7 makes them mandatory in some agricultural high-risk locations under A4), correct IP/IK ratings on luminaires and motors, and good cable management to prevent rodent damage.',
  },
  {
    id: 3,
    question:
      'On a TT installation in a cattle barn, you measure Ra (earth-electrode + protective conductor back to exposed metal) = 35 ohms. The downstream circuit is on a 30 mA RCD. Does this satisfy Reg 411.5.3 for ADS in a TT system?',
    options: [
      'No — in agricultural premises Ra must be below 10 ohms regardless of the RCD',
      'Yes — Ra × I_dn = 35 × 0.03 = 1.05 V, well below the 50 V touch-voltage limit',
      'No — TT systems are not permitted on agricultural premises at all',
      'Yes, but only if a 100 mA RCD is added in series with the 30 mA device',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.5.3 sets the TT condition Ra x I_dn ≤ 50 V. With 35 ohms x 0.03 A = 1.05 V, the touch voltage is well within limits. Note Section 705 may apply tighter supplementary-bonding requirements within livestock zones — that is in addition to, not instead of, the 411.5.3 calculation.',
  },
  {
    id: 4,
    question: 'Reg 708.553 governs caravan park socket-outlets. Which combination is correct?',
    options: [
      'BS 1363 13 A sockets, surface-mounted, one per individual pitch, IP54 rated',
      'BS EN 60309-2 63 A blue commando outlets, one per pitch, on a shared 100 mA RCD',
      'BS EN 60309-2 16/32 A outlets, IP44 min, individual 30 mA RCD, max three per circuit',
      'IP65-rated outdoor 13 A outlets, individual 30 mA RCD, max six per circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 708.553 requires industrial-style BS EN 60309-2 socket-outlets (the blue commando connectors) on caravan pitches, IP44 minimum, with a 30 mA RCD per outlet, individual overcurrent protection, no more than three outlets per circuit, and mounting between 0.5 m and 1.5 m above ground. The choice is driven by water resistance, the locking action of the connector, and the standardised plug-and-socket interface across European caravan kit.',
  },
  {
    id: 5,
    question:
      'A marina pedestal supplies a 16 A shore-power outlet. Which combination of protection meets Reg 709.531 and Section 709 generally?',
    options: [
      '30 mA RCD per outlet (Type A or B by load), overcurrent per outlet, IP44 min',
      'Single Type AC 100 mA RCD covering all eight berths, IP44 min, overcurrent per outlet',
      'Weatherproofed 13 A BS 1363 outlets at each berth, individual 30 mA RCD, IP44 min',
      'No RCD at the pedestal, overcurrent per outlet, each boat providing its own protection',
    ],
    correctAnswer: 0,
    explanation:
      'Section 709 applies the general 30 mA RCD additional-protection rules per outlet, with overcurrent protection per outlet, IP44 minimum, and Type B / RCM consideration where on-board power-electronics make smooth DC residuals plausible. Marinas also commonly use isolation transformers at the pedestal to break galvanic coupling between vessels — a corrosion mitigation that doubles as a fault-isolation benefit.',
  },
  {
    id: 6,
    question:
      'Section 711 (exhibitions / shows / stands) requires a hand-over inspection before energisation each time the stand is erected. What is the appropriate certification?',
    options: [
      'A permanent EIC issued once, valid for the whole life of the stand design',
      'No documentation is required because the installation is temporary',
      'Only a periodic EICR is needed each time the stand is built',
      'An EIC (or Minor Works for small changes), plus a functional-test record before each opening per Section 711.6',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 711 treats every fresh erection of an exhibition stand as a new installation requiring initial verification under Part 6. An EIC accompanies the first energisation each time the stand is built; minor adjustments use a Minor Works Cert. Section 711.6 also requires functional testing of RCDs and continuity of CPCs before each public opening — this is the practical safeguard against cable damage during transit and re-assembly.',
  },
  {
    id: 7,
    question:
      'In a livestock area, supplementary bonding is required under Section 705. What does the bonding actually connect?',
    options: [
      'Only the metal stall partitions, bonded to each other',
      'Only the metal water troughs and drinkers in the stock area',
      'All exposed- and extraneous-conductive-parts within livestock reach — motor frames, railings, troughs, steel, floor grids — tied back to the MET',
      'Just the consumer unit casing back to the main earth terminal',
    ],
    correctAnswer: 2,
    explanation:
      'Section 705 supplementary bonding is comprehensive: every exposed-conductive-part (Class I equipment frames) and every extraneous-conductive-part within livestock reach (railings, drinkers, structural steel, equipotential floor grids) ties together back to the MET. The aim is to ensure that if a fault drives any one of those parts above earth potential, every other part rises with it — there is no touch-voltage between two simultaneously-touchable surfaces.',
  },
  {
    id: 8,
    question:
      'A fairground ride installer connects a temporary 32 A three-phase TPN feed to a ride via a 25 m HO7RN-F flexible cable. Section 740 calls for which combination?',
    options: [
      'General-purpose PVC flex, BS EN 60309-2 connectors, IP44, 30 mA RCD per circuit',
      'HO7RN-F heavy-duty flex (Reg 740.521), BS EN 60309-2 connectors, IP44, 30 mA RCD per circuit',
      'Permanent SWA buried at 600 mm to each ride, BS EN 60309-2 connectors, 30 mA RCD per circuit',
      'Standard PVC twin-and-earth, surface-clipped, BS EN 60309-2 connectors, 30 mA RCD per circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Section 740 mandates heavy-duty flexible cables (HO7RN-F or equivalent) for temporary fairground feeds because of repeated coiling, dragging and mechanical impact. Connectors are BS EN 60309-2, IP44 minimum, with 30 mA RCD per circuit and a documented functional check before each public opening — Reg 740.6 ties the inspection regime to the operational cycle.',
  },
];

const faqItems = [
  {
    question: 'Why does Section 705 effectively rule out TN-C-S (PME) on agricultural premises?',
    answer:
      'On a TN-C-S supply, an open-PEN fault drives the local earth (the MET and every Class I exposed-conductive-part bonded to it) up towards line voltage. Inside a typical home, that is dangerous to humans. In a milking parlour or cattle barn, where livestock stand on wet conductive floors with hooves contacting metal stall railings, drinkers and structural steel, the elevated MET creates a step-and-touch potential easily lethal to stock. DNOs therefore routinely refuse to provide a PME earth to agricultural premises, and the designer goes to TT — own earth electrode, RCD-based ADS per Reg 411.5.3, and supplementary bonding throughout livestock zones.',
  },
  {
    question: 'Why are the touch-current limits for livestock different from humans?',
    answer:
      'A standing human has a body-to-earth resistance dominated by footwear, dry skin, and a single (or two-foot) earth contact. A cow has four hooves on a wet conductive floor, no footwear, and a body mass that conducts efficiently across the chest. The result is dramatically lower body resistance and a much lower lethal-current threshold. Voltages a person might not even register can disable cattle. That asymmetry is why Section 705 sets stricter requirements (extensive supplementary bonding, equipotential floor grids in some installations) — the same touch-voltage that is acceptable in a domestic kitchen is unsafe in a livestock zone.',
  },
  {
    question:
      'Are equestrian establishments (riding schools, livery yards) covered by Section 705?',
    answer:
      'Yes. Section 705 applies to agricultural and horticultural premises generally, and the IET guidance is clear that equestrian establishments — indoor riding schools, stabling blocks, livery yards — fall within the same touch-current and fault-protection logic as cattle / pig / poultry installations. The same earthing, RCD, supplementary bonding and IP/IK rules apply.',
  },
  {
    question:
      'What earth electrode resistance should I aim for on a TT installation in a caravan park?',
    answer:
      'BS 7671 sets the condition Ra x I_dn ≤ 50 V (Reg 411.5.3). With a 30 mA RCD that is a maximum Ra of 1666 ohms, but practical design values are far lower — typically 100 ohms or below to provide a robust margin and to keep volt-drop under fault sensible. Soil resistivity matters: a single 1.2 m rod in dry sandy soil might give 200 ohms+; a longer rod or rod-array in damp loam will give 20-40 ohms. Multiple rods in parallel, deep-driven rods, or earth mats are standard mitigations on caravan / agricultural sites.',
  },
  {
    question:
      'What is the difference between Section 708 (caravan park) and the on-board electrics of the caravan itself?',
    answer:
      'Section 708 governs the FIXED installation at the park — the consumer unit, supply cabling to each pitch, the BS EN 60309-2 socket-outlet, RCDs and overcurrent protection, all up to and including the pitch socket. The on-board caravan / motorhome electrics on the other side of the plug are covered by separate standards (BS EN 1648-2 for caravan / motorhome 12 V and 230 V wiring, and the touring-caravan habitation regs). The two are designed together — but certified separately. An EIC for the park does not warrant the caravan plugged into it.',
  },
  {
    question: 'Why might a marina need a Type B RCD or an isolation transformer?',
    answer:
      "Modern boats carry inverters, lithium chargers, DC-DC converters and AC inverters that can produce smooth DC residual currents. Type AC and Type A RCDs are blind to smooth DC residuals — the RCD would not trip on a fault it cannot see. Reg 709.531 and the manufacturer's instructions for the on-board equipment together drive the choice: Type B at the pedestal where smooth DC residuals are plausible, or an isolation transformer at the pedestal that breaks the galvanic and earth path between vessels. Isolation transformers also mitigate corrosion (galvanic action between bonded vessels) — a marine-specific concern that does not arise in caravan parks.",
  },
  {
    question:
      'What IP and IK ratings should outdoor agricultural / marina / caravan equipment meet?',
    answer:
      'IP rating addresses ingress (IPX4 for splashing, IPX5 for jets, IPX6 for heavy seas / wash-down, IPX7 for temporary immersion). Wash-down zones in a milking parlour need IPX5 minimum on accessories within reach of the hose; marinas typically specify IP44 on pedestals and IP55+ on connectors exposed to spray. IK rating addresses mechanical impact (IK07 typical for accessories in livestock areas, IK10 where livestock can directly impact the equipment). Equipment selection for outdoor installations is environment-driven, not a single number — the designer chooses against the AD (water) and AG (impact) classifications of the location.',
  },
  {
    question: 'How deep should I bury an SWA cable on agricultural land?',
    answer:
      'BS 7671 Reg 522.8.10 requires cables to be at sufficient depth to avoid mechanical damage having regard to anticipated disturbance. UK industry practice on agricultural land is typically 450-600 mm in cultivated ground (above the depth of a typical plough-share), with cable tiles or warning tape laid above. Where vehicles or heavy plant cross, additional protection — concrete cable tile, ducting, or a deeper trench — is appropriate. Always identify ploughing depth and ground use with the customer; if the land use changes, the cable depth that was once adequate may not remain so.',
  },
  {
    question:
      'Does Section 711 apply to a one-day pop-up market or only to formal trade exhibitions?',
    answer:
      'Section 711 applies to "exhibitions, shows and stands" — both indoor (NEC, ExCeL) and outdoor pop-up structures with electrical installations. The duration does not move the line; the determining factor is whether the installation is a separately-designed, separately-certified temporary installation requiring initial verification per Part 6. A one-day market with mains-powered booths falls within Section 711. A truly tiny stall plugging a single appliance into a venue\'s permanent socket-outlet does not — it is using an existing fixed installation.',
  },
];

const BS7671Module7Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Outdoor & Agricultural Installations | BS 7671:2018+A4:2026 | Module 7.3',
    description:
      'How BS 7671:2018+A4:2026 applies to agricultural premises (Section 705), caravan parks (708), marinas (709), exhibitions (711) and fairgrounds (740) — TT earthing, livestock touch-current limits, supplementary bonding, RCD type selection and outdoor cable burial.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Updated for A4:2026"
            title="Outdoor and agricultural installations"
            description="The Part 7 special-location rules that apply when the location itself is the hazard — livestock touch-current, wet wash-down zones, salt-water marina pedestals, repeatedly-erected exhibition and fairground gear, and outdoor cable runs across uncertain ground."
            actions={
              <>
                <RegBadge>705.422</RegBadge>
                <RegBadge>708.553</RegBadge>
                <RegBadge>709.531</RegBadge>
                <AmendmentBadge regs={['705.422', '708.553']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 705 (agricultural / horticultural) is driven by livestock touch-current and fire risk: TT earthing is typical, 30 mA RCD on every final circuit, supplementary bonding throughout livestock zones, and IP/IK ratings selected for wash-down and impact.',
              'Section 708 (caravan parks) requires individual 30 mA RCD per BS EN 60309-2 outlet, individual overcurrent protection, no more than three socket-outlets per circuit, and IP44 minimum.',
              'Section 709 (marinas) layers Type A or Type B RCD selection (smooth DC residuals from on-board power-electronics), isolation transformers for galvanic separation, and IP44+ pedestals.',
              'Section 711 (exhibitions / stands) and Section 740 (fairgrounds) treat every re-erection as a new installation requiring initial verification per Part 6, with heavy-duty flexible cables and pre-opening functional tests.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify which Part 7 section applies — Section 705, 708, 709, 711 or 740 — based on the actual environment and end-use.',
              'Explain why agricultural premises typically use TT earthing, and apply Reg 411.5.3 (Ra x I_dn ≤ 50 V) to a livestock-zone calculation.',
              'State the differences between human and livestock touch-current limits, and design supplementary bonding for a stock zone per Section 705.',
              'Specify the socket-outlet, RCD and circuit topology for a caravan park pitch under Reg 708.553.',
              'Pick the correct RCD type at a marina pedestal under Reg 709.531, accounting for on-board inverters, lithium chargers and isolation-transformer practice.',
              'Apply Section 711 (exhibitions) and Section 740 (fairgrounds) inspection and functional-test requirements to repeatedly-erected temporary installations.',
              'Specify outdoor cable burial depth, mechanical protection and bonding to outbuildings under general BS 7671 rules and the relevant Part 7 section.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Section 705 — agricultural &amp; horticultural premises</ContentEyebrow>

          <ConceptBlock
            title="Why agricultural is its own special location"
            plainEnglish="Livestock are easier to electrocute than humans, agricultural buildings burn easily (dust, fodder, dry bedding), wash-downs are routine, and rodents chew cables. Section 705 is the rulebook that adapts BS 7671 to that environment."
            onSite="The trigger is the presence of livestock or agricultural processing, not the rural address. A milking parlour, pig finisher, equestrian indoor school or a grain dryer is in scope. A farmhouse kitchen with no stock and no processing is not — it reverts to general BS 7671 rules."
          >
            <p>
              Section 705 covers agricultural and horticultural premises — buildings and parts of
              buildings where livestock are kept, fodder is processed or stored, or grain and
              produce are dried or stored. The chapter layers extra requirements on top of the
              general BS 7671 rules: stricter touch-current control through extensive supplementary
              equipotential bonding, broad 30 mA RCD additional protection (not just sockets),
              elevated fire-risk countermeasures per Reg 705.422, and IP / IK ratings selected for
              wash-down and physical impact.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <ConceptBlock
            title="Why TT is the typical agricultural earthing arrangement"
            plainEnglish="DNOs refuse to give an agricultural premise a PME (TN-C-S) earth because an open-PEN fault would drive the MET — and every Class I metal part bonded to it — towards line voltage. With livestock standing on wet conductive floors, that elevated potential is lethal."
            onSite="On a refused PME, the designer installs a separate earth electrode (rod, rod-array or earth mat) and runs the installation as TT. ADS is delivered by RCDs (Reg 411.5.3, Ra x I_dn ≤ 50 V). Practical designs aim for Ra well below the calculated maximum — typically below 100 ohms — to leave headroom for soil-moisture variation across seasons."
          >
            <p>
              The animal-touch-current logic is the design driver. A standing human has a body
              resistance dominated by footwear and skin and contacts earth through one or two feet.
              A cow standing in a milking parlour has four hooves on a wet conductive floor and a
              body that conducts well across the chest. Body resistance is dramatically lower;
              lethal current threshold is dramatically lower. The same touch-voltage that a person
              would not register can disable or kill a cow. Section 705.411.1 builds on Reg 411 by
              tightening the touch-voltage limits and the equipotential-bonding obligations
              specifically to address this asymmetry.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 705.422 — Fire risk in agricultural and horticultural premises"
            clause="Where the risk of fire is increased, electrical equipment shall be selected and erected to limit the risk of ignition. In particular, every final circuit shall be provided with additional protection by means of an RCD with a rated residual operating current not exceeding 30 mA, and arc-fault detection devices shall be considered for circuits in locations where flammable materials are present."
            meaning="Fire-driven, not just shock-driven. Agricultural buildings combine combustible dust, fodder and bedding with rodent-damaged cables and arcing accessories. The response is 30 mA RCDs across all final circuits (not just sockets), AFDDs strongly considered (and mandatory under A4 Reg 421.1.7 for some agricultural high-risk locations), and good cable management to keep rodents off."
            cite="BS 7671:2018+A4:2026, Reg 705.422 (Section 705)"
          />

          <ConceptBlock
            title="Supplementary equipotential bonding — the livestock-zone obligation"
            plainEnglish="In a livestock zone, every metal part within reach of an animal — stall railings, drinkers, milking-cluster supports, structural steel, floor grids — is bonded together back to the MET. If a fault drives any one of them above earth, they all rise together, so there is no touch-voltage between simultaneously-touchable surfaces."
            onSite="On a new milking parlour, the equipotential bonding plan is drawn before the slab is poured: a bonding mesh embedded in the floor, brought out at every stall railing, every drinker, the metal stalls themselves and the milking-cluster supports, then run back to the MET on a 10 mm² (or larger) bonding conductor. Cable-tile or duct any bonding cable that crosses livestock movement paths."
          >
            <p>
              The Section 705 supplementary-bonding network is more aggressive than a standard
              domestic supplementary bond. It includes (a) every exposed-conductive-part (motor
              frames, lighting bodies, control panels), (b) every extraneous-conductive-part within
              stock reach (stall railings, drinkers, water troughs, structural steel, metal grids
              embedded in floors), and (c) any equipotential floor grid installed specifically to
              deal with stock touch-current. All bonded back to the MET, with cross-section per Reg
              544.2 (10 mm² is common for the main supplementary network in a livestock zone, with 4
              mm² minimum for unprotected branches and 2.5 mm² minimum for mechanically-protected
              branches).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 708 — caravan / camping parks</ContentEyebrow>

          <ConceptBlock
            title="Pitch electrical supplies — the Reg 708.553 design package"
            plainEnglish="A caravan park is a TT installation feeding many wet, outdoor, repeatedly-connected sockets. Reg 708.553 standardises the pitch supply: industrial BS EN 60309-2 connector, individual 30 mA RCD, individual MCB, no more than three outlets per circuit."
            onSite="Each pitch typically gets a 16 A blue commando outlet at 0.5-1.5 m height, IP44 minimum, in a pedestal with a hinged cover. Behind the pedestal: one MCB and one 30 mA RCD per outlet (or RCBO per outlet). Cable to pedestals is SWA buried at typical depths; the pedestals themselves are on a TT earth electrode shared with the rest of the park installation, sized for the aggregated Ra requirement."
          >
            <p>
              The choice of BS EN 60309-2 (the blue 16 A commando socket) is deliberate: IP44
              minimum (resistant to splashing water from any direction), a positive locking action
              (the lid stays shut, the plug locks in), and a standardised interface used across
              European caravan / motorhome equipment. The maximum-three-outlets-per-circuit rule
              (Reg 708.553.1.13) keeps the discrimination tractable — a single faulty tourer cannot
              take down half the site. Mounting height (0.5-1.5 m above ground) keeps the outlet out
              of standing water and within easy reach.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 708.553.1.13 — Caravan pitch socket-outlets"
            clause="Each socket-outlet shall be provided with individual overcurrent protection. Each socket-outlet shall be provided with individual additional protection by an RCD having a rated residual operating current not exceeding 30 mA. Not more than three socket-outlets shall be supplied from any one final circuit."
            meaning="Individual RCD per outlet (not shared), individual MCB per outlet, max three outlets per circuit. The architecture prevents one tripping caravan from disabling neighbouring pitches and gives the operator simple per-pitch isolation for maintenance."
            cite="BS 7671:2018+A4:2026, Reg 708.553.1.13 (Section 708)"
          />

          <ConceptBlock
            title="On-board caravan / motorhome electrics — separate scope"
            plainEnglish="The caravan park installation stops at the pitch socket. The 230 V and 12 V wiring inside the caravan is governed by separate standards (BS EN 1648-2 for habitation, plus the touring-caravan habitation regs). The two are designed together but certified separately."
            onSite="An EIC for the caravan park does not warrant the caravan plugged into it. When the customer asks 'is my caravan safe?', the answer involves two certifications: the park-side EIC (your work, BS 7671) and the caravan habitation cert (the caravan manufacturer / inspection body's work, BS EN 1648-2)."
          />

          <SectionRule />

          <ContentEyebrow>Section 709 — marinas &amp; similar locations</ContentEyebrow>

          <ConceptBlock
            title="Why marinas need their own chapter"
            plainEnglish="Wet environment, salt-water corrosion, vessels with on-board power electronics, and a population of bonded steel hulls floating in conductive seawater. Each of those creates a hazard a domestic installation never sees."
            onSite="The marina installation runs from the shore-side LV switchboard, out along the pontoons (cable trays or buried SWA), to pedestals at each berth. Each pedestal carries one or more BS EN 60309-2 outlets, IP44 minimum, with individual RCD + MCB per outlet. Salt spray is constant — accessory selection prioritises corrosion-resistant materials (marine-grade stainless, polycarbonate, IP55 / IP56 enclosures where exposed to direct spray)."
          >
            <p>
              Reg 709 layers the standard 30 mA RCD additional-protection rule with three
              marina-specific concerns. (1) Smooth DC residuals from on-board inverters, lithium
              chargers and DC-DC converters can defeat Type A RCDs — Type B RCDs at the pedestal, or
              RDC-DD upstream of Type A, or an isolation transformer per berth, all mitigate this.
              (2) Galvanic coupling between bonded steel hulls floating in seawater accelerates
              corrosion — isolation transformers at the pedestal break the galvanic path while
              preserving the safety earth. (3) Mechanical impact and salt corrosion drive accessory
              selection to higher IP and IK ratings than would suffice on land.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 709.531 — Devices for protection against electric shock by automatic disconnection of supply"
            clause="Each socket-outlet shall be provided with individual additional protection by means of an RCD having a rated residual operating current not exceeding 30 mA. Where smooth DC residual currents may be produced by equipment connected to the supply, the type of RCD shall be selected accordingly."
            meaning="Per-outlet 30 mA RCD is the default. Where on-board equipment (inverters, lithium chargers, VSDs) can produce smooth DC residual, Type B RCDs (or Type A with upstream RDC-DD, or isolation transformers) are required. The designer must consider what is plausibly going to be plugged in — modern boats are NOT a passive AC load."
            cite="BS 7671:2018+A4:2026, Reg 709.531 (Section 709)"
          />

          <ConceptBlock
            title="Isolation transformers — the marina-specific tool"
            plainEnglish="An isolation transformer at the pedestal breaks the direct conductive path between the supply network and the boat. Each vessel becomes a galvanically-isolated island: faults inside the boat do not feed earth current back through neighbouring vessels' bonded hulls."
            onSite="Isolation transformers add cost (per-pedestal) but solve two problems at once: galvanic corrosion (electrolytic action between bonded hulls in conductive seawater) and the smooth-DC-residual / Type-B requirement (the transformer secondary is its own electrical island, so a Type A RCD on the secondary side is sufficient against on-board AC residuals). High-end marinas specify per-berth isolation transformers as standard practice."
          />

          <SectionRule />

          <ContentEyebrow>Section 711 — exhibitions, shows &amp; stands</ContentEyebrow>

          <ConceptBlock
            title="Temporary installations are NOT a relaxation of BS 7671"
            plainEnglish="Section 711 doesn't loosen the rules — it tightens the inspection regime. Equipment is repeatedly assembled, transported and re-energised, so the cable / connector / RCD wear rate is high. Every re-erection is treated as a new installation."
            onSite="Trade-show and exhibition stands at NEC, ExCeL, Olympia and similar venues all follow the same pattern: the venue provides a permanent fixed supply with industrial connectors at distribution points; each stand brings its own temporary installation off one of those connectors. Stand wiring, cable management, RCD per circuit, IP rating, accessory selection — all per Section 711 and the venue's own technical regulations."
          >
            <p>
              The chapter applies the standard Part 4 protective-measure rules — ADS, additional
              protection by 30 mA RCDs on all socket-outlet and luminaire circuits, IP-rated
              equipment for the location class — and adds Section 711.6 inspection requirements
              specific to the temporary nature of the install. Heavy-duty flexible cables (HO7RN-F
              or equivalent), BS EN 60309-2 connectors (the same family as caravan parks and
              marinas), and a documented pre-opening functional test of every RCD and CPC continuity
              check before the public is admitted.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <ConceptBlock
            title="Section 740 — fairgrounds, amusement parks, circuses"
            plainEnglish="A separate special-location chapter for repeatedly-erected ride / booth / circus installations. Heavier mechanical demands than Section 711 (ride loads, transport vibration), with the same commitment to per-erection initial verification."
            onSite="Section 740 governs the temporary supply to rides and booths — the heavy-duty flexible feed cable (HO7RN-F or equivalent), BS EN 60309-2 connectors, 30 mA RCD per circuit, IP44 minimum, and inspection / functional test of RCDs before each opening. The ride manufacturer's own type-test certification covers the on-ride electrical equipment; Section 740 covers the supply up to the ride."
          >
            <p>
              Reg 740.521 specifies the flexible-cable type (heavy-duty HO7RN-F or equivalent
              rubber-sheathed flexible). Reg 740.55 covers connector and accessory selection. Reg
              740.6 ties the inspection regime to the operational cycle: every time the fairground
              is erected, the initial verification is performed before the first opening; functional
              tests of every RCD and visual checks of cables and connectors are performed before
              each opening day. The cert is an EIC for the temporary installation, signed by a
              skilled person (electrically), held on site for the duration of the event.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Outdoor general — IP, IK, burial &amp; bonding to outbuildings
          </ContentEyebrow>

          <ConceptBlock
            title="Cable burial depth, mechanical protection &amp; marker tape"
            plainEnglish="BS 7671 Reg 522.8.10 says cables shall be at sufficient depth to avoid mechanical damage having regard to anticipated disturbance. The numbers come from industry practice and the DNO ENA standards, not from a single mandatory depth in the Wiring Regs."
            onSite="UK industry practice: 450-600 mm in cultivated ground (above plough-depth), with marker tape laid 150 mm above the cable. Where vehicles or heavy plant cross, add cable tile, ducting or a deeper trench. SWA is standard for outdoor buried runs because the steel armour is the mechanical-impact tolerance and a low-impedance fault path. PVC-insulated SWA in a dry duct in non-cultivated ground can go shallower; in cultivated farmland with a 450 mm plough depth, design for at least 600 mm cover."
          >
            <p>
              For agricultural runs, also consider rodent damage at building entries (use a rigid
              duct or sealed gland rather than letting an SWA enter through a chewed cable hole) and
              frost heave (deep trenches in some soils can experience seasonal movement; an SWA is
              forgiving but a flexible cable is not). For caravan-park and marina installations, the
              run is typically along buried or tray-mounted SWA from the LV switchboard out to the
              pedestals — depth and mechanical protection follow the same general rules, with
              attention to ground-water table on coastal sites.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <ConceptBlock
            title="Bonding to outbuildings &amp; Section 705 zones"
            plainEnglish="A new outbuilding (workshop, barn, garage) typically gets its own sub-distribution and may need its own MET, with main protective bonding to incoming services and a CPC continuous from the supplying installation."
            onSite="Where the supplying installation is TN-C-S and the outbuilding is in a livestock zone, the choice is to either (a) export the TN-C-S earth to the outbuilding (rare on agricultural — DNO and risk-assessment usually prevent this) or (b) treat the outbuilding as TT, with its own earth electrode, and break the earth path between the buildings. Option (b) is the dominant agricultural choice."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Spec'ing an ordinary RCD on agricultural without considering AFDD &amp; fire risk"
            whatHappens="Designer fits a generic 30 mA Type A RCBO board in a milking parlour because 'sockets need 30 mA and that's done'. Reg 705.422 fire-risk requirements (30 mA RCDs on ALL final circuits, including lighting and motor circuits, plus AFDD consideration / requirement under A4 Reg 421.1.7 in high-fire-risk agricultural zones) are missed. EICR codes the install C2 — fire risk not adequately addressed."
            doInstead="Read Section 705 as a fire-AND-shock chapter. 30 mA RCD on every final circuit, not just sockets. Specify AFDDs in line with Reg 421.1.7 high-fire-risk zone requirements. Choose IP / IK ratings for the wash-down and impact environment. Document the fire-risk assessment that drove the protective device choice — not just 'standard domestic CU'."
          />

          <CommonMistake
            title="Ignoring livestock touch-current limits in the bonding design"
            whatHappens="Installer treats a stable-yard sub-board the same way as a domestic garage. Single 10 mm² main bond to the consumer unit; no supplementary bonding network in the stalls; metal stall railings, drinkers and structural steel are all separate from the MET. A CPC fault in a heat-lamp circuit drives the lamp body to ~115 V; a horse touching the lamp casing while in contact with the metal stall partition completes a chest-to-flank path through low-resistance hooves on a wet floor. The horse is killed by a fault that would not have hurt a human in the same scenario."
            doInstead="Section 705 supplementary bonding is comprehensive and stock-zone-wide: every exposed-conductive-part and every extraneous-conductive-part within reach of livestock is bonded together back to the MET, on conductors sized per Reg 544.2 (10 mm² main, 4 mm² unprotected branch, 2.5 mm² protected branch). In new builds, embed an equipotential floor grid in the slab and brings it out at every stall and drinker."
          />

          <CommonMistake
            title="Undersized earth electrode for a caravan-park TT installation"
            whatHappens="Single 1.2 m rod hammered into dry sandy soil at a coastal caravan park; measured Ra = 280 ohms. Designer does the maths: 280 x 0.03 = 8.4 V — well under 50 V — and signs off the cert. In summer the soil dries further; Ra drifts up to 900 ohms; a fault on a tourer is now intermittent and the RCD is operating at the edge of its sensitivity. EICR a year later flags Ra = 740 ohms; the install is recoded."
            doInstead="Design Ra with seasonal soil-resistivity headroom — practical aim below 100 ohms. Use multiple rods in parallel (or a deep-driven rod, or an earth mat) on dry, sandy or rocky ground. Document the measured Ra and the soil conditions on the day, and call out the recheck interval. A caravan park is a TT installation that lives outside in all weathers — the earth electrode that worked in March is not guaranteed to work in August."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Cattle-barn rewire under A4"
            situation="A 1990s 6-bay cattle barn has a damaged old-fashioned consumer unit at the dairy entrance, fed from the farmhouse on a TN-C-S sub-main. The customer wants a full rewire to current standards — wash-down sockets at every bay, milking-cluster motor supply, infrared heat lamps for calf rearing, lighting throughout, and a small office area at one end. Soil is heavy clay, water table 2 m below ground."
            whatToDo="(1) Talk to the DNO: confirm refusal of PME on the agricultural premise (expected). (2) Disconnect the existing sub-main from the farmhouse TN-C-S earth — bring 3-core SWA out, but use only the L and N; treat the barn as a separate TT installation. (3) Drive an earth electrode array (3-4 rods in parallel, 2.4 m each) at the barn — clay water table is favourable; aim Ra below 50 ohms measured. (4) New consumer unit: split-load with RCBO per circuit, 30 mA on every circuit (not just sockets) per Reg 705.422; AFDD-RCBOs on the heat-lamp and lighting circuits per Reg 421.1.7 high-fire-risk zone considerations. (5) Supplementary bonding network throughout the stock zone: 10 mm² main loop bonding all stall railings, drinkers, milking-cluster supports, embedded floor grid, structural steel, back to the barn MET. (6) Wash-down sockets: BS EN 60309-2 16 A blue commando, IP55 minimum, 1.0 m mounting height, individual 30 mA RCBO. (7) Document the fire-risk assessment, the TT design, the supplementary-bonding network, and the measured Ra / Zs / RCD operating times on the EIC. The cert references Section 705, Reg 411.5.3, Reg 705.422 and Reg 421.1.7 (A4)."
            whyItMatters="A cattle barn is a livestock-zone, fire-risk, wash-down, agricultural special location all at once. Treat it as 'just a domestic CU outside' and the cert is wrong on multiple counts: wrong earthing arrangement, undersized supplementary bonding, missing AFDDs, wrong IP rating on accessories. The customer's insurer will request the EIC after the inevitable claim — that EIC has to demonstrate Section 705 compliance, not generic Section 411 compliance."
          />

          <Scenario
            title="Marina shore-power install for a 30-berth pontoon"
            situation="A coastal marina is upgrading its 1990s shore-power pedestals. Mix of vessels: traditional sailboats (passive AC loads), modern motor cruisers with shore-power-fed lithium chargers and on-board inverters, one liveaboard catamaran with a 5 kW solar array, lithium house bank and AC-coupled inverter. Existing system is per-pedestal Type AC RCDs sharing a 100 mA upstream device — clearly non-compliant under current Reg 709 and the equipment realities."
            whatToDo="(1) Survey the load: at least 30% of berths now have power-electronics on board (lithium chargers, inverters, VSDs) plausibly producing smooth DC residuals. (2) Specify per-berth isolation transformers at every pedestal — solves smooth-DC by giving each berth its own galvanically-isolated secondary, AND solves galvanic corrosion between bonded hulls. (3) Per-outlet 30 mA Type A RCBOs on the secondary side of each isolation transformer (Type A is sufficient because the secondary is its own AC island). (4) BS EN 60309-2 16 A or 32 A blue commando outlets, IP55 (direct sea-spray exposure), marine-grade stainless / polycarbonate enclosures. (5) SWA pontoon distribution from a shore-side TT switchboard with its own earth electrode network — not the public TN-C-S supply (DNO has refused PME on this site). (6) Document the per-berth electrical separation, the smooth-DC-residual mitigation, the corrosion mitigation, and the salt-spray IP / corrosion-resistance design choices. EIC references Section 709, Reg 709.531, the isolation-transformer architecture, and the manufacturers' instructions for the on-board equipment driving the Type A choice."
            whyItMatters="Marinas are the example par excellence of a mixed-load, mixed-vintage vessel population on a single supply. The shared-RCD architecture works in 1990; it does not work today. The isolation-transformer-per-berth design solves multiple problems at once: smooth-DC immunity, galvanic-corrosion mitigation, per-berth fault isolation. It costs more — and it is the right answer when liveaboards with lithium banks are plugged in next to wooden sailboats."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — picking the Section</ContentEyebrow>

          <ConceptBlock
            title="Section 705 vs 708 vs 709 vs 711 vs 740"
            plainEnglish="The wrong Part 7 reference at the top of the cert means the wrong protective measures, the wrong RCD type, the wrong inspection regime. Pick by the actual environment, not the address."
            onSite="(1) Livestock present, or fodder / grain processing on site = Section 705. (2) Caravan / motorhome / camping pitch electrical supply = Section 708. (3) Berth electrical supply at a marina, harbour or similar = Section 709. (4) Trade exhibition stand, indoor or outdoor pop-up market, or temporary public-display installation = Section 711. (5) Fairground ride, circus, mobile amusement booth = Section 740. Multiple sections can apply to a single site (a fairground inside an exhibition centre engages 711 and 740; a coastal caravan park may engage 708 and parts of 709 if it has a small jetty)."
          >
            <p>
              The question that drives the choice is 'what is the safety-critical hazard specific to
              this location?'. For Section 705 it is livestock touch-current and fire risk; for 708
              it is repeatedly-connected wet outdoor sockets feeding mobile accommodation; for 709
              it is salt-water, on-board power-electronics and galvanic coupling; for 711 it is
              repeated dismantling and re-erection of public-facing installations; for 740 it is
              heavy mechanical demand and ride-supply repeatability. Each chapter is a focused
              response to one of those hazards, layered on top of the general BS 7671
              protective-measure rules.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The four design questions for outdoor / agricultural work"
            plainEnglish="(1) Is the supply TT or TN? (2) Are there livestock present? (3) Is the location wet, dusty or corrosive? (4) Will mobile equipment be used outdoors?"
            onSite="(1) TT is typical — most rural / agricultural / marina supplies are TT. Apply Reg 411.5.3 RCD-led ADS. (2) Livestock — Section 705 supplementary bonding required throughout, stock-touch limits drive electrode design. (3) Wet / corrosive — IP65+ enclosures, marine-grade fixings near sea, PVC conduit not metal. (4) Mobile equipment — Reg 411.3.3(c) — 30 mA RCD additional protection mandatory, no exception."
          >
            <p>
              Walk the four questions in order on every job; each answer cascades into design
              choices. Skip any of them and the install fails on first inspection — Section 705
              compliance is heavily inspector-tested because the consequences of getting it wrong
              (livestock fatalities, marina shock-bath incidents, caravan-park boil-out events) are
              severe and visible.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Salt-water environments — material selection"
            plainEnglish="Salt accelerates corrosion of every metal. Standard galvanised steel rusts in months at a marina; even stainless 304 pits within 5 years. Specify 316 stainless or A4 marine-grade fixings, marine-grade plastics for enclosures, tinned-copper conductors where exposed."
            onSite="Marinas and coastal installations are environmental category AF3-AF4 (substantial corrosion). Cable: SWA with thermoplastic outer plus an HDPE oversheath for direct contact, or proprietary marine-rated cables. Enclosures: GRP (glass-reinforced polyester) over metal. Fixings: A4-grade stainless throughout. Bonding: tinned copper where exposed to salt spray. Document the material spec on the design sheet — corrosion resistance is a Reg 522.10 design check."
          >
            <p>
              The cost premium for marine-grade materials is real but pays back over the
              installation lifetime. A standard galvanised SWA install in a marina has typically 5-7
              year service life before replacement; marine-grade install runs 20+ years. The
              customer&apos;s lifecycle cost is the conversation, not just first-fit cost.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Section 705 (agricultural) is driven by livestock touch-current and fire risk: TT typical, 30 mA RCD on every final circuit (Reg 705.422), supplementary bonding throughout livestock zones, IP / IK selection for wash-down and impact, AFDD consideration under A4 Reg 421.1.7.',
              'Section 708 (caravan parks): individual 30 mA RCD per BS EN 60309-2 outlet, individual MCB per outlet, max three outlets per circuit (Reg 708.553.1.13), IP44 minimum, 0.5-1.5 m mounting height.',
              'Section 709 (marinas): standard 30 mA RCD per outlet; Type B (or RDC-DD, or per-berth isolation transformer) where on-board inverters / lithium chargers can produce smooth DC residuals (Reg 709.531). Isolation transformers also mitigate galvanic corrosion.',
              'Section 711 (exhibitions / stands) and Section 740 (fairgrounds) treat each re-erection as a new installation requiring initial verification per Part 6 — heavy-duty flexible cables, BS EN 60309-2 connectors, pre-opening functional tests of every RCD and CPC.',
              'Outdoor general: cable burial depth driven by Reg 522.8.10 (sufficient to avoid mechanical damage) — UK practice 450-600 mm cultivated, marker tape and additional protection where vehicles cross. Bonding to outbuildings: TT typical for agricultural sub-buildings.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.4 Medical, commercial, industrial
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module7Section3;
