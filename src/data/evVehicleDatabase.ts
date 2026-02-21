/**
 * UK EV Vehicle Database 2025/2026
 *
 * Popular electric vehicles sold in the UK with charging specs.
 * Used for auto-filling vehicle details on EV charging certificates.
 */

export interface EVVehicle {
  make: string;
  model: string;
  connectorType: 'Type 1' | 'Type 2' | 'CCS' | 'CHAdeMO';
  maxACChargingKW: number;
  maxDCChargingKW?: number;
}

export const EV_VEHICLES: EVVehicle[] = [
  // ========== TESLA ==========
  { make: 'Tesla', model: 'Model 3', connectorType: 'Type 2', maxACChargingKW: 11, maxDCChargingKW: 250 },
  { make: 'Tesla', model: 'Model 3 Highland', connectorType: 'Type 2', maxACChargingKW: 11, maxDCChargingKW: 250 },
  { make: 'Tesla', model: 'Model Y', connectorType: 'Type 2', maxACChargingKW: 11, maxDCChargingKW: 250 },
  { make: 'Tesla', model: 'Model S', connectorType: 'Type 2', maxACChargingKW: 11, maxDCChargingKW: 250 },
  { make: 'Tesla', model: 'Model X', connectorType: 'Type 2', maxACChargingKW: 11, maxDCChargingKW: 250 },

  // ========== BMW ==========
  { make: 'BMW', model: 'i4', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 205 },
  { make: 'BMW', model: 'iX1', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 130 },
  { make: 'BMW', model: 'iX3', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },
  { make: 'BMW', model: 'iX', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 195 },
  { make: 'BMW', model: 'i5', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 205 },
  { make: 'BMW', model: 'i7', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 195 },

  // ========== MERCEDES ==========
  { make: 'Mercedes-Benz', model: 'EQA', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Mercedes-Benz', model: 'EQB', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Mercedes-Benz', model: 'EQC', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 110 },
  { make: 'Mercedes-Benz', model: 'EQE', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 170 },
  { make: 'Mercedes-Benz', model: 'EQS', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 200 },

  // ========== AUDI ==========
  { make: 'Audi', model: 'e-tron GT', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 270 },
  { make: 'Audi', model: 'Q4 e-tron', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 175 },
  { make: 'Audi', model: 'Q6 e-tron', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 270 },
  { make: 'Audi', model: 'Q8 e-tron', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 170 },

  // ========== VOLKSWAGEN ==========
  { make: 'Volkswagen', model: 'ID.3', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 170 },
  { make: 'Volkswagen', model: 'ID.4', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 175 },
  { make: 'Volkswagen', model: 'ID.5', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 175 },
  { make: 'Volkswagen', model: 'ID.7', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 200 },
  { make: 'Volkswagen', model: 'ID. Buzz', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 185 },

  // ========== HYUNDAI ==========
  { make: 'Hyundai', model: 'IONIQ 5', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
  { make: 'Hyundai', model: 'IONIQ 6', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
  { make: 'Hyundai', model: 'Kona Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== KIA ==========
  { make: 'Kia', model: 'EV6', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
  { make: 'Kia', model: 'EV9', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
  { make: 'Kia', model: 'Niro EV', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 80 },

  // ========== NISSAN ==========
  { make: 'Nissan', model: 'Leaf', connectorType: 'CHAdeMO', maxACChargingKW: 6.6, maxDCChargingKW: 50 },
  { make: 'Nissan', model: 'Leaf e+', connectorType: 'CHAdeMO', maxACChargingKW: 6.6, maxDCChargingKW: 100 },
  { make: 'Nissan', model: 'Ariya', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 130 },

  // ========== PEUGEOT ==========
  { make: 'Peugeot', model: 'e-208', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Peugeot', model: 'e-2008', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Peugeot', model: 'e-308', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== VAUXHALL ==========
  { make: 'Vauxhall', model: 'Corsa Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Vauxhall', model: 'Mokka Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Vauxhall', model: 'Astra Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== MG ==========
  { make: 'MG', model: 'MG4', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },
  { make: 'MG', model: 'MG5', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 87 },
  { make: 'MG', model: 'ZS EV', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 76 },

  // ========== VOLVO ==========
  { make: 'Volvo', model: 'EX30', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 153 },
  { make: 'Volvo', model: 'EX40', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 200 },
  { make: 'Volvo', model: 'EC40', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 200 },
  { make: 'Volvo', model: 'EX90', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 250 },

  // ========== PORSCHE ==========
  { make: 'Porsche', model: 'Taycan', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 270 },
  { make: 'Porsche', model: 'Macan Electric', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 270 },

  // ========== RENAULT ==========
  { make: 'Renault', model: 'Megane E-Tech', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 130 },
  { make: 'Renault', model: 'Scenic E-Tech', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 150 },
  { make: 'Renault', model: 'Zoe', connectorType: 'Type 2', maxACChargingKW: 22, maxDCChargingKW: 50 },

  // ========== FORD ==========
  { make: 'Ford', model: 'Mustang Mach-E', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },
  { make: 'Ford', model: 'Explorer Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 185 },

  // ========== SKODA ==========
  { make: 'Skoda', model: 'Enyaq iV', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 175 },
  { make: 'Skoda', model: 'Enyaq Coupe iV', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 175 },

  // ========== CUPRA ==========
  { make: 'CUPRA', model: 'Born', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 170 },
  { make: 'CUPRA', model: 'Tavascan', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 185 },

  // ========== FIAT ==========
  { make: 'Fiat', model: '500 Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 85 },
  { make: 'Fiat', model: '600e', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== MINI ==========
  { make: 'MINI', model: 'Cooper Electric', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 75 },
  { make: 'MINI', model: 'Countryman Electric', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 130 },

  // ========== JAGUAR ==========
  { make: 'Jaguar', model: 'I-PACE', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== POLESTAR ==========
  { make: 'Polestar', model: 'Polestar 2', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 205 },
  { make: 'Polestar', model: 'Polestar 4', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 200 },

  // ========== BYD ==========
  { make: 'BYD', model: 'Atto 3', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 88 },
  { make: 'BYD', model: 'Dolphin', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 88 },
  { make: 'BYD', model: 'Seal', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },

  // ========== SMART ==========
  { make: 'Smart', model: '#1', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 150 },
  { make: 'Smart', model: '#3', connectorType: 'CCS', maxACChargingKW: 22, maxDCChargingKW: 150 },

  // ========== CITROEN ==========
  { make: 'Citroen', model: 'e-C4', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },
  { make: 'Citroen', model: 'e-Berlingo', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 100 },

  // ========== TOYOTA ==========
  { make: 'Toyota', model: 'bZ4X', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },

  // ========== LEXUS ==========
  { make: 'Lexus', model: 'RZ', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 150 },

  // ========== ORA ==========
  { make: 'ORA', model: 'Funky Cat', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 64 },

  // ========== GENESIS ==========
  { make: 'Genesis', model: 'GV60', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
  { make: 'Genesis', model: 'GV70 Electrified', connectorType: 'CCS', maxACChargingKW: 11, maxDCChargingKW: 240 },
];

/**
 * Helper functions
 */

/** Get unique makes, sorted alphabetically */
export function getVehicleMakes(): string[] {
  const makes = new Set(EV_VEHICLES.map((v) => v.make));
  return Array.from(makes).sort();
}

/** Get models for a specific make, sorted alphabetically */
export function getVehicleModels(make: string): string[] {
  return EV_VEHICLES.filter((v) => v.make === make)
    .map((v) => v.model)
    .sort();
}

/** Find a specific vehicle by make and model */
export function findVehicle(make: string, model: string): EVVehicle | undefined {
  return EV_VEHICLES.find(
    (v) => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
  );
}

/** Search vehicles by query string (matches make or model) */
export function searchVehicles(query: string, limit = 10): EVVehicle[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return EV_VEHICLES.filter(
    (v) => v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)
  ).slice(0, limit);
}
