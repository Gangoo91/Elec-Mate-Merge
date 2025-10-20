/**
 * Tutor Transformer
 * Converts Tutor Agent JSON output into PDF-ready format
 */

export interface TutorAgentOutput {
  response: string;
  conceptExplanation: {
    simpleExplanation: string;
    technicalDefinition: string;
    realWorldAnalogy: string;
    commonMisconceptions?: string[];
  };
  keyPoints: Array<{
    point: string;
    why: string;
    examRelevance?: string;
  }>;
  calculations?: {
    formula: string;
    variablesExplained: Array<{
      symbol: string;
      meaning: string;
      unit: string;
    }>;
    workedExample?: {
      scenario: string;
      givenValues: string[];
      steps: string[];
      answer: string;
    };
    practiceQuestion?: {
      question: string;
      answer: string;
    };
  };
  examQuestions?: Array<{
    questionNumber: number;
    questionType: 'multiple_choice' | 'short_answer' | 'calculation' | 'extended_response';
    marks: number;
    question: string;
    options?: string[];
    modelAnswer: string;
    examinerTips?: string;
  }>;
  installationCritique?: {
    hasPhoto: boolean;
    overallAssessment?: string;
    strengths?: Array<{
      observation: string;
      regulation?: string;
      whyGood: string;
    }>;
    issues?: Array<{
      issue: string;
      severity: 'critical' | 'important' | 'minor';
      regulation?: string;
      whyMatters: string;
      howToFix: string;
    }>;
    readyForAssessment?: boolean;
    recommendations?: string[];
  };
  studyPlan: {
    strengths: string[];
    weaknesses: string[];
    recommendedActivities: Array<{
      activity: string;
      purpose: string;
      timeEstimate?: string;
    }>;
    nextSteps: string[];
  };
  curriculumAlignment: Array<{
    awarding_body: 'City & Guilds' | 'EAL';
    qualification: string;
    unit?: string;
    learningOutcome: string;
    covered: boolean;
    notes?: string;
  }>;
  bs7671References: Array<{
    regulation: string;
    title: string;
    relevance: string;
    examFrequency?: 'very_common' | 'common' | 'occasional';
  }>;
  furtherReading?: Array<{
    resource: string;
    type: 'book' | 'guidance_note' | 'video' | 'online_resource';
    why: string;
  }>;
}

export interface TutorPDFData {
  title: string;
  student: {
    topic: string;
    qualificationLevel: string;
    date: string;
  };
  overview: string;
  sections: Array<{
    title: string;
    content: string;
    subsections?: Array<{
      title: string;
      content: string;
      type?: 'list' | 'table' | 'paragraph' | 'callout';
    }>;
  }>;
  appendices: Array<{
    title: string;
    content: string;
  }>;
}

/**
 * Transforms tutor agent output into PDF-ready format
 */
export function transformTutorOutputToPDF(
  tutorOutput: TutorAgentOutput,
  studentDetails: {
    name?: string;
    qualificationLevel?: string;
    topic: string;
  }
): TutorPDFData {
  const { response } = tutorOutput;

  // Build PDF data structure
  const pdfData: TutorPDFData = {
    title: `Learning Assessment Report - ${studentDetails.topic}`,
    student: {
      topic: studentDetails.topic,
      qualificationLevel: studentDetails.qualificationLevel || 'Not specified',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    },
    overview: response,
    sections: [],
    appendices: []
  };

  // Section 1: Concept Explanation
  const conceptContent = `**Simple Explanation (Plain English):**\n${tutorOutput.conceptExplanation.simpleExplanation}\n\n` +
    `**Technical Definition (Exam Language):**\n${tutorOutput.conceptExplanation.technicalDefinition}\n\n` +
    `**Real-World Analogy:**\n${tutorOutput.conceptExplanation.realWorldAnalogy}` +
    (tutorOutput.conceptExplanation.commonMisconceptions && tutorOutput.conceptExplanation.commonMisconceptions.length > 0
      ? `\n\n**Common Misconceptions to Avoid:**\n${tutorOutput.conceptExplanation.commonMisconceptions.map(m => `❌ ${m}`).join('\n')}`
      : '');

  pdfData.sections.push({
    title: 'SECTION 1: CONCEPT EXPLANATION',
    content: conceptContent,
    subsections: []
  });

  // Section 2: Key Learning Points
  const keyPointsContent = tutorOutput.keyPoints
    .map((kp, idx) => {
      let content = `**${idx + 1}. ${kp.point}**\n`;
      content += `  - **Why it matters:** ${kp.why}`;
      if (kp.examRelevance) {
        content += `\n  - **Exam relevance:** ${kp.examRelevance}`;
      }
      return content;
    })
    .join('\n\n');

  pdfData.sections.push({
    title: 'SECTION 2: KEY LEARNING POINTS',
    content: 'Essential facts you must know:',
    subsections: [{
      title: 'Must-Know Points',
      content: keyPointsContent,
      type: 'paragraph'
    }]
  });

  // Section 3: Calculations (if applicable)
  if (tutorOutput.calculations) {
    const calc = tutorOutput.calculations;
    let calcContent = `**Formula:**\n\`\`\`\n${calc.formula}\n\`\`\`\n\n`;
    
    calcContent += `**Variables Explained:**\n`;
    calcContent += calc.variablesExplained.map(v => `• **${v.symbol}** = ${v.meaning} (${v.unit})`).join('\n');
    
    if (calc.workedExample) {
      calcContent += `\n\n**Worked Example:**\n`;
      calcContent += `*Scenario:* ${calc.workedExample.scenario}\n\n`;
      calcContent += `*Given:*\n${calc.workedExample.givenValues.map(g => `• ${g}`).join('\n')}\n\n`;
      calcContent += `*Solution:*\n${calc.workedExample.steps.map((s, i) => `Step ${i + 1}: ${s}`).join('\n')}\n\n`;
      calcContent += `**Answer:** ${calc.workedExample.answer}`;
    }

    if (calc.practiceQuestion) {
      calcContent += `\n\n**Practice Question for You:**\n${calc.practiceQuestion.question}\n\n`;
      calcContent += `*Model Answer:* ${calc.practiceQuestion.answer}`;
    }

    pdfData.sections.push({
      title: 'SECTION 3: CALCULATIONS',
      content: calcContent,
      subsections: []
    });
  }

  // Section 4: Exam Questions (if applicable)
  if (tutorOutput.examQuestions && tutorOutput.examQuestions.length > 0) {
    const examContent = tutorOutput.examQuestions
      .map(q => {
        let content = `**Question ${q.questionNumber}** [${q.marks} marks] (${q.questionType})\n\n`;
        content += `${q.question}\n\n`;
        
        if (q.options && q.options.length > 0) {
          content += q.options.map((opt, idx) => `${String.fromCharCode(65 + idx)}) ${opt}`).join('\n') + '\n\n';
        }
        
        content += `**Model Answer:**\n${q.modelAnswer}`;
        
        if (q.examinerTips) {
          content += `\n\n💡 **Examiner's Tip:** ${q.examinerTips}`;
        }
        
        return content;
      })
      .join('\n\n---\n\n');

    pdfData.sections.push({
      title: 'SECTION 4: PRACTICE EXAM QUESTIONS',
      content: 'City & Guilds / EAL style practice questions:',
      subsections: [{
        title: 'Exam Practice',
        content: examContent,
        type: 'paragraph'
      }]
    });
  }

  // Section 5: Installation Critique (if photo provided)
  if (tutorOutput.installationCritique && tutorOutput.installationCritique.hasPhoto) {
    const critique = tutorOutput.installationCritique;
    let critiqueContent = '';

    if (critique.overallAssessment) {
      critiqueContent += `**Overall Assessment:**\n${critique.overallAssessment}\n\n`;
    }

    if (critique.strengths && critique.strengths.length > 0) {
      critiqueContent += `**What's Good ✓**\n`;
      critiqueContent += critique.strengths.map(s => {
        const regRef = s.regulation ? ` *(${s.regulation})*` : '';
        return `✓ ${s.observation}${regRef}\n  → ${s.whyGood}`;
      }).join('\n\n') + '\n\n';
    }

    if (critique.issues && critique.issues.length > 0) {
      critiqueContent += `**Areas for Improvement ⚠**\n`;
      critiqueContent += critique.issues.map(i => {
        const severityIcon = i.severity === 'critical' ? '🔴' : i.severity === 'important' ? '🟡' : '🟢';
        const regRef = i.regulation ? ` *(Breaches ${i.regulation})*` : '';
        let content = `${severityIcon} **${i.issue}**${regRef}\n`;
        content += `  → **Why it matters:** ${i.whyMatters}\n`;
        content += `  → **How to fix:** ${i.howToFix}`;
        return content;
      }).join('\n\n') + '\n\n';
    }

    if (critique.readyForAssessment !== undefined) {
      const status = critique.readyForAssessment ? '✅ YES' : '❌ NOT YET';
      critiqueContent += `**Ready for Assessment?** ${status}\n\n`;
    }

    if (critique.recommendations && critique.recommendations.length > 0) {
      critiqueContent += `**Recommendations:**\n${critique.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
    }

    pdfData.sections.push({
      title: 'SECTION 5: INSTALLATION REVIEW',
      content: critiqueContent,
      subsections: []
    });
  }

  // Section 6: Study Plan
  const studyContent = `**Your Strengths:**\n${tutorOutput.studyPlan.strengths.map(s => `✓ ${s}`).join('\n')}\n\n` +
    `**Knowledge Gaps to Address:**\n${tutorOutput.studyPlan.weaknesses.map(w => `⚠ ${w}`).join('\n')}\n\n` +
    `**Recommended Study Activities:**\n${tutorOutput.studyPlan.recommendedActivities.map((a, i) => {
      const time = a.timeEstimate ? ` (${a.timeEstimate})` : '';
      return `${i + 1}. **${a.activity}**${time}\n   Purpose: ${a.purpose}`;
    }).join('\n\n')}\n\n` +
    `**Next Steps:**\n${tutorOutput.studyPlan.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

  pdfData.sections.push({
    title: 'SECTION 6: STUDY PLAN & RECOMMENDATIONS',
    content: studyContent,
    subsections: []
  });

  // Section 7: Curriculum Alignment
  const curriculumContent = tutorOutput.curriculumAlignment
    .map(c => {
      const icon = c.covered ? '☑' : '☐';
      const notes = c.notes ? `\n  Notes: ${c.notes}` : '';
      return `${icon} **${c.awarding_body} ${c.qualification}** - ${c.learningOutcome}${c.unit ? ` (${c.unit})` : ''}${notes}`;
    })
    .join('\n\n');

  pdfData.sections.push({
    title: 'SECTION 7: CURRICULUM ALIGNMENT',
    content: 'City & Guilds / EAL Learning Outcomes Covered:',
    subsections: [{
      title: 'Qualification Mapping',
      content: curriculumContent,
      type: 'list'
    }]
  });

  // Appendix A: BS 7671 References
  const referencesContent = tutorOutput.bs7671References
    .map(ref => {
      const freq = ref.examFrequency ? ` [Exam frequency: ${ref.examFrequency.replace('_', ' ')}]` : '';
      return `**${ref.regulation}** - ${ref.title}${freq}\n  ${ref.relevance}`;
    })
    .join('\n\n');

  pdfData.appendices.push({
    title: 'APPENDIX A: BS 7671 REFERENCES',
    content: referencesContent
  });

  // Appendix B: Further Reading (if applicable)
  if (tutorOutput.furtherReading && tutorOutput.furtherReading.length > 0) {
    const readingContent = tutorOutput.furtherReading
      .map(r => `**${r.resource}** (${r.type.replace('_', ' ')})\n  ${r.why}`)
      .join('\n\n');

    pdfData.appendices.push({
      title: 'APPENDIX B: FURTHER READING',
      content: readingContent
    });
  }

  return pdfData;
}
