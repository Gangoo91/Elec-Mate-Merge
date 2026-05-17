/**
 * Single source of truth: payload path → AcroForm field name.
 *
 * If a field is missing on the template, fill is a no-op (logged).
 * If a payload path resolves to undefined, the form shows blank — visibly empty,
 * never silently dropped. That's the whole point vs JSON→template string mapping.
 *
 * Field types:
 *   - text:     single-line text field
 *   - textarea: multi-line text field (taller box)
 *   - check:    boolean checkbox
 */

export const SECTIONS = [
  {
    title: 'Certificate metadata',
    fields: [
      { pdf: 'certificate_number', path: 'certificate_number', type: 'text', label: 'Certificate No' },
      { pdf: 'work_date', path: 'work_date', type: 'text', label: 'Work date' },
      { pdf: 'date_of_completion', path: 'date_of_completion', type: 'text', label: 'Completion date' },
      { pdf: 'next_inspection_due', path: 'next_inspection_due', type: 'text', label: 'Next inspection due' },
    ],
  },
  {
    title: 'Company',
    fields: [
      { pdf: 'company_name', path: 'company.name', type: 'text', label: 'Company name' },
      { pdf: 'company_phone', path: 'company.phone', type: 'text', label: 'Phone' },
      { pdf: 'company_email', path: 'company.email', type: 'text', label: 'Email' },
      { pdf: 'company_address', path: 'company.address', type: 'textarea', label: 'Address' },
      { pdf: 'company_registration_no', path: 'company.registration_no', type: 'text', label: 'Scheme reg. no' },
      { pdf: 'company_tagline', path: 'company.tagline', type: 'text', label: 'Tagline' },
      { pdf: 'company_website', path: 'company.website', type: 'text', label: 'Website' },
    ],
  },
  {
    title: 'Client',
    fields: [
      { pdf: 'client_name', path: 'client.name', type: 'text', label: 'Client name' },
      { pdf: 'client_phone', path: 'client.phone', type: 'text', label: 'Phone' },
      { pdf: 'client_email', path: 'client.email', type: 'text', label: 'Email' },
      { pdf: 'person_ordering_work', path: 'person_ordering_work', type: 'text', label: 'Person ordering work' },
    ],
  },
  {
    title: 'Installation address',
    fields: [
      { pdf: 'installation_address', path: 'installation.address', type: 'textarea', label: 'Address' },
      { pdf: 'installation_postcode', path: 'installation.postcode', type: 'text', label: 'Postcode' },
    ],
  },
  {
    title: 'Work details',
    fields: [
      { pdf: 'work_type', path: 'work_type', type: 'text', label: 'Work type' },
      { pdf: 'work_location', path: 'work_location', type: 'text', label: 'Location' },
      { pdf: 'work_description', path: 'work_description', type: 'textarea', label: 'Description' },
      { pdf: 'departures', path: 'departures', type: 'text', label: 'Departures from BS 7671' },
      { pdf: 'permitted_exceptions', path: 'permitted_exceptions', type: 'text', label: 'Permitted exceptions' },
      { pdf: 'risk_assessment_attached', path: 'risk_assessment_attached', type: 'check', label: 'Risk assessment attached' },
      { pdf: 'existing_installation_comments', path: 'existing_installation_comments', type: 'textarea', label: 'Comments on existing installation' },
    ],
  },
  {
    title: 'Supply',
    fields: [
      { pdf: 'supply_voltage', path: 'supply.voltage', type: 'text', label: 'Voltage (V)' },
      { pdf: 'supply_frequency', path: 'supply.frequency', type: 'text', label: 'Frequency (Hz)' },
      { pdf: 'supply_phases', path: 'supply.phases', type: 'text', label: 'Phases' },
    ],
  },
  {
    title: 'Earthing',
    fields: [
      { pdf: 'earthing_type', path: 'earthing.type', type: 'text', label: 'Earthing type' },
      { pdf: 'earthing_zdb', path: 'earthing.zdb', type: 'text', label: 'Zdb (ohms)' },
      { pdf: 'earthing_conductor_present', path: 'earthing.conductor_present', type: 'check', label: 'Earthing conductor present' },
      { pdf: 'earthing_conductor_size', path: 'earthing.conductor_size', type: 'text', label: 'Conductor size (mm2)' },
      { pdf: 'earthing_conductor_material', path: 'earthing.conductor_material', type: 'text', label: 'Conductor material' },
    ],
  },
  {
    title: 'Bonding',
    fields: [
      { pdf: 'bonding_size', path: 'bonding.size', type: 'text', label: 'Main bonding size (mm2)' },
      { pdf: 'bonding_water', path: 'bonding.water', type: 'check', label: 'Water' },
      { pdf: 'bonding_water_size', path: 'bonding.water_size', type: 'text', label: 'Water size' },
      { pdf: 'bonding_gas', path: 'bonding.gas', type: 'check', label: 'Gas' },
      { pdf: 'bonding_gas_size', path: 'bonding.gas_size', type: 'text', label: 'Gas size' },
      { pdf: 'bonding_oil', path: 'bonding.oil', type: 'check', label: 'Oil' },
      { pdf: 'bonding_oil_size', path: 'bonding.oil_size', type: 'text', label: 'Oil size' },
      { pdf: 'bonding_structural', path: 'bonding.structural', type: 'check', label: 'Structural' },
      { pdf: 'bonding_structural_size', path: 'bonding.structural_size', type: 'text', label: 'Structural size' },
      { pdf: 'bonding_other', path: 'bonding.other', type: 'check', label: 'Other' },
      { pdf: 'bonding_other_specify', path: 'bonding.other_specify', type: 'text', label: 'Other (specify)' },
    ],
  },
  {
    title: 'Circuit',
    fields: [
      { pdf: 'circuit_db_ref', path: 'circuit.db_ref', type: 'text', label: 'DB ref' },
      { pdf: 'circuit_db_location_type', path: 'circuit.db_location_type', type: 'text', label: 'DB location/type' },
      { pdf: 'circuit_number', path: 'circuit.number', type: 'text', label: 'Circuit no' },
      { pdf: 'circuit_description', path: 'circuit.description', type: 'text', label: 'Description' },
      { pdf: 'circuit_type', path: 'circuit.type', type: 'text', label: 'Type' },
      { pdf: 'circuit_reference_method', path: 'circuit.reference_method', type: 'text', label: 'Ref method' },
      { pdf: 'circuit_number_of_conductors', path: 'circuit.number_of_conductors', type: 'text', label: '# conductors' },
      { pdf: 'circuit_live_size', path: 'circuit.live_size', type: 'text', label: 'Live (mm2)' },
      { pdf: 'circuit_cpc_size', path: 'circuit.cpc_size', type: 'text', label: 'CPC (mm2)' },
      { pdf: 'circuit_cable_type', path: 'circuit.cable_type', type: 'text', label: 'Cable type' },
      { pdf: 'circuit_installation_method', path: 'circuit.installation_method', type: 'text', label: 'Install method' },
      { pdf: 'circuit_ocpd_bs_en', path: 'circuit.ocpd.bs_en', type: 'text', label: 'OCPD BS EN' },
      { pdf: 'circuit_ocpd_type', path: 'circuit.ocpd.type', type: 'text', label: 'OCPD type' },
      { pdf: 'circuit_ocpd_rating', path: 'circuit.ocpd.rating', type: 'text', label: 'OCPD rating (A)' },
      { pdf: 'circuit_ocpd_breaking_capacity', path: 'circuit.ocpd.breaking_capacity', type: 'text', label: 'OCPD kA' },
      { pdf: 'circuit_protection_rcd', path: 'circuit.protection.rcd', type: 'check', label: 'RCD' },
      { pdf: 'circuit_protection_rcbo', path: 'circuit.protection.rcbo', type: 'check', label: 'RCBO' },
      { pdf: 'circuit_protection_afdd', path: 'circuit.protection.afdd', type: 'check', label: 'AFDD' },
      { pdf: 'circuit_protection_spd', path: 'circuit.protection.spd', type: 'check', label: 'SPD' },
      { pdf: 'circuit_rcd_bs_en', path: 'circuit.rcd.bs_en', type: 'text', label: 'RCD BS EN' },
      { pdf: 'circuit_rcd_type', path: 'circuit.rcd.type', type: 'text', label: 'RCD type' },
      { pdf: 'circuit_rcd_rating', path: 'circuit.rcd.rating', type: 'text', label: 'RCD rating' },
      { pdf: 'circuit_rcd_idn', path: 'circuit.rcd.idn', type: 'text', label: 'RCD I-dn' },
      { pdf: 'circuit_afdd_bs_en', path: 'circuit.afdd.bs_en', type: 'text', label: 'AFDD BS EN' },
      { pdf: 'circuit_afdd_rating', path: 'circuit.afdd.rating', type: 'text', label: 'AFDD rating' },
      { pdf: 'circuit_spd_bs_en', path: 'circuit.spd.bs_en', type: 'text', label: 'SPD BS EN' },
      { pdf: 'circuit_spd_type', path: 'circuit.spd.type', type: 'text', label: 'SPD type' },
      { pdf: 'circuit_spd_make', path: 'circuit.spd.make', type: 'text', label: 'SPD make' },
      { pdf: 'circuit_spd_rated_ka', path: 'circuit.spd.rated_ka', type: 'text', label: 'SPD kA' },
    ],
  },
  {
    title: 'Test results',
    fields: [
      { pdf: 'tests_r1_r2', path: 'tests.r1_r2', type: 'text', label: 'R1+R2 (ohms)' },
      { pdf: 'tests_r2', path: 'tests.r2', type: 'text', label: 'R2 (ohms)' },
      { pdf: 'tests_ring_r1_end', path: 'tests.ring_r1_end', type: 'text', label: 'Ring R1 end-to-end' },
      { pdf: 'tests_ring_rn_end', path: 'tests.ring_rn_end', type: 'text', label: 'Ring Rn end-to-end' },
      { pdf: 'tests_ring_r2_end', path: 'tests.ring_r2_end', type: 'text', label: 'Ring R2 end-to-end' },
      { pdf: 'tests_ring_r1_cross', path: 'tests.ring_r1_cross', type: 'text', label: 'Ring R1 cross' },
      { pdf: 'tests_ring_rn_cross', path: 'tests.ring_rn_cross', type: 'text', label: 'Ring Rn cross' },
      { pdf: 'tests_ring_r2_cross', path: 'tests.ring_r2_cross', type: 'text', label: 'Ring R2 cross' },
      { pdf: 'tests_ring_final', path: 'tests.ring_final', type: 'text', label: 'Ring final continuity' },
      { pdf: 'tests_insulation_voltage', path: 'tests.insulation_voltage', type: 'text', label: 'IR voltage (V)' },
      { pdf: 'tests_ir_live_live', path: 'tests.ir_live_live', type: 'text', label: 'IR L-L (Mohm)' },
      { pdf: 'tests_ir_live_neutral', path: 'tests.ir_live_neutral', type: 'text', label: 'IR L-N (Mohm)' },
      { pdf: 'tests_ir_live_earth', path: 'tests.ir_live_earth', type: 'text', label: 'IR L-E (Mohm)' },
      { pdf: 'tests_ir_neutral_earth', path: 'tests.ir_neutral_earth', type: 'text', label: 'IR N-E (Mohm)' },
      { pdf: 'tests_polarity', path: 'tests.polarity', type: 'text', label: 'Polarity' },
      { pdf: 'tests_zs', path: 'tests.zs', type: 'text', label: 'Zs (ohms)' },
      { pdf: 'tests_max_zs', path: 'tests.max_zs', type: 'text', label: 'Max permitted Zs (ohms)' },
      { pdf: 'tests_pfc', path: 'tests.pfc', type: 'text', label: 'PFC (kA)' },
      { pdf: 'tests_rcd_time', path: 'tests.rcd_time', type: 'text', label: 'RCD 1× (ms)' },
      { pdf: 'tests_rcd_5x_time', path: 'tests.rcd_5x_time', type: 'text', label: 'RCD 5× (ms)' },
      { pdf: 'tests_rcd_half_x', path: 'tests.rcd_half_x', type: 'text', label: 'RCD ½×' },
      { pdf: 'tests_rcd_test_button', path: 'tests.rcd_test_button', type: 'text', label: 'RCD test button' },
      { pdf: 'tests_rcd_rating', path: 'tests.rcd_rating', type: 'text', label: 'RCD rating (mA)' },
      { pdf: 'tests_functional_test', path: 'tests.functional_test', type: 'text', label: 'Functional test' },
      { pdf: 'tests_afdd_test_button', path: 'tests.afdd_test_button', type: 'text', label: 'AFDD test button' },
      { pdf: 'tests_afdd_trip_time', path: 'tests.afdd_trip_time', type: 'text', label: 'AFDD trip time' },
      { pdf: 'tests_rcbo_trip_time', path: 'tests.rcbo_trip_time', type: 'text', label: 'RCBO trip time' },
      { pdf: 'tests_earth_electrode', path: 'tests.earth_electrode', type: 'text', label: 'Earth electrode (ohms)' },
      { pdf: 'tests_phase_rotation', path: 'tests.phase_rotation', type: 'text', label: 'Phase rotation' },
      { pdf: 'tests_spd_visual', path: 'tests.spd_visual', type: 'text', label: 'SPD visual' },
      { pdf: 'tests_spd_indicator', path: 'tests.spd_indicator', type: 'text', label: 'SPD indicator' },
      { pdf: 'tests_spd_test_button', path: 'tests.spd_test_button', type: 'check', label: 'SPD test button' },
      { pdf: 'tests_temperature', path: 'tests.temperature', type: 'text', label: 'Temp (degC)' },
    ],
  },
  {
    title: 'Test equipment',
    fields: [
      { pdf: 'test_equipment_model', path: 'test_equipment.model', type: 'text', label: 'Model' },
      { pdf: 'test_equipment_serial', path: 'test_equipment.serial', type: 'text', label: 'Serial' },
      { pdf: 'test_equipment_calibration_date', path: 'test_equipment.calibration_date', type: 'text', label: 'Calibration date' },
      { pdf: 'test_equipment_custom', path: 'test_equipment.custom', type: 'text', label: 'Custom' },
    ],
  },
  {
    title: 'Declaration',
    fields: [
      { pdf: 'declaration_name', path: 'declaration.name', type: 'text', label: 'Electrician name' },
      { pdf: 'declaration_company', path: 'declaration.company', type: 'text', label: 'For and on behalf of' },
      { pdf: 'declaration_address', path: 'declaration.address', type: 'textarea', label: 'Address' },
      { pdf: 'declaration_phone', path: 'declaration.phone', type: 'text', label: 'Phone' },
      { pdf: 'declaration_email', path: 'declaration.email', type: 'text', label: 'Email' },
      { pdf: 'declaration_position', path: 'declaration.position', type: 'text', label: 'Position' },
      { pdf: 'declaration_date', path: 'declaration.date', type: 'text', label: 'Date' },
      { pdf: 'declaration_qualification', path: 'declaration.qualification', type: 'text', label: 'Qualification' },
      { pdf: 'declaration_scheme_provider', path: 'declaration.scheme_provider', type: 'text', label: 'Scheme provider' },
      { pdf: 'declaration_registration_number', path: 'declaration.registration_number', type: 'text', label: 'Registration no' },
      { pdf: 'declaration_bs7671_compliance', path: 'declaration.bs7671_compliance', type: 'check', label: 'BS 7671 compliance' },
      { pdf: 'declaration_test_results_accurate', path: 'declaration.test_results_accurate', type: 'check', label: 'Test results accurate' },
      { pdf: 'declaration_work_safety', path: 'declaration.work_safety', type: 'check', label: 'Work safety' },
      { pdf: 'declaration_part_p_notification', path: 'declaration.part_p_notification', type: 'check', label: 'Part P notification' },
      { pdf: 'declaration_copy_provided', path: 'declaration.copy_provided', type: 'check', label: 'Copy provided to client' },
      { pdf: 'declaration_additional_notes', path: 'declaration.additional_notes', type: 'textarea', label: 'Additional notes' },
    ],
  },
];

export const ALL_FIELDS = SECTIONS.flatMap((s) =>
  s.fields.map((f) => ({ ...f, section: s.title }))
);

export function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}
