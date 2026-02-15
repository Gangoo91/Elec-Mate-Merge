import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import type { SharedPortfolioStructuredData } from '@/hooks/portfolio/useSharedPortfolioStructured';

interface SharedOverviewTabProps {
  data: SharedPortfolioStructuredData;
  onDownloadPDF: () => void;
  isDownloading: boolean;
}

export default function SharedOverviewTab({ data, onDownloadPDF, isDownloading }: SharedOverviewTabProps) {
  const { apprentice, units, ksb_summary, otj_hours, entries } = data;

  // Calculate AC coverage
  const totalACs = units.reduce(
    (sum, u) => sum + u.learning_outcomes.reduce((s, lo) => s + lo.assessment_criteria.length, 0),
    0
  );
  const metACs = units.reduce(
    (sum, u) =>
      sum + u.learning_outcomes.reduce((s, lo) => s + lo.assessment_criteria.filter((ac) => ac.is_met).length, 0),
    0
  );
  const acPct = totalACs > 0 ? Math.round((metACs / totalACs) * 100) : 0;

  // Calculate KSB completion
  const allKSBs = [...ksb_summary.knowledge, ...ksb_summary.behaviours];
  const completedKSBs = allKSBs.filter((k) => k.status === 'completed' || k.status === 'verified').length;
  const ksbPct = allKSBs.length > 0 ? Math.round((completedKSBs / allKSBs.length) * 100) : 0;

  const otjPct = otj_hours.percentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4"
    >
      {/* Apprentice Info Card */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-5 text-center">
        <h2 className="text-xl font-bold text-white">{apprentice.name}</h2>
        <p className="text-sm text-white mt-1">{apprentice.qualification}</p>
        {apprentice.code && (
          <p className="text-xs text-white mt-0.5">{apprentice.awarding_body} &middot; {apprentice.code}</p>
        )}
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-3 gap-3">
        <ProgressRing label="AC Coverage" value={acPct} detail={`${metACs}/${totalACs}`} colour="yellow" />
        <ProgressRing label="KSBs" value={ksbPct} detail={`${completedKSBs}/${allKSBs.length}`} colour="blue" />
        <ProgressRing label="OTJ Hours" value={Math.min(otjPct, 100)} detail={`${otj_hours.current}/${otj_hours.target}h`} colour="green" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{entries.length}</p>
          <p className="text-xs text-white mt-1">Evidence Items</p>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{units.length}</p>
          <p className="text-xs text-white mt-1">Units</p>
        </div>
      </div>

      {/* Download PDF */}
      <button
        onClick={onDownloadPDF}
        disabled={isDownloading}
        className="w-full h-12 rounded-xl bg-yellow-400 text-black font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation hover:bg-yellow-300 transition-colors disabled:opacity-50"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download Structured Portfolio PDF
          </>
        )}
      </button>
    </motion.div>
  );
}

// ─── Progress Ring Component ─────────────────────────────

function ProgressRing({
  label,
  value,
  detail,
  colour,
}: {
  label: string;
  value: number;
  detail: string;
  colour: 'yellow' | 'blue' | 'green';
}) {
  const size = 80;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colourMap = {
    yellow: { ring: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', text: 'text-yellow-400' },
    blue: { ring: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', text: 'text-blue-400' },
    green: { ring: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', text: 'text-green-400' },
  };

  const c = colourMap[colour];

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={c.ring}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <p className={`text-lg font-bold ${c.text} -mt-[52px] mb-6`}>{value}%</p>
      <p className="text-[10px] text-white font-medium mt-1">{label}</p>
      <p className="text-[10px] text-white">{detail}</p>
    </div>
  );
}
