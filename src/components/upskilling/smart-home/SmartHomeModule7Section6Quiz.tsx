import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const SmartHomeModule7Section6Quiz = () => {
  const questions = [
    {
      id: 1,
      question: 'Why is thorough documentation important on a smart home installation?',
      options: [
        'It is only needed to satisfy the client’s insurer',
        'It mainly serves to justify a higher project price',
        'It replaces the need for any future site visits',
        'It supports compliance, liability protection and future maintenance',
      ],
      correct: 3,
      explanation:
        'Records such as as-built details, credentials and test results protect you if a dispute arises and give the next engineer the reference they need to maintain or extend the system safely.',
    },
  ];

  return (
    <SingleQuestionQuiz
      questions={questions}
      title="Section 6 Quiz: Documentation, Warranty, and Aftercare"
    />
  );
};

export default SmartHomeModule7Section6Quiz;
