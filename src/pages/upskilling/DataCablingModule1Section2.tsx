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
    id: 'datacabling-m1s2-physical-vs-logical',
    question:
      'A new building is cabled in a strict physical star — every work-area outlet has a dedicated home run back to the floor distributor. The active layer is configured as a Layer-2 spanning-tree network with VLAN trunks. Which statement is TRUE about the topology of this installation?',
    options: [
      'It is purely a star topology — the spanning-tree configuration has no bearing on the topology of the installation.',
      'It is a logical mesh, because the spanning tree creates many redundant forwarding paths through the cabling.',
      'The physical topology is a star and the logical topology is the spanning-tree forwarding pattern on top of it — both true at once, independently.',
      'It cannot be both at once — the generic-cabling standards forbid mixing topology types on one installation.',
    ],
    correctIndex: 2,
    explanation:
      'Physical topology is the SHAPE OF THE CABLING — what you can see in the wall and on the patch panel. Logical topology is the SHAPE OF THE TRAFFIC — how frames are forwarded by the switches. Structured cabling fixes the physical topology to a star (every outlet has a home run to an FD). The active layer can then run any logical topology on top: switched Ethernet behaves logically as a star at access and a mesh at backbone (with spanning tree pruning loops); legacy Token Ring ran as a logical ring on a physical star; ARCnet ran as a logical bus on a physical star. The structured cabling does not care — that is the whole point.',
  },
  {
    id: 'datacabling-m1s2-bus-failure-mode',
    question:
      'You are surveying an old industrial site that still has a thin coaxial bus segment running between four pieces of legacy plant. The client asks why this needs to be replaced before they can extend the network. What is the SINGLE most defensible technical reason?',
    options: [
      'Coax costs more per metre than twisted pair, so the segment is uneconomic to keep in service.',
      'The bus shares one electrical medium with terminators, so any break or loose tap takes down the whole segment, and CSMA/CD performance collapses as load grows.',
      'A bus is inherently faster than a star, so the legacy plant is over-served and the segment should be downgraded.',
      'BS 7671 §716 prohibits coaxial cable in fixed installations, so the segment is non-compliant and must be removed.',
    ],
    correctIndex: 1,
    explanation:
      'The shared-medium failure mode is the defining weakness of bus topology. One physical fault degrades or fails the whole segment, and capacity is shared among all attached stations (collision domain). Switched Ethernet on a physical star isolates each link — a fault on one link affects only that link, and each link gets its own bandwidth. Structured cabling (BS EN 50173-1) makes the physical-star discipline mandatory at access. BS 7671 does not prohibit coax (no such clause), but the engineering case for replacement is overwhelming.',
  },
  {
    id: 'datacabling-m1s2-collapsed-star',
    question:
      'A small single-floor office is cabled with one comms cabinet near the centre of the floor. All outlets home-run to that one cabinet. Strictly speaking, what is this called in the BS EN 50173-1 model?',
    options: [
      'A bus topology, because there is only one distributor serving the whole floor.',
      'A collapsed-star topology — BD and FD merge into one cabinet, but the horizontal cabling is still a strict physical star.',
      'A daisy chain, because the outlets are effectively chained back to a common cabinet.',
      'A non-compliant installation, because a single distributor breaches the hierarchical-star rule.',
    ],
    correctIndex: 1,
    explanation:
      'Collapsed star is the official term. BS EN 50173-1 defines a hierarchy with up to three distributor levels (CD-BD-FD). For a small single-tenancy single-floor site, the campus / building / floor distributors collapse into one, but the topology shape is unchanged — it is still a strict physical star with all outlets home-running to that one distributor. The 90 m permanent-link rule still applies. It is fully compliant, just simpler.',
  },
  {
    id: 'datacabling-m1s2-campus-star-of-stars',
    question:
      'A university campus has six buildings, each with its own internal structured cabling. The six buildings are connected by single-mode fibre back to a central computer-services building. Which topology label most accurately describes the campus as a whole?',
    options: [
      'A pure mesh — every building connects directly to every other building for redundancy.',
      'A star-of-stars (hierarchical star) — each building is a physical star at its BD, and the BDs all home-run to the campus distributor.',
      'A bus, because the inter-building fibre run is essentially one linear backbone medium.',
      'A ring, because campus traffic eventually returns to its source building over the fibre loop.',
    ],
    correctIndex: 1,
    explanation:
      'A star-of-stars (hierarchical star) is the canonical structured-cabling shape for any multi-building site. BS EN 50173-1 names the three distributor levels explicitly: CD (Campus), BD (Building), FD (Floor). Each level is a physical star anchored at the next level up. This shape is mandatory in the EN/ISO and TIA generic-cabling standards. The active-layer logical topology can still be a routed mesh between BDs for resilience — but the cabling itself is a hierarchical star.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In structured cabling, which physical topology is enforced for the horizontal subsystem in BS EN 50173-1, ISO/IEC 11801-1 and ANSI/TIA-568.0-E?',
    options: [
      'A bus, with each outlet tapped off a shared horizontal backbone via a T-piece and end terminators.',
      'A ring, with each outlet wired to the next and the last looped back to the floor distributor.',
      'A physical star, with every outlet on its own dedicated home run to a single floor distributor.',
      'A full mesh, with every outlet directly linked to every other outlet on the same floor.',
    ],
    correctAnswer: 2,
    explanation:
      'The horizontal subsystem is, by standard, a physical star anchored at the FD. Every outlet has its own permanent link — the foundation of service-independence, since the cabling shape is identical regardless of the active equipment or logical protocol on top.',
  },
  {
    id: 2,
    question:
      'Which statement most accurately captures the relationship between physical and logical topology?',
    options: [
      'They are always identical — the cabling shape and the traffic shape cannot differ on any network.',
      'They are always different — no network ever runs the same physical and logical shape together.',
      'Physical is the cabling shape, logical is the traffic path; one fixed physical star carries any logical topology.',
      'Only fibre links have a logical topology; copper links carry a physical topology and nothing else.',
    ],
    correctAnswer: 2,
    explanation:
      'Physical and logical topology are independent properties of the same network. Physical = where the wires actually go; logical = how frames are forwarded. The discipline of structured cabling is to fix the physical topology (a hierarchical star) so any reasonable logical topology can be supported now and over the cabling life — the fixed star can carry any logical topology on top.',
  },
  {
    id: 3,
    question:
      'Which legacy topology had a single shared electrical medium and is now effectively obsolete in commercial premises cabling?',
    options: [
      'Star — each station home-runs to a central hub over its own dedicated cable segment.',
      'Mesh — every station directly linked to several others, sharing no common medium.',
      'Tree — a hierarchy of branching links fanning out from a single root distributor.',
      'Bus — a single linear coax cable with end terminators, all stations sharing the medium under CSMA/CD.',
    ],
    correctAnswer: 3,
    explanation:
      'Bus topology is the historical "shared-medium" Ethernet. Switched Ethernet on twisted pair (10BASE-T onwards, 1990) replaced it because the physical star (a) isolates faults to one link, (b) gives each link its own bandwidth, and (c) plugs cleanly into the structured-cabling six-zone model. BS EN 50173-1 only acknowledges star topologies for generic cabling.',
  },
  {
    id: 4,
    question:
      'A ring topology routes traffic around a closed loop, with each device passing frames to the next. Which famous protocols ran logically as rings?',
    options: [
      'TCP/IP and HTTP, the transport and application protocols said to define ring-based addressing schemes.',
      'IEEE 802.5 Token Ring (logical ring on a physical star via the MAU) and FDDI (dual counter-rotating fibre rings).',
      'IEEE 802.3 Ethernet and IEEE 802.11 wireless, the two dominant access protocols on the modern switched LAN.',
      'BGP and OSPF, the Layer-3 routing protocols said to forward traffic around the network in a closed loop.',
    ],
    correctAnswer: 1,
    explanation:
      'Token Ring (IBM, 1985, IEEE 802.5) was the most common ring on the LAN, run logically as a ring on a PHYSICAL STAR via the multi-station access unit (MAU). FDDI (ANSI X3T9.5, 1986) was the dominant fibre-ring backbone of the early 1990s. Both relied on a token-passing MAC for deterministic latency. Modern equivalents — Resilient Ethernet Protocol (REP), ITU-T G.8032 ERPS — preserve the ring concept for industrial and metropolitan rings, but the cabling is still installed as a hierarchical star where possible.',
  },
  {
    id: 5,
    question:
      'A full mesh topology connects every node to every other node. Why is full mesh almost never used as a building-wide structured-cabling topology?',
    options: [
      'Its link count scales as n(n−1)/2, so cost, containment and management all grow quadratically with node count.',
      'It is expressly forbidden by BS 7671, which permits only star and tree topologies for fixed data cabling.',
      'It is inherently slower than a star because every frame must traverse multiple intermediate nodes en route.',
      'It can only be built in coaxial cable, which is obsolete and no longer manufactured for premises use.',
    ],
    correctAnswer: 0,
    explanation:
      'Full mesh has perfect redundancy but quadratic cost: for 100 nodes you need n(n−1)/2 = 4,950 dedicated links. No commercial building is cabled full-mesh. The use cases are small (under ~20 nodes) and high-value: data-centre spine-leaf cores, storage fabrics, critical industrial control rings, military mission systems. For everything else, hierarchical star + active-layer redundancy (spanning tree, Layer-3 routing, link aggregation) gives most of the resilience at a small fraction of the cost.',
  },
  {
    id: 6,
    question:
      'In a switched Ethernet network running on a physical-star structured-cabling installation, what is the LOGICAL topology of the access layer?',
    options: [
      'Also a star — each port is its own point-to-point link, with the switch as the central node.',
      'A bus — the switch backplane is a shared medium that all ports contend for under CSMA/CD.',
      'A ring — frames pass from port to port around the switch before reaching their destination.',
      'A full mesh — every port is logically connected to every other port on the switch simultaneously.',
    ],
    correctAnswer: 0,
    explanation:
      'Switched Ethernet at the access layer is logically a star — the switch is the centre and each port is a point-to-point link with its own collision domain, forwarding frames independently to and from one attached device. This is why the physical-star discipline of structured cabling marries so cleanly with Layer-2 switching.',
  },
  {
    id: 7,
    question:
      'A spanning-tree-protocol (STP / RSTP / MSTP) backbone connects three floor distributors and a building distributor with redundant uplinks. What does the protocol do, and why is it relevant to the topology discussion?',
    options: [
      'It measures each link and routes traffic down whichever cable currently has the highest available bandwidth.',
      'It encrypts the frames travelling across the backbone so the redundant uplinks cannot be eavesdropped.',
      'It elects a root bridge and blocks redundant ports to break Layer-2 loops, so a meshed backbone forwards as a loop-free tree.',
      'It applies only to coaxial backbones and has no role on a fibre or twisted-pair structured-cabling system.',
    ],
    correctAnswer: 2,
    explanation:
      'STP / RSTP / MSTP is the textbook example of physical-vs-logical topology divergence. Physically, the backbone is meshed for redundancy. Logically, STP prunes that mesh into a loop-free tree at Layer 2. If a primary link fails, STP unblocks an alternate port within ~50 ms (RSTP) or ~30 s (legacy STP) and forwarding continues. BS EN 50173-1 does not specify the active-layer protocol — it just provides the physical (hierarchical) star that the protocol runs on.',
  },
  {
    id: 8,
    question:
      'A campus has buildings A, B, C and D arranged geographically in a square. A surveyor proposes a fibre run A-B-C-D-A — a ring around the campus. Is this compliant with BS EN 50173-1 generic cabling for the campus backbone?',
    options: [
      'No — the standards fix the campus backbone as a star at the CD; the fibre route may be a ring, but the topology is not.',
      'Yes — BS EN 50173-1 explicitly requires a ring backbone on any multi-building campus for resilience.',
      'Yes, provided every building is cabled to Class EA (Cat6A) so the ring meets the campus bandwidth budget.',
      'No, because BS 7671 forbids ring topologies in all fixed data-cabling installations as a safety matter.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50173-1 / ISO/IEC 11801-1 fix the campus topology as a star with the CD at the centre. Each BD has its own dedicated home run (or pair of home runs for resilience) back to the CD. The path the fibre takes through the ducts can follow a ring for redundancy, but the cabling topology is a star — and active-layer ring protection (G.8032 ERPS, REP, MRP) provides the logical ring on top if needed. Mixing the two confuses the inspector and the future contractor.',
  },
  {
    id: 9,
    question:
      'Which TWO physical features of a structured-cabling physical star make it intrinsically more reliable than a bus or daisy-chain?',
    options: [
      'It uses thicker, more robust cable that is less prone to physical damage inside containment.',
      'Its links are shorter on average, so attenuation and external noise pick-up are both reduced.',
      'Each link is independent (one fault affects only that outlet) and can be tested and replaced individually.',
      'It runs at a higher signalling voltage, giving a better noise margin from end to end.',
    ],
    correctAnswer: 2,
    explanation:
      'Independence and isolated maintainability are the two mechanical reasons the physical star wins on reliability. Add the standardised Class / Category performance budget (a known channel) and the BS EN 50174-1 administration discipline (you can find any link by label), and you have an installation that can be safely operated and maintained for fifteen years.',
  },
  {
    id: 10,
    question:
      'Why does the structured-cabling discipline FIX the physical topology to a (hierarchical) star but leave the logical topology free?',
    options: [
      'Because a mesh of cabling would be too expensive, so a star is chosen purely on cost grounds.',
      'Because BS 7671 §716 permits only star topologies for data cabling and forbids the alternatives.',
      'Because the standards predate switched Ethernet and simply never got round to specifying a logical topology.',
      'Because the physical star is the one shape every reasonable logical topology can run on over a 15-20 year cabling life.',
    ],
    correctAnswer: 3,
    explanation:
      "Service-independence is delivered by topology choice. The physical star is the universal substrate — switched Ethernet (logical star at access, logical mesh at backbone), Token Ring (logical ring), ARCnet (logical bus), virtual SAN fabrics, PoE-distributed lighting, and tomorrow's services all run cleanly on it. Any other physical topology constrains the logical choices the building can ever support. BS 7671 has no view on logical topology — §716 governs the electrical-safety dimensions of the cabling, not the network architecture.",
  },
];

const faqs = [
  {
    question:
      'If structured cabling is always a physical star, why do textbooks still teach bus, ring and mesh?',
    answer: (
      <>
        Three reasons. (1) Historical literacy — many of today's protocols carry a logical-topology
        legacy. Spanning Tree exists because bridges originally formed loops; Token Ring's frame
        format is still in industrial fieldbuses; FDDI's redundant-pair concept lives on in
        carrier-grade Ethernet ring protection. (2) Industrial and process-control networks{' '}
        <em>still</em> use real-time rings (PROFINET MRP, EtherCAT, ITU-T G.8032 ERPS) for
        deterministic latency — and an electrician working on a factory or substation will see them.
        (3) Understanding why the bus and unmanaged-ring failure modes are bad is the clearest way
        to understand why the structured-cabling physical star wins. The textbook catalogue is a
        teaching device, not a menu.
      </>
    ),
  },
  {
    question: 'What about wireless? Is a Wi-Fi network a "topology"?',
    answer: (
      <>
        Logically, yes — a basic-service-set Wi-Fi network is a logical star anchored at the access
        point, and a multi-AP enterprise network with a controller is a logical hierarchical star.
        Physically, the cabling that <em>feeds</em> the APs is structured cabling: each AP is a
        device on the work-area side of a horizontal Cat6A run home-running to the FD. The wireless
        air interface is governed by IEEE 802.11; the cabling that powers the APs (typically PoE++
        Type 4) is governed by BS EN 50173 / 50174 and BS 7671:2018+A4:2026 §716. Wireless does not
        replace the cabling discipline — it sits on top of it.
      </>
    ),
  },
  {
    question: 'Can I daisy-chain two outlets to save a cable run on a small job?',
    answer: (
      <>
        No — not in a generic-cabling install. BS EN 50173-1 and ANSI/TIA-568.0-E require every
        outlet to have its own dedicated permanent link back to the FD. There is no "extension
        outlet" in the standard. The only sanctioned variations are (a) a consolidation point (CP) —
        a passive splice in the horizontal that lets the link be re-terminated to a moveable outlet
        without re-pulling the cable, governed by tight rules on length and certification, and (b) a
        multi-user telecommunications outlet assembly (MUTOA) — a single termination cluster serving
        several work-area cords in an open-plan area. Both are designed-in, both are tested, and
        both are in the standards. A daisy chain done on site to save a cable is not.
      </>
    ),
  },
  {
    question: 'When is a partial mesh actually appropriate at the BACKBONE (between distributors)?',
    answer: (
      <>
        Whenever the resilience requirement justifies the cost. Typical examples: data-centre
        spine-leaf fabrics (every leaf connects to every spine — a partial mesh), inter-building
        fibre on a critical-availability campus (each BD home-runs to two CDs, or to the CD plus a
        peer BD), and high-value financial / clinical / broadcast sites. In every case the physical
        cabling installs as multiple home runs from the BD to the CD and (sometimes) to peer BDs —
        the home runs ARE the partial mesh. The active layer (Layer 2 with link aggregation and STP,
        or Layer 3 with OSPF / BGP) then chooses paths. BS EN 50173-1 admits these as "additional"
        cables on top of the basic hierarchical star — they do not replace it.
      </>
    ),
  },
  {
    question: 'Does BS 7671:2018+A4:2026 specify a topology?',
    answer: (
      <>
        No — BS 7671 governs electrical safety, not network architecture. §716 applies to "the
        distribution of ELV DC power using balanced, information technology cables and accessories
        primarily designed for data transmission, as specified in BS EN 50173-1" — i.e. it bolts on
        top of whatever topology BS EN 50173-1 mandates. The cabling-shape question is fully
        answered by BS EN 50173 / 50174 and ISO/IEC 11801. BS 7671 then layers electrical-safety,
        EMC and PoE-thermal requirements on top. From 15 April 2026, that is a layered duty —
        cabling-performance standards for the topology, BS 7671 for the electrical-safety dimensions
        of the same job.
      </>
    ),
  },
  {
    question: 'How do I describe the topology of a real building on an as-built drawing?',
    answer: (
      <>
        Most cleanly, in two layers. Draw the PHYSICAL topology — every outlet, every home run,
        every distributor, every backbone fibre — as a hierarchical star (CD-BD-FD-TO). Then,
        separately, draw the LOGICAL topology — the active-equipment layer with switches, routers,
        VLAN trunks, spanning-tree root, redundant uplinks. The two drawings answer different
        questions. The physical drawing is what the cabling contractor maintains under BS EN 50174-1
        administration. The logical drawing is what the network operator maintains. Mixing them on
        one diagram is the most common reason a future contractor cannot understand a site.
      </>
    ),
  },
];

const DataCablingModule1Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'Network Topologies | Data Cabling Module 1.2 | Elec-Mate',
    'Network topologies in structured cabling — star, bus, ring, mesh and the critical distinction between physical and logical topology. Why BS EN 50173-1 enforces a (hierarchical) physical star, how spanning-tree and ring protocols build logical topologies on top, and how the campus star-of-stars (CD-BD-FD) scales the model across multiple buildings.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2"
            title="Network Topologies"
            description="Star, bus, ring and mesh — and the more important distinction between physical topology (the shape of the cabling) and logical topology (the shape of the traffic). How structured cabling enforces a hierarchical physical star while leaving the active layer free to implement any logical topology over the cabling's 15-20 year life."
            tone="yellow"
          />

          <TLDR
            points={[
              'Topology has TWO meanings, both true at once: PHYSICAL topology is the shape of the cabling itself; LOGICAL topology is the path traffic takes between active devices. They are independent properties of the same network.',
              'Structured cabling fixes the PHYSICAL topology to a hierarchical star — every outlet home-runs to its FD, every FD home-runs to the BD, every BD home-runs to the CD on a campus. BS EN 50173-1, ISO/IEC 11801-1 and ANSI/TIA-568.0-E all enforce this.',
              'The LOGICAL topology is then free. Switched Ethernet runs as a logical star at access and (with spanning tree) a pruned logical mesh at backbone. Token Ring ran as a logical ring on a physical star. ARCnet ran as a logical bus on a physical star. The cabling does not care.',
              'Bus and full-mesh topologies are obsolete for building-wide cabling: bus has a shared-medium failure mode that takes down a whole segment on one fault; full mesh scales as n(n−1)/2 and is unaffordable beyond small data-centre fabrics. Hierarchical star wins on cost, reliability and service-independence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish PHYSICAL topology (the shape of the cabling) from LOGICAL topology (the path traffic takes), and explain why both are properties of the same network',
              'Identify the four classical topology shapes (star, bus, ring, full mesh) by description and by failure-mode signature',
              'Explain why BS EN 50173-1, ISO/IEC 11801-1 and ANSI/TIA-568.0-E fix the physical horizontal-cabling topology to a star, and why daisy-chains and shared-medium variants are not permitted',
              'Describe the BS EN 50173-1 hierarchical-star model (CD-BD-FD-TO) and how it scales to multi-floor and multi-building campuses ("star-of-stars")',
              'Explain the role of spanning-tree protocols (STP / RSTP / MSTP) in pruning a physically-meshed backbone into a loop-free logical tree at Layer 2',
              'Articulate the failure modes of bus, ring and mesh topologies and contrast them with the per-link isolation of a physical star',
              'Recognise legitimate variants permitted by the standards — collapsed star, consolidation point (CP), multi-user telecommunications outlet assembly (MUTOA) — and distinguish them from non-compliant on-site daisy chains',
              'Place BS 7671:2018+A4:2026 §716 (PoE / ELV DC) correctly: it sits on top of the BS EN 50173-1 physical star, adds electrical-safety duties, and does not specify network topology',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>
            Physical vs logical topology — the foundational distinction
          </ContentEyebrow>

          <ConceptBlock
            title="Two topologies, both true at the same time, on every real network"
            plainEnglish={`A "topology" can mean two different things, and the confusion between them is the single biggest source of bad topology drawings. PHYSICAL topology is the literal shape of the cables and connectors — what a tape-measure and a torch can verify. LOGICAL topology is the shape that frames or packets take through the active equipment — what a packet capture and a config dump can verify. They are independent properties. Most real networks combine a physical star (because that is what BS EN 50173-1 mandates) with a logical topology of whatever shape the active layer decides to implement.`}
            onSite={`On a survey, ask both questions explicitly. "How are the cables laid out?" is the physical topology — walk it, label it, photograph it. "How does traffic flow?" is the logical topology — read the switch configs, map the VLANs, check spanning-tree status. The two answers are independent, and a competent as-built records both.`}
          >
            <p>
              The four classical topology shapes — star, bus, ring, mesh — are defined by the
              relationship between nodes, but they can describe either the physical layer or the
              logical layer:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Star.</strong> All nodes connect to a single central node. As a PHYSICAL
                topology this is a home-run cabling pattern from each device to a central
                distributor. As a LOGICAL topology it is the forwarding pattern of a single Ethernet
                switch — every port talks to the switch and only via the switch.
              </li>
              <li>
                <strong>Bus.</strong> All nodes share a single linear medium with terminators at
                each end. Physically: 10BASE2 thin-coax, 10BASE5 thick-coax — gone. Logically: an
                old hub (multi-port repeater) imposed a logical bus on a physical star, because
                every frame was repeated to every port — also effectively gone.
              </li>
              <li>
                <strong>Ring.</strong> Each node connects to the next, forming a closed loop.
                Physically: FDDI dual-rings, SDH/SONET rings, telecom MS-SPRings — niche today.
                Logically: Token Ring (IEEE 802.5) ran a logical ring on a physical star via the
                MAU. Modern industrial protocols — PROFINET MRP, EtherCAT, ITU-T G.8032 ERPS — run
                logical rings on physical rings of fibre or copper for deterministic latency.
              </li>
              <li>
                <strong>Mesh.</strong> Each node connects to many others. Full mesh: every node
                connects to every other (n(n−1)/2 links). Partial mesh: only the most critical nodes
                are cross-connected. Physically rare except in data centres; logically common at
                backbone (a routed IP backbone is a mesh of routing peers, even if the cabling
                underneath is a star).
              </li>
            </ul>
            <p>
              Structured cabling resolves the question for the physical layer once and for all: BS
              EN 50173-1 fixes the horizontal subsystem to a physical star, the building backbone to
              a star anchored at the BD, and the campus backbone to a star anchored at the CD. The
              active layer is then free to run any logical topology that the equipment supports.
              That separation is the whole architectural mechanism behind service-independence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50173-1 · §6 (Generic cabling structure — paraphrased)"
            clause={
              <>
                The generic cabling structure is hierarchical and consists of a campus subsystem,
                building subsystem(s) and floor subsystem(s). Within each subsystem, cabling is
                arranged as a star anchored at a single distributor (the campus distributor, the
                building distributor and the floor distributor respectively). Each
                telecommunications outlet shall be connected to a single floor distributor by a
                single permanent link. Daisy-chained or T-tapped outlets are not part of the generic
                cabling.
              </>
            }
            meaning="The standard does NOT permit daisy-chained or shared-medium horizontal cabling. Every outlet has its own dedicated home run. The hierarchical star is the only generic-cabling topology recognised by BS EN 50173-1, ISO/IEC 11801-1 and ANSI/TIA-568.0-E. Physical-star compliance is verified at handover by inspection AND by the labelling/administration record."
            cite="See also ISO/IEC 11801-1 · §5; ANSI/TIA-568.0-E · §6.1 — same hierarchical-star rule, different terminology (CD/BD/FD vs. MC/IC/HC)."
          />

          <ContentEyebrow>The physical star — and how a campus scales it</ContentEyebrow>

          <ConceptBlock
            title="Hierarchical star: CD anchors BDs, BDs anchor FDs, FDs anchor outlets"
            plainEnglish="On a single-floor single-tenancy site, you have one distributor — call it BD or FD, the names collapse. On a multi-floor building, each floor has its own FD and the FDs all home-run to a single BD in the equipment room. On a multi-building campus, each building has its own BD and the BDs all home-run to a single CD in the campus computer-services building. The shape is recursive: a star anchored at each level. BS EN 50173-1 calls this the hierarchical generic cabling structure."
            onSite={`When you walk into a comms cabinet, the question "what is anchored above this distributor?" tells you which level of the hierarchy you are in. If the answer is "nothing — this is the top", you are at the BD (single building) or the CD (campus). If the answer is "fibre uplinks to the BD upstairs", you are at an FD. The labelling discipline (TIA-606-D / BS EN 50174-1) makes this unambiguous: every distributor has a unique identifier, every cable is labelled at both ends with origin and destination distributor IDs.`}
          >
            <p>The three distributor levels in BS EN 50173-1 (and the matching TIA names):</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>CD — Campus Distributor (TIA: MC, Main Cross-Connect).</strong> The single
                top-of-hierarchy distributor on a multi-building site. Lives in the
                computer-services / main equipment building. Single-mode and multi-mode fibre home
                runs from every BD on campus terminate here. Houses the core routers and the campus
                carrier demarcation.
              </li>
              <li>
                <strong>BD — Building Distributor (TIA: IC, Intermediate Cross-Connect).</strong>{' '}
                The top-of-hierarchy distributor inside a single building. Lives in the building's
                equipment room (ER). Vertical / riser backbone fibre home runs from every FD in the
                building terminate here. Houses the building's core / aggregation switches. On a
                single-tenancy single-building site, the BD and CD collapse into one.
              </li>
              <li>
                <strong>FD — Floor Distributor (TIA: HC, Horizontal Cross-Connect).</strong> The
                floor-level distributor. Lives in the floor's telecommunications room (TR). Every
                horizontal Cat6A (or fibre-to-the-floor) permanent link from every work-area outlet
                on the floor terminates here. Houses the floor's edge / access switches. Sized so
                every horizontal cable on the floor reaches its outlet within 90 m of cable run.
              </li>
            </ul>
            <p>
              The recursive star property is what allows the model to scale from a 30-desk single
              floor to a 30-building campus without changing shape. Each level is a star. The levels
              stack. That is also why the model is called a "star-of-stars" or "hierarchical star" —
              viewed from the campus, every BD is a satellite of the CD; viewed from the building,
              every FD is a satellite of the BD; viewed from the floor, every outlet is a satellite
              of the FD.
            </p>
          </ConceptBlock>

          {/* Hierarchical star diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Hierarchical star — CD anchors BDs, BDs anchor FDs, FDs anchor outlets
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="Hierarchical-star diagram drawn top to bottom in four tiers. Tier 1 at the top: a single Campus Distributor box. Tier 2: two Building Distributor boxes connected to the Campus Distributor by magenta solid lines (campus backbone fibre). Tier 3: four Floor Distributor boxes, two per Building Distributor, connected by cyan dashed lines (riser backbone). Tier 4: twelve work-area Telecommunications Outlets, three per Floor Distributor, connected by yellow solid lines (horizontal Cat6A permanent link). All connector lines run through dedicated empty zones with no labels overlaying them. A legend panel below the diagram maps each box colour and line style to its subsystem."
            >
              {/* ===== Tier 1 — Campus Distributor (y 24-76) ===== */}
              <rect
                x="380"
                y="24"
                width="140"
                height="52"
                rx="8"
                fill="rgba(168,85,247,0.14)"
                stroke="#A855F7"
                strokeWidth="1.8"
              />
              <text
                x="450"
                y="48"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                CD · CAMPUS
              </text>
              <text
                x="450"
                y="64"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                single site anchor
              </text>

              {/* ===== Connector zone 1 (y 76-130) — CD to BDs, magenta solid, NO labels ===== */}
              <line x1="450" y1="76" x2="240" y2="130" stroke="#E879F9" strokeWidth="1.6" />
              <line x1="450" y1="76" x2="660" y2="130" stroke="#E879F9" strokeWidth="1.6" />

              {/* ===== Tier 2 — Building Distributors (y 130-186) ===== */}
              <rect
                x="170"
                y="130"
                width="140"
                height="56"
                rx="8"
                fill="rgba(232,121,249,0.14)"
                stroke="#E879F9"
                strokeWidth="1.6"
              />
              <text
                x="240"
                y="154"
                textAnchor="middle"
                fill="#FAE8FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BD · BUILDING 1
              </text>
              <text
                x="240"
                y="172"
                textAnchor="middle"
                fill="#FBE8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                building distributor
              </text>

              <rect
                x="590"
                y="130"
                width="140"
                height="56"
                rx="8"
                fill="rgba(232,121,249,0.14)"
                stroke="#E879F9"
                strokeWidth="1.6"
              />
              <text
                x="660"
                y="154"
                textAnchor="middle"
                fill="#FAE8FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BD · BUILDING 2
              </text>
              <text
                x="660"
                y="172"
                textAnchor="middle"
                fill="#FBE8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                building distributor
              </text>

              {/* ===== Connector zone 2 (y 186-244) — BD to FDs, cyan dashed, NO labels ===== */}
              <line
                x1="240"
                y1="186"
                x2="140"
                y2="244"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              <line
                x1="240"
                y1="186"
                x2="340"
                y2="244"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              <line
                x1="660"
                y1="186"
                x2="560"
                y2="244"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              <line
                x1="660"
                y1="186"
                x2="760"
                y2="244"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />

              {/* ===== Tier 3 — Floor Distributors (y 244-294) ===== */}
              {[
                { cx: 140, label: 'FD · B1·F1' },
                { cx: 340, label: 'FD · B1·F2' },
                { cx: 560, label: 'FD · B2·F1' },
                { cx: 760, label: 'FD · B2·F2' },
              ].map((fd, i) => (
                <g key={'fd-' + i}>
                  <rect
                    x={fd.cx - 70}
                    y="244"
                    width="140"
                    height="50"
                    rx="7"
                    fill="rgba(34,211,238,0.14)"
                    stroke="#22D3EE"
                    strokeWidth="1.4"
                  />
                  <text
                    x={fd.cx}
                    y="266"
                    textAnchor="middle"
                    fill="#A5F3FC"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="system-ui"
                  >
                    {fd.label}
                  </text>
                  <text
                    x={fd.cx}
                    y="282"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="9.5"
                    fontFamily="system-ui"
                  >
                    floor distributor
                  </text>
                </g>
              ))}

              {/* ===== Connector zone 3 (y 294-360) — FD to TOs, yellow solid, NO labels ===== */}
              {[140, 340, 560, 760].map((fdx, fi) => (
                <g key={'fl-' + fi}>
                  {[-44, 0, 44].map((dx, di) => (
                    <line
                      key={'fl-' + fi + '-' + di}
                      x1={fdx}
                      y1="294"
                      x2={fdx + dx}
                      y2="360"
                      stroke="#FCD34D"
                      strokeWidth="1.3"
                    />
                  ))}
                </g>
              ))}

              {/* ===== Tier 4 — Work-area Outlets (y 360-388) ===== */}
              {[140, 340, 560, 760].map((fdx, fi) => (
                <g key={'to-row-' + fi}>
                  {[-44, 0, 44].map((dx, di) => (
                    <g key={'to-' + fi + '-' + di}>
                      <rect
                        x={fdx + dx - 14}
                        y="360"
                        width="28"
                        height="28"
                        rx="5"
                        fill="rgba(250,204,21,0.20)"
                        stroke="#FACC15"
                        strokeWidth="1.4"
                      />
                      <text
                        x={fdx + dx}
                        y="378"
                        textAnchor="middle"
                        fill="#FEF3C7"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="system-ui"
                      >
                        TO
                      </text>
                    </g>
                  ))}
                </g>
              ))}

              {/* ===== Tier-4 row label (BELOW the TO rects, clear of all shapes) ===== */}
              <text
                x="450"
                y="412"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="system-ui"
              >
                work-area outlets · 3 per floor distributor shown · ≤ 90 m permanent link to FD
              </text>

              {/* ===== Legend panel (y 450-690) ===== */}
              <rect
                x="60"
                y="450"
                width="780"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="80"
                y="476"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Column 1 — distributor boxes */}
              <text
                x="80"
                y="498"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                DISTRIBUTORS
              </text>

              <rect
                x="80"
                y="510"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.20)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="104" y="522" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                CD · Campus Distributor — top-of-site anchor
              </text>

              <rect
                x="80"
                y="534"
                width="14"
                height="14"
                rx="3"
                fill="rgba(232,121,249,0.20)"
                stroke="#E879F9"
                strokeWidth="1.4"
              />
              <text x="104" y="546" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BD · Building Distributor — one per building
              </text>

              <rect
                x="80"
                y="558"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="104" y="570" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                FD · Floor Distributor — one or more per floor
              </text>

              <rect
                x="80"
                y="582"
                width="14"
                height="14"
                rx="3"
                fill="rgba(250,204,21,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="104" y="594" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                TO · Telecommunications Outlet — work area
              </text>

              {/* Column 2 — connector line styles */}
              <text
                x="460"
                y="498"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CONNECTORS
              </text>

              <line x1="460" y1="518" x2="490" y2="518" stroke="#E879F9" strokeWidth="1.8" />
              <text x="500" y="522" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Campus backbone — CD to BD, OS2 fibre
              </text>

              <line
                x1="460"
                y1="542"
                x2="490"
                y2="542"
                stroke="#22D3EE"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />
              <text x="500" y="546" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Riser backbone — BD to FD, OM4 / OS2
              </text>

              <line x1="460" y1="566" x2="490" y2="566" stroke="#FCD34D" strokeWidth="1.8" />
              <text x="500" y="570" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Horizontal — FD to TO, Cat6A ≤ 90 m
              </text>

              {/* Standards footer (separated from legend body) */}
              <line
                x1="80"
                y1="624"
                x2="820"
                y2="624"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="646"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="system-ui"
              >
                BS EN 50173-1 · ISO/IEC 11801-1 · ANSI/TIA-568.0-E
              </text>
              <text
                x="450"
                y="666"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                hierarchical star is mandatory · additional cables permitted at backbone for
                redundancy
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

          <ContentEyebrow>The four classical topology shapes</ContentEyebrow>

          <ConceptBlock
            title="Star, bus, ring, mesh — by description and by failure mode"
            plainEnglish="The four canonical topology shapes are not all equally good. Star wins on cost and isolation, mesh wins on redundancy at quadratic cost, bus has a defining shared-medium failure mode, and ring trades determinism for sensitivity to single faults. Understanding their failure modes is the clearest route to understanding why structured cabling defaults to the (hierarchical) star."
            onSite={`On any site survey, ask "what topology is this currently?" and "what topology do we want it to be?". The currently is forensic — open the comms cabinet, count the home runs, look at the bus T-pieces, count the ring fibres. The wanted is design — almost always a hierarchical star, possibly with active-layer redundancy on top.`}
          >
            <p>The four shapes, by structure and by failure mode:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Star.</strong> All nodes home-run to a central distributor. Failure mode: a
                single link's loss affects only that one user; the distributor's loss takes down the
                whole star (mitigated by active-layer redundancy — dual switches, link aggregation,
                redundant power). Cost scales as n (one cable per user). The generic-cabling
                default.
              </li>
              <li>
                <strong>Bus.</strong> All nodes share a single linear medium with terminators.
                Failure mode: any break, loose tap or unterminated end takes down the entire
                segment; CSMA/CD performance collapses as devices and traffic are added. Cost scales
                as n (one tap per user) — historically attractive — but the failure mode is fatal.
                Effectively obsolete in commercial cabling.
              </li>
              <li>
                <strong>Ring.</strong> Each node connects to two neighbours, forming a closed loop.
                Failure mode: a single-fault break splits the ring into a line; without a
                ring-protection protocol (G.8032 ERPS, REP, MRP), traffic on one side cannot reach
                the other. Industrial / process control still uses physical rings for deterministic
                latency under MRP / EtherCAT — and there a single break is detected and bypassed in
                milliseconds. Generic commercial cabling does not use rings.
              </li>
              <li>
                <strong>Mesh (full / partial).</strong> Every node connects to many others. Failure
                mode: highly resilient — multiple link failures can be tolerated — but cost scales
                as n(n−1)/2 for full mesh. Used in data-centre spine-leaf, critical industrial
                control, and high-availability backbone. Generic-cabling standards permit
                "additional" cables on top of the basic hierarchical star to build a partial mesh at
                backbone where required, but the basic shape remains the star.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Topology comparison — cost, fault-isolation, scalability"
            source="BS EN 50173-1 / ISO/IEC 11801-1 model"
            headers={['Topology', 'Link count (n nodes)', 'Single-link fault impact', 'Use today']}
            rows={[
              [
                'Star',
                'n',
                'Affects 1 user only',
                'Generic-cabling default — every horizontal subsystem',
              ],
              [
                'Hierarchical star',
                'n + (BDs) + (CDs)',
                'Affects 1 user, 1 floor or 1 building (per layer)',
                'Generic-cabling default — every campus / multi-floor',
              ],
              ['Bus', 'n taps + 1 trunk', 'Whole segment fails', 'Obsolete in commercial cabling'],
              [
                'Ring (with protection)',
                'n',
                'Re-routes in ~10 ms (MRP) / ~50 ms (G.8032)',
                'Industrial / process control / telecom backbone',
              ],
              ['Ring (no protection)', 'n', 'Whole ring loses connectivity beyond break', 'Avoid'],
              [
                'Partial mesh',
                'n + extra cross-links',
                'Re-routes via alternate path',
                'Data-centre backbone, critical-availability sites',
              ],
              [
                'Full mesh',
                'n(n−1)/2',
                'Re-routes via many alternate paths',
                'Small (≤20-node) high-value clusters only',
              ],
            ]}
            notes="Generic-cabling standards (BS EN 50173-1, ISO/IEC 11801-1, ANSI/TIA-568.0-E) define the horizontal and backbone subsystems as a hierarchical star. Additional cables MAY be installed for backbone redundancy (creating a partial mesh at backbone) on top of the basic star — the basic star is non-negotiable."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Logical topologies on a physical star</ContentEyebrow>

          <ConceptBlock
            title="The active layer is free to implement any logical topology — the cabling does not care"
            plainEnglish={`Once the physical topology is fixed as a hierarchical star, the active equipment can implement any logical topology on top of it. Switched Ethernet implements a logical star at access. Spanning tree implements a logical loop-free tree at backbone (pruned from a physical mesh). Token Ring implemented a logical ring on a physical star. Industrial Ethernet (PROFINET MRP, EtherCAT) implements a logical ring on a physical ring. Routed IP implements a logical mesh on whatever the physical layer happens to be. The cabling shape is independent of the traffic shape, and that independence is what lets the cabling outlive any one logical topology.`}
            onSite={`When troubleshooting a "topology" problem, ask which layer the problem is on. Cable test failure on a single link? Physical layer — get the cable tester out. Slow / intermittent forwarding across a backbone? Logical layer — check spanning-tree state, port costs, root-bridge election, link-aggregation status. The two diagnoses use entirely different tools and entirely different evidence.`}
          >
            <p>Three concrete pairings of physical and logical topology in modern networks:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Switched Ethernet on hierarchical-star cabling.</strong> Physical: every
                outlet home-runs to its FD; FDs home-run to the BD; BD home-runs to the CD on a
                campus. Logical: the access layer is a logical star (each port is a point-to-point
                link from device to switch); the backbone — if redundant uplinks exist — is a
                logical mesh that spanning-tree (RSTP / MSTP) prunes into a loop-free tree, or that
                Layer-3 routing (OSPF) treats as a routed mesh. The cabling delivers both at once.
              </li>
              <li>
                <strong>Industrial control on a physical ring (PROFINET MRP / G.8032 ERPS).</strong>{' '}
                Physical: a closed fibre or copper ring around the plant. Logical: a logical ring at
                Layer 2 with a Media Redundancy Manager (MRM) that detects breaks and reconfigures
                forwarding within ~10 ms. The physical-ring topology is chosen deliberately because
                the deterministic-latency requirement (motion control, process control) is
                intolerant of spanning-tree convergence times. This is the one mainstream case where
                generic cabling's hierarchical-star default is deliberately overridden by an
                industrial-cabling specification (BS EN 50173-3).
              </li>
              <li>
                <strong>Data-centre spine-leaf on a partial mesh.</strong> Physical: every "leaf"
                top-of-rack switch has a fibre uplink to every "spine" core switch — a partial mesh
                between the leaves and the spines. Logical: ECMP (equal-cost multi-path) routing
                distributes traffic across all leaf-spine paths; failure of any one path is
                tolerated by the protocol. BS EN 50173-5 (data centres) recognises this as the
                standard data-centre cabling pattern.
              </li>
            </ul>
            <p>
              In every case, the discipline is to draw the physical topology and the logical
              topology separately, label each one, and check that the active-layer protocols can
              actually run on the cabling shape provided. Most "this network has gone wrong" calls
              turn out to be a logical-topology question (spanning tree, VLAN trunking, a
              misconfigured aggregate) on a physical layer that is actually fine.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.1 (Scope — verbatim)"
            clause={
              <>
                The particular requirements of this section apply to the distribution of ELV DC
                power using balanced, information technology cables and accessories primarily
                designed for data transmission, as specified in BS EN 50173-1 using power feeding
                sourcing equipment in accordance with BS EN IEC 62368-3. Requirements are included
                for the design, erection, and verification of telecommunications infrastructure for
                the purpose of both telecommunications and distribution of ELV DC power feeding. In
                addition, requirements are included for use of existing telecommunications
                infrastructure for distribution of ELV DC power. The power delivery systems include,
                but are not restricted to, the Power over Ethernet systems specified by ISO/IEC/IEEE
                DIS 8802-3 (2024). This section does not apply to the use of cables and accessories
                for private branch exchange (PBX).
              </>
            }
            meaning="§716 explicitly bolts on top of BS EN 50173-1 — the topology question is fully answered by BS EN 50173-1 (hierarchical star). BS 7671 then layers electrical-safety, ELV DC and PoE-thermal duties on the same cabling. Topology choice is therefore unaffected by §716; only the duties on the chosen topology change."
            cite={
              <>
                Verified verbatim from <code>bs7671_regulations.full_text</code> · A4:2026 edition.{' '}
                <AmendmentBadge regs={['716']} edition="A4:2026" />
              </>
            }
          />

          <ContentEyebrow>Permitted variants — collapsed star, CP, MUTOA</ContentEyebrow>

          <ConceptBlock
            title="The standards do permit small structural variations — they do NOT permit daisy chains"
            plainEnglish="BS EN 50173-1 and ANSI/TIA-568.0-E both recognise a small set of designed-in topology variants on top of the basic hierarchical star. Each one is fully specified, length-bounded and tested. None of them is a justification for an on-site daisy chain to save cable. Recognising the legitimate variants — and refusing the illegitimate ones — is part of the contractor's competence."
            onSite={`When a site asks "can we take a feed off this outlet to that printer over there?", the answer is no — that is a daisy chain, not a CP, not a MUTOA. The compliant alternatives are: (a) pull a second permanent link to the printer's location, (b) use an existing CP-equipped link by re-terminating to the new location, or (c) put a small unmanaged switch on the existing outlet (the device feeds the printer by Ethernet — but the cabling itself remains a strict star).`}
          >
            <p>The three legitimate structural variants:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Collapsed star.</strong> On a single-floor single-tenancy small site, the
                CD, BD and FD collapse into one cabinet. The hierarchy is not absent — it is
                degenerate. Every outlet still home-runs to that one distributor. Fully compliant;
                the 90 m permanent-link rule still applies.
              </li>
              <li>
                <strong>Consolidation point (CP).</strong> A passive, mid-link splice that lets the
                cable be re-terminated to a moveable outlet without re-pulling. Used in open-plan
                fit-outs where furniture-mounted outlets move around. The total channel still must
                not exceed 90 m permanent link, and the rules on length between FD-CP and CP-TO are
                tight (see BS EN 50173-1 §6.4.4 / TIA-568.0-E). The CP is tested as part of the
                link.
              </li>
              <li>
                <strong>Multi-user telecommunications outlet assembly (MUTOA).</strong> A single
                in-furniture termination cluster serving several work-area cords with longer cords
                than the standard 5 m. Used in open-plan offices to serve groups of desks from a
                single ceiling-fed location. Length rules are again tight, and the MUTOA is an
                explicit standard concept — not a creative reading of the rules.
              </li>
            </ul>
            <p>
              What is NOT permitted: T-piece taps, daisy chains, spliced "extension" cables to add
              an extra outlet, or splitting one permanent link into two outlets at the wall. None of
              these are recognised by BS EN 50173-1, ANSI/TIA-568.0-E or ISO/IEC 11801-1. Doing any
              of them voids the warranty and the certification, and breaks the service-independence
              pitch — the next service that needs a clean star simply will not work over a
              daisy-chained or T-tapped link.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Spanning tree, ring protection, and the active layer</ContentEyebrow>

          <ConceptBlock
            title="Active-layer protocols build the logical topology — and have to be reasoned about as topology too"
            plainEnglish={`Even though the cabling is a strict physical star, the active layer is rarely just a star. Modern campuses build redundant uplinks into the cabling (two fibres from each FD to the BD, often diversely routed). That creates a physical PARTIAL MESH at backbone. Spanning tree, link aggregation and (at Layer 3) routing protocols then take that physical mesh and build a logical topology that is loop-free, fault-tolerant and load-balanced. The contractor's design must consider both — the cabling specifies the physical mesh, and the active-layer specification documents how the protocol turns it into a usable logical shape.`}
            onSite={`When you design the cabling, draw the physical topology with redundant fibres explicitly shown. When the active-layer designer specs the switches, they need to know which fibres exist so they can configure spanning-tree priorities, MSTP regions and link-aggregation groups against them. A handover that delivers cabling with redundant uplinks but no documentation of which fibres exist between which distributors will result in spanning tree being misconfigured — and the redundancy never actually being used.`}
          >
            <p>The most common active-layer topology protocols and their effect:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>STP / RSTP / MSTP (IEEE 802.1D / 802.1w / 802.1s).</strong> Spanning Tree
                Protocol elects a root bridge and computes a loop-free tree from every other bridge
                to the root, BLOCKING redundant ports until needed. RSTP converges in tens of
                milliseconds; MSTP supports per-VLAN-group instances. Logical topology: a pruned
                tree on top of a physical mesh.
              </li>
              <li>
                <strong>Link Aggregation (LACP, IEEE 802.3ad / 802.1AX).</strong> Bonds multiple
                physical links between two switches into one logical link with N times the bandwidth
                and N−1 link-failure tolerance. Logical topology: collapses a small physical mesh
                between two devices into a single logical link.
              </li>
              <li>
                <strong>Ring protection (G.8032 ERPS, MRP, REP).</strong> Runs on a physical ring —
                keeps one link in BLOCK state as the Ring Protection Link; on detection of a fault
                elsewhere on the ring, unblocks within ~10–50 ms. Used at carrier and industrial
                scale. Logical topology: an open chain that closes on fault.
              </li>
              <li>
                <strong>OSPF / IS-IS / BGP (Layer 3 routing).</strong> At the routing layer, the
                logical topology is a graph of routing peers. Equal-cost multi-path (ECMP) routing
                distributes traffic across all equal-cost paths simultaneously. The physical layer
                can be a star, a partial mesh or a full mesh — routing copes with all of them.
              </li>
            </ul>
            <p>
              From a cabling-design perspective, the practical implication is: do not deliver a
              physically-star cabling and expect the active layer to invent redundancy that the
              cables do not support. If the building needs FD-to-BD redundancy, install two fibres
              per FD-BD relationship (and route them diversely if the building's resilience case
              demands it). The active-layer protocol then has the physical paths it needs.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Drawing physical and logical topology on the same diagram and confusing them"
            whatHappens={
              <>
                Contractor delivers an "as-built" that mixes cable runs (physical) with
                spanning-tree state (logical) on a single drawing. Switches are shown as rectangles
                connected by lines that are sometimes cables and sometimes logical-link-aggregation
                bundles. A future engineer reading the drawing cannot tell which lines are physical
                fibres and which are logical bonds; if a fibre fails, the failure cannot be matched
                to the diagram. The "documentation" is effectively useless.
              </>
            }
            doInstead={
              <>
                Draw two diagrams. (1) PHYSICAL — every cable, every distributor, every outlet, with
                cable IDs from the BS EN 50174-1 / TIA-606-D administration record. (2) LOGICAL —
                every switch, every VLAN, every spanning-tree root, every link-aggregation group,
                every routing peer. Both diagrams reference the same distributor / device IDs but
                show different relationships. The physical diagram is the cabling contractor's
                deliverable; the logical diagram is the network operator's deliverable; together
                they answer every question a future engineer can ask about the site.
              </>
            }
          />

          <Scenario
            title="A six-floor office wants resilient floor uplinks — what topology do you specify?"
            situation={
              <>
                The brief: a six-floor commercial fit-out, one FD per floor, BD in basement ER. The
                client's IT team wants any single backbone-fibre fault to be tolerated without
                user-visible disruption. The architect has provided two structurally separate riser
                shafts at opposite ends of the building.
              </>
            }
            whatToDo={
              <>
                Specify the cabling as a PHYSICAL PARTIAL MESH at backbone, on top of the basic
                hierarchical star. Each FD home-runs to the BD with TWO multi-mode fibre cables
                (typically 12-core OM4 each, future-proofed for 40G/100G), one routed via riser
                shaft A and one via riser shaft B. The horizontal subsystem on each floor remains a
                strict physical star — Cat6A home runs to the FD. Then specify the active layer:
                each FD switch stack has two uplinks bonded as a single LACP aggregate back to the
                BD core; if either riser fails, the aggregate stays up at half bandwidth and the
                network keeps forwarding. Document both — cabling drawings show the two fibres per
                FD-BD pair; logical drawings show the LACP groups.
              </>
            }
            whyItMatters={
              <>
                Resilience is bought at the cabling stage, not the switch stage. If the building
                only has one fibre between each FD and the BD, no amount of clever switch
                configuration can route around a fibre cut. The physical topology constrains the
                logical topology — and the cabling specification is where the resilience case is
                actually delivered. Get this wrong on the spec and the only remedy is to re-pull
                fibre, which on a six-storey occupied office is brutal.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Topology has TWO meanings — physical (cabling shape) and logical (traffic shape) — and both are properties of the same network. They are independent, and competent documentation records BOTH.',
              'BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.0-E enforce a HIERARCHICAL PHYSICAL STAR (CD-BD-FD-TO) for generic cabling. Daisy chains, T-taps and shared-medium horizontal runs are not permitted.',
              'Bus topology has a defining shared-medium failure mode and is obsolete in commercial cabling. Switched Ethernet on a physical star eliminates that failure mode and isolates each user to their own link.',
              'Active-layer protocols (RSTP / MSTP, LACP, G.8032 ERPS, OSPF) build the LOGICAL topology on top of the physical cabling. Resilience is bought at the cabling stage (additional fibres) and unlocked at the active stage (the protocol that uses them).',
              'BS 7671:2018+A4:2026 §716 sits ON TOP of the BS EN 50173-1 physical star and adds electrical-safety duties (PoE thermal, ELV DC, SELV/PELV). It does NOT specify network topology — that question is fully answered by the cabling-performance standards.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Structured cabling
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Passive vs active hardware
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule1Section2;
