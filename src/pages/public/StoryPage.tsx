/**
 * StoryPage — public founder story at /story.
 *
 * A personal blog/letter from Andrew: who he is, why he built Elec-Mate.
 * Linked from the email campaigns as the warm, human destination — NOT a
 * sales page. No pricing, no feature grid, no hard CTA. Just the story.
 *
 * Layout: magazine-style on desktop — a sticky masthead column (title +
 * byline) on the left, the letter running in a wide column on the right, so
 * it fills the screen without long unreadable lines. Stacks on mobile.
 *
 * Personal touch: the email link can pass the reader's first name
 * (/story?name=Dave) and the page greets them by it. Falls back gracefully.
 *
 * Everything here is grounded in Andrew's real background — nothing invented.
 */

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';

/** Shared gentle scroll-reveal — rises + fades in once when scrolled into view. */
const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

const FOUNDER_EMAIL = 'founder@elec-mate.com';
const HEADSHOT = '/images/founder/andrew-moore.jpg';
const FOOTBALL = '/images/founder/andrew-moore-sons-football.jpg';
// Light-ink signature on a transparent background (shows on the dark page).
// Until the real file is dropped here, <Signature> falls back to text.
const SIGNATURE = '/images/founder/andrew-signature.png';
const PUBLISHED = 'June 2026';
const APP_STORE_URL = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elecmate.app';

/** Pull a safe first name out of the URL (?name=Dave) for a personal greeting.
 *  Letters/hyphen/apostrophe only, capped length — never render raw input. */
function useReaderName(): string | null {
  const [params] = useSearchParams();
  return useMemo(() => {
    const raw = (params.get('name') ?? '').trim();
    if (!raw) return null;
    const cleaned = raw.replace(/[^a-zA-Z'’-]/g, '').slice(0, 24);
    if (cleaned.length < 2) return null;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }, [params]);
}

export default function StoryPage() {
  useSEO({
    title: 'The story behind Elec-Mate — built by an electrician, for electricians',
    description:
      "I'm Andrew Moore, a UK electrician. I built Elec-Mate because the all-in-one tool I needed on the tools didn't exist. Here's who I am and why I made it.",
    image: 'https://www.elec-mate.com/images/founder/story-og.jpg',
    type: 'article',
    author: 'Andrew Moore',
    datePublished: '2026-06-16',
    noindex: false,
  });

  const name = useReaderName();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      {/* Minimal header */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10 py-5 flex items-center justify-between">
          <a href="/" className="text-[14px] font-semibold tracking-tight">
            Elec-Mate
          </a>
          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="text-[12px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
          >
            {FOUNDER_EMAIL}
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-y-10 gap-x-12 xl:gap-x-20">
          {/* Masthead — sticky on desktop */}
          <aside className="lg:sticky lg:top-12 self-start">
            <motion.img
              {...reveal}
              src={HEADSHOT}
              alt="Andrew Moore, founder of Elec-Mate"
              className="w-40 sm:w-48 lg:w-full lg:max-w-[240px] aspect-[4/5] object-cover rounded-2xl border border-white/[0.10]"
              loading="eager"
            />
            <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-elec-yellow">
              A note from the founder
            </div>
            <h1 className="mt-3 font-semibold tracking-tight leading-[1.08] text-[30px] sm:text-[38px] lg:text-[40px]">
              Who I am, and why I built Elec-Mate
            </h1>

            <div className="mt-6 leading-tight">
              <div className="text-[14px] font-semibold text-white">Andrew Moore</div>
              <div className="text-[12px] text-white/55">Founder of Elec-Mate · electrician</div>
              <div className="text-[12px] text-white/40 mt-0.5">{PUBLISHED}</div>
            </div>

            <div className="hidden lg:block mt-8 pt-6 border-t border-white/[0.08] text-[13px] leading-relaxed text-white/55">
              Got a question, or something you wish the app did?{' '}
              <a
                href={`mailto:${FOUNDER_EMAIL}`}
                className="text-elec-yellow hover:text-elec-yellow/80 underline underline-offset-2"
              >
                Email me
              </a>{' '}
              — it comes straight to me.
            </div>
          </aside>

          {/* The letter */}
          <article className="min-w-0">
            <div className="text-[18px] sm:text-[19px] leading-[1.8] text-white/85 space-y-6 max-w-[720px]">
              <p className="text-[21px] sm:text-[23px] leading-[1.55] text-white">
                {name ? `Hi ${name},` : 'Hi,'} I wanted to tell you a bit about who I am and why
                Elec-Mate exists — because I think it matters that there's a real electrician behind
                it, not a faceless tech company.
              </p>

              <p>
                I'm Andrew. I'm 34, I live in Whitehaven on the Cumbrian coast, and I've been an
                electrician for the best part of fifteen years. I'm a husband to Becky and a dad to
                three — two boys, 8 and 5, and our little girl who's 8 months. They're brilliant.
                They're also, hand on heart, complete terrors on a good day. When I'm not working or
                building Elec-Mate, my weeknights and weekends belong to football and rugby — I
                coach my five-year-old's football team, run him to his rugby, and most weekends
                you'll find me on the touchline cheering on my eldest at his rugby league games.
                Between the kids and the business there's not much left in the tank — and I wouldn't
                change a thing.
              </p>

              {/* Inline photo — sits right by the touchline line above */}
              <motion.figure
                {...reveal}
                className="!my-8 sm:float-right sm:ml-7 sm:mb-4 w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/[0.08]"
              >
                <img
                  src={FOOTBALL}
                  alt="Andrew with his two sons on trophy night at their football presentation"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-4 py-2.5 text-[12px] text-white/50 bg-white/[0.02]">
                  Trophy night with the boys — the eldest looking well chuffed.
                </figcaption>
              </motion.figure>

              <h2 className="text-[21px] sm:text-[23px] font-semibold tracking-tight text-white pt-4">
                Where I came from
              </h2>
              <p>
                I came up the proper way — a JTL apprenticeship back in 2009, learning the job by
                doing it: industrial installs, rewires, fault-finding. From there I spent years as
                an Advanced Craftsman Electrician based at Sellafield — installations,
                commissioning, maintenance and fault-finding across the plant. Approved Electrician,
                18th Edition, my 2391 inspection and testing.
              </p>
              <p>
                For a good chunk of those years I trained, mentored and coached apprentices, and
                that's something I've never really stopped caring about. These days I work as a
                Pre-Operations Engineer in the nuclear sector — but the tools, the testing, the
                certs and the endless paperwork, that's the world I know inside out. That's the
                world Elec-Mate came from.
              </p>

              <h2 className="text-[21px] sm:text-[23px] font-semibold tracking-tight text-white pt-4">
                Why I built it
              </h2>
              <p>
                The idea came to me on the tools. I was doing what every electrician does of an
                evening — certs at the kitchen table, digging through the regs, writing up a quote,
                chasing an invoice that should've been paid weeks ago — and it struck me: why is
                there no single app that does all of this? Why am I juggling six different things,
                none of which talk to each other, and none built by someone who's actually done the
                job?
              </p>
              <motion.blockquote
                {...reveal}
                className="!my-9 border-l-2 border-elec-yellow pl-5 sm:pl-7"
              >
                <p className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-[1.2] text-white">
                  I couldn't find one. So I decided to build it myself.
                </p>
              </motion.blockquote>
              <p>
                I'll be honest with you — I didn't have a clue where to start. What I had was the
                problem, fifteen years of knowing the trade inside out, and a stubborn streak. Then
                a pal gave me a hand to get going and pointed me in the right direction, and from
                there it just snowballed. One tool became a handful. A handful became the platform
                it is today — used by hundreds of electricians across the UK, on their phones, every
                single day.
              </p>
              <p>
                And it's not standing still. It's growing into the whole trade now — apprentices
                learning the ropes, the colleges training them, the firms running their teams. The
                aim has always been simple: every part of an electrician's working life, joined up,
                in one place.
              </p>

              {/* A real electrician's words — genuine App Store review */}
              <motion.figure
                {...reveal}
                className="!my-8 border-l-2 border-elec-yellow/60 pl-5 sm:pl-6"
              >
                <blockquote className="text-[18px] sm:text-[19px] italic text-white/80 leading-relaxed">
                  “A true all-in-one app for quotes, certs, calculations, RAMS and EICRs… I use it
                  every day without fail.”
                </blockquote>
                <figcaption className="mt-2.5 text-[12.5px] not-italic text-white/45">
                  <span className="text-elec-yellow">★★★★★</span>&nbsp;&nbsp;I.staffy · App Store
                  review
                </figcaption>
              </motion.figure>

              <h2 className="text-[21px] sm:text-[23px] font-semibold tracking-tight text-white pt-4">
                One thing I want you to know
              </h2>
              <p>
                I'm always at the end of an email. Always happy to chat, always happy to help. I
                genuinely care about the people who come into Elec-Mate — and if you're reading
                this, that means you. This was built by one of your own, for you.
              </p>
              <p>
                Whenever you fancy a proper look, I'd love to have you. And if you've ever got a
                question, or something you wish the app did, just reply — it comes straight to me.
              </p>
              <motion.p
                {...reveal}
                className="!mt-7 text-[19px] sm:text-[20px] font-semibold text-white leading-snug"
              >
                No call centres. No bots fobbing you off. You email, I answer.
              </motion.p>

              {/* Signature */}
              <motion.div {...reveal} className="pt-4">
                <p className="text-white">Cheers,</p>
                <Signature />
                <p className="text-[13px] text-white/55">Founder, Elec-Mate · electrician</p>
              </motion.div>

              {/* P.S. — the most-read line in any letter */}
              <p className="pt-2 text-[15px] sm:text-[16px] text-white/70">
                <span className="font-semibold text-white/90">P.S.</span> Even if Elec-Mate turns
                out not to be for you, drop me a line anyway — tell me what you're working on, or
                what would make it better. I read every reply myself.
              </p>
            </div>

            {/* Soft, non-salesy close — get the app */}
            <motion.div
              {...reveal}
              className="mt-12 pt-8 border-t border-white/[0.06] max-w-[720px]"
            >
              <div className="text-[13px] text-white/55">It's on your phone, both stores:</div>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 px-5 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:border-white/[0.25] transition-colors touch-manipulation"
                >
                  <AppleGlyph />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] text-white/55">Download on the</span>
                    <span className="block text-[14px] font-semibold text-white">App Store</span>
                  </span>
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 px-5 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:border-white/[0.25] transition-colors touch-manipulation"
                >
                  <PlayGlyph />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] text-white/55">Get it on</span>
                    <span className="block text-[14px] font-semibold text-white">Google Play</span>
                  </span>
                </a>
              </div>
              <div className="mt-4 text-[13px] text-white/55">
                Or use it in your browser at{' '}
                <a
                  href="https://www.elec-mate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-elec-yellow hover:text-elec-yellow/80 underline underline-offset-2 touch-manipulation"
                >
                  www.elec-mate.com
                </a>
                .
              </div>
            </motion.div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* Store glyphs — inline SVG (lucide has no brand marks). */
function AppleGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16.365 1.43c0 1.14-.42 2.21-1.13 3.02-.77.89-2.04 1.58-3.27 1.48-.15-1.13.42-2.31 1.12-3.05.78-.85 2.13-1.5 3.28-1.45zM20.5 17.07c-.6 1.4-.9 2.02-1.67 3.26-1.08 1.74-2.6 3.9-4.49 3.91-1.67.02-2.1-1.08-4.37-1.07-2.27.01-2.74 1.09-4.42 1.08-1.88-.02-3.32-1.97-4.4-3.7-3.02-4.85-3.34-10.55-1.47-13.58 1.32-2.14 3.41-3.39 5.37-3.39 2 0 3.25 1.09 4.9 1.09 1.6 0 2.57-1.09 4.88-1.09 1.74 0 3.59.95 4.9 2.59-4.31 2.36-3.6 8.52.24 10.4z" />
    </svg>
  );
}
function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
      <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l9.4-9.7L3.6 2.3z" fill="#00D2FF" />
      <path d="M16.8 8.8 13 12.6l3.8 3.8 4.3-2.5c.9-.5.9-1.8 0-2.3l-4.3-2.8z" fill="#FFCE00" />
      <path d="M3.6 2.3 13 12.6l3.8-3.8L5.7 2.5c-.8-.5-1.6-.5-2.1-.2z" fill="#00F076" />
      <path d="M3.6 21.9c.5.3 1.3.3 2.1-.2l11.1-6.3L13 12.6 3.6 21.9z" fill="#FF3A44" />
    </svg>
  );
}

/** Handwritten signature image, with a graceful fallback to text until the
 *  real file is dropped at SIGNATURE (or if it ever fails to load). */
function Signature() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <p className="mt-1 text-[22px] font-semibold tracking-tight text-white">Andrew</p>;
  }
  return (
    <img
      src={SIGNATURE}
      alt="Andrew"
      onError={() => setFailed(true)}
      className="mt-2 h-14 sm:h-16 w-auto"
      loading="lazy"
    />
  );
}
