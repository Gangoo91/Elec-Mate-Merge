#!/usr/bin/env python3
"""Install the rebuilt BMS mock bank: 7 module files -> src/data/upskilling/bms-mock/,
and rewrite bmsMockExamData.ts to use them with the real module categories."""
import pathlib, re, shutil

MOCK = pathlib.Path(__file__).parent
REPO = pathlib.Path('/Users/andrewmoore/elec-mate-merge')
DEST = REPO / 'src/data/upskilling/bms-mock'
DEST.mkdir(exist_ok=True)
CATS = [
    'What a BMS is, and the rules around it',
    'Field devices and signals',
    'Controlling heating, ventilation and air conditioning',
    'Lighting, access, blinds and metering',
    'Networks and protocols',
    'Alarms, data and monitoring',
    'Design, installation, commissioning and handover',
]
for m in range(1, 8):
    src = (MOCK / f'module{m}.ts').read_text()
    src = src.replace("from '/Users/andrewmoore/elec-mate-merge/src/types/standardMockExam'", "from '@/types/standardMockExam'")
    (DEST / f'module{m}.ts').write_text(src)

data = f'''/**
 * BMS mock examination — rebuilt 10 Oct 2026.
 *
 * The old bank stitched 25 of the 42 section quizzes together (243 questions),
 * labelled them by slicing the list into seven equal parts (48% wrong), guessed
 * difficulty from keywords, and had nothing on BACnet or Modbus. 35 questions
 * were doubtful or wrong (KNX "24 V", EN 15232 as current, the BMS as the
 * life-safety path, invented case-study figures as correct answers).
 *
 * This bank is written per module from the rebuilt, fact-checked lesson pages:
 * 30 questions a module (10 basic, 14 intermediate, 6 advanced), labelled with
 * the module they test, none copied from the section quizzes. Ids are
 * module × 1000 + n (1001…7030) so per-question telemetry recorded against the
 * old ids 1–243 can never attach to a different question.
 */
import type {{ StandardMockQuestion }} from '@/types/standardMockExam';
import {{ getRandomQuestionsBalanced }} from '@/utils/questionSelection';
{''.join(f"import {{ bmsMockModule{m} }} from './bms-mock/module{m}';" + chr(10) for m in range(1, 8))}
// Categories are the seven course modules — the exam draws evenly across them.
export const bmsCategories = {CATS!r};

export const bmsMockExamConfig = {{
  examId: 'bms',
  examTitle: 'Building management systems mock examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/study-centre/upskilling/bms-course',
  categories: bmsCategories,
}};

export const bmsStandardQuestionBank: StandardMockQuestion[] = [
{''.join(f"  ...bmsMockModule{m},{chr(10)}" for m in range(1, 8))}];

/** 30 questions: about four per module, 35 / 45 / 20 basic / intermediate / advanced. */
export const getRandomBMSMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] =>
  getRandomQuestionsBalanced(bmsStandardQuestionBank, numQuestions, bmsCategories, {{
    basic: 0.35,
    intermediate: 0.45,
    advanced: 0.2,
  }});
'''
data = data.replace("['", "[\n  '").replace("', '", "',\n  '").replace("']", "',\n]")
(REPO / 'src/data/upskilling/bmsMockExamData.ts').write_text(data)
print('installed', sorted(p.name for p in DEST.iterdir()))
