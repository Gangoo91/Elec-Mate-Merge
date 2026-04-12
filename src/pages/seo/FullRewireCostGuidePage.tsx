import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { fullRewireCostGuideConfig } from '@/pages/seo/generated/fullRewireCostGuideConfig';

const PAGE_PATH = '/guides/full-rewire-cost-guide';

export default function FullRewireCostGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={fullRewireCostGuideConfig} />;
}
