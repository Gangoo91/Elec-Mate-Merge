/**
 * /verify — the front door for checking an electrician's Elec-ID.
 *
 * A site manager gets told "my Elec-ID is EM-XXXX" — this is where they type
 * it. No account needed. Submits straight to /verify/:number, which the
 * verification-grade RPC serves.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VerifyElecIdLookup = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');

  const go = () => {
    const clean = number.trim().toUpperCase();
    if (clean.length < 4) return;
    navigate(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <Helmet>
        <title>Verify an Electrician — Elec-ID | Elec-Mate</title>
        <meta
          name="description"
          content="Check an electrician's verified credentials instantly. Enter their Elec-ID number to see qualifications, ECS card status and verification."
        />
      </Helmet>

      <div className="w-full max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
          Elec-ID verification
        </p>
        <h1 className="mt-1.5 text-3xl font-semibold text-white tracking-[-0.02em] leading-[1.1]">
          Check an electrician's credentials
        </h1>
        <p className="mt-3 text-[13.5px] text-white/75 leading-relaxed">
          Every Elec-ID holder carries a unique number. Enter it below to see their verified
          qualifications, ECS card status and identity — straight from the record, not a
          photocopy.
        </p>

        <div className="mt-7">
          <label htmlFor="elec-id-number" className="block text-[11.5px] font-medium text-white/75 mb-1.5">
            Elec-ID number
          </label>
          <div className="flex gap-2.5">
            <input
              id="elec-id-number"
              type="text"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              value={number}
              onChange={(e) => setNumber(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && go()}
              placeholder="e.g. EM-2024-1234"
              className={cn(
                'flex-1 h-13 min-h-[52px] px-4 rounded-xl font-mono text-[17px] tracking-wider',
                'bg-white/[0.08] border border-white/[0.16] text-white placeholder:text-white/40 placeholder:font-sans placeholder:text-[14px] placeholder:tracking-normal',
                'outline-none transition-colors focus:border-elec-yellow/60 touch-manipulation'
              )}
            />
            <Button
              onClick={go}
              disabled={number.trim().length < 4}
              className="h-13 min-h-[52px] px-6 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation disabled:opacity-40"
            >
              Verify
            </Button>
          </div>
          <p className="mt-2 text-[11.5px] text-white/60">
            Usually on their profile, CV or the QR code they've shared with you.
          </p>
        </div>

        <div className="mt-9 pt-6 border-t border-white/[0.08]">
          <p className="text-[12px] text-white/70 leading-relaxed">
            <span className="text-white font-medium">What you'll see:</span> name and photo,
            verified qualifications, ECS card type and expiry, and whether the profile has been
            verified — with no contact details unless they've chosen to share them.
          </p>
          <a
            href="https://www.elec-mate.com"
            className="inline-block mt-4 text-[12.5px] font-medium text-elec-yellow hover:underline"
          >
            Elec-ID is part of Elec-Mate →
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyElecIdLookup;
