import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { partialRewireCostGuideConfig } from '@/pages/seo/generated/partialRewireCostGuideConfig';

const PAGE_PATH = '/guides/partial-rewire-cost-guide';

export default function PartialRewireCostGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={partialRewireCostGuideConfig} />;
}
