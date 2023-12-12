"use client";
import { useRef, useState } from "react";
import TaskCard from "../components/TaskCard";

const cardcomp = [
  { type: "BUG", title: "Not showing title", status: "DONE" },
  { type: "ENHANCE", title: "Enhance old feature", status: "NOT DONE" },
  { type: "NEW", title: "Make new feature", status: "DONE" },
];

export default function Home() {
  const [list, setList] = useState(cardcomp);
  const dragItem = useRef<number | undefined>();
  const dragOverItem = useRef<number | undefined>();

  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    console.log("position", position);
  };
  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };
  const drop = (e: any) => {
    if (dragItem.current !== undefined && dragOverItem.current !== undefined) {
      const copyListItems = [...list];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = undefined;
      dragOverItem.current = undefined;
      setList(copyListItems);
    }
  };
  return (
    <div className="flex space-x-5">
      {list.map((item, index) => (
        <div
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          draggable
          className="mb-10"
          key={item.title}
        >
          <TaskCard status={item.status} title={item.title} type={item.type} />
        </div>
      ))}
    </div>
  );
}
