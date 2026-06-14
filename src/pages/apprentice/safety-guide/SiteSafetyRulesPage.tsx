import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Shield, Users, IdCard } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const SiteSafetyRulesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/safety-fundamentals')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Safety"
          title="Site safety rules"
          description="The rules every site has, and why. From sign-in to PPE policy to first-aid points — knowing the rules keeps you on site, and knowing why they exist keeps you alive."
          tone="yellow"
        />
      </motion.div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-white">How Sites Stay Safe</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Construction sites are controlled environments with strict rules to protect everyone on
            site. These rules come from legislation (primarily the{' '}
            <span className="font-semibold text-elec-yellow">
              Construction (Design and Management) Regulations 2015
            </span>
            ), the principal contractor's site rules, and your employer's own safety procedures. As
            an apprentice, you must follow all site rules — ignorance is not an excuse, and breaking
            rules can result in being removed from site.
          </p>
        </div>
      </div>

      {/* Site Inductions */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Site Inductions</h2>
          <p className="text-white text-sm leading-relaxed">
            Before you start work on any new site, you must complete a site induction. This is a
            legal requirement under CDM 2015. The induction is delivered by the principal contractor
            (or client on smaller sites) and covers everything you need to know to work safely on
            that particular site.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">What a Site Induction Covers</h3>
            {[
              'Site layout: access routes, restricted areas, material storage, parking',
              'Emergency procedures: assembly points, fire alarm sounds, evacuation routes',
              'First aid: location of first aid kit, names of first aiders, nearest hospital',
              'Welfare facilities: toilets, washing, drying room, canteen, drinking water',
              'PPE requirements: what you must wear on this specific site',
              'Site-specific hazards: asbestos locations, overhead power lines, buried services, contaminated ground',
              'Working hours and break times',
              'Signing in/out procedures — you must sign in every day',
              'Permit-to-work requirements',
              'Environmental rules: waste management, dust control, noise restrictions',
              'Drug and alcohol policy',
              'Mobile phone policy',
              'Reporting procedures: who to report accidents, near misses, and hazards to',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">Tip: </span>
              Take notes during your induction. Keep your induction card safe — you may need to show
              it to prove you have been inducted. If you lose it, get a replacement before returning
              to site.
            </p>
          </div>
        </div>
      </div>

      {/* CSCS / ECS Cards */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <IdCard className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-elec-yellow">CSCS and ECS Cards</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Almost all UK construction sites require you to hold a valid competence card to gain
            access. For electricians, there are two relevant schemes:
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'CSCS — Construction Skills Certification Scheme',
                points: [
                  'The general construction industry card scheme',
                  'Required on the majority of UK construction sites',
                  'You need to pass the CITB Health, Safety and Environment (HS&E) test to get a card',
                  'Card types are set by qualification and role — for example a Green Labourer card, a blue Skilled Worker card, or a black Manager card',
                  'As an apprentice on an approved programme, you typically hold a red Apprentice card (or, if registered for the ECS scheme, the ECS Apprentice card below)',
                  'The HS&E test is multiple choice and can be booked through the CITB at Pearson VUE test centres',
                  'CSCS cards are generally valid for 5 years and must be renewed before they expire',
                ],
              },
              {
                title: 'ECS — Electrotechnical Certification Scheme',
                points: [
                  'The electrical-specific card scheme, managed by the JIB (Joint Industry Board)',
                  'A CSCS Alliance partner card scheme — carries the CSCS logo and is accepted on CSCS sites',
                  'As an apprentice, you hold an ECS Apprentice card',
                  'Your training provider or employer usually applies for this on your behalf',
                  'Once qualified, you move to the relevant grade card, such as an ECS Installation Electrician (Gold) card',
                  'The ECS card proves your identity, qualifications, and competence level',
                  'Cards are linked to the JIB register and can be verified online or with the ECS card-checker app',
                  'You also need to pass the CITB HS&E test to get an ECS card',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 space-y-3"
              >
                <h3 className="font-semibold text-elec-yellow text-sm">{card.title}</h3>
                <div className="space-y-1">
                  {card.points.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-xs text-white">
                      <CheckCircle2 className="h-3 w-3 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">Important: </span>
              Always carry your CSCS or ECS card on site. You may be asked to show it at any time
              during random checks. If you do not have a valid card, you can be refused entry to
              site.
            </p>
          </div>
        </div>
      </div>

      {/* Permits to Work */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Permits to Work</h2>
          <p className="text-white text-sm leading-relaxed">
            A permit-to-work (PTW) is a formal document that authorises specific high-risk work to
            take place under controlled conditions. It is not a risk assessment — it works alongside
            the risk assessment and method statement. The permit system ensures that the right
            checks have been done and the right people have authorised the work.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Common Permits in Electrical Work</h3>
            {[
              {
                permit: 'Electrical Isolation Permit',
                detail:
                  'Required before working on or near live systems. Confirms the supply has been isolated, locked off, and tested dead. Often used on commercial and industrial sites.',
              },
              {
                permit: 'Hot Works Permit',
                detail:
                  'Required for any work involving open flames, sparks, or high temperatures. This includes soldering, brazing, grinding, and cutting. A fire watch must be maintained for at least 60 minutes after hot works cease.',
              },
              {
                permit: 'Working at Height Permit',
                detail:
                  'Required on some sites for higher-risk work at height (many sites set their own trigger, often around 2 metres, but the Work at Height Regulations 2005 apply to any height where a fall could cause injury — there is no minimum). Confirms the risk assessment has been reviewed, the access equipment is inspected, and rescue procedures are in place.',
              },
              {
                permit: 'Confined Space Entry Permit',
                detail:
                  'Required before entering any confined space — cable ducts, risers, ceiling voids with limited access, or underground chambers. Confirms atmosphere testing, rescue plan, and communication procedures are in place.',
              },
              {
                permit: 'Excavation / Breaking Ground Permit',
                detail:
                  'Required before digging trenches for cable routes. Confirms that CAT scanning and service plans have been checked. Striking an underground cable or gas main can be fatal.',
              },
            ].map((item) => (
              <div
                key={item.permit}
                className="rounded-md border border-white/[0.08] bg-[hsl(0_0%_12%)] p-3"
              >
                <h4 className="text-white font-semibold text-sm mb-1">{item.permit}</h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Permit Rules</h3>
            {[
              'Never start work without the required permit being issued and signed',
              'Read the permit conditions carefully — they specify exactly what work is authorised',
              'The permit has a start and end time — work must stop when it expires',
              'Keep the permit at the work location — it must be visible and accessible',
              'When work is complete, the permit must be formally closed/cancelled',
              'If conditions change, the permit may need to be re-issued',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CDM Overview */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">CDM Regulations 2015</h2>
          <p className="text-white text-sm leading-relaxed">
            The Construction (Design and Management) Regulations 2015 are the main set of
            regulations governing health and safety on construction sites. They define who is
            responsible for what, and apply to all construction work — from a domestic extension to
            a major development.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Key Duty Holders</h3>
            {[
              {
                role: 'Client',
                duty: 'The person or organisation paying for the work. Must ensure adequate time, resources, and information are provided for the project to be carried out safely.',
              },
              {
                role: 'Principal Designer',
                duty: 'Plans, manages, and coordinates health and safety during the pre-construction (design) phase. Ensures foreseeable risks are eliminated, reduced or controlled through design decisions where possible. Required whenever more than one contractor is involved.',
              },
              {
                role: 'Principal Contractor',
                duty: 'Plans, manages, and coordinates health and safety during the construction phase. Responsible for site inductions, the construction phase plan, and coordination between contractors.',
              },
              {
                role: 'Contractor (Your Employer)',
                duty: 'Must plan and manage their own work safely, provide information and training, ensure workers are competent and properly supervised.',
              },
              {
                role: 'Worker (You)',
                duty: 'Must cooperate with others, report unsafe conditions, follow site rules, and not put yourself or others at risk.',
              },
            ].map((item) => (
              <div
                key={item.role}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3"
              >
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">{item.role}</h4>
                <p className="text-white text-xs">{item.duty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Welfare */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-elec-yellow">Welfare Facilities</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            On construction sites, welfare is governed by CDM 2015 (regulation 13 and Schedule 2),
            which requires your employer — or the principal contractor on multi-employer sites — to
            provide adequate welfare facilities from the very start of the project. You have a legal
            right to these — do not accept substandard provision.
          </p>

          <div className="space-y-2">
            {[
              'Toilets: Clean, adequate number, separate for men and women (or lockable individual units). Must have hand washing with soap and hot water or hand sanitiser.',
              'Washing facilities: Running hot and cold water, soap, towels or hand dryers. Showers must be provided where work involves heavy contamination.',
              'Drinking water: Free, clean drinking water must be available at all times. Clearly marked as drinking water if taps are nearby that are not.',
              'Rest area: A heated, sheltered space to eat meals and take breaks. Must have seating, a means of heating food (microwave), and a means of boiling water.',
              'Changing and drying facilities: Somewhere to change if you need to wear specific work clothing. Drying facilities for wet clothing.',
              'Storage: Secure storage for personal belongings (lockable locker or vehicle access).',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">If facilities are inadequate: </span>
              Speak to your supervisor first. If nothing changes, you can report it to the HSE.
              Workers have been seriously ill from inadequate welfare — Weil's disease
              (leptospirosis) from rat-contaminated water, and skin conditions from lack of washing
              facilities.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbox Talks */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Toolbox Talks</h2>
          <p className="text-white text-sm leading-relaxed">
            A toolbox talk is a short (5–15 minute) safety briefing given to workers, usually at the
            start of the day or before a specific task. They cover a single safety topic and are an
            opportunity to discuss hazards relevant to the current work.
          </p>

          <div className="space-y-2">
            {[
              'Attend all toolbox talks — they are not optional',
              'Listen actively and ask questions if anything is unclear',
              'Sign the attendance register — this is a legal record',
              'Common topics: safe isolation, working at height, manual handling, fire safety, asbestos awareness, electrical safety, housekeeping',
              'Toolbox talks count towards your off-the-job training hours',
              'If you see an issue that could be a toolbox talk topic, suggest it to your supervisor',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Site Rules */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Common Site Rules</h2>
          <p className="text-white text-sm leading-relaxed">
            While each site has its own specific rules, the following are standard across most UK
            construction sites:
          </p>

          <div className="space-y-3">
            {[
              {
                rule: 'Alcohol and Drugs',
                detail:
                  'Zero tolerance on virtually all sites. Random testing is increasingly common. Being under the influence of alcohol or drugs on site is a sackable offence and may result in loss of your ECS card. This includes the morning after heavy drinking — you may still be over the limit.',
              },
              {
                rule: 'Mobile Phones',
                detail:
                  'Most sites ban mobile phone use in work areas. Phones are a major distraction and have contributed to accidents. Use your phone only during breaks in the welfare area. Some sites require phones to be left in lockers.',
              },
              {
                rule: 'Smoking and Vaping',
                detail:
                  'Smoking and vaping are restricted to designated areas only. Never smoke near flammable materials, gas supplies, or oxygen cylinders. Dispose of cigarette ends properly — they are a fire risk.',
              },
              {
                rule: 'Housekeeping',
                detail:
                  'Keep your work area clean and tidy. Remove waste, offcuts, and packaging regularly. Store materials securely. Trailing cables must be routed safely or protected. Good housekeeping prevents trips, falls, and fire.',
              },
              {
                rule: 'Speed Limits',
                detail:
                  'On larger sites, vehicle speed limits (typically 5 or 10 mph) apply. When walking, use designated pedestrian routes. High-vis must be worn in vehicle movement areas at all times.',
              },
              {
                rule: 'Photography',
                detail:
                  'Many sites prohibit photography without permission. This is for security and commercial reasons. Always ask before taking photos — even for your portfolio.',
              },
              {
                rule: 'Visitors',
                detail:
                  'All visitors must be signed in, inducted, and accompanied. If someone appears on site without PPE or without having signed in, inform a supervisor.',
              },
            ].map((item) => (
              <div
                key={item.rule}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3"
              >
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">{item.rule}</h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PUWER — Tools & Equipment */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">
            Tools and Equipment — PUWER 1998
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Provision and Use of Work Equipment Regulations 1998 (PUWER) cover every tool and
            piece of equipment you use on site — from a cordless drill to a podium step. Your
            employer must provide equipment that is suitable, maintained, inspected, and used only
            by people who are trained and competent to operate it.
          </p>

          <div className="space-y-2">
            {[
              'Only use equipment you have been trained and authorised to use — never an unfamiliar machine',
              'Inspect tools before each use: look for damage, cracked casings, frayed or exposed cables, and missing guards',
              'Never remove or defeat a guard, interlock, or other safety device',
              'On UK construction sites, portable electric tools are normally 110 V centre-tapped (reduced low voltage) fed from a transformer — not 230 V — to limit shock severity',
              'Battery tools and lower-voltage equipment are increasingly used to remove the trailing-lead hazard altogether',
              'Check that portable equipment has an in-date inspection/PAT label where your site requires it',
              'Report any damaged or defective tool immediately and take it out of use — label it and quarantine it so no one else picks it up',
              'Use the right tool for the job — improvising is a common cause of injury',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Signage */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Safety Signs on Site</h2>
          <p className="text-white text-sm leading-relaxed">
            Safety signs are governed by the Health and Safety (Safety Signs and Signals)
            Regulations 1996, with the symbols themselves standardised in BS EN ISO 7010. The colour
            and shape tell you what the sign means before you even read the words — learn them.
          </p>

          <div className="space-y-3">
            {[
              {
                sign: 'Prohibition — red circle with a diagonal bar',
                detail:
                  'Tells you a behaviour is not allowed. For example "No entry", "No smoking", or "Do not operate".',
              },
              {
                sign: 'Warning — yellow triangle, black border',
                detail:
                  'Warns of a hazard. For example "Danger — electricity", "Risk of falling", or "Overhead load".',
              },
              {
                sign: 'Mandatory — blue circle',
                detail:
                  'Tells you something you must do. For example "Eye protection must be worn" or "Hard hats must be worn".',
              },
              {
                sign: 'Safe condition / emergency — green rectangle',
                detail:
                  'Shows the safe option: fire exits, escape routes, first-aid points, and assembly areas.',
              },
              {
                sign: 'Fire equipment — red rectangle',
                detail:
                  'Identifies firefighting equipment such as extinguishers, hose reels, and fire alarm call points.',
              },
            ].map((item) => (
              <div
                key={item.sign}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3"
              >
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">{item.sign}</h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">On the tools: </span>
              When you isolate a circuit, your caution/danger notice and lock-off are part of this
              system — never remove someone else's lock or warning label, and never ignore one.
            </p>
          </div>
        </div>
      </div>

      {/* Manual Handling */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Manual Handling</h2>
          <p className="text-white text-sm leading-relaxed">
            The Manual Handling Operations Regulations 1992 (as amended) require hazardous manual
            handling to be avoided where reasonably practicable; where it cannot be avoided, the
            risk must be assessed and reduced. In electrical work the usual culprits are cable
            drums, distribution boards, full conduit and tray, and bags of fixings. Back and
            musculoskeletal injuries are among the most common long-term injuries in the trade.
          </p>

          <div className="space-y-2">
            {[
              'There is no single "safe" maximum weight in law — the regulations use risk assessment, not a fixed limit. HSE guideline filters are far lower than people expect, and they drop sharply when you reach, twist, or lift above shoulder height or below knee height',
              'Think before you lift: can it be split into smaller loads, moved with a trolley or cable roller, or lifted by two people?',
              'Plan the route — clear trip hazards and know where you are setting the load down before you pick it up',
              'Get a stable stance, bend at the hips and knees (not the back), keep the load close to your body, and lift smoothly',
              'Never twist while carrying — move your feet to turn',
              'Heavy cable drums should be rolled or moved with proper equipment, never carried',
              'As an apprentice, do not let anyone pressure you into a lift that feels unsafe — ask for help or a mechanical aid',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Legal Duties */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Your Legal Duties as a Worker</h2>
          <p className="text-white text-sm leading-relaxed">
            Under the Health and Safety at Work Act 1974 (Sections 7 and 8), you have legal duties
            as a worker. These are not optional — breaching them can result in prosecution, fines,
            and even imprisonment.
          </p>

          <div className="space-y-2">
            {[
              'Take reasonable care for your own health and safety',
              'Take reasonable care for the health and safety of others who may be affected by your actions',
              'Cooperate with your employer on health and safety matters',
              'Do not interfere with or misuse anything provided for health and safety (fire extinguishers, guard rails, safety equipment)',
              'Report any dangerous situations, defective equipment, or unsafe practices',
              'Use equipment and substances in accordance with your training and the instructions provided',
              'Attend health and safety training provided by your employer',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right to Refuse */}
      <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
        <div className="p-4 sm:p-5 space-y-3">
          <h2 className="text-lg font-semibold text-elec-yellow">
            Your Right to Refuse Unsafe Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            You have the legal right to step back from work that you reasonably believe poses a
            serious and imminent danger to you or others. Under the Employment Rights Act 1996, your
            employer cannot subject you to any detriment (section 44) or dismiss you (section 100)
            for raising legitimate health and safety concerns or for leaving a dangerous situation.
            If you are pressured to do unsafe work, speak to your supervisor, your training
            provider, your union, or call the HSE.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5">
          <p className="text-white text-xs leading-relaxed">
            Based on the Construction (Design and Management) Regulations 2015, the Health and
            Safety at Work etc. Act 1974, the Provision and Use of Work Equipment Regulations 1998,
            the Manual Handling Operations Regulations 1992, the Health and Safety (Safety Signs and
            Signals) Regulations 1996, the Work at Height Regulations 2005, the Employment Rights
            Act 1996, and CITB/JIB guidance for the construction industry. Site-specific rules may
            vary — always follow the site induction and your principal contractor's requirements.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default SiteSafetyRulesPage;
