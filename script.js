const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
});

function addTask(text, isCompleted = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (isCompleted) li.classList.add('completed');

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const actions = document.createElement('div');
  actions.className = 'actions';

  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const newText = prompt('Edit task:', li.firstChild.textContent);
    if (newText !== null) {
      li.firstChild.textContent = newText;
      saveTasks();
    }
  });

  // Delete Button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);
  li.appendChild(actions);
  taskList.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
