import { useEffect, useState, useCallback } from 'react';
import { Sparkles, Link2, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { toast } from '@/hooks/use-toast';

/**
 * Mate-style auto-linking — finds unlinked quotes / invoices / certificates /
 * site visits that look like they belong to THIS project (same customer name
 * or same address/postcode) and offers one-tap linking. Closes the gap where
 * documents created outside the project page (standalone builders, Mate on
 * WhatsApp) never get a project_id stamped.
 */

type SuggestionType = 'quote' | 'invoice' | 'certificate' | 'siteVisit';

interface Suggestion {
  type: SuggestionType;
  id: string;
  label: string;
  sublabel: string;
}

const TYPE_LABEL: Record<SuggestionType, string> = {
  quote: 'Quote',
  invoice: 'Invoice',
  certificate: 'Certificate',
  siteVisit: 'Site visit',
};

interface ProjectSuggestedLinksProps {
  projectId: string;
  customerName?: string | null;
  location?: string | null;
  linkQuote: (id: string) => Promise<unknown>;
  linkInvoice: (id: string) => Promise<unknown>;
  linkCertificate: (id: string) => Promise<unknown>;
  linkSiteVisit: (id: string) => Promise<unknown>;
}

const UK_POSTCODE = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})\b/i;

export function ProjectSuggestedLinks({
  projectId,
  customerName,
  location,
  linkQuote,
  linkInvoice,
  linkCertificate,
  linkSiteVisit,
}: ProjectSuggestedLinksProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [linkingId, setLinkingId] = useState<string | null>(null);
  const [linkingAll, setLinkingAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const name = customerName?.trim();
      const postcodeMatch = location ? UK_POSTCODE.exec(location) : null;
      const postcode = postcodeMatch ? `${postcodeMatch[1]} ${postcodeMatch[2]}` : null;
      if (!name && !postcode) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const found: Suggestion[] = [];

      if (name) {
        const namePattern = `%${name}%`;
        const [quotesRes, invoicesRes, certsRes] = await Promise.all([
          supabase
            .from('quotes')
            .select('id, quote_number, total, status')
            .eq('user_id', user.id)
            .is('project_id', null)
            .eq('invoice_raised', false)
            .ilike('client_data->>name', namePattern)
            .limit(5),
          supabase
            .from('quotes')
            .select('id, invoice_number, total, invoice_status')
            .eq('user_id', user.id)
            .is('project_id', null)
            .eq('invoice_raised', true)
            .ilike('client_data->>name', namePattern)
            .limit(5),
          supabase
            .from('reports')
            .select('id, report_type, status')
            .eq('user_id', user.id)
            .is('project_id', null)
            .ilike('client_name', namePattern)
            .limit(5),
        ]);

        for (const q of quotesRes.data || []) {
          found.push({
            type: 'quote',
            id: q.id,
            label: q.quote_number ? `#${q.quote_number}` : 'Quote',
            sublabel: `£${Number(q.total || 0).toLocaleString()} · ${q.status || 'draft'}`,
          });
        }
        for (const inv of invoicesRes.data || []) {
          found.push({
            type: 'invoice',
            id: inv.id,
            label: inv.invoice_number ? `#${inv.invoice_number}` : 'Invoice',
            sublabel: `£${Number(inv.total || 0).toLocaleString()} · ${inv.invoice_status || 'draft'}`,
          });
        }
        for (const c of certsRes.data || []) {
          found.push({
            type: 'certificate',
            id: c.id,
            label: (c.report_type || 'Certificate').toUpperCase().replace(/-/g, ' '),
            sublabel: c.status || '',
          });
        }
      }

      if (postcode) {
        const { data: visits } = await supabase
          .from('site_visits')
          .select('id, property_address, property_postcode, status')
          .eq('user_id', user.id)
          .is('project_id', null)
          .ilike('property_postcode', `%${postcode}%`)
          .limit(5);
        for (const v of visits || []) {
          found.push({
            type: 'siteVisit',
            id: v.id,
            label: v.property_address || 'Site visit',
            sublabel: [v.property_postcode, v.status].filter(Boolean).join(' · '),
          });
        }
      }

      if (!cancelled) setSuggestions(found);
    })().catch(() => {
      /* suggestions are best-effort — never block the page */
    });
    return () => {
      cancelled = true;
    };
  }, [projectId, customerName, location]);

  const linkFns: Record<SuggestionType, (id: string) => Promise<unknown>> = {
    quote: linkQuote,
    invoice: linkInvoice,
    certificate: linkCertificate,
    siteVisit: linkSiteVisit,
  };

  const handleLink = useCallback(
    async (sg: Suggestion) => {
      setLinkingId(sg.id);
      try {
        await linkFns[sg.type](sg.id);
        setSuggestions((prev) => prev.filter((x) => x.id !== sg.id));
        toast({ title: `${TYPE_LABEL[sg.type]} linked`, description: sg.label });
      } catch {
        toast({ title: 'Failed to link', variant: 'destructive' });
      } finally {
        setLinkingId(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linkQuote, linkInvoice, linkCertificate, linkSiteVisit]
  );

  const handleLinkAll = useCallback(async () => {
    setLinkingAll(true);
    let linked = 0;
    for (const sg of suggestions) {
      try {
        await linkFns[sg.type](sg.id);
        linked++;
      } catch {
        /* keep going — report what landed */
      }
    }
    setSuggestions([]);
    setLinkingAll(false);
    toast({
      title: `${linked} item${linked === 1 ? '' : 's'} linked to this project`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions, linkQuote, linkInvoice, linkCertificate, linkSiteVisit]);

  if (dismissed || suggestions.length === 0) return null;

  return (
    <div className={cn(PANEL, 'relative overflow-hidden')}>
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-elec-yellow/[0.08] to-transparent pointer-events-none" />
      <div className="relative p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.12] border border-elec-yellow/[0.2] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-elec-yellow" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight">
                {suggestions.length} item{suggestions.length === 1 ? '' : 's'} look like this job
              </p>
              <p className="text-[11px] text-white/55 leading-tight mt-0.5">
                Matched by customer and address — link them to keep everything together
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss suggestions"
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="h-3.5 w-3.5 text-white/55" />
          </button>
        </div>

        <div className="mt-3 space-y-1.5">
          {suggestions.map((sg) => (
            <div
              key={`${sg.type}-${sg.id}`}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]"
            >
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium text-white truncate">
                  <span className="text-white/50">{TYPE_LABEL[sg.type]}</span> · {sg.label}
                </p>
                <p className="text-[11px] text-white/55 truncate capitalize">{sg.sublabel}</p>
              </div>
              <button
                type="button"
                onClick={() => handleLink(sg)}
                disabled={linkingId === sg.id || linkingAll}
                className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.10] text-[12px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.97] transition-all flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50"
              >
                {linkingId === sg.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Link2 className="h-3.5 w-3.5" />
                )}
                Link
              </button>
            </div>
          ))}
        </div>

        {suggestions.length > 1 && (
          <button
            type="button"
            onClick={handleLinkAll}
            disabled={linkingAll}
            className="w-full mt-2.5 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {linkingAll && <Loader2 className="h-4 w-4 animate-spin" />}
            Link all {suggestions.length}
          </button>
        )}
      </div>
    </div>
  );
}
