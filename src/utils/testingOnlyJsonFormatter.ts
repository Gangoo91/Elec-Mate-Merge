/**
 * testingOnlyJsonFormatter.ts
 * Formats Testing Only certificate form data for PDF generation.
 *
 * Since the HTML template uses camelCase variables that match the form data,
 * this is mostly a pass-through with explicit defaults for every field.
 *
 * NO branding fields — intentionally omitted for Testing Only certificates.
 */

// ── Helpers ─────────────────────────────────────────────────────────────────

const str = (value: unknown, fallback = ''): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number') return String(value);
  return String(value);
};

// ── Circuit entry shape (matches TestCircuit in TestingOnlyCertificate.tsx) ──

interface TestCircuit {
  id: string;
  circuitRef: string;
  description: string;
  cableType: string;
  cableSize: string;
  protectionType: string;
  protectionRating: string;
  ze: string;
  zs: string;
  r1r2: string;
  r2: string;
  ir: string;
  polarity: string;
  rcdType: string;
  rcdRating: string;
  rcdTripTime: string;
  result: string;
}

const ensureCircuit = (circuit: Partial<TestCircuit>): TestCircuit => ({
  id: str(circuit.id, crypto.randomUUID()),
  circuitRef: str(circuit.circuitRef),
  description: str(circuit.description),
  cableType: str(circuit.cableType),
  cableSize: str(circuit.cableSize),
  protectionType: str(circuit.protectionType),
  protectionRating: str(circuit.protectionRating),
  ze: str(circuit.ze),
  zs: str(circuit.zs),
  r1r2: str(circuit.r1r2),
  r2: str(circuit.r2),
  ir: str(circuit.ir),
  polarity: str(circuit.polarity),
  rcdType: str(circuit.rcdType),
  rcdRating: str(circuit.rcdRating),
  rcdTripTime: str(circuit.rcdTripTime),
  result: str(circuit.result),
});

// ── Inline defaults (matches defaultData() in TestingOnlyCertificate.tsx) ───

const defaults: Record<string, any> = {
  referenceNumber: '',
  testDate: '',
  testerName: '',
  testerQualifications: '',
  testerPhone: '',
  testerEmail: '',
  clientName: '',
  declarationConfirmed: false,
  mftMake: '',
  mftModel: '',
  mftSerial: '',
  mftCalDate: '',
  loopMake: '',
  loopSerial: '',
  rcdTesterMake: '',
  rcdTesterSerial: '',
  installationAddress: '',
  installationDescription: '',
  numberOfCircuits: '',
  circuits: [],
  testerSignature: '',
  testerDate: '',
  notes: '',
};

// ── Main formatter ──────────────────────────────────────────────────────────

export const formatTestingOnlyJson = (formData: Record<string, any>) => {
  const merged = { ...defaults, ...formData };

  const circuits: TestCircuit[] = Array.isArray(merged.circuits)
    ? merged.circuits.map((c: Partial<TestCircuit>) => ensureCircuit(c))
    : [];

  return {
    // Certificate header
    referenceNumber: str(merged.referenceNumber),
    testDate: str(merged.testDate),

    // Tester details
    testerName: str(merged.testerName),
    testerQualifications: str(merged.testerQualifications),
    testerPhone: str(merged.testerPhone),
    testerEmail: str(merged.testerEmail),

    // Client / Main Contractor
    clientName: str(merged.clientName),
    declarationConfirmed: merged.declarationConfirmed ?? false,

    // MFT instrument
    mftMake: str(merged.mftMake),
    mftModel: str(merged.mftModel),
    mftSerial: str(merged.mftSerial),
    mftCalDate: str(merged.mftCalDate),

    // Loop tester
    loopMake: str(merged.loopMake),
    loopSerial: str(merged.loopSerial),

    // RCD tester
    rcdTesterMake: str(merged.rcdTesterMake),
    rcdTesterSerial: str(merged.rcdTesterSerial),

    // Installation
    installationAddress: str(merged.installationAddress),
    installationDescription: str(merged.installationDescription),
    numberOfCircuits: str(merged.numberOfCircuits),

    // Circuits
    circuits,

    // Signature & notes
    testerSignature: str(merged.testerSignature),
    testerDate: str(merged.testerDate),
    notes: str(merged.notes),
  };
};
