// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = createTaskElement(taskText, false);
    taskList.appendChild(li);

    taskInput.value = '';

    saveTasks();
}

// Create task element
function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    if (completed) {
        li.classList.add('completed');
    }

    // Select button for marking as completed
    const selectBtn = document.createElement('button');
    selectBtn.classList.add('select-btn');
    selectBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent toggle when deleting
        li.remove();
        saveTasks();
    });

    li.appendChild(selectBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
}
