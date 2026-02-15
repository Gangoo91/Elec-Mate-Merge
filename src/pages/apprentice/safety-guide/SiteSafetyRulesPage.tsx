import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, AlertTriangle, Shield, Users } from 'lucide-react';

const SiteSafetyRulesPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Site Safety Rules
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">
              How Sites Stay Safe
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Construction sites are controlled environments with strict rules to
            protect everyone on site. These rules come from legislation (primarily
            the{' '}
            <span className="font-semibold text-purple-400">
              CDM Regulations 2015
            </span>
            ), the principal contractor's site rules, and your employer's own safety
            procedures. As an apprentice, you must follow all site rules — ignorance
            is not an excuse, and breaking rules can result in being removed from
            site.
          </p>
        </CardContent>
      </Card>

      {/* Site Inductions */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Site Inductions
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Before you start work on any new site, you must complete a site
            induction. This is a legal requirement under CDM 2015. The induction
            is delivered by the principal contractor (or client on smaller sites)
            and covers everything you need to know to work safely on that
            particular site.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              What a Site Induction Covers
            </h3>
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-blue-400">Tip: </span>
              Take notes during your induction. Keep your induction card safe — you
              may need to show it to prove you have been inducted. If you lose it,
              get a replacement before returning to site.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CSCS / ECS Cards */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            CSCS and ECS Cards
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Almost all UK construction sites require you to hold a valid
            competence card to gain access. For electricians, there are two
            relevant schemes:
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'CSCS — Construction Skills Certification Scheme',
                colour: 'text-blue-400',
                border: 'border-blue-500/20',
                bg: 'bg-blue-500/10',
                points: [
                  'The general construction industry card scheme',
                  'Required on the majority of UK construction sites',
                  'You need to pass the CITB Health, Safety and Environment (HS&E) test to get a card',
                  'Different card colours for different levels: Green (labourer), Blue (skilled worker), Gold (supervisor), Black (manager)',
                  'As an apprentice, you may hold a Red CSCS Trainee card or a Provisional card',
                  'The HS&E test is multiple choice and can be booked at Pearson VUE test centres',
                  'Cards are valid for 5 years and must be renewed',
                ],
              },
              {
                title: 'ECS — Electrotechnical Certification Scheme',
                colour: 'text-green-400',
                border: 'border-green-500/20',
                bg: 'bg-green-500/10',
                points: [
                  'The electrical-specific card scheme, managed by the JIB (Joint Industry Board)',
                  'Recognised as a CSCS-affiliated scheme — accepted on CSCS sites',
                  'As an apprentice, you hold a White ECS Apprentice card',
                  'Your training provider or employer usually applies for this on your behalf',
                  'Once qualified, you move to a Gold ECS Installation Electrician card',
                  'The ECS card proves your identity, qualifications, and competence level',
                  'Cards are linked to the JIB register and can be verified online',
                  'You also need to pass the CITB HS&E test to get an ECS card',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`${card.bg} ${card.border} border rounded-lg p-4 space-y-3`}
              >
                <h3 className={`font-semibold ${card.colour} text-sm`}>
                  {card.title}
                </h3>
                <div className="space-y-1">
                  {card.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 text-xs text-white"
                    >
                      <CheckCircle className={`h-3 w-3 ${card.colour} flex-shrink-0 mt-0.5`} />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-amber-400">Important: </span>
              Always carry your CSCS or ECS card on site. You may be asked to show
              it at any time during random checks. If you do not have a valid card,
              you can be refused entry to site.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Permits to Work */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            Permits to Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            A permit-to-work (PTW) is a formal document that authorises specific
            high-risk work to take place under controlled conditions. It is not a
            risk assessment — it works alongside the risk assessment and method
            statement. The permit system ensures that the right checks have been
            done and the right people have authorised the work.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Common Permits in Electrical Work
            </h3>
            {[
              {
                permit: 'Electrical Isolation Permit',
                detail: 'Required before working on or near live systems. Confirms the supply has been isolated, locked off, and tested dead. Often used on commercial and industrial sites.',
              },
              {
                permit: 'Hot Works Permit',
                detail: 'Required for any work involving open flames, sparks, or high temperatures. This includes soldering, brazing, grinding, and cutting. A fire watch must be maintained for at least 60 minutes after hot works cease.',
              },
              {
                permit: 'Working at Height Permit',
                detail: 'Required on some sites for any work above 2 metres. Confirms the risk assessment has been reviewed, the access equipment is inspected, and rescue procedures are in place.',
              },
              {
                permit: 'Confined Space Entry Permit',
                detail: 'Required before entering any confined space — cable ducts, risers, ceiling voids with limited access, or underground chambers. Confirms atmosphere testing, rescue plan, and communication procedures are in place.',
              },
              {
                permit: 'Excavation / Breaking Ground Permit',
                detail: 'Required before digging trenches for cable routes. Confirms that CAT scanning and service plans have been checked. Striking an underground cable or gas main can be fatal.',
              },
            ].map((item) => (
              <div
                key={item.permit}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <h4 className="text-red-400 font-semibold text-sm mb-1">
                  {item.permit}
                </h4>
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CDM Overview */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-purple-400">
            CDM Regulations 2015
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Construction (Design and Management) Regulations 2015 are the main
            set of regulations governing health and safety on construction sites.
            They define who is responsible for what, and apply to all construction
            work — from a domestic extension to a major development.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Key Duty Holders
            </h3>
            {[
              {
                role: 'Client',
                duty: 'The person or organisation paying for the work. Must ensure adequate time, resources, and information are provided for the project to be carried out safely.',
              },
              {
                role: 'Principal Designer',
                duty: 'Plans, manages, and coordinates health and safety during the design phase. Ensures risks are designed out where possible.',
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
                className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3"
              >
                <h4 className="text-purple-400 font-semibold text-sm mb-1">
                  {item.role}
                </h4>
                <p className="text-white text-xs">{item.duty}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Welfare */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-blue-400">
              Welfare Facilities
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            CDM 2015 and the Workplace (Health, Safety and Welfare) Regulations
            1992 require your employer (or the principal contractor on multi-employer
            sites) to provide adequate welfare facilities. You have a legal right
            to these — do not accept substandard provision.
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-blue-400">
                If facilities are inadequate:{' '}
              </span>
              Speak to your supervisor first. If nothing changes, you can report
              it to the HSE. Workers have been seriously ill from inadequate
              welfare — Weil's disease (leptospirosis) from rat-contaminated
              water, and skin conditions from lack of washing facilities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Toolbox Talks */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            Toolbox Talks
          </h2>
          <p className="text-white text-sm leading-relaxed">
            A toolbox talk is a short (5–15 minute) safety briefing given to
            workers, usually at the start of the day or before a specific task.
            They cover a single safety topic and are an opportunity to discuss
            hazards relevant to the current work.
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Site Rules */}
      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">
            Common Site Rules
          </h2>
          <p className="text-white text-sm leading-relaxed">
            While each site has its own specific rules, the following are standard
            across most UK construction sites:
          </p>

          <div className="space-y-3">
            {[
              {
                rule: 'Alcohol and Drugs',
                detail: 'Zero tolerance on virtually all sites. Random testing is increasingly common. Being under the influence of alcohol or drugs on site is a sackable offence and may result in loss of your ECS card. This includes the morning after heavy drinking — you may still be over the limit.',
              },
              {
                rule: 'Mobile Phones',
                detail: 'Most sites ban mobile phone use in work areas. Phones are a major distraction and have contributed to accidents. Use your phone only during breaks in the welfare area. Some sites require phones to be left in lockers.',
              },
              {
                rule: 'Smoking and Vaping',
                detail: 'Smoking and vaping are restricted to designated areas only. Never smoke near flammable materials, gas supplies, or oxygen cylinders. Dispose of cigarette ends properly — they are a fire risk.',
              },
              {
                rule: 'Housekeeping',
                detail: 'Keep your work area clean and tidy. Remove waste, offcuts, and packaging regularly. Store materials securely. Trailing cables must be routed safely or protected. Good housekeeping prevents trips, falls, and fire.',
              },
              {
                rule: 'Speed Limits',
                detail: 'On larger sites, vehicle speed limits (typically 5 or 10 mph) apply. When walking, use designated pedestrian routes. High-vis must be worn in vehicle movement areas at all times.',
              },
              {
                rule: 'Photography',
                detail: 'Many sites prohibit photography without permission. This is for security and commercial reasons. Always ask before taking photos — even for your portfolio.',
              },
              {
                rule: 'Visitors',
                detail: 'All visitors must be signed in, inducted, and accompanied. If someone appears on site without PPE or without having signed in, inform a supervisor.',
              },
            ].map((item) => (
              <div
                key={item.rule}
                className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3"
              >
                <h4 className="text-amber-400 font-semibold text-sm mb-1">
                  {item.rule}
                </h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Legal Duties */}
      <Card className="border-red-500/20 bg-red-500/10">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            Your Legal Duties as a Worker
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Under the Health and Safety at Work Act 1974 (Sections 7 and 8), you
            have legal duties as a worker. These are not optional — breaching
            them can result in prosecution, fines, and even imprisonment.
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Right to Refuse */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-sm font-semibold text-green-400">
            Your Right to Refuse Unsafe Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            You have the legal right to refuse work that you reasonably believe
            poses a serious and imminent danger to you or others. Your employer
            cannot dismiss you or subject you to any detriment for raising
            legitimate safety concerns (Employment Rights Act 1996, Section 44).
            If you are pressured to do unsafe work, speak to your training
            provider, your union, or call the HSE.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Based on the Construction (Design and Management) Regulations 2015,
            Health and Safety at Work Act 1974, Workplace (Health, Safety and
            Welfare) Regulations 1992, and CITB guidance for the construction
            industry. Site-specific rules may vary — always follow the site
            induction and your principal contractor's requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSafetyRulesPage;
