import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  PenTool,
  Zap,
  ListOrdered,
} from 'lucide-react';

/** Edge-to-edge on phones, inset card from sm: up. */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

/**
 * Three-column reference table. Scrolls inside its own container so the page
 * body never scrolls sideways on a phone.
 */
function RefTable({
  columns,
  rows,
}: {
  columns: [string, string, string];
  rows: Array<[string, string, string]>;
}) {
  return (
    <div className="-mx-4 my-4 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-y border-white/[0.18]">
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 text-[12px] font-semibold text-white sm:px-3">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-white/[0.08]">
              <td className="px-4 py-3 align-top font-semibold text-white sm:px-3">{r[0]}</td>
              <td className="px-4 py-3 align-top text-white sm:px-3">{r[1]}</td>
              <td className="whitespace-nowrap px-4 py-3 align-top text-white sm:px-3">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HowToFillInMinorWorksPage() {
  return (
    <GuideTemplate
      title="Minor Works Certificate: Fill In Sections A to E"
      description="Five lettered sections: A description, B earthing and bonding, C circuit details, D test results, E declaration. Every field explained, plus SPD and AFDD."
      datePublished="2025-05-15"
      dateModified="2026-08-07"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        {
          label: 'How to Fill In a Minor Works Certificate',
          href: '/guides/how-to-fill-in-minor-works',
        },
      ]}
      tocItems={[
        { id: 'what-is-minor-works', label: 'What the Certificate Is For' },
        { id: 'what-counts', label: 'What Counts as Minor Works?' },
        { id: 'section-a', label: 'Section A — Description of the Minor Works' },
        { id: 'section-b', label: 'Section B — Earthing and Bonding' },
        { id: 'section-c', label: 'Section C — Circuit Details' },
        { id: 'section-d', label: 'Section D — Test Results' },
        { id: 'section-e', label: 'Section E — Declaration' },
        { id: 'next-inspection', label: 'Next Inspection Date' },
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
      heroSubtitle="A field-by-field walkthrough of the Minor Electrical Installation Works Certificate as printed in BS 7671:2018+A4:2026 Appendix 6 — Sections A to E, the tests that belong in Section D, and the mistakes that get certificates rejected on audit."
      readingTime={12}
      answerBox={{
        question: 'What is a Minor Works Certificate used for?',
        answer:
          'A Minor Electrical Installation Works Certificate certifies an addition or alteration to an existing circuit. Regulation 644.4.201 permits one for each circuit added to or altered, but only where the work does not include a new circuit or the replacement of a distribution board or consumer unit — those need an EIC.',
        detail:
          'The model form in BS 7671:2018+A4:2026 Appendix 6 has five lettered sections: A description of the minor works, B earthing and bonding, C circuit details, D test results, E declaration. Sections for SPD and AFDD details were added at Amendment 4.',
      }}
      keyTakeaways={[
        'Regulation 644.4.201 allows a Minor Works Certificate for each circuit added to or altered, provided the work includes no new circuit and no replacement of a distribution board or consumer unit.',
        'The Appendix 6 model form has five lettered sections — A description of the minor works, B earthing and bonding, C circuit details, D test results, E declaration — not four numbered parts.',
        'Section D covers protective conductor continuity, ring final circuit continuity, insulation resistance, polarity, maximum measured Zs and RCD disconnection time at IΔn — plus SPD and AFDD fields added at Amendment 4.',
        'There is no next inspection date on the model Minor Works Certificate. That recommendation sits on the EIC (Section D) and on the EICR.',
        'Elec-Mate auto-fills the site and circuit details, validates test results against BS 7671, captures a digital signature and exports the PDF with the guidance for recipients attached.',
      ]}
      sections={[
        {
          id: 'what-is-minor-works',
          heading: 'What the Certificate Is For',
          content: (
            <>
              <p>
                The Minor Electrical Installation Works Certificate is one of the three model forms
                published in Appendix 6 of BS 7671:2018+A4:2026, alongside the{' '}
                <SEOInternalLink href="/guides/when-is-eic-required">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                and the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Condition Report (EICR)
                </SEOInternalLink>
                . It is the shortest of the three and covers one existing circuit.
              </p>
              <p>
                Regulation 644.1 requires an EIC on completion of a new installation or an addition
                or alteration to an existing one, <strong>including the replacement of a
                distribution board or consumer unit</strong> — except where Regulation 644.4.201
                applies. That regulation is the one that permits the Minor Works Certificate:
              </p>
              <blockquote className={cardCn}>
                <p className="text-white">
                  &ldquo;Where electrical installation work does not include the provision of a new
                  circuit or replacement of a distribution board or consumer unit, a Minor
                  Electrical Installation Works Certificate, based on the model given in Appendix 6,
                  may be provided for each circuit that has been added to or altered as an
                  alternative to an Electrical Installation Certificate.&rdquo;
                </p>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  BS 7671:2018+A4:2026, Regulation 644.4.201
                </p>
              </blockquote>
              <p>
                Two things follow from that wording. The certificate is issued{' '}
                <strong>per circuit</strong>, not per visit. And the header printed across the top
                of the model form — &ldquo;To be used only for minor electrical work which does not
                include the provision of a new circuit&rdquo; — is a limit on scope, not a
                suggestion.
              </p>
              <p>
                Under Regulation 644.5 the certificate must be compiled and signed, or otherwise
                authenticated, by a skilled person competent to verify that the requirements of BS
                7671 have been met. Regulation 644.4.202 confirms it may be produced in any written
                or electronic form, provided its authenticity and integrity can be verified.
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
                The notes printed with the model form give the test directly: additions and
                alterations that do not extend to the provision of a new circuit, and replacement of
                equipment such as accessories or luminaires — but{' '}
                <strong>
                  not the replacement of consumer units, distribution boards or similar items
                </strong>
                . That exclusion is part of BS 7671 and applies across the UK, whatever the local
                building control notification rules.
              </p>
              <div className="my-4 grid gap-4 sm:grid-cols-2">
                <div className={cardCn}>
                  <h3 className="mb-3 text-lg font-bold text-yellow-400">
                    Minor Works Certificate
                  </h3>
                  <ul className="space-y-2 text-sm text-white">
                    {[
                      'Adding a socket-outlet to an existing ring or radial circuit',
                      'Adding a fused connection unit (spur) to an existing circuit',
                      'Adding a lighting point to an existing lighting circuit',
                      'Adding an outdoor socket from an existing circuit',
                      'Relocating a light switch or socket on the same circuit',
                      'Replacing accessories or luminaires like for like',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cardCn}>
                  <h3 className="mb-3 text-lg font-bold text-red-400">
                    Electrical Installation Certificate
                  </h3>
                  <ul className="space-y-2 text-sm text-white">
                    {[
                      'Installing a new circuit from the distribution board',
                      'Replacing a consumer unit or distribution board — anywhere in the UK',
                      'Full or partial rewire',
                      'A new circuit for an EV charge point',
                      'Any new circuit for a kitchen, bathroom or extension',
                      'Multiple additions or alterations certified together instead of several Minor Works Certificates',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p>
                Guidance Note 3 adds the practical rule for a job that touches more than one
                circuit: several minor works on a <em>single</em> existing circuit may share one
                certificate, but where two circuits are modified, a separate certificate is issued
                for each. The EIC notes offer the alternative — where there are multiple additions
                or alterations that do not extend to new circuits, an EIC may be issued instead of
                several Minor Works Certificates.
              </p>
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
          id: 'section-a',
          heading: 'Section A — Description of the Minor Works',
          content: (
            <>
              <p>
                Section A is where most audit failures start, because it is the only part of the
                form that is free text. It has to be specific enough that another electrician can
                understand exactly what was done and where, without seeing the job.
              </p>
              <RefTable
                columns={['Field', 'What to enter', 'Reference']}
                rows={[
                  [
                    'Date minor works completed',
                    'The date the work was finished and tested.',
                    '—',
                  ],
                  ['Details of the client', 'The person ordering the work.', '644.4'],
                  [
                    'Installation location/address',
                    'Full address of the property, including the part of the building where relevant.',
                    '—',
                  ],
                  [
                    'Description of the minor works',
                    'What was installed, where, on which circuit, the cable type and size, and how it was connected.',
                    '—',
                  ],
                  [
                    'Details of any departures',
                    'Any departure from BS 7671 for the circuit altered or extended, with the reason.',
                    '120.3, 133.1.2, 133.1.3, 133.5',
                  ],
                  [
                    'Details of permitted exceptions',
                    'Where 30 mA RCD additional protection has been omitted under the documented risk assessment exception. The risk assessment is attached to the certificate.',
                    '411.3.3',
                  ],
                  [
                    'Comments on the existing installation',
                    'Any defect observed in the existing installation, so far as is reasonably practicable.',
                    '644.1.2',
                  ],
                ]}
              />
              <div className={cardCn}>
                <h3 className="text-sm font-semibold text-white">
                  Weak description vs description that survives an audit
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white">
                  <span className="font-semibold text-red-400">Weak:</span> &ldquo;Fitted
                  socket.&rdquo;
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white">
                  <span className="font-semibold text-yellow-400">Better:</span> &ldquo;Supplied and
                  installed one twin switched socket-outlet on the existing kitchen ring final
                  circuit, spurred from the existing socket-outlet at the base of the units in 2.5
                  mm&sup2; flat twin and earth to BS 6004, run in the ceiling void and terminated in
                  an accessible junction box.&rdquo;
                </p>
              </div>
              <p>
                On the permitted exceptions line, note what Regulation 411.3.3 actually allows. A
                documented risk assessment can excuse RCD protection for socket-outlets in{' '}
                <em>other locations</em> — item (b) — but never for socket-outlets liable to be used
                by ordinary persons or children, or for mobile equipment for use outdoors. If you
                are relying on it, the assessment must be attached to the certificate.
              </p>
              <SEOAppBridge
                title="Auto-Fill Site and Client Details"
                description="Elec-Mate remembers the installation address, client and supply details for a property, so the second visit starts with Section A already populated."
                icon={Zap}
              />
            </>
          ),
        },
        {
          id: 'section-b',
          heading: 'Section B — Earthing and Bonding',
          content: (
            <>
              <p>
                Section B records the presence and adequacy of the installation earthing and bonding
                arrangements, and the form cites Regulation 132.16 against it. That regulation is
                the reason the section exists:
              </p>
              <blockquote className={cardCn}>
                <p className="text-white">
                  &ldquo;No addition or alteration, temporary or permanent, shall be made to an
                  existing installation, unless it has been ascertained that the rating and the
                  condition of any existing equipment, including that of the distributor, will be
                  adequate for the altered circumstances. Furthermore, the earthing and bonding
                  arrangements, if necessary for the protective measure applied for the safety of
                  the addition or alteration, shall be adequate.&rdquo;
                </p>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  BS 7671:2018+A4:2026, Regulation 132.16
                </p>
              </blockquote>
              <RefTable
                columns={['Field', 'What to enter', 'Notes']}
                rows={[
                  [
                    'System earthing arrangement',
                    'Tick one: TN-S, TN-C-S (PME), TN-C-S (PNE), TT, TN-C or IT.',
                    'Six options on the A4:2026 form, not three',
                  ],
                  [
                    'Earth fault loop impedance at the distribution board',
                    'Measured Zdb at the board supplying the final circuit, in ohms.',
                    'Not Ze at the origin',
                  ],
                  [
                    'Main protective conductors',
                    'Confirm the earthing conductor is present and adequate.',
                    'Presence and adequacy',
                  ],
                  [
                    'Main protective bonding conductors',
                    'Tick each service bonded: water, gas, oil, structural steel, other (specify).',
                    'Record what is actually bonded',
                  ],
                ]}
              />
              <p>
                This section is not optional detail. Adding a socket to a circuit in a property with
                no main protective bonding to an extraneous-conductive-part is exactly the situation
                Regulation 132.16 is aimed at, and Section A is where the resulting defect gets
                recorded under Regulation 644.1.2.
              </p>
            </>
          ),
        },
        {
          id: 'section-c',
          heading: 'Section C — Circuit Details',
          content: (
            <>
              <p>
                Section C identifies the circuit you worked on and the devices protecting it. It is
                also where the two fields people most often skip live — the conductor sizes and the
                reference method.
              </p>
              <RefTable
                columns={['Field', 'What to enter', 'Notes']}
                rows={[
                  [
                    'DB reference no., location and type',
                    'Which board the circuit originates from, and where it is.',
                    '—',
                  ],
                  [
                    'Circuit number and description',
                    'The way number and the circuit as labelled at the board.',
                    'Match the board chart',
                  ],
                  [
                    'Sizes of conductors',
                    'Live conductor in mm² and cpc in mm² for the circuit altered or extended.',
                    'Two figures, both required',
                  ],
                  [
                    'Reference method',
                    'The installation method for the circuit conductors.',
                    'Table 4A2, Appendix 4',
                  ],
                  [
                    'Overcurrent protective device',
                    'BS (EN) number, type, rating in amperes and breaking capacity in kA.',
                    'e.g. BS EN 60898, Type B, 32 A',
                  ],
                  [
                    'RCD',
                    'BS (EN) number, type, rating, rated residual operating current IΔn in mA and any rated time delay in ms.',
                    'Type matters — A, F, B',
                  ],
                  ['SPD', 'BS (EN) number and type, where an SPD is present.', 'Added at A4:2026'],
                  ['AFDD', 'BS (EN) number and rating, where an AFDD is present.', 'Added at A4:2026'],
                ]}
              />
              <p>
                The SPD and AFDD fields are new. The Amendment 4 change note for Appendix 6 records
                that the model forms gained &ldquo;fields for recording the details of SPDs and
                AFDDs&rdquo;. If you are working from a pre-A4 pad of forms, those lines will be
                missing and your certificate will be out of date.
              </p>
              <p>
                Record the protective device accurately, because Section D&rsquo;s Zs figure cannot
                be assessed without it. A measured Zs of 1.2 Ω passes on a 32 A Type B device and
                fails on a 32 A Type C.
              </p>
            </>
          ),
        },
        {
          id: 'section-d',
          heading: 'Section D — Test Results',
          content: (
            <>
              <p>
                Section D is headed &ldquo;Test results for the altered or extended circuit (where
                relevant and practicable)&rdquo;. Everything relevant must be filled in — a blank
                where a test applied reads, to a scheme assessor, as a test that was not done.
              </p>
              <RefTable
                columns={['Test', 'What to record', 'Reference']}
                rows={[
                  [
                    'Protective conductor continuity',
                    'R1+R2 or R2 in ohms, measured with a low-resistance ohmmeter.',
                    '643.2.1(a)',
                  ],
                  [
                    'Continuity of ring final circuit conductors',
                    'r1, rn and r2 — only where the circuit altered is a ring final circuit.',
                    '643.2.1(b)',
                  ],
                  [
                    'Insulation resistance',
                    'The test voltage used, plus the live-live and live-earth results in MΩ.',
                    '643.3, Table 64',
                  ],
                  ['Polarity', 'Satisfactory.', '643.6'],
                  [
                    'Earth fault loop impedance',
                    'Maximum measured Zs for the circuit, in ohms.',
                    '643.7.3.1',
                  ],
                  [
                    'RCD disconnection time',
                    'Time in ms at the rated residual operating current IΔn, plus satisfactory test button operation.',
                    '643.8',
                  ],
                  [
                    'SPD functionality',
                    'Confirmed, where an SPD is fitted. Not all SPDs have a visible indication.',
                    'Appendix 6',
                  ],
                  [
                    'AFDD test button',
                    'Satisfactory operation, where an AFDD is fitted.',
                    'Appendix 6',
                  ],
                ]}
              />
              <div className="mt-6 space-y-4">
                <div className={cardCn}>
                  <h3 className="text-lg font-bold text-white">Test order and the dead tests</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Regulation 643.1 requires the tests of Regulations 643.2 to 643.6 — continuity,
                    insulation resistance, protection by SELV/PELV or separation, floor and wall
                    resistance, polarity — to be carried out <em>in that order</em> before the
                    installation is energised. Regulation 643.7.3.1 then adds that a continuity test
                    to Regulation 643.2 must be done before the earth fault loop impedance
                    measurement. If any test shows a failure, that test and every preceding test
                    whose result could have been affected are repeated after the fault is put right.
                  </p>
                </div>

                <div className={cardCn}>
                  <h3 className="text-lg font-bold text-white">
                    Insulation resistance — and the 250 V DC re-test
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Table 64 sets the test voltage and the minimum value: for circuits up to and
                    including 500 V, test at <strong>500 V DC</strong> with a minimum of{' '}
                    <strong>1.0 MΩ</strong>. SELV and PELV are tested at 250 V DC with a minimum of
                    0.5 MΩ. Regulation 643.3.2 expects the measurement to be made with current-using
                    equipment disconnected.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white">
                    Amendment 4 redrafted Regulation Group 643.3 and added a second stage.
                    Regulation 643.3.3 says that where connected equipment is likely to influence
                    the result or be damaged, the Table 64 test is applied before that equipment is
                    connected — and then, <strong>after connection</strong>, a test at{' '}
                    <strong>250 V DC</strong> is applied between live conductors and the protective
                    conductor, with a minimum of <strong>1 MΩ</strong>. Record the voltage you
                    actually used against the result.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white">
                    More detail in the{' '}
                    <SEOInternalLink href="/guides/insulation-resistance-testing-bs7671">
                      insulation resistance testing guide
                    </SEOInternalLink>
                    .
                  </p>
                </div>

                <div className={cardCn}>
                  <h3 className="text-lg font-bold text-white">
                    Earth fault loop impedance — what the figure is measured against
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Measure Zs at the furthest point of the altered circuit. The measured value has
                    to comply with Chapter 41 for the device recorded in Section C. Table 41.3(a)
                    gives a maximum Zs of <strong>1.37 Ω</strong> for a 32 A Type B circuit-breaker
                    at U₀ of 230 V, for compliance with both the 0.4 s disconnection time of
                    Regulation 411.3.2.2 and the 5 s time of Regulation 411.3.2.3.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white">
                    Those tabulated values assume the conductors are at their normal operating
                    temperature. A reading taken on a cold circuit is therefore compared against a
                    corrected figure — Guidance Note 3 applies a correction factor, commonly taken
                    as 0.8, giving roughly 1.10 Ω for that 32 A Type B example. The 0.8 is IET
                    guidance for interpreting a measurement, not a limit printed in BS 7671.
                    Elec-Mate applies the correct table value for the device you selected.
                  </p>
                </div>

                <div className={cardCn}>
                  <h3 className="text-lg font-bold text-white">
                    RCD disconnection time — one test, at IΔn
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Amendment 4 changed this. Regulation 643.8 requires the effectiveness of
                    automatic disconnection by RCDs to be verified with equipment to BS EN 61557-6,
                    and its note states that{' '}
                    <strong>regardless of RCD type</strong>, effectiveness is deemed verified where
                    the device disconnects within the stated time on an alternating current test at
                    the rated residual operating current (IΔn) — for a general non-delay type,{' '}
                    <strong>300 ms maximum</strong>.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white">
                    Table 3A of Appendix 3, which set the old time/current performance criteria, has
                    been deleted. There is no ½× or 5× result to record alongside the IΔn figure.
                    Record the disconnection time in ms and tick satisfactory test button operation;
                    where the circuit has no RCD, write N/A rather than leaving the field empty.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Test Result Validation Against BS 7671"
                description="Enter your results and Elec-Mate checks each one against the BS 7671 limit for the device and system you recorded in Section C."
                icon={ShieldCheck}
              />
            </>
          ),
        },
        {
          id: 'section-e',
          heading: 'Section E — Declaration',
          content: (
            <>
              <p>
                Section E carries a single declaration and a single signature. The printed wording
                is worth reading before you sign it, because it certifies two separate things:
              </p>
              <blockquote className={cardCn}>
                <p className="text-white">
                  &ldquo;I certify that the work covered by this certificate does not impair the
                  safety of the existing installation and the work has been designed, constructed,
                  inspected and tested in accordance with BS 7671:2018 amended to … (date) and that
                  to the best of my knowledge and belief, at the time of my inspection, complied
                  with BS 7671 except as detailed in Section A.&rdquo;
                </p>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  BS 7671:2018+A4:2026, Appendix 6 model form
                </p>
              </blockquote>
              <p>
                Those are two distinct certifications. First, that your work has not made the
                existing installation less safe — which is why Section B exists. Second, that the
                work itself was designed, constructed, inspected and tested to BS 7671. Anything you
                could not certify goes in Section A, not left unsaid.
              </p>
              <div className={cardCn}>
                <h3 className="mb-4 text-lg font-bold text-white">Declaration fields</h3>
                <ul className="space-y-3 text-white">
                  {[
                    ['Name', 'The skilled person who carried out and verified the work.'],
                    [
                      'For or on behalf of',
                      'The company or business entity, where you are signing on its behalf.',
                    ],
                    ['Address', 'The business address.'],
                    ['Position', 'Your role in the organisation.'],
                    ['Signature and date', 'Signed or otherwise authenticated, and dated.'],
                  ].map(([label, text]) => (
                    <li key={label} className="flex items-start gap-3">
                      <PenTool className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                      <span>
                        <strong className="text-yellow-400">{label}</strong> — {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                Fill in the amendment date. &ldquo;BS 7671:2018 amended to&rdquo; is a blank on the
                form, and the current answer is Amendment 4:2026. Leaving it empty, or writing an
                earlier amendment out of habit, is a straightforward audit finding.
              </p>
              <p>
                Unlike the{' '}
                <SEOInternalLink href="/guides/when-is-eic-required">EIC</SEOInternalLink>, which
                separates design, construction, and inspection and testing, the Minor Works
                Certificate has one combined declaration — Appendix 6 describes it as indicating
                responsibility for design, construction, inspection and testing of the work
                described. Your competent person scheme may also want a registration number on the
                form; that is a scheme requirement rather than a BS 7671 field.
              </p>
              <p>
                One more thing belongs with the certificate. The model form&rsquo;s{' '}
                <strong>guidance for recipients</strong> is marked &ldquo;to be appended to the
                Certificate&rdquo;. It is what tells the client to test RCDs and AFDDs six-monthly
                using the test button, to check the SPD status indicator, and to keep the
                certificate safe for whoever works on the installation next.
              </p>
              <SEOAppBridge
                title="Digital Signatures — Sign on Your Phone"
                description="Capture the signature on screen and export the certificate with the guidance for recipients already attached. No paper, no scanning."
                icon={PenTool}
              />
            </>
          ),
        },
        {
          id: 'next-inspection',
          heading: 'Next Inspection Date — Not on This Form',
          content: (
            <>
              <p>
                There is no next inspection field on the Appendix 6 Minor Works Certificate. That
                recommendation belongs elsewhere:
              </p>
              <RefTable
                columns={['Document', 'Where the interval is recorded', 'Who recommends it']}
                rows={[
                  [
                    'EIC',
                    'Section D, Next Inspection — an interval of not more than X years or months.',
                    'The designer (Reg 644.4)',
                  ],
                  [
                    'EICR',
                    'The recommended interval until the next inspection, on the report.',
                    'The inspector (Reg 653.4)',
                  ],
                  [
                    'Minor Works Certificate',
                    'No field. The guidance for recipients says only that the installation will need inspecting at appropriate intervals by a skilled person.',
                    '—',
                  ],
                ]}
              />
              <p>
                Some scheme and software forms add a next inspection line of their own. If yours
                does, fill it in — but do not invent a new interval for the whole installation off
                the back of adding a socket. Where the installation already has an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> with a
                recommended date, reference that date. Minor works does not reset the periodic
                inspection clock.
              </p>
              <p>
                Two things are worth knowing when a client asks you for a number. Guidance Note 3 is
                explicit that industry guidance on frequency &ldquo;can only be general&rdquo; and
                does not replace the inspector&rsquo;s judgement — the interval is assessed from the
                condition and use of the installation, and the reasoning should be recorded. And in
                England, the Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020 require an EICR at an interval of{' '}
                <strong>not more than five years</strong> for relevant private rented properties,
                unless the inspector considers a shorter period necessary.
              </p>
              <p>
                Where an installation includes a next inspection recommendation label, that is
                Regulation 514.12.1 — a durable notice fixed at or near the distribution board
                recording the date of the last inspection and the recommended date of the next.
              </p>
            </>
          ),
        },
        {
          id: 'common-mistakes',
          heading: 'Common Mistakes to Avoid',
          content: (
            <>
              <p>
                Minor Works Certificates are shorter than EICs, and that is exactly why they get
                filled in carelessly. These are the findings that come back from scheme assessments.
              </p>
              <div className="mt-4 space-y-4">
                {[
                  [
                    'Using a Minor Works Certificate where an EIC is required',
                    'The most common failure by a distance. Regulation 644.4.201 rules out any work that includes a new circuit or the replacement of a distribution board or consumer unit, and the Appendix 6 notes repeat the exclusion. New cooker circuits, new EV charge point circuits, new circuits for an extension and every consumer unit change need an EIC — in England, Wales, Scotland and Northern Ireland alike.',
                  ],
                  [
                    'Leaving test result fields blank',
                    'Every test in Section D that is relevant and practicable must be recorded. Where a test genuinely does not apply — RCD disconnection time on a circuit with no RCD, ring continuity on a radial — write N/A. A blank field reads as a test that was never carried out.',
                  ],
                  [
                    'Skipping Section B',
                    'Regulation 132.16 requires the earthing and bonding to be adequate for the altered circumstances before any addition or alteration is made. Section B is where you evidence that you checked. Ticking the earthing system and leaving the main bonding and Zdb lines empty defeats the point of the section.',
                  ],
                  [
                    'Vague description of the work',
                    '"Fitted socket" or "added spur" is not a description. Record what was installed, where, on which circuit, the cable type and size, and the method of connection. Another electrician should be able to find and verify the work from the certificate alone.',
                  ],
                  [
                    'Not recording the protective device',
                    'Without the BS (EN) number, type and rating from Section C, the Zs figure in Section D cannot be assessed at all. The same measured value passes on one device and fails on another.',
                  ],
                  [
                    'Using a pre-Amendment 4 form',
                    'Amendment 4 added SPD and AFDD fields to the model forms and deleted Table 3A of Appendix 3. An old pad of forms will have nowhere to record the SPD or AFDD, and may still print a 5× RCD column that no longer exists.',
                  ],
                  [
                    'Not issuing the certificate to the client',
                    'The certificate goes to the person ordering the work, with the guidance for recipients appended, and the issuer retains a duplicate. Completing a certificate and filing it in your own records only does not meet the requirement.',
                  ],
                ].map(([title, body]) => (
                  <div key={title} className={cardCn}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                      <div>
                        <h3 className="mb-1 font-bold text-white">{title}</h3>
                        <p className="text-sm leading-relaxed text-white">{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ),
        },
      ]}
      howToHeading="How to Fill In a Minor Works Certificate — Step by Step"
      howToDescription="Each step maps to a lettered section of the model Minor Electrical Installation Works Certificate in BS 7671:2018+A4:2026 Appendix 6."
      howToSteps={[
        {
          name: 'Section A — describe the minor works',
          text: 'Record the date the work was completed, the client, the installation address and a specific description of the work: what was installed, where, on which circuit, the cable type and size, and the method of connection. Record any departure from BS 7671 (Regulations 120.3, 133.1.2, 133.1.3 and 133.5), any permitted exception under Regulation 411.3.3 with the risk assessment attached, and any defect observed in the existing installation (Regulation 644.1.2).',
        },
        {
          name: 'Section B — confirm earthing and bonding',
          text: 'Tick the system earthing arrangement (TN-S, TN-C-S PME, TN-C-S PNE, TT, TN-C or IT), record the earth fault loop impedance at the distribution board supplying the final circuit, and confirm the presence and adequacy of the earthing conductor and the main protective bonding conductors to water, gas, oil, structural steel or other services. Regulation 132.16 requires this to be adequate for the altered circumstances.',
        },
        {
          name: 'Section C — record the circuit details',
          text: 'Enter the distribution board reference, location and type, the circuit number and description, the live conductor and cpc sizes in mm², and the reference method from Table 4A2 of Appendix 4. Record the overcurrent protective device BS (EN) number, type, rating and breaking capacity, and the details of any RCD, SPD or AFDD protecting the circuit.',
        },
        {
          name: 'Section D — carry out and record the tests',
          text: 'Carry out the tests of Regulations 643.2 to 643.6 in that order before energising. Record protective conductor continuity (R1+R2 or R2 in ohms), ring final circuit continuity where applicable, insulation resistance with the test voltage used (500 V DC and a minimum of 1.0 MΩ for circuits up to 500 V, per Table 64), polarity, the maximum measured Zs, and the RCD disconnection time at the rated residual operating current IΔn — 300 ms maximum for a general non-delay type under Regulation 643.8. Confirm SPD functionality and AFDD test button operation where fitted. Use a calibrated multifunction tester.',
        },
        {
          name: 'Section E — complete the declaration and sign',
          text: 'Enter your name, the company you are signing for, the business address, your position and the date, and fill in the amendment date as Amendment 4:2026. Sign or otherwise authenticate the certificate. Under Regulation 644.5 the person signing must be a skilled person competent to verify that the requirements of BS 7671 have been met.',
        },
        {
          name: 'Issue the certificate to the person ordering the work',
          text: 'Give the original certificate, with the guidance for recipients appended, to the person who ordered the work, and retain a duplicate. Regulation 644.4.202 confirms certificates may be issued in written or electronic form provided their authenticity and integrity can be verified, so a PDF emailed before you leave site is acceptable.',
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between a Minor Works Certificate and an EIC?',
          answer:
            'The Minor Electrical Installation Works Certificate covers an addition or alteration to one existing circuit. Regulation 644.4.201 permits it only where the work includes no new circuit and no replacement of a distribution board or consumer unit, and one certificate is issued for each circuit added to or altered. The Electrical Installation Certificate covers new installations, new circuits, rewires and consumer unit or distribution board replacements, and can also be used where there are multiple additions or alterations that do not extend to new circuits, as an alternative to issuing several Minor Works Certificates. The EIC separates responsibility for design, construction, and inspection and testing, and carries full schedules of inspection, circuit details and test results; the Minor Works Certificate has a single declaration and records results for the one circuit worked on.',
        },
        {
          question: 'How many sections does a Minor Works Certificate have?',
          answer:
            'The model form in Appendix 6 of BS 7671:2018+A4:2026 has five lettered sections. Section A is the description of the minor works, including the date, the client, the address, any departures, any permitted exceptions under Regulation 411.3.3 and any defects observed in the existing installation. Section B covers the presence and adequacy of the earthing and bonding arrangements. Section C covers the circuit details, including conductor sizes, reference method and the protective devices. Section D covers the test results for the altered or extended circuit. Section E is the declaration and signature. Amendment 4 added fields for recording SPD and AFDD details.',
        },
        {
          question: 'Which conductor sizes go on a Minor Works Certificate?',
          answer:
            'Section C of the model form asks for the sizes of conductors for the circuit that was altered or extended: the live conductor in mm² and the circuit protective conductor in mm². Both figures are required. For a typical domestic ring final circuit in flat twin and earth that would be 2.5 mm² live and 1.5 mm² cpc; for a lighting circuit, commonly 1.5 mm² live and 1.0 mm² cpc. Record the sizes of the existing circuit conductors, not just the cable you added, and complete the reference method field alongside them — the model form points to Table 4A2 of Appendix 4 for that.',
        },
        {
          question: 'Can I use a Minor Works Certificate for a consumer unit change?',
          answer:
            'No. Regulation 644.4.201 permits a Minor Works Certificate only where the work does not include the provision of a new circuit or the replacement of a distribution board or consumer unit, and Regulation 644.1 expressly requires an Electrical Installation Certificate on completion of work that includes the replacement of a distribution board or consumer unit. The notes printed with the model form say the same thing: it may be used for replacing accessories or luminaires, but not for replacing consumer units, distribution boards or similar items. That applies across the UK. Separately, in England and Wales a consumer unit replacement is notifiable under Part P of the Building Regulations.',
        },
        {
          question: 'Is a Minor Works Certificate a legal requirement?',
          answer:
            'BS 7671 is a British Standard rather than legislation, but Part 6 requires certification. Regulation 644.1 requires an Electrical Installation Certificate for an addition or alteration to an existing installation, and Regulation 644.4.201 allows a Minor Electrical Installation Works Certificate in its place where the work includes no new circuit and no distribution board or consumer unit replacement. So a certificate of some kind is required either way. Compliance with BS 7671 is the accepted benchmark for safe electrical work in the UK and is referenced by the Building Regulations, and competent person schemes require their members to certify all work. In practice, issuing no certificate leaves you with no documented evidence that the work was inspected, tested and found compliant.',
        },
        {
          question: 'How many Minor Works Certificates can I issue for one job?',
          answer:
            'Regulation 644.4.201 allows one certificate for each circuit that has been added to or altered, and Guidance Note 3 puts it plainly: several minor works carried out on a single existing circuit may be covered by one certificate, but where more than one circuit is modified, a separate certificate is issued for each. So adding a socket on the kitchen ring and a spur on the first floor lighting circuit means two certificates. Where a job produces a large number of them, the Appendix 6 notes allow an Electrical Installation Certificate to be used instead to certify multiple additions or alterations that do not extend to new circuits.',
        },
        {
          question: 'Do I need to record test instrument details on a Minor Works Certificate?',
          answer:
            'The Appendix 6 model form does not include instrument fields, but Regulation 643.1 requires measuring instruments to be chosen in accordance with the relevant parts of BS EN 61557, and Regulation 643.8 names BS EN 61557-6 specifically for RCD testing. Guidance Note 3 requires the type and frequency of recalibration or checking to be recorded. Many competent person schemes ask for the make, model, serial number and calibration date on the certificate itself; others accept it in your records. Either way, keep it, because the validity of every result on the form depends on the instrument being in calibration.',
        },
        {
          question: 'Can I fill in a Minor Works Certificate digitally?',
          answer:
            'Yes. Regulation 644.4.202 states that Electrical Installation Certificates and Minor Electrical Installation Works Certificates may be produced in any written or electronic form, provided that their authenticity and integrity are verified by a reliable process or method, and that the process also verifies any copy is a true copy of the original. Elec-Mate provides the full Minor Works Certificate on your phone or tablet: site and client details are auto-filled, test results are checked against BS 7671 as you enter them, the signature is captured on screen, and the certificate exports as a PDF with the guidance for recipients appended, ready to send before you leave site.',
        },
      ]}
      relatedPages={[
        {
          href: '/minor-works-certificate',
          title: 'Minor Works Certificate',
          description: 'The certificate format and when it applies.',
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
          href: '/guides/insulation-resistance-testing-bs7671',
          title: 'Insulation Resistance Testing',
          description: 'Test voltages, minimum values and the 250 V DC re-test.',
          icon: Zap,
          category: 'Testing',
        },
        {
          href: '/guides/testing-sequence-guide',
          title: 'Testing Sequence Guide',
          description: 'The correct order of tests for initial verification.',
          icon: ListOrdered,
          category: 'Testing',
        },
        {
          href: '/guides/bs-7671-observation-codes',
          title: 'BS 7671 Observation Codes',
          description: 'C1, C2, C3 and FI classification codes explained.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Fill In Minor Works Certificates in Minutes"
      ctaSubheading="Sections A to E on your phone, auto-filled site details, BS 7671 test validation, digital signatures and instant PDF export. Join 1,600+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
