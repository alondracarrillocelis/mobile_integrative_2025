import axios from "axios";

const route = "http://192.168.8.2:4000/api"; // Asegúrate de que esta URL sea correcta

const loginRequest = async (userData) => {
  try {
    const response = await axios.post(`${route}/login`, userData, {
      withCredentials: true,
    });
    console.log("Datos enviados:", userData);
    return response;
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    throw error;
  }
};

export const login = async (email, password_) => {
  try {
    const response = await loginRequest({ email, password_ });
    return response.data;
  } catch (error) {
    throw new Error("Credenciales incorrectas");
  }
};

export const logout = async () => {
  try {
    await axios.post(`${route}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error en la solicitud de logout:", error);
    throw error;
  }
};
