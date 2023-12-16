"use client";
import React, { useEffect } from "react";
import Column from "./Column";
import { useTaskStore, STATUS } from "@/lib/task-store";

const status: { title: string; type: STATUS }[] = [
  { title: "To Do", type: "TODO" },
  { title: "In Progress ", type: "INPROGRESS" },
  { title: "In Review", type: "INREVIEW" },
  { title: "Done", type: "DONE" },
];

const Columns = () => {
  return (
    <div className="flex space-x-7 ml-5 mt-7">
      {status.map((status, index) => {
        return <Column key={index} title={status.title} status={status.type} />;
      })}
    </div>
  );
};

export default Columns;
