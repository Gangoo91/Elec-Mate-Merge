import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Camera, Check, Loader2, Phone, X, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hosted enquiry page /enquire/:token (ELE-2022).
 *
 * For electricians with no website, a Google Site, a Facebook page or a link in
 * bio: one link that drops straight into their Enquiries inbox, photos included.
 * Uses the PUBLIC form token (never the email-address token).
 */

const ENDPOINT = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/inbound-enquiry-email';
const MAX_PHOTOS = 3;

const fieldBase =
  'w-full h-12 rounded-xl bg-[hsl(0_0%_13%)] border px-3.5 text-[15px] text-white placeholder:text-white/40 focus:outline-none touch-manipulation';
const fieldOk = `${fieldBase} border-white/10 focus:border-elec-yellow/60`;
const fieldBad = `${fieldBase} border-red-500/60 focus:border-red-500`;

interface Profile {
  found: boolean;
  company_name?: string;
  logo?: string | null;
  phone?: string | null;
}

interface Photo {
  name: string;
  mime_type: string;
  data: string; // base64, no prefix
  preview: string;
}

/** Shrink a phone photo to ≤1600px JPEG (~200–400 KB) before upload. */
async function shrink(file: File): Promise<Photo> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('Could not read that photo'));
      i.src = url;
    });
    const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    return {
      name: file.name,
      mime_type: 'image/jpeg',
      data: dataUrl.split(',')[1],
      preview: dataUrl,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function EnquireView() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['enquiry-form-profile', token],
    enabled: !!token,
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase.rpc(
        'get_enquiry_form_profile' as never,
        { p_token: token } as never
      );
      if (error) throw error;
      return data as unknown as Profile;
    },
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    message: '',
    company_website: '',
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [tried, setTried] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const nameMissing = tried && !form.name.trim();
  const reachMissing = tried && !form.phone.trim() && !form.email.trim();
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  // One at a time: decoding three 48MP phone photos at once can crash Safari on
  // older iPhones. A file that can't be read is skipped, the rest still go in.
  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    setErr(null);
    const room = MAX_PHOTOS - photos.length;
    let failed = 0;
    for (const file of [...files].slice(0, room)) {
      try {
        const ph = await shrink(file);
        setPhotos((p) => (p.length < MAX_PHOTOS ? [...p, ph] : p));
      } catch {
        failed++;
      }
    }
    if (failed) {
      setErr(
        failed === 1
          ? 'One photo could not be read. Try a JPEG or a screenshot of it.'
          : `${failed} photos could not be read. Try JPEGs or screenshots.`
      );
    }
  };

  const submit = async () => {
    setErr(null);
    setTried(true);
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setErr('Please add your name and a phone number or email so they can reply.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${ENDPOINT}?token=${encodeURIComponent(token ?? '')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          photos: photos.map(({ name, mime_type, data }) => ({ filename: name, mime_type, data })),
        }),
      });
      if (res.status === 404) {
        throw new Error('This page has changed. Please contact your electrician directly.');
      }
      if (res.status === 429) {
        throw new Error('Too many enquiries right now. Please try again shortly or call instead.');
      }
      if (res.status === 413) {
        throw new Error('The photos are too large. Remove one and try again.');
      }
      if (!res.ok) throw new Error('Something went wrong. Please try again.');
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
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
      <div className="min-h-[100svh] bg-[#0a0e17] grid place-items-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] p-8 text-center">
          <h1 className="text-lg font-semibold text-white">This enquiry page isn't available</h1>
          <p className="mt-2 text-[14px] text-white leading-relaxed">
            The link may have changed. Please contact your electrician directly.
          </p>
        </div>
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
            <h1 className="text-xl font-semibold text-white">Enquiry sent</h1>
            <p className="mt-2 text-[14px] text-white">
              {data.company_name} will be in touch shortly.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
            <div className="p-6 sm:p-8">
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
                    Get in touch
                  </p>
                  <h1 className="text-[18px] font-semibold text-white leading-tight truncate">
                    {data.company_name}
                  </h1>
                </div>
              </div>
              <p className="mt-3 text-[14px] text-white leading-relaxed">
                Tell us what you need. A photo of the job helps us give you a quicker, more accurate
                quote.
              </p>

              <form
                className="mt-5 space-y-3"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <input
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  aria-label="Your name"
                  autoComplete="name"
                  className={nameMissing ? fieldBad : fieldOk}
                />
                <input
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="Phone"
                  aria-label="Phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  className={reachMissing ? fieldBad : fieldOk}
                />
                <input
                  value={form.email}
                  onChange={set('email')}
                  placeholder="Email (optional)"
                  aria-label="Email address"
                  inputMode="email"
                  autoComplete="email"
                  className={reachMissing ? fieldBad : fieldOk}
                />
                <input
                  value={form.postcode}
                  onChange={set('postcode')}
                  placeholder="Postcode"
                  aria-label="Postcode"
                  autoComplete="postal-code"
                  className={fieldOk}
                />
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder="What do you need? (e.g. new fuse board, EV charger, sockets, a fault…)"
                  aria-label="What do you need?"
                  rows={4}
                  className="w-full rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/40 focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
                />
                {/* Spam trap: hidden from people, filled by bots */}
                <input
                  value={form.company_website}
                  onChange={set('company_website')}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                {/* Photos */}
                <div>
                  {photos.length > 0 && (
                    <div className="mb-2 grid grid-cols-3 gap-2">
                      {photos.map((ph, i) => (
                        <div
                          key={i}
                          className="relative aspect-square overflow-hidden rounded-xl border border-white/10"
                        >
                          <img
                            src={ph.preview}
                            alt={`Photo ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            aria-label="Remove photo"
                            onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                            className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white touch-manipulation"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-[14px] font-medium text-white touch-manipulation active:scale-[0.99]"
                    >
                      <Camera className="h-4 w-4" />
                      {photos.length ? 'Add another photo' : 'Add a photo (optional)'}
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      addPhotos(e.target.files);
                      e.target.value = '';
                    }}
                  />
                </div>

                {err && <p className="text-[13px] text-red-400 leading-relaxed">{err}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 touch-manipulation"
                >
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    'Send enquiry'
                  )}
                </button>

                {data.phone && (
                  <a
                    href={`tel:${data.phone.replace(/\s+/g, '')}`}
                    className="flex min-h-11 items-center justify-center gap-1.5 text-[14px] text-white touch-manipulation"
                  >
                    <Phone className="h-4 w-4" /> Or call {data.phone}
                  </a>
                )}
              </form>
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-[11px] text-white/40">Powered by Elec-Mate</p>
      </div>
    </div>
  );
}
