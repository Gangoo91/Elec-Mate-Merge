import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  FileCheck2,
  ShieldCheck,
  Zap,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  AlertTriangle,
  Brain,
  Layers,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 18th Edition Guide 2026 | Wiring Regulations UK';
const PAGE_DESCRIPTION =
  'Complete guide to BS 7671:2018 — the 18th Edition IET Wiring Regulations. All 7 parts explained, key changes from 17th Edition, Amendment 2 (2022), Amendment 3 (2024) including Regulation 530.3.201, and expected Amendment 4. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'BS 7671 18th Edition', href: '/guides/bs-7671-18th-edition-guide' },
];

const tocItems = [
  { id: 'what-is-bs7671', label: 'What Is BS 7671?' },
  { id: 'seven-parts', label: 'The 7 Parts' },
  { id: 'changes-from-17th', label: 'Changes from 17th Edition' },
  { id: 'amendment-2', label: 'Amendment 2 (2022)' },
  { id: 'amendment-3', label: 'Amendment 3 (2024)' },
  { id: 'amendment-4', label: 'Amendment 4 (2026)' },
  { id: 'daily-practice', label: 'BS 7671 in Daily Practice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A2:2022 is the current base standard (the "brown book") — all new electrical work in the UK must comply.',
  'Amendment 3 (A3:2024), issued 31 July 2024, adds Regulation 530.3.201 covering bidirectional and unidirectional protective devices for battery storage and V2G installations.',
  'The 18th Edition introduced major changes including AFDDs (Regulation 421.1.7), surge protection (Section 534), metal consumer unit requirements, and EV charging provisions (Section 722).',
  'Amendment 4 is expected in 2026 and will likely address evolving requirements for energy storage, smart grid integration, and prosumer installations.',
  'Elec-Mate has every BS 7671 regulation built into the app — tap any certificate field to see the relevant clause, with 70+ calculators based on BS 7671 tables.',
];

const faqs = [
  {
    question: 'What is the difference between BS 7671 and the IET Wiring Regulations?',
    answer:
      'They are the same document. BS 7671 is the British Standard number assigned by the British Standards Institution (BSI). The IET Wiring Regulations is the common name used by the Institution of Engineering and Technology (IET), which publishes the standard jointly with BSI. The full title is "BS 7671:2018+A2:2022 Requirements for Electrical Installations — IET Wiring Regulations, Eighteenth Edition." Electricians, training providers, and competent person schemes use both names interchangeably. The physical book has a brown cover, which is why it is colloquially known as the "brown book." When someone refers to the 18th Edition, the Wiring Regs, BS 7671, or the brown book, they are all talking about the same standard.',
  },
  {
    question: 'Is BS 7671 a legal requirement?',
    answer:
      'BS 7671 is not itself a law — it is a British Standard. However, it is referenced by laws and regulations that ARE legally enforceable. The Electricity at Work Regulations 1989 require all electrical systems to be constructed and maintained to prevent danger. The Building Regulations 2010 (Part P in England) require electrical installations in dwellings to be designed and installed to protect persons from fire and electric shock. Approved Document P specifically references BS 7671 as the means of demonstrating compliance. In practice, compliance with BS 7671 is the universally accepted way to demonstrate that electrical work meets the legal requirements. A court or enforcement body would expect an electrician to demonstrate compliance with BS 7671 as evidence that their work is safe. Failure to comply does not automatically constitute a criminal offence, but it would be extremely difficult to defend work that departs from the standard without a compelling technical justification.',
  },
  {
    question: 'What changed between the 17th and 18th Edition of BS 7671?',
    answer:
      'The 18th Edition (BS 7671:2018) replaced the 17th Edition on 1 January 2019. The major changes include: (1) New requirements for Arc Fault Detection Devices (AFDDs) in Regulation 421.1.7, recommended for specific higher-risk installations. (2) Significantly expanded surge protection requirements in Section 534, requiring a risk assessment and, in many cases, installation of Type 2 SPDs. (3) A new Section 722 for Electric Vehicle Charging Installations, covering cable sizing, protection, and earthing for EV charge points. (4) Metal consumer unit enclosure requirements (Regulation 421.1.201) carried forward from Amendment 3 to the 17th Edition. (5) Updated requirements for energy efficiency in Part 8 (Section 801 to 805), addressing metering, power factor, and switching. (6) Revised RCD requirements, with Type A (or better) required for circuits likely to produce DC residual currents. (7) Strengthened requirements for installations in locations containing a bath or shower (Section 701). The 18th Edition is a substantially different document from the 17th Edition and electricians were given a one-year transition period to adopt it.',
  },
  {
    question: 'Do I need to buy a new copy of BS 7671 for each amendment?',
    answer:
      'Not necessarily. Amendment 1 (2020) and Amendment 2 (2022) were incorporated into reprints of the main publication, so the current standard book sold by the IET is BS 7671:2018+A2:2022 and includes both amendments. Amendment 3 (A3:2024) was issued as a free PDF supplement on 31 July 2024 and is not printed as a separate book — you download it from the IET website and use it alongside your existing copy. The IET may issue an updated consolidated reprint in due course. Elec-Mate includes all current regulation text within the app, including Amendment 3, so you always have the current version in your pocket without needing to carry the physical book on site.',
  },
  {
    question: 'What qualifications do I need to work to BS 7671?',
    answer:
      'There is no single mandatory qualification, but the industry standard is the City and Guilds 2382-22 (or the older 2382-18) qualification, which is the 18th Edition IET Wiring Regulations exam. This is a theory-based qualification that demonstrates understanding of the standard. Most competent person scheme providers (NICEIC, NAPIT, ELECSA) require the 2382 as a minimum for registration, alongside practical qualifications such as the NVQ Level 3 in Electrotechnical Services and the City and Guilds 2391 (Inspection and Testing). Apprentices typically study BS 7671 as part of their Level 3 qualification. Qualified electricians must update their qualification each time a new edition is published — the 2382-22 covers the 18th Edition including amendments.',
  },
  {
    question: 'How often is BS 7671 updated?',
    answer:
      'Major new editions of BS 7671 are published approximately every 10 years. The 16th Edition was published in 2001, the 17th Edition in 2008, and the 18th Edition in 2018. Between editions, amendments are issued to address urgent changes, new technologies, or corrections. The 18th Edition has had three amendments so far: Amendment 1 (2020), Amendment 2 (2022), and Amendment 3 (2024). Amendment 4 is expected in 2026. The next full new edition (the 19th Edition) would typically be expected around 2028, but the IET has not confirmed a date. Each amendment requires electricians to update their knowledge and potentially their qualifications.',
  },
  {
    question: 'What is Regulation 530.3.201 introduced by Amendment 3?',
    answer:
      'Regulation 530.3.201 was introduced by Amendment 3 (A3:2024), issued on 31 July 2024. It addresses the requirements for bidirectional and unidirectional protective devices in installations where the supply can operate in both directions — specifically, installations with battery energy storage systems (BESS), solar PV with battery backup, or vehicle-to-grid (V2G) EV chargers that can export energy back to the grid. Standard MCBs and RCDs are typically designed for unidirectional fault current flow. When energy can flow in reverse (from the battery or EV back through the consumer unit to the grid), fault current can also flow in reverse. Regulation 530.3.201 requires that the protective devices installed are suitable for the direction(s) of fault current that can occur. This may require bidirectional MCBs, bidirectional RCDs, or specific arrangements to ensure that unidirectional devices are not subjected to reverse fault currents they cannot safely interrupt.',
  },
];

const sections = [
  {
    id: 'what-is-bs7671',
    heading: 'What Is BS 7671?',
    content: (
      <>
        <p>
          BS 7671 is the British Standard that sets out the requirements for the design, erection,
          and verification of electrical installations in the United Kingdom. Published jointly by
          the British Standards Institution (BSI) and the Institution of Engineering and Technology
          (IET), it is the single most important document for every working electrician in the UK.
          The current edition is BS 7671:2018+A2:2022 — the 18th Edition of the IET Wiring
          Regulations — commonly known as the "brown book."
        </p>
        <p>
          The standard applies to all electrical installations operating at nominal voltages up to
          and including 1000 V AC or 1500 V DC. This covers virtually every domestic, commercial,
          and light industrial installation in the country — from a single socket outlet in a flat
          to a complete rewire of a hospital. It does not cover certain specialist installations
          such as mines, quarries, explosive atmospheres, or high-voltage distribution systems,
          which are covered by separate regulations.
        </p>
        <p>
          BS 7671 is not a textbook or a how-to guide. It is a set of requirements — minimum
          standards that must be met for an installation to be considered safe. The companion
          documents — the IET Guidance Notes (GN1 through GN8), the On-Site Guide, and the
          Electrician's Guide — provide the practical interpretation and worked examples that help
          electricians apply the regulations on site. The most commonly referenced companion is{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            Guidance Note 3 (GN3): Inspection and Testing
          </SEOInternalLink>
          , now in its 9th Edition.
        </p>
        <SEOAppBridge
          title="Every BS 7671 regulation in your pocket"
          description="Elec-Mate has auto BS 7671 regs built into every certificate. Tap any field and see the relevant regulation — clause number, full text, and practical guidance. No more carrying the brown book on site."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'seven-parts',
    heading: 'The 7 Parts of BS 7671',
    content: (
      <>
        <p>
          BS 7671 is structured into seven parts, each covering a distinct area of electrical
          installation design and practice. Understanding this structure is essential for navigating
          the standard efficiently — whether you are looking up a specific regulation, studying for
          the 2382 exam, or checking compliance on site.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Part 1: Scope, Object, and Fundamental Principles
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Defines the scope of the standard — what types of installations it covers and what it
              does not. Sets out the fundamental principles of electrical safety: protection against
              electric shock, protection against thermal effects, protection against overcurrent,
              protection against fault current, and protection against overvoltage. This part is the
              foundation upon which every other regulation is built.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Part 2: Definitions</h3>
            <p className="text-white text-sm leading-relaxed">
              Contains all the defined terms used throughout the standard. Understanding these
              definitions is critical because many terms have specific technical meanings that
              differ from everyday usage. For example, "extraneous-conductive-part" has a precise
              definition that determines whether bonding is required. "Skilled person," "instructed
              person," and "ordinary person" have specific meanings that affect the level of
              protection required. Part 2 is frequently tested in the 2382 exam.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Part 3: Assessment of General Characteristics
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Requires the designer to assess the characteristics of the installation before
              starting the design. This includes the purpose of the installation, the supply
              characteristics (earthing system, supply voltage, prospective fault current), the
              nature of the demand, the environmental conditions, and compatibility with other
              systems. Part 3 is where the design process starts — you cannot size cables, select
              protective devices, or design earthing arrangements without first assessing the
              general characteristics.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Part 4: Protection for Safety</h3>
            <p className="text-white text-sm leading-relaxed">
              The largest and most frequently referenced part. Covers protection against electric
              shock (Chapter 41), protection against thermal effects (Chapter 42), protection
              against overcurrent (Chapter 43), protection against electromagnetic and voltage
              disturbances (Chapter 44). Chapter 41 alone contains the regulations for automatic
              disconnection of supply (ADS), including maximum disconnection times, RCD
              requirements, and earth fault loop impedance limits — the regulations electricians use
              most often on site.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Part 5: Selection and Erection of Equipment
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Covers the practical selection and installation of equipment — wiring systems (Chapter
              52), switching devices (Chapter 53), earthing arrangements and protective conductors
              (Chapter 54), other equipment (Chapter 55), and safety services (Chapter 56). This is
              where you find the regulations for cable selection, installation methods, minimum
              conductor sizes, and equipment ratings. Amendment 3's Regulation 530.3.201 on
              bidirectional devices sits in this part.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Part 6: Inspection and Testing</h3>
            <p className="text-white text-sm leading-relaxed">
              Sets out the requirements for{' '}
              <SEOInternalLink href="/guides/testing-sequence-guide">
                initial verification and periodic inspection and testing
              </SEOInternalLink>
              . Specifies which tests must be carried out, in what order, and what the pass/fail
              criteria are. Table 61 (insulation resistance minimum values) and the Zs tables for
              maximum earth fault loop impedance are in this part. Part 6 is the legal basis for
              every{' '}
              <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                electrical certificate
              </SEOInternalLink>{' '}
              issued in the UK.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Part 7: Special Installations or Locations
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Contains additional or modified requirements for specific types of installation or
              location where the risk of electric shock or fire is increased. Sections include:
              bathrooms (701), swimming pools (702), saunas (703), construction sites (704),
              agricultural premises (705), restrictive conductive locations (706), solar PV (712),
              EV charging (722), exhibitions (711), marinas (709), and more. Where a Part 7 section
              applies, its requirements supplement or modify the general requirements in Parts 1 to
              6. Part 7 is often tested in the 2382 exam because it contains many specific,
              memorable requirements.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="2,000+ practice questions covering all 7 parts"
          description="Elec-Mate's 18th Edition course covers every part of BS 7671 with practice questions mapped to the City and Guilds 2382-22 exam syllabus. AI study assistant explains any regulation in plain English."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'changes-from-17th',
    heading: 'Key Changes from the 17th Edition',
    content: (
      <>
        <p>
          The 18th Edition (BS 7671:2018) came into effect on 1 January 2019, replacing the 17th
          Edition (BS 7671:2008+A3:2015). Electricians had a one-year transition period during which
          both editions were accepted. The 18th Edition introduced several significant changes that
          affect day-to-day practice.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Arc Fault Detection Devices (Regulation 421.1.7)
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The 18th Edition introduced a recommendation (not a mandatory requirement) for
                  AFDDs in certain higher-risk locations — specifically, premises with sleeping
                  accommodation where particular risks of fire exist (such as locations with
                  combustible building materials, furniture storage, or listed buildings). AFDDs
                  detect dangerous arcing faults that do not trip conventional MCBs or RCDs — for
                  example, a loose connection in a junction box or a damaged cable behind
                  plasterwork. The regulation is worded as a recommendation ("shall be considered")
                  rather than a requirement, giving designers discretion over whether to install
                  AFDDs based on the risk assessment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Surge Protection (Section 534)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Section 534 was significantly expanded in the 18th Edition, requiring a risk
                  assessment for surge protection in all installations. Where the consequences of an
                  overvoltage event would be serious — loss of important data, destruction of
                  valuable equipment, impact on safety services — surge protection devices (SPDs)
                  must be installed. In practice, this means most new domestic installations now
                  include Type 2 SPDs. The cost is modest (typically £30 to £60 for the device plus
                  installation) and the protection is significant.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  EV Charging Installations (Section 722)
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A completely new section dedicated to electric vehicle charging installations,
                  covering cable sizing, protection, earthing, and the specific requirements for
                  different charging modes. Section 722 requires dedicated circuits for EV charge
                  points, appropriate RCD protection (Type A or Type B depending on the charger),
                  and consideration of maximum demand implications. With the growth of EV ownership,
                  this section has become one of the most commercially relevant parts of BS 7671 for
                  domestic electricians.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">RCD Type A Requirement</h3>
                <p className="text-white text-sm leading-relaxed">
                  The 18th Edition strengthened the requirements for RCD types. Regulation 531.3.3
                  now requires Type A RCDs (or better) for circuits supplying equipment likely to
                  produce DC residual currents. This includes circuits serving washing machines,
                  dishwashers, EV chargers, and other equipment with electronic power supplies. Type
                  AC RCDs, which only detect sinusoidal AC fault currents, are no longer sufficient
                  for these circuits. In practice, most manufacturers now supply Type A devices as
                  standard for domestic installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Energy Efficiency (Part 8)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The 18th Edition added Part 8 (Sections 801 to 805), addressing energy efficiency
                  in electrical installations for the first time. This part covers metering, power
                  factor correction, switching for energy management, and general energy efficiency
                  measures. While Part 8 is not as heavily tested or applied as Parts 4 and 5, it
                  reflects the growing importance of energy efficiency in building design and aligns
                  BS 7671 with broader sustainability objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'amendment-2',
    heading: 'Amendment 2 (2022)',
    content: (
      <>
        <p>
          Amendment 2 to BS 7671:2018 was published in March 2022 and came into effect immediately.
          It consolidated Amendment 1 (2020) and introduced additional changes and corrections. The
          current base document is therefore BS 7671:2018+A2:2022, which is the version sold by the
          IET and referenced by competent person schemes.
        </p>
        <p>
          Key changes in Amendment 2 include updated requirements for prosumer installations
          (installations that both consume and generate electrical energy, such as those with solar
          PV and battery storage), clarifications to the requirements for protection against
          transient overvoltages, and various editorial corrections. Amendment 2 also introduced
          revised requirements for the connection of microgeneration systems, ensuring that the
          standard keeps pace with the rapid growth of domestic renewable energy installations.
        </p>
        <p>
          For practising electricians, the most significant practical impact of Amendment 2 was the
          clarification of requirements around{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>{' '}
          design for installations with solar PV and battery storage. The amendment recognised that
          these installations require specific consideration of reverse power flow, anti-islanding
          protection, and the interaction between the DNO supply and the local generation source.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-3',
    heading: 'Amendment 3 (2024) — Regulation 530.3.201',
    content: (
      <>
        <p>
          Amendment 3 to BS 7671:2018 (A3:2024) was issued on 31 July 2024 as a free PDF supplement.
          It is not a new book — it is a concise document that electricians download from the IET
          website and use alongside their existing copy of BS 7671:2018+A2:2022.
        </p>
        <p>
          The headline change in Amendment 3 is the introduction of Regulation 530.3.201, which
          addresses the requirements for bidirectional and unidirectional protective devices. This
          regulation is a direct response to the growth of domestic battery energy storage systems
          (BESS), solar PV installations with battery backup, and vehicle-to-grid (V2G) electric
          vehicle charging — all of which can cause electrical energy to flow in the reverse
          direction, from the installation back through the consumer unit towards the supply.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">What Regulation 530.3.201 requires</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Standard MCBs, RCDs, and RCBOs are designed to interrupt fault current flowing in one
            direction — from the supply, through the device, to the load. When a battery or V2G
            charger exports energy, fault current can flow in the opposite direction. Regulation
            530.3.201 requires that:
          </p>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Where fault current can flow in both directions, the protective devices must be
                suitable for bidirectional operation, or
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The installation must be designed so that unidirectional devices are not subjected
                to reverse fault current they cannot safely interrupt, or
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Additional measures are taken to ensure that the protective device can still provide
                the required level of protection regardless of the direction of energy flow.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Amendment 3 also includes various corrections, clarifications, and editorial updates to
          the standard. It does not change the fundamental structure or numbering of BS 7671 — it is
          a targeted amendment addressing specific technical gaps identified since Amendment 2.
        </p>
        <p>
          For electricians installing solar PV, battery storage, or EV chargers, Amendment 3 is
          essential reading. The requirement for bidirectional protection has implications for
          consumer unit specification, device selection, and circuit design that were not explicitly
          addressed in the earlier amendments.
        </p>
        <SEOAppBridge
          title="70+ calculators built to BS 7671:2018+A3:2024"
          description="Cable sizing, voltage drop, Zs verification, maximum demand, adiabatic equation, prospective fault current — all based on the current BS 7671 tables including Amendment 3 changes. Always up to date."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'amendment-4',
    heading: 'Expected Amendment 4 (2026)',
    content: (
      <>
        <p>
          Amendment 4 to BS 7671:2018 is expected in 2026, although the IET has not confirmed an
          exact publication date. Based on the pattern of previous amendments and the current
          direction of the industry, Amendment 4 is likely to address several emerging areas.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Battery Energy Storage Systems (BESS)</h3>
            <p className="text-white text-sm leading-relaxed">
              Domestic battery storage has grown significantly since the 18th Edition was published.
              While Amendment 3 addressed bidirectional protection, further guidance on battery
              installation, ventilation, fire suppression, and integration with the main
              installation is expected. The fire risks associated with lithium-ion batteries in
              domestic settings are an active area of concern for the fire services and building
              control bodies.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Smart Grid and Demand-Side Response</h3>
            <p className="text-white text-sm leading-relaxed">
              As the UK electricity grid moves towards smarter management of supply and demand,
              electrical installations will increasingly need to support demand-side response,
              time-of-use tariffs, and automated load management. Amendment 4 may introduce
              requirements for installations to be "smart grid ready" — with appropriate metering,
              communication, and control provisions.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">AFDD Requirements</h3>
            <p className="text-white text-sm leading-relaxed">
              The current Regulation 421.1.7 recommends AFDDs but does not mandate them. There is
              ongoing industry discussion about strengthening this to a requirement for specific
              circuit types or building types — particularly in HMOs, care homes, and buildings of
              historical significance where the fire risk is elevated. Amendment 4 may move AFDDs
              from a recommendation to a requirement in defined circumstances.
            </p>
          </div>
        </div>
        <p className="mt-6">
          Until Amendment 4 is published, all new work must comply with BS 7671:2018+A2:2022 with
          the provisions of Amendment 3 (A3:2024). Elec-Mate will be updated promptly when Amendment
          4 is released to ensure all calculators, regulation references, and certificate forms
          reflect the latest requirements.
        </p>
      </>
    ),
  },
  {
    id: 'daily-practice',
    heading: 'How BS 7671 Applies to Your Daily Work',
    content: (
      <>
        <p>
          For a working electrician, BS 7671 is not an abstract academic document — it is the
          reference you use every day when designing circuits, selecting cables, choosing protective
          devices, carrying out tests, and completing certificates. Here is how the key parts of the
          standard map to common on-site activities.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Cable Sizing and Circuit Design</h3>
                <p className="text-white text-sm leading-relaxed">
                  Appendix 4 of BS 7671 contains the current-carrying capacity tables for different
                  cable types and installation methods. You use these tables — combined with
                  correction factors for grouping, ambient temperature, and thermal insulation — to
                  determine the minimum cable size for every circuit. The voltage drop limits in
                  Regulation 525 determine whether the cable is large enough to maintain adequate
                  voltage at the load.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Testing and Certification</h3>
                <p className="text-white text-sm leading-relaxed">
                  Part 6 specifies the{' '}
                  <SEOInternalLink href="/guides/testing-sequence-guide">
                    testing sequence
                  </SEOInternalLink>
                  , the tests required, and the pass/fail criteria. Every test value you record on
                  an{' '}
                  <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                    EIC or EICR
                  </SEOInternalLink>{' '}
                  is compared against the BS 7671 maximum permitted values. The certificate forms
                  themselves are defined in Appendix 6 of the standard.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Protection and Device Selection</h3>
                <p className="text-white text-sm leading-relaxed">
                  Chapters 41, 43, and 53 govern how you select protective devices — MCBs, RCDs,
                  RCBOs, fuses — to provide protection against electric shock, overcurrent, and
                  fault current. The maximum Zs tables tell you whether the device will disconnect
                  within the required time. The adiabatic equation tells you whether the cable can
                  withstand the fault current for the duration of the disconnection time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  <SEOInternalLink href="/guides/bs7671-observation-codes">
                    Observation Codes
                  </SEOInternalLink>{' '}
                  and Condition Reporting
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  When carrying out periodic inspection (EICR), you assess the installation against
                  the current edition of BS 7671. Every departure from the standard, every defect,
                  every deterioration is recorded as an observation with a classification code (C1,
                  C2, C3, or FI). The ability to accurately classify observations against BS 7671 is
                  one of the most critical skills for an inspection and testing electrician.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Tap any certificate field, see the BS 7671 regulation"
          description="Elec-Mate links every certificate field to its relevant BS 7671 clause. When you are on site and need to check a regulation, the answer is one tap away. No searching through a 600-page book."
          icon={BookOpen}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/amendment-3-changes',
    title: 'Amendment 3 Changes (A3:2024)',
    description:
      'Detailed breakdown of every change in Amendment 3, including Regulation 530.3.201.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382-22 exam with 2,000+ practice questions and AI study assistant.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'Complete guide to C1, C2, C3, and FI classification codes for EICR reports.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing per GN3 and BS 7671.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'How Part P interacts with BS 7671 — notifiable work, competent person schemes.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Metal CU requirements, RCD protection, RCBO selection, and SPD requirements.',
    icon: Layers,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS7671EighteenthEditionGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Hub"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          BS 7671: 18th Edition <span className="text-yellow-400">Wiring Regulations Guide</span>
        </>
      }
      heroSubtitle="The complete guide to BS 7671:2018 — the 18th Edition of the IET Wiring Regulations. All 7 parts explained, key changes from the 17th Edition, Amendment 2 (2022), Amendment 3 (2024) including Regulation 530.3.201 for bidirectional devices, and what to expect from Amendment 4 in 2026."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Every BS 7671 regulation, always in your pocket"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site regulation references, 70+ calculators, and 8 certificate types — all built to BS 7671:2018+A3:2024. 7-day free trial, cancel anytime."
    />
  );
}
