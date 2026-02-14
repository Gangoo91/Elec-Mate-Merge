import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Palette,
  Cable,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Camera,
  ShieldCheck,
  ClipboardCheck,
  Zap,
} from 'lucide-react';

export default function WiringColoursUKPage() {
  return (
    <GuideTemplate
      title="Wiring Colours UK | Cable Colour Codes Explained"
      description="Complete guide to UK wiring colours. Current harmonised colours (brown, blue, green/yellow), old colours (red, black, green), three-phase identification, cable types, mixed-colour installations, and BS 7671 requirements for colour identification."
      datePublished="2025-04-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Wiring Colours UK', href: '/guides/wiring-colours-uk' },
      ]}
      tocItems={[
        { id: 'current-colours', label: 'Current Harmonised Colours' },
        { id: 'three-phase-colours', label: 'Three-Phase Colour Codes' },
        { id: 'old-colours', label: 'Old Pre-Harmonisation Colours' },
        { id: 'when-colours-changed', label: 'When the Colours Changed' },
        { id: 'mixed-colour-installations', label: 'Mixed-Colour Installations' },
        { id: 'cable-types', label: 'Cable Types and Their Colours' },
        { id: 'common-mistakes', label: 'Common Mistakes' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Essential Guide"
      badgeIcon={Palette}
      heroTitle={
        <>
          Wiring Colours UK
          <br />
          <span className="text-yellow-400">Cable Colour Codes Explained</span>
        </>
      }
      heroSubtitle="Every UK electrician needs to know wiring colours inside out. This guide covers current harmonised colours, old colours, three-phase identification, cable types, what to do with mixed-colour installations, and the BS 7671 requirements for conductor identification. Get it wrong and someone could die."
      readingTime={14}
      keyTakeaways={[
        'Current harmonised single-phase colours are brown (line), blue (neutral), and green/yellow (earth). These replaced the old red, black, and green colours from 2004/2006.',
        'Three-phase colours are brown (L1), black (L2), and grey (L3) — replacing the old red, yellow, and blue. The neutral is blue and earth is green/yellow.',
        'Mixed-colour installations (old and new colours present) require a warning notice at the consumer unit or distribution board per BS 7671 Regulation 514.14.1.',
        'During a rewire or partial rewire, all conductors must be correctly identified using the current harmonised colour scheme. Sleeving must be applied to the CPC in twin-and-earth cable.',
        'Elec-Mate certificates auto-reference the correct colour standards, and the AI board scanner identifies cable colours from site photos.',
      ]}
      sections={[
        {
          id: 'current-colours',
          heading: 'Current Harmonised Wiring Colours (Post-2006)',
          content: (
            <>
              <p>
                Since 2006, UK electrical installations have used the harmonised colour scheme that
                aligns with most European countries. The change was driven by the need to create a
                single standard across the European Union, eliminating confusion when electricians
                from different countries work on international projects. BS 7671 adopted these
                colours through Amendment 2 to the 16th Edition.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Single-Phase Conductor Colours
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-amber-700 border border-amber-600 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-sm">L</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Brown — Line (Live)</h4>
                      <p className="text-white text-sm">
                        The current-carrying conductor at 230V AC single-phase. This is the
                        dangerous conductor — always treat brown as live until proven dead.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-sm">N</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Blue — Neutral</h4>
                      <p className="text-white text-sm">
                        The return conductor. Although it carries the same current as the line, it
                        should be at or near zero volts relative to earth under normal conditions.
                        Never assume neutral is safe — test it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-green-600 border border-green-500 flex items-center justify-center shrink-0">
                      <span className="font-bold text-yellow-300 text-xs">E</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">
                        Green/Yellow — Earth (Protective Conductor)
                      </h4>
                      <p className="text-white text-sm">
                        The circuit protective conductor (CPC). Provides the fault current path back
                        to the source and must be continuous throughout the installation. In
                        twin-and-earth cable, this is the bare copper conductor that must be sleeved
                        green/yellow at all terminations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                These colours apply to all new installations, additions, and alterations. When
                working on any circuit installed after April 2006, these are the colours you should
                find. If a post-2006 installation uses the old colours, it is a defect that should
                be recorded on any inspection report.
              </p>
            </>
          ),
        },
        {
          id: 'three-phase-colours',
          heading: 'Three-Phase Colour Codes',
          content: (
            <>
              <p>
                Three-phase installations use a different set of line colours to distinguish between
                the three phases. Correct identification is critical because connecting equipment to
                the wrong phase — or getting the phase rotation wrong — can cause motors to run
                backwards, damage equipment, or create dangerous voltage imbalances.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Three-Phase Conductor Colours (Current)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-amber-700 border border-amber-600 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-xs">L1</span>
                    </div>
                    <span className="text-white font-bold">Brown — Phase 1 (L1)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-600 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-xs">L2</span>
                    </div>
                    <span className="text-white font-bold">Black — Phase 2 (L2)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-gray-500 border border-gray-400 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-xs">L3</span>
                    </div>
                    <span className="text-white font-bold">Grey — Phase 3 (L3)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 border border-blue-500 flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-xs">N</span>
                    </div>
                    <span className="text-white font-bold">Blue — Neutral</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-green-600 border border-green-500 flex items-center justify-center shrink-0">
                      <span className="font-bold text-yellow-300 text-xs">E</span>
                    </div>
                    <span className="text-white font-bold">Green/Yellow — Earth</span>
                  </div>
                </div>
              </div>
              <p>
                Note that black is used for L2 in the current three-phase scheme but was used for
                neutral in the old single-phase scheme. This is one of the most dangerous sources of
                confusion in mixed-age installations. An electrician working on a three-phase board
                in a building that also has old single-phase circuits could encounter black
                conductors that are live (three-phase L2) alongside black conductors that are
                neutral (old single-phase). The{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  warning notice requirement
                </SEOInternalLink>{' '}
                exists precisely for this reason.
              </p>
            </>
          ),
        },
        {
          id: 'old-colours',
          heading: 'Old Pre-Harmonisation Colours (Pre-2004)',
          content: (
            <>
              <p>
                Before the harmonised colour scheme was introduced, the UK used its own colour code
                for wiring that had been in place since the 1970s. Any installation carried out
                before April 2004 (or the transition period ending March 2006) will use these
                colours.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Old Single-Phase Colours</h3>
                  <ul className="space-y-3 text-white text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Red</strong> — Line (Live)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Black</strong> — Neutral
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Green (or bare copper)</strong> — Earth
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Old Three-Phase Colours</h3>
                  <ul className="space-y-3 text-white text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Red</strong> — Phase 1 (L1)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Yellow</strong> — Phase 2 (L2)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Blue</strong> — Phase 3 (L3)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Black</strong> — Neutral
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                The critical danger with old colours is the overlap between old and new schemes. Old
                three-phase used blue for L3 (a live conductor at 230V to neutral) — but in the new
                scheme blue is neutral. Old single-phase used black for neutral — but in the new
                three-phase scheme black is L2 (live). These overlaps are the primary reason why
                mixed-colour installations are so dangerous and why warning notices are mandatory.
              </p>
              <p>
                You will encounter old colours regularly during periodic inspections (EICRs),
                rewires, and additions to older properties. Many UK homes still have original 1960s,
                1970s, and 1980s wiring with red and black cables. There is no requirement to rewire
                an entire installation simply because it uses old colours — but any new work,
                additions, or alterations must use the current harmonised colours.
              </p>
            </>
          ),
        },
        {
          id: 'when-colours-changed',
          heading: 'When the Colours Changed',
          content: (
            <>
              <p>
                The transition from old UK colours to the harmonised European colours was not
                instantaneous. It was managed through a phased approach to allow the industry to
                adjust.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">
                  Timeline of the Colour Change
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-yellow-400">2004</div>
                    <div className="text-white text-sm leading-relaxed">
                      BS 7671:2001 Amendment 2 was published, introducing the harmonised colours for
                      the first time. From 1 April 2004, both old and new colours were permitted.
                      Cable manufacturers began producing twin-and-earth cable in the new colours
                      (brown/blue instead of red/black).
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-yellow-400">2006</div>
                    <div className="text-white text-sm leading-relaxed">
                      The transition period ended on 31 March 2006. From 1 April 2006, only the new
                      harmonised colours were permitted for new installations. Old-colour cable
                      could no longer be used for new work. Existing installations using old colours
                      remained compliant — there was no requirement to retrospectively change them.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-yellow-400">2008</div>
                    <div className="text-white text-sm leading-relaxed">
                      BS 7671:2008 (17th Edition) was published with the harmonised colours fully
                      embedded throughout the standard. The 17th Edition included the requirement
                      for warning notices in mixed-colour installations (Regulation 514.14.1).
                    </div>
                  </div>
                </div>
              </div>
              <p>
                In practice, some electricians continued using up their stocks of old-colour cable
                during the transition period, meaning you may find installations from 2004-2006 that
                use a mixture of old and new colours. This is compliant provided the appropriate
                warning notice was fitted at the time.
              </p>
            </>
          ),
        },
        {
          id: 'mixed-colour-installations',
          heading: 'Mixed-Colour Installations and Warning Notices',
          content: (
            <>
              <p>
                A mixed-colour installation is one where both old and new colour schemes are present
                — for example, where new circuits have been added to an older property using
                harmonised colours while the existing circuits retain the old colours. This is
                extremely common in UK domestic properties.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">
                      BS 7671 Regulation 514.14.1 — Warning Notice Required
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Where an installation contains wiring using both old and new colour codes, a
                      warning notice must be fitted at or near the main distribution board. The
                      notice must read: "CAUTION — This installation has wiring colours to two
                      versions of BS 7671. Great care should be taken before undertaking extension,
                      alteration, or repair that all conductors are correctly identified."
                    </p>
                  </div>
                </div>
              </div>
              <p>
                The absence of this warning notice is an observation on an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>. It would
                typically be classified as C3 (Improvement Recommended) because the lack of a
                warning does not create an immediate danger but could lead to a dangerous mistake by
                a future electrician who does not realise both colour schemes are present.
              </p>
              <p>
                During a partial rewire, new circuits must use the current harmonised colours. The
                old circuits that are not being replaced can remain in their original colours.
                However, at the distribution board, you must ensure that every conductor is clearly
                identifiable. Where old-colour cables enter a new consumer unit, sleeving the
                conductors in the correct harmonised colours at the termination point helps with
                identification — but the warning notice is still required because the colours in the
                cable runs between the board and the accessories will still be the old scheme.
              </p>
              <SEOAppBridge
                title="EICR Forms Capture Colour Scheme Details"
                description="Elec-Mate's EICR form includes fields for recording the wiring colour scheme used in the installation. When both old and new colours are present, the app flags the warning notice requirement automatically and adds it to the observations if missing."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'cable-types',
          heading: 'Cable Types and Their Colours',
          content: (
            <>
              <p>
                Different cable types use the colour scheme in slightly different ways.
                Understanding which colours to expect in each cable type prevents incorrect
                identification.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-white text-lg mb-3">
                    Twin-and-Earth (T&E / 6242Y)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The most common domestic cable. Contains two insulated conductors (brown for
                    line, blue for neutral in current cable) plus a bare copper CPC. The CPC has no
                    factory-applied insulation — it must be sleeved green/yellow at every
                    termination point (Regulation 514.4.2). Old T&E has red (line) and black
                    (neutral) conductors with bare copper earth.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Three-core T&E (6243Y) used for two-way switching contains brown, black, and
                    grey insulated conductors plus bare CPC. In a two-way switching circuit, the
                    black and grey conductors may be used as strappers (switched line conductors) —
                    they should be sleeved brown at each end to indicate they carry line voltage
                    when the switch is in the appropriate position.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">SWA (Steel Wire Armoured)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Used for underground and external cable runs. Single-phase SWA has brown (L),
                    blue (N), and green/yellow (E) cores. Three-phase SWA has brown (L1), black
                    (L2), grey (L3), blue (N), and green/yellow (E) cores. The steel wire armour
                    provides mechanical protection and can also serve as the CPC, provided it has
                    adequate cross-sectional area and continuity — but a separate CPC core is always
                    preferred for reliability.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Flexible Cable (Flex)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Used for appliance connections and pendant lights. Three-core flex has brown
                    (L), blue (N), and green/yellow (E) cores. Two-core flex (for double-insulated
                    Class II equipment) has brown and blue cores with no earth. The colours in flex
                    have always followed the brown/blue/green-yellow scheme since the harmonisation
                    — even during the transition period, flex colours were changed earlier than
                    fixed wiring colours.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">
                    MICC (Mineral Insulated Copper Clad)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Mineral insulated cable does not have coloured insulation on its cores — the
                    cores are bare copper separated by compressed magnesium oxide insulation. At
                    each termination, heat-shrink sleeves or coloured markers must be applied to
                    identify each conductor. The termination colours must follow the current
                    harmonised scheme.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="AI Board Scanner Identifies Cable Colours"
                description="Take a photo of any consumer unit or distribution board and Elec-Mate's AI board scanner identifies the cable colours, flags mixed-colour installations, and notes any missing CPC sleeving. Saves time during inspections and reduces missed observations."
                icon={Camera}
              />
            </>
          ),
        },
        {
          id: 'common-mistakes',
          heading: 'Common Wiring Colour Mistakes',
          content: (
            <>
              <p>
                Incorrect conductor identification is one of the most frequent causes of serious
                electrical incidents. Here are the mistakes that catch electricians out most often.
              </p>
              <div className="space-y-4 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Confusing old black (neutral) with new black (L2)
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        In the old single-phase scheme, black is neutral (safe to touch when circuit
                        is isolated). In the new three-phase scheme, black is L2 — a live conductor
                        at 230V to neutral and 400V to other phases. Working on a three-phase board
                        in a building with old single-phase circuits requires extreme care to
                        identify which black conductors are live and which are neutral.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Failing to sleeve the CPC in twin-and-earth cable
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        The bare copper CPC in T&E cable must be sleeved green/yellow at every
                        termination point. Leaving it bare creates a risk of accidental contact with
                        live conductors at the terminal. This is a common observation on EICRs,
                        typically classified as C3.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Not sleeving switch wires in two-way switching
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        In three-core T&E used for two-way switching, the black and grey conductors
                        are used as strappers. These carry line voltage when the switch is in
                        certain positions. They must be sleeved brown at both ends to indicate they
                        are switched line conductors, not neutrals. Failure to do this is a defect.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Missing the mixed-colour warning notice
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        When adding new circuits to an installation with old-colour wiring, the
                        warning notice at the distribution board is mandatory. Forgetting it is an
                        easy mistake — but it leaves the next electrician unaware that two colour
                        schemes are present, which could lead to a fatal misidentification.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Assuming blue is always neutral</h3>
                      <p className="text-white text-sm leading-relaxed">
                        In the old three-phase scheme, blue was Phase 3 (L3) — a live conductor. If
                        you encounter blue conductors in a three-phase installation that predates
                        2006, they may be live phase conductors, not neutrals. Always check the
                        installation date and verify with a voltage indicator before making
                        assumptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                The lesson is clear: never assume a conductor's function based on colour alone
                without first establishing which colour scheme is in use. Check the installation
                age, look for warning notices, and always prove circuits dead with a{' '}
                <SEOInternalLink href="/guides/how-to-do-safe-isolation">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                before working on them.
              </p>
              <SEOAppBridge
                title="BS 7671 Regulations Accessible In-App"
                description="Every BS 7671 regulation relating to conductor identification, colour coding, and warning notices is accessible within Elec-Mate. Search by regulation number or topic and get the full text instantly — even without an internet connection."
                icon={BookOpen}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What are the current UK wiring colours for a single-phase installation?',
          answer:
            'The current harmonised wiring colours for single-phase installations in the UK are brown for the line (live) conductor, blue for the neutral conductor, and green/yellow for the earth (circuit protective conductor). These colours have been mandatory for all new electrical installations since 1 April 2006 and were introduced through Amendment 2 to the 16th Edition of BS 7671 in 2004. The colours align with the European harmonisation standard, replacing the previous UK-specific colours of red (live), black (neutral), and green (earth). In twin-and-earth cable, the bare copper earth conductor must be sleeved green/yellow at every termination point. These colours apply to all fixed wiring cable types including twin-and-earth (6242Y), SWA, and conduit wiring.',
        },
        {
          question: 'When did UK wiring colours change from red and black to brown and blue?',
          answer:
            'The change was introduced on 1 April 2004 through Amendment 2 to BS 7671:2001 (the 16th Edition). From that date, both the old colours (red/black) and the new colours (brown/blue) were permitted during a two-year transition period. From 1 April 2006, only the new harmonised colours were permitted for new installations, additions, and alterations. The transition period allowed cable manufacturers to switch production and gave electricians and suppliers time to use up stocks of old-colour cable. Existing installations using the old colours did not need to be changed — there is no requirement to rewire an installation solely because it uses the pre-harmonisation colours. However, any new work on an existing installation must use the current colours, which creates mixed-colour installations requiring a warning notice under Regulation 514.14.1.',
        },
        {
          question:
            'What should I do if I find both old and new wiring colours in the same installation?',
          answer:
            'This is a very common scenario in UK properties where new work has been added to an older installation. BS 7671 Regulation 514.14.1 requires a warning notice to be fitted at or near the main distribution board. The notice must state: "CAUTION — This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration, or repair that all conductors are correctly identified." If the warning notice is missing during an EICR inspection, it should be recorded as an observation — typically C3 (Improvement Recommended). When working on mixed-colour installations, take extra care to identify every conductor before assuming its function. The overlap between old and new colour schemes (especially blue and black) creates a genuine risk of misidentification that could be fatal.',
        },
        {
          question: 'What are the three-phase wiring colours in the UK?',
          answer:
            'The current three-phase wiring colours are brown for Phase 1 (L1), black for Phase 2 (L2), grey for Phase 3 (L3), blue for the neutral, and green/yellow for the earth. These replaced the old UK three-phase colours of red (L1), yellow (L2), blue (L3), and black (neutral). The most dangerous overlap is that blue was L3 (live, 230V to neutral) in the old scheme but is neutral in the new scheme, and black was neutral in the old scheme but is L2 (live) in the new scheme. When working on three-phase installations, always check the installation date and verify conductor identity with a voltage indicator. Never assume based on colour alone in any installation that could predate the 2004-2006 changeover.',
        },
        {
          question: 'Do I need to rewire old red and black wiring during an EICR?',
          answer:
            'No. There is no requirement in BS 7671 or any regulation to replace wiring solely because it uses the old pre-harmonisation colours. An installation with red and black wiring that was compliant when installed remains compliant for the purposes of continued use, provided it is in a safe condition. During an EICR, you inspect and test the installation to assess its condition — the colour of the wiring is not a defect. However, if the installation has other defects that require remedial work (deteriorated insulation, lack of RCD protection, inadequate earthing), and that remedial work involves rewiring circuits, then the new wiring must use the current harmonised colours. Similarly, if a consumer unit is being replaced, the opportunity should be taken to sleeve conductors in the correct colours at the board terminations.',
        },
        {
          question: 'Why must the bare earth in twin-and-earth cable be sleeved green/yellow?',
          answer:
            'BS 7671 Regulation 514.4.2 requires that every protective conductor is identified by the combination of green and yellow colours throughout its length, or at every point where it is accessible. In twin-and-earth cable, the circuit protective conductor (CPC) is manufactured as bare copper without insulation. At every termination point — at accessories, junction boxes, the consumer unit, and anywhere the conductor is exposed — it must be sleeved with green/yellow sleeving. The reasons are twofold. First, it identifies the conductor as the protective earth so there is no confusion about its function. Second, it provides insulation at the termination point to prevent the bare copper from accidentally touching live or neutral conductors. Missing CPC sleeving is one of the most common observations on EICR inspections and is typically classified as C3 (Improvement Recommended), though it could be C2 (Potentially Dangerous) if the bare conductor could make contact with a live terminal.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Metal CU requirements, RCD protection, and Amendment 3 changes.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT earthing systems explained.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate Guide',
          description: 'How to complete an Electrical Installation Condition Report.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/how-to-do-safe-isolation',
          title: 'Safe Isolation Procedure',
          description: 'GS38 prove-test-prove method step by step.',
          icon: Zap,
          category: 'Safety',
        },
        {
          href: '/guides/house-rewire',
          title: 'House Rewire Guide',
          description: 'Complete guide to domestic rewiring costs and regulations.',
          icon: Calculator,
          category: 'Guide',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition Guide',
          description: 'Complete guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Identify Wiring Colours With Confidence"
      ctaSubheading="Elec-Mate's AI board scanner identifies cable colours from photos, certificates auto-reference correct standards, and all BS 7671 regulations are accessible in-app. 7-day free trial."
    />
  );
}
