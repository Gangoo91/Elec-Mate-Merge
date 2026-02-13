/**
 * parseEvidencedACs
 *
 * Single source of truth for extracting AC references from portfolio
 * entry `assessmentCriteria` arrays. Returns a Set of normalised AC
 * refs in "unitCode.acCode" format that can be matched against
 * qualification_requirements rows.
 *
 * Supported formats (all found in production data):
 *
 * | Format                            | Example                                  | Extracts             |
 * |-----------------------------------|------------------------------------------|----------------------|
 * | unitCode AC acCode                | "315 AC 6.5"                             | 315.6.5              |
 * | unitCode AC acCode: description   | "204 AC 3.5: Terminate wiring systems"   | 204.3.5              |
 * | qualCode (unitCode) AC acCode     | "ELTP04 (315) AC 6.3"                    | ELTP04.6.3 + 315.6.3 |
 * | qualCode (Unit unitCode) AC acCode| "ELTK06 (Unit 607) AC 3.1"              | ELTK06.3.1 + 607.3.1 |
 * | unitCode.acCode (dot format)      | "301.2.3"                                | 301.2.3              |
 * | Free text (no AC keyword)         | "specify the arrangements..."            | skip                 |
 */

interface PortfolioEntry {
  assessmentCriteria?: string[];
}

export function parseEvidencedACs(entries: PortfolioEntry[]): Set<string> {
  const set = new Set<string>();

  for (const pe of entries) {
    for (const ac of pe.assessmentCriteria || []) {
      // 1. Direct dot-format: "301.2.3" — already normalised
      const dotMatch = ac.match(/^(\d+(?:\.\d+)+)$/);
      if (dotMatch) {
        set.add(dotMatch[1]);
        continue;
      }

      // 2. AC keyword formats — extract only numeric AC code (stops before colon/description)
      const acMatch = ac.match(/\bAC\s+(\d+(?:\.\d+)*)/);
      if (!acMatch) continue;
      const acCode = acMatch[1];

      // 2a. Primary unit code (first token)
      const primaryUnit = ac.match(/^(\S+)/)?.[1];
      if (primaryUnit) {
        set.add(`${primaryUnit}.${acCode}`);
      }

      // 2b. Parenthetical unit code: "(Unit 315)" or "(315)"
      const parenUnit = ac.match(/\((?:Unit\s+)?(\S+?)\)/i);
      if (parenUnit) {
        set.add(`${parenUnit[1]}.${acCode}`);
      }
    }
  }

  return set;
}
