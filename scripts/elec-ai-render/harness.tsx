import React from 'react';
import { createRoot } from 'react-dom/client';
import WelcomeScreen from '@/components/electrician-tools/ai-tools/chat/WelcomeScreen';

/*
 * Elec-AI welcome screen — first run vs returning.
 *
 * The onboarding copy and the four "Try asking" cards are worth ~400px exactly
 * once. This proves they are gone for someone with history, that their own
 * conversations lead instead, and that neither state flashes the other while
 * the session fetch is in flight.
 */
const errors: string[] = [];
window.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origErr = console.error;
console.error = (...a: unknown[]) => {
  errors.push('console.error: ' + a.map(String).join(' '));
  origErr(...a);
};

const q = new URLSearchParams(location.search);
const mode = q.get('mode') || 'first-run';

const SESSIONS = [
  { id: '1', title: 'Max Zs for a 32A Type B on a TN-C-S supply' },
  { id: '2', title: 'Does a shower in a bathroom need RCD protection' },
  { id: '3', title: 'SWA gland earthing on a submain' },
  { id: '4', title: 'Ring final continuity readings that do not add up' },
];

createRoot(document.getElementById('root')!).render(
  <WelcomeScreen
    onSelectQuery={() => {}}
    onResumeSession={() => {}}
    recentSessions={mode === 'first-run' ? [] : SESSIONS}
    sessionsLoading={mode === 'loading'}
    // 'after-new' is a returning user who has just pressed New: they have
    // history, so no onboarding — but offering it back contradicts what they
    // just asked for, so the screen is bare and the composer takes focus.
    showResume={mode !== 'after-new'}
  />
);

setTimeout(() => {
  const text = document.getElementById('root')!.textContent || '';
  const hasExamples = text.includes('Try asking');
  const hasPitch = text.includes('Every answer is cited');
  const hasResume = text.includes('Pick up where you left off');

  const expect = (cond: boolean, msg: string) => {
    if (!cond) errors.push(msg);
  };

  if (mode === 'first-run') {
    expect(
      hasExamples,
      'first run: the "Try asking" examples are missing — nothing teaches the tool'
    );
    expect(hasPitch, 'first run: the one-line explanation is missing');
    expect(!hasResume, 'first run: offering to resume a conversation that does not exist');
  } else if (mode === 'returning') {
    expect(!hasExamples, 'returning: the "Try asking" examples are STILL shown');
    expect(!hasPitch, 'returning: still pitching the product to an existing user');
    expect(hasResume, 'returning: their own conversations are missing');
  } else if (mode === 'after-new') {
    // The whole complaint: "when I press new it gives me 5 topics to pick from
    // which are irrelevant". Pressing New must leave nothing to pick from.
    expect(!hasExamples, 'after New: still showing topics to pick from');
    expect(!hasPitch, 'after New: still pitching');
    expect(!hasResume, 'after New: offering to resume a chat the user just chose to leave');
    expect(
      (document.getElementById('root')!.textContent || '').trim() === '',
      'after New: the screen is not empty — a clean slate should have nothing on it'
    );
  } else {
    // Mid-fetch we do not yet know which user this is, so neither layout may
    // be drawn — that flash is the whole reason the flag exists.
    expect(!hasExamples, 'loading: examples drawn before we know if the user is returning');
    expect(!hasPitch, 'loading: pitch drawn before we know if the user is returning');
  }

  // Same rule as the Minor Works footer: no grey text (CLAUDE.md).
  for (const el of Array.from(document.querySelectorAll('#root *'))) {
    const own = Array.from(el.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => (n.textContent || '').trim())
      .join('');
    if (!own) continue;
    const parts = getComputedStyle(el).color.match(/^rgba\(([^)]+)\)$/);
    const alpha = parts ? parts[1].split(',').map((v) => v.trim()) : null;
    if (alpha && alpha.length === 4 && Number(alpha[3]) < 1) {
      errors.push(
        `"${own.slice(0, 32)}" is rendered at ${alpha[3]} opacity — grey text is not allowed`
      );
    }
  }

  for (const b of Array.from(document.querySelectorAll('button'))) {
    const r = b.getBoundingClientRect();
    if (r.height > 0 && r.height < 44) {
      errors.push(`a ${Math.round(r.height)}px tap target — below the 44px minimum`);
    }
  }
  if (document.documentElement.scrollWidth > window.innerWidth + 0.5) {
    errors.push(
      `the page scrolls sideways (${document.documentElement.scrollWidth} > ${window.innerWidth})`
    );
  }

  document.getElementById('res')!.textContent = errors.length
    ? 'FAIL::' + errors.join(' ||| ')
    : `PASS::@${window.innerWidth}px ${mode} — examples:${hasExamples} pitch:${hasPitch} resume:${hasResume}`;
}, 500);
