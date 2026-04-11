import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const codes = [
  {
    code: 'C1',
    title: 'Danger Present',
    colour: 'red',
    description: 'Risk of injury. Immediate remedial action required. The inspector should consider isolating the defective part of the installation.',
    action: 'Immediate — must be rectified urgently. Consider isolating the affected circuit before leaving site.',
    examples: [
      'Exposed live parts accessible to touch',
      'Missing earth on socket outlets — no CPC connected',
      'Reversed polarity at socket outlets',
      'RCD fails to trip on test — no earth fault protection',
      'Broken CPC leaving circuit without earth protection',
      'Overheating causing immediate fire risk',
      'Safety interlock bypassed on machinery',
      'PFC exceeds breaking capacity of installed device',
    ],
  },
  {
    code: 'C2',
    title: 'Potentially Dangerous',
    colour: 'orange',
    description: 'Urgent remedial action required. Could become dangerous if not addressed.',
    action: 'Urgent — remedial action required as soon as possible. Client must be informed in writing.',
    examples: [
      'Insulation resistance below 1MΩ minimum',
      'Zs exceeding maximum for the protective device',
      'RCD trip time exceeding BS 7671 limits',
      'Inadequate PFC for magnetic MCB operation',
      'Missing RCD protection where required (Reg 411.3.3)',
      'Cables in walls without RCD protection or mechanical protection',
      'Loose connections causing overheating',
      'Missing main bonding to gas, water or structural steel',
    ],
  },
  {
    code: 'C3',
    title: 'Improvement Recommended',
    colour: 'yellow',
    description: 'Does not meet current standards but is not immediately dangerous. Improvement would enhance safety.',
    action: 'Advisory — no obligation to rectify, but recommended to bring the installation up to current standards.',
    examples: [
      'No RCD protection on circuits installed before RCD requirements existed',
      'Lack of supplementary bonding in bathroom (where not required by current regs)',
      'Old BS 3036 rewireable fuses — functional but not to current standard',
      'Missing circuit chart or illegible labelling',
      'Cable sheath discolouration indicating historic overheating',
      'Borderline Zs readings approaching maximum',
      'Plastic consumer unit (pre-2016 installations)',
      'No AFDD protection where now recommended (non-HRRB)',
    ],
  },
  {
    code: 'FI',
    title: 'Further Investigation Required',
    colour: 'blue',
    description: 'Cannot determine the condition without further investigation that is beyond the scope of this inspection.',
    action: 'Schedule further investigation — may require invasive access, specialist equipment, or extended testing time.',
    examples: [
      'Cannot access junction boxes concealed behind fixed panels',
      'Suspected cable damage behind plasterboard — requires lifting carpet or removing skirting',
      'Intermittent fault that could not be reproduced during inspection',
      'Unable to determine cable route to verify safe zone compliance',
      'Suspected parallel earth path giving misleadingly low Zs — needs investigation',
      'Circuit appears to have mixed cable sizes — needs tracing to confirm',
    ],
  },
];

const overallAssessment = [
  { result: 'Satisfactory', meaning: 'The installation is in a satisfactory condition for continued use. There may be C3 observations but no C1 or C2 codes.', colour: 'green' },
  { result: 'Unsatisfactory', meaning: 'The installation has one or more C1 or C2 observations. Remedial action is required before the installation can be considered satisfactory.', colour: 'red' },
];

const EICRCodingPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">EICR Coding</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              EICR observation codes classify the severity of defects found during periodic inspection. Getting the coding right is essential — it determines the urgency of remedial action and has legal implications for the duty holder.
            </p>
          </div>
        </motion.div>

        {codes.map((c, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className={`rounded-2xl bg-white/[0.03] border ${c.colour === 'red' ? 'border-red-400/20' : c.colour === 'orange' ? 'border-orange-400/20' : c.colour === 'yellow' ? 'border-yellow-400/20' : 'border-blue-400/20'} overflow-hidden`}>
              <div className={`px-4 py-3 ${c.colour === 'red' ? 'bg-red-400/10' : c.colour === 'orange' ? 'bg-orange-400/10' : c.colour === 'yellow' ? 'bg-yellow-400/10' : 'bg-blue-400/10'} border-b border-white/[0.06]`}>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg px-3 py-1 ${c.colour === 'red' ? 'bg-red-400/20' : c.colour === 'orange' ? 'bg-orange-400/20' : c.colour === 'yellow' ? 'bg-yellow-400/20' : 'bg-blue-400/20'}`}>
                    <span className={`text-lg font-black ${c.colour === 'red' ? 'text-red-400' : c.colour === 'orange' ? 'text-orange-400' : c.colour === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`}>{c.code}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className="text-xs text-white/70">{c.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">Required Action</p>
                  <p className="text-sm text-white">{c.action}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/60 mb-2">Examples</p>
                  <div className="space-y-1">
                    {c.examples.map((ex, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${c.colour === 'red' ? 'bg-red-400' : c.colour === 'orange' ? 'bg-orange-400' : c.colour === 'yellow' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                        <p className="text-xs text-white">{ex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Overall assessment */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Overall Assessment</p>
          <div className="grid grid-cols-2 gap-3">
            {overallAssessment.map((a, i) => (
              <div key={i} className={`rounded-2xl p-4 ${a.colour === 'green' ? 'bg-green-400/10 border border-green-400/20' : 'bg-red-400/10 border border-red-400/20'}`}>
                <p className={`text-sm font-bold ${a.colour === 'green' ? 'text-green-400' : 'text-red-400'}`}>{a.result}</p>
                <p className="text-xs text-white mt-1">{a.meaning}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Professional Tip</p>
            <p className="text-sm text-white leading-relaxed">
              If you are unsure between C2 and C3, ask yourself: "Could this defect cause injury or damage if left unaddressed?" If yes, it is C2. If it is simply not to current standards but poses no immediate or foreseeable risk, it is C3. When in doubt, code higher — it is better to over-report than under-report.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EICRCodingPage;
