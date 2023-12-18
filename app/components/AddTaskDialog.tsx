"use client";
import { TYPE, useTaskStore } from "@/lib/task-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "@/hooks/UseToast";
import { getUser, getUsers } from "@/utils/user";
import { User, useUserStore } from "@/lib/user-store";

type reqType = {
  title: string;
  description: string;
  type: TYPE;
};

const types: { label: string; value: TYPE }[] = [
  {
    value: "BUG",
    label: "Bug",
  },
  {
    value: "ENHANCE",
    label: "Enhance",
  },
  {
    value: "NEW",
    label: "New",
  },
];
const AddTaskDialog = () => {
  const defaultUser = {
    id: "",
    email: "",
    imageUrl: "",
    name: "",
  };
  const { handleSubmit, register, reset } = useForm<reqType>();
  const addTask = useTaskStore((state) => state.createTask);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [value, setValue] = useState("");
  const [user, setUser] = useState<User>(defaultUser);

  const getUsers = useUserStore((state) => state.fetchTask);
  const users = useUserStore((state) => state.users);
  useEffect(() => getUsers, [getUsers]);

  const onSubmit = async (data: reqType) => {
    const typeSubmit = types.find((type) => type.value === value);
    const userFromDb = await getUser(user?.id || "");
    await addTask(
      data.title,
      typeSubmit?.value || "NEW",
      data.description,
      userFromDb?.id || ""
    );
    reset({
      title: "",
      description: "",
    });
    setValue("");
    setUser(defaultUser);
    showToast("Add task successfully", "success");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-green-500 py-2 px-5 rounded-md font-bold text-white"
          variant="secondary"
          size="sm"
        >
          Add Task +
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1c2129]">
        <DialogHeader>
          <DialogTitle className="">Add new task</DialogTitle>
          <DialogDescription>What do you want to get done?</DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              required
              id="title"
              placeholder="Title..."
              className="col-span-4 text-black"
              {...register("title")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              required
              id="description"
              placeholder="Description..."
              className="col-span-4 text-black"
              {...register("description")}
            />
          </div>
          <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-black"
                >
                  {value
                    ? types.find(
                        (type) =>
                          type.value.toLowerCase() === value.toLowerCase()
                      )?.label
                    : "Select type..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0">
                <Command id="typePop">
                  <CommandInput placeholder="Search type..." />
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {types.map((type) => (
                      <CommandItem
                        className="hover:cursor-pointer"
                        key={type.value}
                        value={type.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value.toLowerCase() === type.value.toLowerCase()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {type.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full">
            <Popover open={openUser} onOpenChange={setOpenUser}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openUser}
                  className="w-full justify-between text-black"
                >
                  {users
                    ? users.find(
                        (item) =>
                          (item.id || "" === user?.id || "") &&
                          (item.email || "" === user?.email || "")
                      )?.name
                    : "Select user..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0">
                <Command id="userPop">
                  <CommandInput placeholder="Search user..." />
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((item) => (
                      <CommandItem
                        className="hover:cursor-pointer"
                        key={item.id}
                        value={item.name || ""}
                        onSelect={(currentValue) => {
                          setUser(
                            currentValue === item.name ? defaultUser : item
                          );
                          setOpenUser(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            user.id === item.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500"
              type="submit"
              size="sm"
              form="todo-form"
            >
              Add Task
            </Button>
          </DialogTrigger>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-gray-400"
              size="sm"
              form="todo-form"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
