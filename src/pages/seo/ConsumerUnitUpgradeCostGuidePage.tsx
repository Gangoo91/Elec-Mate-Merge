import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { consumerUnitUpgradeCostGuideConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/consumer-unit-upgrade-cost-guide';

export default function ConsumerUnitUpgradeCostGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={consumerUnitUpgradeCostGuideConfig} />;
}
