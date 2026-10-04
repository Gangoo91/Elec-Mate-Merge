import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/acceptable-use.md?raw';

/** Content lives in src/content/legal/acceptable-use.md — edit the Markdown, not this file. */
const AcceptableUse = () => <LegalDocument source={source} />;

export default AcceptableUse;
