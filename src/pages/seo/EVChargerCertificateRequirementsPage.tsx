import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Scale,
  Zap,
  Calculator,
  AlertTriangle,
  BookOpen,
  Search,
  PoundSterling,
  GraduationCap,
  Building2,
  Send,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'EV Charger Certificate Requirements',
    href: '/guides/ev-charger-certificate-requirements',
  },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Certification Overview' },
  { id: 'eic-requirement', label: 'Electrical Installation Certificate (EIC)' },
  { id: 'iet-cop', label: 'IET Code of Practice Compliance' },
  { id: 'part-p', label: 'Part P Building Regulations' },
  { id: 'load-assessment', label: 'Load Assessment Documentation' },
  { id: 'ozev-documentation', label: 'OZEV/EVHS Documentation (Historical)' },
  { id: 'domestic-vs-commercial', label: 'Domestic vs Commercial Requirements' },
  { id: 'common-mistakes', label: 'Common Certification Mistakes' },
  { id: 'elecmate-ev', label: 'Completing EV Certificates with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every EV charger installation requires an Electrical Installation Certificate (EIC) — this is a BS 7671 requirement for all new circuits. A Minor Works Certificate is not appropriate because an EV charger is a new circuit from the distribution board.',
  'The installation must comply with the IET Code of Practice for Electric Vehicle Charging Equipment Installation, which covers cable sizing, protection, earthing, load management, and documentation.',
  'EV charger installation is notifiable work under Part P of the Building Regulations. If you are not registered with a competent person scheme, you must use building control — adding cost and delay.',
  'A load assessment (maximum demand calculation) must be completed and documented before installation. This confirms the existing supply can handle the additional load without exceeding the rated capacity.',
  'The OZEV Electric Vehicle Homecharge Scheme (EVHS) grant closed to new applicants in 2022, but installations completed under the scheme still require the original OZEV documentation to be retained.',
];

const faqs = [
  {
    question: 'Can I issue a Minor Works Certificate for an EV charger installation?',
    answer:
      'No. A Minor Works Certificate is only appropriate for minor electrical work that does not include the installation of a new circuit. An EV charger installation involves running a new circuit from the consumer unit (or a new sub-distribution board) to the charge point. This is new circuit work, which requires a full Electrical Installation Certificate (EIC). The EIC records the design, construction, and inspection and testing of the new circuit, including cable sizing calculations, protective device selection, earthing arrangements, and test results. Issuing a Minor Works Certificate for an EV charger installation is incorrect and would not satisfy the requirements of BS 7671, Part P, or the competent person scheme. If an assessor or building control inspector identifies that a Minor Works Certificate was issued instead of an EIC, it would need to be corrected.',
  },
  {
    question: 'Do I need to be registered with a competent person scheme to install EV chargers?',
    answer:
      'EV charger installation is notifiable work under Part P of the Building Regulations (England and Wales) because it involves a new circuit in a domestic property. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work and notify building control through the scheme. If you are not registered with a scheme, you must submit a building notice to your local authority building control department before starting the work, and building control will need to inspect the installation. This adds cost (the building control fee, typically £200 to £400) and time (waiting for inspection). Most professional EV charger installers are scheme-registered. In addition, some charger manufacturers and warranty providers require installation by an installer who holds the relevant qualifications and scheme registration.',
  },
  {
    question: 'What load assessment is required before installing an EV charger?',
    answer:
      'Before installing an EV charger, you must complete a maximum demand assessment of the existing electrical installation to confirm that the supply can handle the additional load. A typical 7kW single-phase home charger draws approximately 32A — this is a significant additional load on a domestic supply. The assessment involves calculating the existing maximum demand (using diversity factors from BS 7671 and the IET On-Site Guide), adding the EV charger load, and confirming the total does not exceed the rated capacity of the incoming supply (typically 60A or 80A for older properties, 100A for newer ones). If the existing supply is insufficient, options include upgrading the supply (applying to the DNO for a larger fuse), installing a load management device that limits the charger output when other loads are high, or fitting a smaller charger (e.g., 3.6kW instead of 7kW). The load assessment must be documented and retained as part of the installation records.',
  },
  {
    question: 'What is the IET Code of Practice for EV charging?',
    answer:
      'The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the key technical reference for EV charger installations in the UK. It supplements BS 7671 with specific guidance for EV charging, covering: selection and sizing of cables (including consideration of continuous load at full rated current), protective device selection, earthing arrangements (including PME supply considerations and the need for earth electrodes in certain situations), RCD protection requirements, load management and demand-side response, cable routing and mechanical protection, outdoor installations and IP ratings, and documentation requirements. The Code of Practice is not a regulation — it is a guidance document. However, competent person schemes and building control treat it as the expected standard for EV charger installations. Deviating from its recommendations without good technical justification would be difficult to defend.',
  },
  {
    question: 'Do I need a separate earth electrode for an EV charger?',
    answer:
      'It depends on the earthing arrangement of the supply. On a PME (Protective Multiple Earthing) supply — which is the most common arrangement in the UK (TN-C-S) — the IET Code of Practice recommends additional precautions because of the risk of an open PEN conductor. If the PEN conductor is lost, the metalwork of the EV charger (and the vehicle connected to it) could rise to a dangerous voltage. The Code of Practice recommends one of several mitigation strategies: installing a separate earth electrode and using it as the earth reference for the EV charger circuit; using a charge point with built-in PEN fault detection; or using a Type B or Type EV RCD with additional earth monitoring. The specific approach depends on the charger model, the supply characteristics, and the site conditions. The key point is that you cannot simply connect an EV charger to a PME earth without considering this issue — it must be assessed and documented as part of the installation.',
  },
  {
    question: 'Is the OZEV grant still available?',
    answer:
      'The OZEV Electric Vehicle Homecharge Scheme (EVHS) grant for homeowners closed to new applicants on 31 March 2022. It was replaced by the EV Chargepoint Grant, which is only available to tenants in rented accommodation (private and social), people living in flats, and landlords providing charging for tenants. The grant provides up to £350 towards the cost of a home charge point, subject to eligibility criteria. The Workplace Charging Scheme (WCS) is still available for businesses, providing a grant of up to £350 per socket (maximum 40 sockets) for installing EV charge points at commercial premises. For installations completed under the original EVHS before it closed, the OZEV documentation (grant approval, installation certificate, and compliance documentation) must be retained. If an installation was done under the EVHS and the documentation is missing, this can cause problems if the property is sold or if a dispute arises.',
  },
  {
    question: 'What RCD protection is required for an EV charger?',
    answer:
      'BS 7671 Regulation 722.531.3 requires that the circuit supplying an EV charging point is protected by an RCD with a rated residual operating current not exceeding 30mA. The type of RCD depends on the charger: Mode 3 chargers with single-phase or three-phase output that could produce DC fault current require a Type B RCD or a Type A RCD combined with a device that provides equivalent protection against DC fault current (often built into the charger as a DC leakage detection module). If the charger has built-in DC fault protection (6mA DC detection), a Type A RCD may be sufficient. Check the charger manufacturer installation instructions — they will specify the RCD type required. Installing the wrong RCD type can lead to nuisance tripping or, worse, failure to trip on a DC fault. Document the RCD type and its compatibility with the charger in the installation records.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete guide to EV charger installation including earthing, cable sizing, and load management.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'Guide to all UK electrical certificates — EIC, Minor Works, EICR — and when each is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Understanding Part P notification requirements and competent person self-certification.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for EV charger circuits and other installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description:
      'Certification requirements for solar PV installations — often combined with EV charging.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'EV Charger Certification: What You Must Issue',
    content: (
      <>
        <p>
          Installing an electric vehicle charger is not just a wiring job — it is a notifiable
          electrical installation that requires specific documentation to comply with BS 7671, the
          IET Code of Practice for Electric Vehicle Charging Equipment Installation, and Part P of
          the Building Regulations.
        </p>
        <p>
          Many electricians treat EV charger installations as routine domestic work and issue the
          wrong certificate or incomplete documentation. This creates problems: for the homeowner
          (whose installation may not be compliant), for the electrician (whose scheme registration
          is at risk), and for future electricians (who cannot verify the installation was done
          correctly).
        </p>
        <p>
          This guide covers everything you need to issue for an EV charger installation in the UK:
          the{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            Electrical Installation Certificate
          </SEOInternalLink>
          , Part P notification, load assessment documentation, IET Code of Practice compliance, and
          (where applicable) historical OZEV grant documentation.
        </p>
      </>
    ),
  },
  {
    id: 'eic-requirement',
    heading: 'Electrical Installation Certificate (EIC): The Core Document',
    content: (
      <>
        <p>
          Every EV charger installation requires a full Electrical Installation Certificate (EIC).
          This is not optional and a Minor Works Certificate is not an acceptable alternative.
        </p>
        <p>
          The reason is straightforward: an EV charger installation involves a new circuit from the
          distribution board to the charge point. Under BS 7671, all new circuits require an EIC
          that records the design, construction, and inspection and testing of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design section:</strong> cable sizing calculations, protective device
                selection (type and rating), earthing arrangement, and voltage drop calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction section:</strong> confirmation that the installation was
                constructed in accordance with the design, correct cable type and routing, proper
                mechanical protection, and correct terminations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing section:</strong> visual inspection results,
                continuity of protective conductors (R1+R2), insulation resistance, polarity, earth
                fault loop impedance (Zs), prospective fault current (PFC), and RCD operation (trip
                time at 1x and 5x rated residual current).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results:</strong> all test values recorded for the new
                circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EIC must be signed by the designer, the installer, and the inspector (these can be the
          same person if they are competent in all three roles). A copy must be given to the person
          ordering the work.
        </p>
      </>
    ),
  },
  {
    id: 'iet-cop',
    heading: 'IET Code of Practice Compliance',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the
          authoritative technical guidance for EV charger installations in the UK. While it is a
          guidance document rather than a regulation, competent person schemes and building control
          treat compliance with the Code of Practice as the expected standard.
        </p>
        <p>Key areas the Code of Practice covers that go beyond standard BS 7671 requirements:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing considerations.</strong> On a PME (TN-C-S) supply, additional
                precautions are required to address the risk of a lost PEN conductor. Options
                include a separate earth electrode, PEN fault detection, or a Type B/Type EV RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuous load rating.</strong> An EV charger is a continuous load — it
                draws full rated current for extended periods (hours). Cable sizing must account for
                this using the 1.0 continuous load factor, not the diversity factors used for
                intermittent loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load management.</strong> Where the existing supply is insufficient for a
                full-rated charger, dynamic load management (DLM) can be used to reduce the charger
                output when other loads are high. The DLM system must be documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD selection.</strong> The correct RCD type depends on the charger model
                and its DC fault characteristics. Type A, Type B, or Type EV may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor installation requirements.</strong> External charge points must have
                appropriate IP ratings, UV-resistant cables, and mechanical protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document your compliance with the IET Code of Practice on the EIC. Noting "installed in
          accordance with IET CoP for EV Charging Equipment Installation" demonstrates that you have
          considered the specific requirements beyond standard BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations: Notification Required',
    content: (
      <>
        <p>
          EV charger installation is notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          because it involves the installation of a new circuit. This applies to domestic properties
          in England and Wales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registered:</strong> if you are registered with
                NICEIC, NAPIT, or ELECSA, you can self-certify the work. The notification is
                submitted through your scheme, and building control is notified automatically. The
                homeowner receives a Building Regulations Compliance Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not registered with a scheme:</strong> you must submit a building notice to
                the local authority before starting the work. Building control will need to inspect
                the completed installation. This adds cost (typically £200 to £400) and time
                (waiting for the inspection).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to notify is a criminal offence under the Building Act 1984. If a property is sold
          and the buyer's solicitor discovers that an EV charger was installed without Part P
          notification, the seller may need to obtain retrospective approval or provide an indemnity
          insurance policy. This is an unnecessary complication that proper certification avoids
          entirely.
        </p>
      </>
    ),
  },
  {
    id: 'load-assessment',
    heading: 'Load Assessment Documentation',
    content: (
      <>
        <p>
          A maximum demand assessment is a critical pre-installation step that must be documented. A
          7kW single-phase EV charger draws approximately 32A continuously — on a 60A or 80A supply,
          this is a significant proportion of the available capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculate existing maximum demand</strong> — list all existing circuits,
                apply diversity factors from BS 7671 Appendix 1 / IET On-Site Guide, and calculate
                the total diversified maximum demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add the EV charger load</strong> — at full rated current, no diversity
                applied (it is a continuous load at maximum output).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compare to supply capacity</strong> — check the main fuse rating and the
                supply cable capacity. If the total exceeds the available capacity, you need a
                supply upgrade, load management, or a smaller charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document the assessment</strong> — record the calculation, the conclusion,
                and any load management measures implemented. Retain this as part of the
                installation records alongside the EIC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate includes a{' '}
          <SEOInternalLink href="/guides/max-demand-calculator">
            maximum demand calculator
          </SEOInternalLink>{' '}
          that automates this calculation and generates documentation you can include with the EIC.
        </p>
        <SEOAppBridge
          title="Calculate maximum demand in seconds"
          description="Elec-Mate's maximum demand calculator applies the correct diversity factors, adds the EV charger load, and compares to supply capacity. Generates a professional document you can include with the EIC."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'ozev-documentation',
    heading: 'OZEV/EVHS Documentation (Historical)',
    content: (
      <>
        <p>
          The Office for Zero Emission Vehicles (OZEV) Electric Vehicle Homecharge Scheme (EVHS)
          provided grants of up to £350 towards the cost of installing a home charge point. The
          scheme closed to new homeowner applicants on 31 March 2022 but was replaced by the EV
          Chargepoint Grant for tenants, flat residents, and landlords.
        </p>
        <p>
          For installations completed under the original EVHS, the following documentation must be
          retained:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV grant approval letter</strong> — confirming the grant was approved for
                the specific property and applicant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation certificate (EIC)</strong> — the standard Electrical
                Installation Certificate for the new circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger specification</strong> — make, model, and serial number of the
                installed charge point. The charger must have been on the OZEV approved list at the
                time of installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer credentials</strong> — evidence that the installer was OZEV
                authorised at the time of installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For the current EV Chargepoint Grant (available to tenants, flat residents, and
          landlords), similar documentation requirements apply. Check the OZEV website for the
          latest guidance on eligible chargers and approved installers.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-vs-commercial',
    heading: 'Domestic vs Commercial: Different Requirements',
    content: (
      <>
        <p>
          The certification requirements differ between domestic and commercial EV charger
          installations:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>EIC required for the new circuit.</li>
              <li>Part P notification required (notifiable work).</li>
              <li>Load assessment documented.</li>
              <li>IET CoP compliance documented.</li>
              <li>Typically single-phase, 7kW (32A) charger.</li>
              <li>One or two charge points per property.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>EIC required for all new circuits.</li>
              <li>
                Part P does not apply (non-domestic). Building control may still be involved for
                larger installations under Part L or planning conditions.
              </li>
              <li>
                Load assessment is more complex — may require DNO consultation and supply upgrades.
              </li>
              <li>Three-phase installations are common (22kW or 50kW+ rapid chargers).</li>
              <li>Workplace Charging Scheme grant may apply (up to 40 sockets at £350 each).</li>
              <li>Multiple charge points with load management systems.</li>
            </ul>
          </div>
        </div>
        <p>
          Commercial installations often involve additional considerations: planning permission
          (particularly for standalone charge points in car parks), civil works (groundwork,
          ducting), network infrastructure (smart charging, back-office systems), and payment
          systems. The electrical certification requirements are the same — EIC for each new circuit
          — but the overall project documentation is more extensive.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common EV Charger Certification Mistakes',
    content: (
      <>
        <p>
          These are the most common certification errors that electricians make on EV charger
          installations. Every one of them can cause problems at a scheme assessment, a building
          control inspection, or a future property sale.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issuing a Minor Works Certificate instead of an EIC.</strong> An EV charger
                is a new circuit. New circuits require an EIC. No exceptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not recording the load assessment.</strong> The maximum demand calculation
                must be documented. Without it, there is no evidence that the supply can handle the
                additional load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect RCD type.</strong> Using a Type AC or Type A RCD when a Type B or
                Type EV is required for the specific charger model. Check the manufacturer
                instructions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not addressing PME earthing.</strong> Failing to consider and document the
                PME earthing precautions required by the IET Code of Practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing Part P notification.</strong> Forgetting to submit the Part P
                notification through the competent person scheme or building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not providing documentation to the customer.</strong> The customer must
                receive a copy of the EIC, the test results, the load assessment, and any relevant
                manufacturer documentation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-ev',
    heading: 'Completing EV Charger Certificates with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate streamlines the EV charger certification process, ensuring you produce complete,
          compliant documentation for every installation:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC with EV-Specific Fields</h4>
                <p className="text-white text-sm leading-relaxed">
                  The Elec-Mate EIC template includes fields for charger make and model, rated
                  output, RCD type, earthing precautions applied, and IET CoP compliance notes.
                  Everything the certificate needs is prompted — nothing is left to memory.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Integrated Load Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the maximum demand calculation within the app. The result is
                  automatically linked to the EIC, creating a complete documentation package.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed EIC, test results, and load assessment to the customer as a
                  professional PDF — by email or WhatsApp — before you leave site. The customer has
                  everything they need for Part P compliance and property records.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EV charger certificates on your phone"
          description="EIC with EV-specific fields, integrated load assessment, and instant PDF delivery. Join 430+ electricians using Elec-Mate for professional certification. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerCertificateRequirementsPage() {
  return (
    <GuideTemplate
      title="EV Charger Certificate Requirements UK | What to Issue"
      description="Complete guide to EV charger certification in the UK. EIC required, IET Code of Practice compliance, Part P notification, load assessment, PME earthing, and RCD selection. Avoid common mistakes."
      datePublished="2025-05-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          EV Charger Certificate Requirements:{' '}
          <span className="text-yellow-400">What Every Electrician Must Issue</span>
        </>
      }
      heroSubtitle="An EV charger installation requires an EIC (not a Minor Works), Part P notification, a documented load assessment, and compliance with the IET Code of Practice. This guide covers every document you need to produce and the common certification mistakes that catch electricians out."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Certification"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Certificates on Your Phone"
      ctaSubheading="EIC with EV-specific fields, integrated load assessment calculator, and instant PDF delivery to the customer. Join 430+ electricians doing certification the smart way. 7-day free trial."
    />
  );
}
