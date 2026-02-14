import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { PlugZap, ClipboardCheck, FileText, Users, Receipt, Zap } from 'lucide-react';

export default function PATTestingGuideUKPage() {
  return (
    <GuideTemplate
      title="PAT Testing Guide UK 2026 | Requirements & Law"
      description="Complete guide to PAT testing in the UK. Covers legal requirements, Electricity at Work Regulations 1989, IET Code of Practice 5th Edition, who needs PAT testing, testing frequency, Class I vs Class II, pass/fail criteria, and record keeping."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'PAT Testing Guide UK', href: '/guides/pat-testing-guide-uk' },
      ]}
      tocItems={[
        { id: 'what-is-pat-testing', label: 'What Is PAT Testing?' },
        { id: 'legal-requirements', label: 'Legal Requirements' },
        { id: 'iet-code-of-practice', label: 'IET Code of Practice' },
        { id: 'who-needs-pat-testing', label: 'Who Needs PAT Testing?' },
        { id: 'testing-frequency', label: 'Testing Frequency by Environment' },
        { id: 'class-i-vs-class-ii', label: 'Class I vs Class II Appliances' },
        { id: 'visual-vs-formal-testing', label: 'Visual Inspection vs Formal Testing' },
        { id: 'pass-fail-criteria', label: 'Pass/Fail Criteria' },
        { id: 'record-keeping', label: 'Record Keeping' },
        { id: 'pat-testing-as-a-business', label: 'PAT Testing as a Business' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Testing Guide"
      badgeIcon={PlugZap}
      heroTitle={
        <>
          <span className="text-yellow-400">PAT Testing</span> Guide UK — Requirements, Law, and
          Best Practice 2026
        </>
      }
      heroSubtitle="Portable Appliance Testing (PAT) is one of the most misunderstood areas of electrical safety in the UK. There is no specific law that requires PAT testing, yet employers, landlords, and venue operators have a legal duty to ensure electrical equipment is safe. This guide explains the actual legal position, the IET Code of Practice, who needs PAT testing, how often to test, and how to build a profitable PAT testing business."
      readingTime={20}
      keyTakeaways={[
        'There is no specific UK law that requires PAT testing — but the Electricity at Work Regulations 1989 require employers to ensure electrical equipment is maintained in a safe condition, and PAT testing is the recognised way to demonstrate compliance.',
        'The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition) is the definitive industry reference — it replaced the old HSE guidance and is the standard all PAT testers should follow.',
        'Testing frequency depends on the environment and equipment type — a construction site drill needs testing every 3 months, while an office desk lamp may only need a visual check annually.',
        'Class I appliances (earthed, metal casing) require earth continuity testing. Class II appliances (double insulated, plastic casing) do not have an earth connection and require insulation resistance testing only.',
        'Keeping proper records is essential — digital records are more efficient than paper labels and provide a complete audit trail that satisfies insurance companies and enforcement officers.',
      ]}
      sections={[
        {
          id: 'what-is-pat-testing',
          heading: 'What Is PAT Testing?',
          content: (
            <>
              <p>
                PAT stands for Portable Appliance Testing. It is the process of checking electrical
                appliances and equipment to ensure they are safe to use. Despite the name, PAT
                testing covers more than just "portable" equipment — it includes any electrical
                equipment that has a plug and is connected to a mains supply, from kettles and
                laptops to photocopiers and vending machines.
              </p>
              <p>
                The testing process involves two stages: a visual inspection (checking for damage to
                the cable, plug, and appliance casing) and, where appropriate, electrical testing
                using a PAT tester. The electrical tests typically include earth continuity (for
                Class I appliances), insulation resistance, and sometimes a functional check and
                earth leakage test.
              </p>
              <p>
                PAT testing is carried out on in-service equipment — that is, equipment already in
                use, not brand-new items straight from the manufacturer. New equipment is assumed to
                meet safety standards when it leaves the factory (provided it carries a CE or UKCA
                mark), so it does not need PAT testing before first use, although it should be
                visually inspected before being put into service.
              </p>
            </>
          ),
        },
        {
          id: 'legal-requirements',
          heading: 'Legal Requirements',
          content: (
            <>
              <p>
                This is the part that causes the most confusion. There is no specific piece of UK
                legislation that says "you must PAT test your appliances." The phrase "PAT testing"
                does not appear in any Act of Parliament or statutory regulation. However, several
                pieces of legislation create a legal duty to ensure electrical equipment is safe:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    Electricity at Work Regulations 1989 (EAWR)
                  </span>{' '}
                  — Regulation 4(2) states: "As may be necessary to prevent danger, all systems
                  shall be maintained so as to prevent, so far as is reasonably practicable, such
                  danger." This applies to all workplaces and is enforced by the Health and Safety
                  Executive (HSE). The HSE considers PAT testing to be one way of demonstrating
                  compliance with Regulation 4(2).
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Health and Safety at Work etc. Act 1974
                  </span>{' '}
                  — Section 2 places a general duty on employers to ensure, so far as is reasonably
                  practicable, the health and safety of their employees. Section 3 extends this duty
                  to non-employees (visitors, customers, contractors). Faulty electrical equipment
                  that injures someone would be a breach of these duties.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Provision and Use of Work Equipment Regulations 1998 (PUWER)
                  </span>{' '}
                  — Regulation 5 requires that work equipment is maintained in an efficient state,
                  in efficient working order, and in good repair. Regulation 6 requires that
                  equipment is inspected where there is a significant risk from deterioration.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Management of Health and Safety at Work Regulations 1999
                  </span>{' '}
                  — Regulation 3 requires employers to carry out a suitable and sufficient
                  assessment of risks, including risks from electrical equipment.
                </li>
              </ul>
              <p className="mt-4">
                The practical effect of all this legislation is clear: while PAT testing is not
                explicitly mandated, it is the recognised industry method for demonstrating that you
                have maintained electrical equipment in a safe condition. If an appliance causes an
                injury and you cannot show evidence of regular inspection and testing, you will
                struggle to defend a prosecution or civil claim.
              </p>
            </>
          ),
        },
        {
          id: 'iet-code-of-practice',
          heading: 'IET Code of Practice',
          content: (
            <>
              <p>
                The definitive reference for PAT testing in the UK is the IET Code of Practice for
                In-Service Inspection and Testing of Electrical Equipment. The current edition is
                the 5th Edition, published in 2020. This replaced the earlier 4th Edition and
                incorporated significant changes to testing frequency guidance and risk assessment
                methodology.
              </p>
              <p>
                The IET Code of Practice is not a legal document — it is a guidance document
                published by the Institution of Engineering and Technology. However, it is
                recognised by the HSE, insurance companies, and the courts as the industry standard.
                Following the IET Code of Practice is the best way to demonstrate that your PAT
                testing regime is reasonable and proportionate.
              </p>
              <p>Key principles from the 5th Edition:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Risk-based approach</span> — testing
                  frequency should be determined by a risk assessment, not by a blanket annual
                  schedule. Low-risk equipment in a low-risk environment (e.g., a desk lamp in an
                  office) needs less frequent testing than high-risk equipment in a harsh
                  environment (e.g., a power tool on a construction site).
                </li>
                <li>
                  <span className="font-semibold text-white">
                    User checks are the first line of defence
                  </span>{' '}
                  — the Code emphasises that regular user checks (visual inspection by the person
                  using the equipment before each use) are more effective at preventing accidents
                  than periodic formal testing alone.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Visual inspection catches most faults
                  </span>{' '}
                  — studies show that approximately 95% of faults on portable appliances can be
                  detected by a thorough visual inspection without any electrical testing. Formal
                  electrical testing is still necessary for certain equipment types and
                  environments, but it complements visual inspection rather than replacing it.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'who-needs-pat-testing',
          heading: 'Who Needs PAT Testing?',
          content: (
            <>
              <p>
                PAT testing is relevant to anyone who has a duty to maintain electrical equipment in
                a safe condition. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">All employers</span> — regardless of
                  business size. A sole trader with one employee has the same legal duty as a
                  multinational corporation. The scope and frequency of testing will differ, but the
                  obligation exists.
                </li>
                <li>
                  <span className="font-semibold text-white">Landlords (especially HMOs)</span> —
                  landlords of Houses in Multiple Occupation (HMOs) are legally required to ensure
                  that electrical appliances they supply (cookers, fridges, washing machines) are
                  safe. While PAT testing is not specifically mandated for landlords, it is the
                  accepted way to demonstrate compliance. Many local authorities require PAT test
                  records as part of HMO licensing conditions.
                </li>
                <li>
                  <span className="font-semibold text-white">Public venues</span> — hotels, pubs,
                  restaurants, theatres, sports centres, and other venues open to the public have a
                  duty of care to visitors. Insurance companies increasingly require evidence of PAT
                  testing as a condition of public liability cover.
                </li>
                <li>
                  <span className="font-semibold text-white">Schools and nurseries</span> — local
                  authority and academy schools are required to have PAT testing programmes as part
                  of their health and safety management systems.
                </li>
                <li>
                  <span className="font-semibold text-white">Construction sites</span> — the CDM
                  Regulations 2015 and the EAWR require that portable tools and equipment on
                  construction sites are maintained and tested. 110V equipment should be tested
                  every 3 months, with visual inspection before each use.
                </li>
                <li>
                  <span className="font-semibold text-white">Churches and community halls</span> —
                  any organisation that invites the public onto its premises has a duty of care, and
                  insurance companies routinely require PAT testing records.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'testing-frequency',
          heading: 'Testing Frequency by Environment',
          content: (
            <>
              <p>
                The IET Code of Practice 5th Edition provides suggested initial frequencies for
                formal inspection and testing. These are starting points — the actual frequency
                should be adjusted based on the results of previous inspections, the type and
                condition of equipment, and the environment in which it is used.
              </p>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 pr-4 text-white font-bold">Environment</th>
                      <th className="py-3 pr-4 text-white font-bold">User Check</th>
                      <th className="py-3 pr-4 text-white font-bold">Visual Inspection</th>
                      <th className="py-3 text-white font-bold">Combined Inspection & Test</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Construction sites (110V)</td>
                      <td className="py-3 pr-4">Daily/weekly</td>
                      <td className="py-3 pr-4">Monthly</td>
                      <td className="py-3">3 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Industrial</td>
                      <td className="py-3 pr-4">Daily/weekly</td>
                      <td className="py-3 pr-4">Monthly</td>
                      <td className="py-3">6-12 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Commercial (offices)</td>
                      <td className="py-3 pr-4">No</td>
                      <td className="py-3 pr-4">Up to 2 years</td>
                      <td className="py-3">Up to 5 years (IT equipment up to 4 years)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Hotels / public venues</td>
                      <td className="py-3 pr-4">Weekly</td>
                      <td className="py-3 pr-4">1-2 years</td>
                      <td className="py-3">2-3 years</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Schools</td>
                      <td className="py-3 pr-4">Weekly</td>
                      <td className="py-3 pr-4">1-2 years</td>
                      <td className="py-3">2-4 years</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Rented property (landlord appliances)</td>
                      <td className="py-3 pr-4">No</td>
                      <td className="py-3 pr-4">At change of tenancy</td>
                      <td className="py-3">1-2 years (HMOs often annually)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                These frequencies are guidance, not law. The key principle is that testing must be
                frequent enough to ensure equipment remains safe between tests. Equipment that is
                subjected to heavy use, harsh conditions, or frequent damage will need more frequent
                testing. Equipment that is stationary, lightly used, and in a clean environment will
                need less frequent testing.
              </p>
            </>
          ),
        },
        {
          id: 'class-i-vs-class-ii',
          heading: 'Class I vs Class II Appliances',
          content: (
            <>
              <p>
                Understanding the difference between Class I and Class II appliances is fundamental
                to PAT testing because the tests you carry out differ between the two classes.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Class I Appliances</h3>
              <p>
                Class I appliances rely on a combination of basic insulation and an earth connection
                for safety. They have a metal casing (or accessible metal parts) that is connected
                to earth via the earth conductor in the mains cable. If the basic insulation fails
                and a live conductor touches the metal casing, the fault current flows to earth
                through the earth conductor, tripping the protective device (fuse or MCB) and
                disconnecting the supply before a user can receive a dangerous electric shock.
              </p>
              <p>
                Examples: kettles with metal bodies, toasters, washing machines, dishwashers,
                electric ovens, desktop computers (metal chassis), angle grinders, and most power
                tools with metal casings.
              </p>
              <p>
                PAT tests for Class I: earth continuity test (must be less than 0.1 ohm + cable
                resistance), insulation resistance test (must be at least 1 megohm at 500V DC), and
                functional check.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Class II Appliances</h3>
              <p>
                Class II appliances (also called double-insulated) rely on two layers of insulation
                for safety — basic insulation plus supplementary insulation. They do not have an
                earth connection and are identified by the double-square symbol on the rating plate.
                If the basic insulation fails, the supplementary insulation prevents the user from
                receiving a shock.
              </p>
              <p>
                Examples: phone chargers, laptop power supplies, most plastic-cased power tools,
                hair dryers, televisions, desk lamps, and electric toothbrush chargers.
              </p>
              <p>
                PAT tests for Class II: insulation resistance test (must be at least 2 megohms at
                500V DC) and functional check. No earth continuity test is required because there is
                no earth connection.
              </p>
            </>
          ),
        },
        {
          id: 'visual-vs-formal-testing',
          heading: 'Visual Inspection vs Formal Testing',
          content: (
            <>
              <p>The IET Code of Practice distinguishes between three levels of inspection:</p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">User Checks</h3>
              <p>
                A simple visual check carried out by the person using the equipment before each use.
                No training is required — just common sense. Check the cable for cuts, fraying, or
                kinks. Check the plug for cracks or damage. Check the appliance casing for damage.
                Check that the equipment works normally. If any damage is found, stop using the
                equipment and report it.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Formal Visual Inspection</h3>
              <p>
                A more thorough visual inspection carried out by a competent person. This involves
                opening the plug to check the internal connections (correct wiring, correct fuse
                rating, cable grip secure, no damaged insulation inside the plug), checking the
                cable entry point to the appliance for strain or damage, checking for signs of
                overheating (discolouration, melted plastic), and checking that the rating plate is
                legible and appropriate for the supply. No electrical test equipment is required.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">
                Combined Inspection and Test
              </h3>
              <p>
                A full formal visual inspection plus electrical testing using a PAT tester. This is
                the most thorough level of inspection and is what most people mean when they say
                "PAT testing." It includes all the visual checks above plus earth continuity testing
                (for Class I), insulation resistance testing, and where appropriate, earth leakage
                testing and functional checks. This level of inspection must be carried out by a
                competent person who has been trained in the use of the test equipment and
                understands the significance of the results.
              </p>
            </>
          ),
        },
        {
          id: 'pass-fail-criteria',
          heading: 'Pass/Fail Criteria',
          content: (
            <>
              <p>
                The IET Code of Practice sets out clear pass/fail criteria for each electrical test:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Earth continuity (Class I)</span> — the
                  resistance of the earth conductor from the earth pin of the plug to the accessible
                  metal parts of the appliance should be less than approximately 0.1 ohm plus the
                  resistance of the supply cable. For most appliances with cables up to 5 metres, a
                  reading below 0.5 ohm is acceptable. Readings above 1 ohm indicate a problem with
                  the earth connection.
                </li>
                <li>
                  <span className="font-semibold text-white">Insulation resistance (Class I)</span>{' '}
                  — must be at least 1 megohm (1 million ohms) at 500V DC between the live and
                  neutral conductors connected together and the earth conductor. Readings below 1
                  megohm indicate deterioration of the insulation.
                </li>
                <li>
                  <span className="font-semibold text-white">Insulation resistance (Class II)</span>{' '}
                  — must be at least 2 megohms at 500V DC between the live and neutral conductors
                  connected together and a metal foil wrapped around the appliance casing (to
                  simulate contact with accessible surfaces).
                </li>
                <li>
                  <span className="font-semibold text-white">Earth leakage</span> — protective
                  conductor current should not exceed 3.5mA for Class I portable appliances or
                  0.75mA for Class II appliances. Higher earth leakage indicates insulation
                  deterioration or a developing fault.
                </li>
              </ul>
              <p className="mt-4">
                An appliance that fails any test must be taken out of service immediately, labelled
                as failed, and either repaired or disposed of. Failed appliances must never be
                returned to service without retesting and confirmation that the fault has been
                rectified.
              </p>
            </>
          ),
        },
        {
          id: 'record-keeping',
          heading: 'Record Keeping',
          content: (
            <>
              <p>
                Keeping accurate records of PAT testing is essential for two reasons: demonstrating
                compliance with the Electricity at Work Regulations to an HSE inspector or insurance
                company, and tracking the condition of equipment over time so you can adjust testing
                frequencies based on actual fault rates.
              </p>
              <p>Records should include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A unique asset identifier for each appliance</li>
                <li>Description and location of the appliance</li>
                <li>Date of inspection and test</li>
                <li>Results of all visual checks and electrical tests</li>
                <li>Pass or fail outcome</li>
                <li>Name of the person carrying out the test</li>
                <li>Date of the next scheduled inspection</li>
                <li>Any remedial action taken for failed items</li>
              </ul>
              <p className="mt-4">
                The traditional approach is to stick a pass/fail label on each appliance and
                maintain a paper register. Digital record keeping is more efficient and provides a
                better audit trail. With a digital system, you can search records instantly,
                generate reports for clients, track failure rates by equipment type, and schedule
                retests automatically.
              </p>

              <SEOAppBridge
                title="PAT Testing Certificates — Digital Records and Professional PDFs"
                description="Elec-Mate includes a PAT testing certificate form with digital record keeping. Complete tests on your phone, generate professional PDF reports, and send results to clients instantly. Full audit trail for every appliance."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'pat-testing-as-a-business',
          heading: 'PAT Testing as a Business',
          content: (
            <>
              <p>
                PAT testing is an excellent additional revenue stream for electricians. The barriers
                to entry are low (a basic PAT tester costs £200-£500 and training courses take 1
                day), the work is straightforward, and demand is consistent because businesses need
                testing carried out at regular intervals.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Pricing PAT Testing</h3>
              <p>
                PAT testing is typically priced per appliance, with discounts for larger quantities.
                Typical rates in 2026:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>1-50 appliances: £2.50-£3.50 per item</li>
                <li>50-200 appliances: £1.50-£2.50 per item</li>
                <li>200+ appliances: £1.00-£1.80 per item</li>
                <li>Minimum charge: £50-£80 per visit</li>
              </ul>
              <p className="mt-4">
                A competent PAT tester can test 20-40 appliances per hour depending on the type of
                equipment and environment. An office with mostly IT equipment (monitors, PCs,
                printers) is faster to test than a workshop with a mix of portable power tools,
                extension leads, and industrial equipment.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">
                Building a PAT Testing Round
              </h3>
              <p>
                The real value in PAT testing is building a regular round of recurring customers. A
                school that needs 300 appliances tested annually is worth £400-£700 per year. Ten
                schools in your area represent £4,000-£7,000 of recurring annual revenue for
                approximately 10 days of work. Add offices, pubs, hotels, churches, and letting
                agents, and PAT testing can easily contribute £10,000-£20,000 per year to your
                business.
              </p>
              <p>
                Managing a PAT testing round requires good customer management — tracking when each
                client is due for retesting, scheduling visits efficiently to minimise travel, and
                sending reminders when testing is due.
              </p>

              <SEOAppBridge
                title="Manage Your PAT Testing Business With Elec-Mate"
                description="Customer management, quoting, invoicing, expense tracking, and professional PAT certificates — everything you need to run a profitable PAT testing round. Track when clients are due for retesting and send reminders automatically."
                icon={Users}
              />

              <p>
                Elec-Mate's business tools are built for electricians running multiple service
                lines. The{' '}
                <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink>{' '}
                lets you generate PAT testing quotes with per-appliance pricing, the{' '}
                <SEOInternalLink href="/tools/electrician-invoice-app">
                  invoice builder
                </SEOInternalLink>{' '}
                sends professional invoices from site, and the customer management system tracks
                your entire client base with testing due dates and contact history. For pricing your
                PAT testing services, see our guide on{' '}
                <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
                  how to price electrical jobs
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is PAT testing a legal requirement in the UK?',
          answer:
            'No, there is no specific law that requires PAT testing. The term "PAT testing" does not appear in any UK legislation. However, the Electricity at Work Regulations 1989 (Regulation 4(2)) require that electrical equipment is maintained so as to prevent danger. The Health and Safety at Work Act 1974 requires employers to ensure the safety of employees and others. The Provision and Use of Work Equipment Regulations 1998 require that work equipment is maintained in an efficient state. PAT testing is the recognised and accepted method of demonstrating compliance with these legal duties. If an appliance causes an injury and you cannot show evidence of regular inspection and testing, you will be asked why — and "it is not a legal requirement" is not an adequate defence when someone has been hurt. The HSE, insurance companies, local authorities, and the courts all treat PAT testing as an expected standard of care.',
        },
        {
          question: 'Who is qualified to carry out PAT testing?',
          answer:
            'The Electricity at Work Regulations require PAT testing to be carried out by a "competent person" — someone who has the knowledge, training, and experience to carry out the testing safely and interpret the results correctly. There is no specific qualification legally required. In practice, this means anyone who has completed a PAT testing training course (typically 1 day) from a recognised provider and understands the IET Code of Practice. Qualified electricians are considered competent to carry out PAT testing by virtue of their existing qualifications and experience, without needing a separate PAT testing course — although a refresher on the IET Code of Practice 5th Edition is recommended. For non-electricians, a City and Guilds 2377 (PAT Testing) or equivalent course provides the necessary training. Some insurers and clients may require specific qualifications, so check before offering PAT testing services.',
        },
        {
          question: 'How often should PAT testing be done?',
          answer:
            'Testing frequency should be determined by a risk assessment, not by a blanket annual schedule. The IET Code of Practice 5th Edition provides suggested initial frequencies that vary by environment and equipment type. Construction site equipment (110V tools) should be tested every 3 months with monthly visual inspections. Industrial and commercial equipment should be tested every 6-12 months. Office IT equipment in a low-risk environment may only need formal testing every 4-5 years, with visual inspections every 2 years. Equipment in schools, hotels, and public venues typically needs formal testing every 2-3 years. The key principle is that testing must be frequent enough to detect faults before they cause danger. If your testing reveals a high failure rate, increase the frequency. If equipment consistently passes with no deterioration, you can justify extending the interval. The IET Code of Practice emphasises that rigid annual testing of all equipment is often unnecessary and wasteful.',
        },
        {
          question: 'Do new appliances need PAT testing?',
          answer:
            'No. New appliances that carry a CE or UKCA mark are assumed to meet safety standards when they leave the manufacturer. They do not need PAT testing before being put into service. However, the IET Code of Practice recommends a visual inspection of new equipment before first use to check for transit damage (damaged cables, loose plugs, cracked casings). The equipment should then be entered into your PAT testing register with the date it was put into service, so it is included in future testing schedules at the appropriate interval for its type and environment. The first formal PAT test should take place at the interval determined by your risk assessment — for example, 12 months after first use in an office environment, or 3 months after first use on a construction site.',
        },
        {
          question: 'What equipment do I need for PAT testing?',
          answer:
            "At minimum, you need a PAT tester — a purpose-built instrument that carries out earth continuity, insulation resistance, and earth leakage tests automatically. Entry-level PAT testers cost £200-£400 and are suitable for small-volume testing. Professional PAT testers with built-in memory, barcode scanning, and data download capability cost £400-£1,200 and are worth the investment if you are doing regular PAT testing for multiple clients. You also need pass and fail labels, a means of recording results (paper register or digital system), and a unique identification system for each appliance (asset labels or barcodes). A 13A plug-top tester is useful for quick functional checks. You do not need a separate insulation resistance tester or earth continuity tester — the PAT tester does everything. Elec-Mate's digital PAT testing certificates replace the need for paper registers and provide a complete audit trail.",
        },
        {
          question: 'Can I PAT test my own equipment as a business owner?',
          answer:
            'Yes, provided you are competent to do so. Many small business owners carry out their own PAT testing rather than hiring an external tester, especially if they have a small number of appliances. You should complete a PAT testing awareness course (available online or as a 1-day classroom course), read the IET Code of Practice 5th Edition, and understand the pass/fail criteria for each test. You will need a PAT tester and a system for recording results. For businesses with a small number of low-risk appliances (office equipment, kitchen appliances), self-testing is practical and cost-effective. For businesses with a large number of appliances, specialist equipment (e.g., workshops, factories), or equipment in demanding environments, hiring a professional PAT tester is recommended because they will be more efficient and more likely to identify subtle faults.',
        },
        {
          question: 'What happens if an appliance fails a PAT test?',
          answer:
            'If an appliance fails any part of the PAT test — visual inspection or electrical test — it must be immediately taken out of service. Attach a "FAIL" or "DO NOT USE" label to the appliance and disconnect it from the mains supply. Record the failure in your PAT testing register, noting which test it failed and the readings obtained. The appliance can then either be repaired and retested (if the fault is repairable and the repair is cost-effective), or it should be disposed of. If the appliance is repaired, it must pass a full PAT test before being returned to service. Common failure causes include damaged cables (often caused by furniture rolling over them or cables being trapped in drawers), loose earth connections in the plug, blown fuses replaced with incorrect ratings, and insulation deterioration due to age or overheating. The failure rate for well-maintained equipment in office environments is typically 2-5% — if your failure rate is significantly higher, it suggests the equipment is being poorly treated or the testing interval needs to be shortened.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/pat-testing',
          title: 'PAT Testing App',
          description:
            'Digital PAT testing certificates with professional PDF export, asset tracking, and client reporting. Complete tests on your phone.',
          icon: PlugZap,
          category: 'Certificates',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Complete Electrical Installation Condition Reports digitally. AI-powered defect classification and board scanning.',
          icon: FileText,
          category: 'Certificates',
        },
        {
          href: '/guides/testing-sequence-guide',
          title: 'Testing Sequence Guide',
          description:
            'Step-by-step guide to the correct sequence of electrical tests for initial verification and periodic inspection.',
          icon: ClipboardCheck,
          category: 'Guides',
        },
        {
          href: '/guides/how-to-test-insulation-resistance',
          title: 'Insulation Resistance Testing',
          description:
            'How to carry out insulation resistance tests correctly, including test voltages, minimum values, and when to test.',
          icon: Zap,
          category: 'Guides',
        },
        {
          href: '/tools/electrical-quoting-app',
          title: 'Electrical Quoting App',
          description:
            'Professional quoting for PAT testing rounds, EICR inspections, and installation work. AI-powered cost estimation.',
          icon: Receipt,
          category: 'Business Tools',
        },
        {
          href: '/tools/best-electrician-app-uk',
          title: 'Best Electrician App UK',
          description:
            'Compare electrician apps for certificates, testing, AI tools, quoting, and business management.',
          icon: Zap,
          category: 'Comparison',
        },
      ]}
      ctaHeading="Manage PAT Testing With Elec-Mate"
      ctaSubheading="Digital PAT certificates, customer management, quoting, invoicing, and AI-powered tools — everything you need to run a profitable PAT testing business. Try free for 7 days."
    />
  );
}
