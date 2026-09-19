import { useEffect, useState } from 'react';
import type { CalculatorResultReporter } from '@/lib/calculator-outcome';
import type { CalcReport } from '@/lib/calculator-report';
import { useProvideCalcReport } from '@/lib/calculator-report-context';
import { Search, BookOpen, FileText, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  zsValues,
  zsValues5s,
  curveTypes,
  fuseTypes,
  rcdZsValues,
  disconnectionTimes,
  getTableReference,
  get80PercentZs,
} from './zs-values/ZsValuesData';
import ZsLookupResult from './zs-lookup/ZsLookupResult';
import ZsLookupGuidance from './zs-lookup/ZsLookupGuidance';
import ZsLookupStandards from './zs-lookup/ZsLookupStandards';
import {
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorEditorial,
  CalculatorPanes,
} from '@/components/calculators/shared';
import { bs7671ZsLookupContent } from './content/bs7671-zs-lookup';

/** What the compliance check pushes — declared so neither the check nor the
 *  client-PDF report needs an `any` cast. */
interface CompliantDevice {
  device: string;
  curve: string;
  rating: string;
  maxZs: string;
  testZs: string;
  margin: string;
  tableRef: string;
}

const BS7671ZsLookupCalculator = ({ onResult }: CalculatorResultReporter = {}) => {
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState('results');
  const [searchType, setSearchType] = useState('device');
  const [deviceType, setDeviceType] = useState('');
  const [deviceRating, setDeviceRating] = useState('');
  const [curve, setCurve] = useState('');
  const [measuredZs, setMeasuredZs] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [complianceCheck, setComplianceCheck] = useState<any>(null);
  const [quickDevice, setQuickDevice] = useState('');
  const [disconnectionTime, setDisconnectionTime] = useState<'0.4' | '5'>('0.4');

  const getZsData = () => {
    return disconnectionTime === '0.4' ? zsValues : zsValues5s;
  };

  /*
   * Publish the result upward.
   *
   * Derived from state in an effect rather than called inside `performLookup`
   * because there are two result shapes (a device lookup and a measured-Zs
   * compliance check) and a reset — three call sites to keep in step. One
   * effect watching the state they all write is the version that cannot drift.
   */
  useEffect(() => {
    if (!onResult) return;

    if (complianceCheck) {
      const best = complianceCheck.compliantDevices?.[0] as CompliantDevice | undefined;
      onResult({
        headline: best ? `${best.device} ${best.curve}${best.rating}` : 'No compliant device',
        headlineLabel: `Measured Zs ${complianceCheck.measuredZs} \u03a9`,
        inputs: [
          { label: 'Measured Zs', value: `${complianceCheck.measuredZs} \u03a9` },
          { label: 'Disconnection time', value: `${disconnectionTime} s` },
        ],
        outputs: best
          ? [
              { label: 'Largest compliant device', value: `${best.device} ${best.curve}${best.rating}` },
              { label: 'Max Zs for that device', value: best.maxZs },
              { label: 'Margin', value: best.margin },
              { label: 'Compliant devices found', value: String(complianceCheck.compliantDevices.length) },
            ]
          : [{ label: 'Result', value: 'No device in the tables is compliant at this Zs' }],
        basis: `BS 7671:2018+A4:2026 Tables 41.2\u201341.5 (${disconnectionTime} s)`,
      });
      return;
    }

    if (results.length > 0) {
      const first = results[0] as CompliantDevice;
      onResult({
        headline: first.maxZs,
        headlineLabel: `Max Zs \u2014 ${first.device} ${first.curve}${first.rating}`.replace('N/A', ''),
        inputs: [
          { label: 'Device', value: `${first.device} ${first.curve}${first.rating}`.replace('N/A', '') },
          { label: 'Disconnection time', value: `${disconnectionTime} s` },
        ],
        outputs: [
          { label: 'Maximum Zs', value: first.maxZs },
          // The 80% figure is what actually gets compared on site at working
          // temperature, so it belongs in the email beside the tabulated value.
          { label: 'Test limit (80%)', value: first.testZs },
          { label: 'Reference', value: first.tableRef },
        ],
        basis: `BS 7671:2018+A4:2026 ${first.tableRef} (${disconnectionTime} s)`,
      });
      return;
    }

    onResult(null);
  }, [results, complianceCheck, disconnectionTime, onResult]);

  const performLookup = () => {
    if (searchType === 'device' && deviceType) {
      const data = getZsData();
      const deviceResults: any[] = [];
      const tableRef = getTableReference(deviceType, disconnectionTime);

      if (deviceType === 'rcd') {
        // RCD values from Table 41.5
        for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
          deviceResults.push({
            device: 'RCD',
            curve: 'N/A',
            rating: `${rating}mA`,
            maxZs: `${maxZs}Ω`,
            testZs: `${get80PercentZs(maxZs)}Ω`,
            tableRef: 'Table 41.5',
          });
        }
      } else if (deviceType === 'mcb' || deviceType === 'rcbo') {
        const deviceData = data[deviceType as keyof typeof data];
        if (deviceData) {
          for (const [curveKey, curveLabel] of Object.entries(curveTypes)) {
            const curveData = deviceData[curveKey as keyof typeof deviceData] as any;
            if (curveData) {
              for (const [rating, maxZs] of Object.entries(curveData)) {
                deviceResults.push({
                  device: deviceType.toUpperCase(),
                  curve: curveLabel,
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${get80PercentZs(maxZs as number)}Ω`,
                  tableRef,
                });
              }
            }
          }
        }
      } else {
        // Fuse types
        const fuseData = data[deviceType as keyof typeof data];
        if (fuseData && typeof fuseData === 'object') {
          for (const [rating, maxZs] of Object.entries(fuseData)) {
            deviceResults.push({
              device: fuseTypes[deviceType as keyof typeof fuseTypes] || deviceType.toUpperCase(),
              curve: 'N/A',
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${get80PercentZs(maxZs as number)}Ω`,
              tableRef,
            });
          }
        }
      }

      setResults(deviceResults);
    } else if (searchType === 'compliance' && measuredZs) {
      checkCompliance();
    }
  };

  const checkCompliance = () => {
    const zsValue = parseFloat(measuredZs);
    if (isNaN(zsValue)) return;

    const compliantDevices: CompliantDevice[] = [];
    const data = getZsData();
    const tableRef = disconnectionTime === '0.4' ? 'Table 41.3/41.2' : 'Table 41.3/41.4';

    // Check MCBs and RCBOs
    for (const deviceKey of ['mcb', 'rcbo']) {
      const deviceData = data[deviceKey as keyof typeof data];
      if (deviceData && typeof deviceData === 'object') {
        for (const [curveKey, curveData] of Object.entries(deviceData)) {
          if (typeof curveData === 'object') {
            for (const [rating, maxZs] of Object.entries(curveData as any)) {
              const testZs = get80PercentZs(maxZs as number);
              if (zsValue <= testZs) {
                compliantDevices.push({
                  device: deviceKey.toUpperCase(),
                  curve: curveTypes[curveKey as keyof typeof curveTypes],
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${testZs}Ω`,
                  margin: `${(testZs - zsValue).toFixed(3)}Ω`,
                  tableRef,
                });
              }
            }
          }
        }
      }
    }

    // Check fuses
    for (const [fuseKey, fuseName] of Object.entries(fuseTypes)) {
      const fuseData = data[fuseKey as keyof typeof data];
      if (fuseData && typeof fuseData === 'object') {
        for (const [rating, maxZs] of Object.entries(fuseData)) {
          const testZs = get80PercentZs(maxZs as number);
          if (zsValue <= testZs) {
            compliantDevices.push({
              device: fuseName,
              curve: 'N/A',
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${testZs}Ω`,
              margin: `${(testZs - zsValue).toFixed(3)}Ω`,
              tableRef: disconnectionTime === '0.4' ? 'Table 41.2' : 'Table 41.4',
            });
          }
        }
      }
    }

    // Check RCDs (Table 41.5)
    for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
      const testZs = get80PercentZs(maxZs);
      if (zsValue <= testZs) {
        compliantDevices.push({
          device: 'RCD',
          curve: 'N/A',
          rating: `${rating}mA`,
          maxZs: `${maxZs}Ω`,
          testZs: `${testZs}Ω`,
          margin: `${(testZs - zsValue).toFixed(3)}Ω`,
          tableRef: 'Table 41.5',
        });
      }
    }

    setComplianceCheck({
      measuredZs: zsValue,
      compliantDevices: compliantDevices.sort(
        (a, b) => parseFloat(a.margin) - parseFloat(b.margin)
      ),
    });
  };

  const handleQuickDevice = (value: string) => {
    setQuickDevice(value);
    // Parse common formats like "B32", "C16", "D40"
    const match = value.match(/^([BCD])(\d+)$/i);
    if (match) {
      const [, curveChar, rating] = match;
      setDeviceType('mcb');
      setCurve(`type-${curveChar.toLowerCase()}`);
      setDeviceRating(rating);
    }
  };

  const resetCalculator = () => {
    setSearchType('device');
    setDeviceType('');
    setDeviceRating('');
    setCurve('');
    setMeasuredZs('');
    setResults([]);
    setComplianceCheck(null);
    setQuickDevice('');
    setDisconnectionTime('0.4');
  };

  const hasValidInputs = () => {
    if (searchType === 'device') {
      return !!deviceType;
    }
    return !!measuredZs;
  };

  // Build device type options
  const deviceTypeOptions = [
    { value: 'mcb', label: 'MCB (Table 41.3)' },
    { value: 'rcbo', label: 'RCBO (Table 41.3)' },
    { value: 'rcd', label: 'RCD (Table 41.5)' },
    ...Object.entries(fuseTypes).map(([key, label]) => ({
      value: key,
      label,
    })),
  ];

  const tabs = [
    {
      value: 'results',
      label: 'Results',
      icon: Search,
      content: (
        // This calculator has no CalculatorCard — its body lives inside a tab —
        // so the panes wrap the tab's content instead.
        <CalculatorPanes
          copyTitle="BS 7671 Zs Lookup"
          form={
            <div className="space-y-4">
              {/* Search Configuration */}
              <CalculatorInputGrid columns={2}>
                <CalculatorSelect
                  label="Search Type"
                  value={searchType}
                  onChange={setSearchType}
                  options={[
                    { value: 'device', label: 'Lookup by Device Type' },
                    { value: 'compliance', label: 'Check Compliance (80% rule)' },
                  ]}
                />
                <CalculatorSelect
                  label="Disconnection Time"
                  value={disconnectionTime}
                  onChange={(v) => setDisconnectionTime(v as '0.4' | '5')}
                  options={Object.entries(disconnectionTimes).map(([key, label]) => ({
                    value: key,
                    label,
                  }))}
                />
              </CalculatorInputGrid>

              {searchType === 'device' && (
                <CalculatorInputGrid columns={2}>
                  <CalculatorInput
                    label="Quick Device"
                    type="text"
                    value={quickDevice}
                    onChange={handleQuickDevice}
                    placeholder="B32, C16, D40..."
                    hint="Type MCB designation"
                  />
                  <CalculatorSelect
                    label="Device Type"
                    value={deviceType}
                    onChange={setDeviceType}
                    options={deviceTypeOptions}
                    placeholder="Select device type"
                  />
                </CalculatorInputGrid>
              )}

              {searchType === 'compliance' && (
                <CalculatorInput
                  label="Measured Zs Value"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={measuredZs}
                  onChange={setMeasuredZs}
                  placeholder="e.g., 0.75"
                  hint="Checks against 80% of max Zs (ambient temperature correction)"
                />
              )}

              <CalculatorActions
                category="testing"
                onCalculate={performLookup}
                onReset={resetCalculator}
                isDisabled={!hasValidInputs()}
                calculateLabel={searchType === 'device' ? 'Show Values' : 'Check Compliance'}
              />
            </div>
          }
          result={
            <ZsLookupResult
              searchType={searchType}
              results={results}
              complianceCheck={complianceCheck}
              measuredZs={measuredZs}
            />
          }
        />
      ),
    },
    {
      value: 'guidance',
      label: 'Guidance',
      icon: BookOpen,
      content: <ZsLookupGuidance />,
    },
    {
      value: 'standards',
      label: 'Standards',
      icon: FileText,
      content: <ZsLookupStandards />,
    },
  ];

  const buildReport = (): CalcReport | null => {
    if (searchType === 'device' && results.length > 0) {
      return {
        meta: {
          title: 'BS 7671 Zs Lookup',
          subtitle: `Maximum earth fault loop impedance — ${disconnectionTimes[disconnectionTime]}`,
          standard: 'BS 7671:2018+A4:2026',
        },
        sections: [
          {
            heading: 'Device lookup results',
            rows: results.map((item) => ({
              label: `${item.device} ${item.curve !== 'N/A' ? item.curve : ''} ${item.rating}`.trim(),
              value: `Max Zs ${item.maxZs} · 80% test ${item.testZs}`,
              note: item.tableRef,
            })),
          },
        ],
        notes: [
          '80% test values account for conductor temperature rise under fault conditions (Reg 643.7.2 allowance).',
        ],
      };
    }

    if (searchType === 'compliance' && complianceCheck) {
      const compliant = complianceCheck.compliantDevices as CompliantDevice[];
      return {
        meta: {
          title: 'BS 7671 Zs Compliance Check',
          subtitle: `Measured Zs against maximum values — ${disconnectionTimes[disconnectionTime]}`,
          standard: 'BS 7671:2018+A4:2026',
        },
        headline: [
          // The lead figure must be the calculated result, not the value the
          // electrician typed in — so "Compliant devices found" comes first
          // and the measured Zs (an input) follows as context.
          {
            label: 'Compliant devices found',
            value: `${compliant.length}`,
            verdict: compliant.length > 0 ? 'pass' : 'fail',
          },
          { label: 'Measured Zs', value: `${complianceCheck.measuredZs}`, unit: 'Ω' },
        ],
        sections:
          compliant.length > 0
            ? [
                {
                  heading: 'Compliant devices',
                  rows: compliant.slice(0, 20).map((item) => ({
                    label: `${item.device} ${item.curve !== 'N/A' ? item.curve : ''} ${item.rating}`.trim(),
                    value: `Max Zs ${item.maxZs} · margin ${item.margin}`,
                    note: item.tableRef,
                  })),
                },
              ]
            : [
                {
                  heading: 'Result',
                  items: ['The measured Zs exceeds all maximum values in BS 7671 for the devices checked.'],
                },
              ],
        notes:
          compliant.length > 20
            ? [`Showing the top 20 results of ${compliant.length} compliant devices.`]
            : undefined,
      };
    }

    return null;
  };

  useProvideCalcReport(
    (searchType === 'device' && results.length > 0) || (searchType === 'compliance' && !!complianceCheck)
      ? buildReport
      : null
  );

  return (
    <div className="space-y-4">
      {/* Header removed 2026-08-07. It was a bordered, gradient-filled card whose
          entire contents were a title and one subtitle line, fronted by a tinted
          rounded box holding a magnifier icon — a lot of chrome for two lines,
          which is why it rendered as a near-empty panel. Two things were wrong:
          the house rule is that section headings are TYPOGRAPHY ONLY (no icons,
          no coloured dots, no gradient bars), and every page embedding this
          calculator already gives it a heading of its own — /guides/ze-values-uk
          says "Check Your Zs Reading Against the BS 7671 Maximum" directly above
          it — so the reader was being told the same thing twice.
          The identifying line now lives with the table reference in the results,
          where it is information rather than decoration. */}

      {/* Tabs */}
      {isMobile ? (
        <DropdownTabs
          tabs={tabs}
          defaultValue="results"
          onValueChange={setActiveTab}
          placeholder="Select tab"
          className="w-full"
        />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white/5 rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
      <CalculatorEditorial content={bs7671ZsLookupContent} category="testing" />
    </div>
  );
};

export default BS7671ZsLookupCalculator;
