import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { rcdKeepsTrippingTestSequenceConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/rcd-keeps-tripping-test-sequence';

export default function RCDKeepsTrippingTestSequencePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={rcdKeepsTrippingTestSequenceConfig} />;
}
