"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  const [dateOrigin, setDateOrigin] = useState<
    { title: string; start: Date; end?: Date }[]
  >([
    {
      title: "Good event123",
      start: new Date("Tue Jan 09 2024 09:00:00"),
      end: new Date("Tue Jan 09 2024 21:00:00"),
    },
    { title: "Good event123", start: new Date() },
  ]);
  const handleEventChange = (date: Date | null) => {
    const newDate = new Date();
    if (date) {
      newDate.setTime(date?.getTime());
    }
    setDateOrigin([...dateOrigin, { title: "new event", start: newDate }]);
  };
  return (
    <div className="w-[1650px] bg-gray-700/50">
      <FullCalendar
        height={800}
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        eventDrop={(e) => handleEventChange(e.event.start)}
        events={dateOrigin}
        selectable={true}
        selectMirror={true}
      />
    </div>
  );
};

export default Calendar;
