import { LegalDocument } from '@/components/legal/LegalDocument';
import source from '@/content/legal/cookies.md?raw';

/** Content lives in src/content/legal/cookies.md — edit the Markdown, not this file. */
const CookiePolicy = () => <LegalDocument source={source} />;

export default CookiePolicy;
