import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Assessment } from '@/types/quiz';
import ModernQuizCard from './quiz/ModernQuizCard';

interface QuizAssessmentCardProps {
  assessment: Assessment;
}

const QuizAssessmentCard = ({ assessment }: QuizAssessmentCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartQuiz = () => {
    // Pass the current location as state so we can navigate back properly
    navigate(`/quiz/${assessment.id}`, {
      state: { from: location.pathname }
    });
  };

  return (
    <ModernQuizCard
      assessment={assessment}
      onStart={handleStartQuiz}
    />
  );
};

export default QuizAssessmentCard;
