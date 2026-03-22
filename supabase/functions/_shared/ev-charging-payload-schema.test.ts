/**
 * ev-charging-payload-schema.test.ts
 * Deno tests for the EV Charging Installation Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/ev-charging-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { evChargingPayloadSchema } from './ev-charging-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    metadata: {
      certificate_number: 'EV-001',
      installation_date: '22/03/2026',
      standard: 'BS 7671:2018+A2:2022',
      code_of_practice: 'IET CoP for EV Charging',
      section_reference: '722',
    },
    client_details: { name: 'John Smith', address: '123 Test St', telephone: '07700900000', email: 'john@test.com' },
    vehicle_details: { make: 'Tesla', model: 'Model 3', registration: 'AB12 CDE' },
    installation_details: { address: '123 Test St', type: 'domestic', type_display: 'Domestic' },
    charger_details: {
      make: 'Zappi', model: 'V2', serial: 'ZAP-001', mode: '3',
      connection_type: 'tethered', connection_display: 'Tethered',
      power_rating_kw: '7.4', rated_current_a: '32', phases: 'Single', socket_type: 'Type 2',
    },
    supply_details: {
      voltage: '230', phases: 'single', phases_display: 'Single Phase',
      earthing_arrangement: 'TN-C-S', ze: '0.20', pfc: '4.5', external_loop_impedance: '0.35',
    },
    pme_details: {
      is_pme: true, is_pme_display: 'Yes', earthing_measures: 'Earth electrode installed',
      earth_electrode_installed: true, earth_electrode_installed_display: 'Yes', earth_electrode_resistance: '42',
    },
    circuit_details: {
      designation: 'EV Charger', cable_type: 'SWA', cable_size_mm2: '6',
      cable_length_m: '12', installation_method: 'Buried',
    },
    protection_details: {
      device_type: 'RCBO', rating_a: '32', curve: 'B',
      rcd_type: 'Type A', rcd_rating_ma: '30', rcd_integral: false, rcd_integral_display: 'No',
    },
    test_results: {
      r1r2: '0.45', r2: '0.72', zs: '0.65', max_zs: '1.37', zs_satisfactory: 'Yes',
      insulation_resistance: '>200', insulation_satisfactory: 'Yes',
      polarity: 'correct', polarity_display: 'Correct',
      rcd_trip_time: '18', rcd_trip_time_satisfactory: 'Yes',
      rcd_trip_time_x5: '12', rcd_trip_time_x5_satisfactory: 'Yes',
      earth_electrode_ra: '42', functional_test: 'pass', functional_test_display: 'Pass',
      load_test: 'pass', load_test_display: 'Pass', load_test_current: '31.5',
      voltage_drop: '3.2', voltage_drop_satisfactory: 'Yes',
      phase_rotation: 'N/A', continuity_pe: '0.15',
      rcd_test_button: 'pass', rcd_test_button_display: 'Pass',
    },
    dno_notification: {
      required: false, submitted: false, submitted_display: 'No', date: '', reference: '',
      g98_notification: false, g98_display: 'No', g99_application: false, g99_display: 'No',
    },
    ozev_details: { applicable: false, applicable_display: 'No', scheme: '', scheme_display: '', reference: '' },
    smart_features: {
      smart_charging_enabled: true, smart_charging_display: 'Yes',
      load_management: true, load_management_display: 'Yes', load_management_type: 'Dynamic CT clamp',
    },
    handover: {
      user_instructions_provided: true, user_instructions_display: 'Yes',
      operating_manual_provided: true, operating_manual_display: 'Yes', special_conditions: '',
    },
    installer: {
      name: 'Installer Bob', company: 'EV Install Co', qualifications: 'C&G 2919',
      scheme: 'NAPIT', scheme_number: 'NAP-001', signature: 'data:image/png;base64,...', date: '22/03/2026',
    },
    compliance: {
      bs7671: true, bs7671_display: 'Yes', iet_cop: true, iet_cop_display: 'Yes',
      building_regs: true, building_regs_display: 'Yes',
    },
    company_details: {
      company_name: 'EV Install Co', company_address: '456 Test Ave', company_phone: '07700900001',
      company_email: 'info@evinstall.com', company_website: '', company_logo: '',
      company_tagline: '', company_accent_color: '#22c55e',
      registration_scheme: '', registration_number: '', registration_scheme_logo: '',
    },
    additional_notes: '',
    special_conditions: '',
    declaration_text: '',
    // Flat copies
    client_name: 'John Smith',
    client_address: '123 Test St',
    client_telephone: '07700900000',
    client_email: 'john@test.com',
    vehicle_make: 'Tesla',
    vehicle_model: 'Model 3',
    vehicle_registration: 'AB12 CDE',
    installation_address: '123 Test St',
    installation_date: '22/03/2026',
    installation_type: 'domestic',
    charger_make: 'Zappi',
    charger_model: 'V2',
    charger_serial: 'ZAP-001',
    charger_mode: '3',
    charger_connection: 'tethered',
    power_rating_kw: '7.4',
    rated_current_a: '32',
    phases: 'Single',
    socket_type: 'Type 2',
    supply_voltage: '230',
    supply_phases: 'single',
    earthing_arrangement: 'TN-C-S',
    ze: '0.20',
    prospective_fault_current: '4.5',
    external_loop_impedance: '0.35',
    is_pme: true,
    pme_earthing_measures: 'Earth electrode installed',
    earth_electrode_installed: true,
    earth_electrode_resistance: '42',
    circuit_designation: 'EV Charger',
    cable_type: 'SWA',
    cable_size_mm2: '6',
    cable_length_m: '12',
    installation_method: 'Buried',
    protection_device_type: 'RCBO',
    protection_device_rating_a: '32',
    protection_device_curve: 'B',
    rcd_type: 'Type A',
    rcd_rating_ma: '30',
    rcd_integral: false,
    voltage_drop: '3.2',
    phase_rotation: 'N/A',
    continuity_pe: '0.15',
    rcd_test_button: 'pass',
    ozev_grant_applicable: false,
    ozev_scheme: '',
    ozev_grant_ref: '',
    dno_notified: false,
    dno_notification_date: '',
    dno_reference: '',
    g98_notification: false,
    g99_application: false,
    smart_charging_enabled: true,
    load_management: true,
    load_management_type: 'Dynamic CT clamp',
    user_instructions_provided: true,
    operating_manual_provided: true,
    installer_name: 'Installer Bob',
    installer_company: 'EV Install Co',
    installer_qualifications: 'C&G 2919',
    installer_scheme: 'NAPIT',
    installer_scheme_number: 'NAP-001',
    installer_signature: 'data:image/png;base64,...',
    installer_date: '22/03/2026',
    bs7671_compliance: true,
    iet_cop_compliance: true,
    building_regs_compliance: true,
    certificate_number: 'EV-001',
    company_name: 'EV Install Co',
    company_address: '456 Test Ave',
    company_phone: '07700900001',
    company_email: 'info@evinstall.com',
    company_website: '',
    company_logo: '',
    company_tagline: '',
    company_accent_color: '#22c55e',
    registration_scheme: '',
    registration_number: '',
    registration_scheme_logo: '',
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when nested object is wrong type', () => {
  const payload = { ...makeMinimalPayload(), client_details: 'not an object' };
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = evChargingPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.metadata.certificate_number, '');
    assertEquals(result.data.client_details.name, '');
    assertEquals(result.data.test_results.zs, '');
    assertEquals(result.data.additional_notes, '');
  }
});

Deno.test('PME details validate with earth electrode', () => {
  const payload = makeMinimalPayload();
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.pme_details.is_pme, true);
    assertEquals(result.data.pme_details.earth_electrode_installed, true);
    assertEquals(result.data.pme_details.earth_electrode_resistance, '42');
  }
});

Deno.test('Test results nested object validates all fields', () => {
  const payload = makeMinimalPayload();
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.test_results.zs, '0.65');
    assertEquals(result.data.test_results.rcd_trip_time, '18');
    assertEquals(result.data.test_results.rcd_test_button, 'pass');
    assertEquals(result.data.test_results.functional_test, 'pass');
  }
});

Deno.test('Flat copies match nested values', () => {
  const payload = makeMinimalPayload();
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.client_name, result.data.client_details.name);
    assertEquals(result.data.charger_make, result.data.charger_details.make);
    assertEquals(result.data.installer_name, result.data.installer.name);
  }
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = { ...makeMinimalPayload(), custom_field: 'test' };
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).custom_field, 'test');
  }
});

Deno.test('Smart features and DNO notification validate', () => {
  const payload = makeMinimalPayload();
  const result = evChargingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.smart_features.smart_charging_enabled, true);
    assertEquals(result.data.dno_notification.required, false);
  }
});
