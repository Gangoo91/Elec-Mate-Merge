import type {
  SparkTask,
  SaveTaskInput,
  UpdateTaskInput,
} from '@/hooks/useSparkTasks';
import type {
  SparkProject,
  CreateProjectInput,
} from '@/hooks/useSparkProjects';
import type { Customer } from '@/hooks/useCustomers';

export type ChatRole = 'user' | 'assistant';

export interface RecentChat {
  id: string;
  title: string | null;
  lastMessageAt: string;
}

export interface Clarification {
  question: string;
  context?: string | null;
  options: Array<{ label: string; value: string }>;
  allowFreeText?: boolean;
  /** Set when the user picks an option so the chips collapse. */
  answeredWith?: string;
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
  citations?: Array<{ ref: string; topic: string }>;
  actions?: ProposedAction[];
  clarification?: Clarification;
  /** Index → resolved status for the action cards rendered with this message. */
  resolved?: Array<'pending' | 'applied' | 'rejected'>;
}

export type ProjectPatch = Partial<CreateProjectInput> & { customerName?: string };
export type CustomerInput = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;
export type CustomerPatch = Partial<CustomerInput>;

export interface DraftMessagePayload {
  to?: string;
  toName: string;
  subject: string;
  body: string;
  invoiceId?: string;
  quoteId?: string;
  customerId?: string;
  purpose?: 'chase-invoice' | 'follow-up-quote' | 'appointment' | 'general';
}

export interface HasRationale {
  rationale?: string;
}

export type ProposedAction = HasRationale &
  (
    | {
        type: 'create-task';
        tempId: string;
        payload: SaveTaskInput & { customerName?: string };
      }
    | {
        type: 'create-snag';
        tempId: string;
        payload: SaveTaskInput & { customerName?: string };
      }
    | {
        type: 'create-project';
        tempId: string;
        payload: CreateProjectInput & { customerName?: string };
      }
    | {
        type: 'create-customer';
        tempId: string;
        payload: CustomerInput;
      }
    | {
        type: 'draft-message';
        tempId: string;
        payload: DraftMessagePayload;
      }
    | {
        type: 'amend-task';
        id: string;
        patch: UpdateTaskInput & { customerName?: string };
      }
    | {
        type: 'amend-project';
        id: string;
        patch: ProjectPatch;
      }
    | {
        type: 'amend-customer';
        id: string;
        patch: CustomerPatch;
      }
    | { type: 'complete-task'; id: string }
    | { type: 'complete-project'; id: string }
    | { type: 'delete-task'; id: string }
    | { type: 'delete-project'; id: string }
    | { type: 'delete-customer'; id: string }
  );

// Re-export for consumers that only import from types.ts
export type { SparkTask, SparkProject, Customer };
