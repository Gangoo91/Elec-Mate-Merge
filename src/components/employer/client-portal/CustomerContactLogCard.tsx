/**
 * On the client record (ELE-1822): every booking confirmation, "On my way",
 * evening-before reminder and review ask sent from this client's jobs, newest
 * first. Hidden until there is something to show.
 */
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useCustomerContactLog } from '@/hooks/useCustomerMessages';

export function CustomerContactLogCard({ customerId }: { customerId: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: firm } = useQuery({
    queryKey: ['acting-firm', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
  const { data: rows = [] } = useCustomerContactLog(customerId, firm);
  if (!rows.length) return null;

  return (
    <div data-help="clients.contact-log" className="rounded-2xl border border-white/[0.1] bg-white/[0.04]">
      <div className="px-4 pt-3.5 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">Messages sent from jobs</p>
      </div>
      <ul className="divide-y divide-white/[0.07]">
        {rows.slice(0, 8).map((r, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => navigate(`/employer?section=jobs&job=${r.job_id}`)}
              className="w-full px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.04]"
            >
              <p className="text-[13.5px] text-white">{r.text}</p>
              <p className="text-[11.5px] text-white">
                {[r.job, r.who, format(parseISO(r.at), 'd MMM, HH:mm')].filter(Boolean).join(' · ')}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
