const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" to store tasks
let tasks = [];
let currentId = 1; // To assign unique IDs to tasks

// Task Model
// Each task will have an `id`, `name`, and `description`

// CREATE: Add a new task
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    const newTask = { id: currentId++, name, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// READ: Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// UPDATE: Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const task = tasks.find(t => t.id == id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Update task properties
    task.name = name || task.name;
    task.description = description || task.description;

    res.json(task);
});

// DELETE: Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Remove the task from the array
    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
