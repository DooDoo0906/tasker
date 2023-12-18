"use client";
import React, { useEffect, useMemo } from "react";
import TaskCard from "./TaskCard";
import { STATUS, useTaskStore } from "@/lib/task-store";
import { cn } from "@/lib/utils";
import { showToast } from "@/hooks/UseToast";

export default function Column({
  title,
  status,
}: {
  title: string;
  status: STATUS;
}) {
  const getTask = useTaskStore((state) => state.fetchTask);
  const tasks = useTaskStore((state) => state.tasks);
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const dragId = useTaskStore((state) => state.dragId);
  const dragStatus = useTaskStore((state) => state.statusDrag);
  const dragTaskDone = useTaskStore((state) => state.dragTask);
  useEffect(() => {
    getTask();
  }, [getTask]);

  const filterTask = useMemo(() => {
    console.log(
      "test task",
      tasks.filter((task) => task.status === status)
    );
    return tasks.filter((task) => task.status === status);
  }, [status, tasks]);
  const handleDrop = async () => {
    if (!dragId || dragStatus === status) {
      return;
    }
    updateStatus(dragId, status);
    getTask();
    dragTaskDone(null, "TODO");
    showToast("Update Successfully", "success");
  };

  return (
    <section className="h-[600px] flex-1 w-96">
      <h2
        className={cn(
          "text-2xl font-semibold text-center bg-gray-700/50 py-2 rounded-md",
          {
            "border-t-2 border-green-500": status === "DONE",
            "border-t-2 border-gray-400": status === "TODO",
            "border-t-2 border-orange-300": status === "INPROGRESS",
            "border-t-2 border-blue-400": status === "INREVIEW",
          }
        )}
      >
        {title}
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-3.5 h-full w-full flex-1 rounded-xl overflow-hidden hover:overflow-y-scroll bg-gray-700/50 p-4"
      >
        <div className="flex flex-col gap-4 ">
          {filterTask.map((task, index) => {
            return (
              <TaskCard
                key={index}
                id={task.id}
                title={task.title}
                status={task.status}
                type={task.type}
                users={task.users}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
