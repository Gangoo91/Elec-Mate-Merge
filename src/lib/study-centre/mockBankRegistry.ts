/**
 * Every mock paper's question bank, loadable by exam slug (ELE-1815).
 *
 * The weak-spots mock needs fresh questions from the same topics a learner
 * keeps missing, so it has to reach the bank behind any paper. Each loader is
 * a dynamic import — a bank is only fetched when a targeted paper is built
 * from it — and every bank comes back in one shape.
 *
 * Slugs are the ones recordMockExamAttempt writes (seo_mock_attempts.exam_slug):
 * literal for the Level 2 / Level 3 / AM2 papers, `config.examId` for the
 * StandardMockExam courses. Topic for Level 3 papers 3–7 comes from the
 * M*_SECTION_TOPIC maps, keyed by full section or by the leading number
 * (module 5), the same way the recorder labels a review.
 */

export interface RegistryQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  topic?: string;
  category?: string;
  module?: string;
  reference?: string;
}

type RawQuestion = {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  section?: string;
  topic?: string;
  category?: string;
  module?: string;
  reference?: string;
};

function normalise(
  bank: readonly RawQuestion[],
  sectionTopics?: Record<string, string>
): RegistryQuestion[] {
  return bank
    .filter(
      (q) =>
        q &&
        typeof q.question === 'string' &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        typeof q.correctAnswer === 'number'
    )
    .map((q) => {
      const section = typeof q.section === 'string' ? q.section : undefined;
      const mapped =
        section && sectionTopics
          ? (sectionTopics[section] ?? sectionTopics[section.split('.')[0]])
          : undefined;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: typeof q.explanation === 'string' ? q.explanation : '',
        section,
        topic: (typeof q.topic === 'string' && q.topic) || mapped || undefined,
        category: typeof q.category === 'string' ? q.category : undefined,
        module: typeof q.module === 'string' ? q.module : undefined,
        reference: typeof q.reference === 'string' ? q.reference : undefined,
      };
    });
}

type Loader = () => Promise<RegistryQuestion[]>;

const L3: Record<number, Loader> = {
  1: async () =>
    normalise((await import('@/data/apprentice-courses/level3/module1/questionBank')).module1Questions),
  2: async () =>
    normalise((await import('@/data/apprentice-courses/level3/module2/questionBank')).module2Questions),
  3: async () => {
    const m = await import('@/data/apprentice-courses/level3/module3/questionBank');
    return normalise(m.module3Questions, m.M3_SECTION_TOPIC);
  },
  4: async () => {
    const m = await import('@/data/apprentice-courses/level3/module4/questionBank');
    return normalise(m.module4Questions, m.M4_SECTION_TOPIC);
  },
  5: async () => {
    const m = await import('@/data/apprentice-courses/level3/module5/questionBank');
    return normalise(m.module5Questions, m.M5_SECTION_TOPIC);
  },
  6: async () => {
    const m = await import('@/data/apprentice-courses/level3/module6/questionBank');
    return normalise(m.module6Questions, m.M6_SECTION_TOPIC);
  },
  7: async () => {
    const m = await import('@/data/apprentice-courses/level3/module7/questionBank');
    return normalise(m.module7Questions, m.M7_SECTION_TOPIC);
  },
  8: async () =>
    normalise((await import('@/data/apprentice-courses/level3/mixed/questionBank')).mixedQuestionBank),
};

const L2: Record<number, Loader> = {
  1: async () =>
    normalise((await import('@/data/apprentice-courses/level2/module1/questionBank')).module1Questions),
  2: async () =>
    normalise(
      (await import('@/data/apprentice-courses/level2/module2/questionBank')).module2QuestionBank
    ),
  3: async () =>
    normalise(
      (await import('@/data/apprentice-courses/level2/module3/questionBank')).module3QuestionBank
    ),
  4: async () =>
    normalise(
      (await import('@/data/apprentice-courses/level2/module4/questionBank')).module4QuestionBank
    ),
  5: async () =>
    normalise(
      (await import('@/data/apprentice-courses/level2/module5/questionBank')).module5QuestionBank
    ),
  8: async () =>
    normalise((await import('@/data/apprentice-courses/level2/mixed/questionBank')).mixedQuestionBank),
};

/** StandardMockExam courses: config.examId → its bank. */
const STANDARD: Record<string, Loader> = {
  'asbestos-awareness': async () =>
    normalise((await import('@/data/general-upskilling/asbestosMockExamData')).asbestosQuestionBank),
  bms: async () =>
    normalise((await import('@/data/upskilling/bmsMockExamData')).bmsStandardQuestionBank),
  bs7671: async () =>
    normalise((await import('@/data/upskilling/bs7671MockExamData')).bs7671QuestionBank),
  'cdm-regulations': async () =>
    normalise(
      (await import('@/data/general-upskilling/cdmRegulationsMockExamData')).cdmRegulationsQuestionBank
    ),
  'communication-confidence': async () =>
    normalise(
      (await import('@/data/general-upskilling/communicationConfidenceMockExamData'))
        .communicationConfidenceQuestionBank
    ),
  'confined-spaces': async () =>
    normalise(
      (await import('@/data/general-upskilling/confinedSpacesMockExamData')).confinedSpacesQuestionBank
    ),
  'coshh-awareness': async () =>
    normalise((await import('@/data/general-upskilling/coshhMockExamData')).coshhQuestionBank),
  'conflict-resolution': async () =>
    normalise(
      (await import('@/data/general-upskilling/conflictResolutionMockExamData')).crQuestionBank
    ),
  'cscs-card': async () =>
    normalise((await import('@/data/general-upskilling/cscsCardMockExamData')).cscsCardQuestionBank),
  'data-cabling': async () =>
    normalise((await import('@/data/upskilling/dataCablingMockExamData')).dataCablingQuestionBank),
  'emergency-lighting': async () =>
    normalise(
      (await import('@/data/upskilling/emergencyLightingMockExamData')).emergencyLightingQuestionBank
    ),
  'emotional-intelligence': async () =>
    normalise(
      (await import('@/data/general-upskilling/emotionalIntelligenceMockExamData'))
        .emotionalIntelligenceQuestionBank
    ),
  'environmental-sustainability': async () =>
    normalise(
      (await import('@/data/general-upskilling/environmentalSustainabilityMockExamData'))
        .environmentalSustainabilityQuestionBank
    ),
  'ev-charging': async () =>
    normalise((await import('@/data/upskilling/evChargingMockExamData')).evChargingQuestionBank),
  'fiber-optics': async () =>
    normalise((await import('@/data/upskilling/fiberOpticsMockExamData')).fiberOpticsQuestionBank),
  'fire-alarm': async () =>
    normalise((await import('@/data/upskilling/fireAlarmMockExamData')).fireAlarmQuestionBank),
  'fire-safety': async () =>
    normalise((await import('@/data/general-upskilling/fireSafetyMockExamData')).fireSafetyQuestionBank),
  'first-aid-at-work': async () =>
    normalise((await import('@/data/general-upskilling/firstAidMockExamData')).firstAidQuestionBank),
  'functional-skills-mock': async () =>
    normalise(
      (await import('@/data/apprentice-courses/functional-skills/functionalSkillsMockExamData'))
        .functionalSkillsQuestionBank
    ),
  'goal-setting-growth': async () =>
    normalise((await import('@/data/general-upskilling/goalSettingGrowthMockExamData')).gsQuestionBank),
  'hnc-mock-exam': async () =>
    normalise((await import('@/data/apprentice-courses/hnc/questionBank')).hncQuestionBank),
  'industrial-electrical': async () =>
    normalise(
      (await import('@/data/upskilling/industrialElectricalMockExamData'))
        .industrialElectricalQuestionBank
    ),
  'inspection-testing': async () =>
    normalise(
      (await import('@/data/upskilling/inspectionTestingMockExamData')).inspectionTestingQuestionBank
    ),
  instrumentation: async () =>
    normalise(
      (await import('@/data/upskilling/instrumentationMockExamData')).instrumentationMockExamQuestions
    ),
  'ipaf-scaffold': async () =>
    normalise((await import('@/data/general-upskilling/ipafMockExamData')).ipafQuestionBank),
  'leadership-on-site': async () =>
    normalise((await import('@/data/general-upskilling/leadershipMockExamData')).leadershipQuestionBank),
  'manual-handling': async () =>
    normalise(
      (await import('@/data/general-upskilling/manualHandlingMockExamData')).manualHandlingQuestionBank
    ),
  'mentoring-developing-others': async () =>
    normalise(
      (await import('@/data/general-upskilling/mentoringDevelopingOthersMockExamData')).mdQuestionBank
    ),
  'mental-health-first-aid': async () =>
    normalise(
      (await import('@/data/general-upskilling/mentalHealthMockExamData')).mentalHealthQuestionBank
    ),
  'mewp-operator': async () =>
    normalise((await import('@/data/general-upskilling/mewpMockExamData')).mewpQuestionBank),
  'moet-epa-mock-exam': async () =>
    normalise((await import('@/data/apprentice-courses/moet/questionBank')).moetQuestionBank),
  'osg-table-lookup': async () =>
    normalise(
      (await import('@/data/study-centre/osgTableLookupMockExamData')).osgTableLookupQuestionBank
    ),
  'pasma-towers': async () =>
    normalise((await import('@/data/general-upskilling/pasmaMockExamData')).pasmaQuestionBank),
  'pat-testing': async () =>
    normalise((await import('@/data/upskilling/patTestingMockExamData')).patTestingQuestionBank),
  'personal-finance': async () =>
    normalise((await import('@/data/general-upskilling/personalFinanceMockExamData')).pfQuestionBank),
  'renewable-energy': async () =>
    normalise(
      (await import('@/data/upskilling/renewableEnergyMockExamData')).renewableEnergyQuestionBank
    ),
  'resilience-stress-management': async () =>
    normalise(
      (await import('@/data/general-upskilling/resilienceStressManagementMockExamData')).rsmQuestionBank
    ),
  'scaffolding-awareness': async () =>
    normalise(
      (await import('@/data/general-upskilling/scaffoldingAwarenessMockExamData'))
        .scaffoldingAwarenessQuestionBank
    ),
  'smart-home': async () =>
    normalise((await import('@/data/upskilling/smartHomeMockExamData')).smartHomeQuestionBank),
  'time-management-organisation': async () =>
    normalise(
      (await import('@/data/general-upskilling/timeManagementOrganisationMockExamData')).tmoQuestionBank
    ),
  'welsh-level3-final': async () =>
    normalise((await import('@/data/study-centre/welshLevel3MockExamData')).welshLevel3QuestionBank),
  'working-at-height': async () =>
    normalise(
      (await import('@/data/general-upskilling/workingAtHeightMockExamData')).workingAtHeightQuestionBank
    ),
};

/** The loader for a paper's bank, or null when the slug isn't a known paper. */
export function bankLoaderFor(examSlug: string): Loader | null {
  const l3 = examSlug.match(/^level3-module8-mock(\d+)$/);
  if (l3) return L3[Number(l3[1])] ?? null;
  const l2 = examSlug.match(/^level2-module8-mock(\d+)$/);
  if (l2) return L2[Number(l2[1])] ?? null;
  if (examSlug === 'am2-module8')
    return async () =>
      normalise((await import('@/data/apprentice-courses/am2/questionBank')).am2QuestionBank);
  return STANDARD[examSlug] ?? null;
}

const cache = new Map<string, Promise<RegistryQuestion[]>>();

/** A paper's bank (cached per slug). Empty when unknown or it fails to load. */
export function loadBank(examSlug: string): Promise<RegistryQuestion[]> {
  const hit = cache.get(examSlug);
  if (hit) return hit;
  const loader = bankLoaderFor(examSlug);
  const p = loader
    ? loader().catch(() => {
        cache.delete(examSlug);
        return [] as RegistryQuestion[];
      })
    : Promise.resolve([] as RegistryQuestion[]);
  cache.set(examSlug, p);
  return p;
}
