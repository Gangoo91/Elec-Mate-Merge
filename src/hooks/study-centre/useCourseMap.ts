/**
 * "Your course" — the Study Centre's own course modules, with the sections a
 * learner has studied and how their mock questions on each module's topics
 * have gone (10 Oct 2026).
 *
 * Study Centre only. Andrew: "we've got to be careful to not encroach on the
 * colleges work… study centre only". So this is organised by the Study
 * Centre's modules (Level 2 / Level 3), never by a qualification's units or
 * assessment criteria — those belong to the College Hub, the portfolio and the
 * assessor.
 *
 * A mock topic belongs to a module through the lesson it links to
 * (studyLinkFor → /study-centre/apprentice/level3-module5-section3). Topics
 * with no lesson link are grouped by paper under "Other papers".
 */
import { useMemo } from 'react';
import { useTopicStats, paperName, type TopicStat } from '@/hooks/study-centre/useMockHistory';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';

export type CourseId = 'level3' | 'level2';

interface ModuleDef {
  n: number;
  title: string;
  /** Route to the module page. */
  to: string;
  /** Progress target for completedSectionsForCourse. */
  progressKey: string;
}

/* Titles as on the course pages (Level2.tsx / Level3.tsx). The mock module
   (8) is left out: it's where the papers are sat, not a subject. */
export const COURSES: Record<CourseId, { label: string; to: string; modules: ModuleDef[] }> = {
  level3: {
    label: 'Level 3',
    to: '/study-centre/apprentice/level3',
    modules: [
      'Health and safety in building services engineering',
      'Environmental technology systems',
      'Electrical science principles',
      'Fault diagnosis and rectification',
      'Inspection, testing and commissioning',
      'Electrical systems design',
      'Career awareness and professional development',
    ].map((title, i) => ({
      n: i + 1,
      title,
      to: `/study-centre/apprentice/level3-module${i + 1}`,
      progressKey: `level3-module${i + 1}`,
    })),
  },
  level2: {
    label: 'Level 2',
    to: '/study-centre/apprentice/level2',
    modules: [
      'Health and safety in installation',
      'Principles of electrical science',
      'Installation methods and technology',
      'Installing wiring systems and enclosures',
      'Communicate with others within building services',
      'Inspection, testing and certification',
      'Electrical fault finding and diagnosis',
    ].map((title, i) => ({
      n: i + 1,
      title,
      to: `/study-centre/apprentice/level2/module${i + 1}`,
      progressKey: `level2/module${i + 1}`,
    })),
  },
};

export interface ModuleTopic extends TopicStat {
  link: { label: string; to: string } | null;
}

export interface CourseModule extends ModuleDef {
  sectionsDone: number;
  topics: ModuleTopic[];
  answered: number;
  right: number;
  /** Rounded accuracy across the module's topics; null when no mock has touched it. */
  pct: number | null;
}

/** Which course and module a lesson path belongs to, if any. */
function moduleOf(path: string): { course: CourseId; n: number } | null {
  const l3 = path.match(/\/level3-module(\d)/);
  if (l3) return { course: 'level3', n: Number(l3[1]) };
  const l2 = path.match(/\/level2(?:\/|-)module(\d)/);
  if (l2) return { course: 'level2', n: Number(l2[1]) };
  return null;
}

export function useCourseMap() {
  const topicStats = useTopicStats(365);
  const { allProgress } = useCourseProgress();

  return useMemo(() => {
    const linked = topicStats.stats.map((t) => ({
      ...t,
      link: studyLinkFor(t.examSlug, t.section, t.module, t.topic),
    })) as ModuleTopic[];

    const build = (id: CourseId): CourseModule[] =>
      COURSES[id].modules.map((m) => {
        const topics = linked
          .filter((t) => {
            const at = t.link ? moduleOf(t.link.to) : null;
            return at?.course === id && at.n === m.n;
          })
          .sort((a, b) => a.pct - b.pct);
        const answered = topics.reduce((s, t) => s + t.answered, 0);
        const right = topics.reduce((s, t) => s + t.right, 0);
        return {
          ...m,
          sectionsDone: completedSectionsForCourse(allProgress, m.progressKey),
          topics,
          answered,
          right,
          pct: answered ? Math.round((right / answered) * 100) : null,
        };
      });

    const courses = { level3: build('level3'), level2: build('level2') };

    // Topics from papers outside the two apprentice courses (Inspection &
    // Testing, BS 7671, topic tests…), grouped by paper.
    const other = new Map<string, ModuleTopic[]>();
    for (const t of linked) {
      if (t.link && moduleOf(t.link.to)) continue;
      const key = paperName({ exam_name: null, exam_slug: t.examSlug });
      other.set(key, [...(other.get(key) ?? []), t]);
    }
    const otherPapers = [...other.entries()]
      .map(([paper, topics]) => {
        const answered = topics.reduce((s, t) => s + t.answered, 0);
        const right = topics.reduce((s, t) => s + t.right, 0);
        return {
          paper,
          topics: topics.sort((a, b) => a.pct - b.pct),
          answered,
          pct: answered ? Math.round((right / answered) * 100) : null,
        };
      })
      .sort((a, b) => b.answered - a.answered);

    // The course to open on: the one with the most activity.
    const activity = (mods: CourseModule[]) =>
      mods.reduce((s, m) => s + m.sectionsDone * 5 + m.answered, 0);
    const primary: CourseId = activity(courses.level2) > activity(courses.level3) ? 'level2' : 'level3';

    return { courses, otherPapers, primary, loading: topicStats.loading };
  }, [topicStats.stats, topicStats.loading, allProgress]);
}
