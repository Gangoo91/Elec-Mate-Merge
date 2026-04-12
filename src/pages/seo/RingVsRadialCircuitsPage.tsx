import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Wrench,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Ring vs Radial Circuits', href: '/guides/ring-vs-radial-circuits' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'ring-final-circuits', label: 'Ring Final Circuits' },
  { id: 'radial-circuits', label: 'Radial Circuits' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'ring-continuity-testing', label: 'Ring Continuity Testing' },
  { id: 'load-calculations', label: 'Load Calculations' },
  { id: 'when-to-use-each', label: 'When to Use Each Circuit Type' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A ring final circuit leaves the consumer unit, serves a series of socket outlets, and returns to the same terminals — forming a complete ring. This gives each outlet two parallel paths back to the consumer unit, effectively doubling the current-carrying capacity.',
  'A radial circuit leaves the consumer unit and terminates at the last outlet — there is no return path. Radial circuits are protected by a 20A or 32A overcurrent device depending on the cable size and floor area served.',
  'BS 7671 Section 433 and Appendix 15 govern ring final circuit design. A single 32A ring final circuit in 2.5mm² twin and earth (clipped direct) may serve a floor area with no prescribed limit, provided the connected load does not exceed 7,200VA.',
  'Ring continuity testing uses the r1+r2/4 method to verify the ring is complete and unbroken. Each leg of the ring is measured, then cross-connected, and the resistance at each outlet must fall within 0.05Ω of the calculated value.',
  'Radial circuits are increasingly preferred for new installations because they are simpler to install, easier to test, and avoid compliance problems arising from incorrectly wired rings or spurs.',
];

const faqs = [
  {
    question: 'What is the maximum floor area a ring final circuit can serve?',
    answer:
      'Under BS 7671:2018+A3:2024 Appendix 15, a 32A ring final circuit in 2.5mm² twin and earth cable (Method C, clipped direct) has no prescribed maximum floor area, provided the connected load does not exceed 7,200VA and the circuit design is appropriate. The historical IEE guidance of 100m² per ring was a rule of thumb, not a BS 7671 regulation. In practice, the current in each leg of the ring must not exceed the cable current-carrying capacity at any point. For large open-plan floors with high-power loads, the ring may need to be divided into two separate circuits.',
  },
  {
    question: 'Can I add spurs to a ring final circuit?',
    answer:
      'Yes, with restrictions. A non-fused spur may serve only one single or one twin socket outlet (or one item of fixed equipment via a fused connection unit). The number of non-fused spurs must not exceed the number of socket outlets forming the ring itself. Fused spurs (via a 13A fused connection unit) may feed additional outlets or fixed equipment and are not limited in number. The spur connection point must be at a socket outlet on the ring — never at a junction box mid-ring, which would create a T-junction. Any spur reduces the effective current capacity of that section of the ring.',
  },
  {
    question: 'What are the BS 7671 requirements for a radial circuit serving socket outlets?',
    answer:
      'BS 7671 Appendix 15, Table A15.1 covers radial circuits for socket outlets. A 20A radial circuit in 2.5mm² cable (Method C) may serve a floor area up to 50m². A 32A radial circuit in 4.0mm² cable (Method C) may serve a floor area up to 75m². These are guidance values — the circuit must still be designed correctly for the connected load. Earth fault loop impedance (Zs) must be within the limit for the protective device.',
  },
  {
    question: 'How do I carry out ring continuity testing?',
    answer:
      'The ring continuity test is described in BS 7671 Appendix 14 and GN3. Method: (1) Measure the end-to-end resistance of the line conductor (r1) and the earth conductor (r2) with the ring disconnected at the consumer unit. (2) Cross-connect the line of one end to the earth of the other end. (3) Measure resistance between line and earth at every outlet — each reading should be approximately (r1+r2)/4. (4) Readings significantly higher than (r1+r2)/4 indicate a break or poor connection. Readings significantly lower may indicate an unintended parallel path.',
  },
  {
    question: 'Is a ring final circuit better than a radial circuit?',
    answer:
      'Neither is universally better. Ring final circuits were developed in the 1940s to maximise use of copper during post-war shortages. They use 2.5mm² cable protected by a 32A fuse to serve a large floor area because the ring provides two parallel paths. Radial circuits are simpler: one cable from the consumer unit to the last outlet. Radial circuits are easier to install, easier to test, and eliminate the risk of incorrectly wired rings creating dangerous spurs masquerading as a ring. Many electricians prefer radial circuits for new work.',
  },
  {
    question: 'What happens if a ring final circuit is broken at one point?',
    answer:
      'If the ring is broken at any single point, it becomes a radial circuit. The outlets beyond the break are still powered — there is no immediate indication. However, if load is concentrated beyond the break, the remaining cable must carry the full current through a single path. A 2.5mm² cable (rated 27A clipped direct) may be overloaded if the load exceeds 27A. A broken ring is a Code C2 observation on an EICR. Ring continuity testing during inspection will identify the break.',
  },
  {
    question: 'Can I use 1.5mm² cable for a ring final circuit?',
    answer:
      'No. A ring final circuit for socket outlets must use a minimum of 2.5mm² cable, protected by a 32A overcurrent device. Using 1.5mm² cable on a 32A ring is a serious non-compliance — the cable is rated at only 18.5A (clipped direct) or less depending on installation method, and would be overloaded under fault conditions. Always check cable current-carrying capacity against BS 7671 Appendix 4 Tables 4D1A to 4D5A.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for ring and radial circuits with automatic derating and voltage drop.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for new circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the 18th Edition Wiring Regulations and Amendment 3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study ring continuity testing and all other inspection and testing methods.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Ring Final Circuits vs Radial Circuits: The Complete UK Guide',
    content: (
      <>
        <p>
          The ring final circuit has been the dominant method of wiring socket outlets in UK
          domestic installations for over seventy years. It is unique to the UK — virtually no
          other country uses ring circuits. Understanding why the ring circuit was developed, how
          it works, and when to use it (or when to choose a radial circuit instead) is fundamental
          knowledge for every UK electrician.
        </p>
        <p>
          The regulatory requirements for ring final circuits are set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 433 (protection against overcurrent), Regulation 433.1.204 (socket outlets on
          ring circuits), and Appendix 15 (guidance on ring and radial circuits for socket
          outlets). The ring continuity test method is described in BS 7671 Appendix 14 and GN3.
        </p>
      </>
    ),
  },
  {
    id: 'ring-final-circuits',
    heading: 'Ring Final Circuits: How They Work',
    content: (
      <>
        <p>
          A ring final circuit consists of a single cable that leaves the consumer unit, visits a
          series of socket outlets, and returns to the same consumer unit terminals — forming a
          complete ring. At the consumer unit, both ends of the ring connect to the same MCB or
          fuse, the same neutral bar, and the same earth bar.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Why the Ring Works</h3>
          <p className="text-white text-sm leading-relaxed">
            The ring provides two parallel paths for current to flow from the consumer unit to any
            socket outlet. With 2.5mm² cable (rated 27A clipped direct), the ring can carry up to
            27A in each leg simultaneously — a total of 54A potential capacity. This allows the
            circuit to be protected by a 32A overcurrent device while serving a large floor area.
            The 32A protection is for the cable, not each outlet — each outlet is limited to 13A
            by the fuse in the plug.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable:</strong> 2.5mm² twin and earth (6242Y), both line and earth
                conductors forming the ring. CPC is 1.5mm² in standard 6242Y.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection:</strong> 32A BS EN 60898 Type B MCB (or 30A BS 1361 fuse in
                older installations). RCBO protection is recommended for new installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outlets:</strong> 13A switched socket outlets with BS 1363 shuttered
                sockets. Fused connection units for fixed appliances. Non-fused spurs permitted
                subject to limitations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'radial-circuits',
    heading: 'Radial Circuits for Socket Outlets',
    content: (
      <>
        <p>
          A radial circuit starts at the consumer unit and terminates at the last socket outlet.
          There is no return conductor. Current flows in one direction from the consumer unit to
          each outlet. The cable must be sized to carry the maximum expected load for the entire
          circuit.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">20A Radial Circuit</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Cable: 2.5mm² twin and earth</li>
              <li>Protection: 20A MCB (Type B)</li>
              <li>Max floor area: 50m² (Appendix 15 guidance)</li>
              <li>Suitable for: bedrooms, small rooms</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">32A Radial Circuit</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Cable: 4.0mm² twin and earth</li>
              <li>Protection: 32A MCB (Type B)</li>
              <li>Max floor area: 75m² (Appendix 15 guidance)</li>
              <li>Suitable for: kitchens, living areas</li>
            </ul>
          </div>
        </div>
        <p>
          Radial circuits are gaining popularity for new UK installations because they are simpler
          to install, easier to test, and cannot be incorrectly wired in a way that masquerades
          as a ring. Modern low-power devices mean the diversity assumptions underlying ring
          circuit design are less applicable to contemporary households.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements: Section 433 and Appendix 15',
    content: (
      <>
        <p>
          The key BS 7671 regulations governing ring and radial circuits include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 433.1.204</strong> — socket outlets forming part of a ring
                final circuit shall be connected to both legs of the ring. An outlet connected to
                only one leg forms a spur, not a ring connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Appendix 15, Table A15.1</strong> — guidance on floor areas: 32A ring
                (2.5mm²) — no prescribed floor area limit; 20A radial (2.5mm²) — 50m²; 32A
                radial (4.0mm²) — 75m².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 543.1</strong> — for a ring final circuit, the CPC must also
                form a ring, connected at both ends to the earth terminal. A broken CPC ring is a
                Code C2 defect on an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Appendix 4, Tables 4D1A–4D5A</strong> — current-carrying capacity tables.
                Installation method affects current rating: 2.5mm² 6242Y is rated 27A (Method C)
                or 20A (Method B, enclosed in insulation).
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Check your circuit design with AI"
          description="Elec-Mate's AI circuit designer can verify ring and radial circuit designs against BS 7671 requirements, calculate load diversity, and check earth fault loop impedance compliance."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'ring-continuity-testing',
    heading: 'Ring Continuity Testing: The r1+r2/4 Method',
    content: (
      <>
        <p>
          Ring continuity testing is a mandatory inspection and test procedure for ring final
          circuits, required by BS 7671 and described in GN3. It verifies that the ring is
          complete and unbroken, and that no outlets have been incorrectly wired as spurs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-bold text-yellow-400">1.</span>
              <span>
                <strong>Measure end-to-end resistance of each conductor.</strong> With the ring
                disconnected at the consumer unit, measure the resistance of the line conductor
                (L1 to L2) — call this r1. Measure the CPC (E1 to E2) — call this r2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-bold text-yellow-400">2.</span>
              <span>
                <strong>Cross-connect at the consumer unit.</strong> Connect the line conductor of
                one end of the ring to the CPC of the other end. This creates a figure-of-eight
                configuration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-bold text-yellow-400">3.</span>
              <span>
                <strong>Measure at each outlet.</strong> At every socket outlet on the ring,
                measure the resistance between the line terminal and the earth terminal. The
                reading should be approximately (r1+r2)/4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-bold text-yellow-400">4.</span>
              <span>
                <strong>Interpret the results.</strong> All readings should be within 0.05Ω of
                (r1+r2)/4. A high reading indicates a break or poor connection. A significantly
                lower reading may indicate an unintended parallel path.
              </span>
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">Common Failure: The Figure-of-Eight Spur</p>
              <p className="text-white text-sm">
                A socket outlet connected to one leg of the ring at both terminals (looped rather
                than properly ringed through) gives a correct reading during ring continuity
                testing but creates a spur with no overcurrent protection at the junction. Always
                visually inspect socket outlet wiring in older installations.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'load-calculations',
    heading: 'Load Calculations for Ring and Radial Circuits',
    content: (
      <>
        <p>
          The maximum connected load for a ring final circuit is 7,200VA (32A × 230V). In
          practice, diversity means the simultaneous demand is much lower. BS 7671 Appendix 1
          and the On-Site Guide provide demand estimation guidance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic socket outlets:</strong> For the first outlet, allow the full
                rated current. For each additional outlet, allow 40% of the rated current. This
                reflects domestic diversity — not all outlets are used at full load simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen circuits:</strong> Fixed appliances (dishwasher, washing machine,
                fridge-freezer) should be on dedicated radial circuits rather than forming part of
                a ring serving general socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargers and heat pumps:</strong> High-power loads must always be on
                dedicated circuits — never connected to a ring final circuit serving general
                socket outlets.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          to verify that voltage drop is within the 5% limit for power circuits under BS 7671
          Appendix 12.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-use-each',
    heading: 'When to Use a Ring vs a Radial Circuit',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Choose a Ring Final Circuit When:</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Extending an existing ring in an older property</li>
              <li>• Serving a large open-plan floor area efficiently</li>
              <li>• Replacing an existing ring that is correctly wired</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Choose a Radial Circuit When:</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• All new installations and extensions</li>
              <li>• Adding circuits to a new consumer unit</li>
              <li>• Serving a single room or defined area</li>
              <li>• Where simplicity and ease of testing are valued</li>
            </ul>
          </div>
        </div>
        <p>
          The industry trend is moving towards radial circuits for new domestic work. Reduced
          complexity, lower risk of wiring errors, and easier periodic inspection make radials
          the preferred choice for most modern installations.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Testing and Certifying Ring Circuits',
    content: (
      <>
        <p>
          Ring continuity testing is one of the most frequently examined topics in C&G 2391.
          Getting the methodology right — and recording results correctly on the schedule of test
          results — is essential for compliant certification.
        </p>
        <SEOAppBridge
          title="Record ring continuity test results on your phone"
          description="Elec-Mate's EIC and EICR certificate apps include a full schedule of test results with fields for r1, r2, r1+r2, and (r1+r2)/4 for each ring circuit. Complete on site and generate a professional PDF instantly."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RingVsRadialCircuitsPage() {
  return (
    <GuideTemplate
      title="Ring Final Circuit vs Radial Circuit | BS 7671 Guide UK"
      description="Complete guide to ring final circuits vs radial circuits for UK electricians. BS 7671 Section 433 requirements, ring continuity testing with the r1+r2/4 method, load calculations, and when to use each circuit type."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Circuit Design Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Ring Final Circuit vs Radial Circuit:{' '}
          <span className="text-yellow-400">BS 7671 Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="The ring final circuit is unique to the UK. This guide explains how rings and radial circuits work, the BS 7671 Section 433 requirements, how to carry out ring continuity testing using the r1+r2/4 method, and when to choose each circuit type."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Ring vs Radial Circuits"
      relatedPages={relatedPages}
      ctaHeading="Test and Certify Ring Circuits on Your Phone"
      ctaSubheading="Elec-Mate's EIC and EICR apps include ring continuity test result schedules, automatic (r1+r2)/4 calculation, and professional PDF certificates. 7-day free trial, cancel anytime."
    />
  );
}
