import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  FileText,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  PenTool,
  Zap,
  ListOrdered,
} from 'lucide-react';

export default function HowToFillInMinorWorksPage() {
  return (
    <GuideTemplate
      title="How to Fill In a Minor Works Certificate | Step by Step | Elec-Mate"
      description="Step-by-step guide to completing a Minor Works Certificate (BS 7671 Appendix 6). Every section explained — description of work, essential tests, next inspection date, and declaration. Common mistakes and real examples included."
      datePublished="2025-05-15"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        {
          label: 'How to Fill In a Minor Works Certificate',
          href: '/guides/how-to-fill-in-minor-works',
        },
      ]}
      tocItems={[
        { id: 'what-is-minor-works', label: 'What Is a Minor Works Certificate?' },
        { id: 'what-counts', label: 'What Counts as Minor Works?' },
        { id: 'part-1', label: 'Part 1 — Description of Work' },
        { id: 'part-2', label: 'Part 2 — Essential Tests' },
        { id: 'part-3', label: 'Part 3 — Next Inspection Date' },
        { id: 'part-4', label: 'Part 4 — Declaration & Signatures' },
        { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Step-by-Step Guide"
      badgeIcon={ListOrdered}
      heroTitle={
        <>
          How to Fill In a <span className="text-yellow-400">Minor Works Certificate</span>
        </>
      }
      heroSubtitle="A section-by-section walkthrough of the Minor Works Certificate. Covers every field — description of work, installation details, essential test results, next inspection date, and the declaration. Includes common mistakes and real examples of minor works."
      readingTime={12}
      keyTakeaways={[
        'A Minor Works Certificate is used for minor electrical work that does not involve a new circuit at the distribution board — such as adding a socket to an existing circuit, replacing accessories, or adding a fused spur.',
        'The certificate has four parts: description of work and installation details, essential test results, next inspection recommendation, and the declaration with signature.',
        'Five essential tests must be recorded: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance (Zs), and RCD operating time (if applicable).',
        'Common mistakes include using a Minor Works when an EIC is needed (e.g., consumer unit changes), leaving test result fields blank, and not providing a clear description of the work carried out.',
        'Elec-Mate auto-fills many fields on the Minor Works Certificate, validates test results against BS 7671, captures digital signatures, and exports a professional PDF instantly.',
      ]}
      sections={[
        {
          id: 'what-is-minor-works',
          heading: 'What Is a Minor Works Certificate?',
          content: (
            <>
              <p>
                A Minor Works Certificate is one of the three standard electrical certificates
                defined in BS 7671:2018+A3:2024 Appendix 6. It is the simplest of the three and is
                used to certify minor electrical work — work that does not involve the installation
                of a new circuit at the distribution board.
              </p>
              <p>
                The other two certificates are the{' '}
                <SEOInternalLink href="/guides/when-is-eic-required">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>
                , which is used for new circuits and major installation work, and the{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>, which is
                used for periodic inspection and testing of existing installations.
              </p>
              <p>
                The Minor Works Certificate is a single-page document that combines the description
                of work, the essential test results, and the declaration into a concise format.
                Despite its simplicity, it is a formal certification document — and completing it
                correctly is essential for professional standards and legal protection.
              </p>
            </>
          ),
        },
        {
          id: 'what-counts',
          heading: 'What Counts as Minor Works?',
          content: (
            <>
              <p>
                Minor works is defined as work that does not involve the installation of a new
                circuit. The work must be an addition or alteration to an existing circuit. Here are
                common examples:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-4">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Minor Works (Use Minor Works Cert)
                  </h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Adding a socket outlet to an existing ring or radial circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Adding a fused connection unit (spur) to an existing circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Replacing a consumer unit like-for-like in Scotland (different rules apply)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Adding an outdoor socket from an existing circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Relocating a light switch or socket on the same circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Adding a bathroom extractor fan to an existing lighting circuit</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <h3 className="font-bold text-red-400 text-lg mb-3">NOT Minor Works (Use EIC)</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Installing a new circuit from the distribution board</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Consumer unit replacement (England and Wales)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Full or partial rewire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>New circuit for an EV charger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Any new circuit for a kitchen, bathroom, or extension</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>New distribution board installation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                For a full comparison, see the{' '}
                <SEOInternalLink href="/guides/minor-works-vs-eic">
                  Minor Works vs EIC
                </SEOInternalLink>{' '}
                guide.
              </p>
            </>
          ),
        },
        {
          id: 'part-1',
          heading: 'Part 1 — Description of Work and Installation Details',
          content: (
            <>
              <p>
                Part 1 of the Minor Works Certificate is where you describe the work carried out and
                record the installation details. This section must be specific enough that another
                electrician reading the certificate would understand exactly what was done and
                where.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Fields to Complete</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Description of the minor works</strong> —
                      Write a clear, specific description. Not "fitted socket" but "Supplied and
                      installed 1 x double switched socket outlet on existing ring final circuit
                      (kitchen), fed from junction box in ceiling void above. 2.5mm2 T&E to BS
                      7211."
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Installation address</strong> — Full
                      address of the property where the work was carried out.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Earthing arrangement</strong> — Record the
                      earthing system: TN-S, TN-C-S (PME), or TT.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Protective device type and rating</strong>{' '}
                      — The MCB, RCBO, or fuse protecting the circuit you worked on, e.g., "32A Type
                      B MCB" or "20A RCBO Type A".
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Date of work</strong> — The date the work
                      was completed.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Auto-Fill Installation Details"
                description="Elec-Mate remembers site details — once you enter the installation address, earthing arrangement, and supply details for a property, they auto-fill on every future certificate for that address. Save time on every job."
                icon={Zap}
              />
            </>
          ),
        },
        {
          id: 'part-2',
          heading: 'Part 2 — Essential Tests',
          content: (
            <>
              <p>
                Part 2 is the most technically important section. You must record the results of the
                essential tests carried out on the circuit you worked on. Every test field must be
                completed — blank fields are a red flag for scheme providers and indicate either
                that the test was not done or the result was not recorded.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Continuity of Protective Conductors
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Measure the continuity of the circuit protective conductor (CPC) using a
                    low-resistance ohmmeter. Record the R1+R2 value in ohms. For a ring circuit, you
                    should also verify ring continuity. The value should be consistent with the
                    cable type and length — typical values for domestic circuits range from 0.1 to
                    1.5 ohms depending on cable size and length.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Insulation Resistance</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Test insulation resistance at 500V DC between live conductors and earth (L-E and
                    N-E), and between live conductors (L-N). The minimum acceptable value is 1.0
                    megohm, but readings below 2.0 megohms warrant investigation. Typical healthy
                    circuits read well above 100 megohms. Record the result in megohms. Ensure all
                    loads are disconnected and all switches are in the on position during the test.
                    For more detail, see the{' '}
                    <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                      insulation resistance testing guide
                    </SEOInternalLink>
                    .
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Polarity</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Verify correct polarity at the point of work. The line conductor must be
                    connected to the switch contact of single-pole switches and to the correct
                    terminal of socket outlets. Polarity can be confirmed using the R1+R2 continuity
                    test (by testing from the distribution board with known polarity) or with a
                    socket tester and a visual check. Record as "Confirmed" or "Correct".
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Earth Fault Loop Impedance (Zs)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Measure the earth fault loop impedance at the furthest point of the circuit or
                    at the point of work. Record the Zs value in ohms. This value must not exceed
                    the maximum permitted Zs for the protective device type and rating — for
                    example, a 32A Type B MCB has a maximum Zs of 1.37 ohms (at ambient temperature,
                    multiply the tabulated value by 0.8 to get the on-site limit: 1.37 x 0.8 = 1.10
                    ohms). Elec-Mate automatically checks your Zs values against the correct BS 7671
                    table.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">RCD Operating Time</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the circuit is protected by an RCD (or RCBO), test and record the operating
                    time. A 30 mA RCD must trip within 300 ms at rated residual current (1x) and
                    within 40 ms at five times rated residual current (5x = 150 mA). Record both the
                    1x and 5x results. If the circuit has no RCD protection, record "N/A" — do not
                    leave it blank.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Test Result Validation Against BS 7671"
                description="Enter your test results and Elec-Mate validates every value against BS 7671 maximum permitted limits. Zs values are checked against the correct table for the MCB or RCBO type and rating. Insulation resistance is verified. RCD times are checked. Errors are flagged before you leave site."
                icon={ShieldCheck}
              />
            </>
          ),
        },
        {
          id: 'part-3',
          heading: 'Part 3 — Next Inspection Date',
          content: (
            <>
              <p>
                Part 3 requires you to recommend a date for the next inspection of the installation.
                This is a recommendation, not a requirement — you are advising the client on when
                the installation should next be inspected and tested.
              </p>
              <p>The recommended intervals from IET Guidance Note 3 (GN3) are:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Domestic (owner-occupied)</strong> — 10
                      years
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Domestic (rented / HMO)</strong> — 5 years
                      (mandatory for private rented sector in England)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Commercial</strong> — 5 years
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Industrial</strong> — 3 years
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Swimming pools and special locations
                      </strong>{' '}
                      — 1 year
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                If the existing installation already has an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> with a
                recommended next inspection date, you should reference that date rather than setting
                a new one. The minor works you have carried out does not change the overall
                inspection interval for the installation.
              </p>
            </>
          ),
        },
        {
          id: 'part-4',
          heading: 'Part 4 — Declaration and Signatures',
          content: (
            <>
              <p>
                Part 4 is the declaration. By signing, you are certifying that the minor work
                described in Part 1 has been designed, constructed, inspected, and tested in
                accordance with BS 7671:2018+A3:2024, and that the work complies with the standard
                to the best of your knowledge and belief.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Declaration Fields</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Name</strong> — Your full name as the
                      person who carried out the work.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Signature</strong> — Your signature
                      certifying compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Contractor details</strong> — Your company
                      name, address, and scheme registration number (NICEIC, NAPIT, ELECSA, etc.).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Date</strong> — The date the work was
                      completed and tested.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Unlike the{' '}
                <SEOInternalLink href="/guides/when-is-eic-required">EIC</SEOInternalLink>, which
                has three separate signatures (design, construction, inspection and testing), the
                Minor Works Certificate has a single combined declaration. This reflects the simpler
                nature of the work — minor works is typically designed, installed, and tested by the
                same person.
              </p>
              <SEOAppBridge
                title="Digital Signatures — Sign on Your Phone"
                description="Elec-Mate captures your signature digitally on the screen of your phone or tablet. No paper, no scanning, no photographing wet signatures. The signature is embedded directly in the PDF certificate and stored securely in the cloud."
                icon={PenTool}
              />
            </>
          ),
        },
        {
          id: 'common-mistakes',
          heading: 'Common Mistakes to Avoid',
          content: (
            <>
              <p>
                Minor Works Certificates are simpler than EICs, but they still attract common
                errors. Scheme providers regularly flag the following issues during audits:
              </p>
              <div className="space-y-4 mt-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Using a Minor Works when an EIC is needed
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        The most common mistake. If the work involves a new circuit at the
                        distribution board, an EIC is required — not a Minor Works Certificate.
                        Consumer unit changes, new cooker circuits, new EV charger circuits, and new
                        circuits for extensions all require an EIC. Using the wrong certificate type
                        can result in rejection by the scheme provider and disciplinary action.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Leaving test result fields blank
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        Every test field must be completed. If a test is not applicable (for
                        example, RCD operating time on a circuit without RCD protection), record
                        "N/A" — do not leave the field blank. Blank fields suggest the test was not
                        carried out, which is a compliance issue.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Vague description of work</h3>
                      <p className="text-white text-sm leading-relaxed">
                        "Fitted socket" or "added spur" is not sufficient. Describe the work
                        precisely: what was installed, where it was installed, which circuit it was
                        connected to, the cable type and size used, and the method of connection
                        (junction box, spur from existing socket, etc.). A good description enables
                        another electrician to understand and verify the work from the certificate
                        alone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Not recording the protective device details
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        The type and rating of the protective device for the circuit must be
                        recorded. This is essential for verifying that the Zs value is within the
                        permitted maximum for that device. A Zs of 1.2 ohms might be acceptable for
                        one device but not another — without recording the device details, the test
                        result cannot be verified.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Not issuing the certificate to the client
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        BS 7671 requires that the certificate be given to the person ordering the
                        work. Completing a Minor Works Certificate and filing it in your own records
                        without providing a copy to the client does not meet the requirement.
                        Digital certificates make this easy — you can email or WhatsApp the PDF
                        before you leave site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
      howToHeading="How to Fill In a Minor Works Certificate — Step by Step"
      howToDescription="Follow these steps to complete a Minor Works Certificate correctly. Each step corresponds to a section of the BS 7671 Appendix 6 model form."
      howToSteps={[
        {
          name: 'Record the description of work and installation details',
          text: 'Write a clear, specific description of the work carried out — what was installed, where, on which circuit, using what cable type and size, and the method of connection. Record the installation address, the date of the work, the earthing arrangement (TN-S, TN-C-S, or TT), and the type and rating of the protective device for the circuit (e.g., 32A Type B MCB, 20A Type A RCBO).',
        },
        {
          name: 'Carry out and record the essential tests',
          text: 'Test and record: continuity of protective conductors (R1+R2 in ohms), insulation resistance at 500V DC (in megohms, minimum 1.0 megohm acceptable), polarity (confirmed correct), earth fault loop impedance Zs (in ohms, must not exceed the maximum permitted for the protective device), and RCD operating time (in milliseconds at 1x and 5x rated current, or N/A if no RCD). Use a calibrated multifunction tester.',
        },
        {
          name: 'Recommend the next inspection date',
          text: 'Enter the recommended date for the next periodic inspection. Refer to IET Guidance Note 3 for intervals: 10 years for owner-occupied domestic, 5 years for rented or commercial, 3 years for industrial. If the installation already has an EICR with a recommended next inspection date, reference that date.',
        },
        {
          name: 'Complete the declaration and sign',
          text: 'Enter your full name, company name, scheme registration number (NICEIC, NAPIT, ELECSA, etc.), and the date. Sign the declaration — by signing, you certify that the work has been designed, constructed, inspected, and tested in accordance with BS 7671:2018+A3:2024.',
        },
        {
          name: 'Issue the certificate to the client',
          text: 'Provide a copy of the completed Minor Works Certificate to the person who ordered the work. This is a requirement of BS 7671 Regulation 632.3. With Elec-Mate, you can export a professional PDF and email or WhatsApp it to the client before you leave site. Retain your own copy for at least six years.',
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between a Minor Works Certificate and an EIC?',
          answer:
            'The Minor Works Certificate is used for minor work that does not involve a new circuit at the distribution board — such as adding a socket to an existing circuit, replacing accessories, or adding a fused spur. The Electrical Installation Certificate (EIC) is used for all new installation work — new circuits, rewires, consumer unit changes, and any work that is notifiable under Part P of the Building Regulations. The EIC is a more comprehensive document with three separate declaration sections (design, construction, and inspection and testing) and a full schedule of test results for every circuit. The Minor Works Certificate has a single declaration and records test results only for the circuit worked on.',
        },
        {
          question: 'Do I need to record test instrument details on a Minor Works Certificate?',
          answer:
            'Yes. Although the Minor Works Certificate is simpler than the EIC, you should still record the make, model, serial number, and calibration due date of the test instruments used. Some competent person schemes require this on the certificate itself; others accept it in your records. Either way, having this information is essential because the validity of the test results depends on the instruments being calibrated. If the instruments are out of calibration, the results cannot be relied upon, and the certificate may be challenged. It is good practice to keep a log of instrument calibration dates and to include this information on every certificate.',
        },
        {
          question: 'Can I use a Minor Works Certificate for a consumer unit change?',
          answer:
            'No — not in England and Wales. Replacing a consumer unit is notifiable work under Part P of the Building Regulations and requires a full Electrical Installation Certificate (EIC). This is one of the most common mistakes on electrical certificates. The EIC must include test results for every circuit connected to the new consumer unit. Using a Minor Works Certificate for a consumer unit change will be flagged and rejected by competent person scheme providers, and could result in enforcement action from building control.',
        },
        {
          question: 'Is a Minor Works Certificate a legal requirement?',
          answer:
            'BS 7671 Regulation 632.3 requires that a Minor Works Certificate be issued for all minor electrical work. While BS 7671 itself is not legislation (it is a British Standard), compliance with BS 7671 is referenced in the Building Regulations and is the accepted benchmark for safe electrical installation practice in the UK. Competent person scheme providers require their members to issue certificates for all work. In practice, failing to issue a Minor Works Certificate exposes the electrician to liability if a fault or incident later occurs — without a certificate, there is no documented evidence that the work was tested and found compliant.',
        },
        {
          question: 'How many Minor Works Certificates can I issue for one job?',
          answer:
            'There is no limit on the number of Minor Works Certificates for a single job, but each certificate should cover a logically related piece of work on a single circuit. If you are carrying out multiple minor works on different circuits at the same property — for example, adding a socket on the kitchen ring circuit and adding a spur on the first-floor lighting circuit — you would typically issue two separate Minor Works Certificates, one for each circuit. If the scope of work is extensive enough that it involves multiple circuits, consider whether the work actually constitutes new installation work requiring an EIC.',
        },
        {
          question: 'Can I fill in a Minor Works Certificate digitally?',
          answer:
            'Yes. There is no requirement in BS 7671 for certificates to be on paper. Digital Minor Works Certificates are fully accepted by NICEIC, NAPIT, ELECSA, and all other major competent person scheme providers. Elec-Mate provides the complete Minor Works Certificate form digitally on your phone or tablet. Many fields are auto-filled from your profile and previous jobs, test results are validated against BS 7671 as you enter them, digital signatures are captured on-screen, and the completed certificate exports as a professional PDF ready to send to clients via email or WhatsApp before you leave site.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/minor-works-certificate',
          title: 'Minor Works Certificate',
          description: 'Complete guide to the Minor Works Certificate format.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/minor-works-vs-eic',
          title: 'Minor Works vs EIC',
          description: 'When to use each certificate — detailed comparison.',
          icon: FileCheck2,
          category: 'Certification',
        },
        {
          href: '/guides/when-is-eic-required',
          title: 'When Is an EIC Required?',
          description: 'Every scenario that requires a full EIC.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/how-to-test-insulation-resistance',
          title: 'Insulation Resistance Testing',
          description: 'How to test insulation resistance correctly.',
          icon: Zap,
          category: 'Testing',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of tests for initial verification.',
          icon: ListOrdered,
          category: 'Testing',
        },
        {
          href: '/guides/bs-7671-observation-codes',
          title: 'BS 7671 Observation Codes',
          description: 'C1, C2, C3, and FI classification codes explained.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Fill In Minor Works Certificates in Minutes"
      ctaSubheading="Auto-filled fields, BS 7671 test validation, digital signatures, and instant PDF export. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
