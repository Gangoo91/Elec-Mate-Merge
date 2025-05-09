
import RecentActivity from "./RecentActivity";
import QuickTasks from "./QuickTasks";
import { SystemEvent } from "../types";

interface OverviewCardsProps {
  events: SystemEvent[];
}

const OverviewCards = ({ events }: OverviewCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <RecentActivity events={events} />
      <QuickTasks />
    </div>
  );
};

export default OverviewCards;
