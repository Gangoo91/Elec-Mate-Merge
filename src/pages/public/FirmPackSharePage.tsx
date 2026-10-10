/**
 * Public "our pack" page (ELE-2076): what a firm chose to share with a main
 * contractor for prequalification. Opened signed out from /firm-pack/:token.
 * Everything comes from get_pack_share_by_token, which returns nothing but
 * the firm's name once the link has expired or been stopped. Files are
 * fetched as 10-minute links from the firm-pack-files edge function while
 * the share is live (refreshed while the page is open), so stopping the
 * share recalls them. Older shares may hold a link; only https is shown.
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { isHttpsUrl, shareDocumentLinks } from '@/components/employer/compliance/packFiles';

interface PackItem {
  type: 'document' | 'policy';
  title: string;
  document_id?: string | null;
  has_file?: boolean;
  category?: string | null;
  insurer?: string | null;
  policy_number?: string | null;
  cover?: string | null;
  expiry?: string | null;
  url?: string | null;
  version?: number | null;
  review_date?: string | null;
  content?: string;
}

interface PackShare {
  status: 'active' | 'expired' | 'revoked' | 'not_found';
  company_name?: string | null;
  questionnaire?: string;
  recipient?: string | null;
  items?: PackItem[];
  summary?: {
    company_name?: string | null;
    registration_scheme?: string | null;
    registration_number?: string | null;
    registration_expiry?: string | null;
    company_number?: string | null;
    safety_score?: number | null;
    produced_on?: string;
  };
  created_at?: string;
  expires_at?: string;
}

const LABEL: Record<string, string> = {
  chas: 'CHAS',
  ssip: 'SSIP',
  constructionline: 'Constructionline',
  custom: 'prequalification',
};

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

export default function FirmPackSharePage() {
  const { token } = useParams<{ token: string }>();
  const [pack, setPack] = useState<PackShare | null>(null);
  const [openPolicy, setOpenPolicy] = useState<number | null>(null);
  const [links, setLinks] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc(
        'get_pack_share_by_token' as never,
        { p_token: token ?? '' } as never
      );
      if (cancelled) return;
      setPack(error || !data ? { status: 'not_found' } : (data as unknown as PackShare));
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // 10-minute file links, refreshed every 8 minutes while the page is open.
  const live = pack?.status === 'active';
  useEffect(() => {
    if (!live || !token) return;
    let cancelled = false;
    const load = () =>
      shareDocumentLinks(token).then((l) => {
        if (!cancelled) setLinks(l);
      });
    load();
    const t = window.setInterval(load, 8 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, [live, token]);

  if (!pack) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-700" aria-label="Loading" />
      </div>
    );
  }

  if (pack.status !== 'active') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          {pack.status === 'not_found'
            ? 'This link is not valid'
            : pack.status === 'revoked'
              ? 'This link is no longer active'
              : 'This link has expired'}
        </h1>
        <p className="mt-2 max-w-md text-[15px] text-gray-700">
          {pack.status === 'not_found'
            ? 'Check you have the whole link.'
            : `Ask ${pack.company_name || 'the firm'} to send you a new one.`}
        </p>
      </div>
    );
  }

  const s = pack.summary ?? {};
  const docs = (pack.items ?? []).filter((i) => i.type === 'document');
  const policies = (pack.items ?? []).filter((i) => i.type === 'policy');
  const name = s.company_name || pack.company_name || 'Our firm';
  const fileLink = (d: PackItem): string | null => {
    const u = (d.document_id ? links?.[d.document_id] : null) || d.url;
    return isHttpsUrl(u) ? u : null;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-[13px] font-medium text-gray-700">
          {LABEL[pack.questionnaire ?? 'custom']} documents
          {pack.recipient ? ` for ${pack.recipient}` : ''}
        </p>
        <h1 className="mt-1 text-[28px] font-semibold tracking-tight">{name}</h1>
        <p className="mt-2 text-[15px] text-gray-700">
          {[
            s.registration_scheme
              ? `Registered with ${s.registration_scheme}${s.registration_number ? `, number ${s.registration_number}` : ''}${s.registration_expiry ? `, until ${ukDate(s.registration_expiry)}` : ''}`
              : null,
            s.company_number ? `Company number ${s.company_number}` : null,
          ]
            .filter(Boolean)
            .join('. ')}
        </p>
        <p className="mt-1 text-[13px] text-gray-700">
          Shared {ukDate(pack.created_at)}. This link stops working on {ukDate(pack.expires_at)}.
        </p>

        {s.safety_score != null && (
          <div className="mt-6 rounded-xl border border-gray-200 px-4 py-3">
            <p className="text-[13px] font-medium text-gray-700">Safety score</p>
            <p className="text-[22px] font-semibold">{s.safety_score} out of 100</p>
            <p className="text-[13px] text-gray-700">
              Worked out from the last 30 to 90 days of the firm’s own records: toolbox talks
              signed, near misses closed, RAMS issued, COSHH in date.
            </p>
          </div>
        )}

        <h2 className="mt-8 text-[17px] font-semibold">Certificates and insurance</h2>
        {docs.length === 0 ? (
          <p className="mt-2 text-[15px] text-gray-700">None shared.</p>
        ) : (
          <ul className="mt-2 divide-y divide-gray-200 rounded-xl border border-gray-200">
            {docs.map((d, i) => (
              <li key={i} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold">{d.title}</p>
                  <p className="text-[13px] text-gray-700">
                    {[
                      d.category,
                      d.insurer,
                      d.policy_number ? `policy ${d.policy_number}` : null,
                      d.cover ? `limit ${d.cover}` : null,
                      d.expiry ? `renews ${ukDate(d.expiry)}` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                {fileLink(d) ? (
                  <a
                    href={fileLink(d)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-gray-900 px-5 text-[14px] font-semibold text-white touch-manipulation"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-[13px] text-gray-700">
                    {d.document_id && d.has_file
                      ? links === null
                        ? 'Getting the file'
                        : 'File not available. Ask the firm to send it.'
                      : 'No file'}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <h2 className="mt-8 text-[17px] font-semibold">Policies</h2>
        {policies.length === 0 ? (
          <p className="mt-2 text-[15px] text-gray-700">None shared.</p>
        ) : (
          <ul className="mt-2 divide-y divide-gray-200 rounded-xl border border-gray-200">
            {policies.map((p, i) => (
              <li key={i} className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => setOpenPolicy(openPolicy === i ? null : i)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left touch-manipulation"
                >
                  <span>
                    <span className="block text-[15px] font-semibold">{p.title}</span>
                    <span className="block text-[13px] text-gray-700">
                      {[
                        p.version ? `Version ${p.version}` : null,
                        p.review_date ? `review due ${ukDate(p.review_date)}` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  <span className="text-[13px] font-semibold">
                    {openPolicy === i ? 'Hide' : 'Read'}
                  </span>
                </button>
                {openPolicy === i && (
                  <div className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-gray-800">
                    {p.content}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-[12px] text-gray-700">Shared through Elec-Mate.</p>
      </div>
    </div>
  );
}
