/**
 * PortfolioStatementCard
 *
 * The apprentice's holistic "breadth of my work" statement — the narrative an
 * EPA assessor reads first on the exported portfolio cover. Editable,
 * AI-draftable from their actual evidence, saved to profiles.portfolio_statement.
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { textareaCn } from '@/components/forms/fieldStyles';
import { UsesAi } from '@/components/college/ui/UsesAi';

export function PortfolioStatementCard({
  onWrittenChange,
}: {
  /** Told whether a statement is saved, after it loads and after each save. */
  onWrittenChange?: (written: boolean) => void;
} = {}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drafting, setDrafting] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('portfolio_statement')
        .eq('id', user.id)
        .maybeSingle();
      if (!cancelled) {
        const s = ((data?.portfolio_statement as string | null) ?? '').toString();
        setText(s);
        setSavedText(s);
        setLoading(false);
        onWrittenChange?.(!!s.trim());
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- report once per load, not per callback identity
  }, [user]);

  const dirty = text.trim() !== savedText.trim();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const save = async () => {
    if (!user || saving) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ portfolio_statement: text.trim() || null })
      .eq('id', user.id);
    setSaving(false);
    if (error) {
      toast({ title: 'Could not save', description: 'Please try again.', variant: 'destructive' });
      return;
    }
    setSavedText(text.trim());
    onWrittenChange?.(!!text.trim());
    toast({
      title: 'Statement saved',
      description: 'It now appears on your exported portfolio cover.',
    });
  };

  const draft = async () => {
    if (drafting) return;
    setDrafting(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-portfolio-statement', {
        body: {},
      });
      if (error) throw error;
      if (data?.statement) {
        setText(data.statement);
      } else if (data?.error === 'no_evidence') {
        toast({
          title: 'Add evidence first',
          description: 'The draft is built from the work in your portfolio.',
        });
      } else {
        throw new Error('empty');
      }
    } catch {
      toast({
        title: 'Could not draft',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setDrafting(false);
    }
  };

  if (loading) return null;

  return (
    <section
      className="-mx-4 space-y-3 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6"
      aria-labelledby="portfolio-statement-title"
    >
      <div>
        <h3 id="portfolio-statement-title" className="text-[15px] font-semibold tracking-tight text-white">
          Your statement to the assessor
        </h3>
        <p className="mt-0.5 text-[12.5px] leading-snug text-white">
          The opening words on your exported record, in your own voice.
        </p>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="A few sentences on the breadth of your work, how you've grown across the programme, and that you're ready for assessment"
        className={cn(textareaCn, 'text-[14px] leading-relaxed placeholder:text-white/25')}
      />
      <p className="text-[12px] leading-relaxed text-white">
        Draft my statement builds it from your evidence (uses AI). Always make it your own before saving: assessors look for a
        first-hand voice.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] tabular-nums text-white">
          {words} {words === 1 ? 'word' : 'words'}
          {savedText.trim() && !dirty ? ' · saved' : ''}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={draft}
            disabled={drafting}
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow disabled:opacity-40"
          >
            {drafting ? (
              'Drafting…'
            ) : (
              <span className="inline-flex items-center gap-1.5">
                Draft my statement <UsesAi />
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className={cn(
              'inline-flex h-11 items-center rounded-xl px-5 text-[13.5px] font-semibold transition-colors touch-manipulation',
              !dirty || saving
                ? 'cursor-not-allowed border border-white/[0.10] text-white'
                : 'bg-elec-yellow text-black hover:opacity-90'
            )}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PortfolioStatementCard;
