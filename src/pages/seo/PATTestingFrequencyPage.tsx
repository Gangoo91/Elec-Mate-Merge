import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Clock,
  FileCheck2,
  ClipboardCheck,
  Wrench,
  Building2,
  FileText,
  CalendarClock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'PAT Testing Frequency | How Often by Premises Type';
const PAGE_DESCRIPTION =
  'Complete guide to PAT testing frequency in the UK. IET Code of Practice 5th Edition recommended intervals by premises type — offices, construction sites, schools, hotels, factories, churches. Risk-based approach, Class I vs Class II, and how to manage testing schedules.';

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'PAT Frequency', href: '/guides/pat-testing-frequency' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'intervals-by-premises', label: 'Intervals by Premises Type' },
  { id: 'risk-based-approach', label: 'Risk-Based Approach' },
  { id: 'class-i-vs-class-ii', label: 'Class I vs Class II' },
  { id: 'new-equipment', label: 'New Equipment' },
  { id: 'repaired-equipment', label: 'Repaired Equipment' },
  { id: 'visual-vs-formal', label: 'Visual vs Formal Inspection' },
  { id: 'managing-schedules', label: 'Managing Testing Schedules' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'PAT testing frequency is not fixed by law — the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment provides recommended intervals based on premises type and equipment use.',
  'Construction site tools require the most frequent testing (3 months formal inspection), while church and office equipment can go up to 48 months between formal tests.',
  'The IET Code of Practice promotes a risk-based approach — higher risk environments and more intensively used equipment should be tested more frequently.',
  'Class I equipment (earthed metal enclosure) generally requires more frequent testing than Class II equipment (double insulated) because it relies on the earth connection for fault protection.',
  'Elec-Mate includes PAT Testing certificate forms with digital records, customer management to track testing schedules by premises, reminders for re-tests, and quoting and invoicing tools for PAT testing contracts.',
];

const faqs = [
  {
    question: 'Is PAT testing a legal requirement in the UK?',
    answer:
      'PAT testing is not specifically required by any single UK regulation. However, the Electricity at Work Regulations 1989 (Regulation 4) require that all electrical systems (including portable equipment) are maintained so as to prevent danger. The Health and Safety at Work etc. Act 1974 imposes a general duty on employers to ensure the safety of employees and others. PAT testing is the established method of demonstrating compliance with these duties for portable and movable electrical equipment. While the law does not mandate PAT testing by name or specify testing intervals, failing to maintain electrical equipment in a safe condition is a criminal offence. In practice, regular PAT testing in accordance with the IET Code of Practice is the recognised way to meet the legal duty of maintenance. If an electrical accident occurs and the equipment has not been tested, the duty holder will have difficulty demonstrating that they met their legal obligations.',
  },
  {
    question: 'How often should office equipment be PAT tested?',
    answer:
      'According to the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition), office and commercial equipment should be formally inspected and tested every 48 months (4 years) with user checks and visual inspections at more frequent intervals. Desktop computers, monitors, printers, desk lamps, and other IT equipment in a typical office environment are generally low-risk items that are not moved frequently and are not subject to harsh conditions. However, equipment that is moved regularly (such as portable heaters, extension leads, and equipment used by cleaners) should be tested more frequently — typically every 24 months for formal testing with annual visual inspections. The key principle is risk assessment: if equipment is used more intensively, moved more frequently, or used in a more demanding environment, the testing interval should be shorter.',
  },
  {
    question: 'What is the difference between a visual inspection and a formal inspection?',
    answer:
      'A visual inspection involves checking the equipment and its cable for visible signs of damage, wear, or defects without using test instruments. This includes checking for frayed or damaged cables, cracked plugs, missing earth pins, burn marks, signs of overheating, loose connections visible at the plug, and damage to the equipment enclosure. A user check is an even simpler visual check carried out by the person using the equipment each time they use it. A formal inspection (also called a combined inspection and test) includes the visual inspection plus electrical tests using a PAT tester — typically earth continuity (for Class I equipment), insulation resistance, and sometimes leakage current and polarity tests. The formal inspection is more thorough and detects faults that are not visible, such as deteriorated insulation or a high-resistance earth connection. Both visual and formal inspections are important parts of the maintenance regime — they are complementary, not alternatives.',
  },
  {
    question: 'How often should construction site tools be PAT tested?',
    answer:
      'Construction site tools require the most frequent PAT testing of any equipment category. The IET Code of Practice recommends formal inspection and testing every 3 months for 110V equipment used on construction sites, with monthly user checks and visual inspections. 230V equipment on construction sites should also be tested every 3 months. This high testing frequency reflects the harsh environment — construction site tools are subject to impact damage, moisture, dust, vibration, and rough handling. Cable damage and earth continuity failure are common, and the consequences of a fault on a construction site can be severe. Extension leads and transformer units used on construction sites should be tested at the same 3-month interval. Some large construction companies and principal contractors require even more frequent testing — monthly formal testing is not uncommon on major projects.',
  },
  {
    question: 'Do new appliances need PAT testing before first use?',
    answer:
      'New equipment supplied by a reputable manufacturer should be safe for use without formal PAT testing. However, the IET Code of Practice recommends that new equipment should receive a visual inspection (not a formal test) before being put into service. This visual check is to confirm that the equipment has not been damaged in transit, that the plug is correctly wired (if a moulded plug, check for visible damage), and that the cable is intact. Once the visual inspection is satisfactory, the equipment can be put into service and should then be included in the normal PAT testing schedule at the intervals appropriate for the premises type and equipment category. Some organisations choose to formally test all new equipment before first use as a baseline — this is not a requirement of the Code of Practice but is considered good practice by some, particularly for Class I equipment on construction sites.',
  },
  {
    question: 'What records should be kept for PAT testing?',
    answer:
      'The IET Code of Practice recommends maintaining a register of all portable electrical equipment, recording for each item: a unique identifier (asset number, barcode, or QR code), the equipment description and make/model, the location or department, the date of each inspection and test, the name or identifier of the person carrying out the test, the results of each test, the pass/fail outcome, and the date of the next test. This register should be retained for as long as the equipment remains in service, plus a reasonable period after disposal (at least 3 years). The register provides evidence that the duty holder is meeting their maintenance obligations under the Electricity at Work Regulations 1989. In the event of an accident or enforcement action, the PAT testing register will be one of the first documents requested by the HSE or the insurer.',
  },
  {
    question: 'Can I do PAT testing myself or do I need qualifications?',
    answer:
      'There is no specific qualification legally required to carry out PAT testing in the UK. The Electricity at Work Regulations 1989 require that the person carrying out the testing is "competent" — meaning they have sufficient knowledge, skill, and experience to avoid danger to themselves and others. In practice, competence for PAT testing typically involves completing a PAT testing training course (such as the City & Guilds 2377 course or equivalent), understanding the principles of electrical safety and the tests being carried out, being able to use a PAT tester correctly and interpret the results, and having sufficient knowledge to determine whether equipment is safe for continued use. Many electricians carry out PAT testing as an additional service. For non-electricians (such as maintenance staff or facilities managers), a specific PAT testing training course is strongly recommended. The person carrying out the testing should understand what they are testing and why, not just how to operate the test instrument.',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'PAT Testing Frequency: What the IET Code of Practice Says',
    content: (
      <>
        <p>
          PAT testing (Portable Appliance Testing) is the in-service inspection and testing of
          electrical equipment to confirm it is safe for continued use. The testing frequency is not
          fixed by law — instead, the IET Code of Practice for In-Service Inspection and Testing of
          Electrical Equipment (5th Edition) provides recommended intervals based on the type of
          premises and the type of equipment. PAT testing is one of the{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            8 certificate types
          </SEOInternalLink>{' '}
          that UK electricians commonly produce.
        </p>
        <p>
          The Code of Practice is published by the Institution of Engineering and Technology (IET)
          and is the recognised industry standard for PAT testing in the UK. It is referenced by the
          Health and Safety Executive (HSE) as the standard that, if followed, demonstrates
          compliance with the maintenance requirements of the Electricity at Work Regulations 1989.
        </p>
        <p>
          Understanding the recommended intervals is essential for electricians who offer PAT
          testing services — it allows you to advise clients correctly, set up appropriate testing
          schedules, and{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            price PAT testing contracts
          </SEOInternalLink>{' '}
          accurately. It is also important for building managers, facilities teams, and business
          owners who need to ensure their portable equipment maintenance programme meets legal
          requirements.
        </p>
      </>
    ),
  },
  {
    id: 'intervals-by-premises',
    heading: 'Recommended Intervals by Premises Type',
    content: (
      <>
        <p>
          The following table summarises the IET Code of Practice recommended intervals for user
          checks, visual inspections, and formal combined inspection and testing. These intervals
          are starting points — the risk-based approach may require shorter intervals in some
          situations.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Construction Sites (110V and 230V)
            </h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Weekly
              </li>
              <li>
                <strong>Visual inspection:</strong> Monthly
              </li>
              <li>
                <strong>Formal test (combined inspection and test):</strong> Every 3 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Factories and Workshops</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Daily/weekly depending on use
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 6 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 12 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Schools and Educational Establishments
            </h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Termly
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 12 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 12 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hotels and Hospitality</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Weekly
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 12 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 12 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Shops and Retail</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Weekly
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 12 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 24 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Offices and Commercial</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Weekly
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 24 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 48 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Churches and Community Halls</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Before each use
              </li>
              <li>
                <strong>Visual inspection:</strong> Every 24 months
              </li>
              <li>
                <strong>Formal test:</strong> Every 48 months
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Outdoor Use and Events</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>User check:</strong> Before each use
              </li>
              <li>
                <strong>Visual inspection:</strong> Monthly
              </li>
              <li>
                <strong>Formal test:</strong> Every 3 months
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'risk-based-approach',
    heading: 'The Risk-Based Approach',
    content: (
      <>
        <p>
          The IET Code of Practice emphasises that the recommended intervals are starting points,
          not absolute rules. The duty holder should adopt a risk-based approach that considers the
          specific circumstances of their equipment and environment.
        </p>
        <p>
          Factors that may justify more frequent testing include: equipment used in harsh or wet
          environments, equipment that is frequently moved or transported, equipment used by
          multiple people (such as shared tools or hire equipment), equipment with a history of
          damage or faults, equipment that is critical to safety (such as medical devices or fire
          safety systems), and cable-connected equipment that is subject to mechanical stress.
        </p>
        <p>
          Conversely, factors that may justify less frequent testing include: equipment that is
          permanently installed and never moved, equipment in a clean, dry, low-risk environment,
          equipment that has consistently passed previous tests with no issues, and double-insulated
          (Class II) equipment that does not rely on an earth connection.
        </p>
        <p>
          The risk-based approach means that a blanket "annual PAT testing" policy may not be
          appropriate for all equipment in all environments. Some equipment may need testing every 3
          months; other equipment may safely go 48 months between tests. The key is to assess the
          risk for each category of equipment in each environment and set the testing interval
          accordingly. For fixed electrical installations, a separate{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR (periodic inspection)
          </SEOInternalLink>{' '}
          is required — PAT testing covers only portable and movable equipment.
        </p>
      </>
    ),
  },
  {
    id: 'class-i-vs-class-ii',
    heading: 'Class I vs Class II Equipment',
    content: (
      <>
        <p>
          The testing requirements differ between Class I and Class II equipment because of the
          fundamentally different ways they provide protection against electric shock.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Class I (Earthed)</h3>
            <p className="text-white text-sm leading-relaxed">
              Class I equipment has a metal enclosure (or accessible metal parts) connected to earth
              via the earth conductor in the supply cable. If a fault occurs and a live conductor
              touches the metal enclosure, the earth connection provides a path for fault current to
              flow, causing the protective device (fuse or MCB) to disconnect the supply. PAT
              testing for Class I equipment includes an earth continuity test to verify that the
              earth connection is intact and has a sufficiently low resistance, plus an insulation
              resistance test to check the insulation between live conductors and earth.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Class II (Double Insulated)</h3>
            <p className="text-white text-sm leading-relaxed">
              Class II equipment has reinforced or double insulation and does not rely on an earth
              connection for fault protection. The equipment is marked with the double square
              symbol. PAT testing for Class II equipment does not include an earth continuity test
              (because there is no earth conductor), but does include an insulation resistance test
              to verify the integrity of the insulation. Class II equipment is generally considered
              lower risk than Class I equipment because it does not depend on the earth connection
              remaining intact throughout its life.
            </p>
          </div>
        </div>
        <p>
          In practice, Class I equipment should generally be tested more frequently than Class II
          equipment of the same type used in the same environment. This is because the earth
          connection can deteriorate over time (particularly if the cable or plug is damaged), and
          the loss of the earth connection removes the primary fault protection mechanism.
        </p>
      </>
    ),
  },
  {
    id: 'new-equipment',
    heading: 'New Equipment',
    content: (
      <>
        <p>
          New equipment from a reputable manufacturer is expected to be safe for use without formal
          PAT testing. The manufacturer is responsible for ensuring that the equipment meets the
          relevant product safety standards before it is placed on the market. However, the IET Code
          of Practice recommends that new equipment receives a visual inspection before being put
          into service.
        </p>
        <p>
          This visual inspection checks for damage that may have occurred during transport or
          storage — a cracked plug, a damaged cable, a loose fitting, or visible signs of
          manufacturing defects. If the visual inspection reveals no issues, the equipment can be
          put into service and included in the normal PAT testing schedule at the intervals
          appropriate for the premises type.
        </p>
        <p>
          Some organisations choose to formally test all new equipment before first use to establish
          baseline readings. This is particularly useful for Class I equipment, where recording the
          initial earth continuity and insulation resistance values provides a benchmark for future
          tests. If a subsequent test shows a significant change from the baseline, it may indicate
          deterioration even if the values are still within the pass limits.
        </p>
      </>
    ),
  },
  {
    id: 'repaired-equipment',
    heading: 'Repaired Equipment',
    content: (
      <>
        <p>
          Equipment that has been repaired must be formally inspected and tested before being
          returned to service. This applies regardless of the nature of the repair — whether it is a
          plug change, a cable replacement, a component replacement, or a more significant repair.
        </p>
        <p>
          The post-repair test confirms that the repair has been carried out correctly and that the
          equipment is safe for use. For Class I equipment, this includes earth continuity and
          insulation resistance tests. For Class II equipment, it includes an insulation resistance
          test. If the equipment fails the post-repair test, it must not be returned to service
          until the issue is resolved.
        </p>
        <p>
          The person carrying out the repair must be competent to do so, and the repair and
          subsequent test results should be recorded in the PAT testing register — see{' '}
          <SEOInternalLink href="/guides/electrical-certificate-retention">
            certificate retention periods
          </SEOInternalLink>{' '}
          for how long to keep PAT records. The next test date should be set according to the normal
          testing schedule for the premises and equipment type.
        </p>
      </>
    ),
  },
  {
    id: 'visual-vs-formal',
    heading: 'Visual Inspection vs Formal Combined Inspection and Test',
    content: (
      <>
        <p>The IET Code of Practice distinguishes between three levels of inspection:</p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">User Check</h3>
            <p className="text-white text-sm leading-relaxed">
              A simple visual check carried out by the person using the equipment. No training is
              required beyond basic awareness. The user looks for obvious damage — frayed cables,
              cracked plugs, damage to the enclosure, burn marks, signs of overheating, or anything
              that does not look right. If the user identifies a problem, they should stop using the
              equipment and report it. User checks should be carried out before each use of the
              equipment.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Formal Visual Inspection</h3>
            <p className="text-white text-sm leading-relaxed">
              A more thorough visual inspection carried out by a person with knowledge of what to
              look for. This includes checking the plug (correct fuse rating, no damage, cord grip
              secure), the cable (no cuts, kinks, or joins), the connection to the equipment (strain
              relief intact, no damage), and the equipment enclosure (no cracks, damage, or missing
              covers). No test instruments are used. Many faults can be detected by visual
              inspection alone — research by the HSE found that approximately 95% of faults can be
              found by visual inspection without electrical testing.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Formal Combined Inspection and Test
            </h3>
            <p className="text-white text-sm leading-relaxed">
              A full inspection including visual checks and electrical tests using a PAT tester.
              Tests include earth continuity (for Class I equipment), insulation resistance, and may
              include leakage current tests. This is the most thorough level of inspection and is
              carried out at the intervals specified by the IET Code of Practice for each premises
              type. The results are recorded in the PAT testing register and a pass/fail label is
              applied to the equipment.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Digital PAT testing with Elec-Mate"
          description="Elec-Mate includes a complete PAT Testing certificate form with pass/fail recording, equipment registers, and customer management to track testing schedules by premises. Set reminders for re-tests. Quote and invoice PAT testing contracts directly from the app."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'managing-schedules',
    heading: 'Managing PAT Testing Schedules',
    content: (
      <>
        <p>
          For electricians who offer PAT testing as a service, managing testing schedules across
          multiple clients and premises is one of the biggest operational challenges. Each client
          has different equipment, different premises types, different risk profiles, and therefore
          different testing intervals.
        </p>
        <p>
          The most effective approach is to use a{' '}
          <SEOInternalLink href="/guides/digital-vs-paper-certificates">
            digital certificate system
          </SEOInternalLink>{' '}
          that tracks equipment by client and premises, records test results and next test dates,
          and generates reminders when re-tests are due. This allows you to proactively contact
          clients when their PAT testing is due, rather than waiting for them to remember — which
          they often do not.
        </p>
        <p>
          A well-managed PAT testing schedule also forms the basis for recurring revenue. A school
          with 200 items needs annual testing. A hotel with 500 items needs annual testing. A
          construction company with 100 tools needs quarterly testing. These are predictable,
          repeating contracts that provide steady income throughout the year.
        </p>
        <SEOAppBridge
          title="Manage PAT testing schedules and contracts"
          description="Elec-Mate's customer management tracks testing schedules by premises and equipment type. Set re-test reminders so you never miss a renewal. Use the quoting tool to price PAT testing contracts and the invoicing tool to bill from site. Recurring revenue made simple."
          icon={CalendarClock}
        />
        <p>
          When quoting for PAT testing contracts, consider the following factors: the number of
          items to be tested, the premises type (which determines the testing interval), whether the
          items are Class I or Class II, the geographical location and travel time, whether remedial
          work (such as plug changes or cable repairs) is included in the quote or billed
          separately, and whether the client requires labelling, a register, and a certificate.
          Electricians registered with{' '}
          <SEOInternalLink href="/guides/niceic-certificate-requirements">NICEIC</SEOInternalLink>{' '}
          or <SEOInternalLink href="/guides/napit-certificate-guide">NAPIT</SEOInternalLink> can use
          PAT testing as an additional revenue stream alongside their core installation and
          inspection work.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'All 8 UK electrical certificate types including PAT Testing — when each is required.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-retention',
    title: 'Certificate Retention Periods',
    description: 'How long to keep PAT testing records and other electrical certificates.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide UK',
    description: 'Complete guide to PAT testing procedures, equipment, and requirements.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration',
    description: 'NICEIC registration for electricians offering PAT testing as a service.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'Pricing Electrical Jobs',
    description: 'How to price PAT testing contracts, EICRs, and other electrical work.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/pat-testing',
    title: 'PAT Testing App',
    description:
      'Digital PAT testing with equipment registers, scheduling, and certificate export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PATTestingFrequencyPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CalendarClock}
      heroTitle={
        <>
          PAT Testing Frequency: <span className="text-yellow-400">How Often by Premises Type</span>
        </>
      }
      heroSubtitle="The complete guide to PAT testing frequency in the UK. IET Code of Practice 5th Edition recommended intervals for offices, construction sites, schools, hotels, shops, factories, churches, and outdoor use. Risk-based approach, Class I vs Class II, new and repaired equipment, and how to manage testing schedules for multiple clients."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Digital PAT Testing from Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for PAT testing certificates, equipment registers, client scheduling, and re-test reminders. Quote and invoice from site. 7-day free trial."
    />
  );
}
