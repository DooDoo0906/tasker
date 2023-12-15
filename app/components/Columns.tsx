"use client";
import React, { useEffect } from "react";
import Column from "./Column";
import { useTaskStore } from "@/lib/task-store";

const status = [
  { title: "To Do", type: "TODO" },
  { title: "In Progress ", type: "INPROGRESS" },
  { title: "In Review", type: "INREVIEW" },
  { title: "Done", type: "DONE" },
];

const Columns = () => {
  const getTask = useTaskStore((state) => state.fetchTask);
  const tasks = useTaskStore((state) => state.tasks);
  useEffect(() => {
    getTask()
  }, []);
  return (
    <div className="flex space-x-7 ml-5 mt-10 max-md:hidden">
      {status.map((status, index) => {
        return (
          <Column
            key={index}
            title={status.title}
            status={status.type}
            tasks={tasks}
          />
        );
      })}
    </div>
  );
};

export default Columns;
