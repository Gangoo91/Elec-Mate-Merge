/**
 * Formats Emergency Lighting certificate form data for PDF generation
 * Compliant with BS 5266-1:2016, BS EN 50172:2004, BS EN 1838:2013
 */

import { EmergencyLightingFormData, Luminaire, LuxReading, CertificatePhoto } from '@/types/emergency-lighting';

export const formatEmergencyLightingJson = (formData: Partial<EmergencyLightingFormData>) => {
  const get = (key: string, defaultValue: any = ''): string => {
    const value = (formData as any)[key] ?? defaultValue;
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);
    return value;
  };

  const getNum = (key: string, defaultValue: number = 0): number => {
    const value = (formData as any)[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  };

  const getBool = (key: string): boolean => {
    const value = (formData as any)[key];
    return value === true || value === 'true';
  };

  // Format date to UK format (DD/MM/YYYY)
  const formatDateUK = (dateStr: string): string => {
    if (!dateStr) return '';
    // Handle ISO format (YYYY-MM-DD) or already formatted dates
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
    // If already in UK format or other format, return as-is
    return dateStr;
  };

  // Get date field and format to UK
  const getDate = (key: string): string => {
    return formatDateUK(get(key));
  };

  // Format luminaires for table
  const formatLuminaires = () => {
    const luminaires: Luminaire[] = formData.luminaires || [];
    return luminaires.map((lum: Luminaire, index: number) => ({
      number: index + 1,
      location: lum.location || '',
      make: lum.manufacturer || '',
      model: lum.model || '',
      type: formatLuminaireType(lum.luminaireType || ''),
      type_raw: lum.luminaireType || '',
      category: formatCategory(lum.category || ''),
      category_raw: lum.category || '',
      rated_duration: lum.ratedDuration || 180,
      rated_duration_display: lum.ratedDuration === 60 ? '1hr' : '3hr',
      functional_result: formatTestResult(lum.functionalTestResult),
      functional_result_raw: lum.functionalTestResult || '',
      duration_result: formatTestResult(lum.durationTestResult),
      duration_result_raw: lum.durationTestResult || '',
      battery_type: formatBatteryType(lum.batteryType || ''),
      battery_type_raw: lum.batteryType || '',
      wattage: lum.wattage || 0,
      notes: lum.notes || '',
      install_date: lum.installDate || '',
      photo_url: lum.photoUrl || ''
    }));
  };

  // Calculate summary stats
  const calculateSummary = () => {
    const luminaires: Luminaire[] = formData.luminaires || [];
    const passCount = luminaires.filter((l) => l.functionalTestResult === 'pass').length;
    const failCount = luminaires.filter((l) =>
      l.functionalTestResult === 'fail' || l.durationTestResult === 'fail'
    ).length;

    return {
      total: luminaires.length,
      escape_route: luminaires.filter((l) => l.category === 'escape-route').length,
      open_area: luminaires.filter((l) => l.category === 'open-area').length,
      high_risk: luminaires.filter((l) => l.category === 'high-risk').length,
      standby: luminaires.filter((l) => l.category === 'standby').length,
      exit_signs: luminaires.filter((l) =>
        l.luminaireType === 'exit-sign' || l.luminaireType === 'exit-box'
      ).length,
      all_pass: failCount === 0 && passCount > 0,
      all_pass_display: failCount === 0 && passCount > 0 ? 'Yes' : 'No',
      pass_count: passCount,
      fail_count: failCount,
      tested_count: luminaires.filter((l) => l.functionalTestResult).length
    };
  };

  // Format lux readings
  const formatLuxReadings = () => {
    const readings: LuxReading[] = formData.luxReadings || [];
    return readings.map((r, index) => ({
      number: index + 1,
      location: r.location || '',
      category: r.category || '',
      category_display: formatLuxCategory(r.category || ''),
      reading: r.luxReading || '',
      min_required: r.minRequired || '',
      result: formatTestResult(r.result),
      result_raw: r.result || ''
    }));
  };

  // Format defects
  const formatDefects = () => {
    const defects = formData.defectsFound || [];
    const luminaires: Luminaire[] = formData.luminaires || [];

    return defects.map((d: any, index: number) => {
      const linkedLuminaire = luminaires.find((l) => l.id === d.luminaireId);
      return {
        number: index + 1,
        description: d.description || '',
        priority: formatPriority(d.priority),
        priority_raw: d.priority || '',
        luminaire_id: d.luminaireId || '',
        luminaire_location: linkedLuminaire?.location || 'General',
        rectified: d.rectified || false,
        rectified_display: d.rectified ? 'Yes' : 'No',
        rectification_date: formatDateUK(d.rectificationDate || ''),
        photo_url: d.photoUrl || ''
      };
    });
  };

  // Format photos by category
  const formatPhotos = () => {
    const photos: CertificatePhoto[] = formData.photos || [];
    const luminaires: Luminaire[] = formData.luminaires || [];
    const defects = formData.defectsFound || [];

    return photos.map((photo, index) => {
      let linkedItemName = '';
      if (photo.linkedItemId) {
        if (photo.category === 'luminaire') {
          const lum = luminaires.find(l => l.id === photo.linkedItemId);
          if (lum) {
            const lumIndex = luminaires.indexOf(lum) + 1;
            linkedItemName = `Luminaire #${lumIndex} - ${lum.location}`;
          }
        } else if (photo.category === 'defect') {
          const def = defects.find((d: any) => d.id === photo.linkedItemId);
          if (def) {
            linkedItemName = `Defect: ${(def as any).description?.substring(0, 40)}...`;
          }
        }
      }

      return {
        number: index + 1,
        url: photo.url,
        caption: photo.caption || '',
        category: photo.category,
        category_display: formatPhotoCategory(photo.category),
        linked_item: linkedItemName,
        uploaded_at: photo.uploadedAt
      };
    });
  };

  const getPhotosByCategory = (category: CertificatePhoto['category']) => {
    const photos: CertificatePhoto[] = formData.photos || [];
    const luminaires: Luminaire[] = formData.luminaires || [];
    const defects = formData.defectsFound || [];

    return photos.filter(p => p.category === category).map((photo, index) => {
      let linkedItemName = '';
      if (photo.linkedItemId) {
        if (photo.category === 'luminaire') {
          const lum = luminaires.find(l => l.id === photo.linkedItemId);
          if (lum) {
            const lumIndex = luminaires.indexOf(lum) + 1;
            linkedItemName = `#${lumIndex} - ${lum.location}`;
          }
        } else if (photo.category === 'defect') {
          const def = defects.find((d: any) => d.id === photo.linkedItemId);
          if (def) {
            linkedItemName = (def as any).description?.substring(0, 40);
          }
        }
      }

      return {
        number: index + 1,
        url: photo.url,
        caption: photo.caption || '',
        linked_item: linkedItemName,
        uploaded_at: photo.uploadedAt
      };
    });
  };

  // Get monthly test data
  const monthlyTest = formData.monthlyFunctionalTest || {};
  const annualTest = formData.annualDurationTest || {};

  return {
    // ============================================
    // METADATA
    // ============================================
    metadata: {
      certificate_number: get('certificateNumber'),
      test_type: get('testType'),
      test_type_display: formatTestType(get('testType')),
      test_date: getDate('testDate'),
      standards: 'BS 5266-1:2016, BS EN 50172:2004, BS EN 1838:2013'
    },

    // ============================================
    // CLIENT DETAILS
    // ============================================
    client: {
      name: get('clientName'),
      address: get('clientAddress'),
      telephone: get('clientTelephone'),
      email: get('clientEmail')
    },

    // ============================================
    // PREMISES DETAILS
    // ============================================
    premises: {
      name: get('premisesName'),
      address: get('premisesAddress'),
      type: get('premisesType'),
      type_display: formatPremisesType(get('premisesType')),
      occupancy_type: get('occupancyType'),
      occupancy_display: formatOccupancy(get('occupancyType'))
    },

    // ============================================
    // SYSTEM DETAILS
    // ============================================
    system: {
      type: get('systemType'),
      type_display: formatSystemType(get('systemType')),
      rated_duration: getNum('ratedDuration', 180),
      rated_duration_display: getNum('ratedDuration', 180) === 60 ? '1 Hour (60 min)' : '3 Hours (180 min)',
      total_luminaires: (formData.luminaires || []).length,
      central_battery_system: getBool('centralBatterySystem'),
      central_battery_system_display: getBool('centralBatterySystem') ? 'Yes' : 'No',
      central_battery_location: get('centralBatteryLocation'),
      self_contained_units: getBool('selfContainedUnits') !== false,
      self_contained_units_display: getBool('selfContainedUnits') !== false ? 'Yes' : 'No'
    },

    // ============================================
    // EQUIPMENT COUNTS
    // ============================================
    equipment: {
      luminaire_count: getNum('luminaireCount') || (formData.luminaires || []).length,
      exit_sign_count: getNum('exitSignCount'),
      central_battery_count: getNum('centralBatteryCount'),
      total_count: (getNum('luminaireCount') || (formData.luminaires || []).length) + getNum('exitSignCount')
    },

    // ============================================
    // LUMINAIRE SCHEDULE
    // ============================================
    luminaires: formatLuminaires(),
    luminaire_summary: calculateSummary(),

    // ============================================
    // TEST RESULTS - MONTHLY FUNCTIONAL
    // ============================================
    monthly_test: {
      date: formatDateUK(monthlyTest.date || ''),
      all_luminaires_operational: monthlyTest.allLuminairesOperational || false,
      all_luminaires_operational_display: monthlyTest.allLuminairesOperational ? 'PASS' : 'FAIL',
      charging_indicators_normal: monthlyTest.chargingIndicatorsNormal || false,
      charging_indicators_normal_display: monthlyTest.chargingIndicatorsNormal ? 'PASS' : 'FAIL',
      faults_found: monthlyTest.faultsFound || '',
      action_taken: monthlyTest.actionTaken || '',
      has_faults: !!(monthlyTest.faultsFound && monthlyTest.faultsFound.trim())
    },

    // ============================================
    // TEST RESULTS - ANNUAL DURATION
    // ============================================
    annual_test: {
      date: formatDateUK(annualTest.date || ''),
      duration_tested: annualTest.duration || 0,
      all_luminaires_operational: annualTest.allLuminairesOperational || false,
      all_luminaires_operational_display: annualTest.allLuminairesOperational ? 'PASS' : 'FAIL',
      battery_condition: annualTest.batteryCondition || '',
      battery_condition_display: formatBatteryCondition(annualTest.batteryCondition || ''),
      faults_found: annualTest.faultsFound || '',
      action_taken: annualTest.actionTaken || '',
      has_faults: !!(annualTest.faultsFound && annualTest.faultsFound.trim())
    },

    // ============================================
    // LUX READINGS
    // ============================================
    lux_readings: formatLuxReadings(),
    has_lux_readings: (formData.luxReadings || []).length > 0,

    // ============================================
    // DEFECTS
    // ============================================
    defects: formatDefects(),
    has_defects: (formData.defectsFound || []).length > 0,
    no_defects: (formData.defectsFound || []).length === 0,
    defect_count: (formData.defectsFound || []).length,

    // ============================================
    // PHOTOS
    // ============================================
    photos: formatPhotos(),
    has_photos: (formData.photos || []).length > 0,
    photo_count: (formData.photos || []).length,
    installation_photos: getPhotosByCategory('installation'),
    luminaire_photos: getPhotosByCategory('luminaire'),
    defect_photos: getPhotosByCategory('defect'),
    central_battery_photos: getPhotosByCategory('central-battery'),
    exit_sign_photos: getPhotosByCategory('exit-sign'),
    has_installation_photos: getPhotosByCategory('installation').length > 0,
    has_luminaire_photos: getPhotosByCategory('luminaire').length > 0,
    has_defect_photos: getPhotosByCategory('defect').length > 0,

    // ============================================
    // RECOMMENDATIONS
    // ============================================
    recommendations: get('recommendations'),
    has_recommendations: !!(get('recommendations') && get('recommendations').trim()),

    // ============================================
    // SERVICE SCHEDULE
    // ============================================
    service_schedule: {
      next_monthly_test: getDate('nextMonthlyTestDue'),
      next_annual_test: getDate('nextAnnualTestDue')
    },

    // ============================================
    // TESTER DECLARATION
    // ============================================
    tester: {
      name: get('testerName'),
      company: get('testerCompany'),
      qualifications: get('testerQualifications'),
      signature: get('testerSignature'),
      date: getDate('testerDate')
    },

    // ============================================
    // OVERALL RESULT
    // ============================================
    overall_result: get('overallResult'),
    overall_result_display: get('overallResult') === 'satisfactory' ? 'SATISFACTORY'
      : get('overallResult') === 'unsatisfactory' ? 'UNSATISFACTORY' : '',
    is_satisfactory: get('overallResult') === 'satisfactory',

    // ============================================
    // ADDITIONAL NOTES
    // ============================================
    additional_notes: get('additionalNotes'),
    has_additional_notes: !!(get('additionalNotes') && get('additionalNotes').trim()),

    // ============================================
    // COMPANY BRANDING
    // ============================================
    company: {
      name: get('companyName'),
      address: get('companyAddress'),
      phone: get('companyPhone'),
      email: get('companyEmail'),
      website: get('companyWebsite'),
      logo: get('companyLogo'),
      accent_color: get('accentColor') || get('companyAccentColor') || '#f59e0b'
    },

    // ============================================
    // DECLARATION TEXT (for PDF template)
    // ============================================
    declaration_text: 'I/We certify that the emergency lighting system has been inspected and tested in accordance with BS 5266-1:2016, BS EN 50172:2004, and BS EN 1838:2013, and the results are as recorded in this certificate.',

    // ============================================
    // FLAT COPIES FOR DIRECT TEMPLATE ACCESS
    // ============================================

    // Certificate
    certificate_number: get('certificateNumber'),
    test_date: getDate('testDate'),
    test_type: get('testType'),

    // Client (flat)
    client_name: get('clientName'),
    client_address: get('clientAddress'),
    client_telephone: get('clientTelephone'),
    client_email: get('clientEmail'),

    // Premises (flat)
    premises_name: get('premisesName'),
    premises_address: get('premisesAddress'),
    premises_type: get('premisesType'),
    occupancy_type: get('occupancyType'),

    // System (flat)
    system_type: get('systemType'),
    rated_duration: getNum('ratedDuration', 180),
    central_battery_system: getBool('centralBatterySystem'),
    central_battery_location: get('centralBatteryLocation'),
    self_contained_units: getBool('selfContainedUnits'),

    // Equipment (flat)
    luminaire_count: getNum('luminaireCount') || (formData.luminaires || []).length,
    exit_sign_count: getNum('exitSignCount'),
    central_battery_count: getNum('centralBatteryCount'),

    // Service schedule (flat)
    next_monthly_test_due: getDate('nextMonthlyTestDue'),
    next_annual_test_due: getDate('nextAnnualTestDue'),

    // Tester (flat)
    tester_name: get('testerName'),
    tester_company: get('testerCompany'),
    tester_qualifications: get('testerQualifications'),
    tester_signature: get('testerSignature'),
    tester_date: getDate('testerDate'),

    // Company (flat)
    company_name: get('companyName'),
    company_address: get('companyAddress'),
    company_phone: get('companyPhone'),
    company_email: get('companyEmail'),
    company_website: get('companyWebsite'),
    company_logo: get('companyLogo'),
    company_accent_color: get('accentColor') || get('companyAccentColor') || '#f59e0b'
  };
};

// ============================================
// HELPER FORMATTING FUNCTIONS
// ============================================

function formatTestResult(result: string | undefined): string {
  switch (result) {
    case 'pass': return 'PASS';
    case 'fail': return 'FAIL';
    case 'na': return 'N/A';
    default: return '';
  }
}

function formatTestType(testType: string): string {
  switch (testType) {
    case 'commissioning': return 'Commissioning';
    case 'monthly': return 'Monthly Functional Test';
    case 'annual': return 'Annual Duration Test';
    default: return testType || '';
  }
}

function formatSystemType(systemType: string): string {
  switch (systemType) {
    case 'maintained': return 'Maintained';
    case 'non-maintained': return 'Non-Maintained';
    case 'combined': return 'Combined (Sustained)';
    default: return systemType || '';
  }
}

function formatLuminaireType(type: string): string {
  switch (type) {
    case 'bulkhead': return 'Bulkhead';
    case 'twin-spot': return 'Twin Spot';
    case 'recessed': return 'Recessed';
    case 'surface': return 'Surface Mount';
    case 'downlight': return 'Downlight';
    case 'exit-sign': return 'Exit Sign';
    case 'exit-box': return 'Exit Box';
    case 'strip': return 'Strip Light';
    default: return type || '';
  }
}

function formatCategory(category: string): string {
  switch (category) {
    case 'escape-route': return 'Escape Route';
    case 'open-area': return 'Open Area';
    case 'high-risk': return 'High Risk';
    case 'standby': return 'Standby';
    default: return category || '';
  }
}

function formatBatteryType(batteryType: string): string {
  switch (batteryType) {
    case 'NiCd': return 'NiCd (Nickel Cadmium)';
    case 'NiMH': return 'NiMH (Nickel Metal Hydride)';
    case 'LiFePO4': return 'LiFePO4 (Lithium)';
    case 'Li-ion': return 'Li-ion';
    case 'central': return 'Central Battery';
    default: return batteryType || '';
  }
}

function formatBatteryCondition(condition: string): string {
  switch (condition.toLowerCase()) {
    case 'good': return 'Good';
    case 'fair': return 'Fair';
    case 'poor': return 'Poor';
    default: return condition || '';
  }
}

function formatPriority(priority: string): string {
  switch (priority) {
    case 'immediate': return 'Immediate';
    case 'within-7-days': return 'Within 7 Days';
    case 'within-28-days': return 'Within 28 Days';
    case 'recommendation': return 'Recommendation';
    default: return priority || '';
  }
}

function formatPremisesType(premisesType: string): string {
  switch (premisesType) {
    case 'office': return 'Office';
    case 'retail': return 'Retail';
    case 'industrial': return 'Industrial';
    case 'educational': return 'Educational';
    case 'healthcare': return 'Healthcare';
    case 'residential-communal': return 'Residential Communal';
    case 'hotel': return 'Hotel/Hospitality';
    case 'entertainment': return 'Entertainment';
    case 'warehouse': return 'Warehouse';
    default: return premisesType || '';
  }
}

function formatOccupancy(occupancy: string): string {
  switch (occupancy) {
    case 'sleeping': return 'Sleeping Risk';
    case 'high': return 'High Risk';
    case 'normal': return 'Normal Risk';
    case 'low': return 'Low Risk';
    default: return occupancy || '';
  }
}

function formatPhotoCategory(category: string): string {
  switch (category) {
    case 'installation': return 'Installation Overview';
    case 'luminaire': return 'Luminaire';
    case 'defect': return 'Defect Evidence';
    case 'central-battery': return 'Central Battery';
    case 'exit-sign': return 'Exit Sign';
    default: return category || '';
  }
}

function formatLuxCategory(category: string): string {
  switch (category) {
    case 'escape-route': return 'Escape Route (≥1 lux)';
    case 'open-area': return 'Open Area (≥0.5 lux)';
    case 'high-risk': return 'High Risk (≥15 lux)';
    default: return category || '';
  }
}
