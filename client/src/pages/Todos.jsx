import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import {
  Box,
  Fab,
  TextField,
  Container,
  Typography,
  Checkbox,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from "@mui/icons-material";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const[setsearch]=useState("");
  // 📌 טוען את המשימות בעת טעינת הדף
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:2001/api/todos");
      console.log("🔄 Todos fetched:", res.data);
      setTodos(res.data);
    } catch (err) {
      console.error("❌ Error fetching todos:", err);
    }
  };

  // 📌 הוספת משימה חדשה
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post("http://localhost:2001/api/todos", { title: newTodo, completed: false });
      setTodos([...todos, res.data]); // מוסיף ל-state מיידית
      setNewTodo("");
    } catch (err) {
      console.error("❌ Error adding todo:", err);
    }
  };

  
  const toggleComplete = async (id, completed) => {
    try {
      console.log(`🔄 Updating task ${id} to completed: ${!completed}`);
  
      await axios.put(`http://localhost:2001/api/todos/complete/${id}`, { complete: !completed });
  
      console.log("✅ Update successful, reloading todos...");
      fetchTodos(); // ✅ טוען מחדש את כל המשימות מה-DB
    } catch (err) {
      console.error("❌ Error updating todo:", err);
    }
  };
  
  
  // 📌 מחיקת משימה
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("❌ Error deleting todo:", err);
    }
  };

  // 📌 עריכת משימה
  const editTodo = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await axios.put(`http://localhost:2001/api/todos/${id}`, { title: editText });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, title: res.data.title } : todo))
      );
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("❌ Error updating todo:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        ✅ רשימת משימות
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="  חיפוש משימה... "
          variant="outlined"
          fullWidth
          onChange={(e) => setsearch(e.target.value)}
        />
      </Box>

      {/* הוספת משימה חדשה */}
      <Box display="flex" gap={2} mb={2}>
        <TextField label="הוסף משימה חדשה" variant="outlined" fullWidth value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Fab color="primary" aria-label="add" onClick={addTodo}>
          <AddIcon />
        </Fab>
      </Box>

      {/* טעינה או הצגת המשימות */}
      {todos.length === 0 ? (
        <Typography variant="h6" align="center">🔄 טוען משימות...</Typography>
      ) : (
        todos.map((todo) => (
          <Card key={todo._id} sx={{ mb: 2, backgroundColor: todo.completed ? "#d3f9d8" : "#fff" }}>
            <CardContent>
              {editId === todo._id ? (
                <TextField fullWidth value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <Typography variant="body1" sx={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.title}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              {/* כפתור עריכה / שמירה */}
              {editId === todo._id ? (
                <Fab size="small" color="success" onClick={() => editTodo(todo._id)}>
                  <SaveIcon />
                </Fab>
              ) : (
                <Fab size="small" color="secondary" onClick={() => { setEditId(todo._id); setEditText(todo.title); }}>
                  <EditIcon />
                </Fab>
              )}

              {/* כפתור מחיקה */}
              <Fab size="small" color="error" onClick={() => deleteTodo(todo._id)}>
                <DeleteIcon />
              </Fab>

              {/* כפתור השלמה */}
              <Checkbox checked={todo.completed ?? false} onChange={() => toggleComplete(todo._id, todo.completed)} />
            </CardActions>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Todos;
