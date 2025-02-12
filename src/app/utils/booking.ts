export const getNext30Days = (): { date: string }[] => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i);

    
    const day = String(futureDate.getDate()).padStart(2, "0");
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const year = futureDate.getFullYear();

    dates.push({ date: `${day}/${month}/${year}` });
  }

  return dates;
};

export const formatSlots = (
  timings: { end_time: string; start_time: string; is_available: boolean }[]
): { stime: string; etime: string }[] => {
  return timings
    .filter((slot) => slot.is_available) 
    .map((slot) => {
      const sdate = new Date(slot.start_time);
      const edate = new Date(slot.end_time);

      return {
        stime: sdate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        etime: edate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });
};
export const convertToISOString = (date: string, time: string) => {
  
  const [day, month, year] = date.split("/").map(Number);


  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0; 
  }

  const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

  return utcDate.toISOString();
};