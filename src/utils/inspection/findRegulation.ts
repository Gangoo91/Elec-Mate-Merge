import { RegulationData, REGULATIONS_DATABASE } from './regulationDatabase';

/**
 * Find a regulation by its number in the database
 * @param regNumber The regulation number to search for
 * @returns The regulation data if found, undefined otherwise
 */
export function findRegulationByNumber(regNumber: string): RegulationData | undefined {
  return REGULATIONS_DATABASE.find(reg => reg.number === regNumber);
}

/**
 * Find multiple regulations by their numbers
 * @param regNumbers Array of regulation numbers to search for
 * @returns Array of found regulations (may be shorter than input if some not found)
 */
export function findRegulationsByNumbers(regNumbers: string[]): RegulationData[] {
  return regNumbers
    .map(regNumber => findRegulationByNumber(regNumber))
    .filter((reg): reg is RegulationData => reg !== undefined);
}