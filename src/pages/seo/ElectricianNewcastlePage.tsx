import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Users,
  Building2,
  Home,
  Thermometer,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Newcastle', href: '/guides/electrician-newcastle' },
];

const tocItems = [
  { id: 'overview', label: 'Newcastle Overview' },
  { id: 'dno', label: 'Northern Powergrid' },
  { id: 'tyneside-flats', label: 'Tyneside Flat Conversions' },
  { id: 'quayside', label: 'Quayside Regeneration' },
  { id: 'ev-cold-climate', label: 'Cold Climate EV Charging' },
  { id: 'hmos', label: 'Student HMOs' },
  { id: 'pricing', label: 'Electrician Rates in Newcastle' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Northern Powergrid is the Distribution Network Operator for Newcastle and the North East. All new connections, capacity upgrades, and generation notifications go through Northern Powergrid.',
  'Tyneside flats are a property type unique to the North East — a pair of flats arranged one above the other in what appears to be a single terraced house. Electrical work in Tyneside flats requires understanding the shared services, separate supplies, and access challenges specific to this property type.',
  'The Quayside and Ouseburn Valley regeneration continues to generate demand for commercial and high-specification residential electrical work, from restaurant fit-outs to luxury apartment installations.',
  'Newcastle experiences colder winters than southern England, with more frost days and lower average temperatures. This affects EV charger installations — cable sizing for outdoor circuits, charger location to minimise ice exposure, and customer advice on cold weather charging performance.',
  'Newcastle and Northumbria universities have a combined student population of over 50,000, driving one of the largest student HMO markets in the UK. Jesmond, Heaton, and Sandyford are the primary HMO areas with high demand for EICRs and fire alarm work.',
];

const faqs = [
  {
    question: 'Who is the DNO for Newcastle?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Newcastle upon Tyne and the wider North East region, covering from the Scottish border to North Yorkshire. For new connections, capacity upgrades, generation connections (solar PV, battery storage), and EV charger notifications, you deal with Northern Powergrid. Their connections portal handles standard domestic applications. G98 notifications for small-scale generation are processed quickly. G99 applications for larger systems require prior approval — processing times vary from 6 to 12 weeks depending on network capacity. Northern Powergrid are generally responsive and have invested heavily in network capacity for the low carbon transition.',
  },
  {
    question: 'What is a Tyneside flat and why does it matter for electrical work?',
    answer:
      'A Tyneside flat is a property type almost unique to Newcastle and the wider Tyneside area. From the outside, it looks like a standard terraced house, but internally it is divided into two flats — a ground floor flat and an upper floor flat — each with its own front door (typically side by side). The flats share a party wall/floor but have separate services. For electricians, the key considerations are: separate electricity supplies (each flat has its own meter and consumer unit), shared structure (the party floor means cable routes between floors are restricted), separate earthing arrangements (each flat may have a different earthing type), and access difficulties (reaching the upper flat wiring from the ground floor, or vice versa, requires working through the party floor). Rewiring a Tyneside flat requires careful planning of cable routes within the flat boundary.',
  },
  {
    question: 'How much does an electrician charge in Newcastle?',
    answer:
      'Newcastle electrician rates in 2026 typically range from £38 to £52 per hour for a qualified, registered electrician. Day rates range from £250 to £370 for a sole trader and £340 to £470 for a firm. Emergency call-out rates are £65 to £95 per hour with a minimum charge of £85 to £140. Common fixed-price jobs: consumer unit replacement £520 to £900, single socket addition £95 to £150, full house rewire (3-bed terraced) £3,500 to £5,500, Tyneside flat rewire £2,800 to £4,500, EICR £170 to £280, EV charger installation £700 to £1,150. Newcastle rates are lower than southern cities but the cost of living is proportionally lower, maintaining good profit margins.',
  },
  {
    question: 'Does cold weather affect EV charger installations in Newcastle?',
    answer:
      'Newcastle experiences colder winters than southern England, with average January temperatures of 3 to 4 degrees Celsius and regular frost. This affects EV charger installations in several ways: outdoor cable routes must use cables rated for the expected temperature range (SWA cable is the standard choice for external runs and is suitable for North East temperatures), the charger unit should be positioned to minimise exposure to standing water and ice (avoid locations where meltwater pools), cable sizing should account for the lower ambient temperature correction factors (Ci in BS 7671 Table 4B1 — lower temperatures actually improve current-carrying capacity, so this works in your favour), and customers should be advised that EV battery charging performance decreases in very cold weather, which is a vehicle limitation not an installation issue. IP65 or higher rated chargers are recommended for exposed locations in the North East.',
  },
  {
    question: 'What HMO regulations apply in Newcastle?',
    answer:
      'Newcastle City Council operates mandatory HMO licensing for properties with 5 or more occupants from 2 or more households, plus additional licensing in specific wards. The Jesmond, Heaton, and Sandyford areas have particularly high concentrations of HMOs due to the proximity of Newcastle and Northumbria universities. HMO licensing requires: a satisfactory EICR (no C1 or C2 codes, renewed every 5 years), fire detection to BS 5839-6 (Grade D LD2 minimum), emergency lighting on escape routes, and adequate socket provision. Newcastle Council has increased enforcement in recent years, with dedicated officers conducting scheduled and unscheduled inspections. Building relationships with Jesmond and Heaton letting agents is one of the most reliable sources of work for Newcastle electricians.',
  },
  {
    question: 'Is there demand for renewable energy electrical work in Newcastle?',
    answer:
      'Demand for renewable energy electrical work in Newcastle is growing, driven by the North East Local Enterprise Partnership green economy strategy and government incentives. Solar PV installations are less productive in Newcastle than in southern England (approximately 900 kWh/m per year compared to 1,100 kWh/m in the south), but are still financially viable with battery storage and time-of-use tariffs. Air source heat pump installations are increasing, requiring dedicated electrical circuits and often consumer unit upgrades. The North East has strong manufacturing and engineering heritage, and regional supply chains for renewable energy components are well-established. Newcastle City Council Net Zero Newcastle 2030 strategy is also driving public sector and commercial demand.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for Newcastle domestic and commercial work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Newcastle rental properties, Tyneside flat inspections, and HMO licensing compliance.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Tyneside flat rewires, EV charger circuits, and commercial fit-out installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Newcastle — cold climate considerations and Northern Powergrid notifications.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote Tyneside flat rewires, student HMO compliance, and quayside commercial fit-outs with confidence.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — essential for the Newcastle HMO and landlord certification market.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician in Newcastle: What You Need to Know',
    content: (
      <>
        <p>
          Newcastle upon Tyne is the North East's largest city and a major centre for electrical
          work. The city's distinctive property stock — including Tyneside flats found almost
          nowhere else in the UK — combined with a large student population, active quayside
          regeneration, and growing demand for low-carbon installations creates a strong and varied
          market for electricians.
        </p>
        <p>
          Newcastle electricians benefit from lower operating costs than their southern counterparts
          (cheaper premises, lower parking costs, shorter travel times across the city) while
          maintaining strong demand across domestic, commercial, and landlord compliance sectors.
          The city's two universities drive one of the UK's largest student HMO markets, creating
          predictable, recurring work.
        </p>
        <p>
          This guide covers the DNO details, Tyneside flat challenges, quayside regeneration
          opportunities, cold climate EV charging considerations, HMO requirements, pricing, and
          practical advice for electricians working in Newcastle.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Northern Powergrid: Newcastle DNO',
    content: (
      <>
        <p>
          <strong>Northern Powergrid</strong> is the DNO for Newcastle and the wider North East
          region, covering an area from the Scottish border to North Yorkshire and from the coast to
          the Pennines.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — new supplies, capacity upgrades (for
                EV chargers, heat pumps, or commercial loads), and service cable replacements go
                through the Northern Powergrid connections portal. Standard domestic connections
                typically take 4 to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — solar PV, battery storage, and other
                generation must be notified to Northern Powergrid. G98 (up to 16A per phase) is a
                straightforward notification. G99 for larger systems requires prior approval.
                Northern Powergrid have invested heavily in network monitoring and are generally
                responsive to connection applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — Newcastle properties are predominantly
                TN-C-S (PME) in newer areas and TN-S in older areas. Some Victorian properties still
                rely on lead water pipe earthing — always verify. Northern Powergrid can confirm the
                earthing arrangement at the supply point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tyneside flat supplies</strong> — Tyneside flats typically have two separate
                SPEN supplies in what appears to be a single terraced house. Each flat has its own
                meter and cut-out. When working on Tyneside flats, confirm which supply serves which
                flat — mislabelling is common, particularly in properties that have been modified
                over the years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tyneside-flats',
    heading: 'Tyneside Flat Conversions: A North East Speciality',
    content: (
      <>
        <p>
          Tyneside flats are a property type almost unique to Newcastle and the surrounding Tyneside
          area (Gateshead, North Shields, South Shields, Wallsend). Built between 1860 and 1930,
          they represent a significant proportion of the housing stock in Jesmond, Heaton,
          Sandyford, Fenham, Benwell, and Byker.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Layout</strong> — from the street, a Tyneside flat looks like a standard
                terraced house with two front doors. Inside, the ground floor flat occupies the
                entire ground floor, and the upper flat occupies the entire upper floor. Each flat
                has its own front door (typically side by side on the front elevation), its own
                electricity supply, and its own gas meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical challenges</strong> — the party floor between the two flats
                restricts cable routing between floors. Rewiring a ground floor flat means all
                cables must be routed at ground floor level — no dropping cables from above. Upper
                flat rewires require all cable routes within the upper floor structure. This often
                means longer cable runs, more surface-mounted sections, and creative use of floor
                voids where they exist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit location</strong> — in ground floor flats, the consumer unit
                is typically near the front door in the hallway. Upper floor flats may have the
                consumer unit on the landing or in a hallway cupboard. Access to the consumer unit
                from outside is important for emergency isolation — ensure the tenant knows where it
                is.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pricing</strong> — a Tyneside flat rewire typically costs less than a full
                house rewire because there is only one floor, but the restricted cable routes and
                access difficulties mean it takes longer per square metre than an equivalent area in
                a standard house. Budget £2,800 to £4,500 for a 2-bedroom Tyneside flat rewire.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding Tyneside flats is essential for any electrician working in Newcastle. If you
          are new to the area, spend time familiarising yourself with the typical layouts and cable
          route options before quoting your first Tyneside flat rewire.
        </p>
      </>
    ),
  },
  {
    id: 'quayside',
    heading: 'Quayside and Ouseburn Regeneration',
    content: (
      <>
        <p>
          Newcastle's Quayside and the adjacent Ouseburn Valley have been transformed over the past
          two decades from industrial dockland into a vibrant mixed-use area. The regeneration
          continues with new developments and conversions:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Quayside Apartments</h3>
            <p className="text-white text-sm leading-relaxed">
              High-specification riverside apartments in developments along the Quayside. Electrical
              work includes smart home installations, underfloor heating controls, high-end lighting
              design, and EV charging in basement car parks. The customer demographic expects
              premium finishes and professional service. Typical apartment fit-out value: £3,000 to
              £8,000 for the electrical package.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ouseburn Valley</h3>
            <p className="text-white text-sm leading-relaxed">
              Former industrial buildings converted to creative workspaces, studios, bars,
              restaurants, and apartments. The conversion work involves installing new electrical
              systems within existing industrial building shells — three-phase supplies, commercial
              distribution, and mixed-use metering arrangements. The area continues to attract
              investment and new conversions.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Stephenson Quarter</h3>
            <p className="text-white text-sm leading-relaxed">
              The area around the Central Station and Stephenson Quarter has seen significant hotel,
              office, and residential development. Commercial electrical work in this area includes
              office fit-outs, hotel installations, and retail units. Three-phase commercial
              installations with modern building management systems.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">East Pilgrim Street</h3>
            <p className="text-white text-sm leading-relaxed">
              A major city centre redevelopment site with plans for offices, residential, retail,
              and public spaces. This multi-phase development will generate electrical work for
              years to come. Getting involved early with the main contractors creates long-term
              opportunities.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ev-cold-climate',
    heading: 'Cold Climate EV Charging Considerations',
    content: (
      <>
        <p>
          Newcastle's climate is noticeably colder than southern England, with more frost days,
          lower average temperatures, and occasional heavy snow. This has practical implications for{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charger installations
          </SEOInternalLink>
          :
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger location</strong> — position the charger to minimise exposure to
                standing water and ice. Avoid locations where meltwater from roofs or drainpipes
                pools around the unit. A sheltered wall-mounted position under eaves or a carport is
                ideal. Ensure the charging cable does not create a trip hazard when laid across icy
                or wet surfaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable specification</strong> — SWA (Steel Wire Armoured) cable is the
                standard choice for external runs and is rated for the temperature range experienced
                in the North East. For underground runs, bury to at least 500mm depth (600mm under
                driveways) to protect against frost heave. Use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to verify the cable size with the appropriate correction factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating</strong> — specify IP65 or higher rated chargers for exposed
                locations in Newcastle. IP65 provides protection against water jets from any
                direction, which covers driving rain, snow melt, and pressure washing of driveways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer advice</strong> — advise customers that EV battery charging
                performance decreases in very cold weather — the battery management system limits
                charging speed to protect the battery. This is a vehicle limitation, not an
                installation issue, but customers should be aware. Pre-conditioning the vehicle
                while still plugged in helps.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The temperature correction factors in BS 7671 (Table 4B1) actually work in your favour in
          colder climates — lower ambient temperatures improve cable current-carrying capacity.
          However, the practical challenges of working outdoors in North East winters (shorter
          daylight hours, cold hands, frozen ground for cable burial) should be factored into
          programming and pricing.
        </p>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'Student HMOs in Newcastle',
    content: (
      <>
        <p>
          Newcastle has two major universities — Newcastle University and Northumbria University —
          with a combined student population exceeding 50,000. This drives one of the largest
          student HMO markets in the UK, concentrated in Jesmond, Heaton, Sandyford, and parts of
          Fenham.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Newcastle City Council operates mandatory HMO
                licensing for properties with 5+ occupants from 2+ households. The Jesmond and
                Sandyford areas have some of the highest HMO densities in England. The council has a
                dedicated HMO enforcement team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirements</strong> — a satisfactory{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is required
                for HMO licensing (no C1 or C2 codes, renewed every 5 years). Many Jesmond and
                Heaton HMOs are in Tyneside flats, which adds the unique cable routing and access
                challenges described above. Budget additional time for Tyneside flat EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection</strong> — HMOs require fire detection to BS 5839-6. Most
                Newcastle HMOs require Grade D LD2 minimum. The council expects mains-powered,
                interconnected smoke alarms in escape routes and principal habitable rooms, with
                heat detectors in kitchens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turnaround timing</strong> — the student letting cycle in Newcastle means
                most properties turn over in late June to early July. Landlords need EICRs, fire
                alarm checks, and any remedial work completed before new tenants move in. This
                creates a concentrated period of high demand — plan your schedule accordingly and
                start booking HMO work from April.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Jesmond and Heaton letting agent community is tight-knit. Building relationships with
          key agents creates a reliable pipeline of annual EICR, fire alarm testing, and remedial
          work that forms a solid foundation for a Newcastle electrical business.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Newcastle (2026)',
    content: (
      <>
        <p>
          Newcastle electrician rates are competitive, reflecting the lower cost of living in the
          North East compared to southern England. However, the strong demand from the student HMO
          market, quayside regeneration, and growing renewable energy sector supports healthy rates.
          Typical rates in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£38 — £52</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£250 — £370</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£340 — £470</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £95/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£520 — £900</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£95 — £150</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed terraced)</span>
                  <span className="font-semibold">£3,500 — £5,500</span>
                </li>
                <li className="flex justify-between">
                  <span>Tyneside flat rewire</span>
                  <span className="font-semibold">£2,800 — £4,500</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£170 — £280</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,150</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Quayside commercial and high-specification residential work commands higher rates — day
          rates of £380 to £500 are achievable for quality commercial work. Volume HMO EICR work can
          be priced at £140 to £200 per unit when servicing a landlord portfolio, with the volume
          making up for the lower per-unit rate.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Newcastle',
    content: (
      <>
        <p>
          Newcastle is a rewarding city for electricians. The lower operating costs, strong HMO
          market, quayside regeneration, and unique Tyneside flat work create a diverse and
          profitable practice. Electricians who master Tyneside flat rewires and build HMO landlord
          relationships have a reliable income foundation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site with AI-assisted board scanning. Batch Tyneside flat and HMO inspections
                  efficiently — complete the EICR on your phone and email to the landlord from site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Tyneside Flats</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  for Tyneside flat rewires where restricted cable routes mean longer runs. Verify
                  voltage drop on circuits routed around party floors. Get the cable size right at
                  the survey stage.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price Newcastle jobs accurately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . From Tyneside flat rewires to quayside commercial fit-outs, itemise materials,
                  labour, testing, and certification. Professional PDF quotes build confidence with
                  landlords and commercial clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Newcastle electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for Tyneside flats, HMO compliance, and North East working conditions. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianNewcastlePage() {
  return (
    <GuideTemplate
      title="Electrician in Newcastle | Local Electricians 2026"
      description="Find qualified electricians in Newcastle. Northern Powergrid DNO, Tyneside flat conversions, quayside regeneration, cold climate EV charging, student HMOs, and local electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Newcastle"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Newcastle: <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Newcastle's unique Tyneside flats, thriving quayside regeneration, massive student HMO market, and cold climate challenges make it a distinctive and rewarding city for electricians who know the local landscape."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Newcastle Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for Tyneside flats, HMO compliance, and North East conditions. 7-day free trial."
    />
  );
}
