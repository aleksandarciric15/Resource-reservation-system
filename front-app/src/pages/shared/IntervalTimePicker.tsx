import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IntervalTimePickerProps {
  workStartTime: string;
  workEndTime: string;
  onIntervalSelect: (startTime: string, endTime: string) => void;
}

export function IntervalTimePicker({
  workStartTime,
  workEndTime,
  onIntervalSelect,
}: IntervalTimePickerProps) {
  const [startTime, setStartTime] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();

  const generateTimeOptions = (start: string, end: string) => {
    const options: string[] = [];
    const currentTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);

    while (currentTime <= endTime) {
      options.push(
        currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      currentTime.setHours(currentTime.getHours() + 1);
    }

    return options;
  };

  const timeOptions = generateTimeOptions(workStartTime, workEndTime);

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    if (
      endTime &&
      new Date(`2000-01-01T${time}`) >= new Date(`2000-01-01T${endTime}`)
    ) {
      setEndTime(undefined);
    }
    if (endTime) {
      onIntervalSelect(time, endTime);
    }
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    if (startTime) {
      onIntervalSelect(startTime, time);
    }
  };

  return (
    <div className="flex space-x-4">
      <Select onValueChange={handleStartTimeChange} value={startTime}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Start Time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.slice(0, -1).map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={handleEndTimeChange} value={endTime}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="End Time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions
            .slice(1)
            .filter(
              (time) =>
                !startTime ||
                new Date(`2000-01-01T${time}`) >
                  new Date(`2000-01-01T${startTime}`)
            )
            .map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
