import TaskCard from "../components/TaskCard";

const cardcomp = [
  { type: "BUG", title: "Not showing title", status: "DONE" },
  { type: "ENHANCE", title: "Enhance old feature", status: "NOT DONE" },
  { type: "NEW", title: "Make new feature", status: "DONE" },
];

export default function Home() {
  return (
    <>
      {cardcomp.map((item) => (
        <div className="mb-10" key={item.title}>
          <TaskCard status={item.status} title={item.title} type={item.type} />
        </div>
      ))}
    </>
  );
}
