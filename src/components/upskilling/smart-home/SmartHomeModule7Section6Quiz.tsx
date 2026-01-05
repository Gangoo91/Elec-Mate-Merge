import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const SmartHomeModule7Section6Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "Why is documentation important in smart home installations?",
      options: [
        "To increase project costs",
        "For compliance, liability protection, and future reference",
        "To impress clients with paperwork",
        "To meet insurance requirements only"
      ],
      correct: 1,
      explanation: "Documentation is essential for compliance, protecting against liability, and providing reference for future maintenance."
    }
  ];

  return (
    <SingleQuestionQuiz 
      questions={questions}
      title="Section 6 Quiz: Documentation, Warranty, and Aftercare"
    />
  );
};

export default SmartHomeModule7Section6Quiz;