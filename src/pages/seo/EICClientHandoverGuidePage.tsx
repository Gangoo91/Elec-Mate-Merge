import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicClientHandoverGuideConfig } from '@/pages/seo/generated/eicClientHandoverGuideConfig';

const PAGE_PATH = '/guides/eic-client-handover-guide';

export default function EICClientHandoverGuidePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicClientHandoverGuideConfig} />;
}
