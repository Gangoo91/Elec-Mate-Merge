import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   ELE-1980 — the College Hub help page. The twenty things tutors ask, each
   with the answer and a button to the screen; a search across them; and a
   "message Elec-Mate support" form that lands in Admin → Messages with the
   college and the screen attached (send_college_support_message).
   ========================================================================== */

/** Shown on the page. Agreed reply time for college staff. */
const REPLY_PROMISE = 'We reply within one working day, usually the same day.';

type Faq = { q: string; a: string; go?: { label: string; to: string }; area: Area };
type Area = 'Getting started' | 'Every day' | 'Hours and reviews' | 'Assessment' | 'Learners and support';

const AREAS: Area[] = ['Getting started', 'Every day', 'Hours and reviews', 'Assessment', 'Learners and support'];

const FAQS: Faq[] = [
  {
    area: 'Getting started',
    q: 'How do learners join my cohort?',
    a: 'Each cohort has a join code. Give it to your learners: they sign up or sign in on their phone, enter the code, and they appear on your roll for that cohort. You can see and share the code from the cohort.',
    go: { label: 'Open cohorts', to: '/college?section=cohorts' },
  },
  {
    area: 'Getting started',
    q: 'How do I add a lot of learners at once?',
    a: 'From People, add learners one at a time or in bulk. Each learner then signs in with the same email to link their app account to your college.',
    go: { label: 'Open learners', to: '/college?section=students' },
  },
  {
    area: 'Getting started',
    q: 'How do I find one learner quickly?',
    a: 'Press Search learners at the top of any College Hub screen (or Ctrl and K on a keyboard), type part of the name, and open their profile. The profile has a card for every part of their record.',
    go: { label: 'Open learners', to: '/college?section=students' },
  },
  {
    area: 'Getting started',
    q: 'What does the "?" on each screen do?',
    a: 'It explains what that screen is for and how to use it, in a few steps. If you are still stuck, the guide has a link straight to Elec-Mate support.',
  },
  {
    area: 'Every day',
    q: 'Where do I see what needs me today?',
    a: 'Your home page lists everything waiting on you, most urgent first: hours to verify, evidence to assess, messages, reviews to book, quiz answers to mark. The inbox shows the same list in full, with your own learners first.',
    go: { label: 'Open the inbox', to: '/college/inbox' },
  },
  {
    area: 'Every day',
    q: 'How do I take a register?',
    a: 'Open Attendance, pick the cohort and date, and tap each learner present, late or absent. Learners see their attendance on their phone straight away.',
    go: { label: 'Open attendance', to: '/college?section=attendance' },
  },
  {
    area: 'Every day',
    q: 'How do I set a quiz for my cohort?',
    a: 'Open Quizzes and create one, or start from a document. Set it to the cohort; each learner gets it on their phone and their result comes back to you. Written answers wait for you in Marking.',
    go: { label: 'Open quizzes', to: '/college/quizzes' },
  },
  {
    area: 'Every day',
    q: 'How do I mark written quiz answers?',
    a: 'Marking lists every attempt with written answers waiting for you. Open one, award the marks, add feedback, and the learner sees the result.',
    go: { label: 'Open marking', to: '/college/marking' },
  },
  {
    area: 'Hours and reviews',
    q: 'How do I verify off-the-job hours?',
    a: 'Hours a learner sends you appear in your inbox and on the hours page. Open the entry, check it, and verify or send it back with a reason. Verified hours count towards the apprenticeship total straight away.',
    go: { label: 'Open hours', to: '/college/otj' },
  },
  {
    area: 'Hours and reviews',
    q: 'Does learning in the app count as off-the-job?',
    a: 'Yes, once you approve it. Time spent learning in the app is measured as it happens and shown per learner. Approve it in one tap, or leave some out, and it joins their verified hours.',
    go: { label: 'Open hours', to: '/college/otj' },
  },
  {
    area: 'Hours and reviews',
    q: 'How do I book a progress review?',
    a: 'Progress reviews shows every learner and when their next review is due (at least every three calendar months). Tap Book, pick a day and time, and choose how you will meet. The learner is told and can add their view before you meet.',
    go: { label: 'Open reviews', to: '/college/reviews' },
  },
  {
    area: 'Hours and reviews',
    q: 'How does the employer take part without an account?',
    a: 'From the review you send the employer a link. It opens a short page with three questions and a signature, no account needed. Sending the link is recorded as your evidence the employer was given the opportunity.',
    go: { label: 'Open reviews', to: '/college/reviews' },
  },
  {
    area: 'Assessment',
    q: 'How do I assess evidence a learner has submitted?',
    a: 'Submitted evidence appears in your inbox. Open it, look at the files, and record a decision for each criterion: passed, needs more, or not yet, with feedback. The learner sees the decision on their phone.',
    go: { label: 'Open the inbox', to: '/college/inbox' },
  },
  {
    area: 'Assessment',
    q: 'How do I record an observation?',
    a: 'Open the learner\'s profile and choose Observation (or More actions, then Observation). Record what you saw, the criteria it evidences and the outcome; the learner acknowledges it from their phone.',
    go: { label: 'Open learners', to: '/college?section=students' },
  },
  {
    area: 'Assessment',
    q: 'Where is the funding evidence pack?',
    a: 'The evidence pack lists everything the funding rules need on file for each learner, live, with what is missing. You can add your college\'s own requirements and file documents against each learner.',
    go: { label: 'Open the evidence pack', to: '/college/evidence-pack' },
  },
  {
    area: 'Learners and support',
    q: 'How do I log a safeguarding concern?',
    a: 'Open the learner\'s profile, choose More actions, then Safeguarding. The note is restricted: only the designated safeguarding lead and authorised staff can read it.',
    go: { label: 'Open safeguarding', to: '/college?section=safeguardingqueue' },
  },
  {
    area: 'Learners and support',
    q: 'Who can see the notes I write?',
    a: 'You choose when you write it: only you, tutors, the course lead, or safeguarding. Learners never see staff notes.',
  },
  {
    area: 'Learners and support',
    q: 'Why is a learner flagged at risk?',
    a: 'Risk is worked out from attendance, progress against criteria, hours, portfolio activity and contact. Open the learner\'s Risk card to see the reasons in plain words, and tap a reason to go to the part of the record behind it.',
    go: { label: 'Open learners', to: '/college?section=students' },
  },
  {
    area: 'Learners and support',
    q: 'How do I print or export a learner\'s record?',
    a: 'From the learner\'s profile, More actions gives you Print (a learner summary) and the data pack (everything held about them, as a download).',
    go: { label: 'Open learners', to: '/college?section=students' },
  },
  {
    area: 'Learners and support',
    q: 'How do I show managers what Elec-Mate is doing for us?',
    a: 'Your month in numbers counts what your staff and learners did this month from your own records: hours verified, evidence assessed, registers, quizzes, messages and more, compared with last month. Print it for a meeting.',
    go: { label: 'Open your month in numbers', to: '/college/value' },
  },
];

export default function CollegeHelpPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<Area | 'All'>('All');
  const [open, setOpen] = useState<string | null>(null);
  const [screen, setScreen] = useState(params.get('screen') ?? '');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#support') {
      setTimeout(() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter(
      (f) => (area === 'All' || f.area === area) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  }, [query, area]);

  const send = async () => {
    if (message.trim().length < 3 || sending) return;
    setSending(true);
    const { error } = await supabase.rpc('send_college_support_message' as never, { p_message: message, p_screen: screen || null } as never);
    setSending(false);
    if (error) {
      toast({ title: 'Not sent', description: error.message, variant: 'destructive' });
      return;
    }
    setSent(true);
    setMessage('');
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Help" backTo="/college" />
      <HubBody hidePushPrompt>
        <CollegePageHeader
          eyebrow="Help"
          title="How can we help?"
          description="Answers to the questions tutors ask most, each with a button to the right screen. Every screen also has its own guide behind the ? at the top."
        />

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Questions */}
          <section className="min-w-0 space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help, for example register, hours, review"
                aria-label="Search help"
                className={cn(inputCn, 'pl-7')}
              />
            </div>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {(['All', ...AREAS] as const).map((a) => (
                <button key={a} type="button" onClick={() => setArea(a)} className={chipCn(area === a)} aria-pressed={area === a}>
                  {a}
                </button>
              ))}
            </div>

            {list.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>
                Nothing matches "{query}". Try another word, or message support below.
              </div>
            ) : (
              <motion.ul variants={containerVariants} initial="hidden" animate="visible" className={COLLEGE_LIST}>
                {list.map((f) => {
                  const isOpen = open === f.q;
                  return (
                    <motion.li key={f.q} variants={itemVariants}>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : f.q)}
                        aria-expanded={isOpen}
                        className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-6"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14.5px] font-semibold leading-snug text-white">{f.q}</span>
                          <span className="mt-0.5 block text-[12px] text-white">{f.area}</span>
                        </span>
                        <ChevronDown className={cn('h-4 w-4 shrink-0 text-white transition-transform', isOpen && 'rotate-180')} aria-hidden />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6">
                          <p className="max-w-3xl text-[14px] leading-relaxed text-white">{f.a}</p>
                          {f.go && (
                            <button type="button" onClick={() => navigate(f.go!.to)} className={cn(COLLEGE_LINK, 'mt-1')}>
                              {f.go.label}
                            </button>
                          )}
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </section>

          {/* Support */}
          <section id="support" className="min-w-0 scroll-mt-20 space-y-4 xl:sticky xl:top-20">
            <CollegeSectionTitle title="Message Elec-Mate support" sub={REPLY_PROMISE} />
            <div className={COLLEGE_CARD}>
              {sent ? (
                <div className="space-y-3">
                  <p className="text-[16px] font-semibold text-white">Sent. Thank you.</p>
                  <p className="text-[13.5px] leading-relaxed text-white">
                    Your message is with the Elec-Mate team, with your college and the screen attached. {REPLY_PROMISE} The reply
                    comes to your messages in the app and by email.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className={COLLEGE_LINK}>
                    Send another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="help-screen" className={labelCn}>
                      Which screen is it about? (optional)
                    </label>
                    <input
                      id="help-screen"
                      value={screen}
                      onChange={(e) => setScreen(e.target.value)}
                      placeholder="For example Progress reviews"
                      className={inputCn}
                    />
                  </div>
                  <div>
                    <label htmlFor="help-message" className={labelCn}>
                      What do you need?
                    </label>
                    <textarea
                      id="help-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="Tell us what you were trying to do and what happened."
                      className={textareaCn}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void send()}
                    disabled={message.trim().length < 3 || sending}
                    className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
                  >
                    {sending ? 'Sending…' : 'Send to support'}
                  </button>
                  <p className="text-[12.5px] leading-relaxed text-white">
                    Goes to the Elec-Mate team with your name, your college and the screen. Please don't include learners'
                    personal details unless we ask.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </HubBody>
    </HubPage>
  );
}
