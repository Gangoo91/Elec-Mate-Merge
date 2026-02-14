import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Mic,
  Gauge,
  Activity,
  Cable,
  BookOpen,
  ThermometerSun,
  CircuitBoard,
  Repeat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Earth Fault Loop Impedance Explained | Ze & Zs Guide';
const PAGE_DESCRIPTION =
  'Complete guide to earth fault loop impedance for UK electricians. What earth fault loop impedance is, Ze (external) and Zs (total = Ze + R1+R2), why it determines disconnection time, maximum Zs values per BS 7671 Tables 41.3/41.4, how to measure Ze and Zs, temperature correction (0.8 factor), TN-C-S vs TN-S vs TT typical values. Record and validate with Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Earth Fault Loop Impedance',
    href: '/guides/earth-fault-loop-impedance-explained',
  },
];

const tocItems = [
  { id: 'what-is-efli', label: 'What Is Earth Fault Loop Impedance?' },
  { id: 'ze-explained', label: 'Ze — External Earth Fault Loop Impedance' },
  { id: 'zs-explained', label: 'Zs — Total Earth Fault Loop Impedance' },
  { id: 'why-it-matters', label: 'Why It Determines Disconnection Time' },
  { id: 'maximum-zs', label: 'Maximum Zs Values per BS 7671' },
  { id: 'how-to-measure', label: 'How to Measure Ze and Zs' },
  { id: 'temperature-correction', label: 'Temperature Correction (0.8 Factor)' },
  { id: 'earthing-systems', label: 'TN-C-S vs TN-S vs TT Typical Values' },
  { id: 'zs-too-high', label: 'What to Do if Zs Is Too High' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth fault loop impedance (Zs) is the total impedance of the complete fault current path — from the point of fault, through the CPC, through the external earth return, and back through the transformer to the supply phase.',
  'Ze is the external earth fault loop impedance measured at the origin of the installation. Zs is the total: Zs = Ze + (R1+R2), where R1+R2 is the resistance of the circuit conductors.',
  'The maximum permitted Zs values in BS 7671 Tables 41.2, 41.3, and 41.4 ensure the protective device disconnects within the required time (0.4 s for final circuits, 5 s for distribution circuits).',
  'Temperature correction: measured Zs at ambient temperature should not exceed 80% of the tabulated maximum (multiply by 0.8) to allow for conductor resistance increase at operating temperature.',
  'Elec-Mate provides a Zs lookup calculator by protective device type and rating, auto-validates every measured Zs in the schedule of tests, and records Ze at the origin on the EICR.',
];

const faqs = [
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth fault loop impedance) is the impedance of the earth fault loop path external to the installation — that is, from the origin of the installation, through the earthing conductor to the supplier earth terminal, through the external earth path (the cable sheath, earth electrode, or PME earth), through the supply transformer winding, and back through the supply phase conductor to the origin. It is measured at the origin with the main earthing conductor temporarily disconnected. Zs (total earth fault loop impedance) is the impedance of the complete earth fault loop from the point of fault. It includes Ze plus the resistance of the installation wiring from the distribution board to the point of measurement — specifically R1 (line conductor resistance) and R2 (CPC resistance). The relationship is Zs = Ze + (R1+R2). Ze represents the part of the loop you cannot change; R1+R2 represents the part determined by your cable selection and installation.',
  },
  {
    question: 'Why does earth fault loop impedance determine disconnection time?',
    answer:
      "When an earth fault occurs, the fault current that flows is determined by Ohm's law: fault current (If) = supply voltage (Uo) divided by the total earth fault loop impedance (Zs). So If = Uo/Zs. For a 230 V supply, if Zs is 1.0 ohm, the fault current is 230 amps. If Zs is 2.0 ohms, the fault current drops to 115 amps. The protective device (MCB, fuse, or RCBO) has a time-current characteristic — it operates faster when more current flows through it. A higher Zs means less fault current, which means a longer disconnection time. If Zs is too high, the fault current may not be sufficient to trip the device within the required time (0.4 seconds for final circuits or 5 seconds for distribution circuits), leaving exposed metalwork at a dangerous voltage for an unacceptable duration.",
  },
  {
    question: 'What are the maximum Zs values for Type B MCBs?',
    answer:
      'BS 7671 Table 41.3 gives the maximum Zs values for Type B MCBs to achieve disconnection within 0.4 seconds: 6 A = 7.28 ohms, 10 A = 4.37 ohms, 16 A = 2.73 ohms, 20 A = 2.18 ohms, 25 A = 1.75 ohms, 32 A = 1.37 ohms, 40 A = 1.09 ohms, 50 A = 0.87 ohms. These values are derived using Cmin = 0.95 (i.e. 0.95 x 230 = 218.5 V) divided by the MCB magnetic trip current. They represent the absolute maximum values at the maximum conductor operating temperature. When testing at ambient temperature (which is the norm), you should apply the 0.8 correction factor — meaning your measured Zs should not exceed 80% of these values. For example, a B32 MCB has a tabulated maximum of 1.37 ohms, but your measured Zs at ambient should not exceed 1.10 ohms (1.37 x 0.8).',
  },
  {
    question: 'What is the 0.8 correction factor for temperature?',
    answer:
      'The 0.8 correction factor accounts for the increase in conductor resistance as cables heat up during normal operation. The maximum Zs values in BS 7671 tables are given at the maximum operating temperature of the conductors (typically 70 degrees Celsius for PVC-insulated cables). However, when you measure Zs on site, the conductors are usually at ambient temperature (approximately 20 degrees Celsius). As the installation operates and cables carry current, they heat up, and their resistance increases — copper resistance increases by approximately 20% between 20 degrees Celsius and 70 degrees Celsius. The 0.8 factor compensates for this: if your measured Zs at ambient temperature is no more than 80% of the tabulated maximum, it should still be within limits when the cables reach their maximum operating temperature. This is a design guideline rather than a regulation, but it is widely adopted and recommended by the IET.',
  },
  {
    question: 'What typical Ze values should I expect for different earthing systems?',
    answer:
      'Typical Ze values vary by earthing system and are specified in BS 7671 as maximum assumed values. For TN-C-S (PME) systems, the maximum assumed Ze is 0.35 ohms — typical measured values are 0.10 to 0.35 ohms. For TN-S (cable sheath earth) systems, the maximum assumed Ze is 0.80 ohms — typical measured values are 0.30 to 0.80 ohms, though older installations may be higher. For TT (earth electrode) systems, the maximum assumed Ze is 21 ohms — typical measured values range widely from 10 to 200+ ohms depending on soil conditions and electrode type. TT systems almost always require RCD protection because the high Ze means Zs will be too high for MCBs alone to provide disconnection within the required time. The Ze value is recorded on the EICR or EIC at the origin of the installation.',
  },
  {
    question: 'How do I measure Ze at the origin of the installation?',
    answer:
      'Ze is measured at the origin of the installation — typically at the consumer unit or main distribution board. The procedure is: (1) Ensure the installation is safe to work on. (2) Temporarily disconnect the main earthing conductor from the main earthing terminal (MET). This isolates the installation earth from the supply earth so you measure only the external loop. (3) Using the loop impedance function on your multifunction tester, measure between the incoming line terminal and the disconnected end of the earthing conductor. The reading is Ze. (4) Reconnect the main earthing conductor to the MET immediately after the measurement. Important safety note: while the main earthing conductor is disconnected, the entire installation has no earth connection. This must be done as quickly as possible, and no one should use the installation during this brief period. Some electricians prefer to measure Ze with the earthing conductor connected and then subtract the known resistance of the earthing conductor — this avoids the risk of an unearthed installation.',
  },
  {
    question: 'What should I do if the measured Zs exceeds the maximum permitted value?',
    answer:
      'If the measured Zs exceeds the maximum permitted value for the protective device on that circuit, there are several options. First, verify the measurement — retest to confirm the reading, check that your instrument is calibrated, and compare the measured Zs against the calculated Zs (Ze + R1+R2). If there is a significant discrepancy, investigate for high-resistance connections. Second, if the measurement is confirmed, check for high-resistance joints by retesting continuity. Third, consider whether the cable run can be shortened or the cable size increased to reduce R1+R2. Fourth, consider changing the protective device to one with a higher maximum Zs — for example, replacing a Type C MCB (which requires higher fault current to trip) with a Type B MCB (which trips at lower fault current and therefore has a higher maximum Zs). Fifth, for circuits where Zs cannot be reduced, adding RCD protection provides fault disconnection that does not depend on Zs. Record the issue on the EICR with the appropriate observation code.',
  },
];

const howToSteps = [
  {
    name: 'Complete all dead tests first',
    text: 'Before measuring earth fault loop impedance, all dead tests must be completed satisfactorily — continuity of protective conductors, ring circuit continuity (if applicable), insulation resistance, and polarity. Energising a circuit without completing dead tests risks short circuits, electric shock, or instrument damage.',
  },
  {
    name: 'Measure Ze at the origin',
    text: 'Temporarily disconnect the main earthing conductor from the main earthing terminal (MET). Using the loop impedance function on your MFT, measure between the incoming line terminal and the disconnected earthing conductor. Record the Ze value. Reconnect the earthing conductor immediately. Ze is recorded on the EICR or EIC.',
  },
  {
    name: 'Energise the circuit under test',
    text: 'Restore the circuit to its normal operating condition — reconnect loads, replace fuses, close covers. Remove lock-off devices and warning labels from the dead testing phase. Energise the circuit at the distribution board.',
  },
  {
    name: 'Measure Zs at the furthest point',
    text: 'Using the loop impedance function on your MFT, measure Zs at the furthest point of each circuit — this gives the highest (worst-case) Zs value. For socket circuits, measure at the last socket on the circuit. For lighting circuits, measure at the last lighting point.',
  },
  {
    name: 'Compare against maximum permitted Zs',
    text: 'Look up the maximum permitted Zs for the protective device type and rating from BS 7671 Tables 41.2, 41.3, or 41.4. Apply the 0.8 temperature correction factor — your measured Zs should not exceed 80% of the tabulated maximum. Elec-Mate does this lookup and comparison automatically.',
  },
  {
    name: 'Verify Zs against Ze + (R1+R2)',
    text: 'Check that the measured Zs is approximately equal to Ze + (R1+R2) from your dead test results. If the measured Zs is significantly higher than the calculated value, investigate for high-resistance connections in the earth path. Record all values on the schedule of test results.',
  },
];

const sections = [
  {
    id: 'what-is-efli',
    heading: 'What Is Earth Fault Loop Impedance?',
    content: (
      <>
        <p>
          Earth fault loop impedance is the total impedance of the complete path that fault current
          takes when a line conductor comes into contact with earth — either directly or through a
          metallic enclosure. This path forms a loop: from the supply transformer, through the line
          conductor to the point of fault, through the fault itself, through the circuit protective
          conductor (CPC) back to the main earthing terminal, through the external earth return path
          back to the supply transformer, and through the transformer winding back to the line
          conductor.
        </p>
        <p>
          The total impedance of this loop determines how much fault current flows when an earth
          fault occurs. By Ohm's law, fault current equals supply voltage divided by loop impedance:
          If = Uo / Zs. The higher the loop impedance, the lower the fault current. The lower the
          fault current, the longer the protective device takes to operate — and if the impedance is
          too high, the device may not operate at all within the required time, leaving a dangerous
          situation where metalwork is energised at a voltage that could cause lethal electric
          shock.
        </p>
        <p>
          This is why earth fault loop impedance testing is one of the most critical measurements in
          electrical testing. It is test number five in the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 testing sequence
          </SEOInternalLink>{' '}
          — the first live test, carried out after all dead tests have confirmed that the wiring is
          intact and safe to energise.
        </p>
      </>
    ),
  },
  {
    id: 'ze-explained',
    heading: 'Ze — External Earth Fault Loop Impedance',
    content: (
      <>
        <p>
          Ze represents the portion of the earth fault loop that is external to the installation —
          the part that you, as the electrician, cannot change. It includes the impedance of the
          supply transformer winding, the supply line conductor from the transformer to the origin
          of the installation, and the external earth return path from the installation back to the
          transformer.
        </p>
        <p>
          The external earth return path differs depending on the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-explained">
            earthing system
          </SEOInternalLink>
          :
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Maximum Assumed Ze Values by Earthing System
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">TN-C-S (PME):</strong> Maximum assumed Ze = 0.35
                ohms. The earth return is via the combined neutral/earth (PEN) conductor of the
                supply cable. This gives the lowest Ze because the PEN conductor has very low
                impedance. Typical measured values range from 0.10 to 0.35 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">TN-S (cable sheath):</strong> Maximum assumed Ze
                = 0.80 ohms. The earth return is via the metallic sheath or armour of the supply
                cable. This has higher impedance than a PEN conductor. Typical measured values range
                from 0.30 to 0.80 ohms, though older cable sheaths with corroded joints can exceed
                this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">TT (earth electrode):</strong> Maximum assumed
                Ze = 21 ohms. The earth return is through the general mass of earth via an earth
                electrode. The impedance is much higher and varies enormously depending on soil
                type, moisture content, and electrode characteristics. Typical values range from 10
                to 200+ ohms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ze is measured at the origin of the installation with the main earthing conductor
          temporarily disconnected from the main earthing terminal. This isolates the installation
          earth from the supply earth so you measure only the external loop. The value is recorded
          on the <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or EIC.
        </p>
      </>
    ),
  },
  {
    id: 'zs-explained',
    heading: 'Zs — Total Earth Fault Loop Impedance',
    content: (
      <>
        <p>
          Zs is the total earth fault loop impedance measured at a specific point in the
          installation. It includes everything in Ze, plus the impedance of the installation wiring
          from the distribution board to the point of measurement. The relationship is:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">Zs = Ze + (R1 + R2)</p>
          <p className="text-white text-sm mt-2">
            Where R1 = line conductor resistance, R2 = CPC resistance
          </p>
        </div>
        <p>
          R1 and R2 are the resistances of the line conductor and CPC respectively, measured from
          the distribution board to the point of test. These are the same R1 and R2 values obtained
          during{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">
            continuity testing
          </SEOInternalLink>{' '}
          (test 1 in the GN3 sequence). By adding the measured R1+R2 to the measured Ze, you can
          calculate the expected Zs and compare it against the measured Zs as a verification check.
        </p>
        <p>
          Zs is measured at the furthest point of each circuit because this gives the highest
          (worst-case) value — the point where the conductor lengths are longest and therefore the
          impedances are highest. If Zs passes at the furthest point, it will pass at every other
          point on the circuit.
        </p>
        <SEOAppBridge
          title="Zs lookup by protective device — instant maximum values"
          description="Select the protective device type (B, C, D MCB, BS 3036 fuse, BS 88 fuse) and rating, and Elec-Mate instantly shows the maximum permitted Zs from BS 7671, with the 0.8 correction factor already applied. No need to carry the tables."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why Earth Fault Loop Impedance Determines Disconnection Time',
    content: (
      <>
        <p>
          The connection between loop impedance and disconnection time is fundamental to electrical
          safety. BS 7671 requires that in the event of an earth fault, the protective device must
          disconnect the supply within a maximum time to prevent electric shock. The required
          disconnection times are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">0.4 seconds:</strong> Final circuits supplying
                socket outlets and circuits supplying portable equipment outdoors. This is the
                maximum time for most circuits in a domestic installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">5 seconds:</strong> Distribution circuits (those
                feeding other distribution boards, not final circuits directly).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">0.2 seconds:</strong> Required for some specific
                situations, such as circuits in medical locations per Section 710.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The protective device has a time-current characteristic: it operates faster when more
          current flows through it. An MCB rated at 32 A might take 5 seconds to trip at 100 A but
          only 0.01 seconds at 500 A. The{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum Zs values
          </SEOInternalLink>{' '}
          in BS 7671 are calculated so that the resulting fault current (Uo/Zs) is sufficient to
          make the device operate within the required disconnection time.
        </p>
        <p>
          For example, a Type B 32 A MCB trips magnetically at 5 times its rated current (5 x 32 =
          160 A). BS 7671 applies a voltage factor Cmin = 0.95 to account for supply voltage
          tolerance, giving 0.95 x 230 = 218.5 V. The maximum loop impedance is therefore 218.5/160
          = 1.37 ohms. This is exactly the value you find in BS 7671 Table 41.3 for a B32 MCB.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-zs',
    heading: 'Maximum Zs Values per BS 7671',
    content: (
      <>
        <p>
          The maximum permitted Zs values are found in BS 7671 Tables 41.2 (BS 3036 fuses), 41.3
          (Type B MCBs), and 41.4 (Type C and Type D MCBs). These tables give the values at the
          maximum conductor operating temperature. For a complete reference, see our dedicated{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum Zs values guide
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Type B MCBs — Maximum Zs for 0.4 s Disconnection (Key Ratings)
          </h3>
          <ul className="space-y-2 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B6:</strong> 7.28 Ω (corrected: 5.82 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B10:</strong> 4.37 Ω (corrected: 3.50 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B16:</strong> 2.73 Ω (corrected: 2.18 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B20:</strong> 2.18 Ω (corrected: 1.75 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B32:</strong> 1.37 Ω (corrected: 1.10 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B40:</strong> 1.09 Ω (corrected: 0.87 Ω)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">B50:</strong> 0.87 Ω (corrected: 0.70 Ω)
              </span>
            </li>
          </ul>
        </div>
        <p>
          The "corrected" values in brackets are the tabulated maximum multiplied by 0.8 — the
          values your measured Zs should not exceed when testing at ambient temperature.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-measure',
    heading: 'How to Measure Ze and Zs',
    content: (
      <>
        <p>
          Earth fault loop impedance measurements are live tests — they require the circuit to be
          energised at mains voltage. They can only be performed safely after all dead tests
          (continuity, insulation resistance, polarity) have been completed satisfactorily.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Measuring Ze</h3>
          <p className="text-white leading-relaxed mb-3">
            Ze is measured at the origin of the installation. Temporarily disconnect the main
            earthing conductor from the main earthing terminal (MET). Using the loop impedance
            function on your MFT, measure between the incoming line terminal and the disconnected
            end of the earthing conductor. Record the value. Reconnect the earthing conductor
            immediately.
          </p>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Safety warning:</strong> While the main earthing
              conductor is disconnected, the entire installation has no earth connection. This must
              be done as quickly as possible, and no one should use the installation during this
              period.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Measuring Zs</h3>
          <p className="text-white leading-relaxed">
            With the earthing conductor reconnected and the circuit energised, measure Zs at the
            furthest point of each circuit using the loop impedance function on your MFT. For socket
            circuits, plug the test instrument into the last socket. For lighting circuits, measure
            at the last light fitting. The reading includes Ze plus R1+R2 for that circuit. Compare
            against the maximum permitted Zs for the protective device.
          </p>
        </div>
        <SEOAppBridge
          title="Voice to test results — speak Zs values on site"
          description="With your MFT in one hand, speak: 'Ring 1, Zs 0.89 ohms.' Elec-Mate fills in the schedule of test results and validates the value against the maximum Zs for the protective device on that circuit. Hands-free, BS 7671 compliant."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'temperature-correction',
    heading: 'Temperature Correction — The 0.8 Factor',
    content: (
      <>
        <p>
          The maximum Zs values in BS 7671 tables are given at the maximum conductor operating
          temperature — typically 70 degrees Celsius for PVC-insulated cables. However, when you
          measure Zs on site, the conductors are usually at ambient temperature (approximately 10 to
          25 degrees Celsius). As the installation operates and cables carry their design current,
          the conductor temperature rises and their resistance increases.
        </p>
        <p>
          Copper conductor resistance increases by approximately 0.4% per degree Celsius. Between 20
          degrees Celsius (ambient) and 70 degrees Celsius (maximum operating temperature for PVC),
          this is a 20% increase. The 0.8 factor compensates for this: if your measured Zs at
          ambient temperature is no more than 80% of the tabulated maximum, the actual Zs under load
          (when conductors are hot) should still be within the tabulated maximum.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Example Calculation</h3>
          <p className="text-white leading-relaxed">
            For a B32 MCB, the tabulated maximum Zs is 1.37 ohms (at 70 degrees Celsius). Applying
            the 0.8 factor: 1.37 x 0.8 = 1.10 ohms. Your measured Zs at ambient temperature should
            not exceed 1.10 ohms. If you measure 1.20 ohms, it passes the tabulated maximum but
            fails the corrected maximum — when the cables heat up under load, the actual Zs could
            exceed 1.37 ohms and the circuit would not disconnect within 0.4 seconds.
          </p>
        </div>
        <p>
          The 0.8 factor is a design guideline recommended by the IET, not a regulation within BS
          7671 itself. However, it is widely adopted and expected by verifying bodies. Elec-Mate
          applies the 0.8 correction automatically when validating Zs measurements.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-systems',
    heading: 'TN-C-S vs TN-S vs TT — Typical Ze and Zs Values',
    content: (
      <>
        <p>
          The earthing system of the supply significantly affects the Ze value and therefore the
          achievable Zs. Understanding the typical values for each system helps you anticipate
          whether circuits are likely to pass or fail before you start testing.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">TN-C-S (PME) Systems</h3>
                <p className="text-white text-sm leading-relaxed">
                  Maximum assumed Ze: 0.35 ohms. Typical measured values: 0.10 to 0.35 ohms. With
                  such a low Ze, there is plenty of headroom for R1+R2, and most circuits pass Zs
                  comfortably. PME is the most common supply type for modern domestic installations
                  in the UK. The low Ze means even long cable runs with small conductors usually
                  achieve acceptable Zs values.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">TN-S (Cable Sheath) Systems</h3>
                <p className="text-white text-sm leading-relaxed">
                  Maximum assumed Ze: 0.80 ohms. Typical measured values: 0.30 to 0.80 ohms. The
                  higher Ze consumes more of the available Zs budget, so circuits with long cable
                  runs or small CPCs may fail. Common in older properties with lead-sheathed or
                  steel-wire-armoured supply cables. Corroded sheath joints can increase Ze above
                  the maximum assumed value.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">TT (Earth Electrode) Systems</h3>
                <p className="text-white text-sm leading-relaxed">
                  Maximum assumed Ze: 21 ohms. Typical measured values: 10 to 200+ ohms. The very
                  high Ze means Zs will almost certainly exceed the maximum permitted values for
                  MCBs alone. TT systems require RCD protection on all circuits —{' '}
                  <SEOInternalLink href="/guides/rcd-testing-procedure">
                    RCD testing
                  </SEOInternalLink>{' '}
                  is therefore critical. The RCD provides disconnection based on leakage current
                  rather than fault current magnitude, bypassing the Zs limitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'zs-too-high',
    heading: 'What to Do if Zs Is Too High',
    content: (
      <>
        <p>
          If the measured Zs exceeds the maximum permitted value (after applying the 0.8 correction
          factor), you must take action. The circuit does not comply with BS 7671 and the protective
          device will not disconnect within the required time in the event of an earth fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Options When Zs Exceeds Maximum</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Repeat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Verify the reading:</strong> Retest to confirm.
                Compare measured Zs against Ze + (R1+R2). Check for high-resistance connections.
                Ensure your instrument is calibrated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Reduce R1+R2:</strong> Increase the cable size,
                shorten the cable run, or use a larger CPC. This directly reduces R1+R2 and
                therefore Zs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Change the protective device:</strong> A Type B
                MCB has a higher maximum Zs than a Type C or Type D MCB of the same rating. If the
                load permits, changing from Type C to Type B may bring Zs within limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Add RCD protection:</strong> An{' '}
                <SEOInternalLink href="/guides/rcd-testing-procedure">RCD</SEOInternalLink> provides
                fault disconnection that does not depend on Zs. A 30 mA RCD will trip at 30 mA of
                earth leakage current regardless of the loop impedance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On an EICR, a Zs value exceeding the maximum permitted value is recorded as an
          observation. The classification code depends on the severity — C2 (potentially dangerous)
          or C3 (improvement recommended) depending on whether RCD protection is present and
          functioning.
        </p>
        <SEOAppBridge
          title="Auto-validated Zs in the schedule of tests"
          description="Elec-Mate validates every measured Zs against BS 7671 maximum permitted values for the specific protective device on each circuit. Failures are flagged immediately with the relevant table reference. 70+ calculators including Zs lookup, R1+R2, and PFC."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Complete table of maximum Zs values for Type B, C, D MCBs and BS 3036 fuses with 0.8 correction.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'How R1+R2 is measured and how it feeds into the Zs calculation.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'Test voltages, minimum values, conductor combinations — the dead test that must pass before measuring Zs.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description: 'Full RCD test procedure — essential for TT systems where Zs exceeds MCB limits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated Zs, Ze, and R1+R2 values on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description: 'Zs lookup, R1+R2, cable sizing, voltage drop, PFC, earth electrode, and more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthFaultLoopExplainedPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-11-05"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Activity}
      heroTitle={
        <>
          Earth Fault Loop Impedance Explained:{' '}
          <span className="text-yellow-400">Ze and Zs Guide</span>
        </>
      }
      heroSubtitle="The complete guide to earth fault loop impedance for UK electricians. What Ze and Zs are, why loop impedance determines disconnection time, maximum Zs values per BS 7671, how to measure Ze and Zs, the 0.8 temperature correction factor, TN-C-S vs TN-S vs TT typical values, and what to do when Zs exceeds the maximum."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Measure Ze and Zs — Step by Step"
      howToDescription="Step-by-step procedure for measuring external earth fault loop impedance (Ze) and total earth fault loop impedance (Zs) per BS 7671 and IET Guidance Note 3."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Validate Zs against BS 7671 automatically on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Zs lookup by protective device, auto-validation, voice test entry, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
