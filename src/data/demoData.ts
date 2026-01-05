export const demoEICRData = {
  // Client Details
  clientName: 'John Smith',
  clientPhone: '07700 900123',
  clientEmail: 'john.smith@example.com',
  clientAddress: '123 High Street\nLondon\nSW1A 1AA',
  installationAddress: '123 High Street\nLondon\nSW1A 1AA',
  sameAsClientAddress: 'true',
  description: 'domestic',
  installationType: 'existing-installation',
  
  // Installation History
  estimatedAge: '15',
  ageUnit: 'years',
  lastInspectionType: 'known',
  dateOfLastInspection: '2020-01-15',
  evidenceOfAlterations: 'yes',
  alterationsDetails: 'Kitchen extension added in 2018 with additional circuits',
  
  // Supply Characteristics
  phases: '1',
  supplyVoltage: '230',
  supplyFrequency: '50',
  supplyPME: 'yes',
  mainProtectiveDevice: '100A BS 88 Fuse',
  earthingArrangement: 'TN-C-S',
  earthElectrodeType: 'n/a',
  rcdMainSwitch: 'yes',
  rcdRating: '30mA',
  
  // Consumer Unit
  cuLocation: 'Hallway cupboard',
  cuManufacturer: 'Hager',
  cuType: 'metal',
  boardSize: '12-way',
  intakeCableSize: '25mm',
  intakeCableType: 'swa',
  tailsSize: '25mm',
  tailsLength: '2.5',
  
  // Earthing & Bonding
  mainEarthTerminalLocation: 'Consumer unit',
  mainEarthConductorSize: '16mm',
  mainEarthConductorType: 'Single core PVC',
  earthElectrodeResistance: '',
  mainBondingConductorSize: '10mm',
  mainBondingLocation: 'Water: Under sink, Gas: At meter',
  supplementaryBonding: 'yes',
  supplementaryBondingLocation: 'Bathroom',
  
  // Test Method
  testMethod: 'BS 7671 Method 1',
  testVoltage: '500',
  testNotes: 'All tests carried out with installation isolated and all loads disconnected. RCD tests performed using calibrated Megger MFT.',
  
  // Inspector Details
  inspectorName: 'David Johnson',
  inspectorQualifications: 'City & Guilds 2391, 18th Edition',
  inspectorCompany: 'SafeElec Ltd',
  inspectorAddress: '456 Industrial Estate\nBirmingham\nB1 2TT',
  inspectionDate: new Date().toISOString().split('T')[0],
  nextInspectionDate: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 years
  
  // Assessment
  overallAssessment: 'satisfactory',
  satisfactoryForContinuedUse: 'yes-with-recommendations',
  additionalComments: 'Installation generally in good condition. Recommend replacement of two damaged socket outlets in kitchen.',
  
  // Sample Test Results
  testResults: [
    {
      id: 'demo-1',
      circuitReference: 'C1',
      circuitDescription: 'Ring Main - Kitchen & Utility',
      livePolarity: 'Correct',
      r1_r2: 0.18,
      insulation_resistance: 280,
      zs: 0.45,
      max_zs: 1.37,  // BS 7671 Table 41.3(a) - Type B 32A
      rcd_trip_time: 26,
      rcd_rating: 30,
      pfc: 2.3,
      protective_device_type: 'MCB',
      protective_device_rating: 32,
      protective_device_curve: 'B',
      protective_device_ka: 6,
      conductor_live: '2.5',
      conductor_cpc: '1.5',
      reference_method: 'C',
      points_served: 10,
      functional_testing: 'Pass'
    },
    {
      id: 'demo-2',
      circuitReference: 'C2',
      circuitDescription: 'Cooker Circuit',
      livePolarity: 'Correct',
      r1_r2: 0.24,
      insulation_resistance: 195,
      zs: 0.58,
      max_zs: 1.09,  // BS 7671 Table 41.3(a) - Type B 40A
      pfc: 3.1,
      protective_device_type: 'MCB',
      protective_device_rating: 40,
      protective_device_curve: 'B',
      protective_device_ka: 10,
      conductor_live: '6.0',
      conductor_cpc: '2.5',
      reference_method: 'C',
      points_served: 1,
      functional_testing: 'Pass'
    },
    {
      id: 'demo-3',
      circuitReference: 'C3',
      circuitDescription: 'Lighting - Ground Floor',
      livePolarity: 'Correct',
      r1_r2: 0.92,
      insulation_resistance: 52,
      zs: 1.15,
      max_zs: 7.28,  // BS 7671 Table 41.3(a) - Type B 6A
      pfc: 1.9,
      protective_device_type: 'MCB',
      protective_device_rating: 6,
      protective_device_curve: 'B',
      protective_device_ka: 6,
      conductor_live: '1.5',
      conductor_cpc: '1.0',
      reference_method: 'A',
      points_served: 14,
      functional_testing: 'Pass'
    }
  ],
  
  // Demo flag
  isDemoData: true
};

export const loadDemoData = () => {
  return { ...demoEICRData };
};
