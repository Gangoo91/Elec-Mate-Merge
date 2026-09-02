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
import { SectionHeader } from './PortfolioPrimitives';

export function PortfolioStatementCard() {
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
      }
    })();
    return () => {
      cancelled = true;
    };
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
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Portfolio statement"
        title="Your statement to the assessor"
        meta="The opening narrative on your exported portfolio cover — in your own words."
      />
      <div className="rounded-xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_2px_10px_-4px_rgba(0,0,0,0.65)] p-4 sm:p-5 space-y-3">
        {/*
          The house textarea, not a near-black box.
          This was `bg-[hsl(0_0%_8%)]` — darker than the page itself — sitting
          inside a lit card, which read as a hole punched through it. The
          shared style is a soft white fill that sits ON the card, and it dims
          the placeholder properly: at `text-white` in 13px the prompt text
          read as content someone had already written.
        */}
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="A few sentences on the breadth of your work, how you've grown across the programme, and that you're ready for assessment…"
          className={cn(textareaCn, 'text-[13.5px] leading-relaxed')}
        />
        {/* Guidance before the buttons — it tells you what to do, so it reads
            before you decide, not after you have already pressed something. */}
        <p className="text-[12px] leading-relaxed text-white">
          Drafted from your evidence — always make it your own before saving. Assessors look for an
          authentic, first-hand voice.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] tabular-nums text-white">
            {words} {words === 1 ? 'word' : 'words'}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={draft}
              disabled={drafting}
              className="inline-flex h-11 items-center rounded-lg border border-white/[0.14] bg-white/[0.05] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.09] active:scale-[0.98] disabled:text-white/70"
            >
              {drafting ? 'Drafting…' : 'Draft with AI'}
            </button>
            {/*
              A disabled primary must NOT be a faded volt fill.
              `bg-elec-yellow` under `disabled:text-white/70` is a translucent volt
              across a whole button face, which is the exact thing card-recipe
              warns about — it mixes with the near-black behind it and comes out
              muddy brown. Nothing to save, nothing to press: it goes neutral.
            */}
            <button
              onClick={save}
              disabled={!dirty || saving}
              className={cn(
                'inline-flex h-11 items-center rounded-lg px-5 text-[13px] font-semibold transition-colors touch-manipulation',
                !dirty || saving
                  ? 'cursor-not-allowed border border-white/[0.10] bg-white/[0.03] text-white'
                  : 'bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98]'
              )}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioStatementCard;
