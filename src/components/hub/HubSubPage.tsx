import type { ReactNode } from 'react';
import { HubPage, HubBody, HubMasthead } from './HubPrimitives';

/* ==========================================================================
   HubSubPage — the frame for any page that hangs off a hub.

   Masthead (Back · SECTION | Title · optional trailing controls) straight
   into content. No hero, no eyebrow-stack, no hand-rolled back pill. Ten
   apprentice pages were each drawing their own version of this header, and
   every one of them moved the furniture a few pixels when you navigated in
   from the hub. This is the same HubPage → HubMasthead → HubBody stack the
   Business Hub uses, so a sub-page and the hub that links to it share a
   frame.

   `description` is for the one line that genuinely explains what the page is
   for. It renders at reading size under the masthead, not as a hero.
   ========================================================================== */

export function HubSubPage({
  section = 'Apprentice',
  title,
  backTo = '/apprentice',
  onBack,
  description,
  trailing,
  children,
}: {
  section?: string;
  title: string;
  backTo?: string;
  onBack?: () => void;
  description?: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <HubPage>
      <HubMasthead
        section={section}
        title={title}
        backTo={backTo}
        onBack={onBack}
        trailing={trailing}
      />
      <HubBody>
        {description ? (
          <p className="-mb-4 max-w-prose text-[13px] leading-relaxed text-white sm:-mb-6">
            {description}
          </p>
        ) : null}
        {children}
      </HubBody>
    </HubPage>
  );
}

export default HubSubPage;
