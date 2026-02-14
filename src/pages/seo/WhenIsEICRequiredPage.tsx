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
  Camera,
  Home,
} from 'lucide-react';

export default function WhenIsEICRequiredPage() {
  return (
    <GuideTemplate
      title="When Is an EIC Required? BS 7671 Guide | Elec-Mate"
      description="Complete guide to when an Electrical Installation Certificate (EIC) is required under BS 7671:2018+A3:2024. New circuits, rewires, consumer unit changes, extensions, loft conversions, and all Part P notifiable work explained."
      datePublished="2025-06-10"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'When Is an EIC Required?', href: '/guides/when-is-eic-required' },
      ]}
      tocItems={[
        { id: 'what-is-eic', label: 'What Is an EIC?' },
        { id: 'when-required', label: 'When Is an EIC Required?' },
        { id: 'when-not-required', label: 'When Is an EIC Not Required?' },
        { id: 'who-can-issue', label: 'Who Can Issue an EIC?' },
        { id: 'what-must-be-included', label: 'What Must Be Included?' },
        { id: 'signatures', label: 'Design, Construct, Inspect & Test Signatures' },
        { id: 'elec-mate-eic', label: 'Complete EIC Forms Digitally' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="BS 7671 Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          When Is an <span className="text-yellow-400">EIC Required?</span>
          <br />
          BS 7671 Guide
        </>
      }
      heroSubtitle="An Electrical Installation Certificate (EIC) is required for all new electrical work — new circuits, rewires, alterations, consumer unit changes, and any work notifiable under Part P of the Building Regulations. This guide covers every scenario, who can issue one, and what must be included."
      readingTime={14}
      keyTakeaways={[
        'An EIC is required for all new electrical installation work — new circuits, rewires, consumer unit changes, extensions, loft conversions, garage conversions, and any notifiable work under Part P.',
        'A Minor Works Certificate is used instead of an EIC only for minor work that does not include a new circuit — such as adding a socket to an existing circuit or replacing accessories.',
        'The EIC must be signed by the designer, the constructor (installer), and the person carrying out the inspection and testing — though one person can fulfil all three roles on domestic work.',
        'Only a competent person can issue an EIC — typically a qualified electrician holding 18th Edition (C&G 2382) and Inspection & Testing (C&G 2391) qualifications, and ideally registered with a competent person scheme.',
        'An EIC must include a full schedule of test results for every circuit, including continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operating times.',
      ]}
      sections={[
        {
          id: 'what-is-eic',
          heading: 'What Is an Electrical Installation Certificate (EIC)?',
          content: (
            <>
              <p>
                An Electrical Installation Certificate (EIC) is the formal document issued upon
                completion of new electrical installation work. It certifies that the design,
                construction, and inspection and testing of the new work comply with BS
                7671:2018+A3:2024 — the 18th Edition of the IET Wiring Regulations with Amendment 3.
              </p>
              <p>
                The EIC is defined in Appendix 6 of BS 7671 and follows the model forms published in
                the standard. It is the most comprehensive of the three electrical certificates —
                the EIC, the{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>
                , and the{' '}
                <SEOInternalLink href="/guides/eicr-certificate">
                  EICR (Electrical Installation Condition Report)
                </SEOInternalLink>
                . The EIC covers the design, the construction (installation), and the inspection and
                testing of the completed work, making it a complete record of compliance.
              </p>
              <p>
                Issuing an EIC is not optional. BS 7671 Regulation 632.1 requires that an EIC,
                together with a schedule of inspections and a schedule of test results, be given to
                the person ordering the work upon completion of the installation. This applies to
                all new installation work, regardless of size.
              </p>
            </>
          ),
        },
        {
          id: 'when-required',
          heading: 'When Is an EIC Required?',
          content: (
            <>
              <p>
                An EIC is required whenever new electrical installation work is carried out. This
                includes a wide range of scenarios — from a single new circuit to a complete house
                rewire. The key principle is simple: if the work involves a new circuit or a new
                installation, an EIC is needed.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">New Circuits</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Any new circuit added to an installation requires an EIC. This includes a new
                    radial circuit for a cooker, a new ring final circuit for sockets, a new
                    lighting circuit, a dedicated circuit for an{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV charger
                    </SEOInternalLink>
                    , an immersion heater circuit, or a spur taken from the consumer unit as a new
                    circuit. If the cable originates from the distribution board as a new way, it is
                    a new circuit.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Complete Rewires</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A full rewire of a property — whether domestic, commercial, or industrial —
                    requires an EIC. The certificate must cover every circuit in the installation,
                    with a complete schedule of test results. This is typically the largest EIC you
                    will produce, as it may cover 15 to 30 or more circuits across multiple
                    distribution boards.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Consumer Unit Changes</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Replacing a{' '}
                    <SEOInternalLink href="/guides/consumer-unit-change">
                      consumer unit
                    </SEOInternalLink>{' '}
                    always requires an EIC — even if it is a like-for-like replacement. This is
                    because the consumer unit is the main distribution board, and its replacement
                    constitutes notifiable work under Part P. The EIC must include test results for
                    every circuit connected to the new board.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">New Builds and Extensions</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    All electrical work in a new build requires an EIC. House extensions with new
                    circuits require an EIC for those new circuits. Loft conversions, garage
                    conversions, and garden room installations that involve new circuits are all
                    covered. If the extension ties into the existing installation, the EIC should
                    clearly describe the extent of the new work versus the existing installation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Alterations Involving New Circuits
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Kitchen refits, bathroom rewires, and commercial fit-outs that involve new
                    circuits require an EIC for the new work. If the alteration is extensive enough
                    to involve a new sub-distribution board, the EIC must cover that board and all
                    circuits fed from it.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      All Notifiable Work Under Part P
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    In England and Wales, all notifiable work under{' '}
                    <SEOInternalLink href="/guides/part-p-building-regulations">
                      Part P of the Building Regulations
                    </SEOInternalLink>{' '}
                    requires an EIC. This includes any new circuit in a dwelling, any work in a
                    kitchen or bathroom involving new circuits, any work in a special location
                    (bathrooms, swimming pools), and any consumer unit replacement. The EIC is the
                    evidence of compliance submitted to the competent person scheme or building
                    control.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'when-not-required',
          heading: 'When Is an EIC Not Required?',
          content: (
            <>
              <p>
                There are situations where a full EIC is not required. In these cases, a{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>{' '}
                is the appropriate document. The key distinction is that a Minor Works Certificate
                is used for work that does not involve a new circuit.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Like-for-Like Replacements</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Replacing a socket outlet, light switch, ceiling rose, or other accessory on a
                    like-for-like basis does not require an EIC. A Minor Works Certificate covers
                    this type of work. However, if the accessory is being replaced with something
                    materially different — for example, replacing a single socket with a double, or
                    adding a dimmer where there was a switch — it may still be minor works, but the
                    electrician should verify that the existing circuit can accommodate the change.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Adding a Spur to an Existing Circuit
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Adding a fused spur or unfused spur from an existing circuit is classed as minor
                    work, provided it does not create a new circuit at the distribution board. A
                    Minor Works Certificate is appropriate. However, if the spur is extensive or
                    involves work in a special location (such as a bathroom), it may still be
                    notifiable under Part P.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Replacing a Light Fitting</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Replacing a light fitting for another (like-for-like or upgrade) does not
                    require an EIC. If it involves only disconnecting and reconnecting at the same
                    point, it is minor work. No certificate at all is strictly required for a simple
                    like-for-like accessory change, though many electricians issue a Minor Works
                    Certificate as good practice and for their own records.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                For a detailed comparison of when to use each certificate, see the{' '}
                <SEOInternalLink href="/guides/minor-works-vs-eic">
                  Minor Works vs EIC
                </SEOInternalLink>{' '}
                guide.
              </p>
            </>
          ),
        },
        {
          id: 'who-can-issue',
          heading: 'Who Can Issue an EIC?',
          content: (
            <>
              <p>
                An EIC can only be issued by a competent person. BS 7671 defines competence as
                having sufficient technical knowledge, skill, and experience to avoid danger. In
                practical terms, this means the person issuing the EIC should hold the following
                qualifications:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Required Qualifications</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        18th Edition IET Wiring Regulations (C&G 2382)
                      </strong>{' '}
                      — The current edition qualification covering BS 7671:2018+A3:2024. This is the
                      foundation qualification that demonstrates knowledge of the standard.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Inspection and Testing (C&G 2391 or equivalent)
                      </strong>{' '}
                      — This qualification demonstrates competence in carrying out the inspection
                      and testing required to complete an EIC. The older C&G 2394/2395
                      qualifications are also accepted.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        NVQ Level 3 in Electrical Installation (or equivalent)
                      </strong>{' '}
                      — Demonstrates practical competence in designing and installing electrical
                      systems. This is typically required by competent person schemes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Competent Person Scheme Membership
                      </strong>{' '}
                      — Registration with NICEIC, NAPIT, ELECSA, BRE, or another approved scheme.
                      This is required for self-certification of notifiable work under Part P.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                While there is no legal restriction on who can fill in an EIC form, the person
                signing the declaration is certifying that the work complies with BS 7671. Signing
                an EIC without the competence to verify compliance is irresponsible and could result
                in liability if a fault or incident occurs.
              </p>
            </>
          ),
        },
        {
          id: 'what-must-be-included',
          heading: 'What Must Be Included on an EIC?',
          content: (
            <>
              <p>
                The EIC model form in BS 7671 Appendix 6 has clearly defined sections that must all
                be completed. Incomplete certificates are regularly rejected by competent person
                scheme providers and can create legal liability for the electrician.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Details of the Installation</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Client name and address, installation address (if different), description of
                      the work, the extent of the installation covered by the certificate, and the
                      date the work was completed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Design</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Confirmation that the design complies with BS 7671. This section must be
                      signed by the designer — the person who determined the cable sizes, protective
                      device ratings, earthing arrangements, RCD selection, and circuit
                      configurations.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Construction (Installation)</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Confirmation that the construction of the installation complies with BS 7671
                      and the design. This section must be signed by the installer — the person who
                      carried out the physical installation work.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Inspection and Testing</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Confirmation that the installation has been inspected and tested in accordance
                      with BS 7671 and that the results confirm compliance. This section must be
                      signed by the inspector — the person who carried out the inspection and
                      testing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Schedule of Test Results</h4>
                    <p className="text-white text-sm leading-relaxed">
                      A complete schedule listing every circuit with test results: continuity of
                      protective conductors (R1+R2), insulation resistance (in megohms), polarity,
                      earth fault loop impedance (Zs), prospective fault current (Ipf), and RCD
                      operating times. Every circuit must have results recorded — no gaps.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    6
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Schedule of Inspections</h4>
                    <p className="text-white text-sm leading-relaxed">
                      A checklist of visual inspection items covering the condition and compliance
                      of all aspects of the installation — wiring systems, protective devices,
                      earthing, bonding, accessories, and enclosures.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'signatures',
          heading: 'Design, Construct, Inspect and Test Signatures',
          content: (
            <>
              <p>
                The EIC requires three separate signatures — one for design, one for construction,
                and one for inspection and testing. This reflects the three distinct roles involved
                in a new electrical installation. On larger commercial and industrial projects,
                these roles are often filled by different people. On most domestic jobs, however,
                the same electrician designs, installs, and tests the work, and therefore signs all
                three sections.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">The Three Signatures</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Designer</h4>
                      <p className="text-white text-sm leading-relaxed">
                        The designer certifies that the design of the installation complies with BS
                        7671. This covers cable sizing, protective device selection, earthing
                        arrangements, RCD coordination, circuit layouts, and all design
                        calculations. The designer must have the technical knowledge to verify that
                        the design meets the standard.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Constructor (Installer)</h4>
                      <p className="text-white text-sm leading-relaxed">
                        The constructor certifies that the installation has been constructed in
                        accordance with BS 7671 and in line with the design. This covers cable
                        routing, connections, terminations, fixings, labelling, and all physical
                        aspects of the installation. If the installation departs from the design,
                        the constructor must ensure the departures are documented and still comply
                        with the standard.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Inspector and Tester</h4>
                      <p className="text-white text-sm leading-relaxed">
                        The inspector certifies that the installation has been inspected and tested
                        in accordance with BS 7671 Part 6, and that the results confirm compliance
                        with the standard. This person is responsible for the accuracy of all test
                        results recorded on the schedule. They must hold an inspection and testing
                        qualification (such as C&G 2391).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Each signature carries legal and professional weight. The person signing is
                personally certifying compliance in their area of responsibility. If a fault or
                incident is later traced to a design error, the designer may be liable. If it is
                traced to poor installation practice, the constructor may be liable. If test results
                were recorded incorrectly, the inspector may be liable.
              </p>
              <SEOAppBridge
                title="Digital Signatures — No Paper Required"
                description="Elec-Mate captures all three signatures digitally on your phone or tablet. The designer, constructor, and inspector each sign on-screen. Signatures are embedded in the PDF certificate and stored securely in the cloud. No paper forms, no scanning, no double-handling."
                icon={PenTool}
              />
            </>
          ),
        },
        {
          id: 'elec-mate-eic',
          heading: 'Complete EIC Forms Digitally with Elec-Mate',
          content: (
            <>
              <p>
                Elec-Mate provides the complete Electrical Installation Certificate as a digital
                form on your phone or tablet. Every section of the BS 7671 Appendix 6 model form is
                included — details of the installation, design, construction, inspection and
                testing, schedule of inspections, and schedule of test results. Nothing is missing
                and nothing is out of order.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Auto-Validated Test Results</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Every test result is validated against BS 7671 maximum permitted values as you
                    enter it. Zs values are checked against the correct table for the protective
                    device type and rating. Insulation resistance values are verified against the
                    minimum acceptable limits. RCD operating times are checked against the required
                    disconnection times. If a value fails, you are alerted immediately — not days
                    later when the scheme provider reviews it.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Board Scanner</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Photograph the consumer unit and Elec-Mate's AI extracts all circuit data —
                    circuit numbers, MCB/RCBO ratings, RCD types, and circuit descriptions. This
                    auto-populates the schedule of test results, saving you from typing every
                    circuit manually. Particularly useful for consumer unit changes where you need
                    to record all existing circuits.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Professional PDF Export</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Generate a clean, professional PDF that meets competent person scheme
                    requirements. Email it directly to the client from the app before you leave
                    site, or share via WhatsApp. No need to go back to the office to type up a paper
                    form. The PDF includes all sections, digital signatures, and a complete schedule
                    of test results.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="The Complete EIC — On Your Phone"
                description="Elec-Mate has 8 certificate types including the full EIC, Minor Works, EICR, EV Charger, Emergency Lighting, Fire Alarm, Solar PV, and PAT. All with auto-validation, digital signatures, and instant PDF export. Start your 7-day free trial."
                icon={FileCheck2}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is an EIC required for a consumer unit change?',
          answer:
            'Yes. Replacing a consumer unit always requires a full Electrical Installation Certificate (EIC). A Minor Works Certificate is not appropriate for a consumer unit change because the work involves the main distribution board, which is considered notifiable work under Part P of the Building Regulations. The EIC must include test results for every circuit connected to the new consumer unit, not just the circuits that were modified. This applies whether the replacement is like-for-like, an upgrade to a metal enclosure, or part of a larger project such as a rewire or extension.',
        },
        {
          question: 'Do I need an EIC for adding a socket to an existing circuit?',
          answer:
            'No. Adding a socket outlet to an existing circuit is classed as minor work, provided it does not involve a new circuit at the distribution board. A Minor Works Certificate is the appropriate document for this type of work. The Minor Works Certificate records the description of the work, the essential test results (continuity, insulation resistance, polarity, earth fault loop impedance, and RCD test if applicable), and the declaration. An EIC is only required when the work involves a new circuit or is notifiable under Part P.',
        },
        {
          question: 'Can one person sign all three sections of the EIC?',
          answer:
            'Yes. On most domestic electrical jobs, the same electrician designs, installs, and tests the work. In this case, the same person signs all three sections — design, construction, and inspection and testing. This is perfectly acceptable under BS 7671. The three separate signatures exist because on larger commercial and industrial projects, the design, installation, and testing may be carried out by different individuals or even different companies. Each person signing takes responsibility for their specific area of the work.',
        },
        {
          question: 'Is an EIC legally required or just best practice?',
          answer:
            'It is both a regulatory requirement and best practice. BS 7671 Regulation 632.1 requires that an EIC be issued upon completion of new installation work. Under Part P of the Building Regulations (England and Wales), notifiable electrical work must be either self-certified by a registered competent person or notified to building control — and in both cases, the EIC is the primary evidence of compliance. Failure to issue an EIC for notifiable work can result in enforcement action from the local authority, rejection by competent person schemes, and potential liability if a fault or incident occurs. For the electrician, the EIC is also essential protection — it is the documentary evidence that the work was designed, installed, and tested to the standard.',
        },
        {
          question: 'What is the difference between an EIC and a Minor Works Certificate?',
          answer:
            'The EIC is used for new electrical installation work — new circuits, rewires, consumer unit changes, and all notifiable work. It has three declaration sections (design, construction, and inspection and testing) and must include a full schedule of inspections and a schedule of test results. The Minor Works Certificate is used for minor work that does not involve a new circuit — such as adding a socket to an existing circuit, replacing an accessory, or adding a fused spur. It is a simpler document with a single declaration section and a reduced set of test results. Using the wrong certificate type is a common mistake and can result in rejection by scheme providers.',
        },
        {
          question: 'Do I need an EIC for a loft conversion or extension?',
          answer:
            'If the loft conversion or extension involves new electrical circuits, then yes, an EIC is required for those new circuits. This is almost always the case — a loft conversion typically requires new lighting circuits and socket circuits, and an extension usually requires at least one new circuit. The work is also notifiable under Part P. The EIC should clearly describe the extent of the new work and distinguish it from the existing installation. If the existing installation is not being modified, only the new circuits need to be included in the schedule of test results — though it is good practice to verify that the existing protective devices at the distribution board are adequate for the additional load.',
        },
        {
          question: 'Can I issue an EIC using a digital app like Elec-Mate?',
          answer:
            'Yes. There is no requirement in BS 7671 for the EIC to be on paper. Digital certificates are fully accepted by all major competent person scheme providers — NICEIC, NAPIT, ELECSA, and others — as well as local authorities and building control. Elec-Mate provides the complete EIC form structure digitally, with all required sections matching the BS 7671 Appendix 6 model forms. Digital signatures are captured on-screen, test results are auto-validated against BS 7671 limits, and the completed certificate exports as a professional PDF ready to send to clients or upload to scheme provider portals.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate Guide',
          description: 'How to fill in an Electrical Installation Certificate step by step.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/minor-works-certificate',
          title: 'Minor Works Certificate',
          description: 'When to use a Minor Works Certificate and how to fill it in.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/minor-works-vs-eic',
          title: 'Minor Works vs EIC',
          description: 'When to use each certificate — a detailed comparison.',
          icon: FileCheck2,
          category: 'Certification',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'Which electrical work is notifiable and how to comply.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change Guide',
          description: 'Complete guide to consumer unit replacement — cost, regulations, process.',
          icon: Home,
          category: 'Guide',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description:
            'The correct order of tests for initial verification and periodic inspection.',
          icon: Calculator,
          category: 'Testing',
        },
      ]}
      ctaHeading="Complete EIC Forms on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital EIC forms with auto-validated test results, Board Scanner, digital signatures, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
