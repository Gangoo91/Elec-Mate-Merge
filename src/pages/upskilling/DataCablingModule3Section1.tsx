import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m3s1-core-cladding',
    question:
      'A drum is labelled "9/125 µm". What does that pair of numbers tell you about the fibre, and what fibre type is it?',
    options: [
      'A multimode fibre with a 9 µm cladding and a 125 µm protective coating.',
      'A single-mode fibre — 9 µm core, 125 µm cladding — for long reach and high bandwidth.',
      'The cable’s pulling-tension limits, expressed in newtons.',
      'The cable’s maximum bend radius, expressed in millimetres.',
    ],
    correctIndex: 1,
    explanation:
      'The pair x/y is core diameter / cladding diameter, both in micrometres. 9/125 is single-mode fibre (SMF) — the small core forces light into one propagation mode, so there is no modal dispersion and the bandwidth-distance product is huge. Multimode is 50/125 (OM2-OM5) or 62.5/125 (OM1) — the larger core admits multiple modes and is cheaper to terminate, but modal dispersion limits reach. Cladding diameter is 125 µm in every standard telecoms fibre — that is what fits the standard ferrule, splice cleaver and connector. The 9 / 50 / 62.5 number is the one that defines the fibre.',
  },
  {
    id: 'datacabling-m3s1-om-grade-reach',
    question:
      'A 175 m horizontal fibre run will carry 10GBASE-SR (10 Gbps Ethernet over multimode at 850 nm). Which OM grade is the minimum that can deliver this reach?',
    options: [
      'OM1 — reaches only 33 m at 10 GbE.',
      'OM2 — reaches only 82 m at 10 GbE.',
      'OM3 — reaches 300 m at 10 GbE at 850 nm.',
      'OS2 single-mode, taken as mandatory above 100 m.',
    ],
    correctIndex: 2,
    explanation:
      'OM3 (laser-optimised 50/125 VCSEL multimode, aqua jacket) supports 10GBASE-SR to 300 m at 850 nm — comfortably absorbs 175 m. OM4 takes it to 400 m. OM1 (33 m) and OM2 (82 m) are both short of 175 m. Single-mode is the long-reach option but is not "mandatory" over 100 m — multimode at OM3 / OM4 / OM5 is the standard choice within and between buildings on a campus, and is cheaper to terminate (LED / VCSEL transceivers vs. DFB lasers for SM). Pick the lowest grade that absorbs the reach with headroom; document the choice against the manifest reach table.',
  },
  {
    id: 'datacabling-m3s1-jacket-colour',
    question:
      'You arrive on site to a coil of fibre with a lime-green outer jacket. What does the colour tell you?',
    options: [
      'It is single-mode OS2.',
      'It is OM5 wide-band multimode (50/125 µm, SWDM-capable, lime-green jacket).',
      'It is composite cable — fibre plus copper.',
      'It is plenum-rated CMP.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-598-D and the BS EN 50173 / ISO 11801 industry conventions assign jacket colours by fibre type: OM1 / OM2 = orange; OM3 / OM4 = aqua (OM4 sometimes Erika violet for differentiation); OM5 = lime green; OS1 / OS1a / OS2 single-mode = yellow. Colour is a quick on-site check — but always confirm against the cable print legend, because mis-jacketed cable does occur and the jacket convention is industry practice rather than a hard regulation.',
  },
  {
    id: 'datacabling-m3s1-separate-buildings',
    question:
      'A campus job runs a data link between two buildings on different earth electrodes. Which BS 7671:2018+A4:2026 clause states the preferred medium for this link, and why?',
    options: [
      '§411.3.1.1 — protective earthing of exposed-conductive-parts.',
      '§444.4.9 — separate buildings: prefer metal-free fibre, as a copper link would carry stray potentials between them.',
      '§528.3.5 — no cable installed within lift (elevator) wells.',
      '§716.521.101 — the permitted PoE cable Category list.',
    ],
    correctIndex: 1,
    explanation:
      '§444.4.9 (verbatim from the A4:2026 RAG): "Where different buildings have separate equipotential bonding systems, metal-free optical fibre cables or other non-conducting systems are preferred for signal and data transmission." Fibre is non-conductive end to end — no metallic path means no stray-current return, no voltage difference imported, no equipotential headache. A copper inter-building link would need a TT-system bypass conductor (§444.4.4 — minimum 16 mm² Cu) or single-point bonding, which is feasible but fragile. Metal-free fibre is the cleaner answer and the regulator-preferred answer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the fundamental optical difference between single-mode and multimode fibre that drives every other characteristic?',
    options: [
      'Single-mode uses a glass core; multimode uses a plastic optical core.',
      'Multimode runs at a higher data rate than single-mode over any distance.',
      'A 9 µm single-mode core admits one mode (no modal dispersion); a 50/62.5 µm multimode core admits many.',
      'Single-mode cables carry more individual fibre strands than multimode.',
    ],
    correctAnswer: 2,
    explanation:
      'Mode count is the root cause. A 9 µm SMF core (relative to a ~1310 / 1550 nm wavelength) admits only the fundamental mode — no modal dispersion, just chromatic and polarisation-mode dispersion, so the bandwidth-distance product runs into thousands of GHz·km. A 50 / 62.5 µm MMF core admits hundreds of modes — each takes a slightly different path length, so a single pulse spreads in time (modal dispersion) and the bandwidth-distance product is bounded. SMF wins on reach and bandwidth; MMF wins on transceiver cost and termination tolerance.',
  },
  {
    id: 2,
    question: 'What does "OM3" tell you about the fibre on the drum?',
    options: [
      'Laser-optimised 50/125 µm multimode (VCSEL at 850 nm, 2000 MHz·km) — 10GBASE-SR to 300 m, aqua jacket.',
      'A single-mode fibre rated at 0.3 dB/km maximum attenuation.',
      'An outer jacket diameter of exactly 3 mm.',
      'A cable containing three individual fibre strands.',
    ],
    correctAnswer: 0,
    explanation:
      'OM grades are the multimode fibre performance classification. OM1 (62.5/125, LED) and OM2 (50/125, LED) are legacy. OM3 / OM4 / OM5 are laser-optimised 50/125 multimode for VCSEL transceivers at 850 nm. OM3 supports 10G to 300 m, OM4 to 400 m, OM5 (wide-band, SWDM-capable across 850-953 nm) to 400 m at 10 G with parallel-optic and SWDM support for 40/100 G. OM3 / OM4 are the standard 10G-to-the-floor choice; OM5 is an emerging spec for SWDM-based 40/100 G short reach.',
  },
  {
    id: 3,
    question: 'What is the difference between OS1, OS1a and OS2 single-mode fibre?',
    options: [
      'They are three different core diameters within the single-mode family.',
      'OS1 is a multimode grade while OS2 is single-mode.',
      'OS2 is reserved exclusively for fibre-to-the-home access networks.',
      'All 9/125 µm single-mode — OS1/OS1a tight-buffered indoor; OS2 loose-tube outside-plant, ≤ 0.4 dB/km.',
    ],
    correctAnswer: 3,
    explanation:
      'All three are 9/125 µm single-mode — the difference is construction and attenuation budget. OS1 / OS1a are tight-buffered for indoor / short-reach campus use (≤ 10 km typical). OS1a adds low-water-peak compliance so all transmission bands work. OS2 is loose-tube outside-plant fibre with the lowest attenuation and the longest reach — the standard for outdoor and inter-building runs. Choosing OS1a vs OS2 indoors is mostly an attenuation-budget and construction-style decision; choosing OS2 outdoors is essentially mandatory.',
  },
  {
    id: 4,
    question:
      'A campus runs a 280 m fibre link between two buildings on a metal-free outdoor route. The link will carry 10GBASE-LR. Which fibre is the textbook choice?',
    options: [
      'OM1 multimode in an outdoor loose-tube construction.',
      'OM3 laser-optimised multimode with VCSEL optics.',
      'OS2 single-mode — 10GBASE-LR is a 1310 nm single-mode service multimode cannot carry.',
      'Cat6A copper fitted with inter-building surge protection.',
    ],
    correctAnswer: 2,
    explanation:
      'The transceiver picks the fibre. 10GBASE-LR is single-mode at 1310 nm — multimode is electrically incompatible with the optics. OS2 is the outside-plant single-mode standard. The reach (280 m) is trivial for OS2. BS 7671 §444.4.9 (verbatim A4:2026): "Where different buildings have separate equipotential bonding systems, metal-free optical fibre cables or other non-conducting systems are preferred for signal and data transmission."',
  },
  {
    id: 5,
    question:
      'Why does BS 7671 §444.4.9 prefer metal-free fibre between buildings rather than just any optical fibre?',
    options: [
      'Metallic armour or strength members form a conductor between buildings on different earths, importing stray current.',
      'Metal armour is mechanically too fragile for outdoor inter-building duct routes.',
      'Fibre with metallic elements simply costs more than all-dielectric fibre.',
      'It is only a jacket-colour and labelling convention, not a real concern.',
    ],
    correctAnswer: 0,
    explanation:
      'The clause exists to break the metallic path between buildings. Steel-armoured ("ICCS" or "loose-tube armoured") fibre is fine within one building, but between buildings on separate equipotential systems, the armour becomes a long-conductor liability. All-dielectric self-supporting (ADSS) cable, FRP / aramid strength members and non-metallic armour are the routine answers. Where armoured fibre must be used between buildings (mechanical reasons), the armour ends are bonded to local earth at each building entry — but the metal-free option is cleaner, and the clause prefers it.',
  },
  {
    id: 6,
    question:
      'You have a project that needs 100 G to a high-density AP cluster on a 120 m run inside a building. Which fibre choice is most cost-effective and forward-looking?',
    options: [
      'OM3 with 100GBASE-SR4 parallel optics, which only reaches 100 m — short of the 120 m run.',
      'OS2 single-mode, taken as mandatory for any optical link over 100 m.',
      'Cat 8 copper running 25 G, taken as a viable 120 m channel.',
      'OM4 with 100GBASE-SR4, or OM5 with SWDM4 — both reach 150 m; OM5 adds an SWDM upgrade path.',
    ],
    correctAnswer: 3,
    explanation:
      'Multimode supports 100 G in-building at modest cost. OM4 with 100GBASE-SR4 (4-pair parallel optics over MTP/MPO) reaches 150 m. OM5 wide-band MMF supports SWDM4 on a single duplex pair, reaching ~150 m at 100 G — same fibre count as 10 G LC duplex, future-proof to multi-wavelength upgrades. Single-mode is overkill for in-building campus and adds optics cost. Copper at 25 G (Cat 8) is data-centre top-of-rack only — limited to 30 m channel.',
  },
  {
    id: 7,
    question:
      'Why is the cladding diameter standardised at 125 µm across every telecoms fibre — single-mode or multimode, OM1 through OS2?',
    options: [
      'It is simply the strongest glass cross-section available to manufacturers.',
      'It is a dimension specifically required by BS 7671 for telecoms fibre.',
      'It fits the standard ferrules, cleavers and splicer V-grooves, so tooling is universal across grades.',
      'It is chosen to match the optical transmission wavelength of the fibre.',
    ],
    correctAnswer: 2,
    explanation:
      'Cladding standardisation is the reason a single set of connectors, splice trays, mechanical splices and cleavers works across the whole product family. The ferrule is the precision part — 1.25 mm for LC, 2.5 mm for SC / ST / FC — and it bores down to accept a 125 µm cladding. Change the core (9 / 50 / 62.5 µm) and the optics change; the mechanical interface stays the same. This is one of the quiet reasons fibre installation is far simpler than it would otherwise be.',
  },
  {
    id: 8,
    question:
      'Which BS 7671 clause applies to fibre cable supports — even though fibre carries no electrical current?',
    options: [
      '§521.10.202 — support against premature collapse in fire; non-metallic ties cannot be the sole support.',
      'No clause applies — optical fibre is exempt from support rules.',
      '§444.4.9 — the separate-buildings metal-free fibre preference.',
      '§411.3.1 — protective earthing and automatic disconnection.',
    ],
    correctAnswer: 0,
    explanation:
      '§521.10.202 (verbatim from RAG) is medium-agnostic — it applies to "wiring systems", and fibre is a wiring system. NOTE 3 explicitly precludes non-metallic cable clips or cable ties as the SOLE means of support where cables are clipped direct to exposed surfaces or suspended under cable tray. Steel or copper clips / saddles / ties (NOTE 4) meet the requirement. Cables in steel containment systems are deemed to comply (NOTE 2). For fibre this matters because it is often pulled through the same routes as copper — and a non-compliant support method on either medium is non-compliant.',
  },
  {
    id: 9,
    question:
      'What is the primary technical reason multimode fibre cannot match single-mode\u2019s reach at high bit rates?',
    options: [
      'The multimode glass is inherently dirtier and harder to keep clean.',
      'Multimode fibre has substantially higher per-kilometre attenuation.',
      'Multimode systems operate at a shorter, more lossy transmission wavelength.',
      'Modal dispersion — the many modes arrive at slightly different times, smearing the pulse as bit rate rises.',
    ],
    correctAnswer: 3,
    explanation:
      'Modal dispersion is the dominant limit on multimode reach at high data rates. The bandwidth-distance product (e.g. 4700 MHz·km for OM4) is the contract: at 10 G, the symbol time is so short that even small modal-delay spreads degrade the eye. OM3 / OM4 / OM5 attack this with laser-optimised refractive-index profiles (graded-index, tightly controlled) to equalise mode delays. SMF sidesteps the problem entirely — only one mode propagates, so modal dispersion is by construction zero.',
  },
  {
    id: 10,
    question:
      'A junior says: "fibre carries no current — laser safety is just a sticker, not a real concern." How do you correct them?',
    options: [
      'Agree with them — fibre is electrically passive, so the laser sticker is just a formality.',
      'Reassure them that any telecoms laser is eye-safe so long as it is under 1 mW.',
      'BS EN 60825-2 governs fibre laser safety — invisible IR can damage the retina; never inspect an active fibre by eye.',
      'Tell them only fibre amplifiers, not ordinary transceivers, pose any eye hazard.',
    ],
    correctAnswer: 2,
    explanation:
      'Fibre safety is governed by BS EN 60825-2. The infrared wavelengths used in telecoms (850 / 1310 / 1550 nm) are entirely invisible — there is no blink reflex, no heat sensation at low power, no warning. Class 1M sources (caution under magnification) are common; Class 3R appears in long-haul / amplified systems. The discipline is: physically darken before inspection (port covers on, transceivers down, link de-bounced), use a fibre microscope or video probe (never the naked eye), keep ports capped when not patched, and always assume a connector face you cannot account for is live.',
  },
];

const faqs = [
  {
    question: 'Is fibre always the right answer over copper?',
    answer: (
      <>
        No. Fibre wins on reach (long), bandwidth (very high), EMI immunity (total) and electrical
        isolation (especially between buildings — see BS 7671 §444.4.9). Copper wins on cost (per
        port at the desk), simplicity (RJ45 termination on site), and powering (PoE delivers up to
        90 W per IEEE 802.3bt). The mainstream UK 2026 commercial fit-out is fibre backbone + Cat6A
        copper horizontal — fibre where its strengths matter, copper to the desk where PoE and
        termination cost favour it. Fibre-to-the-edge is becoming common for high-density AP /
        camera deployments, broadcast, data-centre and lab environments.
      </>
    ),
  },
  {
    question: 'What is the difference between "tight-buffered" and "loose-tube" fibre?',
    answer: (
      <>
        Tight-buffered cable bonds a 900 µm coloured buffer directly around each 250 µm primary-
        coated fibre, then bundles the buffered fibres inside an outer jacket with strength members.
        It is easy to terminate (the buffer is the termination interface) and is the standard for
        indoor patch cables, pigtails, and short building-to-building runs. Loose- tube cable holds
        250 µm primary-coated fibres loose inside gel-filled or dry-filled polymer tubes, with the
        strength members in the cable construction. It tolerates temperature swings and pulling
        tensions much better — the standard for outside-plant cables, OS2 long-haul and
        direct-buried runs. OS1 / OS1a are typically tight-buffered; OS2 is loose-tube. Both can be
        armoured or all-dielectric.
      </>
    ),
  },
  {
    question: 'Does fibre need any kind of earthing or bonding?',
    answer: (
      <>
        All-dielectric metal-free fibre — no. There is no metallic path to bond. Armoured fibre or
        fibre with metallic strength members — yes, the metallic element is bonded to the local ICT
        bonding network at each building entry. BS EN 50310 covers the bonding network for ICT
        installations; BS 7671:2018+A4:2026 §545 (entirely new in A4:2026,{' '}
        <AmendmentBadge regs={['545']} edition="A4:2026" />) covers ICT functional earthing of
        active equipment. The cleanest design between buildings is metal-free fibre under §444.4.9 —
        no metallic path to bond at all.
      </>
    ),
  },
  {
    question: 'What jacket / sheath ratings should I look for on UK projects?',
    answer: (
      <>
        UK construction-products regime (BS EN 50575 / Construction Products Regulation) classifies
        cables by reaction-to-fire performance: Eca, Dca, Cca, B2ca, B1ca (best). Most UK commercial
        fit-outs specify Cca-s1b,d1,a1 or better for in-building cabling routes, with smoke /
        flame-spread / acid-gas thresholds. LSZH (low smoke, zero halogen) is a common in-building
        default for both copper and fibre. North American "plenum" (CMP) and "riser" (CMR) ratings
        are NEC-driven and not directly equivalent — a UK project specifies against the EU CPR
        Euroclass (Cca-s1b,d1,a1 typical) and the relevant BS 7671 §521.10.202 support /
        fire-collapse rules.
      </>
    ),
  },
  {
    question:
      'How does PoE on the copper side relate to fibre? §716 only mentions balanced cabling.',
    answer: (
      <>
        Correct — BS 7671:2018+A4:2026 §716 (entirely new in A4:2026) applies to the distribution of
        ELV DC power over balanced ICT cabling — Cat5e, Cat6, Cat6A, Cat7, Cat7A, Cat8.1, Cat8.2
        (§716.521.101). Fibre is not in scope of §716 because fibre cannot carry electrical power on
        its own. However, the typical building topology is a fibre backbone feeding
        floor-distributor switches that then deliver PoE on copper to the work area. The fibre is
        the unpowered path; the copper is the powered path. PoE-thermal and bundle-management rules
        under §716 / TIA TSB-184-A apply to the copper section. "Hybrid" power-and-fibre cables
        exist (a copper power pair alongside fibre strands in one jacket) for special applications
        and are treated as the LV power conductors they contain.
      </>
    ),
  },
  {
    question: 'Can I splice multimode fibre to single-mode fibre to extend a run?',
    answer: (
      <>
        No. The core sizes are different (9 µm SMF vs 50 / 62.5 µm MMF), so the geometric overlap at
        the splice is poor — most of the light from the larger core misses the smaller core, and
        even the surviving signal is poorly mode-matched. Insertion loss at an MM-to-SM splice is
        typically 10-20 dB, which destroys the link budget. Conversion between fibre types is done
        with a media converter (an active optical-electrical-optical device) or with a switch /
        transceiver port that has the appropriate optic for each fibre. Splicing rules: SMF to SMF
        only; MMF to MMF of the same core size only.
      </>
    ),
  },
];

const DataCablingModule3Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'Fibre Types: Singlemode vs Multimode | Data Cabling Module 3.1 | Elec-Mate',
    'Optical fibre fundamentals — single-mode (9/125) vs multimode (50/125, 62.5/125) cores, OM1-OM5 grades and their reach budgets, OS1 / OS1a / OS2 single-mode classes, jacket colour conventions, and the BS 7671:2018+A4:2026 §444.4.9 preference for metal-free fibre between buildings.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1"
            title="Fibre Types: Singlemode vs Multimode"
            description="Core / cladding geometry, OM1-OM5 multimode grades and OS1 / OS1a / OS2 single-mode classes, the published reach table by Ethernet variant, jacket colour conventions, and the BS 7671:2018+A4:2026 §444.4.9 preference for metal-free fibre between buildings on separate equipotential systems."
            tone="yellow"
          />

          <TLDR
            points={[
              'Optical fibre is single-mode (9/125 µm core/cladding, one propagation mode, very long reach, very high bandwidth) or multimode (50/125 µm OM2-OM5, or legacy 62.5/125 µm OM1, multiple modes, modal dispersion limits reach but cheaper to terminate). Cladding is 125 µm in every grade — that is what fits the standard ferrule.',
              'Multimode is graded OM1 → OM5 by effective modal bandwidth and supported reach. OM3 / OM4 are the standard 10G-to-the-floor choice (300 / 400 m at 850 nm). OM5 (wide-band, lime-green jacket) is the SWDM-capable upgrade for 40/100 G. OM1 / OM2 are legacy. Single-mode is graded OS1 / OS1a (indoor, tight-buffered) and OS2 (outside-plant, loose-tube, ≤ 0.4 dB/km).',
              'Jacket colour is industry convention (TIA-598-D): orange = OM1 / OM2, aqua = OM3 / OM4, lime green = OM5, yellow = single-mode (OS1 / OS1a / OS2). Always confirm against the cable print legend; colour is a check, not the source of truth.',
              'BS 7671:2018+A4:2026 §444.4.9 — verbatim — prefers metal-free optical fibre cables between buildings with separate equipotential bonding systems. No metallic path = no stray-current return, no imported voltage difference, no equipotential headache.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the geometric and physical difference between single-mode (9/125) and multimode (50/125 or 62.5/125) fibre, and why mode count is the root cause of every other behavioural difference',
              'Identify the multimode fibre grades OM1 through OM5 by core size, source type (LED vs VCSEL), effective modal bandwidth, and supported reach across 1G / 10G / 40G / 100G Ethernet',
              'Identify the single-mode fibre grades OS1, OS1a and OS2 by construction type (tight-buffered vs loose-tube), attenuation specification, and indoor / outside-plant suitability',
              'Read the industry jacket colour conventions (orange / aqua / lime / yellow) and confirm fibre type from the cable print legend',
              'Apply BS 7671:2018+A4:2026 §444.4.9 to inter-building runs — recognise when metal-free fibre is the regulator-preferred medium and why',
              'Apply BS 7671 §521.10.202 fire-collapse support rules to fibre installations even though fibre carries no current — steel clips / saddles / ties, not non-metallic ties as sole support',
              'Choose between multimode and single-mode for a given reach, bit rate and cost envelope, and document the choice against the manifest reach table',
              'Explain BS EN 60825-2 laser-class context (Class 1 / 1M / 3R) and the safety discipline of never inspecting an active fibre with the naked eye',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>
            Core size and cladding — the geometry that defines the fibre
          </ContentEyebrow>

          <ConceptBlock
            title="Single-mode (9/125) vs multimode (50/125 or 62.5/125) — one number changes everything"
            plainEnglish={`Optical fibre is a glass core surrounded by a glass cladding of slightly lower refractive index. Light entering the core within the acceptance angle is trapped by total internal reflection at the core/cladding boundary and propagates along the fibre. Two key dimensions describe every fibre: core diameter and cladding diameter, written as "core/cladding" in micrometres. 9/125 is single-mode. 50/125 and 62.5/125 are multimode. The 125 µm cladding is universal across the telecoms range — it is what fits the standard ferrule, cleaver and splice tooling. The number that matters is the core: 9 µm forces light into a single propagation mode; 50 / 62.5 µm admits hundreds.`}
            onSite='When you pick up a drum, the print legend gives you the type ("OM4 50/125" or "OS2 9/125 G.652.D"). Confirm against the jacket colour as a sanity check, then against the cable mark for fire-rating (e.g. "Cca-s1b,d1,a1") and length. Mixing single-mode and multimode patches at a panel is one of the quickest ways to lose a Friday afternoon — splice / connector geometry is the same, but the optics will refuse to link because core sizes do not match.'
          >
            <p>
              The single propagation mode of a 9 µm SMF core is what gives single-mode its enormous
              reach and bandwidth. There is no modal dispersion — only chromatic and
              polarisation-mode dispersion, both of which are small. The cost is precision: the tiny
              core is harder to align at a splice or connector, and SMF transceivers (DFB lasers,
              direct-modulated or externally-modulated) are more expensive than the VCSELs used in
              multimode systems.
            </p>
            <p>
              Multimode fibre with a 50 / 62.5 µm core admits many modes. Each mode follows a
              slightly different geometric path along the fibre and arrives at the far end with a
              slightly different propagation delay — modal dispersion. A single transmitted pulse
              spreads in time as it propagates. As the bit rate rises, the symbol time shrinks until
              the modal-delay spread consumes the symbol gap, and the receiver cannot distinguish
              bits. Modal dispersion is the dominant limit on multimode reach at high data rates.
              OM3 / OM4 / OM5 use carefully graded refractive-index profiles to equalise the mode
              delays — that is what gives them their high effective modal bandwidth (2000 MHz·km for
              OM3, 4700 MHz·km for OM4, ~28 000 MHz·km effective for OM5).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>9/125 µm — single-mode.</strong> Long reach, very high bandwidth, more
                expensive optics, tighter splice / connector tolerance. OS1 / OS1a / OS2.
              </li>
              <li>
                <strong>50/125 µm — modern multimode.</strong> OM2 (LED legacy), OM3 / OM4 / OM5
                (laser-optimised, VCSEL). Standard 10G-to-the-floor choice in modern installations.
              </li>
              <li>
                <strong>62.5/125 µm — legacy multimode.</strong> OM1. Was the dominant office fibre
                in the 1990s; supports 1 GbE only at modest reach, 10 GbE at 33 m maximum.
              </li>
            </ul>
          </ConceptBlock>

          {/* Single-mode vs multimode core diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Cross-section comparison — three fibre families at 125 µm cladding (drawn to scale)
            </h4>
            <svg
              viewBox="0 0 900 560"
              className="w-full h-auto"
              role="img"
              aria-label="Three fibre cross-sections drawn to relative scale, each in its own cell. Left: single-mode 9 over 125 micrometres — a tiny core inside a large cladding. Centre: multimode 50 over 125 micrometres — a medium core. Right: legacy multimode 62.5 over 125 micrometres — a slightly larger core. Each cell has the grade label above the circle and the core / cladding numbers in a dedicated row below. A legend at the bottom maps jacket colour and use to each grade."
            >
              {/* ===== Title row (above all cells) ===== */}
              <text
                x="155"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SINGLE-MODE
              </text>
              <text
                x="450"
                y="32"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                MULTIMODE (modern)
              </text>
              <text
                x="745"
                y="32"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                MULTIMODE (legacy)
              </text>

              {/* ===== Cell 1: SMF 9/125 ===== */}
              <rect
                x="20"
                y="50"
                width="270"
                height="280"
                rx="10"
                fill="rgba(250,204,21,0.06)"
                stroke="rgba(250,204,21,0.30)"
                strokeWidth="1.4"
              />
              {/* Cladding (drawn to scale: 125 µm = radius 100) */}
              <circle
                cx="155"
                cy="190"
                r="100"
                fill="rgba(250,204,21,0.10)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              {/* Core: 9 µm relative to 125 µm = radius 7.2 */}
              <circle cx="155" cy="190" r="7" fill="#FACC15" stroke="#FDE68A" strokeWidth="1.4" />

              {/* ===== Cell 2: MM 50/125 ===== */}
              <rect
                x="315"
                y="50"
                width="270"
                height="280"
                rx="10"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.30)"
                strokeWidth="1.4"
              />
              <circle
                cx="450"
                cy="190"
                r="100"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              {/* Core: 50 µm relative to 125 µm = radius 40 */}
              <circle
                cx="450"
                cy="190"
                r="40"
                fill="rgba(34,211,238,0.30)"
                stroke="#67E8F9"
                strokeWidth="1.4"
              />

              {/* ===== Cell 3: MM 62.5/125 ===== */}
              <rect
                x="610"
                y="50"
                width="270"
                height="280"
                rx="10"
                fill="rgba(249,115,22,0.06)"
                stroke="rgba(249,115,22,0.30)"
                strokeWidth="1.4"
              />
              <circle
                cx="745"
                cy="190"
                r="100"
                fill="rgba(249,115,22,0.10)"
                stroke="#F97316"
                strokeWidth="1.6"
              />
              {/* Core: 62.5 µm relative to 125 µm = radius 50 */}
              <circle
                cx="745"
                cy="190"
                r="50"
                fill="rgba(249,115,22,0.28)"
                stroke="#FDBA74"
                strokeWidth="1.4"
              />

              {/* ===== Number row (below circles, ABOVE legend) — dedicated label zone ===== */}
              <text
                x="155"
                y="312"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                9 / 125 µm
              </text>
              <text
                x="450"
                y="312"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                50 / 125 µm
              </text>
              <text
                x="745"
                y="312"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                62.5 / 125 µm
              </text>

              {/* ===== Legend panel (separate, below) ===== */}
              <rect
                x="20"
                y="360"
                width="860"
                height="184"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="40"
                y="384"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Three legend columns aligned with the three cells above */}
              {/* Col 1 — SMF */}
              <rect
                x="40"
                y="400"
                width="14"
                height="14"
                rx="3"
                fill="rgba(250,204,21,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text
                x="64"
                y="412"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SMF · 9 / 125 µm
              </text>
              <text x="40" y="432" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                One propagation mode
              </text>
              <text x="40" y="450" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                No modal dispersion
              </text>
              <text x="40" y="468" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                OS1 / OS1a / OS2
              </text>
              <text x="40" y="486" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Yellow jacket (TIA-598-D)
              </text>
              <text x="40" y="510" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Backbone · inter-building
              </text>
              <text x="40" y="526" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                long-haul
              </text>

              {/* Col 2 — MM 50/125 */}
              <rect
                x="335"
                y="400"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.30)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="359"
                y="412"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                MMF · 50 / 125 µm
              </text>
              <text x="335" y="432" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Many modes (graded index)
              </text>
              <text x="335" y="450" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                VCSEL-optimised at 850 nm
              </text>
              <text x="335" y="468" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                OM2 · OM3 · OM4 · OM5
              </text>
              <text x="335" y="486" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Aqua (OM3/4) · lime (OM5)
              </text>
              <text x="335" y="510" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Modern in-building
              </text>
              <text x="335" y="526" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                10G to 100G short-reach
              </text>

              {/* Col 3 — MM 62.5/125 */}
              <rect
                x="630"
                y="400"
                width="14"
                height="14"
                rx="3"
                fill="rgba(249,115,22,0.28)"
                stroke="#F97316"
                strokeWidth="1.4"
              />
              <text
                x="654"
                y="412"
                fill="#FED7AA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                MMF · 62.5 / 125 µm
              </text>
              <text x="630" y="432" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Many modes (legacy LED)
              </text>
              <text x="630" y="450" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                200 MHz·km bandwidth
              </text>
              <text x="630" y="468" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                OM1 only
              </text>
              <text x="630" y="486" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Orange jacket
              </text>
              <text x="630" y="510" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Legacy · 1G to 275 m
              </text>
              <text x="630" y="526" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                10G to 33 m only
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>OM grades and the reach table</ContentEyebrow>

          <ConceptBlock
            title="OM1 → OM5 — what each grade actually delivers"
            plainEnglish="Multimode is graded OM1 through OM5 by effective modal bandwidth and the maximum reach the grade supports at each Ethernet rate. The grade tells you what the fibre can do; the Ethernet variant tells you what the optic asks of it. Pick the lowest grade that absorbs your reach with comfortable headroom — under-spec gives unstable links, over-spec is wasted spend."
            onSite="On survey, walk every proposed backbone run with a tape and a route plan. The cable run length plus a margin (5-10 % for terminations and bend allowance) is the number you compare against the reach table. If your run plus margin fits inside OM3 at the target Ethernet rate, OM3 is fine. If it does not, step up to OM4, OM5 or single-mode. Document the choice on the design drawing — that protects you when an inspector or facilities manager asks why."
          >
            <p>The grades, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>OM1 — 62.5/125 µm, LED.</strong> Legacy. 200 MHz·km. 1 GbE to 275 m at 850
                nm; 10 GbE only to 33 m. Found in older buildings; not specified for new work.
              </li>
              <li>
                <strong>OM2 — 50/125 µm, LED.</strong> Legacy. 500 MHz·km. 1 GbE to 550 m; 10 GbE to
                82 m. Largely replaced by OM3 / OM4 in new specifications.
              </li>
              <li>
                <strong>OM3 — 50/125 µm, laser-optimised VCSEL.</strong> 2000 MHz·km. 10 GbE to 300
                m at 850 nm; 40 / 100 GbE parallel-optic to 100 m. Aqua jacket. Standard floor fibre
                in many 2010s designs.
              </li>
              <li>
                <strong>OM4 — 50/125 µm, laser-optimised VCSEL.</strong> 4700 MHz·km. 10 GbE to 400
                m at 850 nm; 40 / 100 GbE parallel-optic to 150 m. Aqua jacket (sometimes Erika
                violet for differentiation). Modern default for in-building high-capacity multimode.
              </li>
              <li>
                <strong>OM5 — 50/125 µm, wide-band MMF (WBMMF), ANSI/TIA-492AAAE.</strong> ~28 000
                MHz·km effective. Optimised for SWDM (short-wave wavelength-division multiplexing)
                across 850-953 nm — multiple wavelengths on a single fibre pair. 100 GbE SWDM4 to
                150 m on duplex LC; backwards-compatible with OM4. Lime-green jacket.
              </li>
            </ul>
            <p>
              The reach values below come from the published industry standards manifest used
              throughout this course — IEEE 802.3 (Ethernet variants), ISO/IEC 11801 / TIA-568.3-E
              for fibre cabling, and ANSI/TIA-492 for the OM grade specifications themselves. They
              are reproduced verbatim, not invented.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Optical fibre reach by grade and Ethernet variant"
            source="ISO/IEC 11801 · ANSI/TIA-568.3-E · IEEE 802.3 (per the data-cabling standards manifest)"
            headers={['Grade', 'Core / cladding', 'Bandwidth', '1 GbE', '10 GbE', '40 / 100 GbE']}
            rows={[
              [
                'OM1',
                '62.5/125 µm LED MMF',
                '200 MHz·km',
                '275 m @850 / 550 m @1300',
                '33 m',
                '— / —',
              ],
              ['OM2', '50/125 µm LED MMF', '500 MHz·km', '550 m', '82 m', '— / —'],
              [
                'OM3',
                '50/125 µm VCSEL MMF',
                '2000 MHz·km',
                '1000 m',
                '300 m @850',
                '100 m / 100 m (parallel)',
              ],
              [
                'OM4',
                '50/125 µm VCSEL MMF',
                '4700 MHz·km',
                '1000 m',
                '400 m @850',
                '150 m / 150 m (parallel)',
              ],
              [
                'OM5 (WBMMF)',
                '50/125 µm wide-band MMF',
                '~28 000 MHz·km eff.',
                '1000 m',
                '400 m',
                '440 m / 150 m (SWDM4)',
              ],
              [
                'OS1 / OS1a',
                '9/125 µm SMF (tight-buffered)',
                '— (chromatic limited)',
                'up to 10 km',
                'up to 10 km',
                '— / —',
              ],
              [
                'OS2',
                '9/125 µm SMF (loose-tube, ≤ 0.4 dB/km)',
                '— (chromatic limited)',
                'up to 200 km*',
                '— / —',
                '— / —',
              ],
            ]}
            notes="* OS2 reach is set by the transceiver and link budget, not by the fibre — values up to ~200 km are achievable with appropriate optics. Multimode jacket colour: orange (OM1/OM2), aqua (OM3/OM4), lime green (OM5). Single-mode jacket colour: yellow (OS1 / OS1a / OS2). All values from the data-cabling standards manifest — do not extrapolate or invent."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Single-mode classes — OS1, OS1a, OS2</ContentEyebrow>

          <ConceptBlock
            title="One core size, three construction / attenuation classes"
            plainEnglish="Single-mode fibre is universally 9/125 µm. The classes — OS1, OS1a, OS2 — describe construction style, attenuation budget, and intended environment, not different optical cores. OS1 / OS1a are tight-buffered for indoor or short campus use; OS2 is loose-tube outside-plant fibre with the lowest attenuation, designed for long routes."
            onSite='Indoor backbone and short building-to-building runs are usually OS1a (low water peak, 1.0 dB/km typical, tight-buffered). Outdoor inter-building, direct-buried, aerial or duct runs are OS2 (≤ 0.4 dB/km, loose-tube). The print legend on the cable jacket states the class explicitly — "OS2 G.652.D" or similar. Mixing OS1 with OS2 in the same channel is allowed (the cores match) but the link budget is set by the worse-attenuation cable.'
          >
            <p>The three classes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>OS1.</strong> Tight-buffered indoor cable, 9/125 µm SMF, 1.0 dB/km
                attenuation specification. Suitable for indoor / short campus runs to ~10 km. Older
                standard; superseded by OS1a in most new specifications.
              </li>
              <li>
                <strong>OS1a.</strong> Indoor-rated low-water-peak update aligned with ITU-T
                G.652.D. Removes the historical attenuation peak around 1383 nm caused by hydroxyl
                impurities, so the full 1260-1625 nm transmission window is usable — important if
                CWDM (coarse wavelength-division multiplexing) services are planned. Same 9/125 µm
                core; same 10 km indoor reach.
              </li>
              <li>
                <strong>OS2.</strong> Loose-tube outside-plant cable, 9/125 µm SMF, ≤ 0.4 dB/km
                maximum attenuation. Designed for outdoor / direct-buried / aerial / duct
                deployment, with mechanical and environmental ratings to match. Reach is
                transceiver-limited; with appropriate optics, link distances up to ~200 km are
                achievable.
              </li>
            </ul>
            <p>
              For a UK 2026 commercial fit-out: OS1a for indoor backbone, OS2 for any outdoor or
              inter-building run. Where the inter-building run is metal-free (the BS 7671 §444.4.9
              preference), specify all-dielectric self-supporting (ADSS) or non-metallic loose-tube
              OS2.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.4.9 (Separate buildings — verbatim)"
            clause={
              <>
                Where different buildings have separate equipotential bonding systems, metal-free
                optical fibre cables or other non-conducting systems are preferred for signal and
                data transmission, for example, microwave signal transformer for isolation in
                accordance with BS EN 61558-2-1, 2-4, 2-6, 2-15 and either BS EN 60950-1 or BS EN
                IEC 62368-1.
              </>
            }
            meaning="Between buildings on different earth electrodes, a metallic data cable becomes a long conductor between two different reference potentials — current would flow through the conductor and back through earth, with shock and equipment-damage risk. Metal-free fibre carries no such path: the light passes, the unwanted current never had a wire to flow on. Where armoured fibre must be used between buildings (mechanical reasons), the armour is bonded to local earth at each entry — but the cleaner answer, and the regulator-preferred answer, is all-dielectric metal-free fibre."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Jacket colour and choosing the right fibre</ContentEyebrow>

          <ConceptBlock
            title="Colour conventions, mechanical construction, and the choice on a real job"
            plainEnglish="Industry convention assigns jacket colours to fibre types so an installer can identify a drum at a glance. The colours are not regulated by BS 7671 — they sit in TIA-598-D and the BS EN 50173 / ISO 11801 industry practice. Always confirm the type from the print legend; the jacket colour is a check, not the source of truth."
            onSite="When a coil arrives unlabelled or with a damaged outer jacket, you have two options: read the print legend on the inner cable mark (every commercial fibre carries its type, OFNR / CMP / Cca rating, and length on a periodic mark down its length), or test the fibre with a visible-light source to count modes. The colour is a fast triage. The print is the truth."
          >
            <p>The jacket convention:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Orange.</strong> OM1 (62.5/125) or OM2 (50/125 LED). Both are legacy and
                share the colour because the convention pre-dates OM3.
              </li>
              <li>
                <strong>Aqua.</strong> OM3 and OM4 laser-optimised multimode. OM4 is sometimes
                jacketed Erika violet for differentiation in mixed-grade installations.
              </li>
              <li>
                <strong>Lime green.</strong> OM5 wide-band multimode (WBMMF). Distinct from aqua so
                SWDM-capable fibre is identifiable at a glance.
              </li>
              <li>
                <strong>Yellow.</strong> Single-mode — OS1, OS1a, OS2. The colour is shared across
                single-mode classes; the print legend distinguishes them.
              </li>
            </ul>
            <p>
              The choice on a real job is driven by reach, bit rate, environment (indoor / outdoor /
              inter-building) and lifetime budget. The decision tree most contractors follow:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Indoor horizontal or short backbone, 1-10 G, ≤ 300 m.</strong> OM3 / OM4 is
                cheapest at the optic and meets the reach. Aqua jacket. LC duplex connectors.
              </li>
              <li>
                <strong>Indoor backbone, 25-100 G, in-building, ≤ 150 m.</strong> OM4 with
                100GBASE-SR4 (parallel optics, MTP/MPO) or OM5 with 100GBASE-SWDM4 (duplex LC). OM5
                gives an SWDM upgrade path on the same fibre count.
              </li>
              <li>
                <strong>Inter-building, separate equipotential systems.</strong> Metal-free fibre
                under §444.4.9. OS2 outdoors (≤ 0.4 dB/km) or all-dielectric OS1a for short campus.
              </li>
              <li>
                <strong>Long-haul or outside-plant runs &gt; 1 km.</strong> OS2 single-mode with
                appropriate transceivers (1310 / 1550 nm DFB lasers, possibly DWDM).
              </li>
            </ul>
            <p>
              "Future-proofing" is a real consideration but not a free one. OM5 over OM4 buys SWDM
              capability; OS2 over OM4 buys 200 km reach. Both add cost — OS2 mostly at the optic,
              OM5 mostly at the cable. Specify the lowest grade that absorbs the foreseeable
              services with comfortable headroom; document the choice.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §521.10.202 (verbatim — applies to fibre as well as copper)"
            clause={
              <>
                Wiring systems shall be supported such that they will not be liable to premature
                collapse in the event of a fire. NOTE 1: Wiring systems hanging across access or
                egress routes may hinder evacuation and firefighting activities. NOTE 2: Cables
                installed in or on steel cable containment systems are deemed to meet the
                requirements of this regulation. NOTE 3: This regulation precludes, for example, the
                use of non-metallic cable clips or cable ties as the sole means of support where
                cables are clipped direct to exposed surfaces or suspended under cable tray, and the
                use of non-metallic cable trunking as the sole means of support of the cables
                therein. NOTE 4: Suitably spaced steel or copper clips, saddles or ties are examples
                that will meet the requirements of this regulation.
              </>
            }
            meaning="Fibre is medium-agnostic to this clause. A run of fibre supported only with plastic ties along an escape route is non-compliant in exactly the same way a copper run would be. Steel cable containment (basket, tray, trunking) carries the deemed-to-comply note; otherwise use steel or copper saddles / clips / ties. Fibre is delicate at the bend radius — combine the regulatory requirement with the manufacturer's minimum bend radius (typically 10× outer diameter unloaded, 20× loaded) and the support spacing in BS EN 50174-2."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Specifying OM4 'because it is fastest' and pulling it through 320 m of campus duct"
            whatHappens={
              <>
                Designer assumes OM4 is "the high-end multimode" and spec's it for a 320 m
                inter-building run. On commissioning, 10GBASE-SR refuses to link reliably — OM4
                supports 10G to 400 m at 850 nm, which sounds fine, but the project actually needs
                40GBASE-SR4 on the same fibre and 40G is only 150 m on OM4. The fibre is also routed
                across two buildings on different earths, so even the multimode case attracts
                §444.4.9. The whole campus run has to be re-pulled in OS2 with single- mode optics.
              </>
            }
            doInstead={
              <>
                Match fibre type to the longest reach AND the highest bit rate the run will ever
                carry. For inter-building runs, default to OS2 single-mode (long reach, low
                attenuation, future-proof) AND specify metal-free / all-dielectric construction
                under §444.4.9. Multimode is correct in-building where reach is short and 850 nm
                VCSEL optics are cheaper. Document the choice on the design drawing against the
                reach table.
              </>
            }
          />

          <Scenario
            title="A 4-storey office, basement comms room, three upper floors, future-flex spec"
            situation={
              <>
                Greenfield design. Basement equipment room. Floor distributors on each upper floor,
                ~80 m vertical riser between basement and the highest FD. Brief is "Cat6A
                horizontal, fibre backbone, future-flex for 25 G / 40 G to the floor in 5-10 years".
                A separate annex building (~120 m away across a service yard) needs inter-building
                fibre.
              </>
            }
            whatToDo={
              <>
                Pick OM4 (or OM5) for the in-building riser — the 80 m riser reach is well within
                OM4 at 10 / 25 / 40 G; OM5 adds SWDM upgrade on duplex LC for 100 G. Use LC duplex
                connectors throughout. For the 120 m inter-building run, pick OS2 single-mode in an
                all-dielectric (metal-free) outside-plant loose-tube construction — §444.4.9
                preferred medium. Single-mode optics at the floor switches (10GBASE-LR or 25GBASE-LR
                depending on uplink demand). Site each FD so every horizontal Cat6A on the floor
                reaches its outlet within 90 m. Document the fibre type, OM grade / OS class, jacket
                colour, connector type, and the §444.4.9 reasoning on the design package. Run all
                cable on steel containment to meet §521.10.202.
              </>
            }
            whyItMatters={
              <>
                The two reaches (80 m riser, 120 m inter-building) sit in completely different
                regimes. Multimode is the cheap, correct answer in-building. Single-mode metal-free
                fibre is the regulator-preferred answer between buildings. Specifying OM4 for both
                would either fail at 40 G+ on the longer run or invite §444.4.9 non-compliance on
                the inter-building section. Specifying OS2 for both works but burns money on
                expensive single-mode optics where multimode VCSELs would do.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Single-mode = 9/125 µm core / cladding, one mode, long reach, very high bandwidth, more expensive optics. Multimode = 50/125 (OM2-OM5) or 62.5/125 (OM1) µm core / cladding, many modes, modal-dispersion limited, cheaper optics. Cladding is always 125 µm.',
              'OM1 / OM2 are legacy. OM3 (300 m at 10G) and OM4 (400 m at 10G) are the modern multimode defaults. OM5 adds SWDM capability on duplex LC. Use the published reach table — never invent reach numbers.',
              'OS1 / OS1a are indoor / short-campus tight-buffered single-mode. OS2 is outside-plant loose-tube single-mode, ≤ 0.4 dB/km, the standard for long-haul and inter-building.',
              'BS 7671:2018+A4:2026 §444.4.9 — verbatim — prefers metal-free optical fibre between buildings with separate equipotential bonding systems. Specify all-dielectric construction for inter-building runs.',
              'BS 7671 §521.10.202 applies to fibre as well as copper — steel clips / saddles / ties (or steel containment) for support, never non-metallic ties as sole support along escape routes. BS EN 60825-2 governs laser safety: never look into an active fibre with the naked eye.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Connectors and polish grades
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section1;
