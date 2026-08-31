import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   SubPageShell — the frame for every College Hub sub-page
   (/apprentice/college/:section).

   REBUILT on the shared hub primitives so the eight sections sit in the same
   frame as the hub that links to them, and as every other hub in the app.

   What it used to do, and why none of it survived:

   🔴 A PURPLE EYEBROW (`text-purple-300/85`). Purple appears nowhere else in
      the product. Because every section renders through this one component,
      that single line made all eight sub-pages look like a different app the
      moment you tapped in from the volt-accented hub.

   ⚠️ Its own back button, its own page background (`bg-[hsl(0_0%_8%)]`, not
      the app's), its own max-width and its own grey heading stack — four
      more small divergences from the shared masthead, all of them invisible
      until you navigate between hubs and the furniture moves.

   ⚠️ A hero block: eyebrow, a 30px title and a description paragraph, before
      any content. On the ILP section that pushed the actual plan below the
      fold on a phone. The section name lives in the masthead now; the
      description stays, because on these pages it genuinely explains what
      the section is for — but at reading size, under a normal heading.
   ========================================================================== */

export function SubPageShell({
  eyebrow,
  title,
  description,
  layout = 'even',
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * How to weight the two columns.
   *
   * `even` suits sections whose cards carry comparable weight. `lead` gives
   * the first child two thirds — for a section like the ILP, where a tall
   * plan card sat beside a near-empty messages card and left roughly 450px
   * of void down the right of the page. Splitting it 2:1 both closes most of
   * that gap and says which of the two the page is actually about.
   */
  layout?: 'even' | 'lead';
  children: ReactNode;
}) {
  return (
    <HubPage>
      <HubMasthead section="College" title={title} backTo="/apprentice/college-plan" />
      <HubBody>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <HubSectionHeading>{eyebrow}</HubSectionHeading>
            {description && (
              <p className="max-w-prose text-[13px] leading-relaxed text-white">{description}</p>
            )}
          </div>

          {/*
           * Two-up from `lg`, and a lone card spans the full width so a
           * single-card section (Progress, Compliance) doesn't sit in a
           * half-width column with dead space beside it.
           */}
          <div
            className={cn(
              'grid grid-cols-1 items-start gap-4 lg:gap-5 [&>*:only-child]:lg:col-span-full',
              layout === 'lead' ? 'lg:grid-cols-3 [&>*:first-child]:lg:col-span-2' : 'lg:grid-cols-2'
            )}
          >
            {children}
          </div>
        </div>
      </HubBody>
    </HubPage>
  );
}
