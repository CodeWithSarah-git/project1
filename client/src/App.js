import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Posts from "./pages/Posts";
import Photos from "./pages/Photos";
import Users from "./pages/Users";
import Layout from "./common/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="photos" element={<Photos />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;