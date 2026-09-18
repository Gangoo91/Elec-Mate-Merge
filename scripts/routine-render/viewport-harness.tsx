/* eslint-disable react-refresh/only-export-components -- a render harness, not a component module; it mounts itself and exports nothing. */
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import RoutineInspectionFormTabs from '@/components/inspection/routine-inspection/RoutineInspectionFormTabs';
import { getDefaultRoutineInspectionFormData } from '@/types/routine-inspection';
import { itemsForVisitType } from '@/data/routineInspectionItems';

const q = new URLSearchParams(location.search);
const tab = (q.get('tab') || 'client') as never;
const visitType = (q.get('vt') || 'landlord') as 'landlord' | 'commercial';

const items = itemsForVisitType(visitType).map((i, n) => ({
  ...i,
  outcome: (n === 12 ? 'defect' : n === 38 ? 'not-verified' : 'satisfactory') as never,
  notes: n === 38 ? 'Second bedroom occupied — tenant declined access' : '',
}));

const seed = {
  ...getDefaultRoutineInspectionFormData(),
  visitType,
  certificateNumber: 'RIR-2026-0007',
  clientName: 'M. Whitfield',
  clientAddress: '22 Sandringham Court, Stafford ST16 3PL',
  clientPhone: '07700 900412',
  clientEmail: 'landlord@example.com',
  installationAddress: 'Flat 14B, Sandringham Court, Stafford ST16 3PL',
  occupier: 'Ms A. Reeve',
  lettingAgent: 'Harper & Co Lettings',
  propertyReference: 'SC-14B',
  dwellingType: 'hmo' as const,
  eicrDate: '2022-02-02',
  eicrNextDue: '2027-02-02',
  supplyType: 'single-phase' as const,
  boardsCovered: 'Consumer unit in the hall cupboard; no sub-boards',
  purpose: 'Annual landlord safety visit between condition reports',
  extent: 'All rooms, consumer unit, alarms tested, outside sockets',
  inspectionItems: items,
  observations: [
    {
      id: 'o1',
      itemId: items[12].id,
      location: 'Hallway and landing alarms',
      description: 'Alarms do not interlink when tested.',
      code: 'C2' as const,
      photos: [],
    },
  ],
  sitePhotos: [
    {
      id: 's1',
      src: 'data:image/gif;base64,R0lGODlhAQABAIAAADQ5PgAAACwAAAAAAQABAAACAkQBADs=',
      caption: 'Consumer unit as found',
    },
  ],
  // Switched on so the mobile audit measures this section too — touch targets,
  // text size and truncation are meaningless on a section that never renders.
  spotChecksCarriedOut: true,
  testInstrument: 'Megger MFT1741',
  testInstrumentSerial: 'MFT-88213',
  testInstrumentCalDate: '2026-03-04',
  spotChecks: [
    {
      id: 'r1',
      type: 'rcd' as const,
      customType: '',
      customUnit: '',
      location: 'Main RCD, 30 mA',
      value: '19',
      valueX5: '14',
      notes: '',
    },
    {
      id: 'r2',
      type: 'other' as const,
      customType: 'Prospective fault current',
      customUnit: 'kA',
      location: 'Origin',
      value: '1.2',
      valueX5: '',
      notes: '',
    },
  ],
  generalCondition: 'Installation in sound condition for its age.',
  recommendations: 'Replace both alarm heads with an interlinked set.',
  nextInspectionDue: '2027-09-18',
  inspectorName: 'A. Moore',
  inspectorPosition: 'Approved Electrician',
  companyName: 'Elec-Mate Ltd',
};

function Harness() {
  const [data, setData] = useState<never>(seed as never);
  return (
    <main className="mx-auto max-w-3xl px-4 py-4 pb-32 lg:max-w-none lg:px-8 xl:max-w-[1700px]">
      <RoutineInspectionFormTabs
        currentTab={tab}
        formData={data}
        onUpdate={(f, v) => setData((p) => ({ ...(p as object), [f]: v }) as never)}
        customerId={null}
      />
    </main>
  );
}
document.documentElement.classList.add('dark');
createRoot(document.getElementById('root')!).render(<Harness />);
