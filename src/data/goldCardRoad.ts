/**
 * The road from the AM2S to the ECS Gold Card and JIB grading (ELE-2055).
 *
 * Every step says only what the official page it links to says, read
 * 10 Oct 2026. Nothing here sets a rule of its own: the JIB and ECS decide,
 * and each step sends the apprentice to their page to check before acting.
 *
 *   ECS (administered by the JIB in England, Wales and Northern Ireland):
 *     https://www.ecscard.org.uk/content/Apprentices-applying-for-their-first-gold-card
 *     https://www.ecscard.org.uk/content/Health,-Safety-Environmental-Assessment
 *     https://www.ecscard.org.uk/content/Manage-your-card-with-MyECS
 *     https://www.ecscard.org.uk/card-types/Electrotechnical/Installation-Electrician
 *     https://www.ecscard.org.uk/content/JIB-Grading
 *   NET: https://www.netservices.org.uk/am2s-v1/ and the AM2S v1 Candidate Checklist
 *   ECS/NET integration from 3 Aug 2026 (Electrical Contracting News):
 *     https://electricalcontractingnews.com/safety-and-training/apprenticeships/ecs-net-integration-speeds-apprentice-gold-card-applications/
 *
 * Step keys match the check constraint on public.gold_card_steps.
 */

export type GoldCardStepKey =
  | 'am2s_passed'
  | 'myecs_registered'
  | 'hse_assessment'
  | 'documents_ready'
  | 'gold_card_applied'
  | 'gold_card_received'
  | 'jib_grade_applied'
  | 'approved_grade_plan';

export interface GoldCardStep {
  key: GoldCardStepKey;
  title: string;
  body: string;
  /** England only: the automatic AM2S → MyECS step. */
  englandNote?: string;
  source: { label: string; url: string };
  /** Where to do it, when there is a place. */
  action?: { label: string; url: string };
}

export const ECS_URLS = {
  firstGoldCard:
    'https://www.ecscard.org.uk/content/Apprentices-applying-for-their-first-gold-card',
  hse: 'https://www.ecscard.org.uk/content/Health,-Safety-Environmental-Assessment',
  myecsInfo: 'https://www.ecscard.org.uk/content/Manage-your-card-with-MyECS',
  myecs: 'https://www.ecscard.org.uk/myecs',
  installationElectrician:
    'https://www.ecscard.org.uk/card-types/Electrotechnical/Installation-Electrician',
  maintenanceElectrician:
    'https://www.ecscard.org.uk/card-types/Electrotechnical/Maintenance-Electrician',
  jibGrading: 'https://www.ecscard.org.uk/content/JIB-Grading',
  jib: 'https://www.jib.org.uk/',
  netAm2sV1: 'https://www.netservices.org.uk/am2s-v1/',
  ecnIntegration:
    'https://electricalcontractingnews.com/safety-and-training/apprenticeships/ecs-net-integration-speeds-apprentice-gold-card-applications/',
};

export const GOLD_CARD_STEPS: GoldCardStep[] = [
  {
    key: 'am2s_passed',
    title: 'Pass your AM2S',
    body: 'NET sends the AM2S certificate to you directly. In England you also get a government Apprenticeship Completion certificate.',
    source: { label: 'NET, AM2S v1 Candidate Checklist', url: ECS_URLS.netAm2sV1 },
  },
  {
    key: 'myecs_registered',
    title: 'Register for MyECS',
    body: 'MyECS is where you apply for your card and see your qualifications. To register you need your personal email address, National Insurance number, date of birth, and one of: your surname, ECS card number or H&S assessment number.',
    englandNote:
      'Since 3 August 2026, NET tells ECS when an Electrical Installation and Maintenance or Domestic Electrical apprentice in England passes the AM2S, and the evidence is added to their MyECS account automatically.',
    source: { label: 'ECS, Manage your card with MyECS', url: ECS_URLS.myecsInfo },
    action: { label: 'Open MyECS', url: ECS_URLS.myecs },
  },
  {
    key: 'hse_assessment',
    title: 'Pass the ECS Health, Safety and Environmental Assessment',
    body: 'You need it, or a valid exemption, before you can apply for an ECS card. The CITB (CSCS) test is not accepted. A pass is valid for two years, so apply for your card within that time. You can take it online through MyECS or at a centre.',
    source: { label: 'ECS, Health, Safety & Environmental Assessment', url: ECS_URLS.hse },
    action: { label: 'About the assessment', url: ECS_URLS.hse },
  },
  {
    key: 'documents_ready',
    title: 'Get your documents ready',
    body: 'For a first Gold Card as an Installation or Maintenance Electrician, ECS asks for your Apprenticeship Completion Certificate, your AM2S, and your Level 3 Electrotechnical Qualification with the unit breakdown showing the wiring regulations unit. You can add a separate 18th Edition certificate if you have one.',
    source: {
      label: 'ECS, Apprentices applying for their first gold card',
      url: ECS_URLS.firstGoldCard,
    },
  },
  {
    key: 'gold_card_applied',
    title: 'Apply for your Gold Card in MyECS',
    body: 'Apply as an Installation Electrician or a Maintenance Electrician. Before you submit, opt in to become an ECS Registered Electrician: its terms are signed up to as part of the application.',
    source: {
      label: 'ECS, Apprentices applying for their first gold card',
      url: ECS_URLS.firstGoldCard,
    },
    action: { label: 'Open MyECS', url: ECS_URLS.myecs },
  },
  {
    key: 'gold_card_received',
    title: 'Gold Card issued',
    body: 'ECS issues the Gold Card, with recognition as a Registered Electrician, once your qualifications have been validated with the awarding organisation and all the scheme requirements are met.',
    source: {
      label: 'ECS, Apprentices applying for their first gold card',
      url: ECS_URLS.firstGoldCard,
    },
  },
  {
    key: 'jib_grade_applied',
    title: 'Apply for your JIB grade',
    body: 'A JIB grade shows your position in the industry. ECS says the Core grade is typically for someone who has completed a formal apprenticeship and holds the Level 3 for their occupation. If you work for a JIB member company you need your employer’s endorsement. Include copies of your qualification certificates.',
    source: { label: 'ECS, JIB Grading', url: ECS_URLS.jibGrading },
    action: { label: 'JIB grading', url: ECS_URLS.jibGrading },
  },
  {
    key: 'approved_grade_plan',
    title: 'Plan for the Approved grade',
    body: 'ECS says the Approved grade shows you have the Core grade and, after at least two years’ experience, have taken on more responsibility, typically overseeing others on a project. It usually needs a qualification in Initial Verification and Periodic Inspection and Testing; which one depends on your duties and occupation. Check the JIB’s current requirements before you book a course.',
    source: { label: 'ECS, JIB Grading', url: ECS_URLS.jibGrading },
    action: { label: 'The JIB', url: ECS_URLS.jib },
  },
];

/** ECS footer: Scotland's applications go through the SJIB. */
export const SCOTLAND_NOTE =
  'In Scotland, ECS applications and information are administered by the Scottish Joint Industry Board (SJIB).';
