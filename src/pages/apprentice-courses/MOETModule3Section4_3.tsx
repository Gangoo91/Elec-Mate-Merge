import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Socket Outlet and Small Power Circuits - MOET Module 3.4.3";
const DESCRIPTION = "Comprehensive guide to socket outlet and small power circuits for maintenance technicians: ring final circuits, radial circuits, spur rules, socket types, RCD protection, BS 1363, ring continuity testing, FCUs and dedicated circuits under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "ring-final",
    question: "What distinguishes a ring final circuit from a radial circuit?",
    options: [
      "A ring circuit uses thicker cable",
      "A ring circuit has cable that starts and finishes at the same terminals in the consumer unit",
      "A ring circuit can serve more socket outlets",
      "A ring circuit does not require an earth conductor"
    ],
    correctIndex: 1,
    explanation: "A ring final circuit has both ends of the line, neutral and earth conductors connected to the same terminals at the origin (consumer unit or distribution board), forming a continuous ring. This means current can flow in both directions around the ring, effectively sharing the load between two parallel paths and allowing the use of smaller cable (2.5 mm²) for higher loads."
  },
  {
    id: "spur-rule",
    question: "Under BS 7671, how many non-fused spurs may be connected to a ring final circuit?",
    options: [
      "An unlimited number, provided the total load does not exceed 32 A",
      "No more than two per socket outlet on the ring",
      "One non-fused spur per socket outlet or junction box on the ring",
      "No non-fused spurs are permitted"
    ],
    correctIndex: 2,
    explanation: "BS 7671 permits one non-fused spur from each socket outlet or junction box on the ring. Each non-fused spur can supply one single or one twin socket outlet (or one fused connection unit). Non-fused spurs must be wired in cable of the same size as the ring cable (2.5 mm²). The total number of non-fused spurs should not exceed the number of socket outlets and fixed appliances connected directly on the ring."
  },
  {
    id: "rcd-protection",
    question: "Under BS 7671:2018+A3:2024, what additional protection is required for socket outlets rated up to 32 A in all locations?",
    options: [
      "A type D MCB",
      "An RCBO or RCD with a rated residual operating current not exceeding 30 mA",
      "A surge protection device",
      "An isolating transformer"
    ],
    correctIndex: 1,
    explanation: "Regulation 411.3.3 of BS 7671:2018+A3:2024 requires that socket outlets with a rated current not exceeding 32 A are provided with additional protection by an RCD with a rated residual operating current (IΔn) not exceeding 30 mA. This applies to all locations, not just domestic premises. The RCD provides additional protection against electric shock in the event of a direct contact fault."
  },
  {
    id: "ring-test",
    question: "What is the purpose of the R1+R2 ring continuity test on a ring final circuit?",
    options: [
      "To verify the insulation resistance of the ring",
      "To confirm the ring is continuous and to measure the earth fault loop impedance at each socket",
      "To check the polarity of each socket outlet",
      "To verify the RCD trips within the required time"
    ],
    correctIndex: 1,
    explanation: "The R1+R2 ring continuity test confirms that the ring is continuous (no breaks in the line, neutral or earth conductors) and provides the R1+R2 value at each socket outlet on the ring. This value, when added to the external earth fault loop impedance (Ze), gives the total earth fault loop impedance (Zs) at each point, which must not exceed the maximum value for the protective device to disconnect within the required time."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A ring final circuit protected by a 32 A MCB is typically wired in which cable size?",
    options: [
      "1.5 mm² twin and earth",
      "2.5 mm² twin and earth",
      "4.0 mm² twin and earth",
      "6.0 mm² twin and earth"
    ],
    correctAnswer: 1,
    explanation: "A standard ring final circuit protected by a 32 A MCB is wired in 2.5 mm² twin and earth cable. The ring configuration allows current to flow in both directions, effectively providing two parallel 2.5 mm² paths. This gives the ring a current-carrying capacity well in excess of 32 A under normal balanced load conditions."
  },
  {
    id: 2,
    question: "What is the maximum floor area that a single ring final circuit should serve in a domestic installation?",
    options: [
      "50 m²",
      "75 m²",
      "100 m²",
      "There is no specific limit in BS 7671"
    ],
    correctAnswer: 2,
    explanation: "The IET On-Site Guide recommends that a single ring final circuit should serve a floor area not exceeding 100 m² in domestic premises. For floor areas exceeding 100 m², additional ring circuits or radial circuits should be installed. This guideline helps ensure that the circuit is not overloaded and that fault loop impedance values remain within acceptable limits."
  },
  {
    id: 3,
    question: "A radial circuit serving socket outlets up to 20 A should be wired in a minimum cable size of:",
    options: [
      "1.5 mm²",
      "2.5 mm²",
      "4.0 mm²",
      "1.0 mm²"
    ],
    correctAnswer: 1,
    explanation: "A radial circuit protected by a 20 A device should be wired in a minimum of 2.5 mm² cable (for the reference installation method). The actual cable size depends on the installation method, grouping factors, ambient temperature and volt drop. For a 32 A radial circuit, a minimum of 4.0 mm² cable is typically required."
  },
  {
    id: 4,
    question: "A fused spur from a ring final circuit is connected via a:",
    options: [
      "30 mA RCD",
      "Junction box",
      "Fused connection unit (FCU) fitted with a 3 A or 13 A fuse",
      "Isolating switch"
    ],
    correctAnswer: 2,
    explanation: "A fused spur is connected via a fused connection unit (FCU) which contains a BS 1362 cartridge fuse (typically 3 A or 13 A). The fuse in the FCU protects the spur cable and the connected load. Any number of fused spurs may be connected to a ring circuit (unlike non-fused spurs, which are limited to one per point on the ring). The cable on the load side of the FCU can be reduced to 1.0 mm² or 1.5 mm² if protected by a 3 A fuse."
  },
  {
    id: 5,
    question: "BS 1363 specifies the requirements for:",
    options: [
      "Circuit breakers and fuses",
      "13 A plugs, socket outlets and adaptors",
      "Emergency lighting systems",
      "Earth fault loop impedance testing"
    ],
    correctAnswer: 1,
    explanation: "BS 1363 specifies the requirements for 13 A plugs, socket outlets, connection units and adaptors used in the UK. It defines the physical dimensions, pin configuration, fuse requirements (BS 1362), shuttered socket outlets, and safety requirements. All 13 A socket outlets must be shuttered to prevent children inserting objects into the live and neutral apertures."
  },
  {
    id: 6,
    question: "Which of the following socket outlet types would be used for a three-phase industrial supply?",
    options: [
      "BS 1363 13 A socket",
      "BS EN 60309-2 (commando/CEE) socket",
      "BS 546 round-pin socket",
      "USB-C socket outlet"
    ],
    correctAnswer: 1,
    explanation: "BS EN 60309-2 (commonly known as 'commando' or CEE sockets) are industrial socket outlets designed for single-phase and three-phase supplies at various current ratings (16 A, 32 A, 63 A, 125 A). They use a colour-coded system: blue for 230 V single-phase, red for 400 V three-phase, yellow for 110 V reduced voltage. The pin configuration prevents incorrect connection between different voltage supplies."
  },
  {
    id: 7,
    question: "During the ring continuity test, the cross-connection is made between:",
    options: [
      "Line and neutral conductors",
      "Line and earth conductors",
      "The line conductor of one end of the ring and the neutral conductor of the other end (and vice versa)",
      "Both earth conductors"
    ],
    correctAnswer: 2,
    explanation: "The ring continuity test involves cross-connecting the line conductor of one end of the ring with the neutral of the other end, and vice versa. This creates a figure-of-eight configuration. When resistance is measured at each socket outlet, the reading should be substantially the same at each point (within approximately 0.05 ohms). A significantly higher reading indicates a fault or break in the ring."
  },
  {
    id: 8,
    question: "A dedicated circuit is required for which of the following appliances?",
    options: [
      "A table lamp",
      "An electric cooker rated at 10 kW",
      "A phone charger",
      "A desk fan"
    ],
    correctAnswer: 1,
    explanation: "Appliances with high power ratings, such as electric cookers (typically 6-12 kW), electric showers (7-10.8 kW), immersion heaters, and storage heaters, require dedicated circuits with appropriately rated cable, protection and, where applicable, a cooker control unit or double-pole switch. These loads are too large to be served from a ring final or general radial circuit."
  },
  {
    id: 9,
    question: "What is the purpose of shutters on a BS 1363 socket outlet?",
    options: [
      "To protect the socket from moisture ingress",
      "To prevent the insertion of objects other than a correctly shaped plug pin",
      "To reduce the risk of fire",
      "To improve the appearance of the socket"
    ],
    correctAnswer: 1,
    explanation: "Shutters on BS 1363 socket outlets prevent the insertion of foreign objects (such as fingers, screwdrivers or other conductive items) into the live and neutral apertures. The shutters are mechanically interlocked and only open when the longer earth pin of a BS 1363 plug is inserted first, which simultaneously opens the live and neutral shutters. This is a critical child safety feature."
  },
  {
    id: 10,
    question: "USB socket outlets installed in a ring final circuit must:",
    options: [
      "Have their own dedicated circuit",
      "Be connected through an RCD and comply with the relevant product standard",
      "Only be installed in domestic premises",
      "Be rated at 5 A minimum"
    ],
    correctAnswer: 1,
    explanation: "USB socket outlets installed on a ring final circuit must comply with the relevant product standard (e.g., BS 1363-2 for combined 13 A socket/USB units) and be protected by the same 30 mA RCD required for all socket outlets up to 32 A. The USB power supply is integrated into the socket outlet and converts the 230 V mains to the low-voltage DC required by USB devices."
  },
  {
    id: 11,
    question: "When testing a ring final circuit, what does a significantly higher R1+R2 reading at one socket indicate?",
    options: [
      "The socket is on a spur",
      "The ring is broken at or near that point",
      "The socket is incorrectly wired",
      "The MCB is faulty"
    ],
    correctAnswer: 1,
    explanation: "During the cross-connected ring continuity test, each socket should give a substantially similar R1+R2 reading. A significantly higher reading at one socket indicates that the ring is broken at or near that point, meaning the current has to travel via a longer single path rather than the shorter parallel paths of a complete ring. The break must be located and repaired."
  },
  {
    id: 12,
    question: "A 32 A radial circuit for socket outlets requires a minimum cable size of:",
    options: [
      "2.5 mm²",
      "4.0 mm²",
      "6.0 mm²",
      "10.0 mm²"
    ],
    correctAnswer: 1,
    explanation: "A 32 A radial circuit requires a minimum cable size of 4.0 mm² twin and earth (for the reference installation method). Unlike a ring circuit where the current divides between two paths, a radial circuit carries the full load current on a single cable run. The 4.0 mm² cable has a current-carrying capacity that comfortably exceeds 32 A for most installation methods."
  }
];

const faqs = [
  {
    question: "How do I identify if a socket is on a ring or a spur?",
    answer: "At the socket outlet, you can visually check: if there are two sets of cables (four line, four neutral, and earth conductors — two in and two out), the socket is on the ring. If there is only one set of cables (one in), it is likely a spur. However, you cannot be certain from visual inspection alone — one cable could be a non-fused spur from another point on the ring. A ring continuity test (R1+R2 cross-connection test) is the definitive method to confirm the ring circuit integrity."
  },
  {
    question: "Can I add a spur to a spur on a ring final circuit?",
    answer: "No. BS 7671 does not permit a spur from a spur (sometimes called a 'double spur'). A non-fused spur must be connected directly to the ring at a socket outlet or junction box on the ring. If you need to extend from a spur, you must install a fused connection unit (FCU) at the junction to create a fused spur. This ensures the spur cable is properly protected."
  },
  {
    question: "Why are 110 V socket outlets used on construction sites?",
    answer: "110 V (centre-tapped earth) supplies are used on construction sites to reduce the risk of fatal electric shock. The centre-tap earthing arrangement means the maximum voltage to earth is only 55 V (half of 110 V), which is below the 50 V threshold considered dangerous under normal body resistance conditions. This arrangement is specified by BS 7671 and the HSE for temporary supplies on construction sites. The 110 V supply is typically provided by a portable step-down transformer."
  },
  {
    question: "What is the difference between a switched and an unswitched FCU?",
    answer: "A switched FCU has a built-in double-pole switch that allows the connected appliance to be isolated without removing the fuse or switching off the circuit at the consumer unit. This is required where the FCU is used as the local means of isolation for a fixed appliance (e.g., a boiler, extractor fan or water heater). An unswitched FCU has no switch — isolation requires removing the fuse or switching off the circuit. Unswitched FCUs are used where a separate local isolator is already provided."
  },
  {
    question: "Do I need RCD protection for all socket outlets, including in commercial premises?",
    answer: "Yes. BS 7671:2018+A3:2024 Regulation 411.3.3 requires additional protection by a 30 mA RCD for all socket outlets with a rated current not exceeding 32 A, regardless of the type of premises. This requirement applies to domestic, commercial and industrial installations. There are limited exceptions for specific industrial applications where the socket is supervised by a skilled or instructed person and the loss of supply could cause a greater hazard."
  }
];

const MOETModule3Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Socket Outlet and Small Power Circuits
          </h1>
          <p className="text-white/80">
            Ring finals, radial circuits, spur rules, socket types and testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Ring final:</strong> 2.5 mm² cable, 32 A MCB, cable returns to origin</li>
              <li className="pl-1"><strong>Radial:</strong> 2.5 mm² (20 A) or 4.0 mm² (32 A), terminates at last point</li>
              <li className="pl-1"><strong>Spurs:</strong> One non-fused spur per point on the ring; unlimited fused spurs</li>
              <li className="pl-1"><strong>RCD protection:</strong> 30 mA RCD required for all sockets up to 32 A</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:2018+A3:2024:</strong> Reg 411.3.3 — RCD protection for sockets</li>
              <li className="pl-1"><strong>BS 1363:</strong> 13 A plugs, socket outlets and connection units</li>
              <li className="pl-1"><strong>BS EN 60309-2:</strong> Industrial plugs and sockets (commando)</li>
              <li className="pl-1"><strong>ST1426:</strong> Install, test and maintain power circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operation and advantages of ring final and radial circuits",
              "State the rules for non-fused and fused spurs under BS 7671",
              "Identify socket outlet types for domestic, commercial and industrial applications",
              "Describe the RCD protection requirements for socket outlets",
              "Carry out the R1+R2 ring continuity test and interpret results",
              "Explain the purpose and application of FCUs and dedicated circuits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Ring Final and Radial Circuits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ring Final and Radial Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ring final circuit is a uniquely British arrangement that was introduced after the Second
              World War to reduce the amount of copper cable required in domestic wiring. By connecting both
              ends of the line, neutral and earth conductors to the same terminals at the consumer unit,
              current can flow in both directions around the ring, effectively providing two parallel paths
              and allowing smaller cable (2.5 mm²) to be used with a higher-rated protective device (32 A).
            </p>
            <p>
              Radial circuits, by contrast, run from the consumer unit to each outlet in sequence, terminating
              at the last point. They are simpler to design and install but require larger cable for the same
              protective device rating because the full load current flows through a single cable path.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Final Circuit</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable: 2.5 mm² twin and earth</li>
                  <li className="pl-1">Protection: 32 A Type B MCB</li>
                  <li className="pl-1">Max floor area: 100 m² (domestic)</li>
                  <li className="pl-1">Both ends terminate at the same MCB</li>
                  <li className="pl-1">Current divides between two paths</li>
                  <li className="pl-1">Requires ring continuity testing</li>
                  <li className="pl-1">Non-fused spurs permitted (rules apply)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Radial Circuit</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable: 2.5 mm² (20 A) or 4.0 mm² (32 A)</li>
                  <li className="pl-1">Protection: 20 A or 32 A MCB</li>
                  <li className="pl-1">Max floor area: 50 m² (20 A) or 75 m² (32 A)</li>
                  <li className="pl-1">Terminates at last socket outlet</li>
                  <li className="pl-1">Full load on single cable path</li>
                  <li className="pl-1">Simpler to install and test</li>
                  <li className="pl-1">Used where ring is impractical</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Broken Ring Warning</p>
              <p className="text-sm text-white">
                A ring final circuit with a break (disconnection) in one conductor effectively becomes a
                radial circuit, but with cable rated for ring circuit use (2.5 mm²) and a 32 A protective
                device. This is a potentially dangerous condition because the full 32 A could flow through
                the 2.5 mm² cable in a single path, which may exceed its current-carrying capacity depending
                on the installation method. This is why ring continuity testing is essential during periodic
                inspection and testing.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Always carry out the ring continuity test during periodic
              inspection to verify the ring is intact. Breaks are commonly found at socket outlets where
              connections have loosened or where previous alterations have been made incorrectly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Spur Rules and FCUs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Spur Rules and Fused Connection Units
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Spurs are branch cables taken from a ring final circuit to supply additional socket outlets or
              fixed appliances. BS 7671 defines strict rules for spurs to ensure that cables are adequately
              protected and that the ring circuit is not compromised. Understanding the difference between
              fused and non-fused spurs is essential for maintenance and alteration work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Fused Spurs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Connected from a socket outlet or junction box on the ring (not from another spur)</li>
                <li className="pl-1">Cable must be the same size as the ring cable (2.5 mm²)</li>
                <li className="pl-1">May supply one single or one twin socket outlet, or one fused connection unit</li>
                <li className="pl-1">One non-fused spur per point on the ring</li>
                <li className="pl-1">Total non-fused spurs must not exceed the number of points on the ring</li>
                <li className="pl-1">No spur from a spur is permitted</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fused Spurs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Connected via a fused connection unit (FCU) containing a BS 1362 fuse</li>
                <li className="pl-1">Any number of fused spurs may be connected to the ring</li>
                <li className="pl-1">Cable on the load side can be reduced (e.g., 1.0 mm² for a 3 A fuse)</li>
                <li className="pl-1">May supply any number of outlets or appliances, provided the total load does not exceed the fuse rating</li>
                <li className="pl-1">FCU can be switched or unswitched, with or without a neon indicator</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fused Connection Unit (FCU) Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Boilers and heating controls:</strong> Switched FCU with 3 A fuse — provides local isolation</li>
                <li className="pl-1"><strong>Extractor fans:</strong> Switched FCU, often combined with an isolating switch in the bathroom</li>
                <li className="pl-1"><strong>Towel rails and heaters:</strong> Switched FCU with 13 A fuse for higher-rated fixed appliances</li>
                <li className="pl-1"><strong>Under-counter lights:</strong> Unswitched FCU with 3 A fuse — controlled by a separate switch</li>
                <li className="pl-1"><strong>Waste disposal units:</strong> Switched FCU with 3 A or 5 A fuse</li>
                <li className="pl-1"><strong>Security systems:</strong> Unswitched FCU to prevent accidental disconnection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When adding a socket outlet to an existing ring circuit, always
              check whether the point you are connecting from is already a spur. Connecting a spur from a
              spur creates an unprotected extension and is a non-compliance with BS 7671.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Socket Types and RCD Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Socket Outlet Types and RCD Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Socket outlets are the most common point of connection between the fixed wiring installation
              and portable equipment. The type of socket outlet must be appropriate for the voltage, current
              rating and environment. BS 7671:2018+A3:2024 requires additional protection by a 30 mA RCD
              for all socket outlets rated up to 32 A — a requirement that applies across all premises types.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Socket Outlet Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13 A rectangular pin</td>
                      <td className="border border-white/10 px-3 py-2">BS 1363</td>
                      <td className="border border-white/10 px-3 py-2">13 A, 230 V</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, commercial, general use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Round pin (2 A/5 A/15 A)</td>
                      <td className="border border-white/10 px-3 py-2">BS 546</td>
                      <td className="border border-white/10 px-3 py-2">2/5/15 A</td>
                      <td className="border border-white/10 px-3 py-2">Lighting, clock circuits, older installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial (commando)</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 60309-2</td>
                      <td className="border border-white/10 px-3 py-2">16/32/63/125 A</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, construction, outdoor events</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">110 V (CTE)</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 60309-2</td>
                      <td className="border border-white/10 px-3 py-2">16/32 A</td>
                      <td className="border border-white/10 px-3 py-2">Construction sites (yellow)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">USB integrated</td>
                      <td className="border border-white/10 px-3 py-2">BS 1363-2</td>
                      <td className="border border-white/10 px-3 py-2">13 A + USB</td>
                      <td className="border border-white/10 px-3 py-2">Offices, hotels, residential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 60309-2 Colour Coding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Yellow:</strong> 110 V (centre-tapped earth) — construction site use</li>
                <li className="pl-1"><strong>Blue:</strong> 230 V single-phase — general industrial use</li>
                <li className="pl-1"><strong>Red:</strong> 400 V three-phase — heavy industrial equipment</li>
                <li className="pl-1"><strong>Green:</strong> Greater than 50 V, special frequency ranges</li>
                <li className="pl-1"><strong>The keying (position of earth pin):</strong> Prevents interconnection between different voltage ratings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">RCD Protection Requirements (BS 7671:2018+A3:2024)</p>
              <p className="text-sm text-white mb-3">
                Regulation 411.3.3 requires additional protection by an RCD with IΔn not exceeding 30 mA for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All socket outlets with rated current not exceeding 32 A (all locations)</li>
                <li className="pl-1">Mobile equipment with rated current not exceeding 32 A for outdoor use</li>
                <li className="pl-1">All circuits in zones 0, 1 and 2 of bathrooms/shower rooms</li>
                <li className="pl-1">All circuits in swimming pool and fountain areas</li>
                <li className="pl-1">All circuits supplying caravans, camping parks and marinas</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> RCBOs (combined MCB and RCD in a single device) are increasingly
              preferred over split-load consumer units because they provide individual circuit RCD protection
              without the risk of nuisance tripping affecting other circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Testing and Dedicated Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ring Continuity Testing and Dedicated Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing ring final circuits is a fundamental skill for maintenance technicians carrying out
              periodic inspection and testing. The ring continuity test confirms the integrity of the ring
              and provides the R1+R2 values needed to calculate earth fault loop impedance at each socket
              outlet. Dedicated circuits are required for high-power appliances that exceed the capacity
              of general-purpose circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">R1+R2 Ring Continuity Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Isolate the circuit and confirm dead. Disconnect both ends of the ring from the consumer unit</li>
                <li className="pl-1"><strong>Step 2:</strong> Measure the resistance of the line conductor loop (end-to-end) = r1</li>
                <li className="pl-1"><strong>Step 3:</strong> Measure the resistance of the neutral conductor loop (end-to-end) = rn</li>
                <li className="pl-1"><strong>Step 4:</strong> Measure the resistance of the earth conductor loop (end-to-end) = r2</li>
                <li className="pl-1"><strong>Step 5:</strong> Cross-connect: line of one end to neutral of the other end, and vice versa</li>
                <li className="pl-1"><strong>Step 6:</strong> Measure resistance at each socket outlet — this gives R1+Rn (should be approximately r1+rn / 4)</li>
                <li className="pl-1"><strong>Step 7:</strong> Repeat cross-connection with line and earth conductors to obtain R1+R2 at each socket</li>
                <li className="pl-1"><strong>Step 8:</strong> All readings should be substantially the same; a high reading indicates a break</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dedicated Circuits</p>
              <p className="text-sm text-white mb-3">
                Certain high-power appliances require their own dedicated circuit from the consumer unit, with
                cable and protection sized specifically for the load. Common dedicated circuits include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electric cooker:</strong> 32 A or 45 A circuit, 6.0 mm² or 10.0 mm² cable, cooker control unit</li>
                <li className="pl-1"><strong>Electric shower:</strong> 32 A or 40 A circuit, 6.0 mm² or 10.0 mm² cable, double-pole isolating switch</li>
                <li className="pl-1"><strong>Immersion heater:</strong> 16 A circuit, 2.5 mm² cable, double-pole switch with neon indicator</li>
                <li className="pl-1"><strong>Storage heaters:</strong> Individual or grouped circuits, often on an off-peak (Economy 7) tariff meter</li>
                <li className="pl-1"><strong>EV charge point:</strong> Dedicated circuit per BS 7671 Section 722, with appropriate load management</li>
                <li className="pl-1"><strong>Air conditioning units:</strong> Dedicated circuit sized for the specific unit's load</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Testing Faults Found</p>
              <p className="text-sm text-white">
                During periodic inspection and testing of ring circuits, common faults include: broken rings
                (a conductor disconnected at one point, turning the ring into a radial); interconnected rings
                (two ring circuits cross-connected, often at a socket that has been replaced incorrectly);
                spurs from spurs (a non-fused spur taken from another spur rather than from the ring); and
                incorrectly identified rings (two radial circuits connected at the consumer unit to appear
                as a ring). All of these are potentially dangerous and must be rectified.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in testing
              ring final circuits, interpreting results, and identifying defects. You must be able to carry
              out the full ring continuity test procedure and explain the results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Emergency Lighting Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-4">
              Next: Energy-Efficient Lighting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section4_3;