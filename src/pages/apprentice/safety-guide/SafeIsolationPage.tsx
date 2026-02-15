import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { AlertTriangle, CheckCircle, Lock, Zap } from 'lucide-react';

const SafeIsolationPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Safe Isolation
        </h1>
      </div>

      {/* Critical Warning */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-red-400">
              The Most Important Procedure You Will Ever Learn
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Safe isolation is the single most critical safety procedure in
            electrical work. Failing to isolate correctly has killed electricians.
            Every time you work on a circuit, you{' '}
            <span className="font-bold text-red-400">must</span> follow this
            procedure — no shortcuts, no exceptions, no matter how simple the job
            seems.
          </p>
        </CardContent>
      </Card>

      {/* What is Safe Isolation */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            What Is Safe Isolation?
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Safe isolation is the process of disconnecting a circuit or piece of
            equipment from all sources of electrical supply and ensuring it cannot
            be accidentally re-energised while work is being carried out. It is
            required by the{' '}
            <span className="font-semibold text-blue-400">
              Electricity at Work Regulations 1989 (Regulation 13)
            </span>{' '}
            and{' '}
            <span className="font-semibold text-blue-400">
              BS 7671 Regulation 132.15
            </span>
            .
          </p>
          <p className="text-white text-sm leading-relaxed">
            The principle is simple: prove it is dead before you touch it. But
            doing it correctly requires a specific, repeatable procedure every
            single time.
          </p>
        </CardContent>
      </Card>

      {/* The 6-Step Procedure */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">
              The Safe Isolation Procedure
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Follow these steps in order, every time, without exception. This is
            the procedure you will be tested on in your End Point Assessment and
            AM2 practical exam.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Identify the Circuit',
                detail:
                  'Use the circuit chart or distribution board schedule to identify which device (MCB, RCBO, fuse, or isolator) controls the circuit you need to work on. If there is no schedule, you must trace the circuit. Never guess.',
                tip: 'Check the schedule matches reality — schedules are often out of date. If in doubt, use a non-contact voltage detector to narrow down which circuit is which.',
              },
              {
                step: 2,
                title: 'Switch Off the Supply',
                detail:
                  'Turn off the MCB, RCBO, or remove the fuse carrier for the identified circuit. For three-phase supplies, isolate all three phases plus the neutral where applicable.',
                tip: 'On a main switch or isolator, switch to the OFF position. For fuse carriers, physically remove the carrier from the switch-disconnector.',
              },
              {
                step: 3,
                title: 'Lock Off and Tag',
                detail:
                  'Apply a lock-off device to the MCB or isolator so it cannot be turned back on. Attach a warning label (tag) with your name, the date, and a description of the work being done. Only you should have the key.',
                tip: 'Different lock-off devices exist for different MCB types (pin-type for DIN-rail MCBs, clamp-type for larger isolators). Carry a selection in your tool bag. Never rely on tape or a written note alone.',
              },
              {
                step: 4,
                title: 'Prove Your Voltage Indicator Works (Test Before)',
                detail:
                  'Before testing the circuit, prove that your voltage indicator (or approved test lamp) is working correctly by testing it on a known live supply or a proving unit. This confirms your tester is functional and will give a reliable reading.',
                tip: 'HSE Guidance Note GS38 requires the use of a proving unit or known live source. A proving unit is the safest option as it does not require you to find a live circuit.',
              },
              {
                step: 5,
                title: 'Test the Circuit Is Dead',
                detail:
                  'Using the proved voltage indicator, test between all conductors at the point of work: Line–Neutral, Line–Earth, and Neutral–Earth. For three-phase circuits, test between all phases (L1–L2, L2–L3, L3–L1) and each phase to neutral and earth. All readings must show zero volts.',
                tip: 'Test at the point of work, not just at the distribution board. There may be other sources of supply feeding the circuit (e.g. borrowed neutrals, solar PV, UPS systems, generators).',
              },
              {
                step: 6,
                title: 'Prove Your Voltage Indicator Works (Test After)',
                detail:
                  'After confirming the circuit is dead, prove your voltage indicator is still working by testing it again on the proving unit or known live source. This confirms the "dead" reading was genuine and not caused by a faulty tester.',
                tip: 'This step is often forgotten but is critical. If your tester battery died mid-test, it would show zero volts on a live circuit — the "test after" catches this.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="border border-red-500/20 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {item.detail}
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-white text-xs">
                    <span className="font-semibold text-blue-400">Tip: </span>
                    {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Memory Aid */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Memory Aid — "Identify, Isolate, Lock, Prove, Test, Prove"
            </h3>
            <p className="text-white text-sm">
              Remember the sequence: <span className="font-bold text-amber-400">I-I-L-P-T-P</span>.
              Some electricians use the phrase{' '}
              <span className="italic text-amber-400">"I Isolate, Lock, Prove, Test, Prove"</span> to
              remember the six steps. Whatever works for you — just never skip a step.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* GS38 Requirements */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            HSE Guidance Note GS38 — Test Equipment
          </h2>
          <p className="text-white text-sm leading-relaxed">
            GS38 sets out the HSE's recommendations for electrical test equipment
            used by electricians. Your voltage indicator and test leads must meet
            these requirements. Using non-compliant equipment is dangerous and could
            make you liable in the event of an accident.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              GS38 Requirements for Test Leads
            </h3>
            {[
              'Fused test leads with a maximum fuse rating of 500mA',
              'Shrouded connectors — no exposed metal beyond 2mm (finger-safe)',
              'Test probes with spring-loaded retractable tips — maximum 4mm exposed tip',
              'Insulated to the voltage being tested',
              'Clearly marked with voltage rating and category (CAT III or CAT IV)',
              'Leads must be flexible, undamaged, and not excessively long',
              'All probes, leads, and connectors must be in good condition — replace if damaged',
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

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Voltage Indicators vs Multimeters
            </h3>
            <p className="text-white text-sm leading-relaxed">
              For safe isolation, a two-pole voltage indicator (such as a Fluke T150
              or Kewtech KT1780) is preferred over a multimeter. Voltage indicators
              are simpler, more robust, and less likely to give a false reading due
              to incorrect settings.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-white text-xs">
                <span className="font-semibold text-red-400">Warning: </span>
                Never use a neon screwdriver or non-contact voltage detector
                as your primary means of proving a circuit is dead. These are
                indication tools only — not proof of isolation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proving Units */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">Proving Units</h2>
          <p className="text-white text-sm leading-relaxed">
            A proving unit is a battery-powered device that provides a known voltage
            output to verify your voltage indicator is working correctly. Using a
            proving unit is the safest way to perform the "prove before" and
            "prove after" steps because it avoids the need to test on a live circuit.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">How to Use a Proving Unit</h3>
            {[
              'Connect your voltage indicator test leads to the proving unit',
              'Press the test button on the proving unit',
              'Your voltage indicator should show the rated output voltage (typically 230V or 690V depending on model)',
              'If the indicator does not respond, the indicator is faulty — do not use it',
              'Repeat after testing the isolated circuit to confirm the indicator still works',
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

      {/* Lock-Off Devices */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-purple-400">
            Lock-Off Devices and Tagging
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Lock-off devices physically prevent a circuit from being re-energised.
            They are an essential part of the safe isolation procedure. Simply
            switching off an MCB is not enough — it must be locked off with a
            padlock and tagged with your details.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Types of Lock-Off Device</h3>
            {[
              {
                type: 'MCB Lock-Off (Pin Type)',
                desc: 'Clips over a DIN-rail MCB toggle and accepts a padlock. Suitable for most domestic and commercial distribution boards.',
              },
              {
                type: 'MCB Lock-Off (Universal Clamp)',
                desc: 'Adjustable clamp that fits a range of MCB sizes. More versatile but bulkier. Useful when you encounter non-standard boards.',
              },
              {
                type: 'Fuse Carrier Lock-Off',
                desc: 'Replaces the fuse carrier in a switch-disconnector. The removed fuse carrier should be kept in your possession.',
              },
              {
                type: 'Rotary Isolator Lock-Off',
                desc: 'Fits over rotary isolator handles. Used for larger supplies, main switches, and motor isolators.',
              },
              {
                type: 'Multi-Lock Hasp',
                desc: 'Allows multiple padlocks on a single lock-off point. Used when multiple people are working on the same circuit — each person adds their own lock.',
              },
            ].map((item) => (
              <div key={item.type} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <h4 className="text-purple-400 font-semibold text-sm mb-1">
                  {item.type}
                </h4>
                <p className="text-white text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Warning Tags Must Include
            </h3>
            {[
              'Your name',
              'Date and time of isolation',
              'Description of the work being carried out',
              '"DANGER — DO NOT SWITCH ON" warning text',
              'A contact number if others need to reach you',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* When You Cannot Isolate */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-orange-400">
              Live Working — Almost Never Acceptable
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            The Electricity at Work Regulations 1989 (Regulation 14) states that
            no person shall work on or near live conductors{' '}
            <span className="font-bold text-orange-400">unless</span> it is
            unreasonable in all circumstances for the conductor to be dead, it is
            reasonable to work on it while live, and suitable precautions are taken
            to prevent injury.
          </p>
          <p className="text-white text-sm leading-relaxed">
            In practice, this means live working is almost never justified for an
            apprentice. If someone asks you to work on a live circuit:
          </p>

          <div className="space-y-2">
            {[
              'You have the legal right to refuse',
              'Ask for a formal written risk assessment for the live work',
              'Inform your supervisor or training provider',
              'Only qualified, competent, and authorised persons may carry out live work',
              'As an apprentice, you are NOT considered competent for live working',
              'The only common exception is testing and fault-finding, which requires a live supply — but even then, barriers, insulated tools, and supervision are required',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {[
              {
                mistake: 'Not proving the tester before AND after',
                consequence: 'A flat battery in your tester could show "dead" on a live circuit.',
              },
              {
                mistake: 'Isolating the wrong circuit',
                consequence: 'Inaccurate schedules are common. Always verify at the point of work.',
              },
              {
                mistake: 'Using tape instead of a lock-off device',
                consequence: 'Tape can be removed by anyone. A lock with your personal padlock cannot.',
              },
              {
                mistake: 'Not checking for other supply sources',
                consequence: 'Solar PV, generators, UPS systems, or borrowed neutrals from other circuits can re-energise a "dead" circuit.',
              },
              {
                mistake: 'Relying on a non-contact voltage detector',
                consequence: 'NCVDs can give false negatives (missing voltage) or false positives. They are an indication tool only.',
              },
              {
                mistake: 'Letting someone else remove your lock',
                consequence: 'Only you should remove your own lock. If multiple people are working, each person needs their own lock on a multi-lock hasp.',
              },
              {
                mistake: 'Testing only Line–Neutral',
                consequence: 'A shared neutral or incorrect wiring could still present a shock risk. You must test L–N, L–E, and N–E.',
              },
              {
                mistake: 'Rushing because the job seems simple',
                consequence: 'Many fatal accidents happen on "routine" jobs. The procedure takes 2 minutes — your life is worth more than that.',
              },
            ].map((item) => (
              <div
                key={item.mistake}
                className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3"
              >
                <p className="text-amber-400 font-semibold text-sm">
                  {item.mistake}
                </p>
                <p className="text-white text-xs mt-1">{item.consequence}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AM2 / EPA Note */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-sm font-semibold text-green-400">
            Safe Isolation in Your AM2 and EPA
          </h2>
          <p className="text-white text-sm leading-relaxed">
            You will be assessed on the full safe isolation procedure during your
            AM2 practical assessment and End Point Assessment. Failure to correctly
            carry out safe isolation is an automatic fail in the AM2. You must
            demonstrate every step, including proving the tester before and after.
            Practise until it becomes second nature.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Based on the Electricity at Work Regulations 1989, BS 7671:2018+A2:2022
            (Regulation 132.15), HSE Guidance Note GS38 (4th edition), and IET Code
            of Practice for In-Service Inspection and Testing of Electrical
            Equipment. Always follow your employer's specific safe isolation
            procedures and risk assessments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeIsolationPage;
