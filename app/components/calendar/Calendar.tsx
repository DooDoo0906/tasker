"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { createMeetings } from "@/utils/meetings";
import { useMeetingStore } from "@/stores/meeting-store";

const Calendar = () => {
  const getMeetings = useMeetingStore((state) => state.fetchMeeting);
  const meetings = useMeetingStore((state) => state.meetings);

  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  const handleNewMeeting = async () => {
    await createMeetings();
  };
  return (
    <>
      <button className="" onClick={handleNewMeeting}>
        Test Create meeting
      </button>{" "}
      <div className="w-[1650px] bg-gray-700/50">
        <FullCalendar
          height={700}
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
          eventMouseEnter={(e) => {
            console.log("e", e.event);
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          // eventDrop={(e) => handleEventChange(e.event.start)}
          events={meetings}
          selectable={true}
          selectMirror={true}
        />
      </div>
    </>
  );
};

export default Calendar;
