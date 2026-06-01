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
import { Textarea } from '@/components/ui/textarea';
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
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="A few sentences on the breadth of your work, how you've grown across the programme, and that you're ready for assessment…"
          className="touch-manipulation bg-[hsl(0_0%_8%)] border-white/[0.08] text-[13px] text-white leading-relaxed placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-white/45 tabular-nums">{words} words</span>
          <div className="flex items-center gap-2">
            <button
              onClick={draft}
              disabled={drafting}
              className="h-10 px-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[12.5px] font-semibold text-white/85 hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
            >
              {drafting ? 'Drafting…' : 'Draft with AI'}
            </button>
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="h-10 px-4 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-40"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
        <p className="text-[11px] text-white/45 leading-relaxed">
          Drafted from your evidence — always make it your own before saving. Assessors look for an
          authentic, first-hand voice.
        </p>
      </div>
    </div>
  );
}

export default PortfolioStatementCard;
