import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, AlertTriangle, Phone } from 'lucide-react';

const EmergencyProceduresPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Emergency Procedures
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-red-400">
              Know What to Do Before It Happens
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            In an emergency, you will not have time to look up what to do. You
            need to know these procedures{' '}
            <span className="font-bold text-red-400">before</span> you need them.
            Read through each section, understand the steps, and practise them
            mentally. When you arrive on a new site, always find out where the
            first aid kit, fire extinguishers, assembly point, and nearest phone
            are located.
          </p>
        </CardContent>
      </Card>

      {/* Electric Shock */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            Electric Shock Response
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Electric shock can cause cardiac arrest, burns, muscle contractions,
            and falls. The severity depends on the current path through the body,
            the duration of contact, and the voltage level. A current as low as
            30mA across the heart can be fatal.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-bold text-sm mb-3">
              DO NOT TOUCH THE CASUALTY UNTIL THE SUPPLY IS ISOLATED
            </h3>
            <p className="text-white text-sm">
              If someone is in contact with a live conductor, touching them will
              make you a second casualty. You must break the contact first.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Step-by-Step Response
            </h3>
            {[
              {
                step: 1,
                title: 'Ensure Your Own Safety',
                detail: 'Do not rush in. Assess the scene. Is the supply still on? Is there water on the floor? Are there other hazards? You cannot help anyone if you become a casualty yourself.',
              },
              {
                step: 2,
                title: 'Isolate the Supply',
                detail: 'Switch off the power at the nearest isolator, consumer unit, or distribution board. If you cannot reach the switch, pull the plug out. If you cannot isolate, use a dry, non-conductive object (wooden broom handle, dry clothing, rubber mat) to push the casualty away from the source. NEVER use anything metal or wet.',
              },
              {
                step: 3,
                title: 'Call 999 Immediately',
                detail: 'Ask for an ambulance. Tell them it is an electrical injury. State the location clearly. If on a construction site, send someone to meet the ambulance at the site entrance and guide them in.',
              },
              {
                step: 4,
                title: 'Check for Response',
                detail: "Tap the casualty's shoulders and shout \"Are you okay?\" If there is no response, check for breathing by tilting the head back, lifting the chin, and looking, listening, and feeling for breaths for up to 10 seconds.",
              },
              {
                step: 5,
                title: 'Start CPR if Needed',
                detail: 'If the casualty is not breathing normally, start CPR immediately. Give 30 chest compressions followed by 2 rescue breaths. Push hard and fast in the centre of the chest at a rate of 100–120 compressions per minute, at a depth of 5–6cm. Continue the 30:2 cycle until help arrives or the casualty starts breathing.',
              },
              {
                step: 6,
                title: 'Use an AED if Available',
                detail: 'If an Automated External Defibrillator (AED) is available, send someone to fetch it immediately. Turn it on and follow the voice prompts. AEDs are safe to use — they will only deliver a shock if the heart rhythm requires it. Do not stop CPR while waiting for the AED. Attach the pads as shown on the device.',
              },
              {
                step: 7,
                title: 'Treat for Shock and Burns',
                detail: 'Once the casualty is breathing, place them in the recovery position. Keep them warm with a blanket or jacket. Check for entry and exit burns (current enters and exits the body at different points). Do not apply creams or remove stuck clothing from burns. Cover burns loosely with cling film or a clean, non-fluffy dressing.',
              },
              {
                step: 8,
                title: 'Do Not Leave the Casualty',
                detail: 'Stay with the casualty until the ambulance arrives. Monitor their breathing. Be prepared to restart CPR if they stop breathing. Note the time of the incident and what happened — the paramedics will need this information.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="border border-red-500/20 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                </div>
                <p className="text-white text-sm">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-blue-400">Important: </span>
              Even if the casualty seems fine after an electric shock, they{' '}
              <span className="font-bold">must</span> go to hospital. Cardiac
              arrhythmias can develop hours after the initial shock. All electric
              shock casualties should be monitored with an ECG.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Electrical Fire */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-orange-400">
            Electrical Fire Response
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Electrical fires can be caused by overloaded circuits, damaged wiring,
            loose connections, or faulty equipment. They require specific handling
            because water and some extinguishers can conduct electricity and make
            the situation much worse.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-bold text-sm mb-2">
              NEVER USE WATER ON AN ELECTRICAL FIRE
            </h3>
            <p className="text-white text-sm">
              Water conducts electricity. Using a water extinguisher on a live
              electrical fire can cause electrocution. Only use water-based
              extinguishers on electrical fires if the supply is confirmed isolated.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Response Steps</h3>
            {[
              'Raise the alarm — activate the nearest fire alarm call point',
              'Isolate the supply if you can do so safely and quickly',
              'If the fire is small and you are trained, attempt to extinguish it using a CO2 extinguisher (black label) or dry powder extinguisher (blue label)',
              'If the fire is spreading or you are not confident, evacuate immediately',
              'Close doors behind you to slow the fire spread',
              'Go to the assembly point and report to the fire marshal',
              'Call 999 if not already done — tell them it is an electrical fire',
              'Account for all personnel — report anyone unaccounted for',
              'Do not re-enter the building until the fire service gives the all-clear',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-orange-400 font-bold text-xs mt-0.5">
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Fire Extinguisher Types
            </h3>
            {[
              {
                type: 'CO2 (Black Label)',
                use: 'Safe for electrical fires. Displaces oxygen to smother the fire. Does not leave residue. Short range — get close but not too close. The horn gets extremely cold — do not touch it.',
                safe: true,
              },
              {
                type: 'Dry Powder (Blue Label)',
                use: 'Safe for electrical fires. Smothers the fire with a fine chemical powder. Effective but creates a large cloud that reduces visibility. Can damage electrical equipment.',
                safe: true,
              },
              {
                type: 'Water (Red Label)',
                use: 'NOT safe for live electrical fires. Can only be used on electrical fires if the supply is confirmed dead. Otherwise used for Class A fires (paper, wood, textiles).',
                safe: false,
              },
              {
                type: 'Foam (Cream Label)',
                use: 'NOT safe for live electrical fires. Foam contains water and will conduct electricity. Used for Class A and B fires (flammable liquids).',
                safe: false,
              },
            ].map((item) => (
              <div
                key={item.type}
                className={`${item.safe ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border rounded-lg p-3`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold text-sm ${item.safe ? 'text-green-400' : 'text-red-400'}`}>
                    {item.type}
                  </h4>
                  <span className={`text-xs font-bold ${item.safe ? 'text-green-400' : 'text-red-400'}`}>
                    {item.safe ? 'SAFE for electrical' : 'NOT SAFE for electrical'}
                  </span>
                </div>
                <p className="text-white text-xs">{item.use}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arc Flash */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-purple-400">
            Arc Flash Incident
          </h2>
          <p className="text-white text-sm leading-relaxed">
            An arc flash is an explosive release of energy caused by an electrical
            fault between conductors or between a conductor and earth. Temperatures
            can reach 19,000°C (four times the temperature of the sun's surface).
            The blast can throw a person across a room, cause severe burns, damage
            hearing, and cause blindness.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">If Arc Flash Occurs</h3>
            {[
              'Call 999 immediately — arc flash causes severe burn injuries',
              'Do not attempt to move the casualty unless they are in immediate danger',
              'If the casualty is on fire, use a fire blanket or get them to "stop, drop, and roll"',
              'Cool burns with clean, cool running water for at least 20 minutes',
              'Do not remove clothing that is stuck to burns',
              'Cover burns loosely with cling film (lengthways, not wrapped around a limb)',
              'Treat for shock: lie the casualty down, raise legs, keep warm',
              'Check for eye injuries — arc flash can cause flash burns to the cornea',
              'All arc flash casualties need hospital treatment regardless of apparent severity',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-purple-400 font-bold text-xs mt-0.5">
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Burns Treatment */}
      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">
            Burns Treatment
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Electrical burns are often more serious than they appear. Current
            passing through the body can cause deep tissue damage that is not
            visible on the surface. Entry and exit wounds may look small but the
            internal damage can be extensive.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Treatment Steps</h3>
            {[
              'Cool the burn with clean, cool (not ice cold) running water for at least 20 minutes — this is the single most effective first aid treatment for burns',
              'Remove jewellery, watches, and non-stuck clothing from the burned area before it swells',
              'Do NOT remove clothing that is stuck to the burn',
              'Do NOT apply butter, toothpaste, creams, or any home remedy — these trap heat and increase damage',
              'Do NOT burst blisters — they protect the damaged skin underneath',
              'Cover the burn loosely with cling film (laid over, not wrapped) or a clean, non-fluffy dressing',
              'Give the casualty small sips of water if they are conscious and able to swallow',
              'For electrical burns, always call 999 — internal damage may be severe even if the skin looks okay',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-amber-400 font-bold text-xs mt-0.5">
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Falls */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Falls from Height
          </h2>
          <div className="space-y-3">
            {[
              'Do not move the casualty unless they are in immediate danger (fire, further collapse)',
              'Call 999 immediately — suspected spinal injury must be treated by paramedics',
              'Keep the casualty still and calm — talk to them, reassure them',
              'If the casualty is unconscious but breathing, support their head in a neutral position and keep their airway clear. Only move them to the recovery position if you cannot maintain the airway otherwise',
              'If the casualty is not breathing, start CPR — the risk of spinal damage is secondary to cardiac arrest',
              'Cover with a blanket to prevent hypothermia — casualties lose heat rapidly when lying on the ground',
              'Control any visible bleeding with direct pressure using a clean pad or clothing',
              'Note the height they fell from and what surface they landed on — the paramedics will need this',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-blue-400 font-bold text-xs mt-0.5">
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RIDDOR */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            RIDDOR Reporting
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Reporting of Injuries, Diseases and Dangerous Occurrences
            Regulations 2013 (RIDDOR) requires employers and people in control of
            work premises to report certain serious workplace incidents to the HSE.
            As an apprentice, you need to know what is reportable so you can alert
            your supervisor.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              What Must Be Reported
            </h3>
            {[
              'Deaths at work',
              'Specified injuries: fractures (except fingers/thumbs/toes), amputations, crush injuries, loss of consciousness from head injury or asphyxia, chemical or hot metal burns to the eye, any injury requiring resuscitation or 24-hour hospitalisation',
              'Over-7-day incapacitation — if a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident)',
              'Injuries to non-workers (members of the public) taken to hospital for treatment',
              'Dangerous occurrences — near misses with serious potential: electrical short circuit or overload causing fire, collapse of scaffolding, explosion, accidental release of a substance that could cause injury',
              'Occupational diseases — including carpal tunnel syndrome, hand-arm vibration syndrome, occupational dermatitis, and occupational asthma',
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

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">How to Report</h3>
            {[
              'Online: riddor.hse.gov.uk — the preferred method',
              'Fatal and specified injuries must be reported without delay (phone the Incident Contact Centre on 0345 300 9923)',
              'Over-7-day injuries must be reported within 15 days',
              'Dangerous occurrences must be reported without delay',
              'Your employer is responsible for making the report, but you should alert your supervisor immediately',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-green-400 font-bold text-xs mt-0.5">
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* First Aid on Site */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            First Aid Awareness on Site
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Every construction site must have adequate first aid arrangements. When
            you arrive on a new site, you should identify:
          </p>

          <div className="space-y-2">
            {[
              'Where the first aid kit is located',
              'Who the designated first aider(s) are — their names and where to find them',
              'Where the nearest AED (defibrillator) is located',
              'The site emergency phone number',
              'The assembly point for evacuation',
              'The location of fire extinguishers nearest to your work area',
              'The nearest hospital with an A&E department and how to get there',
              'The site accident book — all injuries must be recorded, even minor ones',
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
              Consider getting a first aid at work certificate (3-day course or
              1-day emergency first aid). It is valuable for your career, looks
              good on your CV, and could save a colleague's life. Many employers
              will pay for this training.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-red-500/20 bg-red-500/10">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">
              Key Emergency Numbers
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Emergency Services', number: '999', note: 'Police, Fire, Ambulance' },
              { label: 'HSE Incident Contact Centre', number: '0345 300 9923', note: 'Report RIDDOR incidents' },
              { label: 'National Gas Emergency', number: '0800 111 999', note: 'Gas leaks or damage to gas pipes' },
              { label: 'Electrical Safety First', number: '020 3463 5100', note: 'Electrical safety charity advice line' },
              { label: 'NHS 111', number: '111', note: 'Non-emergency medical advice' },
              { label: 'National Poisons Information', number: '0344 892 0111', note: 'Chemical exposure advice (healthcare professionals)' },
            ].map((contact) => (
              <div key={contact.label} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-white text-sm font-medium">{contact.label}</p>
                  <p className="text-white text-xs">{contact.note}</p>
                </div>
                <span className="text-red-400 font-bold text-sm">{contact.number}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Emergency procedures based on Resuscitation Council UK guidelines
            (2021), HSE first aid at work guidance (INDG214), RIDDOR 2013, and
            Electrical Safety First guidance. CPR ratios: 30 compressions to 2
            breaths for adults. Always follow your employer's emergency procedures
            and attend refresher training regularly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyProceduresPage;
