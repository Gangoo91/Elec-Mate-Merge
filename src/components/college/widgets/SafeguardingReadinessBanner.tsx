import { useNavigate } from 'react-router-dom';
import { HubAlertLine } from '@/components/hub/HubPrimitives';
import { useCollegeSafeguardingReadiness } from '@/hooks/useCollegeSafeguardingReadiness';

/* ==========================================================================
   SafeguardingReadinessBanner — the config gate that cannot be missed.

   Renders ONLY when the college can't route a safeguarding concern to a
   designated person (no DSL/deputy with a linked account). A logged
   safeguarding disclosure is always recorded, but without a routable DSL
   the alert reaches nobody — so this makes the gap unmissable and one tap
   from being fixed.

   Two states:
     - a DSL is flagged but has no account (can't receive) → link them
     - no DSL is designated at all → assign one
   Quiet (renders nothing) the moment a routable DSL exists.

   It is a HubAlertLine, the same row the Business Hub uses for an overdue
   invoice: neutral surface, volt words, whole row the tap target. The old
   rose wash, pulsing dot and rose button were three things competing with
   the one solid volt card in the quick-start strip beneath.
   ========================================================================== */

export function SafeguardingReadinessBanner() {
  const navigate = useNavigate();
  const { loading, canRoute, unlinkedLeads } = useCollegeSafeguardingReadiness();

  if (loading || canRoute) return null;

  const hasUnlinked = unlinkedLeads.length > 0;
  const one = unlinkedLeads.length === 1;

  const text = hasUnlinked
    ? `${unlinkedLeads.join(', ')} ${one ? 'is' : 'are'} marked as a safeguarding lead but ${one ? 'has' : 'have'} no account, so safeguarding alerts can't reach ${one ? 'them' : 'anyone'}.`
    : 'No Designated Safeguarding Lead can receive alerts. Set one up before going live with learners.';

  return (
    <HubAlertLine
      text={text}
      action={hasUnlinked ? 'Link account' : 'Assign a DSL'}
      onClick={() => navigate('/college?section=tutors')}
    />
  );
}
