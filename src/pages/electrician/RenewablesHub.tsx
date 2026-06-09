import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface HubCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  to?: string;
  meta: string;
  comingSoon?: boolean;
}

const HUB_CARDS: HubCard[] = [
  {
    id: 'design',
    eyebrow: 'Design',
    title: 'Solar Design Suite',
    description:
      'Roof planner, system sizing and single-line diagrams — pre-fills the certificate and a quote.',
    meta: 'Coming soon',
    comingSoon: true,
  },
  {
    id: 'certificates',
    eyebrow: 'Certs',
    title: 'Certificates',
    description: 'Solar PV, battery, EV and heat pump — plus G98 & G99 grid connection.',
    to: '/electrician/renewables/certificates',
    meta: '6 types',
  },
  {
    id: 'quote',
    eyebrow: 'Money',
    title: 'Quote & costing',
    description: 'Price a renewable job — materials, labour and 0% domestic VAT.',
    to: '/electrician/business',
    meta: 'Build a quote',
  },
  {
    id: 'calculators',
    eyebrow: 'BS 7671',
    title: 'Calculators',
    description: 'PV string sizing, array yield, cable sizing and voltage drop.',
    to: '/electrician/renewables/calculators',
    meta: 'Purpose-built',
  },
  {
    id: 'projects',
    eyebrow: 'Pipeline',
    title: 'Projects',
    description: 'Track each job from survey to DNO sign-off.',
    to: '/electrician/projects',
    meta: 'Your pipeline',
  },
];

const JOURNEY = ['Design', 'Quote', 'Install', 'Commission', 'Certify', 'Handover'];

export default function RenewablesHub() {
  const navigate = useNavigate();

  const open = (card: HubCard) => {
    if (card.comingSoon || !card.to) {
      toast('Solar Design Suite is coming soon', {
        description:
          'Design from panel data, auto single-line diagrams, then pre-fill the MCS cert.',
      });
      return;
    }
    navigate(card.to);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-10 py-2 w-full">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Renewables</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 lg:px-10 py-5 w-full space-y-6"
      >
        {/* Intro + journey spine */}
        <motion.div variants={item}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow/90">
            Design to certificate
          </p>
          <p className="text-[13px] text-white/55 mt-1.5 leading-relaxed max-w-[60ch]">
            Everything for a renewable install in one place — UK-code-aware (BS 7671 A4:2026, MCS,
            G98/G99).
          </p>
          <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {JOURNEY.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-medium text-white/70 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  {step}
                </span>
                {i < JOURNEY.length - 1 && <span className="text-white/25 text-[11px]">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card grid — editorial, matches the Electrical Hub */}
        <motion.div variants={item} className="flex items-end justify-between gap-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            In this area
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="relative grid grid-cols-1 sm:grid-cols-2 auto-rows-[208px] sm:auto-rows-[232px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
          {HUB_CARDS.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => open(card)}
              className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 text-left touch-manipulation flex flex-col h-full"
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    · {card.eyebrow}
                  </span>
                </div>
                {card.comingSoon && (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/10 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </div>

              <h3 className="mt-3 sm:mt-4 text-[20px] sm:text-[22px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch]">
                {card.description}
              </p>

              <div className="flex-grow" />

              <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
                <span className="text-[11px] text-white/55 truncate tabular-nums">{card.meta}</span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                  {card.comingSoon ? 'Preview' : 'Open'}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
