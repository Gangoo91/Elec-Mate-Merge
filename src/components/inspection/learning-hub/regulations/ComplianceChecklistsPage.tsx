import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const checklists = [
  {
    title: 'New Domestic Installation',
    cert: 'EIC + Schedule of Test Results',
    items: [
      'Consumer unit: BS EN 61439-3, non-combustible enclosure',
      'All socket circuits ≤32A: 30mA RCD protection (Reg 411.3.3)',
      'Cables in walls &lt;50mm depth: 30mA RCD or mechanical protection (Reg 411.3.4)',
      'SPD: Type 2 minimum at origin (Reg 534) — assess risk',
      'AFDD: Required for HMO/HRRB socket circuits ≤32A (A3)',
      'Circuit chart: Durable, at or near the CU (Reg 514.8)',
      'RCD test notice: Durable notice at origin (Reg 514.12.2)',
      'All tests: Continuity, IR, polarity, Zs, PFC, RCD, functional',
      'Building Control notification via Competent Person Scheme or direct',
      'EIC issued to person ordering the work + duplicate retained',
    ],
  },
  {
    title: 'Consumer Unit Change',
    cert: 'EIC + Schedule of Test Results',
    items: [
      'New CU: BS EN 61439-3, non-combustible (metal) enclosure',
      'RCD protection: 30mA on all socket circuits (even if not previously fitted)',
      'SPD: Assess requirement — A3 makes SPDs a consideration for all new CUs',
      'AFDD: Required for HMO/HRRB socket circuits (A3)',
      'Re-test ALL circuits: continuity, IR, polarity, Zs, PFC, RCD, functional',
      'Circuit chart: Update and affix to new CU',
      'RCD test notice: Affix at origin',
      'Main bonding: Verify and record — this is your opportunity to check',
      'Earthing: Verify Ze, earthing conductor, MET connections',
      'EIC: Full EIC required (not Minor Works — this is a new assembly)',
      'Building Control notification required',
    ],
  },
  {
    title: 'EICR Periodic Inspection',
    cert: 'EICR + Schedule of Test Results + Schedule of Inspections',
    items: [
      'Visual inspection of ALL accessible parts of the installation',
      'Sample testing: minimum 10% of circuits for initial inspection, more if defects found',
      'Continuity of protective conductors and main bonding',
      'Insulation resistance on each circuit',
      'Polarity verification',
      'Zs at furthest point of each sampled circuit',
      'PFC at origin',
      'RCD operation: T button + calibrated test at 1× and 5× IΔn',
      'Functional testing of switches, controls, interlocks',
      'Code observations: C1, C2, C3, FI with descriptions',
      'Overall assessment: Satisfactory / Unsatisfactory',
      'Recommended next inspection date',
      'EICR issued to person ordering the work',
    ],
  },
  {
    title: 'EV Charger Installation',
    cert: 'EIC + Schedule of Test Results',
    items: [
      'RCD: Type A with 6mA DC detection (Type A-EV) or Type B (Reg 722.531.2)',
      'Cable: Dedicated circuit from CU — typically 6mm² or 10mm² T&amp;E or SWA',
      'Protection: Dedicated MCB/RCBO — typically 32A Type B or C',
      'PME earthing: Risk assessment required (Reg 411.4.2). Consider separate TT electrode.',
      'SPD: Type 2 at origin (Reg 534)',
      'Labelling: Warning notice at origin, CU and charger location',
      'DNO notification: G98/G99 application if &gt;3.68kW or export capable',
      'All tests: Continuity, IR, polarity, Zs, PFC, RCD, functional',
      'Charger commissioning: Verify pilot signal, LED status, charge function',
      'EIC + Building Control notification',
    ],
  },
  {
    title: 'Solar PV Installation',
    cert: 'EIC + Schedule of Test Results + G98/G99',
    items: [
      'DC isolation: Accessible DC isolator adjacent to inverter',
      'AC isolation: Lockable AC isolator between inverter and CU',
      'RCD: Type A minimum on AC side; consider Type B if no galvanic isolation',
      'SPD: Type 2 on both DC and AC sides (Reg 534)',
      'Labelling: Warning notices at origin, meter, CU, inverter and all isolation points',
      'PME: Assess earthing — separate TT electrode may be required for DC side',
      'Anti-islanding: Verify during commissioning (Chapter 82, A3)',
      'DNO notification: G98 (&lt;3.68kW) or G99 (&gt;3.68kW) application',
      'All AC tests + DC insulation resistance',
      'EIC + Building Control notification',
    ],
  },
];

const ComplianceChecklistsPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Compliance Checklists</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Use these checklists to ensure you meet all regulatory requirements for each job type. Each item references the specific BS 7671 regulation so you can verify compliance.
            </p>
          </div>
        </motion.div>

        {checklists.map((cl, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-yellow-400/5 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-white">{cl.title}</p>
                <p className="text-[10px] text-yellow-400 mt-0.5">{cl.cert}</p>
              </div>
              <div className="p-4 space-y-1.5">
                {cl.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-yellow-400" />
                    </div>
                    <p className="text-xs text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ComplianceChecklistsPage;
