import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  Cable,
  FileCheck2,
  AlertTriangle,
  Send,
  Zap,
  Briefcase,
  Home,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Handover Documentation', href: '/guides/electrical-handover-documentation' },
];

const tocItems = [
  { id: 'what-is-handover', label: 'What Is Electrical Handover Documentation?' },
  { id: 'eic-and-meiwc', label: 'EIC and Minor Works Certificate' },
  { id: 'test-results', label: 'Test Results and Schedules' },
  { id: 'operation-maintenance', label: 'Operation and Maintenance Manual' },
  { id: 'as-built-drawings', label: 'As-Built Drawings and Cable Schedules' },
  { id: 'warranty-info', label: 'Warranty and Product Information' },
  { id: 'building-regulations', label: 'Building Regulations Compliance' },
  { id: 'common-failures', label: 'Common Handover Failures' },
  { id: 'elec-mate-handover', label: 'Elec-Mate for Handover Documentation' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Complete handover documentation is a legal and professional requirement for all notifiable electrical work -- it demonstrates compliance with BS 7671, Building Regulations Part P, and the Electricity at Work Regulations.',
  'The EIC (Electrical Installation Certificate) or Minor Works Certificate must be provided for all new installations and alterations, accompanied by the full schedule of test results and circuit details.',
  'An Operation and Maintenance manual should accompany every significant installation, providing the client with clear instructions for operating the system, routine maintenance requirements, and emergency procedures.',
  'As-built drawings and cable schedules are essential for commercial work and larger domestic installations -- they provide a permanent record of the actual installation that future electricians will rely on.',
  'Elec-Mate generates all handover documents digitally on site -- EIC, test results, cable schedules, and circuit details. Send the complete handover package to the client before you leave site.',
];

const faqs = [
  {
    question: 'What documents must I provide at handover?',
    answer:
      'For notifiable work completed through a competent person scheme, the minimum handover documentation is: the Electrical Installation Certificate (EIC) or Minor Works Certificate (MEIWC) with the full schedule of test results, a schedule of inspections, circuit details (circuit chart), and notification to the local authority building control (handled by the scheme). Best practice adds: an operation and maintenance manual, as-built drawings showing cable routes, a cable schedule, product data sheets and warranties for all major components installed, and a user guide explaining how to operate the new installation safely. For commercial work, the client specification may require additional documentation such as commissioning records, test certificates for specific equipment, and LPCB or third-party certification for fire safety systems.',
  },
  {
    question: 'Is an EIC always required?',
    answer:
      'An EIC is required for all new installations and for alterations or additions that include new circuits. For minor works (additions or alterations to existing circuits that do not include a new circuit), a Minor Works Certificate is sufficient. Examples: adding a socket to an existing ring final circuit is minor works (MEIWC), but adding a new radial circuit for an electric shower requires an EIC. Replacing a consumer unit requires an EIC because it involves significant work to the origin of the installation. The certificate must be completed and issued to the client before the electrician leaves site or within a reasonable time. Failing to provide the certificate is a breach of BS 7671 and, for notifiable work, may also breach Building Regulations.',
  },
  {
    question: 'What should an O&M manual contain?',
    answer:
      'An Operation and Maintenance manual for an electrical installation should contain: a description of the installation and its main components, circuit schedules and distribution board layouts, operating instructions for each system (lighting controls, emergency lighting, fire alarm, EV charger, solar PV), routine maintenance requirements and frequencies (for example, monthly emergency lighting function tests, annual RCD tests), emergency procedures (what to do in a power failure, how to isolate circuits, fire alarm operation), contact details for the installing contractor, product data sheets for all major components (consumer units, RCDs, AFDDs, SPDs, light fittings, EV chargers), warranty information and registration details, and test certificates and commissioning records. The manual should be written in plain language that a non-technical building user can understand.',
  },
  {
    question: 'Do I need as-built drawings for domestic work?',
    answer:
      'As-built drawings are not strictly required by BS 7671 for domestic work, but they are strongly recommended for larger domestic installations (full rewires, extensions, new builds) and are essential for commercial work. Even for a simple domestic installation, providing a circuit chart showing the distribution board layout, circuit designations, and cable sizes is considered best practice and is part of the EIC documentation. For rewires and new installations, a cable route drawing showing where cables are run (particularly in walls and floors) is invaluable for the homeowner and for any electrician who works on the installation in the future. Elec-Mate generates circuit charts automatically from the data entered during testing.',
  },
  {
    question: 'What happens if I do not provide handover documentation?',
    answer:
      'Failing to provide proper handover documentation has several consequences. Legally, for notifiable work under Part P of the Building Regulations, the building control body must be notified and the relevant certificate issued. If you are a member of a competent person scheme, failure to issue certificates and notify can result in sanctions from the scheme, including additional inspections, conditions on your membership, or removal from the scheme. Professionally, the client may refuse to pay the final invoice until documentation is provided, or may raise a complaint through the scheme or trading standards. Practically, incomplete documentation creates problems for the next electrician who works on the installation, for the client if they sell the property and need to provide evidence of compliance, and for you if a fault occurs and you need to demonstrate that the installation was tested and certified.',
  },
  {
    question: 'How long should I keep copies of handover documents?',
    answer:
      'There is no specific legal requirement for how long an electrician must retain copies of certificates and test results, but industry best practice is to keep records for a minimum of 6 years (the limitation period for breach of contract claims) and ideally for the expected life of the installation. NICEIC, NAPIT, and ELECSA all require their members to retain records of all certified work for a minimum period (typically 6 years). For practical purposes, keeping digital records indefinitely costs nothing and provides a permanent archive that protects you if a claim arises years later. Elec-Mate stores all certificates and test results in the cloud permanently, with full search and retrieval capability.',
  },
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An EIC (Electrical Installation Certificate) is issued for new installations, alterations, and additions. It certifies that the new work complies with BS 7671 at the time of completion. An EICR (Electrical Installation Condition Report) is issued when inspecting an existing installation to assess its condition. It reports on the condition of the installation at the time of inspection and identifies any defects, deterioration, or non-compliances. An EIC is a compliance certificate (the work meets the standard). An EICR is a condition report (the installation is in this condition at this point in time). Both are model forms from Appendix 6 of BS 7671. At handover of new work, you issue an EIC. The first EICR would typically be due 5 to 10 years later, depending on the type of installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-explained',
    title: 'EICR Explained',
    description:
      'Complete guide to the Electrical Installation Condition Report -- what it covers, how it works, and when it is needed.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI codes explained with real examples and guidance on classification.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Complete guide to consumer unit replacement including documentation and certification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-inspection-checklist',
    title: 'Electrical Inspection Checklist',
    description:
      'What to check during an electrical inspection -- visual inspection items, consumer unit, bonding, and labelling.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description: 'BS 5839 compliance, system grades and categories, and fire alarm certification.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'How to set up and grow your electrical business, including documentation and compliance systems.',
    icon: Briefcase,
    category: 'Business Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-handover',
    heading: 'What Is Electrical Handover Documentation?',
    content: (
      <>
        <p>
          Electrical handover documentation is the complete package of certificates, test results,
          drawings, manuals, and records that the electrician provides to the client on completion
          of electrical work. It is the formal record that the work has been designed, installed,
          tested, and certified in accordance with BS 7671 and all applicable regulations.
        </p>
        <p>
          Handover documentation serves multiple purposes. For the client, it provides evidence of
          compliance, operating instructions, and a permanent record of the installation. For the
          electrician, it demonstrates professional competence, satisfies scheme and regulatory
          obligations, and provides legal protection if questions arise later. For future
          electricians, it provides essential information about the installation that makes future
          work safer, faster, and more accurate.
        </p>
        <p>
          The quality of your handover documentation is a direct reflection of your professionalism.
          Clients who receive a comprehensive, well-organised handover package are more likely to
          recommend you, return for future work, and pay promptly. Clients who receive a scrappy
          handwritten certificate or nothing at all will question the quality of the work itself --
          and rightly so.
        </p>
        <p>
          This guide covers every element of a professional electrical handover package, from the
          mandatory{' '}
          <SEOInternalLink href="/guides/eicr-explained">EIC and test results</SEOInternalLink> to
          the best-practice additions that set you apart from the competition.
        </p>
      </>
    ),
  },
  {
    id: 'eic-and-meiwc',
    heading: 'EIC and Minor Works Certificate',
    content: (
      <>
        <p>
          The Electrical Installation Certificate (EIC) and the Minor Electrical Installation Works
          Certificate (MEIWC) are the core handover documents for electrical work. They are model
          forms from Appendix 6 of BS 7671 and must be completed for all new installations,
          alterations, and additions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC (Electrical Installation Certificate)</strong> -- required for new
                installations, alterations that include new circuits, and significant work such as
                consumer unit replacements. The EIC must include: details of the installation and
                the designer, installer, and inspector (which may be the same person), a description
                of the work, the design, construction, inspection, and testing declarations, the
                schedule of inspections, and the full schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MEIWC (Minor Electrical Installation Works Certificate)</strong> -- suitable
                for additions and alterations to existing circuits that do not include a new
                circuit. Examples include adding a socket to an existing ring final, relocating a
                light fitting, and replacing accessories. The MEIWC is simpler than the EIC but
                still includes essential test results.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The certificate must be completed accurately and in full. Common errors include: leaving
          the prospective fault current blank, not recording Zs values for every circuit, using
          incorrect descriptions for the type of supply, and failing to sign all required
          declarations. Incomplete certificates are a common finding during competent person scheme
          assessments and can result in corrective actions against the electrician.
        </p>
        <SEOAppBridge
          title="Digital EIC and Minor Works"
          description="Complete the EIC or Minor Works Certificate on your phone with full test results, schedule of inspections, and circuit details. AI-assisted data entry catches errors before you issue the certificate. Send as a professional PDF."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'test-results',
    heading: 'Test Results and Schedules',
    content: (
      <>
        <p>
          The schedule of test results is the technical heart of the handover documentation. It
          records every measurement taken during the testing of the installation and provides the
          evidence that the installation meets the requirements of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors</strong> -- R1+R2 values for every
                circuit, measured at the furthest point from the distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> -- measured between live conductors and
                earth, and between live conductors, for every circuit. Minimum values depend on the
                circuit voltage: 1 megohm for SELV and PELV circuits, 1 megohm for circuits up to
                500V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs)</strong> -- measured or calculated for every
                circuit to verify that the protective device will operate within the required
                disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD operation</strong> -- trip time measured at rated residual operating
                current (typically 30mA) for every RCD and RCBO. Both no-trip (at 50 percent rated
                current) and trip (at 100 percent rated current) tests should be recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective fault current (PSCC)</strong> -- measured at the origin of the
                installation. Both line-to-neutral and line-to-earth values should be recorded.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every test result must be recorded clearly, with the correct units, and compared against
          the maximum permitted values from BS 7671. The schedule of test results should be
          presented in a clear, tabular format that allows any competent electrician to review the
          results and verify compliance. Elec-Mate generates the schedule of test results
          automatically from the values you enter during testing, with built-in validation that
          flags any results outside permitted limits.
        </p>
      </>
    ),
  },
  {
    id: 'operation-maintenance',
    heading: 'Operation and Maintenance Manual',
    content: (
      <>
        <p>
          An Operation and Maintenance (O&M) manual is a document that explains how to use and
          maintain the electrical installation safely. While not always required by BS 7671 (which
          focuses on the certificate and test results), an O&M manual is considered best practice
          for all significant installations and is often required by the client specification for
          commercial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>System description</strong> -- a plain-language overview of the electrical
                installation: what systems are installed, where the main components are located, and
                how they work together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operating instructions</strong> -- how to operate each system safely. This
                includes consumer unit operation, lighting controls, emergency lighting test
                procedures, fire alarm operation and weekly test procedure, and any specialist
                systems (EV charger, solar PV inverter).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance requirements</strong> -- what routine maintenance the client is
                responsible for (monthly{' '}
                <SEOInternalLink href="/guides/emergency-lighting-certificate">
                  emergency lighting
                </SEOInternalLink>{' '}
                function tests, quarterly RCD tests, keeping ventilation clear around distribution
                boards) and what requires a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency procedures</strong> -- what to do in a power failure, how to
                isolate individual circuits or the entire installation, when to call an electrician
                versus when to contact the distribution network operator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact details</strong> -- the installing contractor's contact information
                for maintenance, callouts, and warranty queries.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic work, the O&M manual can be a simple document of 2 to 4 pages. For larger
          commercial installations, it may run to dozens of pages including product data sheets,
          commissioning records, and specialist system manuals. The key is that it should be written
          for the intended reader -- a non-technical building owner or facilities manager, not a
          qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'as-built-drawings',
    heading: 'As-Built Drawings and Cable Schedules',
    content: (
      <>
        <p>
          As-built drawings record the actual installation as constructed, which may differ from the
          original design drawings. Cable routes may have been changed during installation due to
          unforeseen obstructions, additional circuits may have been added, or the distribution
          board layout may have been altered. As-built drawings capture the reality.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable route drawings</strong> -- showing where cables are routed through the
                building, particularly within walls, floors, and ceilings. This information is
                critical for future work -- it prevents cables being damaged by drilling, nailing,
                or cutting into surfaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board schedule</strong> -- a circuit chart showing every way in
                the distribution board, the circuit designation, the protective device type and
                rating, the cable size and type, and the circuit it supplies. This should be
                displayed inside the consumer unit or distribution board enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable schedule</strong> -- a table listing every cable in the installation
                with its reference, type, size, route, length, and the circuit it serves. Essential
                for commercial installations and larger domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schematic diagrams</strong> -- single-line diagrams showing the distribution
                architecture from the incoming supply through the main switch to individual
                distribution boards and circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic work, a distribution board schedule and basic cable route information is
          usually sufficient. For commercial work, the full suite of as-built drawings is typically
          a contract requirement and must be provided in the specified format (often both printed
          and digital). These drawings become part of the building's permanent record and will be
          used by every electrician who works on the installation in the future.
        </p>
      </>
    ),
  },
  {
    id: 'warranty-info',
    heading: 'Warranty and Product Information',
    content: (
      <>
        <p>
          Every significant component installed should be accompanied by the manufacturer's product
          data sheet, installation instructions, and warranty information. This is often overlooked
          but is an important part of the handover package.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units and distribution boards</strong> -- manufacturer, model, type
                test certification, and warranty terms. Most quality consumer units carry a 5 to 10
                year manufacturer warranty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective devices</strong> -- MCBs, RCBOs, AFDDs, SPDs. Record the
                manufacturer, model, rating, and type. This information is essential for future
                maintenance and replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist equipment</strong> -- EV chargers, solar PV inverters, battery
                storage systems, smart home controllers. These items typically have specific
                warranty registration requirements and the client needs the product information to
                register the warranty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light fittings and controls</strong> -- particularly LED drivers (which have
                a finite lifespan), dimming systems, and emergency lighting units. Record the
                replacement lamp or driver details for future maintenance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Organising warranty information at handover prevents the common scenario where a component
          fails after 3 years and neither the client nor the electrician can find the warranty
          details. A well-organised handover package with all warranty information in one place is a
          hallmark of a professional electrician.
        </p>
      </>
    ),
  },
  {
    id: 'building-regulations',
    heading: 'Building Regulations Compliance',
    content: (
      <>
        <p>
          For notifiable electrical work in England and Wales, compliance with Part P of the
          Building Regulations must be demonstrated at handover. The route to compliance depends on
          how the work is certified:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme route</strong> -- the most common route. The
                electrician is registered with NICEIC, NAPIT, ELECSA, or another approved scheme.
                The scheme certifies the work and notifies the local authority building control on
                the electrician's behalf. The client receives a Building Regulations Compliance
                Certificate from the scheme. This certificate is essential for the client's property
                records and must be provided at handover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> -- if the electrician is not registered with
                a competent person scheme, the work must be notified to local authority building
                control before it starts. Building control will inspect the work and, if satisfied,
                issue a Building Regulations Completion Certificate. This route is slower and more
                expensive (building control fees apply) but is the only option for non-scheme
                electricians doing notifiable work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Building Regulations Compliance Certificate is a separate document from the EIC. The
          EIC certifies compliance with BS 7671 (the Wiring Regulations). The Building Regulations
          certificate certifies compliance with the Building Regulations (which reference BS 7671
          but also cover other matters such as fire safety, energy efficiency, and accessibility).
          Both documents should be provided at handover.
        </p>
        <p>
          Missing Building Regulations certificates can cause serious problems when the property is
          sold. Conveyancing solicitors will check for evidence of compliance for any electrical
          work carried out since 2005 (when Part P was introduced). Missing certificates can delay
          or derail property transactions and may require indemnity insurance to proceed.
        </p>
      </>
    ),
  },
  {
    id: 'common-failures',
    heading: 'Common Handover Documentation Failures',
    content: (
      <>
        <p>
          Even experienced electricians sometimes fall short on handover documentation. Here are the
          most common failures and how to avoid them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No certificate issued</strong> -- the most basic failure. The work is
                completed but no EIC or MEIWC is provided. This is a breach of BS 7671 and, for
                notifiable work, a breach of Building Regulations. Always issue the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete test results</strong> -- missing values, blank fields, or test
                results that do not cover all circuits. Every circuit must have a complete set of
                test results recorded on the schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Late documentation</strong> -- promising to "send the certificate later" and
                then forgetting. Documentation should be completed on site or within 24 hours. Late
                certificates suggest disorganisation and reduce client confidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No Building Regulations notification</strong> -- completing notifiable work
                without notifying through the scheme or building control. This creates a compliance
                gap that can surface years later when the property is sold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No user instructions</strong> -- leaving the client with no guidance on how
                to operate the new installation, when to test RCDs, or what to do in an emergency. A
                brief user guide takes 10 minutes to prepare and makes a significant difference to
                the client experience.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each of these failures is preventable with a systematic approach to handover. Create a
          handover checklist that you work through on every job, and use digital tools that prompt
          you through the documentation process so nothing gets missed.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-handover',
    heading: 'Elec-Mate for Handover Documentation',
    content: (
      <>
        <p>
          Elec-Mate streamlines the entire handover documentation process, ensuring every
          certificate is complete, every test result is recorded, and the client receives a
          professional handover package on the day the work is finished:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and MEIWC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the full Electrical Installation Certificate or Minor Works Certificate
                  on site. AI-assisted data entry validates test results as you enter them, flagging
                  any values outside permitted limits before you sign the certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Schedule of Test Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter test results for each circuit and Elec-Mate generates the complete schedule
                  automatically. Board scanner reads the distribution board layout from a photo,
                  populating circuit details in seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Send to Client from Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Export the complete handover package as a professional PDF and send it to the
                  client by email or WhatsApp before you leave site. Include the certificate, test
                  results, circuit schedule, and invoice in one package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Every certificate is stored securely in the cloud with full search and retrieval
          capability. Pull up any certificate from any job, any time. Your handover documentation is
          professional, complete, and always available.
        </p>
        <SEOAppBridge
          title="Professional Handover Documentation"
          description="EIC, MEIWC, test results, and circuit schedules completed on your phone. Send the complete handover package to the client from site. Professional PDFs that satisfy scheme assessors and clients alike."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalHandoverDocumentationPage() {
  return (
    <GuideTemplate
      title="Electrical Handover Documentation | What to Provide"
      description="Complete guide to electrical handover documentation. EIC, test results, O&M manual, as-built drawings, cable schedules, warranty info, and Building Regulations compliance. Professional handover with Elec-Mate."
      datePublished="2026-01-18"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          Electrical Handover Documentation:{' '}
          <span className="text-yellow-400">What to Provide</span>
        </>
      }
      heroSubtitle="Complete handover documentation is the hallmark of a professional electrician. This guide covers every document you should provide at handover: EIC, test results, O&M manual, as-built drawings, cable schedules, warranty information, and Building Regulations compliance certificates."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Handover Documentation"
      relatedPages={relatedPages}
      ctaHeading="Complete Handover Documentation on Your Phone"
      ctaSubheading="EIC, test results, circuit schedules, and professional PDFs. Complete the full handover package on site and send it to the client. 7-day free trial, cancel anytime."
    />
  );
}
