export type PropertyType = 'residential' | 'commercial' | 'industrial';
export type SiteVisitStatus = 'in_progress' | 'completed' | 'scope_sent' | 'signed' | 'post_job';
export type PhotoPhase = 'before' | 'after';
export type ShareLinkStatus = 'active' | 'signed' | 'expired' | 'revoked';
export type ChecklistStatus = 'pending' | 'in_progress' | 'completed';
export type RoomType =
  | 'kitchen'
  | 'living_room'
  | 'dining_room'
  | 'bedroom_1'
  | 'bedroom_2'
  | 'bedroom_3'
  | 'bedroom_4'
  | 'bathroom'
  | 'en_suite'
  | 'hallway'
  | 'landing'
  | 'loft'
  | 'garage'
  | 'garden_external'
  | 'utility'
  | 'study_office'
  | 'conservatory'
  | 'custom';

export interface SiteVisit {
  id: string;
  userId: string;
  customerId?: string;
  propertyAddress?: string;
  propertyPostcode?: string;
  propertyType?: PropertyType;
  accessNotes?: string;
  status: SiteVisitStatus;
  quoteId?: string;
  photoProjectId?: string;
  invoiceId?: string;
  rooms: SiteVisitRoom[];
  prompts: SiteVisitPrompt[];
  photos: SiteVisitPhoto[];
  createdAt?: string;
  updatedAt?: string;
  // Client details (denormalised for convenience during capture)
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface SiteVisitRoom {
  id: string;
  siteVisitId: string;
  roomName: string;
  roomType: RoomType;
  sortOrder: number;
  notes?: string;
  items: SiteVisitItem[];
}

export interface SiteVisitItem {
  id: string;
  roomId: string;
  itemType: string;
  itemDescription: string;
  quantity: number;
  unit: string;
  notes?: string;
  sortOrder: number;
}

export interface SiteVisitPhoto {
  id: string;
  siteVisitId: string;
  roomId?: string;
  itemId?: string;
  safetyPhotoId?: string;
  photoUrl: string;
  storagePath?: string;
  description?: string;
  photoPhase: PhotoPhase;
}

export interface SiteVisitPrompt {
  id: string;
  siteVisitId: string;
  roomId?: string;
  promptKey: string;
  promptQuestion: string;
  response?: string;
}

export interface ScopeBaseline {
  id: string;
  siteVisitId: string;
  quoteId?: string;
  baselineData: Record<string, unknown>;
  lockedAt: string;
  lockedBy: string;
}

export interface ScopeShareLink {
  id: string;
  userId: string;
  siteVisitId: string;
  shareToken: string;
  title?: string;
  scopeData: Record<string, unknown>;
  assumptions?: string;
  companyName?: string;
  requiresSignature: boolean;
  clientName?: string;
  clientEmail?: string;
  signatureData?: string;
  signedAt?: string;
  signerIp?: string;
  viewCount: number;
  lastViewedAt?: string;
  expiresAt?: string;
  status: ShareLinkStatus;
  createdAt?: string;
}

export interface PreStartChecklist {
  id: string;
  siteVisitId: string;
  userId: string;
  items: PreStartChecklistItem[];
  status: ChecklistStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PreStartChecklistItem {
  id: string;
  category: string;
  description: string;
  checked: boolean;
  required: boolean;
  source: 'standard' | 'prompt' | 'room';
}

export interface CompletionSignoff {
  id: string;
  userId: string;
  siteVisitId: string;
  shareToken: string;
  title?: string;
  scopeSummary?: Record<string, unknown>;
  beforePhotoUrls: string[];
  afterPhotoUrls: string[];
  companyName?: string;
  requiresSignature: boolean;
  clientName?: string;
  clientEmail?: string;
  signatureData?: string;
  signedAt?: string;
  viewCount: number;
  lastViewedAt?: string;
  expiresAt?: string;
  status: ShareLinkStatus;
  createdAt?: string;
}
