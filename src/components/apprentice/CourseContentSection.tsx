import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ContentSectionProps {
  sectionNumber?: string;
  title: string;
  description: string;
  keyPoints?: string[];
  subsections?: {
    id: string;
    title: string;
    content: string;
    keyPoints?: string[];
  }[];
  icon?:
    | 'safety'
    | 'info'
    | 'construction'
    | 'warning'
    | 'hardhat'
    | 'list'
    | 'section'
    | 'cable'
    | 'socket'
    | 'bulb'
    | 'test'
    | 'tools'
    | 'shield-alert';
  isMainSection?: boolean;
  subsectionId?: string;
}

const CourseContentSection = ({
  sectionNumber,
  title,
  description,
  keyPoints = [],
  subsectionId,
}: ContentSectionProps) => {
  const formatDescription = (text: string, id: string | undefined) => {
    if (id === '3.1') {
      const parts = text.split(
        'The essential steps of safe isolation must be followed without exception:'
      );
      const beforeSteps = parts[0];
      const afterPartsRaw = text.split('Proper isolation equipment includes');
      const afterSteps = 'Proper isolation equipment includes' + afterPartsRaw[1];

      return (
        <>
          <p className="text-[14px] text-white/85 leading-relaxed mb-4">{beforeSteps}</p>

          <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Essential steps of safe isolation
            </span>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px] text-white/85 leading-relaxed">
              <li>
                <span className="font-medium text-white">Identify</span> — correctly identify the
                circuit or equipment to be worked on
              </li>
              <li>
                <span className="font-medium text-white">Isolate</span> — switch off and lock the
                isolation device
              </li>
              <li>
                <span className="font-medium text-white">Prove the tester</span> — test your
                voltage indicator on a known live source
              </li>
              <li>
                <span className="font-medium text-white">Test dead</span> — verify the circuit or
                equipment is dead
              </li>
              <li>
                <span className="font-medium text-white">Reprove the tester</span> — test your
                voltage indicator again on a known live source
              </li>
              <li>
                <span className="font-medium text-white">Lock off and tag</span> — apply locks and
                warning notices to prevent reconnection
              </li>
              <li>
                <span className="font-medium text-white">Issue permit</span> — for complex systems,
                issue a permit-to-work
              </li>
            </ol>
          </div>

          <p className="text-[14px] text-white/85 leading-relaxed mt-3">{afterSteps}</p>
        </>
      );
    }

    return <p className="text-[14px] text-white/85 leading-relaxed">{text}</p>;
  };

  return (
    <div className="mb-4 space-y-3">
      {(sectionNumber || title) && (
        <div className="flex items-baseline gap-3">
          {sectionNumber && (
            <span className="text-[11px] font-mono text-white/55 flex-shrink-0">
              {sectionNumber}
            </span>
          )}
          {title && (
            <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-tight">
              {title}
            </h3>
          )}
        </div>
      )}

      {formatDescription(description, subsectionId)}

      {keyPoints.length > 0 && (
        <Accordion type="single" collapsible className="border-l border-white/[0.08] pl-4">
          <AccordionItem value="key-points" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Key learning points
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-[14px] text-white/85 leading-relaxed">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default CourseContentSection;
