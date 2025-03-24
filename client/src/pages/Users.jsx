import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,TextField, Container,Typography, Card, CardContent, CardActions, Button, Fab,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:2001/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const addUser = async () => {
    if (!newUser.name.trim()) return;
    try {
      await axios.post("http://localhost:2001/api/users", newUser);
      fetchUsers();
      setNewUser({ name: "", username: "", email: "", phone: "", address:""});
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const updateUser = async (id) => {
    if (!editUser.name.trim()) return;
    try {
      await axios.put(`http://localhost:2001/api/users/${id}`, editUser);
      fetchUsers();
      setEditId(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        ניהול משתמשים
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="חיפוש משתמש..." variant="outlined" fullWidth onChange={(e) => setSearch(e.target.value)} />
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="שם" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <TextField label="שם משתמש" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        <TextField label="אימייל" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <TextField label="טלפון" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
        <TextField label="כתובת" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} /> 
        <Fab color="primary" onClick={addUser}><AddIcon /></Fab>
      </Box>

      {users.filter(user => user.name.includes(search) || user.email.includes(search) || user.phone.includes(search)).map((user) => (
        <Card key={user._id} sx={{ mb: 2 }}>
          <CardContent>
            {editId === user._id ? (
              <Box display="flex" gap={2}>
                <TextField label="שם" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                <TextField label="שם משתמש" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
                <TextField label="אימייל" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                <TextField label="טלפון" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                <TextField label="כתובת" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} /> 
              </Box>
            ) : (
              <Typography>{user.name} - {user.email} - {user.phone}</Typography>
            )}
          </CardContent>
          <CardActions>
            {editId === user._id ? (
              <Button onClick={() => updateUser(user._id)} color="success">שמור</Button>
            ) : (
              <Button onClick={() => { setEditId(user._id); setEditUser(user); }} color="secondary"><EditIcon /></Button>
            )}
            <Button onClick={() => deleteUser(user._id)} color="error"><DeleteIcon /></Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default Users;
