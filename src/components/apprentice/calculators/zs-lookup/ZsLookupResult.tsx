import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { copyToClipboard } from '@/lib/calc-utils';
import { useToast } from '@/hooks/use-toast';

interface ZsLookupResultProps {
  searchType: string;
  results: any[];
  complianceCheck: any;
  measuredZs: string;
}

const ZsLookupResult = ({
  searchType,
  results,
  complianceCheck,
  measuredZs,
}: ZsLookupResultProps) => {
  const { toast } = useToast();
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCurve, setFilterCurve] = useState('');
  const [filterRatingMin, setFilterRatingMin] = useState('');
  const [filterRatingMax, setFilterRatingMax] = useState('');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredResults = results.filter((item) => {
    const curveMatch = !filterCurve || item.curve.toLowerCase().includes(filterCurve.toLowerCase());
    const ratingValue = parseFloat(item.rating.replace('A', ''));
    const minMatch = !filterRatingMin || ratingValue >= parseFloat(filterRatingMin);
    const maxMatch = !filterRatingMax || ratingValue <= parseFloat(filterRatingMax);
    return curveMatch && minMatch && maxMatch;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    let aValue, bValue;

    switch (sortColumn) {
      case 'rating':
        aValue = parseFloat(a.rating.replace('A', ''));
        bValue = parseFloat(b.rating.replace('A', ''));
        break;
      case 'maxZs':
        aValue = parseFloat(a.maxZs.replace('Ω', ''));
        bValue = parseFloat(b.maxZs.replace('Ω', ''));
        break;
      case 'margin':
        aValue = parseFloat(a.margin?.replace('Ω', '') || '0');
        bValue = parseFloat(b.margin?.replace('Ω', '') || '0');
        break;
      default:
        aValue = a[sortColumn];
        bValue = b[sortColumn];
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const copyResults = async () => {
    let text = '';
    if (searchType === 'device' && results.length > 0) {
      text = `BS7671 Zs Lookup - Device Values\n\n`;
      text += `Device\tCurve\tRating\tMax Zs (100%)\t80% Test Value\n`;
      sortedResults.forEach((item) => {
        const testValue = (parseFloat(item.maxZs.replace('Ω', '')) * 0.8).toFixed(3);
        text += `${item.device}\t${item.curve}\t${item.rating}\t${item.maxZs}\t${testValue}Ω\n`;
      });
    } else if (searchType === 'compliance' && complianceCheck) {
      text = `BS7671 Zs Compliance Check\n\n`;
      text += `Measured Zs: ${complianceCheck.measuredZs}Ω\n`;
      text += `Compliant devices: ${complianceCheck.compliantDevices.length}\n\n`;
      text += `Device\tCurve\tRating\tMax Zs\tMargin\tHeadroom %\n`;
      complianceCheck.compliantDevices.slice(0, 20).forEach((item: any) => {
        const headroom = (
          (parseFloat(item.margin.replace('Ω', '')) / parseFloat(item.maxZs.replace('Ω', ''))) *
          100
        ).toFixed(1);
        text += `${item.device}\t${item.curve}\t${item.rating}\t${item.maxZs}\t${item.margin}\t${headroom}%\n`;
      });
    }

    const success = await copyToClipboard(text);
    toast({
      title: success ? 'Results copied!' : 'Copy failed',
      description: success ? 'Lookup results copied to clipboard' : 'Please try again',
      variant: success ? 'success' : 'destructive',
    });
  };

  const getHeadroomBar = (margin: string, maxZs: string) => {
    const marginValue = parseFloat(margin.replace('Ω', ''));
    const maxValue = parseFloat(maxZs.replace('Ω', ''));
    const percentage = Math.min((marginValue / maxValue) * 100, 100);

    return (
      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  if (results.length === 0 && !complianceCheck) return null;

  return (
    <div className="space-y-6">
      {/* Device Lookup Results */}
      {searchType === 'device' && results.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <div className="flex justify-between items-start gap-3">
            <span className="text-[12px] font-medium text-white">Device lookup results</span>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] text-[13px] touch-manipulation"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MobileInput
              id="filter-curve"
              label="Filter by Curve"
              placeholder="e.g., B, C, D"
              value={filterCurve}
              onChange={(e) => setFilterCurve(e.target.value)}
              className="h-11 bg-white/[0.04] border-white/10 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <MobileInput
              id="filter-min"
              label="Min Rating (A)"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 6"
              value={filterRatingMin}
              onChange={(e) => setFilterRatingMin(e.target.value)}
              className="h-11 bg-white/[0.04] border-white/10 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <MobileInput
              id="filter-max"
              label="Max Rating (A)"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 32"
              value={filterRatingMax}
              onChange={(e) => setFilterRatingMax(e.target.value)}
              className="h-11 bg-white/[0.04] border-white/10 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          {/* Phone: one row per device (name line, figures line) instead of a
              500px table that scrolled sideways. Same figures as the table. */}
          <ul className="divide-y divide-white/[0.06] sm:hidden">
            {sortedResults.map((item, index) => {
              const testValue =
                item.testZs || `${(parseFloat(item.maxZs.replace('Ω', '')) * 0.8).toFixed(3)}Ω`;
              return (
                <li key={index} className="py-3">
                  <p className="text-[14px] font-semibold text-white">
                    {item.device} {item.curve} {item.rating}
                  </p>
                  <p className="mt-0.5 text-[13px] tabular-nums text-white">
                    Max Zs <span className="font-semibold">{item.maxZs}</span>
                    <span aria-hidden> · </span>
                    80% test <span className="font-semibold">{testValue}</span>
                    <span aria-hidden> · </span>
                    {item.tableRef || 'Table 41.3'}
                  </p>
                </li>
              );
            })}
            {sortedResults.length === 0 && (
              <li className="py-4 text-center text-[13px] text-white">
                No devices match your filter criteria
              </li>
            )}
          </ul>

          <div className="hidden max-h-96 overflow-y-auto overflow-x-auto sm:block">
            <table className="w-full text-[13px] min-w-[500px]">
              <thead className="sticky top-0 bg-[#0a0a0a]">
                <tr className="border-b border-white/[0.06]">
                  <th
                    className="text-left p-2 cursor-pointer text-[12px] font-medium text-white whitespace-nowrap"
                    onClick={() => handleSort('device')}
                  >
                    Device {sortColumn === 'device' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="text-left p-2 cursor-pointer text-[12px] font-medium text-white whitespace-nowrap"
                    onClick={() => handleSort('curve')}
                  >
                    Curve {sortColumn === 'curve' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="text-left p-2 cursor-pointer text-[12px] font-medium text-white whitespace-nowrap"
                    onClick={() => handleSort('rating')}
                  >
                    Rating {sortColumn === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="text-left p-2 cursor-pointer text-[12px] font-medium text-white whitespace-nowrap"
                    onClick={() => handleSort('maxZs')}
                  >
                    Max Zs {sortColumn === 'maxZs' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                    80% Test
                  </th>
                  <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                    Table
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((item, index) => {
                  const testValue =
                    item.testZs || `${(parseFloat(item.maxZs.replace('Ω', '')) * 0.8).toFixed(3)}Ω`;

                  return (
                    <tr key={index} className="border-b border-white/[0.04]">
                      <td className="p-2 text-white whitespace-nowrap">{item.device}</td>
                      <td className="p-2">
                        <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                          {item.curve}
                        </span>
                      </td>
                      <td className="p-2 font-mono text-white whitespace-nowrap">{item.rating}</td>
                      <td className="p-2 font-mono text-white whitespace-nowrap">{item.maxZs}</td>
                      <td className="p-2 font-mono text-white whitespace-nowrap">{testValue}</td>
                      <td className="p-2">
                        <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                          {item.tableRef || 'Table 41.3'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {sortedResults.length === 0 && (
              <p className="text-center text-[13px] text-white py-4">
                No devices match your filter criteria
              </p>
            )}
          </div>
        </div>
      )}

      {/* Compliance Check Results */}
      {searchType === 'compliance' && complianceCheck && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <div className="flex justify-between items-start gap-3">
            <span className="text-[12px] font-medium text-white">
              Compliance check for Zs = {complianceCheck.measuredZs}Ω
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] text-[13px] touch-manipulation"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy
            </Button>
          </div>

          {complianceCheck.compliantDevices.length > 0 ? (
            <>
              <p className="text-[14px] text-white leading-relaxed">
                {complianceCheck.compliantDevices.length} compliant protection devices found.
              </p>

              {/* Phone rows — see the results list above. */}
              <ul className="divide-y divide-white/[0.06] sm:hidden">
                {complianceCheck.compliantDevices.slice(0, 20).map((item: any, index: number) => {
                  const headroom = (
                    (parseFloat(item.margin.replace('Ω', '')) /
                      parseFloat(item.maxZs.replace('Ω', ''))) *
                    100
                  ).toFixed(1);
                  const testValue = parseFloat(item.maxZs.replace('Ω', '')) * 0.8;
                  const measured = complianceCheck.measuredZs;
                  let status = 'Pass (80%)';
                  if (measured > testValue && measured <= parseFloat(item.maxZs.replace('Ω', ''))) {
                    status = 'Pass (100%)';
                  }
                  return (
                    <li key={index} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[14px] font-semibold text-white">
                          {item.device} {item.curve} {item.rating}
                        </p>
                        <span className="shrink-0 rounded-md border border-white/15 px-2 py-0.5 text-[12px] text-white">
                          {status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13px] tabular-nums text-white">
                        Max Zs <span className="font-semibold">{item.maxZs}</span>
                        <span aria-hidden> · </span>
                        Margin <span className="font-semibold">{item.margin}</span>
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        {getHeadroomBar(item.margin, item.maxZs)}
                        <span className="text-[12px] tabular-nums text-white">
                          {headroom}% headroom
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {complianceCheck.compliantDevices.length > 20 && (
                <p className="text-[12px] text-white sm:hidden">
                  Showing top 20 results of {complianceCheck.compliantDevices.length} compliant
                  devices.
                </p>
              )}

              <div className="hidden max-h-80 overflow-y-auto overflow-x-auto sm:block">
                <table className="w-full text-[13px] min-w-[600px]">
                  <thead className="sticky top-0 bg-[#0a0a0a]">
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Device
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Curve
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Rating
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Max Zs
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Margin
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Headroom
                      </th>
                      <th className="text-left p-2 text-[12px] font-medium text-white whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceCheck.compliantDevices
                      .slice(0, 20)
                      .map((item: any, index: number) => {
                        const headroom = (
                          (parseFloat(item.margin.replace('Ω', '')) /
                            parseFloat(item.maxZs.replace('Ω', ''))) *
                          100
                        ).toFixed(1);
                        const testValue = parseFloat(item.maxZs.replace('Ω', '')) * 0.8;
                        const measured = complianceCheck.measuredZs;

                        let status = 'Pass (80%)';
                        if (
                          measured > testValue &&
                          measured <= parseFloat(item.maxZs.replace('Ω', ''))
                        ) {
                          status = 'Pass (100%)';
                        }

                        return (
                          <tr key={index} className="border-b border-white/[0.04]">
                            <td className="p-2 text-white whitespace-nowrap">{item.device}</td>
                            <td className="p-2">
                              <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                                {item.curve}
                              </span>
                            </td>
                            <td className="p-2 font-mono text-white whitespace-nowrap">
                              {item.rating}
                            </td>
                            <td className="p-2 font-mono text-white whitespace-nowrap">
                              {item.maxZs}
                            </td>
                            <td className="p-2 font-mono text-white whitespace-nowrap">
                              {item.margin}
                            </td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                {getHeadroomBar(item.margin, item.maxZs)}
                                <span className="text-[12px] text-white font-mono whitespace-nowrap">
                                  {headroom}%
                                </span>
                              </div>
                            </td>
                            <td className="p-2">
                              <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {complianceCheck.compliantDevices.length > 20 && (
                  <p className="text-[12px] text-white mt-2">
                    Showing top 20 results of {complianceCheck.compliantDevices.length} compliant
                    devices.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3 space-y-1">
                <span className="text-[12px] font-medium text-red-300">
                  No compliant protection devices found
                </span>
                <p className="text-[13px] text-white leading-relaxed">
                  The measured Zs exceeds all maximum values in BS 7671.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                <span className="text-[12px] font-medium text-white">Remediation options</span>
                <ul className="space-y-1.5">
                  {[
                    'Reduce circuit length or increase conductor size',
                    'Improve earthing arrangements (lower Ze)',
                    'Consider different protection device with higher Zs tolerance',
                    'Check for loose connections increasing circuit resistance',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-white leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      {/* Why this matters */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[12px] font-medium text-white">Why this matters</span>
        <ul className="space-y-1.5">
          {[
            'Zs values ensure protective devices operate within required disconnection times (0.4s for final circuits, 5s for distribution)',
            'Values in BS 7671 tables are maximum limits — actual installations should have margin for safety',
            '80% test values account for conductor temperature rise under fault conditions',
          ].map((item, i) => (
            <li key={i} className="text-[13px] text-white leading-relaxed flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Assumptions */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[12px] font-medium text-white">Key assumptions</span>
        <ul className="space-y-1.5">
          {[
            'Nominal voltage: 230V (Uo) single phase',
            'Standard ambient temperature (20°C for cables)',
            'Table 41.2: Fuses (0.4s), Table 41.3: MCBs / RCBOs, Table 41.4: Fuses (5s), Table 41.5: RCDs',
            '80% rule per Regulation 643.7.2 for ambient temperature testing',
            'TN system unless otherwise specified',
          ].map((item, i) => (
            <li key={i} className="text-[13px] text-white leading-relaxed flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ZsLookupResult;
