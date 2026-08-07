import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { CARD_PADDED, SUBPANEL } from '@/components/seo/seoSurface';
import {
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Building2,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation tokens
// -------------------------------------------------------------------

/** Scrolls sideways inside itself so the page body never does. */
const TABLE_WRAP =
  '-mx-4 my-6 overflow-x-auto border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border';
const TH = 'px-4 py-3 text-left text-[13px] font-semibold text-white';
const TD = 'px-4 py-3 align-top text-sm leading-relaxed text-white';
const CARD_H3 = 'mb-3 text-[17px] font-bold tracking-tight text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'NAPIT Certificate: Building Regs + Notification';
const PAGE_DESCRIPTION =
  'NAPIT = National Association of Professional Inspectors and Testers. Notify online to get a Building Regulations Compliance Certificate. Fees £280-£380/yr.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'NAPIT Certificate Guide', href: '/guides/napit-certificate-guide' },
];

const tocItems = [
  { id: 'what-is-napit', label: 'What Is NAPIT?' },
  { id: 'which-certificate', label: 'Which Certificate You Issue' },
  { id: 'registration-categories', label: 'Registration Categories' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'costs', label: 'Costs' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'annual-assessment', label: 'Annual Assessment' },
  { id: 'building-control', label: 'Building Control Notification' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'napit-vs-niceic', label: 'NAPIT vs NICEIC' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NAPIT (National Association of Professional Inspectors and Testers) is one of the largest competent person schemes for electricians in the UK, and is Government-authorised to self-certify notifiable domestic work under Part P.',
  'There is no such thing as a "NAPIT certificate" for the electrical work itself. You issue the BS 7671 Appendix 6 model form — an EIC, a Minor Works Certificate or an EICR — and NAPIT issues the Building Regulations Compliance Certificate to the homeowner once you notify.',
  'NAPIT covers multiple trades — electrical, gas, plumbing, heating, ventilation, and building fabric — making it popular with multi-trade contractors.',
  'Registration requires the core qualifications every competent person scheme asks for: the current edition of the Wiring Regulations, an inspection and testing qualification, an NVQ Level 3, calibrated instruments, and public liability insurance.',
  'Elec-Mate certificates work with any scheme provider including NAPIT — the PDF output follows the Appendix 6 model forms, and BS 7671 expressly permits certificates in electronic form (Reg 644.4.202).',
];

const faqs = [
  {
    question: 'Is a NAPIT certificate the same as an NICEIC certificate?',
    answer:
      'Yes, in terms of legal standing. Both NAPIT and NICEIC are Government-authorised competent person schemes approved under Part P of the Building Regulations. A Building Regulations Compliance Certificate issued through NAPIT has exactly the same legal validity as one issued through NICEIC. The underlying electrical certificates — EIC, Minor Works Certificate, and EICR — are BS 7671 documents that follow the same model forms regardless of which scheme you are registered with. The scheme provider does not determine the certificate format; BS 7671:2018+A4:2026 Appendix 6 does. The differences between schemes are in brand recognition, annual fees, assessment processes, and additional member benefits — not in the legal weight or technical requirements of the certificates themselves.',
  },
  {
    question: 'How much does NAPIT registration cost?',
    answer:
      'As of 2026, the Electrical Competent Person Scheme typically costs in the region of 280 to 380 pounds per year for the annual registration fee, depending on whether you are a sole trader or a larger firm. The initial assessment fee is typically between 250 and 400 pounds, so the total first-year cost is roughly 530 to 780 pounds. NAPIT often runs promotional offers for new joiners, which can reduce the first-year cost further, and multi-trade registration (for example, electrical plus gas) may offer bundled pricing. These figures are indicative only and are reviewed annually — confirm the current fees directly with NAPIT before applying.',
  },
  {
    question: 'What qualifications do I need for NAPIT electrical registration?',
    answer:
      'The qualification requirements for NAPIT electrical registration are the same as for other competent person schemes. You need: the current edition of the IET Wiring Regulations, BS 7671:2018+A4:2026 (City & Guilds 2382 or equivalent), an inspection and testing qualification (City & Guilds 2391 or the older 2394/2395 equivalents), and an NVQ Level 3 in Electrical Installation or equivalent, such as City & Guilds 2357 or the 5357 apprenticeship, including the AM2 assessment. You must also hold current public liability insurance with a minimum cover typically of 2 million pounds, and your test instruments must be calibrated and within their calibration date. NAPIT may consider applicants with older qualifications on a case-by-case basis, provided you can demonstrate current competence and knowledge of BS 7671:2018+A4:2026.',
  },
  {
    question: 'Can I switch from NICEIC to NAPIT?',
    answer:
      'Yes, you can switch between competent person schemes at any time. The process involves applying to NAPIT as a new member and going through their assessment process. Your existing registration and track record will be taken into account, and the transition is usually straightforward for experienced electricians with a clean compliance history. Time the switch to coincide with the end of your current registration period so you are not paying two memberships at once. NAPIT sometimes offers discounted initial assessment fees for electricians transferring from another scheme, and the reverse also applies — you can move back if your business needs change.',
  },
  {
    question: 'Does NAPIT cover commercial and industrial work?',
    answer:
      'Yes. NAPIT offers registration categories that cover domestic, commercial, and industrial electrical work. The Electrical Competent Person Scheme covers domestic work and provides Part P self-certification. For commercial and industrial work, NAPIT registration demonstrates assessed competence to clients, main contractors, and specifiers. Part P applies to dwellings, so self-certification is only relevant to domestic work — but holding registration for commercial work provides a recognised credential that many clients require when appointing electrical contractors for non-domestic projects.',
  },
  {
    question: 'How do I notify NAPIT of completed work?',
    answer:
      'After completing notifiable domestic electrical work, you must notify NAPIT within the required timescale — typically within 30 days of completion, but check the current NAPIT guidance. Notification is done through the NAPIT online contractor portal. You log in, enter the job details (installation address, type of work, date of completion, certificate reference number), and upload the completed certificate. NAPIT then issues a Building Regulations Compliance Certificate to the homeowner and registers the notification with the relevant local authority building control department. The entire process is online and typically takes a few minutes per job. Failure to notify completed work within the required timescale can result in compliance issues with NAPIT and may affect your registration status.',
  },
  {
    question: 'What happens at a NAPIT annual assessment?',
    answer:
      'The NAPIT annual assessment is carried out by a NAPIT assessor, typically at your business premises or a job site. The assessor reviews your qualifications, insurance, and test instrument calibration to confirm they are all current. They review a sample of certificates you have issued since the last assessment, checking for correct completion, accurate test results, and compliance with BS 7671:2018+A4:2026. The assessor may ask technical questions about current regulations and testing procedures, and may request to visit a recent or current job site to inspect the standard of your installation work. If any issues are identified, you are given a corrective action plan with a deadline. Persistent or serious non-compliance can result in suspension or withdrawal of registration.',
  },
];

const sections = [
  {
    id: 'what-is-napit',
    heading: 'What Is NAPIT?',
    content: (
      <>
        <p>
          NAPIT stands for the National Association of Professional Inspectors and Testers. It is a
          Government-authorised competent person scheme, which means a registered electrician can
          self-certify notifiable domestic electrical work under{' '}
          <SEOInternalLink href="/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          instead of putting the job through local authority building control.
        </p>

        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[440px] border-collapse">
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <th scope="row" className={`${TH} w-[42%] align-top`}>
                  What NAPIT stands for
                </th>
                <td className={TD}>National Association of Professional Inspectors and Testers</td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  What it is
                </th>
                <td className={TD}>
                  A Government-authorised competent person scheme under Part P of the Building
                  Regulations
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  Certificate you issue
                </th>
                <td className={TD}>
                  EIC, Minor Electrical Installation Works Certificate or EICR — the BS 7671
                  Appendix 6 model forms
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  Certificate NAPIT issues
                </th>
                <td className={TD}>
                  A Building Regulations Compliance Certificate, sent to the homeowner once you
                  notify the job
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  Notification deadline
                </th>
                <td className={TD}>
                  Typically within 30 days of completion, through the NAPIT online portal — check
                  the current NAPIT guidance
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  Trades covered
                </th>
                <td className={TD}>
                  Electrical, gas, plumbing, heating, ventilation and building fabric, under one
                  membership
                </td>
              </tr>
              <tr>
                <th scope="row" className={`${TH} align-top`}>
                  Indicative cost
                </th>
                <td className={TD}>
                  Around £280 – £380 a year, plus a one-off initial assessment fee. Fees are
                  reviewed annually — confirm the current figures with NAPIT.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-[17px] font-bold tracking-tight text-white">
          Multi-trade under one membership
        </h3>
        <p>
          NAPIT covers several building trades under one umbrella — electrical, gas (as a Gas Safe
          Operator Scheme), plumbing, heating, ventilation, and building fabric. That makes it
          popular with multi-trade contractors who want a single scheme membership covering
          everything they do, rather than separate registrations with different bodies.
        </p>

        <h3 className="mt-8 text-[17px] font-bold tracking-tight text-white">
          What Government authorisation actually means
        </h3>
        <p>
          A NAPIT-registered electrician can self-certify notifiable domestic electrical work,
          which triggers a Building Regulations Compliance Certificate being issued directly to the
          homeowner without building control involvement. The legal standing of that certificate is
          identical whichever authorised scheme issues it — they all sit under the same Part P
          framework.
        </p>

        <div className={`${CARD_PADDED} my-6`}>
          <p className="text-sm leading-relaxed text-white">
            <span className="font-semibold">Written by the Elec-Mate editorial team</span> &mdash;
            verified by a qualified UK electrician and checked against BS&nbsp;7671:2018+A4:2026.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'which-certificate',
    heading: 'Which Certificate You Actually Issue',
    content: (
      <>
        <p>
          This is the point most searches get stuck on. NAPIT does not have its own electrical
          certificate. The document recording the work is a BS 7671 certificate on the Appendix 6
          model form, and it is identical whichever scheme you belong to. The NAPIT-branded document
          — the Building Regulations Compliance Certificate — is a separate thing, produced by NAPIT
          after you notify, and it evidences Building Regulations compliance rather than the test
          results.
        </p>

        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[600px] border-collapse text-white">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className={TH}>Work carried out</th>
                <th className={TH}>Certificate to issue</th>
                <th className={TH}>BS 7671</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={TD}>
                  A new installation, or an addition or alteration to an existing one — including
                  replacing a distribution board or consumer unit
                </td>
                <td className={TD}>Electrical Installation Certificate (EIC)</td>
                <td className={`${TD} whitespace-nowrap`}>Reg 644.1</td>
              </tr>
              <tr>
                <td className={TD}>
                  Work that adds to or alters a circuit but provides no new circuit and does not
                  replace a distribution board or consumer unit
                </td>
                <td className={TD}>
                  Minor Electrical Installation Works Certificate — one for each circuit added to or
                  altered
                </td>
                <td className={`${TD} whitespace-nowrap`}>Reg 644.4.201</td>
              </tr>
              <tr>
                <td className={TD}>Periodic inspection and testing of an existing installation</td>
                <td className={TD}>Electrical Installation Condition Report (EICR)</td>
                <td className={`${TD} whitespace-nowrap`}>Reg 653.1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>What has to go with the certificate</h3>
          <p className="text-sm leading-relaxed text-white">
            Regulation 644.3 requires the Certificate to state the extent of the work covered and to
            include (a) Schedule(s) of Inspection and (b) Schedule(s) of Circuit Details and
            Schedule(s) of Test Results. The schedules{' '}
            <strong>shall be based on the models in Appendix 6</strong> — the wording is mandatory,
            so a non-conforming schedule format is a non-conformance in its own right.
          </p>
          <div className={`${SUBPANEL} mt-4 p-4`}>
            <p className="text-sm leading-relaxed text-white">
              <strong>Changed at A4:2026.</strong> The single-page generic schedule of test results
              used for the EIC and EICR has been redrafted. There is now a separate page for the
              schedule of circuit details and a separate page for the schedule of test results. The
              schedule of inspections for initial verification has also been simplified, and a new
              example checklist of items requiring inspection has been added to Appendix 6 — that
              checklist is not required to be provided with the certificate.
            </p>
          </div>
        </div>

        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Who signs it, and can it be digital?</h3>
          <p className="text-sm leading-relaxed text-white">
            Regulation 644.4 puts the Certificate in the hands of the person or persons responsible
            for the design, construction and verification of the installation, who issue it to the
            person ordering the work along with the records mentioned in Regulation 644.3. The same
            regulation requires the recommendation for the interval between initial verification and
            the first periodic inspection to be recorded on the Certificate. Under Regulation 644.5
            the certificate is compiled and signed or otherwise authenticated by one or more skilled
            persons competent to verify that the requirements of BS 7671 have been met.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white">
            Digital is expressly allowed. Regulation 644.4.202 states that Electrical Installation
            Certificates and Minor Electrical Installation Works Certificates may be produced in any
            written or electronic form — provided their authenticity and integrity are verified by a
            reliable process or method, which must also verify that any copy is a true copy of the
            original.
          </p>
        </div>

        <SEOAppBridge
          title="EIC, Minor Works and EICR on the Appendix 6 model forms"
          description="Issue the right certificate on your phone, with the schedules attached and the recommended inspection interval prompted before you can sign off. Export a PDF and upload it straight to your scheme portal."
        />
      </>
    ),
  },
  {
    id: 'registration-categories',
    heading: 'NAPIT Registration Categories',
    content: (
      <>
        <p>
          NAPIT offers several registration categories for electricians, structured to match the
          scope of work you undertake.
        </p>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Electrical Competent Person Scheme</h3>
          <p className="text-sm leading-relaxed text-white">
            The core registration for electricians. It provides self-certification for notifiable
            domestic electrical work under Part P, and it is the scheme most electricians joining
            NAPIT for electrical work will register under.
          </p>
        </div>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Multi-Trade Registration</h3>
          <p className="text-sm leading-relaxed text-white">
            You can add multiple trades to one registration. A qualified electrician who also does
            plumbing, heating, ventilation, or building fabric work can register those trades under
            a single NAPIT membership, which keeps the compliance paperwork in one place.
          </p>
        </div>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Specialist Schemes</h3>
          <p className="text-sm leading-relaxed text-white">
            NAPIT also operates specialist schemes for specific types of work, including fire
            detection and alarm systems (BS 5839), emergency lighting (BS 5266), renewable energy
            installations, and electric vehicle charger installations. These can be added to your
            core electrical registration.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'requirements',
    heading: 'Requirements for NAPIT Registration',
    content: (
      <>
        <p>
          The requirements for NAPIT electrical registration are consistent with industry standards
          and are largely the same as those for any other competent person scheme.
        </p>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Qualifications required</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white marker:text-white">
            <li>
              <strong>Wiring Regulations:</strong> City &amp; Guilds 2382 or equivalent, covering
              the current edition — BS 7671:2018+A4:2026
            </li>
            <li>
              <strong>Inspection &amp; testing:</strong> City &amp; Guilds 2391 or equivalent, such
              as the older 2394/2395 — needed for initial verification and periodic inspection
            </li>
            <li>
              <strong>NVQ Level 3:</strong> NVQ Level 3 in Electrical Installation or equivalent —
              City &amp; Guilds 2357, or the 5357 apprenticeship, including the AM2 assessment
            </li>
          </ul>
        </div>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Other requirements</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white marker:text-white">
            <li>
              <strong>Public liability insurance:</strong> minimum 2 million pounds cover — higher
              cover may be required for some contract types
            </li>
            <li>
              <strong>Test instruments:</strong> calibrated multifunction tester, GS38-compliant
              voltage indicator, and an RCD tester if not integrated. All within calibration date.
            </li>
            <li>
              <strong>Business premises:</strong> a fixed address for correspondence and records. A
              home address is acceptable.
            </li>
            <li>
              <strong>Recent work samples:</strong> certificates from recent jobs for the assessor
              to review
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'NAPIT Registration Costs',
    content: (
      <>
        <p>
          The figures below are indicative. Scheme fees are reviewed annually and vary with the size
          of the business and the number of trades registered, so confirm the current fee schedule
          with NAPIT before you budget for it.
        </p>
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[440px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className={TH}>Item</th>
                <th className={TH}>Indicative figure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={TD}>Initial assessment fee (one-off)</td>
                <td className={`${TD} whitespace-nowrap`}>£250 – £400</td>
              </tr>
              <tr>
                <td className={TD}>Annual registration fee</td>
                <td className={`${TD} whitespace-nowrap`}>£280 – £380 a year</td>
              </tr>
              <tr>
                <td className={TD}>Total first year</td>
                <td className={`${TD} whitespace-nowrap`}>£530 – £780</td>
              </tr>
              <tr>
                <td className={TD}>Multi-trade registration</td>
                <td className={TD}>Bundled pricing may be available across trades</td>
              </tr>
              <tr>
                <td className={TD}>New joiner promotions</td>
                <td className={TD}>First-year discounts are offered from time to time</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          As with all competent person scheme fees, NAPIT registration is a deductible business
          expense. Set against it the local authority building control charge you would otherwise
          pay on every notifiable job — those charges are set by each authority and commonly run to
          several hundred pounds per job, so registration tends to pay for itself over a handful of
          notifiable jobs a year.
        </p>
      </>
    ),
  },
  {
    id: 'application-process',
    heading: 'Application Process',
    content: (
      <>
        <p>
          You apply online through the NAPIT website, and the process typically takes 4 to 6 weeks
          from application to registration confirmation.
        </p>
        <p>
          Start by completing the online application form, selecting your registration category
          (Electrical Competent Person Scheme, plus any additional trades or specialist schemes).
          Upload copies of your qualifications, public liability insurance certificate, and test
          instrument calibration certificates. Provide your business details including trading name,
          address, and the names and qualifications of all qualified personnel.
        </p>
        <p>
          Once NAPIT has reviewed your application and verified your documentation, they will
          schedule an assessment visit. The assessment is carried out at your premises by a NAPIT
          assessor and typically takes 2 to 3 hours. The assessor reviews your qualifications,
          instruments, insurance, and samples of recent work. If the assessment is satisfactory,
          your registration is confirmed and you receive your NAPIT membership number and access to
          the NAPIT online contractor portal.
        </p>
      </>
    ),
  },
  {
    id: 'annual-assessment',
    heading: 'Annual Assessment',
    content: (
      <>
        <p>
          Like all competent person schemes, NAPIT requires an annual assessment to maintain your
          registration. It is carried out by a NAPIT assessor and focuses on work completed since
          the last visit: a sample of your certificates is checked for completeness and accuracy,
          your qualifications, insurance and instrument calibrations are confirmed as current, and
          the assessor may visit a recent job site. Technical questions on current regulations and
          testing procedures are part of it.
        </p>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>Certificate fields assessors look for (A4:2026)</h3>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-white marker:text-white">
            <li>
              <strong>Recommended inspection interval (Reg 644.4).</strong> Every EIC must record
              the recommendation for the interval between initial verification and the first
              periodic inspection. BS 7671 states this in mandatory terms, and a blank field is the
              single easiest thing for an assessor to spot.
            </li>
            <li>
              <strong>SPD and AFDD details (Appendix 6).</strong> A4:2026 added fields to the model
              forms and the guidance for recipients specifically for recording the details of surge
              protective devices and arc fault detection devices. Certificates issued since the
              amendment should populate them where such devices are installed.
            </li>
            <li>
              <strong>The split test-result pages (Appendix 6).</strong> The generic single-page
              schedule of test results was redrafted at A4:2026 into a separate schedule of circuit
              details and a separate schedule of test results. Forms still on the old single page
              are out of date.
            </li>
            <li>
              <strong>Extent of the work covered (Reg 644.3).</strong> The certificate is not
              complete unless it says what portion of the installation it relates to, with the
              Schedule(s) of Inspection and the Schedule(s) of Circuit Details and Test Results
              attached.
            </li>
          </ul>
        </div>
        <p>
          If the assessor identifies non-conformances you receive a corrective action report with
          specific issues and a deadline. Minor issues are common and usually resolved quickly.
          Serious or persistent non-compliance can lead to enhanced monitoring, additional
          assessment visits, or ultimately suspension or withdrawal of registration.
        </p>
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'Building Control Notification',
    content: (
      <>
        <p>
          The main practical benefit of registration is that you notify NAPIT through their online
          portal rather than notifying the local authority building control department yourself.
          NAPIT then issues the Building Regulations Compliance Certificate to the homeowner and
          registers the notification with the local authority on your behalf — no building control
          inspection, no building control charge, and the homeowner gets a formal certificate they
          can produce when they sell the property.
        </p>

        <h3 className="mt-8 text-[17px] font-bold tracking-tight text-white">
          Which work is notifiable?
        </h3>
        <p>
          Not all domestic electrical work is notifiable — but all of it, notifiable or not, still
          has to comply with BS 7671. The list below reflects Approved Document P as it applies in{' '}
          <strong>England</strong>.
        </p>
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className={TH}>Notifiable</th>
                <th className={TH}>Not notifiable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              <tr>
                <td className={`${TD} w-1/2`}>
                  Installing a new circuit — including a new outdoor circuit or a supply to an
                  outbuilding
                </td>
                <td className={`${TD} w-1/2`}>
                  Like-for-like replacement of accessories on an existing circuit — sockets,
                  switches, ceiling roses
                </td>
              </tr>
              <tr>
                <td className={TD}>Replacing a consumer unit or distribution board</td>
                <td className={TD}>
                  Adding a socket or a fused spur to an existing circuit, outside a special location
                </td>
              </tr>
              <tr>
                <td className={TD}>
                  Any addition or alteration to an existing circuit in a special location — a room
                  containing a bath or shower, or a room containing a swimming pool or sauna heater
                </td>
                <td className={TD}>Replacing a light fitting outside a special location</td>
              </tr>
              <tr>
                <td className={TD}>
                  Electrical work forming part of an extension, loft conversion or similar building
                  work
                </td>
                <td className={TD}>Repair and maintenance work</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Wales, Scotland and Northern Ireland run their own building standards regimes, and the
          notifiable list in Wales is wider than the England list above — it still catches work in
          kitchens and outdoors. Check the guidance for the nation you are working in before you
          decide a job is exempt.
        </p>

        <h3 className="mt-8 text-[17px] font-bold tracking-tight text-white">
          How the notification works
        </h3>
        <p>
          Complete the work and issue the appropriate{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            electrical certificate
          </SEOInternalLink>{' '}
          — an EIC, or a Minor Works Certificate where no new circuit is involved. Then log into the
          NAPIT portal, enter the installation address, the type of work, the date of completion and
          the certificate reference, and upload the certificate. Do it within the notification
          window; late notification is one of the things that shows up at assessment.
        </p>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of NAPIT Registration',
    content: (
      <>
        <div className={`${CARD_PADDED} my-6`}>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-white marker:text-white">
            <li>
              <strong>Part P self-certification:</strong> certify notifiable domestic work without
              building control involvement, and without the local authority charge on every job
            </li>
            <li>
              <strong>Multi-trade coverage:</strong> electrical, gas, plumbing, heating and building
              fabric under one membership, which keeps compliance in one place for multi-trade firms
            </li>
            <li>
              <strong>Find a Tradesperson directory:</strong> your business appears on the NAPIT
              website directory when homeowners search for a registered electrician in their area
            </li>
            <li>
              <strong>Technical support helpline:</strong> access to NAPIT&rsquo;s technical team for
              regulation interpretation and BS 7671 queries
            </li>
            <li>
              <strong>Insurance-backed warranty:</strong> cover offered on domestic work, protecting
              the homeowner if the contractor ceases trading
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'napit-vs-niceic',
    heading: 'NAPIT vs NICEIC: Which Should You Choose?',
    content: (
      <>
        <p>
          This is the most common question electricians ask before joining a scheme, and the
          technical half of it has a short answer. NAPIT and{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink> are both
          Government-authorised competent person schemes under Part P. A Building Regulations
          Compliance Certificate from either carries the same legal weight, and the electrical
          certificate you issue is the same BS 7671 Appendix 6 model form either way. Nothing about
          the standard of work, the tests, or the paperwork changes with the badge.
        </p>
        <p>
          So the decision is commercial, not technical. Rather than rely on second-hand figures,
          take the checklist below to each scheme&rsquo;s own published information and compare like
          for like.
        </p>
        <div className={`${CARD_PADDED} my-6`}>
          <h3 className={CARD_H3}>What to compare before you commit</h3>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-white marker:text-white">
            <li>
              <strong>Current fee schedule.</strong> Initial assessment plus annual registration,
              and whether the first year is discounted. Both are reviewed annually, so a figure you
              read anywhere else may already be out of date.
            </li>
            <li>
              <strong>Trades covered.</strong> Whether one membership covers everything you do, or
              you would need a second registration elsewhere.
            </li>
            <li>
              <strong>Assessment format.</strong> How often you are assessed, where it happens, and
              how many certificates get sampled.
            </li>
            <li>
              <strong>What your clients specify.</strong> Main contractors, housing associations and
              some tender documents name a particular scheme. That is often the deciding factor and
              it costs nothing to ask before you join.
            </li>
            <li>
              <strong>Consumer-facing extras.</strong> Directory listing, insurance-backed warranty
              and any dispute service — these are what the homeowner sees.
            </li>
            <li>
              <strong>Transfer terms.</strong> If you are moving from another scheme, check for a
              transfer discount and time the switch to the end of your current registration so you
              are not paying twice.
            </li>
          </ul>
        </div>
        <p>
          There is no wrong answer. Both schemes are Government-authorised, both give you the same
          self-certification ability, and both underpin certificates with identical legal standing.
          The best choice depends on your client base, the trades you cover, and your budget.
        </p>
        <SEOAppBridge
          title="Scheme-agnostic certificates, built to BS 7671:2018+A4:2026"
          description="Elec-Mate produces the Appendix 6 model forms whichever scheme you are registered with. PDF export, digital signatures and cloud storage, so the certificate is ready to upload to your scheme portal the moment you leave site."
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description:
      'NICEIC registration types, requirements, costs, and application process for UK electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable vs non-notifiable work, competent person schemes, and compliance requirements.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'All 8 UK electrical certificate types explained — EICR, EIC, Minor Works, and more.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-retention',
    title: 'Certificate Retention Periods',
    description:
      'How long to keep electrical certificates, landlord requirements, and digital storage.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A4:2026 including Amendment 4 changes.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs on your phone with board scanner and defect code AI.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NAPICertificateGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-20"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          NAPIT Certificate Guide: <span className="text-yellow-400">Registration & Forms</span>
        </>
      }
      heroSubtitle="NAPIT is a Government-authorised competent person scheme under Part P of the Building Regulations, so a registered electrician can self-certify notifiable domestic work. This guide covers which certificate you actually issue, registration categories and qualifications, costs, the application and annual assessment, and how building control notification works."
      readingTime={16}
      answerBox={{
        question: 'What is a NAPIT Building Regulations Compliance Certificate?',
        answer:
          'It is the document NAPIT issues to the homeowner confirming that notifiable domestic electrical work complies with Part P of the Building Regulations. You do not write it. You issue the BS 7671 certificate for the work — an EIC, a Minor Works Certificate or an EICR on the Appendix 6 model form — then notify NAPIT through their online portal, typically within 30 days. NAPIT sends the compliance certificate to the homeowner and registers the notification with local authority building control.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Certificates That Work With Any Scheme"
      ctaSubheading="Join 1,000+ UK electricians producing BS 7671:2018+A4:2026 certificates with Elec-Mate. Appendix 6 model forms, PDF export, digital signatures and cloud storage — ready to upload to your scheme portal. 7-day free trial."
    />
  );
}
