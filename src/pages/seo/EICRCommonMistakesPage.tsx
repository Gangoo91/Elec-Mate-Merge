import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicrCommonMistakesConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/eicr-common-mistakes';

export default function EICRCommonMistakesPage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicrCommonMistakesConfig} />;
}
