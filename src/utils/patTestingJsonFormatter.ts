/**
 * Formats PAT Testing certificate form data for PDF generation.
 * Transforms camelCase app data into snake_case PDF Monkey payload.
 * Flattens test results into compact codes for the register table.
 *
 * IET Code of Practice for In-Service Inspection and Testing
 * of Electrical Equipment (5th Edition)
 */

import { PATTestingFormData, Appliance, PAT_REPAIR_CODES } from '@/types/pat-testing';

/** Compact result code: 'P' = pass, 'F' = fail, '' = not tested */
const resultCode = (val: string): string => {
  if (val === 'pass') return 'P';
  if (val === 'fail') return 'F';
  if (val === 'na') return 'N/A';
  return '';
};

/** Find the label for a repair code */
const repairCodeLabel = (code: string): string => {
  const found = PAT_REPAIR_CODES.find((rc) => rc.value === code);
  return found ? found.label : '';
};

/** Build the failure reasons string from individual test results */
const getFailureReasons = (app: Appliance): string => {
  const reasons: string[] = [];

  // Visual inspection failures
  if (app.visualInspection.flexCondition === 'fail') reasons.push('Flex/cable damaged');
  if (app.visualInspection.plugCondition === 'fail') reasons.push('Plug damaged');
  if (app.visualInspection.enclosureCondition === 'fail') reasons.push('Enclosure damaged');
  if (app.visualInspection.switchesControls === 'fail') reasons.push('Switches/controls faulty');
  if (app.visualInspection.suitableForEnvironment === 'fail')
    reasons.push('Not suitable for environment');

  // Electrical test failures
  if (app.electricalTests.earthContinuity.result === 'fail')
    reasons.push(
      `Earth continuity failed (${app.electricalTests.earthContinuity.reading || '?'} \u03A9)`
    );
  if (app.electricalTests.insulationResistance.result === 'fail')
    reasons.push(
      `Insulation resistance failed (${app.electricalTests.insulationResistance.reading || '?'} M\u03A9)`
    );
  if (app.electricalTests.loadTest?.result === 'fail')
    reasons.push(`Load test failed (${app.electricalTests.loadTest.reading || '?'} kVA)`);
  if (app.electricalTests.leakageCurrent?.result === 'fail')
    reasons.push(
      `Leakage current failed (${app.electricalTests.leakageCurrent.reading || '?'} mA)`
    );
  if (app.electricalTests.polarity === 'fail') reasons.push('Polarity incorrect');
  if (app.electricalTests.functionalCheck === 'fail') reasons.push('Functional check failed');

  return reasons.join(', ');
};

/** Transform a single appliance for the register table */
const formatAppliance = (app: Appliance) => ({
  asset_number: app.assetNumber || '',
  description: app.description || '',
  make: app.make || '',
  model: app.model || '',
  serial_number: app.serialNumber || '',
  location: app.location || '',
  appliance_class: app.applianceClass || 'I',
  category: app.category || 'portable',

  // Flattened visual inspection (compact codes for register table)
  visual: {
    flex: resultCode(app.visualInspection.flexCondition),
    plug: resultCode(app.visualInspection.plugCondition),
    fuse: app.visualInspection.fuseRating || '',
    case: resultCode(app.visualInspection.enclosureCondition),
    switch: resultCode(app.visualInspection.switchesControls),
    env: resultCode(app.visualInspection.suitableForEnvironment),
  },

  // Flattened electrical tests (readings + result codes)
  electrical: {
    earth: app.electricalTests.earthContinuity.reading || '',
    earth_result: resultCode(app.electricalTests.earthContinuity.result),
    insulation: app.electricalTests.insulationResistance.reading || '',
    insulation_result: resultCode(app.electricalTests.insulationResistance.result),
    load: app.electricalTests.loadTest?.reading || '',
    load_result: resultCode(app.electricalTests.loadTest?.result || ''),
    leakage: app.electricalTests.leakageCurrent?.reading || '',
    leakage_result: resultCode(app.electricalTests.leakageCurrent?.result || ''),
    polarity: resultCode(app.electricalTests.polarity),
    functional: resultCode(app.electricalTests.functionalCheck),
  },

  // Visual inspection notes (used in fail cards)
  visual_notes: app.visualInspection.notes || '',

  overall_result: app.overallResult || '',
  repair_code: app.repairCode || '',
  next_test_due: app.nextTestDue || '',
  notes: app.notes || '',
  test_date: app.testDate || '',
  tested_by: app.testedBy || '',
  has_photos: (app.photos || []).length > 0,
  photo_count: (app.photos || []).length,
  first_photo: (app.photos || [])[0] || '',
});

/**
 * Main formatter — transforms PATTestingFormData into the PDF Monkey payload.
 * Call this before sending to the generate-pat-testing-pdf edge function.
 */
export const formatPATTestingJson = (
  formData: Partial<PATTestingFormData>,
  branding?: {
    companyLogo?: string;
    companyName?: string;
    companyAddress?: string;
    companyPhone?: string;
    companyEmail?: string;
    companyTagline?: string;
    companyAccentColor?: string;
    registrationScheme?: string;
    registrationNumber?: string;
    registrationSchemeLogo?: string;
  }
) => {
  const appliances = formData.appliances || [];

  // Calculate summary stats
  const totalTested = appliances.filter((a) => a.overallResult !== '').length;
  const totalPassed = appliances.filter((a) => a.overallResult === 'pass').length;
  const totalFailed = appliances.filter((a) => a.overallResult === 'fail').length;
  const passRate = totalTested > 0 ? Math.round((totalPassed / totalTested) * 100) : 0;

  // Build failed appliances list (with photos for appendix)
  const failedAppliances = appliances
    .filter((a) => a.overallResult === 'fail')
    .map((a) => ({
      asset_number: a.assetNumber || '',
      description: a.description || '',
      make: a.make || '',
      model: a.model || '',
      serial_number: a.serialNumber || '',
      location: a.location || '',
      repair_code: a.repairCode || '',
      repair_code_label: repairCodeLabel(a.repairCode),
      failure_reasons: getFailureReasons(a),
      notes: a.notes || '',
      visual_notes: a.visualInspection.notes || '',
      photos: a.photos || [],
      has_photos: (a.photos || []).length > 0,
    }));

  // Build photo list grouped by appliance (with result badge)
  const appliancePhotos: {
    asset_number: string;
    description: string;
    result: string;
    photos: string[];
  }[] = [];
  let hasPhotos = false;

  for (const app of appliances) {
    if (app.photos && app.photos.length > 0) {
      hasPhotos = true;
      appliancePhotos.push({
        asset_number: app.assetNumber || '',
        description: app.description || 'Appliance',
        result: app.overallResult || '',
        photos: app.photos,
      });
    }
  }

  return {
    // Metadata
    metadata: {
      certificate_number: formData.certificateNumber || `PAT-${Date.now()}`,
      test_date: formData.testDate || '',
      report_reference: formData.reportReference || '',
      standard: 'IET Code of Practice (5th Edition)',
    },

    // Client details
    client_details: {
      client_name: formData.clientName || '',
      client_address: formData.clientAddress || '',
      client_phone: formData.clientTelephone || '',
      client_email: formData.clientEmail || '',
      contact_person: formData.contactPerson || '',
    },

    // Site details
    site_details: {
      site_name: formData.siteName || '',
      site_address: formData.siteAddress || '',
      site_contact_name: formData.siteContactName || '',
      site_contact_phone: formData.siteContactPhone || '',
    },

    // Test equipment
    test_equipment: {
      make: formData.testEquipment?.make || '',
      model: formData.testEquipment?.model || '',
      serial_number: formData.testEquipment?.serialNumber || '',
      last_calibration: formData.testEquipment?.lastCalibrationDate || '',
      next_calibration: formData.testEquipment?.nextCalibrationDue || '',
    },

    // Formatted appliances (for register table)
    appliances: appliances.map(formatAppliance),

    // Summary statistics
    summary: {
      total_tested: totalTested,
      total_passed: totalPassed,
      total_failed: totalFailed,
      pass_rate: passRate,
    },

    // Failed appliances (for appendix)
    failed_appliances: failedAppliances,

    // Recommendations & retest
    recommendations: formData.recommendations || '',
    retest_interval: formData.suggestedRetestInterval || '12',
    next_test_due: formData.nextTestDue || '',
    additional_notes: formData.additionalNotes || '',

    // Tester declaration
    declarations: {
      tester: {
        name: formData.testerName || '',
        company: formData.testerCompany || '',
        qualifications: formData.testerQualifications || '',
        signature: formData.testerSignature || '',
        date: formData.testerDate || '',
      },
    },

    // Photos
    has_photos: hasPhotos,
    appliance_photos: appliancePhotos,

    // Company branding
    company_logo: branding?.companyLogo || '',
    company_name: branding?.companyName || formData.testerCompany || '',
    company_address: branding?.companyAddress || '',
    company_phone: branding?.companyPhone || '',
    company_email: branding?.companyEmail || '',
    company_tagline: branding?.companyTagline || '',
    company_accent_color: branding?.companyAccentColor || '#22c55e',
    registration_scheme: branding?.registrationScheme || '',
    registration_number: branding?.registrationNumber || '',
    registration_scheme_logo: branding?.registrationSchemeLogo || '',
  };
};
