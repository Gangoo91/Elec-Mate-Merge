import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const SmartHomeModule7Section5Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "What is the main purpose of a customer handover?",
      options: [
        "To get final payment from the client",
        "To build client confidence and reduce call-backs",
        "To demonstrate expensive equipment",
        "To complete legal requirements"
      ],
      correct: 1,
      explanation: "The main purpose is to build client confidence in using their system and prevent unnecessary support calls."
    }
  ];

  return (
    <SingleQuestionQuiz 
      questions={questions}
      title="Section 5 Quiz: Customer Handover and App Training"
    />
  );
};

export default SmartHomeModule7Section5Quiz;