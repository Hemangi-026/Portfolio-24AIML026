import { useEffect, useState } from 'react';
import Spinner from '../components/spinner';
import ErrorMessage from '../components/errormessage';
import Toast from '../components/toast';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

function Tasks() {
  // Initial fetch state (same pattern as Practical 3)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // New-task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Per-task busy state, so only the row being updated/deleted shows a spinner
  const [busyTaskId, setBusyTaskId] = useState(null);

  // Supplementary: toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ---------- Initial load ----------
  useEffect(() => {
    setLoading(true);
    setError(null);

    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryCount]);

  const handleRetry = () => setRetryCount((c) => c + 1);

  // ---------- Create (with optimistic UI update) ----------
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const optimisticTask = {
      _id: `temp-${Date.now()}`, // temporary id until the server responds
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    // Show it immediately, before the server confirms
    setTasks((prev) => [optimisticTask, ...prev]);
    setCreating(true);
    setTitle('');
    setDescription('');

    try {
      const res = await createTask({
        title: optimisticTask.title,
        description: optimisticTask.description,
      });
      // Swap the optimistic placeholder for the real saved task
      setTasks((prev) =>
        prev.map((t) => (t._id === optimisticTask._id ? res.data : t))
      );
      showToast('Task created successfully');
    } catch (err) {
      // Roll back the optimistic task since the write actually failed
      setTasks((prev) => prev.filter((t) => t._id !== optimisticTask._id));
      showToast(`Failed to create task: ${err.message}`, 'error');
    } finally {
      setCreating(false);
    }
  };

  // ---------- Toggle completed ----------
  const handleToggleCompleted = async (task) => {
    setBusyTaskId(task._id);
    try {
      const res = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      showToast('Task updated');
    } catch (err) {
      showToast(`Failed to update task: ${err.message}`, 'error');
    } finally {
      setBusyTaskId(null);
    }
  };

  // ---------- Delete (with confirmation dialog) ----------
  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`);
    if (!confirmed) return;

    setBusyTaskId(task._id);
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      showToast('Task deleted');
    } catch (err) {
      showToast(`Failed to delete task: ${err.message}`, 'error');
    } finally {
      setBusyTaskId(null);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <section id="tasks" className="projects">
      <p className="section-label">My Tasks</p>

      {/* ---- Create form ---- */}
      <form className="task-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn" disabled={creating}>
          {creating ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {/* ---- Task list ---- */}
      {tasks.length === 0 ? (
        <p className="no-results">No tasks yet — add one above.</p>
      ) : (
        <div className="projects-grid">
          {tasks.map((task) => (
            <div className="project-card" key={task._id}>
              <div className="project-card__header">
                <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </h3>
              </div>
              <p>{task.description || 'No description.'}</p>

              <div className="task-actions">
                <button
                  className="btn btn-outline"
                  disabled={busyTaskId === task._id}
                  onClick={() => handleToggleCompleted(task)}
                >
                  {busyTaskId === task._id
                    ? 'Working...'
                    : task.completed
                    ? 'Mark incomplete'
                    : 'Mark complete'}
                </button>
                <button
                  className="retry-btn"
                  disabled={busyTaskId === task._id}
                  onClick={() => handleDelete(task)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast toast={toast} />
    </section>
  );
}

export default Tasks;
