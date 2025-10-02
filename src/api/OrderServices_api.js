const API = "http://192.168.8.2:4000/api/service-orders";

export const getServiceOrders = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const saveServiceOrder = async (newServiceOrder) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newServiceOrder),
  });
  return await res.json();
};
