import { useState } from "react";
import DatePicker from "./components/DatePicker";
import TableAvailability from "./components/TabelAvailability";

const ResourcePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="min-h-screen  p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Office Reservation System
        </h1>
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <TableAvailability selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default ResourcePage;
