import React from 'react';
import QuizAssessmentCard from './QuizAssessmentCard';
import { getAllAssessments } from '@/data/quizAssessments';

const QuizAssessmentsGrid = () => {
  const assessments = getAllAssessments();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
      {assessments.map((assessment, index) => (
        <QuizAssessmentCard key={index} assessment={assessment} />
      ))}
    </div>
  );
};

export default QuizAssessmentsGrid;
