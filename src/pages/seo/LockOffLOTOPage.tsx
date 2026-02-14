import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lock,
  Shield,
  AlertTriangle,
  FileCheck2,
  Zap,
  HardHat,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Eye,
  Scale,
  Tag,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/risk-assessment-electricians' },
  { label: 'Lock Off LOTO', href: '/guides/lock-off-loto-procedure' },
];

const tocItems = [
  { id: 'what-is-loto', label: 'What Is Lock Off / LOTO?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'step-by-step', label: 'Step-by-Step LOTO Procedure' },
  { id: 'lock-off-devices', label: 'Lock Off Devices for Electricians' },
  { id: 'distribution-board-isolation', label: 'Distribution Board Isolation' },
  { id: 'multi-lock-situations', label: 'Multi-Lock & Group Isolation' },
  { id: 'common-mistakes', label: 'Common LOTO Mistakes' },
  { id: 'digital-loto', label: 'Digital LOTO & AI Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lockout/tagout (LOTO) is a mandatory safe system of work under the Electricity at Work Regulations 1989 and the Health and Safety at Work etc. Act 1974 to prevent accidental re-energisation of circuits during electrical work.',
  'The procedure follows a strict sequence: identify, isolate, lock off, prove dead (using GS 38 compliant equipment), tag, work, remove tags and locks, re-energise — never skip any step.',
  'MCB lock off devices, fuse carrier locks, and distribution board hasps are essential equipment — personal padlocks with unique keys ensure only the person who applied the lock can remove it.',
  'Multi-lock hasps allow several electricians to work on the same isolated circuit simultaneously, with each person applying their own padlock and the circuit remaining isolated until the last lock is removed.',
  'Elec-Mate AI Health and Safety agent generates LOTO-specific risk assessments and method statements covering isolation procedures, lock off device selection, and proving dead requirements.',
];

const faqs = [
  {
    question: 'Is lock off / LOTO a legal requirement for electricians in the UK?',
    answer:
      'Yes. While the specific term "lockout/tagout" originates from US OSHA regulations, the underlying principle is firmly embedded in UK law. The Electricity at Work Regulations 1989 (Regulation 12) require that adequate precautions are taken to prevent equipment from becoming electrically charged during work. The Management of Health and Safety at Work Regulations 1999 require employers to implement safe systems of work. The HSE Guidance Note GS 38 and the IET Code of Practice for In-Service Inspection and Testing all reference the need for secure isolation. Competent person schemes (NICEIC, NAPIT, ELECSA) require evidence of safe isolation procedures including lock off. Failure to implement proper LOTO procedures can result in enforcement action, prohibition notices, and prosecution — particularly if an incident occurs.',
  },
  {
    question: 'What lock off devices do I need for MCBs?',
    answer:
      'For miniature circuit breakers (MCBs), you need MCB lock off devices (sometimes called MCB lockouts or circuit breaker lock offs). These are small plastic or metal devices that fit over the MCB toggle in the OFF position and accept a padlock to prevent the MCB from being switched back on. Different manufacturers make MCBs with different toggle sizes and shapes, so you need to ensure your lock off devices are compatible with the MCBs you encounter. Universal MCB lock off devices are available that fit most common brands (MK, Hager, Schneider, Wylex, Crabtree). For older rewireable fuse boards, you remove the fuse carrier and lock the carrier in a lockable fuse carrier bag. For MCCB (moulded case circuit breaker) panels, dedicated MCCB lock off devices are available. Always carry a selection of lock off devices in your test equipment bag.',
  },
  {
    question: 'Can I use a tag without a lock?',
    answer:
      'A tag on its own is not considered adequate isolation. Tags are warning devices — they communicate information to other people on site — but they do not physically prevent re-energisation. The HSE position is clear: where it is reasonably practicable to lock off, you must lock off. A tag without a lock should only be used in exceptional circumstances where physical locking is genuinely not possible (for example, some very old switchgear that cannot accept a lock off device), and in those cases additional precautions must be taken, such as posting a person at the point of isolation, continuous monitoring, and a permit to work system. In practice, modern lock off devices are available for virtually every type of switchgear, so there is rarely a legitimate reason not to lock off.',
  },
  {
    question: 'What happens if someone removes my lock without permission?',
    answer:
      'The unauthorised removal of a lock off device is an extremely serious matter. It could result in electrocution or fatal injury. Under the Electricity at Work Regulations 1989 (Regulation 14), it is an offence to work on or near equipment that has been made live in circumstances where this would give rise to danger. The person who removed the lock could face criminal prosecution under the Health and Safety at Work etc. Act 1974 for endangering others. If an injury or fatality results, the consequences can include imprisonment. As a practical safeguard, always use a personal padlock with a unique key — never a combination lock or a lock from a shared set. Write your name on the lock. Attach a tag with your name, contact details, and the date. Communicate with everyone on site about the isolation. If you discover your lock has been removed, stop work immediately and re-isolate before proceeding.',
  },
  {
    question: 'How do I prove dead after locking off?',
    answer:
      'After locking off, you must prove the circuit is dead using the prove-test-prove method with GS 38 compliant test equipment. First, prove your voltage indicator is working by testing it on a known live source (a proving unit). Then test the isolated circuit — you should get no reading, confirming it is dead. Finally, prove your voltage indicator is still working by testing it on the known live source again. This three-step process confirms that the circuit is genuinely dead and that your test instrument was working correctly throughout. Use a two-pole voltage indicator (not a multimeter or non-contact voltage detector for safe isolation purposes). The voltage indicator and proving unit must comply with HSE Guidance Note GS 38 — with fused probes, finger guards, and correct ratings. See our GS 38 proving dead guide for full details.',
  },
  {
    question: 'Do I need LOTO for domestic work or just commercial sites?',
    answer:
      'You need LOTO for all electrical work where there is a risk of accidental re-energisation — regardless of whether the site is domestic, commercial, or industrial. The Electricity at Work Regulations 1989 apply to all workplaces and all work activities involving electricity. On a domestic job, the "someone" who might accidentally switch the supply back on could be the homeowner, a family member, or another tradesperson. On a commercial site, it could be a facilities manager, another contractor, or a member of the public. The risk is the same — if the circuit is re-energised while you are working on it, you could be electrocuted. The practical difference is that domestic work typically involves simpler isolation (single consumer unit, individual MCBs), while commercial and industrial work may involve more complex multi-lock, multi-source isolation with permits to work. But the fundamental LOTO procedure is the same in all cases.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/gs-38-proving-dead',
    title: 'GS 38 Proving Dead',
    description:
      'HSE Guidance Note GS 38 requirements for test equipment, proving units, fused probes, and voltage indicators.',
    icon: ShieldCheck,
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
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'What PPE you need on site. Insulated gloves, safety boots, eye protection, and arc flash PPE categories.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/arc-flash-protection',
    title: 'Arc Flash Protection',
    description:
      'Arc flash risk assessment, incident energy levels, PPE categories, and boundary distances explained.',
    icon: Zap,
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
    id: 'what-is-loto',
    heading: 'What Is Lock Off / LOTO for Electricians?',
    content: (
      <>
        <p>
          Lockout/tagout — commonly referred to as LOTO or lock off — is a safe system of work
          designed to prevent the accidental re-energisation of electrical circuits and equipment
          while maintenance, repair, testing, or installation work is being carried out. It is the
          single most important procedure for preventing electrical fatalities and serious injuries
          on site.
        </p>
        <p>
          The principle is straightforward: before you work on any electrical circuit or equipment,
          you isolate it from all sources of electrical energy, apply a physical locking device to
          the point of isolation to prevent anyone from switching it back on, attach a warning tag
          with your name and details, and then prove the circuit is dead using{' '}
          <SEOInternalLink href="/guides/gs-38-proving-dead">
            GS 38 compliant test equipment
          </SEOInternalLink>{' '}
          before starting work. The lock stays in place for the entire duration of the work and is
          only removed by the person who applied it.
        </p>
        <p>
          LOTO is not optional. Every year in the UK, electricians are seriously injured or killed
          because circuits were re-energised while they were working on them. In many of these
          cases, the circuit was correctly isolated but not locked off — and someone else switched
          it back on, not knowing that work was in progress. A lock off device physically prevents
          this from happening. A tag communicates the reason for the isolation to anyone who
          encounters it. Together, they form a robust barrier against one of the most common causes
          of electrical injury.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for LOTO in the UK',
    content: (
      <>
        <p>
          The legal basis for lock off / LOTO procedures in the UK comes from several pieces of
          legislation that together create a comprehensive framework for safe electrical working:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989 (Regulation 12)</strong> — requires
                that adequate precautions shall be taken to prevent electrical equipment from
                becoming electrically charged during work where this would give rise to danger. This
                is the primary legal basis for lock off procedures. Regulation 13 further requires
                adequate precautions for work on or near live conductors, reinforcing the need for
                proper isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974 (Sections 2 and 3)</strong> — places
                a general duty on employers to ensure the health, safety, and welfare of employees
                and anyone else who may be affected by the work. Implementing LOTO procedures is
                part of this duty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                Regulation 3 requires{' '}
                <SEOInternalLink href="/guides/risk-assessment-electricians">
                  risk assessments
                </SEOInternalLink>{' '}
                that identify the need for safe systems of work including LOTO. Regulation 4
                requires the implementation of preventive and protective measures identified by the
                risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HSE Guidance Note GS 38</strong> — while primarily about test equipment, GS
                38 is integral to the safe isolation and proving dead process that forms part of the
                LOTO procedure. It sets the standard for voltage indicators and proving units used
                during the prove-test-prove sequence.
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
                — Chapter 46 (Isolation and Switching) sets out the requirements for isolation,
                switching off for mechanical maintenance, emergency switching, and functional
                switching. Regulation 462.2 specifically requires that a means of isolation shall be
                provided to enable the installer or user to disconnect the installation from every
                source of supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Competent person schemes (NICEIC, NAPIT, ELECSA) require their registered members to
          demonstrate that they follow safe isolation procedures including lock off. Failure to do
          so can result in loss of registration. On commercial and industrial sites, principal
          contractors routinely require evidence of LOTO procedures as part of the RAMS package
          before granting access to work.
        </p>
      </>
    ),
  },
  {
    id: 'step-by-step',
    heading: 'Step-by-Step LOTO Procedure for Electricians',
    content: (
      <>
        <p>
          The LOTO procedure follows a strict, sequential process. Every step must be completed in
          order — skipping any step compromises safety and can lead to serious injury or death.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Identify the Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Identify all sources of electrical supply to the circuit or equipment you will be
                  working on. Check circuit charts, distribution board schedules, and installation
                  drawings. Consider whether there may be multiple supplies — back-up generators,
                  UPS systems, solar PV, or feeds from other distribution boards. Do not rely solely
                  on circuit labelling — verify by physical tracing where possible. If the
                  installation is unfamiliar, take extra time to confirm the circuit identification.
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
                <h4 className="font-bold text-white mb-1">Notify All Affected Persons</h4>
                <p className="text-white text-sm leading-relaxed">
                  Inform everyone who will be affected by the isolation — the building occupier,
                  other tradespeople on site, facilities managers, and anyone who uses the equipment
                  being isolated. Explain which circuits will be switched off, how long the work
                  will take, and that no one should attempt to re-energise the circuit. On
                  commercial sites, this notification may be formalised through a permit to work
                  system.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Isolate the Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Switch off the circuit at the point of isolation — the MCB, MCCB, isolator switch,
                  or main switch as appropriate. For circuits protected by rewireable fuses, remove
                  the fuse carrier. Ensure the isolating device is in the fully OFF position. For
                  three-phase supplies, isolate all phases. Check that the isolating device is
                  suitable for isolation purposes — not all switches are rated for isolation (BS
                  7671 Regulation 537.2 specifies the requirements for devices used for isolation).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Apply Lock Off Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  Fit the appropriate lock off device to the isolating switch, MCB, or fuse carrier.
                  Apply your personal padlock with a unique key. The padlock must be substantial
                  enough that it cannot be easily broken or removed without the key. Write your name
                  on the lock or use a colour-coded lock assigned to you. Never use a combination
                  lock, a shared-key lock, or a lock that someone else also has a key for.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">5</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Attach Warning Tag</h4>
                <p className="text-white text-sm leading-relaxed">
                  Attach a clearly visible warning tag to the lock off device or the point of
                  isolation. The tag should state: "DANGER — DO NOT SWITCH ON", your name, date and
                  time of isolation, the circuit or equipment being worked on, and your contact
                  details. Pre-printed danger tags are available from electrical suppliers. The tag
                  communicates the reason for the isolation to anyone who encounters it.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">6</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Prove Dead</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the prove-test-prove method with{' '}
                  <SEOInternalLink href="/guides/gs-38-proving-dead">
                    GS 38 compliant test equipment
                  </SEOInternalLink>
                  . Prove your voltage indicator on a known live source (proving unit). Test the
                  isolated circuit — all conductors, phase to neutral, phase to earth, neutral to
                  earth. Prove your voltage indicator again on the known live source. Only when the
                  circuit is confirmed dead can work begin. This is the final verification step —
                  the lock off device prevents re-energisation, but proving dead confirms the
                  isolation is effective.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">7</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Complete the Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Carry out the electrical work with the circuit securely isolated and locked off.
                  If you need to leave the work area (for lunch, end of day, to collect materials),
                  the lock off device and tag remain in place. Never remove your lock until all work
                  is complete and the circuit is safe to re-energise.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">8</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Remove Locks, Tags & Re-energise</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the work is complete, check that all tools, test equipment, and materials
                  have been removed from the circuit. Verify that all connections are secure and
                  covers are refitted. Only then remove your tag and padlock. Notify all affected
                  persons that the circuit is about to be re-energised. Switch on and test for
                  correct operation. Only the person who applied the lock should remove it — this is
                  a fundamental principle of LOTO safety.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Generate LOTO method statements with AI"
          description="Elec-Mate's AI Health and Safety agent creates step-by-step LOTO method statements tailored to your specific job. Describe the installation and task, and get a complete safe isolation procedure with the correct lock off devices, proving dead sequence, and permit to work documentation."
          icon={Lock}
        />
      </>
    ),
  },
  {
    id: 'lock-off-devices',
    heading: 'Lock Off Devices for Electricians',
    content: (
      <>
        <p>
          Having the right lock off devices is essential. Different types of switchgear require
          different lock off devices, and you need to carry a selection to cover the range of
          equipment you will encounter on site. Here are the main types:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB lock off devices</strong> — clip over the MCB toggle in the OFF position
                and accept a padlock through the hasp. Available in universal designs that fit most
                brands (MK, Hager, Schneider, Wylex, Crabtree) and brand-specific designs for a
                tighter fit. Typically made from glass-filled nylon for durability. Cost around two
                to five pounds each.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fuse carrier lock off bags</strong> — for rewireable fuse boards, the fuse
                carrier is removed and placed in a lockable bag or pouch that accepts a padlock.
                This prevents anyone from reinserting the fuse carrier while you are working on the
                circuit. The bag should be clearly labelled and visible at the distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCCB lock off devices</strong> — moulded case circuit breakers are larger
                than MCBs and require dedicated lock off devices. These typically fit over the MCCB
                handle mechanism and accept a padlock. Some MCCBs have built-in lock off facilities
                with a padlock hasp integrated into the breaker design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolator switch lock off devices</strong> — for rotary isolators, handle-
                operated switches, and main switches. These typically clamp around the handle or fit
                over the switch mechanism to prevent operation. Multi-point lock off hasps allow
                several padlocks to be applied to a single isolator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug lock off devices</strong> — for locking off plug-connected equipment.
                The plug is enclosed in a lockable box or pouch that prevents it from being
                reinserted into the socket. Used for portable appliances and plug-in equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personal padlocks</strong> — each electrician must have their own personal
                padlock with a unique key. Padlocks should be non-conductive (nylon body) or
                insulated, with a hardened steel shackle. Red is the standard colour for danger/
                electrical isolation padlocks. Keep the key on your person at all times — never
                leave it in the lock or give it to someone else.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning tags</strong> — pre-printed "DANGER — DO NOT SWITCH ON" tags with
                space for your name, date, circuit details, and contact information. Available in
                PVC or laminated card for durability. Attach with a cable tie or integral loop
                through the padlock shackle.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep your lock off kit organised in a dedicated bag or pouch within your tool bag. Before
          leaving for any job, check you have the right lock off devices for the type of switchgear
          on site. If you arrive and find switchgear you cannot lock off, do not improvise — obtain
          the correct device before starting work. Carrying a comprehensive lock off kit is as
          essential as carrying your{' '}
          <SEOInternalLink href="/guides/ppe-for-electricians">
            personal protective equipment
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'distribution-board-isolation',
    heading: 'Distribution Board Isolation: A Practical Guide',
    content: (
      <>
        <p>
          Distribution board work — whether a consumer unit change, a periodic inspection, or adding
          a new circuit — requires careful isolation planning. The approach depends on whether you
          need to isolate individual circuits or the entire board:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
            Individual Circuit Isolation
          </h4>
          <ul className="space-y-2 text-white text-sm">
            <li>Switch off the individual MCB protecting the circuit you are working on.</li>
            <li>Apply an MCB lock off device and your personal padlock.</li>
            <li>Attach a warning tag with your details.</li>
            <li>
              Prove dead at the point of work using GS 38 compliant equipment (prove-test-prove).
            </li>
            <li>
              If the circuit may have multiple supplies (e.g., ring final with a spur from another
              board), identify and isolate all supply points.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
            Full Board Isolation (Consumer Unit Change)
          </h4>
          <ul className="space-y-2 text-white text-sm">
            <li>
              Isolate the supply to the board at the upstream point — the main switch, the service
              head isolator, or the DNO cut-out (if a registered electrician authorised to work on
              the supply side).
            </li>
            <li>Apply a lock off device and personal padlock to the upstream isolator.</li>
            <li>
              Attach a warning tag. Consider also locking off the main switch on the board itself as
              a secondary precaution.
            </li>
            <li>
              Prove dead on the supply tails at the board — both line and neutral, between all
              conductors.
            </li>
            <li>
              For consumer unit changes, consider energy stored in capacitors or batteries (e.g.,
              UPS or{' '}
              <SEOInternalLink href="/guides/ev-charger-installation-guide">
                EV charger
              </SEOInternalLink>{' '}
              systems) that may maintain voltage even after the mains supply is isolated.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Critical Warning: Multiple Supplies</h4>
              <p className="text-white text-sm leading-relaxed">
                Always check for multiple sources of supply. A distribution board may be fed from
                more than one source — a main incoming supply plus a generator, solar PV inverter,
                battery storage system, or a secondary supply from another building. All sources
                must be identified and isolated. Failure to identify a secondary supply is one of
                the most dangerous mistakes an electrician can make during isolation.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'multi-lock-situations',
    heading: 'Multi-Lock & Group Isolation Procedures',
    content: (
      <>
        <p>
          When multiple electricians or tradespeople need to work on the same isolated circuit or
          equipment simultaneously, a multi-lock hasp system is used. This ensures that the circuit
          remains isolated until every person has completed their work and removed their personal
          lock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-lock hasp</strong> — a device that accepts multiple padlocks
                (typically 4, 6, or 8). The hasp is fitted to the lock off device at the point of
                isolation. Each person working on the circuit applies their own personal padlock to
                the hasp. The isolating device cannot be operated until all padlocks have been
                removed. This ensures that no one can re-energise the circuit while any person is
                still working on it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group lock box</strong> — for complex isolations involving multiple points
                of isolation (e.g., a machine with several electrical, pneumatic, and hydraulic
                supplies), a group lock box is used. The keys from all the isolation point padlocks
                are placed in a lock box, and each person working on the equipment applies their
                personal padlock to the lock box. The isolation point padlocks cannot be removed
                until the lock box is opened, which requires all personal padlocks to be removed
                first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit to work system</strong> — on commercial and industrial sites,
                multi-lock LOTO is often managed through a formal permit to work (PTW) system. The
                responsible person (authorised person) issues a permit that specifies the isolation
                points, the lock off requirements, the people authorised to work, and the conditions
                for re-energisation. The permit is not cancelled until all locks have been removed
                and all persons have signed off.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fundamental rule of multi-lock LOTO is simple: each person applies their own lock, and
          only that person can remove it. If someone finishes work and leaves site before removing
          their lock, the circuit must remain isolated until they return. Never remove another
          person's lock — even if you believe they have finished and forgotten to remove it. Contact
          them and arrange for them to return and remove it personally.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common LOTO Mistakes Electricians Make',
    content: (
      <>
        <p>LOTO errors can be fatal. Here are the most common mistakes and how to avoid them:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not locking off at all</strong> — the most dangerous mistake. Switching off
                an MCB without applying a lock off device is not safe isolation. Anyone can walk
                past and switch it back on. This is especially common on domestic work where
                electricians assume "no one else is around" — but homeowners, family members, and
                other tradespeople can and do switch circuits back on without checking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolating the wrong circuit</strong> — relying on circuit labels that are
                incorrect or outdated. Always prove dead at the point of work, not just at the
                distribution board. If the circuit labelling is unclear, use a circuit
                identification tool or trace the circuit manually before starting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not proving dead</strong> — applying a lock off device but not proving the
                circuit is dead with GS 38 compliant test equipment. The lock off device prevents
                re-energisation, but proving dead confirms the isolation is effective. You may have
                isolated the wrong circuit, or there may be a second supply feeding the equipment.
                Always prove dead using the prove-test-prove method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using a shared-key padlock</strong> — using a padlock from a set where
                multiple keys exist, or a combination lock where the code is known to others. If
                someone else can unlock your padlock, the entire LOTO system is compromised. Each
                person must have a unique-key personal padlock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Removing someone else's lock</strong> — even with good intentions, removing
                another person's padlock because "they forgot" or "they have left for the day" is
                potentially lethal. That person may still be working on the circuit in another part
                of the building. Never remove another person's lock under any circumstances without
                first verifying with them directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting stored energy</strong> — capacitors, batteries, UPS systems,
                solar PV, and{' '}
                <SEOInternalLink href="/guides/arc-flash-protection">
                  equipment with high fault current capability
                </SEOInternalLink>{' '}
                can maintain dangerous voltages even after the mains supply is isolated. Always
                consider and discharge stored energy sources before starting work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'digital-loto',
    heading: 'Digital LOTO: AI Tools and Modern Safety Documentation',
    content: (
      <>
        <p>
          The LOTO procedure itself is a physical, hands-on process — you cannot digitise the act of
          applying a padlock to an MCB. However, the documentation, planning, and compliance aspects
          of LOTO can be significantly improved with digital tools and AI.
        </p>
        <p>
          Elec-Mate's AI Health and Safety agent can generate complete LOTO-specific documentation
          including:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation method statements</strong> — step-by-step procedures tailored
                to the specific installation, covering circuit identification, isolation points,
                lock off device selection, proving dead sequence, and re-energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/risk-assessment-electricians">
                    Risk assessments
                  </SEOInternalLink>
                </strong>{' '}
                — covering the specific hazards of the isolation process, including electric shock
                from incorrect isolation, arc flash from operating switchgear, and stored energy
                hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit to work templates</strong> — for commercial and industrial work
                requiring formal permits, the AI generates pre-filled permits with the correct
                isolation points, safety precautions, and authorisation fields.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and competence records</strong> — Elec-Mate's training courses
                include{' '}
                <SEOInternalLink href="/training/working-at-height">
                  working at height
                </SEOInternalLink>
                ,{' '}
                <SEOInternalLink href="/training/manual-handling">manual handling</SEOInternalLink>,
                asbestos awareness, and site safety — all of which contribute to the competence
                needed to carry out safe isolation and LOTO procedures.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The <SEOInternalLink href="/tools/rams-generator">RAMS generator tool</SEOInternalLink>{' '}
          combines the{' '}
          <SEOInternalLink href="/guides/method-statement-electricians">
            method statement
          </SEOInternalLink>{' '}
          and risk assessment into a single RAMS package, ready for submission to main contractors
          or for your own site records. This is particularly valuable when working on commercial
          sites where principal contractors require evidence of LOTO procedures before granting
          access.
        </p>
        <SEOAppBridge
          title="Generate RAMS with built-in LOTO procedures"
          description="Elec-Mate's AI Health and Safety agent creates complete RAMS packages with detailed safe isolation and lock off/tagout procedures. Describe your job and get a professional document covering all hazards, control measures, and step-by-step LOTO instructions. Used by 430+ UK electricians."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LockOffLOTOPage() {
  return (
    <GuideTemplate
      title="Lock Off / LOTO Procedure for Electricians | Complete Guide"
      description="Complete guide to lockout/tagout (LOTO) for electricians. Step-by-step lock off procedure, MCB lock off devices, distribution board isolation, multi-lock hasps, legal requirements under the Electricity at Work Regulations 1989, and common LOTO mistakes to avoid."
      datePublished="2025-04-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Lock}
      heroTitle={
        <>
          Lock Off / LOTO Procedure:{' '}
          <span className="text-yellow-400">The Complete Guide for Electricians</span>
        </>
      }
      heroSubtitle="Lockout/tagout is the single most important procedure for preventing electrical fatalities. Step-by-step LOTO process, lock off device selection, distribution board isolation, multi-lock procedures, legal requirements, and common mistakes that cost lives."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Lock Off / LOTO for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Safe Isolation Documentation in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Health and Safety agent to create LOTO-specific risk assessments, method statements, and RAMS packages. Describe the job, get a complete document. 7-day free trial, cancel anytime."
    />
  );
}
