import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  FileText,
  Search,
  BookOpen,
  ClipboardCheck,
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'EICR vs EIC', href: '/guides/eicr-vs-eic-difference' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'what-is-eic', label: 'What Is an EIC?' },
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'key-differences', label: 'Key Differences' },
  { id: 'common-confusion', label: 'Common Confusion Points' },
  { id: 'which-do-i-need', label: 'Which Do I Need?' },
  { id: 'elecmate-certificates', label: 'Both Forms in Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EIC (Electrical Installation Certificate) is issued after new installation work or new circuits are installed. An EICR (Electrical Installation Condition Report) is for periodic inspection of existing installations.',
  'The EIC has three signature blocks (designer, constructor, inspector). The EICR has a single inspector declaration with an optional reviewer signature.',
  'Observation codes (C1, C2, C3, FI) only appear on an EICR. An EIC should have no defects — the work must comply with BS 7671 before it is signed off.',
  'Landlords in England need an EICR every 5 years (legal requirement since April 2021). An EIC is issued once, when the work is completed.',
  'Elec-Mate has both the EIC and EICR forms built in — plus 6 other certificate types. Switch between them in seconds.',
];

const faqs = [
  {
    question: 'Can I issue an EIC instead of an EICR for a periodic inspection?',
    answer:
      'No. An EIC is exclusively for new installation work or the installation of new circuits. It is not appropriate for periodic inspection and testing of an existing installation. If you have been asked to inspect an existing installation that you did not install, the correct document is an EICR. The only time you would issue an EIC for existing work is if you are carrying out a significant alteration that involves installing new circuits — and in that case, the EIC covers the new work only, not the condition of the rest of the installation. If the client also wants the existing installation assessed, a separate EICR is needed.',
  },
  {
    question: 'Does an EIC expire or need to be renewed?',
    answer:
      'An EIC does not expire in the same way an EICR does. It is a one-time declaration that the new installation work complies with BS 7671 at the time of completion. There is no legal requirement to renew it. However, the installation itself will need periodic inspection and testing in the future, which is when an EICR comes into play. The recommended interval for the first periodic inspection is typically set by the original installer on the EIC — for a domestic installation, this is usually 10 years. For rented properties, an EICR is required every 5 years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, regardless of when the EIC was issued.',
  },
  {
    question: 'Who can sign an EIC and who can sign an EICR?',
    answer:
      'An EIC requires up to three signatures: the designer (who designed the installation), the constructor (who built it), and the inspector (who inspected and tested it). One person can fulfil all three roles and sign in all three places. An EICR requires the signature of the inspector who carried out the periodic inspection and testing. There is also an optional reviewer signature, which is used when a more experienced person reviews the report before it is issued. Both documents must be signed by a competent person — someone who holds the appropriate qualifications (typically the 18th Edition qualification, C&G 2382, plus an inspection and testing qualification such as C&G 2391) and has sufficient experience.',
  },
  {
    question: 'Do observation codes apply to both EIC and EICR?',
    answer:
      'No. Observation codes (C1 — Danger Present, C2 — Potentially Dangerous, C3 — Improvement Recommended, FI — Further Investigation) are used exclusively on the EICR. They classify defects found during periodic inspection of an existing installation. An EIC should not contain observation codes because it certifies that new work has been completed to the current standard. If defects are found during the final inspection and testing of new work, they must be rectified before the EIC is issued — the certificate is a declaration of compliance, not a condition report.',
  },
  {
    question: 'What happens if I issue the wrong certificate for the work?',
    answer:
      'Issuing the wrong certificate is a compliance failure that can have consequences. If you issue a Minor Works certificate when a full EIC is required (because new circuits were installed), or if you issue an EIC when an EICR is the appropriate document, your competent person scheme provider may flag it during a scheme inspection. This can result in remedial action, additional monitoring of your work, or in serious cases, suspension or termination of your scheme membership. It can also create legal complications — for example, if a landlord presents an EIC when they need an EICR to comply with the Electrical Safety Standards regulations, they may face penalties. Always match the certificate to the work.',
  },
  {
    question: 'Can I use one app for both EIC and EICR certificates?',
    answer:
      'Yes. Elec-Mate includes both the EIC and EICR forms, along with 6 other certificate types (Minor Works, Emergency Lighting, Fire Alarm, PAT Testing, EV Charger, and Solar PV). All forms follow the BS 7671 Appendix 6 model form structure. You can switch between certificate types in seconds, and all certificates include digital signatures, auto-validation of test results, and professional PDF export. This means you carry one app instead of multiple paper pads or separate desktop programs for each certificate type.',
  },
];

const relatedPages = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create digital Electrical Installation Condition Reports on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Digital Electrical Installation Certificates for new work and alterations.',
    icon: FileText,
    category: 'Certificate',
  },
  {
    href: '/guides/minor-works-vs-eic',
    title: 'Minor Works vs EIC',
    description: 'When to use a Minor Works certificate and when a full EIC is required.',
    icon: ArrowLeftRight,
    category: 'Guide',
  },
  {
    href: '/guides/unsatisfactory-eicr-what-next',
    title: 'Unsatisfactory EICR — What Next?',
    description:
      'What happens when an EICR comes back unsatisfactory. Landlord duties and remedial steps.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'Complete guide to C1, C2, C3, and FI classification codes on the EICR.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'All 8 certificate types explained — when to use each one.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'EICR vs EIC — What Is the Difference?',
    content: (
      <>
        <p>
          The EICR and EIC are two of the most commonly used electrical certificates in the UK, and
          they are frequently confused — especially by clients, landlords, and property managers.
          Despite the similar abbreviations, they serve entirely different purposes and are used at
          different stages of an installation's life.
        </p>
        <p>
          The simplest way to understand the difference: an <strong>EIC</strong> (Electrical
          Installation Certificate) is issued when <strong>new work</strong> is completed. An{' '}
          <strong>EICR</strong> (Electrical Installation Condition Report) is issued when an{' '}
          <strong>existing installation</strong> is inspected. One looks forward (certifying new
          work meets the standard), the other looks back (reporting on the condition of what is
          already there).
        </p>
        <p>
          Both documents are defined by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3) and follow the model forms in
          Appendix 6 of the standard. Both require the person signing to be competent — holding the
          appropriate qualifications and having sufficient experience for the type of work or
          inspection being carried out.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-eic',
    heading: 'What Is an EIC (Electrical Installation Certificate)?',
    content: (
      <>
        <p>
          An Electrical Installation Certificate (EIC) is the formal document issued upon completion
          of a new electrical installation or the installation of new circuits. It is required by BS
          7671 Regulation 631.1, which states that an EIC shall be provided upon completion of the
          verification of a new installation or an addition or alteration to an existing
          installation that includes new circuits.
        </p>
        <p>
          The EIC is a <strong>declaration of compliance</strong>. By signing it, the responsible
          persons are declaring that the work has been designed, constructed, inspected, and tested
          in accordance with BS 7671. This means any defects or non-compliances must be rectified{' '}
          <strong>before</strong> the certificate is signed. You cannot issue an EIC with
          outstanding defects — that would contradict the declaration of compliance.
        </p>
        <p>The EIC has three distinct signature blocks:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>The Designer</strong> — declares the installation was designed to comply with BS
            7671
          </li>
          <li>
            <strong>The Constructor</strong> — declares the installation was built in accordance
            with the design
          </li>
          <li>
            <strong>The Inspector</strong> — declares the installation has been inspected and tested
            and the results confirm compliance
          </li>
        </ul>
        <p>
          On most domestic jobs, one electrician fulfils all three roles and signs in all three
          places. On larger commercial projects, these roles may be split between different
          individuals or firms.
        </p>
        <p>
          An EIC is accompanied by a Schedule of Inspections (visual checks) and a Schedule of Test
          Results for every circuit, recording continuity, insulation resistance, polarity, earth
          fault loop impedance, prospective fault current, and RCD operating times.
        </p>
        <SEOAppBridge
          title="Create EIC Certificates on Your Phone"
          description="Elec-Mate has the full EIC form with all three signature blocks, schedule of inspections, and schedule of test results. Auto-validates results against BS 7671 limits as you enter them."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'what-is-eicr',
    heading: 'What Is an EICR (Electrical Installation Condition Report)?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is the formal document produced
          following a periodic inspection and testing of an existing electrical installation. It
          replaced the older Periodic Inspection Report (PIR) when BS 7671:2018 was published. The
          EICR reports on the <strong>condition of the installation as found</strong> — it is not a
          declaration of compliance, but a condition assessment.
        </p>
        <p>
          The EICR uses{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          to classify any defects or departures from the standard:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>C1</strong> — Danger Present (immediate remedial action required)
          </li>
          <li>
            <strong>C2</strong> — Potentially Dangerous (urgent remedial action required)
          </li>
          <li>
            <strong>C3</strong> — Improvement Recommended (not dangerous, but does not meet current
            standard)
          </li>
          <li>
            <strong>FI</strong> — Further Investigation (could not fully assess — more investigation
            needed)
          </li>
        </ul>
        <p>
          The overall assessment is either <strong>Satisfactory</strong> (no C1 or C2 codes present)
          or <strong>Unsatisfactory</strong> (one or more C1 or C2 codes present). For{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlords in England</SEOInternalLink>,
          an unsatisfactory EICR triggers a legal obligation to complete remedial work within 28
          days, with penalties of up to 30,000 pounds for non-compliance.
        </p>
        <p>
          The EICR has a single inspector declaration, with an optional reviewer signature for
          situations where a more experienced person reviews the report. This is simpler than the
          EIC's three-signature structure because the EICR is produced by one inspector (or one
          inspector plus a reviewer), whereas the EIC may involve separate persons for design,
          construction, and inspection.
        </p>
        <SEOAppBridge
          title="EICR with Auto Overall Assessment"
          description="Elec-Mate automatically determines whether the EICR is Satisfactory or Unsatisfactory based on the observation codes you enter. The moment a C1 or C2 is added, it flips to Unsatisfactory — no manual tracking needed."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'key-differences',
    heading: 'Key Differences Between EIC and EICR',
    content: (
      <>
        <p>
          Understanding the structural and practical differences between the EIC and EICR is
          essential for choosing the right certificate and completing it correctly. Here is a
          side-by-side comparison.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden overflow-x-auto my-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-sm font-semibold text-white">Aspect</th>
                <th className="p-4 text-sm font-semibold text-yellow-400">EIC</th>
                <th className="p-4 text-sm font-semibold text-yellow-400">EICR</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  aspect: 'Purpose',
                  eic: 'Certify new work complies with BS 7671',
                  eicr: 'Report on condition of existing installation',
                },
                {
                  aspect: 'When issued',
                  eic: 'On completion of new installation or new circuits',
                  eicr: 'During periodic inspection of existing installation',
                },
                {
                  aspect: 'Signatures',
                  eic: 'Three: Designer, Constructor, Inspector',
                  eicr: 'One: Inspector (+ optional Reviewer)',
                },
                {
                  aspect: 'Observation codes',
                  eic: 'Not used — defects must be fixed before signing',
                  eicr: 'C1, C2, C3, FI classification codes',
                },
                {
                  aspect: 'Overall assessment',
                  eic: 'N/A — the certificate IS the declaration of compliance',
                  eicr: 'Satisfactory or Unsatisfactory',
                },
                {
                  aspect: 'Renewal required',
                  eic: 'No — issued once for the work',
                  eicr: 'Yes — periodic intervals (5 years rented, 10 years owner-occupied)',
                },
                {
                  aspect: 'Legal requirement',
                  eic: 'BS 7671 Regulation 631.1',
                  eicr: 'BS 7671 Regulation 631.3 + Electrical Safety Standards Regs 2020 for landlords',
                },
                {
                  aspect: 'Part P notification',
                  eic: 'Yes — new circuits in dwellings are notifiable',
                  eicr: 'Not applicable — not new work',
                },
              ].map((row, index) => (
                <tr key={row.aspect} className={index < 7 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm font-medium text-white">{row.aspect}</td>
                  <td className="p-4 text-sm text-white">{row.eic}</td>
                  <td className="p-4 text-sm text-white">{row.eicr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The fundamental distinction is clear: the EIC certifies that new work is compliant. The
          EICR reports on whether existing work remains in a safe condition. One looks at what has
          just been done. The other looks at what was done years ago and assesses whether it is
          still safe.
        </p>
      </>
    ),
  },
  {
    id: 'common-confusion',
    heading: 'Common Confusion Points',
    content: (
      <>
        <p>
          Several situations regularly cause confusion about which certificate to use. Here are the
          most common scenarios and the correct approach for each.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Consumer unit replacement</h3>
                <p className="text-white text-sm leading-relaxed">
                  Replacing a consumer unit on existing circuits is an alteration, not a new
                  installation. Most contractors issue a{' '}
                  <SEOInternalLink href="/guides/minor-works-vs-eic">
                    Minor Works certificate
                  </SEOInternalLink>{' '}
                  for each circuit (or one per board), though some scheme providers prefer an EIC.
                  It is <strong>not</strong> an EICR — you are certifying your own work, not
                  reporting on the condition of the existing installation. Check with your
                  registration body for their preferred approach.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">New circuits plus periodic inspection</h3>
                <p className="text-white text-sm leading-relaxed">
                  If a client asks you to install new circuits and also inspect the existing
                  installation, you need both documents: an EIC for the new circuits and a separate
                  EICR for the periodic inspection of the existing installation. They are two
                  different pieces of work requiring two different certificates.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Rewire of an entire property</h3>
                <p className="text-white text-sm leading-relaxed">
                  A full rewire is a new installation. It requires an EIC, not an EICR. Even though
                  the property existed before, you are installing entirely new circuits, which means
                  the EIC is the correct document. Some contractors also carry out an informal
                  assessment of any retained elements (such as the incoming supply), but the
                  certificate for the rewire itself is an EIC.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Landlord asks for "an electrical certificate"
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Landlords often request "an electrical certificate" without specifying which one.
                  In almost every case, what they need is an EICR — the periodic inspection report
                  that satisfies the Electrical Safety Standards in the Private Rented Sector
                  (England) Regulations 2020. An EIC is only relevant if new work has been carried
                  out. Always clarify with the client what they actually need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'which-do-i-need',
    heading: 'Which Certificate Do I Need?',
    content: (
      <>
        <p>Use this simple decision flow to determine the correct certificate for the work.</p>
        <div className="space-y-3 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Are you installing new circuits?</h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes → Issue an <strong>EIC</strong>. This includes rewires, new builds, extensions
                  with new circuits, new dedicated circuits for showers, cookers, EV chargers, or
                  any work that involves running a new cable from the distribution board with a new
                  protective device.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Are you altering an existing circuit without adding a new one?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes → Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works certificate
                  </SEOInternalLink>
                  . This includes adding sockets to existing rings, extending lighting circuits, and
                  consumer unit replacements (on existing circuits).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Are you inspecting an existing installation you did not install?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes → Issue an <strong>EICR</strong>. This is the periodic inspection and testing
                  of the fixed installation. Required every 5 years for rented properties, every 10
                  years for owner-occupied, and at the intervals specified in IET Guidance Note 3
                  for commercial and industrial premises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-certificates',
    heading: 'Both EIC and EICR in Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate includes both the EIC and EICR forms — plus six other certificate types — in one
          app. All forms follow the BS 7671 Appendix 6 model form structure and include digital
          signatures, auto-validation of test results against BS 7671 limits, and professional PDF
          export.
        </p>
        <p>
          For the <strong>EIC</strong>, the app supports all three signature blocks (designer,
          constructor, inspector), the full schedule of inspections, and the complete schedule of
          test results. Values are validated against BS 7671 limits as you enter them, and the app
          flags incomplete fields before you sign off.
        </p>
        <p>
          For the <strong>EICR</strong>, the app includes smart observation coding with AI-powered
          defect classification, automatic overall assessment (the moment a C1 or C2 is added, it
          flips to Unsatisfactory), and a remedial works estimator that turns every defect into a
          priced quote. Hand the client the EICR report and a quote for the remedial work before you
          leave site.
        </p>
        <p>
          All 8 certificate types in Elec-Mate: EIC, Minor Works, EICR, Emergency Lighting, Fire
          Alarm, PAT Testing, EV Charger, and Solar PV. One subscription covers everything.
        </p>
        <SEOAppBridge
          title="8 Certificate Types in One App"
          description="Stop carrying multiple paper pads or paying for separate software for each certificate type. Elec-Mate has EIC, EICR, Minor Works, and 5 more — all with digital signatures, auto-validation, and PDF export. Switch between them in seconds."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

export default function EICRvsEICPage() {
  return (
    <GuideTemplate
      title="EICR vs EIC | What Is the Difference? | Elec-Mate"
      description="Clear comparison of EICR vs EIC certificates. When each is required, who signs them, what sections differ, and common confusion points. For UK electricians."
      datePublished="2025-03-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          EICR vs EIC — <span className="text-yellow-400">What Is the Difference?</span>
        </>
      }
      heroSubtitle="One certifies new work. The other reports on existing installations. They look similar on paper, but they serve completely different purposes. This guide explains when to use each, who signs them, what sections are different, and the most common mistakes electricians make when choosing between the two."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR vs EIC"
      relatedPages={relatedPages}
      ctaHeading="Both certificates in one app"
      ctaSubheading="Join 430+ UK electricians creating professional EIC and EICR certificates on their phones. 7-day free trial, cancel anytime."
    />
  );
}
