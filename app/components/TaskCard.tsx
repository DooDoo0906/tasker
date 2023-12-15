"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type CardProps = {
  status: string;
  title: string;
  type: string;
};

const TaskCard = ({ title, type, status }: CardProps) => {
  return (
    <section
      draggable
      className={cn(
        "border-gray-500 bg-[#494b58] border border-solid shadow-2xl h-40 w-full overflow-hidden rounded-md hover:cursor-pointer hover:cursor-move",
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
      <div className="bg-red-400 w-max px-4 text-md mx-3  rounded-md">
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
