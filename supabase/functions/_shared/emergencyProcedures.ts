// Emergency Procedures - Shared across all H&S agents
// These are static and don't change, so no RAG needed

export const emergencyProcedures = {
  electricShock: [
    'DO NOT touch the victim if still in contact with electricity',
    'Isolate the power source immediately (switch off at consumer unit)',
    'If unable to isolate, use insulated object (dry wooden pole) to break contact',
    'Call 999 for ambulance',
    'If unconscious and not breathing, start CPR (chest compressions)',
    'Place in recovery position if breathing',
    'Stay with victim until help arrives',
    'Report incident to HSE (RIDDOR) if serious injury'
  ],
  arcFlash: [
    'Evacuate area immediately',
    'Do NOT attempt to fight electrical fires with water',
    'Use CO2 or dry powder extinguisher if safe to do so',
    'Call 999 for fire brigade',
    'If clothing on fire: STOP, DROP, ROLL',
    'Treat burns with cool running water (20 mins)',
    'Seek medical attention for all electrical burns',
    'Isolate power if safe to do so'
  ],
  fire: [
    'Raise alarm immediately',
    'Evacuate to assembly point',
    'Call 999',
    'Isolate power supply if safe to do so',
    'Use appropriate extinguisher (CO2/dry powder for electrical)',
    'Never use water on electrical fires',
    'Do not re-enter building until fire service confirms safe'
  ]
};
