
import { useState } from "react";
import Axios from "axios";

const AddTodo = ({ onTodoAdded }) => {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const { data } = await Axios.post("http://localhost:2001/api/todos", { title: newTodo });
      setNewTodo(""); // איפוס השדה
      onTodoAdded(data); // עדכון רשימת המשימות
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Add a new task</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task..."
        style={{ padding: "8px", marginRight: "5px" }}
      />
      <button onClick={addTodo} style={{ padding: "8px 12px", cursor: "pointer" }}>Add</button>
    </div>
  );
};

export default AddTodo;
