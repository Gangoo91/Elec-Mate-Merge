import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { useNotebook } from '@/hooks/useNotebook';
import { NotebookShell } from '@/components/notebook/NotebookShell';
import { MyThisWeekCard } from '@/components/apprentice-hub/MyThisWeekCard';

/* ==========================================================================
   CollegeAiPage — /apprentice/college-ai
   The apprentice's AI study mentor — grounded in their real ACs, quiz
   attempts, OTJ hours, portfolio, EPA data, ILP, and BS 7671 facets.
   Top-level surface, same prominence as Elec-AI on the electrician hub.
   ========================================================================== */

const STARTER_CARDS = [
  { category: 'Focus', prompt: 'What should I focus on this week?' },
  { category: 'Gaps', prompt: 'What ACs am I behind on?' },
  { category: 'Revise', prompt: 'Explain my last quiz mistake — what should I revise?' },
  { category: 'OTJ', prompt: 'Draft a reflection from my last OTJ activity.' },
];

export default function CollegeAiPage() {
  useSEO({
    title: 'College AI',
    description: 'Your AI study mentor — grounded in your actual progress.',
    noindex: true,
  });

  const nb = useNotebook({ persona: 'apprentice' });

  // Deep-link auto-prompt: cards on the apprentice hub link here with
  // ?prompt=... to fire the AI write-back loop directly. Auto-sends once
  // on first load, then strips the param. Guarded by a ref so React's
  // strict-mode double-mount in dev doesn't double-fire.
  const [searchParams, setSearchParams] = useSearchParams();
  const autoPromptedRef = useRef(false);
  useEffect(() => {
    if (autoPromptedRef.current) return;
    const prompt = searchParams.get('prompt');
    if (!prompt || nb.streaming) return;
    autoPromptedRef.current = true;
    void nb.send(prompt);
    const next = new URLSearchParams(searchParams);
    next.delete('prompt');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, nb]);

  return (
    <NotebookShell
      eyebrow="College AI"
      title="Your AI study mentor"
      description="Ask anything — quiz mistakes, BS 7671 regs, what to focus on. The AI grounds every answer in your real progress, ACs, and EPA data."
      tone="cyan"
      starterCards={STARTER_CARDS}
      conversations={nb.conversations}
      activeId={nb.activeId}
      setActiveId={nb.setActiveId}
      messages={nb.messages}
      loadingConversations={nb.loadingConversations}
      loadingMessages={nb.loadingMessages}
      streaming={nb.streaming}
      error={nb.error}
      send={nb.send}
      newConversation={nb.newConversation}
      deleteConversation={nb.deleteConversation}
      togglePinned={nb.togglePinned}
      markProposalFiled={nb.markProposalFiled}
      welcomeExtra={<MyThisWeekCard />}
    />
  );
}
