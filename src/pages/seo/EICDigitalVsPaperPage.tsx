import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicDigitalVsPaperConfig } from '@/pages/seo/generated/eicDigitalVsPaperConfig';

const PAGE_PATH = '/guides/eic-digital-vs-paper';

export default function EICDigitalVsPaperPage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicDigitalVsPaperConfig} />;
}
