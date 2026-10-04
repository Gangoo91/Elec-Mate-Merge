import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/dpa.md?raw';

/** Content lives in src/content/legal/dpa.md — edit the Markdown, not this file. */
const DataProcessingAgreement = () => <LegalDocument source={source} />;

export default DataProcessingAgreement;
