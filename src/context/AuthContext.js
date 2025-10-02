import React, { createContext, useState, useContext } from "react";
import axios from "axios"; // Asegúrate de importar axios

// Crear el contexto
export const AuthContext = createContext();

// Crear un hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://192.168.8.2:4000/api/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
