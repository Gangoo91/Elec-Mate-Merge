import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';

// Check earthing and bonding requirements with ring circuit considerations
export const checkEarthingRequirements = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  // Check CPC size relative to live conductor with enhanced logic
  if (result.liveSize && result.cpcSize) {
    const liveSize = parseFloat(result.liveSize.replace('mm', ''));
    const cpcSizeStr = result.cpcSize.toLowerCase();
    const description = result.circuitDescription?.toLowerCase() || '';
    const wiringType = result.typeOfWiring?.toLowerCase() || '';

    // Special cases where CPC validation differs
    const isSWA =
      wiringType.includes('swa') ||
      wiringType.includes('armoured') ||
      description.includes('swa') ||
      description.includes('armoured');
    const isConduit =
      wiringType.includes('conduit') ||
      wiringType.includes('trunking') ||
      description.includes('conduit') ||
      description.includes('trunking');
    const isRing = description.includes('ring') || result.type?.toLowerCase().includes('ring');

    // SWA cables - armour provides CPC
    if (isSWA && (cpcSizeStr.includes('armour') || cpcSizeStr.includes('armor'))) {
      warnings.push({
        severity: 'info',
        title: 'SWA Armour as CPC',
        fields: ['cpcSize', 'typeOfWiring'],
        description:
          'Cable armour is being used as CPC. Ensure armour continuity is maintained and properly terminated with glands.',
        regulation: 'BS 7671 Regulation 543.2.1',
        suggestion:
          'Verify SWA glands are correctly fitted, armour is continuous, and earthing tags are securely connected.',
      });
      return warnings; // Skip standard CPC sizing check
    }

    // Conduit/trunking as CPC
    if (isConduit && (cpcSizeStr.includes('conduit') || cpcSizeStr.includes('trunking'))) {
      warnings.push({
        severity: 'info',
        title: 'Conduit/Trunking as CPC',
        fields: ['cpcSize', 'typeOfWiring'],
        description:
          'Metal conduit/trunking is being used as CPC. Ensure electrical continuity is maintained throughout.',
        // 543.2.5, not 543.2.6. 543.2.5 is the clause that names this case:
        // "the metal covering including the sheath of a cable … trunking and
        // ducting for electrical purposes and metal conduit, may be used as a
        // protective conductor". 543.2.6 governs an EXTRANEOUS-conductive-part
        // — a pipe or structural steel, something not part of the installation
        // — which is a different thing entirely.
        regulation: 'BS 7671 Regulation 543.2.5',
        suggestion:
          'Verify all conduit joints are mechanically and electrically sound. Test continuity of conduit path.',
      });
      return warnings; // Skip standard CPC sizing check
    }

    const cpcSize = parseFloat(result.cpcSize.replace('mm', ''));

    if (!isNaN(liveSize) && !isNaN(cpcSize)) {
      // Manufactured flat twin-and-earth carries a reduced cpc, which is
      // compliant because 543.1.3 permits the size to be calculated (adiabatic)
      // rather than taken from Table 54.7.
      //
      // This used to be an EXACT match on those pairings, so a cpc *larger*
      // than the standard one failed while the standard one passed — 4.0mm²
      // live with a 2.5mm² cpc was reported as undersized against a Table 54.7
      // minimum of 4.0mm², even though 2.5mm² exceeds the 1.5mm² that a
      // manufactured 4mm² T&E ships with. A bigger protective conductor is
      // never less safe. Now a floor, not an equality.
      const STANDARD_TWIN_EARTH_CPC: Record<number, number> = {
        1.0: 1.0,
        1.5: 1.0,
        2.5: 1.5,
        4.0: 1.5,
        6.0: 2.5,
        10.0: 4.0,
        16.0: 6.0,
      };

      const standardCpc = STANDARD_TWIN_EARTH_CPC[liveSize];
      if (standardCpc !== undefined && cpcSize >= standardCpc) {
        return warnings; // At or above the manufactured T&E cpc — compliant.
      }

      // Ring circuits - special CPC rules (Appendix 15)
      if (isRing) {
        // Ring circuit CPC can be same size as live conductors or calculated
        if (cpcSize >= liveSize) {
          return warnings; // Compliant for ring circuit
        }
        /*
         * A reduced CPC on a ring is normal, not a finding.
         *
         * Flat twin and earth to BS 6004 pairs a smaller CPC with the line
         * conductor by construction — 2.5/1.5 is the ring final of nearly every
         * house in the country. Table 54.7 would demand 2.5; the cable is
         * compliant because 543.1.4 offers the table only as an alternative to
         * calculating (543.1.3), and the adiabatic result permits the smaller
         * CPC. Warning on the standard pairings meant flagging almost every
         * ring ever installed, which teaches an electrician to ignore the
         * column.
         *
         * The previous wording also asked them to "verify (R1+R2) ≤ 1.67Ω".
         * 1.67 is the r2/r1 RATIO for 2.5/1.5 — the CPC being the smaller
         * conductor over the same route. It is not a resistance limit: R1+R2 in
         * ohms depends on the length of the circuit, and no fixed figure can
         * apply. Whether the loop is low enough is the Zs check's job, and that
         * runs separately against Tables 41.2–41.4.
         */
        const STANDARD_TE_PAIRS: Record<string, number> = {
          '1': 1, '1.5': 1, '2.5': 1.5, '4': 1.5, '6': 2.5, '10': 4, '16': 6,
        };
        const expectedCpc = STANDARD_TE_PAIRS[String(liveSize)];
        if (expectedCpc !== undefined && cpcSize >= expectedCpc) {
          return warnings; // standard twin and earth — nothing to say
        }

        warnings.push({
          severity: 'warning',
          title: 'Ring CPC Smaller Than Standard Cable',
          fields: ['cpcSize', 'liveSize'],
          description:
            `A ${result.liveSize} ring is normally run in twin and earth with a ${expectedCpc ?? '—'}mm² CPC, ` +
            `but ${result.cpcSize} is recorded. Table 54.7 would ask for ${liveSize}mm² here; a smaller CPC is ` +
            `permitted where it has been sized by calculation (543.1.3) rather than from the table.`,
          regulation: 'BS 7671 Regulation 543.1.4 & Table 54.7',
          suggestion:
            'Check the CPC size is recorded correctly. If it is right, the adiabatic calculation is what justifies it — record that.',
        });
        return warnings;
      }

      // BS 7671 Table 54.7 - Minimum CPC sizes for single core cables
      let minCpcSize = 0;
      if (liveSize <= 16) {
        minCpcSize = liveSize;
      } else if (liveSize <= 35) {
        minCpcSize = 16;
      } else {
        minCpcSize = liveSize / 2;
      }

      if (cpcSize < minCpcSize) {
        warnings.push({
          /*
           * A warning, not a failure — 543.1.4 offers the table as an
           * ALTERNATIVE, not the only route: "Where it is desired not to
           * calculate the minimum cross-sectional area in accordance with
           * Regulation 543.1.3, the cross-sectional area may be determined in
           * accordance with Table 54.7."
           *
           * So a CPC below the table value is not automatically
           * non-compliant — it may have been sized by the adiabatic equation
           * in 543.1.3, which legitimately permits smaller. Calling that
           * "critical" states a failure the standard does not, on a document
           * an electrician signs. Raise it; let them judge it.
           */
          severity: 'warning',
          title: 'CPC Smaller Than Table 54.7',
          fields: ['cpcSize', 'liveSize'],
          description: `${result.cpcSize} CPC is below the Table 54.7 value of ${minCpcSize}mm² for a ${result.liveSize} live conductor. Table 54.7 is one of two permitted routes — a CPC sized by the adiabatic equation (543.1.3) may legitimately be smaller.`,
          regulation: 'BS 7671 Regulation 543.1.4 & Table 54.7',
          suggestion: `If the CPC was not sized by calculation, Table 54.7 gives ${minCpcSize}mm² here. If it was, record the adiabatic result so the smaller size is evidenced.`,
        });
      }
    }
  }

  return warnings;
};
