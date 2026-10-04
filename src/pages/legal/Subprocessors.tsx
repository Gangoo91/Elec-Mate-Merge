import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/subprocessors.md?raw';

/** Content lives in src/content/legal/subprocessors.md — edit the Markdown, not this file. */
const Subprocessors = () => <LegalDocument source={source} />;

export default Subprocessors;
