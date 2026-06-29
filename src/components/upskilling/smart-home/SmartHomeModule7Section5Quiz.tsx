import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const SmartHomeModule7Section5Quiz = () => {
  const questions = [
    {
      id: 1,
      question: 'What is the main purpose of a customer handover on a smart home installation?',
      options: [
        'To build client confidence and reduce call-backs',
        'To trigger the final stage payment from the client',
        'To showcase the highest-specification equipment installed',
        'To satisfy the manufacturer warranty registration',
      ],
      correct: 0,
      explanation:
        'A good handover teaches the client to use their system confidently, which is what actually reduces avoidable support calls and call-backs. Payment and warranty steps are administrative, not the purpose of the handover.',
    },
  ];

  return (
    <SingleQuestionQuiz
      questions={questions}
      title="Section 5 Quiz: Customer Handover and App Training"
    />
  );
};

export default SmartHomeModule7Section5Quiz;
