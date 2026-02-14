import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ClipboardCheck, FileCheck2, ShieldCheck, Zap, FileText, Camera, Eye } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'EICR Schedule of Inspections | What to Check';
const PAGE_DESCRIPTION =
  'Complete guide to the EICR schedule of inspections per BS 7671 Appendix 6. Distribution equipment, wiring systems, current-using equipment, protective measures, isolation and switching. What each item means, common C2/C3 observations, and inspection tips.';

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Schedule of Inspections', href: '/guides/eicr-schedule-of-inspections' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'distribution-equipment', label: 'Section 1: Distribution Equipment' },
  { id: 'wiring-systems', label: 'Section 2: Wiring Systems' },
  { id: 'current-using-equipment', label: 'Section 3: Current-Using Equipment' },
  { id: 'protective-measures', label: 'Section 4: Protective Measures' },
  { id: 'isolation-switching', label: 'Section 5: Isolation & Switching' },
  { id: 'miscellaneous', label: 'Section 6: Miscellaneous' },
  { id: 'common-observations', label: 'Common Observations' },
  { id: 'inspection-tips', label: 'Tips for Thorough Inspection' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The EICR schedule of inspections follows the BS 7671 Appendix 6 model form and covers six main sections: distribution equipment, wiring systems, current-using equipment, protective measures, isolation and switching, and miscellaneous items.',
  'Each item in the schedule is marked as satisfactory (tick), unsatisfactory (cross), not applicable (N/A), or limitation (LIM) — every item must be addressed and none should be left blank.',
  'Common C2 observations include missing CPCs, absent RCD protection where required, damaged consumer unit enclosures, and lack of main protective bonding to services.',
  'Common C3 observations include absence of SPD protection, old wiring colours not re-identified, and lack of circuit charts at the distribution board.',
  'Elec-Mate has the complete Schedule of Inspections built into the EICR form matching BS 7671 Appendix 6 — tick items as you walk the installation, and any unticked items are flagged before you can complete the certificate.',
];

const faqs = [
  {
    question: 'What is the EICR schedule of inspections?',
    answer:
      'The EICR schedule of inspections is a structured checklist that forms part of the Electrical Installation Condition Report (EICR) as defined in BS 7671 Appendix 6. It lists all the items that must be visually inspected during a periodic inspection of an electrical installation. The schedule is divided into sections covering distribution equipment, wiring systems, current-using equipment, protective measures, isolation and switching, and miscellaneous items. For each item, the inspector records whether it is satisfactory, unsatisfactory, not applicable, or subject to a limitation. The schedule of inspections is separate from the schedule of test results — the inspection covers visual checks that do not require test instruments, while the test results cover electrical measurements such as continuity, insulation resistance, earth fault loop impedance, and RCD operating times.',
  },
  {
    question: 'Do I need to check every item on the schedule of inspections?',
    answer:
      'Yes. Every item on the schedule of inspections must be addressed. You should not leave any items blank. For each item, record one of the following: a tick (satisfactory), a cross (unsatisfactory — which should then be recorded as an observation with a classification code), N/A (not applicable — for example, if there is no three-phase equipment in a single-phase domestic installation), or LIM (limitation — if you were unable to inspect that item due to access restrictions, concealed wiring, or other practical limitations). Leaving items blank on the schedule is one of the most common reasons for EICR rejection by competent person scheme providers. If an item does not apply to the installation, mark it N/A. If you could not inspect it, mark it LIM and record the limitation in the extent and limitations section of the report.',
  },
  {
    question:
      'What is the difference between the schedule of inspections and the schedule of test results?',
    answer:
      'The schedule of inspections covers visual inspection items — things you can check by looking at the installation without using test instruments. This includes the condition of the consumer unit, the condition of wiring, the presence of earthing and bonding, the condition of accessories, and the suitability of the installation for its environment. The schedule of test results covers electrical measurements made with calibrated test instruments — continuity of protective conductors (R1+R2), insulation resistance (in megohms), polarity, earth fault loop impedance (Zs in ohms), RCD operating times (in milliseconds), and prospective fault current. Both schedules are required parts of the EICR and must be completed for every inspection. The visual inspection is typically carried out first as a walk-through of the installation, followed by dead testing (continuity and insulation resistance) and then live testing (loop impedance, RCD, polarity).',
  },
  {
    question: 'What are the most common C2 observations found during visual inspection?',
    answer:
      'The most common C2 (Potentially Dangerous) observations found during the visual inspection phase of an EICR include: absence of a circuit protective conductor (CPC) on one or more circuits, particularly in older installations wired before earthing was mandatory; absence of RCD protection for socket outlet circuits (required by Regulation 411.3.3 for socket outlets up to 32A in domestic premises); damaged consumer unit or distribution board enclosure exposing live parts; absence of main protective bonding to gas, water, or oil services as required by Regulation 411.3.1.2; incorrect polarity at accessories (live and neutral reversed); damaged or deteriorated cable insulation exposing conductors; and absence of fire barriers where cables pass through walls or floors. Each of these observations represents a condition that could lead to electric shock or fire and requires urgent remedial action.',
  },
  {
    question: 'How do I record an unsatisfactory item on the schedule of inspections?',
    answer:
      'When you find an item on the schedule of inspections that is unsatisfactory, you should mark the item with a cross on the schedule. You must then record the deficiency as an observation in the observations section of the EICR, with a description of the issue, its location, and the appropriate classification code (C1, C2, C3, or FI). The description should be specific enough that a different electrician could locate and rectify the issue from your description alone. For example, rather than writing "bonding missing," write "Main protective bonding to incoming water service absent at point of entry, utility cupboard under stairs — Regulation 411.3.1.2." Include the relevant BS 7671 regulation reference where applicable. The classification code should reflect the severity of the risk: C1 for immediate danger, C2 for potentially dangerous conditions, C3 for improvements recommended, or FI if further investigation is needed to determine the classification.',
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
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <p>
          The schedule is divided into six main sections, each covering a different aspect of the
          installation. Every item must be addressed — satisfactory, unsatisfactory, not applicable,
          or limitation. Unsatisfactory items must be recorded as observations with the appropriate{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            classification code
          </SEOInternalLink>{' '}
          (C1, C2, C3, or FI).
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
          description="Elec-Mate has the full BS 7671 Appendix 6 Schedule of Inspections built into the EICR form. Tick items as you walk the installation. Any unticked items are flagged. Board scanner pre-populates distribution board details from a photo."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'distribution-equipment',
    heading: 'Section 1: Distribution Equipment',
    content: (
      <>
        <p>
          Section 1 of the schedule covers the condition and compliance of the distribution
          equipment — consumer units, distribution boards, main switches, RCDs, RCBOs, MCBs, fuses,
          and SPDs. This is typically the starting point of the visual inspection because the
          distribution board is the heart of the installation.
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
                arrangement? (Regulation 514.9.1)
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
                (Regulation 443), are they present and in good condition? Check the status indicator
                on the SPD if fitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD quarterly test notice:</strong> Is the notice advising the user to test
                the RCD quarterly present? (Regulation 514.12.2)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common C2 observations in this section include:{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>{' '}
          with a combustible (plastic) enclosure in a domestic premises where Regulation 421.1.201
          requires non-combustible enclosure (applicable since 1 January 2016), missing or damaged
          covers exposing live busbars, and absence of circuit identification.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-systems',
    heading: 'Section 2: Wiring Systems',
    content: (
      <>
        <p>
          Section 2 covers the condition of the wiring systems throughout the installation — cables,
          containment (trunking, conduit, cable tray), cable supports, and the routing of cables
          through the building.
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
                walls (Regulation 522.6.101)? Any evidence of cables being routed through thermal
                insulation without derating?
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
    heading: 'Section 3: Current-Using Equipment',
    content: (
      <>
        <p>
          Section 3 covers the condition of the fixed current-using equipment connected to the
          installation — socket outlets, light fittings, switches, cooker outlets, shaver supply
          units, immersion heaters, fixed appliances, and other accessories.
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
    heading: 'Section 4: Protective Measures',
    content: (
      <>
        <p>
          Section 4 is critically important — it covers the protective measures that prevent
          electric shock and fire. This section checks that the installation has adequate protection
          for the people using it and for the building itself.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding:</strong> Are main protective bonding conductors
                connected to incoming water, gas, oil, and other metallic services as required by
                Regulation 411.3.1.2? Check at the point of entry of each service. Verify conductor
                size (minimum 10mm2 for PME, 6mm2 for TN-S, varies for TT).
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
                <strong>RCD protection:</strong> Are RCDs (30mA) fitted to circuits that require
                additional protection? Socket outlet circuits up to 32A (Regulation 411.3.3),
                bathroom circuits (Section 701), outdoor circuits, and circuits supplying mobile
                equipment used outdoors.
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
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangements guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'isolation-switching',
    heading: 'Section 5: Isolation and Switching',
    content: (
      <>
        <p>
          Section 5 covers the means of isolation and switching — the switches, isolators, and
          disconnecting devices that allow the installation or individual circuits to be safely
          disconnected for maintenance, fault finding, or emergency purposes.
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
                <strong>Fireman's switch:</strong> Where required (for example, for exterior
                luminous signs above 230V or high-voltage discharge lighting installations), is the
                fireman's switch present, correctly positioned, and clearly labelled in red?
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'miscellaneous',
    heading: 'Section 6: Miscellaneous',
    content: (
      <>
        <p>
          Section 6 covers items that do not fit neatly into the other five sections but are
          important for the overall assessment of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Items to Check</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning and caution labels:</strong> Are all required warning labels
                present? This includes RCD quarterly test notices (Regulation 514.12.2), dual supply
                warnings (where applicable), voltage warnings, and labels indicating the type of
                earthing system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diagrams and documentation:</strong> Are circuit diagrams, schedules, and
                as-installed drawings available and up to date? (Regulation 514.9.1 requires that a
                durable circuit chart or schedule is provided at or near each distribution board.)
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
                installed (such as RCD protection for socket outlets or AFDDs), has it been assessed
                and recorded?
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
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Common C2 Observations</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Missing CPC on one or more circuits (older installations)</li>
              <li>Absent main protective bonding to water, gas, or oil services</li>
              <li>No RCD protection on socket outlet circuits up to 32A</li>
              <li>Damaged consumer unit enclosure with exposed live parts</li>
              <li>Inadequate earthing conductor (undersized or damaged)</li>
              <li>Reversed polarity at socket outlets or light fittings</li>
              <li>Exposed live conductors accessible to the user</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Common C3 Observations</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Absence of SPD protection (Regulation 443 requirements)</li>
              <li>Old wiring colours (red/black) not re-identified at the distribution board</li>
              <li>No circuit chart or schedule at the distribution board</li>
              <li>Absence of RCD quarterly test notice</li>
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
          description="Point your phone camera at any distribution board and Elec-Mate's AI board scanner reads MCB ratings, circuit designations, and board layout from the photo. The data populates the EICR automatically — saving you 15 to 20 minutes of data entry per board."
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
    href: '/guides/how-to-fill-in-eicr',
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
    description: 'Complete guide to BS 7671:2018+A3:2024 and the Appendix 6 model forms.',
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
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Inspection Guide"
      badgeIcon={Eye}
      heroTitle={
        <>
          EICR Schedule of Inspections: <span className="text-yellow-400">What to Check</span>
        </>
      }
      heroSubtitle="The complete guide to the EICR schedule of inspections per BS 7671 Appendix 6. Every section explained — distribution equipment, wiring systems, current-using equipment, protective measures, isolation and switching, and miscellaneous items. Common C2 and C3 observations for each section, plus practical tips for a thorough visual inspection."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Schedule of Inspections Built Into the App"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICRs with the full BS 7671 Appendix 6 schedule of inspections. Tick items as you walk the installation. Board scanner pre-populates board details. 7-day free trial."
    />
  );
}
