import AddTaskDialog from "../components/AddTaskDialog";
import Columns from "../components/Columns";

export default function Home() {
  return (
    <div className="flex flex-col max-lg:mr-10 ">
      <div className="flex justify-end">
        <AddTaskDialog />
      </div>
      <Columns />
    </div>
  );
}
