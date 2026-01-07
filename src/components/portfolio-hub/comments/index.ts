// Portfolio Comments Components - Phase 3 Live Comments

export { CommentThread } from './CommentThread';
export {
  EvidenceComments,
  EvidenceCommentsIndicator,
  CommentsSummary,
} from './EvidenceComments';

// Re-export types from hook
export type {
  PortfolioComment,
  CommentThread as CommentThreadType,
} from '@/hooks/portfolio/usePortfolioComments';
