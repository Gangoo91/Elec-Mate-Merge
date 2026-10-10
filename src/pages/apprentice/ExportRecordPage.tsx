/**
 * ExportRecordPage — /apprentice/export.
 *
 * "Export my record" as its own page (Andrew, 10 Oct: "this might actually be
 * better to be on its own page"). Making a pack, single documents, the
 * gateway declarations and every pack made are one workspace: too much for a
 * sheet over the portfolio. Staff still open the same body in
 * ExportPackSheet from Student 360.
 */
import useSEO from '@/hooks/useSEO';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { ExportRecordBody } from '@/components/portfolio-export/ExportPackSheet';

export default function ExportRecordPage() {
  useSEO({ title: 'Export my record', description: 'Your portfolio as a pack.', noindex: true });
  return (
    <HubSubPage title="Export my record" section="Portfolio" backTo="/apprentice/hub">
      <header className="min-w-0">
        <h1 className="text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[34px]">
          Export my record
        </h1>
        <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-white">
          A copy of everything you have done, any time. Every pack is kept, and each download link
          lasts 24 hours: make a new one whenever you need it.
        </p>
      </header>
      <ExportRecordBody learnerUserId={null} mode="learner" />
    </HubSubPage>
  );
}
