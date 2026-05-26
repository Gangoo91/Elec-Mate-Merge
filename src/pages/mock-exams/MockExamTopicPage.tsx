/**
 * MockExamTopicPage — dynamic /mock-exams/:examSlug/:topicSlug.
 *
 * Looks the (examSlug, topicSlug) pair up in `mockExamTopicRegistry`,
 * filters the underlying bank to the matching category, and renders the
 * standard <PublicMockExamPage> with topic-specific copy. If the pair
 * doesn't resolve, redirects to the parent /mock-exams/<examSlug>.
 *
 * Why a single dynamic page rather than ~70 static files: keeps URL +
 * copy generation in one place, lets us add new topic landings just by
 * tagging more questions with a `category` field.
 */
import { useParams, Navigate } from 'react-router-dom';
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { resolveTopicPage } from '@/components/seo/mockExamTopicRegistry';

export default function MockExamTopicPage() {
  const { examSlug, topicSlug } = useParams<{ examSlug: string; topicSlug: string }>();

  if (!examSlug || !topicSlug) {
    return <Navigate to="/mock-exams" replace />;
  }

  const resolved = resolveTopicPage(examSlug, topicSlug);
  if (!resolved) {
    return <Navigate to={`/mock-exams/${examSlug}`} replace />;
  }

  const { entry, topic, filteredBank } = resolved;
  const questionsPerExam = Math.min(entry.questionsPerExam, filteredBank.length);

  // Topic-specific copy — varies per page so each topic landing has its
  // own H1, title, description and intro paragraph (otherwise Google
  // treats them as duplicate content).
  const title = `${topic.category} — ${entry.examShortName} Mock Exam 2026`;
  const description = `Practice ${topic.qCount} ${entry.subject} focused on ${topic.category}. Free mock exam, ${questionsPerExam} random questions, ${entry.timeLimitMinutes}-minute timer, instant results + explanations. No sign-up.`;
  const heading = `${topic.category} — ${entry.examShortName} Practice`;
  const intro = `Free topic-focused mock exam: ${questionsPerExam} random questions from a pool of ${topic.qCount} on ${topic.category}, drawn from the wider ${entry.examShortName} bank. ${entry.timeLimitMinutes}-minute timer, ${entry.passThreshold}% to pass, worked explanation on every question. Use this when you've taken the full mock once and want to drill the topics you got wrong.`;

  return (
    <PublicMockExamPage
      title={title}
      description={description}
      slug={`${examSlug}/${topic.slug}`}
      heading={heading}
      intro={intro}
      questionBank={filteredBank}
      questionsPerExam={questionsPerExam}
      timeLimitMinutes={entry.timeLimitMinutes}
      passThreshold={entry.passThreshold}
      breadcrumbLabel={topic.category}
    />
  );
}
