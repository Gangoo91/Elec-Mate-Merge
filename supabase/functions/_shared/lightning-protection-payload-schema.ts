/**
 * Lightning Protection Certificate — Zod payload schema
 * BS EN 62305-3 Inspection & Testing
 *
 * Validates and defaults the JSON payload before PDF generation.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

const earthElectrodeTestSchema = z.object({
  id: z.string().default(''),
  reference: z.string().default(''),
  location: z.string().default(''),
  electrodeType: z.string().default(''),
  testMethod: z.string().default(''),
  measuredResistance: z.string().default(''),
  previousReading: z.string().default(''),
  photo: z.string().default(''),
  notes: z.string().default(''),
}).passthrough();

const downConductorTestSchema = z.object({
  id: z.string().default(''),
  reference: z.string().default(''),
  location: z.string().default(''),
  fromPoint: z.string().default(''),
  toPoint: z.string().default(''),
  measuredResistance: z.string().default(''),
  previousReading: z.string().default(''),
  photo: z.string().default(''),
}).passthrough();

const bondingTestSchema = z.object({
  id: z.string().default(''),
  reference: z.string().default(''),
  serviceBonded: z.string().default(''),
  bondLocation: z.string().default(''),
  conductorSize: z.string().default(''),
  measuredResistance: z.string().default(''),
}).passthrough();

const spdCheckSchema = z.object({
  id: z.string().default(''),
  reference: z.string().default(''),
  location: z.string().default(''),
  spdType: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  statusIndicator: z.string().default(''),
  disconnectorCheck: z.string().default(''),
}).passthrough();

const separationDistanceCheckSchema = z.object({
  id: z.string().default(''),
  location: z.string().default(''),
  measuredDistance: z.string().default(''),
  requiredDistance: z.string().default(''),
}).passthrough();

const visualInspectionItemSchema = z.object({
  id: z.string().default(''),
  category: z.string().default(''),
  description: z.string().default(''),
  result: z.string().default(''),
  photo: z.string().default(''),
  note: z.string().default(''),
}).passthrough();

const observationSchema = z.object({
  id: z.string().default(''),
  reference: z.string().default(''),
  location: z.string().default(''),
  description: z.string().default(''),
  severity: z.string().default(''),
  recommendedAction: z.string().default(''),
  photo: z.string().default(''),
  completionDate: z.string().default(''),
}).passthrough();

const servicesBondedSchema = z.object({
  electrical: z.boolean().default(false),
  gas: z.boolean().default(false),
  water: z.boolean().default(false),
  telecoms: z.boolean().default(false),
  structuralSteel: z.boolean().default(false),
  hvac: z.boolean().default(false),
  other: z.string().default(''),
}).passthrough();

export const lightningProtectionPayloadSchema = z.object({
  // Certificate
  certificateNumber: z.string().default(''),
  inspectionDate: z.string().default(''),
  inspectionType: z.string().default(''),
  previousCertRef: z.string().default(''),
  previousCertDate: z.string().default(''),
  nextInspectionDue: z.string().default(''),
  nextVisualInspectionDue: z.string().default(''),
  designStandard: z.string().default(''),

  // Client
  clientName: z.string().default(''),
  clientAddress: z.string().default(''),
  clientPhone: z.string().default(''),
  clientEmail: z.string().default(''),

  // Site
  siteName: z.string().default(''),
  siteAddress: z.string().default(''),
  buildingType: z.string().default(''),
  buildingUse: z.string().default(''),
  numberOfFloors: z.string().default(''),
  buildingHeight: z.string().default(''),
  constructionType: z.string().default(''),

  // Contractor
  contractorCompany: z.string().default(''),
  atlasNumber: z.string().default(''),
  testerName: z.string().default(''),
  testerQualifications: z.string().default(''),
  reviewerName: z.string().default(''),

  // LPS overview
  lpsClass: z.string().default(''),
  lpsType: z.string().default(''),
  originalInstallDate: z.string().default(''),
  systemAge: z.string().default(''),

  // Air termination
  airTerminationType: z.string().default(''),
  airTerminationMaterial: z.string().default(''),
  meshSize: z.string().default(''),
  numberOfAirRods: z.string().default(''),

  // Down conductors
  downConductorMaterial: z.string().default(''),
  downConductorSize: z.string().default(''),
  numberOfDownConductors: z.string().default(''),
  downConductorSpacing: z.string().default(''),

  // Earth termination
  numberOfElectrodes: z.string().default(''),
  electrodeType: z.string().default(''),
  electrodeMaterial: z.string().default(''),
  electrodeDepth: z.string().default(''),

  // Strike counter
  strikeCounterFitted: z.boolean().default(false),
  strikeCounterReading: z.string().default(''),
  strikeCounterPreviousReading: z.string().default(''),

  // Bonding
  bondingBarLocation: z.string().default(''),
  servicesBonded: servicesBondedSchema.default({}),

  // SPDs
  spd1Fitted: z.boolean().default(false),
  spd1Location: z.string().default(''),
  spd1Make: z.string().default(''),
  spd1Model: z.string().default(''),
  spd2Fitted: z.boolean().default(false),
  spd2Location: z.string().default(''),
  spd2Make: z.string().default(''),
  spd2Model: z.string().default(''),
  spd3Fitted: z.boolean().default(false),
  spd3Location: z.string().default(''),
  spd3Make: z.string().default(''),
  spd3Model: z.string().default(''),

  // Visual inspection
  visualInspection: z.array(visualInspectionItemSchema).default([]),

  // Test conditions
  weatherCondition: z.string().default(''),
  soilCondition: z.string().default(''),
  ambientTemp: z.string().default(''),

  // LPS drawing
  lpsDrawingRef: z.string().default(''),
  lpsDrawingAttached: z.boolean().default(false),

  // Test limitations
  hasTestLimitations: z.boolean().default(false),
  testLimitations: z.string().default(''),

  // Soil resistivity
  soilResistivity: z.string().default(''),

  // Test instrument
  instrumentMake: z.string().default(''),
  instrumentModel: z.string().default(''),
  instrumentSerial: z.string().default(''),
  instrumentCalDate: z.string().default(''),

  // Test schedules
  earthElectrodeTests: z.array(earthElectrodeTestSchema).default([]),
  downConductorTests: z.array(downConductorTestSchema).default([]),
  bondingTests: z.array(bondingTestSchema).default([]),
  spdChecks: z.array(spdCheckSchema).default([]),
  separationChecks: z.array(separationDistanceCheckSchema).default([]),

  // Observations
  observations: z.array(observationSchema).default([]),

  // Risk assessment
  riskAssessmentRef: z.string().default(''),
  riskAssessmentDate: z.string().default(''),
  requiredLPSClass: z.string().default(''),
  actualLPSClass: z.string().default(''),
  riskAssessmentCompliant: z.boolean().default(false),

  // Overall
  overallResult: z.string().default(''),

  // Signatures
  inspectorSignature: z.string().default(''),
  inspectorDate: z.string().default(''),
  reviewerSignature: z.string().default(''),
  reviewerDate: z.string().default(''),
  clientSignature: z.string().default(''),
  clientDate: z.string().default(''),

  // Photos
  photos: z.array(z.string()).default([]),
  additionalNotes: z.string().default(''),

  // Form state
  completedSections: z.record(z.boolean()).default({}),
  status: z.string().default('draft'),

  // Branding
  companyLogo: z.string().default(''),
  companyName: z.string().default(''),
  companyAddress: z.string().default(''),
  companyPhone: z.string().default(''),
  companyEmail: z.string().default(''),
}).passthrough();

export type LightningProtectionPayload = z.infer<typeof lightningProtectionPayloadSchema>;
