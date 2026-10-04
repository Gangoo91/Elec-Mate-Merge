import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/business-terms.md?raw';

/** Content lives in src/content/legal/business-terms.md — edit the Markdown, not this file. */
const BusinessTerms = () => <LegalDocument source={source} />;

export default BusinessTerms;
