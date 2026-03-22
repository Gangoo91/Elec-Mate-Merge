/**
 * pat-testing-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/pat-testing-payload-schema.ts.
 * Used as the return type of formatPATTestingJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface PATVisualInspectionPayload {
  flex: string;
  plug: string;
  fuse: string;
  case: string;
  switch: string;
  env: string;
}

export interface PATElectricalTestsPayload {
  earth: string;
  earth_result: string;
  insulation: string;
  insulation_result: string;
  load: string;
  load_result: string;
  leakage: string;
  leakage_result: string;
  polarity: string;
  functional: string;
}

export interface PATAppliancePayload {
  asset_number: string;
  description: string;
  make: string;
  model: string;
  serial_number: string;
  location: string;
  appliance_class: string;
  category: string;
  visual: PATVisualInspectionPayload;
  electrical: PATElectricalTestsPayload;
  visual_notes: string;
  overall_result: string;
  repair_code: string;
  next_test_due: string;
  notes: string;
  test_date: string;
  tested_by: string;
  has_photos: boolean;
  photo_count: number;
  first_photo: string;
}

export interface PATFailedAppliancePayload {
  asset_number: string;
  description: string;
  make: string;
  model: string;
  serial_number: string;
  location: string;
  repair_code: string;
  repair_code_label: string;
  failure_reasons: string;
  notes: string;
  visual_notes: string;
  photos: string[];
  has_photos: boolean;
}

export interface PATAppliancePhotoGroupPayload {
  asset_number: string;
  description: string;
  result: string;
  photos: string[];
}

export interface PATTestingPayloadType {
  // Nested objects
  metadata: {
    certificate_number: string;
    test_date: string;
    report_reference: string;
    standard: string;
  };

  client_details: {
    client_name: string;
    client_address: string;
    client_phone: string;
    client_email: string;
    contact_person: string;
  };

  site_details: {
    site_name: string;
    site_address: string;
    site_contact_name: string;
    site_contact_phone: string;
  };

  test_equipment: {
    make: string;
    model: string;
    serial_number: string;
    last_calibration: string;
    next_calibration: string;
  };

  summary: {
    total_tested: number;
    total_passed: number;
    total_failed: number;
    pass_rate: number;
  };

  declarations: {
    tester: {
      name: string;
      company: string;
      qualifications: string;
      signature: string;
      date: string;
    };
  };

  // Appliance arrays
  appliances: PATAppliancePayload[];
  failed_appliances: PATFailedAppliancePayload[];

  // Recommendations & retest
  recommendations: string;
  retest_interval: string | number;
  next_test_due: string;
  additional_notes: string;

  // Photos
  has_photos: boolean;
  appliance_photos: PATAppliancePhotoGroupPayload[];

  // Company branding
  company_logo: string;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_tagline: string;
  company_accent_color: string;
  company_website: string;
  registration_scheme: string;
  registration_number: string;
  registration_scheme_logo: string;
}
