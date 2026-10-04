import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/privacy.md?raw';

/** Content lives in src/content/legal/privacy.md — edit the Markdown, not this file. */
const PrivacyPolicy = () => <LegalDocument source={source} />;

export default PrivacyPolicy;
