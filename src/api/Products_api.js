const API = "http://192.168.8.2:4000/api/products";

export const getProducts = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const getProduct = async (id) => {
  const response = await fetch(`${API}/${id}`);
  return await response.json();
};

export const saveProduct = async (newProduct) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return await res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await res.json();
};
