/**
 * smokeCOJsonFormatter.ts
 * Formats Smoke & CO Alarm certificate form data for PDF generation.
 * Compliant with BS 5839-6:2019+A1:2020 and Smoke & CO Alarm Regulations 2015 (as amended 2022).
 *
 * Since the HTML template uses camelCase variables that match the form data,
 * this is mostly a pass-through with explicit defaults for every field.
 */

// ── Alarm entry shape (matches AlarmEntry in SmokeCOAlarmCertificate.tsx) ────

interface AlarmEntry {
  id: string;
  floor: string;
  room: string;
  alarmType: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  powerSource: string;
  interconnect: string;
  wirelessModule: string;
  dateOfManufacture: string;
  replacementDue: string;
  mounting: string;
  functionalTest: string;
  mainsIndicator: string;
}

// ── Branding overlay ────────────────────────────────────────────────────────

interface SmokeCOBranding {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const str = (value: unknown, fallback = ''): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number') return String(value);
  return String(value);
};

const bool = (value: unknown, fallback = false): boolean => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
};

const ensureAlarm = (alarm: Partial<AlarmEntry>): AlarmEntry => ({
  id: str(alarm.id, crypto.randomUUID()),
  floor: str(alarm.floor),
  room: str(alarm.room),
  alarmType: str(alarm.alarmType),
  manufacturer: str(alarm.manufacturer),
  model: str(alarm.model),
  serialNumber: str(alarm.serialNumber),
  powerSource: str(alarm.powerSource),
  interconnect: str(alarm.interconnect),
  wirelessModule: str(alarm.wirelessModule),
  dateOfManufacture: str(alarm.dateOfManufacture),
  replacementDue: str(alarm.replacementDue),
  mounting: str(alarm.mounting, 'ceiling'),
  functionalTest: str(alarm.functionalTest),
  mainsIndicator: str(alarm.mainsIndicator),
});

// ── Main formatter ──────────────────────────────────────────────────────────

export const formatSmokeCOJson = (
  formData: Record<string, any>,
  branding?: SmokeCOBranding
) => {
  const alarms: AlarmEntry[] = Array.isArray(formData.alarms)
    ? formData.alarms.map((a: Partial<AlarmEntry>) => ensureAlarm(a))
    : [];

  const combustionAppliances: string[] = Array.isArray(formData.combustionAppliances)
    ? formData.combustionAppliances.map(String)
    : [];

  const selectedRecommendations: string[] = Array.isArray(formData.selectedRecommendations)
    ? formData.selectedRecommendations.map(String)
    : [];

  return {
    // Certificate header
    referenceNumber: str(formData.referenceNumber),
    installationDate: str(formData.installationDate),
    certificateType: str(formData.certificateType),

    // Property
    propertyAddress: str(formData.propertyAddress),
    propertyType: str(formData.propertyType),
    numberOfStoreys: str(formData.numberOfStoreys),
    numberOfRooms: str(formData.numberOfRooms),
    tenure: str(formData.tenure),
    hmoLicenceNumber: str(formData.hmoLicenceNumber),
    combustionAppliances,
    combustionApplianceLocations: str(formData.combustionApplianceLocations),

    // Landlord / Client
    landlordName: str(formData.landlordName),
    landlordAddress: str(formData.landlordAddress),
    landlordPhone: str(formData.landlordPhone),
    landlordEmail: str(formData.landlordEmail),
    managingAgentName: str(formData.managingAgentName),
    managingAgentCompany: str(formData.managingAgentCompany),
    managingAgentPhone: str(formData.managingAgentPhone),
    managingAgentEmail: str(formData.managingAgentEmail),
    tenantName: str(formData.tenantName),

    // Installer
    installerName: str(formData.installerName),
    installerCompany: str(formData.installerCompany),
    installerPhone: str(formData.installerPhone),
    installerEmail: str(formData.installerEmail),
    registrationScheme: str(formData.registrationScheme),
    registrationNumber: str(formData.registrationNumber),
    competentPersonScheme: bool(formData.competentPersonScheme),

    // System design
    gradeAchieved: str(formData.gradeAchieved),
    categoryAchieved: str(formData.categoryAchieved),
    interconnectionMethod: str(formData.interconnectionMethod),
    rfWirelessSystem: str(formData.rfWirelessSystem),
    powerSupply: str(formData.powerSupply),
    circuitNumber: str(formData.circuitNumber),
    mcbRating: str(formData.mcbRating),
    rcdProtected: bool(formData.rcdProtected),
    cableType: str(formData.cableType),

    // Alarms
    alarms,

    // System tests
    interconnectionTest: str(formData.interconnectionTest),
    interconnectionTriggerAlarm: str(formData.interconnectionTriggerAlarm),
    audibilityTest: str(formData.audibilityTest),
    mainsSupplyVerified: str(formData.mainsSupplyVerified),
    batteryBackupTest: str(formData.batteryBackupTest),
    rfSignalTest: str(formData.rfSignalTest),

    // Compliance
    compliesSmokeCORegs2022: bool(formData.compliesSmokeCORegs2022),
    compliesBS5839_6: bool(formData.compliesBS5839_6),
    compliesBSEN14604: bool(formData.compliesBSEN14604),
    compliesBSEN50291: bool(formData.compliesBSEN50291),
    compliesBS7671: bool(formData.compliesBS7671),
    partPNotification: str(formData.partPNotification),

    // Recommendations
    observations: str(formData.observations),
    selectedRecommendations,
    nextInspectionDate: str(formData.nextInspectionDate),

    // Signatures
    installerSignature: str(formData.installerSignature),
    installerDate: str(formData.installerDate),
    clientSignature: str(formData.clientSignature),
    clientDate: str(formData.clientDate),
    notes: str(formData.notes),

    // Company branding (merged from branding override or formData)
    companyName: str(branding?.companyName ?? formData.companyName),
    companyAddress: str(branding?.companyAddress ?? formData.companyAddress),
    companyPhone: str(branding?.companyPhone ?? formData.companyPhone),
    companyEmail: str(branding?.companyEmail ?? formData.companyEmail),
    companyLogo: str(branding?.companyLogo ?? formData.companyLogo),
  };
};
