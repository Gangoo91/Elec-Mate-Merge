/**
 * plugInSolarJsonFormatter.ts — ELE-1660
 *
 * Maps the form state plus the assessment result onto the payload the
 * "Plug-in Solar Assessment" PDFMonkey template expects
 * (template `c89ed40e-63e8-4697-ac24-48e2705e0291`).
 *
 * Two rules this file exists to enforce:
 *
 *  1. **The statutory/advisory split survives into the PDF.** Findings are
 *     handed over pre-grouped, each carrying its own basis label and citation.
 *     A reader must be able to tell a requirement from an opinion without
 *     knowing anything about how the assessment works.
 *  2. **Nothing is invented.** Every value is either something the electrician
 *     entered or a figure from PLUG_IN_SOLAR_FACTS. Blanks render as an em dash
 *     rather than a plausible-looking default.
 */

import {
  PLUG_IN_SOLAR_FACTS,
  OUTCOME_COPY,
  type AssessmentBasis,
  type AssessmentFinding,
  type FindingSeverity,
  type PlugInSolarAssessmentResult,
} from '@/lib/plugInSolarAssessment';
import { totalPvModuleDcW, type PlugInSolarData } from '@/types/plug-in-solar';
import type { CertBranding } from '@/utils/certBranding';
import { supabase } from '@/integrations/supabase/client';

/** Navy/gold house cover; matches the EICR and EIC V2 templates. */
export const PLUG_IN_SOLAR_ACCENT = '#0a1628';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface PlugInSolarPhotoSets {
  consumerUnit: string[];
  siting: string[];
}

/**
 * Photographs for the report, split by the context they were taken in.
 *
 * `inspection_photos.report_id` holds the reports table UUID rather than the
 * PIS-xxx reference, so it has to be resolved first — same as
 * `useInspectionPhotos` does. Served through the storage transform at a size
 * that suits a half-page plate: full-resolution site photos have blown the PDF
 * size guard on other certificates before.
 */
export const fetchPlugInSolarPhotos = async (
  reportId: string,
): Promise<PlugInSolarPhotoSets> => {
  const empty: PlugInSolarPhotoSets = { consumerUnit: [], siting: [] };
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return empty;

    const { data: report } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportId)
      .eq('user_id', user.id)
      .maybeSingle();

    const reportUuid = report?.id || (UUID_REGEX.test(reportId) ? reportId : null);
    if (!reportUuid) return empty;

    const { data: rows } = await supabase
      .from('inspection_photos')
      .select('file_path, item_id')
      .eq('report_id', reportUuid)
      .order('uploaded_at');

    const publicUrl = (path: string) =>
      supabase.storage.from('inspection-photos').getPublicUrl(path, {
        transform: { width: 1000, height: 1400, resize: 'contain', quality: 60 },
      }).data.publicUrl;

    return (rows || []).reduce<PlugInSolarPhotoSets>((acc, row) => {
      const url = publicUrl(row.file_path);
      if (row.item_id === 'siting') acc.siting.push(url);
      else acc.consumerUnit.push(url);
      return acc;
    }, { consumerUnit: [], siting: [] });
  } catch {
    return empty;
  }
};

const DASH = '—';

const text = (v: string | undefined | null): string => (v && v.trim() !== '' ? v.trim() : DASH);

const withUnit = (v: string, unit: string): string =>
  v && v.trim() !== '' ? `${v.trim()} ${unit}` : DASH;

const triLabel = (v: string, yes = 'Yes', no = 'No'): string =>
  v === 'yes' ? yes : v === 'no' ? no : 'Not checked';

const boolLabel = (v: boolean, yes = 'Yes', no = 'No'): string => (v ? yes : no);

const SEVERITY_LABEL: Record<FindingSeverity, string> = {
  blocker: 'Stops the install',
  action: 'Work needed',
  advisory: 'For the record',
};

const BASIS_LABEL: Record<AssessmentBasis, string> = {
  statutory: 'Regulations',
  'product-spec': 'Product specification',
  network: 'Network connection (G98)',
  bs7671: 'BS 7671',
  guidance: 'Professional judgement',
};

const REGION_LABEL: Record<string, string> = {
  england: 'England',
  wales: 'Wales',
  scotland: 'Scotland',
  'northern-ireland': 'Northern Ireland',
};

const TENURE_LABEL: Record<string, string> = {
  'owner-occupied': 'Owner-occupied',
  rented: 'Privately rented',
  'leasehold-flat': 'Leasehold flat',
  'social-housing': 'Social housing',
  unknown: 'Not established',
};

const CIRCUIT_KIND_LABEL: Record<string, string> = {
  'socket-final-circuit': 'Socket final circuit',
  lighting: 'Lighting circuit',
  'fixed-equipment-spur': 'Spur to fixed equipment',
  unknown: 'Not identified',
};

const PROTECTION_LABEL: Record<string, string> = {
  rcbo: 'RCBO on this circuit',
  'mcb-with-upstream-rcd': 'MCB with upstream RCD',
  'mcb-no-rcd': 'MCB only, no RCD',
  'rewireable-fuse': 'Rewireable fuse',
  unknown: 'Not identified',
};

const RCD_TYPE_LABEL: Record<string, string> = {
  ac: 'Type AC',
  a: 'Type A',
  f: 'Type F',
  b: 'Type B',
  none: 'None fitted',
  unknown: 'Marking not identified',
};

const CONNECTION_LABEL: Record<string, string> = {
  'direct-to-fixed-socket': 'Direct to a fixed socket-outlet',
  'extension-lead': 'Extension cable',
  'multi-way-adaptor': 'Multi-way adaptor',
  'rcd-adaptor': 'RCD adaptor',
  'travel-adaptor': 'Travel adaptor',
};

const SURFACE_LABEL: Record<string, string> = {
  'masonry-or-render': 'Masonry or render',
  'metal-balcony-railing': 'Metal balcony railing',
  'ground-or-freestanding': 'Ground or freestanding',
  'acm-mcm-cladding': 'ACM or MCM cladding',
  'hpl-cladding': 'HPL cladding',
  'timber-cladding': 'Timber cladding',
  'timber-balcony': 'Timber balcony',
  unknown: 'Not established',
};

const PROTECTION_CLASS_LABEL: Record<string, string> = {
  I: 'Class I',
  II: 'Class II',
  III: 'Class III',
  unknown: 'Not established',
};

const REMEDIAL_STATUS_LABEL: Record<string, string> = {
  required: 'Required',
  quoted: 'Quoted',
  declined: 'Declined',
  complete: 'Complete',
};

const PERMISSION_LABEL: Record<string, string> = {
  yes: 'Obtained',
  no: 'Not obtained',
  'not-required': 'Not required',
  unknown: 'Not established',
};

/** en-GB long date. Returns '' (not a fake date) when the input is unusable. */
const ukDate = (iso: string | undefined): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/** Commissioning + 28 days — the date the G98 notification is due by. */
const notifyByDate = (commissioningDate: string): string => {
  if (!commissioningDate) return '';
  const d = new Date(commissioningDate);
  if (Number.isNaN(d.getTime())) return '';
  d.setDate(d.getDate() + PLUG_IN_SOLAR_FACTS.dnoNotificationWindowDays);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const mapFinding = (f: AssessmentFinding) => ({
  severity: f.severity,
  severity_label: SEVERITY_LABEL[f.severity],
  basis_label: BASIS_LABEL[f.basis],
  summary: f.summary,
  detail: f.detail,
  citation: f.citation,
  remedial_work: f.remedialWork ?? '',
});

export function formatPlugInSolarJson(
  data: PlugInSolarData,
  result: PlugInSolarAssessmentResult,
  branding?: Partial<CertBranding>,
  photos?: PlugInSolarPhotoSets,
): Record<string, unknown> {
  const totalDc = totalPvModuleDcW(data);
  const moduleSummary =
    data.pvModuleCount && data.pvModulePmaxW
      ? `${data.pvModuleCount} × ${data.pvModulePmaxW} W`
      : DASH;

  return {
    metadata: {
      certificate_number: text(data.certificateNumber),
      assessment_date: ukDate(data.assessmentDate) || DASH,
      commissioning_date: ukDate(data.commissioningDate),
    },

    company_details: {
      company_name: branding?.companyName ?? '',
      company_logo: branding?.companyLogo ?? '',
      company_phone: branding?.companyPhone ?? '',
      company_email: branding?.companyEmail ?? '',
      registration_scheme: branding?.registrationScheme ?? '',
      registration_scheme_logo: branding?.registrationSchemeLogo ?? '',
    },

    client_details: {
      client_name: text(data.clientName),
      client_email: text(data.clientEmail),
      client_telephone: text(data.clientTelephone),
    },

    property: {
      address: text(data.installationAddress),
      postcode: data.installationPostcode?.trim() ?? '',
      region_label: REGION_LABEL[data.region] ?? DASH,
      tenure_label: TENURE_LABEL[data.tenure] ?? DASH,
      property_type: text(data.propertyType),
      approx_year: text(data.installationApproxYear),
    },

    verdict: {
      outcome: result.outcome,
      title: OUTCOME_COPY[result.outcome].title,
      body: OUTCOME_COPY[result.outcome].body,
    },

    findings: {
      statutory: result.statutoryFindings.map(mapFinding),
      guidance: result.guidanceFindings.map(mapFinding),
    },

    remedial_items: data.remedialItems.map((i) => ({
      description: i.description,
      status: i.status,
      status_label: REMEDIAL_STATUS_LABEL[i.status] ?? i.status,
      linked_report_id: i.linkedReportId ?? '',
      notes: i.notes ?? '',
    })),

    installation: {
      earthing: data.earthingArrangement === 'unknown' ? DASH : data.earthingArrangement,
      ze: withUnit(data.ze, 'Ω'),
      cu_make: text(data.consumerUnitMake),
      cu_labelled: triLabel(data.consumerUnitLabelled),
      cu_condition: text(data.consumerUnitCondition),
      circuit_ref: text(data.targetCircuitRef),
      circuit_kind: CIRCUIT_KIND_LABEL[data.targetCircuitKind] ?? DASH,
      protection: PROTECTION_LABEL[data.circuitProtection] ?? DASH,
      device_rating: text(data.protectiveDeviceRating),
      rcd_type: RCD_TYPE_LABEL[data.rcdType] ?? DASH,
      rcd_bidirectional: triLabel(data.rcdBidirectionalConfirmed),
      rcd_ma: withUnit(data.rcdRatingMa, 'mA'),
      socket_condition: triLabel(data.socketConditionSatisfactory, 'Satisfactory', 'Unsatisfactory'),
      connection_method: CONNECTION_LABEL[data.connectionMethod] ?? DASH,
    },

    device: {
      make: text(data.deviceMake),
      model: data.deviceModel?.trim() ?? '',
      serial: text(data.deviceSerial),
      on_register_label: triLabel(
        data.onEnaTypeTestRegister,
        'Yes — confirmed compliant',
        'No — not confirmed compliant',
      ),
      ena_reference: text(data.enaRegisterReference),
      declaration_label: triLabel(data.ipsDeclarationPresent),
      apparent_power_va: withUnit(data.inverterApparentPowerVa, 'VA'),
      module_summary: moduleSummary,
      total_dc_w: totalDc === undefined ? DASH : `${totalDc.toLocaleString('en-GB')} W DC`,
      protection_class: PROTECTION_CLASS_LABEL[data.protectionClass] ?? DASH,
      plug_fuse_a: withUnit(data.plugFuseRatingA, 'A'),
      battery_label: boolLabel(data.hasBatteryStorage, 'Present — outside this route', 'None'),
    },

    siting: {
      mounting_surface: SURFACE_LABEL[data.mountingSurface] ?? DASH,
      mounting_type: text(data.mountingType),
      height_m: withUnit(data.heightAboveGroundM, 'm'),
      remediation: triLabel(data.subjectToExternalWallRemediation),
      party_wall: boolLabel(data.onPartyBoundaryWall),
      lightning: boolLabel(data.hasLightningProtection),
      fixings: triLabel(data.fixingsReversible),
    },

    verification: {
      polarity: triLabel(data.polarityConfirmed, 'Confirmed', 'Not confirmed'),
      zs: withUnit(data.zsAtSocket, 'Ω'),
      cpc: withUnit(data.cpcContinuity, 'Ω'),
      trip_time: withUnit(data.rcdTripTimeMs, 'ms'),
      test_button: triLabel(data.rcdTestButtonOperated, 'Satisfactory', 'Unsatisfactory'),
      functional: triLabel(data.functionalCheckPassed),
      loss_of_mains: triLabel(
        data.lossOfMainsProven,
        'Yes — export ceased on isolation',
        'Not proven',
      ),
      notes: data.verificationNotes?.trim() ?? '',
    },

    handover: {
      dno_name: text(data.dnoName),
      notified: triLabel(data.dnoNotified, 'Submitted', 'Not yet'),
      reference: text(data.dnoNotificationReference),
      date: ukDate(data.dnoNotificationDate) || DASH,
      notify_by: notifyByDate(data.commissioningDate),
      label_affixed: triLabel(data.consumerUnitLabelAffixed),
      deregistration: triLabel(data.deregistrationExplained),
      test_button_routine: triLabel(data.testButtonRoutineExplained),
      permission: PERMISSION_LABEL[data.ownerPermissionObtained] ?? DASH,
      insurance: triLabel(data.insuranceAdvised),
      handout: triLabel(data.handoutIssued),
    },

    signatures: {
      assessor_name: text(data.assessorName),
      assessor_signature: data.assessorSignature ?? '',
      commissioning_name: data.commissioningEngineerName?.trim() ?? '',
      commissioning_signature: data.commissioningSignature ?? '',
    },

    limits: {
      max_va: PLUG_IN_SOLAR_FACTS.maxApparentPowerVA,
      max_dc_w: PLUG_IN_SOLAR_FACTS.maxPvModuleDcW.toLocaleString('en-GB'),
      assessment_threshold_w: PLUG_IN_SOLAR_FACTS.professionalAssessmentThresholdW,
      notification_days: PLUG_IN_SOLAR_FACTS.dnoNotificationWindowDays,
    },

    photos: {
      consumer_unit: photos?.consumerUnit ?? [],
      siting: photos?.siting ?? [],
      any: (photos?.consumerUnit?.length ?? 0) + (photos?.siting?.length ?? 0) > 0,
    },

    notes: data.notes?.trim() ?? '',
  };
}
