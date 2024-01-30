"use client";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import { useTaskStore } from "@/stores/task-store";
import { Button } from "../ui/button";
import AddAndEditTaskDialog from "./AddAndEditTaskDialog";
import { Input } from "../ui/input";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { filterTask } from "@/utils/tasks";
import { STATUS } from "@/types/tasks";
const status: { title: string; type: STATUS }[] = [
  { title: "All", type: "ALL" },
  { title: "To Do", type: "TODO" },
  { title: "In Progress ", type: "INPROGRESS" },
  { title: "In Review", type: "INREVIEW" },
  { title: "Done", type: "DONE" },
];

const Columns = () => {
  const searchTaskByKey = useTaskStore((state) => state.searchTaskByKey);
  const filterTasks = useTaskStore((state) => state.filterTask);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [keyword, setKeyWord] = useState("");
  const [filterKey, setFilterKey] = useState("All");
  const [dropButton, setDropButton] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
    searchTaskByKey(e.target.value);
  };

  const handleFilter = (e: string) => {
    setFilterKey(e);
    setStatusFilter(e);
    const filteredSta = status.filter(
      (item) => item.title.toUpperCase().localeCompare(e.toUpperCase()) === 0
    );
    filterTasks(filteredSta[0].type);
  };

  return (
    <div>
      <div className="flex ml-5 items-center justify-end">
        <div>
          <DropdownMenu onOpenChange={() => setDropButton(!dropButton)}>
            <DropdownMenuTrigger asChild>
              <div className=" flex items-center bg-black w-36  border px-5 py-2 rounded-lg cursor-pointer">
                <div>{!filterKey ? "Filter" : filterKey}</div>
                <div className="flex-1"></div>
                {dropButton ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(e) => handleFilter(e)}
              >
                {status.map((item) => (
                  <DropdownMenuRadioItem
                    key={item.title}
                    value={item.title}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="ml-5">
          <Input
            onChange={(e) => handleSearch(e)}
            value={keyword}
            placeholder={`Search...`}
            className="bg-black"
          />
        </div>
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
          if (status.title !== "All") {
            return (
              <Column key={index} title={status.title} status={status.type} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Columns;
