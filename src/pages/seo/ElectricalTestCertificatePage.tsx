import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  AlertTriangle,
  Zap,
  Calculator,
  PoundSterling,
  Brain,
} from 'lucide-react';

export default function ElectricalTestCertificatePage() {
  return (
    <GuideTemplate
      title="Electrical Test Certificate | What It Is & When You Need One"
      description="Understand the different types of electrical test certificate in the UK. Learn when you need an EIC, EICR, or Minor Works Certificate, what each covers, what to check for on a certificate, and why proper electrical certification matters for safety and compliance."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Test Certificate', href: '/guides/electrical-test-certificate' },
      ]}
      tocItems={[
        { id: 'what-is-test-certificate', label: 'What Is an Electrical Test Certificate?' },
        { id: 'certificate-types', label: 'Types of Electrical Certificate' },
        { id: 'when-needed', label: 'When You Need a Certificate' },
        { id: 'what-to-check', label: 'What to Check on a Certificate' },
        { id: 'who-can-issue', label: 'Who Can Issue Certificates' },
        { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
        { id: 'digital-certificates', label: 'Digital vs Paper Certificates' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Electrical Test Certificate
          <br />
          <span className="text-yellow-400">What It Is & When You Need One</span>
        </>
      }
      heroSubtitle="Electrical test certificates are legal documents that confirm an installation has been designed, installed, inspected, and tested to BS 7671. Whether you are a homeowner checking paperwork after an electrician has been, or a qualified electrician issuing certificates on site, this guide explains every certificate type in plain language."
      readingTime={12}
      keyTakeaways={[
        'There are three main electrical certificate types in the UK: the Electrical Installation Certificate (EIC), the Minor Works Certificate (MWC), and the Electrical Installation Condition Report (EICR). Each serves a different purpose and is required in different situations.',
        'An EIC is required for all new installations and major alterations — including rewires, new circuits, consumer unit changes, and any work notifiable under Part P of the Building Regulations.',
        'A Minor Works Certificate is only appropriate for small additions or alterations to an existing circuit that do not involve a new circuit — for example, adding a socket to an existing ring final.',
        'An EICR is not a certificate of compliance but a report on the condition of an existing installation. Landlords must have a valid EICR for every tenancy in England, renewed every five years.',
        "Always check that your certificate includes the full schedule of test results, the electrician's registration details, and their competent person scheme membership number.",
      ]}
      sections={[
        {
          id: 'what-is-test-certificate',
          heading: 'What Is an Electrical Test Certificate?',
          content: (
            <>
              <p>
                An electrical test certificate is a formal document that records the results of
                inspection and testing carried out on an electrical installation. It confirms that
                the work complies with BS 7671 (the IET Wiring Regulations) and, where applicable,
                the Building Regulations.
              </p>
              <p>
                The certificate includes details of the installation design, the inspection
                findings, and — critically — the measured test results for every circuit. These
                results include continuity readings, insulation resistance values, earth fault loop
                impedance, prospective fault current, and RCD operating times. Without these
                readings, the certificate is incomplete and potentially worthless.
              </p>
              <p>
                Electrical certificates serve three important purposes: they provide evidence of
                compliance for Building Control and insurance companies, they give the property
                owner a record of the installation's condition, and they protect the electrician by
                documenting that the work was carried out to the required standard.
              </p>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Important Note</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  An electrical certificate without test results is not a valid certificate. If an
                  electrician hands you a certificate with blank or missing test result schedules,
                  the certificate does not demonstrate compliance and should be queried immediately.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'certificate-types',
          heading: 'Types of Electrical Certificate',
          content: (
            <>
              <p>
                There are three main types of electrical certificate used in the UK, each with a
                specific purpose. Using the wrong certificate for the type of work is a common error
                that can have serious consequences.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Electrical Installation Certificate (EIC)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The EIC is the most comprehensive certificate and is required for all new
                    installations and major alterations. It has three sections — Design,
                    Construction, and Inspection & Testing — each of which must be signed. A full{' '}
                    <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> is
                    required for rewires, new circuits, consumer unit changes, and all work
                    notifiable under Part P. The EIC includes a complete schedule of test results
                    for every circuit in the installation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Minor Works Certificate (MWC)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The{' '}
                    <SEOInternalLink href="/guides/minor-works-certificate">
                      Minor Works Certificate
                    </SEOInternalLink>{' '}
                    is a simplified certificate for small additions or alterations to an existing
                    circuit. It is appropriate when no new circuit has been created — for example,
                    adding a socket to an existing ring final, replacing a light fitting, or adding
                    a spur. It must not be used for new circuits, consumer unit changes, or any
                    notifiable work.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Electrical Installation Condition Report (EICR)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is
                    not issued after new work — it is a periodic inspection report on the condition
                    of an existing installation. It assigns observation codes (C1, C2, C3, FI) to
                    any defects found and gives an overall assessment of whether the installation is
                    satisfactory or unsatisfactory. Landlords in England are legally required to
                    have a valid EICR for every tenancy.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Digital Certificates in Elec-Mate"
                description="Elec-Mate provides digital EIC, Minor Works, and EICR forms that validate every test result against BS 7671 limits in real time. Complete certificates on site, generate professional PDF documents, and store everything securely in the cloud."
                icon={FileCheck2}
              />
            </>
          ),
        },
        {
          id: 'when-needed',
          heading: 'When You Need a Certificate',
          content: (
            <>
              <p>
                The type of certificate required depends entirely on the nature of the electrical
                work carried out. Getting this wrong is surprisingly common, and using the wrong
                certificate can create legal and insurance problems.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Certificate Selection Guide</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Full EIC Required</h4>
                    <ul className="space-y-2 text-white text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Full or partial rewire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          New circuit installation (e.g., new radial for shower or cooker)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <SEOInternalLink href="/guides/consumer-unit-change">
                            Consumer unit change
                          </SEOInternalLink>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <SEOInternalLink href="/guides/ev-charger-installation">
                            EV charger installation
                          </SEOInternalLink>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Electrical work in bathrooms and kitchens involving new circuits
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Garden office or outbuilding supply</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Minor Works Certificate</h4>
                    <ul className="space-y-2 text-white text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Adding a socket to an existing ring final circuit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Replacing a light fitting like-for-like</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Adding a spur from an existing socket</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Replacing accessories (switches, sockets) without altering the circuit
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">EICR Required</h4>
                    <ul className="space-y-2 text-white text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Landlord periodic inspection (every 5 years in England)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Pre-purchase property survey</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Insurance requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Periodic inspection at recommended intervals (typically 5 or 10 years
                          domestic)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'what-to-check',
          heading: 'What to Check on a Certificate',
          content: (
            <>
              <p>
                Whether you are a homeowner receiving a certificate or an electrician reviewing
                another contractor's work, there are essential items that must be present on every
                valid electrical certificate.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Test Result Schedules</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Every circuit must have recorded test results — continuity (R1+R2), insulation
                      resistance, Zs, PSCC/PEFC, polarity, and RCD operating times. Blank or missing
                      test schedules mean the certificate is incomplete.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Signatures and Dates</h4>
                    <p className="text-white text-sm leading-relaxed">
                      An EIC requires three signatures: designer, constructor, and inspector. A
                      Minor Works requires one signature. An EICR requires the inspector's signature
                      and, where applicable, the reviewing engineer's signature. All must be dated.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Registration Details</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The electrician's competent person scheme membership number (e.g., NICEIC,
                      NAPIT, ELECSA) must appear on the certificate. This allows you to verify their
                      registration and confirms Part P compliance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Supply Characteristics</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The certificate should record the supply type (TN-C-S, TN-S, or TT), nominal
                      voltage, Ze at the origin, PSCC at the origin, and the supply protective
                      device details. These are essential reference values for the installation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Next Inspection Date</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The recommended interval before the next periodic inspection should be stated.
                      For domestic installations, this is typically 10 years (or 5 years for rented
                      properties). For commercial installations, intervals are shorter — typically 3
                      to 5 years.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'who-can-issue',
          heading: 'Who Can Issue Electrical Certificates',
          content: (
            <>
              <p>
                In the UK, electrical certificates can be issued by any competent person, but for
                the certificate to demonstrate{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
                compliance with the Building Regulations, the person issuing it must be registered
                with a competent person scheme (also known as a Part P scheme).
              </p>
              <p>
                The main competent person schemes in the UK include NICEIC, NAPIT, ELECSA, STROMA,
                Certsure, and BRE. Registration with one of these schemes means the electrician has
                been assessed as competent to design, install, inspect, and test electrical
                installations to BS 7671, and they are authorised to self-certify notifiable work
                without involving Building Control.
              </p>
              <p>
                If the electrician is not registered with a competent person scheme, they can still
                carry out electrical work, but they must notify the local Building Control body
                before starting notifiable work, and Building Control must inspect and approve the
                work before issuing a completion certificate. This route is more expensive (Building
                Control charges a fee) and slower.
              </p>
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Tip for Homeowners</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Always ask your electrician for their competent person scheme membership number
                  before work begins. You can verify their registration on the scheme's website. A
                  registered electrician will self-certify the work and you will receive a Building
                  Regulations Compliance Certificate within 28 days of completion.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'common-mistakes',
          heading: 'Common Mistakes to Avoid',
          content: (
            <>
              <p>
                Both electricians and homeowners make avoidable errors with electrical certificates.
                Here are the most common problems encountered.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Using a Minor Works for New Circuits
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A{' '}
                    <SEOInternalLink href="/guides/minor-works-vs-eic">
                      Minor Works Certificate cannot be used for new circuits
                    </SEOInternalLink>
                    . If a new circuit has been created — even a single new radial for a cooker or
                    shower — a full EIC is required. This is one of the most common errors and is
                    regularly flagged during competent person scheme inspections.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Missing or Incomplete Test Results
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Every circuit on the certificate must have a complete set of test results.
                    Leaving boxes blank, writing "N/A" where a test should have been done, or
                    recording unrealistic values (e.g., insulation resistance of 999 MO on every
                    circuit) are all red flags. The{' '}
                    <SEOInternalLink href="/guides/testing-sequence">
                      correct testing sequence
                    </SEOInternalLink>{' '}
                    must be followed and genuine readings recorded.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Not Issuing Any Certificate</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Some electricians complete the work but fail to issue any certificate at all.
                    This leaves the homeowner without proof of compliance, creates problems when
                    selling the property, and may invalidate insurance cover. Every piece of
                    electrical work — no matter how small — should be accompanied by the appropriate
                    certificate.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="BS 7671 Validation Built In"
                description="Elec-Mate's certificate forms validate every test result against BS 7671 maximum values as you enter them. If a reading exceeds the permitted limit, the app flags it immediately so you can investigate before leaving site."
                icon={ShieldCheck}
              />
            </>
          ),
        },
        {
          id: 'digital-certificates',
          heading: 'Digital vs Paper Certificates',
          content: (
            <>
              <p>
                The electrical industry has largely moved from handwritten paper certificates to
                digital certificate software. Both formats are equally valid — BS 7671 does not
                specify the format, only the content. However, digital certificates offer
                significant advantages for both the electrician and the customer.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Benefits of Digital Certificates
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Automatic validation</strong> — Test
                      results are checked against BS 7671 limits as they are entered, reducing
                      errors and ensuring compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Professional presentation</strong> — PDF
                      certificates are consistently formatted, legible, and branded — unlike
                      handwritten carbon copies that can be difficult to read.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cloud storage</strong> — Certificates are
                      stored securely in the cloud, accessible from any device, and cannot be lost,
                      damaged, or destroyed by water or fire.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Instant delivery</strong> — Certificates
                      can be emailed to the customer, letting agent, or landlord immediately on
                      completion. No waiting for postal delivery.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Time savings</strong> — Auto-populated
                      fields, saved templates, and calculation assistance reduce certificate
                      completion time from 30+ minutes to under 10 minutes per job.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Complete Certificates in Minutes With Elec-Mate"
                description="Elec-Mate's digital certificate platform handles EIC, Minor Works, and EICR forms with real-time BS 7671 validation, auto-populated fields, cloud storage, and instant PDF delivery. Join thousands of electricians who have switched from paper to digital."
                icon={FileText}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between an EIC and an EICR?',
          answer:
            'An EIC (Electrical Installation Certificate) is issued after new electrical work has been completed — it certifies that the new installation complies with BS 7671. An EICR (Electrical Installation Condition Report) is a periodic inspection of an existing installation — it reports on the condition of the wiring and identifies any defects. An EIC is forward-looking (confirming new work is safe), while an EICR is backward-looking (assessing whether existing work is still safe).',
        },
        {
          question: 'How long is an electrical test certificate valid?',
          answer:
            'An EIC and Minor Works Certificate do not expire — they are a permanent record of the work carried out at that point in time. However, the certificate will recommend an interval for the next periodic inspection, typically 10 years for domestic and 5 years for rented properties. An EICR is valid for the period stated on the report — usually 5 years for rented properties and up to 10 years for owner-occupied homes. After this period, a new EICR should be carried out.',
        },
        {
          question: 'Do I need an electrical certificate for replacing a light fitting?',
          answer:
            'A like-for-like replacement of a light fitting in a room that is not a bathroom or kitchen special location does not require a certificate under the Building Regulations. However, best practice is to issue a Minor Works Certificate for any work carried out on an electrical installation, as it provides evidence that the work was done safely. If the light fitting is in a bathroom (a special location under BS 7671), a certificate is strongly recommended.',
        },
        {
          question: 'Can a landlord do their own electrical certificate?',
          answer:
            'In England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to have an EICR carried out by a "qualified and competent person." While the regulations do not specifically require membership of a competent person scheme, the government guidance strongly recommends using an electrician registered with a scheme such as NICEIC or NAPIT. A landlord who is not a qualified electrician cannot carry out their own EICR.',
        },
        {
          question: 'What happens if I sell my house without an electrical certificate?',
          answer:
            'There is no legal requirement to provide an electrical certificate when selling a property in England and Wales (unlike in Scotland, where an EICR is required for the Home Report). However, buyers and their solicitors increasingly request an EICR as part of the conveyancing process, and mortgage lenders may require one if the surveyor identifies potential electrical issues. Not having a certificate may delay the sale or lead to a price reduction.',
        },
        {
          question: 'How much does an electrical certificate cost?',
          answer:
            'The cost depends on the type of certificate and the work involved. An EICR for a typical 3-bed house costs between £150 and £300 depending on location and the number of circuits. A Minor Works Certificate is usually included in the cost of the work (e.g., £5-£15 for the certificate itself). An EIC is also typically included in the cost of the installation work. If you are paying separately for certificates, prices vary by region — always check that the electrician is registered with a competent person scheme.',
        },
        {
          question: 'Can I get a copy of my electrical certificate if I have lost it?',
          answer:
            'If the work was done by a registered electrician (NICEIC, NAPIT, etc.), the competent person scheme may hold a record of the notification. Contact the scheme directly with the property address and approximate date of the work. The electrician who carried out the work should also retain a copy for at least six years. If the certificate was issued digitally through a platform like Elec-Mate, it can be accessed from the cloud at any time. For very old certificates, Building Control may have records of Part P notifications on file.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'How to complete the Electrical Installation Certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Complete guide to the Electrical Installation Condition Report.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/minor-works-certificate',
          title: 'Minor Works Certificate',
          description: 'When and how to issue a Minor Works Certificate.',
          icon: FileCheck2,
          category: 'Certification',
        },
        {
          href: '/guides/minor-works-vs-eic',
          title: 'Minor Works vs EIC',
          description: 'When to use a Minor Works and when a full EIC is required.',
          icon: AlertTriangle,
          category: 'Guide',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of electrical tests for certification.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'When electrical work is notifiable under Part P.',
          icon: ShieldCheck,
          category: 'Regulation',
        },
      ]}
      ctaHeading="Issue Professional Electrical Certificates With Elec-Mate"
      ctaSubheading="EIC, Minor Works, and EICR forms with BS 7671 validation, auto-calculations, cloud storage, and instant PDF delivery. 7-day free trial, cancel anytime."
    />
  );
}
