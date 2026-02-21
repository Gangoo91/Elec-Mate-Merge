import type { RoomType } from '@/types/siteVisit';
import { ROOM_TYPES } from '@/data/siteVisit/roomTypes';

/**
 * Alias map: maps natural language room names to RoomType values.
 * Lowercase keys. Checked before fuzzy matching.
 */
const ALIASES: Record<string, RoomType> = {
  kitchen: 'kitchen',
  'the kitchen': 'kitchen',
  lounge: 'living_room',
  'the lounge': 'living_room',
  'living room': 'living_room',
  'front room': 'living_room',
  'sitting room': 'living_room',
  'dining room': 'dining_room',
  'master bedroom': 'bedroom_1',
  'bedroom 1': 'bedroom_1',
  'bedroom one': 'bedroom_1',
  'main bedroom': 'bedroom_1',
  'bedroom 2': 'bedroom_2',
  'bedroom two': 'bedroom_2',
  'spare bedroom': 'bedroom_2',
  'bedroom 3': 'bedroom_3',
  'bedroom three': 'bedroom_3',
  'bedroom 4': 'bedroom_4',
  'bedroom four': 'bedroom_4',
  bathroom: 'bathroom',
  'the bathroom': 'bathroom',
  'main bathroom': 'bathroom',
  'family bathroom': 'bathroom',
  'en suite': 'en_suite',
  ensuite: 'en_suite',
  'en-suite': 'en_suite',
  hallway: 'hallway',
  'the hallway': 'hallway',
  hall: 'hallway',
  entrance: 'hallway',
  landing: 'landing',
  'the landing': 'landing',
  'upstairs landing': 'landing',
  loft: 'loft',
  attic: 'loft',
  'the loft': 'loft',
  garage: 'garage',
  'the garage': 'garage',
  garden: 'garden_external',
  external: 'garden_external',
  outside: 'garden_external',
  utility: 'utility',
  'utility room': 'utility',
  study: 'study_office',
  office: 'study_office',
  'home office': 'study_office',
  conservatory: 'conservatory',
  // Commercial
  'office space': 'office_space',
  'open plan office': 'open_plan',
  'open plan': 'open_plan',
  'server room': 'server_room',
  'comms room': 'server_room',
  'data room': 'server_room',
  'plant room': 'plant_room',
  'boiler room': 'plant_room',
  warehouse: 'warehouse',
  'loading bay': 'loading_bay',
  'retail floor': 'retail_floor',
  'shop floor': 'retail_floor',
  reception: 'reception',
  'front desk': 'reception',
  toilets: 'commercial_toilets',
  washrooms: 'commercial_toilets',
  'break room': 'break_room',
  'staff room': 'break_room',
  canteen: 'break_room',
  'board room': 'board_room',
  boardroom: 'board_room',
  'meeting room': 'board_room',
  corridor: 'corridor',
  'the corridor': 'corridor',
  stairwell: 'stairwell',
  stairs: 'stairwell',
  'lift shaft': 'lift_shaft',
  'elevator shaft': 'lift_shaft',
  'car park': 'car_park',
  parking: 'car_park',
  roof: 'roof',
  rooftop: 'roof',
  // Industrial
  'factory floor': 'factory_floor',
  'production area': 'factory_floor',
  'clean room': 'clean_room',
  cleanroom: 'clean_room',
  'hazardous area': 'hazardous_area',
  'hazardous zone': 'hazardous_area',
  'control room': 'control_room',
  'compressor room': 'compressor_room',
  'switch room': 'switch_room',
  'db room': 'switch_room',
  'switchgear room': 'switch_room',
  'transformer room': 'transformer_room',
  substation: 'transformer_room',
  'loading dock': 'loading_dock',
  'cold store': 'cold_store',
  'cold room': 'cold_store',
  'freezer room': 'cold_store',
  workshop: 'workshop',
  'the workshop': 'workshop',
  'welding bay': 'welding_bay',
  other: 'custom',
};

/**
 * Simple Levenshtein distance for fuzzy matching.
 */
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) matrix[i] = [i];
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return matrix[a.length][b.length];
}

/**
 * Maps a natural language room name to a RoomType.
 * Returns the room type and the canonical label for it.
 * Falls back to 'custom' if no good match is found.
 */
export function mapRoomName(input: string): { roomType: RoomType; label: string } {
  const normalised = input
    .trim()
    .toLowerCase()
    .replace(/^the\s+/, '');

  // Exact alias match (with and without "the")
  if (ALIASES[input.trim().toLowerCase()]) {
    const rt = ALIASES[input.trim().toLowerCase()];
    const def = ROOM_TYPES.find((r) => r.type === rt);
    return { roomType: rt, label: def?.label ?? input.trim() };
  }
  if (ALIASES[normalised]) {
    const rt = ALIASES[normalised];
    const def = ROOM_TYPES.find((r) => r.type === rt);
    return { roomType: rt, label: def?.label ?? input.trim() };
  }

  // Fuzzy match against ROOM_TYPES labels
  let bestType: RoomType = 'custom';
  let bestLabel = input.trim();
  let bestDist = Infinity;

  for (const rt of ROOM_TYPES) {
    if (rt.type === 'custom') continue;
    const label = rt.label.toLowerCase();
    const dist = levenshtein(normalised, label);
    // Accept if distance is ≤ 3 and better than current best
    if (dist < bestDist && dist <= 3) {
      bestDist = dist;
      bestType = rt.type;
      bestLabel = rt.label;
    }
  }

  // Also check if the input contains a known label
  if (bestType === 'custom') {
    for (const rt of ROOM_TYPES) {
      if (rt.type === 'custom') continue;
      if (
        normalised.includes(rt.label.toLowerCase()) ||
        rt.label.toLowerCase().includes(normalised)
      ) {
        return { roomType: rt.type, label: rt.label };
      }
    }
  }

  return { roomType: bestType, label: bestLabel };
}
