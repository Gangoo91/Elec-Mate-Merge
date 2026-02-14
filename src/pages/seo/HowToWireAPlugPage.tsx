import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Plug,
  ShieldCheck,
  AlertTriangle,
  Home,
  FileCheck2,
  ClipboardCheck,
  Search,
  GraduationCap,
  PoundSterling,
  Zap,
  Cable,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Wire a Plug', href: '/guides/how-to-wire-a-plug' },
];

const tocItems = [
  { id: 'why-know', label: 'Why You Should Know How to Wire a Plug' },
  { id: 'what-you-need', label: 'What You Need' },
  { id: 'wire-colours', label: 'Wire Colours Explained' },
  { id: 'step-by-step', label: 'Step-by-Step Instructions' },
  { id: 'fuse-selection', label: 'Fuse Selection: 3A or 13A' },
  { id: 'strip-lengths', label: 'Correct Strip Lengths' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'safety-checks', label: 'Safety Checks After Wiring' },
  { id: 'for-electricians', label: 'For Electricians: Teaching Clients' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A UK 3-pin plug uses three wires: brown (live), blue (neutral), and green/yellow (earth). The earth wire connects to the top pin, live to the bottom right (with the fuse), and neutral to the bottom left.',
  'Use a 3A fuse for appliances rated up to 700W (table lamps, phone chargers, radios) and a 13A fuse for appliances rated over 700W (kettles, toasters, irons, heaters).',
  'The outer sheath of the flex must be clamped firmly by the cord grip inside the plug — this prevents the individual wires from being pulled out if the cable is tugged.',
  'Strip approximately 8mm of insulation from each conductor for terminal connection, and ensure no bare copper is visible outside the terminal.',
  'Elec-Mate includes a wiring reference library that electricians can share with clients — including plug wiring diagrams, fuse selection guides, and UK wiring colour charts.',
];

const faqs = [
  {
    question: 'What are the wire colours in a UK plug?',
    answer:
      'The current UK wiring colours (harmonised with European standards since 2004) are: Brown for Live (L), Blue for Neutral (N), and Green/Yellow striped for Earth (E). The older UK colours were: Red for Live, Black for Neutral, and Green for Earth. The colour change was introduced by BS 7671:2004 (the 17th Edition) and BS EN 60446 to harmonise with the European colour code system. In a plug, you will almost always see the current colours (brown, blue, green/yellow) because flex cable has used the harmonised colours since the 1970s for new manufacturing. If you encounter a very old appliance with red, black, and green wires, the connections are the same: red (live) to the fused terminal, black (neutral) to the left terminal, and green (earth) to the top terminal.',
  },
  {
    question: 'How do I choose between a 3A and 13A fuse?',
    answer:
      'The rule of thumb is simple: use a 3A fuse for appliances rated up to 700W, and a 13A fuse for appliances rated over 700W. The fuse is there to protect the flex cable, not the appliance — it should blow before the cable overheats. Appliances that typically use a 3A fuse include: table lamps (60-100W), phone chargers (5-20W), radios (10-50W), televisions (50-200W), laptop chargers (30-90W), and small audio equipment. Appliances that typically use a 13A fuse include: kettles (2,200-3,000W), toasters (800-1,500W), irons (1,000-2,400W), fan heaters (1,000-3,000W), washing machines (2,000-2,500W), and vacuum cleaners (700-2,400W). Some appliances fall in the middle — a 700W microwave or a 700W vacuum cleaner could use either. When in doubt, check the rating plate on the appliance and choose the fuse that is just above the current draw: Power (W) / Voltage (230V) = Current (A).',
  },
  {
    question: 'Is it legal for a homeowner to wire a plug in the UK?',
    answer:
      'Yes. Wiring a 13A plug is not notifiable work under Part P of the Building Regulations and does not require an electrician. It is considered a simple maintenance task that any competent person can carry out. The plug is not part of the fixed electrical installation — it is part of the appliance or portable equipment. BS 1363 covers the design and safety requirements for 13A plugs, and there is no legal restriction on who can wire one. However, if the plug is wired incorrectly and causes an injury or fire, the person who wired it could be held liable. This is why it is important to follow the correct procedure, use the right fuse, and check the wiring before use.',
  },
  {
    question: 'Why does my plug get hot?',
    answer:
      'A hot plug usually indicates a poor connection inside the plug, an overloaded circuit, or a damaged flex. The most common cause is loose terminal screws — if the wire is not clamped tightly in the terminal, the connection has high resistance, which generates heat. Open the plug, check all three terminals are tight, and ensure the correct amount of copper is in each terminal. Other causes include: using a fuse that is too high for the appliance (allowing excessive current flow), a damaged or kinked flex cable (internal conductor damage), or a faulty appliance drawing more current than it should. If the plug continues to get hot after checking the connections, stop using the appliance and have it inspected by an electrician. A hot plug can melt the plug housing and cause a fire.',
  },
  {
    question: 'Do I need to connect the earth wire if my appliance is double-insulated?',
    answer:
      'Double-insulated appliances (marked with the double-square symbol on the rating plate) do not require an earth connection. The flex cable on a double-insulated appliance will only have two cores: brown (live) and blue (neutral). There is no earth wire to connect. If the plug came with the appliance and is moulded on, it will have a plastic earth pin (not connected internally). If you are fitting a new plug to a double-insulated appliance, connect only the brown and blue wires. The earth terminal should be left empty. Do not cut or remove the earth pin from the plug — it is needed to open the socket shutter mechanism on UK 13A sockets.',
  },
  {
    question: 'Can I use a European plug in the UK?',
    answer:
      'European 2-pin plugs (Type C/Europlug) are not compatible with UK 13A sockets (Type G, BS 1363). The pins are different sizes and the UK socket has shuttered entries that require the earth pin to open. Using a travel adaptor is the safest temporary solution, but for permanent use in the UK, the European plug should be replaced with a BS 1363 UK plug. When fitting a UK plug to a European appliance, check the voltage rating — most modern European appliances are rated 220-240V and will work on the UK 230V supply. If the appliance is rated 110V only, it will not work on the UK supply without a step-down transformer. Also check whether the appliance is double-insulated (2-core flex) or earthed (3-core flex) and connect accordingly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/wiring-colours-uk',
    title: 'UK Wiring Colours Guide',
    description:
      'Complete reference for old and new UK wiring colours with harmonisation explained.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide',
    description: 'Portable appliance testing requirements, frequency, and what is tested.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-symbols-chart',
    title: 'Electrical Symbols Chart',
    description: 'BS EN 60617 electrical symbols for circuit diagrams and installation drawings.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation procedure following GS38 and best practice.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Troubleshooting guide for RCD tripping issues with common causes and solutions.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/level-2-electrical',
    title: 'Level 2 Electrical Course',
    description: 'Start your electrical career with Level 2 training on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-know',
    heading: 'Why You Should Know How to Wire a Plug',
    content: (
      <>
        <p>
          Wiring a 13A plug is one of the most basic electrical skills anyone can learn. While most
          new appliances come with moulded plugs already attached, there are still many situations
          where you need to fit or re-wire a plug: replacing a damaged plug, fitting a plug to an
          imported appliance, connecting a replacement flex to an older appliance, or rewiring a
          plug where the connections have come loose.
        </p>
        <p>
          A correctly wired plug is safe. An incorrectly wired plug is dangerous — connecting the
          live wire to the earth terminal, or failing to secure the cord grip, can cause electric
          shock or fire. This guide follows the requirements of BS 1363 (the standard for UK 13A
          plugs) and explains every step clearly.
        </p>
        <p>
          Understanding{' '}
          <SEOInternalLink href="/guides/wiring-colours-uk">UK wiring colours</SEOInternalLink> is
          the foundation. Once you know which wire goes where and why, wiring a plug takes less than
          five minutes.
        </p>
      </>
    ),
  },
  {
    id: 'what-you-need',
    heading: 'What You Need',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A BS 1363 UK 3-pin plug</strong> — the standard UK plug with three
                rectangular pins. Make sure it carries the BS 1363 kitemark.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A small flat-blade screwdriver</strong> — for the terminal screws and the
                plug cover screw.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire strippers</strong> — to remove insulation from the individual
                conductors. A sharp knife can be used carefully, but wire strippers are safer and
                more precise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Side cutters</strong> — to trim wires to the correct length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The correct fuse</strong> — 3A (red) or 13A (brown), depending on the
                appliance rating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wire-colours',
    heading: 'Wire Colours Explained',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white mb-1">Brown = Live (L)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The live wire carries the current from the supply to the appliance. It connects to
                  the bottom-right terminal in the plug — the terminal with the fuse holder next to
                  it. This is the most dangerous wire. If you touch it while the plug is connected,
                  you will receive an electric shock.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white mb-1">Blue = Neutral (N)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The neutral wire completes the circuit, carrying the current back to the supply.
                  It connects to the bottom-left terminal in the plug. While the neutral is at or
                  near zero volts under normal conditions, it should still be treated as potentially
                  live — a fault in the installation could make the neutral live.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-green-500 shrink-0 mt-0.5 ring-2 ring-yellow-400" />
              <div>
                <h4 className="font-bold text-white mb-1">Green/Yellow = Earth (E)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The earth wire provides a safe path for fault current if the live wire touches the
                  metal casing of the appliance. It connects to the top terminal — the largest pin.
                  Under normal operation, no current flows through the earth wire. It only carries
                  current during a fault, causing the fuse or circuit breaker to trip.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          An easy way to remember: <strong>B</strong>rown = <strong>B</strong>ottom right,{' '}
          <strong>Bl</strong>ue = <strong>B</strong>ottom <strong>l</strong>eft. The earth (green/
          yellow) always goes to the top, longest pin.
        </p>
      </>
    ),
  },
  {
    id: 'step-by-step',
    heading: 'Step-by-Step: How to Wire a UK Plug',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Remove the plug cover.</strong> Unscrew the single screw on the back of the
              plug and remove the cover. Note the positions of the three terminals and the cord
              grip.
            </li>
            <li>
              <strong>Strip the outer sheath.</strong> Remove approximately 50mm of the outer sheath
              from the flex cable, exposing the three individual insulated conductors. Be careful
              not to nick the insulation on the individual wires.
            </li>
            <li>
              <strong>Cut wires to length.</strong> Lay the flex in the plug with the outer sheath
              under the cord grip. Cut each wire to the correct length so it reaches its terminal
              without being too long or too short. The earth wire (top) should be the longest, the
              live wire (bottom right) should be the shortest.
            </li>
            <li>
              <strong>Strip the insulation.</strong> Strip approximately 8mm of coloured insulation
              from the end of each conductor, exposing the bare copper.
            </li>
            <li>
              <strong>Connect the earth wire (green/yellow).</strong> Insert the bare copper into
              the top terminal (marked E or with the earth symbol). Tighten the terminal screw
              firmly. No bare copper should be visible outside the terminal.
            </li>
            <li>
              <strong>Connect the live wire (brown).</strong> Insert the bare copper into the
              bottom-right terminal (marked L). This is the terminal next to the fuse holder.
              Tighten the terminal screw firmly.
            </li>
            <li>
              <strong>Connect the neutral wire (blue).</strong> Insert the bare copper into the
              bottom-left terminal (marked N). Tighten the terminal screw firmly.
            </li>
            <li>
              <strong>Secure the cord grip.</strong> Position the outer sheath of the flex under the
              cord grip and tighten the cord grip screws. The cord grip must clamp the outer sheath
              — not the individual insulated wires. When you tug the cable, the cord grip should
              hold firm.
            </li>
            <li>
              <strong>Insert the correct fuse.</strong> Push the fuse (3A or 13A) into the fuse
              holder clips next to the live terminal.
            </li>
            <li>
              <strong>Replace the cover.</strong> Ensure no wires are trapped or pinched, then screw
              the back cover on securely.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'fuse-selection',
    heading: 'Fuse Selection: 3A or 13A',
    content: (
      <>
        <p>
          The fuse in a UK plug protects the flex cable from overheating. It is not there to protect
          the appliance — most appliances have their own internal fuse or protection. The plug fuse
          should be rated just above the normal current draw of the appliance.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">3A Fuse (Red)</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              For appliances rated up to 700W (approximately 3A at 230V).
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li>Table lamps and floor lamps</li>
              <li>Phone and tablet chargers</li>
              <li>Laptop chargers</li>
              <li>Radios and small audio equipment</li>
              <li>Televisions (most models)</li>
              <li>Electric blankets</li>
              <li>Clocks and small electronics</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">13A Fuse (Brown)</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              For appliances rated over 700W (approximately 3A to 13A at 230V).
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li>Kettles (2,200 to 3,000W)</li>
              <li>Toasters (800 to 1,500W)</li>
              <li>Irons (1,000 to 2,400W)</li>
              <li>Fan heaters (1,000 to 3,000W)</li>
              <li>Washing machines (2,000 to 2,500W)</li>
              <li>Vacuum cleaners (700 to 2,400W)</li>
              <li>Microwaves (700 to 1,200W)</li>
            </ul>
          </div>
        </div>
        <p>
          To calculate the fuse needed: check the wattage on the appliance rating plate and divide
          by 230V. If the result is under 3A, use a 3A fuse. If it is between 3A and 13A, use a 13A
          fuse. Never use a fuse rated higher than 13A in a standard BS 1363 plug.
        </p>
      </>
    ),
  },
  {
    id: 'strip-lengths',
    heading: 'Correct Strip Lengths',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outer sheath:</strong> Strip approximately 50mm from the end of the flex.
                This exposes enough of the individual wires to reach their terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual wire insulation:</strong> Strip approximately 8mm from each
                conductor. The exact amount depends on the terminal type — enough copper should be
                inserted into the terminal that no bare copper is visible when the screw is
                tightened.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire lengths:</strong> Each wire should be cut to reach its terminal without
                excess slack. The earth wire is the longest (it goes to the top pin), the neutral is
                medium length (bottom left), and the live is the shortest (bottom right). This
                ensures that if the cable is pulled, the live wire disconnects first.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Too much stripped insulation exposes bare copper outside the terminal, creating a shock
          risk. Too little means not enough copper is in the terminal, creating a loose connection
          that can overheat. Aim for 8mm exposed copper — just enough to fill the terminal barrel.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wires in the wrong terminals.</strong> The most dangerous mistake. Brown
                (live) in the earth terminal means the metal casing of the appliance becomes live.
                Always double-check: brown = bottom right (with fuse), blue = bottom left, green/
                yellow = top.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cord grip not securing the outer sheath.</strong> If the cord grip is
                clamping the individual wires instead of the outer sheath, a tug on the cable can
                pull the wires out of the terminals. The cord grip must grip the round outer sheath.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Too much bare copper exposed.</strong> If bare copper is visible between the
                insulation and the terminal, there is a risk of contact between wires or with the
                plug casing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong fuse.</strong> Using a 13A fuse on a lamp with thin 0.5mm flex means
                the flex can carry dangerous current before the fuse blows. Use a 3A fuse for low-
                wattage appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose terminal screws.</strong> A loose connection generates heat. Always
                tighten terminal screws firmly and give each wire a gentle tug to confirm it is
                secure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safety-checks',
    heading: 'Safety Checks After Wiring',
    content: (
      <>
        <p>Before plugging in and switching on, carry out these visual checks:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Each wire is in the correct terminal: brown (live) to the right (with fuse), blue
                (neutral) to the left, green/yellow (earth) to the top.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                All three terminal screws are tight. Tug each wire gently — none should come loose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No bare copper is visible outside any terminal.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                The cord grip is clamping the outer sheath firmly. Pull the cable — the cord grip
                should hold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                The correct fuse is in place (3A for appliances up to 700W, 13A for over 700W).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No wires are trapped or pinched by the plug cover.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>The back cover is screwed on securely and sits flush.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Teaching Clients the Basics',
    content: (
      <>
        <p>
          As a professional electrician, you will regularly encounter clients with questions about
          plug wiring, fuse selection, and appliance safety. Elec-Mate includes a client education
          library that you can share directly:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Client Reference Library</h4>
                <p className="text-white text-sm leading-relaxed">
                  Share plug wiring diagrams, fuse selection guides, and{' '}
                  <SEOInternalLink href="/guides/wiring-colours-uk">
                    UK wiring colour charts
                  </SEOInternalLink>{' '}
                  with your clients by WhatsApp or email. Professional-quality reference material
                  with your branding.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">PAT Testing Integration</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you carry out{' '}
                  <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT testing</SEOInternalLink>{' '}
                  for commercial clients, Elec-Mate records every appliance test, generates PAT test
                  labels, and produces the register — all from your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="The complete electrician's toolkit"
          description="From plug wiring references to EICR certificates, from cable sizing calculators to AI-powered quoting. Elec-Mate is the all-in-one app for UK electricians. 7-day free trial."
          icon={Plug}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HowToWireAPlugPage() {
  return (
    <GuideTemplate
      title="How to Wire a Plug | Step-by-Step Guide UK"
      description="Step-by-step guide to wiring a UK 13A plug. Wire colours explained (brown live, blue neutral, green/yellow earth), fuse selection (3A vs 13A), correct strip lengths, and common mistakes to avoid."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="How-To Guide"
      badgeIcon={Plug}
      heroTitle={
        <>
          How to Wire a Plug: <span className="text-yellow-400">Step-by-Step Guide for the UK</span>
        </>
      }
      heroSubtitle="Brown is live, blue is neutral, green/yellow is earth. Use a 3A fuse for appliances up to 700W and 13A for everything above. This guide walks you through every step of wiring a UK 13A plug safely and correctly."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Wiring a Plug"
      relatedPages={relatedPages}
      ctaHeading="Every Electrical Reference in One App"
      ctaSubheading="Wiring colours, fuse tables, cable sizing, BS 7671 regulation search, and AI-powered certification. Elec-Mate is the complete toolkit for UK electricians. 7-day free trial."
    />
  );
}
