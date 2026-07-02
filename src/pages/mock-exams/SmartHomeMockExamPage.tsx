/**
 * SmartHomeMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/smartHomeMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { smartHomeQuestionBank } from '@/data/upskilling/smartHomeMockExamData';

export default function SmartHomeMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Smart Home Mock Exam 2026 — Installer Practice`}
      description={`Free smart home mock exam — 25 questions, 30-min timer, 200-question bank. Zigbee and Z-Wave protocols, lighting, HVAC, security and installation.`}
      slug="smart-home"
      heading={`Smart Home Technology Mock Exam`}
      intro={`Free smart home technology mock exam for installers. 25 questions from a 200-question bank covering smart home fundamentals and IoT, wireless protocols including Zigbee and Z-Wave, mesh networking, lighting, HVAC and security integration, hubs and voice assistants, installation best practice, cybersecurity and future-proofing.`}
      questionBank={
        smartHomeQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Smart Home"
    />
  );
}
