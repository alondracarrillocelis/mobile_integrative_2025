import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";

const CustomDrawerContent = (props) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Cierra la sesión
      props.navigation.navigate("Login"); // Navega de regreso a la pantalla de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItemList {...props} />
        <Button title="Cerrar sesión" onPress={handleLogout} color="#ff0000" />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default CustomDrawerContent;
