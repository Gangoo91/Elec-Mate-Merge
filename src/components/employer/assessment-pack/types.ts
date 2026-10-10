/** The shape get_assessment_pack returns (ELE-2069). */

export interface PackQualification {
  code: string;
  label: string;
  category: string | null;
  awarding_body: string | null;
  achieved: string | null;
  expiry: string | null;
  number: string | null;
  verification: string | null;
  training_status: string | null;
  has_document: boolean;
}

export interface PackPerson {
  id: string;
  name: string;
  role: string | null;
  team_role: string | null;
  is_principal_qs: boolean;
  linked: boolean;
  is_owner: boolean | null;
  ecs_card: { type: string | null; expiry: string | null; level: string | null } | null;
  qualifications: PackQualification[];
}

export interface PackCertificate {
  id: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  issued_on: string;
  user_id: string;
  owner_name: string;
  has_pdf: boolean;
  pdf_url: string | null;
  job_id: string | null;
  qs_status: 'pending' | 'approved' | 'returned' | null;
  part_p_verdict: 'yes' | 'no' | 'unknown';
  part_p: {
    status: string;
    deadline: string | null;
    submitted_at: string | null;
    reference: string | null;
    certificate_url: string | null;
  } | null;
  c1c2: number;
}

export interface PackQsReview {
  id: string;
  report_id: string;
  report_type: string;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_name: string | null;
  self_certified: boolean;
  electrician: string;
  reasons: string[];
  comments: string | null;
}

export interface PackInstrument {
  id: string;
  name: string;
  category: string | null;
  serial: string | null;
  status: string | null;
  last_calibration: string | null;
  next_calibration: string | null;
  holder: string | null;
  checks: {
    checked_on: string;
    result: string;
    next_due: string | null;
    certificate_ref: string | null;
    by: string | null;
  }[];
}

export interface PackDocument {
  id: string;
  title: string;
  category: string | null;
  document_type: string | null;
  expiry_date: string | null;
  file_url: string | null;
  insurance_kind: string | null;
  insurer: string | null;
  policy_number: string | null;
  cover_amount: number | null;
  status: string | null;
  /** Gap #10 (client-side): the Settings record (public liability, scheme). */
  source?: 'settings';
  /** The register row that holds this record's file, when it is not `id`. */
  file_id?: string | null;
  accreditation?: string | null;
  cover_text?: string | null;
}

export interface PackPolicy {
  id: string;
  name: string;
  status: string | null;
  version: number | null;
  published_version: number | null;
  published_at: string | null;
  review_date: string | null;
  category: string | null;
  acknowledged: number;
}

export interface PackComplaint {
  id: string;
  kind: 'customer' | 'data_protection';
  received_on: string;
  channel: string;
  complainant_name: string | null;
  summary: string;
  owner_name: string | null;
  acknowledged_on: string | null;
  response_due: string | null;
  outcome: string | null;
  outcome_kind: string | null;
  ico_route_given: boolean;
  closed_on: string | null;
}

export interface AssessmentPackData {
  period: { from: string; to: string };
  firm: {
    company_name: string | null;
    address: string | null;
    postcode: string | null;
    registration_scheme: string | null;
    registration_number: string | null;
    registration_expiry: string | null;
    owner_is_qs: boolean;
    qs_approval_required: boolean;
    inspector_name: string | null;
    inspector_qualifications: string[] | null;
    insurance_provider: string | null;
    insurance_policy_number: string | null;
    insurance_coverage: string | null;
    insurance_expiry: string | null;
    testing_instruments: unknown;
  } | null;
  owner_name: string | null;
  team: PackPerson[];
  certificates: PackCertificate[];
  qs_reviews: PackQsReview[];
  instruments: PackInstrument[];
  complaints: PackComplaint[];
  documents: PackDocument[];
  policies: PackPolicy[];
}
