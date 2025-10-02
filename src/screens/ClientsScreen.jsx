import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import ClientsTable from "../components/Tables/ClientsTable";
import { useNavigation } from "@react-navigation/native";

const ClientsScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <Text style={styles.title}>Listado de Clientes</Text>
      <ClientsTable />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate("AddClient");
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default ClientsScreen;
