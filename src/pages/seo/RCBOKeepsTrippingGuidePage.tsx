import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { rcboKeepsTrippingGuideConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/rcbo-keeps-tripping-guide';

export default function RCBOKeepsTrippingGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={rcboKeepsTrippingGuideConfig} />;
}
