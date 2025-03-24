import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,TextField, Container,Typography, Card, CardContent, CardActions, Button, Fab,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";


function Post() {
    const [Posts, setPosts] = useState([]);
    const [newpost, setnewpost] = useState({ title: "", body: ""});
    const [edittitle, setedittitle] = useState("");
    const [editbody, seteditbody] = useState(" ");
    const [editpost, seteditpost] = useState(" ");
    const [search, setSearch] = useState("");
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:2001/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  
  const addPost = async () => {
    if (!newpost.title.trim()) return;
    try {
      await axios.post("http://localhost:2001/api/posts", newpost);
      fetchPost();
      setnewpost({ title: "", body: ""});
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/posts/${id}`);
      fetchPost();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  
  const updatePost = async (id) => {
    if (!edittitle.trim()) return;
    try {
      await axios.put(`http://localhost:2001/api/posts/${id}`, { title: edittitle, body: editbody });
      fetchPost();
      seteditpost(null);  
      setedittitle("");   
      seteditbody("");
    } catch (err) {
      console.error(" Error updating post:", err);
    }
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        פוסטים 
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="חיפוש פוסט..." variant="outlined" fullWidth onChange={(e) => setSearch(e.target.value)} />
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="כותרת" value={newpost.title} onChange={(e) => setnewpost({ ...newpost,title: e.target.value })} />
        <TextField label=" פוסט" value={newpost.body} onChange={(e) => setnewpost({ ...newpost,body: e.target.value })} />
        <Fab color="primary" onClick={addPost}><AddIcon /></Fab>
      </Box>

      {Posts.filter(post => post.title.includes(search) || !search).map((post) => (
        <Card key={post._id} sx={{ mb: 2 }}>
          <CardContent>
            {editpost === post._id ? (
              <Box display="flex" gap={2}>
                <TextField label="כותרת" value={edittitle} onChange={(e) => setedittitle( e.target.value )} />
                <TextField label="תוכן הפוסט" value={editbody} onChange={(e) => seteditbody( e.target.value )} />
                </Box>
            ) : (<>
              <Typography>{post.title}</Typography>
              <Typography>{post.body}</Typography></>
            )}
          </CardContent>
          <CardActions>
            {editpost === post._id ? (
              <Button onClick={() => updatePost(post._id)} color="success">שמור</Button>
            ) : (
            <Button onClick={() => { 
            seteditpost(post._id); 
            setedittitle(post.title); 
            seteditbody(post.body); 
            }} color="secondary">
            <EditIcon />
            </Button>
            )}
            <Button onClick={() => deletePost(post._id)} color="error"><DeleteIcon /></Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default Post;
