import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  Shield,
  ShieldCheck,
  FileText,
  GraduationCap,
  ClipboardCheck,
  HardHat,
  Plug,
  Wrench,
  Heart,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'Electrical Safety on Site', href: '/guides/electrical-safety-on-site' },
];

const tocItems = [
  { id: '110v-vs-230v', label: '110V vs 230V on Site' },
  { id: 'portable-equipment', label: 'Portable Equipment Safety' },
  { id: 'temporary-supplies', label: 'Temporary Electrical Supplies' },
  { id: 'tool-inspections', label: 'Tool Inspections and PAT Testing' },
  { id: 'permit-to-work', label: 'Permit to Work Systems' },
  { id: 'cables-and-routing', label: 'Cable Routing and Protection' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Construction sites in the UK must use 110V centre-tapped supply systems for portable tools and equipment — the maximum voltage to earth is 55V, significantly reducing the risk of fatal electric shock.',
  'All portable electrical equipment on site must be visually inspected before each use and formally inspected and tested (PAT tested) at intervals recommended by the HSE.',
  'Temporary electrical installations on construction sites must comply with BS 7671 and be designed, installed, and maintained by a competent person.',
  'A permit to work system must be used for all work on or near live electrical equipment — this is a legal requirement under the Electricity at Work Regulations 1989.',
  'Elec-Mate generates complete RAMS documents for electrical site work using AI, covering every hazard from temporary supplies to cable routing.',
];

const faqs = [
  {
    question: 'Why do construction sites use 110V instead of 230V?',
    answer:
      'Construction sites use 110V centre-tapped earth (CTE) supply systems because they dramatically reduce the risk of fatal electric shock. In a 110V CTE system, the secondary winding of the step-down transformer has a centre tap connected to earth, meaning the maximum voltage between any conductor and earth is only 55V. This is below the threshold that is generally considered lethal under most conditions (though it can still cause a shock and should still be treated with respect). By contrast, the standard UK mains supply is 230V with a maximum of 230V to earth — well above the lethal threshold. The requirement to use 110V reduced voltage systems on construction sites comes from BS 7671 (the IET Wiring Regulations), the Construction (Design and Management) Regulations 2015, and HSE Guidance Note GS50. The 110V supply is provided by a portable step-down transformer, usually a yellow 110V site transformer, connected to the 230V mains supply or a generator.',
  },
  {
    question: 'How often should portable tools be PAT tested on a construction site?',
    answer:
      'The HSE does not set fixed intervals for PAT testing — the frequency depends on the type of equipment and the environment. However, HSE guidance (INDG236) recommends the following for construction site equipment: 110V portable tools should be formally inspected and tested every 3 months; 230V portable equipment (where its use is justified) should be tested every month; IT equipment and similar should be tested every 12 months. Between formal PAT tests, all users should carry out a visual inspection before each use — checking the cable for damage, the plug for cracks, and the equipment for obvious defects. Any equipment that fails a visual inspection must be taken out of service immediately. The key principle is that all electrical equipment must be maintained in a safe condition under the Electricity at Work Regulations 1989 (Regulation 4).',
  },
  {
    question: 'Who is responsible for electrical safety on a construction site?',
    answer:
      'Under the Construction (Design and Management) Regulations 2015 (CDM 2015), the principal contractor has overall responsibility for managing health and safety on site, including electrical safety. However, the duty is shared: the client has a duty to make suitable arrangements for managing the project; the principal designer must plan, manage, and monitor health and safety in the pre-construction phase; and every contractor and worker has a duty to cooperate and not endanger themselves or others. For electrical work specifically, the Electricity at Work Regulations 1989 place duties on employers, self-employed persons, and employees. The "duty holder" is anyone who has control over part of the electrical system — this includes the electrician carrying out the work, the contractor employing them, and the principal contractor managing the site. All duty holders must ensure that electrical systems are constructed, maintained, and operated to prevent danger.',
  },
  {
    question: 'Can you use 230V equipment on a construction site?',
    answer:
      'In general, 230V mains voltage portable equipment should not be used on construction sites. The standard practice, supported by BS 7671 and HSE guidance, is to use 110V centre-tapped reduced voltage systems for all portable tools and equipment. However, there are limited exceptions where 230V may be used: fixed equipment that is part of the permanent installation (such as site office equipment connected to a properly installed fixed supply with RCD protection); equipment that is only available at 230V and where a suitable risk assessment has been carried out and additional protective measures are in place (such as a 30mA RCD, earth monitoring, and regular PAT testing). Even in these cases, 230V use should be minimised and 110V alternatives used wherever possible. Battery-powered tools are increasingly popular on sites as they eliminate the voltage risk entirely.',
  },
  {
    question: 'What should a permit to work for electrical work include?',
    answer:
      'A permit to work (PTW) for electrical work should include: the exact location and description of the work to be carried out; the circuits, equipment, or systems to be worked on (identified by circuit reference, DB number, and location); the isolation and safety measures required (including lock-off, proving dead, and earthing where applicable); the name and signature of the person issuing the permit (the authorising person); the name and signature of the person carrying out the work (the competent person); the date and time the permit is issued and the date and time it expires; a checklist of safety precautions to be completed before work begins; and a sign-off section confirming the work is complete and the system can be re-energised. The PTW system must be managed by a competent person and all permits must be recorded. Elec-Mate can generate permit to work documents as part of the RAMS package.',
  },
  {
    question: 'What colour plug is used for 110V on a construction site?',
    answer:
      'The UK uses a colour-coded plug and socket system (BS 4343/IEC 60309) to prevent equipment being connected to the wrong voltage supply. The colour coding is: yellow for 110V single phase; blue for 230V single phase; red for 415V three phase; violet for 25V SELV (Safety Extra Low Voltage). On a construction site, you should see predominantly yellow plugs and sockets for 110V portable tools. The yellow 110V plugs have a different pin configuration to 230V blue plugs, so they physically cannot be connected to the wrong supply. This is a fundamental safety feature — never modify a plug or socket to force a connection. If you see blue (230V) plugs being used for portable tools on a construction site, this is a red flag that should be raised immediately with the site supervisor.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/first-aid-electrical-shock',
    title: 'First Aid for Electrical Shock',
    description:
      'Emergency response procedures for electrical shock incidents including CPR and burns treatment.',
    icon: Heart,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation with GS38 probe requirements and lock-off protocols.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description: 'How to write risk assessments covering electrical hazards on construction sites.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide UK',
    description:
      'Complete guide to portable appliance testing including frequencies, procedures, and record keeping.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/construction-site-electrical-safety',
    title: 'Construction Site Electrical Safety',
    description:
      'CDM duties, overhead lines, excavation near cables, and construction-specific electrical risks.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work',
    title: 'Permit to Work Systems',
    description: 'How to implement and manage a permit to work system for electrical work on site.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: '110v-vs-230v',
    heading: '110V vs 230V: Why Reduced Voltage Systems Save Lives',
    content: (
      <>
        <p>
          The single most important electrical safety measure on a UK construction site is the use
          of 110V centre-tapped earth (CTE) supply systems for all portable tools and equipment.
          This is not optional — it is the standard practice mandated by BS 7671, supported by HSE
          Guidance Note GS50, and expected under the Construction (Design and Management)
          Regulations 2015.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How 110V CTE works:</strong> A step-down transformer reduces the incoming
                230V supply to 110V. The secondary winding has a centre tap connected to earth. This
                means the maximum voltage between any line conductor and earth is only 55V — well
                below the threshold generally considered lethal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it matters:</strong> On a construction site, conditions are wet, dusty,
                and physically demanding. Workers are often in contact with earthed metal
                (scaffolding, steelwork, pipework). Skin resistance is lower when wet. A 230V shock
                under these conditions can easily be fatal. A 55V shock (the maximum from a 110V CTE
                system) is far less likely to cause a fatal outcome.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Yellow plugs and sockets:</strong> 110V equipment uses yellow BS 4343 (IEC
                60309) plugs and sockets. The pin configuration prevents 110V equipment from being
                plugged into a 230V supply. Never modify a plug or socket to force a connection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Battery-powered tools are increasingly common on site and offer the ultimate solution —
          zero mains voltage risk. Where battery-powered alternatives exist, they should be
          preferred. However, for high-power tools (large angle grinders, SDS drills, core drills),
          110V mains-powered equipment is still widely used.
        </p>
      </>
    ),
  },
  {
    id: 'portable-equipment',
    heading: 'Portable Equipment Safety on Construction Sites',
    content: (
      <>
        <p>
          Every piece of portable electrical equipment used on a construction site — from extension
          leads and transformers to power tools and task lighting — must be maintained in a safe
          condition. This is a legal requirement under Regulation 4 of the Electricity at Work
          Regulations 1989.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>User checks before every use:</strong> Before plugging in any tool, check
                the cable for cuts, abrasion, or kinks; check the plug for cracks or damage; check
                the tool body for damage; and check that the cable entry grommet is intact. If
                anything is damaged, do not use the equipment — tag it as defective and remove it
                from service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal inspection and testing:</strong> All portable equipment on site
                should be formally inspected and{' '}
                <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT tested</SEOInternalLink> at
                regular intervals. HSE guidance recommends every 3 months for 110V site tools and
                monthly for any 230V equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extension leads:</strong> Only use industrial-grade extension leads with
                yellow 110V connectors on site. Domestic-style cable reels and extension leads
                (white or grey with 13A plugs) must never be used on a construction site. Extension
                leads must be fully unwound during use to prevent overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformers:</strong> Site transformers (110V step-down) should be
                inspected regularly for damage, overheating, and oil leaks (for oil-filled types).
                Check that the earth connection is intact and that the transformer is rated for the
                load being connected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Records of all inspections and PAT tests should be kept on site and available for
          inspection by the HSE, the principal contractor, or the client. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/pat-testing-guide-uk">PAT testing app</SEOInternalLink>{' '}
          lets you record test results, attach photos, and generate professional certificates
          directly from your phone.
        </p>
      </>
    ),
  },
  {
    id: 'temporary-supplies',
    heading: 'Temporary Electrical Supplies on Construction Sites',
    content: (
      <>
        <p>
          The temporary electrical supply on a construction site is the backbone of all site
          operations. It powers tools, lighting, welfare facilities, tower cranes, and site offices.
          It must be designed, installed, and maintained by a competent person in accordance with BS
          7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary supply design:</strong> The temporary installation should have a
                main distribution board with adequate protection (MCBs/RCBOs, RCD protection, main
                isolator) and sub-distribution boards positioned around the site to provide power
                where it is needed. All distribution boards should be IP-rated for outdoor use
                (typically IP44 or higher).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing:</strong> The temporary installation must have an effective
                earthing system. On sites supplied by the DNO (Distribution Network Operator), the
                earthing arrangement will typically be TN-S or TN-C-S. For generator-supplied sites,
                an earth electrode will be required (TT system). The earthing must be tested and
                verified before the supply is energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> All socket outlets on the temporary supply must
                have 30mA RCD protection. This is in addition to the reduced voltage (110V)
                protection for portable tools. The RCDs should be tested regularly — at least weekly
                using the test button, and formally tested at intervals as part of the periodic
                inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Temporary installations on construction sites should be periodically inspected and tested
          at intervals not exceeding 3 months. This is more frequent than for permanent
          installations because of the harsh environment and the constantly changing nature of the
          site. For detailed guidance on temporary installation standards, see our guide on{' '}
          <SEOInternalLink href="/guides/temporary-installations-bs-7909">
            temporary installations and BS 7909
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Generate RAMS for temporary electrical installations"
          description="Elec-Mate's AI Health and Safety agent creates comprehensive RAMS documents for temporary supply installations — covering isolation procedures, cable routing, earthing requirements, and emergency procedures. Generated in minutes, not hours."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'tool-inspections',
    heading: 'Tool Inspections and PAT Testing on Site',
    content: (
      <>
        <p>
          Every electrical tool on a construction site needs a regime of inspection and testing. The
          three levels of checking are: user visual checks (before every use), formal visual
          inspections (weekly to monthly), and combined inspection and PAT testing (every 3 months
          for 110V site tools).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>User visual check (before every use):</strong> Check the plug for damage;
                check the cable for cuts, kinks, or joints; check the tool body for cracks or
                damage; check the on/off switch works; check the cable entry grommet. This takes 30
                seconds and should become automatic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal visual inspection (weekly to monthly):</strong> A more detailed check
                by a competent person, recorded in the site equipment register. Includes checking
                for internal damage (where the tool can be opened without special tools) and
                verifying the equipment label and asset number match the register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined inspection and test (PAT test):</strong> Carried out at intervals
                recommended by HSE guidance — typically every 3 months for 110V construction site
                tools. Includes earth continuity, insulation resistance, and functional testing.
                Results must be recorded and the equipment labelled with the test date and next test
                due date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Any equipment that fails an inspection or test must be immediately removed from service,
          labelled as defective, and either repaired by a competent person or disposed of. A "tag
          out" system using cable ties and defective equipment labels prevents failed equipment from
          being used accidentally.
        </p>
      </>
    ),
  },
  {
    id: 'permit-to-work',
    heading: 'Permit to Work Systems for Electrical Work',
    content: (
      <>
        <p>
          A permit to work (PTW) system is a formal, documented procedure that authorises specific
          people to carry out specific work at a specific time, with specific safety precautions in
          place. For electrical work on construction sites, a PTW system is essential for managing
          the risks associated with working on or near electrical systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When a PTW is required:</strong> Any work on or near live electrical
                equipment; any work that requires isolation of circuits or systems; any work in
                high-risk environments (confined spaces, elevated positions near overhead lines);
                any work that could affect the safety of others on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who issues the permit:</strong> The permit must be issued by a person with
                sufficient authority and competence — typically the site electrical supervisor or
                the responsible person for the electrical installation. The issuer must verify that
                the safety precautions are in place before signing the permit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the permit covers:</strong> The exact scope of work, the circuits or
                equipment to be worked on, the isolation and safety measures (lock-off, proving
                dead, earthing), the time period, the competent person carrying out the work, and
                the sign-off procedure when the work is complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For detailed guidance on permit to work systems, including templates and implementation
          advice, see our dedicated{' '}
          <SEOInternalLink href="/guides/permit-to-work">permit to work guide</SEOInternalLink>.
          Elec-Mate can generate permit to work documents as part of the{' '}
          <SEOInternalLink href="/guides/rams-generator">RAMS package</SEOInternalLink>,
          pre-populated with the site details and the specific hazards identified in your{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'cables-and-routing',
    heading: 'Cable Routing and Protection on Site',
    content: (
      <>
        <p>
          Cables on a construction site face hazards that permanent installations do not — vehicle
          traffic, foot traffic, dropped materials, water ingress, and physical damage from
          construction activities. Proper cable routing and protection is essential to prevent
          electrical faults, fires, and shock hazards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route cables overhead where possible.</strong> Cables should be suspended at
                a minimum height of 5.8 metres where vehicles pass beneath, or 3 metres minimum for
                pedestrian areas only. Use proper cable supports — never drape cables over
                scaffolding or hang them from nails.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protect ground-level cables.</strong> Where cables must run at ground level,
                use heavy-duty cable covers (yellow cable ramps) rated for the expected traffic.
                Bury cables in ducts where they cross vehicle routes. Mark all cable routes clearly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use SWA or armoured cable</strong> for all permanent and semi-permanent site
                distribution cables. Flexible trailing cables should only be used for temporary
                connections to portable equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep cables away from water.</strong> Route cables away from areas prone to
                flooding, standing water, or water runoff. All connections and junction boxes must
                be IP-rated for the environment (minimum IP44 for outdoor site use).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable damage is one of the most common causes of electrical incidents on construction
          sites. Regular inspections of cable routes — particularly after heavy rain, high winds, or
          major construction activities — should be part of the site safety routine.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-procedures',
    heading: 'Emergency Procedures for Electrical Incidents on Site',
    content: (
      <>
        <p>
          Every construction site must have documented emergency procedures for electrical
          incidents. These procedures should be communicated to all workers during site induction
          and reinforced through regular{' '}
          <SEOInternalLink href="/guides/toolbox-talks-electrical">toolbox talks</SEOInternalLink>.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical shock:</strong> Do not touch the casualty until the supply is
                isolated. Call 999. Begin CPR if the casualty is not breathing. See our full{' '}
                <SEOInternalLink href="/guides/first-aid-electrical-shock">
                  first aid for electrical shock guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical fire:</strong> Isolate the supply if safe to do so. Use a CO2 or
                dry powder fire extinguisher — never use water on an electrical fire. Evacuate the
                area and call the fire brigade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable strike:</strong> If an underground cable is struck during excavation,
                stop work immediately. Do not touch the cable. Evacuate the area and call the
                electricity network operator. Do not attempt to repair the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead line contact:</strong> If a crane, excavator, or scaffold pole
                contacts an overhead power line, everyone must stay clear. If you are in the
                vehicle, stay inside unless there is a fire. If you must exit, jump clear (do not
                step out) and shuffle away with your feet together.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All electrical incidents — including near misses — must be reported and investigated. Use
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/near-miss-reporting">
            near miss reporting tools
          </SEOInternalLink>{' '}
          to capture incidents as they happen, directly from your phone on site.
        </p>
        <SEOAppBridge
          title="AI-powered RAMS for every site scenario"
          description="Elec-Mate's AI Health and Safety agent generates comprehensive RAMS documents covering temporary supplies, cable routing, tool inspections, emergency procedures, and permit to work requirements. Built specifically for electrical contractors."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyOnSitePage() {
  return (
    <GuideTemplate
      title="Electrical Safety on Site | Construction Guide UK"
      description="Complete guide to electrical safety on UK construction sites. Covers 110V vs 230V systems, portable equipment inspections, temporary supplies, permit to work, cable routing, and emergency procedures."
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Electrical Safety on Site:{' '}
          <span className="text-yellow-400">The Construction Guide Every Sparky Needs</span>
        </>
      }
      heroSubtitle="Construction sites are one of the most electrically hazardous working environments in the UK. 110V reduced voltage systems, PAT testing, temporary supplies, permit to work procedures, and proper cable routing are not optional extras — they are the minimum standards that keep people alive."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Safety on Site"
      relatedPages={relatedPages}
      ctaHeading="Site Safety Tools Built for Electricians"
      ctaSubheading="Generate RAMS, risk assessments, method statements, and permit to work documents with AI. Access training courses for PASMA, IPAF, manual handling, and working at height. 7-day free trial."
    />
  );
}
