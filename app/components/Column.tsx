"use client";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import { Task, useTaskStore } from "@/lib/task-store";

const Column = ({
  title,
  status,
  tasks,
}: {
  title: string;
  status: string;
  tasks: Task[];
}) => {
  const filterTask = useMemo(
    () => tasks.filter((task) => task.status === status),
    [status, tasks]
  );

  return (
    <section className="h-[700px]  flex-1  w-96">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div
        // onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-3.5 h-full w-full flex-1 rounded-xl overflow-hidden hover:overflow-y-scroll bg-gray-700/50 p-4"
      >
        <div className="flex flex-col gap-4 ">
          {filterTask.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              status={task.status}
              type={task.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Column;
