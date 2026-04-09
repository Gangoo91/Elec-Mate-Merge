import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

type SectionId = 'best-practice' | 'techniques' | 'troubleshooting' | 'qa' | 'records';

const ContinuityPracticalGuidanceSection = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<SectionId | null>(null);
  const toggle = (id: SectionId) => setExpanded((prev) => (prev === id ? null : id));

  const renderExpandable = (id: SectionId, title: string, accent: string, content: React.ReactNode) => {
    const isOpen = expanded === id;
    const barMap: Record<string, string> = {
      green: 'bg-green-500/50',
      blue: 'bg-blue-500/50',
      orange: 'bg-orange-500/50',
      purple: 'bg-purple-500/50',
      cyan: 'bg-cyan-500/50',
    };
    const topAccentMap: Record<string, string> = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      cyan: 'bg-cyan-500',
    };
    const borderActiveMap: Record<string, string> = {
      green: 'border-green-500/20',
      blue: 'border-blue-500/20',
      orange: 'border-orange-500/20',
      purple: 'border-purple-500/20',
      cyan: 'border-cyan-500/20',
    };
    const textMap: Record<string, string> = {
      green: 'text-green-400',
      blue: 'text-blue-400',
      orange: 'text-orange-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400',
    };
    return (
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => toggle(id)}
          className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
        >
          <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? borderActiveMap[accent] : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
            <div className={`absolute inset-x-0 top-0 h-[2px] ${topAccentMap[accent]}`} />
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${barMap[accent]} rounded-l-2xl`} />
            <div className="p-4 flex items-center gap-3">
              <p className={`text-[15px] font-bold ${textMap[accent]} flex-1`}>{title}</p>
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
            <h1 className="text-base font-semibold text-white">Practical Guide</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {/* Best Practice */}
        {renderExpandable('best-practice', 'Best Practice Testing Procedures', 'green', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-green-400 mb-1.5">Pre-Test Preparation:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Document the circuit: Sketch layout and identify all outlets</p>
                <p className="text-[12px] text-white">- Remove parallel paths: Disconnect all equipment and accessories</p>
                <p className="text-[12px] text-white">- Identify conductors: Use reliable marking and verification</p>
                <p className="text-[12px] text-white">- Check test equipment: Verify calibration and battery condition</p>
                <p className="text-[12px] text-white">- Measure lead resistance: Null function or manual calculation</p>
                <p className="text-[12px] text-white">- Plan test sequence: Logical order to minimise errors</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-green-400 mb-1.5">During Testing:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Good connections: Clean terminals and ensure secure contact</p>
                <p className="text-[12px] text-white">- Record immediately: Write down readings as taken</p>
                <p className="text-[12px] text-white">- Check for consistency: Similar circuits should have similar values</p>
                <p className="text-[12px] text-white">- Investigate anomalies: High or low readings need explanation</p>
                <p className="text-[12px] text-white">- Use correct range: Appropriate instrument settings for accuracy</p>
                <p className="text-[12px] text-white">- Safety awareness: Remain alert to potential hazards</p>
              </div>
            </div>
          </div>
        ))}

        {/* Practical Techniques */}
        {renderExpandable('techniques', 'Practical Testing Techniques', 'blue', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Efficient Test Routing:</p>
              <p className="text-[12px] text-white font-semibold mb-0.5">Radial circuits:</p>
              <div className="space-y-0.5 mb-2">
                <p className="text-[12px] text-white">- Start at distribution board with connections</p>
                <p className="text-[12px] text-white">- Work systematically to furthest point</p>
                <p className="text-[12px] text-white">- Test at final outlet or equipment position</p>
                <p className="text-[12px] text-white">- Record reading and verify calculation</p>
              </div>
              <p className="text-[12px] text-white font-semibold mb-0.5">Ring circuits:</p>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white">- Complete continuity tests first</p>
                <p className="text-[12px] text-white">- Set up cross-connections methodically</p>
                <p className="text-[12px] text-white">- Test every outlet on the ring</p>
                <p className="text-[12px] text-white">- Verify readings are consistent</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Professional Tips:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Use quality test leads: Low resistance and good durability</p>
                <p className="text-[12px] text-white">- Clean probe tips: Remove oxidation for good contact</p>
                <p className="text-[12px] text-white">- Check connections twice: Verify before and after testing</p>
                <p className="text-[12px] text-white">- Label as you go: Mark tested circuits to avoid confusion</p>
                <p className="text-[12px] text-white">- Cross-reference drawings: Verify actual vs. planned installation</p>
                <p className="text-[12px] text-white">- Photo document issues: Visual record of problems found</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-yellow-400 mb-1.5">Time-Saving Techniques:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Preparation Phase:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Pre-plan test sequence</p>
                    <p className="text-[12px] text-white">- Prepare test sheets in advance</p>
                    <p className="text-[12px] text-white">- Organise tools and equipment</p>
                    <p className="text-[12px] text-white">- Brief assistants on procedures</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Testing Phase:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Work systematically, don't jump around</p>
                    <p className="text-[12px] text-white">- Use radio communication for large sites</p>
                    <p className="text-[12px] text-white">- Batch similar tests together</p>
                    <p className="text-[12px] text-white">- Record results immediately</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Completion Phase:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Verify all tests completed</p>
                    <p className="text-[12px] text-white">- Check calculations are correct</p>
                    <p className="text-[12px] text-white">- Ensure proper reconnection</p>
                    <p className="text-[12px] text-white">- File results systematically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Troubleshooting */}
        {renderExpandable('troubleshooting', 'Troubleshooting Common Problems', 'orange', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-orange-400 mb-1.5">High Resistance Readings:</p>
              <p className="text-[12px] text-white font-semibold mb-0.5">Possible Causes:</p>
              <div className="space-y-0.5 mb-2">
                <p className="text-[12px] text-white">- Loose bolted connections at terminals or busbars</p>
                <p className="text-[12px] text-white">- Incorrect conductor size for the circuit</p>
                <p className="text-[12px] text-white">- Corroded clamp or terminal</p>
                <p className="text-[12px] text-white">- Damaged conductor (partial break)</p>
                <p className="text-[12px] text-white">- Poor crimped or soldered joints</p>
                <p className="text-[12px] text-white">- Intermittent contacts due to loose bolts</p>
                <p className="text-[12px] text-white">- Undersized bonding conductor</p>
                <p className="text-[12px] text-white">- Parallel resistance affecting reading</p>
              </div>
              <p className="text-[12px] text-white font-semibold mb-0.5">Investigation Steps:</p>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white">- Visual inspection of connections</p>
                <p className="text-[12px] text-white">- Test individual cable sections</p>
                <p className="text-[12px] text-white">- Check for mechanical damage</p>
                <p className="text-[12px] text-white">- Verify conductor specification</p>
                <p className="text-[12px] text-white">- Tighten all bolted connections and retest</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-orange-400 mb-1.5">Infinite Resistance Readings:</p>
              <p className="text-[12px] text-white font-semibold mb-0.5">Possible Causes:</p>
              <div className="space-y-0.5 mb-2">
                <p className="text-[12px] text-white">- Complete conductor break</p>
                <p className="text-[12px] text-white">- Disconnected terminal</p>
                <p className="text-[12px] text-white">- Blown fuse in circuit</p>
                <p className="text-[12px] text-white">- Isolation switch still open</p>
                <p className="text-[12px] text-white">- Test lead failure</p>
              </div>
              <p className="text-[12px] text-white font-semibold mb-0.5">Investigation Steps:</p>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white">- Verify test lead continuity</p>
                <p className="text-[12px] text-white">- Check all isolation points</p>
                <p className="text-[12px] text-white">- Inspect for obvious damage</p>
                <p className="text-[12px] text-white">- Test sections systematically</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-red-400 mb-1.5">Inconsistent Ring Circuit Readings:</p>
              <p className="text-[12px] text-white font-semibold mb-0.5">Symptoms:</p>
              <div className="space-y-0.5 mb-2">
                <p className="text-[12px] text-white">- Readings vary significantly around ring</p>
                <p className="text-[12px] text-white">- Some outlets show very high resistance</p>
                <p className="text-[12px] text-white">- End-to-end tests don't correlate</p>
                <p className="text-[12px] text-white">- Unexpected zero or infinite readings</p>
              </div>
              <p className="text-[12px] text-white font-semibold mb-0.5">Likely Causes:</p>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white">- Ring circuit not actually continuous</p>
                <p className="text-[12px] text-white">- Incorrect wiring (radials from ring)</p>
                <p className="text-[12px] text-white">- Crossed connections between circuits</p>
                <p className="text-[12px] text-white">- Interconnections between ring legs</p>
              </div>
            </div>
          </div>
        ))}

        {/* Quality Assurance */}
        {renderExpandable('qa', 'Quality Assurance and Verification', 'purple', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-purple-400 mb-1.5">Result Verification:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Sanity checks: Do results make sense for cable type/length?</p>
                <p className="text-[12px] text-white">- Comparison: Similar circuits should have similar values</p>
                <p className="text-[12px] text-white">- Calculation verification: Check arithmetic and formulas</p>
                <p className="text-[12px] text-white">- Regulation compliance: Ensure values meet BS 7671 requirements</p>
                <p className="text-[12px] text-white">- Design verification: Compare with design calculations</p>
                <p className="text-[12px] text-white">- Documentation: Complete and accurate test records</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-purple-400 mb-1.5">Professional Standards:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Competency: Ensure tester has appropriate qualifications</p>
                <p className="text-[12px] text-white">- Equipment calibration: Valid certificates for all instruments</p>
                <p className="text-[12px] text-white">- Method compliance: Follow BS 7671 and IET guidance</p>
                <p className="text-[12px] text-white">- Witnessing: Independent verification where required</p>
                <p className="text-[12px] text-white">- Sign-off: Responsible person validates results</p>
                <p className="text-[12px] text-white">- Traceability: Clear audit trail of all testing</p>
              </div>
            </div>
          </div>
        ))}

        {/* Record Keeping */}
        {renderExpandable('records', 'Record Keeping and Documentation', 'cyan', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-cyan-400 mb-1.5">Essential Records:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Test results: All measured values with units</p>
                <p className="text-[12px] text-white">- Test conditions: Temperature, test method, instrument used</p>
                <p className="text-[12px] text-white">- Circuit details: Cable type, length, protective device</p>
                <p className="text-[12px] text-white">- Compliance assessment: Pass/fail against requirements</p>
                <p className="text-[12px] text-white">- Remedial actions: Any work required to achieve compliance</p>
                <p className="text-[12px] text-white">- Tester signature: Qualified person responsible for testing</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-cyan-400 mb-1.5">Digital Record Keeping:</p>
              <div className="space-y-1">
                <p className="text-[12px] text-white">- Electronic forms: Reduce errors and improve legibility</p>
                <p className="text-[12px] text-white">- Photo documentation: Visual evidence of connections and issues</p>
                <p className="text-[12px] text-white">- Cloud storage: Secure backup and easy access</p>
                <p className="text-[12px] text-white">- Integration: Link with design software and databases</p>
                <p className="text-[12px] text-white">- Reporting: Automated generation of certificates</p>
                <p className="text-[12px] text-white">- Audit trails: Complete history of all changes</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-green-400 mb-1.5">Long-term Value of Good Records:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Maintenance:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Historical performance data</p>
                    <p className="text-[12px] text-white">- Deterioration trends</p>
                    <p className="text-[12px] text-white">- Predictive maintenance</p>
                    <p className="text-[12px] text-white">- Warranty claims</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Compliance:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Regulatory inspections</p>
                    <p className="text-[12px] text-white">- Insurance requirements</p>
                    <p className="text-[12px] text-white">- Legal evidence</p>
                    <p className="text-[12px] text-white">- Professional liability</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">Business:</p>
                  <div className="space-y-0.5">
                    <p className="text-[12px] text-white">- Quality demonstration</p>
                    <p className="text-[12px] text-white">- Client confidence</p>
                    <p className="text-[12px] text-white">- Repeat business</p>
                    <p className="text-[12px] text-white">- Professional reputation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContinuityPracticalGuidanceSection;
