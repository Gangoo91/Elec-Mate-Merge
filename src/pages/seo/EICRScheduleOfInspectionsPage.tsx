import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ClipboardCheck, FileCheck2, ShieldCheck, Zap, FileText, Camera, Eye } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Schedule of Inspections: All 8 EICR Sections';
const PAGE_DESCRIPTION =
  "BS 7671 Appendix 6 schedule of inspections: the residential form runs 8 sections, 1.0 intake equipment to 8.0 prosumer's LV. No item may be left blank.";

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Schedule of Inspections', href: '/guides/eicr-schedule-of-inspections' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'distribution-equipment', label: 'Distribution Equipment' },
  { id: 'wiring-systems', label: 'Wiring Systems' },
  { id: 'current-using-equipment', label: 'Current-Using Equipment' },
  { id: 'protective-measures', label: 'Earthing, Bonding & Protective Measures' },
  { id: 'isolation-switching', label: 'Isolation & Switching' },
  { id: 'miscellaneous', label: 'Labelling, Notices & Documentation' },
  { id: 'common-observations', label: 'Common Observations' },
  { id: 'inspection-tips', label: 'Tips for Thorough Inspection' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The EICR schedule of inspections follows the BS 7671 Appendix 6 model form. The Condition Report Schedule of Inspection for residential and similar premises with up to a 100 A supply runs 1.0 intake equipment (visual only), 2.0 arrangements for other sources such as microgenerators, 3.0 earthing/bonding arrangements, 4.0 consumer unit(s)/distribution board(s), 5.0 distribution/final circuits, 6.0 location(s) containing a bath or shower, 7.0 other Part 7 special installations or locations, and 8.0 prosumer’s low voltage electrical installation(s).',
  'The outcome boxes on the Appendix 6 form are: acceptable condition (tick), unacceptable condition (C1 or C2), improvement recommended (C3), further investigation (FI), not verified (NV), limitation (LIM), and not applicable (N/A) — every item must be addressed and none should be left blank.',
  'Common C2 observations include missing CPCs, absent RCD protection where required, damaged consumer unit enclosures, and lack of main protective bonding to services.',
  'Common C3 observations include absence of SPD protection, old wiring colours not re-identified, and lack of circuit charts at the distribution board.',
  'Elec-Mate has the complete Schedule of Inspections built into the EICR form matching BS 7671 Appendix 6 — tick items as you walk the installation, and any unticked items are flagged before you can complete the certificate.',
  'Two requirements that older installations commonly fail: Reg 411.3.4 (in force since BS 7671:2018) requires 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic premises; Reg 421.1.7 requires AFDDs on single-phase AC final circuits supplying socket-outlets not exceeding 32 A in high rise residential buildings, HMOs, purpose-built student accommodation and care homes, and only recommends them for all other premises. Both are codeable observations on a domestic EICR.',
];

const faqs = [
  {
    question: 'What is the EICR schedule of inspections?',
    answer:
      'The EICR schedule of inspections is a structured checklist that forms part of the Electrical Installation Condition Report (EICR) as defined in BS 7671 Appendix 6. It lists all the items that must be visually inspected during a periodic inspection of an electrical installation. On the Appendix 6 Condition Report Schedule of Inspection for residential and similar premises with up to a 100 A supply, the sections are 1.0 intake equipment (visual inspection only), 2.0 presence of adequate arrangements for other sources such as microgenerators, 3.0 earthing/bonding arrangements, 4.0 consumer unit(s)/distribution board(s), 5.0 distribution/final circuits, 6.0 location(s) containing a bath or shower, 7.0 other Part 7 special installations or locations, and 8.0 prosumer’s low voltage electrical installation(s). The larger version of the form adds separate headings for other methods of protection, distribution circuits, final circuits, isolation and switching, and current-using equipment (permanently connected). For each item, the inspector records the outcome using the codes printed on the form: acceptable condition, C1, C2, C3, FI, NV (not verified), LIM (limitation) or N/A. The schedule of inspections is separate from the schedule of test results — the inspection covers visual checks that do not require test instruments, while the test results cover electrical measurements such as continuity, insulation resistance, earth fault loop impedance, and RCD operating times.',
  },
  {
    question: 'Do I need to check every item on the schedule of inspections?',
    answer:
      'Yes. Every item on the schedule of inspections must be addressed. You should not leave any items blank. The Appendix 6 form prints the permitted outcomes at the top of every page, and you record one of them against each item: a tick (acceptable condition); C1 or C2 (unacceptable condition — which must also be recorded as an observation in Section K of the report); C3 (improvement recommended); FI (further investigation); NV (not verified); N/A (not applicable — for example, if the installation contains no bath or shower); or LIM (limitation — if you were unable to inspect that item due to access restrictions, concealed wiring, or other practical limitations). Note that C3 and FI are advisory: BS 7671 states they do not affect the overall assessment of the installation. Leaving items blank on the schedule is one of the most common reasons for EICR rejection by competent person scheme providers. If an item does not apply to the installation, mark it N/A. If you could not inspect it, mark it LIM and record the limitation in the extent and limitations section of the report.',
  },
  {
    question:
      'What is the difference between the schedule of inspections and the schedule of test results?',
    answer:
      'The schedule of inspections covers visual inspection items — things you can check by looking at the installation without using test instruments. This includes the condition of the consumer unit, the condition of wiring, the presence of earthing and bonding, the condition of accessories, and the suitability of the installation for its environment. The schedule of test results covers electrical measurements made with calibrated test instruments — continuity of protective conductors (R1+R2), insulation resistance (in megohms), polarity, earth fault loop impedance (Zs in ohms), RCD operating times (in milliseconds), and prospective fault current. Both schedules are required parts of the EICR and must be completed for every inspection. The visual inspection is typically carried out first as a walk-through of the installation, followed by dead testing — continuity, insulation resistance and polarity, which Regulation 643.6 requires to be verified before the installation is energised — and then live testing (earth fault loop impedance, prospective fault current and RCD operation).',
  },
  {
    question: 'What are the most common C2 observations found during visual inspection?',
    answer:
      'The most common C2 (Potentially Dangerous) observations found during the visual inspection phase of an EICR include: absence of a circuit protective conductor (CPC) on one or more circuits, particularly in older installations wired before earthing was mandatory; absence of RCD protection for socket outlet circuits in domestic premises; damaged consumer unit or distribution board enclosure exposing live parts; absence of main protective bonding to gas, water, or oil services (Regulation 411.3.1.2 requires extraneous-conductive-parts liable to introduce a dangerous potential difference to be connected to the main earthing terminal; Regulation 544.1.1 governs bonding conductor sizing); absence of 30 mA RCD additional protection on AC final circuits supplying luminaires in domestic premises, required by Regulation 411.3.4; incorrect polarity at accessories (live and neutral reversed); damaged or deteriorated cable insulation exposing conductors; and absence of fire barriers where cables pass through walls or floors. Each of these observations represents a condition that could lead to electric shock or fire and requires urgent remedial action.',
  },
  {
    question: 'How do I record an unsatisfactory item on the schedule of inspections?',
    answer:
      'When you find an item on the schedule of inspections that is unacceptable, you enter the classification code against that item on the schedule — C1, C2, C3 or FI — rather than a plain cross. You must then record the deficiency as an observation in the observations section of the EICR, with a description of the issue, its location, and the same classification code. The description should be specific enough that a different electrician could locate and rectify the issue from your description alone. For example, rather than writing "bonding missing," write "Main protective bonding to incoming water service absent at point of entry, utility cupboard under stairs — Regulation 411.3.1.2 / 544.1.1." Include the relevant BS 7671 regulation reference where applicable. The classification code should reflect the severity of the risk: C1 for immediate danger, C2 for potentially dangerous conditions, C3 for improvements recommended, or FI if further investigation is needed to determine the classification.',
  },
  {
    question: 'Can I use the Elec-Mate app for the schedule of inspections on site?',
    answer:
      'Yes. Elec-Mate has the complete Schedule of Inspections built into the EICR form, matching the BS 7671 Appendix 6 model form exactly. Every section and every item is listed. As you walk the installation, you tick items as satisfactory, cross them as unsatisfactory, or mark them as N/A or LIM. If you mark an item as unsatisfactory, the app prompts you to add an observation with a classification code and description. Any items left unaddressed are flagged before you can complete the certificate, so nothing gets missed. The board scanner feature can also pre-populate distribution board details — MCB ratings, circuit designations, and board layout — from a photograph of the board, saving significant data entry time. All data saves automatically to your phone and syncs to the cloud, so nothing is lost even if your battery dies or you lose signal.',
  },
  {
    question: 'What should I do if I cannot access an area to inspect it?',
    answer:
      'If you cannot access an area of the installation — for example, because of furniture blocking access to socket outlets, stored goods preventing access to a distribution board, locked rooms, or areas that would require destructive investigation to inspect — you should record the limitation in two places. First, mark the relevant items on the schedule of inspections as LIM (limitation). Second, record the limitation in the extent and limitations section of the EICR with a clear description of what could not be inspected and why. Be specific: "Socket outlets in bedroom 2 not inspected — room inaccessible due to locked door, key not available" is much better than "some areas not accessed." If the limitation is significant enough that it prevents you from making an overall assessment of the installation, you should state this clearly and may need to classify the limitation as FI (Further Investigation required) so that the client understands the inspection was incomplete.',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'EICR Schedule of Inspections: Overview',
    content: (
      <>
        <p>
          The schedule of inspections is one of the core components of an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>. It is the
          structured checklist of visual inspection items that the inspector must work through
          during a periodic inspection of an electrical installation. The schedule follows the model
          form published in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          .
        </p>
        <p>
          On the Appendix 6 Condition Report Schedule of Inspection for residential and similar
          premises with up to a 100 A supply, the sections are 1.0 intake equipment (visual
          inspection only), 2.0 presence of adequate arrangements for other sources such as
          microgenerators, 3.0 earthing/bonding arrangements, 4.0 consumer unit(s)/distribution
          board(s), 5.0 distribution/final circuits, 6.0 location(s) containing a bath or shower,
          7.0 other Part 7 special installations or locations, and 8.0 prosumer&rsquo;s low voltage
          electrical installation(s). The larger version of the form breaks the same ground into
          more headings, adding other methods of protection, distribution circuits, final circuits,
          isolation and switching, and current-using equipment (permanently connected). BS 7671
          notes that the schedule is not exhaustive and may be reduced or expanded to suit the
          installation. The walk-through below groups those items the way most inspectors work
          through a property rather than following the form line by line.
        </p>
        <p>
          Every item must be addressed. The outcome boxes printed on the form are acceptable
          condition (tick), unacceptable condition (C1 or C2), improvement recommended (C3), further
          investigation (FI), not verified (NV), limitation (LIM) and not applicable (N/A). Items
          coded C1, C2, C3 or FI must also be recorded as observations with the appropriate{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            classification code
          </SEOInternalLink>
          . C3 and FI are advisory and do not affect the overall assessment.
        </p>
        <p>
          The visual inspection is typically the first phase of the periodic inspection process.
          Before any testing is carried out, the inspector walks the installation, checking every
          item on the schedule. This walk-through identifies visible defects, damage, deterioration,
          and departures from the standard. The findings from the visual inspection inform the
          subsequent testing strategy — for example, if the visual inspection reveals a missing CPC
          on a circuit, the inspector will prioritise testing on that circuit.
        </p>
        <SEOAppBridge
          title="Complete Schedule of Inspections in the app"
          description="Elec-Mate has the full BS 7671 Appendix 6 Schedule of Inspections built into the EICR form. Tick items as you walk the installation."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'distribution-equipment',
    heading: 'Distribution Equipment: Consumer Units and Boards',
    content: (
      <>
        <p>
          On the Appendix 6 form this is item 4.0, consumer unit(s)/distribution board(s). It covers
          the condition and compliance of the distribution equipment — consumer units, distribution
          boards, main switches, RCDs, RCBOs, MCBs, fuses, and SPDs. This is typically the starting
          point of the visual inspection because the distribution board is the heart of the
          installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition of enclosure:</strong> Is the consumer unit or distribution board
                in good physical condition? No cracks, burn marks, missing covers, or damage. For
                domestic premises, is it a non-combustible (metal) enclosure as required by
                Regulation 421.1.201?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security of fixing:</strong> Is the board securely fixed to the wall? Are
                all fixings present and tight?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit identification:</strong> Are all circuits clearly identified with a
                circuit chart or schedule? Does the chart correspond to the actual circuit
                arrangement? (Regulation 514.9.1 — note the exception: the requirement need not be
                applied for domestic (household) premises or similar installations where an initial
                verification certificate or an EICR, complete with the guidance for recipients, has
                been issued to the person ordering the work. Check applicability before coding
                absent charts in domestic installations.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adequacy of access:</strong> Can the consumer unit or distribution board be
                accessed safely? Is there adequate working space in front of the board?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Presence of SPDs:</strong> For installations where SPDs are required
                (Section 443), are they present and in good condition? Check the status indicator on
                the SPD if fitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDDs (arc fault detection devices):</strong> Regulation 421.1.7 requires
                AFDDs to BS EN 62606 on single-phase AC final circuits supplying socket-outlets
                rated not exceeding 32 A in high rise residential buildings, houses in multiple
                occupation, purpose-built student accommodation and care homes. For all other
                premises the same regulation only <em>recommends</em> them, so absence in an
                ordinary dwelling is typically coded C3 at most. On the Appendix 6 form the item is
                &ldquo;Confirmation of indication that AFDD(s) are operational&rdquo; (421.1.7;
                532.6; 651.2(e)).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD six-monthly test notice:</strong> Is the notice advising the user to
                test the RCD six-monthly by pressing the test button present? The Appendix 6 form
                item reads &ldquo;Presence of RCD six-monthly test notice, where required&rdquo;
                (Regulation 514.12.2). Note the exception: the requirement need not be applied for
                domestic (household) premises or similar installations where an initial verification
                certificate or an EICR, complete with the guidance for recipients, has been issued
                to the person ordering the work — verify whether it applies before coding absence in
                a domestic installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The classic C2 in this section is missing or damaged covers exposing live busbars in the{' '}
          <SEOInternalLink href="/consumer-unit-regulations">consumer unit</SEOInternalLink>. A
          combustible (plastic) enclosure in domestic premises, and absence of circuit
          identification, are ordinarily improvement items (C3) rather than C2 — the notes for the
          person producing the report in Appendix 6 state that an installation designed to an
          earlier version of BS 7671, and which does not fully comply with the current version, is
          not necessarily unsafe for continued use or in need of upgrading. Regulation 421.1.201,
          which requires domestic consumer units to have a non-combustible enclosure or be enclosed
          in one, is not retrospective.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-systems',
    heading: 'Wiring Systems: Distribution and Final Circuits',
    content: (
      <>
        <p>
          Item 5.0 on the residential form, distribution/final circuits, covers the condition of the
          wiring systems throughout the installation — cables, containment (trunking, conduit, cable
          tray), cable supports, and the routing of cables through the building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable condition:</strong> Is the cable sheath intact and undamaged? Any
                signs of overheating, discolouration, or deterioration? Cable types such as older
                rubber-insulated or lead-sheathed cable require particular attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable supports and fixings:</strong> Are cables adequately supported at
                appropriate intervals? Are clips, cleats, and fixings secure? Are cables protected
                from mechanical damage where they run across surfaces?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing:</strong> Are cables routed in safe zones where concealed in
                walls? Any evidence of cables being routed through thermal insulation without
                derating?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Containment condition:</strong> Is trunking, conduit, and cable tray in good
                condition? Lids in place? No damage or corrosion? Adequate capacity (not
                overfilled)?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire barriers and seals:</strong> Are fire barriers present where cables
                pass through fire-rated walls, floors, or ceilings? (Regulation 527.2) This is a
                commonly missed item.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable identification:</strong> Are cables identified with appropriate
                markings? For pre-harmonised wiring colours (red/black), have they been
                re-identified where they terminate alongside harmonised colours (brown/blue)?
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'current-using-equipment',
    heading: 'Current-Using Equipment and Accessories',
    content: (
      <>
        <p>
          The current-using equipment (permanently connected) heading covers the condition of the
          fixed current-using equipment connected to the installation — socket outlets, light
          fittings, switches, cooker outlets, shaver supply units, immersion heaters, fixed
          appliances, and other accessories.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition of accessories:</strong> Are socket outlets, light switches,
                ceiling roses, and other accessories in good physical condition? No cracks, damage,
                discolouration, or burn marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security of mounting:</strong> Are all accessories securely mounted to the
                wall or surface? No loose fixings or accessories pulling away from the mounting
                surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suitability for environment:</strong> Are accessories appropriate for the
                environment? For example, IP-rated accessories in bathrooms (BS 7671 Section 701),
                weatherproof accessories for outdoor use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct connection:</strong> Where accessible without removing accessories
                from the wall, check for signs of incorrect connection — scorch marks indicating
                loose connections, signs of arcing, or overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enclosure integrity:</strong> Are all covers, lids, and bezels in place? No
                exposed live parts accessible to the user.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'protective-measures',
    heading: 'Earthing, Bonding and Protective Measures',
    content: (
      <>
        <p>
          Item 3.0 on the residential form, earthing/bonding arrangements, is critically important —
          with the additional-protection items in 4.0 and 5.0 it covers the protective measures that
          prevent electric shock and fire. This section checks that the installation has adequate
          protection for the people using it and for the building itself.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding:</strong> Are main protective bonding conductors
                connected to incoming water, gas, oil, and other metallic services? Regulation
                411.3.1.2 requires extraneous-conductive-parts liable to introduce a dangerous
                potential difference to be connected to the main earthing terminal (411.3.1.1 is
                protective earthing — the CPC requirement — not bonding); Regulation 544.1.1 governs
                bonding conductor sizing — under PME (TN-C-S), Table 54.8 sets the minimum at 10 mm²
                copper where the PEN conductor is 35 mm² or less. Check at the point of entry of
                each service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding:</strong> Where required (such as bathrooms under
                certain conditions), are supplementary bonding conductors present and correctly
                connected?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection — socket outlets and special locations:</strong> Are 30 mA
                RCDs fitted to circuits that require additional protection? This includes socket
                outlet circuits, bathroom circuits (Section 701), outdoor circuits, and circuits
                supplying mobile equipment used outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection — domestic lighting circuits:</strong> Regulation 411.3.4
                requires that, within domestic (household) premises, additional protection by an RCD
                with a rated residual operating current not exceeding 30 mA shall be provided for AC
                final circuits supplying luminaires. This has been in BS 7671 since the 2018
                edition, so a large number of older installations will not comply and it is a
                routinely codeable observation on a domestic EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangement:</strong> Is the earthing arrangement correct and
                appropriate? Verify the type (TN-S, TN-C-S, TT). For TT systems, is the earth
                electrode present and in good condition?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing conductor:</strong> Is the main earthing conductor present, of
                adequate size, correctly connected, and in good condition?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV/PELV systems:</strong> Where separated extra-low voltage or protective
                extra-low voltage systems are present, is the separation maintained?
              </span>
            </li>
          </ul>
        </div>
        <p>
          Missing main protective bonding is one of the most common and most serious findings during
          periodic inspection. It is almost always classified as C2 (Potentially Dangerous) because
          the absence of bonding means that metallic services could become live in the event of a
          fault, creating a shock risk. For guidance on earthing systems, see the{' '}
          <SEOInternalLink href="/guides/earthing-systems-tns-tncs-tt-explained">
            earthing arrangements guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'isolation-switching',
    heading: 'Isolation and Switching',
    content: (
      <>
        <p>
          The isolation and switching heading covers the means of isolation and switching — the
          switches, isolators, and disconnecting devices that allow the installation or individual
          circuits to be safely disconnected for maintenance, fault finding, or emergency purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch:</strong> Is there a readily accessible means of isolation for
                the entire installation? Is the main switch clearly identified? Can it be operated
                easily?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit isolation:</strong> Can each circuit be individually isolated at the
                distribution board? Are the isolating devices (MCBs, RCBOs) clearly labelled to
                identify the circuit they protect?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency switching:</strong> Where required (for example, immersion
                heaters, fixed space heaters, and some commercial equipment), are emergency
                switching devices present, accessible, and clearly identified?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional switching:</strong> Do local switches (light switches, cooker
                switches, fused connection units) operate correctly and provide the switching
                function intended?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Firefighter&rsquo;s switch:</strong> Regulation 537.4.2 requires one in the
                low-voltage circuit supplying outdoor lighting installations operating at a voltage
                exceeding low voltage, indoor discharge lighting installations operating at a
                voltage exceeding low voltage, and specific equipment in certain premises subject to
                the fire and rescue authority&rsquo;s requirements or to licensing conditions. It
                does not apply to a portable discharge lighting luminaire or a sign rated not more
                than 100 W supplied from an accessible socket-outlet. Where one is fitted, check it
                is easily visible and accessible (537.4.3) and marked with its ON and OFF positions
                and the words &ldquo;FIREFIGHTER&rsquo;S SWITCH&rdquo; or &ldquo;FIRE SWITCH&rdquo;
                in letters not less than 10 mm high (537.4.4).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'miscellaneous',
    heading: 'Labelling, Notices and Documentation',
    content: (
      <>
        <p>
          The labelling, notices and documentation items are spread across the form rather than
          gathered in one place, but they are important for the overall assessment of the
          installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning and caution labels:</strong> Are all required warning labels
                present? This includes the RCD six-monthly test notice (Regulation 514.12.2, subject
                to the domestic exception), the next-inspection recommendation notice (514.12.1,
                same exception), the alternative or additional supplies warning notice where
                applicable (514.15.1), voltage warning notices where a voltage exceeding 230 V to
                earth would not normally be expected (514.10.1), and the &ldquo;Safety Electrical
                Connection &ndash; Do Not Remove&rdquo; earthing and bonding labels (514.13.1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diagrams and documentation:</strong> Are circuit diagrams, schedules, and
                as-installed drawings available and up to date? (Regulation 514.9.1 requires a
                durable copy of the schedule relating to a distribution board to be provided within
                or adjacent to each distribution board, and any symbol used to comply with IEC 60617
                — subject to the same domestic exception as the notices above.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Presence of non-standard colours:</strong> If the installation contains
                pre-harmonised wiring colours (red and black), are they re-identified where they
                terminate alongside harmonised colours (brown and blue) at the distribution board?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Previous alterations:</strong> Is there evidence of previous alterations or
                additions? Are they of an acceptable standard? Have they been certificated?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional protection requirements:</strong> Where the current edition of BS
                7671 requires protection that was not required when the installation was originally
                installed (30 mA RCD protection for socket-outlets rated not exceeding 32 A per Reg
                411.3.3, 30 mA RCD protection for AC final circuits supplying luminaires in domestic
                premises per Reg 411.3.4, or AFDDs per Reg 421.1.7), has it been assessed and
                recorded? In an ordinary dwelling Reg 421.1.7 only recommends AFDDs, so absence is
                typically coded C3 at most; in a high rise residential building, HMO, purpose-built
                student accommodation or care home it is a requirement for socket-outlet circuits
                rated not exceeding 32 A.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-observations',
    heading: 'Common Observations by Section',
    content: (
      <>
        <p>
          Certain observations come up repeatedly during periodic inspections. Knowing the most
          common findings for each section helps you inspect more thoroughly and ensures you do not
          overlook frequently occurring defects.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white text-lg mb-2">Common C2 Observations</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Missing CPC on one or more circuits (older installations)</li>
              <li>
                Absent main protective bonding to water, gas, or oil services (Reg 411.3.1.2 /
                544.1.1)
              </li>
              <li>No RCD protection on socket-outlets rated up to 32 A (Reg 411.3.3)</li>
              <li>
                No 30 mA RCD on AC final circuits supplying luminaires in a dwelling (Reg 411.3.4)
              </li>
              <li>Damaged consumer unit enclosure with exposed live parts</li>
              <li>Inadequate earthing conductor (undersized or damaged)</li>
              <li>Reversed polarity at socket outlets or light fittings</li>
              <li>Exposed live conductors accessible to the user</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Common C3 Observations</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                Absence of AFDDs on socket-outlet circuits in an ordinary dwelling (Reg 421.1.7 —
                recommended, not required, outside HRRBs, HMOs, purpose-built student accommodation
                and care homes)
              </li>
              <li>Absence of SPD protection (Section 443 requirements)</li>
              <li>Old wiring colours (red/black) not re-identified at the distribution board</li>
              <li>No circuit chart or schedule at the distribution board (Reg 514.9.1)</li>
              <li>Absence of RCD six-monthly test notice (Reg 514.12.2)</li>
              <li>Consumer unit enclosure is combustible (plastic) in a domestic premises</li>
              <li>
                Supplementary bonding absent in bathroom (where no longer required if conditions
                met)
              </li>
              <li>Missing fire seals where cables pass through fire-rated construction</li>
            </ul>
          </div>
        </div>
        <p>
          It is worth noting that the classification of some observations depends on the specific
          circumstances. For example, a missing CPC is typically C2 because it represents a failure
          of the earth fault protection mechanism. However, if the circuit is protected by a 30mA
          RCD (which provides additional protection against electric shock independent of the
          earth), the risk is somewhat mitigated, though the observation would still normally be
          classified as C2 because the RCD is a secondary protection measure, not a substitute for a
          CPC.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-tips',
    heading: 'Tips for a Thorough Visual Inspection',
    content: (
      <>
        <p>
          A thorough visual inspection is the foundation of a good EICR. Once the visual inspection
          is complete, the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            correct testing sequence
          </SEOInternalLink>{' '}
          follows — dead tests first, then live tests. The following practical tips will help you
          carry out a systematic and comprehensive inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <ul className="space-y-3 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start at the origin:</strong> Begin at the supply intake and consumer unit,
                then work outwards through the installation room by room. This systematic approach
                ensures nothing is missed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a torch:</strong> Many consumer units and ceiling voids are poorly lit.
                A good torch reveals damage, discolouration, and defects that are invisible in
                ambient lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check every room:</strong> Do not skip rooms. Check every socket outlet,
                switch, light fitting, and visible cable in every room. If you cannot access a room,
                record the limitation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Look at the loft and under-stairs cupboard:</strong> These are common
                locations for junction boxes, cable runs, and bonding connections. They are also
                areas where DIY work is frequently found.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the meter cupboard:</strong> Verify the supply type, check the
                earthing arrangement at the cutout, and look at the condition of the meter tails.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record findings in real time:</strong> Do not rely on memory. Record
                observations as you find them using the Elec-Mate app or a notepad. Details that
                seem obvious on site become impossible to recall accurately after you have left.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Board scanner pre-populates the EICR"
          description="Point your phone camera at any distribution board and Elec-Mate's AI board scanner reads MCB ratings, circuit designations…"
          icon={Camera}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs with the full schedule of inspections built in.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3, and FI classification codes explained with examples.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A4:2026 and the Appendix 6 model forms.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct testing sequence for periodic inspection — dead tests first, then live.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'All 8 UK electrical certificate types — EICR, EIC, Minor Works, and more.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRScheduleOfInspectionsPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-15"
      dateModified="2026-08-06"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Inspection Guide"
      badgeIcon={Eye}
      heroTitle={
        <>
          EICR Schedule of Inspections: <span className="text-yellow-400">What to Check</span>
        </>
      }
      heroSubtitle="The complete guide to the EICR schedule of inspections per BS 7671 Appendix 6. Every part explained — intake equipment, earthing and bonding arrangements, consumer units and distribution boards, distribution and final circuits, isolation and switching, bath or shower locations and other special locations. Common C2 and C3 observations, plus practical tips for a thorough visual inspection."
      readingTime={12}
      answerBox={{
        question: 'What is the schedule of inspections on an EICR?',
        answer:
          'The schedule of inspections is the visual-inspection checklist that accompanies an EICR, based on the model forms in BS 7671 Appendix 6. It works through the installation section by section — intake equipment, arrangements for other sources such as microgenerators, earthing and bonding arrangements, consumer units and distribution boards, distribution and final circuits, locations containing a bath or shower, other Part 7 special locations, and prosumer’s low voltage installations — recording each item as an acceptable condition or noting a defect with a classification code (C1, C2, C3 or FI), or as NV, LIM or N/A. Every relevant item must be addressed before the report can be issued.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Schedule of Inspections Built Into the App"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for EICRs with the full BS 7671 Appendix 6 schedule of inspections. Tick items as you walk the installation. Board scanner pre-populates board details. 7-day free trial."
    />
  );
}
