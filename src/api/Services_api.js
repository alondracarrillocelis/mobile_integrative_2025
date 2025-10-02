const API = "http://192.168.8.2:4000/api/services";

export const getServices = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const getService = async (id) => {
  const response = await fetch(`${API}/${id}`);
  return await response.json();
};

export const saveService = async (newService) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newService),
  });
  return await res.json();
};

export const deleteService = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const updateService = async (id, service) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  return await res.json();
};
