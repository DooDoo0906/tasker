"use client";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import { STATUS } from "@/lib/task-store";
import { Button } from "../ui/button";
import AddAndEditTaskDialog from "./AddAndEditTaskDialog";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const status: { title: string; type: STATUS }[] = [
  { title: "To Do", type: "TODO" },
  { title: "In Progress ", type: "INPROGRESS" },
  { title: "In Review", type: "INREVIEW" },
  { title: "Done", type: "DONE" },
];

const Columns = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("TODO");
  return (
    <div>
      <div className="flex ml-5 items-center justify-end">
        {/* <div className="mr-5">
          <Input placeholder={`Search...`} className="bg-black" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-black" variant="outline">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                {status.map((item) => (
                  <DropdownMenuRadioItem key={item.title} value={item.type}>
                    {item.title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
        <div className="flex-1"></div>
        {!openDialog ? (
          <Button
            onClick={() => setOpenDialog(!openDialog)}
            className="bg-green-500 py-2 px-5 rounded-md font-bold text-white"
            variant="secondary"
            size="sm"
          >
            Add Task +
          </Button>
        ) : (
          <AddAndEditTaskDialog
            openPop={openDialog}
            action={() => setOpenDialog(false)}
          />
        )}
      </div>
      <div className="flex space-x-7 ml-5 mt-7 ">
        {status.map((status, index) => {
          return (
            <Column key={index} title={status.title} status={status.type} />
          );
        })}
      </div>
    </div>
  );
};

export default Columns;
