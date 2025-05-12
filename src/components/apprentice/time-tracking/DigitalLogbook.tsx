
import { useLogbookEntries } from "@/hooks/time-tracking/useLogbookEntries";
import LogbookHeader from "./logbook/LogbookHeader";
import LogbookEmptyState from "./logbook/LogbookEmptyState";
import LogbookDayEntries from "./logbook/LogbookDayEntries";

const DigitalLogbook = () => {
  const {
    months,
    filterMonth,
    setFilterMonth,
    entriesByDate,
    addTimeEntry,
    handleSaveEntry,
    handleDeleteEntry,
    handleClearAllEntries,
    hasEntries
  } = useLogbookEntries();

  return (
    <div className="space-y-6">
      <LogbookHeader
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        months={months}
        onAddEntry={addTimeEntry}
        onClearAllEntries={hasEntries ? handleClearAllEntries : undefined}
      />

      {!hasEntries ? (
        <LogbookEmptyState onAddEntry={addTimeEntry} />
      ) : (
        <div className="space-y-6">
          {Object.entries(entriesByDate)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .map(([date, dayEntries]) => (
              <LogbookDayEntries
                key={date}
                date={date}
                entries={dayEntries}
                onSave={handleSaveEntry}
                onDelete={handleDeleteEntry}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default DigitalLogbook;
