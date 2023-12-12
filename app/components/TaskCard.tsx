"use client";
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
      className="border-gray-500
              bg-[#494b58] border border-solid
                shadow-2xl h-40 w-72  overflow-hidden
                rounded-md hover:cursor-pointer"
    >
      <div className="flex justify-end  w-full ">
        <div className="flex-1"></div>
        <div className="bg-red-400 pl-5 text-sm ptl pr-4 rounded-bl-md">
          {type}
        </div>
      </div>
      <div className="flex items-center space-x-4 mx-3 my-2 [&>*:last-child]:text-sm">
        <div>{title}</div>
        <div className="pointer-events-none">
          <UserButton />
        </div>
      </div>
      {/**Status**/}
      <div className="mt-10 bg-green-500 w-max pr-4 rounded-r-lg  pl-4 mx-3">
        {status}
      </div>
    </section>
  );
};

export default TaskCard;
