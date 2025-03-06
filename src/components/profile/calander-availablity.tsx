"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {getSession} from "next-auth/react";
import {Loader2} from "lucide-react";
import {getAvailability, updateAvailability} from "@/services/api";

// Define interface for schedule item
interface ScheduleItem {
  weekday: string;
  is_available: boolean;
  available_from: string | null;
  available_to: string | null;
}

// Define interface for API response
interface ProfileResponse {
  profile: {
    schedule: ScheduleItem[];
  }
}

const weekdays = [
  { id: "Monday", label: "Monday" },
  { id: "Tuesday", label: "Tuesday" },
  { id: "Wednesday", label: "Wednesday" },
  { id: "Thursday", label: "Thursday" },
  { id: "Friday", label: "Friday" },
  { id: "Saturday", label: "Saturday" },
  { id: "Sunday", label: "Sunday" },
];

const CalendarAvailability = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [availability, setAvailability] = useState<{
    [key: string]: { start: string; end: string };
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch existing availability on component mount
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if(session?.accessToken){
          const token = session.accessToken;
          const response = await getAvailability(token);

          if (!response.ok) {
            throw new Error('Failed to fetch availability');
          }

          const data: ProfileResponse = await response.json();
          const schedule = data?.profile?.schedule || [];

          // Process fetched schedule
          const fetchedSelectedDays: string[] = [];
          const fetchedAvailability: {[key: string]: { start: string; end: string }} = {};

          schedule.forEach((day: ScheduleItem) => {
            if (day.is_available && day.available_from && day.available_to) {
              fetchedSelectedDays.push(day.weekday);
              fetchedAvailability[day.weekday] = {
                start: day.available_from,
                end: day.available_to
              };
            }
          });

          setSelectedDays(fetchedSelectedDays);
          setAvailability(fetchedAvailability);
        }

      } catch (error) {
        console.error('Error fetching availability:', error);
      }finally {
        setLoading(false);
      }
    };
      fetchAvailability();
  }, []);

  // Handle weekday selection
  const handleDayChange = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      // Remove day
      setSelectedDays(selectedDays.filter((day) => day !== dayId));
      const newAvailability = { ...availability };
      delete newAvailability[dayId];
      setAvailability(newAvailability);
    } else {
      // Add day
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

  // Save availability to API
  const saveAvailability = async () => {
    setIsLoading(true);
    try {
      const session = await getSession();
      if (session?.accessToken) {
        const token = session.accessToken;
        const schedule: ScheduleItem[] = weekdays.map(day => ({
          weekday: day.id,
          is_available: selectedDays.includes(day.id),
          available_from: selectedDays.includes(day.id) ? availability[day.id].start : null,
          available_to: selectedDays.includes(day.id) ? availability[day.id].end : null
        }));
        const response = await updateAvailability(token, schedule);

        if (!response.ok) {
          throw new Error('Failed to save availability');
        }
      }
      // Prepare schedule payload
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-lg">Loading...</p>
        </div>
    );
  }

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
            onClick={saveAvailability}
            disabled={isLoading}
            className="mt-6 text-white"
        >
          {isLoading ? 'Saving...' : 'Save Availability'}
        </Button>
      </div>
  );
};

export default CalendarAvailability;