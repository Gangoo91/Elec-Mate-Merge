import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  FileText,
  BookOpen,
  ClipboardCheck,
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Minor Works vs EIC', href: '/guides/minor-works-vs-eic' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'when-minor-works', label: 'When to Use Minor Works' },
  { id: 'when-eic', label: 'When EIC Is Required' },
  { id: 'practical-examples', label: 'Practical Examples' },
  { id: 'part-p', label: 'Part P and Notifiable Work' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'edge-cases', label: 'Edge Cases and Grey Areas' },
  { id: 'elecmate-auto-select', label: 'Auto-Select in Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'If you are installing a new circuit (running a new cable from the distribution board with a new protective device), you need a full EIC. If you are adding to or altering an existing circuit, use a Minor Works certificate.',
  'Like-for-like replacement of accessories (same type, same location) does not require any certificate — just verify CPC continuity and polarity.',
  'In dwellings, new circuit installation is notifiable under Part P. Most minor works outside special locations are non-notifiable but still require a Minor Works certificate.',
  'Consumer unit replacement is an edge case — most scheme providers accept a Minor Works certificate for each circuit, but some require an EIC. Check with your registration body.',
  'Elec-Mate has both Minor Works and EIC forms built in, plus 6 other certificate types. The app helps you select the right form based on the scope of work.',
];

const faqs = [
  {
    question: 'What is the key rule for choosing between Minor Works and EIC?',
    answer:
      'The key rule is whether a new circuit is being installed. If the work involves running a new cable from the distribution board with a new protective device (MCB, RCBO, or fuse), you are installing a new circuit and a full Electrical Installation Certificate (EIC) is required. If the work is an addition or alteration to an existing circuit — such as adding a socket outlet to an existing ring, extending a lighting circuit, or installing a fused connection unit from an existing supply — a Minor Electrical Installation Works Certificate is the correct document. This distinction comes from BS 7671 Regulations 631.1 (EIC) and 631.2 (Minor Works). The defining question is: did you install a new protective device at the distribution board for a new circuit? If yes, EIC. If no, Minor Works.',
  },
  {
    question: 'Does replacing a consumer unit require an EIC or Minor Works?',
    answer:
      'Consumer unit replacement is one of the most debated grey areas in UK electrical certification. Since no new circuits are being created — you are replacing the existing protective devices on existing circuits — it is technically an alteration rather than a new installation. Many contractors issue a Minor Works certificate for each circuit affected (or one Minor Works for the entire board replacement), and most scheme providers accept this approach. However, some scheme providers prefer a full EIC for consumer unit replacements on the basis that the scale of the work (removing and replacing all protective devices, re-terminating all circuits) warrants the more comprehensive certificate. The safest approach is to check with your specific competent person scheme provider (NICEIC, NAPIT, ELECSA) for their preferred method. Regardless of which certificate you use, consumer unit replacement in a dwelling is always notifiable under Part P.',
  },
  {
    question: 'Can I use a Minor Works certificate for work in a bathroom?',
    answer:
      'Yes, a Minor Works certificate can be used for work in a bathroom, provided the work does not involve installing a new circuit. For example, repositioning an existing light switch outside the bathroom, adding an additional light point to an existing lighting circuit, or replacing a shaver socket are all additions or alterations to existing circuits and would be covered by a Minor Works certificate. However, if the work involves installing a new circuit — for example, a new radial circuit for an electric shower or a new circuit for underfloor heating — a full EIC is required. It is important to note that any electrical work in a bathroom (or a room containing a shower) is notifiable under Part P in England and Wales, regardless of whether it requires an EIC or Minor Works certificate. This means you must either self-certify through a competent person scheme or notify building control.',
  },
  {
    question: 'What happens if I issue a Minor Works certificate when an EIC was needed?',
    answer:
      'Issuing the wrong certificate is a compliance failure. If a new circuit has been installed and you issue a Minor Works certificate instead of a full EIC, your competent person scheme provider may flag this during a scheme inspection or sample check. Consequences can include: a requirement to issue the correct certificate retrospectively, additional monitoring of your work (more frequent scheme inspections), a formal warning or improvement notice, and in serious or repeated cases, suspension or termination of your scheme membership. Beyond the scheme implications, it can also create problems for the homeowner — building control may not accept a Minor Works certificate for notifiable work that should have been covered by an EIC, potentially causing issues when the property is sold.',
  },
  {
    question: 'Do I need a certificate for installing a new light fitting?',
    answer:
      'It depends on whether the work is a like-for-like replacement or an addition/alteration. If you are replacing an existing light fitting with a new one in the same position, on the same circuit, with the same type of connection, this is a like-for-like replacement and does not require a certificate (though you should verify CPC continuity and polarity). If you are adding a new light point to an existing circuit (extending the circuit), this is an alteration and requires a Minor Works certificate. If you are installing a completely new lighting circuit from the distribution board (for example, for a new extension), this is a new circuit and requires a full EIC. The key distinction is always whether the circuit itself has been altered or extended (Minor Works) versus whether a new circuit has been created (EIC) versus whether nothing has changed at the circuit level (like-for-like, no certificate).',
  },
  {
    question: 'Is adding an EV charger Minor Works or EIC?',
    answer:
      'In almost all cases, an EV charger installation requires a full EIC. This is because an EV charger typically needs a new dedicated circuit from the distribution board — usually a 32A radial circuit with its own protective device. Since a new circuit is being installed, the EIC is the correct certificate. The only scenario where a Minor Works might be appropriate is if the EV charger is being connected to an existing circuit via a fused connection unit or similar arrangement, without a new protective device at the board — but this is unusual and unlikely to comply with the charger manufacturer installation requirements. EV charger installation in a dwelling is also notifiable under Part P because it involves a new circuit. Elec-Mate includes a dedicated EV Charger Installation Certificate that covers the specific requirements for charge point installations.',
  },
  {
    question: 'How many Minor Works certificates do I need for multiple alterations on one job?',
    answer:
      'Each separate alteration to an existing circuit should have its own Minor Works certificate. If you are adding sockets to two different existing circuits, that is two Minor Works certificates — one for each circuit that has been modified. If you are making multiple additions to the same circuit (for example, adding two socket outlets to the same ring final circuit), a single Minor Works certificate can cover all the work on that one circuit. The principle is that each Minor Works certificate relates to the work carried out on a single existing circuit. If the job involves work on multiple circuits, issue a separate certificate for each one. This ensures that the test results recorded on each certificate specifically relate to the circuit that was altered.',
  },
];

const relatedPages = [
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate App',
    description: 'Digital Minor Works certificates with auto-fill and instant PDF export.',
    icon: FileText,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Full Electrical Installation Certificates for new work and alterations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Digital EICRs for periodic inspection and testing of existing installations.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Complete guide to notifiable vs non-notifiable work, competent person schemes, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-vs-eic-difference',
    title: 'EICR vs EIC Difference',
    description: 'When to use an EICR and when to use an EIC. Full comparison guide.',
    icon: ArrowLeftRight,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'All 8 certificate types explained — when to use each one.',
    icon: BookOpen,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Minor Works vs EIC — Which Certificate Do I Need?',
    content: (
      <>
        <p>
          Choosing between a Minor Electrical Installation Works Certificate and a full Electrical
          Installation Certificate (EIC) is one of the most common questions UK electricians face on
          site. The answer is always determined by one question:{' '}
          <strong>have you installed a new circuit?</strong>
        </p>
        <p>
          If the work involves running a new cable from the distribution board with a new protective
          device (MCB, RCBO, or fuse), you are installing a new circuit and a full{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> is required. If the
          work is an addition or alteration to an existing circuit — without creating a new one — a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works certificate
          </SEOInternalLink>{' '}
          is the correct document.
        </p>
        <p>
          This distinction comes from BS 7671 Regulations 631.1 and 631.2. Regulation 631.1 requires
          an EIC for new installations and additions or alterations that include new circuits.
          Regulation 631.2 requires a Minor Works certificate for additions or alterations to
          existing circuits that do not extend to the installation of a new circuit.
        </p>
        <p>
          Getting this right matters. Issuing the wrong certificate can result in scheme provider
          disciplinary action, building control complications, and potential liability issues. This
          guide covers the clear-cut cases, the grey areas, and practical examples from real site
          work.
        </p>
      </>
    ),
  },
  {
    id: 'when-minor-works',
    heading: 'When to Use a Minor Works Certificate',
    content: (
      <>
        <p>
          A Minor Electrical Installation Works Certificate is used for additions or alterations to
          an existing circuit that do not involve the installation of a new circuit. The work must
          still comply fully with BS 7671, and proper inspection and testing must be carried out —
          the term "minor" refers to the scope of the electrical work, not its importance.
        </p>
        <p>Common examples of work requiring a Minor Works certificate:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Adding a socket outlet</strong> to an existing ring final circuit — for example,
            installing a new double socket in a living room by spurring from an existing socket
          </li>
          <li>
            <strong>Extending a lighting circuit</strong> — adding a new light point or light switch
            to an existing lighting circuit
          </li>
          <li>
            <strong>Installing a fused connection unit (FCU)</strong> to supply a fixed appliance
            (such as a towel rail, extractor fan, or waste disposal unit) from an existing circuit
          </li>
          <li>
            <strong>Repositioning an existing accessory</strong> — moving a socket outlet or light
            switch to a different location on the same circuit
          </li>
          <li>
            <strong>Consumer unit replacement</strong> — replacing the consumer unit on existing
            circuits (no new circuits added). Note: check with your scheme provider, as some prefer
            an EIC for this work
          </li>
          <li>
            <strong>Installing a fused spur</strong> from an existing ring or radial circuit to
            supply a fixed appliance
          </li>
        </ul>
        <p>
          It is important to note that a like-for-like replacement of accessories (swapping a socket
          for an identical one in the same position) does not require any certificate, provided you
          verify CPC continuity and polarity. This is covered by BS 7671 Regulation 620.3.
        </p>
        <SEOAppBridge
          title="Minor Works in Under 3 Minutes"
          description="Elec-Mate auto-fills your company details, personal information, and scheme registration number. Enter the circuit details, test results, and signature — the PDF is ready to send before you pack up. All 8 certificate types in one app."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'when-eic',
    heading: 'When a Full EIC Is Required',
    content: (
      <>
        <p>
          An Electrical Installation Certificate is required whenever a new circuit is installed.
          The defining characteristic is that a new protective device has been added to the
          distribution board to protect a new cable run. This applies whether the property is
          new-build, existing domestic, commercial, or industrial.
        </p>
        <p>Common examples of work requiring an EIC:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>New radial circuit for an electric shower</strong> — a dedicated circuit from
            the consumer unit, typically 10 mm cable on a 40A or 45A MCB
          </li>
          <li>
            <strong>New dedicated cooker circuit</strong> — a separate circuit from the board for a
            new cooker or hob installation
          </li>
          <li>
            <strong>Complete or partial rewire</strong> — replacing all or some of the existing
            wiring with new circuits
          </li>
          <li>
            <strong>New ring final circuit for an extension</strong> — extending the property with
            new rooms that need their own circuits
          </li>
          <li>
            <strong>EV charger installation</strong> — typically a new 32A dedicated radial circuit
            from the consumer unit
          </li>
          <li>
            <strong>New garden or outbuilding supply</strong> — a new circuit from the main board to
            supply a shed, workshop, or garden room
          </li>
          <li>
            <strong>New-build installations</strong> — first-fix and second-fix of a brand new
            property
          </li>
          <li>
            <strong>Solar PV installation</strong> — a new circuit for the inverter and generation
            meter
          </li>
        </ul>
        <p>
          The EIC has three signature blocks — designer, constructor, and inspector — reflecting the
          greater scope and complexity of new circuit work. On domestic jobs, one person typically
          fulfils all three roles. The EIC also includes a full schedule of inspections and schedule
          of test results for every new circuit.
        </p>
        <SEOAppBridge
          title="Full EIC with Three Signature Blocks"
          description="Elec-Mate includes the complete EIC form with all three signature blocks, schedule of inspections, and schedule of test results. Auto-validates all test results against BS 7671 limits as you enter them on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'practical-examples',
    heading: 'Practical Examples — Real Site Scenarios',
    content: (
      <>
        <p>
          Theory is straightforward, but real site work throws up scenarios that are not always
          clear-cut. Here are practical examples based on common jobs.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Installing a bathroom extractor fan</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>If wired from existing lighting circuit via FCU:</strong> Minor Works
              certificate. You are connecting into an existing circuit, not creating a new one.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>If wired on a new dedicated circuit from the consumer unit:</strong> EIC. A
              new protective device at the board means a new circuit. Note: work in a bathroom is
              notifiable under Part P regardless of which certificate type.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Adding outdoor lighting</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>If extending an existing interior lighting circuit to the garden:</strong>{' '}
              Minor Works certificate. The existing circuit is being extended.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>
                If installing a new circuit from the consumer unit for garden lighting:
              </strong>{' '}
              EIC. New protective device at the board = new circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Adding sockets in a kitchen extension</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>
                If adding spurs from the existing ring final circuit into the extension:
              </strong>{' '}
              Minor Works certificate. You are extending an existing circuit.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>If installing a new ring final circuit for the extension:</strong> EIC. A
              brand new circuit with its own MCB at the board.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Converting a single socket to a double</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Like-for-like swap in the same back box:</strong> No certificate required
              (verify CPC and polarity).{' '}
              <strong>If the back box position changes or the circuit is extended:</strong> Minor
              Works certificate.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Installing a home office supply</h3>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>If adding sockets from an existing ring in the room:</strong> Minor Works.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>
                If running a new dedicated circuit for the office (perhaps with a separate RCBO for
                sensitive equipment):
              </strong>{' '}
              EIC.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Notifiable Work',
    content: (
      <>
        <p>
          The choice between Minor Works and EIC also intersects with{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (Approved Document P), which governs electrical safety in dwellings in England and Wales.
          Understanding which work is notifiable helps you comply with building regulations as well
          as BS 7671.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-yellow-400 text-lg mb-3">Notifiable Work</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Requires either self-certification via a competent person scheme or notification to
              building control before starting work.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Installation of a new circuit (always EIC)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Consumer unit replacement (Minor Works or EIC)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Any electrical work in a bathroom or shower room</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Work associated with a new extension or loft conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>New outdoor circuits or outbuilding supplies</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Non-Notifiable Work</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Still requires a Minor Works certificate under BS 7671, but does not need to be
              notified to building control.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Adding sockets to existing circuits outside special locations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Extending lighting circuits outside special locations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Installing FCUs from existing circuits outside special locations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Repositioning accessories on existing circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Like-for-like replacements (no certificate needed)</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA, STROMA, or
          BRE), you can self-certify notifiable work by submitting the relevant BS 7671 certificate
          to your scheme provider. They issue a Building Regulations Compliance Certificate on your
          behalf. If you are not registered with a scheme, you must notify building control before
          starting any notifiable work, and they will inspect and approve the completed work.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes When Choosing the Certificate',
    content: (
      <>
        <p>
          Scheme inspectors consistently flag the same certification errors. Avoiding these mistakes
          saves time, protects your scheme membership, and demonstrates professionalism.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Issuing Minor Works for a new circuit</h3>
                <p className="text-white text-sm leading-relaxed">
                  The most common error. If a new MCB or RCBO has been installed at the distribution
                  board to protect a new cable run, a full EIC is required. A Minor Works
                  certificate is not sufficient for new circuit installation — regardless of how
                  "minor" the circuit might seem. A new radial for a single outdoor socket is still
                  a new circuit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Issuing an EIC for a simple socket addition
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The opposite error. If you are adding a spur from an existing ring final circuit,
                  this is an alteration to an existing circuit and a Minor Works certificate is the
                  correct document. An EIC is overkill and technically incorrect, as the
                  three-signature structure (designer, constructor, inspector) is not designed for
                  minor alterations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not issuing any certificate at all</h3>
                <p className="text-white text-sm leading-relaxed">
                  Some electricians skip the certificate entirely, especially on small jobs. This is
                  never acceptable. BS 7671 requires certification for all installation work (except
                  like-for-like replacements). The certificate is the client's proof that the work
                  has been carried out safely. Without it, the client has no documentation — which
                  causes problems when selling the property, renewing insurance, or dealing with
                  scheme inspections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Using an EICR to certify your own work
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  An <SEOInternalLink href="/guides/eicr-vs-eic-difference">EICR</SEOInternalLink>{' '}
                  is for periodic inspection of existing installations — it reports on condition,
                  not compliance of new work. If you have carried out installation work, you need an
                  EIC or Minor Works certificate to certify that work. The EICR is a separate
                  document used for a different purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'edge-cases',
    heading: 'Edge Cases and Grey Areas',
    content: (
      <>
        <p>
          While the "new circuit = EIC, existing circuit alteration = Minor Works" rule covers most
          situations, several edge cases create genuine ambiguity.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Consumer unit replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              No new circuits are being created, but all protective devices are being replaced. Most
              scheme providers accept a Minor Works certificate (one per circuit or one per board).
              Some prefer an EIC. The work is always notifiable under Part P. Check with your
              registration body for their specific guidance.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Adding an RCBO to an existing circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              If you are retrofitting an RCBO to replace an MCB on an existing circuit (to add RCD
              protection), this is an alteration to an existing circuit — Minor Works certificate.
              You are not adding a new circuit; you are changing the protective device on an
              existing one.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Splitting a circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              If you split an existing circuit into two circuits (for example, splitting a combined
              upstairs/downstairs lighting circuit into two separate circuits), the result is a new
              circuit. An EIC is required for the new circuit, and a Minor Works certificate for the
              alteration to the existing circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Converting a ring to two radials</h3>
            <p className="text-white text-sm leading-relaxed">
              If you convert an existing ring final circuit into two separate radial circuits, you
              are creating a new circuit (the second radial). An EIC covers the new circuit. A Minor
              Works certificate covers the alteration of the original ring into a radial. If in
              doubt, issue an EIC for the entire scope of work — it is always acceptable to
              "over-certify" with the more comprehensive document.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-auto-select',
    heading: 'Choosing the Right Form in Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate includes both the Minor Works and EIC forms — along with 6 other certificate
          types — in one app. All forms follow the BS 7671 Appendix 6 model form structure and
          include auto-fill, digital signatures, test result validation, and professional PDF
          export.
        </p>
        <p>
          When you start a new certificate in Elec-Mate, the app asks about the scope of work. Based
          on your answers — are you installing new circuits, altering existing circuits, or
          inspecting an existing installation — it guides you to the right certificate type. This
          helps avoid the most common mistake of issuing the wrong form.
        </p>
        <p>
          For the <strong>Minor Works certificate</strong>, Elec-Mate auto-fills your company
          details and scheme registration number, provides description templates for common types of
          minor work, and validates all test results against BS 7671 limits. The certificate is
          complete in under 3 minutes for a routine job.
        </p>
        <p>
          For the <strong>EIC</strong>, the app supports all three signature blocks, the full
          schedule of inspections, and the complete schedule of test results. Values are validated
          as you enter them, and the app flags incomplete fields before you sign off.
        </p>
        <p>
          All 8 certificate types in Elec-Mate: EIC, Minor Works, EICR, Emergency Lighting, Fire
          Alarm, PAT Testing, EV Charger, and Solar PV. One subscription covers every certificate an
          electrician needs.
        </p>
        <SEOAppBridge
          title="All 8 Certificate Types in One App"
          description="Stop guessing which certificate to use. Elec-Mate guides you to the right form based on the scope of work. Minor Works, EIC, EICR, and 5 more — all with auto-fill, digital signatures, and PDF export."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

export default function MinorWorksVsEICPage() {
  return (
    <GuideTemplate
      title="Minor Works vs EIC | Which Certificate Do I Need? | Elec-Mate"
      description="When to use a Minor Works certificate and when a full EIC is required. Practical examples, Part P requirements, common mistakes, and edge cases. For UK electricians."
      datePublished="2025-05-08"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Minor Works vs EIC — <span className="text-yellow-400">Which Certificate Do I Need?</span>
        </>
      }
      heroSubtitle="New circuit? EIC. Alteration to an existing circuit? Minor Works. The rule is simple, but the real-world scenarios are not always clear-cut. This guide covers the straightforward cases, the grey areas (consumer unit replacement, circuit splitting, bathroom work), and the practical examples that help you get it right every time."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Minor Works vs EIC"
      relatedPages={relatedPages}
      ctaHeading="Right certificate, every time"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site certification. Minor Works, EIC, EICR, and 5 more certificate types. 7-day free trial."
    />
  );
}
