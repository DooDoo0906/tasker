"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMeetingStore } from "@/stores/meeting-store";
import { Button } from "../ui/button";
import AddMeetingDialog from "./AddMeetingDialog";

const Calendar = () => {
  const [openPopUp, setOpenPopup] = useState(false);
  const getMeetings = useMeetingStore((state) => state.fetchMeeting);
  const meetings = useMeetingStore((state) => state.meetings);
  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  return (
    <>
      <div className="flex">
        <div className="flex-1"></div>
        {!openPopUp ? (
          <Button
            onClick={() => setOpenPopup(!openPopUp)}
            className="bg-green-500 py-2 px-5 mb-5 rounded-md font-bold text-white"
            variant="secondary"
            size="sm"
          >
            Add Meeting +
          </Button>
        ) : (
          <AddMeetingDialog
            isEdit
            openPop={openPopUp}
            action={() => setOpenPopup(false)}
          />
        )}
      </div>
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
