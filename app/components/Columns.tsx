"use client";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import { STATUS } from "@/lib/task-store";
import AddAndEditTaskDialog from "../components/AddAndEditTaskDialog";
import { Button } from "../components/ui/button";
const status: { title: string; type: STATUS }[] = [
  { title: "To Do", type: "TODO" },
  { title: "In Progress ", type: "INPROGRESS" },
  { title: "In Review", type: "INREVIEW" },
  { title: "Done", type: "DONE" },
];

const Columns = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
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
