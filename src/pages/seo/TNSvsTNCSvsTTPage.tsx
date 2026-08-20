import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  Calculator,
  FileCheck2,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — cards go edge-to-edge on phones
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableShellCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'whitespace-nowrap px-4 py-3 text-left text-[13px] font-bold text-white';
const tdCn = 'px-4 py-3 align-top text-[14px] text-white';
const subHeadCn = 'mb-3 text-[15px] font-semibold tracking-tight text-white';
const footnoteCn = 'px-4 py-3 text-[12.5px] leading-relaxed text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Earthing Systems', href: '/guides/earthing-systems-tns-tncs-tt-explained' },
];

const tocItems = [
  { id: 'overview', label: 'The Three Systems at a Glance' },
  { id: 'tns', label: 'TN-S System' },
  { id: 'tncs', label: 'TN-C-S System (PME)' },
  { id: 'tt', label: 'TT System' },
  { id: 'zs-differences', label: 'Zs and Disconnection Times' },
  { id: 'pme-risks', label: 'PME Risks and ESQCR Regulation 9' },
  { id: 'identifying-system', label: 'Identifying the Earthing System' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 defines the three systems by where the neutral and protective conductors are separate. TN-S keeps them separate throughout. TN-C-S combines them as a PEN conductor in the supply network and splits them at the installation — the arrangement known as PME. TT has no supply earth at all: the installation earths itself through a local electrode.',
  "TN-C-S (PME) is the most common system in newer UK properties. The distributor's PEN conductor is split into separate neutral and protective conductors at the cut-out. Typical Ze is 0.20Ω to 0.35Ω.",
  'TT systems earth through a local electrode, so Ze is typically 20Ω to 200Ω. BS 7671 Reg 411.5.2 makes an RCD the preferred protective device; an overcurrent device is permitted only where a suitably low Zs is permanently and reliably assured, which a TT installation rarely achieves.',
  'PME carries a specific risk: if the PEN conductor goes open circuit, metalwork connected to the PME earth can rise towards line voltage. Regulation 9 of the Electricity Safety, Quality and Continuity Regulations 2002 governs PME, and Reg 9(4) prohibits the distributor connecting the combined neutral and protective conductor to any metalwork in a caravan or boat.',
  'Identify the system before you start work. Table 41.1 allows 0.4s for a 230V AC final circuit on a TN system but only 0.2s for the same circuit on TT, so the earthing system decides both the protective device and the Zs you have to achieve.',
];

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S earthing systems?',
    answer:
      'BS 7671 defines a TN-S system as one having separate neutral and protective conductors throughout the system — from the transformer star point to the installation. The earth is made at the transformer and a separate protective conductor, often the metal sheath of the supply cable, runs through to the installation. TN-S was common in older UK installations, particularly those supplied by lead-sheathed cables where the lead sheath served as the protective conductor. In a TN-C-S system the neutral and protective functions are combined in a single PEN (Protective Earth and Neutral) conductor in part of the system, which is earthed at multiple points and then split into separate N and PE conductors at the supply intake. That arrangement is PME — Protective Multiple Earthing. TN-C-S is the standard system for most new UK domestic and commercial installations. Note that Regulation 8(4) of the ESQCR 2002 prohibits a consumer combining the neutral and protective functions in a single conductor inside the installation, so the PEN must stop at the origin in both cases.',
  },
  {
    question: 'What is PME and what are the risks?',
    answer:
      "PME (Protective Multiple Earthing) is the common name for the earthing arrangement found in a TN-C-S supply, in which the supply neutral conductor is used to connect the earthing conductor of an installation with Earth. The distributor combines the neutral and protective functions in a PEN conductor and, under ESQCR Regulation 9(2), connects that conductor with earth at multiple points along the network. At the installation the PEN conductor is split into separate neutral and protective conductors at the cut-out. The risk is that if the PEN conductor goes open circuit between the transformer and the installation, the neutral is lost and metalwork connected to the PME earth can rise towards line voltage (230V nominal) relative to true Earth. This is why BS 7671 restricts PME earthing at caravan and camping park socket-outlets (Reg 708.553.1.14), marina socket-outlets (Reg 709.553.1.14) and outdoor EV charging points (Reg 722.411.4.1), and why ESQCR Regulation 9(4) prohibits the distributor connecting the combined conductor to any metalwork in a caravan or boat.",
  },
  {
    question: 'When would a TT earthing system be found?',
    answer:
      'A TT earthing system is found where no metallic earth path is available from the distributor — typically in rural areas supplied by overhead lines with no earth conductor, older rural supplies, agricultural premises, caravan and camping parks, marinas, and some older urban installations. In a TT system the installation earth is provided by a local earth electrode, usually a copper-clad steel rod. Earth fault loop impedance is typically 20Ω to 200Ω because current must return through the general mass of earth, so an overcurrent device cannot normally disconnect in the time required by Table 41.1. BS 7671 Reg 411.5.2 therefore lists an RCD first as the preferred protective device for a TT system, with an overcurrent device permitted only where a suitably low Zs is permanently and reliably assured. Where an RCD is used, Reg 411.5.3 requires Ra x IΔn to be no greater than 50V and disconnection within the time required by Reg 411.3.2.2 or 411.3.2.4.',
  },
  {
    question: 'What are typical Zs values for TN-S, TN-C-S, and TT systems?',
    answer:
      'Earth fault loop impedance varies significantly between the three systems. For TN-C-S (PME), typical Ze is 0.20Ω to 0.35Ω, giving total Zs values well inside the limits for a Type B MCB. For TN-S, Ze is typically 0.35Ω to 0.80Ω. For TT systems Ze is typically 20Ω to 200Ω, so an overcurrent device alone cannot disconnect in time. BS 7671 Reg 411.4.4 (TN) and Reg 411.5.4 (TT) both express the requirement as Zs x Ia no greater than Uo x Cmin, with Cmin given the value 0.95 for a supply provided in accordance with the ESQCR. On that basis the maximum Zs for a 32A Type B MCB is 1.37Ω, as printed in Table 41.3. A TT installation with a Zs of 50Ω cannot meet that, which is why fault protection on TT is provided by an RCD instead. Where an RCD is used, Table 41.5 gives the maximum Zs directly: 1667Ω for a 30mA device, 500Ω for 100mA, 167Ω for 300mA and 100Ω for 500mA.',
  },
  {
    question: 'Can I use a PME earth for an outbuilding, caravan, or marina?',
    answer:
      'Not for the parts BS 7671 singles out. Section 708 covers caravan and camping parks and Reg 708.553.1.14 states that socket-outlet protective conductors shall not be connected to a PME earthing facility. Section 709 covers marinas and Reg 709.553.1.14 states the same for berth socket-outlets, while Reg 709.411.4 records the ESQCR prohibition on connecting a PME earthing facility to any metalwork in a boat. Section 721 covers the installation inside a caravan or motor caravan. Section 722 covers EV charging: Reg 722.411.4.1 states that a PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors unless one of the listed alternatives is used. None of this prevents PME being used for other purposes on the same site — Reg 709.411.4 specifically says it does not preclude PME earthing for the installations of permanent buildings. For agricultural and horticultural premises, Section 705 takes a different line: Reg 705.411.4 prohibits a PEN conductor within the installation, and its NOTE 2 says that unless a metal grid is laid in the floor, using a PME earthing facility as the means of earthing is not recommended.',
  },
  {
    question: 'How do I identify whether a property has TN-S, TN-C-S, or TT earthing?',
    answer:
      'Identification combines visual inspection at the supply intake with measurement. For TN-C-S (PME), look for a conductor linking the cut-out neutral terminal to the main earthing terminal — the earth and the meter neutral originate from the same termination. The distributor will confirm whether the supply is PME. For TN-S, the cut-out has a separate earth terminal, typically connected to the lead sheath of the supply cable or a separate protective conductor, distinct from the neutral. For TT, there is no distributor earth terminal at all and the installation has its own earth electrode connected to the MET. Measure Ze to corroborate what you see: a reading below about 0.8Ω points to a TN system, while a reading in the tens or hundreds of ohms points to TT. Record the system type and the measured Ze on the EIC or EICR.',
  },
  {
    question: 'What do Regulations 8 and 9 of the ESQCR 2002 require for PME?',
    answer:
      "Protective multiple earthing is dealt with by Regulation 9 of the Electricity Safety, Quality and Continuity Regulations 2002, not Regulation 8. Regulation 9(2) requires the distributor to connect the supply neutral conductor with earth at a point no closer to the source than the most remote service line junction, and at such other points as are necessary to prevent, so far as is reasonably practicable, danger arising from the supply neutral conductor becoming open circuit. Regulation 9(4) states that the distributor shall not connect the combined neutral and protective conductor to any metalwork in a caravan or boat. Regulation 8 is the general requirement for connection with earth, and its paragraph 8(4) is the one electricians meet most often: a consumer shall not combine the neutral and protective functions in a single conductor in the consumer's installation. That is the statutory basis for the PEN stopping at the origin, and BS 7671 cites it in the notes to Regulations 543.4.1 and 444.4.3.1.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate cable sizes with earth fault loop impedance checks for TN and TT systems.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record earthing system details, Ze measurements, and MET information on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A4:2026 including earthing and bonding requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection and Testing Course',
    description: 'Study earthing system identification and Ze measurement for C&G 2391.',
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
    heading: 'The Three UK Earthing Systems at a Glance',
    content: (
      <>
        <p>
          Every electrical installation in the UK sits within one of three earthing systems: TN-S,
          TN-C-S (commonly called PME), or TT. The system determines how fault current returns to
          the source, what earth fault loop impedance can be achieved, which protective device can
          provide fault protection, and what additional risks have to be managed.
        </p>
        <div className={tableShellCn}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>System</th>
                  <th className={thCn}>Earth provided by</th>
                  <th className={thCn}>Typical Ze</th>
                  <th className={thCn}>Max disconnection time</th>
                  <th className={thCn}>Fault protection</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className={`${tdCn} font-semibold`}>TN-C-S (PME)</td>
                  <td className={tdCn}>Distributor&apos;s PEN conductor, split at the cut-out</td>
                  <td className={tdCn}>0.20–0.35Ω</td>
                  <td className={tdCn}>0.4s</td>
                  <td className={tdCn}>Overcurrent device (MCB or fuse)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={`${tdCn} font-semibold`}>TN-S</td>
                  <td className={tdCn}>
                    Distributor&apos;s separate protective conductor or cable sheath
                  </td>
                  <td className={tdCn}>0.35–0.80Ω</td>
                  <td className={tdCn}>0.4s</td>
                  <td className={tdCn}>Overcurrent device (MCB or fuse)</td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>TT</td>
                  <td className={tdCn}>The installation&apos;s own earth electrode</td>
                  <td className={tdCn}>20–200Ω</td>
                  <td className={tdCn}>0.2s</td>
                  <td className={tdCn}>RCD preferred (Reg 411.5.2)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${footnoteCn} border-t border-white/10`}>
            Disconnection times are the 230V AC figures from BS 7671 Table 41.1. Regulation 411.3.2.2
            applies them to final circuits rated up to 63A with one or more socket-outlets, and up to
            32A supplying only fixed connected current-using equipment. Ze figures are typical supply
            values, not limits set by BS 7671 — always measure.
          </p>
        </div>
        <p>
          Identifying the system before commencing work is fundamental.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Chapter 41 sets the disconnection times in Table 41.1 and the maximum Zs formulae in
          Regulations 411.4.4 and 411.5.4, and the earthing system decides whether those figures can
          be met with an overcurrent device or whether an RCD is needed. The statutory framework
          sits alongside it in the Electricity Safety, Quality and Continuity Regulations 2002
          (ESQCR), particularly Regulation 9 for PME.
        </p>
      </>
    ),
  },
  {
    id: 'tns',
    heading: 'TN-S Earthing System',
    content: (
      <>
        <p>
          BS 7671 defines a TN-S system as one having separate neutral and protective conductors
          throughout the system — from the transformer star point to the installation. The earth
          connection is made at the transformer, and a dedicated protective conductor, often the
          metal sheath of the supply cable, runs to the installation.
        </p>
        <div className={cardCn}>
          <h3 className={subHeadCn}>What identifies a TN-S supply</h3>
          <ul className="space-y-2 text-[14px] text-white">
            <li>
              Earth provided by the distributor via a separate conductor or the supply cable sheath
            </li>
            <li>Typical Ze 0.35Ω to 0.80Ω, so most circuits clear on the MCB alone</li>
            <li>Maximum disconnection time 0.4s for a 230V AC final circuit (Table 41.1)</li>
            <li>Common in older UK installations and lead-sheathed cable areas</li>
            <li>No open-PEN risk — a lost neutral does not raise the earth potential</li>
            <li>
              A PEN conductor must not continue inside the installation (Reg 543.4.1, and ESQCR Reg
              8(4))
            </li>
          </ul>
        </div>
        <p>
          TN-S supplies are becoming less common as ageing lead-sheathed cable networks are
          replaced. Where the lead sheath is the protective conductor, deterioration of the sheath
          can increase Ze — which is why a measured Ze at the origin, recorded on the EIC or EICR,
          matters more than the value the distributor declares.
        </p>
      </>
    ),
  },
  {
    id: 'tncs',
    heading: 'TN-C-S Earthing System (PME)',
    content: (
      <>
        <p>
          TN-C-S is the standard earthing system for most new UK domestic and commercial
          installations. BS 7671 defines it as a system in which neutral and protective functions
          are combined in a single conductor in part of the system, earthed at multiple points. That
          arrangement is PME — Protective Multiple Earthing. In the supply network the neutral and
          protective functions share one PEN conductor; at the cut-out or meter position the PEN
          conductor is split into separate neutral (N) and protective (PE) conductors for the
          installation.
        </p>
        <div className={cardCn}>
          <h3 className={subHeadCn}>What identifies a TN-C-S (PME) supply</h3>
          <ul className="space-y-2 text-[14px] text-white">
            <li>Earth provided by the distributor&apos;s PEN conductor, split at the cut-out</li>
            <li>Typical Ze 0.20Ω to 0.35Ω — the lowest of the three systems</li>
            <li>Maximum disconnection time 0.4s for a 230V AC final circuit (Table 41.1)</li>
            <li>Most common system in UK properties built from the 1970s onwards</li>
            <li>
              Multiple earth connections along the network (ESQCR Reg 9(2)) strengthen the fault
              path
            </li>
            <li>
              Open-PEN risk: an open-circuit PEN conductor can raise connected metalwork towards
              line voltage
            </li>
          </ul>
        </div>
        <p>
          The multiple earth connections along the distribution network create parallel return paths
          for fault current, which is why PME generally gives a lower Ze than TN-S. It is also the
          reason the open-PEN risk exists at all: the same conductor is carrying load current and
          serving as the earth reference.
        </p>
        <SEOAppBridge
          title="Record earthing system details on your certificates"
          description="Elec-Mate's EIC and EICR certificate apps include fields for earthing system type, Ze measurement, MET details, and supplementary bonding."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'tt',
    heading: 'TT Earthing System',
    content: (
      <>
        <p>
          In a TT system the source is earthed but the exposed-conductive-parts of the installation
          are connected to earth electrodes electrically independent of the source earth. There is
          no metallic earth path back to the transformer, so fault current has to return through the
          general mass of earth. That gives a far higher earth fault loop impedance than either TN
          system.
        </p>
        <div className={cardCn}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div>
              <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
                An overcurrent device will not normally clear a TT earth fault
              </h3>
              <ul className="space-y-2 text-[14px] text-white">
                <li>Typical Ze 20Ω to 200Ω, and higher in dry or rocky ground</li>
                <li>
                  Maximum disconnection time 0.2s for a 230V AC final circuit — half the TN figure
                  (Table 41.1)
                </li>
                <li>
                  Reg 411.5.2 lists an RCD first as the protective device, with an overcurrent
                  device permitted only where a suitably low Zs is permanently and reliably assured
                </li>
                <li>Where an RCD is used, Reg 411.5.3 requires Ra x IΔn ≤ 50V</li>
                <li>No open-PEN risk — a lost supply neutral does not raise the earth potential</li>
                <li>
                  Typical locations: rural overhead supplies, agricultural premises, caravan and
                  camping parks, marinas, some older urban properties
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Reg 411.5.3 sets two conditions where an RCD provides fault protection on a TT system:
          disconnection within the time required by Reg 411.3.2.2 or 411.3.2.4, and Ra x IΔn no
          greater than 50V, where Ra is the sum of the resistances of the earth electrode and the
          protective conductor connecting it to the exposed-conductive-parts. BS 7671 adds that
          where Ra is not known it may be replaced by Zs. Rather than calculate, you can read the
          limit straight off Table 41.5.
        </p>
        <div className={tableShellCn}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={thCn}>Rated residual operating current (IΔn)</th>
                  <th className={thCn}>Maximum earth fault loop impedance Zs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className={tdCn}>30mA</td>
                  <td className={`${tdCn} font-semibold`}>1667Ω</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={tdCn}>100mA</td>
                  <td className={`${tdCn} font-semibold`}>500Ω</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className={tdCn}>300mA</td>
                  <td className={`${tdCn} font-semibold`}>167Ω</td>
                </tr>
                <tr>
                  <td className={tdCn}>500mA</td>
                  <td className={`${tdCn} font-semibold`}>100Ω</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${footnoteCn} border-t border-white/10`}>
            BS 7671 Table 41.5, for Uo of 230V, RCDs to BS EN 61008-1 and BS EN 61009-1.
            Disconnection must still be within the times stated in Table 41.1. BS 7671 notes that
            the installation earth electrode resistance should be as low as practicable and that a
            value exceeding 200Ω may not be stable — see Reg 542.2.4.
          </p>
        </div>
        <p>
          One qualification worth knowing: the footnote to Table 41.1 permits the TN disconnection
          times to be used on a TT system where disconnection is achieved by an overcurrent
          protective device and the protective equipotential bonding is connected to all
          extraneous-conductive-parts within the installation in accordance with Reg 411.3.1.2.
        </p>
      </>
    ),
  },
  {
    id: 'zs-differences',
    heading: 'Earth Fault Loop Impedance and Disconnection Times',
    content: (
      <>
        <p>
          Earth fault loop impedance is the total impedance of the fault current path: the source,
          the line conductor up to the point of the fault, and the protective conductor between the
          fault and the source. A lower Zs means more fault current, and more fault current means
          faster disconnection.
        </p>
        <h3 className={subHeadCn}>The formula is the same, the regulation number is not</h3>
        <p>
          For a TN system, Reg 411.4.4 requires Zs x Ia ≤ Uo x Cmin. For a TT system protected by an
          overcurrent device, Reg 411.5.4 states the same requirement. Uo is the nominal line to
          earth voltage and Cmin is the minimum voltage factor, given the value 0.95 for a low
          voltage supply provided in accordance with the ESQCR. Ia is the current causing automatic
          operation of the device within the time required by Reg 411.3.2.2 or 411.3.2.3.
        </p>
        <p>
          Worked through for a 32A Type B MCB, that gives a maximum Zs of 1.37Ω — the figure printed
          in Table 41.3. A TN-C-S installation with a Ze of 0.30Ω leaves ample headroom for the
          circuit conductors. A TT installation with a Ze of 50Ω is nowhere near it, which is why
          fault protection on TT is provided by an RCD reading against Table 41.5 instead.
        </p>
        <h3 className={subHeadCn}>Disconnection times differ by system, not just by device</h3>
        <p>
          Table 41.1 gives 0.4s for a 230V AC final circuit on a TN system and 0.2s for the same
          circuit on TT. For distribution circuits and circuits outside the scope of Reg 411.3.2.2,
          Reg 411.3.2.3 permits up to 5s on TN and Reg 411.3.2.4 permits up to 1s on TT. Quoting the
          TN figure on a TT installation is a common slip on certificates and in exams.
        </p>
      </>
    ),
  },
  {
    id: 'pme-risks',
    heading: 'PME Risks and Regulation 9 of the ESQCR 2002',
    content: (
      <>
        <p>
          PME carries a specific risk that does not exist on TN-S or TT: if the PEN conductor goes
          open circuit between the transformer and the installation, the installation loses its
          neutral but its earth terminal remains connected to all the metalwork. Load current then
          seeks a return path through the earthing arrangement, and a voltage can appear between
          that metalwork and true Earth.
        </p>
        <p>
          BS 7671 does not leave that to judgement — it restricts PME earthing in the specific
          locations where someone is most likely to be in contact with true earth potential at the
          same time as they touch the metalwork.
        </p>
        <div className={cardCn}>
          <div className="space-y-4 text-[14px] text-white">
            <div>
              <p className="mb-1 font-bold text-white">
                Caravan and camping parks — Reg 708.553.1.14
              </p>
              <p>
                Socket-outlet protective conductors shall not be connected to a PME earthing
                facility. This does not stop PME being used elsewhere on the site, for example for
                the installations of permanent buildings.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className="mb-1 font-bold text-white">Marinas — Reg 709.553.1.14 and 709.411.4</p>
              <p>
                The same prohibition applies to berth socket-outlets, and Reg 709.411.4 records the
                statutory prohibition in ESQCR Reg 9(4) on connecting a PME earthing facility to any
                metalwork in a boat.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className="mb-1 font-bold text-white">
                EV charging equipment — Reg 722.411.4.1 and 722.312.2.1
              </p>
              <p>
                A PME earthing facility shall not be used as the means of earthing for the
                protective conductor contact of a charging point located outdoors, or one that might
                reasonably be expected to be used to charge a vehicle outdoors, unless one of the
                listed alternatives is used — an installation earth electrode holding the MET below
                70V RMS under an open-circuit PEN fault, or a device that disconnects the vehicle
                within 5s on detecting 70V RMS, or on the utilisation voltage leaving the 207V to
                253V band, or an equivalent alternative. A circuit supplying EV charging equipment
                shall not include a PEN conductor. This is a BS 7671 requirement, not a manufacturer
                preference.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className="mb-1 font-bold text-white">
                Agricultural and horticultural premises — Reg 705.411.4
              </p>
              <p>
                A PEN conductor shall not be used within the installation. NOTE 2 to that regulation
                adds that, unless a metal grid is laid in the floor, using a PME earthing facility as
                the means of earthing is not recommended.
              </p>
            </div>
          </div>
        </div>
        <h3 className={subHeadCn}>What the ESQCR actually says</h3>
        <p>
          Protective multiple earthing is dealt with by Regulation 9 of the Electricity Safety,
          Quality and Continuity Regulations 2002. Regulation 9(2) requires the distributor to
          connect the supply neutral conductor with earth at multiple points, including such points
          as are necessary to prevent, so far as is reasonably practicable, danger arising from the
          supply neutral conductor becoming open circuit. Regulation 9(4) prohibits the distributor
          connecting the combined neutral and protective conductor to any metalwork in a caravan or
          boat.
        </p>
        <p>
          Regulation 8 is the general requirement for connection with earth. The paragraph
          electricians meet most often is 8(4): a consumer shall not combine the neutral and
          protective functions in a single conductor in the consumer&apos;s installation. That is
          the statutory reason the PEN conductor stops at the origin, and BS 7671 cites it in the
          notes to Regulations 543.4.1, 444.4.3.1 and 710.312.2.
        </p>
      </>
    ),
  },
  {
    id: 'identifying-system',
    heading: 'Identifying the Earthing System on Site',
    content: (
      <>
        <p>
          Identify the earthing system before starting work. The method combines visual inspection
          at the supply intake with a Ze measurement — neither on its own is conclusive.
        </p>
        <div className={cardCn}>
          <div className="space-y-4 text-[14px] text-white">
            <div>
              <p className="mb-1 font-bold text-white">TN-C-S (PME)</p>
              <p>
                A conductor links the cut-out neutral terminal to the main earthing terminal. The
                meter neutral and the earthing conductor originate from the same cut-out
                termination. Confirmation from the distributor is best practice.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className="mb-1 font-bold text-white">TN-S</p>
              <p>
                The cut-out has a separate earth terminal, distinct from the neutral, typically
                connected to the lead sheath of the supply cable or to a separate protective
                conductor. A measured Ze below about 0.8Ω supports TN-S.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <p className="mb-1 font-bold text-white">TT</p>
              <p>
                No distributor earth terminal at the cut-out. The installation has its own earth
                electrode — rod, tape or plate — connected to the MET. A measured Ze in the tens or
                hundreds of ohms supports TT. Check that fault protection is provided by RCDs.
              </p>
            </div>
          </div>
        </div>
        <p>
          Record the earthing system type and the measured Ze on the EIC or EICR. On a TT
          installation, record Ra as well — it is the value the next person needs in order to check
          Ra x IΔn ≤ 50V without re-testing the electrode.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Earthing Systems in Practice',
    content: (
      <>
        <p>
          Earthing system identification, Ze measurement and the Zs limits that follow from them are
          core competencies tested in C&G 2391 and examined in detail during periodic inspection
          work. Misidentifying the system leads to the wrong protective device, the wrong Zs limit
          and the wrong disconnection time on the certificate.
        </p>
        <SEOAppBridge
          title="Record earthing details on EIC and EICR certificates"
          description="Elec-Mate's EIC and EICR apps include fields for earthing system type, Ze, Ra (earth electrode resistance), and supplementary bonding details."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TNSvsTNCSvsTTPage() {
  return (
    <GuideTemplate
      title="TN-S, TN-C-S and TT Earthing Systems Explained"
      description="UK earthing systems compared: TN-S, TN-C-S (PME) and TT. Typical Ze, BS 7671 disconnection times, Zs limits, PME risks and Regulation 9 of the ESQCR 2002."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Earthing Systems Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Earthing Systems Explained:{' '}
          <span className="text-yellow-400">TN-S, TN-C-S and TT for UK Electricians</span>
        </>
      }
      heroSubtitle="The earthing system decides your Zs limit, your disconnection time and whether an MCB or an RCD provides fault protection. This guide compares TN-S, TN-C-S (PME) and TT against BS 7671:2018+A4:2026, covers the PME open-PEN restrictions, and shows how to identify each system on site."
      answerBox={{
        question: 'What is the difference between TN-S, TN-C-S and TT earthing systems?',
        answer:
          'TN-S keeps the neutral and protective conductors separate throughout the supply. TN-C-S combines them as a PEN conductor in the network and splits them at the cut-out — the arrangement known as PME. TT has no supply earth: the installation earths itself through a local electrode, so fault protection is provided by an RCD.',
        detail:
          'Typical Ze is 0.20–0.35Ω on TN-C-S, 0.35–0.80Ω on TN-S and 20–200Ω on TT. BS 7671 Table 41.1 allows 0.4s to disconnect a 230V AC final circuit on a TN system, but only 0.2s on TT.',
      }}
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Earthing Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Earthing and Bonding Details on Your Certificates"
      ctaSubheading="Elec-Mate's EIC and EICR apps capture earthing system type, Ze measurements, and earth electrode details. 7-day free trial, cancel anytime."
    />
  );
}
