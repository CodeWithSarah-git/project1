const todosModels = require('../models/todosModels');

// יצירת משימה חדשה
const createTodo = async (req, res) => {
    const { title, tags, complete } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'title is required' });
    }
    try {
        const newTodo = await todosModels.create({ title, tags, complete });
        console.log("✅ Todo created:", newTodo);
        return res.status(201).json(newTodo);
    } catch (error) {
        console.error("❌ Error creating todo:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// קבלת כל המשימות
const getAllTodos = async (req, res) => {
    try {
        const todos = await todosModels.find().lean();
        console.log("📢 Todos from DB:", todos);
        if (!todos.length) {
            return res.status(404).json({ message: 'No todos found' });
        }
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// עדכון משימה
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, tags, complete } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const updatedTodo = await todosModels.findByIdAndUpdate(id, { title, tags, complete }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// מחיקת משימה
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await todosModels.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// סימון משימה כהושלמה
const markTodoAsCompleted = async (req, res) => {
    const { id } = req.params;
    
    try {
        const todo = await todosModels.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoAsCompleted
};
