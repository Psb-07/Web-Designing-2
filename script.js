/* ============================================================
   script.js  –  To-Do List App
   What this file does:
     • Loads tasks saved in Local Storage when the page opens
     • Lets users add, complete, and delete tasks
     • Saves every change back to Local Storage automatically
     • Filters tasks by All / Active / Completed
     • Updates the footer counter and empty-state message
   ============================================================ */


/* ── 1. State ─────────────────────────────────────────────── */

/*
  We keep one array of task objects in memory.
  Each task looks like: { id: 1234567890, text: "Buy milk", completed: false }
*/
let tasks = [];

// Remember which filter the user last chose
let currentFilter = 'all';


/* ── 2. DOM references ────────────────────────────────────── */

// Grab the elements we'll interact with often
const taskInput  = document.getElementById('taskInput');
const taskList   = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const footer     = document.getElementById('footer');
const taskCount  = document.getElementById('taskCount');


/* ── 3. Local Storage helpers ─────────────────────────────── */

/**
 * Save the current tasks array to Local Storage.
 * JSON.stringify() converts the array to a text string for storage.
 */
function saveTasks() {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

/**
 * Load tasks from Local Storage when the page first opens.
 * JSON.parse() converts the stored text string back to an array.
 */
function loadTasks() {
  const stored = localStorage.getItem('todo-tasks');
  tasks = stored ? JSON.parse(stored) : [];  // Use [] if nothing is stored yet
}


/* ── 4. Add a new task ────────────────────────────────────── */

/**
 * Called when the user clicks "+ Add" or presses Enter.
 * Creates a new task object and adds it to the tasks array.
 */
function addTask() {
  // Read the input and remove extra spaces at the start/end
  const text = taskInput.value.trim();

  // Don't add an empty task
  if (!text) {
    taskInput.focus();
    return;
  }

  // Build a new task object
  const newTask = {
    id: Date.now(),       // Unique id using the current timestamp
    text: text,
    completed: false
  };

  // Add to the beginning of the array so newest tasks appear at the top
  tasks.unshift(newTask);

  // Persist and re-render
  saveTasks();
  renderTasks();

  // Clear the input and return focus to it for quick re-entry
  taskInput.value = '';
  taskInput.focus();
}

/* Allow pressing Enter in the input box to add a task */
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


/* ── 5. Toggle a task's completed status ──────────────────── */

/**
 * Flip the completed flag for the task with the given id.
 * @param {number} id  – the task's unique id
 */
function toggleTask(id) {
  // Find the task in the array and flip its completed value
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}


/* ── 6. Delete a task ─────────────────────────────────────── */

/**
 * Remove the task with the given id from the array.
 * @param {number} id  – the task's unique id
 */
function deleteTask(id) {
  // Keep every task EXCEPT the one with this id
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}


/* ── 7. Clear all completed tasks ─────────────────────────── */

/**
 * Remove every task that has been marked as completed.
 */
function clearCompleted() {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();
}


/* ── 8. Filter tasks ──────────────────────────────────────── */

/**
 * Switch the active filter and re-render.
 * @param {HTMLElement} btn  – the filter button that was clicked
 */
function filterTasks(btn) {
  // Update the active filter value from the button's data attribute
  currentFilter = btn.dataset.filter;

  // Move the "active" class to the clicked button
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  renderTasks();
}


/* ── 9. Render tasks to the DOM ───────────────────────────── */

/**
 * Build the task list HTML from the tasks array and inject it into the page.
 * This is called after every change so the UI always reflects the data.
 */
function renderTasks() {
  // Decide which tasks to show based on the current filter
  let visibleTasks;
  if (currentFilter === 'active') {
    visibleTasks = tasks.filter(function (t) { return !t.completed; });
  } else if (currentFilter === 'completed') {
    visibleTasks = tasks.filter(function (t) { return t.completed; });
  } else {
    visibleTasks = tasks;   // 'all' — show everything
  }

  // Clear the existing list
  taskList.innerHTML = '';

  // Build and append each task item
  visibleTasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    /*
      We use data-id to store the task's id on the element so that
      our toggle/delete functions know which task to act on.
    */
    li.innerHTML = `
      <input
        type="checkbox"
        class="task-checkbox"
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id})"
        aria-label="Mark as ${task.completed ? 'incomplete' : 'complete'}"
      />
      <span class="task-text">${escapeHTML(task.text)}</span>
      <button
        class="btn-delete"
        onclick="deleteTask(${task.id})"
        aria-label="Delete task"
        title="Delete"
      >✕</button>
    `;

    taskList.appendChild(li);
  });

  // Show/hide the empty-state message
  emptyState.hidden = visibleTasks.length > 0;

  // Show/hide the footer and update the counter
  const activeCount = tasks.filter(function (t) { return !t.completed; }).length;
  footer.hidden = tasks.length === 0;
  taskCount.textContent = activeCount === 1
    ? '1 task left'
    : activeCount + ' tasks left';
}


/* ── 10. Security helper ──────────────────────────────────── */

/**
 * Prevent XSS by converting special characters to HTML entities
 * before inserting user-supplied text into the DOM.
 * @param  {string} str  – raw user input
 * @returns {string}       safe HTML string
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


/* ── 11. Initialise ───────────────────────────────────────── */

/*
  When the script first runs (page load), load saved tasks and render them.
*/
loadTasks();
renderTasks();
