import React from 'react';
import { Button } from '@/components/ui/button';

interface ExamIntroductionProps {
  exam: {
    title: string;
    description: string;
    duration: number;
    questionCount: number;
  };
  onStart: () => void;
}

const ExamIntroduction: React.FC<ExamIntroductionProps> = ({ exam, onStart }) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Exam instructions
        </span>
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
          {exam.title}
        </h2>
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed">{exam.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Duration
          </span>
          <p className="text-[14px] text-white mt-1">{exam.duration} minutes</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Questions
          </span>
          <p className="text-[14px] text-white mt-1">{exam.questionCount}</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Important notes
        </span>
        <ul className="space-y-1.5">
          {[
            'Complete all questions within the allocated time',
            'You can navigate between questions using the Previous and Next buttons',
            'If you run out of time, the exam will automatically submit',
            'Your results will be displayed at the end of the exam',
          ].map((note, idx) => (
            <li
              key={idx}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        onClick={onStart}
      >
        Start Exam
      </Button>
    </div>
  );
};

export default ExamIntroduction;
