/**
 * Renewable Design Suite — landing. Four guided designers that share one
 * audited engine with the calculators, each ending in a pre-filled
 * certificate (or a copyable design summary where the cert is still to come).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { requestDesignProposal, designerPathFor } from '@/utils/renewables/designIntake';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface DesignCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  to: string;
  dot: string;
}

const CARDS: DesignCard[] = [
  {
    id: 'solar',
    eyebrow: 'Solar PV',
    title: 'Solar PV system',
    description:
      'Real MCS-listed panels and inverters, an automatic string plan, cabling and grid checks, a single-line diagram — then straight into the certificate.',
    meta: 'Pre-fills the cert',
    to: '/electrician/renewables/design/solar',
    dot: 'bg-yellow-500',
  },
  {
    id: 'battery',
    eyebrow: 'Battery',
    title: 'Battery storage',
    description:
      'Size against real daily usage, settle AC vs DC coupling, prove the G98/G99 route and export position.',
    meta: 'Pre-fills the cert',
    to: '/electrician/renewables/design/battery',
    dot: 'bg-emerald-500',
  },
  {
    id: 'ev',
    eyebrow: 'EV charging',
    title: 'EV charge point',
    description:
      'Pick a real charge point, prove the supply takes the load with diversity, settle the earthing approach.',
    meta: 'Pre-fills the cert',
    to: '/electrician/renewables/design/ev',
    dot: 'bg-violet-500',
  },
  {
    id: 'heat-pump',
    eyebrow: 'Heat pump',
    title: 'Heat pump supply',
    description:
      'Heat load from the building, electrical demand through the SCOP, supply and protective device sized.',
    meta: 'Design summary',
    to: '/electrician/renewables/design/heat-pump',
    dot: 'bg-orange-500',
  },
];

export default function DesignSuite() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [thinking, setThinking] = useState(false);

  const designForMe = async () => {
    if (description.trim().length < 10 || thinking) return;
    setThinking(true);
    try {
      const proposal = await requestDesignProposal(description.trim());
      toast.success('Design proposed — every number below is verified by the engine');
      navigate(designerPathFor(proposal.technology), { state: { proposal } });
    } catch (e) {
      toast.error('Could not propose a design', {
        description: e instanceof Error ? e.message : 'Try again, or start from a designer below.',
      });
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="px-4 sm:px-6 lg:px-10 w-full">
          <button
            type="button"
            onClick={() => navigate('/electrician/renewables')}
            className="group flex items-center gap-2 h-12 -ml-1 pr-3 text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
              Renewables
            </span>
          </button>
        </div>
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 lg:px-10 w-full"
      >
        <motion.header
          variants={item}
          className="pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-white/[0.1]"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-elec-yellow" aria-hidden />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white">
              Design Suite
            </span>
          </div>
          <h1 className="mt-3 text-[27px] sm:text-[36px] font-bold tracking-[-0.02em] leading-[1.04] text-white max-w-[22ch]">
            Design it once, prove it as you go
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-[72ch]">
            Each designer walks the job from kit choice to a compliant electrical design — the same
            audited engine as the calculators, ending in a pre-filled certificate.
          </p>
        </motion.header>

        {/* AI intake — describe the job, land in the right designer pre-filled */}
        <motion.section
          variants={item}
          className="mt-6 rounded-2xl border border-elec-yellow/30 bg-gradient-to-b from-elec-yellow/[0.08] to-elec-yellow/[0.02] p-5"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white">
              Describe the job
            </p>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-white/80 max-w-[68ch]">
            Tell it like you'd tell an apprentice — "4 kW on a south-facing slate roof, single
            phase, customer wants a battery later". It picks the kit and fills the designer; the
            engine checks every number.
          </p>
          <Textarea
            value={description}
            maxLength={2000}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. 10 panels on a bungalow in Carlisle, south roof, no shading, add a 7kW charger on the drive…"
            className="mt-3 touch-manipulation text-base min-h-[88px] bg-white/[0.05] border-white/[0.15] text-white rounded-xl focus:border-elec-yellow/60 focus:ring-elec-yellow/20"
          />
          <Button
            onClick={designForMe}
            disabled={description.trim().length < 10 || thinking}
            className="mt-3 w-full sm:w-auto h-12 px-6 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2 disabled:opacity-40"
          >
            {thinking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Designing…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Design it for me
              </>
            )}
          </Button>
        </motion.section>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {CARDS.map((c) => (
            <motion.button
              key={c.id}
              variants={item}
              type="button"
              onClick={() => navigate(c.to)}
              className="group text-left rounded-2xl border border-white/[0.1] bg-white/[0.025] hover:border-elec-yellow/35 hover:bg-white/[0.08] transition-colors p-5 touch-manipulation"
            >
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} aria-hidden />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/80">
                  {c.eyebrow}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h2 className="text-[19px] font-bold tracking-[-0.01em] text-white leading-tight">
                  {c.title}
                </h2>
                <ArrowRight className="h-4 w-4 mt-1.5 text-elec-yellow shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/75">{c.description}</p>
              <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-elec-yellow/90">
                {c.meta}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
