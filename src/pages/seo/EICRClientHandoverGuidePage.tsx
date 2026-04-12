import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicrClientHandoverGuideConfig } from '@/pages/seo/generated/wave1GuideConfigs';

const PAGE_PATH = '/guides/eicr-client-handover-guide';

export default function EICRClientHandoverGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicrClientHandoverGuideConfig} />;
}
