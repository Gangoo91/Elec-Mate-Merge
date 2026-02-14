import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  Zap,
  AlertTriangle,
  Home,
  Plug,
  Lightbulb,
  Baby,
  Droplets,
  FileCheck2,
  Search,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  Power,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Safety Tips', href: '/guides/electrical-safety-tips' },
];

const tocItems = [
  { id: 'why-safety-matters', label: 'Why Electrical Safety Matters' },
  { id: 'socket-safety', label: 'Socket and Plug Safety' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'cable-safety', label: 'Cable and Wiring Safety' },
  { id: 'kitchen-bathroom', label: 'Kitchen and Bathroom Safety' },
  { id: 'children-safety', label: 'Children and Electrical Safety' },
  { id: 'outdoor-safety', label: 'Outdoor and Garden Safety' },
  { id: 'warning-signs', label: 'Warning Signs to Watch For' },
  { id: 'regular-checks', label: 'Regular Checks and Inspections' },
  { id: 'for-electricians', label: 'For Electricians: Safety-First Practice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Test your RCDs every three months by pressing the test button on each RCD in the consumer unit — this takes 30 seconds and confirms your shock protection is working.',
  'Never overload sockets with adaptors and extension leads. A single socket is rated for 13A (3kW). A 4-gang extension lead shares that 13A across all sockets.',
  'Replace any damaged cables, discoloured sockets, or cracked switch plates immediately — damaged insulation and loose connections cause electrical fires.',
  'Have your electrical installation inspected every 10 years (owner-occupied) or 5 years (rented) with an EICR to identify hidden defects before they become dangerous.',
  'Elec-Mate helps electricians carry out thorough safety inspections with AI board scanning, automated test result recording, and instant certificate delivery.',
];

const faqs = [
  {
    question: 'How often should I test my RCDs?',
    answer:
      'You should test your RCDs at least every three months. The test is simple and takes about 30 seconds. Locate each RCD in your consumer unit (they are the wider switches, often marked with a "T" or "Test" button) and press the test button. The RCD should trip immediately, cutting power to the circuits it protects. Reset it by pushing the switch back to the on position. If the RCD does not trip when you press the test button, it may be faulty and should be replaced by a qualified electrician as soon as possible. An RCD that does not trip is not providing the shock protection it is designed for. The test button checks the internal mechanism of the RCD — it does not test the circuit wiring. A full functional test with calibrated instruments (as part of an EICR) checks both the RCD mechanism and the trip times at different fault current levels.',
  },
  {
    question: 'Is it safe to use extension leads permanently?',
    answer:
      'Extension leads are designed for temporary use, not permanent installations. Using extension leads as permanent wiring is one of the most common electrical safety mistakes in UK homes. The risks include: overloading (a 4-gang extension lead connected to a 13A socket still only has 13A available across all four sockets), daisy-chaining (connecting one extension lead to another, which creates excessive resistance and fire risk), cable damage (extension leads on floors get stepped on, run over by furniture, and trapped under carpets, all of which damage the insulation), and trip hazards. If you need more sockets in a room, have a qualified electrician install additional fixed sockets. This is safer, neater, and surprisingly affordable — typically £80 to £150 per socket added to an existing ring circuit. For temporary use (holiday lights, occasional tools), extension leads are fine — but unplug them when not in use and never coil a loaded extension lead (the coiled cable can overheat).',
  },
  {
    question: 'What should I do if I get an electric shock from a socket?',
    answer:
      'If you receive an electric shock from a socket, stop using that socket immediately and turn off the circuit at the consumer unit. Even a mild tingling sensation indicates a fault — either the socket has a live-to-earth fault, the earthing is compromised, or the RCD protection is not working. Seek medical attention if you feel unwell — electric shock can cause internal burns, heart rhythm disturbances, and muscle damage that may not be immediately apparent. Report the faulty socket to a qualified electrician for urgent investigation. The electrician will test the socket, the circuit, and the RCD protection. A shock from a 230V domestic socket can be fatal, particularly if you are wet, standing on a conductive floor, or have a heart condition. This is exactly why RCD protection is so important — a working 30mA RCD limits the shock duration to less than 40 milliseconds, significantly reducing the risk of serious injury.',
  },
  {
    question: 'Are old round-pin sockets dangerous?',
    answer:
      'Round-pin sockets (BS 546) are not inherently dangerous if they are in good condition and the circuit wiring is sound. They were the standard in UK homes before the current rectangular-pin BS 1363 system was introduced in 1947 and became universal by the 1960s. However, properties that still have round-pin sockets typically have very old wiring — often rubber-insulated or lead-sheathed cable from the 1930s to 1960s — which is likely to have deteriorated significantly. The sockets themselves may be cracked, the terminals may be loose, and the circuit may lack RCD protection and adequate earthing. If your property has round-pin sockets, it is a strong indicator that a rewire is needed. Have a qualified electrician carry out an EICR to assess the condition of the installation. Do not use adaptors to plug modern square-pin appliances into round-pin sockets — this is not safe.',
  },
  {
    question: 'Should I turn off appliances at the socket when not in use?',
    answer:
      'Turning off appliances at the socket when not in use is good practice for several reasons. First, it eliminates standby power consumption — most modern electronics draw a small amount of power even when in standby mode, which adds up over a year. Second, it reduces the risk of electrical faults causing damage when you are not present — a faulty appliance that is switched on can overheat or short-circuit while you are asleep or out. Third, it protects against voltage surges during thunderstorms. However, some appliances should remain on: fridge-freezers, alarm systems, broadband routers, and medical equipment. For appliances you use daily (televisions, game consoles, computer monitors), switching off at the socket each night is a reasonable habit. For appliances that are rarely used, always unplug them completely.',
  },
  {
    question: 'Can I replace a socket or switch myself?',
    answer:
      'In the UK, homeowners are permitted to replace a like-for-like socket faceplate or switch faceplate — that is, swapping the front cover with a new one of the same type without altering the wiring behind it. However, you must isolate the circuit at the consumer unit first, verify the circuit is dead with a voltage tester, and ensure the new faceplate is compatible with the existing wiring. If you are adding a new socket, moving a socket, adding a new circuit, or doing any work in a kitchen, bathroom, or outdoors, the work is notifiable under Part P of the Building Regulations and must be carried out by a qualified electrician registered with a competent person scheme (NICEIC, NAPIT, or ELECSA). Even for a simple faceplate swap, if you are not confident working with electrical connections, call an electrician — the cost is typically £40 to £80 per socket.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/troubleshooting-electrical-problems',
    title: 'Troubleshooting Electrical Problems',
    description:
      'Step-by-step guide to diagnosing tripped MCBs, flickering lights, dead sockets, and burning smells.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/power-cut-what-to-do',
    title: 'Power Cut: What to Do',
    description:
      'What to check, who to call, and emergency procedures when you lose power at home.',
    icon: Power,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Why your RCD keeps tripping and how to identify the circuit or appliance causing the fault.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including metal enclosure requirements and RCD protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-find-electrician-uk',
    title: 'Finding a Good Electrician',
    description:
      'What qualifications to check, questions to ask, and red flags when hiring an electrician in the UK.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-safety-matters',
    heading: 'Why Electrical Safety Matters in Every Home',
    content: (
      <>
        <p>
          Electricity is so reliable and convenient that it is easy to forget how dangerous it can
          be. In the UK, electrical faults cause around 14,000 house fires every year, resulting in
          approximately 70 deaths and over 350,000 injuries. Many of these incidents are preventable
          with basic awareness and regular maintenance.
        </p>
        <p>
          The 230V AC mains supply in a UK home is more than capable of killing. It takes as little
          as 50mA (0.05A) of current flowing through the body to cause ventricular fibrillation — a
          potentially fatal heart rhythm — and a domestic socket can deliver over 50A through a
          short circuit. The only thing standing between you and that current is the insulation on
          the cables, the protective devices in your{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
            consumer unit
          </SEOInternalLink>
          , and your own awareness of the risks.
        </p>
        <p>
          This guide covers 15 essential electrical safety tips that every homeowner should know.
          None of them require specialist knowledge — just common sense and a few minutes of your
          time.
        </p>
      </>
    ),
  },
  {
    id: 'socket-safety',
    heading: 'Socket and Plug Safety',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 1: Do not overload sockets.</strong> A single 13A socket can safely
                supply up to 3kW. Using a multi-way adaptor (the cube type that plugs directly into
                the socket) is particularly risky because it puts all the weight and strain on the
                socket terminals. If you need multiple sockets, use a fused extension lead — and
                check that the total load does not exceed 13A (3kW).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 2: Never daisy-chain extension leads.</strong> Plugging one extension
                lead into another creates excessive cable length, increases resistance, and
                multiplies the risk of overheating. If you need reach, use a single longer extension
                lead of adequate current rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 3: Replace damaged plugs and cables immediately.</strong> A plug with a
                cracked casing, exposed terminals, or a damaged cord grip is dangerous. A cable with
                damaged insulation (cuts, fraying, exposed copper) must be replaced — do not attempt
                to repair it with tape.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 4: Pull the plug, not the cable.</strong> Yanking a cable to remove a
                plug from a socket strains the cord grip and can pull the conductors away from the
                terminals inside the plug. Always grip the plug body and pull it straight out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection: Your Life-Saving Device',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/rcd-keeps-tripping">
            RCD (Residual Current Device)
          </SEOInternalLink>{' '}
          is the single most important safety device in your electrical installation. It monitors
          the balance between the live and neutral currents on a circuit. If current leaks to earth
          — through a person, through a fault, through water — the RCD detects the imbalance and
          disconnects the circuit within 40 milliseconds. That speed is fast enough to prevent fatal
          electric shock in most circumstances.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Tip 5: Test your RCDs every 3 months</h4>
              <p className="text-white text-sm leading-relaxed">
                Press the test button on each RCD in your consumer unit. The RCD should trip
                immediately. Reset it by pushing the switch back to the on position. If it does not
                trip, it may be faulty — call an electrician. This test takes 30 seconds and could
                save your life.
              </p>
            </div>
          </div>
        </div>
        <p>
          If your property does not have RCD protection (common in older installations with
          rewirable fuse boxes), you are not protected against electric shock. Consider upgrading
          your{' '}
          <SEOInternalLink href="/guides/consumer-unit-change-cost-uk">
            consumer unit
          </SEOInternalLink>{' '}
          to a modern board with RCD or RCBO protection on every circuit. This is one of the most
          worthwhile electrical safety investments you can make.
        </p>
      </>
    ),
  },
  {
    id: 'cable-safety',
    heading: 'Cable and Wiring Safety',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 6: Do not run cables under carpets or rugs.</strong> Cables under floor
                coverings can be damaged by foot traffic and furniture without you noticing. The
                damaged insulation can cause a fire or electric shock. Route cables along skirting
                boards in proper trunking or have them chased into the wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 7: Check cables for damage regularly.</strong> Look for cuts, kinks,
                fraying, and heat discolouration on appliance cables. Pay particular attention to
                cables near heat sources (cookers, radiators) and cables that are regularly flexed
                (vacuum cleaners, irons, hair dryers).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 8: Know where cables are before drilling.</strong> Before drilling into
                walls, check for hidden cables using a cable detector. Cables typically run
                vertically from sockets and switches and horizontally at the top of the wall.
                Drilling into a live cable can cause electric shock, a short circuit, or a fire.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'kitchen-bathroom',
    heading: 'Kitchen and Bathroom Electrical Safety',
    content: (
      <>
        <p>
          Kitchens and bathrooms are the highest-risk areas in any home because water and
          electricity are in close proximity. Special regulations under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> apply
          to these rooms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 9: Keep electrical appliances away from water.</strong> Never use a
                hairdryer, phone charger, or any mains-powered device near a bath, shower, or basin
                with running water. If a mains-powered device falls into water, do not reach in to
                retrieve it — turn off the power at the consumer unit first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 10: Bathroom sockets must be shaver sockets only.</strong> Standard 13A
                sockets are not permitted within a bathroom (except in zone 3 areas under specific
                conditions). Shaver sockets contain an isolating transformer that prevents electric
                shock. The only exception is a socket that is at least 3 metres from the bath or
                shower and protected by a 30mA RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 11: Do not dry clothes on electric heaters.</strong> Draping wet
                clothing over convector heaters, fan heaters, or storage heaters is a fire risk. The
                fabric can block ventilation, causing the heater to overheat.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'children-safety',
    heading: 'Keeping Children Safe Around Electricity',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Baby className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 12: You do not need socket covers.</strong> Contrary to popular belief,
                plastic socket covers (plug-in blanking plates) can actually make sockets less safe.
                UK BS 1363 sockets have built-in shutters that prevent access to the live and
                neutral contacts unless an earth pin is inserted first. Some poorly designed socket
                covers can defeat these shutters and create a risk that was not there before. The
                Royal Society for the Prevention of Accidents (RoSPA) and Electrical Safety First
                have both raised concerns about socket covers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Baby className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 13: Teach children about electrical safety early.</strong> Explain that
                electricity is not a toy, that they should never push anything into a socket, and
                that they should tell an adult if they see a damaged cable, a sparking socket, or
                anything that looks wrong.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-safety',
    heading: 'Outdoor and Garden Electrical Safety',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 14: Use RCD protection for all outdoor equipment.</strong> Lawnmowers,
                hedge trimmers, pressure washers, and any other outdoor electrical equipment must be
                used with RCD protection. If your outdoor socket does not have a built-in RCD, use a
                plug-in RCD adaptor. Cutting through the cable of a lawnmower or hedge trimmer is
                one of the most common causes of electric shock in the home.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tip 15: All outdoor electrical work must be done by a professional.</strong>{' '}
                Under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations-explained">
                  Part P of the Building Regulations
                </SEOInternalLink>
                , all outdoor electrical work (lighting, sockets, garden building supplies) is
                notifiable and must be carried out by a registered electrician. DIY outdoor
                electrical work is not only dangerous — it is illegal if not notified to Building
                Control.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'warning-signs',
    heading: 'Warning Signs of Electrical Problems',
    content: (
      <>
        <p>
          Watch for these warning signs that indicate a potential electrical fault in your home. Any
          of these should prompt a call to a{' '}
          <SEOInternalLink href="/guides/how-to-find-electrician-uk">
            qualified electrician
          </SEOInternalLink>
          :
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Sockets or switches that are warm to the touch</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Discolouration (brown or yellow marks) around sockets or switches</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Burning smell from any electrical point</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Sparking when you plug in or unplug an appliance</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Buzzing or humming from sockets, switches, or the consumer unit</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Fuses or MCBs that trip repeatedly without obvious cause</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Lights that flicker or dim when other appliances switch on</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Electric shocks (even mild tingling) from sockets or appliances</span>
            </li>
          </ul>
        </div>
        <p>
          Do not ignore these signs. A loose connection, deteriorated insulation, or overloaded
          circuit that produces a warm socket today can start a fire tomorrow. Regular{' '}
          <SEOInternalLink href="/guides/eicr-certificate-explained">
            EICR inspections
          </SEOInternalLink>{' '}
          are designed to catch these problems before they become dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'regular-checks',
    heading: 'Regular Checks and Professional Inspections',
    content: (
      <>
        <p>
          Electrical safety is not a one-off — it requires ongoing attention. Here is a recommended
          schedule:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 3 months:</strong> Test your RCDs using the test button.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every year:</strong> Visual check of all sockets, switches, and cables for
                damage or discolouration. Check that no extension leads are being used as permanent
                wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 5 years (rented property):</strong> A full{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink> by a
                qualified electrician. This is a legal requirement for landlords in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 10 years (owner-occupied):</strong> A full EICR by a qualified
                electrician. This is recommended (not legally required for homeowners) but is
                strongly advised — especially for properties over 25 years old.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before buying a property:</strong> Commission an EICR as part of the
                conveyancing process. This identifies any electrical defects that could cost
                thousands to fix — and gives you negotiating power.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Deliver Safety Inspections Efficiently',
    content: (
      <>
        <p>
          Safety inspections are the foundation of your professional reputation. A thorough EICR
          that identifies real defects, classifies them correctly, and presents the findings clearly
          builds trust with homeowners, landlords, and letting agents. Elec-Mate makes every
          inspection more efficient:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and Elec-Mate reads the MCB/RCBO ratings, circuit
                  details, and board layout automatically. Half the EICR data is populated before
                  you pick up the test leads.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect Classification AI</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe any defect in plain English and the AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  (C1, C2, C3, FI) with the matching BS 7671 regulation reference. Accurate
                  classification on every report.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete safety inspections faster"
          description="AI board scanning, voice test entry, automated defect classification, and instant PDF delivery. Join 430+ UK electricians using Elec-Mate for every inspection. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyTipsPage() {
  return (
    <GuideTemplate
      title="Electrical Safety Tips | 15 Things Every Homeowner Should Know"
      description="15 essential electrical safety tips for UK homeowners. Socket safety, RCD testing, cable checks, kitchen and bathroom rules, children's safety, outdoor electrics, and warning signs of electrical faults."
      datePublished="2026-01-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrical Safety Tips:{' '}
          <span className="text-yellow-400">15 Things Every Homeowner Should Know</span>
        </>
      }
      heroSubtitle="Electrical faults cause around 14,000 house fires in the UK every year. Most are preventable. This guide covers 15 essential safety tips — from testing your RCDs to knowing the warning signs of a dangerous fault."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Electricians: Deliver Professional Safety Inspections"
      ctaSubheading="AI board scanning, automated defect classification, and instant certificate delivery. Complete every EICR faster with Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
