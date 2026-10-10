/**
 * MIS sync, step 2 (ELE-2058): direct connectors. DESIGN AND INTERFACE ONLY.
 *
 * Nothing here calls an MIS. A connector is built and switched on for a
 * college only when that college supplies credentials for a test tenant, so
 * it can be proven against real responses. Until then the MIS sync page shows
 * these as "needs your credentials", and step 1 (saved file mappings) does
 * the work.
 *
 * Whatever the source, a connector produces the same MisRow the file import
 * produces (src/lib/college/misImport.ts) and hands it to the same
 * college_mis_apply() and roster import, so matching, the dry run, the audit
 * trail and "never create a login without the roster import" stay one path.
 *
 * Sources, checked 10 Oct 2026:
 *  - Tribal Maytas (Tribal Edge): Power Platform connector "Tribal - Maytas
 *    (Preview)". Connection parameters: Environment (Live, Testing or
 *    Development), Region (EMEA or APAC), Edge Tenant Id. Actions: create,
 *    read, read a collection (OData $filter, $top, $skip, $select, $expand),
 *    update an entity, and a raw HTTP request to a relative OData URL such as
 *    "odata/main/trainee". Trigger "When an event happens" (event name and
 *    type, e.g. Updated or Created) returns identifiers only, which then need
 *    a read. Throttled to 100 calls per connection per 60 seconds.
 *    https://learn.microsoft.com/en-us/connectors/tribalmaytas/
 *  - Tribal ebs: REST services to create and update people, addresses,
 *    organisations, enquiries, applications and enrolments, and to submit
 *    register marks. Endpoint, verb and authentication details sit in the
 *    per-service reference (docs.ebs.tribalgroup.com/wsdocs/), which needs
 *    the college's ebs instance to confirm.
 *    https://docs.ebs.tribalgroup.com/content/REST%20Services/REST%20Services.htm
 *  - ProSolution and UNIT-e: no public API (ProSolution's API library is
 *    through the account manager); both export ILR XML and CSV, which step 1
 *    reads.
 */

import type { MisRow, MisSystem } from './misImport';

export type ConnectorStatus = 'design' | 'needs_credentials' | 'testing' | 'live';

/** What a direct connector must do. Implemented server-side (an edge function), never in the browser. */
export interface MisConnector {
  system: MisSystem;
  /** Read learners and their programme dates changed since a point in time. */
  pullLearners(since: string | null, signal?: AbortSignal): AsyncIterable<MisRow[]>;
  /** Optional: subscribe to the MIS's change events (Maytas webhooks return ids only). */
  subscribe?(callbackUrl: string): Promise<{ subscriptionId: string }>;
  /** Optional, later: write register marks back (ebs documents this service). */
  pushRegisterMarks?(
    marks: Array<{ learner_ref: string; date: string; session: string; mark: string }>
  ): Promise<void>;
}

export interface ConnectorDesign {
  system: MisSystem;
  name: string;
  status: ConnectorStatus;
  /** What the hub would read, in plain words. */
  reads: string[];
  /** What the college must supply before it can be built and tested. */
  collegeSupplies: string[];
  limits: string[];
  source: string;
}

export const CONNECTOR_DESIGNS: ConnectorDesign[] = [
  {
    system: 'maytas',
    name: 'Tribal Maytas',
    status: 'needs_credentials',
    reads: [
      'Trainees (learners) with ULN and learner reference, read as an OData collection filtered on last change',
      'Programme start, planned end and actual end dates',
      'Change events (created or updated), which return identifiers that are then read',
    ],
    collegeSupplies: [
      'A Tribal Edge user on a Testing or Development environment with read permission and permission to subscribe to events',
      'The Edge tenant id and region (EMEA or APAC)',
      'Confirmation from Tribal of the OData entity names for trainees and programmes on your tenant',
    ],
    limits: [
      '100 calls per connection per 60 seconds, so a full read pages slowly and changes come by event',
    ],
    source: 'https://learn.microsoft.com/en-us/connectors/tribalmaytas/',
  },
  {
    system: 'ebs',
    name: 'Tribal ebs',
    status: 'needs_credentials',
    reads: [
      'People and enrolments (learner reference, ULN, enrolment start and end)',
      'Later, register marks written back from the hub',
    ],
    collegeSupplies: [
      'The base address of your ebs REST services and a test instance',
      'A service account and the authentication your ebs uses for REST',
      'The per-service reference for people and enrolments on your version',
    ],
    limits: ['Rate limits are not published; agreed with your ebs administrator'],
    source: 'https://docs.ebs.tribalgroup.com/content/REST%20Services/REST%20Services.htm',
  },
  {
    system: 'prosolution',
    name: 'ProSolution',
    status: 'design',
    reads: ['No public API. Use a saved CSV mapping or the ILR XML export above.'],
    collegeSupplies: [
      'If you hold the ProSolution API library from your account manager, share it and we will assess it',
    ],
    limits: [],
    source: 'https://www.oneadvanced.com/about-us/partners/api-library/',
  },
  {
    system: 'unit_e',
    name: 'UNIT-e',
    status: 'design',
    reads: ['No public API. Use a saved CSV mapping or the ILR XML export above.'],
    collegeSupplies: [],
    limits: [],
    source: '',
  },
];
