const BASE_URL = 'http://localhost:5000';

// Small helper: every call goes through this so error handling is consistent
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Prefer the backend's own message/errors array if present
    const message =
      body.message || (body.errors && body.errors.join(', ')) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}

export const getTasks = () => request('/tasks');

export const createTask = (task) =>
  request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });

export const updateTask = (id, updates) =>
  request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: 'DELETE',
  });
