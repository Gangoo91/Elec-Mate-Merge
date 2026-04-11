import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const scenarios = [
  {
    question: 'Can I omit RCD protection on socket outlets?',
    answer: 'Only in non-domestic premises where a documented risk assessment justifies the omission (Reg 411.3.3). In domestic premises, 30mA RCD protection is mandatory on all socket outlet circuits up to 32A. The risk assessment must be appended to the EIC/EICR.',
    regs: ['Reg 411.3.3', 'Reg 411.3.4'],
  },
  {
    question: 'Is supplementary bonding still required in bathrooms?',
    answer: 'Only where the disconnection time conditions of Reg 411.3.2 cannot be met. If the circuit has adequate Zs for the protective device to disconnect in 0.4s AND has 30mA RCD protection, supplementary bonding can be omitted. If in doubt, install it — it does no harm.',
    regs: ['Reg 701.415.2', 'Reg 411.3.2'],
  },
  {
    question: 'When do I need an AFDD?',
    answer: 'A3:2024 requires AFDDs on single-phase final circuits supplying socket outlets up to 32A in Higher Risk Residential Buildings (HRRBs) and Houses in Multiple Occupation (HMOs). Recommended for consideration in other domestic premises. Not required on three-phase or motor circuits.',
    regs: ['Reg 421.1.7 (A3)', 'Reg 532.6'],
  },
  {
    question: 'Do I need to upgrade the consumer unit to metal?',
    answer: 'Since 1 January 2016, consumer units in domestic premises must comply with BS EN 61439-3 and be constructed of non-combustible material (metal or equivalent). Existing plastic CUs do not need to be replaced unless alterations are made that require a new CU.',
    regs: ['Reg 421.1.201', 'Amendment 3 to BS 7671:2008'],
  },
  {
    question: 'What type of RCD for an EV charger?',
    answer: 'Type A with 6mA DC residual current detection (Type A-EV) OR Type B. Most single-phase Mode 3 chargers have built-in DC detection, allowing Type A-EV. Type B is required only where smooth DC fault currents are possible and the charger has no built-in DC detection. Always check charger manufacturer requirements.',
    regs: ['Reg 722.531.2', 'Reg 531.2'],
  },
  {
    question: 'Can I use the 80% rule for Zs?',
    answer: 'Yes. Your measured Zs must not exceed 80% of the BS 7671 Appendix 3 maximum value. The 80% accounts for conductor resistance increasing from ambient temperature to 70°C during a fault. If your reading is between 80% and 100%, apply full temperature correction to determine compliance.',
    regs: ['Appendix 3', 'IET Guidance Note 3'],
  },
  {
    question: 'When is a Minor Works Certificate acceptable?',
    answer: 'For additions or alterations to an existing circuit that do not extend to the provision of a new circuit. Examples: adding a socket to an existing ring, replacing a light fitting, adding a fused spur. A new circuit (even a small one) requires a full EIC.',
    regs: ['Appendix 6 — Model Form 4'],
  },
  {
    question: 'Do I need to notify Building Control?',
    answer: 'If you are registered with a Competent Person Scheme (NICEIC, NAPIT, ELECSA etc.), you self-certify and the scheme notifies Building Control. If you are NOT registered, you must notify Building Control BEFORE starting notifiable work in a dwelling (Part P). Non-notifiable work includes like-for-like replacements.',
    regs: ['Building Regulations Part P', 'Approved Document P'],
  },
  {
    question: 'What is the maximum cable length for a circuit?',
    answer: 'There is no fixed maximum length — it depends on the conductor size, protective device rating, installation method, and acceptable voltage drop (3% lighting, 5% other). The limiting factor is usually Zs (must not exceed the 80% value for the protective device) or voltage drop.',
    regs: ['Reg 525 — Voltage drop', 'Appendix 3 — Zs tables', 'Appendix 4 — Voltage drop'],
  },
  {
    question: 'Can I use the existing earth on a TN-C-S supply for solar PV?',
    answer: 'PME earthing for PV requires careful consideration. If the inverter has galvanic isolation (transformer), the existing PME earth can be used. If the inverter does NOT have galvanic isolation, a separate TT earth electrode may be required for the DC side to avoid exporting dangerous voltages onto the PME system during a neutral fault.',
    regs: ['Reg 411.4.2', 'Chapter 82 (A3)', 'ENA EREC G98/G99'],
  },
  {
    question: 'Do I need an SPD (Surge Protection Device)?',
    answer: 'A3:2024 strengthens the requirement. SPDs must be fitted where the consequence of an overvoltage could result in serious injury, loss of human life, failure of safety services, or loss of irreplaceable items. In practice, most new domestic CU installations should include a Type 2 SPD. A risk assessment determines the requirement.',
    regs: ['Reg 534.1', 'Reg 443.4'],
  },
  {
    question: 'Can I work on a live circuit?',
    answer: 'Only if ALL THREE conditions of EAW Reg 14 are met: (a) it is unreasonable for the conductor to be dead, (b) it is reasonable for you to be at work near it, and (c) suitable precautions are taken. Live testing (Zs, PFC, voltage measurement) is generally justified. Live WORK (making/breaking connections) is almost never justified in fault finding or installation work.',
    regs: ['EAW Reg 14', 'GS38', 'HSG85'],
  },
  {
    question: 'What is the minimum cable size for a ring circuit?',
    answer: '2.5mm² copper for the line and neutral conductors, with a 1.5mm² CPC (for T&E cable). The ring must be protected by a 32A device maximum. Maximum floor area served: 100m². Maximum number of socket outlets: no limit in BS 7671, but the circuit must not be overloaded.',
    regs: ['Reg 433.1', 'Appendix 15'],
  },
  {
    question: 'When can I use a spur from a ring circuit?',
    answer: 'An unfused spur can supply ONE single or double socket outlet, or ONE fixed appliance. It must be connected at the terminals of a socket on the ring, at a junction box, or at the origin. Fused spurs (via a fused connection unit) can supply any number of outlets or appliances provided the fuse rating is appropriate.',
    regs: ['Appendix 15', 'Reg 433.1'],
  },
  {
    question: 'Do I need to test ALL circuits on an EICR?',
    answer: 'Not necessarily. BS 7671 requires a representative sample. Initial inspection should cover all accessible parts visually. Testing should cover a minimum sample of circuits — expanding if defects are found. However, best practice and many competent person schemes expect ALL circuits to be tested. The scope should be agreed with the client before starting.',
    regs: ['Reg 643', 'IET Guidance Note 3'],
  },
  {
    question: 'What is the difference between an isolator and a switch?',
    answer: 'An isolator (disconnector) provides a visible break for maintenance — it has no rated making or breaking capacity under load. A switch can make and break current under load. An MCB is both a switch and an overcurrent protective device. RCDs are NOT suitable isolation devices — they detect leakage but do not provide a reliable off-load break.',
    regs: ['Reg 134.2.2', 'Reg 537'],
  },
  {
    question: 'Can I install a socket in a bathroom?',
    answer: 'Not in Zones 0, 1 or 2. Shaver sockets complying with BS EN 61558-2-5 are permitted in Zone 2. Standard socket outlets are permitted outside Zone 2 (at least 3m from the bath or shower) with 30mA RCD protection. In practice, most UK bathrooms are too small for socket outlets to be outside Zone 2.',
    regs: ['Reg 701.512.3', 'Reg 701.415.2'],
  },
  {
    question: 'How do I know if an installation is TN-S, TN-C-S or TT?',
    answer: 'TN-S: separate earth conductor visible at the service head (often the lead sheath of the supply cable). TN-C-S (PME): combined neutral/earth — the earth terminal at the cutout is connected to the neutral. TT: no earth from the supply — a local earth electrode is used. Check the service head and main earthing terminal. If unsure, contact the DNO.',
    regs: ['Reg 312', 'Appendix 3'],
  },
  {
    question: 'What does the "N/A" column mean on the Schedule of Test Results?',
    answer: 'N/A means "Not Applicable" — the test was not required for this circuit. For example, ring circuit continuity is N/A on a radial circuit. Earth electrode resistance is N/A on a TN system. You must NOT leave cells blank without explanation — enter N/A with a reason if the test does not apply.',
    regs: ['Appendix 6 — Model forms'],
  },
];

const CommonScenariosPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Common Questions</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Plain-English answers to the questions electricians ask most. Each answer includes the regulation reference so you can verify it yourself.
            </p>
          </div>
        </motion.div>

        {scenarios.map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{s.question}</p>
              <p className="text-sm text-white/80 leading-relaxed">{s.answer}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.regs.map((reg, j) => (
                  <span key={j} className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg">{reg}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CommonScenariosPage;
