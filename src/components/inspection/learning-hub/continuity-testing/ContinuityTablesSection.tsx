import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const cableResistance = [
  ['1.0', '18.1 m\u03A9/m'],
  ['1.5', '12.1 m\u03A9/m'],
  ['2.5', '7.41 m\u03A9/m'],
  ['4.0', '4.61 m\u03A9/m'],
  ['6.0', '3.08 m\u03A9/m'],
  ['10', '1.83 m\u03A9/m'],
  ['16', '1.15 m\u03A9/m'],
  ['25', '0.727 m\u03A9/m'],
  ['35', '0.524 m\u03A9/m'],
  ['50', '0.387 m\u03A9/m'],
];

const tempCorrection = [
  ['20', '1.00'],
  ['30', '1.04'],
  ['40', '1.08'],
  ['50', '1.12'],
  ['60', '1.16'],
  ['70', '1.20'],
  ['80', '1.24'],
  ['90', '1.28'],
];

const typeBMcb = [
  ['6', '7.28'],
  ['10', '4.37'],
  ['16', '2.73'],
  ['20', '2.19'],
  ['25', '1.75'],
  ['32', '1.37'],
  ['40', '1.09'],
  ['50', '0.87'],
];

const typeCMcb = [
  ['6', '3.64'],
  ['10', '2.19'],
  ['16', '1.37'],
  ['20', '1.09'],
  ['25', '0.87'],
  ['32', '0.68'],
  ['40', '0.55'],
  ['50', '0.44'],
];

const bondingSizing = [
  ['16 or less', '6'],
  ['25', '6'],
  ['35', '10'],
  ['50', '16'],
  ['70', '16'],
  ['95', '25'],
  ['120', '25'],
  ['150', '35'],
];

const bondingResistance = [
  ['10mm\u00B2 \u00D7 5m', '0.009\u03A9'],
  ['16mm\u00B2 \u00D7 10m', '0.007\u03A9'],
  ['25mm\u00B2 \u00D7 15m', '0.004\u03A9'],
];

type SectionId = 'cable' | 'mcb' | 'ring' | 'bonding';

const GlassTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-[12px]">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left p-2 text-white font-semibold border-b border-white/[0.1]">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-white/[0.05]">
            {row.map((cell, j) => (
              <td key={j} className="p-2 text-white">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ContinuityTablesSection = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<SectionId | null>(null);
  const toggle = (id: SectionId) => setExpanded((prev) => (prev === id ? null : id));

  const renderExpandable = (id: SectionId, title: string, accent: string, content: React.ReactNode) => {
    const isOpen = expanded === id;
    const barMap: Record<string, string> = {
      blue: 'bg-blue-500/50',
      green: 'bg-green-500/50',
      orange: 'bg-orange-500/50',
      amber: 'bg-amber-500/50',
    };
    const textMap: Record<string, string> = {
      blue: 'text-blue-400',
      green: 'text-green-400',
      orange: 'text-orange-400',
      amber: 'text-amber-400',
    };
    return (
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => toggle(id)}
          className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
        >
          <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-white/[0.15]' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${barMap[accent]} rounded-l-2xl`} />
            <div className="p-4 flex items-center gap-3">
              <p className={`text-[13px] font-semibold ${textMap[accent]} flex-1`}>{title}</p>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-white shrink-0" />
              </motion.div>
            </div>
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-2 px-1 pb-1">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Values & Tables</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Quick Reference - always visible */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider px-0.5 mb-2">Quick Reference</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/[0.07] border border-white/[0.08] p-3 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-2xl" />
              <p className="text-[12px] font-semibold text-green-400">Good</p>
              <p className="text-lg font-bold text-white">&le;0.5&Omega;</p>
              <p className="text-[10px] text-white mt-0.5">Verify CPC continuity per BS 7671 guidance</p>
            </div>
            <div className="rounded-2xl bg-white/[0.07] border border-white/[0.08] p-3 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
              <p className="text-[12px] font-semibold text-amber-400">Acceptable</p>
              <p className="text-lg font-bold text-white">0.5-1.0&Omega;</p>
              <p className="text-[10px] text-white mt-0.5">Longer cable runs</p>
            </div>
            <div className="rounded-2xl bg-white/[0.07] border border-white/[0.08] p-3 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
              <p className="text-[12px] font-semibold text-red-400">Investigate</p>
              <p className="text-lg font-bold text-white">&gt;1.0&Omega;</p>
              <p className="text-[10px] text-white mt-0.5">Check connections</p>
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 mt-2">
            <p className="text-[12px] text-white">
              <span className="font-semibold text-blue-400">Note:</span> These are typical guidance values. Always compare measured R1+R2 against the maximum value permitted for your specific protective device using the tables below.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 mt-2">
            <p className="text-[12px] text-white">
              <span className="font-semibold text-green-400">Protective bonding continuity:</span> Typical acceptance &le;0.5&Omega; with good mechanical connection (BS 7671 guidance).
            </p>
          </div>
        </motion.div>

        {/* Cable Resistance Table */}
        {renderExpandable('cable', 'Cable Resistance Values (BS 7671 Table 9A)', 'blue', (
          <div className="space-y-3">
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-blue-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Copper Conductors (m&Omega;/m at 20&deg;C):</p>
                <GlassTable headers={['Size (mm\u00B2)', 'Resistance']} rows={cableResistance} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-blue-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Temperature Correction Factors:</p>
                <GlassTable headers={['Temp (\u00B0C)', 'Factor']} rows={tempCorrection} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-yellow-400">
                Formula: R&#8322;&#8320; &times; (230 + T&#8321;) &divide; (230 + T&#8322;)
              </p>
            </div>
          </div>
        ))}

        {/* MCB Values */}
        {renderExpandable('mcb', 'Maximum R1+R2 for Automatic Disconnection', 'green', (
          <div className="space-y-3">
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-green-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Type B MCBs (0.4s disconnection) - BS 7671 Table 41.3(a):</p>
                <GlassTable headers={['Rating (A)', 'Max Zs (\u03A9)']} rows={typeBMcb} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-green-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Type C MCBs (0.4s disconnection) - BS 7671 Table 41.3(b):</p>
                <GlassTable headers={['Rating (A)', 'Max Zs (\u03A9)']} rows={typeCMcb} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Calculation Method:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white"><span className="font-semibold">Formula:</span> Maximum R1+R2 = U&#8320; &divide; (Ia &times; &radic;3) for TN systems</p>
                <p className="text-[12px] text-white"><span className="font-semibold">Where:</span> U&#8320; = 230V (line to neutral voltage)</p>
                <p className="text-[12px] text-white"><span className="font-semibold">Ia:</span> Current causing automatic disconnection in 0.4s</p>
                <p className="text-[12px] text-white"><span className="font-semibold">Example:</span> 32A Type B MCB: Ia = 160A, so Max R1+R2 = 230 &divide; 160 = 1.44&Omega;</p>
              </div>
            </div>
          </div>
        ))}

        {/* Ring Circuit Values */}
        {renderExpandable('ring', 'Ring Circuit Specific Values', 'orange', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-white mb-1.5">Ring Final Circuit Limits:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- <span className="font-semibold">Maximum R1+R2:</span> 1.67&Omega; (BS 7671 Reg 543.1.4)</p>
                <p className="text-[12px] text-white">- <span className="font-semibold">Maximum floor area:</span> 100m&sup2; per ring</p>
                <p className="text-[12px] text-white">- <span className="font-semibold">Minimum cable size:</span> 2.5mm&sup2; copper</p>
                <p className="text-[12px] text-white">- <span className="font-semibold">Maximum protective device:</span> 32A (Type B or C)</p>
                <p className="text-[12px] text-white">- <span className="font-semibold">Typical cable length:</span> 106m maximum loop</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-white mb-1.5">Expected Test Results:</p>
              <p className="text-[12px] text-white font-semibold">2.5mm&sup2; ring (both legs):</p>
              <div className="space-y-0.5 ml-2 mb-1">
                <p className="text-[12px] text-white">- R1 end-to-end: ~0.4&Omega; per 50m</p>
                <p className="text-[12px] text-white">- R2 end-to-end: ~0.4&Omega; per 50m</p>
                <p className="text-[12px] text-white">- Socket test: (R1+R2)/4 &asymp; 0.2&Omega;</p>
              </div>
              <p className="text-[12px] text-white font-semibold">1.5mm&sup2; CPC variation:</p>
              <div className="space-y-0.5 ml-2">
                <p className="text-[12px] text-white">- R2 end-to-end: ~0.6&Omega; per 50m</p>
                <p className="text-[12px] text-white">- Socket test: (0.4+0.6)/4 = 0.25&Omega;</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-orange-400 mb-1.5">Ring Circuit Test Sequence:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Step 1: Continuity</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Phase leg-to-leg test</p>
                    <p className="text-[12px] text-white">- Neutral leg-to-leg test</p>
                    <p className="text-[12px] text-white">- CPC leg-to-leg test</p>
                    <p className="text-[12px] text-white">- Values should be similar</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Step 2: Cross-connection</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Connect L1 to N2, L2 to N1</p>
                    <p className="text-[12px] text-white">- Test at each socket outlet</p>
                    <p className="text-[12px] text-white">- All readings should be equal</p>
                    <p className="text-[12px] text-white">- Typically (R1+R1)/4</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Step 3: CPC Testing</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Connect L1 to CPC2, L2 to CPC1</p>
                    <p className="text-[12px] text-white">- Test at each socket outlet</p>
                    <p className="text-[12px] text-white">- Should give (R1+R2)/4</p>
                    <p className="text-[12px] text-white">- Must be &le;1.67&Omega; maximum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bonding Values */}
        {renderExpandable('bonding', 'Main Protective Bonding Conductor Values', 'amber', (
          <div className="space-y-3">
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-amber-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Bonding Conductor Sizing (BS 7671 Table 54.8):</p>
                <GlassTable headers={['Supply Conductor (mm\u00B2)', 'Min Bonding (mm\u00B2)']} rows={bondingSizing} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden">
              <div className="h-1 bg-amber-500/50" />
              <div className="p-3">
                <p className="text-[12px] font-semibold text-white mb-2">Expected Resistance Values:</p>
                <GlassTable headers={['Installation', 'Resistance']} rows={bondingResistance} />
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] text-white"><span className="font-semibold text-green-400">Acceptable range:</span> 0.001&Omega; to 0.05&Omega; typically</p>
              <p className="text-[12px] text-white mt-1"><span className="font-semibold text-red-400">Investigate if:</span> &gt;0.1&Omega; or infinite reading</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-red-400 mb-1.5">Bonding Conductor Test Requirements:</p>
              <p className="text-[12px] font-semibold text-white mb-1">Test Method:</p>
              <div className="space-y-0.5 mb-2">
                <p className="text-[12px] text-white">- Use continuity tester with adequate current</p>
                <p className="text-[12px] text-white">- Test between main earthing terminal and bonded service</p>
                <p className="text-[12px] text-white">- Clean connection points for accurate reading</p>
                <p className="text-[12px] text-white">- Account for parallel paths through structure</p>
              </div>
              <p className="text-[12px] font-semibold text-white mb-1">Common Issues:</p>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white">- Corroded connections at pipe work</p>
                <p className="text-[12px] text-white">- Loose clamp connections</p>
                <p className="text-[12px] text-white">- Plastic pipe sections interrupting continuity</p>
                <p className="text-[12px] text-white">- Inadequate conductor size for installation</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContinuityTablesSection;
