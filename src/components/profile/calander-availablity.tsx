"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // shadcn/ui Checkbox
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Label } from "@/components/ui/label"; // shadcn/ui Label

const weekdays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const CalendarAvailability = ({user}:{user: {name: string;}}) => {
  console.log(user);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [availability, setAvailability] = useState<{
    [key: string]: { start: string; end: string };
  }>({});

  // Handle weekday selection
  const handleDayChange = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((day) => day !== dayId));
      const newAvailability = { ...availability };
      delete newAvailability[dayId];
      setAvailability(newAvailability);
    } else {
      setSelectedDays([...selectedDays, dayId]);
      setAvailability({
        ...availability,
        [dayId]: { start: "09:00", end: "17:00" }, // Default time range
      });
    }
  };

  // Handle time change for a specific day
  const handleTimeChange = (dayId: string, type: "start" | "end", value: string) => {
    setAvailability({
      ...availability,
      [dayId]: {
        ...availability[dayId],
        [type]: value,
      },
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Set Your Availability</h2>

      {/* Weekday Selection with Time Inputs */}
      <div className="">

        {/* Weekday Rows */}
        {weekdays.map((day) => (
        <div key={day.id} className="[&:not(:last-child)]:border-b ">
          <div className="grid md:grid-cols-12 gap-4 items-center pt-3 pb-4">
            {/* Checkbox and Label */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <Checkbox
                id={day.id}
                className="data-[state=checked]:text-white"
                checked={selectedDays.includes(day.id)}
                onCheckedChange={() => handleDayChange(day.id)}
              />
              <Label htmlFor={day.id} className="text-sm font-medium">
                {day.label}
              </Label>
            </div>

            {/* Time Inputs (only shown if the day is selected) */}
            {selectedDays.includes(day.id) && (
              <div className="md:col-span-8 flex items-center gap-4">
                <div className="">
                  <Input
                    type="time"
                    value={availability[day.id]?.start || "09:00"}
                    onChange={(e) => handleTimeChange(day.id, "start", e.target.value)}
                    className="w-fit"
                  />
                </div>
                -
                <div className="">
                  <Input
                    type="time"
                    value={availability[day.id]?.end || "17:00"}
                    onChange={(e) => handleTimeChange(day.id, "end", e.target.value)}
                    className="w-fit"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        ))}
      </div>

      {/* Submit Button */}
      <Button
        onClick={() => console.log("Availability:", availability)}
        className="mt-6 text-white"
      >
        Save Availability
      </Button>
    </div>
  );
};

export default CalendarAvailability;