import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicrWhatToIncludeConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/eicr-what-to-include';

export default function EICRWhatToIncludePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicrWhatToIncludeConfig} />;
}
