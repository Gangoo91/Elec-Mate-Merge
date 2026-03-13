import type { DocumentSection } from '@/types/safety-template';
import { HazardTableSection } from './HazardTableSection';
import { StepsSection } from './StepsSection';
import { ChecklistSection } from './ChecklistSection';
import { TextBlockSection } from './TextBlockSection';
import { BulletListSection } from './BulletListSection';
import { PPEGridSection } from './PPEGridSection';
import { SignatureBlockSection } from './SignatureBlockSection';
import { ReferencesSection } from './ReferencesSection';
import { KeyValueSection } from './KeyValueSection';

interface Props {
  section: DocumentSection;
  mode: 'preview' | 'edit';
  onChange?: (section: DocumentSection) => void;
}

export function SectionRenderer({ section, mode, onChange }: Props) {
  switch (section.type) {
    case 'hazard_table':
      return <HazardTableSection section={section} mode={mode} onChange={onChange as any} />;
    case 'steps':
      return <StepsSection section={section} mode={mode} onChange={onChange as any} />;
    case 'checklist':
      return <ChecklistSection section={section} mode={mode} onChange={onChange as any} />;
    case 'text_block':
      return <TextBlockSection section={section} mode={mode} onChange={onChange as any} />;
    case 'bullet_list':
      return <BulletListSection section={section} mode={mode} onChange={onChange as any} />;
    case 'ppe_grid':
      return <PPEGridSection section={section} mode={mode} onChange={onChange as any} />;
    case 'signature_block':
      return <SignatureBlockSection section={section} mode={mode} onChange={onChange as any} />;
    case 'references':
      return <ReferencesSection section={section} mode={mode} />;
    case 'key_value':
      return <KeyValueSection section={section} mode={mode} onChange={onChange as any} />;
    default:
      return null;
  }
}

export default SectionRenderer;
