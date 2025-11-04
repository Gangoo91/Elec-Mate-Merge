/**
 * Seed Design Knowledge Table
 * Populates critical BS 7671 calculation formulas
 */

export async function seedDesignKnowledge(supabase: any, logger?: any) {
  try {
    // Delete corrupt entries
    await supabase.from('design_knowledge').delete().ilike('topic', 'Section at line%');
    
    const entries = [
      {
        topic: 'Voltage Drop Calculation - BS 7671 Appendix 4',
        content: `VOLTAGE DROP CALCULATION METHOD:

Formula: Vd (volts) = (mV/A/m × Ib × L) / 1000

Where:
- mV/A/m = voltage drop per amp per metre (from Appendix 4 tables)
- Ib = design current in amps
- L = cable length in metres

Example: 10A load, 20m cable, 2.5mm² T&E (mV/A/m = 18)
Vd = (18 × 10 × 20) / 1000 = 3.6V
% = (3.6 / 230) × 100 = 1.57% ✓ (within 3% limit)

LIMITS (BS 7671 Reg 525):
- Lighting circuits: 3% maximum (6.9V on 230V)
- Other uses: 5% maximum (11.5V on 230V)

APPENDIX 4 TABLE (mV/A/m for 70°C thermoplastic insulated cables):
1.0mm² = 44, 1.5mm² = 29, 2.5mm² = 18, 4mm² = 11, 6mm² = 7.3
10mm² = 4.4, 16mm² = 2.8, 25mm² = 1.75, 35mm² = 1.25, 50mm² = 0.93`,
        source: 'bs7671_calculations',
        metadata: { tags: ['voltage drop', 'appendix 4', 'mV/A/m', 'cable sizing'] }
      },
      {
        topic: 'Earth Fault Loop Impedance (Zs) Calculation',
        content: `EARTH FAULT LOOP IMPEDANCE:

Formula: Zs = Ze + (R1 + R2)

Where:
- Ze = external earth fault loop impedance (from DNO/measurement)
- R1 = resistance of line conductor
- R2 = resistance of CPC (protective conductor)

Calculating R1+R2:
R1+R2 = [(r1 + r2) × L / 1000] × 1.2

Where:
- r1, r2 = conductor resistances in mΩ/m at 20°C (Table 54.7)
- L = cable length in metres
- 1.2 = temperature correction factor for 70°C operation

Example: Ze=0.35Ω, 20m run, 2.5mm² live + 1.5mm² CPC
From Table 54.7:
- 2.5mm² = 7.41 mΩ/m at 20°C
- 1.5mm² = 12.10 mΩ/m at 20°C

(R1+R2) = [(7.41 + 12.10) × 20 / 1000] × 1.2 = 0.468Ω
Zs = 0.35 + 0.468 = 0.818Ω

Max Zs for Type B 32A MCB = 1.37Ω (Appendix 3)
0.818Ω < 1.37Ω ✓ COMPLIANT

TABLE 54.7 CONDUCTOR RESISTANCE (mΩ/m at 20°C):
1.0mm² = 18.1, 1.5mm² = 12.1, 2.5mm² = 7.41, 4mm² = 4.61, 6mm² = 3.08
10mm² = 1.83, 16mm² = 1.15, 25mm² = 0.727`,
        source: 'bs7671_calculations',
        metadata: { tags: ['zs', 'earth fault', 'r1+r2', 'impedance', 'table 54.7'] }
      },
      {
        topic: 'Ring Final Circuit Calculation - Appendix 15',
        content: `RING FINAL CIRCUITS (BS 7671 433.1.204):

REQUIREMENTS:
- MUST use 2.5mm² cable - no exceptions
- 32A MCB protection maximum
- Floor area served ≤ 100m²

CALCULATION METHOD:
For ring circuits, current splits two ways (parallel paths)
Effective resistance = actual resistance ÷ 4

Example: 100m ring perimeter (50m each leg), 20A load

Voltage Drop:
- Use cable length = perimeter ÷ 2 = 50m
- But effective resistance is ÷4
- VD = (mV/A/m × Ib × L/2) / 1000
- VD = (18 × 20 × 50) / 1000 = 18V BUT ÷2 for ring = 9V

Earth Fault:
- R1+R2 for one leg, then ÷4 for ring effect
- Example: One leg = 0.47Ω, Ring = 0.47 ÷ 4 = 0.12Ω

CONVERSION TO RADIAL:
If voltage drop exceeds limit:
- Convert to radial circuit
- Use larger cable (4mm² or 6mm²)
- Reduce protection rating if needed`,
        source: 'bs7671_calculations',
        metadata: { tags: ['ring final', 'appendix 15', 'socket circuits', '2.5mm²'] }
      }
    ];
    
    // Insert entries
    for (const entry of entries) {
      const { error } = await supabase
        .from('design_knowledge')
        .upsert(entry, { onConflict: 'topic' });
      
      if (error) {
        logger?.warn('Failed to insert design knowledge entry', { topic: entry.topic, error });
      } else {
        logger?.info('✅ Seeded design knowledge', { topic: entry.topic });
      }
    }
    
    logger?.info('✅ Design knowledge seeding complete');
    return true;
  } catch (error) {
    logger?.error('Failed to seed design knowledge', { error });
    return false;
  }
}
