import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { eicrExampleAndTemplateConfig } from '@/pages/seo/generated/eicrExampleAndTemplateConfig';

const PAGE_PATH = '/guides/eicr-example-and-template';

export default function EICRExampleAndTemplatePage() {
  void PAGE_PATH;
  return <GeneratedGuidePage config={eicrExampleAndTemplateConfig} />;
}
