import React from 'react';
import { createRoot } from 'react-dom/client';
import RoutineInspectionFormTabs from '@/components/inspection/routine-inspection/RoutineInspectionFormTabs';
import { getDefaultRoutineInspectionFormData } from '@/types/routine-inspection';
import { itemsForVisitType } from '@/data/routineInspectionItems';

/*
 * Collected rather than thrown. The point is a LIST of what is broken — a
 * harness that dies on the first crash makes you fix one thing, re-run, and
 * find the next, twenty times over.
 */
const errors: string[] = [];
window.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origErr = console.error;
console.error = (...a: unknown[]) => { errors.push('console.error: ' + a.map(String).join(' ')); origErr(...a); };

class Boundary extends React.Component<{ label: string; children: React.ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (this.state.err) { errors.push(`CRASH [${this.props.label}]: ${this.state.err.message}`); return null; }
    return this.props.children as React.ReactElement;
  }
}

const rich = (visitType: 'landlord' | 'commercial') => ({
  ...getDefaultRoutineInspectionFormData(),
  visitType,
  inspectionItems: itemsForVisitType(visitType).map((i, n) => ({
    ...i, outcome: (n % 4 === 0 ? 'defect' : n % 4 === 1 ? 'not-verified' : 'satisfactory') as never,
    notes: n % 4 === 1 ? 'could not access' : '',
  })),
  observations: [
    { id: 'o1', itemId: itemsForVisitType(visitType)[0].id, location: 'Kitchen', description: 'Cracked socket', code: 'C1' as const, photos: [] },
    { id: 'o2', location: '', description: 'Uncoded finding', code: '' as const, photos: [] },
  ],
  sitePhotos: [{ id: 's1', src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=', caption: 'Board' }],
  /*
   * ⚠️ Every OPTIONAL section has to be switched on in the "full" fixture, or
   * the harness reports clean on code it never rendered. Spot checks were added
   * and this fixture was not, so twenty renders passed without the section ever
   * mounting.
   *
   * The rows are deliberately awkward: an 'other' reading exercises the two
   * extra fields only it shows, and a row whose values are null reproduces what
   * comes back out of a JSON column — the shape that used to throw during
   * render and white-screen the report.
   */
  spotChecksCarriedOut: true,
  testInstrument: 'Megger MFT1741',
  testInstrumentSerial: 'MFT-88213',
  testInstrumentCalDate: '2026-03-04',
  spotChecks: [
    { id: 'r1', type: 'rcd' as const, customType: '', customUnit: '', location: 'Main RCD', value: '19', valueX5: '14', notes: '' },
    { id: 'r2', type: 'other' as const, customType: 'Prospective fault current', customUnit: 'kA', location: 'Origin', value: '1.2', valueX5: '', notes: 'n' },
    { id: 'r3', type: 'zs' as const, customType: null, customUnit: null, location: null, value: null, valueX5: null, notes: null } as never,
  ],
  eicrNextDue: '2027-02-02',
  dwellingType: 'hmo' as const,
  thermalSurveyCarriedOut: visitType === 'commercial',
  surveyMode: 'quantitative' as const,
  anomalies: visitType === 'commercial'
    ? [{ id: 'a1', location: 'DB2', equipment: 'way 6', description: 'hot', measuredTemp: '71', referenceTemp: '24',
         reference: 'ambient' as const, emissivity: '0.95', reflectedTemp: '24', measuredLoad: '22', ratedLoad: '32',
         priority: '1' as const, action: 'Re-terminate', thermalPhotos: [], visiblePhotos: [] }]
    : [],
});

const TABS = ['client', 'visit', 'inspection', 'thermal', 'declaration'] as const;
const host = document.createElement('div');
document.body.appendChild(host);

const cases: React.ReactElement[] = [];
for (const vt of ['landlord', 'commercial'] as const) {
  for (const tab of TABS) {
    // Empty state AND fully-populated state — a component that only breaks on
    // real data is the one that reaches a user.
    for (const [name, data] of [
      [`${vt}/${tab}/empty`, { ...getDefaultRoutineInspectionFormData(), visitType: vt }],
      [`${vt}/${tab}/full`, rich(vt)],
    ] as const) {
      cases.push(
        <Boundary key={name} label={name}>
          <RoutineInspectionFormTabs currentTab={tab as never} formData={data as never} onUpdate={() => {}} customerId={null} />
        </Boundary>
      );
    }
  }
}

createRoot(host).render(<>{cases}</>);
setTimeout(() => {
  document.title = errors.length ? 'FAIL::' + errors.join(' ||| ') : `PASS::${cases.length} renders clean`;
  (document.getElementById('res') as HTMLElement).textContent = document.title;
}, 1500);
