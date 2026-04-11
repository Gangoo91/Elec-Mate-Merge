import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Wrench,
  PoundSterling,
  ShieldCheck,
  Zap,
  Sun,
  FileCheck2,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Garden Lighting Fault Finding', href: '/garden-lighting-fault-finding' },
];

const tocItems = [
  { id: 'outdoor-electrical-safety', label: 'Outdoor Electrical Safety' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'ip-ratings', label: 'IP Ratings Explained' },
  { id: 'rcd-tripping', label: 'RCD Tripping' },
  { id: 'cable-damage', label: 'Cable Damage' },
  { id: 'transformer-faults', label: 'Transformer Faults' },
  { id: 'waterproofing', label: 'Waterproofing & Ingress Issues' },
  { id: 'repair-costs', label: 'Repair Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All outdoor lighting circuits in UK gardens must be protected by a 30mA RCD under BS 7671 Regulation 411.3.3. If your garden lights are on a circuit without RCD protection, this is a C2 (potentially dangerous) finding that must be rectified.',
  'Garden lighting cables buried underground must comply with BS 7671 wiring regulations — either armoured cable (SWA) or cables in protective conduit at sufficient depth, with cable protection warning tape above.',
  'IP (Ingress Protection) ratings indicate how well a light fitting is protected against water and dust. Garden luminaires should be rated at minimum IP44 (splash-proof); fittings exposed to heavy rain or immersion require IP65 or higher.',
  'Low-voltage garden lighting systems (typically 12V) use a transformer to step down the mains voltage. Transformer failure is a common and easily replaced fault — most low-voltage garden lighting sets use plug-in or hard-wired transformers costing £20 to £80.',
  'Any new outdoor lighting circuit or significant modification in England and Wales is notifiable work under Part P of the Building Regulations, requiring either competent person scheme self-certification or local authority building control inspection.',
];

const faqs = [
  {
    question: 'Why have my garden lights stopped working?',
    answer:
      'The most common causes are: a tripped RCD or MCB at the consumer unit, a failed transformer (for low-voltage systems), damaged cable (cut during gardening or gnawed by animals), failed lamp or lamp holder, or water ingress into a fitting that is not rated for outdoor use. Check the consumer unit first — if the outdoor circuit breaker or RCD has tripped, reset it carefully and observe. If it trips again immediately, there is a fault to earth that requires an electrician.',
  },
  {
    question: 'Do garden lights need RCD protection?',
    answer:
      'Yes. Under BS 7671 Regulation 411.3.3, all circuits supplying socket outlets rated up to 32A and all circuits in gardens and outdoor areas must be protected by a 30mA RCD. This is not optional — it is a legal requirement under the wiring regulations and is also a condition of Part P Building Regulations compliance. If your garden lighting circuit does not have RCD protection, it is a potentially dangerous (C2) fault that should be rectified by a qualified electrician.',
  },
  {
    question: 'What IP rating do garden lights need?',
    answer:
      'Garden lights must have an appropriate IP rating for their location. The minimum for a sheltered porch or covered outdoor area is IP44 (protected against splashing water from any direction). For lights fully exposed to rain, the minimum is IP65 (dust-tight and protected against water jets). Lights used in or near water features (ponds, fountains) require IP67 or IP68 (protected against temporary or permanent immersion). Using an indoor-rated light outside will cause rapid failure and creates a safety hazard.',
  },
  {
    question: 'Can I install garden lights myself?',
    answer:
      'Installing plug-in garden lights connected to an existing outdoor socket does not require an electrician. However, installing a new outdoor lighting circuit, adding new sockets, or extending existing circuits is notifiable work under Part P of the Building Regulations in England and Wales. You can carry out this work yourself as a homeowner, but you must notify the local authority building control before starting and pay an inspection fee, or hire a registered electrician who can self-certify the work.',
  },
  {
    question: 'Why does my garden lighting transformer hum?',
    answer:
      'A slight hum from a magnetic (toroidal) transformer is normal. A loud buzzing or vibrating hum indicates the transformer is overloaded (too many lamps connected), a lamp has partially failed causing high current draw, or the transformer is failing. Check the total wattage of connected lamps against the transformer rating. If the transformer is overloaded, reduce the number of lamps or upgrade to a higher-rated transformer.',
  },
  {
    question: 'How deep should garden lighting cables be buried?',
    answer:
      'Under BS 7671 and BS 8666, buried cables in gardens must be at a depth that protects against damage. For armoured cables (SWA) in gardens, the minimum depth is 0.5 metres (500mm). For cables in conduit, the minimum is 0.45 metres (450mm). Shallower burial is permitted in areas protected from excavation (under paving or concrete), but cable protection warning tape must always be laid above buried cables at a depth of approximately 150mm to 200mm above the cable to warn future excavators.',
  },
  {
    question: 'What should I do if a garden light fitting fills with water?',
    answer:
      'Switch off the circuit at the consumer unit immediately. Allow the fitting to dry out completely (at least 48 to 72 hours in a warm, dry environment) before attempting to power it again. Check the IP rating of the fitting — if it is not rated for outdoor use, replace it with a correctly rated fitting. Inspect the fitting for cracks, failed gaskets, or poorly sealed cable entries. Even if the fitting dries out and works, degraded insulation from water ingress will eventually cause an earth fault and RCD tripping.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/outdoor-socket-fault-finding',
    title: 'Outdoor Socket Fault Finding',
    description:
      'RCD protection, weatherproof requirements, IP ratings, circuit issues, earth faults.',
    icon: Zap,
    category: 'Fault Finding',
  },
  {
    href: '/garage-door-electrical-fault',
    title: 'Garage Door Electrical Fault',
    description:
      'Motor control board faults, limit switches, safety sensors, and power supply issues.',
    icon: Wrench,
    category: 'Fault Finding',
  },
  {
    href: '/guides/electrical-safety-check',
    title: 'Electrical Safety Check Guide',
    description: 'When to get an electrical installation checked and what is tested.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'outdoor-electrical-safety',
    heading: 'Outdoor Electrical Safety — The Key Risks',
    content: (
      <>
        <p>
          Outdoor electrical installations face hazards that do not exist indoors: rain,
          condensation, UV degradation, ground movement, mechanical damage from gardening tools, and
          contact with vegetation. These factors make outdoor electrical faults more common and more
          dangerous than equivalent indoor faults.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-2 text-white">
              <p className="font-bold text-lg">Outdoor electrical faults can be fatal</p>
              <p>
                Water dramatically reduces the resistance of the human body. Contact with a live
                conductor in a wet outdoor environment — even at garden lighting voltages when
                mains-powered — can cause cardiac arrest. Never investigate an outdoor electrical
                fault without first switching off and proving dead at the consumer unit.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation first</strong> — switch off the outdoor lighting circuit MCB
                at the consumer unit. If there is a dedicated outdoor circuit, this will be
                labelled. If not, switch off the ring main or radial that feeds the outdoor socket
                or junction box. Prove dead at the garden light supply point with a GS38-compliant
                voltage indicator before touching any connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never assume plug-in is safe</strong> — garden lights connected via a plug
                to an outdoor socket are still live at mains voltage (230V) to the point of the
                transformer. Always unplug before investigating connections or luminaire faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low-voltage systems still require care</strong> — 12V garden lighting
                systems are safer than mains voltage, but the transformer primary side is still
                mains voltage (230V). The secondary (12V) side is safe to touch but the transformer
                connections must not be accessed without isolating the primary supply first.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements for Outdoor Circuits',
    content: (
      <>
        <p>
          Residual Current Device (RCD) protection is mandatory for all outdoor circuits under BS
          7671:2018+A3:2024 (the 18th Edition Wiring Regulations). This requirement exists because
          outdoor environments dramatically increase the risk of electric shock.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3</strong> — requires RCD protection with a rated residual
                operating current (IΔn) not exceeding 30mA for all socket circuits rated up to 32A
                and for all circuits in outdoor locations. This applies to garden lighting circuits
                whether they are hard-wired or socket-fed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where to fit the RCD</strong> — the RCD can be at the consumer unit (an
                RCD-protected circuit or RCBO), at an outdoor consumer unit or distribution board,
                or as an inline RCD socket. For plug-in garden lighting connected to an existing
                indoor socket, an RCD plug adapter (BS 1363 with 30mA RCD) provides protection at
                the point of use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing RCD protection</strong> — if your outdoor lighting circuit was
                installed before RCD protection was mandatory (pre-2008 installations), it may lack
                RCD protection. This is a C2 (potentially dangerous) observation on an EICR and
                should be rectified by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing</strong> — outdoor RCDs should be tested monthly using the test
                button on the device. The test button simulates a fault and the RCD should trip
                within 40 milliseconds. If the RCD does not trip when the test button is pressed, it
                has failed and must be replaced immediately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Garden Lighting Explained',
    content: (
      <>
        <p>
          IP (Ingress Protection) ratings are defined in BS EN 60529 and indicate how well an
          electrical fitting is protected against solid particles (first digit) and water (second
          digit). Understanding IP ratings is essential for choosing and diagnosing outdoor lighting
          faults.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — protected against solid objects over 1mm and against
                splashing water from any direction. Suitable for covered porches and sheltered
                outdoor areas. Not suitable for exposed garden positions that receive direct rain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP54 / IP55</strong> — dust-protected and splash-proof / water jet
                resistant. Suitable for most exposed garden locations including wall lights and post
                lights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — fully dust-tight and protected against low-pressure water
                jets. The minimum recommended rating for exposed garden spotlights, path lights, and
                ground-spike fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67 / IP68</strong> — protected against temporary immersion (IP67) or
                continuous immersion (IP68). Required for pond lights, fountain lights, and
                in-ground fittings that may flood in heavy rain.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Using a fitting with a lower IP rating than required for its location is a common cause of
          garden lighting faults. Water ingress causes corrosion of terminals, short circuits, and
          degraded insulation — all of which can cause RCD tripping or complete failure. Always
          check the IP rating label on the fitting and match it to the installation environment.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-tripping',
    heading: 'RCD Tripping on the Garden Lighting Circuit',
    content: (
      <>
        <p>
          An outdoor RCD that trips repeatedly has detected an earth leakage fault. The most common
          sources in garden lighting installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water-ingressed fitting</strong> — water inside the fitting creates a
                leakage path to earth. The RCD trips when the circuit is energised. Disconnect each
                fitting in turn, starting with any that appear wet or corroded, and reset the RCD
                between each disconnection. When the RCD holds after disconnecting a particular
                fitting, that fitting is the fault source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged underground cable</strong> — a nick, cut, or crush in the cable
                insulation allows moisture to penetrate and create an earth fault. The RCD trips
                reliably, regardless of which fitting is connected. Isolate all fittings and perform
                an insulation resistance test on the cable to identify a cable fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed transformer</strong> — if the transformer insulation has broken down,
                leakage current from the primary winding to the casing (earth) will trip the RCD.
                Disconnect the transformer and test it in isolation. If the RCD holds with the
                transformer disconnected, the transformer is the fault source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping from natural capacitance</strong> — long outdoor cable
                runs have significant capacitance to earth. In wet conditions, this capacitance can
                produce enough leakage current to trip a sensitive 10mA RCD. If you have a 10mA RCD
                on the garden circuit, consider upgrading to a 30mA RCD (which is the BS 7671
                requirement anyway).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-damage',
    heading: 'Cable Damage in Garden Installations',
    content: (
      <>
        <p>
          Damaged or incorrectly installed cable is a primary cause of garden lighting faults.
          Underground cable is vulnerable to physical damage, and aerial cable is subject to UV
          degradation and mechanical damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spade or fork damage</strong> — the most common cause of underground cable
                damage. A spade through a buried cable causes an immediate open circuit (lights go
                out) or a direct earth fault (RCD trips). If you suspect cable damage from
                gardening, mark the area and call an electrician — do not dig to investigate without
                first isolating the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Animal damage</strong> — rats, squirrels, and rabbits regularly chew through
                outdoor cable. Low-voltage garden lighting cable (typically 1.5mm² unarmoured) is
                particularly vulnerable. Armoured cable (SWA) or cable in conduit provides much
                better protection against animal damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>UV degradation</strong> — standard PVC cable insulation degrades rapidly
                when exposed to direct sunlight. Cable run above ground or attached to fences must
                be rated for outdoor UV exposure (typically XLPE or LSF outdoor-grade cable) or
                protected in UV-resistant conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underburied cable</strong> — if cable was installed without being properly
                buried (or has been partially exposed by soil erosion), it is at immediate risk of
                damage. Cable must be reinstalled at the correct depth with armoured cable or in
                protective conduit with warning tape above.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'transformer-faults',
    heading: 'Transformer Faults in Low-Voltage Garden Lighting',
    content: (
      <>
        <p>
          Low-voltage garden lighting systems (typically 12V DC or AC) use a transformer to convert
          the mains 230V supply to a safe low voltage. Transformer failure is common in cheaper
          systems and in systems that have been overloaded or exposed to water ingress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded transformer</strong> — the transformer is rated for a maximum
                total wattage of connected lamps. Adding more lamps than the rated capacity causes
                the thermal protection to trip repeatedly or the transformer to fail permanently.
                Calculate the total wattage of all connected lamps and ensure it is below 80% of the
                transformer capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer not resetting</strong> — most transformers have internal thermal
                protection that cuts out when overloaded or overheated. Allow the transformer to
                cool for 30 minutes before testing. If it powers up after cooling but cuts out again
                under load, the transformer is overloaded or has a partially failed winding that
                runs hot.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing a plug-in transformer</strong> — plug the transformer into a known
                working indoor socket (not the outdoor socket, in case that is the fault). Measure
                the output voltage at the transformer terminals with a multimeter. A 12V transformer
                should read 11 to 14V AC (or DC depending on type) with no load connected. No output
                voltage confirms transformer failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer replacement</strong> — plug-in garden lighting transformers cost
                £20 to £80 depending on capacity and quality. Hard-wired transformers require an
                electrician to disconnect and replace. Always match the replacement transformer to
                the voltage (12V AC or DC) and wattage requirements of the lighting system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'waterproofing',
    heading: 'Waterproofing Issues & Water Ingress',
    content: (
      <>
        <p>
          Water ingress into garden lighting fittings causes corrosion, short circuits, and earth
          faults. Even fittings with an appropriate IP rating can fail if seals deteriorate over
          time or if the fitting is incorrectly installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed gaskets and seals</strong> — the rubber gaskets that seal the lens or
                diffuser of a garden fitting degrade with UV exposure and thermal cycling. Inspect
                gaskets annually and replace when cracked, compressed, or no longer sealing
                correctly. Replacement gaskets are available from the fitting manufacturer or
                electrical wholesalers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable entry points</strong> — cable glands must be correctly sized for the
                cable and tightened to form a watertight seal. Loose or incorrectly sized glands
                allow water to track along the cable into the fitting body. If a fitting is
                repeatedly ingressing water at the cable entry, re-gland or seal the entry with
                self-amalgamating tape.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condensation inside the fitting</strong> — even IP65-rated fittings can
                develop condensation inside if there is a temperature differential between the
                inside and outside. A small silica gel desiccant bag placed inside the fitting
                during installation can help, but is not practical in all fitting types. Fittings
                that repeatedly develop condensation despite correct IP rating may need to be
                relocated to a less exposed position.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Garden Lighting Repair Costs — 2026 Prices',
    content: (
      <>
        <p>
          The cost of repairing garden lighting depends heavily on whether the fault is in the
          luminaire, the transformer, or the underground cable. Here are typical UK costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer replacement (plug-in)</strong> — £20 to £80 for the part. DIY
                replacement is possible for plug-in units. No electrician required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer replacement (hard-wired)</strong> — £80 to £200 all-in.
                Transformer £30 to £80, labour £50 to £120. A Minor Works Certificate must be
                issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire replacement</strong> — £20 to £150 per fitting depending on type
                and quality. Lamp replacements for LED fittings are typically £5 to £25 per lamp.
                Labour for fitting replacement is £30 to £60 per fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cable repair</strong> — £150 to £400 for a simple repair.
                Excavating to find and repair a cable fault, fitting an underground junction box,
                and reinstating the ground. Longer cable runs or deep excavation cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD installation on existing circuit</strong> — £80 to £200. Adding RCD
                protection to an existing outdoor circuit, including an RCBO or RCD at the consumer
                unit. Notifiable work under Part P — a Minor Works Certificate must be issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New outdoor lighting circuit</strong> — £300 to £700 from consumer unit to
                garden positions. Includes armoured cable, consumer unit connection, RCD protection,
                and Electrical Installation Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garden Lighting Work',
    content: (
      <>
        <p>
          Garden lighting installation is notifiable work under Part P of the Building Regulations
          in England and Wales when it involves a new circuit or significant modification to an
          existing circuit. Work in a garden is included in the scope of Part P. Electricians
          registered with NICEIC, NAPIT, or ELECSA can self-certify outdoor electrical work and
          issue the relevant certificate on completion.
        </p>
        <p>Key BS 7671 requirements to verify on any outdoor lighting installation:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>30mA RCD protection on the outdoor circuit (Regulation 411.3.3)</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Appropriate IP rating on all fittings for their installed location</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Underground cable at correct depth — SWA or cable in protective conduit with warning
                tape above
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Cable route records provided to customer (sketch or photograph showing cable routes)
                to prevent future accidental damage
              </span>
            </li>
          </ul>
        </div>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Elec-Mate Minor Works Certificate app
                  </SEOInternalLink>{' '}
                  or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue the certificate before leaving the garden. PDF to the
                  customer, copy in your records — no evening paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete outdoor electrical certificates on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site Minor Works certificates, EICs, and instant quoting. No evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GardenLightingFaultFindingPage() {
  return (
    <GuideTemplate
      title="Garden Lighting Not Working | Outdoor Electrical Fault Finding"
      description="Garden lighting fault finding guide for UK homeowners and electricians. RCD protection requirements, IP ratings, cable damage, transformer faults, waterproofing issues, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Garden Lighting Not Working:{' '}
          <span className="text-yellow-400">Outdoor Electrical Fault Finding</span>
        </>
      }
      heroSubtitle="Complete fault finding guide for garden and outdoor lighting — RCD protection requirements under BS 7671, IP ratings explained, RCD tripping diagnosis, cable damage, transformer faults, waterproofing failures, and typical repair costs for 2026."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Garden Lighting Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Outdoor Electrical Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Minor Works certificates, EICs, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
