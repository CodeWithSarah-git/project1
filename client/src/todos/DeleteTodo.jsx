import Axios from "axios";

const DeleteTodo = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await Axios.delete(`http://localhost:2001/api/todos/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <button onClick={handleDelete} style={{ marginLeft: "10px", cursor: "pointer" }}>
      ❌
    </button>
  );
};

export default DeleteTodo;
