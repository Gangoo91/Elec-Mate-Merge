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
  alarmType: label(alarm.alarmType),
  manufacturer: str(alarm.manufacturer),
  model: str(alarm.model),
  serialNumber: str(alarm.serialNumber),
  powerSource: label(alarm.powerSource),
  interconnect: label(alarm.interconnect),
  wirelessModule: str(alarm.wirelessModule),
  dateOfManufacture: ukDate(alarm.dateOfManufacture),
  replacementDue: ukDate(alarm.replacementDue),
  mounting: label(alarm.mounting || 'ceiling'),
  functionalTest: str(alarm.functionalTest),
  mainsIndicator: str(alarm.mainsIndicator),
});


/**
 * Stored option value -> the label the electrician actually saw in the form.
 *
 * The template interpolates these fields directly, so without this the
 * certificate printed raw slugs: "multi-sensor-heat-co", "private-rental",
 * "mains-sealed-lithium", "self-certified". Mapping here (rather than in Liquid)
 * matches emergencyLightingJsonFormatter's approach and means the template
 * needs no case/when blocks.
 *
 * Grade (A-F) and category (LD1-3) are deliberately NOT mapped — they are
 * already the published designations and the template renders them as
 * "Grade {{ gradeAchieved }}".
 */
const OPTION_LABELS: Record<string, string> = {
  // certificate type
  'new-installation': 'New installation', replacement: 'Replacement',
  addition: 'Addition to existing', upgrade: 'Upgrade',
  // tenure
  'private-rental': 'Private rental', 'social-housing': 'Social housing',
  'owner-occupied': 'Owner-occupied',
  // alarm type
  'optical-smoke': 'Optical smoke', heat: 'Heat',
  'multi-sensor-smoke-heat': 'Multi-sensor (smoke + heat)',
  'multi-sensor-heat-co': 'Multi-sensor (heat + CO)', CO: 'CO alarm',
  // power source
  'mains-sealed-lithium': 'Mains + lithium', 'mains-rechargeable': 'Mains + rechargeable',
  'sealed-lithium': 'Lithium 10yr', 'replaceable-battery': 'Replaceable battery',
  // interconnection
  hardwired: 'Hardwired', 'rf-wireless': 'RF wireless',
  combination: 'Combination', standalone: 'Standalone',
  // mounting
  ceiling: 'Ceiling', wall: 'Wall',
  // Part P notification
  'self-certified': 'Self-certified via competent person scheme',
  'building-control': 'Notified to building control',
  'not-applicable': 'Not applicable (battery only / existing circuit)',
};

/** Human label for a stored option value; unknown values pass through. */
const label = (v: unknown): string => {
  const k = String(v ?? '').trim();
  return k ? (OPTION_LABELS[k] ?? k) : '';
};

/**
 * ISO (YYYY-MM-DD) -> UK (DD/MM/YYYY). Every date on this certificate reached
 * the PDF as a raw ISO string, so a UK compliance document was printing
 * "2026-08-02" — and on the cover's next-inspection tile that reads as a run of
 * digits. Mirrors formatDateUK in emergencyLightingJsonFormatter. Anything not
 * in ISO form passes through untouched.
 */
const ukDate = (v: unknown): string => {
  const s = String(v ?? '').trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s;
};

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
    installationDate: ukDate(formData.installationDate),
    certificateType: label(formData.certificateType),

    // Property
    propertyAddress: str(formData.propertyAddress),
    propertyType: label(formData.propertyType),
    numberOfStoreys: str(formData.numberOfStoreys),
    numberOfRooms: str(formData.numberOfRooms),
    tenure: label(formData.tenure),
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
    interconnectionMethod: label(formData.interconnectionMethod),
    rfWirelessSystem: str(formData.rfWirelessSystem),
    powerSupply: label(formData.powerSupply),
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
    compliesBS5446_2: bool(formData.compliesBS5446_2),
    compliesBSEN50291: bool(formData.compliesBSEN50291),
    compliesBS7671: bool(formData.compliesBS7671),
    partPNotification: label(formData.partPNotification),

    // Recommendations
    observations: str(formData.observations),
    selectedRecommendations,
    nextInspectionDate: ukDate(formData.nextInspectionDate),

    // Signatures
    installerSignature: str(formData.installerSignature),
    installerDate: ukDate(formData.installerDate),
    clientSignature: str(formData.clientSignature),
    clientDate: ukDate(formData.clientDate),
    notes: str(formData.notes),

    // Company branding (merged from branding override or formData)
    companyName: str(branding?.companyName ?? formData.companyName),
    companyAddress: str(branding?.companyAddress ?? formData.companyAddress),
    companyPhone: str(branding?.companyPhone ?? formData.companyPhone),
    companyEmail: str(branding?.companyEmail ?? formData.companyEmail),
    companyLogo: str(branding?.companyLogo ?? formData.companyLogo),
    companyWebsite: str(branding?.companyWebsite ?? formData.companyWebsite),
    // The electrician's brand colour from Settings → Business → Brand. The
    // template used to hardcode its accent, so this never had any effect.
    companyAccentColor: str(branding?.companyAccentColor ?? formData.companyAccentColor),
    registrationSchemeLogo: str(branding?.registrationSchemeLogo ?? formData.registrationSchemeLogo),
  };
};
