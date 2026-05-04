import { Button } from '@/components/ui/button';
import { Clock, Award, CheckSquare, Play, CheckCircle, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const AssessmentToolsTab = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set());

  const assessmentTools = [
    {
      id: 'safety-knowledge-quiz',
      title: 'Safety Knowledge Assessment',
      description: 'Comprehensive quiz covering all aspects of electrical safety knowledge',
      type: 'Quiz',
      duration: '30 mins',
      questions: 50,
      passingScore: 80,
      difficulty: 'Intermediate',
      category: 'Knowledge',
      attempts: 3,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: true,
      topics: ['PPE', 'Isolation', 'Regulations', 'Emergency Response'],
      color: 'blue',
    },
    {
      id: 'hazard-identification',
      title: 'Hazard Identification Challenge',
      description: 'Interactive scenarios to test your ability to identify electrical hazards',
      type: 'Interactive',
      duration: '45 mins',
      questions: 25,
      passingScore: 75,
      difficulty: 'Advanced',
      category: 'Practical',
      attempts: 5,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: true,
      topics: ['Risk Assessment', 'Hazard Types', 'Control Measures', 'Documentation'],
      color: 'green',
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response Simulation',
      description: 'Practice emergency response procedures in realistic scenarios',
      type: 'Simulation',
      duration: '20 mins',
      questions: 15,
      passingScore: 85,
      difficulty: 'Advanced',
      category: 'Emergency',
      attempts: 2,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: true,
      topics: ['First Aid', 'Emergency Procedures', 'Incident Response', 'Communication'],
      color: 'purple',
    },
    {
      id: 'regulation-compliance',
      title: 'Regulation Compliance Check',
      description: 'Test your understanding of UK electrical safety regulations',
      type: 'Assessment',
      duration: '25 mins',
      questions: 30,
      passingScore: 80,
      difficulty: 'Intermediate',
      category: 'Regulations',
      attempts: 4,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: false,
      topics: ['EAWR 1989', 'BS 7671', 'CDM Regulations', 'HASAWA 1974'],
      color: 'orange',
    },
    {
      id: 'case-study-analysis',
      title: 'Case Study Analysis',
      description: 'Analyse real incident case studies and identify key learning points',
      type: 'Analysis',
      duration: '60 mins',
      questions: 10,
      passingScore: 70,
      difficulty: 'Advanced',
      category: 'Analysis',
      attempts: 1,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: true,
      topics: [
        'Root Cause Analysis',
        'Prevention Strategies',
        'Lesson Learning',
        'Risk Management',
      ],
      color: 'red',
    },
    {
      id: 'ppe-selection',
      title: 'PPE Selection Workshop',
      description: 'Interactive tool for selecting appropriate PPE for different electrical tasks',
      type: 'Workshop',
      duration: '35 mins',
      questions: 20,
      passingScore: 85,
      difficulty: 'Intermediate',
      category: 'PPE',
      attempts: 3,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: false,
      topics: ['PPE Types', 'Voltage Ratings', 'Task Assessment', 'Standards'],
      color: 'yellow',
    },
  ];

  const handleStartAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    console.log(`Starting assessment: ${assessmentId}`);
  };

  const isAssessmentCompleted = (assessmentId: string) => completedAssessments.has(assessmentId);

  const completedCount = assessmentTools.filter((tool) => isAssessmentCompleted(tool.id)).length;
  const averageScore =
    assessmentTools.reduce((acc, tool) => acc + tool.bestScore, 0) / assessmentTools.length;
  const certificatesEarned = assessmentTools.filter(
    (tool) => tool.certificate && isAssessmentCompleted(tool.id)
  ).length;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Assessment centre
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Assessment tools
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Test and validate your electrical safety knowledge through comprehensive assessments,
          interactive simulations, and practical workshops.
        </p>
      </div>

      {/* Stats strip */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Tools
          </span>
          <p className="text-[20px] font-semibold text-white">{assessmentTools.length}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Completed
          </span>
          <p className="text-[20px] font-semibold text-white">{completedCount}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Average
          </span>
          <p className="text-[20px] font-semibold text-white">{Math.round(averageScore)}%</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Certificates
          </span>
          <p className="text-[20px] font-semibold text-white">{certificatesEarned}</p>
        </div>
      </div>

      {/* Assessment tools list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {assessmentTools.map((tool) => {
          const isCompleted = isAssessmentCompleted(tool.id);

          return (
            <div
              key={tool.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    <span>{tool.difficulty}</span>
                    <span className="text-white/25">·</span>
                    <span>{tool.type}</span>
                    <span className="text-white/25">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tool.duration}
                    </span>
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
                    {tool.title}
                  </h3>
                </div>
                {isCompleted && <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />}
              </div>

              <p className="text-[14px] text-white/85 leading-relaxed">{tool.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.06]">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Questions
                  </p>
                  <p className="text-[14px] text-white font-mono">{tool.questions}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Pass score
                  </p>
                  <p className="text-[14px] text-white font-mono">{tool.passingScore}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Attempts
                  </p>
                  <p className="text-[14px] text-white font-mono">{tool.attempts}</p>
                </div>
              </div>

              {/* Best score progress */}
              {tool.bestScore > 0 && (
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Best score
                    </span>
                    <span className="text-[12px] text-white/85 font-mono">{tool.bestScore}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow transition-all duration-500"
                      style={{ width: `${tool.bestScore}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Topics */}
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tool.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-flex items-center gap-1"
                    >
                      <CheckSquare className="h-3 w-3 text-white/55" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex gap-2 pt-1">
                <Button
                  className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
                  onClick={() => handleStartAssessment(tool.id)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {tool.bestScore > 0 ? 'Retake' : 'Start'}
                </Button>
                {tool.bestScore > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-white/15 hover:bg-white/[0.05] touch-manipulation"
                  >
                    <BarChart3 className="h-4 w-4 text-white" />
                  </Button>
                )}
                {tool.certificate && (
                  <span className="inline-flex items-center gap-1 text-[12px] text-white/55 px-2 rounded-md border border-white/10 bg-white/[0.03]">
                    <Award className="h-3 w-3" />
                    Cert
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance summary */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4 pt-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Performance
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Track your assessment performance over time and identify areas for improvement. Regular
          assessment helps reinforce learning and ensures knowledge retention.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              label: 'Completion',
              value: `${Math.round((completedCount / assessmentTools.length) * 100)}%`,
              progress: (completedCount / assessmentTools.length) * 100,
            },
            {
              label: 'Average score',
              value: `${Math.round(averageScore)}%`,
              progress: averageScore,
            },
            {
              label: 'Certificates',
              value: `${certificatesEarned}/${assessmentTools.filter((t) => t.certificate).length}`,
              progress:
                (certificatesEarned / assessmentTools.filter((t) => t.certificate).length) * 100,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {metric.label}
                </span>
                <span className="text-[12px] text-white/85 font-mono">{metric.value}</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow transition-all duration-500"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentToolsTab;
