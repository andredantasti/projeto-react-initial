import "./App.css";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import {v4} from "uuid"

function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks"))||[]);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])


useEffect(() =>{
  async function fetchTasks(params) {
    //chamar api
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10",
  {
    method: "GET",
  }
  );
  //pegar dados api
  const data = await response.json();
  console.log(data);
  //armazenar dados no state

  setTasks(data)
  };  
  //fetchTasks();
}, [])

function onTaskClick(taskId) {
    const newTasks = tasks.map(task =>{
      //preciso atualizar essa tarefa
      if(task.id == taskId){
        return {...task, isCompleted: !task.isCompleted}
      }

      //não preciso atualizar essa tarefa
      return task;
    })
    setTasks(newTasks);
}

function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId);
    setTasks(newTasks);

}

function onAddTaskSubmit(title, description) {
  const newTask = {
    id: v4(),
    title,
    description,
    isCompleted: false,
  };
  setTasks([...tasks, newTask]);
}

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
      <h1 className="text-slate-100 font-bold text-center text-3xl">Gerenciado de Tarefas</h1>
      
      <AddTask onAddTaskSubmit={onAddTaskSubmit} />

      <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  );
}

export default App;
