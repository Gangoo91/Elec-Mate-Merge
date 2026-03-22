/**
 * emergency-lighting-payload.ts
 * TypeScript interface mirroring the Zod schema in _shared/emergency-lighting-payload-schema.ts.
 * Used as the return type of formatEmergencyLightingJson() for compile-time drift detection.
 *
 * No Zod dependency — pure types only.
 */

export interface EmergencyLightingLuminaire {
  number: number;
  location: string;
  make: string;
  model: string;
  type: string;
  type_raw: string;
  category: string;
  category_raw: string;
  rated_duration: number | string;
  rated_duration_display: string;
  functional_result: string;
  functional_result_raw: string;
  duration_result: string;
  duration_result_raw: string;
  battery_type: string;
  battery_type_raw: string;
  wattage: number | string;
  notes: string;
  install_date: string;
  photo_url: string;
}

export interface EmergencyLightingLuxReading {
  number: number;
  location: string;
  category: string;
  category_display: string;
  reading: string;
  min_required: string;
  result: string;
  result_raw: string;
}

export interface EmergencyLightingDefect {
  number: number;
  description: string;
  priority: string;
  priority_raw: string;
  luminaire_id: string;
  luminaire_location: string;
  rectified: boolean;
  rectified_display: string;
  rectification_date: string;
  photo_url: string;
}

export interface EmergencyLightingPhoto {
  number: number;
  url: string;
  caption: string;
  category: string;
  category_display: string;
  linked_item: string;
  uploaded_at?: string;
}

export interface EmergencyLightingCategoryPhoto {
  number: number;
  url: string;
  caption: string;
  linked_item: string;
  uploaded_at?: string;
}

export interface EmergencyLightingPayloadType {
  // Nested objects
  metadata: {
    certificate_number: string;
    test_type: string;
    test_type_display: string;
    test_date: string;
    standards: string;
  };

  client: {
    name: string;
    address: string;
    telephone: string;
    email: string;
  };

  premises: {
    name: string;
    address: string;
    type: string;
    type_display: string;
    occupancy_type: string;
    occupancy_display: string;
  };

  system: {
    type: string;
    type_display: string;
    rated_duration: number | string;
    rated_duration_display: string;
    total_luminaires: number;
    central_battery_system: boolean;
    central_battery_system_display: string;
    central_battery_location: string;
    self_contained_units: boolean;
    self_contained_units_display: string;
    purpose_escape_route: boolean;
    purpose_open_area: boolean;
    purpose_high_risk: boolean;
    purpose_standby: boolean;
    has_purpose: boolean;
  };

  equipment: {
    luminaire_count: number;
    exit_sign_count: number;
    central_battery_count: number;
    total_count: number;
  };

  test_equipment: {
    lux_meter_make: string;
    lux_meter_serial: string;
    lux_meter_calibration_date: string;
    has_equipment: boolean;
  };

  luminaire_summary: {
    total: number;
    escape_route: number;
    open_area: number;
    high_risk: number;
    standby: number;
    exit_signs: number;
    all_pass: boolean;
    all_pass_display: string;
    pass_count: number;
    fail_count: number;
    tested_count: number;
  };

  monthly_test: {
    date: string;
    all_luminaires_operational: boolean;
    all_luminaires_operational_display: string;
    charging_indicators_normal: boolean;
    charging_indicators_normal_display: string;
    faults_found: string;
    action_taken: string;
    has_faults: boolean;
  };

  annual_test: {
    date: string;
    duration_tested: number | string;
    all_luminaires_operational: boolean;
    all_luminaires_operational_display: string;
    battery_condition: string;
    battery_condition_display: string;
    faults_found: string;
    action_taken: string;
    has_faults: boolean;
  };

  service_schedule: {
    next_monthly_test: string;
    next_annual_test: string;
  };

  tester: {
    name: string;
    company: string;
    qualifications: string;
    signature: string;
    date: string;
  };

  responsible_person: {
    name: string;
    position: string;
    signature: string;
    date: string;
    has_responsible_person: boolean;
  };

  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
    tagline: string;
    accent_color: string;
    registration_scheme_logo: string;
    registration_scheme: string;
    registration_number: string;
  };

  // Certificate type
  certificate_type: string;
  certificate_type_display: string;

  // Extent
  extent_of_installation: string;
  has_extent: boolean;

  // Arrays
  luminaires: EmergencyLightingLuminaire[];
  lux_readings: EmergencyLightingLuxReading[];
  defects: EmergencyLightingDefect[];
  photos: EmergencyLightingPhoto[];

  // Photo arrays by category
  installation_photos: EmergencyLightingCategoryPhoto[];
  luminaire_photos: EmergencyLightingCategoryPhoto[];
  defect_photos: EmergencyLightingCategoryPhoto[];
  central_battery_photos: EmergencyLightingCategoryPhoto[];
  exit_sign_photos: EmergencyLightingCategoryPhoto[];

  // Boolean flags
  has_lux_readings: boolean;
  has_defects: boolean;
  no_defects: boolean;
  has_photos: boolean;
  has_installation_photos: boolean;
  has_luminaire_photos: boolean;
  has_defect_photos: boolean;
  has_recommendations: boolean;
  has_additional_notes: boolean;
  is_satisfactory: boolean;
  defect_count: number;
  photo_count: number;

  // Result
  overall_result: string;
  overall_result_display: string;

  // Text fields
  recommendations: string;
  additional_notes: string;
  declaration_text: string;

  // Flat copies — certificate
  certificate_number: string;
  test_date: string;
  test_type: string;

  // Flat copies — client
  client_name: string;
  client_address: string;
  client_telephone: string;
  client_email: string;

  // Flat copies — premises
  premises_name: string;
  premises_address: string;
  premises_type: string;
  occupancy_type: string;

  // Flat copies — system
  system_type: string;
  rated_duration: number | string;
  central_battery_system: boolean;
  central_battery_location: string;
  self_contained_units: boolean;

  // Flat copies — equipment
  luminaire_count: number;
  exit_sign_count: number;
  central_battery_count: number;

  // Flat copies — service schedule
  next_monthly_test_due: string;
  next_annual_test_due: string;

  // Flat copies — tester
  tester_name: string;
  tester_company: string;
  tester_qualifications: string;
  tester_signature: string;
  tester_date: string;

  // Flat copies — responsible person
  responsible_person_name: string;
  responsible_person_position: string;
  responsible_person_signature: string;
  responsible_person_date: string;

  // Flat copies — test equipment
  lux_meter_make: string;
  lux_meter_serial: string;
  lux_meter_calibration_date: string;

  // Flat copies — company
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  company_tagline: string;
  company_accent_color: string;
  registration_scheme_logo: string;
  registration_scheme: string;
  registration_number: string;
}
