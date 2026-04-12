import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicWhatToIncludeConfig } from '@/pages/seo/generated/eicWhatToIncludeConfig';

const PAGE_PATH = '/guides/eic-what-to-include';

export default function EICWhatToIncludePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicWhatToIncludeConfig} />;
}
