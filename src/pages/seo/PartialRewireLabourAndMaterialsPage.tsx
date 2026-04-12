import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { partialRewireLabourAndMaterialsConfig } from '@/pages/seo/generated/partialRewireLabourAndMaterialsConfig';

const PAGE_PATH = '/guides/partial-rewire-labour-and-materials';

export default function PartialRewireLabourAndMaterialsPage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={partialRewireLabourAndMaterialsConfig} />;
}
