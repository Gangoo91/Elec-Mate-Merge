import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  ClipboardCheck,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Building2,
  Scale,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Electrical Handover Documentation Guide',
    href: '/guides/electrical-handover-documentation-guide',
  },
];

const tocItems = [
  { id: 'overview', label: 'Why Documentation Matters' },
  { id: 'which-certificate', label: 'EIC, EICR, or MEIWC — Which Applies?' },
  { id: 'eic', label: 'Electrical Installation Certificate (EIC)' },
  { id: 'eicr', label: 'Electrical Installation Condition Report (EICR)' },
  { id: 'meiwc', label: 'Minor Electrical Installation Works Certificate (MEIWC)' },
  { id: 'test-results', label: 'Test Results and Schedules' },
  { id: 'om-drawings', label: 'O&M Manuals and As-Built Drawings' },
  { id: 'building-regs', label: 'Building Regulations Completion Certificate' },
  { id: 'insurance-liability', label: 'Insurance, Property Sale, and Liability' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Three primary electrical certificates exist: the EIC (Electrical Installation Certificate) for new installations and new circuits, the EICR (Electrical Installation Condition Report) for existing installations, and the MEIWC (Minor Electrical Installation Works Certificate) for additions or alterations to existing circuits.',
  'The EIC and MEIWC are issued by the installer at completion; the EICR is issued by a qualified inspector assessing an existing installation. All three are based on the model forms in BS 7671 Appendix 6.',
  'O&M (Operation and Maintenance) manuals and as-built drawings are required for commercial projects and are best practice for significant domestic installations — they provide a permanent record of what was installed and how to maintain it.',
  'Building Regulations completion certificates (from building control or a competent person scheme) are separate from BS 7671 certificates but are equally important for property sale — they confirm the work complied with Part P.',
  'Missing or incomplete electrical documentation can prevent a property sale, invalidate insurance claims, and expose the electrician to liability for defects that cannot be linked to poor workmanship without a test result record.',
];

const faqs = [
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An EIC (Electrical Installation Certificate) is issued by the installer at the completion of a new electrical installation or when significant additions or alterations are made that include new circuits. It certifies that the installation has been designed, constructed, inspected, and tested in accordance with BS 7671, and includes the schedule of test results. An EICR (Electrical Installation Condition Report) is issued by a qualified inspector assessing an existing electrical installation. It identifies deficiencies and classifies them by severity (C1, C2, C3, and FI — further investigation). The EICR does not certify new work — it reports the condition of what is already there. The inspector does not warrant that the installation meets current standards (an older installation may predate current requirements) but reports its current condition and any safety concerns.',
  },
  {
    question: 'When should a MEIWC be issued instead of an EIC?',
    answer:
      'A Minor Electrical Installation Works Certificate (MEIWC) is appropriate for additions or alterations to an existing circuit that do not involve a new circuit. Examples include: adding a socket outlet or spur to an existing ring final circuit; replacing a light fitting or luminaire; installing an additional lighting point on an existing circuit; replacing a consumer unit without changing the circuits (though this is sometimes issued with an EIC); and replacing like-for-like accessories. A MEIWC is not appropriate where a new circuit is installed — in that case, an EIC must be issued for the new circuit. The MEIWC includes limited test results (continuity of the CPC at the point of work, and verification that the existing circuit protective devices are adequate for the work carried out).',
  },
  {
    question: 'What test results must be included with an EIC?',
    answer:
      'An EIC must be accompanied by the Schedule of Test Results (formerly called the Schedule of Circuit Details and Test Results). The schedule records, for each circuit: the circuit description, type and rating of protective device, type of wiring and conductor sizes, test results (ring continuity, continuity of CPC, insulation resistance, polarity, earth fault loop impedance Zs, and RCD operating time and current where applicable), and whether the results are within the acceptable limits. Without the schedule of test results, the EIC is incomplete. An EIC without test results does not demonstrate compliance with BS 7671 — the inspector cannot verify that the installation was tested or that it met the required values at the time of installation.',
  },
  {
    question: 'What does an O&M manual typically contain for an electrical installation?',
    answer:
      'An Operation and Maintenance (O&M) manual for an electrical installation typically contains: an installation overview and description of the system; a schedule of installed equipment (consumer units, distribution boards, isolators, specialist equipment) with make, model, and ratings; as-built drawings showing cable routes, distribution board layouts, and circuit arrangements; cable schedules listing each circuit with cable type, size, length, protection, and termination details; operating instructions for the electrical system and any specialist equipment (EV chargers, battery storage, solar PV, fire alarm panels, emergency lighting); maintenance schedules — what tests are required, how frequently, and by whom; emergency procedures (how to isolate the system, who to contact); and copies of all EICs, test certificates, and inspection records. For domestic installations, a simplified version (consumer unit chart, operating instructions, maintenance notes, and copies of certificates) is appropriate.',
  },
  {
    question: 'Is an as-built drawing required for a domestic electrical installation?',
    answer:
      'As-built drawings are not specifically required by BS 7671 for domestic installations (though the standard recommends that adequate documentation is provided). They are required for larger commercial and industrial installations. However, for domestic installations involving underground cables (garden circuits, outbuilding supplies), significant rewiring, or complex multi-circuit installations, an as-built drawing showing cable routes with accurate dimensions is extremely valuable. Without a cable route drawing, future owners or electricians have no record of where cables are buried — which creates a risk of accidental damage during building or garden work. Providing as-built documentation for domestic work is a mark of professionalism and is increasingly expected by customers.',
  },
  {
    question: 'What happens if an electrician fails to issue a certificate at completion?',
    answer:
      'Failure to issue an EIC or MEIWC at the completion of electrical work is a breach of BS 7671 (Part 6 requires that a certificate is issued on completion of a new installation or a significant alteration). For notifiable work under Part P, failure to issue the certificate also means the self-certification process is incomplete. The practical consequences for the electrician include: inability to demonstrate that the work met BS 7671 at the time of completion if a defect is later claimed; exposure to liability for defects that may have been present from the start; and professional reputational damage if the absence of a certificate is discovered during a property sale or insurance claim. The homeowner may also suffer delays on property sale if certificates cannot be produced for electrical work declared on the property information form.',
  },
  {
    question: 'How long should electrical certificates be kept?',
    answer:
      'Electrical certificates should be kept indefinitely. There is no statutory limitation period after which an electrical certificate becomes irrelevant — certificates can be requested at any time, including decades after the work was carried out. The most common triggers for producing old certificates are property sale (when the buyer requires evidence of compliance for work carried out during the seller\'s ownership) and insurance claims (where the insurer requires evidence that the installation was compliant at the time of installation). Electricians should also retain copies of all certificates they have issued — both for professional record-keeping and to protect themselves against future claims. Elec-Mate stores a copy of every certificate issued through the app, providing a permanent searchable record.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete Electrical Installation Condition Reports on your phone.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Issue MEIWCs for additions and alterations to existing circuits.',
    icon: FileText,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Building Regulations completion certificates — when they are required.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-work-notification-part-p',
    title: 'Electrical Work Notification Guide',
    description: 'How self-certification produces the Part P completion certificate.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-checks-new-home',
    title: 'Electrical Safety Checks for a New Home',
    description: 'What certificates to look for when buying a property.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Electrical Documentation Matters',
    content: (
      <>
        <p>
          Electrical certification and handover documentation serve three distinct purposes:
          safety, compliance, and evidence. Good documentation protects the homeowner by providing
          a record of what was installed and tested; it protects the electrician by demonstrating
          that the work met BS 7671 at the time of completion; and it enables future electricians
          and inspectors to understand the installation without having to guess or open up walls.
        </p>
        <p>
          Documentation requirements for electrical work in the UK come from multiple sources:
          BS 7671 (the IET Wiring Regulations) requires certificates for all new installations
          and significant alterations; Part P of the Building Regulations requires notification
          and certification for notifiable work in dwellings; the Electricity at Work Regulations
          1989 require that records of electrical work are maintained; and the Electrical Safety
          Standards in the Private Rented Sector (England) Regulations 2020 require 5-yearly
          EICRs for rented properties.
        </p>
        <p>
          When documentation is missing or incomplete, the consequences can be significant —
          delayed property sales, refused insurance claims, and difficulty establishing whether
          a defect was caused by the installation or by subsequent changes. Complete, accurate
          documentation is not a paperwork burden — it is professional practice that protects
          everyone.
        </p>
      </>
    ),
  },
  {
    id: 'which-certificate',
    heading: 'EIC, EICR, or MEIWC — Which Certificate Applies?',
    content: (
      <>
        <p>
          Choosing the correct certificate type is the first step. Using the wrong certificate
          (for example, a MEIWC for a new circuit installation) results in incomplete documentation
          that does not meet BS 7671 requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Situation</th>
                <th className="text-left py-3 font-semibold">Certificate Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4">New electrical installation (new build or full rewire)</td>
                <td className="py-3 font-semibold text-yellow-400">EIC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">New circuit added to existing installation</td>
                <td className="py-3 font-semibold text-yellow-400">EIC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Consumer unit replacement</td>
                <td className="py-3 font-semibold text-yellow-400">EIC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Addition to existing circuit (sockets, lighting points)</td>
                <td className="py-3 font-semibold text-blue-400">MEIWC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Like-for-like replacement of accessories</td>
                <td className="py-3 font-semibold text-blue-400">MEIWC (best practice)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Assessment of an existing installation</td>
                <td className="py-3 font-semibold text-green-400">EICR</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Periodic inspection of rented property (5-yearly)</td>
                <td className="py-3 font-semibold text-green-400">EICR</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Pre-purchase electrical assessment</td>
                <td className="py-3 font-semibold text-green-400">EICR</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          All three certificate types are based on model forms in BS 7671 Appendix 6. They must
          include the installer or inspector's details, their qualification and scheme membership,
          and their signature confirming the work complies (EIC/MEIWC) or confirming the condition
          reported is accurate (EICR).
        </p>
      </>
    ),
  },
  {
    id: 'eic',
    heading: 'Electrical Installation Certificate (EIC)',
    content: (
      <>
        <p>
          The Electrical Installation Certificate (EIC) is the primary document for new
          electrical installations and significant additions. It consists of three parts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Part 1 — Design</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Confirms that the electrical installation has been designed to comply with BS 7671.
                  Signed by the designer — who may be the same person as the installer for
                  straightforward domestic work, or a separate electrical engineer for complex
                  commercial or industrial installations.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Part 2 — Construction</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Confirms that the installation has been constructed to comply with BS 7671 and in
                  accordance with the design. Signed by the electrician who carried out the
                  installation. Includes details of the supply characteristics, earthing
                  arrangement, and main protective bonding.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Part 3 — Inspection and Testing</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Confirms that the completed installation has been inspected and tested in
                  accordance with Part 6 of BS 7671 and found to comply. Signed by the inspector.
                  Accompanied by the Schedule of Inspections and the Schedule of Test Results.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          The EIC must be issued to the person ordering the work (typically the homeowner or
          client) at the completion of the installation. The original is issued to the client;
          the installer retains a copy. For notifiable work under Part P, the self-certification
          certificate issued through the competent person scheme supplements but does not replace
          the EIC.
        </p>
        <SEOAppBridge
          title="Issue EICs on site from your phone"
          description="Elec-Mate's EIC Certificate app generates the full EIC with Schedule of Inspections and Schedule of Test Results on site. AI board scanning populates circuit details automatically. Issue the PDF to the client before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'Electrical Installation Condition Report (EICR)',
    content: (
      <>
        <p>
          The EICR reports the condition of an existing electrical installation at the time of
          inspection. Unlike the EIC (which certifies new work), the EICR does not certify
          compliance — it reports the condition found and identifies any deficiencies.
        </p>
        <p>
          The EICR classifies deficiencies as:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1 shrink-0 mt-0.5">C1</span>
              <span>
                <strong>Danger present</strong> — risk of injury. Immediate remedial action required.
                The inspector should advise that the affected equipment or circuit is disconnected
                before the report is concluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white text-xs font-bold rounded px-2 py-1 shrink-0 mt-0.5">C2</span>
              <span>
                <strong>Potentially dangerous</strong> — urgent remedial action required. Not
                immediately dangerous but could become so. Should be remediated as soon as possible
                and within 28 days in the private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-yellow-500 text-black text-xs font-bold rounded px-2 py-1 shrink-0 mt-0.5">C3</span>
              <span>
                <strong>Improvement recommended</strong> — not dangerous but does not meet current
                standards. The installation would benefit from improvement. Not a pass/fail issue
                but should be addressed in time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-xs font-bold rounded px-2 py-1 shrink-0 mt-0.5">FI</span>
              <span>
                <strong>Further investigation</strong> — the inspector was unable to verify the
                condition of a part of the installation during the inspection. Further investigation
                is required before an overall assessment can be made.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR concludes with an overall assessment: <strong>Satisfactory</strong> (no C1 or
          C2 deficiencies — the installation is in an adequate condition for continued service) or{' '}
          <strong>Unsatisfactory</strong> (C1 or C2 deficiencies present — remediation required).
          A Satisfactory EICR is valid for the recommended period stated in the report (typically
          5 years for rented properties, 10 years for owner-occupied dwellings).
        </p>
      </>
    ),
  },
  {
    id: 'meiwc',
    heading: 'Minor Electrical Installation Works Certificate (MEIWC)',
    content: (
      <>
        <p>
          The MEIWC (sometimes called a Minor Works Certificate or MWC) is the appropriate
          certificate for additions and alterations to existing circuits that do not include
          a new circuit. It is a simplified version of the EIC, designed for minor works that
          are too significant to leave undocumented but do not warrant the full EIC process.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to use:</strong> adding socket outlets to an existing ring final
                circuit; adding lighting points to an existing lighting circuit; replacing a
                broken or damaged accessory; installing a fused spur from an existing circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When NOT to use:</strong> when a new circuit is installed from the consumer
                unit; when the consumer unit is modified or replaced; for work in special locations
                (bathrooms) beyond like-for-like replacement. An EIC is required in these cases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it includes:</strong> description of the work; circuit to which the
                work relates; confirmation that the existing circuit protective device is adequate
                for the modified circuit; continuity of CPC at the point of work; confirmation
                that the polarity is correct; and the test results relevant to the work carried out.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Issue the{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          on site and provide it to the client before leaving. Even for non-notifiable work, the
          MEIWC provides the client with a record of what was done and demonstrates that the
          work was carried out by a qualified electrician and tested at completion.
        </p>
      </>
    ),
  },
  {
    id: 'test-results',
    heading: 'Test Results and Schedules',
    content: (
      <>
        <p>
          The Schedule of Test Results is a mandatory companion to the EIC. It records the
          actual measured values from the inspection and testing of each circuit, allowing future
          inspectors to compare current values with the installation values and identify
          deterioration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Ring continuity (r1 + r2, r1 + rn):</strong> confirms the ring is complete and measures conductor resistance</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Continuity of protective conductors (R1 + R2):</strong> confirms earth continuity to each outlet</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Insulation resistance:</strong> L-E and N-E at 500V DC, minimum 1 megohm (confirms no insulation faults)</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Polarity:</strong> confirms live and neutral are correctly connected at all outlets</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Earth fault loop impedance (Zs):</strong> confirms that the protective device will disconnect within the required time in the event of a fault</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>RCD test results:</strong> operating time at I∆n and 5×I∆n, confirms RCD will operate within 300ms at rated current</span>
            </li>
          </ul>
        </div>
        <p>
          Test results must be recorded with the actual measured values — not simply a pass/fail
          notation. Recording actual values allows future comparison and demonstrates that the
          testing was actually carried out (rather than simply signed off without testing).
          BS 7671 Appendix 6 specifies the required test result schedule format.
        </p>
      </>
    ),
  },
  {
    id: 'om-drawings',
    heading: 'O&M Manuals and As-Built Drawings',
    content: (
      <>
        <p>
          O&M (Operation and Maintenance) manuals and as-built drawings are required for commercial
          electrical installations and are increasingly expected for significant domestic work.
          They provide the client with a permanent record of the installation that supports safe
          operation, maintenance, and future modification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">O&M Manual Contents</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>System description and overview</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Schedule of installed equipment (make, model, ratings)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Operating instructions for the electrical system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Maintenance schedule — frequency and nature of checks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Emergency procedures — isolation points and contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Copies of all EICs and test certificates</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">As-Built Drawing Contents</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Floor plans showing cable routes with dimensions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Consumer unit / distribution board layouts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Single-line diagrams for complex installations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Buried cable routes for outdoor and garden circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Earthing and bonding arrangement diagram</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Cable schedule — circuit, cable type, size, length</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          For domestic installations, a simplified as-built record — a hand-drawn or digital plan
          showing the consumer unit circuit layout, cable routes for buried cables, and the
          location of buried cable joints — is extremely valuable and takes little time to produce.
          It can save the client significant cost if they need to extend the installation in the
          future or avoid damaging cables during building work.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations Completion Certificate',
    content: (
      <>
        <p>
          For notifiable electrical work in dwellings, a Building Regulations completion certificate
          (or its equivalent) is required in addition to the BS 7671 electrical certificates. These
          are separate documents serving different purposes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Building control completion certificate</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Issued by the local authority building control department after inspecting the
                  completed notifiable work. Confirms that the work complies with Part P of the
                  Building Regulations. Required where the electrician is not registered with a
                  competent person scheme.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Competent person scheme self-certification certificate</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Issued by the electrician as a member of an approved scheme (NICEIC, NAPIT,
                  ELECSA, etc.) immediately on completion of the work. Serves the same function
                  as the building control completion certificate — confirms Part P compliance —
                  but is issued faster and without involving building control.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Both documents should be retained by the homeowner indefinitely alongside the BS 7671
          certificates (EIC or MEIWC). The Building Regulations certificate addresses the
          regulatory compliance question ("was this work notified and inspected?"); the BS 7671
          certificate addresses the technical compliance question ("was this work designed and
          installed to the Wiring Regulations standard?"). Both are needed for a complete
          documentation set.
        </p>
      </>
    ),
  },
  {
    id: 'insurance-liability',
    heading: 'Insurance, Property Sale, and Liability',
    content: (
      <>
        <p>
          The practical importance of complete electrical documentation becomes most apparent in
          three situations: an insurance claim following electrical damage or fire, a property sale,
          and a dispute about the quality of electrical work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Insurance claims</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Home insurance policies typically require that electrical work is carried out
                  by qualified persons in accordance with Building Regulations. An insurer
                  investigating a claim following an electrical fire will ask for evidence of
                  compliance — the EIC, test results, and Part P certificate. Absence of
                  documentation may result in the claim being rejected on the grounds that the
                  homeowner failed to comply with their policy conditions.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Property sale</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Buyers' solicitors request evidence of Building Regulations compliance for all
                  notifiable electrical work. Without a certificate, the sale may be delayed,
                  the buyer may require an indemnity policy, or the price may be renegotiated.
                  Certificates from all notifiable work carried out during the seller's ownership
                  should be retained and disclosed.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Electrician liability</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  An EIC with full test results provides the electrician with evidence that the
                  installation was correctly tested and met the required values at the time of
                  completion. Without test results, if a defect is later identified, it is
                  impossible to establish whether the defect existed at installation or developed
                  subsequently. Test result records are the electrician's best defence against
                  unfounded liability claims.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Completing Documentation on Every Job',
    content: (
      <>
        <p>
          The best practice is to complete the relevant certificate on site at the end of every
          job, and issue it to the client before leaving. This makes documentation a routine part
          of the job workflow rather than a paperwork task that accumulates and gets delayed.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site. AI board scanning populates the schedule of circuits. Voice entry for
                  test results. PDF issued to the client before you leave and stored permanently
                  in your Elec-Mate account.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Electrical Installation Condition Reports
                  </SEOInternalLink>{' '}
                  on site with AI-assisted inspection guidance, deficiency classification, and
                  instant professional PDF. Every EICR stored in your account for future reference.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Electrical Installation Works Certificate
                  </SEOInternalLink>{' '}
                  for every addition and alteration to an existing circuit. Even for non-notifiable
                  work, the MEIWC protects both you and the client.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Never leave a job without the certificate"
          description="Elec-Mate automatically prompts you to issue the correct certificate at the end of every job — EIC, EICR, or Minor Works. All certificates stored permanently. Issue the PDF to the client on site. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalHandoverDocumentationGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Handover Documentation Guide | EIC, EICR, MEIWC, Part P"
      description="Complete guide to electrical handover documentation requirements. When to use EIC, EICR, or MEIWC, what test results must be recorded, O&M manuals and as-built drawings for commercial work, Building Regulations completion certificates, and why documentation matters for insurance, property sale, and electrician liability."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Documentation Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          Electrical Handover Documentation:{' '}
          <span className="text-yellow-400">EIC, EICR, MEIWC, and Building Regulations</span>
        </>
      }
      heroSubtitle="Complete electrical documentation — the right certificate for the right job, full test results, O&M manuals, and Building Regulations certificates — protects the homeowner, the electrician, and the integrity of the installation. This guide covers every document required at handover and why it matters."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Handover Documentation"
      relatedPages={relatedPages}
      ctaHeading="Issue Every Certificate On Site, Every Time"
      ctaSubheading="Elec-Mate prompts you to issue the correct electrical certificate — EIC, EICR, or Minor Works — at the end of every job. AI-assisted, instant PDF, permanently stored. Professional documentation done before you leave. 7-day free trial."
    />
  );
}
