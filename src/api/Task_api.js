const API = "http://192.168.8.2:4000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const getTask = async (id) => {
  const response = await fetch(`${API}/${id}`);
  return await response.json();
};

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};

export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  return await res.json();
};
