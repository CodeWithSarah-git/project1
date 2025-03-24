import { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Container, Typography, Card, CardContent, CardActions, Button, Fab, IconButton } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Save as SaveIcon } from "@mui/icons-material";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");

  // הבאת המשימות מהשרת
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:2001/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(" Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  //  הוספת משימה
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post("http://localhost:2001/api/todos", { title: newTodo, completed: false });
      setTodos([...todos, res.data]); // עדכון מיידי
      setNewTodo("");
    } catch (err) {
      console.error(" Error adding todo:", err);
    }
  };

  //  סימון משימה כהושלמה
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:2001/api/todos/${id}`, {
        title: todos.find(todo => todo._id === id).title, 
        completed: !completed 
      });
      console.log(" עדכון התקבל מהשרת:", res.data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
      );
    } catch (err) {
      console.error(" Error updating completion status:", err);
    }
  };
  
  //  מחיקת משימה
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id)); // הסרה מקומית
    } catch (err) {
      console.error(" Error deleting todo:", err);
    }
  };

  //  עריכת משימה
  const editTodo = async (id) => {
    if (!editText.trim()) return;
    try {
      await axios.put(`http://localhost:2001/api/todos/${id}`, { title: editText });

      //  עדכון מקומי של הסטייט
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, title: editText } : todo))
      );

      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error(" Error updating todo:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        ניהול משימות 
      </Typography>

      {/* חיפוש */}
      <Box display="flex" gap={2} mb={2}>
        <TextField label="חיפוש משימה..." variant="outlined" fullWidth onChange={(e) => setSearch(e.target.value)} />
      </Box>

      {/* הוספת משימה */}
      <Box display="flex" gap={2} mb={2}>
        <TextField label="שם משימה" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Fab color="primary" onClick={addTodo}>
          <AddIcon />
        </Fab>
      </Box>

      {/*  רשימת משימות */}
      {todos
        .filter((todo) => todo.title.includes(search))
        .map((todo) => (
          <Card key={todo._id} sx={{ mb: 2 }}>
            <CardContent>
              {editId === todo._id ? (
                <TextField fullWidth value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <Typography sx={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</Typography>
              )}
            </CardContent>
            <CardActions>
              {editId === todo._id ? (
                <Button onClick={() => editTodo(todo._id)} color="success">
                  <SaveIcon />
                </Button>
              ) : (
                <Button onClick={() => setEditId(todo._id) || setEditText(todo.title)} color="secondary">
                  <EditIcon />
                </Button>
              )}
              <Button onClick={() => deleteTodo(todo._id)} color="error">
                <DeleteIcon />
              </Button>

              {/* כפתור השלמה */}
              <IconButton color={todo.completed ? "success" : "default"} onClick={() => toggleComplete(todo._id, todo.completed)}>
                <CheckIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
    </Container>
  );
}

export default Todos;
