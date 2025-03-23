import { useEffect, useState } from "react";
import Axios from "axios";
import DeleteTodo from "./DeleteTodo";

const TodoList = () => {
  console.log("✅ TodoList:", TodoList);
  const [todos, setTodos] = useState([]);

  console.log(TodoList);
  const fetchTodos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:2001/api/todos");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (deletedId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedId));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Todos List</h1>
      {todos.length === 0 ? <p>Loading...</p> : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo._id} style={{ margin: "10px 0", fontSize: "18px" }}>
              {todo.title} <DeleteTodo id={todo._id} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

