import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicCommonMistakesConfig } from '@/pages/seo/generated/eicCommonMistakesConfig';

const PAGE_PATH = '/guides/eic-common-mistakes';

export default function EICCommonMistakesPage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicCommonMistakesConfig} />;
}
