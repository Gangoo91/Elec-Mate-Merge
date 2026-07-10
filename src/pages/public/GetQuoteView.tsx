import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useLeadPage, useSubmitEnquiry } from '@/hooks/usePublicLeadPage';
import { Loader2, Check, Zap, Phone, ShieldCheck } from 'lucide-react';

const field =
  'w-full h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 text-[14px] text-white placeholder:text-white/35 focus:border-elec-yellow/60 focus:outline-none touch-manipulation';

export default function GetQuoteView() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useLeadPage(slug);
  const submit = useSubmitEnquiry();
  const [form, setForm] = useState({ name: '', phone: '', email: '', summary: '' });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErr(null);
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setErr('Please add your name and a phone or email so they can reply.');
      return;
    }
    try {
      await submit.mutateAsync({
        slug: slug!,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        summary: form.summary.trim(),
      });
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100svh] bg-[#0a0e17] grid place-items-center">
        <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!data?.found) {
    return (
      <div className="min-h-[100svh] bg-[#0a0e17] grid place-items-center px-6 text-center">
        <p className="text-white/70 text-[15px]">This quote page isn't available.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100svh] bg-[#0a0e17] flex items-start sm:items-center justify-center px-4 py-10"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="w-full max-w-md">
        {done ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-10 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-500/15 grid place-items-center">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">Request sent</h1>
            <p className="mt-2 text-[14px] text-white/70">
              {data.company_name} will be in touch shortly.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
            <div className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                {data.logo ? (
                  <img
                    src={data.logo}
                    alt={data.company_name}
                    className="h-12 w-12 rounded-xl object-cover border border-white/10"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 grid place-items-center">
                    <Zap className="h-6 w-6 text-elec-yellow" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-elec-yellow font-medium">
                    Get a quote
                  </p>
                  <h1 className="text-[18px] font-semibold text-white leading-tight truncate">
                    {data.company_name}
                  </h1>
                </div>
              </div>

              <p className="mt-3 text-[14px] text-white/70 leading-relaxed">
                {data.headline ||
                  `Tell ${data.company_name} what you need and they'll come back to you with a quote.`}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-[12px] text-white/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Registered electrician · quotes to BS 7671
              </div>

              <div className="mt-5 space-y-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  aria-label="Your name"
                  autoComplete="name"
                  className={field}
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  aria-label="Phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  className={field}
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email (optional)"
                  aria-label="Email address"
                  inputMode="email"
                  autoComplete="email"
                  className={field}
                />
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="What do you need? (e.g. rewire, new fuse board, EV charger, fault-finding…)"
                  rows={4}
                  className="w-full rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/35 focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
                />

                {err && <p className="text-[12.5px] text-red-400 leading-relaxed">{err}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={submit.isPending}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 touch-manipulation"
                >
                  {submit.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Request my quote'
                  )}
                </button>

                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center justify-center gap-1.5 text-[13px] text-white/55 hover:text-white/80 py-1 touch-manipulation"
                  >
                    <Phone className="h-3.5 w-3.5" /> Or call {data.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-[11px] text-white/25">Powered by Elec-Mate</p>
      </div>
    </div>
  );
}
