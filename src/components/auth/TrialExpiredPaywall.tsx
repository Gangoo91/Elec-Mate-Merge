import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const FEATURES = [
  'Certificates, quotes and invoices',
  '5 AI specialists trained on BS 7671',
  '50+ electrical calculators',
  'Study Centre, 46+ courses and mock exams',
  'RAMS, method statements and reports',
  'Branded client-ready output',
];

const TrialExpiredPaywall = () => {
  const navigate = useNavigate();
  const { trialEndsAt, signOut } = useAuth();

  const formattedTrialEnd = trialEndsAt
    ? new Date(trialEndsAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[10%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.14),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[520px] flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-[calc(env(safe-area-inset-top)+24px)] sm:px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Elec-Mate" className="h-10 w-10 rounded-xl" />
            <span className="text-[20px] font-bold tracking-[-0.02em] text-white">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="mt-10 flex-1 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-7 text-center sm:p-9">
          <h1 className="text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.5rem]">
            Subscribe to keep using{' '}
            <span className="text-yellow-400">Elec-Mate.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[26rem] text-[15px] leading-[1.65] text-white sm:text-[16px]">
            {formattedTrialEnd
              ? `Your free trial ended on ${formattedTrialEnd}. Pick a plan to pick up right where you left off.`
              : 'Pick a plan to unlock certificates, quotes, invoices and the whole platform.'}
          </p>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left">
            <p className="text-[13px] font-semibold text-yellow-400">What you get back</p>
            <div className="mt-4 space-y-2.5">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-white"
                >
                  <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              onClick={() => navigate('/subscriptions')}
              className="h-14 w-full touch-manipulation rounded-2xl bg-yellow-500 text-[15px] font-semibold text-black hover:bg-yellow-400"
            >
              Subscribe now
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut();
                window.location.replace('/');
              }}
              className="h-12 w-full touch-manipulation rounded-2xl border-white/[0.12] bg-transparent text-[14px] font-medium text-white hover:bg-white/[0.06]"
            >
              Sign out
            </Button>
          </div>

          <p className="mt-6 text-[13px] text-white">Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredPaywall;
