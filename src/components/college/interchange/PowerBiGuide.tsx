/* ==========================================================================
   PowerBiGuide (ELE-2057): connecting the reporting views to Power BI or
   Excel through the read API, on the Data and API page.

   The query uses Web.Contents with a fixed base URL and the RelativePath and
   Query options, because Microsoft documents that as the way a web source
   built in code can still refresh on a schedule in the Power BI service
   ("Refresh and dynamic data sources"):
     https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data
   It pages with next_offset until it is null, and builds the table from the
   documented columns so an empty dataset still has its headers.
   ========================================================================== */

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { QBTN, QPanel } from '@/components/college/quality/QualityHubKit';
import { REPORTING_DATASETS } from '@/lib/college/interchange';
import { POWER_BI_QUERY } from '@/lib/college/powerBi';

export function PowerBiGuide() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(POWER_BI_QUERY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-3" data-testid="power-bi-guide">
      <QPanel
        title="Connect Power BI in five steps"
        sub="Once per report. Works the same in Excel (Data, Get Data, From Other Sources, Blank Query)."
      >
        <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-relaxed text-white">
          <li>
            Ask a college admin or head of department to create a key above with only the scopes
            your report needs. The reporting views need:{' '}
            {REPORTING_DATASETS.map((d) => `${d.title.toLowerCase()} (${d.scope})`).join(', ')}.
          </li>
          <li>
            In Power BI Desktop choose Get data, Blank query, then Advanced Editor, and paste the
            query below. Replace the key, and the dataset name on the last line.
          </li>
          <li>
            When Power BI asks how to connect to the web address, choose Anonymous: the key travels
            in the Authorization header, not as a sign-in.
          </li>
          <li>
            Duplicate the query once per view (learner_progress, learner_hours, learner_reviews,
            learner_risk, learner_attendance) and the learners dataset, and relate them on
            learner_id.
          </li>
          <li>
            Publish, then in the Power BI service open the semantic model settings, set the data
            source credentials to Anonymous, tick Skip test connection if offered, and set a
            scheduled refresh (once a night is plenty).
          </li>
        </ol>
      </QPanel>

      <QPanel
        title="The query"
        sub="Pages through the API 1000 rows at a time and keeps the documented column order."
        action={
          <button type="button" className={QBTN} onClick={() => void copy()} data-testid="copy-m">
            {copied ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
        }
      >
        <pre
          className="overflow-x-auto whitespace-pre rounded-lg bg-black/40 p-3 font-mono text-[12px] leading-relaxed text-white"
          data-testid="power-bi-query"
        >
          {POWER_BI_QUERY}
        </pre>
      </QPanel>

      <QPanel title="Good to know">
        <ul className="space-y-2 text-[13px] leading-relaxed text-white">
          <li>
            Scheduled refresh works because the query keeps the address fixed and puts the dataset
            in RelativePath and Query, which Microsoft lists as the exception for web sources built
            in code.
          </li>
          <li>
            The reporting views are snapshots as at the refresh (their as_at column), so refresh
            them in full; since is not applied to them. The row-level datasets (hours, decisions,
            attendance, reviews) do take since for incremental loads.
          </li>
          <li>
            The key sits in the report file. Anyone with the file can read what the key allows, so
            share the report, not the file, and revoke the key here when someone leaves. Every
            refresh appears in the key&rsquo;s calls.
          </li>
          <li>
            A key allows 60 calls a minute by default. Each page is one call, so a college of a few
            hundred learners refreshes all six tables in well under that.
          </li>
          <li>
            Want a nightly CSV dropped into SharePoint or an SFTP folder instead? That needs a
            destination and credentials from your IT team, so it is set up per college on request.
          </li>
        </ul>
      </QPanel>
    </div>
  );
}
