

// import React, { useState } from 'react';

// const UpdateCompleteTodo = ({ todo, setTodos }) => {
//   const [newTitle, setNewTitle] = useState(todo.title);

//   const updateTodo = async () => {
//     const response = await fetch(`http://localhost:2001/api/todos/${todo._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: newTitle })
//     });
//     const updatedTodo = await response.json();
//     setTodos(prev => prev.map(t => (t._id === updatedTodo._id ? updatedTodo : t)));
//   };

//   const toggleComplete = async () => {
//     const response = await fetch(`http://localhost:2001/api/todos/${todo._id}/complete`, {
//       method: 'PUT',
//     });
//     const updatedTodo = await response.json();
//     setTodos(prev => prev.map(t => (t._id === updatedTodo._id ? updatedTodo : t)));
//   };

//   return (
//     <div>
//       <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
//       <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//       <button onClick={updateTodo}>Update</button>
//     </div>
//   );
// };

// export default UpdateCompleteTodo;
