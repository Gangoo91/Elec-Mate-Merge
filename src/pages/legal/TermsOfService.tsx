import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/terms.md?raw';

/** Content lives in src/content/legal/terms.md — edit the Markdown, not this file. */
const TermsOfService = () => <LegalDocument source={source} />;

export default TermsOfService;
