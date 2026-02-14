import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Zap,
  Calculator,
  Camera,
  Brain,
  Mic,
  Send,
  Receipt,
  Flame,
  Lightbulb,
  Car,
  Sun,
  Wrench,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Certificate Types UK | Complete Guide';
const PAGE_DESCRIPTION =
  'Complete guide to all UK electrical certificate types — EICR, EIC, Minor Works, Domestic EIC, EV Charger, Fire Alarm (BS 5839), Emergency Lighting (BS 5266), Solar PV (MCS), and PAT Testing. When each is required, who can issue them, legal requirements. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Certificate Types', href: '/guides/electrical-certificate-types-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Certificate Overview' },
  { id: 'eicr', label: 'EICR Certificate' },
  { id: 'eic', label: 'EIC Certificate' },
  { id: 'minor-works', label: 'Minor Works Certificate' },
  { id: 'ev-charger', label: 'EV Charger Certificate' },
  { id: 'fire-alarm', label: 'Fire Alarm Certificate' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Certificate' },
  { id: 'solar-pv', label: 'Solar PV Certificate' },
  { id: 'pat-testing', label: 'PAT Testing' },
  { id: 'elecmate-features', label: 'Elec-Mate Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There are 8 main types of electrical certificate used in the UK — each for a different type of work, and each with specific legal and regulatory requirements.',
  'An EICR is for periodic inspection of existing installations; an EIC is for new work and significant alterations; a Minor Works Certificate covers small additions and changes.',
  'Fire Alarm certificates (BS 5839), Emergency Lighting certificates (BS 5266), and Solar PV certificates (MCS) require specialist knowledge of their respective British Standards.',
  'Elec-Mate is the only app that has all 8 certificate types in one platform — with board scanner, voice test entry, defect code AI, remedial estimator, digital signatures, and PDF export.',
  'Every certificate type in Elec-Mate validates test results against BS 7671 maximum permitted values automatically, eliminating manual cross-referencing errors.',
];

const faqs = [
  {
    question: 'What is the difference between an EICR and an EIC?',
    answer:
      'An EIC (Electrical Installation Certificate) is issued after new installation work or a significant alteration to confirm that the work complies with BS 7671 at the time of completion. It is a forward-looking document that certifies the quality and compliance of work just done. An EICR (Electrical Installation Condition Report) is issued after periodic inspection and testing of an existing installation — it reports on the current condition of the installation as found, which may include defects, deterioration, or non-compliance with the current standard. In short: EIC is for new work, EICR is for existing installations. An EIC should be issued for every notifiable job completed by a registered electrician. An EICR is issued at recommended intervals (every 5 years for rented properties, every 10 years for owner-occupied domestic properties) or when a change of use or ownership triggers an inspection.',
  },
  {
    question: 'When should I issue a Minor Works Certificate instead of a full EIC?',
    answer:
      'A Minor Works Certificate (also called a Minor Electrical Installation Works Certificate, or MEIWC) is used for additions or alterations to an existing circuit that do not extend to the provision of a new circuit. Examples include adding a spur from an existing ring circuit to serve a new socket outlet, adding a new light fitting to an existing lighting circuit, or replacing a consumer unit (although consumer unit replacement is notifiable under Part P and some scheme providers require a full EIC for this work). If the work involves installing a new circuit — for example, running a dedicated circuit for a cooker, a shower, or an EV charger — a full EIC is required, not a Minor Works Certificate. The key test is: does this work create a new circuit at the distribution board? If yes, use an EIC. If no, use a Minor Works Certificate.',
  },
  {
    question: 'Do I need a separate certificate for EV charger installations?',
    answer:
      'EV charger installations require an Electrical Installation Certificate (EIC) because they involve the installation of a new dedicated circuit. However, many electricians use a specific EV Charger Certificate that includes additional fields relevant to EV charging installations — such as the charging mode (Mode 2 or Mode 3), the charger make and model, the maximum charging current, the type of RCD protection installed (Type A or Type B as required by Section 722 of BS 7671), and the PME earthing assessment for charge points accessible to the public. Elec-Mate provides a dedicated EV Charger Certificate template that covers both the standard EIC requirements and the EV-specific information required by OZEV (Office for Zero Emission Vehicles) grants and by the charger manufacturer for warranty purposes.',
  },
  {
    question: 'Who can issue electrical certificates in the UK?',
    answer:
      'Electrical certificates must be issued by a "competent person" as defined by BS 7671. In practice, this means a person who holds the relevant qualifications and has sufficient knowledge and experience to carry out the work and complete the certification. For EICs and Minor Works Certificates, the person issuing the certificate must have designed or supervised the design of the work, and must have carried out or supervised the construction and initial verification. For EICRs, the person must hold an inspection and testing qualification such as City and Guilds 2391. Registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE Certification) allows electricians to self-certify notifiable work under Part P of the Building Regulations. Non-registered electricians can still carry out the work but must notify building control, which adds cost and delay.',
  },
  {
    question: 'What certificate do I need for fire alarm work?',
    answer:
      'Fire alarm installation and commissioning requires a certificate of compliance with BS 5839 (the British Standard for fire detection and fire alarm systems). Part 1 of BS 5839 covers non-domestic premises and Part 6 covers domestic premises. The certificate should record the system category (L1, L2, L3, L4, L5 for life protection; P1, P2 for property protection), the type and location of all detectors and call points, the alarm sounder coverage, the power supply arrangements, and the results of commissioning tests including sounder output, detector sensitivity, and cause-and-effect operation. A BS 5839 certificate is separate from the electrical installation certificate — you need both. The EIC covers the wiring and circuit protection; the BS 5839 certificate covers the fire alarm system design, installation, and commissioning.',
  },
  {
    question: 'Is PAT testing a legal requirement?',
    answer:
      'PAT testing (Portable Appliance Testing) is not specifically required by any single regulation. However, the Electricity at Work Regulations 1989 (Regulation 4) require all electrical equipment to be maintained in a safe condition, and the Health and Safety at Work etc. Act 1974 imposes a general duty to ensure the safety of employees and others. PAT testing is the recognised method of demonstrating compliance with these duties for portable and movable electrical equipment. The frequency of PAT testing depends on the type of equipment and the environment in which it is used — construction site tools may need testing every 3 months, while office IT equipment may only need annual testing. The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment provides guidance on testing intervals and methods.',
  },
  {
    question: 'Can I complete all these certificates on my phone?',
    answer:
      'Yes. Elec-Mate includes all 8 certificate types — EICR, EIC, Minor Works, EV Charger, Fire Alarm (BS 5839), Emergency Lighting (BS 5266), Solar PV (MCS), and PAT Testing — in one app that works on your phone, tablet, or laptop. Every certificate includes all the required fields per the relevant British Standard, with test result validation against BS 7671 maximum permitted values, digital signatures captured on-screen, and PDF export ready to send to clients by email or WhatsApp. The app works fully offline for on-site use and syncs to the cloud automatically when connectivity returns. All your certificates are stored in one place with full search, filtering, and client history.',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'UK Electrical Certificates: Complete Overview',
    content: (
      <>
        <p>
          The UK electrical industry uses a range of certificates and reports to document the
          design, installation, testing, and condition of electrical installations. Each certificate
          type serves a specific purpose, covers a specific type of work, and is governed by
          specific British Standards and regulations. Using the wrong certificate for a job — or
          failing to issue a certificate at all — can result in non-compliance with building
          regulations, scheme provider disciplinary action, and legal liability.
        </p>
        <p>
          This guide covers all 8 main certificate types used by UK electricians in 2026. For each
          type, we explain what it is, when it is required, what it must contain, who can issue it,
          and the legal framework that governs it. The relevant British Standards are referenced
          throughout — primarily{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations), BS 5839 (fire detection and alarm systems), BS 5266
          (emergency lighting), and the MCS standards for solar PV.
        </p>
        <SEOAppBridge
          title="All 8 certificate types in one app"
          description="Elec-Mate is the only platform that has EICR, EIC, Minor Works, EV Charger, Fire Alarm, Emergency Lighting, Solar PV, and PAT Testing certificates in one app. Board scanner, voice test entry, digital signatures, PDF export. Start your free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR — Electrical Installation Condition Report',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is the formal
          document produced following periodic inspection and testing of an existing electrical
          installation. It replaced the older Periodic Inspection Report (PIR) and is defined by BS
          7671 Appendix 6. The EICR records the condition of the installation as found, including
          any defects, deterioration, or departures from the current standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Key EICR Facts</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purpose:</strong> Report on the condition of an existing installation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal requirement:</strong> Every 5 years for rented properties in England
                (Electrical Safety Standards in the Private Rented Sector Regulations 2020).
                Penalties of up to £30,000 per breach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended intervals:</strong> 10 years (owner-occupied domestic), 5 years
                (rented/commercial), 3 years (industrial), 1 year (swimming pools, petrol stations)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overall assessment:</strong> Satisfactory or Unsatisfactory. Any C1 or C2{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation code
                </SEOInternalLink>{' '}
                makes it Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications:</strong> C&G 2391 (Inspection and Testing) or equivalent,
                plus 18th Edition (C&G 2382)
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR includes supply characteristics, details of the earthing arrangement, a schedule
          of items inspected (visual inspection), a schedule of test results (dead and live tests
          for every circuit), observations with classification codes, and the overall assessment. It
          is the most complex certificate type and typically takes 2 to 4 hours for a standard
          domestic installation.
        </p>
        <SEOAppBridge
          title="AI Board Scanner reads the DB from a photo"
          description="Point your phone camera at the distribution board and the AI reads MCB ratings, circuit details, and board layout. Start your EICR with half the data already filled in."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'eic',
    heading: 'EIC — Electrical Installation Certificate',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> is issued after
          new installation work or a significant alteration to confirm that the work complies with
          BS 7671 at the time of completion. It is required for all notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink> of
          the Building Regulations and must be issued before the installation is put into service.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">When an EIC Is Required</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Installation of a new circuit (e.g., dedicated cooker circuit, shower circuit, EV
                charger circuit)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Consumer unit replacement (always notifiable under Part P)</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Complete rewire of a property</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>New-build electrical installation</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Significant alteration to an existing installation</span>
            </li>
          </ul>
        </div>
        <p>
          The EIC has three parts: the design section (completed by the person responsible for the
          design), the construction section (completed by the person responsible for the
          construction), and the inspection and testing section (completed by the person responsible
          for initial verification). In domestic work, these are often the same person. The EIC must
          include a schedule of inspections, a schedule of test results for every circuit, and
          details of the supply characteristics and earthing arrangements.
        </p>
      </>
    ),
  },
  {
    id: 'minor-works',
    heading: 'Minor Works Certificate (MEIWC)',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          (formally the Minor Electrical Installation Works Certificate, or MEIWC) is used for
          additions or alterations to an existing circuit that do not extend to the provision of a
          new circuit. It is a simplified version of the EIC, designed for smaller jobs where a full
          EIC would be disproportionate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Minor Works Examples</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Adding a spur from an existing ring circuit for a new socket outlet</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Adding a new light fitting to an existing lighting circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Replacing a fused connection unit with a different rating</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Relocating a light switch or adding a two-way switch</span>
            </li>
          </ul>
        </div>
        <p>
          The Minor Works Certificate is simpler than a full EIC but still requires the essential
          test results: continuity of protective conductors, insulation resistance, polarity, earth
          fault loop impedance, and RCD operation (where applicable). If the work involves
          installing a new circuit at the distribution board, a Minor Works Certificate is not
          appropriate — use a full EIC.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charger',
    heading: 'EV Charger Certificate',
    content: (
      <>
        <p>
          <SEOInternalLink href="/tools/ev-charger-certificate">
            EV charger installations
          </SEOInternalLink>{' '}
          require a dedicated circuit and therefore a full Electrical Installation Certificate
          (EIC). However, EV charging installations have additional requirements under Section 722
          of BS 7671 that go beyond a standard circuit installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            EV-Specific Requirements (BS 7671 Section 722)
          </h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Car className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit:</strong> Each charge point must have its own dedicated
                circuit from the distribution board
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type:</strong> Type A minimum for Mode 3 chargers; Type B or Type A with
                DC 6 mA detection for chargers without built-in DC protection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing:</strong> Risk assessment required for charge points accessible
                to the public on PME (TN-C-S) supplies. May require earth electrode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum demand:</strong> Impact on the existing installation's maximum
                demand must be assessed and documented
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's EV Charger Certificate template includes all the standard EIC fields plus
          EV-specific sections for charging mode, charger make and model, maximum charging current,
          RCD type, PME assessment, and OZEV grant documentation.
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Certificate (BS 5839)',
    content: (
      <>
        <p>
          <SEOInternalLink href="/tools/fire-alarm-certificate">
            Fire alarm certificates
          </SEOInternalLink>{' '}
          document the design, installation, commissioning, and testing of fire detection and fire
          alarm systems. They are governed by BS 5839 — Part 1 for non-domestic premises and Part 6
          for domestic premises. The fire alarm certificate is separate from the electrical
          installation certificate; you need both.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">System Categories (BS 5839)</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Flame className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category L systems (Life protection):</strong> L1 (full coverage), L2
                (coverage of high-risk areas plus escape routes), L3 (escape routes only), L4
                (escape routes in existing buildings), L5 (custom engineered system)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category P systems (Property protection):</strong> P1 (full coverage), P2
                (coverage of high-risk areas only)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD systems (Domestic life protection):</strong> LD1 (full
                coverage), LD2 (escape routes plus high-risk rooms), LD3 (escape routes only — the
                minimum for all domestic properties)
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fire alarm certificate must record the system category, detector types and locations,
          manual call point locations, sounder coverage and output levels, power supply arrangements
          (including standby battery capacity), cause-and-effect programming, and the results of all
          commissioning tests. Annual servicing and testing must be documented separately.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Certificate (BS 5266)',
    content: (
      <>
        <p>
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            Emergency lighting certificates
          </SEOInternalLink>{' '}
          document the design, installation, and testing of emergency escape lighting systems in
          accordance with BS 5266 (Part 1 for non-domestic premises). Emergency lighting is required
          in all non-domestic premises and in common areas of blocks of flats to ensure safe
          evacuation in the event of a mains power failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Emergency Lighting Requirements</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> 3-hour emergency operation for most non-domestic premises
                (1 hour may be acceptable where the premises can be evacuated and not reoccupied)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illumination:</strong> Minimum 1 lux on the centre line of escape routes,
                0.5 lux minimum on the central band
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> Monthly functional test (operate for sufficient time to
                check operation), annual 3-hour full duration test
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Types:</strong> Maintained (always on), non-maintained (on only in
                emergency), sustained (combination)
              </span>
            </li>
          </ul>
        </div>
        <p>
          The emergency lighting certificate records the luminaire types and locations, the
          operating mode (maintained, non-maintained, or sustained), the rated duration, the results
          of commissioning tests, and the ongoing test schedule. Like fire alarm certificates,
          emergency lighting certificates are separate from the electrical installation certificate.
        </p>
      </>
    ),
  },
  {
    id: 'solar-pv',
    heading: 'Solar PV Certificate (MCS)',
    content: (
      <>
        <p>
          <SEOInternalLink href="/tools/solar-pv-certificate">
            Solar PV installations
          </SEOInternalLink>{' '}
          require both an Electrical Installation Certificate (EIC) for the AC wiring and a separate
          commissioning certificate for the PV system. If the installation is to qualify for the
          Smart Export Guarantee (SEG) payments, the installer must be MCS (Microgeneration
          Certification Scheme) certified, and an MCS certificate must be issued.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Solar PV Certificate Requirements</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Sun className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC side:</strong> Panel specifications, string configuration, DC cable
                sizing, DC isolator location, string voltage and current
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter:</strong> Make, model, maximum input voltage, MPPT configuration,
                anti-islanding verification
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC side:</strong> Circuit protection, RCD type, connection method, G98/G99
                compliance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Section 712:</strong> Specific requirements for solar PV
                installations including labelling, DC cable routing, and firefighter safety
              </span>
            </li>
          </ul>
        </div>
        <p>
          With{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            Amendment 3 (A3:2024)
          </SEOInternalLink>{' '}
          introducing Regulation 530.3.201 on bidirectional protective devices, solar PV
          installations with battery storage now require specific consideration of whether the
          protective devices in the consumer unit are suitable for reverse fault current flow.
        </p>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing',
    content: (
      <>
        <p>
          <SEOInternalLink href="/tools/pat-testing">PAT testing</SEOInternalLink> (Portable
          Appliance Testing) is the in-service inspection and testing of electrical equipment,
          including portable appliances, movable equipment, and IT equipment. While there is no
          single regulation that mandates PAT testing by name, the Electricity at Work Regulations
          1989 and the Health and Safety at Work etc. Act 1974 require all electrical equipment to
          be maintained in a safe condition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            PAT Testing Intervals (IET Code of Practice)
          </h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction site tools (110V):</strong> Every 3 months
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial equipment:</strong> Every 6 to 12 months depending on use
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial office equipment:</strong> Every 12 to 24 months
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hotel and hospitality:</strong> Every 12 months
              </span>
            </li>
          </ul>
        </div>
        <p>
          PAT testing involves a visual inspection (checking for damage, frayed cables, missing
          earth pins, cracked enclosures) followed by electrical tests (earth continuity, insulation
          resistance, and in some cases, a leakage current test). Results are recorded on PAT
          testing labels and in a register. Elec-Mate's PAT testing module includes barcode/QR
          scanning, batch testing, pass/fail labelling, and a full register with export capability.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-features',
    heading: 'Why Electricians Choose Elec-Mate for Certificates',
    content: (
      <>
        <p>
          Elec-Mate is the only platform that brings all 8 certificate types together in one app,
          with features designed specifically for how electricians work on site.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">AI Board Scanner</h3>
                <p className="text-white text-sm leading-relaxed">
                  Point your phone camera at any distribution board and the AI reads MCB/RCBO
                  ratings, circuit details, and board layout from the photo. Populates the
                  certificate with circuit data automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Voice Test Entry</h3>
                <p className="text-white text-sm leading-relaxed">
                  Speak your test results while holding probes — "Ring 1, R1+R2 0.32, Zs 0.89,
                  insulation 200 meg, RCD 18 milliseconds." The app fills in the schedule of test
                  results hands-free.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Defect Code AI</h3>
                <p className="text-white text-sm leading-relaxed">
                  Describe a defect in plain English and the AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  with the matching BS 7671 regulation number. No more second-guessing C2 vs C3.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Remedial Estimator</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices the fix — materials, labour, margin — and generates a quote you can hand to
                  the client with the certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Send className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Send via Email or WhatsApp</h3>
                <p className="text-white text-sm leading-relaxed">
                  Export the completed certificate as a professional PDF and send it to the client
                  by email, WhatsApp, or any share method on your phone. They have it before you
                  pack up your tools.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Auto BS 7671 Validation</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every test result is validated against BS 7671:2018+A3:2024 maximum permitted
                  values in real time. Enter a Zs value and the app instantly tells you if it passes
                  or fails for that protective device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs on your phone with board scanner and defect code AI.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Electrical Installation Certificates for new work and significant alterations.',
    icon: FileText,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'BS 7671 compliant Minor Works certificates for additions to existing circuits.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description: 'Dedicated EV charger installation certificate with Section 722 compliance.',
    icon: Car,
    category: 'Certificate',
  },
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description: 'BS 5839 compliant fire alarm installation and commissioning certificates.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description: 'BS 5266 emergency lighting design, installation, and test certificates.',
    icon: Lightbulb,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalCertificateTypesPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Hub"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Electrical Certificate Types UK: <span className="text-yellow-400">Complete Guide</span>
        </>
      }
      heroSubtitle="The complete guide to all UK electrical certificates — EICR, EIC, Minor Works, EV Charger, Fire Alarm (BS 5839), Emergency Lighting (BS 5266), Solar PV (MCS), and PAT Testing. What each certificate is for, when it is required, who can issue it, and the legal requirements. All 8 types available in one app."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="All 8 certificate types. One app. Your phone."
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICR, EIC, Minor Works, EV Charger, Fire Alarm, Emergency Lighting, Solar PV, and PAT Testing certificates. Board scanner, voice test entry, digital signatures. 7-day free trial."
    />
  );
}
