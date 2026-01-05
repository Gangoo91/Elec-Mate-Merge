import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Assessment } from '@/types/quiz';
import ModernQuizCard from './quiz/ModernQuizCard';

interface QuizAssessmentCardProps {
  assessment: Assessment;
}

const QuizAssessmentCard = ({ assessment }: QuizAssessmentCardProps) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${assessment.id}`);
  };

  return (
    <ModernQuizCard 
      assessment={assessment} 
      onStart={handleStartQuiz}
    />
  );
};

export default QuizAssessmentCard;
