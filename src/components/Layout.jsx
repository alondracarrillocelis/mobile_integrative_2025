import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Layout = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.appbar}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.appbarTitle}>Microred</Text>
        {/* <View style={styles.rightSpace}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* Contenido de la pantalla */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  appbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
  },
  menuButton: {
    width: 30,
  },
  menuIcon: {
    color: "white",
    fontSize: 24,
  },
  appbarTitle: {
    // centrar todo
    textAlign: "left",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  // rightSpace: {
  //   flexDirection: "row",
  //   width: 60,
  //   justifyContent: "space-between",
  // },
  // icon: {
  //   color: "white",
  //   fontSize: 24,
  // },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Layout;
