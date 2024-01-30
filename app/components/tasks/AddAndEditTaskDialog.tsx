"use client";
import { useTaskStore } from "@/stores/task-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "@/hooks/UseToast";
import { getUser } from "@/utils/users";
import { useUserStore } from "@/stores/user-store";
import { TaskSchema, TaskSchemaType } from "@/types/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TYPE } from "@/types/tasks";
import { User } from "@/types/user";

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
const AddAndEditTaskDialog = ({
  isEdit,
  openPop,
  action,
}: {
  isEdit?: boolean;
  openPop: boolean;
  action: () => void;
}) => {
  const defaultUser = {
    id: "",
    email: "",
    imageUrl: "",
    name: "",
  };

  const taskById = useTaskStore((state) => state.task);
  const addTask = useTaskStore((state) => state.createTask);
  const getTaskById = useTaskStore((state) => state.getTaskById);
  const updateTask = useTaskStore((state) => state.updateTask);
  const getTasks = useTaskStore((state) => state.fetchTask);
  const [openDialog, setOpenDialog] = useState(openPop);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [value, setValue] = useState(!isEdit ? "" : taskById.type);
  const [user, setUser] = useState<User>(defaultUser);
  const getUsers = useUserStore((state) => state.fetchUser);
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    if (!taskById) {
      return;
    }
    const taskDefault = {
      id: taskById.user?.id || "",
      email: taskById.user?.email || "",
      imageUrl: taskById.user?.imageUrl || "",
      name: taskById.user?.name || "",
    };
    setUser(taskDefault);
  }, [taskById]);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    defaultValues: !taskById ? { title: "", description: "" } : taskById,
    resolver: zodResolver(TaskSchema),
  });

  const onSubmit = async (data: TaskSchemaType) => {
    const typeSubmit = types.find(
      (type) => type.value.localeCompare(value.toUpperCase()) === 0
    );
    const userFromDb = await getUser(user?.id || "");
    reset({
      title: "",
      description: "",
    });
    setValue("");
    setUser(defaultUser);
    !isEdit
      ? await addTask(
          data.title,
          typeSubmit?.value || "NEW",
          data.description,
          userFromDb?.id || ""
        )
      : await updateTask(
          taskById.id,
          data.title,
          data.description,
          typeSubmit?.value || "NEW",
          userFromDb?.id || ""
        );

    await getTasks();
    getTaskById("");
    setOpenDialog(!openDialog);
    action();
    showToast(
      !isEdit ? "Add task successfully" : "Update successfully",
      "success"
    );
  };

  const handleCancel = () => {
    getTaskById("");
    setOpenDialog(!openDialog);
    action();
  };
  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-[#1c2129]">
        <DialogHeader>
          <DialogTitle className="">
            {!isEdit ? "Add new task" : `Edit ${taskById.title} task`}
          </DialogTitle>
          <DialogDescription>What do you want to get done?</DialogDescription>
        </DialogHeader>
        <form
          id="taskForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2">
            <Input
              id="title"
              maxLength={50}
              placeholder="Title..."
              className="col-span-4 text-black"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 w-full">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Textarea
              maxLength={255}
              id="description"
              placeholder="Description..."
              className="col-span-4 text-black"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 w-full">
                {errors.description.message}
              </p>
            )}
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
                            value
                              .toLowerCase()
                              .localeCompare(type.value.toLowerCase()) === 0
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
                  {user.id !== ""
                    ? users.find((item) => item.id === user?.id)?.name
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
                        value={item.id}
                        onSelect={(currentValue) => {
                          setUser(
                            currentValue
                              .toLowerCase()
                              .localeCompare(user.id.toLowerCase()) === 0
                              ? defaultUser
                              : item
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
          <Button
            className="bg-white text-black hover:bg-gray-500"
            onClick={handleCancel}
            size="sm"
          >
            Cancel
          </Button>

          <Button
            form="taskForm"
            className="bg-green-500 hover:bg-green-800"
            type="submit"
            size="sm"
          >
            {!isEdit ? "Add Task" : "Edit task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditTaskDialog;
