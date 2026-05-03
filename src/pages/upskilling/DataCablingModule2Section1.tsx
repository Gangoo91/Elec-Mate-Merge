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
    id: 'datacabling-m2s1-balanced-pair',
    question:
      'Why is a twisted pair "balanced", and what does that buy you electrically over a single-ended (coax-style) signal?',
    options: [
      'Balanced means the two conductors are the same length, so the signal arrives in phase.',
      'Balanced means the transmitter drives equal-and-opposite voltages onto the two conductors of the pair, so the receiver looks at the DIFFERENCE between them — any noise picked up identically on both wires (common-mode) cancels at the receiver, while the wanted signal (differential) survives.',
      'Balanced means each pair is shielded individually — the shield is what gives the noise rejection.',
      'Balanced means the two conductors carry the same current in the same direction.',
    ],
    correctIndex: 1,
    explanation:
      'A balanced pair is differential. The driver puts +V on one conductor and -V on the other; the receiver subtracts the two. External noise (mains hum, RF, switching transients) couples almost identically into both wires of a twisted pair — that is "common-mode" noise and the receiver rejects it. The wanted signal is "differential" — equal in magnitude but opposite in sign — and the subtraction preserves it. The twist is what guarantees the two conductors see the same noise field along the run, which is why pairs are twisted and why every pair has its own twist rate.',
  },
  {
    id: 'datacabling-m2s1-class-vs-category',
    question:
      'A wholesaler offers "Cat6A cable" at a sharp price. The end client wants a Class EA channel handed over with test results. Are these the same thing?',
    options: [
      'Yes — Cat6A and Class EA are interchangeable terms.',
      'No — Category describes the cable / components you bought; Class describes the channel performance you can certify after installation. Cat6A components installed badly will fail a Class EA channel test. The contractor warrants Class — not the printing on the cable jacket.',
      'No — Class EA is fibre, Cat6A is copper.',
      'Yes — but only if you also buy Cat6A patch leads.',
    ],
    correctIndex: 1,
    explanation:
      "Category (TIA terminology — Cat5e / 6 / 6A / 7 / 7A / 8.1 / 8.2) classifies parts. Class (ISO/IEC and BS EN terminology — D / E / EA / F / FA / I / II) classifies the installed channel. The two map closely (Cat6A \u2248 Class EA), but cheap Cat6A components plus poor termination and badly-managed bundles will still fail a Class EA field test against TIA-1152-A / BS EN 50346. The certification handover is at Class level, not Category level — and that is the contractor's liability.",
  },
  {
    id: 'datacabling-m2s1-twist-rate',
    question:
      'Within a 4-pair Cat6A cable the four pairs have different twist rates. What is that for?',
    options: [
      'To make the cable look more professional.',
      'To equalise the cable diameter under jacket — so the cable is round.',
      'To minimise pair-to-pair coupling (NEXT — near-end crosstalk) inside the cable. If two adjacent pairs had the same twist rate they would couple strongly along the entire run; differing twist rates de-correlate the coupling so it cancels out across the length.',
      'To allow each pair to carry a different bandwidth.',
    ],
    correctIndex: 2,
    explanation:
      'Each pair in a twisted-pair cable has a unique twist rate (sometimes called pitch). If two pairs ran at the same twist rate they would lie alongside each other in a fixed geometric relationship along the whole run, and the magnetic field of one would couple steadily into the other — that is near-end crosstalk (NEXT), and it would be enormous. Different twist rates mean the geometric relationship between any two pairs slides along the run, the coupling averages out, and NEXT is suppressed. NEXT performance is one of the headline parameters in every Class / Category specification.',
  },
  {
    id: 'datacabling-m2s1-poe-cable-list',
    question:
      'BS 7671:2018+A4:2026 §716.521.101 lists the cable Categories permitted to carry ELV DC power (PoE) over balanced cabling. Which list is correct?',
    options: [
      'Cat3, Cat4, Cat5 only.',
      'Cat5, Cat6, Cat6A only.',
      'Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 — or other cables defined in BS EN 50173-1 by reference to BS EN 50288 series.',
      'Any cable rated for 50 V DC.',
    ],
    correctIndex: 2,
    explanation:
      '\u00a7716.521.101 is verbatim: "Information and communication technology (ICT) cables used for the distribution of DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series." Cat3 / Cat4 are NOT on the list — they are obsolete and not specified in BS EN 50173-1. Note also the hard caps under \u00a7716: 750 mA per conductor (\u00a7716.523.2.101) and 750 mA per contact at the connecting hardware (\u00a7716.526.101).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does "differential signalling" mean in the context of balanced twisted pair?',
    options: [
      'The two conductors carry signals at slightly different times.',
      'The transmitter drives the two conductors with equal and opposite voltages, and the receiver decodes the difference between them — a scheme that lets common-mode noise (picked up identically on both conductors) cancel at the receiver.',
      'Each pair carries a different protocol.',
      'The two conductors are made of different materials.',
    ],
    correctAnswer: 1,
    explanation:
      'Differential signalling drives +V and -V onto the two conductors of a pair. The receiver looks at the difference (V_a \u2212 V_b). External noise that couples identically into both conductors (common-mode) subtracts to zero at the receiver. The wanted signal — equal and opposite — doubles in the subtraction. Combined with the twist (which guarantees the two conductors share the same noise field along the run), differential signalling is what lets unshielded twisted pair carry gigabit-class signals across 100 m without a metallic screen.',
  },
  {
    id: 2,
    question:
      'A 1991 office cabled to Cat3 wants to support 1 Gbps Ethernet to every desk. Why is the cable the immediate problem?',
    options: [
      'Cat3 was banned by BS 7671 in 2008.',
      'Cat3 is rated to 16 MHz and was specified for 10BASE-T (10 Mbps) and voice. 1000BASE-T (gigabit) requires 100 MHz — the bandwidth of Cat5e / Class D — and the cable physically cannot carry the higher-frequency components needed to encode gigabit. The cable is the limiter; no amount of better switches or shorter runs fixes it.',
      'Cat3 cable fails BS 7671 \u00a7716.',
      'Cat3 has only two pairs.',
    ],
    correctAnswer: 1,
    explanation:
      "Each Category has a defined frequency rating that the cable's electrical design (twist rate, conductor geometry, dielectric, jacket) is built to support. Cat3 = 16 MHz (10BASE-T, voice). Cat5e = 100 MHz (1000BASE-T). Cat6 = 250 MHz. Cat6A = 500 MHz (10GBASE-T at 100 m). Cat7A = 1000 MHz. Cat8.1 / 8.2 = 2000 MHz (25/40GBASE-T at 30 m). When the application's frequency requirement exceeds the cable's rating, no installation heroics will fix it — the cable becomes the bottleneck.",
  },
  {
    id: 3,
    question: 'Which Class corresponds to which Category, in the EN/ISO vs TIA mapping?',
    options: [
      'Class D = Cat6A, Class E = Cat7, Class F = Cat8.',
      'Class D \u2248 Cat5e (100 MHz), Class E \u2248 Cat6 (250 MHz), Class EA \u2248 Cat6A (500 MHz), Class F \u2248 Cat7 (600 MHz), Class FA \u2248 Cat7A (1000 MHz), Class I \u2248 Cat8.1 (2000 MHz), Class II \u2248 Cat8.2 (2000 MHz).',
      'Class A = Cat5e, Class B = Cat6, Class C = Cat6A.',
      'Categories and Classes are unrelated.',
    ],
    correctAnswer: 1,
    explanation:
      'EN/ISO uses Class terminology (D / E / EA / F / FA / I / II) while TIA uses Category terminology (5e / 6 / 6A / 7 / 7A / 8.1 / 8.2). They map closely. Note: Cat7 / Cat7A / Class F / FA are ISO-only — there is no equivalent TIA Category, because TIA jumped from Cat6A straight to Cat8 for the data-centre top-of-rack market. Cat6A / Class EA is the practical 2026 default for new commercial horizontal installs.',
  },
  {
    id: 4,
    question: 'Why does every pair inside a 4-pair UTP cable have a different twist rate?',
    options: [
      'Manufacturing convenience.',
      'To minimise NEXT (near-end crosstalk) between pairs. Identical twist rates would lock adjacent pairs into a fixed geometric relationship along the whole run and couple their fields strongly; differing twist rates de-correlate that coupling so it averages out.',
      'To match the colour code.',
      'To support PoE current sharing.',
    ],
    correctAnswer: 1,
    explanation:
      'Pair-to-pair crosstalk (NEXT) is the single biggest performance enemy inside a 4-pair cable. Twist itself guarantees common-mode noise rejection from outside. Different twist rates between pairs guarantee that the inter-pair geometric relationship constantly slides along the run, so the magnetic coupling between any two pairs averages to near-zero. Combined with conductor geometry (separators in Cat6 / Cat6A) and the jacket geometry, this is what lets 4 unshielded pairs share one cable at 500 MHz.',
  },
  {
    id: 5,
    question:
      'A surveyor recommends Cat6A as the default for a new commercial fit-out instead of Cat6. What is the strongest 2026 argument?',
    options: [
      'Cat6A is cheaper than Cat6.',
      'Cat6A delivers Class EA at the full 100 m channel for 10GBASE-T, has the bandwidth headroom (500 MHz vs 250 MHz) to absorb future PoE-driven services, and is on the BS 7671 \u00a7716.521.101 permitted list for ELV DC distribution. Cat6 is rated to 10G only at 55 m de-rated, has half the bandwidth, and gives no service-independence headroom for the building life.',
      'Cat6A is a UK-only standard.',
      'BS 7671 mandates Cat6A.',
    ],
    correctAnswer: 1,
    explanation:
      'Cat6 supports 10GBASE-T but only to a de-rated channel (typically 55 m, with strict alien-crosstalk constraints) — not the standard 100 m channel. Cat6A is the 10GBASE-T standard at the full 100 m. With the building lifecycle-cost argument from M1S1 in mind, Cat6A absorbs the foreseeable services (10G to the desk, Type 4 PoE, IP voice, BMS) over a 15-20 year life. BS 7671 does not "mandate" Cat6A but \u00a7716.521.101 lists it among the permitted PoE-carrying Categories. Cat6 is on that list too — but its bandwidth headroom is much thinner.',
  },
  {
    id: 6,
    question:
      'What does BS 7671:2018+A4:2026 \u00a7716.521.101 require regarding cable Category for ELV DC distribution over balanced cabling?',
    options: [
      'Only Cat6A or higher is permitted.',
      'ICT cables used for the distribution of DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 — or other cables as defined in BS EN 50173-1 by reference to the BS EN 50288 series.',
      'Any cable rated for 50 V is permitted.',
      'Only shielded cables are permitted.',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim from \u00a7716.521.101: the permitted list is Cat5, Cat6, Cat6A, Cat7, Cat7A, Cat8.1, Cat8.2 — or "other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series." Cat3 / Cat4 are NOT permitted. Read alongside \u00a7716.523.2.101 (load current \u2264 750 mA per conductor) and \u00a7716.526.101 (connecting hardware \u2265 750 mA per contact), this defines the regulatory envelope for any PoE deployment in the UK from 15 April 2026.',
  },
  {
    id: 7,
    question: 'What does the "e" in "Cat5e" stand for, and why was Cat5e introduced after Cat5?',
    options: [
      'Electrical — it indicated Cat5 with electrical certification.',
      'Enhanced — Cat5e tightened the NEXT, return-loss and delay-skew specifications relative to Cat5 so the same 100 MHz cable could reliably support 1000BASE-T (gigabit), which uses all four pairs simultaneously in both directions and is far more sensitive to pair imbalance than 100BASE-TX was.',
      'Enterprise.',
      'Ethernet.',
    ],
    correctAnswer: 1,
    explanation:
      '"Enhanced". Cat5 (1991) was specified for 100BASE-TX, which uses two pairs (one TX, one RX) and tolerates the original NEXT / return-loss limits. 1000BASE-T (1999) uses all four pairs simultaneously, in both directions on each pair, with PAM-5 line coding — which exposed Cat5\u2019s pair-to-pair imbalance. Cat5e tightened the channel parameters (specifically NEXT, PSNEXT, return loss, ELFEXT and delay skew) within the same 100 MHz envelope so 1000BASE-T could run reliably. Cat5e is the legacy minimum for new installs; Cat5 is obsolete.',
  },
  {
    id: 8,
    question:
      'What is the difference between Cat8.1 and Cat8.2, and where do they actually live in real installations?',
    options: [
      'Cat8.1 is copper, Cat8.2 is fibre.',
      'Cat8.1 = TIA Class I; uses RJ45 connectors. Cat8.2 = TIA Class II; uses non-RJ45 connectors (e.g. TERA / GG45). Both are rated to 2000 MHz and support 25/40GBASE-T, but only over a 30 m channel, so they live in data-centre top-of-rack (TOR) deployments — not in horizontal cabling to work areas.',
      'Cat8.1 is for outdoor use; Cat8.2 is for indoor use.',
      'They are identical.',
    ],
    correctAnswer: 1,
    explanation:
      "Cat8.1 / Class I uses RJ45 (8P8C) connectors — backwards-compatible with everything below it. Cat8.2 / Class II uses non-RJ45 connectors (TERA, GG45) — higher-performance but interface-incompatible. Both reach 2000 MHz but the channel is 30 m max — that's why they only fit in data-centre top-of-rack server-to-switch links, where 25/40GBASE-T over copper is cheaper than fibre over short distances. They are not horizontal-cabling Categories — Cat6A remains the practical default for office horizontal.",
  },
  {
    id: 9,
    question:
      'What is the practical 2026 default Category for a new UK commercial horizontal install, and what justifies it?',
    options: [
      'Cat5e — cheapest acceptable.',
      'Cat6A / Class EA — 500 MHz bandwidth, 10GBASE-T at the full 100 m channel, headroom for Type 4 PoE thermal loading and emerging services, on the BS 7671 \u00a7716.521.101 permitted list, and the lifecycle-cost case (M1S1) closes within 4-5 years against ad-hoc point-to-point.',
      'Cat8.1 — future-proof.',
      'Cat7 — maximum performance.',
    ],
    correctAnswer: 1,
    explanation:
      'Cat6A / Class EA is the 2026 commercial horizontal default. It delivers 10GBASE-T at the full 100 m channel, has 2\u00d7 the bandwidth of Cat6 (500 MHz vs 250 MHz), absorbs Type 4 PoE++ thermal loading with sensible bundle management, and sits on the BS 7671 \u00a7716.521.101 permitted list. Cat5e is the legacy minimum but offers no headroom. Cat8 is data-centre TOR only. Cat7 / 7A are ISO-only and rare in UK horizontal — Cat6A covers the same use cases at less cost.',
  },
  {
    id: 10,
    question:
      'Why does balanced twisted-pair NOT need a metallic screen for its noise rejection to work in office environments?',
    options: [
      'Office environments have no electromagnetic noise.',
      'Because the noise rejection comes from the BALANCE of the pair (differential signalling + twist), not from a screen. The pair rejects common-mode noise by subtraction at the receiver. A screen adds protection against very high-frequency or very strong external fields and against alien crosstalk — but for ordinary office EMI, an unshielded balanced pair is sufficient. Shielded variants exist for industrial / high-EMI / high-PoE / data-centre cases.',
      'Because all office cables are run in steel containment.',
      'Because EMC regulations force noise sources to be silent.',
    ],
    correctAnswer: 1,
    explanation:
      'The twisted-pair value proposition is that BALANCE plus DIFFERENTIAL signalling delivers noise rejection without a screen. Common-mode noise is rejected at the receiver by subtraction. The twist guarantees the two conductors see the same noise field along the run. UTP works because the balance is good — not because there is no noise. Screened variants (F/UTP, U/FTP, S/FTP, F/FTP — covered in M2S2) raise the noise margin further, are mandatory or strongly preferred in heavy-EMI environments, and become more relevant under continuous high-current PoE where alien crosstalk between bundles rises.',
  },
];

const faqs = [
  {
    question:
      'How can two unshielded conductors twisted together possibly reject mains-frequency hum and RF noise?',
    answer: (
      <>
        Through the combination of <strong>balance</strong> and{' '}
        <strong>differential signalling</strong>. The transmitter drives the pair with equal and
        opposite voltages (+V on one wire, -V on the other). The receiver looks at the difference
        between the two wires. External noise (mains hum, RF, switching transients) couples almost
        identically into both conductors — that is "common-mode" noise — and the subtraction cancels
        it. The twist is what guarantees the two conductors share the same noise field along the
        entire run, so the common-mode assumption holds. The wanted signal is purely differential
        and survives the subtraction. UTP is not "unshielded therefore noisy" — UTP is "balanced
        therefore quiet".
      </>
    ),
  },
  {
    question: 'Where did the original Categories come from?',
    answer: (
      <>
        The Categories grew out of EIA/TIA-568 (1991) — the first North American structured cabling
        standard. Cat3 was specified to 16 MHz and supported 10BASE-T; Cat5 (1991) hit 100 MHz;
        Cat5e (1999) tightened the 100 MHz Category to support 1000BASE-T; Cat6 (2002) reached 250
        MHz; Cat6A (2008) reached 500 MHz to support 10GBASE-T at 100 m; Cat8.1 / 8.2 (2016) reached
        2000 MHz at 30 m for data-centre top-of-rack. ISO/IEC 11801 and BS EN 50173 followed roughly
        in parallel with Class terminology. The Categories / Classes are not arbitrary — each one
        solves a specific bandwidth problem the previous one could not.
      </>
    ),
  },
  {
    question: 'Why is Cat6A the recommended default and not Cat6?',
    answer: (
      <>
        Cat6 supports 10GBASE-T but only on a de-rated channel — typically 55 m, with strict
        alien-crosstalk control and bundle-size limits. Cat6A is rated for 10GBASE-T at the full 100
        m channel and has 2× the bandwidth (500 MHz vs 250 MHz). For a building with a 15-20 year
        cabling life and emerging PoE-everything services, Cat6A absorbs the foreseeable load. Cat6
        was the right answer in 2008; Cat6A is the right answer in 2026. The cost delta closes
        within months on most office fit-outs against the cost of selective re-pulling later.
      </>
    ),
  },
  {
    question: 'Are Cat7 and Cat7A actually used in UK installations?',
    answer: (
      <>
        Rarely in horizontal cabling. Cat7 / Class F (600 MHz) and Cat7A / Class FA (1000 MHz) are
        ISO/IEC and BS EN specifications — there is no equivalent TIA Category, because the North
        American market jumped from Cat6A to Cat8 directly. They use S/FTP construction (overall
        braid + per-pair foil) and either an RJ45 connector or specialist GG45 / TERA connectors.
        They appear most often where a client has chosen them historically, in some broadcast /
        industrial settings, or where a designer wants the very highest copper performance without
        going to fibre. For most UK office and commercial work in 2026, the sensible copper choice
        is Cat6A; for higher density / longer reach, fibre is the next step rather than Cat7.
      </>
    ),
  },
  {
    question: 'Where does the 750 mA / 90 W PoE figure come from in BS 7671 §716?',
    answer: (
      <>
        IEEE 802.3bt (2018) defines four PoE Types. <strong>Type 4</strong> is the highest:{' '}
        <strong>90 W maximum at the PSE</strong> (power sourcing equipment) and{' '}
        <strong>71.3 W maximum at the PD</strong> (powered device), delivered over four pairs. BS
        7671:2018+A4:2026 §716.523.2.101 then sets a hard regulatory cap on the cable side:{' '}
        <strong>750 mA maximum design current per conductor</strong>. §716.526.101 imposes the same
        750 mA per contact at the connecting hardware. These are the numbers that bound every PoE
        deployment in the UK from 15 April 2026 — the wattage figures (90 W / 71.3 W) come from IEEE
        802.3bt; the 750 mA hard cap comes from BS 7671. Never cite "100 W" — it is not in any
        standard.
      </>
    ),
  },
  {
    question: 'How does Class differ from Category in real-world testing and certification?',
    answer: (
      <>
        Category is what is printed on the cable jacket. Class is what the installed channel
        actually measures when tested with a TIA-1152-A / BS EN 50346 field tester. The contractor
        warrants Class — not Category. A poor installation (tight bundles, sharp bends, untorqued
        terminations, runs alongside LV power without proper segregation per BS 7671 §444 + §528)
        takes Cat6A components and delivers a Class E or worse channel. The certification report at
        handover is the legal record of what was installed. That is why install practice (M2S5)
        matters as much as the cable choice (M2S1).
      </>
    ),
  },
];

const DataCablingModule2Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'Twisted Pair Basics and Categories | Data Cabling Module 2.1 | Elec-Mate',
    'How balanced twisted pair works — differential signalling, common-mode rejection and twist rates — and the Class / Category map from Cat5e (Class D) to Cat8.2 (Class II), aligned with BS 7671:2018+A4:2026 §716.521.101 for ELV DC over balanced cabling.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Twisted Pair Basics and Categories"
            description="How balanced twisted pair actually works — differential signalling, common-mode rejection and the twist itself — and the Class / Category landscape from Cat5e (Class D, 100 MHz) through to Cat8.2 (Class II, 2000 MHz), aligned with the BS 7671:2018+A4:2026 §716.521.101 permitted list for ELV DC distribution over balanced cabling."
            tone="yellow"
          />

          <TLDR
            points={[
              'Twisted pair is BALANCED: a differential transmitter drives equal-and-opposite voltages onto the two conductors, the receiver subtracts them, and any noise picked up identically on both conductors (common-mode) cancels at the receiver. The twist guarantees the two conductors share the same noise field along the run.',
              'Each pair inside a 4-pair cable has a different twist rate. Identical twist rates would lock adjacent pairs into a fixed coupling geometry; different rates de-correlate the inter-pair coupling along the length and suppress NEXT (near-end crosstalk).',
              'Category (Cat5e / 6 / 6A / 7 / 7A / 8.1 / 8.2) is what you buy. Class (D / E / EA / F / FA / I / II) is what you certify after installation. The two map closely (Cat6A ≈ Class EA), but a poor install with good cable still fails Class testing — and Class is what the contractor warrants.',
              'BS 7671:2018+A4:2026 §716.521.101 lists the Categories permitted for ELV DC distribution over balanced cabling: Cat5, Cat6, Cat6A, Cat7, Cat7A, Cat8.1, Cat8.2. The hard caps are 750 mA per conductor (§716.523.2.101) and 750 mA per contact at the connecting hardware (§716.526.101).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why a twisted pair is "balanced" and define differential signalling, common-mode noise and the role of the twist in noise rejection',
              'Describe why each pair inside a 4-pair cable has a different twist rate and link that to NEXT (near-end crosstalk) suppression',
              'Recite the Class / Category mapping (Class D ≈ Cat5e, Class E ≈ Cat6, Class EA ≈ Cat6A, Class F ≈ Cat7, Class FA ≈ Cat7A, Class I ≈ Cat8.1, Class II ≈ Cat8.2) and quote the headline frequency for each',
              'Distinguish what Category buys (parts) from what Class delivers (a tested, certified channel) and identify why the contractor warrants Class — not Category',
              'Pick the practical 2026 default Category for a UK commercial horizontal install (Cat6A / Class EA) and justify that choice on bandwidth headroom, PoE absorption, and lifecycle cost',
              'Recall the BS 7671:2018+A4:2026 §716.521.101 permitted list of Categories for ELV DC distribution over balanced cabling, and read it alongside the §716.523.2.101 / §716.526.101 hard 750 mA caps',
              'Recognise where Cat7 / Cat7A and Cat8.1 / Cat8.2 actually live in real installations (rare horizontal use; data-centre top-of-rack only for Cat8) and explain why each is not the default',
              'Trace the historical path of the Categories from Cat3 (16 MHz, 10BASE-T, 1991) to Cat6A (500 MHz, 10GBASE-T, 2008) and Cat8 (2000 MHz, 25/40GBASE-T to 30 m, 2016)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>How balanced transmission actually works</ContentEyebrow>

          <ConceptBlock
            title="Two conductors, equal and opposite — the receiver subtracts and the noise vanishes"
            plainEnglish={`A "balanced" pair is a pair of conductors driven by a differential transmitter. The transmitter puts equal-and-opposite voltages on the two wires (if one is +1 V, the other is -1 V, and the wanted signal is the 2 V difference). The receiver does not look at either wire absolutely — it looks at the DIFFERENCE between them. Any noise that picks up identically on both wires (common-mode noise) is the same on both sides of the subtraction and cancels to zero at the receiver. The wanted signal — equal and opposite — is preserved (and actually doubled in the subtraction). That is the entire mechanism of unshielded twisted pair.`}
            onSite="On site, the practical consequence is: balance is a property you can RUIN. Crush one conductor, untwist the pair past the termination, terminate roughly so the two wires of a pair end up different lengths inside the connector — and you have broken the balance. The pair still carries DC continuity and the cable tester reports 'wired correctly', but a Class EA channel test now fails on return loss or NEXT. The whole noise-rejection story depends on the two conductors being electrically indistinguishable; everything about installation practice (M2S5) is downstream of that single requirement."
          >
            <p>The three ingredients that make balanced transmission work:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Differential drive.</strong> The transmitter chip pushes +V on one wire and
                -V on the other, simultaneously. The signal of interest is the difference between
                the two — never the absolute voltage on either wire.
              </li>
              <li>
                <strong>Differential receive.</strong> The receiver subtracts the two wire voltages.
                Any voltage common to both (mains hum, RF pickup, switching transients from a nearby
                contactor, fluorescent ballast harmonics) appears on both sides of the subtraction
                and cancels.
              </li>
              <li>
                <strong>The twist.</strong> The two conductors of the pair are physically wound
                around each other so they share the same magnetic-field environment along the whole
                run. Without the twist, one conductor might run closer to a noise source than the
                other and they would pick up different amounts of noise — common-mode rejection
                would fail. The twist guarantees the common-mode assumption.
              </li>
            </ul>
            <p>
              Common-mode rejection is rated by the receiver chip in dB. Modern Ethernet PHYs
              achieve 60-80 dB CMRR (common-mode rejection ratio) at audio frequencies, degrading at
              higher frequencies. The cable&apos;s contribution is to keep the balance high — every
              termination, splice or sharp bend that disturbs the geometric symmetry of the pair
              degrades the cable&apos;s contribution to CMRR.
            </p>
          </ConceptBlock>

          {/* Differential signalling diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Balanced pair — how common-mode noise cancels at the receiver
            </h4>
            <svg
              viewBox="0 0 900 620"
              className="w-full h-auto"
              role="img"
              aria-label="Schematic of a balanced twisted pair. On the left, a differential transmitter drives plus-V onto the top conductor and minus-V onto the bottom conductor. The two conductors are drawn as twisted lines running rightward. A noise source above the pair couples equally into both conductors as common-mode noise. On the right, the differential receiver subtracts the two conductor voltages: the signal doubles, and the common-mode noise cancels to zero. Annotations identify the differential drive, the twist, the common-mode coupling, and the subtraction at the receiver. A legend at the bottom maps colours to wanted signal, common-mode noise, and resulting output."
            >
              {/* ===== Top label row (y=20-40) — TWIST + EMI label callouts ===== */}
              <text
                x="450"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TWIST keeps both conductors inside the same external field
              </text>

              {/* ===== EMI source row (y=60-110) — clear of all conductors ===== */}
              <rect
                x="380"
                y="60"
                width="140"
                height="50"
                rx="8"
                fill="rgba(248,113,113,0.14)"
                stroke="#F87171"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="82"
                textAnchor="middle"
                fill="#FCA5A5"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                EMI source
              </text>
              <text
                x="450"
                y="100"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10"
                fontFamily="system-ui"
              >
                mains / RF / contactor
              </text>

              {/* ===== Coupling-arrow zone (y=110-200) — empty vertical zone, dashed arrows only ===== */}
              <line
                x1="410"
                y1="110"
                x2="410"
                y2="248"
                stroke="#F87171"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <polygon points="406,244 414,244 410,252" fill="#F87171" />
              <line
                x1="450"
                y1="110"
                x2="450"
                y2="248"
                stroke="#F87171"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <polygon points="446,244 454,244 450,252" fill="#F87171" />
              <line
                x1="490"
                y1="110"
                x2="490"
                y2="248"
                stroke="#F87171"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <polygon points="486,244 494,244 490,252" fill="#F87171" />
              <text
                x="540"
                y="170"
                fill="#FCA5A5"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                noise couples
              </text>
              <text
                x="540"
                y="184"
                fill="#FCA5A5"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                equally into both
              </text>

              {/* ===== Conductor row (y=260-310) — TX, conductors, RX in one row ===== */}
              {/* TX block */}
              <rect
                x="40"
                y="240"
                width="130"
                height="100"
                rx="10"
                fill="rgba(168,85,247,0.14)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="105"
                y="272"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TX
              </text>
              <text
                x="105"
                y="292"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Differential
              </text>
              <text
                x="105"
                y="308"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                driver
              </text>
              <text
                x="105"
                y="326"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                drives +V / −V
              </text>

              {/* RX block */}
              <rect
                x="730"
                y="240"
                width="130"
                height="100"
                rx="10"
                fill="rgba(34,197,94,0.14)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="795"
                y="272"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RX
              </text>
              <text
                x="795"
                y="292"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Differential
              </text>
              <text
                x="795"
                y="308"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                receiver
              </text>
              <text
                x="795"
                y="326"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Va − Vb
              </text>

              {/* Twisted-pair conductors — sweep between TX (x=170) and RX (x=730) */}
              <path
                d="M 170 264 Q 220 252, 270 264 T 370 264 T 470 264 T 570 264 T 670 264 T 730 264"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.2"
              />
              <path
                d="M 170 316 Q 220 328, 270 316 T 370 316 T 470 316 T 570 316 T 670 316 T 730 316"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.2"
              />

              {/* Conductor end labels — placed in dedicated columns just outside TX/RX */}
              <text
                x="184"
                y="258"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                +V
              </text>
              <text
                x="184"
                y="332"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                −V
              </text>
              <text
                x="704"
                y="258"
                textAnchor="end"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Va
              </text>
              <text
                x="704"
                y="332"
                textAnchor="end"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Vb
              </text>

              {/* ===== Result row — dedicated panel below conductors ===== */}
              <rect
                x="40"
                y="380"
                width="820"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="406"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                AT THE RECEIVER
              </text>
              <text x="60" y="432" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Signal: differential, (+V) − (−V) = 2V — preserved and doubled by the subtraction.
              </text>
              <text x="60" y="454" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Noise: common-mode, identical on both wires — cancels to zero in the subtraction.
              </text>
              <text x="60" y="482" fill="#9CA3AF" fontSize="10.5" fontFamily="system-ui">
                UTP works because BALANCE is preserved end to end. Break the balance and CMRR
                collapses.
              </text>

              {/* ===== Legend panel — bottom, separate rect ===== */}
              <rect
                x="40"
                y="520"
                width="820"
                height="80"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="544"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              <line x1="60" y1="568" x2="92" y2="568" stroke="#FACC15" strokeWidth="2.2" />
              <text x="102" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Wanted signal (differential)
              </text>

              <line
                x1="320"
                y1="568"
                x2="352"
                y2="568"
                stroke="#F87171"
                strokeWidth="1.6"
                strokeDasharray="4 3"
              />
              <text x="362" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Common-mode noise (cancels)
              </text>

              <rect
                x="600"
                y="560"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="624" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Receiver subtraction output
              </text>

              <rect
                x="60"
                y="586"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="84" y="597" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Differential transmitter
              </text>

              <rect
                x="320"
                y="586"
                width="14"
                height="14"
                rx="3"
                fill="rgba(248,113,113,0.18)"
                stroke="#F87171"
                strokeWidth="1.4"
              />
              <text x="344" y="597" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                EMI / interference source
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.2-E (2024) · §4 (Balanced cabling — paraphrased)"
            clause={
              <>
                Balanced twisted-pair cabling relies on the matched electrical characteristics of
                the two conductors of each pair, the differential signalling of the connected
                equipment, and the geometric twist of the pair to deliver the specified channel
                performance. Conductor-to-conductor capacitive and inductive imbalance,
                untwisted-pair length at terminations, and asymmetry of insulation displacement
                contacts all degrade the channel&apos;s common-mode rejection and increase return
                loss.
              </>
            }
            meaning="Balance is fragile. Every disturbance to the geometric symmetry of the pair — an over-stripped jacket, untwisted-pair length at the IDC, asymmetric crimp, a tight cable tie that crushes one wire more than the other — degrades the channel. The cable manufactures the balance; the installer either preserves it or destroys it. M2S4 (terminations) and M2S5 (install practices) are how that balance is kept intact."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why every pair has a different twist rate</ContentEyebrow>

          <ConceptBlock
            title="Different twist rates de-correlate inter-pair coupling and suppress NEXT"
            plainEnglish="Inside a 4-pair cable, the four pairs each have a different twist rate (twists per metre). This is not cosmetic and it is not manufacturing convenience. If two adjacent pairs ran at the same twist rate they would lock into a fixed geometric relationship along the whole run, and the magnetic field of one would couple steadily into the other — that is near-end crosstalk (NEXT) and it would be enormous. Different twist rates cause the geometric relationship between any two pairs to slide along the length, the inter-pair coupling averages out, and NEXT is suppressed."
            onSite="A common quality marker on jobs: pull the jacket back on a sample of the cable, and check that the four pairs really do twist at different visible rates. Cheap counterfeit cable sometimes uses identical twist rates because it is faster to manufacture. The cable tester will reveal it later — NEXT figures will be marginal across the whole job. Buy from named manufacturers, check the printed legend on the jacket, keep a sample for the file. The twist rates you can see on a 50 mm cut-back are the cable's NEXT performance."
          >
            <p>The full crosstalk picture inside a 4-pair cable:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>NEXT (near-end crosstalk).</strong> Coupling from one pair into another at
                the SAME end as the transmitter. Worst-case coupling because the disturbing signal
                is at full strength near the source. The headline crosstalk figure in every Class /
                Category specification.
              </li>
              <li>
                <strong>FEXT (far-end crosstalk).</strong> Coupling from one pair into another at
                the OPPOSITE end from the transmitter. Weaker than NEXT because the disturbing
                signal has attenuated along the run, but still relevant at high speeds. Specified as
                ACR-F (attenuation-to-crosstalk ratio, far-end) in modern standards.
              </li>
              <li>
                <strong>PSNEXT (power-sum NEXT).</strong> Total NEXT from all OTHER pairs into ONE
                pair, summed. Critical for 1000BASE-T / 10GBASE-T which use all four pairs
                simultaneously — every pair sees combined disturbance from all three of its
                neighbours.
              </li>
              <li>
                <strong>Alien crosstalk (AXT, PSANEXT, PSAACR-F).</strong> Coupling between ADJACENT
                cables in a bundle. Cat6A is the first Category to specify alien crosstalk — the
                trigger was 10GBASE-T&apos;s sensitivity to it. Bundles, ties, sharp stacking and
                parallel runs all matter for AXT. Covered fully in M2S5.
              </li>
            </ul>
            <p>
              Combined with the BALANCE story, this gives the full design picture: the twist gives
              the pair its common-mode rejection (immunity to outside-the-cable noise); different
              twist rates between pairs give the cable its inter-pair NEXT performance (immunity to
              inside-the-cable crosstalk); and at higher Categories, conductor separators and
              overall constructions add alien-crosstalk control between cables.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Categories — Cat5e through Cat8.2</ContentEyebrow>

          <ConceptBlock
            title="A bandwidth ladder: each Category solves the previous Category's ceiling"
            plainEnglish="The Categories are not arbitrary marketing tiers. Each one was created to deliver a specific Ethernet generation that the previous Category could not. Cat3 carried 10BASE-T but failed at 100BASE-TX. Cat5 carried 100BASE-TX but was marginal at 1000BASE-T. Cat5e tightened Cat5 to make 1000BASE-T reliable. Cat6 / Cat6A / Cat8 each opened new headroom for the next Ethernet generation. The bandwidth ladder is the easiest way to remember them."
            onSite={`As a contractor, when a client asks "which Cat?", the question behind the question is "what services and what life?". Cat5e for legacy gigabit only and a 5-year horizon. Cat6 for retrofit upgrades where Cat6A pull is impossible. Cat6A for new commercial — the 2026 default. Cat7 / 7A only when an existing spec mandates it (rare in UK). Cat8.x is data-centre top-of-rack only — never a horizontal-cabling answer.`}
          >
            <p>The Categories in service-life order, oldest to newest:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Cat3 (1991, 16 MHz, OBSOLETE).</strong> Original twisted-pair Category.
                10BASE-T (10 Mbps) and analogue voice. Not on the BS 7671 §716.521.101 PoE permitted
                list. Should not be installed today; encountered only in pre-2000 buildings.
              </li>
              <li>
                <strong>Cat5 (1991, 100 MHz, OBSOLETE).</strong> The original 100 MHz Category.
                100BASE-TX (100 Mbps Fast Ethernet). Marginal at 1000BASE-T. Replaced by Cat5e. On
                §716.521.101 (legacy reference) but not used in new installs.
              </li>
              <li>
                <strong>Cat5e (1999, 100 MHz, Class D).</strong> The "enhanced" Cat5. Tightened
                NEXT, PSNEXT, return loss and delay skew specs. Reliably supports 1000BASE-T (1
                Gbps) at 100 m. Legacy minimum for new installs.
              </li>
              <li>
                <strong>Cat6 (2002, 250 MHz, Class E).</strong> Doubled the bandwidth of Cat5e.
                10GBASE-T supported only on a de-rated channel (typically 55 m). Common retrofit /
                mid-tier choice. ON the §716.521.101 list.
              </li>
              <li>
                <strong>Cat6A (2008, 500 MHz, Class EA) — the 2026 horizontal default.</strong>{' '}
                10GBASE-T at the full 100 m channel. Adds alien-crosstalk specification.
                Construction usually includes a pair separator (X-spline / cross-web). ON the
                §716.521.101 list.
              </li>
              <li>
                <strong>Cat7 (2002, 600 MHz, Class F, ISO-only).</strong> Per-pair foil + overall
                braid (S/FTP). No equivalent TIA Category. RJ45 or specialist GG45 / TERA connector.
                Rare in UK horizontal. ON the §716.521.101 list.
              </li>
              <li>
                <strong>Cat7A (2008, 1000 MHz, Class FA, ISO-only).</strong> Higher-spec Cat7. Same
                construction style. Rare. ON the §716.521.101 list.
              </li>
              <li>
                <strong>Cat8.1 (2016, 2000 MHz, Class I).</strong> Data-centre top-of-rack.
                25/40GBASE-T, 30 m channel only. RJ45 connector — backwards-compatible. ON the
                §716.521.101 list.
              </li>
              <li>
                <strong>Cat8.2 (2016, 2000 MHz, Class II).</strong> Same bandwidth and reach as
                Cat8.1, but uses non-RJ45 connectors (TERA / GG45) for higher performance margins.
                ON the §716.521.101 list.
              </li>
            </ul>
          </ConceptBlock>

          {/* Bandwidth ladder diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Bandwidth ladder — Category, Class, frequency, headline service
            </h4>
            <svg
              viewBox="0 0 980 720"
              className="w-full h-auto"
              role="img"
              aria-label="Horizontal bar chart of cable Categories ranked by maximum frequency. Cat5e at 100 megahertz, Cat6 at 250 megahertz, Cat6A at 500 megahertz, Cat7 at 600 megahertz, Cat7A at 1000 megahertz, and Cat8.1 and Cat8.2 both at 2000 megahertz. For each Category, the corresponding Class is listed (D, E, EA, F, FA, I, II) and the headline Ethernet service is annotated. A legend at the bottom marks the 2026 commercial horizontal default."
            >
              {/* ===== Column header row (y=20-40) — labels ABOVE all bars, dedicated row ===== */}
              <text
                x="30"
                y="32"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                CATEGORY
              </text>
              <text
                x="170"
                y="32"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                RELATIVE BANDWIDTH (MHz)
              </text>
              <text
                x="690"
                y="32"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                HEADLINE SERVICE
              </text>

              {/* Frequency tick row (y=46-58) — clear of all bars */}
              <text
                x="210"
                y="46"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
                fontFamily="system-ui"
              >
                100
              </text>
              <text
                x="270"
                y="46"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
                fontFamily="system-ui"
              >
                250
              </text>
              <text
                x="370"
                y="46"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
                fontFamily="system-ui"
              >
                500
              </text>
              <text
                x="510"
                y="46"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
                fontFamily="system-ui"
              >
                1000
              </text>
              <text
                x="670"
                y="46"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
                fontFamily="system-ui"
              >
                2000
              </text>

              <line
                x1="170"
                y1="58"
                x2="970"
                y2="58"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />

              {/* ===== Cat5e — Category column (x=30), bar (x=170-210), service column (x=690+) ===== */}
              <text
                x="30"
                y="98"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat5e
              </text>
              <text x="30" y="115" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class D
              </text>
              <rect
                x="170"
                y="85"
                width="40"
                height="26"
                rx="5"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="690" y="100" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                100 MHz · 1000BASE-T (1 Gbps)
              </text>
              <text x="690" y="116" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Legacy minimum for new installs
              </text>

              {/* ===== Cat6 ===== */}
              <text
                x="30"
                y="158"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat6
              </text>
              <text x="30" y="175" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class E
              </text>
              <rect
                x="170"
                y="145"
                width="100"
                height="26"
                rx="5"
                fill="rgba(59,130,246,0.18)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text x="690" y="160" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                250 MHz · 10GBASE-T to 55 m (de-rated)
              </text>
              <text x="690" y="176" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Retrofit upgrade
              </text>

              {/* ===== Cat6A — emphasised ===== */}
              <text
                x="30"
                y="218"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat6A
              </text>
              <text
                x="30"
                y="235"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class EA
              </text>
              <rect
                x="170"
                y="205"
                width="200"
                height="26"
                rx="5"
                fill="rgba(234,179,8,0.22)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <text
                x="690"
                y="220"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                500 MHz · 10GBASE-T at full 100 m
              </text>
              <text
                x="690"
                y="236"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui"
              >
                2026 commercial horizontal default
              </text>

              {/* ===== Cat7 ===== */}
              <text
                x="30"
                y="278"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat7
              </text>
              <text x="30" y="295" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class F · ISO
              </text>
              <rect
                x="170"
                y="265"
                width="240"
                height="26"
                rx="5"
                fill="rgba(99,102,241,0.18)"
                stroke="#6366F1"
                strokeWidth="1.4"
              />
              <text x="690" y="280" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                600 MHz · S/FTP construction
              </text>
              <text x="690" y="296" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Rare in UK horizontal cabling
              </text>

              {/* ===== Cat7A ===== */}
              <text
                x="30"
                y="338"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat7A
              </text>
              <text x="30" y="355" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class FA · ISO
              </text>
              <rect
                x="170"
                y="325"
                width="340"
                height="26"
                rx="5"
                fill="rgba(139,92,246,0.18)"
                stroke="#8B5CF6"
                strokeWidth="1.4"
              />
              <text x="690" y="340" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                1000 MHz · S/FTP heavy-duty
              </text>
              <text x="690" y="356" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Niche specifications
              </text>

              {/* ===== Cat8.1 ===== */}
              <text
                x="30"
                y="398"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat8.1
              </text>
              <text x="30" y="415" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class I
              </text>
              <rect
                x="170"
                y="385"
                width="500"
                height="26"
                rx="5"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="690" y="400" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                2000 MHz · 25/40GBASE-T to 30 m
              </text>
              <text x="690" y="416" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Data-centre top-of-rack · RJ45
              </text>

              {/* ===== Cat8.2 ===== */}
              <text
                x="30"
                y="458"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat8.2
              </text>
              <text x="30" y="475" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Class II
              </text>
              <rect
                x="170"
                y="445"
                width="500"
                height="26"
                rx="5"
                fill="rgba(20,184,166,0.18)"
                stroke="#14B8A6"
                strokeWidth="1.4"
              />
              <text x="690" y="460" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                2000 MHz · 25/40GBASE-T to 30 m
              </text>
              <text x="690" y="476" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Data-centre top-of-rack · TERA / GG45
              </text>

              {/* ===== Legend / footer panel — separate rect ===== */}
              <rect
                x="30"
                y="520"
                width="920"
                height="180"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="50"
                y="544"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Two-column legend */}
              <rect
                x="50"
                y="558"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="74" y="570" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class D — Cat5e (legacy minimum)
              </text>

              <rect
                x="50"
                y="580"
                width="14"
                height="14"
                rx="3"
                fill="rgba(59,130,246,0.18)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text x="74" y="592" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class E — Cat6 (retrofit)
              </text>

              <rect
                x="50"
                y="602"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.22)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <text
                x="74"
                y="614"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class EA — Cat6A (2026 default)
              </text>

              <rect
                x="500"
                y="558"
                width="14"
                height="14"
                rx="3"
                fill="rgba(99,102,241,0.18)"
                stroke="#6366F1"
                strokeWidth="1.4"
              />
              <text x="524" y="570" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class F / FA — Cat7 / Cat7A (niche)
              </text>

              <rect
                x="500"
                y="580"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="524" y="592" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class I — Cat8.1 (DC top-of-rack)
              </text>

              <rect
                x="500"
                y="602"
                width="14"
                height="14"
                rx="3"
                fill="rgba(20,184,166,0.18)"
                stroke="#14B8A6"
                strokeWidth="1.4"
              />
              <text x="524" y="614" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Class II — Cat8.2 (DC top-of-rack)
              </text>

              {/* Standards footer (separate divider) */}
              <line
                x1="50"
                y1="640"
                x2="930"
                y2="640"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="490"
                y="660"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                All Categories above are on the BS 7671:2018+A4:2026 §716.521.101 PoE-permitted
                list.
              </text>
              <text
                x="490"
                y="678"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Cat3 and Cat4 are NOT permitted. §716.521.101 lists Cat5; practical legacy minimum
                is Cat5e.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.521.101 (Cable category — verbatim)"
            clause={
              <>
                Information and communication technology (ICT) cables used for the distribution of
                DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category
                7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by
                reference to the specifications given in BS EN 50288 series.
              </>
            }
            meaning="From 15 April 2026, every PoE deployment in the UK must use cable from this Category list. Cat3 and Cat4 are not on it — they are obsolete and fail the BS EN 50173-1 / BS EN 50288 reference. Note that §716.521.101 lists Category 5 (not Cat5e), reflecting legacy compatibility, but the practical UK minimum for new installs is Cat5e — and Cat6A is the 2026 default for new commercial work."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class vs Category — what the contractor warrants</ContentEyebrow>

          <ConceptBlock
            title="You buy Category. You hand over Class. They are not the same artefact."
            plainEnglish={`Category is a property of the parts — the cable, the connectors, the patch panels, the patch leads. It is what is printed on the cable jacket and on the connector packaging. Class is a property of the installed channel — measured, certified, tested. Category EA components installed badly will fail a Class EA channel test. Class is what gets handed over with TIA-1152-A / BS EN 50346 test reports. Class is what the warranty covers.`}
            onSite={`At handover, the document the client retains is the channel test report — one row per link, with PASS / FAIL against Class EA on each tested parameter (insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance, alien crosstalk where applicable). That report references the Class — not the Category on the jacket. If the building runs slow in three years, the disputed evidence will be that report. Do not specify "Cat6A" alone; specify "Cat6A components, Class EA channel certified to TIA-1152-A / BS EN 50346 at handover".`}
          >
            <p>The chain that connects Category to Class:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Specification.</strong> Choose a Class for the building life and the
                services foreseen. Choose Category components that can deliver that Class (typically
                Cat6A → Class EA in 2026 commercial).
              </li>
              <li>
                <strong>Components.</strong> Cable, connectors, patch panels, patch leads — every
                physical part on the channel — must be of the chosen Category or higher. Mixing
                Cat6A cable with Cat5e jacks gives you a Class D channel, not Class EA.
              </li>
              <li>
                <strong>Installation practice.</strong> BS EN 50174-2 / TIA-568.2-E install
                requirements: bend radii, pulling tensions, supports, separation from LV power (BS
                7671 §444 + §528), termination quality, bundle management. Bad practice drops the
                channel by one or more Classes.
              </li>
              <li>
                <strong>Test &amp; certify.</strong> Every link tested with a TIA-1152-A Level III
                or higher field tester (or BS EN 50346 equivalent). Permanent-link or channel report
                generated, signed, retained for the warranty period.
              </li>
              <li>
                <strong>Documentation.</strong> Every link labelled (BS EN 50174-1 / TIA-606-D),
                test report linked to label, as-built drawings updated. Class is now traceable per
                port for the building life.
              </li>
            </ul>
            <p>
              The discipline is Class certification. The marketing language that says &quot;Cat6A
              guarantees 10 Gbps&quot; is wrong — it guarantees nothing on its own. Cat6A components
              plus correct install practice plus channel certification gives you a Class EA channel
              that supports 10GBASE-T. Skip any link in the chain and the guarantee evaporates.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Class / Category mapping for UK structured cabling"
            source="BS EN 50173-1 · ISO/IEC 11801-1 · ANSI/TIA-568.2-E · BS 7671:2018+A4:2026 §716.521.101"
            headers={[
              'Category (TIA)',
              'Class (EN/ISO)',
              'Frequency',
              'Headline service',
              'Typical use',
            ]}
            rows={[
              [
                'Cat5e',
                'Class D',
                '100 MHz',
                '1000BASE-T (1 Gbps)',
                'Legacy minimum for new installs',
              ],
              ['Cat6', 'Class E', '250 MHz', '10GBASE-T to 55 m (de-rated)', 'Retrofit upgrade'],
              [
                'Cat6A',
                'Class EA',
                '500 MHz',
                '10GBASE-T at 100 m',
                '2026 commercial horizontal default',
              ],
              [
                'Cat7 (ISO-only)',
                'Class F',
                '600 MHz',
                '10GBASE-T with margin',
                'Niche / legacy spec',
              ],
              ['Cat7A (ISO-only)', 'Class FA', '1000 MHz', '10GBASE-T with high margin', 'Niche'],
              [
                'Cat8.1',
                'Class I',
                '2000 MHz',
                '25/40GBASE-T to 30 m',
                'Data-centre top-of-rack (RJ45)',
              ],
              [
                'Cat8.2',
                'Class II',
                '2000 MHz',
                '25/40GBASE-T to 30 m',
                'Data-centre top-of-rack (TERA/GG45)',
              ],
            ]}
            notes="Every Category in this table is on the BS 7671:2018+A4:2026 §716.521.101 PoE permitted list. Read alongside the §716.523.2.101 hard cap of 750 mA per conductor and §716.526.101 hard cap of 750 mA per contact at the connecting hardware."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for cable selection"
            plainEnglish="From 15 April 2026, BS 7671:2018+A4:2026 §716 introduces — for the first time in the UK wiring regulations — a Category-level constraint on the cable that distributes ELV DC power over balanced cabling. Combined with the §716.523.2.101 hard 750 mA per-conductor cap and the §716.526.101 hard 750 mA per-contact cap at the connecting hardware, this defines a regulatory envelope that did not previously exist. Before A4:2026 the cable choice was a BS EN 50173 / installation-practice question; from A4:2026 it is also a BS 7671 question."
            onSite={`On a UK PoE job from April 2026 onwards, the contractor's cable specification has to satisfy two layers: BS EN 50173-1 / TIA-568.2-E (does the Category deliver the required Class?) AND BS 7671 §716.521.101 (is the Category on the permitted list?). The two lists overlap entirely in practice — every modern Category is on both — but the regulatory layer is new and the certification handover should reference both.`}
          >
            <p>The three §716 clauses that bound cable selection from 15 April 2026:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716.521.101 — cable Category list.</strong>{' '}
                <AmendmentBadge regs={['716.521.101']} edition="A4:2026" /> Cat5, Cat6, Cat6A, Cat7,
                Cat7A, Cat8.1, Cat8.2 — verbatim. Cat3 / Cat4 are NOT permitted.
              </li>
              <li>
                <strong>§716.523.2.101 — load current ≤ 750 mA per conductor.</strong>{' '}
                <AmendmentBadge regs={['716.523.2.101']} edition="A4:2026" /> The hard regulatory
                ceiling. Per CONDUCTOR — not per pair, not per cable. With 4-pair PoE Type 4 (90 W
                PSE / 71.3 W PD), the worst-case per-conductor current stays well below 750 mA when
                the cable is rated and bundles are managed; this clause is what bounds bundle
                de-rating and LP-rated cable selection.
              </li>
              <li>
                <strong>§716.526.101 — connecting hardware ≥ 750 mA per contact.</strong>{' '}
                <AmendmentBadge regs={['716.526.101']} edition="A4:2026" /> The matching cap at the
                connector. Connectors must support a continuous operating current of 750 mA per
                contact and (where disconnection under load is foreseen) meet BS EN 60512-9-3
                endurance testing. Covered fully in M2S4.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Specifying 'Cat6A' alone in a tender, with no Class certification clause"
            whatHappens={
              <>
                The specification says &quot;Cat6A throughout&quot;. The cheapest bidder wins,
                installs Cat6A-printed cable with Cat5e-spec jacks, ties bundles tightly with no
                separation from the LV submains, terminates roughly. Tests are not required by the
                contract. Two years later the building wants 10G to the desk and the channel will
                not link reliably. The client claims the cable was misrepresented; the contractor
                points at the jacket print and says they delivered what was specified. There is no
                test evidence to settle the dispute.
              </>
            }
            doInstead={
              <>
                Specify Cat6A components AND mandate Class EA channel certification per TIA-1152-A /
                BS EN 50346 at handover, with a digital test report retained for the warranty
                period. Specify install practices that protect the Class: bend radii (≥ 4× cable OD
                at install, ≥ 8× under stress per BS EN 50174-2), bundle size limits (TIA TSB-184-A
                under loaded PoE), separation from LV power (BS 7671 §444 + §528 + Annex A444),
                torque-controlled terminations. The deliverable is a CHANNEL — Cat6A is just the
                parts list.
              </>
            }
          />

          <Scenario
            title="The QS asks why Cat6A and not Cat6 — it is fifty pence a metre cheaper"
            situation={
              <>
                A 220-outlet office fit-out. The QS is comparing Cat6 against Cat6A on a cost line
                and asking the design team to justify the Cat6A premium. The architect has already
                specified PoE++ for desk-level lighting and ceiling APs, with a 15-year building
                life expected.
              </>
            }
            whatToDo={
              <>
                Frame the answer around three numbers, not one. (1) Bandwidth headroom: 250 MHz vs
                500 MHz. Cat6 supports 10GBASE-T only on a 55 m de-rated channel with strict
                alien-crosstalk control; Cat6A delivers it at the full 100 m. (2) PoE thermal
                headroom: under continuous Type 4 (90 W PSE) loading in tight bundles, Cat6A&apos;s
                23 AWG construction (vs Cat6&apos;s 23/24 AWG mix) carries the current with less
                temperature rise, leaving more margin against the §716.523.2.101 750 mA hard cap.
                (3) Lifecycle cost: the small per-metre saving across 220 outlets is a few thousand
                pounds once; a selective re-pull to Cat6A in year 5 to support 10G to the desk is
                tens of thousands. The Cat6A premium pays back inside 12-18 months once any 10G
                service request lands.
              </>
            }
            whyItMatters={
              <>
                Cable choice is a service-independence decision, not a parts-cost decision. The M1S1
                lifecycle-cost framing is the right reply to a QS who is comparing Cat6 and Cat6A on
                parts price alone. With BS 7671:2018+A4:2026 §716 in force from 15 April 2026, the
                PoE regulatory envelope (Category list + 750 mA cap) makes the
                bandwidth-and-thermal-headroom argument even stronger.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Twisted pair is BALANCED — differential signalling plus the twist gives common-mode rejection without a metallic screen. Break the balance (rough termination, untwist past the IDC, asymmetric crimp) and CMRR collapses.',
              'Each pair has a different twist rate to suppress NEXT — pair-to-pair coupling along the cable. Identical twist rates would lock pairs into fixed coupling geometry and NEXT would be enormous.',
              'Category is what you BUY (Cat5e / 6 / 6A / 7 / 7A / 8.1 / 8.2). Class is what you CERTIFY (D / E / EA / F / FA / I / II). The contractor warrants Class — not Category.',
              'Cat6A / Class EA is the 2026 UK commercial horizontal default — 500 MHz, 10GBASE-T at 100 m, headroom for Type 4 PoE thermal loading, on the §716.521.101 list.',
              'BS 7671:2018+A4:2026 §716.521.101 lists permitted PoE Categories: Cat5, Cat6, Cat6A, Cat7, Cat7A, Cat8.1, Cat8.2. The hard caps are 750 mA per conductor (§716.523.2.101) and 750 mA per contact (§716.526.101).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: UTP, FTP, STP Explained
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule2Section1;
