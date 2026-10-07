/**
 * ProfileSection — the Me tab of the apprentice hub.
 *
 * Who you are and what you are on (the same qualification resolver the
 * portfolio header uses, so the two can never disagree), your college and
 * tutor, shortcuts into the portfolio's own Coverage and Readiness views, one
 * way to export (the server-built pack) and one way to share (a private link),
 * then account.
 *
 * 7 Oct 2026: replaced the old KSB map and EPA gateway sheets (a second, older
 * data model), the client-side "Download all" ZIP (the export pack already
 * holds every file) and the inline share sheet (SharePortfolioSheet is the one
 * share flow).
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  Check,
  ChevronRight,
  FolderDown,
  Link2,
  LogOut,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { FormSheet } from '@/components/forms/FormSheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { ExportPackSheet } from '@/components/portfolio-export/ExportPackSheet';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { usePortfolio } from '@/hooks/portfolio/usePortfolio';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
// "Message tutor" used to open DirectMessaging, which writes to the MENTOR
// tables (mentor_connections / mentor_messages) that no college tutor reads.
// The tutor-facing thread is student_message_threads — ApprenticeMessageSheet.
import { ApprenticeMessageSheet } from './ApprenticeMessageSheet';
import { SharePortfolioSheet } from './SharePortfolioSheet';
import { P_CARD, P_LIST, P_ROW } from './portfolio2/ui';

export const ME_HELP: PageHelpContent = {
  id: 'apprentice-me',
  title: 'Me',
  what: 'Your details, your college and tutor, and the two ways to send your portfolio out: export it or share a private link.',
  steps: [
    {
      title: 'Check your course',
      body: 'The course under your name is the one your portfolio is marked against. Your college sets it if you are enrolled.',
    },
    {
      title: 'Talk to your tutor',
      body: 'Comments on your evidence and messages to your tutor are both here.',
    },
    {
      title: 'Export or share',
      body: 'Export my record builds a ZIP with a PDF summary and every file. A share link lets someone view your portfolio without an account.',
    },
  ],
  notes: [
    {
      title: 'Your record stays yours',
      body: 'You can export it at any time, including after you finish or change college.',
    },
  ],
};

export function ProfileSection({
  onOpenView,
  onOpenTab,
}: {
  /** Open a portfolio view (Coverage, Readiness) on the Portfolio tab. */
  onOpenView?: (view: 'evidence' | 'coverage' | 'readiness') => void;
  /** Switch to another hub tab. */
  onOpenTab?: (tab: 'progress') => void;
} = {}) {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { comments, actionRequiredCount, unreadCount } = usePortfolioComments();
  const { learner: collegeLearner } = useMyCollegeContext();
  const {
    qualificationName,
    collegeCourseCode,
    isLoading: qualLoading,
  } = useStudentQualification();
  const { shares } = usePortfolioSharing();
  const portfolio = usePortfolio(null);
  const { headline, items } = portfolio;

  const [showShare, setShowShare] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showTutorMessages, setShowTutorMessages] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const rawName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const fullName = rawName
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  const parts = fullName
    .replace(/[^\p{L}\s'-]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const initials =
    `${parts[0]?.[0] ?? 'A'}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`.toUpperCase();
  const activeShares = shares.filter(
    (s) => !s.expires_at || new Date(s.expires_at) > new Date()
  ).length;

  const handleSignOut = async () => {
    await signOut();
    window.location.replace('/');
  };

  const goView = (v: 'evidence' | 'coverage' | 'readiness') =>
    onOpenView
      ? onOpenView(v)
      : navigate(v === 'evidence' ? '/apprentice/hub' : `/apprentice/hub?view=${v}`);

  return (
    <div className="space-y-5 py-5 sm:py-6 lg:space-y-6 lg:py-8">
      {/* Who you are and what you are on */}
      <header
        className={cn(P_CARD, 'flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between')}
      >
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <Avatar className="h-16 w-16 shrink-0 border border-white/[0.08] sm:h-20 sm:w-20">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-white/[0.06] text-[20px] font-semibold text-elec-yellow">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[30px]">
                {fullName}
              </h1>
              <PageHelpButton help={ME_HELP} />
            </div>
            {user?.email && <p className="truncate text-[13px] text-white">{user.email}</p>}
            <p className="mt-1.5 text-[13.5px] leading-snug text-white">
              {qualLoading ? (
                'Checking your course…'
              ) : qualificationName ? (
                <>
                  On <span className="font-semibold">{qualificationName}</span>
                </>
              ) : (
                'No course chosen yet'
              )}
              {collegeLearner && <> at {collegeLearner.college_name}</>}
            </p>
          </div>
        </div>
        {!qualLoading && !collegeCourseCode && (
          <button
            type="button"
            onClick={() => navigate('/apprentice/hub?course=1')}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
          >
            {qualificationName ? 'Change course' : 'Choose your course'}
          </button>
        )}
      </header>

      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {/* Your record: the portfolio's own views, not copies of them */}
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Your record</h2>
          <ul className={P_LIST}>
            <MeRow
              title="Coverage"
              sub={
                headline.total
                  ? `${headline.passed} of ${headline.total} criteria passed`
                  : 'Every criterion on your course'
              }
              onClick={() => goView('coverage')}
            />
            <MeRow
              title="Readiness"
              sub={
                headline.needsMore
                  ? `${headline.needsMore} ${headline.needsMore === 1 ? 'criterion needs' : 'criteria need'} more`
                  : 'Where you stand before gateway'
              }
              warn={headline.needsMore > 0}
              onClick={() => goView('readiness')}
            />
            <MeRow
              title="Evidence"
              sub={
                items.length
                  ? `${items.length} ${items.length === 1 ? 'piece' : 'pieces'} in your portfolio`
                  : 'Nothing captured yet'
              }
              onClick={() => goView('evidence')}
            />
            <MeRow
              title="Learning"
              sub="Quizzes, flashcards and AM2 practice"
              onClick={() =>
                onOpenTab ? onOpenTab('progress') : navigate('/apprentice/hub?tab=progress')
              }
            />
            <MeRow
              title="Off-the-job hours"
              sub="Log and check your hours"
              onClick={() => navigate('/apprentice/ojt-hub')}
            />
          </ul>
        </section>

        {/* College, then account */}
        <div className="space-y-5">
          <section className="space-y-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              From your college
            </h2>
            <ul className={P_LIST}>
              <MeRow
                title="Actions for you"
                sub={
                  actionRequiredCount > 0
                    ? `${actionRequiredCount} ${actionRequiredCount === 1 ? 'comment needs' : 'comments need'} a reply`
                    : 'All caught up'
                }
                warn={actionRequiredCount > 0}
                count={actionRequiredCount || undefined}
                onClick={() => setShowMessages(true)}
              />
              <MeRow
                title="Comments on your evidence"
                sub={
                  unreadCount > 0
                    ? `${unreadCount} new`
                    : comments.length
                      ? `${comments.length} in total, none new`
                      : 'None yet'
                }
                count={unreadCount || undefined}
                onClick={() => setShowMessages(true)}
              />
              {collegeLearner ? (
                <MeRow
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Message your tutor"
                  sub={
                    collegeLearner.tutor_name
                      ? `${collegeLearner.tutor_name}, ${collegeLearner.college_name}`
                      : `Your college team at ${collegeLearner.college_name}`
                  }
                  onClick={() => setShowTutorMessages(true)}
                />
              ) : (
                <MeRow
                  title="My college"
                  sub="Join your college with a code"
                  onClick={() => navigate('/apprentice/college-plan')}
                />
              )}
            </ul>
          </section>

          {/* Account */}
          <section className="space-y-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">Account</h2>
            <ul className={P_LIST}>
              <MeRow
                icon={<Settings className="h-4 w-4" />}
                title="Settings"
                onClick={() => navigate('/settings')}
              />
              <li>
                <button type="button" onClick={handleSignOut} className={P_ROW}>
                  <LogOut className="h-4 w-4 shrink-0 text-red-300" />
                  <span className="flex-1 text-[14px] font-semibold text-red-300">Sign out</span>
                </button>
              </li>
            </ul>
          </section>
        </div>

        {/* Send it out: one export, one share */}
        <section className="space-y-3 lg:col-span-2 2xl:col-span-1">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Send your portfolio out
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className={cn(
                P_CARD,
                'group flex w-[calc(100%+2rem)] items-start gap-4 text-left touch-manipulation transition-colors hover:border-white/[0.2] sm:w-full'
              )}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-elec-yellow text-black">
                <FolderDown className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">Export my record</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                  A ZIP with a PDF summary, every file, your declarations, hours and the audit
                  trail.
                </span>
              </span>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowShare(true)}
              className={cn(
                P_CARD,
                'group flex w-[calc(100%+2rem)] items-start gap-4 text-left touch-manipulation transition-colors hover:border-white/[0.2] sm:w-full'
              )}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.14] text-white">
                <Link2 className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">
                  Share a private link
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                  {activeShares
                    ? `${activeShares} ${activeShares === 1 ? 'link is' : 'links are'} live. Make another or turn one off.`
                    : 'Someone can view your portfolio without an account. You choose when it stops working.'}
                </span>
              </span>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>
      </div>

      {/* Comments from tutor and assessor */}
      <FormSheet
        open={showMessages}
        onOpenChange={setShowMessages}
        eyebrow="Portfolio"
        title="Comments and actions"
        description="What your tutor and assessor have said about your evidence."
        width="wide"
      >
        {comments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] font-semibold text-white">No comments yet</p>
            <p className="mt-1 text-[13px] text-white">
              When your tutor or assessor comments on your evidence, it shows here.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 lg:grid-cols-2">
            {comments.map((c) => (
              <li
                key={c.id}
                className={cn(
                  'rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4',
                  c.requiresAction && !c.isResolved && 'border-orange-400/40'
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold text-white">{c.authorName}</span>
                  <span className="text-[12px] text-white">
                    {c.authorRole === 'tutor'
                      ? 'Tutor'
                      : c.authorRole === 'assessor'
                        ? 'Assessor'
                        : c.authorRole}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[12px] text-white">
                    {c.requiresAction && !c.isResolved && (
                      <span className="font-semibold text-orange-300">Needs a reply ·</span>
                    )}
                    {c.isResolved && (
                      <Check className="h-3.5 w-3.5 text-emerald-300" aria-label="Resolved" />
                    )}
                    {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white">{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </FormSheet>

      <SharePortfolioSheet open={showShare} onOpenChange={setShowShare} />
      {collegeLearner && (
        <ApprenticeMessageSheet open={showTutorMessages} onOpenChange={setShowTutorMessages} />
      )}
      <ExportPackSheet
        open={exportOpen}
        onOpenChange={setExportOpen}
        learnerUserId={null}
        mode="learner"
      />
    </div>
  );
}

function MeRow({
  title,
  sub,
  icon,
  warn,
  count,
  onClick,
}: {
  title: string;
  sub?: string;
  icon?: React.ReactNode;
  warn?: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <li>
      <button type="button" onClick={onClick} className={cn(P_ROW, 'group')}>
        {icon && <span className="shrink-0 text-white">{icon}</span>}
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold text-white">{title}</span>
          {sub && (
            <span
              className={cn(
                'mt-0.5 block truncate text-[12.5px]',
                warn ? 'text-orange-300' : 'text-white'
              )}
            >
              {sub}
            </span>
          )}
        </span>
        {count !== undefined && (
          <span className="flex h-6 min-w-[24px] shrink-0 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[12px] font-bold tabular-nums text-black">
            {count}
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
      </button>
    </li>
  );
}

export default ProfileSection;
