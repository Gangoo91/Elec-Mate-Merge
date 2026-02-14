import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  PoundSterling,
  ClipboardCheck,
  Scale,
  Clock,
} from 'lucide-react';

export default function LandlordElectricalSafetyPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety | Complete Guide UK 2026"
      description="Complete guide to landlord electrical safety requirements in the UK. Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, EICR requirements, 5-year cycle, 28-day remedial work, £30,000 penalties, Scotland and Wales differences, HMO requirements, finding qualified electricians, and insurance."
      datePublished="2025-01-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Landlord Electrical Safety', href: '/guides/landlord-electrical-safety' },
      ]}
      tocItems={[
        { id: 'legal-requirements', label: 'Legal Requirements' },
        { id: 'eicr-timeline', label: 'EICR Timeline & Frequency' },
        { id: 'penalties', label: 'Penalties for Non-Compliance' },
        { id: 'what-landlords-must-do', label: 'What Landlords Must Do' },
        { id: 'unsatisfactory-reports', label: 'Dealing With Unsatisfactory Reports' },
        { id: 'hmo-requirements', label: 'HMO Extra Requirements' },
        { id: 'scotland-wales', label: 'Scotland & Wales' },
        { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
        { id: 'insurance', label: 'Insurance Requirements' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="High Value Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Landlord Electrical Safety UK
          <br />
          <span className="text-yellow-400">Legal Requirements 2026</span>
        </>
      }
      heroSubtitle="Landlord electrical safety is now a strict legal requirement in England with fines of up to £30,000 per breach. This guide covers every legal obligation — EICR requirements, timelines, penalties, remedial work deadlines, HMO rules, Scotland and Wales differences, and what electricians doing landlord work need to know."
      readingTime={20}
      keyTakeaways={[
        'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to have the electrical installation in their property inspected and tested by a qualified person at least every 5 years, with a valid EICR in place before a tenancy begins.',
        'If the EICR reports an unsatisfactory result (C1 or C2 observations), the landlord has 28 days to complete remedial work and obtain written confirmation from the electrician that the work has been done. Failure to act can result in fines up to £30,000 per breach.',
        'HMOs (Houses in Multiple Occupation) have additional electrical safety requirements under the Housing Act 2004 and HMO licensing conditions, including more frequent inspections in some local authority areas.',
        'Scotland has separate electrical safety requirements under the Housing (Scotland) Act 2006, requiring an EICR before the tenancy starts and every 5 years thereafter. Wales has not yet introduced equivalent specific regulations but is expected to follow.',
        'Elec-Mate helps electricians doing landlord work with EICR forms that auto-flag unsatisfactory results, a remedial estimator that turns defects into quotes, certificate and invoice sending from site, and property/certificate tracking.',
      ]}
      sections={[
        {
          id: 'legal-requirements',
          heading: 'The Legal Requirements (England)',
          content: (
            <>
              <p>
                The Electrical Safety Standards in the Private Rented Sector (England) Regulations
                2020 came into force on 1 June 2020. These regulations impose mandatory electrical
                safety standards on landlords renting residential properties in England and require
                regular inspection and testing of the fixed electrical installation by a qualified
                person.
              </p>
              <p>
                The regulations apply to all new tenancies from 1 July 2020 and all existing
                tenancies from 1 April 2021. There is no grace period, no exemption for small
                landlords, and no exception for short-term lettings (except certain excluded
                tenancies such as lodger arrangements where the landlord lives in the same
                property).
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Key Legal Obligations for Landlords
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Have the installation inspected and tested
                      </strong>{' '}
                      by a qualified and competent person before the tenancy begins and at intervals
                      of no more than 5 years thereafter (or more frequently if the previous report
                      specifies a shorter interval).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Obtain a report</strong> (EICR —
                      Electrical Installation Condition Report) from the qualified person confirming
                      the results of the inspection and testing.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Supply a copy of the report to the tenant
                      </strong>{' '}
                      within 28 days of the inspection (for existing tenants) or before occupancy
                      (for new tenants).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Supply a copy to the local authority
                      </strong>{' '}
                      within 7 days of receiving a written request from them.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Complete remedial work</strong> for any{' '}
                      <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                        C1 (Danger Present) or C2 (Potentially Dangerous) observations
                      </SEOInternalLink>{' '}
                      within 28 days (or the period specified by the inspector if less than 28 days
                      for C1 items).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Obtain written confirmation</strong> from
                      the qualified person that the remedial work has been completed and meets the
                      required standard.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Supply confirmation to the tenant</strong>{' '}
                      within 28 days and to the local authority within 28 days of the remedial work
                      being completed.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The phrase "qualified and competent person" is not precisely defined in the
                regulations, but the government guidance states that this means a person who is a
                member of a competent person scheme (such as NICEIC, NAPIT, ELECSA, or BRE) or who
                is otherwise competent to carry out the inspection and testing and produce the
                report. In practice, landlords should use an electrician who is registered with a
                competent person scheme, as this provides clear evidence of competence in the event
                of a dispute.
              </p>
            </>
          ),
        },
        {
          id: 'eicr-timeline',
          heading: 'EICR Timeline and Frequency',
          content: (
            <>
              <p>
                The regulations require a valid EICR to be in place at all times during a tenancy.
                The timeline works as follows:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">EICR Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-32 shrink-0 font-bold text-yellow-400">Before tenancy</div>
                    <div className="text-white text-sm leading-relaxed">
                      A valid EICR must be in place before the tenant moves in. If no EICR exists
                      (first letting or previous report has expired), the landlord must commission
                      one before the tenancy start date. A copy must be provided to the new tenant
                      before they occupy the property.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-32 shrink-0 font-bold text-yellow-400">Every 5 years</div>
                    <div className="text-white text-sm leading-relaxed">
                      The installation must be re-inspected and tested at intervals of no more than
                      5 years from the date of the previous report. If the inspector recommends a
                      shorter interval (for example, 3 years for an older installation in declining
                      condition), the shorter interval applies. The landlord must not allow the EICR
                      to expire — a new inspection must be commissioned before the previous report's
                      expiry date.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-32 shrink-0 font-bold text-yellow-400">28 days remedial</div>
                    <div className="text-white text-sm leading-relaxed">
                      If the EICR identifies C1 or C2 observations, the landlord must ensure all
                      remedial work is completed within 28 days of the inspection. For C1 items
                      (Danger Present), the inspector may specify a shorter timescale — potentially
                      immediate action if the danger is imminent. The clock starts from the date of
                      the report, not the date the landlord receives it.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-32 shrink-0 font-bold text-yellow-400">Confirmation</div>
                    <div className="text-white text-sm leading-relaxed">
                      After remedial work is completed, the qualified person must provide written
                      confirmation that the work meets the required standard. This confirmation must
                      be supplied to the tenant within 28 days and to the local authority within 28
                      days of completion. The confirmation document should reference the original
                      EICR and detail the remedial work carried out.
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Landlords with multiple properties need a system for tracking EICR expiry dates
                across their portfolio. Missing a renewal date is one of the most common compliance
                failures and can result in a fixed penalty notice from the local authority.
              </p>
              <SEOAppBridge
                title="Track Properties and Certificates in Elec-Mate"
                description="Elec-Mate lets electricians track all properties, tenants, and certificate expiry dates for their landlord clients. Set reminders before EICRs expire, and send renewal reminders to landlords automatically. Never miss a renewal date."
                icon={Clock}
              />
            </>
          ),
        },
        {
          id: 'penalties',
          heading: 'Penalties for Non-Compliance',
          content: (
            <>
              <p>
                The penalties for failing to comply with the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020 are severe and are enforced by
                local housing authorities.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Financial Penalties</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">First offence</h4>
                      <p className="text-white text-sm">Financial penalty</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">Up to £30,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Per breach</h4>
                      <p className="text-white text-sm">
                        Each property, each failure is a separate breach
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">Up to £30,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Repeated non-compliance</h4>
                      <p className="text-white text-sm">Persistent failure after penalty notice</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">
                      Criminal prosecution possible
                    </span>
                  </div>
                </div>
              </div>
              <p>
                Each breach is a separate offence. A landlord with 10 properties who fails to obtain
                EICRs for any of them could face penalties of up to £300,000. The local authority
                can also arrange for the inspection and remedial work to be carried out themselves
                and recover the cost from the landlord, plus an administration charge.
              </p>
              <p>
                Beyond the financial penalties, non-compliance can affect the landlord's ability to
                serve a Section 21 (no-fault) eviction notice. If the landlord has not complied with
                the electrical safety regulations, a Section 21 notice may be invalid. This gives
                the tenant a defence against eviction, which can delay possession proceedings
                significantly.
              </p>
              <p>
                Local authorities are increasingly active in enforcing these regulations. Many have
                dedicated teams that proactively audit landlord compliance, particularly in areas
                with high proportions of private rented housing. Some authorities use data from
                tenancy deposit schemes, council tax records, and housing benefit records to
                identify rented properties and check compliance.
              </p>
            </>
          ),
        },
        {
          id: 'what-landlords-must-do',
          heading: 'What Landlords Must Do — Step by Step',
          content: (
            <>
              <p>
                For landlords navigating the requirements for the first time, here is the
                step-by-step process:
              </p>
              <div className="space-y-4 my-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">
                      Find a qualified electrician
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      The electrician must be registered with a competent person scheme — NICEIC,
                      NAPIT, ELECSA, or BRE. Check their registration on the scheme's website. Ask
                      for evidence of public liability insurance and qualifications (City & Guilds
                      2391 or equivalent inspection and testing qualification).
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Commission the EICR</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Arrange access to the property for the electrician. A full EICR for a typical
                      domestic property takes 2 to 4 hours depending on the size of the installation
                      and the number of circuits. The electrician will need access to the consumer
                      unit, all rooms, the loft space, and any outbuildings that are supplied from
                      the main installation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Review the report</h3>
                    <p className="text-white text-sm leading-relaxed">
                      The EICR will classify the installation as either Satisfactory or
                      Unsatisfactory. If Satisfactory with no C1 or C2 observations, no further
                      action is needed until the next inspection. If Unsatisfactory, the report will
                      list the observations with their classification codes (C1 = Danger Present, C2
                      = Potentially Dangerous, C3 = Improvement Recommended, FI = Further
                      Investigation Required).
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">
                      Commission remedial work (if needed)
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      All C1 and C2 observations must be rectified within 28 days. C1 items may need
                      immediate action. The remedial work can be done by the same electrician who
                      carried out the inspection or by a different qualified person. After
                      completion, obtain written confirmation that the work has been done to the
                      required standard.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">
                      Provide copies to the tenant
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      Give a copy of the EICR to the tenant within 28 days of the inspection. If
                      remedial work was done, provide the confirmation letter within 28 days of
                      completion. Keep copies of everything — the EICR, the remedial confirmation,
                      and the evidence of when copies were provided to the tenant.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'unsatisfactory-reports',
          heading: 'Dealing With Unsatisfactory EICR Reports',
          content: (
            <>
              <p>
                An unsatisfactory EICR means the installation has one or more C1 or C2 observations.
                This triggers the 28-day remedial work requirement and creates additional
                obligations for the landlord.
              </p>
              <p>Common defects found during landlord EICRs include:</p>
              <ul className="space-y-3 my-4">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Lack of RCD protection</strong> — Older
                    consumer units with no RCD protection on socket outlet circuits. This is a C2
                    observation because the absence of RCD protection on circuits that BS 7671 now
                    requires to be RCD-protected is potentially dangerous.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Deteriorated wiring</strong> — Perished
                    cable insulation, damaged cables from DIY work or building alterations,
                    overheated connections. May be C1 (exposed live conductors) or C2 (insulation
                    deteriorating but not yet exposed).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Inadequate earthing</strong> — Missing or
                    ineffective main bonding, absent supplementary bonding in bathrooms, high earth
                    fault loop impedance values exceeding BS 7671 limits.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Unsafe additions</strong> — DIY electrical
                    work by previous tenants or unqualified workers — non-standard connections,
                    incorrect cable sizes, missing protection, dangerous accessory installations.
                  </span>
                </li>
              </ul>
              <p>
                For electricians, unsatisfactory landlord EICRs represent a significant source of
                remedial work. Being able to quickly turn the defect observations into a clear,
                itemised quote for the landlord is valuable — it demonstrates professionalism and
                speeds up the decision-making process. The{' '}
                <SEOInternalLink href="/guides/unsatisfactory-eicr">
                  unsatisfactory EICR guide
                </SEOInternalLink>{' '}
                covers the observation codes and remedial requirements in detail.
              </p>
              <SEOAppBridge
                title="Remedial Estimator Turns Defects Into Quotes"
                description="Elec-Mate's AI Cost Engineer can take the C1 and C2 observations from an EICR and generate an itemised remedial quote in seconds. It prices the materials, estimates the labour time, and produces a professional PDF quote ready to send to the landlord — all from your phone on site."
                icon={PoundSterling}
              />
            </>
          ),
        },
        {
          id: 'hmo-requirements',
          heading: 'HMO Extra Requirements',
          content: (
            <>
              <p>
                <SEOInternalLink href="/guides/hmo-electrical-requirements">
                  Houses in Multiple Occupation (HMOs)
                </SEOInternalLink>{' '}
                have additional electrical safety requirements beyond the standard private rented
                sector regulations. An HMO is a property rented to 3 or more tenants from 2 or more
                households who share facilities such as kitchens or bathrooms.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Additional HMO Requirements</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">More frequent inspections</strong> — Some
                      local authorities require EICRs every 3 years for HMOs rather than the
                      standard 5 years. Check the specific licensing conditions for HMOs in your
                      local authority area.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire detection</strong> — HMOs require a
                      suitable fire detection and alarm system. For licensable HMOs (those with 5 or
                      more occupants from 2 or more households), a Grade A LD2 fire alarm system is
                      typically required (mains-powered, interlinked smoke detectors in all
                      circulation spaces plus heat detectors in kitchens).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Emergency lighting</strong> — Some HMOs
                      require emergency lighting in common areas and escape routes, depending on the
                      building size and local authority requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Individual metering</strong> — Some local
                      authorities require individual electricity metering for each letting unit,
                      with the associated consumer units and wiring for each unit forming a separate
                      installation that requires its own EICR.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">AFDD recommendation</strong> — BS 7671
                      Regulation 421.1.7 recommends{' '}
                      <SEOInternalLink href="/guides/afdd-arc-fault-detection">
                        AFDDs
                      </SEOInternalLink>{' '}
                      for circuits in HMOs due to the higher fire risk associated with multiple
                      independent households sharing a building.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                HMO work is a significant market for electricians. The combination of regular EICR
                inspections, higher standards, fire alarm installations, and remedial work creates a
                steady workflow. Electricians who specialise in HMO compliance can build strong
                relationships with landlords and letting agents who manage multiple HMO properties.
              </p>
            </>
          ),
        },
        {
          id: 'scotland-wales',
          heading: 'Scotland and Wales',
          content: (
            <>
              <p>
                The Electrical Safety Standards in the Private Rented Sector (England) Regulations
                2020 apply only to England. Scotland and Wales have their own regulatory frameworks.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Scotland</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Scotland has had electrical safety requirements for private rented properties
                    since December 2015 under the Housing (Scotland) Act 2006 and the Repairing
                    Standard regulations. The requirements are similar to the English regulations:
                  </p>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>EICR required before the tenancy starts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Inspections every 5 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Remedial work must be completed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Copy provided to tenant</span>
                    </li>
                  </ul>
                  <p className="text-white text-sm leading-relaxed mt-3">
                    Enforcement in Scotland is through the First-tier Tribunal for Scotland (Housing
                    and Property Chamber), which can order landlords to carry out work and impose
                    penalties for non-compliance.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Wales</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    As of 2026, Wales has not introduced regulations equivalent to the English 2020
                    regulations or the Scottish requirements. However, Welsh landlords still have
                    obligations under:
                  </p>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        The Renting Homes (Wales) Act 2016 — which requires landlords to ensure the
                        property is fit for human habitation, including electrical safety
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        The Housing Act 2004 — HHSRS (Housing Health and Safety Rating System)
                        includes electrical hazards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        HMO licensing conditions — which may require EICRs for licensed HMOs
                      </span>
                    </li>
                  </ul>
                  <p className="text-white text-sm leading-relaxed mt-3">
                    Wales is expected to introduce specific electrical safety regulations in due
                    course, following the pattern set by England and Scotland.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'finding-electrician',
          heading: 'Finding a Qualified Electrician',
          content: (
            <>
              <p>
                For landlords, choosing the right electrician is critical. The regulations require a
                "qualified and competent person," and using an unqualified electrician could result
                in an invalid EICR that the local authority will not accept — wasting money and
                time.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">What to Check</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Competent person scheme registration
                      </strong>{' '}
                      — NICEIC, NAPIT, ELECSA, or BRE. Verify online on the scheme's website — do
                      not just take the electrician's word for it. Registration must be current and
                      active.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Inspection and testing qualification
                      </strong>{' '}
                      — City & Guilds 2391 (or the older 2394/2395) or equivalent qualification in
                      inspection and testing. Not all electricians are qualified to carry out EICRs
                      — installation qualifications alone are not sufficient.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Public liability insurance</strong> —
                      Minimum £2 million cover, though £5 million is standard. Ask for a copy of the
                      current certificate of insurance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Experience with landlord work</strong> —
                      An electrician experienced in landlord EICRs understands the specific
                      regulatory requirements, the 28-day remedial timeline, and the documentation
                      that landlords need to satisfy the local authority.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Typical costs for a domestic EICR in 2026 range from £150 to £300 depending on the
                size of the property, the number of circuits, and the region. The cost should
                include the inspection and testing, the EICR report, and a verbal summary of any
                findings. Remedial work is quoted and charged separately.
              </p>
              <p>
                For more detail on EICR costs, see the{' '}
                <SEOInternalLink href="/guides/eicr-cost-uk">EICR cost guide</SEOInternalLink>.
              </p>
            </>
          ),
        },
        {
          id: 'insurance',
          heading: 'Insurance Requirements',
          content: (
            <>
              <p>
                Landlord insurance policies typically include (or can be extended to include) a
                requirement for electrical safety compliance. Many policies have a condition that
                the electrical installation must be maintained in a safe condition and inspected at
                appropriate intervals. Failure to comply with this condition can invalidate the
                policy — meaning the landlord would not be covered for fire damage, tenant injury
                claims, or other losses arising from an electrical defect.
              </p>
              <p>
                Since the introduction of the 2020 regulations, most landlord insurance providers
                now specifically ask whether a valid EICR is in place. Some offer premium discounts
                for properties with current EICRs, while others will not provide cover at all
                without one.
              </p>
              <p>
                For electricians, it is worth mentioning insurance implications when discussing
                EICRs with landlord clients. Many landlords are primarily motivated by cost — but
                the potential invalidation of their building and contents insurance (which could
                cover hundreds of thousands of pounds in claims) is a powerful incentive to maintain
                compliance. An unsatisfactory EICR that leads to a fire claim being rejected by the
                insurer could be financially devastating for the landlord.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How much is the fine for not having an EICR as a landlord?',
          answer:
            'The maximum fine for failing to comply with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 is £30,000 per breach. Each property is a separate breach, so a landlord with multiple non-compliant properties faces cumulative fines. The fine is a civil penalty imposed by the local housing authority — they do not need to go through the criminal courts. The actual fine amount is determined by the local authority based on the severity of the breach, the compliance history of the landlord, the financial circumstances of the landlord, and whether the landlord has cooperated with the investigation. First-time offences with no harm caused typically attract lower penalties, but persistent or deliberate non-compliance can result in the maximum fine. Repeated offences can also lead to criminal prosecution.',
        },
        {
          question: 'How often does a landlord need an EICR?',
          answer:
            'The standard interval is every 5 years from the date of the previous report. However, if the inspector recommends a shorter interval on the EICR (for example, 3 years for an older installation showing signs of deterioration), the shorter interval applies and the landlord must comply with it. The EICR must also be in place before any new tenancy begins — if a landlord is re-letting a property and the previous EICR has expired, a new inspection must be commissioned before the new tenant moves in. For HMOs, some local authorities impose shorter intervals (typically 3 years) as a condition of the HMO licence. Always check the specific licensing conditions for HMOs in the relevant local authority area.',
        },
        {
          question: 'What happens if the EICR comes back as unsatisfactory?',
          answer:
            'An unsatisfactory EICR means the installation has one or more C1 (Danger Present) or C2 (Potentially Dangerous) observations. The landlord must ensure all C1 and C2 items are rectified within 28 days of the inspection date (or sooner if the inspector specifies a shorter timescale for C1 items). After the remedial work is completed, the landlord must obtain written confirmation from the qualified electrician that the work meets the required standard. This confirmation must be provided to the existing tenant within 28 days of completion and to the local authority within 28 days if requested. C3 (Improvement Recommended) observations do not make the report unsatisfactory and do not trigger the 28-day remedial requirement — but the landlord should be advised to address them at a convenient time to maintain the installation in good condition. FI (Further Investigation Required) items may require additional investigation to determine the severity of the issue.',
        },
        {
          question: 'Can a landlord do electrical work themselves to save money?',
          answer:
            'Legally, there is no prohibition on a landlord carrying out electrical work on their own property. However, the Electrical Safety Standards regulations require that the inspection and testing be carried out by a "qualified and competent person" and that any notifiable work (consumer unit replacement, new circuits) must comply with Part P of the Building Regulations. In practice, a landlord who is not a qualified electrician should not be doing their own electrical work for several reasons. First, the work may not comply with BS 7671 and could create dangerous conditions. Second, an unqualified person cannot self-certify under Part P, meaning building control notification is required at additional cost. Third, the work will need to pass the next EICR inspection — and a qualified inspector will identify non-compliant work. Fourth, the insurance held by the landlord may be invalidated if electrical work is carried out by an unqualified person. The overwhelming recommendation is to use a qualified, competent person scheme registered electrician for all electrical work in rented properties.',
        },
        {
          question: 'Do the regulations apply to short-term holiday lets?',
          answer:
            'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to "relevant tenancies" as defined in the regulations. Holiday lets (where the property is let for holidays only and is not the primary residence of the tenant) are generally excluded from the definition of a relevant tenancy. However, landlords of holiday lets still have a duty of care to their guests under the Occupiers Liability Act 1957 and general health and safety law. An EICR is strongly recommended for holiday let properties regardless of whether the specific 2020 regulations apply. Additionally, many holiday let booking platforms (Airbnb, Booking.com, Vrbo) now require evidence of electrical safety checks as part of their host compliance requirements, and holiday let insurance policies typically require regular electrical inspections.',
        },
        {
          question: 'What should a landlord give to the tenant regarding electrical safety?',
          answer:
            'Under the 2020 regulations, the landlord must provide the tenant with a copy of the most recent EICR within 28 days of the inspection being carried out (for existing tenants) or before occupancy (for new tenants). If remedial work was required and has been completed, the landlord must also provide the written confirmation from the electrician that the work has been done, within 28 days of completion. The landlord must also supply a copy of the EICR to any prospective tenant who requests one within 28 days of the request. All of these are copies — the landlord retains the originals. In addition to the EICR, best practice is to provide the tenant with information about the location of the consumer unit, how to reset a tripped MCB or RCD, and who to contact in the event of an electrical emergency. Elec-Mate generates professional PDF certificates that can be emailed directly to the landlord and tenant from site.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate Guide',
          description: 'How to complete an Electrical Installation Condition Report.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/unsatisfactory-eicr',
          title: 'Unsatisfactory EICR Guide',
          description: 'What to do when the EICR comes back unsatisfactory.',
          icon: AlertTriangle,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-cost-uk',
          title: 'EICR Cost UK',
          description: 'How much an EICR costs and what affects the price.',
          icon: PoundSterling,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-observation-codes',
          title: 'EICR Observation Codes',
          description: 'C1, C2, C3, and FI codes explained in detail.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Metal CU, RCD protection, and board requirements.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Complete guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Win More Landlord Work With Elec-Mate"
      ctaSubheading="EICR forms with auto-unsatisfactory flagging, remedial estimator, certificate and invoice sending from site, and property tracking. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
