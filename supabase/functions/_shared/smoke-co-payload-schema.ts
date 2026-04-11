/**
 * smoke-co-payload-schema.ts
 * Zod schema for the Smoke & CO Alarm Installation Certificate PDF payload.
 * Validates the output of formatSmokeCOJson() before sending to the PDF template.
 *
 * Every field here maps to a {{ variable }} in the Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Alarm Entry Schema ──────────────────────────────────────────────────────

const alarmEntrySchema = z.object({
  id: z.string().default(''),
  floor: z.string().default(''),
  room: z.string().default(''),
  alarmType: z.string().default(''),
  manufacturer: z.string().default(''),
  model: z.string().default(''),
  serialNumber: z.string().default(''),
  powerSource: z.string().default(''),
  interconnect: z.string().default(''),
  wirelessModule: z.string().default(''),
  dateOfManufacture: z.string().default(''),
  replacementDue: z.string().default(''),
  mounting: z.string().default('ceiling'),
  functionalTest: z.string().default(''),
  mainsIndicator: z.string().default(''),
});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const smokeCOPayloadSchema = z
  .object({
    // Certificate header
    referenceNumber: z.string().default(''),
    installationDate: z.string().default(''),
    certificateType: z.string().default(''),

    // Property
    propertyAddress: z.string().default(''),
    propertyType: z.string().default(''),
    numberOfStoreys: z.string().default(''),
    numberOfRooms: z.string().default(''),
    tenure: z.string().default(''),
    hmoLicenceNumber: z.string().default(''),
    combustionAppliances: z.array(z.string()).default([]),
    combustionApplianceLocations: z.string().default(''),

    // Landlord / Client
    landlordName: z.string().default(''),
    landlordAddress: z.string().default(''),
    landlordPhone: z.string().default(''),
    landlordEmail: z.string().default(''),
    managingAgentName: z.string().default(''),
    managingAgentCompany: z.string().default(''),
    managingAgentPhone: z.string().default(''),
    managingAgentEmail: z.string().default(''),
    tenantName: z.string().default(''),

    // Installer
    installerName: z.string().default(''),
    installerCompany: z.string().default(''),
    installerPhone: z.string().default(''),
    installerEmail: z.string().default(''),
    registrationScheme: z.string().default(''),
    registrationNumber: z.string().default(''),
    competentPersonScheme: z.boolean().default(false),

    // System design
    gradeAchieved: z.string().default(''),
    categoryAchieved: z.string().default(''),
    interconnectionMethod: z.string().default(''),
    rfWirelessSystem: z.string().default(''),
    powerSupply: z.string().default(''),
    circuitNumber: z.string().default(''),
    mcbRating: z.string().default(''),
    rcdProtected: z.boolean().default(false),
    cableType: z.string().default(''),

    // Alarms
    alarms: z.array(alarmEntrySchema).default([]),

    // System tests
    interconnectionTest: z.string().default(''),
    interconnectionTriggerAlarm: z.string().default(''),
    audibilityTest: z.string().default(''),
    mainsSupplyVerified: z.string().default(''),
    batteryBackupTest: z.string().default(''),
    rfSignalTest: z.string().default(''),

    // Compliance
    compliesSmokeCORegs2022: z.boolean().default(false),
    compliesBS5839_6: z.boolean().default(false),
    compliesBSEN14604: z.boolean().default(false),
    compliesBSEN50291: z.boolean().default(false),
    compliesBS7671: z.boolean().default(false),
    partPNotification: z.string().default(''),

    // Recommendations
    observations: z.string().default(''),
    selectedRecommendations: z.array(z.string()).default([]),
    nextInspectionDate: z.string().default(''),

    // Signatures
    installerSignature: z.string().default(''),
    installerDate: z.string().default(''),
    clientSignature: z.string().default(''),
    clientDate: z.string().default(''),
    notes: z.string().default(''),

    // Company branding
    companyName: z.string().default(''),
    companyAddress: z.string().default(''),
    companyPhone: z.string().default(''),
    companyEmail: z.string().default(''),
    companyLogo: z.string().default(''),
  })
  .passthrough();

export type SmokeCOPayload = z.infer<typeof smokeCOPayloadSchema>;
