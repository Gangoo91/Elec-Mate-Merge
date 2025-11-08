-- Seed Core Calculations
INSERT INTO circuit_design_calculations (circuit_type, calculation_name, formula, worked_example, table_data, regulation_reference, notes) VALUES
('general', 'voltage_drop_formula', '(mV/A/m × Ib × L) / 1000', 
  '{"scenario": "32A socket, 30m run, 2.5mm² cable", "calculation": "(18 × 32 × 30) / 1000 = 17.28V", "result": "3.01% drop at 230V - Compliant (≤5%)"}'::jsonb,
  '{"appendix4_2.5mm": {"single_phase": 18, "three_phase": 15}, "appendix4_4mm": {"single_phase": 11, "three_phase": 9.5}}'::jsonb,
  'BS 7671 Appendix 4, Reg 525',
  'Voltage drop limit: 5% for power circuits, 3% for lighting'),

('socket', 'ring_final_divide_by_4', 'Effective cable length = Actual length ÷ 4', 
  '{"scenario": "40m ring final circuit", "calculation": "40m ÷ 4 = 10m effective length", "result": "Use 10m for voltage drop calculation"}'::jsonb,
  null,
  'BS 7671 Appendix 15',
  'Ring finals have parallel paths, reducing effective resistance'),

('general', 'earth_fault_loop', 'Zs = Ze + (R1 + R2)', 
  '{"scenario": "TN-C-S supply Ze=0.35Ω, 30m of 2.5mm²+1.5mm CPC", "calculation": "Zs = 0.35 + (30 × 0.0074 + 30 × 0.0124) = 0.944Ω", "result": "Compliant for 32A Type B MCB (Zs max 1.37Ω)"}'::jsonb,
  '{"table_54.7_2.5mm_1.5cpc": {"r1_plus_r2_per_m": 0.0198}, "max_zs_type_b": {"6A": 7.28, "10A": 4.37, "16A": 2.73, "20A": 2.19, "32A": 1.37, "40A": 1.09, "50A": 0.87}}'::jsonb,
  'BS 7671 Table 54.7, Reg 411.4.4',
  'Earth fault loop impedance must be low enough to disconnect in 0.4s'),

('socket', 'socket_diversity', 'Total demand = Sum of socket circuits with diversity applied', 
  '{"scenario": "4 × 32A socket circuits", "calculation": "100% + 40% + 30% + 30% = 200% of one circuit", "result": "Effective demand: 64A not 128A"}'::jsonb,
  '{"bs7671_appendix_b": {"first_socket": 100, "second_socket": 40, "third_plus": 30}}'::jsonb,
  'BS 7671 Appendix B',
  'Diversity reduces required main switch/RCD rating'),

('shower', 'shower_cable_sizing', 'Cable must handle full load (no diversity)', 
  '{"scenario": "9.5kW shower at 230V", "calculation": "Ib = 9500 ÷ 230 = 41.3A, select 10mm² cable (57A)", "result": "10mm² T&E, 45A MCB, 32mA RCD (bathroom)"}'::jsonb,
  '{"current_capacity_reference_method_c": {"6mm": 46, "10mm": 64, "16mm": 85}}'::jsonb,
  'BS 7671 Section 701 (Bathrooms)',
  'High-current appliances need dedicated circuits'),

('cooker', 'cooker_diversity', 'First 10A + 30% remainder + 5A if socket', 
  '{"scenario": "11kW cooker (47.8A rating)", "calculation": "10A + (37.8A × 0.3) + 5A socket = 26.3A, select 32A", "result": "6mm² cable, 32A MCB"}'::jsonb,
  null,
  'BS 7671 Appendix B, Reg 553.1.5',
  'Cooker diversity reduces required cable size'),

('ev_charger', 'ev_charger_requirements', 'Mode 3 charger: dedicated circuit, RCD Type A/B, outdoor-rated cable', 
  '{"scenario": "7.2kW Mode 3 EV charger", "calculation": "Ib = 7200 ÷ 230 = 31.3A, select 32A", "result": "6mm² SWA buried cable, 40A Type B RCBO"}'::jsonb,
  '{"rcd_types": {"type_a": "AC + pulsating DC", "type_b": "AC + DC (required for EV)"}}'::jsonb,
  'BS 7671 Section 722, IET Code of Practice',
  'EV chargers require DC fault protection (Type B RCD)'),

('lighting', 'lighting_voltage_drop', 'Lighting circuits: 3% voltage drop limit (not 5%)', 
  '{"scenario": "12 × 50W LED lights, 40m run, 1.5mm²", "calculation": "Ib = 600W ÷ 230V = 2.6A, Drop = (29 × 2.6 × 40) / 1000 = 3.02V", "result": "1.31% drop - Compliant (≤3%)"}'::jsonb,
  '{"appendix4_1.5mm": {"single_phase": 29}}'::jsonb,
  'BS 7671 Appendix 4',
  'Stricter voltage drop for lighting to prevent flickering')

ON CONFLICT DO NOTHING;