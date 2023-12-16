"use client";
import { Task, useTaskStore } from "@/lib/task-store";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const TaskCard = ({ id, title, type, status }: Task) => {
  const draggedTask = useTaskStore((state) => state.dragTask);
  return (
    <section
      onDrag={() => draggedTask(id)}
      draggable
      className={cn(
        "border-gray-500 bg-[#494b58] border border-solid shadow-2xl h-40 w- overflow-hidden rounded-md  hover:cursor-move",
        {
          "border-green-500": status === "DONE",
          "border-gray-400": status === "TODO",
          "border-orange-300": status === "INPROGRESS",
          "border-blue-400": status === "INREVIEW",
        }
      )}
    >
      <div className="flex items-center space-x-4 mx-3 my-2 ">
        <h1 className="font-bold text-2xl ">{title}</h1>
      </div>
      <div
        className={cn(" w-max px-4 text-md mx-3  rounded-md", {
          "bg-red-400": type === "BUG",
          "bg-green-500": type === "NEW",
          "bg-purple-300": type === "ENHANCE",
        })}
      >
        {type}
      </div>
      <div className="flex">
        <div className="flex-1"></div>
        <div className="pointer-events-none mx-3 mt-10">
          <UserButton />
        </div>
      </div>
    </section>
  );
};

export default TaskCard;
