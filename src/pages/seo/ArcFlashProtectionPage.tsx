import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Shield,
  AlertTriangle,
  FileCheck2,
  HardHat,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Eye,
  Scale,
  Flame,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/risk-assessment-electricians' },
  { label: 'Arc Flash Protection', href: '/guides/arc-flash-protection' },
];

const tocItems = [
  { id: 'what-is-arc-flash', label: 'What Is Arc Flash?' },
  { id: 'causes-of-arc-flash', label: 'Causes of Arc Flash' },
  { id: 'incident-energy', label: 'Incident Energy & Severity Levels' },
  { id: 'ppe-categories', label: 'Arc Flash PPE Categories' },
  { id: 'boundary-distances', label: 'Arc Flash Boundary Distances' },
  { id: 'risk-assessment', label: 'Arc Flash Risk Assessment' },
  { id: 'uk-standards', label: 'UK Standards & Legal Requirements' },
  { id: 'prevention', label: 'Prevention & Control Measures' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Arc flash generates temperatures up to 20,000 degrees Celsius and explosive pressure waves exceeding 1,000 pounds per square foot — it is one of the most severe hazards electricians face when working on or near energised switchgear.',
  'Arc-rated PPE is categorised into four levels (Category 1 to Category 4), with minimum arc thermal performance values (ATPV) ranging from 4 cal/cm squared to 40 cal/cm squared — the required category depends on the incident energy at the working distance.',
  'The Electricity at Work Regulations 1989 and the Management of Health and Safety at Work Regulations 1999 require employers to assess arc flash risk and provide appropriate protective measures, including arc-rated PPE where the risk cannot be eliminated.',
  'The most effective arc flash control measure is to de-energise before working — proper safe isolation and lock off/tagout procedures eliminate the arc flash hazard entirely.',
  'Elec-Mate AI Health and Safety agent generates arc flash risk assessments covering incident energy estimation, PPE category selection, boundary distances, and control measures for your specific installation.',
];

const faqs = [
  {
    question: 'What is the difference between arc flash and electric shock?',
    answer:
      'Electric shock occurs when electrical current passes through the body due to direct contact with a live conductor. Arc flash is an explosive release of energy caused by an electrical fault (short circuit) that creates a plasma arc between conductors or between a conductor and earth. The key difference is that arc flash does not require direct contact with live conductors — an electrician can be severely burned or killed by an arc flash while standing several metres away from the fault point. Electric shock injures through current flow; arc flash injures through intense radiant heat (up to 20,000 degrees Celsius), molten metal projectiles, intense light (which can cause temporary or permanent blindness), a pressure blast wave (which can throw workers across the room and cause blunt force trauma), and toxic gases. Both hazards can be present simultaneously — an electrician working on energised switchgear faces both electric shock and arc flash risks.',
  },
  {
    question: 'Do I need arc flash PPE for domestic work?',
    answer:
      'The arc flash risk on domestic installations is generally lower than on commercial or industrial switchgear because the available fault current is typically lower and the protective devices are smaller. However, the risk is not zero. A short circuit at a domestic consumer unit can generate an arc flash with enough energy to cause serious burns, ignite clothing, and cause blast injuries. The risk is highest when working on or near the supply tails, the main switch, and the bus bars inside the consumer unit — these are the points where fault current is highest. As a minimum, when working on domestic consumer units you should wear arc-rated face and eye protection (a face shield or safety glasses with side shields rated for arc flash), flame-resistant clothing (or at the very least avoid synthetic fabrics that melt onto skin), and insulated gloves. Full arc flash suits are not typically required for domestic work, but face and eye protection should be considered essential.',
  },
  {
    question: 'What ATPV rating do I need for my PPE?',
    answer:
      'The required arc thermal performance value (ATPV) depends on the estimated incident energy at your working distance. To determine this, you need to know the prospective short-circuit current at the point of work and the clearing time of the upstream protective device. For most UK domestic consumer unit work, the incident energy is typically below 4 cal/cm squared, so Category 1 PPE (minimum 4 cal/cm squared ATPV) is usually adequate. For commercial distribution boards with higher fault currents, Category 2 (minimum 8 cal/cm squared) is commonly required. For industrial switchgear, motor control centres, and high-voltage equipment, Category 3 (25 cal/cm squared) or Category 4 (40 cal/cm squared) may be needed. If you do not have the data or expertise to calculate incident energy, err on the side of caution and use a higher category. The ideal approach is to conduct a formal arc flash risk assessment for each installation or type of installation you work on.',
  },
  {
    question: 'Is arc flash risk assessment a legal requirement in the UK?',
    answer:
      'Yes. While UK law does not use the specific term "arc flash risk assessment," the legal requirements are clear. The Management of Health and Safety at Work Regulations 1999 (Regulation 3) require a suitable and sufficient assessment of all risks to health and safety — this includes the risk of arc flash. The Electricity at Work Regulations 1989 (Regulation 3) require all systems to be constructed and maintained to prevent danger, and (Regulation 4) require all work activities on or near electrical systems to be carried out in a manner that prevents danger. The Personal Protective Equipment at Work Regulations 2022 require employers to assess the risk and provide suitable PPE where the risk cannot be eliminated. Taken together, these regulations require you to assess the arc flash risk, implement control measures to reduce the risk, and provide arc-rated PPE where residual risk remains. A specific, documented arc flash risk assessment is the practical way to demonstrate compliance.',
  },
  {
    question: 'What should I do if an arc flash incident occurs?',
    answer:
      'If an arc flash incident occurs, the immediate priorities are: ensure your own safety and do not approach the area if there is a risk of further electrical faults or fire; call the emergency services (999) immediately — arc flash burns are serious and require specialist medical treatment; if it is safe to do so, isolate the supply to prevent further faults; administer first aid to any injured persons — for burns, cool with clean running water for at least 20 minutes, do not remove clothing that is stuck to burns, and do not apply creams or ointments; if the person is unconscious or not breathing, follow standard first aid procedures and be aware that cardiac arrest can result from the blast or from associated electric shock. After the immediate emergency, report the incident under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) if it results in a specified injury, an over-seven-day incapacitation, or a dangerous occurrence. Preserve the scene for investigation. Review and update your risk assessment and safe systems of work.',
  },
  {
    question: 'Can I reduce arc flash risk without wearing a full arc flash suit?',
    answer:
      'Yes. The hierarchy of control applies to arc flash as it does to all hazards, and PPE is the last resort. The most effective control measures are: de-energise before working — proper safe isolation and lock off/tagout eliminates the arc flash hazard entirely; use remote switching and racking — operate switchgear from outside the arc flash boundary using remote operating mechanisms; use current-limiting protective devices — modern current-limiting MCBs and fuses reduce the available arc energy by clearing faults faster; maintain equipment properly — loose connections, corroded bus bars, and contaminated insulation all increase the likelihood of arcing faults; use insulated tools — VDE rated insulated tools prevent accidental short circuits that can initiate an arc; keep covers and doors closed — never operate switchgear with covers removed; and implement engineering controls such as arc-resistant switchgear and bus duct systems. Only when residual risk remains after applying these controls should arc-rated PPE be relied upon.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'What PPE you need on site. Insulated gloves, safety boots, eye protection, and arc flash PPE categories.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/gs-38-proving-dead',
    title: 'GS 38 Proving Dead',
    description:
      'HSE Guidance Note GS 38 requirements for test equipment, proving units, fused probes, and voltage indicators.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock Off / LOTO Procedure',
    description:
      'Complete guide to lockout/tagout for electricians. MCB locks, distribution board isolation, and legal requirements.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'Complete guide to risk assessments. HSE 5-step process, electrical-specific hazards, template structure, and legal requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/method-statement-electricians',
    title: 'Method Statement Guide',
    description:
      'How to write a method statement for electrical work. Template structure, common tasks, and step-by-step examples.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator Tool',
    description:
      'AI-powered RAMS generator. Describe your job and get a complete risk assessment and method statement in minutes.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-arc-flash',
    heading: 'What Is Arc Flash?',
    content: (
      <>
        <p>
          Arc flash is an explosive release of energy caused by an electrical arc fault — a short
          circuit that ionises the air between conductors or between a conductor and earth, creating
          a sustained plasma arc. The arc generates extreme temperatures (up to 20,000 degrees
          Celsius — roughly four times the surface temperature of the sun), intense light, a
          pressure blast wave, molten metal projectiles, and toxic gases. It is one of the most
          violent and destructive hazards in the electrical industry.
        </p>
        <p>
          An arc flash event can last from a fraction of a second to several seconds, depending on
          the fault current magnitude and the clearing time of the upstream protective device. Even
          a very brief arc flash can cause devastating injuries. The radiant heat can ignite
          clothing and cause third-degree burns at distances of several metres from the arc source.
          The blast pressure wave can throw workers across the room, causing impact injuries. Molten
          copper and aluminium droplets are propelled at high velocity, embedding in skin and
          clothing. The intense ultraviolet light can cause temporary or permanent blindness.
        </p>
        <p>
          Arc flash incidents in the UK are more common than many electricians realise. The HSE
          reports multiple serious arc flash injuries every year, ranging from severe facial burns
          and blindness to fatalities. The risk is present wherever electricians work on or near
          energised electrical equipment — from domestic consumer units to industrial switchgear
          panels. Understanding the hazard, assessing the risk, and implementing appropriate control
          measures is essential for every electrician.
        </p>
      </>
    ),
  },
  {
    id: 'causes-of-arc-flash',
    heading: 'What Causes Arc Flash?',
    content: (
      <>
        <p>
          An arc flash requires a fault path — a breakdown in insulation that allows current to flow
          through the air between conductors or between a conductor and earth. The most common
          causes of arc flash in electrical installations include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accidental contact with live bus bars</strong> — dropping a tool, test lead,
                or loose screw onto exposed bus bars inside a distribution board or switchgear
                panel. This is one of the most common causes of arc flash during electrical work,
                particularly during consumer unit changes and panel work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation failure</strong> — degraded, damaged, or contaminated insulation
                on conductors, bus bars, or within equipment. Age, heat, moisture, chemical
                exposure, vermin damage, and mechanical wear can all cause insulation breakdown.
                Cable insulation in older installations is particularly vulnerable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections</strong> — a loose terminal, bus bar connection, or cable
                lug can create localised heating and arcing. Over time, this can escalate into a
                full arc flash event. Loose connections are a leading cause of electrical fires and
                arc flash incidents in both domestic and commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using non-insulated or incorrect tools</strong> — using standard tools
                instead of VDE-rated insulated tools when working on or near live equipment. A metal
                screwdriver slipping across bus bars can initiate a short circuit and arc flash.
                Always use{' '}
                <SEOInternalLink href="/guides/ppe-for-electricians">
                  VDE 1000V rated insulated tools
                </SEOInternalLink>{' '}
                when working near live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contamination</strong> — dust, moisture, rodent droppings, or conductive
                debris inside switchgear panels can create tracking paths that allow current to arc
                between conductors. Regular maintenance and cleaning of switchgear reduces this
                risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment failure</strong> — internal failure of circuit breakers,
                contactors, switches, or other switchgear components can generate arc faults. Older
                equipment with worn contacts or weakened springs is more susceptible. Regular
                maintenance and thermographic surveys help identify potential failure points.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The severity of an arc flash depends on three factors: the available fault current at the
          point of the arc (measured in kA), the duration of the arc (determined by the clearing
          time of the upstream protective device), and the distance of the worker from the arc
          source. Higher fault currents, longer clearing times, and closer working distances all
          increase the incident energy and the severity of potential injuries.
        </p>
      </>
    ),
  },
  {
    id: 'incident-energy',
    heading: 'Incident Energy and Severity Levels',
    content: (
      <>
        <p>
          Incident energy is the measure of thermal energy reaching a surface at a given distance
          from an arc flash event. It is expressed in calories per square centimetre (cal/cm
          squared) and is the key value used to determine the required level of arc flash PPE. The
          higher the incident energy, the more severe the potential burns and injuries.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-yellow-400 shrink-0" />
            Incident Energy Reference Levels
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0" />
              <span>
                <strong>Below 1.2 cal/cm squared</strong> — onset of second-degree burns on exposed
                skin. This is the threshold at which arc flash begins to cause burn injuries. Even
                at this level, the intense light can cause temporary blindness and the blast can
                cause hearing damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
              <span>
                <strong>1.2 to 4 cal/cm squared</strong> — second-degree burns likely on exposed
                skin. Category 1 arc-rated PPE provides protection at this level. Typical of some
                domestic and light commercial installations at close working distances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>
                <strong>4 to 8 cal/cm squared</strong> — serious burns through ordinary clothing.
                Non-flame-resistant clothing can ignite. Category 2 arc-rated PPE required. Typical
                of commercial distribution boards with moderate fault currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
              <span>
                <strong>8 to 25 cal/cm squared</strong> — severe, potentially life-threatening burns
                even through standard work clothing. Category 3 arc-rated PPE required. Typical of
                larger commercial and industrial switchgear.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
              <span>
                <strong>25 to 40 cal/cm squared</strong> — extreme thermal hazard. Category 4 arc
                flash PPE required (full arc flash suit, balaclava, face shield, arc-rated gloves).
                Typical of large industrial switchgear, motor control centres, and some high-voltage
                equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <span>
                <strong>Above 40 cal/cm squared</strong> — exceeds the protection capability of
                commercially available PPE. Work must not be performed at this incident energy level
                without additional engineering controls to reduce the incident energy (remote
                switching, fault current limiting, zone selective interlocking).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The incident energy at a given working distance can be calculated using methods from IEEE
          1584 (the international standard for arc flash hazard calculations) or estimated using
          lookup tables. The calculation requires knowledge of the available fault current, the
          protective device clearing time, the working distance, and the electrode configuration.
          For electricians who do not have the data or software to perform formal calculations, the
          PPE category method (described below) provides a simplified approach based on equipment
          type and voltage level.
        </p>
      </>
    ),
  },
  {
    id: 'ppe-categories',
    heading: 'Arc Flash PPE Categories Explained',
    content: (
      <>
        <p>
          Arc-rated PPE is categorised into four levels based on the arc thermal performance value
          (ATPV) — the incident energy at which there is a 50% probability that the PPE will prevent
          a second-degree burn. The higher the category, the greater the protection:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Category 1 — Minimum ATPV: 4 cal/cm squared
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Arc-rated long-sleeve shirt and trousers (or coverall), arc-rated face shield or
                  safety glasses with side shields, hard hat, hearing protection, leather gloves,
                  and leather work boots. Suitable for low-energy arc flash risks such as domestic
                  consumer unit work and light commercial distribution boards where the incident
                  energy does not exceed 4 cal/cm squared at the working distance.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Category 2 — Minimum ATPV: 8 cal/cm squared
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Arc-rated long-sleeve shirt and trousers (or coverall) rated to 8 cal/cm squared,
                  arc-rated face shield, arc-rated balaclava, hard hat, hearing protection, leather
                  gloves, and leather work boots. Suitable for commercial distribution boards, small
                  panel boards, and motor control centres where the incident energy is between 4 and
                  8 cal/cm squared.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-orange-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Category 3 — Minimum ATPV: 25 cal/cm squared
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Arc flash suit (jacket and bib overalls or coverall) rated to 25 cal/cm squared,
                  arc-rated face shield and balaclava, arc-rated hard hat liner, hearing protection,
                  arc-rated gloves, and leather work boots. Suitable for large industrial
                  switchgear, bus duct systems, and high-fault-current installations where the
                  incident energy is between 8 and 25 cal/cm squared.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <span className="text-red-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Category 4 — Minimum ATPV: 40 cal/cm squared
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Multi-layer arc flash suit rated to 40 cal/cm squared, arc-rated face shield with
                  full balaclava, arc-rated hard hat liner, hearing protection, arc-rated gloves,
                  and leather work boots. This is the highest standard category and is required for
                  the most hazardous situations — large industrial switchboards, utility
                  substations, and high-voltage equipment. If the incident energy exceeds 40 cal/cm
                  squared, work must not proceed without additional engineering controls.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          When selecting arc flash PPE, check that the ATPV rating is clearly marked on the garment
          label. Arc-rated clothing must be tested to IEC 61482-1-1 (open arc test) or IEC 61482-1-2
          (box test). All layers of clothing contribute to the overall arc rating — but only if all
          layers are arc-rated. A single layer of non-arc-rated fabric (such as a standard polyester
          hi-vis vest over an arc-rated coverall) can negate the protection by melting onto the
          skin. See our{' '}
          <SEOInternalLink href="/guides/ppe-for-electricians">
            complete PPE guide for electricians
          </SEOInternalLink>{' '}
          for detailed guidance on selecting and maintaining arc-rated clothing.
        </p>
        <SEOAppBridge
          title="Assess arc flash PPE requirements with AI"
          description="Elec-Mate's AI Health and Safety agent helps you determine the correct arc flash PPE category for your specific installation. Describe the switchgear type, fault level, and working conditions, and get a tailored arc flash risk assessment with PPE recommendations."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'boundary-distances',
    heading: 'Arc Flash Boundary Distances',
    content: (
      <>
        <p>
          Arc flash boundaries define the distance from a potential arc source at which the incident
          energy falls to specific threshold levels. Understanding these boundaries is critical for
          determining who needs arc flash PPE and for establishing safe working zones around
          energised equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash boundary</strong> — the distance at which the incident energy
                equals 1.2 cal/cm squared (the onset of second-degree burns on bare skin). Anyone
                working inside this boundary must wear arc-rated PPE appropriate to the calculated
                incident energy at their working distance. The arc flash boundary varies depending
                on the available fault current and protective device clearing time — for a typical
                domestic consumer unit it may be less than half a metre, while for industrial
                switchgear it can extend to several metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited approach boundary</strong> — the distance from exposed live parts at
                which a shock hazard exists. Only qualified persons (those trained and competent to
                work on or near electrical equipment) may enter this boundary. For 230V systems,
                this is typically 1.0 metre; for higher voltages, it increases accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Restricted approach boundary</strong> — a closer boundary within which there
                is an increased risk of shock due to arc-over combined with involuntary movement.
                Work within this boundary requires specific training, supervision, and appropriate
                insulated tools and PPE.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prohibited approach boundary</strong> — the closest boundary to exposed live
                parts. Working within this distance is considered equivalent to direct contact with
                live conductors and requires the same protective measures as live working —
                including arc-rated PPE, insulated tools, and a{' '}
                <SEOInternalLink href="/guides/method-statement-electricians">
                  detailed method statement
                </SEOInternalLink>{' '}
                for the specific task.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, for most UK electrical work, the approach is to de-energise and lock off
          wherever possible, eliminating the need to work within any arc flash boundary. When live
          working or live testing is necessary (such as during{' '}
          <SEOInternalLink href="/guides/gs-38-proving-dead">proving dead</SEOInternalLink> as part
          of the safe isolation procedure, or during fault-finding), appropriate arc-rated PPE must
          be worn and the working zone must be controlled to prevent unauthorised access.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Conducting an Arc Flash Risk Assessment',
    content: (
      <>
        <p>
          An arc flash risk assessment is a specific evaluation of the arc flash hazard at a
          particular installation or piece of equipment. It forms part of the overall{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          for the work activity but focuses specifically on the thermal and blast hazards from
          potential arc faults. A thorough arc flash risk assessment covers the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify the arc flash hazard</strong> — determine whether electricians or
                other workers will be working on or near energised electrical equipment where an arc
                flash could occur. This includes switchgear, distribution boards, motor control
                centres, bus duct systems, and any equipment with exposed live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Determine the available fault current</strong> — obtain or calculate the
                prospective short-circuit current (PSCC) at the point of work. This data may come
                from the DNO, from loop impedance measurements, from design calculations, or from
                the installation records. The higher the fault current, the greater the potential
                arc energy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Determine the protective device clearing time</strong> — identify the
                upstream protective device (fuse, MCB, MCCB) and determine its clearing time at the
                calculated fault current. Faster clearing times mean lower incident energy.
                Current-limiting devices (such as HRC fuses and Class 3 MCBs) significantly reduce
                arc energy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Estimate the incident energy</strong> — using the fault current, clearing
                time, working distance, and electrode configuration, calculate or estimate the
                incident energy in cal/cm squared. IEEE 1584 provides the standard calculation
                method. Simplified lookup tables are available for common installation types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Select the appropriate PPE category</strong> — based on the calculated
                incident energy, determine the required arc flash PPE category (1, 2, 3, or 4). If
                the incident energy exceeds 40 cal/cm squared, additional engineering controls are
                needed before work can proceed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document and communicate</strong> — record the findings, label the equipment
                with arc flash warning labels (showing the incident energy, required PPE category,
                and boundary distances), and ensure all workers are informed of the arc flash hazard
                and the required protective measures.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate arc flash risk assessments with AI"
          description="Elec-Mate's AI Health and Safety agent creates arc flash risk assessments tailored to your specific installation. Input the equipment type, fault level, and protective devices, and get a complete assessment with incident energy estimation, PPE category selection, boundary distances, and control measures."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'uk-standards',
    heading: 'UK Standards and Legal Requirements for Arc Flash',
    content: (
      <>
        <p>
          Unlike the United States (where NFPA 70E provides a specific arc flash standard), the UK
          does not have a single, dedicated arc flash standard. Instead, arc flash protection is
          addressed through a combination of general health and safety legislation, electrical
          safety regulations, and referenced standards:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Regulation 3 requires
                electrical systems to be constructed and maintained to prevent danger. Regulation 4
                requires work on or near electrical systems to be carried out safely. Regulation 14
                addresses working on live equipment. These regulations collectively require arc
                flash risk to be assessed and managed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                Regulation 3 requires a suitable and sufficient risk assessment of all workplace
                hazards, which includes arc flash. The assessment must identify the hazard, evaluate
                the risk, and determine appropriate control measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personal Protective Equipment at Work Regulations 2022</strong> — require
                employers to assess the need for PPE, provide suitable PPE (including arc-rated PPE
                where the risk assessment identifies an arc flash hazard), ensure it is maintained,
                and train workers in its use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                    BS 7671:2018+A3:2024
                  </SEOInternalLink>
                </strong>{' '}
                — the IET Wiring Regulations address the design and installation of electrical
                systems to minimise the risk of faults that could cause arc flash. Requirements for
                protective device selection, fault current rating, and safe isolation all contribute
                to arc flash risk management.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEEE 1584 (Guide for Performing Arc Flash Hazard Calculations)</strong> —
                while an American standard, IEEE 1584 is widely used in the UK as the reference
                method for calculating incident energy and arc flash boundaries. Many UK electrical
                engineers and safety consultants use IEEE 1584 calculations as the basis for arc
                flash risk assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 61482-1-1 and IEC 61482-1-2</strong> — the international standards for
                testing arc-rated clothing. IEC 61482-1-1 (open arc test) determines the ATPV
                rating. IEC 61482-1-2 (box test, also known as the European test) classifies
                clothing as Class 1 (4 kA) or Class 2 (7 kA). Both test methods are recognised in
                the UK.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical implication is that while there is no single "arc flash regulation" in the
          UK, the combination of existing legislation creates a clear duty to assess arc flash risk,
          implement control measures, and provide appropriate arc-rated PPE. The HSE has
          investigated and prosecuted employers following arc flash incidents where these duties
          were not met.
        </p>
      </>
    ),
  },
  {
    id: 'prevention',
    heading: 'Arc Flash Prevention and Control Measures',
    content: (
      <>
        <p>
          The most effective way to manage arc flash risk is to apply the hierarchy of control —
          starting with elimination and working down to PPE as the last line of defence:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eliminate — de-energise before working</strong> — the most effective control
                measure. Proper{' '}
                <SEOInternalLink href="/guides/lock-off-loto-procedure">
                  safe isolation and lock off/tagout
                </SEOInternalLink>{' '}
                eliminates the arc flash hazard entirely. If the circuit is dead, there is no energy
                to create an arc. This should always be the first option considered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Substitute — use remote operation</strong> — where switchgear must be
                operated while energised, use remote operating mechanisms to keep the operator
                outside the arc flash boundary. Remote racking systems for draw-out circuit breakers
                and remote-controlled switches reduce operator exposure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Engineering controls — reduce incident energy</strong> — use
                current-limiting protective devices (HRC fuses, current-limiting MCBs) that clear
                faults faster and reduce arc duration. Install arc-resistant switchgear that
                channels arc energy away from the operator. Implement bus differential protection
                and zone selective interlocking (ZSI) to reduce clearing times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Administrative controls — safe systems of work</strong> — establish clear
                procedures for working on or near energised equipment. Use permit to work systems.
                Maintain equipment regularly to prevent insulation degradation and loose
                connections. Provide training on arc flash awareness and safe working practices.
                Conduct regular thermographic surveys to identify hot spots and potential fault
                points before they escalate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE — arc-rated personal protective equipment</strong> — when residual arc
                flash risk remains after applying higher-level controls, provide arc-rated PPE
                matched to the calculated incident energy. This includes arc-rated clothing, face
                shields, balaclavas, gloves, and hearing protection. Ensure all layers of clothing
                are arc-rated — non-arc-rated garments worn over or under arc-rated clothing can
                melt and increase injury severity.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Critical: Avoid Synthetic Fabrics</h4>
              <p className="text-white text-sm leading-relaxed">
                Standard synthetic fabrics (polyester, nylon, acrylic) melt at relatively low
                temperatures and can fuse to skin, dramatically worsening burn injuries. Never wear
                non-flame-resistant synthetic clothing when working near potential arc flash
                hazards. Natural fibre clothing (cotton) does not melt but will ignite at higher
                incident energies. Only arc-rated flame-resistant fabrics provide reliable
                protection — they are designed to self-extinguish, resist break-open, and provide an
                insulating air gap between the fabric and the skin.
              </p>
            </div>
          </div>
        </div>
        <p>
          Prevention is always better than protection. The combination of proper safe isolation,
          well-maintained equipment, current-limiting protective devices, and trained, competent
          electricians reduces arc flash risk to the lowest reasonably practicable level. Arc-rated
          PPE is the last line of defence when all other measures have been applied and residual
          risk remains.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ArcFlashProtectionPage() {
  return (
    <GuideTemplate
      title="Arc Flash Protection | Risk Assessment & PPE Guide"
      description="Complete guide to arc flash protection for electricians. What causes arc flash, incident energy levels, PPE categories (Category 1 to 4), boundary distances, arc flash risk assessment, UK legal requirements, and prevention measures. Covers IEEE 1584, IEC 61482, and Electricity at Work Regulations 1989."
      datePublished="2025-04-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Arc Flash Protection:{' '}
          <span className="text-yellow-400">Risk Assessment, PPE Categories & Prevention</span>
        </>
      }
      heroSubtitle="Arc flash generates temperatures of 20,000 degrees Celsius and explosive blast waves. This guide covers everything electricians need to know — causes, incident energy levels, PPE categories, boundary distances, risk assessment, UK legal requirements, and how to prevent arc flash incidents."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Arc Flash Protection"
      relatedPages={relatedPages}
      ctaHeading="Generate Arc Flash Risk Assessments in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Health and Safety agent to create arc flash risk assessments, PPE selection guidance, and complete RAMS packages. Describe the installation, get a professional document. 7-day free trial, cancel anytime."
    />
  );
}
