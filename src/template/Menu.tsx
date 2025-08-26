import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "./MenuItem";
import AddTaskIcon from "@mui/icons-material/AddTask";

export default function Menu() {
  return (
    <aside className="w-72 bg-slate-900 h-screen">
      <nav className="flex flex-col gap-1 py-7">
        <MenuItem icon={HomeIcon} text="Início" url="/" />
        <MenuItem icon={AddTaskIcon} text="Inserir Tarefa" url="/tasks" />
      </nav>
    </aside>
  );
}
