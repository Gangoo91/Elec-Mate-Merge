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
    id: 'datacabling-m2s2-shield-codes',
    question: 'A datasheet shows a cable marked "U/FTP". Which construction is this?',
    options: [
      'Unshielded overall, with no foil per pair — i.e. plain UTP.',
      'Unshielded overall (no overall screen), with each pair individually wrapped in foil.',
      'Foil overall, with no per-pair shielding.',
      'Foil overall AND foil per pair.',
    ],
    correctIndex: 1,
    explanation:
      'The shield notation is XX/YTP where XX = overall shield (U = unshielded, F = foil, S = braid) and Y = per-pair shield (U = unshielded, F = foil). U/FTP therefore means: U (no overall shield) / F (foil per pair) TP (twisted pair). It is the construction used by most premium Cat6A and almost all Cat7 cables — the per-pair foils suppress alien crosstalk between pairs without the bulk and termination effort of an overall braid. F/UTP (foil overall, unshielded pairs) is the more common screened Cat6A. S/FTP (braid overall + foil per pair) is the heaviest-duty option, common in Cat7 / Cat7A.',
  },
  {
    id: 'datacabling-m2s2-when-to-shield',
    question:
      'You are designing horizontal cabling for a tenant\u2019s standard office floor in a steel-framed building, with no obvious EMI sources, and a moderate PoE++ load (cameras + APs). The client wants the lowest sensible install cost. What is the right cable construction?',
    options: [
      'Always use S/FTP — shielding is always better.',
      'U/UTP (plain unshielded twisted pair) Cat6A is sensible. The balance of the pair already rejects ordinary office EMI; shielded variants raise cost, install time and bonding burden without measurable benefit in a low-EMI office. Specify shielded only when a real driver exists — heavy industrial EMI, high alien-crosstalk concerns in dense bundles, or sustained Type 4 PoE everywhere.',
      'FTP because the client mentioned PoE.',
      'Use coax instead.',
    ],
    correctIndex: 1,
    explanation:
      'The default for ordinary commercial office horizontal in 2026 is U/UTP Cat6A. The balance of the pair handles the EMI environment; shielded variants are an upgrade for real drivers — heavy industrial EMI, very dense bundles under sustained high-current PoE, demanding alien-crosstalk requirements, or specific client / sector mandates. Shielded cabling is more expensive, harder to terminate, requires bonding, and has zero benefit if the EMI environment does not need it. "Always shield" is wrong; "shield where it pays" is right.',
  },
  {
    id: 'datacabling-m2s2-screen-bonding',
    question:
      'Your spec is F/UTP Cat6A (foil overall, no per-pair shielding). On a UK job under BS 7671:2018+A4:2026, what must happen to the foil at termination?',
    options: [
      'It can be cut off — the foil is for manufacturing only.',
      'The foil (a metallic sheath / screen of a data transmission cable) must be connected to the equipotential bonding network. §444.5.3.1 lists "metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables" as parts that shall be connected to the equipotential bonding network. In practice the foil bonds to the screened keystone / patch panel, which bonds via the rack-bonding bar to the building\u2019s equipotential bonding network (BS EN 50310 / BS 7671 §545).',
      'It should be earthed at BOTH ends with a 16 mm\u00b2 conductor.',
      'It should be left floating to avoid earth loops.',
    ],
    correctIndex: 1,
    explanation:
      '§444.5.3.1 (verbatim) lists the parts that "shall be connected to the equipotential bonding network" — and the very first item is "metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables or of information and communications technology equipment." A floating foil is not a screen; it is a parasitic capacitor. The foil bonds at the screened RJ45 / keystone / patch panel, the panel bonds to the rack-bonding bar, the rack bar bonds to the TBB / TGB and ultimately to the MET / MFET (BS 7671 §545). Earthing at BOTH ends is also fine on UK jobs (and recommended in BS EN 50174-2 / BS EN 50310 for high-frequency screens) provided the bonding network is properly meshed; the old "single-end earth to avoid loops" rule is obsolete for ICT screens above audio frequencies.',
  },
  {
    id: 'datacabling-m2s2-containment-as-screen',
    question:
      'A designer proposes UTP Cat6A throughout, run inside continuous bonded steel cable basket / trunking. The QS questions whether shielded cable is needed for EMC. What\u2019s the BS 7671 + EN view?',
    options: [
      'Shielded cable is mandatory regardless of containment.',
      'Bonded metallic containment is recognised as a screening method. BS 7671 Annex A444 Table A444.1 reduces the required Band I / II separation distance with containment type — open metallic containment 200 mm, perforated 150 mm, fully enclosed (solid) requires no physical separation other than the containment itself. Combined with the §444.5.3.1 bonding rule for metallic containment, fully-enclosed bonded steel containment can act as the EMC barrier and unshielded cable is acceptable.',
      'It is fine; EMC does not apply to data cabling.',
      'Only fibre is permitted in steel containment.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Annex A444 Table A444.1 explicitly recognises containment type as a screening method, with the separation distance reduced from 200 mm in free air down to no physical separation when fully-enclosed solid metallic containment is used. §444.5.3.1 then mandates that metallic containment is connected to the equipotential bonding network. Combined, this means: fully-enclosed, bonded steel containment is itself a screen, and unshielded balanced cable inside it is acceptable for EMC purposes. The choice between U/UTP-in-bonded-tray and F/UTP-in-basket is a real engineering trade-off — sometimes containment is the right answer; sometimes a screened cable is.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Decode the cable shield code F/UTP correctly.',
    options: [
      'Foil overall AND foil per pair, twisted pair.',
      'Foil overall, unshielded pairs — an overall foil screen, no per-pair shielding.',
      'Foil per pair only, with no overall shield.',
      'Plain unshielded twisted pair, no foil anywhere.',
    ],
    correctAnswer: 1,
    explanation:
      'The notation is XX/YTP where XX = overall shield code (U = unshielded, F = foil, S = braid, SF = braid + foil) and Y = per-pair shield code (U = unshielded, F = foil). F/UTP therefore = foil overall, unshielded pairs. Common in screened Cat6A. U/FTP = unshielded overall, foil per pair (premium Cat6A / most Cat7). S/FTP = braid overall + foil per pair (heavy-duty Cat7 / Cat7A). U/UTP = plain unshielded twisted pair (the default for ordinary office Cat6A).',
  },
  {
    id: 2,
    question:
      'Why is "balance" — not the screen — the primary noise-rejection mechanism in twisted pair?',
    options: [
      'Differential signalling plus the twist cancels common-mode noise at the receiver.',
      'A screen reflects external fields, whereas balance only attenuates them.',
      'Shielding adds capacitance that degrades the signal more than it protects it.',
      'The screen carries the return current, so the pair balance is irrelevant.',
    ],
    correctAnswer: 0,
    explanation:
      'Balance is the primary rejection mechanism — covered in M2S1. Differential signalling means the receiver subtracts the two wire voltages; common-mode noise (identical on both wires) cancels in the subtraction. The twist guarantees the two conductors share the same noise field along the run. Shielding adds margin on top of that — it is not the primary mechanism. This is why U/UTP works fine in ordinary office EMI: the balance is doing the work.',
  },
  {
    id: 3,
    question:
      'What is the practical difference between F/UTP and U/FTP at the same Cat6A performance class?',
    options: [
      'They are electrically identical, only the jacket colour differs.',
      'F/UTP uses four per-pair foils; U/FTP uses one overall foil.',
      'F/UTP has one overall foil; U/FTP has four per-pair foils for better isolation.',
      'F/UTP is rated for fibre, U/FTP only for copper.',
    ],
    correctAnswer: 2,
    explanation:
      'F/UTP wraps a single foil around the whole core (all four pairs together). Cheaper, slightly easier to strip and terminate. Adequate for most Cat6A work where alien crosstalk is the main shielding driver. U/FTP wraps each pair individually — four foils inside one jacket. More expensive, more termination care, but better isolation between pairs (NEXT margin) and excellent alien-crosstalk control. U/FTP is the standard construction for Cat7 / Cat7A and is a common premium Cat6A choice for high-density / high-PoE / long-run jobs.',
  },
  {
    id: 4,
    question:
      'When does the BS 7671 framework actively REQUIRE a metallic screen / shielded cabling?',
    options: [
      'On every data installation, without exception.',
      'On any installation larger than 1000 square metres.',
      'It never mandates a screen, but 444.5.3.1 requires bonding any screen that is present.',
      'Only where a horizontal cable run exceeds 90 m.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 does not say "use shielded cable" as a blanket rule. It does say (§444.5.3.1) that ANY screen, sheath, conductive containment or armouring of data cables shall be connected to the equipotential bonding network. The decision to use a screen is driven by the EMC environment and by the §444 / §528 / Annex A444 segregation framework: if you can achieve clean separation from LV power and other disturbance sources with distance and containment, U/UTP is fine; if you cannot, screening is one of the engineering responses (separation, containment, segregation, screening — pick one or more).',
  },
  {
    id: 5,
    question: 'On a screened Cat6A install, which BS 7671 clause is the "bond the foil" hook?',
    options: [
      'Reg 411.3.1.1 (protective equipotential bonding for ADS).',
      'Reg 528.1 (proximity of wiring systems to other services).',
      'Reg 543.7 (high protective conductor current circuits).',
      'Reg 444.5.3.1 (parts connected to the equipotential bonding network).',
    ],
    correctAnswer: 3,
    explanation:
      'Verbatim from §444.5.3.1: "The following parts shall be connected to the equipotential bonding network: (a) metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables or of information and communications technology equipment; (b) functional earthing conductors of antenna systems; (c) conductors of the earthed pole of a DC supply for information and communications technology equipment; (d) functional earthing conductors; (e) protective conductors." This is the regulatory hook for bonding the foil / braid of any screened ICT cable on a UK installation.',
  },
  {
    id: 6,
    question:
      'A designer proposes "U/UTP Cat6A inside continuous bonded steel cable basket" with no separate cable screen. Why is this defensible under BS 7671 + BS EN?',
    options: [
      'Bonded fully-enclosed containment is itself a recognised screen under Annex A444.',
      'Steel basket generates its own EMI that masks external interference.',
      'BS EN 50174-2 forbids shielded cable inside steel basket anyway.',
      'The steel reflects all incoming EMI back outwards.',
    ],
    correctAnswer: 0,
    explanation:
      'Annex A444 Table A444.1 explicitly trades containment performance against physical separation: open metallic containment 200 mm, perforated 150 mm, fully-enclosed (solid) requires no separation other than containment itself. §444.5.3.1 mandates the containment be bonded to the equipotential bonding network. Together, bonded containment is recognised as the screen — and unshielded cable inside it is a defensible engineering choice. The trade-off is real (containment cost vs cable cost) and either approach can be the right answer depending on the route, the labour rate, and the EMI environment.',
  },
  {
    id: 7,
    question:
      'Why does sustained Type 4 PoE++ make alien crosstalk a practical concern in dense bundles?',
    options: [
      'The higher DC current produces higher-frequency noise on the pair.',
      'PoE current is alternating, so it couples directly into adjacent pairs.',
      'Sustained DC current heats the bundle, raising insertion loss and eroding crosstalk margins.',
      'Alien crosstalk is unrelated to PoE current entirely.',
    ],
    correctAnswer: 2,
    explanation:
      'PoE current is DC, but sustained DC carries heat — every loaded conductor dissipates I\u00b2R losses as heat, and dense bundles trap that heat. Cable temperature rise raises insertion loss (BS 7671 §716.523.1.101 NOTE 1 spells this out) and erodes every other channel parameter. Alien crosstalk between adjacent cables (the Cat6A speciality) is one of those parameters. Shielded cables (per-pair foils especially) restore alien-crosstalk margin even in hot bundles. For sustained Type 4 PoE++ across dense bundles, an F/UTP or U/FTP Cat6A is a defensible engineering choice — and BS 7671 §716.523.2.101 still caps per-conductor current at 750 mA regardless.',
  },
  {
    id: 8,
    question:
      'A client insists on S/FTP Cat7A for a standard office. What\u2019s the right professional response?',
    options: [
      'Refuse the job outright as over-specified.',
      'Quote for Cat7A but quietly substitute Cat6A on site.',
      'Tell them BS 7671 mandates Cat6A for offices.',
      'Explain the trade-offs, then deliver Cat7A correctly if they still want it.',
    ],
    correctAnswer: 3,
    explanation:
      'Client autonomy is real — but informed consent is the contractor\u2019s job. The conversation is: "U/UTP Cat6A is the 2026 default for ordinary office because of [bandwidth, balance, cost, termination simplicity]. S/FTP Cat7A genuinely buys you something in [list of demanding cases]. Your environment is [office]. Here are the costs of each approach. Which would you like to proceed with?" If they still pick Cat7A — fine, deliver it well. If they pick Cat6A — that was the intention. The wrong moves are silent substitution (fraud) and refusal without explanation (rude).',
  },
  {
    id: 9,
    question:
      'Earthing the cable screen at BOTH ends used to be considered bad practice (earth-loop concerns). What is the modern UK position?',
    options: [
      'Always earth the screen at a single end only.',
      'Leave the screen unearthed at both ends.',
      'Earth at one end for runs over 30 m, both ends below that.',
      'Bond both ends into a properly meshed equipotential bonding network.',
    ],
    correctAnswer: 3,
    explanation:
      'The "single-end earth to avoid earth loops" rule comes from analogue audio practice — at 50 Hz, loop currents flowing in screens caused hum. ICT screens face high-frequency disturbances where the screen needs a low-impedance return at both ends to be effective at all. BS 7671 §444.1.3 specifies a meshed bonding network (mesh ≤ 2 m × 2 m for high-density ICT areas) which all-but eliminates the mains-frequency loop concern. BS EN 50310 / BS EN 50174-2 align: bond ICT screens at both ends into a properly designed bonding network. §444.5.3.1 is the BS 7671 hook.',
  },
  {
    id: 10,
    question: 'Which TWO factors most cleanly justify upgrading from U/UTP to a shielded variant?',
    options: [
      'Heavy industrial / broadcast / medical EMI, plus dense bundles under sustained high-current PoE.',
      'A shorter horizontal run, plus the use of LSZH jacketing.',
      'A larger conductor gauge, plus a higher Category rating.',
      'A neater containment route, plus a single equipment room.',
    ],
    correctAnswer: 0,
    explanation:
      'The two cleanest engineering justifications for screening are: (1) an EMI environment that exceeds what balance alone can handle (heavy contactor switching, industrial drives, broadcast / medical equipment, proximity to high-current LV that cannot be separated per Annex A444 Tables A444.1 / A444.2), and (2) dense bundles under sustained high-current PoE where alien crosstalk erodes the channel (TIA TSB-184-A bundle modelling, §716.523.1.101 NOTE on temperature rise increasing insertion loss). Both are real engineering drivers; "always shield" or "never shield" are both wrong.',
  },
];

const faqs = [
  {
    question: 'How do I read those XX/YTP shield codes — F/UTP, U/FTP, S/FTP, F/FTP?',
    answer: (
      <>
        Read them left-to-right around the slash. <strong>XX before the slash</strong> = the overall
        shield (the one wrapped around the whole cable core, inside the jacket): <strong>U</strong>{' '}
        = no overall shield, <strong>F</strong> = foil overall, <strong>S</strong> = braid overall,{' '}
        <strong>SF</strong> = braid plus foil overall. <strong>Y after the slash</strong> = the
        per-pair shield (around each individual pair):
        <strong> U</strong> = no per-pair shield, <strong>F</strong> = foil around each pair. Then{' '}
        <strong>TP</strong> = twisted pair. So <strong>U/UTP</strong> is plain unshielded;
        <strong> F/UTP</strong> has an overall foil only; <strong>U/FTP</strong> has per-pair foils
        only; <strong>S/FTP</strong> has overall braid plus per-pair foils; <strong>F/FTP</strong>{' '}
        has overall foil plus per-pair foils.
      </>
    ),
  },
  {
    question: 'Why is U/UTP Cat6A even acceptable for office use? Is it not "less protected"?',
    answer: (
      <>
        U/UTP is acceptable because the noise rejection comes from the BALANCE of the pair —
        differential signalling plus the twist — not from a screen. In ordinary office EMI, the
        balance margin of a properly-installed Cat6A channel is sufficient. Shielding adds
        protection against very high-frequency or very strong external fields, raises alien
        crosstalk margin in dense bundles, and helps under sustained high-current PoE — but it is
        not "more protected" by default; it is a different engineering trade-off. U/UTP costs less,
        terminates faster, and has no bonding burden — and for ordinary office EMI, that is the
        right answer.
      </>
    ),
  },
  {
    question: 'When should I specify a shielded cable on a UK job?',
    answer: (
      <>
        When at least one of these is true: heavy industrial / broadcast / medical EMI on site,
        validated by survey or by an Annex A444 separation calculation that says you cannot achieve
        clean Band I / Band II distance; dense bundles carrying sustained Type 4 PoE++ where
        alien-crosstalk erosion is the engineering concern; long parallel runs alongside LV submains
        where containment is impractical; or specific client / sector mandates (broadcast specs,
        medical critical-care, defence). Otherwise default to U/UTP. The wrong move is reflexively
        shielding everything because it "feels safer" — that pays in material, labour, bonding
        effort, and termination time without measurable benefit.
      </>
    ),
  },
  {
    question: 'How does BS 7671 §444.5.3.1 affect my screened cable installation?',
    answer: (
      <>
        §444.5.3.1 (verbatim) lists the parts that "shall be connected to the equipotential bonding
        network" — and the very first item is "metallic containment, conductive screens, conductive
        sheaths or armouring of data transmission cables or of information and communications
        technology equipment." So on every screened ICT cable, the screen MUST be bonded — at the
        connector, into the screened keystone / patch panel, into the rack bonding bar, into the
        Telecommunications Bonding Backbone (TBB) per BS EN 50310, and ultimately into the MET /
        MFET (BS 7671 §545). A floating screen is non-compliant — and electrically useless: it acts
        as a parasitic capacitor instead of a screen.
      </>
    ),
  },
  {
    question: 'What is the alternative to using shielded cable for EMC?',
    answer: (
      <>
        Bonded metallic containment — recognised by BS 7671 Annex A444 Table A444.1. Open metallic
        containment reduces the required Band I / II separation from 200 mm to 200 mm (no reduction
        at the open level), perforated open metallic containment to 150 mm, and fully-enclosed solid
        metallic containment can replace the physical separation entirely (NOTE 4: "no physical
        separation other than that provided by the containment"). Combined with the §444.5.3.1
        bonding rule, bonded fully-enclosed containment IS a screen — and the cable inside can be
        unshielded. The choice between U/UTP-in-bonded-tray and F/UTP-in-basket is a real
        engineering trade-off — sometimes containment is the right answer, sometimes a screened
        cable is.
      </>
    ),
  },
  {
    question: 'Can I terminate F/UTP into an unshielded RJ45?',
    answer: (
      <>
        No. The screen has to terminate into a screened keystone or shielded RJ45 plug that bonds
        the foil drain wire (or the foil itself) to the metal body of the connector, which in turn
        bonds to the screened patch panel and onward to the rack bonding bar. An unshielded RJ45
        leaves the foil floating at the end — non-compliant with §444.5.3.1 and electrically
        pointless. Mixing screened cable with unshielded jacks is one of the most common termination
        errors on screened jobs and it is testable: the field tester reports an open or floating
        screen and the link fails certification on screen continuity.
      </>
    ),
  },
];

const DataCablingModule2Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'UTP, FTP, STP Explained | Data Cabling Module 2.2 | Elec-Mate',
    'Unshielded vs foiled vs shielded twisted pair — decoding F/UTP, U/FTP, S/FTP and F/FTP, when shielding actually helps (EMI, alien crosstalk, sustained PoE), and the BS 7671 §444.5.3.1 rule that any metallic screen on a data cable must be bonded to the equipotential bonding network.'
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
            eyebrow="Module 2 · Section 2"
            title="UTP, FTP, STP Explained"
            description="Unshielded, foiled and shielded twisted pair — the XX/YTP shield notation, the four common constructions (U/UTP, F/UTP, U/FTP, S/FTP), when shielding genuinely helps, and how BS 7671:2018+A4:2026 §444.5.3.1 mandates that every metallic screen, sheath or armouring of a data transmission cable is bonded to the equipotential bonding network."
            tone="yellow"
          />

          <TLDR
            points={[
              'The shield notation is XX/YTP. XX = overall shield (U / F / S / SF). Y = per-pair shield (U / F). U/UTP is plain unshielded; F/UTP has an overall foil; U/FTP has per-pair foils; S/FTP has overall braid plus per-pair foils — heaviest construction for the most demanding EMI / alien-crosstalk environments.',
              'Balance — not the screen — is the primary noise-rejection mechanism. UTP works because the differential pair plus the twist rejects common-mode noise at the receiver. The screen is a SECOND mechanism that adds margin against very high-frequency / strong external fields and against alien crosstalk in dense bundles. The default for ordinary office EMI is U/UTP Cat6A.',
              'Specify shielded cable when there is a real driver: heavy industrial / broadcast / medical EMI, dense bundles under sustained Type 4 PoE++, long parallel runs alongside LV submains where containment is impractical, or specific client / sector mandates. Reflexively shielding everything pays in cost, labour and bonding effort without measurable benefit in low-EMI offices.',
              'BS 7671 §444.5.3.1 mandates that any metallic screen / sheath / armouring of a data cable, plus any metallic containment, shall be connected to the equipotential bonding network. Floating screens are non-compliant and electrically useless. BS 7671 Annex A444 Table A444.1 recognises bonded metallic containment as a screening alternative — open 200 mm, perforated 150 mm, fully-enclosed no separation needed.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Decode the XX/YTP shield notation correctly: U/UTP (plain UTP), F/UTP (foil overall), U/FTP (foil per pair), S/FTP (braid overall + foil per pair), F/FTP (foil overall + foil per pair)',
              'Explain why balance — not the screen — is the primary noise-rejection mechanism in twisted pair, and why U/UTP is the sensible default for ordinary office EMI',
              'Describe the three engineering drivers that justify upgrading to a shielded variant: heavy EMI environment, dense high-current PoE bundles with alien-crosstalk concerns, and sector / regulatory mandates',
              'Quote BS 7671:2018+A4:2026 §444.5.3.1 verbatim — every metallic screen, sheath, armouring or metallic containment of a data cable shall be connected to the equipotential bonding network',
              'Apply BS 7671 Annex A444 Table A444.1 — recognise that bonded metallic containment is itself a screen and reduces (or eliminates) the required Band I / II separation distance',
              'Explain why ICT screens are bonded at BOTH ends in a properly meshed bonding network (BS EN 50310 / §444.1.3), and why the old "single-end earth" rule applied only to analogue audio circuits',
              'Recognise the practical termination requirement that a screened cable must terminate into a screened keystone / shielded RJ45 / screened patch panel — never an unshielded jack',
              "Make a defensible 'screen vs no-screen' design decision on a UK job by combining the EMI survey, bundle / PoE thermal model, segregation distances from Annex A444, and the bonding burden of the screened option",
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four constructions and what each one does</ContentEyebrow>

          <ConceptBlock
            title="U/UTP, F/UTP, U/FTP, S/FTP — increasing layers of metal, increasing protection, increasing burden"
            plainEnglish={`Twisted-pair cable comes in four headline constructions. They differ only in where (and whether) metal is wrapped around the pairs. U/UTP has no metal at all — just balance and twist. F/UTP wraps an overall foil around all four pairs together. U/FTP wraps a foil around each pair individually but no overall screen. S/FTP wraps both — a braid overall AND a foil per pair. The more metal, the more protection from outside-the-cable noise and inside-the-cable alien crosstalk; also the more cost, the more termination effort, and the more bonding to manage.`}
            onSite="On site, the visible difference is at the cable end. A U/UTP termination is fast and routine. An F/UTP needs the foil drain wire neatly captured into the screened keystone. A U/FTP exposes four foils — each pair has its own — and these have to be folded back cleanly without nicking the conductors. An S/FTP has a full braid AND four foils. Each step up costs more termination time, demands a screened RJ45 / keystone with bonding tab, and adds the need for screen continuity testing at handover. None of that is a barrier — it is just the trade-off you accept when shielding is the right answer."
          >
            <p>The four constructions in increasing weight:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>U/UTP — plain unshielded twisted pair.</strong> No overall screen, no
                per-pair shield. Lightest, cheapest, fastest to terminate. The 2026 default for
                ordinary commercial office Cat6A. Relies entirely on pair balance and the twist for
                noise rejection.
              </li>
              <li>
                <strong>F/UTP — foil overall, unshielded pairs.</strong> One thin foil wrapped
                around all four pairs together, inside the jacket, plus a drain wire to make contact
                with the screened connector body. Common Cat6A premium construction. Adds margin
                against alien crosstalk and against general external fields without the cost / bulk
                of an overall braid.
              </li>
              <li>
                <strong>U/FTP — unshielded overall, foil per pair.</strong> No overall screen, but
                each of the four pairs is individually wrapped in foil. The standard construction
                for Cat7 / Cat7A and a common premium Cat6A. Excellent inter-pair isolation (NEXT
                margin) and very good alien-crosstalk control between cables. Heaviest demand on
                termination care because there are four foils to capture.
              </li>
              <li>
                <strong>S/FTP — braid overall plus foil per pair.</strong> The heavyweight
                construction. An overall woven braid (better high-frequency screening than foil, but
                bulkier) on top of per-pair foils. Standard for Cat7 / Cat7A and used for the most
                demanding EMI / industrial / broadcast / medical jobs. Highest cost, highest
                termination effort, highest bonding burden — and the highest performance margin.
              </li>
              <li>
                <strong>F/FTP — foil overall plus foil per pair.</strong> Less common variant with
                both an overall foil and per-pair foils. Found on some Cat6A and Cat7 product lines.
              </li>
            </ul>
          </ConceptBlock>

          {/* Cable cross-section diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Cross-sections — U/UTP, F/UTP, U/FTP and S/FTP at the same scale
            </h4>
            <svg
              viewBox="0 0 920 620"
              className="w-full h-auto"
              role="img"
              aria-label="Four cable cross-sections side by side. Each shows the outer jacket as a black ring, four twisted pairs inside as paired circles, and increasing layers of metallic shielding. U slash UTP has no metal at all. F slash UTP adds an overall foil ring inside the jacket. U slash FTP wraps each pair in its own foil but no overall shield. S slash FTP has both an overall braid ring and per pair foils. Each cross-section is labelled with its construction code and a short description below."
            >
              {/* ===== Panel title row (y=20-50) — labels ABOVE cross-sections ===== */}
              <text
                x="120"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                U/UTP
              </text>
              <text
                x="120"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                plain unshielded
              </text>

              <text
                x="340"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                F/UTP
              </text>
              <text
                x="340"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                overall foil only
              </text>

              <text
                x="580"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                U/FTP
              </text>
              <text
                x="580"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                per-pair foil only
              </text>

              <text
                x="800"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                S/FTP
              </text>
              <text
                x="800"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                braid + per-pair foil
              </text>

              {/* ===== Cross-section row (y=70-230) — geometry only, no labels ===== */}

              {/* Panel 1 — U/UTP, centred at x=120 y=150 */}
              <circle
                cx="120"
                cy="150"
                r="70"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="2"
              />
              {/* 4 pairs as paired circles, well inside jacket */}
              <circle
                cx="92"
                cy="124"
                r="10"
                fill="rgba(59,130,246,0.4)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <circle
                cx="108"
                cy="124"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="132"
                cy="124"
                r="10"
                fill="rgba(249,115,22,0.4)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <circle
                cx="148"
                cy="124"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="92"
                cy="170"
                r="10"
                fill="rgba(34,197,94,0.4)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <circle
                cx="108"
                cy="170"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="132"
                cy="170"
                r="10"
                fill="rgba(168,85,247,0.4)"
                stroke="#A855F7"
                strokeWidth="1.2"
              />
              <circle
                cx="148"
                cy="170"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />

              {/* Panel 2 — F/UTP, centred at x=340 y=150 */}
              <circle
                cx="340"
                cy="150"
                r="70"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <circle
                cx="340"
                cy="150"
                r="60"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.6"
                strokeDasharray="3 2"
              />
              <circle
                cx="312"
                cy="124"
                r="10"
                fill="rgba(59,130,246,0.4)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <circle
                cx="328"
                cy="124"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="352"
                cy="124"
                r="10"
                fill="rgba(249,115,22,0.4)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <circle
                cx="368"
                cy="124"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="312"
                cy="170"
                r="10"
                fill="rgba(34,197,94,0.4)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <circle
                cx="328"
                cy="170"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <circle
                cx="352"
                cy="170"
                r="10"
                fill="rgba(168,85,247,0.4)"
                stroke="#A855F7"
                strokeWidth="1.2"
              />
              <circle
                cx="368"
                cy="170"
                r="10"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />

              {/* Panel 3 — U/FTP, centred at x=580 y=150. Pairs in a 2x2 grid, each wrapped in foil */}
              <circle
                cx="580"
                cy="150"
                r="76"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="2"
              />
              {/* pair 1 — top-left, foil ellipse around two conductor circles */}
              <ellipse
                cx="555"
                cy="124"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="547"
                cy="124"
                r="8"
                fill="rgba(59,130,246,0.4)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <circle
                cx="563"
                cy="124"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              {/* pair 2 — top-right */}
              <ellipse
                cx="605"
                cy="124"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="597"
                cy="124"
                r="8"
                fill="rgba(249,115,22,0.4)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <circle
                cx="613"
                cy="124"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              {/* pair 3 — bottom-left */}
              <ellipse
                cx="555"
                cy="176"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="547"
                cy="176"
                r="8"
                fill="rgba(34,197,94,0.4)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <circle
                cx="563"
                cy="176"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              {/* pair 4 — bottom-right */}
              <ellipse
                cx="605"
                cy="176"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="597"
                cy="176"
                r="8"
                fill="rgba(168,85,247,0.4)"
                stroke="#A855F7"
                strokeWidth="1.2"
              />
              <circle
                cx="613"
                cy="176"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />

              {/* Panel 4 — S/FTP, centred at x=800 y=150 — overall braid + per-pair foil */}
              <circle
                cx="800"
                cy="150"
                r="80"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <circle
                cx="800"
                cy="150"
                r="68"
                fill="none"
                stroke="#A855F7"
                strokeWidth="3"
                strokeDasharray="2 2"
              />
              <ellipse
                cx="775"
                cy="124"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="767"
                cy="124"
                r="8"
                fill="rgba(59,130,246,0.4)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <circle
                cx="783"
                cy="124"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <ellipse
                cx="825"
                cy="124"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="817"
                cy="124"
                r="8"
                fill="rgba(249,115,22,0.4)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <circle
                cx="833"
                cy="124"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <ellipse
                cx="775"
                cy="176"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="767"
                cy="176"
                r="8"
                fill="rgba(34,197,94,0.4)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <circle
                cx="783"
                cy="176"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <ellipse
                cx="825"
                cy="176"
                rx="22"
                ry="14"
                fill="none"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <circle
                cx="817"
                cy="176"
                r="8"
                fill="rgba(168,85,247,0.4)"
                stroke="#A855F7"
                strokeWidth="1.2"
              />
              <circle
                cx="833"
                cy="176"
                r="8"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />

              {/* ===== Description rows BELOW each cross-section (y=260-330) ===== */}
              <text
                x="120"
                y="278"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                No overall screen
              </text>
              <text
                x="120"
                y="296"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                No per-pair foils
              </text>
              <text
                x="120"
                y="318"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                2026 office default
              </text>

              <text
                x="340"
                y="278"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Foil overall
              </text>
              <text
                x="340"
                y="296"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Pairs unshielded
              </text>
              <text
                x="340"
                y="318"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Common screened Cat6A
              </text>

              <text
                x="580"
                y="278"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Per-pair foils
              </text>
              <text
                x="580"
                y="296"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                No overall screen
              </text>
              <text
                x="580"
                y="318"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Cat7 / premium Cat6A
              </text>

              <text
                x="800"
                y="278"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Braid overall
              </text>
              <text
                x="800"
                y="296"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                + per-pair foils
              </text>
              <text
                x="800"
                y="318"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Cat7 / Cat7A heavy-duty
              </text>

              {/* ===== Notation note (y=360) ===== */}
              <text
                x="460"
                y="362"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Notation XX/YTP — XX = overall shield (U/F/S/SF) · Y = per-pair shield (U/F)
              </text>

              {/* ===== Legend panel (y=400-600) ===== */}
              <rect
                x="30"
                y="400"
                width="860"
                height="200"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="50"
                y="424"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Two-column legend */}
              <circle
                cx="60"
                cy="450"
                r="8"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="1.6"
              />
              <text x="80" y="454" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Outer cable jacket (PVC / LSZH)
              </text>

              <line
                x1="50"
                y1="478"
                x2="74"
                y2="478"
                stroke="#FACC15"
                strokeWidth="2.6"
                strokeDasharray="3 2"
              />
              <text x="84" y="482" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Foil shield — overall or per-pair
              </text>

              <line
                x1="50"
                y1="506"
                x2="74"
                y2="506"
                stroke="#A855F7"
                strokeWidth="3"
                strokeDasharray="2 2"
              />
              <text x="84" y="510" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Braid shield — overall
              </text>

              <circle
                cx="500"
                cy="450"
                r="6"
                fill="rgba(59,130,246,0.4)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <circle
                cx="514"
                cy="450"
                r="6"
                fill="rgba(248,250,252,0.4)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <text x="530" y="454" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Twisted pair — solid + striped conductor
              </text>

              <text x="500" y="482" fill="#9CA3AF" fontSize="10.5" fontFamily="system-ui">
                Pair colours: blue, orange, green, brown
              </text>

              <text x="500" y="510" fill="#9CA3AF" fontSize="10.5" fontFamily="system-ui">
                — matched to T568 wiring scheme
              </text>

              {/* Standards footer */}
              <line
                x1="50"
                y1="540"
                x2="870"
                y2="540"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="460"
                y="562"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                All four constructions can be Cat6A.
              </text>
              <text
                x="460"
                y="580"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Cat7 / Cat7A — typically U/FTP or S/FTP. Cat8.x — typically U/FTP or F/UTP.
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

          <ContentEyebrow>When the screen actually pays</ContentEyebrow>

          <ConceptBlock
            title="Three real engineering drivers — and the bonding burden you accept by choosing them"
            plainEnglish={`The screen helps in real, specific situations. It does not help in every situation. Reflexively shielding everything pays in cost, labour, bonding effort and termination time without measurable benefit if the EMI environment is ordinary. The professional question is not "shielded or unshielded?" — it is "what is the EMI driver, and is shielding the right response, or is containment / segregation / separation more appropriate?"`}
            onSite={`In a survey, the EMI assessment should look at: high-current LV submains parallel to ICT routes (compare to Annex A444 Tables A444.1 / A444.2); contactor / VSD / motor / welder / fluorescent ballast / lift sources (\u00a7444.41 lists the eleven typical disturbance sources verbatim); proximity to HID lamps (\u00a7444.6.2 \u2014 130 mm minimum); planned bundle density and PoE loading (TIA TSB-184-A bundle thermal model); and the labour rate cost of containment vs the material cost of screened cable. The answer falls out of the assessment.`}
          >
            <p>The three drivers that justify screening:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>1. Heavy EMI environment.</strong> Industrial floors with VSD-fed motors,
                broadcast / studio environments, medical critical-care areas, areas near contactors
                / welders / lift drives, or close proximity to LV submains where Annex A444
                separation cannot be achieved by distance and containment alone. §444.41 lists the
                typical disturbance sources verbatim. In these environments, balance alone is not
                enough — the screen adds the next decade of margin.
              </li>
              <li>
                <strong>2. Dense bundles under sustained high-current PoE.</strong> Cat6A&apos;s
                alien-crosstalk specification was written for cool cable. Type 4 PoE++ (90 W PSE /
                71.3 W PD per IEEE 802.3bt) carries sustained DC current; in tight bundles this
                raises cable temperature and erodes every channel parameter — including alien
                crosstalk. §716.523.1.101 NOTE 1 spells this out: "Any temperature rise of the data
                cables due to the load current they carry, or other causes, will increase the
                attenuation/insertion loss of the cables. Thus the performance of information
                transmission channels can be degraded." Per-pair foil (U/FTP or S/FTP) restores
                alien-crosstalk margin in hot bundles.
              </li>
              <li>
                <strong>3. Sector / regulatory mandates.</strong> Broadcast standards (EBU, facility
                specs), medical critical-care requirements, defence / classified environments, or
                specific client mandates that require shielded for trace / emanation reasons. Where
                the spec says S/FTP, deliver S/FTP — correctly bonded.
              </li>
            </ul>
            <p>
              Choosing a screened construction also commits you to the bonding burden: §444.5.3.1
              mandates that the screen be bonded; the screen must terminate into a screened keystone
              / shielded RJ45 / screened patch panel; the panel bonds to the rack bonding bar; the
              rack bonds to the Telecommunications Bonding Backbone (TBB) per BS EN 50310; the TBB
              bonds to the MET / MFET (BS 7671 §545). Every link gets tested for screen continuity
              at handover. If any of that is impractical or not going to be done well, you should
              not be specifying screened cable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.5.3.1 (Parts to be connected to the equipotential bonding network — verbatim)"
            clause={
              <>
                The following parts shall be connected to the equipotential bonding network: (a)
                metallic containment, conductive screens, conductive sheaths or armouring of data
                transmission cables or of information and communications technology equipment; (b)
                functional earthing conductors of antenna systems; (c) conductors of the earthed
                pole of a DC supply for information and communications technology equipment; (d)
                functional earthing conductors; (e) protective conductors.
              </>
            }
            meaning="Any screen, sheath, armouring or metallic containment of an ICT cable on a UK installation must be bonded to the equipotential bonding network. A floating screen is not just non-compliant — it is electrically useless and can act as a parasitic capacitor that injects unwanted couplings. The bonding path is: foil drain → screened RJ45 / keystone → screened patch panel → rack bonding bar → Telecommunications Bonding Backbone (BS EN 50310) → MET / MFET (BS 7671 §545)."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Bonding the screen — the BS 7671 framework</ContentEyebrow>

          <ConceptBlock
            title="The full bonding path: cable foil to MET / MFET"
            plainEnglish="A screened cable is only a screen if its metal is bonded — at both ends, into a properly meshed equipotential bonding network. Floating metal is a parasitic capacitor, not a screen. BS 7671:2018+A4:2026 makes this explicit at §444.5.3.1 (the cable side) and provides the bonding-network framework at §444.1.1 to §444.1.4 (mesh / star / ring topologies) and §545 (the new ICT functional earthing section, with the MFET concept)."
            onSite="Practically: the cable foil drain (or the foil itself in some constructions) lands in a screened keystone or a shielded RJ45 plug that has a metal body in contact with the foil. The keystone clips into a screened patch panel — also metal. The patch panel chassis is connected to the rack bonding bar. The rack bonding bar runs back to the building\u2019s Telecommunications Bonding Backbone (TBB) per BS EN 50310 / TIA-607-E. The TBB ultimately bonds to the MET (main earthing terminal) or the new MFET (main functional earthing terminal — BS 7671 \u00a7545.2). Every step of that chain has to actually exist, with continuity, or the screen is doing nothing."
          >
            <p>The five-step bonding chain from cable to MET / MFET:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Step 1 — cable termination.</strong> Foil + drain wire (or full braid) land
                in a screened keystone or shielded RJ45. The connector body is in continuous
                metallic contact with the screen.
              </li>
              <li>
                <strong>Step 2 — patch panel / outlet.</strong> The screened keystone clips into a
                screened patch panel chassis (or screened wall outlet); both are metal and bonded
                together by design.
              </li>
              <li>
                <strong>Step 3 — rack / outlet bond.</strong> The patch panel chassis bonds to the
                rack bonding bar via a dedicated bonding lead. Wall outlets bond to the local floor
                distribution back-box / containment (which is itself bonded under §444.5.3.1).
              </li>
              <li>
                <strong>Step 4 — TBB (Telecommunications Bonding Backbone).</strong> The rack
                bonding bar runs back to the TBB per BS EN 50310 / ANSI/TIA-607-E.
              </li>
              <li>
                <strong>Step 5 — MET / MFET.</strong> The TBB bonds to the MET (main earthing
                terminal) or the new MFET (main functional earthing terminal — §545.2). The MFET,
                where present, bonds to the MET only once (§545.1.1).
              </li>
            </ul>
            <p>
              At handover, every screened link is tested for screen continuity by the field tester
              (TIA-1152-A / BS EN 50346). A break anywhere in the chain shows up as a
              screen-continuity failure on the report. Floating screens fail certification — and are
              the most common failure mode on screened jobs.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.1.3 (Common meshed bonding star network — verbatim extract)"
            clause={
              <>
                A meshed equipotential bonding network is enhanced by the existing metallic
                structure of the building. It is supplemented by conductors forming the square mesh.
                Mesh size should be adapted to the dimensions of the installation to be protected
                and should be in accordance with the recommendations of BS EN 50310. Where concerns
                exist, the mesh size should be adapted to the dimensions of the installation to be
                protected, but should not exceed 2 m × 2 m in areas where equipment susceptible to
                electromagnetic environmental interferences is installed.
              </>
            }
            meaning="A meshed bonding network — mesh ≤ 2 m × 2 m in high-density ICT areas — is the modern reference design that solves the old 'earth loops' worry. With a properly meshed network, both-end bonding of cable screens (which is what high-frequency screening needs) is not only safe but required. The single-end-earth rule belongs to analogue audio history; for ICT screens above audio frequencies the answer is meshed bonding plus both-end bonded screens."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition. Cross-reference BS EN 50310 (Telecommunications bonding networks for buildings)."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Containment as bonded screen — Annex A444</ContentEyebrow>

          <ConceptBlock
            title="A bonded steel containment is itself a screen — the cable inside can be unshielded"
            plainEnglish={`BS 7671 Annex A444 Table A444.1 explicitly recognises that bonded metallic containment is part of the EMC solution. The required Band I / II separation distance varies with containment type: open metallic containment 200 mm, perforated open metallic containment 150 mm, fully-enclosed solid metallic containment requires no physical separation other than that provided by the containment itself. Combined with the \u00a7444.5.3.1 rule that metallic containment shall be bonded to the equipotential bonding network, bonded containment IS a screen \u2014 and the cable inside it can be unshielded.`}
            onSite={`This gives the designer a real choice on every job. Option A: U/UTP Cat6A inside continuous bonded steel cable basket / trunking. Option B: F/UTP Cat6A on perforated tray. Option C: S/FTP Cat7A on open ladder. The trade-off is real \u2014 containment vs cable cost, labour rate, route accessibility, future-flexibility for moves/adds/changes. There is no single right answer; there is a right answer for each route and each project.`}
          >
            <p>The Annex A444 Table A444.1 separation framework at a glance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>No containment / open metallic containment A:</strong> 200 mm minimum
                separation between Band I (data / ELV) and Band II (LV power) cables in free air.
              </li>
              <li>
                <strong>Perforated open metallic containment B:</strong> 150 mm minimum separation.
                NOTE 2 defines this as "equivalent to steel tray (duct without cover) 1.0 mm wall, ≤
                20 % perforation".
              </li>
              <li>
                <strong>Solid metallic containment C:</strong> NOTE 4 — "no physical separation
                other than that provided by the containment". NOTE 3 defines this as "fully enclosed
                steel containment 1.5 mm minimum wall".
              </li>
              <li>
                <strong>Bonding (§444.5.3.1):</strong> the containment must be bonded to the
                equipotential bonding network for any of the above to apply.
              </li>
              <li>
                <strong>Voltage / current scaling (Table A444.2):</strong> the base separations
                scale with disturbing voltage / current — 240 V → 0.45 m, 415 V → 0.58 m, 3.3 kV → 1
                m; 5 A → 0.24 m, 50 A → 0.5 m, 300 A → 0.85 m.
              </li>
            </ul>
            <p>
              The professional design conversation is therefore: "what containment am I using along
              this route, what voltage / current is the parallel LV running at, and what separation
              does Annex A444 give me?" — followed by "is the cable going to be shielded as well, or
              is the containment + separation enough?" Both can be the right answer.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Shield codes, typical Categories and BS 7671 bonding obligation"
            source="ISO/IEC 11801-1 · BS EN 50173-1 · ANSI/TIA-568.2-E · BS 7671:2018+A4:2026 §444.5.3.1"
            headers={[
              'Code',
              'Construction',
              'Common in',
              'Termination effort',
              '§444.5.3.1 bonding',
            ]}
            rows={[
              [
                'U/UTP',
                'No shielding',
                'Office Cat5e / Cat6 / Cat6A',
                'Lightest',
                'No screen to bond (containment if used must still be bonded)',
              ],
              [
                'F/UTP',
                'Foil overall, unshielded pairs',
                'Screened Cat6A',
                'Moderate (drain wire)',
                'Foil bonded via screened keystone → panel → rack → TBB → MET/MFET',
              ],
              [
                'U/FTP',
                'Per-pair foils, no overall',
                'Cat7 standard / premium Cat6A',
                'Higher (four foils)',
                'Per-pair foils bonded via screened RJ45 → panel → rack → TBB → MET/MFET',
              ],
              [
                'S/FTP',
                'Braid overall + per-pair foils',
                'Cat7 / Cat7A heavy-duty',
                'Highest',
                'Braid + foils bonded; full screen continuity tested at handover',
              ],
              [
                'F/FTP',
                'Foil overall + per-pair foils',
                'Some Cat6A / Cat7 lines',
                'Higher',
                'Both shields bonded',
              ],
              [
                'Bonded steel containment',
                'Cable unshielded; containment bonded',
                'Cat6A in steel basket / trunking',
                'Cable lightest; containment bonding work',
                'Containment itself bonded per §444.5.3.1; Annex A444 Table A444.1 reduces required separation',
              ],
            ]}
            notes="Either bond every metallic part of the cable system per §444.5.3.1, or bond the containment per the same clause and let the containment + Annex A444 separation do the screening. Floating metal is non-compliant in either case."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for shielded cable"
            plainEnglish="Amendment 4 (2026) does not introduce a new screening rule but it tightens and consolidates the framework around screens, screens bonding, and ICT functional earthing. §444.5.3.1 (the bonding rule for screens / containment / armouring of ICT cables) carries forward verbatim. The new §545 introduces ICT functional earthing as a distinct concept from protective earthing — including the MFET (Main Functional Earthing Terminal) — which is the ultimate destination of the bonding chain that starts at a cable screen."
            onSite="On a UK PoE / shielded job from 15 April 2026, the framework is: §444 (sources of EMC disturbance, screens bonding, segregation tables in Annex A444); §528 (proximity to other circuits); §545 (ICT functional earthing — MFET); §716 (PoE-specific, with the 750 mA hard caps); §521.10.202 (cables in escape routes). All five sit alongside BS EN 50173 / 50174 / 50310 — they don\u2019t replace them."
          >
            <p>The two A4:2026 changes most directly relevant to screened cable:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§545 — ICT functional earthing (NEW).</strong>{' '}
                <AmendmentBadge regs={['545.1.1', '545.2']} edition="A4:2026" /> Distinguishes
                functional earthing of ICT equipment (signal reference, EMC) from protective
                earthing under §543 / §544 (electrical safety). Introduces the MFET (Main Functional
                Earthing Terminal) concept — the ultimate destination of the bonding chain that
                starts at a cable screen. Minimum CSAs: 2.5 mm² Cu (with mechanical protection) or 4
                mm² Cu (without) per §545.1.2.
              </li>
              <li>
                <strong>§716 — PoE-specific cable rules (NEW).</strong>{' '}
                <AmendmentBadge
                  regs={['716.521.101', '716.523.2.101', '716.526.101']}
                  edition="A4:2026"
                />{' '}
                The Category list, the 750 mA per-conductor hard cap, and the 750 mA per-contact cap
                at the connecting hardware — all on top of the §444.5.3.1 screen-bonding rule.
                Sustained high-current PoE is one of the strongest contemporary drivers for
                considering a screened construction (per-pair foils restore alien-crosstalk margin
                in hot bundles).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Specifying F/UTP Cat6A but terminating into unshielded RJ45 jacks"
            whatHappens={
              <>
                The cable spec is F/UTP Cat6A but the wall outlets and patch panels were ordered as
                standard unshielded keystones. The installer terminates the cable normally — the
                foil drain wire is cut off because there is nowhere to land it. Channel tester
                reports PASS on wire-map and most parameters but flags a screen-continuity fail on
                every link. The screen is floating end-to-end. The job is non-compliant with
                §444.5.3.1, electrically the cable is acting like U/UTP with extra cost and weight,
                and the certification handover fails Class EA on screen continuity.
              </>
            }
            doInstead={
              <>
                Specify the screened cable AND the screened terminations as a coherent system:
                screened keystones, screened patch panels, screened RJ45 plugs on patch leads, rack
                bonding bar, bonding lead from panel chassis to rack bar, bonding from rack bar to
                TBB. The cable spec, the connectivity spec and the bonding spec are inseparable. If
                the budget will not stretch to the bonding work, do not specify a screened cable —
                go U/UTP Cat6A in bonded steel containment instead, and let Annex A444 + §444.5.3.1
                deliver the EMC story.
              </>
            }
          />

          <Scenario
            title="Industrial fit-out — VSDs nearby and 96-cable bundles to ceiling APs"
            situation={
              <>
                A logistics-warehouse first-fix. Conveyor lines run on VSD-fed motors; the cable
                routes pass within 1.5 m of the LV submains feeding them. The wireless design
                requires high-density ceiling APs (every 8 m), each pulling Type 4 PoE++. The
                horizontal cabling will go in 96-cable bundles down the perforated tray serving the
                upper roof void. Build standard wants 10GBASE-T to every AP.
              </>
            }
            whatToDo={
              <>
                Run the Annex A444 segregation calc first: VSD-fed LV submains in perforated
                metallic containment, parallel to ICT — Table A444.1 says 150 mm minimum. Validate
                that 150 mm can be held the entire route; if it cannot, you are into shielded
                territory regardless. Run the bundle thermal calc per TIA TSB-184-A: 96 cables ×
                Type 4 PoE × ambient warehouse temperature → significant temperature rise;
                alien-crosstalk margin in U/UTP Cat6A would be eroded. Conclusion: F/UTP or U/FTP
                Cat6A is the correct cable. Specify screened keystones and screened patch panels
                throughout, rack bonding bars, bond chains to the TBB, and §716 cable thermal
                compliance (≤ 750 mA per conductor; LP-rated cable considered). Run the cabling on
                the perforated tray with 150 mm separation from the LV submains; tray bonded per
                §444.5.3.1. Class EA channel certification with screen continuity at handover.
              </>
            }
            whyItMatters={
              <>
                "Always shield" and "never shield" are both wrong. The right answer falls out of the
                Annex A444 segregation calc and the bundle thermal calc. In this scenario, two real
                drivers (VSD EMI + dense PoE bundles) push the design firmly into shielded
                territory; in a normal office those same calcs would land at U/UTP. The contractor
                who can run the calcs and explain the answer is the one who delivers a defensible
                design.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Shield code XX/YTP: XX = overall shield (U / F / S / SF), Y = per-pair shield (U / F). U/UTP = plain unshielded; F/UTP = foil overall; U/FTP = foil per pair; S/FTP = braid + per-pair foil — heaviest construction.',
              'Balance is the primary noise rejection — UTP works because of differential signalling + twist, not because of a screen. The screen is a SECONDARY mechanism that adds margin against high-frequency / strong external fields and against alien crosstalk in dense bundles.',
              'BS 7671 §444.5.3.1 (verbatim): every metallic screen, sheath, armouring of a data cable AND every metallic containment shall be bonded to the equipotential bonding network. Floating screens are non-compliant and electrically useless.',
              'BS 7671 Annex A444 Table A444.1 recognises bonded metallic containment as a screen — open 200 mm separation, perforated 150 mm, fully-enclosed no separation needed. U/UTP-in-bonded-tray is a defensible alternative to F/UTP-in-basket.',
              'Specify shielded only when there is a real driver — heavy EMI, dense high-current PoE bundles, sector mandates. Reflexively shielding everything pays in cost and labour without measurable benefit in low-EMI environments. The bonding burden is part of the spec, not an afterthought.',
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
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Performance and Bandwidth
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule2Section2;
