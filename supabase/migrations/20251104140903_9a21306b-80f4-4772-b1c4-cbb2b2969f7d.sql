-- PHASE 1: Schema changes only

-- Create materialized view for fast calculation lookup
CREATE MATERIALIZED VIEW IF NOT EXISTS circuit_design_calculations AS
SELECT 
  'voltage_drop' as calculation_type,
  'Vd = (mV/A/m × Ib × L) / 1000' as formula,
  'Appendix 4, Reg 525' as regulation,
  jsonb_build_object(
    'limits', jsonb_build_object('lighting', 3, 'other', 5),
    'example', 'For 2.5mm² T&E: mV/A/m = 18',
    'mvam_table', jsonb_build_object(
      '1.0', 44, '1.5', 29, '2.5', 18, '4.0', 11, '6.0', 7.3,
      '10', 4.4, '16', 2.8, '25', 1.75, '35', 1.25, '50', 0.93,
      '70', 0.65, '95', 0.47, '120', 0.37, '150', 0.30,
      '185', 0.24, '240', 0.185, '300', 0.148
    )
  ) as metadata
UNION ALL
SELECT
  'zs_calculation',
  'Zs = Ze + (R1+R2) where R1+R2 = (r1 + r2) × L × 1.2',
  'Table 54.7, Reg 411.3.2',
  jsonb_build_object(
    'temperature_factor', 1.2,
    'example', '2.5mm²=7.41mΩ/m, 1.5mm²=12.10mΩ/m',
    'resistance_20c', jsonb_build_object(
      '1.0', 18.1, '1.5', 12.1, '2.5', 7.41, '4.0', 4.61, '6.0', 3.08,
      '10', 1.83, '16', 1.15, '25', 0.727, '35', 0.524, '50', 0.387,
      '70', 0.268, '95', 0.193, '120', 0.153, '150', 0.124,
      '185', 0.0991, '240', 0.0754, '300', 0.0601
    )
  )
UNION ALL
SELECT
  'max_zs_table',
  'Maximum Zs for disconnection in 0.4s (final circuits)',
  'Appendix 3',
  jsonb_build_object(
    'type_b', jsonb_build_object('6', 7.28, '10', 4.37, '16', 2.73, '20', 2.19, '25', 1.75, '32', 1.37, '40', 1.09, '50', 0.87, '63', 0.69),
    'type_c', jsonb_build_object('6', 3.64, '10', 2.19, '16', 1.37, '20', 1.09, '25', 0.87, '32', 0.69, '40', 0.55, '50', 0.44, '63', 0.35),
    'type_d', jsonb_build_object('6', 1.82, '10', 1.09, '16', 0.69, '20', 0.55, '25', 0.44, '32', 0.34, '40', 0.27, '50', 0.22, '63', 0.17)
  )
UNION ALL
SELECT
  'ring_final',
  'Effective CSA = cable CSA, R1+R2 ÷ 4 (parallel paths)',
  'Appendix 15, Reg 433.1.204',
  jsonb_build_object(
    'max_cable', 2.5,
    'max_protection', 32,
    'rule', 'If VD exceeds limit, convert to radial'
  );

CREATE INDEX IF NOT EXISTS idx_calc_type ON circuit_design_calculations(calculation_type);