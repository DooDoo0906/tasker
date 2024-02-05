import React, { useEffect, useState } from "react";
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
import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { MeetingSchema, MeetingSchemaType } from "@/types/MeetingSchema";
import { useMeetingStore } from "@/stores/meeting-store";
import { zodResolver } from "@hookform/resolvers/zod";

const AddMeetingDialog = ({
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
  const [openUser, setOpenUser] = useState(false);
  const meetingById = useMeetingStore((state) => state.meeting);
  const addMeeting = useMeetingStore((state) => state.createMeeting);
  const getMeetingById = useMeetingStore((state) => state.getMeetingById);
  const getMeetings = useMeetingStore((state) => state.fetchMeeting);
  const [user, setUser] = useState<User>(defaultUser);
  const getUsers = useUserStore((state) => state.fetchUser);
  const users = useUserStore((state) => state.users);
  const [openDialog, setOpenDialog] = useState(openPop);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<MeetingSchemaType>({
    defaultValues: !meetingById ? { title: "" } : meetingById,
    resolver: zodResolver(MeetingSchema),
  });

  const onSubmit = async (data: MeetingSchemaType) => {
    const userFromDb = await getUser(user?.id || "");
    reset({
      title: "",
    });
    setUser(defaultUser);
    // !isEdit
    //   ?
    await addMeeting(data.title);
    //   :

    await getMeetings();
    getMeetingById("");
    setOpenDialog(!openDialog);
    action();
    showToast(
      !isEdit ? "Add Meeting successfully" : "Update successfully",
      "success"
    );
  };

  const handleCancel = () => {
    setOpenDialog(!openDialog);
    action();
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-[#1c2129]">
        <DialogHeader>
          <DialogTitle className="">Add new task</DialogTitle>
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

export default AddMeetingDialog;
